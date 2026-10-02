/* Chapter 2 map: MS Saint Brigid, the night of 9 November 1987, in fog on Halvard Sound, listing.
   Three decks laid out apart on one plan (far enough that the fog hides each from the others) and joined
   by stairs: the boat deck (open, the lifeboats, the funnel, the foremast and its bell, the bridge, the
   captain's cabin, the radio room), the passenger deck (lounge, cafeteria, purser, cabins, crew mess) and
   the car deck (cars, a half-flooded stern) with the engine room below it. 32 x 46 cells. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const MAPS = PB.Maps || (PB.Maps = {});
  const H = Math.PI / 2, PI = Math.PI;
  const MapDraw = (...a) => PB.Authored.MapDraw(...a);

  function plan() {
    const D = MapDraw(32, 46);
    // ------------------------------------------------ boat deck (rows 1-9), bow to the east
    const hull = (y0, y1, x1, taper) => {
      D.fill(1, y0, x1, y1, 'o');
      taper.forEach(([x, a, b]) => D.fill(x, y0 + a, x, y0 + b, 'o'));
    };
    hull(1, 9, 27, [[28, 1, 7], [29, 2, 6], [30, 3, 5]]);
    D.fill(15, 3, 17, 7, 'S');           // stair lobby
    D.fill(18, 3, 21, 4, 'C');           // captain's cabin
    D.fill(18, 5, 21, 5, 'k');           // officers' passage
    D.fill(18, 6, 21, 7, 'R');           // radio room
    D.fill(22, 3, 25, 7, 'B');           // bridge
    D.fill(10, 4, 12, 6, 'F');           // the funnel casing (solid)
    D.join('o', 'F');
    D.border('o', 'r');                  // railing round the whole deck
    D.edge(16, 3, 0, 'm').edge(16, 7, 2, 'm');            // weather doors, port and starboard
    D.edge(17, 5, 1, 'd');                                 // lobby to the passage
    D.edge(19, 5, 0, 'd').edge(19, 5, 2, 'd');             // cabin, radio room
    D.edge(21, 5, 1, 'B');                                 // the bridge door
    D.hline(3, 22, 25, 'w').hline(8, 22, 25, 'w').vline(26, 3, 7, 'w');   // bridge windows all round
    D.hline(3, 18, 21, 'w').edge(19, 7, 2, 'w').edge(20, 7, 2, 'w');      // cabin and radio room windows
    // ------------------------------------------------ passenger deck (rows 17-24)
    D.fill(1, 17, 27, 24, 'L').fill(28, 18, 28, 23, 'L').fill(29, 19, 29, 22, 'L');
    D.fill(1, 17, 9, 18, 'q').fill(1, 20, 9, 21, 'q');    // cabins
    D.fill(1, 19, 9, 19, 'c');                             // cabin corridor
    D.fill(1, 22, 9, 24, 'e');                             // crew mess
    D.fill(10, 17, 16, 20, 'f');                           // cafeteria
    D.fill(10, 21, 12, 24, 'P');                           // purser's office
    D.fill(13, 21, 16, 24, 'W');                           // stair hall
    for (let x = 2; x <= 9; x++) { D.vline(x, 17, 18, '|'); D.vline(x, 20, 21, '|'); }
    for (let x = 1; x <= 9; x++) { D.edge(x, 19, 0, 'd'); D.edge(x, 19, 2, 'd'); }
    D.edge(9, 19, 1, ' ');                                 // corridor opens into the cafeteria
    D.edge(9, 23, 1, 'd');                                 // crew mess from the cafeteria side
    D.hline(21, 14, 15, ' ');                              // cafeteria to stair hall
    D.edge(12, 22, 1, 'l').edge(12, 23, 1, 'l').edge(12, 24, 1, 'd');     // purser's counter
    D.vline(17, 18, 19, ' ');                              // cafeteria to lounge
    D.edge(16, 22, 1, 'g');                                // stair hall to lounge, glass door
    D.border('L', 'w').border('f', 'w');                   // windows along the hull
    D.border('qce', '|').border('PW', '|');
    // ------------------------------------------------ car deck (rows 30-38) and engine room (rows 40-44)
    D.fill(1, 30, 29, 38, 'v');
    D.fill(1, 30, 7, 38, 'V');                             // the flooded stern
    D.fill(11, 34, 19, 34, 'K');                           // centre casing
    D.fill(13, 30, 15, 31, 'U');                           // stair casing
    D.edge(14, 31, 2, 'm');
    D.join('v', 'V', 'K');
    D.fill(2, 40, 14, 44, 'n');                            // engine room, flooded
    D.fill(5, 41, 9, 41, 'M').fill(5, 43, 9, 43, 'M');    // two main engines (solid)
    D.join('n', 'M');
    return D.grid();
  }

  MAPS.ferry = {
    ceil: 3,
    allowIslands: false,
    styles: {
      deck: { outdoor: true, wall: 'shipPaint', wallTint: 0xd8d4c8, floor: 'steelDeck', h: 7, wallH: 1.1, rail: 'steel', siding: 'shipPaint', sidingTint: 0xdcd8cc, parapet: 0.3 },
      lobby: { wall: 'shipPaint', wallTint: 0xc8c4b4, floor: 'vinyl', floorTint: 0x8a8a80, ceil: 'shipPaint', ceilTint: 0x9a9a92, h: 2.6, siding: 'shipPaint', sidingTint: 0xdcd8cc, trimH: 0 },
      cabin: { wall: 'woodPanel', wallTint: 0xb89878, floor: 'trainCarpet', floorTint: 0x8a6a6a, ceil: 'shipPaint', ceilTint: 0xb0aca0, h: 2.5, siding: 'shipPaint', sidingTint: 0xdcd8cc, trimH: 0.1 },
      bridge: { wall: 'woodPanel', wallTint: 0x8a7a68, floor: 'boards', floorTint: 0x7a6a5a, ceil: 'shipPaint', ceilTint: 0x8a8a84, h: 2.7, siding: 'shipPaint', sidingTint: 0xdcd8cc, trimH: 0.1 },
      radio: { wall: 'shipPaint', wallTint: 0xb8c0b4, floor: 'vinyl', floorTint: 0x6a7a6a, ceil: 'shipPaint', ceilTint: 0x9a9a92, h: 2.5, siding: 'shipPaint', sidingTint: 0xdcd8cc },
      funnel: { wall: 'shipPaint', floor: 'steelDeck', h: 7, outdoor: true },
      lounge: { wall: 'woodPanel', wallTint: 0x9a8070, floor: 'trainCarpet', floorTint: 0x7a5a5a, ceil: 'ceiling', ceilTint: 0xa8a49a, h: 2.7, wainscot: { mat: 'shipPaint', tint: 0x5a6a7a, h: 0.9 }, trimH: 0 },
      cafe: { wall: 'subway', wallTint: 0xd8d0b8, floor: 'linoleum', floorTint: 0x7a6a5a, ceil: 'ceiling', ceilTint: 0xa8a49a, h: 2.7 },
      cabins: { wall: 'woodPanel', wallTint: 0xc8b090, floor: 'trainCarpet', floorTint: 0x6a5a5a, ceil: 'shipPaint', ceilTint: 0xb8b4a8, h: 2.4, trimH: 0.1 },
      corridor: { wall: 'shipPaint', wallTint: 0xc8c0a8, floor: 'vinyl', floorTint: 0x6a6460, ceil: 'shipPaint', ceilTint: 0xa8a49a, h: 2.4, wainscot: { mat: 'woodPanel', h: 1.0 } },
      mess: { wall: 'shipPaint', wallTint: 0xb8c0b0, floor: 'linoleum', floorTint: 0x5a6a5a, ceil: 'shipPaint', ceilTint: 0xa8a49a, h: 2.4 },
      purser: { wall: 'woodPanel', wallTint: 0xa88a6a, floor: 'trainCarpet', floorTint: 0x5a4a4a, ceil: 'ceiling', h: 2.6 },
      stairs: { wall: 'shipPaint', wallTint: 0xc8c4b4, floor: 'steelDeck', ceil: 'shipPaint', ceilTint: 0x9a9a92, h: 2.7 },
      cardeck: { wall: 'shipPaint', wallTint: 0xb8b8b0, floor: 'steelDeck', floorTint: 0x9a9a92, ceil: 'shipPaint', ceilTint: 0x6a6a66, h: 4.6, bed: 'steelDeck', murky: true, depth: 0.55 },
      engine: { wall: 'rustSteel', floor: 'steelDeck', ceil: 'rustSteel', ceilTint: 0x6a5a50, h: 5.0, bed: 'rustSteel', murky: true, depth: 0.6 },
    },
    regions: {
      o: { style: 'deck', tag: 'deck' }, S: { style: 'lobby', tag: 'lobby' }, C: { style: 'cabin', tag: 'captain' }, k: { style: 'lobby', tag: 'passage' },
      R: { style: 'radio', tag: 'radio' }, B: { style: 'bridge', tag: 'bridge' }, F: { style: 'funnel', solid: 'rack' },
      L: { style: 'lounge', tag: 'lounge', zone: 1 }, q: { style: 'cabins', tag: 'cabins' }, c: { style: 'corridor', tag: 'corridor' }, e: { style: 'mess', tag: 'mess' },
      f: { style: 'cafe', tag: 'cafe', zone: 1 }, P: { style: 'purser', tag: 'purser' }, W: { style: 'stairs', tag: 'stairs' },
      v: { style: 'cardeck', tag: 'cardeck' }, V: { style: 'cardeck', tag: 'flood', water: true }, K: { style: 'cardeck', solid: 'block' }, U: { style: 'stairs', tag: 'carStairs' },
      n: { style: 'engine', tag: 'engine', water: true }, M: { style: 'engine', solid: 'rack', water: true },
    },
    doors: {
      B: { id: 'bridgeDoor', kind: 'wood', locked: true, nameKey: 'door.bridge', lockKey: 'lock.bridge' },
    },
    get grid() { return plan(); },
    // the stern of the boat deck, by lifeboat 2, facing forward into the fog
    spawn: [2.6, 3.4, -H],
    build(L, K) {
      const P = (t, x, y, r, o) => K.prop(t, x, y, r, o);
      L.meta.zonesOn = [0, 1];
      L.meta.weather = {
        sky: [0.0035, 0.0045, 0.0055],
        dome: { zenith: [0.012, 0.014, 0.017], horizon: [0.05, 0.058, 0.064], moon: [0.3, 0.35, -0.9], moonK: 0.2, stars: 0, cloud: 1 },
        sea: { y: -6.5, color: [0.006, 0.011, 0.013] }, precip: 'rain', rainK: 0.45,
      };
      // ------------------------------------------- boat deck
      // lifeboats hang outboard on both sides; number 2 is the second on the port (north) side
      const boats = [[4.5, 0, 'lb1'], [8.5, 0, 'lb2'], [4.5, 1, 'lb3'], [8.5, 1, 'lb4']];
      for (const [x, side] of boats) {
        const y = side ? 10.0 : 1.0, rot = side ? PI : 0;
        P('davits', x, side ? 9.6 : 1.4, rot);
        if (!(x === 8.5 && !side)) P('lifeboat', x, side ? 10.75 : 0.25, rot, { y: 1.9 });
        P('davitWinch', x - 1.2, side ? 9.25 : 1.75, rot, { col: [0.36, 0.26] });
        void y;
      }
      P('funnel', 11.5, 5.5, 0, { col: [2.0, 2.0] });
      for (const [x, y] of [[9.2, 3.2], [13.8, 3.2], [9.2, 7.8], [13.8, 7.8]]) P('ventCowl', x, y, x < 11 ? 0.6 : -2.4, { col: [0.24, 0.24] });
      for (const [x, y] of [[2.2, 5.5], [6.5, 5.5], [27.5, 5.5]]) P('ventMushroom', x, y, 0, { col: [0.18, 0.18] });
      for (const [x, y] of [[1.3, 2.2], [1.3, 8.8], [29.2, 4.3], [29.2, 6.7], [26.5, 2.4], [26.5, 8.6]]) P('bollard', x, y, x > 20 ? H : 0, { col: [0.4, 0.2] });
      P('windlass', 28.0, 5.5, H, { col: [0.5, 0.75] });
      P('foremast', 27.2, 5.5, 0, { col: [0.25, 0.25] });
      P('shipBell', 27.2, 5.5, -H);
      P('raftCanister', 14.0, 2.35, 0, { col: [0.8, 0.35] }); P('raftCanister', 14.0, 8.65, PI, { col: [0.8, 0.35] });
      P('deckBench', 3.0, 7.6, PI, { col: [0.9, 0.3] }); P('deckBench', 7.0, 3.3, 0, { col: [0.9, 0.3] });
      P('deckLocker', 19.5, 2.4, PI, { col: [0.6, 0.3] }); P('deckLocker', 21.5, 8.6, 0, { col: [0.6, 0.3] });
      for (const [x, y, r] of [[3, 1.07, 0], [12, 1.07, 0], [20, 1.07, 0], [3, 9.93, PI], [12, 9.93, PI], [20, 9.93, PI]]) P('lifeRing', x, y, r);
      // deck lamps on the superstructure, mostly out
      K.light(15.1, 3.4, { kind: 'cage', y: 2.4, color: [1, 0.85, 0.6], intensity: 0.5, range: 7, flicker: 0.3 });
      K.light(15.1, 7.6, { kind: 'cage', y: 2.4, color: [1, 0.85, 0.6], intensity: 0.45, range: 7, broken: true });
      K.light(26.2, 3.4, { kind: 'cage', y: 2.4, color: [1, 0.85, 0.6], intensity: 0.4, range: 7 });
      K.light(27.2, 5.5, { kind: 'bulb', y: 7.0, color: [1, 1, 0.95], intensity: 0.8, range: 14 });      // masthead light
      K.light(9.5, 5.5, { kind: 'none', y: 0.5, color: [1, 0.5, 0.25], intensity: 0.15, range: 5 });       // the funnel's glow
      // ------------------------------------------- superstructure
      P('stairsDownShip', 15.6, 5.5, H, { col: [0.4, 0.4] });
      K.light(16.5, 5.5, { kind: 'cage', color: [1, 0.7, 0.45], intensity: 0.4, range: 6, flicker: 0.2 });
      // captain's cabin
      P('desk', 20.6, 3.55, PI, { col: [0.9, 0.43] }); P('chair', 20.6, 4.1, 0, { col: [0.25, 0.25] });
      P('bunks', 18.5, 3.5, H, { col: [0.42, 1.0], hide: true, hideKind: 'bed', hideAt: [0, 0], hideYaw: H });
      P('whisky', 20.1, 3.45, 0.4, { y: 0.785 });
      P('wardrobe', 21.7, 4.5, -H, { col: [0.3, 0.55] });
      K.light(20.0, 4.0, { kind: 'bulb', color: [1, 0.8, 0.5], intensity: 0.45, range: 5 });
      // radio room
      P('radioSet', 20.0, 7.6, PI, { col: [0.7, 0.3] }); P('chair', 20.0, 7.0, PI, { col: [0.25, 0.25] });
      K.light(19.5, 6.5, { kind: 'lamp', y: 1.2, color: [1, 0.4, 0.2], intensity: 0.3, range: 4 });
      // bridge
      P('helm', 24.5, 5.5, -H, { col: [0.25, 0.25] });
      P('telegraph', 25.3, 4.4, -H, { col: [0.2, 0.2] }); P('telegraph', 25.3, 6.6, -H, { col: [0.2, 0.2] });
      P('radarConsole', 25.2, 3.6, -H, { col: [0.32, 0.36] });
      P('chartTable', 22.8, 6.9, PI, { col: [0.75, 0.5] });
      P('cubicleDesk', 22.6, 3.6, 0, { col: [0.6, 0.4] });
      K.light(23.5, 5.5, { kind: 'bulb', color: [1, 0.25, 0.15], intensity: 0.35, range: 6 });
      // ------------------------------------------- passenger deck
      for (let x = 18.5; x <= 27; x += 2) for (const y of [17.8, 19.6, 21.4, 23.2]) if (!(x > 26 && (y < 18.5 || y > 23))) P('seatRow', x, y, H, { col: [0.3, 1.1] });
      P('lifejacket', 20.4, 19.4, 0.5, { y: 0.52 }); P('lifejacket', 24.4, 21.2, 2.0, { y: 0.52 }); P('lifejacket', 26.2, 17.8, 1.0, { y: 0.0 });
      for (const [x, y] of [[19.5, 18.5], [23.5, 18.5], [19.5, 22.5], [23.5, 22.5], [27.5, 20.5]]) K.light(x, y, { kind: 'panel', color: [0.95, 0.9, 0.8], intensity: 0.55, range: 8, zone: 1, flicker: x === 23.5 ? 0.4 : 0, broken: x === 19.5 && y > 20 });
      // cafeteria
      P('cafeCounter', 10.6, 18.5, H, { col: [0.36, 1.5] });
      for (const [x, y] of [[13, 17.8], [15.2, 17.8], [13, 19.6], [15.2, 19.6]]) P('cafTable', x, y, 0, { col: [1.2, 0.45] });
      K.light(13.5, 18.5, { kind: 'panel', color: [1, 0.95, 0.85], intensity: 0.45, range: 7, zone: 1, flicker: 0.25 });
      // purser
      P('frontDesk', 11.5, 22.6, -H, { col: [0.35, 1.5] }); P('keyBoard', 10.07, 22.5, H, { wall: true, y: 1.5 });
      P('safe', 10.5, 24.4, 0, { col: [0.4, 0.37] });
      K.light(11.0, 23.0, { kind: 'bulb', color: [1, 0.85, 0.6], intensity: 0.35, range: 5 });
      // stair hall
      P('stairsUpShip', 14.5, 23.9, PI, { col: [0.6, 1.2] });
      P('stairsDownShip', 15.9, 21.6, -H, { col: [0.4, 0.4] });
      K.light(14.5, 22, { kind: 'cage', color: [1, 0.6, 0.35], intensity: 0.45, range: 6, flicker: 0.2 });
      // cabins: bunks and a little table each; some doors left open
      for (let x = 1; x <= 9; x++) {
        P('bunks', x + 0.5, 17.55, 0, { col: [1.0, 0.42], hide: x % 2 === 1, hideKind: 'bed', hideAt: [0, 0.1], hideYaw: PI });
        P('bunks', x + 0.5, 21.45, PI, { col: [1.0, 0.42], hide: x % 2 === 0, hideKind: 'bed', hideAt: [0, 0.1], hideYaw: PI });
      }
      for (const x of [2.5, 6.5]) K.light(x, 19.5, { kind: 'cage', color: [1, 0.8, 0.55], intensity: 0.35, range: 5, flicker: x > 5 ? 0.35 : 0 });
      // crew mess
      P('cafTable', 4.5, 23.3, 0, { col: [1.2, 0.45] }); P('kitchenCounter', 1.4, 23, H, { col: [1.2, 0.3] }); P('lockerBank', 8.5, 24.7, PI, { col: [1.0, 0.3], hide: true, hideKind: 'locker' });
      K.light(5, 23, { kind: 'panel', color: [0.9, 0.95, 1], intensity: 0.3, range: 6, broken: true });
      // ------------------------------------------- car deck
      const cars = [['sedan', 0x5a1418, 9, 31.2], ['wagon', 0x1d3a5c, 15, 31.2], ['van', 0xd8d4c8, 21, 31.2], ['sedan', 0x2a3a2a, 26.5, 31.2],
        ['pickup', 0x7a6a3a, 9.5, 33.0], ['sedan', 0x8a8a84, 22, 33.0],
        ['sedan', 0x4a2a1a, 10, 35.9], ['wagon', 0x3a3a3e, 16, 35.9], ['sedan', 0xb8ad90, 22, 35.9], ['van', 0x6a1a14, 27, 35.9],
        ['sedan', 0x2a2c30, 12, 37.6], ['pickup', 0x1d2a3a, 19, 37.6]];
      cars.forEach(([type, color, x, y], k) => K.vehicle(x, y, k % 3 === 1 ? PI : 0, { type, color, key: 'f' + k, plate: 'HS ' + (1200 + k * 37), rust: 0.3 + (k % 4) * 0.15, tilt: 0.02 }));
      // the flooded stern: cars half under water, one on its side against another
      K.vehicle(3.5, 31.5, 0.3, { type: 'sedan', color: 0x3a4a3a, key: 'fw1', y: -0.25, tilt: 0.12 });
      K.vehicle(4.5, 36.5, -0.2, { type: 'wagon', color: 0x7a7a70, key: 'fw2', y: -0.3, tilt: -0.08 });
      for (const [x, y] of [[9, 32], [16, 32], [23, 32], [9, 37], [16, 37], [23, 37], [4, 34]]) K.light(x, y, { kind: 'cage', color: [1, 0.55, 0.3], intensity: 0.45, range: 9, flicker: x === 16 ? 0.4 : 0, broken: x === 23 && y === 37 });
      P('stairsUpShip', 14.5, 30.4, 0, { col: [0.6, 1.2] });
      P('stairsDownShip', 2.4, 37.8, PI, { col: [0.4, 0.4] });
      // ------------------------------------------- engine room
      P('marineEngine', 7.5, 41.5, 0, { col: [3.1, 0.8] }); P('marineEngine', 7.5, 43.5, 0, { col: [3.1, 0.8] });
      P('workbench', 13.3, 40.6, PI, { col: [1.1, 0.4] });
      P('wallPipes', 8, 40.07, 0, { wall: true, y: 2.6 });
      P('toolLockers', 13.8, 43.5, -H, { col: [0.3, 0.6] });
      P('stairsUpShip', 2.5, 41.6, PI, { col: [0.6, 1.2] });
      for (const [x, y] of [[4, 42.5], [11, 42.5]]) K.light(x, y, { kind: 'cage', y: 4.4, color: [1, 0.4, 0.2], intensity: 0.4, range: 8, flicker: 0.3 });
      // ------------------------------------------- stairs between decks
      K.stairs([16.3, 5.5, -H, 'pr.stairsDown'], [15.5, 22.2, H, 'pr.stairsUp']);
      K.stairs([15.5, 21.4, -H, 'pr.stairsDown'], [14.5, 31.3, PI, 'pr.stairsUp']);
      K.stairs([2.5, 37.3, 0, 'pr.ladderDown'], [2.5, 40.6, PI, 'pr.ladderUp'], { sound: 'ladder' });
      // ------------------------------------------- spots
      K.spot('logPage', 20.3, 3.5, { h: 0.79 });
      K.spot('captainDesk', 20.9, 3.6, { h: 0.79 });
      K.spot('logbook', 22.8, 6.9, { h: 0.95 });
      K.spot('davitKey', 22.6, 3.4, { h: 0.78 });
      K.spot('bridgeKey', 18.4, 3.7, { h: 0.62 });
      K.spot('crank', 13.3, 40.55, { h: 0.97 });
      K.spot('winch2', 7.3, 1.85, { h: 1.0 });
      K.spot('radioLog', 20.4, 7.55, { h: 0.78 });
      K.spot('lounge', 22.5, 20.5, { h: 0 });
      K.spot('cafe', 13.0, 17.9, { h: 0.76 });
      K.spot('purser', 11.5, 22.5, { h: 1.12 });
      K.spot('cabin3', 3.5, 17.6, { h: 0.6 });
      K.spot('cabin6', 6.5, 21.4, { h: 0.6 });
      K.spot('mess', 4.5, 23.3, { h: 0.76 });
      K.spot('cardeck', 18, 33.2, { h: 0 });
      K.spot('engine', 12.5, 42.5, { h: 0 });
      K.spot('bell', 27.2, 5.9, { h: 1.6 });
      K.spot('drawing', 2.3, 24.4, { h: 0.0 });
      K.spot('notice', 15.07, 4.5, { h: 1.5, yaw: H });
      // creatures: seats in the lounge, the water, the open deck
      // passengers asleep in the seats (a seat row's seats sit 0.275 m apart either side of its middle)
      [[18.5, 17.8, -0.825], [20.5, 19.6, 0.275], [22.5, 17.8, 0.825], [22.5, 21.4, -0.275], [24.5, 19.6, -0.825], [24.5, 23.2, 0.275], [26.5, 19.6, 0.825], [20.5, 23.2, -0.275]]
        .forEach(([x, y, o]) => K.lair('passenger', x - 0.03, y + o / 3, { yaw: H }));
      for (const [x, y] of [[3, 32], [5, 34.5], [2.5, 36], [6, 31], [4, 41], [10.5, 42.5], [12.5, 44], [3, 44], [11, 40.4]]) K.lair('drowned', x, y);
      K.lair('bellman', 27.5, 7.5);
      K.trigger('engineIn', 2, 40, 14, 44);
      K.trigger('lounge', 17, 17, 29, 24);
      K.trigger('deckFore', 26, 1, 30, 9);
      K.room('waterZone', 1, 30, 9, 38); K.room('engineZone', 1, 39, 15, 45); K.room('passDeck', 1, 17, 29, 24);
      L.meta.rooms.waterZone.pad = 0;
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
