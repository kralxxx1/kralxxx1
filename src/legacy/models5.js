/* Models for Pinewood, a drive-in cinema in a spruce forest on the last night of its 1975 season:
   the screen tower with its back bracing, speaker posts with window speakers on coiled cords, the
   roadside marquee, the 35 mm projector and its reel cans, a rewind bench, the snack bar (popcorn
   cabinet, hot-dog roller, soda fountain, menu board, candy counter), the ticket kiosk, toilet stalls
   and urinals, a swing set below the screen, picnic tables, yard lights on wooden poles, the chained
   exit gate, a car battery, car keys on a red tag, a hunter's tree stand, stumps, fallen logs, rocks
   and undergrowth. Also better spruces (drooping, ragged boughs) for every forest in the game.
   Same spec conventions as props.js / models.js. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ a ragged spruce bough tier
  // ['bough', mat, radius, height, branches, droop, seed, x, y, z, rx, ry, rz]
  // A star of drooping branch tips round a peak, with notches between them and an underside, so a stack
  // of them reads as a spruce rather than a pile of cones.
  P.shapes.bough = a => {
    const [R, h, n, droop, seed, , , , , , , segs] = a, r = U.rng(seed || 1), SEG = segs || 4;
    const pos = [], uv = [];
    const tri = (p, q, s2, u0, u1) => { pos.push(...p, ...q, ...s2); uv.push(u0, 0, u1, 0, (u0 + u1) / 2, 1); };
    // each branch: a ridged strip from the trunk out to a drooping tip, its edges notched like needles
    for (let k = 0; k < n; k++) {
      const ang = (k + r.range(-0.25, 0.25)) / n * PI * 2, len = R * r.range(0.75, 1.1), dr = droop * r.range(0.7, 1.25);
      const ca = Math.cos(ang), sa = Math.sin(ang), px = -sa, pz = ca, w0 = Math.min(0.55, len * 0.36) * r.range(0.8, 1.1);
      let pL = null, pC = null, pR = null;
      for (let i = 0; i <= SEG; i++) {
        const t = i / SEG, rad = 0.05 + t * len;
        const y = h * 0.3 * (1 - t) - dr * Math.pow(t, 1.6) + Math.sin(t * PI) * h * 0.12 + (t > 0.85 ? (t - 0.85) * dr * 0.8 : 0);
        const w = (w0 * Math.sin(Math.min(1, t + 0.18) * PI * 0.92) * (1 - t * 0.55) + 0.015) * (i % 2 ? 0.72 : 1);
        const C = [ca * rad, y + w * 0.18, sa * rad], L = [C[0] + px * w, y - w * 0.2, C[2] + pz * w], Rr = [C[0] - px * w, y - w * 0.2, C[2] - pz * w];
        if (pC) { tri(pC, C, pL, 0.5, 0.5); tri(C, L, pL, 0.5, 0); tri(pC, pR, C, 0.5, 1); tri(C, pR, Rr, 0.5, 1); }
        pL = L; pC = C; pR = Rr;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return { g, pos: [a[5] || 0, a[6] || 0, a[7] || 0], rot: [a[8] || 0, a[9] || 0, a[10] || 0] };
  };
  // ['frond', mat, length, width, arch, seed, x, y, z, rx, ry, rz]: a fern frond, a strip of leaflets
  // arching out and down from the base along +z
  P.shapes.frond = a => {
    const [len, wid, arch, seed] = a, r = U.rng(seed || 3), n = 9, pos = [], uv = [];
    const spine = k => { const t = k / n; return [0, Math.sin(t * PI * 0.9) * arch * len - t * t * len * 0.25, t * len]; };
    for (let k = 0; k < n; k++) {
      const p0 = spine(k), p1 = spine(k + 1), t = k / n, w = wid * Math.sin((t + 0.08) * PI) * r.range(0.8, 1.1);
      for (const sd of [-1, 1]) {
        const tip = [p0[0] + sd * w, p0[1] - w * 0.3, (p0[2] + p1[2]) / 2 + w * 0.2];
        pos.push(...p0, ...p1, ...tip); uv.push(0.5, t, 0.5, t + 1 / n, sd > 0 ? 1 : 0, t);
      }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.computeVertexNormals();
    return { g, pos: [a[4] || 0, a[5] || 0, a[6] || 0], rot: [a[7] || 0, a[8] || 0, a[9] || 0] };
  };
  // ['rock', mat, radius, seed, sx, sy, sz, x, y, z, ry]: a lumpy boulder (a displaced icosphere)
  P.shapes.rock = a => {
    const [rad, seed, sx, sy, sz] = a, g = new THREE.IcosahedronGeometry(rad, 2), p = g.attributes.position, r = U.rng(seed || 1);
    const o = [r.range(0, 9), r.range(0, 9), r.range(0, 9)];
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i), l = Math.hypot(x, y, z) || 1;
      const n = PB.SDF ? PB.SDF.fbm(x * 1.6 + o[0], y * 1.6 + o[1], z * 1.6 + o[2], 3) : 0;
      const k = 1 + n * 0.35 + (y < -rad * 0.2 ? -0.15 : 0);
      p.setXYZ(i, x / l * rad * k * (sx || 1), Math.max(y / l * rad * k, -rad * 0.25) * (sy || 1), z / l * rad * k * (sz || 1));
    }
    g.computeVertexNormals();
    return { g, pos: [a[5] || 0, a[6] || 0, a[7] || 0], rot: [0, a[8] || 0, 0] };
  };
  // Norway spruce, three shapes; the forests pick between them. 'far' versions (fewer, coarser boughs)
  // fill the band of trees beyond the map edge, where the fog has them
  const spruce = (seed, snow, tall = 1, far = false) => {
    const r = U.rng(seed), s = [['cyl', 'treeBark', 0.07, 0.25, 5.0 * tall, far ? 6 : 9, 0, 2.5 * tall, 0]];
    // dead lower branches: bare twigs on the bottom of the trunk
    if (!far) for (let k = 0; k < 9; k++) { const a = r.range(0, PI * 2), y = r.range(1.0, 2.7) * tall, l = r.range(0.4, 1.0); s.push(['cyl', 'deadTwig', 0.008, 0.025, l, 4, Math.cos(a) * l * 0.45, y - 0.08, Math.sin(a) * l * 0.45, 0, -a, H + 0.25]); }
    const tiers = far ? 8 : 11;
    for (let k = 0; k < tiers; k++) {
      // the lowest living branches start above head height; below them only dead twigs
      const f = k / tiers, y = (2.6 + k * (far ? 1.18 : 0.86)) * tall, rad = 2.4 * Math.pow(1 - f, 1.1) + 0.3;
      s.push(['bough', 'spruce', rad, 0.95 + (1 - f) * 0.5, (far ? 6 : 8) + (k % 3), 0.55 + (1 - f) * 0.5, seed * 31 + k, 0, y, 0, 0, r.range(0, 6.28), 0, far ? 2 : 4]);
      if (snow) s.push(['bough', 'snowCap', rad * 0.85, 0.55, (far ? 6 : 8) + (k % 3), 0.3, seed * 31 + k, 0, y + 0.2, 0, 0, r.range(0, 6.28), 0, far ? 2 : 3]);
    }
    s.push(['cone', 'spruce', 0.32, 1.4, 7, 0, (2.6 + tiers * (far ? 1.18 : 0.86) + 0.4) * tall, 0]);
    return s;
  };
  D.pine = spruce(3, false); D.pine2 = spruce(7, false, 1.15); D.pine3 = spruce(11, false, 0.85);
  D.pineSnow = spruce(3, true); D.pineSnow2 = spruce(7, true, 1.15);
  D.pineFar = spruce(5, false, 1.1, true); D.pineFar2 = spruce(13, false, 0.9, true); D.pineSnowFar = spruce(5, true, 1.1, true);

  // ------------------------------------------------------------ textures
  Object.assign(M.tex, {
    // The screen's face: painted steel panels gone grey, rust weeping from every seam, a water stain
    screenPanels: () => T.canvas('m5:screen', 1024, 512, (g, w, h) => {
      const r = U.rng(1975);
      g.fillStyle = '#b9b7ae'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 900; k++) { g.fillStyle = `rgba(${r() < 0.5 ? '255,255,250' : '80,76,66'},${r.range(0.02, 0.07)})`; g.fillRect(r() * w, r() * h, r.range(4, 60), r.range(2, 18)); }
      const cols = 22, rows = 6, pw = w / cols, ph = h / rows;
      for (let c = 1; c < cols; c++) { g.fillStyle = 'rgba(60,56,50,0.45)'; g.fillRect(c * pw - 1, 0, 2, h); }
      for (let rr = 1; rr < rows; rr++) { g.fillStyle = 'rgba(60,56,50,0.35)'; g.fillRect(0, rr * ph - 1, w, 2); }
      // rust runs from the bolts and seams
      for (let k = 0; k < 140; k++) {
        const x = Math.round(r.int(1, cols - 1)) * pw + r.range(-3, 3), y = r.int(0, rows - 1) * ph + r.range(0, 6), len = r.range(10, 120);
        const gr = g.createLinearGradient(0, y, 0, y + len); gr.addColorStop(0, `rgba(110,60,25,${r.range(0.25, 0.6)})`); gr.addColorStop(1, 'rgba(110,60,25,0)');
        g.fillStyle = gr; g.fillRect(x - r.range(1, 3), y, r.range(2, 6), len);
      }
      // the big stain where the gutter overflowed, and patches of missing paint
      const st = g.createRadialGradient(w * 0.68, h * 0.95, 10, w * 0.68, h * 0.95, h * 0.7); st.addColorStop(0, 'rgba(70,64,50,0.45)'); st.addColorStop(1, 'rgba(70,64,50,0)'); g.fillStyle = st; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 30; k++) { g.fillStyle = `rgba(90,88,80,${r.range(0.3, 0.6)})`; g.beginPath(); g.ellipse(r() * w, r() * h, r.range(3, 16), r.range(2, 9), r() * 3, 0, 6.28); g.fill(); }
    }),
    // The marquee by the road: letters on a white board, both sides
    marqueeBoard: () => T.canvas('m5:marquee', 1024, 512, (g, w, h) => {
      const r = U.rng(22);
      g.fillStyle = '#e8e4d8'; g.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 64) { g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(0, y, w, 3); }
      g.fillStyle = '#141414'; g.textAlign = 'center';
      const line = (s, y, sz) => { g.font = `bold ${sz}px ${T.FONTS.FONT_SANS || 'sans-serif'}`; let x = w / 2 - g.measureText(s).width / 2; for (const ch of s) { const cw = g.measureText(ch).width; g.save(); g.translate(x + cw / 2, y); g.rotate(r.range(-0.04, 0.04)); g.fillText(ch, 0, r.range(-2, 2)); g.restore(); x += cw; } };
      g.fillStyle = '#9a1414'; line('LAST NIGHT OF THE SEASON', 74, 52);
      g.fillStyle = '#141414'; line('THE LONG SUMMER', 196, 74); line('+  NIGHT LAKE', 300, 74);
      g.fillStyle = '#333'; line('GATES 7:30   SHOW AT DUSK', 420, 46);
      // two letters fallen off
      g.fillStyle = '#e8e4d8'; g.fillRect(w * 0.31, 150, 46, 70); g.fillRect(w * 0.62, 254, 42, 70);
      for (let k = 0; k < 60; k++) { g.fillStyle = `rgba(90,70,40,${r.range(0.05, 0.2)})`; g.fillRect(r() * w, r() * h, r.range(4, 40), r.range(20, 120)); }
    }),
    pinewoodSign: () => T.canvas('m5:pinewoodSign', 1024, 256, (g, w, h) => {
      g.fillStyle = '#1a2a1e'; g.fillRect(0, 0, w, h);
      g.strokeStyle = '#d8c890'; g.lineWidth = 6; g.strokeRect(10, 10, w - 20, h - 20);
      g.fillStyle = '#e8d8a0'; g.font = `bold 128px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('PINEWOOD', w / 2 - 60, 160);
      g.font = `bold 48px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.fillText('DRIVE-IN', w - 170, 210);
      // a stylised spruce
      g.fillStyle = '#e8d8a0'; g.beginPath(); g.moveTo(w - 150, 30); g.lineTo(w - 90, 140); g.lineTo(w - 210, 140); g.fill(); g.fillRect(w - 156, 140, 12, 22);
    }),
    snackMenu: () => T.canvas('m5:snackMenu', 1024, 384, (g, w, h) => {
      g.fillStyle = '#16120e'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#e8c860'; g.font = `bold 54px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('SNACK BAR', w / 2, 64);
      const items = [['POPCORN', '35 / 50'], ['HOT DOG', '60'], ['SODA', '25'], ['COFFEE', '20'], ['CANDY', '15'], ['ICE CREAM', '30']];
      g.font = `34px ${T.FONTS.FONT_SANS || 'sans-serif'}`;
      items.forEach(([n, p], k) => { const col = k % 2, row = k >> 1, x = 60 + col * w / 2, y = 140 + row * 74; g.textAlign = 'left'; g.fillStyle = '#f2ead8'; g.fillText(n, x, y); g.textAlign = 'right'; g.fillStyle = '#e8c860'; g.fillText(p, x + w / 2 - 110, y); });
      g.fillStyle = 'rgba(255,255,255,0.05)'; g.fillRect(0, 0, w, 6);
    }),
    restroomSign: () => T.canvas('m5:restroom', 512, 128, (g, w, h) => {
      g.fillStyle = '#2a4a6a'; g.fillRect(0, 0, w, h); g.fillStyle = '#f2f0e8'; g.font = `bold 56px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('MEN', w / 4, 84); g.fillText('WOMEN', w * 3 / 4, 84); g.fillRect(w / 2 - 2, 14, 4, h - 28);
    }),
    admitSign: () => T.canvas('m5:admit', 512, 128, (g, w, h) => {
      g.fillStyle = '#7a1414'; g.fillRect(0, 0, w, h); g.fillStyle = '#f2e8c8'; g.font = `bold 50px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('ADMISSION', w / 2, 62); g.font = `28px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.fillText('per car  4.50', w / 2, 104);
    }),
    batteryLabel: () => T.canvas('m5:battery', 256, 128, (g, w, h) => {
      g.fillStyle = '#d8a818'; g.fillRect(0, 0, w, h); g.fillStyle = '#141414'; g.font = `bold 40px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.textAlign = 'center'; g.fillText('12 V', w / 2, 58); g.font = `22px ${T.FONTS.FONT_SANS || 'sans-serif'}`; g.fillText('HEAVY DUTY', w / 2, 96);
    }),
    ticketStub: () => T.canvas('m5:stub', 256, 128, (g, w, h) => {
      g.fillStyle = '#d8b850'; g.fillRect(0, 0, w, h); g.fillStyle = 'rgba(120,80,20,0.25)'; for (let k = 0; k < 40; k++) g.fillRect(Math.random() * w, Math.random() * h, 6, 2);
      g.fillStyle = '#5a2010'; g.font = `bold 26px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText('PINEWOOD', w / 2, 34); g.font = `18px ${T.FONTS.FONT_TYPE}`; g.fillText('CHILD   22 AUG 75', w / 2, 66); g.font = `bold 30px ${T.FONTS.FONT_TYPE}`; g.fillText('No 1147', w / 2, 106);
      g.fillStyle = '#c8a840'; for (let y = 0; y < h; y += 10) g.fillRect(w - 6, y, 6, 5);
    }),
    canLabel: () => T.canvas('m5:canLabel', 256, 64, (g, w, h) => { g.fillStyle = '#e8e0c8'; g.fillRect(0, 0, w, h); g.fillStyle = '#222'; g.font = `bold 22px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText('NIGHT LAKE  R.3', w / 2, 40); }),
  });

  Object.assign(M.MATS, {
    screenFace: { tex: 'screenPanels', rough: 0.92 }, screenFrame: { color: 0x121212, rough: 0.7, metal: 0.3 }, timber: { color: 0x4a3c2c, rough: 0.92 }, timberGrey: { color: 0x5e574c, rough: 0.95 },
    barnBoards: { color: 0x5a4a38, rough: 0.95 }, anchorConcrete: { color: 0x7a7870, rough: 0.9 }, speakerGrey: { color: 0x8a8e88, rough: 0.45, metal: 0.6 }, speakerAlu: { color: 0xa0a4a0, rough: 0.35, metal: 0.8, refl: 0.15 },
    speakerGrille: { color: 0x1e1e1c, rough: 0.6, metal: 0.4 }, cordBlack: { color: 0x101010, rough: 0.5 },
    projGreen: { color: 0x3c4a44, rough: 0.42, metal: 0.5, refl: 0.1 }, glassLens: { color: 0x1a2028, rough: 0.04, metal: 0.2, refl: 0.5 }, canTin: { color: 0x9c9a92, rough: 0.35, metal: 0.85, refl: 0.15 },
    filmReel: { color: 0x1c1610, rough: 0.35 }, reelAlu: { color: 0xb0b0aa, rough: 0.3, metal: 0.9 }, canLabel: { tex: 'canLabel', rough: 0.8 },
    popcornRed: { color: 0xa8161a, rough: 0.35, metal: 0.2, refl: 0.12 }, popcorn: { color: 0xead8a2, rough: 1 }, counterCream: { color: 0xd8ceb0, rough: 0.5 }, counterRed: { color: 0x8a1a18, rough: 0.45 },
    sausage: { color: 0x8a3a22, rough: 0.35, refl: 0.1 }, paperCup: { color: 0xe8e4dc, rough: 0.8 }, menuFrame: { color: 0x2a2018, rough: 0.6 }, snackMenu: { tex: 'snackMenu', rough: 0.5, emissive: 0xffffff, ei: 0.35 },
    marqueeBoard: { tex: 'marqueeBoard', rough: 0.6, emissive: 0xffffff, ei: 0.08 }, marqueeFrame: { color: 0x7a1414, rough: 0.5, metal: 0.3 }, pinewoodSign: { tex: 'pinewoodSign', rough: 0.6 },
    bulbOff: { color: 0xd8d0b8, rough: 0.2, transparent: true, opacity: 0.8 }, bulbLit: { color: 0xffd890, glow: 1.4 },
    restroomSign: { tex: 'restroomSign', rough: 0.5 }, admitSign: { tex: 'admitSign', rough: 0.5 }, stallPaint: { color: 0x5a6a62, rough: 0.45, metal: 0.4 }, porcelain: { color: 0xe8e6e0, rough: 0.15, refl: 0.2 },
    swingPipe: { color: 0x5a6a7a, rough: 0.5, metal: 0.6 }, swingSeat: { color: 0x1a1a1a, rough: 0.7 }, chainSteel: { color: 0x7a7a74, rough: 0.4, metal: 0.9 }, picnicWood: { color: 0x6a5238, rough: 0.9 },
    batteryBlack: { color: 0x141414, rough: 0.45 }, batteryLabel: { tex: 'batteryLabel', rough: 0.5 }, lead: { color: 0x6a6a6a, rough: 0.5, metal: 0.8 }, tagRed: { color: 0xb01818, rough: 0.4 },
    ticketStub: { tex: 'ticketStub', rough: 0.8 }, deadTwig: { color: 0x3a3028, rough: 1 }, woodCut: { color: 0x9a7a52, rough: 0.9 }, rockGrey: { color: 0x5a5a56, rough: 0.9 }, moss: { color: 0x2a3a1e, rough: 1 }, shrub: { color: 0x14200f, rough: 1 },
    lampShade: { color: 0x2a3a2e, rough: 0.5, metal: 0.4 }, cotCanvas: { color: 0x4a5236, rough: 1 }, padlock: { color: 0x8a7a3a, rough: 0.3, metal: 0.9 },
  });

  // ------------------------------------------------------------ the screen tower
  // Faces +z. A 27 x 11 m face of steel panels on timber, raised on a board skirt, braced from behind.
  D.driveInScreen = (() => {
    const s = [], W = 27, Y0 = 4.6, Hs = 11, top = Y0 + Hs;
    s.push(['box', 'screenFace', W, Hs, 0.14, 0, Y0 + Hs / 2, 0]);
    s.push(...M.frame('screenFrame', W + 0.6, Hs + 0.6, 0.32, 0.24, 0, Y0 + Hs / 2, 0.02));
    s.push(['box', 'barnBoards', W + 0.6, Y0 - 0.3, 0.16, 0, (Y0 - 0.3) / 2, -0.1]);
    for (let x = -W / 2; x < W / 2; x += 0.24) s.push(['box', 'timber', 0.02, Y0 - 0.3, 0.02, x, (Y0 - 0.3) / 2, -0.01]);
    s.push(['box', 'screenFrame', W + 1.0, 0.18, 0.7, 0, top + 0.4, -0.12]);
    for (let x = -W / 2; x <= W / 2 + 0.01; x += 3) {
      s.push(['box', 'timber', 0.32, top + 0.3, 0.32, x, (top + 0.3) / 2, -0.45]);
      const ty = top * 0.72, tz = -0.5, by = 0.25, bz = -5.2, len = Math.hypot(ty - by, tz - bz);
      s.push(['box', 'timber', 0.22, len, 0.22, x, (ty + by) / 2, (tz + bz) / 2, Math.atan2(tz - bz, ty - by), 0, 0]);
      s.push(['box', 'anchorConcrete', 0.7, 0.35, 0.7, x, 0.17, bz]);
    }
    for (const y of [2.2, 6, 10, 14]) s.push(['box', 'timber', W, 0.22, 0.18, 0, y, -0.68]);
    // the gutter, a downpipe, a service ladder up the back
    s.push(['box', 'screenFrame', W, 0.14, 0.2, 0, top + 0.22, 0.2]);
    s.push(['cyl', 'screenFrame', 0.06, 0.06, top, 8, W / 2 + 0.4, top / 2, 0.1]);
    for (const x of [-1.6, -1.1]) s.push(['box', 'timber', 0.07, top, 0.07, x, top / 2, -0.95]);
    for (let y = 0.4; y < top; y += 0.35) s.push(['box', 'timber', 0.5, 0.05, 0.05, -1.35, y, -0.95]);
    return s;
  })();
  // The playground under the screen: a swing set (the swings are separate so one can move)
  D.swingFrame = (() => {
    const s = [];
    for (const x of [-1.9, 1.9]) for (const z of [-0.9, 0.9]) s.push(['tube', 'swingPipe', [[x, 0, z], [x * 0.99, 2.45, 0]], 0.035, 6, 2]);
    s.push(['cyl', 'swingPipe', 0.045, 0.045, 3.9, 10, 0, 2.45, 0, 0, 0, H]);
    return s;
  })();
  D.swing = [['tube', 'chainSteel', [[-0.22, 0, 0], [-0.22, -1.95, 0]], 0.008, 4, 2], ['tube', 'chainSteel', [[0.22, 0, 0], [0.22, -1.95, 0]], 0.008, 4, 2], ['rbox', 'swingSeat', 0.5, 0.03, 0.18, 0.01, 0, -1.97, 0]];

  // ------------------------------------------------------------ the field
  // Speaker post: two window speakers on hooks, cords coiled down to the junction box
  D.speakerPost = (() => {
    const s = [['cyl', 'anchorConcrete', 0.13, 0.15, 0.14, 12, 0, 0.07, 0], ['cyl', 'speakerGrey', 0.035, 0.04, 1.08, 10, 0, 0.6, 0], ['rbox', 'speakerGrey', 0.24, 0.17, 0.13, 0.02, 0, 1.18, 0], ['rbox', 'speakerGrey', 0.27, 0.025, 0.16, 0.01, 0, 1.275, 0]];
    for (const sx of [-1, 1]) {
      s.push(['rbox', 'speakerAlu', 0.08, 0.16, 0.21, 0.02, sx * 0.19, 1.08, 0]);
      s.push(['box', 'speakerGrille', 0.004, 0.12, 0.16, sx * 0.232, 1.08, 0]);
      for (let k = 0; k < 6; k++) s.push(['box', 'speakerAlu', 0.006, 0.006, 0.16, sx * 0.235, 1.035 + k * 0.018, 0]);
      s.push(['box', 'speakerAlu', 0.008, 0.03, 0.14, sx * 0.236, 0.98, 0]);
      s.push(['box', 'speakerGrey', 0.05, 0.05, 0.03, sx * 0.135, 1.16, 0]);
      s.push(['tube', 'cordBlack', [[sx * 0.18, 1.0, 0.06], [sx * 0.2, 0.78, 0.09], [sx * 0.08, 0.62, 0.07], [sx * 0.03, 0.72, 0.05], [sx * 0.05, 0.9, 0.04], [sx * 0.04, 1.1, 0.05]], 0.009, 5, 18]);
    }
    return s;
  })();
  // A speaker hanging on a car window (on the glass edge)
  D.windowSpeaker = [['rbox', 'speakerAlu', 0.21, 0.16, 0.08, 0.02, 0, 0, 0], ['box', 'speakerGrille', 0.16, 0.12, 0.004, 0, 0, 0.042], ['box', 'speakerAlu', 0.14, 0.03, 0.06, 0, 0.09, -0.03], ['tube', 'cordBlack', [[0.08, -0.05, -0.03], [0.1, -0.4, 0.02], [0.05, -0.8, 0.05]], 0.009, 5]];
  // Yard light: a creosoted pole with a crossarm and an enamel shade
  D.yardLight = [
    ['cyl', 'timber', 0.11, 0.15, 7.2, 10, 0, 3.6, 0], ['box', 'timber', 1.2, 0.12, 0.1, 0, 6.6, 0],
    ['tube', 'lampShade', [[0, 6.9, 0], [0, 7.1, 0.35], [0, 7.0, 0.9]], 0.03, 6], ['lathe', 'lampShade', [[0.001, 0.12], [0.08, 0.11], [0.3, -0.02], [0.32, -0.05]], 20, 0, 6.85, 0.95],
    ['tube', 'cordBlack', [[-0.55, 6.62, 0.06], [-0.3, 6.45, 0.07], [0, 6.62, 0.06], [0.5, 6.4, 0.07]], 0.01, 4],
  ];
  // The roadside marquee: two posts, the letter board (both faces), the name sign above, bulbs round it
  D.marqueeSign = (() => {
    const s = [];
    for (const x of [-2.4, 2.4]) s.push(['box', 'timber', 0.26, 6.2, 0.26, x, 3.1, 0]);
    s.push(['rbox', 'marqueeFrame', 5.8, 2.7, 0.42, 0.04, 0, 4.4, 0], ['box', 'marqueeBoard', 5.4, 2.3, 0.004, 0, 4.4, 0.212], ['box', 'marqueeBoard', 5.4, 2.3, 0.004, 0, 4.4, -0.212, 0, PI, 0]);
    s.push(['rbox', 'menuFrame', 4.6, 1.05, 0.3, 0.03, 0, 6.35, 0], ['box', 'pinewoodSign', 4.4, 0.95, 0.004, 0, 6.35, 0.152], ['box', 'pinewoodSign', 4.4, 0.95, 0.004, 0, 6.35, -0.152, 0, PI, 0]);
    let k = 0;
    for (let x = -2.75; x <= 2.76; x += 0.25) for (const y of [3.1, 5.7]) for (const z of [0.22, -0.22]) s.push(['sph', (k++ % 7 === 3) ? 'bulbLit' : 'bulbOff', 0.035, x, y, z, 8, 6]);
    return s;
  })();
  D.picnicTable = [
    ['rbox', 'picnicWood', 1.8, 0.05, 0.75, 0.01, 0, 0.76, 0],
    ...[-0.62, 0.62].map(z => ['rbox', 'picnicWood', 1.8, 0.05, 0.28, 0.01, 0, 0.45, z]),
    ...[-0.7, 0.7].flatMap(x => [['box', 'picnicWood', 0.08, 0.95, 0.08, x, 0.4, 0.35, -0.55, 0, 0], ['box', 'picnicWood', 0.08, 0.95, 0.08, x, 0.4, -0.35, 0.55, 0, 0], ['box', 'picnicWood', 0.08, 0.06, 1.5, x, 0.4, 0]]),
  ];

  // ------------------------------------------------------------ the projection booth
  // 35 mm projector, lens toward +z: pedestal, lamp house with chimney, mechanism, feed and take-up magazines
  D.projector = [
    ['rbox', 'projGreen', 0.66, 0.12, 0.8, 0.02, 0, 0.06, -0.05], ['rbox', 'projGreen', 0.34, 0.95, 0.42, 0.03, 0, 0.6, -0.08],
    ['rbox', 'projGreen', 0.44, 0.64, 0.8, 0.04, 0, 1.4, -0.4], ['cyl', 'projGreen', 0.09, 0.11, 0.55, 12, 0, 1.98, -0.55], ['cyl', 'projGreen', 0.15, 0.09, 0.07, 12, 0, 2.27, -0.55],
    ['rbox', 'chrome', 0.02, 0.06, 0.2, 0.005, 0.23, 1.42, -0.4], ['box', 'black', 0.004, 0.22, 0.4, 0.222, 1.6, -0.4],
    ['rbox', 'projGreen', 0.38, 0.44, 0.38, 0.03, 0, 1.36, 0.2], ['cyl', 'chrome', 0.035, 0.035, 0.04, 12, 0.2, 1.36, 0.2, 0, 0, H],
    ['cyl', 'chrome', 0.075, 0.075, 0.34, 18, 0, 1.36, 0.52, H, 0, 0], ['cyl', 'glassLens', 0.058, 0.058, 0.01, 18, 0, 1.36, 0.695, H, 0, 0], ['torus', 'black', 0.078, 0.01, 18, 0, 0, 1.36, 0.44, 0, 0, 0],
    ['rcyl', 'projGreen', 0.42, 0.13, 0.03, 32, 0.02, 2.02, 0.2, 0, 0, H], ['cyl', 'chrome', 0.03, 0.03, 0.16, 10, 0.02, 2.02, 0.2, 0, 0, H],
    ['rcyl', 'projGreen', 0.38, 0.13, 0.03, 32, 0.02, 0.62, 0.38, 0, 0, H], ['cyl', 'chrome', 0.03, 0.03, 0.16, 10, 0.02, 0.62, 0.38, 0, 0, H],
    ['box', 'filmReel', 0.035, 0.36, 0.002, 0.0, 1.62, 0.36], ['box', 'filmReel', 0.035, 0.22, 0.002, 0.0, 1.03, 0.4],
    ['tube', 'cordBlack', [[0, 0.1, -0.45], [0.1, 0.02, -0.7], [0.4, 0.02, -0.9]], 0.014, 5],
  ];
  D.reelCan = [['cyl', 'canTin', 0.19, 0.19, 0.036, 28, 0, 0.018, 0], ['torus', 'canTin', 0.188, 0.005, 28, 0, 0, 0.034, 0, H, 0, 0], ['box', 'canLabel', 0.14, 0.002, 0.04, 0, 0.037, 0.08]];
  D.reelCanStack = (() => { const s = []; const r = U.rng(5); for (let k = 0; k < 5; k++) { const x = r.range(-0.02, 0.02), z = r.range(-0.02, 0.02), ry = r.range(0, 6); s.push(...M.place(D.reelCan, x, k * 0.037, z, 0, ry, 0)); } return s; })();
  // The open can the stub goes into: the reel inside, the lid leaning against it
  D.reelCanOpen = [
    ['cyl', 'canTin', 0.19, 0.19, 0.036, 28, 0, 0.018, 0], ['cyl', 'filmReel', 0.17, 0.17, 0.03, 28, 0, 0.022, 0], ['cyl', 'reelAlu', 0.045, 0.045, 0.034, 14, 0, 0.024, 0], ['box', 'black', 0.012, 0.035, 0.012, 0, 0.024, 0],
    ['cyl', 'canTin', 0.19, 0.19, 0.01, 28, 0.23, 0.18, 0.02, 0, 0, 1.25], ['box', 'canLabel', 0.14, 0.002, 0.04, 0.232, 0.185, 0.02, 0, 0, 1.25 - H],
  ];
  D.rewindBench = [
    ['rbox', 'projGreen', 1.5, 0.05, 0.6, 0.01, 0, 0.9, 0], ...[[-0.68, -0.25], [0.68, -0.25], [-0.68, 0.25], [0.68, 0.25]].map(([x, z]) => ['box', 'projGreen', 0.05, 0.88, 0.05, x, 0.44, z]),
    ['box', 'projGreen', 1.4, 0.04, 0.5, 0, 0.25, 0],
    ...[-0.5, 0.5].flatMap(x => [['box', 'projGreen', 0.08, 0.3, 0.08, x, 1.07, 0], ['cyl', 'chrome', 0.015, 0.015, 0.3, 8, x, 1.18, 0.05, H, 0, 0]]),
    ['rcyl', 'filmReel', 0.3, 0.035, 0.008, 32, -0.5, 1.18, 0.12, H, 0, 0], ['cyl', 'reelAlu', 0.05, 0.05, 0.04, 12, -0.5, 1.18, 0.12, H, 0, 0],
    ['tube', 'chrome', [[0.5, 1.18, 0.2], [0.5, 1.18, 0.26], [0.6, 1.08, 0.26]], 0.008, 5], ['cyl', 'black', 0.015, 0.015, 0.08, 8, 0.6, 1.04, 0.26],
    ['box', 'filmReel', 1.0, 0.002, 0.035, 0, 1.39, 0.12],
  ];
  // A wall rack of reel cans (wall mount, faces +z)
  D.reelRack = (() => {
    const s = [['box', 'projGreen', 1.2, 1.4, 0.03, 0, 0.7, 0.015]];
    for (let k = 0; k < 6; k++) { s.push(['box', 'projGreen', 1.2, 0.02, 0.3, 0, 0.1 + k * 0.24, 0.16]); for (let c = 0; c < 3; c++) if ((k + c) % 4) s.push(['cyl', 'canTin', 0.19, 0.19, 0.036, 24, -0.38 + c * 0.38, 0.13 + k * 0.24 + 0.17, 0.2, H, 0, 0.08 * c]); }
    return s;
  })();
  // Army cot with a grey blanket (Lyle slept in the booth)
  D.cot = [
    ...[-0.95, 0.95].flatMap(x => [['tube', 'swingPipe', [[x, 0, -0.33], [x, 0.38, 0], [x, 0, 0.33]], 0.012, 4]]),
    ...[-0.33, 0.33].map(z => ['cyl', 'swingPipe', 0.014, 0.014, 1.95, 6, 0, 0.4, z, 0, 0, H]),
    ['box', 'cotCanvas', 1.9, 0.02, 0.66, 0, 0.39, 0], ['rbox', 'blanketGrey', 1.3, 0.07, 0.68, 0.03, 0.2, 0.43, 0.02, 0, 0.05, 0], ['rbox', 'linenWhite', 0.4, 0.09, 0.5, 0.04, -0.7, 0.45, 0],
  ];

  // ------------------------------------------------------------ the snack bar
  D.popcornMachine = (() => {
    const s = [['rbox', 'popcornRed', 0.7, 0.8, 0.55, 0.03, 0, 0.4, 0], ['box', 'black', 0.5, 0.25, 0.004, 0, 0.45, 0.278]];
    for (const [x, z] of [[-0.34, -0.26], [0.34, -0.26], [-0.34, 0.26], [0.34, 0.26]]) s.push(['box', 'chrome', 0.025, 0.72, 0.025, x, 1.17, z]);
    s.push(['box', 'caseClear', 0.66, 0.7, 0.004, 0, 1.17, 0.265], ['box', 'caseClear', 0.66, 0.7, 0.004, 0, 1.17, -0.265], ['box', 'caseClear', 0.004, 0.7, 0.5, 0.335, 1.17, 0], ['box', 'caseClear', 0.004, 0.7, 0.5, -0.335, 1.17, 0]);
    s.push(['box', 'chrome', 0.68, 0.02, 0.54, 0, 0.82, 0], ['sph', 'popcorn', 0.3, 0, 0.84, 0, 14, 8, [1.05, 0.38, 0.8]]);
    for (let k = 0; k < 40; k++) { const r = U.rng(k); s.push(['sph', 'popcorn', 0.02, r.range(-0.28, 0.28), 0.84 + r.range(0, 0.04), r.range(-0.2, 0.2), 5, 4]); }
    s.push(['cyl', 'chrome', 0.13, 0.11, 0.12, 16, 0, 1.36, 0], ['cyl', 'chrome', 0.01, 0.01, 0.12, 6, 0, 1.47, 0]);
    s.push(['rbox', 'popcornRed', 0.72, 0.2, 0.57, 0.03, 0, 1.62, 0], ['box', 'bulbLit', 0.5, 0.06, 0.004, 0, 1.62, 0.288]);
    return s;
  })();
  D.hotdogRoller = [['rbox', 'chrome', 0.55, 0.12, 0.42, 0.01, 0, 0.06, 0], ...Array.from({ length: 8 }, (_, k) => ['cyl', 'chrome', 0.018, 0.018, 0.46, 10, 0, 0.13, -0.16 + k * 0.046, 0, 0, H]), ...[-0.16, -0.07, 0.02, 0.11].map(z => ['cap', 'sausage', 0.016, 0.16, 0.05, 0.16, z, 0, 0, H]), ['box', 'caseClear', 0.55, 0.004, 0.42, 0, 0.24, 0]];
  D.sodaFountain = [
    ['rbox', 'chrome', 0.55, 0.62, 0.48, 0.02, 0, 0.31, 0], ['box', 'popcornRed', 0.5, 0.18, 0.004, 0, 0.5, 0.242], ['box', 'black', 0.5, 0.04, 0.3, 0, 0.03, 0.36],
    ...[-0.18, -0.06, 0.06, 0.18].flatMap(x => [['cyl', 'chrome', 0.015, 0.01, 0.07, 8, x, 0.28, 0.27], ['rbox', 'black', 0.05, 0.08, 0.03, 0.006, x, 0.36, 0.26]]),
    ['lathe', 'paperCup', [[0.03, 0], [0.042, 0.11], [0.04, 0.11], [0.028, 0.002]], 12, 0.36, 0, 0.1], ['lathe', 'paperCup', [[0.03, 0], [0.042, 0.28], [0.04, 0.28], [0.028, 0.002]], 12, 0.36, 0.0, -0.05],
  ];
  // Concession counter with a glass candy case on its front edge, faces +z (customers' side)
  D.concessionCounter = (() => {
    const s = [['rbox', 'counterCream', 3.0, 0.95, 0.7, 0.02, 0, 0.475, 0], ['box', 'counterRed', 3.0, 0.3, 0.02, 0, 0.15, 0.351], ['rbox', 'chrome', 3.04, 0.04, 0.74, 0.01, 0, 0.97, 0]];
    s.push(['box', 'caseClear', 1.4, 0.32, 0.004, -0.6, 1.15, 0.33], ['box', 'caseClear', 1.4, 0.004, 0.36, -0.6, 1.31, 0.15], ['box', 'caseClear', 0.004, 0.32, 0.36, -1.3, 1.15, 0.15], ['box', 'caseClear', 0.004, 0.32, 0.36, 0.1, 1.15, 0.15]);
    const r = U.rng(8); const cols = ['popcornRed', 'tagRed', 'counterCream', 'suitBlue', 'suitGreen', 'ornGold'];
    for (let k = 0; k < 18; k++) s.push(['rbox', cols[k % cols.length], 0.1, 0.03, 0.06, 0.005, -1.22 + (k % 9) * 0.16, 1.01 + (k >= 9 ? 0.035 : 0), 0.15 + r.range(-0.08, 0.08), 0, r.range(-0.3, 0.3), 0]);
    s.push(['rbox', 'black', 0.36, 0.22, 0.3, 0.02, 0.9, 1.1, 0.05], ['box', 'chrome', 0.3, 0.04, 0.12, 0.9, 1.2, 0.18]);
    return s;
  })();
  D.menuBoard = [['rbox', 'menuFrame', 2.5, 0.98, 0.08, 0.01, 0, 0, 0.04], ['box', 'snackMenu', 2.34, 0.86, 0.002, 0, 0, 0.082]];
  D.restroomSign = [['rbox', 'menuFrame', 1.1, 0.3, 0.03, 0.01, 0, 0, 0.015], ['box', 'restroomSign', 1.04, 0.26, 0.002, 0, 0, 0.031]];
  D.admitSign = [['rbox', 'menuFrame', 1.0, 0.27, 0.03, 0.01, 0, 0, 0.015], ['box', 'admitSign', 0.95, 0.23, 0.002, 0, 0, 0.031]];

  // ------------------------------------------------------------ the toilets
  // Three stalls in a row (faces +z: doors on that side), steel partitions raised off the floor
  D.stalls = (() => {
    const s = [], w = 0.92;
    for (let k = 0; k <= 3; k++) s.push(['box', 'stallPaint', 0.025, 1.75, 1.45, -1.38 + k * w, 1.08, 0]);
    s.push(['box', 'stallPaint', 2.8, 0.06, 0.04, 0, 1.98, 0.72]);
    for (let k = 0; k < 3; k++) {
      const x = -1.38 + (k + 0.5) * w, open = [0.3, 1.2, 0.05][k];
      s.push(...M.place([['box', 'stallPaint', 0.7, 1.6, 0.025, 0.35, 0, 0], ['box', 'chrome', 0.03, 0.08, 0.02, 0.62, 0, 0.02]], x - 0.35, 1.05, 0.72, 0, -open, 0));
      s.push(['box', 'chrome', 0.04, 1.75, 0.04, x - 0.35, 1.08, 0.72]);
      s.push(['rbox', 'porcelain', 0.38, 0.4, 0.5, 0.08, x, 0.2, -0.38], ['rbox', 'porcelain', 0.36, 0.38, 0.16, 0.03, x, 0.55, -0.66], ['rbox', 'black', 0.36, 0.02, 0.44, 0.08, x, 0.41, -0.36]);
    }
    return s;
  })();
  D.urinal = [['rbox', 'porcelain', 0.4, 0.6, 0.32, 0.12, 0, 0.9, 0.16], ['box', 'black', 0.28, 0.4, 0.004, 0, 0.92, 0.321], ['cyl', 'chrome', 0.015, 0.015, 0.5, 8, 0, 1.45, 0.05], ['sph', 'chrome', 0.03, 0, 1.7, 0.06, 8, 6]];

  // ------------------------------------------------------------ the kiosk, the gate, the car
  D.ticketMachine = [['rbox', 'chrome', 0.3, 0.2, 0.25, 0.02, 0, 0.1, 0], ['cyl', 'tagRed', 0.07, 0.07, 0.18, 16, 0, 0.12, -0.04, 0, 0, H], ['box', 'tagRed', 0.04, 0.002, 0.08, 0, 0.21, 0.16]];
  D.lostBox = (() => {
    const s = [['rbox', 'parcelPaper', 0.5, 0.3, 0.36, 0.01, 0, 0.15, 0], ['box', 'parcelPaper', 0.5, 0.005, 0.2, 0, 0.36, -0.24, -0.9, 0, 0]];
    s.push(['rbox', 'suitTan', 0.16, 0.04, 0.24, 0.02, -0.12, 0.31, 0.03, 0, 0.3, 0], ['rbox', 'umbrella', 0.4, 0.05, 0.06, 0.02, 0.05, 0.32, -0.08, 0, -0.2, 0], ['sph', 'umbrellaRed', 0.06, 0.15, 0.31, 0.08, 8, 6, [1, 0.6, 1.3]], ['rbox', 'coatWool', 0.12, 0.06, 0.12, 0.03, -0.02, 0.33, 0.1]);
    return s;
  })();
  D.carBattery = [['rbox', 'batteryBlack', 0.3, 0.19, 0.17, 0.01, 0, 0.095, 0], ['rbox', 'batteryBlack', 0.3, 0.02, 0.17, 0.008, 0, 0.2, 0], ['box', 'batteryLabel', 0.16, 0.08, 0.002, 0, 0.11, 0.086], ...[-0.1, 0.1].map(x => ['cyl', 'lead', 0.017, 0.019, 0.03, 10, x, 0.225, 0.04]), ['tube', 'black', [[-0.12, 0.21, -0.03], [-0.08, 0.28, -0.03], [0.08, 0.28, -0.03], [0.12, 0.21, -0.03]], 0.008, 4]];
  D.carKeys = [['torus', 'chrome', 0.018, 0.0022, 16, 0, 0, 0.003, 0, H, 0, 0], ['box', 'chrome', 0.055, 0.003, 0.016, 0.04, 0.003, 0.01, 0, 0.3, 0], ['box', 'brass', 0.05, 0.003, 0.015, 0.035, 0.003, -0.012, 0, -0.25, 0], ['rbox', 'tagRed', 0.045, 0.006, 0.03, 0.004, -0.04, 0.004, 0.005, 0, 0.4, 0], ['box', 'labelCard', 0.03, 0.002, 0.015, -0.04, 0.008, 0.005, 0, 0.4, 0]];
  // The exit gate: galvanised posts (a prop) and two chain-link leaves hinged on them (the chapter swings
  // them open), chained in the middle with a padlock
  D.gatePosts = [];
  for (const x of [-3.05, 3.05]) D.gatePosts.push(['cyl', 'galvanized', 0.06, 0.06, 2.3, 10, x, 1.15, 0], ['sph', 'galvanized', 0.065, x, 2.3, 0, 8, 6], ['cyl', 'anchorConcrete', 0.14, 0.16, 0.12, 10, x, 0.06, 0]);
  // one leaf, hinge at the origin, reaching 2.95 m along +x
  D.gateLeaf = (() => {
    const w = 2.9, cx = 0.05 + w / 2, s = [['box', 'chainLink', w, 1.8, 0.01, cx, 1.1, 0]];
    for (const y of [0.2, 2.0]) s.push(['cyl', 'galvanized', 0.03, 0.03, w, 8, cx, y, 0, 0, 0, H]);
    for (const x of [0.05, 0.05 + w]) s.push(['cyl', 'galvanized', 0.03, 0.03, 1.8, 8, x, 1.1, 0]);
    s.push(['tube', 'galvanized', [[0.05, 0.2, 0], [cx, 1.1, 0], [0.05 + w, 2.0, 0]], 0.018, 5, 2]);
    for (const y of [0.45, 1.75]) s.push(['cyl', 'galvanized', 0.05, 0.05, 0.12, 8, 0.05, y, 0]);
    return s;
  })();
  D.gateChain = [['tube', 'chainSteel', [[-0.12, 1.15, 0.04], [0, 1.0, 0.06], [0.12, 1.15, 0.04], [0, 1.25, -0.04], [-0.12, 1.15, 0.04]], 0.012, 6, 20, true], ['rbox', 'padlock', 0.06, 0.07, 0.025, 0.01, 0, 0.93, 0.07], ['torus', 'chrome', 0.022, 0.006, 10, PI, 0, 0.97, 0.07, 0, 0, 0]];
  D.ticketStub = [['box', 'ticketStub', 0.07, 0.002, 0.035, 0, 0.001, 0, 0, 0.3, 0]];

  // ------------------------------------------------------------ the forest
  D.stump = [['lathe', 'treeBark', [[0.001, 0], [0.38, 0], [0.3, 0.08], [0.26, 0.3], [0.25, 0.52], [0.001, 0.52]], 12], ['cyl', 'woodCut', 0.24, 0.24, 0.01, 14, 0, 0.525, 0], ['torus', 'treeBark', 0.15, 0.006, 14, 0, 0, 0.53, 0, H, 0, 0], ['torus', 'treeBark', 0.08, 0.006, 12, 0, 0, 0.53, 0, H, 0, 0]];
  D.fallenLog = (() => {
    const s = [['cyl', 'treeBark', 0.2, 0.27, 5.0, 10, 0, 0.24, 0, 0, 0, H], ['cyl', 'woodCut', 0.27, 0.27, 0.01, 12, -2.5, 0.24, 0, 0, 0, H], ['box', 'moss', 3.2, 0.02, 0.24, 0.3, 0.47, 0]];
    for (const [x, a] of [[-1.4, 0.6], [-0.3, -0.8], [0.9, 0.4], [1.8, -0.5]]) s.push(['cyl', 'deadTwig', 0.015, 0.04, 0.7, 5, x, 0.4 + Math.cos(a) * 0.3, Math.sin(a) * 0.3, a, 0, 0]);
    return s;
  })();
  D.rockA = [['rock', 'rockGrey', 0.62, 4, 1.3, 0.65, 1.0, 0, 0.12, 0], ['rock', 'rockGrey', 0.36, 9, 1.0, 0.7, 1.1, 0.55, 0.06, 0.25, 1.2]];
  D.rockB = [['rock', 'rockGrey', 0.95, 17, 1.1, 0.8, 0.9, 0, 0.2, 0], ['rock', 'moss', 0.7, 17, 1.12, 0.25, 0.9, 0.05, 0.72, 0.02]];
  // a clump of bracken: a dozen fronds arching out from the middle
  D.fern = (() => { const s = [], r = U.rng(31); for (let k = 0; k < 12; k++) s.push(['frond', 'fernGreen', r.range(0.55, 0.9), r.range(0.12, 0.18), r.range(0.45, 0.7), 40 + k, 0, 0.02, 0, -0.15, k / 12 * PI * 2 + r.range(-0.2, 0.2), 0]); return s; })();
  D.fern2 = (() => { const s = [], r = U.rng(57); for (let k = 0; k < 9; k++) s.push(['frond', 'fernBrown', r.range(0.4, 0.7), r.range(0.1, 0.15), r.range(0.35, 0.6), 70 + k, 0, 0.02, 0, -0.1, k / 9 * PI * 2 + r.range(-0.3, 0.3), 0]); return s; })();
  D.undergrowth = D.fern;
  // A hunter's tree stand: four legs, a railed platform, a ladder, a tin roof
  D.treeStand = (() => {
    const s = [];
    for (const [x, z] of [[-0.9, -0.9], [0.9, -0.9], [-0.9, 0.9], [0.9, 0.9]]) s.push(['box', 'timberGrey', 0.16, 4.6, 0.16, x * 1.05, 2.3, z * 1.05, z * 0.04, 0, -x * 0.04]);
    s.push(['box', 'timberGrey', 2.1, 0.07, 2.1, 0, 3.5, 0]);
    for (const [x, z, w, d] of [[0, -1.02, 2.1, 0.06], [0, 1.02, 2.1, 0.06], [-1.02, 0, 0.06, 2.1], [1.02, 0, 0.06, 2.1]]) { s.push(['box', 'timberGrey', w, 0.07, d, x, 4.4, z]); if (z !== 1.02) s.push(['box', 'timberGrey', w, 0.07, d, x, 3.95, z]); }
    s.push(['box', 'corrugated', 2.6, 0.03, 2.6, 0, 5.0, 0, 0.12, 0, 0]);
    for (const x of [-0.3, 0.3]) s.push(['box', 'timberGrey', 0.07, 3.6, 0.07, x, 1.75, 1.4, -0.35, 0, 0]);
    for (let y = 0.3; y < 3.4; y += 0.38) s.push(['box', 'timberGrey', 0.6, 0.05, 0.05, 0, y, 1.4 - y * 0.36]);
    return s;
  })();
  Object.assign(M.MATS, { corrugated: M.MATS.corrugated || { color: 0x6a6a64, rough: 0.6, metal: 0.6 } });

  // ------------------------------------------------------------ the film and the projector's beam
  // "Night Lake", a silent black-and-white film that never ends: eight frames painted on one atlas
  // (4 x 2), cross-faded, with grain, gate weave, scratches and flicker in the shader.
  const FRAMES = 8;
  function filmAtlas() {
    return T.canvas('m5:film', 2048, 512, (g, W, Hh) => {
      const r = U.rng(1975), fw = 512, fh = 256;
      const cell = (k, fn) => { g.save(); g.translate((k % 4) * fw, Math.floor(k / 4) * fh); g.beginPath(); g.rect(0, 0, fw, fh); g.clip(); fn(fw, fh); g.restore(); };
      const grad = (y0, y1, a, b) => { const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, a); gr.addColorStop(1, b); return gr; };
      const trees = (y, hMin, hMax, col, n) => { g.fillStyle = col; for (let k = 0; k < n; k++) { const x = r() * fw, th = r.range(hMin, hMax), tw = th * 0.28; g.beginPath(); g.moveTo(x, y - th); g.lineTo(x + tw, y); g.lineTo(x - tw, y); g.fill(); } };
      // 0: the lake at night, a pier, the moon on the water
      cell(0, (w, h) => {
        g.fillStyle = grad(0, h * 0.55, '#2a2a2a', '#5a5a5a'); g.fillRect(0, 0, w, h);
        const m = g.createRadialGradient(380, 52, 4, 380, 52, 70); m.addColorStop(0, 'rgba(255,255,255,0.95)'); m.addColorStop(0.2, 'rgba(230,230,230,0.5)'); m.addColorStop(1, 'rgba(200,200,200,0)'); g.fillStyle = m; g.fillRect(300, 0, 160, 130);
        trees(h * 0.55, 10, 30, '#141414', 90);
        g.fillStyle = grad(h * 0.55, h, '#3a3a3a', '#0a0a0a'); g.fillRect(0, h * 0.55, w, h);
        for (let k = 0; k < 40; k++) { g.fillStyle = `rgba(230,230,230,${r.range(0.2, 0.7)})`; g.fillRect(380 - r.range(0, 22) + r.range(0, 22), h * 0.57 + k * 2.6, r.range(4, 26), 1.5); }
        g.fillStyle = '#121212'; g.beginPath(); g.moveTo(120, h); g.lineTo(220, h * 0.62); g.lineTo(236, h * 0.62); g.lineTo(220, h); g.fill();
        for (let k = 0; k < 6; k++) { const t = k / 6, x = 120 + t * 100, y = h - t * (h * 0.38); g.fillRect(x - 3, y - 2, 5 - t * 3, 18 - t * 12); }
      });
      // 1: the forest in fog
      cell(1, (w, h) => {
        g.fillStyle = grad(0, h, '#6a6a6a', '#2a2a2a'); g.fillRect(0, 0, w, h);
        for (let layer = 0; layer < 4; layer++) { const c = 110 - layer * 28; for (let k = 0; k < 14; k++) { g.fillStyle = `rgb(${c},${c},${c})`; const x = r() * w, tw = r.range(4, 10) * (layer + 1); g.fillRect(x, 0, tw, h); } g.fillStyle = 'rgba(120,120,120,0.35)'; g.fillRect(0, 0, w, h); }
      });
      // 2: the field seen from the screen: rows of cars, the booth's lit port, one small pale figure
      cell(2, (w, h) => {
        g.fillStyle = grad(0, h, '#1a1a1a', '#3a3a3a'); g.fillRect(0, 0, w, h);
        trees(h * 0.42, 16, 40, '#0e0e0e', 80);
        g.fillStyle = '#202020'; g.fillRect(200, h * 0.36, 120, 28); g.fillStyle = '#e8e8e8'; g.fillRect(250, h * 0.4, 14, 6);
        for (let row = 0; row < 4; row++) { const y = h * (0.5 + row * 0.13), s = 0.5 + row * 0.35; for (let x = -20 + (row % 2) * 30; x < w + 20; x += 70 * s) { g.fillStyle = '#0c0c0c'; g.beginPath(); g.ellipse(x, y, 26 * s, 9 * s, 0, PI, 0); g.fill(); g.fillRect(x - 30 * s, y, 60 * s, 10 * s); } }
        g.fillStyle = '#d8d8d8'; g.fillRect(300, h * 0.6, 3, 9); g.beginPath(); g.arc(301.5, h * 0.6 - 2, 2, 0, 6.3); g.fill();
      });
      // 3: a small boy from behind, walking into the trees with a torch; something further in
      cell(3, (w, h) => {
        g.fillStyle = '#141414'; g.fillRect(0, 0, w, h);
        for (let k = 0; k < 18; k++) { const c = r.int(20, 60); g.fillStyle = `rgb(${c},${c},${c})`; g.fillRect(r() * w, 0, r.range(6, 30), h); }
        const cone = g.createRadialGradient(260, 170, 2, 260, 150, 110); cone.addColorStop(0, 'rgba(220,220,220,0.6)'); cone.addColorStop(1, 'rgba(220,220,220,0)'); g.fillStyle = cone; g.beginPath(); g.moveTo(250, 185); g.lineTo(330, 90); g.lineTo(190, 90); g.fill();
        g.fillStyle = '#060606'; g.fillRect(238, 175, 22, 50); g.beginPath(); g.arc(249, 166, 11, 0, 6.3); g.fill(); g.fillRect(240, 224, 7, 22); g.fillRect(252, 224, 7, 22);
        const dot = g.createRadialGradient(300, 60, 0, 300, 60, 10); dot.addColorStop(0, 'rgba(255,255,255,0.9)'); dot.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = dot; g.fillRect(290, 50, 20, 20);
      });
      // 4: a house by a frozen lake, one window lit, a very small figure far out on the ice
      cell(4, (w, h) => {
        g.fillStyle = grad(0, h * 0.5, '#4a4a4a', '#7a7a7a'); g.fillRect(0, 0, w, h);
        g.fillStyle = grad(h * 0.5, h, '#9a9a9a', '#5a5a5a'); g.fillRect(0, h * 0.5, w, h);
        trees(h * 0.5, 8, 22, '#2a2a2a', 60);
        g.fillStyle = '#121212'; g.fillRect(40, h * 0.3, 110, 70); g.beginPath(); g.moveTo(30, h * 0.3); g.lineTo(95, h * 0.12); g.lineTo(160, h * 0.3); g.fill();
        g.fillStyle = '#f0f0f0'; g.fillRect(70, h * 0.38, 16, 14);
        g.fillStyle = '#1a1a1a'; g.fillRect(400, h * 0.62, 3, 7);
      });
      // 5: ice, close, cracking
      cell(5, (w, h) => {
        g.fillStyle = grad(0, h, '#3a3a3a', '#1a1a1a'); g.fillRect(0, 0, w, h);
        g.strokeStyle = 'rgba(240,240,240,0.8)';
        const crack = (x, y, a, n, wd) => { g.lineWidth = wd; g.beginPath(); g.moveTo(x, y); for (let k = 0; k < n; k++) { a += r.range(-0.5, 0.5); x += Math.cos(a) * 14; y += Math.sin(a) * 14; g.lineTo(x, y); if (r() < 0.2 && wd > 0.6) { g.stroke(); crack(x, y, a + r.range(-1.4, 1.4), n >> 1, wd * 0.6); g.beginPath(); g.moveTo(x, y); } } g.stroke(); };
        for (let k = 0; k < 5; k++) crack(256, 128, k * 1.25, 18, 2.4);
      });
      // 6: leader countdown at a reel change
      cell(6, (w, h) => {
        g.fillStyle = '#8a8a8a'; g.fillRect(0, 0, w, h); g.strokeStyle = '#1a1a1a'; g.lineWidth = 4;
        g.beginPath(); g.arc(w / 2, h / 2, 100, 0, 6.3); g.stroke(); g.beginPath(); g.arc(w / 2, h / 2, 82, 0, 6.3); g.stroke();
        g.beginPath(); g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.moveTo(w / 2, 0); g.lineTo(w / 2, h); g.stroke();
        g.fillStyle = '#101010'; g.font = 'bold 120px serif'; g.textAlign = 'center'; g.fillText('3', w / 2, h / 2 + 42);
      });
      // 7: THE END
      cell(7, (w, h) => { g.fillStyle = '#101010'; g.fillRect(0, 0, w, h); g.fillStyle = '#e0e0e0'; g.font = 'italic 64px serif'; g.textAlign = 'center'; g.fillText('The End', w / 2, h / 2 + 22); });
    });
  }
  const FILM_VS = `varying vec2 vUv; varying float vDepth; void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position,1.0); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`;
  const FILM_FS = `uniform sampler2D map; uniform float fa, fb, mixK, time, bright, white, fogD; uniform vec3 fogC; varying vec2 vUv; varying float vDepth;
    float h1(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
    vec2 cellUv(float f, vec2 uv){ float c = mod(f, 4.0), r = floor(f / 4.0); return vec2((c + uv.x) / 4.0, (1.0 - r) * 0.5 + uv.y * 0.5); }
    void main(){
      float fr = floor(time * 24.0);
      vec2 uv = vUv; uv.y += (h1(vec2(fr, 1.0)) - 0.5) * 0.004; uv.x += (h1(vec2(fr, 2.0)) - 0.5) * 0.002;
      uv = clamp(uv, 0.002, 0.998);
      float a = texture2D(map, cellUv(fa, uv)).r, b = texture2D(map, cellUv(fb, uv)).r;
      float v = mix(a, b, mixK);
      v += (h1(uv * vec2(731.0, 397.0) + fr) - 0.5) * 0.09;
      float sx = h1(vec2(floor(time * 9.0), 3.0)); if (abs(uv.x - sx) < 0.0012 && h1(vec2(floor(time * 9.0), 5.0)) > 0.55) v += 0.3;
      if (h1(vec2(fr, 7.0)) > 0.985) v += 0.2 * h1(uv * 91.0 + fr);
      vec2 q = uv - 0.5; v *= 1.0 - dot(q, q) * 1.3;
      v = mix(v, 0.95, white);
      float flick = 0.9 + 0.1 * h1(vec2(fr, 9.0));
      vec3 col = vec3(max(v, 0.0) * bright * flick) * vec3(0.9, 0.95, 1.0);
      float ff = 1.0 - exp(-fogD * fogD * vDepth * vDepth);
      gl_FragColor = vec4(mix(col, fogC, clamp(ff, 0.0, 1.0)), 1.0);
    }`;
  const BEAM_VS = `attribute float k; varying float vK; varying vec3 vP; varying float vD; void main(){ vK = k; vP = position; vec4 mv = modelViewMatrix * vec4(position, 1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }`;
  const BEAM_FS = `uniform float time, bright; varying float vK; varying vec3 vP; varying float vD;
    float h1(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
    float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
      return mix(mix(mix(h1(i), h1(i + vec3(1,0,0)), f.x), mix(h1(i + vec3(0,1,0)), h1(i + vec3(1,1,0)), f.x), f.y), mix(mix(h1(i + vec3(0,0,1)), h1(i + vec3(1,0,1)), f.x), mix(h1(i + vec3(0,1,1)), h1(i + vec3(1,1,1)), f.x), f.y), f.z); }
    void main(){ float d = n3(vP * 0.6 + vec3(0.0, time * 0.15, time * 0.05)) * 0.7 + n3(vP * 2.3 - time * 0.2) * 0.3;
      float a = pow(1.0 - vK, 1.3) * 0.032 * bright * (0.45 + d * 1.0) * smoothstep(3.0, 14.0, vD) * (1.0 - smoothstep(0.0, 0.08, vK) * 0.0); gl_FragColor = vec4(vec3(0.85, 0.9, 1.0) * a, 1.0); }`;
  PB.DriveIn = {
    // the projected film: a plane over the screen's face. (x, y, z) is the centre, w x h the size
    film(x, y, z, w, h) {
      const u = { map: { value: filmAtlas() }, fa: { value: 0 }, fb: { value: 1 }, mixK: { value: 0 }, time: { value: 0 }, bright: { value: 0.85 }, white: { value: 0 }, fogD: { value: 0.01 }, fogC: { value: new THREE.Color(0) } };
      u.map.value.minFilter = THREE.LinearFilter; u.map.value.generateMipmaps = false;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.ShaderMaterial({ vertexShader: FILM_VS, fragmentShader: FILM_FS, uniforms: u }));
      m.position.set(x, y, z); m.userData.noPrepass = true;
      // the reel: frames in order, a leader at each reel change; the end card when the draw is made
      const seq = [[0, 7], [1, 6], [2, 6], [3, 7], [4, 7], [5, 5], [6, 1.2]];
      let idx = 0, t0 = 0, mode = 'run', modeT = 0;
      return {
        mesh: m, uniforms: u,
        end() { if (mode === 'run') { mode = 'end'; modeT = 0; u.fa.value = 7; u.fb.value = 7; u.mixK.value = 0; } },
        off() { mode = 'off'; u.bright.value = 0; },
        get mode() { return mode; },
        update(t, dt, fog, fogScale = 0.5) {
          u.time.value = t;
          if (fog) { u.fogC.value.copy(fog.color); u.fogD.value = fog.density * fogScale; }
          if (mode === 'run') {
            const [f, dur] = seq[idx];
            const k = (t - t0) / dur;
            if (k >= 1) { idx = (idx + 1) % seq.length; t0 = t; }
            const nf = seq[(idx + 1) % seq.length][0];
            u.fa.value = seq[idx][0]; u.fb.value = nf; u.mixK.value = U.smoothstep(0.85, 1, (t - t0) / seq[idx][1]) * (seq[idx][0] === 6 || nf === 6 ? 0 : 1);
            void f;
          } else if (mode === 'end') {
            modeT += dt;
            if (modeT > 6) u.white.value = Math.min(1, (modeT - 6) * 2) * (0.85 + Math.random() * 0.15);
            if (modeT > 9.5) { mode = 'runout'; modeT = 0; }
          } else if (mode === 'runout') {
            modeT += dt; u.white.value = 1; u.bright.value = 0.85 * (1 - U.smoothstep(0, 2.5, modeT)) * (0.8 + Math.random() * 0.2);
            if (modeT > 2.5) { mode = 'off'; u.bright.value = 0; }
          }
        },
      };
    },
    // the beam from the port to the screen's four corners, additive, with dust drifting in it
    beam(apex, corners) {
      const pos = [], kk = [];
      for (let i = 0; i < 4; i++) { const a = corners[i], b = corners[(i + 1) % 4]; pos.push(...apex, ...a, ...b); kk.push(0, 1, 1); }
      const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('k', new THREE.Float32BufferAttribute(kk, 1));
      const u = { time: { value: 0 }, bright: { value: 1 } };
      const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({ vertexShader: BEAM_VS, fragmentShader: BEAM_FS, uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
      m.frustumCulled = false; m.renderOrder = 4; m.userData.noPrepass = true;
      return { mesh: m, uniforms: u };
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
