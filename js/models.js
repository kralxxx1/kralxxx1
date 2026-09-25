/* Detailed model library.
   Adds shape kinds to the prop builder (rounded boxes, lathes, extrusions with separate edge
   material, tubes, capsules, discs) and replaces the simple prop definitions with detailed ones.
   Shape spec formats (after [kind, material]):
     rbox:  w, h, d, radius, x, y, z, rx, ry, rz, seg
     lathe: [[r, y], ...], segments, x, y, z, rx, ry, rz, [sx, sy, sz], phiStart, phiLength
     ext:   [[x, y], ...], depth, bevel, x, y, z, rx, ry, rz, edgeMaterial, holes
     tube:  [[x, y, z], ...], radius, radialSegments, tubularSegments, closed
     cap:   radius, length, x, y, z, rx, ry, rz
     disc:  radius, x, y, z, rx, ry, rz, segments
     ring:  inner, outer, x, y, z, rx, ry, rz, segments
     rcyl:  radius, height, edgeRadius, segments, x, y, z, rx, ry, rz  (cylinder with rounded rims) */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const P = PB.Props, D = P.DEFS, U = PB.U;
  const PI = Math.PI, H = PI / 2;
  const V2 = (x, y) => new THREE.Vector2(x, y);
  const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

  // ------------------------------------------------------------ GEOMETRY
  function roundedBox(w, h, d, r, seg = 2) {
    r = Math.max(0.0005, Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4, d / 2 - 1e-4));
    const S = seg * 2 + 1;
    const g = new THREE.BoxGeometry(2, 2, 2, S, S, S);
    const pos = g.attributes.position, nor = g.attributes.normal, uv = g.attributes.uv;
    const half = [w / 2 - r, h / 2 - r, d / 2 - r], dims = [w, h, d];
    const c = [0, 0, 0], dir = [0, 0, 0];
    for (let i = 0; i < pos.count; i++) {
      c[0] = pos.getX(i); c[1] = pos.getY(i); c[2] = pos.getZ(i);
      const fn = [nor.getX(i), nor.getY(i), nor.getZ(i)];
      const inner = [0, 0, 0];
      for (let k = 0; k < 3; k++) {
        const idx = Math.round((c[k] + 1) / 2 * S);
        let al, s;
        if (idx <= seg) { al = (seg - idx) / seg; s = -1; } else { al = (idx - seg - 1) / seg; s = 1; }
        dir[k] = s * Math.tan(Math.max(0, al) * PI / 4);
        inner[k] = s * half[k];
      }
      const L = Math.hypot(dir[0], dir[1], dir[2]) || 1;
      const nx = dir[0] / L, ny = dir[1] / L, nz = dir[2] / L;
      pos.setXYZ(i, inner[0] + nx * r, inner[1] + ny * r, inner[2] + nz * r);
      nor.setXYZ(i, nx, ny, nz);
      // UVs in meters so tiling textures keep their scale
      const ax = Math.abs(fn[0]) > 0.5 ? 0 : Math.abs(fn[1]) > 0.5 ? 1 : 2;
      const [ua, va] = ax === 0 ? [2, 1] : ax === 1 ? [0, 2] : [0, 1];
      uv.setXY(i, uv.getX(i) * dims[ua], uv.getY(i) * dims[va]);
    }
    return g;
  }
  // Extrusion UVs: caps normalized to the shape bounds, walls in meters
  function uvGen(minX, minY, spanX, spanY) {
    return {
      generateTopUV(geo, v, a, b, c) {
        const f = i => V2((v[i * 3] - minX) / spanX, (v[i * 3 + 1] - minY) / spanY);
        return [f(a), f(b), f(c)];
      },
      generateSideWallUV(geo, v, a, b, c, d) {
        const ax = v[a * 3], ay = v[a * 3 + 1], az = v[a * 3 + 2], bx = v[b * 3], by = v[b * 3 + 1], bz = v[b * 3 + 2];
        const cx = v[c * 3], cy = v[c * 3 + 1], cz = v[c * 3 + 2], dx = v[d * 3], dy = v[d * 3 + 1], dz = v[d * 3 + 2];
        if (Math.abs(ay - by) < Math.abs(ax - bx)) return [V2(ax, 1 - az), V2(bx, 1 - bz), V2(cx, 1 - cz), V2(dx, 1 - dz)];
        return [V2(ay, 1 - az), V2(by, 1 - bz), V2(cy, 1 - cz), V2(dy, 1 - dz)];
      },
    };
  }
  function shapeOf(pts) {
    const sh = new THREE.Shape();
    pts.forEach((p, i) => {
      if (p.length > 2 && p[2] === 'q') sh.quadraticCurveTo(p[3], p[4], p[0], p[1]);
      else if (i === 0) sh.moveTo(p[0], p[1]); else sh.lineTo(p[0], p[1]);
    });
    return sh;
  }
  // Rounded rectangle outline as points (for panels, doors, bezels)
  function rrect(w, h, r, cx = 0, cy = 0, seg = 4) {
    const out = [];
    const corner = (x, y, a0) => { for (let k = 0; k <= seg; k++) { const a = a0 + k / seg * H; out.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); } };
    corner(cx + w / 2 - r, cy - h / 2 + r, -H);
    corner(cx + w / 2 - r, cy + h / 2 - r, 0);
    corner(cx - w / 2 + r, cy + h / 2 - r, H);
    corner(cx - w / 2 + r, cy - h / 2 + r, PI);
    return out;
  }
  function splitGroups(g) {
    if (!g.groups.length) return [g];
    const out = [];
    const src = g.index ? g.toNonIndexed() : g;
    for (const grp of g.groups) {
      const ng = new THREE.BufferGeometry();
      for (const name of ['position', 'normal', 'uv']) {
        const at = src.attributes[name];
        ng.setAttribute(name, new THREE.BufferAttribute(at.array.slice(grp.start * at.itemSize, (grp.start + grp.count) * at.itemSize), at.itemSize));
      }
      out[grp.materialIndex] = ng;
    }
    return out;
  }
  const R3 = (a, i) => [a[i] || 0, a[i + 1] || 0, a[i + 2] || 0];
  Object.assign(P.shapes, {
    rbox: a => ({ g: roundedBox(a[0], a[1], a[2], a[3], a[10] || 2), pos: R3(a, 4), rot: R3(a, 7) }),
    lathe: a => {
      const pts = a[0].map(p => V2(Math.max(0, p[0]), p[1]));
      const g = new THREE.LatheGeometry(pts, a[1] || 24, a[9] || 0, a[10] || PI * 2);
      return { g, pos: R3(a, 2), rot: R3(a, 5), scl: a[8] || [1, 1, 1] };
    },
    ext: a => {
      const sh = shapeOf(a[0]);
      if (a[10]) for (const hole of a[10]) sh.holes.push(shapeOf(hole));
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of a[0]) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]); }
      const bevel = a[2] || 0;
      const g = new THREE.ExtrudeGeometry(sh, { depth: a[1], bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 8, UVGenerator: uvGen(minX, minY, maxX - minX || 1, maxY - minY || 1) });
      g.translate(0, 0, -a[1] / 2);
      const [caps, walls] = splitGroups(g);
      g.dispose();
      // Mirror the back cap's UVs so art and text read correctly from both sides
      { const n = caps.attributes.normal, uv = caps.attributes.uv; for (let i = 0; i < n.count; i++) if (n.getZ(i) < -0.5) uv.setX(i, 1 - uv.getX(i)); }
      const res = { g: caps, pos: R3(a, 3), rot: R3(a, 6) };
      if (walls) res.extra = [[a[9] || null, walls]];
      return res;
    },
    tube: a => {
      const curve = new THREE.CatmullRomCurve3(a[0].map(p => V3(p[0], p[1], p[2])), !!a[4], 'catmullrom', 0.5);
      return { g: new THREE.TubeGeometry(curve, a[3] || Math.max(8, a[0].length * 6), a[1], a[2] || 8, !!a[4]) };
    },
    cap: a => ({ g: new THREE.CapsuleGeometry(a[0], a[1], 4, 12), pos: R3(a, 2), rot: R3(a, 5) }),
    disc: a => ({ g: new THREE.CircleGeometry(a[0], a[7] || 24), pos: R3(a, 1), rot: R3(a, 4) }),
    ring: a => ({ g: new THREE.RingGeometry(a[0], a[1], a[8] || 32), pos: R3(a, 2), rot: R3(a, 5) }),
    rcyl: a => {
      const r = a[0], h = a[1], e = Math.min(a[2], r * 0.9, h / 2), n = 4, pts = [[0, -h / 2]];
      for (let k = 0; k <= n; k++) { const t = -H + k / n * H; pts.push([r - e + Math.cos(t) * e, -h / 2 + e + Math.sin(t) * e]); }
      for (let k = 0; k <= n; k++) { const t = k / n * H; pts.push([r - e + Math.cos(t) * e, h / 2 - e + Math.sin(t) * e]); }
      pts.push([0, h / 2]);
      return { g: new THREE.LatheGeometry(pts.map(p => V2(p[0], p[1])), a[3] || 24), pos: R3(a, 4), rot: R3(a, 7) };
    },
  });
  const M = PB.Models = { roundedBox, rrect, shapeOf };

  // Helpers that expand into several specs
  // Rectangular frame of four bars (w x h outer, bar thickness t, depth d) in the XY plane
  M.frame = (mat, w, h, t, d, x, y, z, rx = 0, ry = 0, r = 0.004) => {
    const out = [];
    const c = Math.cos(rx), s = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
    const at = (lx, ly) => { const y1 = ly * c, z1 = ly * s; return [x + lx * cy + z1 * sy, y + y1, z - lx * sy + z1 * cy]; };
    const bars = [[0, h / 2 - t / 2, w, t], [0, -h / 2 + t / 2, w, t], [-w / 2 + t / 2, 0, t, h - 2 * t], [w / 2 - t / 2, 0, t, h - 2 * t]];
    for (const [bx, by, bw, bh] of bars) { const p = at(bx, by); out.push(['rbox', mat, bw, bh, d, r, p[0], p[1], p[2], rx, ry, 0]); }
    return out;
  };

  // ------------------------------------------------------------ TEXTURES
  const T = PB.Tex;
  const SIDE_NAMES = { galaksi: 'GALAXY', kurbaga: 'FROG ROAD', tugla: 'BRICKS', yilan: 'SNAKE', uzay: 'INVADERS', yaris: 'RACER', dovus: 'BRAWL', tetris: 'BLOCKS', classic: 'PACMAN', special: '???' };
  M.tex = {
    // Speaker grille: perforated black steel
    grille: () => T.canvas('m:grille', 128, 128, (g, w, h) => {
      g.fillStyle = '#16161a'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#020203';
      for (let y = 4; y < h; y += 8) for (let x = (y / 8) % 2 ? 8 : 4; x < w; x += 8) { g.beginPath(); g.arc(x, y, 2.4, 0, PI * 2); g.fill(); }
    }, { repeat: true }),
    // Prismatic acrylic diffuser of a 2x4 troffer with the two tube glows behind it and dead bugs
    troffer: (key = 'a', dead = 0) => T.canvas('m:troffer:' + key + dead, 512, 256, (g, w, h) => {
      const r = U.rng(U.hashStr(key) + dead * 7);
      g.fillStyle = '#b8b4a6'; g.fillRect(0, 0, w, h);
      for (const ty of [0.3, 0.7]) {
        const k = dead && ty > 0.5 ? 0.25 : 1;
        const grd = g.createLinearGradient(0, ty * h - h * 0.3, 0, ty * h + h * 0.3);
        grd.addColorStop(0, 'rgba(255,255,250,0)'); grd.addColorStop(0.5, `rgba(255,255,248,${0.95 * k})`); grd.addColorStop(1, 'rgba(255,255,250,0)');
        g.fillStyle = grd; g.fillRect(0, 0, w, h);
      }
      // End caps of the tubes are darker
      const e = g.createLinearGradient(0, 0, w, 0);
      e.addColorStop(0, 'rgba(90,80,60,0.55)'); e.addColorStop(0.07, 'rgba(90,80,60,0)'); e.addColorStop(0.93, 'rgba(90,80,60,0)'); e.addColorStop(1, 'rgba(90,80,60,0.55)');
      g.fillStyle = e; g.fillRect(0, 0, w, h);
      // Prismatic dots
      g.fillStyle = 'rgba(255,255,255,0.18)';
      for (let y = 0; y < h; y += 4) for (let x = (y / 4) % 2 ? 0 : 2; x < w; x += 4) g.fillRect(x, y, 1.5, 1.5);
      g.fillStyle = 'rgba(0,0,0,0.08)';
      for (let y = 2; y < h; y += 4) for (let x = (y / 4) % 2 ? 2 : 0; x < w; x += 4) g.fillRect(x, y, 1, 1);
      // Yellowing and dust towards one corner
      const s = g.createRadialGradient(w * r.range(0.1, 0.9), h * r.range(0.1, 0.9), 10, w / 2, h / 2, w * 0.7);
      s.addColorStop(0, 'rgba(160,120,40,0.25)'); s.addColorStop(1, 'rgba(160,120,40,0)');
      g.fillStyle = s; g.fillRect(0, 0, w, h);
      // Dead insects collected in the lens
      g.fillStyle = 'rgba(20,15,10,0.8)';
      const cx = w * r.range(0.15, 0.85), cy = h * r.range(0.6, 0.9);
      for (let k = 0; k < 14; k++) { const x = cx + r.range(-40, 40), y = cy + r.range(-12, 12); g.beginPath(); g.ellipse(x, y, r.range(1.5, 4), r.range(0.8, 1.6), r() * PI, 0, PI * 2); g.fill(); }
    }),
    // Opal glass of a round fixture / bulb
    opal: () => T.canvas('m:opal', 128, 128, (g, w, h) => {
      const grd = g.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
      grd.addColorStop(0, '#ffffff'); grd.addColorStop(0.7, '#e8e4dc'); grd.addColorStop(1, '#9a968e');
      g.fillStyle = grd; g.fillRect(0, 0, w, h);
    }),
    // Cabinet side art: a big diagonal color sweep and the game logo
    side: game => T.canvas('m:side:' + game, 512, 1024, (g, w, h) => {
      const r = U.rng(U.hashStr(game) + 3);
      const hue = Math.floor(r() * 360);
      g.fillStyle = '#0b0b10'; g.fillRect(0, 0, w, h);
      const grd = g.createLinearGradient(0, h, w, 0);
      grd.addColorStop(0, `hsl(${hue},80%,35%)`); grd.addColorStop(0.5, `hsl(${(hue + 40) % 360},85%,50%)`); grd.addColorStop(1, `hsl(${(hue + 80) % 360},80%,30%)`);
      g.fillStyle = grd;
      g.beginPath(); g.moveTo(0, h * 0.95); g.lineTo(w, h * 0.35); g.lineTo(w, h * 0.62); g.lineTo(0, h); g.closePath(); g.fill();
      g.globalAlpha = 0.85;
      for (let k = 0; k < 5; k++) { g.fillStyle = `hsl(${(hue + k * 30) % 360},90%,${45 + k * 5}%)`; g.beginPath(); g.arc(r.range(0.2, 0.8) * w, r.range(0.2, 0.5) * h, r.range(20, 70), 0, PI * 2); g.fill(); }
      g.globalAlpha = 1;
      const name = SIDE_NAMES[game] || game.toUpperCase();
      g.save(); g.translate(w * 0.5, h * 0.55); g.rotate(-0.55);
      g.font = `bold ${name.length > 7 ? 46 : 60}px ${T.FONTS.FONT_PIX}`; g.textAlign = 'center';
      g.fillStyle = '#000'; g.fillText(name, 4, 4);
      g.fillStyle = '#fff'; g.fillText(name, 0, 0);
      g.restore();
      // Wear: scuffs near the bottom and edges
      g.fillStyle = 'rgba(0,0,0,0.35)';
      for (let k = 0; k < 160; k++) g.fillRect(r() * w, h * 0.85 + r() * h * 0.15, r.range(2, 12), 1);
    }),
    // Control panel overlay with player markings
    panel: game => T.canvas('m:cp:' + game, 512, 256, (g, w, h) => {
      const r = U.rng(U.hashStr(game) + 11), hue = Math.floor(r() * 360);
      g.fillStyle = `hsl(${hue},60%,18%)`; g.fillRect(0, 0, w, h);
      g.strokeStyle = `hsl(${(hue + 40) % 360},90%,60%)`; g.lineWidth = 6;
      for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(0, h * (0.2 + k * 0.2)); g.bezierCurveTo(w * 0.3, h * (0.1 + k * 0.2), w * 0.6, h * (0.4 + k * 0.15), w, h * (0.25 + k * 0.2)); g.stroke(); }
      g.fillStyle = '#fff'; g.font = `18px ${T.FONTS.FONT_PIX}`; g.fillText('1 PLAYER', 20, h - 18); g.fillText('2 PLAYERS', w - 190, h - 18);
      g.fillStyle = 'rgba(0,0,0,0.3)'; for (let k = 0; k < 90; k++) g.fillRect(r() * w, r() * h, r.range(2, 20), 1);
    }),
    // Drawer front with a routed border
    drawer: () => T.canvas('m:drawer', 256, 128, (g, w, h) => {
      g.fillStyle = '#6b4a2e'; g.fillRect(0, 0, w, h);
      g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 3; g.strokeRect(10, 10, w - 20, h - 20);
      g.strokeStyle = 'rgba(255,220,180,0.12)'; g.lineWidth = 1; g.strokeRect(13, 13, w - 26, h - 26);
    }),
    // Instruction card of a coin door
    coinCard: () => T.canvas('m:coin', 128, 64, (g, w, h) => {
      g.fillStyle = '#e8e0c8'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#b01010'; g.font = `bold 13px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center';
      g.fillText('25¢', w / 2, 20); g.fillStyle = '#222'; g.font = `10px ${T.FONTS.FONT_TYPE}`; g.fillText('INSERT COIN', w / 2, 38); g.fillText('1 CREDIT', w / 2, 52);
    }),
    // Paper stack side, calendar, notices
    calendar: () => T.canvas('m:cal', 256, 320, (g, w, h) => {
      g.fillStyle = '#f1ecdc'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#9c1c1c'; g.fillRect(0, 0, w, 60);
      g.fillStyle = '#fff'; g.font = `bold 34px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText('OCTOBER 1994', w / 2, 42);
      g.fillStyle = '#222'; g.font = `18px ${T.FONTS.FONT_TYPE}`;
      let d = 1;
      for (let row = 0; row < 5; row++) for (let col = 0; col < 7; col++) { if (row === 0 && col < 6) continue; if (d > 31) break; g.fillText(String(d), 22 + col * 35, 100 + row * 44); if (d === 21) { g.strokeStyle = '#c01818'; g.lineWidth = 3; g.beginPath(); g.arc(22 + col * 35, 94 + row * 44, 16, 0, PI * 2); g.stroke(); } d++; }
    }),
    perforated: () => T.canvas('m:perf', 64, 512, (g, w, h) => {
      g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#101216';
      for (let y = 8; y < h; y += 24) { g.fillRect(14, y, 8, 14); g.fillRect(42, y, 8, 14); }
    }, { repeat: true }),
    wire: () => T.canvas('m:wire', 256, 256, (g, w, h) => {
      g.clearRect(0, 0, w, h); g.fillStyle = '#fff';
      for (let x = 0; x < w; x += 16) g.fillRect(x, 0, 3, h);
      for (let y = 0; y < h; y += 64) g.fillRect(0, y, w, 4);
    }, { repeat: true }),
    tileWall: () => T.canvas('m:tilewall', 256, 256, (g, w, h) => {
      g.fillStyle = '#a8aca6'; g.fillRect(0, 0, w, h);
      for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { const v = 222 + ((x * 7 + y * 3) % 5) * 4; g.fillStyle = `rgb(${v},${v + 2},${v - 4})`; g.fillRect(x * 64 + 2, y * 64 + 2, 60, 60); }
    }, { repeat: true }),
  };

  // ------------------------------------------------------------ MODELS
  // Classic upright arcade cabinet. Front is +z, footprint x ±0.37, z -0.40..0.44.
  const SIDE = [[-0.40, 0], [0.33, 0], [0.33, 0.86], [0.44, 0.92], [0.44, 1.0], [0.17, 1.08], [0.07, 1.6], [0.16, 1.64], [0.18, 1.9], [0.05, 1.93], [-0.40, 1.93]];
  const cab = [];
  // Side panels (profile in the YZ plane, extruded along x) with T-molding edges
  const sidePts = SIDE;
  for (const sx of [-0.355, 0.355]) cab.push(['ext', 'cabinetSide', sidePts, 0.018, 0.002, sx, 0, 0, 0, -H, 0, 'tmold']);
  const IW = 0.69;
  cab.push(
    // Back and top
    ['box', 'cabinetBody', IW, 1.9, 0.02, 0, 0.95, -0.39],
    ['box', 'cabinetBody', IW, 0.02, 0.45, 0, 1.92, -0.17],
    ['box', 'cabinetBody', IW, 0.02, 0.14, 0, 1.905, 0.115],
    ['box', 'cabinetBody', IW, 0.02, 0.11, 0, 0.86, 0.38],
    // Kick plate and coin door frame
    ['box', 'cabinetBody', IW, 0.86, 0.02, 0, 0.43, 0.32],
    ['box', 'kick', IW - 0.01, 0.1, 0.012, 0, 0.05, 0.333],
    ['rbox', 'coinDoor', 0.34, 0.4, 0.02, 0.006, 0, 0.44, 0.338],
    ['rbox', 'coinDoor', 0.3, 0.12, 0.012, 0.004, 0, 0.18, 0.338],
    ['box', 'socket', 0.012, 0.05, 0.006, -0.07, 0.56, 0.35], ['box', 'socket', 0.012, 0.05, 0.006, 0.07, 0.56, 0.35],
    ['rbox', 'coinSlot', 0.045, 0.075, 0.012, 0.004, -0.07, 0.56, 0.346], ['rbox', 'coinSlot', 0.045, 0.075, 0.012, 0.004, 0.07, 0.56, 0.346],
    ['rbox', 'chrome', 0.05, 0.05, 0.02, 0.006, -0.07, 0.44, 0.35], ['rbox', 'chrome', 0.05, 0.05, 0.02, 0.006, 0.07, 0.44, 0.35],
    ['cyl', 'chrome', 0.014, 0.014, 0.02, 12, 0.12, 0.33, 0.352, H],
    ['plane', 'coinCard', 0.11, 0.055, 0, 0.36, 0.3491],
    // Control panel (tilted towards the player) with overlay, joystick and buttons
    ['rbox', 'cabinetBody', IW + 0.02, 0.07, 0.3, 0.01, 0, 1.0, 0.3, 0.29],
    ['box', 'cabinetBody', IW, 0.14, 0.02, 0, 0.9, 0.43],
    ['plane', 'cpArt', IW - 0.02, 0.28, 0, 1.037, 0.31, 0.29 - H],
    ['cyl', 'blackPlastic', 0.03, 0.03, 0.006, 20, -0.15, 1.03, 0.33, 0.29],
    ['cyl', 'chrome', 0.006, 0.006, 0.08, 8, -0.15, 1.075, 0.342, 0.29],
    ['sph', 'redPlastic', 0.022, -0.15, 1.115, 0.353],
    ['rcyl', 'redPlastic', 0.017, 0.022, 0.005, 16, 0.06, 1.045, 0.31, 0.29], ['torus', 'blackPlastic', 0.019, 0.004, 16, 0, 0.06, 1.036, 0.308, 0.29 - H],
    ['rcyl', 'yellowPlastic', 0.017, 0.022, 0.005, 16, 0.13, 1.045, 0.31, 0.29], ['torus', 'blackPlastic', 0.019, 0.004, 16, 0, 0.13, 1.036, 0.308, 0.29 - H],
    ['rcyl', 'whitePlastic', 0.011, 0.016, 0.004, 12, -0.02, 1.062, 0.25, 0.29], ['rcyl', 'whitePlastic', 0.011, 0.016, 0.004, 12, 0.22, 1.02, 0.39, 0.29],
    // Monitor bezel (tilted back) with a screen recess
    ...M.frame('bezel', IW, 0.54, 0.07, 0.03, 0, 1.34, 0.115, -0.2),
    ['box', 'bezel', IW, 0.54, 0.01, 0, 1.335, 0.085, -0.2],
    // Marquee light box and speaker grille
    ['box', 'cabinetBody', IW, 0.03, 0.2, 0, 1.64, 0.07],
    ['box', 'grille', IW - 0.06, 0.035, 0.005, 0, 1.617, 0.162],
    ['rbox', 'chrome', IW, 0.012, 0.012, 0.004, 0, 1.66, 0.165], ['rbox', 'chrome', IW, 0.012, 0.012, 0.004, 0, 1.895, 0.185],
    // Feet
    ['cyl', 'rubber', 0.025, 0.03, 0.02, 12, -0.3, 0.01, 0.28], ['cyl', 'rubber', 0.025, 0.03, 0.02, 12, 0.3, 0.01, 0.28],
    ['cyl', 'rubber', 0.025, 0.03, 0.02, 12, -0.3, 0.01, -0.34], ['cyl', 'rubber', 0.025, 0.03, 0.02, 12, 0.3, 0.01, -0.34],
    // Power cord to the floor at the back
    ['tube', 'blackPlastic', [[0.2, 0.3, -0.4], [0.22, 0.12, -0.45], [0.3, 0.012, -0.5], [0.5, 0.012, -0.52]], 0.006, 6],
  );
  D.cabinetBody = cab;
  D.cabinetScreen = [['plane', 'screen', 0.56, 0.42, 0, 1.335, 0.091, -0.2]];
  D.cabinetMarquee = [['plane', 'marquee', 0.66, 0.2, 0, 1.775, 0.176, 0.085]];
  D.specialCabinet = D.freeCabinet = D.cabinetBody;

  // --- Air hockey table
  D.airhockey = [
    ['rbox', 'whitePlastic', 2.2, 0.08, 1.2, 0.02, 0, 0.78, 0],
    ['box', 'airTable', 2.02, 0.005, 1.02, 0, 0.823, 0],
    ...[[0, 0.56, 2.2, 0.08], [0, -0.56, 2.2, 0.08]].map(([x, z, w, d]) => ['rbox', 'redPlastic', w, 0.08, d, 0.02, x, 0.86, z]),
    ['rbox', 'redPlastic', 0.08, 0.08, 0.34, 0.02, -1.06, 0.86, 0.36], ['rbox', 'redPlastic', 0.08, 0.08, 0.34, 0.02, -1.06, 0.86, -0.36],
    ['rbox', 'redPlastic', 0.08, 0.08, 0.34, 0.02, 1.06, 0.86, 0.36], ['rbox', 'redPlastic', 0.08, 0.08, 0.34, 0.02, 1.06, 0.86, -0.36],
    ['rbox', 'blackPlastic', 2.0, 0.6, 1.0, 0.03, 0, 0.44, 0],
    ...[[-0.9, -0.42], [0.9, -0.42], [-0.9, 0.42], [0.9, 0.42]].map(([x, z]) => ['rbox', 'chrome', 0.08, 0.16, 0.08, 0.02, x, 0.08, z]),
    ['rcyl', 'redPlastic', 0.05, 0.03, 0.008, 20, -0.6, 0.84, 0.1], ['rcyl', 'redPlastic', 0.025, 0.06, 0.01, 16, -0.6, 0.87, 0.1],
    ['rcyl', 'bluePlastic', 0.05, 0.03, 0.008, 20, 0.7, 0.84, -0.2], ['rcyl', 'bluePlastic', 0.025, 0.06, 0.01, 16, 0.7, 0.87, -0.2],
    ['cyl', 'blackPlastic', 0.032, 0.032, 0.006, 20, 0.1, 0.829, 0.05],
    ['box', 'lcd', 0.2, 0.06, 0.01, 0, 0.7, 0.505],
    ['plane', 'airLine', 0.01, 1.02, 0, 0.8265, 0, -H],
  ];
  // --- Pinball
  D.pinball = [
    ['rbox', 'cabinetBody', 0.7, 0.3, 1.4, 0.015, 0, 0.95, 0, 0.12],
    ['box', 'pinballPlay', 0.62, 0.005, 1.3, 0, 1.105, 0.02, 0.12],
    ['box', 'glass', 0.64, 0.006, 1.34, 0, 1.12, 0.02, 0.12],
    ...[-0.3, 0.3].flatMap(x => [0.6, -0.6].map(z => ['rbox', 'chrome', 0.05, 0.85, 0.05, 0.01, x, 0.42, z])),
    ['rbox', 'cabinetBody', 0.7, 0.72, 0.18, 0.015, 0, 1.56, -0.68],
    ['plane', 'pinballArt', 0.62, 0.55, 0, 1.57, -0.588],
    ['rbox', 'chrome', 0.7, 0.03, 0.2, 0.01, 0, 1.935, -0.68],
    ['cyl', 'chrome', 0.012, 0.012, 0.1, 8, 0.25, 0.98, 0.72, H], ['sph', 'redPlastic', 0.02, 0.25, 0.98, 0.78],
    ['rbox', 'redPlastic', 0.03, 0.04, 0.03, 0.008, -0.36, 1.0, 0.55], ['rbox', 'redPlastic', 0.03, 0.04, 0.03, 0.008, 0.36, 1.0, 0.55],
    ['sph', 'chrome', 0.014, 0.1, 1.13, 0.3],
    ['rcyl', 'yellowPlastic', 0.035, 0.05, 0.01, 16, -0.1, 1.14, -0.3, 0.12], ['rcyl', 'redPlastic', 0.035, 0.05, 0.01, 16, 0.12, 1.15, -0.4, 0.12], ['rcyl', 'bluePlastic', 0.035, 0.05, 0.01, 16, 0.02, 1.16, -0.5, 0.12],
  ];
  // --- Claw machine
  D.claw = [
    ['rbox', 'redPlastic', 1.1, 0.9, 1.1, 0.02, 0, 0.45, 0],
    ...M.frame('chrome', 1.1, 1.1, 0.03, 0.03, 0, 1.45, 0.535),
    ...M.frame('chrome', 1.1, 1.1, 0.03, 0.03, 0, 1.45, -0.535),
    ['box', 'glass', 1.04, 1.04, 0.006, 0, 1.45, 0.53], ['box', 'glass', 1.04, 1.04, 0.006, 0, 1.45, -0.53],
    ['box', 'glass', 0.006, 1.04, 1.04, 0.53, 1.45, 0], ['box', 'glass', 0.006, 1.04, 1.04, -0.53, 1.45, 0],
    ['rbox', 'redPlastic', 1.14, 0.24, 1.14, 0.02, 0, 2.1, 0],
    ['box', 'whiteLight', 0.9, 0.02, 0.9, 0, 1.975, 0],
    ['box', 'chrome', 0.9, 0.02, 0.02, 0, 1.94, 0.1], ['box', 'chrome', 0.02, 0.02, 0.9, 0.1, 1.93, 0],
    ['cyl', 'darkMetal', 0.004, 0.004, 0.45, 6, 0.1, 1.72, 0.1],
    ['cyl', 'chrome', 0.04, 0.03, 0.06, 12, 0.1, 1.47, 0.1],
    ...[0, 2.1, 4.2].map(a => ['tube', 'chrome', [[0.1 + Math.cos(a) * 0.03, 1.45, 0.1 + Math.sin(a) * 0.03], [0.1 + Math.cos(a) * 0.08, 1.38, 0.1 + Math.sin(a) * 0.08], [0.1 + Math.cos(a) * 0.05, 1.3, 0.1 + Math.sin(a) * 0.05]], 0.005, 5]),
    ['sph', 'pinkPlush', 0.12, -0.25, 0.98, 0.15, 12, 10, [1, 0.8, 1]], ['sph', 'bluePlush', 0.13, 0.15, 0.99, -0.2, 12, 10, [1, 0.8, 1]], ['sph', 'yellowPlastic', 0.11, 0.1, 0.98, 0.25, 12, 10],
    ['sph', 'pinkPlush', 0.11, -0.2, 1.1, -0.25, 12, 10, [1, 0.8, 1]], ['sph', 'bluePlush', 0.1, 0.3, 1.06, 0.3, 12, 10], ['sph', 'pinkPlush', 0.12, 0.3, 0.98, -0.3, 12, 10, [1, 0.8, 1]],
    ['box', 'chrome', 0.34, 0.3, 0.3, -0.3, 0.97, 0.36],
    ['rbox', 'blackPlastic', 0.5, 0.06, 0.2, 0.01, 0, 0.93, 0.62, 0.3],
    ['cyl', 'chrome', 0.006, 0.006, 0.07, 8, -0.1, 0.99, 0.64], ['sph', 'redPlastic', 0.022, -0.1, 1.03, 0.64],
    ['rcyl', 'yellowPlastic', 0.02, 0.02, 0.005, 16, 0.1, 0.97, 0.63, 0.3],
    ['rbox', 'coinDoor', 0.2, 0.26, 0.02, 0.005, 0.25, 0.5, 0.56],
    ['rbox', 'coinSlot', 0.03, 0.06, 0.01, 0.003, 0.25, 0.55, 0.575],
  ];
  // --- Change machine
  D.change = [
    ['rbox', 'paintMetal', 0.6, 1.6, 0.5, 0.02, 0, 0.8, 0],
    ['rbox', 'chrome', 0.5, 0.6, 0.02, 0.01, 0, 1.15, 0.255],
    ['plane', 'changeFace', 0.44, 0.52, 0, 1.15, 0.2665],
    ['rbox', 'bezel', 0.14, 0.05, 0.02, 0.008, -0.1, 1.33, 0.27], ['box', 'socket', 0.1, 0.012, 0.01, -0.1, 1.33, 0.28],
    ['rbox', 'coinSlot', 0.03, 0.05, 0.01, 0.004, 0.12, 1.3, 0.275],
    ['rbox', 'chrome', 0.24, 0.14, 0.14, 0.02, 0, 0.5, 0.3],
    ['box', 'socket', 0.2, 0.08, 0.1, 0, 0.5, 0.32],
    ['cyl', 'chrome', 0.02, 0.02, 0.02, 12, 0.2, 0.9, 0.26, H],
  ];
  // --- Prize counter (glass-front display case)
  D.counter = [
    ['rbox', 'woodVarnish', 6.3, 0.05, 0.8, 0.012, 0, 1.03, 0],
    ['box', 'kick', 6.1, 0.1, 0.62, 0, 0.05, -0.02],
    ['box', 'woodVarnish', 6.2, 0.9, 0.04, 0, 0.55, -0.34],
    ['box', 'woodVarnish', 0.04, 0.9, 0.7, -3.08, 0.55, 0], ['box', 'woodVarnish', 0.04, 0.9, 0.7, 3.08, 0.55, 0],
    ['box', 'glass', 6.1, 0.8, 0.01, 0, 0.55, 0.34],
    ['box', 'chrome', 6.16, 0.02, 0.02, 0, 0.14, 0.34], ['box', 'chrome', 6.16, 0.02, 0.02, 0, 0.97, 0.34],
    ...[-2, -1, 0, 1, 2].map(x => ['box', 'chrome', 0.015, 0.8, 0.015, x * 1.02, 0.55, 0.34]),
    ['box', 'glass', 6.1, 0.01, 0.62, 0, 0.55, 0],
    // Prizes inside
    ...[-2.6, -1.9, -1.2, -0.3, 0.5, 1.3, 2.1, 2.7].map((x, k) => ['sph', k % 3 ? 'pinkPlush' : 'bluePlush', 0.1 + (k % 2) * 0.03, x, 0.68, 0.05, 10, 8, [1, 0.85, 1]]),
    ...[-2.2, -0.8, 0.9, 2.4].map((x, k) => ['rbox', k % 2 ? 'yellowPlastic' : 'redPlastic', 0.2, 0.14, 0.12, 0.02, x, 0.21, 0.05]),
    ['rbox', 'register', 0.42, 0.14, 0.38, 0.02, 1.4, 1.13, -0.05],
    ['rbox', 'register', 0.36, 0.12, 0.08, 0.02, 1.4, 1.26, -0.18, -0.4],
    ['box', 'lcd', 0.2, 0.05, 0.005, 1.4, 1.27, -0.14, -0.4],
    ['box', 'keys', 0.3, 0.005, 0.18, 1.4, 1.203, 0.02, 0.2],
    ['rcyl', 'brass', 0.04, 0.012, 0.004, 16, -0.6, 1.061, 0.2],
  ];
  D.register = [['rbox', 'register', 0.42, 0.14, 0.38, 0.02, 0, 0.07, 0], ['rbox', 'register', 0.36, 0.12, 0.08, 0.02, 0, 0.2, -0.13, -0.4], ['box', 'keys', 0.3, 0.005, 0.18, 0, 0.143, 0.07, 0.2]];
  D.prizeShelf = [
    ...[1.0, 1.6, 2.2].map(y => ['rbox', 'woodVarnish', 6, 0.035, 0.45, 0.006, 0, y, 0]),
    ...[-2.95, -1, 1, 2.95].map(x => ['box', 'chrome', 0.03, 1.8, 0.03, x, 1.5, 0.2]),
    ['sph', 'pinkPlush', 0.18, -2, 1.18, 0, 14, 12, [1, 0.9, 0.8]], ['sph', 'pinkPlush', 0.09, -2.1, 1.38, 0.05, 10, 8],
    ['sph', 'bluePlush', 0.2, -1, 1.2, 0, 14, 12, [1, 0.9, 0.8]], ['sph', 'bluePlush', 0.1, -0.9, 1.42, 0.05, 10, 8],
    ['sph', 'yellowPlastic', 0.22, 0.5, 1.8, 0, 16, 12], ['sph', 'pinkPlush', 0.16, 2.1, 1.78, 0, 14, 10, [1, 0.9, 0.8]],
    ['rbox', 'redPlastic', 0.3, 0.3, 0.3, 0.03, 1.2, 1.17, 0], ['rbox', 'bluePlastic', 0.25, 0.4, 0.25, 0.03, -2.4, 1.82, 0], ['rbox', 'yellowPlastic', 0.35, 0.3, 0.3, 0.03, 2.5, 2.37, 0],
    ['rbox', 'cardboard', 0.4, 0.28, 0.12, 0.01, -1.6, 2.36, 0.05], ['rbox', 'whitePlastic', 0.2, 0.34, 0.1, 0.02, -0.3, 2.39, 0],
    ['cap', 'redPlastic', 0.04, 0.4, 0.8, 2.3, 0.05, 0, 0, H], ['cap', 'bluePlastic', 0.04, 0.4, 0.85, 2.4, 0.08, 0, 0.3, H],
  ];
  D.bench = [
    ['rbox', 'woodVarnish', 2.2, 0.05, 0.42, 0.015, 0, 0.45, 0],
    ...[-0.95, 0.95].flatMap(x => [['rbox', 'darkMetal', 0.05, 0.43, 0.05, 0.01, x, 0.22, -0.15], ['rbox', 'darkMetal', 0.05, 0.43, 0.05, 0.01, x, 0.22, 0.15], ['rbox', 'darkMetal', 0.05, 0.04, 0.36, 0.01, x, 0.08, 0]]),
    ['rbox', 'woodVarnish', 2.2, 0.35, 0.04, 0.012, 0, 0.72, -0.2, -0.12],
  ];

  // --- Manager's desk (executive) with drawers, blotter and clutter
  const desk = [
    ['rbox', 'woodVarnish', 1.8, 0.045, 0.86, 0.012, 0, 0.76, 0],
    ['rbox', 'drawerWood', 0.45, 0.7, 0.78, 0.01, -0.64, 0.37, 0], ['rbox', 'drawerWood', 0.45, 0.7, 0.78, 0.01, 0.64, 0.37, 0],
    ['box', 'drawerWood', 0.9, 0.5, 0.02, 0, 0.47, -0.36],
    ['box', 'kick', 1.76, 0.05, 0.72, 0, 0.025, 0],
    ['rbox', 'leather', 0.62, 0.006, 0.44, 0.003, 0, 0.785, 0.1],
    ['rbox', 'drawerWood', 0.6, 0.08, 0.02, 0.005, 0, 0.69, 0.4],
    ['cyl', 'brass', 0.008, 0.008, 0.1, 8, 0, 0.69, 0.42, 0, 0, H],
  ];
  for (const x of [-0.64, 0.64]) for (const [y, h] of [[0.6, 0.2], [0.38, 0.2], [0.14, 0.24]]) {
    desk.push(['rbox', 'drawer', 0.41, h - 0.02, 0.02, 0.004, x, y, 0.39]);
    desk.push(['rbox', 'brass', 0.1, 0.018, 0.02, 0.006, x, y, 0.408]);
  }
  desk.push(
    // Papers, folders, mug, ashtray, pen cup, calendar
    ['box', 'paper', 0.21, 0.012, 0.3, -0.4, 0.788, -0.2, 0, 0.3], ['box', 'yellowPaper', 0.21, 0.004, 0.3, -0.38, 0.796, -0.22, 0, 0.1],
    ['rbox', 'folderBrown', 0.24, 0.03, 0.32, 0.004, 0.55, 0.8, -0.15, 0, -0.2],
    ['lathe', 'mug', [[0.036, 0], [0.04, 0.005], [0.04, 0.095], [0.037, 0.098], [0.034, 0.01], [0, 0.01]], 20, 0.35, 0.785, 0.3],
    ['disc', 'coffee', 0.034, 0.35, 0.87, 0.3, -H],
    ['torus', 'mug', 0.024, 0.006, 12, 0, 0.395, 0.835, 0.3, 0, 0, 0],
    ['lathe', 'glass', [[0.07, 0], [0.075, 0.02], [0.05, 0.025], [0.02, 0.012], [0, 0.012]], 16, 0.8, 0.785, -0.05],
    ['cap', 'cigarette', 0.004, 0.06, 0.8, 0.8, -0.05, 0, 0.4, H],
    ['lathe', 'blackPlastic', [[0.03, 0], [0.032, 0.11], [0.028, 0.11], [0.026, 0.005], [0, 0.005]], 16, -0.75, 0.785, -0.2],
    ['cyl', 'redPlastic', 0.004, 0.004, 0.14, 6, -0.745, 0.88, -0.2, 0.15], ['cyl', 'bluePlastic', 0.004, 0.004, 0.14, 6, -0.755, 0.88, -0.19, -0.1, 0, 0.1],
    ['rbox', 'whitePlastic', 0.2, 0.26, 0.012, 0.004, 0.2, 0.9, -0.35, -0.3], ['plane', 'calendar', 0.19, 0.24, 0.2, 0.9, -0.3425, -0.3],
  );
  D.desk = desk;
  // Banker's lamp: brass base and stem, green glass shade (the light itself sits under the shade)
  D.deskLamp = [
    ['lathe', 'brass', [[0.08, 0], [0.085, 0.008], [0.075, 0.02], [0.02, 0.03], [0, 0.03]], 24, 0, 0.785, 0],
    ['cyl', 'brass', 0.008, 0.008, 0.3, 8, 0, 0.94, 0],
    ['cyl', 'brass', 0.006, 0.006, 0.12, 8, 0, 1.09, 0.03, H],
    ['lathe', 'greenGlass', [[0.001, 0.07], [0.04, 0.068], [0.1, 0.05], [0.14, 0.01], [0.142, 0], [0.138, 0], [0.098, 0.044], [0.04, 0.062], [0.001, 0.064]], 32, 0, 1.06, 0.06, 0, 0, 0, [1, 1, 0.55]],
    ['cyl', 'chrome', 0.004, 0.004, 0.08, 6, 0.05, 1.0, 0.09],
    ['sph', 'brass', 0.008, 0.05, 0.96, 0.09],
    ['tube', 'blackPlastic', [[0, 0.79, -0.05], [0.02, 0.785, -0.2], [0.1, 0.78, -0.35], [0.12, 0.6, -0.42], [0.1, 0.1, -0.42]], 0.004, 5],
  ];
  // Wooden office chair with curved back
  D.chair = [
    ['rbox', 'leather', 0.46, 0.07, 0.44, 0.03, 0, 0.47, 0],
    ['ext', 'woodVarnish', [[-0.23, 0], [0.23, 0], [0.22, 0.34], [0.18, 0.38], [-0.18, 0.38], [-0.22, 0.34]], 0.03, 0.006, 0, 0.55, -0.21, 0.1, 0, 0],
    ['rbox', 'leather', 0.36, 0.22, 0.04, 0.015, 0, 0.77, -0.19, 0.1],
    ...[[-0.2, -0.19], [0.2, -0.19], [-0.2, 0.19], [0.2, 0.19]].map(([x, z]) => ['cyl', 'woodVarnish', 0.018, 0.014, 0.45, 8, x, 0.22, z]),
    ['cyl', 'woodVarnish', 0.01, 0.01, 0.38, 6, 0, 0.14, 0.19, 0, 0, H], ['cyl', 'woodVarnish', 0.01, 0.01, 0.38, 6, 0, 0.14, -0.19, 0, 0, H],
  ];
  D.filing = [
    ['rbox', 'paintMetal', 0.6, 1.32, 0.65, 0.012, 0, 0.66, 0],
    ...[0.2, 0.52, 0.84, 1.16].flatMap(y => [
      ['rbox', 'paintMetal', 0.54, 0.28, 0.02, 0.006, 0, y, 0.33],
      ['rbox', 'chrome', 0.16, 0.025, 0.03, 0.008, 0, y + 0.05, 0.35],
      ['box', 'labelCard', 0.08, 0.035, 0.002, 0, y + 0.1, 0.341],
    ]),
    ['box', 'paper', 0.3, 0.05, 0.25, 0.05, 1.345, 0, 0, 0.1],
  ];
  D.safe = [
    ['rbox', 'safeGreen', 0.8, 0.9, 0.7, 0.03, 0, 0.47, 0],
    ['rbox', 'safeGreen', 0.66, 0.74, 0.03, 0.012, 0, 0.47, 0.36],
    ['rcyl', 'chrome', 0.07, 0.03, 0.008, 32, 0.12, 0.58, 0.385, H],
    ['cyl', 'blackPlastic', 0.035, 0.035, 0.02, 20, 0.12, 0.58, 0.405, H],
    ['rbox', 'chrome', 0.03, 0.2, 0.04, 0.01, -0.2, 0.47, 0.39],
    ['cyl', 'chrome', 0.02, 0.02, 0.05, 12, -0.2, 0.47, 0.41, H],
    ['box', 'brass', 0.2, 0.05, 0.004, 0, 0.8, 0.377],
    ...[[-0.35, -0.3], [0.35, -0.3], [-0.35, 0.3], [0.35, 0.3]].map(([x, z]) => ['cyl', 'darkMetal', 0.03, 0.035, 0.03, 10, x, 0.015, z]),
  ];
  D.corkboard = [
    ...M.frame('woodVarnish', 1.44, 0.94, 0.04, 0.035, 0, 0, 0),
    ['box', 'cork', 1.38, 0.88, 0.02, 0, 0, -0.005],
    ['box', 'paper', 0.25, 0.3, 0.003, -0.35, 0.1, 0.008, 0, 0, 0.1], ['box', 'paper', 0.3, 0.2, 0.003, 0.3, -0.15, 0.008, 0, 0, -0.08],
    ['box', 'yellowPaper', 0.15, 0.15, 0.003, 0.4, 0.25, 0.008], ['box', 'photoPlane', 0.15, 0.1, 0.003, -0.1, -0.25, 0.009, 0, 0, 0.05],
    ['box', 'paper', 0.21, 0.28, 0.003, 0.05, 0.2, 0.01, 0, 0, 0.03],
    ...[[-0.35, 0.24], [0.3, -0.06], [0.4, 0.32], [-0.1, -0.2], [0.05, 0.33]].map(([x, y]) => ['sph', 'redPlastic', 0.009, x, y, 0.016, 8, 6]),
  ];
  D.shelf = [
    ...[0.3, 1.0, 1.7].map(y => ['rbox', 'paintMetal', 2.6, 0.03, 0.55, 0.005, 0, y, 0]),
    ...[-1.28, 1.28].flatMap(x => [-0.26, 0.26].map(z => ['ext', 'paintMetal', [[-0.02, 0], [0.02, 0], [0.02, 2.0], [-0.02, 2.0]], 0.04, 0, x, 0, z, 0, 0, 0])),
    ['rbox', 'cardboard', 0.5, 0.4, 0.45, 0.01, -0.8, 0.52, 0], ['box', 'tape', 0.06, 0.402, 0.452, -0.8, 0.52, 0],
    ['rbox', 'cardboard', 0.6, 0.35, 0.45, 0.01, 0.3, 1.19, 0], ['box', 'tape', 0.6, 0.004, 0.06, 0.3, 1.367, 0],
    ['rbox', 'cardboard', 0.4, 0.3, 0.4, 0.01, 0.9, 1.87, 0],
    ['rcyl', 'paintMetal', 0.12, 0.2, 0.01, 16, -0.2, 0.42, 0.05], ['rcyl', 'redPaint', 0.12, 0.2, 0.01, 16, 0.1, 0.42, -0.05],
    ['rbox', 'bluePlastic', 0.3, 0.12, 0.2, 0.02, 0.8, 1.08, 0.05], ['rbox', 'yellowPaper', 0.28, 0.08, 0.22, 0.004, -0.6, 1.06, 0.02],
  ];
  D.boxes = [['rbox', 'cardboard', 0.7, 0.5, 0.6, 0.012, 0, 0.25, 0], ['box', 'tape', 0.702, 0.004, 0.08, 0, 0.502, 0], ['rbox', 'cardboard', 0.6, 0.45, 0.5, 0.012, 0.05, 0.725, 0.02, 0, 0.3], ['rbox', 'cardboard', 0.4, 0.3, 0.4, 0.01, -0.1, 1.1, 0, 0, -0.2]];

  // --- Bathroom
  // Pedestal sink: basin with a real bowl, rim, faucet with two cross handles, drain, P-trap behind the pedestal
  D.sink = [
    ['lathe', 'porcelain', [[0.1, 0], [0.085, 0.05], [0.07, 0.3], [0.075, 0.6], [0.11, 0.72], [0, 0.72]], 32, 0, 0, 0, 0, 0, 0, [1, 1, 0.8]],
    ['lathe', 'porcelain', [[0, 0.7], [0.12, 0.7], [0.27, 0.77], [0.29, 0.86], [0.285, 0.875], [0.26, 0.875], [0.24, 0.85], [0.18, 0.78], [0.04, 0.765], [0, 0.765]], 40, 0, 0, 0.02, 0, 0, 0, [1, 1, 0.75]],
    ['rbox', 'porcelain', 0.54, 0.1, 0.06, 0.02, 0, 0.91, -0.21],
    ['disc', 'chrome', 0.022, 0, 0.768, 0.02, -H], ['disc', 'socket', 0.016, 0, 0.769, 0.02, -H],
    ['cyl', 'chrome', 0.018, 0.022, 0.05, 16, 0, 0.9, -0.16],
    ['tube', 'chrome', [[0, 0.92, -0.16], [0, 1.0, -0.15], [0, 1.02, -0.08], [0, 0.97, -0.03]], 0.011, 10],
    ...[-0.12, 0.12].flatMap(x => [
      ['cyl', 'chrome', 0.016, 0.02, 0.04, 14, x, 0.9, -0.17],
      ['box', 'chrome', 0.07, 0.012, 0.012, x, 0.93, -0.17], ['box', 'chrome', 0.012, 0.012, 0.07, x, 0.93, -0.17],
      ['sph', x < 0 ? 'redPlastic' : 'bluePlastic', 0.009, x, 0.94, -0.17, 8, 6],
    ]),
    ['tube', 'chrome', [[0, 0.72, -0.05], [0, 0.55, -0.08], [0, 0.48, -0.15], [0, 0.5, -0.24], [0, 0.55, -0.3]], 0.016, 10],
    ['tube', 'chrome', [[-0.1, 0.8, -0.1], [-0.12, 0.62, -0.2], [-0.12, 0.35, -0.29]], 0.006, 6], ['tube', 'chrome', [[0.1, 0.8, -0.1], [0.12, 0.62, -0.2], [0.12, 0.35, -0.29]], 0.006, 6],
    ['rcyl', 'chrome', 0.03, 0.03, 0.006, 16, -0.12, 0.35, -0.3, H], ['rcyl', 'chrome', 0.03, 0.03, 0.006, 16, 0.12, 0.35, -0.3, H],
    // Soap bar on the rim
    ['rbox', 'soap', 0.07, 0.022, 0.045, 0.01, 0.2, 0.885, -0.12, 0, 0.3],
  ];
  // Mirror with a brushed frame and a wall-mounted shelf
  D.mirror = [
    ...M.frame('chrome', 0.62, 0.82, 0.025, 0.02, 0, 1.6, 0.01),
    ['box', 'mirror', 0.58, 0.78, 0.006, 0, 1.6, 0.004],
    ['rbox', 'glass', 0.5, 0.012, 0.1, 0.004, 0, 1.15, 0.05],
    ['box', 'chrome', 0.012, 0.03, 0.08, -0.22, 1.13, 0.04], ['box', 'chrome', 0.012, 0.03, 0.08, 0.22, 1.13, 0.04],
    ['lathe', 'whitePlastic', [[0.025, 0], [0.028, 0.1], [0.012, 0.12], [0.01, 0.15], [0, 0.15]], 12, 0.15, 1.162, 0.05],
    ['cyl', 'blackPlastic', 0.004, 0.004, 0.03, 6, 0.15, 1.325, 0.06, H],
  ];
  // Close-coupled toilet: oval bowl on a flared foot, tank with lid, seat, lid up, flush lever, supply pipe with valve
  D.toilet = (() => {
    const O = [0.9, 1, 1.25];
    const seatRing = [];
    for (let k = 0; k <= 12; k++) { const t = k / 12 * PI * 2; seatRing.push([0.155 + Math.cos(t) * 0.024, 0.43 + Math.sin(t) * 0.012]); }
    return [
      ['lathe', 'porcelain', [[0.12, 0], [0.105, 0.04], [0.1, 0.18], [0.14, 0.3], [0.19, 0.38], [0.2, 0.4], [0.185, 0.412], [0.17, 0.406]], 32, 0, 0, 0.08, 0, 0, 0, O],
      ['lathe', 'porcelainIn', [[0.17, 0.406], [0.13, 0.34], [0.06, 0.275], [0.001, 0.265]], 32, 0, 0, 0.08, 0, 0, 0, O],
      ['lathe', 'water', [[0.095, 0.3], [0.001, 0.3]], 24, 0, 0, 0.08, 0, 0, 0, O],
      ['rbox', 'porcelain', 0.36, 0.14, 0.2, 0.03, 0, 0.36, -0.2],
      // Seat ring and the lid raised against the tank
      ['lathe', 'seat', seatRing, 32, 0, 0, 0.08, 0, 0, 0, O],
      ['lathe', 'seat', [[0.001, 0], [0.17, 0], [0.178, 0.01], [0.17, 0.02], [0.001, 0.02]], 32, 0, 0.62, -0.14, H - 0.12, 0, 0, [0.9, 1, 1.15]],
      ['rbox', 'chrome', 0.03, 0.02, 0.03, 0.005, -0.08, 0.435, -0.12], ['rbox', 'chrome', 0.03, 0.02, 0.03, 0.005, 0.08, 0.435, -0.12],
      ['rbox', 'porcelain', 0.44, 0.38, 0.19, 0.03, 0, 0.61, -0.27],
      ['rbox', 'porcelain', 0.46, 0.04, 0.21, 0.015, 0, 0.815, -0.27],
      ['rbox', 'chrome', 0.07, 0.015, 0.015, 0.005, 0.15, 0.74, -0.165], ['cyl', 'chrome', 0.014, 0.014, 0.02, 12, 0.19, 0.74, -0.172, H],
      ['tube', 'chrome', [[-0.15, 0.45, -0.3], [-0.16, 0.28, -0.32], [-0.16, 0.2, -0.36]], 0.007, 6],
      ['rcyl', 'chrome', 0.022, 0.03, 0.006, 12, -0.16, 0.2, -0.37, H], ['box', 'chrome', 0.04, 0.012, 0.012, -0.16, 0.2, -0.345],
      ['cyl', 'porcelain', 0.02, 0.02, 0.01, 10, -0.14, 0.012, 0.12], ['cyl', 'porcelain', 0.02, 0.02, 0.01, 10, 0.14, 0.012, 0.12],
    ];
  })();
  // Toilet paper holder and hand dryer (added next to the toilet/sink by the world builder)
  D.paperHolder = [['rbox', 'chrome', 0.16, 0.04, 0.03, 0.01, 0, 0, 0], ['cyl', 'paperRoll', 0.055, 0.055, 0.11, 20, 0, -0.05, 0.07, 0, 0, H], ['cyl', 'chrome', 0.006, 0.006, 0.14, 8, 0, -0.05, 0.07, 0, 0, H]];
  D.handDryer = [['rbox', 'whitePlastic', 0.26, 0.24, 0.15, 0.05, 0, 0, 0.075], ['cyl', 'chrome', 0.03, 0.035, 0.07, 12, 0, -0.14, 0.1, 0.4], ['rcyl', 'chrome', 0.025, 0.01, 0.004, 16, 0.07, 0.04, 0.152, H], ['box', 'labelCard', 0.1, 0.05, 0.002, -0.04, 0.05, 0.151]];
  D.trashCan = [['lathe', 'paintMetal', [[0.15, 0], [0.17, 0.5], [0.165, 0.5], [0.145, 0.01], [0, 0.01]], 24], ['lathe', 'blackPlastic', [[0.172, 0.49], [0.175, 0.53], [0, 0.56]], 24], ['sph', 'paper', 0.05, 0.05, 0.5, 0.02, 8, 6]];

  // --- Office
  D.cubicleDesk = [
    ['rbox', 'laminate', 0.75, 0.035, 1.6, 0.01, 0, 0.74, 0],
    ['rbox', 'darkMetal', 0.7, 0.7, 0.03, 0.006, 0, 0.36, -0.78], ['rbox', 'darkMetal', 0.7, 0.7, 0.03, 0.006, 0, 0.36, 0.78],
    ['rbox', 'paintMetal', 0.6, 0.6, 0.4, 0.008, 0.02, 0.33, -0.5],
    ...[0.52, 0.3, 0.1].map(y => ['rbox', 'paintMetal', 0.02, 0.18, 0.36, 0.004, 0.33, y, -0.5]),
    ...[0.52, 0.3, 0.1].map(y => ['rbox', 'chrome', 0.02, 0.02, 0.1, 0.005, 0.345, y + 0.05, -0.5]),
    // CRT monitor (screen plane at x 0.131, y 0.965, z 0.15 facing +x)
    ['rbox', 'beigePlastic', 0.24, 0.33, 0.38, 0.03, -0.02, 0.965, 0.15],
    ['lathe', 'beigePlastic', [[0.02, 0], [0.16, 0], [0.16, 0.12], [0.12, 0.22], [0, 0.22]], 4, -0.2, 0.965, 0.15, 0, 0, H, [1, 1, 1], PI / 4],
    ['rbox', 'beigePlastic', 0.2, 0.05, 0.2, 0.01, -0.06, 0.775, 0.15],
    ['cyl', 'beigePlastic', 0.04, 0.05, 0.05, 12, -0.06, 0.8, 0.15],
    ['box', 'bezel', 0.004, 0.27, 0.34, 0.121, 0.965, 0.15],
    ['rcyl', 'chrome', 0.008, 0.006, 0.002, 8, 0.12, 0.81, 0.3, 0, 0, H],
    // Keyboard with key rows and mouse
    ['rbox', 'beigePlastic', 0.17, 0.025, 0.45, 0.006, 0.2, 0.77, 0.15, 0, 0, -0.08],
    ['box', 'keysBeige', 0.12, 0.012, 0.42, 0.2, 0.785, 0.15, 0, 0, -0.08],
    ['rbox', 'beigePlastic', 0.1, 0.03, 0.06, 0.012, 0.22, 0.772, 0.48],
    ['tube', 'beigePlastic', [[0.17, 0.765, 0.48], [0.05, 0.762, 0.46], [-0.1, 0.8, 0.35]], 0.003, 5],
    ['box', 'paper', 0.21, 0.01, 0.3, 0.15, 0.763, -0.45, 0, 0.2],
    ['lathe', 'mug', [[0.036, 0], [0.04, 0.005], [0.04, 0.095], [0.037, 0.098], [0.034, 0.01], [0, 0.01]], 16, 0.25, 0.757, -0.15],
    ['rbox', 'blackPlastic', 0.12, 0.08, 0.16, 0.01, -0.2, 0.797, -0.5],
  ];
  D.computer = D.cubicleDesk;
  D.officeChair = [
    ['rbox', 'blackFabric', 0.48, 0.08, 0.48, 0.035, 0, 0.48, 0],
    ['rbox', 'blackFabric', 0.44, 0.52, 0.07, 0.035, 0, 0.84, -0.24, 0.12],
    ['rbox', 'blackPlastic', 0.08, 0.3, 0.03, 0.01, 0, 0.6, -0.27, 0.2],
    ['cyl', 'chrome', 0.022, 0.022, 0.26, 10, 0, 0.3, 0], ['cyl', 'blackPlastic', 0.035, 0.035, 0.1, 10, 0, 0.2, 0],
    ...[0, 1, 2, 3, 4].flatMap(k => { const a = k / 5 * PI * 2, c = Math.cos(a), s = Math.sin(a); return [['box', 'blackPlastic', 0.3, 0.035, 0.04, c * 0.15, 0.09, s * 0.15, 0, -a, 0], ['sph', 'blackPlastic', 0.028, c * 0.29, 0.03, s * 0.29, 10, 8]]; }),
    ['rbox', 'blackPlastic', 0.04, 0.03, 0.28, 0.01, -0.26, 0.66, 0], ['rbox', 'blackPlastic', 0.04, 0.03, 0.28, 0.01, 0.26, 0.66, 0],
    ['box', 'blackPlastic', 0.03, 0.16, 0.03, -0.26, 0.57, -0.08], ['box', 'blackPlastic', 0.03, 0.16, 0.03, 0.26, 0.57, -0.08],
  ];
  D.meetingTable = [
    ['rbox', 'woodVarnish', 4.4, 0.05, 1.7, 0.02, 0, 0.75, 0],
    ['rbox', 'darkMetal', 0.2, 0.7, 1.2, 0.02, -1.6, 0.37, 0], ['rbox', 'darkMetal', 0.2, 0.7, 1.2, 0.02, 1.6, 0.37, 0],
    ['rbox', 'darkMetal', 0.3, 0.03, 1.3, 0.01, -1.6, 0.015, 0], ['rbox', 'darkMetal', 0.3, 0.03, 1.3, 0.01, 1.6, 0.015, 0],
    ['lathe', 'blackPlastic', [[0.14, 0], [0.16, 0.02], [0.05, 0.04], [0, 0.04]], 3, 0, 0.775, 0, 0, 0.3],
    ...[-1.2, 0, 1.2].map(x => ['box', 'paper', 0.21, 0.004, 0.3, x, 0.777, 0.55, 0, 0.1]),
    ['lathe', 'glass', [[0.035, 0], [0.04, 0.12], [0, 0.12]], 12, -0.6, 0.775, -0.4],
  ];
  D.kitchenCounter = [
    ['rbox', 'laminate', 0.75, 0.04, 5.6, 0.01, 0, 0.9, 0],
    ['box', 'whitePlastic', 0.7, 0.86, 5.5, 0, 0.44, 0],
    ...[-2.2, -1.1, 0, 1.1, 2.2].map(z => ['rbox', 'whitePlastic', 0.02, 0.7, 1.05, 0.006, 0.36, 0.44, z]),
    ...[-2.2, -1.1, 0, 1.1, 2.2].map(z => ['rbox', 'chrome', 0.02, 0.02, 0.14, 0.006, 0.38, 0.72, z]),
    // Microwave, coffee maker, sink
    ['rbox', 'whitePlastic', 0.4, 0.3, 0.5, 0.015, -0.05, 1.07, 1.5], ['box', 'bezel', 0.004, 0.2, 0.3, 0.151, 1.07, 1.45], ['box', 'lcd', 0.004, 0.03, 0.08, 0.152, 1.16, 1.68],
    ['rbox', 'blackPlastic', 0.3, 0.38, 0.25, 0.02, -0.1, 1.11, -1.8], ['lathe', 'glass', [[0.06, 0], [0.075, 0.08], [0.06, 0.14], [0.03, 0.15], [0, 0.15]], 16, 0.04, 0.92, -1.8],
    ['lathe', 'coffee', [[0.06, 0], [0.072, 0.06], [0, 0.06]], 16, 0.04, 0.922, -1.8],
    ['box', 'chrome', 0.45, 0.01, 0.6, 0, 0.922, 0.2], ['tube', 'chrome', [[-0.3, 0.92, 0.2], [-0.3, 1.2, 0.2], [-0.15, 1.25, 0.2]], 0.012, 8],
    ['lathe', 'mug', [[0.036, 0], [0.04, 0.005], [0.04, 0.095], [0.037, 0.098], [0.034, 0.01], [0, 0.01]], 16, 0.1, 0.92, -1.4],
  ];
  D.waterCooler = [
    ['rbox', 'whitePlastic', 0.34, 1.0, 0.34, 0.03, 0, 0.5, 0],
    ['lathe', 'waterJug', [[0.001, 0], [0.14, 0.02], [0.15, 0.1], [0.15, 0.32], [0.12, 0.4], [0.04, 0.44], [0.04, 0.48], [0.001, 0.48]], 24, 0, 1.47, 0, PI],
    ['rbox', 'blackPlastic', 0.2, 0.1, 0.04, 0.01, 0, 0.8, 0.18], ['cyl', 'bluePlastic', 0.012, 0.012, 0.03, 10, -0.05, 0.8, 0.2, H], ['cyl', 'redPlastic', 0.012, 0.012, 0.03, 10, 0.05, 0.8, 0.2, H],
    ['lathe', 'paper', [[0.02, 0], [0.035, 0.09], [0.033, 0.09], [0, 0.002]], 12, 0.12, 1.0, 0.12],
  ];
  D.serverRack = [
    ...[-0.95, 0, 0.95].flatMap(x => [
      ['rbox', 'blackPlastic', 0.8, 2.1, 1.0, 0.01, x, 1.05, 0],
      ...M.frame('darkMetal', 0.8, 2.1, 0.04, 0.03, x, 1.05, 0.505),
      ...M.frame('darkMetal', 0.8, 2.1, 0.04, 0.03, x, 1.05, -0.505),
    ]),
  ];
  D.archiveShelf = [
    ['rbox', 'paintMetal', 2.9, 0.03, 0.9, 0.006, 0, 2.4, 0],
    ...[0.05, 0.62, 1.2, 1.78].map(y => ['rbox', 'paintMetal', 2.9, 0.025, 0.9, 0.005, 0, y, 0]),
    ...[-1.43, 0, 1.43].map(x => ['box', 'paintMetal', 0.03, 2.4, 0.9, x, 1.2, 0]),
    ['box', 'folders', 2.8, 2.2, 0.02, 0, 1.2, 0.44], ['box', 'folders', 2.8, 2.2, 0.02, 0, 1.2, -0.44, 0, PI],
  ];
  D.phone = [
    ['rbox', 'beigePlastic', 0.22, 0.06, 0.2, 0.02, 0, 0.03, 0],
    ['rbox', 'beigePlastic', 0.2, 0.05, 0.1, 0.02, 0, 0.07, -0.03, -0.25],
    ['box', 'keysBeige', 0.1, 0.004, 0.08, 0.0, 0.062, 0.05, 0.1],
    ['cap', 'beigePlastic', 0.022, 0.16, 0, 0.1, -0.05, 0, 0, H],
    ['sph', 'beigePlastic', 0.03, -0.1, 0.1, -0.05, 10, 8, [1, 0.8, 1]], ['sph', 'beigePlastic', 0.03, 0.1, 0.1, -0.05, 10, 8, [1, 0.8, 1]],
    ['tube', 'beigePlastic', [[-0.11, 0.03, 0.02], [-0.18, 0.01, 0.05], [-0.2, 0.01, -0.02], [-0.15, 0.01, -0.08], [-0.12, 0.07, -0.05]], 0.004, 5, 30],
    ['box', 'lcd', 0.05, 0.003, 0.015, 0.05, 0.062, -0.01],
  ];
  D.printer = [['rbox', 'beigePlastic', 0.5, 0.25, 0.4, 0.02, 0, 0.125, 0], ['rbox', 'beigePlastic', 0.36, 0.02, 0.2, 0.005, 0, 0.25, -0.12, -0.5], ['box', 'paper', 0.21, 0.01, 0.3, 0, 0.26, 0.05], ['box', 'bezel', 0.08, 0.04, 0.005, 0.17, 0.2, 0.2], ['box', 'lcd', 0.03, 0.012, 0.002, 0.17, 0.205, 0.203]];
  D.keypad = [['rbox', 'darkMetal', 0.16, 0.24, 0.035, 0.008, 0, 0, 0], ['box', 'keys', 0.12, 0.14, 0.005, 0, -0.03, 0.02], ['box', 'lcd', 0.12, 0.04, 0.004, 0, 0.08, 0.019], ...M.frame('chrome', 0.13, 0.05, 0.006, 0.006, 0, 0.08, 0.02)];
  D.cardReader = [['rbox', 'darkMetal', 0.1, 0.16, 0.035, 0.008, 0, 0, 0], ['box', 'blackPlastic', 0.012, 0.1, 0.03, 0, -0.01, 0.025], ['box', 'labelCard', 0.06, 0.02, 0.002, 0, 0.065, 0.019]];
  D.fuseBox = [['rbox', 'paintMetal', 0.5, 0.7, 0.14, 0.01, 0, 0, 0], ['rbox', 'paintMetal', 0.46, 0.66, 0.012, 0.006, 0, 0, 0.075], ['rbox', 'darkMetal', 0.06, 0.2, 0.06, 0.01, 0, -0.05, 0.1], ['box', 'yellowPaper', 0.3, 0.08, 0.004, 0, 0.26, 0.082], ['cyl', 'chrome', 0.012, 0.012, 0.02, 8, 0.18, 0.05, 0.085, H], ['tube', 'darkMetal', [[0, 0.35, 0], [0, 0.6, 0.02], [0, 1.2, 0.02]], 0.02, 8]];
  D.fusePanel = [['rbox', 'paintMetal', 0.6, 0.8, 0.14, 0.01, 0, 0, 0], ...[-0.15, 0, 0.15].flatMap(x => [['rcyl', 'socket', 0.045, 0.03, 0.006, 16, x, 0.05, 0.075, H], ['torus', 'ceramic', 0.05, 0.008, 16, 0, x, 0.05, 0.08, 0, 0, 0]]), ['box', 'yellowPaper', 0.4, 0.1, 0.004, 0, 0.3, 0.072], ['tube', 'darkMetal', [[-0.2, 0.4, 0], [-0.2, 0.8, 0.02], [-0.2, 1.4, 0.02]], 0.025, 8], ['tube', 'darkMetal', [[0.2, 0.4, 0], [0.2, 0.8, 0.02], [0.2, 1.4, 0.02]], 0.025, 8]];
  D.exitPanel = [['rbox', 'darkMetal', 0.5, 0.5, 0.06, 0.01, 0, 0, 0], ...M.frame('chrome', 0.5, 0.5, 0.02, 0.01, 0, 0, 0.032), ...[[-0.12, 0.12], [0.12, 0.12], [-0.12, -0.12], [0.12, -0.12]].flatMap(([x, y]) => [['rcyl', 'socket', 0.07, 0.03, 0.008, 20, x, y, 0.03, H], ['torus', 'chrome', 0.072, 0.006, 20, 0, x, y, 0.045, 0, 0, 0]])];
  D.generator = [
    ...[[-0.4, -0.25], [0.4, -0.25], [-0.4, 0.25], [0.4, 0.25]].map(([x, z]) => ['cyl', 'darkMetal', 0.018, 0.018, 0.75, 8, x, 0.4, z]),
    ['tube', 'darkMetal', [[-0.4, 0.78, -0.25], [0, 0.82, -0.25], [0.4, 0.78, -0.25]], 0.016, 8], ['tube', 'darkMetal', [[-0.4, 0.78, 0.25], [0, 0.82, 0.25], [0.4, 0.78, 0.25]], 0.016, 8],
    ['rbox', 'yellowPaint', 0.7, 0.5, 0.45, 0.04, 0, 0.36, 0],
    ['rcyl', 'yellowPaint', 0.16, 0.36, 0.03, 20, -0.12, 0.66, 0, H, 0, H],
    ['rcyl', 'darkMetal', 0.06, 0.08, 0.02, 16, 0.25, 0.68, 0.05],
    ['rbox', 'blackPlastic', 0.22, 0.16, 0.03, 0.01, 0.22, 0.4, 0.235], ['box', 'labelCard', 0.08, 0.04, 0.002, 0.18, 0.44, 0.252],
    ['cyl', 'redPlastic', 0.014, 0.014, 0.02, 10, 0.28, 0.36, 0.255, H],
    ['lathe', 'chrome', [[0.035, 0], [0.04, 0.12], [0.03, 0.14], [0, 0.14]], 12, -0.33, 0.35, 0.1, 0, 0, H],
    ['tube', 'blackPlastic', [[0.3, 0.3, 0.2], [0.34, 0.2, 0.3], [0.2, 0.05, 0.4]], 0.008, 6],
    ['rbox', 'rubber', 0.12, 0.04, 0.03, 0.01, -0.35, 0.55, 0.235],
  ];
  D.valve = [['torus', 'redPaint', 0.18, 0.02, 24, 0, 0, 0, 0.14, 0, 0, 0], ...[0, 1, 2, 3, 4].map(k => ['box', 'redPaint', 0.36, 0.024, 0.02, 0, 0, 0.14, 0, 0, k * PI / 5]), ['rcyl', 'redPaint', 0.04, 0.04, 0.01, 16, 0, 0, 0.14, H], ['cyl', 'darkMetal', 0.035, 0.035, 0.14, 12, 0, 0, 0.07, H], ['rcyl', 'darkMetal', 0.08, 0.05, 0.01, 16, 0, 0, 0.02, H], ...[0, 1, 2, 3, 4, 5].map(k => ['cyl', 'chrome', 0.008, 0.008, 0.02, 6, Math.cos(k) * 0.065, Math.sin(k) * 0.065, 0.045, H])];
  D.drain = [['rcyl', 'darkMetal', 0.6, 0.05, 0.01, 32, 0, 0.025, 0], ...[-0.4, -0.2, 0, 0.2, 0.4].map(x => ['box', 'socket', 0.04, 0.012, 0.9 - Math.abs(x), x, 0.052, 0]), ['rbox', 'chrome', 0.3, 0.05, 0.05, 0.01, 0, 0.07, 0]];

  // --- Warehouse
  D.crate = [['rbox', 'crateWood', 1.1, 1.0, 1.1, 0.01, 0, 0.5, 0], ...[0.08, 0.92].map(y => ['rbox', 'crateWood', 1.13, 0.1, 1.13, 0.006, 0, y, 0]), ['box', 'crateWood', 0.1, 0.9, 1.12, -0.5, 0.5, 0], ['box', 'crateWood', 0.1, 0.9, 1.12, 0.5, 0.5, 0], ['box', 'labelCard', 0.3, 0.2, 0.004, 0, 0.5, 0.567]];
  D.crateStack = D.crate.concat([['rbox', 'cardboard', 0.9, 0.7, 0.9, 0.01, 0.05, 1.35, 0, 0, 0.3], ['box', 'tape', 0.9, 0.004, 0.08, 0.05, 1.702, 0, 0, 0.3]]);
  D.barrel = [['lathe', 'barrelBlue', [[0.001, 0], [0.28, 0], [0.3, 0.03], [0.3, 0.2], [0.31, 0.22], [0.3, 0.24], [0.3, 0.66], [0.31, 0.68], [0.3, 0.7], [0.3, 0.87], [0.28, 0.9], [0.001, 0.9]], 28], ['cyl', 'barrelBlue', 0.03, 0.03, 0.02, 10, 0.15, 0.905, 0.05], ['cyl', 'barrelBlue', 0.02, 0.02, 0.02, 10, -0.15, 0.905, -0.05]];
  D.pallet = [['box', 'crateWood', 1.2, 0.025, 0.12, 0, 0.14, -0.44], ['box', 'crateWood', 1.2, 0.025, 0.12, 0, 0.14, -0.22], ['box', 'crateWood', 1.2, 0.025, 0.12, 0, 0.14, 0], ['box', 'crateWood', 1.2, 0.025, 0.12, 0, 0.14, 0.22], ['box', 'crateWood', 1.2, 0.025, 0.12, 0, 0.14, 0.44], ...[-0.55, 0, 0.55].map(x => ['box', 'crateWood', 0.1, 0.1, 1.0, x, 0.06, 0]), ['rbox', 'cardboard', 0.8, 0.4, 0.6, 0.01, 0.1, 0.36, 0], ['box', 'wrap', 0.82, 0.3, 0.62, 0.1, 0.33, 0]];
  D.pipe = [['cyl', 'darkMetal', 0.12, 0.12, 3, 16, 0, 0, 0, 0, 0, H], ['rcyl', 'darkMetal', 0.15, 0.06, 0.01, 16, -1.2, 0, 0, 0, 0, H], ['rcyl', 'darkMetal', 0.15, 0.06, 0.01, 16, 1.2, 0, 0, 0, 0, H]];

  // Pallet racking: perforated uprights with diagonal bracing, step beams, wire decks
  D.rack = (() => {
    const s = [];
    for (const x of [-1.4, 1.4]) {
      for (const z of [-1.2, -0.05, 0.05, 1.2]) s.push(['box', 'rackUpright', 0.08, 4.6, 0.07, x, 2.3, z]);
      for (const [za, zb] of [[-1.2, -0.05], [0.05, 1.2]]) {
        for (let y = 0.3; y < 4.3; y += 0.9) {
          const zc = (za + zb) / 2, len = Math.hypot(zb - za, 0.9);
          s.push(['box', 'rackBlue', 0.03, len, 0.025, x, y + 0.45, zc, Math.atan2(zb - za, 0.9) * ((y / 0.9 | 0) % 2 ? 1 : -1), 0, 0]);
        }
        s.push(['box', 'rackBlue', 0.03, 0.04, zb - za, x, 0.1, (za + zb) / 2], ['box', 'rackBlue', 0.03, 0.04, zb - za, x, 4.55, (za + zb) / 2]);
      }
      for (const z of [-1.2, 1.2]) s.push(['rbox', 'darkMetal', 0.16, 0.012, 0.14, 0.004, x, 0.006, z]);
    }
    for (const y of [0.15, 1.5, 2.85, 4.2]) for (const z of [-0.62, 0.62]) {
      s.push(['rbox', 'rackOrange', 2.74, 0.12, 0.05, 0.01, 0, y, z - 0.55], ['rbox', 'rackOrange', 2.74, 0.12, 0.05, 0.01, 0, y, z + 0.55]);
      s.push(['box', 'wireDeck', 2.7, 0.02, 1.08, 0, y + 0.07, z]);
    }
    return s;
  })();
  for (let v = 0; v < 3; v++) {
    D['rackGoods' + v] = (() => {
      const s = [], r = U.rng(7 + v * 31);
      for (const y of [0.25, 1.6, 2.95]) for (const z of [-0.62, 0.62]) for (let x = -0.85; x <= 0.85; x += 0.85) {
        if (r() < 0.22) continue;
        // Pallet
        s.push(['box', 'crateWood', 0.8, 0.1, 1.0, x, y + 0.05, z]);
        const kind = r();
        if (kind < 0.45) {
          // Shrink-wrapped stack of cartons
          const h = r.range(0.5, 1.0);
          s.push(['rbox', 'cardboard', 0.76, h, 0.96, 0.02, x, y + 0.1 + h / 2, z]);
          s.push(['box', 'wrap', 0.78, h * 0.9, 0.98, x, y + 0.1 + h * 0.46, z]);
          s.push(['box', 'tape', 0.77, 0.03, 0.08, x, y + 0.1 + h * 0.7, z]);
        } else if (kind < 0.7) {
          // Loose boxes
          for (let k = 0; k < 4; k++) { const bw = r.range(0.3, 0.4), bh = r.range(0.25, 0.4); s.push(['rbox', r() < 0.3 ? 'whitePlastic' : 'cardboard', bw, bh, r.range(0.3, 0.45), 0.012, x + (k % 2 ? 0.2 : -0.2), y + 0.1 + bh / 2 + (k > 1 ? 0.4 : 0), z + r.range(-0.25, 0.25), 0, r.range(-0.2, 0.2)]); }
        } else if (kind < 0.85) {
          for (const [bx, bz] of [[-0.18, -0.25], [0.18, -0.25], [-0.18, 0.25], [0.18, 0.25]]) s.push(['lathe', 'barrelBlue', [[0.001, 0], [0.17, 0], [0.18, 0.05], [0.18, 0.5], [0.17, 0.55], [0.001, 0.55]], 16, x + bx, y + 0.1, z + bz]);
        } else {
          for (let k = 0; k < 5; k++) s.push(['cyl', 'paperRoll', 0.12, 0.12, 0.9, 14, x, y + 0.22 + (k % 3) * 0.2, z - 0.35 + k * 0.17, H]);
        }
      }
      return s;
    })();
  }

  // --- Pool
  D.ladder = [
    ...[-0.3, 0.3].flatMap(x => [['tube', 'chrome', [[x, 0.2, -0.25], [x, 0.9, -0.25], [x, 1.15, -0.1], [x, 1.1, 0.12], [x, 0.9, 0.2], [x, 0.0, 0.2]], 0.022, 10, 40], ['rcyl', 'chrome', 0.04, 0.02, 0.005, 16, x, 0.005, 0.2]]),
    ...[-0.1, -0.35, -0.6].map(y => ['rbox', 'chrome', 0.62, 0.025, 0.1, 0.008, 0, y, -0.25]),
  ];
  D.lounger = [
    ['rbox', 'whitePlastic', 0.66, 0.04, 1.2, 0.015, 0, 0.35, 0.3],
    ['rbox', 'whitePlastic', 0.66, 0.04, 0.72, 0.015, 0, 0.58, -0.58, -0.75],
    ...[-0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75].map(z => ['box', 'socket', 0.6, 0.042, 0.02, 0, 0.35, z]),
    ...[[-0.3, 0.8], [0.3, 0.8], [-0.3, -0.25], [0.3, -0.25]].map(([x, z]) => ['rbox', 'whitePlastic', 0.05, 0.34, 0.05, 0.015, x, 0.17, z]),
    ['cyl', 'blackPlastic', 0.05, 0.05, 0.03, 12, -0.33, 0.06, 0.8, 0, 0, H], ['cyl', 'blackPlastic', 0.05, 0.05, 0.03, 12, 0.33, 0.06, 0.8, 0, 0, H],
    ['rbox', 'towel', 0.5, 0.02, 0.8, 0.01, 0, 0.38, 0.3],
  ];
  D.towelRack = [['cyl', 'chrome', 0.02, 0.02, 1.2, 10, -0.4, 0.6, 0], ['cyl', 'chrome', 0.02, 0.02, 1.2, 10, 0.4, 0.6, 0], ['cyl', 'chrome', 0.02, 0.02, 0.84, 10, 0, 1.1, 0, 0, 0, H], ['cyl', 'chrome', 0.02, 0.02, 0.84, 10, 0, 0.5, 0, 0, 0, H], ['ext', 'towel', [[-0.25, 0], [0.25, 0], [0.25, 0.7], [-0.25, 0.7]], 0.03, 0.01, 0, 0.42, 0.02, 0, 0, 0], ['rcyl', 'chrome', 0.05, 0.02, 0.005, 12, -0.4, 0.01, 0], ['rcyl', 'chrome', 0.05, 0.02, 0.005, 12, 0.4, 0.01, 0]];

  // --- Landmarks
  D.sleepingBag = [['cap', 'bagFabric', 0.32, 1.3, 0, 0.13, 0, H, 0, 0], ['rbox', 'bagFabric', 0.5, 0.1, 0.4, 0.05, 0, 0.12, -0.85], ['rcyl', 'darkMetal', 0.06, 0.25, 0.01, 12, 0.7, 0.125, 0.5], ['lathe', 'glassYellow', [[0.03, 0], [0.06, 0.05], [0.06, 0.12], [0.03, 0.16], [0, 0.16]], 12, 0.7, 0.25, 0.5], ['torus', 'darkMetal', 0.04, 0.004, 12, PI, 0.7, 0.41, 0.5, 0, 0, 0], ['box', 'cardboard', 0.3, 0.2, 0.25, -0.6, 0.1, 0.7, 0, 0.4], ['lathe', 'waterJug', [[0.03, 0], [0.035, 0.18], [0.012, 0.22], [0, 0.22]], 12, -0.3, 0, 0.9]];
  D.shrineAltar = [
    ['rbox', 'darkWood', 1.2, 0.8, 0.6, 0.02, 0, 0.4, 0],
    ['rbox', 'lace', 1.1, 0.01, 0.5, 0.004, 0, 0.805, 0],
    ...M.frame('brass', 0.4, 0.5, 0.03, 0.02, 0, 1.05, -0.15, -0.15),
    ['box', 'photoPlane', 0.34, 0.42, 0.01, 0, 1.05, -0.155, -0.15],
    ...[[-0.4, 0.1, 0.18], [0.4, 0.12, 0.12], [-0.3, -0.1, 0.1]].flatMap(([x, z, h]) => [['cyl', 'candle', 0.035, 0.04, h, 12, x, 0.81 + h / 2, z], ['lathe', 'candle', [[0.04, 0], [0.05, 0.01], [0.045, 0.02], [0, 0.02]], 12, x, 0.81, z]]),
    ['sph', 'pinkPlush', 0.07, 0.3, 0.88, -0.1, 10, 8, [1, 0.8, 1]],
  ];
  D.shrine = D.shrineAltar;
  D.stairsUp = (() => {
    const s = [];
    for (let k = 0; k < 12; k++) { s.push(['box', 'carpetStep', 1.4, 0.25, 0.3, 0, 0.125 + k * 0.25, 1.6 - k * 0.3]); s.push(['rbox', 'brass', 1.4, 0.02, 0.03, 0.005, 0, 0.25 + k * 0.25, 1.74 - k * 0.3]); }
    s.push(['box', 'wood', 0.05, 3.1, 3.6, 0.72, 1.55, 0]);
    s.push(['tube', 'woodVarnish', [[-0.68, 1.0, 1.7], [-0.68, 2.2, 0], [-0.68, 3.9, -1.8]], 0.025, 8]);
    for (let k = 0; k < 12; k += 2) s.push(['cyl', 'woodVarnish', 0.012, 0.012, 0.9, 6, -0.68, 0.25 + k * 0.25 + 0.45, 1.6 - k * 0.3]);
    return s;
  })();
  D.chairPile = (() => {
    const s = [];
    const r = U.rng(55);
    for (let k = 0; k < 14; k++) {
      const x = r.range(-1.6, 1.6), z = r.range(-1.6, 1.6), y = r.range(0.2, 1.6), ry = r.range(0, 6.28), rx = r.range(-1, 1);
      s.push(['rbox', 'redPlastic', 0.45, 0.04, 0.45, 0.015, x, y, z, rx, ry]);
      s.push(['rbox', 'redPlastic', 0.45, 0.36, 0.04, 0.015, x, y + 0.2, z - 0.2, rx, ry]);
      s.push(['cyl', 'chrome', 0.01, 0.01, 0.45, 6, x + 0.2, y - 0.2, z + 0.2, rx, ry]);
    }
    return s;
  })();

  // ------------------------------------------------------------ LIGHT FIXTURES
  // Each kind: glow parts (one emissive instanced mesh, brightness per instance), body parts (housing),
  // the glow texture, the base brightness and the vertical offset from the light position.
  const A19 = [[0.001, -0.13], [0.02, -0.125], [0.045, -0.1], [0.06, -0.07], [0.062, -0.05], [0.05, -0.02], [0.03, 0.0], [0.028, 0.02], [0.001, 0.02]];
  M.fixture = function (kind, ceil, lightY) {
    const drop = Math.max(0, ceil - lightY);
    switch (kind) {
      case 'panel': return {
        // 2x4 troffer: painted steel flange, deep lip, prismatic lens recessed inside, end caps
        glow: [['box', 'glow', 1.16, 0.004, 0.56, 0, -0.012, 0]],
        body: [
          ...M.frame('fixtureWhite', 1.24, 0.64, 0.045, 0.026, 0, -0.013, 0, -H, 0, 0.006),
          ['box', 'fixtureWhite', 1.2, 0.012, 0.6, 0, -0.004, 0],
          ['box', 'fixtureGrime', 1.16, 0.002, 0.02, 0, -0.0145, 0.285], ['box', 'fixtureGrime', 1.16, 0.002, 0.02, 0, -0.0145, -0.285],
        ],
        tex: 'troffer', base: 5.5, yOff: drop,
      };
      case 'poolPanel': return {
        // Vapor-tight fluorescent: grey housing with a frosted rounded lens and stainless clips
        glow: [['rbox', 'glow', 1.2, 0.07, 0.13, 0.03, 0, -0.1, 0]],
        body: [
          ['rbox', 'fixtureGrey', 1.3, 0.07, 0.16, 0.02, 0, -0.045, 0],
          ...[-0.45, 0, 0.45].map(x => ['rbox', 'chrome', 0.03, 0.09, 0.17, 0.006, x, -0.09, 0]),
          ['rcyl', 'fixtureGrey', 0.06, 0.02, 0.006, 12, 0.7, -0.03, 0, 0, 0, H], ['tube', 'darkMetal', [[0.7, -0.03, 0], [0.9, -0.01, 0], [1.1, -0.004, 0]], 0.008, 6],
        ],
        tex: 'opal', base: 3.2, yOff: drop,
      };
      case 'hanging': {
        // Industrial enamel pendant on a chain
        const len = Math.max(0.1, drop - 0.37);
        const chain = [];
        for (let k = 0; k * 0.05 < len - 0.05; k++) chain.push(['torus', 'darkMetal', 0.012, 0.003, 8, 0, 0, 0.36 + len - k * 0.05, 0, 0, (k % 2) * H, 0]);
        return {
          glow: [['lathe', 'glow', A19, 16, 0, 0.12, 0]],
          body: [
            ['lathe', 'enamel', [[0.03, 0.34], [0.05, 0.3], [0.12, 0.22], [0.26, 0.1], [0.33, 0.02], [0.34, 0.0]], 32],
            ['lathe', 'enamelIn', [[0.335, 0.0], [0.32, 0.02], [0.25, 0.1], [0.11, 0.22], [0.045, 0.29], [0.02, 0.32]], 32],
            ['torus', 'darkMetal', 0.34, 0.008, 32, 0, 0, 0, 0, H, 0, 0],
            ['rcyl', 'blackPlastic', 0.03, 0.12, 0.01, 12, 0, 0.2, 0],
            ['rcyl', 'darkMetal', 0.035, 0.05, 0.01, 12, 0, 0.36, 0],
            ...chain,
            ['rcyl', 'darkMetal', 0.07, 0.03, 0.01, 16, 0, 0.36 + len + 0.01, 0],
          ],
          tex: null, base: 7, yOff: drop - 0.37 - len,
        };
      }
      case 'bulb': case 'shrine': {
        // Bare bulb on a twisted cord with a bakelite socket
        const len = Math.max(0.15, drop - 0.05);
        return {
          glow: [['lathe', 'glow', A19, 16, 0, 0, 0]],
          body: [
            ['lathe', 'bakelite', [[0.001, 0.02], [0.03, 0.02], [0.032, 0.05], [0.028, 0.1], [0.012, 0.12], [0.001, 0.12]], 16],
            ['cyl', 'blackPlastic', 0.005, 0.005, len - 0.12, 6, 0, 0.12 + (len - 0.12) / 2, 0],
            ['rcyl', 'bakelite', 0.045, 0.03, 0.01, 16, 0, len, 0],
          ],
          tex: null, base: kind === 'shrine' ? 5 : 6, yOff: drop - len,
        };
      }
      case 'spot': return {
        // Track spotlight: ribbed can on a yoke, lens recessed in the can
        glow: [['disc', 'glow', 0.07, 0, -0.2, 0, H]],
        body: [
          ['lathe', 'blackMetal', [[0.08, -0.21], [0.095, -0.2], [0.095, -0.02], [0.07, 0.0], [0.001, 0.0]], 24],
          ['lathe', 'blackMetal', [[0.075, -0.05], [0.088, -0.205], [0.08, -0.21]], 24],
          ...[-0.06, -0.09, -0.12, -0.15].map(y => ['torus', 'blackMetal', 0.097, 0.004, 24, 0, 0, y, 0, H, 0, 0]),
          ['box', 'blackMetal', 0.012, 0.16, 0.03, -0.105, 0.0, 0], ['box', 'blackMetal', 0.012, 0.16, 0.03, 0.105, 0.0, 0],
          ['box', 'blackMetal', 0.222, 0.012, 0.03, 0, 0.075, 0],
          ['rbox', 'blackMetal', 0.3, 0.035, 0.04, 0.01, 0, 0.1, 0],
        ],
        tex: null, base: 5, yOff: drop - 0.118,
      };
      case 'lamp': return { glow: [['sph', 'glow', 0.028, 0, 0, 0, 12, 8]], body: [], tex: null, base: 4, yOff: 0 };
      case 'cage': return {
        // Bulkhead: cast base, glass dome, wire cage
        glow: [['lathe', 'glow', [[0.08, 0], [0.078, -0.06], [0.06, -0.11], [0.03, -0.135], [0.001, -0.14]], 20, 0, -0.03, 0]],
        body: [
          ['lathe', 'darkMetal', [[0.001, 0.0], [0.11, 0.0], [0.115, -0.02], [0.09, -0.035], [0.001, -0.035]], 20],
          ...[-0.06, -0.11].map((y, k) => ['torus', 'darkMetal', k ? 0.07 : 0.088, 0.004, 20, 0, 0, y, 0, H, 0, 0]),
          ...[0, 1, 2, 3].map(k => ['tube', 'darkMetal', [[Math.cos(k * H) * 0.09, -0.03, Math.sin(k * H) * 0.09], [Math.cos(k * H) * 0.088, -0.09, Math.sin(k * H) * 0.088], [Math.cos(k * H) * 0.05, -0.15, Math.sin(k * H) * 0.05], [0, -0.165, 0]], 0.004, 4]),
        ],
        tex: null, base: 5, yOff: drop,
      };
      case 'exitSign': return {
        glow: [['plane', 'glow', 0.4, 0.14, 0, 0, 0.032], ['plane', 'glow', 0.4, 0.14, 0, 0, -0.032, 0, PI]],
        body: [['rbox', 'fixtureWhite', 0.48, 0.2, 0.06, 0.012, 0, 0, 0]].concat(drop > 0.15 ? [['cyl', 'fixtureWhite', 0.012, 0.012, drop - 0.1, 8, 0, 0.1 + (drop - 0.1) / 2, 0], ['rcyl', 'fixtureWhite', 0.04, 0.012, 0.004, 12, 0, drop - 0.006, 0]] : []),
        tex: 'exit', base: 1.8, yOff: 0,
      };
      case 'neon': return { glow: [['plane', 'glow', 3.2, 0.8, 0, 0, 0]], body: [], tex: 'neon', base: 3, yOff: 0, transparent: true };
      default: return null;
    }
  };

  // --- Carryable items
  D.flashlight = [['lathe', 'blackPlastic', [[0.001, -0.12], [0.022, -0.12], [0.025, -0.1], [0.025, 0.05], [0.04, 0.09], [0.045, 0.12], [0.001, 0.12]], 16, 0, 0.045, 0, 0, 0, -H], ['rcyl', 'chrome', 0.046, 0.012, 0.004, 16, 0.12, 0.045, 0, 0, 0, H], ['disc', 'glassYellow', 0.036, 0.127, 0.045, 0, 0, H], ['box', 'rubber', 0.03, 0.012, 0.02, -0.02, 0.07, 0]];
  D.token = [['rcyl', 'brass', 0.03, 0.005, 0.0015, 24, 0, 0.003, 0], ['torus', 'brass', 0.026, 0.0012, 20, 0, 0, 0.0055, 0, H, 0, 0]];
  D.tape = [['rbox', 'blackPlastic', 0.32, 0.1, 0.18, 0.02, 0, 0.05, 0], ['rbox', 'chrome', 0.12, 0.02, 0.13, 0.005, -0.06, 0.1, 0], ['rbox', 'redPlastic', 0.03, 0.012, 0.03, 0.004, 0.1, 0.103, 0.05], ...[0.02, 0.05, 0.08].map(x => ['rbox', 'darkMetal', 0.022, 0.012, 0.03, 0.004, x, 0.103, 0.05]), ['box', 'cassette', 0.1, 0.012, 0.064, -0.06, 0.112, 0], ['box', 'grille', 0.1, 0.004, 0.08, 0.08, 0.1, -0.03], ['cyl', 'chrome', 0.004, 0.004, 0.18, 6, 0.13, 0.19, -0.07]];
  D.battery = [['cyl', 'batteryBody', 0.017, 0.017, 0.06, 16, 0, 0.018, 0, 0, 0, H], ['cyl', 'batteryTop', 0.0172, 0.0172, 0.018, 16, -0.021, 0.018, 0, 0, 0, H], ['cyl', 'chrome', 0.006, 0.006, 0.006, 8, 0.033, 0.018, 0, 0, 0, H]];
  D.almond = [['lathe', 'waterJug', [[0.001, 0], [0.034, 0], [0.036, 0.01], [0.036, 0.15], [0.02, 0.19], [0.014, 0.2], [0.014, 0.215], [0.001, 0.215]], 16], ['rcyl', 'whitePlastic', 0.016, 0.022, 0.004, 12, 0, 0.225, 0], ['cyl', 'almondLabel', 0.0365, 0.0365, 0.08, 16, 0, 0.08, 0, 0, 0, 0, true]];
  D.glowstick = [['cap', 'glowGreen', 0.011, 0.14, 0, 0.012, 0, 0, 0, H], ['torus', 'whitePlastic', 0.012, 0.003, 8, 0, 0.085, 0.012, 0, 0, H, 0]];
  D.fuse = [['cyl', 'ceramic', 0.03, 0.03, 0.12, 16, 0, 0.032, 0, 0, 0, H], ['rcyl', 'brass', 0.033, 0.022, 0.004, 16, 0.065, 0.032, 0, 0, 0, H], ['rcyl', 'brass', 0.033, 0.022, 0.004, 16, -0.065, 0.032, 0, 0, 0, H], ['box', 'labelCard', 0.05, 0.002, 0.03, 0, 0.063, 0]];
  D.fuelCan = [['rbox', 'redPlastic', 0.3, 0.36, 0.16, 0.04, 0, 0.18, 0], ['ext', 'redPlastic', [[-0.1, 0], [0.06, 0], [0.06, 0.07], [-0.1, 0.07]], 0.03, 0.01, 0.02, 0.37, 0, 0, 0, 0], ['lathe', 'blackPlastic', [[0.025, 0], [0.025, 0.05], [0.012, 0.08], [0, 0.08]], 12, -0.1, 0.34, 0, 0, 0, 0.5], ['box', 'labelCard', 0.14, 0.1, 0.002, 0, 0.2, 0.081]];
  D.keycard = [['rbox', 'whitePlastic', 0.085, 0.002, 0.054, 0.0008, 0, 0.001, 0], ['box', 'bluePlastic', 0.085, 0.0022, 0.015, 0, 0.001, -0.015], ['box', 'brass', 0.012, 0.0024, 0.01, -0.025, 0.001, 0.008]];
  D.key = [['torus', 'brass', 0.015, 0.004, 12, 0, 0, 0.004, 0, H, 0, 0], ['box', 'brass', 0.05, 0.004, 0.008, 0.035, 0.004, 0]];
  D.watch = [['torus', 'leather', 0.03, 0.006, 16, 0, 0, 0.006, 0, H, 0, 0], ['rcyl', 'chrome', 0.022, 0.009, 0.003, 20, 0, 0.008, 0], ['disc', 'paper', 0.018, 0, 0.0126, 0, -H], ['box', 'socket', 0.001, 0.001, 0.014, 0, 0.013, -0.005]];
  D.memento = D.watch;
  D.glasses = [['torus', 'darkMetal', 0.028, 0.004, 16, 0, -0.035, 0.03, 0, 0, 0, 0], ['torus', 'darkMetal', 0.028, 0.004, 16, 0, 0.035, 0.03, 0, 0, 0, 0], ['disc', 'glass', 0.026, -0.035, 0.03, 0, 0, 0], ['disc', 'glass', 0.026, 0.035, 0.03, 0, 0, 0], ['tube', 'darkMetal', [[-0.007, 0.035, 0], [0, 0.04, 0], [0.007, 0.035, 0]], 0.003, 5], ['box', 'darkMetal', 0.004, 0.004, 0.12, -0.065, 0.03, -0.06], ['box', 'darkMetal', 0.004, 0.004, 0.12, 0.065, 0.03, -0.06]];
  D.walkie = [['rbox', 'blackPlastic', 0.07, 0.04, 0.2, 0.01, 0, 0.02, 0], ['box', 'grille', 0.05, 0.004, 0.07, 0, 0.042, 0.04], ['cyl', 'blackPlastic', 0.006, 0.004, 0.16, 8, 0.02, 0.025, -0.17, H, 0, 0], ['rcyl', 'redPlastic', 0.009, 0.012, 0.003, 10, -0.022, 0.04, -0.07, 0, 0, 0], ['rcyl', 'darkMetal', 0.008, 0.014, 0.003, 10, 0.022, 0.045, -0.085], ['box', 'lcd', 0.03, 0.003, 0.02, 0, 0.041, -0.03]];
  D.walkman = [['rbox', 'pinkPlastic', 0.11, 0.03, 0.08, 0.008, 0, 0.015, 0], ['box', 'cassette', 0.08, 0.004, 0.05, 0, 0.031, 0], ['torus', 'blackPlastic', 0.07, 0.005, 16, PI, 0, 0.005, -0.1, H, 0, 0], ['sph', 'blackFabric', 0.02, -0.07, 0.005, -0.1, 8, 6, [1, 0.5, 1]], ['sph', 'blackFabric', 0.02, 0.07, 0.005, -0.1, 8, 6, [1, 0.5, 1]]];
  D.lighter = [['rbox', 'chrome', 0.035, 0.055, 0.012, 0.004, 0, 0.0275, 0], ['rbox', 'brass', 0.035, 0.015, 0.012, 0.004, 0, 0.062, 0], ['cyl', 'darkMetal', 0.005, 0.005, 0.01, 8, 0.008, 0.074, 0, H]];
  D.note = [['box', 'paper', 0.21, 0.003, 0.29, 0, 0.0015, 0]];
  D.codeClue = D.note;
})(typeof window !== 'undefined' ? window : globalThis);
