/* Photographs, taken rather than painted: each one is a small 3D scene (sculpted kids, the arcade
   cabinet, a hospital bed, the storm tunnel), lit the way a cheap 1980s camera lit things (the on-camera
   flash, whatever glowed behind), rendered once off screen and handed to art.js, which prints it:
   Polaroid border, colour cast, grain, soft focus.
   The kids are distance-field sculptures (see sdf.js) with their clothes, hair and faces painted into the
   vertex colours. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U, P = PB.Props;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ a kid
  // o: h (height scale), hair: 'short' | 'long' | 'pigtails' | 'curly', build, mouth: 'laugh' | 'smile' | 'flat',
  //    eyes: 'open' | 'closed', armUp (left arm raised, finger up), hug (arms forward), colors {skin, hair, shirt, pants}
  function kidDist(o) {
    const b = o.build || 1;
    const armUp = !!o.armUp, hug = !!o.hug;
    return p => {
      const x = Math.abs(p[0]), q = [x, p[1], p[2]];
      // legs, shoes
      let d = S.capsule(q, [0.085, 0.86, 0], [0.09, 0.09, 0.01], 0.07 * b, 0.05 * b);
      d = S.smin(d, S.ellipsoid(q, [0.095, 0.045, 0.045], [0.055, 0.045, 0.11]), 0.03);
      // hips, torso, shoulders
      d = S.smin(d, S.ellipsoid(p, [0, 0.93, 0], [0.165 * b, 0.11, 0.105 * b]), 0.06);
      // a chest that is wider than it is deep, and shoulders that slope down from the neck
      d = S.smin(d, S.ellipsoid(p, [0, 1.11, 0.005], [0.16 * b, 0.2, 0.1 * b]), 0.07);
      d = S.smin(d, S.capsule(q, [0.05, 1.255, 0], [0.18 * b, 1.225, 0], 0.052, 0.055), 0.05);
      // arms
      const armR = (sx) => {
        const sh = [sx * 0.19 * b, 1.23, 0];
        let el, ha;
        if (armUp && sx < 0) { el = [sx * 0.26, 1.46, 0.05]; ha = [sx * 0.24, 1.66, 0.08]; }
        else if (hug) { el = [sx * 0.24, 1.08, 0.18]; ha = [sx * 0.1, 1.12, 0.36]; }
        else { el = [sx * 0.23 * b, 1.0, 0.03]; ha = [sx * 0.21 * b, 0.78, 0.06]; }
        let a = S.capsule(p, sh, el, 0.052, 0.044);
        a = S.smin(a, S.capsule(p, el, ha, 0.044, 0.036), 0.02);
        a = S.smin(a, S.ellipsoid(p, [ha[0], ha[1] - (armUp && sx < 0 ? -0.02 : 0.04), ha[2]], [0.03, 0.045, 0.02]), 0.02);
        if (armUp && sx < 0) a = S.smin(a, S.capsule(p, [ha[0], ha[1] + 0.02, ha[2]], [ha[0], ha[1] + 0.1, ha[2]], 0.011), 0.01);
        return a;
      };
      d = S.smin(d, Math.min(armR(-1), armR(1)), 0.04);
      // neck and head
      d = S.smin(d, S.capsule(p, [0, 1.25, -0.005], [0, 1.38, 0.01], 0.045, 0.042), 0.03);
      let head = S.ellipsoid(p, [0, 1.475, 0.01], [0.095, 0.118, 0.106]);
      head = S.smin(head, S.ellipsoid(p, [0, 1.41, 0.035], [0.073, 0.066, 0.078]), 0.05);
      head = S.smin(head, S.capsule(p, [0, 1.47, 0.1], [0, 1.44, 0.117], 0.011, 0.015), 0.018);
      head = S.smin(head, S.capsule(p, [-0.04, 1.495, 0.09], [0.04, 1.495, 0.09], 0.013), 0.022);
      for (const sx of [-1, 1]) head = S.smin(head, S.ellipsoid(p, [sx * 0.095, 1.47, 0], [0.014, 0.03, 0.02]), 0.012);
      if (o.mouth === 'laugh') head = S.smax(head, -S.ellipsoid(p, [0, 1.402, 0.108], [0.03, 0.009, 0.02]), 0.006);
      d = S.smin(d, head, 0.03);
      return Math.min(d, hairDist(o)(p));
    };
  }
  // Hair as its own shape, so it can be coloured exactly where it is
  function hairDist(o) {
    return p => {
      // a cap over the crown that stops at the hairline in front and at the nape behind
      let hair = S.ellipsoid(p, [0, 1.5, -0.008], [0.106, 0.122, 0.116]);
      hair = S.smax(hair, (p[2] - 0.055) + (1.53 - p[1]) * 0.9, 0.015);
      hair = S.smax(hair, 1.4 - p[1] + Math.min(0, p[2]) * 0.2, 0.02);
      if (o.hair === 'long') hair = S.smin(hair, S.smax(S.ellipsoid(p, [0, 1.35, -0.035], [0.118, 0.2, 0.085]), p[2] - 0.0, 0.02), 0.03);
      // a fringe over the forehead
      if (o.bangs) hair = S.smin(hair, S.smax(S.ellipsoid(p, [0, 1.535, 0.05], [0.1, 0.045, 0.07]), 1.505 - p[1] + Math.abs(p[0]) * 0.25, 0.01), 0.02);
      if (o.hair === 'pigtails') for (const sx of [-1, 1]) hair = S.smin(hair, S.ellipsoid(p, [sx * 0.12, 1.42, -0.02], [0.035, 0.08, 0.035]), 0.02);
      if (o.hair === 'curly') hair = S.smin(hair, S.smax(S.sphere(p, [0, 1.525, -0.015], 0.122) + S.noise(p[0] * 45, p[1] * 45, p[2] * 45) * 0.014, (p[2] - 0.07) + (1.54 - p[1]) * 0.9, 0.02), 0.02);
      return hair;
    };
  }
  function kidColor(o, fn) {
    const c = o.colors, hf = hairDist(o);
    return (p, n) => {
      const x = Math.abs(p[0]);
      let col;
      if (hf(p) < 0.004) {
        // hair: strands catch a little light along their length
        const st = 0.85 + 0.15 * Math.sin(p[0] * 300 + p[1] * 40);
        col = [c.hair[0] * st, c.hair[1] * st, c.hair[2] * st];
      } else if (p[1] > 1.35 || (p[1] > 1.268 && Math.hypot(p[0], p[2] + 0.002) < 0.056) || (o.pattern !== 'open' && p[1] > 1.235 && p[2] > 0.04 && x < 0.04 - (1.268 - p[1]) * 0.9)) {
        col = c.skin;
        // freckles, a little colour in the cheeks, darker under the nose and around the eyes
        for (const sx of [-1, 1]) if (Math.hypot(p[0] - sx * 0.055, p[1] - 1.44) < 0.024) col = [c.skin[0] * 1.03, c.skin[1] * 0.84, c.skin[2] * 0.82];
        if (o.freckles && p[2] > 0.07 && Math.abs(p[1] - 1.45) < 0.025 && x > 0.02 && x < 0.075 && (Math.sin(p[0] * 900) * Math.sin(p[1] * 1100) > 0.82)) col = [c.skin[0] * 0.72, c.skin[1] * 0.52, c.skin[2] * 0.42];
        if (p[2] > 0.09 && x < 0.02 && Math.abs(p[1] - 1.438) < 0.01) col = [col[0] * 0.88, col[1] * 0.84, col[2] * 0.82];
        for (const sx of [-1, 1]) {
          const ex = sx * 0.036, ey = 1.476;
          if (p[2] < 0.08) continue;
          // socket shading, then the eye, the iris in the character's colour, a pupil and a catchlight
          if (Math.hypot((p[0] - ex) * 0.75, (p[1] - ey) * 1.2) < 0.02) col = [col[0] * 0.9, col[1] * 0.85, col[2] * 0.83];
          if (o.eyes === 'closed') { if (Math.abs(p[1] - ey - 25 * (p[0] - ex) * (p[0] - ex)) < 0.0035 && Math.abs(p[0] - ex) < 0.015) col = [c.skin[0] * 0.42, c.skin[1] * 0.32, c.skin[2] * 0.3]; }
          else {
            if (Math.hypot((p[0] - ex) * 0.72, p[1] - ey) < 0.0118) col = [0.93, 0.91, 0.87];
            const iris = c.iris || [0.32, 0.2, 0.1];
            if (Math.hypot(p[0] - ex, p[1] - ey) < 0.0075) col = iris;
            if (Math.hypot(p[0] - ex, p[1] - ey) < 0.0034) col = [0.02, 0.02, 0.02];
            if (Math.hypot(p[0] - ex - 0.002, p[1] - ey - 0.0025) < 0.0014) col = [1, 1, 1];
            // upper lid line and lashes
            if (Math.abs(p[1] - ey - 0.0105 + 60 * (p[0] - ex) * (p[0] - ex)) < 0.0018 && Math.abs(p[0] - ex) < 0.016) col = [0.1, 0.07, 0.06];
          }
          // brows: thicker, following the brow ridge
          if (Math.abs(p[1] - 1.503 + 8 * (p[0] - ex * 1.05) * (p[0] - ex * 1.05)) < 0.0055 && Math.abs(p[0] - ex * 1.05) < 0.02) col = [c.hair[0] * 0.75, c.hair[1] * 0.7, c.hair[2] * 0.7];
        }
        // lips and the mouth: laughing shows teeth, smiling curves, flat is a thin line
        if (p[2] > 0.085 && x < 0.036) {
          const cy = 1.4 + 9 * x * x;
          const lip = [c.skin[0] * 0.95, c.skin[1] * 0.62, c.skin[2] * 0.6];
          if (o.mouth === 'laugh') { if (p[1] > cy - 0.01 && p[1] < cy + 0.009) col = p[1] > cy + 0.0035 ? lip : p[1] > cy - 0.001 ? [0.92, 0.9, 0.84] : p[1] > cy - 0.006 ? [0.3, 0.07, 0.07] : lip; }
          else if (o.mouth === 'smile') { if (Math.abs(p[1] - cy) < 0.0045) col = lip; if (Math.abs(p[1] - cy) < 0.0014) col = [0.45, 0.18, 0.18]; }
          else if (Math.abs(p[1] - 1.402) < 0.0045 && x < 0.024) col = Math.abs(p[1] - 1.402) < 0.0013 ? [0.42, 0.2, 0.2] : lip;
        }
      } else if (p[1] < 0.1) col = [0.12, 0.1, 0.09];
      else if (p[1] < 0.9 && x < 0.16 && Math.abs(p[2]) < 0.1) {
        col = c.pants;
        if (o.jeans) { const w = 0.9 + 0.1 * Math.sin(p[1] * 400 + p[0] * 90); col = [col[0] * w, col[1] * w, col[2] * w]; if (Math.abs(x - 0.085) < 0.004) col = [col[0] * 1.25, col[1] * 1.2, col[2] * 1.1]; }
      }
      else {
        // hands, then the clothes and their pattern
        const handY = o.armUp && p[0] < 0 ? 1.62 : o.hug ? 1.12 : 0.76;
        const hand = Math.abs(p[1] - handY) < 0.07 && x > 0.08 && (o.hug ? p[2] > 0.25 : true) && (o.armUp && p[0] < 0 ? p[1] > 1.55 : p[1] < 0.84 || o.hug);
        col = hand ? c.skin : c.shirt;
        if (!hand) {
          const arm = x > 0.17;
          if (o.pattern === 'stripes' && !arm) col = Math.sin(p[1] * 110) > 0.2 ? c.shirt : [0.93, 0.9, 0.82];
          if (o.pattern === 'stripes' && arm && Math.sin(p[1] * 110) > 0.2) col = [0.93, 0.9, 0.82];
          if (o.pattern === 'open' && !arm && p[2] > 0 && x < 0.05 && p[1] > 0.9) col = c.under || [0.92, 0.9, 0.86];
          if (o.pattern === 'panel' && !arm && p[1] > 1.08 && p[1] < 1.17) col = c.accent || [0.15, 0.2, 0.4];
          if (o.pattern === 'knit') { const k = 0.9 + 0.1 * Math.sin(p[1] * 260) * Math.sin(p[0] * 180); col = [col[0] * k, col[1] * k, col[2] * k]; }
          // a ribbed collar round the neck, a shade darker
          if (p[1] > 1.22 && !arm && Math.hypot(p[0], p[2]) < 0.085) col = [col[0] * 0.78, col[1] * 0.78, col[2] * 0.78];
        }
      }
      // soft ambient occlusion from the field
      let occ = 0;
      for (const s of [0.02, 0.05]) { const q = [p[0] + n[0] * s, p[1] + n[1] * s, p[2] + n[2] * s]; occ += Math.max(0, s - fn(q)) / s; }
      const a = Math.max(0.35, 1 - occ * 0.5);
      return [col[0] * a, col[1] * a, col[2] * a];
    };
  }
  const hex = h => { const c = new THREE.Color(h); return [c.r, c.g, c.b]; };
  const SKIN = hex('#e6b08e'), SKIN2 = hex('#d89a78');
  function kid(key, o) {
    const fn = kidDist(o);
    o.colors = Object.assign({ skin: SKIN, hair: hex('#3a2410'), shirt: hex('#2c3e7a'), pants: hex('#2a3a5a') }, o.colors || {});
    const geo = S.mesh('kid3:' + key, fn, [[-0.34, -0.02, -0.2], [0.34, 1.8, 0.45]], 0.0085, { color: kidColor(o, fn), smooth: 2 });
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75 }));
    const g = new THREE.Group(); g.add(m);
    if (o.glasses) {
      const fm = new THREE.MeshStandardMaterial({ color: 0x1a1410, roughness: 0.4 });
      for (const sx of [-1, 1]) { const r = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.004, 6, 18), fm); r.position.set(sx * 0.036, 1.477, 0.112); g.add(r); }
      const br = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.004, 0.004), fm); br.position.set(0, 1.482, 0.114); g.add(br);
    }
    if (o.hat === 'party') { const c = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 16), new THREE.MeshStandardMaterial({ color: 0xe060a0, roughness: 0.5 })); c.position.set(0.02, 1.66, 0); c.rotation.z = -0.25; g.add(c); }
    if (o.hat === 'santa') { const c = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.22, 16), new THREE.MeshStandardMaterial({ color: 0xc02020, roughness: 0.8 })); c.position.set(0.02, 1.66, -0.01); c.rotation.z = -0.4; g.add(c); const t = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.02, 8, 20), new THREE.MeshStandardMaterial({ color: 0xf4f0ea, roughness: 0.9 })); t.rotation.x = H; t.position.set(0, 1.575, -0.005); g.add(t); }
    g.scale.setScalar(o.h || 1);
    return g;
  }
  // Clothes and hair for the five (and Lily)
  const CAST = {
    danny: { h: 1.1, build: 1.08, hair: 'short', pattern: 'open', jeans: true, colors: { shirt: hex('#3a5a8a'), under: hex('#a8a296'), hair: hex('#2a1a10'), pants: hex('#2a3a5a'), iris: [0.28, 0.18, 0.1] } },
    rosie: { h: 1.04, hair: 'long', bangs: true, pattern: 'knit', colors: { shirt: hex('#8a3a7a'), hair: hex('#6a2a12'), pants: hex('#2a2a3a'), iris: [0.3, 0.18, 0.08] } },
    nell: { h: 1.02, hair: 'long', bangs: true, glasses: true, pattern: 'open', colors: { shirt: hex('#2a7a7a'), under: hex('#c9bb9c'), hair: hex('#16100c'), pants: hex('#40404a'), iris: [0.22, 0.14, 0.08] } },
    toby: { h: 0.92, hair: 'curly', freckles: true, pattern: 'stripes', jeans: true, colors: { shirt: hex('#c86a20'), hair: hex('#a8441a'), pants: hex('#3a4a6a'), skin: SKIN2, iris: [0.25, 0.4, 0.2] } },
    sam: { h: 0.94, hair: 'short', pattern: 'panel', jeans: true, colors: { shirt: hex('#c8a830'), accent: hex('#23305a'), hair: hex('#3a2410'), pants: hex('#30405a'), iris: [0.35, 0.28, 0.15] } },
    lily: { h: 0.82, hair: 'pigtails', bangs: true, freckles: true, colors: { shirt: hex('#c0c8e0'), hair: hex('#c05020'), pants: hex('#c0c8e0'), iris: [0.3, 0.45, 0.6] } },
  };
  const castKid = (name, extra) => kid(name + JSON.stringify(extra || {}), Object.assign({}, CAST[name], extra || {}, { colors: Object.assign({}, CAST[name].colors, (extra || {}).colors || {}) }));

  // ------------------------------------------------------------ scenes
  function room(sc, col, w = 8, h = 4, d = 8) {
    const m = new THREE.MeshStandardMaterial({ color: col, roughness: 0.9, side: THREE.BackSide });
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.y = h / 2; sc.add(b);
  }
  function propMesh(key) {
    const g = new THREE.Group();
    const w = PB.game && PB.game.world;
    for (const part of P.build(key, P.DEFS[key])) g.add(new THREE.Mesh(part.geo, w ? w.mat(part.mat) : new THREE.MeshStandardMaterial({ color: 0x888888 })));
    return g;
  }
  const SCENES = {
    five(sc, cam) {
      room(sc, 0x1c1628);
      const cab = propMesh('cabinetBody'); cab.position.set(0, 0, -0.9); sc.add(cab);
      const glow = new THREE.PointLight(0x80c8ff, 3, 4, 2); glow.position.set(0, 1.4, -0.4); sc.add(glow);
      const put = (k, x, z, ry, extra) => { const m = castKid(k, extra); m.position.set(x, 0, z); m.rotation.y = ry; sc.add(m); };
      put('danny', -0.5, -0.25, 0.15, { armUp: true, mouth: 'laugh' });
      put('rosie', 0.02, -0.35, 0, { mouth: 'laugh' });
      put('nell', 0.52, -0.25, -0.15, { mouth: 'laugh' });
      put('toby', -0.24, 0.3, 0.1, { eyes: 'closed', mouth: 'laugh' });
      put('sam', 0.26, 0.32, -0.05, { mouth: 'flat' });
      cam.position.set(0, 1.3, 2.25); cam.lookAt(0, 1.12, 0);
      return { flash: 1 };
    },
    fort(sc, cam) {
      room(sc, 0x3a2418, 4, 2.4, 6);
      const put = (k, x, z, ry, extra) => { const m = castKid(k, extra); m.position.set(x, 0, z); m.rotation.y = ry; sc.add(m); };
      put('danny', -0.35, -0.1, 0.2, { mouth: 'laugh', h: 1.0 });
      put('sam', 0.08, 0.05, 0, { mouth: 'smile', h: 0.86 });
      put('toby', 0.45, 0.1, -0.2, { mouth: 'laugh', h: 0.82 });
      // one flashlight from below, faces lit from under the chin
      const fl = new THREE.SpotLight(0xffd8a0, 18, 5, 0.7, 0.6, 1.5); fl.position.set(0.05, 0.5, 0.9); fl.target.position.set(0, 1.4, 0); sc.add(fl, fl.target);
      cam.position.set(0, 1.1, 2.1); cam.lookAt(0, 1.05, 0);
      return { flash: 0.15 };
    },
    booth(sc, cam, id) {
      room(sc, 0x9a9a9a, 2, 2.4, 2);
      const n = parseInt(String(id).replace(/\D/g, ''), 10) || 1;
      const put = (k, x, z, ry, extra) => { const m = castKid(k, extra); m.position.set(x, -0.35, z); m.rotation.y = ry; sc.add(m); };
      if (n === 1) { put('danny', -0.13, 0, 0.2, { mouth: 'flat' }); put('rosie', 0.16, 0.02, -0.15, { mouth: 'laugh' }); }
      if (n === 2) { put('nell', -0.12, 0, 0.15, { mouth: 'laugh', hat: 'santa' }); put('toby', 0.14, 0.05, -0.15, { mouth: 'laugh' }); }
      if (n === 3) { put('sam', -0.09, 0.02, 0.25, { eyes: 'closed', mouth: 'laugh' }); put('toby', 0.09, 0.02, -0.25, { eyes: 'closed', mouth: 'laugh' }); }
      if (n >= 4) { put('danny', -0.28, -0.1, 0.2, { mouth: 'laugh' }); put('rosie', 0.0, -0.14, 0, { mouth: 'laugh' }); put('nell', 0.27, -0.1, -0.2, { mouth: 'laugh' }); put('toby', -0.14, 0.15, 0.1, { mouth: 'laugh' }); put('sam', 0.14, 0.17, -0.1, { mouth: 'laugh' }); }
      cam.position.set(0, 1.12, n >= 4 ? 1.35 : 0.95); cam.lookAt(0, 1.06, 0);
      return { flash: 0.9, mono: true };
    },
    chompy(sc, cam) {
      room(sc, 0x9ab89a, 5, 3, 5);
      const bed = propMesh('hospitalBed'); bed.position.set(0.35, 0, -0.2); bed.rotation.y = -H; sc.add(bed);
      const lily = castKid('lily', { hat: 'party', eyes: 'closed', mouth: 'laugh', hug: true }); lily.position.set(0.35, 0.42, 0.05); lily.rotation.y = -0.5; sc.add(lily);
      const ch = PB.Monsters.chompy(); ch.group.scale.setScalar(0.9); ch.group.position.set(-0.45, -0.55, 0.15); ch.group.rotation.y = 0.9; sc.add(ch.group);
      cam.position.set(-0.1, 1.45, 2.4); cam.lookAt(0, 1.0, 0);
      return { flash: 1 };
    },
  };

  // ------------------------------------------------------------ the darkroom
  const cache = new Map();
  function render(key, id, w, h) {
    const k = key + ':' + (id || '') + ':' + w;
    if (cache.has(k)) return cache.get(k);
    const renderer = PB.game && PB.game.renderer;
    const make = SCENES[key === 'frame' ? 'booth' : key];
    if (!renderer || !make) return null;
    const sc = new THREE.Scene();
    sc.background = new THREE.Color(0x101010);
    const cam = new THREE.PerspectiveCamera(key === 'booth' || key === 'frame' ? 42 : 40, w / h, 0.05, 50);
    const o = make(sc, cam, id) || {};
    sc.add(new THREE.HemisphereLight(0xb8b0a0, 0x302820, 0.35));
    // the camera's own flash: hard, frontal, falling off fast
    // (a flash is only as strong as the subject is far: keep the faces exposed, not blown out)
    if (o.flash) { const dist = cam.position.distanceTo(new THREE.Vector3(0, 1.1, 0)); const f = new THREE.PointLight(0xfff4e8, 3.2 * o.flash * dist * dist, 12, 2); f.position.copy(cam.position).add(new THREE.Vector3(0.08, 0.1, 0)); sc.add(f); }
    // render at twice the size and scale down: smoother edges and the painted faces hold up
    const W0 = w, H0 = h; w *= 2; h *= 2; cam.aspect = w / h; cam.updateProjectionMatrix();
    const rt = new THREE.WebGLRenderTarget(w, h, { samples: 4 });
    rt.texture.colorSpace = THREE.SRGBColorSpace;
    const prevT = renderer.getRenderTarget(), prevTone = renderer.toneMapping, prevClear = renderer.getClearColor(new THREE.Color()), prevA = renderer.getClearAlpha();
    const shadow = renderer.shadowMap.enabled;
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setRenderTarget(rt);
    renderer.setClearColor(0x000000, 1);
    renderer.clear();
    renderer.render(sc, cam);
    const px = new Uint8Array(w * h * 4);
    renderer.readRenderTargetPixels(rt, 0, 0, w, h, px);
    renderer.setRenderTarget(prevT); renderer.toneMapping = prevTone; renderer.setClearColor(prevClear, prevA); renderer.shadowMap.enabled = shadow;
    rt.dispose();
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d'), img = g.createImageData(w, h);
    for (let y = 0; y < h; y++) img.data.set(px.subarray((h - 1 - y) * w * 4, (h - y) * w * 4), y * w * 4);
    if (o.mono) for (let i = 0; i < img.data.length; i += 4) { const l = img.data[i] * 0.3 + img.data[i + 1] * 0.59 + img.data[i + 2] * 0.11; img.data[i] = img.data[i + 1] = img.data[i + 2] = l; }
    g.putImageData(img, 0, 0);
    const out = document.createElement('canvas'); out.width = W0; out.height = H0;
    const og = out.getContext('2d'); og.imageSmoothingQuality = 'high'; og.drawImage(c, 0, 0, W0, H0);
    cache.set(k, out);
    return out;
  }

  PB.Photos = { render, SCENES, CAST, kid: castKid };
})(typeof window !== 'undefined' ? window : globalThis);
