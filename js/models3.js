/* Models for Depot 9, the lost property office under Halvard Central (1998, in a 1930s basement):
   typewriter, parcel chute, archive stacks with dated boxes, the pneumatic tube terminal, the umbrella
   cage, suitcases, a bicycle, sorting table and pigeonholes, mail sacks, cast-iron radiators, a coat
   stand, the ticket-number dispenser, the freight elevator's scissor gate, a split-flap clock, the
   ledger box. Same spec conventions as props.js / models.js. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ textures
  Object.assign(M.tex, {
    // Front faces of archive boxes: grey-brown card boxes with a typed label and a year in big digits
    archiveBoxes: () => T.canvas('m3:archiveBoxes', 1024, 512, (g, w, h) => {
      const r = U.rng(256);
      g.fillStyle = '#1c1a16'; g.fillRect(0, 0, w, h);
      const rows = 4;
      for (let row = 0; row < rows; row++) {
        let x = 4;
        const y0 = row * h / rows + 6, bh = h / rows - 10;
        while (x < w - 10) {
          const bw = r.int(54, 92);
          const tone = r.pick(['#8a7a62', '#7d6f58', '#968670', '#6e624e', '#a09078', '#5e5446']);
          g.fillStyle = tone; g.fillRect(x, y0 + r.int(0, 6), bw - 4, bh - r.int(0, 8));
          // a darker handle hole
          g.fillStyle = 'rgba(0,0,0,0.55)'; g.beginPath(); g.ellipse(x + bw / 2 - 2, y0 + 18, bw * 0.18, 5, 0, 0, 6.28); g.fill();
          // label
          g.fillStyle = r() < 0.15 ? '#d8cfa8' : '#e8e0c4'; g.fillRect(x + 8, y0 + 34, bw - 20, 46);
          g.fillStyle = '#2a2420'; g.font = `bold 20px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center';
          g.fillText(String(r.int(1906, 1997)), x + bw / 2 - 2, y0 + 58);
          g.font = `10px ${T.FONTS.FONT_TYPE}`; g.fillText(r.pick(['GLOVES', 'UMBR.', 'KEYS', 'BAGS', 'MISC.', 'BOOKS', 'HATS', 'TOYS', 'COATS', 'PAPERS']), x + bw / 2 - 2, y0 + 74);
          // stains and wear
          g.fillStyle = 'rgba(40,30,20,' + r.range(0, 0.25).toFixed(2) + ')'; g.fillRect(x, y0 + bh * r.range(0.4, 0.8), bw - 4, r.int(4, 30));
          x += bw;
        }
      }
    }),
    // Pigeonholes full of envelopes and parcels
    pigeon: () => T.canvas('m3:pigeon', 512, 512, (g, w, h) => {
      const r = U.rng(9);
      g.fillStyle = '#2a2018'; g.fillRect(0, 0, w, h);
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
        const x0 = x * 64 + 3, y0 = y * 64 + 3;
        g.fillStyle = '#120c08'; g.fillRect(x0, y0, 58, 58);
        const n = r.int(0, 4);
        for (let k = 0; k < n; k++) { g.fillStyle = r.pick(['#e8e0cc', '#d8c8a0', '#c8b88a', '#efe9da', '#b89868']); const ew = r.int(26, 52), eh = r.int(10, 24); g.fillRect(x0 + r.int(2, 58 - ew), y0 + 58 - eh - k * 6, ew, eh); }
        g.fillStyle = '#e8dcc0'; g.fillRect(x0 + 18, y0 + 50, 22, 7); g.fillStyle = '#222'; g.font = `7px ${T.FONTS.FONT_TYPE}`; g.fillText(String.fromCharCode(65 + x) + (y + 1), x0 + 22, y0 + 56);
      }
    }),
    // The ticket dispenser's red number wheel
    ticketFace: () => T.canvas('m3:ticketFace', 128, 128, (g, w, h) => { g.fillStyle = '#b8141a'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff4e0'; g.font = `bold 44px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText('256', w / 2, h / 2 + 15); }),
    // Station clock face (Roman-less, railway style: bold bars, red seconds hand painted separately)
    stationClock: () => T.canvas('m3:stationClock', 256, 256, (g, w, h) => {
      g.fillStyle = '#f2efe4'; g.beginPath(); g.arc(w / 2, h / 2, w / 2, 0, 6.28); g.fill();
      g.fillStyle = '#111';
      for (let k = 0; k < 60; k++) { g.save(); g.translate(w / 2, h / 2); g.rotate(k / 60 * 6.283); if (k % 5 === 0) g.fillRect(-5, -w / 2 + 10, 10, 34); else g.fillRect(-1.5, -w / 2 + 10, 3, 10); g.restore(); }
    }),
    // A notice board of lost-and-found posters (Halvard Transit)
    lostPosters: () => T.canvas('m3:lostPosters', 512, 256, (g, w, h) => {
      g.fillStyle = '#6a4a2a'; g.fillRect(0, 0, w, h);
      const r = U.rng(41);
      const items = [['LOST PROPERTY', 'DEPOT 9 — LOWER CONCOURSE', 'MON–SAT 07:00–19:00'], ['FOUND', 'GREY CAT, ANSWERS', 'TO "ADMIRAL"'], ['HAVE YOU SEEN', 'MY BROWN SUITCASE?', 'REWARD'], ['NOTICE', 'UNCLAIMED ITEMS ARE', 'HELD 90 DAYS'], ['LOST', 'WEDDING RING', 'PLATFORM 4']];
      items.forEach((it, k) => {
        const x = 12 + k * 98 + r.range(-4, 4), y = 14 + r.range(0, 60);
        g.save(); g.translate(x + 44, y + 70); g.rotate(r.range(-0.06, 0.06));
        g.fillStyle = k === 0 ? '#e8d870' : '#efe8d6'; g.fillRect(-44, -70, 88, 140);
        g.fillStyle = '#1a1a1a'; g.font = `bold 11px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center';
        g.fillText(it[0], 0, -48); g.font = `8px ${T.FONTS.FONT_TYPE}`; g.fillText(it[1], 0, -28); g.fillText(it[2], 0, -16);
        for (let l = 0; l < 6; l++) g.fillRect(-32, -2 + l * 9, r.int(30, 64), 2);
        g.fillStyle = '#c01818'; g.beginPath(); g.arc(0, -64, 3, 0, 6.28); g.fill();
        g.restore();
      });
    }),
    // Sign plates: enamel signs for doors
    signPlate: (text, bg = '#1c3a5a', fg = '#f2ecd8') => T.canvas('m3:sign:' + text, 512, 128, (g, w, h) => {
      g.fillStyle = bg; g.fillRect(0, 0, w, h); g.strokeStyle = fg; g.lineWidth = 6; g.strokeRect(10, 10, w - 20, h - 20);
      g.fillStyle = fg; g.font = `bold 44px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText(text, w / 2, h / 2 + 16);
    }),
    // Floor-plan of the station on enamel (wall map)
    stationMap: () => T.canvas('m3:stationMap', 512, 384, (g, w, h) => {
      g.fillStyle = '#e8e2cc'; g.fillRect(0, 0, w, h);
      g.strokeStyle = '#1c3a5a'; g.lineWidth = 6; g.strokeRect(14, 14, w - 28, h - 28);
      g.fillStyle = '#1c3a5a'; g.font = `bold 26px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText('HALVARD CENTRAL', w / 2, 52);
      g.font = `14px ${T.FONTS.FONT_TYPE}`; g.fillText('LOWER CONCOURSE', w / 2, 74);
      g.lineWidth = 3; for (let k = 0; k < 6; k++) g.strokeRect(40 + k * 72, 100, 60, 170);
      g.fillStyle = '#c01818'; g.beginPath(); g.arc(330, 300, 9, 0, 6.28); g.fill(); g.fillStyle = '#1c3a5a'; g.fillText('YOU ARE HERE', 330, 330);
      g.font = `12px ${T.FONTS.FONT_TYPE}`; g.fillText('DEPOT 9 — LOST PROPERTY', 150, 300);
    }),
  });
  Object.assign(M.MATS, {
    typeGreen: { color: 0x22302a, rough: 0.32, metal: 0.35, refl: 0.12 }, keyCap: { color: 0xe6dcc2, rough: 0.35 }, keyRing: { color: 0xa8a8a0, rough: 0.3, metal: 0.9 },
    platen: { color: 0x101010, rough: 0.6 }, shelfGreen: { color: 0x4c5a50, rough: 0.55, metal: 0.45 }, archiveBox: { color: 0x8a7a62, rough: 0.95 },
    archiveFront: { tex: 'archiveBoxes', rough: 0.9 }, pigeonFace: { tex: 'pigeon', rough: 0.9 }, canvasSack: { color: 0x7a6c50, rough: 1 }, mailCanvas: { color: 0x5a5440, rough: 1 },
    suitBrown: { color: 0x5a3a22, rough: 0.55, refl: 0.05 }, suitTan: { color: 0x9a7448, rough: 0.6 }, suitGreen: { color: 0x2e4232, rough: 0.6 }, suitBlue: { color: 0x22304a, rough: 0.5 },
    umbrella: { color: 0x0f0f12, rough: 0.55, double: true }, umbrellaRed: { color: 0x7a1218, rough: 0.55, double: true }, umbrellaCheck: { color: 0x3a3424, rough: 0.6, double: true },
    bikeRed: { color: 0x7a1414, rough: 0.35, metal: 0.4, refl: 0.15 }, radiatorPaint: { color: 0xcfc6b0, rough: 0.5, metal: 0.3 }, castIron: { color: 0x26282a, rough: 0.6, metal: 0.7 },
    ticketFace: { tex: 'ticketFace', rough: 0.4 }, ticketRed: { color: 0xa8141a, rough: 0.35, metal: 0.2, refl: 0.12 }, clockFace: { tex: 'stationClock', rough: 0.3 },
    lostPosters: { tex: 'lostPosters', rough: 0.9 }, stationMap: { tex: 'stationMap', rough: 0.5, refl: 0.1 }, gateSteel: { color: 0x34383a, rough: 0.5, metal: 0.8 },
    linenTag: { color: 0xe4dcc4, rough: 0.9 }, parcelPaper: { color: 0x9a7a52, rough: 0.9 }, stampRed: { color: 0xa82020, rough: 0.6 }, caseClear: { color: 0xc8d0d8, rough: 0.1, transparent: true, opacity: 0.4 }, cassetteBody: { color: 0x2a2624, rough: 0.4 }, linoleumTop: { color: 0x5e6e62, rough: 0.45, refl: 0.08 }, black: { color: 0x0a0a0a, rough: 0.5 }, string: { color: 0x9a8a6a, rough: 1 }, coatWool: { color: 0x2a2a2e, rough: 1 }, coatBeige: { color: 0x9a8a6a, rough: 1 },
    hatFelt: { color: 0x2a221c, rough: 0.95 }, conveyorBelt: { color: 0x141414, rough: 0.85 }, rollerSteel: { color: 0x8a8e92, rough: 0.3, metal: 0.9 },
    // railings and window frames used by world2.js
    railSteel: { color: 0xd8d8d0, rough: 0.45, metal: 0.5 }, railIron: { color: 0x141516, rough: 0.55, metal: 0.7 }, railWood: { color: 0x5a4632, rough: 0.8 },
    windowFrame: { color: 0x3a3c3a, rough: 0.5, metal: 0.4 }, galvanized: { color: 0x8a8e90, rough: 0.45, metal: 0.8 },
    chainLink: { tex: 'chainLink', color: 0xa0a4a8, rough: 0.4, metal: 0.8, alpha: 0.5, double: true },
  });
  M.tex.chainLink = () => {
    const t = T.canvas('m3:chainLink', 128, 128, (g, w, h) => {
      g.clearRect(0, 0, w, h); g.strokeStyle = '#fff'; g.lineWidth = 5;
      g.beginPath(); g.moveTo(0, 0); g.lineTo(w, h); g.moveTo(w, 0); g.lineTo(0, h); g.stroke();
    }, { repeat: true });
    t.repeat.set(5, 5);
    return t;
  };

  // ------------------------------------------------------------ office
  // Manual typewriter, 1950s: green enamel body, four rows of round keys, platen with knobs, a sheet in it
  D.typewriter = (() => {
    const s = [
      ['rbox', 'typeGreen', 0.42, 0.09, 0.34, 0.03, 0, 0.045, 0],
      ['rbox', 'typeGreen', 0.44, 0.07, 0.12, 0.025, 0, 0.12, -0.11],
      ['ext', 'typeGreen', [[-0.2, 0], [0.2, 0], [0.2, 0.04], [-0.2, 0.1]], 0.2, 0.01, 0, 0.08, 0.04, 0, H, 0],
      ['cyl', 'platen', 0.035, 0.035, 0.46, 20, 0, 0.17, -0.12, 0, 0, H],
      ...[-0.25, 0.25].map(x => ['rcyl', 'blackPlastic', 0.03, 0.03, 0.008, 16, x, 0.17, -0.12, 0, 0, H]),
      ['tube', 'chrome', [[-0.24, 0.2, -0.1], [-0.3, 0.22, -0.05], [-0.33, 0.21, 0.02]], 0.006, 6],
      ['box', 'paper', 0.21, 0.22, 0.002, 0, 0.27, -0.15, -0.2],
      ['box', 'chrome', 0.3, 0.01, 0.02, 0, 0.2, -0.07],
    ];
    for (let row = 0; row < 4; row++) for (let k = 0; k < 11 - (row === 3 ? 1 : 0); k++) {
      const x = -0.15 + k * 0.03 + row * 0.008, z = 0.15 - row * 0.03, y = 0.085 + row * 0.012;
      s.push(['rcyl', 'keyCap', 0.011, 0.006, 0.002, 10, x, y, z]);
      s.push(['torus', 'keyRing', 0.011, 0.002, 10, 0, x, y, z, H, 0, 0]);
    }
    s.push(['rbox', 'keyCap', 0.18, 0.012, 0.02, 0.005, 0, 0.075, 0.18]);
    return s;
  })();
  // Pneumatic tube terminal: brass receiver with a bell mouth and a little door, a tube up into the ceiling,
  // a carrier lying in the tray. The memo from the Index comes through here.
  D.tubeTerminal = [
    ['rbox', 'drawerWood', 0.5, 0.6, 0.32, 0.01, 0, 1.0, 0],
    ['lathe', 'brass', [[0.07, 0], [0.075, 0.25], [0.1, 0.32], [0.13, 0.36], [0.13, 0.4], [0.08, 0.4]], 24, 0, 1.3, -0.02],
    ['cyl', 'brass', 0.07, 0.07, 1.6, 20, 0, 2.5, -0.02],
    ['rbox', 'brass', 0.3, 0.12, 0.2, 0.02, 0, 1.18, 0.12],
    ['lathe', 'brass', [[0.04, -0.13], [0.045, -0.12], [0.045, 0.12], [0.04, 0.13], [0.001, 0.13]], 16, 0.04, 1.27, 0.12, 0, 0, H],
    ['rcyl', 'blackPlastic', 0.045, 0.02, 0.006, 16, -0.08, 1.27, 0.12, 0, 0, H],
    ['box', 'labelCard', 0.18, 0.05, 0.004, 0, 1.46, 0.161],
    ['sph', 'redPlastic', 0.015, 0.18, 1.48, 0.16, 10, 8],
  ];
  // The parcel chute: a steel chute coming out of the ceiling at an angle into a padded tray, with a
  // spring flap. Parcels posted in the concourse slide down here.
  D.parcelChute = [
    ['rbox', 'paintMetal', 0.6, 0.06, 1.6, 0.01, 0, 1.6, 0.2, -0.65],
    ...[-0.31, 0.31].map(x => ['rbox', 'paintMetal', 0.02, 0.2, 1.6, 0.005, x, 1.68, 0.18, -0.65]),
    ['rbox', 'paintMetal', 0.66, 0.5, 0.5, 0.01, 0, 2.6, -0.25],
    ['cyl', 'paintMetal', 0.34, 0.34, 1.0, 4, 0, 3.3, -0.25, 0, PI / 4],
    ['rbox', 'paintMetal', 0.75, 0.9, 0.7, 0.01, 0, 0.45, 0.85],
    ['rbox', 'leather', 0.66, 0.04, 0.6, 0.02, 0, 0.92, 0.85],
    ...[-0.36, 0.36].map(x => ['rbox', 'paintMetal', 0.02, 0.18, 0.7, 0.005, x, 1.0, 0.85]),
    ['rbox', 'paintMetal', 0.7, 0.18, 0.02, 0.005, 0, 1.0, 1.2],
    ['rbox', 'darkMetal', 0.56, 0.3, 0.015, 0.006, 0, 1.15, 0.4, 0.4],
    ['box', 'labelCard', 0.4, 0.08, 0.004, 0, 0.75, 1.202],
  ];
  // Archive stack: back-to-back steel shelving, 4.4 m, seven levels of dated boxes, a rolling ladder rail
  D.archiveStack = (() => {
    const s = [], L = 2.94, Dp = 2.6, Hh = 4.4, lv = [0.08, 0.7, 1.32, 1.94, 2.56, 3.18, 3.8];
    for (const x of [-L / 2 + 0.02, -L / 4, 0, L / 4, L / 2 - 0.02]) for (const z of [-Dp / 2 + 0.02, -0.05, 0.05, Dp / 2 - 0.02]) s.push(['box', 'shelfGreen', 0.035, Hh, 0.035, x, Hh / 2, z]);
    for (const y of lv) {
      s.push(['box', 'shelfGreen', L, 0.025, Dp / 2 - 0.08, 0, y, -Dp / 4 - 0.02], ['box', 'shelfGreen', L, 0.025, Dp / 2 - 0.08, 0, y, Dp / 4 + 0.02]);
      if (y < 3.7) {
        s.push(['box', 'archiveBox', L - 0.06, 0.5, Dp / 2 - 0.2, 0, y + 0.265, -Dp / 4 - 0.02], ['box', 'archiveBox', L - 0.06, 0.5, Dp / 2 - 0.2, 0, y + 0.265, Dp / 4 + 0.02]);
      }
    }
    // box fronts: the labels show on both faces
    for (let k = 0; k < 6; k++) {
      const y = lv[k] + 0.265, f = k % 2 ? 0.5 : 0;
      s.push(['plane', 'archiveFront', L - 0.06, 0.5, 0, y, Dp / 2 - 0.099, 0, 0, 0]);
      s.push(['plane', 'archiveFront', L - 0.06, 0.5, 0, y, -Dp / 2 + 0.099, 0, PI, 0]);
      void f;
    }
    s.push(['box', 'shelfGreen', L, 0.03, Dp, 0, Hh, 0]);
    // ladder rail along both faces
    s.push(['cyl', 'chrome', 0.015, 0.015, L, 8, 0, 3.6, Dp / 2 + 0.06, 0, 0, H], ['cyl', 'chrome', 0.015, 0.015, L, 8, 0, 3.6, -Dp / 2 - 0.06, 0, 0, H]);
    return s;
  })();
  // A rolling library ladder hooked on the rail
  D.rollingLadder = (() => {
    const s = [];
    for (const x of [-0.24, 0.24]) s.push(['box', 'woodVarnish', 0.05, 3.7, 0.07, x, 1.85, 0.35, -0.2]);
    for (let k = 0; k < 11; k++) { const y = 0.3 + k * 0.32; s.push(['box', 'woodVarnish', 0.48, 0.03, 0.09, 0, y, 0.35 + Math.sin(0.2) * (1.85 - y) * 1.0 - 0.37 + 0.02, -0.2 + 0.2]); }
    s.push(['torus', 'chrome', 0.03, 0.008, 10, 0, -0.2, 3.62, 0.0, 0, H, 0], ['torus', 'chrome', 0.03, 0.008, 10, 0, 0.2, 3.62, 0.0, 0, H, 0]);
    for (const x of [-0.24, 0.24]) s.push(['cyl', 'blackPlastic', 0.04, 0.04, 0.03, 12, x, 0.04, 0.7, 0, 0, H]);
    return s;
  })();
  // The 1979 ledger box: a heavier black box with brass corners and a typed label
  D.ledgerBox = [
    ['rbox', 'blackFabric', 0.32, 0.42, 0.26, 0.01, 0, 0.21, 0],
    ...[[-0.16, 0.405, 0.13], [0.16, 0.405, 0.13], [-0.16, 0.015, 0.13], [0.16, 0.015, 0.13]].map(([x, y, z]) => ['box', 'brass', 0.03, 0.03, 0.01, x, y, z]),
    ['box', 'linenTag', 0.2, 0.12, 0.004, 0, 0.28, 0.132],
  ];

  // ------------------------------------------------------------ lost things
  // Wire cage of umbrellas: a mesh bin crammed with closed umbrellas, handles up, at angles
  D.umbrellaCage = (() => {
    const s = [];
    for (const x of [-0.5, 0.5]) for (const z of [-0.3, 0.3]) s.push(['cyl', 'gateSteel', 0.012, 0.012, 1.0, 6, x, 0.5, z]);
    for (const y of [0.05, 0.5, 0.98]) { s.push(['box', 'gateSteel', 1.0, 0.012, 0.012, 0, y, -0.3], ['box', 'gateSteel', 1.0, 0.012, 0.012, 0, y, 0.3], ['box', 'gateSteel', 0.012, 0.012, 0.6, -0.5, y, 0], ['box', 'gateSteel', 0.012, 0.012, 0.6, 0.5, y, 0]); }
    for (let k = -0.45; k <= 0.45; k += 0.1) { s.push(['box', 'gateSteel', 0.004, 0.94, 0.004, k, 0.5, -0.3], ['box', 'gateSteel', 0.004, 0.94, 0.004, k, 0.5, 0.3]); }
    const r = U.rng(5);
    for (let k = 0; k < 22; k++) {
      const x = r.range(-0.42, 0.42), z = r.range(-0.24, 0.24), ax = r.range(-0.25, 0.25), az = r.range(-0.25, 0.25), len = r.range(0.85, 1.05);
      const mat = r.pick(['umbrella', 'umbrella', 'umbrella', 'umbrellaRed', 'umbrellaCheck']);
      s.push(['cone', mat, 0.045, len * 0.75, 8, x, len * 0.42, z, PI + ax, 0, az]);
      s.push(['cyl', 'darkWood', 0.008, 0.008, 0.2, 6, x - az * 0.7, len * 0.82, z + ax * 0.7, ax, 0, az]);
      if (r() < 0.6) s.push(['torus', 'darkWood', 0.04, 0.01, 10, PI, x - az * 0.9 + 0.04, len * 0.93, z + ax * 0.9, 0, 0, 0]);
    }
    return s;
  })();
  // Suitcases: three shapes, tags tied on
  const suitcase = (mat, w, h, d) => [
    ['rbox', mat, w, h, d, 0.03, 0, h / 2, 0],
    ['rbox', 'darkWood', w + 0.006, 0.03, d + 0.006, 0.01, 0, h * 0.62, 0],
    ...[-w / 2 + 0.06, w / 2 - 0.06].map(x => ['rbox', 'brass', 0.04, 0.03, 0.012, 0.004, x, h * 0.62, d / 2 + 0.005]),
    ['tube', 'leather', [[-0.08, h, 0], [-0.07, h + 0.05, 0], [0.07, h + 0.05, 0], [0.08, h, 0]], 0.012, 6],
    ['tube', 'string', [[0.07, h + 0.02, 0.01], [0.1, h - 0.04, 0.03], [0.12, h - 0.1, 0.04]], 0.002, 3],
    ['box', 'linenTag', 0.05, 0.08, 0.002, 0.12, h - 0.13, 0.045, 0, 0.3, 0.2],
  ];
  D.suitcase = suitcase('suitBrown', 0.7, 0.45, 0.2);
  // A pile: flat cases stacked, one upright beside, a hatbox on top
  D.suitcasePile = [
    ...M.place([['rbox', 'suitBrown', 0.78, 0.22, 0.5, 0.03, 0, 0.11, 0], ['rbox', 'darkWood', 0.79, 0.02, 0.51, 0.008, 0, 0.17, 0]], 0, 0, 0, 0, 0.1, 0),
    ...M.place([['rbox', 'suitTan', 0.66, 0.2, 0.44, 0.03, 0, 0.32, 0], ['rbox', 'brass', 0.04, 0.03, 0.01, 0.004, 0.2, 0.35, 0.225], ['rbox', 'brass', 0.04, 0.03, 0.01, 0.004, -0.2, 0.35, 0.225]], 0, 0, 0, 0, -0.2, 0),
    ...M.place([['rbox', 'suitGreen', 0.56, 0.18, 0.38, 0.03, 0, 0.51, 0]], 0.04, 0, 0, 0, 0.35, 0),
    ['lathe', 'suitBlue', [[0.001, 0], [0.18, 0], [0.18, 0.2], [0.001, 0.2]], 24, 0.05, 0.6, 0.02],
    ['torus', 'darkWood', 0.18, 0.006, 24, 0, 0.05, 0.7, 0.02, H, 0, 0],
    ...M.place(suitcase('suitBlue', 0.6, 0.48, 0.2), 0.58, 0, 0.1, 0, -0.3, 0),
  ];
  // Upright black bicycle, 1960s roadster, leaning
  D.bicycle = (() => {
    const s = [];
    for (const x of [-0.55, 0.55]) {
      s.push(['torus', 'rubber', 0.33, 0.018, 32, 0, x, 0.35, 0, 0, 0, 0]);
      s.push(['torus', 'chrome', 0.31, 0.008, 32, 0, x, 0.35, 0, 0, 0, 0]);
      for (let k = 0; k < 12; k++) { const a = k / 12 * PI; s.push(['cyl', 'chrome', 0.0015, 0.0015, 0.6, 3, x, 0.35, 0, 0, 0, a]); }
      s.push(['cyl', 'chrome', 0.02, 0.02, 0.06, 10, x, 0.35, 0, H, 0, 0]);
    }
    s.push(['tube', 'bikeRed', [[-0.55, 0.35, 0], [-0.1, 0.32, 0], [0.45, 0.7, 0]], 0.016, 6]);
    s.push(['tube', 'bikeRed', [[-0.1, 0.32, 0], [-0.18, 0.78, 0]], 0.016, 6]);
    s.push(['tube', 'bikeRed', [[-0.18, 0.72, 0], [0.42, 0.78, 0]], 0.014, 6]);
    s.push(['tube', 'bikeRed', [[-0.55, 0.35, 0.03], [-0.18, 0.75, 0.03]], 0.01, 6], ['tube', 'bikeRed', [[-0.55, 0.35, -0.03], [-0.18, 0.75, -0.03]], 0.01, 6]);
    s.push(['tube', 'bikeRed', [[0.55, 0.35, 0], [0.47, 0.62, 0], [0.42, 0.85, 0]], 0.014, 6]);
    s.push(['tube', 'chrome', [[0.42, 0.85, 0], [0.38, 0.98, 0], [0.3, 1.0, -0.25], [0.22, 0.98, -0.32]], 0.011, 6], ['tube', 'chrome', [[0.38, 0.98, 0], [0.3, 1.0, 0.25], [0.22, 0.98, 0.32]], 0.011, 6]);
    s.push(['cap', 'blackPlastic', 0.016, 0.08, 0.22, 0.98, -0.33, H, 0, 0], ['cap', 'blackPlastic', 0.016, 0.08, 0.22, 0.98, 0.33, H, 0, 0]);
    s.push(['rbox', 'leather', 0.24, 0.05, 0.14, 0.03, -0.2, 0.84, 0]);
    s.push(['cyl', 'chrome', 0.008, 0.008, 0.1, 6, -0.19, 0.78, 0]);
    s.push(['cyl', 'chrome', 0.06, 0.06, 0.02, 20, -0.1, 0.32, 0.05, H, 0, 0]);
    s.push(['rbox', 'darkMetal', 0.7, 0.02, 0.1, 0.005, -0.32, 0.36, 0.06, 0, 0, 0.05]);
    s.push(['lathe', 'chrome', [[0.001, 0], [0.05, 0.01], [0.06, 0.06], [0.001, 0.07]], 14, 0.5, 0.84, 0, 0, 0, -H]);
    s.push(['torus', 'chrome', 0.28, 0.006, 24, PI * 0.6, -0.55, 0.35, 0, 0, 0, 0.4]);
    return s;
  })();
  // Canvas mail sack, tied at the neck
  D.mailSack = [
    ['lathe', 'mailCanvas', [[0.001, 0], [0.22, 0.02], [0.28, 0.15], [0.27, 0.35], [0.2, 0.52], [0.08, 0.6], [0.05, 0.66], [0.07, 0.72], [0.001, 0.74]], 18, 0, 0, 0, 0, 0, 0, [1, 1, 0.75]],
    ['torus', 'string', 0.055, 0.008, 10, 0, 0, 0.63, 0, H, 0, 0],
    ['box', 'linenTag', 0.06, 0.09, 0.002, 0.06, 0.55, 0.06, 0, 0.4, 0.2],
    ['box', 'black', 0.2, 0.08, 0.001, 0, 0.3, 0.21, -0.2, 0, 0],
  ];
  // Long sorting table: steel frame, linoleum top, a roller conveyor section, parcels and a scale
  D.sortingTable = [
    ['rbox', 'linoleumTop', 3.0, 0.04, 0.9, 0.01, 0, 0.9, 0],
    ...[[-1.42, -0.4], [1.42, -0.4], [-1.42, 0.4], [1.42, 0.4], [0, -0.4], [0, 0.4]].map(([x, z]) => ['box', 'paintMetal', 0.05, 0.88, 0.05, x, 0.44, z]),
    ['box', 'paintMetal', 2.9, 0.03, 0.85, 0, 0.25, 0],
    ...[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map(z => ['rbox', 'cardboard', 0.42, 0.18 + (z + 0.5) * 0.1, 0.32, 0.01, -1.0 + z, 0.36, 0.02 * z]),
    ['rbox', 'cardboard', 0.5, 0.3, 0.4, 0.01, -0.8, 1.07, 0.1, 0, 0.3],
    ['rbox', 'cardboard', 0.3, 0.2, 0.3, 0.01, 0.3, 1.02, -0.2, 0, -0.2],
    ['box', 'tape', 0.06, 0.302, 0.402, -0.8, 1.07, 0.1, 0, 0.3, 0],
    ['rbox', 'paintMetal', 0.4, 0.08, 0.35, 0.01, 1.0, 0.96, 0],
    ['rbox', 'chrome', 0.34, 0.01, 0.3, 0.005, 1.0, 1.005, 0],
    ['lathe', 'whitePlastic', [[0.001, 0], [0.09, 0], [0.09, 0.02], [0.001, 0.02]], 24, 1.0, 1.02, -0.22, H, 0, 0],
    ['box', 'paper', 0.21, 0.004, 0.3, 0.6, 0.922, 0.25, 0, 0.4],
    ['box', 'paper', 0.21, 0.004, 0.3, 0.62, 0.926, 0.27, 0, 0.1],
  ];
  // Wall of pigeonholes (8 x 8) in oak
  D.pigeonholes = [
    ['rbox', 'drawerWood', 2.2, 2.0, 0.42, 0.01, 0, 1.4, 0],
    ['box', 'pigeonFace', 2.1, 1.9, 0.002, 0, 1.4, 0.212],
    ['rbox', 'drawerWood', 2.3, 0.05, 0.5, 0.01, 0, 2.42, 0.02],
    ['rbox', 'drawerWood', 2.2, 0.4, 0.5, 0.01, 0, 0.2, 0.02],
    ...[-0.6, 0, 0.6].map(x => ['rbox', 'brass', 0.12, 0.02, 0.02, 0.006, x, 0.25, 0.28]),
  ];
  // Cast-iron column radiator under a window, with a valve
  D.radiator = (() => {
    const s = [];
    for (let k = 0; k < 14; k++) s.push(['rbox', 'radiatorPaint', 0.06, 0.62, 0.18, 0.025, -0.42 + k * 0.065, 0.42, 0]);
    s.push(['cyl', 'radiatorPaint', 0.02, 0.02, 0.92, 10, 0, 0.16, 0, 0, 0, H], ['cyl', 'radiatorPaint', 0.02, 0.02, 0.92, 10, 0, 0.68, 0, 0, 0, H]);
    s.push(['cyl', 'chrome', 0.014, 0.014, 0.14, 8, -0.52, 0.16, 0, 0, 0, H], ['rcyl', 'blackPlastic', 0.03, 0.03, 0.006, 12, -0.55, 0.24, 0]);
    s.push(['cyl', 'chrome', 0.014, 0.014, 0.16, 8, -0.56, 0.08, 0]);
    for (const x of [-0.4, 0.4]) s.push(['box', 'radiatorPaint', 0.04, 0.12, 0.12, x, 0.06, 0]);
    return s;
  })();
  // Bentwood coat stand with a coat and a hat left on it
  D.coatStand = [
    ['cyl', 'darkWood', 0.025, 0.03, 1.8, 10, 0, 0.9, 0],
    ...[0, 1, 2, 3].map(k => ['tube', 'darkWood', [[0, 0.05, 0], [Math.cos(k * H) * 0.15, 0.06, Math.sin(k * H) * 0.15], [Math.cos(k * H) * 0.28, 0.0, Math.sin(k * H) * 0.28]], 0.016, 6]),
    ...[0, 1, 2, 3].map(k => ['tube', 'darkWood', [[0, 1.65, 0], [Math.cos(k * H + 0.6) * 0.12, 1.72, Math.sin(k * H + 0.6) * 0.12], [Math.cos(k * H + 0.6) * 0.17, 1.8, Math.sin(k * H + 0.6) * 0.17]], 0.012, 6]),
    ['sph', 'darkWood', 0.035, 0, 1.82, 0, 10, 8],
    ['lathe', 'coatWool', [[0.001, 1.72], [0.12, 1.68], [0.2, 1.5], [0.24, 1.1], [0.26, 0.75], [0.23, 0.72], [0.001, 0.72]], 16, 0.06, 0, 0.05, 0, 0, 0, [1, 1, 0.55]],
    ['lathe', 'hatFelt', [[0.001, 0.13], [0.09, 0.12], [0.1, 0.03], [0.17, 0.02], [0.17, 0.0], [0.001, 0.0]], 20, -0.1, 1.78, -0.08],
  ];
  // Take-a-number dispenser on a post: red housing, a paper roll, "256" on its face
  D.ticketDispenser = [
    ['lathe', 'castIron', [[0.001, 0], [0.18, 0], [0.18, 0.03], [0.04, 0.05], [0.025, 0.06], [0.001, 0.06]], 20],
    ['cyl', 'chrome', 0.02, 0.02, 1.1, 10, 0, 0.6, 0],
    ['rcyl', 'ticketRed', 0.11, 0.12, 0.03, 24, 0, 1.22, 0, H, 0, 0],
    ['disc', 'ticketFace', 0.08, 0, 1.22, 0.062],
    ['box', 'paper', 0.04, 0.06, 0.003, 0.08, 1.12, 0.06, 0, 0, 0.2],
  ];
  // The station clock in the public hall: double-sided on a wall bracket
  D.stationClock = [
    ['rcyl', 'castIron', 0.3, 0.12, 0.02, 32, 0, 0, 0, H, 0, 0],
    ['disc', 'clockFace', 0.27, 0, 0, 0.061], ['disc', 'clockFace', 0.27, 0, 0, -0.061, 0, PI, 0],
    ['box', 'black', 0.025, 0.2, 0.004, 0, 0.08, 0.066, 0, 0, -1.02], ['box', 'black', 0.03, 0.15, 0.004, 0, 0.06, 0.068, 0, 0, 2.6],
    ['box', 'black', 0.025, 0.2, 0.004, 0, 0.08, -0.066, 0, 0, 1.02], ['box', 'black', 0.03, 0.15, 0.004, 0, 0.06, -0.068, 0, 0, -2.6],
    ['box', 'castIron', 0.06, 0.06, 0.6, 0, 0.32, -0.05, 0, 0, 0],
    ['box', 'castIron', 0.12, 0.25, 0.04, 0, 0.42, -0.36],
  ];
  // Lost-and-found notice board (enamel frame, posters)
  D.lostBoard = [...M.frame('castIron', 1.6, 0.85, 0.05, 0.04, 0, 0, 0), ['box', 'lostPosters', 1.5, 0.75, 0.01, 0, 0, -0.005]];
  D.stationMap = [...M.frame('castIron', 1.0, 0.76, 0.03, 0.03, 0, 0, 0), ['box', 'stationMap', 0.94, 0.7, 0.008, 0, 0, -0.004]];
  // Freight elevator scissor gate (for the lobby side of the shaft), with the call button and the
  // number scratched above it
  D.scissorGate = (() => {
    const s = [];
    for (let k = 0; k < 9; k++) {
      const x = -1.0 + k * 0.25;
      s.push(['box', 'gateSteel', 0.025, 2.3, 0.02, x, 1.15, 0]);
      if (k < 8) { s.push(['box', 'gateSteel', 0.36, 0.02, 0.012, x + 0.125, 0.6, 0.012, 0, 0, 1.1]); s.push(['box', 'gateSteel', 0.36, 0.02, 0.012, x + 0.125, 0.6, 0.012, 0, 0, -1.1]); s.push(['box', 'gateSteel', 0.36, 0.02, 0.012, x + 0.125, 1.7, 0.012, 0, 0, 1.1]); s.push(['box', 'gateSteel', 0.36, 0.02, 0.012, x + 0.125, 1.7, 0.012, 0, 0, -1.1]); }
    }
    s.push(['box', 'gateSteel', 2.1, 0.08, 0.08, 0, 2.34, 0], ['box', 'gateSteel', 2.1, 0.06, 0.06, 0, 0.03, 0]);
    return s;
  })();
  D.callPanel = [
    ['rbox', 'brass', 0.14, 0.32, 0.03, 0.01, 0, 0, 0],
    ['rcyl', 'blackPlastic', 0.025, 0.015, 0.005, 16, 0, 0.07, 0.02, H, 0, 0], ['rcyl', 'blackPlastic', 0.025, 0.015, 0.005, 16, 0, -0.03, 0.02, H, 0, 0],
    ['box', 'labelCard', 0.08, 0.025, 0.003, 0, 0.13, 0.017],
  ];
  // Station bench: cast-iron ends, oak slats
  D.stationBench = [
    ...[0.3, 0.42, 0.54].map((y, k) => ['rbox', 'woodVarnish', 2.2, 0.03, 0.09, 0.008, 0, 0.44, -0.16 + k * 0.11]),
    ...[0, 1, 2].map(k => ['rbox', 'woodVarnish', 2.2, 0.09, 0.03, 0.008, 0, 0.56 + k * 0.12, -0.22 - k * 0.025, -0.15]),
    ...[-1.0, 1.0].flatMap(x => [
      ['ext', 'castIron', [[-0.25, 0], [-0.18, 0], [-0.05, 0.42], [0.2, 0.42], [0.25, 0], [0.32, 0], [0.24, 0.46], [-0.22, 0.48], [-0.3, 0.95], [-0.35, 0.95], [-0.27, 0.46]], 0.04, 0.005, x, 0, 0, 0, H, 0],
      ['tube', 'castIron', [[x, 0.46, 0.25], [x, 0.62, 0.27], [x, 0.66, 0.15], [x, 0.6, 0.0]], 0.018, 6],
    ]),
  ];
  // Staff locker bank (three tall lockers), Ada's in the middle with her name card
  D.staffLockers = [
    ...[-0.4, 0, 0.4].flatMap(x => [
      ['rbox', 'lockerPaint', 0.39, 1.9, 0.5, 0.008, x, 0.95, 0],
      ['rbox', 'lockerPaint', 0.36, 1.84, 0.02, 0.004, x, 0.95, 0.255],
      ...[1.6, 1.55, 1.5, 1.45, 0.4, 0.35, 0.3].map(y => ['box', 'lockerDark', 0.22, 0.012, 0.004, x, y, 0.267]),
      ['rbox', 'chrome', 0.02, 0.1, 0.03, 0.005, x + 0.13, 1.0, 0.275],
      ['box', 'labelCard', 0.1, 0.03, 0.003, x, 1.75, 0.267],
    ]),
    ['rbox', 'lockerPaint', 1.22, 0.04, 0.52, 0.006, 0, 1.92, 0],
  ];
  // A shuttered ticket window (station), roller shutter down
  D.shutter = (() => {
    const s = [['rbox', 'castIron', 2.6, 0.3, 0.3, 0.01, 0, 2.55, 0.1]];
    for (let k = 0; k < 26; k++) s.push(['rbox', 'galvanized', 2.5, 0.09, 0.03, 0.01, 0, 0.1 + k * 0.094, 0.06]);
    s.push(['box', 'castIron', 0.06, 2.6, 0.12, -1.28, 1.3, 0.06], ['box', 'castIron', 0.06, 2.6, 0.12, 1.28, 1.3, 0.06]);
    s.push(['rbox', 'chrome', 0.3, 0.04, 0.06, 0.01, 0, 0.12, 0.1]);
    return s;
  })();
  // Wall-mounted breaker panel (main switch with a big lever), Depot 9's power
  D.breakerPanel = [
    ['rbox', 'paintMetal', 0.7, 1.0, 0.22, 0.01, 0, 0, 0.11],
    ['rbox', 'paintMetal', 0.66, 0.96, 0.02, 0.006, 0, 0, 0.23],
    ['rbox', 'castIron', 0.12, 0.3, 0.08, 0.01, 0.38, 0.05, 0.12],
    ['box', 'redPlastic', 0.03, 0.26, 0.03, 0.45, 0.12, 0.14, 0.5, 0, 0],
    ['box', 'labelCard', 0.3, 0.06, 0.003, 0, 0.42, 0.242], ['box', 'yellowPaper', 0.1, 0.1, 0.003, -0.22, -0.3, 0.242, 0, 0, 0.785],
  ];
  // A pile of lost odds and ends on a shelf: gloves, a teddy, a thermos, books
  D.lostShelf = [
    ...[0.3, 0.9, 1.5].map(y => ['rbox', 'drawerWood', 1.8, 0.03, 0.45, 0.005, 0, y, 0]),
    ...[-0.88, 0.88].map(x => ['box', 'drawerWood', 0.03, 1.8, 0.45, x, 0.9, 0]),
    ['box', 'drawerWood', 1.8, 1.8, 0.02, 0, 0.9, -0.22],
    ['sph', 'bluePlush', 0.1, -0.5, 0.44, 0.05, 12, 10], ['sph', 'bluePlush', 0.07, -0.5, 0.6, 0.05, 12, 10],
    ['lathe', 'redPaint', [[0.001, 0], [0.05, 0], [0.05, 0.26], [0.03, 0.29], [0.001, 0.29]], 16, 0.4, 0.32, 0],
    ['rbox', 'coatWool', 0.2, 0.03, 0.12, 0.01, 0.0, 0.33, 0.05, 0, 0.3],
    ['rbox', 'books', 0.5, 0.24, 0.2, 0.01, -0.4, 1.03, 0],
    ['rbox', 'suitTan', 0.4, 0.3, 0.15, 0.03, 0.4, 1.07, 0],
    ['lathe', 'hatFelt', [[0.001, 0.12], [0.09, 0.11], [0.1, 0.03], [0.16, 0.02], [0.16, 0.0], [0.001, 0.0]], 20, 0.1, 1.53, 0.02],
    ['rbox', 'umbrella', 0.06, 0.06, 0.8, 0.02, -0.4, 1.56, 0.0, 0, 0.1],
  ];


  // ------------------------------------------------------------ things in the prologue
  // The parcel from the chute: brown paper, string, a luggage tag with a typed number
  D.parcelBox = [
    ['rbox', 'parcelPaper', 0.34, 0.14, 0.26, 0.012, 0, 0.07, 0],
    ['box', 'string', 0.345, 0.006, 0.012, 0, 0.141, 0], ['box', 'string', 0.012, 0.006, 0.265, 0, 0.141, 0],
    ['box', 'string', 0.346, 0.142, 0.012, 0, 0.07, 0], ['box', 'string', 0.012, 0.142, 0.266, 0, 0.07, 0],
    ['torus', 'string', 0.018, 0.003, 8, 0, 0.0, 0.147, 0, H, 0, 0],
    ['tube', 'string', [[0.0, 0.145, 0.0], [0.06, 0.15, 0.06], [0.11, 0.146, 0.09]], 0.002, 3],
    ['box', 'linenTag', 0.06, 0.002, 0.1, 0.13, 0.144, 0.1, 0, 0.5, 0],
    ['box', 'stampRed', 0.05, 0.002, 0.04, -0.1, 0.1405, -0.08],
  ];
  // Grandmother's cassette in its case
  D.cassette = [
    ['rbox', 'caseClear', 0.11, 0.017, 0.07, 0.003, 0, 0.0085, 0],
    ['box', 'cassetteBody', 0.1, 0.012, 0.064, 0, 0.009, 0],
    ['box', 'linenTag', 0.08, 0.0005, 0.03, 0, 0.0177, 0.006],
  ];
  // Otto's brass badge: an oval with the depot number, on a worn strap
  D.badge = [
    ['rcyl', 'brass', 0.035, 0.004, 0.0015, 24, 0, 0.002, 0, 0, 0, 0, ],
    ['torus', 'brass', 0.034, 0.002, 24, 0, 0, 0.004, 0, H, 0, 0],
    ['box', 'leather', 0.02, 0.003, 0.09, 0, 0.0015, -0.07, 0, 0.2, 0],
  ];
  // Oak counter top along the glass screen (staff side), with a brass edge and a bell
  D.counterTop = [
    ['rbox', 'woodVarnish', 3.0, 0.05, 0.6, 0.01, 0, 0.88, 0.2],
    ['rbox', 'drawerWood', 3.0, 0.84, 0.05, 0.01, 0, 0.42, -0.08],
    ['box', 'brass', 3.0, 0.015, 0.015, 0, 0.9, 0.5],
    ['box', 'paper', 0.21, 0.004, 0.3, 0.6, 0.908, 0.25, 0, 0.3],
    ['lathe', 'chrome', [[0.001, 0.06], [0.03, 0.055], [0.045, 0.02], [0.05, 0.0], [0.001, 0.0]], 16, -0.9, 0.905, 0.3],
    ['rbox', 'blackPlastic', 0.12, 0.02, 0.1, 0.005, -0.9, 0.9, 0.3],
  ];
  // Stairs climbing to the concourse behind the gate, lit cold from the top (only seen through bars)
  D.stairsUpLit = (() => {
    const s = [];
    for (let k = 0; k < 14; k++) { s.push(['box', 'concrete', 2.4, 0.18, 0.3, 0, 0.09 + k * 0.18, 0.35 + k * 0.3]); s.push(['box', 'brass', 2.4, 0.015, 0.03, 0, 0.18 + k * 0.18, 0.21 + k * 0.3]); }
    s.push(['box', 'concrete', 0.1, 4.0, 4.6, -1.25, 2.0, 2.3], ['box', 'concrete', 0.1, 4.0, 4.6, 1.25, 2.0, 2.3], ['box', 'concrete', 2.6, 0.1, 4.6, 0, 3.6, 2.6]);
    s.push(['tube', 'brass', [[-1.15, 1.0, 0.2], [-1.15, 3.5, 4.4]], 0.025, 8]);
    s.push(['box', 'whiteLight', 2.0, 0.6, 0.05, 0, 3.4, 4.5]);
    return s;
  })();
  // More fixtures: an opal globe pendant on a rod (1930s station), a wall sconce
  const fixture0 = M.fixture;
  M.fixture = function (kind, ceil, lightY) {
    const drop = Math.max(0, ceil - lightY);
    if (kind === 'globe') {
      const len = Math.max(0.1, drop - 0.2);
      return {
        glow: [['sph', 'glow', 0.17, 0, 0, 0, 24, 16]],
        body: [['cyl', 'brass', 0.01, 0.01, len, 8, 0, 0.2 + len / 2, 0], ['lathe', 'brass', [[0.001, 0.2], [0.07, 0.18], [0.08, 0.14], [0.05, 0.12], [0.001, 0.12]], 20], ['rcyl', 'brass', 0.06, 0.02, 0.005, 16, 0, 0.2 + len, 0]],
        tex: 'opal', base: 3.2, yOff: drop - 0.2 - len,
      };
    }
    if (kind === 'sconce') {
      return {
        glow: [['lathe', 'glow', [[0.001, 0.0], [0.08, 0.02], [0.1, 0.12], [0.001, 0.14]], 16, 0, 0, 0.12]],
        body: [['rbox', 'brass', 0.1, 0.16, 0.02, 0.005, 0, 0, 0], ['tube', 'brass', [[0, 0, 0.01], [0, -0.02, 0.08], [0, 0.0, 0.12]], 0.01, 6]],
        tex: 'opal', base: 2.6, yOff: 0,
      };
    }
    return fixture0(kind, ceil, lightY);
  };
})(typeof window !== 'undefined' ? window : globalThis);
