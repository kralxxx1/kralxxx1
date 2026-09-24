/* Bölüm üreticisi testleri: node tests/levelgen.test.js
   Her hikâye bölümünü üretir ve oynanabilirliği doğrular. */
'use strict';
require('../js/util.js');
require('../js/levelgen.js');
require('../js/story.js');
const { LevelGen: G, Story: S } = globalThis.PB;

let failures = 0;
const check = (cond, msg) => { if (!cond) { failures++; console.log('  HATA:', msg); } };

// Her bölümde bulunması zorunlu eşyalar (tür → en az adet)
const REQUIRED = {
  prolog: { flashlight: 1, fuseBox: 1, register: 1, token: 1, specialCabinet: 1, freeCabinet: 1, tape: 1 },
  l0: { powerPellet: 4, exitPanel: 1, tape: 1 },
  l1: { fuse: 3, fusePanel: 1, memento: 1, shrine: 1, tape: 1 },
  l2: { valve: 4, drain: 1, memento: 1, shrine: 1, tape: 1 },
  l3: { codeClue: 4, keypad: 1, keycard: 1, cardReader: 1, memento: 1, shrine: 1, phone: 3 },
  l4: { generator: 3, fuelCan: 3, memento: 1, shrine: 1, tape: 1 },
  l5: { powerPellet: 4, portal: 1 },
  l6: { plug: 1, powerPellet: 2 },
};

for (const def of S.LEVELS) {
  const t0 = Date.now();
  const L = G.generate(def);
  const ms = Date.now() - t0;
  console.log(`${def.id.padEnd(7)} ${def.layout.padEnd(10)} ${L.w}x${L.h}  eşya=${L.items.length} ışık=${L.lights.length} dekor=${L.props.length} (${ms} ms)`);
  const dist = L.bfs(L.spawn.x, L.spawn.y, 'all');
  check(L.passable(L.spawn.x, L.spawn.y), `${def.id}: doğuş noktası geçilemez hücrede`);
  check(L.floorType[L.i(L.spawn.x, L.spawn.y)] === 0, `${def.id}: doğuş noktası suyun içinde`);

  const counts = {};
  for (const it of L.items) {
    counts[it.type] = (counts[it.type] || 0) + 1;
    check(L.inb(it.x, it.y), `${def.id}: ${it.id} harita dışında`);
    if (!L.inb(it.x, it.y)) continue;
    check(!L.solid[L.i(it.x, it.y)], `${def.id}: ${it.id} katı hücrede (${it.x},${it.y})`);
    check(dist[L.i(it.x, it.y)] >= 0, `${def.id}: ${it.id} erişilemez (${it.x},${it.y})`);
    check(Number.isFinite(it.wx) && Number.isFinite(it.wz), `${def.id}: ${it.id} dünya konumu geçersiz`);
    const c = L.cellOf(it.wx, it.wz);
    check(Math.abs(c.x - it.x) <= 1 && Math.abs(c.y - it.y) <= 1, `${def.id}: ${it.id} dünya konumu hücresinden kopuk`);
    if (it.type === 'note' || it.type === 'tape' || it.type === 'codeClue' || it.type === 'computer' || it.type === 'phone') {
      check(S.NOTES[it.data], `${def.id}: ${it.id} için metin yok (${it.data})`);
    }
  }
  for (const [type, n] of Object.entries(REQUIRED[def.id] || {})) {
    check((counts[type] || 0) >= n, `${def.id}: ${type} eksik (${counts[type] || 0}/${n})`);
  }
  // Aynı noktada üst üste binen eşya olmamalı
  for (let a = 0; a < L.items.length; a++) for (let b = a + 1; b < L.items.length; b++) {
    const A = L.items[a], B = L.items[b];
    const d = Math.hypot(A.wx - B.wx, A.wz - B.wz) + Math.abs((A.wy || 0) - (B.wy || 0));
    check(d > 0.25, `${def.id}: ${A.id} ile ${B.id} üst üste (${d.toFixed(2)} m)`);
  }
  if (L.meta.exit) check(dist[L.i(L.meta.exit.x, L.meta.exit.y)] >= 0, `${def.id}: çıkış erişilemez`);
  // Kilitli kapıların arkasındaki anahtar eşyası kapının önünde olmamalı: güvenlik kartı güvenlik odasında
  if (def.id === 'l3') {
    const card = L.items.find(i => i.type === 'keycard');
    const sec = L.meta.security;
    check(card && sec && card.x >= sec.x0 && card.x <= sec.x1 && card.y >= sec.y0 && card.y <= sec.y1, 'l3: güvenlik kartı güvenlik odasında değil');
    const navDist = L.bfs(L.spawn.x, L.spawn.y, 'nav');
    check(navDist[L.i(card.x, card.y)] < 0, 'l3: güvenlik odasına şifresiz girilebiliyor');
    for (const t of ['codeClue', 'keypad']) for (const it of L.items.filter(i => i.type === t)) check(navDist[L.i(it.x, it.y)] >= 0, `l3: ${it.id} kilitli alanda kalmış`);
  }
  // Bölüm hedefleri tanımlı mı
  for (const o of def.objectives || []) check(S.OBJ[o], `${def.id}: hedef metni yok (${o})`);
}

const noteIds = Object.keys(S.NOTES);
const used = new Set();
for (const def of S.LEVELS) for (const it of def.items || []) if (it.data && S.NOTES[it.data]) used.add(it.data);
const unused = noteIds.filter(id => !used.has(id) && !['l5_fruit'].includes(id));
check(!unused.length, 'Hiçbir yere yerleştirilmemiş metinler: ' + unused.join(', '));
console.log(`Metin sayısı: ${noteIds.length}`);
console.log(failures ? `\n${failures} HATA` : '\nTüm bölüm testleri geçti.');
process.exit(failures ? 1 : 0);
