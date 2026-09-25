/* Language pack tests: node tests/text.test.js
   Every key used by the code exists in English, and Turkish covers everything English has. */
'use strict';
const fs = require('fs');
const path = require('path');
const { load, ROOT } = require('./load');
const PB = load();
const I = PB.I18N, S = PB.Story;

let failures = 0;
const check = (cond, msg) => { if (!cond) { failures++; console.log('  FAIL:', msg); } };

const LANGS = I.LANGS.map(l => l[0]);
const en = { ui: I.section('ui', 'en'), story: I.section('story', 'en') };

// 1) UI: every key used in code exists in every language
const code = fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js')).map(f => fs.readFileSync(path.join(ROOT, 'js', f), 'utf8')).join('\n');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const uiKeys = new Set();
for (const m of code.matchAll(/\bt\('([a-zA-Z0-9_.]+)'/g)) uiKeys.add(m[1]);
for (const m of code.matchAll(/PB\.t\('([a-zA-Z0-9_.]+)'/g)) uiKeys.add(m[1]);
for (const m of html.matchAll(/data-t(?:-html|-aria|-title)?="([a-zA-Z0-9_.]+)"/g)) uiKeys.add(m[1]);
for (const m of code.matchAll(/(?:nameKey|lockKey): '([a-zA-Z0-9_.]+)'/g)) uiKeys.add(m[1]);
for (const s of PB.Settings ? PB.Settings.SCHEMA : []) uiKeys.add('set.' + s.key);
for (const k of uiKeys) {
  if (/^(tab|kind|set|opt|preset)\.$/.test(k)) continue;
  for (const L of LANGS) check(I.section('ui', L)[k] !== undefined, `ui[${L}] missing key "${k}"`);
}
for (const L of LANGS) for (const k of Object.keys(en.ui)) check(I.section('ui', L)[k] !== undefined, `ui[${L}] lacks "${k}" that English has`);
// Kind labels for every document kind
for (const id of S.noteIds()) { const k = S.note(id).kind; for (const L of LANGS) check(I.section('ui', L)['kind.' + k] !== undefined, `ui[${L}] no label for kind "${k}"`); }

// 2) Story: Turkish mirrors the English structure (strings and arrays)
function walk(a, b, p, lang) {
  for (const k of Object.keys(a)) {
    const va = a[k], vb = b ? b[k] : undefined, pk = p ? p + '.' + k : k;
    if (typeof va === 'string') {
      // Document meta fields are shared; only text needs translating
      if (/^docs\.[^.]+\.(kind|photo)$/.test(pk)) continue;
      check(typeof vb === 'string' && vb.length > 0, `story[${lang}] missing "${pk}"`);
    } else if (Array.isArray(va)) {
      check(Array.isArray(vb) && vb.length === va.length, `story[${lang}] "${pk}" array length ${vb ? vb.length : 'none'} != ${va.length}`);
    } else if (va && typeof va === 'object') walk(va, vb, pk, lang);
  }
}
for (const L of LANGS) if (L !== 'en') walk(en.story, I.section('story', L), '', L);

// 3) Story keys referenced by the chapter scripts exist
const chapters = fs.readFileSync(path.join(ROOT, 'js', 'chapters.js'), 'utf8') + fs.readFileSync(path.join(ROOT, 'js', 'game.js'), 'utf8');
const refs = { mono: /(?:mono)\('([a-zA-Z0-9_]+)'/g, radio: /radio\('([a-zA-Z0-9_]+)'/g, lines: /ST\.line\('([a-zA-Z0-9_]+)'/g, obj: /setObj\('([a-zA-Z0-9_]+)'/g };
for (const [sec, re] of Object.entries(refs)) for (const m of chapters.matchAll(re)) {
  for (const L of LANGS) check(I.raw('story', sec + '.' + m[1], L) !== undefined, `story[${L}] ${sec}.${m[1]} referenced in code but missing`);
}
// Radio speakers are known
for (const [k, seq] of Object.entries(en.story.radio || {})) for (const [who] of seq) check(en.story.speakers[who], `radio ${k}: unknown speaker "${who}"`);
// Placeholders match between languages
function holders(s) { return [...String(s).matchAll(/\{(\w+)\}/g)].map(m => m[1]).sort().join(','); }
for (const L of LANGS) if (L !== 'en') for (const k of Object.keys(en.ui)) { const v = I.section('ui', L)[k]; if (v !== undefined) check(holders(v) === holders(en.ui[k]), `ui[${L}] "${k}" placeholders differ`); }

console.log(`UI keys used: ${uiKeys.size}, English UI strings: ${Object.keys(en.ui).length}, documents: ${S.noteIds().length}`);
console.log(failures ? `\n${failures} FAILURES` : '\nAll text tests passed.');
process.exit(failures ? 1 : 0);
