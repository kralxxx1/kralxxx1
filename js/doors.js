/* Doors as joinery. Every hinged door is built from its parts instead of being one slab: stiles, rails and
   fielded panels with their mouldings, glazing with beads, a lever or knob on a rose on both faces, the
   escutcheon and keyhole, three hinge knuckles, kick plates; the frame has its jamb lining, architraves on
   both faces of the wall, a stop bead and a threshold, and steel doors carry their overhead closer.
   The style follows the kind of door and the place (a station's panelled office doors, a superintendent's
   door with his title in gold leaf on frosted glass, a fire door with wired glass, a cold-room door, a
   cottage's ledged and braced boards, a ship's teak door with a port, a projection booth's plywood door),
   and the colour, panel layout and handle vary from door to door. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, T = PB.Tex;
  const P = PB.Props, MATS = PB.Models.MATS, TEX = PB.Models.tex;
  const W = PB.World.prototype;

  // ------------------------------------------------------------ materials
  Object.assign(MATS, {
    doorPaintCream: { color: 0xcfc6ac, rough: 0.5 },
    doorPaintGreen: { color: 0x3c5546, rough: 0.48 },
    doorPaintBrown: { color: 0x5b4030, rough: 0.5 },
    doorPaintGrey: { color: 0x7d8382, rough: 0.42, metal: 0.25 },
    doorPaintRed: { color: 0x6e2620, rough: 0.48, metal: 0.15 },
    doorPaintBlue: { color: 0x2d4560, rough: 0.46 },
    doorPaintWhite: { color: 0xdcdcd4, rough: 0.45 },
    doorTeak: { color: 0x6a4428, rough: 0.4 },
    doorPly: { color: 0x9a7a52, rough: 0.7 },
    frostedGlass: { color: 0x58616a, rough: 0.9, transparent: true, opacity: 0.9 },
    wiredGlass: { tex: 'wiredGlass', color: 0x6a7274, rough: 0.82, transparent: true, opacity: 0.8 },
    brassAged: { color: 0xb08a44, rough: 0.38, metal: 0.55 },
    steelBrushed: { color: 0xb8bab8, rough: 0.42, metal: 0.5 },
    ironBlack: { color: 0x2a2826, rough: 0.6, metal: 0.35 },
    rubberSeal: { color: 0x1a1a1a, rough: 0.9 },
    keyholeDark: { color: 0x050505, rough: 0.9 },
  });
  TEX.wiredGlass = () => T.canvas('m:wiredGlass', 256, 256, (g, w, h) => {
    g.fillStyle = '#c8d2d4'; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(60,64,66,0.85)'; g.lineWidth = 1.4;
    for (let k = -h; k < w + h; k += 20) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k + h, h); g.stroke(); g.beginPath(); g.moveTo(k + h, 0); g.lineTo(k, h); g.stroke(); }
    g.fillStyle = 'rgba(255,255,255,0.05)'; for (let y = 0; y < h; y += 3) g.fillRect(0, y, w, 1);
  }, { repeat: true });
  // Gold leaf lettering on glass, the way a sign-writer did it: outlined, a little uneven
  const letterTex = (text, sub) => T.canvas('m:doorLetters:' + text + '|' + (sub || ''), 1024, 512, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.textAlign = 'center'; g.textBaseline = 'middle';
    const font = (px, wt) => `${wt || 700} ${px}px Georgia, "Times New Roman", serif`;
    let px = 120; g.font = font(px); while (g.measureText(text).width > w * 0.9 && px > 30) { px -= 4; g.font = font(px); }
    g.lineJoin = 'round'; g.lineWidth = px * 0.12; g.strokeStyle = 'rgba(20,12,4,0.9)'; g.strokeText(text, w / 2, h * 0.42);
    const grd = g.createLinearGradient(0, h * 0.3, 0, h * 0.55); grd.addColorStop(0, '#f6dc8a'); grd.addColorStop(0.5, '#c8a040'); grd.addColorStop(1, '#8a6a22');
    g.fillStyle = grd; g.fillText(text, w / 2, h * 0.42);
    if (sub) { g.font = font(Math.round(px * 0.42), 600); g.lineWidth = px * 0.05; g.strokeText(sub, w / 2, h * 0.68); g.fillStyle = '#d8b860'; g.fillText(sub, w / 2, h * 0.68); }
    // wear: a few flakes of the leaf gone
    g.globalCompositeOperation = 'destination-out';
    const r = U.rng(U.hashStr(text));
    for (let k = 0; k < 60; k++) { g.beginPath(); g.arc(r() * w, h * (0.3 + r() * 0.45), 1 + r() * 4, 0, 6.283); g.fill(); }
    g.globalCompositeOperation = 'source-over';
  });
  const plateTex = text => T.canvas('m:doorPlate:' + text, 512, 128, (g, w, h) => {
    g.fillStyle = '#b8a060'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#6a5420'; g.lineWidth = 6; g.strokeRect(6, 6, w - 12, h - 12);
    g.fillStyle = '#2a2010'; g.textAlign = 'center'; g.textBaseline = 'middle';
    let px = 64; g.font = `700 ${px}px "Courier New", monospace`; while (g.measureText(text).width > w * 0.86 && px > 18) { px -= 2; g.font = `700 ${px}px "Courier New", monospace`; }
    g.fillText(text, w / 2, h / 2 + 2);
  });

  // ------------------------------------------------------------ styles
  // Which joinery a door gets: from its own spec (door.style), else from the place and its kind
  const PALETTE = {
    depot: { wood: ['doorPaintCream', 'doorPaintGreen', 'darkWood'], metal: ['doorPaintGrey', 'doorPaintGreen'], glass: ['darkWood'] },
    ferry: { wood: ['doorTeak'], metal: ['doorPaintWhite', 'doorPaintGrey'] },
    pinewood: { wood: ['doorPly', 'doorPaintGreen'], metal: ['doorPaintGrey'] },
    mine: { wood: ['doorPaintBrown', 'doorPly'], metal: ['doorPaintGrey', 'doorPaintRed'] },
    lodge: { wood: ['darkWood', 'doorTeak'], metal: ['doorPaintWhite'] },
    village: { wood: ['doorPaintRed', 'doorPaintGreen', 'doorPaintBlue', 'doorPaintBrown'], metal: ['doorPaintGrey'] },
    train: { wood: ['doorTeak'], metal: ['doorPaintGrey'] },
    carnival: { wood: ['doorPaintRed', 'doorPaintBlue', 'doorPly'], metal: ['doorPaintGrey'] },
    lake: { wood: ['doorPaintRed', 'darkWood'], metal: ['doorPaintGrey'] },
  };
  function styleOf(door, theme, r) {
    if (door.style) return door.style;
    if (door.kind === 'glass') return 'office';
    if (door.kind === 'metal' || door.kind === 'security' || door.kind === 'exit' || door.kind === 'stair') return theme === 'lodge' ? 'cold' : theme === 'ferry' ? 'shipSteel' : 'steel';
    if (theme === 'village' || theme === 'lake') return 'plank';
    if (theme === 'ferry' || theme === 'train') return 'ship';
    if (theme === 'pinewood' || theme === 'carnival') return 'flush';
    if (theme === 'mine') return r() < 0.5 ? 'plank' : 'flush';
    return r() < 0.35 ? 'panel6' : r() < 0.7 ? 'panel4' : 'glazed';
  }

  // ------------------------------------------------------------ parts (model space: x 0..w, y 0..h, z centred)
  // A lever on a round rose, both faces; or a knob. The lever points back toward the hinge.
  function handleSpecs(out, w, t, kind, metal, key) {
    const x = w - 0.075, y = 1.0;
    for (const s of [-1, 1]) {
      const z = s * (t / 2);
      if (kind === 'knob') {
        out.push(['cyl', metal, 0.03, 0.03, 0.01, 20, x, y, z + s * 0.005, Math.PI / 2, 0, 0]);
        out.push(['cyl', metal, 0.008, 0.008, 0.045, 10, x, y, z + s * 0.03, Math.PI / 2, 0, 0]);
        out.push(['sph', metal, 0.028, x, y, z + s * 0.06, 20, 14, [1, 1, 0.8]]);
      } else {
        out.push(['cyl', metal, 0.027, 0.029, 0.01, 20, x, y, z + s * 0.005, Math.PI / 2, 0, 0]);
        out.push(['cyl', metal, 0.009, 0.009, 0.05, 10, x, y, z + s * 0.03, Math.PI / 2, 0, 0]);
        out.push(['rbox', metal, 0.12, 0.017, 0.02, 0.007, x - 0.055, y, z + s * 0.056]);
        out.push(['sph', metal, 0.011, x - 0.115, y, z + s * 0.056, 10, 8]);
      }
      if (key) {
        out.push(['rbox', metal, 0.034, 0.075, 0.004, 0.003, x, y - 0.1, z + s * 0.002]);
        out.push(['rbox', 'keyholeDark', 0.007, 0.022, 0.003, 0.0015, x, y - 0.095, z + s * 0.0045]);
        out.push(['cyl', 'keyholeDark', 0.006, 0.006, 0.003, 10, x, y - 0.083, z + s * 0.0045, Math.PI / 2, 0, 0]);
      }
    }
  }
  // Three butt hinges: the knuckles show on the hinge edge
  function hingeSpecs(out, h, t, metal) {
    for (const y of [0.24, h / 2 + 0.08, h - 0.24]) {
      out.push(['cyl', metal, 0.009, 0.009, 0.1, 12, 0.002, y, t / 2 - 0.004]);
      out.push(['cyl', metal, 0.0105, 0.0105, 0.008, 12, 0.002, y + 0.054, t / 2 - 0.004]);
      out.push(['cyl', metal, 0.0105, 0.0105, 0.008, 12, 0.002, y - 0.054, t / 2 - 0.004]);
    }
  }
  // A frame of stiles and rails with fielded panels (or glass) in the openings, both faces moulded
  function framedLeaf(out, w, h, t, mat, layout, glassMat) {
    const sw = 0.112, tr = 0.11, br = 0.21, lr = 0.16, mull = 0.1;
    out.push(['rbox', mat, sw, h, t, 0.003, sw / 2, h / 2, 0], ['rbox', mat, sw, h, t, 0.003, w - sw / 2, h / 2, 0]);
    out.push(['rbox', mat, w - 2 * sw, tr, t, 0.003, w / 2, h - tr / 2, 0], ['rbox', mat, w - 2 * sw, br, t, 0.003, w / 2, br / 2, 0]);
    const ly = 0.98;
    // rows of openings (bottom to top), each [y0, y1, cols, glass?]
    const rows = layout === 'panel6' ? [[br, ly - lr / 2, 2], [ly + lr / 2, 1.62, 2], [1.62 + lr * 0.6, h - tr, 2]]
      : layout === 'glazed' ? [[br, ly - lr / 2, 2], [ly + lr / 2, h - tr, 1, true]]
      : layout === 'office' ? [[br, 0.86, 1], [0.86 + lr, h - tr, 1, true]]
      : layout === 'panel2' ? [[br, ly - lr / 2, 1], [ly + lr / 2, h - tr, 1]]
      : [[br, ly - lr / 2, 2], [ly + lr / 2, h - tr, 2]];
    for (let k = 0; k < rows.length; k++) {
      const [y0, y1, cols, glass] = rows[k];
      // the rail above every row but the top one
      if (k < rows.length - 1) { const yr = (y1 + rows[k + 1][0]) / 2, hr = rows[k + 1][0] - y1; out.push(['rbox', mat, w - 2 * sw, hr, t, 0.003, w / 2, yr, 0]); }
      const iw = w - 2 * sw - (cols - 1) * mull, pw = iw / cols, ph = y1 - y0;
      for (let c = 0; c < cols; c++) {
        const cx = sw + pw / 2 + c * (pw + mull), cy = (y0 + y1) / 2;
        if (c < cols - 1) out.push(['rbox', mat, mull, ph, t, 0.003, cx + pw / 2 + mull / 2, cy, 0]);
        if (glass) {
          out.push(['box', glassMat, pw, ph, 0.006, cx, cy, 0]);
          for (const s of [-1, 1]) {          // glazing beads
            out.push(['box', mat, pw, 0.016, 0.014, cx, y1 - 0.008, s * 0.01], ['box', mat, pw, 0.016, 0.014, cx, y0 + 0.008, s * 0.01]);
            out.push(['box', mat, 0.016, ph, 0.014, cx - pw / 2 + 0.008, cy, s * 0.01], ['box', mat, 0.016, ph, 0.014, cx + pw / 2 - 0.008, cy, s * 0.01]);
          }
        } else {
          // the panel: thin at the edges, raised field in the middle, a bead around it on both faces
          out.push(['box', mat, pw, ph, t * 0.42, cx, cy, 0]);
          out.push(['rbox', mat, pw - 0.07, ph - 0.07, t * 0.62, 0.006, cx, cy, 0]);
          for (const s of [-1, 1]) {
            const z = s * (t * 0.21 + 0.004);
            out.push(['box', mat, pw, 0.012, 0.012, cx, y1 - 0.006, z], ['box', mat, pw, 0.012, 0.012, cx, y0 + 0.006, z]);
            out.push(['box', mat, 0.012, ph, 0.012, cx - pw / 2 + 0.006, cy, z], ['box', mat, 0.012, ph, 0.012, cx + pw / 2 - 0.006, cy, z]);
          }
        }
      }
    }
  }
  // ------------------------------------------------------------ the leaf for each style
  function leafSpecs(style, w, h, mat, r, door) {
    const out = [], t = 0.045;
    const brass = r() < 0.6 ? 'brassAged' : 'steelBrushed';
    switch (style) {
      case 'panel4': case 'panel6': case 'panel2': case 'glazed':
        framedLeaf(out, w, h, t, mat, style, 'frostedGlass');
        handleSpecs(out, w, t, r() < 0.35 ? 'knob' : 'lever', brass, true);
        hingeSpecs(out, h, t, brass);
        break;
      case 'office': {
        framedLeaf(out, w, h, t, mat, 'office', 'frostedGlass');
        handleSpecs(out, w, t, 'lever', 'brassAged', true);
        hingeSpecs(out, h, t, 'brassAged');
        // letter plate (mail slot) in the lock rail
        for (const s of [-1, 1]) out.push(['rbox', 'brassAged', 0.26, 0.05, 0.006, 0.004, w / 2, 0.93, s * (t / 2 + 0.003)]);
        out.push(['box', 'keyholeDark', 0.22, 0.02, t + 0.004, w / 2, 0.93, 0]);
        break;
      }
      case 'flush': {
        out.push(['rbox', mat, w, h, t, 0.006, w / 2, h / 2, 0]);
        // a lipped edge band and a push plate; plywood shows a little weather at the foot
        for (const s of [-1, 1]) out.push(['rbox', 'steelBrushed', 0.09, 0.3, 0.003, 0.002, w - 0.07, 1.32, s * (t / 2 + 0.002)]);
        handleSpecs(out, w, t, 'lever', 'steelBrushed', true);
        hingeSpecs(out, h, t, 'steelBrushed');
        for (const s of [-1, 1]) out.push(['box', 'doorPaintBrown', w - 0.04, 0.12, 0.002, w / 2, 0.06, s * (t / 2 + 0.001)]);
        break;
      }
      case 'steel': case 'shipSteel': {
        out.push(['rbox', mat, w, h, 0.05, 0.008, w / 2, h / 2, 0]);
        // vision panel of wired glass in a pressed steel frame
        const vw = 0.24, vh = 0.62, vx = w * 0.58, vy = 1.5;
        out.push(['box', 'wiredGlass', vw, vh, 0.008, vx, vy, 0]);
        for (const s of [-1, 1]) {
          const z = s * 0.027;
          out.push(['rbox', mat, vw + 0.05, 0.025, 0.012, 0.004, vx, vy + vh / 2 + 0.0125, z], ['rbox', mat, vw + 0.05, 0.025, 0.012, 0.004, vx, vy - vh / 2 - 0.0125, z]);
          out.push(['rbox', mat, 0.025, vh, 0.012, 0.004, vx - vw / 2 - 0.0125, vy, z], ['rbox', mat, 0.025, vh, 0.012, 0.004, vx + vw / 2 + 0.0125, vy, z]);
          out.push(['box', 'steelBrushed', w - 0.08, 0.26, 0.002, w / 2, 0.15, s * 0.0262]);      // kick plates
        }
        handleSpecs(out, w, 0.05, 'lever', 'steelBrushed', true);
        hingeSpecs(out, h, 0.05, 'ironBlack');
        if (door.plate) for (const s of [-1, 1]) out.push(['plane', 'doorPlate:' + door.plate, 0.26, 0.065, w * 0.58, 1.95, s * 0.0262, 0, s < 0 ? Math.PI : 0, 0]);
        break;
      }
      case 'cold': {
        // a cold-room door: thick, insulated, white, with a rubber seal and big strap hinges and latch
        out.push(['rbox', mat, w, h, 0.11, 0.02, w / 2, h / 2, 0]);
        for (const s of [-1, 1]) out.push(['box', 'rubberSeal', w - 0.03, h - 0.03, 0.006, w / 2, h / 2, s * 0.054]);
        for (const y of [0.35, h - 0.35]) for (const s of [-1, 1]) out.push(['rbox', 'steelBrushed', 0.34, 0.05, 0.016, 0.006, 0.17, y, s * 0.06]);
        for (const s of [-1, 1]) { out.push(['rbox', 'steelBrushed', 0.06, 0.24, 0.03, 0.01, w - 0.09, 1.05, s * 0.07]); out.push(['rbox', 'steelBrushed', 0.2, 0.04, 0.04, 0.012, w - 0.18, 1.05, s * 0.095]); }
        break;
      }
      case 'plank': {
        // vertical boards, ledged and braced (the Z faces in), a thumb latch and strap hinges in black iron
        const n = Math.max(5, Math.round(w / 0.14)), bw = w / n;
        for (let k = 0; k < n; k++) out.push(['rbox', mat, bw - 0.003, h - 0.004 - (k % 2) * 0.006, 0.032, 0.004, bw * (k + 0.5), h / 2, 0.006]);
        for (const y of [0.32, h / 2, h - 0.3]) out.push(['rbox', mat, w - 0.06, 0.13, 0.03, 0.004, w / 2, y, -0.025]);
        for (const [y0, y1] of [[0.32, h / 2], [h / 2, h - 0.3]]) {
          const len = Math.hypot(w - 0.22, y1 - y0), ang = Math.atan2(y1 - y0, w - 0.22);
          out.push(['rbox', mat, len, 0.11, 0.028, 0.004, w / 2, (y0 + y1) / 2, -0.025, 0, 0, ang]);
        }
        for (const y of [0.32, h - 0.3]) out.push(['rbox', 'ironBlack', 0.62, 0.035, 0.006, 0.003, 0.31, y, 0.025], ['cyl', 'ironBlack', 0.012, 0.012, 0.11, 10, 0.002, y, 0.02]);
        out.push(['rbox', 'ironBlack', 0.03, 0.2, 0.01, 0.004, w - 0.1, 1.05, 0.03], ['rbox', 'ironBlack', 0.025, 0.018, 0.05, 0.004, w - 0.1, 1.17, 0.045]);
        out.push(['rbox', 'ironBlack', 0.16, 0.012, 0.012, 0.004, w - 0.1, 1.15, -0.04], ['rbox', 'ironBlack', 0.024, 0.11, 0.008, 0.003, w - 0.06, 1.15, -0.044]);
        break;
      }
      case 'ship': {
        // a ship's teak door: framed, a round brass-ringed port high up, coaming plate at the foot
        framedLeaf(out, w, h, t, mat, 'panel2', 'frostedGlass');
        const py = h - 0.45;
        out.push(['cyl', 'glass', 0.16, 0.16, 0.012, 24, w / 2, py, 0, Math.PI / 2, 0, 0]);
        for (const s of [-1, 1]) out.push(['torus', 'brassAged', 0.17, 0.018, 28, Math.PI * 2, w / 2, py, s * 0.026, 0, 0, 0]);
        for (const s of [-1, 1]) out.push(['box', 'brassAged', w - 0.04, 0.12, 0.003, w / 2, 0.07, s * (t / 2 + 0.002)]);
        handleSpecs(out, w, t, 'lever', 'brassAged', true);
        hingeSpecs(out, h, t, 'brassAged');
        break;
      }
      default:
        out.push(['rbox', mat, w, h, t, 0.005, w / 2, h / 2, 0]);
        handleSpecs(out, w, t, 'lever', 'steelBrushed', false);
        hingeSpecs(out, h, t, 'steelBrushed');
    }
    return out;
  }

  // ------------------------------------------------------------ motion and sound
  // What a door sounds like follows its joinery; how long it takes to swing follows its weight (the sounds
  // in sfx3.js are timed to these, so the slam lands when the leaf does)
  const SOUND_KIND = { panel4: 'Panel', panel6: 'Panel', panel2: 'Panel', glazed: 'Glazed', office: 'Glazed', flush: 'Flush', plank: 'Plank', ship: 'Ship', steel: 'Steel', shipSteel: 'Steel', cold: 'Cold' };
  PB.DoorTiming = {
    Panel: { open: 0.9, close: 0.62 }, Glazed: { open: 0.9, close: 0.62 }, Flush: { open: 0.8, close: 0.55 }, Plank: { open: 1.0, close: 0.7 },
    Ship: { open: 1.0, close: 0.72 }, Steel: { open: 1.2, close: 1.35 }, Cold: { open: 1.35, close: 0.9 }, Gate: { open: 1.2, close: 0.85 },
  };
  // How many of a place's doors have a dry hinge
  const CREAKY = { village: 0.75, lake: 0.7, mine: 0.65, carnival: 0.55, lodge: 0.5, pinewood: 0.5, ferry: 0.45, under: 0.4, depot: 0.35, train: 0.3 };
  W.doorSound = function (id) {
    const o = this.doorObjs.get(id);
    if (!o) return null;
    if (!o.sound) {
      const d = o.door, metal = d.kind === 'metal' || d.kind === 'security' || d.kind === 'exit' || d.kind === 'stair';
      const kind = SOUND_KIND[o.style] || (d.kind === 'bars' ? 'Gate' : metal ? 'Steel' : d.kind === 'glass' ? 'Glazed' : 'Panel');
      const r = U.rng(U.hashStr((d.id || d.x + ',' + d.y) + ':hinge'));
      o.sound = { kind, creak: d.creak != null ? !!d.creak : r() < (CREAKY[this.L.theme] != null ? CREAKY[this.L.theme] : 0.4) };
    }
    return o.sound;
  };

  // ------------------------------------------------------------ building
  // Plates and lettering are planes with their own texture: give them materials on the fly
  const matFor = (world, name) => {
    if (name.startsWith('doorPlate:')) {
      const k = name, text = name.slice(10);
      if (!world.mats.has(k)) { const m = new THREE.MeshStandardMaterial({ map: plateTex(text), roughness: 0.35, metalness: 0.7 }); world.patch(m); world.mats.set(k, m); }
      return world.mats.get(k);
    }
    return world.mat(name);
  };
  W.doorLeaf = function (door, w, h) {
    const theme = this.L.theme, r = U.rng(U.hashStr(door.id || (door.x + ',' + door.y)) + 17);
    const style = styleOf(door, theme, r);
    const pal = (PALETTE[theme] || PALETTE.depot)[door.kind === 'glass' ? 'glass' : (door.kind === 'metal' || door.kind === 'security' || door.kind === 'exit') ? 'metal' : 'wood'] || ['darkWood'];
    const mat = door.color || pal[Math.floor(r() * pal.length)];
    // the leaf sits inside the lining: 35 mm of jamb on each side, the head above, a gap at the floor
    const wl = w - 0.07, hl = h - 0.045;
    const specs = leafSpecs(style, wl, hl, mat, r, door);
    const key = 'doorLeaf:' + theme + ':' + (door.id || door.x + ',' + door.y) + ':' + style + ':' + mat + ':' + w.toFixed(2) + 'x' + h.toFixed(2);
    const g = new THREE.Group();
    for (const part of P.build(key, specs)) {
      const m = new THREE.Mesh(part.geo, matFor(this, part.mat));
      m.position.set(-wl / 2, -hl / 2 - 0.0125, 0); m.castShadow = true; m.receiveShadow = true;
      g.add(m);
    }
    // gold leaf on the frosted glass, read the right way round from the corridor (reversed from inside)
    if (door.letter) {
      const lm = this.mats.get('letters:' + door.letter) || (() => { const m = new THREE.MeshStandardMaterial({ map: letterTex(door.letter, door.letterSub), transparent: true, alphaTest: 0.08, roughness: 0.4, metalness: 0.3, depthWrite: false }); this.patch(m); this.mats.set('letters:' + door.letter, m); return m; })();
      for (const s of [-1, 1]) {
        const pl = new THREE.Mesh(new THREE.PlaneGeometry(wl * 0.66, wl * 0.33), lm);
        pl.position.set(0, -hl / 2 - 0.0125 + 1.62, s * 0.0045); if (s < 0) pl.rotation.y = Math.PI;
        pl.renderOrder = 2; g.add(pl);
      }
    }
    g.userData.hasHandles = true;
    g.userData.style = style;
    return g;
  };
  // The frame: jamb lining through the wall, architraves on both faces, a head with a little cornice on
  // panelled doors, a stop bead, a threshold; steel doors get a pressed steel frame and an overhead closer
  W.doorFrame = function (door, g, w, h, grp, style) {
    const steel = style === 'steel' || style === 'shipSteel' || style === 'cold';
    const r = U.rng(U.hashStr((door.id || '') + 'f') + 3);
    const fm = steel ? (style === 'cold' ? 'steelBrushed' : 'doorPaintGrey') : style === 'plank' ? 'darkWood' : style === 'office' || style === 'ship' ? 'darkWood' : r() < 0.5 ? 'doorPaintCream' : 'darkWood';
    // the opening is w x h in a wall 0.2 thick; the lining fills its edges, the architraves sit on the faces
    const specs = [], jd = 0.22, cw = steel ? 0.05 : 0.075, ct = 0.022, lw = 0.035;
    specs.push(['box', fm, lw, h, jd, -w / 2 + lw / 2, h / 2, 0], ['box', fm, lw, h, jd, w / 2 - lw / 2, h / 2, 0]);
    specs.push(['box', fm, w, lw, jd, 0, h - lw / 2, 0]);
    // stop beads (the leaf closes against them), behind the leaf
    specs.push(['box', fm, 0.014, h - lw, 0.035, -w / 2 + lw + 0.007, (h - lw) / 2, -0.04], ['box', fm, 0.014, h - lw, 0.035, w / 2 - lw - 0.007, (h - lw) / 2, -0.04], ['box', fm, w - 2 * lw, 0.014, 0.035, 0, h - lw - 0.007, -0.04]);
    for (const s of [-1, 1]) {
      const z = s * (0.1 + ct / 2 + 0.001);
      specs.push(['rbox', fm, cw, h + cw, ct, 0.004, -w / 2 - cw / 2 + 0.004, (h + cw) / 2, z]);
      specs.push(['rbox', fm, cw, h + cw, ct, 0.004, w / 2 + cw / 2 - 0.004, (h + cw) / 2, z]);
      specs.push(['rbox', fm, w + cw * 2 - 0.008, cw, ct, 0.004, 0, h + cw / 2, z]);
      if (!steel && style !== 'plank') {
        specs.push(['rbox', fm, w + cw * 2 + 0.05, 0.03, ct + 0.02, 0.006, 0, h + cw + 0.015, z + s * 0.01]);   // cornice
        specs.push(['box', fm, cw + 0.012, 0.16, ct + 0.006, -w / 2 - cw / 2 + 0.004, 0.08, z + s * 0.003], ['box', fm, cw + 0.012, 0.16, ct + 0.006, w / 2 + cw / 2 - 0.004, 0.08, z + s * 0.003]);   // plinth blocks
      }
    }
    specs.push(['rbox', steel ? 'steelBrushed' : 'darkWood', w - 2 * lw, 0.012, jd, 0.004, 0, 0.006, 0]);   // threshold
    // overhead closer on the push face of steel doors
    if (steel && style !== 'cold') specs.push(['rbox', 'doorPaintGrey', 0.32, 0.065, 0.06, 0.008, w / 2 - 0.3, h + 0.12, 0.1 + 0.03], ['cyl', 'ironBlack', 0.012, 0.012, 0.04, 10, w / 2 - 0.16, h + 0.08, 0.1 + 0.05]);
    if (style === 'cold') for (const s of [-1, 1]) specs.push(['rbox', 'steelBrushed', 0.06, 0.3, 0.03, 0.01, s * (w / 2 - lw / 2), 1.05, 0.1 + 0.015]);
    const key = 'doorFrame:' + style + ':' + fm + ':' + w.toFixed(2) + 'x' + h.toFixed(2);
    for (const part of P.build(key, specs)) {
      const m = new THREE.Mesh(part.geo, matFor(this, part.mat));
      m.castShadow = true; m.receiveShadow = true;
      grp.add(m);
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
