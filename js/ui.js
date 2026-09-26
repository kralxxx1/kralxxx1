/* Arayüz: menüler, ayarlar, HUD, not okuyucu, harita, tuş takımı, ölüm/son ekranları, dokunmatik kontroller. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U, S = PB.Settings, ST = PB.Story;
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
      const fps = this.$('fps'); if (fps) fps.hidden = !d.showFps;
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
    // ---------------------------------------------------------- ayarlar
    buildSettings(onBack) {
      const tabs = this.$('set-tabs'), body = this.$('set-body');
      tabs.innerHTML = '';
      let cur = this.setTab || 'screen';
      const render = (relabel) => {
        if (relabel) for (const b of tabs.children) b.textContent = t('tab.' + b.dataset.tab);
        body.innerHTML = '';
        for (const s of S.SCHEMA.filter(x => x.tab === cur)) body.appendChild(this.settingRow(s));
        for (const b of tabs.children) b.classList.toggle('on', b.dataset.tab === cur);
      };
      for (const id of S.TABS) {
        const b = document.createElement('button');
        b.textContent = t('tab.' + id); b.dataset.tab = id;
        b.addEventListener('click', () => { cur = this.setTab = id; render(); });
        tabs.appendChild(b);
      }
      render();
      this.$('set-reset').onclick = () => { S.reset(); render(); };
      this.$('set-back').onclick = onBack;
      this.renderSettings = render;
    }
    settingRow(s) {
      const row = document.createElement('div');
      row.className = 'set-row';
      const id = 'set-' + s.key;
      const v = S.get(s.key);
      let ctl = '';
      if (s.type === 'range') ctl = `<input type="range" id="${id}" min="${s.min}" max="${s.max}" step="${s.step}" value="${v}"><output>${esc(s.fmt ? s.fmt(v) : v)}</output>`;
      else if (s.type === 'toggle') ctl = `<button type="button" class="toggle" id="${id}" aria-pressed="${!!v}">${v ? t('common.on') : t('common.off')}</button>`;
      else ctl = `<select id="${id}">${s.options.map(o => `<option value="${esc(o[0])}"${String(o[0]) === String(v) ? ' selected' : ''}>${esc(t(o[1]))}</option>`).join('')}</select>`;
      const helpKey = 'set.' + s.key + '.help', help = t(helpKey);
      row.innerHTML = `<label for="${id}">${esc(t('set.' + s.key))}${s.reload ? ' <em>*</em>' : ''}</label><div class="ctl">${ctl}</div>${help !== helpKey ? `<p class="help">${esc(help)}</p>` : ''}`;
      const input = row.querySelector('#' + id);
      if (s.type === 'range') {
        input.addEventListener('input', () => { S.set(s.key, +input.value); row.querySelector('output').textContent = s.fmt ? s.fmt(S.get(s.key)) : S.get(s.key); if (S.PRESET_KEYS.includes(s.key)) this.syncPresetSelect(); });
      } else if (s.type === 'toggle') {
        input.addEventListener('click', () => { S.set(s.key, !S.get(s.key)); input.setAttribute('aria-pressed', String(S.get(s.key))); input.textContent = S.get(s.key) ? t('common.on') : t('common.off'); });
      } else {
        input.addEventListener('change', () => { const o = s.options.find(q => String(q[0]) === input.value); S.set(s.key, o ? o[0] : input.value); if (s.key === 'preset') this.renderSettings(); else if (s.key !== 'lang') this.syncPresetSelect(); });
      }
      return row;
    }
    syncPresetSelect() { const p = this.$('set-preset'); if (p) p.value = S.get('preset'); }

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
      box.className = 'paper kind-' + n.kind;
      const meta = [n.from, n.date].filter(Boolean).map(esc).join(' · ');
      box.innerHTML = `<header><span class="nk">${esc(kindLabel(n.kind))}</span><h2>${esc(n.title)}</h2>${meta ? `<p class="meta">${meta}</p>` : ''}</header><div class="nb">${esc(n.body).replace(/\n/g, '<br>')}</div>`;
      if (n.kind === 'photo') {
        box.insertAdjacentHTML('afterbegin', `<canvas class="photo" width="320" height="240"></canvas>`);
        const c = box.querySelector('canvas'); c.getContext('2d').drawImage(PB.Tex.photo(n.photo || 'arch', n.id).userData.canvas, 0, 0);
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
    // ---------------------------------------------------------- harita (klasik labirent görünümünde)
    drawMap(g, opts = {}) {
      const c = this.$('map-canvas'), L = g.level;
      if (!L) return;
      this.$('map-close').textContent = this.touch ? t('map.close') : t('map.closeKey');
      const box = c.parentElement.getBoundingClientRect();
      const cs = Math.max(4, Math.floor(Math.min((box.width - 20) / L.w, (box.height - 20) / L.h)));
      const dpr = Math.min(2, root.devicePixelRatio || 1);
      c.width = L.w * cs * dpr; c.height = L.h * cs * dpr;
      c.style.width = L.w * cs + 'px'; c.style.height = L.h * cs + 'px';
      const x = c.getContext('2d');
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      x.fillStyle = '#000'; x.fillRect(0, 0, L.w * cs, L.h * cs);
      const ex = g.explored || new Uint8Array(L.w * L.h);
      const seen = i => opts.all || ex[i];
      x.fillStyle = 'rgba(255,184,174,0.07)';
      for (let y = 0; y < L.h; y++) for (let xx = 0; xx < L.w; xx++) { const i = L.i(xx, y); if (seen(i) && !L.solid[i]) x.fillRect(xx * cs, y * cs, cs, cs); }
      x.strokeStyle = '#2b2bff'; x.lineWidth = Math.max(1, cs * 0.14); x.lineCap = 'round';
      x.shadowColor = '#3d3dff'; x.shadowBlur = cs * 0.6;
      x.beginPath();
      for (let y = 0; y < L.h; y++) for (let xx = 0; xx < L.w; xx++) {
        const i = L.i(xx, y);
        if (!seen(i)) continue;
        if (L.solid[i] && L.solid[i] !== 9) { x.rect(xx * cs + cs * 0.2, y * cs + cs * 0.2, cs * 0.6, cs * 0.6); continue; }
        if (L.edgeKind(xx, y, 0)) { x.moveTo(xx * cs, y * cs); x.lineTo((xx + 1) * cs, y * cs); }
        if (L.edgeKind(xx, y, 3)) { x.moveTo(xx * cs, y * cs); x.lineTo(xx * cs, (y + 1) * cs); }
        if (L.edgeKind(xx, y, 2)) { x.moveTo(xx * cs, (y + 1) * cs); x.lineTo((xx + 1) * cs, (y + 1) * cs); }
        if (L.edgeKind(xx, y, 1)) { x.moveTo((xx + 1) * cs, y * cs); x.lineTo((xx + 1) * cs, (y + 1) * cs); }
      }
      x.stroke();
      x.shadowBlur = 0;
      // Kapılar
      for (const d of L.doors) {
        if (!seen(L.i(d.x, d.y))) continue;
        x.strokeStyle = d.locked ? '#ff4040' : '#ffb8de'; x.lineWidth = Math.max(2, cs * 0.25);
        x.beginPath();
        if (d.d === 0 || d.d === 2) { const yy = (d.d === 0 ? d.y : d.y + 1) * cs; x.moveTo(d.x * cs + cs * 0.2, yy); x.lineTo((d.x + 1) * cs - cs * 0.2, yy); }
        else { const xx = (d.d === 3 ? d.x : d.x + 1) * cs; x.moveTo(xx, d.y * cs + cs * 0.2); x.lineTo(xx, (d.y + 1) * cs - cs * 0.2); }
        x.stroke();
      }
      // Bilinen önemli eşyalar
      for (const it of g.items || []) {
        if (it.taken || !it.marker || !seen(L.i(it.item.x, it.item.y))) continue;
        x.fillStyle = it.marker;
        x.beginPath(); x.arc(it.pos.x / L.cell * cs, it.pos.z / L.cell * cs, Math.max(2.5, cs * 0.28), 0, Math.PI * 2); x.fill();
      }
      // Kamera ekranı: yaratıklar
      if (opts.entities) for (const e of g.entities) {
        if (!e.mesh.visible && e.kind !== 'pacman') continue;
        x.fillStyle = e.kind === 'pacman' ? '#ffd21a' : e.kind === 'ghost' ? ST.charColor(ST.ghostChar(e.type)) : '#cccccc';
        x.beginPath(); x.arc(e.pos.x / L.cell * cs, e.pos.z / L.cell * cs, cs * 0.45, 0, Math.PI * 2); x.fill();
      }
      // Oyuncu oku
      const p = g.player.pos;
      x.save(); x.translate(p.x / L.cell * cs, p.z / L.cell * cs); x.rotate(-g.player.yaw);
      x.fillStyle = '#ffff00'; x.beginPath(); x.moveTo(0, -cs * 0.7); x.lineTo(cs * 0.45, cs * 0.45); x.lineTo(-cs * 0.45, cs * 0.45); x.closePath(); x.fill();
      x.restore();
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
  function kindLabel(k) { const s = t('kind.' + k); return s === 'kind.' + k ? t('kind.doc') : s; }
  PB.UI = UI;
})(typeof window !== 'undefined' ? window : globalThis);
