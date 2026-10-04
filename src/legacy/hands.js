/* First-person hands: Sam wears worn leather work gloves (he came to haul cabinets out) and a
   canvas work jacket. Both hands are signed-distance sculptures meshed once at load:
   - right: an overhand grip on the flashlight. The back of the hand lies over the top of the tube,
     the knuckles along its right side, the fingers wrap under it, the thumb runs forward along the
     top-left. The flashlight's own shape is carved out of the glove so the grip is snug.
   - left: holding the walkie-talkie up to the face, fingers round its back, thumb on the side.
   Frames: the right hand is built in the flashlight's frame (tube axis along z, lens toward -z,
   radius 0.021); the left in the walkie's frame (body 62 x 150 x 36 mm centered at the origin,
   grille toward +z). Vertex colors carry the leather's wear, seams and dirt. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF;
  const DEG = Math.PI / 180;

  const RC = 0.0215;                    // flashlight grip radius
  const polar = (deg, R, z) => [Math.cos(deg * DEG) * R, Math.sin(deg * DEG) * R, z];

  // ---------------------------------------------------------------- right hand
  const FINGERS = [
    // z along the tube, thickness, reach (how far round the tube the tip ends)
    { z: -0.036, r: 0.0100, tip: -128 },   // index
    { z: -0.0135, r: 0.0104, tip: -132 },  // middle
    { z: 0.0085, r: 0.0098, tip: -126 },   // ring
    { z: 0.0285, r: 0.0086, tip: -112 },   // little
  ];
  function fingerPts(f) {
    return [polar(38, 0.046, f.z), polar(-8, 0.0335, f.z - 0.002), polar(-72, 0.0325, f.z - 0.003), polar(f.tip, 0.031, f.z - 0.004)];
  }
  function rightDist(p) {
    let d = 1e9;
    // Fingers: three phalanges each, joints slightly thicker
    for (const f of FINGERS) {
      const pts = fingerPts(f), r = f.r;
      d = S.smin(d, S.chain(p, pts, [r * 1.12, r, r * 0.95, r * 0.84], 0.004), 0.003);
      d = S.smin(d, S.sphere(p, pts[1], r * 1.08), 0.004);   // PIP knuckle
    }
    // Back of the hand: a curved slab over the top of the tube, flatter across the metacarpals
    d = S.smin(d, S.ellipsoid(p, [0.004, 0.041, 0.014], [0.046, 0.0145, 0.05]), 0.01);
    d = S.smin(d, S.ellipsoid(p, [0.03, 0.028, 0.02], [0.018, 0.024, 0.044]), 0.01);
    // Tendons fanning from the wrist to each knuckle
    for (const f of FINGERS) d = S.smin(d, S.capsule(p, [0.006, 0.05, 0.062], polar(40, 0.05, f.z + 0.004), 0.0045, 0.0055), 0.006);
    // Knuckles (metacarpal heads), crisp
    for (const f of FINGERS) d = S.smin(d, S.sphere(p, polar(40, 0.0495, f.z + 0.002), f.r * 1.22), 0.005);
    // Thumb: from the base of the palm along the top-left of the tube, pointing forward
    d = S.smin(d, S.chain(p, [[-0.034, 0.036, 0.056], polar(150, 0.038, 0.02), polar(128, 0.034, -0.012), polar(110, 0.0315, -0.037)], [0.018, 0.0132, 0.0114, 0.0096], 0.004), 0.011);
    d = S.smin(d, S.sphere(p, polar(128, 0.035, -0.012), 0.0122), 0.004);
    // Thenar pad joining thumb and palm
    d = S.smin(d, S.ellipsoid(p, [-0.03, 0.026, 0.045], [0.019, 0.02, 0.032]), 0.012);
    // Wrist, the glove's strap and its flared cuff, going back and down toward the camera
    d = S.smin(d, S.capsule(p, [0.004, 0.036, 0.06], [0.016, 0.028, 0.15], 0.026, 0.028), 0.018);
    d = S.smin(d, S.capsule(p, [0.012, 0.031, 0.108], [0.014, 0.03, 0.122], 0.0305, 0.0305), 0.002);
    d = S.smin(d, S.capsule(p, [0.016, 0.028, 0.14], [0.02, 0.026, 0.19], 0.032, 0.036), 0.006);
    // The flashlight itself is carved out (a hair larger, so nothing pokes through)
    const tube = Math.hypot(p[0], p[1]) - (RC + 0.0006);
    d = S.smax(d, -tube, 0.002);
    // Leather wrinkles: shallow noise on the surface
    return d + S.fbm(p[0] * 180, p[1] * 180, p[2] * 180, 2) * 0.0007;
  }
  // Seams down the finger sides and around the cuff, darker creases at the knuckles, lighter worn tips
  // Leather color: grain variation, worn lighter where it rubs (knuckles, tips, the thumb),
  // darker in the creases between fingers (occlusion measured on the distance field itself)
  function gloveColor(dist, base, worn, strapAt) {
    const q = [0, 0, 0];
    return (p, n) => {
      const g = S.fbm(p[0] * 70, p[1] * 70, p[2] * 70, 3);
      let c = base.map(v => v * (1 + g * 0.4));
      let occ = 0;
      for (let k = 1; k <= 4; k++) { const e = k * 0.003; q[0] = p[0] + n[0] * e; q[1] = p[1] + n[1] * e; q[2] = p[2] + n[2] * e; occ += (e - dist(q)) / (k * 0.003) * 0.25; }
      const ao = Math.max(0.35, 1 - occ * 0.9);
      const rub = Math.max(0, S.fbm(p[0] * 25 + 3, p[1] * 25, p[2] * 25, 2) + 0.1) * 1.6;
      c = c.map((v, i) => v + (worn[i] - v) * Math.min(0.55, rub * (1 - occ)));
      if (strapAt && strapAt(p)) c = c.map(v => v * 0.55);
      return c.map(v => Math.max(0, v * ao));
    };
  }
  function rightStrap(p) { return p[2] > 0.105 && p[2] < 0.125; }
  function leftStrap(p) { return p[1] < -0.12 && p[1] > -0.14; }
  function rightFingerInfo(p) {
    let best = null, bd = 1e9;
    for (const f of FINGERS) {
      const pts = fingerPts(f);
      for (let i = 0; i < 3; i++) {
        const dd = S.capsule(p, pts[i], pts[i + 1], f.r * 1.3, f.r * 1.3);
        if (dd < bd) { bd = dd; best = { tip: i === 2 ? Math.min(1, 1.4 - 0.5 * Math.hypot(p[0] - pts[3][0], p[1] - pts[3][1], p[2] - pts[3][2]) / f.r) : 0, knuckle: i === 0 ? 1 : 0 }; }
      }
    }
    return bd < 0.004 ? best : null;
  }

  // ---------------------------------------------------------------- sleeve (jacket cuff and forearm)
  function sleeveDist(from, to, r0, r1, seed) {
    return p => {
      let d = S.capsule(p, from, to, r0, r1);
      // folds: rings bunched up near the cuff plus random creases
      const ax = [to[0] - from[0], to[1] - from[1], to[2] - from[2]], L = Math.hypot(...ax);
      const t = ((p[0] - from[0]) * ax[0] + (p[1] - from[1]) * ax[1] + (p[2] - from[2]) * ax[2]) / (L * L);
      const fold = Math.sin(t * 38 + seed) * 0.0022 * Math.max(0, 1 - t * 1.4) + S.fbm(p[0] * 40 + seed, p[1] * 40, p[2] * 40, 3) * 0.004;
      d -= fold;
      // a rolled hem at the hand end
      d = S.smin(d, S.capsule(p, from, [from[0] + ax[0] * 0.04, from[1] + ax[1] * 0.04, from[2] + ax[2] * 0.04], r0 + 0.003, r0 + 0.002), 0.003);
      return d;
    };
  }

  // ---------------------------------------------------------------- left hand on the walkie-talkie
  const WK = { hw: 0.031, hh: 0.075, hd: 0.018 };
  function leftDist(p) {
    let d = 1e9;
    // Palm against the back of the radio, slightly low
    d = S.smin(d, S.ellipsoid(p, [-0.006, -0.03, -0.034], [0.042, 0.05, 0.016]), 0.01);
    // Four fingers wrap around the right edge onto the front
    for (let k = 0; k < 4; k++) {
      const y = 0.0 - k * 0.021, r = [0.0098, 0.0102, 0.0096, 0.0084][k];
      const pts = [[0.018, y, -0.036], [0.038, y - 0.002, -0.022], [0.043, y - 0.003, 0.004], [0.034, y - 0.004, 0.026]];
      d = S.smin(d, S.chain(p, pts, [r * 1.1, r, r * 0.94, r * 0.84], 0.004), 0.004);
    }
    // Thumb up the left side, tip near the push-to-talk key
    d = S.smin(d, S.chain(p, [[-0.03, -0.055, -0.03], [-0.04, -0.03, -0.012], [-0.042, 0.0, 0.004], [-0.038, 0.022, 0.014]], [0.016, 0.012, 0.0105, 0.009], 0.004), 0.01);
    // Wrist going down and back
    d = S.smin(d, S.capsule(p, [-0.004, -0.07, -0.04], [-0.01, -0.16, -0.06], 0.028, 0.03), 0.018);
    d = S.smin(d, S.capsule(p, [-0.01, -0.15, -0.058], [-0.012, -0.18, -0.064], 0.034, 0.036), 0.006);
    // Carve the radio
    const q = S.box(p, [0, 0, 0], [WK.hw + 0.0006, WK.hh + 0.0006, WK.hd + 0.0006], 0.008);
    d = S.smax(d, -q, 0.002);
    return d + S.fbm(p[0] * 180, p[1] * 180, p[2] * 180, 2) * 0.0007;
  }

  // ---------------------------------------------------------------- materials
  function leatherGrain() {
    return PB.Tex.canvas('hands:grain', 256, 256, (g, w, h) => {
      const r = PB.U.rng(33);
      g.fillStyle = '#8080ff'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 2600; k++) { const x = r() * w, y = r() * h, s = 1 + r() * 3; g.fillStyle = `rgba(${100 + r() * 60 | 0},${100 + r() * 60 | 0},255,0.6)`; g.beginPath(); g.ellipse(x, y, s, s * (0.5 + r()), r() * 3, 0, Math.PI * 2); g.fill(); }
      g.strokeStyle = 'rgba(90,90,255,0.5)'; g.lineWidth = 1;
      for (let k = 0; k < 90; k++) { let x = r() * w, y = r() * h; g.beginPath(); g.moveTo(x, y); for (let q = 0; q < 5; q++) { x += r.range(-14, 14); y += r.range(-6, 6); g.lineTo(x, y); } g.stroke(); }
    }, { repeat: true });
  }
  function canvasWeave() {
    return PB.Tex.canvas('hands:weave', 128, 128, (g, w, h) => {
      g.fillStyle = '#8080ff'; g.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 4) for (let x = 0; x < w; x += 4) { g.fillStyle = ((x + y) / 4) % 2 ? 'rgba(160,160,255,0.7)' : 'rgba(96,96,255,0.7)'; g.fillRect(x, y, 4, 2); g.fillRect(x + ((y / 4) % 2 ? 2 : 0), y + 2, 2, 2); }
    }, { repeat: true });
  }

  const H = PB.Hands = {
    built: null,
    build() {
      if (H.built) return H.built;
      const t0 = performance.now();
      const leather = [0.15, 0.085, 0.045], worn = [0.3, 0.2, 0.12];
      const right = S.mesh('hand:right', rightDist, [[-0.07, -0.06, -0.075], [0.075, 0.085, 0.2]], 0.0024, { color: gloveColor(rightDist, leather, worn, rightStrap), smooth: 2 });
      const left = S.mesh('hand:left', leftDist, [[-0.075, -0.2, -0.09], [0.065, 0.045, 0.05]], 0.0026, { color: gloveColor(leftDist, leather, worn, leftStrap), smooth: 2 });
      const sleeveColor = (p, n) => { const g = S.fbm(p[0] * 30, p[1] * 30, p[2] * 30, 3); const k = 0.85 + g * 0.5; return [0.055 * k, 0.06 * k, 0.045 * k]; };
      const rs = sleeveDist([0.018, 0.026, 0.17], [0.045, 0.0, 0.42], 0.044, 0.054, 1.3);
      const sleeveR = S.mesh('hand:sleeveR', rs, [[-0.04, -0.07, 0.11], [0.12, 0.1, 0.48]], 0.0035, { color: sleeveColor, smooth: 1 });
      const ls = sleeveDist([-0.012, -0.17, -0.063], [-0.02, -0.42, -0.1], 0.044, 0.054, 4.1);
      const sleeveL = S.mesh('hand:sleeveL', ls, [[-0.09, -0.47, -0.18], [0.06, -0.1, 0.02]], 0.0035, { color: sleeveColor, smooth: 1 });
      const grain = leatherGrain(), weave = canvasWeave();
      const gloveMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.62, metalness: 0, normalMap: grain, normalScale: new THREE.Vector2(0.35, 0.35) });
      grain.repeat.set(40, 40);
      const sleeveMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0, normalMap: weave, normalScale: new THREE.Vector2(0.5, 0.5) });
      weave.repeat.set(90, 90);
      H.built = { right, left, sleeveR, sleeveL, gloveMat, sleeveMat, ms: performance.now() - t0 };
      return H.built;
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
