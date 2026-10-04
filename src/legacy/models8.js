/* Models for Gammel Ostra, a farming village in a valley, on the night of 2 October 1964, the night
   the dam gates closed a week early: gable roofs and chimneys for the houses (scaled to each building),
   the white wooden church's tower and spire, pulpit, pump organ, hymn board, candle chandelier; Signe
   Holm's house (corner fireplace with its mantel, wood stove, rocking chair, a long-case clock, an oil
   lamp still lit), the music box, the school bell, a travel trunk, stone wells with little roofs, the
   footbridge over the old river, rowing boats, dry-stone walls, stumps of the felled trees, notice posts,
   a depth gauge, and the dam: its concrete wall, the sluice gate gear, and the service ladder in its cage.
   Same spec conventions as props.js / models.js. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  Object.assign(M.tex, {
    roofTile: () => { const t = T.get('shingles', 512).map; return t; },
    evacNotice: () => T.canvas('m8:evac', 512, 640, (g, w, h) => {
      g.fillStyle = '#ece6d2'; g.fillRect(0, 0, w, h); g.fillStyle = '#1a1a1a'; g.textAlign = 'center';
      g.font = `bold 34px ${T.FONTS.FONT_TYPE}`; g.fillText('NOTICE', w / 2, 60);
      g.font = `20px ${T.FONTS.FONT_TYPE}`;
      ['OSTRA RIVER REGULATION', '', 'The dam gates will close and', 'the valley will be flooded on', '', 'FRIDAY 9 OCTOBER 1964', '', 'All residents must have left', 'Gammel Ostra by that date.', 'Removal lorries leave from the', 'school yard each morning at 8.', '', 'District Office'].forEach((l, i) => g.fillText(l, w / 2, 120 + i * 34));
      // the date has been corrected by hand on this copy
      g.strokeStyle = '#8a1a14'; g.lineWidth = 4; g.beginPath(); g.moveTo(110, 307); g.lineTo(400, 307); g.stroke();
      g.fillStyle = '#8a1a14'; g.font = `bold 26px ${T.FONTS.FONT_TYPE}`; g.fillText('FRIDAY 2 OCTOBER', w / 2, 340);
      for (let k = 0; k < 40; k++) { g.fillStyle = `rgba(90,70,40,${Math.random() * 0.12})`; g.fillRect(Math.random() * w, Math.random() * h, 30, 80); }
    }),
    hymnBoard: () => T.canvas('m8:hymn', 256, 512, (g, w, h) => { g.fillStyle = '#2a1a12'; g.fillRect(0, 0, w, h); g.fillStyle = '#e8e0c8'; g.font = `bold 64px serif`; g.textAlign = 'center'; ['137', '412', '89', '256'].forEach((n, i) => g.fillText(n, w / 2, 100 + i * 110)); }),
    depthGauge: () => T.canvas('m8:gauge', 128, 1024, (g, w, h) => { g.fillStyle = '#e8e4d8'; g.fillRect(0, 0, w, h); g.fillStyle = '#1a1a1a'; g.textAlign = 'center'; for (let k = 0; k < 20; k++) { const y = h - k * h / 20; g.fillRect(0, y - 3, k % 2 ? 40 : 80, 6); if (k % 2 === 0) { g.font = `bold 40px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.fillText(String(k / 2), 100, y - 10); } } }),
    musicBoxLid: () => T.canvas('m8:mbox', 256, 256, (g, w, h) => { g.fillStyle = '#5a2e1a'; g.fillRect(0, 0, w, h); g.strokeStyle = '#d8b060'; g.lineWidth = 6; g.strokeRect(14, 14, w - 28, h - 28); g.fillStyle = '#c8a050'; for (let k = 0; k < 8; k++) { g.save(); g.translate(w / 2, h / 2); g.rotate(k * PI / 4); g.beginPath(); g.ellipse(0, -46, 14, 34, 0, 0, 6.3); g.fill(); g.restore(); } g.fillStyle = '#a8141a'; g.beginPath(); g.arc(w / 2, h / 2, 16, 0, 6.3); g.fill(); }),
  });
  Object.assign(M.MATS, {
    roofTile: { tex: 'roofTile', color: 0x5a3a2e, rough: 0.85, rep: 3 }, gablePaint: { color: 0xc8b89a, rough: 0.8 }, redPaint: { color: 0x7a1e16, rough: 0.8 }, whitePaint: { color: 0xe0dccc, rough: 0.75 },
    brickChimney: { color: 0x6a3a2a, rough: 0.9 }, churchWhite: { color: 0xe4e0d4, rough: 0.7 }, spireGrey: { color: 0x3a3e42, rough: 0.5, metal: 0.4 }, bronzeBell: { color: 0x8a6a2a, rough: 0.35, metal: 0.95 },
    pewWood: M.MATS.pewWood || { color: 0x5a3a24, rough: 0.6 }, organWood: { color: 0x3a2214, rough: 0.5, refl: 0.08 }, ivoryKey: { color: 0xe8e0c8, rough: 0.3 }, hymnBoard: { tex: 'hymnBoard', rough: 0.6 },
    folkBlue: { color: 0x2a4a6a, rough: 0.7 }, folkRed: { color: 0x8a2a1e, rough: 0.7 }, rosemaling: { color: 0x9a6a2a, rough: 0.6 }, oilGlow: { color: 0xffc070, glow: 2.0 },
    musicBoxLid: { tex: 'musicBoxLid', rough: 0.35, refl: 0.1 }, mahogany: { color: 0x4a2216, rough: 0.35, refl: 0.12 }, dryStone: { color: 0x6a6660, rough: 0.95 }, wetWood: { color: 0x3a3028, rough: 0.6, refl: 0.08 },
    boatGreen: { color: 0x2a4a3a, rough: 0.6 }, damConcrete: { color: 0x8a8a84, rough: 0.9 }, damStain: { color: 0x4a4a44, rough: 0.9 }, evacNotice: { tex: 'evacNotice', rough: 0.8 }, depthGauge: { tex: 'depthGauge', rough: 0.6 },
    ladderSteel: { color: 0x5a5e60, rough: 0.5, metal: 0.8 }, gearGreen: { color: 0x2e4034, rough: 0.5, metal: 0.6 },
  });

  // ------------------------------------------------------------ roofs (scale with sx/sy/sz to the building)
  // Unit gable roof over a 1 x 1 footprint, ridge along x, 0.5 high, with eaves; gable ends painted
  D.roofGable = [['ext', 'gablePaint', [[-0.56, 0], [0.56, 0], [0.0, 0.5]], 1.06, 0, 0, 0, 0, 0, H, 0, 'roofTile'], ['box', 'wetWood', 1.08, 0.015, 0.03, 0, 0.5, 0]];
  D.roofGableRed = [['ext', 'redPaint', [[-0.56, 0], [0.56, 0], [0.0, 0.5]], 1.06, 0, 0, 0, 0, 0, H, 0, 'roofTile']];
  D.chimney = [['box', 'brickChimney', 0.55, 1.6, 0.55, 0, 0.8, 0], ['box', 'dryStone', 0.65, 0.08, 0.65, 0, 1.62, 0]];

  // ------------------------------------------------------------ the church
  // Tower over the west door: square base, belfry with louvres and the bell, a slate spire, a cross
  D.churchTower = (() => {
    const s = [['box', 'churchWhite', 3.2, 9.0, 3.2, 0, 4.5, 0], ['box', 'spireGrey', 3.5, 0.2, 3.5, 0, 9.05, 0]];
    for (const [x, z, ry] of [[0, 1.61, 0], [0, -1.61, 0], [1.61, 0, H], [-1.61, 0, H]]) { for (let k = 0; k < 5; k++) s.push(['box', 'spireGrey', 1.0, 0.06, 0.08, x, 6.9 + k * 0.28, z, 0.5, ry, 0]); }
    s.push(['lathe', 'bronzeBell', [[0.001, 0.55], [0.18, 0.5], [0.3, 0.3], [0.32, 0.08], [0.42, 0.0], [0.001, 0.0]], 24, 0, 7.0, 0]);
    s.push(['cone', 'spireGrey', 2.4, 9.0, 4, 0, 13.6, 0, 0, PI / 4, 0], ['cyl', 'brass', 0.04, 0.04, 1.2, 6, 0, 18.6, 0], ['box', 'brass', 0.6, 0.06, 0.06, 0, 18.8, 0]);
    s.push(['box', 'pewWood', 1.4, 2.4, 0.08, 0, 1.2, 1.64], ['ext', 'churchWhite', [[-0.9, 0], [0.9, 0], [0.9, 2.5], [0, 3.1], [-0.9, 2.5]], 0.12, 0, 0, 0, 1.62]);
    return s;
  })();
  D.pulpit = [['cyl', 'pewWood', 0.55, 0.45, 1.1, 8, 0, 1.45, 0], ['cyl', 'pewWood', 0.15, 0.2, 0.9, 8, 0, 0.45, 0], ['rbox', 'pewWood', 0.5, 0.04, 0.35, 0.01, 0, 2.05, 0.3, -0.4, 0, 0], ['cyl', 'redPaint', 0.56, 0.56, 0.12, 8, 0, 1.9, 0], ...[0, 1, 2, 3].map(k => ['box', 'pewWood', 0.4, 0.05, 0.25, 0.25 + k * 0.08, 0.2 + k * 0.4, -0.55 + k * 0.1])];
  D.pumpOrgan = [['rbox', 'organWood', 1.3, 1.0, 0.55, 0.02, 0, 0.5, 0], ['rbox', 'organWood', 1.3, 0.7, 0.2, 0.02, 0, 1.35, -0.18], ['box', 'ivoryKey', 0.9, 0.02, 0.14, 0, 0.98, 0.18], ['box', 'black', 0.9, 0.05, 0.02, 0, 1.05, 0.11], ...[-0.25, 0.25].map(x => ['box', 'organWood', 0.25, 0.04, 0.3, x, 0.12, 0.2, 0.3, 0, 0]), ...Array.from({ length: 8 }, (_, k) => ['cyl', 'ivoryKey', 0.012, 0.012, 0.03, 6, -0.35 + k * 0.1, 1.2, 0.0, H, 0, 0])];
  D.hymnBoard = [['rbox', 'organWood', 0.5, 0.95, 0.04, 0.01, 0, 0, 0.02], ['box', 'hymnBoard', 0.42, 0.85, 0.002, 0, 0, 0.042]];
  D.candleChandelier = [['torus', 'castIron', 0.6, 0.02, 24, 0, 0, 0, 0, H, 0, 0], ...Array.from({ length: 8 }, (_, k) => { const a = k / 8 * PI * 2; return ['cyl', 'candle', 0.02, 0.02, 0.16, 8, Math.cos(a) * 0.6, 0.09, Math.sin(a) * 0.6]; }), ...[0, 1, 2].map(k => ['tube', 'chainSteel', [[Math.cos(k * 2.09) * 0.6, 0, Math.sin(k * 2.09) * 0.6], [0, 1.0, 0]], 0.005, 3, 2]), ['tube', 'chainSteel', [[0, 1.0, 0], [0, 3.0, 0]], 0.006, 3, 2]];

  // ------------------------------------------------------------ Signe's house
  // A whitewashed corner fireplace (peis) with its mantel shelf, the fire long out (faces +z)
  D.cornerFireplace = [
    ['ext', 'whitePaint', [[-0.7, 0], [0.7, 0], [0.7, 1.15], [0.45, 1.3], [-0.45, 1.3], [-0.7, 1.15]], 0.65, 0.01, 0, 0, 0.05], ['box', 'soot', 0.7, 0.6, 0.3, 0, 0.4, 0.2],
    ['rbox', 'pewWood', 1.6, 0.06, 0.32, 0.01, 0, 1.33, 0.25], ['box', 'whitePaint', 0.7, 1.6, 0.5, 0, 2.1, 0.0], ['box', 'hearthStone', 1.5, 0.08, 0.7, 0, 0.04, 0.45],
    ...[[-0.15, 0], [0.12, 0.05]].map(([x, z]) => ['cyl', 'logWood', 0.05, 0.06, 0.45, 8, x, 0.18, 0.25 + z, H, 0, 0.3]), ['box', 'soot', 0.4, 0.02, 0.25, 0, 0.13, 0.28],
    ['lathe', 'brass', [[0.04, 0], [0.05, 0.02], [0.02, 0.05], [0.015, 0.22], [0.03, 0.24], [0.001, 0.24]], 12, -0.6, 1.36, 0.28], ['rbox', 'organWood', 0.14, 0.2, 0.03, 0.005, 0.5, 1.46, 0.2, 0, -0.2, 0],
  ];
  D.woodStove = [['rbox', 'rangeBlack', 0.6, 0.75, 0.5, 0.02, 0, 0.38, 0], ['rbox', 'rangeBlack', 0.65, 0.04, 0.55, 0.01, 0, 0.78, 0], ['box', 'rosemaling', 0.3, 0.25, 0.005, 0, 0.42, 0.252], ['cyl', 'rangeBlack', 0.07, 0.07, 1.6, 10, 0, 1.6, -0.15], ['cyl', 'steelPrep', 0.11, 0.1, 0.16, 14, 0.12, 0.88, 0.05]];
  D.rockingChair = [
    ...[-0.24, 0.24].map(x => ['tube', 'pewWood', [[x, 0.02, -0.45], [x, 0.0, 0.0], [x, 0.04, 0.42]], 0.02, 5, 8]),
    ['rbox', 'pewWood', 0.5, 0.04, 0.45, 0.01, 0, 0.42, 0], ...[[-0.22, -0.18], [0.22, -0.18], [-0.22, 0.18], [0.22, 0.18]].map(([x, z]) => ['cyl', 'pewWood', 0.018, 0.018, 0.4, 6, x, 0.22, z]),
    ...[-0.22, 0.22].map(x => ['cyl', 'pewWood', 0.02, 0.02, 0.6, 6, x, 0.72, -0.22, -0.15, 0, 0]), ...[0, 1, 2].map(k => ['box', 'pewWood', 0.44, 0.05, 0.015, 0, 0.62 + k * 0.15, -0.25 - k * 0.022, -0.15, 0, 0]),
    ['rbox', 'folkRed', 0.46, 0.05, 0.42, 0.02, 0, 0.46, 0.0], ['rbox', 'folkBlue', 0.5, 0.35, 0.03, 0.02, 0.05, 0.85, -0.2, -0.3, 0.3, 0],
  ];
  D.grandfatherClock = [['rbox', 'mahogany', 0.5, 2.1, 0.32, 0.02, 0, 1.05, 0], ['box', 'paper', 0.34, 0.34, 0.004, 0, 1.75, 0.162], ['box', 'glassFrost', 0.3, 0.7, 0.004, 0, 0.95, 0.162], ['cyl', 'brass', 0.07, 0.07, 0.01, 16, 0, 0.75, 0.15, H, 0, 0], ['cyl', 'brass', 0.008, 0.008, 0.5, 6, 0, 1.0, 0.15], ['ext', 'mahogany', [[-0.28, 0], [0.28, 0], [0.2, 0.12], [0, 0.18], [-0.2, 0.12]], 0.34, 0, 0, 2.1, 0]];
  D.oilLamp = [['lathe', 'brass', [[0.07, 0], [0.08, 0.02], [0.05, 0.05], [0.06, 0.12], [0.03, 0.15], [0.001, 0.15]], 16], ['lathe', 'glassFrost', [[0.03, 0.15], [0.045, 0.2], [0.04, 0.3], [0.025, 0.35], [0.001, 0.35]], 16], ['cone', 'oilGlow', 0.012, 0.04, 6, 0, 0.21, 0]];
  D.folkTable = [['rbox', 'pewWood', 1.5, 0.06, 0.8, 0.01, 0, 0.75, 0], ...[[-0.65, -0.32], [0.65, -0.32], [-0.65, 0.32], [0.65, 0.32]].map(([x, z]) => ['cyl', 'pewWood', 0.035, 0.03, 0.72, 8, x, 0.36, z]), ['box', 'tablecloth', 0.8, 0.005, 0.8, 0.1, 0.785, 0.0, 0, 0.5, 0], ['lathe', 'porcelainW', [[0.04, 0], [0.05, 0.08], [0.045, 0.08], [0.001, 0.004]], 12, -0.3, 0.78, 0.1]];
  // The music box: rosewood, the lid open on a little brass comb and drum, a dancer
  D.musicBox = [['rbox', 'mahogany', 0.2, 0.08, 0.14, 0.008, 0, 0.04, 0], ['box', 'musicBoxLid', 0.2, 0.012, 0.14, 0, 0.13, -0.065, -1.6, 0, 0], ['cyl', 'brass', 0.018, 0.018, 0.11, 10, 0, 0.07, -0.02, 0, 0, H], ['box', 'brass', 0.1, 0.004, 0.03, 0, 0.075, 0.03], ['cyl', 'porcelainW', 0.006, 0.01, 0.05, 6, 0.05, 0.11, 0.02], ['sph', 'porcelainW', 0.008, 0.05, 0.14, 0.02, 6, 4]];
  D.schoolBell = [['lathe', 'brass', [[0.001, 0.12], [0.04, 0.11], [0.06, 0.06], [0.07, 0.0], [0.001, 0.0]], 16, 0, 0, 0], ['cyl', 'pewWood', 0.015, 0.02, 0.14, 8, 0, 0.18, 0]];
  D.travelTrunk = [['rbox', 'folkBlue', 0.9, 0.5, 0.5, 0.02, 0, 0.25, 0], ['cyl', 'folkBlue', 0.25, 0.25, 0.9, 16, 0, 0.5, 0, 0, 0, H, true], ...[-0.3, 0.3].map(x => ['box', 'brass', 0.04, 0.6, 0.52, x, 0.35, 0]), ['box', 'brass', 0.08, 0.08, 0.02, 0, 0.42, 0.26], ['box', 'labelCard', 0.2, 0.12, 0.004, 0.2, 0.3, 0.252]];

  // ------------------------------------------------------------ the village outside
  D.wellStone = [['lathe', 'dryStone', [[0.6, 0], [0.62, 0.8], [0.5, 0.8], [0.48, 0.1], [0.001, 0.1]], 18], ...[-0.65, 0.65].map(x => ['box', 'wetWood', 0.1, 1.8, 0.1, x, 1.0, 0]), ['ext', 'roofTile', [[-0.7, 0], [0.7, 0], [0, 0.5]], 1.2, 0, 0, 1.9, 0, 0, H, 0, 'roofTile'], ['cyl', 'wetWood', 0.05, 0.05, 1.3, 8, 0, 1.55, 0, 0, 0, H], ['tube', 'string', [[0, 1.55, 0.05], [0, 0.9, 0.05]], 0.006, 3, 2], ['cyl', 'wetWood', 0.12, 0.1, 0.2, 10, 0, 0.8, 0.05]];
  D.footbridge = (() => {
    const s = [], L = 9;
    for (let x = -L / 2; x < L / 2; x += 0.25) s.push(['box', 'wetWood', 0.22, 0.06, 1.5, x + 0.12, 0.62 + Math.sin((x / L + 0.5) * PI) * 0.35, 0]);
    for (const z of [-0.75, 0.75]) { s.push(['tube', 'wetWood', [[-L / 2, 1.6, z], [0, 1.95, z], [L / 2, 1.6, z]], 0.04, 5, 10]); for (let x = -L / 2; x <= L / 2 + 0.01; x += 1.5) s.push(['box', 'wetWood', 0.08, 1.1, 0.08, x, 0.62 + Math.sin((x / L + 0.5) * PI) * 0.35 + 0.5, z]); }
    for (const x of [-L / 2, L / 2]) for (const z of [-0.75, 0.75]) s.push(['box', 'wetWood', 0.2, 1.6, 0.2, x, 0.3, z]);
    return s;
  })();
  D.rowBoat = [['sph', 'boatGreen', 1, 0, 0.3, 0, 16, 8, [2.0, 0.42, 0.62]], ['sph', 'wetWood', 1, 0, 0.36, 0, 16, 8, [1.85, 0.35, 0.55]], ...[-0.6, 0.4].map(x => ['box', 'wetWood', 0.22, 0.04, 1.1, x, 0.5, 0]), ['cyl', 'wetWood', 0.02, 0.02, 2.2, 6, 0.1, 0.55, 0.3, 0, 0.2, H]];
  D.stoneWall = (() => { const s = [], r = U.rng(4); for (let x = -1.4; x < 1.4; x += 0.32) for (let y = 0; y < 3; y++) s.push(['rock', 'dryStone', 0.2 + r.range(-0.03, 0.04), 50 + Math.round(x * 10) + y * 7, 1.1, 0.7, 0.9, x + r.range(-0.04, 0.04), 0.13 + y * 0.24, r.range(-0.05, 0.05), r.range(0, 6)]); return s; })();
  D.noticePost = [['box', 'wetWood', 0.12, 2.2, 0.12, 0, 1.1, 0], ['box', 'evacNotice', 0.5, 0.62, 0.006, 0, 1.6, 0.064], ['box', 'wetWood', 0.6, 0.06, 0.15, 0, 1.97, 0.02]];
  D.depthGauge = [['box', 'depthGauge', 0.18, 6.0, 0.03, 0, 3.0, 0], ['box', 'castIron', 0.08, 6.4, 0.08, 0, 3.2, -0.06]];

  // ------------------------------------------------------------ the dam
  // A section of the dam wall (faces +z toward the valley): curved concrete face, lift joints, stains,
  // a walkway on top with railings; origin at the foot of the wall, centre
  D.damWall = (() => {
    const s = [], W = 33, Hh = 24;
    for (let k = 0; k < 11; k++) { const x = -W / 2 + (k + 0.5) * W / 11, z = -Math.cos((x / W) * 1.2) * 1.6; s.push(['box', k % 2 ? 'damConcrete' : 'damStain', W / 11 + 0.02, Hh, 4, x, Hh / 2, z - 2, 0, -Math.sin((x / W) * 1.2) * 0.35, 0]); }
    for (let y = 2.4; y < Hh; y += 2.4) s.push(['box', 'damStain', W, 0.05, 0.3, 0, y, -0.6]);
    s.push(['box', 'damConcrete', W + 1, 0.4, 3, 0, Hh + 0.2, -2.6]);
    for (const z of [-1.2, -4.0]) { s.push(['box', 'ladderSteel', W, 0.05, 0.05, 0, Hh + 1.4, z]); for (let x = -W / 2; x <= W / 2; x += 2) s.push(['box', 'ladderSteel', 0.05, 1.0, 0.05, x, Hh + 0.9, z]); }
    return s;
  })();
  // The service ladder up the face of the dam, in its safety cage, with rest platforms
  D.damLadder = (() => {
    const s = [], Hh = 24.5;
    for (const x of [-0.25, 0.25]) s.push(['box', 'ladderSteel', 0.05, Hh, 0.05, x, Hh / 2, 0.2]);
    for (let y = 0.3; y < Hh; y += 0.3) s.push(['cyl', 'ladderSteel', 0.014, 0.014, 0.5, 6, 0, y, 0.2, 0, 0, H]);
    for (let y = 2.4; y < Hh; y += 1.2) s.push(['torus', 'ladderSteel', 0.42, 0.015, 16, PI, 0, y, 0.32, H, 0, 0]);
    for (const a of [-1.2, -0.4, 0.4, 1.2]) s.push(['box', 'ladderSteel', 0.03, Hh - 2.4, 0.03, Math.sin(a) * 0.42, 2.4 + (Hh - 2.4) / 2, 0.32 + Math.cos(a) * 0.42]);
    for (const y of [8, 16]) s.push(['box', 'ladderSteel', 1.0, 0.05, 0.9, 0.6, y, 0.6]);
    return s;
  })();
  D.sluiceGear = [['cyl', 'gearGreen', 0.9, 0.9, 0.25, 24, 0, 1.2, 0, H, 0, 0], ...Array.from({ length: 12 }, (_, k) => { const a = k / 12 * PI * 2; return ['box', 'gearGreen', 0.16, 0.16, 0.27, Math.cos(a) * 0.95, 1.2 + Math.sin(a) * 0.95, 0]; }), ['box', 'castIron', 0.4, 1.2, 0.8, 0, 0.6, 0], ['cyl', 'ladderSteel', 0.05, 0.05, 6.0, 8, 0, 4.2, 0]];
})(typeof window !== 'undefined' ? window : globalThis);
