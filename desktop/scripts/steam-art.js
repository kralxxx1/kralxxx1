#!/usr/bin/env node
/* Store art for Steam, made from the game itself. Run it on a PC with a real graphics card:
     npm run steam-art                  (every chapter, Ultra preset)
     node scripts/steam-art.js --levels prolog,pool,motel --preset high
   It starts the desktop build with a throwaway profile, renders clean frames straight from the game's
   canvas (no HUD) at 1920×1080 for screenshots and 3840×2160 for the library hero, and composes every
   capsule size Steam asks for with the game's logo. Everything lands in desktop/steam-art/.
   Pick the best frames by hand: Steam wants screenshots that show gameplay, and capsules readable at
   small sizes. */
'use strict';
const path = require('path');
const fs = require('fs');

if (!process.versions.electron) {
  const { spawnSync } = require('child_process');
  const electron = require('electron');
  const extra = process.getuid && process.getuid() === 0 ? ['--no-sandbox'] : [];
  if (process.argv.includes('--software')) extra.push('--use-angle=swiftshader', '--enable-unsafe-swiftshader');
  const r = spawnSync(electron, [...extra, __filename, ...process.argv.slice(2)], { stdio: 'inherit' });
  process.exit(r.status == null ? 1 : r.status);
}

const { app } = require('electron');
const os = require('os');
const opt = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : null; };
const OUT = path.resolve(opt('--out') || path.join(__dirname, '..', 'steam-art'));
const LEVELS = (opt('--levels') || 'prolog,lobby,mill,pipes,pool,office,school,dark,mall,motel,hospital,maple,workshop,maze,killscreen').split(',');
const PRESET = opt('--preset') || 'ultra';
fs.mkdirSync(path.join(OUT, 'screenshots'), { recursive: true });
app.setPath('userData', fs.mkdtempSync(path.join(os.tmpdir(), 'level256-art-')));
if (!process.argv.includes('--windowed')) process.argv.push('--windowed');
require('../main.js');

const sleep = ms => new Promise(r => setTimeout(r, ms));
const save = (name, dataUrl) => fs.writeFileSync(path.join(OUT, name), Buffer.from(dataUrl.split(',')[1], 'base64'));

// In the page: render one frame and read the canvas in the same task (the buffer is still intact then)
const GRAB = `(() => { PB.game.frame(); return document.getElementById('view').toDataURL('image/png'); })()`;

