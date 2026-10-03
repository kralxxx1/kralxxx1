/* Models for Hollow Creek, a copper mine on the night of 3 March 1956: timber sets and lagging, rail
   track, ore tubs and a battery locomotive, the cage and the shaft gates, the tally board with its brass
   tags, the signal bell and the mine telephone, the fire door in its concrete bulkhead, vent tubing and air
   pipes, timber cribs, rubble, a diesel generator, powder boxes; on the surface the timber headframe with
   its sheave wheel, the winding drum, the dry with the miners' clothes hung up on chains, the lamp room
   rack, a canary in its cage, Arvid Lund's tobacco tin. Same spec conventions as props.js / models.js. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  // the seven names on the board whose hooks are empty (STORY.md, Hollow Creek)
  const SEVEN = [[12, 'E. NYGAARD'], [17, 'J. VIK'], [23, 'T. HOLMBERG'], [24, 'K. HOLMBERG'], [30, 'A. SKOG'], [35, 'P. MOEN'], [38, 'B. ULSTEIN']];
  const NAMES = ['O. BERG', 'L. DAHL', 'H. EIDE', 'S. FOSS', 'G. HAUGEN', 'R. LIE', 'M. NESS', 'T. ROE', 'V. SAND', 'I. STRAND', 'N. TANGEN', 'F. UNDSET', 'C. VOLD', 'D. AAS', 'E. BAKKE', 'K. BREKKE', 'P. DALE', 'A. FJELL', 'J. GRAN', 'S. HOLM', 'O. JOHNSEN', 'L. KVAM', 'H. LUND', 'R. MYHRE', 'B. NILSEN', 'T. ODDEN', 'G. RUUD', 'M. SKARE', 'V. TVEIT', 'N. VIKEN', 'E. ØYEN', 'F. RØD', 'K. SÆTRE', 'A. LIEN'];
  const BOARD = { cols: 7, rows: 6, x0: -0.96, dx: 0.32, y0: 1.95, dy: -0.21 };
  // hook number n (1..42) → local position on the board (faces +z)
  const hookPos = n => { const k = n - 1, c = k % BOARD.cols, r = Math.floor(k / BOARD.cols); return [BOARD.x0 + c * BOARD.dx, BOARD.y0 + r * BOARD.dy, 0.07]; };
  PB.Mine = { SEVEN, hookPos };

  // ------------------------------------------------------------ textures
  Object.assign(M.tex, {
    tallyNames: () => T.canvas('m6:tally', 1024, 768, (g, w, h) => {
      const r = U.rng(1956);
      g.fillStyle = '#4a3828'; g.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 3) { g.fillStyle = `rgba(0,0,0,${r.range(0.02, 0.08)})`; g.fillRect(0, y, w, 1); }
      g.fillStyle = '#e8dcb8'; g.font = `bold 44px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText('400 LEVEL — EAST SECTION', w / 2, 56);
      g.font = `16px ${T.FONTS.FONT_TYPE}`; g.fillText('HANG YOUR TAG WHEN YOU GO IN.  TAKE IT WHEN YOU COME OUT.', w / 2, 84);
      // the plates under the hooks: number and name
      const sevenAt = new Map(SEVEN);
      let ni = 0;
      for (let n = 1; n <= 42; n++) {
        const [x, y] = hookPos(n), px = (x + 1.2) / 2.4 * w, py = (2.25 - y) / 1.5 * h + 26;
        g.fillStyle = '#d8ccaa'; g.fillRect(px - 60, py, 120, 30);
        g.fillStyle = '#2a2018'; g.font = `bold 13px ${T.FONTS.FONT_TYPE}`; g.fillText(String(n), px, py + 12);
        g.font = `11px ${T.FONTS.FONT_TYPE}`; g.fillText(sevenAt.get(n) || NAMES[ni++ % NAMES.length], px, py + 26);
      }
    }),
    dangerLabel: () => T.canvas('m6:danger', 256, 128, (g, w, h) => { g.fillStyle = '#c8a040'; g.fillRect(0, 0, w, h); g.fillStyle = '#8a1a14'; g.font = `bold 40px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('DANGER', w / 2, 52); g.font = `bold 22px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.fillText('KEEP FROM FLAME', w / 2, 96); }),
    levelSign: () => T.canvas('m6:levelSign', 512, 256, (g, w, h) => { g.fillStyle = '#1a1a18'; g.fillRect(0, 0, w, h); g.fillStyle = '#e8e0c8'; g.font = `bold 120px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('400', w / 2, 140); g.font = `bold 36px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.fillText('FT LEVEL', w / 2, 200); }),
    canarySign: () => T.canvas('m6:canarySign', 512, 256, (g, w, h) => {
      g.fillStyle = '#e8e0c8'; g.fillRect(0, 0, w, h); g.strokeStyle = '#7a1a14'; g.lineWidth = 8; g.strokeRect(8, 8, w - 16, h - 16);
      g.fillStyle = '#7a1a14'; g.font = `bold 38px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('400 LEVEL', w / 2, 62);
      g.fillStyle = '#1a1a1a'; g.font = `bold 30px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.fillText('A CANARY GOES DOWN', w / 2, 120); g.fillText('WITH EVERY PARTY', w / 2, 160);
      g.font = `20px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.fillText('By order. — A. Lund, foreman', w / 2, 214);
    }),
  });
  Object.assign(M.MATS, {
    mineTimber: { color: 0x4a3a28, rough: 0.95 }, timberWet: { color: 0x33281e, rough: 0.7, refl: 0.05 }, mineRail: { color: 0x5a524a, rough: 0.45, metal: 0.85 }, sleeper: { color: 0x2e261e, rough: 0.95 },
    tubRust: { color: 0x5a3a26, rough: 0.65, metal: 0.6 }, locoGreen: { color: 0x34443a, rough: 0.5, metal: 0.5 }, brassTag: { color: 0xb08a3a, rough: 0.32, metal: 0.95, refl: 0.2 },
    tallyWood: { color: 0x4a3828, rough: 0.8 }, tallyNames: { tex: 'tallyNames', rough: 0.85 }, cageSteel: { color: 0x40464a, rough: 0.5, metal: 0.75 }, fireSteel: { color: 0x5a5852, rough: 0.6, metal: 0.7 },
    soot: { color: 0x141210, rough: 1 }, fireConcrete: { color: 0x55524c, rough: 0.95 }, ventCanvas: { color: 0x8a7a48, rough: 1 }, powderWood: { color: 0x7a5c3a, rough: 0.9 }, dangerLabel: { tex: 'dangerLabel', rough: 0.7 },
    capLamp: { color: 0x202020, rough: 0.4, metal: 0.3 }, lampGlass: { color: 0xe8e0c8, rough: 0.05, refl: 0.4 }, canary: { color: 0xe8c020, rough: 0.7 }, wire: { color: 0x9a7a3a, rough: 0.35, metal: 0.9 },
    tinRed: { color: 0x8a2018, rough: 0.35, metal: 0.6 }, minerCloth: { color: 0x3a3a34, rough: 1 }, minerCloth2: { color: 0x4a3e2e, rough: 1 }, minerCloth3: { color: 0x2a3440, rough: 1 }, rubber: { color: 0x141414, rough: 0.7 },
    genYellow: { color: 0x9a7a20, rough: 0.5, metal: 0.4 }, snowPack: { color: 0xd8dee6, rough: 0.85 }, levelSign: { tex: 'levelSign', rough: 0.6 }, canarySign: { tex: 'canarySign', rough: 0.7 },
    ropeSteel: { color: 0x4a4a48, rough: 0.4, metal: 0.9 }, drumRed: { color: 0x6a1a14, rough: 0.5, metal: 0.4 },
  });

  // ------------------------------------------------------------ underground
  // A timber set across a drift running along z: two posts, a cap, lagging boards over it. Origin: drift
  // centre on the floor; w is the drift width
  const timberSet = (w = 2.7, hgt = 2.55) => {
    const s = [];
    for (const sx of [-1, 1]) { s.push(['box', 'mineTimber', 0.24, hgt, 0.24, sx * (w / 2 - 0.12), hgt / 2, 0, 0, 0, sx * -0.04]); s.push(['box', 'timberWet', 0.26, 0.2, 0.26, sx * (w / 2 - 0.12), 0.1, 0]); }
    s.push(['box', 'mineTimber', w + 0.1, 0.26, 0.26, 0, hgt + 0.08, 0]);
    for (let k = -4; k <= 4; k++) s.push(['box', 'mineTimber', 0.18, 0.05, 1.5, k * 0.3, hgt + 0.24, 0, 0, 0, (k % 2) * 0.03]);
    return s;
  };
  D.timberSet = timberSet();
  D.timberSetWide = timberSet(5.6, 3.2);
  D.timberBroken = [...timberSet().slice(0, 4), ['box', 'mineTimber', 2.6, 0.26, 0.26, 0.2, 1.6, 0.1, 0, 0.2, -0.75], ...[-2, 0, 2].map(k => ['box', 'mineTimber', 0.18, 0.05, 1.4, k * 0.3, 0.4 + k * 0.2, 0.2, 0.5, 0, 0.3])];
  // 3 m of 600 mm track along z
  D.railTrack = (() => {
    const s = [];
    for (const x of [-0.3, 0.3]) s.push(['box', 'mineRail', 0.05, 0.08, 3.0, x, 0.1, 0], ['box', 'mineRail', 0.1, 0.02, 3.0, x, 0.065, 0]);
    for (let z = -1.35; z <= 1.36; z += 0.5) s.push(['box', 'sleeper', 1.0, 0.1, 0.18, 0, 0.05, z]);
    return s;
  })();
  // An ore tub on the rails: a riveted box body tipped on a frame, four wheels
  D.mineTub = [
    ['ext', 'tubRust', [[-0.55, 0], [0.55, 0], [0.65, 0.62], [-0.65, 0.62]], 1.0, 0.01, 0, 0.32, 0, 0, H, 0],
    ['box', 'tubRust', 1.04, 0.04, 1.34, 0, 0.95, 0, 0, 0, 0], ['box', 'black', 0.9, 0.02, 1.2, 0, 0.9, 0],
    ['box', 'castIron', 0.12, 0.12, 1.3, 0, 0.26, 0], ...[-0.3, 0.3].flatMap(x => [-0.45, 0.45].map(z => ['cyl', 'castIron', 0.15, 0.15, 0.07, 14, x, 0.16, z, 0, 0, H])),
    ['box', 'castIron', 0.1, 0.08, 0.15, 0, 0.3, 0.72], ['box', 'castIron', 0.1, 0.08, 0.15, 0, 0.3, -0.72],
    ['sph', 'rockGrey', 0.45, 0, 0.92, 0, 8, 5, [0.65, 0.35, 1.15]],
  ];
  // Battery locomotive: low body, the driver's step, a headlamp, wheels under the frame
  D.mineLoco = [
    ['rbox', 'locoGreen', 0.9, 0.85, 2.2, 0.04, 0, 0.62, -0.1], ['rbox', 'locoGreen', 0.9, 0.3, 0.6, 0.03, 0, 0.35, 1.1], ['box', 'black', 0.86, 0.05, 2.6, 0, 0.18, 0.1],
    ...[-0.3, 0.3].flatMap(x => [-0.7, 0.6].map(z => ['cyl', 'castIron', 0.18, 0.18, 0.08, 16, x, 0.18, z, 0, 0, H])),
    ['cyl', 'chrome', 0.09, 0.09, 0.08, 14, 0, 0.9, -1.24, H, 0, 0], ['cyl', 'lampGlass', 0.075, 0.075, 0.01, 14, 0, 0.9, -1.285, H, 0, 0],
    ['box', 'black', 0.6, 0.2, 0.3, 0, 1.12, 0.3], ['cyl', 'chrome', 0.02, 0.02, 0.4, 6, 0.3, 1.0, 1.05, 0.5, 0, 0],
  ];
  // The tally board (wall, faces +z): 42 hooks in 6 rows with name plates; tags on all but the seven
  D.tallyBoard = (() => {
    const s = [['rbox', 'tallyWood', 2.5, 1.55, 0.05, 0.01, 0, 1.5, 0.025], ['box', 'tallyNames', 2.4, 1.5, 0.002, 0, 1.5, 0.052], ...M.frame('mineTimber', 2.6, 1.65, 0.08, 0.07, 0, 1.5, 0.03)];
    const empty = new Set(SEVEN.map(x => x[0]));
    const r = U.rng(42);
    for (let n = 1; n <= 42; n++) {
      const [x, y] = hookPos(n);
      s.push(['cyl', 'chrome', 0.006, 0.006, 0.05, 6, x, y, 0.075, H, 0, 0]);
      // most men came out: their tags are gone. A few hang (the ones on the night shift elsewhere)
      if (!empty.has(n) && r() < 0.35) s.push(['cyl', 'brassTag', 0.035, 0.035, 0.004, 18, x, y - 0.045, 0.085, H, 0, 0]);
    }
    return s;
  })();
  D.tallyTag = [['cyl', 'brassTag', 0.035, 0.035, 0.004, 18, 0, 0.002, 0], ['torus', 'brassTag', 0.008, 0.0025, 8, 0, 0, 0.002, 0.03, H, 0, 0]];
  D.tobaccoTin = [['rbox', 'tinRed', 0.11, 0.022, 0.075, 0.008, 0, 0.011, 0], ['rbox', 'brass', 0.112, 0.006, 0.077, 0.004, 0, 0.024, 0], ['box', 'labelCard', 0.06, 0.001, 0.035, 0, 0.0275, 0]];
  D.signalBell = [['rbox', 'castIron', 0.25, 0.3, 0.12, 0.02, 0, 0, 0.06], ['lathe', 'brass', [[0.001, 0.0], [0.11, -0.01], [0.12, -0.05], [0.08, -0.07], [0.001, -0.07]], 20, 0, -0.18, 0.15, H, 0, 0], ['cyl', 'chrome', 0.01, 0.01, 0.16, 6, 0.12, -0.05, 0.14], ['tube', 'string', [[0.2, 0, 0.1], [0.25, -0.6, 0.1], [0.25, -1.1, 0.12]], 0.006, 4], ['sph', 'tallyWood', 0.03, 0.25, -1.12, 0.12, 8, 6]];
  D.minePhone = [['rbox', 'tallyWood', 0.24, 0.36, 0.14, 0.02, 0, 0, 0.07], ['cyl', 'black', 0.025, 0.03, 0.2, 10, -0.17, 0.02, 0.1], ['cyl', 'chrome', 0.04, 0.04, 0.02, 12, 0, 0.1, 0.15, H, 0, 0], ['box', 'chrome', 0.015, 0.1, 0.015, 0.14, 0.0, 0.12, 0, 0, 0.4], ['sph', 'black', 0.015, 0.17, -0.04, 0.12, 6, 4]];
  // The cage: steel frame, mesh sides, a folding gate on the front (+z), a roof with a hatch
  D.mineCage = (() => {
    const s = [], w = 1.9, d = 1.4, hgt = 2.4;
    s.push(['box', 'cageSteel', w, 0.08, d, 0, 0.04, 0], ['box', 'cageSteel', w, 0.06, d, 0, hgt, 0], ['box', 'black', 0.6, 0.02, 0.6, 0.4, hgt + 0.04, 0]);
    for (const [x, z] of [[-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]]) s.push(['box', 'cageSteel', 0.06, hgt, 0.06, x, hgt / 2, z]);
    s.push(['box', 'chainLink', w, hgt - 0.1, 0.01, 0, hgt / 2, -d / 2], ['box', 'chainLink', 0.01, hgt - 0.1, d, -w / 2, hgt / 2, 0], ['box', 'chainLink', 0.01, hgt - 0.1, d, w / 2, hgt / 2, 0]);
    for (let k = 0; k < 9; k++) s.push(['box', 'cageSteel', 0.025, 1.7, 0.02, -w / 2 + 0.1 + k * 0.21, 0.95, d / 2, 0, 0, (k % 2 ? 1 : -1) * 0.18]);
    s.push(['box', 'cageSteel', w, 0.04, 0.03, 0, 1.8, d / 2], ['box', 'cageSteel', w, 0.04, 0.03, 0, 0.12, d / 2]);
    s.push(['tube', 'ropeSteel', [[0, hgt, 0], [0, hgt + 6, 0]], 0.025, 6, 2]);
    s.push(['box', 'castIron', 0.12, 0.5, 0.06, -w / 2 + 0.12, 1.2, -d / 2 + 0.08], ['cyl', 'drumRed', 0.025, 0.025, 0.3, 8, -w / 2 + 0.12, 1.5, -d / 2 + 0.2, H, 0, 0]);
    return s;
  })();
  // A folding shaft gate across the cage opening (faces +z), with guide rails either side
  D.shaftGate = (() => { const s = []; for (let k = 0; k < 10; k++) s.push(['box', 'cageSteel', 0.03, 1.4, 0.02, -1.0 + k * 0.22, 0.75, 0, 0, 0, (k % 2 ? 1 : -1) * 0.2]); s.push(['box', 'cageSteel', 2.2, 0.05, 0.04, 0, 1.45, 0], ['box', 'cageSteel', 2.2, 0.05, 0.04, 0, 0.05, 0]); for (const x of [-1.2, 1.2]) s.push(['box', 'mineTimber', 0.2, 3.0, 0.2, x, 1.5, -0.15]); return s; })();
  // The fire door: a concrete bulkhead filling the drift end, a steel door, the bar dropped across, wedges
  D.fireDoor = [
    ['box', 'fireConcrete', 3.0, 3.0, 0.4, 0, 1.5, 0.2], ...[-1.2, -0.4, 0.4, 1.2].map(x => ['box', 'fireConcrete', 0.06, 2.9, 0.06, x, 1.5, 0.41]), ['box', 'fireSteel', 1.15, 1.95, 0.08, 0, 1.0, 0.44], ...M.frame('fireSteel', 1.3, 2.1, 0.08, 0.06, 0, 1.03, 0.46),
    ['box', 'fireSteel', 1.7, 0.12, 0.1, 0, 1.15, 0.53], ...[-0.85, 0.85].map(x => ['box', 'fireSteel', 0.14, 0.24, 0.16, x, 1.15, 0.5]),
    ...[-0.62, 0.62].map(x => ['box', 'mineTimber', 0.12, 0.08, 0.35, x, 0.04, 0.62, 0.2, 0, 0]),
    ['cyl', 'chrome', 0.03, 0.03, 0.1, 8, 0.4, 1.0, 0.5, H, 0, 0],
  ];
  // Canvas vent tubing hung under the roof along z (3 m), pipes along a wall
  D.ventTube = [['cyl', 'ventCanvas', 0.28, 0.28, 3.0, 12, 0, 0, 0, H, 0, 0], ...[-1, 0, 1].map(z => ['torus', 'ventCanvas', 0.29, 0.015, 12, 0, 0, 0, z, 0, 0, 0]), ...[-1, 1].map(z => ['cyl', 'chrome', 0.004, 0.004, 0.4, 4, 0, 0.45, z * 1.2])];
  D.airPipes = [['cyl', 'tubRust', 0.07, 0.07, 3.0, 10, 0, 0, 0, H, 0, 0], ['cyl', 'tubRust', 0.045, 0.045, 3.0, 8, 0, -0.2, 0, H, 0, 0], ...[-1.4, 1.4].map(z => ['torus', 'castIron', 0.075, 0.015, 10, 0, 0, 0, z, 0, 0, 0])];
  D.timberCrib = (() => { const s = []; for (let k = 0; k < 10; k++) { const y = 0.12 + k * 0.24; if (k % 2) for (const z of [-0.6, 0.6]) s.push(['box', 'mineTimber', 1.6, 0.22, 0.22, 0, y, z]); else for (const x of [-0.6, 0.6]) s.push(['box', 'mineTimber', 0.22, 0.22, 1.6, x, y, 0]); } return s; })();
  D.rubble = (() => { const s = [], r = U.rng(77); for (let k = 0; k < 9; k++) s.push(['rock', 'rockGrey', r.range(0.25, 0.6), 100 + k, 1, r.range(0.5, 0.9), 1, r.range(-1.1, 1.1), r.range(0, 0.2), r.range(-0.9, 0.9), r.range(0, 6)]); s.push(['box', 'mineTimber', 2.2, 0.22, 0.22, 0.2, 0.5, 0.1, 0.3, 0.6, 0.4], ['box', 'mineTimber', 1.6, 0.2, 0.2, -0.4, 0.3, -0.4, -0.2, -0.3, 0.2]); return s; })();
  D.dieselGen = [
    ['box', 'castIron', 2.0, 0.15, 0.9, 0, 0.075, 0], ['rbox', 'genYellow', 1.1, 0.75, 0.7, 0.04, -0.2, 0.55, 0], ['rbox', 'genYellow', 0.5, 0.6, 0.6, 0.04, 0.65, 0.45, 0],
    ['box', 'grille', 0.45, 0.6, 0.01, -0.95, 0.55, 0], ['cyl', 'castIron', 0.05, 0.05, 1.3, 10, -0.3, 1.5, -0.2], ['cyl', 'tubRust', 0.07, 0.07, 0.25, 10, -0.3, 2.2, -0.2],
    ['cyl', 'chrome', 0.12, 0.12, 0.05, 16, 0.65, 0.65, 0.33, H, 0, 0], ['box', 'black', 0.3, 0.2, 0.02, 0.1, 0.8, 0.36], ['cyl', 'drumRed', 0.2, 0.2, 0.6, 16, 0.2, 1.15, 0, 0, 0, H],
  ];
  D.powderBoxes = (() => { const s = [], r = U.rng(9); for (let k = 0; k < 6; k++) { const x = (k % 3) * 0.55 - 0.55, y = Math.floor(k / 3) * 0.36 + 0.18; s.push(['rbox', 'powderWood', 0.5, 0.34, 0.36, 0.01, x, y, r.range(-0.03, 0.03), 0, r.range(-0.05, 0.05), 0], ['box', 'dangerLabel', 0.24, 0.12, 0.002, x, y, 0.182]); } return s; })();
  D.hoistPanel = [['rbox', 'fireSteel', 0.5, 0.7, 0.2, 0.02, 0, 1.3, 0.1], ['box', 'black', 0.3, 0.08, 0.004, 0, 1.55, 0.201], ['cyl', 'drumRed', 0.025, 0.025, 0.45, 8, 0.12, 1.18, 0.3, 0.6, 0, 0], ['sph', 'black', 0.04, 0.12, 1.36, 0.42, 10, 8], ['cyl', 'chrome', 0.04, 0.04, 0.02, 12, -0.12, 1.25, 0.21, H, 0, 0], ['tube', 'black', [[0.25, 1.0, 0.1], [0.4, 0.3, 0.1], [0.45, 0.02, 0.1]], 0.02, 5]];
  D.levelSign = [['box', 'levelSign', 0.9, 0.45, 0.02, 0, 0, 0.01]];
  D.canarySign = [['box', 'canarySign', 0.8, 0.4, 0.02, 0, 0, 0.01]];
  // lunch room bench-and-table, a thermos and a tin box on it
  D.lunchTable = [['box', 'mineTimber', 2.2, 0.06, 0.6, 0, 0.75, 0], ...[-0.9, 0.9].map(x => ['box', 'mineTimber', 0.1, 0.72, 0.5, x, 0.36, 0]), ...[-0.55, 0.55].map(z => ['box', 'mineTimber', 2.2, 0.05, 0.28, 0, 0.45, z]), ['cyl', 'drumRed', 0.04, 0.04, 0.28, 10, -0.5, 0.92, 0.05], ['rbox', 'chrome', 0.24, 0.1, 0.15, 0.02, 0.3, 0.83, -0.05]];

  // ------------------------------------------------------------ surface
  // Timber headframe over the shaft (origin at the shaft centre): four legs, girts, the sheave wheel on top,
  // back legs braced toward the winding house (-x)
  D.headframe = (() => {
    const s = [], Ht = 16;
    for (const x of [-1.5, 1.5]) for (const z of [-1.4, 1.4]) s.push(['box', 'mineTimber', 0.32, Ht, 0.32, x * (1 - 0.0), Ht / 2, z]);
    for (let y = 3; y < Ht; y += 3.2) { for (const z of [-1.4, 1.4]) s.push(['box', 'mineTimber', 3.3, 0.22, 0.22, 0, y, z]); for (const x of [-1.5, 1.5]) s.push(['box', 'mineTimber', 0.22, 0.22, 3.1, x, y, 0]); }
    for (const z of [-1.4, 1.4]) { const len = Math.hypot(9, Ht - 1); s.push(['box', 'mineTimber', 0.3, len, 0.3, -6, (Ht - 1) / 2, z, 0, 0, Math.atan2(9, Ht - 1)]); }
    s.push(['box', 'mineTimber', 3.6, 0.3, 3.4, 0, Ht + 0.15, 0]);
    // the sheave wheel turns in the plane of the rope (x-y), on an axle along z
    s.push(['torus', 'castIron', 1.3, 0.08, 28, 0, 0, Ht + 1.3, 0, 0, 0, 0], ['cyl', 'castIron', 0.12, 0.12, 0.5, 12, 0, Ht + 1.3, 0, H, 0, 0]);
    for (let k = 0; k < 6; k++) s.push(['box', 'castIron', 0.05, 2.5, 0.04, 0, Ht + 1.3, 0, 0, 0, k / 6 * PI]);
    for (const z of [-0.5, 0.5]) s.push(['box', 'mineTimber', 0.3, 1.4, 0.3, 0, Ht + 0.85, z * 2.2]);
    s.push(['tube', 'ropeSteel', [[0, Ht + 2.55, 0], [-9, 6, 0], [-14, 2.2, 0]], 0.025, 6, 30], ['tube', 'ropeSteel', [[0.2, Ht + 1.3, 0], [0.2, 2.6, 0]], 0.022, 6, 2]);
    return s;
  })();
  // Winding drum with its rope, brake band, the driver's levers and the depth dial
  D.windingDrum = [
    ['cyl', 'drumRed', 1.1, 1.1, 1.6, 28, 0, 1.3, 0, H, 0, 0], ...[-0.85, 0.85].map(z => ['cyl', 'castIron', 1.3, 1.3, 0.08, 28, 0, 1.3, z, H, 0, 0]),
    ...Array.from({ length: 10 }, (_, k) => ['torus', 'ropeSteel', 1.12, 0.025, 28, 0, 0, 1.3, -0.7 + k * 0.155, 0, 0, 0]),
    ['box', 'castIron', 2.8, 0.4, 0.5, 0, 0.2, 1.1], ['box', 'castIron', 2.8, 0.4, 0.5, 0, 0.2, -1.1], ['cyl', 'chrome', 0.1, 0.1, 2.4, 12, 0, 1.3, 0, H, 0, 0],
    ...[-0.3, 0.3].map(x => ['cyl', 'chrome', 0.03, 0.03, 1.2, 8, x + 1.8, 0.7, 0.9, 0.35, 0, 0]), ...[-0.3, 0.3].map(x => ['sph', 'black', 0.05, x + 1.8, 1.27, 1.1, 8, 6]),
    ['rbox', 'castIron', 0.35, 1.6, 0.25, 0.03, 2.4, 0.8, -0.6], ['box', 'dialFace', 0.18, 1.3, 0.004, 2.4, 0.85, -0.47],
  ];
  // The dry: work clothes hauled up to the roof on chains, boots hanging under them
  D.clothesChains = (() => {
    const s = [], r = U.rng(3), cols = ['minerCloth', 'minerCloth2', 'minerCloth3'];
    for (let k = 0; k < 6; k++) {
      const x = (k % 3) * 0.9 - 0.9, z = Math.floor(k / 3) * 0.9 - 0.45, y = r.range(2.3, 2.7), c = cols[k % 3];
      s.push(['tube', 'chainSteel', [[x, 4.0, z], [x, y + 0.65, z]], 0.008, 4, 2]);
      s.push(['box', 'castIron', 0.4, 0.03, 0.03, x, y + 0.62, z]);
      s.push(['rbox', c, 0.48, 0.62, 0.12, 0.05, x, y + 0.28, z, 0, r.range(-0.4, 0.4), 0]);              // jacket
      s.push(['rbox', c, 0.34, 0.6, 0.1, 0.04, x + 0.05, y - 0.32, z + 0.02, 0, r.range(-0.4, 0.4), 0]);  // trousers
      s.push(['rbox', 'rubber', 0.1, 0.3, 0.22, 0.03, x - 0.08, y - 0.8, z, 0.2, 0, 0], ['rbox', 'rubber', 0.1, 0.3, 0.22, 0.03, x + 0.1, y - 0.82, z, -0.15, 0, 0]);
      if (k % 2) s.push(['sph', 'capLamp', 0.13, x, y + 0.72, z, 10, 6, [1, 0.6, 1.1]]);
    }
    return s;
  })();
  // The lamp room rack (wall, faces +z): rows of cap lamps on charging hooks; four gaps
  D.lampRack = (() => {
    const s = [['box', 'castIron', 2.4, 1.6, 0.04, 0, 1.2, 0.02]];
    for (let row = 0; row < 3; row++) for (let k = 0; k < 8; k++) {
      if ((row * 8 + k) % 7 === 3) continue;
      const x = -1.05 + k * 0.3, y = 0.7 + row * 0.5;
      s.push(['rbox', 'capLamp', 0.16, 0.2, 0.08, 0.02, x, y, 0.08], ['cyl', 'chrome', 0.045, 0.05, 0.06, 12, x, y + 0.2, 0.1, H, 0, 0], ['cyl', 'lampGlass', 0.04, 0.04, 0.005, 12, x, y + 0.2, 0.13, H, 0, 0], ['tube', 'black', [[x, y + 0.1, 0.1], [x + 0.03, y + 0.15, 0.12], [x, y + 0.2, 0.08]], 0.006, 4]);
    }
    return s;
  })();
  // A canary in its cage: a domed brass-wire cage on a ring, the bird on its perch
  D.canaryCage = (() => {
    const s = [['cyl', 'tallyWood', 0.11, 0.12, 0.03, 16, 0, 0.015, 0], ['torus', 'wire', 0.006, 0.004, 8, 0, 0, 0.36, 0, H, 0, 0], ['torus', 'wire', 0.025, 0.003, 10, 0, 0, 0.39, 0, 0, 0, 0]];
    for (let k = 0; k < 14; k++) { const a = k / 14 * PI * 2; s.push(['tube', 'wire', [[Math.cos(a) * 0.105, 0.03, Math.sin(a) * 0.105], [Math.cos(a) * 0.1, 0.24, Math.sin(a) * 0.1], [Math.cos(a) * 0.05, 0.33, Math.sin(a) * 0.05], [0, 0.36, 0]], 0.0018, 3, 8]); }
    s.push(['cyl', 'wire', 0.003, 0.003, 0.2, 4, 0, 0.12, 0, 0, 0, H]);
    s.push(['sph', 'canary', 0.03, 0, 0.16, 0, 10, 8, [0.9, 1, 1.4]], ['sph', 'canary', 0.02, 0, 0.19, 0.03, 8, 6], ['cone', 'tinRed', 0.006, 0.015, 6, 0, 0.19, 0.054, H, 0, 0], ['cone', 'canary', 0.02, 0.06, 6, 0, 0.15, -0.05, -H - 0.4, 0, 0]);
    return s;
  })();
  D.snowPile = [['rock', 'snowPack', 1.2, 5, 1.4, 0.45, 1.0, 0, 0, 0], ['rock', 'snowPack', 0.7, 6, 1, 0.5, 1, 0.9, 0, 0.4, 1.0]];
  D.mineBench = [['box', 'mineTimber', 2.0, 0.06, 0.35, 0, 0.45, 0], ...[-0.85, 0.85].map(x => ['box', 'mineTimber', 0.08, 0.45, 0.3, x, 0.22, 0])];
})(typeof window !== 'undefined' ? window : globalThis);
