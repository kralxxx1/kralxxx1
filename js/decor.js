/* Things people hang on walls, and the things that should not be there.
   Framed oil paintings (painted in code, brush stroke by brush stroke), family photographs, calendars
   stopped on a month that matters, cross-stitch samplers, certificates and clocks stopped at 3:17.
   A few of them are wrong: a portrait with the eyes scratched out, a portrait whose sitter has left the
   chair, a family photo with one face gone. They are added to each theme's dressing set.
   After dressing, a mystery pass leaves a handful of details per chapter: writing on the walls, small
   handprints, missing-children posters. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U, T = PB.Tex, M = PB.Models, P = PB.Props, D = P.DEFS;
  const PI = Math.PI, H = PI / 2;
  const { FONT_HAND, FONT_TYPE } = T.FONTS;

  // ------------------------------------------------------------ oil paint
  // Block the scene in, then go over it with thousands of short strokes that pick up the colour
  // underneath and follow a flow field: it reads as paint, not as a vector drawing.
  function impasto(g, w, h, r, o = {}) {
    const img = g.getImageData(0, 0, w, h).data;
    const n = o.n || 5200, len = o.len || 9, wd = o.wd || 3.2;
    for (let k = 0; k < n; k++) {
      const x = r() * w, y = r() * h, i = ((y | 0) * w + (x | 0)) * 4;
      const a = (o.flow ? o.flow(x / w, y / h) : 0) + r.range(-0.35, 0.35);
      const l = r.range(0.4, 1) * len, j = r.range(-14, 14);
      g.strokeStyle = `rgba(${Math.max(0, Math.min(255, img[i] + j)) | 0},${Math.max(0, Math.min(255, img[i + 1] + j)) | 0},${Math.max(0, Math.min(255, img[i + 2] + j)) | 0},${r.range(0.45, 0.9)})`;
      g.lineWidth = r.range(0.5, 1) * wd; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x - Math.cos(a) * l / 2, y - Math.sin(a) * l / 2); g.lineTo(x + Math.cos(a) * l / 2, y + Math.sin(a) * l / 2); g.stroke();
    }
    // varnish gone amber, craquelure, grime in the corners
    g.fillStyle = 'rgba(150,110,40,0.12)'; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(20,12,4,0.16)'; g.lineWidth = 0.7;
    for (let k = 0; k < 90; k++) { let x = r() * w, y = r() * h; g.beginPath(); g.moveTo(x, y); for (let s = 0; s < 5; s++) { x += r.range(-14, 14); y += r.range(-14, 14); g.lineTo(x, y); } g.stroke(); }
    const vg = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.72);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(30,18,6,0.45)'); g.fillStyle = vg; g.fillRect(0, 0, w, h);
  }
  const grad = (g, y0, y1, stops) => { const gr = g.createLinearGradient(0, y0, 0, y1); stops.forEach(([t, c]) => gr.addColorStop(t, c)); return gr; };
  const blob = (g, x, y, rx, ry, col) => { g.fillStyle = col; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 6.283); g.fill(); };
  function pine(g, x, y, s, col) { g.fillStyle = col; g.beginPath(); g.moveTo(x, y - s); for (let k = 0; k < 4; k++) { const t = (k + 1) / 4; g.lineTo(x + s * 0.34 * t, y - s + s * t * 0.95); g.lineTo(x + s * 0.12 * t, y - s + s * t * 0.95); } g.lineTo(x, y); for (let k = 3; k >= 0; k--) { const t = (k + 1) / 4; g.lineTo(x - s * 0.12 * t, y - s + s * t * 0.95); g.lineTo(x - s * 0.34 * t, y - s + s * t * 0.95); } g.closePath(); g.fill(); }
  function figure(g, x, y, s, o = {}) {
    // a seated or standing sitter, painted: dark coat, pale face and hands
    g.fillStyle = o.coat || '#1c1612';
    g.beginPath(); g.moveTo(x - s * 0.55, y + s * 1.4); g.quadraticCurveTo(x - s * 0.6, y + s * 0.35, x - s * 0.25, y + s * 0.22); g.lineTo(x + s * 0.25, y + s * 0.22); g.quadraticCurveTo(x + s * 0.6, y + s * 0.35, x + s * 0.55, y + s * 1.4); g.closePath(); g.fill();
    g.fillStyle = '#e8dcc8'; g.beginPath(); g.moveTo(x - s * 0.1, y + s * 0.22); g.lineTo(x, y + s * 0.5); g.lineTo(x + s * 0.1, y + s * 0.22); g.fill();
    blob(g, x, y, s * 0.2, s * 0.26, o.skin || '#caa38a');
    g.fillStyle = o.hair || '#2a1c14'; g.beginPath(); g.ellipse(x, y - s * 0.12, s * 0.21, s * 0.16, 0, PI, 0); g.fill();
    if (!o.noEyes) { g.fillStyle = 'rgba(30,18,12,0.85)'; for (const d of [-1, 1]) { g.beginPath(); g.ellipse(x + d * s * 0.075, y - s * 0.02, s * 0.03, s * 0.018, 0, 0, 6.283); g.fill(); } }
    g.strokeStyle = 'rgba(90,50,40,0.7)'; g.lineWidth = s * 0.02; g.beginPath(); g.moveTo(x - s * 0.06, y + s * 0.13); g.lineTo(x + s * 0.06, y + s * 0.13); g.stroke();
    blob(g, x - s * 0.3, y + s * 1.05, s * 0.09, s * 0.06, o.skin || '#caa38a'); blob(g, x + s * 0.28, y + s * 1.08, s * 0.09, s * 0.06, o.skin || '#caa38a');
  }
  function chair(g, x, y, s) {
    g.fillStyle = '#3a1c10'; g.fillRect(x - s * 0.5, y - s * 0.4, s, s * 1.1);
    g.fillStyle = '#6a1a18'; g.fillRect(x - s * 0.42, y - s * 0.32, s * 0.84, s * 0.9);
    g.fillStyle = 'rgba(255,220,160,0.12)'; g.fillRect(x - s * 0.42, y - s * 0.32, s * 0.12, s * 0.9);
  }
  const PAINT = {
    lake(g, w, h, r) {
      g.fillStyle = grad(g, 0, h * 0.55, [[0, '#3a2a5a'], [0.55, '#c86a4a'], [1, '#f0b060']]); g.fillRect(0, 0, w, h * 0.55);
      g.fillStyle = '#4a3a5a'; g.beginPath(); g.moveTo(0, h * 0.5); for (let x = 0; x <= w; x += 20) g.lineTo(x, h * 0.36 + Math.sin(x * 0.02) * 20 + r.range(-6, 6)); g.lineTo(w, h * 0.55); g.lineTo(0, h * 0.55); g.fill();
      g.fillStyle = grad(g, h * 0.55, h, [[0, '#d88a58'], [0.3, '#5a3a5a'], [1, '#1a1428']]); g.fillRect(0, h * 0.55, w, h * 0.45);
      for (let k = 0; k < 40; k++) { g.fillStyle = `rgba(255,200,130,${r() * 0.3})`; g.fillRect(w * 0.5 + r.range(-60, 60), h * 0.56 + r() * h * 0.3, r.range(10, 40), 2); }
      for (let k = 0; k < 14; k++) pine(g, k * 40 + r.range(-10, 10), h * 0.58, r.range(60, 120), '#141018');
      g.fillStyle = '#1a1210'; g.fillRect(w * 0.72, h * 0.48, 40, 26); g.beginPath(); g.moveTo(w * 0.72 - 6, h * 0.48); g.lineTo(w * 0.72 + 20, h * 0.44); g.lineTo(w * 0.72 + 46, h * 0.48); g.fill();
      g.fillStyle = '#ffcf70'; g.fillRect(w * 0.72 + 14, h * 0.5, 8, 8);
    },
    sea(g, w, h, r) {
      g.fillStyle = grad(g, 0, h * 0.5, [[0, '#1a1e24'], [1, '#5a6a70']]); g.fillRect(0, 0, w, h * 0.5);
      for (let k = 0; k < 8; k++) blob(g, r() * w, r() * h * 0.35, r.range(60, 140), r.range(20, 40), `rgba(${30 + r() * 30},${34 + r() * 30},${40 + r() * 30},0.8)`);
      g.fillStyle = grad(g, h * 0.5, h, [[0, '#3a5058'], [1, '#0c1418']]); g.fillRect(0, h * 0.5, w, h * 0.5);
      for (let k = 0; k < 60; k++) { g.strokeStyle = `rgba(220,230,230,${r() * 0.5})`; g.lineWidth = r.range(1, 3); const x = r() * w, y = h * 0.5 + r() * h * 0.5; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 15, y - 8, x + 30, y); g.stroke(); }
      g.fillStyle = '#2a2420'; g.beginPath(); g.moveTo(w * 0.62, h * 0.62); g.lineTo(w, h * 0.5); g.lineTo(w, h * 0.7); g.fill();
      g.fillStyle = '#d8d0c0'; g.beginPath(); g.moveTo(w * 0.8, h * 0.5); g.lineTo(w * 0.83, h * 0.22); g.lineTo(w * 0.87, h * 0.22); g.lineTo(w * 0.9, h * 0.5); g.fill();
      g.fillStyle = '#8a1a14'; g.fillRect(w * 0.82, h * 0.3, w * 0.065, 12); g.fillStyle = '#fff2b0'; g.fillRect(w * 0.835, h * 0.19, 14, 12);
      g.fillStyle = 'rgba(255,240,170,0.18)'; g.beginPath(); g.moveTo(w * 0.85, h * 0.2); g.lineTo(0, h * 0.05); g.lineTo(0, h * 0.25); g.fill();
    },
    field(g, w, h, r) {
      g.fillStyle = grad(g, 0, h * 0.6, [[0, '#4a7ab0'], [1, '#c8d8e0']]); g.fillRect(0, 0, w, h * 0.6);
      for (let k = 0; k < 6; k++) { const x = r() * w, y = r() * h * 0.35; for (let j = 0; j < 5; j++) blob(g, x + j * 22, y + r.range(-8, 8), 30, 18, 'rgba(250,248,240,0.85)'); }
      g.fillStyle = grad(g, h * 0.55, h, [[0, '#c8a040'], [1, '#8a6420']]); g.fillRect(0, h * 0.55, w, h * 0.45);
      g.fillStyle = '#3a2a18'; g.fillRect(w * 0.3, h * 0.35, 10, h * 0.22); blob(g, w * 0.3 + 5, h * 0.33, 52, 40, '#2a4a20'); blob(g, w * 0.3 - 20, h * 0.37, 30, 24, '#3a5a28');
      g.fillStyle = '#8a2a1a'; g.fillRect(w * 0.68, h * 0.48, 70, 40); g.fillStyle = '#5a1a10'; g.beginPath(); g.moveTo(w * 0.68 - 8, h * 0.48); g.lineTo(w * 0.68 + 35, h * 0.4); g.lineTo(w * 0.68 + 78, h * 0.48); g.fill();
    },
    forest(g, w, h, r) {
      g.fillStyle = '#10140e'; g.fillRect(0, 0, w, h);
      const lg = g.createRadialGradient(w * 0.5, h * 0.55, 5, w * 0.5, h * 0.55, h * 0.5); lg.addColorStop(0, 'rgba(230,220,170,0.9)'); lg.addColorStop(0.35, 'rgba(120,130,100,0.5)'); lg.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = lg; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 26; k++) { const x = r() * w, d = r(); g.fillStyle = `rgba(${10 + d * 40},${14 + d * 40},${10 + d * 30},1)`; g.fillRect(x, 0, 6 + (1 - d) * 22, h); }
      g.fillStyle = 'rgba(180,170,140,0.5)'; g.beginPath(); g.moveTo(w * 0.47, h * 0.62); g.lineTo(w * 0.53, h * 0.62); g.lineTo(w * 0.8, h); g.lineTo(w * 0.2, h); g.fill();
      for (let k = 0; k < 10; k++) blob(g, r() * w, h * r.range(0.4, 0.8), r.range(80, 160), 18, 'rgba(200,200,190,0.12)');
      // somebody standing where the path ends
      g.fillStyle = 'rgba(8,8,8,0.9)'; g.fillRect(w * 0.497, h * 0.5, 6, 20); blob(g, w * 0.5, h * 0.495, 3.5, 4, 'rgba(8,8,8,0.9)');
    },
    flowers(g, w, h, r) {
      g.fillStyle = grad(g, 0, h, [[0, '#1a140e'], [1, '#2a2016']]); g.fillRect(0, 0, w, h);
      g.fillStyle = '#4a3020'; g.fillRect(0, h * 0.72, w, h * 0.28);
      g.fillStyle = '#6a7a8a'; g.beginPath(); g.moveTo(w * 0.42, h * 0.72); g.quadraticCurveTo(w * 0.36, h * 0.55, w * 0.45, h * 0.5); g.lineTo(w * 0.55, h * 0.5); g.quadraticCurveTo(w * 0.64, h * 0.55, w * 0.58, h * 0.72); g.fill();
      for (let k = 0; k < 16; k++) { g.strokeStyle = '#2a4a1a'; g.lineWidth = 3; const x = w * 0.5 + r.range(-90, 90), y = h * r.range(0.12, 0.42); g.beginPath(); g.moveTo(w * 0.5, h * 0.5); g.quadraticCurveTo(w * 0.5, y + 40, x, y); g.stroke(); blob(g, x, y, r.range(14, 24), r.range(12, 20), r.pick(['#c83a3a', '#e8d8c8', '#e0a030', '#b03a6a', '#f0e0a0'])); }
      for (let k = 0; k < 3; k++) blob(g, w * r.range(0.25, 0.75), h * 0.78, 8, 5, '#a02a2a');   // petals fallen on the table
    },
    portrait(g, w, h, r) {
      g.fillStyle = grad(g, 0, h, [[0, '#2a1e16'], [1, '#120c08']]); g.fillRect(0, 0, w, h);
      chair(g, w * 0.5, h * 0.55, w * 0.78);
      figure(g, w * 0.5, h * 0.34, h * 0.56);
    },
    portraitX(g, w, h, r) {
      PAINT.portrait(g, w, h, r);
    },
    portraitGone(g, w, h, r) {
      g.fillStyle = grad(g, 0, h, [[0, '#2a1e16'], [1, '#120c08']]); g.fillRect(0, 0, w, h);
      chair(g, w * 0.5, h * 0.55, w * 0.78);
      // the dent in the cushion where somebody sat
      blob(g, w * 0.5, h * 0.72, w * 0.22, h * 0.06, 'rgba(20,4,4,0.45)');
    },
    ship(g, w, h, r) {
      g.fillStyle = grad(g, 0, h * 0.6, [[0, '#8a9ab0'], [1, '#e8d8b8']]); g.fillRect(0, 0, w, h * 0.6);
      g.fillStyle = grad(g, h * 0.6, h, [[0, '#4a6a78'], [1, '#1a2a30']]); g.fillRect(0, h * 0.6, w, h * 0.4);
      g.fillStyle = '#3a2214'; g.beginPath(); g.moveTo(w * 0.28, h * 0.6); g.lineTo(w * 0.72, h * 0.6); g.lineTo(w * 0.66, h * 0.68); g.lineTo(w * 0.34, h * 0.68); g.fill();
      for (const [x, t, b] of [[0.38, 0.22, 0.58], [0.5, 0.14, 0.58], [0.62, 0.24, 0.58]]) { g.fillStyle = '#2a1a10'; g.fillRect(w * x - 2, h * t, 4, h * (b - t)); g.fillStyle = '#efe6d2'; g.beginPath(); g.moveTo(w * x, h * (t + 0.03)); g.quadraticCurveTo(w * (x + 0.07), h * ((t + b) / 2), w * x, h * (b - 0.04)); g.lineTo(w * (x - 0.06), h * (b - 0.04)); g.quadraticCurveTo(w * (x - 0.02), h * ((t + b) / 2), w * x, h * (t + 0.03)); g.fill(); }
    },
    houseNight(g, w, h, r) {
      g.fillStyle = grad(g, 0, h, [[0, '#0a0e1a'], [1, '#1a2030']]); g.fillRect(0, 0, w, h);
      for (let k = 0; k < 40; k++) { g.fillStyle = `rgba(255,255,230,${r() * 0.6})`; g.fillRect(r() * w, r() * h * 0.4, 2, 2); }
      g.fillStyle = '#10141c'; g.fillRect(0, h * 0.78, w, h * 0.22);
      g.fillStyle = '#1e2230'; g.fillRect(w * 0.3, h * 0.45, w * 0.4, h * 0.34); g.beginPath(); g.moveTo(w * 0.27, h * 0.46); g.lineTo(w * 0.5, h * 0.28); g.lineTo(w * 0.73, h * 0.46); g.fill();
      g.fillStyle = '#ffd070'; g.fillRect(w * 0.37, h * 0.52, 22, 26); g.fillStyle = '#10141c'; g.fillRect(w * 0.6, h * 0.52, 22, 26);
      g.fillStyle = 'rgba(255,210,120,0.8)'; g.fillRect(w * 0.47, h * 0.64, 10, 6);   // the porch light, on
    },
  };
  T.painting = (kind, w = 512, h = 384) => T.canvas('painting:' + kind + ':' + w + 'x' + h, w, h, (g) => {
    const r = U.rng(U.hashStr(kind) + 5);
    (PAINT[kind] || PAINT.field)(g, w, h, r);
    const flow = kind === 'sea' ? (u, v) => v > 0.5 ? 0 : 0.2 : kind === 'forest' ? (u) => H : kind.startsWith('portrait') ? (u, v) => H * 0.8 + u : kind === 'field' ? (u, v) => v > 0.55 ? -1.2 : 0.1 : () => 0.15;
    impasto(g, w, h, r, { flow });
    if (kind === 'portraitX') {
      // somebody took a key to the eyes
      g.strokeStyle = 'rgba(240,234,218,0.95)'; g.lineWidth = 3.4;
      for (const d of [-1, 1]) for (let k = 0; k < 22; k++) { const cx = w * 0.5 + d * h * 0.56 * 0.075, cy = h * 0.34 - h * 0.56 * 0.02; g.beginPath(); g.moveTo(cx + r.range(-18, 18), cy + r.range(-12, 12)); g.lineTo(cx + r.range(-18, 18), cy + r.range(-12, 12)); g.stroke(); }
    }
  });

  // ------------------------------------------------------------ photographs
  function softPerson(g, x, y, s, o) {
    g.fillStyle = o.shirt; g.beginPath(); g.ellipse(x, y + s * 0.9, s * 0.42, s * 0.55, 0, PI, 0); g.fill(); g.fillRect(x - s * 0.42, y + s * 0.9, s * 0.84, s * 0.8);
    const hg = g.createRadialGradient(x - s * 0.06, y - s * 0.06, s * 0.02, x, y, s * 0.3); hg.addColorStop(0, '#f0c8a8'); hg.addColorStop(1, '#a8785a');
    g.fillStyle = hg; g.beginPath(); g.ellipse(x, y + s * 0.1, s * 0.22, s * 0.28, 0, 0, 6.283); g.fill();
    g.fillStyle = o.hair; g.beginPath(); g.ellipse(x, y - s * 0.02, s * 0.24, s * 0.2, 0, PI, 0); g.fill();
    if (o.long) { g.fillRect(x - s * 0.25, y - s * 0.02, s * 0.08, s * 0.4); g.fillRect(x + s * 0.17, y - s * 0.02, s * 0.08, s * 0.4); }
    g.fillStyle = 'rgba(40,20,15,0.8)'; for (const d of [-1, 1]) g.fillRect(x + d * s * 0.08 - 1.5, y + s * 0.08, 3, 3);
    g.strokeStyle = 'rgba(120,50,40,0.7)'; g.lineWidth = 1.5; g.beginPath(); g.arc(x, y + s * 0.18, s * 0.07, 0.3, PI - 0.3); g.stroke();
  }
  const PHOTOS = {
    family: [{ x: 0.3, y: 0.3, s: 1, shirt: '#3a4a6a', hair: '#3a2a1a' }, { x: 0.55, y: 0.33, s: 0.95, shirt: '#8a3a4a', hair: '#6a3a1a', long: true }, { x: 0.42, y: 0.55, s: 0.6, shirt: '#c8a030', hair: '#8a5a2a' }, { x: 0.72, y: 0.52, s: 0.62, shirt: '#3a8a6a', hair: '#2a1a10', long: true }],
    couple: [{ x: 0.38, y: 0.32, s: 1.05, shirt: '#1a1a1a', hair: '#2a1a10' }, { x: 0.62, y: 0.35, s: 1, shirt: '#e8e4dc', hair: '#8a5a2a', long: true }],
    kid: [{ x: 0.5, y: 0.36, s: 1.1, shirt: '#c83a3a', hair: '#6a3a1a' }],
    team: [0.15, 0.32, 0.5, 0.68, 0.85].map((x, k) => ({ x, y: k % 2 ? 0.4 : 0.36, s: 0.62, shirt: '#1a3a8a', hair: ['#3a2a1a', '#6a3a1a', '#1a1a1a', '#8a5a2a', '#2a1a10'][k] })),
  };
  T.wallPhoto = (kind, scratched) => T.canvas('wallphoto:' + kind + (scratched ? ':x' : ''), 256, 320, (g, w, h) => {
    const r = U.rng(U.hashStr(kind) + (scratched ? 9 : 0));
    g.fillStyle = '#f2ede2'; g.fillRect(0, 0, w, h);
    const ix = 18, iy = 18, iw = w - 36, ih = h - 36;
    g.save(); g.beginPath(); g.rect(ix, iy, iw, ih); g.clip();
    g.fillStyle = grad(g, iy, iy + ih, [[0, '#8a9aa8'], [0.6, '#b8a890'], [1, '#6a5a48']]); g.fillRect(ix, iy, iw, ih);
    for (const p of PHOTOS[kind] || PHOTOS.family) softPerson(g, ix + p.x * iw, iy + p.y * ih, iw * 0.22 * p.s, p);
    // colour cast, fading, grain
    g.fillStyle = kind === 'team' ? 'rgba(120,120,120,0.35)' : 'rgba(210,150,80,0.22)'; g.fillRect(ix, iy, iw, ih);
    for (let k = 0; k < 5000; k++) { g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},${r() * 0.08})`; g.fillRect(ix + r() * iw, iy + r() * ih, 1, 1); }
    if (scratched) {
      // one face is gone: scratched to the white of the paper
      const p = (PHOTOS[kind] || PHOTOS.family)[kind === 'family' ? 3 : 0], cx = ix + p.x * iw, cy = iy + p.y * ih + iw * 0.22 * p.s * 0.1;
      g.strokeStyle = 'rgba(250,248,240,0.95)'; g.lineWidth = 2;
      for (let k = 0; k < 40; k++) { g.beginPath(); g.moveTo(cx + r.range(-16, 16), cy + r.range(-20, 20)); g.lineTo(cx + r.range(-16, 16), cy + r.range(-20, 20)); g.stroke(); }
    }
    g.restore();
  });

  // ------------------------------------------------------------ calendars, samplers, certificates
  const MONTHS = { cal87: ['APRIL', 1987, 3, 30, 16], cal83: ['OCTOBER', 1983, 6, 31, 29], cal94: ['NOVEMBER', 1994, 2, 30, 30] };
  T.wallCalendar = key => T.canvas('wallcal:' + key, 256, 384, (g, w, h) => {
    const [mon, yr, first, days, circled] = MONTHS[key] || MONTHS.cal87;
    const r = U.rng(U.hashStr(key));
    g.fillStyle = '#f4efe2'; g.fillRect(0, 0, w, h);
    // the picture half: a promo for the arcade, the Muncher and his stars
    g.fillStyle = grad(g, 0, h * 0.45, [[0, '#1a0a2a'], [1, '#3a1040']]); g.fillRect(8, 8, w - 16, h * 0.45);
    g.fillStyle = '#ff8a1a'; g.beginPath(); g.arc(w * 0.35, h * 0.24, 34, 0, 6.283); g.fill();
    g.fillStyle = '#5a1e0a'; for (const d of [-1, 1]) { g.beginPath(); g.moveTo(w * 0.35 + d * 12, h * 0.24 - 30); g.lineTo(w * 0.35 + d * 24, h * 0.24 - 50); g.lineTo(w * 0.35 + d * 28, h * 0.24 - 22); g.fill(); }
    g.fillStyle = '#2a0808'; g.beginPath(); g.ellipse(w * 0.35, h * 0.26, 22, 8, 0, 0, 6.283); g.fill();
    g.fillStyle = '#ffe7a0'; for (let k = 0; k < 3; k++) { g.beginPath(); g.arc(w * 0.6 + k * 24, h * 0.24, 5, 0, 6.283); g.fill(); }
    g.fillStyle = '#f3e6ff'; g.font = `bold 15px ${FONT_TYPE}`; g.textAlign = 'center'; g.fillText('STARLIGHT ARCADE', w / 2, h * 0.4); g.font = `11px ${FONT_TYPE}`; g.fillText('114 FRONT ST. · HARLOW', w / 2, h * 0.43);
    g.fillStyle = '#8a1a1a'; g.font = `bold 22px ${FONT_TYPE}`; g.fillText(mon + ' ' + yr, w / 2, h * 0.52);
    const gx = 14, gy = h * 0.56, cw = (w - 28) / 7, ch = (h - gy - 14) / 6;
    g.font = `bold 11px ${FONT_TYPE}`; g.fillStyle = '#444';
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach((d, k) => g.fillText(d, gx + cw * (k + 0.5), gy - 2));
    g.strokeStyle = '#bbb'; g.lineWidth = 0.6;
    for (let d = 1; d <= days; d++) {
      const c = (first + d - 1) % 7, rw = Math.floor((first + d - 1) / 7);
      const x = gx + c * cw, y = gy + rw * ch;
      g.strokeRect(x, y, cw, ch); g.fillStyle = '#333'; g.font = `12px ${FONT_TYPE}`; g.textAlign = 'left'; g.fillText(String(d), x + 3, y + 13);
      if (d < circled && key !== 'cal94') { g.strokeStyle = 'rgba(40,40,40,0.55)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(x + 4, y + 4); g.lineTo(x + cw - 4, y + ch - 4); g.stroke(); g.strokeStyle = '#bbb'; g.lineWidth = 0.6; }
      if (d === circled) { g.strokeStyle = '#c01818'; g.lineWidth = 2.5; g.beginPath(); g.ellipse(x + cw / 2, y + ch / 2, cw * 0.46, ch * 0.44, r.range(-0.2, 0.2), 0, 6.283); g.stroke(); g.strokeStyle = '#bbb'; g.lineWidth = 0.6; }
    }
    g.textAlign = 'center';
    for (let k = 0; k < 600; k++) { g.fillStyle = `rgba(120,90,40,${r() * 0.07})`; g.fillRect(r() * w, r() * h, 2, 2); }
  });
  T.sampler = text => T.canvas('sampler:' + text, 320, 256, (g, w, h) => {
    const r = U.rng(U.hashStr(text));
    g.fillStyle = '#eee4cc'; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(0,0,0,0.05)'; for (let y = 0; y < h; y += 4) g.fillRect(0, y, w, 1); for (let x = 0; x < w; x += 4) g.fillRect(x, 0, 1, h);
    const cross = (x, y, c) => { g.strokeStyle = c; g.lineWidth = 1.6; g.beginPath(); g.moveTo(x - 2, y - 2); g.lineTo(x + 2, y + 2); g.moveTo(x + 2, y - 2); g.lineTo(x - 2, y + 2); g.stroke(); };
    for (let x = 12; x < w - 8; x += 6) { cross(x, 12, '#8a2a2a'); cross(x, h - 12, '#8a2a2a'); }
    for (let y = 18; y < h - 12; y += 6) { cross(12, y, '#2a5a3a'); cross(w - 12, y, '#2a5a3a'); }
    g.fillStyle = '#2a3a6a'; g.font = `bold 34px ${FONT_TYPE}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    text.split('|').forEach((ln, k, all) => g.fillText(ln, w / 2, h / 2 + (k - (all.length - 1) / 2) * 42));
    for (let k = 0; k < 8; k++) { const x = r.range(40, w - 40), y = r.pick([46, h - 46]); for (let j = 0; j < 5; j++) cross(x + Math.cos(j * 1.26) * 6, y + Math.sin(j * 1.26) * 6, '#b03a5a'); }
  });
  T.certificate = key => T.canvas('cert:' + key, 384, 288, (g, w, h) => {
    const [title, line1, line2, who] = {
      mill: ['CERTIFICATE', 'IN RECOGNITION OF', '25 YEARS OF LOYAL SERVICE', 'RAY KOWALSKI — HARLOW MILL — 1986'],
      office: ['EMPLOYEE OF THE YEAR', 'CLAIMS DEPARTMENT', 'FOR OUTSTANDING DEDICATION', 'CAROL ALVAREZ — HARLOW MUTUAL — 1986'],
      school: ['HONOR ROLL', 'HARLOW JUNIOR HIGH', 'SECOND MARKING PERIOD 1986–87', 'NELL PARK — GRADE 9'],
      tv: ['LICENSED TECHNICIAN', 'RADIO & TELEVISION REPAIR', 'COMMONWEALTH OF PENNSYLVANIA', 'WALTER BRENNER — 1971'],
    }[key] || ['CERTIFICATE', '', '', ''];
    g.fillStyle = '#f6f0de'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#8a6a2a'; g.lineWidth = 6; g.strokeRect(12, 12, w - 24, h - 24); g.lineWidth = 1.5; g.strokeRect(22, 22, w - 44, h - 44);
    g.fillStyle = '#3a2a10'; g.textAlign = 'center';
    g.font = `bold 26px ${FONT_TYPE}`; g.fillText(title, w / 2, 72);
    g.font = `14px ${FONT_TYPE}`; g.fillText(line1, w / 2, 112); g.fillText(line2, w / 2, 134);
    g.font = `22px ${FONT_HAND}`; g.fillStyle = '#1a2a5a'; g.fillText(who, w / 2, 186);
    g.fillStyle = '#b8902a'; g.beginPath(); g.arc(w / 2, 232, 22, 0, 6.283); g.fill(); g.fillStyle = '#8a1a1a'; g.beginPath(); g.moveTo(w / 2 - 12, 248); g.lineTo(w / 2 - 20, 272); g.lineTo(w / 2 - 4, 262); g.fill(); g.beginPath(); g.moveTo(w / 2 + 12, 248); g.lineTo(w / 2 + 20, 272); g.lineTo(w / 2 + 4, 262); g.fill();
  });

  // ------------------------------------------------------------ materials and models
  const PAINTINGS = ['lake', 'sea', 'field', 'forest', 'flowers', 'portrait', 'portraitX', 'portraitGone', 'ship', 'houseNight'];
  const PHOTO_KINDS = [['family', false], ['family', true], ['couple', false], ['kid', false], ['team', false]];
  const SAMPLERS = { home: 'HOME|SWEET HOME', bless: 'BLESS|THIS HOUSE', stay: 'STAY|A WHILE' };
  Object.assign(M.MATS, {
    giltFrame: { color: 0xa88234, rough: 0.35, metal: 0.75, refl: 0.2 },
    walnutFrame: { color: 0x3e2414, rough: 0.5, refl: 0.05 },
    blackFrame: { color: 0x121212, rough: 0.35, refl: 0.08 },
    clockFace: { tex: 'clockFace', rough: 0.4 },
  });
  for (const k of PAINTINGS) { M.MATS['oil_' + k] = { tex: 'oil_' + k, rough: 0.42, refl: 0.06 }; M.tex['oil_' + k] = () => T.painting(k); }
  for (const [k, x] of PHOTO_KINDS) { const id = 'ph_' + k + (x ? 'X' : ''); M.MATS[id] = { tex: id, rough: 0.22, refl: 0.12 }; M.tex[id] = () => T.wallPhoto(k, x); }
  for (const k in MONTHS) { M.MATS['wc_' + k] = { tex: 'wc_' + k, rough: 0.8 }; M.tex['wc_' + k] = () => T.wallCalendar(k); }
  for (const k in SAMPLERS) { M.MATS['smp_' + k] = { tex: 'smp_' + k, rough: 0.95 }; M.tex['smp_' + k] = () => T.sampler(SAMPLERS[k]); }
  for (const k of ['mill', 'office', 'school', 'tv']) { M.MATS['cert_' + k] = { tex: 'cert_' + k, rough: 0.6, refl: 0.1 }; M.tex['cert_' + k] = () => T.certificate(k); }
  M.tex.clockFace = () => T.canvas('decor:clockface', 256, 256, (g, w, h) => {
    g.fillStyle = '#f2ecdc'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#222'; g.font = `bold 26px ${FONT_TYPE}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let k = 1; k <= 12; k++) { const a = k / 12 * PI * 2; g.fillText(String(k), w / 2 + Math.sin(a) * 96, h / 2 - Math.cos(a) * 96); }
    const r = U.rng(3); for (let k = 0; k < 400; k++) { g.fillStyle = `rgba(120,90,40,${r() * 0.08})`; g.fillRect(r() * w, r() * h, 2, 2); }
  });

  // A frame around a canvas, back against the wall (z = 0), centred at height y, optionally hanging crooked
  function framed(w, h, canvasMat, frameMat, y, tilt = 0, border = 0.05, depth = 0.035) {
    const b = border, W = w + 2 * b, specs = [
      ['box', canvasMat, w, h, 0.008, 0, 0, 0.014],
      ['rbox', frameMat, W, b, depth, 0.006, 0, h / 2 + b / 2, depth / 2],
      ['rbox', frameMat, W, b, depth, 0.006, 0, -h / 2 - b / 2, depth / 2],
      ['rbox', frameMat, b, h, depth, 0.006, -w / 2 - b / 2, 0, depth / 2],
      ['rbox', frameMat, b, h, depth, 0.006, w / 2 + b / 2, 0, depth / 2],
    ];
    if (frameMat === 'giltFrame') specs.push(['box', 'walnutFrame', w + 0.012, h + 0.012, 0.004, 0, 0, 0.011]);
    return M.place(specs, 0, y, 0, 0, 0, tilt);
  }
  D.paint_lake = framed(0.8, 0.6, 'oil_lake', 'giltFrame', 1.6);
  D.paint_sea = framed(0.72, 0.54, 'oil_sea', 'walnutFrame', 1.62);
  D.paint_field = framed(0.8, 0.6, 'oil_field', 'giltFrame', 1.58, 0.05);
  D.paint_forest = framed(0.5, 0.66, 'oil_forest', 'blackFrame', 1.6);
  D.paint_flowers = framed(0.5, 0.62, 'oil_flowers', 'giltFrame', 1.62);
  D.paint_portrait = framed(0.5, 0.66, 'oil_portrait', 'giltFrame', 1.64, 0, 0.07);
  D.paint_portraitX = framed(0.5, 0.66, 'oil_portraitX', 'giltFrame', 1.64, -0.07, 0.07);
  D.paint_portraitGone = framed(0.5, 0.66, 'oil_portraitGone', 'giltFrame', 1.64, 0, 0.07);
  D.paint_ship = framed(0.72, 0.54, 'oil_ship', 'walnutFrame', 1.6);
  D.paint_house = framed(0.6, 0.45, 'oil_houseNight', 'blackFrame', 1.58, 0.03);
  for (const [k, x] of PHOTO_KINDS) { const id = 'ph_' + k + (x ? 'X' : ''); D['photo_' + k + (x ? 'X' : '')] = framed(0.2, 0.25, id, x ? 'blackFrame' : 'walnutFrame', 1.5 + (k.length % 3) * 0.08, x ? 0.12 : 0, 0.02, 0.02); }
  D.photoPair = [...M.place(D.photo_family, -0.16, 0, 0), ...M.place(D.photo_kid, 0.16, 0.12, 0)];
  for (const k in MONTHS) D['cal_' + k] = [['box', 'wc_' + k, 0.3, 0.45, 0.004, 0, 1.55, 0.002], ['cyl', 'chrome', 0.004, 0.004, 0.02, 6, 0, 1.79, 0.01, H, 0, 0]];
  for (const k in SAMPLERS) D['sampler_' + k] = framed(0.36, 0.28, 'smp_' + k, 'walnutFrame', 1.55, 0, 0.025, 0.02);
  for (const k of ['mill', 'office', 'school', 'tv']) D['cert_' + k] = framed(0.4, 0.3, 'cert_' + k, 'blackFrame', 1.58, 0, 0.022, 0.02);
  // A wall clock stopped at 3:17, high on the wall
  {
    const hand = (len, wd, a, z, mat) => ['box', mat, wd, len, 0.003, Math.sin(a) * len * 0.42, Math.cos(a) * len * 0.42, z, 0, 0, -a];
    const hA = (3 + 17 / 60) / 12 * PI * 2, mA = 17 / 60 * PI * 2;
    D.clock317 = M.place([
      ['cyl', 'blackPlastic', 0.19, 0.19, 0.05, 36, 0, 0, 0.025, H, 0, 0], ['disc', 'clockFace', 0.168, 0, 0, 0.0515, 0, 0, 0, 40],
      hand(0.11, 0.014, hA, 0.054, 'blackPlastic'), hand(0.15, 0.009, mA, 0.056, 'blackPlastic'), hand(0.14, 0.003, 4.6, 0.058, 'redPlastic'),
      ['cyl', 'blackPlastic', 0.012, 0.012, 0.012, 12, 0, 0, 0.058, H, 0, 0],
    ], 0, 2.2, 0);
  }

  // ------------------------------------------------------------ where they go
  const SETS = PB.Dressing.SETS;
  const add = (theme, list) => { if (SETS[theme]) SETS[theme].push(...list); };
  add('yellow', [['paint_field', 'wall', 0.0057], ['paint_lake', 'wall', 0.0047], ['paint_portraitGone', 'wall', 0.0012], ['paint_forest', 'wall', 0.0031], ['cal_cal87', 'wall', 0.0031], ['clock317', 'wall', 0.0042], ['photo_familyX', 'wall', 0.0012]]);
  add('dark', [['paint_portraitX', 'wall', 0.0045], ['paint_forest', 'wall', 0.0078], ['photo_familyX', 'wall', 0.0045], ['clock317', 'wall', 0.0078], ['paint_house', 'wall', 0.0052]]);
  add('office', [['cert_office', 'wall', 0.0078], ['cal_cal87', 'wall', 0.0104], ['paint_ship', 'wall', 0.0052], ['paint_field', 'wall', 0.0052], ['photo_family', 'wall', 0.0052], ['clock317', 'wall', 0.0078], ['paint_sea', 'wall', 0.0039]]);
  add('hospital', [['paint_flowers', 'wall', 0.0104], ['paint_sea', 'wall', 0.0078], ['paint_lake', 'wall', 0.0052], ['cal_cal83', 'wall', 0.0078], ['clock317', 'wall', 0.0078], ['paint_portraitGone', 'wall', 0.0015]]);
  add('motel', [['paint_ship', 'wall', 0.0156], ['paint_lake', 'wall', 0.0156], ['paint_portraitX', 'wall', 0.0045], ['sampler_stay', 'wall', 0.0104], ['cal_cal94', 'wall', 0.0078], ['clock317', 'wall', 0.0078]]);
  add('school', [['photo_team', 'wall', 0.0156], ['cert_school', 'wall', 0.0104], ['cal_cal87', 'wall', 0.0104], ['clock317', 'wall', 0.0104]]);
  add('concrete', [['cal_cal87', 'wall', 0.0156], ['cert_mill', 'wall', 0.0078], ['clock317', 'wall', 0.013]]);
  add('workshop', [['cal_cal87', 'wall', 0.026], ['cert_tv', 'wall', 0.0208], ['photo_couple', 'wall', 0.0156], ['clock317', 'wall', 0.0156]]);
  add('mall', [['paint_field', 'wall', 0.0052], ['paint_sea', 'wall', 0.0052], ['clock317', 'wall', 0.0078]]);
  add('pool', [['clock317', 'wall', 0.0156], ['cal_cal87', 'wall', 0.0052]]);

  // ------------------------------------------------------------ mystery pass
  // A few things per chapter that nobody should have left: writing, small handprints, missing posters
  const WRITING = {
    yellow: ['WHO WENT HOME?', 'IT IS ALWAYS 3:17', 'DON\'T LET GO', 'FIVE HANDS', 'I HEAR IT CHEWING', 'COUNT THE DOORS'],
    dark: ['KEEP THE LIGHT ON', 'SAM?', 'IT SMILES WHEN YOU BLINK', 'I\'M NOT SCARED'],
    office: ['WHERE DID EVERYONE GO', '107.3', 'SIDE B'],
    hospital: ['QUIET PLEASE', 'SHE DREW ON EVERYTHING', '207'],
    motel: ['ONE IN ONE OUT', 'DON\'T ANSWER', '3:17'],
    school: ['NOBODY LETS GO', 'D R N T S', 'SAM WAS HERE'],
    concrete: ['YOU LET GO', 'DAN #1', '3:17'],
    pool: ['ONE SECOND', 'I WAS WATCHING'],
    mall: ['FRIENDS FOREVER', 'EVEN IF'],
    tunnel: ['NOBODY GOES HOME ALONE', 'D+T+S'],
    workshop: ['DON\'T PULL THE PLUG', '2 5 6'],
  };
  const MYSTERY_N = { yellow: 5, dark: 4, office: 3, hospital: 3, motel: 3, school: 3, concrete: 3, pool: 2, mall: 2, tunnel: 3, workshop: 2 };
  function mystery(L, seed) {
    const words = WRITING[L.theme];
    if (!words || !L.wallSides) return 0;
    const r = U.rng((seed || 1) * 97 + 17), C = L.cell, DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0];
    const avoid = [];
    for (const k in L.spots) for (const s of L.spots[k]) avoid.push([s.wx != null ? s.wx : L.cx(s.x), s.wz != null ? s.wz : L.cz(s.y)]);
    const far = (x, z) => avoid.every(a => Math.hypot(a[0] - x, a[1] - z) > 1.4) && L.decals.every(d => d.surface !== 'wall' || Math.hypot(d.x - x, d.z - z) > 1.2);
    const target = (MYSTERY_N[L.theme] || 2) + 2;
    let n = 0, tries = 0;
    while (n < target && tries++ < 600) {
      const cx = r.int(1, L.w - 2), cy = r.int(1, L.h - 2);
      if (!L.passable(cx, cy) || (L.floorType && L.floorType[L.i(cx, cy)]) || (L.meta && L.meta.outdoor && L.meta.outdoor[L.i(cx, cy)])) continue;
      const walls = L.wallSides(cx, cy);
      if (!walls.length) continue;
      const d = r.pick(walls), along = r.range(-0.7, 0.7), off = C / 2 - 0.02;
      const x = L.cx(cx) + DX[d] * off + (d % 2 === 0 ? along : 0), z = L.cz(cy) + DY[d] * off + (d % 2 === 1 ? along : 0);
      if (!far(x, z)) continue;
      const kind = n < target - 2 ? 'wallText' : n === target - 2 ? 'hands' : 'missing';
      if (kind === 'wallText') L.addDecal({ type: 'wallText', surface: 'wall', x, y: r.range(1.3, 1.75), z, nx: -DX[d], nz: -DY[d], size: r.range(0.9, 1.3), text: words[n % words.length], rot: 0 });
      else if (kind === 'hands') L.addDecal({ type: 'hands', surface: 'wall', x, y: r.range(0.8, 1.1), z, nx: -DX[d], nz: -DY[d], size: 0.55, rot: 0 });
      else L.addDecal({ type: 'poster', surface: 'wall', x, y: 1.5, z, nx: -DX[d], nz: -DY[d], size: 0.42, text: 'missing87', rot: 0 });
      n++;
    }
    return n;
  }
  const dress0 = PB.Dressing.dress;
  PB.Dressing.dress = (L, seed) => { const n = dress0(L, seed); return n + mystery(L, seed); };
  PB.Decor = { PAINTINGS, mystery };
})(typeof window !== 'undefined' ? window : globalThis);
