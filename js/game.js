/* Oyun çekirdeği: açılış, durum makinesi, bölüm yükleme, eşyalar/etkileşimler, bölüm senaryoları,
   kayıt sistemi, korku, ölüm ve sonlar. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, S = PB.Settings, ST = PB.Story, P = PB.Props, T = PB.Tex;
  const SAVE_KEY = 'pb.save.v1';
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
      this.post = new PB.Post(r);
      T.init(r, S.data.anisotropy);
      this.audio = new PB.Audio();
      this.input = new PB.Input(this, canvas);
      this.ui = new PB.UI(this);
      this.player = new PB.Player(this);
      this.audio.events.on('caption', (t, dir) => this.ui.caption(t, dir));
      this.save = U.store.get(SAVE_KEY, null);
      root.addEventListener('resize', () => this.resize());
      S.events.on('change', key => this.applySetting(key));
      document.addEventListener('visibilitychange', () => { if (document.hidden && this.state === 'play') this.pause(); });
      this.resize();
      this.bindUI();
      this.ui.loading(0.02, 'Yazı tipleri yükleniyor…', U.fmtTime(0) && ST.TIPS[Math.floor(Math.random() * ST.TIPS.length)]);
      await this.loadFonts();
      await this.loadMenuScene();
      this.last = performance.now();
      r.setAnimationLoop(() => this.frame());
      this.toMenu();
    }
    async loadFonts() {
      if (!document.fonts || !document.fonts.load) return;
      const list = ['16px "Press Start 2P"', '24px "VT323"', '32px "Caveat"', '20px "Courier Prime"', 'bold 20px "Courier Prime"'];
      const sample = 'PACMAN ÇIKIŞ İŞĞÜÖÇ ğüşıöç 0123';
      try { await Promise.race([Promise.all(list.map(f => document.fonts.load(f, sample))), U.sleep(3000)]); } catch (e) { /* yazı tipleri isteğe bağlı */ }
    }
    resize() {
      const w = root.innerWidth, h = root.innerHeight;
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      const v = this.renderer.getDrawingBufferSize(new THREE.Vector2());
      const aa = S.data.antialias;
      this.post.setSize(v.x, v.y, S.data.renderScale, aa === 'msaa' || aa === 'both' ? 4 : 0);
      this.post.enabled.fxaa = aa === 'fxaa' || aa === 'both';
      if (this.ui && this.ui.isOpen('scr-map')) this.ui.drawMap(this);
    }
    applySetting(key) {
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
      this.save = { v: 1, level: 'prolog', unlocked, notes: keep('notes'), freed: [], stats: { time: 0, deaths: 0 }, cp: null, completed: !!old.completed, endings: keep('endings') };
      this.writeSave();
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
      if (!silent) this.ui.notify('Oyun kaydedildi', 'save');
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
      this.ui.loading(0.01, 'Seviye hazırlanıyor…', ST.TIPS[Math.floor(Math.random() * ST.TIPS.length)]);
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
        this.ui.loading(1, 'Yükleme hatası: ' + e.message);
        throw e;
      }
      this.scene.add(this.world.group);
      this.scene.environment = this.world.envMap;
      this.applyFog();
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
      this.script = SCRIPTS[id] || {};
      if (!opts.menu && this.script.start) this.script.start(this);
      if (opts.restore) this.applySnapshot(opts.restore);
      this.ui.loading(0.98, 'Gölgeler derleniyor…');
      await U.nextFrame();
      this.warmup();
      this.ui.loading(1, 'Hazır');
      if (opts.menu) { this.world.U.uLmIntensity.value = 1; return; }
      if (!this.save) this.newSave();
      if (!this.save.unlocked.includes(id)) this.save.unlocked.push(id);
      this.save.level = id;
      if (!opts.restore) this.checkpoint(true);
      else this.writeSave();
      this.audio.init();
      this.audio.ambience(L.theme);
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
      try { this.renderer.compile(this.scene, this.camera); this.post.render(this.scene, this.camera, 0); } catch (e) { console.warn(e); }
      for (const o of hidden) o.visible = false;
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
    glowSprite(color, size = 0.6) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: T.softDot(), color: new THREE.Color(color).multiplyScalar(1.6), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.5 }));
      s.scale.setScalar(size);
      return s;
    }
    createItems() {
      const L = this.level;
      for (const it of L.items) {
        const o = { item: it, id: it.id, type: it.type, pos: new THREE.Vector3(it.wx, it.wy || 0, it.wz), taken: false, mesh: null, marker: null, spin: false };
        this.buildItem(o);
        if (o.mesh) { o.mesh.position.copy(o.pos); if (o.baseY == null) o.baseY = o.pos.y; this.scene.add(o.mesh); }
        this.items.push(o);
        this.interactables.push({ kind: 'item', ref: o, pos: o.interactPos || o.pos, reach: o.reach || 2.3, prompt: () => (o.taken ? null : this.itemPrompt(o)), act: () => this.useItem(o), hold: () => o.hold });
      }
    }
    buildItem(o) {
      const it = o.item, t = o.type, w = this.world;
      const onWall = it.d >= 0 && (it.wy || 0) > 0.5;
      const grp = new THREE.Group();
      const add = (key, y = 0, scale = 1, rotX = 0) => { const m = this.meshFromDef(key); m.position.y = y; m.scale.setScalar(scale); m.rotation.x = rotX; grp.add(m); return m; };
      o.mesh = grp;
      if (it.yaw != null) grp.rotation.y = it.yaw;
      switch (t) {
        case 'note': case 'codeClue': case 'computer': {
          const n = ST.NOTES[it.data];
          const variant = it.prop || (t === 'computer' ? 'computer' : null);
          o.marker = t === 'codeClue' ? MARK.obj : MARK.note;
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
          } else if (n.kind === 'duvar') {
            const tex = T.decal('wallText', n.body.split('\n').filter(Boolean).slice(0, 3).join('\n'));
            const m = new THREE.MeshStandardMaterial({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, roughness: 0.9 });
            w.patch(m);
            const pl = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.8), m);
            if (!onWall) { pl.rotation.x = -Math.PI / 2; pl.position.y = 0.01; } else pl.position.z = 0.01;
            grp.add(pl);
          } else {
            const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.29), new THREE.MeshStandardMaterial({ map: T.paper(it.id, !['mektup', 'ciktı', 'duyuru'].includes(n.kind)), roughness: 0.9, side: THREE.DoubleSide }));
            w.patch(paper.material);
            if (onWall) paper.position.z = 0.012;
            else { paper.rotation.x = -Math.PI / 2; paper.position.y = 0.006; paper.rotation.z = Math.random() * 6; }
            grp.add(paper);
            const glow = this.glowSprite(0xfff0c0, 0.5); glow.position.set(0, onWall ? 0 : 0.1, onWall ? 0.1 : 0); grp.add(glow); o.glow = glow;
          }
          break;
        }
        case 'tape': { add('tape'); const g = this.glowSprite(0xff4040, 0.4); g.position.y = 0.15; grp.add(g); o.glow = g; o.marker = MARK.tape; break; }
        case 'battery': add('battery', 0.03, 2); o.spin = true; o.marker = MARK.supply; { const g = this.glowSprite(0x80d0ff, 0.45); g.position.y = 0.12; grp.add(g); o.glow = g; } break;
        case 'almond': add('almond', 0, 1.3); o.spin = true; { const g = this.glowSprite(0xfff0c0, 0.5); g.position.y = 0.2; grp.add(g); o.glow = g; } break;
        case 'glowstick': add('glowstick', 0.02, 2); o.spin = true; { const g = this.glowSprite(0x40ff70, 0.6); g.position.y = 0.05; grp.add(g); o.glow = g; } break;
        case 'flashlight': add('flashlight', 0, 1.2); { const g = this.glowSprite(0xffffff, 0.35); grp.add(g); o.glow = g; } o.marker = MARK.obj; break;
        case 'token': add('token', 0.84, 2.5); { const g = this.glowSprite(0xffd060, 0.35); g.position.y = 0.9; grp.add(g); o.glow = g; } o.marker = MARK.obj; o.pos.y = 0; break;
        case 'fuse': add('fuse', 0.03, 1.8); o.spin = true; o.marker = MARK.obj; { const g = this.glowSprite(0xffd040, 0.5); g.position.y = 0.1; grp.add(g); o.glow = g; } break;
        case 'fuelCan': add('fuelCan', 0, 1.2); o.marker = MARK.obj; { const g = this.glowSprite(0xff8030, 0.6); g.position.y = 0.3; grp.add(g); o.glow = g; } break;
        case 'keycard': add('keycard', 0, 2.5); o.spin = true; o.marker = MARK.obj; { const g = this.glowSprite(0x60a0ff, 0.4); g.position.y = 0.1; grp.add(g); o.glow = g; } o.pos.y = 0.8; { const tbl = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.78, 0.6), w.mat('darkMetal')); tbl.position.y = -0.39; grp.add(tbl); } break;
        case 'memento': {
          const key = { bulent: 'watch', inci: 'glasses', pinar: 'walkman', cemil: 'lighter' }[it.data] || 'watch';
          add(key, 0.03, 2.2); o.spin = true; o.marker = ST.CHAR[it.data] ? ST.CHAR[it.data].color : MARK.shrine;
          const g = this.glowSprite(ST.CHAR[it.data] ? ST.CHAR[it.data].color : '#ffffff', 0.8); g.position.y = 0.12; grp.add(g); o.glow = g;
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
          const col = ST.CHAR[it.data] ? ST.CHAR[it.data].color : '#ffffff';
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
        case 'specialCabinet': case 'freeCabinet': o.mesh = null; o.marker = t === 'specialCabinet' ? MARK.obj : null; o.pos.y = 1.2; o.reach = 2.2; break;
        default: break;
      }
    }
    itemPrompt(o) {
      const t = o.type, it = o.item;
      if (o.hiddenUntil && !this.flags[o.hiddenUntil]) return null;
      if (this.script.prompt) { const p = this.script.prompt(this, o); if (p !== undefined) return p; }
      switch (t) {
        case 'note': case 'codeClue': { const n = ST.NOTES[it.data]; return n.kind === 'duvar' ? 'Yazıyı oku' : n.kind === 'ekran' ? 'Ekrana bak' : 'Oku: ' + n.title; }
        case 'computer': return 'Ekrana bak';
        case 'tape': return 'Kaseti dinle (oyunu kaydeder)';
        case 'battery': return 'Pil al';
        case 'almond': return 'Badem suyu al';
        case 'glowstick': return 'Işık çubuğu al';
        case 'flashlight': return 'Feneri al';
        case 'token': return 'Jetonu al';
        case 'fuse': return 'Sigortayı al';
        case 'fuelCan': return 'Mazot bidonunu al';
        case 'keycard': return 'Güvenlik kartını al';
        case 'memento': return 'Al: ' + mementoName(it.data);
        case 'powerPellet': return 'Güç hapını yut';
        case 'phone': return o.ringing ? 'Telefonu aç' : 'Ahizeyi kaldır';
        case 'freeCabinet': return 'Kabinde oyna (BEDAVA)';
        default: return null;
      }
    }
    useItem(o) {
      if (o.taken) return;
      if (this.script.use && this.script.use(this, o)) return;
      const t = o.type, it = o.item;
      switch (t) {
        case 'note': case 'codeClue': case 'computer': this.readNote(it.data, () => { if (t === 'codeClue' && this.script.clue) this.script.clue(this, o); }); break;
        case 'tape': this.readNote(it.data); this.checkpoint(); if (this.audio.ctx) { this.audio.loop('tape', 'tape', null, { bus: 'sfx', gain: 0.3, rev: 0 }); } break;
        case 'battery':
          this.takeItem(o);
          if (this.player.battery < 70) { this.player.battery = Math.min(100, this.player.battery + 50); this.ui.notify('Fenere yeni pil taktın'); }
          else { this.inv.batteries = Math.min(4, this.inv.batteries + 1); this.ui.notify('Yedek pil'); }
          this.audio.pickup();
          break;
        case 'almond': this.takeItem(o); this.inv.almond = Math.min(3, this.inv.almond + 1); this.audio.pickup(); this.ui.notify('Badem suyu (Q ile iç)'); break;
        case 'glowstick': this.takeItem(o); this.inv.glow = Math.min(6, this.inv.glow + 1); this.audio.pickup(); this.ui.notify('Işık çubuğu (G ile at)'); break;
        case 'memento': this.takeItem(o); this.inv.memento = it.data; this.audio.pickup('key'); this.ui.notify(mementoName(it.data) + ' bulundu', 'key'); this.ui.subtitle(mementoLine(it.data), 5); break;
        case 'phone': this.answerPhone(o); break;
        case 'freeCabinet': this.enterCabinet(); break;
        default: break;
      }
      this.updateInventoryUI();
    }
    takeItem(o, silent) {
      o.taken = true;
      if (o.mesh) this.scene.remove(o.mesh);
      if (o.light) o.light.intensity = 0;
    }
    readNote(id, after) {
      if (!ST.NOTES[id]) return;
      if (this.save && !this.save.notes.includes(id)) { this.save.notes.push(id); this.writeSave(); this.ui.notify('Arşive eklendi: ' + ST.NOTES[id].title, 'note'); }
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
    answerPhone(o) {
      o.ringing = false;
      this.audio.stopLoop('phone:' + o.id, 0.1);
      this.audio.click();
      this.readNote(o.item.data);
    }
    updateInventoryUI() {
      const keys = [];
      const inv = this.inv || {};
      if (inv.officeKey) keys.push('OFİS ANAHTARI');
      if (inv.token) keys.push('ÖZEL JETON');
      if (inv.fuses) keys.push(`SİGORTA ×${inv.fuses}`);
      if (inv.fuel) keys.push(`MAZOT ×${inv.fuel}`);
      if (inv.keycard) keys.push('GÜVENLİK KARTI');
      if (inv.memento) keys.push(mementoName(inv.memento).toUpperCase());
      if (inv.pellets && this.levelDef && this.levelDef.id === 'l0' && !this.flags.exitOpen) keys.push(`GÜÇ HAPI ×${inv.pellets}`);
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
            if (door.locked) return (door.name || 'Kapı') + ' (kilitli)';
            if (['exit', 'elevator', 'stair'].includes(door.kind)) return null;
            return door.open ? 'Kapıyı kapat' : 'Kapıyı aç';
          },
          act: () => {
            if (door.locked) { this.ui.hint(door.lockMsg || 'Kilitli.'); this.audio.door('locked', pos); if (this.script.lockedDoor) this.script.lockedDoor(this, door); return; }
            if (['exit', 'elevator', 'stair', 'house'].includes(door.kind)) return;
            if (door.open) { this.world.closeDoor(door.id); this.audio.door(door.kind, pos, false); }
            else { this.world.openDoor(door.id, this.player.pos.x, this.player.pos.z); this.audio.door(door.kind, pos, true); this.noise(pos.x, pos.z, 8); }
            this.nav.dirty = true;
          },
        });
      }
    }
    createHideSpots() {
      for (const p of this.level.props) {
        if (!p.hide) continue;
        const along = p.type === 'cubicleDesk';
        const faceYaw = p.type === 'cubicleDesk' ? (p.rot === 0 ? -Math.PI / 2 : Math.PI / 2) : (p.rot === 0 ? Math.PI : 0);
        void along;
        const pos = new THREE.Vector3(p.x, 0.6, p.z);
        this.interactables.push({
          kind: 'hide', ref: p, pos, reach: 2.0,
          prompt: () => this.player.hidden ? (this.player.hidden.spot === p ? 'Saklandığın yerden çık' : null) : 'Masanın altına saklan',
          act: () => {
            if (this.player.hidden) { this.player.unhide(); return; }
            const watching = this.entities.filter(e => e.hostile && e.state === 'chase' && e.losToPlayer() && e.distToPlayer() < 14);
            for (const e of this.entities) e.sawHide = watching.includes(e);
            this.player.hide({ x: p.x, z: p.z, yaw: faceYaw, eye: 0.62 });
            this.ui.subtitle(ST.MONO.hide, 2.5);
          },
        });
      }
    }
    createEntities() {
      const L = this.level, def = this.levelDef, E = PB.Entities;
      const spawnFar = (minD) => {
        const dist = L.bfs(L.spawn.x, L.spawn.y, 'nav');
        const cands = [];
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
            const ch = E.GHOST[e.ghost].name;
            const friendly = this.save && this.save.freed.includes(ch);
            ent = new E.Ghost(this, Object.assign({}, e, { friendly }));
            created.add(e.ghost);
            if (maze) { const spots = [[pad + 11, 11], [pad + 16, 11], [pad + 11, 17], [pad + 16, 17]]; const s = spots[['blinky', 'pinky', 'inky', 'clyde'].indexOf(e.ghost)]; ent.placeCell(s[0], s[1]); }
            else if (friendly) ent.placeCell(L.spawn.x, L.spawn.y);
            else { const c = spawnFar(e.ghost === 'clyde' ? 14 : 18); ent.placeCell(c.x, c.y); }
          } else if (e.type === 'grinner') { ent = new E.Grinner(this, e); const c = spawnFar(12); ent.placeCell(c.x, c.y); }
          else if (e.type === 'watcher') { ent = new E.Watcher(this, e); ent.placeCell(L.spawn.x, L.spawn.y); }
          if (ent) this.entities.push(ent);
        }
      }
      // Önceki bölümlerde kurtarılan hayaletler sana eşlik eder
      if (this.save) for (const ch of this.save.freed) {
        const gname = ST.CHAR[ch] && ST.CHAR[ch].ghost;
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
        const d = Math.hypot(dx, dy, dz);
        if (d > (it.reach || 2.3)) continue;
        const text = it.prompt();
        if (!text) continue;
        const dot = (dx * fwd.x + dy * fwd.y + dz * fwd.z) / Math.max(d, 1e-3);
        const hd = Math.hypot(dx, dz);
        if (dot < (hd < 0.9 ? 0.2 : 0.82)) continue;
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
      if (this.input.pressed('interact')) {
        if (pl.hidden && (!tgt || tgt.it.kind !== 'hide')) { pl.unhide(); return; }
        if (!tgt) return;
        if (holdLen > 0 && (tgt.it.ref && this.canHold(tgt.it))) { this.holding = { it: tgt.it, t: 0 }; if (this.script.holdStart) this.script.holdStart(this, tgt.it.ref); return; }
        tgt.it.act();
      }
    }
    canHold(it) { return !this.script.canHold || this.script.canHold(this, it.ref); }
    noise(x, z, radius) { for (const e of this.entities) e.hear(x, z, radius); }
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
        const mono = { pacman: this.levelDef.id === 'l0' ? 'l0_pacmanSeen' : null, blinky: 'l1_blinkySeen', pinky: 'l3_pinkySeen', inky: 'l2_inkySeen' }[key];
        if (mono && ST.MONO[mono]) this.ui.subtitle(ST.MONO[mono], 4);
      }
    }
    onClydeSeen() {
      if (!this.spottedOnce.clyde) { this.spottedOnce.clyde = true; this.ui.subtitle(ST.MONO.l4_clydeSeen, 4); this.audio.stinger('spot'); }
    }
    onWatcherSeen() {
      if (!this.spottedOnce.watcher) { this.spottedOnce.watcher = true; this.ui.subtitle('Uzakta, uzun ve kapkara bir şey duruyor. Başı bir yana eğik. Sayıyor.', 5); }
      this.audio.stinger('spot');
    }
    onGhostEaten(g) {
      this.audio.pickup('pellet');
      this.ui.notify(ST.CHAR[g.cfg.name].name + ' geri çekildi', 'key');
      this.mazeScore += 200;
    }
    fearAdd(v) { this.player.fear = U.clamp(this.player.fear + v * PB.Settings.difficulty().fear, 0, 100); }
    killPlayer(ent) {
      if (this.state !== 'play') return;
      const dif = S.data.difficulty;
      if (dif === 'kolay' && !this.graceUsed) {
        this.graceUsed = true;
        this.player.fear = 100;
        this.fx.damage = 1;
        this.player.addTrauma(0.8);
        this.audio.stinger('spot');
        if (ent.kind === 'pacman') { ent.frozenT = 6; ent.setState('stunned'); }
        else if (ent.kind === 'ghost') { if (ent.type === 'clyde') ent.retreat(); else { ent.setState('eaten'); ent.eatenT = 8; } }
        else if (ent.kind === 'grinner') ent.dissolve();
        else if (ent.kind === 'watcher') ent.vanish();
        this.ui.hint('Kıl payı kurtuldun! (Kolay mod: bu bölümde bir kez)');
        return;
      }
      this.state = 'dying';
      this.dyingT = 0;
      this.killer = ent;
      this.player.frozen = true;
      this.player.unhide();
      this.audio.stinger(S.data.jumpscare === 'tam' ? 'jump' : 'spot');
      this.audio.setMusic('none');
      this.save.stats.deaths++;
      this.writeSave();
      this.fx.damage = 1;
      this.player.addTrauma(S.data.jumpscare === 'tam' ? 1 : 0.4);
    }
    updateDying(dt) {
      this.dyingT += dt;
      const k = this.killer, pl = this.player;
      if (k) {
        const a = Math.atan2(k.pos.x - pl.pos.x, k.pos.z - pl.pos.z);
        pl.yaw = U.angleDamp(pl.yaw, a + Math.PI, 10, dt);
        pl.pitch = U.damp(pl.pitch, k.kind === 'watcher' ? 0.35 : 0.05, 8, dt);
        if (S.data.jumpscare === 'tam' && this.dyingT < 0.7) {
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
      if (this.classic.score >= 10000 && !this.flags.cabinetHi) { this.flags.cabinetHi = true; this.ui.notify('Rekor tablosuna adın yazıldı: DNZ', 'key'); }
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
      if (this.inv.glow <= 0) { this.ui.hint('Işık çubuğun yok.'); return; }
      this.inv.glow--;
      const pl = this.player;
      const f = pl.forward();
      const pos = new THREE.Vector3(pl.pos.x + f.x * 1.6, 0.05, pl.pos.z + f.z * 1.6);
      const cand = { x: pos.x, z: pos.z };
      this.world.collide(cand, 0.1);
      pos.x = cand.x; pos.z = cand.z;
      const mesh = this.meshFromDef('glowstick');
      mesh.position.copy(pos);
      mesh.rotation.y = Math.random() * 6;
      this.scene.add(mesh);
      const light = this.glowPool.find(l => l.intensity === 0) || this.glowPool[0];
      light.position.set(pos.x, 0.4, pos.z);
      light.intensity = 5;
      const gs = { pos, mesh, light, t: 75 };
      const old = this.glowsticks.find(g => g.light === light);
      if (old) { this.scene.remove(old.mesh); this.glowsticks.splice(this.glowsticks.indexOf(old), 1); }
      this.glowsticks.push(gs);
      this.audio.click();
      this.updateInventoryUI();
    }
    drinkAlmond() {
      if (this.inv.almond <= 0) { this.ui.hint('Badem suyun yok.'); return; }
      this.inv.almond--;
      this.player.fear = Math.max(0, this.player.fear - 50);
      this.player.stamina = 100; this.player.exhausted = false;
      this.audio.pickup();
      this.ui.notify('Badem suyu içtin. Nefesin düzeldi.');
      this.updateInventoryUI();
    }
    setObj(key, n) {
      this.objKey = key; this.objN = n;
      this.refreshObjective();
    }
    refreshObjective() {
      if (!this.objKey) { this.ui.setObjective(''); return; }
      let text = (ST.OBJ[this.objKey] || '').replace('{n}', this.objN != null ? this.objN : '');
      this.ui.setObjective(text);
    }
    completeStep() { this.objectivesDone++; this.safeCheckpoint(); }
    exitLevel(next) {
      if (this.state !== 'play' || this.exiting) return;
      this.exiting = true;
      this.player.frozen = true;
      this.fadeTo(1, 1.4, () => {
        this.exiting = false;
        this.player.frozen = false;
        if (next === 'ending-exit') return this.ending('exit');
        if (next === 'ending-plug') return this.ending('plug');
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
      this.ui.showEnding(kind, { time: this.playTime, deaths: this.save.stats.deaths, notes: this.save.notes.length, freed: this.save.freed.length }, () => this.toMenu());
    }
    freeGhost(ch) {
      if (!this.save.freed.includes(ch)) this.save.freed.push(ch);
      this.inv.memento = null;
      const gname = ST.CHAR[ch].ghost;
      const g = this.entities.find(e => e.kind === 'ghost' && e.type === gname);
      if (g) g.makeFriendly();
      this.audio.door('house');
      this.fx.flash = 0.6;
      const lines = {
        bulent: ['Bülent: "…03:17. Saatim durmuş. Ben hiç durmamışım ki."', 'Bülent: "Cemil’i zorla getirdim. Hepsini ben… Git. Seni kovalamayacağım artık."'],
        inci: ['İnci: "Gözlüğüm! Her şey… netleşti."', 'İnci: "Artık emin olmak için beklemeyeceğim. Seninle geliyorum."'],
        pinar: ['Pınar: "Kasetim. B yüzü hâlâ boş."', 'Pınar: "Bu sefer önüne geçmeyeceğim. Yanında yürüyeceğim."'],
        cemil: ['Cemil: "Dedemin çakmağı…" (Çakmağı yakıyor. Yüzünü ilk defa görüyorsun: bir çocuk.)', 'Cemil: "Bana bakabilirsin artık. Korkmuyorum."'],
      }[ch];
      this.ui.subtitle(lines[0], 5);
      this.later(5200, () => this.ui.subtitle(lines[1], 5));
      this.ui.notify(ST.CHAR[ch].name + ' özgür', 'key');
      this.updateInventoryUI();
      this.checkpoint(true);
    }

    // Uzun süre düşük kare hızı: bir kez, ayarları öneren bir bildirim
    checkPerf(fps) {
      if (this.perfHinted || this.state !== 'play' || document.hidden) return;
      this.slowT = fps < 24 ? (this.slowT || 0) + 0.5 : Math.max(0, (this.slowT || 0) - 1);
      if (this.slowT < 12) return;
      this.perfHinted = true;
      if (S.data.preset === 'dusuk' && S.data.renderScale <= 0.6) return;
      this.ui.notify('Oyun yavaş çalışıyor. Duraklat › Ayarlar › Grafik’ten kaliteyi düşürebilirsin.');
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
        case 'play': this.updatePlay(dt); break;
        case 'dying': this.updateDying(dt); this.updateEntities(dt, true); break;
        case 'menu': this.updateMenu(dt); break;
        case 'note':
          if (inp.pressed('interact') || inp.pressed('pause')) { if (this.ui.finishType && this.ui.$('note-paper').querySelector('.caret')) this.ui.finishType(); else $('note-close').click(); }
          break;
        case 'map': if (inp.pressed('map') || inp.pressed('pause')) this.closeMap(); break;
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
      this.updatePost(dt);
      this.post.render(this.scene, this.camera, this.time);
      inp.endFrame();
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
      this.updateItems(dt);
      this.updateInteraction(dt);
      this.updatePortals();
      this.updateExits();
      this.updateGlowsticks(dt);
      if (pl.battery <= 0 && this.inv.batteries > 0) { this.inv.batteries--; pl.battery = 100; this.ui.notify('Yedek pili taktın'); this.updateInventoryUI(); }
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
        if (o.glow) o.glow.material.opacity = 0.35 + Math.sin(t * 3 + o.pos.z) * 0.15;
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
      if (pl.fear > 95 && !this.flags.fearMono) { this.flags.fearMono = true; this.ui.subtitle(ST.MONO.fearHigh, 3); }
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
      p.blur.value = this.state === 'pause' || this.state === 'map' || this.state === 'note' || this.state === 'keypad' || this.state === 'cabinet' ? 0.8 : 0;
      // Güç hapı: sahne hafif maviye döner
      if (this.powerT > 0) { const k = Math.min(1, this.powerT / 2); p.tint.value.set(tint[0] * (1 - 0.25 * k), tint[1] * (1 - 0.1 * k), tint[2] * (1 + 0.3 * k)); }
    }
  }

  // ================================================================ YARDIMCI METİNLER
  function mementoName(ch) { return { bulent: 'Bülent’in saati', inci: 'İnci’nin gözlüğü', pinar: 'Pınar’ın walkman’i', cemil: 'Cemil’in çakmağı' }[ch] || 'Eşya'; }
  function mementoLine(ch) {
    return {
      bulent: 'Camı çatlak bir kol saati. Akrep ve yelkovan 03:17’de donmuş.',
      inci: 'Kalın çerçeveli bir gözlük. Camları buğulu, sanki biri az önce nefes almış.',
      pinar: 'Pembe bir walkman. İçinde "NİSAN 87" yazılı bir kaset. B yüzü boş.',
      cemil: 'Eski bir benzin çakmağı. Üstüne kazınmış: "Torunum Cemil’e".',
    }[ch] || '';
  }

  // ================================================================ BÖLÜM SENARYOLARI
  const SCRIPTS = {};
  const itemOf = (g, type) => g.items.find(i => i.type === type);
  const exitDoorOf = g => g.level.meta.exit ? g.level.doors.find(d => d.id === g.level.meta.exit.door) : null;
  const openExit = (g, next, doorId) => {
    const d = doorId ? g.level.doors.find(x => x.id === doorId) : exitDoorOf(g);
    if (!d) return;
    d.locked = false;
    g.world.openDoor(d.id);
    const obj = g.world.doorObjs.get(d.id);
    g.audio.door(d.kind, obj ? new THREE.Vector3(obj.g.cx, 1.2, obj.g.cz) : null, true);
    g.exitDoorId = d.id; g.exitNext = next;
    g.nav.dirty = true;
  };
  const shrineUse = (g, o, ch) => {
    if (o.type !== 'shrine') return false;
    if (g.save.freed.includes(ch)) { g.ui.hint('Sunak sessiz. Mum yanmaya devam ediyor.'); return true; }
    if (g.inv.memento === ch) { g.freeGhost(ch); if (o.light) o.light.intensity = 6; return true; }
    g.ui.subtitle(`Küçük bir sunak. Çerçevede ${ST.CHAR[ch].name}’in fotoğrafı. Burada bir şey eksik.`, 4);
    return true;
  };
  const shrinePrompt = (g, o, ch) => o.type === 'shrine' ? (g.save.freed.includes(ch) ? null : g.inv.memento === ch ? 'Eşyayı sunağa bırak' : 'Sunağa bak') : undefined;
  const wakePac = (g, near) => { if (g.pacman && g.pacman.state === 'dormant') { g.pacman.wake(near); g.flags.pacAwake = true; g.ui.subtitle(ST.MONO.l0_pacmanHeard, 4); } };

  SCRIPTS.prolog = {
    start(g) {
      g.player.hasFlashlight = false;
      g.setObj('p_flash');
    },
    afterCard(g) { g.ui.subtitle(ST.MONO.prolog_start, 5); },
    restore(g) { this.refresh(g); },
    refresh(g) {
      if (!g.player.hasFlashlight) g.setObj('p_flash');
      else if (!g.flags.power) g.setObj('p_power');
      else if (!g.inv.officeKey && !g.flags.officeOpen) g.setObj('p_key');
      else if (!g.inv.token) g.setObj(g.flags.inOffice ? 'p_token' : 'p_office');
      else g.setObj('p_insert');
      if (g.flags.power && !g.world.zonesOn.has(1)) g.world.setZone(1, true);
    },
    prompt(g, o) {
      if (o.type === 'fuseBox') return g.flags.power ? null : 'Ana şalteri kaldır';
      if (o.type === 'register') return g.flags.power ? (g.flags.registerOpen ? null : 'Yazar kasayı aç') : 'Yazar kasa';
      if (o.type === 'specialCabinet') return g.inv.token ? 'Özel jetonu at' : '7 numaralı kabini incele';
      return undefined;
    },
    use(g, o) {
      switch (o.type) {
        case 'flashlight':
          g.takeItem(o); g.player.hasFlashlight = true; g.player.battery = 70; g.player.toggleFlash(true);
          g.audio.pickup(); g.ui.subtitle(ST.MONO.prolog_flash, 4); g.ui.hint('F ile feneri aç/kapat.');
          g.setObj('p_power'); g.completeStep();
          return true;
        case 'fuseBox':
          if (g.flags.power) return true;
          g.flags.power = true;
          g.audio.mech('breaker', o.pos);
          g.world.setZone(1, true);
          g.fx.flash = 0.25;
          g.ui.subtitle(ST.MONO.prolog_power, 4);
          g.setObj('p_key'); g.completeStep();
          // Vitrinin dışında bir an görünen uzun gölge
          g.later(9000, () => { if (g.state === 'play') g.ui.subtitle('…Camın dışında biri mi vardı?', 3); });
          return true;
        case 'register':
          if (!g.flags.power) { g.ui.hint('Yazar kasa elektriksiz. Çekmecesi kilitli.'); return true; }
          if (g.flags.registerOpen) return true;
          g.flags.registerOpen = true; g.inv.officeKey = true;
          const door = g.level.doors.find(d => d.id === 'officeDoor'); if (door) door.locked = false;
          g.audio.mech('coin', o.pos); g.audio.pickup('key');
          g.ui.subtitle(ST.MONO.prolog_register, 4);
          g.setObj('p_office'); g.completeStep(); g.updateInventoryUI();
          return true;
        case 'token':
          g.takeItem(o); g.inv.token = true; g.audio.pickup('key');
          g.ui.subtitle(ST.MONO.prolog_token, 4);
          g.setObj('p_insert'); g.completeStep(); g.updateInventoryUI();
          return true;
        case 'specialCabinet':
          if (!g.inv.token) { g.ui.subtitle(ST.MONO.prolog_cabinet, 4); return true; }
          this.insertToken(g, o);
          return true;
      }
      return false;
    },
    insertToken(g) {
      g.inv.token = false; g.updateInventoryUI();
      g.audio.mech('coin');
      g.player.frozen = true;
      const scr = PB.Tex.cabinetScreens.special;
      if (scr) { scr.text = 'SEVİYE 256'; scr.sub = 'OYUNCU 2 HAZIR'; scr.dirty = true; }
      g.ui.subtitle('Ekranın sağ yarısı harflerle doluyor. Ekran… büyüyor.', 4);
      let k = 0;
      const iv = setInterval(() => {
        k++;
        g.fx.flash = 0.35; g.player.addTrauma(0.35);
        g.world.U.uLmIntensity.value = k % 2 ? 0.1 : 1;
        if (k === 3) g.audio.stinger('spot');
        if (k >= 7) { clearInterval(iv); g.world.U.uLmIntensity.value = 1; g.player.frozen = false; g.whenPlaying(() => g.exitLevel('l0')); }
      }, 420);
    },
    update(g) {
      if (!g.flags.inOffice && g.level.cellOf(g.player.pos.x, g.player.pos.z).x >= 10 && g.level.cellOf(g.player.pos.x, g.player.pos.z).y <= 2) {
        g.flags.inOffice = true; g.flags.officeOpen = true;
        if (!g.inv.token) g.setObj('p_token');
      }
    },
  };

  SCRIPTS.l0 = {
    start(g) { g.setObj('l0_explore'); },
    afterCard(g) { g.ui.subtitle(ST.MONO.l0_start, 5); },
    restore(g) { this.refresh(g); },
    refresh(g) {
      if (g.flags.exitOpen) { openExit(g, 'l1'); g.setObj('l0_leave'); }
      else if (g.inv.pellets >= 4) g.setObj('l0_insert');
      else if (g.flags.exitSeen || g.inv.pellets > 0) g.setObj('l0_pellets', g.inv.pellets);
      else g.setObj('l0_explore');
      const panel = itemOf(g, 'exitPanel');
      if (panel && g.flags.exitOpen) panel.sockets.forEach(s => s.material.color.setRGB(5, 3.4, 3));
    },
    prompt(g, o) {
      if (o.type === 'exitPanel') return g.flags.exitOpen ? null : g.inv.pellets >= 4 ? 'Hapları yuvalara yerleştir' : `Dört yuva (${g.inv.pellets}/4 hap)`;
      return undefined;
    },
    use(g, o) {
      if (o.type === 'powerPellet') {
        g.takeItem(o); g.inv.pellets++;
        g.powerT = 8; g.audio.pickup('pellet'); g.fx.flash = 0.3;
        if (g.inv.pellets === 1) { g.ui.subtitle(ST.MONO.l0_firstPellet, 5); g.later(6000, () => wakePac(g, false)); }
        if (g.inv.pellets === 4) { g.ui.subtitle(ST.MONO.l0_allPellets, 3); g.setObj('l0_insert'); }
        else g.setObj('l0_pellets', g.inv.pellets);
        g.completeStep(); g.updateInventoryUI();
        return true;
      }
      if (o.type === 'exitPanel') {
        if (g.flags.exitOpen) return true;
        if (g.inv.pellets < 4) { g.ui.subtitle(ST.MONO.l0_exitSeen, 4); g.flags.exitSeen = true; if (!g.inv.pellets) g.setObj('l0_pellets', 0); return true; }
        g.flags.exitOpen = true;
        o.sockets.forEach((s, k) => g.later(k * 350, () => { s.material.color.setRGB(5, 3.4, 3); g.audio.beep(); }));
        g.later(1600, () => { openExit(g, 'l1'); g.setObj('l0_leave'); g.completeStep(); });
        g.updateInventoryUI();
        return true;
      }
      return false;
    },
    update(g) {
      if (!g.flags.exitSeen) {
        const d = exitDoorOf(g);
        if (d) {
          const obj = g.world.doorObjs.get(d.id);
          const p = g.player.pos;
          if (Math.hypot(p.x - obj.g.cx, p.z - obj.g.cz) < 9 && g.level.los(p.x, p.z, obj.g.cx + obj.g.nIn.x * 0.3, obj.g.cz + obj.g.nIn.z * 0.3)) {
            g.flags.exitSeen = true; g.ui.subtitle(ST.MONO.l0_exitSeen, 5);
            if (g.inv.pellets < 4) g.setObj('l0_pellets', g.inv.pellets);
          }
        }
      }
      // İki haptan sonra Yutucu avlanmaya başlar
      if (g.pacman) g.pacman.huntBias = g.inv.pellets >= 2;
    },
  };

  SCRIPTS.l1 = {
    start(g) { g.setObj('l1_fuses', 0); },
    afterCard(g) { g.ui.subtitle(ST.MONO.l1_start, 4); },
    restore(g) {
      if (g.flags.elevatorReady) { openExit(g, 'l2'); g.setObj('l1_leave'); }
      else if (g.flags.panelDone) { g.flags.waitT = 12; g.setObj('l1_wait', 12); }
      else if (g.inv.fuses >= 3) g.setObj('l1_panel');
      else g.setObj('l1_fuses', g.inv.fuses);
    },
    prompt(g, o) {
      if (o.type === 'fusePanel') return g.flags.panelDone ? null : g.inv.fuses >= 3 ? 'Sigortaları tak' : `Sigorta panosu (${g.inv.fuses}/3)`;
      return shrinePrompt(g, o, 'bulent');
    },
    use(g, o) {
      if (o.type === 'fuse') {
        g.takeItem(o); g.inv.fuses++; g.audio.pickup();
        g.ui.subtitle(ST.MONO.l1_fuse, 2);
        if (g.inv.fuses >= 2) wakePac(g, false);
        g.setObj(g.inv.fuses >= 3 ? 'l1_panel' : 'l1_fuses', g.inv.fuses);
        g.completeStep(); g.updateInventoryUI();
        return true;
      }
      if (o.type === 'fusePanel') {
        if (g.flags.panelDone) return true;
        if (g.inv.fuses < 3) { g.ui.hint('Panoda üç boş yuva var.'); return true; }
        g.flags.panelDone = true;
        o.slots.forEach((s, k) => g.later(k * 400, () => { s.material.color.setRGB(0.8, 0.6, 0.3); g.audio.mech('fuse', o.pos); }));
        g.later(1400, () => { o.lamp.material.color.setRGB(0.2, 3, 0.4); g.audio.mech('breaker', o.pos); });
        g.inv.fuses = 0; g.updateInventoryUI();
        g.flags.waitT = 30;
        g.setObj('l1_wait', 30);
        g.ui.subtitle(ST.MONO.l1_elevator, 4);
        g.noise(o.pos.x, o.pos.z, 60);
        g.audio.loop('elevatorHum', 'elevator', { x: o.pos.x, y: 2, z: o.pos.z }, { bus: 'sfx', gain: 0.4 });
        g.completeStep();
        return true;
      }
      return shrineUse(g, o, 'bulent');
    },
    update(g, dt) {
      if (g.flags.panelDone && !g.flags.elevatorReady) {
        g.flags.waitT -= dt;
        g.setObj('l1_wait', Math.max(0, Math.ceil(g.flags.waitT)));
        if (g.flags.waitT <= 0) { g.flags.elevatorReady = true; g.audio.stopLoop('elevatorHum'); openExit(g, 'l2'); g.setObj('l1_leave'); g.completeStep(); }
      }
    },
  };

  SCRIPTS.l2 = {
    start(g) { g.setObj('l2_valves', 0); g.flags.valves = 0; },
    afterCard(g) { g.ui.subtitle(ST.MONO.l2_start, 4); },
    restore(g) {
      for (const it of g.items) if (it.type === 'valve' && g.flags['v_' + it.id]) it.done = true;
      if (g.flags.drained) { g.drainPools(true); g.setObj('l2_hatch'); }
      else if (g.flags.valves >= 4) { g.flags.drainT = 5; g.setObj('l2_drain'); }
      else g.setObj('l2_valves', g.flags.valves || 0);
    },
    prompt(g, o) {
      if (o.type === 'valve') return o.done ? null : 'Vanayı çevir (basılı tut)';
      if (o.type === 'drain') return g.flags.drained ? 'Kapağı aç ve aşağı in' : null;
      return shrinePrompt(g, o, 'inci');
    },
    holdStart(g, o) { if (o && o.type === 'valve') { g.audio.mech('valve', o.pos); g.noise(o.pos.x, o.pos.z, 22); } },
    use(g, o) {
      if (o.type === 'valve') {
        if (o.done) return true;
        o.done = true; g.flags['v_' + o.id] = true;
        g.flags.valves = (g.flags.valves || 0) + 1;
        if (o.wheel) o.wheel.rotation.z += 3;
        g.ui.subtitle(ST.MONO.l2_valve, 2.5);
        if (g.flags.valves >= 3) wakePac(g, false);
        if (g.flags.valves >= 4) { g.setObj('l2_drain'); g.flags.drainT = 20; g.drainPools(false); g.audio.mech('drain', itemOf(g, 'drain').pos); g.noise(itemOf(g, 'drain').pos.x, itemOf(g, 'drain').pos.z, 40); }
        else g.setObj('l2_valves', g.flags.valves);
        g.completeStep();
        return true;
      }
      if (o.type === 'drain') {
        if (!g.flags.drained) return true;
        g.audio.door('metal', o.pos, true);
        g.exitLevel('l3');
        return true;
      }
      return shrineUse(g, o, 'inci');
    },
    update(g, dt) {
      if (g.flags.valves >= 4 && !g.flags.drained) {
        g.flags.drainT -= dt;
        if (g.flags.drainT <= 0) { g.flags.drained = true; g.world.drained = true; g.ui.subtitle(ST.MONO.l2_drained, 4); g.setObj('l2_hatch'); g.completeStep(); }
      }
      // Mavi, sudaki adımları çok daha iyi duyar
      const ink = g.entities.find(e => e.type === 'inky');
      if (ink) ink.hearMul = g.player.surface() === 'water' ? 2.4 : 1.1;
    },
  };

  SCRIPTS.l3 = {
    start(g) {
      g.setObj('l3_code', 0); g.flags.digits = 0;
      const ph = g.items.find(i => i.id === 'phone1');
      if (ph) this.ring(g, ph);
    },
    afterCard(g) { g.ui.subtitle(ST.MONO.l3_start, 4); },
    ring(g, ph) {
      if (ph.ringing || ph.answered) return;
      ph.ringing = true;
      g.audio.loop('phone:' + ph.id, 'phone', { x: ph.pos.x, y: 1, z: ph.pos.z }, { bus: 'sfx', gain: 0.5, ref: 3 });
      g.audio.caption('phone', '[bir telefon çalıyor]', ph.pos, 20);
    },
    restore(g) {
      if (g.flags.stairOpen) { openExit(g, 'l4', 'stairDoor'); g.setObj('l3_stairs'); }
      else if (g.inv.keycard) g.setObj('l3_stairs');
      else if (g.flags.securityOpen) { g.setObj('l3_card'); }
      else if ((g.flags.digits || 0) >= 4) g.setObj('l3_keypad');
      else g.setObj('l3_code', g.flags.digits || 0);
      if (g.flags.securityOpen) { const d = g.level.doors.find(x => x.id === 'securityDoor'); if (d) { d.locked = false; g.world.openDoor(d.id); } }
    },
    clue(g, o) {
      if (o.clueDone) return;
      o.clueDone = true;
      g.flags['c_' + o.id] = true;
      g.flags.digits = (g.flags.digits || 0) + 1;
      if (g.flags.digits >= 4) { g.setObj('l3_keypad'); g.ui.subtitle(ST.MONO.l3_code, 4); }
      else g.setObj('l3_code', g.flags.digits);
      if (g.flags.digits === 2) { const ph = g.items.find(i => i.id === 'phone2'); if (ph) this.ring(g, ph); }
      g.completeStep();
    },
    prompt(g, o) {
      if (o.type === 'keypad') return g.flags.securityOpen ? null : 'Şifreyi gir';
      if (o.type === 'cardReader') return g.flags.stairOpen ? null : g.inv.keycard ? 'Kartı okut' : 'Kart okuyucu (kırmızı)';
      if (o.type === 'phone') { if (o.answered) return null; return o.ringing ? 'Telefonu aç' : 'Ahizeyi kaldır'; }
      return shrinePrompt(g, o, 'pinar');
    },
    use(g, o) {
      if (o.type === 'keypad') {
        if (g.flags.securityOpen) return true;
        g.state = 'keypad'; g.input.exitLock(); g.ignoreUnlock = true;
        g.ui.showKeypad(code => {
          if (code !== g.levelDef.code) return false;
          g.flags.securityOpen = true;
          const d = g.level.doors.find(x => x.id === 'securityDoor');
          if (d) { d.locked = false; g.world.openDoor(d.id, g.player.pos.x, g.player.pos.z); }
          if (o.led) o.led.material.color.setRGB(0.1, 3, 0.2);
          g.setObj('l3_card'); g.completeStep();
          wakePac(g, false);
          const ph = g.items.find(i => i.id === 'phone3'); if (ph) this.ring(g, ph);
          g.nav.dirty = true;
          return true;
        }, () => { g.state = 'play'; g.ignoreUnlock = false; g.suppressPauseUntil = performance.now() + 250; if (!g.ui.touch && !g.input.lockFailed) g.input.requestLock(); });
        return true;
      }
      if (o.type === 'keycard') { g.takeItem(o); g.inv.keycard = true; g.audio.pickup('key'); g.setObj('l3_stairs'); g.updateInventoryUI(); g.completeStep(); return true; }
      if (o.type === 'cardReader') {
        if (g.flags.stairOpen) return true;
        if (!g.inv.keycard) { g.ui.hint('Kart okuyucunun ışığı kırmızı.'); g.audio.beep(false); return true; }
        g.flags.stairOpen = true; g.audio.mech('card', o.pos);
        if (o.led) o.led.material.color.setRGB(0.1, 3, 0.2);
        openExit(g, 'l4', 'stairDoor'); g.completeStep();
        return true;
      }
      if (o.type === 'phone') { o.answered = true; g.answerPhone(o); return true; }
      return shrineUse(g, o, 'pinar');
    },
    update(g) {
      // Güvenlik odasındaki monitör duvarı: kameralar
      if (!g.flags.cameraHint && g.flags.securityOpen) {
        const sec = g.level.meta.security;
        const c = g.level.cellOf(g.player.pos.x, g.player.pos.z);
        if (sec && c.x >= sec.x0 && c.x <= sec.x1 && c.y >= sec.y0 && c.y <= sec.y1) {
          g.flags.cameraHint = true; g.flags.cameras = true;
          g.ui.subtitle('Monitörler katın kameralarını gösteriyor. Haritada artık onları görebiliyorum.', 5);
        }
      }
    },
  };

  SCRIPTS.l4 = {
    start(g) { g.setObj('l4_generators', 0); g.flags.gens = 0; },
    afterCard(g) { g.ui.subtitle(ST.MONO.l4_start, 4); g.player.toggleFlash(true); },
    restore(g) {
      for (const it of g.items) if (it.type === 'generator' && g.flags['g_' + it.id]) it.done = true;
      if ((g.flags.gens || 0) >= 3) { openExit(g, 'l5'); g.setObj('l4_leave'); }
      else g.setObj('l4_generators', g.flags.gens || 0);
    },
    prompt(g, o) {
      if (o.type === 'generator') return o.done ? null : g.inv.fuel > 0 ? 'Mazot dök ve çalıştır (basılı tut)' : 'Jeneratör (mazot yok)';
      return shrinePrompt(g, o, 'cemil');
    },
    canHold(g, o) { if (o.type === 'generator' && g.inv.fuel <= 0) { g.ui.hint('Önce bir mazot bidonu bul.'); return false; } return true; },
    holdStart(g, o) { if (o && o.type === 'generator') { g.noise(o.pos.x, o.pos.z, 20); } },
    use(g, o) {
      if (o.type === 'fuelCan') { g.takeItem(o); g.inv.fuel++; g.audio.pickup(); g.updateInventoryUI(); g.ui.notify('Mazot bidonu'); return true; }
      if (o.type === 'generator') {
        if (o.done) return true;
        if (g.inv.fuel <= 0) { g.ui.hint('Jeneratörün deposu boş.'); return true; }
        g.inv.fuel--; o.done = true; g.flags['g_' + o.id] = true;
        g.flags.gens = (g.flags.gens || 0) + 1;
        g.audio.mech('generator', o.pos);
        g.audio.loop('gen:' + o.id, 'engine', { x: o.pos.x, y: 0.5, z: o.pos.z }, { bus: 'sfx', gain: 0.35, ref: 3 });
        const zone = o.item.spot && o.item.spot.zone ? o.item.spot.zone : g.level.zone[g.level.i(o.item.x, o.item.y)];
        g.world.setZone(zone, true);
        g.ui.subtitle(ST.MONO.l4_gen, 3);
        g.noise(o.pos.x, o.pos.z, 30);
        if (g.flags.gens >= 2) wakePac(g, false);
        if (g.flags.gens >= 3) { openExit(g, 'l5'); g.setObj('l4_leave'); }
        else g.setObj('l4_generators', g.flags.gens);
        g.updateInventoryUI(); g.completeStep();
        return true;
      }
      return shrineUse(g, o, 'cemil');
    },
    update(g) {
      if (!g.flags.grinnerMono && g.entities.some(e => e.kind === 'grinner' && e.state !== 'gone' && e.distToPlayer() < 10 && e.losToPlayer())) { g.flags.grinnerMono = true; g.ui.subtitle(ST.MONO.l4_grinner, 4); }
    },
  };

  SCRIPTS.l5 = {
    start(g) { g.setObj('l5_pellets', 0); g.flags.mp = 0; this.ready(g); },
    ready(g) {
      // "HAZIR!" — herkes üç saniye donar
      g.readyT = 3.2;
      if (g.world.readyText) g.world.readyText.visible = true;
      for (const e of g.entities) e.frozenReady = true;
    },
    afterCard(g) {
      g.ui.subtitle(ST.MONO.l5_start, 4);
      if (g.audio.ctx) { const o = g.audio.out('sfx', null, { rev: 0.6, gain: 0.5 }); [523, 659, 784, 1047, 988, 784, 880, 1047].forEach((f, k) => g.audio.tone(o.input, 'square', f, f, g.audio.t + k * 0.16, 0.14, 0.12)); }
    },
    restore(g) {
      g.flags.mp = g.flags.mp || 0;
      if (g.flags.houseOpen) { this.openHouse(g, true); g.setObj('l5_house'); }
      else g.setObj('l5_pellets', g.flags.mp);
    },
    use(g, o) {
      if (o.type === 'powerPellet') {
        g.takeItem(o); g.flags.mp = (g.flags.mp || 0) + 1;
        g.powerT = 9; g.audio.pickup('pellet'); g.fx.flash = 0.3;
        if (g.flags.mp >= 4) { this.openHouse(g); g.setObj('l5_house'); }
        else g.setObj('l5_pellets', g.flags.mp);
        g.completeStep();
        return true;
      }
      if (o.type === 'portal') { g.exitLevel('l6'); return true; }
      if (o.type === 'note' && o.item.data === 'l5_rules') { g.readNote('l5_rules', () => g.ui.subtitle(ST.MONO.l5_rules, 4)); return true; }
      return false;
    },
    prompt(g, o) { if (o.type === 'portal') return g.flags.houseOpen ? 'Sayılamayan seviyeye geç' : null; return undefined; },
    openHouse(g, instant) {
      g.flags.houseOpen = true;
      for (const id of ['houseDoorA', 'houseDoorB']) { const d = g.level.doors.find(x => x.id === id); if (d) { d.locked = false; g.world.openDoor(d.id); if (instant) { const ob = g.world.doorObjs.get(id); ob.amt = 1; g.world.applyDoor(ob); } } }
      g.nav.dirty = true;
      if (!instant) { g.audio.door('house'); g.ui.subtitle(ST.MONO.l5_house, 4); }
    },
    pellet(g) {
      if (g.flags.pelletsEaten === 70 && !g.flags.fruit) {
        g.flags.fruit = true;
        const L = g.level, sp = L.spots.fruit[0];
        const o = { item: { x: sp.x, y: sp.y, d: -1, data: 'l5_fruit' }, id: 'fruit', type: 'fruit', pos: new THREE.Vector3(L.cx(sp.x) + 1.5, 1, L.cz(sp.y)), taken: false };
        const grp = new THREE.Group();
        const cm = new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 0.2, 0.2) });
        for (const [x, z] of [[-0.12, 0], [0.12, 0.05]]) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), cm); s.position.set(x, 0, z); grp.add(s); }
        grp.add(this.stem || (this.stem = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.35, 6), new THREE.MeshBasicMaterial({ color: 0x5a3a10 }))));
        grp.children[2].position.set(0, 0.2, 0); grp.children[2].rotation.z = 0.3;
        grp.position.copy(o.pos); g.scene.add(grp); o.mesh = grp; o.spin = true; o.baseY = 1; o.bob = true; o.marker = MARK.obj;
        g.items.push(o);
        g.interactables.push({ kind: 'item', ref: o, pos: o.pos, reach: 2.3, prompt: () => o.taken ? null : 'Kirazı al', act: () => { g.takeItem(o); g.audio.pickup('key'); g.readNote('l5_fruit'); } });
        g.ui.notify('Evin önünde bir meyve belirdi', 'key');
      }
      if (g.flags.pelletsEaten === g.world.pellets.length && !g.flags.perfect) { g.flags.perfect = true; g.ui.notify('Bütün pelletleri yedin. Mükemmel oyun.', 'key'); }
    },
    update(g, dt) {
      if (g.readyT > 0) {
        g.readyT -= dt;
        if (g.readyT <= 0) { if (g.world.readyText) g.world.readyText.visible = false; for (const e of g.entities) e.frozenReady = false; }
      }
    },
  };

  SCRIPTS.l6 = {
    start(g) { g.setObj('l6_core'); const d = exitDoorOf(g); if (d) { d.locked = false; } },
    afterCard(g) { g.ui.subtitle(ST.MONO.l6_start, 4); },
    restore(g) { g.setObj(g.flags.coreSeen ? 'l6_choice' : 'l6_core'); },
    prompt(g, o) { if (o.type === 'plug') return g.save.freed.length >= 4 ? 'FİŞİ ÇEK' : 'Fişi çekmeyi dene'; return undefined; },
    use(g, o) {
      if (o.type === 'powerPellet') { g.takeItem(o); g.powerT = 9; g.audio.pickup('pellet'); g.fx.flash = 0.3; return true; }
      if (o.type === 'plug') {
        if (g.save.freed.length >= 4) {
          g.player.frozen = true;
          g.ui.subtitle('Dört renkli ışık yanına geliyor. Kırmızı, pembe, mavi, turuncu.', 4);
          for (const e of g.entities) if (e.kind === 'ghost') { e.placeCell(o.item.x, o.item.y + 1); }
          g.later(3500, () => { g.fx.flash = 1; g.audio.stinger('spot'); g.player.frozen = false; g.whenPlaying(() => g.exitLevel('ending-plug')); });
        } else {
          const missing = ['bulent', 'pinar', 'inci', 'cemil'].filter(c => !g.save.freed.includes(c)).map(c => ST.CHAR[c].name).join(', ');
          g.ui.subtitle(`Fiş kıpırdamıyor. Tek başına çekemezsin… Dört el daha lazım. (Eksik: ${missing})`, 6);
          g.setObj('l6_choice');
        }
        return true;
      }
      return false;
    },
    update(g) {
      const d = exitDoorOf(g);
      if (d && !g.exitDoorId) {
        // ÇIKIŞ kapısı: yaklaşınca açılır, geçince kötü son
        const obj = g.world.doorObjs.get(d.id);
        if (Math.hypot(g.player.pos.x - obj.g.cx, g.player.pos.z - obj.g.cz) < 3.2) { openExit(g, 'ending-exit', d.id); }
      }
      if (!g.flags.coreSeen) {
        const core = g.level.meta.core, c = g.level.cellOf(g.player.pos.x, g.player.pos.z);
        if (core && c.x >= core.x0 - 1 && c.x <= core.x1 + 1 && c.y >= core.y0 - 1 && c.y <= core.y1 + 1) { g.flags.coreSeen = true; g.ui.subtitle(ST.MONO.l6_core, 5); g.setObj('l6_choice'); g.checkpoint(true); }
      }
    },
  };

  // Labirent başlangıcındaki "HAZIR" donması: yaratık güncellemesini sarmalayarak uygula
  const baseUpdateEntities = Game.prototype.updateEntities;
  Game.prototype.updateEntities = function (dt, frozen) {
    if (this.readyT > 0) { for (const e of this.entities) if (e.pose) e.pose(dt); else if (e.mesh && e.kind === 'pacman') { e.mesh.position.set(e.pos.x, 1.2, e.pos.z); } return; }
    return baseUpdateEntities.call(this, dt, frozen);
  };

  PB.Game = Game;
  PB.SCRIPTS = SCRIPTS;

  // Açılış
  function start() {
    if (!root.THREE) { const l = document.getElementById('boot-label'); if (l) l.textContent = '3D motoru (three.js) yüklenemedi. İnternet bağlantını kontrol edip sayfayı yenile.'; return; }
    const game = new Game();
    root.PB.game = game;
    game.boot().catch(e => { console.error(e); const l = document.getElementById('boot-label'); if (l) l.textContent = 'Başlatma hatası: ' + e.message; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})(typeof window !== 'undefined' ? window : globalThis);
