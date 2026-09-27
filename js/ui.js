/* Arayüz: menüler, ayarlar, HUD, not okuyucu, harita, tuş takımı, ölüm/son ekranları, dokunmatik kontroller. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U, S = PB.Settings, ST = PB.Story;
  // How much each setting weighs on the graphics card at its highest value (0..4)
  const IMPACT = { renderScale: 4, shadows: 3, ao: 3, ssr: 3, volumetric: 4, lightmapRes: 2, textureRes: 2, antialias: 2, motionBlur: 1, dof: 2, bloom: 1, particles: 1, dynLights: 2, viewDist: 2, anisotropy: 1, modelDetail: 2, clutter: 1, sharpen: 1 };
  const t = PB.t, I = PB.I18N;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  class UI {
    constructor(game) {
      this.g = game;
      this.stack = [];
      this.subT = 0; this.capList = []; this.notifs = [];
      this.$ = id => document.getElementById(id);
      this.bindMenuKeys();
      const coarse = root.matchMedia && root.matchMedia('(pointer: coarse)').matches;
      this.touch = coarse;
      document.body.classList.toggle('touch', coarse);
      S.events.on('change', key => this.onSetting(key));
      this.onSetting('*');
      I.apply(document);
    }
    // Language switched: re-apply static text and rebuild whatever dynamic screen is open
    onLanguage() {
      I.apply(document);
      if (this.isOpen('scr-settings') && this.renderSettings) this.renderSettings(true);
      if (this.isOpen('scr-menu')) this.buildMenu(this.g.save);
      if (this.isOpen('scr-archive')) this.buildArchive(this.g.save || { notes: [] });
      if (this.isOpen('scr-levels') && this.lastLevelPick) this.buildLevelSelect(this.g.save, this.lastLevelPick);
    }
    el(id) { return this.$(id); }
    // ---------------------------------------------------------- ekran yönetimi
    screens() { return Array.from(document.querySelectorAll('.screen, .overlay')); }
    show(id) { const e = this.$(id); if (e) { e.hidden = false; e.classList.add('on'); this.focusFirst(e); } }
    hide(id) { const e = this.$(id); if (e) { e.hidden = true; e.classList.remove('on'); } }
    only(id) { for (const s of this.screens()) if (s.id !== id) { s.hidden = true; s.classList.remove('on'); } if (id) this.show(id); }
    isOpen(id) { const e = this.$(id); return e && !e.hidden; }
    focusFirst(e) {
      if (this.touch) return;
      const b = e.querySelector('[data-focus], button:not([disabled]), input, select');
      if (b) setTimeout(() => b.focus({ preventScroll: true }), 30);
    }
    bindMenuKeys() {
      document.addEventListener('keydown', e => {
        const open = this.screens().filter(s => !s.hidden && s.classList.contains('nav'));
        if (!open.length) return;
        const scr = open[open.length - 1];
        const items = Array.from(scr.querySelectorAll('button:not([disabled]):not([hidden]), input[type=range], select')).filter(b => b.offsetParent !== null);
        if (!items.length) return;
        const i = items.indexOf(document.activeElement);
        if (e.code === 'ArrowDown' || (e.code === 'Tab' && !e.shiftKey)) { if (document.activeElement && document.activeElement.type === 'range' && e.code !== 'Tab') { /* kaydırıcı: aşağı = sonraki */ } e.preventDefault(); items[(i + 1) % items.length].focus(); this.g.audio && this.g.audio.uiMove(); }
        else if (e.code === 'ArrowUp' || (e.code === 'Tab' && e.shiftKey)) { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); this.g.audio && this.g.audio.uiMove(); }
        else if (e.code === 'Escape' && scr.dataset.back) { e.preventDefault(); const b = scr.querySelector('[data-action=back]'); if (b) b.click(); }
      });
      document.addEventListener('click', e => { const b = e.target.closest('button'); if (b && this.g.audio) this.g.audio.uiOk(); });
    }
    onSetting(key) {
      const d = S.data;
      document.body.classList.toggle('no-crosshair', !d.crosshair);
      document.body.dataset.sub = d.subtitleSize;
      const rec = this.$('rec'); if (rec) rec.hidden = !d.vhs;
      const fps = this.$('fps'); if (fps) fps.hidden = true;
      if (key === 'vhs' || key === '*') document.body.classList.toggle('vhs', !!d.vhs);
    }

    // ---------------------------------------------------------- yükleme
    loading(p, label, tip) {
      this.$('boot-bar').style.width = Math.round(p * 100) + '%';
      if (label) this.$('boot-label').textContent = label;
      if (tip) this.$('boot-tip').textContent = tip;
    }
    // ---------------------------------------------------------- ana menü
    buildMenu(save) {
      const cont = this.$('m-continue');
      cont.hidden = !(save && save.level);
      if (save && save.level) {
        const L = ST.level(save.level);
        cont.querySelector('small').textContent = L ? `${L.name} · ${L.title}` : '';
      } else cont.querySelector('small').textContent = '';
      this.$('m-levels').hidden = !(save && save.unlocked && save.unlocked.length > 1);
      const found = save && save.notes ? save.notes.length : 0;
      this.$('m-archive').querySelector('small').textContent = `${found} / ${ST.noteCount()}`;
      this.$('menu-foot').textContent = save && save.completed ? t('menu.footDone', { list: save.endings.map(e => (ST.ending(e) || { title: e }).title).join(', '), deaths: save.stats.deaths }) : t('menu.foot');
    }
    buildLevelSelect(save, onPick) {
      this.lastLevelPick = onPick;
      const list = this.$('levels-list');
      list.innerHTML = '';
      for (const D of ST.LEVELS) {
        const L = ST.level(D.id);
        const ok = save.unlocked.includes(L.id);
        const b = document.createElement('button');
        b.className = 'level-row';
        b.disabled = !ok;
        b.innerHTML = `<span class="lv-name">${esc(L.name)}</span><span class="lv-title">${ok ? esc(L.title) : '? ? ?'}</span><span class="lv-place">${ok ? esc(L.place) : esc(t('levels.locked'))}</span>`;
        if (ok) b.addEventListener('click', () => onPick(L.id));
        list.appendChild(b);
      }
    }
    buildArchive(save) {
      const list = this.$('archive-list');
      list.innerHTML = '';
      const found = new Set(save.notes || []);
      const placed = ST.placedNoteIds();
      this.$('archive-count').textContent = t('archive.count', { n: placed.filter(id => found.has(id)).length, m: placed.length });
      for (const D of ST.LEVELS) {
        const ids = placed.filter(id => ST.noteLevel(id) === D.id);
        if (!ids.length) continue;
        const L = ST.level(D.id);
        const h = document.createElement('h3');
        h.textContent = `${L.name} — ${L.title}`;
        list.appendChild(h);
        for (const nid of ids) {
          const n = ST.note(nid);
          const b = document.createElement('button');
          b.className = 'arch-row';
          const has = found.has(n.id);
          b.disabled = !has;
          b.innerHTML = has ? `<span class="kind">${esc(kindLabel(n.kind))}</span>${esc(n.title)}` : `<span class="kind">—</span>${esc(t('archive.notFound'))}`;
          if (has) b.addEventListener('click', () => this.showNote(n.id, () => this.show('scr-archive'), true));
          list.appendChild(b);
        }
      }
    }
    // ---------------------------------------------------------- settings
    // A list of rows on the left (label, then a value you cycle with ◀ ▶, a slider or a switch) and a panel on
    // the right that explains whichever row is selected and how heavy it is on the graphics card. Graphics
    // shows an estimate of the GPU load and video memory for the current choices. Arrow keys move and change,
    // Q/E switch tabs, Backspace reverts to what was set when the screen opened, Esc goes back.
    buildSettings(onBack) {
      const tabs = this.$('set-tabs'), body = this.$('set-body'), info = this.$('set-info');
      tabs.innerHTML = '';
      let cur = this.setTab || 'screen';
      const opened = JSON.parse(JSON.stringify(S.data));
      const tabList = S.TABS.filter(id => S.SCHEMA.some(x => x.tab === id));
      const render = (relabel) => {
        if (relabel) for (const b of tabs.children) b.textContent = t('tab.' + b.dataset.tab);
        body.innerHTML = '';
        if (cur === 'graphics') body.appendChild(this.gpuBudget());
        for (const s of S.SCHEMA.filter(x => x.tab === cur)) body.appendChild(this.settingRow(s));
        for (const b of tabs.children) { b.classList.toggle('on', b.dataset.tab === cur); b.setAttribute('aria-selected', String(b.dataset.tab === cur)); }
        const first = body.querySelector('.set-row');
        if (first) this.describe(first.dataset.key);
        this.$('set-keys').textContent = this.touch ? '' : t('settings.keys');
      };
      const go = id => { cur = this.setTab = id; render(); const f = body.querySelector('.set-row'); if (f && !this.touch) f.focus({ preventScroll: true }); };
      for (const id of tabList) {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = t('tab.' + id); b.dataset.tab = id; b.setAttribute('role', 'tab');
        b.addEventListener('click', () => go(id));
        tabs.appendChild(b);
      }
      render();
      this.$('set-reset').onclick = () => { S.reset(); render(); };
      this.$('set-revert').onclick = () => { for (const k in opened) if (S.SCHEMA.some(x => x.key === k) && JSON.stringify(S.data[k]) !== JSON.stringify(opened[k])) S.set(k, opened[k], true); S.set('preset', opened.preset, true); render(); };
      this.$('set-back').onclick = onBack;
      this.renderSettings = render;
      // own keys while the screen is open
      if (this.setKeys) document.removeEventListener('keydown', this.setKeys, true);
      this.setKeys = e => {
        if (this.$('scr-settings').hidden) return;
        const rows = [...body.querySelectorAll('.set-row')], i = rows.indexOf(document.activeElement.closest ? document.activeElement.closest('.set-row') : null);
        const move = d => { if (!rows.length) return; const n = rows[(Math.max(0, i) + d + rows.length) % rows.length]; n.focus({ preventScroll: false }); n.scrollIntoView({ block: 'nearest' }); this.describe(n.dataset.key); this.g.audio && this.g.audio.uiMove(); };
        const ti = tabList.indexOf(cur);
        if (e.code === 'ArrowDown') { e.preventDefault(); e.stopPropagation(); move(i < 0 ? 0 : 1); }
        else if (e.code === 'ArrowUp') { e.preventDefault(); e.stopPropagation(); move(i < 0 ? 0 : -1); }
        else if ((e.code === 'ArrowLeft' || e.code === 'ArrowRight') && i >= 0) { e.preventDefault(); e.stopPropagation(); rows[i].step(e.code === 'ArrowRight' ? 1 : -1); }
        else if ((e.code === 'Enter' || e.code === 'Space') && i >= 0 && rows[i].dataset.type === 'toggle') { e.preventDefault(); e.stopPropagation(); rows[i].step(1); }
        else if (e.code === 'KeyQ' || e.code === 'PageUp') { e.preventDefault(); e.stopPropagation(); go(tabList[(ti - 1 + tabList.length) % tabList.length]); }
        else if (e.code === 'KeyE' || e.code === 'PageDown') { e.preventDefault(); e.stopPropagation(); go(tabList[(ti + 1) % tabList.length]); }
        else if (e.code === 'Backspace') { e.preventDefault(); e.stopPropagation(); this.$('set-revert').click(); }
      };
      document.addEventListener('keydown', this.setKeys, true);
    }
    // How heavy a setting is at its current value, 0..4 (for the detail panel and the GPU budget)
    impactOf(s, v) {
      const w = IMPACT[s.key]; if (w == null) return null;
      let k = 1;
      if (s.type === 'range') k = (v - s.min) / Math.max(1e-6, s.max - s.min);
      else if (s.type === 'toggle') k = v ? 1 : 0;
      else { const idx = s.options.findIndex(o => String(o[0]) === String(v)); k = s.options.length > 1 ? Math.max(0, idx) / (s.options.length - 1) : 1; }
      return Math.round(w * k);
    }
    gpuBudget() {
      const box = document.createElement('div'); box.className = 'gpu-budget'; box.id = 'gpu-budget';
      this.fillBudget(box);
      return box;
    }
    fillBudget(box) {
      box = box || this.$('gpu-budget'); if (!box) return;
      const d = S.data;
      let load = 0, max = 0;
      for (const s of S.SCHEMA.filter(x => x.tab === 'graphics' && IMPACT[x.key])) { load += this.impactOf(s, d[s.key]); max += IMPACT[s.key]; }
      const k = load / Math.max(1, max), level = k < 0.2 ? 1 : k < 0.4 ? 2 : k < 0.6 ? 3 : k < 0.8 ? 4 : 5;
      const w = innerWidth * (root.devicePixelRatio || 1), h = innerHeight * (root.devicePixelRatio || 1), px = w * h * d.renderScale * d.renderScale;
      const tex = d.textureRes * d.textureRes * 4 * 1.33 * 46;
      const rts = px * 8 * (5 + (d.antialias === 'msaa' || d.antialias === 'both' ? 4 : 0) + (d.ssr !== 'off' ? 1 : 0) + (d.dof !== 'off' ? 1 : 0) + (d.motionBlur > 0 ? 1 : 0));
      const sh = Math.pow([0, 1024, 2048, 4096, 8192][d.shadows] || 0, 2) * 4;
      const lm = d.lightmapRes * d.lightmapRes * 1600 * 4 * 8;
      const vram = (tex + rts + sh + lm) / 1073741824 + 0.25;
      box.innerHTML = `<div class="gb-row"><span>${esc(t('settings.gpuLoad'))}</span><b class="gb-l${level}">${esc(t('impact.' + level))}</b></div>
        <div class="gb-bar"><i style="width:${Math.round(k * 100)}%" class="gb-l${level}"></i></div>
        <div class="gb-row"><span>${esc(t('settings.vram'))}</span><b>≈ ${vram.toFixed(1)} GB</b></div>`;
    }
    describe(key) {
      const info = this.$('set-info'), s = S.SCHEMA.find(x => x.key === key);
      if (!info || !s) return;
      for (const r of this.$('set-body').querySelectorAll('.set-row')) r.classList.toggle('sel', r.dataset.key === key);
      const helpKey = 'set.' + s.key + '.help', help = t(helpKey);
      const imp = this.impactOf(s, S.get(s.key));
      info.innerHTML = `<h3>${esc(t('set.' + s.key))}</h3><p>${esc(help !== helpKey ? help : '')}</p>` +
        (imp != null ? `<div class="imp"><span>${esc(t('settings.impact'))}</span><span class="dots">${[1, 2, 3, 4].map(n => `<i class="${n <= imp ? 'on l' + imp : ''}"></i>`).join('')}</span><b>${esc(t('impact.' + Math.max(0, imp)))}</b></div>` : '') +
        (s.reload ? `<p class="badge">${esc(t('settings.reloadBadge'))}</p>` : '');
    }
    settingRow(s) {
      const row = document.createElement('div');
      row.className = 'set-row'; row.tabIndex = 0; row.dataset.key = s.key; row.dataset.type = s.type;
      const id = 'set-' + s.key;
      const label = () => { const v = S.get(s.key); if (s.type === 'range') return s.fmt ? s.fmt(v) : String(v); if (s.type === 'toggle') return v ? t('common.on') : t('common.off'); const o = s.options.find(q => String(q[0]) === String(v)); return o ? t(o[1]) : String(v); };
      let ctl = '';
      if (s.type === 'range') ctl = `<input type="range" id="${id}" min="${s.min}" max="${s.max}" step="${s.step}" value="${S.get(s.key)}" tabindex="-1"><output>${esc(label())}</output>`;
      else if (s.type === 'toggle') ctl = `<button type="button" class="toggle" id="${id}" tabindex="-1" aria-pressed="${!!S.get(s.key)}">${esc(label())}</button>`;
      else ctl = `<button type="button" class="cyc" data-d="-1" tabindex="-1" aria-label="◀">◀</button><span class="cyc-val" id="${id}">${esc(label())}</span><button type="button" class="cyc" data-d="1" tabindex="-1" aria-label="▶">▶</button>`;
      row.innerHTML = `<label>${esc(t('set.' + s.key))}${s.reload ? ' <em>*</em>' : ''}</label><div class="ctl">${ctl}</div>`;
      const refresh = () => {
        const v = S.get(s.key);
        if (s.type === 'range') { row.querySelector('input').value = v; row.querySelector('output').textContent = label(); }
        else if (s.type === 'toggle') { const b = row.querySelector('.toggle'); b.setAttribute('aria-pressed', String(!!v)); b.textContent = label(); }
        else row.querySelector('.cyc-val').textContent = label();
        this.describe(s.key);
        if (s.tab === 'graphics') this.fillBudget();
      };
      const after = () => {
        if (s.key === 'preset' || s.key === '*') { const k = this.setTab; this.renderSettings(); const r = this.$('set-body').querySelector(`[data-key="${s.key}"]`); if (r && !this.touch) r.focus({ preventScroll: true }); return; }
        if (S.PRESET_KEYS.includes(s.key)) this.syncPresetSelect();
        refresh();
      };
      // one step of change: arrows, ◀ ▶, a click on a switch
      row.step = d => {
        const v = S.get(s.key);
        if (s.type === 'range') S.set(s.key, U.clamp(Math.round((v + d * s.step) / s.step) * s.step, s.min, s.max));
        else if (s.type === 'toggle') S.set(s.key, !v);
        else { const idx = s.options.findIndex(o => String(o[0]) === String(v)); const n = s.options[(idx + d + s.options.length) % s.options.length]; S.set(s.key, n[0]); }
        this.g.audio && this.g.audio.uiMove();
        after();
      };
      if (s.type === 'range') row.querySelector('input').addEventListener('input', e => { S.set(s.key, +e.target.value); after(); });
      else if (s.type === 'toggle') row.querySelector('.toggle').addEventListener('click', () => row.step(1));
      else for (const b of row.querySelectorAll('.cyc')) b.addEventListener('click', () => row.step(+b.dataset.d));
      row.addEventListener('focus', () => this.describe(s.key));
      row.addEventListener('mouseenter', () => this.describe(s.key));
      return row;
    }
    syncPresetSelect() { const r = this.$('set-body') && this.$('set-body').querySelector('[data-key="preset"] .cyc-val'); if (r) { const s = S.SCHEMA.find(x => x.key === 'preset'); const o = s.options.find(q => q[0] === S.get('preset')); r.textContent = o ? t(o[1]) : ''; } }

    // ---------------------------------------------------------- HUD
    setObjective(text) {
      const o = this.$('obj-text');
      if (o.textContent === text) return;
      o.textContent = text || '';
      const box = this.$('objective');
      box.classList.remove('flash'); void box.offsetWidth; box.classList.add('flash');
    }
    notify(text, kind = '') {
      const n = document.createElement('div');
      n.className = 'notif ' + kind;
      n.textContent = text;
      this.$('notif').appendChild(n);
      setTimeout(() => n.classList.add('out'), 3200);
      setTimeout(() => n.remove(), 4000);
    }
    hint(text, force) { if (!S.data.hints && !force) return; this.notify(text, 'hint'); }
    // speaker: label shown before the line (radio, dialogue); who: css accent
    subtitle(text, dur = 4, speaker = null, who = null) {
      if (!S.data.subtitles) return;
      const e = this.$('subtitle');
      e.innerHTML = speaker ? `<b class="spk spk-${esc(who || 'x')}">${esc(speaker)}</b> ${esc(text)}` : esc(text);
      e.classList.add('on');
      this.subT = dur;
    }
    // A new level starts with a clean screen: nothing said in the last one carries over
    clearSubtitles() {
      const e = this.$('subtitle'); if (e) { e.classList.remove('on'); e.innerHTML = ''; }
      this.subT = 0;
      const c = this.$('caption'); if (c) c.innerHTML = '';
    }
    caption(text, dir) {
      const e = this.$('caption');
      const line = document.createElement('div');
      line.textContent = dir ? `${text} (${dir})` : text;
      e.appendChild(line);
      while (e.children.length > 3) e.firstChild.remove();
      setTimeout(() => line.remove(), 3500);
    }
    prompt(text, hold) {
      const p = this.$('prompt');
      if (!text) { p.hidden = true; return; }
      p.hidden = false;
      this.$('prompt-text').textContent = text;
      this.$('prompt-key').textContent = this.touch ? t('touch.tap') : 'E';
      const ring = this.$('hold');
      if (hold != null) { ring.hidden = false; ring.style.setProperty('--p', hold); } else ring.hidden = true;
    }
    marks(list) {
      const box = this.$('marks');
      if (!box) return;
      const els = this.markEls || (this.markEls = []);
      while (els.length < list.length) { const e = document.createElement('i'); box.appendChild(e); els.push(e); }
      for (let k = 0; k < els.length; k++) {
        const e = els[k], m = list[k];
        if (!m) { if (e.style.opacity !== '0') e.style.opacity = '0'; continue; }
        e.style.left = m.x.toFixed(2) + '%'; e.style.top = m.y.toFixed(2) + '%';
        e.style.opacity = m.a.toFixed(2);
        e.classList.toggle('on', m.on);
      }
    }
    hud(dt, p) {
      this.subT -= dt;
      if (this.subT <= 0) this.$('subtitle').classList.remove('on');
      const st = this.$('m-stamina');
      st.style.setProperty('--v', (p.stamina / 100).toFixed(3));
      st.classList.toggle('hide', p.stamina > 99);
      st.classList.toggle('low', p.exhausted);
      const bt = this.$('m-battery');
      bt.style.setProperty('--v', (p.battery / 100).toFixed(3));
      bt.classList.toggle('hide', !p.hasFlashlight);
      bt.classList.toggle('low', p.battery < 15);
      bt.classList.toggle('on', p.flashOn);
      const spare = this.g.inv ? this.g.inv.batteries : 0;
      if (spare !== this.lastSpare) { this.lastSpare = spare; const b = this.$('m-spare'); if (b) b.textContent = spare ? '×' + spare : ''; }
      bt.classList.toggle('swap', p.reloadT > 0);
    }
    setInventory(inv) {
      const box = this.$('inv');
      const chips = [];
      if (inv.batteries) chips.push(esc(t('inv.battery', { n: inv.batteries })));
      if (inv.almond) chips.push(`${esc(t('inv.almond', { n: inv.almond }))} <kbd>Q</kbd>`);
      if (inv.glow) chips.push(`${esc(t('inv.glow', { n: inv.glow }))} <kbd>G</kbd>`);
      for (const k of inv.keys || []) chips.push(esc(k));
      box.innerHTML = chips.map(c => `<span class="chip">${c}</span>`).join('');
    }
    rec(t, levelName) {
      this.$('rec-time').textContent = U.fmtTime(t).padStart(8, '0:0');
      this.$('rec-level').textContent = levelName || '';
    }
    fps(v) { this.$('fps').textContent = t('hud.fps', { n: v }); }
    powerTimer(tm) {
      const e = this.$('power-timer');
      e.hidden = tm <= 0;
      if (tm > 0) e.textContent = t('hud.power', { t: tm.toFixed(1) });
    }

    // ---------------------------------------------------------- belgeler
    showNote(id, onClose, fromArchive) {
      const n = ST.note(id);
      if (!n) { onClose && onClose(); return; }
      const box = this.$('note-paper');
      // Who wrote it decides the hand and the ink; how it was kept decides the paper (tape, folds, stains)
      const hand = handOf(n), rr = PB.U.rng(PB.U.hashStr(n.id || n.title || 'doc'));
      const deco = [];
      box.className = 'paper kind-' + n.kind + (hand ? ' hand-' + hand : '');
      box.style.setProperty('--tilt', ((rr() - 0.5) * 2.2).toFixed(2) + 'deg');
      if (/^(note|diary|drawing|card)$/.test(n.kind) && /tape|bant|taped|stuck|yapıştır/i.test(n.title)) deco.push('<i class="tape t1"></i><i class="tape t2"></i>');
      if (/^(letter|notice|report|printout)$/.test(n.kind)) deco.push('<i class="fold f1"></i><i class="fold f2"></i>');
      if (/^(note|letter|diary|card|report|notice|printout)$/.test(n.kind) && rr() < 0.55) deco.push(`<i class="stain" style="left:${(55 + rr() * 30).toFixed(0)}%;top:${(8 + rr() * 60).toFixed(0)}%"></i>`);
      if (n.kind === 'tape') deco.push('<div class="cassette"><i class="reel l"></i><i class="reel r"></i><b class="clabel"></b></div>');
      if (n.kind === 'phone') deco.push('<div class="lcd"><b>1</b><span>MSG</span></div>');
      const meta = [n.from, n.date].filter(Boolean).map(esc).join(' · ');
      if (/^(note|card)$/.test(n.kind) && /yellow|sticky|sarı|yapışkan/i.test(n.title)) box.classList.add('sticky');
      box.innerHTML = deco.join('') + `<header><span class="nk">${esc(kindLabel(n.kind))}</span><h2>${esc(n.title)}</h2>${meta ? `<p class="meta">${meta}</p>` : ''}</header><div class="nb">${bodyHTML(n)}</div>`;
      const cl = box.querySelector('.clabel'); if (cl) cl.textContent = n.title.replace(/^[^:]*:\s*/, '').replace(/"/g, '');
      if (n.kind === 'photo') {
        box.insertAdjacentHTML('afterbegin', `<canvas class="photo" width="640" height="480"></canvas>`);
        const c = box.querySelector('canvas'); c.getContext('2d').drawImage(PB.Tex.photo(n.photo || 'arch', n.id).userData.canvas, 0, 0, 640, 480);
      }
      if (n.kind === 'drawing' && PB.Tex.drawing) {
        box.insertAdjacentHTML('afterbegin', `<canvas class="drawing" width="400" height="300"></canvas>`);
        const c = box.querySelector('canvas'); c.getContext('2d').drawImage(PB.Tex.drawing(n.drawing || 1, PB.Tex.drawingCaption(n.body)).userData.canvas, 0, 0, 400, 300);
      }
      this.$('note-close').onclick = () => { this.hide('scr-note'); onClose && onClose(); };
      this.$('note-close').textContent = fromArchive ? t('common.back') : (this.touch ? t('note.close') : t('note.closeKey'));
      this.show('scr-note');
      box.scrollTop = 0;
      if (this.g.audio) (n.kind === 'tape' ? this.g.audio.click() : this.g.audio.paper());
      // Tapes, screens and phone messages type themselves out
      if (n.kind === 'tape' || n.kind === 'screen' || n.kind === 'phone') {
        const nb = box.querySelector('.nb');
        const full = n.body;
        let i = 0;
        clearInterval(this.typeT);
        nb.innerHTML = '';
        this.typeT = setInterval(() => {
          i = Math.min(full.length, i + 3);
          nb.innerHTML = esc(full.slice(0, i)).replace(/\n/g, '<br>') + (i < full.length ? '<span class="caret">▌</span>' : '');
          if (i >= full.length) clearInterval(this.typeT);
        }, 16);
        this.finishType = () => { clearInterval(this.typeT); nb.innerHTML = esc(full).replace(/\n/g, '<br>'); };
      } else this.finishType = null;
    }
    // ---------------------------------------------------------- tuş takımı
    showKeypad(onSubmit, onClose, len = 4) {
      let code = '';
      const disp = this.$('kp-display');
      const draw = (msg) => { disp.textContent = msg || (code.padEnd(len, '_').split('').join(' ')); };
      draw();
      const grid = this.$('kp-grid');
      grid.innerHTML = '';
      let done = false;
      const press = k => {
        if (done) return;
        disp.classList.remove('err');
        if (k === 'C') code = code.slice(0, -1);
        else if (k === 'OK') {
          if (code.length < len) { this.g.audio && this.g.audio.beep(false); return; }
          const ok = onSubmit(code);
          this.g.audio && this.g.audio.beep(ok);
          code = '';
          if (ok) { done = true; draw(t('kp.open')); disp.classList.add('ok'); setTimeout(() => { close(); }, 700); }
          else { draw(t('kp.error')); disp.classList.add('err'); }
          return;
        } else if (code.length < len) code += k;
        this.g.audio && this.g.audio.beep();
        draw();
      };
      for (const k of ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'OK']) {
        const b = document.createElement('button');
        b.textContent = k === 'C' ? t('kp.clear') : k === 'OK' ? t('kp.enter') : k;
        b.addEventListener('click', () => press(k));
        grid.appendChild(b);
      }
      const keyH = e => {
        let handled = true;
        if (/^Digit\d$|^Numpad\d$/.test(e.code)) press(e.code.slice(-1));
        else if (e.code === 'Backspace') press('C');
        else if (e.code === 'Enter' || e.code === 'NumpadEnter') press('OK');
        else if (e.code === 'Escape') close();
        else handled = false;
        if (handled) { e.preventDefault(); e.stopPropagation(); }
      };
      const close = () => { document.removeEventListener('keydown', keyH, true); disp.classList.remove('ok'); disp.classList.remove('err'); this.hide('scr-keypad'); onClose && onClose(); };
      document.addEventListener('keydown', keyH, true);
      this.$('kp-close').onclick = close;
      this.show('scr-keypad');
      setTimeout(() => { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); }, 40);
    }
    // ---------------------------------------------------------- map: a surveyor's floor plan on old drafting paper
    drawMap(g, opts = {}) {
      const c = this.$('map-canvas'), L = g.level;
      if (!L) return;
      this.$('map-close').textContent = this.touch ? t('map.close') : t('map.closeKey');
      const box = c.parentElement.getBoundingClientRect();
      const pad = 2;
      const cs = Math.max(4, Math.floor(Math.min((box.width - 20) / (L.w + pad * 2), (box.height - 20) / (L.h + pad * 2))));
      const W = (L.w + pad * 2) * cs, H = (L.h + pad * 2) * cs;
      const dpr = Math.min(2, root.devicePixelRatio || 1);
      c.width = W * dpr; c.height = H * dpr;
      c.style.width = W + 'px'; c.style.height = H + 'px';
      const x = c.getContext('2d');
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r = U.rng(L.seed || 7);
      // paper: warm stock, fibres, a pale blue drafting grid, foxing at the edges
      x.fillStyle = '#e6dcc4'; x.fillRect(0, 0, W, H);
      for (let k = 0; k < W * H / 60; k++) { x.fillStyle = `rgba(${120 + r() * 60 | 0},${100 + r() * 40 | 0},70,${r() * 0.06})`; x.fillRect(r() * W, r() * H, 1 + r() * 2, 1); }
      x.strokeStyle = 'rgba(70,110,160,0.13)'; x.lineWidth = 1;
      x.beginPath();
      for (let k = 0; k <= L.w + pad * 2; k++) { x.moveTo(k * cs + 0.5, 0); x.lineTo(k * cs + 0.5, H); }
      for (let k = 0; k <= L.h + pad * 2; k++) { x.moveTo(0, k * cs + 0.5); x.lineTo(W, k * cs + 0.5); }
      x.stroke();
      const vg = x.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(110,70,20,0.35)');
      x.fillStyle = vg; x.fillRect(0, 0, W, H);
      x.save(); x.translate(pad * cs, pad * cs);
      const ex = g.explored || new Uint8Array(L.w * L.h);
      const seen = i => opts.all || ex[i];
      // floors of explored cells, a soft wash that changes a little from zone to zone; water is blue
      const tones = ['rgba(150,130,95,0.22)', 'rgba(130,125,110,0.22)', 'rgba(160,120,90,0.2)', 'rgba(120,130,125,0.2)'];
      for (let y = 0; y < L.h; y++) for (let xx = 0; xx < L.w; xx++) {
        const i = L.i(xx, y);
        if (!seen(i) || L.solid[i]) continue;
        x.fillStyle = L.floorType[i] === 1 ? 'rgba(70,120,170,0.35)' : tones[(L.zone[i] || 0) % tones.length];
        x.fillRect(xx * cs, y * cs, cs + 0.5, cs + 0.5);
      }
      // pillars and solid blocks inside explored space: cross-hatched
      x.strokeStyle = 'rgba(40,36,34,0.55)'; x.lineWidth = 1;
      for (let y = 0; y < L.h; y++) for (let xx = 0; xx < L.w; xx++) {
        const i = L.i(xx, y);
        if (!L.solid[i] || L.solid[i] === 9) continue;
        let near = false;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = xx + dx, ny = y + dy; if (L.inb(nx, ny) && !L.solid[L.i(nx, ny)] && seen(L.i(nx, ny))) near = true; }
        if (!near && !opts.all) continue;
        x.fillStyle = 'rgba(60,54,48,0.35)'; x.fillRect(xx * cs, y * cs, cs, cs);
        x.beginPath(); for (let k = -cs; k < cs; k += Math.max(3, cs / 3)) { x.moveTo(xx * cs + Math.max(0, k), y * cs + Math.max(0, -k)); x.lineTo(xx * cs + Math.min(cs, cs + k), y * cs + Math.min(cs, cs - k)); } x.stroke();
      }
      // walls: heavy graphite strokes with a slight hand wobble
      const wob = () => (r() - 0.5) * cs * 0.025;
      x.strokeStyle = '#2b2724'; x.lineWidth = Math.max(1.6, cs * 0.2); x.lineCap = 'square';
      x.beginPath();
      for (let y = 0; y < L.h; y++) for (let xx = 0; xx < L.w; xx++) {
        const i = L.i(xx, y);
        if (!seen(i) || L.solid[i]) continue;
        if (L.edgeKind(xx, y, 0)) { x.moveTo(xx * cs, y * cs + wob()); x.lineTo((xx + 1) * cs, y * cs + wob()); }
        if (L.edgeKind(xx, y, 3)) { x.moveTo(xx * cs + wob(), y * cs); x.lineTo(xx * cs + wob(), (y + 1) * cs); }
        if (L.edgeKind(xx, y, 2)) { x.moveTo(xx * cs, (y + 1) * cs + wob()); x.lineTo((xx + 1) * cs, (y + 1) * cs + wob()); }
        if (L.edgeKind(xx, y, 1)) { x.moveTo((xx + 1) * cs + wob(), y * cs); x.lineTo((xx + 1) * cs + wob(), (y + 1) * cs); }
        // outer face of walls that border solid space
        for (const [d, dx, dy] of [[0, 0, -1], [2, 0, 1], [3, -1, 0], [1, 1, 0]]) {
          const nx = xx + dx, ny = y + dy;
          if (L.inb(nx, ny) && L.solid[L.i(nx, ny)] && !L.edgeKind(xx, y, d)) {
            if (d === 0) { x.moveTo(xx * cs, y * cs); x.lineTo((xx + 1) * cs, y * cs); }
            if (d === 2) { x.moveTo(xx * cs, (y + 1) * cs); x.lineTo((xx + 1) * cs, (y + 1) * cs); }
            if (d === 3) { x.moveTo(xx * cs, y * cs); x.lineTo(xx * cs, (y + 1) * cs); }
            if (d === 1) { x.moveTo((xx + 1) * cs, y * cs); x.lineTo((xx + 1) * cs, (y + 1) * cs); }
          }
        }
      }
      x.stroke();
      // doors: the leaf drawn open with its swing, the way an architect draws them; locked ones in red
      for (const d of L.doors) {
        if (!seen(L.i(d.x, d.y))) continue;
        const locked = d.locked && !d.open;
        const col = locked ? '#b0201c' : '#2b2724';
        let hx, hy, ax, ay; // hinge, and the direction along the opening
        if (d.d === 0 || d.d === 2) { hx = d.x * cs; hy = (d.d === 0 ? d.y : d.y + 1) * cs; ax = 1; ay = 0; }
        else { hx = (d.d === 3 ? d.x : d.x + 1) * cs; hy = d.y * cs; ax = 0; ay = 1; }
        const inx = d.d === 1 ? -1 : d.d === 3 ? 1 : 0, iny = d.d === 2 ? -1 : d.d === 0 ? 1 : 0;
        // clear the wall behind the opening
        x.strokeStyle = '#e6dcc4'; x.lineWidth = Math.max(2, cs * 0.24); x.beginPath(); x.moveTo(hx + ax * cs * 0.08, hy + ay * cs * 0.08); x.lineTo(hx + ax * cs * 0.92, hy + ay * cs * 0.92); x.stroke();
        x.strokeStyle = col; x.lineWidth = Math.max(1, cs * 0.08);
        x.beginPath(); x.moveTo(hx, hy); x.lineTo(hx + inx * cs * 0.85, hy + iny * cs * 0.85); x.stroke();
        x.setLineDash([Math.max(2, cs * 0.12), Math.max(2, cs * 0.1)]);
        x.beginPath();
        const a0 = Math.atan2(iny, inx); let da = Math.atan2(ay, ax) - a0;
        while (da > Math.PI) da -= 2 * Math.PI; while (da <= -Math.PI) da += 2 * Math.PI;
        x.arc(hx, hy, cs * 0.85, a0, a0 + da, da < 0);
        x.stroke(); x.setLineDash([]);
        if (locked) { const mx = hx + ax * cs * 0.5, my = hy + ay * cs * 0.5; x.fillStyle = col; x.fillRect(mx - cs * 0.14, my - cs * 0.1, cs * 0.28, cs * 0.22); x.strokeStyle = col; x.lineWidth = Math.max(1, cs * 0.06); x.beginPath(); x.arc(mx, my - cs * 0.1, cs * 0.1, Math.PI, 0); x.stroke(); }
      }
      // known things: pencil-ringed dots
      for (const it of g.items || []) {
        if (it.taken || !it.marker || !seen(L.i(it.item.x, it.item.y))) continue;
        const px = it.pos.x / L.cell * cs, py = it.pos.z / L.cell * cs, rr = Math.max(2.8, cs * 0.26);
        x.fillStyle = it.marker; x.beginPath(); x.arc(px, py, rr, 0, Math.PI * 2); x.fill();
        x.strokeStyle = 'rgba(30,26,24,0.85)'; x.lineWidth = 1.2; x.stroke();
      }
      // security cameras: what they can see
      if (opts.entities) for (const e of g.entities) {
        if (!e.mesh.visible && e.kind !== 'eater') continue;
        x.fillStyle = e.kind === 'eater' ? '#8a1010' : e.kind === 'ghost' ? ST.charColor(ST.ghostChar(e.type)) : '#3a3a3a';
        x.beginPath(); x.arc(e.pos.x / L.cell * cs, e.pos.z / L.cell * cs, cs * 0.42, 0, Math.PI * 2); x.fill();
        x.strokeStyle = '#1a0a0a'; x.lineWidth = 1.5; x.stroke();
      }
      // you: a red arrow with a faint cone of view
      const p = g.player.pos;
      x.save(); x.translate(p.x / L.cell * cs, p.z / L.cell * cs); x.rotate(-g.player.yaw);
      const cone = x.createRadialGradient(0, 0, 0, 0, 0, cs * 3); cone.addColorStop(0, 'rgba(190,30,20,0.25)'); cone.addColorStop(1, 'rgba(190,30,20,0)');
      x.fillStyle = cone; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, cs * 3, -Math.PI / 2 - 0.5, -Math.PI / 2 + 0.5); x.closePath(); x.fill();
      x.fillStyle = '#c0231a'; x.strokeStyle = '#fff6e8'; x.lineWidth = 1.5;
      x.beginPath(); x.moveTo(0, -cs * 0.75); x.lineTo(cs * 0.48, cs * 0.5); x.lineTo(0, cs * 0.25); x.lineTo(-cs * 0.48, cs * 0.5); x.closePath(); x.fill(); x.stroke();
      x.restore();
      x.restore();
      // compass and a scale bar in the corner, drawn like a stamp
      const cx0 = W - cs * 1.05, cy0 = cs * 1.15, R = cs * 0.62;
      x.strokeStyle = 'rgba(40,36,34,0.8)'; x.fillStyle = 'rgba(40,36,34,0.8)'; x.lineWidth = 1.2;
      x.beginPath(); x.arc(cx0, cy0, R, 0, Math.PI * 2); x.stroke();
      x.beginPath(); x.moveTo(cx0, cy0 - R * 0.95); x.lineTo(cx0 + R * 0.22, cy0); x.lineTo(cx0, cy0 + R * 0.95); x.lineTo(cx0 - R * 0.22, cy0); x.closePath(); x.stroke();
      x.beginPath(); x.moveTo(cx0, cy0 - R * 0.95); x.lineTo(cx0 + R * 0.22, cy0); x.lineTo(cx0 - R * 0.22, cy0); x.closePath(); x.fill();
      x.font = `${Math.max(9, cs * 0.5)}px ${getComputedStyle(document.body).getPropertyValue('--term') || 'monospace'}`; x.textAlign = 'center'; x.fillText('N', cx0, cy0 - R - 2);
      const sb = 10 / L.cell * cs, sx = cs * 0.6, sy = H - cs * 0.7;
      x.fillRect(sx, sy, sb / 2, 3); x.strokeRect(sx, sy, sb, 3); x.textAlign = 'left'; x.fillText('10 m', sx + sb + 6, sy + 4);
      const lv = g.levelDef;
      this.$('map-title').textContent = lv ? `${lv.name} — ${lv.title}` : '';
    }
    // ---------------------------------------------------------- ölüm
    showDeath(kind, onRetry, onMenu) {
      const d = ST.death(kind);
      this.$('death-title').textContent = d[0];
      this.$('death-tip').textContent = d[1];
      this.$('death-retry').onclick = onRetry;
      this.$('death-menu').onclick = onMenu;
      this.only('scr-death');
    }
    // ---------------------------------------------------------- bölüm kartı
    showCard(L, done) {
      this.$('card-name').textContent = L.name;
      this.$('card-title').textContent = L.title;
      this.$('card-place').textContent = L.place;
      const intro = this.$('card-intro');
      intro.textContent = '';
      this.show('scr-card');
      let i = 0;
      clearInterval(this.cardT);
      this.cardT = setInterval(() => { i += 2; intro.textContent = L.intro.slice(0, i); if (i >= L.intro.length) clearInterval(this.cardT); }, 28);
      let closed = false;
      const close = () => { if (closed) return; closed = true; clearInterval(this.cardT); document.removeEventListener('keydown', key); this.$('scr-card').removeEventListener('click', close); this.$('scr-card').classList.add('fadeout'); setTimeout(() => { this.hide('scr-card'); this.$('scr-card').classList.remove('fadeout'); done(); }, 700); };
      const key = e => { if (['Enter', 'Space', 'KeyE', 'Escape'].includes(e.code)) close(); };
      setTimeout(() => { document.addEventListener('keydown', key); this.$('scr-card').addEventListener('click', close); }, 400);
      this.cardAuto = setTimeout(close, 5200 + L.intro.length * 20);
    }
    // ---------------------------------------------------------- son
    showEnding(kind, stats, onDone) {
      const E = ST.ending(kind);
      this.$('end-title').textContent = E.title;
      this.$('end-sub').textContent = E.subtitle;
      const box = this.$('end-lines');
      box.innerHTML = '';
      this.only('scr-ending');
      this.$('end-stats').hidden = true;
      this.$('end-credits').innerHTML = '';
      this.$('end-menu').hidden = true;
      this.$('end-skip').hidden = false;
      let k = 0;
      const next = () => {
        if (k < E.lines.length) {
          const p = document.createElement('p'); p.textContent = E.lines[k++]; box.appendChild(p);
          requestAnimationFrame(() => { p.classList.add('in'); p.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }); });
          this.endT = setTimeout(next, 3200);
        } else {
          const st = this.$('end-stats');
          st.innerHTML = `<div><b>${U.fmtTime(stats.time)}</b><span>${esc(t('end.time'))}</span></div><div><b>${stats.deaths}</b><span>${esc(t('end.deaths'))}</span></div><div><b>${stats.notes} / ${ST.noteCount()}</b><span>${esc(t('end.docs'))}</span></div><div><b>${stats.freed} / 4</b><span>${esc(t('end.freed'))}</span></div><div><b>${stats.drawings || 0} / ${ST.drawingCount()}</b><span>${esc(t('end.drawings'))}</span></div>`;
          st.hidden = false;
          st.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const cr = this.$('end-credits');
          cr.innerHTML = ST.credits().map(c => `<p><b>${esc(c[0])}</b>${c[1] ? `<span>${esc(c[1])}</span>` : ''}</p>`).join('');
          this.$('end-menu').hidden = false;
          this.$('end-skip').hidden = true;
          this.$('end-menu').onclick = onDone;
          this.focusFirst(this.$('scr-ending'));
        }
      };
      this.endT = setTimeout(next, 1500);
      this.$('end-skip').onclick = () => { clearTimeout(this.endT); while (k < E.lines.length) { const p = document.createElement('p'); p.className = 'in'; p.textContent = E.lines[k++]; box.appendChild(p); } next(); };
    }
    // ---------------------------------------------------------- choice
    showChoice(options, onCancel) {
      const box = this.$('choice-list');
      box.innerHTML = '';
      for (const o of options) {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = o.label;
        b.addEventListener('click', () => o.fn());
        box.appendChild(b);
      }
      const back = document.createElement('button');
      back.type = 'button'; back.className = 'ghost'; back.dataset.action = 'back'; back.textContent = t('choice.back');
      back.addEventListener('click', () => onCancel());
      box.appendChild(back);
      this.show('scr-choice');
    }
    hideChoice() { this.hide('scr-choice'); }
    // ---------------------------------------------------------- dokunmatik
    buildTouch() {
      const t = this.$('touch');
      t.hidden = !this.touch;
      if (this.touch && !this.touchBound) { this.g.input.bindTouch(this); this.touchBound = true; }
    }
  }
  // Narration inside a document (what you see rather than what is written: "(It was never mailed.)",
  // "Written on the back in pencil:", a drawing's description) is set apart from the writing itself
  const NARR = /^(handwritten|written|someone|somebody|underneath|under it|on the back|in the margin|across|stapled|clipped|a jar|the (next|tape|letter|printout|page)|el yazısı|yazılmış|birisi|biri |altına|altında|arkasında|kenarında|üstüne|zımbala|iliştiril|raftaki|sonraki sayfa|kaset|mektup)/i;
  function bodyHTML(n) {
    const paras = String(n.body || '').split(/\n\s*\n/);
    return paras.map((p, i) => {
      const t = p.trim();
      const narr = (n.kind === 'drawing' && i === 0) || (/^\(.*\)$/s.test(t) && /^\((you|the|it|he|she|they|someone|a |sen|bu|o |onu|biri)/i.test(t)) || (NARR.test(t) && /:\s*$/.test(t.split('\n')[0]));
      return `<p class="${narr ? 'narr' : 'w'}">${esc(p).replace(/\n/g, '<br>')}</p>`;
    }).join('');
  }
  // Handwriting by author (the "from" line, in any language)
  function handOf(n) {
    if (!/^(note|letter|diary|card|drawing|wall|flyer)$/.test(n.kind)) return null;
    const f = String(n.from || '');
    if (/lily/i.test(f)) return 'lily';
    if (/eddie|^e\.?$/i.test(f)) return 'eddie';
    if (/^w\b|^w\.|walt/i.test(f)) return 'walt';
    if (/rosie/i.test(f)) return 'rosie';
    if (/toby/i.test(f)) return 'toby';
    if (/danny/i.test(f)) return 'danny';
    if (/theo/i.test(f)) return 'theo';
    if (/^sam\b/i.test(f)) return 'sam';
    if (/june|maggie|carol|nora|ruth|ray/i.test(f)) return 'adult';
    return n.kind === 'wall' ? 'wall' : null;
  }
  function kindLabel(k) { const s = t('kind.' + k); return s === 'kind.' + k ? t('kind.doc') : s; }
  UI.handOf = handOf;
  PB.UI = UI;
})(typeof window !== 'undefined' ? window : globalThis);
