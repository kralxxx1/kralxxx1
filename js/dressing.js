/* Set dressing: the small things that make a place look used. Outlets and switch plates, vents, fire
   alarms and extinguishers, thermostats, electrical panels and posters on the walls; smoke detectors,
   air diffusers and missing tiles on the ceiling; boxes, papers, bags, cones, bottles, cables, the odd
   chair and wet-floor sign on the floor. Each theme gets its own mix and density.
   Placed after a layout is generated and before items are, on free wall faces and along walls, clear
   of doors, spawn, the exit and story spots. Wall pieces are flat against the wall's face; floor pieces
   are pushed clear of walls and furniture later (Placement.fitProps). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex;
  const PI = Math.PI, H = PI / 2;

  // Crumpled plastic bag: a sphere pushed out by what is inside, creased, gathered at the neck and
  // sagging flat where it sits. args: radius, seed, x, y (center), z, [sx, sy, sz]
  const bagGeo = new Map();
  P.shapes.bag = a => {
    let g = bagGeo.get(a[1]);
    if (!g) {
      g = new THREE.SphereGeometry(1, 32, 22);
      const p = g.attributes.position, sd = a[1] * 1.7 + 0.3;
      for (let i = 0; i < p.count; i++) {
        let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        const th = Math.atan2(z, x), ring = Math.sqrt(Math.max(0, 1 - y * y));
        const lump = (0.09 * Math.sin(2 * th + sd) * Math.sin(3 * y + sd * 1.3) + 0.06 * Math.sin(3 * th - sd * 0.7 + y * 2)) * ring;
        const crease = (0.025 * Math.sin(11 * th + 5 * y + sd) * Math.sin(7 * y - 3 * th) + 0.015 * Math.sin(23 * th + 13 * y)) * ring;
        let k = 1 + lump + crease;
        if (y > 0.5) k *= 1 - (y - 0.5) * 1.3;
        x *= k; z *= k; y *= 1 + lump * 0.5;
        if (y < -0.62) y = -0.62 + (y + 0.62) * 0.15;
        p.setXYZ(i, x, y, z);
      }
      g.computeVertexNormals();
      bagGeo.set(a[1], g);
    }
    return { g: g.clone().scale(a[0], a[0], a[0]), pos: [a[2], a[3], a[4]], scl: a[5] || [1, 1, 1] };
  };

  Object.assign(M.MATS, {
    ivory: { color: 0xe8e0cc, rough: 0.4, refl: 0.08 },
    alarmRed: { color: 0xa81812, rough: 0.35, refl: 0.12 },
    ceilTile: { color: 0xd4cdb6, rough: 0.95 },
    trashBag: { color: 0x131317, rough: 0.55, refl: 0.06 },
    coneOrange: { color: 0xe0501a, rough: 0.5 },
    signYellow: { tex: 'wetSign', rough: 0.4 },
    bottlePlastic: { color: 0xc8d8dc, rough: 0.1, transparent: true, opacity: 0.55, refl: 0.3 },
    ledRed: { glow: 3, color: 0xff2010 },
    panelGrey: { color: 0x8a9096, rough: 0.45, metal: 0.5 },
    poster0: { tex: 'poster0', rough: 0.8 }, poster1: { tex: 'poster1', rough: 0.8 }, poster2: { tex: 'poster2', rough: 0.8 },
    poster3: { tex: 'poster3', rough: 0.8 }, poster4: { tex: 'poster4', rough: 0.8 }, poster5: { tex: 'poster5', rough: 0.8 },
  });

  // ------------------------------------------------------------ textures
  const poster = (key, draw) => () => T.canvas('dr:' + key, 256, 340, (g, w, h) => { g.fillStyle = '#efe9da'; g.fillRect(0, 0, w, h); draw(g, w, h); const r = U.rng(U.hashStr(key)); for (let k = 0; k < 900; k++) { g.fillStyle = `rgba(90,70,40,${r() * 0.06})`; g.fillRect(r() * w, r() * h, 2, 2); } const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, 'rgba(120,90,40,0.12)'); grd.addColorStop(1, 'rgba(120,90,40,0.02)'); g.fillStyle = grd; g.fillRect(0, 0, w, h); });
  const txt = (g, s, x, y, size, color, weight = 'bold') => { g.fillStyle = color; g.font = `${weight} ${size}px Helvetica, Arial, sans-serif`; g.textAlign = 'center'; g.fillText(s, x, y); };
  Object.assign(M.tex, {
    poster0: poster('safety', (g, w, h) => { g.fillStyle = '#1a5a2a'; g.fillRect(0, 0, w, 90); txt(g, 'SAFETY', w / 2, 55, 40, '#fff'); txt(g, 'FIRST', w / 2, 84, 26, '#fff'); g.strokeStyle = '#1a5a2a'; g.lineWidth = 8; g.beginPath(); g.arc(w / 2, 190, 60, 0, 6.28); g.stroke(); g.fillStyle = '#1a5a2a'; g.fillRect(w / 2 - 10, 150, 20, 80); g.fillRect(w / 2 - 40, 180, 80, 20); txt(g, 'REPORT ALL ACCIDENTS', w / 2, 290, 17, '#222'); txt(g, 'TO YOUR SUPERVISOR', w / 2, 312, 17, '#222'); }),
    poster1: poster('hands', (g, w, h) => { g.fillStyle = '#2a4a8a'; g.fillRect(0, 0, w, h); txt(g, 'WASH', w / 2, 70, 44, '#fff'); txt(g, 'YOUR HANDS', w / 2, 110, 30, '#fff'); g.fillStyle = '#d8e8f8'; for (let k = 0; k < 14; k++) { g.beginPath(); g.arc(60 + (k * 37) % 140, 150 + (k * 53) % 120, 8 + k % 3 * 4, 0, 6.28); g.fill(); } txt(g, 'EMPLOYEES MUST WASH', w / 2, 300, 16, '#fff', 'normal'); txt(g, 'HANDS BEFORE RETURNING', w / 2, 320, 16, '#fff', 'normal'); }),
    poster2: poster('running', (g, w, h) => { g.strokeStyle = '#b01818'; g.lineWidth = 14; g.beginPath(); g.arc(w / 2, 140, 90, 0, 6.28); g.stroke(); g.fillStyle = '#222'; g.beginPath(); g.arc(w / 2 + 10, 90, 14, 0, 6.28); g.fill(); g.lineWidth = 10; g.strokeStyle = '#222'; g.beginPath(); g.moveTo(w / 2 + 5, 105); g.lineTo(w / 2 - 10, 160); g.lineTo(w / 2 + 25, 200); g.moveTo(w / 2 - 10, 160); g.lineTo(w / 2 - 40, 195); g.moveTo(w / 2, 120); g.lineTo(w / 2 + 40, 140); g.moveTo(w / 2, 120); g.lineTo(w / 2 - 35, 130); g.stroke(); g.strokeStyle = '#b01818'; g.lineWidth = 14; g.beginPath(); g.moveTo(w / 2 - 64, 76); g.lineTo(w / 2 + 64, 204); g.stroke(); txt(g, 'NO RUNNING', w / 2, 290, 34, '#222'); txt(g, 'IN THE HALLWAYS', w / 2, 318, 18, '#444'); }),
    poster3: poster('hang', (g, w, h) => { g.fillStyle = '#6a8ab8'; g.fillRect(20, 20, w - 40, 220); g.strokeStyle = '#5a3a1a'; g.lineWidth = 6; g.beginPath(); g.moveTo(40, 50); g.lineTo(w - 40, 50); g.stroke(); g.fillStyle = '#e8a040'; g.beginPath(); g.ellipse(w / 2, 120, 36, 44, 0, 0, 6.28); g.fill(); g.beginPath(); g.arc(w / 2, 80, 26, 0, 6.28); g.fill(); g.fillStyle = '#222'; g.fillRect(w / 2 - 12, 72, 6, 6); g.fillRect(w / 2 + 6, 72, 6, 6); txt(g, 'HANG IN THERE!', w / 2, 290, 28, '#333'); }),
    poster4: poster('month', (g, w, h) => { txt(g, 'EMPLOYEE', w / 2, 44, 30, '#8a1a1a'); txt(g, 'OF THE MONTH', w / 2, 72, 22, '#8a1a1a'); g.fillStyle = '#8a7a6a'; g.fillRect(58, 90, 140, 170); g.fillStyle = '#c8b8a0'; g.beginPath(); g.ellipse(w / 2, 160, 38, 48, 0, 0, 6.28); g.fill(); g.fillStyle = '#3a2a1a'; g.fillRect(90, 110, 76, 26); g.fillStyle = '#6a5a4a'; g.fillRect(70, 205, 116, 55); txt(g, 'APRIL 1987', w / 2, 296, 22, '#333'); g.fillStyle = 'rgba(40,20,10,0.8)'; g.fillRect(90, 146, 76, 10); }),
    poster5: poster('read', (g, w, h) => { g.fillStyle = '#d8a018'; g.fillRect(0, 0, w, h); txt(g, 'READ!', w / 2, 90, 64, '#1a2a6a'); g.fillStyle = '#1a2a6a'; g.fillRect(70, 130, 116, 90); g.fillStyle = '#efe9da'; g.fillRect(78, 138, 48, 74); g.fillRect(130, 138, 48, 74); txt(g, 'OPEN A BOOK,', w / 2, 270, 22, '#1a2a6a'); txt(g, 'OPEN YOUR MIND', w / 2, 298, 22, '#1a2a6a'); }),
    wetSign: () => T.canvas('dr:wet', 128, 256, (g, w, h) => { g.fillStyle = '#f2c418'; g.fillRect(0, 0, w, h); g.fillStyle = '#111'; g.fillRect(0, 26, w, 26); txt(g, 'CAUTION', w / 2, 46, 20, '#f2c418'); g.beginPath(); g.moveTo(w / 2, 80); g.lineTo(w / 2 + 34, 140); g.lineTo(w / 2 - 34, 140); g.closePath(); g.lineWidth = 5; g.strokeStyle = '#111'; g.stroke(); txt(g, '!', w / 2, 132, 36, '#111'); txt(g, 'WET', w / 2, 180, 26, '#111'); txt(g, 'FLOOR', w / 2, 208, 22, '#111'); }),
  });

  // ------------------------------------------------------------ models
  // Wall pieces: back against the wall at z = 0, facing +z, at their real height. Ceiling pieces hang
  // below y = 0 (the prop is placed at ceiling height). Floor pieces stand on y = 0.
  const plate = (y, extra) => [['rbox', 'ivory', 0.07, 0.115, 0.006, 0.002, 0, y, 0.003], ['cyl', 'chrome', 0.0035, 0.0035, 0.002, 8, 0, y + (extra ? 0.047 : 0), 0.0068, H, 0, 0]];
  D.outlet = [...plate(0.32), ...[0.021, -0.021].flatMap(dy => [
    ['rbox', 'ivory', 0.036, 0.031, 0.005, 0.005, 0, 0.32 + dy, 0.008],
    ['box', 'cavity', 0.0028, 0.009, 0.001, -0.0066, 0.323 + dy, 0.0106], ['box', 'cavity', 0.0028, 0.011, 0.001, 0.0066, 0.323 + dy, 0.0106],
    ['cyl', 'cavity', 0.0032, 0.0032, 0.001, 8, 0, 0.312 + dy, 0.0106, H, 0, 0],
  ])];
  D.lightSwitch = [['rbox', 'ivory', 0.07, 0.115, 0.006, 0.002, 0, 1.22, 0.003], ['box', 'cavity', 0.012, 0.026, 0.001, 0, 1.22, 0.0062], ['rbox', 'ivory', 0.009, 0.022, 0.014, 0.003, 0, 1.227, 0.012, -0.35, 0, 0], ['cyl', 'chrome', 0.0035, 0.0035, 0.002, 8, 0, 1.268, 0.0068, H, 0, 0], ['cyl', 'chrome', 0.0035, 0.0035, 0.002, 8, 0, 1.172, 0.0068, H, 0, 0]];
  const vent = y => [['rbox', 'fixtureWhite', 0.42, 0.27, 0.012, 0.003, 0, y, 0.006], ['box', 'cavity', 0.38, 0.23, 0.002, 0, y, 0.0128], ...Array.from({ length: 8 }, (_, k) => ['box', 'fixtureWhite', 0.38, 0.006, 0.022, 0, y - 0.1 + k * 0.0285, 0.013, -0.6, 0, 0])];
  D.wallVentLow = vent(0.3);
  D.wallVentHigh = vent(2.25);
  D.fireAlarm = [['rbox', 'alarmRed', 0.1, 0.13, 0.05, 0.008, 0, 1.3, 0.025], ['rbox', 'fixtureWhite', 0.05, 0.022, 0.022, 0.004, 0, 1.285, 0.058], ['box', 'fixtureWhite', 0.07, 0.018, 0.001, 0, 1.343, 0.0505], ['box', 'alarmRed', 0.05, 0.012, 0.012, 0, 1.285, 0.07]];
  D.extinguisher = [
    ['box', 'alarmRed', 0.2, 0.09, 0.004, 0, 1.52, 0.002], ['box', 'fixtureWhite', 0.16, 0.02, 0.001, 0, 1.52, 0.0045],
    ['box', 'darkMetal', 0.06, 0.1, 0.02, 0, 1.0, 0.01], ['rbox', 'darkMetal', 0.16, 0.025, 0.12, 0.005, 0, 0.94, 0.06],
    ['cyl', 'alarmRed', 0.075, 0.075, 0.42, 20, 0, 0.86, 0.09], ['sph', 'alarmRed', 0.075, 0, 1.07, 0.09, 20, 10, [1, 0.5, 1]],
    ['cyl', 'chrome', 0.02, 0.02, 0.06, 10, 0, 1.12, 0.09], ['rbox', 'blackPlastic', 0.11, 0.012, 0.026, 0.004, 0.02, 1.16, 0.09],
    ['rbox', 'blackPlastic', 0.09, 0.01, 0.022, 0.004, 0.02, 1.13, 0.09, 0, 0, 0.3],
    ['tube', 'blackPlastic', [[0.03, 1.12, 0.09], [0.09, 1.06, 0.13], [0.1, 0.9, 0.15], [0.085, 0.74, 0.14]], 0.009, 6],
    ['cyl', 'gauge', 0.016, 0.016, 0.01, 12, -0.035, 1.12, 0.09, 0, 0, H], ['box', 'labelCard', 0.09, 0.14, 0.002, 0, 0.84, 0.166],
  ];
  D.thermostat = [['rbox', 'beigePlastic', 0.12, 0.085, 0.03, 0.01, 0, 1.45, 0.015], ['cyl', 'bezel', 0.03, 0.03, 0.006, 20, 0.022, 1.45, 0.032, H, 0, 0], ['box', 'cavity', 0.03, 0.014, 0.001, -0.03, 1.46, 0.0305], ['box', 'labelCard', 0.028, 0.012, 0.001, -0.03, 1.46, 0.031]];
  D.electricalPanel = [['rbox', 'panelGrey', 0.4, 0.6, 0.1, 0.008, 0, 1.4, 0.05], ['box', 'cavity', 0.002, 0.56, 0.002, 0.12, 1.4, 0.1005], ['rbox', 'chrome', 0.02, 0.06, 0.012, 0.004, 0.15, 1.4, 0.104], ['box', 'labelCard', 0.14, 0.05, 0.002, -0.05, 1.6, 0.101], ['box', 'alarmRed', 0.06, 0.06, 0.001, -0.05, 1.5, 0.1005, 0, 0, PI / 4], ['cyl', 'panelGrey', 0.018, 0.018, 1.2, 10, 0, 2.3, 0.05]];
  for (let k = 0; k < 6; k++) D['poster' + k] = [['box', 'poster' + k, 0.45, 0.6, 0.002, 0, 1.55, 0.001, 0, 0, (k % 3 - 1) * 0.015], ...[[-0.2, 0.28], [0.2, 0.28], [-0.2, -0.28], [0.2, -0.28]].map(([x, y]) => ['box', 'tape', 0.05, 0.02, 0.001, x, 1.55 + y, 0.0025, 0, 0, 0.7])];
  D.smokeDetector = [['cyl', 'fixtureWhite', 0.065, 0.07, 0.035, 24, 0, -0.018, 0], ['cyl', 'fixtureWhite', 0.04, 0.05, 0.01, 20, 0, -0.04, 0], ['sph', 'ledRed', 0.004, 0.045, -0.035, 0.02, 6, 4]];
  D.ceilingVent = [['rbox', 'fixtureWhite', 0.6, 0.02, 0.6, 0.004, 0, -0.01, 0], ['box', 'cavity', 0.5, 0.002, 0.5, 0, -0.0205, 0], ...[0.48, 0.36, 0.24].map((s, k) => ['rbox', 'fixtureWhite', s, 0.008, s, 0.003, 0, -0.026 - k * 0.012, 0]), ['box', 'fixtureWhite', 0.14, 0.01, 0.14, 0, -0.064, 0]];
  D.ceilHole = [['box', 'cavity', 0.6, 0.004, 0.6, 0, -0.003, 0], ['tube', 'blackPlastic', [[0.1, -0.005, 0.05], [0.12, -0.25, 0.1], [0.08, -0.55, 0.06], [0.1, -0.7, 0.12]], 0.006, 5], ['box', 'ceilTile', 0.2, 0.012, 0.3, -0.2, -0.05, 0.1, 0.9, 0, 0.3]];
  D.fallenTile = [['box', 'ceilTile', 0.6, 0.014, 0.6, 0, 0.007, 0, 0, 0.3, 0.02], ['box', 'ceilTile', 0.28, 0.014, 0.2, 0.46, 0.007, 0.22, 0, 1.1, 0], ['box', 'ceilTile', 0.12, 0.014, 0.09, 0.3, 0.007, -0.38, 0, 2.2, 0]];
  D.boxClosed = [['rbox', 'cardboard', 0.5, 0.36, 0.4, 0.01, 0, 0.18, 0], ['box', 'tape', 0.505, 0.002, 0.06, 0, 0.361, 0], ['box', 'tape', 0.06, 0.12, 0.002, 0, 0.3, 0.201], ['box', 'labelCard', 0.14, 0.09, 0.002, 0.12, 0.2, 0.2012]];
  D.boxOpen = [
    ['box', 'cardboard', 0.5, 0.34, 0.01, 0, 0.17, 0.195], ['box', 'cardboard', 0.5, 0.34, 0.01, 0, 0.17, -0.195], ['box', 'cardboard', 0.01, 0.34, 0.38, 0.245, 0.17, 0], ['box', 'cardboard', 0.01, 0.34, 0.38, -0.245, 0.17, 0],
    ['box', 'cardboard', 0.49, 0.01, 0.38, 0, 0.005, 0], ['box', 'cavity', 0.47, 0.002, 0.36, 0, 0.2, 0],
    ['box', 'cardboard', 0.5, 0.01, 0.19, 0, 0.36, 0.28, -1.1, 0, 0], ['box', 'cardboard', 0.5, 0.01, 0.19, 0, 0.36, -0.28, 1.2, 0, 0],
    ['box', 'paper', 0.21, 0.08, 0.28, 0.05, 0.25, 0, 0.3, 0.2, 0],
  ];
  D.trashBag = [
    ['bag', 'trashBag', 0.24, 1, 0, 0.127, 0, [1, 0.85, 0.9]],
    ['cyl', 'trashBag', 0.03, 0.012, 0.06, 8, 0, 0.36, 0], ['sph', 'trashBag', 0.03, -0.025, 0.4, 0, 8, 6, [1.3, 0.5, 0.7]], ['sph', 'trashBag', 0.03, 0.025, 0.4, 0.01, 8, 6, [1.3, 0.5, 0.7]],
    ['bag', 'trashBag', 0.17, 2, -0.2, 0.08, 0.15, [1, 0.75, 1]], ['sph', 'trashBag', 0.022, -0.2, 0.2, 0.15, 8, 6, [1, 0.7, 1]],
  ];
  D.wetFloorSign = [['box', 'signYellow', 0.3, 0.62, 0.012, 0, 0.3, 0.1, -0.17, 0, 0], ['box', 'signYellow', 0.3, 0.62, 0.012, 0, 0.3, -0.1, 0.17, PI, 0], ['rbox', 'signYellow', 0.2, 0.05, 0.03, 0.01, 0, 0.64, 0]];
  D.cone = [['rbox', 'blackPlastic', 0.36, 0.03, 0.36, 0.01, 0, 0.015, 0], ['lathe', 'coneOrange', [[0.14, 0.03], [0.03, 0.7], [0.001, 0.7]], 20, 0, 0, 0], ['lathe', 'fixtureWhite', [[0.092, 0.28], [0.07, 0.4], [0.068, 0.4], [0.09, 0.28]], 20, 0, 0, 0]];
  D.bottle = [['lathe', 'bottlePlastic', [[0.034, 0], [0.036, 0.01], [0.036, 0.17], [0.016, 0.21], [0.013, 0.235], [0.001, 0.235]], 14, 0, 0, 0], ['cyl', 'bluePlastic', 0.014, 0.014, 0.018, 10, 0, 0.24, 0], ['cyl', 'labelCard', 0.037, 0.037, 0.07, 14, 0, 0.1, 0, 0, 0, 0, true]];
  D.bottleDown = [['lathe', 'bottlePlastic', [[0.034, 0], [0.036, 0.01], [0.036, 0.17], [0.016, 0.21], [0.013, 0.235], [0.001, 0.235]], 14, 0, 0.036, 0, 0, 0, H], ['cyl', 'bluePlastic', 0.014, 0.014, 0.018, 10, -0.245, 0.036, 0, 0, 0, H]];
  D.paperScatter = Array.from({ length: 5 }, (_, k) => ['box', k % 3 ? 'paper' : 'yellowPaper', 0.21, 0.0012, 0.29, Math.sin(k * 2.3) * 0.35, 0.001 + k * 0.0012, Math.cos(k * 1.7) * 0.3, 0, k * 1.3, 0]);
  D.cableCoil = [0, 1, 2].map(k => ['torus', 'blackPlastic', 0.15 - k * 0.006, 0.011, 24, 0, 0.01 * k, 0.011 + k * 0.02, 0.01 * k, H, 0, 0]).concat([['tube', 'blackPlastic', [[0.15, 0.05, 0], [0.3, 0.02, 0.1], [0.5, 0.012, 0.05], [0.7, 0.012, 0.2]], 0.011, 6]]);

  // ------------------------------------------------------------ what goes where
  // [model, where, density per candidate, opts]
  const SETS = {
    yellow: [['outlet', 'wall', 0.05], ['lightSwitch', 'wall', 0.012], ['wallVentLow', 'wall', 0.025], ['thermostat', 'wall', 0.005],
      ['smokeDetector', 'ceil', 0.03], ['ceilingVent', 'ceil', 0.03], ['hole', 'ceil', 0.018],
      ['boxOpen', 'floor', 0.008], ['boxClosed', 'floor', 0.008], ['officeChair', 'floor', 0.006], ['paperScatter', 'floor', 0.015], ['wetFloorSign', 'floor', 0.003], ['cone', 'floor', 0.003], ['bottleDown', 'floor', 0.008], ['bottle', 'floor', 0.004], ['trashBag', 'floor', 0.003], ['cableCoil', 'floor', 0.003]],
    office: [['outlet', 'wall', 0.06], ['lightSwitch', 'wall', 0.02], ['fireAlarm', 'wall', 0.01], ['extinguisher', 'wall', 0.01], ['poster0', 'wall', 0.006], ['poster3', 'wall', 0.006], ['poster4', 'wall', 0.006], ['thermostat', 'wall', 0.01], ['electricalPanel', 'wall', 0.004],
      ['smokeDetector', 'ceil', 0.04], ['ceilingVent', 'ceil', 0.04], ['hole', 'ceil', 0.008],
      ['boxClosed', 'floor', 0.01], ['boxOpen', 'floor', 0.006], ['paperScatter', 'floor', 0.02], ['trashBag', 'floor', 0.003], ['cableCoil', 'floor', 0.004]],
    concrete: [['electricalPanel', 'wall', 0.01], ['fireAlarm', 'wall', 0.01], ['extinguisher', 'wall', 0.012], ['poster0', 'wall', 0.01], ['outlet', 'wall', 0.02], ['wallVentHigh', 'wall', 0.01],
      ['cone', 'floor', 0.008], ['trashBag', 'floor', 0.005], ['cableCoil', 'floor', 0.006], ['boxClosed', 'floor', 0.01], ['wetFloorSign', 'floor', 0.002], ['bottleDown', 'floor', 0.005], ['paperScatter', 'floor', 0.006]],
    school: [['fireAlarm', 'wall', 0.015], ['extinguisher', 'wall', 0.01], ['poster2', 'wall', 0.012], ['poster5', 'wall', 0.012], ['poster3', 'wall', 0.006], ['outlet', 'wall', 0.03], ['lightSwitch', 'wall', 0.02], ['thermostat', 'wall', 0.005],
      ['smokeDetector', 'ceil', 0.03], ['ceilingVent', 'ceil', 0.02], ['hole', 'ceil', 0.006],
      ['paperScatter', 'floor', 0.02], ['boxClosed', 'floor', 0.004], ['trashBag', 'floor', 0.002], ['wetFloorSign', 'floor', 0.002]],
    hospital: [['outlet', 'wall', 0.04], ['fireAlarm', 'wall', 0.01], ['extinguisher', 'wall', 0.01], ['poster1', 'wall', 0.012], ['lightSwitch', 'wall', 0.02], ['wallVentLow', 'wall', 0.01],
      ['smokeDetector', 'ceil', 0.03], ['ceilingVent', 'ceil', 0.03], ['hole', 'ceil', 0.008],
      ['wetFloorSign', 'floor', 0.005], ['paperScatter', 'floor', 0.01], ['trashBag', 'floor', 0.004], ['boxClosed', 'floor', 0.004]],
    motel: [['outlet', 'wall', 0.03], ['lightSwitch', 'wall', 0.02], ['fireAlarm', 'wall', 0.007], ['extinguisher', 'wall', 0.007], ['wallVentLow', 'wall', 0.01],
      ['smokeDetector', 'ceil', 0.02], ['trashBag', 'floor', 0.004], ['bottleDown', 'floor', 0.01], ['paperScatter', 'floor', 0.01]],
    mall: [['fireAlarm', 'wall', 0.01], ['extinguisher', 'wall', 0.01], ['poster3', 'wall', 0.006], ['poster0', 'wall', 0.004], ['outlet', 'wall', 0.02],
      ['smokeDetector', 'ceil', 0.02], ['ceilingVent', 'ceil', 0.02],
      ['wetFloorSign', 'floor', 0.004], ['cone', 'floor', 0.003], ['paperScatter', 'floor', 0.01], ['trashBag', 'floor', 0.003], ['boxClosed', 'floor', 0.01], ['boxOpen', 'floor', 0.006]],
    pool: [['fireAlarm', 'wall', 0.005], ['extinguisher', 'wall', 0.005], ['poster2', 'wall', 0.01], ['wetFloorSign', 'floor', 0.008], ['bottleDown', 'floor', 0.005]],
    workshop: [['electricalPanel', 'wall', 0.015], ['outlet', 'wall', 0.03], ['poster0', 'wall', 0.01], ['extinguisher', 'wall', 0.01],
      ['boxClosed', 'floor', 0.02], ['boxOpen', 'floor', 0.01], ['cableCoil', 'floor', 0.01], ['bottleDown', 'floor', 0.008], ['trashBag', 'floor', 0.005], ['paperScatter', 'floor', 0.01]],
    dark: [['trashBag', 'floor', 0.01], ['bottleDown', 'floor', 0.01], ['paperScatter', 'floor', 0.01], ['cone', 'floor', 0.005], ['wallVentLow', 'wall', 0.01]],
  };
  // Little scenes left in corners of rooms (not corridors): [type, u, v, facing, collider [hw, hd], y]
  // u runs along the first wall away from the corner, v away from that wall; facing 0 = away from it
  const VIGNETTES = {
    officeCorner: [['desk', 1.15, 0.52, 0, [0.9, 0.45]], ['officeChair', 1.2, 1.35, Math.PI + 0.5, null], ['filing', 0.34, 0.4, 0, [0.3, 0.33]]],
    boxPile: [['boxClosed', 0.36, 0.33, 0.1, null], ['boxClosed', 0.9, 0.3, -0.15, null], ['boxOpen', 0.4, 0.82, 0.4, null], ['boxClosed', 0.38, 0.33, 0.25, null, 0.36]],
    vendingNook: [['vending', 0.62, 0.48, 0, [0.45, 0.4]], ['trashCan', 1.35, 0.3, 0, [0.18, 0.18]]],
    coolerSpot: [['waterCooler', 0.4, 0.35, 0, [0.2, 0.2]], ['bottleDown', 0.9, 0.7, 1.2, null]],
    chairStack: [['chairStacks', 0.62, 0.36, 0, [0.52, 0.34]]],
    filingRow: [['filing', 0.4, 0.4, 0, [0.3, 0.33]], ['filing', 1.02, 0.4, 0, [0.3, 0.33]], ['boxOpen', 1.7, 0.4, 0.2, null]],
  };
  const THEME_VIG = {
    yellow: [['officeCorner', 3], ['boxPile', 3], ['chairStack', 1], ['coolerSpot', 1], ['vendingNook', 1], ['filingRow', 1]],
    office: [['boxPile', 2], ['coolerSpot', 2], ['filingRow', 2]],
    school: [['boxPile', 2], ['chairStack', 1]],
    hospital: [['boxPile', 2], ['coolerSpot', 1]],
    mall: [['boxPile', 3], ['vendingNook', 1]],
    dark: [['boxPile', 2], ['officeCorner', 1], ['chairStack', 1]],
    workshop: [['boxPile', 3]],
    concrete: [['boxPile', 2]],
  };
  const VIG_DENSITY = { yellow: 1 / 40, office: 1 / 80, school: 1 / 70, hospital: 1 / 80, mall: 1 / 60, dark: 1 / 45, workshop: 1 / 40, concrete: 1 / 70 };
  // Footprints (half sizes) of the floor pieces for their colliders; smaller things you just walk over
  const COL = { boxClosed: [0.26, 0.21], boxOpen: [0.26, 0.21], officeChair: [0.3, 0.3], wetFloorSign: [0.16, 0.2], cone: [0.18, 0.18], trashBag: [0.24, 0.22] };
  const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0];

  function dress(L, seed) {
    const set = SETS[L.theme];
    if (!set) return 0;
    const r = U.rng((seed || 1) * 31 + 911), C = L.cell;
    // Keep clear of: spawn, the exit room, story spots, doorways
    const avoid = [];
    if (L.spawn) avoid.push([L.spawn.wx != null ? L.spawn.wx : L.cx(L.spawn.x), L.spawn.wz != null ? L.spawn.wz : L.cz(L.spawn.y), 2.2]);
    for (const k in L.spots) for (const s of L.spots[k]) avoid.push([s.wx != null ? s.wx : L.cx(s.x), s.wz != null ? s.wz : L.cz(s.y), 1.2]);
    const exitRoom = L.meta && L.meta.exit && L.meta.exit.room;
    const clear = (x, z, rad) => !avoid.some(a => Math.hypot(a[0] - x, a[1] - z) < a[2] + rad);
    const inExit = (cx, cy) => exitRoom && cx >= exitRoom.x0 && cx <= exitRoom.x1 && cy >= exitRoom.y0 && cy <= exitRoom.y1;
    const doorNear = (cx, cy) => { for (let d = 0; d < 4; d++) if (L.doorAt && L.doorAt(cx, cy, d)) return true; return false; };
    const lightAt = (x, z) => L.lights.some(l => Math.abs(l.x - x) < 0.9 && Math.abs(l.z - z) < 0.9);
    const used = new Set();
    let n = 0;
    for (let cy = 0; cy < L.h; cy++) for (let cx = 0; cx < L.w; cx++) {
      if (!L.passable(cx, cy) || inExit(cx, cy) || (L.floorType && L.floorType[L.i(cx, cy)])) continue;
      const outdoor = L.meta && L.meta.outdoor && L.meta.outdoor[L.i(cx, cy)];
      if (outdoor) continue;
      const walls = L.wallSides(cx, cy);
      for (const [model, where, dens] of set) {
        if (r() >= dens * (where === 'wall' ? walls.length : 1)) continue;
        if (where === 'wall') {
          if (!walls.length || doorNear(cx, cy) && r() < 0.6) continue;
          const d = r.pick(walls), key = cx + ',' + cy + ',' + d;
          if (used.has(key)) continue;
          const along = r.range(-0.95, 0.95), off = C / 2 - 0.1;
          const x = L.cx(cx) + DX[d] * off + (d % 2 === 0 ? along : 0), z = L.cz(cy) + DY[d] * off + (d % 2 === 1 ? along : 0);
          if (!clear(x, z, 0.3)) continue;
          used.add(key);
          L.addProp(model, x, z, Math.atan2(-DX[d], -DY[d]), { wall: true, dressing: true });
          n++;
        } else if (where === 'ceil') {
          const x = L.cx(cx) + r.range(-0.8, 0.8), z = L.cz(cy) + r.range(-0.8, 0.8);
          if (lightAt(x, z) || used.has('c' + cx + ',' + cy)) continue;
          used.add('c' + cx + ',' + cy);
          if (model === 'hole') {
            // A tile missing from the ceiling, and on the floor below it, the tile
            if (!clear(x, z, 0.6) || L.meta.lowCeilingRooms) continue;
            L.addProp('ceilHole', x, z, 0, { y: L.ceil - 0.002, dressing: true });
            L.addProp('fallenTile', x + r.range(-0.3, 0.3), z + r.range(-0.3, 0.3), r() * PI, { dressing: true });
          } else L.addProp(model, x, z, r.pick([0, H]), { y: L.ceil - 0.002, dressing: true });
          n++;
        } else {
          // along a wall, or in a corner
          if (!walls.length || doorNear(cx, cy)) continue;
          const d = r.pick(walls), key = 'f' + cx + ',' + cy;
          if (used.has(key)) continue;
          const col = COL[model], half = col ? Math.max(col[0], col[1]) : 0.2;
          const along = r.range(-0.9, 0.9), off = C / 2 - 0.12 - half;
          const x = L.cx(cx) + DX[d] * off + (d % 2 === 0 ? along : 0), z = L.cz(cy) + DY[d] * off + (d % 2 === 1 ? along : 0);
          if (!clear(x, z, half + 0.4)) continue;
          used.add(key);
          const rot = model === 'wetFloorSign' || model === 'cone' ? r() * PI : Math.atan2(-DX[d], -DY[d]) + r.range(-0.4, 0.4);
          L.addProp(model, x, z, rot, Object.assign({ dressing: true }, col ? { collider: { hw: col[0], hd: col[1] } } : {}));
          n++;
        }
      }
    }
    // Corner scenes: only in room-like corners (both open neighbours open onto more space), clear of spots
    const vig = THEME_VIG[L.theme];
    if (vig) {
      const bag = vig.flatMap(([k, w]) => Array(w).fill(k));
      const target = Math.round(L.w * L.h * (VIG_DENSITY[L.theme] || 0));
      const openN = (x, y) => [0, 1, 2, 3].filter(d => L.passable(x + DX[d], y + DY[d]) && !L.edgeKind(x, y, d) && !(L.doorAt && L.doorAt(x, y, d))).length;
      let placed = 0;
      for (let t = 0; t < target * 12 && placed < target; t++) {
        const cx = r.int(1, L.w - 2), cy = r.int(1, L.h - 2);
        if (!L.passable(cx, cy) || inExit(cx, cy) || doorNear(cx, cy) || used.has('v' + cx + ',' + cy) || (L.floorType && L.floorType[L.i(cx, cy)])) continue;
        if (L.reserved && L.reserved[L.i(cx, cy)]) continue;
        const walls = L.wallSides(cx, cy);
        const pairs = [];
        for (const a of walls) for (const b of walls) if ((a + 1) % 4 === b || (b + 1) % 4 === a) pairs.push([a, b]);
        if (!pairs.length || walls.length > 2) continue;
        const open = [0, 1, 2, 3].filter(d => !walls.includes(d));
        if (open.some(d => !L.passable(cx + DX[d], cy + DY[d]) || openN(cx + DX[d], cy + DY[d]) < 3)) continue;
        const [a, b] = r.pick(pairs);
        const off = C / 2 - 0.1;
        const corner = [L.cx(cx) + DX[a] * off + DX[b] * off, L.cz(cy) + DY[a] * off + DY[b] * off];
        const ia = [-DX[a], -DY[a]], ib = [-DX[b], -DY[b]];
        if (!clear(L.cx(cx), L.cz(cy), 1.8)) continue;
        const kind = r.pick(bag), base = Math.atan2(ia[0], ia[1]);
        for (const [type, u, v, face, col, y] of VIGNETTES[kind]) {
          const x = corner[0] + ib[0] * u + ia[0] * v, z = corner[1] + ib[1] * u + ia[1] * v;
          const rot = base + face;
          const sw = Math.abs(Math.sin(rot)) > 0.7;
          const o = { dressing: true };
          if (col) o.collider = sw ? { hw: col[1], hd: col[0] } : { hw: col[0], hd: col[1] };
          if (y) { o.y = y; o.stacked = true; }
          L.addProp(type, x, z, rot, o);
          n++;
        }
        used.add('v' + cx + ',' + cy);
        used.add('f' + cx + ',' + cy);
        placed++;
      }
    }
    L.dressCount = n;
    return n;
  }

  PB.Dressing = { SETS, dress };
})(typeof window !== 'undefined' ? window : globalThis);
