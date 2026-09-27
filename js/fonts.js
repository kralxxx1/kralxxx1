/* Fonts per language. The game's own faces (VT323, Press Start 2P, Caveat, Courier Prime and the
   handwriting set) cover the Latin alphabets. Russian, Chinese, Japanese, Korean and Arabic get faces
   in the same spirit (a pixel face for the terminal, a hand for letters and diaries), loaded only when
   that language is chosen. Offline (the desktop build without the web fonts) the system fonts listed
   after them take over, so the text is never missing. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const BASE = {
    term: '"VT323", ui-monospace, "Courier New", monospace',
    pix: '"Press Start 2P", ui-monospace, monospace',
    hand: '"Caveat", "Segoe Print", cursive',
    type: '"Courier Prime", "Courier New", monospace',
  };
  // css: the Google Fonts request; the rest: families put in front of the base stack for each role
  const CJK_SC = '"Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", "Source Han Sans SC"';
  const CJK_JP = '"Yu Gothic", "Meiryo", "Hiragino Sans", "Noto Sans CJK JP"';
  const CJK_KR = '"Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans CJK KR"';
  const ARAB = '"Segoe UI", "Tahoma", "Geeza Pro", "Noto Sans Arabic"';
  const FAM = {
    ru: {
      css: 'family=Pixelify+Sans:wght@400;600&family=Neucha&family=PT+Mono',
      term: '"Pixelify Sans"', pix: '"Press Start 2P"', hand: '"Caveat", "Neucha"', type: '"PT Mono"',
      sample: 'Ждать',
    },
    'zh-CN': {
      css: 'family=Noto+Sans+SC:wght@400;700&family=ZCOOL+QingKe+HuangYou&family=Long+Cang&family=ZCOOL+KuaiLe',
      term: '"Noto Sans SC", ' + CJK_SC, pix: '"ZCOOL QingKe HuangYou", ' + CJK_SC, hand: '"Long Cang", "ZCOOL KuaiLe", "KaiTi", "STKaiti", ' + CJK_SC, type: '"Noto Sans SC", ' + CJK_SC,
      sample: '游戏厅',
    },
    ja: {
      css: 'family=DotGothic16&family=Yomogi&family=Klee+One:wght@400;600',
      term: '"DotGothic16", ' + CJK_JP, pix: '"DotGothic16", ' + CJK_JP, hand: '"Klee One", "Yomogi", ' + CJK_JP, type: '"DotGothic16", ' + CJK_JP,
      sample: 'ゲームセンター',
    },
    ko: {
      css: 'family=Nanum+Gothic+Coding:wght@400;700&family=Do+Hyeon&family=Nanum+Pen+Script&family=Gaegu:wght@400;700',
      term: '"Nanum Gothic Coding", ' + CJK_KR, pix: '"Do Hyeon", ' + CJK_KR, hand: '"Nanum Pen Script", "Gaegu", ' + CJK_KR, type: '"Nanum Gothic Coding", ' + CJK_KR,
      sample: '오락실',
    },
    ar: {
      css: 'family=Noto+Kufi+Arabic:wght@400;700&family=Reem+Kufi:wght@400;700&family=Aref+Ruqaa:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700',
      term: '"Noto Kufi Arabic", ' + ARAB, pix: '"Reem Kufi", ' + ARAB, hand: '"Aref Ruqaa", "Noto Naskh Arabic", ' + ARAB, type: '"Noto Naskh Arabic", ' + ARAB,
      sample: 'صالة',
    },
  };
  const loaded = {};
  const Fonts = PB.Fonts = {
    BASE, FAM, lang: 'en',
    stack(role, lang) {
      const f = FAM[lang || this.lang];
      return f && f[role] ? f[role] + ', ' + BASE[role] : BASE[role];
    },
    // A canvas font string ('700 24px "Kalam", cursive') with the language's own faces added in front of
    // the generic family, so glyphs the handwriting face lacks come from a matching face, not a default one
    canvas(font, role = 'hand', lang) {
      const f = FAM[lang || this.lang];
      if (!f) return font;
      const extra = f[role] || f.hand;
      return font.replace(/,?\s*(cursive|monospace|sans-serif|serif)\s*$/, m => ', ' + extra + m.replace(/^,?\s*/, ', '));
    },
    use(lang) {
      this.lang = lang;
      const doc = root.document;
      if (!doc) return;
      const html = doc.documentElement, f = FAM[lang];
      for (const role of Object.keys(BASE)) {
        if (f) html.style.setProperty('--' + role, this.stack(role, lang));
        else html.style.removeProperty('--' + role);
      }
      if (f) html.style.setProperty('--hand-x', f.hand); else html.style.removeProperty('--hand-x');
      if (f && !loaded[lang] && doc.head) {
        const l = doc.createElement('link');
        l.rel = 'stylesheet';
        // ready() waits for this: until the stylesheet is in, the faces do not exist and fonts.load() finds nothing
        loaded[lang] = new Promise(res => { l.onload = l.onerror = () => res(); });
        l.href = 'https://fonts.googleapis.com/css2?' + f.css + '&display=swap';
        doc.head.appendChild(l);
      }
    },
    // Waits (a few seconds at most) until the language's faces are ready, so the papers and drawings
    // painted into textures use them rather than a fallback
    async ready(lang, ms = 4000) {
      const f = FAM[lang || this.lang], doc = root.document;
      if (!f || !doc || !doc.fonts || !doc.fonts.load) return;
      const fams = [f.term, f.pix, f.hand, f.type].join(', ').split(/,\s*/).filter(s => /^"/.test(s)).slice(0, 8);
      const sheet = loaded[lang || this.lang];
      const all = (async () => {
        if (sheet) await sheet;
        await Promise.all(fams.map(name => doc.fonts.load('24px ' + name, f.sample).catch(() => null)));
      })();
      await Promise.race([all, new Promise(res => setTimeout(res, ms))]);
    },
  };
  // Line breaking for painted text: Latin words stay whole; Chinese and Japanese may break between any
  // two characters, but never before closing punctuation
  const WIDE = /[⺀-⿿぀-ヿ㄀-ㄯ㐀-䶿一-鿿豈-﫿！-｠]/;
  const NOSTART = /[、。，．：；！？）」』】〉》…ー・ぁぃぅぇぉっゃゅょァィゥェォッャュョ,.:;!?)\]}]/;
  const NOEND = /^[「『（【〈《“‘(\[]+$/;
  Fonts.units = para => {
    const out = [];
    let cur = '';
    const flush = () => { if (cur) { out.push(cur); cur = ''; } };
    for (const ch of String(para)) {
      if (NOSTART.test(ch) && !cur && out.length) { out[out.length - 1] += ch; continue; }
      if (WIDE.test(ch)) {
        if (cur && !NOEND.test(cur)) flush();   // an opening bracket stays with what follows it
        out.push(cur + ch); cur = '';
        continue;
      }
      cur += ch;
      if (ch === ' ') flush();
    }
    flush();
    return out;
  };
  // Splits one paragraph into lines no wider than maxW, measured by measure(str)
  Fonts.lines = (para, maxW, measure) => {
    const lines = [];
    let line = '';
    for (const u of Fonts.units(para)) {
      const test = line + u;
      if (maxW && line && measure(test.trimEnd()) > maxW) { lines.push(line.trimEnd()); line = u.trimStart(); } else line = test;
    }
    lines.push(line.trimEnd());
    return lines;
  };
  // Right-to-left writing (Arabic, Hebrew)
  Fonts.isRTL = s => /[֐-ࣿיִ-﷿ﹰ-﻿]/.test(String(s));
  // Scripts whose letters join or combine: painted a whole line at a time, never letter by letter
  Fonts.joined = s => /[֐-ࣿऀ-෿฀-๿יִ-﷿ﹰ-﻿]/.test(String(s));
})(typeof window !== 'undefined' ? window : globalThis);
