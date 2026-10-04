/* Loads the DOM-free game modules into Node (util, i18n, settings, text packs, levels, maps, generator,
   story). The modules are registered on globalThis.PB exactly as in the browser; TypeScript ones are
   stripped with esbuild (the same transform Vite uses). */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { transformSync } = require('esbuild');
const ROOT = path.join(__dirname, '..');
const LEGACY = path.join(ROOT, 'src', 'legacy');

function load() {
  if (globalThis.PB && globalThis.PB.Story) return globalThis.PB;
  const index = fs.readFileSync(path.join(LEGACY, 'index.ts'), 'utf8');
  const all = [...index.matchAll(/^import '\.\/([^']+)';$/gm)].map(m => m[1]);
  const wanted = f => f === 'util' || f === 'i18n' || f.startsWith('text/') || f === 'levels' || f.startsWith('maps/') || f === 'authored' || f === 'settings' || f === 'levelgen' || f === 'levelgen2' || f === 'story';
  for (const f of all.filter(wanted)) {
    const file = ['.ts', '.js'].map(e => path.join(LEGACY, f + e)).find(p => fs.existsSync(p));
    let code = fs.readFileSync(file, 'utf8');
    if (file.endsWith('.ts')) code = transformSync(code, { loader: 'ts', target: 'es2022' }).code;
    vm.runInThisContext('(function () {' + code + '\n})()', { filename: file });
  }
  return globalThis.PB;
}
module.exports = { load, ROOT };
