/* Chapter 6 map: Gammel Ostra, a farming village at the bottom of the Ostra valley, the night of Friday
   2 October 1964. The dam gates closed at six that morning, a week earlier than the posters said; the
   village is empty, the trees cut down to stumps, the river already over its banks in the low places.
   Mud streets, the river channel and its footbridge, the white church with its tower, the school (the
   attic full of packed crates), the shop, houses and a barn, wells, and at the south end the dam wall
   with the service ladder up its face. Signe Holm's house has a lamp lit in the window. 34 x 30 cells. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const MAPS = PB.Maps || (PB.Maps = {});
  const H = Math.PI / 2, PI = Math.PI;
  const MapDraw = (...a) => PB.Authored.MapDraw(...a);

  function plan() {
    const D = MapDraw(34, 28);
    D.fill(0, 0, 28, 26, 'm');                               // mud streets and yards
    // gardens and paddocks
    for (const [x0, y0, x1, y1] of [[0, 6, 2, 8], [8, 8, 12, 10], [17, 9, 19, 15], [25, 16, 28, 17], [0, 14, 3, 17], [22, 22, 27, 24], [8, 14, 13, 15]]) D.fill(x0, y0, x1, y1, 'g');
    D.fill(15, 0, 16, 25, 'W');                              // the river, already over its banks
    D.fill(15, 12, 16, 12, 'b');                             // footbridge
    D.fill(1, 17, 12, 17, 'd');                              // ditch along the lower street
    D.fill(0, 26, 28, 26, 'A');                              // the apron at the foot of the dam
    // ------------------------------------------------ buildings
    D.fill(20, 2, 23, 7, 'C');                               // church nave (altar at the north end)
    D.fill(21, 8, 21, 8, 'T');                               // under the tower: the church porch
    D.fill(24, 3, 24, 4, 'v');                               // vestry
    D.fill(24, 11, 28, 14, 'S');                             // school
    D.fill(4, 9, 7, 11, 'H');                                // Signe's house: the main room
    D.fill(4, 12, 5, 13, 'e'); D.fill(6, 12, 7, 13, 'k');    // her bedroom, her kitchen
    D.fill(3, 2, 6, 4, 'p');                                 // an emptied house
    D.fill(9, 2, 12, 4, 'q');                                // the shop
    D.fill(9, 19, 12, 21, 'r');                              // a house by the ditch
    D.fill(2, 19, 6, 22, 'B');                               // barn
    D.fill(20, 18, 23, 20, 's');                             // a house across the river
    D.fill(18, 23, 19, 24, 'G');                             // the dam keeper's hut
    // ------------------------------------------------ the school attic (up the stairs)
    D.fill(30, 1, 33, 4, 'a');
    D.join('m', 'g', 'W', 'b', 'd', 'A');
    D.border('mgWbdA', 'i');
    // the river's edges stay open (it is over its banks); the bridge has rails over the water
    D.hline(12, 15, 16, 'r').hline(13, 15, 16, 'r');
    D.hline(26, 15, 16, 'l');                                // the river ends at the dam's sluice wall
    // doors and windows
    D.edge(21, 8, 2, 'd').edge(21, 8, 0, ' ');               // church porch
    D.edge(24, 3, 3, 'd');                                   // vestry
    for (const y of [3, 5, 6]) D.edge(20, y, 3, 'w');
    for (const y of [5, 6]) D.edge(23, y, 1, 'w');
    D.edge(24, 12, 3, 'd');                                  // school door
    for (const x of [25, 27]) D.edge(x, 14, 2, 'w');
    D.edge(28, 12, 1, 'w').edge(26, 11, 0, 'w');
    D.edge(7, 10, 1, 'S');                                   // Signe's front door (locked)
    D.edge(7, 9, 1, 'w').edge(5, 9, 0, 'w').edge(4, 10, 3, 'w');
    D.edge(4, 12, 0, 'd').edge(6, 12, 0, ' ').edge(5, 13, 1, 'd');
    D.edge(4, 4, 2, 'd').edge(6, 3, 1, 'w');                 // emptied house
    D.edge(10, 4, 2, 'd').edge(11, 4, 2, 'w').edge(9, 3, 3, 'w');   // shop
    D.edge(10, 19, 0, 'd').edge(12, 20, 1, 'w');             // house by the ditch
    D.edge(6, 20, 1, 'B');                                   // barn doors
    D.edge(21, 18, 0, 'd').edge(23, 19, 1, 'w');             // house across the river
    D.edge(18, 23, 3, 'd').edge(19, 23, 0, 'w');             // dam keeper's hut
    return D.grid();
  }

  MAPS.village = {
    ceil: 3,
    allowIslands: false,
    styles: {
      mud: { outdoor: true, floor: 'mud', floorTint: 0x5a4a3a, wall: 'logWall', h: 9, step: 'mud' },
      garden: { outdoor: true, floor: 'grass', floorTint: 0x5a5a3a, wall: 'logWall', h: 9, step: 'grass' },
      river: { outdoor: true, floor: 'mud', wall: 'logWall', h: 9, bed: 'mud', murky: true, depth: 1.3, step: 'water' },
      ditch: { outdoor: true, floor: 'mud', wall: 'logWall', h: 9, bed: 'mud', murky: true, depth: 0.45, step: 'water' },
      bridge: { outdoor: true, floor: 'boards', floorTint: 0x5a4a3a, wall: 'logWall', h: 9, step: 'wood', rail: 'wood' },
      apron: { outdoor: true, floor: 'concreteFloor', floorTint: 0x6a6a64, wall: 'concreteWall', h: 9, step: 'concrete', wallH: 0.9 },
      church: { wall: 'planks', wallTint: 0xd8d4c8, floor: 'boards', floorTint: 0x7a5a40, ceil: 'woodPanel', ceilTint: 0x6a5a48, h: 7.0, siding: 'planks', sidingTint: 0xe0dcd0, parapet: 0, trimH: 0.12 },
      vestry: { wall: 'woodPanel', wallTint: 0x9a7a5a, floor: 'boards', ceil: 'woodPanel', ceilTint: 0x6a5a48, h: 2.6, siding: 'planks', sidingTint: 0xe0dcd0, parapet: 0 },
      school: { wall: 'woodPanel', wallTint: 0xb8a078, floor: 'boards', floorTint: 0x8a6a48, ceil: 'plaster', ceilTint: 0xb0a890, h: 3.2, siding: 'planks', sidingTint: 0x8a3020, parapet: 0, wainscot: { mat: 'woodPanel', tint: 0x5a6a4a, h: 1.0 } },
      attic: { wall: 'planks', wallTint: 0x7a6a52, floor: 'boards', floorTint: 0x6a5a48, ceil: 'planks', ceilTint: 0x5a4a3a, h: 2.4 },
      signe: { wall: 'wallpaperFloral', wallTint: 0xc8b890, floor: 'boards', floorTint: 0x8a6a48, ceil: 'woodPanel', ceilTint: 0x7a6248, h: 2.6, siding: 'logWall', sidingTint: 0xa86a4a, parapet: 0, wainscot: { mat: 'woodPanel', tint: 0x4a6a7a, h: 1.0 } },
      house: { wall: 'wallpaperFloral', wallTint: 0xa8a080, floor: 'boards', floorTint: 0x7a6248, ceil: 'woodPanel', ceilTint: 0x6a5a48, h: 2.6, siding: 'logWall', sidingTint: 0x8a6a4a, parapet: 0, wainscot: { mat: 'woodPanel', h: 0.9 } },
      shop: { wall: 'woodPanel', wallTint: 0xb8a888, floor: 'boards', floorTint: 0x6a5a48, ceil: 'woodPanel', ceilTint: 0x6a5a48, h: 2.8, siding: 'planks', sidingTint: 0xd8c890, parapet: 0 },
      barn: { wall: 'planks', wallTint: 0x7a3a2a, floor: 'boards', floorTint: 0x5a4a38, ceil: 'planks', ceilTint: 0x4a3a2a, h: 5.0, siding: 'planks', sidingTint: 0x7a2a1e, parapet: 0 },
      hut: { wall: 'woodPanel', wallTint: 0x9a8a6a, floor: 'boards', ceil: 'planks', ceilTint: 0x6a5a48, h: 2.5, siding: 'corrugated', sidingTint: 0x6a6a64, parapet: 0 },
    },
    regions: {
      m: { style: 'mud', tag: 'street' }, g: { style: 'garden', tag: 'garden' }, W: { style: 'river', tag: 'river', water: true }, b: { style: 'bridge', tag: 'bridge' },
      d: { style: 'ditch', tag: 'ditch', water: true }, A: { style: 'apron', tag: 'apron' },
      C: { style: 'church', tag: 'church', zone: 1 }, T: { style: 'church', tag: 'porch', zone: 1 }, v: { style: 'vestry', tag: 'vestry' },
      S: { style: 'school', tag: 'school' }, a: { style: 'attic', tag: 'attic' },
      H: { style: 'signe', tag: 'signe', zone: 2 }, e: { style: 'signe', tag: 'signeBed', zone: 2 }, k: { style: 'signe', tag: 'signeKitchen', zone: 2 },
      p: { style: 'house', tag: 'house1' }, q: { style: 'shop', tag: 'shop' }, r: { style: 'house', tag: 'house3' }, B: { style: 'barn', tag: 'barn' }, s: { style: 'house', tag: 'house5' }, G: { style: 'hut', tag: 'hut' },
    },
    doors: {
      S: { id: 'signeDoor', kind: 'wood', locked: true, nameKey: 'door.signe', lockKey: 'lock.signe' },
      B: { id: 'barnDoor', kind: 'wood' },
    },
    get grid() { return plan(); },
    // where the valley road comes down to the village, the dam a pale wall far off to the south
    spawn: [13.5, 0.8, PI],
    build(L, K) {
      const P = (t, x, y, r, o) => K.prop(t, x, y, r, o), r = K.rng;
      L.meta.zonesOn = [0, 1, 2];
      L.meta.weather = {
        sky: [0.0035, 0.004, 0.0045],
        dome: { zenith: [0.006, 0.007, 0.008], horizon: [0.022, 0.024, 0.026], moon: null, stars: 0, cloud: 1, silH: 0.3, silCol: [0.01, 0.011, 0.012] },
        ground: 'mud', ring: 'pines', ringR: [18, 80], ringN: 380, silhouette: 'valley', precip: 'rain', rainK: 0.55,
      };
      // ------------------------------------------- roofs on everything (the walls stop at the eaves)
      const roof = (x0, y0, x1, y1, hgt, along, kind = 'roofGable', pitch = 0.5) => {
        const w = (x1 - x0 + 1) * 3, d = (y1 - y0 + 1) * 3, cx = (x0 + x1 + 1) / 2, cy = (y0 + y1 + 1) / 2;
        // along: ridge along x (east-west) or along y (north-south)
        if (along === 'x') P(kind, cx, cy, 0, { y: hgt, sx: w + 0.6, sy: d * pitch * 2 * 0.5, sz: d + 0.6, fixed: true });
        else P(kind, cx, cy, H, { y: hgt, sx: d + 0.6, sy: w * pitch * 2 * 0.5, sz: w + 0.6, fixed: true });
      };
      roof(20, 2, 23, 7, 7.0, 'y', 'roofGable', 0.65);
      roof(24, 3, 24, 4, 2.6, 'y');
      roof(24, 11, 28, 14, 3.2, 'x', 'roofGableRed');
      roof(4, 9, 7, 13, 2.6, 'y');
      roof(3, 2, 6, 4, 2.6, 'x');
      roof(9, 2, 12, 4, 2.8, 'x');
      roof(9, 19, 12, 21, 2.6, 'x');
      roof(2, 19, 6, 22, 5.0, 'x', 'roofGableRed', 0.6);
      roof(20, 18, 23, 20, 2.6, 'x');
      roof(18, 23, 19, 24, 2.5, 'y');
      for (const [x, y, hh] of [[6.6, 10.3, 3.6], [4.6, 3.3, 3.6], [11.4, 20.3, 3.6], [22.5, 19.4, 3.6]]) P('chimney', x, y, 0, { y: hh - 0.6, fixed: true });
      // ------------------------------------------- the church
      P('churchTower', 21.5, 8.5, PI, { fixed: true, col: [1.6, 1.6] });
      P('altar', 21.5, 2.55, PI, { col: [0.8, 0.3] });
      P('pulpit', 23.3, 3.4, -H, { col: [0.5, 0.5] });
      P('pumpOrgan', 20.4, 2.6, PI, { col: [0.65, 0.3] });
      P('hymnBoard', 20.03, 4.2, H, { wall: true, y: 1.7 });
      for (let k = 0; k < 6; k++) for (const x of [20.75, 22.25]) P('pew', x, 4.2 + k * 0.6, 0, { col: [0.9, 0.25] });
      P('candleChandelier', 21.5, 4.5, 0, { y: 4.4, fixed: true });
      for (const [x, y] of [[21.0, 2.45], [22.0, 2.45]]) K.light(x, y, { kind: 'none', y: 1.25, color: [1, 0.7, 0.4], intensity: 0.22, range: 6, zone: 1, flicker: 0.35 });
      K.light(21.5, 4.5, { kind: 'none', y: 4.2, color: [1, 0.7, 0.4], intensity: 0.14, range: 9, zone: 1, flicker: 0.4 });
      // vestry: robes on a rail, a key board, the parish book
      P('coatStand', 24.8, 3.1, 0, { col: [0.2, 0.2] });
      P('keyBoard', 24.97, 4.5, -H, { wall: true, y: 1.5 });
      P('desk', 24.5, 3.55, -H, { col: [0.35, 0.75] });
      // ------------------------------------------- the school, and its attic
      // three rows of three, clear of the attic stairs in the corner
      for (let k = 0; k < 6; k++) P('schoolDesk', 24.9 + (k % 3) * 0.9, 12.4 + Math.floor(k / 3) * 1.1, PI, { col: [0.35, 0.3] });
      P('teacherDesk', 26.5, 11.3, 0, { col: [0.75, 0.38] });
      P('chalkboard', 26.5, 11.03, 0, { wall: true, y: 1.6 });
      P('crateStack', 28.4, 14.4, 0.2, { col: [0.55, 0.55] }); P('crateStack', 24.6, 14.4, -0.3, { col: [0.55, 0.55] });
      P('stairsUp', 27.6, 13.2, 0, { col: [0.7, 1.3] });
      K.stairs([27.5, 12.3, PI, 'pr.stairsUp'], [30.6, 3.4, 0, 'pr.stairsDown'], { sound: 'wood' });
      P('stairsDown', 30.5, 3.9, 0, { col: [0.6, 0.4] });
      for (const [x, y, rr] of [[31.6, 1.6, 0.2], [32.8, 1.8, -0.4], [32.6, 3.2, 0.1], [31.4, 2.6, 0.6]]) P('crateStack', x, y, rr, { col: [0.55, 0.55] });
      P('travelTrunk', 30.8, 1.5, 0.1, { col: [0.45, 0.28] });
      K.light(31.8, 2.4, { kind: 'bulb', color: [1, 0.85, 0.6], intensity: 0.12, range: 4, broken: true });
      // ------------------------------------------- Signe's house: the lamp in the window
      P('cornerFireplace', 4.6, 9.15, 0.6, { col: [0.6, 0.45] });
      P('rockingChair', 5.6, 10.2, 2.4, { col: [0.3, 0.45] });
      P('folkTable', 6.4, 9.7, 0, { col: [0.75, 0.4] }); P('alpineChair', 6.4, 10.2, PI, { col: [0.2, 0.2] });
      P('oilLamp', 6.6, 9.6, 0, { y: 0.785 });
      K.light(6.6, 9.6, { kind: 'none', y: 1.12, color: [1, 0.72, 0.4], intensity: 0.45, range: 9, zone: 2, flicker: 0.12 });
      P('grandfatherClock', 4.15, 11.6, H, { col: [0.2, 0.28] });
      P('woodStove', 7.6, 12.3, -H, { col: [0.3, 0.3] });
      P('kitchenCounter', 6.5, 13.7, 0, { col: [0.6, 0.3] });
      P('motelBed', 4.6, 12.8, 0, { col: [0.8, 1.05], hide: true, hideKind: 'bed', hideAt: [0, 0], hideYaw: 0 });
      P('wardrobe', 5.5, 13.7, 0, { col: [0.5, 0.28] });
      // ------------------------------------------- the other houses, emptied for the move
      P('crateStack', 4, 3, 0.3, { col: [0.55, 0.55] }); P('chair', 5.4, 3.6, 1.2, { col: [0.25, 0.25] });
      P('counter', 10.8, 3.2, 0, { col: [1.4, 0.35] }); P('shelf', 9.1, 2.6, H, { wall: true }); P('shelf', 12.9, 2.6, -H, { wall: true });
      P('folkTable', 10.6, 20.4, 0, { col: [0.75, 0.4] }); P('crateStack', 12.2, 21.4, 0, { col: [0.55, 0.55] });
      P('rowBoat', 3.9, 21.3, 0.2, { col: [2.0, 0.6] });
      for (const [x, y] of [[3, 20], [5, 19.6]]) P('pallet', x, y, r.range(0, 2), {});
      P('travelTrunk', 21.4, 19.5, 0.3, { col: [0.45, 0.28] });
      P('desk', 18.6, 23.5, H, { col: [0.35, 0.75] }); P('chair', 19.1, 23.5, -H, { col: [0.25, 0.25] });
      K.light(18.8, 23.6, { kind: 'lamp', y: 0.95, color: [1, 0.8, 0.5], intensity: 0.18, range: 4, flicker: 0.3 });
      // ------------------------------------------- the village outside
      for (const [x, y] of [[8.6, 8.3], [18.6, 16.4], [24.2, 9.5]]) P('wellStone', x, y, r.range(0, 6), { col: [0.65, 0.65], fixed: true });
      P('footbridge', 16, 12.5, 0, { fixed: true });
      for (const [x, y] of [[14.2, 10.2], [17.5, 21.2]]) P('rowBoat', x, y, r.range(-0.5, 0.5), { col: [1.0, 0.5] });
      for (const [x, y, rr] of [[2.5, 8.9, 0], [8.5, 11.3, H], [13.0, 15.9, 0], [19.5, 15.9, 0], [25.5, 15.9, 0], [3.0, 17.9, 0]]) P('stoneWall', x, y, rr, { y: -0.08, col: rr ? [0.3, 1.45] : [1.45, 0.3] });
      for (const [x, y] of [[13.5, 2.0], [8.4, 6.6], [19.6, 10.5], [13.8, 18.4], [23.6, 21.2]]) P('noticePost', x, y, r.range(-0.3, 0.3) + (x < 15 ? H : -H), { col: [0.1, 0.1] });
      P('depthGauge', 14.6, 24.6, 0, { fixed: true });
      // the trees were felled before the water: stumps everywhere, a few logs left lying
      for (let k = 0; k < 34; k++) {
        const x = r.range(0.5, 28.5), y = r.range(0.5, 25.5), c = L.cellOf(x * 3, y * 3), i = L.i(c.x, c.y);
        if (L.solid[i] || L.floorType[i] || !(L.meta.outdoor && L.meta.outdoor[i])) continue;
        P(r() < 0.85 ? 'stump' : 'fallenLog', x, y, r.range(0, 6), { col: [0.3, 0.3] });
      }
      for (const [x, y] of [[13.5, 6], [13.5, 14], [19, 8], [8, 18.5], [25, 7]]) K.decal('oil', x, y, { size: 2.2, rot: x });
      // ------------------------------------------- the dam at the south end
      P('damWall', 14.5, 27.05, PI, { fixed: true });
      P('damLadder', 12.5, 26.97, PI, { fixed: true });
      P('sluiceGear', 16.0, 26.6, PI, { fixed: true, col: [0.5, 0.5] });
      K.light(12.5, 26.4, { kind: 'none', y: 4.0, color: [0.8, 0.85, 1.0], intensity: 0.2, range: 10, flicker: 0.2 });
      // ------------------------------------------- spots
      K.spot('key', 24.95, 4.65, { h: 1.35 });
      K.spot('musicBox', 31.0, 1.45, { h: 0.78 });
      K.spot('mantel', 4.75, 9.3, { h: 1.38 });
      K.spot('ladder', 12.5, 26.6, { h: 1.2 });
      K.spot('torLetter', 6.3, 9.7, { h: 0.785 });
      K.spot('diary', 18.6, 23.4, { h: 0.78 });
      K.spot('ingrid', 32.6, 3.2, { h: 1.42 });
      K.spot('removal', 26.4, 11.3, { h: 0.78 });
      K.spot('parish', 24.5, 3.6, { h: 0.78 });
      K.spot('notice', 13.5, 2.0, { h: 1.6 });
      K.spot('hymns', 21.0, 4.2, { h: 0.5 });
      K.spot('drawing', 4.6, 12.8, { h: 0.6 });
      K.spot('shop', 10.6, 3.2, { h: 1.0 });
      // ------------------------------------------- creatures
      for (const [x, y] of [[13.5, 4.5], [8.5, 12.5], [13.5, 19.5], [19.5, 12.5], [22.5, 15.5], [7.5, 24.5], [24.5, 24.5], [10.5, 7.5]]) K.lair('silted', x, y);
      for (const [x, y] of [[8.6, 8.3], [18.6, 16.4], [24.2, 9.5], [6.5, 17.5], [15.5, 7.5], [15.5, 20.5]]) K.lair('longone', x, y);
      for (const [x, y] of [[20.9, 3.6], [21.5, 3.4], [22.1, 3.6], [20.6, 3.0], [22.4, 3.0]]) K.lair('choir', x, y, { yaw: PI });
      K.room('churchZone', 20, 2, 24, 8);
      K.trigger('church', 20, 2, 23, 8); K.trigger('school', 24, 11, 28, 14); K.trigger('attic', 30, 1, 33, 4); K.trigger('signe', 4, 9, 7, 13); K.trigger('apron', 8, 25, 20, 26);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
