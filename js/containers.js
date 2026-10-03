/* Furniture that opens: drawers slide out, safe doors swing.
   Each piece is built in two parts: the body (instanced like any other prop, with a dark cavity behind
   every drawer front) and one instanced model per drawer front in its closed pose. Opening a drawer hides
   that one instance and swaps in a moving copy with its box and contents, so a room full of desks still
   costs a handful of draw calls.
   Small things can be found inside: some of the level's batteries, notes and tapes are put in a drawer of
   a nearby desk instead of lying on the floor, a few drawers hold a spare battery of their own, and the
   rest hold what drawers hold (papers, pens, pills, folders, clothes). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U;
  const P = PB.Props, D = P.DEFS, M = PB.Models;
  const PI = Math.PI, H = PI / 2;

  Object.assign(M.MATS, {
    cavity: { color: 0x080605, rough: 1 },
    drawerBox: { color: 0xa88a64, rough: 0.8 },
    drawerSteel: { color: 0x565f64, rough: 0.55, metal: 0.4 },
    safeInner: { color: 0x2e3032, rough: 0.8, metal: 0.2 },
    amber: { color: 0x9a4a10, rough: 0.2, refl: 0.2 },
    cash: { color: 0x8a9670, rough: 0.9 },
    manila: { color: 0xd8c08a, rough: 0.85 },
    rubber: { color: 0x1a1a1a, rough: 0.9 },
    apple: { color: 0x6a1a10, rough: 0.5 },
    lampShade: { color: 0xe0cfa4, rough: 0.9, double: true },
  });

  // ------------------------------------------------------------ pulls and fronts
  // Front of a drawer facing +z (face plane z0, the front is 2 cm thick) with a pull of the given style
  function front(mat, w, h, x, y, z0, pull, opts = {}) {
    const z = z0 + 0.01, s = [['rbox', mat, w, h, 0.02, 0.004, x, y, z]];
    const zf = z0 + 0.02;
    if (pull === 'bar') {
      for (const dx of [-0.045, 0.045]) s.push(['cyl', opts.metal || 'brass', 0.005, 0.005, 0.024, 6, x + dx, y, zf + 0.012, H, 0, 0]);
      s.push(['cyl', opts.metal || 'brass', 0.0065, 0.0065, 0.12, 8, x, y, zf + 0.024, 0, 0, H]);
    } else if (pull === 'bail') {
      for (const dx of opts.pairs || [0]) {
        s.push(['rbox', 'brass', 0.1, 0.034, 0.004, 0.003, x + dx, y + 0.004, zf + 0.002]);
        s.push(['torus', 'brass', 0.036, 0.0045, 12, PI, x + dx, y + 0.004, zf + 0.006, 0, 0, PI]);
      }
    } else if (pull === 'knob') {
      s.push(['cyl', 'brass', 0.006, 0.008, 0.016, 8, x, y, zf + 0.008, H, 0, 0], ['sph', 'brass', 0.014, x, y, zf + 0.022, 12, 8]);
    } else if (pull === 'cup') {
      // Filing cabinet: a chrome cup pull with a label holder above it
      s.push(['rbox', 'chrome', 0.15, 0.03, 0.03, 0.008, x, y + 0.02, zf + 0.012], ['box', 'cavity', 0.13, 0.012, 0.002, x, y + 0.014, zf + 0.0275]);
      s.push(['rbox', 'chrome', 0.1, 0.045, 0.004, 0.002, x, y + 0.085, zf + 0.002], ['box', 'labelCard', 0.085, 0.03, 0.002, x, y + 0.085, zf + 0.0045]);
    } else if (pull === 'recess') {
      s.push(['rbox', 'chrome', 0.12, 0.022, 0.012, 0.005, x, y + h / 2 - 0.03, zf + 0.005]);
    }
    if (opts.lock) s.push(['cyl', 'brass', 0.009, 0.009, 0.004, 12, x, y + h / 2 - 0.035, zf + 0.001, H, 0, 0], ['box', 'cavity', 0.0025, 0.009, 0.001, x, y + h / 2 - 0.035, zf + 0.0035]);
    return s;
  }
  // Same, for a drawer that faces +x (cubicle pedestals): rotate every part a quarter turn about y
  function turnX(specs, px, pz) {
    const R = new THREE.Matrix4().makeRotationY(H), e = new THREE.Euler(), v = new THREE.Vector3();
    return specs.map(s => {
      const out = s.slice();
      const idx = POS[s[0]];
      v.set(s[idx], s[idx + 1], s[idx + 2]).applyMatrix4(R);
      out[idx] = v.x + px; out[idx + 1] = v.y; out[idx + 2] = v.z + pz;
      if (s[0] === 'sph') return out;   // spheres carry no rotation
      const ri = idx + 3;
      e.set(s[ri] || 0, s[ri + 1] || 0, s[ri + 2] || 0);
      const q = new THREE.Quaternion().setFromEuler(e).premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), H));
      e.setFromQuaternion(q);
      out[ri] = e.x; out[ri + 1] = e.y; out[ri + 2] = e.z;
      return out;
    });
  }
  // Where the position sits in each spec kind ([kind, material, ...args]); the rotation follows it
  const POS = { box: 5, rbox: 6, cyl: 6, torus: 6, sph: 3 };

  // A dark plate just behind a closed front: what you see through the hole once the drawer is out
  const cav = (w, h, x, y, z0) => ['box', 'cavity', w - 0.012, h - 0.012, 0.002, x, y, z0 + 0.0012];

  // ------------------------------------------------------------ furniture
  const FURN = {};
  function define(type, body, slots) {
    D[type] = body;
    slots.forEach((s, k) => {
      s.def = type + '~' + k;
      D[s.def] = s.front;
      s.n = s.n || [0, 0, 1];
      s.travel = s.travel != null ? s.travel : s.depth * 0.72;
    });
    FURN[type] = { slots };
  }

  // Executive desk: veneered top, two pedestals of three drawers, a pencil drawer, modesty panel
  {
    const body = [
      ['rbox', 'woodVarnish', 1.8, 0.045, 0.86, 0.012, 0, 0.76, 0],
      ['box', 'darkWood', 1.76, 0.014, 0.82, 0, 0.731, 0],
      ...[-0.64, 0.64].flatMap(x => [
        ['rbox', 'drawerWood', 0.45, 0.675, 0.78, 0.008, x, 0.3975, 0],
        ['box', 'kick', 0.42, 0.06, 0.72, x, 0.03, -0.02],
        ['rbox', 'drawerWood', 0.46, 0.012, 0.79, 0.004, x, 0.066, 0],
      ]),
      ['box', 'drawerWood', 0.83, 0.45, 0.02, 0, 0.5, -0.35],
      ['box', 'drawerWood', 0.83, 0.085, 0.7, 0, 0.6925, 0.04],
      // On the top: blotter, papers, a folder, mug, ashtray, pen cup, desk calendar
      ['rbox', 'leather', 0.62, 0.006, 0.44, 0.003, 0, 0.785, 0.1],
      ['box', 'paper', 0.21, 0.012, 0.3, -0.4, 0.788, -0.2, 0, 0.3], ['box', 'yellowPaper', 0.21, 0.004, 0.3, -0.38, 0.796, -0.22, 0, 0.1],
      ['rbox', 'folderBrown', 0.24, 0.03, 0.32, 0.004, 0.55, 0.8, -0.15, 0, -0.2],
      ['lathe', 'mug', [[0.036, 0], [0.04, 0.005], [0.04, 0.095], [0.037, 0.098], [0.034, 0.01], [0, 0.01]], 20, 0.35, 0.785, 0.3],
      ['disc', 'coffee', 0.034, 0.35, 0.87, 0.3, -H],
      ['torus', 'mug', 0.024, 0.006, 12, 0, 0.395, 0.835, 0.3, 0, 0, 0],
      ['lathe', 'glass', [[0.07, 0], [0.075, 0.02], [0.05, 0.025], [0.02, 0.012], [0, 0.012]], 16, 0.8, 0.785, -0.05],
      ['cap', 'cigarette', 0.004, 0.06, 0.8, 0.8, -0.05, 0, 0.4, H],
      ['lathe', 'blackPlastic', [[0.03, 0], [0.032, 0.11], [0.028, 0.11], [0.026, 0.005], [0, 0.005]], 16, -0.75, 0.785, -0.2],
      ['cyl', 'redPlastic', 0.004, 0.004, 0.14, 6, -0.745, 0.88, -0.2, 0.15], ['cyl', 'bluePlastic', 0.004, 0.004, 0.14, 6, -0.755, 0.88, -0.19, -0.1, 0, 0.1],
      ['rbox', 'whitePlastic', 0.2, 0.26, 0.012, 0.004, 0.2, 0.9, -0.35, -0.3], ['plane', 'calendar', 0.19, 0.24, 0.2, 0.9, -0.3425, -0.3],
    ];
    const slots = [];
    for (const x of [-0.64, 0.64]) for (const [y, h, lock] of [[0.6275, 0.19, true], [0.4275, 0.19, false], [0.1975, 0.25, false]]) {
      body.push(cav(0.41, h, x, y, 0.39));
      slots.push({ c: [x, y, 0.39], w: 0.41, h, depth: 0.7, kind: 'wood', box: 'drawerBox', junk: 'office', front: front('drawerWood', 0.41, h - 0.012, x, y, 0.39, 'bar', { lock }) });
    }
    body.push(cav(0.6, 0.075, 0, 0.6925, 0.39));
    slots.push({ c: [0, 0.6925, 0.39], w: 0.6, h: 0.075, depth: 0.5, kind: 'wood', box: 'drawerBox', junk: 'pencil', front: front('drawerWood', 0.6, 0.065, 0, 0.6925, 0.39, 'knob') });
    define('desk', body, slots);
  }

  // Nightstand: one drawer over an open cubby, a little lamp on top
  {
    const body = [
      ['rbox', 'drawerWood', 0.45, 0.54, 0.4, 0.008, 0, 0.32, 0],
      ['rbox', 'drawerWood', 0.48, 0.025, 0.43, 0.006, 0, 0.6025, 0],
      ...[[-0.19, -0.16], [0.19, -0.16], [-0.19, 0.16], [0.19, 0.16]].map(([x, z]) => ['cyl', 'drawerWood', 0.02, 0.015, 0.05, 8, x, 0.025, z]),
      // the cubby: a dark back and a shelf lip
      ['box', 'cavity', 0.39, 0.22, 0.002, 0, 0.2, 0.2012], ['box', 'drawerWood', 0.42, 0.02, 0.36, 0, 0.3, 0.015],
      ['lathe', 'brass', [[0.06, 0], [0.062, 0.01], [0.02, 0.02], [0.012, 0.2], [0, 0.2]], 16, 0.1, 0.615, -0.06],
      ['lathe', 'lampShade', [[0.12, 0], [0.07, 0.14], [0.001, 0.14]], 20, 0.1, 0.77, -0.06],
      ['lathe', 'mug', [[0.036, 0], [0.04, 0.005], [0.04, 0.095], [0.037, 0.098], [0.034, 0.01], [0, 0.01]], 16, -0.12, 0.615, 0.08],
    ];
    const slots = [{ c: [0, 0.495, 0.2], w: 0.4, h: 0.17, depth: 0.34, kind: 'wood', box: 'drawerBox', junk: 'bedside', front: front('drawerWood', 0.4, 0.16, 0, 0.495, 0.2, 'knob') }];
    body.push(cav(0.4, 0.17, 0, 0.495, 0.2));
    define('nightstand', body, slots);
  }

  // Motel dresser with the TV on it: three wide drawers with pairs of bail pulls
  {
    const body = [
      ['rbox', 'headboard', 1.2, 0.72, 0.5, 0.01, 0, 0.39, 0],
      ['rbox', 'headboard', 1.24, 0.025, 0.52, 0.006, 0, 0.7625, 0],
      ['box', 'kick', 1.16, 0.03, 0.46, 0, 0.015, -0.01],
      // 19" CRT: boxy front, the tube's rounded bell behind, a bulged glass screen in a dark bezel,
      // buttons, two knobs and a speaker grille down the right side, rabbit ears on top
      ['rbox', 'blackPlastic', 0.5, 0.03, 0.36, 0.008, 0, 0.79, -0.02],
      ['rbox', 'beigePlastic', 0.56, 0.44, 0.26, 0.03, 0, 1.025, 0.09],
      ['rbox', 'beigePlastic', 0.44, 0.36, 0.22, 0.06, 0, 1.01, -0.13],
      ['rbox', 'kick', 0.43, 0.34, 0.012, 0.02, -0.045, 1.035, 0.221],
      ['sph', 'tvScreen', 1, -0.045, 1.035, 0.224, 24, 16, [0.19, 0.145, 0.018]],
      ['box', 'chrome', 0.07, 0.012, 0.003, -0.045, 0.84, 0.221],
      ...[1.15, 1.12, 1.09, 1.06].map(y => ['rbox', 'blackPlastic', 0.04, 0.018, 0.012, 0.004, 0.225, y, 0.222]),
      ['rcyl', 'blackPlastic', 0.018, 0.02, 0.005, 12, 0.225, 1.0, 0.228, H], ['rcyl', 'blackPlastic', 0.018, 0.02, 0.005, 12, 0.225, 0.945, 0.228, H],
      ...[0.83, 0.845, 0.86, 0.875, 0.89].map(y => ['box', 'kick', 0.06, 0.005, 0.004, 0.225, y, 0.221]),
      ['rcyl', 'blackPlastic', 0.05, 0.03, 0.01, 14, 0, 1.26, -0.08],
      ['cyl', 'chrome', 0.004, 0.003, 0.45, 6, -0.098, 1.478, -0.08, 0, 0, 0.45], ['cyl', 'chrome', 0.004, 0.003, 0.45, 6, 0.098, 1.478, -0.08, 0, 0, -0.45],
      ['sph', 'chrome', 0.007, -0.196, 1.68, -0.08, 8, 6], ['sph', 'chrome', 0.007, 0.196, 1.68, -0.08, 8, 6],
    ];
    const slots = [];
    for (const [y, h] of [[0.155, 0.23], [0.395, 0.23], [0.63, 0.2]]) {
      body.push(cav(1.12, h, 0, y, 0.25));
      slots.push({ c: [0, y, 0.25], w: 1.12, h, depth: 0.44, kind: 'wood', box: 'drawerBox', junk: 'dresser', front: front('headboard', 1.12, h - 0.012, 0, y, 0.25, 'bail', { pairs: [-0.3, 0.3] }) });
    }
    define('dresserTv', body, slots);
  }

  // Four-drawer steel filing cabinet
  {
    const body = [
      ['rbox', 'paintMetal', 0.6, 1.32, 0.65, 0.012, 0, 0.66, 0],
      ['box', 'paper', 0.3, 0.05, 0.25, 0.05, 1.345, 0, 0, 0.1],
    ];
    const slots = [];
    for (const y of [0.2, 0.52, 0.84, 1.16]) {
      body.push(cav(0.54, 0.3, 0, y, 0.325));
      slots.push({ c: [0, y, 0.325], w: 0.54, h: 0.3, depth: 0.58, kind: 'metal', box: 'drawerSteel', junk: 'file', front: front('paintMetal', 0.54, 0.29, 0, y, 0.325, 'cup', { lock: y > 1 }) });
    }
    define('filing', body, slots);
  }

  // Floor safe: thick walls, a shelf inside, a door hung on the right with the dial and handle
  {
    const body = [
      ['box', 'safeGreen', 0.07, 0.9, 0.7, -0.365, 0.47, 0], ['box', 'safeGreen', 0.07, 0.9, 0.7, 0.365, 0.47, 0],
      ['box', 'safeGreen', 0.66, 0.07, 0.7, 0, 0.885, 0], ['box', 'safeGreen', 0.66, 0.07, 0.7, 0, 0.055, 0],
      ['box', 'safeGreen', 0.66, 0.76, 0.06, 0, 0.47, -0.32],
      ['box', 'safeInner', 0.655, 0.755, 0.002, 0, 0.47, -0.289], ['box', 'safeInner', 0.64, 0.02, 0.5, 0, 0.47, -0.03],
      ['rbox', 'safeGreen', 0.82, 0.03, 0.72, 0.01, 0, 0.935, 0],
      ['cyl', 'darkMetal', 0.018, 0.018, 0.13, 10, 0.4, 0.24, 0.35], ['cyl', 'darkMetal', 0.018, 0.018, 0.13, 10, 0.4, 0.7, 0.35],
      ...[[-0.35, -0.3], [0.35, -0.3], [-0.35, 0.3], [0.35, 0.3]].map(([x, z]) => ['cyl', 'darkMetal', 0.03, 0.035, 0.03, 10, x, 0.015, z]),
    ];
    const door = [
      ['rbox', 'safeGreen', 0.655, 0.755, 0.08, 0.01, 0, 0.47, 0.31],
      ['rbox', 'safeGreen', 0.6, 0.7, 0.012, 0.006, 0, 0.47, 0.354],
      ['rcyl', 'chrome', 0.075, 0.03, 0.008, 32, 0.12, 0.58, 0.375, H], ['cyl', 'blackPlastic', 0.04, 0.04, 0.02, 20, 0.12, 0.58, 0.395, H],
      ['box', 'chrome', 0.004, 0.02, 0.004, 0.12, 0.665, 0.362],
      ['cyl', 'chrome', 0.022, 0.022, 0.05, 12, -0.18, 0.47, 0.385, H],
      ...[0, 1, 2].map(k => ['cyl', 'chrome', 0.009, 0.009, 0.14, 8, -0.18 + Math.cos(k * 2.094) * 0.07, 0.47 + Math.sin(k * 2.094) * 0.07, 0.41, 0, 0, k * 2.094 + H]),
      ['box', 'brass', 0.2, 0.05, 0.004, 0, 0.78, 0.362],
    ];
    define('safe', body, [{ c: [0, 0.47, 0.27], w: 0.66, h: 0.76, depth: 0.55, kind: 'safe', door: true, hinge: [0.33, 0.35], swing: 1.75, junk: 'safe', bed: [[0, 0.09, -0.02], [0, 0.49, -0.02]], front: door }]);
  }

  // Teacher's desk: laminate top, steel pedestal of three drawers on the teacher's side
  {
    const body = [
      ['rbox', 'deskTop', 1.5, 0.04, 0.75, 0.01, 0, 0.76, 0],
      ['rbox', 'schoolSteel', 0.45, 0.7, 0.7, 0.01, 0.5, 0.38, 0],
      ['box', 'schoolSteel', 1.45, 0.45, 0.02, 0, 0.5, -0.35],
      ['box', 'schoolSteel', 0.04, 0.74, 0.7, -0.68, 0.37, 0],
      ['box', 'rubber', 0.43, 0.03, 0.66, 0.5, 0.015, -0.01],
      ['box', 'paper', 0.3, 0.05, 0.22, -0.3, 0.805, 0.1, 0, 0.2],
      ['lathe', 'redPlastic', [[0.05, 0], [0.07, 0.06], [0.05, 0.08], [0.001, 0.08]], 16, 0.4, 0.78, -0.2],
    ];
    const slots = [];
    for (const [y, h] of [[0.625, 0.19], [0.425, 0.19], [0.195, 0.25]]) {
      body.push(cav(0.41, h, 0.5, y, 0.35));
      slots.push({ c: [0.5, y, 0.35], w: 0.41, h, depth: 0.62, kind: 'metal', box: 'drawerSteel', junk: 'school', front: front('schoolSteel', 0.41, h - 0.012, 0.5, y, 0.35, 'recess') });
    }
    define('teacherDesk', body, slots);
  }

  // Office cubicle desk: the old model without its drawer fronts, and a pedestal whose drawers face +x
  if (D.cubicleDesk) {
    const isFront = s => (s[0] === 'rbox' && s[1] === 'paintMetal' && s[2] === 0.02 && s[3] === 0.18) || (s[0] === 'rbox' && s[1] === 'chrome' && s[2] === 0.02 && s[4] === 0.1);
    const old = D.cubicleDesk;
    const body = old.filter(s => !isFront(s));
    const slots = [];
    for (const y of [0.52, 0.3, 0.1]) {
      body.push(['box', 'cavity', 0.002, 0.168, 0.348, 0.3212, y, -0.5]);
      // built facing +z around the origin, then turned to face +x at the pedestal
      slots.push({ c: [0.32, y, -0.5], n: [1, 0, 0], w: 0.36, h: 0.18, depth: 0.54, kind: 'metal', box: 'drawerSteel', junk: 'cubicle', front: turnX(front('paintMetal', 0.36, 0.17, 0, y, 0, 'recess'), 0.32, -0.5) });
    }
    define('cubicleDesk', body, slots);
    D.computer = old;
  }

  // ------------------------------------------------------------ junk
  // What an ordinary drawer holds. Specs are in the drawer's frame: origin on the drawer floor at its
  // center, +z toward the front. w and d are the inside width and depth.
  const JUNK = {
    office: (r, w, d) => {
      const s = [], X = () => r.range(-w / 2 + 0.07, w / 2 - 0.07), Z = () => r.range(-d / 2 + 0.08, d / 2 - 0.08);
      if (r() < 0.8) { const y = r.range(0.01, 0.03); s.push(['box', r() < 0.5 ? 'paper' : 'yellowPaper', 0.21, y, 0.28, X() * 0.4, y / 2, Z() * 0.5, 0, r.range(-0.2, 0.2)]); }
      if (r() < 0.5) s.push(['box', 'manila', 0.23, 0.006, 0.31, X() * 0.3, 0.035, Z() * 0.4, 0, r.range(-0.3, 0.3)]);
      for (let k = r.int(1, 4); k > 0; k--) s.push(['cyl', r.pick(['bluePlastic', 'redPlastic', 'blackPlastic', 'yellowPlastic']), 0.0045, 0.0045, 0.14, 6, X(), 0.045, Z(), 0, r() * PI, H]);
      if (r() < 0.45) s.push(['rbox', 'blackPlastic', 0.04, 0.035, 0.14, 0.008, X(), 0.018, Z(), 0, r() * PI]);
      if (r() < 0.4) { const x = X(), z = Z(), a = r() * PI; s.push(['rbox', 'blackPlastic', 0.1, 0.016, 0.064, 0.003, x, 0.008, z, 0, a], ['box', 'paper', 0.075, 0.001, 0.035, x, 0.0165, z, 0, a]); }
      if (r() < 0.3) { const x = X(), z = Z(), a = r() * PI; s.push(['rbox', 'whitePlastic', 0.055, 0.022, 0.088, 0.004, x, 0.011, z, 0, a], ['box', 'redPlastic', 0.056, 0.023, 0.03, x + Math.sin(a) * 0.03, 0.0115, z + Math.cos(a) * 0.03, 0, a]); }
      if (r() < 0.3) s.push(['cyl', 'darkWood', 0.014, 0.011, 0.05, 8, X(), 0.03, Z()], ['rbox', 'rubber', 0.05, 0.012, 0.03, 0.003, X(), 0.006, Z()]);
      return s;
    },
    pencil: (r, w, d) => {
      const s = [];
      for (let k = r.int(3, 7); k > 0; k--) s.push(['cyl', r.pick(['yellowPlastic', 'bluePlastic', 'redPlastic', 'blackPlastic']), 0.004, 0.004, r.range(0.1, 0.17), 6, r.range(-w / 2 + 0.09, w / 2 - 0.09), 0.004, r.range(-d / 2 + 0.05, d / 2 - 0.05), 0, H + r.range(-0.2, 0.2), H]);
      if (r() < 0.6) s.push(['rbox', 'rubber', 0.05, 0.01, 0.02, 0.003, r.range(-0.15, 0.15), 0.005, r.range(-0.1, 0.1)]);
      if (r() < 0.5) s.push(['box', 'paper', 0.08, 0.003, 0.05, r.range(-0.15, 0.15), 0.0015, r.range(-0.1, 0.1), 0, r()]);
      return s;
    },
    bedside: (r, w, d) => {
      const s = [];
      if (r() < 0.7) s.push(['rbox', r() < 0.5 ? 'leather' : 'darkWood', 0.13, 0.035, 0.19, 0.004, r.range(-0.08, 0.08), 0.0175, r.range(-0.05, 0.05), 0, r.range(-0.4, 0.4)]);
      if (r() < 0.6) { const x = r.range(-0.12, 0.12), z = r.range(-0.1, 0.1); s.push(['cyl', 'amber', 0.018, 0.018, 0.07, 10, x, 0.035, z], ['cyl', 'whitePlastic', 0.02, 0.02, 0.016, 10, x, 0.078, z]); }
      if (r() < 0.4) s.push(['box', 'redPlastic', 0.05, 0.015, 0.035, r.range(-0.12, 0.12), 0.0075, r.range(-0.1, 0.1), 0, r()]);
      if (r() < 0.4) s.push(['box', 'paper', 0.09, 0.002, 0.13, r.range(-0.1, 0.1), 0.04, r.range(-0.08, 0.08), 0, r() * PI]);
      return s;
    },
    file: (r, w, d) => {
      const s = [], n = r.int(8, 16);
      for (let k = 0; k < n; k++) {
        const z = -d / 2 + 0.06 + k * (d - 0.14) / n, mat = r() < 0.7 ? 'manila' : r() < 0.5 ? 'folderBrown' : 'yellowPaper', tilt = r.range(-0.12, 0.12);
        s.push(['box', mat, w - 0.1, 0.22, 0.004, 0, 0.12, z, tilt]);
        if (r() < 0.5) s.push(['box', 'labelCard', 0.06, 0.02, 0.002, r.range(-w / 2 + 0.12, w / 2 - 0.12), 0.24, z, tilt]);
      }
      return s;
    },
    dresser: (r, w, d) => {
      const s = [];
      for (let k = r.int(0, 3); k > 0; k--) s.push(['rbox', r.pick(['clothes', 'clothes2', 'sheet']), 0.3, r.range(0.04, 0.08), 0.26, 0.025, r.range(-w / 2 + 0.2, w / 2 - 0.2), 0.03, r.range(-0.05, 0.05), 0, r.range(-0.1, 0.1)]);
      if (r() < 0.4) s.push(['rbox', 'leather', 0.13, 0.035, 0.19, 0.004, r.range(-0.3, 0.3), 0.0175, 0, 0, r()]);
      if (r() < 0.3) s.push(['box', 'paper', 0.09, 0.002, 0.13, r.range(-0.3, 0.3), 0.001, 0.05, 0, r() * PI]);
      return s;
    },
    school: (r, w, d) => {
      const s = [];
      if (r() < 0.7) s.push(['rbox', r() < 0.5 ? 'redPlastic' : 'bluePlastic', 0.22, 0.02, 0.3, 0.004, r.range(-0.05, 0.05), 0.01, r.range(-0.1, 0.1), 0, r.range(-0.2, 0.2)]);
      if (r() < 0.6) s.push(['box', 'whitePlastic', 0.08, 0.03, 0.1, r.range(-0.12, 0.12), 0.015, r.range(-0.15, 0.15), 0, r()]);
      if (r() < 0.5) s.push(['box', 'woodVarnish', 0.3, 0.004, 0.03, 0, 0.03, r.range(-0.15, 0.15), 0, r.range(-0.3, 0.3)]);
      for (let k = r.int(0, 3); k > 0; k--) s.push(['cyl', 'yellowPlastic', 0.004, 0.004, 0.17, 6, r.range(-0.15, 0.15), 0.004, r.range(-0.2, 0.2), 0, r() * PI, H]);
      if (r() < 0.25) s.push(['sph', 'apple', 0.04, r.range(-0.1, 0.1), 0.035, r.range(-0.1, 0.1), 12, 10, [1, 0.85, 1]]);
      return s;
    },
    cubicle: (r, w, d) => {
      const s = [];
      for (let k = r.int(0, 4); k > 0; k--) s.push(['box', 'blackPlastic', 0.09, 0.003, 0.094, r.range(-0.08, 0.08), 0.0015 + k * 0.003, r.range(-0.1, 0.1), 0, r.range(-0.3, 0.3)]);
      if (r() < 0.7) s.push(['box', 'paper', 0.21, 0.02, 0.28, 0, 0.01, 0, 0, r.range(-0.15, 0.15)]);
      if (r() < 0.4) s.push(['rbox', 'redPlastic', 0.035, 0.012, 0.12, 0.004, r.range(-0.1, 0.1), 0.03, r.range(-0.1, 0.1), 0, r()]);
      return s;
    },
    safe: (r) => {
      const s = [];
      if (r() < 0.5) for (let k = r.int(1, 4); k > 0; k--) s.push(['box', 'cash', 0.156, 0.02, 0.066, r.range(-0.15, 0.15), 0.01 + k * 0.02, r.range(-0.1, 0.1), 0, r.range(-0.2, 0.2)]);
      if (r() < 0.7) s.push(['box', 'manila', 0.23, 0.02, 0.31, r.range(-0.1, 0.1), 0.01, 0, 0, r.range(-0.2, 0.2)]);
      return s;
    },
  };

  // ------------------------------------------------------------ runtime
  const tmpV = new THREE.Vector3(), tmpQ = new THREE.Quaternion();
  const PROMPT = { wood: ['pr.drawerOpen', 'pr.drawerClose'], metal: ['pr.drawerOpen', 'pr.drawerClose'], safe: ['pr.safeOpen', 'pr.safeClose'] };
  // How likely a loose item of each kind is to be tucked into a drawer nearby rather than left out
  // (Documents only when the level says so with drawer: true, since most of them say where they are:
  // taped to a door, scratched on a wall. Tapes are save points and stay out in the open.)
  const TUCK = { battery: 0.55, almond: 0.3, glowstick: 0.35 };

  class Containers {
    constructor(g) {
      this.g = g; this.list = []; this.moving = new Set();
      this.inst = (g.world && g.world.instMap) || new Map();
    }
    // One entry per piece of furniture with drawers; slots get their interactables
    setup() {
      const g = this.g, L = g.level;
      for (const p of L.props) {
        const f = FURN[p.type];
        if (!f || p.noDrawers) continue;
        const m = new THREE.Matrix4().compose(new THREE.Vector3(p.x, p.y || 0, p.z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), p.rot || 0), new THREE.Vector3(p.sx || 1, p.sy || 1, p.sz || 1));
        const c = { p, f, m, slots: [] };
        f.slots.forEach((s, k) => {
          const sl = { c, s, k, open: 0, target: 0, dyn: null, items: [], junkDone: false, pos: new THREE.Vector3(), locked: s.door && p.code ? p.code : null };
          this.handlePos(sl);
          c.slots.push(sl);
          g.interactables.push({
            kind: 'drawer', ref: sl, pos: sl.pos, reach: 1.8,
            prompt: () => this.prompt(sl),
            act: () => this.toggle(sl),
          });
        });
        this.list.push(c);
      }
      if (this.list.length) this.warmSet();
      return this;
    }
    // Opening a drawer shows plain (not instanced) meshes with materials that may not be on screen yet.
    // A speck of each, out of sight under the floor, gets their shaders compiled with the rest of the
    // level, so the first drawer you open does not stall the frame.
    warmSet() {
      const w = this.g.world, keys = new Set(['drawerBox', 'drawerSteel', 'safeInner']);
      for (const c of this.list) for (const sl of c.slots) for (const sp of sl.s.front) keys.add(sp[1]);
      const r = U.rng(5);
      for (const k in JUNK) for (let t = 0; t < 6; t++) for (const sp of JUNK[k](r, 0.4, 0.5)) keys.add(sp[1]);
      const grp = new THREE.Group(), geo = new THREE.BoxGeometry(0.001, 0.001, 0.001);
      // (far outside any view: compiled with the level, never drawn)
      for (const k of keys) { const m = new THREE.Mesh(geo, w.mat(k)); m.position.set(-5000, -5000, -5000); m.userData.noPrepass = true; m.userData.noSupport = true; grp.add(m); }
      w.group.add(grp);
    }
    prompt(sl) {
      if (this.g.player.hidden) return null;
      if (sl.locked) return PB.t('pr.safeLocked');
      const k = PROMPT[sl.s.kind] || PROMPT.wood;
      return PB.t(sl.target > 0.5 ? k[1] : k[0]);
    }
    // World point of the pull (where you reach for it), following the drawer or door
    handlePos(sl) {
      const s = sl.s, n = s.n;
      if (s.door) {
        const a = sl.open * s.swing, hx = s.hinge[0], hz = s.hinge[1];
        const lx = -0.51, lz = 0.08;   // the handle, relative to the hinge when closed
        tmpV.set(hx + lx * Math.cos(a) + lz * Math.sin(a), s.c[1], hz - lx * Math.sin(a) + lz * Math.cos(a));
      } else {
        const out = 0.03 + sl.open * s.travel;
        tmpV.set(s.c[0] + n[0] * out, s.c[1], s.c[2] + n[2] * out);
      }
      sl.pos.copy(tmpV.applyMatrix4(sl.c.m));
    }
    toggle(sl) {
      const g = this.g;
      if (sl.locked) {
        g.state = 'keypad'; g.input.exitLock(); g.ignoreUnlock = true;
        g.ui.showKeypad(code => {
          if (code !== sl.locked) return false;
          sl.locked = null;
          setTimeout(() => this.toggle(sl), 350);
          return true;
        }, () => { g.state = 'play'; g.ignoreUnlock = false; g.suppressPauseUntil = performance.now() + 250; if (!g.ui.touch && !g.input.lockFailed) g.input.requestLock(); });
        return;
      }
      sl.target = sl.ajar || sl.target <= 0.5 ? 1 : 0;
      sl.ajar = false;
      if (!sl.dyn) this.makeDynamic(sl);
      this.moving.add(sl);
      if (g.audio) g.audio.drawer(sl.s.kind, sl.target > 0.5, { x: sl.pos.x, y: sl.pos.y, z: sl.pos.z });
      if (g.noise) g.noise(sl.pos.x, sl.pos.z, sl.s.kind === 'wood' ? 2.5 : 4.5);
    }
    // Swap the instanced front for a moving copy with the drawer's box and contents
    makeDynamic(sl) {
      const g = this.g, w = g.world, s = sl.s, c = sl.c;
      // a varied piece's fronts are its own variant (PB.Variety)
      const def = c.p.vk && PB.Variety ? PB.Variety.sub(s.def, c.p.type, g.level.theme, c.p.vk) : s.def;
      const rec = this.inst.get(def);
      if (rec) {
        const idx = rec.list.indexOf(c.p);
        if (idx >= 0) for (const im of rec.meshes) { im.setMatrixAt(idx, new THREE.Matrix4().makeScale(0, 0, 0)); im.instanceMatrix.needsUpdate = true; }
      }
      const root = new THREE.Group();
      root.matrixAutoUpdate = false; root.matrix.copy(c.m); root.matrixWorldNeedsUpdate = true;
      const mover = new THREE.Group();
      root.add(mover);
      const inner = new THREE.Group();   // front parts in furniture space (moved by the mover)
      mover.add(inner);
      for (const part of P.build(def, P.DEFS[def] || s.front)) {
        const mesh = new THREE.Mesh(part.geo, w.mat(part.mat));
        mesh.castShadow = true; mesh.receiveShadow = true;
        inner.add(mesh);
      }
      if (s.door) {
        // pivot at the hinge
        mover.position.set(s.hinge[0], 0, s.hinge[1]);
        inner.position.set(-s.hinge[0], 0, -s.hinge[1]);
      } else {
        // the drawer box, in the drawer's own frame (front face at the origin, facing +z)
        const box = new THREE.Group();
        const bm = w.mat(s.box || 'drawerBox');
        const iw = s.w - 0.03, ih = s.h - 0.04, d = s.depth;
        const part = (bw, bh, bd, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), bm); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; box.add(m); };
        const y0 = -s.h / 2 + 0.018;
        part(iw, 0.012, d - 0.01, 0, y0, -d / 2);
        part(0.012, ih, d - 0.01, -iw / 2 + 0.006, y0 + ih / 2, -d / 2);
        part(0.012, ih, d - 0.01, iw / 2 - 0.006, y0 + ih / 2, -d / 2);
        part(iw, ih, 0.012, 0, y0 + ih / 2, -d + 0.011);
        box.position.set(s.c[0], s.c[1], s.c[2]);
        box.rotation.y = Math.atan2(s.n[0], s.n[2]);
        box.userData.floor = y0 + 0.006;
        mover.add(box);
        sl.box = box;
      }
      sl.dyn = { root, mover };
      w.group.add(root);
      root.updateMatrixWorld(true);
      if (!sl.junkDone) this.fillJunk(sl);
    }
    fillJunk(sl) {
      sl.junkDone = true;
      const s = sl.s, fn = JUNK[s.junk];
      if (!fn) return;
      const L = this.g.level, key = Math.round(sl.c.p.x * 7) * 131 + Math.round(sl.c.p.z * 7) * 17 + sl.k;
      const r = U.rng(key + (L.def && L.def.seed || 0));
      // A drawer holding something you came for keeps the clutter to one side
      if (sl.items.length && r() < 0.5) return;
      const beds = s.door ? s.bed : [null];
      for (const b of beds) {
        const specs = fn(r, s.w - 0.05, s.depth - 0.04);
        if (!specs.length) continue;
        const grp = new THREE.Group();
        for (const part of P.build('junk:' + s.junk + ':' + key + ':' + (b ? b[1] : 0), specs)) {
          const mesh = new THREE.Mesh(part.geo, this.g.world.mat(part.mat));
          mesh.castShadow = true; mesh.receiveShadow = true;
          grp.add(mesh);
        }
        if (s.door) { grp.position.set(b[0], b[1], b[2]); this.g.world.group.add(grp); grp.matrixAutoUpdate = false; grp.updateMatrix(); grp.matrix.premultiply(sl.c.m); grp.matrixWorldNeedsUpdate = true; }
        else { grp.position.set(0, sl.box.userData.floor + 0.006, -s.depth / 2); sl.box.add(grp); }
      }
    }
    // Put a game item into a slot: it rides with the drawer, and can only be seen and taken once open
    stow(sl, o, r) {
      const s = sl.s;
      let lp;
      if (s.door) { const b = s.bed[sl.items.length % s.bed.length]; lp = new THREE.Vector3(b[0] + r.range(-0.12, 0.12), b[1], b[2] + r.range(-0.08, 0.08)); }
      else {
        // drawer frame → furniture frame
        const a = Math.atan2(s.n[0], s.n[2]), fx = r.range(-s.w / 2 + 0.12, s.w / 2 - 0.12) * 0.6, fz = -s.depth * r.range(0.35, 0.55);
        lp = new THREE.Vector3(s.c[0] + fx * Math.cos(a) + fz * Math.sin(a), s.c[1] - s.h / 2 + 0.03, s.c[2] - fx * Math.sin(a) + fz * Math.cos(a));
      }
      o.container = { sl, local: lp, yaw: (sl.c.p.rot || 0) + Math.atan2(s.n[0], s.n[2]) + r.range(-0.4, 0.4) };
      sl.items.push(o);
      this.placeItem(o);
    }
    placeItem(o) {
      const ct = o.container, sl = ct.sl, s = sl.s;
      tmpV.copy(ct.local);
      if (s.door) {
        // contents stay put; the door just swings away from them
      } else {
        const out = sl.open * s.travel;
        tmpV.x += s.n[0] * out; tmpV.z += s.n[2] * out;
      }
      tmpV.applyMatrix4(sl.c.m);
      o.pos.copy(tmpV);
      if (o.mesh) { o.mesh.position.copy(tmpV); o.mesh.rotation.y = ct.yaw; o.baseY = tmpV.y; o.mesh.visible = sl.open > 0.25; }
      if (o.interactPos) o.interactPos.set(tmpV.x, tmpV.y + 0.1, tmpV.z);
    }
    // Is this item still shut away in a drawer or safe?
    hidden(o) { return !!(o.container && o.container.sl.open < 0.5); }
    // Tuck some of the level's loose items into drawers near where they were dropped, and leave a spare
    // battery in a few drawers
    distribute() {
      const g = this.g, L = g.level;
      if (!this.list.length) return;
      const r = U.rng((L.def && L.def.seed || 1) * 13 + 5);
      const free = () => this.list.flatMap(c => c.slots.filter(sl => !sl.items.length && !(sl.s.h < 0.1)));
      for (const o of g.items) {
        const it = o.item;
        if (o.taken || !o.mesh || it.inDrawer === false) continue;
        const onWall = it.d >= 0 && (it.wy || 0) > 0.5;
        if (onWall) continue;
        const pr = it.inDrawer || it.drawer ? 1 : it.place === 'spot' || it.place === 'near' ? 0 : TUCK[o.type] || 0;
        if (!pr || r() >= pr) continue;
        let best = null, bd = it.inDrawer ? 40 : it.drawer ? 14 : 8;
        for (const sl of free()) {
          if (sl.locked && !it.inSafe) continue;
          const d = Math.hypot(sl.pos.x - o.pos.x, sl.pos.z - o.pos.z);
          if (d < bd && (it.inDrawer || L.los(o.pos.x, o.pos.z, sl.pos.x, sl.pos.z))) { bd = d; best = sl; }
        }
        if (best) this.stow(best, o, r);
      }
      // Spare batteries: roughly one for every eight pieces of furniture, never more than three
      const want = Math.min(3, Math.floor(this.list.length / 8 + r()));
      const pool = free().filter(sl => !sl.locked);
      for (let k = 0; k < want && pool.length; k++) {
        const sl = pool.splice(r.int(0, pool.length - 1), 1)[0];
        const o = g.spawnItem({ id: 'dbat_' + (L.def && L.def.id) + '_' + k, type: 'battery', wx: sl.pos.x, wz: sl.pos.z, wy: sl.pos.y, d: -1, inDrawer: true });
        if (o) this.stow(sl, o, r);
      }
      // A drawer with something in it is left a finger's width open (a safe door just off its latch):
      // the one tell the game gives, and the same in every chapter
      for (const c of this.list) for (const sl of c.slots) if (sl.items.length && !sl.locked) this.setAjar(sl);
    }
    setAjar(sl) {
      sl.open = sl.target = sl.s.door ? 0.035 : 0.09;
      this.makeDynamic(sl);
      if (sl.s.door) sl.dyn.mover.rotation.y = sl.open * sl.s.swing;
      else { const out = sl.open * sl.s.travel; sl.dyn.mover.position.set(sl.s.n[0] * out, 0, sl.s.n[2] * out); }
      sl.dyn.root.updateMatrixWorld(true);
      this.handlePos(sl);
      for (const o of sl.items) this.placeItem(o);
      sl.target = 0;   // one press opens it the rest of the way
      sl.ajar = true;
    }
    update(dt) {
      for (const sl of this.moving) {
        const s = sl.s;
        const speed = s.door ? 1.1 : s.kind === 'metal' ? 3.2 : 2.6;
        const prev = sl.open;
        sl.open = U.damp(sl.open, sl.target, speed * 2.2, dt);
        if (Math.abs(sl.open - sl.target) < 0.002) { sl.open = sl.target; this.moving.delete(sl); }
        if (s.door) sl.dyn.mover.rotation.y = sl.open * s.swing;
        else { const out = sl.open * s.travel; sl.dyn.mover.position.set(s.n[0] * out, 0, s.n[2] * out); }
        sl.dyn.root.updateMatrixWorld(true);
        this.handlePos(sl);
        for (const o of sl.items) if (!o.taken) this.placeItem(o);
        if (prev !== sl.open && sl.open === 0 && sl.target === 0 && this.g.audio && s.kind !== 'safe') this.g.audio.drawerShut(s.kind, { x: sl.pos.x, y: sl.pos.y, z: sl.pos.z });
      }
    }
  }

  PB.Containers = { FURN, JUNK, Containers, create: g => new Containers(g).setup() };
})(typeof window !== 'undefined' ? window : globalThis);
