/* Props for the new chapters: school, hospital, motel, mall, street, workshop, tunnels.
   Also the material table used by the world for simple colored and textured materials. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const M = PB.Models, D = PB.Props.DEFS, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ textures
  Object.assign(M.tex, {
    // Fir needles: dense dark strokes over a deep green
    pine: () => T.canvas('m2:pine', 256, 256, (g, w, h) => {
      const r = U.rng(1225);
      g.fillStyle = '#123a1c'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 2600; k++) { const x = r() * w, y = r() * h, l = r.range(6, 16), a = r.range(-0.9, 0.9) + (k % 2 ? Math.PI : 0); g.strokeStyle = `rgba(${20 + r() * 40},${70 + r() * 70},${30 + r() * 30},0.8)`; g.lineWidth = r.range(1, 2); g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(a) * l, y + Math.cos(a) * l); g.stroke(); }
      for (let k = 0; k < 500; k++) { g.fillStyle = `rgba(0,0,0,${r() * 0.35})`; g.fillRect(r() * w, r() * h, 3, 3); }
    }, { repeat: true }),
    // A window at night in the rain: dark sky, a few far lights smeared by water, streaks and beads on the glass
    nightWindow: () => T.canvas('m2:nightWindow', 256, 384, (g, w, h) => {
      const r = U.rng(207);
      const sky = g.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#0a0e18'); sky.addColorStop(0.7, '#141a26'); sky.addColorStop(1, '#1e1a1a');
      g.fillStyle = sky; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 14; k++) { const x = r() * w, y = h * (0.55 + r() * 0.35), rad = r.range(4, 14); const grd = g.createRadialGradient(x, y, 0, x, y, rad * 2.5); const c = r.pick(['255,210,140', '255,180,110', '200,220,255']); grd.addColorStop(0, `rgba(${c},0.9)`); grd.addColorStop(1, `rgba(${c},0)`); g.fillStyle = grd; g.fillRect(x - rad * 3, y - rad * 3, rad * 6, rad * 6); }
      g.fillStyle = '#07080c'; for (let k = 0; k < 6; k++) { const x = k * 45 + r.range(-10, 10), bh = r.range(40, 110); g.fillRect(x, h - bh, r.range(30, 60), bh); }
      g.strokeStyle = 'rgba(190,210,235,0.22)'; g.lineWidth = 1.2;
      for (let k = 0; k < 70; k++) { let x = r() * w, y = r() * h; g.beginPath(); g.moveTo(x, y); for (let s = 0; s < 6; s++) { x += r.range(-2, 2); y += r.range(6, 16); g.lineTo(x, y); } g.stroke(); }
      for (let k = 0; k < 220; k++) { const x = r() * w, y = r() * h, rr = r.range(0.8, 2.6); g.fillStyle = `rgba(210,225,245,${r.range(0.1, 0.35)})`; g.beginPath(); g.arc(x, y, rr, 0, 6.28); g.fill(); }
    }),
    chalk: () => T.canvas('m2:chalk', 512, 256, (g, w, h) => {
      g.fillStyle = '#233a2c'; g.fillRect(0, 0, w, h);
      const r = U.rng(3);
      g.fillStyle = 'rgba(255,255,255,0.05)'; for (let k = 0; k < 30; k++) { g.beginPath(); g.ellipse(r() * w, r() * h, r.range(30, 120), r.range(10, 40), r() * 3, 0, 6.28); g.fill(); }
      g.strokeStyle = 'rgba(240,240,230,0.75)'; g.fillStyle = 'rgba(240,240,230,0.8)'; g.font = `34px ${T.FONTS.FONT_HAND}`;
      g.fillText('April 16, 1987', 30, 50); g.fillText('Homework: ch. 12, p. 214', 30, 100); g.fillText('SPRING DANCE — FRI. 4/24', 30, 150);
      g.font = `26px ${T.FONTS.FONT_HAND}`; g.fillText('256 ←?', 380, 210);
    }),
    // One shelf of books (the box spans a whole shelf): cloth and leather hardcovers with gilt bands and
    // title labels, a few pale paperbacks, uneven heights, the odd gap with a book leaning into it
    books: () => T.canvas('m2:books', 512, 128, (g, w, h) => {
      const r = U.rng(8);
      g.fillStyle = '#120d08'; g.fillRect(0, 0, w, h);
      const pal = ['#5a1a16', '#1c2a44', '#23402a', '#4a3220', '#161616', '#6a5a3a', '#3a3a40', '#5e2436', '#2a3a3a', '#7a6a50', '#d8d0bc', '#c8b890'];
      let x = 0;
      while (x < w) {
        if (r() < 0.05) { const gap = r.range(18, 34); const bw = r.range(9, 15), bh = h * r.range(0.72, 0.9), c = r.pick(pal);
          g.save(); g.translate(x + gap - 2, h); g.rotate(-0.32); g.fillStyle = c; g.fillRect(0, -bh, bw, bh); g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(bw - 2, -bh, 2, bh); g.restore(); x += gap; continue; }
        const bw = r.range(7, 20) | 0, bh = h * r.range(0.68, 0.97), c = r.pick(pal), y0 = h - bh;
        g.fillStyle = c; g.fillRect(x, y0, bw - 1, bh);
        const sh = g.createLinearGradient(x, 0, x + bw, 0); sh.addColorStop(0, 'rgba(0,0,0,0.35)'); sh.addColorStop(0.35, 'rgba(255,255,255,0.08)'); sh.addColorStop(1, 'rgba(0,0,0,0.45)');
        g.fillStyle = sh; g.fillRect(x, y0, bw - 1, bh);
        if (r() < 0.6) { g.fillStyle = 'rgba(210,170,90,0.7)'; g.fillRect(x + 1, y0 + 5, bw - 3, 1.5); g.fillRect(x + 1, h - 8, bw - 3, 1.5); }
        if (r() < 0.55) { g.fillStyle = r() < 0.5 ? 'rgba(230,220,190,0.75)' : 'rgba(20,16,10,0.5)'; g.fillRect(x + 2, y0 + bh * 0.25, bw - 5, bh * r.range(0.18, 0.3)); }
        x += bw;
      }
      g.fillStyle = 'rgba(0,0,0,0.5)'; g.fillRect(0, 0, w, 6);
    }),
    // Quilted 1980s motel bedspread: rust ground, a lattice of big gold flowers with olive leaves,
    // diamond quilting stitches and a woven texture (one tile = one meter)
    spread: () => T.canvas('m2:spread', 512, 512, (g, w, h) => {
      g.fillStyle = '#6a3620'; g.fillRect(0, 0, w, h);
      const r = U.rng(4);
      for (let k = 0; k < 9000; k++) { g.fillStyle = r() < 0.5 ? 'rgba(0,0,0,0.08)' : 'rgba(255,220,180,0.06)'; g.fillRect(r() * w | 0, r() * h | 0, 2, 1); }
      const flower = (cx, cy, s) => {
        g.fillStyle = '#5a5a26';
        for (let p = 0; p < 4; p++) { const a = p * 1.5708 + 0.785; g.beginPath(); g.ellipse(cx + Math.cos(a) * s * 1.25, cy + Math.sin(a) * s * 1.25, s * 0.55, s * 0.22, a, 0, 6.2832); g.fill(); }
        for (let p = 0; p < 8; p++) { const a = p * 0.7854; g.fillStyle = p % 2 ? '#c98a3a' : '#e2b25e'; g.beginPath(); g.ellipse(cx + Math.cos(a) * s * 0.62, cy + Math.sin(a) * s * 0.62, s * 0.5, s * 0.26, a, 0, 6.2832); g.fill(); }
        g.fillStyle = '#3e1e10'; g.beginPath(); g.arc(cx, cy, s * 0.28, 0, 6.2832); g.fill();
        g.fillStyle = '#8a5020'; g.beginPath(); g.arc(cx, cy, s * 0.14, 0, 6.2832); g.fill();
      };
      for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) {
        const cx = i * 128 + (j % 2 ? 64 : 0) + 32, cy = j * 128 + 64;
        for (const [ox, oy] of [[0, 0], [w, 0], [-w, 0], [0, h], [0, -h]]) flower(cx + ox, cy + oy, 30);
      }
      g.strokeStyle = 'rgba(40,16,8,0.45)'; g.lineWidth = 1.5; g.setLineDash([5, 3]);
      for (let k = -h; k < w + h; k += 64) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k + h, h); g.stroke(); g.beginPath(); g.moveTo(k, h); g.lineTo(k + h, 0); g.stroke(); }
      g.setLineDash([]);
    }, { repeat: true }),
    // Record sleeves standing in a bin, seen edge-on: worn card in muted colors, a white inner sleeve here and there
    records: () => T.canvas('m2:records', 256, 128, (g, w, h) => {
      const r = U.rng(12);
      const pal = ['#3a3530', '#6a2a20', '#20304a', '#b8b0a0', '#2a2a2a', '#7a6030', '#4a5a40', '#8a3a4a', '#d8d4c8', '#1a1a1a'];
      let x = 0; while (x < w) { const bw = r.range(2, 5); g.fillStyle = r.pick(pal); g.fillRect(x, 0, bw, h); g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(x + bw - 0.6, 0, 0.6, h); if (r() < 0.2) { g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(x, 0, bw, 3); } x += bw; }
      const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(255,255,255,0.08)'); gr.addColorStop(1, 'rgba(0,0,0,0.35)'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    }, { repeat: true }),
    comics: () => T.canvas('m2:comics', 512, 256, (g, w, h) => {
      const r = U.rng(21);
      for (let y = 0; y < 3; y++) for (let x = 0; x < 8; x++) { g.fillStyle = `hsl(${r() * 360 | 0},70%,${40 + r() * 20 | 0}%)`; g.fillRect(x * 64 + 4, y * 85 + 4, 56, 77); g.fillStyle = '#fff'; g.fillRect(x * 64 + 8, y * 85 + 8, 48, 12); g.fillStyle = '#000'; g.font = 'bold 9px sans-serif'; g.fillText(['X-MEN', 'BAT', 'SPIDEY', 'HULK', 'THOR', 'NOVA'][(x + y) % 6], x * 64 + 10, y * 85 + 18); }
    }),
    // One shelf of toys (the box spans a shelf): boxed figures with cellophane windows, board games
    // lying flat, balls and plush animals, all a little faded under the store lights
    toys: () => T.canvas('m2:toys', 512, 128, (g, w, h) => {
      const r = U.rng(33);
      g.fillStyle = '#0e0e10'; g.fillRect(0, 0, w, h);
      let x = 4;
      while (x < w - 10) {
        const kind = r(), hue = r() * 360 | 0;
        if (kind < 0.45) { // boxed toy with a window
          const bw = r.range(34, 58), bh = r.range(70, 118), y0 = h - bh;
          g.fillStyle = `hsl(${hue},55%,42%)`; g.fillRect(x, y0, bw, bh);
          g.fillStyle = 'rgba(200,220,230,0.35)'; g.fillRect(x + 5, y0 + bh * 0.28, bw - 10, bh * 0.5);
          g.fillStyle = `hsl(${(hue + 150) % 360},50%,55%)`; g.beginPath(); g.ellipse(x + bw / 2, y0 + bh * 0.52, bw * 0.18, bh * 0.18, 0, 0, 6.28); g.fill();
          g.fillStyle = '#f0e8d0'; g.fillRect(x + 4, y0 + 5, bw - 8, bh * 0.14);
          g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(x + bw - 3, y0, 3, bh);
          x += bw + r.range(2, 6);
        } else if (kind < 0.65) { // stack of board games
          const bw = r.range(60, 90); let y = h;
          for (let k = 0; k < r.int(2, 5); k++) { const th = r.range(10, 16); y -= th; g.fillStyle = `hsl(${(hue + k * 70) % 360},45%,${35 + k * 6}%)`; g.fillRect(x + r.range(-3, 3), y, bw, th - 1); g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(x + 8, y + 3, bw * 0.4, 2); }
          x += bw + 6;
        } else if (kind < 0.82) { // balls
          for (let k = 0; k < r.int(2, 4); k++) { const rr = r.range(10, 18), cx = x + rr, cy = h - rr; const gr = g.createRadialGradient(cx - rr * 0.4, cy - rr * 0.4, 1, cx, cy, rr); gr.addColorStop(0, `hsl(${(hue + k * 90) % 360},70%,70%)`); gr.addColorStop(1, `hsl(${(hue + k * 90) % 360},65%,30%)`); g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, rr, 0, 6.28); g.fill(); x += rr * 2 + 2; }
          x += 6;
        } else { // plush bear
          const s2 = r.range(20, 30), cx = x + s2, cy = h - s2 * 1.1, c = r.pick(['#8a6a48', '#c8b8a0', '#a04040', '#6a7a9a']);
          g.fillStyle = c; g.beginPath(); g.ellipse(cx, cy + s2 * 0.35, s2 * 0.8, s2 * 0.75, 0, 0, 6.28); g.fill();
          g.beginPath(); g.arc(cx, cy - s2 * 0.55, s2 * 0.55, 0, 6.28); g.fill();
          g.beginPath(); g.arc(cx - s2 * 0.45, cy - s2 * 1.0, s2 * 0.2, 0, 6.28); g.arc(cx + s2 * 0.45, cy - s2 * 1.0, s2 * 0.2, 0, 6.28); g.fill();
          g.fillStyle = '#111'; g.fillRect(cx - s2 * 0.22, cy - s2 * 0.62, 3, 3); g.fillRect(cx + s2 * 0.15, cy - s2 * 0.62, 3, 3);
          x += s2 * 2 + 8;
        }
      }
    }),
    vendingFront: () => T.canvas('m2:vend', 256, 512, (g, w, h) => {
      g.fillStyle = '#b01818'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#0a0a0c'; g.fillRect(16, 60, 160, 380);
      const r = U.rng(5);
      for (let y = 0; y < 6; y++) for (let x = 0; x < 4; x++) { g.fillStyle = `hsl(${r() * 360 | 0},70%,50%)`; g.fillRect(24 + x * 38, 70 + y * 60, 30, 44); }
      g.fillStyle = '#fff'; g.font = `bold 34px ${T.FONTS.FONT_TYPE}`; g.fillText('COLA', 40, 45);
      g.fillStyle = '#222'; g.fillRect(190, 120, 50, 80); g.fillStyle = '#f33'; g.fillRect(200, 130, 30, 10);
    }),
    pegboard: () => T.canvas('m2:peg', 256, 256, (g, w, h) => {
      g.fillStyle = '#9a7a52'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#3a2a18'; for (let y = 8; y < h; y += 16) for (let x = 8; x < w; x += 16) { g.beginPath(); g.arc(x, y, 2.2, 0, 6.28); g.fill(); }
    }, { repeat: true }),
    kernel: () => T.canvas('m2:kernel', 512, 256, (g, w, h) => {
      g.fillStyle = '#0b3a1e'; g.fillRect(0, 0, w, h);
      const r = U.rng(256);
      g.strokeStyle = '#c8a040'; g.lineWidth = 2;
      for (let k = 0; k < 80; k++) { g.beginPath(); let x = r() * w, y = r() * h; g.moveTo(x, y); for (let q = 0; q < 4; q++) { if (r() < 0.5) x += r.range(-60, 60); else y += r.range(-40, 40); g.lineTo(x, y); } g.stroke(); }
      for (let k = 0; k < 24; k++) { g.fillStyle = '#111'; g.fillRect(r() * w, r() * h, r.range(20, 60), r.range(10, 22)); }
      g.fillStyle = '#e8e0c0'; g.font = `bold 20px ${T.FONTS.FONT_TYPE}`; g.fillText('KERNEL REV C  —  W+E 1987', 20, h - 18);
    }),
    storeSign: () => T.canvas('m2:store', 256, 64, (g, w, h) => { g.fillStyle = '#222'; g.fillRect(0, 0, w, h); }),
    boothCurtain: () => T.canvas('m2:curt', 128, 256, (g, w, h) => {
      for (let x = 0; x < w; x++) { const v = 0.6 + 0.4 * Math.sin(x * 0.3); g.fillStyle = `rgb(${150 * v | 0},${20 * v | 0},${30 * v | 0})`; g.fillRect(x, 0, 1, h); }
    }, { repeat: true }),
    tvStatic: () => T.canvas('m2:static', 128, 96, (g, w, h) => {
      const r = U.rng(9);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const v = r() * 200 | 0; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(x, y, 1, 1); }
    }),
  });

  // ------------------------------------------------------------ materials (key -> spec)
  M.MATS = {
    nightGlass: { tex: 'nightWindow', rough: 0.05, emissive: 0xffffff, ei: 0.55, refl: 0.4 },
    chalk: { tex: 'chalk', rough: 0.9 }, alu: { color: 0xb8bcc2, rough: 0.35, metal: 0.9 },
    lockerPaint: { color: 0x3d5a78, rough: 0.45, metal: 0.4, refl: 0.1 }, lockerDark: { color: 0x1d2a38, rough: 0.5, metal: 0.4 },
    bleacherWood: { color: 0xc8965a, rough: 0.5, refl: 0.1 }, orangeRim: { color: 0xd8501a, rough: 0.4, metal: 0.5 },
    backboard: { color: 0xe8ecef, rough: 0.2, refl: 0.2 }, net: { color: 0xe0e0e0, rough: 0.9, transparent: true, opacity: 0.6, double: true },
    books: { tex: 'books', rough: 0.8 }, deskTop: { color: 0xc8a878, rough: 0.4, refl: 0.1 }, schoolSteel: { color: 0x44484e, rough: 0.5, metal: 0.6 },
    mattress: { color: 0xd8d8d0, rough: 0.9 }, sheet: { color: 0xeeeee8, rough: 0.95 }, pillow: { color: 0xf4f4ee, rough: 0.95 }, bedFrame: { color: 0xc8ccd0, rough: 0.35, metal: 0.8 },
    curtainFabric: { color: 0x8aa8b8, rough: 0.95, double: true }, ivBag: { color: 0xdfe8e8, rough: 0.1, transparent: true, opacity: 0.5 },
    spread: { tex: 'spread', rough: 0.95 }, headboard: { color: 0x5a3a24, rough: 0.5, refl: 0.08 }, couchFabric: { color: 0x6a5a3a, rough: 0.95 },
    tvScreen: { color: 0x0a0c0c, rough: 0.08, refl: 0.4 }, tvStatic: { tex: 'tvStatic', emissive: 0xffffff, ei: 0.6, rough: 0.2 },
    washerWhite: { color: 0xe8e8e2, rough: 0.3, refl: 0.2 }, glassDoor: { color: 0x202428, rough: 0.05, refl: 0.5 },
    vendingFront: { tex: 'vendingFront', emissive: 0xffffff, ei: 0.35, rough: 0.3 }, iceWhite: { color: 0xd8dcd8, rough: 0.35, metal: 0.3 },
    records: { tex: 'records', rough: 0.6 }, comics: { tex: 'comics', rough: 0.7 }, toys: { tex: 'toys', rough: 0.5 },
    clothes: { color: 0x6a3a5a, rough: 0.95 }, clothes2: { color: 0x2a4a6a, rough: 0.95 }, clothes3: { color: 0x8a8272, rough: 0.95 }, clothes4: { color: 0x3a3a38, rough: 0.95 }, soil: { color: 0x241a12, rough: 1 }, bark: { color: 0x5a4a38, rough: 0.9 }, plant2: { color: 0x44702c, rough: 0.7, double: true }, mannequin: { color: 0xcfc8ba, rough: 0.38, refl: 0.1 },
    boothBody: { color: 0x1a4a8a, rough: 0.35, metal: 0.3, refl: 0.2 }, boothCurtain: { tex: 'boothCurtain', rough: 0.95, double: true },
    mailboxBlack: { color: 0x151515, rough: 0.4, metal: 0.6 }, pegboard: { tex: 'pegboard', rough: 0.8 }, tools: { color: 0x707378, rough: 0.35, metal: 0.9 },
    toolRed: { color: 0xa01818, rough: 0.4 }, kernel: { tex: 'kernel', rough: 0.4, refl: 0.1 }, chompyFur: { color: 0xf0c020, rough: 1 }, chompyDark: { color: 0x151010, rough: 0.9 },
    fountainStone: { color: 0xb0aaa0, rough: 0.6, refl: 0.1 }, xmasGreen: { tex: 'pine', color: 0xffffff, rough: 0.95, rep: 5 }, ornRed: { color: 0xa01010, rough: 0.12, metal: 0.7, refl: 0.3 }, ornGold: { color: 0xd0a030, rough: 0.15, metal: 0.9, refl: 0.35 }, ornBlue: { color: 0x1a3aa0, rough: 0.12, metal: 0.7, refl: 0.3 }, xmasBulb: { glow: 2.6, color: 0xffd890 }, xmasStar: { glow: 3.2, color: 0xffe070 }, giftRed: { color: 0x9a1a1a, rough: 0.5 }, giftGreen: { color: 0x1a6a2a, rough: 0.5 }, giftRibbon: { color: 0xe8d070, rough: 0.35, metal: 0.4 },
    planterWood: { color: 0x6a4a30, rough: 0.7 }, plant: { color: 0x2a5a2a, rough: 0.8, double: true }, pewWood: { color: 0x5a3a24, rough: 0.45, refl: 0.1 },
    pipeRust: { color: 0x6a4a38, rough: 0.7, metal: 0.6 }, pipeGrey: { color: 0x5a6068, rough: 0.5, metal: 0.8 }, boilerRed: { color: 0x7a2418, rough: 0.6, metal: 0.4 },
    gauge: { color: 0xe8e4d8, rough: 0.3 }, keyTag: { color: 0xd8c070, rough: 0.5 }, keyBoardWood: { color: 0x4a3020, rough: 0.6 },
  };

  // ------------------------------------------------------------ SCHOOL
  D.chalkboard = [['rbox', 'alu', 3.0, 1.25, 0.04, 0.01, 0, 0, 0], ['box', 'chalk', 2.9, 1.15, 0.01, 0, 0, 0.022], ['rbox', 'alu', 2.9, 0.03, 0.08, 0.008, 0, -0.62, 0.05], ['box', 'paper', 0.08, 0.02, 0.03, -0.9, -0.6, 0.06], ['rbox', 'blackFabric', 0.14, 0.04, 0.05, 0.01, 0.8, -0.59, 0.06]];
  // A tall window with a rainy night outside (rooms with no real exterior behind them)
  D.nightWindow = [...M.frame('paintMetal', 1.0, 1.4, 0.07, 0.08, 0, 0, 0.02), ['box', 'paintMetal', 0.04, 1.3, 0.05, 0, 0, 0.02], ['box', 'paintMetal', 0.9, 0.04, 0.05, 0, 0.1, 0.02],
    ['box', 'nightGlass', 0.9, 1.3, 0.005, 0, 0, 0.0], ['rbox', 'paintMetal', 1.14, 0.05, 0.16, 0.01, 0, -0.73, 0.07]];
  // School wall clock, stopped at 3:05
  D.wallClock = [['cyl', 'blackPlastic', 0.18, 0.18, 0.05, 32, 0, 0, 0, H, 0, 0], ['cyl', 'paper', 0.16, 0.16, 0.054, 32, 0, 0, 0.001, H, 0, 0],
    ...Array.from({ length: 12 }, (_, k) => ['box', 'blackPlastic', 0.008, k % 3 ? 0.018 : 0.03, 0.002, Math.sin(k / 12 * Math.PI * 2) * 0.135, Math.cos(k / 12 * Math.PI * 2) * 0.135, 0.029, 0, 0, -k / 12 * Math.PI * 2]),
    ['box', 'blackPlastic', 0.012, 0.12, 0.003, 0.03, 0.052, 0.031, 0, 0, -0.52], ['box', 'blackPlastic', 0.075, 0.016, 0.003, 0.036, -0.002, 0.033, 0, 0, -0.04], ['box', 'redPlastic', 0.004, 0.13, 0.002, -0.03, -0.05, 0.035, 0, 0, 2.6], ['cyl', 'blackPlastic', 0.012, 0.012, 0.012, 12, 0, 0, 0.034, H, 0, 0]];
  D.teacherDesk = [['rbox', 'deskTop', 1.5, 0.04, 0.75, 0.01, 0, 0.76, 0], ['rbox', 'schoolSteel', 0.45, 0.72, 0.7, 0.01, 0.5, 0.37, 0], ['rbox', 'schoolSteel', 1.45, 0.45, 0.02, 0.005, 0, 0.5, -0.35], ...[-0.68].map(x => ['box', 'schoolSteel', 0.04, 0.74, 0.7, x, 0.37, 0]), ['box', 'paper', 0.3, 0.05, 0.22, -0.3, 0.8, 0.1, 0, 0.2], ['lathe', 'redPlastic', [[0.05, 0], [0.07, 0.06], [0.05, 0.08], [0.001, 0.08]], 16, 0.4, 0.78, -0.2]];
  D.schoolDesk = [
    ['rbox', 'deskTop', 0.6, 0.03, 0.45, 0.008, 0, 0.72, 0.05], ['box', 'schoolSteel', 0.56, 0.12, 0.38, 0, 0.64, 0.05],
    ...[[-0.26, -0.15], [0.26, -0.15], [-0.26, 0.24], [0.26, 0.24]].map(([x, z]) => ['cyl', 'schoolSteel', 0.012, 0.012, 0.66, 6, x, 0.33, z]),
    ['rbox', 'bluePlastic', 0.4, 0.03, 0.38, 0.01, 0, 0.44, -0.42], ['rbox', 'bluePlastic', 0.4, 0.3, 0.03, 0.01, 0, 0.66, -0.62, -0.1],
    ...[[-0.18, -0.28], [0.18, -0.28], [-0.18, -0.58], [0.18, -0.58]].map(([x, z]) => ['cyl', 'schoolSteel', 0.01, 0.01, 0.44, 6, x, 0.22, z]),
  ];
  D.lockerBank = (() => {
    const s = [];
    for (let k = 0; k < 5; k++) {
      const x = -0.8 + k * 0.4;
      s.push(['rbox', 'lockerPaint', 0.38, 1.8, 0.02, 0.004, x, 0.95, 0.22]);
      for (let v = 0; v < 5; v++) s.push(['box', 'lockerDark', 0.2, 0.012, 0.004, x, 1.55 + v * 0.03, 0.232]);
      s.push(['rbox', 'chrome', 0.03, 0.1, 0.03, 0.005, x + 0.13, 1.0, 0.24], ['box', 'labelCard', 0.06, 0.03, 0.002, x, 1.72, 0.232]);
    }
    s.push(['box', 'lockerDark', 2.02, 1.9, 0.44, 0, 0.95, 0], ['box', 'lockerDark', 2.02, 0.1, 0.46, 0, 0.05, 0]);
    return s;
  })();
  D.lockerHide = D.lockerBank;
  D.bleachers = (() => { const s = []; for (let k = 0; k < 4; k++) { s.push(['rbox', 'bleacherWood', 6, 0.05, 0.4, 0.01, 0, 0.4 + k * 0.4, 0.9 - k * 0.55]); s.push(['box', 'schoolSteel', 6, 0.4 + k * 0.4, 0.04, 0, (0.4 + k * 0.4) / 2, 0.72 - k * 0.55]); } s.push(['box', 'schoolSteel', 0.05, 1.8, 2.4, -3, 0.9, -0.2], ['box', 'schoolSteel', 0.05, 1.8, 2.4, 3, 0.9, -0.2]); return s; })();
  D.hoop = [['rbox', 'backboard', 1.8, 1.05, 0.04, 0.01, 0, 3.0, 0.9], ['box', 'orangeRim', 0.6, 0.45, 0.005, 0, 2.85, 0.925], ['torus', 'orangeRim', 0.23, 0.01, 20, 0, 0, 2.62, 1.2, H, 0, 0], ['lathe', 'net', [[0.23, 0], [0.16, -0.35], [0.14, -0.4]], 12, 0, 2.62, 1.2], ['cyl', 'schoolSteel', 0.04, 0.04, 0.9, 8, 0, 3.0, 0.45, H]];
  D.bookshelf = (() => { const s = [['rbox', 'darkWood', 2.2, 2.0, 0.5, 0.01, 0, 1.0, 0]]; for (let k = 0; k < 5; k++) s.push(['box', 'books', 2.1, 0.32, 0.46, 0, 0.2 + k * 0.38, 0.03]); return s; })();
  D.readingTable = [['rbox', 'deskTop', 1.8, 0.05, 0.9, 0.012, 0, 0.74, 0], ...[[-0.8, -0.35], [0.8, -0.35], [-0.8, 0.35], [0.8, 0.35]].map(([x, z]) => ['box', 'darkWood', 0.06, 0.72, 0.06, x, 0.36, z]), ['box', 'paper', 0.3, 0.04, 0.22, 0.3, 0.78, 0.1, 0, 0.3]];
  D.mopBucket = [['lathe', 'yellowPlastic', [[0.2, 0], [0.24, 0.35], [0.22, 0.36], [0.19, 0.01], [0.001, 0.01]], 16], ['cyl', 'darkWood', 0.015, 0.015, 1.3, 6, 0.08, 0.7, 0, 0.2], ['lathe', 'paper', [[0.001, 0], [0.12, 0.05], [0.06, 0.2], [0.001, 0.2]], 10, 0.03, 0.12, 0]];
  D.cafTable = [['rbox', 'deskTop', 2.4, 0.04, 0.8, 0.01, 0, 0.74, 0], ['box', 'schoolSteel', 2.2, 0.06, 0.06, 0, 0.36, 0], ...[-0.9, 0.9].map(x => ['box', 'schoolSteel', 0.06, 0.72, 0.6, x, 0.36, 0]), ['rbox', 'bluePlastic', 2.4, 0.04, 0.3, 0.01, 0, 0.45, 0.6], ['rbox', 'bluePlastic', 2.4, 0.04, 0.3, 0.01, 0, 0.45, -0.6], ['lathe', 'mug', [[0.03, 0], [0.035, 0.1], [0.001, 0.1]], 10, 0.4, 0.76, 0.1]];
  // ------------------------------------------------------------ HOSPITAL
  D.hospitalBed = [
    ['rbox', 'bedFrame', 0.95, 0.06, 2.0, 0.02, 0, 0.45, 0], ['rbox', 'mattress', 0.9, 0.16, 1.95, 0.05, 0, 0.56, 0], ['rbox', 'sheet', 0.94, 0.05, 1.3, 0.03, 0, 0.64, 0.3],
    ['rbox', 'pillow', 0.6, 0.1, 0.35, 0.05, 0, 0.66, -0.75], ['rbox', 'bedFrame', 0.95, 0.5, 0.04, 0.02, 0, 0.8, -1.0], ['rbox', 'bedFrame', 0.95, 0.35, 0.04, 0.02, 0, 0.7, 1.0],
    ...[-1, 1].map(sx => ['rbox', 'bedFrame', 0.03, 0.18, 1.1, 0.01, sx * 0.49, 0.72, -0.2]),
    ...[[-0.42, -0.9], [0.42, -0.9], [-0.42, 0.9], [0.42, 0.9]].flatMap(([x, z]) => [['cyl', 'bedFrame', 0.02, 0.02, 0.4, 8, x, 0.24, z], ['sph', 'blackPlastic', 0.04, x, 0.04, z, 8, 6]]),
  ];
  D.ivStand = [['cyl', 'chrome', 0.012, 0.012, 1.9, 8, 0, 0.95, 0], ['rbox', 'ivBag', 0.14, 0.22, 0.04, 0.02, 0.08, 1.7, 0], ['cyl', 'chrome', 0.006, 0.006, 0.2, 6, 0.04, 1.88, 0, 0, 0, H], ['tube', 'ivBag', [[0.08, 1.58, 0], [0.1, 1.2, 0.05], [0.2, 0.9, 0.3]], 0.003, 4], ...[0, 1, 2, 3, 4].map(k => ['box', 'chrome', 0.3, 0.02, 0.02, Math.cos(k * 1.256) * 0.15, 0.03, Math.sin(k * 1.256) * 0.15, 0, -k * 1.256, 0])];
  D.nightstand = [['rbox', 'drawerWood', 0.45, 0.6, 0.4, 0.01, 0, 0.3, 0], ['rbox', 'drawer', 0.4, 0.2, 0.02, 0.004, 0, 0.45, 0.2], ['rbox', 'brass', 0.08, 0.015, 0.02, 0.005, 0, 0.45, 0.215], ['lathe', 'mug', [[0.05, 0], [0.08, 0.2], [0.02, 0.22], [0.001, 0.22]], 12, -0.1, 0.6, -0.05], ['lathe', 'greenGlass', [[0.001, 0.2], [0.12, 0.05], [0.13, 0], [0.001, 0.02]], 16, -0.1, 0.8, -0.05]];
  D.curtain = (() => { const s = [['cyl', 'chrome', 0.012, 0.012, 2.4, 6, 0, 2.8, 0, 0, 0, H]]; for (let k = 0; k < 10; k++) s.push(['box', 'curtainFabric', 0.26, 2.2, 0.01, -1.1 + k * 0.24, 1.7, Math.sin(k * 1.4) * 0.05, 0, Math.sin(k * 2.1) * 0.25, 0]); return s; })();
  D.wheelchair = [['torus', 'blackPlastic', 0.3, 0.02, 24, 0, -0.28, 0.32, 0, 0, H, 0], ['torus', 'blackPlastic', 0.3, 0.02, 24, 0, 0.28, 0.32, 0, 0, H, 0], ['torus', 'chrome', 0.27, 0.008, 24, 0, -0.3, 0.32, 0, 0, H, 0], ['torus', 'chrome', 0.27, 0.008, 24, 0, 0.3, 0.32, 0, 0, H, 0], ['rbox', 'blackFabric', 0.46, 0.05, 0.42, 0.02, 0, 0.5, 0.05], ['rbox', 'blackFabric', 0.46, 0.45, 0.04, 0.02, 0, 0.78, -0.17, -0.1], ...[-0.23, 0.23].flatMap(x => [['cyl', 'chrome', 0.012, 0.012, 0.95, 6, x, 0.6, -0.2, -0.1], ['cyl', 'chrome', 0.012, 0.012, 0.5, 6, x, 0.5, 0.05, H], ['sph', 'blackPlastic', 0.05, x, 0.05, 0.35, 8, 6]])];
  // Service counter shell: closed to the customer (+z) and at the -x end, open on the staff side and
  // at the +x end (the way in), with a desk-height work surface and a shelf underneath, so there is
  // room to crouch behind it and watch the gap at the open end
  const counterShell = (mat, w, h, d) => [
    ['rbox', mat, w, h - 0.02, 0.04, 0.01, 0, (h - 0.02) / 2, d / 2 - 0.02],
    ['rbox', mat, 0.04, h - 0.02, d, 0.01, -w / 2 + 0.02, (h - 0.02) / 2, 0],
    ['rbox', 'laminate', w - 0.08, 0.03, d - 0.06, 0.006, 0, 0.74, -0.01],
    ['box', 'darkWood', w - 0.08, 0.02, d - 0.14, 0, 0.3, 0.03],
    ['box', 'kick', w - 0.08, 0.06, 0.02, 0, 0.03, d / 2 - 0.05],
  ];
  D.nurseCounter = [...counterShell('laminate', 2.8, 1.1, 0.5), ['rbox', 'laminate', 2.9, 0.04, 0.7, 0.01, 0, 1.1, 0.05], ['rbox', 'beigePlastic', 0.36, 0.3, 0.35, 0.02, -0.6, 1.28, -0.05], ['box', 'bezel', 0.3, 0.22, 0.005, -0.6, 1.3, 0.13], ['box', 'paper', 0.25, 0.06, 0.3, 0.5, 1.15, 0, 0, 0.2], ['rbox', 'beigePlastic', 0.2, 0.06, 0.18, 0.01, 0.9, 1.15, 0]];
  D.altar = [['rbox', 'pewWood', 1.6, 0.9, 0.6, 0.02, 0, 0.45, 0], ['rbox', 'lace', 1.65, 0.02, 0.62, 0.005, 0, 0.91, 0], ['cyl', 'brass', 0.02, 0.02, 0.4, 8, 0, 1.12, -0.1], ['box', 'brass', 0.25, 0.02, 0.02, 0, 1.22, -0.1], ...[-0.5, 0.5].map(x => ['cyl', 'candle', 0.03, 0.03, 0.25, 10, x, 1.04, 0])];
  D.pew = [['rbox', 'pewWood', 1.8, 0.06, 0.45, 0.01, 0, 0.45, 0], ['rbox', 'pewWood', 1.8, 0.5, 0.04, 0.01, 0, 0.72, -0.22, -0.1], ...[-0.85, 0.85].map(x => ['ext', 'pewWood', [[-0.25, 0], [0.25, 0], [0.25, 0.9], [-0.2, 0.95]], 0.04, 0.005, x, 0, 0, 0, H, 0])];
  // ------------------------------------------------------------ MOTEL
  // Motel double on a steel frame (room to hide underneath): the spread drapes over the sides and
  // foot down past the box spring and is folded back over the pillows
  D.motelBed = [
    ['rbox', 'headboard', 1.6, 1.0, 0.06, 0.02, 0, 0.5, -1.05],
    ['rbox', 'headboard', 1.64, 0.04, 0.09, 0.012, 0, 1.0, -1.05],
    ['box', 'bedFrame', 0.04, 0.05, 1.96, -0.72, 0.235, 0], ['box', 'bedFrame', 0.04, 0.05, 1.96, 0.72, 0.235, 0], ['box', 'bedFrame', 1.4, 0.05, 0.04, 0, 0.235, -0.96], ['box', 'bedFrame', 1.4, 0.05, 0.04, 0, 0.235, 0.96],
    ...[[-0.72, -0.96], [0.72, -0.96], [-0.72, 0.96], [0.72, 0.96]].flatMap(([x, z]) => [['cyl', 'bedFrame', 0.018, 0.018, 0.2, 8, x, 0.12, z], ['sph', 'blackPlastic', 0.025, x, 0.025, z, 10, 8]]),
    ['rbox', 'mattress', 1.5, 0.16, 1.98, 0.04, 0, 0.34, 0],
    ['rbox', 'mattress', 1.5, 0.2, 1.98, 0.07, 0, 0.52, 0],
    ['rbox', 'spread', 1.6, 0.05, 1.62, 0.025, 0, 0.645, 0.2],
    ['rbox', 'spread', 0.025, 0.37, 1.62, 0.012, -0.79, 0.485, 0.2], ['rbox', 'spread', 0.025, 0.37, 1.62, 0.012, 0.79, 0.485, 0.2],
    ['rbox', 'spread', 1.6, 0.37, 0.025, 0.012, 0, 0.485, 1.0],
    ['cap', 'spread', 0.05, 1.5, 0, 0.68, -0.6, 0, 0, H],
    ['rbox', 'pillow', 0.62, 0.13, 0.4, 0.06, -0.36, 0.69, -0.8, -0.12, 0.04], ['rbox', 'pillow', 0.62, 0.13, 0.4, 0.06, 0.36, 0.69, -0.8, -0.12, -0.05],
  ];

  D.dresserTv = [['rbox', 'headboard', 1.2, 0.75, 0.5, 0.01, 0, 0.38, 0], ...[0.2, 0.5].map(y => ['rbox', 'drawer', 1.1, 0.25, 0.02, 0.004, 0, y, 0.25]), ['rbox', 'beigePlastic', 0.55, 0.45, 0.45, 0.04, 0, 0.98, 0], ['box', 'tvScreen', 0.42, 0.32, 0.01, -0.03, 0.98, 0.225], ['rcyl', 'blackPlastic', 0.02, 0.02, 0.005, 10, 0.21, 1.05, 0.23, H], ['cyl', 'chrome', 0.004, 0.004, 0.4, 6, 0.1, 1.35, -0.1, 0, 0, 0.5], ['cyl', 'chrome', 0.004, 0.004, 0.4, 6, -0.1, 1.35, -0.1, 0, 0, -0.5]];
  D.frontDesk = [...counterShell('headboard', 3.0, 1.1, 0.6), ['rbox', 'laminate', 3.1, 0.05, 0.7, 0.01, 0, 1.12, 0], ['rbox', 'register', 0.4, 0.14, 0.35, 0.02, 0.8, 1.2, 0], ['box', 'paper', 0.4, 0.04, 0.3, -0.6, 1.16, 0.1, 0, 0.1], ['sph', 'chrome', 0.04, 0.1, 1.17, 0.2, 10, 6, [1, 0.5, 1]]];
  D.keyBoard = (() => { const s = [['rbox', 'keyBoardWood', 1.2, 0.8, 0.04, 0.01, 0, 0, 0]]; for (let k = 0; k < 20; k++) { const x = -0.5 + (k % 5) * 0.25, y = 0.28 - Math.floor(k / 5) * 0.18; s.push(['cyl', 'brass', 0.006, 0.006, 0.05, 6, x, y, 0.04, H]); if (k !== 11) s.push(['rbox', 'keyTag', 0.04, 0.07, 0.008, 0.003, x, y - 0.06, 0.06]); } return s; })();
  D.couch = [['rbox', 'couchFabric', 2.0, 0.42, 0.9, 0.08, 0, 0.21, 0], ['rbox', 'couchFabric', 2.0, 0.5, 0.25, 0.08, 0, 0.65, -0.33], ['rbox', 'couchFabric', 0.22, 0.3, 0.9, 0.08, -0.95, 0.55, 0], ['rbox', 'couchFabric', 0.22, 0.3, 0.9, 0.08, 0.95, 0.55, 0], ['rbox', 'couchFabric', 0.9, 0.12, 0.6, 0.05, -0.45, 0.48, 0.05], ['rbox', 'couchFabric', 0.9, 0.12, 0.6, 0.05, 0.45, 0.48, 0.05]];
  D.washer = [['rbox', 'washerWhite', 0.7, 0.9, 0.65, 0.03, 0, 0.45, 0], ['rcyl', 'chrome', 0.22, 0.03, 0.01, 24, 0, 0.45, 0.33, H], ['disc', 'glassDoor', 0.19, 0, 0.45, 0.346], ['rbox', 'beigePlastic', 0.66, 0.12, 0.05, 0.01, 0, 0.84, -0.3], ['rcyl', 'chrome', 0.025, 0.02, 0.005, 12, 0.2, 0.84, -0.27, H]];
  D.dryer = D.washer;
  D.iceMachine = [['rbox', 'iceWhite', 0.8, 1.6, 0.7, 0.03, 0, 0.8, 0], ['rbox', 'chrome', 0.5, 0.35, 0.02, 0.01, 0, 1.2, 0.36], ['box', 'labelCard', 0.4, 0.1, 0.002, 0, 1.5, 0.351], ['rbox', 'blackPlastic', 0.3, 0.15, 0.1, 0.02, 0, 0.6, 0.38]];
  D.vending = [['rbox', 'redPlastic', 0.9, 1.85, 0.8, 0.03, 0, 0.925, 0], ['box', 'vendingFront', 0.86, 1.8, 0.005, 0, 0.93, 0.402]];
  // ------------------------------------------------------------ MALL
  D.storeCounter = [...counterShell('laminate', 1.8, 1.0, 0.6), ['rbox', 'woodVarnish', 1.9, 0.05, 0.7, 0.01, 0, 1.02, 0], ['rbox', 'register', 0.4, 0.14, 0.35, 0.02, 0.5, 1.1, 0]];
  D.recordBins = [['rbox', 'darkWood', 1.0, 0.8, 0.7, 0.02, 0, 0.4, 0], ...[0, 1].flatMap(k => [['box', 'records', 0.44, 0.3, 0.55, -0.24 + k * 0.48, 0.92, 0, 0.35, 0, 0]])];
  D.comicRack = [['rbox', 'darkWood', 2.0, 1.8, 0.3, 0.01, 0, 0.9, 0], ['box', 'comics', 1.9, 1.2, 0.01, 0, 1.1, 0.16, -0.08]];
  // Open steel store shelving: back, sides, four shelves with price strips, a shelf of toys on each
  D.toyShelf = [
    ['rbox', 'paintMetal', 1.8, 1.6, 0.03, 0.006, 0, 0.8, -0.235], ['rbox', 'paintMetal', 0.03, 1.62, 0.5, 0.006, -0.885, 0.81, 0], ['rbox', 'paintMetal', 0.03, 1.62, 0.5, 0.006, 0.885, 0.81, 0],
    ['rbox', 'paintMetal', 1.8, 0.03, 0.5, 0.006, 0, 1.62, 0],
    ...[0.08, 0.6, 1.12].flatMap(y => [['rbox', 'paintMetal', 1.74, 0.025, 0.47, 0.005, 0, y, 0.005], ['box', 'labelCard', 1.74, 0.03, 0.004, 0, y - 0.005, 0.242], ['box', 'toys', 1.72, 0.44, 0.34, 0, y + 0.235, -0.04]]),
  ];
  // Clothing rail: shirts and jackets on wire hangers, hanging edge-on along a chrome rail
  D.clothesRack = (() => {
    const s = [['cyl', 'chrome', 0.012, 0.012, 1.24, 8, 0, 1.45, 0, 0, 0, H], ['cyl', 'chrome', 0.014, 0.014, 1.45, 8, -0.6, 0.725, 0], ['cyl', 'chrome', 0.014, 0.014, 1.45, 8, 0.6, 0.725, 0]];
    for (const x of [-0.6, 0.6]) s.push(['cyl', 'chrome', 0.012, 0.012, 0.5, 8, x, 0.03, 0, H], ['sph', 'blackPlastic', 0.022, x, 0.022, 0.24, 8, 6], ['sph', 'blackPlastic', 0.022, x, 0.022, -0.24, 8, 6]);
    const shirt = [[-0.2, 0], [0.2, 0], [0.21, 0.5], [0.25, 0.45], [0.3, 0.52], [0.19, 0.65], [0.07, 0.69], [0.03, 0.66], [-0.03, 0.66], [-0.07, 0.69], [-0.19, 0.65], [-0.3, 0.52], [-0.25, 0.45], [-0.21, 0.5]];
    const coat = [[-0.23, 0], [0.23, 0], [0.24, 0.6], [0.29, 0.02], [0.33, 0.04], [0.25, 0.86], [0.08, 0.9], [0.03, 0.86], [-0.03, 0.86], [-0.08, 0.9], [-0.25, 0.86], [-0.33, 0.04], [-0.29, 0.02], [-0.24, 0.6]];
    const mats = ['clothes', 'clothes2', 'clothes3', 'clothes', 'clothes4', 'clothes2'];
    for (let k = 0; k < 12; k++) {
      const x = -0.5 + k * 0.09, long = k % 5 === 2, pts = long ? coat : shirt, hgt = long ? 0.9 : 0.69, ry = H + (k % 3 - 1) * 0.06;
      s.push(['ext', mats[k % mats.length], pts, 0.03, 0.008, x, 1.4 - hgt, 0, 0, ry, 0]);
      s.push(['cyl', 'chrome', 0.003, 0.003, 0.4, 5, x, 1.395, 0, H], ['torus', 'chrome', 0.018, 0.0025, 10, 6.2832, x, 1.45, 0, 0, H, 0]);
    }
    return s;
  })();
  // Store mannequin on its stand: the same sculpted parts as the ones that walk (one of them might be)
  PB.Props.shapes.mq = a => ({ g: PB.Monsters.mqGeo(a[0]).clone(), pos: [a[1], a[2], a[3]], rot: [a[4] || 0, a[5] || 0, a[6] || 0] });
  D.mannequinStatic = (() => {
    const s = [['rcyl', 'chrome', 0.2, 0.02, 0.008, 24, 0, 0.01, 0], ['cyl', 'chrome', 0.012, 0.012, 0.52, 8, 0.04, 0.28, -0.02]];
    const y0 = 0.06;
    s.push(['mq', 'mannequin', 'torso', 0, 1.28 + y0, 0], ['mq', 'mannequin', 'head', 0, 1.72 + y0, 0.01, 0.06, 0.12, 0]);
    for (const sx of [-1, 1]) {
      const rz = sx * 0.1, ex = sx * 0.2 + Math.sin(rz) * 0.36, ey = 1.56 + y0 - Math.cos(rz) * 0.36;
      s.push(['mq', 'mannequin', 'upperArm', sx * 0.2, 1.56 + y0, 0, 0, 0, rz], ['mq', 'mannequin', 'foreArm', ex, ey, 0, sx < 0 ? -0.35 : -0.12, 0, rz]);
      s.push(['mq', 'mannequin', 'thigh', sx * 0.09, 0.9 + y0, 0, sx < 0 ? -0.05 : 0.04, 0, 0], ['mq', 'mannequin', 'shin', sx * 0.09, 0.42 + y0, sx < 0 ? -0.024 : 0.02, sx < 0 ? 0.03 : -0.02, 0, 0]);
    }
    return s;
  })();
  D.photoBooth = [['rbox', 'boothBody', 1.2, 2.1, 1.3, 0.04, 0, 1.05, 0], ['box', 'boothCurtain', 0.7, 1.6, 0.02, -0.15, 1.05, 0.66], ['rbox', 'chrome', 0.3, 0.5, 0.04, 0.01, 0.4, 1.2, 0.66], ['box', 'socket', 0.12, 0.02, 0.01, 0.4, 0.95, 0.685], ['box', 'labelCard', 0.9, 0.2, 0.01, 0, 2.0, 0.66]];
  D.fountain = [['lathe', 'fountainStone', [[0.001, 0], [2.0, 0], [2.0, 0.45], [1.85, 0.5], [1.8, 0.1], [0.001, 0.1]], 40], ['lathe', 'water', [[1.8, 0.35], [0.001, 0.35]], 40], ['lathe', 'fountainStone', [[0.25, 0.35], [0.2, 1.3], [0.7, 1.4], [0.7, 1.5], [0.15, 1.52], [0.1, 2.0], [0.001, 2.0]], 24]];
  // Mall Christmas tree: stacked, jittered branch tiers, glass baubles, a spiral of warm bulbs, a star, presents
  D.xmasTree = (() => {
    const s = [['cyl', 'darkWood', 0.12, 0.16, 0.8, 10, 0, 0.4, 0]];
    for (let k = 0; k < 7; k++) {
      const y = 0.75 + k * 0.52, rr = 1.55 - k * 0.2;
      for (let j = 0; j < 3; j++) s.push(['cone', 'xmasGreen', rr * (1 - j * 0.07), 0.95, 14, Math.cos(k * 2.1 + j * 2.09) * 0.05, y + j * 0.06, Math.sin(k * 2.1 + j * 2.09) * 0.05, 0.05 * Math.sin(k + j), (k * 0.7 + j) % 6.28, 0.05 * Math.cos(k * 1.3 + j)]);
    }
    const mats = ['ornRed', 'ornGold', 'ornBlue'];
    for (let k = 0; k < 44; k++) { const y = 0.7 + (k / 44) * 3.4, rr = Math.max(0.12, (1.5 - (y - 0.7) * 0.4)) * 0.92, a = k * 2.399; s.push(['sph', mats[k % 3], k % 5 ? 0.055 : 0.08, Math.cos(a) * rr, y - 0.18, Math.sin(a) * rr, 12, 10]); }
    for (let k = 0; k < 90; k++) { const t = k / 90, y = 0.65 + t * 3.5, rr = Math.max(0.1, (1.52 - (y - 0.65) * 0.4)) * 0.95, a = t * 6.28 * 6; s.push(['sph', 'xmasBulb', 0.022, Math.cos(a) * rr, y - 0.2, Math.sin(a) * rr, 6, 4]); }
    s.push(['cone', 'xmasStar', 0.16, 0.3, 5, 0, 4.42, 0], ['cone', 'xmasStar', 0.16, 0.3, 5, 0, 4.42, 0, Math.PI, 0.6, 0], ['sph', 'xmasStar', 0.07, 0, 4.42, 0, 10, 8]);
    [[0.9, 0.5, 'giftRed', 0.5, 0.35, 0.45], [-0.8, 0.8, 'giftGreen', 0.45, 0.45, 0.4], [0.3, -1.0, 'giftRed', 0.6, 0.3, 0.5], [-0.6, -0.7, 'giftGreen', 0.35, 0.3, 0.35], [1.05, -0.35, 'giftGreen', 0.3, 0.25, 0.3]].forEach(([x, z, m, w, h, d]) => {
      s.push(['rbox', m, w, h, d, 0.01, x, h / 2, z, 0, (x * 3) % 1.5, 0], ['box', 'giftRibbon', w + 0.01, h + 0.01, 0.05, x, h / 2, z, 0, (x * 3) % 1.5, 0], ['box', 'giftRibbon', 0.05, h + 0.012, d + 0.01, x, h / 2, z, 0, (x * 3) % 1.5, 0]);
    });
    return s;
  })();
  D.mallBench = [['rbox', 'woodVarnish', 1.8, 0.06, 0.45, 0.01, 0, 0.45, 0], ['rbox', 'woodVarnish', 1.8, 0.4, 0.05, 0.01, 0, 0.72, -0.2, -0.1], ...[-0.75, 0.75].map(x => ['rbox', 'darkMetal', 0.08, 0.45, 0.45, 0.02, x, 0.22, 0])];
  // Mall planter: a wooden box with a rim, dark soil and a dracaena of long arching leaves, each leaf
  // two tapered blades (the outer one bent further down)
  D.planter = (() => {
    const s = [['rbox', 'planterWood', 1.0, 0.6, 1.0, 0.02, 0, 0.3, 0], ['rbox', 'planterWood', 1.06, 0.05, 1.06, 0.01, 0, 0.6, 0], ['box', 'soil', 0.92, 0.02, 0.92, 0, 0.6, 0]];
    s.push(['cyl', 'bark', 0.035, 0.045, 0.7, 7, 0.05, 0.95, 0.02, 0.05, 0, -0.04], ['cyl', 'bark', 0.03, 0.04, 0.5, 7, -0.08, 0.85, -0.05, -0.08, 0, 0.1]);
    const r = U.rng(71), blade = (len, w0, w1) => [[0.001, 0], [w0, len * 0.08], [Math.max(w0, w1) * 1.05, len * 0.45], [w1, len * 0.85], [0.001, len]];
    for (let k = 0; k < 26; k++) {
      const top = k < 12, bx = top ? r.range(-0.06, 0.12) : r.range(-0.12, 0.12), by = top ? r.range(1.15, 1.32) : r.range(0.62, 1.05), bz = top ? r.range(-0.08, 0.1) : r.range(-0.12, 0.12);
      const f = r.range(0, 6.2832), t = r.range(0.25, 0.9), L1 = r.range(0.28, 0.42), L2 = r.range(0.25, 0.38), mat = r() < 0.5 ? 'plant' : 'plant2';
      const e = [-L1 * Math.sin(t) * Math.cos(f), L1 * Math.cos(t), L1 * Math.sin(t) * Math.sin(f)];
      s.push(...M.place([['lathe', mat, blade(L1, 0.02, 0.035), 6, 0, 0, 0, 0, 0, 0, [0.12, 1, 1]]], bx, by, bz, 0, f, t));
      s.push(...M.place([['lathe', mat, blade(L2, 0.035, 0.012), 6, 0, 0, 0, 0, 0, 0, [0.12, 1, 1]]], bx + e[0], by + e[1], bz + e[2], 0, f, Math.min(t + r.range(0.45, 0.8), 2.2)));
    }
    return s;
  })();
  D.kiosk = [['rbox', 'chompyFur', 2.0, 1.0, 1.2, 0.05, 0, 0.5, 0], ['rbox', 'woodVarnish', 2.1, 0.05, 1.3, 0.01, 0, 1.02, 0], ...[-0.9, 0.9].map(x => ['cyl', 'chrome', 0.03, 0.03, 1.4, 8, x, 1.75, 0]), ['rbox', 'redPlastic', 2.2, 0.3, 1.4, 0.03, 0, 2.5, 0]];
  // ------------------------------------------------------------ STREET
  // Unit gable roof (scaled to each house)
  D.roof = [['ext', 'roofShingle', [[-0.5, 0], [0.5, 0], [0, 0.42]], 1.0, 0, 0, 0, 0, 0, H, 0, 'roofShingle']];
  D.mailboxPost = [['cyl', 'darkWood', 0.04, 0.04, 1.1, 8, 0, 0.55, 0], ['rbox', 'mailboxBlack', 0.2, 0.2, 0.45, 0.06, 0, 1.2, 0], ['box', 'redPlastic', 0.02, 0.18, 0.04, 0.11, 1.28, -0.1]];
  // ------------------------------------------------------------ WORKSHOP
  D.workbench = [['rbox', 'woodVarnish', 2.2, 0.08, 0.8, 0.01, 0, 0.88, 0], ...[[-1.0, -0.3], [1.0, -0.3], [-1.0, 0.3], [1.0, 0.3]].map(([x, z]) => ['box', 'darkWood', 0.08, 0.84, 0.08, x, 0.42, z]), ['box', 'darkWood', 2.1, 0.04, 0.7, 0, 0.2, 0], ['rbox', 'toolRed', 0.3, 0.2, 0.25, 0.02, -0.7, 1.02, 0.1], ['rbox', 'tools', 0.12, 0.1, 0.3, 0.01, 0.9, 0.97, 0.25], ['cyl', 'tools', 0.02, 0.02, 0.25, 6, 0.3, 0.93, 0.1, 0, 0.5, H], ['rbox', 'beigePlastic', 0.4, 0.3, 0.35, 0.02, 0.2, 1.07, -0.15], ['box', 'tvStatic', 0.3, 0.22, 0.005, 0.2, 1.07, 0.03]];
  D.pegboard = [['box', 'pegboard', 2.0, 1.2, 0.02, 0, 0, 0], ...[[-0.7, 0.2], [-0.4, 0.3], [0, 0.1], [0.4, 0.25], [0.7, -0.2], [-0.2, -0.3]].map(([x, y], k) => ['box', k % 2 ? 'tools' : 'toolRed', 0.04, 0.3, 0.02, x, y, 0.03, 0, 0, (k - 3) * 0.1])];
  D.tvStack = (() => { const s = []; for (let k = 0; k < 6; k++) { const x = -0.5 + (k % 3) * 0.5, y = Math.floor(k / 3) * 0.48; s.push(['rbox', k % 2 ? 'beigePlastic' : 'blackPlastic', 0.48, 0.44, 0.45, 0.03, x, 0.22 + y, 0], ['box', k === 1 || k === 5 ? 'tvStatic' : 'tvScreen', 0.36, 0.28, 0.005, x - 0.03, 0.22 + y, 0.227]); } return s; })();
  D.oscilloscope = [['rbox', 'beigePlastic', 0.32, 0.18, 0.4, 0.02, 0, 0.99, 0], ['box', 'lcd', 0.12, 0.09, 0.005, -0.06, 1.0, 0.202], ...[0.06, 0.12].map(x => ['rcyl', 'blackPlastic', 0.012, 0.01, 0.003, 10, x, 1.0, 0.205, H])];
  D.kernel = [['rbox', 'darkMetal', 2.6, 1.8, 0.9, 0.03, 0, 0.9, 0], ['box', 'kernel', 2.4, 1.2, 0.005, 0, 1.0, 0.453], ...[-0.8, 0, 0.8].map(x => ['rcyl', 'chrome', 0.06, 0.04, 0.01, 20, x, 1.72, 0.47, H]), ['rbox', 'blackPlastic', 0.9, 0.5, 0.5, 0.03, 0, 2.05, 0], ['box', 'tvStatic', 0.7, 0.35, 0.005, 0, 2.05, 0.253], ...Array.from({ length: 6 }, (_, k) => ['tube', 'blackPlastic', [[-1.2 + k * 0.45, 0.3, 0.45], [-1.1 + k * 0.4, 0.05, 0.8], [-0.6 + k * 0.2, 0.01, 1.3]], 0.015, 6])];
  // Costume stand; the costume itself is Chompy, standing on it until it isn't
  D.chompyStand = [['cyl', 'darkMetal', 0.3, 0.35, 0.05, 16, 0, 0.025, 0], ['cyl', 'chrome', 0.02, 0.02, 1.9, 8, 0, 0.97, 0], ['cyl', 'chrome', 0.015, 0.015, 0.7, 8, 0, 1.9, 0, 0, 0, H]];
  // ------------------------------------------------------------ TUNNELS
  D.wallPipes = [['cyl', 'pipeRust', 0.09, 0.09, 3.0, 12, 0, 2.3, 0.05, 0, 0, H], ['cyl', 'pipeGrey', 0.05, 0.05, 3.0, 10, 0, 2.05, 0.08, 0, 0, H], ...[-1.2, 0, 1.2].map(x => ['box', 'darkMetal', 0.04, 0.35, 0.2, x, 2.2, 0.0]), ['rcyl', 'pipeRust', 0.12, 0.06, 0.01, 12, 0.6, 2.3, 0.05, 0, 0, H]];
  D.boiler = [['cyl', 'boilerRed', 0.9, 0.9, 2.6, 24, 0, 1.3, 0], ['lathe', 'boilerRed', [[0.9, 0], [0.7, 0.3], [0.2, 0.45], [0.001, 0.46]], 24, 0, 2.6, 0], ...[0.8, 1.6].map(y => ['torus', 'darkMetal', 0.91, 0.03, 24, 0, 0, y, 0, H, 0, 0]), ['rcyl', 'gauge', 0.1, 0.03, 0.01, 20, 0.5, 1.6, 0.76, H], ['cyl', 'pipeGrey', 0.1, 0.1, 1.5, 12, 0, 3.4, 0]];
})(typeof window !== 'undefined' ? window : globalThis);
