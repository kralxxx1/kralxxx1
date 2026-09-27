/* New creatures: Crawlers (storm tunnels), the Hall Monitor (school), Mannequins (mall),
   the Neighbor (motel, Maple Street) and Chompy (the mascot costume in the workshop). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U;
  const E = PB.Entities;
  const Base = Object.getPrototypeOf(E.Grinner.prototype).constructor; // Entity
  const H = Math.PI / 2;

  const std = (color, rough, metal = 0, extra = {}) => { const m = new THREE.MeshStandardMaterial(Object.assign({ color, roughness: rough, metalness: metal }, extra)); return m; };
  const mesh = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); m.castShadow = true; return m; };
  const patch = (g, mats) => { if (g.world) for (const m of mats) g.world.patch(m); };

  // ------------------------------------------------------------ CRAWLER
  class Crawler extends Base {
    constructor(game, o) {
      super(game, 'crawler', o);
      const m = PB.Monsters.crawler();
      this.vis = { group: m.group, mats: m.mats };
      this.legs = m.legs;
      this.mesh.add(m.group); E.lit(game, m.group);
      this.catchR = 0.95; this.radius = 0.28; this.hearMul = 1.6; this.walk = 0; this.fearT = 0;
    }
    canSeePlayer(range, fov) { return Base.prototype.canSeePlayer.call(this, range, fov) * 1.3; }
    // It keeps to the dark: patrols and flanking routes end in unlit cells
    cellOk(x, y) { return this.frenzyT > 0 || this.g.world.lightAt(this.L.cx(x), this.L.cz(y)) < 0.75; }
    lightScared() {
      const g = this.g;
      if (this.inFlashBeam(9)) return true;
      for (const gs of g.glowsticks || []) if (gs.t > 0.5 && Math.hypot(gs.mesh.position.x - this.pos.x, gs.mesh.position.z - this.pos.z) < 4.5) return true;
      return g.world.lightAt(this.pos.x, this.pos.z) > 0.9;
    }
    // Close and in the open, it rushes the last few meters
    chaseSpeed(sp) { const d = this.distToPlayer(); return sp.speed * (d < 4.5 && this.losToPlayer() ? 1.55 : 1) * (this.frenzyT > 0 ? 1.15 : 1); }
    update(dt) {
      const g = this.g, dm = this.dif.speed, d = this.distToPlayer();
      this.stateT += dt;
      // Light hurts it: it recoils and circles round to come at you from the dark. It does not stay
      // scared: pin it in the beam too long, or chase it off too often, and it goes into a frenzy.
      const lit = this.lightScared();
      this.litT = lit ? (this.litT || 0) + dt : Math.max(0, (this.litT || 0) - dt * 0.6);
      this.nerve = Math.max(0, (this.nerve || 0) - dt / 25);
      if (this.frenzyT > 0) this.frenzyT -= dt;
      if (lit && !(this.frenzyT > 0) && this.state !== 'flee') {
        const pos = { x: this.pos.x, y: 0.4, z: this.pos.z };
        if (this.nerve >= 2.2 || (this.litT > 2.4 && d < 6)) {
          this.frenzyT = 3.5; this.nerve = 0; this.awareness = 1.2; this.lastKnown = { x: g.player.pos.x, z: g.player.pos.z }; this.setState('chase');
          g.flashInterference = Math.max(g.flashInterference || 0, 1.2);
          if (g.audio) g.audio.creature('crawler', pos, !this.losToPlayer(), { gain: 1.1, rate: 0.8 });
        } else {
          this.setState('flee'); this.fearT = 0.9 + Math.random() * 0.7; this.nerve += 1;
          if (g.audio && d < 16) g.audio.creature('crawler', pos, !this.losToPlayer(), { gain: 0.7 });
        }
      }
      if (this.state === 'flee') {
        this.fearT -= dt;
        this.advance(dt, 4.4 * dm, g.nav.playerField, true);
        if (this.cornered && d < 4) { this.frenzyT = 3; this.lastKnown = { x: g.player.pos.x, z: g.player.pos.z }; this.setState('chase'); }
        else if (this.fearT <= 0) { this.setState('flank'); this.flank = null; }
      } else if (this.state === 'flank') {
        // Round to a cell beside or behind the player, out of the beam, then attack
        if (!this.flank || this.arrived || this.stateT > 7) {
          const pc = g.nav.playerCell, fw = g.player.forward();
          let best = null, bs = -1e9;
          for (let k = 0; k < 16; k++) {
            const c = this.randomCellNear(pc.x, pc.y, 2, 6);
            if (!c) continue;
            const vx = this.L.cx(c.x) - g.player.pos.x, vz = this.L.cz(c.y) - g.player.pos.z, n = Math.hypot(vx, vz) || 1;
            const sc = -(vx * fw.x + vz * fw.z) / n + Math.random() * 0.3;
            if (sc > bs) { bs = sc; best = c; }
          }
          this.flank = best || pc; this.setGoal(this.flank.x, this.flank.y); this.arrived = false;
        }
        this.arrived = this.advance(dt, 3.6 * dm, this.goalField);
        if (this.arrived || this.stateT > 9 || (d < 3.5 && this.losToPlayer())) { this.awareness = 1.2; this.lastKnown = { x: g.player.pos.x, z: g.player.pos.z }; this.setState('chase'); }
      } else this.baseAI(dt, { sight: 13, fov: 2.8, speed: 4.2 * dm, patrol: 1.6 * dm, investigate: 3.2 * dm, lose: 7, hunt: true, notice: 1.8, searchTime: 12 });
      // Skittering legs
      const moving = this.next != null;
      this.walk += dt * (this.state === 'chase' || this.state === 'flee' || this.state === 'flank' ? 16 : 8) * (moving ? 1 : 0.1);
      for (const l of this.legs) { l.hip.rotation.y = Math.sin(this.walk + l.ph) * 0.45; l.hip.rotation.z = Math.max(0, Math.sin(this.walk + l.ph + H)) * 0.35 * l.side; }
      this.mesh.position.set(this.pos.x, Math.abs(Math.sin(this.walk * 2)) * 0.03, this.pos.z);
      this.mesh.rotation.y = this.heading;
      if (g.audio && moving && (this.stepT = (this.stepT || 0) - dt) <= 0) {
        this.stepT = this.state === 'chase' ? 0.12 : 0.28;
        if (d < 20) g.audio.play('step_tile', 8, 'ent', { x: this.pos.x, y: 0.2, z: this.pos.z }, { rev: 0.4, occl: true, occluded: !this.losToPlayer(), gain: 0.25, rate: 2.2, jitter: 0.3 });
      }
      if (this.state !== 'flee') this.tryCatch();
    }
    stun() { this.setState('flee'); this.fearT = 5; }
  }

  // ------------------------------------------------------------ HALL MONITOR
  class Monitor extends Base {
    constructor(game, o) {
      super(game, 'monitor', o);
      const m = PB.Monsters.monitor();
      const g = m.group, arm = m.arm;
      // The flashlight in the raised hand, and its beam: the only way it sees
      const dark = std(0x1a1a1c, 0.6), lensM = new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 3.8, 3.2) });
      arm.add(mesh(new THREE.CylinderGeometry(0.035, 0.028, 0.22, 12), dark, 0, -0.04, 0.62, H - 0.25, 0, 0));
      arm.add(mesh(new THREE.CircleGeometry(0.03, 12), lensM, 0, -0.012, 0.735, -0.25, 0, 0));
      const beam = new THREE.SpotLight(0xfff0d0, 60, 18, 0.38, 0.4, 1.6);
      beam.position.set(0.26, 1.62, 0.8); beam.target.position.set(0.1, 0.2, 6);
      g.add(beam, beam.target);
      this.beam = beam; this.arm = arm;
      this.vis = { group: g, mats: m.mats.concat([dark]), head: m.head };
      this.mesh.add(g); E.lit(game, g);
      this.catchR = 1.2; this.hearMul = 0.8; this.walk = 0; this.selfLit = true;
    }
    // It only sees what its flashlight touches
    canSeePlayer(range) {
      const pl = this.g.player;
      if (pl.hidden) return 0;
      const d = this.distToPlayer();
      if (d > 15) return 0;
      const a = Math.atan2(pl.pos.x - this.pos.x, pl.pos.z - this.pos.z);
      if (d > 1.6 && Math.abs(U.angleWrap(a - this.heading)) > 0.42) return 0;
      if (!this.losToPlayer()) return 0;
      return (1.2 - d / 16) * this.dif.sight;
    }
    onState(s) {
      if (s === 'chase' && this.g.audio) {
        const o = this.g.audio.out('ent', { x: this.pos.x, y: 1.5, z: this.pos.z }, { rev: 0.5, gain: 0.8, ref: 4 }), t = this.g.audio.t;
        for (const k of [0, 0.35]) { const osc = this.g.audio.tone(o.input, 'sine', 2950, 2900, t + k, 0.28, 0.35, 0.01); const lfo = this.g.audio.osc('sine', 42), lg = this.g.audio.ctx.createGain(); lg.gain.value = 180; lfo.connect(lg).connect(osc.frequency); lfo.start(t + k); lfo.stop(t + k + 0.35); }
        this.g.audio.caption('whistle', PB.t('cap.whistle'), this.pos, 4);
      }
    }
    update(dt) {
      const g = this.g, dm = this.dif.speed;
      this.stateT += dt;
      if (this.stunT > 0) { this.stunT -= dt; if (this.stunT <= 0) this.setState('search'); }
      else this.baseAI(dt, { sight: 15, speed: 3.55 * dm, patrol: 1.35 * dm, investigate: 2.2 * dm, lose: 5, hunt: false, notice: 3.5, searchTime: 12 });
      // Sweep the flashlight left and right while patrolling
      const sweep = this.state === 'chase' ? 0 : Math.sin(g.time * 0.9 + this.pos.x) * 0.35;
      this.vis.group.rotation.y = sweep;
      this.walk += dt * (this.next ? (this.state === 'chase' ? 7 : 4) : 0.5);
      this.mesh.position.set(this.pos.x, Math.abs(Math.sin(this.walk)) * 0.04, this.pos.z);
      this.mesh.rotation.y = this.heading;
      this.beam.intensity = 60 * (0.9 + Math.random() * 0.1);
      if (g.audio && this.next && (this.stepT = (this.stepT || 0) - dt) <= 0) {
        this.stepT = this.state === 'chase' ? 0.32 : 0.62;
        if (this.distToPlayer() < 26) g.audio.play('step_lino', 8, 'ent', { x: this.pos.x, y: 0.1, z: this.pos.z }, { rev: 0.5, occl: true, occluded: !this.losToPlayer(), gain: 0.7, rate: 0.85 });
      }
      this.tryCatch();
    }
    stun(t = 6) { this.stunT = t; this.setState('stunned'); }
  }

  // ------------------------------------------------------------ MANNEQUIN
  class Mannequin extends Base {
    constructor(game, o) {
      super(game, 'mannequin', o);
      const m = PB.Monsters.mannequin();
      this.limbs = m.limbs;
      this.vis = { group: m.group, mats: m.mats, head: m.head };
      this.mesh.add(m.group); E.lit(game, m.group);
      this.catchR = 1.1; this.hostile = true; this.pose();
      this.state = 'idle';
    }
    pose() {
      for (const l of this.limbs) { l.sh.rotation.set((Math.random() - 0.5) * 2.4, 0, l.sx * Math.random() * 0.8); l.el.rotation.x = -Math.random() * 1.6; l.hip.rotation.x = (Math.random() - 0.5) * 0.9; l.kn.rotation.x = Math.random() * 0.9; }
      this.vis.head.rotation.set((Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 0.7);
    }
    update(dt) {
      const g = this.g, d = this.distToPlayer();
      this.stateT += dt;
      const seen = this.observed() || (g.player.flashOn && this.inFlashBeam(20));
      if (this.state === 'idle') { if (d < 22 && !seen && this.stateT > 2) this.setState('stalk'); }
      else if (!seen && !g.player.hidden) {
        // Moves only while nobody is looking
        this.advance(dt, 5.2 * this.dif.speed, g.nav.playerField);
        this.faceToward(g.player.pos.x, g.player.pos.z, dt, 10);
        this.moved = (this.moved || 0) + dt;
        if (g.audio && (this.stepT = (this.stepT || 0) - dt) <= 0) { this.stepT = 0.3; if (d < 18) { g.audio.play('plasticTap', 4, 'ent', { x: this.pos.x, y: 0.3, z: this.pos.z }, { rev: 0.4, occl: true, occluded: !this.losToPlayer(), gain: 0.35, rate: 0.6 }); g.audio.caption('mannequin', PB.t('cap.plastic'), this.pos, 12); } }
        if (d < this.catchR && this.losToPlayer()) g.killPlayer(this);
      } else if (this.moved > 0.2) { this.moved = 0; this.pose(); g.fearAdd && g.fearAdd(d < 6 ? 8 : 3); }
      this.mesh.position.set(this.pos.x, 0, this.pos.z);
      this.mesh.rotation.y = this.heading;
    }
    stun() { this.setState('idle'); this.stateT = -6; }
  }

  // ------------------------------------------------------------ THE NEIGHBOR
  class Neighbor extends Base {
    constructor(game, o) {
      super(game, 'neighbor', o);
      const m = PB.Monsters.neighbor();
      this.vis = { group: m.group, mats: m.mats, head: m.head };
      this.mesh.add(m.group); E.lit(game, m.group);
      this.catchR = 1.4; this.state = 'lurk'; this.nextCall = 12 + Math.random() * 15; this.lookT = 0;
    }
    update(dt) {
      const g = this.g, pl = g.player, d = this.distToPlayer();
      this.stateT += dt;
      const seen = this.observed();
      const lit = this.inFlashBeam(18);
      if (lit) this.lookT += dt; else this.lookT = Math.max(0, this.lookT - dt);
      if (this.lookT > 0.8) {
        // The light makes him step back into the dark
        this.advance(dt, 1.8, g.nav.playerField, true);
        if (this.lookT > 3 && d > 10) { this.relocate(); this.lookT = 0; }
      } else if (!seen && d > 1.2) {
        this.advance(dt, (d > 14 ? 3.4 : 2.1) * this.dif.speed, g.nav.playerField);
        if (d < this.catchR + 0.4 && this.losToPlayer() && !pl.hidden) g.killPlayer(this);
      }
      this.faceToward(pl.pos.x, pl.pos.z, dt, seen ? 3 : 8);
      this.vis.head.rotation.z = Math.sin(g.time * 0.7) * 0.25 + (seen ? 0.35 : 0);
      this.mesh.position.set(this.pos.x, 0, this.pos.z);
      this.mesh.rotation.y = this.heading;
      if (seen && !this.seenOnce) { this.seenOnce = true; g.fearAdd && g.fearAdd(20); if (g.audio) g.audio.creature('neighbor', { x: this.pos.x, y: 1.9, z: this.pos.z }, false, { gain: 0.8 }); if (g.script.onNeighbor) g.script.onNeighbor(g, this); }
      // He calls out in a voice you know
      this.nextCall -= dt;
      if (this.nextCall <= 0 && g.audio && g.audio.sfx && d < 30) {
        this.nextCall = 20 + Math.random() * 25;
        // On Maple Street it borrows Clyde's voice; in Eddie's motel it calls for him in June's
        const june = g.levelDef && g.levelDef.id === 'motel';
        g.audio.calloutVoice(june, { x: this.pos.x, y: 1.8, z: this.pos.z }, !this.losToPlayer());
        g.audio.caption('neighbor', PB.t(june ? 'cap.callJune' : 'cap.callName'), this.pos, 10);
      }
    }
    relocate() {
      const pc = this.g.nav.playerCell;
      const c = this.randomCellNear(pc.x, pc.y, 12, 24, true);
      if (c) this.placeCell(c.x, c.y);
    }
    stun() { this.relocate(); }
  }

  // ------------------------------------------------------------ CHOMPY
  class Chompy extends Base {
    constructor(game, o) {
      super(game, 'chompy', o);
      const m = PB.Monsters.chompy();
      this.vis = { group: m.group, mats: m.mats, head: m.head, arms: m.arms };
      this.mesh.add(m.group); E.lit(game, m.group);
      this.catchR = 1.3; this.radius = 0.45; this.state = o.dormant ? 'display' : 'hunt'; this.walk = 0; this.litT = 0; this.coverT = 0;
    }
    update(dt) {
      const g = this.g, d = this.distToPlayer();
      this.stateT += dt;
      // On its stand it is just a costume. Until it isn't.
      if (this.state === 'display') {
        this.mesh.position.set(this.pos.x, 0.05, this.pos.z);
        this.mesh.rotation.y = this.heading;
        for (const a of this.vis.arms) a.rotation.x = 0;
        if (g.flags.chompyAwake || d < 3.2 || this.stateT > 150) {
          this.setState('hunt'); g.flags.chompyAwake = true;
          if (g.audio) { g.audio.play('stingSpot', 3, 'ent', { x: this.pos.x, y: 1.8, z: this.pos.z }, { rev: 0.6, gain: 0.55, rate: 0.8 }); g.audio.creature('chompy', { x: this.pos.x, y: 1.9, z: this.pos.z }, !this.losToPlayer()); }
          if (d < 12 && this.losToPlayer()) g.player.addTrauma(0.35);
        }
        return;
      }
      if (this.inFlashBeam(14)) this.litT += dt; else this.litT = Math.max(0, this.litT - dt * 0.5);
      if (this.coverT > 0) {
        // Covers its eyes from the light
        this.coverT -= dt;
        for (const a of this.vis.arms) a.rotation.x = U.damp(a.rotation.x, -2.6, 8, dt);
      } else {
        if (this.litT > 1.2) { this.coverT = 3.5; this.litT = 0; if (g.audio) g.audio.play('stingSpot', 3, 'ent', { x: this.pos.x, y: 1.8, z: this.pos.z }, { rev: 0.5, gain: 0.3, rate: 1.6 }); }
        for (const a of this.vis.arms) a.rotation.x = U.damp(a.rotation.x, Math.sin(this.walk) * 0.5 * (a.position.x > 0 ? 1 : -1) - 0.3, 6, dt);
        if (!g.player.hidden || d > 3) this.advance(dt, 2.05 * this.dif.speed, g.nav.playerField);
        this.walk += dt * 4.5;
        if (d < this.catchR && this.losToPlayer() && !g.player.hidden) g.killPlayer(this);
        if (g.audio && (this.stepT = (this.stepT || 0) - dt) <= 0) {
          this.stepT = 0.7;
          if (d < 24) { g.audio.play('step_wood', 8, 'ent', { x: this.pos.x, y: 0.1, z: this.pos.z }, { rev: 0.5, occl: true, occluded: !this.losToPlayer(), gain: 1.0, rate: 0.55 }); if (Math.random() < 0.3) g.audio.play('doorLocked', 2, 'ent', { x: this.pos.x, y: 0.2, z: this.pos.z }, { rev: 0.4, gain: 0.15, rate: 2.6 }); g.audio.caption('chompy', PB.t('cap.heavySteps'), this.pos, 10); }
        }
      }
      this.faceToward(g.player.pos.x, g.player.pos.z, dt, 4);
      this.vis.head.rotation.z = Math.sin(this.walk * 0.5) * 0.12;
      this.vis.group.rotation.z = Math.sin(this.walk) * 0.06;
      this.mesh.position.set(this.pos.x, Math.abs(Math.sin(this.walk)) * 0.06, this.pos.z);
      this.mesh.rotation.y = this.heading;
    }
    stun() { this.coverT = 6; }
  }

  E.extra = { crawler: Crawler, monitor: Monitor, mannequin: Mannequin, neighbor: Neighbor, chompy: Chompy };
  Object.assign(E, E.extra);
})(typeof window !== 'undefined' ? window : globalThis);
