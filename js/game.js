/* Oyun çekirdeği: açılış, durum makinesi, bölüm yükleme, eşyalar/etkileşimler, bölüm senaryoları,
   kayıt sistemi, korku, ölüm ve sonlar. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, S = PB.Settings, ST = PB.Story, P = PB.Props, T = PB.Tex;
  const t = PB.t;
  const SAVE_KEY = 'pb.save.v2';
  const $ = id => document.getElementById(id);

  const MARK = { obj: '#ffe23b', tape: '#ff5050', note: '#e8e8e8', shrine: '#ff9ad5', supply: '#6bd6ff' };

  class Game {
    constructor() {
      this.state = 'boot';
      this.time = 0; this.playTime = 0;
      this.items = []; this.interactables = []; this.entities = [];
      this.powerT = 0; this.flashInterference = 0;
      this.fx = { damage: 0, flash: 0, blackout: 1, fear: 0, glitch: 0, fade: null };
      this.fpsAcc = 0; this.fpsN = 0;
    }
    // ================================================================ AÇILIŞ
    async boot() {
      const canvas = this.canvas = $('view');
      const r = this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false });
      r.setPixelRatio(Math.min(root.devicePixelRatio || 1, 2));
      r.shadowMap.enabled = true;
      r.shadowMap.type = THREE.PCFSoftShadowMap;
      r.toneMapping = THREE.NoToneMapping;
      r.outputColorSpace = THREE.SRGBColorSpace;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(S.data.fov, 1, 0.05, S.data.viewDist);
      this.scene.add(this.camera);
      this.keeper = new PB.LightKeeper(this.scene);
      this.post = new PB.Post(r);
      this.configurePost();
      T.init(r, S.data.anisotropy);
      this.audio = new PB.Audio();
      this.input = new PB.Input(this, canvas);
      this.ui = new PB.UI(this);
      this.player = new PB.Player(this);
      this.audio.events.on('caption', (t, dir) => this.ui.caption(t, dir));
      this.save = U.store.get(SAVE_KEY, null);
      if (this.save) this.migrateSave(this.save);
      root.addEventListener('resize', () => this.resize());
      document.addEventListener('fullscreenchange', () => {
        const fs = document.fullscreenElement ? 'fullscreen' : 'windowed';
        if (S.data.displayMode !== fs) { S.data.displayMode = fs; if (this.ui && this.ui.isOpen('scr-settings') && this.ui.renderSettings) this.ui.renderSettings(); }
        this.resize();
      });
      document.addEventListener('keydown', e => { if (e.code === 'Enter' && e.altKey) { e.preventDefault(); S.set('displayMode', document.fullscreenElement ? 'windowed' : 'fullscreen'); } });
      S.events.on('change', key => this.applySetting(key));
      document.addEventListener('visibilitychange', () => { if (document.hidden && this.state === 'play') this.pause(); });
      this.resize();
      this.bindUI();
      this.ui.loading(0.02, t('boot.fonts'), ST.tip());
      await this.loadFonts();
      // Every sound effect and voice is rendered now, so none is computed during play
      await PB.sfxLib.prerender(PB.sfxLib.effects(), p => this.ui.loading(0.05 + p * 0.3, t('boot.sounds')));
      await PB.sfxLib.prerenderVoices(PB.Audio.VOICE.all(), p => this.ui.loading(0.35 + p * 0.1, t('boot.voices')));
      await this.loadMenuScene();
      this.last = performance.now();
      this.state = 'menu';
      this.startLoop();
      if (!PB.I18N.stored()) await this.firstRun();
      this.toMenu();
    }
    // First launch: language and brightness
    firstRun() {
      return new Promise(resolve => {
        const langs = $('first-langs');
        langs.innerHTML = '';
        const mark = () => { for (const b of langs.children) b.classList.toggle('on', b.dataset.lang === S.data.lang); };
        for (const [id, label] of PB.I18N.LANGS) {
          const b = document.createElement('button');
          b.type = 'button'; b.textContent = label; b.dataset.lang = id;
          b.addEventListener('click', () => { S.set('lang', id); mark(); });
          langs.appendChild(b);
        }
        mark();
        const rng = $('first-bright'), out = $('first-bright-out');
        const sw = (el, base) => { const v = Math.round(255 * Math.pow(base, 1 / S.data.brightness)); el.style.background = `rgb(${v},${v},${v})`; };
        const upd = () => { S.set('brightness', +rng.value); out.textContent = Math.round(S.data.brightness * 100) + '%'; sw(document.querySelector('.calib .c-dim'), 0.018); sw(document.querySelector('.calib .c-mid'), 0.1); };
        rng.value = S.data.brightness; upd();
        rng.oninput = upd;
        $('first-go').onclick = () => { PB.I18N.set(S.data.lang, true); resolve(); };
        this.ui.only('scr-first');
      });
    }
    async loadFonts() {
      if (!document.fonts || !document.fonts.load) return;
      const list = ['16px "Press Start 2P"', '24px "VT323"', '32px "Caveat"', '20px "Courier Prime"', 'bold 20px "Courier Prime"'];
      const sample = 'PACMAN ÇIKIŞ İŞĞÜÖÇ ğüşıöç 0123';
      try { await Promise.race([Promise.all(list.map(f => document.fonts.load(f, sample))), U.sleep(3000)]); } catch (e) { /* yazı tipleri isteğe bağlı */ }
    }
    // Output resolution: native (window x device pixels) or a fixed size scaled to the window
    resize() {
      const W = root.innerWidth, H = root.innerHeight, d = S.data;
      const dpr = Math.min(root.devicePixelRatio || 1, 2);
      let bw = Math.round(W * dpr), bh = Math.round(H * dpr), cw = W, ch = H;
      if (d.resolution && d.resolution !== 'native') {
        const m = String(d.resolution).split('x');
        bw = +m[0] || bw; bh = +m[1] || bh;
        const ar = bw / bh, war = W / H;
        if (d.scaleMode === 'fit') { if (ar > war) ch = W / ar; else cw = H * ar; }
        else if (d.scaleMode === 'fill') { if (ar > war) cw = H * ar; else ch = W / ar; }
      }
      this.renderer.setPixelRatio(1);
      this.renderer.setSize(bw, bh, false);
      const cs = this.canvas.style;
      cs.width = cw + 'px'; cs.height = ch + 'px';
      cs.left = Math.round((W - cw) / 2) + 'px'; cs.top = Math.round((H - ch) / 2) + 'px';
      cs.imageRendering = d.upscale === 'pixel' ? 'pixelated' : 'auto';
      this.camera.aspect = bw / bh;
      this.camera.updateProjectionMatrix();
      const aa = d.antialias;
      this.post.setSize(bw, bh, d.renderScale, aa === 'msaa' || aa === 'both' ? 4 : 0);
      this.post.enabled.fxaa = aa === 'fxaa' || aa === 'both';
      this.post.sharpen = d.sharpen || 0;
      this.outSize = [bw, bh];
      if (this.ui && this.ui.isOpen('scr-map')) this.ui.drawMap(this);
    }
    // Frame pacing. V-Sync on: animation frames (the monitor's refresh), skipping frames above the
    // limit. V-Sync off: a message-loop that draws as fast as possible, or on a timer up to the limit.
    startLoop() {
      const mc = new MessageChannel();
      let gen = 0;
      this.lastDraw = 0;
      const tick = g => {
        if (g !== gen) return;
        const now = performance.now(), lim = +S.data.fpsLimit || 0;
        if (!lim || now - this.lastDraw >= 1000 / lim - (S.data.vsync ? 1.2 : 0.2)) {
          this.lastDraw = lim ? Math.max(this.lastDraw + 1000 / lim, now - 1000 / lim) : now;
          try { this.frame(); } catch (e) { console.error(e); }
        }
        schedule(g);
      };
      const schedule = g => {
        if (S.data.vsync || document.hidden) { requestAnimationFrame(() => tick(g)); return; }
        const lim = +S.data.fpsLimit || 0;
        const wait = lim ? this.lastDraw + 1000 / lim - performance.now() : 0;
        if (wait > 4) setTimeout(() => tick(g), wait - 3);
        else { mc.port1.onmessage = () => tick(g); mc.port2.postMessage(0); }
      };
      this.restartLoop = () => { gen++; schedule(gen); };
      this.restartLoop();
    }
    // Fullscreen follows the setting; leaving it with Esc or F11 updates the setting
    setFullscreen(on) {
      const el = document.documentElement;
      try {
        if (on && !document.fullscreenElement && el.requestFullscreen) {
          const p = el.requestFullscreen({ navigationUI: 'hide' });
          if (p && p.catch) p.catch(() => { S.data.displayMode = 'windowed'; if (this.ui.renderSettings) this.ui.renderSettings(); });
        } else if (!on && document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
      } catch (e) { /* not allowed here */ }
    }
    configurePost() {
      const d = S.data;
      this.post.configure({ ao: d.ao, ssr: d.ssr, vol: d.volumetric, mblur: d.motionBlur, lensDirt: d.lensDirt });
      this.postDirty = false;
    }
    // Baked light volume and fog for the volumetric pass (after every bake)
    syncPostWorld() {
      const w = this.world, def = this.levelDef;
      if (!w || !w.bakeRes || !def) return;
      const fog = def.fog || [0, 0.02];
      this.post.setWorld({
        lvUp: w.bakeRes.up.texture, lvSize: w.U.uLvSize.value, lvLayers: w.U.uLvLayers.value,
        density: def.volDensity != null ? def.volDensity : Math.min(0.06, fog[1] * 1.1 + 0.006),
        lvK: def.volK != null ? def.volK : 0.03, maxDist: Math.min(48, S.data.viewDist * 0.6),
      });
      this.postLvK = def.volK != null ? def.volK : 0.03;
    }
    applySetting(key) {
      if (['resolution', 'scaleMode', 'upscale', 'sharpen'].includes(key)) this.resize();
      if (key === 'displayMode') this.setFullscreen(S.data.displayMode === 'fullscreen');
      if ((key === 'vsync' || key === 'fpsLimit') && this.restartLoop) this.restartLoop();
      if (key === 'lang' || key === '*') { PB.I18N.set(S.data.lang); this.onLanguage(); }
      if (['ao', 'ssr', 'volumetric', 'motionBlur', 'lensDirt', 'preset', '*'].includes(key)) this.postDirty = true;
      if (['viewDist', 'preset', '*'].includes(key)) this.syncPostWorld();
      if (['renderScale', 'antialias', 'preset', '*'].includes(key)) this.resize();
      if (['shadows', 'preset', '*'].includes(key)) this.player.applyShadowSetting();
      if (['fov', '*'].includes(key)) { this.camera.fov = S.data.fov; this.camera.updateProjectionMatrix(); }
      if (['viewDist', 'preset', '*'].includes(key)) this.applyFog();
      if (['anisotropy', 'preset', '*'].includes(key)) T.aniso = Math.min(S.data.anisotropy, T.maxAniso || 1);
      if (['dynLights', 'preset', '*'].includes(key) && this.world) { for (const p of this.world.pool || []) this.world.group.remove(p.pl); this.world.buildLightPool(); }
    }
    applyFog() {
      if (!this.levelDef) return;
      const [col, dens] = this.levelDef.fog;
      this.camera.far = S.data.viewDist * 1.5;
      this.camera.updateProjectionMatrix();
      const d = Math.max(dens, 1.8 / S.data.viewDist);
      this.scene.fog = new THREE.FogExp2(col, d);
      this.scene.background = new THREE.Color(col);
    }

    // ================================================================ KAYIT
    newSave() {
      // Arşiv, açılan bölümler ve görülen sonlar yeni oyunda da korunur
      const old = this.save || {};
      const keep = k => (Array.isArray(old[k]) ? old[k].slice() : []);
      const unlocked = keep('unlocked'); if (!unlocked.includes('prolog')) unlocked.unshift('prolog');
      this.save = { v: 2, level: 'prolog', unlocked, notes: keep('notes'), drawings: [], freed: [], world: {}, stats: { time: 0, deaths: 0 }, cp: null, completed: !!old.completed, endings: keep('endings') };
      this.writeSave();
    }
    migrateSave(s) {
      if (!Array.isArray(s.drawings)) s.drawings = [];
      if (!s.world || typeof s.world !== 'object') s.world = {};
      if (!Array.isArray(s.freed)) s.freed = [];
      if (!Array.isArray(s.endings)) s.endings = [];
      if (!Array.isArray(s.notes)) s.notes = [];
      if (!Array.isArray(s.unlocked)) s.unlocked = ['prolog'];
      if (s.level && !PB.Levels.byId(s.level)) { s.level = 'prolog'; s.cp = null; }
      s.unlocked = s.unlocked.filter(id => PB.Levels.byId(id));
      if (!s.stats) s.stats = { time: 0, deaths: 0 };
    }
    writeSave() { if (this.save) { this.save.stats.time = Math.round(this.playTime); U.store.set(SAVE_KEY, this.save); } }
    snapshot() {
      const w = this.world;
      return {
        level: this.levelDef.id,
        taken: this.items.filter(i => i.taken).map(i => i.id),
        doors: this.level.doors.map(d => [d.id, d.open ? 1 : 0, d.locked ? 1 : 0]),
        zones: [...w.zonesOn], obj: Object.assign({}, this.obj), inv: JSON.parse(JSON.stringify(this.inv)), flags: Object.assign({}, this.flags),
        player: { x: this.player.pos.x, z: this.player.pos.z, yaw: this.player.yaw, battery: this.player.battery, hasFlashlight: this.player.hasFlashlight },
        pellets: w.pellets ? w.pellets.filter(p => !p.alive).map(p => p.k) : [],
        drained: !!w.drained,
      };
    }
    checkpoint(silent) {
      if (!this.save || !this.levelDef || this.levelDef.id === 'menu') return;
      this.save.level = this.levelDef.id;
      if (!this.save.unlocked.includes(this.levelDef.id)) this.save.unlocked.push(this.levelDef.id);
      this.save.cp = this.snapshot();
      this.cpPos = { x: this.player.pos.x, z: this.player.pos.z, yaw: this.player.yaw };
      this.writeSave();
      if (!silent) this.ui.notify(t('n.saved'), 'save');
    }
    safeCheckpoint() {
      // Kovalayan yaratık yoksa ve kimse yakında değilse otomatik kayıt
      const danger = this.entities.some(e => e.hostile && (e.state === 'chase' || (e.state !== 'dormant' && e.state !== 'wait' && e.state !== 'gone' && e.distToPlayer() < 10)));
      if (!danger) this.checkpoint(true);
    }

    // ================================================================ MENÜ
    bindUI() {
      const on = (id, fn) => { const e = $(id); if (e) e.addEventListener('click', fn); };
      on('m-new', () => { this.audio.init(); if (this.save && this.save.level && this.save.level !== 'prolog') { this.ui.only('scr-confirm'); } else this.ui.only('scr-diff'); });
      on('confirm-yes', () => this.ui.only('scr-diff'));
      on('confirm-no', () => this.toMenu());
      on('m-continue', () => { this.audio.init(); this.continueGame(); });
      on('m-levels', () => { this.audio.init(); this.ui.buildLevelSelect(this.save, id => this.startLevelFresh(id)); this.ui.only('scr-levels'); });
      on('m-settings', () => { this.audio.init(); this.openSettings(() => this.toMenu()); });
      on('m-archive', () => { this.audio.init(); this.ui.buildArchive(this.save || { notes: [] }); this.ui.only('scr-archive'); });
      on('m-help', () => { this.audio.init(); this.ui.only('scr-help'); });
      on('levels-back', () => this.toMenu());
      on('archive-back', () => { if (this.state === 'pause') this.ui.only('scr-pause'); else this.toMenu(); });
      on('help-back', () => { if (this.state === 'pause') this.ui.only('scr-pause'); else this.toMenu(); });
      for (const b of document.querySelectorAll('[data-diff]')) b.addEventListener('click', () => { S.set('difficulty', b.dataset.diff); this.newGame(); });
      on('diff-back', () => this.toMenu());
      on('p-resume', () => this.resume());
      on('p-settings', () => this.openSettings(() => this.ui.only('scr-pause')));
      on('p-archive', () => { this.ui.buildArchive(this.save); this.ui.only('scr-archive'); });
      on('p-help', () => this.ui.only('scr-help'));
      on('p-map', () => { this.ui.only(null); this.openMap(true); });
      on('p-journal', () => { this.ui.only(null); this.openBag('journal', true); });
      on('p-load', () => { this.ui.only(null); this.continueGame(); });
      on('p-menu', () => { this.writeSave(); this.toMenu(); });
      on('map-close', () => this.closeMap());
      on('cab-exit', () => this.exitCabinet());
      $('view').addEventListener('click', () => { if (this.state === 'play' && !this.input.locked && !this.input.lockFailed) this.input.requestLock(true); });
    }
    openSettings(back) {
      this.ui.buildSettings(() => back());
      this.ui.only('scr-settings');
    }
    async loadMenuScene() {
      // Menü arka planı: gece yarısı atari salonu, elektrik açık
      await this.loadLevel('prolog', { menu: true });
    }
    toMenu() {
      this.state = 'menu';
      this.input.exitLock();
      this.audio.stopAllLoops();
      $('hud').hidden = true;
      this.ui.buildTouch();
      $('touch').hidden = true;
      if (!this.levelDef || this.levelDef.id !== 'prolog' || !this.menuWorld) { this.loadLevel('prolog', { menu: true }).then(() => this.toMenu()); return; }
      this.ui.buildMenu(this.save);
      this.ui.only('scr-menu');
      this.audio.setMusic('menu');
      if (this.audio.ctx) this.audio.ambience('arcade');
      this.fx.blackout = 0.35;
      this.menuT = 0;
    }
    async newGame() {
      this.newSave();
      this.playTime = 0;
      await this.loadLevel('prolog');
    }
    async continueGame() {
      if (!this.save || !this.save.level) return this.newGame();
      this.playTime = this.save.stats.time || 0;
      const cp = this.save.cp && this.save.cp.level === this.save.level ? this.save.cp : null;
      await this.loadLevel(this.save.level, { restore: cp });
    }
    async startLevelFresh(id) {
      this.playTime = this.save.stats.time || 0;
      await this.loadLevel(id);
    }

    // ================================================================ BÖLÜM YÜKLEME
    async loadLevel(id, opts = {}) {
      const def = ST.level(id);
      this.state = 'loading';
      this.levelGen = (this.levelGen || 0) + 1;
      this.fx.fade = null; this.exiting = false;
      this.input.exitLock();
      $('hud').hidden = true; $('touch').hidden = true;
      this.ui.only('scr-boot');
      this.ui.loading(0.01, t('boot.prep'), ST.tip());
      $('boot-level').textContent = opts.menu ? '' : `${def.name} — ${def.title}`;
      this.audio.stopAllLoops();
      this.audio.setMusic('none');
      await U.nextFrame();
      this.unloadLevel();
      const L = PB.LevelGen.generate(def);
      this.level = L; this.levelDef = def;
      if (opts.menu) L.meta.zonesOn = [0, 1];
      this.world = new PB.World(this, L);
      try {
        await this.world.build((p, label) => this.ui.loading(p * 0.97, label));
      } catch (e) {
        console.error(e);
        this.ui.loading(1, t('load.error', { msg: e.message }));
        throw e;
      }
      this.scene.add(this.world.group);
      this.scene.environment = this.world.envMap;
      if (this.player.vm) this.player.vm.onWorld(this.world);
      this.applyFog();
      this.syncPostWorld();
      this.nav = new PB.Entities.Nav(this);
      this.explored = new Uint8Array(L.w * L.h);
      this.inv = { batteries: 0, almond: 0, glow: 0, fuses: 0, fuel: 0, pellets: 0, keys: [], memento: null, officeKey: false, token: false, keycard: false };
      this.obj = {}; this.flags = {};
      this.powerT = 0; this.graceUsed = false; this.dyingT = 0;
      this.exitDoorId = null; this.exitNext = null; this.readyT = 0; this.drainAnim = null; this.holding = null;
      this.objectivesDone = 0;
      this.glowsticks = [];
      this.spottedOnce = {};
      this.mazeScore = 0;
      // Oyuncu
      const sp = L.spawn;
      this.player.spawn(sp.wx != null ? sp.wx : L.cx(sp.x), sp.wz != null ? sp.wz : L.cz(sp.y), sp.yaw);
      this.player.hasFlashlight = def.startFlashlight !== false;
      this.player.battery = 100;
      this.player.flashOn = false;
      this.cpPos = { x: this.player.pos.x, z: this.player.pos.z, yaw: this.player.yaw };
      this.createItems();
      this.createDoorInteractions();
      this.createHideSpots();
      this.menuWorld = !!opts.menu;
      if (!opts.menu) this.createEntities();
      this.glowPool = [];
      for (let k = 0; k < 3; k++) { const l = new THREE.PointLight(0x40ff70, 0, 8, 2); l.position.set(0, -50, 0); this.world.group.add(l); this.glowPool.push(l); }
      this.script = PB.Chapters[id] || {};
      this.talkQ = []; this.talkCur = null;
      if (!opts.menu && this.script.start) this.script.start(this);
      if (opts.restore) this.applySnapshot(opts.restore);
      if (!opts.menu) {
        this.ui.loading(0.975, t('boot.sounds'));
        await PB.sfxLib.prerender(PB.sfxLib.loops());
        await this.audio.warmMusic(def.music || 'default');
      }
      this.ui.loading(0.98, t('load.shaders'));
      await U.nextFrame();
      this.warmup();
      this.ui.loading(1, t('load.ready'));
      if (opts.menu) { this.world.U.uLmIntensity.value = 1; return; }
      if (!this.save) this.newSave();
      if (!this.save.unlocked.includes(id)) this.save.unlocked.push(id);
      this.save.level = id;
      if (!opts.restore) this.checkpoint(true);
      else this.writeSave();
      this.audio.init();
      this.audio.ambience(L.theme);
      this.audio.music.flavor = L.def.music || 'default';
      if (this.world.street && this.world.street.spout) { const zF = L.h * L.cell; this.audio.streetSounds({ x: 6, y: 1.6, z: zF - 0.2 }, { x: this.world.street.spout.x, y: 0.3, z: zF + 0.4 }); }
      this.audio.setMusic('explore');
      this.ui.buildTouch();
      this.updateInventoryUI();
      const begin = () => {
        this.state = 'play';
        $('hud').hidden = false;
        $('touch').hidden = !this.ui.touch;
        this.ui.only(null);
        this.fx.blackout = 1;
        this.fadeTo(0, 1.2);
        if (!this.ui.touch && !this.input.lockFailed) this.input.requestLock();
        if (this.script.afterCard) this.script.afterCard(this);
        this.refreshObjective();
      };
      if (opts.restore || opts.skipCard) begin();
      else { this.fx.blackout = 1; this.ui.only(null); this.ui.showCard(def, begin); }
    }
    warmup() {
      // Gizli yaratıkları geçici olarak görünür yapıp gölgelendiricileri önceden derle
      const hidden = [];
      this.scene.traverse(o => { if (!o.visible) { hidden.push(o); o.visible = true; } });
      this.keeper.reset();
      try { this.post.warm(this.scene, this.camera); this.post.render(this.scene, this.camera, 0); } catch (e) { console.warn(e); }
      for (const o of hidden) o.visible = false;
      this.programsWarm = this.renderer.info.programs ? this.renderer.info.programs.length : 0;
    }
    unloadLevel() {
      for (const e of this.entities) e.remove();
      this.entities = []; this.pacman = null;
      for (const it of this.items) if (it.mesh) { this.scene.remove(it.mesh); it.mesh.traverse(o => { if (o.geometry) o.geometry.dispose(); }); }
      for (const gs of this.glowsticks || []) this.scene.remove(gs.mesh);
      this.items = []; this.interactables = [];
      if (this.world) { this.scene.remove(this.world.group); this.world.dispose(); this.world = null; }
      this.audio.stopAllLoops();
      this.player.hidden = null;
      this.player.frozen = false;
    }
    applySnapshot(s) {
      for (const id of s.taken || []) { const it = this.items.find(i => i.id === id); if (it) this.takeItem(it, true); }
      for (const [id, open, locked] of s.doors || []) {
        const d = this.level.doors.find(x => x.id === id);
        if (!d) continue;
        d.locked = !!locked;
        if (open) this.world.openDoor(id); else this.world.closeDoor(id);
        const obj = this.world.doorObjs.get(id); if (obj) { obj.amt = open ? 1 : 0; this.world.applyDoor(obj); }
      }
      const zones = new Set(s.zones || []);
      let rebake = false;
      for (const z of zones) if (!this.world.zonesOn.has(z)) { this.world.zonesOn.add(z); rebake = true; }
      if (rebake) { for (const f of this.world.fixtures) f.powered = this.world.zonesOn.has(f.light.zone); this.world.fixDirty = true; this.world.bake(() => {}); }
      this.obj = Object.assign({}, s.obj); this.inv = Object.assign(this.inv, s.inv); this.flags = Object.assign({}, s.flags);
      if (s.player) { this.player.spawn(s.player.x, s.player.z, s.player.yaw); this.player.battery = s.player.battery; this.player.hasFlashlight = s.player.hasFlashlight; this.cpPos = { x: s.player.x, z: s.player.z, yaw: s.player.yaw }; }
      if (s.pellets && this.world.pellets) for (const k of s.pellets) this.world.hidePellet(k);
      if (s.drained) this.drainPools(true);
      if (this.script.restore) this.script.restore(this, s);
      for (const e of this.entities) if (e.kind === 'pacman' && this.flags.pacAwake) e.wake(false);
      this.updateInventoryUI();
    }

    // ================================================================ EŞYALAR
    meshFromDef(key, matFn) {
      const grp = new THREE.Group();
      for (const part of P.build(key, P.DEFS[key])) {
        const m = new THREE.Mesh(part.geo, matFn ? matFn(part.mat) : this.world.mat(part.mat));
        m.castShadow = true; m.receiveShadow = true;
        grp.add(m);
      }
      return grp;
    }
    // Items no longer glow: the on-screen ring (updateMarks) shows what can be used.
    glowSprite() { return new THREE.Object3D(); }
    createItems() {
      const L = this.level;
      for (const it of L.items) {
        const o = { item: it, id: it.id, type: it.type, pos: new THREE.Vector3(it.wx, it.wy || 0, it.wz), taken: false, mesh: null, marker: null, spin: false };
        this.buildItem(o);
        if (o.mesh) { o.mesh.position.copy(o.pos); if (o.baseY == null) o.baseY = o.pos.y; this.scene.add(o.mesh); }
        this.items.push(o);
        this.interactables.push({ kind: 'item', ref: o, pos: o.interactPos || o.pos, reach: o.reach || 2.5, prompt: () => (o.taken ? null : this.itemPrompt(o)), act: () => this.useItem(o), hold: () => o.hold });
      }
    }
    buildItem(o) {
      const it = o.item, ty = o.type, w = this.world;
      const onWall = it.d >= 0 && (it.wy || 0) > 0.5;
      const grp = new THREE.Group();
      const add = (key, y = 0, scale = 1, rotX = 0) => { const m = this.meshFromDef(key); m.position.y = y; m.scale.setScalar(scale); m.rotation.x = rotX; grp.add(m); return m; };
      o.mesh = grp;
      if (it.yaw != null) grp.rotation.y = it.yaw;
      switch (ty) {
        case 'note': case 'codeClue': case 'computer': case 'drawing': {
          const n = ST.note(it.data, 'en');
          const variant = it.prop || (ty === 'computer' ? 'computer' : null);
          o.marker = ty === 'codeClue' ? MARK.obj : MARK.note;
          if (variant === 'computer') {
            // Masa + CRT, ekranında metnin ilk satırları
            add('cubicleDesk', 0, 1);
            const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.24), new THREE.MeshBasicMaterial({ map: T.crt('note-' + it.id, n.body.split('\n').slice(0, 11)), color: new THREE.Color(1.5, 1.5, 1.5) }));
            scr.position.set(0.131, 0.965, 0.15); scr.rotation.y = Math.PI / 2;
            grp.add(scr);
            o.pos.y = 0; o.interactPos = new THREE.Vector3(it.wx, 1.0, it.wz);
            this.world.addCollider({ minX: it.wx - 0.45, maxX: it.wx + 0.45, minZ: it.wz - 0.8, maxZ: it.wz + 0.8 });
          } else if (variant === 'whiteboard') {
            add('whiteboard', 0);
            const face = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 0.85), new THREE.MeshStandardMaterial({ map: T.whiteboard(it.id, n.body), roughness: 0.3 }));
            w.patch(face.material);
            face.position.z = 0.017;
            grp.add(face);
          } else if (variant === 'printer') {
            add('printer', 0);
            const stand = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.75, 0.5), w.mat('paintMetal'));
            stand.position.y = -0.375; grp.add(stand);
            o.pos.y = 0.75;
            this.world.addCollider({ minX: it.wx - 0.35, maxX: it.wx + 0.35, minZ: it.wz - 0.35, maxZ: it.wz + 0.35 });
          } else if (n.kind === 'wall') {
            const tex = T.decal('wallText', n.body.split('\n').filter(Boolean).slice(0, 3).join('\n'));
            const m = new THREE.MeshStandardMaterial({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, roughness: 0.9 });
            w.patch(m);
            const pl = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.8), m);
            if (!onWall) { pl.rotation.x = -Math.PI / 2; pl.position.y = 0.01; } else pl.position.z = 0.01;
            grp.add(pl);
          } else {
            // Drawings show Lily's actual picture, photos the actual print; everything else is handwriting or type
            const loc = ST.note(it.data);
            const map = n.kind === 'drawing' ? T.drawing(n.drawing || 1, T.drawingCaption(loc.body)) : n.kind === 'photo' ? T.photo(n.photo || 'arch', it.data) : T.paper(it.id, !['letter', 'printout', 'notice', 'report', 'card', 'flyer'].includes(n.kind));
            const geo = n.kind === 'drawing' ? new THREE.PlaneGeometry(0.29, 0.22) : n.kind === 'photo' ? new THREE.PlaneGeometry(0.13, 0.1) : new THREE.PlaneGeometry(0.21, 0.29);
            const paper = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map, roughness: n.kind === 'photo' ? 0.35 : 0.9, side: THREE.DoubleSide }));
            w.patch(paper.material);
            if (onWall) paper.position.z = 0.012;
            else { paper.rotation.x = -Math.PI / 2; paper.position.y = 0.006; paper.rotation.z = Math.random() * 6; }
            grp.add(paper);
            const glow = this.glowSprite(0xfff0c0, 0.5); glow.position.set(0, onWall ? 0 : 0.1, onWall ? 0.1 : 0); grp.add(glow); o.glow = glow;
          }
          break;
        }
        case 'radio': { add('walkie', 0.02, 1.3); o.marker = MARK.obj; { const g = this.glowSprite(0xff5040, 0.3); g.position.y = 0.15; grp.add(g); o.glow = g; } break; }
        case 'tape': { add('tape'); const g = this.glowSprite(0xff4040, 0.4); g.position.y = 0.15; grp.add(g); o.glow = g; o.marker = MARK.tape; break; }
        case 'battery': add('battery', 0, 1.6); o.marker = MARK.supply; { const g = this.glowSprite(0x80d0ff, 0.45); g.position.y = 0.12; grp.add(g); o.glow = g; } break;
        case 'almond': add('almond', 0, 1.2); o.marker = MARK.supply; { const g = this.glowSprite(0xfff0c0, 0.5); g.position.y = 0.2; grp.add(g); o.glow = g; } break;
        case 'glowstick': add('glowstick', 0, 1.6); o.marker = MARK.supply; { const g = this.glowSprite(0x40ff70, 0.6); g.position.y = 0.05; grp.add(g); o.glow = g; } break;
        case 'flashlight': add('flashlight', 0, 1.2); { const g = this.glowSprite(0xffffff, 0.35); grp.add(g); o.glow = g; } o.marker = MARK.obj; break;
        case 'token': add('token', 0.789, 1.6); { const g = this.glowSprite(0xffd060, 0.35); g.position.y = 0.9; grp.add(g); o.glow = g; } o.marker = MARK.obj; o.pos.y = 0; break;
        case 'fuse': add('fuse', 0, 1.5); o.marker = MARK.obj; { const g = this.glowSprite(0xffd040, 0.5); g.position.y = 0.1; grp.add(g); o.glow = g; } break;
        case 'fuelCan': add('fuelCan', 0, 1.2); o.marker = MARK.obj; { const g = this.glowSprite(0xff8030, 0.6); g.position.y = 0.3; grp.add(g); o.glow = g; } break;
        case 'keycard': add('keycard', 0, 1.6); o.marker = MARK.obj; { const g = this.glowSprite(0x60a0ff, 0.4); g.position.y = 0.1; grp.add(g); o.glow = g; } o.pos.y = 0.8; { const tbl = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.78, 0.6), w.mat('darkMetal')); tbl.position.y = -0.39; grp.add(tbl); } break;
        case 'memento': {
          const key = { billy: 'watch', ivy: 'glasses', penny: 'walkman', clyde: 'lighter' }[it.data] || 'watch';
          add(key, 0.03, 2.2); o.spin = true; o.marker = ST.charColor(it.data);
          const g = this.glowSprite(ST.charColor(it.data), 0.8); g.position.y = 0.12; grp.add(g); o.glow = g;
          break;
        }
        case 'powerPellet': {
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(5, 3.4, 3) }));
          grp.add(m);
          const g = this.glowSprite(0xffb8ae, 1.4); grp.add(g); o.glow = g;
          const l = new THREE.PointLight(0xffb8ae, 3, 5, 2); grp.add(l); o.light = l;
          o.pos.y = 1.0; o.bob = true; o.marker = MARK.obj;
          break;
        }
        case 'exitPanel': add('exitPanel'); o.marker = MARK.obj; o.sockets = []; for (const [sx, sy] of [[-0.12, 0.12], [0.12, 0.12], [-0.12, -0.12], [0.12, -0.12]]) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.05, 0.03, 0.03) })); s.position.set(sx, sy, 0.05); grp.add(s); o.sockets.push(s); } break;
        case 'fusePanel': add('fusePanel'); o.marker = MARK.obj; o.slots = []; for (const sx of [-0.15, 0, 0.15]) { const s = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.1, 10), new THREE.MeshBasicMaterial({ color: 0x111111 })); s.rotation.x = Math.PI / 2; s.position.set(sx, 0.05, 0.12); grp.add(s); o.slots.push(s); } { const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 0.2, 0.1) })); lamp.position.set(0.22, -0.28, 0.08); grp.add(lamp); o.lamp = lamp; } break;
        case 'fuseBox': add('fuseBox'); o.marker = MARK.obj; break;
        case 'register': o.mesh = null; o.marker = null; o.reach = 2.2; break;
        case 'valve': add('valve'); o.marker = MARK.obj; o.hold = 2.6; o.wheel = grp.children[0]; break;
        case 'drain': add('drain', -0.48); o.pos.y = -0.4; o.marker = MARK.obj; break;
        case 'keypad': add('keypad'); { const led = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 0.1, 0.1) })); led.position.set(0.06, 0.1, 0.025); grp.add(led); o.led = led; } o.marker = MARK.obj; break;
        case 'cardReader': add('cardReader'); { const led = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 0.1, 0.1) })); led.position.set(0, 0.06, 0.025); grp.add(led); o.led = led; } o.marker = MARK.obj; break;
        case 'phone': { const st = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.72, 0.4), w.mat('laminate')); st.position.y = 0.36; grp.add(st); const ph = add('phone', 0.72); void ph; o.interactPos = new THREE.Vector3(it.wx, 0.9, it.wz); this.world.addCollider({ minX: it.wx - 0.25, maxX: it.wx + 0.25, minZ: it.wz - 0.22, maxZ: it.wz + 0.22 }); o.marker = MARK.note; break; }
        case 'generator': add('generator'); o.marker = MARK.obj; o.hold = 3.2; o.interactPos = new THREE.Vector3(it.wx, 0.7, it.wz); { const pos = new THREE.Vector3(it.wx, 0, it.wz); this.world.addCollider({ minX: pos.x - 0.5, maxX: pos.x + 0.5, minZ: pos.z - 0.5, maxZ: pos.z + 0.5 }); } break;
        case 'shrine': {
          add('shrineAltar');
          const col = ST.charColor(it.data);
          const flame = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(4) }));
          flame.position.set(-0.4, 1.0, 0.1); grp.add(flame);
          const l = new THREE.PointLight(new THREE.Color(col), 2.5, 6, 2); l.position.set(0, 1.4, 0.2); grp.add(l); o.light = l;
          o.marker = MARK.shrine; o.interactPos = new THREE.Vector3(it.wx, 0.9, it.wz);
          this.world.addCollider({ minX: it.wx - 0.6, maxX: it.wx + 0.6, minZ: it.wz - 0.3, maxZ: it.wz + 0.3 });
          grp.rotation.y = 0;
          break;
        }
        case 'portal': {
          add('portal');
          const disc = new THREE.Mesh(new THREE.CircleGeometry(0.88, 40), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.5, 1.4, 2.2), transparent: true, opacity: 0.35, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
          disc.position.y = 1.3; grp.add(disc);
          const l = new THREE.PointLight(0xff9ad5, 4, 8, 2); l.position.y = 1.3; grp.add(l); o.light = l;
          o.interactPos = new THREE.Vector3(it.wx, 1.3, it.wz); o.marker = MARK.obj; o.spinSlow = true; grp.visible = false; o.hiddenUntil = 'houseOpen';
          break;
        }
        case 'plug': {
          add('plug');
          const l = new THREE.PointLight(0xff4040, 5, 10, 2); l.position.set(0, 2.6, 0.5); grp.add(l); o.light = l;
          o.interactPos = new THREE.Vector3(it.wx, 1.2, it.wz + 0.9); o.marker = MARK.obj; o.reach = 3;
          this.world.addCollider({ minX: it.wx - 0.75, maxX: it.wx + 0.75, minZ: it.wz - 0.45, maxZ: it.wz + 0.45 });
          break;
        }
        case 'key': {
          const k = it.data || '';
          if (/^frame/.test(k)) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.002, 0.065), new THREE.MeshStandardMaterial({ map: T.photo('frame'), roughness: 0.3 })); m.position.y = 0.001; grp.add(m); w.patch(m.material); }
          else if (/^page/.test(k)) add('note', 0, 1);
          else { add('key', 0, 2.2); const tag = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.002, 0.05), w.mat('keyTag')); tag.position.set(0.06, 0.004, 0.02); grp.add(tag); }
          o.marker = MARK.obj; o.pos.y = Math.max(o.pos.y, 0) ; break;
        }
        case 'dial': {
          const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.05, 24), w.mat('blackPlastic')); knob.rotation.x = Math.PI / 2; grp.add(knob);
          const ptr = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.06, 0.012), w.mat('chrome')); ptr.position.set(0, 0.035, 0.03); knob.add(ptr); ptr.rotation.x = -Math.PI / 2;
          const face = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), new THREE.MeshBasicMaterial({ map: T.label('dialFace', '0 1 2 3 4 5 6 7 8 9', { w: 256, h: 64, bg: 'rgba(0,0,0,0)', color: '#e8e0c0', font: `22px ${T.FONTS.FONT_TYPE}` }), transparent: true }));
          face.position.set(0, -0.12, 0.01); grp.add(face);
          o.knob = knob; o.value = 0; o.marker = MARK.obj; grp.rotation.y = 0; break;
        }
        case 'booth': o.mesh = null; o.marker = MARK.obj; o.pos.y = 1.0; o.reach = 2.4; break;
        case 'specialCabinet': case 'freeCabinet': o.mesh = null; o.marker = ty === 'specialCabinet' ? MARK.obj : null; o.pos.y = 1.2; o.reach = 2.2; break;
        default: break;
      }
    }
    itemPrompt(o) {
      const ty = o.type, it = o.item;
      if (o.hiddenUntil && !this.flags[o.hiddenUntil]) return null;
      if (this.script.prompt) { const p = this.script.prompt(this, o); if (p !== undefined) return p; }
      switch (ty) {
        case 'note': case 'codeClue': { const n = ST.note(it.data); return !n ? null : n.kind === 'wall' ? t('pr.readWall') : n.kind === 'screen' ? t('pr.screen') : t('pr.read', { title: n.title }); }
        case 'drawing': return t('pr.drawing');
        case 'computer': return t('pr.screen');
        case 'tape': return t('pr.tape');
        case 'battery': return t('pr.battery');
        case 'almond': return t('pr.almond');
        case 'glowstick': return t('pr.glow');
        case 'flashlight': return t('pr.flashlight');
        case 'token': return t('pr.token');
        case 'fuse': return t('pr.fuse');
        case 'fuelCan': return t('pr.fuel');
        case 'keycard': return t('pr.keycard');
        case 'memento': return t('pr.take', { name: ST.memento(it.data).name });
        case 'powerPellet': return t('pr.pellet');
        case 'phone': return o.ringing ? t('pr.phoneRing') : t('pr.phone');
        case 'freeCabinet': return t('pr.cabinetFree');
        case 'key': return t('pr.take', { name: ST.item(it.data).name });
        default: return null;
      }
    }
    useItem(o) {
      if (o.taken) return;
      if (this.player.vm) this.player.vm.doReach();
      if (this.script.use && this.script.use(this, o)) return;
      const ty = o.type, it = o.item;
      switch (ty) {
        case 'note': case 'codeClue': case 'computer': this.readNote(it.data, () => { if (ty === 'codeClue' && this.script.clue) this.script.clue(this, o); }); break;
        case 'drawing': this.takeDrawing(o); break;
        case 'tape': {
          this.readNote(it.data); this.checkpoint();
          if (this.audio.ctx) { this.audio.loop('tape', 'tape', null, { bus: 'sfx', gain: 0.3, rev: 0 }); const n = ST.note(it.data); this.audio.tapeVoice(n ? U.clamp(n.body.length * 0.045, 4, 12) : 6); }
          break;
        }
        case 'battery':
          // Batteries go in the pocket; a nearly dead flashlight gets them straight away
          this.takeItem(o);
          this.inv.batteries = Math.min(6, this.inv.batteries + 1);
          this.audio.pickup();
          if (this.player.hasFlashlight && this.player.battery < 30 && this.player.reload()) break;
          this.ui.notify(t('n.batterySpare'));
          if (!this.flags.reloadTip) { this.flags.reloadTip = true; this.ui.hint(t('hint.reload'), true); }
          break;
        case 'almond': this.takeItem(o); this.inv.almond = Math.min(3, this.inv.almond + 1); this.audio.pickup(); this.ui.notify(t('n.almond')); break;
        case 'glowstick': this.takeItem(o); this.inv.glow = Math.min(6, this.inv.glow + 1); this.audio.pickup(); this.ui.notify(t('n.glow')); break;
        case 'memento': {
          this.takeItem(o); this.inv.memento = it.data; this.audio.pickup('key');
          const m = ST.memento(it.data);
          this.ui.notify(t('n.found', { name: m.name }), 'key'); this.ui.subtitle(m.line, 5);
          const rk = PB.ChapterUtil.mementoRadio[it.data]; if (rk) this.radio(rk, { delay: 5.5 });
          break;
        }
        case 'phone': this.answerPhone(o); break;
        case 'key': {
          this.takeItem(o); if (!this.inv.keys.includes(it.data)) this.inv.keys.push(it.data);
          this.audio.pickup(/^(frame|page)/.test(it.data) ? 'item' : 'key');
          const info = ST.item(it.data);
          this.ui.notify(t('n.found', { name: info.name }), 'key');
          if (info.doc) this.readNote(info.doc, () => { if (this.script.picked) this.script.picked(this, it.data, o); });
          else if (this.script.picked) this.script.picked(this, it.data, o);
          break;
        }
        case 'freeCabinet': this.enterCabinet(); break;
        default: break;
      }
      this.updateInventoryUI();
    }
    takeDrawing(o) {
      const id = o.item.data;
      this.takeItem(o);
      if (!this.save.drawings.includes(id)) this.save.drawings.push(id);
      this.audio.pickup('key');
      this.ui.notify(t('n.drawing', { n: this.save.drawings.length }), 'key');
      this.readNote(id);
    }
    takeItem(o, silent) {
      o.taken = true;
      if (o.mesh) this.scene.remove(o.mesh);
      if (o.light) o.light.intensity = 0;
    }
    readNote(id, after) {
      const n = ST.note(id);
      if (!n) return;
      if (this.save && !this.save.notes.includes(id)) { this.save.notes.push(id); this.writeSave(); this.ui.notify(t('n.added', { title: n.title }), 'note'); }
      this.state = 'note';
      this.input.exitLock();
      this.ignoreUnlock = true;
      this.ui.showNote(id, () => {
        this.audio.stopLoop('tape', 0.5);
        this.state = 'play';
        this.ignoreUnlock = false;
        if (!this.ui.touch && !this.input.lockFailed) this.input.requestLock();
        if (after) after();
      });
    }
    answerPhone(o, after) {
      o.ringing = false;
      this.audio.stopLoop('phone:' + o.id, 0.1);
      this.audio.click();
      this.readNote(o.item.data, after);
    }
    updateInventoryUI() {
      const keys = [];
      const inv = this.inv || {};
      if (inv.officeKey) keys.push(t('inv.officeKey'));
      if (inv.token) keys.push(t('inv.token'));
      if (inv.fuses) keys.push(t('inv.fuses', { n: inv.fuses }));
      if (inv.fuel) keys.push(t('inv.fuel', { n: inv.fuel }));
      if (inv.keycard) keys.push(t('inv.keycard'));
      if (inv.memento) keys.push(ST.memento(inv.memento).name.toLocaleUpperCase(PB.I18N.lang));
      const counted = {};
      for (const k of inv.keys || []) { const base = k.replace(/\d+$/, ''); if (/^(frame|page)$/.test(base)) counted[base] = (counted[base] || 0) + 1; else keys.push(ST.item(k).name.toLocaleUpperCase(PB.I18N.lang)); }
      for (const b in counted) keys.push(ST.item(b).name.toLocaleUpperCase(PB.I18N.lang) + ' ×' + counted[b]);
      if (inv.pellets && this.levelDef && this.levelDef.id === 'lobby' && !this.flags.exitOpen) keys.push(t('inv.pellets', { n: inv.pellets }));
      this.ui.setInventory({ batteries: inv.batteries, almond: inv.almond, glow: inv.glow, keys });
    }
    createDoorInteractions() {
      for (const door of this.level.doors) {
        const obj = this.world.doorObjs.get(door.id);
        if (!obj) continue;
        const g = obj.g;
        const pos = new THREE.Vector3(g.cx, 1.2, g.cz);
        this.interactables.push({
          kind: 'door', ref: door, pos, reach: 2.4,
          prompt: () => {
            if (door.kind === 'house') return null;
            const dname = door.label && !door.nameKey ? t('door.room', { n: door.label }) : t(door.nameKey || 'door.default');
            if (door.locked) return this.script.unlockPrompt && this.script.unlockPrompt(this, door) || t('pr.doorLocked', { name: dname });
            if (['exit', 'elevator', 'stair'].includes(door.kind)) return null;
            return door.open ? t('pr.doorClose') : t('pr.doorOpen');
          },
          act: () => {
            if (door.locked) {
              if (this.script.unlockDoor && this.script.unlockDoor(this, door)) { this.nav.dirty = true; return; }
              this.ui.hint(t(door.lockKey || 'lock.default')); this.audio.door('locked', pos); if (this.script.lockedDoor) this.script.lockedDoor(this, door); return;
            }
            if (['exit', 'elevator', 'stair', 'house'].includes(door.kind)) return;
            if (door.open) { this.world.closeDoor(door.id); this.audio.door(door.kind, pos, false); }
            else {
              // Crouching eases a door open: slower, and far quieter
              const soft = this.player.crouching;
              this.world.openDoor(door.id, this.player.pos.x, this.player.pos.z);
              if (soft) { const ob = this.world.doorObjs.get(door.id); if (ob) ob.slow = true; }
              this.audio.door(door.kind, pos, true, soft ? 0.35 : 1);
              this.noise(pos.x, pos.z, soft ? 2.5 : 8);
            }
            this.nav.dirty = true;
          },
        });
      }
    }
    createHideSpots() {
      for (const p of this.level.props) {
        if (!p.hide) continue;
        // Look out the way the furniture faces (lockers: through the vents)
        const faceYaw = p.type === 'cubicleDesk' ? (p.rot === 0 ? -Math.PI / 2 : Math.PI / 2) : p.hideKind === 'locker' ? p.rot + Math.PI : (p.rot === 0 ? Math.PI : 0);
        const pos = new THREE.Vector3(p.x, p.hideKind === 'locker' ? 1.3 : 0.6, p.z);
        this.interactables.push({
          kind: 'hide', ref: p, pos, reach: 2.0,
          prompt: () => this.player.hidden ? (this.player.hidden.spot.x === p.x && this.player.hidden.spot.z === p.z || this.player.hidden.spot === p ? t('pr.unhide') : null) : t(p.hideKind === 'locker' ? 'pr.hideLocker' : 'pr.hide'),
          act: () => {
            if (this.player.hidden) { this.player.unhide(); return; }
            const watching = this.entities.filter(e => e.hostile && e.state === 'chase' && e.losToPlayer() && e.distToPlayer() < 14);
            for (const e of this.entities) e.sawHide = watching.includes(e);
            this.player.hide({ x: p.x, z: p.z, yaw: faceYaw, eye: p.hideEye || 0.62, kind: p.hideKind });
            this.audio.play && this.audio.play(p.hideKind === 'locker' ? 'doorLocked' : 'cloth', 2, 'sfx', null, { rev: 0.2, gain: 0.5 });
            this.ui.subtitle(ST.mono(p.hideKind === 'locker' ? 'hideLocker' : 'hide'), 2.5);
          },
        });
      }
    }
    createEntities() {
      const L = this.level, def = this.levelDef, E = PB.Entities;
      const spawnFar = (minD) => {
        const dist = L.bfs(L.spawn.x, L.spawn.y, 'nav');
        const cands = [];
        let far = 0; for (let i = 0; i < dist.length; i++) if (L.floorType[i] === 0) far = Math.max(far, dist[i]);
        // Small levels: never closer than most of the way across
        minD = Math.min(minD, Math.max(3, Math.floor(far * 0.7)));
        for (let i = 0; i < dist.length; i++) if (dist[i] >= minD && L.floorType[i] === 0) cands.push(i);
        const i = cands.length ? cands[Math.floor(Math.random() * cands.length)] : L.i(L.spawn.x, L.spawn.y);
        return { x: i % L.w, y: (i / L.w) | 0 };
      };
      const maze = def.layout === 'maze' || def.layout === 'killscreen';
      const pad = L.meta.pad || 0;
      const created = new Set();
      for (const e of def.entities || []) {
        const count = e.count || 1;
        for (let k = 0; k < count; k++) {
          let ent;
          if (e.type === 'pacman') {
            ent = new E.Pacman(this, e);
            this.pacman = ent;
            if (e.dormant) { ent.mesh.visible = true; ent.mesh.position.set(0, -60, 0); ent.vis.light.intensity = 0; }
            else if (maze) ent.placeCell(pad + 13, 11);
            else { const c = spawnFar(20); ent.placeCell(c.x, c.y); }
          } else if (e.type === 'ghost') {
            const ch = ST.ghostChar(e.ghost);
            const friendly = this.save && this.save.freed.includes(ch);
            ent = new E.Ghost(this, Object.assign({}, e, { friendly }));
            created.add(e.ghost);
            if (maze) { const spots = [[pad + 11, 11], [pad + 16, 11], [pad + 11, 17], [pad + 16, 17]]; const s = spots[['blinky', 'pinky', 'inky', 'clyde'].indexOf(e.ghost)]; ent.placeCell(s[0], s[1]); }
            else if (friendly) ent.placeCell(L.spawn.x, L.spawn.y);
            else { const c = spawnFar(e.ghost === 'clyde' ? 14 : 18); ent.placeCell(c.x, c.y); }
          } else if (e.type === 'grinner') { ent = new E.Grinner(this, e); const c = spawnFar(12); ent.placeCell(c.x, c.y); }
          else if (e.type === 'watcher') { ent = new E.Watcher(this, e); ent.placeCell(L.spawn.x, L.spawn.y); }
          else if (E.extra && E.extra[e.type]) {
            ent = new E.extra[e.type](this, e);
            const sp = e.spot && L.spots[e.spot] && L.spots[e.spot][0];
            if (sp) { ent.placeCell(sp.x, sp.y); if (sp.wx != null) { ent.pos.set(sp.wx, 0, sp.wz); ent.mesh.position.copy(ent.pos); } ent.heading = e.heading || 0; }
            else { const c = spawnFar(e.near || (e.type === 'mannequin' ? 10 : 16)); ent.placeCell(c.x, c.y); }
          }
          if (ent) this.entities.push(ent);
        }
      }
      // Ghosts freed in earlier chapters follow you
      const ghostOf = ch => Object.keys(ST.GHOSTS).find(k => ST.GHOSTS[k] === ch);
      if (this.save) for (const ch of this.save.freed) {
        const gname = ghostOf(ch);
        if (!gname || created.has(gname)) continue;
        const g = new E.Ghost(this, { ghost: gname, friendly: true });
        g.placeCell(L.spawn.x, L.spawn.y);
        this.entities.push(g);
      }
    }

    // ================================================================ ETKİLEŞİM
    findTarget() {
      const cam = this.camera;
      const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
      let best = null, bestScore = Infinity;
      const cp = cam.position;
      for (const it of this.interactables) {
        const p = it.pos;
        const dx = p.x - cp.x, dy = p.y - cp.y, dz = p.z - cp.z;
        const d = Math.hypot(dx, dz, Math.max(0, Math.abs(dy) - 0.9));
        if (d > (it.reach || 2.5)) continue;
        const text = it.prompt();
        if (!text) continue;
        const d3 = Math.hypot(dx, dy, dz);
        const dot = (dx * fwd.x + dy * fwd.y + dz * fwd.z) / Math.max(d3, 1e-3);
        const hd = Math.hypot(dx, dz);
        if (dot < (hd < 0.9 ? 0.2 : 0.8)) continue;
        if (it.kind !== 'door' && !this.level.los(cp.x, cp.z, p.x - dx / Math.max(hd, 1e-3) * 0.25, p.z - dz / Math.max(hd, 1e-3) * 0.25)) continue;
        const score = d * (2 - dot);
        if (score < bestScore) { bestScore = score; best = { it, text }; }
      }
      return best;
    }
    updateInteraction(dt) {
      const pl = this.player;
      const tgt = this.findTarget();
      this.target = tgt;
      const holdLen = tgt && tgt.it.hold ? tgt.it.hold() : 0;
      if (this.holding) {
        if (!tgt || tgt.it !== this.holding.it) { this.holding = null; }
        else {
          this.holding.t += dt;
          this.ui.prompt(tgt.text, this.holding.t / holdLen);
          if (this.holding.t >= holdLen) { const it = this.holding.it; this.holding = null; it.act(); }
          return;
        }
      }
      this.ui.prompt(tgt ? tgt.text : null);
      this.updateMarks(tgt);
      if (this.input.pressed('interact')) {
        if (pl.hidden && (!tgt || tgt.it.kind !== 'hide')) { pl.unhide(); return; }
        if (!tgt) return;
        if (holdLen > 0 && (tgt.it.ref && this.canHold(tgt.it))) { this.holding = { it: tgt.it, t: 0 }; if (this.script.holdStart) this.script.holdStart(this, tgt.it.ref); return; }
        tgt.it.act();
      }
    }
    // Small on-screen rings over nearby usable things (fade in with distance, the aimed one fills)
    updateMarks(tgt) {
      const out = this.markList || (this.markList = []);
      out.length = 0;
      if (S.data.hints && this.state === 'play' && !this.player.hidden) {
        const cam = this.camera, cp = cam.position, v = this.markV || (this.markV = new THREE.Vector3());
        for (const it of this.interactables) {
          if (it.kind !== 'item' || !it.ref.marker || it.ref.taken || (it.ref.mesh && !it.ref.mesh.visible)) continue;
          const p = it.pos, hd = Math.hypot(p.x - cp.x, p.z - cp.z);
          if (hd > 4.5) continue;
          v.copy(p).project(cam);
          if (v.z > 1 || Math.abs(v.x) > 1.1 || Math.abs(v.y) > 1.1) continue;
          if (!this.level.los(cp.x, cp.z, p.x + (cp.x - p.x) * 0.25 / Math.max(hd, 0.25), p.z + (cp.z - p.z) * 0.25 / Math.max(hd, 0.25))) continue;
          const on = !!(tgt && tgt.it === it);
          if (!on && !it.prompt()) continue;
          out.push({ x: (v.x * 0.5 + 0.5) * 100, y: (0.5 - v.y * 0.5) * 100, a: on ? 1 : U.clamp((4.5 - hd) / 2, 0, 1) * 0.8, on });
          if (out.length >= 10) break;
        }
      }
      this.ui.marks(out);
    }
    canHold(it) { return !this.script.canHold || this.script.canHold(this, it.ref); }
    noise(x, z, radius) { for (const e of this.entities) e.hear(x, z, radius); }
    // Unscripted scares: every minute or two something happens nearby that is not an attack.
    // A tube bursts, a door slams behind you, someone runs past out of sight, a whisper.
    updateScares(dt) {
      const def = this.levelDef, pl = this.player, t_ = PB.t;
      if (!def || ['prolog', 'maze', 'killscreen'].includes(def.id) || S.data.jumpscare === 'off') return;
      if (this.scareT == null) this.scareT = 50 + Math.random() * 40;
      this.scareT -= dt;
      if (this.scareT > 0 || pl.hidden || this.talking()) return;
      // Not while something is actually hunting you
      if (this.entities.some(e => e.hostile && !e.friendly && e.mesh && e.distToPlayer && e.distToPlayer() < 14 && e.state === 'chase')) { this.scareT = 12; return; }
      this.scareT = 60 + Math.random() * 70;
      const cam = this.camera, fwd = pl.forward(), W = this.world, t = this.time;
      const behind = (x, z) => ((x - pl.pos.x) * fwd.x + (z - pl.pos.z) * fwd.z) < 0;
      const opts = [];
      // 1. A fluorescent tube bursts right ahead
      const fix = W.fixtures.filter(f => f.mesh && f.powered && !f.light.broken && Math.hypot(f.light.x - pl.pos.x, f.light.z - pl.pos.z) < 10 && !behind(f.light.x, f.light.z));
      if (fix.length) opts.push(() => {
        const f = fix[Math.floor(Math.random() * fix.length)];
        f.light.popT = t + 2.2; W.fixDirty = true;
        const pos = { x: f.light.x, y: f.light.y || 2.8, z: f.light.z };
        if (this.audio.ctx) { const a = this.audio, at = a.t, o = a.out('sfx', pos, { rev: 0.5 }); a.burst(o.input, 'highpass', 2500, 0.7, at, 0.12, 0.9, 0.001); for (let k = 0; k < 7; k++) a.tone(o.input, 'sine', 3000 + Math.random() * 3000, 2500, at + 0.05 + Math.random() * 0.4, 0.05, 0.12, 0.001); }
        this.audio.caption('buzz', t_('cap.pop'), pos, 10);
        pl.addTrauma(0.25); pl.fear = Math.min(100, pl.fear + 12);
      });
      // 2. A door you left open slams behind you
      const doors = [...W.doorObjs.values()].filter(o => o.door.open && !['exit', 'elevator', 'house', 'stair'].includes(o.door.kind) && o.door.id !== this.exitDoorId && Math.hypot(o.g.cx - pl.pos.x, o.g.cz - pl.pos.z) < 13 && Math.hypot(o.g.cx - pl.pos.x, o.g.cz - pl.pos.z) > 3 && behind(o.g.cx, o.g.cz));
      if (doors.length) opts.push(() => {
        const o = doors[Math.floor(Math.random() * doors.length)];
        W.closeDoor(o.door.id); this.nav.dirty = true;
        const pos = new THREE.Vector3(o.g.cx, 1.2, o.g.cz);
        this.audio.door(o.door.kind, pos, false, 1.8);
        this.audio.caption('door', t_('cap.slam'), pos, 10);
        pl.addTrauma(0.3); pl.fear = Math.min(100, pl.fear + 15);
      });
      // 3. Somebody runs past, out of sight
      opts.push(() => {
        const a = Math.atan2(-fwd.x, -fwd.z) + (Math.random() - 0.5) * 1.2, d = 9 + Math.random() * 5;
        const sx = pl.pos.x + Math.sin(a) * d, sz = pl.pos.z + Math.cos(a) * d, dir = a + Math.PI / 2;
        const surf = pl.surface ? pl.surface() : 'carpet';
        for (let k = 0; k < 9; k++) this.later(k * 260, () => this.audio.footstep(surf, 1.2, { x: sx + Math.sin(dir) * k * 0.9, y: 0, z: sz + Math.cos(dir) * k * 0.9 }));
        this.audio.caption('run', t_('cap.run'), { x: sx, y: 1, z: sz }, 10);
        pl.fear = Math.min(100, pl.fear + 8);
      });
      // 4. A whisper right at your ear
      opts.push(() => { this.audio.echoVoice(1.4, 'voice'); this.audio.caption('whisper', t_('cap.whisper'), null, 10); pl.fear = Math.min(100, pl.fear + 10); });
      opts[Math.floor(Math.random() * opts.length)]();
    }
    openDoorBy(door, ent) {
      this.world.openDoor(door.id, ent.pos.x, ent.pos.z);
      const obj = this.world.doorObjs.get(door.id);
      if (obj) this.audio.door(door.kind, new THREE.Vector3(obj.g.cx, 1.2, obj.g.cz), true);
    }

    // ================================================================ OLAYLAR
    onSpotted(ent) {
      const key = ent.kind === 'ghost' ? ent.type : ent.kind;
      const now = this.time;
      if (!this.lastStinger || now - this.lastStinger > 22) { this.audio.stinger('spot'); this.lastStinger = now; }
      this.player.fear = Math.min(100, this.player.fear + 22);
      if (!this.spottedOnce[key]) {
        this.spottedOnce[key] = true;
        if (this.script.onSpotted) this.script.onSpotted(this, ent);
      }
    }
    onClydeSeen() {
      if (!this.spottedOnce.clyde) { this.spottedOnce.clyde = true; if (this.script.onClyde) this.script.onClyde(this); this.audio.stinger('spot'); }
    }
    onWatcherSeen() {
      if (!this.spottedOnce.watcher) { this.spottedOnce.watcher = true; this.mono('watcherSeen', 5); }
      this.audio.stinger('spot');
    }
    onGhostEaten(g) {
      this.audio.pickup('pellet');
      this.ui.notify(t('n.ghostBack', { name: ST.char(ST.ghostChar(g.type)).name }), 'key');
      this.mazeScore += 200;
    }
    fearAdd(v) { this.player.fear = U.clamp(this.player.fear + v * PB.Settings.difficulty().fear, 0, 100); }
    killPlayer(ent) {
      if (this.state !== 'play') return;
      const dif = S.data.difficulty;
      if (dif === 'easy' && !this.graceUsed) {
        this.graceUsed = true;
        this.player.fear = 100;
        this.fx.damage = 1;
        this.player.addTrauma(0.8);
        this.audio.stinger('spot');
        if (ent.kind === 'pacman') { ent.frozenT = 6; ent.setState('stunned'); }
        else if (ent.kind === 'ghost') { if (ent.type === 'clyde') ent.retreat(); else { ent.setState('eaten'); ent.eatenT = 8; } }
        else if (ent.kind === 'grinner') ent.dissolve();
        else if (ent.kind === 'watcher') ent.vanish();
        else if (ent.stun) ent.stun();
        this.ui.hint(t('n.grace'));
        return;
      }
      this.state = 'dying';
      this.dyingT = 0;
      this.killer = ent;
      this.player.frozen = true;
      this.player.unhide();
      this.audio.stinger(S.data.jumpscare === 'full' ? 'jump' : 'spot');
      this.audio.setMusic('none');
      this.save.stats.deaths++;
      this.writeSave();
      this.fx.damage = 1;
      this.player.addTrauma(S.data.jumpscare === 'full' ? 1 : 0.4);
    }
    updateDying(dt) {
      this.dyingT += dt;
      const k = this.killer, pl = this.player;
      if (k) {
        const a = Math.atan2(k.pos.x - pl.pos.x, k.pos.z - pl.pos.z);
        pl.yaw = U.angleDamp(pl.yaw, a + Math.PI, 10, dt);
        pl.pitch = U.damp(pl.pitch, k.kind === 'watcher' ? 0.35 : 0.05, 8, dt);
        if (S.data.jumpscare === 'full' && this.dyingT < 0.7) {
          const cam = this.camera.position;
          const target = new THREE.Vector3(cam.x - Math.sin(pl.yaw) * 1.1, k.kind === 'pacman' ? 1.4 : 1.2, cam.z - Math.cos(pl.yaw) * 1.1);
          k.mesh.position.lerp(target, 1 - Math.exp(-9 * dt));
          if (k.kind === 'pacman') { k.vis.up.rotation.x = -0.9; k.vis.lo.rotation.x = 0.4; }
        }
      }
      pl.updateCamera(dt, 0);
      this.fx.damage = Math.max(this.fx.damage, 0.6);
      if (this.dyingT > 0.9) this.fx.blackout = Math.min(1, (this.dyingT - 0.9) * 1.6);
      if (this.dyingT > 1.7 && this.state === 'dying') {
        this.state = 'dead';
        this.input.exitLock();
        $('hud').hidden = true;
        const kind = k ? (k.kind === 'ghost' ? k.type : k.kind) : 'pacman';
        this.ui.showDeath(kind, () => this.respawn(), () => this.toMenu());
      }
    }
    respawn() {
      this.ui.only(null);
      const cp = this.cpPos;
      this.player.spawn(cp.x, cp.z, cp.yaw);
      this.player.frozen = false;
      this.player.fear = 0;
      this.powerT = 0;
      this.fx.damage = 0;
      this.nav.dirty = true; this.nav.update();
      // Yaratıkları uzağa yerleştir
      for (const e of this.entities) {
        if (e.kind === 'pacman' && e.state === 'dormant') continue;
        if (e.friendly) { e.placeCell(this.nav.playerCell.x, this.nav.playerCell.y); continue; }
        const c = e.randomCellNear(this.nav.playerCell.x, this.nav.playerCell.y, 18, 30, true) || e.randomCellNear(this.nav.playerCell.x, this.nav.playerCell.y, 12, 40);
        if (c) e.placeCell(c.x, c.y);
        e.awareness = 0;
        if (e.kind === 'watcher') e.vanish();
        else if (e.kind === 'grinner') e.setState('lurk');
        else if (e.kind === 'ghost' && e.type === 'clyde') e.setState('retreat');
        else e.setState('patrol');
      }
      $('hud').hidden = false;
      $('touch').hidden = !this.ui.touch;
      this.state = 'play';
      this.fx.blackout = 1;
      this.fadeTo(0, 1.5);
      this.audio.setMusic('explore');
      if (!this.ui.touch && !this.input.lockFailed) this.input.requestLock();
    }
    pause() {
      if (this.state !== 'play') return;
      this.state = 'pause';
      this.input.exitLock();
      this.holding = null;
      this.ui.only('scr-pause');
      $('p-load').hidden = !(this.save && this.save.cp);
      this.audio.setMusic('none');
    }
    resume() {
      if (this.state !== 'pause') return;
      this.ui.only(null);
      this.state = 'play';
      this.audio.setMusic('explore');
      if (!this.ui.touch && !this.input.lockFailed) this.input.requestLock();
    }
    onPointerUnlock() { if (this.state === 'play' && !this.ignoreUnlock) this.pause(); }
    openMap(fromPause) {
      this.state = 'map';
      this.mapFromPause = !!fromPause;
      this.input.exitLock();
      this.ignoreUnlock = true;
      this.ui.show('scr-map');
      this.ui.drawMap(this, { entities: !!this.flags.cameras });
    }
    // Backpack: items with a 3D inspect view, and the journal
    openBag(tab, fromPause) {
      if (!this.bag) this.bag = new PB.Bag(this);
      this.state = 'bag';
      this.bagFromPause = !!fromPause;
      this.input.exitLock();
      this.ignoreUnlock = true;
      this.audio.paper();
      this.ui.show('scr-bag');
      this.bag.open(tab);
    }
    closeBag() {
      this.ui.hide('scr-bag');
      this.ignoreUnlock = false;
      if (this.bagFromPause) { this.state = 'pause'; this.ui.only('scr-pause'); return; }
      this.state = 'play';
      this.suppressPauseUntil = performance.now() + 250;
      if (!this.ui.touch && !this.input.lockFailed) this.input.requestLock();
    }
    // Read a paper from the journal, then come back to it
    readFromBag(id) {
      this.ui.hide('scr-bag');
      this.state = 'note';
      this.ui.showNote(id, () => { this.state = 'bag'; this.ui.show('scr-bag'); this.bag.show('journal'); }, true);
    }
    closeMap() {
      this.ui.hide('scr-map');
      this.ignoreUnlock = false;
      if (this.mapFromPause) { this.state = 'pause'; this.ui.only('scr-pause'); return; }
      this.state = 'play';
      if (!this.ui.touch && !this.input.lockFailed) this.input.requestLock();
    }
    enterCabinet() {
      this.state = 'cabinet';
      this.input.exitLock();
      this.ignoreUnlock = true;
      this.ui.show('scr-cabinet');
      if (!this.classic) {
        const c = $('cab-canvas');
        this.classic = PB.Classic(c, {});
        let sx = 0, sy = 0;
        c.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; });
        c.addEventListener('pointerup', e => {
          const dx = e.clientX - sx, dy = e.clientY - sy;
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) this.classic.tap();
          else this.classic.steer(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 3 : 1) : (dy > 0 ? 2 : 0));
        });
        document.addEventListener('keydown', e => {
          if (this.state !== 'cabinet') return;
          // Kabin açıkken tuşlar 3D oyuna (pencere dinleyicisine) ulaşmasın
          e.stopPropagation();
          if (e.code === 'Escape') { e.preventDefault(); this.exitCabinet(); return; }
          if (this.classic.key(e.code)) e.preventDefault();
        });
      }
      this.classic.start();
      this.audio.setMusic('none');
    }
    exitCabinet() {
      if (this.state !== 'cabinet') return;
      this.classic.stop();
      if (this.classic.score >= 10000 && !this.flags.cabinetHi) { this.flags.cabinetHi = true; this.ui.notify(t('n.cabinetHi'), 'key'); }
      this.ui.hide('scr-cabinet');
      this.state = 'play';
      this.ignoreUnlock = false;
      this.suppressPauseUntil = performance.now() + 250;
      if (!this.ui.touch && !this.input.lockFailed) this.input.requestLock();
    }
    // Duraklatma/menü açıkken bekleyip oyun sürdüğünde çalıştır
    // Bölüm değişirse iptal olan gecikmeli çağrı
    later(ms, fn) { const gen = this.levelGen; setTimeout(() => { if (this.levelGen === gen) fn(); }, ms); }
    whenPlaying(fn) {
      const gen = this.levelGen;
      const tick = () => { if (this.levelGen !== gen) return; if (this.state === 'play') fn(); else setTimeout(tick, 250); };
      tick();
    }
    fadeTo(v, dur, then) { this.fx.fade = { from: this.fx.blackout, to: v, t: 0, dur, then }; }
    drainPools(instant) {
      const w = this.world;
      w.drained = true;
      const water = w.archMeshes.filter(m => m.userData.kind === 'water');
      if (instant) { for (const m of water) m.visible = false; return; }
      this.drainAnim = { t: 0, meshes: water };
    }
    throwGlowstick() {
      if (this.inv.glow <= 0) { this.ui.hint(t('n.noGlow')); return; }
      this.inv.glow--;
      const pl = this.player;
      const f = pl.forward(), L = this.level;
      // Thrown, not dropped: it flies up to ~9 m (further when looking up) and lands where a wall stops it
      const reach = U.clamp(6 + pl.pitch * 8, 2, 9.5);
      let land = { x: pl.pos.x + f.x * 0.8, z: pl.pos.z + f.z * 0.8 };
      for (let s = 0.8; s <= reach; s += 0.25) {
        const x = pl.pos.x + f.x * s, z = pl.pos.z + f.z * s;
        if (!L.los(pl.pos.x, pl.pos.z, x, z)) break;
        const q = { x, z }; this.world.collide(q, 0.12);
        if (Math.hypot(q.x - x, q.z - z) > 0.05) { land = q; break; }
        land = { x, z };
      }
      const pos = new THREE.Vector3(land.x, 0.05, land.z);
      const cam = this.camera.position;
      const mesh = this.meshFromDef('glowstick');
      mesh.position.set(cam.x + f.x * 0.4, cam.y - 0.25, cam.z + f.z * 0.4);
      mesh.rotation.y = Math.random() * 6;
      this.scene.add(mesh);
      const light = this.glowPool.find(l => l.intensity === 0) || this.glowPool[0];
      light.position.set(pos.x, 0.4, pos.z);
      light.intensity = 5;
      const from = mesh.position.clone(), dist = Math.hypot(pos.x - from.x, pos.z - from.z);
      const gs = { pos, mesh, light, t: 75, fly: { from, t: 0, dur: 0.18 + dist / 11, h: 0.6 + dist * 0.12 } };
      const old = this.glowsticks.find(g => g.light === light);
      if (old) { this.scene.remove(old.mesh); this.glowsticks.splice(this.glowsticks.indexOf(old), 1); }
      this.glowsticks.push(gs);
      this.audio.click();
      this.updateInventoryUI();
    }
    drinkAlmond() {
      if (this.inv.almond <= 0) { this.ui.hint(t('n.noAlmond')); return; }
      this.inv.almond--;
      this.player.fear = Math.max(0, this.player.fear - 50);
      this.player.stamina = 100; this.player.exhausted = false;
      this.audio.pickup();
      this.ui.notify(t('n.drank'));
      this.updateInventoryUI();
    }
    // vars: object for {placeholders}; a bare number means {n}
    setObj(key, vars) {
      this.objKey = key; this.objVars = typeof vars === 'number' ? { n: vars } : (vars || {});
      this.refreshObjective();
    }
    refreshObjective() {
      if (!this.objKey) { this.ui.setObjective(''); return; }
      this.ui.setObjective(ST.obj(this.objKey, this.objVars));
    }
    // ---------------------------------------------------------------- speech
    mono(key, dur) { const s = ST.mono(key); if (s) this.ui.subtitle(s, dur || Math.min(7, 2 + s.length * 0.045)); }
    // Radio / dialogue sequence. Eddie only reaches you once you have the walkie-talkie.
    radio(key, opts = {}) {
      const seq = ST.radio(key);
      if (!seq || !this.save) return;
      const fk = 'r_' + key;
      if (this.flags[fk] && !opts.repeat) return;
      if (!opts.force && !this.save.world.radio && seq.some(l => l[0] === 'eddie')) return;
      this.flags[fk] = true;
      this.talkQ.push({ seq: seq.slice(), i: 0, wait: opts.delay || 0 });
    }
    talking() { return !!(this.talkCur || this.talkQ.length); }
    updateTalk(dt) {
      if (!this.talkCur) { if (!this.talkQ.length) return; this.talkCur = this.talkQ.shift(); this.talkCur.t = 0; }
      const c = this.talkCur;
      if (c.wait > 0) { c.wait -= dt; return; }
      c.t -= dt;
      if (c.t > 0) return;
      if (c.i >= c.seq.length) { this.talkCur = null; return; }
      const [who, text] = c.seq[c.i++];
      const dur = U.clamp(1.4 + text.length * 0.052, 2.2, 9);
      c.t = dur + 0.25;
      this.ui.subtitle(text, dur, who === 'sam' ? null : ST.speaker(who), who);
      if (who === 'eddie' || who === 'radio') this.audio.radioVoice(dur, who);
      else if (who !== 'sam') this.audio.echoVoice(dur, who);
    }
    // Modal choice (e.g. at the final door)
    choice(options, onCancel) {
      this.state = 'choice';
      this.input.exitLock();
      this.ignoreUnlock = true;
      this.ui.showChoice(options.map(o => ({ label: o.label, fn: () => { this.ui.hideChoice(); this.state = 'play'; this.ignoreUnlock = false; o.fn(); } })), () => {
        this.ui.hideChoice(); this.state = 'play'; this.ignoreUnlock = false;
        if (!this.ui.touch && !this.input.lockFailed) this.input.requestLock();
        if (onCancel) onCancel();
      });
    }
    onLanguage() {
      if (this.ui) this.ui.onLanguage();
      if (this.objKey) this.refreshObjective();
      if (this.inv) this.updateInventoryUI();
    }
    completeStep() { this.objectivesDone++; this.safeCheckpoint(); }
    exitLevel(next) {
      if (this.state !== 'play' || this.exiting) return;
      this.exiting = true;
      this.player.frozen = true;
      this.fadeTo(1, 1.4, () => {
        this.exiting = false;
        this.player.frozen = false;
        if (next && next.startsWith('ending-')) return this.ending(next.slice(7));
        if (!this.save.unlocked.includes(next)) this.save.unlocked.push(next);
        this.save.level = next; this.save.cp = null;
        this.writeSave();
        this.loadLevel(next);
      });
    }
    ending(kind) {
      this.state = 'ending';
      this.input.exitLock();
      this.audio.stopAllLoops();
      this.audio.setMusic('ending');
      $('hud').hidden = true; $('touch').hidden = true;
      this.save.completed = true;
      if (!this.save.endings.includes(kind)) this.save.endings.push(kind);
      for (const L of ST.LEVELS) if (!this.save.unlocked.includes(L.id)) this.save.unlocked.push(L.id);
      this.save.level = null; this.save.cp = null;
      this.writeSave();
      this.fx.blackout = 1;
      this.ui.showEnding(kind, { time: this.playTime, deaths: this.save.stats.deaths, notes: this.save.notes.length, freed: this.save.freed.length, drawings: this.save.drawings.length }, () => this.toMenu());
    }
    freeGhost(ch) {
      if (!this.save.freed.includes(ch)) this.save.freed.push(ch);
      this.inv.memento = null;
      const gname = Object.keys(ST.GHOSTS).find(k => ST.GHOSTS[k] === ch);
      const g = this.entities.find(e => e.kind === 'ghost' && e.type === gname);
      if (g) g.makeFriendly();
      this.audio.door('house');
      this.fx.flash = 0.6;
      const lines = ST.freedLines(ch);
      if (lines[0]) this.ui.subtitle(lines[0], 5);
      if (lines[1]) this.later(5200, () => this.ui.subtitle(lines[1], 5));
      this.ui.notify(t('n.freed', { name: ST.char(ch).name }), 'key');
      const rk = { billy: 'mill_freed', ivy: 'pool_freed', penny: 'office_freed', clyde: 'dark_freed' }[ch];
      if (rk) this.radio(rk, { delay: 11 });
      this.updateInventoryUI();
      this.checkpoint(true);
    }

    // Uzun süre düşük kare hızı: bir kez, ayarları öneren bir bildirim
    checkPerf(fps) {
      if (this.perfHinted || this.state !== 'play' || document.hidden) return;
      this.slowT = fps < 24 ? (this.slowT || 0) + 0.5 : Math.max(0, (this.slowT || 0) - 1);
      if (this.slowT < 12) return;
      this.perfHinted = true;
      if (S.data.preset === 'low' && S.data.renderScale <= 0.6) return;
      this.ui.notify(t('n.slow'));
    }

    // ================================================================ ANA DÖNGÜ
    frame() {
      const now = performance.now();
      const raw = (now - this.last) / 1000;
      const dt = Math.min(0.05, raw);
      this.last = now;
      this.time += dt;
      // FPS gerçek süreden ölçülür (dt 0.05'te kırpıldığı için ondan ölçülemez)
      this.fpsAcc += raw; this.fpsN++;
      if (this.fpsAcc > 0.5) {
        const fps = this.fpsN / this.fpsAcc;
        if (S.data.showFps) this.ui.fps(Math.round(fps));
        this.checkPerf(fps);
        this.fpsAcc = 0; this.fpsN = 0;
      }
      const inp = this.input;
      switch (this.state) {
        case 'play': this.updatePlay(dt); this.updateTalk(dt); break;
        case 'dying': this.updateDying(dt); this.updateEntities(dt, true); break;
        case 'menu': this.updateMenu(dt); break;
        case 'note':
          if (inp.pressed('interact') || inp.pressed('pause')) { if (this.ui.finishType && this.ui.$('note-paper').querySelector('.caret')) this.ui.finishType(); else $('note-close').click(); }
          break;
        case 'map': if (inp.pressed('map') || inp.pressed('pause')) this.closeMap(); break;
        case 'bag':
          if (inp.pressed('pause')) this.closeBag();
          else if (inp.pressed('inventory')) { if (this.bag.tab === 'items') this.closeBag(); else this.bag.show('items'); }
          else if (inp.pressed('journal')) { if (this.bag.tab === 'journal') this.closeBag(); else this.bag.show('journal'); }
          if (this.state === 'bag') this.bag.update(dt);
          break;
        case 'pause': if (inp.pressed('pause') && this.ui.isOpen('scr-pause')) this.resume(); break;
        default: break;
      }
      if (this.fx.fade) {
        const f = this.fx.fade;
        f.t += dt;
        this.fx.blackout = U.lerp(f.from, f.to, U.clamp(f.t / f.dur, 0, 1));
        if (f.t >= f.dur) { this.fx.fade = null; if (f.then) f.then(); }
      }
      if (this.world && this.world.ready) {
        const pac = this.pacman && this.pacman.info ? this.pacman.info() : null;
        this.world.update(dt, this.time, this.camera.position, { pac });
      }
      this.player.updateFlash(dt);
      this.flashInterference = Math.max(0, this.flashInterference - dt);
      if (this.audio.ctx) { this.audio.camYaw = this.player.yaw; this.audio.listen(this.camera); if (this.state === 'play') this.audio.ambienceTick(this.camera); }
      if (this.state !== 'play' && this.markList && this.markList.length) { this.markList.length = 0; this.ui.marks(this.markList); }
      this.updatePost(dt);
      if (this.postDirty) this.configurePost();
      this.keeper.tick(dt);
      this.keeper.render(() => this.post.render(this.scene, this.camera, this.time));
      if (PB.debug) this.watchPrograms();
      inp.endFrame();
    }
    // Debug: report shaders compiled during play (each one is a hitch)
    watchPrograms() {
      const list = this.renderer.info.programs || [];
      if (this.progSeen == null || this.state === 'loading') { this.progSeen = list.length; return; }
      if (list.length > this.progSeen) {
        console.warn('[shaders] ' + (list.length - this.progSeen) + ' compiled during ' + this.state + ': ' + list.slice(this.progSeen).map(p => p.name).join(', '));
        this.progSeen = list.length;
      }
    }
    updateMenu(dt) {
      this.menuT += dt;
      const L = this.level;
      if (!L) return;
      // Salonda yavaşça süzülen kamera, gözü özel kabinde
      const t = this.menuT * 0.06;
      const cx = L.cx(4.2) + Math.sin(t) * 5.5, cz = L.cz(4) + Math.cos(t * 0.8) * 3.2;
      this.camera.position.set(cx, 1.75 + Math.sin(t * 2) * 0.15, cz);
      this.camera.lookAt(L.cx(4) + 0.75, 1.4, 0.6);
      this.fx.blackout = U.damp(this.fx.blackout, 0.18, 1.2, dt);
    }
    updatePlay(dt) {
      const inp = this.input, pl = this.player;
      this.playTime += dt;
      if (inp.pressed('pause') && performance.now() > (this.suppressPauseUntil || 0)) { if (pl.hidden) pl.unhide(); else { this.pause(); return; } }
      if (inp.pressed('map')) { this.openMap(); return; }
      if (inp.pressed('inventory')) { this.openBag('items'); return; }
      if (inp.pressed('journal')) { this.openBag('journal'); return; }
      if (inp.pressed('throw')) this.throwGlowstick();
      if (inp.pressed('drink')) this.drinkAlmond();
      pl.update(dt);
      // Keşfedilen hücreler (harita)
      const c = this.level.cellOf(pl.pos.x, pl.pos.z);
      for (let y = c.y - 2; y <= c.y + 2; y++) for (let x = c.x - 2; x <= c.x + 2; x++) if (this.level.inb(x, y) && this.level.los(pl.pos.x, pl.pos.z, this.level.cx(x), this.level.cz(y))) this.explored[this.level.i(x, y)] = 1;
      this.nav.update();
      this.powerT = Math.max(0, this.powerT - dt);
      this.ui.powerTimer(this.powerT);
      this.updateEntities(dt);
      if (this.state !== 'play') return;
      this.updateScares(dt);
      this.updateItems(dt);
      this.updateInteraction(dt);
      this.updatePortals();
      this.updateExits();
      this.updateGlowsticks(dt);
      if (pl.battery <= 0 && this.inv.batteries > 0 && pl.reloadT <= 0) pl.reload();
      if (pl.battery < 15 && pl.battery > 0 && this.inv.batteries > 0 && !this.flags.lowTip) { this.flags.lowTip = true; this.ui.hint(t('hint.reload'), true); }
      if (pl.battery > 50) this.flags.lowTip = false;
      if (this.script.update) this.script.update(this, dt);
      this.updateFear(dt);
      this.updateMusic();
      if (this.drainAnim) {
        const d = this.drainAnim; d.t += dt;
        for (const m of d.meshes) m.position.y = -Math.min(0.42, d.t * 0.021);
        if (d.t > 20) { for (const m of d.meshes) m.visible = false; this.drainAnim = null; }
      }
      this.ui.hud(dt, pl);
      if (S.data.vhs) this.ui.rec(this.playTime, this.levelDef.name);
      if (Math.floor(this.playTime) % 20 === 0 && Math.floor(this.playTime - dt) % 20 !== 0) this.writeSave();
    }
    updateEntities(dt, frozen) {
      for (const e of this.entities) { if (frozen && e === this.killer) continue; if (!frozen || e.kind !== 'pacman') e.update(dt); if (this.state !== 'play' && this.state !== 'dying') break; }
    }
    updateItems(dt) {
      const t = this.time, pl = this.player;
      for (const o of this.items) {
        if (o.taken || !o.mesh) continue;
        if (o.hiddenUntil) o.mesh.visible = !!this.flags[o.hiddenUntil];
        if (o.spin) o.mesh.rotation.y += dt * 1.2;
        if (o.spinSlow) o.mesh.rotation.y += dt * 0.4;
        if (o.bob) o.mesh.position.y = o.baseY + Math.sin(t * 2.4 + o.pos.x) * 0.1;
        if (o.type === 'powerPellet' && o.light) o.light.intensity = 2.5 + Math.sin(t * 6) * 1;
        // Labirentte güç hapları dokununca yenir
        if (o.type === 'powerPellet' && this.levelDef.layout !== 'backrooms' && Math.hypot(pl.pos.x - o.pos.x, pl.pos.z - o.pos.z) < 1.0) this.useItem(o);
      }
      // Labirent pelletleri
      const w = this.world;
      if (w.pellets) {
        const c = this.level.cellOf(pl.pos.x, pl.pos.z);
        for (const p of w.pellets) {
          if (!p.alive || Math.abs(p.cx - c.x) > 1 || Math.abs(p.cy - c.y) > 1) continue;
          if (Math.hypot(p.x - pl.pos.x, p.z - pl.pos.z) < 0.95) {
            w.hidePellet(p.k);
            this.mazeScore += 10;
            this.flags.pelletsEaten = (this.flags.pelletsEaten || 0) + 1;
            if (this.audio.ctx) { const o = this.audio.out('sfx', null, { rev: 0.2, gain: 0.25 }); this.audio.tone(o.input, 'triangle', this.flags.pelletsEaten % 2 ? 520 : 260, this.flags.pelletsEaten % 2 ? 260 : 520, this.audio.t, 0.07, 0.4); }
            if (this.script.pellet) this.script.pellet(this);
          }
        }
      }
    }
    updatePortals() {
      const L = this.level, pl = this.player, C = L.cell;
      for (const p of L.portals) {
        if (Math.floor(pl.pos.z / C) !== p.ay) continue;
        if (pl.pos.x < 0.35) { pl.pos.x = L.w * C - 0.6; this.player.floorY = 0; }
        else if (pl.pos.x > L.w * C - 0.35) { pl.pos.x = 0.6; }
      }
    }
    updateExits() {
      const L = this.level, pl = this.player, C = L.cell;
      if (!this.exitDoorId) return;
      const d = L.doors.find(x => x.id === this.exitDoorId);
      if (!d || !d.open) return;
      const obj = this.world.doorObjs.get(d.id);
      const g = obj.g;
      // Kapı düzleminden dışarı taşma miktarı
      const out = g.ax ? (pl.pos.z - g.cz) * -g.nIn.z : (pl.pos.x - g.cx) * -g.nIn.x;
      const along = g.ax ? Math.abs(pl.pos.x - g.cx) : Math.abs(pl.pos.z - g.cz);
      if (along < g.width / 2 + 0.2 && out > -0.05) {
        // Kapı açıklığından geçerken sınır çarpışmasını aşmaya izin ver
        if (out > 0.45) this.exitLevel(this.exitNext);
      }
      void C;
    }
    updateGlowsticks(dt) {
      for (const gs of this.glowsticks.slice()) {
        if (gs.fly) {
          // In the air: a tumbling arc, the light travels with it; on landing it clatters and draws attention
          const fl = gs.fly; fl.t += dt;
          const k = Math.min(1, fl.t / fl.dur);
          gs.mesh.position.set(U.lerp(fl.from.x, gs.pos.x, k), U.lerp(fl.from.y, gs.pos.y, k) + Math.sin(k * Math.PI) * fl.h, U.lerp(fl.from.z, gs.pos.z, k));
          gs.mesh.rotation.x += dt * 14; gs.mesh.rotation.z += dt * 9;
          gs.light.position.set(gs.mesh.position.x, gs.mesh.position.y + 0.3, gs.mesh.position.z);
          if (k >= 1) {
            gs.fly = null; gs.mesh.position.copy(gs.pos); gs.mesh.rotation.set(0, Math.random() * 6, 0); gs.light.position.set(gs.pos.x, 0.4, gs.pos.z);
            this.audio.play('plasticTap', 3, 'sfx', { x: gs.pos.x, y: 0.1, z: gs.pos.z }, { rev: 0.35, gain: 0.9 });
            this.later(140, () => this.audio.play('plasticTap', 3, 'sfx', { x: gs.pos.x, y: 0.1, z: gs.pos.z }, { rev: 0.35, gain: 0.45, rate: 1.2 }));
            this.noise(gs.pos.x, gs.pos.z, 11);
          }
        }
        gs.t -= dt;
        gs.light.intensity = gs.t > 5 ? 5 : Math.max(0, gs.t);
        if (gs.t <= 0) { this.scene.remove(gs.mesh); this.glowsticks.splice(this.glowsticks.indexOf(gs), 1); gs.light.intensity = 0; continue; }
        for (const e of this.entities) if (e.kind === 'grinner' && e.state !== 'gone' && Math.hypot(e.pos.x - gs.pos.x, e.pos.z - gs.pos.z) < 5.5) e.dissolve();
      }
    }
    updateFear(dt) {
      const pl = this.player;
      let f = 0;
      for (const e of this.entities) {
        if (!e.hostile || ['dormant', 'wait', 'gone', 'eaten', 'flee', 'friendly', 'lurk'].includes(e.state)) continue;
        const d = e.distToPlayer();
        if (d < 24) f += (24 - d) / 24 * (e.state === 'chase' ? 26 : 9);
      }
      if (this.levelDef.theme === 'dark' && !pl.flashOn) f += 6;
      if (this.world.lightAt(pl.pos.x, pl.pos.z) < 0.15 && !pl.flashOn) f += 3;
      const target = f * PB.Settings.difficulty().fear;
      pl.fear = U.clamp(pl.fear + (target > pl.fear * 0.3 ? target * dt * 0.6 : -8 * dt), 0, 100);
      if (pl.fear > 95 && !this.flags.fearMono) { this.flags.fearMono = true; this.mono('fearHigh', 3); }
      if (pl.fear < 50) this.flags.fearMono = false;
    }
    updateMusic() {
      let chase = 0;
      for (const e of this.entities) if (e.hostile && e.state === 'chase') chase = Math.max(chase, 1 - e.distToPlayer() / 30);
      if (chase > 0) this.audio.setMusic('chase', chase);
      else if (this.audio.music.mode === 'chase') this.audio.setMusic('explore');
    }
    updatePost(dt) {
      const p = this.post.p, d = S.data, fx = this.fx;
      const def = this.levelDef || { grade: { tint: [1, 1, 1], sat: 1 } };
      p.bloomStrength.value = d.bloom ? d.bloomStrength * 0.55 : 0;
      this.post.enabled.bloom = d.bloom;
      p.exposure.value = def.exposure || ({ dark: 1.2, maze: 1.1, glitch: 1.1, yellow: 0.6, pool: 0.24, office: 0.52, concrete: 0.95, arcade: 1.05 }[def.theme] || 1);
      p.grain.value = d.grain; p.chroma.value = d.chromatic; p.vignette.value = d.vignette;
      p.brightness.value = d.brightness; p.contrast.value = d.contrast; p.saturation.value = d.saturation * (def.grade ? def.grade.sat : 1);
      const tint = def.grade ? def.grade.tint : [1, 1, 1];
      p.tint.value.set(tint[0], tint[1], tint[2]);
      fx.fear = U.damp(fx.fear, (this.state === 'play' || this.state === 'dying' ? this.player.fear / 100 : 0), 3, dt);
      p.fear.value = fx.fear * (d.reduceFlicker ? 0.5 : 1);
      fx.damage = Math.max(0, fx.damage - dt * 1.2);
      p.damage.value = fx.damage;
      fx.flash = Math.max(0, fx.flash - dt * 1.5);
      p.flash.value = d.reduceFlicker ? fx.flash * 0.3 : fx.flash;
      p.blackout.value = fx.blackout;
      let gl = 0;
      if (this.levelDef && this.levelDef.theme === 'glitch' && this.level && this.state === 'play') {
        const gx = (this.level.meta.glitchFrom || 17) * this.level.cell;
        gl = U.clamp((this.player.pos.x - gx) / 30, 0, 1) * 0.35 + 0.04;
      }
      if (this.powerT > 0) gl = Math.max(gl, 0.05);
      p.glitch.value = d.reduceFlicker ? gl * 0.4 : gl;
      p.vhs.value = d.vhs ? 1 : 0;
      // Volumetric inputs: flashlight + the dynamic fixture lights near the camera
      const fixtures = this.volFix || (this.volFix = []);
      fixtures.length = 0;
      if (this.world && this.world.pool) {
        for (const pl of this.world.pool) {
          if (!pl.fix || pl.cur < 0.05) continue;
          const c = pl.pl.color, k = pl.cur * 0.05;
          fixtures.push({ x: pl.pl.position.x, y: pl.fix.light.y - 0.05, z: pl.pl.position.z, range: pl.pl.distance || 9, r: c.r * k, g: c.g * k, b: c.b * k });
        }
      }
      if (this.world && this.world.street) { const l = this.world.street.lamp; fixtures.push({ x: l.x, y: l.y, z: l.z, range: 11, r: 0.12, g: 0.14, b: 0.2 }); }
      this.post.setLights(this.player.flash, fixtures);
      if (this.world) this.post.vol.uLvK.value = (this.postLvK || 0.03) * this.world.U.uLmIntensity.value;
      p.blur.value = this.state === 'pause' || this.state === 'map' || this.state === 'bag' || this.state === 'note' || this.state === 'keypad' || this.state === 'cabinet' ? 0.8 : 0;
      // Güç hapı: sahne hafif maviye döner
      if (this.powerT > 0) { const k = Math.min(1, this.powerT / 2); p.tint.value.set(tint[0] * (1 - 0.25 * k), tint[1] * (1 - 0.1 * k), tint[2] * (1 + 0.3 * k)); }
    }
  }

  // Maze "READY!" freeze: wrap the creature update
  const baseUpdateEntities = Game.prototype.updateEntities;
  Game.prototype.updateEntities = function (dt, frozen) {
    if (this.readyT > 0) { for (const e of this.entities) if (e.pose) e.pose(dt); else if (e.mesh && e.kind === 'pacman') { e.mesh.position.set(e.pos.x, 1.2, e.pos.z); } return; }
    return baseUpdateEntities.call(this, dt, frozen);
  };

  PB.Game = Game;

  // Açılış
  function start() {
    PB.I18N.set(PB.Settings.data.lang || 'en', false);
    if (!root.THREE) { const l = document.getElementById('boot-label'); if (l) l.textContent = PB.t('boot.noThree'); return; }
    const game = new Game();
    root.PB.game = game;
    game.boot().catch(e => { console.error(e); const l = document.getElementById('boot-label'); if (l) l.textContent = PB.t('boot.error', { msg: e.message }); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})(typeof window !== 'undefined' ? window : globalThis);
