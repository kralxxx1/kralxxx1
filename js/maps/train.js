/* Chapter 7 map: the Nordlys Express, the night sleeper north, 19 December 1990. Five cars and the
   locomotive end to end, one cell wide (3 m): three sleeping cars, the dining car, the baggage car, the
   engine room and the cab, with gangways between them over the coupling gaps. The night goes past the
   windows (the chapter script moves the snow, the trees and the poles; the train itself stands still).
   Far off on the same plan, the platform at Brenna where it all starts, with the train seen from
   outside. 53 x 34 cells of 3 m. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const MAPS = PB.Maps || (PB.Maps = {});
  const H = Math.PI / 2, PI = Math.PI;
  const MapDraw = (...a) => PB.Authored.MapDraw(...a);
  // cars: [first cell, last cell, region]
  const CARS = [[1, 8, '3'], [10, 17, '2'], [19, 26, '1'], [28, 35, 'D'], [37, 44, 'B'], [46, 49, 'E'], [50, 51, 'L']];
  const GAPS = [9, 18, 27, 36, 45];
  MAPS.trainCars = CARS;

  function plan() {
    const D = MapDraw(53, 34);
    // snow either side of the train, so the storm can be seen going past
    D.fill(0, 0, 52, 0, 'Y').fill(0, 2, 52, 3, 'Y');
    for (const [a, b, ch] of CARS) D.fill(a, 1, b, 1, ch);
    for (const x of GAPS) D.set(x, 1, 'g');
    D.set(0, 1, 'Y').set(52, 1, 'Y');
    // windows all along both sides of the passenger cars; the gangways are closed bellows
    for (const [a, b, ch] of CARS) for (let x = a; x <= b; x++) {
      if (ch === 'B' || ch === 'E') continue;
      D.edge(x, 1, 0, 'w').edge(x, 1, 2, 'w');
    }
    D.edge(50, 1, 0, 'w').edge(51, 1, 0, 'w').edge(50, 1, 2, 'w').edge(51, 1, 2, 'w').edge(51, 1, 1, 'w');
    // end doors between cars and gangways
    for (const x of GAPS) { D.edge(x, 1, 3, 'd'); D.edge(x, 1, 1, 'd'); }
    D.edge(49, 1, 1, 'm');                                   // engine room to cab
    D.edge(1, 1, 3, '-');                                    // the very back of the train
    D.border('Y', 'i');
    // ------------------------------------------------ the platform at Brenna, far off on the plan
    D.fill(8, 28, 32, 31, 'P');                              // platform, under snow
    D.fill(14, 31, 18, 32, 'W');                             // waiting room
    D.fill(8, 27, 32, 27, 'T');                              // the train standing at the platform (solid)
    D.join('P', 'T');
    D.edge(16, 31, 0, 'd');
    D.border('P', 'i');
    return D.grid();
  }

  MAPS.train = {
    ceil: 3,
    allowIslands: true,
    styles: {
      snow: { outdoor: true, floor: 'snow', wall: 'logWall', h: 9, step: 'snow' },
      platform: { outdoor: true, floor: 'snow', floorTint: 0xb8bcc0, wall: 'concreteWall', h: 9, step: 'snow' },
      sleeper: { wall: 'woodPanel', wallTint: 0x9a7a5a, floor: 'trainCarpet', floorTint: 0x5a3a3a, ceil: 'plaster', ceilTint: 0xb8b0a0, h: 2.45, siding: 'shipPaint', sidingTint: 0x1e2c48, trimH: 0.08 },
      dining: { wall: 'woodPanel', wallTint: 0xa8865a, floor: 'trainCarpet', floorTint: 0x6a2a24, ceil: 'plaster', ceilTint: 0xc8bea8, h: 2.5, siding: 'shipPaint', sidingTint: 0x1e2c48, trimH: 0.1, wainscot: { mat: 'woodPanel', tint: 0x5a3a24, h: 0.9 } },
      baggage: { wall: 'corrugated', wallTint: 0x7a7e78, floor: 'boards', floorTint: 0x5a4a3a, ceil: 'corrugated', ceilTint: 0x5a5e58, h: 2.6, siding: 'shipPaint', sidingTint: 0x1e2c48 },
      gangway: { wall: 'rustSteel', wallTint: 0x2a2a2a, floor: 'steelDeck', floorTint: 0x5a5a58, ceil: 'rustSteel', ceilTint: 0x1a1a1a, h: 2.3, step: 'grating' },
      engine: { wall: 'shipPaint', wallTint: 0x6a7068, floor: 'steelDeck', floorTint: 0x5a5e5a, ceil: 'shipPaint', ceilTint: 0x4a4e4a, h: 2.7, siding: 'shipPaint', sidingTint: 0x9a1e1a },
      cab: { wall: 'shipPaint', wallTint: 0x7a7a70, floor: 'steelDeck', floorTint: 0x4a4a48, ceil: 'plaster', ceilTint: 0x66665e, h: 2.6, siding: 'shipPaint', sidingTint: 0x9a1e1a },
      waiting: { wall: 'woodPanel', wallTint: 0x9a8a6a, floor: 'boards', ceil: 'planks', ceilTint: 0x6a5a48, h: 3.0, siding: 'planks', sidingTint: 0x8a2a1e },
    },
    regions: {
      Y: { style: 'snow', tag: 'trackside' }, P: { style: 'platform', tag: 'platform' }, T: { style: 'platform', solid: 'rack' }, W: { style: 'waiting', tag: 'waiting' },
      3: { style: 'sleeper', tag: 'car3', zone: 1 }, 2: { style: 'sleeper', tag: 'car2', zone: 1 }, 1: { style: 'sleeper', tag: 'car1', zone: 1 },
      D: { style: 'dining', tag: 'dining', zone: 1 }, B: { style: 'baggage', tag: 'baggage', zone: 2 }, E: { style: 'engine', tag: 'engine', zone: 2 }, L: { style: 'cab', tag: 'cab', zone: 2 },
      g: { style: 'gangway', tag: 'gangway' },
    },
    doors: {},
    get grid() { return plan(); },
    // on the platform at Brenna in the snow, the train along the platform edge
    spawn: [12.5, 29.5, -H + 0.3],
    build(L, K) {
      const P = (t, x, y, r, o) => K.prop(t, x, y, r, o), r = K.rng;
      L.meta.zonesOn = [0, 1, 2, 3];
      L.meta.weather = {
        sky: [0.004, 0.0045, 0.0055],
        dome: { zenith: [0.005, 0.006, 0.008], horizon: [0.02, 0.022, 0.026], moon: null, stars: 0, cloud: 1, silH: 0.18, silCol: [0.008, 0.009, 0.011] },
        ground: 'snow', silhouette: 'mountains', precip: 'snow',
      };
      // ------------------------------------------- the platform
      for (const x of [10.2, 18.4, 26.6]) P('carExterior', x, 27.55, 0, { fixed: true });
      P('locoExterior', 33.4, 27.55, 0, { fixed: true });
      for (const x of [10, 15, 20, 25, 30]) { P('platformLamp', x, 28.3, PI, { col: [0.1, 0.1] }); K.light(x, 28.55, { kind: 'none', y: 4.0, color: [1, 0.82, 0.55], intensity: 0.38, range: 10, zone: 3, flicker: x === 20 ? 0.4 : 0 }); }
      P('stationSign', 18.5, 30.6, 0, { col: [1.4, 0.1] });
      P('routeBoard', 15.5, 30.98, PI, { wall: true, y: 1.6 });
      P('stationBench', 12, 30.4, PI, { col: [0.8, 0.3] }); P('stationBench', 24, 30.4, PI, { col: [0.8, 0.3] });
      for (const [x, y] of [[9, 31], [31, 30.6], [27, 31.3]]) P('snowPile', x, y, r.range(0, 6), { col: [1.0, 0.8], sx: 0.8, sy: 0.6, sz: 0.8 });
      P('stationBench', 16.5, 32.6, 0, { col: [0.8, 0.3] }); K.light(16.5, 31.8, { kind: 'bulb', color: [1, 0.8, 0.5], intensity: 0.25, range: 5, zone: 3 });
      // ------------------------------------------- inside the train
      const carOf = ch => CARS.find(c => c[2] === ch);
      // sleeping cars: a vestibule at each end, nine compartments in between
      const COMP = []; // [car, index, x, open]
      // compartments whose doors are shut and stay shut; the sleepers' and Lina's are open
      const SHUT = new Set(['30', '33', '37', '21', '25', '28', '12', '15', '18']);
      const SLEEP = new Set(['31', '34', '22', '27', '13', '16']);
      for (const ch of ['3', '2', '1']) {
        const [a] = carOf(ch), x0 = a * 3;
        for (let k = 0; k < 9; k++) {
          const cx = x0 + 3.0 + k * 2.0 + 1.0, open = !SHUT.has(ch + k);
          // an empty compartment: you can get under the lower bunk
          const hide = open && !SLEEP.has(ch + k) && ch + k !== '24' ? { hide: true, hideAt: [0.1, -1.05], hideEye: 0.22 } : {};
          P(open ? 'compartment' : 'compartmentShut', cx / 3, 1.5, 0, Object.assign({ fixed: true }, hide));
          // colliders: the two partitions, the corridor wall either side of the doorway, the lower bunk
          K.prop('collider', (cx - 1.0) / 3, 4.0 / 3, 0, { col: [0.03, 0.95] });
          K.prop('collider', (cx - 0.675) / 3, 4.95 / 3, 0, { col: [0.33, 0.04] });
          K.prop('collider', (cx + 0.675) / 3, 4.95 / 3, 0, { col: [0.33, 0.04] });
          if (!open) K.prop('collider', cx / 3, 4.97 / 3, 0, { col: [0.36, 0.04] });
          K.prop('collider', cx / 3, 3.42 / 3, 0, { col: [0.95, 0.37] });
          P('corridorKit', cx / 3, 1.5, 0, { fixed: true });
          COMP.push([ch, k, cx, open]);
        }
        K.prop('collider', (x0 + 21.0) / 3, 4.0 / 3, 0, { col: [0.03, 0.95] });
        K.light((x0 + 1.5) / 3, 1.75, { kind: 'panel', color: [1, 0.85, 0.65], intensity: 0.15, range: 5, zone: 1, flicker: ch === '2' ? 0.3 : 0.05 });
        for (let k = 0; k < 3; k++) K.light((x0 + 6 + k * 6) / 3, 1.82, { kind: 'panel', color: [1, 0.8, 0.55], intensity: 0.11, range: 4.5, zone: 1, broken: (k + ch.charCodeAt(0)) % 3 === 0, flicker: k === 1 ? 0.25 : 0 });
      }
      L.meta.compartments = COMP;
      // dining car: six bays of tables either side of the aisle, the galley at the front end
      {
        const [a] = carOf('D'), x0 = a * 3;
        for (let k = 0; k < 6; k++) {
          const cx = x0 + 2.5 + k * 2.6;
          P('diningBay', cx / 3, 1.5, 0, { fixed: true }); P('diningBay', cx / 3, 1.5, PI, { fixed: true });
          K.prop('collider', cx / 3, 3.55 / 3, 0, { col: [0.9, 0.5] }); K.prop('collider', cx / 3, 5.45 / 3, 0, { col: [0.9, 0.5] });
          K.light(cx / 3, (4.5 - 1.25) / 3, { kind: 'none', y: 1.1, color: [1, 0.7, 0.4], intensity: 0.16, range: 3, zone: 1, flicker: k === 3 ? 0.5 : 0.04 });
          K.light(cx / 3, (4.5 + 1.25) / 3, { kind: 'none', y: 1.1, color: [1, 0.7, 0.4], intensity: 0.16, range: 3, zone: 1, broken: k === 1 });
        }
        P('galley', (x0 + 22.3) / 3, 1.5 - 0.6 / 3, 0, { col: [1.2, 0.3] });
      }
      // baggage car: racks, mail sacks, a bicycle, crates, the conductor's desk
      {
        const [a] = carOf('B'), x0 = a * 3;
        for (const k of [0, 1, 2]) { P('baggageRack', (x0 + 4 + k * 6) / 3, (4.5 - 0.95) / 3, 0, { col: [1.3, 0.4] }); }
        P('mailSack', (x0 + 7) / 3, 1.75, 0.4, {}); P('mailSack', (x0 + 7.6) / 3, 1.8, 1.2, {});
        P('bicycle', (x0 + 13) / 3, 1.82, 0.05, {});
        P('crateStack', (x0 + 18) / 3, 1.8, 0.2, { col: [0.55, 0.55] });
        P('suitcasePile', (x0 + 10) / 3, 1.8, 0.4, {});
        P('conductorDesk', (x0 + 21.5) / 3, 1.75, PI, { col: [0.55, 0.3] });
        P('staffLockers', (x0 + 22.8) / 3, 3.3 / 3, 0, { col: [0.6, 0.25] });
        K.light((x0 + 12) / 3, 1.5, { kind: 'cage', color: [1, 0.8, 0.5], intensity: 0.22, range: 6, zone: 2, flicker: 0.3 });
        K.light((x0 + 21.5) / 3, 1.5, { kind: 'bulb', color: [1, 0.82, 0.55], intensity: 0.2, range: 4, zone: 2 });
      }
      // the locomotive: the engine in its room, the cab with two seats and the console
      {
        const [a] = carOf('E'), x0 = a * 3;
        P('locoEngine', (x0 + 6) / 3, 1.5 - 0.35 / 3, 0, { col: [2.0, 0.6] });
        K.light((x0 + 3) / 3, 1.75, { kind: 'cage', color: [1, 0.7, 0.4], intensity: 0.25, range: 5, zone: 2, flicker: 0.4 });
        const [c] = carOf('L'), cx0 = c * 3;
        P('locoConsole', (cx0 + 5.1) / 3, 1.5, -H, { col: [1.2, 0.35] });
        P('cabSeat', (cx0 + 4.0) / 3, 1.3, -H, { col: [0.25, 0.25] }); P('cabSeat', (cx0 + 4.0) / 3, 1.75, -H, { col: [0.25, 0.25] });
        K.light((cx0 + 4.8) / 3, 1.5, { kind: 'none', y: 1.2, color: [0.6, 0.8, 1.0], intensity: 0.2, range: 3, zone: 2 });
      }
      // gangways: bellows and the gap in the floor
      for (const x of GAPS) {
        P('gangway', x + 0.5, 1.5, 0, { fixed: true });
        K.prop('collider', x + 0.5, 3.4 / 3, 0, { col: [1.5, 0.42] }); K.prop('collider', x + 0.5, 5.6 / 3, 0, { col: [1.5, 0.42] });
      }
      // ------------------------------------------------------------ spots
      const comp = (ch, k) => COMP.find(c => c[0] === ch && c[1] === k);
      const c24 = comp('2', 4);
      K.spot('linaTicket', c24[2] / 3, 3.62 / 3, { h: 0.04 });
      K.spot('ticket', (carOf('D')[0] * 3 + 2.5 + 3 * 2.6) / 3, 3.55 / 3, { h: 0.78 });
      K.spot('punch', (carOf('B')[0] * 3 + 21.2) / 3, 1.72, { h: 0.79 });
      K.spot('brake', (carOf('L')[0] * 3 + 4.85) / 3, 5.4 / 3, { h: 1.35 });
      K.spot('board', 22.13, 28.15, { h: 1.3 });
      K.spot('boarded', (carOf('1')[0] * 3 + 1.2) / 3, 1.6, { h: 0 });
      K.spot('route', 15.5, 30.7, { h: 1.6 });
      K.spot('inquiry', (carOf('B')[0] * 3 + 21.8) / 3, 1.78, { h: 0.79 });
      K.spot('linaLetter', comp('2', 4)[2] / 3, 3.42 / 3, { h: 0.6 });
      K.spot('menu', (carOf('D')[0] * 3 + 2.5 + 2.6) / 3, 5.45 / 3, { h: 0.78 });
      K.spot('saether', comp('1', 0)[2] / 3, 3.42 / 3, { h: 1.6 });
      K.spot('waiter', (carOf('D')[0] * 3 + 22.0) / 3, 1.3, { h: 0.92 });
      K.spot('paper', (carOf('D')[0] * 3 + 2.5 + 4 * 2.6) / 3, 5.45 / 3, { h: 0.78 });
      K.spot('docket', (carOf('B')[0] * 3 + 7.3) / 3, 5.3 / 3, { h: 0.5 });
      K.spot('notice', 16.5, 32.55, { h: 0.46 });
      K.spot('drawing', comp('3', 6)[2] / 3, 3.42 / 3, { h: 0.6 });
      K.spot('cabLog', (carOf('L')[0] * 3 + 4.6) / 3, 1.25, { h: 1.05 });
      // ------------------------------------------------------------ creatures
      for (const [ch, k] of [['3', 1], ['3', 4], ['2', 2], ['2', 7], ['1', 3], ['1', 6]]) { const c = comp(ch, k); K.lair('sleeper', c[2] / 3, 3.42 / 3, { yaw: 0 }); }
      for (const x of GAPS) K.lair('underhand', x + 0.5, 1.5);
      K.lair('conductor', (carOf('B')[0] * 3 + 4) / 3, 1.75);
      for (const [a, b, ch] of CARS) K.trigger('car' + ch, a, 1, b, 1);
      for (const x of GAPS) K.trigger('gap' + x, x, 1, x, 1);
      K.room('train', 1, 1, 51, 1);
      // boarding is a scripted moment; for the item placer the platform and car 1 are joined
      K.link(22, 28, 19, 1);
      // things people leave on trains: on compartment tables, dining tables, the crates, the cab
      for (const [ch, k] of [['3', 2], ['3', 8], ['2', 0], ['2', 6], ['1', 1], ['1', 7]]) { const c = comp(ch, k); K.spot('sup', c[2] / 3, 3.12 / 3, { h: 0.8 }); }
      for (const k of [0, 2, 5]) K.spot('sup', (carOf('D')[0] * 3 + 2.5 + k * 2.6) / 3, (k % 2 ? 5.45 : 3.55) / 3, { h: 0.78 });
      K.spot('sup', (carOf('B')[0] * 3 + 18) / 3, 1.8, { h: 1.42 });
      K.spot('sup', (carOf('E')[0] * 3 + 1.0) / 3, 1.8, { h: 0.0 });
      K.spot('sup', 16.0, 32.6, { h: 0.46 });
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
