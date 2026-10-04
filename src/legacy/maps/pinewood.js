/* Chapter 3 map: Pinewood Drive-In, a clearing in a spruce forest, Friday 22 August 1975, a little
   after eleven at night, the last night of the season. The screen at the north end with the playground
   under it, five rows of cars and speaker posts on the gravel field, the concession building (snack bar,
   the projection booth with its ports toward the screen, the store room with the generator, the
   manager's office), the toilets block at the edge of the trees, the entrance road with the ticket
   kiosk, the marquee and the chained gate, and the forest all round with a path behind the toilets to
   the hunters' tree stand. 34 x 30 cells of 3 m. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const MAPS = PB.Maps || (PB.Maps = {});
  const H = Math.PI / 2, PI = Math.PI;
  const MapDraw = (...a) => PB.Authored.MapDraw(...a);

  // the path Mikkel took: from the toilets' back door into the trees, north-west to the tree stand
  const PATH = [[2, 21], [2, 20], [1, 19], [1, 18], [1, 17], [2, 16], [2, 15], [2, 14], [3, 13], [3, 12], [2, 11]];

  function plan() {
    const D = MapDraw(34, 30);
    D.fill(0, 0, 33, 29, 'T');                               // forest everywhere first
    D.fill(6, 2, 27, 19, 'g');                               // the gravel field
    D.fill(10, 2, 23, 3, 'y');                               // grass and playground under the screen
    D.fill(11, 0, 22, 0, ' ');                               // nothing behind the screen
    D.fill(12, 1, 21, 1, 'X');                               // the screen's footing
    // concession building: store room, booth, office along the north; the snack bar behind them
    D.fill(11, 20, 22, 23, 'g');
    D.fill(13, 20, 15, 20, 'G').fill(16, 20, 17, 20, 'B').fill(18, 20, 20, 20, 'O');
    D.fill(13, 21, 20, 22, 'N');
    // toilets block at the edge of the trees, a gravel walk to it
    D.fill(3, 19, 5, 19, 'g');
    D.fill(3, 20, 4, 22, 'M').fill(5, 20, 6, 22, 'F');
    // the entrance road, verges, the kiosk
    D.fill(24, 19, 25, 29, 'r');
    D.fill(22, 24, 23, 29, 'v').fill(26, 23, 27, 29, 'v');
    D.fill(26, 24, 26, 24, 'K');
    // the path and the clearing round the tree stand
    for (const [x, y] of PATH) D.set(x, y, 'p');
    D.fill(1, 7, 4, 10, 'c');
    D.join('T', 'g', 'y', 'r', 'p', 'c', 'v', 'X');
    // doors and windows
    D.edge(14, 20, 2, 'd');                                  // snack bar → store room
    D.edge(17, 20, 2, 'P');                                  // snack bar → booth
    D.edge(19, 20, 2, 'd');                                  // snack bar → office
    D.edge(13, 20, 3, 'm');                                  // store room back door
    D.hline(20, 16, 17, 'w').edge(19, 20, 0, 'w');           // projection ports, office window
    D.edge(15, 22, 2, 'g').edge(18, 22, 2, 'g');             // snack bar front doors (south, to the road side)
    D.edge(13, 21, 3, 'm').edge(20, 21, 1, 'm');             // side doors
    for (const x of [14, 16, 17, 19]) D.edge(x, 22, 2, 'w');
    D.edge(4, 20, 0, 'd').edge(5, 20, 0, 'd');               // toilets, from the field
    D.edge(3, 21, 3, 'd');                                   // the men's back door, to the trees
    D.edge(26, 24, 3, 'w').edge(26, 24, 1, 'd');             // kiosk window to the road, door behind
    // the map's edge: an invisible barrier everywhere the outdoors meets the border (the forest goes on)
    D.border('TgyrpcvX', 'i');
    return D.grid();
  }

  MAPS.pinewood = {
    ceil: 3,
    allowIslands: false,
    styles: {
      field: { outdoor: true, floor: 'gravel', floorTint: 0x8a867c, wall: 'cinderblock', h: 8, step: 'gravel' },
      grass: { outdoor: true, floor: 'grass', floorTint: 0x6a7258, wall: 'cinderblock', h: 8, step: 'grass' },
      forest: { outdoor: true, floor: 'forestFloor', wall: 'cinderblock', h: 9, step: 'leaves' },
      road: { outdoor: true, floor: 'asphalt', floorTint: 0x7a7a76, wall: 'cinderblock', h: 8, step: 'concrete' },
      snack: { wall: 'cinderblock', wallTint: 0xd8ccae, floor: 'linoleum', floorTint: 0x8a3a30, ceil: 'ceiling', ceilTint: 0xb0aa98, h: 2.8, siding: 'cinderblock', sidingTint: 0xc8bea4, wainscot: { mat: 'subway', tint: 0x8a2a24, h: 1.0 }, trimH: 0 },
      booth: { wall: 'woodPanel', wallTint: 0x8a7a64, floor: 'boards', floorTint: 0x6a5a4a, ceil: 'woodPanel', ceilTint: 0x6a5a4a, h: 2.5, siding: 'cinderblock', sidingTint: 0xc8bea4, trimH: 0.1 },
      store: { wall: 'cinderblock', wallTint: 0xa8a294, floor: 'concreteFloor', ceil: 'concreteWall', ceilTint: 0x8a8a84, h: 2.6, siding: 'cinderblock', sidingTint: 0xc8bea4 },
      office: { wall: 'woodPanel', wallTint: 0xb09a7a, floor: 'linoleum', floorTint: 0x6a5a4a, ceil: 'ceiling', h: 2.6, siding: 'cinderblock', sidingTint: 0xc8bea4, trimH: 0.1 },
      toilets: { wall: 'tile', wallTint: 0xc8d0c8, floor: 'hexTile', floorTint: 0xb8b8b0, ceil: 'ceiling', ceilTint: 0x9a9a92, h: 2.6, siding: 'cinderblock', sidingTint: 0xb8ae98, wainscot: { mat: 'subway', tint: 0x3a5a4a, h: 1.3 } },
      kiosk: { wall: 'planks', wallTint: 0x9a7a5a, floor: 'boards', ceil: 'planks', ceilTint: 0x7a6a5a, h: 2.5, siding: 'siding', sidingTint: 0xd8d0b8, trimH: 0.08 },
    },
    regions: {
      T: { style: 'forest', tag: 'forest' }, g: { style: 'field', tag: 'field' }, y: { style: 'grass', tag: 'playground' }, X: { style: 'grass', solid: 'rack' },
      r: { style: 'road', tag: 'road' }, v: { style: 'grass', tag: 'verge' }, p: { style: 'forest', tag: 'path' }, c: { style: 'forest', tag: 'clearing' },
      G: { style: 'store', tag: 'store', zone: 2 }, B: { style: 'booth', tag: 'booth', zone: 3 }, O: { style: 'office', tag: 'office', zone: 2 }, N: { style: 'snack', tag: 'snack', zone: 1 },
      M: { style: 'toilets', tag: 'toilets', zone: 1 }, F: { style: 'toilets', tag: 'toiletsW' }, K: { style: 'kiosk', tag: 'kiosk' },
    },
    doors: {
      P: { id: 'boothDoor', kind: 'wood' },
    },
    get grid() { return plan(); },
    // on the entrance road inside the gate, facing up the road toward the field and the screen
    spawn: [24.9, 28.2, 0],
    build(L, K) {
      const P = (t, x, y, r, o) => K.prop(t, x, y, r, o), r = K.rng;
      L.meta.zonesOn = [0, 1, 2, 3, 4];
      L.meta.weather = {
        sky: [0.0042, 0.0048, 0.0062],
        dome: { zenith: [0.004, 0.005, 0.008], horizon: [0.016, 0.018, 0.024], moon: [-0.5, 0.32, -0.8], moonK: 0.3, stars: 0.5, cloud: 0.65, silH: 0.16 },
        ground: 'forestFloor', ring: 'pines', ringR: [5, 80], ringN: 640, silhouette: 'pines',
      };
      // ------------------------------------------- the screen and the playground
      P('driveInScreen', 17, 1.75, 0, { col: [14.2, 0.5] });
      P('swingFrame', 14.5, 2.7, 0, { col: [0.1, 1.0] });
      P('picnicTable', 19.5, 2.8, 0.15, { col: [0.95, 0.75] });
      P('picnicTable', 21.8, 3.0, -0.2, { col: [0.95, 0.75] });
      // the light of the film on the field (cold, flickering), and what spills under the screen
      K.light(17, 4.0, { kind: 'none', y: 9, color: [0.72, 0.78, 0.9], intensity: 0.42, range: 42, flicker: 0.12, zone: 4 });
      K.light(17, 11, { kind: 'none', y: 10, color: [0.6, 0.66, 0.8], intensity: 0.18, range: 28, flicker: 0.12, zone: 4 });
      // ------------------------------------------- the field: five rows of posts, cars where people left them
      const rows = [5, 8, 11, 14, 17];
      rows.forEach((y, ri) => {
        for (let x = 7.2; x <= 26.6; x += 1.6) P('speakerPost', x, y + 0.15, 0, { col: [0.12, 0.12] });
      });
      // cars: [row index, x, type, colour] — facing the screen; row 5 is the back row (y 17)
      // cars park between the posts (posts every 1.6 cells from 7.2, so the bays are at 8.0 + 1.6k)
      const cars = [
        [0, 9.6, 'sedan', 0x2a3a2a], [0, 12.8, 'wagon', 0x6a5238], [0, 20.8, 'sedan', 0x8a1a1a], [0, 24.0, 'pickup', 0x3a4a5a],
        [1, 8.0, 'sedan', 0xb8ad90], [1, 16.0, 'van', 0xd8d4c8], [1, 22.4, 'sedan', 0x1d2a3a],
        [2, 11.2, 'wagon', 0x2a3a5a], [2, 14.4, 'sedan', 0x5a1418], [2, 19.2, 'sedan', 0x4a4e52], [2, 25.6, 'sedan', 0x7a6a3a],
        [3, 9.6, 'pickup', 0x5a4030], [3, 17.6, 'sedan', 0x283828], [3, 22.4, 'wagon', 0x8a8a84],
        [4, 8.0, 'sedan', 0x3a2a3a], [4, 20.8, 'sedan', 0x6a6a5a], [4, 25.6, 'van', 0x5a1a14],
      ];
      cars.forEach(([ri, x, type, color], k) => K.vehicle(x, rows[ri] + 0.15, H + r.range(-0.04, 0.04), { type, color, key: 'pc' + k, plate: 'NL ' + (4100 + k * 53), rust: 0.15 + (k % 5) * 0.12 }));
      // the Strands' wagon behind row five, pulled out and turned so its headlights point at the trees
      // behind the toilets, where the boy went (the father left them on all night)
      K.vehicle(14.4, 18.25, PI + 0.34, { type: 'wagon', color: 0x3a4a2e, key: 'strand', plate: 'NL 2208', rust: 0.25 });
      // window speakers left hanging on the driver's windows of a few cars
      for (const [x, y] of [[9.29, 5.1], [15.69, 8.1], [14.09, 11.1], [20.49, 17.1]]) P('windowSpeaker', x, y, -H, { y: 1.15 });
      // yard lights on poles: one by the snack bar works, the toilets' one stutters, the rest are dark
      P('yardLight', 12.2, 19.55, 0, { col: [0.2, 0.2] }); K.light(12.2, 19.85, { kind: 'none', y: 6.8, color: [1, 0.82, 0.55], intensity: 0.5, range: 13 });
      P('yardLight', 6.6, 19.55, PI, { col: [0.2, 0.2] }); K.light(6.6, 19.25, { kind: 'none', y: 6.8, color: [1, 0.85, 0.6], intensity: 0.35, range: 11, flicker: 0.6 });
      P('yardLight', 27.5, 23.4, -H, { col: [0.2, 0.2] }); K.light(27.2, 23.4, { kind: 'none', y: 6.8, color: [1, 0.85, 0.6], intensity: 0.4, range: 12, broken: true });
      P('yardLight', 21.6, 8.5, H, { col: [0.2, 0.2] });
      P('yardLight', 6.0, 11.5, -H, { col: [0.2, 0.2] });
      P('trashCan', 12.6, 19.2, 0, { col: [0.25, 0.25] }); P('trashCan', 21.4, 19.3, 0, { col: [0.25, 0.25] });
      P('picnicTable', 11.6, 22.6, H, { col: [0.75, 0.95] });
      // ------------------------------------------- concession building
      // snack bar: the counter runs east-west with the kitchen side to the north
      P('concessionCounter', 16.5, 21.55, 0, { col: [1.5, 0.36] });
      P('popcornMachine', 15.4, 21.25, 0, { col: [0.36, 0.3] });
      P('sodaFountain', 18.6, 21.2, 0, { col: [0.3, 0.3], y: 0 });
      P('hotdogRoller', 16.9, 21.55, 0, { y: 0.97 });
      P('menuBoard', 16.5, 21.04, 0, { wall: true, y: 1.95 });
      P('cafTable', 14.4, 22.4, 0, { col: [1.2, 0.45] }); P('cafTable', 18.6, 22.4, 0, { col: [1.2, 0.45] });
      P('trashCan', 13.25, 22.75, 0, { col: [0.25, 0.25] });
      for (const [x, y] of [[14.2, 22.3], [17.6, 21.9], [19.5, 22.6]]) K.decal('stain', x, y, { size: 0.9, rot: x });
      K.light(15, 21.9, { kind: 'panel', color: [1, 0.95, 0.85], intensity: 0.42, range: 7, zone: 1, flicker: 0.3 });
      K.light(18.5, 21.9, { kind: 'panel', color: [1, 0.95, 0.85], intensity: 0.42, range: 7, zone: 1, broken: true });
      // the projection booth: projector at the port, rewind bench, reel cans, Lyle's cot
      P('projector', 16.5, 20.3, PI, { col: [0.36, 0.45] });
      P('rewindBench', 16.55, 20.87, 0, { col: [0.76, 0.3] });
      P('reelRack', 16.0, 20.45, H, { wall: true, y: 0.6 });
      P('reelCanStack', 17.85, 20.35, 0.3, { y: 0 });
      P('cot', 17.4, 20.15, 0, { col: [0.98, 0.35] });
      P('whisky', 17.85, 20.75, 0.5, { y: 0 });
      K.light(17.4, 20.5, { kind: 'cage', color: [1, 0.78, 0.5], intensity: 0.32, range: 5, zone: 3, flicker: 0.1 });
      K.light(16.7, 20.1, { kind: 'none', y: 1.3, color: [1, 0.96, 0.88], intensity: 0.4, range: 3.5, zone: 3 });
      // store room: the generator, shelves, the jerrycan
      P('generator', 14.6, 20.42, 0, { col: [0.46, 0.3] });
      P('shelf', 15.7, 20.3, -H, { col: [0.25, 0.5] });
      P('boxes', 15.5, 20.8, 0.4, { col: [0.36, 0.32] });
      K.light(14.2, 20.5, { kind: 'bulb', color: [1, 0.8, 0.5], intensity: 0.25, range: 4, zone: 2, broken: true });
      // office: desk, safe, filing cabinet
      P('desk', 18.7, 20.3, PI, { col: [0.75, 0.35] }); P('chair', 18.7, 20.72, 0, { col: [0.25, 0.25] });
      P('filing', 20.75, 20.3, PI, { col: [0.3, 0.33] }); P('safe', 20.6, 20.78, -H, { col: [0.4, 0.37] });
      K.light(18.7, 20.4, { kind: 'lamp', y: 0.95, color: [1, 0.75, 0.45], intensity: 0.2, range: 3, zone: 2 });
      // ------------------------------------------- toilets
      P('restroomSign', 5.0, 19.97, PI, { wall: true, y: 2.2 });
      // stalls along the south walls, sinks under mirrors on the north walls, urinals on the partition
      P('stalls', 4.0, 22.74, PI, { col: [1.4, 0.75] });
      P('sink', 3.5, 20.09, 0, {}); P('mirror', 3.5, 20.0, 0, { wall: true, y: 1.5 });
      P('urinal', 4.99, 21.15, -H, { wall: true }); P('urinal', 4.99, 21.65, -H, { wall: true });
      K.light(4, 21, { kind: 'bulb', color: [0.95, 1, 0.92], intensity: 0.16, range: 5, zone: 1, flicker: 0.7 });
      // years of damp: grime up from the floor, mould in the corners, a crack over the back door
      for (const [x, y] of [[3.3, 21.5], [4.6, 22.6], [5.6, 21.2], [6.5, 22.5]]) K.decal('grime', x, y, { size: 1.6, rot: x });
      K.decal('stain', 3.6, 20.4, { size: 0.7 });
      K.wallDecal('mold', 3, 22, 3, { y: 2.1, size: 1.2 }); K.wallDecal('damp', 4, 22, 2, { y: 0.6, size: 1.6 }); K.wallDecal('crack', 3, 21, 3, { y: 2.2, size: 0.9 });
      K.wallDecal('damp', 6, 22, 2, { y: 0.5, size: 1.8 }); K.wallDecal('mold', 6, 20, 1, { y: 2.2, size: 1.0 });
      P('stalls', 6.0, 22.74, PI, { col: [1.4, 0.75] });
      P('sink', 6.5, 20.09, 0, {}); P('mirror', 6.5, 20.0, 0, { wall: true, y: 1.5 });
      // ------------------------------------------- the road, kiosk, marquee, gate
      P('marqueeSign', 22.9, 26.0, 0.15, { col: [2.9, 0.4] });
      K.light(22.9, 26.4, { kind: 'none', y: 4.5, color: [1, 0.85, 0.55], intensity: 0.22, range: 8, flicker: 0.4 });
      P('gatePosts', 25.0, 29.92, 0, {});
      K.spot('gate', 25.0, 29.92, { h: 0 });
      P('admitSign', 25.98, 24.5, -H, { wall: true, y: 1.9 });
      P('counterTop', 26.15, 24.5, H, { col: [0.45, 1.45] });
      P('ticketMachine', 26.22, 24.3, H, { y: 0.905 });
      P('lostBox', 26.7, 24.75, 0.2, { y: 0 });
      P('chair', 26.6, 24.3, -H, { col: [0.22, 0.22] });
      // ------------------------------------------- the forest
      // trees everywhere the plan says forest, never on the path or in the clearing; stumps, logs, rocks
      const kinds = ['pine', 'pine2', 'pine3'];
      for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
        const i = L.i(x, y);
        if (L.solid[i]) continue;
        const st = L.styles[L.styleOf[i]];
        if (!st || st.name !== 'forest') continue;
        const room = (L.meta.rooms || {});
        const inRoom = tag => { const rm = room[tag]; return rm && x >= rm.x0 && x <= rm.x1 && y >= rm.y0 && y <= rm.y1; };
        if (PATH.some(([px, py]) => px === x && py === y) || inRoom('clearing')) continue;
        const n = r() < 0.35 ? 2 : 1;
        for (let k = 0; k < n; k++) {
          if (r() < 0.25) continue;
          const tx = x + r.range(0.2, 0.8), ty = y + r.range(0.2, 0.8), s = r.range(0.8, 1.25), kind = kinds[r.int(0, 2)], rot = r.range(0, 6.28), sy = s * r.range(0.9, 1.2);
          // never through a sign, a light pole, a table or another trunk
          if (!K.clear(tx, ty, 1.6 * s, 1.1)) continue;
          P(kind, tx, ty, rot, { col: [0.4 * s, 0.4 * s], sx: s, sy, sz: s });
        }
        const q = r(), ox = r.range(0.3, 0.7), oy = r.range(0.3, 0.7), rot = r.range(0, 6), pick = r(), sc = [r.range(0.8, 1.3), r.range(0.8, 1.2), r.range(0.8, 1.3)];
        if (q < 0.06) { if (K.clear(x + 0.5, y + 0.5, 0.6, 0.7)) P('stump', x + 0.5, y + 0.5, rot, { col: [0.3, 0.3] }); }
        else if (q < 0.1) { if (K.clear(x + 0.5, y + 0.5, 1.4, 1.6)) P('fallenLog', x + 0.5, y + 0.5, rot, {}); }
        else if (q < 0.15) { if (K.clear(x + ox, y + oy, 0.8, 0.9)) P(pick < 0.5 ? 'rockA' : 'rockB', x + ox, y + oy, rot, { col: [0.5, 0.5] }); }
        else if (q < 0.45) { if (K.clear(x + ox, y + oy, 0.5, 0.3)) P(pick < 0.7 ? 'fern' : 'fern2', x + ox, y + oy, rot, { sx: sc[0], sy: sc[1], sz: sc[2] }); }
      }
      // the clearing: the tree stand, the boy's torch in the leaves
      P('treeStand', 2.5, 8.2, 0.2, { col: [1.1, 1.1] });
      P('stump', 3.8, 9.6, 0, { col: [0.3, 0.3] }); P('fallenLog', 1.6, 10.3, 0.4, {});
      P('flashlight', 3.3, 9.25, 2.2, { y: 0.03 });
      // ------------------------------------------- spots
      K.spot('stub', 3.45, 20.35, { h: 0.0 });
      K.spot('reelCan', 16.55, 20.84, { h: 0.925 });
      K.spot('battery', 16.95, 20.8, { h: 0 });
      K.spot('keys', 26.72, 24.76, { h: 0.33 });
      K.spot('jerrycan', 15.0, 20.25, { h: 0 });
      K.spot('tank', 14.6, 20.55, { h: 0.55 });
      K.spot('wagon', 14.44, 18.61, { h: 1.0 });
      K.spot('wiper', 14.12, 18.35, { h: 1.05 });
      K.spot('counter', 15.2, 21.62, { h: 0.97 });
      K.wallSpot('missing', 5, 19, 2, { h: 1.6, along: -0.6 });
      K.spot('statement', 18.6, 20.25, { h: 0.78 });
      K.spot('letter', 17.17, 20.15, { h: 0.47 });
      K.spot('kioskLog', 26.15, 24.75, { h: 0.93 });
      K.wallSpot('snackNote', 14, 20, 0, { h: 1.5 });
      K.spot('search', 2.95, 8.95, { h: 0.0 });
      K.spot('drawing', 3.55, 9.35, { h: 0.0 });
      K.spot('swing', 14.5, 2.7, { h: 2.45 });
      // ------------------------------------------- creatures
      for (const [x, y] of [[5.4, 6.2], [28.6, 9.4], [4.2, 15.0], [29.0, 17.2], [9.0, 24.6], [0.8, 3.6]]) K.lair('pines', x, y);
      K.lair('stag', 2.0, 12.5);
      K.lair('usher', 10.4, 9.5); K.lair('usher', 23.6, 15.5);
      K.trigger('toilets', 3, 20, 6, 22);
      K.trigger('booth', 16, 20, 17, 20);
      K.trigger('clearing', 1, 7, 4, 10);
      K.trigger('pathIn', 1, 11, 3, 21);
      K.room('forestNW', 0, 0, 5, 23);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
