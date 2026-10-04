/* Models for Lake Ostra, 14 January 1979, a quarter to four, the snow coming: Ingrid Lind's house on the
   shore (the table radio with its lit dial, the paper advent star still in the window, the cassette
   recorder with the tape for Ada, the knitting, the hooks by the door with one empty, the girls' bunk
   bed and Wren's drawings pinned over it), the yard (woodpile, a sledge, the mailbox), birches, frozen
   reeds along the shore, the pier's posts, the ice-fishing huts' fittings (a tin stove, an auger, rods,
   a transistor radio, the hole in the ice), and far out, the top of Gammel Ostra's church tower standing
   up through the ice. Same spec conventions as props.js / models.js. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  Object.assign(M.tex, {
    radioDial: () => T.canvas('m11:dial', 512, 128, (g, w, h) => {
      const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#f8d890'); gr.addColorStop(1, '#d89a48'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
      g.fillStyle = '#3a2410'; g.font = `18px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center';
      ['OSLO', 'HALVARD', 'NORDVIK', 'STOCKHOLM', 'KØBENHAVN', 'HELSINKI'].forEach((s, k) => g.fillText(s, 40 + k * 86, 40));
      for (let k = 0; k < 60; k++) g.fillRect(10 + k * 8.3, 60, 1, k % 5 ? 10 : 18);
      g.fillStyle = '#a81a1a'; g.fillRect(212, 50, 3, 60);
    }),
    // Wren's drawings pinned over the bunk: crayon birds, the house, two girls, one with a green scarf
    wrenWall: () => T.canvas('m11:wrenwall', 1024, 512, (g, w, h) => {
      const r = U.rng(1971);
      g.fillStyle = 'rgba(0,0,0,0)'; g.clearRect(0, 0, w, h);
      for (let k = 0; k < 6; k++) {
        const x = 30 + k * 165 + r.range(-10, 10), y = 40 + (k % 2) * 180 + r.range(-15, 15), ww = 140, hh = 180, rot = r.range(-0.08, 0.08);
        g.save(); g.translate(x + ww / 2, y + hh / 2); g.rotate(rot);
        g.fillStyle = '#f0ead8'; g.fillRect(-ww / 2, -hh / 2, ww, hh);
        g.lineWidth = 4; g.lineCap = 'round';
        const crayon = (c, pts) => { g.strokeStyle = c; g.beginPath(); pts.forEach(([a, b], i) => (i ? g.lineTo(a, b) : g.moveTo(a, b))); g.stroke(); };
        // the little red bird, always
        g.fillStyle = '#c81a1a'; g.beginPath(); g.ellipse(30, -60, 16, 10, -0.3, 0, PI * 2); g.fill(); crayon('#c81a1a', [[40, -66], [52, -74], [46, -62]]);
        if (k % 3 === 0) { crayon('#1a5ac8', [[-50, 40], [50, 40]]); crayon('#2a8a2a', [[-30, 40], [-30, 0], [-20, -20]]); crayon('#2a8a2a', [[-34, -8], [-18, -8]]); g.fillStyle = '#2a8a2a'; g.fillRect(-36, -26, 14, 4); crayon('#c81a1a', [[20, 40], [20, 10]]); g.fillStyle = '#c81a1a'; g.beginPath(); g.arc(20, 2, 8, 0, PI * 2); g.fill(); }
        else if (k % 3 === 1) { g.fillStyle = '#a82a1a'; g.fillRect(-40, -10, 70, 50); crayon('#3a2a1a', [[-46, -10], [-5, -45], [36, -10]]); g.fillStyle = '#f8d040'; g.fillRect(-25, 5, 16, 14); }
        else { crayon('#6a8ab8', [[-60, 20], [60, 20]]); for (let i = 0; i < 4; i++) crayon('#3a2a1a', [[-40 + i * 25, 20], [-40 + i * 25, 0], [-30 + i * 25, 0], [-30 + i * 25, 20]]); }
        g.fillStyle = '#1a1a1a'; g.font = 'bold 18px sans-serif'; g.textAlign = 'center'; g.fillText(['ADA', 'MORMOR', 'THE HUTS', 'ME', 'HOME', 'BIRD'][k], 0, 75);
        g.fillStyle = '#c8a040'; g.beginPath(); g.arc(0, -hh / 2 + 6, 5, 0, PI * 2); g.fill();
        g.restore();
      }
    }),
    // the old church tower's top, weathered white boards over the ice
    adventPaper: () => T.canvas('m11:advent', 256, 256, (g, w, h) => { const gr = g.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2); gr.addColorStop(0, '#fff4d0'); gr.addColorStop(0.7, '#f0b860'); gr.addColorStop(1, '#a86020'); g.fillStyle = gr; g.fillRect(0, 0, w, h); for (let k = 0; k < 30; k++) { g.fillStyle = 'rgba(255,255,255,0.4)'; g.beginPath(); g.arc(Math.random() * w, Math.random() * h, 3, 0, PI * 2); g.fill(); } }),
    birchBark: () => T.canvas('m11:birch', 256, 512, (g, w, h) => {
      const r = U.rng(77); g.fillStyle = '#e4e2da'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 140; k++) { g.fillStyle = `rgba(20,20,18,${r.range(0.5, 0.9)})`; const y = r() * h, ww = r.range(8, 60); g.fillRect(r() * w, y, ww, r.range(2, 7)); }
      for (let k = 0; k < 60; k++) { g.fillStyle = `rgba(140,120,90,${r.range(0.1, 0.3)})`; g.fillRect(r() * w, r() * h, r.range(2, 20), r.range(10, 40)); }
    }),
  });
  Object.assign(M.MATS, {
    radioWood: { color: 0x5a3a22, rough: 0.35, refl: 0.08 }, radioDial: { tex: 'radioDial', rough: 0.4, emissive: 0xffffff, ei: 0.85 }, radioCloth: { color: 0x8a7a5a, rough: 0.95 },
    adventPaper: { tex: 'adventPaper', rough: 0.9, emissive: 0xffc070, ei: 1.4, double: true }, wrenWall: { tex: 'wrenWall', rough: 0.9, transparent: true, alpha: true },
    woolGreen: { color: 0x2a5a2a, rough: 1 }, woolRed: { color: 0xa81a1a, rough: 1 }, woolGrey: { color: 0x7a7a72, rough: 1 }, snowsuitRed: { color: 0xa8141a, rough: 0.8 },
    birchBark: { tex: 'birchBark', rough: 0.85 }, birchLeafless: { color: 0x3a2e26, rough: 0.9 }, reedDry: { color: 0x8a7a5a, rough: 0.9 }, hutRed: { color: 0x7a2418, rough: 0.85 },
    iceHole: { color: 0x020406, rough: 0.05, refl: 0.6 }, iceBlue: { color: 0x9ab8c8, rough: 0.15, refl: 0.3, transparent: true, opacity: 0.85 }, tinGrey: { color: 0x6a6e70, rough: 0.5, metal: 0.6 },
  });

  // ------------------------------------------------------------ in the house
  D.tableRadio = [
    ['rbox', 'radioWood', 0.62, 0.36, 0.26, 0.03, 0, 0.18, 0], ['box', 'radioCloth', 0.3, 0.24, 0.005, -0.12, 0.2, 0.131], ['box', 'radioDial', 0.24, 0.07, 0.005, 0.17, 0.26, 0.131],
    ...[0.1, 0.24].map(x => ['cyl', 'black', 0.025, 0.025, 0.03, 12, x, 0.12, 0.14, H, 0, 0]), ['box', 'chrome', 0.6, 0.012, 0.01, 0, 0.35, 0.13],
  ];
  // the paper star that hangs in the window from Advent to Epiphany, still up in January
  D.adventStar = (() => {
    const pts = []; for (let k = 0; k < 10; k++) { const a = k / 10 * PI * 2 + H, rr = k % 2 ? 0.1 : 0.24; pts.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
    return [['ext', 'adventPaper', pts, 0.12, 0.02, 0, 0, 0, 0, 0, 0, 'adventPaper'], ['cyl', 'string', 0.003, 0.003, 0.6, 4, 0, 0.5, 0], ...[-0.08, 0, 0.08].map(x => ['box', 'adventPaper', 0.02, 0.2, 0.002, x, -0.32, 0])];
  })();
  D.knitting = [['cyl', 'planterWood', 0.2, 0.17, 0.22, 14, 0, 0.11, 0, 0, 0, 0, true], ['sph', 'woolGreen', 0.08, -0.05, 0.22, 0.02, 10, 8], ['sph', 'woolRed', 0.07, 0.07, 0.22, -0.04, 10, 8], ['cyl', 'chrome', 0.004, 0.004, 0.32, 4, 0.0, 0.32, 0.0, 0.5, 0, 0.3], ['cyl', 'chrome', 0.004, 0.004, 0.32, 4, 0.02, 0.32, 0.03, -0.4, 0, -0.3]];
  // the hooks by the door: Gran's coat, Ada's anorak, and an empty peg with a label: WREN
  D.coatHooks = [
    ['box', 'pineWood', 1.2, 0.12, 0.03, 0, 1.7, 0.015], ...[-0.45, -0.15, 0.15, 0.45].map(x => ['cyl', 'brass', 0.012, 0.012, 0.08, 6, x, 1.68, 0.06, H, 0, 0]),
    ['rbox', 'coatWool', 0.42, 0.95, 0.16, 0.06, -0.45, 1.18, 0.11], ['rbox', 'coatBeige', 0.4, 0.75, 0.15, 0.06, -0.15, 1.3, 0.11],
    ['box', 'paper', 0.08, 0.03, 0.002, 0.15, 1.78, 0.032], ['box', 'paper', 0.08, 0.03, 0.002, 0.45, 1.78, 0.032],
  ];
  D.bootRow = [['rbox', 'black', 0.12, 0.28, 0.3, 0.03, -0.3, 0.14, 0], ['rbox', 'black', 0.12, 0.28, 0.3, 0.03, -0.15, 0.14, 0], ['rbox', 'bootRed', 0.1, 0.2, 0.22, 0.03, 0.15, 0.1, 0], ['box', 'pineWood', 0.9, 0.03, 0.35, 0, 0.0, 0]];
  D.wrenDrawings = [['box', 'wrenWall', 1.6, 0.8, 0.004, 0, 0, 0]];
  D.cassetteRecorder = [['rbox', 'black', 0.3, 0.07, 0.18, 0.01, 0, 0.035, 0], ['box', 'caseClear', 0.12, 0.004, 0.08, -0.05, 0.072, 0.01], ...[0, 1, 2, 3, 4].map(k => ['box', 'chrome', 0.018, 0.012, 0.02, 0.04 + k * 0.022, 0.075, -0.05]), ['box', 'speakerGrille', 0.1, 0.004, 0.1, 0.09, 0.071, 0.03], ['box', 'linenTag', 0.07, 0.002, 0.025, -0.05, 0.075, 0.01]];
  // ------------------------------------------------------------ the yard and the shore
  D.woodpile = (() => { const s = []; const r = U.rng(5); for (let row = 0; row < 4; row++) for (let k = 0; k < 9; k++) s.push(['cyl', 'logWood', 0.08 + r() * 0.03, 0.08 + r() * 0.03, 0.55, 8, -0.8 + k * 0.2 + (row % 2) * 0.1, 0.09 + row * 0.17, 0, H, 0, 0]); s.push(['box', 'snowPack', 2.0, 0.08, 0.7, 0, 0.75, 0]); return s; })();
  D.sledge = [['box', 'pineWood', 0.4, 0.04, 0.9, 0, 0.22, 0], ...[-0.18, 0.18].flatMap(x => [['tube', 'tinGrey', [[x, 0.02, -0.45], [x, 0.02, 0.4], [x, 0.12, 0.55], [x, 0.22, 0.45]], 0.012, 4, 10], ['box', 'pineWood', 0.03, 0.18, 0.03, x, 0.11, -0.2], ['box', 'pineWood', 0.03, 0.18, 0.03, x, 0.11, 0.25]]), ['tube', 'string', [[0, 0.22, 0.45], [0.1, 0.1, 0.8], [0.3, 0.02, 1.0]], 0.004, 3, 8]];
  D.birch = (() => {
    const s = [['cyl', 'birchBark', 0.11, 0.16, 9.0, 10, 0, 4.5, 0]], r = U.rng(9);
    for (let k = 0; k < 9; k++) { const a = k * 2.4, y = 4.5 + k * 0.45, l = 2.5 - k * 0.18; s.push(['cyl', 'birchLeafless', 0.02, 0.05, l, 5, Math.cos(a) * l * 0.45, y + l * 0.3, Math.sin(a) * l * 0.45, Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9]); }
    s.push(['box', 'snowPack', 0.12, 0.03, 0.12, 0, 9.0, 0]); void r;
    return s;
  })();
  D.reeds = (() => { const s = [], r = U.rng(13); for (let k = 0; k < 22; k++) { const x = r.range(-0.5, 0.5), z = r.range(-0.4, 0.4), h = r.range(0.7, 1.4); s.push(['cyl', 'reedDry', 0.004, 0.008, h, 3, x, h / 2, z, r.range(-0.2, 0.2), 0, r.range(-0.2, 0.2)]); if (k % 3 === 0) s.push(['cap', 'reedDry', 0.012, 0.08, x, h, z]); } return s; })();
  D.pierPost = [['cyl', 'timberGrey', 0.1, 0.12, 1.4, 8, 0, 0.4, 0], ['cyl', 'snowPack', 0.11, 0.11, 0.05, 8, 0, 1.12, 0]];
  // ------------------------------------------------------------ the huts on the ice
  D.hutStove = [['cyl', 'tinGrey', 0.18, 0.18, 0.4, 14, 0, 0.3, 0], ['cyl', 'tinGrey', 0.05, 0.05, 1.8, 8, 0, 1.4, 0], ['box', 'emberGlow', 0.08, 0.04, 0.005, 0, 0.25, 0.181], ...[-0.12, 0.12].map(x => ['cyl', 'castIron', 0.015, 0.015, 0.1, 4, x, 0.05, 0])];
  D.iceAuger = [['cyl', 'tinGrey', 0.02, 0.02, 1.3, 6, 0, 0.65, 0, 0.15, 0, 0.1], ['tube', 'tinGrey', Array.from({ length: 12 }, (_, k) => [Math.cos(k * 1.3) * 0.07, 0.05 + k * 0.03, Math.sin(k * 1.3) * 0.07]), 0.008, 4, 30], ['box', 'black', 0.3, 0.03, 0.03, 0, 1.3, 0]];
  D.fishingRod = [['cyl', 'black', 0.006, 0.01, 0.8, 4, 0, 0.4, 0, 0, 0, 0.4], ['cyl', 'chrome', 0.03, 0.03, 0.04, 8, 0.06, 0.1, 0, 0, 0, H]];
  D.iceHole = [['disc', 'iceHole', 0.22, 0, 0.004, 0, -H, 0, 0], ['ring', 'iceBlue', 0.22, 0.3, 0, 0.006, 0, -H, 0, 0]];
  D.transistor = [['rbox', 'redPlastic', 0.2, 0.12, 0.05, 0.01, 0, 0.06, 0], ['box', 'speakerGrille', 0.1, 0.08, 0.002, -0.04, 0.06, 0.026], ['cyl', 'chrome', 0.003, 0.003, 0.3, 4, 0.08, 0.25, 0, 0, 0, -0.3]];
  D.hutBench = [['box', 'pineWood', 1.6, 0.05, 0.35, 0, 0.42, 0], ['box', 'pineWood', 0.05, 0.42, 0.3, -0.7, 0.21, 0], ['box', 'pineWood', 0.05, 0.42, 0.3, 0.7, 0.21, 0]];
  D.hutSkids = [['box', 'timberGrey', 3.0, 0.12, 0.14, 0, 0.06, -1.2], ['box', 'timberGrey', 3.0, 0.12, 0.14, 0, 0.06, 1.2], ['box', 'snowPack', 3.2, 0.12, 0.5, 0, 0.06, -1.5]];
  // the church tower of Gammel Ostra, frozen into the lake: the belfry, the spire, the cross
  D.iceSpire = [
    ['box', 'churchWhite', 3.2, 2.0, 3.2, 0, 1.0, 0], ...[-1, 1].flatMap(s => [['box', 'black', 0.9, 1.1, 0.04, s * 0.7, 1.1, 1.61], ['box', 'black', 0.04, 1.1, 0.9, 1.61, 1.1, s * 0.7]]),
    ['box', 'churchWhite', 3.5, 0.15, 3.5, 0, 2.05, 0], ['cone', 'spireGrey', 2.4, 7.0, 4, 0, 5.6, 0, 0, PI / 4, 0], ['cyl', 'bronzeBell', 0.03, 0.03, 1.2, 6, 0, 9.6, 0], ['box', 'bronzeBell', 0.6, 0.05, 0.05, 0, 9.8, 0],
    ['box', 'snowPack', 3.3, 0.08, 3.3, 0, 2.15, 0], ['cyl', 'snowPack', 2.6, 2.8, 0.25, 12, 0, 0.0, 0],
  ];
  // a mono-pitch roof (scale it to the building with sx/sy/sz); snow lying on it
  D.roofShed = [['box', 'roofTile', 1.06, 0.12, 1.08, 0, 0.3, 0, 0.18, 0, 0], ['box', 'snowPack', 1.02, 0.1, 1.04, 0, 0.4, 0, 0.18, 0, 0], ['box', 'hutRed', 1.0, 0.5, 0.04, 0, 0.12, 0.5], ['box', 'hutRed', 1.0, 0.3, 0.04, 0, 0.05, -0.5]];
  // a farmhouse wardrobe, painted, two doors
  D.wardrobe = [['rbox', 'folkBlue', 1.0, 1.9, 0.56, 0.02, 0, 0.95, 0], ['box', 'rosemaling', 0.005, 1.5, 0.004, 0, 1.0, 0.282], ...[-0.06, 0.06].map(x => ['cyl', 'brass', 0.012, 0.012, 0.04, 8, x, 1.0, 0.29, H, 0, 0]), ['rbox', 'folkBlue', 1.06, 0.08, 0.6, 0.02, 0, 1.92, 0], ['rbox', 'folkRed', 0.38, 0.5, 0.004, 0.01, -0.24, 1.35, 0.283], ['rbox', 'folkRed', 0.38, 0.5, 0.004, 0.01, 0.24, 1.35, 0.283]];
  D.mitten = [['rbox', 'woolRed', 0.09, 0.03, 0.15, 0.012, 0, 0.015, 0], ['rbox', 'woolRed', 0.04, 0.03, 0.06, 0.012, 0.055, 0.015, 0.03, 0, -0.5, 0], ['box', 'woolGrey', 0.09, 0.032, 0.03, 0, 0.016, -0.07]];
})(typeof window !== 'undefined' ? window : globalThis);
