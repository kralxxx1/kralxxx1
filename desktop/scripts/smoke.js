#!/usr/bin/env node
/* Automated check of the desktop build: starts the real Electron app (windowed, with a throwaway
   profile), waits for the main menu and checks that three.js, the physics engine and the fonts all came
   from the local copies. Then it switches to Japanese and Arabic (their own fonts), loads the first
   chapter, reads the native API and saves screenshots. Exit code 0 means every check passed.
     node scripts/smoke.js [outDir]
   On a machine without a display or graphics card: xvfb-run node scripts/smoke.js --software */
'use strict';
const path = require('path');
const fs = require('fs');

if (!process.versions.electron) {
  // Started with node: run this same file inside Electron
  const { spawnSync } = require('child_process');
  const electron = require('electron');
  // containers often run as root, where Chromium's sandbox cannot start
  const extra = process.getuid && process.getuid() === 0 ? ['--no-sandbox'] : [];
  // --software: no graphics card (a CI machine, a container): software WebGL
  if (process.argv.includes('--software')) extra.push('--use-angle=swiftshader', '--enable-unsafe-swiftshader');
  const r = spawnSync(electron, [...extra, __filename, ...process.argv.slice(2)], { stdio: 'inherit' });
  process.exit(r.status == null ? 1 : r.status);
}

const { app } = require('electron');
const os = require('os');
const OUT = path.resolve(process.argv.find((a, i) => i >= 2 && !a.startsWith('-') && a !== __filename) || path.join(__dirname, '..', 'smoke-out'));
fs.mkdirSync(OUT, { recursive: true });
app.setPath('userData', fs.mkdtempSync(path.join(os.tmpdir(), 'level256-smoke-')));
if (!process.argv.includes('--windowed')) process.argv.push('--windowed');
require('../main.js');

const results = [];
const check = (name, ok, detail) => { results.push({ name, ok: !!ok, detail }); console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail != null ? ' — ' + (typeof detail === 'string' ? detail : JSON.stringify(detail)) : '')); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function waitFor(wc, expr, ms) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    try { if (await wc.executeJavaScript(expr)) return true; } catch (e) { /* page still loading */ }
    await sleep(500);
  }
  return false;
}
const shot = async (win, name) => { const img = await win.webContents.capturePage(); fs.writeFileSync(path.join(OUT, name + '.png'), img.toPNG()); };

app.on('browser-window-created', (e, win) => {
  const wc = win.webContents;
  const errors = [];
  wc.on('console-message', (...a) => {
    // (event, level, message) in older Electron, (event with .level/.message) in newer
    const ev = a[0] && a[0].message != null ? a[0] : { level: a[1], message: a[2] };
    const lvl = typeof ev.level === 'string' ? ev.level : ['verbose', 'info', 'warning', 'error'][ev.level];
    if (lvl === 'error' || lvl === 'warning') errors.push(lvl + ': ' + String(ev.message).slice(0, 300));
  });
  wc.once('did-finish-load', async () => {
    const t0 = Date.now();
    try {
      const menu = await waitFor(wc, "!!(window.PB && PB.game && PB.game.state === 'menu')", 300000);
      check('boots to the main menu', menu, ((Date.now() - t0) / 1000).toFixed(1) + ' s');
      const info = await wc.executeJavaScript(`(async () => {
        const fam = async (f, sample) => (await document.fonts.load('24px "' + f + '"', sample || 'Aa')).length > 0;
        await (PB.Physics && PB.Physics.load ? PB.Physics.load() : null);
        return {
          three: !!(window.THREE && THREE.REVISION), threeRev: window.THREE && THREE.REVISION,
          physics: !!(PB.Physics && PB.Physics.engine),
          native: !!window.LEVEL256_NATIVE, api: window.LEVEL256_NATIVE ? Object.keys(LEVEL256_NATIVE) : [],
          quitVisible: !document.getElementById('m-quit').hidden,
          fonts: { vt323: await fam('VT323'), pressStart: await fam('Press Start 2P'), caveat: await fam('Caveat'), kalam: await fam('Kalam') },
          origin: location.origin,
        };
      })()`);
      check('three.js from the local copy', info.three, 'r' + info.threeRev);
      check('physics engine from the local copy', info.physics);
      check('native API exposed', info.native && ['quit', 'metrics', 'setFullscreen', 'setVsync', 'restart'].every(k => info.api.includes(k)), info.api.join(','));
      check('Quit button shown', info.quitVisible);
      check('Latin fonts from the local copies', Object.values(info.fonts).every(Boolean), info.fonts);
      await shot(win, 'menu_en');
      // metrics arrive once a second
      await sleep(2500);
      const m = await wc.executeJavaScript('LEVEL256_NATIVE.metrics()');
      check('process metrics', m && m.mem > 0 && m.cpu != null, m && { cpu: Math.round(m.cpu), appCpu: Math.round(m.appCpu), mem: Math.round(m.mem) });
      // other scripts: the language switch loads their fonts through the same local path
      for (const [lang, fam, sample] of [['ja', 'DotGothic16', 'ゲーム'], ['ar', 'Noto Kufi Arabic', 'صالة'], ['zh-CN', 'Noto Sans SC', '游戏'], ['ko', 'Nanum Gothic Coding', '오락']]) {
        const ok = await wc.executeJavaScript(`(async () => { PB.Settings.set('lang', '${lang}'); await PB.Fonts.ready('${lang}', 20000); return (await document.fonts.load('24px "${fam}"', '${sample}')).length > 0 && document.documentElement.lang === '${lang}'; })()`);
        check(`${lang} fonts from the local copies`, ok, fam);
        if (lang === 'ja' || lang === 'ar') { await sleep(800); await shot(win, 'menu_' + lang); }
      }
      await wc.executeJavaScript("PB.Settings.set('lang', 'en')");
      // a chapter: everything else in the game builds on the same files
      const t1 = Date.now();
      await wc.executeJavaScript("(() => { const g = PB.game; g.newSave(); g.loadLevel('depot', { skipCard: true }); })()");
      const play = await waitFor(wc, "PB.game.levelDef && PB.game.levelDef.id === 'depot' && PB.game.state === 'play'", 600000);
      check('first chapter loads and plays', play, ((Date.now() - t1) / 1000).toFixed(1) + ' s');
      await sleep(3000);
      await shot(win, 'depot');
      const bad = errors.filter(x => !/GPU stall|willReadFrequently|Automatic fallback to software WebGL|swiftshader/i.test(x));
      check('no errors in the console', bad.length === 0, bad.slice(0, 5));
    } catch (err) {
      check('smoke run', false, String(err && err.stack || err));
    }
    const failed = results.filter(r => !r.ok).length;
    fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 1));
    console.log(failed ? `${failed} check(s) failed` : 'all checks passed', '— screenshots in', OUT);
    app.exit(failed ? 1 : 0);
  });
});
