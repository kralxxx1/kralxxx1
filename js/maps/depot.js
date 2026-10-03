/* Prologue map: Depot 9, the lost property office under Halvard Central Station, 02:56.
   Public hall with the counter, Ada's staff room behind the glass, the sorting room, the archive (tall
   back-to-back stacks of dated boxes, the freight elevator at the far end), Otto's office (locked
   since 1964) and the old records store behind it, a washroom and a kitchen. 16 x 12 cells. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const MAPS = PB.Maps || (PB.Maps = {});
  const H = Math.PI / 2, PI = Math.PI;

  MAPS.depot = {
    ceil: 3,
    styles: {
      public: { wall: 'subway', wallTint: 0xe6dcc0, floor: 'terrazzo', floorTint: 0xb8b0a0, ceil: 'plaster', ceilTint: 0xb8b2a4, h: 3.6, wainscot: { mat: 'subway', tint: 0x4f6a58, h: 1.3 }, trimH: 0 },
      staff: { wall: 'plaster', wallTint: 0xcfc8ae, floor: 'vinyl', floorTint: 0x9a9480, ceil: 'plaster', ceilTint: 0xb0aa98, h: 3.0, wainscot: { mat: 'woodPanel', h: 1.1 }, trimH: 0 },
      corridor: { wall: 'cinderblock', wallTint: 0xc8c4ae, floor: 'vinyl', floorTint: 0x7a7668, ceil: 'concreteWall', ceilTint: 0x8a8a84, h: 2.8, wainscot: { mat: 'subway', tint: 0x5a6a52, h: 1.2 } },
      archive: { wall: 'brick', wallTint: 0x8a7e74, floor: 'concreteFloor', floorTint: 0x8a867c, ceil: 'concreteWall', ceilTint: 0x6a6a66, h: 5.6 },
      otto: { wall: 'woodPanel', wallTint: 0xc8b8a0, floor: 'parquet', ceil: 'plaster', ceilTint: 0xa8a090, h: 3.0, trimH: 0.12 },
      store: { wall: 'plaster', wallTint: 0xb8b09a, floor: 'planks', floorTint: 0x8a7a68, ceil: 'plaster', ceilTint: 0x9a9488, h: 2.7 },
      sorting: { wall: 'brick', wallTint: 0xd0c8b0, floor: 'concreteFloor', ceil: 'concreteWall', ceilTint: 0x8a8a84, h: 3.6 },
      wash: { wall: 'subway', wallTint: 0xe8e8e0, floor: 'hexTile', ceil: 'plaster', ceilTint: 0xc8c8c0, h: 2.7 },
      kitchen: { wall: 'subway', wallTint: 0xd8e0cc, floor: 'linoleum', floorTint: 0x7a6a5a, ceil: 'plaster', ceilTint: 0xc0bcb0, h: 2.7 },
    },
    regions: {
      p: { style: 'public', tag: 'public' }, c: { style: 'staff', tag: 'staff', zone: 1 }, h: { style: 'corridor', tag: 'corridor', zone: 1 },
      a: { style: 'archive', tag: 'archive', zone: 2 }, A: { style: 'archive', solid: 'rack', zone: 2 }, o: { style: 'otto', tag: 'otto', zone: 3 },
      r: { style: 'store', tag: 'store', zone: 3 }, s: { style: 'sorting', tag: 'sorting', zone: 1 }, w: { style: 'wash', tag: 'wash', zone: 1 }, k: { style: 'kitchen', tag: 'kitchen', zone: 1 },
    },
    doors: {
      E: { id: 'elevator', kind: 'elevator', locked: true, nameKey: 'door.elevator', lockKey: 'lock.elevator' },
      O: { id: 'ottoDoor', kind: 'glass', width: 1.1, letter: 'SUPERINTENDENT', letterSub: 'DEPOT 9', locked: true, nameKey: 'door.otto', lockKey: 'lock.otto' },
      R: { id: 'storeDoor', kind: 'wood', style: 'panel2', color: 'doorPaintBrown' },
      '1': { id: 'archiveA', kind: 'metal', plate: 'ARCHIVE  A' }, '2': { id: 'archiveB', kind: 'metal', plate: 'ARCHIVE  B' },
      S: { id: 'staffDoor', kind: 'wood', style: 'glazed', color: 'doorPaintCream' }, C: { id: 'counterDoor', kind: 'wood', style: 'panel4', color: 'darkWood' },
      G: { id: 'concourseGate', kind: 'bars', locked: true, nameKey: 'door.concourse', lockKey: 'lock.concourse', beyond: 'stairsUpLit' },
    },
    grid: [
      '+-+-+-+-+-+-+-+-+-+-+-+-+-+-+E+-+',
      '|r r r r|a a a a a a a a a a a a|',
      '+ + + + + + + + + + + + + + + + +',
      '|r r r r|a A a A a A a A a A a a|',
      '+ + + + + + + + + + + + + + + + +',
      '|r r r r|a A a A a A a A a A a a|',
      '+-+-+R+-+ + + + + + + + + + + + +',
      '|o o o o|a A a A a A a A a A a a|',
      '+ + + + + + + + + + + + + + + + +',
      '|o o o o|a A a A a A a A a A a a|',
      '+ + + + + + + + + + + + + + + + +',
      '|o o o o|a a a a a a a a a a a a|',
      '+-+O+-+-+-+-+-+-+1+-+-+-+-+-+2+-+',
      '|h h h h h h h h h h h h h h h h|',
      '+-+-+-+-+-+-+S+-+-+-+d+-+-+d+-+-+',
      '|p p p p pCc c c c|s s s s|w w w|',
      '+ + + + + + + + + + + + + + + + +',
      '|p p p p pwc c c c|s s s s|w w w|',
      '+ + + + + + + + + + + + + +-+-+-+',
      '|p p p p pwc c c cws s s sdk k k|',
      '+ + + + + + + + + + + + + + + + +',
      '|p p p p plc c c c|s s s s|k k k|',
      '+ + + + + + + + + + + + + + + + +',
      '|p p p p pwc c c c|s s s s|k k k|',
      '+-+-+G+-+-+-+-+-+-+-+-+-+-+-+-+-+',
    ],
    // Ada at her desk behind the counter, facing the glass
    spawn: [6.6, 9.4, H],
    build(L, K) {
      const P = (t, x, y, r, o) => K.prop(t, x, y, r, o);
      // ---------------- staff room (behind the counter)
      P('desk', 6.55, 10.35, -H, { col: [0.9, 0.43] });
      P('chair', 6.0, 10.3, H, { col: [0.25, 0.25] });
      P('typewriter', 6.55, 10.05, -H, { y: 0.785 });
      P('deskLamp', 6.7, 10.75, -H);
      K.light(6.72, 10.62, { kind: 'lamp', y: 1.08, color: [1, 0.8, 0.5], intensity: 0.5, range: 4.5, zone: 0 });
      P('parcelChute', 7.55, 11.55, PI, { col: [0.4, 0.45] });
      P('staffLockers', 8.62, 7.6, -H, { col: [0.62, 0.27] });
      P('filing', 8.7, 8.6, -H, { col: [0.33, 0.3] });
      P('coatStand', 5.35, 7.35, 0, { col: [0.2, 0.2] });
      P('radiator', 7.0, 11.9, PI);
      P('lostShelf', 8.75, 10.2, -H, { col: [0.9, 0.24] });
      P('corkboard', 7.1, 7.03, 0, { wall: true, y: 1.6 });
      P('wallClock', 5.6, 7.03, 0, { wall: true, y: 2.2 });
      P('phone', 7.1, 10.45, -H, { y: 0.785 });
      P('suitcasePile', 7.9, 8.4, 0.3, { col: [0.6, 0.4] });
      // the counter itself: a run of oak counter along the glass, the staff side
      for (const y of [7.5, 8.5, 9.5, 10.5, 11.5]) if (y !== 7.5) P('counterTop', 5.12, y, -H);
      K.light(6.5, 8.5, { kind: 'globe', color: [1, 0.86, 0.62], intensity: 0.8, range: 7, flicker: 0.15, zone: 1 });
      K.light(7.5, 10.8, { kind: 'globe', color: [1, 0.86, 0.62], intensity: 0.6, range: 6, zone: 1, broken: true });
      // ---------------- public hall
      K.row('stationBench', 1.5, 8.1, 1.5, 10.9, 3, H, { col: [1.1, 0.32] });
      K.row('stationBench', 3.2, 8.1, 3.2, 10.9, 3, H, { col: [1.1, 0.32] });
      P('ticketDispenser', 4.4, 7.5, -H, { col: [0.18, 0.18] });
      P('stationClock', 2.5, 7.05, 0, { y: 2.5, wall: true });
      P('lostBoard', 0.07, 9.5, H, { wall: true, y: 1.55 });
      P('stationMap', 0.07, 7.8, H, { wall: true, y: 1.6 });
      P('umbrellaCage', 0.45, 11.4, H, { col: [0.5, 0.3] });
      P('trashCan', 4.6, 11.7, 0, { col: [0.2, 0.2] });
      P('radiator', 0.12, 10.6, H);
      K.light(1.5, 9.5, { kind: 'globe', color: [1, 0.86, 0.62], intensity: 0.7, range: 8, zone: 1 });
      K.light(3.5, 9.5, { kind: 'globe', color: [1, 0.86, 0.62], intensity: 0.7, range: 8, zone: 1, broken: true });
      K.light(2.5, 11.9, { kind: 'exitSign', y: 2.6, color: [0.3, 1, 0.4], intensity: 0.25, range: 4, zone: 0 });
      K.decal('oil', 2.2, 10.2, { size: 1.6, rot: 0.4 });
      // ---------------- corridor
      for (const x of [1.5, 5.5, 9.5, 13.5]) K.light(x, 6.5, { kind: 'cage', color: [1, 0.82, 0.55], intensity: 0.55, range: 6, zone: 1, flicker: x === 9.5 ? 0.35 : 0 });
      P('extinguisher', 3.9, 6.93, PI, { wall: true });
      P('radiator', 11.5, 6.9, PI);
      P('mailSack', 14.6, 6.4, 0.6, { col: [0.25, 0.22] });
      P('mailSack', 15.2, 6.6, -0.4, { col: [0.25, 0.22] });
      // ---------------- sorting room
      P('sortingTable', 10.8, 9.5, H, { col: [0.46, 1.5] });
      P('pigeonholes', 11.6, 7.25, 0, { col: [1.1, 0.25] });
      P('breakerPanel', 12.93, 8.6, -H, { wall: true, y: 1.5 });
      P('mailSack', 9.5, 11.4, 0.3, { col: [0.25, 0.22] }); P('mailSack', 9.9, 11.6, -1.0, { col: [0.25, 0.22] }); P('mailSack', 9.35, 10.9, 2, { col: [0.25, 0.22] });
      P('bicycle', 12.6, 11.4, 0.1, { col: [0.75, 0.2] });
      P('umbrellaCage', 9.5, 7.6, 0, { col: [0.5, 0.3] });
      P('suitcasePile', 12.4, 10.2, -H + 0.2, { col: [0.6, 0.45] });
      K.light(10.5, 8.5, { kind: 'hanging', color: [1, 0.9, 0.7], intensity: 0.8, range: 8, zone: 1 });
      K.light(11.5, 10.8, { kind: 'hanging', color: [1, 0.9, 0.7], intensity: 0.7, range: 7, zone: 1, flicker: 0.2 });
      // ---------------- washroom and kitchen
      P('sink', 15.6, 7.6, -H, { col: [0.3, 0.25] }); P('mirror', 15.93, 7.6, -H, { wall: true, y: 1.5 });
      P('toilet', 14.5, 7.4, 0, { col: [0.25, 0.35] });
      K.light(14.5, 8.0, { kind: 'bulb', color: [1, 0.9, 0.75], intensity: 0.5, range: 5, zone: 1 });
      P('kitchenCounter', 15.6, 10.4, -H, { col: [1.2, 0.3] });
      P('cafTable', 14.0, 10.5, H, { col: [0.45, 1.2] });
      P('waterCooler', 13.5, 11.7, 0, { col: [0.2, 0.2] });
      K.light(14.5, 10.5, { kind: 'globe', color: [1, 0.88, 0.7], intensity: 0.5, range: 6, zone: 1 });
      // ---------------- archive: back-to-back stacks in the solid columns, a ladder, the elevator
      for (const x of [5, 7, 9, 11, 13]) for (const y of [1, 2, 3, 4]) P('archiveStack', x + 0.5, y + 0.5, H);
      P('rollingLadder', 8.18, 2.6, H);
      P('rollingLadder', 11.82, 3.4, -H);
      P('scissorGate', 14.5, 0.12, 0);
      P('callPanel', 15.85, 0.5, -H, { wall: true, y: 1.3 });
      P('suitcasePile', 4.6, 5.2, 0.6, { col: [0.6, 0.45] });
      P('bicycle', 15.5, 4.6, -H + 0.2, { col: [0.2, 0.75] });
      P('mailSack', 4.5, 0.6, 0.3, { col: [0.25, 0.22] });
      // pendant lamps down the aisles, most of them dead
      const pend = [[4.5, 1.5], [6.5, 3.5], [8.5, 1.0], [10.5, 3.0], [12.5, 1.5], [14.5, 2.5], [6.5, 5.5], [10.5, 5.5], [14.5, 5.3]];
      pend.forEach(([x, y], k) => K.light(x, y, { kind: 'hanging', drop: 1.6, color: [1, 0.84, 0.6], intensity: 0.75, range: 9, zone: 2, broken: k % 3 === 1, flicker: k === 4 ? 0.4 : 0 }));
      K.light(14.5, 0.3, { kind: 'bulb', drop: 0.4, color: [1, 0.55, 0.3], intensity: 0.4, range: 5, zone: 0 });
      // ---------------- Otto's office and the records store
      P('desk', 1.6, 4.0, PI, { col: [0.9, 0.43] });
      P('chair', 1.6, 3.35, 0, { col: [0.25, 0.25] });
      P('deskLamp', 1.0, 4.1, PI);
      K.light(0.96, 4.0, { kind: 'lamp', y: 1.08, color: [0.7, 1, 0.75], intensity: 0.35, range: 3.5, zone: 3 });
      P('tubeTerminal', 3.7, 3.6, -H, { col: [0.25, 0.18] });
      P('filing', 0.35, 5.6, H, { col: [0.33, 0.3] });
      P('safe', 3.55, 5.5, -H, { col: [0.4, 0.37] });
      P('coatStand', 0.45, 3.4, 0, { col: [0.2, 0.2] });
      P('bookshelf', 2.0, 3.15, 0, { col: [1.1, 0.25] });
      P('radiator', 3.85, 4.7, -H);
      K.light(2.0, 4.5, { kind: 'globe', color: [1, 0.84, 0.6], intensity: 0.5, range: 6, zone: 3 });
      P('shelf', 0.4, 1.4, H, { col: [0.28, 1.3] });
      P('shelf', 3.6, 1.4, -H, { col: [0.28, 1.3] });
      P('suitcasePile', 2.0, 0.5, 0, { col: [0.6, 0.45] });
      P('typewriter', 3.6, 2.6, -H, { y: 0.0 });
      K.light(2.0, 1.5, { kind: 'bulb', color: [1, 0.8, 0.55], intensity: 0.4, range: 5, zone: 3, flicker: 0.25 });
      // ---------------- item spots
      K.spot('parcel', 7.55, 11.25, { h: 1.0 });
      K.spot('desk', 6.55, 10.6, { h: 0.79 });
      K.spot('locker', 8.4, 7.6, { h: 1.0 });
      K.spot('breaker', 12.86, 8.6, { h: 1.55, yaw: -H });
      K.spot('ledger', 9.96, 3.45, { x: 10, h: 1.35, yaw: -H });
      K.spot('ottoDesk', 1.6, 4.05, { h: 0.79 });
      K.spot('ottoDrawer', 1.25, 4.2, { h: 0.6 });
      K.spot('tube', 3.55, 3.6, { h: 1.2, yaw: -H });
      K.spot('elevatorKey', 1.95, 4.15, { h: 0.79 });
      K.spot('store', 2.6, 0.55, { h: 0.0 });
      K.spot('kitchen', 14.0, 10.3, { h: 0.76 });
      K.spot('publicBoard', 0.15, 9.5, { h: 1.55, yaw: H });
      K.spot('sorting', 10.8, 10.4, { h: 0.94 });
      K.spot('wcMirror', 15.9, 7.6, { h: 1.5, yaw: -H });
      K.spot('elevator', 14.5, 0.8, { h: 0 });
      K.spot('callPanel', 15.8, 0.5, { h: 1.3, yaw: -H });
      K.spot('wren', 14.5, 1.2, { h: 0 });
      K.lair('sorter', 12.5, 0.55, { yaw: H });
      L.meta.zonesOn = [0, 1];
      K.trigger('archiveIn', 4, 0, 15, 5);
      K.trigger('elevatorNear', 13, 0, 15, 1);
      K.trigger('ottoIn', 0, 3, 3, 5);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