// In the page: the capsule composer. bg: a data URL, spec: {w, h, logo: 'left'|'center'|'top'|null, dim}
const COMPOSE = `(async (bg, spec) => {
  await document.fonts.load('64px "Press Start 2P"', 'LEVEL 256'); await document.fonts.load('40px "VT323"', 'THE STARLIGHT ARCADE');
  const c = document.createElement('canvas'); c.width = spec.w; c.height = spec.h;
  const g = c.getContext('2d'), W = spec.w, H = spec.h;
  if (bg) {
    const img = new Image(); img.src = bg; await img.decode();
    const k = Math.max(W / img.width, H / img.height), iw = img.width * k, ih = img.height * k;
    const fx = spec.focusX != null ? spec.focusX : 0.5;
    g.drawImage(img, (W - iw) * fx, (H - ih) / 2, iw, ih);
    // darken where the logo sits so it reads at thumbnail size
    const grd = spec.logo === 'left' ? g.createLinearGradient(0, 0, W, 0) : g.createLinearGradient(0, 0, 0, H);
    if (spec.logo === 'left') { grd.addColorStop(0, 'rgba(0,0,0,0.78)'); grd.addColorStop(0.55, 'rgba(0,0,0,0.25)'); grd.addColorStop(1, 'rgba(0,0,0,0.05)'); }
    else if (spec.logo === 'top') { grd.addColorStop(0, 'rgba(0,0,0,0.8)'); grd.addColorStop(0.45, 'rgba(0,0,0,0.15)'); grd.addColorStop(1, 'rgba(0,0,0,0.35)'); }
    else { grd.addColorStop(0, 'rgba(0,0,0,' + (spec.dim || 0.25) + ')'); grd.addColorStop(1, 'rgba(0,0,0,' + (spec.dim || 0.25) + ')'); }
    g.fillStyle = grd; g.fillRect(0, 0, W, H);
  }
  if (spec.logo) {
    const unit = Math.min(W / 11, H / (spec.logo === 'top' ? 5.2 : 3.4));
    const size = Math.round(unit), cx = spec.logo === 'left' ? W * 0.07 : W / 2;
    const cy = spec.logo === 'top' ? H * 0.16 : spec.logo === 'left' ? H * 0.46 : H * 0.47;
    g.textBaseline = 'alphabetic'; g.textAlign = spec.logo === 'left' ? 'left' : 'center';
    g.font = size + 'px "Press Start 2P"';
    const off = Math.max(2, size * 0.06);
    g.fillStyle = 'rgba(255,40,40,0.8)'; g.fillText('LEVEL 256', cx - off, cy);
    g.fillStyle = 'rgba(57,230,255,0.75)'; g.fillText('LEVEL 256', cx + off, cy);
    g.save(); g.shadowColor = 'rgba(255,200,40,0.7)'; g.shadowBlur = size * 0.35; g.fillStyle = '#ffd23f'; g.fillText('LEVEL 256', cx, cy); g.restore();
    const sub = 'THE STARLIGHT ARCADE';
    const ss = Math.round(size * 0.52);
    g.font = ss + 'px "VT323"'; g.fillStyle = '#efe6cf';
    const track = ss * 0.32;
    let w = 0; for (const ch of sub) w += g.measureText(ch).width + track; w -= track;
    let x = spec.logo === 'left' ? cx : cx - w / 2; const y = cy + size * 0.95;
    g.textAlign = 'left';
    for (const ch of sub) { g.fillText(ch, x, y); x += g.measureText(ch).width + track; }
  }
  return c.toDataURL('image/png');
})`;

async function waitFor(wc, expr, ms) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) { try { if (await wc.executeJavaScript(expr)) return true; } catch (e) { /* loading */ } await sleep(400); }
  return false;
}

