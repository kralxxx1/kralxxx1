/* The creatures of Lake Ostra (Chapter 9).
   - The Hush: a girl of twelve in a navy anorak and moon boots, her whole head wound round and round in a
     long green scarf, so there is no face at all. Ada's scarf. It is what she buried, and it does not
     want to be dug up. It hears; it is never in a hurry; near it every sound goes away, even your own
     breathing, until you cannot hear it coming because you cannot hear anything.
   - Under-ice: pale shapes under the thin ice over the old river channel, moving when you move. Run on
     the thin ice and one comes up through it.
   - The Laughers: the older kids at the huts, in parkas with the hoods up and nothing to see inside the
     hoods. They do not chase. They see you, and they laugh, and everything on the lake hears where you are.
   Deaths (kills.js): scarf (the Hush), iceBreak (Under-ice). The Laughers kill nobody. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U;
  const K = PB.SpeciesKit, Sp = PB.Species;
  const PI = Math.PI, H = PI / 2;

  // ============================================================ THE HUSH
  function hushModel() {
    const navy = K.cloth('hush:anorak', '#1a2234', { stains: 30, rough: 0.8, rep: 2 });
    const r = K.humanoid({
      key: 'hush', h: 1.5, build: 0.82, coat: 0.12, bodyMat: navy,
      skin: { base: '#d8c8b8', mottle: ['220,200,190', '200,180,170'], veins: '150,140,150', veinCount: 4 }, head: { eyes: 'hollow', mouth: 0, swell: 0, hair: true, hairLong: 2 },
      skinVC: [1, 0.96, 0.92],
      // jeans below the anorak, white moon boots
      clothVC: p => (p[1] < -0.02 ? [0.55, 0.62, 0.85] : [1, 1, 1]), shoeVC: [0.9, 0.9, 0.88],
    });
    // the scarf: wound round the neck, the ends hanging down the back to the knees (the head is bare)
    const wool = K.cloth('hush:scarf', '#2a5a2e', { stains: 20, rough: 1, rep: 4, paint: (g, w, h) => { for (let y = 0; y < h; y += 8) { g.fillStyle = `rgba(0,0,0,${y % 16 ? 0.12 : 0.04})`; g.fillRect(0, y, w, 4); } } });
    const wrap = new THREE.Mesh(new THREE.TorusGeometry(0.078 * r.s, 0.036 * r.s, 8, 22), wool); wrap.rotation.x = H; wrap.position.set(0, 0.0, 0.012); wrap.castShadow = true; r.neck.add(wrap);
    const ends = [];
    for (const sx of [-1, 1]) {
      const pts = [new THREE.Vector3(sx * 0.04, 0.02, -0.1)];
      for (let k = 1; k < 7; k++) pts.push(new THREE.Vector3(sx * (0.05 + k * 0.004), 0.02 - k * 0.12, -0.12 - Math.sin(k * 0.5) * 0.03));
      const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.035, 5), wool); m.scale.set(1, 1, 0.45); r.neck.add(m); ends.push(m);
    }
    r.mats.push(wool);
    return {
      group: r.group, rig: r, mats: r.mats, wrap, ends,
      animate(cr, dt) {
        const an = cr.anim;
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 1.6, 0, 1), 0);
        // arms straight down at its sides, the head a little on one side, listening
        for (const a of r.arms) { a.sh.rotation.x = U.lerp(a.sh.rotation.x, cr.state === 'chase' ? -0.35 : 0, 0.5); a.el.rotation.x = -0.05; }
        r.neck.rotation.z = 0.3 + Math.sin(an.t * 0.4) * 0.05; r.neck.rotation.x = 0.1;
        for (const [k, e] of ends.entries()) { e.rotation.x = Math.sin(an.t * 1.3 + k) * 0.08 + U.clamp(an.speed / 2, 0, 1) * 0.35; }
        // unwinding, at the end of Snowfall
        if (cr.unwind != null) { wrap.scale.setScalar(1 + cr.unwind * 0.25); wrap.visible = cr.unwind < 0.98; }
      },
    };
  }
  Sp.add({
    kind: 'hush', model: hushModel, radius: 0.28, catchR: 1.05, height: 1.5,
    traits: ['hearing', 'blind'], senses: { sight: 0, fov: 0, hearing: 1.7 },
    speeds: { patrol: 0.75, investigate: 1.35, chase: 2.6 }, lose: 16, searchTime: 20, gait: 1.7, hunt: true,
    kill: 'scarf', stepRate: 1.4, stepHear: 0, voice: 'hush', autoLairs: null,
    // near it, the world goes quiet
    postUpdate(cr, g) { if (g.audio && g.audio.hush) g.audio.hush(U.clamp(1 - (cr.distToPlayer() - 2) / 14, 0, 1)); },
  });

  // ============================================================ UNDER-ICE
  // Buried: a pale shape drifting just under the ice (a soft dark-and-pale smudge on its surface).
  // Up: a grey body breaking through to the waist, the arms out over the ice.
  function underIceModel() {
    const pale = K.skin('underice:skin', { base: '#b8c4c8', mottle: ['170,184,190', '200,210,214', '140,156,166'], mottleA: 0.5, veins: '90,110,140', veinCount: 40, spots: 20, spotColor: '120,140,150' }, { rough: 0.25, bump: { wrinkles: 120 }, bumpScale: 2.0, rep: 2, physical: true, params: { clearcoat: 0.8, clearcoatRoughness: 0.3 } });
    const r = K.humanoid({ key: 'underice', h: 1.8, build: 0.75, coat: 0, long: 1.3, hands: 'long', skinMat: pale, bodyMat: pale, skinVC: [1, 1, 1], head: { eyes: 'milky', mouth: 0.7, swell: 0.2, hair: true, hairLong: 6 }, clothVC: () => [0.95, 0.97, 1] });
    // the shape under the ice
    const shadowM = new THREE.MeshBasicMaterial({ color: 0x8a9aa8, transparent: true, opacity: 0.0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 });
    const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.9, 20), shadowM); shadow.scale.set(0.45, 1, 1); shadow.rotation.x = -H; shadow.renderOrder = 2;
    const g = new THREE.Group(); g.add(r.group); g.add(shadow);
    return {
      group: g, rig: r, mats: r.mats,
      lift(cr) {
        const st = cr.state;
        if (st === 'buried' || st === 'dormant') return -2.4;
        if (st === 'emerge') return -2.4 + U.smoothstep(0, 1, cr.anim.emerge) * 1.55;
        return -0.85;
      },
      animate(cr, dt) {
        const an = cr.anim, st = cr.state;
        // the shadow sits on the ice whatever the body is doing
        shadow.position.y = -cr.mesh.position.y + 0.012;
        shadowM.opacity = st === 'buried' ? 0.26 + Math.sin(an.t * 0.7) * 0.06 : 0;
        shadow.rotation.z = Math.sin(an.t * 0.2) * 0.4;
        r.stand();
        r.reach(st === 'buried' ? 0.95 : 1);
        for (const a of r.arms) { a.sh.rotation.z = a.sx * -(0.5 + Math.sin(an.t * 2 + a.sx) * 0.2); }
        r.neck.rotation.x = st === 'buried' ? -0.9 : 0.25 + Math.sin(an.t * 3) * 0.1;
        // drifting under the ice toward wherever you are
        if (st === 'buried') { const pl = cr.g.player.pos, d = Math.hypot(pl.x - cr.pos.x, pl.z - cr.pos.z); if (d < 14 && d > 1.5 && cr.g.flags.thinIce) { cr.pos.x += (pl.x - cr.pos.x) / d * dt * 0.5; cr.pos.z += (pl.z - cr.pos.z) / d * dt * 0.5; } }
      },
    };
  }
  Sp.add({
    kind: 'underice', model: underIceModel, radius: 0.3, catchR: 1.5, height: 1.8,
    traits: ['hearing'], senses: { sight: 6, fov: 3, hearing: 1.0 }, speeds: { patrol: 0, investigate: 0, chase: 0 }, lose: 3, searchTime: 3,
    ambush: 'ice', ambushR: 3.4, emergeT: 0.8, emergeAt: null, visibleBuried: true, wakeOnSound: false,
    kill: 'iceBreak', voice: 'underice', autoLairs: null, ghostly: true,
    // it cannot leave its hole: once up it reaches; if you get away it goes back down
    preUpdate(cr, g, dt) {
      if (cr.state !== 'chase' && cr.state !== 'patrol' && cr.state !== 'search' && cr.state !== 'investigate') return true;
      cr.faceToward(g.player.pos.x, g.player.pos.z, dt, 5);
      cr.anim.attack = U.damp(cr.anim.attack, cr.distToPlayer() < 2 ? 1 : 0, 6, dt);
      cr.tryCatch();
      if (cr.distToPlayer() > 4 && cr.stateT > 1.5) cr.bury(true);
      cr.pose(dt, 0);
      return false;
    },
  });

  // ============================================================ THE LAUGHERS
  let lIdx = 0;
  function laugherModel() {
    const k = lIdx++;
    const parka = K.cloth('laugher:parka' + (k % 3), ['#4a5a2a', '#8a2a1a', '#2a3a6a'][k % 3], { stains: 40, rough: 0.85, rep: 2 });
    const r = K.humanoid({
      key: 'laugher' + (k % 3), h: 1.68 + (k % 3) * 0.06, build: 1.1, coat: 0.25, bodyMat: parka,
      skin: { base: '#2a2422', mottle: ['30,26,24', '20,18,16'], veins: '10,10,10', veinCount: 2 }, head: { eyes: 'none', mouth: 0, swell: 0 }, skinVC: [0.3, 0.3, 0.3],
      clothVC: p => (p[1] < -0.05 ? [0.35, 0.38, 0.5] : [1, 1, 1]), shoeVC: [0.85, 0.85, 0.8],
    });
    return {
      group: r.group, rig: r, mats: r.mats,
      animate(cr, dt) {
        const an = cr.anim, laughing = cr.state === 'alarm';
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 1.6, 0, 1), 0);
        if (laughing) {
          // bent over laughing, one arm pointing at you
          const sh = Math.sin(an.t * 14) * 0.05;
          r.hips.rotation.x = 0.35 + sh; r.neck.rotation.x = -0.3;
          const a = r.arms.find(q => q.sx > 0); a.sh.rotation.x = -1.4; a.el.rotation.x = 0;
          const b = r.arms.find(q => q.sx < 0); b.sh.rotation.x = -0.4; b.el.rotation.x = -1.6;
        } else { r.neck.rotation.x = 0.2; for (const a of r.arms) { a.sh.rotation.x = -0.25; a.el.rotation.x = -1.0; } }
      },
    };
  }
  Sp.add({
    kind: 'laugher', model: laugherModel, radius: 0.32, catchR: 0, height: 1.8, hostile: false,
    traits: ['alarm', 'sight'], senses: { sight: 16, fov: 2.2, hearing: 1.0 }, speeds: { patrol: 0.5, investigate: 0.9, chase: 1.2 }, lose: 6,
    alarmR: 60, voice: 'laugher', autoLairs: null, confined: ['huts'],
    // seeing you is all they do: they stop where they are and laugh
    preUpdate(cr) { if (cr.state === 'chase') cr.setState('alarm'); if (cr.state === 'alarm' && cr.stateT > 9) { cr.awareness = 0; cr.setState('patrol'); } return true; },
  });
})(typeof window !== 'undefined' ? window : globalThis);
