/* The creatures of Pinewood (Chapter 3).
   - The Pines: tall things of bark and drooping boughs that stand among the spruces and look like them
     from more than a few steps away. They only move while you do. Stop, and they stop; look around, and
     one of the trees is nearer than it was.
   - The Stag: a starved red deer the size of a horse, ribs like a ladder, antlers wider than a car. It
     hunts by ear. When it has you in a straight line it lowers its head, scrapes, and charges; a tree, a
     car, a wall stops it and leaves it stunned.
   - Ushers: two attendants in maroon jackets and pillbox caps, porcelain-white faces with nothing on
     them, each carrying a torch with a red lens. They see only what their red light touches. When it
     touches you they call the others, and then they come to take you to your seat.
   The deaths are kills.js programs: lift (the Pines), pin (the Stag), escort (an Usher). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U, P = PB.Props;
  const K = PB.SpeciesKit, Sp = PB.Species;
  const PI = Math.PI, H = PI / 2;
  const outdoors = (cr, x, y) => !!(cr.L.meta.outdoor && cr.L.meta.outdoor[cr.L.i(x, y)]);

  // ============================================================ THE PINES
  const BARK = { base: '#33281e', mottle: ['44,36,28', '58,48,36', '30,24,20', '70,60,46'], mottleA: 0.55, veins: '18,14,10', veinCount: 60, spots: 40, spotColor: '24,30,18' };
  function pinesModel(game) {
    const s = 1;
    const bark = K.skin('pines:bark', BARK, { rough: 0.95, bump: { wrinkles: 160 }, bumpScale: 2.4, rep: 2, bumpRep: 3 });
    const ridges = p => S.fbm(p[0] * 26, p[1] * 2.5, p[2] * 26, 2) * 0.018 + Math.abs(Math.sin(Math.atan2(p[2], p[0]) * 9 + p[1] * 0.6)) * 0.008;
    const trunk = p => S.smin(S.capsule(p, [0, 0, 0], [0.02, 1.95, 0.06], 0.25, 0.15), S.ellipsoid(p, [0, 1.7, 0.03], [0.3, 0.22, 0.2]), 0.12) + ridges(p);
    const head = p => {
      let d = S.ellipsoid(p, [0, 0.2, 0.02], [0.1, 0.24, 0.11]);
      d = S.smax(d, -S.ellipsoid(p, [0, 0.2, 0.12], [0.06, 0.12, 0.075]), 0.016);           // the face is a hollow
      return d + ridges(p) * 0.6;
    };
    const twigs = (p, L, n, r0) => {
      let d = 1e9;
      for (let k = 0; k < n; k++) { const t = 0.35 + k / n * 0.6, a = k * 2.4; d = Math.min(d, S.capsule(p, [0, -L * t, 0], [Math.cos(a) * 0.18, -L * t - 0.16, Math.sin(a) * 0.18], r0, r0 * 0.4)); }
      return d;
    };
    const upper = p => S.smin(S.capsule(p, [0, 0, 0], [0, -1.05, 0.02], 0.095, 0.065), twigs(p, 1.05, 3, 0.02), 0.03) + ridges(p) * 0.5;
    const fore = p => {
      let d = S.capsule(p, [0, 0, 0], [0, -0.95, 0.03], 0.068, 0.042);
      for (let f = 0; f < 5; f++) { const a = (f - 2) * 0.28; d = S.smin(d, S.capsule(p, [0, -0.93, 0.03], [Math.sin(a) * 0.12, -1.38 - (f % 2) * 0.06, 0.03 + Math.cos(a) * 0.05], 0.014, 0.004), 0.02); }
      return S.smin(d, twigs(p, 0.95, 2, 0.012), 0.02) + ridges(p) * 0.4;
    };
    const thigh = p => S.capsule(p, [0, 0, 0], [0, -0.92, 0.02], 0.15, 0.1) + ridges(p) * 0.6;
    const shin = p => {
      let d = S.capsule(p, [0, 0, 0], [0, -0.82, -0.02], 0.1, 0.07);
      for (const [x, z] of [[-0.12, 0.2], [0.1, 0.22], [0, -0.16], [0.16, 0.0]]) d = S.smin(d, S.capsule(p, [0, -0.78, 0], [x, -0.86, z], 0.035, 0.012), 0.04);   // roots for feet
      return d + ridges(p) * 0.5;
    };
    const col = [0.85, 0.8, 0.75];
    const mk = (name, fn, b, cell) => K.meshOf('pines:' + name, fn, b, cell, bark, { color: K.aoColor(fn, col, 1.2) });
    const g = new THREE.Group(), root = new THREE.Group(); g.add(root);
    const hipY = 1.72;
    const hips = K.pivot(root, 0, hipY, 0);
    hips.add(mk('trunk', trunk, [[-0.4, -0.32, -0.32], [0.4, 2.2, 0.36]], 0.024));
    const neck = K.pivot(hips, 0.02, 2.02, 0.07);
    neck.add(mk('head', head, [[-0.16, -0.08, -0.16], [0.16, 0.5, 0.18]], 0.012));
    const arms = [], legs = [];
    for (const sx of [-1, 1]) {
      const sh = K.pivot(hips, sx * 0.3, 1.72, 0.02);
      const up = mk('upper', upper, [[-0.28, -1.3, -0.28], [0.28, 0.1, 0.28]], 0.016); sh.add(up);
      const el = K.pivot(sh, 0, -1.05, 0.02);
      const fg = S.mesh('pines:fore', fore, [[-0.2, -1.55, -0.24], [0.2, 0.08, 0.26]], 0.012, { color: K.aoColor(fore, col, 1.2), smooth: 2 });
      const fm = new THREE.Mesh(sx < 0 ? K.mirrorX(fg) : fg, bark); fm.castShadow = true; el.add(fm);
      arms.push({ sh, el, sx });
      const hp = K.pivot(hips, sx * 0.13, 0.05, 0);
      hp.add(mk('thigh', thigh, [[-0.2, -1.1, -0.2], [0.2, 0.18, 0.2]], 0.018));
      const kn = K.pivot(hp, 0, -0.92, 0.02);
      kn.add(mk('shin', shin, [[-0.26, -0.98, -0.26], [0.26, 0.08, 0.3]], 0.016));
      legs.push({ hp, kn, sx });
    }
    // boughs: tiers of drooping spruce on the shoulders and up the trunk, so from a distance it is a tree
    const spruce = game.world.mat('spruce');
    const boughs = new THREE.Group(); hips.add(boughs);
    const tiers = [[1.45, 1.35, 0.6], [1.85, 1.15, 0.55], [2.2, 0.95, 0.5], [2.5, 0.75, 0.45], [2.75, 0.55, 0.4], [2.95, 0.38, 0.35]];
    tiers.forEach(([y, R, dr], k) => {
      const geo = P.shapes.bough([R, 0.7, 9, dr, 77 + k]).g;
      const m = new THREE.Mesh(geo, spruce); m.position.set(0, y, 0.02); m.rotation.y = k * 1.3; m.castShadow = true; boughs.add(m);
    });
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.9, 7, 1, true), spruce); tip.position.set(0, 3.25, 0.03); boughs.add(tip);
    const stand = () => {
      for (const a of arms) { a.sh.rotation.set(0.05, 0, a.sx * 0.1); a.el.rotation.set(-0.1, 0, 0); }
      for (const l of legs) { l.hp.rotation.set(0, 0, l.sx * 0.04); l.kn.rotation.set(0, 0, 0); }
      hips.rotation.set(0, 0, 0); neck.rotation.set(0.25, 0, 0); hips.position.y = hipY;
    };
    return {
      group: g, mats: [bark],
      animate(cr, dt) {
        const an = cr.anim, amt = U.clamp(an.speed / 2.5, 0, 1) * (1 - an.frozen), w = an.walk;
        stand();
        for (const l of legs) { const ph = w + (l.sx > 0 ? PI : 0); l.hp.rotation.x = -Math.sin(ph) * 0.4 * amt; l.kn.rotation.x = Math.max(0, Math.sin(ph + 1.1)) * 0.7 * amt; }
        for (const a of arms) { const ph = w + (a.sx > 0 ? 0 : PI); a.sh.rotation.x = 0.05 - Math.sin(ph) * 0.25 * amt - (cr.state === 'chase' ? 0.5 : 0); a.el.rotation.x = -0.1 - Math.max(0, Math.sin(ph)) * 0.3 * amt; }
        hips.rotation.x = 0.06 * amt + (cr.state === 'chase' ? 0.12 : 0);
        hips.position.y = hipY + Math.abs(Math.sin(w)) * 0.05 * amt;
        // the crown sways as if in wind, a little more than the trees round it
        boughs.rotation.z = Math.sin(an.t * 0.7) * 0.02 + Math.sin(w) * 0.03 * amt; boughs.rotation.x = Math.sin(an.t * 0.53 + 1) * 0.015;
        neck.rotation.y = cr.state === 'investigate' ? Math.sin(an.t * 0.6) * 0.5 : 0;
        if (an.attack > 0) for (const a of arms) { a.sh.rotation.x = U.lerp(a.sh.rotation.x, -2.4, an.attack); a.el.rotation.x = U.lerp(a.el.rotation.x, -0.6, an.attack); }
      },
    };
  }
  Sp.add({
    kind: 'pines', model: pinesModel, radius: 0.36, catchR: 1.5, height: 4.2,
    traits: ['moveWhenMoving', 'sight', 'hearing'], senses: { sight: 22, fov: 2.4, hearing: 0.7 },
    speeds: { patrol: 0.75, investigate: 1.7, chase: 4.4 }, lose: 12, searchTime: 20, gait: 0.9, notice: 1.4,
    allowCell: outdoors, kill: 'lift', stepRate: 2.2, stepHear: 7, voice: 'pines',
  });

  // ============================================================ THE STAG
  function stagModel(game) {
    const hide = K.skin('stag:hide', { base: '#3a3028', mottle: ['52,44,36', '34,28,22', '70,60,48', '24,20,16'], mottleA: 0.55, veins: '24,18,16', veinCount: 18, spots: 80, spotColor: '30,24,20' }, { rough: 0.92, bump: { wrinkles: 90 }, bumpScale: 2.2, rep: 2 });
    const fur = p => S.fbm(p[0] * 30, p[1] * 30, p[2] * 30, 2) * 0.008;
    // body along +z (head forward); the spine sags, the belly is drawn up, every rib shows
    const body = p => {
      const z = p[2], ax = Math.abs(p[0]);
      let d = S.ellipsoid(p, [0, 1.58, 0], [0.4, 0.48, 1.02]);
      d = S.smin(d, S.ellipsoid(p, [0, 1.66, 0.62], [0.42, 0.55, 0.45]), 0.14);           // chest
      d = S.smin(d, S.ellipsoid(p, [0, 1.64, -0.72], [0.38, 0.46, 0.4]), 0.14);           // haunch
      d = S.smax(d, -S.ellipsoid(p, [0, 1.02, 0.05], [0.5, 0.32, 0.62]), 0.12);           // drawn-up belly
      const rib = Math.max(0, 1 - Math.abs(z - 0.25) / 0.55) * (ax > 0.15 ? 1 : 0);
      d += Math.max(0, Math.sin(z * 30)) * 0.022 * rib;                                     // ribs
      d = S.smin(d, S.capsule(p, [0, 1.98, 0.6], [0, 1.95, -0.6], 0.035, 0.03), 0.05);      // spine ridge
      d = S.smin(d, S.capsule(p, [0, 1.8, 0.7], [0, 1.95, 0.85], 0.2, 0.19), 0.1);          // root of the neck
      d = S.smin(d, S.capsule(p, [0, 1.75, -1.0], [0, 1.6, -1.12], 0.06, 0.03), 0.05);      // tail
      return d + fur(p);
    };
    // neck and head, in the space of the neck pivot N: up and forward, the head low and long
    const N = [0, 1.85, 0.78];
    const neckFn = q => {
      const p = [q[0] + N[0], q[1] + N[1], q[2] + N[2]];
      let d = S.capsule(p, [0, 1.85, 0.78], [0, 2.32, 1.25], 0.19, 0.13);
      d = S.smin(d, S.capsule(p, [0, 2.36, 1.24], [0, 2.18, 1.72], 0.12, 0.06), 0.06);
      d = S.smin(d, S.ellipsoid(p, [0, 2.4, 1.26], [0.15, 0.14, 0.16]), 0.06);
      for (const sx of [-1, 1]) {
        d = S.smax(d, -S.sphere(p, [sx * 0.11, 2.42, 1.38], 0.045), 0.02);                // hollow eyes
        d = S.smin(d, S.ellipsoid(p, [sx * 0.16, 2.55, 1.18], [0.04, 0.12, 0.025]), 0.03); // ears
      }
      return d + fur(p);
    };
    const legUp = p => S.capsule(p, [0, 0, 0], [0, -0.62, 0.02], 0.1, 0.06) + fur(p);
    const legLo = p => { let d = S.capsule(p, [0, 0, 0], [0, -0.66, 0], 0.045, 0.035); d = S.smin(d, S.ellipsoid(p, [0, -0.7, 0.03], [0.05, 0.05, 0.07]), 0.02); return d + fur(p) * 0.5; };
    const col = [0.85, 0.82, 0.78];
    const g = new THREE.Group(), root = new THREE.Group(); g.add(root);
    const trunk = K.pivot(root, 0, 0, 0);
    trunk.add(K.meshOf('stag:body', body, [[-0.45, 0.9, -1.25], [0.45, 2.2, 1.1]], 0.022, hide, { color: K.aoColor(body, col, 1.25) }));
    const neck = K.pivot(trunk, N[0], N[1], N[2]);
    neck.add(K.meshOf('stag:neck', neckFn, [[-0.3, -0.25, -0.25], [0.3, 0.85, 1.05]], 0.018, hide, { color: K.aoColor(neckFn, col, 1.25) }));
    // antlers: two main beams curving up and out with tines, as tubes, on the head
    const bone = new THREE.MeshStandardMaterial({ color: 0x8a7a62, roughness: 0.75 });
    const specs = [];
    const rel = v => [v[0] - N[0], v[1] - N[1], v[2] - N[2]];
    for (const sx of [-1, 1]) {
      const beam = [[sx * 0.1, 2.52, 1.22], [sx * 0.3, 2.75, 1.1], [sx * 0.55, 3.0, 0.92], [sx * 0.78, 3.25, 0.8], [sx * 0.92, 3.55, 0.75], [sx * 0.95, 3.8, 0.82]];
      specs.push(['tube', 'x', beam.map(rel), 0.035, 6, 20]);
      for (const [k, dx, dy, dz] of [[1, 0.05, 0.35, 0.3], [2, 0.18, 0.4, 0.15], [3, 0.25, 0.45, -0.05], [4, 0.1, 0.4, -0.2], [4, -0.2, 0.35, 0.15], [5, 0.06, 0.25, 0.1]]) {
        const b = beam[k]; specs.push(['tube', 'x', [b, [b[0] + sx * dx * 0.5, b[1] + dy * 0.6, b[2] + dz * 0.5], [b[0] + sx * dx, b[1] + dy, b[2] + dz]].map(rel), 0.02, 5, 6]);
      }
    }
    for (const part of P.build('stag:antlers', specs)) { const m = new THREE.Mesh(part.geo, bone); m.castShadow = true; neck.add(m); }
    const legs = [];
    for (const [x, z, front] of [[-0.2, 0.65, 1], [0.2, 0.65, 1], [-0.19, -0.75, 0], [0.19, -0.75, 0]]) {
      const hp = K.pivot(trunk, x, 1.38, z);
      hp.add(K.meshOf('stag:up' + front, legUp, [[-0.14, -0.72, -0.14], [0.14, 0.12, 0.14]], 0.016, hide, { color: K.aoColor(legUp, col, 1.2) }));
      const kn = K.pivot(hp, 0, -0.62, 0.02);
      kn.add(K.meshOf('stag:lo', legLo, [[-0.09, -0.8, -0.09], [0.09, 0.06, 0.12]], 0.012, hide, { color: K.aoColor(legLo, [0.5, 0.45, 0.4], 1.2) }));
      legs.push({ hp, kn, x, z, front });
    }
    return {
      group: g, mats: [hide, bone],
      animate(cr, dt) {
        const an = cr.anim, st = cr.state;
        const charging = st === 'charge', wind = st === 'windup', stunned = st === 'stunned';
        const amt = U.clamp(an.speed / 2.2, 0, 1), w = an.walk * (charging ? 1.6 : 1);
        // a walk is a four-beat gait; the charge a gallop
        legs.forEach((l, k) => {
          const ph = charging ? w * 1.4 + (l.front ? 0 : PI * 0.9) + (l.x > 0 ? 0.35 : 0) : w + [0, PI, PI * 0.5, PI * 1.5][k];
          const a = charging ? 0.75 : 0.45 * amt;
          l.hp.rotation.x = Math.sin(ph) * a;
          l.kn.rotation.x = (l.front ? -1 : 1) * Math.max(0, Math.sin(ph + (l.front ? -1.2 : 1.2))) * (charging ? 1.0 : 0.6) * amt;
        });
        if (wind) { const l = legs[0]; l.hp.rotation.x = -0.5 + Math.sin(an.t * 12) * 0.4; l.kn.rotation.x = -0.8; }
        // head: up and listening, down for the charge, hanging when stunned
        const down = charging || wind ? 1 : 0, hang = stunned ? 1 : 0;
        trunk.rotation.x = U.damp(trunk.rotation.x, down * 0.06 + hang * 0.05, 6, dt);
        neck.rotation.x = U.damp(neck.rotation.x, down * 0.75 + hang * 0.5 - (1 - down) * (1 - hang) * 0.12, 6, dt);
        trunk.position.y = Math.abs(Math.sin(w * (charging ? 1.4 : 1))) * (charging ? 0.12 : 0.03) * Math.max(amt, charging ? 1 : 0) - hang * 0.15;
        trunk.rotation.z = stunned ? Math.sin(an.t * 2.5) * 0.06 : 0;
        neck.rotation.y = st === 'investigate' || st === 'search' ? Math.sin(an.t * 0.8) * 0.4 : Math.sin(an.t * 0.3) * 0.08;
        if (an.attack > 0) neck.rotation.x = U.lerp(neck.rotation.x, 0.9, an.attack);
      },
    };
  }
  Sp.add({
    kind: 'stag', model: stagModel, radius: 0.55, catchR: 1.7, height: 3.8,
    traits: ['hearing', 'charger'], senses: { sight: 12, fov: 2.0, hearing: 1.7 },
    speeds: { patrol: 0.85, investigate: 2.0, chase: 3.7 }, lose: 12, searchTime: 16, gait: 1.1,
    chargeR: 17, chargeSpeed: 10.5, windup: 1.15, stunT: 3.2,
    allowCell: outdoors, kill: 'pin', stepRate: 1.3, stepHear: 22, voice: 'stag',
  });

  // ============================================================ USHERS
  function usherModel(game) {
    const porcelain = new THREE.MeshPhysicalMaterial({ color: 0xe6e2d8, roughness: 0.25, clearcoat: 0.8, clearcoatRoughness: 0.2, vertexColors: true });
    const r = K.humanoid({
      key: 'usher', h: 1.86, build: 0.82, coat: 0.12, long: 1.05,
      clothBase: '#4a1014', skinMat: porcelain, skinVC: [1, 1, 1],
      head: { eyes: 'none', mouth: 0, swell: 0 },
      clothVC: p => (Math.abs(p[0]) < 0.012 && p[2] > 0.08 && p[1] > 0.1 && p[1] < 0.5 ? [1.6, 1.25, 0.5] : [1, 1, 1]),
    });
    const gold = new THREE.MeshStandardMaterial({ color: 0xb08a3a, roughness: 0.35, metalness: 0.9 });
    // brass buttons, the pillbox cap with its band
    for (let k = 0; k < 5; k++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6), gold); b.position.set(0.04, 0.12 + k * 0.075, 0.125); r.hips.add(b); const b2 = b.clone(); b2.position.x = -0.04; r.hips.add(b2); }
    const capM = new THREE.MeshStandardMaterial({ color: 0x4a1014, roughness: 0.6 });
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.09, 0.08, 20), capM); cap.position.set(0, 0.25, -0.005); cap.rotation.x = -0.12; r.head.add(cap);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.092, 0.02, 20, 1, true), gold); band.position.set(0, 0.23, -0.003); band.rotation.x = -0.12; r.head.add(band);
    // the torch with the red lens, in the right hand, and its light
    const hand = r.arms.find(a => a.sx > 0).el;
    // the torch lies along the forearm (the forearm hangs along -y), so its beam follows the arm
    const torch = new THREE.Group(); torch.position.set(0, -0.36, 0.06); torch.rotation.x = H; hand.add(torch);
    const tb = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.24, 12), new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.6 })); tb.rotation.x = H; tb.position.z = 0.06; torch.add(tb);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.03, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 0.3, 0.2) })); lens.position.z = 0.185; torch.add(lens);
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.024, 0.05, 12), tb.material); head.rotation.x = H; head.position.z = 0.16; torch.add(head);
    const light = new THREE.SpotLight(0xff2a1a, 26, 17, 0.32, 0.55, 1.6); light.position.set(0, 0, 0.19); light.castShadow = false;
    const target = new THREE.Object3D(); target.position.set(0, 0, 5); torch.add(light); torch.add(target); light.target = target;
    return {
      group: r.group, rig: r, mats: r.mats, light, torch,
      animate(cr, dt) {
        const an = cr.anim, chase = cr.state === 'chase';
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 1.8, 0, 1), chase ? 0.3 : 0);
        // the torch arm held out, sweeping the rows; on you once it has found you
        const ra = r.arms.find(a => a.sx > 0), la = r.arms.find(a => a.sx < 0);
        const sweep = chase ? 0 : Math.sin(an.t * 0.55) * 0.55;
        ra.sh.rotation.set(-1.25, sweep, 0.05); ra.el.rotation.set(-0.15, 0, 0);
        la.sh.rotation.set(0.05, 0, -0.06); la.el.rotation.set(-0.35, 0, 0);
        r.neck.rotation.set(0.12, sweep * 0.8, 0);
        light.intensity = cr.state === 'stunned' ? 0 : 26 * (0.92 + Math.sin(an.t * 31) * 0.04 + Math.sin(an.t * 7) * 0.04);
        if (an.attack > 0) { la.sh.rotation.x = U.lerp(la.sh.rotation.x, -1.3, an.attack); }
      },
    };
  }
  // The usher sees only down its red beam: a player standing in it is seen at any light
  function inBeam(cr) {
    const g = cr.g, pl = g.player.pos, L = cr.L;
    const dx = pl.x - cr.pos.x, dz = pl.z - cr.pos.z, d = Math.hypot(dx, dz);
    if (d > 16 || !L.los(cr.pos.x, cr.pos.z, pl.x, pl.z) || g.player.hidden) return false;
    const sweep = cr.state === 'chase' ? 0 : Math.sin(cr.anim.t * 0.55) * 0.55;
    const a = cr.heading + sweep, fx = Math.sin(a), fz = Math.cos(a);
    return (dx * fx + dz * fz) / Math.max(d, 0.01) > Math.cos(0.36);
  }
  Sp.add({
    kind: 'usher', model: usherModel, radius: 0.3, catchR: 1.1, height: 1.9,
    traits: ['hearing'], senses: { sight: 4, fov: 1.6, hearing: 0.6 },
    speeds: { patrol: 0.85, investigate: 1.5, chase: 3.0 }, lose: 9, searchTime: 14, gait: 1.6,
    allowCell: outdoors, kill: 'escort', stepRate: 1.4, stepHear: 8, voice: 'usher',
    preUpdate(cr, g, dt) {
      // the red light finds you: it stops, raises the torch and calls; then it comes for you
      if (cr.state !== 'chase' && cr.state !== 'stunned' && inBeam(cr)) {
        cr.lastKnown = { x: g.player.pos.x, z: g.player.pos.z };
        cr.awareness = 1.2;
        cr.setState('chase'); g.onSpotted(cr);
        cr.voice('alarm');
        g.noise(g.player.pos.x, g.player.pos.z, 45, 'loud');
        for (const e of g.entities) if (e !== cr && e.hostile && e.state !== 'chase' && e.state !== 'dormant' && e.state !== 'buried') { e.lastKnown = { x: g.player.pos.x, z: g.player.pos.z }; e.setState('investigate'); }
      }
      return true;
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
