/* A jointed human body for the many species that were people once (PB.SpeciesKit.humanoid), and the
   creatures of Saint Brigid:
   - The Drowned: swollen, grey-green, in sodden jumpers and burst life jackets, hair plastered over
     faces gone soft and white-eyed. They wait under the flood water of the car deck and the engine room
     and come up hands first. They never leave the water by more than a few steps.
   - Passengers: people in coats and orange life jackets asleep in the lounge seats, heads down. A light
     resting on one wakes it; then it stands, and the ones around it stand.
   - The Bellman: a very tall shape in a black oilskin and sou'wester on the open deck, the ship's bell
     held to his chest. When he hunts you hear the clapper knock with every step. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U, T = PB.Tex, MO = PB.Monsters;
  const K = PB.SpeciesKit, Sp = PB.Species;
  const PI = Math.PI, H = PI / 2;

  // ============================================================ the human rig
  // o: { key, h (height), build (girth), belly, coat (hem length below the hips, metres), long (arm length
  //      factor), hands ('long' fingers), head: { mouth 0..1, eyes 'milky'|'hollow'|'none', hair, swell },
  //      cloth (canvas colour), skin (skin texture options), clothVC(p) per-vertex colour for the body }
  function humanoid(o) {
    const s = (o.h || 1.75) / 1.75, b = o.build || 1, key = o.key;
    const hipY = 0.92 * s, shY = 0.52 * s, neckTop = 0.66 * s;
    const torso = p => {
      const ax = Math.abs(p[0]), q = [ax, p[1], p[2]];
      let d = S.ellipsoid(p, [0, 0.05 * s, 0], [0.17 * b * s, 0.12 * s, 0.11 * b * s]);
      d = S.smin(d, S.capsule(p, [0, 0.05 * s, 0], [0, 0.36 * s, 0.005], 0.14 * b * s, 0.15 * b * s), 0.06);
      d = S.smin(d, S.ellipsoid(p, [0, 0.42 * s, 0.01], [0.19 * b * s, 0.16 * s, 0.12 * b * s]), 0.06);
      if (o.belly) d = S.smin(d, S.ellipsoid(p, [0, 0.2 * s, 0.06], [0.15 * b * s, 0.16 * s, 0.13 * o.belly * s]), 0.06);
      d = S.smin(d, S.capsule(q, [0.02, shY, 0], [0.2 * b * s, shY - 0.02, 0], 0.06 * b * s, 0.055 * b * s), 0.05);
      d = S.smin(d, S.capsule(p, [0, shY, 0.0], [0, neckTop, 0.02], 0.055 * s, 0.048 * s), 0.04);
      if (o.coat) {
        // a coat hanging from the hips: wider toward the hem, folds
        const y = p[1], t = U.clamp((0.1 * s - y) / (o.coat + 0.1 * s), 0, 1);
        const ang = Math.atan2(p[2], p[0]);
        let coat = Math.hypot(p[0], p[2] * 1.25) - (0.19 * b * s + t * 0.08 * s + Math.sin(ang * 7 + t * 2) * 0.012 * t);
        coat = S.smax(coat, y - 0.15 * s, 0.04); coat = S.smax(coat, -o.coat - y, 0.02);
        d = S.smin(d, coat, 0.04);
      }
      if (o.torsoExtra) d = o.torsoExtra(p, d, s);
      return d + S.fbm(p[0] * 14, p[1] * 10, p[2] * 14, 2) * 0.006;
    };
    // The face is a void: no nose, brow, eyes or mouth, nothing laid over it; an oval hollow goes into the
    // head where the face was, and the inside of it is black (the same oval is painted black below)
    const VOID = { c: [0, 0.088 * s, 0.1 * s], r: [0.064 * s, 0.082 * s, 0.075 * s] };
    const voidE = (p, k) => Math.hypot((p[0] - VOID.c[0]) / (VOID.r[0] * k), (p[1] - VOID.c[1]) / (VOID.r[1] * k), (p[2] - VOID.c[2]) / (VOID.r[2] * k));
    const head = p => {
      const hd = o.head || {}, sw = hd.swell || 0, ax = Math.abs(p[0]);
      let d = S.ellipsoid(p, [0, 0.11 * s, 0.0], [(0.082 + sw * 0.02) * s, 0.108 * s, (0.098 + sw * 0.01) * s]);
      d = S.smin(d, S.ellipsoid(p, [0, 0.03 * s, 0.045 * s], [(0.062 + sw * 0.025) * s, 0.055 * s, 0.062 * s]), 0.04);   // jaw and cheeks
      for (const sx of [-1, 1]) d = S.smin(d, S.ellipsoid(p, [sx * 0.083 * s, 0.1 * s, 0.0], [0.012 * s, 0.03 * s, 0.022 * s]), 0.012); // ears
      // hair, only where a head has it: the crown and the back, never over the face
      if (hd.hair) d = S.smin(d, S.smax(S.ellipsoid(p, [0, 0.14 * s, -0.02 * s], [0.088 * s, 0.1 * s, 0.1 * s]) - Math.max(0, -p[1] + 0.06 * s) * (hd.hairLong || 0), p[2] - 0.02 * s, 0.01), 0.01);
      if (hd.extra) d = hd.extra(p, d, s);
      d = S.smax(d, -S.ellipsoid(p, VOID.c, VOID.r), 0.016);                                                          // the hollow
      return d + S.fbm(p[0] * 40, p[1] * 40, p[2] * 40, 2) * 0.0025 * (1 + sw * 3);
    };
    // black inside and round the hollow, fading out into the skin over a finger's width
    const headCol = (fn, base) => { const ao = K.aoColor(fn, base, 1.3); return (p, n) => { const c = ao(p, n), k = U.clamp((1.35 - voidE(p, 1)) / 0.3, 0, 1) * (p[2] > 0.02 * s ? 1 : 0), m = 1 - k * 0.985; return [c[0] * m, c[1] * m, c[2] * m]; }; };
    const upper = p => S.capsule(p, [0, 0, 0], [0, -0.3 * s * (o.long || 1), 0], 0.052 * b * s, 0.043 * b * s);
    const fore = p => {
      const L = 0.27 * s * (o.long || 1), lf = o.hands === 'long' ? 1.6 : 1;
      let d = S.capsule(p, [0, 0, 0], [0, -L, 0.005], 0.042 * b * s, 0.031 * s);
      d = S.smin(d, S.ellipsoid(p, [0, -L - 0.05 * s, 0.01], [0.022 * s, 0.05 * s, 0.042 * s]), 0.02);
      for (let f = 0; f < 4; f++) d = S.smin(d, S.capsule(p, [0, -L - 0.09 * s, -0.025 * s + f * 0.017 * s], [0.006, -L - (0.17 + (f === 1 || f === 2 ? 0.02 : 0)) * s * lf, -0.024 * s + f * 0.018 * s], 0.0085 * s, 0.006 * s), 0.008);
      d = S.smin(d, S.capsule(p, [0, -L - 0.04 * s, 0.035 * s], [0.012, -L - 0.11 * s, 0.05 * s], 0.009 * s, 0.007 * s), 0.008);
      return d;
    };
    const thigh = p => S.capsule(p, [0, 0, 0], [0, -0.42 * s, 0.01], 0.078 * b * s, 0.056 * b * s);
    const shin = p => {
      let d = S.capsule(p, [0, 0, 0], [0, -0.41 * s, -0.01], 0.054 * b * s, 0.04 * s);
      d = S.smin(d, S.ellipsoid(p, [0, -0.45 * s, 0.045 * s], [0.048 * s, 0.038 * s, 0.115 * s]), 0.03);
      return d;
    };
    // materials: the body by vertex colour (cloth, skin, shoes), the head its own skin
    const body = o.bodyMat || K.cloth(key + ':cloth', o.clothBase || '#8a8a88', { stains: 70, rep: 3 });
    const skinM = o.skinMat || K.skin(key + ':skin', o.skin || { base: '#9a9690', mottle: ['120,120,110', '150,150,140', '90,100,95'], veins: '70,80,90', veinCount: 10 }, { rough: 0.5 });
    const vc = (fn, col) => (p, n) => { const a = K.aoColor(fn, [1, 1, 1], 1)(p, n); const c = col(p); return [a[0] * c[0], a[1] * c[1], a[2] * c[2]]; };
    const cloth = o.clothVC || (() => [1, 1, 1]);
    const skinC = o.skinVC || [0.95, 0.92, 0.88];
    const mk = (name, fn, bounds, cell, mat, col) => K.meshOf(key + ':' + name, fn, bounds, cell, mat, { color: vc(fn, col || cloth) });
    const g = new THREE.Group();
    const root = new THREE.Group(); g.add(root);
    const hips = K.pivot(root, 0, hipY, 0);
    const tor = mk('torso', torso, [[-0.36 * s, -(o.coat || 0.2) - 0.1, -0.3 * s], [0.36 * s, 0.72 * s, 0.32 * s]], 0.014 * s, body); hips.add(tor);
    const neck = K.pivot(hips, 0, neckTop - 0.02 * s, 0.015);
    const headM = K.meshOf(key + ':head', head, [[-0.13 * s, -0.04 * s, -0.14 * s], [0.13 * s, 0.27 * s, 0.17 * s]], 0.0065 * s, skinM, { color: headCol(head, skinC) }); neck.add(headM);
    const arms = [], legs = [];
    const armVC = p => { const L = 0.27 * s * (o.long || 1); return p[1] < -L + 0.01 ? skinC : cloth(p); };
    for (const sx of [-1, 1]) {
      const sh = K.pivot(hips, sx * 0.22 * b * s, shY - 0.02 * s, 0);
      const up = mk('upper', upper, [[-0.08, -0.38 * s * (o.long || 1), -0.08], [0.08, 0.06, 0.08]], 0.011 * s, body); sh.add(up);
      const el = K.pivot(sh, 0, -0.3 * s * (o.long || 1), 0);
      const fg = S.mesh(key + ':fore', fore, [[-0.07, -0.55 * s * (o.long || 1) * (o.hands === 'long' ? 1.15 : 1), -0.08], [0.07, 0.06, 0.1]], 0.008 * s, { color: vc(fore, armVC), smooth: 2 });
      const fm = new THREE.Mesh(sx < 0 ? K.mirrorX(fg) : fg, body); fm.castShadow = true; el.add(fm);
      arms.push({ sh, el, sx });
      const hp = K.pivot(hips, sx * 0.095 * b * s, 0, 0);
      const th = mk('thigh', thigh, [[-0.1, -0.5 * s, -0.1], [0.1, 0.08, 0.1]], 0.012 * s, body); hp.add(th);
      const kn = K.pivot(hp, 0, -0.42 * s, 0.01);
      const shM = mk('shin', shin, [[-0.08, -0.52 * s, -0.09], [0.08, 0.06, 0.18]], 0.01 * s, body, p => (p[1] < -0.4 * s ? (o.shoeVC || [0.18, 0.16, 0.15]) : cloth([p[0], p[1] - 0.5, p[2]])));
      kn.add(shM);
      legs.push({ hp, kn, sx });
    }
    const rig = { group: g, root, hips, neck, head: headM, arms, legs, s, hipY, mats: [body, skinM] };
    // ---- poses (all angles in radians, blended by the caller)
    rig.stand = () => { for (const a of arms) { a.sh.rotation.set(0, 0, a.sx * -0.08); a.el.rotation.set(-0.15, 0, 0); } for (const l of legs) { l.hp.rotation.set(0, 0, 0); l.kn.rotation.set(0, 0, 0); } hips.rotation.set(0, 0, 0); neck.rotation.set(0, 0, 0); hips.position.y = hipY; };
    rig.walk = (w, amt, run = 0) => {
      for (const l of legs) { const ph = w + (l.sx > 0 ? PI : 0); l.hp.rotation.x = -Math.sin(ph) * (0.45 + run * 0.3) * amt; l.kn.rotation.x = Math.max(0, Math.sin(ph + 1.2)) * (0.6 + run * 0.5) * amt; }
      for (const a of arms) { const ph = w + (a.sx > 0 ? 0 : PI); a.sh.rotation.x = -Math.sin(ph) * (0.35 + run * 0.4) * amt; a.el.rotation.x = -0.2 - Math.max(0, Math.sin(ph)) * 0.4 * amt; }
      hips.position.y = hipY + Math.abs(Math.sin(w)) * 0.03 * amt * s - run * 0.04;
      hips.rotation.y = Math.sin(w) * 0.06 * amt; hips.rotation.x = run * 0.25;
    };
    rig.reach = k => { for (const a of arms) { a.sh.rotation.x = U.lerp(a.sh.rotation.x, -1.45, k); a.sh.rotation.z = U.lerp(a.sh.rotation.z, a.sx * 0.12, k); a.el.rotation.x = U.lerp(a.el.rotation.x, -0.15, k); } };
    rig.sit = (k, seatY = 0.45) => {
      const hy = U.lerp(hipY, seatY + 0.06 * s, k);
      hips.position.y = hy; hips.position.z = U.lerp(0, -0.12, k);
      for (const l of legs) { l.hp.rotation.x = U.lerp(l.hp.rotation.x, -1.5, k); l.kn.rotation.x = U.lerp(l.kn.rotation.x, 1.5, k); }
      for (const a of arms) { a.sh.rotation.x = U.lerp(a.sh.rotation.x, -0.35, k); a.el.rotation.x = U.lerp(a.el.rotation.x, -1.1, k); a.sh.rotation.z = U.lerp(a.sh.rotation.z, a.sx * -0.05, k); }
      hips.rotation.x = U.lerp(hips.rotation.x, 0.15, k);
      neck.rotation.x = U.lerp(neck.rotation.x, 0.75, k);
    };
    return rig;
  }
  K.humanoid = humanoid;

  // ============================================================ THE DROWNED
  function drownedModel() {
    const r = humanoid({
      key: 'drowned', h: 1.82, build: 1.22, belly: 1.1, coat: 0, long: 1.12, hands: 'long',
      clothBase: '#3a4440', skin: { base: '#7d8a80', mottle: ['90,105,95', '120,130,120', '70,80,90', '140,150,135'], mottleA: 0.4, veins: '50,60,80', veinCount: 22, spots: 30, spotColor: '60,70,60' },
      head: { swell: 1, eyes: 'hollow', mouth: 0.7, hair: true, hairLong: 3 }, skinVC: [0.78, 0.86, 0.8],
      clothVC: p => (p[1] > 0.0 && p[1] < 0.5 ? [0.55, 0.62, 0.6] : [0.4, 0.42, 0.44]),
      torsoExtra: (p, d) => S.smin(d, S.ellipsoid(p, [0, 0.38, 0.06], [0.21, 0.12, 0.13]) + S.fbm(p[0] * 20, p[1] * 20, p[2] * 20, 2) * 0.02, 0.02),   // a burst life jacket
    });
    // the life jacket's orange showing through the slime: a second, thin shell
    const lj = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.06, 8, 20, PI * 1.5), new THREE.MeshStandardMaterial({ color: 0x8a4a1a, roughness: 0.8 }));
    lj.rotation.set(H, 0, -PI * 0.25); lj.position.set(0, 0.5, 0.02); r.hips.add(lj);
    for (const m of r.mats) { m.roughness = Math.min(m.roughness, 0.35); }   // wet
    return {
      group: r.group, rig: r, mats: r.mats,
      lift(cr) {
        // under the surface while waiting; rising when it comes
        const st = cr.state;
        if (st === 'buried' || st === 'dormant') return -2.2;
        if (st === 'emerge') return -2.2 + U.smoothstep(0, 1, cr.anim.emerge) * 2.2 + Math.sin(cr.anim.t * 9) * 0.02;
        const fl = cr.g.world.floorAt(cr.pos.x, cr.pos.z);
        return fl < 0 ? -0.35 : 0;
      },
      animate(cr, dt) {
        const an = cr.anim;
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 2, 0, 1), cr.state === 'chase' ? 0.3 : 0);
        const reach = cr.state === 'emerge' ? 1 : cr.state === 'chase' ? 0.85 : 0.25 + Math.sin(an.t * 0.7) * 0.1;
        r.reach(Math.max(reach, an.attack || 0));
        r.neck.rotation.x = cr.state === 'chase' ? -0.1 : 0.35; r.neck.rotation.z = Math.sin(an.t * 0.5) * 0.25;
        r.hips.rotation.z = Math.sin(an.t * 0.6) * 0.05;
      },
    };
  }
  Sp.add({
    kind: 'drowned', model: drownedModel, radius: 0.32, catchR: 1.15, height: 1.8,
    traits: ['hearing', 'sight'], ambush: 'water', ambushR: 3.2, emergeT: 1.6, wakeOnSound: true,
    senses: { sight: 9, fov: 2.2, hearing: 1.3 }, speeds: { patrol: 0.7, investigate: 1.6, chase: 3.15 }, lose: 8, searchTime: 14, gait: 1.4,
    confined: ['waterZone', 'engineZone'], kill: 'pullUnder', stepRate: 1.2, stepHear: 10, voice: 'drowned', autoLairs: null,
  });

  // ============================================================ PASSENGERS
  const PCOL = [['#3a3430', [0.9, 0.85, 0.8]], ['#2a3446', [0.7, 0.75, 0.9]], ['#4a3a2a', [0.95, 0.85, 0.7]], ['#2e2e2e', [0.8, 0.8, 0.8]]];
  let pIdx = 0;
  function passengerModel() {
    const [base, tint] = PCOL[pIdx++ % PCOL.length];
    const r = humanoid({
      key: 'passenger' + (pIdx % PCOL.length), h: 1.7 + (pIdx % 3) * 0.05, build: 1.0 + (pIdx % 2) * 0.1, coat: 0.35,
      clothBase: base, skin: { base: '#a8a49c', mottle: ['130,130,125', '160,155,150', '110,110,115'], veins: '80,80,100', veinCount: 8 },
      head: { eyes: 'none', mouth: 0.9, hair: true, hairLong: 4 }, skinVC: [0.8, 0.8, 0.82],
      clothVC: p => (p[1] > 0.25 && p[1] < 0.55 && Math.abs(p[0]) < 0.2 && p[2] > 0 ? [1.5, 0.75, 0.3] : tint),   // the orange life jacket front
    });
    for (const m of r.mats) m.roughness = Math.min(m.roughness, 0.6);
    return {
      group: r.group, rig: r, mats: r.mats,
      animate(cr, dt) {
        const an = cr.anim, asleep = cr.state === 'asleep' || cr.state === 'dormant';
        r.stand();
        if (asleep) { r.sit(1, 0.45); r.neck.rotation.x = 0.95; return; }
        if (cr.state === 'emerge') { r.sit(1 - an.emerge, 0.45); r.neck.rotation.x = U.lerp(0.95, -0.2, an.emerge); return; }
        r.walk(an.walk, U.clamp(an.speed / 2, 0, 1), cr.state === 'chase' ? 0.6 : 0);
        r.reach((cr.state === 'chase' ? 0.6 : 0.1) + (an.attack || 0) * 0.4);
        r.neck.rotation.x = 0.4 + Math.sin(an.t * 3.1) * 0.05; r.neck.rotation.z = Math.sin(an.t * 1.3) * 0.3;
      },
    };
  }
  Sp.add({
    kind: 'passenger', model: passengerModel, radius: 0.3, catchR: 1.05, height: 1.75,
    traits: ['lightWake', 'hearing', 'sight'], wakeD: 10, wakeT: 0.6,
    senses: { sight: 11, fov: 2.0, hearing: 1.0 }, speeds: { patrol: 0.9, investigate: 1.8, chase: 3.7 }, lose: 7,
    confined: ['passDeck'], kill: 'underSeats', stepRate: 1.4, stepHear: 8, voice: 'passenger',
    // one waking wakes the ones around it
    onEmerge(cr, g) { for (const e of g.entities) if (e !== cr && e.kind === 'passenger' && e.state === 'asleep' && e.pos.distanceTo(cr.pos) < 7) { e.litT = 0.5; } },
  });

  // ============================================================ THE BELLMAN
  function bellmanModel() {
    const oil = new THREE.MeshPhysicalMaterial({ color: 0x0c0d0e, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.15, vertexColors: true });
    const r = humanoid({
      key: 'bellman', h: 2.55, build: 1.15, coat: 0.85, long: 1.15, bodyMat: oil,
      head: { eyes: 'none', mouth: 0, swell: 0.4 }, skinVC: [0.3, 0.32, 0.33], skinMat: new THREE.MeshStandardMaterial({ color: 0x0b0c0d, roughness: 0.55, vertexColors: true }),
      clothVC: () => [0.95, 0.95, 0.95], shoeVC: [0.1, 0.1, 0.1],
    });
    // sou'wester: wide brim, long back flap
    const hat = new THREE.Mesh(new THREE.LatheGeometry([[0.001, 0.22], [0.1, 0.21], [0.12, 0.13], [0.24, 0.06], [0.27, 0.03], [0.001, 0.02]].map(([x, y]) => new THREE.Vector2(x, y)), 24), new THREE.MeshPhysicalMaterial({ color: 0x1a1608, roughness: 0.3, clearcoat: 0.8 }));
    hat.scale.set(1, 1, 1.2); hat.position.set(0, 0.12, -0.02); hat.rotation.x = 0.25; r.head.add(hat);
    // the bell, held in both hands at the chest
    const bronze = new THREE.MeshStandardMaterial({ color: 0x8a5e24, roughness: 0.3, metalness: 1 });
    const bell = new THREE.Mesh(new THREE.LatheGeometry([[0.001, 0.42], [0.09, 0.4], [0.13, 0.32], [0.15, 0.15], [0.19, 0.04], [0.23, 0.0], [0.2, -0.015], [0.15, 0.02], [0.001, 0.02]].map(([x, y]) => new THREE.Vector2(x, y)), 32), bronze);
    bell.position.set(0, 0.35, 0.35); r.hips.add(bell);
    const clapper = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), bronze); clapper.position.set(0, 0.06, 0); bell.add(clapper);
    r.mats.push(bronze);
    return {
      group: r.group, rig: r, mats: r.mats, bell, clapper,
      animate(cr, dt) {
        const an = cr.anim;
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 1.6, 0, 1) * 0.8, 0);
        // both hands on the bell's crown at the chest
        for (const a of r.arms) { a.sh.rotation.x = -0.55; a.sh.rotation.z = a.sx * -0.22; a.el.rotation.x = -1.25; a.el.rotation.z = a.sx * -0.35; }
        r.neck.rotation.x = 0.3 + Math.sin(an.t * 0.4) * 0.05;
        r.neck.rotation.y = cr.state === 'investigate' || cr.state === 'search' ? Math.sin(an.t * 0.9) * 0.6 : 0;
        clapper.position.x = Math.sin(an.walk * 2) * 0.05 * U.clamp(an.speed, 0, 1);
        // over your head, at the end
        if (an.attack > 0) { bell.position.y = 0.35 + an.attack * 1.0; bell.position.z = 0.35 + an.attack * 0.3; bell.rotation.x = PI * Math.min(1, an.attack * 1.4); }
        else { bell.position.set(0, 0.35, 0.35); bell.rotation.x = 0; }
      },
    };
  }
  Sp.add({
    kind: 'bellman', model: bellmanModel, radius: 0.42, catchR: 1.3, height: 2.6,
    traits: ['hearing', 'sight'], senses: { sight: 7, fov: 2.0, hearing: 1.5 }, speeds: { patrol: 0.95, investigate: 1.5, chase: 3.3 }, lose: 10, searchTime: 18, gait: 1.2,
    allowCell: (cr, x, y) => !!(cr.L.meta.outdoor && cr.L.meta.outdoor[cr.L.i(x, y)]), kill: 'bell', stepRate: 1.9, stepHear: 30, voice: 'bellman',
    // the clapper knocks with each step: you always know roughly where he is
    postUpdate(cr, g) {
      const a = g.audio; if (!a || !a.speciesKnock) return;
      cr.knockAcc = (cr.knockAcc || 0) + cr.anim.speed * 0.016;
      if (cr.knockAcc > (cr.state === 'chase' ? 1.0 : 2.4)) { cr.knockAcc = 0; a.speciesKnock(cr, cr.state === 'chase' ? 1 : 0.55); }
    },
  });

  // ------------------------------------------------------------ missing furniture for the ferry
  const D = PB.Props.DEFS;
  D.wardrobe = [['rbox', 'teak', 1.0, 2.0, 0.55, 0.02, 0, 1.0, 0], ['box', 'black', 0.004, 1.85, 0.002, 0, 1.0, 0.276], ...[-0.06, 0.06].map(x => ['rbox', 'brass', 0.02, 0.12, 0.02, 0.006, x, 1.05, 0.29])];
  D.toolLockers = [['rbox', 'engineGreen', 1.2, 1.9, 0.5, 0.01, 0, 0.95, 0], ...[-0.3, 0.3].flatMap(x => [['rbox', 'engineGreen', 0.58, 1.85, 0.02, 0.005, x, 0.95, 0.26], ['rbox', 'chrome', 0.03, 0.12, 0.03, 0.006, x + (x < 0 ? 0.24 : -0.24), 1.0, 0.28]]), ['box', 'labelCard', 0.3, 0.08, 0.004, 0, 1.7, 0.272]];
})(typeof window !== 'undefined' ? window : globalThis);
