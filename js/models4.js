/* Models for Saint Brigid, a 1970s car and passenger ferry on Halvard Sound, the night she sank (1987):
   lifeboats on gravity davits and their winches, life rings, bollards, mushroom and cowl ventilators,
   the funnel, the foremast with its bronze bell, deck benches, the anchor windlass, life-raft canisters,
   lounge seat rows, two-tier cabin bunks, the bridge (helm, engine telegraph, radar, chart table), the
   radio room set, a marine diesel, steel stairs down and up. Specs as in props.js / models.js. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  Object.assign(M.MATS, {
    hullWhite: { color: 0xd8d6cc, rough: 0.45, metal: 0.2, refl: 0.1 }, hullRed: { color: 0x7a1c16, rough: 0.5, metal: 0.2 }, deckGreen: { color: 0x2e3a32, rough: 0.6, metal: 0.3 },
    orangeGRP: { color: 0xd8601a, rough: 0.4, refl: 0.12 }, ropeHemp: { color: 0x8a7650, rough: 1 }, wireRope: { color: 0x5a5c5e, rough: 0.4, metal: 0.9 },
    shipBronze: { color: 0x9a6a2a, rough: 0.28, metal: 1, refl: 0.3 }, verdigris: { color: 0x3a7a62, rough: 0.6, metal: 0.4 }, funnelBlack: { color: 0x121212, rough: 0.5, metal: 0.3 },
    funnelBand: { color: 0xc8a020, rough: 0.45, metal: 0.2 }, seatBlue: { color: 0x22325a, rough: 0.9 }, seatOrange: { color: 0x9a4a1a, rough: 0.9 }, lifejacket: { color: 0xe86a12, rough: 0.7 },
    consoleGrey: { color: 0x5a6266, rough: 0.5, metal: 0.4 }, radarGlass: { color: 0x0a1a10, rough: 0.05, emissive: 0x1a6a2a, ei: 0.4, refl: 0.4 }, dialFace: { color: 0xe8e4d4, rough: 0.4 },
    teak: { color: 0x6a4428, rough: 0.55, refl: 0.08 }, engineGreen: { color: 0x3a4a3e, rough: 0.55, metal: 0.5 }, enginePipe: { color: 0x8a7a5a, rough: 0.6, metal: 0.5 },
    blanketGrey: { color: 0x5a5a5e, rough: 1 }, linenWhite: { color: 0xd8d6cc, rough: 0.95 }, bunkFrame: { color: 0xb8b8b0, rough: 0.45, metal: 0.6 },
    whisky: { color: 0x6a3a10, rough: 0.05, transparent: true, opacity: 0.75, refl: 0.3 }, bottleGlass: { color: 0x2a3a2a, rough: 0.05, transparent: true, opacity: 0.55, refl: 0.4 },
  });

  // ------------------------------------------------------------ deck
  // Open lifeboat, 7.5 m, white hull with a red sheer line, thwarts, a folded canopy; hung under its
  // davit arms from two falls. Model origin: centre of the boat at deck level; the boat sits outboard (+z).
  D.lifeboat = (() => {
    const s = [], L = 7.2;
    // hull: lathe-like sections approximated with stretched spheres, cut by the gunwale
    s.push(['sph', 'hullWhite', 1, 0, 0, 0, 24, 12, [L / 2, 0.9, 1.25]]);
    s.push(['box', 'hullRed', L * 0.96, 0.06, 2.42, 0, 0.0, 0]);
    s.push(['rbox', 'teak', L * 0.86, 0.06, 2.1, 0.02, 0, -0.05, 0]);
    for (let k = -3; k <= 3; k++) s.push(['rbox', 'teak', 0.25, 0.05, 2.1, 0.01, k * 0.95, 0.12, 0]);
    s.push(['rbox', 'orangeGRP', L * 0.5, 0.18, 2.0, 0.08, 0.5, 0.22, 0]);
    s.push(['tube', 'ropeHemp', [[-3.4, 0.05, 1.2], [0, 0.1, 1.25], [3.4, 0.05, 1.2]], 0.02, 5]);
    s.push(['tube', 'ropeHemp', [[-3.4, 0.05, -1.2], [0, 0.1, -1.25], [3.4, 0.05, -1.2]], 0.02, 5]);
    s.push(['box', 'black', 0.9, 0.24, 0.002, 2.2, -0.3, 1.18], ['box', 'black', 0.9, 0.24, 0.002, 2.2, -0.3, -1.18, 0, PI, 0]);
    return s;
  })();
  // Gravity davit pair for one boat: two curved arms leaning out over the side, falls, blocks
  D.davits = (() => {
    const s = [];
    for (const x of [-2.9, 2.9]) {
      s.push(['tube', 'hullWhite', [[x, 0, -1.4], [x, 1.6, -1.2], [x, 3.1, -0.4], [x, 3.4, 0.6], [x, 3.2, 1.3]], 0.11, 8]);
      s.push(['box', 'hullWhite', 0.5, 0.25, 1.4, x, 0.12, -1.4]);
      s.push(['cyl', 'wireRope', 0.012, 0.012, 1.5, 4, x, 2.4, 1.3]);
      s.push(['rbox', 'black', 0.18, 0.28, 0.12, 0.03, x, 1.55, 1.3]);
    }
    s.push(['tube', 'wireRope', [[-2.9, 3.35, 0.9], [0, 3.6, 0.2], [2.9, 3.35, 0.9]], 0.01, 4]);
    return s;
  })();
  // Davit winch on deck: drum, brake lever with weight, crank boss, key slot under a brass cover
  D.davitWinch = [
    ['rbox', 'hullWhite', 0.7, 0.6, 0.5, 0.03, 0, 0.3, 0],
    ['cyl', 'wireRope', 0.2, 0.2, 0.55, 20, 0, 0.75, 0, 0, 0, H],
    ...[-0.3, 0.3].map(x => ['cyl', 'hullWhite', 0.26, 0.26, 0.04, 20, x, 0.75, 0, 0, 0, H]),
    ['cyl', 'castIron', 0.02, 0.02, 0.9, 8, 0.45, 0.95, 0.15, 0.6, 0, 0], ['sph', 'castIron', 0.07, 0.45, 1.3, 0.42, 10, 8],
    ['cyl', 'chrome', 0.05, 0.05, 0.08, 12, -0.4, 0.75, 0, 0, 0, H], ['box', 'shipBronze', 0.1, 0.12, 0.02, 0.0, 0.45, 0.26],
    ['box', 'labelCard', 0.3, 0.12, 0.004, 0, 0.45, 0.252],
  ];
  // Life ring on a rail bracket
  D.lifeRing = [['torus', 'orangeGRP', 0.3, 0.07, 24, 0, 0, 0.95, 0.04, 0, 0, 0], ...[0, 1, 2, 3].map(k => ['torus', 'hullWhite', 0.3, 0.072, 6, 0.3, 0, 0.95, 0.04, 0, 0, k * H + 0.2]),
    ['tube', 'ropeHemp', [[-0.3, 0.95, 0.06], [-0.2, 0.7, 0.08], [0.0, 0.65, 0.08], [0.2, 0.7, 0.08], [0.3, 0.95, 0.06]], 0.012, 4], ['box', 'castIron', 0.06, 0.25, 0.04, 0, 1.28, 0.02]];
  D.bollard = [['lathe', 'castIron', [[0.001, 0], [0.32, 0], [0.32, 0.06], [0.24, 0.08], [0.001, 0.08]], 20], ...[-0.22, 0.22].flatMap(x => [['cyl', 'castIron', 0.12, 0.13, 0.5, 16, x, 0.3, 0], ['cyl', 'castIron', 0.16, 0.16, 0.05, 16, x, 0.56, 0]])];
  // Cowl ventilator: a trunk with a bell mouth turned to the wind, red inside
  D.ventCowl = [['cyl', 'hullWhite', 0.22, 0.22, 1.6, 16, 0, 0.8, 0], ['torus', 'hullWhite', 0.32, 0.18, 16, 0, 0, 1.75, -0.32, 0, H, 0, H], ['cone', 'hullRed', 0.4, 0.3, 16, 0, 2.0, 0.05, -H + 0.3, 0, 0]];
  D.ventMushroom = [['cyl', 'hullWhite', 0.15, 0.15, 0.6, 12, 0, 0.3, 0], ['lathe', 'hullWhite', [[0.001, 0.75], [0.3, 0.7], [0.36, 0.6], [0.16, 0.58]], 16]];
  // The funnel: black top, a gold band with a letter, buff below; oval in section
  D.funnel = [
    ['cyl', 'hullWhite', 2.0, 2.2, 4.0, 24, 0, 2.0, 0, 0, 0, 0], ['cyl', 'funnelBand', 2.0, 2.0, 0.9, 24, 0, 4.45, 0], ['cyl', 'funnelBlack', 1.95, 2.0, 1.6, 24, 0, 5.7, 0],
    ['cyl', 'castIron', 0.35, 0.35, 0.8, 12, 0.6, 6.7, 0.3], ['cyl', 'castIron', 0.3, 0.3, 0.8, 12, -0.6, 6.7, -0.2],
    ['box', 'castIron', 0.08, 4.0, 0.08, 2.1, 2.0, 0], ['box', 'castIron', 0.08, 4.0, 0.08, -2.1, 2.0, 0],
  ];
  // Foremast: steel pole, crosstree with lights, the ship's bell hung at shoulder height with its rope
  D.foremast = [
    ['cyl', 'hullWhite', 0.12, 0.2, 9, 12, 0, 4.5, 0], ['box', 'hullWhite', 2.2, 0.1, 0.1, 0, 7.2, 0],
    ['tube', 'wireRope', [[0, 8.8, 0], [0, 4, 4.5], [0, 0.4, 7.5]], 0.008, 3], ['tube', 'wireRope', [[0, 8.8, 0], [-3, 0.4, 0]], 0.008, 3], ['tube', 'wireRope', [[0, 8.8, 0], [3, 0.4, 0]], 0.008, 3],
    ['box', 'hullWhite', 0.4, 0.4, 0.4, 0, 0.2, 0],
  ];
  D.shipBell = [
    ['box', 'castIron', 0.06, 0.06, 0.7, 0, 2.05, 0.3], ['torus', 'castIron', 0.04, 0.012, 8, 0, 0, 1.98, 0.55, H, 0, 0],
    ['lathe', 'shipBronze', [[0.001, 0.36], [0.07, 0.35], [0.11, 0.3], [0.13, 0.15], [0.16, 0.04], [0.19, 0.0], [0.17, -0.01], [0.13, 0.02], [0.001, 0.02]], 32, 0, 1.6, 0.55],
    ['sph', 'shipBronze', 0.035, 0, 1.6, 0.55, 10, 8],
    ['tube', 'ropeHemp', [[0, 1.62, 0.55], [0.0, 1.35, 0.56], [0.03, 1.15, 0.58]], 0.012, 5], ['torus', 'ropeHemp', 0.03, 0.012, 8, 0, 0.03, 1.12, 0.58, H, 0, 0],
    ['box', 'verdigris', 0.1, 0.03, 0.002, 0, 1.72, 0.66],
  ];
  D.windlass = [['rbox', 'castIron', 1.4, 0.7, 0.9, 0.05, 0, 0.35, 0], ...[-0.55, 0.55].map(x => ['cyl', 'castIron', 0.35, 0.35, 0.3, 20, x, 0.75, 0, 0, 0, H]), ['cyl', 'castIron', 0.12, 0.12, 1.8, 10, 0, 0.75, 0, 0, 0, H],
    ...Array.from({ length: 8 }, (_, k) => ['torus', 'castIron', 0.1, 0.03, 8, 0, 0.55 + Math.cos(k) * 0.02, 0.4 - k * 0.05, 0.45 + k * 0.12, 0, k % 2 ? H : 0, 0])];
  D.raftCanister = [['cap', 'whitePlastic', 0.32, 0.9, 0, 0.45, 0, 0, 0, H], ['box', 'castIron', 1.5, 0.08, 0.5, 0, 0.04, 0], ...[-0.3, 0.3].map(x => ['torus', 'castIron', 0.34, 0.015, 16, 0, x, 0.45, 0, 0, H, 0]), ['box', 'redPlastic', 0.3, 0.1, 0.002, 0, 0.6, 0.31]];
  D.deckBench = [...[0.42, 0.46].map((y, k) => ['rbox', 'teak', 1.8, 0.04, 0.12, 0.01, 0, y, -0.12 + k * 0.14]), ['rbox', 'teak', 1.8, 0.12, 0.03, 0.01, 0, 0.7, -0.24, -0.15], ['rbox', 'teak', 1.8, 0.12, 0.03, 0.01, 0, 0.86, -0.27, -0.15],
    ...[-0.8, 0.8].map(x => ['ext', 'castIron', [[-0.2, 0], [0.2, 0], [0.18, 0.45], [-0.25, 0.95], [-0.29, 0.92], [-0.15, 0.45]], 0.04, 0.004, x, 0, 0, 0, H, 0])];
  D.deckLocker = [['rbox', 'hullWhite', 1.2, 0.8, 0.6, 0.02, 0, 0.4, 0], ['rbox', 'hullWhite', 1.24, 0.04, 0.64, 0.01, 0, 0.82, 0], ['box', 'labelCard', 0.5, 0.15, 0.004, 0, 0.55, 0.302], ['box', 'chrome', 0.12, 0.03, 0.03, 0.4, 0.7, 0.31]];

  // ------------------------------------------------------------ inside
  // Row of four lounge seats on a steel rail, armrests, ashtrays (+z is the way they face)
  D.seatRow = (() => {
    const s = [['box', 'castIron', 2.2, 0.06, 0.06, 0, 0.08, 0]];
    for (let k = 0; k < 4; k++) {
      const x = -0.825 + k * 0.55, mat = k === 2 ? 'seatOrange' : 'seatBlue';
      s.push(['rbox', mat, 0.5, 0.12, 0.5, 0.05, x, 0.45, 0.02], ['rbox', mat, 0.5, 0.62, 0.1, 0.05, x, 0.82, -0.22, -0.18], ['rbox', mat, 0.42, 0.14, 0.08, 0.04, x, 1.16, -0.3, -0.18]);
      s.push(['box', 'castIron', 0.04, 0.36, 0.06, x, 0.22, 0]);
    }
    for (let k = 0; k <= 4; k++) s.push(['rbox', 'castIron', 0.05, 0.06, 0.45, 0.01, -1.1 + k * 0.55, 0.62, 0.02]);
    return s;
  })();
  // A life jacket left on a seat
  D.lifejacket = [['rbox', 'lifejacket', 0.42, 0.08, 0.5, 0.04, 0, 0.04, 0], ['rbox', 'lifejacket', 0.14, 0.1, 0.3, 0.04, 0, 0.08, 0.22], ['tube', 'black', [[-0.18, 0.06, -0.2], [0, 0.07, -0.26], [0.18, 0.06, -0.2]], 0.01, 4]];
  // Two-tier steel cabin bunks with grey blankets, a ladder
  D.bunks = [
    ...[0.35, 1.45].flatMap(y => [['rbox', 'bunkFrame', 1.95, 0.06, 0.82, 0.01, 0, y, 0], ['rbox', 'linenWhite', 1.85, 0.12, 0.74, 0.05, 0, y + 0.09, 0], ['rbox', 'blanketGrey', 1.3, 0.06, 0.76, 0.03, 0.25, y + 0.17, 0], ['rbox', 'linenWhite', 0.4, 0.1, 0.5, 0.04, -0.7, y + 0.2, 0]]),
    ...[[-0.97, -0.4], [0.97, -0.4], [-0.97, 0.4], [0.97, 0.4]].map(([x, z]) => ['box', 'bunkFrame', 0.04, 1.85, 0.04, x, 0.92, z]),
    ['rbox', 'bunkFrame', 1.95, 0.14, 0.03, 0.005, 0, 1.62, 0.42],
    ...[0.6, 0.9, 1.2].map(y => ['box', 'bunkFrame', 0.4, 0.025, 0.025, 0.7, y, 0.44]), ['box', 'bunkFrame', 0.025, 1.3, 0.025, 0.5, 0.95, 0.44], ['box', 'bunkFrame', 0.025, 1.3, 0.025, 0.9, 0.95, 0.44],
  ];
  // The helm console: teak wheel on a pedestal, gyro repeater, compass binnacle beside
  D.helm = [
    ['rbox', 'consoleGrey', 0.5, 1.0, 0.5, 0.04, 0, 0.5, 0], ['cyl', 'chrome', 0.04, 0.04, 0.3, 8, 0, 1.05, 0.2, H, 0, 0],
    ['torus', 'teak', 0.38, 0.03, 32, 0, 0, 1.05, 0.38, 0, 0, 0], ...Array.from({ length: 8 }, (_, k) => ['cyl', 'teak', 0.02, 0.025, 0.55, 6, Math.cos(k * PI / 4) * 0.33, 1.05 + Math.sin(k * PI / 4) * 0.33, 0.38, 0, 0, k * PI / 4 + H]),
    ['cyl', 'chrome', 0.07, 0.07, 0.08, 16, 0, 1.05, 0.39, H, 0, 0], ['disc', 'dialFace', 0.1, 0, 1.18, 0.0, -0.6, 0, 0],
  ];
  D.telegraph = [['lathe', 'shipBronze', [[0.001, 0], [0.14, 0], [0.1, 0.06], [0.07, 0.9], [0.001, 0.92]], 16], ['cyl', 'shipBronze', 0.24, 0.24, 0.12, 24, 0, 1.08, 0, H, 0, 0], ['disc', 'dialFace', 0.21, 0, 1.08, 0.061], ['box', 'shipBronze', 0.03, 0.34, 0.03, 0.05, 1.18, 0.09, 0, 0, -0.4], ['sph', 'blackPlastic', 0.035, 0.13, 1.33, 0.09, 8, 6]];
  D.radarConsole = [['rbox', 'consoleGrey', 0.7, 1.15, 0.6, 0.03, 0, 0.58, 0], ['rbox', 'blackPlastic', 0.6, 0.5, 0.06, 0.04, 0, 1.3, 0.05, -0.5], ['disc', 'radarGlass', 0.2, 0, 1.31, 0.09, -0.5, 0, 0], ['rbox', 'black', 0.5, 0.3, 0.4, 0.04, 0, 1.6, 0.1, -0.5], ...[-0.2, 0, 0.2].map(x => ['rcyl', 'blackPlastic', 0.025, 0.02, 0.005, 12, x, 1.08, 0.31, H, 0, 0])];
  D.chartTable = [['rbox', 'teak', 1.4, 0.9, 0.9, 0.02, 0, 0.45, 0], ['rbox', 'teak', 1.5, 0.04, 1.0, 0.01, 0, 0.92, 0], ['box', 'paper', 1.2, 0.004, 0.8, 0, 0.945, 0, 0, 0.05], ['cyl', 'shipBronze', 0.004, 0.004, 0.3, 6, 0.3, 0.95, 0.1, 0, 0.6, H], ['box', 'blackPlastic', 0.2, 0.02, 0.06, -0.3, 0.955, -0.2]];
  D.radioSet = [['rbox', 'consoleGrey', 1.4, 0.75, 0.6, 0.02, 0, 0.375, 0], ['rbox', 'consoleGrey', 1.2, 0.6, 0.45, 0.03, 0, 1.06, -0.05], ...[-0.4, 0, 0.4].flatMap(x => [['disc', 'dialFace', 0.07, x, 1.15, 0.181], ['rcyl', 'blackPlastic', 0.025, 0.02, 0.006, 12, x, 0.92, 0.18, H, 0, 0]]), ['box', 'lcd', 0.3, 0.05, 0.004, 0, 1.3, 0.181], ['rbox', 'blackPlastic', 0.1, 0.18, 0.06, 0.02, 0.6, 0.85, 0.2], ['tube', 'blackPlastic', [[0.6, 0.8, 0.2], [0.5, 0.75, 0.3], [0.3, 0.76, 0.32]], 0.006, 4]];
  // A whisky bottle and a glass (the captain's drawer)
  D.whisky = [['lathe', 'bottleGlass', [[0.001, 0], [0.04, 0], [0.042, 0.02], [0.042, 0.18], [0.02, 0.22], [0.014, 0.28], [0.001, 0.28]], 16], ['lathe', 'whisky', [[0.001, 0.005], [0.038, 0.005], [0.038, 0.09], [0.001, 0.09]], 16], ['cyl', 'black', 0.016, 0.016, 0.03, 8, 0, 0.29, 0], ['lathe', 'glass', [[0.001, 0], [0.035, 0], [0.04, 0.08], [0.036, 0.08], [0.031, 0.006], [0.001, 0.006]], 16, 0.12, 0, 0.05]];
  // Marine diesel, eight cylinders in line: block, head covers, manifold, flywheel, gauges
  D.marineEngine = (() => {
    const s = [['rbox', 'engineGreen', 6.2, 1.6, 1.4, 0.06, 0, 0.8, 0], ['rbox', 'engineGreen', 6.0, 0.25, 1.6, 0.03, 0, 0.1, 0]];
    for (let k = 0; k < 8; k++) { const x = -2.6 + k * 0.74; s.push(['rbox', 'engineGreen', 0.62, 0.5, 0.9, 0.05, x, 1.85, 0], ['rbox', 'consoleGrey', 0.5, 0.08, 0.7, 0.02, x, 2.14, 0]); s.push(['tube', 'enginePipe', [[x, 1.9, 0.45], [x, 2.0, 0.75], [x + 0.2, 2.25, 0.9]], 0.07, 6]); }
    s.push(['cyl', 'enginePipe', 0.18, 0.18, 6.0, 14, 0, 2.3, 0.9, 0, 0, H]);
    s.push(['cyl', 'castIron', 0.9, 0.9, 0.25, 32, 3.35, 0.95, 0, 0, 0, H]);
    for (let k = 0; k < 4; k++) s.push(['disc', 'dialFace', 0.07, -2.4 + k * 0.3, 1.2, 0.71]);
    return s;
  })();
  // Steel stairs going down through a hatch coaming (seen from above), and the bottom of a stair going up
  D.stairsDownShip = (() => {
    const s = [['box', 'hullWhite', 1.3, 0.9, 0.06, 0, 0.45, -1.3], ['box', 'hullWhite', 0.06, 0.9, 2.6, -0.65, 0.45, 0], ['box', 'hullWhite', 0.06, 0.9, 2.6, 0.65, 0.45, 0]];
    for (let k = 0; k < 9; k++) s.push(['box', 'black', 1.1, 0.03, 0.26, 0, -0.25 - k * 0.25, 1.1 - k * 0.27]);
    s.push(['box', 'black', 1.24, 0.02, 2.5, 0, -0.012, 0]);
    s.push(['tube', 'chrome', [[-0.62, 0.9, -1.3], [-0.62, 0.9, 1.2]], 0.025, 6], ['tube', 'chrome', [[0.62, 0.9, -1.3], [0.62, 0.9, 1.2]], 0.025, 6]);
    return s;
  })();
  D.stairsUpShip = (() => {
    const s = [];
    for (let k = 0; k < 10; k++) s.push(['box', 'deckGreen', 1.1, 0.05, 0.26, 0, 0.22 + k * 0.24, 1.0 - k * 0.24], ['box', 'castIron', 1.1, 0.24, 0.02, 0, 0.1 + k * 0.24, 1.13 - k * 0.24]);
    for (const x of [-0.58, 0.58]) s.push(['box', 'castIron', 0.04, 0.2, 3.4, x, 1.3, -0.15, 0.75, 0, 0], ['tube', 'chrome', [[x, 1.0, 1.2], [x, 3.4, -1.3]], 0.02, 6]);
    return s;
  })();
  // A watertight door leaf: rounded corners, dogs round the edge (door leaf model: x 0..w, y 0..h)
  D.wtDoorLeaf = [['rbox', 'hullWhite', 1.1, 2.2, 0.06, 0.12, 0.55, 1.1, 0], ...[0.3, 1.1, 1.9].flatMap(y => [['box', 'castIron', 0.12, 0.05, 0.08, 0.06, y, 0.05], ['box', 'castIron', 0.12, 0.05, 0.08, 1.04, y, 0.05]]), ['torus', 'castIron', 0.12, 0.015, 12, 0, 0.8, 1.1, 0.06]];
  // Cafeteria counter with a glass display, trays, a till
  D.cafeCounter = [['rbox', 'teak', 3.0, 1.0, 0.7, 0.02, 0, 0.5, 0], ['rbox', 'chrome', 3.0, 0.04, 0.75, 0.01, 0, 1.02, 0], ['box', 'glass', 2.0, 0.35, 0.45, -0.4, 1.22, -0.05], ['rbox', 'register', 0.4, 0.2, 0.35, 0.02, 1.1, 1.14, 0], ...[0.2, 0.4, 0.6].map(z => ['box', 'castIron', 3.0, 0.02, 0.02, 0, 0.9, 0.4 + z * 0])];

  // Things you carry on the ferry
  D.tornPage = [['box', 'paper', 0.21, 0.002, 0.3, 0, 0.001, 0, 0, 0.3, 0], ['box', 'black', 0.18, 0.0005, 0.004, 0.0, 0.0025, -0.1, 0, 0.3, 0], ['box', 'black', 0.15, 0.0005, 0.004, 0.0, 0.0025, -0.06, 0, 0.3, 0]];
  D.logbook = [['rbox', 'leather', 0.42, 0.04, 0.32, 0.01, 0, 0.02, 0], ['box', 'paper', 0.4, 0.035, 0.3, 0.005, 0.021, 0], ['box', 'black', 0.004, 0.042, 0.32, 0, 0.021, 0]];
  D.winchCrank = [['cyl', 'castIron', 0.016, 0.016, 0.42, 8, 0, 0.02, 0, 0, 0, H], ['box', 'castIron', 0.05, 0.03, 0.3, 0.2, 0.02, 0.13], ['cyl', 'teak', 0.022, 0.022, 0.12, 8, 0.2, 0.02, 0.29, 0, 0, H], ['box', 'castIron', 0.05, 0.05, 0.05, -0.2, 0.02, 0]];
})(typeof window !== 'undefined' ? window : globalThis);
