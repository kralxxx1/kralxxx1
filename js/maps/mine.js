/* Chapter 4 map: Hollow Creek copper mine, the night of 3 March 1956, after the fall.
   On the surface, in snow: the timber headframe over the shaft, the winding house with its drum, the lamp
   room, the dry where the miners' clothes hang from the roof on chains, the foreman's office. 400 feet
   below, joined to it by the cage (a scripted ride): the cage station with the tally board and the signal
   bell, the shift boss's cabin, the lunch room, the generator room, the main haulage way with its rails,
   timbered dirt drifts (one full of gas), the old stope, a flooded working that has become a lake, the
   fuel store, the powder magazine, and at the end of the east drift the fire door in its concrete
   bulkhead, which Arvid Lund closed and wedged with seven men knocking on the other side. 30 x 38 cells. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const MAPS = PB.Maps || (PB.Maps = {});
  const H = Math.PI / 2, PI = Math.PI;
  const MapDraw = (...a) => PB.Authored.MapDraw(...a);

  function plan() {
    const D = MapDraw(30, 38);
    // ------------------------------------------------ surface (rows 0-9): a fenced yard in the snow
    D.fill(0, 0, 19, 9, 'Y');
    D.fill(6, 3, 9, 6, 'E');                                 // winding house
    D.fill(14, 4, 14, 4, 'Q');                               // the shaft collar and the cage (solid)
    D.fill(15, 7, 17, 8, 'A');                               // lamp room
    D.fill(10, 7, 13, 8, 'R');                               // the dry
    D.fill(2, 7, 4, 8, 'O');                                 // foreman's office
    D.join('Y', 'Q');
    D.border('Y', 'i');
    D.edge(9, 5, 1, 'm').edge(7, 6, 2, 'w').edge(8, 3, 0, 'w');            // winding house door, windows
    D.edge(16, 7, 0, 'd').edge(17, 8, 2, 'w');                              // lamp room
    D.edge(11, 7, 0, 'd').edge(13, 8, 2, 'w').edge(10, 8, 2, 'w');          // dry
    D.edge(3, 7, 0, 'd').edge(4, 8, 1, 'w');                                // office
    // ------------------------------------------------ the 400-foot level (rows 12-37)
    D.fill(12, 12, 15, 14, 'S');                             // cage station
    D.fill(13, 12, 13, 12, 'q');                             // the cage at the bottom of the shaft (solid)
    D.fill(16, 12, 17, 13, 'B');                             // shift boss's cabin
    D.fill(10, 12, 11, 13, 'L');                             // lunch room
    D.fill(2, 16, 27, 16, 'h');                              // main haulage, east-west
    D.fill(13, 15, 14, 15, 'h');                             // station to the haulage
    D.fill(10, 15, 11, 15, 'G').fill(10, 14, 11, 14, 'G');   // generator room
    D.fill(21, 13, 21, 15, 'n');                             // north drift
    D.fill(20, 11, 22, 12, 'M');                             // powder magazine
    D.fill(2, 17, 2, 17, 'h');                               // west end turns south
    D.fill(1, 18, 6, 23, 'W');                               // the flooded working
    D.fill(1, 18, 6, 18, 'k');                               // plank walk along its north side
    D.fill(2, 17, 2, 17, 'k');
    D.fill(8, 17, 8, 18, 'd');                               // drift down to the old stope
    D.fill(7, 19, 12, 24, 'P');                              // the old stope
    D.fill(17, 17, 17, 26, 'x');                             // the gas drift, south
    D.fill(16, 27, 18, 28, 'F');                             // fuel store
    D.fill(18, 24, 26, 24, 'd');                             // cross-cut joining the gas drift to the east drift
    D.fill(27, 17, 27, 30, 'e');                             // east drift
    D.fill(26, 30, 28, 30, 'e').fill(27, 31, 27, 31, 'e');   // the bottom of the east drift; the fire door in its alcove
    D.join('h', 'k', 'd', 'x', 'e', 'n', 'W');
    D.join('d', 'P');
    // doors
    D.edge(13, 12, 2, 'C');                                  // cage gate, underground
    D.edge(14, 4, 2, 'U');                                   // cage gate, surface
    D.edge(16, 12, 3, 'd').edge(11, 12, 1, 'd');             // cabin, lunch room
    D.edge(11, 14, 1, 'm');                                  // station to the generator room
    D.hline(15, 13, 14, ' ');                                // station opens onto the haulage
    D.edge(21, 12, 2, 'm');                                  // powder magazine door
    D.edge(17, 27, 0, 'm');                                  // fuel store door
    D.edge(27, 31, 2, 'X');                                  // the fire door (never opens)
    return D.grid();
  }

  MAPS.mine = {
    ceil: 3,
    allowIslands: false,
    styles: {
      yard: { outdoor: true, floor: 'snow', wall: 'logWall', h: 9, step: 'snow' },
      winding: { wall: 'corrugated', wallTint: 0x8a8a84, floor: 'boards', floorTint: 0x5a4a3a, ceil: 'planks', ceilTint: 0x5a4a3a, h: 6.0, siding: 'corrugated', sidingTint: 0x6a6460 },
      lamp: { wall: 'planks', wallTint: 0x9a8a6a, floor: 'boards', ceil: 'planks', ceilTint: 0x7a6a5a, h: 2.8, siding: 'logWall', trimH: 0.08 },
      dry: { wall: 'planks', wallTint: 0x8a7a62, floor: 'concreteFloor', floorTint: 0x8a867a, ceil: 'planks', ceilTint: 0x6a5a4a, h: 4.4, siding: 'logWall' },
      office: { wall: 'woodPanel', wallTint: 0xa88a6a, floor: 'boards', ceil: 'planks', ceilTint: 0x8a7a68, h: 2.7, siding: 'logWall', trimH: 0.1 },
      shaft: { wall: 'rustSteel', floor: 'steelDeck', ceil: 'rustSteel', h: 2.6 },
      station: { wall: 'concreteWall', wallTint: 0x8a8a80, floor: 'concreteFloor', floorTint: 0x7a786e, ceil: 'rock', ceilTint: 0x6a645a, h: 3.4 },
      cabin: { wall: 'planks', wallTint: 0x7a6a52, floor: 'boards', ceil: 'planks', ceilTint: 0x5a4a3a, h: 2.6 },
      haulage: { wall: 'rock', wallTint: 0x8a7e70, floor: 'ballast', floorTint: 0x6a6258, ceil: 'rock', ceilTint: 0x5a544a, h: 3.0, step: 'ballast' },
      drift: { wall: 'rock', wallTint: 0x7a6e60, floor: 'mud', floorTint: 0x6a5a48, ceil: 'rock', ceilTint: 0x4a443a, h: 2.9, step: 'mud' },
      gas: { wall: 'rock', wallTint: 0x7a7660, floor: 'mud', floorTint: 0x5a5a40, ceil: 'rock', ceilTint: 0x4a4a3a, h: 2.8, step: 'mud' },
      stope: { wall: 'rock', wallTint: 0x8a7a6a, floor: 'gravel', floorTint: 0x6a6258, ceil: 'rock', ceilTint: 0x4a443a, h: 8.0, step: 'gravel' },
      lake: { wall: 'rock', wallTint: 0x6a6a62, floor: 'mud', ceil: 'rock', ceilTint: 0x3a3a34, h: 5.0, bed: 'mud', murky: true, depth: 1.4 },
      planks: { wall: 'rock', wallTint: 0x6a6a62, floor: 'boards', floorTint: 0x5a4a3a, ceil: 'rock', ceilTint: 0x3a3a34, h: 5.0, step: 'wood' },
      genroom: { wall: 'concreteWall', wallTint: 0x7a7a72, floor: 'concreteFloor', ceil: 'concreteWall', ceilTint: 0x6a6a64, h: 3.0 },
      magazine: { wall: 'concreteWall', wallTint: 0x8a8478, floor: 'boards', ceil: 'concreteWall', ceilTint: 0x6a6a64, h: 2.8 },
      firedoor: { wall: 'rock', wallTint: 0x5a5248, floor: 'mud', floorTint: 0x4a3e32, ceil: 'rock', ceilTint: 0x2e2a24, h: 2.9, step: 'mud' },
    },
    regions: {
      Y: { style: 'yard', tag: 'yard' }, E: { style: 'winding', tag: 'winding' }, Q: { style: 'yard', solid: 'rack' }, A: { style: 'lamp', tag: 'lamproom' }, R: { style: 'dry', tag: 'dry' }, O: { style: 'office', tag: 'office' },
      S: { style: 'station', tag: 'station', zone: 1 }, q: { style: 'shaft', solid: 'rack' }, B: { style: 'cabin', tag: 'cabin', zone: 1 }, L: { style: 'cabin', tag: 'lunch' },
      h: { style: 'haulage', tag: 'haulage', zone: 2 }, G: { style: 'genroom', tag: 'genroom', zone: 2 }, n: { style: 'drift', tag: 'northDrift' }, M: { style: 'magazine', tag: 'magazine' },
      W: { style: 'lake', tag: 'lake', water: true }, k: { style: 'planks', tag: 'walk' }, d: { style: 'drift', tag: 'drift' }, P: { style: 'stope', tag: 'stope' },
      x: { style: 'gas', tag: 'gasDrift' }, F: { style: 'magazine', tag: 'fuelStore' }, e: { style: 'firedoor', tag: 'eastDrift' },
    },
    doors: {
      C: { id: 'cageBottom', kind: 'bars', locked: true, nameKey: 'door.cage', lockKey: 'lock.cage' },
      U: { id: 'cageTop', kind: 'bars', locked: true, nameKey: 'door.cage', lockKey: 'lock.cage' },
      X: { id: 'fireDoor', kind: 'metal', locked: true, nameKey: 'door.fire', lockKey: 'lock.fire' },
    },
    get grid() { return plan(); },
    // in the yard by the fence, the headframe ahead in the snow
    spawn: [17.5, 1.5, 2.35],
    build(L, K) {
      const P = (t, x, y, r, o) => K.prop(t, x, y, r, o), r = K.rng;
      L.meta.zonesOn = [0, 1];
      L.meta.weather = {
        sky: [0.004, 0.0045, 0.0055],
        dome: { zenith: [0.006, 0.007, 0.009], horizon: [0.03, 0.032, 0.038], moon: null, stars: 0, cloud: 1, silH: 0.2, silCol: [0.008, 0.009, 0.011] },
        ground: 'snow', ring: 'snowPines', ringR: [6, 70], ringN: 420, silhouette: 'mountains', precip: 'snow',
      };
      // ------------------------------------------- surface
      P('headframe', 14.5, 4.5, 0, { fixed: true });
      P('mineCage', 14.5, 4.5, 0, { fixed: true });
      K.light(14.5, 5.3, { kind: 'cage', y: 3.2, color: [1, 0.8, 0.5], intensity: 0.45, range: 9, flicker: 0.25 });
      P('canarySign', 15.1, 5.0, 0, { wall: true, y: 1.6 });
      // the winding house: the drum, the driver's chair, the brake levers
      P('windingDrum', 7.2, 4.6, 0, { col: [1.4, 1.4] });
      P('chair', 8.6, 3.7, H, { col: [0.25, 0.25] });
      K.light(8.2, 5.5, { kind: 'bulb', color: [1, 0.8, 0.5], intensity: 0.32, range: 7 });
      P('workbench', 6.4, 3.25, 0, { col: [1.1, 0.4] });
      // the lamp room: the rack with its gaps, the counter, the canary
      P('lampRack', 16.5, 8.95, PI, { wall: true });
      P('counterTop', 15.6, 7.6, H, { col: [0.45, 1.45] });
      P('mineBench', 17.4, 7.4, -H, { col: [0.2, 1.0] });
      K.light(16.5, 7.6, { kind: 'bulb', color: [1, 0.82, 0.55], intensity: 0.28, range: 5, flicker: 0.15 });
      // the dry: clothes on chains, benches, a stove gone cold
      P('clothesChains', 11.4, 7.95, 0, {}); P('clothesChains', 12.9, 8.0, 0.1, {});
      P('mineBench', 11.5, 8.75, 0, { col: [1.0, 0.2] }); P('mineBench', 12.9, 7.25, 0, { col: [1.0, 0.2] });
      P('boiler', 10.4, 8.5, H, { col: [0.4, 0.4] });
      K.light(12, 7.8, { kind: 'bulb', color: [1, 0.85, 0.6], intensity: 0.2, range: 6, broken: true });
      // the office: desk, filing, a stove
      P('desk', 3.0, 8.55, 0, { col: [0.75, 0.35] }); P('chair', 3.0, 8.1, PI, { col: [0.25, 0.25] });
      P('filing', 4.6, 7.3, -H, { col: [0.33, 0.3] }); P('coatStand', 2.3, 7.3, 0, { col: [0.2, 0.2] });
      K.light(3.2, 8.4, { kind: 'lamp', y: 0.95, color: [1, 0.75, 0.45], intensity: 0.22, range: 4 });
      // the yard: rails from the collar to the ore bins, tubs in the snow, snow drifts
      for (let x = 10.5; x <= 13.5; x += 1) P('railTrack', x, 4.5, H, {});
      P('mineTub', 11.5, 4.5, H, { col: [0.7, 0.55] }); P('mineTub', 12.8, 4.5, H + 0.04, { col: [0.7, 0.55] });
      for (const [x, y, s] of [[2, 2, 1.2], [5, 1.5, 0.9], [18, 4, 1.1], [1.5, 5, 1], [10, 2, 0.8], [18.3, 8.5, 0.9]]) P('snowPile', x, y, r.range(0, 6), { col: [1.2 * s, 1.0 * s], sx: s, sy: s, sz: s });
      K.light(17.5, 1.5, { kind: 'none', y: 4, color: [0.6, 0.7, 0.9], intensity: 0.12, range: 10 });
      // ------------------------------------------- the 400-foot level: cage station
      P('mineCage', 13.5, 12.5, 0, { fixed: true });
      P('levelSign', 12.5, 12.03, 0, { wall: true, y: 2.3 });
      P('tallyBoard', 15.99, 13.55, -H, { wall: true });
      P('signalBell', 12.03, 13.0, H, { wall: true, y: 1.9 });
      P('minePhone', 12.03, 13.6, H, { wall: true, y: 1.45 });
      P('hoistPanel', 14.6, 12.04, 0, { wall: true });
      P('mineBench', 13.5, 14.75, 0, { col: [1.0, 0.2] });
      K.light(13.5, 13.5, { kind: 'cage', color: [1, 0.78, 0.5], intensity: 0.35, range: 8, zone: 1, flicker: 0.2 });
      // shift boss's cabin: desk, stool, the tin in the drawer
      P('desk', 16.9, 12.25, PI, { col: [0.75, 0.35] }); P('chair', 16.9, 12.75, 0, { col: [0.25, 0.25] });
      P('shelf', 17.75, 13.4, -H, { col: [0.25, 0.5] });
      K.light(16.9, 12.8, { kind: 'lamp', y: 0.95, color: [1, 0.72, 0.4], intensity: 0.16, range: 3, zone: 1, flicker: 0.3 });
      // lunch room
      P('lunchTable', 10.9, 12.9, H, { col: [0.6, 1.1] });
      P('staffLockers', 10.05, 13.5, H, { wall: true });
      // generator room
      P('dieselGen', 10.9, 14.8, H, { col: [0.5, 1.0] });
      P('barrel', 10.3, 15.6, 0, { col: [0.3, 0.3] });
      K.light(11.2, 14.4, { kind: 'cage', color: [1, 0.7, 0.4], intensity: 0.3, range: 6, zone: 2 });
      // ------------------------------------------- haulage, drifts, workings
      for (let x = 2.5; x <= 26.5; x += 1) P('railTrack', x, 16.5, H, {});
      for (let x = 2.5; x <= 27.5; x += 0.66) if (Math.abs(x - 13.9) > 1.2 && Math.abs(x - 21.5) > 0.7 && Math.abs(x - 17.5) > 0.7 && Math.abs(x - 8.5) > 0.7) P('timberSet', x, 16.5, H, {});
      P('mineLoco', 5.0, 16.5, H, { col: [1.3, 0.5] });
      for (const x of [6.6, 7.9, 9.2]) P('mineTub', x, 16.5, H, { col: [0.7, 0.55] });
      P('mineTub', 24.6, 16.5, H + 0.1, { col: [0.7, 0.55] });
      for (let x = 3; x <= 26; x += 2) P('airPipes', x, 16.12, H, { y: 2.4 });
      for (let x = 4; x <= 25; x += 3) P('ventTube', x, 16.5, H, { y: 2.65 });
      // the haulage string of bulbs, dead until the generator runs
      for (const x of [4, 8, 12, 16, 20, 24]) K.light(x, 16.5, { kind: 'bulb', color: [1, 0.8, 0.5], intensity: 0.3, range: 7, zone: 2, flicker: x === 16 ? 0.4 : 0.05, broken: x === 20 });
      // drifts: timber sets every two metres
      const setsAlong = (x0, y0, x1, y1, step = 0.66) => {
        const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / step));
        for (let k = 0; k <= n; k++) { const t = k / n; P(r() < 0.06 ? 'timberBroken' : 'timberSet', x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, x0 === x1 ? 0 : H, {}); }
      };
      setsAlong(21.5, 13.4, 21.5, 15.6);
      setsAlong(8.5, 17.2, 8.5, 18.6);
      setsAlong(17.5, 17.2, 17.5, 26.6);
      setsAlong(18.3, 24.5, 26.6, 24.5);
      setsAlong(27.5, 17.2, 27.5, 29.8);
      // the old stope: cribs holding the roof, an ore chute, a ladderway
      for (const [x, y] of [[8.2, 20.2], [11.2, 20.6], [9.6, 22.4], [8.0, 23.8], [11.6, 23.6]]) P('timberCrib', x, y, r.range(-0.2, 0.2), { col: [0.85, 0.85] });
      P('ladder', 12.85, 21.5, -H, { wall: true });
      P('rubble', 10.4, 19.6, 0.4, { col: [1.0, 0.8] });
      P('mineTub', 9.8, 24.4, 0.2, { col: [0.55, 0.7] });
      // the flooded working: the plank walk on trestles, an old punt
      for (let x = 1.5; x <= 6.5; x += 1) P('railTrack', x, 18.5, H, {});
      P('rubble', 5.4, 22.4, 1.2, { col: [1.0, 0.8] });
      // fuel store and powder magazine
      P('barrel', 16.4, 27.4, 0, { col: [0.3, 0.3] }); P('barrel', 16.4, 28.1, 0, { col: [0.3, 0.3] }); P('barrel', 18.6, 28.5, 0, { col: [0.3, 0.3] });
      P('shelf', 18.7, 27.3, -H, { col: [0.25, 0.5] });
      P('powderBoxes', 21, 11.3, PI, { col: [0.85, 0.4] }); P('powderBoxes', 22.4, 12.2, -H, { col: [0.4, 0.85] });
      // the east drift: the collapse half across it, the fire door at the bottom
      P('rubble', 27.3, 27.6, 0.6, { col: [0.7, 0.6] }); P('rubble', 26.4, 30.6, 1.6, { col: [0.6, 0.6] });
      P('fireDoor', 27.5, 31.98, PI, { wall: true });
      for (const [x, y] of [[27.2, 30.6], [27.6, 31.4], [28.4, 30.4]]) K.decal('oil', x, y, { size: 0.9, rot: x });
      K.wallDecal('crack', 27, 31, 3, { y: 1.6, size: 1.4 }); K.wallDecal('damp', 28, 30, 1, { y: 1.0, size: 1.6 });
      K.wallDecal('mold', 27, 31, 1, { y: 2.2, size: 1.1 });
      // ------------------------------------------- spots
      K.spot('canary', 15.6, 7.6, { h: 0.9 });
      K.spot('tin', 16.95, 12.25, { h: 0.78 });
      K.spot('tagA', 26.6, 30.5, { h: 0.0 }); K.spot('tagB', 27.7, 31.3, { h: 0.0 }); K.spot('tagC', 28.5, 30.4, { h: 0.0 });
      K.spot('board', 15.75, 13.55, { h: 1.5 });
      K.spot('diesel', 18.6, 27.9, { h: 0 });
      K.spot('gen', 11.25, 14.8, { h: 0.8 });
      K.spot('hoist', 14.6, 12.25, { h: 1.3 });
      K.spot('cageTop', 14.5, 5.25, { h: 1.2 });
      K.spot('cageBottom', 13.5, 13.25, { h: 1.2 });
      K.spot('statement', 3.0, 8.6, { h: 0.78 });
      K.spot('lampBook', 15.6, 7.25, { h: 0.9 });
      K.spot('widow', 12.6, 7.35, { h: 0.47 });
      K.spot('phoneLog', 13.2, 14.75, { h: 0.47 });
      K.spot('rescue', 7.6, 4.0, { h: 0.9 });
      K.spot('lunchNote', 10.9, 12.6, { h: 0.78 });
      K.spot('fireGap', 27.5, 31.75, { h: 0.0 });
      K.spot('fireDoorSpot', 27.5, 31.6, { h: 1.2 });
      K.wallSpot('rules', 15, 7, 3, { h: 1.55, along: 0.6 });
      K.wallSpot('genNote', 11, 14, 0, { h: 1.5 });
      // where a pair of lamps comes from: the far end of the haulage
      K.spot('lampsIn', 26.5, 16.5, { h: 0 });
      // ------------------------------------------- creatures
      // Burrowers lie in the dirt of the drifts; Timber Crawlers between the sets overhead; Lamplighters walk
      for (const [x, y] of [[17.5, 19.5], [17.5, 22.5], [17.5, 25.5], [21.5, 24.5], [24.5, 24.5], [27.5, 20.5], [27.5, 26.5], [8.5, 18.0], [21.5, 14.0], [27.0, 29.5]]) K.lair('burrower', x, y);
      for (const [x, y] of [[17.5, 21.0], [27.5, 23.0], [20.0, 24.5], [27.5, 18.4]]) K.lair('crawler', x, y, { h: 2.6 });
      for (const [x, y] of [[26.0, 16.5], [3.5, 16.5], [10.0, 22.0], [27.5, 28.0]]) K.lair('lamplighter', x, y);
      // the cage joins the yard to the station (a scripted ride, not a walk)
      K.link(14, 5, 13, 13);
      // rooms the creatures keep to, and triggers
      K.room('dirt', 8, 13, 28, 31);
      K.trigger('gas1', 17, 19, 17, 21); K.trigger('gas2', 17, 23, 17, 25);
      K.trigger('station', 12, 12, 15, 14); K.trigger('fire', 26, 28, 28, 31); K.trigger('stope', 7, 19, 12, 24); K.trigger('lake', 1, 17, 6, 18);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