app.on('browser-window-created', (e, win) => {
  const wc = win.webContents;
  wc.once('did-finish-load', async () => {
    try {
      if (!await waitFor(wc, "!!(window.PB && PB.game && PB.game.state === 'menu')", 300000)) throw new Error('the game did not reach the menu');
      await wc.executeJavaScript(`(() => {
        const S = PB.Settings; PB.I18N.set('en', true); S.set('lang', 'en');
        S.set('preset', '${PRESET}'); S.set('resolution', '1920x1080'); S.set('scaleMode', 'fit'); S.set('renderScale', 1);
        S.set('motionBlur', 0); S.set('grain', 0.25); S.set('vhs', false); S.set('perfOverlay', 'off');
        // a fresh profile starts on the language screen: confirm it so the game goes on to the menu
        const go = document.getElementById('first-go');
        if (go && !document.getElementById('scr-first').hidden) go.click();
      })()`);
      await sleep(6000);
      const shots = {};
      shots.menu = await wc.executeJavaScript(GRAB);
      save('screenshots/00_menu.png', shots.menu);
      console.log('menu');
      let n = 1;
      for (const lvl of LEVELS) {
        await wc.executeJavaScript(`(() => { const g = PB.game; g.newSave(); g.loadLevel('${lvl}', { skipCard: true }); })()`);
        if (!await waitFor(wc, `PB.game.levelDef && PB.game.levelDef.id === '${lvl}' && PB.game.state === 'play'`, 600000)) { console.log('skip', lvl); continue; }
        // a quiet scene: creatures hold still, the flashlight is on, no fades or talk
        const views = await wc.executeJavaScript(`(() => {
          const g = PB.game, p = g.player, out = [];
          g.fx.fade = null; g.fx.blackout = 0; g.talkQ = [];
          p.hasFlashlight = true; p.battery = 100; p.flashOn = true;
          for (const e of g.entities) if (e.hostile) e.update = () => {};
          out.push({ x: p.pos.x, z: p.pos.z, yaw: p.yaw, pitch: -0.04 });
          // facing a creature from a free spot about 4.5 m away
          const L = g.level, free = (x, z) => { const c = L.cellOf(x, z); return L.inb(c.x, c.y) && !L.solid[L.i(c.x, c.y)] && !(g.world.collides && g.world.collides(x, z, 0.3)); };
          const e = g.entities.find(e => e.hostile && e.mesh && e.pos);
          if (e) {
            if (e.mesh) e.mesh.visible = true;
            for (let a = 0; a < 24; a++) {
              const ang = a / 24 * Math.PI * 2, x = e.pos.x + Math.sin(ang) * 4.5, z = e.pos.z + Math.cos(ang) * 4.5;
              if (!free(x, z) || !L.los(x, z, e.pos.x, e.pos.z)) continue;
              out.push({ x, z, yaw: Math.atan2(-(e.pos.x - x), -(e.pos.z - z)), pitch: 0.02 });
              break;
            }
          }
          return out;
        })()`);
        for (let k = 0; k < views.length; k++) {
          const v = views[k];
          await wc.executeJavaScript(`(() => { const p = PB.game.player; p.pos.set(${v.x}, 0, ${v.z}); p.yaw = ${v.yaw}; p.pitch = ${v.pitch}; p.vel && p.vel.set(0, 0, 0); })()`);
          await sleep(2500);
          const shot = await wc.executeJavaScript(GRAB);
          const name = String(n++).padStart(2, '0') + '_' + lvl + (k ? '_creature' : '');
          save('screenshots/' + name + '.png', shot);
          if (lvl === 'pool' && !k) shots.pool = shot;
          if (k && !shots.creature) shots.creature = shot;
          console.log(name);
        }
        if (lvl === LEVELS[0] || lvl === 'lobby') {
          // the library hero wants 3840 × 1240 without text: render this view at 4K
          await wc.executeJavaScript("PB.Settings.set('resolution', '3840x2160')"); await sleep(2500);
          if (!shots.hero || lvl === 'lobby') shots.hero = await wc.executeJavaScript(GRAB);
          await wc.executeJavaScript("PB.Settings.set('resolution', '1920x1080')"); await sleep(1000);
        }
      }
      const key = shots.menu, alt = shots.creature || shots.pool || shots.menu;
      const compose = async (name, bg, spec) => { save(name, await wc.executeJavaScript(`${COMPOSE}(${JSON.stringify(bg)}, ${JSON.stringify(spec)})`)); console.log(name); };
      await compose('header_capsule_920x430.png', key, { w: 920, h: 430, logo: 'left', focusX: 0.6 });
      await compose('small_capsule_462x174.png', key, { w: 462, h: 174, logo: 'left', focusX: 0.6 });
      await compose('main_capsule_1232x706.png', key, { w: 1232, h: 706, logo: 'left', focusX: 0.6 });
      await compose('vertical_capsule_748x896.png', alt, { w: 748, h: 896, logo: 'top' });
      await compose('library_capsule_600x900.png', alt, { w: 600, h: 900, logo: 'top' });
      await compose('library_header_920x430.png', key, { w: 920, h: 430, logo: 'left', focusX: 0.6 });
      await compose('library_hero_3840x1240.png', shots.hero || key, { w: 3840, h: 1240, logo: null, dim: 0.05 });
      await compose('library_logo_1280x720.png', null, { w: 1280, h: 720, logo: 'center' });
      await compose('page_background_1438x810.png', alt, { w: 1438, h: 810, logo: null, dim: 0.55 });
      console.log('done:', OUT);
      app.exit(0);
    } catch (err) {
      console.error(err && err.stack || err);
      app.exit(1);
    }
  });
});
