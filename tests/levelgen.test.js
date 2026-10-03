/* Level generator tests: node tests/levelgen.test.js
   Generates every chapter and checks that it is playable. */
'use strict';
const { load } = require('./load');
const { LevelGen: G, Story: S } = load();

let failures = 0;
const check = (cond, msg) => { if (!cond) { failures++; console.log('  FAIL:', msg); } };

// Items every chapter must contain (type → minimum count)
const REQUIRED = {
  depot: { flashlight: 1, key: 1 },
  under: { powerPellet: 4, exitPanel: 1, radio: 1, drawing: 1 },
  ferry: { key: 3, drawing: 1 },
  pinewood: { key: 3, drawing: 1 },
  mine: { drawing: 1 },
  lodge: { key: 1 },
  village: { drawing: 1 },
  train: { drawing: 1 },
  carnival: { drawing: 1 },
};
const TEXT_TYPES = ['note', 'tape', 'codeClue', 'computer', 'phone', 'drawing'];

for (const D of S.LEVELS) {
  const def = S.level(D.id);
  const t0 = Date.now();
  const L = G.generate(def);
  const ms = Date.now() - t0;
  console.log(`${def.id.padEnd(11)} ${(def.authored ? 'authored' : def.layout || '?').padEnd(10)} ${L.w}x${L.h}  items=${L.items.length} lights=${L.lights.length} props=${L.props.length} (${ms} ms)`);
  const dist = L.bfs(L.spawn.x, L.spawn.y, 'all');
  check(L.passable(L.spawn.x, L.spawn.y), `${def.id}: spawn is in a blocked cell`);
  check(L.floorType[L.i(L.spawn.x, L.spawn.y)] === 0, `${def.id}: spawn is in water`);

  const counts = {};
  for (const it of L.items) {
    counts[it.type] = (counts[it.type] || 0) + 1;
    check(L.inb(it.x, it.y), `${def.id}: ${it.id} is outside the map`);
    if (!L.inb(it.x, it.y)) continue;
    check(!L.solid[L.i(it.x, it.y)], `${def.id}: ${it.id} is in a solid cell (${it.x},${it.y})`);
    check(dist[L.i(it.x, it.y)] >= 0, `${def.id}: ${it.id} is unreachable (${it.x},${it.y})`);
    check(Number.isFinite(it.wx) && Number.isFinite(it.wz), `${def.id}: ${it.id} has an invalid world position`);
    const c = L.cellOf(it.wx, it.wz);
    check(Math.abs(c.x - it.x) <= 1 && Math.abs(c.y - it.y) <= 1, `${def.id}: ${it.id} world position is detached from its cell`);
    if (TEXT_TYPES.includes(it.type)) check(S.hasNote(it.data), `${def.id}: ${it.id} has no document (${it.data})`);
    if (it.type === 'drawing') { const n = S.note(it.data); check(n && n.kind === 'drawing' && n.drawing >= 1 && n.drawing <= 8, `${def.id}: ${it.id} is not a numbered drawing`); }
  }
  for (const [type, n] of Object.entries(REQUIRED[def.id] || {})) check((counts[type] || 0) >= n, `${def.id}: missing ${type} (${counts[type] || 0}/${n})`);
  // No two items on the same spot
  for (let a = 0; a < L.items.length; a++) for (let b = a + 1; b < L.items.length; b++) {
    const A = L.items[a], B = L.items[b];
    const d = Math.hypot(A.wx - B.wx, A.wz - B.wz) + Math.abs((A.wy || 0) - (B.wy || 0));
    check(d > 0.25, `${def.id}: ${A.id} overlaps ${B.id} (${d.toFixed(2)} m)`);
  }
  if (L.meta.exit) check(dist[L.i(L.meta.exit.x, L.meta.exit.y)] >= 0, `${def.id}: exit is unreachable`);
  for (const door of L.doors) check(!door.name && !door.lockMsg, `${def.id}: door ${door.id} uses a hard-coded label`);
  // The security card must be behind the coded door
  if (def.id === 'office') {
    const card = L.items.find(i => i.type === 'keycard');
    const sec = L.meta.security;
    check(card && sec && card.x >= sec.x0 && card.x <= sec.x1 && card.y >= sec.y0 && card.y <= sec.y1, 'office: security card is not in the security room');
    const navDist = L.bfs(L.spawn.x, L.spawn.y, 'nav');
    check(navDist[L.i(card.x, card.y)] < 0, 'office: security room can be entered without the code');
    for (const t of ['codeClue', 'keypad', 'phone']) for (const it of L.items.filter(i => i.type === t)) check(navDist[L.i(it.x, it.y)] >= 0, `office: ${it.id} is inside a locked area`);
  }
  for (const o of def.objectives || []) check(S.obj(o), `${def.id}: objective text missing (${o})`);
}

// Every document must be placed somewhere (except ones spawned by scripts)
// Shown by the chapter scripts (in a parcel, a drawer, a stove, a book) rather than lying about
const SCRIPTED = ['depot_tag', 'wren1', 'depot_ledger', 'ferry_logpage', 'ferry_logbook', 'ferry_logbookFull', 'mine_confession', 'lodge_guestBook', 'lodge_telegram', 'lake_radio', 'lake_tape'];
const placed = new Set(S.placedNoteIds());
const unused = S.noteIds().filter(id => !placed.has(id) && !SCRIPTED.includes(id));
check(!unused.length, 'Documents never placed: ' + unused.join(', '));
// Wren's drawings: numbers must be unique
const nums = S.noteIds().map(id => S.note(id)).filter(n => n.kind === 'drawing' && n.drawing).map(n => n.drawing);
check(new Set(nums).size === nums.length, "Wren's drawing numbers repeat: " + nums.join(','));
check(nums.length === 8, `Wren left eight drawings, found ${nums.length}`);
console.log(`Documents: ${S.noteIds().length} (placed ${placed.size}), drawings so far: ${nums.length}/8`);
console.log(failures ? `\n${failures} FAILURES` : '\nAll level tests passed.');
process.exit(failures ? 1 : 0);
