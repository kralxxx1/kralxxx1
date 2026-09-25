/* Girdi (klavye, fare kilidi / sürükleme, dokunmatik) ve birinci şahıs oyuncu denetleyicisi. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U;

  const MAP = {
    forward: ['KeyW', 'ArrowUp'], back: ['KeyS', 'ArrowDown'], left: ['KeyA', 'ArrowLeft'], right: ['KeyD', 'ArrowRight'],
    sprint: ['ShiftLeft', 'ShiftRight'], crouch: ['KeyC'], interact: ['KeyE', 'Enter'],
    flash: ['KeyF'], map: ['KeyM', 'Tab'], journal: ['KeyJ'], pause: ['Escape', 'KeyP'], throw: ['KeyG'], inventory: ['KeyI'], drink: ['KeyQ'], leanL: ['KeyZ'], leanR: ['KeyX'],
  };

  class Input {
    constructor(game, canvas) {
      this.game = game; this.canvas = canvas;
      this.keys = new Set(); this.edges = new Set();
      this.dx = 0; this.dy = 0;
      this.locked = false; this.lockFailed = false; this.dragging = false;
      this.move = { x: 0, y: 0 }; // dokunmatik joystick
      this.touchSprint = false; this.touchCrouch = false;
      this.virtual = new Set();
      root.addEventListener('keydown', e => {
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
      });
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
    down(action) { return MAP[action].some(k => this.keys.has(k)) || this.virtual.has(action); }
    pressed(action) { return MAP[action].some(k => this.edges.has(k)) || this.virtual.has('!' + action); }
    tap(action) { this.virtual.add('!' + action); }
    endFrame() {
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
      btn('tb-map', () => this.tap('map'));
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
      // First-person hands
      this.vm = new PB.ViewModel(game, this.cam);
    }
    applyShadowSetting() {
      const q = PB.Settings.data.shadows;
      const fl = this.flash;
      fl.castShadow = q > 0;
      const size = [512, 1024, 2048, 4096][q] || 1024;
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
      if (!this.frozen) {
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
        mx += inp.move.x; mz += inp.move.y;
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
      // Nefes ve kalp
      this.breathT -= dt;
      const exert = (100 - this.stamina) / 100;
      if (this.breathT <= 0 && (exert > 0.45 || this.fear > 60)) { this.breathT = U.lerp(1.4, 0.6, Math.max(exert, this.fear / 100)); if (g.audio) g.audio.breath(Math.max(exert, this.fear / 120)); }
      this.heartT -= dt;
      if (this.fear > 35 && this.heartT <= 0) { this.heartT = U.lerp(1.1, 0.42, (this.fear - 35) / 65); if (g.audio) g.audio.heartbeat(U.clamp((this.fear - 30) / 70, 0.2, 1)); }
      // Fener
      if (inp.pressed('flash') && !this.frozen) this.toggleFlash();
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
        if (L) for (let s = 0.3; s <= 4; s += 0.3) {
          const x = cam.position.x + d0.x * s, y = cam.position.y + d0.y * s, z = cam.position.z + d0.z * s;
          if (y < 0.02 || y > ceil - 0.02 || !L.los(cam.position.x, cam.position.z, x, z)) { hit = s; break; }
        }
        this.flashNear = U.damp(this.flashNear == null ? 1 : this.flashNear, 0.42 + 0.58 * U.smoothstep(0.4, 3.2, hit), 6, dt);
        k *= this.flashNear;
      }
      this.flash.intensity = U.damp(this.flash.intensity, k * 95, 25, dt);
      this.fill.intensity = this.flash.intensity * 0.012;
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
      cam.position.set(this.pos.x + right.x * bx + lx, this.pos.y + this.eyeCur + by - Math.abs(this.lean) * 0.05, this.pos.z + right.z * bx + lz);
      if (this.hidden) cam.position.set(this.hidden.x, this.hidden.floor + this.eyeCur, this.hidden.z);
      cam.rotation.order = 'YXZ';
      cam.rotation.set(this.pitch + shy, this.yaw + shx, (Math.sin(this.bob) * 0.006 * bobK) + sh * 0.02 * Math.sin(t * 13) - this.lean * 0.13);
      // Koşarken hafif FOV artışı
      const fovT = S.fov + (this.sprinting ? 6 : 0) - (this.fear > 70 ? (this.fear - 70) * 0.15 : 0);
      if (Math.abs(cam.fov - fovT) > 0.05) { cam.fov = U.damp(cam.fov, fovT, 6, dt || 1); cam.updateProjectionMatrix(); }
      if (this.vm) this.vm.update(dt || 0, this);
    }
    addTrauma(k) { this.trauma = Math.min(1, this.trauma + k); }
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
    updateHidden(dt) {
      const h = this.hidden, g = this.game, inp = g.input;
      h.t += dt;
      this.pitch = U.clamp(this.pitch, -0.35, 0.3);
      if (h.spot.yaw != null) this.yaw = h.spot.yaw + U.clamp(U.angleWrap(this.yaw - h.spot.yaw), -0.9, 0.9);
      // Hold your breath (Shift) when something comes close. Run out and you gasp; breathe hard and it hears you.
      const near = (g.entities || []).filter(e => e.hostile && !e.friendly && e.mesh && e.distToPlayer && e.distToPlayer() < 4.2);
      if (near.length && !this.breathHinted) { this.breathHinted = true; g.ui.hint(PB.t('n.holdBreath')); }
      this.holdingBreath = inp.down('sprint') && this.stamina > 0 && !this.gaspLock;
      if (this.holdingBreath) {
        this.stamina = Math.max(0, this.stamina - 12.5 * dt);
        this.fear = Math.min(100, this.fear + 3 * dt);
        if (this.stamina <= 0) {
          // Gasp: loud, and anything close enough knows exactly where you are
          this.gaspLock = true;
          if (g.audio) { g.audio.breath(1.3); g.audio.breath(1.3); }
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
