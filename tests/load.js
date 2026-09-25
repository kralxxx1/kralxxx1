/* Loads the DOM-free game modules into Node (util, i18n, text packs, levels, generator, story). */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function load() {
  if (globalThis.PB && globalThis.PB.Story) return globalThis.PB;
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const all = [...html.matchAll(/<script defer src="(js\/[^"]+)"><\/script>/g)].map(m => m[1]);
  const wanted = f => f === 'js/util.js' || f === 'js/i18n.js' || f.startsWith('js/text/') || f === 'js/levels.js' || f === 'js/settings.js' || f === 'js/levelgen.js' || f === 'js/levelgen2.js' || f === 'js/story.js';
  for (const f of all.filter(wanted)) require(path.join(ROOT, f));
  return globalThis.PB;
}
module.exports = { load, ROOT };
