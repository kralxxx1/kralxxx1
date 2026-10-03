/* Models for the Nordlys Express, a night sleeper north through the mountains, 19 December 1990:
   sleeping compartments (partitions, sliding doors, two bunks, the little table and the ladder), the
   corridor's fold-down seats, handrails and curtains, dining tables with their lamps, the galley, the
   baggage car's racks and the conductor's desk, gangway bellows over the coupling gap, the locomotive's
   engine and its cab console with the emergency brake; for the platform at the start, the train seen
   from outside (car bodies with lit windows, the locomotive's nose), platform lamps, the station sign,
   and telegraph poles for the night going past. Same spec conventions as props.js / models.js. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  Object.assign(M.tex, {
    // a car body's side: blue with a cream band, a row of windows, some lit, curtains drawn in some
    carSide: () => T.canvas('m9:carSide', 2048, 256, (g, w, h) => {
      const r = U.rng(1990);
      g.fillStyle = '#1e2c48'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#d8ccb0'; g.fillRect(0, h * 0.62, w, 14);
      g.fillStyle = '#9a1e1a'; g.fillRect(0, h * 0.68, w, 6);
      for (let k = 0; k < 11; k++) {
        const x = 60 + k * 180, lit = r() < 0.55;
        g.fillStyle = '#0a0c10'; g.fillRect(x, 40, 130, 100);
        if (lit) { const gr = g.createLinearGradient(0, 40, 0, 140); gr.addColorStop(0, '#f0c070'); gr.addColorStop(1, '#a87030'); g.fillStyle = gr; g.fillRect(x + 4, 44, 122, 92); if (r() < 0.6) { g.fillStyle = 'rgba(80,40,20,0.75)'; g.fillRect(x + 4, 44, 122 * r.range(0.3, 0.9), 92); } }
        g.strokeStyle = '#8a8e94'; g.lineWidth = 4; g.strokeRect(x, 40, 130, 100);
      }
      g.fillStyle = '#d8ccb0'; g.font = `bold 34px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.fillText('NORDLYS', 60, 228);
      for (let k = 0; k < 200; k++) { g.fillStyle = `rgba(255,255,255,${r.range(0.02, 0.08)})`; g.fillRect(r() * w, r() * h, r.range(1, 6), r.range(1, 30)); }
    }),
    stationSign: () => T.canvas('m9:station', 1024, 256, (g, w, h) => { g.fillStyle = '#e8e4d8'; g.fillRect(0, 0, w, h); g.strokeStyle = '#1a3a6a'; g.lineWidth = 12; g.strokeRect(10, 10, w - 20, h - 20); g.fillStyle = '#1a2a4a'; g.font = `bold 140px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('BRENNA', w / 2, 175); }),
    routeBoard: () => T.canvas('m9:route', 512, 256, (g, w, h) => {
      g.fillStyle = '#1a1a1a'; g.fillRect(0, 0, w, h); g.fillStyle = '#f0d070'; g.font = `bold 34px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('NORDLYS EXPRESS', w / 2, 52);
      g.fillStyle = '#e8e4d8'; g.font = `24px ${T.FONTS.FONT_SANS || 'sans-serif'}`; ['Halvard  21.10', 'Brenna  23.40', 'Kvitfjell  (request stop)', 'Nordvik  06.15'].forEach((s, i) => g.fillText(s, w / 2, 100 + i * 38));
    }),
    berthNo: () => T.canvas('m9:berth', 128, 64, (g, w, h) => { g.fillStyle = '#d8ccb0'; g.fillRect(0, 0, w, h); g.fillStyle = '#1a1a1a'; g.font = `bold 34px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('21 22', w / 2, 45); }),
  });
  Object.assign(M.MATS, {
    trainPanel: { color: 0x8a7a62, rough: 0.5, refl: 0.06 }, trainCream: { color: 0xd8ccb0, rough: 0.55 }, trainBlue: { color: 0x1e2c48, rough: 0.45, metal: 0.3, refl: 0.1 }, trainRed: { color: 0x9a1e1a, rough: 0.5 },
    berthBlanket: { color: 0x3a3e5a, rough: 0.95 }, berthSheet: { color: 0xe0dcd0, rough: 0.9 }, curtainBlue: { color: 0x2a3a5a, rough: 0.95, double: true }, curtainRed: { color: 0x6a1a18, rough: 0.95, double: true },
    carSide: { tex: 'carSide', rough: 0.45, emissive: 0xffffff, ei: 0.25 }, stationSign: { tex: 'stationSign', rough: 0.6 }, routeBoard: { tex: 'routeBoard', rough: 0.5, emissive: 0xffffff, ei: 0.2 }, berthNo: { tex: 'berthNo', rough: 0.5 },
    bogieGrey: { color: 0x2a2c2e, rough: 0.6, metal: 0.7 }, lampWarm: { color: 0xffd8a0, glow: 1.6 }, lampHead: { color: 0xfff4d8, glow: 3.0 }, bellows: { color: 0x1a1a1a, rough: 0.8 }, gapDark: { color: 0x020202, rough: 1 },
  });

  // ------------------------------------------------------------ sleeping car
  // One compartment across a car whose middle is the origin (car runs along x, 3 m wide): the
  // compartment on the -z side, the corridor on +z. Partitions at x = +-1.0, the corridor wall at
  // z = 0.45 with the doorway in the middle, two bunks, the little table under the window.
  const compartment = open => {
    const s = [];
    for (const x of [-1.0, 1.0]) s.push(['box', 'trainPanel', 0.05, 2.35, 1.92, x, 1.175, -0.5]);
    s.push(['box', 'trainPanel', 0.65, 2.35, 0.05, -0.675, 1.175, 0.45], ['box', 'trainPanel', 0.65, 2.35, 0.05, 0.675, 1.175, 0.45], ['box', 'trainPanel', 0.7, 0.4, 0.05, 0, 2.15, 0.45]);
    s.push(['box', 'trainPanel', 0.7, 1.95, 0.03, open ? 0.62 : 0, 0.975, 0.49], ['box', 'chrome', 0.03, 0.2, 0.03, open ? 0.32 : -0.3, 1.0, 0.51], ['box', 'berthNo', 0.12, 0.06, 0.004, -0.4, 1.95, 0.476]);
    for (const [y, z] of [[0.45, -1.05], [1.42, -1.05]]) {
      s.push(['box', 'trainPanel', 1.9, 0.1, 0.72, 0, y, z], ['rbox', 'berthSheet', 1.85, 0.1, 0.68, 0.03, 0, y + 0.1, z], ['rbox', 'berthBlanket', 1.3, 0.08, 0.7, 0.03, 0.25, y + 0.17, z, 0, 0.02, 0], ['rbox', 'berthSheet', 0.38, 0.1, 0.5, 0.04, -0.7, y + 0.2, z]);
    }
    s.push(['box', 'chrome', 1.9, 0.03, 0.03, 0, 1.72, -0.7]);
    s.push(['rbox', 'trainPanel', 0.5, 0.04, 0.25, 0.01, 0, 0.78, -1.38], ['box', 'chrome', 0.03, 1.3, 0.03, 0.82, 0.95, -0.66], ['box', 'chrome', 0.03, 1.3, 0.03, 0.62, 0.95, -0.66], ...[0.3, 0.6, 0.9, 1.2].map(y => ['box', 'chrome', 0.22, 0.02, 0.02, 0.72, y, -0.66]));
    s.push(['box', 'trainPanel', 1.9, 0.04, 0.4, 0, 2.2, -1.2]);
    return s;
  };
  D.compartment = compartment(true);
  D.compartmentShut = compartment(false);
  // Corridor fittings along the window wall (+z side at 1.45): handrail, two fold-down seats, curtains
  D.corridorKit = [['cyl', 'chrome', 0.015, 0.015, 3.0, 8, 0, 1.0, 1.38, 0, 0, H], ...[-0.8, 0.8].flatMap(x => [['rbox', 'trainBlue', 0.36, 0.05, 0.3, 0.02, x, 0.5, 1.3], ['box', 'chrome', 0.02, 0.3, 0.02, x, 0.35, 1.4]]), ...[-1.3, 1.3].map(x => ['box', 'curtainRed', 0.35, 1.0, 0.02, x, 1.55, 1.44])];
  // ------------------------------------------------------------ dining car
  D.diningBay = [
    ['rbox', 'trainCream', 0.8, 0.04, 0.75, 0.01, 0, 0.74, -0.95], ['box', 'chrome', 0.05, 0.72, 0.05, 0, 0.36, -0.8], ['box', 'berthSheet', 0.82, 0.004, 0.78, 0, 0.765, -0.95],
    ...[-0.62, 0.62].flatMap(x => [['rbox', 'trainRed', 0.42, 0.45, 0.8, 0.04, x, 0.225, -1.0], ['rbox', 'trainRed', 0.12, 0.6, 0.8, 0.04, x + Math.sign(x) * 0.2, 0.7, -1.0]]),
    ['lathe', 'brass', [[0.05, 0], [0.02, 0.05], [0.015, 0.25], [0.001, 0.25]], 10, 0, 0.765, -1.25], ['lathe', 'lampWarm', [[0.001, 0.4], [0.08, 0.28], [0.09, 0.25], [0.001, 0.25]], 12, 0, 0.77, -1.25],
    ['lathe', 'porcelainW', [[0.03, 0], [0.04, 0.08], [0.037, 0.08], [0.001, 0.004]], 10, -0.2, 0.77, -0.8], ['cyl', 'porcelainW', 0.1, 0.09, 0.015, 14, 0.2, 0.775, -0.85],
  ];
  D.galley = [['rbox', 'steelPrep', 2.4, 0.9, 0.6, 0.01, 0, 0.45, 0], ['box', 'chrome', 2.42, 0.03, 0.62, 0, 0.91, 0], ['rbox', 'steelPrep', 2.4, 0.7, 0.35, 0.01, 0, 1.75, -0.12], ['cyl', 'steelPrep', 0.15, 0.14, 0.25, 14, -0.7, 1.05, 0.05], ['rbox', 'black', 0.4, 0.35, 0.3, 0.02, 0.6, 1.1, -0.1]];
  // ------------------------------------------------------------ baggage car
  D.baggageRack = (() => { const s = []; for (const y of [0.05, 0.8, 1.55]) s.push(['box', 'castIron', 2.6, 0.05, 0.8, 0, y, 0]); for (const x of [-1.25, 1.25]) for (const z of [-0.37, 0.37]) s.push(['box', 'castIron', 0.05, 2.0, 0.05, x, 1.0, z]); return s; })();
  D.conductorDesk = [['rbox', 'trainPanel', 1.1, 0.75, 0.55, 0.01, 0, 0.375, 0], ['rbox', 'trainCream', 1.15, 0.03, 0.6, 0.01, 0, 0.765, 0], ['box', 'paper', 0.3, 0.005, 0.22, -0.25, 0.785, 0.05, 0, 0.2, 0], ['rbox', 'black', 0.2, 0.08, 0.14, 0.01, 0.3, 0.82, -0.1], ['lathe', 'brass', [[0.07, 0], [0.04, 0.1], [0.05, 0.18], [0.001, 0.2]], 12, 0.4, 0.78, 0.15]];
  // the conductor's ticket punch (item model)
  D.ticketPunch = [['box', 'chrome', 0.12, 0.012, 0.025, 0.04, 0.01, 0, 0, 0, 0.15], ['box', 'chrome', 0.12, 0.012, 0.025, 0.04, 0.03, 0, 0, 0, -0.1], ['cyl', 'chrome', 0.012, 0.012, 0.03, 8, -0.03, 0.02, 0, H, 0, 0], ['box', 'black', 0.05, 0.016, 0.03, 0.08, 0.012, 0]];
  D.railTicket = [['box', 'berthSheet', 0.085, 0.002, 0.055, 0, 0.001, 0, 0, 0.25, 0], ['box', 'trainRed', 0.02, 0.0025, 0.055, -0.03, 0.0015, 0, 0, 0.25, 0]];
  // ------------------------------------------------------------ gangway and car ends
  // Bellows round the passage between two cars (passage along x), floor plates over the coupling gap
  D.gangway = (() => {
    const s = [];
    for (let k = -3; k <= 3; k++) { const x = k * 0.32; s.push(['box', 'bellows', 0.08, 2.3, 0.08, x, 1.15, -0.62], ['box', 'bellows', 0.08, 2.3, 0.08, x, 1.15, 0.62], ['box', 'bellows', 0.08, 0.08, 1.3, x, 2.3, 0]); }
    s.push(['box', 'bogieGrey', 0.9, 0.03, 1.0, -0.65, 0.02, 0], ['box', 'bogieGrey', 0.9, 0.03, 1.0, 0.65, 0.02, 0], ['box', 'gapDark', 0.42, 0.005, 1.0, 0, 0.002, 0]);
    s.push(['box', 'chrome', 0.03, 1.0, 0.03, 0, 1.0, -0.55], ['box', 'chrome', 0.03, 1.0, 0.03, 0, 1.0, 0.55]);
    return s;
  })();
  D.carEndDoor = [['box', 'trainPanel', 0.05, 2.1, 0.75, 0, 1.05, 0], ['box', 'glassFrost', 0.052, 0.6, 0.45, 0, 1.45, 0], ['box', 'chrome', 0.06, 0.2, 0.03, 0, 1.0, 0.3]];
  // ------------------------------------------------------------ locomotive
  D.locoEngine = [['rbox', 'trainBlue', 4.0, 1.7, 1.2, 0.05, 0, 0.85, 0], ...[-1.5, -0.5, 0.5, 1.5].map(x => ['rbox', 'castIron', 0.6, 0.3, 0.9, 0.04, x, 1.85, 0]), ['cyl', 'castIron', 0.12, 0.12, 2.0, 10, 0.5, 2.2, 0.4, 0, 0, H], ['box', 'grille', 3.8, 1.2, 0.01, 0, 0.9, 0.605], ['box', 'labelCard', 0.4, 0.2, 0.004, -1.4, 1.3, 0.61]];
  D.locoConsole = [
    ['rbox', 'trainBlue', 2.4, 1.0, 0.7, 0.03, 0, 0.5, 0], ['rbox', 'black', 2.3, 0.06, 0.5, 0.02, 0, 1.05, -0.05, -0.4, 0, 0],
    ...[-0.8, -0.4, 0, 0.4].map(x => ['cyl', 'dialFace', 0.08, 0.08, 0.02, 16, x, 1.15, 0.0, -0.4 + H, 0, 0]),
    ['cyl', 'chrome', 0.02, 0.02, 0.35, 8, -0.6, 1.25, 0.2, 0.3, 0, 0], ['sph', 'black', 0.04, -0.6, 1.42, 0.25, 8, 6],
    // the emergency brake: a red handle on the right of the console
    ['box', 'trainRed', 0.08, 0.35, 0.08, 0.9, 1.25, 0.25], ['rbox', 'trainRed', 0.2, 0.06, 0.06, 0.02, 0.9, 1.45, 0.25],
  ];
  D.cabSeat = [['rbox', 'black', 0.5, 0.12, 0.5, 0.04, 0, 0.55, 0], ['rbox', 'black', 0.5, 0.6, 0.1, 0.04, 0, 0.9, -0.22], ['cyl', 'chrome', 0.04, 0.05, 0.5, 8, 0, 0.25, 0]];
  // ------------------------------------------------------------ the train from outside, at the platform
  // A car body 24 m long (along x), bogies, the window band; origin at rail level under the centre
  D.carExterior = [
    ['rbox', 'trainBlue', 24, 3.0, 2.9, 0.1, 0, 2.3, 0], ['box', 'carSide', 23.6, 2.9, 0.004, 0, 2.35, 1.452], ['box', 'carSide', 23.6, 2.9, 0.004, 0, 2.35, -1.452, 0, PI, 0],
    ['cyl', 'trainBlue', 1.45, 1.45, 24, 24, 0, 2.8, 0, 0, 0, H],
    ...[-8.5, 8.5].flatMap(x => [['box', 'bogieGrey', 2.6, 0.5, 2.4, x, 0.55, 0], ...[-0.9, 0.9].map(dx => ['cyl', 'bogieGrey', 0.45, 0.45, 2.5, 16, x + dx, 0.45, 0, H, 0, 0])]),
    ...[-11.2, 11.2].map(x => ['box', 'trainBlue', 0.4, 2.3, 0.8, x, 2.0, 1.47]),
  ];
  D.locoExterior = [
    ['rbox', 'trainRed', 16, 3.4, 3.0, 0.12, 0, 2.5, 0], ['ext', 'trainRed', [[-1.5, 0], [1.5, 0], [1.5, 2.6], [0.9, 3.4], [-0.9, 3.4], [-1.5, 2.6]], 2.2, 0.05, 9.0, 0.8, 0, 0, H, 0],
    ['box', 'gondolaGlass', 0.05, 0.9, 2.2, 10.12, 3.4, 0], ...[-0.9, 0.9].map(z => ['cyl', 'lampHead', 0.14, 0.14, 0.06, 16, 10.12, 1.6, z, 0, 0, H]),
    ...[-5, 5].flatMap(x => [['box', 'bogieGrey', 3.2, 0.6, 2.4, x, 0.6, 0], ...[-1.1, 0, 1.1].map(dx => ['cyl', 'bogieGrey', 0.5, 0.5, 2.5, 16, x + dx, 0.5, 0, H, 0, 0])]),
    ['box', 'trainCream', 16, 0.18, 3.02, 0, 2.2, 0],
  ];
  D.platformLamp = [['cyl', 'castIron', 0.06, 0.09, 4.0, 10, 0, 2.0, 0], ['tube', 'castIron', [[0, 4.0, 0], [0, 4.3, 0.3], [0, 4.25, 0.7]], 0.03, 6], ['lathe', 'castIron', [[0.001, 0.15], [0.2, 0.05], [0.24, -0.05]], 14, 0, 4.15, 0.75], ['sph', 'lampWarm', 0.07, 0, 4.05, 0.75, 10, 8]];
  D.stationSign = [['box', 'castIron', 0.08, 2.6, 0.08, -1.4, 1.3, 0], ['box', 'castIron', 0.08, 2.6, 0.08, 1.4, 1.3, 0], ['box', 'stationSign', 3.0, 0.75, 0.05, 0, 2.6, 0]];
  D.routeBoard = [['rbox', 'castIron', 1.1, 0.6, 0.06, 0.01, 0, 0, 0.03], ['box', 'routeBoard', 1.0, 0.5, 0.004, 0, 0, 0.062]];
  D.telegraphPole = [['cyl', 'timber', 0.11, 0.14, 8.0, 8, 0, 4.0, 0], ['box', 'timber', 1.4, 0.1, 0.1, 0, 7.4, 0], ...[-0.55, -0.2, 0.2, 0.55].map(x => ['cyl', 'porcelainW', 0.03, 0.03, 0.1, 6, x, 7.5, 0])];
})(typeof window !== 'undefined' ? window : globalThis);
