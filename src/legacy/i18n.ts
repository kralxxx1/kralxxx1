/* Language core. The game ships in two languages: English (the main one) and Turkish. Text packs
   register themselves per language and section ('ui', 'story'). Missing keys fall back to English.
   (TypeScript; the packs in text/<lang>/ are plain data files that call PB.I18N.register.) */
import type { I18nApi, PBNamespace, Vars } from '../types/pb';

type Tree = Record<string, any>;
const root = (typeof window !== 'undefined' ? window : globalThis) as unknown as {
  PB?: PBNamespace; localStorage?: Storage; navigator?: Navigator; document?: Document;
};
const PB: PBNamespace = root.PB || (root.PB = {} as PBNamespace);

const PACKS: Record<string, Record<string, Tree>> = {};
const listeners: Array<(lang: string) => void> = [];
const STORE = 'pb.lang';

// Plain objects merge recursively; arrays and strings replace
function merge(dst: Tree, src: Tree): Tree {
  for (const k of Object.keys(src)) {
    const v = src[k];
    if (v && typeof v === 'object' && !Array.isArray(v) && dst[k] && typeof dst[k] === 'object' && !Array.isArray(dst[k])) merge(dst[k], v);
    else dst[k] = v;
  }
  return dst;
}
function fill(s: string, vars: Vars): string {
  return String(s).replace(/\{(\w+)\}/g, (m, k: string) => (vars[k] !== undefined && vars[k] !== null ? String(vars[k]) : m));
}

const I18N: I18nApi = {
  // Every language the game ships with, by its own name. Packs register themselves; a language with no
  // pack loaded is left out of the menus (see available()).
  LANGS: [['en', 'English'], ['tr', 'Türkçe']],
  lang: 'en',
  available() { return this.LANGS.filter(l => PACKS[l[0]]); },
  // The player's own language, the first time the game starts
  detect() {
    const nav = root.navigator;
    const want: Array<string | undefined> = (nav && (nav.languages ? [...nav.languages] : [nav.language])) || [];
    const ids = this.available().map(l => l[0]);
    for (const w of want) {
      if (!w) continue;
      const exact = ids.find(id => id.toLowerCase() === w.toLowerCase());
      if (exact) return exact;
      const base = w.split('-')[0].toLowerCase();
      const near = ids.find(id => id.split('-')[0].toLowerCase() === base);
      if (near) return near;
    }
    return 'en';
  },
  register(lang, section, obj) {
    const p = PACKS[lang] || (PACKS[lang] = {});
    p[section] = merge(p[section] || {}, obj as Tree);
  },
  section(section, lang) { return (PACKS[lang || this.lang] || {})[section] || {}; },
  // Nested lookup: 'story.docs.p_note.title' style paths inside a section
  raw(section, path, lang) {
    let o: any = this.section(section, lang);
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
  stored() { try { return root.localStorage ? root.localStorage.getItem(STORE) : null; } catch { return null; } },
  set(lang, persist = true) {
    if (!PACKS[lang]) lang = 'en';
    this.lang = lang;
    if (persist) { try { root.localStorage && root.localStorage.setItem(STORE, lang); } catch { /* storage optional */ } }
    if (root.document) {
      const html = root.document.documentElement;
      html.lang = lang; html.dir = 'ltr';
      if (PB.Fonts) PB.Fonts.use(lang);
      this.apply(root.document);
    }
    for (const fn of listeners) fn(lang);
  },
  onChange(fn) { listeners.push(fn); },
  // Static markup: data-t (text), data-t-html (trusted markup from our own packs), data-t-aria, data-t-title
  apply(scope) {
    if (!scope || !scope.querySelectorAll) return;
    for (const el of scope.querySelectorAll<HTMLElement>('[data-t]')) el.textContent = this.t(el.dataset.t as string);
    for (const el of scope.querySelectorAll<HTMLElement>('[data-t-html]')) el.innerHTML = this.t(el.dataset.tHtml as string);
    for (const el of scope.querySelectorAll<HTMLElement>('[data-t-aria]')) el.setAttribute('aria-label', this.t(el.dataset.tAria as string));
    for (const el of scope.querySelectorAll<HTMLElement>('[data-t-title]')) el.setAttribute('title', this.t(el.dataset.tTitle as string));
  },
};

PB.I18N = I18N;
PB.t = (k, v) => I18N.t(k, v);
