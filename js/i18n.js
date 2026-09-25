/* Language core. English is the main language, Turkish is the second. Text packs register
   themselves per language and section ('ui', 'story'). Missing keys fall back to English. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const PACKS = {};
  const listeners = [];
  const STORE = 'pb.lang';

  const I18N = PB.I18N = {
    LANGS: [['en', 'English'], ['tr', 'Türkçe']],
    lang: 'en',
    register(lang, section, obj) {
      const p = PACKS[lang] || (PACKS[lang] = {});
      p[section] = merge(p[section] || {}, obj);
    },
    section(section, lang) { return (PACKS[lang || this.lang] || {})[section] || {}; },
    // Nested lookup: 'story.docs.p_note.title' style paths inside a section
    raw(section, path, lang) {
      let o = this.section(section, lang);
      for (const k of path.split('.')) { if (o == null) return undefined; o = o[k]; }
      return o;
    },
    get(section, path) {
      const v = this.raw(section, path, this.lang);
      return v !== undefined ? v : this.raw(section, path, 'en');
    },
    // UI keys are flat strings that may contain dots ('set.preset')
    t(key, vars) {
      let s = this.section('ui')[key];
      if (s === undefined) s = this.section('ui', 'en')[key];
      if (s === undefined) s = key;
      return vars ? fill(s, vars) : s;
    },
    fill,
    has(lang) { return !!PACKS[lang]; },
    stored() { try { return root.localStorage ? root.localStorage.getItem(STORE) : null; } catch (e) { return null; } },
    set(lang, persist = true) {
      if (!PACKS[lang]) lang = 'en';
      this.lang = lang;
      if (persist) { try { root.localStorage && root.localStorage.setItem(STORE, lang); } catch (e) { /* storage optional */ } }
      if (root.document) { root.document.documentElement.lang = lang; this.apply(root.document); }
      for (const fn of listeners) fn(lang);
    },
    onChange(fn) { listeners.push(fn); },
    // Static markup: data-t (text), data-t-html (trusted markup from our own packs), data-t-aria, data-t-title
    apply(scope) {
      if (!scope || !scope.querySelectorAll) return;
      for (const el of scope.querySelectorAll('[data-t]')) el.textContent = this.t(el.dataset.t);
      for (const el of scope.querySelectorAll('[data-t-html]')) el.innerHTML = this.t(el.dataset.tHtml);
      for (const el of scope.querySelectorAll('[data-t-aria]')) el.setAttribute('aria-label', this.t(el.dataset.tAria));
      for (const el of scope.querySelectorAll('[data-t-title]')) el.setAttribute('title', this.t(el.dataset.tTitle));
    },
  };
  // Plain objects merge recursively; arrays and strings replace
  function merge(dst, src) {
    for (const k of Object.keys(src)) {
      const v = src[k];
      if (v && typeof v === 'object' && !Array.isArray(v) && dst[k] && typeof dst[k] === 'object' && !Array.isArray(dst[k])) merge(dst[k], v);
      else dst[k] = v;
    }
    return dst;
  }
  function fill(s, vars) {
    return String(s).replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined && vars[k] !== null ? vars[k] : m));
  }
  PB.t = (k, v) => I18N.t(k, v);
})(typeof window !== 'undefined' ? window : globalThis);
