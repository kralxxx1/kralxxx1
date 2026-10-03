/* Models for Falk's Carnival, a travelling fair on Halvard harbour, the night of 30 September 1984, after
   the ghost train burned: the carousel (deck, mirrored centre column, striped canopy, rounding boards,
   brass poles, chariots) and its band organ, the big wheel with its gondolas, the funhouse front with the
   empty glass booth of the laughing automaton, the ghost train's facade, track, ride cars, swing doors and
   control booth, the stalls (masks, candy floss, hot dogs, shooting gallery, ring toss, hook-a-duck, the
   strength tester), the show trailers and the inside of Pipo's (the dressing mirror, the costume rail, the
   wig stand, the shoes), the entrance arch and the chained gate, festoon lights and their poles, and the
   harbour (bollards, a dock crane, containers). Same spec conventions as props.js / models.js. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const P = PB.Props, D = P.DEFS, M = PB.Models, T = PB.Tex, U = PB.U;
  const PI = Math.PI, H = PI / 2;
  const SANS = () => T.FONTS.FONT_SANS || 'sans-serif';
  const SERIF = 'Georgia, "Times New Roman", serif';
  // weathering over any painted canvas: grime toward the bottom, flecks, scratches
  const weather = (g, w, h, seed, k = 1) => {
    const r = U.rng(seed);
    const gr = g.createLinearGradient(0, h * 0.4, 0, h); gr.addColorStop(0, 'rgba(30,24,18,0)'); gr.addColorStop(1, `rgba(30,24,18,${0.35 * k})`);
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 260 * k; i++) { g.fillStyle = `rgba(${r() < 0.5 ? '20,16,12' : '230,220,200'},${r.range(0.03, 0.12)})`; g.fillRect(r() * w, r() * h, r.range(1, 5), r.range(1, 5)); }
    for (let i = 0; i < 30 * k; i++) { g.strokeStyle = `rgba(20,16,12,${r.range(0.05, 0.15)})`; g.lineWidth = 1; g.beginPath(); const x = r() * w, y = r() * h; g.moveTo(x, y); g.lineTo(x + r.range(-30, 30), y + r.range(-6, 6)); g.stroke(); }
  };
  const sign = (key, text, o = {}) => T.canvas('m10:' + key, o.w || 1024, o.h || 256, (g, w, h) => {
    g.fillStyle = o.bg || '#1a1a2a'; g.fillRect(0, 0, w, h);
    g.strokeStyle = o.edge || '#d8b040'; g.lineWidth = 14; g.strokeRect(10, 10, w - 20, h - 20);
    if (o.bulbs !== false) for (let x = 30; x < w - 20; x += 46) for (const y of [26, h - 26]) { g.fillStyle = '#f8e8b0'; g.beginPath(); g.arc(x, y, 8, 0, PI * 2); g.fill(); }
    g.fillStyle = o.fg || '#f0d060'; g.font = `bold ${o.size || 120}px ${o.font || SERIF}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowOffsetX = 5; g.shadowOffsetY = 5; g.fillText(text, w / 2, h / 2 + 6); g.shadowColor = 'transparent';
    weather(g, w, h, text.length * 7 + 1, 0.8);
  });

  Object.assign(M.tex, {
    tentStripe: () => T.canvas('m10:tent', 1024, 256, (g, w, h) => {
      for (let k = 0; k < 16; k++) { g.fillStyle = k % 2 ? '#e8dcc0' : '#9a1a1a'; g.fillRect(k * w / 16, 0, w / 16 + 1, h); }
      weather(g, w, h, 41, 1.2);
    }),
    // the rounding boards: painted panels between gilt scrolls, a mirror in every third, bulbs
    carouselValance: () => T.canvas('m10:valance', 2048, 256, (g, w, h) => {
      const r = U.rng(84);
      g.fillStyle = '#2a1a34'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 12; k++) {
        const x = k * w / 12, pw = w / 12;
        g.fillStyle = '#b08a3a'; g.fillRect(x, 0, pw, h);
        g.fillStyle = '#d8b860'; for (let s = 0; s < 6; s++) { g.beginPath(); g.arc(x + pw / 2, h / 2, 100 - s * 14, 0, PI * 2); g.lineWidth = 3; g.strokeStyle = s % 2 ? '#7a5a1a' : '#e8c870'; g.stroke(); }
        if (k % 3 === 0) { const gr = g.createLinearGradient(x, 30, x + pw, h - 30); gr.addColorStop(0, '#c8d0d8'); gr.addColorStop(0.5, '#6a7480'); gr.addColorStop(1, '#d8e0e8'); g.fillStyle = gr; g.fillRect(x + 30, 40, pw - 60, h - 80); }
        else {
          // a little painted scene: sea and sky, a lighthouse or a sailing ship, a castle on a hill
          const sky = g.createLinearGradient(0, 40, 0, h - 40); sky.addColorStop(0, '#5a7aa8'); sky.addColorStop(1, '#e8c890'); g.fillStyle = sky; g.fillRect(x + 26, 36, pw - 52, h - 72);
          g.fillStyle = '#2a5a6a'; g.fillRect(x + 26, h * 0.62, pw - 52, h * 0.38 - 36);
          g.fillStyle = '#3a2a22';
          if (k % 3 === 1) { g.fillRect(x + pw * 0.45, h * 0.3, 14, h * 0.32); g.beginPath(); g.moveTo(x + pw * 0.3, h * 0.6); g.lineTo(x + pw * 0.7, h * 0.6); g.lineTo(x + pw * 0.6, h * 0.66); g.lineTo(x + pw * 0.4, h * 0.66); g.fill(); g.fillStyle = '#e8e0d0'; g.beginPath(); g.moveTo(x + pw * 0.47, h * 0.32); g.lineTo(x + pw * 0.66, h * 0.56); g.lineTo(x + pw * 0.47, h * 0.56); g.fill(); }
          else { g.fillRect(x + pw * 0.35, h * 0.42, pw * 0.3, h * 0.2); for (const t of [0.35, 0.6]) g.fillRect(x + pw * t, h * 0.32, 14, h * 0.12); }
        }
        g.strokeStyle = '#e8c870'; g.lineWidth = 8; g.strokeRect(x + 22, 32, pw - 44, h - 64);
        for (let b = 0; b < 4; b++) { g.fillStyle = '#fff0c0'; g.beginPath(); g.arc(x + pw * (b + 0.5) / 4, 16, 7, 0, PI * 2); g.fill(); }
      }
      weather(g, w, h, 85, 1.0); void r;
    }),
    carouselCeil: () => T.canvas('m10:cceil', 512, 512, (g, w, h) => {
      const c = w / 2; for (let k = 0; k < 24; k++) { g.fillStyle = k % 2 ? '#e8dcc0' : '#7a1a22'; g.beginPath(); g.moveTo(c, c); g.arc(c, c, c, k * PI / 12, (k + 1) * PI / 12); g.fill(); }
      g.fillStyle = '#b08a3a'; g.beginPath(); g.arc(c, c, 60, 0, PI * 2); g.fill(); weather(g, w, h, 86, 0.6);
    }),
    carouselMirror: () => T.canvas('m10:cmirror', 512, 512, (g, w, h) => {
      for (let k = 0; k < 8; k++) {
        const x = k * w / 8; g.fillStyle = '#b08a3a'; g.fillRect(x, 0, w / 8, h);
        const gr = g.createLinearGradient(x, 0, x + w / 8, h); gr.addColorStop(0, '#d8e0e8'); gr.addColorStop(0.5, '#5a6470'); gr.addColorStop(1, '#c0c8d0');
        g.fillStyle = gr; g.fillRect(x + 8, 20, w / 8 - 16, h - 40);
      }
      weather(g, w, h, 87, 0.8);
    }),
    // the funhouse front: the name in fat letters, a huge laughing face, swirls
    funFacade: () => T.canvas('m10:fun', 2048, 1024, (g, w, h) => {
      const bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#2a1a4a'); bg.addColorStop(1, '#4a1a2a'); g.fillStyle = bg; g.fillRect(0, 0, w, h);
      g.lineWidth = 30; for (let k = 0; k < 9; k++) { g.strokeStyle = k % 2 ? 'rgba(232,200,64,0.5)' : 'rgba(200,40,60,0.5)'; g.beginPath(); g.arc(w / 2, h * 0.62, 120 + k * 90, PI, PI * 2); g.stroke(); }
      // the face: round, freckled, the mouth wide open laughing, gap teeth
      const cx = w / 2, cy = h * 0.52;
      g.fillStyle = '#e8b890'; g.beginPath(); g.ellipse(cx, cy, 250, 290, 0, 0, PI * 2); g.fill();
      g.fillStyle = '#c84a1a'; for (let k = 0; k < 14; k++) { g.beginPath(); g.arc(cx + Math.cos(k / 14 * PI * 2) * 270, cy - 160 + Math.sin(k / 14 * PI * 2) * 90, 70, 0, PI * 2); g.fill(); }
      g.fillStyle = '#1a1a1a'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(cx + s * 95, cy - 60, 38, 22, s * 0.2, 0, PI * 2); g.fill(); }
      g.fillStyle = '#a82a2a'; g.beginPath(); g.ellipse(cx, cy + 110, 150, 110, 0, 0, PI); g.fill();
      g.fillStyle = '#f0e8d0'; for (let k = -2; k <= 2; k++) if (k !== 0) g.fillRect(cx + k * 38 - 16, cy + 110, 30, 34);
      g.fillStyle = '#b8603a'; for (let k = 0; k < 40; k++) { g.beginPath(); g.arc(cx + (Math.sin(k * 7.1) * 170), cy + 20 + Math.cos(k * 3.3) * 40, 5, 0, PI * 2); g.fill(); }
      g.fillStyle = '#f0d060'; g.strokeStyle = '#1a0a1a'; g.lineWidth = 14; g.font = `bold 210px ${SERIF}`; g.textAlign = 'center';
      g.strokeText('FUNHOUSE', w / 2, 200); g.fillText('FUNHOUSE', w / 2, 200);
      g.font = `bold 64px ${SANS()}`; g.fillStyle = '#e8e0d0'; g.fillText('MEET LAUGHING LOTTE!', w / 2, h - 60);
      weather(g, w, h, 88, 1.6);
    }),
    // the ghost train front: a moon, bats, painted ghosts, the name; scorched black from the doors up
    ghostFacade: () => T.canvas('m10:ghost', 2048, 768, (g, w, h) => {
      const r = U.rng(1984);
      const bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#0a1a2a'); bg.addColorStop(1, '#1a2a1a'); g.fillStyle = bg; g.fillRect(0, 0, w, h);
      g.fillStyle = '#e8e0b0'; g.beginPath(); g.arc(w * 0.82, h * 0.3, 110, 0, PI * 2); g.fill();
      g.fillStyle = '#0a1a2a'; g.beginPath(); g.arc(w * 0.85, h * 0.27, 100, 0, PI * 2); g.fill();
      for (let k = 0; k < 14; k++) { const x = r() * w, y = r() * h * 0.5, s = r.range(20, 50); g.fillStyle = '#0a0a0a'; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x - s, y - s * 0.6, x - s * 1.6, y); g.quadraticCurveTo(x - s * 0.8, y - s * 0.2, x, y + s * 0.3); g.quadraticCurveTo(x + s * 0.8, y - s * 0.2, x + s * 1.6, y); g.quadraticCurveTo(x + s, y - s * 0.6, x, y); g.fill(); }
      for (const [x, s] of [[0.15, 1], [0.35, 0.8], [0.62, 0.9]]) {
        const X = w * x, Y = h * 0.62; g.fillStyle = 'rgba(230,236,240,0.9)';
        g.beginPath(); g.arc(X, Y - 90 * s, 70 * s, PI, 0); g.lineTo(X + 70 * s, Y + 60 * s); for (let k = 0; k < 5; k++) g.lineTo(X + 70 * s - (k + 0.5) * 28 * s, Y + (k % 2 ? 60 : 35) * s); g.lineTo(X - 70 * s, Y + 60 * s); g.closePath(); g.fill();
        g.fillStyle = '#0a0a0a'; for (const e of [-1, 1]) { g.beginPath(); g.ellipse(X + e * 25 * s, Y - 100 * s, 12 * s, 18 * s, 0, 0, PI * 2); g.fill(); } g.beginPath(); g.ellipse(X, Y - 50 * s, 16 * s, 24 * s, 0, 0, PI * 2); g.fill();
      }
      g.font = `bold 170px ${SERIF}`; g.textAlign = 'center'; g.fillStyle = '#c8e8a0'; g.strokeStyle = '#0a0a0a'; g.lineWidth = 12;
      g.strokeText('GHOST TRAIN', w / 2, 190); g.fillText('GHOST TRAIN', w / 2, 190);
      // the fire: soot climbing from the right-hand door, the paint blistered
      for (let k = 0; k < 900; k++) { const x = w * 0.62 + r.range(-260, 420), y = h - Math.pow(r(), 0.6) * h; g.fillStyle = `rgba(8,6,4,${r.range(0.05, 0.25) * (1 - (h - y) / h * 0.6)})`; g.beginPath(); g.arc(x, y, r.range(10, 60), 0, PI * 2); g.fill(); }
      for (let k = 0; k < 120; k++) { g.fillStyle = `rgba(60,40,24,${r.range(0.2, 0.5)})`; g.beginPath(); g.arc(w * 0.62 + r.range(-200, 380), r() * h, r.range(3, 12), 0, PI * 2); g.fill(); }
      weather(g, w, h, 89, 1.2);
    }),
    maskWall: () => T.canvas('m10:masks', 1024, 512, (g, w, h) => {
      const r = U.rng(301);
      g.fillStyle = '#6a5a3a'; g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgba(0,0,0,0.25)'; for (let x = 10; x < w; x += 24) for (let y = 10; y < h; y += 24) { g.beginPath(); g.arc(x, y, 3, 0, PI * 2); g.fill(); }
      const faces = ['#e8e0d0', '#d8a040', '#c83a2a', '#3a6a9a', '#e8d070', '#8a5a9a', '#f0f0e8', '#2a2a2a'];
      for (let row = 0; row < 3; row++) for (let k = 0; k < 7; k++) {
        const x = 75 + k * 140 + (row % 2) * 30, y = 85 + row * 160, c = faces[r.int(0, faces.length - 1)];
        g.fillStyle = c; g.beginPath(); g.ellipse(x, y, 52, 66, 0, 0, PI * 2); g.fill();
        g.fillStyle = '#0a0a0a'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(x + s * 20, y - 12, 11, r() < 0.5 ? 14 : 7, 0, 0, PI * 2); g.fill(); }
        const kind = r.int(0, 3); g.strokeStyle = '#0a0a0a'; g.lineWidth = 5; g.beginPath();
        if (kind === 0) g.arc(x, y + 14, 24, 0.2, PI - 0.2); else if (kind === 1) g.arc(x, y + 40, 22, PI + 0.3, -0.3); else { g.moveTo(x - 20, y + 26); g.lineTo(x + 20, y + 26); }
        g.stroke();
        if (r() < 0.4) { g.fillStyle = '#c81a1a'; g.beginPath(); g.arc(x, y + 4, 9, 0, PI * 2); g.fill(); }
        g.strokeStyle = 'rgba(0,0,0,0.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y - 66); g.lineTo(x, y - 80); g.stroke();
      }
      weather(g, w, h, 302, 1);
    }),
    duckWater: () => T.canvas('m10:duck', 512, 128, (g, w, h) => { g.fillStyle = '#2a5a8a'; g.fillRect(0, 0, w, h); for (let k = 0; k < 40; k++) { g.strokeStyle = 'rgba(200,230,255,0.25)'; g.beginPath(); g.arc(Math.random() * w, Math.random() * h, 12, 0, PI); g.stroke(); } }),
    strikerScale: () => T.canvas('m10:striker', 128, 1024, (g, w, h) => {
      const cols = ['#c81a1a', '#e8701a', '#e8c81a', '#4aa81a', '#1a6ac8']; for (let k = 0; k < 10; k++) { g.fillStyle = cols[k % 5]; g.fillRect(0, k * h / 10, w, h / 10); }
      g.fillStyle = '#f0f0e0'; g.font = `bold 22px ${SANS()}`; g.textAlign = 'center';
      ['HERCULES', 'STRONGMAN', 'HE-MAN', 'NOT BAD', 'TRY AGAIN', 'WEAKLING', 'BABY', 'SISSY', 'TICKLE', 'FEATHER'].forEach((s, k) => g.fillText(s, w / 2, k * h / 10 + 60));
      weather(g, w, h, 303, 1);
    }),
    // a show trailer: cream over turquoise, a chrome strip, the windows
    trailerSkin: () => T.canvas('m10:trailer', 1024, 512, (g, w, h) => {
      g.fillStyle = '#e8e0c8'; g.fillRect(0, 0, w, h * 0.55); g.fillStyle = '#3a8a8a'; g.fillRect(0, h * 0.55, w, h * 0.45);
      g.fillStyle = '#c8ccd0'; g.fillRect(0, h * 0.53, w, 14);
      weather(g, w, h, 304, 1.4);
    }),
    pipoSign: () => T.canvas('m10:pipo', 512, 256, (g, w, h) => {
      g.fillStyle = '#e8e0c8'; g.fillRect(0, 0, w, h); g.fillStyle = '#c81a1a'; g.beginPath(); g.arc(70, h / 2, 46, 0, PI * 2); g.fill();
      g.fillStyle = '#1a3a8a'; g.font = `bold 120px ${SERIF}`; g.textAlign = 'center'; g.fillText('PIPO', w * 0.6, h / 2 + 42);
      for (let k = 0; k < 5; k++) { g.fillStyle = '#e8b818'; const x = 150 + k * 70, y = 30; g.beginPath(); for (let i = 0; i < 10; i++) { const a = i / 10 * PI * 2 - H, rr = i % 2 ? 6 : 14; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.fill(); }
      weather(g, w, h, 305, 1);
    }),
    polkaSuit: () => T.canvas('m10:polka', 256, 256, (g, w, h) => { g.fillStyle = '#e8e0c8'; g.fillRect(0, 0, w, h); const c = ['#c81a1a', '#1a5ab8', '#e8b818', '#2a8a3a']; let i = 0; for (let y = 16; y < h; y += 42) for (let x = (y / 42 % 2) * 21 + 16; x < w; x += 42) { g.fillStyle = c[i++ % 4]; g.beginPath(); g.arc(x, y, 11, 0, PI * 2); g.fill(); } weather(g, w, h, 306, 0.8); }),
    containerRib: () => T.canvas('m10:container', 256, 256, (g, w, h) => { g.fillStyle = '#7a7a7a'; g.fillRect(0, 0, w, h); for (let x = 0; x < w; x += 16) { const gr = g.createLinearGradient(x, 0, x + 16, 0); gr.addColorStop(0, '#5a5a5a'); gr.addColorStop(0.5, '#a8a8a8'); gr.addColorStop(1, '#5a5a5a'); g.fillStyle = gr; g.fillRect(x, 0, 16, h); } weather(g, w, h, 307, 1.5); }),
    stallCandy: () => sign('candy', 'CANDY FLOSS', { bg: '#e870a8', fg: '#ffffff', edge: '#ffffff' }),
    stallHotdog: () => sign('hotdog', 'HOT DOGS', { bg: '#c81a1a', fg: '#f0e060' }),
    stallShoot: () => sign('shoot', 'SHOOTING GALLERY', { size: 92, bg: '#1a3a1a' }),
    stallRings: () => sign('rings', 'RING TOSS', { bg: '#1a2a6a' }),
    stallDucks: () => sign('ducks', 'HOOK-A-DUCK', { bg: '#1a6a8a', fg: '#f8f0a0' }),
    stallMasks: () => sign('masks', 'MASKS', { bg: '#2a1a2a', fg: '#e8e0d0' }),
    stallStriker: () => sign('striker', 'TEST YOUR STRENGTH', { size: 84, bg: '#3a1a0a' }),
    ghostSignRide: () => sign('rideIn', 'ENTER IF YOU DARE', { size: 90, bg: '#0a0a0a', fg: '#c8e8a0', edge: '#3a5a2a' }),
    ghostCarFace: () => T.canvas('m10:carface', 256, 256, (g, w, h) => { g.fillStyle = '#a81a1a'; g.fillRect(0, 0, w, h); g.fillStyle = '#f0f0e8'; g.beginPath(); g.arc(w / 2, h * 0.55, 90, PI, 0); g.lineTo(w / 2 + 90, h); g.lineTo(w / 2 - 90, h); g.fill(); g.fillStyle = '#0a0a0a'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(w / 2 + s * 32, h * 0.5, 14, 22, 0, 0, PI * 2); g.fill(); } g.beginPath(); g.ellipse(w / 2, h * 0.75, 18, 26, 0, 0, PI * 2); g.fill(); weather(g, w, h, 308, 1.4); }),
  });
  M.tex.falkSign = () => sign('falk', 'FALK’S CARNIVAL', { w: 2048, size: 190, bg: '#3a0a1a' });

  Object.assign(M.MATS, {
    tentStripe: { tex: 'tentStripe', rough: 0.9, double: true }, carouselValance: { tex: 'carouselValance', rough: 0.45, refl: 0.08, double: true }, carouselCeil: { tex: 'carouselCeil', rough: 0.8, double: true },
    carouselMirror: { tex: 'carouselMirror', rough: 0.15, metal: 0.4, refl: 0.4 }, carouselGold: { color: 0xb08a3a, rough: 0.3, metal: 0.9, refl: 0.15 }, carouselDeck: { color: 0x5a3a24, rough: 0.7 },
    carouselDeckDark: { color: 0x2a1e16, rough: 0.8 }, brassPole: { color: 0xc8a050, rough: 0.22, metal: 1, refl: 0.2 }, chariotRed: { color: 0x8a1a22, rough: 0.4, refl: 0.08 },
    ferrisSteel: { color: 0xc8c8c0, rough: 0.5, metal: 0.6 }, ferrisRed: { color: 0xa81a1a, rough: 0.45, metal: 0.3 }, ferrisBlue: { color: 0x1a4a8a, rough: 0.45, metal: 0.3 }, ferrisYellow: { color: 0xd8a818, rough: 0.45, metal: 0.3 },
    funFacade: { tex: 'funFacade', rough: 0.75 }, facadeEdge: { color: 0x3a1a2a, rough: 0.8 }, ghostFacade: { tex: 'ghostFacade', rough: 0.8 }, ghostEdge: { color: 0x101410, rough: 0.9 },
    maskWall: { tex: 'maskWall', rough: 0.8 }, duckWater: { tex: 'duckWater', rough: 0.1, refl: 0.3 }, strikerScale: { tex: 'strikerScale', rough: 0.6 },
    trailerSkin: { tex: 'trailerSkin', rough: 0.45, refl: 0.08 }, pipoSign: { tex: 'pipoSign', rough: 0.7 }, falkSign: { tex: 'falkSign', rough: 0.5, emissive: 0xffffff, ei: 0.15 }, polkaSuit: { tex: 'polkaSuit', rough: 0.9, double: true },
    containerRed: { tex: 'containerRib', color: 0x8a3a2a, rough: 0.7, metal: 0.3 }, containerBlue: { tex: 'containerRib', color: 0x2a4a6a, rough: 0.7, metal: 0.3 }, craneYellow: { color: 0xb88a1a, rough: 0.6, metal: 0.5 },
    stallCandy: { tex: 'stallCandy', rough: 0.6 }, stallHotdog: { tex: 'stallHotdog', rough: 0.6 }, stallShoot: { tex: 'stallShoot', rough: 0.6 }, stallRings: { tex: 'stallRings', rough: 0.6 }, stallDucks: { tex: 'stallDucks', rough: 0.6 },
    stallMasks: { tex: 'stallMasks', rough: 0.6 }, stallStriker: { tex: 'stallStriker', rough: 0.6 }, ghostSignRide: { tex: 'ghostSignRide', rough: 0.6 }, ghostCarFace: { tex: 'ghostCarFace', rough: 0.5 },
    stallWood: { color: 0x6a4a2a, rough: 0.75 }, stallWhite: { color: 0xd8d0c0, rough: 0.7 }, awningRed: { tex: 'tentStripe', rough: 0.9, double: true }, flossPink: { color: 0xf0a0c8, rough: 1 },
    sausageBrown: { color: 0x8a4a2a, rough: 0.5 }, tinDuck: { color: 0xd8b818, rough: 0.4, metal: 0.5 }, plushBrown: { color: 0x8a5a3a, rough: 1 }, plushPink: { color: 0xe890b0, rough: 1 }, balloonRed: { color: 0xc81a2a, rough: 0.25, refl: 0.2 },
    balloonBlue: { color: 0x1a4ac8, rough: 0.25, refl: 0.2 }, balloonYellow: { color: 0xe8c81a, rough: 0.25, refl: 0.2 }, wigOrange: { color: 0xd8601a, rough: 0.95 }, noseRed: { color: 0xc8101a, rough: 0.3, refl: 0.15 },
    greasepaint: { color: 0xe8e0d8, rough: 0.5 }, mirrorBulb: { color: 0xfff0c8, glow: 1.4 }, scorch: { color: 0x0c0a08, rough: 1 }, charWood: { color: 0x1a1410, rough: 0.95 },
  });

  // ------------------------------------------------------------ the carousel (origin at its centre)
  D.carousel = (() => {
    const s = [];
    s.push(['cyl', 'carouselDeckDark', 6.3, 6.35, 0.14, 48, 0, 0.07, 0], ['cyl', 'carouselDeck', 6.0, 6.0, 0.36, 48, 0, 0.18, 0], ['cyl', 'carouselGold', 6.04, 6.04, 0.1, 48, 0, 0.31, 0, 0, 0, 0, true]);
    s.push(['cyl', 'carouselMirror', 1.1, 1.1, 4.3, 16, 0, 2.5, 0], ['torus', 'carouselGold', 1.13, 0.07, 24, PI * 2, 0, 0.45, 0, H, 0, 0], ['torus', 'carouselGold', 1.13, 0.07, 24, PI * 2, 0, 4.6, 0, H, 0, 0]);
    s.push(['cyl', 'carouselCeil', 6.35, 6.35, 0.12, 48, 0, 4.86, 0], ['cone', 'tentStripe', 6.7, 2.3, 32, 0, 6.05, 0], ['cyl', 'carouselValance', 6.5, 6.5, 0.95, 32, 0, 4.55, 0, 0, 0, 0, true]);
    s.push(['torus', 'carouselGold', 6.5, 0.05, 48, PI * 2, 0, 4.08, 0, H, 0, 0], ['torus', 'carouselGold', 6.5, 0.05, 48, PI * 2, 0, 5.02, 0, H, 0, 0]);
    s.push(['lathe', 'carouselGold', [[0.001, 0], [0.3, 0.05], [0.14, 0.3], [0.24, 0.55], [0.08, 0.8], [0.001, 1.1]], 14, 0, 7.15, 0]);
    s.push(['cyl', 'brassPole', 0.02, 0.02, 1.0, 6, 0, 8.6, 0], ['box', 'chariotRed', 0.55, 0.32, 0.01, 0.29, 8.9, 0]);
    // the brass poles, two rings (the horses go on the outer ring; the script hangs them there)
    for (let k = 0; k < 16; k++) { const a = (k + 0.5) / 16 * PI * 2; for (const [rr, off] of [[4.8, 0], [3.3, 0.5]]) { const b = a + off * PI / 16; s.push(['cyl', 'brassPole', 0.032, 0.032, 4.5, 8, Math.cos(b) * rr, 2.6, Math.sin(b) * rr]); } }
    // bulbs round the rounding boards and the canopy's edge
    for (let k = 0; k < 64; k++) { const a = k / 64 * PI * 2; s.push(['sph', 'bulbLit', 0.045, Math.cos(a) * 6.53, 4.12, Math.sin(a) * 6.53, 6, 4], ['sph', 'bulbLit', 0.04, Math.cos(a + 0.05) * 6.53, 5.0, Math.sin(a + 0.05) * 6.53, 6, 4]); }
    // two chariots, gilded benches for the people who would not ride a horse
    for (const a of [0.9, 4.05]) {
      const x = Math.cos(a) * 4.1, z = Math.sin(a) * 4.1, ry = -a + H;
      s.push(['rbox', 'chariotRed', 1.5, 0.75, 0.9, 0.08, x, 0.75, z, 0, ry, 0], ['rbox', 'carouselGold', 1.55, 0.08, 0.95, 0.03, x, 1.12, z, 0, ry, 0], ['rbox', 'chariotRed', 1.5, 0.7, 0.12, 0.05, x - Math.sin(ry) * 0.42, 1.4, z - Math.cos(ry) * 0.42, 0, ry, 0]);
    }
    return s;
  })();
  // the band organ in its little wagon by the carousel: pipes, drums, the painted front
  D.bandOrgan = [
    ['rbox', 'chariotRed', 2.4, 2.0, 1.0, 0.05, 0, 1.0, 0], ['box', 'carouselValance', 2.3, 0.5, 0.02, 0, 2.2, 0.48], ['ext', 'carouselGold', [[-1.2, 0], [1.2, 0], [1.2, 0.3], [0.6, 0.6], [0, 0.75], [-0.6, 0.6], [-1.2, 0.3]], 0.12, 0.01, 0, 2.0, 0.42, 0, 0, 0],
    ...[-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8].map((x, k) => ['cyl', 'brassPole', 0.035, 0.04, 0.5 + (4 - Math.abs(k - 4)) * 0.1, 10, x, 1.4 + (4 - Math.abs(k - 4)) * 0.05, 0.52]),
    ['cyl', 'stallWhite', 0.25, 0.25, 0.12, 20, -0.75, 0.8, 0.53, H, 0, 0], ['cyl', 'stallWhite', 0.25, 0.25, 0.12, 20, 0.75, 0.8, 0.53, H, 0, 0],
    ['box', 'carouselMirror', 0.6, 0.4, 0.02, 0, 0.8, 0.51], ...[-0.9, 0.9].map(x => ['cyl', 'black', 0.3, 0.3, 0.12, 16, x, 0.3, 0.55, 0, 0, H]),
  ];
  // the operator's lever post
  D.carouselLever = [['box', 'stallWood', 0.5, 1.0, 0.4, 0, 0.5, 0], ['box', 'castIron', 0.04, 0.5, 0.04, 0.1, 1.2, 0, 0, 0, 0.35], ['sph', 'black', 0.05, 0.19, 1.43, 0, 8, 6]];

  // ------------------------------------------------------------ the big wheel (origin: ground below the hub; wheel in the x-y plane)
  D.ferrisWheel = (() => {
    const s = [], HUB = 11.6, R = 10, N = 16;
    s.push(['cyl', 'ferrisSteel', 0.5, 0.5, 3.2, 16, 0, HUB, 0, H, 0, 0]);
    for (const z of [-1.25, 1.25]) {
      s.push(['torus', 'ferrisSteel', R, 0.09, 72, PI * 2, 0, HUB, z, 0, 0, 0], ['torus', 'ferrisSteel', R - 0.9, 0.06, 64, PI * 2, 0, HUB, z, 0, 0, 0]);
      for (let k = 0; k < N; k++) { const a = k / N * PI * 2; s.push(['box', 'ferrisSteel', 0.06, R, 0.06, Math.sin(a) * R / 2, HUB + Math.cos(a) * R / 2, z, 0, 0, -a]); }
      // A-frame legs
      for (const sx of [-1, 1]) s.push(['box', 'ferrisRed', 0.3, 13.1, 0.3, sx * 3.05, HUB / 2, z * 1.35, 0, 0, -sx * 0.48]);
    }
    for (let k = 0; k < N; k++) { const a = k / N * PI * 2; s.push(['box', 'ferrisSteel', 0.05, 0.05, 2.5, Math.sin(a) * R, HUB + Math.cos(a) * R, 0]); }
    // bulbs along the outer rims
    for (let k = 0; k < 48; k++) { const a = k / 48 * PI * 2; for (const z of [-1.3, 1.3]) s.push(['sph', 'bulbLit', 0.06, Math.sin(a) * (R + 0.12), HUB + Math.cos(a) * (R + 0.12), z, 6, 4]); }
    // gondolas hanging under every other spoke, alternating colours
    const cols = ['ferrisRed', 'ferrisBlue', 'ferrisYellow'];
    for (let k = 0; k < 12; k++) {
      const a = (k + 0.5) / 12 * PI * 2, x = Math.sin(a) * R, y = HUB + Math.cos(a) * R - 1.35, c = cols[k % 3];
      s.push(['box', 'ferrisSteel', 0.05, 1.1, 0.05, x, y + 0.85, 0], ['cyl', c, 0.75, 0.75, 1.5, 14, x, y + 1.35, 0, H, 0, 0, true]);
      s.push(['rbox', c, 1.5, 0.75, 1.0, 0.1, x, y, 0], ['rbox', 'black', 1.3, 0.12, 0.85, 0.04, x, y + 0.3, 0], ['cyl', 'chrome', 0.02, 0.02, 1.3, 6, x, y + 0.55, 0.48, 0, 0, H]);
    }
    s.push(['rbox', 'stallWood', 4.0, 0.4, 3.6, 0.05, 0, 0.2, 0], ['rbox', 'carouselDeckDark', 2.4, 0.3, 2.0, 0.05, 0, 0.55, 0]);
    return s;
  })();
  D.wheelBooth = [['rbox', 'chariotRed', 1.4, 2.3, 1.2, 0.04, 0, 1.15, 0], ['box', 'glass', 1.0, 0.7, 0.02, 0, 1.55, 0.61], ['box', 'stallWhite', 1.6, 0.12, 1.4, 0, 2.36, 0], ['box', 'castIron', 0.04, 0.45, 0.04, 0.4, 1.3, 0.7, 0.4, 0, 0]];

  // ------------------------------------------------------------ the funhouse front (a panel that stands on the building's face, +z out)
  D.funFacade = [
    ['ext', 'funFacade', [[-7, 0], [7, 0], [7, 6.2], [5.5, 7.4], [3, 8.2], [0, 8.6], [-3, 8.2], [-5.5, 7.4], [-7, 6.2]], 0.3, 0.03, 0, 0, 0, 0, 0, 0, 'facadeEdge', [[[-1.4, 0.01], [1.4, 0.01], [1.4, 2.6], [0, 3.2], [-1.4, 2.6]]]],
    ...Array.from({ length: 30 }, (_, k) => { const t = k / 29, a = PI * (1 - t); return ['sph', 'bulbLit', 0.07, Math.cos(a) * 6.9, 6.0 + Math.sin(a) * 2.6, 0.17, 6, 4]; }),
  ];
  // Lotte's booth: a glass case on a plinth, the painted backdrop, the front glass gone, nobody in it
  D.lotteBooth = [
    ['rbox', 'chariotRed', 1.8, 0.9, 1.4, 0.04, 0, 0.45, 0], ['box', 'carouselGold', 1.85, 0.08, 1.45, 0, 0.92, 0],
    ['box', 'carouselValance', 1.7, 2.6, 0.04, 0, 2.25, -0.66], ['box', 'glass', 0.02, 2.6, 1.3, -0.88, 2.25, 0], ['box', 'glass', 0.02, 2.6, 1.3, 0.88, 2.25, 0],
    ['box', 'glass', 0.5, 0.7, 0.02, -0.6, 1.3, 0.68, 0, 0, 0.2], ['box', 'carouselGold', 1.85, 0.1, 1.45, 0, 3.6, 0], ['box', 'chariotRed', 1.9, 0.5, 1.5, 0, 3.9, 0],
    ['box', 'stallWhite', 0.5, 0.05, 0.3, 0.2, 0.96, 0.3, 0, 0.4, 0],
  ];
  D.mirrorPanel = [['box', 'mirror', 1.4, 2.4, 0.02, 0, 1.3, 0], ['box', 'carouselGold', 1.5, 0.08, 0.06, 0, 2.54, 0], ['box', 'carouselGold', 1.5, 0.08, 0.06, 0, 0.06, 0], ['box', 'carouselGold', 0.06, 2.5, 0.06, -0.73, 1.3, 0], ['box', 'carouselGold', 0.06, 2.5, 0.06, 0.73, 1.3, 0]];
  D.funBarrel = [['cyl', 'chariotRed', 1.3, 1.3, 2.6, 24, 0, 1.3, 0, 0, 0, H, true], ...[-0.9, 0, 0.9].map(x => ['torus', 'carouselGold', 1.31, 0.04, 24, PI * 2, x, 1.3, 0, 0, H, 0])];
  D.fuseBox = [['box', 'castIron', 0.5, 0.7, 0.18, 0, 1.4, 0.09], ['box', 'dangerLabel', 0.3, 0.12, 0.004, 0, 1.6, 0.182], ['cyl', 'chrome', 0.03, 0.03, 0.2, 8, 0.15, 1.25, 0.2, H, 0, 0]];
  D.fuse = [['cyl', 'porcelainW', 0.025, 0.025, 0.11, 12, 0, 0.025, 0, 0, 0, H], ['cyl', 'brass', 0.027, 0.027, 0.015, 12, 0.05, 0.025, 0, 0, 0, H], ['cyl', 'brass', 0.027, 0.027, 0.015, 12, -0.05, 0.025, 0, 0, 0, H]];

  // ------------------------------------------------------------ the ghost train
  D.ghostFacade = [
    ['ext', 'ghostFacade', [[-8, 0], [8, 0], [8, 6.4], [6.5, 6.4], [6.5, 7.2], [5, 7.2], [5, 6.4], [2.5, 6.4], [2.5, 7.6], [-2.5, 7.6], [-2.5, 6.4], [-5, 6.4], [-5, 7.2], [-6.5, 7.2], [-6.5, 6.4], [-8, 6.4]], 0.3, 0.03, 0, 0, 0, 0, 0, 0, 'ghostEdge',
      [[[-4.1, 0.01], [-1.9, 0.01], [-1.9, 2.4], [-4.1, 2.4]], [[1.9, 0.01], [4.1, 0.01], [4.1, 2.4], [1.9, 2.4]]]],
    ['box', 'ghostSignRide', 2.6, 0.5, 0.04, -3.0, 2.75, 0.18], ['box', 'scorch', 2.3, 0.6, 0.04, 3.0, 2.7, 0.17],
  ];
  // swing doors: two leaves on one hinge line (x), padded black, a painted skull long since scorched off
  D.ghostDoors = [['box', 'black', 1.08, 2.3, 0.06, -0.55, 1.15, 0, 0, 0.25, 0], ['box', 'black', 1.08, 2.3, 0.06, 0.55, 1.15, 0, 0, -0.25, 0], ['box', 'castIron', 2.3, 0.1, 0.1, 0, 2.42, 0]];
  D.rideTrack = [['box', 'castIron', 3.0, 0.07, 0.07, 0, 0.035, -0.32], ['box', 'castIron', 3.0, 0.07, 0.07, 0, 0.035, 0.32], ['box', 'charWood', 3.0, 0.02, 0.9, 0, 0.01, 0], ['box', 'chrome', 3.0, 0.03, 0.02, 0, 0.09, 0]];
  D.ghostCar = [
    ['rbox', 'chariotRed', 1.5, 0.55, 1.0, 0.1, 0, 0.45, 0], ['box', 'ghostCarFace', 0.04, 0.7, 0.9, 0.78, 0.6, 0], ['rbox', 'black', 0.7, 0.12, 0.85, 0.04, -0.1, 0.75, 0],
    ['rbox', 'chariotRed', 0.12, 0.6, 0.95, 0.04, -0.62, 0.95, 0], ['tube', 'chrome', [[0.3, 0.95, -0.45], [0.35, 1.1, -0.2], [0.35, 1.1, 0.2], [0.3, 0.95, 0.45]], 0.025, 6, 12],
    ...[[-0.5, -0.45], [-0.5, 0.45], [0.5, -0.45], [0.5, 0.45]].map(([x, z]) => ['cyl', 'black', 0.13, 0.13, 0.08, 14, x, 0.13, z, H, 0, 0]),
    ['rbox', 'black', 1.7, 0.12, 1.08, 0.05, 0, 0.18, 0],
  ];
  // burned scenery inside: a charred figure on a pole, a coffin prop, cobweb netting
  D.charFigure = [['cap', 'charWood', 0.2, 1.0, 0, 1.2, 0], ['sph', 'charWood', 0.16, 0, 2.0, 0.02, 10, 8], ['box', 'charWood', 1.1, 0.1, 0.1, 0, 1.6, 0, 0, 0, 0.1], ['cyl', 'castIron', 0.03, 0.03, 0.6, 6, 0, 0.3, 0]];
  D.coffinProp = [['ext', 'charWood', [[-0.3, -1.0], [0.3, -1.0], [0.42, 0.45], [0.25, 1.0], [-0.25, 1.0], [-0.42, 0.45]], 0.35, 0.01, 0, 0.2, 0, H, 0, 0, 'charWood']];
  D.controlBooth = [
    ['rbox', 'stallWood', 1.8, 2.4, 1.5, 0.04, 0, 1.2, 0], ['box', 'glass', 1.4, 0.8, 0.02, 0, 1.6, 0.76], ['box', 'stallWhite', 2.0, 0.12, 1.7, 0, 2.46, 0],
    ['box', 'consoleGrey', 1.5, 0.12, 0.5, 0, 1.05, 0.5, -0.3, 0, 0], ['box', 'castIron', 0.05, 0.4, 0.05, 0.5, 1.25, 0.62, 0.4, 0, 0], ['sph', 'redPlastic', 0.05, 0.5, 1.45, 0.7, 8, 6],
  ];

  // ------------------------------------------------------------ stalls: a counter, side walls, a back wall, a striped awning, the sign
  const stall = (signMat, extra = [], back = 'stallWood') => [
    ['box', 'stallWood', 3.0, 1.0, 0.12, 0, 0.5, 0.9], ['box', 'stallWhite', 3.1, 0.06, 0.4, 0, 1.03, 0.85],
    ['box', 'stallWood', 0.1, 2.6, 2.0, -1.5, 1.3, 0], ['box', 'stallWood', 0.1, 2.6, 2.0, 1.5, 1.3, 0], ['box', back, 3.0, 2.6, 0.1, 0, 1.3, -0.95],
    ['box', 'stallWood', 3.1, 0.08, 2.1, 0, 2.62, 0], ['box', 'awningRed', 3.3, 0.04, 1.1, 0, 2.55, 1.45, 0.38, 0, 0],
    ['box', signMat, 3.0, 0.75, 0.05, 0, 3.05, 1.0], ['box', 'stallWood', 0.08, 0.8, 0.08, -1.45, 2.85, 1.0], ['box', 'stallWood', 0.08, 0.8, 0.08, 1.45, 2.85, 1.0],
    ...extra,
  ];
  D.maskStall = stall('stallMasks', [['box', 'stallWood', 2.8, 0.05, 0.3, 0, 1.6, -0.75], ['box', 'stallWood', 2.8, 0.05, 0.3, 0, 2.1, -0.75]], 'maskWall');
  D.candyStall = stall('stallCandy', [['cyl', 'chrome', 0.4, 0.3, 0.45, 20, 0.6, 1.3, 0.5], ['sph', 'flossPink', 0.18, -0.5, 1.4, 0.6, 10, 8], ['cyl', 'stallWhite', 0.01, 0.01, 0.4, 6, -0.5, 1.2, 0.6], ['sph', 'flossPink', 0.16, -0.9, 1.35, 0.55, 10, 8]]);
  D.hotdogStall = stall('stallHotdog', [['rbox', 'steelPrep', 1.2, 0.3, 0.5, 0.02, 0.5, 1.2, 0.5], ...[0, 1, 2, 3].map(k => ['cap', 'sausageBrown', 0.03, 0.14, 0.2 + k * 0.1, 1.38, 0.5, 0, 0, H])]);
  D.shootingStall = stall('stallShoot', [
    ...[0, 1, 2, 3, 4, 5].map(k => ['ext', 'tinDuck', [[-0.12, 0], [0.12, 0], [0.14, 0.1], [0.08, 0.16], [0.12, 0.24], [0.02, 0.26], [-0.02, 0.18], [-0.12, 0.12]], 0.02, 0, -1.1 + k * 0.42, 1.6, -0.8]),
    ['box', 'castIron', 2.8, 0.04, 0.04, 0, 1.58, -0.8], ['box', 'black', 0.9, 0.05, 0.08, -0.6, 1.1, 0.8, 0, 0.1, 0], ['box', 'black', 0.9, 0.05, 0.08, 0.6, 1.1, 0.8, 0, -0.15, 0],
    ...[-0.9, -0.3, 0.3, 0.9].map(x => ['sph', x < 0 ? 'plushBrown' : 'plushPink', 0.16, x, 2.25, -0.75, 10, 8]),
  ]);
  D.ringStall = stall('stallRings', [...Array.from({ length: 15 }, (_, k) => ['cyl', 'bottleGlass', 0.035, 0.035, 0.24, 8, -1.0 + (k % 5) * 0.5, 1.2 + Math.floor(k / 5) * 0.02, -0.2 + Math.floor(k / 5) * 0.3])]);
  D.duckStall = stall('stallDucks', [['cyl', 'duckWater', 0.9, 0.9, 0.5, 24, 0, 0.8, 0.0], ...[0, 1, 2, 3, 4].map(k => ['sph', 'tinDuck', 0.08, Math.cos(k * 1.3) * 0.6, 1.08, Math.sin(k * 1.3) * 0.6, 8, 6])]);
  D.highStriker = [
    ['rbox', 'stallWood', 1.2, 0.3, 1.2, 0.03, 0, 0.15, 0], ['box', 'castIron', 0.5, 0.2, 0.5, 0, 0.4, 0.2], ['box', 'strikerScale', 0.4, 6.0, 0.08, 0, 3.4, -0.3],
    ['box', 'castIron', 0.06, 6.0, 0.06, 0, 3.4, -0.22], ['lathe', 'bronzeBell', [[0.001, 0], [0.22, 0.02], [0.2, 0.15], [0.12, 0.25], [0.001, 0.28]], 16, 0, 6.45, -0.3],
    ['box', 'stallStriker', 2.2, 0.5, 0.05, 0, 7.0, -0.3], ['cyl', 'stallWood', 0.03, 0.03, 1.1, 8, 0.7, 0.55, 0.4, 0, 0, 0.35], ['rbox', 'stallWood', 0.35, 0.18, 0.18, 0.02, 0.9, 1.05, 0.4, 0, 0, 0.35],
  ];

  // ------------------------------------------------------------ the show trailers
  D.trailer = [
    ['rbox', 'trailerSkin', 6.0, 2.4, 2.3, 0.3, 0, 1.6, 0], ['box', 'glass', 1.2, 0.6, 0.02, -1.6, 2.0, 1.16], ['box', 'glass', 1.2, 0.6, 0.02, 1.4, 2.0, 1.16], ['box', 'black', 0.75, 1.9, 0.02, 0.0, 1.35, 1.16],
    ['box', 'curtainRed', 1.1, 0.55, 0.02, -1.6, 2.0, 1.14], ['box', 'chrome', 0.06, 0.2, 0.04, 0.3, 1.3, 1.18],
    ...[-0.6, 0.6].map(x => ['cyl', 'black', 0.36, 0.36, 0.22, 16, x, 0.36, 1.05, H, 0, 0]), ...[-0.6, 0.6].map(x => ['cyl', 'black', 0.36, 0.36, 0.22, 16, x, 0.36, -1.05, H, 0, 0]),
    ['tube', 'castIron', [[3.0, 0.5, -0.6], [3.9, 0.45, 0], [3.0, 0.5, 0.6]], 0.05, 6, 10], ['cyl', 'castIron', 0.04, 0.04, 0.5, 8, 3.9, 0.25, 0], ['box', 'stallWood', 0.6, 0.15, 0.4, 0, 0.3, 1.45],
    ['cyl', 'redPaint', 0.15, 0.15, 0.6, 12, 3.2, 1.0, 0.0], ['rbox', 'trailerSkin', 0.6, 0.2, 0.6, 0.05, -1.5, 2.9, 0],
  ];
  // Pipo's trailer is a room on the map: these are its outside bits (wheels, hitch, the sign, the step)
  D.trailerChassis = [
    ...[-0.6, 0.6].flatMap(x => [['cyl', 'black', 0.36, 0.36, 0.22, 16, x, 0.36, 1.6, H, 0, 0], ['cyl', 'black', 0.36, 0.36, 0.22, 16, x, 0.36, -1.6, H, 0, 0]]),
    ['tube', 'castIron', [[3.0, 0.5, -0.6], [3.9, 0.45, 0], [3.0, 0.5, 0.6]], 0.05, 6, 10], ['cyl', 'castIron', 0.04, 0.04, 0.5, 8, 3.9, 0.25, 0],
  ];
  D.pipoSign = [['box', 'pipoSign', 1.0, 0.5, 0.03, 0, 0, 0]];
  D.trailerStep = [['box', 'stallWood', 0.7, 0.18, 0.45, 0, 0.18, 0], ['box', 'stallWood', 0.7, 0.18, 0.3, 0, 0.36, -0.08]];
  // inside: the dressing table with its mirror ringed with bulbs, greasepaint, a powder puff
  D.vanityMirror = [
    ['rbox', 'mahogany', 1.0, 0.75, 0.45, 0.02, 0, 0.375, 0], ['box', 'mahogany', 1.04, 0.04, 0.5, 0, 0.77, 0],
    ['box', 'mirror', 0.72, 0.62, 0.01, 0, 1.2, -0.19], ['box', 'mahogany', 0.86, 0.76, 0.03, 0, 1.2, -0.21],
    ...Array.from({ length: 12 }, (_, k) => { const t = k / 12, a = t * PI * 2, x = Math.max(-0.4, Math.min(0.4, Math.cos(a) * 0.55)), y = 1.2 + Math.max(-0.35, Math.min(0.35, Math.sin(a) * 0.5)); return ['sph', 'mirrorBulb', 0.028, x, y, -0.17, 8, 6]; }),
    ...[0, 1, 2, 3, 4].map(k => ['cyl', k % 2 ? 'greasepaint' : 'noseRed', 0.035, 0.035, 0.025, 12, -0.35 + k * 0.08, 0.805, 0.1]),
    ['sph', 'stallWhite', 0.06, 0.32, 0.81, 0.08, 10, 6, [1, 0.5, 1]], ['box', 'paper', 0.09, 0.12, 0.003, 0.3, 1.33, -0.18, 0, 0, 0.1],
  ];
  D.costumeRack = [
    ['box', 'chrome', 1.2, 0.025, 0.025, 0, 1.7, 0], ['box', 'chrome', 0.025, 1.7, 0.025, -0.6, 0.85, 0], ['box', 'chrome', 0.025, 1.7, 0.025, 0.6, 0.85, 0],
    ['rbox', 'polkaSuit', 0.55, 0.9, 0.22, 0.08, -0.15, 1.15, 0], ['rbox', 'polkaSuit', 0.22, 0.8, 0.2, 0.06, -0.3, 0.45, 0], ['rbox', 'polkaSuit', 0.22, 0.8, 0.2, 0.06, 0.0, 0.45, 0],
    ['torus', 'stallWhite', 0.16, 0.06, 16, PI * 2, -0.15, 1.62, 0, H, 0, 0], ['rbox', 'coatBeige', 0.45, 0.95, 0.15, 0.05, 0.35, 1.15, 0],
  ];
  D.wigStand = [['cyl', 'stallWood', 0.08, 0.12, 0.05, 12, 0, 0.025, 0], ['cyl', 'stallWood', 0.015, 0.015, 0.3, 6, 0, 0.18, 0], ['sph', 'stallWhite', 0.1, 0, 0.42, 0, 12, 10, [0.85, 1.1, 0.95]],
    ...Array.from({ length: 14 }, (_, k) => { const a = k / 14 * PI * 2; return ['sph', 'wigOrange', 0.06, Math.cos(a) * 0.1, 0.47 + Math.sin(k * 2.1) * 0.03, Math.sin(a) * 0.1, 8, 6]; })];
  D.clownShoes = [['rbox', 'redPaint', 0.4, 0.14, 0.16, 0.06, 0, 0.07, -0.1, 0, 0.1, 0], ['rbox', 'redPaint', 0.4, 0.14, 0.16, 0.06, 0.02, 0.07, 0.1, 0, -0.05, 0], ['box', 'stallWhite', 0.04, 0.02, 0.1, -0.1, 0.15, -0.1]];
  D.clownNose = [['sph', 'noseRed', 0.028, 0, 0.028, 0, 14, 10]];
  D.trailerBed = [['rbox', 'stallWood', 1.9, 0.45, 0.75, 0.02, 0, 0.225, 0], ['rbox', 'berthBlanket', 1.85, 0.12, 0.72, 0.04, 0, 0.5, 0], ['rbox', 'berthSheet', 0.4, 0.1, 0.5, 0.04, -0.7, 0.6, 0]];

  // ------------------------------------------------------------ the entrance and the fence
  D.entranceArch = (() => {
    const s = [];
    for (const x of [-4.5, 4.5]) s.push(['cyl', 'chariotRed', 0.25, 0.3, 6.0, 12, x, 3.0, 0], ['lathe', 'carouselGold', [[0.001, 0], [0.3, 0.05], [0.18, 0.35], [0.001, 0.7]], 12, x, 6.0, 0]);
    s.push(['torus', 'chariotRed', 4.5, 0.18, 32, PI, 0, 5.5, 0, 0, 0, 0], ['box', 'falkSign', 7.0, 1.2, 0.12, 0, 6.9, 0]);
    for (let k = 0; k < 24; k++) { const a = PI * k / 23; s.push(['sph', 'bulbLit', 0.07, Math.cos(a) * 4.5, 5.5 + Math.sin(a) * 4.5, 0.22, 6, 4]); }
    return s;
  })();
  D.ticketKiosk = [['cyl', 'chariotRed', 1.0, 1.0, 2.3, 6, 0, 1.15, 0], ['cone', 'tentStripe', 1.35, 1.0, 6, 0, 2.8, 0], ['box', 'glass', 0.8, 0.6, 0.02, 0, 1.5, 0.88], ['box', 'stallWhite', 0.9, 0.05, 0.3, 0, 1.08, 0.95], ['lathe', 'carouselGold', [[0.001, 0], [0.1, 0.05], [0.001, 0.4]], 8, 0, 3.3, 0]];
  D.gateChained = [
    ...[-1.5, 1.5].flatMap(x => [['box', 'chainLink', 2.9, 2.1, 0.02, x, 1.15, 0], ['box', 'galvanized', 2.95, 0.05, 0.05, x, 2.2, 0], ['box', 'galvanized', 2.95, 0.05, 0.05, x, 0.1, 0], ['box', 'galvanized', 0.05, 2.15, 0.05, x - 1.45 * Math.sign(x), 1.15, 0]]),
    ['box', 'galvanized', 0.06, 2.2, 0.06, 0, 1.15, 0], ...[0, 1, 2, 3, 4, 5].map(k => ['torus', 'chainSteel', 0.035, 0.009, 8, PI * 2, -0.12 + k * 0.05, 1.1 + Math.sin(k) * 0.03, 0.04, 0, k % 2 ? H : 0, 0]), ['rbox', 'padlock', 0.07, 0.08, 0.03, 0.01, 0.18, 1.0, 0.05],
  ];
  // festoon lights: a sagging wire with bulbs, fixed lengths so the bulbs stay round
  for (const len of [6, 9, 12, 15]) {
    const pts = [], n = 10, sag = len * 0.06;
    for (let k = 0; k <= n; k++) { const t = k / n; pts.push([-len / 2 + t * len, -4 * sag * t * (1 - t), 0]); }
    const s = [['tube', 'cordBlack', pts, 0.008, 4, 24]];
    for (let x = -len / 2 + 0.4; x < len / 2; x += 0.75) { const t = (x + len / 2) / len, y = -4 * sag * t * (1 - t) - 0.06; s.push(['sph', 'bulbLit', 0.045, x, y, 0, 6, 4]); }
    D['festoon' + len] = s;
  }
  D.lightPole = [['cyl', 'timber', 0.1, 0.13, 6.0, 8, 0, 3.0, 0], ['box', 'timber', 0.8, 0.1, 0.1, 0, 5.7, 0], ['lathe', 'castIron', [[0.001, 0.12], [0.18, 0.02], [0.22, -0.06]], 12, 0.3, 5.6, 0], ['sph', 'lampWarm', 0.05, 0.3, 5.52, 0, 8, 6]];

  // ------------------------------------------------------------ the harbour
  D.bollard = [['lathe', 'castIron', [[0.001, 0], [0.2, 0], [0.16, 0.1], [0.14, 0.45], [0.2, 0.55], [0.2, 0.62], [0.001, 0.64]], 14, 0, 0, 0]];
  D.container = [['box', 'containerRed', 6.0, 2.6, 2.4, 0, 1.3, 0], ['box', 'castIron', 6.04, 0.12, 2.44, 0, 2.55, 0], ['box', 'castIron', 6.04, 0.12, 2.44, 0, 0.06, 0], ['box', 'castIron', 0.05, 2.4, 2.2, 3.01, 1.3, 0]];
  D.containerB = [['box', 'containerBlue', 6.0, 2.6, 2.4, 0, 1.3, 0], ['box', 'castIron', 6.04, 0.12, 2.44, 0, 2.55, 0], ['box', 'castIron', 6.04, 0.12, 2.44, 0, 0.06, 0], ['box', 'castIron', 0.05, 2.4, 2.2, 3.01, 1.3, 0]];
  D.dockCrane = [
    ...[[-3, -3], [3, -3], [-3, 3], [3, 3]].map(([x, z]) => ['box', 'craneYellow', 0.5, 14, 0.5, x, 7, z]),
    ['box', 'craneYellow', 7, 0.6, 0.6, 0, 14, -3], ['box', 'craneYellow', 7, 0.6, 0.6, 0, 14, 3], ['box', 'craneYellow', 0.6, 0.6, 7, -3, 14, 0], ['box', 'craneYellow', 0.6, 0.6, 7, 3, 14, 0],
    ['rbox', 'craneYellow', 4, 3, 4, 0.1, 0, 16, 0], ['box', 'glass', 0.02, 1.2, 3, 2.01, 16.3, 0], ['box', 'craneYellow', 24, 0.8, 0.8, 8, 20, 0, 0, 0, 0.35], ['box', 'craneYellow', 8, 0.5, 0.5, -4, 18.5, 0, 0, 0, -0.2],
    ['cyl', 'ropeSteel', 0.02, 0.02, 14, 4, 18.5, 18, 0], ['box', 'castIron', 0.6, 0.6, 0.6, 18.5, 11, 0],
  ];
  D.litterCup = [['cyl', 'paperCup', 0.04, 0.03, 0.1, 10, 0, 0.04, 0, H, 0.3, 0]];
  D.popcornBox = [['box', 'popcornRed', 0.1, 0.15, 0.06, 0, 0.03, 0, H, 0, 0.4], ...[0, 1, 2].map(k => ['sph', 'popcorn', 0.015, 0.1 + k * 0.03, 0.01, 0.02 * k, 6, 4])];
  D.balloonBunch = [...[[0, 0, 'balloonRed'], [0.2, 0.15, 'balloonBlue'], [-0.18, 0.2, 'balloonYellow'], [0.05, 0.35, 'balloonRed']].flatMap(([x, z, m], k) => [['sph', m, 0.16, x, 2.2 + k * 0.1, z, 12, 10, [1, 1.15, 1]], ['tube', 'cordBlack', [[0, 1.0, 0], [x * 0.5, 1.6, z * 0.5], [x, 2.04 + k * 0.1, z]], 0.003, 3, 8]])];
  D.prizeBear = [['sph', 'plushBrown', 0.14, 0, 0.14, 0, 12, 10], ['sph', 'plushBrown', 0.1, 0, 0.33, 0.02, 12, 10], ...[-1, 1].map(s => ['sph', 'plushBrown', 0.035, s * 0.07, 0.42, 0.0, 8, 6]), ['sph', 'black', 0.012, 0.03, 0.35, 0.09, 6, 4], ['sph', 'black', 0.012, -0.03, 0.35, 0.09, 6, 4]];
})(typeof window !== 'undefined' ? window : globalThis);
