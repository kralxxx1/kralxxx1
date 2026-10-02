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
        doc('depot_log', 'desk', { offset: [-0.4, 0.15] }),
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
  ].filter(L => L.layout || L.authored);
  LEVELS.forEach((L, i) => {
    L.index = i; L.chapter = i;
    // On hand-made maps several things share a spot (papers on one desk): a single item never uses it up
    if (L.authored) for (const it of L.items) if (it.place === 'spot' && it.reuse == null && !(it.count > 1)) it.reuse = true;
  });

  // Kept for the old ghost companions, which this story does not have
  const GHOSTS = {};
  const CHAR_COLOR = { ada: '#6fa86a', wren: '#d8282c', otto: '#d8b060', clerk: '#a8a8c0' };

  PB.Levels = { LEVELS, GHOSTS, CHAR_COLOR, byId: id => LEVELS.find(l => l.id === id), supplies, doc };
})(typeof window !== 'undefined' ? window : globalThis);
