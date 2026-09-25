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
      const g = new THREE.Group();
      const skin = std(0xc8b8a8, 0.45, 0, { emissive: 0x100804 }), dark = std(0x2a1a14, 0.6);
      patch(game, [skin, dark]);
      const body = mesh(new THREE.CapsuleGeometry(0.16, 0.55, 6, 12), skin, 0, 0.32, 0, H, 0, 0); body.scale.set(1, 1, 0.75); g.add(body);
      const head = mesh(new THREE.SphereGeometry(0.15, 16, 12), skin, 0, 0.36, 0.42); head.scale.set(1, 0.7, 1.2); g.add(head);
      const eyeM = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.4, 2.2, 1.6) });
      for (let k = 0; k < 6; k++) g.add(mesh(new THREE.SphereGeometry(0.018, 6, 4), eyeM, (k % 3 - 1) * 0.05, 0.4 + Math.floor(k / 3) * 0.04, 0.56));
      g.add(mesh(new THREE.TorusGeometry(0.06, 0.012, 6, 12, Math.PI), dark, 0, 0.3, 0.56, 0, 0, Math.PI));
      this.legs = [];
      for (let k = 0; k < 6; k++) {
        const side = k % 2 ? 1 : -1, z = -0.22 + Math.floor(k / 2) * 0.22;
        const hip = new THREE.Group(); hip.position.set(side * 0.13, 0.34, z); g.add(hip);
        const up = mesh(new THREE.CapsuleGeometry(0.022, 0.3, 3, 6), skin, side * 0.14, 0.08, 0, 0, 0, side * 1.1); hip.add(up);
        const knee = new THREE.Group(); knee.position.set(side * 0.28, 0.14, 0); hip.add(knee);
        knee.add(mesh(new THREE.CapsuleGeometry(0.016, 0.38, 3, 6), skin, side * 0.08, -0.2, 0, 0, 0, -side * 0.35));
        this.legs.push({ hip, knee, side, ph: k * 1.05 });
      }
      this.vis = { group: g, mats: [skin, dark] };
      this.mesh.add(g);
      this.catchR = 0.95; this.hearMul = 1.6; this.walk = 0; this.fearT = 0;
    }
    canSeePlayer(range, fov) { return Base.prototype.canSeePlayer.call(this, range, fov) * 1.3; }
    lightScared() {
      const g = this.g;
      if (this.inFlashBeam(9)) return true;
      for (const gs of g.glowsticks || []) if (gs.t > 0.5 && Math.hypot(gs.mesh.position.x - this.pos.x, gs.mesh.position.z - this.pos.z) < 4.5) return true;
      return g.world.lightAt(this.pos.x, this.pos.z) > 0.9;
    }
    update(dt) {
      const g = this.g, dm = this.dif.speed;
      this.stateT += dt;
      if (this.lightScared()) {
        if (this.state !== 'flee') { this.setState('flee'); if (g.audio && this.distToPlayer() < 16) { g.audio.play('chew', 2, 'ent', { x: this.pos.x, y: 0.4, z: this.pos.z }, { rev: 0.4, gain: 0.5, rate: 1.8 }); g.audio.caption('crawlerHiss', PB.t('cap.hiss'), this.pos, 6); } }
        this.fearT = 2.5;
      }
      if (this.state === 'flee') {
        this.fearT -= dt;
        this.advance(dt, 4.6 * dm, g.nav.playerField, true);
        if (this.fearT <= 0) this.setState('search');
      } else this.baseAI(dt, { sight: 12, fov: 2.6, speed: 4.1 * dm, patrol: 1.5 * dm, investigate: 3.0 * dm, lose: 6, hunt: true, notice: 1.6, searchTime: 10 });
      // Skittering legs
      const moving = this.next != null;
      this.walk += dt * (this.state === 'chase' || this.state === 'flee' ? 16 : 8) * (moving ? 1 : 0.1);
      for (const l of this.legs) { l.hip.rotation.y = Math.sin(this.walk + l.ph) * 0.45; l.hip.rotation.z = Math.max(0, Math.sin(this.walk + l.ph + H)) * 0.35 * l.side; }
      this.mesh.position.set(this.pos.x, Math.abs(Math.sin(this.walk * 2)) * 0.03, this.pos.z);
      this.mesh.rotation.y = this.heading;
      if (g.audio && moving && (this.stepT = (this.stepT || 0) - dt) <= 0) {
        this.stepT = this.state === 'chase' ? 0.12 : 0.28;
        const d = this.distToPlayer();
        if (d < 20) g.audio.play('step_tile', 8, 'ent', { x: this.pos.x, y: 0.2, z: this.pos.z }, { rev: 0.4, occl: true, occluded: !this.losToPlayer(), gain: 0.25, rate: 2.2, jitter: 0.3 });
        if (d < 12) g.audio.caption('crawler', PB.t('cap.skitter'), this.pos, 10);
      }
      if (this.state !== 'flee') this.tryCatch();
    }
    stun() { this.setState('flee'); this.fearT = 5; }
  }

  // ------------------------------------------------------------ HALL MONITOR
  class Monitor extends Base {
    constructor(game, o) {
      super(game, 'monitor', o);
      const g = new THREE.Group();
      const coat = std(0x4a4c50, 0.85), skin = std(0xd8d0c4, 0.35), dark = std(0x1a1a1c, 0.6), sash = std(0xd8b020, 0.5);
      patch(game, [coat, skin, dark, sash]);
      g.add(mesh(new THREE.LatheGeometry([[0.001, 0], [0.32, 0], [0.3, 0.5], [0.24, 1.3], [0.2, 1.62], [0.001, 1.64]].map(p => new THREE.Vector2(p[0], p[1])), 20), coat, 0, 0.12, 0));
      g.add(mesh(new THREE.CapsuleGeometry(0.06, 0.12, 4, 8), skin, 0, 1.86, 0));
      const head = mesh(new THREE.SphereGeometry(0.15, 20, 14), skin, 0, 2.05, 0.02); head.scale.set(0.85, 1.25, 0.95); g.add(head);
      const sashM = mesh(new THREE.TorusGeometry(0.25, 0.025, 6, 20), sash, 0, 1.45, 0, 0.4, 0, 0.6); sashM.scale.set(1, 1.6, 1); g.add(sashM);
      g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.35, 6), dark, 0.05, 1.55, 0.2, 0.3), mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.07, 8), std(0xc8c8c8, 0.2, 1), 0.06, 1.38, 0.24, H));
      for (const sx of [-1, 1]) g.add(mesh(new THREE.CapsuleGeometry(0.06, 0.1, 4, 8), dark, sx * 0.12, 0.06, 0.06, H, 0, 0));
      // Arm raised with a flashlight
      const arm = new THREE.Group(); arm.position.set(0.26, 1.55, 0.05); g.add(arm);
      arm.add(mesh(new THREE.CapsuleGeometry(0.05, 0.5, 4, 8), coat, 0, -0.05, 0.25, H - 0.3, 0, 0));
      arm.add(mesh(new THREE.CylinderGeometry(0.035, 0.028, 0.22, 10), dark, 0, 0.04, 0.55, H - 0.3, 0, 0));
      const lens = mesh(new THREE.CircleGeometry(0.03, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 3.8, 3.2) }), 0, 0.075, 0.66, -0.3, 0, 0); arm.add(lens);
      const beam = new THREE.SpotLight(0xfff0d0, 60, 18, 0.38, 0.4, 1.6);
      beam.position.set(0.26, 1.62, 0.7); beam.target.position.set(0.1, 0.2, 6);
      g.add(beam, beam.target);
      this.beam = beam; this.arm = arm;
      g.add(mesh(new THREE.CapsuleGeometry(0.06, 0.55, 4, 8), coat, -0.27, 1.25, 0, 0, 0, 0.12));
      this.vis = { group: g, mats: [coat, skin, dark, sash] };
      this.mesh.add(g);
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
      const g = new THREE.Group();
      const pl = std(0xe8e4dc, 0.28, 0, { emissive: 0x080706 }); pl.userData.refl = 0.12;
      patch(game, [pl]);
      g.add(mesh(new THREE.CapsuleGeometry(0.15, 0.45, 6, 12), pl, 0, 1.25, 0));
      const head = mesh(new THREE.SphereGeometry(0.11, 18, 14), pl, 0, 1.73, 0); head.scale.set(0.85, 1.15, 0.95); g.add(head);
      g.add(mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.12, 8), pl, 0, 1.58, 0));
      this.limbs = [];
      for (const sx of [-1, 1]) {
        const sh = new THREE.Group(); sh.position.set(sx * 0.2, 1.5, 0); g.add(sh);
        sh.add(mesh(new THREE.CapsuleGeometry(0.045, 0.28, 4, 8), pl, 0, -0.18, 0));
        const el = new THREE.Group(); el.position.set(0, -0.36, 0); sh.add(el);
        el.add(mesh(new THREE.CapsuleGeometry(0.04, 0.26, 4, 8), pl, 0, -0.16, 0));
        const hip = new THREE.Group(); hip.position.set(sx * 0.09, 0.95, 0); g.add(hip);
        hip.add(mesh(new THREE.CapsuleGeometry(0.06, 0.38, 4, 8), pl, 0, -0.24, 0));
        const kn = new THREE.Group(); kn.position.set(0, -0.48, 0); hip.add(kn);
        kn.add(mesh(new THREE.CapsuleGeometry(0.05, 0.36, 4, 8), pl, 0, -0.22, 0));
        this.limbs.push({ sh, el, hip, kn, sx });
      }
      this.vis = { group: g, mats: [pl], head };
      this.mesh.add(g);
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
      const g = new THREE.Group();
      const robe = std(0x5a3a3a, 0.9), skin = std(0xb8a898, 0.5), dark = std(0x080606, 0.8);
      patch(game, [robe, skin, dark]);
      g.add(mesh(new THREE.LatheGeometry([[0.001, 0], [0.34, 0], [0.28, 0.6], [0.22, 1.5], [0.2, 1.85], [0.001, 1.9]].map(p => new THREE.Vector2(p[0], p[1])), 18), robe, 0, 0.05, 0));
      g.add(mesh(new THREE.CapsuleGeometry(0.05, 0.2, 4, 8), skin, 0, 2.0, 0.05, 0.4));
      const head = mesh(new THREE.SphereGeometry(0.14, 18, 12), skin, 0, 2.16, 0.14, 0.5); head.scale.set(0.85, 1.3, 0.95); g.add(head);
      const eyeM = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.5, 1.4, 1.2) });
      for (const sx of [-0.045, 0.045]) g.add(mesh(new THREE.SphereGeometry(0.012, 6, 4), eyeM, sx, 2.15, 0.27));
      g.add(mesh(new THREE.BoxGeometry(0.1, 0.012, 0.02), dark, 0, 2.06, 0.26));
      for (const sx of [-1, 1]) {
        const arm = mesh(new THREE.CapsuleGeometry(0.045, 1.1, 4, 8), robe, sx * 0.26, 1.25, 0.05, 0.08, 0, sx * 0.06); g.add(arm);
        const hand = mesh(new THREE.CapsuleGeometry(0.03, 0.18, 4, 6), skin, sx * 0.3, 0.6, 0.1); g.add(hand);
      }
      this.vis = { group: g, mats: [robe, skin, dark], head };
      this.mesh.add(g);
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
      if (seen && !this.seenOnce) { this.seenOnce = true; g.fearAdd && g.fearAdd(20); if (g.script.onNeighbor) g.script.onNeighbor(g, this); }
      // He calls out in a voice you know
      this.nextCall -= dt;
      if (this.nextCall <= 0 && g.audio && g.audio.sfx && d < 30) {
        this.nextCall = 20 + Math.random() * 25;
        const buf = g.audio.sfx.voice(1.1, { pitch: 245, tape: true, seed: 256 + Math.floor(Math.random() * 3) });
        const src = g.audio.ctx.createBufferSource(); src.buffer = buf;
        const o = g.audio.out('ent', { x: this.pos.x, y: 1.8, z: this.pos.z }, { rev: 0.6, gain: 0.55, occl: true, occluded: !this.losToPlayer(), ref: 3 });
        src.connect(o.input); src.start();
        g.audio.caption('neighbor', PB.t('cap.callName'), this.pos, 10);
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
      const g = new THREE.Group();
      const fur = std(0xf0c020, 1), dark = std(0x120c0a, 0.9), white = std(0xf2f0ea, 0.8), red = std(0xb01818, 0.6);
      patch(game, [fur, dark, white, red]);
      g.add(mesh(new THREE.CapsuleGeometry(0.36, 0.55, 6, 14), fur, 0, 1.0, 0));
      const head = new THREE.Group(); head.position.set(0, 1.95, 0); g.add(head);
      head.add(mesh(new THREE.SphereGeometry(0.58, 32, 24), fur, 0, 0, 0));
      const smile = mesh(new THREE.TorusGeometry(0.34, 0.07, 10, 28, Math.PI * 0.9), dark, 0, -0.1, 0.45, 0.2, 0, Math.PI * 1.05); head.add(smile);
      for (let k = 0; k < 7; k++) head.add(mesh(new THREE.BoxGeometry(0.06, 0.07, 0.03), white, -0.24 + k * 0.08, -0.2 - Math.sin(k / 6 * Math.PI) * 0.12, 0.5, 0.2));
      for (const sx of [-0.2, 0.2]) { const e = mesh(new THREE.SphereGeometry(0.11, 16, 12), white, sx, 0.18, 0.46); e.scale.set(0.8, 1.2, 0.5); head.add(e); head.add(mesh(new THREE.SphereGeometry(0.05, 10, 8), dark, sx * 1.05, 0.15, 0.53)); }
      head.add(mesh(new THREE.ConeGeometry(0.1, 0.25, 12), red, 0, 0.6, 0.1, -0.2));
      const arms = [];
      for (const sx of [-1, 1]) {
        const a = new THREE.Group(); a.position.set(sx * 0.4, 1.35, 0); g.add(a);
        a.add(mesh(new THREE.CapsuleGeometry(0.1, 0.45, 4, 8), fur, 0, -0.3, 0));
        a.add(mesh(new THREE.SphereGeometry(0.13, 12, 10), white, 0, -0.62, 0.02));
        arms.push(a);
        g.add(mesh(new THREE.CapsuleGeometry(0.13, 0.3, 4, 8), fur, sx * 0.17, 0.45, 0));
        const shoe = mesh(new THREE.SphereGeometry(0.16, 12, 8), red, sx * 0.17, 0.1, 0.1); shoe.scale.set(1, 0.6, 1.5); g.add(shoe);
      }
      this.vis = { group: g, mats: [fur, dark, white, red], head, arms };
      this.mesh.add(g);
      this.catchR = 1.3; this.state = 'hunt'; this.walk = 0; this.litT = 0; this.coverT = 0;
    }
    update(dt) {
      const g = this.g, d = this.distToPlayer();
      this.stateT += dt;
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
