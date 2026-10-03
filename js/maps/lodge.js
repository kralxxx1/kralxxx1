/* Chapter 5 map: Berghotel Weisshorn, a mountain hotel at the top station of a cable car, the night of
   28 February 1983, in a blizzard. The fireplace hall (the fire still burning), reception with the
   telegram board and Greta Imhof's office behind it, the dining room laid for a breakfast nobody came
   down to, the kitchen and its cold room, the service corridor, the guest corridor and rooms, the ski
   room and the bar; outside, the terrace and, across sixty metres of blowing snow, the cable car
   station with the gondola in its dock and the machine room. 26 x 22 cells of 3 m. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const MAPS = PB.Maps || (PB.Maps = {});
  const H = Math.PI / 2, PI = Math.PI;
  const MapDraw = (...a) => PB.Authored.MapDraw(...a);

  function plan() {
    const D = MapDraw(26, 22);
    D.fill(0, 0, 25, 21, 'Y');                               // snow everywhere
    // ------------------------------------------------ the hotel
    D.fill(2, 2, 3, 3, '1').fill(2, 4, 3, 5, '2').fill(2, 6, 3, 7, '3').fill(2, 8, 3, 9, '4');   // guest rooms
    D.fill(4, 2, 4, 9, 'g');                                 // guest corridor
    D.fill(5, 2, 8, 3, 'B');                                 // ski room
    D.fill(5, 4, 8, 5, 'L');                                 // the bar
    D.fill(5, 6, 9, 9, 'H');                                 // fireplace hall
    D.fill(9, 2, 9, 5, 'S');                                 // service corridor
    D.fill(10, 2, 13, 4, 'K');                               // kitchen
    D.fill(12, 2, 13, 2, 'Z');                               // the cold room
    D.fill(10, 5, 13, 10, 'D');                              // dining room
    D.fill(5, 10, 7, 11, 'R');                               // reception
    D.fill(8, 10, 9, 11, 'O');                               // Greta's office
    D.fill(5, 12, 7, 12, 'V');                               // entrance porch
    // ------------------------------------------------ outside: the terrace and the station
    D.fill(14, 5, 16, 10, 'T');                              // terrace (a deck under snow)
    D.fill(20, 3, 22, 8, 'p');                               // station platform, roofed, open to the east
    D.fill(23, 3, 24, 4, 'm');                               // machine room
    D.fill(23, 5, 24, 8, 'x');                               // where the cable leaves (no floor)
    D.join('Y', 'T');
    D.border('YTp', 'i');
    // doors and windows
    for (const [x, y] of [[3, 3], [3, 5], [3, 7], [3, 9]]) D.edge(x, y, 1, 'd');           // rooms off the corridor
    D.edge(4, 7, 1, ' ').edge(4, 8, 1, ' ');                 // corridor opens into the hall
    D.edge(6, 3, 2, 'd');                                    // ski room → bar
    D.edge(5, 2, 0, 'm');                                    // ski room → outside (north)
    D.hline(6, 5, 8, ' ');                                   // bar opens onto the hall
    D.edge(9, 5, 2, 'd');                                    // service corridor → hall
    D.edge(9, 2, 0, 'm');                                    // service corridor back door
    D.edge(9, 3, 1, 'd');                                    // service corridor → kitchen
    D.edge(12, 3, 0, 'C');                                   // the cold room door
    D.edge(11, 4, 2, 'd');                                   // kitchen → dining room (swing door)
    D.vline(10, 7, 9, ' ');                                  // hall opens into the dining room
    D.hline(10, 5, 7, ' ');                                  // hall to reception
    D.edge(7, 10, 1, 'd');                                   // reception → office
    D.edge(6, 12, 0, ' ');                                   // porch into reception
    D.edge(6, 12, 2, 'E');                                   // the front door
    D.edge(13, 7, 1, 'g').edge(13, 8, 1, 'g');               // dining room → terrace, glass doors
    for (const y of [5, 6, 9, 10]) D.edge(13, y, 1, 'w');    // dining room's east windows
    for (const x of [10, 11, 12, 13]) D.edge(x, 10, 2, 'w');
    for (const y of [2, 4, 6, 8]) D.edge(2, y, 3, 'w');      // the rooms' windows
    D.edge(5, 11, 3, 'w').edge(9, 11, 1, 'w');
    // the station: open on the snowfield side, the machine room door, a gap where the cable goes out
    D.vline(20, 3, 8, ' ');
    D.edge(23, 4, 3, 'd');
    D.vline(23, 5, 8, 'r');
    return D.grid();
  }

  MAPS.lodge = {
    ceil: 3,
    allowIslands: false,
    styles: {
      snow: { outdoor: true, floor: 'snow', wall: 'logWall', h: 9, step: 'snow', siding: 'logWall' },
      deck: { outdoor: true, floor: 'boards', floorTint: 0x8a8a8a, wall: 'logWall', h: 9, step: 'snow', rail: 'wood' },
      hall: { wall: 'logWall', wallTint: 0x9a7a5a, floor: 'parquet', floorTint: 0x8a6a4a, ceil: 'woodPanel', ceilTint: 0x6a5038, h: 5.4, siding: 'logWall', trimH: 0.12 },
      bar: { wall: 'woodPanel', wallTint: 0x8a6a4a, floor: 'boards', floorTint: 0x6a4a32, ceil: 'woodPanel', ceilTint: 0x5a4030, h: 2.8, siding: 'logWall' },
      reception: { wall: 'woodPanel', wallTint: 0xa88a62, floor: 'parquet', ceil: 'woodPanel', ceilTint: 0x7a5a40, h: 3.0, siding: 'logWall', trimH: 0.12 },
      office: { wall: 'wallpaperFloral', wallTint: 0xb8a888, floor: 'boards', floorTint: 0x7a5a40, ceil: 'plaster', ceilTint: 0xb0a890, h: 2.7, siding: 'logWall', wainscot: { mat: 'woodPanel', h: 1.0 } },
      dining: { wall: 'plaster', wallTint: 0xd8d0bc, floor: 'parquet', ceil: 'woodPanel', ceilTint: 0x8a6a4a, h: 3.4, siding: 'logWall', wainscot: { mat: 'woodPanel', tint: 0x9a7a52, h: 1.1 } },
      kitchen: { wall: 'subway', wallTint: 0xe0e4dc, floor: 'tile', floorTint: 0x9a9a92, ceil: 'plaster', ceilTint: 0xb8b8b0, h: 3.0, siding: 'logWall' },
      cold: { wall: 'steelDeck', wallTint: 0xb8c0c4, floor: 'steelDeck', floorTint: 0x8a9094, ceil: 'steelDeck', ceilTint: 0xa8b0b4, h: 2.6, siding: 'logWall' },
      service: { wall: 'plaster', wallTint: 0xb8b0a0, floor: 'linoleum', floorTint: 0x6a6a5a, ceil: 'plaster', ceilTint: 0xa8a090, h: 2.7, siding: 'logWall' },
      corridor: { wall: 'wallpaperFloral', wallTint: 0xc8b898, floor: 'trainCarpet', floorTint: 0x7a3a30, ceil: 'plaster', ceilTint: 0xb8b0a0, h: 2.7, siding: 'logWall', wainscot: { mat: 'woodPanel', h: 0.9 } },
      room: { wall: 'woodPanel', wallTint: 0xb89a72, floor: 'boards', floorTint: 0x8a6a4a, ceil: 'woodPanel', ceilTint: 0x8a6a4a, h: 2.6, siding: 'logWall', trimH: 0.1 },
      skiroom: { wall: 'planks', wallTint: 0x8a7a62, floor: 'concreteFloor', floorTint: 0x7a7a72, ceil: 'planks', ceilTint: 0x6a5a4a, h: 2.8, siding: 'logWall' },
      porch: { wall: 'logWall', floor: 'boards', floorTint: 0x6a5a4a, ceil: 'planks', ceilTint: 0x5a4a3a, h: 2.8, siding: 'logWall' },
      station: { wall: 'corrugated', wallTint: 0x8a8e90, floor: 'steelDeck', floorTint: 0x7a7e80, ceil: 'corrugated', ceilTint: 0x5a5e60, h: 6.5, siding: 'corrugated', sidingTint: 0x7a8084 },
      machine: { wall: 'concreteWall', wallTint: 0x9a9a90, floor: 'concreteFloor', ceil: 'concreteWall', ceilTint: 0x7a7a74, h: 3.0, siding: 'corrugated', sidingTint: 0x7a8084 },
    },
    regions: {
      Y: { style: 'snow', tag: 'outside' }, T: { style: 'deck', tag: 'terrace' },
      1: { style: 'room', tag: 'room1' }, 2: { style: 'room', tag: 'room2' }, 3: { style: 'room', tag: 'room3' }, 4: { style: 'room', tag: 'room4' },
      g: { style: 'corridor', tag: 'corridor' }, B: { style: 'skiroom', tag: 'skiroom' }, L: { style: 'bar', tag: 'bar', zone: 1 }, H: { style: 'hall', tag: 'hall', zone: 1 },
      S: { style: 'service', tag: 'service', zone: 2 }, K: { style: 'kitchen', tag: 'kitchen', zone: 2 }, Z: { style: 'cold', tag: 'coldroom', zone: 2 },
      D: { style: 'dining', tag: 'dining', zone: 1 }, R: { style: 'reception', tag: 'reception', zone: 1 }, O: { style: 'office', tag: 'office' }, V: { style: 'porch', tag: 'porch' },
      p: { style: 'station', tag: 'platform', zone: 3 }, m: { style: 'machine', tag: 'machine', zone: 3 }, x: { style: 'station', solid: 'void' },
    },
    doors: {
      C: { id: 'coldDoor', kind: 'metal' },
      E: { id: 'frontDoor', kind: 'wood' },
    },
    get grid() { return plan(); },
    // outside the front door in the storm, facing the hotel
    spawn: [6.5, 14.2, 0],
    build(L, K) {
      const P = (t, x, y, r, o) => K.prop(t, x, y, r, o), r = K.rng;
      L.meta.zonesOn = [0, 1, 2];
      L.meta.weather = {
        sky: [0.006, 0.0068, 0.0078],
        dome: { zenith: [0.03, 0.033, 0.038], horizon: [0.05, 0.054, 0.06], moon: null, stars: 0, cloud: 1, silH: 0.22, silCol: [0.025, 0.027, 0.03] },
        ground: 'snow', ring: 'snowPines', ringR: [5, 60], ringN: 360, silhouette: 'mountains', precip: 'blizzard',
      };
      // heat: where the Frozen move
      const heat = (x, y, rr) => K.spot('heat', x, y, { h: 0, r: rr });
      // ------------------------------------------- the hall
      P('stoneFireplace', 7, 6.05, 0, { wall: true, col: [1.4, 0.6] });
      heat(7, 6.6, 7);
      K.light(7, 6.5, { kind: 'none', y: 0.7, color: [1, 0.55, 0.25], intensity: 0.85, range: 11, flicker: 0.5, zone: 1 });
      for (const [x, y, rr] of [[5.9, 7.5, -0.6], [8.1, 7.5, 0.6], [6.4, 8.8, -2.6]]) P('wingChair', x, y, rr, { col: [0.42, 0.42] });
      P('lowTable', 7, 7.9, 0, { col: [0.55, 0.3] });
      P('couch', 8.6, 9.3, PI, { col: [1.0, 0.45] });
      P('cuckooClock', 9.97, 6.6, -H, { wall: true, y: 1.9 });
      P('lodgeSign', 5.02, 8.0, H, { wall: true, y: 3.6 });
      K.decal('stain', 7, 8.3, { size: 1.4 });
      // the bar: counter, stools, bottles
      P('counter', 6.8, 4.55, 0, { col: [1.5, 0.35] });
      for (const x of [6.0, 6.8, 7.6]) P('chair', x, 5.2, PI, { col: [0.22, 0.22] });
      P('shelf', 6.8, 4.08, 0, { wall: true });
      K.light(6.8, 4.8, { kind: 'globe', color: [1, 0.75, 0.45], intensity: 0.22, range: 5, zone: 1, flicker: 0.2 });
      // ------------------------------------------- reception and the office
      P('receptionDesk', 6.0, 10.6, 0, { col: [1.2, 0.3] });
      P('keyBoard', 5.03, 10.6, H, { wall: true, y: 1.6 });
      P('telegramBoard', 7.97, 10.5, -H, { wall: true, y: 1.55 });
      K.light(6.0, 10.8, { kind: 'globe', color: [1, 0.8, 0.5], intensity: 0.3, range: 6, zone: 1 });
      P('desk', 9.0, 10.3, PI, { col: [0.75, 0.35] }); P('chair', 9.0, 10.75, 0, { col: [0.25, 0.25] });
      P('stove', 8.35, 11.6, 0, { col: [0.3, 0.3] });
      P('filing', 9.7, 11.6, PI, { col: [0.3, 0.33] });
      K.light(9.0, 10.5, { kind: 'lamp', y: 0.95, color: [1, 0.72, 0.4], intensity: 0.15, range: 3.5, flicker: 0.2 });
      // ------------------------------------------- dining room: tables laid, frost on everything
      const tables = [[10.8, 6.2], [12.6, 6.2], [10.8, 8.0], [12.6, 8.0], [11.7, 9.7]];
      for (const [x, y] of tables) {
        P('diningTable', x, y, r.range(-0.1, 0.1), { col: [0.55, 0.55] });
        for (const [dx, dy, rr] of [[0, -0.42, 0], [0, 0.42, PI], [0.42, 0, -H], [-0.42, 0, H]]) P('alpineChair', x + dx, y + dy, rr + PI, { col: [0.2, 0.2] });
      }
      P('sideboard', 10.1, 9.5, H, { wall: true, col: [0.3, 0.8] });
      for (const [x, y] of [[11.2, 7.1], [13.2, 9.1], [10.5, 5.6]]) K.decal('damp', x, y, { size: 1.2 });
      K.light(11.7, 7.5, { kind: 'globe', color: [0.9, 0.95, 1.0], intensity: 0.25, range: 8, zone: 1, broken: true });
      K.light(11.7, 9.5, { kind: 'globe', color: [1, 0.85, 0.6], intensity: 0.18, range: 6, zone: 1, flicker: 0.4 });
      // ------------------------------------------- kitchen, cold room, service corridor
      P('kitchenRange', 11.0, 2.35, 0, { col: [1.0, 0.45] });
      heat(11.0, 3.0, 4);
      K.light(11.0, 3.0, { kind: 'none', y: 0.5, color: [1, 0.5, 0.2], intensity: 0.35, range: 4, zone: 2, flicker: 0.3 });
      P('prepTable', 11.8, 3.6, 0, { col: [1.0, 0.4] });
      P('potRack', 11.8, 3.6, 0, { y: 2.2 });
      P('coldRoomDoor', 12.5, 3.02, 0, { wall: true });
      P('meatRail', 12.9, 2.5, 0, {});
      P('boxes', 13.6, 2.3, 0.2, { col: [0.36, 0.32] });
      K.light(11.5, 3.5, { kind: 'panel', color: [0.95, 1, 0.95], intensity: 0.3, range: 6, zone: 2, flicker: 0.25 });
      K.light(12.9, 2.5, { kind: 'bulb', color: [0.8, 0.9, 1.0], intensity: 0.2, range: 4, zone: 2 });
      P('staffLockers', 9.05, 3.5, H, { wall: true });
      // ------------------------------------------- guest rooms and corridor
      for (const [n, y] of [[1, 2], [2, 4], [3, 6], [4, 8]]) {
        P('motelBed', 2.6, y + 0.6, H, { col: [1.05, 0.8], hide: true, hideKind: 'bed', hideAt: [0, 0], hideYaw: H });
        P('wardrobe', 3.7, y + 1.75, PI, { col: [0.5, 0.28] });
        P('nightstand', 2.25, y + 1.45, H, { col: [0.22, 0.2] });
        K.light(3.0, y + 1.0, { kind: 'bulb', color: [1, 0.8, 0.55], intensity: 0.18, range: 4, broken: n % 2 === 0 });
        void n;
      }
      for (const y of [3, 6, 9]) K.light(4.5, y, { kind: 'sconce', y: 1.9, color: [1, 0.78, 0.5], intensity: 0.15, range: 4, flicker: y === 6 ? 0.5 : 0.05 });
      // ski room
      P('skiRack', 6.5, 2.08, 0, { wall: true });
      P('bootRack', 8.3, 3.0, -H, { col: [0.2, 0.8] });
      P('mineBench', 6.5, 3.6, 0, { col: [1.0, 0.2] });
      // ------------------------------------------- outside
      for (const [x, y] of [[14.5, 6], [16.5, 9.5], [18.5, 4.5], [18.5, 9.5]]) P('lampPostSnow', x, y, 0, { col: [0.15, 0.15] });
      K.light(18.5, 4.5, { kind: 'none', y: 3.3, color: [1, 0.85, 0.6], intensity: 0.3, range: 9, flicker: 0.3 });
      K.light(14.5, 6, { kind: 'none', y: 3.3, color: [1, 0.85, 0.6], intensity: 0.25, range: 8, broken: true });
      P('pisteSign', 17.5, 11.5, -0.4, { col: [0.1, 0.1] });
      for (const [x, y, s] of [[1, 12, 1.2], [3, 16, 1], [10, 13, 1.1], [16, 14, 1.3], [12, 18, 1], [20, 12, 1.2], [24, 15, 1], [19, 1.5, 1]]) P('snowPile', x, y, r.range(0, 6), { col: [1.1 * s, 0.9 * s], sx: s, sy: s, sz: s });
      for (let k = 0; k < 26; k++) {
        const x = r.range(0.5, 25.5), y = r.range(12.5, 21.5);
        if (Math.abs(x - 6.5) < 2.5 && y < 17) continue;
        P(r() < 0.5 ? 'pineSnow' : 'pineSnow2', x, y, r.range(0, 6), { col: [0.4, 0.4], sx: r.range(0.7, 1.1), sy: r.range(0.7, 1.1), sz: r.range(0.7, 1.1) });
      }
      // the station: the gondola in its dock, the bull wheel above, the control desk
      // the gondola itself is the chapter's own object (it leaves); here only the space it takes
      K.spot('dock', 21.4, 6.0, { h: 0 });
      P('bullWheel', 22.2, 6.0, 0, { y: 5.2 });
      P('controlDesk', 23.8, 3.6, -H, { col: [0.3, 0.7] });
      K.light(21.5, 4.0, { kind: 'cage', color: [1, 0.85, 0.6], intensity: 0.35, range: 9, zone: 3 });
      K.light(23.8, 3.6, { kind: 'bulb', color: [1, 0.8, 0.5], intensity: 0.2, range: 5, zone: 3 });
      // ------------------------------------------- spots
      K.spot('guestBook', 5.7, 10.55, { h: 1.13 });
      K.spot('board', 7.85, 10.5, { h: 1.55 });
      K.spot('telegram', 8.35, 11.45, { h: 0.45 });
      K.spot('key', 12.05, 3.04, { h: 1.55 });
      K.spot('control', 23.6, 3.6, { h: 1.0 });
      K.spot('gondola', 20.6, 6.0, { h: 1.0 });
      K.spot('weather', 9.2, 10.2, { h: 0.78 });
      K.spot('menu', 12.6, 8.0, { h: 0.8 });
      K.spot('postcard', 2.3, 3.4, { h: 0.6 });
      K.spot('roomNote', 2.3, 7.4, { h: 0.6 });
      K.spot('school', 6.0, 3.6, { h: 0.47 });
      K.spot('kitchenNote', 9.15, 3.0, { h: 1.5 });
      K.spot('drawing', 2.6, 9.5, { h: 0.6 });
      K.spot('bar', 6.3, 4.55, { h: 1.02 });
      // ------------------------------------------- creatures
      for (const [x, y, yaw] of [[10.8, 6.62, PI], [12.6, 7.58, 0], [11.28, 9.7, H], [5.9, 7.5, -0.6], [8.1, 7.5, 0.6], [4.5, 4.0, 0]]) K.lair('frozen', x, y, { yaw });
      K.lair('cook', 11.0, 3.6); K.lair('cook', 12.8, 2.5);
      for (const [x, y] of [[18, 7], [17, 2], [21, 12], [12, 15], [4, 18]]) K.lair('whiteout', x, y);
      K.room('kitchenZone', 9, 2, 13, 5);
      K.trigger('inside', 2, 2, 13, 12);
      K.trigger('dining', 10, 5, 13, 10);
      K.trigger('station', 20, 3, 24, 8);
      K.trigger('terrace', 14, 5, 16, 10);
      K.trigger('office', 8, 10, 9, 11);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
