/* Story access layer: localized views over the language packs and the chapter definitions.
   Document meta (kind, photo, drawing, clue) comes from English; text comes from the active language. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const I = PB.I18N, LV = PB.Levels;
  const st = path => I.get('story', path);
  const en = path => I.raw('story', path, 'en');

  const ST = PB.Story = {
    get LEVELS() { return LV.LEVELS; },
    GHOSTS: LV.GHOSTS,
    // Chapter definition merged with localized name/title/place/intro
    level(id) {
      const def = LV.byId(id);
      if (!def) return null;
      const c = st('chapters.' + id) || {};
      return Object.assign({}, def, { name: c.name || id.toUpperCase(), title: c.title || '', place: c.place || '', intro: c.intro || '' });
    },
    // Document: meta from English, text from the active language (falls back to English)
    note(id, lang) {
      const base = en('docs.' + id);
      if (!base) return null;
      const loc = (lang ? I.raw('story', 'docs.' + id, lang) : st('docs.' + id)) || {};
      return Object.assign({ id }, base, loc, { kind: base.kind || 'note' });
    },
    hasNote(id) { return !!en('docs.' + id); },
    noteIds() { return Object.keys(I.section('story', 'en').docs || {}); },
    // Chapter a document belongs to: the first chapter whose items reference it
    noteLevel(id) {
      for (const L of LV.LEVELS) { for (const it of L.items || []) if (it.data === id) return L.id; if ((L.extraDocs || []).includes(id)) return L.id; }
      return null;
    },
    placedNoteIds() {
      const out = [];
      for (const L of LV.LEVELS) {
        for (const it of L.items || []) if (it.data && en('docs.' + it.data) && !out.includes(it.data)) out.push(it.data);
        for (const d of L.extraDocs || []) if (en('docs.' + d) && !out.includes(d)) out.push(d);
      }
      return out;
    },
    noteCount() { return this.placedNoteIds().length; },
    obj(key, vars) { const s = st('obj.' + key); return s ? I.fill(s, vars || {}) : ''; },
    mono(key, vars) { const s = st('mono.' + key); return s ? I.fill(s, vars || {}) : ''; },
    line(key, vars) { const s = st('lines.' + key); return s !== undefined ? I.fill(s, vars || {}) : key; },
    radio(key) { return st('radio.' + key) || null; },
    speaker(id) { return st('speakers.' + id) || id.toUpperCase(); },
    char(id) { return st('chars.' + id) || { name: id, pos: id }; },
    memento(id) { return st('memento.' + id) || { name: id, line: '' }; },
    freedLines(id) { return st('freed.' + id) || []; },
    shrine(key, vars) { return I.fill(st('shrine.' + key) || '', vars || {}); },
    ghostHelp(key) { return st('ghostHelp.' + key) || ''; },
    death(kind) { return st('deaths.' + kind) || st('deaths.pacman'); },
    tips() { return st('tips') || []; },
    tip() { const t = this.tips(); return t.length ? t[Math.floor(Math.random() * t.length)] : ''; },
    ending(kind) { return st('endings.' + kind); },
    credits() { return st('credits') || []; },
    ghostChar(ghost) { return LV.GHOSTS[ghost] || null; },
    charColor(id) { return LV.CHAR_COLOR[id] || '#ffffff'; },
    drawingCount() { return 8; },
    recap(id) { return st('recap.' + id) || ''; },
    item(id) { return Object.assign({ name: id }, en('items.' + id) || {}, st('items.' + id) || {}); },
  };
})(typeof window !== 'undefined' ? window : globalThis);
