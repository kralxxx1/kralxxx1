/* The inhabitants of the shelves. Every sunken place breeds its own kind out of the truth buried there
   (STORY.md, rule 2), so every chapter has its own species, and each species is a combination of traits
   (DESIGN.md): what it senses, how it moves, where it waits and how it comes out.

   A species is data: { kind, model, traits, senses, speeds, ambush, kill, voice, ... } registered with
   PB.Species.add. The models live in species*.js, the deaths in kills.js. This file is the behaviour:

     senses      sight (scaled by light on the player), hearing, vibration (footsteps through the ground,
                 crouching makes none), blind
     movement    freezeWhenSeen (only moves unobserved), moveWhenMoving (only while you move), charger
                 (telegraphs, then runs a straight line; stunned by what it hits), slow giants
     waking      lightWake (asleep until a light rests on it), stillnessHunter (rises if you stand still
                 near it), warmthWake (only moves while you are near heat), musicRule, ticketRule
     ambush      floor, wall, water, ceiling, seat, snow, ice, gap: it waits hidden in a lair and comes out
                 right there when its trigger fires, then hunts; when it loses you it goes back under
     other       lightSeeker (goes for your torch and glowsticks), confined (never leaves its rooms),
                 alarm (does not kill: it calls the others), invisible (traces only)

   They are quiet. A creature that has not found you makes almost no sound beyond a few metres; you find
   it, or it finds you. In a chase it breathes right behind your head. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U;
  const E = PB.Entities;
  const Base = Object.getPrototypeOf(E.Grinner.prototype).constructor; // Entity
  const { DX, DY } = PB.LevelGen;

  const SPECIES = {};
  // Lairs for a generated map: along walls (standing a little off the wall, facing the room), on open
  // floor, in water, under ceilings. Never close to where the player starts.
  function autoLairs(L, kind, sp) {
    const r = U.rng(L.seed + U.hashStr(sp.kind)), out = [], C = L.cell;
    const cells = [];
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
      if (!L.passable(x, y) || Math.hypot(x - L.spawn.x, y - L.spawn.y) < 6) continue;
      if (kind === 'water' ? L.floorType[L.i(x, y)] !== 1 : L.floorType[L.i(x, y)] === 1) continue;
      cells.push([x, y]);
    }
    r.shuffle(cells);
    for (const [x, y] of cells) {
      if (out.length >= (sp.lairCount || 40)) break;
      if (kind === 'wall') {
        const sides = L.wallSides(x, y); if (!sides.length) continue;
        const d = r.pick(sides), off = C / 2 - 0.1 - (sp.wallOff || 0.72);
        out.push({ x, y, wx: L.cx(x) + DX[d] * off, wz: L.cz(y) + DY[d] * off, yaw: Math.atan2(-DX[d], -DY[d]) });
      } else out.push({ x, y, wx: L.cx(x) + r.range(-0.6, 0.6), wz: L.cz(y) + r.range(-0.6, 0.6), yaw: r.range(0, 6.28) });
    }
    return out;
  }
  PB.Species = {
    all: SPECIES,
    add(sp) { SPECIES[sp.kind] = Object.assign({ traits: [], radius: 0.3, catchR: 1.05, height: 1.8, senses: { sight: 18, fov: 2.2, hearing: 1 }, speeds: { patrol: 1.1, investigate: 1.8, chase: 3.9 }, lose: 7, kill: 'grab' }, sp); },
    get: kind => SPECIES[kind],
  };

  const has = (cr, t) => cr.traits.has(t);

  class Creature extends Base {
    constructor(game, sp, o) {
      super(game, sp.kind, o);
      this.sp = sp; this.cfg = o;
      this.traits = new Set(sp.traits);
      for (const t of o.traits || []) this.traits.add(t);
      const m = sp.model(game, o);
      this.vis = m; this.mesh.add(m.group); E.lit(game, m.group);
      this.radius = sp.radius; this.catchR = sp.catchR;
      this.hearMul = sp.senses.hearing != null ? sp.senses.hearing : 1;
      this.hostile = !has(this, 'alarm') && sp.hostile !== false;
      this.alarmOnly = has(this, 'alarm');
      this.ghostly = !!sp.ghostly;
      this.noDoors = !!sp.noDoors;
      this.selfLit = !!sp.selfLit;
      this.anim = { walk: 0, speed: 0, t: Math.random() * 10, emerge: 1, frozen: 0, alert: 0, attack: 0 };
      this.ambush = sp.ambush || null;
      this.loopKeys = [];
      this.breathKey = 'cbreath:' + this.id;
      this.stillT = 0;
      // where it starts
      this.state = o.dormant ? 'dormant' : this.ambush ? 'buried' : has(this, 'lightWake') ? 'asleep' : has(this, 'stillnessHunter') ? 'buried' : 'patrol';
      if (sp.init) sp.init(this, game, o);
    }
    // ---------------------------------------------------------------- where it may go
    allowed(x, y) {
      if (this.sp.allowCell && !this.sp.allowCell(this, x, y)) return false;
      const c = this.sp.confined || this.cfg.confined;
      if (!c) return true;
      const rooms = this.g.level.meta.rooms || {};
      for (const tag of [].concat(c)) { const r = rooms[tag]; if (r && x >= r.x0 - (r.pad || 0) && x <= r.x1 + (r.pad || 0) && y >= r.y0 && y <= r.y1) return true; }
      return false;
    }
    cellOk(x, y) {
      if (!this.allowed(x, y)) return false;
      if (this.sp.cellOk && !this.sp.cellOk(this, x, y)) return false;
      return true;
    }
    pickNext(field, flee) {
      const n = super.pickNext(field, flee);
      if (n && (this.sp.confined || this.cfg.confined || this.sp.allowCell) && !this.allowed(n.x, n.y)) { this.atEdge = true; return null; }
      this.atEdge = false;
      return n;
    }
    // ---------------------------------------------------------------- senses
    canSeePlayer(range, fov) {
      if (has(this, 'blind') || this.state === 'buried' || this.state === 'asleep' || this.state === 'dormant') return 0;
      return super.canSeePlayer(range, fov);
    }
    // kind: 'step' (footsteps), 'impact' (thrown things, a glowstick landing), 'door', 'voice', 'loud'
    hear(x, z, radius, kind) {
      if (!this.active || this.state === 'dormant' || this.state === 'emerge' || this.state === 'stunned' || this.state === 'charge') return;
      if (has(this, 'deaf')) return;
      if (has(this, 'vibration') && kind && kind !== 'step' && kind !== 'impact' && kind !== 'loud') return;
      if (has(this, 'vibration') && kind === 'step' && radius < 3.2) return;     // crouching: nothing comes through the ground
      const d = Math.hypot(x - this.pos.x, z - this.pos.z);
      let r = radius * this.dif.hearing * (this.hearMul || 1);
      if (!has(this, 'vibration') && !this.L.los(this.pos.x, this.pos.z, x, z)) r *= 0.55;
      if (d > r) return;
      if (this.state === 'buried') { if (this.ambush && this.sp.wakeOnSound !== false && d < (this.sp.ambushR || 6) * 1.6) this.emergeNear(x, z); return; }
      if (this.state === 'asleep') return;
      if (this.state === 'chase') { this.lastKnown = { x, z }; return; }
      this.lastKnown = { x, z };
      this.awareness = Math.max(this.awareness, 0.5);
      this.setState('investigate');
    }
    // the player's light: in the beam, or the torch on within range with a line between
    torchOnMe(maxD) { return this.inFlashBeam(maxD); }
    // ---------------------------------------------------------------- lairs and ambush
    lairs() {
      const L = this.L, key = 'lair:' + this.kind;
      if (!L.spots[key] && this.sp.autoLairs) L.spots[key] = autoLairs(L, this.sp.autoLairs, this.sp);
      return (L.spots[key] || []).concat(this.cfg.lairSpot ? (L.spots[this.cfg.lairSpot] || []) : []);
    }
    // Hide somewhere out of sight, ready to come out again
    bury(near) {
      const g = this.g, L = this.L, pl = g.player.pos;
      const lairs = this.lairs().filter(s => !L.los(s.wx, s.wz, pl.x, pl.z) || Math.hypot(s.wx - pl.x, s.wz - pl.z) > 14);
      let s = lairs.length ? lairs[Math.floor(Math.random() * lairs.length)] : null;
      if (near && lairs.length) { lairs.sort((a, b) => Math.hypot(a.wx - pl.x, a.wz - pl.z) - Math.hypot(b.wx - pl.x, b.wz - pl.z)); s = lairs[Math.min(lairs.length - 1, Math.floor(Math.random() * 3))]; }
      if (s) { this.placeCell(s.x, s.y); this.pos.set(s.wx, 0, s.wz); this.heading = s.yaw || this.heading; }
      else { const pc = g.nav.playerCell, c = this.randomCellNear(pc.x, pc.y, 12, 24, true); if (c) this.placeCell(c.x, c.y); }
      this.lair = s;
      this.setState('buried');
      this.awareness = 0;
      this.mesh.visible = !!this.sp.visibleBuried;
    }
    // Come out at (or near) a point: right where the trigger fired
    emergeNear(x, z) {
      const g = this.g, L = this.L;
      let px = this.pos.x, pz = this.pos.z;
      if (this.sp.emergeAt === 'player') {
        // a few metres off, preferably to the side or behind the player, never on top of them
        const pl = g.player, fw = pl.forward();
        let best = null, bs = -1e9;
        for (let k = 0; k < 14; k++) {
          const a = Math.random() * Math.PI * 2, d = (this.sp.emergeDist || 3.2) + Math.random() * 1.6;
          const qx = pl.pos.x + Math.sin(a) * d, qz = pl.pos.z + Math.cos(a) * d, c = L.cellOf(qx, qz);
          if (!L.passable(c.x, c.y) || !this.cellOk(c.x, c.y) || !L.los(pl.pos.x, pl.pos.z, qx, qz)) continue;
          if (this.sp.emergeOn && !this.sp.emergeOn(this, c.x, c.y)) continue;
          const sc = -((qx - pl.pos.x) * fw.x + (qz - pl.pos.z) * fw.z) / d + Math.random() * 0.4;   // prefer behind
          if (sc > bs) { bs = sc; best = [qx, qz, c]; }
        }
        if (!best) return false;
        px = best[0]; pz = best[1]; this.cell = best[2];
      }
      this.pos.set(px, 0, pz);
      this.next = null;
      this.lastKnown = { x: x != null ? x : g.player.pos.x, z: z != null ? z : g.player.pos.z };
      this.faceToward(g.player.pos.x, g.player.pos.z, 1, 99);
      this.mesh.visible = !has(this, 'invisible');
      this.anim.emerge = 0;
      this.setState('emerge');
      this.voice('emerge');
      g.fearAdd(18);
      if (this.sp.onEmerge) this.sp.onEmerge(this, g);
      return true;
    }
    // ---------------------------------------------------------------- update
    update(dt) {
      const g = this.g, sp = this.sp, pl = g.player;
      this.stateT += dt; this.anim.t += dt;
      const dm = this.dif.speed;
      const d = this.distToPlayer();
      let speed = 0;
      // rules that switch the creature on and off
      const ticketOk = has(this, 'ticketRule') && g.inv && g.inv.ticket && !g.flags.ticketVoid;
      const musicOff = has(this, 'musicRule') && !g.flags.music;
      const warmOff = has(this, 'warmthWake') && !this.nearHeat();
      if (sp.preUpdate && sp.preUpdate(this, g, dt) === false) { this.pose(dt, 0); return; }
      switch (this.state) {
        case 'dormant': this.mesh.visible = !!sp.visibleDormant; this.pose(dt, 0); return;
        case 'buried': {
          this.mesh.visible = !!sp.visibleBuried;
          if (this.ambushTrigger(dt, d)) this.emergeNear();
          this.pose(dt, 0);
          this.breath(0);
          return;
        }
        case 'asleep': {
          // a figure in a seat; a light resting on it, or brushing past it, wakes it
          this.mesh.visible = true;
          const lit = this.torchOnMe(sp.wakeD || 9);
          this.litT = lit ? (this.litT || 0) + dt : Math.max(0, (this.litT || 0) - dt * 0.5);
          if (this.litT > (sp.wakeT || 0.7) || (d < 1.3 && pl.moving && !pl.crouching)) { this.anim.emerge = 0; this.lastKnown = { x: pl.pos.x, z: pl.pos.z }; this.setState('emerge'); this.voice('emerge'); g.fearAdd(14); }
          this.pose(dt, 0);
          return;
        }
        case 'emerge': {
          this.anim.emerge = Math.min(1, this.anim.emerge + dt / (sp.emergeT || 1.1));
          this.faceToward(pl.pos.x, pl.pos.z, dt, 6);
          if (this.anim.emerge >= 1) { this.awareness = 1.2; this.setState(this.alarmOnly ? 'alarm' : 'chase'); if (!this.alarmOnly) g.onSpotted(this); }
          this.pose(dt, 0);
          this.tryCatch();
          return;
        }
        case 'stunned': {
          this.stunT -= dt;
          if (this.stunT <= 0) { this.setState(this.lastKnown ? 'search' : 'patrol'); }
          this.pose(dt, 0);
          return;
        }
        case 'charge': { speed = this.chargeUpdate(dt, dm); this.pose(dt, speed); this.tryCatch(); this.breath(d); return; }
        case 'windup': {
          this.faceToward(pl.pos.x, pl.pos.z, dt, 8);
          if (this.stateT > (sp.windup || 0.9)) this.startCharge();
          this.pose(dt, 0);
          return;
        }
        case 'alarm': {
          // it calls the others and keeps watching you
          this.faceToward(pl.pos.x, pl.pos.z, dt, 6);
          if (!this.called || g.time - this.called > 6) { this.called = g.time; this.voice('alarm'); g.noise(pl.pos.x, pl.pos.z, sp.alarmR || 40, 'loud'); for (const e of g.entities) if (e !== this && e.hostile && e.state !== 'chase' && e.state !== 'dormant') { e.lastKnown = { x: pl.pos.x, z: pl.pos.z }; if (e.state === 'buried' && e.ambush) e.emergeNear(pl.pos.x, pl.pos.z); else e.setState('investigate'); } }
          if (!this.losToPlayer() || d > (sp.senses.sight || 18) * 1.2 || pl.hidden) { if (this.stateT > 3) this.setState('patrol'); }
          this.pose(dt, 0);
          return;
        }
      }
      // ---- moving states (patrol / investigate / search / chase / hold)
      const observed = (has(this, 'freezeWhenSeen')) && this.observed();
      const playerStill = has(this, 'moveWhenMoving') && !(pl.moving && Math.hypot(pl.vel.x, pl.vel.z) > 0.4);
      const frozen = observed || playerStill || ticketOk || musicOff || warmOff;
      this.anim.frozen = U.damp(this.anim.frozen, frozen ? 1 : 0, 10, dt);
      if (frozen) {
        // statue: it does not move or turn; it does notice
        if (observed && !this.seenOnce) { this.seenOnce = true; g.fearAdd(10); }
        if (ticketOk && d < 2.5) { this.faceToward(pl.pos.x, pl.pos.z, dt, 3); if (sp.onTicket) sp.onTicket(this, g, dt); }
        this.pose(dt, 0);
        this.breath(0);
        if (this.state === 'chase' && (ticketOk || musicOff)) this.setState('patrol');
        return;
      }
      // lights draw it
      if (has(this, 'lightSeeker')) this.seekLight(dt);
      // stillness hunters go back down when you leave
      if (has(this, 'stillnessHunter') && this.state !== 'chase' && d > (sp.leaveR || 18)) { this.bury(); return; }
      const before = this.pos.clone();
      if (has(this, 'charger') && this.state === 'chase' && d < (sp.chargeR || 13) && d > 3 && this.losToPlayer() && (this.chargeCd || 0) <= 0) { this.setState('windup'); this.voice('windup'); this.pose(dt, 0); return; }
      this.chargeCd = Math.max(0, (this.chargeCd || 0) - dt);
      const s = sp.speeds;
      this.baseAI(dt, { sight: sp.senses.sight, fov: sp.senses.fov || 2.2, speed: s.chase * dm * (this.cfg.speedMul || 1), patrol: s.patrol * dm, investigate: (s.investigate || s.patrol * 1.5) * dm, lose: sp.lose, hunt: !!sp.hunt, notice: sp.notice || 2, searchTime: sp.searchTime || 12 });
      // losing you for good: an ambusher goes back under
      if ((this.ambush || has(this, 'stillnessHunter')) && this.state === 'patrol' && this.prevState === 'search') this.bury(true);
      speed = Math.hypot(this.pos.x - before.x, this.pos.z - before.z) / Math.max(dt, 1e-3);
      if (this.atEdge && this.state === 'chase') { this.faceToward(pl.pos.x, pl.pos.z, dt, 5); }
      this.pose(dt, speed);
      if (this.state === 'chase' || d < 2) this.tryCatch();
      this.breath(this.state === 'chase' ? d : 99);
      this.footsteps(dt, speed, d);
      if (sp.postUpdate) sp.postUpdate(this, g, dt);
    }
    // What makes an ambusher come out
    ambushTrigger(dt, d) {
      const g = this.g, pl = g.player, sp = this.sp, R = sp.ambushR || 5;
      if (pl.hidden) return false;
      if (sp.ambushCheck) return sp.ambushCheck(this, g, dt, d);
      const near = d < R;
      switch (this.ambush) {
        case 'floor': case 'snow': return near && pl.moving && !pl.crouching && (this.ambush !== 'snow' || pl.sprinting);
        case 'water': return near && (g.world.floorAt(pl.pos.x, pl.pos.z) < -0.1 || d < R * 0.6);
        case 'ceiling': return d < (sp.ambushR || 2.4) && !pl.crouching;
        case 'wall': {
          // only when your back is to it
          if (!near) return false;
          const fw = pl.forward(), vx = this.pos.x - pl.pos.x, vz = this.pos.z - pl.pos.z;
          return (vx * fw.x + vz * fw.z) / Math.max(d, 0.01) < -0.2;
        }
        case 'seat': return near && (this.torchOnMe(9) || d < 1.6);
        case 'ice': return near && pl.sprinting && g.flags.thinIce;
        case 'gap': return near && !!g.flags.onGangway;
        case 'still': {
          if (d < R && !(pl.moving && Math.hypot(pl.vel.x, pl.vel.z) > 0.35)) this.stillT += dt; else this.stillT = Math.max(0, this.stillT - dt * 2);
          return this.stillT > (sp.stillT || 3.5);
        }
        default: return near;
      }
    }
    nearHeat() {
      const g = this.g, pl = g.player.pos, list = g.level.spots.heat || [];
      for (const h of list) if (Math.hypot(h.wx - pl.x, h.wz - pl.z) < (h.r || 5)) return true;
      return !!(g.flags.carryingHeat);
    }
    seekLight(dt) {
      const g = this.g, pl = g.player;
      // glowsticks first: it goes and stands over them
      let best = null, bd = this.sp.lightR || 22;
      for (const gs of g.glowsticks || []) { if (gs.t < 0.5) continue; const dd = Math.hypot(gs.pos.x - this.pos.x, gs.pos.z - this.pos.z); if (dd < bd) { bd = dd; best = gs.pos; } }
      if (best) { if (this.state !== 'chase') { this.lastKnown = { x: best.x, z: best.z }; if (this.state !== 'investigate') this.setState('investigate'); } return; }
      if (pl.flashOn && pl.flash.intensity > 20 && this.distToPlayer() < (this.sp.lightR || 22) && this.state !== 'chase') {
        this.lastKnown = { x: pl.pos.x, z: pl.pos.z };
        this.awareness = Math.min(1.2, this.awareness + dt * 0.6);
        if (this.state !== 'investigate' && this.awareness < 1) this.setState('investigate');
      }
    }
    // ---------------------------------------------------------------- the charge
    startCharge() {
      const pl = this.g.player.pos, dx = pl.x - this.pos.x, dz = pl.z - this.pos.z, l = Math.hypot(dx, dz) || 1;
      this.chargeDir = { x: dx / l, z: dz / l }; this.chargeLeft = l + 6;
      this.setState('charge'); this.voice('charge');
    }
    chargeUpdate(dt, dm) {
      const sp = this.sp, v = (sp.chargeSpeed || 9) * dm, step = v * dt;
      const ox = this.pos.x, oz = this.pos.z;
      this.pos.x += this.chargeDir.x * step; this.pos.z += this.chargeDir.z * step;
      this.settle();
      this.heading = Math.atan2(this.chargeDir.x, this.chargeDir.z);
      this.chargeLeft -= step;
      const moved = Math.hypot(this.pos.x - ox, this.pos.z - oz);
      this.cell = this.L.cellOf(this.pos.x, this.pos.z);
      if (moved < step * 0.4) {
        // ran into something: stunned
        this.stunT = sp.stunT || 2.6; this.setState('stunned'); this.chargeCd = 4;
        this.g.player.addTrauma(U.clamp(1 - this.distToPlayer() / 14, 0, 0.5));
        this.voice('impact');
        return 0;
      }
      if (this.chargeLeft <= 0) { this.setState('chase'); this.chargeCd = 3; }
      return v;
    }
    stun(t) { this.stunT = t || 4; this.setState('stunned'); }
    // ---------------------------------------------------------------- sound
    voice(ev) { const a = this.g.audio; if (a && a.species) a.species(this, ev); }
    // Breathing right behind your head while it chases you, close enough to feel
    breath(d) {
      const a = this.g.audio;
      if (!a || !a.speciesBreath) return;
      const k = d < 9 ? U.clamp(1 - (d - 0.8) / 8.2, 0, 1) : 0;
      a.speciesBreath(this, k);
    }
    footsteps(dt, speed, d) {
      const a = this.g.audio;
      if (!a || !a.speciesStep || speed < 0.3) return;
      const rate = this.sp.stepRate || 1.6;
      this.stepAcc = (this.stepAcc || 0) + dt * speed / rate;
      if (this.stepAcc >= 1) { this.stepAcc -= 1; if (d < (this.state === 'chase' ? 26 : this.sp.stepHear || 9)) a.speciesStep(this, d); }
    }
    // ---------------------------------------------------------------- animation
    pose(dt, speed) {
      const an = this.anim, sp = this.sp;
      an.speed = U.damp(an.speed, speed, 6, dt);
      an.walk += dt * an.speed * (sp.gait || 1.8);
      an.alert = U.damp(an.alert, this.state === 'chase' ? 1 : this.state === 'investigate' || this.state === 'search' ? 0.5 : 0, 3, dt);
      const y = this.vis.lift ? this.vis.lift(this, dt) : 0;
      this.mesh.position.set(this.pos.x, y + (this.yOff || 0), this.pos.z);
      this.mesh.rotation.y = this.heading;
      if (this.vis.animate) this.vis.animate(this, dt);
    }
    info() { return null; }
    remove() { super.remove(); const a = this.g.audio; if (a) { a.stopLoop(this.breathKey, 0.2); } }
  }

  // The player's death: each species kills its own way (kills.js); this picks the choreography
  Creature.prototype.killKind = function () { return this.sp.kill; };

  PB.Creature = Creature;
  // Entities created by type name: chapter definitions list { type: 'drowned', count: 6, ... }
  E.makeSpecies = (game, type, o) => { const sp = SPECIES[type]; return sp ? new Creature(game, sp, o) : null; };
})(typeof window !== 'undefined' ? window : globalThis);
