/* Models for the Weisshorn, a mountain hotel at the top of a cable car on the night of 28 February 1983,
   in a blizzard: the stone fireplace with its log fire, leather wing chairs, the reception desk with the
   telegram board and the guest book, frosted dining tables laid for breakfast, carved alpine chairs, the
   kitchen range, a steel prep table, the walk-in cold room door and its meat rail, ski and boot racks with
   1983 skis, a cuckoo clock, the gondola cabin, the cable station's bull wheel and control desk, snowed
   lamp posts and piste signs. Same spec conventions as props.js / models.js. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  Object.assign(M.tex, {
    telegramBoard: () => T.canvas('m7:tboard', 512, 384, (g, w, h) => {
      const r = U.rng(83);
      g.fillStyle = '#8a6a44'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 2500; k++) { g.fillStyle = `rgba(${r() < 0.5 ? '60,40,20' : '160,120,80'},${r.range(0.1, 0.3)})`; g.fillRect(r() * w, r() * h, 2, 2); }
      const card = (x, y, cw, ch, col, lines, rot) => { g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = col; g.fillRect(-cw / 2, -ch / 2, cw, ch); g.fillStyle = '#2a2a2a'; g.font = `11px ${T.FONTS.FONT_TYPE}`; lines.forEach((l, i) => g.fillText(l, -cw / 2 + 6, -ch / 2 + 16 + i * 13)); g.fillStyle = '#b8141a'; g.beginPath(); g.arc(0, -ch / 2 + 5, 4, 0, 6.3); g.fill(); g.restore(); };
      card(90, 90, 130, 90, '#f2ecd8', ['SKI SCHOOL', 'L. Brunner', 'daily 9.30', 'upper station'], -0.05);
      card(250, 70, 110, 70, '#e8f0f8', ['SNOW REPORT', '27.2. powder 40cm', 'danger: 3'], 0.04);
      card(400, 110, 140, 100, '#f8f2e0', ['TOBOGGAN NIGHT', 'Thursday', 'bring a torch!'], -0.03);
      card(140, 260, 150, 80, '#fff8e8', ['LOST: one ski glove', 'red, child size', 'ask at reception'], 0.06);
      // the empty place where the telegram was pinned: a pin and a torn corner
      g.fillStyle = '#b8141a'; g.beginPath(); g.arc(330, 230, 4, 0, 6.3); g.fill();
      g.fillStyle = '#e8d8a8'; g.beginPath(); g.moveTo(322, 226); g.lineTo(340, 226); g.lineTo(326, 244); g.fill();
    }),
    lodgeSign: () => T.canvas('m7:lodgeSign', 1024, 256, (g, w, h) => {
      g.fillStyle = '#3a2214'; g.fillRect(0, 0, w, h); g.strokeStyle = '#d8b878'; g.lineWidth = 6; g.strokeRect(12, 12, w - 24, h - 24);
      g.fillStyle = '#e8d0a0'; g.font = `bold 110px serif`; g.textAlign = 'center'; g.fillText('BERGHOTEL WEISSHORN', w / 2, 150); g.font = `italic 40px serif`; g.fillText('2 914 m', w / 2, 210);
    }),
    pisteSign: () => T.canvas('m7:piste', 512, 256, (g, w, h) => {
      const row = (y, col, txt) => { g.fillStyle = col; g.fillRect(10, y, w - 20, 70); g.fillStyle = '#fff'; g.font = `bold 36px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'left'; g.fillText(txt, 30, y + 48); };
      row(10, '#1a3a8a', '1  TALABFAHRT'); row(90, '#b81414', '4  OBERE STATION'); row(170, '#111', '7  SCHWARZE WAND');
    }),
    carNumber: () => T.canvas('m7:carNo', 256, 128, (g, w, h) => { g.fillStyle = '#b81a14'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.font = `bold 80px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('2', w / 2, 96); }),
    cuckooFace: () => T.canvas('m7:cuckoo', 128, 128, (g, w, h) => { g.fillStyle = '#e8dcc0'; g.beginPath(); g.arc(64, 64, 60, 0, 6.3); g.fill(); g.fillStyle = '#2a1a10'; for (let k = 0; k < 12; k++) { g.save(); g.translate(64, 64); g.rotate(k / 12 * 6.283); g.fillRect(-2, -56, 4, 12); g.restore(); } g.fillRect(62, 26, 4, 40); g.save(); g.translate(64, 64); g.rotate(2.2); g.fillRect(-2, -30, 4, 30); g.restore(); }),
  });
  Object.assign(M.MATS, {
    fieldstone: { color: 0x8a8278, rough: 0.95 }, hearthStone: { color: 0x5a5650, rough: 0.9 }, soot: M.MATS.soot || { color: 0x141210, rough: 1 }, emberGlow: { color: 0xff6a20, glow: 2.2 }, flame: { color: 0xffa040, glow: 3.0 },
    logWood: { color: 0x4a3626, rough: 0.95 }, leather: { color: 0x4a2618, rough: 0.45, refl: 0.08 }, pineWood: { color: 0x9a7448, rough: 0.6, refl: 0.05 }, carvedPine: { color: 0x8a6438, rough: 0.6 },
    tablecloth: { color: 0xe8e4dc, rough: 0.95 }, checkCloth: { color: 0xb83a30, rough: 0.95 }, frost: { color: 0xdfe8f0, rough: 0.6, transparent: true, opacity: 0.75 }, porcelainW: { color: 0xf0f0ea, rough: 0.2, refl: 0.15 },
    glassFrost: { color: 0xd8e4ec, rough: 0.3, transparent: true, opacity: 0.55 }, steelPrep: { color: 0xa8aaa8, rough: 0.3, metal: 0.9, refl: 0.2 }, rangeBlack: { color: 0x1a1a1a, rough: 0.55, metal: 0.6 }, coldDoor: { color: 0xc8ccc8, rough: 0.4, metal: 0.4 },
    skiRed: { color: 0xc81a1a, rough: 0.3, refl: 0.15 }, skiYellow: { color: 0xe8c018, rough: 0.3, refl: 0.15 }, skiBlue: { color: 0x1a4ab8, rough: 0.3, refl: 0.15 }, skiWhite: { color: 0xe8e8e0, rough: 0.3, refl: 0.15 },
    bootPlastic: { color: 0x2a5a8a, rough: 0.35 }, bootRed: { color: 0x8a1a14, rough: 0.35 }, telegramBoard: { tex: 'telegramBoard', rough: 0.9 }, lodgeSign: { tex: 'lodgeSign', rough: 0.6 }, pisteSign: { tex: 'pisteSign', rough: 0.5 },
    gondolaRed: { color: 0xa8161a, rough: 0.35, metal: 0.4, refl: 0.2 }, gondolaGlass: { color: 0x1a2028, rough: 0.05, transparent: true, opacity: 0.45, refl: 0.5 }, carNumber: { tex: 'carNumber', rough: 0.4 }, cuckooFace: { tex: 'cuckooFace', rough: 0.5 },
    wheelSteel: { color: 0x5a6064, rough: 0.45, metal: 0.85 }, consoleCream: { color: 0xc8c0a8, rough: 0.5, metal: 0.2 }, snowCapM: { color: 0xe4eaf0, rough: 0.85 },
  });

  // ------------------------------------------------------------ the fireplace hall
  // Fieldstone fireplace on an outside wall (faces +z): hearth, opening, mantel, chimney breast to the roof
  D.stoneFireplace = (() => {
    const s = [], r = U.rng(29);
    s.push(['box', 'hearthStone', 2.6, 0.15, 1.0, 0, 0.075, 0.3]);
    for (let y = 0.2; y < 5.2; y += 0.28) for (let x = -1.15; x <= 1.16; x += 0.38) {
      if (y < 1.25 && Math.abs(x) < 0.7) continue;      // the opening
      s.push(['rbox', 'fieldstone', 0.36 + r.range(-0.04, 0.04), 0.26, 0.2, 0.05, x + r.range(-0.03, 0.03), y, r.range(-0.02, 0.03) - (y > 1.6 ? 0.08 : 0)]);
    }
    s.push(['box', 'soot', 1.3, 1.1, 0.5, 0, 0.75, -0.15], ['rbox', 'logWood', 2.0, 0.16, 0.36, 0.03, 0, 1.38, 0.06]);
    // the fire: logs on a grate, embers, flames
    s.push(['box', 'rangeBlack', 0.8, 0.06, 0.4, 0, 0.22, 0.05]);
    for (const [x, rz] of [[-0.18, 0.3], [0.15, -0.25], [0, 0.05]]) s.push(['cyl', 'logWood', 0.08, 0.09, 0.75, 8, x, 0.32, 0.05, H, 0, rz]);
    s.push(['box', 'emberGlow', 0.6, 0.04, 0.3, 0, 0.27, 0.05]);
    for (const [x, hh] of [[-0.15, 0.4], [0.1, 0.5], [0.0, 0.35], [0.22, 0.3]]) s.push(['cone', 'flame', 0.07, hh, 6, x, 0.38 + hh / 2, 0.05]);
    // tools and a basket of logs
    s.push(['cyl', 'rangeBlack', 0.012, 0.012, 0.8, 6, 1.0, 0.55, 0.45, 0, 0, 0.1], ['cyl', 'rangeBlack', 0.012, 0.012, 0.8, 6, 1.06, 0.55, 0.45, 0, 0, 0.05]);
    s.push(['cyl', 'carvedPine', 0.25, 0.22, 0.4, 12, -1.0, 0.2, 0.6], ...[0, 1, 2].map(k => ['cyl', 'logWood', 0.06, 0.06, 0.55, 8, -1.0 + (k - 1) * 0.12, 0.45, 0.6, H, 0.3 * k, 0]));
    return s;
  })();
  D.wingChair = [
    ['rbox', 'leather', 0.8, 0.45, 0.8, 0.08, 0, 0.32, 0], ['rbox', 'leather', 0.8, 0.8, 0.2, 0.08, 0, 0.85, -0.32],
    ...[-1, 1].map(sx => ['rbox', 'leather', 0.16, 0.55, 0.75, 0.06, sx * 0.36, 0.62, 0.0]), ...[-1, 1].map(sx => ['rbox', 'leather', 0.18, 0.5, 0.2, 0.06, sx * 0.34, 1.05, -0.24]),
    ...[[-0.32, -0.32], [0.32, -0.32], [-0.32, 0.32], [0.32, 0.32]].map(([x, z]) => ['cyl', 'carvedPine', 0.025, 0.02, 0.12, 8, x, 0.06, z]),
  ];
  D.lowTable = [['rbox', 'pineWood', 1.1, 0.06, 0.6, 0.02, 0, 0.45, 0], ...[[-0.48, -0.24], [0.48, -0.24], [-0.48, 0.24], [0.48, 0.24]].map(([x, z]) => ['box', 'pineWood', 0.06, 0.42, 0.06, x, 0.21, z]), ['lathe', 'porcelainW', [[0.04, 0], [0.045, 0.09], [0.04, 0.09], [0.001, 0.005]], 12, 0.2, 0.48, 0], ['cyl', 'tablecloth', 0.12, 0.12, 0.03, 12, -0.25, 0.495, 0.05]];
  D.cuckooClock = [['box', 'carvedPine', 0.36, 0.42, 0.16, 0, 0, 0.08], ['ext', 'carvedPine', [[-0.26, 0.2], [0, 0.42], [0.26, 0.2], [0.24, 0.18], [0, 0.38], [-0.24, 0.18]], 0.2, 0, 0, 0, 0.08], ['box', 'cuckooFace', 0.22, 0.22, 0.004, 0, -0.03, 0.162], ['cyl', 'brass', 0.025, 0.025, 0.12, 8, -0.06, -0.45, 0.1], ['cyl', 'brass', 0.025, 0.025, 0.12, 8, 0.06, -0.55, 0.1], ['tube', 'chainSteel', [[-0.06, -0.21, 0.1], [-0.06, -0.4, 0.1]], 0.003, 3], ['tube', 'chainSteel', [[0.06, -0.21, 0.1], [0.06, -0.5, 0.1]], 0.003, 3], ['box', 'carvedPine', 0.05, 0.05, 0.04, 0, 0.27, 0.17]];
  // ------------------------------------------------------------ reception
  D.receptionDesk = [
    ['rbox', 'pineWood', 2.4, 1.05, 0.55, 0.02, 0, 0.525, 0], ['rbox', 'carvedPine', 2.5, 0.05, 0.65, 0.01, 0, 1.08, 0.04], ...[-0.8, 0, 0.8].map(x => ['box', 'carvedPine', 0.6, 0.7, 0.02, x, 0.5, 0.28]),
    ['lathe', 'brass', [[0.001, 0.05], [0.04, 0.045], [0.045, 0.0], [0.001, 0.0]], 16, 0.7, 1.105, 0.15], ['cyl', 'brass', 0.006, 0.006, 0.02, 6, 0.7, 1.16, 0.15],
    ['rbox', 'leather', 0.36, 0.04, 0.26, 0.01, -0.4, 1.12, 0.1, 0, 0.2, 0], ['box', 'paper', 0.32, 0.005, 0.22, -0.4, 1.143, 0.1, 0, 0.2, 0],
  ];
  D.telegramBoard = [['rbox', 'carvedPine', 1.1, 0.85, 0.04, 0.01, 0, 0, 0.02], ['box', 'telegramBoard', 1.0, 0.75, 0.004, 0, 0, 0.042]];
  D.lodgeSign = [['box', 'lodgeSign', 3.2, 0.8, 0.06, 0, 0, 0.03]];
  // A small cast-iron office stove, its door hanging open on cold ash, the pipe up into the wall
  D.stove = [
    ['lathe', 'rangeBlack', [[0.001, 0.12], [0.2, 0.12], [0.24, 0.3], [0.24, 0.6], [0.2, 0.75], [0.12, 0.8], [0.001, 0.8]], 18], ...[0, 1, 2].map(k => ['cyl', 'rangeBlack', 0.025, 0.03, 0.14, 8, Math.cos(k * 2.09) * 0.17, 0.06, Math.sin(k * 2.09) * 0.17]),
    ['box', 'soot', 0.2, 0.16, 0.01, 0, 0.42, 0.235], ['box', 'rangeBlack', 0.2, 0.17, 0.02, -0.17, 0.42, 0.3, 0, -1.2, 0], ['box', 'hearthStone', 0.6, 0.02, 0.6, 0, 0.01, 0.05],
    ['cyl', 'rangeBlack', 0.07, 0.07, 1.4, 10, 0, 1.5, 0], ['cyl', 'rangeBlack', 0.07, 0.07, 0.5, 10, 0, 2.2, -0.25, H, 0, 0],
  ];
  // ------------------------------------------------------------ dining room
  // A table for four laid for breakfast, frost over all of it
  D.diningTable = (() => {
    const s = [['rbox', 'pineWood', 1.1, 0.05, 1.1, 0.02, 0, 0.75, 0], ['box', 'checkCloth', 1.16, 0.006, 1.16, 0, 0.78, 0], ['box', 'frost', 1.1, 0.004, 1.1, 0, 0.786, 0], ['cyl', 'carvedPine', 0.06, 0.08, 0.72, 10, 0, 0.36, 0], ['cyl', 'carvedPine', 0.3, 0.3, 0.04, 16, 0, 0.02, 0]];
    for (const [x, z] of [[0, 0.36], [0, -0.36], [0.36, 0], [-0.36, 0]]) {
      s.push(['cyl', 'porcelainW', 0.12, 0.1, 0.02, 18, x, 0.795, z], ['lathe', 'porcelainW', [[0.035, 0], [0.045, 0.07], [0.042, 0.07], [0.001, 0.005]], 12, x + 0.12, 0.79, z * 0.8]);
      s.push(['lathe', 'glassFrost', [[0.03, 0], [0.034, 0.11], [0.031, 0.11], [0.001, 0.004]], 12, x - 0.12, 0.79, z * 0.8]);
    }
    s.push(['lathe', 'porcelainW', [[0.06, 0], [0.07, 0.12], [0.05, 0.16], [0.02, 0.2], [0.001, 0.2]], 14, 0.05, 0.79, 0.04], ['cyl', 'pineWood', 0.1, 0.1, 0.03, 12, -0.1, 0.795, -0.08]);
    return s;
  })();
  // Carved alpine chair (Stabelle): a slab seat on splayed legs, a back with a heart cut through it
  D.alpineChair = [
    ['rbox', 'carvedPine', 0.42, 0.05, 0.42, 0.01, 0, 0.46, 0],
    ...[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z]) => ['cyl', 'carvedPine', 0.02, 0.025, 0.48, 8, x * 1.15, 0.22, z * 1.15, z * 0.35, 0, -x * 0.35]),
    ['ext', 'carvedPine', [[-0.17, 0], [0.17, 0], [0.2, 0.5], [0.12, 0.55], [-0.12, 0.55], [-0.2, 0.5]], 0.04, 0.005, 0, 0.48, -0.19, -0.12, 0, 0, null, [[[0, 0.18], [0.06, 0.3], [0.03, 0.34], [0, 0.31], [-0.03, 0.34], [-0.06, 0.3]]]],
  ];
  D.sideboard = [['rbox', 'pineWood', 1.6, 0.9, 0.5, 0.02, 0, 0.45, 0], ...[-0.55, 0, 0.55].map(x => ['rbox', 'carvedPine', 0.48, 0.6, 0.02, 0.01, x, 0.45, 0.25]), ['rbox', 'carvedPine', 1.66, 0.04, 0.56, 0.01, 0, 0.92, 0], ...[-0.5, -0.3, 0.4].map(x => ['lathe', 'glassFrost', [[0.05, 0], [0.05, 0.22], [0.02, 0.26], [0.02, 0.3], [0.001, 0.3]], 12, x, 0.94, 0])];
  // ------------------------------------------------------------ kitchen
  D.kitchenRange = [
    ['rbox', 'rangeBlack', 2.0, 0.85, 0.85, 0.02, 0, 0.425, 0], ['box', 'chrome', 2.04, 0.04, 0.89, 0, 0.87, 0], ...[-0.6, 0, 0.6].map(x => ['cyl', 'rangeBlack', 0.18, 0.18, 0.02, 18, x, 0.9, 0.05]),
    ...[-0.5, 0.5].map(x => ['rbox', 'chrome', 0.6, 0.4, 0.02, 0.01, x, 0.45, 0.43]), ...[-0.5, 0.5].map(x => ['box', 'chrome', 0.4, 0.03, 0.03, x, 0.7, 0.45]),
    ['box', 'emberGlow', 0.25, 0.04, 0.005, 0.5, 0.18, 0.43], ['rbox', 'chrome', 2.0, 0.6, 0.25, 0.02, 0, 1.6, -0.3], ['cyl', 'steelPrep', 0.2, 0.18, 0.25, 16, -0.6, 1.03, 0.05], ['cyl', 'steelPrep', 0.15, 0.15, 0.15, 14, 0.3, 0.98, 0.0],
  ];
  D.prepTable = [['box', 'steelPrep', 2.0, 0.04, 0.8, 0, 0.9, 0], ['box', 'steelPrep', 1.9, 0.03, 0.7, 0, 0.25, 0], ...[[-0.95, -0.37], [0.95, -0.37], [-0.95, 0.37], [0.95, 0.37]].map(([x, z]) => ['cyl', 'steelPrep', 0.025, 0.025, 0.9, 8, x, 0.45, z]), ['box', 'logWood', 0.5, 0.05, 0.35, -0.5, 0.945, 0.1], ['box', 'chrome', 0.3, 0.005, 0.06, -0.45, 0.975, 0.1, 0, 0.3, 0]];
  D.potRack = [['box', 'castIron', 1.6, 0.04, 0.04, 0, 0, 0], ...[-0.6, -0.2, 0.2, 0.6].flatMap(x => [['cyl', 'chrome', 0.004, 0.004, 0.2, 4, x, -0.1, 0], ['cyl', 'steelPrep', 0.13 - Math.abs(x) * 0.05, 0.12 - Math.abs(x) * 0.05, 0.12, 14, x, -0.3, 0]]), ...[-0.7, 0.7].map(x => ['cyl', 'chainSteel', 0.006, 0.006, 0.8, 4, x, 0.4, 0])];
  // The cold room door: thick, insulated, a lever handle, frost round the seals (faces +z)
  D.coldRoomDoor = [['box', 'coldDoor', 1.1, 2.0, 0.14, 0, 1.0, 0.07], ...M.frame('chrome', 1.2, 2.08, 0.05, 0.06, 0, 1.04, 0.1), ['box', 'chrome', 0.06, 0.38, 0.06, 0.4, 1.1, 0.19], ['box', 'chrome', 0.06, 0.08, 0.12, 0.4, 1.3, 0.14], ['box', 'frost', 1.18, 0.12, 0.01, 0, 2.02, 0.15], ['box', 'frost', 0.1, 1.9, 0.01, -0.55, 1.0, 0.15]];
  D.meatRail = [['box', 'chrome', 2.4, 0.05, 0.05, 0, 2.3, 0], ...[-0.9, -0.3, 0.3, 0.9].flatMap(x => [['tube', 'chrome', [[x, 2.28, 0], [x + 0.03, 2.1, 0], [x, 1.98, 0.02], [x - 0.03, 2.03, 0.03]], 0.01, 4, 8]])];
  // ------------------------------------------------------------ ski room
  D.skiRack = (() => {
    const s = [['box', 'pineWood', 2.0, 0.08, 0.3, 0, 1.6, -0.1], ['box', 'pineWood', 2.0, 0.08, 0.3, 0, 0.1, -0.1]];
    const cols = ['skiRed', 'skiYellow', 'skiBlue', 'skiWhite', 'skiRed', 'skiBlue'];
    for (let k = 0; k < 6; k++) { const x = -0.8 + k * 0.32; for (const dx of [-0.05, 0.05]) s.push(['box', cols[k], 0.07, 1.85, 0.015, x + dx, 0.98, -0.02, 0.05, 0, 0]); s.push(['box', 'chrome', 0.1, 0.06, 0.06, x, 0.95, 0.0]); }
    for (let k = 0; k < 5; k++) s.push(['cyl', 'chrome', 0.008, 0.008, 1.3, 6, -0.75 + k * 0.38, 0.75, 0.15, 0.08, 0, 0]);
    return s;
  })();
  D.bootRack = (() => { const s = [['box', 'pineWood', 1.6, 0.04, 0.35, 0, 0.35, 0], ['box', 'pineWood', 1.6, 0.04, 0.35, 0, 0.75, 0], ...[-0.78, 0.78].map(x => ['box', 'pineWood', 0.04, 0.8, 0.35, x, 0.4, 0])]; for (let k = 0; k < 8; k++) { const x = -0.6 + (k % 4) * 0.4, y = k < 4 ? 0.37 : 0.77; s.push(['rbox', k % 3 ? 'bootPlastic' : 'bootRed', 0.12, 0.28, 0.3, 0.04, x - 0.07, y + 0.14, 0.0], ['rbox', k % 3 ? 'bootPlastic' : 'bootRed', 0.12, 0.28, 0.3, 0.04, x + 0.07, y + 0.14, 0.0]); } return s; })();
  // ------------------------------------------------------------ the cable car station
  // Gondola cabin for eight, hanging from its grip; doors on the +z side; origin at the cabin floor centre
  D.gondola = [
    ['rbox', 'gondolaRed', 2.6, 0.5, 1.7, 0.08, 0, 0.25, 0], ['rbox', 'gondolaRed', 2.6, 0.25, 1.7, 0.08, 0, 2.0, 0],
    ['box', 'gondolaGlass', 2.5, 1.35, 1.6, 0, 1.18, 0], ...[[-1.27, -0.82], [1.27, -0.82], [-1.27, 0.82], [1.27, 0.82], [0, -0.82]].map(([x, z]) => ['box', 'gondolaRed', 0.08, 1.4, 0.08, x, 1.18, z]),
    ['box', 'gondolaRed', 0.06, 1.4, 0.04, 0.0, 1.18, 0.86], ['box', 'carNumber', 0.4, 0.2, 0.01, 0.8, 0.3, 0.86], ['box', 'carNumber', 0.4, 0.2, 0.01, -0.8, 0.3, -0.86, 0, PI, 0],
    ['box', 'pineWood', 2.3, 0.05, 0.35, 0, 0.5, -0.6], ['box', 'pineWood', 2.3, 0.05, 0.35, 0, 0.5, 0.6],
    ['box', 'wheelSteel', 0.2, 1.4, 0.2, 0, 2.85, 0], ['box', 'wheelSteel', 1.0, 0.25, 0.3, 0, 3.6, 0], ...[-0.35, 0.35].map(x => ['cyl', 'wheelSteel', 0.12, 0.12, 0.08, 14, x, 3.75, 0, H, 0, 0]),
  ];
  // The bull wheel the cable turns round, lying flat under the station roof, and the haul rope
  D.bullWheel = [['torus', 'wheelSteel', 2.0, 0.09, 40, 0, 0, 0, 0, H, 0, 0], ...[0, 1, 2, 3, 4, 5].map(k => ['box', 'wheelSteel', 4.0, 0.08, 0.12, 0, 0, 0, 0, k * PI / 6, 0]), ['cyl', 'wheelSteel', 0.25, 0.25, 0.6, 16, 0, 0, 0], ['cyl', 'drumRed', 0.15, 0.15, 2.0, 12, 0, 1.0, 0]];
  D.controlDesk = [['rbox', 'consoleCream', 1.4, 0.95, 0.6, 0.03, 0, 0.475, 0], ['rbox', 'consoleCream', 1.4, 0.06, 0.45, 0.02, 0, 1.0, -0.05, -0.35, 0, 0], ...[-0.45, -0.15, 0.15].map(x => ['cyl', 'black', 0.04, 0.04, 0.03, 12, x, 1.04, 0.0, -0.35, 0, 0]), ['cyl', 'drumRed', 0.06, 0.06, 0.04, 14, 0.45, 1.04, 0.0, -0.35, 0, 0], ['box', 'dialFace', 0.3, 0.18, 0.004, -0.2, 1.08, -0.18, -0.35, 0, 0], ['box', 'chrome', 0.06, 0.06, 0.06, 0.5, 1.0, 0.15], ['box', 'black', 0.03, 0.03, 0.08, 0.5, 1.0, 0.2]];
  // Snowed lamp post, piste signpost
  D.lampPostSnow = [['cyl', 'castIron', 0.06, 0.08, 3.4, 10, 0, 1.7, 0], ['lathe', 'castIron', [[0.001, 0.3], [0.15, 0.25], [0.2, 0.05], [0.12, 0.0]], 12, 0, 3.4, 0], ['sph', 'snowCapM', 0.17, 0, 3.72, 0, 10, 6, [1, 0.45, 1]]];
  D.pisteSign = [['cyl', 'castIron', 0.04, 0.04, 2.6, 8, 0, 1.3, 0], ['box', 'pisteSign', 0.9, 0.45, 0.03, 0, 2.3, 0.04], ['box', 'snowCapM', 0.92, 0.06, 0.08, 0, 2.55, 0.04]];
})(typeof window !== 'undefined' ? window : globalThis);
