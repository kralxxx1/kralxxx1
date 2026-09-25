/* The backpack: an item screen with a turnable 3D inspect view, and Sam's journal
   (where you are, what to do, the story so far, papers found here, the people in it). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const ST = PB.Story;
  const t = PB.t;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const MEMENTO_MODEL = { billy: 'watch', ivy: 'glasses', penny: 'walkman', clyde: 'lighter' };
  const CAST = ['sam', 'eddie', 'walt', 'billy', 'penny', 'ivy', 'clyde', 'lily'];
  const GHOSTS = ['billy', 'penny', 'ivy', 'clyde'];

  class Bag {
    constructor(game) {
      this.g = game;
      this.tab = 'items';
      this.sel = null;
      this.model = null;
      this.rotY = 0.6; this.rotX = 0.35; this.drag = null; this.idle = 0;
      $('bag-tab-items').onclick = () => this.show('items');
      $('bag-tab-journal').onclick = () => this.show('journal');
      $('bag-close').onclick = () => this.g.closeBag();
      const cv = $('bag-canvas');
      cv.addEventListener('pointerdown', e => { this.drag = { x: e.clientX, y: e.clientY }; cv.setPointerCapture(e.pointerId); });
      cv.addEventListener('pointermove', e => {
        if (!this.drag) return;
        this.rotY += (e.clientX - this.drag.x) * 0.012; this.rotX = Math.max(-1.2, Math.min(1.2, this.rotX + (e.clientY - this.drag.y) * 0.01));
        this.drag = { x: e.clientX, y: e.clientY }; this.idle = 0;
      });
      const end = () => { this.drag = null; };
      cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    }
    open(tab) { this.show(tab || this.tab); }
    show(tab) {
      this.tab = tab;
      $('bag-tab-items').classList.toggle('on', tab === 'items');
      $('bag-tab-journal').classList.toggle('on', tab === 'journal');
      $('bag-items').hidden = tab !== 'items';
      $('bag-journal').hidden = tab !== 'journal';
      if (tab === 'items') this.buildItems(); else this.buildJournal();
    }

    // ------------------------------------------------------------ ITEMS
    items() {
      const g = this.g, inv = g.inv || {}, pl = g.player, out = [];
      if (pl.hasFlashlight) out.push({ id: 'flashlight', model: 'flashlight', name: t('bag.n.flashlight'), desc: t('bag.d.flashlight', { n: Math.round(pl.battery) }) });
      if (inv.batteries) out.push({ id: 'battery', model: 'battery', count: inv.batteries, name: t('bag.n.battery'), desc: t('bag.d.battery') });
      if (inv.almond) out.push({ id: 'almond', model: 'almond', count: inv.almond, name: t('bag.n.almond'), desc: t('bag.d.almond') });
      if (inv.glow) out.push({ id: 'glow', model: 'glowstick', count: inv.glow, name: t('bag.n.glow'), desc: t('bag.d.glow') });
      if (inv.officeKey) out.push({ id: 'officeKey', model: 'key', name: t('inv.officeKey'), desc: t('bag.d.officeKey') });
      if (inv.token) out.push({ id: 'token', model: 'token', name: t('inv.token'), desc: t('bag.d.token') });
      if (inv.fuses) out.push({ id: 'fuses', model: 'fuse', count: inv.fuses, name: t('bag.n.fuse'), desc: t('bag.d.fuse') });
      if (inv.fuel) out.push({ id: 'fuel', model: 'fuelCan', count: inv.fuel, name: t('bag.n.fuel'), desc: t('bag.d.fuel') });
      if (inv.keycard) out.push({ id: 'keycard', model: 'keycard', name: t('inv.keycard'), desc: t('bag.d.keycard') });
      if (inv.memento) { const m = ST.memento(inv.memento); out.push({ id: 'memento', model: MEMENTO_MODEL[inv.memento] || 'watch', name: m.name, desc: m.line, story: true }); }
      const counted = {};
      for (const k of inv.keys || []) {
        const base = k.replace(/\d+$/, '');
        if (/^(frame|page)$/.test(base)) { counted[base] = (counted[base] || 0) + 1; continue; }
        const it = ST.item(k);
        out.push({ id: k, model: /card/i.test(k) ? 'keycard' : 'key', name: it.name, desc: it.desc || t('bag.d.key'), story: true });
      }
      for (const b in counted) { const it = ST.item(b); out.push({ id: b, model: 'note', count: counted[b], name: it.name, desc: it.desc || '', story: true }); }
      return out;
    }
    buildItems() {
      const list = this.items(), grid = $('bag-grid');
      if (!list.length) { grid.innerHTML = `<p class="help">${esc(t('bag.empty'))}</p>`; this.select(null); return; }
      grid.innerHTML = list.map((it, k) => `<button type="button" class="bag-cell${it.story ? ' story' : ''}" data-k="${k}"><span class="bn">${esc(it.name)}</span>${it.count > 1 ? `<span class="bc">×${it.count}</span>` : ''}</button>`).join('');
      grid.querySelectorAll('.bag-cell').forEach(b => { b.onclick = () => this.select(list[+b.dataset.k], b); b.onfocus = () => this.select(list[+b.dataset.k], b); });
      const keep = this.sel ? list.findIndex(i => i.id === this.sel.id) : -1;
      const k = keep >= 0 ? keep : 0;
      this.select(list[k], grid.querySelectorAll('.bag-cell')[k]);
    }
    select(it, btn) {
      this.sel = it;
      document.querySelectorAll('#bag-grid .bag-cell').forEach(b => b.classList.toggle('on', b === btn));
      $('bag-name').textContent = it ? it.name + (it.count > 1 ? '  ×' + it.count : '') : '';
      $('bag-desc').textContent = it ? it.desc : '';
      $('bag-hint').textContent = it ? t('bag.inspectHint') : '';
      this.setModel(it ? it.model : null);
    }

    // ------------------------------------------------------------ INSPECT (own small renderer, plain lighting)
    ensureRenderer() {
      if (this.r) return true;
      try {
        const cv = $('bag-canvas');
        this.r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'low-power' });
        this.r.setPixelRatio(Math.min(2, root.devicePixelRatio || 1));
        this.r.setSize(cv.clientWidth || 340, cv.clientHeight || 340, false);
        this.r.outputColorSpace = THREE.SRGBColorSpace;
        this.r.toneMapping = THREE.ACESFilmicToneMapping; this.r.toneMappingExposure = 1.05;
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.HemisphereLight(0xfff2dc, 0x1a1c22, 1.1));
        const key = new THREE.DirectionalLight(0xfff0d8, 2.6); key.position.set(2.5, 3, 2.2); this.scene.add(key);
        const rim = new THREE.DirectionalLight(0x9ab8ff, 1.6); rim.position.set(-2.5, 1.2, -2.5); this.scene.add(rim);
        const low = new THREE.PointLight(0xffc890, 1.2, 8, 2); low.position.set(0, -1.6, 1.8); this.scene.add(low);
        this.cam = new THREE.PerspectiveCamera(28, 1, 0.01, 50);
        this.cam.position.set(0, 0, 4.2);
        this.pivot = new THREE.Group(); this.scene.add(this.pivot);
        this.mats = new Map();
        return true;
      } catch (e) { this.r = null; return false; }
    }
    // Copy of a world material without the level's baked-light shader patch
    plainMat(key) {
      if (this.mats.has(key)) return this.mats.get(key);
      const src = this.g.world.mat(key);
      const m = src.clone();
      m.onBeforeCompile = () => {};
      m.vertexColors = false;
      m.needsUpdate = true;
      this.mats.set(key, m);
      return m;
    }
    setModel(key) {
      if (!this.ensureRenderer()) return;
      if (this.model) { this.pivot.remove(this.model); this.model = null; }
      if (!key || !PB.Props.DEFS[key]) { this.r.clear(); return; }
      const grp = this.g.meshFromDef(key, k => this.plainMat(k));
      const box = new THREE.Box3().setFromObject(grp), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
      const s = 1.5 / Math.max(size.x, size.y, size.z, 0.01);
      grp.position.copy(c).multiplyScalar(-s); grp.scale.setScalar(s);
      const holder = new THREE.Group(); holder.add(grp);
      this.pivot.add(holder); this.model = holder;
      this.rotY = 0.6; this.rotX = 0.35; this.idle = 0;
    }
    update(dt) {
      if (!this.r || !this.model || this.tab !== 'items') return;
      this.idle += dt;
      if (!this.drag && this.idle > 1.5) this.rotY += dt * 0.5;
      this.pivot.rotation.set(this.rotX, this.rotY, 0);
      const cv = this.r.domElement, w = cv.clientWidth, h = cv.clientHeight;
      if (w && h && (cv.width !== Math.floor(w * this.r.getPixelRatio()) || cv.height !== Math.floor(h * this.r.getPixelRatio()))) { this.r.setSize(w, h, false); this.cam.aspect = w / h; this.cam.updateProjectionMatrix(); }
      this.r.render(this.scene, this.cam);
    }

    // ------------------------------------------------------------ JOURNAL
    buildJournal() {
      const g = this.g, id = g.levelDef.id, L = ST.level(id), save = g.save || { notes: [], drawings: [], freed: [] };
      const order = ST.LEVELS.map(l => l.id), cur = order.indexOf(id);
      const h = [];
      h.push(`<header class="bj-head"><p class="bj-name">${esc(L.name)}</p><h3 class="bj-title">${esc(L.title)}</h3><p class="bj-place">${esc(L.place)}</p></header>`);
      h.push(`<h4>${esc(t('bag.now'))}</h4><p class="bj-obj">${esc(g.objKey ? ST.obj(g.objKey, g.objVars) : '—')}</p>`);
      // The story so far, in Sam's words
      h.push(`<h4>${esc(t('bag.story'))}</h4><ol class="bj-story">`);
      for (let k = 0; k <= cur; k++) {
        const lid = order[k], LL = ST.level(lid);
        const txt = k < cur ? ST.recap(lid) : LL.intro;
        h.push(`<li class="${k === cur ? 'now' : ''}"><i>${esc(LL.name)}</i><b>${esc(LL.title)}</b> — <span>${esc(txt)}</span></li>`);
      }
      h.push('</ol>');
      // Papers found in this chapter
      const here = (save.notes || []).filter(n => ST.noteLevel(n) === id);
      h.push(`<h4>${esc(t('bag.docs'))}</h4>`);
      if (here.length) h.push(`<div class="bj-docs">${here.map(n => `<button type="button" class="arch-row" data-note="${esc(n)}"><span class="kind">${esc(t('kind.' + ST.note(n).kind) === 'kind.' + ST.note(n).kind ? t('kind.doc') : t('kind.' + ST.note(n).kind))}</span>${esc(ST.note(n).title)}</button>`).join('')}</div>`);
      else h.push(`<p class="help">${esc(t('bag.noDocs'))}</p>`);
      // People
      h.push(`<h4>${esc(t('bag.people'))}</h4><div class="bj-people">`);
      for (const c of CAST) {
        const ch = ST.char(c);
        const ghost = GHOSTS.includes(c);
        const state = ghost ? `<em class="${save.freed.includes(c) ? 'ok' : 'bad'}">${esc(t(save.freed.includes(c) ? 'bag.freed' : 'bag.hunting'))}</em>` : '';
        h.push(`<div class="bj-person" style="--c:${ST.charColor(c)}"><b>${esc(ch.name)}</b>${state}<span>${esc(ch.role || '')}</span></div>`);
      }
      h.push('</div>');
      h.push(`<p class="help bj-stats">${esc(t('bag.stats', { a: (save.notes || []).length, b: ST.noteCount(), c: (save.drawings || []).length, d: ST.drawingCount() }))}</p>`);
      const box = $('bag-journal');
      box.innerHTML = h.join('');
      box.querySelectorAll('[data-note]').forEach(b => { b.onclick = () => this.g.readFromBag(b.dataset.note); });
    }
  }
  PB.Bag = Bag;
})(typeof window !== 'undefined' ? window : globalThis);
