/* The creatures of Falk's Carnival (Chapter 8).
   - Masks: thin figures in long dark coats, each in one of the papier-mâché masks off the stall — a moon,
     a cat, a pig, a sad clown, a sun, a crow. While you look at them they are only people standing about
     after closing. Look away and they are closer. Only the heads move while you watch.
   - Carousel horses: four of the carved horses on the carousel are not carved. While the organ plays they
     come off the deck on their broken brass poles, bobbing up and down as if they were still going round,
     and run you down. When the music stops they stop, wherever they are.
   - Laughing Lotte: the funhouse's laughing automaton, three metres of papier-mâché and polka-dot dress,
     come down out of her glass booth. She cannot see. She hears, she is slow, she laughs all the time, and
     nothing stops her.
   Deaths (kills.js): masks, trample (a horse), lotte. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U;
  const K = PB.SpeciesKit, Sp = PB.Species;
  const PI = Math.PI, H = PI / 2;

  // ============================================================ MASKS
  // Six masks, each its own shape; painted by vertex colour
  const MASKS = {
    moon: {
      fn: p => { let d = S.ellipsoid(p, [0, 0, 0], [0.17, 0.21, 0.12]); d = S.smax(d, -S.sphere(p, [0.12, 0.05, 0.12], 0.14), 0.03); return d; },
      col: p => (p[2] > 0.05 && Math.abs(p[1] - 0.04) < 0.012 && Math.abs(Math.abs(p[0] + 0.03) - 0.06) < 0.03 ? [0.1, 0.1, 0.1] : [0.92, 0.88, 0.7]),
    },
    cat: {
      fn: p => { const ax = Math.abs(p[0]); let d = S.ellipsoid(p, [0, 0, 0], [0.16, 0.15, 0.11]); d = S.smin(d, S.capsule([ax, p[1], p[2]], [0.09, 0.12, 0], [0.13, 0.25, -0.01], 0.04, 0.01), 0.03); d = S.smin(d, S.sphere(p, [0, -0.04, 0.09], 0.05), 0.03); return d; },
      col: p => { const ax = Math.abs(p[0]); if (p[2] > 0.06 && Math.abs(p[1] - 0.04) < 0.035 && Math.abs(ax - 0.06) < 0.012) return [0.05, 0.05, 0.05]; if (p[2] > 0.1 && p[1] < -0.02 && p[1] > -0.06 && ax < 0.02) return [0.6, 0.2, 0.25]; return [0.3, 0.3, 0.32]; },
    },
    pig: {
      fn: p => { const ax = Math.abs(p[0]); let d = S.ellipsoid(p, [0, 0, 0], [0.17, 0.16, 0.13]); d = S.smin(d, S.capsule(p, [0, -0.02, 0.1], [0, -0.03, 0.17], 0.06, 0.055), 0.02); d = S.smin(d, S.ellipsoid([ax, p[1], p[2]], [0.13, 0.14, -0.01], [0.05, 0.06, 0.02]), 0.02); for (const sx of [-1, 1]) d = S.smax(d, -S.sphere(p, [sx * 0.022, -0.03, 0.225], 0.014), 0.004); return d; },
      col: p => (Math.abs(p[1] - 0.06) < 0.02 && p[2] > 0.08 && Math.abs(Math.abs(p[0]) - 0.07) < 0.02 ? [0.08, 0.06, 0.06] : [0.88, 0.62, 0.62]),
    },
    sadClown: {
      fn: p => S.ellipsoid(p, [0, 0, 0], [0.15, 0.2, 0.12]),
      col: p => {
        const ax = Math.abs(p[0]), y = p[1];
        if (p[2] > 0.05 && Math.abs(ax - 0.06) + Math.abs(y - 0.05) * 0.6 < 0.04) return [0.05, 0.05, 0.1];
        if (p[2] > 0.05 && Math.abs(ax - 0.06) < 0.006 && y < 0.02 && y > -0.06) return [0.1, 0.1, 0.25];   // the painted tear
        if (p[2] > 0.06 && y < -0.08 && y > -0.12 && ax < 0.05 + (y + 0.1) * 0.6) return [0.7, 0.08, 0.1];
        if (p[2] > 0.09 && Math.hypot(p[0], y + 0.01) < 0.025) return [0.8, 0.1, 0.1];
        return [0.95, 0.94, 0.92];
      },
    },
    sun: {
      fn: p => { let d = S.ellipsoid(p, [0, 0, 0], [0.15, 0.15, 0.1]); const a = Math.atan2(p[1], p[0]), rr = Math.hypot(p[0], p[1]); const ray = Math.max(rr - 0.27, Math.abs(p[2]) - 0.02, (Math.abs(Math.sin(a * 6)) - 0.35) * rr); d = S.smin(d, ray, 0.02); return d; },
      col: p => (p[2] > 0.06 && Math.abs(p[1] - 0.03) < 0.012 && Math.abs(Math.abs(p[0]) - 0.05) < 0.025 ? [0.15, 0.08, 0.02] : [0.95, 0.72, 0.2]),
    },
    crow: {
      fn: p => { let d = S.ellipsoid(p, [0, 0.02, 0], [0.14, 0.17, 0.12]); d = S.smin(d, S.capsule(p, [0, -0.0, 0.08], [0, -0.1, 0.36], 0.05, 0.006), 0.04); return d; },
      col: p => (p[2] > 0.06 && p[1] > 0.02 && p[1] < 0.08 && Math.abs(Math.abs(p[0]) - 0.06) < 0.02 ? [0.7, 0.62, 0.2] : [0.08, 0.08, 0.09]),
    },
  };
  const MASK_ORDER = ['moon', 'cat', 'pig', 'sadClown', 'sun', 'crow'];
  let mIdx = 0;
  function maskModel() {
    const k = mIdx++, kind = MASK_ORDER[k % MASK_ORDER.length], m = MASKS[kind];
    const coat = K.cloth('mask:coat' + (k % 3), ['#1e1c1a', '#2a2622', '#1a1e22'][k % 3], { stains: 50, rough: 0.9, rep: 2 });
    const r = K.humanoid({
      key: 'mask' + (k % 3), h: 1.82 + (k % 3) * 0.07, build: 0.78, coat: 0.85, long: 1.06, bodyMat: coat,
      skin: { base: '#8a8478', mottle: ['120,112,104', '150,140,130'], veins: '90,90,100', veinCount: 6 }, head: { eyes: 'hollow', mouth: 0, swell: 0 },
      skinVC: [0.8, 0.78, 0.76], clothVC: p => (p[1] > 0.55 && Math.abs(p[0]) < 0.12 && p[2] > 0.03 ? [0.6, 0.6, 0.62] : [1, 1, 1]),
    });
    // the mask itself: papier-mâché, a little too big for the head, its string round the back
    const paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.75, vertexColors: true });
    const mesh = K.meshOf('mask:' + kind, m.fn, [[-0.3, -0.3, -0.2], [0.3, 0.32, 0.42]], 0.008, paint, { color: (p, n) => { const a = K.aoColor(m.fn, [1, 1, 1], 1)(p, n), c = m.col(p); return [a[0] * c[0], a[1] * c[1], a[2] * c[2]]; } });
    mesh.position.set(0, 0.11 * r.s, 0.07); mesh.scale.setScalar(1.08); r.head.add(mesh);
    const str = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.003, 4, 24), new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 })); str.rotation.x = H; str.position.set(0, 0.12 * r.s, -0.01); r.head.add(str);
    r.mats.push(paint);
    return {
      group: r.group, rig: r, mats: r.mats,
      animate(cr, dt) {
        const an = cr.anim;
        // seen: perfectly still but for the head, which follows you a little
        if (an.frozen > 0.5) {
          const pl = cr.g.player.pos, yaw = U.angleWrap(Math.atan2(pl.x - cr.pos.x, pl.z - cr.pos.z) - cr.heading);
          r.neck.rotation.y = U.damp(r.neck.rotation.y, U.clamp(yaw, -0.9, 0.9), 0.6, dt);
          r.neck.rotation.z = Math.sin(k * 2.1) * 0.25;
          return;
        }
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 2.2, 0, 1), cr.state === 'chase' ? 0.45 : 0);
        r.reach(cr.state === 'chase' ? 0.55 + (an.attack || 0) * 0.45 : 0);
        r.neck.rotation.z = Math.sin(k * 2.1) * 0.25; r.neck.rotation.x = 0.05;
      },
    };
  }
  Sp.add({
    kind: 'mask', model: maskModel, radius: 0.3, catchR: 1.1, height: 1.95,
    traits: ['freezeWhenSeen', 'sight', 'hearing'], senses: { sight: 16, fov: 2.4, hearing: 0.9 },
    speeds: { patrol: 1.0, investigate: 2.2, chase: 4.3 }, lose: 12, searchTime: 14, gait: 1.6, hunt: true,
    kill: 'masks', stepRate: 1.4, stepHear: 7, voice: 'mask', autoLairs: null,
  });

  // ============================================================ CAROUSEL HORSES
  // One carved horse, jumping, the brass pole through it; painted white, dappled, a red saddle, gold mane
  const horseFn = p => {
    const ax = Math.abs(p[0]), q = [ax, p[1], p[2]];
    let d = S.ellipsoid(p, [0, 1.15, 0], [0.19, 0.24, 0.55]);
    d = S.smin(d, S.sphere(p, [0, 1.2, 0.36], 0.24), 0.1);
    d = S.smin(d, S.sphere(p, [0, 1.19, -0.36], 0.23), 0.1);
    d = S.smin(d, S.capsule(p, [0, 1.3, 0.48], [0, 1.72, 0.7], 0.13, 0.09), 0.08);                                      // neck
    d = S.smin(d, S.capsule(p, [0, 1.78, 0.72], [0, 1.6, 1.0], 0.095, 0.065), 0.05);                                     // head
    d = S.smin(d, S.capsule(q, [0.045, 1.86, 0.7], [0.06, 1.98, 0.66], 0.025, 0.008), 0.02);                             // ears
    d = S.smax(d, -S.ellipsoid(p, [0, 1.555, 1.0], [0.05, 0.03, 0.08]), 0.01);                                          // the open mouth
    d = S.smin(d, S.capsule(p, [0, 1.85, 0.62], [0, 1.4, 0.4], 0.05, 0.035) + Math.sin(p[1] * 60) * 0.008, 0.03);         // carved mane
    // front legs tucked under, hind legs flung back: the jumper's pose
    d = S.smin(d, S.capsule(q, [0.1, 1.05, 0.42], [0.11, 0.86, 0.66], 0.06, 0.045), 0.04);
    d = S.smin(d, S.capsule(q, [0.11, 0.86, 0.66], [0.11, 0.72, 0.48], 0.04, 0.035), 0.02);
    d = S.smin(d, S.ellipsoid(q, [0.11, 0.7, 0.45], [0.04, 0.035, 0.05]), 0.01);
    d = S.smin(d, S.capsule(q, [0.1, 1.05, -0.4], [0.11, 0.78, -0.6], 0.07, 0.045), 0.04);
    d = S.smin(d, S.capsule(q, [0.11, 0.78, -0.6], [0.11, 0.62, -0.86], 0.04, 0.032), 0.02);
    d = S.smin(d, S.ellipsoid(q, [0.11, 0.6, -0.9], [0.04, 0.035, 0.05]), 0.01);
    d = S.smin(d, S.capsule(p, [0, 1.25, -0.56], [0, 0.92, -0.86], 0.055, 0.03) + Math.sin(p[2] * 50 + p[1] * 30) * 0.008, 0.04);   // tail
    // the saddle, raised a little, with its cantle
    d = S.smin(d, S.ellipsoid(p, [0, 1.38, -0.05], [0.2, 0.05, 0.22]), 0.03);
    return d + S.fbm(p[0] * 20, p[1] * 20, p[2] * 20, 2) * 0.003;
  };
  const horseCol = (p, k) => {
    const ax = Math.abs(p[0]), y = p[1], z = p[2];
    // paint flaking off: bare wood
    if (S.fbm(p[0] * 9 + k, y * 9, z * 9, 2) > 0.36) return [0.42, 0.3, 0.2];
    if (y > 1.34 && Math.abs(z + 0.05) < 0.24 && ax < 0.22) return y > 1.4 ? [0.62, 0.08, 0.1] : [0.75, 0.55, 0.2];        // saddle
    if (y > 1.2 && y < 1.36 && Math.abs(z + 0.05) < 0.34 && ax > 0.15) return [0.15, 0.25, 0.6];                         // blanket
    if (z > 0.38 && y > 1.36 && (Math.abs(p[0]) < 0.06 || z < 0.66) && y > 1.4 + (z - 0.4) * 0.3 && ax < 0.06) return [0.8, 0.62, 0.22];   // mane
    if (z > 0.75 && y > 1.62 && y < 1.68 && ax > 0.05) return [0.02, 0.02, 0.02];                                       // eyes
    if (z > 0.7 && Math.abs(y - 1.64) < 0.02) return [0.7, 0.1, 0.1];                                                    // bridle
    if (y < 0.74 && (z > 0.4 || z < -0.8)) return [0.75, 0.58, 0.22];                                                    // gilded hooves
    const dap = S.fbm(p[0] * 14, y * 14, z * 14, 2);
    return dap > 0.15 ? [0.72, 0.72, 0.7] : [0.9, 0.88, 0.84];
  };
  let hIdx = 0;
  function horseGeo(k) {
    const fn = horseFn;
    return S.mesh('carousel:horse' + (k % 2), fn, [[-0.3, 0.5, -1.05], [0.3, 2.05, 1.12]], 0.017, { color: (p, n) => { const a = K.aoColor(fn, [1, 1, 1], 1.2)(p, n), c = horseCol(p, k % 2); return [a[0] * c[0], a[1] * c[1], a[2] * c[2]]; }, smooth: 1 });
  }
  PB.carouselHorseGeo = horseGeo;
  function horseModel() {
    const k = hIdx++;
    const paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38, vertexColors: true });
    const g = new THREE.Group(), bob = new THREE.Group(); g.add(bob);
    const body = new THREE.Mesh(horseGeo(k), paint); body.castShadow = true; bob.add(body);
    // the brass pole, snapped off above the head and below the belly
    const brass = new THREE.MeshStandardMaterial({ color: 0xc8a050, roughness: 0.25, metalness: 1 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 2.3, 10), brass); pole.position.set(0, 1.25, -0.02); bob.add(pole);
    const stub = new THREE.Mesh(new THREE.ConeGeometry(0.034, 0.12, 6), brass); stub.position.set(0, 2.45, -0.02); stub.rotation.z = 0.4; bob.add(stub);
    // glossy black eyes, painted
    const eyeM = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.08 });
    for (const sx of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 8), eyeM); e.position.set(sx * 0.07, 1.65, 0.8); bob.add(e); }
    return {
      group: g, mats: [paint, brass, eyeM],
      animate(cr, dt) {
        const an = cr.anim, run = U.clamp(an.speed / 2.5, 0, 1), on = cr.state !== 'dormant' && cr.g.flags.music;
        // up and down on the pole as if the carousel were still turning; stopped dead when the music stops
        if (on) cr.bobT = (cr.bobT || 0) + dt * (2.2 + run * 2.4);
        const b = cr.bobT || 0;
        bob.position.y = (Math.sin(b) * 0.5 + 0.5) * (0.35 + run * 0.25) - (cr.state === 'dormant' ? 0 : 0.55);
        bob.rotation.x = Math.cos(b) * 0.1 * (0.4 + run);
        bob.rotation.z = Math.sin(b * 0.5) * 0.04;
      },
    };
  }
  Sp.add({
    kind: 'horse', model: horseModel, radius: 0.45, catchR: 1.3, height: 2.0,
    traits: ['musicRule', 'sight'], senses: { sight: 18, fov: 2.6, hearing: 0.6 },
    speeds: { patrol: 1.6, investigate: 2.6, chase: 3.45 }, lose: 10, searchTime: 10, gait: 1.0, hunt: true,
    kill: 'trample', stepRate: 1.1, stepHear: 14, voice: 'horse', autoLairs: null, visibleDormant: true,
  });

  // ============================================================ LAUGHING LOTTE
  // Lotte laughs with no face: a smooth cracked papier-mâché head under a mop of red curls (the laugh is
  // all there is of her mouth)
  const lotteHead = p => {
    let d = S.ellipsoid(p, [0, 0, 0], [0.26, 0.3, 0.25]);
    // hair: a mop of red curls
    for (let k = 0; k < 18; k++) { const a = k / 18 * PI * 2, b = (k % 3) * 0.12; d = S.smin(d, S.sphere(p, [Math.cos(a) * 0.22, 0.18 + b * 0.3 + Math.sin(k * 1.7) * 0.03, Math.sin(a) * 0.2 - 0.04], 0.09), 0.03); }
    return d + S.fbm(p[0] * 30, p[1] * 30, p[2] * 30, 2) * 0.004;
  };
  const lotteHeadCol = p => {
    const y = p[1];
    if (y > 0.12 && (p[2] < 0.18 || y > 0.2)) return [0.75, 0.2, 0.08];                                            // hair
    if (S.fbm(p[0] * 7, y * 7, p[2] * 7, 2) > 0.38) return [0.62, 0.55, 0.45];                                       // cracked papier-mâché
    return [0.9, 0.85, 0.76];
  };
  function lotteModel() {
    const dress = K.cloth('lotte:dress', '#a81a2a', { stains: 70, rough: 0.85, rep: 3, paint: (g, w, h) => { g.fillStyle = '#f0e8d8'; for (let y = 10; y < h; y += 46) for (let x = (y / 46 % 2) * 23 + 10; x < w; x += 46) { g.beginPath(); g.arc(x, y, 9, 0, PI * 2); g.fill(); } } });
    const r = K.humanoid({
      key: 'lotte', h: 3.0, build: 1.4, belly: 1.25, coat: 1.05, long: 1.15, hands: 'long', bodyMat: dress,
      skin: { base: '#e8c0a0', mottle: ['220,180,150', '240,200,170', '200,160,140'], veins: '180,140,130', veinCount: 2 }, head: { eyes: 'none', mouth: 0, swell: 0 },
      skinVC: [1, 0.92, 0.85],
    });
    r.head.visible = false;
    const paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, vertexColors: true });
    const head = K.meshOf('lotte:head', lotteHead, [[-0.36, -0.34, -0.34], [0.36, 0.44, 0.34]], 0.011, paint, { color: (p, n) => { const a = K.aoColor(lotteHead, [1, 1, 1], 1.2)(p, n), c = lotteHeadCol(p); return [a[0] * c[0], a[1] * c[1], a[2] * c[2]]; } });
    head.position.set(0, 0.17, 0.02); r.neck.add(head);
    // a little straw hat with a flower, a white lace collar
    const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, 0.08, 18), new THREE.MeshStandardMaterial({ color: 0xd8c070, roughness: 0.9 })); hat.position.set(0.06, 0.51, -0.02); hat.rotation.z = -0.25; r.neck.add(hat);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.012, 22), hat.material); brim.position.set(0.05, 0.47, -0.02); brim.rotation.z = -0.25; r.neck.add(brim);
    const flower = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshStandardMaterial({ color: 0xc81a4a, roughness: 0.7 })); flower.position.set(-0.12, 0.53, 0.06); r.neck.add(flower);
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 6, 24), new THREE.MeshStandardMaterial({ color: 0xf0ece0, roughness: 0.9 })); collar.rotation.x = H; collar.position.set(0, 0.04, 0.02); r.neck.add(collar);
    r.mats.push(paint);
    return {
      group: r.group, rig: r, mats: r.mats,
      animate(cr, dt) {
        const an = cr.anim;
        // an automaton: everything in little jerks, never smooth
        const tq = Math.floor(an.t / 0.11) * 0.11, wq = Math.floor(an.walk / 0.35) * 0.35;
        r.stand();
        r.walk(wq, U.clamp(an.speed / 1.6, 0, 1), 0);
        r.hips.rotation.z = Math.sin(tq * 2.2) * 0.09;
        // the laugh: the head thrown back, the shoulders shaking
        const laugh = Math.abs(Math.sin(tq * 3.3));
        r.neck.rotation.x = -0.25 * laugh + 0.1; r.neck.rotation.z = Math.sin(tq * 1.1) * 0.15;
        for (const a of r.arms) { a.sh.rotation.x = -0.4 - laugh * 0.25 - (cr.state === 'chase' ? 0.6 + (an.attack || 0) * 0.5 : 0); a.sh.rotation.z = a.sx * -(0.25 + laugh * 0.1); a.el.rotation.x = -0.6; }
      },
    };
  }
  Sp.add({
    kind: 'lotte', model: lotteModel, radius: 0.55, catchR: 1.6, height: 3.1,
    traits: ['hearing', 'blind'], senses: { sight: 0, fov: 0, hearing: 1.6 },
    speeds: { patrol: 0.6, investigate: 1.25, chase: 2.5 }, lose: 14, searchTime: 18, gait: 0.8,
    kill: 'lotte', stepRate: 2.0, stepHear: 22, voice: 'lotte', autoLairs: null,
  });
})(typeof window !== 'undefined' ? window : globalThis);
