/* Chapter 8 map: Falk's Carnival on Halvard harbour, the night of Sunday 30 September 1984, the last night
   of the season, after closing. The fence round the fairground, the entrance arch and its chained gate on
   the harbour road; the midway of stalls under festoon lights up to the carousel; the big wheel by the
   quay fence with the harbour and the cranes behind it; the funhouse (lobby, mirror maze, barrel, the
   tilted room, the workroom at the back) with the empty glass booth of its laughing automaton out front;
   the ghost train, burned the night before (its station, the U of track inside, the operator's cabin at
   the back where the fire started); the show trailers, and Pipo's, with the light still on at the
   mirror. 46 x 40 cells of 3 m. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const MAPS = PB.Maps || (PB.Maps = {});
  const H = Math.PI / 2, PI = Math.PI;
  const MapDraw = (...a) => PB.Authored.MapDraw(...a);

  function plan() {
    const D = MapDraw(46, 40);
    D.fill(0, 0, 45, 2, 'Q');                                // the quay, outside the fence
    D.fill(1, 3, 44, 37, 'G');                               // the fairground, asphalt
    D.fill(0, 38, 45, 39, 'R');                              // the harbour road, outside the gate
    D.fill(0, 3, 0, 37, 'R'); D.fill(45, 3, 45, 37, 'R');
    D.fill(31, 21, 43, 31, 'g');                             // the trailer park: gravel
    // ------------------------------------------------ the funhouse
    D.fill(3, 6, 11, 13, 'V');                               // (inside the walls nothing but void...)
    D.fill(9, 8, 11, 11, 'L');                               // lobby
    D.fill(5, 6, 8, 13, 'M');                                // mirror maze
    D.fill(9, 6, 11, 7, 'B');                                // the barrel
    D.fill(9, 12, 11, 13, 'T');                              // the tilted room
    D.fill(3, 6, 4, 8, 'W');                                 // workroom
    // ------------------------------------------------ the ghost train
    D.fill(31, 7, 41, 11, 'V');
    D.fill(31, 8, 40, 8, 'X'); D.fill(40, 8, 40, 10, 'X'); D.fill(31, 10, 40, 10, 'X');   // the track's U
    D.fill(32, 9, 39, 9, 'Y'); D.fill(33, 7, 38, 7, 'Y'); D.fill(33, 11, 38, 11, 'Y');    // the scenes along it
    D.fill(41, 8, 41, 10, 'O');                              // the operator's cabin, burned out
    // ------------------------------------------------ Pipo's trailer
    D.fill(37, 25, 38, 25, 'P');
    D.join('G', 'g');
    D.join('L', 'M', 'T');
    D.join('X', 'Y');
    // the fence round the fair; past the quay and the road, nothing
    D.hline(3, 1, 44, 'f'); D.hline(38, 1, 44, 'f'); D.vline(1, 3, 37, 'f'); D.vline(45, 3, 37, 'f');
    D.border('QRGg', 'i');
    // funhouse: in through the face under the arch, the rooms joined as the walk goes
    D.edge(11, 9, 1, ' ');                                   // the entrance under the facade
    D.edge(9, 9, 3, ' ');                                    // lobby → maze
    D.edge(10, 8, 0, 'd');                                   // lobby → barrel
    D.edge(10, 11, 2, ' ');                                  // lobby → tilted room
    D.edge(5, 7, 3, 'd');                                    // maze → workroom
    D.edge(8, 12, 1, ' ');                                   // maze → tilted room
    D.edge(11, 13, 1, 'd');                                  // tilted room → out
    D.edge(11, 6, 1, 'd');                                   // barrel → out (the exit, past the barrel)
    // the maze's own walls (where the mirrors hang)
    D.edge(6, 6, 1, '|').edge(6, 7, 1, '|').edge(5, 8, 2, '-').edge(6, 8, 2, '-').edge(8, 7, 2, '-')
      .edge(7, 9, 3, '|').edge(7, 10, 3, '|').edge(6, 10, 2, '-').edge(8, 10, 2, '-').edge(5, 11, 1, '|')
      .edge(6, 12, 2, '-').edge(7, 12, 2, '-').edge(8, 11, 3, '|').edge(9, 8, 3, '|').edge(9, 10, 3, '|').edge(9, 11, 3, '|');
    // separate the lobby from the maze except at its doorway, the tilted room from the lobby except its arch
    D.edge(9, 12, 0, '-').edge(11, 12, 0, '-').edge(9, 13, 3, '|');
    // ghost train: two swing doors from the station; the scenes seen over low rails from the track
    D.edge(31, 8, 3, 'J').edge(31, 10, 3, 'K');
    for (let x = 32; x <= 39; x++) { D.edge(x, 9, 0, x % 3 ? 'l' : 'r'); D.edge(x, 9, 2, x % 3 === 1 ? 'r' : 'l'); }
    for (let x = 33; x <= 38; x++) { D.edge(x, 7, 2, x % 2 ? 'l' : '-'); D.edge(x, 11, 0, x % 2 ? '-' : 'l'); }
    D.edge(40, 9, 1, 'd');                                   // the cabin door
    // Pipo's trailer: door and windows
    D.edge(37, 25, 0, 'd').edge(38, 25, 0, 'w').edge(38, 25, 1, 'w').edge(37, 25, 2, 'w');
    return D.grid();
  }

  MAPS.carnival = {
    ceil: 3,
    allowIslands: true,
    styles: {
      ground: { outdoor: true, floor: 'asphalt', floorTint: 0x5a5a5e, wall: 'concreteWall', h: 9, step: 'concrete' },
      gravel: { outdoor: true, floor: 'gravel', floorTint: 0x6a665e, wall: 'concreteWall', h: 9, step: 'gravel' },
      quay: { outdoor: true, floor: 'concreteFloor', floorTint: 0x5a5c5e, wall: 'concreteWall', h: 9, step: 'concrete' },
      road: { outdoor: true, floor: 'asphalt', floorTint: 0x3a3a3e, wall: 'concreteWall', h: 9, step: 'concrete' },
      lobby: { wall: 'plaster', wallTint: 0x3a1a4a, floor: 'tile', floorTint: 0x7a7088, ceil: 'plaster', ceilTint: 0x1a0a22, h: 4.0, siding: 'planks', sidingTint: 0x5a2a5a, parapet: 1.2, trimH: 0.12 },
      maze: { wall: 'plaster', wallTint: 0x22202a, floor: 'boards', floorTint: 0x3a2a3a, ceil: 'plaster', ceilTint: 0x0e0c12, h: 3.0, siding: 'planks', sidingTint: 0x5a2a5a, parapet: 2.2 },
      barrel: { wall: 'plaster', wallTint: 0x5a1a1a, floor: 'boards', floorTint: 0x4a2a22, ceil: 'plaster', ceilTint: 0x1a0a0a, h: 3.2, siding: 'planks', sidingTint: 0x5a2a5a, parapet: 2.0 },
      tilt: { wall: 'wallpaperFloral', wallTint: 0x8a6a8a, floor: 'vinyl', floorTint: 0x8a8a8a, ceil: 'plaster', ceilTint: 0x3a2a3a, h: 3.0, siding: 'planks', sidingTint: 0x5a2a5a, parapet: 2.2 },
      work: { wall: 'planks', wallTint: 0x6a5a48, floor: 'boards', floorTint: 0x4a3a2a, ceil: 'planks', ceilTint: 0x3a2e24, h: 2.8, siding: 'planks', sidingTint: 0x5a2a5a, parapet: 2.4 },
      ride: { wall: 'plaster', wallTint: 0x1a1c1a, floor: 'concreteFloor', floorTint: 0x2a2a28, ceil: 'plaster', ceilTint: 0x0a0a0a, h: 3.6, siding: 'planks', sidingTint: 0x1a2a1a, parapet: 1.4 },
      scene: { wall: 'plaster', wallTint: 0x1a1e22, floor: 'mud', floorTint: 0x2a2620, ceil: 'plaster', ceilTint: 0x080808, h: 3.6, siding: 'planks', sidingTint: 0x1a2a1a, parapet: 1.4 },
      cabin: { wall: 'planks', wallTint: 0x1a1612, floor: 'boards', floorTint: 0x1a1410, ceil: 'planks', ceilTint: 0x0a0806, h: 2.6, siding: 'planks', sidingTint: 0x1a1a14, parapet: 2.4 },
      trailer: { wall: 'woodPanel', wallTint: 0xa88a62, floor: 'linoleum', floorTint: 0x7a5a4a, ceil: 'plaster', ceilTint: 0xc8b898, h: 2.3, siding: 'planks', sidingTint: 0xd8d0b8, parapet: 0.15, trimH: 0.08 },
    },
    regions: {
      G: { style: 'ground', tag: 'fair' }, g: { style: 'gravel', tag: 'trailers' }, Q: { style: 'quay', tag: 'quay' }, R: { style: 'road', tag: 'road' },
      V: { style: 'maze', solid: 'void' },
      L: { style: 'lobby', tag: 'lobby', zone: 1 }, M: { style: 'maze', tag: 'maze', zone: 1 }, B: { style: 'barrel', tag: 'barrel', zone: 1 }, T: { style: 'tilt', tag: 'tilt', zone: 1 }, W: { style: 'work', tag: 'workroom', zone: 1 },
      X: { style: 'ride', tag: 'ghost', zone: 3 }, Y: { style: 'scene', tag: 'ghost', zone: 3 }, O: { style: 'cabin', tag: 'cabin', zone: 3 },
      P: { style: 'trailer', tag: 'pipo', zone: 4 },
    },
    doors: {
      J: { id: 'ghostIn', kind: 'wood', nameKey: 'door.ghost' },
      K: { id: 'ghostOut', kind: 'wood', nameKey: 'door.ghost' },
    },
    get grid() { return plan(); },
    // just inside the arch, the midway going up toward the carousel
    spawn: [22.5, 35.6, 0],
    build(L, K) {
      const P = (t, x, y, r, o) => K.prop(t, x, y, r, o), r = K.rng;
      L.meta.zonesOn = [0, 1, 4];
      L.meta.weather = {
        sky: [0.004, 0.0045, 0.006],
        dome: { zenith: [0.006, 0.007, 0.01], horizon: [0.03, 0.03, 0.036], moon: null, stars: 0, cloud: 1, silH: 0.1, silCol: [0.01, 0.011, 0.014] },
        ground: 'asphalt', groundTint: 0x3a3a3e, silhouette: 'harbour', precip: 'rain', rainK: 0.3, wet: 1,
        sea: { y: -1.6, color: [0.008, 0.014, 0.02] },
      };
      // ------------------------------------------- the harbour beyond the north fence
      for (let x = 2; x < 44; x += 4.5) if (x < 25.5 || x > 34.5) P('bollard', x, 0.25, 0, { fixed: true });   // (none under the crane)
      P('container', 6, 1.2, 0, { fixed: true }); P('containerB', 6, 1.2, 0, { y: 2.6, fixed: true }); P('containerB', 12.5, 1.3, 0.04, { fixed: true });
      P('container', 37, 1.1, 0, { fixed: true }); P('containerB', 39.2, 1.2, 0, { fixed: true }); P('container', 39.2, 1.2, 0, { y: 2.6, fixed: true });
      P('dockCrane', 28, 0.6, 0.2, { fixed: true });
      // ------------------------------------------- the entrance: arch, kiosk, the chained gate
      P('entranceArch', 22.5, 37.95, 0, { fixed: true });
      P('gateChained', 22.5, 37.97, 0, { fixed: true });
      P('ticketKiosk', 19.6, 35.4, 0.3, { col: [1.0, 1.0] });
      P('stationBench', 25.6, 35.6, PI, { col: [0.8, 0.3] });
      // ------------------------------------------- the midway: stalls either side, festoons overhead
      P('candyStall', 17.4, 27, H, { col: [1.05, 1.55] }); P('hotdogStall', 17.4, 30.2, H, { col: [1.05, 1.55] }); P('duckStall', 17.4, 33.4, H, { col: [1.05, 1.55] });
      P('shootingStall', 27.6, 27, -H, { col: [1.05, 1.55] }); P('ringStall', 27.6, 30.2, -H, { col: [1.05, 1.55] }); P('highStriker', 27.4, 33.6, -H, { col: [0.6, 0.6] });
      // a bulb left burning in most of the stalls
      for (const [x, y, c] of [[17.6, 27, [1, 0.7, 0.85]], [17.6, 30.2, [1, 0.75, 0.5]], [27.4, 27, [0.8, 1, 0.7]], [27.4, 30.2, [1, 0.8, 0.5]], [17.6, 33.4, [0.7, 0.85, 1]]]) K.light(x, y, { kind: 'none', y: 2.3, color: c, intensity: 0.2, range: 6, flicker: x > 20 && y > 29 ? 0.4 : 0.05 });
      P('balloonBunch', 18.1, 25.9, 0, {}); P('prizeBear', 26.9, 26.45, 0.9, { y: 0 });
      for (const y of [22, 25.5, 29, 32.5]) {
        P('lightPole', 19.4, y, 0, { col: [0.15, 0.15], fixed: true }); P('lightPole', 25.6, y, PI, { col: [0.15, 0.15], fixed: true });
        P('festoon6', 22.5, y, 0, { y: 5.75, fixed: true });
        K.light(22.5, y, { kind: 'none', y: 5.0, color: [1, 0.78, 0.48], intensity: 0.34, range: 11, flicker: y === 29 ? 0.5 : 0.04 });
      }
      for (const [x, y] of [[20.5, 24], [24.3, 28.6], [21.2, 31], [23.8, 34], [18.8, 21.6], [26.2, 22.4]]) P(r() < 0.5 ? 'popcornBox' : 'litterCup', x, y, r.range(0, 6), {});
      P('stationBench', 21.0, 23.7, 0, { col: [0.8, 0.3] });
      for (const [x, y] of [[21.5, 27], [23.5, 30.5], [20.5, 34.5], [22.5, 22.5], [14, 18], [30, 18], [22.5, 12]]) K.decal('oil', x, y, { size: 2.6, rot: x * y });
      // ------------------------------------------- the carousel and its organ
      // (the carousel itself is the chapter's: it turns when the organ plays)
      K.spot('carousel', 22.5, 18.5, { h: 0 });
      K.prop('collider', 22.5, 18.5, 0, { col: [6.2, 2.6] }); K.prop('collider', 22.5, 18.5, 0, { col: [2.6, 6.2] }); K.prop('collider', 22.5, 18.5, 0, { col: [4.6, 4.6] });
      P('bandOrgan', 27.3, 15.6, -H + 0.3, { col: [0.6, 1.25] });
      P('carouselLever', 26.4, 20.6, -H, { col: [0.3, 0.3] });
      K.light(22.5, 18.5, { kind: 'none', y: 4.3, color: [1, 0.8, 0.5], intensity: 0.42, range: 14, zone: 2 });
      K.light(22.5, 18.5, { kind: 'none', y: 3.6, color: [1, 0.75, 0.45], intensity: 0.14, range: 10 });
      // ------------------------------------------- the big wheel by the quay fence
      P('ferrisWheel', 22.5, 5.4, 0, { fixed: true });
      K.prop('collider', 22.5, 5.4, 0, { col: [2.1, 1.9] });
      for (const sx of [-1, 1]) K.prop('collider', 22.5 + sx * 2.05, 5.4, 0, { col: [0.3, 0.75] });
      P('wheelBooth', 26.6, 6.4, -H, { col: [0.7, 0.65] });
      K.light(22.5, 5.4, { kind: 'none', y: 12, color: [1, 0.85, 0.6], intensity: 0.26, range: 20, flicker: 0.1 });
      K.light(22.5, 6.6, { kind: 'none', y: 2.5, color: [1, 0.8, 0.55], intensity: 0.16, range: 8 });
      // ------------------------------------------- the funhouse: its face and the empty booth
      P('funFacade', 12.07, 9.5, H, { fixed: true });
      P('lotteBooth', 13.4, 12.6, H, { col: [0.75, 0.95] });
      K.light(13.6, 12.6, { kind: 'bulb', y: 3.2, color: [1, 0.6, 0.6], intensity: 0.2, range: 5, flicker: 0.6 });
      K.decal('crack', 13.9, 12.6, { size: 1.6 });
      // inside: mirrors on the maze walls, the barrel, the tilted room, the workroom's bench
      const mir = [[6.97, 6.5, -H], [6.97, 7.5, -H], [5.5, 8.97, PI], [6.5, 8.97, PI], [8.5, 7.97, PI], [7.03, 9.5, H], [7.03, 10.5, H], [6.5, 10.97, PI], [8.5, 10.97, PI],
        [5.97, 11.5, -H], [6.5, 12.97, PI], [7.5, 12.97, PI], [8.97, 11.5, -H], [5.03, 6.5, H], [5.03, 9.5, H], [5.03, 12.5, H], [8.97, 6.5, -H], [6.5, 6.03, 0], [7.5, 6.03, 0], [8.5, 13.97, PI], [5.5, 13.97, PI]];
      for (const [x, y, rr] of mir) P('mirrorPanel', x, y, rr, { wall: true });
      P('funBarrel', 10.0, 6.5, 0, { fixed: true });
      K.light(10, 6.5, { kind: 'bulb', y: 2.8, color: [1, 0.3, 0.3], intensity: 0.12, range: 5, zone: 1, flicker: 0.4 });
      for (const [x, y] of [[10.5, 9.5], [6.5, 7.5], [7.5, 11.5]]) K.light(x, y, { kind: 'bulb', y: 2.7, color: [0.8, 0.5, 1], intensity: 0.1, range: 5, zone: 1, flicker: 0.3, broken: x === 7.5 });
      K.light(10.5, 12.8, { kind: 'bulb', y: 2.6, color: [1, 0.85, 0.6], intensity: 0.12, range: 5, zone: 1 });
      P('workbench', 3.55, 6.45, 0, { col: [0.9, 0.35] });
      P('shelf', 3.05, 7.6, H, { wall: true });
      P('crateStack', 4.5, 8.5, 0.2, { col: [0.55, 0.55] });
      P('fuseBox', 4.97, 6.6, -H, { wall: true });
      K.light(3.8, 7.0, { kind: 'bulb', color: [1, 0.85, 0.6], intensity: 0.14, range: 4, zone: 1, flicker: 0.2 });
      // ------------------------------------------- the ghost train
      P('ghostFacade', 30.93, 9.5, -H, { fixed: true });
      for (const [y, id] of [[8, 'in'], [10, 'out']]) void id, P('rideTrack', 29.5, y + 0.5, 0, { fixed: true });
      P('rideTrack', 27.5, 8.5, 0, { fixed: true }); P('rideTrack', 27.5, 10.5, 0, { fixed: true }); P('rideTrack', 26.9, 9.5, H, { fixed: true });
      P('ghostCar', 29.0, 8.5, 0, { col: [0.8, 0.5] });
      P('controlBooth', 28.6, 9.55, -H, { col: [0.75, 0.9] });
      // inside: track all round the U, charred figures, coffins, cobwebs, the burned cabin at the back
      for (let x = 31; x <= 40; x++) { P('rideTrack', x + 0.5, 8.5, 0, { fixed: true }); P('rideTrack', x + 0.5, 10.5, 0, { fixed: true }); }
      P('rideTrack', 40.5, 9.5, H, { fixed: true });
      for (const [x, y, rr] of [[33.5, 9.4, 0.4], [36.5, 9.6, -0.3], [38.5, 9.4, 0.1], [34.5, 7.4, 0], [37.5, 11.6, PI]]) P('charFigure', x, y, rr, { col: [0.25, 0.25] });
      for (const [x, y, rr] of [[35.0, 7.5, 0.2], [34.0, 11.5, -0.1]]) P('coffinProp', x, y, rr, { col: [0.9, 0.45] });
      for (const [x, y] of [[32.5, 9.5], [35.5, 9.5], [39.5, 9.5], [36.5, 7.5], [35.5, 11.5]]) K.light(x, y, { kind: 'bulb', y: 2.6, color: x % 2 ? [0.4, 1, 0.4] : [1, 0.25, 0.2], intensity: 0.1, range: 4, zone: 3, flicker: 0.5 });
      P('desk', 41.5, 8.7, -H, { col: [0.35, 0.75] }); P('chair', 41.2, 9.4, 0.4, { col: [0.25, 0.25] }); P('bunks', 41.5, 10.4, H, { col: [0.45, 1.0] });
      for (const [x, y] of [[41.5, 9.5], [40.5, 8.5], [41.2, 10.2], [39.5, 10.5]]) K.decal('mold', x, y, { size: 2.8 });
      for (const [x, y] of [[41.5, 9.5], [40.5, 9.5], [39.5, 8.5], [38.5, 10.5]]) K.decal('ceilStain', x, y, { size: 3 });
      K.light(41.5, 9.2, { kind: 'none', y: 2.0, color: [1, 0.5, 0.25], intensity: 0.05, range: 3, zone: 3, flicker: 0.7 });
      // ------------------------------------------- the masks stall and the corner of the west fence
      P('maskStall', 6.5, 24.5, H, { col: [1.05, 1.55] });
      K.light(6.9, 24.5, { kind: 'bulb', y: 2.4, color: [1, 0.8, 0.5], intensity: 0.12, range: 5, flicker: 0.3 });
      P('stationBench', 9.5, 27, -H, { col: [0.3, 0.8] });
      // ------------------------------------------- the trailers; Pipo's, with the mirror lit
      for (const [x, y, rr] of [[33.5, 23.0, 0.05], [41.8, 23.4, -0.08], [33.8, 29.2, PI + 0.06], [41.2, 29.4, PI - 0.1]]) P('trailer', x, y, rr, { col: [3.0, 1.2] });
      P('trailerChassis', 38, 25.5, 0, { fixed: true });
      P('pipoSign', 37.5, 24.98, 0, { wall: true, y: 1.75 });
      P('trailerStep', 37.5, 24.85, 0, { col: [0.35, 0.25] });
      P('vanityMirror', 38.5, 25.85, PI, { col: [0.5, 0.25] });
      P('trailerBed', 37.4, 25.7, 0, { col: [0.95, 0.38] });
      P('costumeRack', 38.85, 25.2, 0, { col: [0.6, 0.15] });
      P('wigStand', 38.4, 25.85, 0, { y: 0.79 });
      P('clownShoes', 38.9, 25.6, 0.3, {});
      K.light(38.5, 25.75, { kind: 'none', y: 1.3, color: [1, 0.8, 0.55], intensity: 0.32, range: 6, zone: 4, flicker: 0.05 });
      for (const [x, y] of [[36, 27], [40, 26.5], [35.5, 25], [39.5, 22.8]]) P(r() < 0.5 ? 'crateStack' : 'barrel', x, y, r.range(0, 6), { col: [0.5, 0.5] });
      // ------------------------------------------- spots
      K.spot('fuse', 3.4, 6.45, { h: 0.92 });
      K.spot('fuseSocket', 28.6, 9.15, { h: 1.25 });
      K.spot('nose', 6.82, 24.5, { h: 1.07 });
      K.spot('mirror', 38.5, 25.72, { h: 1.15 });
      K.spot('ride', 28.2, 10.5, { h: 0.8 });
      K.spot('poster', 19.6, 35.0, { h: 1.55 });
      K.spot('closing', 22.0, 37.75, { h: 1.3 });
      K.spot('fireReport', 28.5, 9.75, { h: 1.1 });
      K.spot('kasper', 41.5, 8.7, { h: 0.78 });
      K.spot('ledger', 26.6, 6.4, { h: 1.05 });
      K.spot('rosa', 6.75, 25.2, { h: 1.07 });
      K.spot('hugo', 38.8, 25.8, { h: 0.8 });
      K.spot('fan', 37.3, 25.7, { h: 0.6 });
      K.spot('paper', 21.0, 23.7, { h: 0.47 });
      K.spot('drawing', 10.6, 13.6, { h: 0.0 });
      for (const [x, y, h] of [[3.6, 6.4, 0.92], [10.4, 9.0, 0.0], [17.9, 33.4, 1.06], [27.1, 30.2, 1.06], [41.6, 8.8, 0.78], [33, 26, 0], [9.5, 27.2, 0.45], [26.5, 35.4, 0.45], [12.5, 21, 0], [30, 14, 0]]) K.spot('sup', x, y, { h });
      // ------------------------------------------- creatures
      for (const [x, y] of [[21.5, 31.2], [24.6, 25.8], [8.2, 26.2], [10.2, 10.4], [6.4, 12.4], [14.5, 21.0]]) K.lair('mask', x, y);
      for (let k = 0; k < 4; k++) { const a = (k * 4 + 0.5) / 16 * PI * 2; K.lair('horse', 22.5 + Math.cos(a) * 4.8 / 3, 18.5 + Math.sin(a) * 4.8 / 3, { yaw: -a }); }
      K.lair('lotte', 15.5, 15.5);
      K.trigger('funhouse', 3, 6, 11, 13); K.trigger('ghost', 31, 7, 41, 11); K.trigger('trailer', 37, 25, 38, 25); K.trigger('booth', 12, 11, 14, 14);
      K.trigger('station', 26, 7, 30, 11); K.trigger('maskStall', 5, 23, 9, 26); K.trigger('maze', 5, 6, 8, 13);
      K.room('carousel', 19, 15, 26, 22);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
