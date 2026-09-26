/* The rest of the creatures, sculpted as distance fields like the Eater and the ghosts (see monsters.js).
   Every builder returns the same handles the AI code animates (head, arms, legs, limbs...), so the
   behaviour code only swaps its old block figures for these.
   - The Counter: three and a half meters of starved body under skin like wet tar, arms hanging past its
     knees, a long skull with empty sockets and a jaw that hangs open.
   - Crawlers: pale, hairless, six-limbed things the size of a dog, ribs and spine showing, a cluster of
     wet black eyes and a lipless mouth.
   - The Hall Monitor: a long grey coat and a peaked cap, the yellow sash, and under the cap a face with no
     eyes, the mouth sewn shut. It holds the flashlight up.
   - Mannequins: store dummies, scuffed and dirty, ball joints, a face that is almost a face.
   - The Neighbor: a tall man in a dressing gown, gaunt, eyes too wide and too white.
   - Chompy: the mascot costume, matted and stained, its grin gone dark inside.
   - Grinners: a smile and two eyes in the dark. Teeth with nothing around them but wet gum. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U, T = PB.Tex;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ shared skin
  // A tiling skin texture: base color, mottling, veins, spots and pores
  function skinTex(key, o) {
    return T.canvas('skin:' + key, 512, 512, (g, w, h) => {
      const r = U.rng(U.hashStr(key));
      g.fillStyle = o.base; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 160; k++) { const x = r() * w, y = r() * h, rr = r.range(15, 90); const grd = g.createRadialGradient(x, y, 0, x, y, rr); const c = r.pick(o.mottle); grd.addColorStop(0, `rgba(${c},${o.mottleA || 0.25})`); grd.addColorStop(1, `rgba(${c},0)`); g.fillStyle = grd; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
      if (o.veins) {
        const vein = (x, y, a, len, wdt, depth) => {
          g.strokeStyle = `rgba(${o.veins},${0.2 + wdt * 0.1})`; g.lineWidth = wdt; g.beginPath(); g.moveTo(x, y);
          for (let s = 0; s < len; s++) { a += r.range(-0.4, 0.4); x += Math.cos(a) * 5; y += Math.sin(a) * 5; g.lineTo(x, y); if (depth < 3 && r() < 0.07) { g.stroke(); vein(x, y, a + r.range(-1.2, 1.2), len * 0.6 | 0, wdt * 0.6, depth + 1); g.beginPath(); g.moveTo(x, y); } }
          g.stroke();
        };
        for (let k = 0; k < (o.veinCount || 14); k++) vein(r() * w, r() * h, r() * 6.28, 20 + r() * 30 | 0, r.range(1, 2.6), 0);
      }
      if (o.spots) for (let k = 0; k < o.spots; k++) { const x = r() * w, y = r() * h, rr = r.range(2, 7); g.fillStyle = `rgba(${o.spotColor || '70,30,20'},${r.range(0.3, 0.7)})`; g.beginPath(); g.arc(x, y, rr, 0, 6.28); g.fill(); }
      for (let k = 0; k < (o.pores || 14000); k++) { g.fillStyle = r() < 0.7 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'; g.fillRect(r() * w, r() * h, 1.3, 1.3); }
    }, { repeat: true });
  }
  function bumpTex(key, o = {}) {
    return T.canvas('bump:' + key, 256, 256, (g, w, h) => {
      const r = U.rng(U.hashStr(key) + 1);
      g.fillStyle = '#808080'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < (o.n || 3000); k++) { const v = 90 + r() * 80 | 0; g.fillStyle = `rgba(${v},${v},${v},${o.a || 0.3})`; g.beginPath(); g.arc(r() * w, r() * h, r.range(0.6, o.size || 2.5), 0, 6.28); g.fill(); }
      if (o.wrinkles) { g.strokeStyle = 'rgba(50,50,50,0.4)'; for (let k = 0; k < o.wrinkles; k++) { let x = r() * w, y = r() * h; g.lineWidth = r.range(0.8, 2); g.beginPath(); g.moveTo(x, y); for (let s = 0; s < 6; s++) { x += r.range(-12, 12); y += r.range(-3, 3); g.lineTo(x, y); } g.stroke(); } }
    }, { repeat: true });
  }
  // Material with box-projected UVs from the mesher (meters) scaled to the texture
  function skinMat(map, bump, o = {}) {
    const m = new THREE[o.physical ? 'MeshPhysicalMaterial' : 'MeshStandardMaterial'](Object.assign({ map, bumpMap: bump, bumpScale: o.bumpScale != null ? o.bumpScale : 1.5, roughness: 0.5, metalness: 0, vertexColors: !!o.vc }, o.params || {}));
    if (map) { map.repeat.set(o.rep || 3, o.rep || 3); }
    if (bump) bump.repeat.set(o.bumpRep || 6, o.bumpRep || 6);
    return m;
  }
  // SDF-based ambient occlusion baked into vertex colors: darker in creases and hollows
  const aoColor = (fn, base, k = 1, tint = [0.5, 0.35, 0.3]) => (p, n) => {
    let occ = 0;
    for (const s of [0.015, 0.035, 0.07]) { const q = [p[0] + n[0] * s, p[1] + n[1] * s, p[2] + n[2] * s]; occ += Math.max(0, s - fn(q)) / s; }
    const a = Math.max(0.25, 1 - occ / 3 * 1.4 * k);
    return [base[0] * (a + (1 - a) * tint[0] * 0.3), base[1] * (a + (1 - a) * tint[1] * 0.3), base[2] * (a + (1 - a) * tint[2] * 0.3)];
  };
  const lerp = (a, b, t) => a + (b - a) * t;

  // ------------------------------------------------------------ THE COUNTER
  function counterBody(p) {
    const x = Math.abs(p[0]), q = [x, p[1], p[2]];
    // legs: thigh, knobbly knee, shin, long feet
    let d = S.capsule(q, [0.1, 1.58, 0], [0.12, 0.86, 0.03], 0.075, 0.048);
    d = S.smin(d, S.sphere(q, [0.12, 0.86, 0.045], 0.052), 0.03);
    d = S.smin(d, S.capsule(q, [0.12, 0.86, 0.03], [0.125, 0.1, -0.02], 0.045, 0.034), 0.03);
    d = S.smin(d, S.ellipsoid(q, [0.125, 0.045, 0.07], [0.048, 0.035, 0.15]), 0.04);
    for (let k = 0; k < 4; k++) d = S.smin(d, S.capsule(q, [0.1 + k * 0.016, 0.03, 0.18], [0.1 + k * 0.02, 0.012, 0.28 + (k === 1 ? 0.02 : 0)], 0.012, 0.008), 0.01);
    // pelvis and hip bones
    d = S.smin(d, S.ellipsoid(p, [0, 1.62, 0], [0.18, 0.12, 0.1]), 0.06);
    d = S.smin(d, S.sphere(q, [0.15, 1.7, 0.05], 0.035), 0.03);
    // spine and a starved torso: ribcage, a belly sunk in under it
    d = S.smin(d, S.chain(p, [[0, 1.62, -0.02], [0, 2.0, -0.06], [0, 2.4, -0.02], [0, 2.7, 0.07]], [0.1, 0.08, 0.12, 0.09], 0.08), 0.08);
    let rib = S.ellipsoid(p, [0, 2.42, 0.04], [0.19, 0.28, 0.13]);
    if (p[1] > 2.15 && p[1] < 2.62) rib += Math.max(0, Math.sin(p[1] * 58)) * 0.01 * (p[2] > -0.05 ? 1 : 0.4);
    d = S.smin(d, rib, 0.06);
    d = S.smax(d, -S.ellipsoid(p, [0, 2.02, 0.11], [0.11, 0.15, 0.05]), 0.05);
    // vertebrae down the back
    for (let k = 0; k < 14; k++) { const y = 1.75 + k * 0.07; d = S.smin(d, S.sphere(p, [0, y, -0.1 + Math.max(0, y - 2.3) * 0.35], 0.022), 0.02); }
    // shoulders, collarbones, neck
    d = S.smin(d, S.capsule(q, [0, 2.71, 0.08], [0.27, 2.7, 0.05], 0.055, 0.06), 0.05);
    d = S.smin(d, S.capsule(q, [0.02, 2.74, 0.14], [0.22, 2.73, 0.1], 0.018, 0.015), 0.02);
    d = S.smin(d, S.capsule(p, [0, 2.7, 0.08], [0.03, 2.98, 0.17], 0.05, 0.04), 0.04);
    // arms hanging past the knees
    d = S.smin(d, S.capsule(q, [0.27, 2.7, 0.05], [0.31, 1.95, 0.04], 0.05, 0.036), 0.04);
    d = S.smin(d, S.sphere(q, [0.31, 1.95, 0.02], 0.04), 0.02);
    d = S.smin(d, S.capsule(q, [0.31, 1.95, 0.02], [0.35, 1.0, 0.07], 0.035, 0.026), 0.03);
    // skin: slack folds and lumps
    d += S.fbm(p[0] * 9, p[1] * 5, p[2] * 9, 3) * 0.012;
    return d;
  }
  function counterHead(p) {
    // origin at the top of the neck
    let d = S.ellipsoid(p, [0, 0.18, 0.0], [0.11, 0.17, 0.125]);
    d = S.smin(d, S.ellipsoid(p, [0, 0.29, -0.03], [0.1, 0.1, 0.12]), 0.05);
    // cheekbones and brow
    d = S.smin(d, S.capsule(p, [-0.07, 0.15, 0.08], [0.07, 0.15, 0.08], 0.022), 0.03);
    d = S.smin(d, S.capsule(p, [-0.06, 0.225, 0.1], [0.06, 0.225, 0.1], 0.02), 0.03);
    // empty eye sockets
    for (const sx of [-0.042, 0.042]) d = S.smax(d, -S.sphere(p, [sx, 0.19, 0.12], 0.034), 0.012);
    // the jaw hangs open, too far
    let jaw = S.ellipsoid(p, [0, 0.02, 0.07], [0.07, 0.035, 0.07]);
    jaw = S.smin(jaw, S.capsule(p, [0, 0.02, 0.0], [0, 0.1, -0.03], 0.05), 0.04);
    d = S.smin(d, jaw, 0.03);
    d = S.smax(d, -S.ellipsoid(p, [0, 0.075, 0.11], [0.045, 0.05, 0.06]), 0.015);
    d += S.fbm(p[0] * 20, p[1] * 20, p[2] * 20, 2) * 0.006;
    return d;
  }
  function counterHand(p) {
    // origin at the wrist, fingers hang down (-y), palm faces the thigh (-x)
    let d = S.ellipsoid(p, [0, -0.07, 0.005], [0.022, 0.075, 0.042]);
    for (let f = 0; f < 4; f++) {
      const z = -0.03 + f * 0.02, L = [0.3, 0.34, 0.33, 0.27][f];
      d = S.smin(d, S.chain(p, [[0, -0.13, z], [0.005, -0.13 - L * 0.4, z + 0.004], [0.012, -0.13 - L * 0.72, z + 0.006], [0.026, -0.13 - L, z + 0.004]], [0.009, 0.0075, 0.006, 0.004]), 0.008);
      for (const t of [0.4, 0.72]) d = S.smin(d, S.sphere(p, [0.004 + t * 0.01, -0.13 - L * t, z + 0.004], 0.0095), 0.004);
    }
    d = S.smin(d, S.chain(p, [[0, -0.05, 0.04], [0.02, -0.12, 0.06], [0.03, -0.2, 0.06]], [0.01, 0.008, 0.005]), 0.01);
    return d;
  }
  function counter() {
    const skin = skinTex('tar', { base: '#0b0a0a', mottle: ['40,35,35', '5,5,5', '30,20,25'], mottleA: 0.4, pores: 9000 });
    const mat = skinMat(skin, bumpTex('tar', { n: 4000, wrinkles: 80 }), { physical: true, params: { roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.18, color: 0xffffff }, bumpScale: 2, vc: true });
    const g = new THREE.Group();
    const col = fn => aoColor(fn, [1, 1, 1], 1.2);
    const body = new THREE.Mesh(S.mesh('counter:body', counterBody, [[-0.45, -0.02, -0.25], [0.45, 3.05, 0.35]], 0.016, { color: col(counterBody), smooth: 2 }), mat);
    body.castShadow = true; g.add(body);
    const head = new THREE.Mesh(S.mesh('counter:head', counterHead, [[-0.14, -0.05, -0.18], [0.14, 0.42, 0.2]], 0.008, { color: col(counterHead), smooth: 2 }), mat);
    head.position.set(0.03, 2.97, 0.17); head.rotation.x = 0.32; head.castShadow = true; g.add(head);
    const arms = [];
    const hg = S.mesh('counter:hand', counterHand, [[-0.05, -0.5, -0.07], [0.07, 0.02, 0.09]], 0.006, { color: col(counterHand), smooth: 1 });
    for (const sx of [-1, 1]) {
      const hand = new THREE.Group(); hand.position.set(sx * 0.35, 1.0, 0.07); g.add(hand);
      const m = new THREE.Mesh(hg, mat); m.scale.x = sx; m.castShadow = true; hand.add(m);
      if (sx < 0) { m.material = mat; hand.userData.flip = true; }
      arms.push({ hand });
    }
    // mirrored hand: flip the winding so it is not inside out
    const flipped = hg.clone(); { const idx = flipped.index.array; for (let i = 0; i < idx.length; i += 3) { const t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; } const n = flipped.attributes.normal; for (let i = 0; i < n.count; i++) n.setX(i, -n.getX(i)); }
    arms[0].hand.children[0].geometry = flipped;
    return { group: g, mat, head, arms };
  }

  // ------------------------------------------------------------ CRAWLERS
  function crawlerBody(p) {
    const x = Math.abs(p[0]), q = [x, p[1], p[2]];
    // a long low spine, ribcage slung under it, a swollen back end
    let d = S.chain(p, [[0, 0.34, -0.42], [0, 0.37, -0.15], [0, 0.36, 0.12], [0, 0.34, 0.32]], [0.1, 0.13, 0.12, 0.08], 0.08);
    let rib = S.ellipsoid(p, [0, 0.32, 0.08], [0.14, 0.12, 0.2]);
    if (p[2] > -0.08 && p[2] < 0.25) rib += Math.max(0, Math.sin(p[2] * 62)) * 0.009 * (p[1] < 0.36 ? 1 : 0.3);
    d = S.smin(d, rib, 0.05);
    d = S.smin(d, S.ellipsoid(p, [0, 0.33, -0.36], [0.12, 0.11, 0.16]), 0.06);
    for (let k = 0; k < 13; k++) { const z = -0.42 + k * 0.06; d = S.smin(d, S.sphere(p, [0, 0.47 + Math.sin(k * 0.5) * 0.01 - Math.abs(z) * 0.08, z], 0.02), 0.018); }
    // hip and shoulder sockets
    for (const z of [-0.22, 0, 0.22]) d = S.smin(d, S.sphere(q, [0.12, 0.35, z], 0.04), 0.04);
    // neck and head: a long hairless skull, lipless mouth
    d = S.smin(d, S.capsule(p, [0, 0.35, 0.3], [0, 0.37, 0.42], 0.06, 0.07), 0.05);
    let head = S.ellipsoid(p, [0, 0.38, 0.5], [0.09, 0.085, 0.14]);
    head = S.smin(head, S.ellipsoid(p, [0, 0.33, 0.55], [0.07, 0.05, 0.1]), 0.04);
    head = S.smax(head, -S.box(p, [0, 0.335, 0.63], [0.052, 0.016, 0.07], 0.006), 0.008);
    for (let k = 0; k < 6; k++) head = S.smax(head, -S.sphere(p, [(k % 3 - 1) * 0.034, 0.41 + Math.floor(k / 3) * 0.035, 0.6 - Math.abs(k % 3 - 1) * 0.012], 0.02), 0.006);
    d = S.smin(d, head, 0.04);
    d += S.fbm(p[0] * 14, p[1] * 14, p[2] * 14, 2) * 0.006;
    return d;
  }
  // One leg segment along +x from the joint (upper: out and up; lower: down to a hooked point)
  const crawlerUpper = p => S.smin(S.capsule(p, [0, 0, 0], [0.28, 0.14, 0], 0.03, 0.02), S.sphere(p, [0.28, 0.14, 0], 0.026), 0.015) + S.fbm(p[0] * 20, p[1] * 20, p[2] * 20, 2) * 0.004;
  const crawlerLower = p => {
    let d = S.chain(p, [[0, 0, 0], [0.05, -0.2, 0], [0.08, -0.4, 0.01], [0.07, -0.47, 0.04]], [0.02, 0.016, 0.01, 0.004], 0.01);
    for (let f = -1; f <= 1; f++) d = S.smin(d, S.capsule(p, [0.08, -0.44, 0.02], [0.08 + f * 0.025, -0.475, 0.07], 0.006, 0.003), 0.006);
    return d;
  };
  function crawler() {
    const skin = skinTex('crawler', { base: '#c8bcaa', mottle: ['150,120,110', '200,190,170', '120,100,110'], veins: '80,40,70', veinCount: 22, spots: 30, spotColor: '110,70,60' });
    const mat = skinMat(skin, bumpTex('crawler', { n: 3000, wrinkles: 60 }), { physical: true, params: { roughness: 0.42, clearcoat: 0.4, clearcoatRoughness: 0.4, sheen: 0.4, sheenColor: new THREE.Color(0.8, 0.5, 0.45), sheenRoughness: 0.6 }, vc: true, rep: 5 });
    const g = new THREE.Group();
    const body = new THREE.Mesh(S.mesh('crawler:body', crawlerBody, [[-0.25, 0.15, -0.62], [0.25, 0.56, 0.7]], 0.011, { color: aoColor(crawlerBody, [1, 1, 1], 1.2), smooth: 2 }), mat);
    body.castShadow = true; g.add(body);
    // the eyes: six wet black beads in the sockets
    const eyeM = new THREE.MeshPhysicalMaterial({ color: 0x020202, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.02, emissive: 0x100804, emissiveIntensity: 0.6 });
    for (let k = 0; k < 6; k++) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.016, 10, 8), eyeM); e.position.set((k % 3 - 1) * 0.034, 0.41 + Math.floor(k / 3) * 0.035, 0.595 - Math.abs(k % 3 - 1) * 0.012); g.add(e); }
    const upG = S.mesh('crawler:upper', crawlerUpper, [[-0.04, -0.04, -0.04], [0.32, 0.18, 0.04]], 0.006, { color: aoColor(crawlerUpper, [1, 1, 1], 1), smooth: 1 });
    const loG = S.mesh('crawler:lower', crawlerLower, [[-0.03, -0.5, -0.03], [0.12, 0.03, 0.09]], 0.005, { color: (pp, n) => { const a = aoColor(crawlerLower, [1, 1, 1], 1)(pp, n); return pp[1] < -0.43 ? [a[0] * 0.35, a[1] * 0.3, a[2] * 0.28] : a; }, smooth: 1 });
    // a lipless mouth: two rows of small, crowded teeth along the slit
    const tg = PB.Monsters.toothGeos ? PB.Monsters.toothGeos() : null;
    if (tg) {
      const teethM = new THREE.MeshStandardMaterial({ color: 0xe0d6bc, roughness: 0.3 });
      const tr = U.rng(71);
      const teeth = [];
      for (const up of [true, false]) for (let k = -3; k <= 3; k++) {
        if (tr() < 0.15) continue;
        const t = new THREE.Mesh(tg[tr() < 0.4 ? 1 : 0], teethM);
        t.scale.set(0.16, 0.2 * tr.range(0.8, 1.3), 0.16);
        t.position.set(k * 0.013, 0.335 + (up ? 0.014 : -0.014), 0.655 - Math.abs(k) * 0.004);
        t.rotation.set(up ? PI : 0, 0, (tr() - 0.5) * 0.3);
        teeth.push(t);
      }
      g.add(new THREE.Mesh(PB.Monsters.mergeMeshes(teeth), teethM));
    }
    const mirror = geo => { const f = geo.clone(); const pa = f.attributes.position, n = f.attributes.normal; for (let i = 0; i < pa.count; i++) { pa.setX(i, -pa.getX(i)); n.setX(i, -n.getX(i)); } const idx = f.index.array; for (let i = 0; i < idx.length; i += 3) { const t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; } return f; };
    const geos = { 1: [upG, loG], [-1]: [mirror(upG), mirror(loG)] };
    const legs = [];
    for (let k = 0; k < 6; k++) {
      const side = k % 2 ? 1 : -1, z = -0.22 + Math.floor(k / 2) * 0.22;
      const hip = new THREE.Group(); hip.position.set(side * 0.13, 0.35, z); g.add(hip);
      const up = new THREE.Mesh(geos[side][0], mat); up.castShadow = true; hip.add(up);
      const knee = new THREE.Group(); knee.position.set(side * 0.28, 0.14, 0); hip.add(knee);
      const lo = new THREE.Mesh(geos[side][1], mat); lo.castShadow = true; knee.add(lo);
      legs.push({ hip, knee, side, ph: k * 1.05 });
    }
    return { group: g, mats: [mat], legs };
  }

  // ------------------------------------------------------------ THE HALL MONITOR
  function monitorBody(p) {
    const x = Math.abs(p[0]), q = [x, p[1], p[2]], y = p[1];
    // shoes and trouser legs under the coat
    let d = S.ellipsoid(q, [0.11, 0.05, 0.05], [0.055, 0.045, 0.13]);
    d = S.smin(d, S.capsule(q, [0.1, 0.08, 0], [0.1, 0.5, 0], 0.055, 0.06), 0.03);
    // the long coat: a cone from the shoulders that flares at the hem, with deep vertical folds
    const t = Math.min(1, Math.max(0, (1.72 - y) / 1.5));
    const ang = Math.atan2(p[2], p[0]);
    const folds = (Math.sin(ang * 7 + t * 1.5) * 0.018 + Math.sin(ang * 3 - 1) * 0.01) * t * t;
    const rad = 0.2 + t * 0.12 + folds;
    let coat = Math.hypot(p[0], p[2] * 1.35) - rad;
    coat = S.smax(coat, 0.28 - y, 0.02);
    coat = S.smax(coat, y - 1.74, 0.06);
    coat = S.smin(coat, S.ellipsoid(p, [0, 1.62, 0], [0.26, 0.16, 0.15]), 0.08);
    // the split up the back and the front overlap
    coat = S.smax(coat, -S.box(p, [0, 0.55, -0.26], [0.006, 0.28, 0.06], 0.004), 0.004);
    // belt and collar turned up around the neck
    coat = S.smin(coat, S.torus([p[0], (y - 1.12) * 1.0, p[2] * 1.35], [0, 0, 0], 0.235, 0.018), 0.01);
    coat = S.smin(coat, S.smax(Math.abs(Math.hypot(p[0], p[2] * 1.2) - 0.1) - 0.018, Math.abs(y - 1.83) - 0.08, 0.02), 0.03);
    d = S.smin(d, coat, 0.03);
    // shoulders and the hanging left arm in its sleeve
    d = S.smin(d, S.capsule(p, [-0.24, 1.68, 0], [-0.28, 1.15, 0.02], 0.065, 0.06), 0.04);
    d = S.smin(d, S.capsule(p, [0.24, 1.68, 0], [0.26, 1.6, 0.02], 0.065), 0.04);
    return d;
  }
  function monitorHead(p) {
    // origin at the base of the neck; no eyes, no nose, a mouth sewn shut
    let d = S.capsule(p, [0, 0, 0], [0, 0.14, 0.01], 0.05, 0.045);
    d = S.smin(d, S.ellipsoid(p, [0, 0.25, 0.02], [0.11, 0.15, 0.125]), 0.05);
    d = S.smin(d, S.ellipsoid(p, [0, 0.19, 0.08], [0.07, 0.06, 0.06]), 0.04);
    d = S.smin(d, S.capsule(p, [-0.05, 0.28, 0.1], [0.05, 0.28, 0.1], 0.018), 0.035);
    d = S.smax(d, -S.box(p, [0, 0.17, 0.14], [0.035, 0.002, 0.02], 0.001), 0.004);
    // peaked cap
    let cap = S.smax(S.ellipsoid(p, [0, 0.36, 0.0], [0.135, 0.075, 0.145]), 0.33 - p[1], 0.01);
    cap = S.smin(cap, S.smax(S.ellipsoid(p, [0, 0.335, 0.13], [0.1, 0.012, 0.08]), -p[2] + 0.05, 0.005), 0.01);
    return S.smin(d, cap, 0.01);
  }
  function monitorArm(p) {
    // raised right arm (origin at the shoulder), forearm reaching forward with the flashlight
    let d = S.capsule(p, [0, 0, 0], [0.02, -0.18, 0.2], 0.062, 0.056);
    d = S.smin(d, S.capsule(p, [0.02, -0.18, 0.2], [0, -0.05, 0.5], 0.055, 0.048), 0.03);
    // pale hand around the grip
    d = S.smin(d, S.ellipsoid(p, [0, -0.03, 0.56], [0.045, 0.05, 0.06]), 0.02);
    return d;
  }
  function monitor() {
    const cloth = skinTex('coat', { base: '#4a4c50', mottle: ['60,62,66', '40,40,44', '70,66,60'], mottleA: 0.3, pores: 30000 });
    const coat = skinMat(cloth, bumpTex('coat', { n: 6000, size: 1.2, a: 0.25 }), { params: { roughness: 0.92 }, vc: true, rep: 4, bumpRep: 10 });
    const skin = skinMat(skinTex('monitorSkin', { base: '#d0c4b4', mottle: ['190,160,150', '220,210,190'], veins: '110,70,90', veinCount: 8 }), bumpTex('mSkin', { wrinkles: 40 }), { params: { roughness: 0.55 }, vc: true });
    const g = new THREE.Group();
    const monitorShape = p => {
      // the yellow sash worn across the chest, sitting on the coat
      return monitorBody(p);
    };
    const body = new THREE.Mesh(S.mesh('monitor:body', monitorShape, [[-0.4, -0.02, -0.4], [0.4, 1.95, 0.4]], 0.014, { color: (pp, n) => {
      const base = aoColor(monitorBody, [1, 1, 1], 1.1)(pp, n);
      // sash band: a plane from the left shoulder to the right hip, painted yellow on the coat
      const s = Math.abs((pp[0] * 0.62 + (pp[1] - 1.4) * 0.78)) < 0.045 && pp[1] > 1.05 && pp[1] < 1.75;
      const shoe = pp[1] < 0.1;
      return s ? [2.4 * base[0], 1.8 * base[1], 0.35 * base[2]] : shoe ? [0.15, 0.13, 0.12] : base;
    }, smooth: 2 }), coat);
    body.castShadow = true; g.add(body);
    const head = new THREE.Mesh(S.mesh('monitor:head', monitorHead, [[-0.16, -0.03, -0.17], [0.16, 0.46, 0.25]], 0.007, { color: (pp, n) => { const a = aoColor(monitorHead, [1, 1, 1], 1.3)(pp, n); if (pp[1] > 0.315) return [0.22 * a[0], 0.23 * a[1], 0.26 * a[2]]; if (Math.abs(pp[1] - 0.17) < 0.012 && pp[2] > 0.12 && Math.abs(Math.sin(pp[0] * 190)) > 0.6) return [0.1, 0.06, 0.06]; return a; }, smooth: 2 }), skin);
    head.position.set(0, 1.8, 0.02); head.castShadow = true; g.add(head);
    const arm = new THREE.Group(); arm.position.set(0.26, 1.62, 0.05); g.add(arm);
    const armM = new THREE.Mesh(S.mesh('monitor:arm', monitorArm, [[-0.1, -0.28, -0.1], [0.12, 0.1, 0.64]], 0.01, { color: (pp, n) => pp[2] > 0.5 ? [0.95, 0.85, 0.8] : aoColor(monitorArm, [0.35, 0.36, 0.38], 1)(pp, n), smooth: 2 }), coat);
    arm.add(armM);
    return { group: g, mats: [coat, skin], arm, head };
  }

  // ------------------------------------------------------------ MANNEQUINS
  const MQ = {
    torso: p => {
      let d = S.ellipsoid(p, [0, 0.2, 0], [0.17, 0.2, 0.11]);            // chest
      d = S.smin(d, S.ellipsoid(p, [0, -0.08, 0], [0.13, 0.14, 0.09]), 0.1); // waist
      d = S.smin(d, S.ellipsoid(p, [0, -0.28, 0], [0.17, 0.12, 0.11]), 0.08); // hips
      d = S.smin(d, S.capsule(p, [0, 0.36, 0], [0, 0.46, 0.01], 0.045), 0.04); // neck
      // shoulder sockets and hip sockets are cut in: ball joints show
      for (const sx of [-1, 1]) { d = S.smax(d, -S.sphere(p, [sx * 0.2, 0.28, 0], 0.052), 0.01); d = S.smax(d, -S.sphere(p, [sx * 0.09, -0.38, 0], 0.062), 0.01); }
      // the waist seam where the halves plug together
      d = S.smax(d, -S.torus([p[0], p[1] + 0.05, p[2] * 1.3], [0, 0, 0], 0.13, 0.005), 0.003);
      return d;
    },
    head: p => {
      // almost a face: a brow, the ridge of a nose, a chin, no eyes, no mouth
      let d = S.ellipsoid(p, [0, 0.12, 0], [0.09, 0.12, 0.105]);
      d = S.smin(d, S.ellipsoid(p, [0, 0.05, 0.035], [0.065, 0.07, 0.07]), 0.05);
      d = S.smin(d, S.capsule(p, [0, 0.13, 0.095], [0, 0.08, 0.11], 0.012, 0.016), 0.02);
      d = S.smin(d, S.capsule(p, [-0.04, 0.155, 0.085], [0.04, 0.155, 0.085], 0.012), 0.025);
      for (const sx of [-1, 1]) d = S.smin(d, S.ellipsoid(p, [sx * 0.088, 0.1, -0.01], [0.012, 0.03, 0.02]), 0.015);
      return d;
    },
    upperArm: p => S.smin(S.sphere(p, [0, 0, 0], 0.05), S.capsule(p, [0, -0.02, 0], [0, -0.34, 0], 0.045, 0.036), 0.03),
    foreArm: p => {
      let d = S.smin(S.sphere(p, [0, 0, 0], 0.038), S.capsule(p, [0, -0.02, 0], [0, -0.28, 0], 0.036, 0.026), 0.02);
      // mannequin hand: fingers together, thumb apart
      d = S.smin(d, S.box(p, [0, -0.36, 0.005], [0.018, 0.07, 0.042], 0.016), 0.02);
      d = S.smin(d, S.capsule(p, [0, -0.3, 0.04], [0.01, -0.36, 0.06], 0.011, 0.009), 0.012);
      return d;
    },
    thigh: p => S.smin(S.sphere(p, [0, 0, 0], 0.062), S.capsule(p, [0, -0.02, 0], [0, -0.46, 0], 0.07, 0.048), 0.04),
    shin: p => {
      let d = S.smin(S.sphere(p, [0, 0, 0], 0.048), S.capsule(p, [0, -0.02, 0], [0, -0.4, 0], 0.046, 0.032), 0.03);
      d = S.smin(d, S.ellipsoid(p, [0, -0.44, 0.05], [0.04, 0.035, 0.11]), 0.03);
      return d;
    },
  };
  function mannequin() {
    const plastic = T.canvas('mq:plastic', 512, 512, (g, w, h) => {
      const r = U.rng(41);
      g.fillStyle = '#e6e0d4'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 90; k++) { const x = r() * w, y = r() * h, rr = r.range(10, 60); const gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, `rgba(${r() < 0.6 ? '120,105,85' : '80,70,60'},${r.range(0.12, 0.35)})`); gr.addColorStop(1, 'rgba(120,105,85,0)'); g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
      g.strokeStyle = 'rgba(60,50,40,0.5)'; for (let k = 0; k < 60; k++) { let x = r() * w, y = r() * h; g.lineWidth = r.range(0.5, 1.5); g.beginPath(); g.moveTo(x, y); x += r.range(-30, 30); y += r.range(-30, 30); g.lineTo(x, y); g.stroke(); }
      for (let k = 0; k < 25; k++) { g.fillStyle = 'rgba(150,140,125,0.8)'; g.beginPath(); g.ellipse(r() * w, r() * h, r.range(2, 6), r.range(1, 3), r() * 3, 0, 6.28); g.fill(); }
    }, { repeat: true });
    const mat = new THREE.MeshPhysicalMaterial({ map: plastic, roughness: 0.3, clearcoat: 0.5, clearcoatRoughness: 0.35, vertexColors: true, emissive: 0x080706 });
    plastic.repeat.set(3, 3);
    mat.userData.refl = 0.12;
    const mk = (key, fn, b, cell) => { const m = new THREE.Mesh(S.mesh('mq:' + key, fn, b, cell, { color: aoColor(fn, [1, 1, 1], 1.2), smooth: 2 }), mat); m.castShadow = true; return m; };
    const g = new THREE.Group();
    const torso = mk('torso', MQ.torso, [[-0.22, -0.45, -0.16], [0.22, 0.52, 0.16]], 0.01); torso.position.set(0, 1.28, 0); g.add(torso);
    const head = mk('head', MQ.head, [[-0.12, -0.03, -0.13], [0.12, 0.26, 0.15]], 0.007); head.position.set(0, 1.72, 0.01); g.add(head);
    const limbs = [];
    for (const sx of [-1, 1]) {
      const sh = new THREE.Group(); sh.position.set(sx * 0.2, 1.56, 0); g.add(sh);
      sh.add(mk('upperArm', MQ.upperArm, [[-0.07, -0.4, -0.07], [0.07, 0.07, 0.07]], 0.008));
      const el = new THREE.Group(); el.position.set(0, -0.36, 0); sh.add(el);
      el.add(mk('foreArm', MQ.foreArm, [[-0.06, -0.46, -0.06], [0.06, 0.05, 0.1]], 0.007));
      const hip = new THREE.Group(); hip.position.set(sx * 0.09, 0.9, 0); g.add(hip);
      hip.add(mk('thigh', MQ.thigh, [[-0.09, -0.52, -0.09], [0.09, 0.08, 0.09]], 0.009));
      const kn = new THREE.Group(); kn.position.set(0, -0.48, 0); hip.add(kn);
      kn.add(mk('shin', MQ.shin, [[-0.07, -0.5, -0.07], [0.07, 0.06, 0.18]], 0.008));
      limbs.push({ sh, el, hip, kn, sx });
    }
    return { group: g, mats: [mat], head, limbs };
  }

  // ------------------------------------------------------------ THE NEIGHBOR
  function neighborBody(p) {
    const y = p[1], q = [Math.abs(p[0]), y, p[2]];
    // slippers and bare shins
    let d = S.ellipsoid(q, [0.11, 0.04, 0.05], [0.05, 0.04, 0.13]);
    d = S.smin(d, S.capsule(q, [0.1, 0.06, 0], [0.1, 0.42, 0], 0.04, 0.05), 0.03);
    // dressing gown: long, belted, lapels crossing, sleeves hanging
    const t = Math.min(1, Math.max(0, (1.85 - y) / 1.5));
    const ang = Math.atan2(p[2], p[0]);
    const folds = (Math.sin(ang * 6 + t * 2) * 0.015 + Math.sin(ang * 11) * 0.006) * t;
    let robe = Math.hypot(p[0], p[2] * 1.3) - (0.19 + t * 0.1 + folds);
    robe = S.smax(robe, 0.35 - y, 0.02);
    robe = S.smax(robe, y - 1.86, 0.06);
    robe = S.smin(robe, S.ellipsoid(p, [0, 1.74, 0], [0.24, 0.14, 0.14]), 0.07);
    robe = S.smin(robe, S.torus([p[0], y - 1.15, p[2] * 1.3], [0, 0, 0], 0.215, 0.016), 0.01);
    // lapels: a V opening showing the chest
    robe = S.smax(robe, -S.smax(p[2] - 0.08, S.smax(Math.abs(p[0]) - (1.9 - y) * 0.35, 1.45 - y, 0.01), 0.01), 0.01);
    d = S.smin(d, robe, 0.03);
    // chest in the opening, gaunt
    d = S.smin(d, S.ellipsoid(p, [0, 1.62, 0.03], [0.15, 0.2, 0.1]), 0.03);
    // arms hanging in wide sleeves, hands too long
    for (const sx of [-1, 1]) {
      d = S.smin(d, S.capsule(p, [sx * 0.24, 1.78, 0], [sx * 0.29, 1.05, 0.05], 0.07, 0.085), 0.05);
      let hand = S.ellipsoid(p, [sx * 0.3, 0.9, 0.07], [0.022, 0.07, 0.04]);
      for (let f = 0; f < 4; f++) hand = S.smin(hand, S.capsule(p, [sx * 0.3, 0.86, 0.045 + f * 0.017], [sx * 0.31, 0.68 + (f === 1 ? -0.02 : 0), 0.05 + f * 0.016], 0.008, 0.006), 0.008);
      d = S.smin(d, hand, 0.02);
    }
    d = S.smin(d, S.capsule(p, [0, 1.86, 0.02], [0, 2.02, 0.06], 0.05, 0.045), 0.04);
    return d;
  }
  function neighborHead(p) {
    // gaunt: sunken cheeks, heavy brow, sockets too big for the eyes in them
    let d = S.ellipsoid(p, [0, 0.13, 0], [0.105, 0.145, 0.12]);
    d = S.smin(d, S.ellipsoid(p, [0, 0.02, 0.05], [0.07, 0.06, 0.07]), 0.05);
    d = S.smax(d, -S.sphere([Math.abs(p[0]), p[1], p[2]], [0.09, 0.06, 0.08], 0.035), 0.03);
    d = S.smin(d, S.capsule(p, [-0.055, 0.17, 0.1], [0.055, 0.17, 0.1], 0.02), 0.03);
    d = S.smin(d, S.capsule(p, [0, 0.14, 0.115], [0, 0.08, 0.13], 0.012, 0.018), 0.02);
    for (const sx of [-1, 1]) d = S.smax(d, -S.sphere(p, [sx * 0.043, 0.125, 0.1], 0.032), 0.008);
    d = S.smax(d, -S.box(p, [0, 0.035, 0.115], [0.035, 0.004, 0.03], 0.003), 0.006);
    for (const sx of [-1, 1]) d = S.smin(d, S.ellipsoid(p, [sx * 0.105, 0.12, -0.005], [0.012, 0.035, 0.022]), 0.012);
    d += S.fbm(p[0] * 30, p[1] * 30, p[2] * 30, 2) * 0.003;
    return d;
  }
  function neighbor() {
    const robeTex = T.canvas('robe', 512, 512, (g, w, h) => {
      const r = U.rng(51);
      g.fillStyle = '#4a2c2c'; g.fillRect(0, 0, w, h);
      for (let x = 0; x < w; x += 3) { g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,220,200'},${r.range(0.02, 0.07)})`; g.fillRect(x, 0, 2, h); }
      for (let k = 0; k < 50; k++) { const x = r() * w, y = r() * h, rr = r.range(10, 50); const gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, 'rgba(30,20,10,0.35)'); gr.addColorStop(1, 'rgba(30,20,10,0)'); g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
    }, { repeat: true });
    const robe = skinMat(robeTex, bumpTex('robe', { n: 6000, size: 1, a: 0.3 }), { params: { roughness: 0.95 }, vc: true, rep: 4, bumpRep: 12 });
    const skin = skinMat(skinTex('neighbor', { base: '#b8a898', mottle: ['150,130,120', '190,170,150', '130,110,120'], veins: '90,60,80', veinCount: 12, spots: 20 }), bumpTex('nSkin', { wrinkles: 70 }), { params: { roughness: 0.55 }, vc: true });
    const g = new THREE.Group();
    const skinZones = pp => pp[1] < 0.45 && pp[1] > 0.08 || (pp[1] > 1.45 && pp[1] < 1.86 && Math.abs(pp[0]) < (1.9 - pp[1]) * 0.35 && pp[2] > 0.05) || (pp[1] < 0.98 && pp[1] > 0.6 && Math.abs(Math.abs(pp[0]) - 0.3) < 0.05);
    const bodyG = S.mesh('neighbor:body', neighborBody, [[-0.42, -0.02, -0.35], [0.42, 2.06, 0.35]], 0.014, { color: (pp, n) => { const a = aoColor(neighborBody, [1, 1, 1], 1.1)(pp, n); if (pp[1] < 0.08) return [0.25 * a[0], 0.2 * a[1], 0.18 * a[2]]; return skinZones(pp) ? [a[0] * 2.3, a[1] * 2.1, a[2] * 2.0] : a; }, smooth: 2 });
    const body = new THREE.Mesh(bodyG, robe); body.castShadow = true; g.add(body);
    const head = new THREE.Mesh(S.mesh('neighbor:head', neighborHead, [[-0.14, -0.06, -0.15], [0.14, 0.3, 0.17]], 0.007, { color: aoColor(neighborHead, [1, 1, 1], 1.4), smooth: 2 }), skin);
    head.position.set(0, 2.0, 0.07); head.rotation.x = 0.35; head.castShadow = true; g.add(head);
    // eyes: too white, tiny pupils, wet
    const eyeM = new THREE.MeshPhysicalMaterial({ color: 0xe8e4dc, roughness: 0.1, clearcoat: 1, emissive: 0x303030, emissiveIntensity: 0.4 });
    const pupilM = new THREE.MeshBasicMaterial({ color: 0x050303 });
    for (const sx of [-1, 1]) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.021, 16, 12), eyeM); e.position.set(sx * 0.043, 0.125, 0.097); head.add(e);
      const pu = new THREE.Mesh(new THREE.SphereGeometry(0.004, 8, 6), pupilM); pu.position.set(sx * 0.043 + sx * 0.002, 0.123, 0.117); head.add(pu);
    }
    return { group: g, mats: [robe, skin], head };
  }

  // ------------------------------------------------------------ CHOMPY
  function chompyHead(p) {
    // a big foam ball head under matted fur, the grin carved deep into it
    let d = S.sphere(p, [0, 0, 0], 0.58) + S.fbm(p[0] * 6, p[1] * 6, p[2] * 6, 3) * 0.035;
    const smile = S.smax(S.ellipsoid(p, [0, -0.12, 0.42], [0.36, 0.2, 0.3]), -(p[1] + 0.1 - Math.pow(p[0] / 0.4, 2) * 0.16) , 0.02);
    d = S.smax(d, -smile, 0.03);
    // lip roll around the grin
    d = S.smin(d, S.smax(Math.abs(S.ellipsoid(p, [0, -0.12, 0.42], [0.37, 0.21, 0.31])) - 0.03, S.sphere(p, [0, 0, 0], 0.62), 0.02), 0.03);
    // nose and brow bumps
    d = S.smin(d, S.sphere(p, [0, 0.06, 0.57], 0.07), 0.05);
    // hat
    d = S.smin(d, S.capsule(p, [0, 0.52, 0.06], [0, 0.78, 0.12], 0.1, 0.02), 0.04);
    return d;
  }
  function chompyBody(p) {
    const q = [Math.abs(p[0]), p[1], p[2]];
    let d = S.ellipsoid(p, [0, 1.0, 0], [0.38, 0.52, 0.32]) + S.fbm(p[0] * 7, p[1] * 7, p[2] * 7, 3) * 0.03;
    d = S.smin(d, S.capsule(q, [0.17, 0.62, 0], [0.17, 0.22, 0.02], 0.13, 0.12), 0.06);
    d = S.smin(d, S.ellipsoid(q, [0.17, 0.09, 0.08], [0.15, 0.09, 0.22]), 0.04);
    // the neck seam where the head sits, torn open at the front
    d = S.smax(d, -S.ellipsoid(p, [0.08, 1.46, 0.2], [0.12, 0.06, 0.1]), 0.02);
    return d;
  }
  function chompyArm(p) {
    let d = S.capsule(p, [0, 0, 0], [0, -0.55, 0.02], 0.11, 0.09) + S.fbm(p[0] * 8, p[1] * 8, p[2] * 8, 2) * 0.02;
    // cartoon glove, four fat fingers
    let glove = S.ellipsoid(p, [0, -0.63, 0.03], [0.12, 0.1, 0.07]);
    for (let f = 0; f < 3; f++) glove = S.smin(glove, S.capsule(p, [-0.05 + f * 0.05, -0.68, 0.03], [-0.06 + f * 0.06, -0.8, 0.05], 0.03), 0.02);
    glove = S.smin(glove, S.capsule(p, [0.09, -0.6, 0.05], [0.14, -0.66, 0.08], 0.028), 0.02);
    return S.smin(d, glove, 0.03);
  }
  function chompy() {
    const furTex = T.canvas('chompy:fur', 512, 512, (g, w, h) => {
      const r = U.rng(61);
      g.fillStyle = '#d8a818'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 18000; k++) { const x = r() * w, y = r() * h, a = r.range(-0.6, 0.6) + H, l = r.range(3, 9); g.strokeStyle = r() < 0.5 ? 'rgba(120,80,0,0.35)' : 'rgba(255,220,90,0.3)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke(); }
      // matted, filthy patches and old dark stains
      for (let k = 0; k < 40; k++) { const x = r() * w, y = r() * h, rr = r.range(10, 55); const gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, `rgba(${r() < 0.3 ? '70,15,10' : '60,45,15'},${r.range(0.3, 0.6)})`); gr.addColorStop(1, 'rgba(60,45,15,0)'); g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
    }, { repeat: true });
    const fur = skinMat(furTex, bumpTex('fur', { n: 9000, size: 1, a: 0.45 }), { params: { roughness: 1 }, vc: true, rep: 3, bumpRep: 8, bumpScale: 3 });
    const felt = new THREE.MeshStandardMaterial({ color: 0xe8e2d0, roughness: 0.95 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x0a0605, roughness: 0.9 });
    const red = new THREE.MeshStandardMaterial({ color: 0x8a1414, roughness: 0.7 });
    const eyeM = new THREE.MeshPhysicalMaterial({ color: 0xeeeae0, roughness: 0.15, clearcoat: 1 });
    const g = new THREE.Group();
    const bodyColor = (pp, n) => { const a = aoColor(chompyBody, [1, 1, 1], 1)(pp, n); return pp[1] < 0.2 ? [2.2 * a[0], 0.35 * a[1], 0.35 * a[2]] : a; };
    const body = new THREE.Mesh(S.mesh('chompy:body', chompyBody, [[-0.45, -0.02, -0.4], [0.45, 1.55, 0.45]], 0.016, { color: bodyColor, smooth: 2 }), fur);
    body.castShadow = true; g.add(body);
    // the inside of the torn neck seam
    const hole = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 8), dark); hole.scale.set(1, 0.5, 0.6); hole.position.set(0.08, 1.46, 0.16); g.add(hole);
    const head = new THREE.Group(); head.position.set(0, 1.95, 0); g.add(head);
    const hm = new THREE.Mesh(S.mesh('chompy:head', chompyHead, [[-0.66, -0.66, -0.66], [0.66, 0.86, 0.72]], 0.016, { color: (pp, n) => {
      const a = aoColor(chompyHead, [1, 1, 1], 1.4)(pp, n);
      if (pp[1] > 0.5) return [2.4 * a[0], 0.3 * a[1], 0.3 * a[2]];            // the red hat
      const inMouth = Math.hypot((pp[0]) / 0.36, (pp[1] + 0.12) / 0.2, (pp[2] - 0.42) / 0.3) < 1.05;
      return inMouth ? [0.08, 0.02, 0.02] : a;
    }, smooth: 2 }), fur);
    hm.castShadow = true; head.add(hm);
    // felt teeth along the top of the grin, a few missing, one hanging by a thread
    const tooth = new THREE.BoxGeometry(0.065, 0.075, 0.03);
    for (let k = 0; k < 8; k++) {
      if (k === 2 || k === 6) continue;
      const x = -0.28 + k * 0.08, t = new THREE.Mesh(tooth, felt);
      t.position.set(x, -0.03 + Math.pow(x / 0.4, 2) * 0.1 - 0.02, 0.5 - Math.abs(x) * 0.25);
      t.rotation.set(0.2, -x * 0.9, k === 5 ? 0.5 : 0);
      if (k === 5) t.position.y -= 0.05;
      head.add(t);
    }
    // Somebody is inside: a pale face deep in the dark of the grin, looking out
    const faceSkin = new THREE.MeshStandardMaterial({ color: 0xcfc3b2, roughness: 0.6, vertexColors: true });
    const face = new THREE.Mesh(S.mesh('neighbor:head', neighborHead, [[-0.14, -0.06, -0.15], [0.14, 0.3, 0.17]], 0.007, { color: aoColor(neighborHead, [1, 1, 1], 1.4), smooth: 2 }), faceSkin);
    face.scale.setScalar(0.72); face.position.set(0, -0.3, 0.34); face.rotation.x = -0.1; head.add(face);
    const wetEye = new THREE.MeshPhysicalMaterial({ color: 0xd8d2c8, roughness: 0.08, clearcoat: 1, emissive: 0x202020 });
    for (const sx of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.015, 12, 8), wetEye); e.position.set(sx * 0.031, -0.3 + 0.123 * 0.72, 0.34 + 0.07); head.add(e); }
    // eyes: plastic domes, one cracked and pushed in, painted pupils
    for (const sx of [-0.2, 0.2]) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 14), eyeM); e.scale.set(0.8, 1.2, 0.5); e.position.set(sx, 0.2, 0.5); if (sx > 0) { e.rotation.z = 0.3; e.position.z -= 0.03; } head.add(e);
      const pu = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 10), dark); pu.position.set(sx * (sx > 0 ? 0.9 : 1.1), sx > 0 ? 0.13 : 0.2, 0.555); head.add(pu);
    }
    const armG = S.mesh('chompy:arm', chompyArm, [[-0.16, -0.86, -0.14], [0.2, 0.13, 0.16]], 0.012, { color: (pp, n) => { const a = aoColor(chompyArm, [1, 1, 1], 1)(pp, n); return pp[1] < -0.55 ? [3.4 * a[0], 3.3 * a[1], 3.1 * a[2]] : a; }, smooth: 2 });
    const arms = [];
    for (const sx of [-1, 1]) {
      const a = new THREE.Group(); a.position.set(sx * 0.4, 1.35, 0); g.add(a);
      const m = new THREE.Mesh(armG, fur); m.scale.x = sx; m.castShadow = true; a.add(m);
      if (sx < 0) { const f = armG.clone(); const idx = f.index.array; for (let i = 0; i < idx.length; i += 3) { const t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; } const nn = f.attributes.normal; for (let i = 0; i < nn.count; i++) nn.setX(i, -nn.getX(i)); m.geometry = f; }
      arms.push(a);
    }
    return { group: g, mats: [fur, felt, dark, red, eyeM, faceSkin, wetEye], head, arms };
  }

  // ------------------------------------------------------------ GRINNERS
  function gumDist(p) {
    // a curved ridge of gum along a smile, upper and lower
    const x = p[0], curve = Math.pow(x / 0.42, 2) * 0.18;
    const band = (y0, th) => S.smax(Math.hypot(p[1] - (y0 + curve), p[2] + Math.abs(x) * 0.35 - 0.02) - th, Math.abs(x) - 0.45, 0.03);
    return S.smin(band(0.07, 0.035), band(-0.11, 0.03), 0.01);
  }
  function grinner() {
    const g = new THREE.Group();
    const gum = new THREE.MeshPhysicalMaterial({ color: 0x7a2028, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.1, emissive: 0x3a0a0e, emissiveIntensity: 0.9, alphaHash: true });
    const teeth = new THREE.MeshStandardMaterial({ color: 0xece4cc, roughness: 0.3, emissive: 0x5a5448, emissiveIntensity: 0.8, alphaHash: true });
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xf0ece0, emissiveIntensity: 1.6, alphaHash: true });
    g.add(new THREE.Mesh(S.mesh('grin:gum', gumDist, [[-0.5, -0.15, -0.2], [0.5, 0.26, 0.1]], 0.008, { smooth: 2 }), gum));
    const tg = PB.Monsters.toothGeos ? PB.Monsters.toothGeos() : null;
    const r = U.rng(23), set = [];
    for (const [row, y0, flip] of [[0, 0.07, true], [1, -0.11, false]]) {
      for (let k = -9; k <= 9; k++) {
        const x = k * 0.042, y = y0 + Math.pow(x / 0.42, 2) * 0.18;
        const kind = Math.abs(k) > 6 ? 2 : Math.abs(k) === 3 ? 1 : 0;
        const t = new THREE.Mesh(tg ? tg[kind] : new THREE.BoxGeometry(0.035, 0.06, 0.015), teeth);
        t.scale.setScalar(0.5 * r.range(0.85, 1.15));
        t.position.set(x, y + (flip ? -0.012 : 0.012), 0.03 - Math.abs(x) * 0.35);
        t.rotation.set(flip ? PI : 0, -x * 0.8, (r() - 0.5) * 0.2);
        set.push(t);
      }
    }
    g.add(new THREE.Mesh(PB.Monsters.mergeMeshes(set), teeth));
    // eyes: two pale discs with pinprick pupils, a hand's width above the smile
    for (const sx of [-0.2, 0.2]) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.045, 14, 10), eyeMat); e.scale.set(1.2, 0.8, 0.5); e.position.set(sx, 0.36, 0); g.add(e);
      const pu = new THREE.Mesh(new THREE.SphereGeometry(0.009, 8, 6), new THREE.MeshBasicMaterial({ color: 0x000000 })); pu.position.set(sx, 0.36, 0.024); g.add(pu);
    }
    return { group: g, mats: [gum, teeth, eyeMat] };
  }

  Object.assign(PB.Monsters, { counter, crawler, monitor, mannequin, neighbor, chompy, grinner, skinTex, bumpTex });
})(typeof window !== 'undefined' ? window : globalThis);
