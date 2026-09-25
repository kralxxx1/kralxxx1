/* Props for the new chapters: school, hospital, motel, mall, street, workshop, tunnels.
   Also the material table used by the world for simple colored and textured materials. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const M = PB.Models, D = PB.Props.DEFS, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ textures
  Object.assign(M.tex, {
    // Fir needles: dense dark strokes over a deep green
    pine: () => T.canvas('m2:pine', 256, 256, (g, w, h) => {
      const r = U.rng(1225);
      g.fillStyle = '#123a1c'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 2600; k++) { const x = r() * w, y = r() * h, l = r.range(6, 16), a = r.range(-0.9, 0.9) + (k % 2 ? Math.PI : 0); g.strokeStyle = `rgba(${20 + r() * 40},${70 + r() * 70},${30 + r() * 30},0.8)`; g.lineWidth = r.range(1, 2); g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(a) * l, y + Math.cos(a) * l); g.stroke(); }
      for (let k = 0; k < 500; k++) { g.fillStyle = `rgba(0,0,0,${r() * 0.35})`; g.fillRect(r() * w, r() * h, 3, 3); }
    }, { repeat: true }),
    // A window at night in the rain: dark sky, a few far lights smeared by water, streaks and beads on the glass
    nightWindow: () => T.canvas('m2:nightWindow', 256, 384, (g, w, h) => {
      const r = U.rng(207);
      const sky = g.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#0a0e18'); sky.addColorStop(0.7, '#141a26'); sky.addColorStop(1, '#1e1a1a');
      g.fillStyle = sky; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 14; k++) { const x = r() * w, y = h * (0.55 + r() * 0.35), rad = r.range(4, 14); const grd = g.createRadialGradient(x, y, 0, x, y, rad * 2.5); const c = r.pick(['255,210,140', '255,180,110', '200,220,255']); grd.addColorStop(0, `rgba(${c},0.9)`); grd.addColorStop(1, `rgba(${c},0)`); g.fillStyle = grd; g.fillRect(x - rad * 3, y - rad * 3, rad * 6, rad * 6); }
      g.fillStyle = '#07080c'; for (let k = 0; k < 6; k++) { const x = k * 45 + r.range(-10, 10), bh = r.range(40, 110); g.fillRect(x, h - bh, r.range(30, 60), bh); }
      g.strokeStyle = 'rgba(190,210,235,0.22)'; g.lineWidth = 1.2;
      for (let k = 0; k < 70; k++) { let x = r() * w, y = r() * h; g.beginPath(); g.moveTo(x, y); for (let s = 0; s < 6; s++) { x += r.range(-2, 2); y += r.range(6, 16); g.lineTo(x, y); } g.stroke(); }
      for (let k = 0; k < 220; k++) { const x = r() * w, y = r() * h, rr = r.range(0.8, 2.6); g.fillStyle = `rgba(210,225,245,${r.range(0.1, 0.35)})`; g.beginPath(); g.arc(x, y, rr, 0, 6.28); g.fill(); }
    }),
    chalk: () => T.canvas('m2:chalk', 512, 256, (g, w, h) => {
      g.fillStyle = '#233a2c'; g.fillRect(0, 0, w, h);
      const r = U.rng(3);
      g.fillStyle = 'rgba(255,255,255,0.05)'; for (let k = 0; k < 30; k++) { g.beginPath(); g.ellipse(r() * w, r() * h, r.range(30, 120), r.range(10, 40), r() * 3, 0, 6.28); g.fill(); }
      g.strokeStyle = 'rgba(240,240,230,0.75)'; g.fillStyle = 'rgba(240,240,230,0.8)'; g.font = `34px ${T.FONTS.FONT_HAND}`;
      g.fillText('April 16, 1987', 30, 50); g.fillText('Homework: ch. 12, p. 214', 30, 100); g.fillText('SPRING DANCE — FRI. 4/24', 30, 150);
      g.font = `26px ${T.FONTS.FONT_HAND}`; g.fillText('256 ←?', 380, 210);
    }),
    books: () => T.canvas('m2:books', 256, 256, (g, w, h) => {
      const r = U.rng(8);
      for (let row = 0; row < 4; row++) { let x = 0; while (x < w) { const bw = r.range(6, 16), bh = r.range(44, 60); g.fillStyle = `hsl(${r() * 360 | 0},${30 + r() * 40 | 0}%,${20 + r() * 30 | 0}%)`; g.fillRect(x, row * 64 + 64 - bh, bw - 1, bh); g.fillStyle = 'rgba(255,230,160,0.4)'; g.fillRect(x + 2, row * 64 + 64 - bh + 8, bw - 5, 2); x += bw; } }
    }, { repeat: true }),
    spread: () => T.canvas('m2:spread', 256, 256, (g, w, h) => {
      g.fillStyle = '#7a4a2a'; g.fillRect(0, 0, w, h);
      const r = U.rng(4);
      for (let k = 0; k < 40; k++) { const x = r() * w, y = r() * h; g.fillStyle = r() < 0.5 ? '#c8883a' : '#e0b060'; for (let p = 0; p < 6; p++) { g.beginPath(); g.ellipse(x + Math.cos(p) * 8, y + Math.sin(p) * 8, 7, 4, p, 0, 6.28); g.fill(); } g.fillStyle = '#4a2a14'; g.beginPath(); g.arc(x, y, 4, 0, 6.28); g.fill(); }
    }, { repeat: true }),
    records: () => T.canvas('m2:records', 256, 128, (g, w, h) => {
      const r = U.rng(12);
      let x = 0; while (x < w) { const bw = r.range(3, 6); g.fillStyle = `hsl(${r() * 360 | 0},${40 + r() * 50 | 0}%,${25 + r() * 40 | 0}%)`; g.fillRect(x, 0, bw, h); x += bw; }
    }, { repeat: true }),
    comics: () => T.canvas('m2:comics', 512, 256, (g, w, h) => {
      const r = U.rng(21);
      for (let y = 0; y < 3; y++) for (let x = 0; x < 8; x++) { g.fillStyle = `hsl(${r() * 360 | 0},70%,${40 + r() * 20 | 0}%)`; g.fillRect(x * 64 + 4, y * 85 + 4, 56, 77); g.fillStyle = '#fff'; g.fillRect(x * 64 + 8, y * 85 + 8, 48, 12); g.fillStyle = '#000'; g.font = 'bold 9px sans-serif'; g.fillText(['X-MEN', 'BAT', 'SPIDEY', 'HULK', 'THOR', 'NOVA'][(x + y) % 6], x * 64 + 10, y * 85 + 18); }
    }),
    toys: () => T.canvas('m2:toys', 256, 256, (g, w, h) => {
      const r = U.rng(33);
      for (let k = 0; k < 40; k++) { g.fillStyle = `hsl(${r() * 360 | 0},80%,55%)`; g.fillRect(r() * w, r() * h, r.range(12, 40), r.range(12, 40)); }
    }, { repeat: true }),
    vendingFront: () => T.canvas('m2:vend', 256, 512, (g, w, h) => {
      g.fillStyle = '#b01818'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#0a0a0c'; g.fillRect(16, 60, 160, 380);
      const r = U.rng(5);
      for (let y = 0; y < 6; y++) for (let x = 0; x < 4; x++) { g.fillStyle = `hsl(${r() * 360 | 0},70%,50%)`; g.fillRect(24 + x * 38, 70 + y * 60, 30, 44); }
      g.fillStyle = '#fff'; g.font = `bold 34px ${T.FONTS.FONT_TYPE}`; g.fillText('COLA', 40, 45);
      g.fillStyle = '#222'; g.fillRect(190, 120, 50, 80); g.fillStyle = '#f33'; g.fillRect(200, 130, 30, 10);
    }),
    pegboard: () => T.canvas('m2:peg', 256, 256, (g, w, h) => {
      g.fillStyle = '#9a7a52'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#3a2a18'; for (let y = 8; y < h; y += 16) for (let x = 8; x < w; x += 16) { g.beginPath(); g.arc(x, y, 2.2, 0, 6.28); g.fill(); }
    }, { repeat: true }),
    kernel: () => T.canvas('m2:kernel', 512, 256, (g, w, h) => {
      g.fillStyle = '#0b3a1e'; g.fillRect(0, 0, w, h);
      const r = U.rng(256);
      g.strokeStyle = '#c8a040'; g.lineWidth = 2;
      for (let k = 0; k < 80; k++) { g.beginPath(); let x = r() * w, y = r() * h; g.moveTo(x, y); for (let q = 0; q < 4; q++) { if (r() < 0.5) x += r.range(-60, 60); else y += r.range(-40, 40); g.lineTo(x, y); } g.stroke(); }
      for (let k = 0; k < 24; k++) { g.fillStyle = '#111'; g.fillRect(r() * w, r() * h, r.range(20, 60), r.range(10, 22)); }
      g.fillStyle = '#e8e0c0'; g.font = `bold 20px ${T.FONTS.FONT_TYPE}`; g.fillText('KERNEL REV C  —  W+E 1987', 20, h - 18);
    }),
    storeSign: () => T.canvas('m2:store', 256, 64, (g, w, h) => { g.fillStyle = '#222'; g.fillRect(0, 0, w, h); }),
    boothCurtain: () => T.canvas('m2:curt', 128, 256, (g, w, h) => {
      for (let x = 0; x < w; x++) { const v = 0.6 + 0.4 * Math.sin(x * 0.3); g.fillStyle = `rgb(${150 * v | 0},${20 * v | 0},${30 * v | 0})`; g.fillRect(x, 0, 1, h); }
    }, { repeat: true }),
    tvStatic: () => T.canvas('m2:static', 128, 96, (g, w, h) => {
      const r = U.rng(9);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const v = r() * 200 | 0; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(x, y, 1, 1); }
    }),
  });

  // ------------------------------------------------------------ materials (key -> spec)
  M.MATS = {
    nightGlass: { tex: 'nightWindow', rough: 0.05, emissive: 0xffffff, ei: 0.55, refl: 0.4 },
    chalk: { tex: 'chalk', rough: 0.9 }, alu: { color: 0xb8bcc2, rough: 0.35, metal: 0.9 },
    lockerPaint: { color: 0x3d5a78, rough: 0.45, metal: 0.4, refl: 0.1 }, lockerDark: { color: 0x1d2a38, rough: 0.5, metal: 0.4 },
    bleacherWood: { color: 0xc8965a, rough: 0.5, refl: 0.1 }, orangeRim: { color: 0xd8501a, rough: 0.4, metal: 0.5 },
    backboard: { color: 0xe8ecef, rough: 0.2, refl: 0.2 }, net: { color: 0xe0e0e0, rough: 0.9, transparent: true, opacity: 0.6, double: true },
    books: { tex: 'books', rough: 0.8 }, deskTop: { color: 0xc8a878, rough: 0.4, refl: 0.1 }, schoolSteel: { color: 0x44484e, rough: 0.5, metal: 0.6 },
    mattress: { color: 0xd8d8d0, rough: 0.9 }, sheet: { color: 0xeeeee8, rough: 0.95 }, pillow: { color: 0xf4f4ee, rough: 0.95 }, bedFrame: { color: 0xc8ccd0, rough: 0.35, metal: 0.8 },
    curtainFabric: { color: 0x8aa8b8, rough: 0.95, double: true }, ivBag: { color: 0xdfe8e8, rough: 0.1, transparent: true, opacity: 0.5 },
    spread: { tex: 'spread', rough: 0.95 }, headboard: { color: 0x5a3a24, rough: 0.5, refl: 0.08 }, couchFabric: { color: 0x6a5a3a, rough: 0.95 },
    tvScreen: { color: 0x0a0c0c, rough: 0.08, refl: 0.4 }, tvStatic: { tex: 'tvStatic', emissive: 0xffffff, ei: 0.6, rough: 0.2 },
    washerWhite: { color: 0xe8e8e2, rough: 0.3, refl: 0.2 }, glassDoor: { color: 0x202428, rough: 0.05, refl: 0.5 },
    vendingFront: { tex: 'vendingFront', emissive: 0xffffff, ei: 0.35, rough: 0.3 }, iceWhite: { color: 0xd8dcd8, rough: 0.35, metal: 0.3 },
    records: { tex: 'records', rough: 0.6 }, comics: { tex: 'comics', rough: 0.7 }, toys: { tex: 'toys', rough: 0.5 },
    clothes: { color: 0x6a3a5a, rough: 0.95 }, clothes2: { color: 0x2a4a6a, rough: 0.95 }, mannequin: { color: 0xe8e4dc, rough: 0.3, refl: 0.12 },
    boothBody: { color: 0x1a4a8a, rough: 0.35, metal: 0.3, refl: 0.2 }, boothCurtain: { tex: 'boothCurtain', rough: 0.95, double: true },
    mailboxBlack: { color: 0x151515, rough: 0.4, metal: 0.6 }, pegboard: { tex: 'pegboard', rough: 0.8 }, tools: { color: 0x707378, rough: 0.35, metal: 0.9 },
    toolRed: { color: 0xa01818, rough: 0.4 }, kernel: { tex: 'kernel', rough: 0.4, refl: 0.1 }, chompyFur: { color: 0xf0c020, rough: 1 }, chompyDark: { color: 0x151010, rough: 0.9 },
    fountainStone: { color: 0xb0aaa0, rough: 0.6, refl: 0.1 }, xmasGreen: { tex: 'pine', color: 0xffffff, rough: 0.95, rep: 5 }, ornRed: { color: 0xa01010, rough: 0.12, metal: 0.7, refl: 0.3 }, ornGold: { color: 0xd0a030, rough: 0.15, metal: 0.9, refl: 0.35 }, ornBlue: { color: 0x1a3aa0, rough: 0.12, metal: 0.7, refl: 0.3 }, xmasBulb: { glow: 2.6, color: 0xffd890 }, xmasStar: { glow: 3.2, color: 0xffe070 }, giftRed: { color: 0x9a1a1a, rough: 0.5 }, giftGreen: { color: 0x1a6a2a, rough: 0.5 }, giftRibbon: { color: 0xe8d070, rough: 0.35, metal: 0.4 },
    planterWood: { color: 0x6a4a30, rough: 0.7 }, plant: { color: 0x2a5a2a, rough: 0.8, double: true }, pewWood: { color: 0x5a3a24, rough: 0.45, refl: 0.1 },
    pipeRust: { color: 0x6a4a38, rough: 0.7, metal: 0.6 }, pipeGrey: { color: 0x5a6068, rough: 0.5, metal: 0.8 }, boilerRed: { color: 0x7a2418, rough: 0.6, metal: 0.4 },
    gauge: { color: 0xe8e4d8, rough: 0.3 }, keyTag: { color: 0xd8c070, rough: 0.5 }, keyBoardWood: { color: 0x4a3020, rough: 0.6 },
  };

  // ------------------------------------------------------------ SCHOOL
  D.chalkboard = [['rbox', 'alu', 3.0, 1.25, 0.04, 0.01, 0, 0, 0], ['box', 'chalk', 2.9, 1.15, 0.01, 0, 0, 0.022], ['rbox', 'alu', 2.9, 0.03, 0.08, 0.008, 0, -0.62, 0.05], ['box', 'paper', 0.08, 0.02, 0.03, -0.9, -0.6, 0.06], ['rbox', 'blackFabric', 0.14, 0.04, 0.05, 0.01, 0.8, -0.59, 0.06]];
  // A tall window with a rainy night outside (rooms with no real exterior behind them)
  D.nightWindow = [...M.frame('paintMetal', 1.0, 1.4, 0.07, 0.08, 0, 0, 0.02), ['box', 'paintMetal', 0.04, 1.3, 0.05, 0, 0, 0.02], ['box', 'paintMetal', 0.9, 0.04, 0.05, 0, 0.1, 0.02],
    ['box', 'nightGlass', 0.9, 1.3, 0.005, 0, 0, 0.0], ['rbox', 'paintMetal', 1.14, 0.05, 0.16, 0.01, 0, -0.73, 0.07]];
  // School wall clock, stopped at 3:05
  D.wallClock = [['cyl', 'blackPlastic', 0.18, 0.18, 0.05, 32, 0, 0, 0, H, 0, 0], ['cyl', 'paper', 0.16, 0.16, 0.054, 32, 0, 0, 0.001, H, 0, 0],
    ...Array.from({ length: 12 }, (_, k) => ['box', 'blackPlastic', 0.008, k % 3 ? 0.018 : 0.03, 0.002, Math.sin(k / 12 * Math.PI * 2) * 0.135, Math.cos(k / 12 * Math.PI * 2) * 0.135, 0.029, 0, 0, -k / 12 * Math.PI * 2]),
    ['box', 'blackPlastic', 0.012, 0.12, 0.003, 0.03, 0.052, 0.031, 0, 0, -0.52], ['box', 'blackPlastic', 0.075, 0.016, 0.003, 0.036, -0.002, 0.033, 0, 0, -0.04], ['box', 'redPlastic', 0.004, 0.13, 0.002, -0.03, -0.05, 0.035, 0, 0, 2.6], ['cyl', 'blackPlastic', 0.012, 0.012, 0.012, 12, 0, 0, 0.034, H, 0, 0]];
  D.teacherDesk = [['rbox', 'deskTop', 1.5, 0.04, 0.75, 0.01, 0, 0.76, 0], ['rbox', 'schoolSteel', 0.45, 0.72, 0.7, 0.01, 0.5, 0.37, 0], ['rbox', 'schoolSteel', 1.45, 0.45, 0.02, 0.005, 0, 0.5, -0.35], ...[-0.68].map(x => ['box', 'schoolSteel', 0.04, 0.74, 0.7, x, 0.37, 0]), ['box', 'paper', 0.3, 0.05, 0.22, -0.3, 0.8, 0.1, 0, 0.2], ['lathe', 'redPlastic', [[0.05, 0], [0.07, 0.06], [0.05, 0.08], [0.001, 0.08]], 16, 0.4, 0.78, -0.2]];
  D.schoolDesk = [
    ['rbox', 'deskTop', 0.6, 0.03, 0.45, 0.008, 0, 0.72, 0.05], ['box', 'schoolSteel', 0.56, 0.12, 0.38, 0, 0.64, 0.05],
    ...[[-0.26, -0.15], [0.26, -0.15], [-0.26, 0.24], [0.26, 0.24]].map(([x, z]) => ['cyl', 'schoolSteel', 0.012, 0.012, 0.66, 6, x, 0.33, z]),
    ['rbox', 'bluePlastic', 0.4, 0.03, 0.38, 0.01, 0, 0.44, -0.42], ['rbox', 'bluePlastic', 0.4, 0.3, 0.03, 0.01, 0, 0.66, -0.62, -0.1],
    ...[[-0.18, -0.28], [0.18, -0.28], [-0.18, -0.58], [0.18, -0.58]].map(([x, z]) => ['cyl', 'schoolSteel', 0.01, 0.01, 0.44, 6, x, 0.22, z]),
  ];
  D.lockerBank = (() => {
    const s = [];
    for (let k = 0; k < 5; k++) {
      const x = -0.8 + k * 0.4;
      s.push(['rbox', 'lockerPaint', 0.38, 1.8, 0.02, 0.004, x, 0.95, 0.22]);
      for (let v = 0; v < 5; v++) s.push(['box', 'lockerDark', 0.2, 0.012, 0.004, x, 1.55 + v * 0.03, 0.232]);
      s.push(['rbox', 'chrome', 0.03, 0.1, 0.03, 0.005, x + 0.13, 1.0, 0.24], ['box', 'labelCard', 0.06, 0.03, 0.002, x, 1.72, 0.232]);
    }
    s.push(['box', 'lockerDark', 2.02, 1.9, 0.44, 0, 0.95, 0], ['box', 'lockerDark', 2.02, 0.1, 0.46, 0, 0.05, 0]);
    return s;
  })();
  D.lockerHide = D.lockerBank;
  D.bleachers = (() => { const s = []; for (let k = 0; k < 4; k++) { s.push(['rbox', 'bleacherWood', 6, 0.05, 0.4, 0.01, 0, 0.4 + k * 0.4, 0.9 - k * 0.55]); s.push(['box', 'schoolSteel', 6, 0.4 + k * 0.4, 0.04, 0, (0.4 + k * 0.4) / 2, 0.72 - k * 0.55]); } s.push(['box', 'schoolSteel', 0.05, 1.8, 2.4, -3, 0.9, -0.2], ['box', 'schoolSteel', 0.05, 1.8, 2.4, 3, 0.9, -0.2]); return s; })();
  D.hoop = [['rbox', 'backboard', 1.8, 1.05, 0.04, 0.01, 0, 3.0, 0.9], ['box', 'orangeRim', 0.6, 0.45, 0.005, 0, 2.85, 0.925], ['torus', 'orangeRim', 0.23, 0.01, 20, 0, 0, 2.62, 1.2, H, 0, 0], ['lathe', 'net', [[0.23, 0], [0.16, -0.35], [0.14, -0.4]], 12, 0, 2.62, 1.2], ['cyl', 'schoolSteel', 0.04, 0.04, 0.9, 8, 0, 3.0, 0.45, H]];
  D.bookshelf = (() => { const s = [['rbox', 'darkWood', 2.2, 2.0, 0.5, 0.01, 0, 1.0, 0]]; for (let k = 0; k < 5; k++) s.push(['box', 'books', 2.1, 0.32, 0.46, 0, 0.2 + k * 0.38, 0.03]); return s; })();
  D.readingTable = [['rbox', 'deskTop', 1.8, 0.05, 0.9, 0.012, 0, 0.74, 0], ...[[-0.8, -0.35], [0.8, -0.35], [-0.8, 0.35], [0.8, 0.35]].map(([x, z]) => ['box', 'darkWood', 0.06, 0.72, 0.06, x, 0.36, z]), ['box', 'paper', 0.3, 0.04, 0.22, 0.3, 0.78, 0.1, 0, 0.3]];
  D.mopBucket = [['lathe', 'yellowPlastic', [[0.2, 0], [0.24, 0.35], [0.22, 0.36], [0.19, 0.01], [0.001, 0.01]], 16], ['cyl', 'darkWood', 0.015, 0.015, 1.3, 6, 0.08, 0.7, 0, 0.2], ['lathe', 'paper', [[0.001, 0], [0.12, 0.05], [0.06, 0.2], [0.001, 0.2]], 10, 0.03, 0.12, 0]];
  D.cafTable = [['rbox', 'deskTop', 2.4, 0.04, 0.8, 0.01, 0, 0.74, 0], ['box', 'schoolSteel', 2.2, 0.06, 0.06, 0, 0.36, 0], ...[-0.9, 0.9].map(x => ['box', 'schoolSteel', 0.06, 0.72, 0.6, x, 0.36, 0]), ['rbox', 'bluePlastic', 2.4, 0.04, 0.3, 0.01, 0, 0.45, 0.6], ['rbox', 'bluePlastic', 2.4, 0.04, 0.3, 0.01, 0, 0.45, -0.6], ['lathe', 'mug', [[0.03, 0], [0.035, 0.1], [0.001, 0.1]], 10, 0.4, 0.76, 0.1]];
  // ------------------------------------------------------------ HOSPITAL
  D.hospitalBed = [
    ['rbox', 'bedFrame', 0.95, 0.06, 2.0, 0.02, 0, 0.45, 0], ['rbox', 'mattress', 0.9, 0.16, 1.95, 0.05, 0, 0.56, 0], ['rbox', 'sheet', 0.94, 0.05, 1.3, 0.03, 0, 0.64, 0.3],
    ['rbox', 'pillow', 0.6, 0.1, 0.35, 0.05, 0, 0.66, -0.75], ['rbox', 'bedFrame', 0.95, 0.5, 0.04, 0.02, 0, 0.8, -1.0], ['rbox', 'bedFrame', 0.95, 0.35, 0.04, 0.02, 0, 0.7, 1.0],
    ...[-1, 1].map(sx => ['rbox', 'bedFrame', 0.03, 0.18, 1.1, 0.01, sx * 0.49, 0.72, -0.2]),
    ...[[-0.42, -0.9], [0.42, -0.9], [-0.42, 0.9], [0.42, 0.9]].flatMap(([x, z]) => [['cyl', 'bedFrame', 0.02, 0.02, 0.4, 8, x, 0.24, z], ['sph', 'blackPlastic', 0.04, x, 0.04, z, 8, 6]]),
  ];
  D.ivStand = [['cyl', 'chrome', 0.012, 0.012, 1.9, 8, 0, 0.95, 0], ['rbox', 'ivBag', 0.14, 0.22, 0.04, 0.02, 0.08, 1.7, 0], ['cyl', 'chrome', 0.006, 0.006, 0.2, 6, 0.04, 1.88, 0, 0, 0, H], ['tube', 'ivBag', [[0.08, 1.58, 0], [0.1, 1.2, 0.05], [0.2, 0.9, 0.3]], 0.003, 4], ...[0, 1, 2, 3, 4].map(k => ['box', 'chrome', 0.3, 0.02, 0.02, Math.cos(k * 1.256) * 0.15, 0.03, Math.sin(k * 1.256) * 0.15, 0, -k * 1.256, 0])];
  D.nightstand = [['rbox', 'drawerWood', 0.45, 0.6, 0.4, 0.01, 0, 0.3, 0], ['rbox', 'drawer', 0.4, 0.2, 0.02, 0.004, 0, 0.45, 0.2], ['rbox', 'brass', 0.08, 0.015, 0.02, 0.005, 0, 0.45, 0.215], ['lathe', 'mug', [[0.05, 0], [0.08, 0.2], [0.02, 0.22], [0.001, 0.22]], 12, -0.1, 0.6, -0.05], ['lathe', 'greenGlass', [[0.001, 0.2], [0.12, 0.05], [0.13, 0], [0.001, 0.02]], 16, -0.1, 0.8, -0.05]];
  D.curtain = (() => { const s = [['cyl', 'chrome', 0.012, 0.012, 2.4, 6, 0, 2.8, 0, 0, 0, H]]; for (let k = 0; k < 10; k++) s.push(['box', 'curtainFabric', 0.26, 2.2, 0.01, -1.1 + k * 0.24, 1.7, Math.sin(k * 1.4) * 0.05, 0, Math.sin(k * 2.1) * 0.25, 0]); return s; })();
  D.wheelchair = [['torus', 'blackPlastic', 0.3, 0.02, 24, 0, -0.28, 0.32, 0, 0, H, 0], ['torus', 'blackPlastic', 0.3, 0.02, 24, 0, 0.28, 0.32, 0, 0, H, 0], ['torus', 'chrome', 0.27, 0.008, 24, 0, -0.3, 0.32, 0, 0, H, 0], ['torus', 'chrome', 0.27, 0.008, 24, 0, 0.3, 0.32, 0, 0, H, 0], ['rbox', 'blackFabric', 0.46, 0.05, 0.42, 0.02, 0, 0.5, 0.05], ['rbox', 'blackFabric', 0.46, 0.45, 0.04, 0.02, 0, 0.78, -0.17, -0.1], ...[-0.23, 0.23].flatMap(x => [['cyl', 'chrome', 0.012, 0.012, 0.95, 6, x, 0.6, -0.2, -0.1], ['cyl', 'chrome', 0.012, 0.012, 0.5, 6, x, 0.5, 0.05, H], ['sph', 'blackPlastic', 0.05, x, 0.05, 0.35, 8, 6]])];
  D.nurseCounter = [['rbox', 'laminate', 2.8, 1.1, 0.5, 0.02, 0, 0.55, 0], ['rbox', 'laminate', 2.9, 0.04, 0.7, 0.01, 0, 1.1, 0.05], ['rbox', 'beigePlastic', 0.36, 0.3, 0.35, 0.02, -0.6, 1.28, -0.05], ['box', 'bezel', 0.3, 0.22, 0.005, -0.6, 1.3, 0.13], ['box', 'paper', 0.25, 0.06, 0.3, 0.5, 1.15, 0, 0, 0.2], ['rbox', 'beigePlastic', 0.2, 0.06, 0.18, 0.01, 0.9, 1.15, 0]];
  D.altar = [['rbox', 'pewWood', 1.6, 0.9, 0.6, 0.02, 0, 0.45, 0], ['rbox', 'lace', 1.65, 0.02, 0.62, 0.005, 0, 0.91, 0], ['cyl', 'brass', 0.02, 0.02, 0.4, 8, 0, 1.12, -0.1], ['box', 'brass', 0.25, 0.02, 0.02, 0, 1.22, -0.1], ...[-0.5, 0.5].map(x => ['cyl', 'candle', 0.03, 0.03, 0.25, 10, x, 1.04, 0])];
  D.pew = [['rbox', 'pewWood', 1.8, 0.06, 0.45, 0.01, 0, 0.45, 0], ['rbox', 'pewWood', 1.8, 0.5, 0.04, 0.01, 0, 0.72, -0.22, -0.1], ...[-0.85, 0.85].map(x => ['ext', 'pewWood', [[-0.25, 0], [0.25, 0], [0.25, 0.9], [-0.2, 0.95]], 0.04, 0.005, x, 0, 0, 0, H, 0])];
  // ------------------------------------------------------------ MOTEL
  D.motelBed = [['rbox', 'headboard', 1.6, 1.0, 0.06, 0.02, 0, 0.5, -1.05], ['box', 'bedFrame', 1.5, 0.25, 2.0, 0, 0.18, 0], ['rbox', 'mattress', 1.5, 0.25, 1.95, 0.06, 0, 0.42, 0], ['rbox', 'spread', 1.58, 0.1, 1.5, 0.05, 0, 0.55, 0.25], ['rbox', 'pillow', 0.6, 0.12, 0.35, 0.05, -0.35, 0.6, -0.75], ['rbox', 'pillow', 0.6, 0.12, 0.35, 0.05, 0.35, 0.6, -0.75]];
  D.dresserTv = [['rbox', 'headboard', 1.2, 0.75, 0.5, 0.01, 0, 0.38, 0], ...[0.2, 0.5].map(y => ['rbox', 'drawer', 1.1, 0.25, 0.02, 0.004, 0, y, 0.25]), ['rbox', 'beigePlastic', 0.55, 0.45, 0.45, 0.04, 0, 0.98, 0], ['box', 'tvScreen', 0.42, 0.32, 0.01, -0.03, 0.98, 0.225], ['rcyl', 'blackPlastic', 0.02, 0.02, 0.005, 10, 0.21, 1.05, 0.23, H], ['cyl', 'chrome', 0.004, 0.004, 0.4, 6, 0.1, 1.35, -0.1, 0, 0, 0.5], ['cyl', 'chrome', 0.004, 0.004, 0.4, 6, -0.1, 1.35, -0.1, 0, 0, -0.5]];
  D.frontDesk = [['rbox', 'headboard', 3.0, 1.1, 0.6, 0.02, 0, 0.55, 0], ['rbox', 'laminate', 3.1, 0.05, 0.7, 0.01, 0, 1.12, 0], ['rbox', 'register', 0.4, 0.14, 0.35, 0.02, 0.8, 1.2, 0], ['box', 'paper', 0.4, 0.04, 0.3, -0.6, 1.16, 0.1, 0, 0.1], ['sph', 'chrome', 0.04, 0.1, 1.17, 0.2, 10, 6, [1, 0.5, 1]]];
  D.keyBoard = (() => { const s = [['rbox', 'keyBoardWood', 1.2, 0.8, 0.04, 0.01, 0, 0, 0]]; for (let k = 0; k < 20; k++) { const x = -0.5 + (k % 5) * 0.25, y = 0.28 - Math.floor(k / 5) * 0.18; s.push(['cyl', 'brass', 0.006, 0.006, 0.05, 6, x, y, 0.04, H]); if (k !== 11) s.push(['rbox', 'keyTag', 0.04, 0.07, 0.008, 0.003, x, y - 0.06, 0.06]); } return s; })();
  D.couch = [['rbox', 'couchFabric', 2.0, 0.42, 0.9, 0.08, 0, 0.21, 0], ['rbox', 'couchFabric', 2.0, 0.5, 0.25, 0.08, 0, 0.65, -0.33], ['rbox', 'couchFabric', 0.22, 0.3, 0.9, 0.08, -0.95, 0.55, 0], ['rbox', 'couchFabric', 0.22, 0.3, 0.9, 0.08, 0.95, 0.55, 0], ['rbox', 'couchFabric', 0.9, 0.12, 0.6, 0.05, -0.45, 0.48, 0.05], ['rbox', 'couchFabric', 0.9, 0.12, 0.6, 0.05, 0.45, 0.48, 0.05]];
  D.washer = [['rbox', 'washerWhite', 0.7, 0.9, 0.65, 0.03, 0, 0.45, 0], ['rcyl', 'chrome', 0.22, 0.03, 0.01, 24, 0, 0.45, 0.33, H], ['disc', 'glassDoor', 0.19, 0, 0.45, 0.346], ['rbox', 'beigePlastic', 0.66, 0.12, 0.05, 0.01, 0, 0.84, -0.3], ['rcyl', 'chrome', 0.025, 0.02, 0.005, 12, 0.2, 0.84, -0.27, H]];
  D.dryer = D.washer;
  D.iceMachine = [['rbox', 'iceWhite', 0.8, 1.6, 0.7, 0.03, 0, 0.8, 0], ['rbox', 'chrome', 0.5, 0.35, 0.02, 0.01, 0, 1.2, 0.36], ['box', 'labelCard', 0.4, 0.1, 0.002, 0, 1.5, 0.351], ['rbox', 'blackPlastic', 0.3, 0.15, 0.1, 0.02, 0, 0.6, 0.38]];
  D.vending = [['rbox', 'redPlastic', 0.9, 1.85, 0.8, 0.03, 0, 0.925, 0], ['box', 'vendingFront', 0.86, 1.8, 0.005, 0, 0.93, 0.402]];
  // ------------------------------------------------------------ MALL
  D.storeCounter = [['rbox', 'laminate', 1.8, 1.0, 0.6, 0.02, 0, 0.5, 0], ['rbox', 'woodVarnish', 1.9, 0.05, 0.7, 0.01, 0, 1.02, 0], ['rbox', 'register', 0.4, 0.14, 0.35, 0.02, 0.5, 1.1, 0]];
  D.recordBins = [['rbox', 'darkWood', 1.0, 0.8, 0.7, 0.02, 0, 0.4, 0], ...[0, 1].flatMap(k => [['box', 'records', 0.44, 0.3, 0.55, -0.24 + k * 0.48, 0.92, 0, 0.35, 0, 0]])];
  D.comicRack = [['rbox', 'darkWood', 2.0, 1.8, 0.3, 0.01, 0, 0.9, 0], ['box', 'comics', 1.9, 1.2, 0.01, 0, 1.1, 0.16, -0.08]];
  D.toyShelf = [['rbox', 'paintMetal', 1.8, 1.6, 0.5, 0.01, 0, 0.8, 0], ...[0.3, 0.8, 1.3].map(y => ['box', 'toys', 1.7, 0.36, 0.4, 0, y, 0.03])];
  D.clothesRack = [['cyl', 'chrome', 0.012, 0.012, 1.2, 8, 0, 1.4, 0, 0, 0, H], ['cyl', 'chrome', 0.012, 0.012, 1.4, 8, -0.58, 0.7, 0], ['cyl', 'chrome', 0.012, 0.012, 1.4, 8, 0.58, 0.7, 0], ...[-0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45].map((x, k) => ['rbox', k % 2 ? 'clothes' : 'clothes2', 0.1, 0.7, 0.45, 0.04, x, 1.02, 0])];
  D.mannequinStatic = [['cap', 'mannequin', 0.15, 0.45, 0, 1.25, 0], ['sph', 'mannequin', 0.11, 0, 1.72, 0, 16, 12, [0.85, 1.15, 0.95]], ['cap', 'mannequin', 0.05, 0.6, -0.22, 1.15, 0, 0, 0, 0.12], ['cap', 'mannequin', 0.05, 0.6, 0.22, 1.15, 0, 0, 0, -0.12], ['cap', 'mannequin', 0.06, 0.75, -0.09, 0.45, 0], ['cap', 'mannequin', 0.06, 0.75, 0.09, 0.45, 0], ['cyl', 'chrome', 0.15, 0.15, 0.02, 16, 0, 0.01, 0]];
  D.photoBooth = [['rbox', 'boothBody', 1.2, 2.1, 1.3, 0.04, 0, 1.05, 0], ['box', 'boothCurtain', 0.7, 1.6, 0.02, -0.15, 1.05, 0.66], ['rbox', 'chrome', 0.3, 0.5, 0.04, 0.01, 0.4, 1.2, 0.66], ['box', 'socket', 0.12, 0.02, 0.01, 0.4, 0.95, 0.685], ['box', 'labelCard', 0.9, 0.2, 0.01, 0, 2.0, 0.66]];
  D.fountain = [['lathe', 'fountainStone', [[0.001, 0], [2.0, 0], [2.0, 0.45], [1.85, 0.5], [1.8, 0.1], [0.001, 0.1]], 40], ['lathe', 'water', [[1.8, 0.35], [0.001, 0.35]], 40], ['lathe', 'fountainStone', [[0.25, 0.35], [0.2, 1.3], [0.7, 1.4], [0.7, 1.5], [0.15, 1.52], [0.1, 2.0], [0.001, 2.0]], 24]];
  // Mall Christmas tree: stacked, jittered branch tiers, glass baubles, a spiral of warm bulbs, a star, presents
  D.xmasTree = (() => {
    const s = [['cyl', 'darkWood', 0.12, 0.16, 0.8, 10, 0, 0.4, 0]];
    for (let k = 0; k < 7; k++) {
      const y = 0.75 + k * 0.52, rr = 1.55 - k * 0.2;
      for (let j = 0; j < 3; j++) s.push(['cone', 'xmasGreen', rr * (1 - j * 0.07), 0.95, 14, Math.cos(k * 2.1 + j * 2.09) * 0.05, y + j * 0.06, Math.sin(k * 2.1 + j * 2.09) * 0.05, 0.05 * Math.sin(k + j), (k * 0.7 + j) % 6.28, 0.05 * Math.cos(k * 1.3 + j)]);
    }
    const mats = ['ornRed', 'ornGold', 'ornBlue'];
    for (let k = 0; k < 44; k++) { const y = 0.7 + (k / 44) * 3.4, rr = Math.max(0.12, (1.5 - (y - 0.7) * 0.4)) * 0.92, a = k * 2.399; s.push(['sph', mats[k % 3], k % 5 ? 0.055 : 0.08, Math.cos(a) * rr, y - 0.18, Math.sin(a) * rr, 12, 10]); }
    for (let k = 0; k < 90; k++) { const t = k / 90, y = 0.65 + t * 3.5, rr = Math.max(0.1, (1.52 - (y - 0.65) * 0.4)) * 0.95, a = t * 6.28 * 6; s.push(['sph', 'xmasBulb', 0.022, Math.cos(a) * rr, y - 0.2, Math.sin(a) * rr, 6, 4]); }
    s.push(['cone', 'xmasStar', 0.16, 0.3, 5, 0, 4.42, 0], ['cone', 'xmasStar', 0.16, 0.3, 5, 0, 4.42, 0, Math.PI, 0.6, 0], ['sph', 'xmasStar', 0.07, 0, 4.42, 0, 10, 8]);
    [[0.9, 0.5, 'giftRed', 0.5, 0.35, 0.45], [-0.8, 0.8, 'giftGreen', 0.45, 0.45, 0.4], [0.3, -1.0, 'giftRed', 0.6, 0.3, 0.5], [-0.6, -0.7, 'giftGreen', 0.35, 0.3, 0.35], [1.05, -0.35, 'giftGreen', 0.3, 0.25, 0.3]].forEach(([x, z, m, w, h, d]) => {
      s.push(['rbox', m, w, h, d, 0.01, x, h / 2, z, 0, (x * 3) % 1.5, 0], ['box', 'giftRibbon', w + 0.01, h + 0.01, 0.05, x, h / 2, z, 0, (x * 3) % 1.5, 0], ['box', 'giftRibbon', 0.05, h + 0.012, d + 0.01, x, h / 2, z, 0, (x * 3) % 1.5, 0]);
    });
    return s;
  })();
  D.mallBench = [['rbox', 'woodVarnish', 1.8, 0.06, 0.45, 0.01, 0, 0.45, 0], ['rbox', 'woodVarnish', 1.8, 0.4, 0.05, 0.01, 0, 0.72, -0.2, -0.1], ...[-0.75, 0.75].map(x => ['rbox', 'darkMetal', 0.08, 0.45, 0.45, 0.02, x, 0.22, 0])];
  D.planter = [['rbox', 'planterWood', 1.0, 0.6, 1.0, 0.02, 0, 0.3, 0], ...[0, 1, 2, 3, 4, 5].map(k => ['cone', 'plant', 0.2, 1.1, 5, Math.cos(k) * 0.2, 1.0, Math.sin(k) * 0.2, 0.2 * Math.cos(k * 2), 0, 0.2 * Math.sin(k * 2)])];
  D.kiosk = [['rbox', 'chompyFur', 2.0, 1.0, 1.2, 0.05, 0, 0.5, 0], ['rbox', 'woodVarnish', 2.1, 0.05, 1.3, 0.01, 0, 1.02, 0], ...[-0.9, 0.9].map(x => ['cyl', 'chrome', 0.03, 0.03, 1.4, 8, x, 1.75, 0]), ['rbox', 'redPlastic', 2.2, 0.3, 1.4, 0.03, 0, 2.5, 0]];
  // ------------------------------------------------------------ STREET
  // Unit gable roof (scaled to each house)
  D.roof = [['ext', 'roofShingle', [[-0.5, 0], [0.5, 0], [0, 0.42]], 1.0, 0, 0, 0, 0, 0, H, 0, 'roofShingle']];
  D.mailboxPost = [['cyl', 'darkWood', 0.04, 0.04, 1.1, 8, 0, 0.55, 0], ['rbox', 'mailboxBlack', 0.2, 0.2, 0.45, 0.06, 0, 1.2, 0], ['box', 'redPlastic', 0.02, 0.18, 0.04, 0.11, 1.28, -0.1]];
  // ------------------------------------------------------------ WORKSHOP
  D.workbench = [['rbox', 'woodVarnish', 2.2, 0.08, 0.8, 0.01, 0, 0.88, 0], ...[[-1.0, -0.3], [1.0, -0.3], [-1.0, 0.3], [1.0, 0.3]].map(([x, z]) => ['box', 'darkWood', 0.08, 0.84, 0.08, x, 0.42, z]), ['box', 'darkWood', 2.1, 0.04, 0.7, 0, 0.2, 0], ['rbox', 'toolRed', 0.3, 0.2, 0.25, 0.02, -0.7, 1.02, 0.1], ['rbox', 'tools', 0.12, 0.1, 0.3, 0.01, 0.9, 0.97, 0.25], ['cyl', 'tools', 0.02, 0.02, 0.25, 6, 0.3, 0.93, 0.1, 0, 0.5, H], ['rbox', 'beigePlastic', 0.4, 0.3, 0.35, 0.02, 0.2, 1.07, -0.15], ['box', 'tvStatic', 0.3, 0.22, 0.005, 0.2, 1.07, 0.03]];
  D.pegboard = [['box', 'pegboard', 2.0, 1.2, 0.02, 0, 0, 0], ...[[-0.7, 0.2], [-0.4, 0.3], [0, 0.1], [0.4, 0.25], [0.7, -0.2], [-0.2, -0.3]].map(([x, y], k) => ['box', k % 2 ? 'tools' : 'toolRed', 0.04, 0.3, 0.02, x, y, 0.03, 0, 0, (k - 3) * 0.1])];
  D.tvStack = (() => { const s = []; for (let k = 0; k < 6; k++) { const x = -0.5 + (k % 3) * 0.5, y = Math.floor(k / 3) * 0.48; s.push(['rbox', k % 2 ? 'beigePlastic' : 'blackPlastic', 0.48, 0.44, 0.45, 0.03, x, 0.22 + y, 0], ['box', k === 1 || k === 5 ? 'tvStatic' : 'tvScreen', 0.36, 0.28, 0.005, x - 0.03, 0.22 + y, 0.227]); } return s; })();
  D.oscilloscope = [['rbox', 'beigePlastic', 0.32, 0.18, 0.4, 0.02, 0, 0.99, 0], ['box', 'lcd', 0.12, 0.09, 0.005, -0.06, 1.0, 0.202], ...[0.06, 0.12].map(x => ['rcyl', 'blackPlastic', 0.012, 0.01, 0.003, 10, x, 1.0, 0.205, H])];
  D.kernel = [['rbox', 'darkMetal', 2.6, 1.8, 0.9, 0.03, 0, 0.9, 0], ['box', 'kernel', 2.4, 1.2, 0.005, 0, 1.0, 0.453], ...[-0.8, 0, 0.8].map(x => ['rcyl', 'chrome', 0.06, 0.04, 0.01, 20, x, 1.72, 0.47, H]), ['rbox', 'blackPlastic', 0.9, 0.5, 0.5, 0.03, 0, 2.05, 0], ['box', 'tvStatic', 0.7, 0.35, 0.005, 0, 2.05, 0.253], ...Array.from({ length: 6 }, (_, k) => ['tube', 'blackPlastic', [[-1.2 + k * 0.45, 0.3, 0.45], [-1.1 + k * 0.4, 0.05, 0.8], [-0.6 + k * 0.2, 0.01, 1.3]], 0.015, 6])];
  // Costume stand; the costume itself is Chompy, standing on it until it isn't
  D.chompyStand = [['cyl', 'darkMetal', 0.3, 0.35, 0.05, 16, 0, 0.025, 0], ['cyl', 'chrome', 0.02, 0.02, 1.9, 8, 0, 0.97, 0], ['cyl', 'chrome', 0.015, 0.015, 0.7, 8, 0, 1.9, 0, 0, 0, H]];
  // ------------------------------------------------------------ TUNNELS
  D.wallPipes = [['cyl', 'pipeRust', 0.09, 0.09, 3.0, 12, 0, 2.3, 0.05, 0, 0, H], ['cyl', 'pipeGrey', 0.05, 0.05, 3.0, 10, 0, 2.05, 0.08, 0, 0, H], ...[-1.2, 0, 1.2].map(x => ['box', 'darkMetal', 0.04, 0.35, 0.2, x, 2.2, 0.0]), ['rcyl', 'pipeRust', 0.12, 0.06, 0.01, 12, 0.6, 2.3, 0.05, 0, 0, H]];
  D.boiler = [['cyl', 'boilerRed', 0.9, 0.9, 2.6, 24, 0, 1.3, 0], ['lathe', 'boilerRed', [[0.9, 0], [0.7, 0.3], [0.2, 0.45], [0.001, 0.46]], 24, 0, 2.6, 0], ...[0.8, 1.6].map(y => ['torus', 'darkMetal', 0.91, 0.03, 24, 0, 0, y, 0, H, 0, 0]), ['rcyl', 'gauge', 0.1, 0.03, 0.01, 20, 0.5, 1.6, 0.76, H], ['cyl', 'pipeGrey', 0.1, 0.1, 1.5, 12, 0, 3.4, 0]];
})(typeof window !== 'undefined' ? window : globalThis);
