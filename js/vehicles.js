/* Vehicles: 1980s American cars built as lofted bodies instead of boxes.
   A body is a series of cross-sections (stations) along the length; each section is a rounded
   rectangle whose width, bottom and top follow the car's side profile, so the surfaces bend the way
   sheet metal does. Wheel arches are cut by lifting the bottom edge over each wheel. The greenhouse
   (windshield, side glass, rear window, pillars, roof) is a second loft whose faces are assigned
   paint or glass by where they sit. Tires and rims are lathed, and every car gets a paint texture
   with door seams, a body crease, dirt and rust.
   Front is +x, up is +y, width along z. Ground contact at y = 0. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, T = PB.Tex;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ GEOMETRY HELPERS
  class Parts {
    constructor() { this.m = new Map(); }
    buf(mat) { let b = this.m.get(mat); if (!b) { b = { p: [], n: [], uv: [] }; this.m.set(mat, b); } return b; }
    tri(mat, a, b, c, ua, ub, uc) {
      const B = this.buf(mat);
      const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
      let nx = e1[1] * e2[2] - e1[2] * e2[1], ny = e1[2] * e2[0] - e1[0] * e2[2], nz = e1[0] * e2[1] - e1[1] * e2[0];
      const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
      for (const v of [a, b, c]) B.p.push(v[0], v[1], v[2]);
      for (let k = 0; k < 3; k++) B.n.push(nx, ny, nz);
      for (const t of [ua, ub, uc]) B.uv.push(t[0], t[1]);
    }
    // Smooth-shaded quad strip: vertex normals are supplied
    quadN(mat, v, n, uv) {
      const B = this.buf(mat);
      for (const k of [0, 1, 2, 0, 2, 3]) { B.p.push(v[k][0], v[k][1], v[k][2]); B.n.push(n[k][0], n[k][1], n[k][2]); B.uv.push(uv[k][0], uv[k][1]); }
    }
    add(mat, geo, m4) {
      const g = geo.index ? geo.toNonIndexed() : geo;
      if (m4) g.applyMatrix4(m4);
      const B = this.buf(mat), p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv;
      for (let i = 0; i < p.count; i++) {
        B.p.push(p.getX(i), p.getY(i), p.getZ(i)); B.n.push(n.getX(i), n.getY(i), n.getZ(i));
        B.uv.push(uv ? uv.getX(i) : 0, uv ? uv.getY(i) : 0);
      }
      g.dispose();
    }
    build() {
      const out = [];
      for (const [mat, b] of this.m) {
        if (!b.p.length) continue;
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3));
        g.setAttribute('normal', new THREE.Float32BufferAttribute(b.n, 3));
        g.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2));
        g.computeBoundingSphere();
        out.push({ mat, geo: g });
      }
      return out;
    }
  }
  const M4 = (x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));
  const rbox = (w, h, d, r) => PB.Models.roundedBox(w, h, d, r, 2);

  // Rounded-rectangle cross-section (in the zy plane) as a closed ring of points, bottom-center first,
  // going round through +z (right side), top, -z. rb/rt: bottom and top corner radii.
  function section(hwB, hwT, y0, y1, rb, rt, n) {
    const pts = [];
    const h = y1 - y0;
    rb = Math.min(rb, hwB * 0.9, h * 0.45); rt = Math.min(rt, hwT * 0.9, h * 0.45);
    // Outline: bottom edge, bottom-right corner, side (leaning in from hwB to hwT), top-right corner, top, and mirror
    const path = [];
    const q = Math.max(2, n >> 3);
    path.push([0, y0]);
    for (let k = 0; k <= q; k++) { const a = -H + k / q * H; path.push([hwB - rb + Math.cos(a) * rb, y0 + rb + Math.sin(a) * rb]); }
    for (let k = 0; k <= q; k++) { const a = k / q * H; path.push([hwT - rt + Math.cos(a) * rt, y1 - rt + Math.sin(a) * rt]); }
    path.push([0, y1]);
    // Resample the half outline to n/2 points by arc length, then mirror
    const len = [0];
    for (let i = 1; i < path.length; i++) len.push(len[i - 1] + Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]));
    const L = len[len.length - 1], half = n >> 1, res = [];
    for (let k = 0; k <= half; k++) {
      const s = k / half * L;
      let i = 1; while (i < len.length - 1 && len[i] < s) i++;
      const t = (s - len[i - 1]) / Math.max(1e-6, len[i] - len[i - 1]);
      res.push([path[i - 1][0] + (path[i][0] - path[i - 1][0]) * t, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * t]);
    }
    for (const p of res) pts.push([p[0], p[1]]);
    for (let k = half - 1; k >= 1; k--) pts.push([-res[k][0], res[k][1]]);
    return pts; // length n
  }
  // Loft rings (each: {x, pts:[[z,y]...]}) into smooth quads. matFn(ring index i, point index j, x) picks material.
  function loft(parts, rings, matFn, uvFn, closeEnds) {
    const n = rings[0].pts.length;
    const P = rings.map(r => r.pts.map(p => [r.x, p[1], p[0]]));
    // Vertex normals by central differences around and along
    const N = P.map((ring, i) => ring.map((v, j) => {
      const a = ring[(j + 1) % n], b = ring[(j - 1 + n) % n];
      const c = P[Math.min(P.length - 1, i + 1)][j], d = P[Math.max(0, i - 1)][j];
      const t1 = [a[0] - b[0], a[1] - b[1], a[2] - b[2]], t2 = [c[0] - d[0], c[1] - d[1], c[2] - d[2]];
      let nx = t1[1] * t2[2] - t1[2] * t2[1], ny = t1[2] * t2[0] - t1[0] * t2[2], nz = t1[0] * t2[1] - t1[1] * t2[0];
      const l = Math.hypot(nx, ny, nz) || 1;
      return [-nx / l, -ny / l, -nz / l];
    }));
    for (let i = 0; i < P.length - 1; i++) for (let j = 0; j < n; j++) {
      const j2 = (j + 1) % n;
      const mat = matFn(i, j, (P[i][j][0] + P[i + 1][j][0]) / 2);
      if (!mat) continue;
      const v = [P[i][j], P[i][j2], P[i + 1][j2], P[i + 1][j]];
      const nn = [N[i][j], N[i][j2], N[i + 1][j2], N[i + 1][j]];
      parts.quadN(mat, v, nn, v.map(p => uvFn(p)));
    }
    if (closeEnds) for (const [i, flip] of [[0, true], [P.length - 1, false]]) {
      const ring = P[i], c = ring.reduce((a, p) => [a[0] + p[0] / n, a[1] + p[1] / n, a[2] + p[2] / n], [0, 0, 0]);
      const mat = closeEnds;
      for (let j = 0; j < n; j++) {
        const a = ring[j], b = ring[(j + 1) % n];
        if (flip) parts.tri(mat, c, a, b, uvFn(c), uvFn(a), uvFn(b)); else parts.tri(mat, c, b, a, uvFn(c), uvFn(b), uvFn(a));
      }
    }
  }
  const lerp = (a, b, t) => a + (b - a) * t;
  // Piecewise-linear profile [[x, v], ...] sampled at x (smoothstep between keys)
  function prof(keys, x) {
    if (x <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) if (x <= keys[i][0]) { const t = (x - keys[i - 1][0]) / (keys[i][0] - keys[i - 1][0]); const s = t * t * (3 - 2 * t); return lerp(keys[i - 1][1], keys[i][1], s); }
    return keys[keys.length - 1][1];
  }

  // ------------------------------------------------------------ BODY TYPES
  // Proportions of a 1980s full-size sedan, wagon, pickup and cargo van (meters)
  const TYPES = {
    sedan: { len: 5.3, hw: 0.92, wheelR: 0.34, wb: [1.45, -1.55], belt: 0.95, bottom: 0.26, nose: 0.72, tail: 0.86,
      hood: [[2.65, 0.74], [2.4, 0.84], [1.3, 0.9], [1.0, 0.93]], deck: [[-1.6, 0.95], [-2.45, 0.93], [-2.65, 0.84]],
      cabin: { a: 1.0, b: 0.3, c: -0.95, d: -1.62, roof: 1.39, tumble: 0.11 } },
    wagon: { len: 5.5, hw: 0.93, wheelR: 0.35, wb: [1.45, -1.6], belt: 0.96, bottom: 0.27, nose: 0.73, tail: 0.95,
      hood: [[2.75, 0.75], [2.5, 0.85], [1.4, 0.91], [1.1, 0.94]], deck: [[-2.55, 0.96], [-2.75, 0.9]],
      cabin: { a: 1.1, b: 0.4, c: -2.5, d: -2.62, roof: 1.44, tumble: 0.1, wagon: true } },
    pickup: { len: 5.2, hw: 0.94, wheelR: 0.38, wb: [1.6, -1.6], belt: 1.05, bottom: 0.34, nose: 0.85, tail: 0.95,
      hood: [[2.6, 0.86], [2.4, 0.97], [1.3, 1.02], [1.0, 1.05]], deck: [[-2.6, 1.05]],
      cabin: { a: 0.95, b: 0.55, c: -0.25, d: -0.35, roof: 1.78, tumble: 0.08, bed: -0.45 } },
    van: { len: 5.0, hw: 1.0, wheelR: 0.36, wb: [1.55, -1.6], belt: 1.1, bottom: 0.3, nose: 0.9, tail: 1.9,
      hood: [[2.5, 0.9], [2.3, 1.0], [1.7, 1.08], [1.45, 1.12]], deck: [[-2.5, 1.95]],
      cabin: { a: 1.45, b: 0.95, c: -2.4, d: -2.5, roof: 2.0, tumble: 0.05, van: true } },
  };

  // ------------------------------------------------------------ TEXTURES
  const TX = {
    // Paint with panel seams, a body crease, road dirt along the bottom, rust around the arches.
    // Mapped by (x along the car, y up) on both sides.
    paint(key, color, o) {
      return T.canvas('veh:paint:' + key, 1024, 512, (g, w, h) => {
        const r = U.rng(U.hashStr(key));
        const cr = (color >> 16) & 255, cg = (color >> 8) & 255, cb = color & 255;
        const css = (k, a = 1) => `rgba(${Math.min(255, cr * k) | 0},${Math.min(255, cg * k) | 0},${Math.min(255, cb * k) | 0},${a})`;
        g.fillStyle = css(1); g.fillRect(0, 0, w, h);
        // Orange peel and slight fade on top surfaces
        for (let k = 0; k < 9000; k++) { g.fillStyle = r() < 0.5 ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.03)'; g.fillRect(r() * w, r() * h, 2, 2); }
        const fade = g.createLinearGradient(0, 0, 0, h); fade.addColorStop(0, 'rgba(255,255,255,0.07)'); fade.addColorStop(0.5, 'rgba(255,255,255,0)'); g.fillStyle = fade; g.fillRect(0, 0, w, h);
        const X = x => (x / o.len + 0.5) * w, Y = y => h - y / 2.1 * h;
        // Panel seams (doors, hood, trunk, fuel door)
        g.strokeStyle = 'rgba(0,0,0,0.75)'; g.lineWidth = 2.2;
        const seam = (x0, y0, x1, y1) => { g.beginPath(); g.moveTo(X(x0), Y(y0)); g.lineTo(X(x1), Y(y1)); g.stroke(); };
        for (const x of o.doors) seam(x, o.bottom + 0.08, x, o.belt + 0.02);
        seam(o.doors[0], o.belt + 0.02, o.doors[o.doors.length - 1], o.belt + 0.02);
        seam(o.doors[0], o.bottom + 0.08, o.doors[o.doors.length - 1], o.bottom + 0.08);
        // Body crease: a highlight over a shadow line
        const cy = lerp(o.bottom, o.belt, 0.62);
        g.strokeStyle = 'rgba(255,255,255,0.22)'; g.lineWidth = 3; seam(o.len / 2 - 0.1, cy + 0.012, -o.len / 2 + 0.1, cy + 0.012);
        g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 2; seam(o.len / 2 - 0.1, cy - 0.006, -o.len / 2 + 0.1, cy - 0.006);
        // Fuel door
        g.strokeStyle = 'rgba(0,0,0,0.6)'; g.lineWidth = 1.5; g.strokeRect(X(-1.9), Y(o.belt - 0.12), 26, 22);
        // Road grime: darker toward the bottom, spray behind each wheel
        const grime = g.createLinearGradient(0, Y(o.bottom + 0.45), 0, Y(o.bottom)); grime.addColorStop(0, 'rgba(40,32,24,0)'); grime.addColorStop(1, 'rgba(40,32,24,0.55)');
        g.fillStyle = grime; g.fillRect(0, 0, w, h);
        for (const wx of o.wb) {
          for (let k = 0; k < 220; k++) { const x = X(wx - 0.2 - r() * 0.9), y = Y(o.bottom + r() * 0.5 * (1 - r())); g.fillStyle = `rgba(50,40,30,${r() * 0.25})`; g.fillRect(x, y, 1 + r() * 3, 1 + r() * 2); }
          // Rust blisters around the arch
          if (o.rust) for (let k = 0; k < 40 * o.rust; k++) { const a = r() * PI, rr = (o.wheelR + 0.12 + r() * 0.08); const x = X(wx + Math.cos(a) * rr), y = Y(o.bottom + Math.sin(a) * rr * 0.9); g.fillStyle = `rgba(${90 + r() * 50 | 0},${45 + r() * 20 | 0},20,${0.4 + r() * 0.5})`; g.beginPath(); g.arc(x, y, 1 + r() * 4, 0, PI * 2); g.fill(); }
        }
        // Scratches and a dent shadow
        g.strokeStyle = 'rgba(255,255,255,0.18)'; g.lineWidth = 1;
        for (let k = 0; k < 12; k++) { const x = r() * w, y = Y(o.bottom + 0.2 + r() * 0.5); g.beginPath(); g.moveTo(x, y); g.lineTo(x + r.range(-40, 40), y + r.range(-3, 3)); g.stroke(); }
      }, { readback: false });
    },
    tread() {
      return T.canvas('veh:tread', 64, 256, (g, w, h) => {
        g.fillStyle = '#181819'; g.fillRect(0, 0, w, h);
        g.fillStyle = '#0a0a0b';
        for (let y = 0; y < h; y += 10) { g.fillRect(4, y, 22, 4); g.fillRect(38, y + 5, 22, 4); }
        g.fillRect(29, 0, 6, h);
      }, { repeat: true });
    },
    sidewall() {
      return T.canvas('veh:sidewall', 256, 256, (g, w, h) => {
        g.fillStyle = '#141415'; g.fillRect(0, 0, w, h);
        g.save(); g.translate(w / 2, h / 2);
        g.fillStyle = 'rgba(200,200,200,0.35)'; g.font = `bold 16px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center';
        const txt = 'GOODRIDE  P215/75R15  RADIAL  TUBELESS  ';
        for (let k = 0; k < txt.length; k++) { g.save(); g.rotate(k / txt.length * PI * 2); g.fillText(txt[k], 0, -h * 0.42); g.restore(); }
        g.restore();
      });
    },
    plate(text) {
      return T.canvas('veh:plate:' + text, 256, 128, (g, w, h) => {
        g.fillStyle = '#f0ece0'; g.fillRect(0, 0, w, h);
        g.fillStyle = '#1a3a8a'; g.font = `bold 20px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText('ILLINOIS', w / 2, 26);
        g.fillStyle = '#111'; g.font = `bold 54px ${T.FONTS.FONT_TYPE}`; g.fillText(text, w / 2, 92);
        g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(0, h - 22, w, 22);
        g.strokeStyle = '#333'; g.lineWidth = 4; g.strokeRect(2, 2, w - 4, h - 4);
      });
    },
    vanSide(text) {
      return T.canvas('veh:van:' + text, 1024, 512, (g, w, h) => {
        g.fillStyle = '#e4e2da'; g.fillRect(0, 0, w, h);
        for (let k = 0; k < 6000; k++) { g.fillStyle = Math.random() < 0.5 ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); }
        g.fillStyle = '#b01818'; g.font = `bold 58px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center';
        g.fillText(text, w * 0.42, h * 0.46);
        g.fillStyle = '#222'; g.font = `26px ${T.FONTS.FONT_TYPE}`; g.fillText('AMUSEMENT MACHINES · SALES · SERVICE · (815) 555-0187', w * 0.42, h * 0.56);
        const grime = g.createLinearGradient(0, h * 0.62, 0, h); grime.addColorStop(0, 'rgba(60,50,40,0)'); grime.addColorStop(1, 'rgba(60,50,40,0.6)'); g.fillStyle = grime; g.fillRect(0, 0, w, h);
      });
    },
  };

  // ------------------------------------------------------------ CAR BUILDER
  // o: { type, color, key, plate, rust, lit, text }
  function buildCar(o) {
    const t = TYPES[o.type] || TYPES.sedan;
    const parts = new Parts();
    const L2 = t.len / 2, hw = t.hw, R = t.wheelR, cab = t.cabin;
    const uvBody = p => [p[0] / t.len + 0.5, p[1] / 2.1];
    // ---- Lower body: side profile keys (top edge follows hood / belt / deck)
    const topKeys = [...t.hood, [cab.a - 0.05, t.belt], [cab.d + 0.05, t.belt], ...t.deck];
    topKeys.sort((a, b) => b[0] - a[0]);
    const topAt = x => prof(topKeys.map(k => [-k[0], k[1]]), -x);
    const noseDrop = x => { const f = (x - (L2 - 0.12)) / 0.12, b = ((-L2 + 0.12) - x) / 0.12; return Math.max(0, f, b); };
    const rings = [];
    const NS = 64, NR = 28;
    for (let k = 0; k <= NS; k++) {
      const x = L2 - k / NS * t.len;
      const end = noseDrop(x);
      let y0 = t.bottom + end * 0.1;
      // Wheel arches: lift the bottom edge over each wheel
      for (const wx of t.wb) { const dx = Math.abs(x - wx), Ra = R + 0.09; if (dx < Ra) y0 = Math.max(y0, R + Math.sqrt(Ra * Ra - dx * dx) * 0.98 - 0.02); }
      const y1 = topAt(x) - end * 0.04;
      const hwx = hw - end * 0.06 - (x > L2 - 0.9 ? (x - (L2 - 0.9)) * 0.05 : 0);
      rings.push({ x, pts: section(hwx, hwx - 0.05, y0, y1, 0.06, 0.08, NR) });
    }
    // Paint on the whole lower body; the painted texture carries seams
    loft(parts, rings, () => 'paint', uvBody, 'paint');
    // Inner fenders and chassis: dark, block the view under the car
    parts.add('under', rbox(t.len - 0.9, 0.22, hw * 2 - 0.5, 0.05), M4(0, t.bottom + 0.05, 0));
    for (const wx of t.wb) parts.add('under', new THREE.CylinderGeometry(R + 0.08, R + 0.08, hw * 2 - 0.1, 20, 1, true, 0, PI), M4(wx, R, 0, H, 0, 0));
    // ---- Greenhouse: windshield, roof, side glass, rear window
    const tb = cab.tumble;
    const gh = [];
    const G = 26;
    const stationsX = [];
    const segs = [[cab.a, cab.b, 7], [cab.b, cab.c, 10], [cab.c, cab.d, 7]];
    for (const [a, b, n] of segs) for (let k = 0; k < n; k++) stationsX.push(lerp(a, b, k / n));
    stationsX.push(cab.d);
    for (const x of stationsX) {
      let y1;
      if (x > cab.b) y1 = lerp(t.belt + 0.02, cab.roof, (cab.a - x) / (cab.a - cab.b));
      else if (x < cab.c) y1 = lerp(cab.roof, t.belt + 0.02, (cab.c - x) / (cab.c - cab.d));
      else y1 = cab.roof + Math.sin((x - cab.c) / (cab.b - cab.c) * PI) * 0.012;
      y1 = Math.max(y1, t.belt + 0.03);
      const hwB = hw - tb, hwT = hw - tb - 0.13;
      gh.push({ x, pts: section(hwB, hwT, t.belt - 0.02, y1, 0.02, 0.1, G) });
    }
    const nA = segs[0][2], nB = nA + segs[1][2];
    const roofRange = j => { const q = j / G; return q > 0.36 && q < 0.64; };   // top of the ring
    const bottom = j => { const q = j / G; return q < 0.12 || q > 0.88; };
    const bx = cab.van ? null : lerp(cab.b, cab.c, cab.wagon ? 0.35 : 0.45);   // B pillar
    const cx2 = cab.wagon ? lerp(cab.b, cab.c, 0.72) : null;                     // wagon C pillar
    const pillarW = 0.07;
    loft(parts, gh, (i, j, x) => {
      if (bottom(j)) return null;
      const q = j / G, sideEdge = (q > 0.3 && q < 0.37) || (q > 0.63 && q < 0.7);
      if (i < nA) return sideEdge ? 'paint' : roofRange(j) || (q > 0.3 && q < 0.7) ? 'glass' : 'glass';
      if (i >= nB) return sideEdge ? 'paint' : cab.van || cab.bed != null ? 'paint' : 'glass';
      if (roofRange(j) || sideEdge) return 'paint';
      if (bx != null && Math.abs(x - bx) < pillarW) return 'paint';
      if (cx2 != null && Math.abs(x - cx2) < pillarW) return 'paint';
      if (cab.van && x < cab.b - 0.55) return 'paint';     // cargo van: no windows behind the doors
      if (Math.abs(x - cab.a) < 0.05 || Math.abs(x - cab.c) < 0.04) return 'paint';
      return 'glass';
    }, uvBody, null);
    // Rear of the greenhouse closes onto the deck (pickup cab back wall, van rear doors)
    if (cab.bed != null || cab.van) {
      const last = gh[gh.length - 1];
      const ring = last.pts.map(p => [last.x, p[1], p[0]]);
      const c = ring.reduce((a, p) => [a[0] + p[0] / ring.length, a[1] + p[1] / ring.length, a[2] + p[2] / ring.length], [0, 0, 0]);
      for (let j = 0; j < ring.length; j++) parts.tri('paint', c, ring[(j + 1) % ring.length], ring[j], uvBody(c), uvBody(ring[j]), uvBody(ring[j]));
      if (cab.bed != null) parts.add('glass', new THREE.PlaneGeometry(1.1, 0.34), M4(last.x - 0.005, t.belt + 0.33, 0, 0, -H, 0));
    }
    // Pickup bed: open box behind the cab
    if (cab.bed != null) {
      const bx0 = cab.bed - 0.05, bx1 = -L2 + 0.05, bl = bx0 - bx1, bh = t.belt + 0.02;
      parts.add('bedLiner', new THREE.PlaneGeometry(bl, hw * 2 - 0.2), M4((bx0 + bx1) / 2, bh - 0.42, 0, -H, 0, 0));
      for (const s of [-1, 1]) parts.add('paint', rbox(bl, 0.08, 0.06, 0.02), M4((bx0 + bx1) / 2, bh + 0.01, s * (hw - 0.05)));
      parts.add('paint', rbox(0.05, 0.46, hw * 2 - 0.1, 0.02), M4(bx1 + 0.02, bh - 0.2, 0));
    }
    // ---- Bumpers (chrome with a rubber strip), grille, lights
    for (const [sx, dz] of [[1, 0], [-1, 0]]) {
      const x = sx * (L2 + 0.03);
      parts.add('chrome', rbox(0.16, 0.2, hw * 2 + 0.06, 0.05), M4(x, t.bottom + 0.2, dz));
      parts.add('rubber', rbox(0.02, 0.05, hw * 2 + 0.04, 0.012), M4(x + sx * 0.08, t.bottom + 0.2, 0));
      for (const s of [-1, 1]) parts.add('chrome', rbox(0.5, 0.2, 0.12, 0.05), M4(x - sx * 0.2, t.bottom + 0.2, s * (hw - 0.02), 0, s * sx * 0.25, 0));
    }
    const noseY = (t.hood[0][1] + t.bottom) / 2 + 0.12, noseX = L2 + 0.005;
    parts.add('grille', new THREE.PlaneGeometry(hw * 1.05, 0.2), M4(noseX, noseY, 0, 0, H, 0));
    for (let k = 0; k < 5; k++) parts.add('chrome', rbox(0.012, 0.012, hw * 1.05, 0.004), M4(noseX + 0.01, noseY - 0.08 + k * 0.04, 0));
    parts.add('chrome', rbox(0.02, 0.24, 0.02, 0.006), M4(noseX + 0.012, noseY, 0));
    for (const s of [-1, 1]) {
      // Square sealed-beam headlights in chrome bezels
      parts.add('chrome', rbox(0.03, 0.2, 0.34, 0.02), M4(noseX, noseY, s * (hw * 0.72)));
      parts.add(o.lit ? 'headOn' : 'headLens', rbox(0.02, 0.15, 0.13, 0.03), M4(noseX + 0.012, noseY, s * (hw * 0.62)));
      parts.add(o.lit ? 'headOn' : 'headLens', rbox(0.02, 0.15, 0.13, 0.03), M4(noseX + 0.012, noseY, s * (hw * 0.82)));
      // Amber corner lamps wrap around
      parts.add('amber', rbox(0.2, 0.08, 0.04, 0.015), M4(L2 - 0.1, noseY - 0.13, s * (hw + 0.005)));
      // Tail lights: wide red lenses with a reverse lamp
      const tailY = t.deck[t.deck.length - 1][1] - 0.2;
      parts.add(o.lit ? 'tailOn' : 'tailLens', rbox(0.03, 0.2, 0.42, 0.02), M4(-L2 - 0.005, Math.min(tailY, t.belt - 0.2), s * (hw * 0.62)));
      parts.add('headLens', rbox(0.03, 0.07, 0.1, 0.012), M4(-L2 - 0.006, Math.min(tailY, t.belt - 0.2), s * (hw * 0.3)));
      // Side mirrors on a stalk at the A pillar
      parts.add('chrome', rbox(0.06, 0.04, 0.12, 0.012), M4(cab.a - 0.12, t.belt + 0.08, s * (hw + 0.05)));
      parts.add('rubber', rbox(0.12, 0.1, 0.05, 0.02), M4(cab.a - 0.12, t.belt + 0.13, s * (hw + 0.12)));
      parts.add('mirror', new THREE.PlaneGeometry(0.1, 0.08), M4(cab.a - 0.185, t.belt + 0.13, s * (hw + 0.12), 0, -H, 0));
      // Door handles and a chrome belt trim
      const doors = cab.van ? [cab.a - 0.1] : cab.bed != null ? [cab.a - 0.1] : [cab.a - 0.1, bx - 0.05];
      for (const dx of doors) parts.add('chrome', rbox(0.16, 0.03, 0.03, 0.01), M4(dx - 0.35, t.belt - 0.08, s * (hw - 0.02)));
      parts.add('chrome', rbox(t.len - 0.6, 0.012, 0.014, 0.005), M4(0, t.belt - 0.01, s * (hw - 0.035)));
      parts.add('rubber', rbox(t.len - 1.2, 0.045, 0.02, 0.01), M4(-0.1, lerp(t.bottom, t.belt, 0.45), s * (hw + 0.005)));
    }
    // Plates
    parts.add('plate', new THREE.PlaneGeometry(0.3, 0.15), M4(-L2 - 0.1, t.bottom + 0.34, 0, 0, -H, 0));
    parts.add('plate', new THREE.PlaneGeometry(0.3, 0.15), M4(L2 + 0.1, t.bottom + 0.16, 0, 0, H, 0));
    // Wipers, antenna
    for (const s of [-0.35, 0.3]) parts.add('rubber', rbox(0.02, 0.012, 0.5, 0.005), M4(cab.a + 0.02, t.belt + 0.06, s, 0, 0.35, 0.45));
    parts.add('chrome', new THREE.CylinderGeometry(0.003, 0.004, 0.8, 4), M4(L2 - 0.5, t.hood[0][1] + 0.45, hw - 0.1));
    // Interior silhouettes seen through the glass: seats, headrests, dash, steering wheel
    if (!cab.van || true) {
      parts.add('interior', rbox(0.6, 0.18, hw * 1.6, 0.05), M4(cab.a - 0.15, t.belt - 0.05, 0));
      const rows = cab.bed != null || cab.van ? [cab.a - 0.95] : [cab.a - 0.95, bx - 0.55];
      for (const sx of rows) {
        parts.add('seat', rbox(0.5, 0.18, hw * 1.6, 0.08), M4(sx, t.belt - 0.35, 0));
        parts.add('seat', rbox(0.14, 0.62, hw * 1.6, 0.07), M4(sx - 0.28, t.belt - 0.02, 0, 0, 0, 0.18));
      }
      parts.add('rubber', new THREE.TorusGeometry(0.19, 0.018, 8, 24), M4(cab.a - 0.45, t.belt + 0.08, 0.38, 0, H, 0.35));
    }
    // ---- Wheels: lathed tire with tread band, dished rim, hubcap, lug nuts
    const tire = new THREE.LatheGeometry([[0.2, -0.105], [R - 0.03, -0.11], [R - 0.005, -0.09], [R, -0.06], [R, 0.06], [R - 0.005, 0.09], [R - 0.03, 0.11], [0.2, 0.105]].map(p => new THREE.Vector2(p[0], p[1])), 36);
    const rim = new THREE.LatheGeometry([[0.001, 0.1], [0.07, 0.1], [0.1, 0.085], [0.17, 0.08], [0.205, 0.095], [0.215, 0.11]].map(p => new THREE.Vector2(p[0], p[1])), 36);
    for (const wx of t.wb) for (const s of [-1, 1]) {
      const z = s * (hw - 0.12);
      const rot = s > 0 ? [H, 0, 0] : [-H, 0, 0];
      parts.add('tire', tire.clone(), M4(wx, R, z, ...rot));
      parts.add('rim', rim.clone(), M4(wx, R, z, ...rot));
      for (let k = 0; k < 5; k++) { const a = k / 5 * PI * 2; parts.add('chrome', new THREE.SphereGeometry(0.012, 6, 4), M4(wx + Math.cos(a) * 0.05, R + Math.sin(a) * 0.05, z + s * 0.1)); }
      for (let k = 0; k < 10; k++) { const a = k / 10 * PI * 2; parts.add('rimDark', new THREE.BoxGeometry(0.012, 0.06, 0.01), M4(wx + Math.cos(a) * 0.14, R + Math.sin(a) * 0.14, z + s * 0.083, 0, 0, a + H)); }
    }
    tire.dispose(); rim.dispose();
    return parts.build();
  }

  // ------------------------------------------------------------ MATERIALS AND INSTANCES
  const cacheGeo = new Map();
  const V = PB.Vehicles = {
    TYPES, TX,
    // matFn(name, spec) returns a material for a part name; the caller decides the shading (wet street etc.)
    make(o, matFn) {
      const key = o.type + (o.lit ? ':lit' : '');
      let geo = cacheGeo.get(key);
      if (!geo) { geo = buildCar(o); cacheGeo.set(key, geo); }
      const grp = new THREE.Group();
      for (const part of geo) {
        const m = new THREE.Mesh(part.geo, matFn(part.mat, o));
        m.castShadow = part.mat !== 'glass' && part.mat !== 'interior';
        m.receiveShadow = true;
        m.name = 'car:' + part.mat;
        grp.add(m);
      }
      grp.userData.type = o.type;
      return grp;
    },
    paintTex(o) {
      const t = TYPES[o.type] || TYPES.sedan, cab = t.cabin;
      const doors = cab.van ? [cab.a - 0.05, cab.a - 0.95] : cab.bed != null ? [cab.a - 0.05, cab.c + 0.05] : [cab.a - 0.05, lerp(cab.b, cab.c, 0.45) - 0.03, cab.d + 0.1];
      return TX.paint(o.key || o.type + o.color, o.color, { len: t.len, belt: t.belt, bottom: t.bottom, doors, wb: t.wb, wheelR: t.wheelR, rust: o.rust || 0 });
    },
    dispose() { for (const g of cacheGeo.values()) for (const p of g) p.geo.dispose(); cacheGeo.clear(); },
  };
})(typeof window !== 'undefined' ? window : globalThis);
