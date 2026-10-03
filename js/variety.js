/* No two of the same thing: furniture that turns up again and again (chairs, desks, shelves, wardrobes,
   tables, benches, pews, beds, bunks, lockers, crates, barrels, coat stands) comes in variants made from
   the place it is in. Each place has its own palette (a ship's teak and mahogany, a mine's rough pine
   and plywood, a mountain hotel's walnut, a village's painted boards, the lake house's white and blue
   paint, a station's varnished oak), and each piece picks from it by where it stands, a little bigger
   or smaller than the next. Desks get their own things on them: no two desks carry the same mug,
   papers and ashtray in the same places, and a ship's desk has a chart and dividers, a mine's a tally
   book and a cap lamp, a hotel's a bell and guest cards, a parish desk a candle and the register.
   Variant definitions are registered in P.DEFS under "<type>#<place>#<k>" the first time they are
   asked for (k 0 is the original); world.js asks through PB.Variety.key, containers and physics
   follow the prop's variant. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U, P = PB.Props, D = P.DEFS, M = PB.Models;
  const PI = Math.PI, H = PI / 2;

  Object.assign(M.MATS, {
    terracotta: M.MATS.terracotta || { color: 0x9a5a38, rough: 0.85 },
    plantDead: M.MATS.plantDead || { color: 0x4a4a2a, rough: 0.9 },
  });
  const PALETTE = {
    depot: { wood: ['woodVarnish', 'darkWood', 'drawerWood'], paint: ['paintMetal', 'doorPaintGreen', 'doorPaintGrey'] },
    ferry: { wood: ['doorTeak', 'mahogany', 'woodVarnish'], paint: ['doorPaintWhite', 'doorPaintGrey', 'paintMetal'] },
    pinewood: { wood: ['doorPly', 'woodVarnish', 'pineWood'], paint: ['doorPaintGreen', 'paintMetal', 'doorPaintRed'] },
    mine: { wood: ['mineTimber', 'doorPly', 'pineWood'], paint: ['doorPaintGrey', 'doorPaintRed', 'paintMetal'] },
    lodge: { wood: ['darkWood', 'mahogany', 'carvedPine'], paint: ['doorPaintWhite', 'doorPaintGreen', 'paintMetal'] },
    village: { wood: ['doorPaintGreen', 'doorPaintBlue', 'pewWood', 'doorPaintRed', 'pineWood'], paint: ['doorPaintBlue', 'doorPaintGreen', 'paintMetal'] },
    train: { wood: ['mahogany', 'doorTeak', 'darkWood'], paint: ['doorPaintGrey', 'paintMetal', 'doorPaintGreen'] },
    carnival: { wood: ['doorPaintRed', 'doorPaintBlue', 'doorPly', 'stallWood'], paint: ['doorPaintRed', 'doorPaintBlue', 'paintMetal'] },
    lake: { wood: ['doorPaintWhite', 'doorPaintBlue', 'darkWood', 'doorPaintRed'], paint: ['doorPaintWhite', 'doorPaintBlue', 'paintMetal'] },
  };
  const WOOD = /^(woodVarnish|darkWood|drawerWood|mahogany|pewWood|pineWood|carvedPine|crateWood|deskTop|stallWood|logWood|folkBlue|folkRed)$/;
  const PAINT = /^(paintMetal|stallPaint|lockerPaint)$/;
  // what varies, and how many variants (besides the original)
  // pieces things stand on keep their height, so nothing on top floats or sinks
  const SUPPORT = { desk: 1, shelf: 1, bookshelf: 1, cafTable: 1, folkTable: 1, stationBench: 1, pew: 1, motelBed: 1, bunks: 1, nightstand: 1, crateStack: 1, barrel: 1, filing: 1 };
  const VARY = { chair: 3, alpineChair: 2, desk: 3, shelf: 2, bookshelf: 2, wardrobe: 3, cafTable: 2, folkTable: 2, stationBench: 2, pew: 2, motelBed: 2, bunks: 2, nightstand: 2, crateStack: 2, barrel: 2, filing: 2, staffLockers: 2, coatStand: 2 };

  // ------------------------------------------------------------ things on desks
  const T0 = 0.7825;   // the desk top
  const ON = {
    papers: r => [['box', 'paper', 0.21, 0.004, 0.3, 0, 0.002, 0, 0, r.range(-0.4, 0.4), 0], ['box', r() < 0.5 ? 'yellowPaper' : 'paper', 0.21, 0.004, 0.3, 0.02, 0.006, 0.01, 0, r.range(-0.4, 0.4), 0]],
    folder: r => [['rbox', r() < 0.5 ? 'folderBrown' : 'manila', 0.24, 0.025, 0.32, 0.004, 0, 0.0125, 0]],
    books: r => { const s = []; let y = 0; for (let k = 0; k < 2 + (r() * 3 | 0); k++) { const h = r.range(0.03, 0.05); s.push(['rbox', ['leather', 'folderBrown', 'suitGreen', 'suitBlue', 'suitBrown'][(r() * 5) | 0], r.range(0.16, 0.24), h, r.range(0.22, 0.3), 0.004, r.range(-0.01, 0.01), y + h / 2, 0, 0, r.range(-0.15, 0.15), 0]); y += h; } return s; },
    mug: r => [['lathe', 'mug', [[0.036, 0], [0.04, 0.005], [0.04, 0.095], [0.037, 0.098], [0.034, 0.01], [0, 0.01]], 16, 0, 0, 0], ['torus', 'mug', 0.024, 0.006, 10, 0, 0.045, 0.05, 0, 0, 0, 0]],
    ashtray: r => [['lathe', 'glass', [[0.07, 0], [0.075, 0.02], [0.05, 0.025], [0.02, 0.012], [0, 0.012]], 16, 0, 0, 0], ['cap', 'cigarette', 0.004, 0.06, 0.03, 0.015, 0, 0, 0.4, H]],
    inkwell: r => [['lathe', 'glass', [[0.035, 0], [0.04, 0.01], [0.035, 0.05], [0.015, 0.06], [0.015, 0.07], [0, 0.07]], 14, 0, 0, 0], ['cyl', 'blackPlastic', 0.006, 0.004, 0.16, 6, 0.06, 0.004, 0, 0, 0.3, H]],
    lamp: r => [['lathe', 'brass', [[0.07, 0], [0.072, 0.01], [0.02, 0.02], [0.012, 0.3], [0, 0.3]], 14, 0, 0, 0], ['lathe', 'lampShade', [[0.11, 0], [0.065, 0.13], [0.001, 0.13]], 18, 0, 0.27, 0]],
    plant: r => [['lathe', 'terracotta', [[0.05, 0], [0.065, 0.1], [0.06, 0.11], [0, 0.11]], 14, 0, 0, 0], ['sph', 'plantDead', 0.06, 0, 0.15, 0, 8, 6, [1, 0.7, 1]]],
    clock: r => [['rcyl', 'brass', 0.06, 0.03, 0.01, 16, 0, 0.065, 0, H], ['box', 'clockFace', 0.08, 0.08, 0.002, 0, 0.065, 0.016], ['box', 'brass', 0.1, 0.01, 0.05, 0, 0.005, 0]],
    photo: r => [['box', 'walnutFrame', 0.13, 0.17, 0.01, 0, 0.085, 0, -0.18, 0, 0], ['box', 'paper', 0.1, 0.13, 0.002, 0, 0.087, 0.006, -0.18, 0, 0]],
    phone: r => [['rbox', 'black', 0.2, 0.06, 0.18, 0.02, 0, 0.03, 0], ['rbox', 'black', 0.2, 0.04, 0.06, 0.02, 0, 0.08, -0.02, -0.2], ['rcyl', 'chrome', 0.05, 0.008, 0.003, 14, 0, 0.062, 0.05]],
    bottle: r => [['lathe', 'bottleGlass', [[0.035, 0], [0.036, 0.18], [0.014, 0.24], [0.013, 0.28], [0, 0.28]], 14, 0, 0, 0], ['lathe', 'glass', [[0.03, 0], [0.032, 0.08], [0, 0.08]], 12, 0.08, 0, 0.03]],
    glasses: r => [['torus', 'blackPlastic', 0.022, 0.003, 10, -0.03, 0.006, 0, H, 0, 0], ['torus', 'blackPlastic', 0.022, 0.003, 10, 0.03, 0.006, 0, H, 0, 0], ['box', 'blackPlastic', 0.012, 0.004, 0.004, 0, 0.006, 0]],
    tray: r => [['rbox', 'woodVarnish', 0.34, 0.04, 0.26, 0.006, 0, 0.02, 0], ['box', 'paper', 0.21, 0.01, 0.24, 0, 0.035, 0, 0, 0.05, 0]],
    // place-specific
    chart: r => [['box', 'stationMap', 0.6, 0.002, 0.42, 0, 0.001, 0, 0, r.range(-0.15, 0.15), 0], ['cyl', 'brass', 0.003, 0.002, 0.16, 6, 0.1, 0.006, 0.05, 0, 0.6, H], ['cyl', 'brass', 0.003, 0.002, 0.16, 6, 0.12, 0.006, 0.04, 0, 0.9, H]],
    tally: r => [['rbox', 'folderBrown', 0.22, 0.03, 0.3, 0.004, 0, 0.015, 0], ...[0, 1, 2].map(k => ['box', 'brass', 0.03, 0.002, 0.04, 0.16 + k * 0.035, 0.002, 0.05 - k * 0.02])],
    bell: r => [['lathe', 'brass', [[0.045, 0], [0.04, 0.03], [0.02, 0.05], [0.004, 0.06], [0, 0.065]], 16, 0, 0, 0], ['box', 'labelCard', 0.1, 0.004, 0.07, 0.12, 0.002, 0, 0, 0.2, 0]],
    candle: r => [['lathe', 'brass', [[0.05, 0], [0.05, 0.01], [0.01, 0.02], [0.012, 0.08], [0.025, 0.09], [0, 0.09]], 14, 0, 0, 0], ['cyl', 'paper', 0.01, 0.01, 0.12, 8, 0, 0.15, 0]],
    teacup: r => [['lathe', 'porcelainW', [[0.065, 0], [0.07, 0.005], [0, 0.005]], 16, 0, 0, 0], ['lathe', 'porcelainW', [[0.03, 0.005], [0.045, 0.05], [0.042, 0.052], [0, 0.01]], 16, 0, 0, 0]],
  };
  const THEME_ON = { ferry: ['chart', 'chart', 'bottle', 'glasses'], mine: ['tally', 'tally', 'bottle', 'lamp'], lodge: ['bell', 'bell', 'tray', 'clock'], village: ['candle', 'candle', 'books', 'inkwell'], lake: ['teacup', 'teacup', 'photo', 'books'], carnival: ['bottle', 'mug', 'papers'], depot: ['tray', 'inkwell', 'phone'], pinewood: ['papers', 'phone', 'mug'], train: ['tray', 'glasses', 'bottle'] };
  const COMMON = ['papers', 'folder', 'books', 'mug', 'ashtray', 'plant', 'clock', 'photo', 'glasses', 'inkwell', 'papers', 'books'];
  function deskClutter(theme, r) {
    // slots on the top (desk space: x across ±0.8, z front +0.35 .. back -0.35), never two in one slot
    const slots = [[-0.62, -0.2], [-0.62, 0.18], [-0.25, -0.24], [0.0, 0.12], [0.3, -0.24], [0.62, -0.2], [0.62, 0.18], [0.25, 0.2]];
    for (let k = slots.length - 1; k > 0; k--) { const j = (r() * (k + 1)) | 0; [slots[k], slots[j]] = [slots[j], slots[k]]; }
    const pool = (THEME_ON[theme] || []).concat(COMMON), out = [], n = 3 + ((r() * 3) | 0);
    for (let k = 0; k < n; k++) {
      const name = pool[(r() * pool.length) | 0], [x, z] = slots[k];
      out.push(...M.place(ON[name](r), x, T0, z, 0, r.range(-0.6, 0.6), 0));
    }
    return out;
  }

  // ------------------------------------------------------------ making a variant
  // the wood a variant is made of (its drawer fronts and doors ask the same question)
  const woodFor = (type, theme, k) => { const pal = PALETTE[theme] || PALETTE.depot; return pal.wood[(k + (U.rng(U.hashStr(type + '#' + theme + '#' + k))() * 2 | 0)) % pal.wood.length]; };
  function variant(type, theme, k) {
    const name = type + '#' + theme + '#' + k;
    if (D[name]) return name;
    const base = D[type], pal = PALETTE[theme] || PALETTE.depot, r = U.rng(U.hashStr(name) + 1);
    if (!base) return type;
    const wood = woodFor(type, theme, k), paint = pal.paint[(k + 1) % pal.paint.length];
    let specs = base.map(sp => {
      const mat = sp[1];
      if (typeof mat !== 'string') return sp;
      if (WOOD.test(mat)) { const s = sp.slice(); s[1] = wood; return s; }
      if (PAINT.test(mat)) { const s = sp.slice(); s[1] = paint; return s; }
      return sp;
    });
    if (type === 'desk') {
      // keep the desk, change what is on it: the base desk's own things all stand on its top
      specs = specs.filter(sp => !isOnTop(sp)).concat(deskClutter(theme, r));
    }
    D[name] = specs;
    return name;
  }
  // a spec standing on the desk top (y of its position at or above the top)
  const POS = { box: 6, rbox: 7, cyl: 7, sph: 4, lathe: 5, torus: 7, cone: 6, cap: 5, disc: 4, rcyl: 7, plane: 5, ext: 6 };
  function isOnTop(sp) { const i = POS[sp[0]]; return i != null && typeof sp[i] === 'number' && sp[i] >= 0.775; }

  const Variety = PB.Variety = {
    PALETTE,
    // the definition a prop is drawn with (and what its drawer fronts use: sub = a slot's def)
    key(p, theme, sub) {
      const n = VARY[p.type];
      if (!n || p.exact || p.wall) return sub || p.type;
      const k = U.hash2(Math.round(p.x * 7), Math.round(p.z * 7), 61) * (n + 1) | 0;
      if (!k) return sub || p.type;
      p.vk = k;
      if (sub) return Variety.sub(sub, p.type, theme, k);
      // a little bigger or smaller than the next one
      if (p.sx == null && p.sy == null && p.sz == null) { const j = U.hash2(Math.round(p.x * 5), Math.round(p.z * 5), 7); p.sx = p.sz = 0.96 + j * 0.08; p.sy = SUPPORT[p.type] ? 1 : 0.97 + j * 0.06; }
      return (p.vtype = variant(p.type, theme, k));
    },
    // a drawer front or door of a varied piece, in the same wood
    sub(def, type, theme, k) {
      const name = def + '#' + theme + '#' + k;
      if (D[name]) return name;
      const wood = woodFor(type, theme, k);
      D[name] = (D[def] || []).map(sp => (typeof sp[1] === 'string' && WOOD.test(sp[1]) ? Object.assign(sp.slice(), { 1: wood }) : sp));
      return name;
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
