/* Chapter 9 map: Lake Ostra, Sunday 14 January 1979, a quarter to four, the snow coming in. The lake is
   the reservoir over Gammel Ostra: frozen white to the far shore, the old river channel still running
   under it where the ice is thin and dark, and far out the top of the drowned village's church tower
   standing up through the ice. On the south shore, Ingrid Lind's red house (living room with the stove
   and the radio, kitchen, hall, the girls' room, her room), the porch, the yard, the woodshed; the
   beach with its frozen reeds, the pier, the boathouse. Out on the ice, four fishing huts where the
   older kids were. 52 x 48 cells of 3 m. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const MAPS = PB.Maps || (PB.Maps = {});
  const H = Math.PI / 2, PI = Math.PI;
  const MapDraw = (...a) => PB.Authored.MapDraw(...a);
  // the old river channel: where the ice is thin (cell runs, north to south, curving)
  const CHANNEL = [[5, 0, 8], [5, 1, 8], [6, 2, 8], [6, 3, 9], [7, 4, 9], [7, 5, 10], [8, 6, 10], [8, 7, 11], [9, 8, 11], [9, 9, 12], [10, 10, 12], [10, 11, 13], [11, 12, 13], [11, 13, 14], [12, 14, 14], [12, 15, 15], [12, 16, 15], [13, 17, 15], [13, 18, 16], [13, 19, 16], [13, 20, 16], [13, 21, 15], [12, 22, 14]];
  MAPS.lakeChannel = CHANNEL;

  function plan() {
    const D = MapDraw(52, 48);
    D.fill(0, 0, 51, 35, 'I');                               // the ice
    for (const [x0, y, x1] of CHANNEL) D.fill(x0, y, x1, y, 'T');   // thin ice over the channel
    D.fill(0, 36, 51, 37, 'b');                              // the beach, reeds, snow on stones
    D.fill(0, 38, 51, 47, 'S');                              // the shore: snow, the yard, birches
    // ------------------------------------------------ Ingrid's house
    D.fill(6, 39, 9, 41, 'L');                               // living room
    D.fill(10, 39, 13, 41, 'K');                             // kitchen
    D.fill(6, 42, 13, 42, 'A');                              // hall
    D.fill(6, 43, 9, 44, 'G');                               // the girls' room
    D.fill(10, 43, 13, 44, 'R');                             // Ingrid's room
    D.fill(8, 38, 11, 38, 'p');                              // the porch, toward the lake
    D.fill(16, 41, 17, 42, 'W');                             // woodshed
    // ------------------------------------------------ the pier and the boathouse
    D.fill(16, 30, 16, 35, 'P');                             // pier, out over the ice
    D.fill(22, 33, 25, 37, 'B');                             // boathouse, half on the ice
    // ------------------------------------------------ the huts
    D.set(30, 14, 'h').set(34, 16, 'j').set(31, 19, 'k').set(37, 13, 'm');
    D.join('I', 'T', 'b', 'S', 'p', 'P');
    D.border('ITbSpP', 'i');
    // the house: doors and windows
    D.edge(9, 39, 0, 'd');                                   // porch → living room
    D.edge(13, 42, 1, 'd');                                  // hall → the yard (back door)
    D.edge(9, 41, 2, ' ').edge(11, 41, 2, ' ');              // living room and kitchen open to the hall
    D.edge(9, 40, 1, ' ');                                   // living room ↔ kitchen
    D.edge(7, 42, 2, 'd').edge(12, 42, 2, 'd');              // the bedrooms
    for (const x of [6, 7, 11, 12]) D.edge(x, 39, 0, 'w');
    D.edge(6, 40, 3, 'w').edge(13, 40, 1, 'w').edge(6, 44, 3, 'w').edge(13, 44, 1, 'w').edge(8, 44, 2, 'w').edge(11, 44, 2, 'w');
    D.edge(16, 41, 0, 'd');                                  // woodshed
    // the pier's rails; the porch's rail with the steps left open
    D.vline(16, 30, 35, 'r'); D.vline(17, 30, 35, 'r'); D.edge(16, 30, 0, 'r');
    D.edge(8, 38, 0, 'r').edge(11, 38, 0, 'r').edge(8, 38, 3, 'r').edge(11, 38, 1, 'r');
    // boathouse: the big doors onto the ice, a small one onto the shore
    D.edge(23, 33, 0, 'd').edge(24, 33, 0, 'd').edge(23, 37, 2, 'd');
    D.edge(22, 35, 3, 'w').edge(25, 35, 1, 'w');
    // huts: a door each, a little window
    D.edge(30, 14, 2, 'd').edge(30, 14, 1, 'w');
    D.edge(34, 16, 3, 'd').edge(34, 16, 0, 'w');
    D.edge(31, 19, 0, 'd').edge(31, 19, 3, 'w');
    D.edge(37, 13, 2, 'd').edge(37, 13, 3, 'w');
    return D.grid();
  }

  MAPS.lake = {
    ceil: 3,
    allowIslands: false,
    styles: {
      ice: { outdoor: true, floor: 'ice', floorTint: 0xd0dce4, wall: 'logWall', h: 9, step: 'ice' },
      thin: { outdoor: true, floor: 'ice', floorTint: 0x5a6a78, wall: 'logWall', h: 9, step: 'ice' },
      beach: { outdoor: true, floor: 'snow', floorTint: 0xc8ccd0, wall: 'logWall', h: 9, step: 'snow' },
      shore: { outdoor: true, floor: 'snow', wall: 'logWall', h: 9, step: 'snow' },
      porch: { outdoor: true, floor: 'boards', floorTint: 0x7a6a5a, wall: 'logWall', h: 9, step: 'wood', rail: 'wood' },
      pier: { outdoor: true, floor: 'boards', floorTint: 0x8a8a84, wall: 'logWall', h: 9, step: 'wood', rail: 'wood' },
      living: { wall: 'wallpaperFloral', wallTint: 0xd8c8a0, floor: 'boards', floorTint: 0x9a7a52, ceil: 'woodPanel', ceilTint: 0xb89a72, h: 2.5, siding: 'planks', sidingTint: 0x8a2a1e, parapet: 0, trimH: 0.1, wainscot: { mat: 'woodPanel', tint: 0x6a8a9a, h: 0.9 } },
      kitchen: { wall: 'woodPanel', wallTint: 0xd8d0b0, floor: 'linoleum', floorTint: 0xa89a7a, ceil: 'woodPanel', ceilTint: 0xc8b890, h: 2.5, siding: 'planks', sidingTint: 0x8a2a1e, parapet: 0 },
      hall: { wall: 'woodPanel', wallTint: 0xb89a72, floor: 'boards', floorTint: 0x7a5a3a, ceil: 'woodPanel', ceilTint: 0xa88a62, h: 2.4, siding: 'planks', sidingTint: 0x8a2a1e, parapet: 0 },
      girls: { wall: 'wallpaperFloral', wallTint: 0xe8c8c8, floor: 'boards', floorTint: 0x9a7a52, ceil: 'woodPanel', ceilTint: 0xc8b090, h: 2.4, siding: 'planks', sidingTint: 0x8a2a1e, parapet: 0 },
      gran: { wall: 'wallpaperFloral', wallTint: 0xc8c8b0, floor: 'boards', floorTint: 0x8a6a48, ceil: 'woodPanel', ceilTint: 0xb8a080, h: 2.4, siding: 'planks', sidingTint: 0x8a2a1e, parapet: 0 },
      shed: { wall: 'planks', wallTint: 0x6a5a48, floor: 'boards', floorTint: 0x5a4a3a, ceil: 'planks', ceilTint: 0x4a3a2a, h: 2.4, siding: 'planks', sidingTint: 0x5a3a2a, parapet: 0 },
      boathouse: { wall: 'planks', wallTint: 0x7a6a58, floor: 'boards', floorTint: 0x5a5048, ceil: 'planks', ceilTint: 0x3a3028, h: 3.4, siding: 'planks', sidingTint: 0x6a2a1e, parapet: 0 },
      hut: { wall: 'planks', wallTint: 0x8a7a62, floor: 'boards', floorTint: 0x6a5a48, ceil: 'planks', ceilTint: 0x4a3a2e, h: 2.1, siding: 'planks', sidingTint: 0x7a2418, parapet: 0.1 },
    },
    regions: {
      I: { style: 'ice', tag: 'ice' }, T: { style: 'thin', tag: 'thin' }, b: { style: 'beach', tag: 'beach' }, S: { style: 'shore', tag: 'shore' },
      p: { style: 'porch', tag: 'porch' }, P: { style: 'pier', tag: 'pier' },
      L: { style: 'living', tag: 'house', zone: 1 }, K: { style: 'kitchen', tag: 'house', zone: 1 }, A: { style: 'hall', tag: 'house', zone: 1 }, G: { style: 'girls', tag: 'girls', zone: 1 }, R: { style: 'gran', tag: 'house', zone: 1 },
      W: { style: 'shed', tag: 'shed' }, B: { style: 'boathouse', tag: 'boathouse' },
      h: { style: 'hut', tag: 'hut1', zone: 2 }, j: { style: 'hut', tag: 'hut2', zone: 2 }, k: { style: 'hut', tag: 'hut3', zone: 2 }, m: { style: 'hut', tag: 'hut4', zone: 2 },
    },
    doors: {},
    get grid() { return plan(); },
    // in the living room, by the stove, the window and the lake in front of you
    spawn: [7.6, 40.4, 0],
    build(L, K) {
      const P = (t, x, y, r, o) => K.prop(t, x, y, r, o), r = K.rng;
      L.meta.zonesOn = [0, 1, 2];
      L.meta.weather = {
        sky: [0.012, 0.014, 0.02],
        dome: { zenith: [0.02, 0.024, 0.032], horizon: [0.06, 0.064, 0.072], moon: null, stars: 0, cloud: 1, silH: 0.16, silCol: [0.02, 0.022, 0.026] },
        ground: 'snow', ring: 'snowPines', ringR: [10, 80], ringN: 480, silhouette: 'shore', precip: 'snow',
      };
      // ------------------------------------------- the house: roof, chimney, and inside
      P('roofGableRed', 9.95, 42, H, { y: 2.5, sx: 18.6, sy: 4.2, sz: 24.6, fixed: true });
      P('chimney', 8.3, 40.3, 0, { y: 2.6, fixed: true });
      P('woodStove', 6.35, 39.4, H * 0.5, { col: [0.32, 0.32] });
      K.spot('heat', 6.6, 39.6, { h: 0, r: 4 });
      P('wingChair', 7.6, 40.9, PI - 0.4, { col: [0.4, 0.4] }); P('knitting', 8.15, 41.1, 0, {});
      P('rockingChair', 6.6, 41.2, -0.6, { col: [0.3, 0.45] });
      P('folkTable', 8.6, 39.5, 0, { col: [0.75, 0.4] }); P('tableRadio', 8.6, 39.45, 0, { y: 0.785 });
      P('adventStar', 7.5, 39.08, 0, { y: 1.6, fixed: true }); P('adventStar', 11.5, 39.08, 0, { y: 1.55, fixed: true });
      P('grandfatherClock', 9.85, 39.3, -H, { col: [0.2, 0.28] });
      K.light(6.7, 39.6, { kind: 'none', y: 0.5, color: [1, 0.55, 0.25], intensity: 0.32, range: 6, zone: 1, flicker: 0.3 });
      K.light(8.6, 39.5, { kind: 'lamp', y: 1.0, color: [1, 0.8, 0.55], intensity: 0.26, range: 7, zone: 1 });
      K.light(7.5, 39.1, { kind: 'none', y: 1.6, color: [1, 0.75, 0.4], intensity: 0.2, range: 5, zone: 1 });
      K.light(11.5, 39.1, { kind: 'none', y: 1.55, color: [1, 0.75, 0.4], intensity: 0.18, range: 5, zone: 1 });
      // kitchen
      P('kitchenCounter', 13.6, 40.0, 0, { col: [0.38, 1.4], sz: 0.55 });
      P('folkTable', 11.5, 40.6, 0, { col: [0.75, 0.4] }); P('alpineChair', 11.0, 41.1, PI, { col: [0.2, 0.2] }); P('alpineChair', 12.0, 40.1, 0, { col: [0.2, 0.2] });
      P('cassetteRecorder', 11.8, 40.55, 0.3, { y: 0.785 });
      K.light(11.5, 40.5, { kind: 'bulb', color: [1, 0.85, 0.6], intensity: 0.22, range: 6, zone: 1 });
      // hall: the hooks, the boots, the empty peg
      P('coatHooks', 9.5, 42.03, 0, { wall: true }); P('bootRow', 9.5, 42.25, 0, {});
      K.light(10, 42.5, { kind: 'bulb', color: [1, 0.85, 0.6], intensity: 0.12, range: 5, zone: 1 });
      // the girls' room: the bunk bed, Wren's drawings over it, the little desk
      P('bunks', 6.6, 43.9, 0, { col: [0.45, 1.0] });
      P('wrenDrawings', 6.03, 43.45, H, { wall: true, y: 1.75 });
      P('desk', 8.8, 44.6, PI, { col: [0.75, 0.35] }); P('chair', 8.8, 44.2, 0, { col: [0.25, 0.25] });
      K.light(8.3, 43.8, { kind: 'lamp', y: 0.95, color: [1, 0.8, 0.6], intensity: 0.12, range: 4, zone: 1 });
      // Ingrid's room
      P('motelBed', 12.2, 43.8, -H, { col: [1.05, 0.8] }); P('wardrobe', 10.4, 44.6, PI, { col: [0.5, 0.28] });
      // ------------------------------------------- the yard
      P('woodpile', 15.4, 39.6, 0, { col: [1.0, 0.4] }); P('sledge', 12.5, 37.6, 0.6, { col: [0.25, 0.5] });
      P('mailboxPost', 14.6, 46.4, 0, { col: [0.15, 0.15] });
      for (const [x, y] of [[3, 39], [19, 44], [26, 41], [33, 45], [41, 40], [47, 44], [2, 45]]) P('birch', x, y, r.range(0, 6), { col: [0.2, 0.2], fixed: true });
      for (let k = 0; k < 26; k++) { const x = r.range(0.5, 50.5); P('reeds', x, r.range(36.1, 37.6), r.range(0, 6), {}); }
      for (const [x, y] of [[4, 37.5], [20, 37.2], [30, 37.6], [44, 37.3], [38, 39], [28, 44]]) P('snowPile', x, y, r.range(0, 6), { col: [0.9, 0.7], sx: r.range(0.8, 1.6), sy: r.range(0.5, 0.9), sz: r.range(0.8, 1.6) });
      P('lampPostSnow', 12.8, 38.2, 0, { col: [0.12, 0.12] });
      K.light(12.8, 38.2, { kind: 'none', y: 3.4, color: [1, 0.78, 0.5], intensity: 0.3, range: 12 });
      // ------------------------------------------- the pier and the boathouse
      for (let y = 30; y <= 36; y += 1.5) for (const x of [16.05, 16.95]) P('pierPost', x, y, 0, { col: [0.1, 0.1], fixed: true });
      for (const [x, y, rr] of [[23.0, 34.6, 0.1], [24.6, 35.8, -0.15]]) P('rowBoat', x, y, rr, { col: [1.0, 0.5] });
      P('shelf', 22.05, 36.5, H, { wall: true }); P('crateStack', 25.4, 36.6, 0.2, { col: [0.55, 0.55] });
      K.light(23.5, 36.2, { kind: 'bulb', color: [1, 0.85, 0.6], intensity: 0.1, range: 5, broken: true });
      // ------------------------------------------- the huts
      const huts = [[30, 14], [34, 16], [31, 19], [37, 13]];
      huts.forEach(([x, y], k) => {
        P('roofShed', x + 0.5, y + 0.5, k * 0.3, { y: 2.1, sx: 3.4, sy: 0.5, sz: 3.4, fixed: true });
        P('hutSkids', x + 0.5, y + 0.5, 0, { fixed: true });
        P('hutStove', x + 0.25, y + 0.3, 0, { col: [0.2, 0.2] });
        P('hutBench', x + 0.5, y + 0.8, 0, { col: [0.8, 0.18] });
        P('iceHole', x + 0.6, y + 0.4, 0, { fixed: true });
        K.light(x + 0.5, y + 0.5, { kind: 'none', y: 1.7, color: [1, 0.7, 0.4], intensity: 0.16, range: 4, zone: 2, flicker: 0.25 });
      });
      P('iceAuger', 30.85, 14.25, 0.4, {}); P('fishingRod', 34.7, 16.5, 0.6, {}); P('transistor', 34.3, 16.75, 0.2, { y: 0.45 }); P('fishingRod', 31.4, 19.6, 1.1, {});
      for (const [x, y] of [[29.5, 15.2], [33.2, 17.4], [32.4, 20.1], [38.0, 14.1]]) P(r() < 0.5 ? 'litterCup' : 'popcornBox', x, y, r.range(0, 6), {});
      // ------------------------------------------- the church tower in the ice; the thin ice
      P('iceSpire', 24.5, 6.5, 0.3, { fixed: true }); K.prop('collider', 24.5, 6.5, 0, { col: [1.8, 1.8] });
      for (const [x0, y, x1] of CHANNEL) for (let x = x0; x <= x1; x++) if (r() < 0.45) K.decal('crack', x + r.range(0.1, 0.9), y + r.range(0.1, 0.9), { size: r.range(1.4, 3.0), rot: r.range(0, 6) });
      for (const [x, y] of [[13.6, 21.4], [9.4, 9.2], [7.2, 3.7]]) K.decal('oil', x, y, { size: 2.2, rot: x });
      // ------------------------------------------- spots
      K.spot('radio', 8.6, 39.45, { h: 1.0 });
      K.spot('granNote', 11.4, 40.7, { h: 0.785 });
      K.spot('tape', 11.8, 40.55, { h: 0.86 });
      K.spot('wrenNote', 7.5, 42.03, { h: 1.3 });
      K.spot('diary', 6.6, 43.95, { h: 0.6 });
      K.spot('search', 25.4, 36.6, { h: 1.42 });
      K.spot('hutNote', 34.5, 16.8, { h: 0.45 });
      K.spot('hutHole', 34.6, 16.4, { h: 0.1 });
      K.spot('thin', 13.6, 21.6, { h: 0.0 });
      K.spot('wrenStand', 13.4, 21.1, { h: 0 });
      for (const [x, y, h] of [[8.6, 39.7, 0.785], [11.6, 40.4, 0.785], [8.8, 44.6, 0.78], [16.6, 41.6, 0], [23.5, 36.4, 0], [30.6, 14.7, 0.45], [31.5, 19.3, 0.45], [37.4, 13.6, 0.45]]) K.spot('sup', x, y, { h });
      // ------------------------------------------- creatures
      K.lair('hush', 20, 18);
      for (const [x, y] of [[7.5, 3.5], [9.5, 8.5], [11.5, 13.5], [14, 18.5]]) K.lair('underice', x, y);
      for (const [x, y] of [[30.5, 15.3], [33.5, 16.5], [32, 18.7]]) K.lair('laugher', x, y);
      K.room('huts', 28, 11, 40, 22);
      K.trigger('huts', 28, 11, 40, 22); K.trigger('hut2', 34, 16, 34, 16); K.trigger('house', 6, 38, 13, 44);
      K.trigger('thinEnd', 12, 19, 16, 23); K.trigger('ice', 0, 0, 51, 35); K.trigger('pier', 16, 30, 16, 35);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
