#!/usr/bin/env node
/* Builds desktop/app: the game (index.html, css, js from the repository root) plus local copies of
   everything the web version fetches from the internet, so the desktop build runs fully offline:
     vendor/three       three.js r170 (MIT)
     vendor/cannon-es   cannon-es 0.20.0 (MIT)
     vendor/fonts       every web font the game asks Google Fonts for (SIL Open Font License 1.1),
                        from the @fontsource packages, woff2 only, with a manifest the main process
                        uses to answer the game's Google Fonts requests
   and THIRD_PARTY_NOTICES.txt with every licence. The game files themselves are copied unchanged. */
'use strict';
const fs = require('fs');
const path = require('path');

const DESK = path.resolve(__dirname, '..');
const ROOT = path.resolve(DESK, '..');
const APP = path.join(DESK, 'app');
const NM = path.join(DESK, 'node_modules');

const rm = p => fs.rmSync(p, { recursive: true, force: true });
const mkdir = p => fs.mkdirSync(p, { recursive: true });
const copy = (from, to) => { mkdir(path.dirname(to)); fs.copyFileSync(from, to); };
function copyDir(from, to) {
  mkdir(to);
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    if (e.isDirectory()) copyDir(a, b); else copy(a, b);
  }
}
const read = p => fs.readFileSync(p, 'utf8');
const pkgVersion = name => JSON.parse(read(path.join(NM, name, 'package.json'))).version;

rm(APP);
mkdir(APP);

// ---- the game
copy(path.join(ROOT, 'index.html'), path.join(APP, 'index.html'));
copyDir(path.join(ROOT, 'css'), path.join(APP, 'css'));
copyDir(path.join(ROOT, 'js'), path.join(APP, 'js'));

const notices = [];
const notice = (name, version, url, licence, text) => notices.push({ name, version, url, licence, text: text.trim() });

// ---- libraries
copy(path.join(NM, 'three/build/three.module.min.js'), path.join(APP, 'vendor/three/three.module.min.js'));
copy(path.join(NM, 'three/LICENSE'), path.join(APP, 'vendor/three/LICENSE'));
notice('three.js', pkgVersion('three'), 'https://threejs.org', 'MIT', read(path.join(NM, 'three/LICENSE')));
copy(path.join(NM, 'cannon-es/dist/cannon-es.js'), path.join(APP, 'vendor/cannon-es/cannon-es.js'));
copy(path.join(NM, 'cannon-es/LICENSE'), path.join(APP, 'vendor/cannon-es/LICENSE'));
notice('cannon-es', pkgVersion('cannon-es'), 'https://github.com/pmndrs/cannon-es', 'MIT', read(path.join(NM, 'cannon-es/LICENSE')));

// ---- fonts: every Google Fonts request in the game (the page's stylesheet link and the per-language
// requests in js/fonts.js), resolved to the matching @fontsource package
const sources = read(path.join(ROOT, 'index.html')) + '\n' + read(path.join(ROOT, 'js/fonts.js'));
const wanted = new Map(); // family -> Set(weights)
for (const m of sources.matchAll(/family=([^&'"\s]+)/g)) {
  const [fam, spec] = decodeURIComponent(m[1]).split(':');
  const name = fam.replace(/\+/g, ' ');
  const weights = spec && /wght@/.test(spec) ? spec.split('@')[1].split(';') : ['400'];
  if (!wanted.has(name)) wanted.set(name, new Set());
  for (const w of weights) wanted.get(name).add(w);
}
const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const manifest = {};
let fontBytes = 0;
for (const [name, weights] of wanted) {
  const id = slug(name), pkg = path.join(NM, '@fontsource', id);
  if (!fs.existsSync(pkg)) throw new Error(`Font "${name}" is used by the game but @fontsource/${id} is not installed. Add it to desktop/package.json.`);
  manifest[name] = {};
  for (const w of [...weights].sort()) {
    const cssFile = path.join(pkg, w + '.css');
    if (!fs.existsSync(cssFile)) throw new Error(`@fontsource/${id} has no weight ${w}`);
    // keep woff2 only (every browser engine Electron ships reads it); point the urls at the app
    const css = read(cssFile).replace(/src:\s*url\(\.\/files\/([^)]+\.woff2)\)\s*format\('woff2'\)(?:,\s*url\([^)]+\)\s*format\('woff'\))?/g, (all, file) => {
      const to = path.join(APP, 'vendor/fonts', id, 'files', file);
      if (!fs.existsSync(to)) { copy(path.join(pkg, 'files', file), to); fontBytes += fs.statSync(to).size; }
      return `src: url(app://level256/vendor/fonts/${id}/files/${file}) format('woff2')`;
    });
    if (/url\(\.\//.test(css)) throw new Error(`Unexpected font source in ${cssFile}`);
    fs.writeFileSync(path.join(APP, 'vendor/fonts', id, w + '.css'), css);
    manifest[name][w] = `${id}/${w}.css`;
  }
  copy(path.join(pkg, 'LICENSE'), path.join(APP, 'vendor/fonts', id, 'LICENSE'));
  notice(`${name} (font)`, pkgVersion('@fontsource/' + id), `https://fonts.google.com/specimen/${name.replace(/ /g, '+')}`, 'SIL Open Font License 1.1', read(path.join(pkg, 'LICENSE')));
}
fs.writeFileSync(path.join(APP, 'vendor/fonts/manifest.json'), JSON.stringify(manifest, null, 1));

// ---- Electron and Chromium: electron-builder ships LICENSE and LICENSES.chromium.html next to the executable
notice('Electron', pkgVersion('electron'), 'https://www.electronjs.org', 'MIT (Chromium components: see LICENSES.chromium.html next to the executable)', read(path.join(NM, 'electron/LICENSE')));

const txt = ['LEVEL 256 uses the following third-party software and fonts. Everything else in the game',
  '(code, story, textures, models, sounds and music) is original and generated by the game itself.', ''];
for (const n of notices) txt.push('='.repeat(78), `${n.name} ${n.version}`, n.url, `Licence: ${n.licence}`, '', n.text, '');
fs.writeFileSync(path.join(APP, 'THIRD_PARTY_NOTICES.txt'), txt.join('\n'));

console.log(`app/ ready: game, three ${pkgVersion('three')}, cannon-es ${pkgVersion('cannon-es')}, ${wanted.size} font families (${(fontBytes / 1048576).toFixed(1)} MB woff2), ${notices.length} notices`);
