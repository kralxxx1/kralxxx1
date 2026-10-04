/* What hangs on the walls of the places people lived and worked in, never the same twice.
   Every picture is painted for its own seed: oil landscapes of the place (mountains and pines, a lake, a
   coast, a harbour), seascapes with a ship or a light, still lifes, portraits whose faces have been
   scraped or painted out, sepia photographs of families and crews with every face gone pale, old
   maps and charts, calendars on the month and year the chapter happens in, certificates, embroidered
   samplers, botanical prints, and the notices a place puts up (life jackets, safety first, timetables,
   no skating). Frames differ: gilt, walnut, black, oak, painted, or none at all, pinned or taped up;
   some hang a little crooked.
   World.buildWallArt finds the walls of rooms people used (panelling, plaster, wallpaper, boards, a
   ship's painted steel, station tile), keeps clear of doors, tall furniture, wall fixtures and lights,
   and hangs one here and there. The textures belong to the level and go with it. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, T = PB.Tex, P = PB.Props, M = PB.Models;
  const { FONT_HAND, FONT_TYPE } = T.FONTS;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ painters (each (g, w, h, r) on a canvas)
  const lerpC = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const rgb = c => `rgb(${c[0]},${c[1]},${c[2]})`;
  function strokes(g, w, h, r, n, len, wd) {
    const img = g.getImageData(0, 0, w, h).data;
    for (let k = 0; k < n; k++) {
      const x = r() * w, y = r() * h, i = ((y | 0) * w + (x | 0)) * 4, a = r.range(-0.5, 0.5) + (y < h * 0.5 ? 0 : 0.2), l = r.range(0.4, 1) * len, j = r.range(-12, 12);
      g.strokeStyle = `rgba(${U.clamp(img[i] + j, 0, 255) | 0},${U.clamp(img[i + 1] + j, 0, 255) | 0},${U.clamp(img[i + 2] + j, 0, 255) | 0},${r.range(0.4, 0.85)})`;
      g.lineWidth = r.range(0.5, 1) * wd; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x - Math.cos(a) * l / 2, y - Math.sin(a) * l / 2); g.lineTo(x + Math.cos(a) * l / 2, y + Math.sin(a) * l / 2); g.stroke();
    }
  }
  function age(g, w, h, r, k = 1) {
    g.fillStyle = `rgba(150,110,40,${0.1 * k})`; g.fillRect(0, 0, w, h);
    g.strokeStyle = `rgba(20,12,4,${0.14 * k})`; g.lineWidth = 0.6;
    for (let n = 0; n < 50 * k; n++) { let x = r() * w, y = r() * h; g.beginPath(); g.moveTo(x, y); for (let s = 0; s < 4; s++) { x += r.range(-10, 10); y += r.range(-10, 10); g.lineTo(x, y); } g.stroke(); }
    const vg = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(30,18,6,${0.4 * k})`); g.fillStyle = vg; g.fillRect(0, 0, w, h);
  }
  const SKIES = [[[60, 80, 110], [190, 170, 140]], [[40, 50, 70], [150, 120, 110]], [[120, 140, 160], [210, 210, 200]], [[30, 34, 44], [90, 80, 90]], [[80, 110, 140], [230, 200, 150]]];
  function landscape(g, w, h, r, o = {}) {
    const [top, hor] = SKIES[(r() * SKIES.length) | 0];
    const sky = g.createLinearGradient(0, 0, 0, h * 0.6); sky.addColorStop(0, rgb(top)); sky.addColorStop(1, rgb(hor)); g.fillStyle = sky; g.fillRect(0, 0, w, h);
    const hz = h * r.range(0.45, 0.6);
    // mountains or hills, far to near, each darker
    for (let layer = 0; layer < 3; layer++) {
      const c = lerpC(hor, [30, 40, 35], 0.35 + layer * 0.22), base = hz + layer * h * 0.06, amp = (o.mountains ? h * 0.32 : h * 0.12) * (1 - layer * 0.3);
      g.fillStyle = rgb(c); g.beginPath(); g.moveTo(0, h);
      for (let x = 0; x <= w; x += 6) g.lineTo(x, base - amp * (0.5 + 0.5 * Math.sin(x / w * (3 + layer) * PI + r() * 0.3 + layer * 2)) * (o.mountains ? Math.abs(Math.sin(x / w * 5 + layer)) : 1));
      g.lineTo(w, h); g.fill();
      if (o.mountains && layer === 0) { g.fillStyle = 'rgba(235,238,240,0.7)'; for (let x = 0; x < w; x += 8) { const y = base - amp * Math.abs(Math.sin(x / w * 5)); if (y < base - amp * 0.7) g.fillRect(x, y, 8, 6); } }
    }
    if (o.water) {
      const wy = hz + h * 0.12;
      const wg = g.createLinearGradient(0, wy, 0, h); wg.addColorStop(0, rgb(lerpC(hor, top, 0.4))); wg.addColorStop(1, rgb(lerpC(top, [10, 12, 16], 0.5)));
      g.fillStyle = wg; g.fillRect(0, wy, w, h - wy);
      g.strokeStyle = 'rgba(255,255,255,0.12)'; for (let k = 0; k < 30; k++) { const y = wy + r() * (h - wy), x = r() * w; g.beginPath(); g.moveTo(x, y); g.lineTo(x + r.range(6, 24), y); g.stroke(); }
    } else {
      g.fillStyle = rgb(lerpC([60, 70, 40], [30, 34, 24], r())); g.fillRect(0, hz + h * 0.14, w, h);
    }
    // pines along the shore or the field's edge
    const n = 6 + (r() * 14 | 0);
    for (let k = 0; k < n; k++) {
      const x = r() * w, y = hz + h * r.range(0.08, 0.2), s = h * r.range(0.08, 0.2);
      g.fillStyle = rgb(lerpC([20, 34, 24], [40, 50, 36], r())); g.beginPath(); g.moveTo(x, y - s); g.lineTo(x + s * 0.3, y); g.lineTo(x - s * 0.3, y); g.fill();
    }
    if (o.house) { const x = w * r.range(0.2, 0.8), y = hz + h * 0.16; g.fillStyle = '#7a2a20'; g.fillRect(x, y - 12, 22, 12); g.fillStyle = '#3a2a24'; g.beginPath(); g.moveTo(x - 3, y - 12); g.lineTo(x + 11, y - 22); g.lineTo(x + 25, y - 12); g.fill(); g.fillStyle = 'rgba(255,200,120,0.9)'; g.fillRect(x + 8, y - 8, 4, 4); }
    strokes(g, w, h, r, 1800, 7, 2.6); age(g, w, h, r);
  }
  function seascape(g, w, h, r) {
    const [top, hor] = SKIES[(r() * SKIES.length) | 0];
    const sky = g.createLinearGradient(0, 0, 0, h * 0.55); sky.addColorStop(0, rgb(top)); sky.addColorStop(1, rgb(hor)); g.fillStyle = sky; g.fillRect(0, 0, w, h);
    const hz = h * r.range(0.48, 0.58);
    const sea = g.createLinearGradient(0, hz, 0, h); sea.addColorStop(0, rgb(lerpC(hor, [40, 60, 70], 0.5))); sea.addColorStop(1, 'rgb(18,26,32)'); g.fillStyle = sea; g.fillRect(0, hz, w, h - hz);
    g.strokeStyle = 'rgba(230,236,240,0.35)'; g.lineWidth = 1.2;
    for (let k = 0; k < 60; k++) { const y = hz + Math.pow(r(), 1.5) * (h - hz), x = r() * w, l = 4 + (y - hz) * 0.2; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + l / 2, y - 2, x + l, y); g.stroke(); }
    if (r() < 0.6) { const x = w * r.range(0.15, 0.75), y = hz; g.fillStyle = '#1a1a1c'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 44, y); g.lineTo(x + 38, y + 6); g.lineTo(x + 6, y + 6); g.fill(); g.fillRect(x + 18, y - 14, 6, 14); g.fillStyle = '#8a1a14'; g.fillRect(x + 18, y - 16, 6, 3); }
    else { const x = w * r.range(0.6, 0.85); g.fillStyle = '#d8d0c0'; g.fillRect(x, hz - 40, 8, 40); g.fillStyle = '#8a1a14'; g.fillRect(x, hz - 30, 8, 6); g.fillStyle = 'rgba(255,230,160,0.8)'; g.fillRect(x - 1, hz - 46, 10, 6); }
    strokes(g, w, h, r, 1800, 8, 2.6); age(g, w, h, r);
  }
  function stillLife(g, w, h, r) {
    const bg = g.createRadialGradient(w * 0.4, h * 0.4, 10, w / 2, h / 2, w * 0.8); bg.addColorStop(0, '#4a3a28'); bg.addColorStop(1, '#120e0a'); g.fillStyle = bg; g.fillRect(0, 0, w, h);
    g.fillStyle = '#3a2618'; g.fillRect(0, h * 0.7, w, h);
    const vx = w * r.range(0.3, 0.6);
    g.fillStyle = r() < 0.5 ? '#2a4a5a' : '#7a6a4a'; g.beginPath(); g.ellipse(vx, h * 0.6, w * 0.08, h * 0.12, 0, 0, 6.283); g.fill(); g.fillRect(vx - w * 0.04, h * 0.42, w * 0.08, h * 0.1);
    for (let k = 0; k < 9; k++) { g.fillStyle = r.pick(['#a83020', '#d8b040', '#e8e0d0', '#8a2a5a', '#c86020']); g.beginPath(); g.arc(vx + r.range(-w * 0.15, w * 0.15), h * r.range(0.18, 0.4), r.range(6, 14), 0, 6.283); g.fill(); }
    for (let k = 0; k < 3; k++) { g.fillStyle = r.pick(['#a8401a', '#c8a020', '#5a7a2a']); g.beginPath(); g.arc(w * r.range(0.15, 0.85), h * 0.74, r.range(8, 14), 0, 6.283); g.fill(); }
    strokes(g, w, h, r, 1600, 6, 2.4); age(g, w, h, r);
  }
  // a sitter whose face has been scraped off the canvas
  function portrait(g, w, h, r) {
    const bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#2a2418'); bg.addColorStop(1, '#0e0c08'); g.fillStyle = bg; g.fillRect(0, 0, w, h);
    const cx = w / 2, coat = r.pick(['#1a1a1c', '#2a1e14', '#1e2a24', '#3a2a2a']);
    g.fillStyle = coat; g.beginPath(); g.moveTo(cx - w * 0.42, h); g.quadraticCurveTo(cx - w * 0.36, h * 0.55, cx, h * 0.52); g.quadraticCurveTo(cx + w * 0.36, h * 0.55, cx + w * 0.42, h); g.fill();
    g.fillStyle = '#d8cfb8'; g.fillRect(cx - 8, h * 0.52, 16, 18);
    g.fillStyle = '#b89070'; g.beginPath(); g.ellipse(cx, h * 0.38, w * 0.13, h * 0.15, 0, 0, 6.283); g.fill();
    g.fillStyle = r.pick(['#2a1a10', '#4a3a2a', '#1a1410', '#6a6058']); g.beginPath(); g.ellipse(cx, h * 0.3, w * 0.15, h * 0.1, 0, PI, 6.283); g.fill();
    strokes(g, w, h, r, 1400, 6, 2.2);
    // the face: scraped back to the ground, or painted over in a hurry
    if (r() < 0.5) { g.fillStyle = 'rgba(220,212,190,0.92)'; g.beginPath(); g.ellipse(cx, h * 0.4, w * 0.12, h * 0.12, 0, 0, 6.283); g.fill(); g.strokeStyle = 'rgba(80,60,40,0.6)'; g.lineWidth = 1; for (let k = 0; k < 40; k++) { const x = cx + r.range(-w * 0.11, w * 0.11), y = h * 0.4 + r.range(-h * 0.11, h * 0.11); g.beginPath(); g.moveTo(x, y); g.lineTo(x + r.range(-8, 8), y + r.range(-3, 3)); g.stroke(); } }
    else { g.fillStyle = 'rgba(14,10,8,0.95)'; for (let k = 0; k < 14; k++) { g.beginPath(); g.ellipse(cx + r.range(-6, 6), h * 0.4 + r.range(-8, 8), w * r.range(0.08, 0.13), h * r.range(0.06, 0.12), r.range(-0.4, 0.4), 0, 6.283); g.fill(); } }
    age(g, w, h, r, 1.3);
  }
  // sepia photograph: a group standing in a row, every face washed out
  function photoGroup(g, w, h, r, o = {}) {
    const b = 10;
    g.fillStyle = '#e8e0cc'; g.fillRect(0, 0, w, h);
    const bg = g.createLinearGradient(0, b, 0, h - b * 2); bg.addColorStop(0, '#b8a07a'); bg.addColorStop(1, '#6a5438');
    g.fillStyle = bg; g.fillRect(b, b, w - 2 * b, h - b * 3);
    if (o.place === 'mine') { g.fillStyle = '#3a2e20'; g.beginPath(); g.moveTo(w * 0.6, b); g.lineTo(w * 0.85, h * 0.6); g.lineTo(w * 0.35, h * 0.6); g.fill(); }
    if (o.place === 'ship') { g.fillStyle = '#3a3024'; g.fillRect(b, h * 0.35, w - 2 * b, 12); }
    if (o.place === 'snow') { g.fillStyle = '#d8ccb0'; g.fillRect(b, h * 0.55, w - 2 * b, h * 0.3); }
    const n = 2 + (r() * 5 | 0);
    for (let k = 0; k < n; k++) {
      const x = b + (w - 2 * b) * (k + 0.5) / n, s = r.range(0.85, 1.1), top = h * 0.32 + r.range(-6, 6);
      g.fillStyle = r.pick(['#2a2014', '#3a2c1c', '#4a3a28']); g.fillRect(x - 12 * s, top + 10, 24 * s, h * 0.5 * s);
      g.fillStyle = 'rgba(245,238,220,0.95)'; g.beginPath(); g.arc(x, top, 8 * s, 0, 6.283); g.fill();   // the face, gone white
      g.fillStyle = 'rgba(245,238,220,0.25)'; g.beginPath(); g.arc(x, top, 13 * s, 0, 6.283); g.fill();
    }
    const gr = g.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * 0.7); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(40,24,8,0.5)'); g.fillStyle = gr; g.fillRect(b, b, w - 2 * b, h - b * 3);
    g.fillStyle = 'rgba(40,30,20,0.7)'; g.font = `11px ${FONT_HAND}`; g.textAlign = 'center'; g.fillText(o.caption || '', w / 2, h - b * 0.9);
  }
  function oldMap(g, w, h, r, o = {}) {
    g.fillStyle = '#d8c8a0'; g.fillRect(0, 0, w, h);
    for (let k = 0; k < 30; k++) { g.fillStyle = `rgba(120,90,40,${r.range(0.03, 0.1)})`; g.beginPath(); g.arc(r() * w, r() * h, r.range(10, 50), 0, 6.283); g.fill(); }
    g.strokeStyle = 'rgba(80,60,30,0.25)'; g.lineWidth = 0.6; for (let x = 0; x < w; x += 24) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); } for (let y = 0; y < h; y += 24) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    g.fillStyle = 'rgba(110,140,150,0.45)'; g.strokeStyle = '#3a2a18'; g.lineWidth = 1.4; g.beginPath(); let x = 0, y = h * r.range(0.3, 0.7); g.moveTo(0, 0); g.lineTo(0, y);
    for (x = 0; x <= w; x += 8) { y += r.range(-9, 9); y = U.clamp(y, h * 0.15, h * 0.85); g.lineTo(x, y); }
    g.lineTo(w, 0); g.closePath(); g.fill(); g.stroke();
    for (let k = 0; k < 7; k++) { g.fillStyle = '#3a2a18'; g.beginPath(); g.arc(r() * w, h * r.range(0.4, 0.95), 2, 0, 6.283); g.fill(); }
    g.fillStyle = '#3a2a18'; g.font = `bold 14px ${FONT_TYPE}`; g.textAlign = 'left'; g.fillText(o.title || 'NORDVIK', 10, 20);
    g.save(); g.translate(w - 34, h - 34); for (let k = 0; k < 8; k++) { g.rotate(PI / 4); g.beginPath(); g.moveTo(0, 0); g.lineTo(3, -4); g.lineTo(0, -22 + (k % 2) * 8); g.lineTo(-3, -4); g.closePath(); g.fill(); } g.restore();
    age(g, w, h, r, 0.6);
  }
  const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  function calendar(g, w, h, r, o) {
    g.fillStyle = '#ece6d6'; g.fillRect(0, 0, w, h);
    // the picture half
    const ph = h * 0.45, sub = document.createElement('canvas'); sub.width = w - 16; sub.height = ph - 12;
    const sg = sub.getContext('2d'); (r() < 0.5 ? landscape : seascape)(sg, sub.width, sub.height, r, { mountains: o.mountains, water: true }); g.drawImage(sub, 8, 8);
    const y0 = ph + 6, d = new Date(o.year, o.month, 1), first = (d.getDay() + 6) % 7, days = new Date(o.year, o.month + 1, 0).getDate();
    g.fillStyle = '#8a1a14'; g.font = `bold 18px ${FONT_TYPE}`; g.textAlign = 'center'; g.fillText(MONTHS[o.month] + ' ' + o.year, w / 2, y0 + 18);
    g.font = `12px ${FONT_TYPE}`;
    const cw = (w - 20) / 7, rh = (h - y0 - 34) / 6;
    for (let k = 0; k < days; k++) {
      const c = (first + k) % 7, row = Math.floor((first + k) / 7), x = 10 + c * cw + cw / 2, yy = y0 + 40 + row * rh;
      g.fillStyle = c === 6 ? '#8a1a14' : '#2a2620'; g.fillText(String(k + 1), x, yy);
      if (k + 1 === o.day) { g.strokeStyle = 'rgba(160,20,20,0.85)'; g.lineWidth = 2; g.beginPath(); g.ellipse(x, yy - 4, 11, 9, 0.2, 0, 6.283); g.stroke(); }
    }
    age(g, w, h, r, 0.4);
  }
  function certificate(g, w, h, r, o = {}) {
    g.fillStyle = '#efe7d0'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#7a5a2a'; g.lineWidth = 4; g.strokeRect(8, 8, w - 16, h - 16); g.lineWidth = 1; g.strokeRect(14, 14, w - 28, h - 28);
    g.fillStyle = '#3a2a18'; g.textAlign = 'center'; g.font = `bold 20px ${FONT_TYPE}`; g.fillText(o.title || 'CERTIFICATE', w / 2, h * 0.3);
    g.font = `12px ${FONT_TYPE}`; g.fillText(o.line || 'for long and faithful service', w / 2, h * 0.45);
    g.font = `22px ${FONT_HAND}`; g.fillText(o.name || '', w / 2, h * 0.62);
    g.font = `11px ${FONT_TYPE}`; g.fillText(String(o.year || ''), w / 2, h * 0.8);
    g.fillStyle = 'rgba(160,30,30,0.8)'; g.beginPath(); g.arc(w * 0.8, h * 0.78, 14, 0, 6.283); g.fill();
    age(g, w, h, r, 0.5);
  }
  function sampler(g, w, h, r, o = {}) {
    g.fillStyle = '#e8dcc0'; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(0,0,0,0.05)'; for (let x = 0; x < w; x += 3) g.fillRect(x, 0, 1, h); for (let y = 0; y < h; y += 3) g.fillRect(0, y, w, 1);
    const cs = (x, y, col) => { g.strokeStyle = col; g.lineWidth = 1.4; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 3, y + 3); g.moveTo(x + 3, y); g.lineTo(x, y + 3); g.stroke(); };
    const red = '#9a2a24', grn = '#3a5a3a', blu = '#2a3a6a';
    for (let x = 6; x < w - 6; x += 4) { cs(x, 6, red); cs(x, h - 10, red); }
    const text = o.text || 'HOME', s = 4;
    g.font = `bold ${Math.floor(h * 0.18)}px ${FONT_TYPE}`;
    // stitched letters: sample a rendered word into crosses
    const tc = document.createElement('canvas'); tc.width = w; tc.height = h; const tg = tc.getContext('2d'); tg.font = g.font; tg.textAlign = 'center'; tg.fillStyle = '#000'; tg.fillText(text, w / 2, h * 0.42);
    const d = tg.getImageData(0, 0, w, h).data;
    for (let y = 0; y < h; y += s) for (let x = 0; x < w; x += s) if (d[(y * w + x) * 4 + 3] > 100) cs(x, y, blu);
    // a house and two trees below
    const hx = w / 2 - 14, hy = h * 0.6;
    for (let y = 0; y < 20; y += 4) for (let x = 0; x < 28; x += 4) cs(hx + x, hy + y, red);
    for (let k = 0; k < 6; k++) for (let x = -k; x <= k; x++) cs(hx + 12 + x * 3, hy - 4 - (6 - k) * 3, grn);
    for (const tx of [w * 0.18, w * 0.82]) for (let y = 0; y < 5; y++) for (let x = -2 + Math.floor(y / 2); x <= 2 - Math.floor(y / 2); x++) cs(tx + x * 4, hy + y * 4 - 6, grn);
    g.fillStyle = blu; g.font = `10px ${FONT_TYPE}`; g.textAlign = 'center'; g.fillText(String(o.year || ''), w / 2, h - 14);
    age(g, w, h, r, 0.35);
  }
  function botanical(g, w, h, r) {
    g.fillStyle = '#ece4cc'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#3a4a2a'; g.lineWidth = 1.4; g.beginPath(); g.moveTo(w / 2, h * 0.9); g.bezierCurveTo(w * 0.45, h * 0.6, w * 0.55, h * 0.4, w / 2, h * 0.2); g.stroke();
    for (let k = 0; k < 6; k++) { const y = h * (0.35 + k * 0.08), s = k % 2 ? 1 : -1; g.fillStyle = 'rgba(70,100,50,0.7)'; g.beginPath(); g.ellipse(w / 2 + s * 18, y, 16, 6, s * 0.5, 0, 6.283); g.fill(); }
    g.fillStyle = r.pick(['rgba(160,40,60,0.8)', 'rgba(200,160,40,0.8)', 'rgba(90,60,140,0.8)']); for (let k = 0; k < 6; k++) { g.beginPath(); g.ellipse(w / 2 + Math.cos(k) * 10, h * 0.2 + Math.sin(k) * 10, 9, 5, k, 0, 6.283); g.fill(); }
    g.fillStyle = '#3a2a18'; g.font = `italic 12px ${FONT_TYPE}`; g.textAlign = 'center'; g.fillText(r.pick(['Linnaea borealis', 'Campanula rotundifolia', 'Trollius europaeus', 'Pinguicula vulgaris', 'Saxifraga oppositifolia']), w / 2, h - 12);
    age(g, w, h, r, 0.5);
  }
  function notice(g, w, h, r, o) {
    g.fillStyle = o.bg || '#e6dfc8'; g.fillRect(0, 0, w, h);
    g.fillStyle = o.band || '#8a1a14'; g.fillRect(0, 0, w, h * 0.2);
    g.fillStyle = '#f2ead8'; g.textAlign = 'center'; g.font = `bold ${Math.floor(h * 0.09)}px ${FONT_TYPE}`; g.fillText(o.title, w / 2, h * 0.13);
    g.fillStyle = '#2a2620'; g.font = `${Math.floor(h * 0.05)}px ${FONT_TYPE}`;
    (o.lines || []).forEach((l, k) => g.fillText(l, w / 2, h * (0.32 + k * 0.08)));
    if (o.icon === 'ring') { g.strokeStyle = '#c84a1a'; g.lineWidth = 9; g.beginPath(); g.arc(w / 2, h * 0.72, h * 0.1, 0, 6.283); g.stroke(); }
    if (o.icon === 'helmet') { g.fillStyle = '#c89a20'; g.beginPath(); g.arc(w / 2, h * 0.76, h * 0.1, PI, 0); g.fill(); g.fillRect(w / 2 - h * 0.13, h * 0.76, h * 0.26, 6); }
    if (o.icon === 'ice') { g.strokeStyle = '#2a4a6a'; g.lineWidth = 2; for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(w / 2, h * 0.74); g.lineTo(w / 2 + Math.cos(k) * h * 0.12, h * 0.74 + Math.sin(k) * h * 0.12); g.stroke(); } }
    // worn: pin holes, a torn corner, damp
    g.fillStyle = 'rgba(80,60,30,0.15)'; g.beginPath(); g.arc(w * r.range(0.2, 0.8), h * r.range(0.5, 0.9), r.range(20, 50), 0, 6.283); g.fill();
    age(g, w, h, r, 0.4);
  }
  function poster(g, w, h, r, o) {
    const bg = r.pick(['#1a1a2a', '#2a1410', '#10201a', '#2a2418']);
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    const sub = document.createElement('canvas'); sub.width = w; sub.height = Math.floor(h * 0.6); const sg = sub.getContext('2d');
    (o.sea ? seascape : landscape)(sg, sub.width, sub.height, r, { mountains: !o.sea, water: true }); g.globalAlpha = 0.85; g.drawImage(sub, 0, h * 0.12); g.globalAlpha = 1;
    g.fillStyle = '#f0e0b0'; g.textAlign = 'center'; g.font = `bold ${Math.floor(h * 0.075)}px ${FONT_TYPE}`; g.fillText(o.title, w / 2, h * 0.09);
    g.font = `${Math.floor(h * 0.04)}px ${FONT_TYPE}`; (o.lines || []).forEach((l, k) => g.fillText(l, w / 2, h * (0.8 + k * 0.06)));
    age(g, w, h, r, 0.5);
  }

  // ------------------------------------------------------------ what each place hangs up
  const YEAR = { depot: 1998, ferry: 1987, pinewood: 1975, mine: 1956, lodge: 1983, village: 1964, train: 1990, carnival: 1984, lake: 1979 };
  const MONTH = { depot: 10, ferry: 10, pinewood: 7, mine: 2, lodge: 1, village: 9, train: 11, carnival: 8, lake: 0 };
  const DAY = { depot: 14, ferry: 3, pinewood: 22, mine: 3, lodge: 28, village: 2, train: 19, carnival: 29, lake: 14 };
  // [kind, weight]
  const SETS = {
    depot: [['poster', 3], ['notice', 3], ['map', 2], ['calendar', 2], ['photo', 2], ['landscape', 1], ['certificate', 1]],
    ferry: [['seascape', 4], ['notice', 3], ['map', 2], ['photo', 2], ['calendar', 1], ['certificate', 1], ['portrait', 1]],
    pinewood: [['poster', 4], ['notice', 2], ['calendar', 1], ['photo', 1], ['landscape', 1]],
    mine: [['notice', 4], ['photo', 3], ['map', 2], ['calendar', 2], ['certificate', 1]],
    lodge: [['landscape', 4], ['photo', 3], ['portrait', 2], ['poster', 2], ['calendar', 1], ['certificate', 1], ['botanical', 1]],
    village: [['sampler', 3], ['photo', 3], ['landscape', 2], ['portrait', 2], ['calendar', 1], ['botanical', 2]],
    train: [['landscape', 3], ['map', 2], ['notice', 2], ['poster', 2], ['calendar', 1]],
    carnival: [['poster', 4], ['photo', 2], ['portrait', 1], ['calendar', 1]],
    lake: [['photo', 3], ['landscape', 3], ['sampler', 2], ['botanical', 2], ['calendar', 1], ['stillLife', 1], ['portrait', 1]],
  };
  const NOTICES = {
    depot: [{ title: 'LOST PROPERTY', lines: ['Counter open 07:00 - 22:00', 'Items held for 90 days', 'Claims at the window'] }, { title: 'TIMETABLE', lines: ['Nordvik  23:40', 'Kvitfjell  00:15', 'Ostra  01:05'], band: '#1a3a5a' }],
    ferry: [{ title: 'LIFE JACKETS', lines: ['Under every seat', 'Muster at lifeboat stations'], icon: 'ring', band: '#c84a1a' }, { title: 'NO ADMITTANCE', lines: ['Crew only beyond this point'] }],
    mine: [{ title: 'SAFETY FIRST', lines: ['Check your lamp', 'Tally in, tally out', 'Report gas at once'], icon: 'helmet' }, { title: 'FIRE DRILL', lines: ['Fire door: east drift', 'Never wedge it shut'], band: '#3a2a18' }],
    pinewood: [{ title: 'NO SMOKING', lines: ['in the projection booth'] }, { title: 'STAFF NOTICE', lines: ['Lock the till at close', 'Last show 23:30'], band: '#1a4a2a' }],
    train: [{ title: 'TIMETABLE', lines: ['Nordvik  22:10', 'Kvitfjell  23:52', 'Ostra  01:05'], band: '#1a3a5a' }, { title: 'TICKETS', lines: ['Must be shown on request'] }],
    lake: [{ title: 'THIN ICE', lines: ['No skating past the huts', 'Keep off the channel'], icon: 'ice', band: '#2a4a6a' }],
  };
  const POSTERS = {
    depot: [{ title: 'VISIT THE FJORDS', lines: ['By rail from Halvard Central'] }, { title: 'NORDLYS EXPRESS', lines: ['Overnight to the north'] }],
    pinewood: [{ title: 'WOLF MOON', lines: ['Friday double feature'] }, { title: 'THE LAST HARBOUR', lines: ['Now showing'], sea: true }, { title: 'ICE ROAD', lines: ['Coming soon'] }],
    lodge: [{ title: 'WEISSHORN', lines: ['2 914 m  ·  Cable car'] }, { title: 'SKI SCHOOL', lines: ['Daily from 09:30'] }],
    train: [{ title: 'SEE THE NORTH', lines: ['By night train'] }],
    carnival: [{ title: "FALK'S CARNIVAL", lines: ['Ghost train  ·  Carousel'] }, { title: 'LAUGHING LOTTE', lines: ['Can you make her stop?'] }],
  };
  const NAMES = ['A. Lund', 'E. Saether', 'O. Brandt', 'G. Moser', 'K. Falk', 'H. Berg', 'T. Rask', 'M. Holm'];

  // one picture: { w, h (metres), frame (material or null), tex (canvas painter key) }
  function design(theme, r, k) {
    const set = SETS[theme] || SETS.depot, tot = set.reduce((s, [, w]) => s + w, 0);
    let pick = r() * tot, kind = set[0][0];
    for (const [kk, w] of set) { if ((pick -= w) < 0) { kind = kk; break; } }
    const frames = ['giltFrame', 'walnutFrame', 'blackFrame', 'woodVarnish', 'darkWood', 'doorPaintWhite'];
    const year = YEAR[theme] || 1980, seed = U.hashStr(theme + ':' + kind + ':' + k);
    const mountains = theme === 'lodge' || theme === 'train' || theme === 'mine';
    switch (kind) {
      case 'landscape': { const land = r() < 0.5, wide = r() < 0.7; return { kind, w: wide ? r.range(0.55, 0.9) : 0.45, h: wide ? 0.42 : 0.6, frame: r.pick(frames.slice(0, 4)), px: wide ? [320, 224] : [224, 300], paint: (g, w, h, rr) => landscape(g, w, h, rr, { mountains, water: land || theme === 'lake' || theme === 'ferry', house: r() < 0.4 }), seed }; }
      case 'seascape': return { kind, w: r.range(0.55, 0.85), h: 0.45, frame: r.pick(['walnutFrame', 'giltFrame', 'blackFrame']), px: [320, 224], paint: seascape, seed };
      case 'stillLife': return { kind, w: 0.42, h: 0.52, frame: 'giltFrame', px: [224, 280], paint: stillLife, seed };
      case 'portrait': return { kind, w: 0.42, h: 0.56, frame: r.pick(['giltFrame', 'blackFrame']), px: [210, 280], paint: portrait, seed, tilt: r() < 0.3 ? r.range(-0.06, 0.06) : 0 };
      case 'photo': { const place = theme === 'mine' ? 'mine' : theme === 'ferry' ? 'ship' : theme === 'lodge' || theme === 'lake' ? 'snow' : null; const wide = r() < 0.6; return { kind, w: wide ? 0.3 : 0.2, h: wide ? 0.22 : 0.26, frame: r.pick(['blackFrame', 'walnutFrame', 'woodVarnish']), px: wide ? [256, 190] : [180, 230], paint: (g, w, h, rr) => photoGroup(g, w, h, rr, { place, caption: String(year - 10 - (r() * 30 | 0)) }), seed, glass: true }; }
      case 'map': return { kind, w: r.range(0.6, 0.8), h: 0.5, frame: r() < 0.5 ? 'blackFrame' : null, px: [320, 256], paint: (g, w, h, rr) => oldMap(g, w, h, rr, { title: r.pick(['NORDVIK', 'OSTRA', 'HALVARD', 'KVITFJELL', 'HOLLOW CREEK']) }), seed, pinned: true };
      case 'calendar': return { kind, w: 0.3, h: 0.44, frame: null, px: [220, 320], paint: (g, w, h, rr) => calendar(g, w, h, rr, { year, month: MONTH[theme] || 0, day: DAY[theme] || 1, mountains }), seed: U.hashStr(theme + ':calendar'), pinned: true };
      case 'certificate': return { kind, w: 0.36, h: 0.27, frame: 'blackFrame', px: [300, 224], paint: (g, w, h, rr) => certificate(g, w, h, rr, { name: r.pick(NAMES), year: year - (r() * 20 | 0) }), seed, glass: true };
      case 'sampler': return { kind, w: 0.36, h: 0.3, frame: 'walnutFrame', px: [240, 200], paint: (g, w, h, rr) => sampler(g, w, h, rr, { text: r.pick(['HOME', 'BLESS', 'PEACE', 'OSTRA']), year: year - 20 - (r() * 40 | 0) }), seed, glass: true };
      case 'botanical': return { kind, w: 0.26, h: 0.36, frame: r.pick(['woodVarnish', 'blackFrame', 'doorPaintWhite']), px: [180, 250], paint: botanical, seed, glass: true };
      case 'notice': { const list = NOTICES[theme] || NOTICES.depot, n = list[(r() * list.length) | 0]; return { kind, w: 0.32, h: 0.44, frame: null, px: [220, 300], paint: (g, w, h, rr) => notice(g, w, h, rr, n), seed: U.hashStr(theme + ':' + n.title), pinned: true }; }
      case 'poster': { const list = POSTERS[theme] || POSTERS.depot, n = list[(r() * list.length) | 0]; return { kind, w: 0.46, h: 0.66, frame: r() < 0.3 ? 'blackFrame' : null, px: [230, 330], paint: (g, w, h, rr) => poster(g, w, h, rr, n), seed: U.hashStr(theme + ':' + n.title), pinned: true }; }
      default: return null;
    }
  }

  // ------------------------------------------------------------ hanging them
  const ART_WALLS = /^(woodPanel|plaster|wallpaper|planks|shipPaint|logWall|subway|concreteWall|cinderblock)/;
  const SKIP_TAGS = /^(archive|wash|kitchen|shaft|stope|squeeze|drift|haulage|gasDrift|eastDrift|lake|walk|carDeck|engine|cold|boiler|sorting|store)/i;
  const W = PB.World.prototype;
  W.buildWallArt = function () {
    const L = this.L, theme = L.theme, C = L.cell;
    if (!L.styleOf || !SETS[theme]) return;
    const EDGE = PB.LevelGen && PB.LevelGen.EDGE ? PB.LevelGen.EDGE : { WALL: 1 };
    const od = L.meta.outdoor, r = U.rng(U.hashStr(theme + ':art'));
    const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0];
    const tagOf = (x, y) => { const rg = L.regionOf ? L.regionOf(x, y) : null; return (rg && rg.tag) || ''; };
    const cand = [];
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
      const i = L.i(x, y);
      if (!L.passable(x, y) || (od && od[i])) continue;
      const st = L.styles[L.styleOf[i]];
      if (!st || !ART_WALLS.test(st.wall || '') || SKIP_TAGS.test(st.name || '') || SKIP_TAGS.test(tagOf(x, y))) continue;
      for (let d = 0; d < 4; d++) if (L.edgeKind(x, y, d) === EDGE.WALL && !(L.doorAt && L.doorAt(x, y, d))) cand.push({ x, y, d, ceil: L.ceilAt(x, y), wain: st.wainscot ? (st.wainscot.h || 1.1) : 0 });
    }
    // furniture standing against the wall, things already on it, lights
    const blocked = (wx, wz, half) => {
      for (const p of L.props) {
        const near = Math.hypot(p.x - wx, p.z - wz);
        if (p.wall && near < half + 0.45) return true;
        if (!p.wall && near < half + 0.9) { const f = this.footprint(p.type); if (!f || (P.DEFS[p.type] && this.vExtent && (this.vExtent(p.type) || [0, 2])[1] > 1.15)) return true; }
      }
      for (const l of L.lights) if (Math.hypot(l.x - wx, l.z - wz) < 0.7 && l.y < 2.4) return true;
      for (const k in L.spots) for (const s of L.spots[k]) if (s.wx != null && Math.hypot(s.wx - wx, s.wz - wz) < 0.8 && (s.h || 0) > 0.9) return true;
      return false;
    };
    const max = Math.min(26, Math.max(6, Math.round(cand.length * 0.08)));
    for (let k = cand.length - 1; k > 0; k--) { const j = (r() * (k + 1)) | 0; [cand[k], cand[j]] = [cand[j], cand[k]]; }
    let n = 0;
    this.art = [];
    for (const c of cand) {
      if (n >= max) break;
      if (r() > 0.4) continue;
      const des = design(theme, r, n);
      if (!des) continue;
      const along = r.range(-0.7, 0.7), off = C / 2 - 0.1 - 0.004;
      const nx = -DX[c.d], nz = -DY[c.d];
      const wx = (c.x + 0.5) * C + DX[c.d] * off + (c.d % 2 === 0 ? along : 0), wz = (c.y + 0.5) * C + DY[c.d] * off + (c.d % 2 === 1 ? along : 0);
      if (blocked(wx, wz, des.w / 2)) continue;
      const top = Math.min(c.ceil - 0.25, 2.2), y = U.clamp(1.55 + r.range(-0.08, 0.12), Math.max(c.wain + 0.12 + des.h / 2, 1.1), top - des.h / 2);
      if (y - des.h / 2 < c.wain + 0.06) continue;
      this.hangPicture(des, wx + nx * (c.wain && y - des.h / 2 < c.wain + 0.05 ? 0.035 : 0), y, wz + nz * 0, Math.atan2(nx, nz), r);
      n++;
    }
  };
  // a picture at (x, y, z) facing yaw, its back on the wall
  W.hangPicture = function (des, x, y, z, yaw, r) {
    const grp = new THREE.Group();
    grp.position.set(x, y, z); grp.rotation.set(0, yaw, des.tilt || (r() < 0.25 ? r.range(-0.035, 0.035) : 0));
    const [pw, ph] = des.px;
    const key = 'art:' + this.L.theme + ':' + des.kind + ':' + des.seed;
    const tex = T.canvas(key, pw, ph, (g, w, h) => des.paint(g, w, h, U.rng(des.seed)));
    const mat = this.patch(new THREE.MeshStandardMaterial({ map: tex, color: des.glass ? 0xd8d8d8 : 0xe0e0e0, roughness: des.glass ? 0.5 : des.frame ? 0.62 : 0.88 }));
    mat.userData.refl = des.glass ? 0.12 : 0;
    const b = des.frame ? (des.kind === 'photo' ? 0.022 : 0.045) : 0, depth = des.frame ? 0.03 : 0.002;
    const canvas = new THREE.Mesh(new THREE.PlaneGeometry(des.w, des.h), mat); canvas.position.z = depth * 0.6 + 0.002; canvas.receiveShadow = true; grp.add(canvas);
    if (des.frame) {
      const specs = [
        ['rbox', des.frame, des.w + 2 * b, b, depth, 0.004, 0, des.h / 2 + b / 2, depth / 2], ['rbox', des.frame, des.w + 2 * b, b, depth, 0.004, 0, -des.h / 2 - b / 2, depth / 2],
        ['rbox', des.frame, b, des.h, depth, 0.004, -des.w / 2 - b / 2, 0, depth / 2], ['rbox', des.frame, b, des.h, depth, 0.004, des.w / 2 + b / 2, 0, depth / 2],
        ['box', 'darkWood', des.w, des.h, 0.006, 0, 0, 0.003],
      ];
      for (const part of P.build('artFrame:' + des.frame + ':' + des.w.toFixed(2) + 'x' + des.h.toFixed(2), specs)) { const m = new THREE.Mesh(part.geo, this.mat(part.mat)); m.castShadow = true; m.receiveShadow = true; grp.add(m); }
      // the wire and nail it hangs from
      const nail = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.03, 6), this.mat('brass')); nail.rotation.x = H; nail.position.set(0, des.h / 2 + b + 0.06, 0.012); grp.add(nail);
    } else if (des.pinned) {
      for (const [sx, sy] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) { const pin = new THREE.Mesh(new THREE.SphereGeometry(0.008, 8, 6), this.mat(r() < 0.5 ? 'redPlastic' : 'brass')); pin.position.set(sx * (des.w / 2 - 0.02), sy * (des.h / 2 - 0.02), 0.008); grp.add(pin); }
    }
    this.group.add(grp);
    this.art.push(grp);
    return grp;
  };
})(typeof window !== 'undefined' ? window : globalThis);
