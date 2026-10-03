/* The creatures of Hollow Creek (Chapter 4).
   - Burrowers: pale, eyeless things the size of a crouching man, skin like wet clay, forearms ending in
     broad digging hands. They lie under the dirt floors of the drifts and feel your footsteps through the
     ground; crouch-walk and they feel nothing. Walk, and the floor opens.
   - Lamplighters: tall men in long oilskins and hard hats, a cap lamp burning on every forehead, so you see
     their lights coming down the haulage like a rescue party. They are drawn to light: your torch, a
     glowstick. Put your light out and stand still, and they walk past.
   - Timber Crawlers: long many-handed things that cling upside down between the timber sets overhead. A
     torch turned up finds them; walk under one upright and it drops.
   Deaths (kills.js): earth (Burrower), lamp (Lamplighter), dropAbove (Timber Crawler). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U;
  const K = PB.SpeciesKit, Sp = PB.Species;
  const PI = Math.PI, H = PI / 2;
  // the dirt floors of the drifts (not water, not plank, not concrete)
  const dirt = (cr, x, y) => { const L = cr.L, i = L.i(x, y); if (L.floorType[i]) return false; const st = L.styles && L.styles[L.styleOf[i]]; return !!st && st.floor === 'mud'; };
  const underground = (cr, x, y) => !(cr.L.meta.outdoor && cr.L.meta.outdoor[cr.L.i(x, y)]) && y >= 10;

  // ============================================================ BURROWERS
  function burrowerModel() {
    const clay = K.skin('burrower:clay', { base: '#8a7e70', mottle: ['110,100,88', '70,62,54', '130,122,110', '90,76,60'], mottleA: 0.5, veins: '60,50,46', veinCount: 26, spots: 50, spotColor: '60,48,36' }, { rough: 0.38, bump: { wrinkles: 140 }, bumpScale: 2.2, rep: 2 });
    const grain = p => S.fbm(p[0] * 22, p[1] * 22, p[2] * 22, 2) * 0.01;
    const body = p => {
      const ax = Math.abs(p[0]);
      let d = S.ellipsoid(p, [0, 0.58, -0.05], [0.26, 0.22, 0.55]);
      d = S.smin(d, S.ellipsoid(p, [0, 0.66, 0.32], [0.3, 0.24, 0.3]), 0.1);                 // hunched shoulders
      d = S.smin(d, S.ellipsoid(p, [0, 0.52, -0.5], [0.22, 0.2, 0.25]), 0.1);                // haunch
      d = S.smin(d, S.capsule(p, [0, 0.6, 0.45], [0, 0.48, 0.75], 0.12, 0.1), 0.08);          // neck, thrust forward
      // the head: smooth, eyeless, a mouth too wide
      d = S.smin(d, S.ellipsoid(p, [0, 0.47, 0.86], [0.13, 0.12, 0.17]), 0.06);
      d = S.smax(d, -S.ellipsoid(p, [0, 0.42, 0.98], [0.11, 0.012, 0.08]), 0.012);
      for (const sx of [-1, 1]) d = S.smax(d, -S.sphere(p, [sx * 0.02, 0.5, 1.02], 0.008), 0.004);
      d += Math.max(0, Math.sin(p[2] * 26)) * 0.008 * (ax > 0.12 ? 1 : 0) * (p[2] > -0.3 && p[2] < 0.3 ? 1 : 0);   // ribs under the clay
      return d + grain(p);
    };
    const upper = p => S.capsule(p, [0, 0, 0], [0, -0.3, 0.12], 0.075, 0.06) + grain(p);
    const fore = p => {
      let d = S.capsule(p, [0, 0, 0], [0, -0.3, 0.08], 0.06, 0.05);
      d = S.smin(d, S.ellipsoid(p, [0, -0.36, 0.14], [0.11, 0.035, 0.12]), 0.04);           // a broad, flat digging hand
      for (let f = 0; f < 4; f++) d = S.smin(d, S.capsule(p, [-0.07 + f * 0.047, -0.37, 0.2], [-0.09 + f * 0.06, -0.42, 0.33], 0.016, 0.006), 0.02);
      return d + grain(p) * 0.6;
    };
    const leg = p => S.smin(S.capsule(p, [0, 0, 0], [0, -0.28, -0.18], 0.08, 0.055), S.capsule(p, [0, -0.28, -0.18], [0, -0.5, 0.02], 0.055, 0.04), 0.04) + grain(p);
    const col = [0.9, 0.86, 0.82];
    const g = new THREE.Group(), root = new THREE.Group(); g.add(root);
    const trunk = K.pivot(root, 0, 0, 0);
    trunk.add(K.meshOf('burrower:body', body, [[-0.36, 0.28, -0.8], [0.36, 0.95, 1.08]], 0.016, clay, { color: K.aoColor(body, col, 1.3) }));
    const arms = [], legs = [];
    for (const sx of [-1, 1]) {
      const sh = K.pivot(trunk, sx * 0.27, 0.6, 0.38);
      sh.add(K.meshOf('burrower:upper', upper, [[-0.12, -0.42, -0.12], [0.12, 0.08, 0.24]], 0.012, clay, { color: K.aoColor(upper, col, 1.2) }));
      const el = K.pivot(sh, 0, -0.3, 0.12);
      el.add(K.meshOf('burrower:fore', fore, [[-0.16, -0.5, -0.1], [0.16, 0.08, 0.4]], 0.01, clay, { color: K.aoColor(fore, col, 1.2) }));
      arms.push({ sh, el, sx });
      const hp = K.pivot(trunk, sx * 0.2, 0.52, -0.48);
      hp.add(K.meshOf('burrower:leg', leg, [[-0.13, -0.6, -0.3], [0.13, 0.1, 0.12]], 0.012, clay, { color: K.aoColor(leg, col, 1.2) }));
      legs.push({ hp, sx });
    }
    return {
      group: g, mats: [clay],
      lift(cr) {
        const st = cr.state;
        if (st === 'buried' || st === 'dormant') return -1.3;
        if (st === 'emerge') return -1.3 + U.smoothstep(0, 1, cr.anim.emerge) * 1.3 + Math.sin(cr.anim.t * 14) * 0.02 * (1 - cr.anim.emerge);
        return 0;
      },
      animate(cr, dt) {
        const an = cr.anim, amt = U.clamp(an.speed / 2, 0, 1), w = an.walk;
        for (const a of arms) { const ph = w + (a.sx > 0 ? 0 : PI); a.sh.rotation.set(-0.35 + Math.sin(ph) * 0.55 * amt, 0, a.sx * 0.1); a.el.rotation.set(0.25 + Math.max(0, Math.sin(ph + 1)) * 0.5 * amt, 0, 0); }
        for (const l of legs) { const ph = w + (l.sx > 0 ? PI : 0); l.hp.rotation.set(Math.sin(ph) * 0.45 * amt, 0, 0); }
        trunk.rotation.z = Math.sin(w) * 0.05 * amt; trunk.position.y = Math.abs(Math.sin(w)) * 0.03 * amt;
        // coming up out of the floor: the hands first, clawing at the dirt
        if (cr.state === 'emerge') for (const a of arms) { a.sh.rotation.x = -1.4 + Math.sin(an.t * 10 + a.sx) * 0.3; a.el.rotation.x = 0.4; }
        if (an.attack > 0) for (const a of arms) { a.sh.rotation.x = U.lerp(a.sh.rotation.x, -1.6, an.attack); }
      },
    };
  }
  Sp.add({
    kind: 'burrower', model: burrowerModel, radius: 0.32, catchR: 1.1, height: 0.9,
    traits: ['vibration'], ambush: 'floor', ambushR: 4.2, emergeT: 1.3, emergeAt: 'player', emergeDist: 2.6,
    senses: { sight: 0, fov: 0, hearing: 1.4 }, speeds: { patrol: 0.6, investigate: 1.6, chase: 3.5 }, lose: 7, searchTime: 9, gait: 2.2,
    allowCell: dirt, emergeOn: dirt, kill: 'earth', stepRate: 1.0, stepHear: 7, voice: 'burrower', autoLairs: null,
  });

  // ============================================================ LAMPLIGHTERS
  function lamplighterModel() {
    const oil = new THREE.MeshPhysicalMaterial({ color: 0x1a1a16, roughness: 0.35, clearcoat: 0.7, clearcoatRoughness: 0.3, vertexColors: true });
    const dark = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.6, vertexColors: true });
    const r = K.humanoid({
      key: 'lamplighter', h: 2.05, build: 0.78, coat: 0.75, long: 1.12, bodyMat: oil, skinMat: dark, skinVC: [0.3, 0.3, 0.3],
      head: { eyes: 'none', mouth: 0, swell: 0 }, clothVC: () => [1, 1, 1], hands: 'long',
    });
    // hard hat with a brim and the cap lamp, its cable running down the back to the battery on the belt
    const hatM = new THREE.MeshStandardMaterial({ color: 0x2a2a24, roughness: 0.5, metalness: 0.2 });
    const hat = new THREE.Mesh(new THREE.LatheGeometry([[0.001, 0.14], [0.07, 0.135], [0.1, 0.1], [0.105, 0.05], [0.13, 0.035], [0.135, 0.025], [0.001, 0.025]].map(([x, y]) => new THREE.Vector2(x, y)), 24), hatM);
    hat.position.set(0, 0.17, -0.005); hat.scale.set(1, 1, 1.15); r.head.add(hat);
    const lampM = new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 2.6, 1.6) });
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.04, 14), new THREE.MeshStandardMaterial({ color: 0x8a8a84, metalness: 0.9, roughness: 0.3 }));
    lamp.rotation.x = H; lamp.position.set(0, 0.25, 0.115); r.head.add(lamp);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.028, 14), lampM); lens.position.set(0, 0.25, 0.137); r.head.add(lens);
    const light = new THREE.SpotLight(0xffd8a0, 24, 22, 0.42, 0.5, 1.5); light.position.set(0, 0.25, 0.14); light.castShadow = false;
    const tgt = new THREE.Object3D(); tgt.position.set(0, -0.6, 4); r.head.add(light); r.head.add(tgt); light.target = tgt;
    const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.25, 0.1), new THREE.Vector3(0, 0.2, -0.12), new THREE.Vector3(0, -0.2, -0.13)]), 8, 0.006, 4), dark); r.head.add(cable);
    const batt = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.06), hatM); batt.position.set(0.12, 0.02, -0.16); r.hips.add(batt);
    return {
      group: r.group, rig: r, mats: r.mats, light,
      animate(cr, dt) {
        const an = cr.anim;
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 1.6, 0, 1), cr.state === 'chase' ? 0.25 : 0);
        r.neck.rotation.x = 0.15 + Math.sin(an.t * 0.5) * 0.04;
        r.neck.rotation.y = cr.state === 'investigate' || cr.state === 'search' ? Math.sin(an.t * 0.7) * 0.7 : 0;
        if (cr.state === 'chase' || an.attack > 0) r.reach(Math.max(0.5, an.attack || 0));
        light.intensity = 24 * (0.95 + Math.sin(an.t * 23) * 0.03);
      },
    };
  }
  Sp.add({
    kind: 'lamplighter', model: lamplighterModel, radius: 0.32, catchR: 1.15, height: 2.1,
    traits: ['lightSeeker', 'sight', 'hearing'], senses: { sight: 10, fov: 1.8, hearing: 0.5 }, lightR: 24,
    speeds: { patrol: 0.75, investigate: 1.25, chase: 2.9 }, lose: 8, searchTime: 12, gait: 1.4,
    allowCell: underground, kill: 'lamp', stepRate: 1.8, stepHear: 14, voice: 'lamplighter',
  });

  // ============================================================ TIMBER CRAWLERS
  function crawlerModel() {
    const hide = K.skin('crawler:hide', { base: '#5a4e40', mottle: ['74,64,52', '44,38,30', '96,86,70', '60,40,34'], mottleA: 0.55, veins: '40,26,24', veinCount: 40, spots: 50, spotColor: '34,28,22' }, { rough: 0.75, bump: { wrinkles: 120 }, bumpScale: 2.4, rep: 2 });
    const grain = p => S.fbm(p[0] * 30, p[1] * 8, p[2] * 30, 2) * 0.01;
    const N = 7, SEG = 0.34;
    // a long body along z, segment after segment, the head at +z: a face pressed flat, upside down
    const body = p => {
      let d = 1e9;
      for (let k = 0; k < N; k++) { const z = 1.1 - k * SEG, rr = 0.13 - k * 0.008; d = S.smin(d, S.ellipsoid(p, [0, 0.16, z], [rr * 1.2, rr * 0.8, SEG * 0.62]), 0.05); }
      d = S.smin(d, S.capsule(p, [0, 0.16, 1.1 - (N - 1) * SEG], [0, 0.12, 1.1 - N * SEG - 0.3], 0.06, 0.02), 0.04);
      d = S.smin(d, S.ellipsoid(p, [0, 0.14, 1.42], [0.1, 0.07, 0.15]), 0.05);
      for (const sx of [-1, 1]) d = S.smax(d, -S.sphere(p, [sx * 0.035, 0.1, 1.5], 0.018), 0.008);
      d = S.smax(d, -S.ellipsoid(p, [0, 0.105, 1.56], [0.04, 0.008, 0.03]), 0.006);
      return d + grain(p);
    };
    const arm = p => {
      let d = S.capsule(p, [0, 0, 0], [0.32, -0.08, 0], 0.035, 0.028);
      d = S.smin(d, S.capsule(p, [0.32, -0.08, 0], [0.42, -0.24, 0.02], 0.028, 0.02), 0.02);
      for (let f = 0; f < 4; f++) d = S.smin(d, S.capsule(p, [0.43, -0.25, -0.02 + f * 0.014], [0.47 + f * 0.01, -0.31, -0.03 + f * 0.02], 0.007, 0.004), 0.008);
      return d + grain(p) * 0.6;
    };
    const col = [0.85, 0.82, 0.78];
    const g = new THREE.Group(), root = new THREE.Group(); g.add(root);
    const spine = K.pivot(root, 0, 0, 0);
    spine.add(K.meshOf('crawler:body', body, [[-0.25, -0.05, -1.4], [0.25, 0.35, 1.75]], 0.015, hide, { color: K.aoColor(body, col, 1.3) }));
    const armGeo = PB.SDF.mesh('crawler:arm', arm, [[-0.05, -0.36, -0.07], [0.53, 0.06, 0.07]], 0.009, { color: K.aoColor(arm, col, 1.2), smooth: 2 });
    const armGeoL = K.mirrorX(armGeo);
    const arms = [];
    for (let k = 0; k < N; k++) for (const sx of [-1, 1]) {
      const pv = K.pivot(spine, sx * 0.1, 0.16, 1.1 - k * SEG);
      const m = new THREE.Mesh(sx > 0 ? armGeo : armGeoL, hide); m.castShadow = true; pv.add(m);
      arms.push({ pv, k, sx });
    }
    return {
      group: g, mats: [hide],
      lift(cr) {
        const st = cr.state, top = (cr.lair && cr.lair.h) || 2.6;
        if (st === 'buried' || st === 'dormant') return top;
        if (st === 'emerge') { const k = cr.anim.emerge; return top * (1 - k * k); }
        return 0;
      },
      animate(cr, dt) {
        const an = cr.anim, st = cr.state, amt = U.clamp(an.speed / 2.5, 0, 1), w = an.walk;
        // upside down on the ceiling, turning over as it falls
        const flip = st === 'buried' || st === 'dormant' ? 1 : st === 'emerge' ? 1 - U.smoothstep(0.1, 0.8, an.emerge) : 0;
        root.rotation.z = flip * PI;
        root.position.y = flip * 0.3;
        for (const a of arms) {
          const ph = w * 1.6 - a.k * 0.9 + (a.sx > 0 ? 0 : PI);
          const idle = st === 'buried' ? Math.sin(an.t * 0.8 + a.k) * 0.04 : 0;
          a.pv.rotation.set(0, a.sx * Math.sin(ph) * 0.45 * amt, a.sx * (Math.max(0, Math.cos(ph)) * 0.35 * amt + idle));
          if (st === 'emerge') a.pv.rotation.z = a.sx * Math.sin(an.t * 18 + a.k) * 0.4;
        }
        spine.rotation.y = Math.sin(w * 1.6) * 0.08 * amt;
        if (an.attack > 0) spine.rotation.x = -an.attack * 0.6;
      },
    };
  }
  Sp.add({
    kind: 'crawler', model: crawlerModel, radius: 0.34, catchR: 1.2, height: 0.5,
    traits: ['hearing'], ambush: 'ceiling', ambushR: 2.1, emergeT: 0.85, visibleBuried: true, wakeOnSound: false,
    senses: { sight: 6, fov: 2.4, hearing: 1.0 }, speeds: { patrol: 0.5, investigate: 2.2, chase: 4.0 }, lose: 6, searchTime: 8, gait: 2.6,
    allowCell: underground, kill: 'dropAbove', stepRate: 0.7, stepHear: 6, voice: 'crawler', autoLairs: null,
  });
})(typeof window !== 'undefined' ? window : globalThis);
