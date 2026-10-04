/* Chapter definitions: gameplay data only (map, lighting, items, creatures, objectives).
   Names, intros and documents live in the language packs (js/text/<lang>/); the story is docs/STORY.md,
   the design docs/DESIGN.md. Every chapter but the Underneath is a hand-authored map (js/maps/). */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const MAP = id => (PB.Maps || {})[id];

  // Batteries, the thermos of tea (internal id 'almond') and glowsticks, scattered or on spots
  const supplies = (bat, tea, glow = 0, spot) => [
    { type: 'battery', count: bat, place: spot ? 'spot' : 'any', spot, fallback: 'any', group: 'bat', sep: 6 },
    { type: 'almond', count: tea, place: spot ? 'spot' : 'any', spot, fallback: 'any', group: 'tea', sep: 8 },
  ].concat(glow ? [{ type: 'glowstick', count: glow, place: 'any', group: 'glow', sep: 6 }] : []);
  // A document on a spot
  const doc = (id, spot, o = {}) => Object.assign({ type: 'note', id: 'n_' + id, data: id, place: 'spot', spot }, o);

  const LEVELS = [
    // ------------------------------------------------------------ 0. Depot 9 (prologue)
    {
      id: 'depot', authored: MAP('depot'), seed: 1998, theme: 'depot', music: 'depot', ambience: 'depot',
      // documents that are read through the chapter script rather than picked up where they lie
      extraDocs: ['depot_tag', 'wren1', 'depot_ledger'],
      fog: [0x050505, 0.028], grade: { tint: [1.0, 0.97, 0.92], sat: 0.8 }, exposure: 0.9, noDressing: true, noScares: true,
      startFlashlight: false, drawing: 1,
      items: [
        { type: 'thing', id: 'typewriter', place: 'spot', spot: 'desk', fixed: true, prompt: 'depot_typePrompt', reach: 1.8 },
        { type: 'thing', id: 'parcel', model: 'parcelBox', place: 'spot', spot: 'parcel', hiddenUntil: 'parcelDropped', prompt: 'depot_parcelPrompt' },
        { type: 'flashlight', id: 'torch', place: 'spot', spot: 'locker', offset: [0, 0.1] },
        { type: 'thing', id: 'gmaTape', model: 'cassette', place: 'spot', spot: 'locker', offset: [0, -0.2], fixed: true, prompt: 'depot_tapePrompt' },
        { type: 'thing', id: 'breaker', place: 'spot', spot: 'breaker', fixed: true, prompt: 'depot_breakerPrompt', hold: 1.2, reach: 2.2 },
        { type: 'thing', id: 'ledger', model: 'ledgerBox', place: 'spot', spot: 'ledger', prompt: 'depot_ledgerPrompt' },
        { type: 'thing', id: 'badge', model: 'badge', place: 'spot', spot: 'ottoDrawer', prompt: 'depot_badgePrompt' },
        { type: 'key', id: 'elevatorKey', data: 'elevatorKey', place: 'spot', spot: 'elevatorKey' },
        { type: 'thing', id: 'callPanel', place: 'spot', spot: 'callPanel', fixed: true, prompt: 'depot_callPrompt', reach: 2.4 },
        doc('depot_handover', 'desk', { offset: [0.35, -0.2] }),
        doc('depot_log', 'desk', { offset: [-0.09, 0.6] }),
        doc('depot_ottoNotes', 'ottoDesk'),
        doc('depot_memo', 'tube', { h: 1.22 }),
        doc('depot_calendar', 'store'),
        doc('depot_poster', 'publicBoard', { h: 1.55 }),
        doc('depot_kitchen', 'kitchen'),
      ].concat(supplies(2, 1, 0)),
      entities: [{ type: 'sorter', dormant: true, spot: 'lair:sorter' }],
      objectives: ['depot_log', 'depot_parcel', 'depot_torch', 'depot_power', 'depot_ledger', 'depot_otto', 'depot_elevator'],
    },
    // ------------------------------------------------------------ 1. The Underneath (Level 256)
    {
      id: 'under',
      layout: 'backrooms', seed: 1979, theme: 'yellow', music: 'under', ambience: 'yellow',
      fog: [0x3a3218, 0.02], grade: { tint: [1.02, 0.98, 0.88], sat: 0.85 }, exposure: 0.8, drawing: 2,
      // darker than it ever was: most of the lights are dead, the ones left flicker
      themeOver: { ambient: [0.006, 0.005, 0.003], bounce: 0.42 },
      gen: { w: 50, h: 50, light: { density: 0.42, darkThreshold: -0.08, flicker: 0.22, broken: 0.32, intensity: 0.75, range: 9 }, landmarks: [{ tag: 'camp', w: 3, h: 3 }, { tag: 'lone', w: 4, h: 3, openings: 2 }, { tag: 'chairs', w: 4, h: 4, openings: 2 }, { tag: 'stairs', w: 3, h: 4 }, { tag: 'puddle', w: 5, h: 4, openings: 3 }] },
      items: [
        { type: 'powerPellet', id: 'light', count: 4, place: 'deadEnd', group: 'light', minFrac: 0.35 },
        { type: 'exitPanel', id: 'indexPanel', place: 'spot', spot: 'exitPanel', reuse: true, h: 1.3, beside: 1.05 },
        { type: 'radio', id: 'walkie', place: 'spot', spot: 'camp', h: 0.02 },
        { type: 'note', id: 'n_under_tag', data: 'under_tag', place: 'near', h: 0 },
        { type: 'note', id: 'n_under_umbrella', data: 'under_umbrella', place: 'mid' },
        { type: 'note', id: 'n_under_suitcase', data: 'under_suitcase', place: 'spot', spot: 'lone', fallback: 'mid' },
        { type: 'note', id: 'n_under_chalk', data: 'under_chalk', place: 'spot', spot: 'chairs', fallback: 'mid', wall: true, h: 1.6 },
        { type: 'note', id: 'n_under_otto1', data: 'under_otto1', place: 'spot', spot: 'camp', reuse: true, offset: [-0.8, 0.4] },
        { type: 'note', id: 'n_under_list', data: 'under_list', place: 'far', group: 'notes' },
        { type: 'note', id: 'n_under_puddle', data: 'under_puddle', place: 'spot', spot: 'puddle', fallback: 'far' },
        { type: 'note', id: 'n_under_index', data: 'under_index', place: 'spot', spot: 'exitPanel', reuse: true, beside: -1.05, h: 1.5 },
        { type: 'drawing', id: 'd_wren2', data: 'wren2', place: 'deadEnd', minFrac: 0.6 },
      ].concat(supplies(6, 3, 3)),
      entities: [
        { type: 'eater', dormant: true },
        { type: 'wallpaperMan', count: 6, extra: true },
        { type: 'hummer', count: 4, near: 22, extra: true },
      ],
      objectives: ['under_walkie', 'under_lights', 'under_index', 'under_leave'],
    },
    // ------------------------------------------------------------ 2. Saint Brigid (ferry in fog)
    {
      id: 'ferry', authored: MAP('ferry'), seed: 1987, theme: 'ferry', music: 'ferry', ambience: 'ferry',
      // documents that are read through the chapter script rather than picked up where they lie
      extraDocs: ['ferry_logpage', 'ferry_logbook', 'ferry_logbookFull'],
      fog: [0x141a1e, 0.05], fogIn: 0.022, grade: { tint: [0.94, 1.0, 1.04], sat: 0.72 }, exposure: 0.85, list: 0.045, noDressing: true, drawing: 3,
      items: [
        { type: 'thing', id: 'winch2', place: 'spot', spot: 'winch2', fixed: true, hold: 3.5, reach: 2.2 },
        { type: 'thing', id: 'logPage', model: 'tornPage', place: 'spot', spot: 'logPage', prompt: 'ferry_pagePrompt' },
        { type: 'thing', id: 'logbook', model: 'logbook', place: 'spot', spot: 'logbook', fixed: true },
        { type: 'thing', id: 'bell', place: 'spot', spot: 'bell', fixed: true, reach: 2.0, marker: false },
        { type: 'key', id: 'bridgeKey', data: 'bridgeKey', place: 'spot', spot: 'bridgeKey' },
        { type: 'key', id: 'davitKey', data: 'davitKey', place: 'spot', spot: 'davitKey' },
        { type: 'key', id: 'crank', data: 'crank', model: 'winchCrank', place: 'spot', spot: 'crank' },
        doc('ferry_notice', 'notice', { h: 1.5 }),
        doc('ferry_testimony', 'captainDesk'),
        doc('ferry_radio', 'radioLog'),
        doc('ferry_mother', 'lounge'),
        doc('ferry_cabin', 'cabin3'),
        doc('ferry_purser', 'purser'),
        doc('ferry_mess', 'mess'),
        { type: 'drawing', id: 'd_wren3', data: 'wren3', place: 'spot', spot: 'cabin6' },
      ].concat(supplies(4, 2, 2)),
      entities: [
        { type: 'drowned', count: 6, extra: true },
        { type: 'passenger', count: 8, spot: 'lair:passenger' },
        { type: 'bellman', spot: 'lair:bellman' },
      ],
      objectives: ['ferry_start', 'ferry_bridge', 'ferry_captain', 'ferry_logbook', 'ferry_key', 'ferry_crank', 'ferry_lower'],
    },
    // ------------------------------------------------------------ 3. Pinewood (drive-in in the forest)
    {
      id: 'pinewood', authored: MAP('pinewood'), seed: 1975, theme: 'pinewood', music: 'pinewood', ambience: 'pinewood',
      fog: [0x07090b, 0.026], fogIn: 0.03, grade: { tint: [0.95, 1.0, 1.04], sat: 0.7 }, exposure: 0.9, noDressing: true, drawing: 4,
      items: [
        { type: 'thing', id: 'stub', model: 'ticketStub', place: 'spot', spot: 'stub', prompt: 'pine_stubPrompt' },
        { type: 'thing', id: 'reelCan', model: 'reelCanOpen', place: 'spot', spot: 'reelCan', fixed: true },
        { type: 'key', id: 'carBattery', data: 'carBattery', model: 'carBattery', place: 'spot', spot: 'battery' },
        { type: 'key', id: 'carKeys', data: 'carKeys', model: 'carKeys', place: 'spot', spot: 'keys' },
        { type: 'key', id: 'jerrycan', data: 'jerrycan', model: 'fuelCan', place: 'spot', spot: 'jerrycan' },
        { type: 'thing', id: 'tank', place: 'spot', spot: 'tank', fixed: true, hold: 4.5, reach: 2.0 },
        { type: 'thing', id: 'wagon', place: 'spot', spot: 'wagon', fixed: true, hold: 2.2, reach: 2.4 },
        doc('pine_program', 'counter'),
        doc('pine_missing', 'missing', { wall: true }),
        doc('pine_statement', 'statement'),
        doc('pine_letter', 'letter'),
        doc('pine_kiosk', 'kioskLog'),
        doc('pine_wiper', 'wiper'),
        doc('pine_staff', 'snackNote', { wall: true }),
        doc('pine_search', 'search'),
        { type: 'drawing', id: 'd_wren4', data: 'wren4', place: 'spot', spot: 'drawing' },
      ].concat(supplies(5, 2, 3)),
      entities: [
        { type: 'pines', count: 6, spot: 'lair:pines' },
        { type: 'stag', spot: 'lair:stag' },
        { type: 'usher', count: 2, spot: 'lair:usher' },
      ],
      objectives: ['pine_start', 'pine_parts', 'pine_startCar', 'pine_stubFind', 'pine_claim', 'pine_leave'],
    },
    // ------------------------------------------------------------ 4. Hollow Creek (copper mine)
    {
      id: 'mine', authored: MAP('mine'), seed: 1956, theme: 'mine', music: 'mine', ambience: 'mine',
      // documents that are read through the chapter script rather than picked up where they lie
      extraDocs: ['mine_confession'],
      fog: [0x0a0b0d, 0.034], fogIn: 0.055, grade: { tint: [1.03, 0.99, 0.92], sat: 0.68 }, exposure: 0.85, noDressing: true, drawing: 5,
      items: [
        { type: 'thing', id: 'canary', model: 'canaryCage', place: 'spot', spot: 'canary' },
        { type: 'thing', id: 'cageTop', place: 'spot', spot: 'cageTop', fixed: true, reach: 2.4 },
        { type: 'thing', id: 'cageBottom', place: 'spot', spot: 'cageBottom', fixed: true, reach: 2.4 },
        { type: 'thing', id: 'tin', model: 'tobaccoTin', place: 'spot', spot: 'tin', prompt: 'mine_tinPrompt' },
        ...['tagA', 'tagB', 'tagC'].map(id => ({ type: 'thing', id, model: 'tallyTag', place: 'spot', spot: id, prompt: 'mine_tagPrompt' })),
        { type: 'thing', id: 'board', place: 'spot', spot: 'board', fixed: true, reach: 2.2 },
        { type: 'key', id: 'diesel', data: 'diesel', model: 'fuelCan', place: 'spot', spot: 'diesel' },
        { type: 'thing', id: 'gen', place: 'spot', spot: 'gen', fixed: true, hold: 3.0, reach: 2.2 },
        { type: 'thing', id: 'hoist', place: 'spot', spot: 'hoist', fixed: true, reach: 2.0 },
        { type: 'thing', id: 'fireDoorX', place: 'spot', spot: 'fireDoorSpot', fixed: true, marker: false, reach: 2.4 },
        doc('mine_rules', 'rules', { wall: true }),
        doc('mine_lampBook', 'lampBook'),
        doc('mine_statement', 'statement'),
        doc('mine_phoneLog', 'phoneLog'),
        doc('mine_rescue', 'rescue'),
        doc('mine_widow', 'widow'),
        doc('mine_lunch', 'lunchNote'),
        doc('mine_genNote', 'genNote', { wall: true }),
        { type: 'drawing', id: 'd_wren5', data: 'wren5', place: 'spot', spot: 'fireGap', hiddenUntil: 'drawingOut' },
      ].concat(supplies(5, 2, 4)),
      entities: [
        { type: 'burrower', count: 7, spot: 'lair:burrower' },
        { type: 'lamplighter', count: 3, spot: 'lair:lamplighter' },
        { type: 'crawler', count: 3, spot: 'lair:crawler' },
      ],
      objectives: ['mine_start', 'mine_canary', 'mine_down', 'mine_tags', 'mine_board', 'mine_power', 'mine_gen', 'mine_ride'],
    },
    // ------------------------------------------------------------ 5. Weisshorn (mountain hotel in a blizzard)
    {
      id: 'lodge', authored: MAP('lodge'), seed: 1983, theme: 'lodge', music: 'lodge', ambience: 'lodge',
      // documents that are read through the chapter script rather than picked up where they lie
      extraDocs: ['lodge_guestBook', 'lodge_telegram'],
      fog: [0x1a1e22, 0.06], fogIn: 0.02, grade: { tint: [0.95, 1.0, 1.07], sat: 0.66 }, exposure: 0.9, noDressing: true,
      items: [
        { type: 'thing', id: 'guestBook', place: 'spot', spot: 'guestBook', fixed: true },
        { type: 'thing', id: 'tboard', place: 'spot', spot: 'board', fixed: true, reach: 2.0 },
        { type: 'thing', id: 'telegram', place: 'spot', spot: 'telegram', fixed: true, hold: 2.0, reach: 1.8 },
        { type: 'key', id: 'masterKey', data: 'masterKey', place: 'spot', spot: 'key' },
        { type: 'thing', id: 'control', place: 'spot', spot: 'control', fixed: true, hold: 3.0, reach: 2.2 },
        { type: 'thing', id: 'gondola', place: 'spot', spot: 'gondola', fixed: true, reach: 2.6 },
        doc('lodge_weather', 'weather'),
        doc('lodge_menu', 'menu'),
        doc('lodge_postcard', 'postcard'),
        doc('lodge_roomNote', 'roomNote'),
        doc('lodge_school', 'school'),
        doc('lodge_kitchenNote', 'kitchenNote', { wall: true }),
        doc('lodge_inquiry', 'bar'),
      ].concat(supplies(4, 3, 2)),
      entities: [
        { type: 'frozen', count: 6, spot: 'lair:frozen' },
        { type: 'cook', spot: 'lair:cook' },
        { type: 'whiteout', spot: 'lair:whiteout' },
      ],
      objectives: ['lodge_start', 'lodge_find', 'lodge_telegram', 'lodge_pin', 'lodge_key', 'lodge_power', 'lodge_board'],
    },
    // ------------------------------------------------------------ 6. Gammel Ostra (the village before the flood)
    {
      id: 'village', authored: MAP('village'), seed: 1964, theme: 'village', music: 'village', ambience: 'village',
      fog: [0x0c0e0e, 0.034], fogIn: 0.03, grade: { tint: [0.97, 1.0, 1.0], sat: 0.62 }, exposure: 0.88, noDressing: true, drawing: 6,
      items: [
        { type: 'key', id: 'signeKey', data: 'signeKey', place: 'spot', spot: 'key' },
        { type: 'thing', id: 'musicBox', model: 'musicBox', place: 'spot', spot: 'musicBox' },
        { type: 'thing', id: 'mantel', place: 'spot', spot: 'mantel', fixed: true, reach: 2.0 },
        { type: 'thing', id: 'ladder', place: 'spot', spot: 'ladder', fixed: true, reach: 2.4, marker: false },
        doc('village_notice', 'notice'),
        doc('village_torLetter', 'torLetter'),
        doc('village_diary', 'diary'),
        doc('village_ingrid', 'ingrid'),
        doc('village_removal', 'removal'),
        doc('village_parish', 'parish'),
        doc('village_shop', 'shop'),
        { type: 'drawing', id: 'd_wren6', data: 'wren6', place: 'spot', spot: 'drawing' },
      ].concat(supplies(4, 2, 3)),
      entities: [
        { type: 'silted', count: 7, spot: 'lair:silted' },
        { type: 'longone', count: 4, spot: 'lair:longone' },
        { type: 'choir', count: 5, spot: 'lair:choir' },
      ],
      objectives: ['village_start', 'village_key', 'village_box', 'village_mantel', 'village_run', 'village_climb'],
    },
    // ------------------------------------------------------------ 7. Nordlys Express (the night sleeper north)
    {
      id: 'train', authored: MAP('train'), seed: 1990, theme: 'train', music: 'train', ambience: 'train',
      fog: [0x07090c, 0.045], fogIn: 0.012, grade: { tint: [0.96, 0.98, 1.06], sat: 0.6 }, exposure: 0.9, noDressing: true, drawing: 7,
      items: [
        { type: 'thing', id: 'board', place: 'spot', spot: 'board', fixed: true, reach: 2.6 },
        { type: 'thing', id: 'ticket', model: 'railTicket', place: 'spot', spot: 'ticket', reach: 2.0 },
        { type: 'thing', id: 'linaTicket', model: 'railTicket', place: 'spot', spot: 'linaTicket', reach: 2.2 },
        { type: 'thing', id: 'punch', model: 'ticketPunch', place: 'spot', spot: 'punch', fixed: true, reach: 1.9 },
        { type: 'thing', id: 'brake', place: 'spot', spot: 'brake', fixed: true, hold: 2.2, reach: 1.9 },
        doc('train_route', 'route', { wall: true }),
        doc('train_notice', 'notice'),
        doc('train_menu', 'menu'),
        doc('train_waiter', 'waiter'),
        doc('train_paper', 'paper'),
        doc('train_lina', 'linaLetter'),
        doc('train_saether', 'saether'),
        doc('train_inquiry', 'inquiry'),
        doc('train_docket', 'docket'),
        doc('train_cabLog', 'cabLog'),
        { type: 'drawing', id: 'd_wren7', data: 'wren7', place: 'spot', spot: 'drawing' },
      ].concat(supplies(4, 3, 2, 'sup')),
      entities: [
        { type: 'conductor', spot: 'lair:conductor' },
        { type: 'sleeper', count: 6, spot: 'lair:sleeper' },
        { type: 'underhand', count: 5, spot: 'lair:underhand' },
      ],
      objectives: ['train_start', 'train_ticket', 'train_who', 'train_lina', 'train_punch', 'train_brake'],
    },
    // ------------------------------------------------------------ 8. Falk's Carnival (the fair on the harbour after closing)
    {
      id: 'carnival', authored: MAP('carnival'), seed: 1984, theme: 'carnival', music: 'carnival', ambience: 'carnival',
      fog: [0x0a0c10, 0.03], fogIn: 0.02, grade: { tint: [1.02, 0.98, 1.02], sat: 0.7 }, exposure: 0.92, noDressing: true, drawing: 8,
      items: [
        { type: 'key', id: 'fuse', data: 'fuse', model: 'fuse', place: 'spot', spot: 'fuse' },
        { type: 'thing', id: 'booth', place: 'spot', spot: 'fuseSocket', fixed: true, reach: 2.2 },
        { type: 'thing', id: 'nose', model: 'clownNose', place: 'spot', spot: 'nose', reach: 2.0 },
        { type: 'thing', id: 'mirror', place: 'spot', spot: 'mirror', fixed: true, reach: 1.9 },
        { type: 'thing', id: 'ride', place: 'spot', spot: 'ride', fixed: true, reach: 2.4 },
        doc('carnival_poster', 'poster'),
        doc('carnival_closing', 'closing'),
        doc('carnival_fire', 'fireReport'),
        doc('carnival_kasper', 'kasper'),
        doc('carnival_ledger', 'ledger'),
        doc('carnival_rosa', 'rosa'),
        doc('carnival_hugo', 'hugo'),
        doc('carnival_fan', 'fan'),
        doc('carnival_paper', 'paper'),
        { type: 'drawing', id: 'd_wren8', data: 'wren8', place: 'spot', spot: 'drawing' },
      ].concat(supplies(4, 3, 3, 'sup')),
      entities: [
        { type: 'mask', count: 6, spot: 'lair:mask', dormant: true },
        { type: 'horse', count: 4, spot: 'lair:horse', dormant: true },
        { type: 'lotte', spot: 'lair:lotte' },
      ],
      objectives: ['carnival_start', 'carnival_power', 'carnival_fuse', 'carnival_fit', 'carnival_why', 'carnival_mirror', 'carnival_ride'],
    },
    // ------------------------------------------------------------ 9. Lake Ostra (14 January 1979)
    {
      id: 'lake', authored: MAP('lake'), seed: 1979, theme: 'lake', music: 'lake', ambience: 'lake',
      // documents that are read through the chapter script rather than picked up where they lie
      extraDocs: ['lake_radio', 'lake_tape'],
      fog: [0x5a6068, 0.028], fogIn: 0.012, grade: { tint: [0.96, 0.99, 1.05], sat: 0.55 }, exposure: 1.0, noDressing: true,
      items: [
        { type: 'thing', id: 'radio', place: 'spot', spot: 'radio', fixed: true, reach: 2.0, prompt: 'lake_radioPrompt' },
        { type: 'thing', id: 'tape', model: 'cassette', place: 'spot', spot: 'tape', fixed: true, reach: 2.0, prompt: 'lake_tapePrompt' },
        { type: 'thing', id: 'hole', place: 'spot', spot: 'hutHole', fixed: true, reach: 2.2, prompt: 'lake_holePrompt' },
        doc('lake_granNote', 'granNote'),
        doc('lake_wrenNote', 'wrenNote', { wall: true }),
        doc('lake_diary', 'diary'),
        doc('lake_search', 'search'),
        doc('lake_hutNote', 'hutNote'),
      ].concat(supplies(3, 2, 2, 'sup')),
      entities: [
        { type: 'hush', spot: 'lair:hush', dormant: true },
        { type: 'underice', count: 4, spot: 'lair:underice' },
        { type: 'laugher', count: 3, spot: 'lair:laugher' },
      ],
      objectives: ['lake_start', 'lake_trail', 'lake_huts', 'lake_remember', 'lake_thin', 'lake_say'],
    },
  ].filter(L => L.layout || L.authored);
  LEVELS.forEach((L, i) => {
    L.index = i; L.chapter = i;
    // On hand-made maps several things share a spot (papers on one desk): a single item never uses it up
    if (L.authored) for (const it of L.items) if (it.place === 'spot' && it.reuse == null && !(it.count > 1)) it.reuse = true;
  });

  // Kept for the old ghost companions, which this story does not have
  const GHOSTS = {};
  const CHAR_COLOR = { ada: '#6fa86a', wren: '#d8282c', otto: '#d8b060', ingrid: '#8fa6c8', clerk: '#a8a8c0', lyle: '#b8a890' };

  PB.Levels = { LEVELS, GHOSTS, CHAR_COLOR, byId: id => LEVELS.find(l => l.id === id), supplies, doc };
})(typeof window !== 'undefined' ? window : globalThis);
