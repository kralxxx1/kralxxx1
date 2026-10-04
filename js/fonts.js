/* Fonts. The game's own faces (VT323 for the terminal, Press Start 2P, Caveat for hands, Courier Prime for
   print) cover English and Turkish, so there is nothing to switch per language: use() only keeps the page's
   language attribute in step. Offline (the desktop build without the web fonts) the system fonts listed
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
  const Fonts = PB.Fonts = {
    BASE, lang: 'en',
    stack(role) { return BASE[role]; },
    // A canvas font string ('700 24px "Kalam", cursive'): the base faces already cover both languages
    canvas(font) { return font; },
    use(lang) {
      this.lang = lang;
      const doc = root.document;
      if (!doc) return;
      const html = doc.documentElement;
      for (const role of Object.keys(BASE)) html.style.removeProperty('--' + role);
      html.style.removeProperty('--hand-x');
    },
    // Resolves at once: the base faces are loaded with the page
    async ready() {},
  };
  // Splits one paragraph into lines no wider than maxW, measured by measure(str); words stay whole
  Fonts.lines = (para, maxW, measure) => {
    const lines = [];
    let line = '';
    for (const word of String(para).split(/(?<= )/)) {
      const test = line + word;
      if (maxW && line && measure(test.trimEnd()) > maxW) { lines.push(line.trimEnd()); line = word.trimStart(); } else line = test;
    }
    lines.push(line.trimEnd());
    return lines;
  };
})(typeof window !== 'undefined' ? window : globalThis);
