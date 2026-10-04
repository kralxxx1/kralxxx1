/* Folds the single-chunk build (dist/single) into one HTML file: dist/level256.html.
   Optionally also writes an HTML fragment (no <html>/<head>/<body> tags) for pages that embed it:
     node tools/finish-single.mjs [--fragment OUT.html] */
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = resolve(ROOT, 'dist/single');
let html = readFileSync(resolve(DIR, 'index.html'), 'utf8');

const js = readFileSync(resolve(DIR, 'app.js'), 'utf8').replace(/<\/script/gi, '<\\/script');
const css = readFileSync(resolve(DIR, 'app.css'), 'utf8');
// the entry script and the stylesheet link Vite wrote
html = html.replace(/<link rel="stylesheet"[^>]*href="[^"]*app\.css"[^>]*>\s*/, () => `<style>\n${css}\n</style>\n`);
html = html.replace(/<script type="module"[^>]*src="[^"]*app\.js"[^>]*><\/script>\s*/, '');
html = html.replace(/<link rel="modulepreload"[^>]*>\s*/g, '');
html = html.replace('</body>', () => `<script type="module">\n${js}\n</script>\n</body>`);

const full = resolve(ROOT, 'dist/level256.html');
mkdirSync(dirname(full), { recursive: true });
writeFileSync(full, html);
console.log(`${full} (${Math.round(Buffer.byteLength(html) / 1024)} KB)`);

const i = process.argv.indexOf('--fragment');
if (i > 0) {
  const drop = new Set(['<!DOCTYPE html>', '<!doctype html>', '<html lang="en">', '<html lang="tr">', '<head>', '<meta charset="utf-8">', '<meta charset="UTF-8">', '</head>', '<body>', '</body>', '</html>']);
  const frag = html.split('\n').filter(l => { const s = l.trim(); return !drop.has(s) && !s.startsWith('<meta name="viewport"'); }).join('\n') + '\n';
  writeFileSync(process.argv[i + 1], frag);
  console.log(`${process.argv[i + 1]} (${Math.round(Buffer.byteLength(frag) / 1024)} KB)`);
}
rmSync(DIR, { recursive: true, force: true });
