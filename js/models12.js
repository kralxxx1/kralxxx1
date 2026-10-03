/* Depot 9, rebuilt where it looked wrong:
   - the archive stacks hold real boxes now: lidded card file boxes of different sizes and shades, each with
     a hand hole and its own typed or handwritten label, runs of ring binders, a box pulled half out, gaps
     where boxes were taken, end panels with the section's years; four different stacks so no two aisles
     repeat, and one with the gap where the 1979 ledger box stands;
   - the parcel chute is one connected thing: a riveted steel duct out of the ceiling, the elbow, the slide
     falling forward on its hangers and legs into a padded bin with a rubber flap.
   Same spec conventions as props.js / models.js; atlas labels use the 'uvplane' shape. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ textures
  // 4 x 16 labels, each 256 x 64: typed index cards, handwritten years, stencils, stamps and coffee rings
  const LCOLS = 4, LROWS = 16;
  M.tex.archiveLabels = () => T.canvas('m12:archiveLabels', 1024, 1024, (g, w, h) => {
    const r = U.rng(1979), cw = w / LCOLS, ch = h / LROWS;
    const SUB = ['LOST PROPERTY', 'UNCLAIMED', 'CLAIMS A–K', 'CLAIMS L–Z', 'UMBRELLAS', 'GLOVES', 'KEYS', 'LUGGAGE TAGS', 'RETURNED', 'POLICE', 'WALLETS', 'SPECTACLES', 'BOOKS', 'TOYS', 'HATS', 'MISC.'];
    for (let row = 0; row < LROWS; row++) for (let col = 0; col < LCOLS; col++) {
      const x = col * cw, y = row * ch, k = row * LCOLS + col;
      const paper = r.pick(['#e9e2c8', '#ded5b6', '#efe9d6', '#d4c9a6', '#e4dcc0', '#c9bd98']);
      g.fillStyle = paper; g.fillRect(x + 2, y + 2, cw - 4, ch - 4);
      // the card's edge and a rule
      g.strokeStyle = 'rgba(60,50,30,0.35)'; g.lineWidth = 2; g.strokeRect(x + 4, y + 4, cw - 8, ch - 8);
      const year = 1931 + ((k * 7) % 49), q = 1 + (k % 4);
      const style = k % 5;
      g.textBaseline = 'middle';
      if (style === 0 || style === 3) {
        // typed: year big, subject small, a red rule
        g.fillStyle = '#1a1a22'; g.font = `bold 30px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'left'; g.fillText(String(year), x + 12, y + ch * 0.42);
        g.font = `15px ${T.FONTS.FONT_TYPE}`; g.fillText(SUB[k % SUB.length], x + 104, y + ch * 0.36);
        g.fillText('Q' + q + '  No. ' + (100 + (k * 37) % 900), x + 104, y + ch * 0.66);
        g.strokeStyle = 'rgba(170,30,30,0.6)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x + 8, y + ch - 12); g.lineTo(x + cw - 8, y + ch - 12); g.stroke();
      } else if (style === 1 || style === 4) {
        // handwritten in ink
        g.fillStyle = r() < 0.5 ? '#1c2a52' : '#222'; g.font = `700 32px ${T.FONTS.FONT_HAND}`; g.textAlign = 'center';
        g.save(); g.translate(x + cw / 2, y + ch / 2); g.rotate((r() - 0.5) * 0.08);
        g.fillText(year + (r() < 0.5 ? ' – ' + (year + 1) : '  ' + SUB[(k + 3) % SUB.length].toLowerCase()), 0, 2); g.restore();
      } else {
        // stencilled number on a bare card
        g.fillStyle = '#2a2620'; g.font = `bold 34px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText('D9 · ' + year, x + cw / 2, y + ch / 2 + 2);
      }
      // stamps, rings, foxing
      if (r() < 0.3) { g.strokeStyle = 'rgba(160,30,30,0.55)'; g.lineWidth = 2; g.strokeRect(x + cw - 78, y + 10, 66, 26); g.fillStyle = 'rgba(160,30,30,0.55)'; g.font = `bold 12px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText(r() < 0.5 ? 'CHECKED' : 'HOLD', x + cw - 45, y + 24); }
      if (r() < 0.2) { g.strokeStyle = 'rgba(110,70,30,0.25)'; g.lineWidth = 3; g.beginPath(); g.arc(x + 40 + r() * (cw - 80), y + ch / 2, 20, 0, 6.28); g.stroke(); }
      for (let n = 0; n < 6; n++) { g.fillStyle = 'rgba(120,90,40,' + (0.05 + r() * 0.08) + ')'; g.beginPath(); g.arc(x + r() * cw, y + r() * ch, 1 + r() * 3, 0, 6.28); g.fill(); }
    }
  });
  // Binder spines: coloured cloth, a white label window with a year
  M.tex.binderSpines = () => T.canvas('m12:binderSpines', 512, 256, (g, w, h) => {
    const r = U.rng(52);
    const cols = ['#1d2a3a', '#5a1a1a', '#1f3a26', '#3a3a3a', '#6a5a2a', '#2a2a44', '#4a2a1a', '#20262a'];
    for (let k = 0; k < 8; k++) {
      const x = k * w / 8;
      g.fillStyle = cols[k]; g.fillRect(x, 0, w / 8, h);
      g.fillStyle = 'rgba(255,255,255,0.05)'; for (let y = 0; y < h; y += 3) g.fillRect(x, y, w / 8, 1);
      g.fillStyle = '#e6dfc8'; g.fillRect(x + 10, 30, w / 8 - 20, 90);
      g.fillStyle = '#222'; g.font = `bold 18px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.save(); g.translate(x + w / 16, 75); g.rotate(-H); g.fillText(String(1950 + k * 4 + (r() * 3 | 0)), 0, 0); g.restore();
      g.fillStyle = 'rgba(0,0,0,0.6)'; g.beginPath(); g.arc(x + w / 16, 190, 11, 0, 6.28); g.fill();
      g.strokeStyle = '#999'; g.lineWidth = 2; g.beginPath(); g.arc(x + w / 16, 190, 11, 0, 6.28); g.stroke();
    }
  });
  Object.assign(M.MATS, {
    archCard1: { color: 0x8a7a62, rough: 0.95 }, archCard2: { color: 0x7a6c56, rough: 0.95 }, archCard3: { color: 0x9a8a70, rough: 0.95 },
    archCard4: { color: 0x6c6252, rough: 0.95 }, archCard5: { color: 0xa69a82, rough: 0.95 }, archCardGrey: { color: 0x76746c, rough: 0.92 },
    archHole: { color: 0x0c0a08, rough: 1 },
    archLabels: { tex: 'archiveLabels', rough: 0.9 }, binderSpines: { tex: 'binderSpines', rough: 0.7 },
    chuteSteel: { color: 0x5e6660, rough: 0.5, metal: 0.55, refl: 0.06 }, chuteWorn: { color: 0x8a8e88, rough: 0.35, metal: 0.7, refl: 0.1 },
    rivet: { color: 0x4a504c, rough: 0.45, metal: 0.6 }, binPad: { color: 0x3a2e24, rough: 0.85 }, rubberFlap: { color: 0x111111, rough: 0.8 },
  });
  const label = (k, w, h, x, y, z, ry) => {
    const col = k % LCOLS, row = Math.floor(k / LCOLS) % LROWS;
    return ['uvplane', 'archLabels', w, h, col / LCOLS, 1 - (row + 1) / LROWS, (col + 1) / LCOLS, 1 - row / LROWS, x, y, z, 0, ry || 0, 0];
  };

  // ------------------------------------------------------------ archive stacks
  // A back-to-back steel stack, 2.94 m long (x), 2.9 m deep (z) so it fills its rack cell, 4.4 m high.
  // reserve: [{ level, side, x0, x1 }] runs left empty (where a scripted box stands)
  function stack(seed, reserve) {
    const r = U.rng(seed), s = [], L = 2.94, Dp = 2.9, Hh = 4.4, lv = [0.08, 0.7, 1.32, 1.94, 2.56, 3.18, 3.8];
    const cards = ['archCard1', 'archCard2', 'archCard3', 'archCard4', 'archCard5', 'archCardGrey'];
    // uprights (perforated angle), shelves with a folded front lip, end panels, top
    for (const x of [-L / 2 + 0.02, -L / 4, 0, L / 4, L / 2 - 0.02]) for (const z of [-Dp / 2 + 0.02, -0.05, 0.05, Dp / 2 - 0.02]) s.push(['box', 'shelfGreen', 0.035, Hh, 0.035, x, Hh / 2, z]);
    const shelfD = Dp / 2 - 0.08;
    for (const y of lv) for (const sd of [-1, 1]) {
      const zc = sd * (shelfD / 2 + 0.06);
      s.push(['box', 'shelfGreen', L, 0.02, shelfD, 0, y, zc]);
      s.push(['box', 'shelfGreen', L, 0.04, 0.012, 0, y - 0.01, sd * (Dp / 2 - 0.02)]);
    }
    for (const x of [-L / 2 + 0.005, L / 2 - 0.005]) s.push(['box', 'shelfGreen', 0.01, Hh - 0.1, Dp - 0.04, x, Hh / 2, 0]);
    s.push(['box', 'shelfGreen', L, 0.03, Dp, 0, Hh, 0]);
    // the section's years on both ends, both faces
    const secK = (seed * 13) % 64;
    for (const x of [-L / 2 - 0.002, L / 2 + 0.002]) for (const z of [-0.7, 0.7]) s.push(label(secK + (z > 0 ? 1 : 0), 0.3, 0.075, x, 1.6, z, x < 0 ? -H : H));
    // ladder rail along both faces
    s.push(['cyl', 'chrome', 0.015, 0.015, L, 8, 0, 3.6, Dp / 2 + 0.06, 0, 0, H], ['cyl', 'chrome', 0.015, 0.015, L, 8, 0, 3.6, -Dp / 2 - 0.06, 0, 0, H]);
    // contents, level by level, both faces
    let lab = seed * 5;
    for (let li = 0; li < 6; li++) for (const sd of [-1, 1]) {
      const y0 = lv[li] + 0.01, room = lv[li + 1] - lv[li] - 0.06, face = sd * (Dp / 2 - 0.035);
      const res = (reserve || []).filter(q => q.level === li && q.side === sd);
      let x = -L / 2 + 0.03;
      while (x < L / 2 - 0.12) {
        const blocked = res.find(q => x + 0.05 > q.x0 && x < q.x1);
        if (blocked) { x = blocked.x1 + 0.01; continue; }
        const roll = r();
        if (roll < 0.07) { x += 0.25 + r() * 0.35; continue; }                       // a gap: boxes taken out
        if (roll < 0.17) {                                                            // a run of ring binders
          const n = 4 + (r() * 6 | 0), bw = 0.065, bh = Math.min(room - 0.02, 0.31), bd = 0.29;
          for (let k = 0; k < n && x + bw < L / 2 - 0.03; k++) {
            if (res.some(q => x + bw > q.x0 && x < q.x1)) break;
            const lean = k === n - 1 && r() < 0.5 ? 0.12 : 0;
            const cx = x + bw / 2, cz = face - sd * (bd / 2 + 0.01);
            s.push(['box', 'binderSpines', bw - 0.004, bh, bd, cx + lean * 0.5 * bh, y0 + bh / 2 * Math.cos(lean), cz, 0, 0, -lean]);
            const sp = (k + (seed * 3)) % 8;
            s.push(['uvplane', 'binderSpines', bw - 0.008, bh - 0.01, sp / 8, 0, (sp + 1) / 8, 1, cx + lean * 0.5 * bh, y0 + bh / 2 * Math.cos(lean), face + sd * 0.0015 - sd * 0.01 - sd * (sd < 0 ? 0 : 0), 0, sd < 0 ? PI : 0, -lean]);
            x += bw + 0.002;
          }
          x += 0.02;
          continue;
        }
        // a lidded card box
        const bw = 0.3 + r() * 0.14, bh = Math.min(room - 0.03, 0.26 + r() * 0.1), bd = 0.36 + r() * 0.08;
        if (x + bw > L / 2 - 0.03) break;
        if (res.some(q => x + bw > q.x0 && x < q.x1)) { x = res.find(q => x + bw > q.x0 && x < q.x1).x1 + 0.01; continue; }
        const pulled = r() < 0.08 ? 0.06 + r() * 0.12 : 0, yaw = (r() - 0.5) * 0.05;
        const cx = x + bw / 2, cz = face - sd * (bd / 2 + 0.015) + sd * pulled, mat = cards[(r() * cards.length) | 0];
        s.push(['box', mat, bw, bh - 0.03, bd, cx, y0 + (bh - 0.03) / 2, cz, 0, yaw, 0]);
        s.push(['box', mat, bw + 0.012, 0.035, bd + 0.012, cx, y0 + bh - 0.0175, cz, 0, yaw, 0]);
        const fz = cz + sd * (bd / 2 + 0.0035);
        s.push(['box', 'archHole', bw * 0.36, 0.028, 0.004, cx, y0 + bh - 0.08, fz - sd * 0.0015, 0, yaw, 0]);
        s.push(label(lab++, Math.min(0.2, bw * 0.62), 0.06, cx, y0 + (bh - 0.03) * 0.45, fz, sd < 0 ? PI + yaw : yaw));
        x += bw + 0.008 + r() * 0.012;
      }
    }
    return s;
  }
  D.archiveStack = stack(1);
  D.archiveStackB = stack(2);
  D.archiveStackC = stack(3);
  D.archiveStackD = stack(4);
  // The stack in aisle 1979: third shelf (from the floor), east face, a gap at x -0.1 .. 0.4 for the ledger box
  D.archiveStackLedger = stack(5, [{ level: 2, side: 1, x0: -0.12, x1: 0.42 }]);

  // ------------------------------------------------------------ the parcel chute
  // Model space: +z faces the room, the back of the duct against the wall at z = -1.2; origin at the middle
  // of its footprint. The duct comes out of the ceiling (it runs on up through the slab), turns in an
  // elbow, and the slide falls at 36 degrees into a padded bin at counter height.
  D.parcelChute = (() => {
    const s = [], dz = -0.95, top = 3.6, elbow = 2.2;
    // vertical duct: square, folded seams, flanged joints with rivets every half metre
    s.push(['box', 'chuteSteel', 0.46, top - elbow, 0.46, 0, (top + elbow) / 2, dz]);
    for (let y = elbow + 0.25; y < top; y += 0.5) {
      s.push(['box', 'chuteWorn', 0.5, 0.03, 0.5, 0, y, dz]);
      for (const [x, z] of [[-0.25, 0], [0.25, 0], [0, -0.25], [0, 0.25]]) s.push(['sph', 'rivet', 0.008, x * 1.02, y, dz + z * 1.02, 6, 4]);
    }
    // wall brackets holding the duct
    for (const y of [2.5, 3.2]) s.push(['box', 'ironBlack', 0.56, 0.04, 0.06, 0, y, dz - 0.26], ['box', 'ironBlack', 0.04, 0.04, 0.26, -0.28, y, dz - 0.12], ['box', 'ironBlack', 0.04, 0.04, 0.26, 0.28, y, dz - 0.12]);
    // the elbow: a sloped box turning the duct forward into the slide
    s.push(['box', 'chuteSteel', 0.46, 0.5, 0.5, 0, elbow - 0.05, dz + 0.04]);
    s.push(['box', 'chuteWorn', 0.5, 0.03, 0.54, 0, elbow + 0.2, dz + 0.04]);
    // the slide: from the elbow mouth (z -0.7, y 2.0) down to the bin (z 0.3, y 1.05)
    const z0 = -0.7, y0 = 2.0, z1 = 0.32, y1 = 1.08, len = Math.hypot(z1 - z0, y0 - y1), ang = Math.atan2(y0 - y1, z1 - z0);
    const mz = (z0 + z1) / 2, my = (y0 + y1) / 2, nz = Math.sin(ang), ny = Math.cos(ang);   // the slide's "up"
    s.push(['box', 'chuteWorn', 0.52, 0.012, len, 0, my, mz, ang, 0, 0]);
    for (const x of [-0.27, 0.27]) s.push(['box', 'chuteSteel', 0.014, 0.16, len, x, my + ny * 0.075, mz + nz * 0.075, ang, 0, 0]);
    // rolled lips on the sides
    for (const x of [-0.27, 0.27]) s.push(['cyl', 'chuteSteel', 0.012, 0.012, len, 8, x, my + ny * 0.155, mz + nz * 0.155, ang + H, 0, 0]);
    // hangers from the ceiling to the slide, and two legs under its foot
    s.push(['cyl', 'ironBlack', 0.008, 0.008, top - (my + 0.1), 6, -0.27, (top + my + 0.1) / 2, mz]);
    s.push(['cyl', 'ironBlack', 0.008, 0.008, top - (my + 0.1), 6, 0.27, (top + my + 0.1) / 2, mz]);
    // the bin: a steel frame box lined with padding, open at the top, a rubber flap hanging at the mouth
    const bz = 0.62, bw = 0.78, bd = 0.62, bh = 0.98;
    for (const x of [-bw / 2, bw / 2]) s.push(['box', 'chuteSteel', 0.02, bh, bd, x, bh / 2, bz]);
    s.push(['box', 'chuteSteel', bw, bh, 0.02, 0, bh / 2, bz + bd / 2], ['box', 'chuteSteel', bw, bh - 0.15, 0.02, 0, (bh - 0.15) / 2, bz - bd / 2]);
    s.push(['box', 'chuteSteel', bw, 0.02, bd, 0, 0.78, bz]);
    s.push(['rbox', 'binPad', bw - 0.06, 0.05, bd - 0.06, 0.015, 0, 0.805, bz]);
    s.push(['rbox', 'chuteWorn', bw + 0.04, 0.03, 0.04, 0.008, 0, bh, bz + bd / 2], ['rbox', 'chuteWorn', 0.04, 0.03, bd, 0.008, -bw / 2, bh, bz], ['rbox', 'chuteWorn', 0.04, 0.03, bd, 0.008, bw / 2, bh, bz]);
    for (const x of [-bw / 2 + 0.03, bw / 2 - 0.03]) for (const z of [bz - bd / 2 + 0.03, bz + bd / 2 - 0.03]) s.push(['box', 'ironBlack', 0.04, 0.03, 0.04, x, 0.015, z]);
    s.push(['box', 'rubberFlap', 0.5, 0.2, 0.008, 0, y1 + 0.02, z1 + 0.02, 0.25, 0, 0]);
    // a stencilled card on the bin: "PARCELS — DO NOT REACH IN"
    s.push(['box', 'labelCard', 0.4, 0.08, 0.004, 0, 0.6, bz + bd / 2 + 0.012]);
    return s;
  })();

  // ------------------------------------------------------------ the depot washroom (1930s, never refitted)
  Object.assign(M.MATS, {
    stallBoard: { color: 0x6d7a6c, rough: 0.55 }, stallTrim: { color: 0x3e2a1e, rough: 0.45, refl: 0.04 }, mahoganySeat: { color: 0x4a2414, rough: 0.35, refl: 0.06 },
    castIronPaint: { color: 0x2c302e, rough: 0.55, metal: 0.4 }, leadPipe: { color: 0x6a6e70, rough: 0.5, metal: 0.6 }, copperPipe: { color: 0x8a5a36, rough: 0.4, metal: 0.7 },
    brassTap: { color: 0xa88a48, rough: 0.35, metal: 0.6 }, enamelWhite: { color: 0xd8d6cc, rough: 0.3, metal: 0.1, refl: 0.08 }, towelLinen: { color: 0xcfc8b4, rough: 0.95, double: true },
    cinderBlock: { color: 0x7a7872, rough: 0.95 }, engagedRed: { color: 0x8a1a14, rough: 0.4 }, vacantWhite: { color: 0xd6d2c4, rough: 0.4 }, slateGrey: { color: 0x4a4e50, rough: 0.6 },
  });
  // Three cubicles in a row. Model space: x across (-1.45 .. 1.45), the wall at z = -0.75, the doors at
  // z = +0.75. Painted board partitions on cast-iron feet, a hardwood top rail, doors on brass hinges (one
  // shut and engaged, one ajar, one open), and in each a pan with a mahogany seat, the high cast-iron
  // cistern on its brackets with the flush pipe down to the pan and the pull chain, a paper holder.
  D.washStalls = (() => {
    const s = [], W = 2.9, w = W / 3, z0 = -0.75, z1 = 0.75, y0 = 0.16, y1 = 2.06;
    for (let k = 0; k <= 3; k++) {
      const x = -W / 2 + k * w;
      s.push(['box', 'stallBoard', 0.03, y1 - y0, z1 - z0, x, (y0 + y1) / 2, 0]);
      s.push(['box', 'stallTrim', 0.05, 0.05, z1 - z0 + 0.02, x, y1 + 0.02, 0]);
      for (const z of [z0 + 0.1, z1 - 0.06]) s.push(['box', 'castIronPaint', 0.06, y0, 0.08, x, y0 / 2, z]);
    }
    s.push(['box', 'stallTrim', W + 0.06, 0.07, 0.06, 0, y1 + 0.03, z1]);
    for (let k = 0; k < 3; k++) {
      const cx = -W / 2 + (k + 0.5) * w, dw = w - 0.14;
      // pilasters each side of the door and the door itself, hinged on the left pilaster
      s.push(['box', 'stallBoard', 0.07, y1 - y0, 0.03, cx - w / 2 + 0.035, (y0 + y1) / 2, z1], ['box', 'stallBoard', 0.07, y1 - y0, 0.03, cx + w / 2 - 0.035, (y0 + y1) / 2, z1]);
      const open = [0, 0.55, 1.65][k], hx = cx - dw / 2;
      const door = [
        ['box', 'stallBoard', dw, 1.78, 0.028, dw / 2, 0, 0],
        ['box', 'stallTrim', dw, 0.05, 0.034, dw / 2, 0.865, 0], ['box', 'stallTrim', dw, 0.05, 0.034, dw / 2, -0.865, 0],
        ['box', 'stallTrim', 0.05, 1.68, 0.034, 0.025, 0, 0], ['box', 'stallTrim', 0.05, 1.68, 0.034, dw - 0.025, 0, 0],
        ['box', 'brassTap', 0.02, 0.07, 0.04, 0.0, 0.6, 0.0], ['box', 'brassTap', 0.02, 0.07, 0.04, 0.0, -0.6, 0.0],
        // the bolt indicator on the outside, a knob inside, a coat hook
        ['rbox', 'brassTap', 0.09, 0.05, 0.012, 0.004, dw - 0.09, 0.02, 0.02], ['box', k === 0 ? 'engagedRed' : 'vacantWhite', 0.06, 0.022, 0.003, dw - 0.09, 0.02, 0.027],
        ['sph', 'brassTap', 0.016, dw - 0.07, -0.02, -0.03, 10, 8],
        ['cyl', 'brassTap', 0.006, 0.006, 0.06, 6, dw / 2, 0.7, -0.045, H, 0, 0], ['sph', 'brassTap', 0.01, dw / 2, 0.7, -0.075, 8, 6],
      ];
      s.push(...M.place(door, hx, y0 + 0.02 + 0.89, z1, 0, -open, 0));
      // the pan
      s.push(['lathe', 'porcelain', [[0.12, 0], [0.105, 0.04], [0.1, 0.18], [0.14, 0.3], [0.19, 0.38], [0.2, 0.4], [0.185, 0.412], [0.17, 0.406]], 28, cx, 0, z0 + 0.42, 0, 0, 0, [0.9, 1, 1.25]]);
      s.push(['lathe', 'porcelainIn', [[0.17, 0.406], [0.13, 0.34], [0.06, 0.275], [0.001, 0.265]], 28, cx, 0, z0 + 0.42, 0, 0, 0, [0.9, 1, 1.25]]);
      s.push(['rbox', 'porcelain', 0.2, 0.2, 0.2, 0.04, cx, 0.32, z0 + 0.14]);
      // mahogany seat (down on the closed one, up on the others)
      const seatUp = k > 0;
      if (seatUp) s.push(['rbox', 'mahoganySeat', 0.36, 0.42, 0.025, 0.012, cx, 0.62, z0 + 0.14, -0.08, 0, 0]);
      else s.push(['rbox', 'mahoganySeat', 0.36, 0.025, 0.42, 0.012, cx, 0.43, z0 + 0.42]);
      // the high cistern on brackets, flush pipe, chain and pull
      const cy = 2.0;
      s.push(['rbox', 'castIronPaint', 0.46, 0.24, 0.2, 0.015, cx, cy, z0 + 0.12]);
      s.push(['rbox', 'castIronPaint', 0.5, 0.03, 0.24, 0.008, cx, cy + 0.135, z0 + 0.12]);
      for (const dx of [-0.17, 0.17]) s.push(['box', 'castIronPaint', 0.03, 0.18, 0.2, cx + dx, cy - 0.17, z0 + 0.1]);
      s.push(['tube', 'leadPipe', [[cx + 0.1, cy - 0.12, z0 + 0.12], [cx + 0.1, 1.2, z0 + 0.06], [cx + 0.04, 0.55, z0 + 0.06], [cx, 0.42, z0 + 0.14]], 0.019, 8, 18]);
      s.push(['cyl', 'chrome', 0.0025, 0.0025, 0.62, 4, cx - 0.17, cy - 0.42, z0 + 0.22], ['cap', 'porcelain', 0.016, 0.05, cx - 0.17, cy - 0.76, z0 + 0.22]);
      s.push(['box', 'castIronPaint', 0.16, 0.02, 0.02, cx - 0.12, cy - 0.06, z0 + 0.22]);
      // paper on the right-hand partition
      const px = cx + w / 2 - 0.035;
      s.push(['rbox', 'brassTap', 0.016, 0.06, 0.16, 0.004, px, 0.75, z0 + 0.62], ['cyl', 'paperRoll', 0.05, 0.05, 0.1, 16, px - 0.065, 0.72, z0 + 0.62]);
    }
    return s;
  })();
  // A row of three slab urinals with slate dividers, an auto-flushing cistern above, the spreader pipe
  // and a glazed channel at the foot. Model space: wall at z = 0, things toward +z, x across (-1.0 .. 1.0).
  D.urinalRow = (() => {
    const s = [];
    for (let k = 0; k < 3; k++) {
      const x = -0.66 + k * 0.66;
      s.push(['rbox', 'porcelain', 0.44, 0.72, 0.1, 0.04, x, 0.92, 0.06]);
      s.push(['lathe', 'porcelain', [[0.001, 0], [0.16, 0], [0.2, 0.06], [0.2, 0.4], [0.17, 0.44], [0.001, 0.44]], 24, x, 0.58, 0.1, 0, 0, 0, [1, 1, 0.55]]);
      s.push(['lathe', 'porcelainIn', [[0.001, 0.05], [0.15, 0.05], [0.18, 0.1], [0.18, 0.4], [0.001, 0.4]], 24, x, 0.6, 0.12, 0, 0, 0, [1, 1, 0.5]]);
      s.push(['cyl', 'chrome', 0.012, 0.012, 0.6, 8, x, 1.6, 0.05], ['sph', 'chrome', 0.02, x, 1.3, 0.07, 8, 6]);
    }
    for (const x of [-0.99, -0.33, 0.33, 0.99]) s.push(['box', 'slateGrey', 0.03, 1.4, 0.46, x, 0.95, 0.23]);
    s.push(['box', 'leadPipe', 2.0, 0.03, 0.03, 0, 1.9, 0.05]);
    s.push(['rbox', 'castIronPaint', 0.5, 0.3, 0.22, 0.02, 0, 2.1, 0.12]);
    s.push(['box', 'porcelain', 2.0, 0.06, 0.18, 0, 0.03, 0.1], ['box', 'porcelainIn', 1.96, 0.004, 0.14, 0, 0.062, 0.1]);
    return s;
  })();
  // A wall basin of the period: a deep rectangular bowl with a rolled front, brass pillar taps marked by
  // coloured dots, copper supplies and a chrome trap down to the floor, cast-iron brackets; a bevelled
  // mirror in a chrome frame and a glass shelf above. Model space: the wall at z = 0.
  D.washBasin = (() => {
    const s = [], y = 0.84, w = 0.6, d = 0.44;
    s.push(['rbox', 'porcelain', w, 0.04, d, 0.015, 0, y - 0.16, d / 2]);
    s.push(['rbox', 'porcelain', w, 0.2, 0.05, 0.02, 0, y - 0.06, d - 0.025]);
    s.push(['rbox', 'porcelain', 0.05, 0.2, d, 0.02, -w / 2 + 0.025, y - 0.06, d / 2], ['rbox', 'porcelain', 0.05, 0.2, d, 0.02, w / 2 - 0.025, y - 0.06, d / 2]);
    s.push(['rbox', 'porcelain', w, 0.22, 0.12, 0.02, 0, y - 0.05, 0.06]);
    s.push(['box', 'porcelainIn', w - 0.1, 0.004, d - 0.17, 0, y - 0.135, d / 2 + 0.035]);
    s.push(['disc', 'chrome', 0.022, 0, y - 0.132, d / 2 + 0.04, -H]);
    for (const [x, dot] of [[-0.14, 'redPlastic'], [0.14, 'bluePlastic']]) {
      s.push(['cyl', 'brassTap', 0.018, 0.022, 0.1, 12, x, y + 0.11, 0.07], ['tube', 'brassTap', [[x, y + 0.15, 0.07], [x, y + 0.17, 0.12], [x, y + 0.13, 0.16]], 0.01, 6]);
      s.push(['box', 'brassTap', 0.08, 0.012, 0.012, x, y + 0.17, 0.07], ['box', 'brassTap', 0.012, 0.012, 0.08, x, y + 0.17, 0.07], ['sph', dot, 0.008, x, y + 0.18, 0.07, 8, 6]);
      s.push(['tube', 'copperPipe', [[x, y - 0.16, 0.06], [x * 1.1, 0.5, 0.05], [x * 1.1, 0.02, 0.05]], 0.009, 6]);
    }
    s.push(['tube', 'chrome', [[0, y - 0.16, d / 2 + 0.04], [0, y - 0.3, d / 2 + 0.02], [0, y - 0.38, 0.16], [0, y - 0.34, 0.05], [0, y - 0.34, 0.0]], 0.016, 10]);
    for (const x of [-0.22, 0.22]) s.push(['box', 'castIronPaint', 0.03, 0.2, 0.3, x, y - 0.27, 0.15]);
    // mirror, frame, shelf, a cracked bar of soap
    s.push(...M.frame('chrome', 0.56, 0.72, 0.022, 0.018, 0, y + 0.82, 0.012));
    s.push(['box', 'mirror', 0.52, 0.68, 0.006, 0, y + 0.82, 0.006]);
    s.push(['rbox', 'glass', 0.5, 0.012, 0.1, 0.004, 0, y + 0.38, 0.05], ['box', 'chrome', 0.012, 0.03, 0.08, -0.22, y + 0.36, 0.04], ['box', 'chrome', 0.012, 0.03, 0.08, 0.22, y + 0.36, 0.04]);
    s.push(['rbox', 'soap', 0.07, 0.022, 0.045, 0.01, 0.2, y + 0.02, 0.1, 0, 0.3]);
    return s;
  })();
  // An enamel roller-towel cabinet with its loop of linen hanging out; model space: wall at z = 0
  D.rollerTowel = [
    ['rbox', 'enamelWhite', 0.38, 0.44, 0.17, 0.02, 0, 1.38, 0.085],
    ['box', 'labelCard', 0.14, 0.05, 0.002, 0, 1.5, 0.171],
    ['box', 'towelLinen', 0.3, 0.6, 0.004, 0, 0.88, 0.14, 0.04, 0, 0], ['box', 'towelLinen', 0.3, 0.58, 0.004, 0, 0.88, 0.1, -0.03, 0, 0],
    ['cyl', 'towelLinen', 0.022, 0.022, 0.3, 10, 0, 0.58, 0.12, 0, 0, H],
  ];

  // A small brass floor drain set into the tiles, a ring of grime round it
  D.floorDrain = [
    ['rcyl', 'brassTap', 0.09, 0.008, 0.003, 24, 0, 0.004, 0],
    ...[-0.045, -0.015, 0.015, 0.045].map(x => ['box', 'archHole', 0.012, 0.004, 0.11 - Math.abs(x) * 0.9, x, 0.0085, 0]),
    ['rcyl', 'castIronPaint', 0.13, 0.003, 0.0015, 24, 0, 0.0015, 0],
  ];

  // ------------------------------------------------------------ phosphorescent marks (escape-route paint, 1950s)
  M.tex.lumArrow = () => T.canvas('m12:lumArrow', 256, 128, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    const r = U.rng(9);
    g.strokeStyle = 'rgba(200,255,210,0.95)'; g.lineCap = 'round'; g.lineJoin = 'round';
    // brushed by hand: a shaft and a head, a little uneven
    g.lineWidth = 13; g.beginPath(); g.moveTo(24, h / 2 + 3); g.lineTo(w - 70, h / 2 - 2); g.stroke();
    g.lineWidth = 12; g.beginPath(); g.moveTo(w - 110, h / 2 - 38); g.lineTo(w - 34, h / 2); g.lineTo(w - 108, h / 2 + 36); g.stroke();
    // flaked paint
    g.globalCompositeOperation = 'destination-out';
    for (let k = 0; k < 40; k++) { g.beginPath(); g.arc(r() * w, r() * h, 1 + r() * 3, 0, 6.283); g.fill(); }
    g.globalCompositeOperation = 'source-over';
  });
  Object.assign(M.MATS, { lumPaint: { tex: 'lumArrow', color: 0x6a8a70, emissive: 0x58ff88, ei: 0.55, alpha: 0.35, rough: 0.9 } });
  // on a wall (model space: the wall at z = 0) and on the ground
  D.lumArrow = [['plane', 'lumPaint', 0.46, 0.23, 0, 0, 0.012, 0, 0, 0]];
  D.lumArrowFloor = [['plane', 'lumPaint', 0.5, 0.25, 0, 0.012, 0, -H, 0, 0]];
  // A crawlway's dressing: a low crib of squared timbers holding the roof up, and a heap of fallen rock
  // and broken lagging along one side
  D.cribLow = (() => {
    const s = [];
    for (let k = 0; k < 5; k++) {
      const y = 0.08 + k * 0.17;
      for (const o of [-0.32, 0.32]) s.push(k % 2 ? ['box', 'mineTimber', 0.86, 0.16, 0.16, 0, y, o, 0, 0.02 * (k - 2), 0] : ['box', 'mineTimber', 0.16, 0.16, 0.86, o, y, 0, 0, 0.02 * (k - 2), 0]);
    }
    return s;
  })();
  D.crawlRubble = (() => {
    const s = [], r = U.rng(77);
    for (let k = 0; k < 14; k++) s.push(['rock', 'rockGrey', r.range(0.12, 0.3), 300 + k, r.range(0.9, 1.3), r.range(0.6, 0.9), r.range(0.8, 1.2), r.range(-0.9, 0.9), r.range(0.05, 0.35), r.range(-0.3, 0.3), r() * 6]);
    for (let k = 0; k < 3; k++) s.push(['box', 'mineTimber', 1.2, 0.04, 0.18, r.range(-0.6, 0.6), 0.25 + k * 0.08, r.range(-0.3, 0.3), r.range(-0.3, 0.3), r() * 3, r.range(-0.4, 0.4)]);
    return s;
  })();
  // A miner's cap lamp lost in the mud: the headpiece on its side, the cable, the battery
  D.lostCapLamp = [
    ['cyl', 'capLamp', 0.04, 0.046, 0.065, 14, 0, 0.042, 0, H, 0, 0], ['disc', 'lampGlass', 0.034, 0, 0.042, 0.034],
    ['tube', 'black', [[0, 0.03, -0.034], [0.08, 0.012, -0.14], [0.24, 0.01, -0.21], [0.38, 0.02, -0.19]], 0.006, 5, 24],
    ['rbox', 'capLamp', 0.15, 0.1, 0.055, 0.012, 0.45, 0.05, -0.2, 0, 0.4, 0],
  ];
})(typeof window !== 'undefined' ? window : globalThis);
