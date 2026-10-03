/* Girdi (klavye, fare kilidi / sürükleme, dokunmatik) ve birinci şahıs oyuncu denetleyicisi. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U;

  const MAP = {
    forward: ['KeyW', 'ArrowUp'], back: ['KeyS', 'ArrowDown'], left: ['KeyA', 'ArrowLeft'], right: ['KeyD', 'ArrowRight'],
    sprint: ['ShiftLeft', 'ShiftRight'], crouch: ['KeyC'], interact: ['KeyE', 'Enter'],
    flash: ['KeyF'], map: ['KeyM', 'Tab'], journal: ['KeyJ'], pause: ['Escape', 'KeyP'], throw: ['KeyG'], inventory: ['KeyI'], drink: ['KeyQ'], leanL: ['KeyZ'], leanR: ['KeyX'], reload: ['KeyR'], lookBack: ['KeyV', 'Mouse1'], attack: ['Mouse0'],
  };

  // Gamepad, standard mapping (the Xbox layout; Steam Input presents PlayStation, Switch and Steam Deck
  // controls the same way). In play the buttons stand for the same actions as the keys; the sticks walk
  // and look. Button numbers: 0 A, 1 B, 2 X, 3 Y, 4 LB, 5 RB, 6 LT, 7 RT, 8 View, 9 Menu, 10/11 stick
  // clicks, 12-15 D-pad up, down, left, right.
  const PAD = {
    interact: [0], crouch: [1], reload: [2], flash: [3], leanL: [4], leanR: [5], throw: [6, 14], sprint: [7, 10],
    lookBack: [11], map: [8], pause: [9], journal: [12], drink: [13], inventory: [15],
  };
  // States where the game reads the actions itself; everywhere else the pad drives the menus
  const PAD_ACTION_STATES = ['play', 'dying', 'note', 'map', 'bag'];
  const DIRS = { 12: 'ArrowUp', 13: 'ArrowDown', 14: 'ArrowLeft', 15: 'ArrowRight' };
  const deadzone = (v, dz) => { const a = Math.abs(v); return a < dz ? 0 : Math.sign(v) * (a - dz) / (1 - dz); };

  class Input {
    constructor(game, canvas) {
      this.game = game; this.canvas = canvas;
      this.pad = { on: false, gp: null, prev: [], down: new Set(), edges: new Set(), mx: 0, my: 0, hold: {}, stickDir: null };
      this.usingPad = false;
      this.keys = new Set(); this.edges = new Set();
      this.dx = 0; this.dy = 0;
      this.locked = false; this.lockFailed = false; this.dragging = false;
      this.move = { x: 0, y: 0 }; // dokunmatik joystick
      this.touchSprint = false; this.touchCrouch = false;
      this.virtual = new Set();
      root.addEventListener('keydown', e => {
        if (e.isTrusted && this.usingPad) this.setPadMode(false);
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
        if (!e.repeat) this.edges.add(e.code);
        this.keys.add(e.code);
        if (['Tab', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code) && (game.state === 'play' || game.state === 'map')) e.preventDefault();
      });
      root.addEventListener('keyup', e => this.keys.delete(e.code));
      root.addEventListener('blur', () => { this.keys.clear(); });
      document.addEventListener('pointerlockchange', () => {
        const was = this.locked;
        this.locked = document.pointerLockElement === canvas;
        if (was && !this.locked) game.onPointerUnlock();
      });
      // Tıklamasız istekler (bölüm başı, devam) sessizce reddedilebilir; ipucu yalnızca tıklamayla gelen hata için
      document.addEventListener('pointerlockerror', () => {
        if (this.lockGesture && !this.lockHint) { this.lockHint = true; game.ui && game.ui.hint(PB.t('n.lockFail'), true); }
        this.lockGesture = false;
      });
      root.addEventListener('mousemove', e => {
        if (this.locked || this.dragging) { this.dx += e.movementX || 0; this.dy += e.movementY || 0; }
        if (this.usingPad && Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0) > 3) this.setPadMode(false);
      });
      // Mouse buttons count as keys too (the middle one looks back)
      root.addEventListener('mousedown', e => { if (e.button === 1 || (e.button === 0 && this.locked)) { const k = 'Mouse' + e.button; this.keys.add(k); this.edges.add(k); if (game.state === 'play' && e.button === 1) e.preventDefault(); } });
      root.addEventListener('mouseup', e => { if (e.button === 1 || e.button === 0) this.keys.delete('Mouse' + e.button); });
      canvas.addEventListener('mousedown', e => {
        if (e.button !== 0 && e.button !== 2) return;
        if (game.state !== 'play') return;
        // Kilit gelene kadar (ya da hiç gelmezse) sürükleyerek bakılabilir
        if (!this.locked) { this.requestLock(true); this.dragging = true; }
      });
      root.addEventListener('mouseup', () => { this.dragging = false; });
      canvas.addEventListener('contextmenu', e => e.preventDefault());
    }
    requestLock(gesture) {
      if (!this.canvas.requestPointerLock) { this.lockFailed = true; return; }
      this.lockGesture = !!gesture;
      try {
        const p = this.canvas.requestPointerLock();
        if (p && p.catch) p.catch(() => {});
      } catch (e) { /* pointerlockerror olayı ele alır */ }
    }
    exitLock() { if (document.pointerLockElement) document.exitPointerLock(); }
    down(action) { return MAP[action].some(k => this.keys.has(k)) || this.virtual.has(action) || this.pad.down.has(action); }
    pressed(action) { return MAP[action].some(k => this.edges.has(k)) || this.virtual.has('!' + action) || this.pad.edges.has(action); }
    tap(action) { this.virtual.add('!' + action); }
    // ---------------------------------------------------------------- gamepad
    setPadMode(on) {
      if (this.usingPad === on) return;
      this.usingPad = on;
      document.body.classList.toggle('pad-mode', on);
    }
    // Once a frame, before the game reads its input
    pollPad(dt) {
      const P = this.pad;
      const list = navigator.getGamepads ? navigator.getGamepads() : [];
      let gp = null;
      for (const p of list || []) if (p && p.connected) { if (p.mapping === 'standard') { gp = p; break; } if (!gp) gp = p; }
      P.gp = gp;
      if (!gp) { if (P.on) { P.on = false; P.down.clear(); P.mx = P.my = 0; P.prev = []; P.hold = {}; } return; }
      P.on = true;
      const now = gp.buttons.map(b => !!b && (b.pressed || b.value > 0.5));
      const prev = P.prev;
      const hit = i => now[i] && !prev[i];
      const ax = i => gp.axes[i] || 0;
      if (now.some(Boolean) || Math.hypot(ax(0), ax(1)) > 0.5 || Math.hypot(ax(2), ax(3)) > 0.5) this.setPadMode(true);
      const state = this.game.state;
      P.down.clear(); P.mx = P.my = 0;
      if (PAD_ACTION_STATES.includes(state)) {
        for (const [action, btns] of Object.entries(PAD)) {
          if (btns.some(i => now[i])) P.down.add(action);
          if (btns.some(hit)) P.edges.add(action);
        }
        // B backs out of a paper, the map and the bag
        if (state !== 'play' && state !== 'dying' && hit(1)) P.edges.add('pause');
        if (state === 'play') {
          // walk: radial dead zone; look: dead zone and a curve for fine aim, independent of the mouse setting
          const lx = ax(0), ly = ax(1), l = Math.hypot(lx, ly);
          if (l > 0.18) { const k = Math.min(1, (l - 0.18) / 0.82) / l; P.mx = lx * k; P.my = ly * k; }
          const S = PB.Settings.data;
          const curve = v => { const d = deadzone(v, 0.12); return Math.sign(d) * Math.pow(Math.abs(d), 1.6); };
          const k = 1500 * (S.padSens || 1) / Math.max(0.1, S.mouseSens || 1) * dt;
          this.dx += curve(ax(2)) * k; this.dy += curve(ax(3)) * k;
        }
      } else this.padMenus(now, hit, ax(0), ax(1));
      P.prev = now;
    }
    // Menus: the D-pad (or the left stick) moves the focus, A chooses, B and Menu go back, LB/RB switch tabs.
    // Screens with their own arrow keys (settings, the arcade cabinet) get arrow keys.
    padMenus(now, hit, sx, sy) {
      const P = this.pad, ui = this.game.ui, t = performance.now();
      const stick = Math.abs(sx) > 0.6 || Math.abs(sy) > 0.6 ? (Math.abs(sx) > Math.abs(sy) ? (sx < 0 ? 14 : 15) : (sy < 0 ? 12 : 13)) : null;
      for (const i of [12, 13, 14, 15]) {
        const held = now[i] || stick === i;
        if (!held) { delete P.hold[i]; continue; }
        // first press at once, then repeat while held
        if (P.hold[i] == null) { P.hold[i] = t + 380; this.navigate(DIRS[i]); }
        else if (t >= P.hold[i]) { P.hold[i] = t + 110; this.navigate(DIRS[i]); }
      }
      if (hit(0)) this.choose();
      if (hit(1) || hit(9)) this.sendKey('Escape');
      if (hit(4)) this.sendKey('KeyQ');
      if (hit(5)) this.sendKey('KeyE');
      if (ui && hit(8) && this.game.state === 'pause') this.sendKey('Escape');
    }
    sendKey(code) {
      const key = { Escape: 'Escape', Enter: 'Enter', ArrowUp: 'ArrowUp', ArrowDown: 'ArrowDown', ArrowLeft: 'ArrowLeft', ArrowRight: 'ArrowRight', KeyQ: 'q', KeyE: 'e' }[code] || code;
      const target = document.activeElement && document.activeElement !== document.body ? document.activeElement : document;
      target.dispatchEvent(new KeyboardEvent('keydown', { code, key, bubbles: true, cancelable: true }));
      target.dispatchEvent(new KeyboardEvent('keyup', { code, key, bubbles: true, cancelable: true }));
    }
    // The screen on top: the last visible screen or overlay that has something to press
    topScreen() {
      const ui = this.game.ui;
      if (!ui) return null;
      const open = ui.screens().filter(s => !s.hidden && this.focusables(s).length);
      return open.length ? open[open.length - 1] : null;
    }
    focusables(scope) {
      return Array.from(scope.querySelectorAll('button:not([disabled]):not([hidden]), input[type=range], .set-row, [tabindex="0"]')).filter(b => b.offsetParent !== null);
    }
    navigate(code) {
      const ui = this.game.ui;
      if (this.game.state === 'cabinet' || (ui && ui.isOpen('scr-settings'))) { this.sendKey(code); return; }
      const scr = this.topScreen();
      if (!scr) return;
      const items = this.focusables(scr), cur = document.activeElement;
      if (!items.includes(cur)) { items[0].focus({ preventScroll: false }); return; }
      if (cur.type === 'range' && (code === 'ArrowLeft' || code === 'ArrowRight')) {
        const step = +cur.step || 0.05, v = Math.min(+cur.max, Math.max(+cur.min, +cur.value + (code === 'ArrowRight' ? step : -step)));
        cur.value = v; cur.dispatchEvent(new Event('input', { bubbles: true }));
        return;
      }
      // nearest element in that direction; if none, wrap around the list
      const r = cur.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const vert = code === 'ArrowUp' || code === 'ArrowDown', sign = code === 'ArrowUp' || code === 'ArrowLeft' ? -1 : 1;
      let best = null, bestScore = Infinity;
      for (const e of items) {
        if (e === cur) continue;
        const q = e.getBoundingClientRect(), dx = q.left + q.width / 2 - cx, dy = q.top + q.height / 2 - cy;
        const main = (vert ? dy : dx) * sign, side = Math.abs(vert ? dx : dy);
        if (main <= 4) continue;
        const score = main + side * 2.5;
        if (score < bestScore) { bestScore = score; best = e; }
      }
      if (!best) {
        if (!vert) return;
        const i = items.indexOf(cur);
        best = items[(i + sign + items.length) % items.length];
      }
      best.focus({ preventScroll: false });
      if (best.scrollIntoView) best.scrollIntoView({ block: 'nearest' });
      this.game.audio && this.game.audio.uiMove && this.game.audio.uiMove();
    }
    choose() {
      if (this.game.state === 'cabinet') { this.sendKey('Enter'); return; }
      const scr = this.topScreen(), cur = document.activeElement;
      if (!scr) return;
      if (!cur || !scr.contains(cur) || cur === document.body) { const f = this.focusables(scr)[0]; if (f) f.focus(); return; }
      if (cur.classList.contains('set-row')) { if (cur.dataset.type === 'toggle') this.sendKey('Enter'); else this.sendKey('ArrowRight'); return; }
      if (cur.tagName === 'BUTTON') cur.click();
    }
    // A short rumble for a scare or a hit, scaled by the camera-shake setting
    rumble(k) {
      const gp = this.pad.gp;
      if (!gp || !this.usingPad || !gp.vibrationActuator || !gp.vibrationActuator.playEffect) return;
      const S = PB.Settings.data, s = Math.min(1, k) * (S.shake != null ? S.shake : 1);
      if (s < 0.05) return;
      try { gp.vibrationActuator.playEffect('dual-rumble', { duration: Math.round(120 + 380 * Math.min(1, k)), strongMagnitude: Math.min(1, s), weakMagnitude: Math.min(1, s * 0.7) }).catch(() => {}); } catch (e) { /* no rumble motor */ }
    }
    endFrame() {
      this.pad.edges.clear();
      this.edges.clear();
      for (const v of [...this.virtual]) if (v[0] === '!') this.virtual.delete(v);
    }
    consumeLook() { const r = { dx: this.dx, dy: this.dy }; this.dx = 0; this.dy = 0; return r; }
    // Dokunmatik arayüz bağlantısı (UI tarafından çağrılır)
    bindTouch(ui) {
      const stick = ui.el('touch-stick'), knob = ui.el('touch-knob'), look = ui.el('touch-look');
      if (!stick) return;
      let sid = null, sx = 0, sy = 0;
      stick.addEventListener('pointerdown', e => { sid = e.pointerId; sx = e.clientX; sy = e.clientY; stick.setPointerCapture(e.pointerId); e.preventDefault(); });
      stick.addEventListener('pointermove', e => {
        if (e.pointerId !== sid) return;
        const dx = e.clientX - sx, dy = e.clientY - sy, m = 55, l = Math.min(m, Math.hypot(dx, dy)), a = Math.atan2(dy, dx);
        this.move.x = Math.cos(a) * l / m; this.move.y = Math.sin(a) * l / m;
        knob.style.transform = `translate(${Math.cos(a) * l}px, ${Math.sin(a) * l}px)`;
      });
      const endStick = e => { if (e.pointerId !== sid) return; sid = null; this.move.x = this.move.y = 0; knob.style.transform = ''; };
      stick.addEventListener('pointerup', endStick); stick.addEventListener('pointercancel', endStick);
      let lid = null, lx = 0, ly = 0;
      look.addEventListener('pointerdown', e => { lid = e.pointerId; lx = e.clientX; ly = e.clientY; look.setPointerCapture(e.pointerId); e.preventDefault(); });
      look.addEventListener('pointermove', e => {
        if (e.pointerId !== lid) return;
        const k = 2.2 * PB.Settings.data.touchSens;
        this.dx += (e.clientX - lx) * k; this.dy += (e.clientY - ly) * k;
        lx = e.clientX; ly = e.clientY;
      });
      const endLook = e => { if (e.pointerId === lid) lid = null; };
      look.addEventListener('pointerup', endLook); look.addEventListener('pointercancel', endLook);
      const btn = (id, fn) => { const b = ui.el(id); if (b) b.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); fn(b); }); };
      btn('tb-interact', () => this.tap('interact'));
      btn('tb-flash', () => this.tap('flash'));
      btn('tb-reload', () => this.tap('reload'));
      btn('tb-map', () => this.tap('map'));
      btn('tb-bag', () => this.tap('inventory'));
      btn('tb-pause', () => this.tap('pause'));
      btn('tb-throw', () => this.tap('throw'));
      btn('tb-drink', () => this.tap('drink'));
      btn('tb-sprint', b => { this.touchSprint = !this.touchSprint; b.classList.toggle('on', this.touchSprint); });
      btn('tb-crouch', b => { this.touchCrouch = !this.touchCrouch; b.classList.toggle('on', this.touchCrouch); });
    }
  }

  class Player {
    constructor(game) {
      this.game = game;
      this.cam = game.camera;
      this.pos = new THREE.Vector3();
      this.vel = new THREE.Vector3();
      this.yaw = 0; this.pitch = 0;
      this.eye = 1.62; this.eyeCur = 1.62; this.lean = 0;
      this.radius = 0.3;
      this.stamina = 100; this.exhausted = false;
      this.fear = 0;
      this.battery = 100; this.flashOn = false; this.hasFlashlight = true;
      this.bob = 0; this.stepDist = 0; this.trauma = 0;
      this.crouching = false; this.sprinting = false; this.sprintToggle = false; this.crouchToggle = false;
      this.hidden = null;
      this.floorY = 0;
      this.moving = false;
      this.breathT = 0; this.heartT = 0;
      this.frozen = false;
      // Fener: kameraya bağlı spot ışığı, hafif gecikmeyle döner
      const fl = new THREE.SpotLight(0xfff0d8, 0, 32, 0.62, 0.35, 2);
      fl.position.set(0, 0, 0);
      // Light cookie: hot center, reflector rings, dim outer spill, lens smudges
      fl.map = PB.Tex.canvas('flashCookie', 256, 256, (g, w, h) => {
        const cx = w / 2, cy = h / 2, R = w / 2;
        g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
        const grd = g.createRadialGradient(cx, cy, 0, cx, cy, R);
        grd.addColorStop(0, '#ffffff'); grd.addColorStop(0.12, '#fffcf6'); grd.addColorStop(0.22, '#d6d2ca'); grd.addColorStop(0.28, '#f2eee6'); grd.addColorStop(0.36, '#a8a49c');
        grd.addColorStop(0.6, '#56534e'); grd.addColorStop(0.85, '#1e1d1b'); grd.addColorStop(1, '#000000');
        g.fillStyle = grd; g.fillRect(0, 0, w, h);
        const r = PB.U.rng(5);
        g.globalAlpha = 0.08;
        for (let k = 0; k < 7; k++) { g.strokeStyle = r() < 0.5 ? '#000' : '#fff'; g.lineWidth = 2 + r() * 3; g.beginPath(); g.arc(cx, cy, R * r.range(0.12, 0.6), 0, Math.PI * 2); g.stroke(); }
        g.globalAlpha = 0.07; g.fillStyle = '#000';
        for (let k = 0; k < 12; k++) { g.beginPath(); g.arc(cx + r.range(-0.3, 0.3) * R, cy + r.range(-0.3, 0.3) * R, r.range(4, 16), 0, Math.PI * 2); g.fill(); }
        g.globalAlpha = 1;
      });
      fl.map.colorSpace = THREE.NoColorSpace;
      this.flash = fl;
      this.flashTarget = new THREE.Object3D();
      fl.target = this.flashTarget;
      game.scene.add(fl); game.scene.add(this.flashTarget);
      this.flashDir = new THREE.Vector3(0, 0, -1);
      this.applyShadowSetting();
      // Yakın dolgu ışığı: tamamen zifiri karanlıkta bile fener halkasının etrafı okunabilsin
      this.fill = new THREE.PointLight(0xffe8c8, 0, 6, 2);
      game.scene.add(this.fill);
      this.beam = this.makeBeam();
      game.scene.add(this.beam);
      this.reloadT = 0;
      // First-person hands
      this.vm = new PB.ViewModel(game, this.cam);
    }
    // Visible beam: light scattered by the dust in front of the lens. Seen from behind its apex,
    // the inside of a cone: rays near the axis travel far through lit air, rays at the rim barely.
    makeBeam() {
      const geo = new THREE.CylinderGeometry(1, 0.02, 1, 40, 12, true);
      geo.translate(0, 0.5, 0);
      const m = new THREE.ShaderMaterial({
        uniforms: { uCol: { value: new THREE.Color(1, 0.93, 0.82) }, uK: { value: 0 }, uTime: { value: 0 } },
        vertexShader: `varying float vT; varying vec3 vW; varying vec3 vN;
          void main(){ vT = position.y; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * w; }`,
        fragmentShader: `uniform vec3 uCol; uniform float uK; uniform float uTime; varying float vT; varying vec3 vW; varying vec3 vN;
          void main(){
            float dust = 0.75 + 0.25 * sin(vW.x * 3.1 + uTime * 0.4) * sin(vW.z * 2.7 - uTime * 0.3) * sin(vW.y * 3.7 + uTime * 0.2);
            // soft silhouette: where the cone's wall is seen edge-on it would read as a hard sheet
            float face = smoothstep(0.05, 0.55, abs(dot(normalize(vN), normalize(cameraPosition - vW))));
            float a = uK * pow(vT, 0.75) * pow(1.0 - vT, 1.7) * smoothstep(0.0, 0.12, vT) * dust * face;
            gl_FragColor = vec4(uCol * a, 1.0);
          }`,
        transparent: true, depthWrite: false, side: THREE.BackSide, blending: THREE.AdditiveBlending, fog: false,
      });
      const mesh = new THREE.Mesh(geo, m);
      mesh.frustumCulled = false;
      mesh.renderOrder = 4;
      mesh.visible = false;
      mesh.name = 'flashBeam';
      return mesh;
    }
    // Change batteries: the light goes out while the hand swaps the cells
    reload() {
      const g = this.game;
      if (!this.hasFlashlight || this.reloadT > 0 || this.hidden) return false;
      if (!g.inv || g.inv.batteries <= 0) { g.ui.hint(PB.t('n.noSpare')); return false; }
      if (this.battery > 97) { g.ui.hint(PB.t('n.batteryFull')); return false; }
      this.reloadT = 1.3; this.reloadOn = this.flashOn || this.battery <= 0;
      this.flashOn = false;
      if (g.audio) g.audio.batterySwap();
      return true;
    }
    updateReload(dt) {
      if (this.reloadT <= 0) return;
      this.reloadT -= dt;
      if (this.reloadT <= 0) {
        const g = this.game;
        this.reloadT = 0;
        if (g.inv && g.inv.batteries > 0) { g.inv.batteries--; this.battery = 100; g.ui.notify(PB.t('n.batterySwap')); g.updateInventoryUI(); }
        if (this.reloadOn) this.toggleFlash(true);
      }
    }
    applyShadowSetting() {
      const q = PB.Settings.data.shadows;
      const fl = this.flash;
      fl.castShadow = q > 0;
      const max = (this.game && this.game.renderer && this.game.renderer.capabilities.maxTextureSize) || 4096;
      const size = Math.min(max, [512, 1024, 2048, 4096, 8192][q] || 1024);
      fl.shadow.mapSize.set(size, size);
      fl.shadow.bias = -0.0004;
      fl.shadow.normalBias = 0.03;
      fl.shadow.camera.near = 0.25;
      fl.shadow.camera.far = 28;
      if (fl.shadow.map) { fl.shadow.map.dispose(); fl.shadow.map = null; }
    }
    spawn(x, z, yaw) {
      this.pos.set(x, 0, z);
      this.vel.set(0, 0, 0);
      this.yaw = yaw || 0; this.pitch = 0;
      this.hidden = null;
      this.stamina = 100; this.exhausted = false;
      this.fear = 0;
      this.floorY = this.game.world ? this.game.world.floorAt(x, z) : 0;
      this.pos.y = this.floorY;
      this.updateCamera(0, 0);
    }
    forward() { return new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw)); }
    surface() {
      const w = this.game.world;
      if (!w) return 'carpet';
      if (w.floorAt(this.pos.x, this.pos.z) < -0.1 && !w.drained) return 'water';
      const th = w.L.theme;
      const fin = w.finishAt && w.finishAt(this.pos.x, this.pos.z);
      if (fin) return fin;
      return th === 'concrete' ? 'concrete' : th === 'pool' ? 'tile' : th === 'maze' || th === 'glitch' ? 'metal' : th === 'yellow' ? 'wetCarpet' : th === 'office' ? 'carpet' : 'carpet';
    }
    update(dt) {
      const g = this.game, inp = g.input, S = PB.Settings.data;
      const look = inp.consumeLook();
      // freeLook: held in place by a scene (a lifeboat, a car, a cage) but free to turn the head
      if (!this.frozen || this.freeLook) {
        const sens = 0.0021 * S.mouseSens;
        this.yaw -= look.dx * sens;
        this.pitch -= look.dy * sens * (S.invertY ? -1 : 1);
        this.pitch = U.clamp(this.pitch, -1.45, 1.45);
      }
      if (this.hidden) { this.updateHidden(dt); return; }
      // Hareket girdisi
      let mx = 0, mz = 0;
      if (!this.frozen) {
        if (inp.down('forward')) mz -= 1;
        if (inp.down('back')) mz += 1;
        if (inp.down('left')) mx -= 1;
        if (inp.down('right')) mx += 1;
        mx += inp.move.x + inp.pad.mx; mz += inp.move.y + inp.pad.my;
      }
      const ml = Math.hypot(mx, mz);
      if (ml > 1) { mx /= ml; mz /= ml; }
      this.moving = ml > 0.1;
      // Koşma / eğilme
      if (S.toggleCrouch) { if (inp.pressed('crouch')) this.crouchToggle = !this.crouchToggle; this.crouching = this.crouchToggle || inp.touchCrouch; }
      else this.crouching = inp.down('crouch') || inp.touchCrouch;
      let wantSprint;
      if (S.toggleSprint) { if (inp.pressed('sprint')) this.sprintToggle = !this.sprintToggle; wantSprint = this.sprintToggle; }
      else wantSprint = inp.down('sprint');
      wantSprint = (wantSprint || inp.touchSprint) && mz < -0.3 && !this.crouching;
      if (this.stamina <= 0) this.exhausted = true;
      if (this.exhausted && this.stamina > 30) this.exhausted = false;
      this.sprinting = wantSprint && !this.exhausted && this.moving;
      const water = this.surface() === 'water';
      let speed = this.crouching ? 1.35 : this.sprinting ? 4.35 : 2.4;
      if (water) speed *= 0.62;
      // a scene can slow you down (rising water, deep snow)
      if (this.speedMul != null) speed *= this.speedMul;
      if (this.fear > 85) speed *= 0.92;
      if (this.exhausted) speed = Math.min(speed, 1.9);
      // Dayanıklılık
      if (this.sprinting) this.stamina = Math.max(0, this.stamina - 17 * dt);
      else this.stamina = Math.min(100, this.stamina + (this.moving ? 9 : 15) * dt);
      // Hız ve çarpışma
      const s = Math.sin(this.yaw), c = Math.cos(this.yaw);
      const tx = (mx * c + mz * s) * speed, tz = (-mx * s + mz * c) * speed;
      this.vel.x = U.damp(this.vel.x, tx, 11, dt);
      this.vel.z = U.damp(this.vel.z, tz, 11, dt);
      const ox = this.pos.x, oz = this.pos.z;
      this.pos.x += this.vel.x * dt; this.pos.z += this.vel.z * dt;
      if (g.world) g.world.collide(this.pos, this.radius);
      const moved = Math.hypot(this.pos.x - ox, this.pos.z - oz);
      // Zemin yüksekliği (havuzlar)
      const fy = g.world ? g.world.floorAt(this.pos.x, this.pos.z) : 0;
      this.floorY = U.damp(this.floorY, fy, 9, dt);
      this.pos.y = this.floorY;
      // Adımlar ve ses
      const stride = this.sprinting ? 1.05 : this.crouching ? 0.6 : 0.78;
      this.stepDist += moved;
      if (this.stepDist > stride) {
        this.stepDist -= stride;
        const surf = this.surface();
        const loud = this.sprinting ? 1 : this.crouching ? 0.25 : 0.55;
        if (g.audio) g.audio.footstep(surf, loud, null);
        const radius = (this.sprinting ? 17 : this.crouching ? 2.5 : 7) * (surf === 'water' ? 1.7 : 1) * (surf === 'metal' ? 1.2 : 1);
        g.noise(this.pos.x, this.pos.z, radius, 'step');
      }
      this.bob += moved * (this.sprinting ? 2.3 : 2.8);
      // Breathing and heartbeat
      this.updateBreathing(dt);
      const exert = (100 - this.stamina) / 100;
      void exert;
      this.heartT -= dt;
      if (this.fear > 35 && this.heartT <= 0) { this.heartT = U.lerp(1.1, 0.42, (this.fear - 35) / 65); if (g.audio) g.audio.heartbeat(U.clamp((this.fear - 30) / 70, 0.2, 1)); }
      // Fener
      if (inp.pressed('flash') && !this.frozen && this.reloadT <= 0) this.toggleFlash();
      if (inp.pressed('reload') && !this.frozen) this.reload();
      this.updateReload(dt);
      this.updateCamera(dt, ml * speed);
    }
    toggleFlash(force) {
      if (!this.hasFlashlight) { this.game.ui.hint(PB.t('n.noFlash')); return; }
      const on = force != null ? force : !this.flashOn;
      if (on && this.battery <= 0) { this.game.ui.hint(PB.t('n.noBattery')); if (this.game.audio) this.game.audio.flashClick(); return; }
      this.flashOn = on;
      if (this.game.audio) this.game.audio.flashClick();
    }
    updateFlash(dt) {
      const g = this.game, dif = PB.Settings.difficulty();
      const drain = (g.levelDef && g.levelDef.theme === 'dark' ? 0.55 : 0.36) * dif.battery;
      if (this.flashOn) { this.battery = Math.max(0, this.battery - drain * dt); if (this.battery <= 0) { this.flashOn = false; g.ui.hint(PB.t('n.flashDead'), true); } }
      let k = this.flashOn ? 1 : 0;
      if (this.flashOn && this.battery < 15) k *= Math.random() < 0.08 ? 0.15 : 0.75;
      if (this.flashOn && g.flashInterference > 0) k *= Math.random() < g.flashInterference * 0.5 ? 0.05 : 1;
      // Eyes adapt: a wall right in front of the lens would blow out, so the beam backs off up close
      if (this.flashOn) {
        const L = g.level, cam = this.cam, d0 = this.flashDir, ceil = (L && L.ceil) || 3;
        let hit = 4;
        if (L) for (let s = 0.25; s <= 4; s += 0.25) {
          const x = cam.position.x + d0.x * s, y = cam.position.y + d0.y * s, z = cam.position.z + d0.z * s;
          if (y < 0.02 || y > ceil - 0.02 || !L.los(cam.position.x, cam.position.z, x, z) || this.beamBlocked(x, y, z)) { hit = s; break; }
        }
        // the light on a surface goes with the square of the distance: the eye takes most of that back
        this.flashNear = U.damp(this.flashNear == null ? 1 : this.flashNear, U.clamp(Math.pow(hit / 4, 1.8), 0.14, 1), 5, dt);
        k *= this.flashNear;
      }
      // Brighter where the chapter's exposure is low, so the beam always reads on screen
      const expo = g.post && g.post.p ? g.post.p.exposure.value : 1;
      const base = 110 * U.clamp(1 / Math.max(expo, 0.05), 1, 2.6);
      this.flash.intensity = U.damp(this.flash.intensity, k * base, 25, dt);
      this.fill.intensity = this.flash.intensity * 0.012;
      // No shadow pass for a light that is off
      if (this.flash.castShadow) this.flash.shadow.autoUpdate = this.flash.intensity > 0.5;
      const cam = this.cam;
      const want = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
      this.flashDir.lerp(want, 1 - Math.exp(-14 * dt)).normalize();
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion);
      if (this.vm && this.vm.show > 0.5 && !this.hidden) {
        // The beam leaves the flashlight in the hand and follows its sway
        this.flash.position.copy(this.vm.tipWorld);
        this.flashDir.lerp(this.vm.dirWorld, 1 - Math.exp(-20 * dt)).normalize();
      } else this.flash.position.copy(cam.position).addScaledVector(right, 0.16).add(new THREE.Vector3(0, -0.14, 0));
      this.flashTarget.position.copy(this.flash.position).addScaledVector(this.flashDir, 10);
      this.fill.position.copy(cam.position).addScaledVector(this.flashDir, 1.2);
      this.updateBeam(dt, base);
    }
    // Is this point inside something the beam would light: a closed door leaf or a piece of furniture
    beamBlocked(x, y, z) {
      const W = this.game.world, L = this.game.level;
      if (!W) return false;
      for (const o of W.doorObjs.values()) {
        if (o.amt > 0.4) continue;
        const G = o.g, dx = x - G.cx, dz = z - G.cz;
        if (Math.abs(dx * G.ax + dz * G.az) < G.width / 2 && Math.abs(dx * G.nIn.x + dz * G.nIn.z) < 0.12 && y < G.height) return true;
      }
      const list = W.colGrid.get(L.i(Math.floor(x / L.cell), Math.floor(z / L.cell)));
      if (list) for (const b of list) if (x > b.minX && x < b.maxX && z > b.minZ && z < b.maxZ && y > b.minY && y < Math.min(b.maxY, 2.6)) return true;
      return false;
    }
    updateBeam(dt, base) {
      const b = this.beam, g = this.game, L = g.level;
      const k = this.flash.intensity / base;
      // The volumetric pass ray-marches the beam itself (with shadows); this cone stands in when it is off
      b.visible = k > 0.02 && g.state !== 'menu' && PB.Settings.data.volumetric === 'off';
      if (!b.visible) return;
      // Length: up to the first wall, floor or ceiling along the beam
      const p = this.flash.position, d = this.flashDir, ceil = (L && L.ceil) || 3;
      let len = 9;
      if (L) for (let s = 0.25; s <= 9; s += 0.25) {
        const x = p.x + d.x * s, y = p.y + d.y * s, z = p.z + d.z * s;
        if (y < 0 || y > ceil || !L.los(p.x, p.z, x, z)) { len = s; break; }
      }
      this.beamLen = U.damp(this.beamLen || len, len, 12, dt);
      const r = this.beamLen * Math.tan(this.flash.angle * 0.8);
      b.position.copy(p).addScaledVector(d, 0.02);
      b.quaternion.setFromUnitVectors(this._up || (this._up = new THREE.Vector3(0, 1, 0)), d);
      b.scale.set(r, this.beamLen, r);
      const haze = g.levelDef && g.levelDef.haze != null ? g.levelDef.haze : 1;
      b.material.uniforms.uK.value = 0.13 * k * haze;
      b.material.uniforms.uTime.value = g.time;
    }
    updateCamera(dt, speed) {
      const S = PB.Settings.data, cam = this.cam;
      const targetEye = this.hidden ? this.hidden.eye : this.crouching ? 0.98 : 1.62;
      this.eyeCur = U.damp(this.eyeCur, targetEye, 10, dt || 1);
      const bobK = S.headBob * U.clamp(speed / 4, 0, 1);
      const by = Math.sin(this.bob * 2) * 0.045 * bobK, bx = Math.cos(this.bob) * 0.03 * bobK;
      this.trauma = Math.max(0, this.trauma - (dt || 0) * 0.9);
      const sh = this.trauma * this.trauma * S.shake;
      const t = performance.now() / 1000;
      const shx = (Math.sin(t * 37) + Math.sin(t * 23.7)) * 0.03 * sh, shy = (Math.sin(t * 31) + Math.sin(t * 19.3)) * 0.03 * sh;
      const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
      // Lean around corners (Z / X): the head slides sideways and tilts, but never through a wall
      const inp = this.game.input;
      let leanT = this.hidden || this.frozen || !inp ? 0 : (inp.down('leanR') ? 1 : 0) - (inp.down('leanL') ? 1 : 0);
      if (leanT && this.sprinting) leanT = 0;
      this.lean = U.damp(this.lean, leanT, 9, dt || 1);
      let lx = right.x * this.lean * 0.42, lz = right.z * this.lean * 0.42;
      const L = this.game.level;
      if (L && Math.abs(this.lean) > 0.01) {
        const ex = this.pos.x + lx * 1.35, ez = this.pos.z + lz * 1.35;
        const q = { x: ex, z: ez };
        if (this.game.world && this.game.world.collide) this.game.world.collide(q, 0.14);
        const blocked = !L.los(this.pos.x, this.pos.z, ex, ez) || Math.hypot(q.x - ex, q.z - ez) > 0.02;
        if (blocked) { this.lean *= 0.85; lx *= 0.3; lz *= 0.3; }
      }
      cam.position.set(this.pos.x + right.x * bx + lx, this.pos.y + this.eyeCur + by - Math.abs(this.lean) * 0.05 + (this.camLift || 0), this.pos.z + right.z * bx + lz);
      if (this.hidden) cam.position.set(this.hidden.x, this.hidden.floor + this.eyeCur, this.hidden.z);
      // Look back over your shoulder (hold V or the middle mouse button): the body keeps running the same way
      const lb = inp && !this.hidden && !this.frozen && inp.down('lookBack') ? 1 : 0;
      this.lookBack = U.damp(this.lookBack || 0, lb, 9, dt || 1);
      cam.rotation.order = 'YXZ';
      // a listing ship, a tilting world: the chapter can lean the horizon (slowly rolling round it)
      const lv = this.game.levelDef, list = lv && lv.list ? lv.list * (1 + Math.sin(t * 0.31) * 0.25) + Math.sin(t * 0.73) * lv.list * 0.15 : 0;
      cam.rotation.set(this.pitch * (1 - this.lookBack * 0.7) + shy, this.yaw + shx + this.lookBack * 2.75, (Math.sin(this.bob) * 0.006 * bobK) + sh * 0.02 * Math.sin(t * 13) - this.lean * 0.13 + this.lookBack * 0.06 + list + (this.camRoll || 0));
      // Koşarken hafif FOV artışı
      const fovT = S.fov + (this.sprinting ? 6 : 0) - (this.fear > 70 ? (this.fear - 70) * 0.15 : 0);
      if (Math.abs(cam.fov - fovT) > 0.05) { cam.fov = U.damp(cam.fov, fovT, 6, dt || 1); cam.updateProjectionMatrix(); }
      if (this.vm) this.vm.update(dt || 0, this);
    }
    addTrauma(k) {
      this.trauma = Math.min(1, this.trauma + k);
      if (k >= 0.1 && this.game.input) this.game.input.rumble(k);
    }
    // ---------------------------------------------------------- saklanma
    hide(spot) {
      this.hidden = { x: spot.x, z: spot.z, eye: spot.eye || 0.72, floor: this.floorY, spot, fromX: this.pos.x, fromZ: this.pos.z, t: 0 };
      document.body.classList.toggle('in-locker', spot.kind === 'locker');
      this.yaw = spot.yaw != null ? spot.yaw : this.yaw;
      this.pitch = -0.05;
      this.flashOn = false;
    }
    unhide() {
      if (!this.hidden) return;
      const h = this.hidden;
      this.pos.x = h.fromX; this.pos.z = h.fromZ;
      this.hidden = null;
      document.body.classList.remove('in-locker');
    }
    // You always hear yourself breathe: slow through the nose when calm, through the mouth when
    // moving hard, panting after a sprint, shaky when afraid. Each breath is scheduled after the
    // previous one ends, in and out in turn, so the rhythm is continuous and follows your state.
    updateBreathing(dt) {
      const g = this.game;
      if (!g.audio || !g.audio.ctx) return;
      this.breathT -= dt;
      if (this.breathT > 0) return;
      const exert = (100 - this.stamina) / 100, fear = this.fear / 100;
      this.breathIn = !this.breathIn;
      let kind, gain, pause;
      // out of breath you pant, but quietly: it is your own breathing, not a sound effect
      if (exert > 0.55 || this.exhausted) { kind = this.breathIn ? 'heavyIn' : 'heavyOut'; gain = 0.1 + 0.12 * exert; pause = this.breathIn ? 0.06 : 0.16; }
      else if (fear > 0.55) { kind = this.breathIn ? 'fearIn' : 'fearOut'; gain = 0.09 + 0.1 * fear; pause = 0.14; }
      else if (exert > 0.25 || this.sprinting) { kind = this.breathIn ? 'in' : 'out'; gain = 0.07 + 0.1 * exert; pause = 0.28; }
      else { kind = this.breathIn ? 'calmIn' : 'calmOut'; gain = 0.06; pause = this.breathIn ? 0.2 : 1.1; }
      const dur = g.audio.breathe(kind, gain * (this.crouching ? 0.8 : 1));
      this.breathT = Math.max(0.25, dur * 0.95 + pause * (0.8 + Math.random() * 0.4));
    }
    updateHidden(dt) {
      const h = this.hidden, g = this.game, inp = g.input;
      h.t += dt;
      this.pitch = U.clamp(this.pitch, -0.35, 0.3);
      if (h.spot.yaw != null) this.yaw = h.spot.yaw + U.clamp(U.angleWrap(this.yaw - h.spot.yaw), -0.9, 0.9);
      // Hold your breath (Shift) when something comes close. Run out and you gasp; breathe hard and it hears you.
      const near = (g.entities || []).filter(e => e.hostile && !e.friendly && e.mesh && e.distToPlayer && e.distToPlayer() < 4.2);
      if (near.length && !this.breathHinted) { this.breathHinted = true; g.ui.hint(PB.t('n.holdBreath')); }
      const was = this.holdingBreath;
      this.holdingBreath = (inp.down('sprint') || inp.touchSprint) && this.stamina > 0 && !this.gaspLock;
      if (was && !this.holdingBreath && !this.gaspLock && g.audio) { g.audio.breathe('release', 0.35); this.breathT = 1.6; }
      if (!this.holdingBreath && !this.gaspLock) this.updateBreathing(dt * (near.length ? 0.6 : 1)); else this.breathT = Math.max(this.breathT, 0.4);
      if (this.holdingBreath) {
        this.stamina = Math.max(0, this.stamina - 12.5 * dt);
        this.fear = Math.min(100, this.fear + 3 * dt);
        if (this.stamina <= 0) {
          // Gasp: loud, and anything close enough knows exactly where you are
          this.gaspLock = true;
          if (g.audio) { g.audio.breathe('gasp', 0.8); g.audio.breathe('heavyOut', 0.6); }
          g.noise(this.pos.x, this.pos.z, 9, 'gasp');
          if (near.some(e => e.distToPlayer() < 3.5)) { this.discovered(); return; }
        }
      } else {
        this.stamina = Math.min(100, this.stamina + 12 * dt);
        if (this.stamina > 45) this.gaspLock = false;
        const close = near.filter(e => e.distToPlayer() < 2.8);
        if (close.length && this.fear > 50) {
          this.heardT = (this.heardT || 0) + dt * (this.fear / 100) * (this.gaspLock ? 1.8 : 1);
          if (this.heardT > 1.8) { this.heardT = 0; this.discovered(); return; }
        } else this.heardT = Math.max(0, (this.heardT || 0) - dt * 0.6);
      }
      this.updateCamera(dt, 0);
    }
    // Something heard you breathing and pulls you out of the hiding place
    discovered() {
      const g = this.game;
      g.ui.hint(PB.t('n.heardBreath'), true);
      this.unhide();
      this.addTrauma(0.7);
      this.fear = Math.min(100, this.fear + 30);
      if (g.audio) g.audio.stinger('jump');
      for (const e of g.entities || []) if (e.hostile && e.distToPlayer && e.distToPlayer() < 6) e.sawHide = true;
    }
  }
  PB.Input = Input;
  PB.Player = Player;
})(typeof window !== 'undefined' ? window : globalThis);
