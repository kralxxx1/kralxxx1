/* Organic shapes from signed distance fields.
   A shape is a function returning the distance to its surface (negative inside), built from
   rounded primitives joined with smooth unions, so fingers grow out of a palm and a jaw out of a
   skull the way flesh does, not the way boxes stack. The mesher samples the field on a grid and
   extracts the surface with naive surface nets (one vertex per cell, placed at the average of the
   edge crossings, relaxed and smoothed), normals from the field's gradient. A second function can
   color the vertices (dirt, stitching, bruises) and a third supply a 0..1 "material id".
   Meshing happens once at load; results are cached by key. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;

  // ------------------------------------------------------------ primitives (p = [x, y, z])
  const len3 = (x, y, z) => Math.sqrt(x * x + y * y + z * z);
  const S = {
    sphere: (p, c, r) => len3(p[0] - c[0], p[1] - c[1], p[2] - c[2]) - r,
    // Ellipsoid (approximate, good near the surface)
    ellipsoid(p, c, r) {
      const x = (p[0] - c[0]) / r[0], y = (p[1] - c[1]) / r[1], z = (p[2] - c[2]) / r[2];
      const k0 = len3(x, y, z), k1 = len3(x / r[0], y / r[1], z / r[2]);
      return k1 > 1e-9 ? k0 * (k0 - 1) / k1 : -Math.min(r[0], r[1], r[2]);
    },
    // Capsule from a to b, radius ra at a and rb at b (a round cone)
    capsule(p, a, b, ra, rb) {
      if (rb == null) rb = ra;
      const bx = b[0] - a[0], by = b[1] - a[1], bz = b[2] - a[2];
      const px = p[0] - a[0], py = p[1] - a[1], pz = p[2] - a[2];
      const l2 = bx * bx + by * by + bz * bz;
      let t = l2 > 0 ? (px * bx + py * by + pz * bz) / l2 : 0;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      return len3(px - bx * t, py - by * t, pz - bz * t) - (ra + (rb - ra) * t);
    },
    // Rounded box centered at c with half sizes h and corner radius r
    box(p, c, h, r) {
      const qx = Math.abs(p[0] - c[0]) - h[0] + r, qy = Math.abs(p[1] - c[1]) - h[1] + r, qz = Math.abs(p[2] - c[2]) - h[2] + r;
      return len3(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, Math.max(qy, qz)), 0) - r;
    },
    // Torus in the plane perpendicular to axis y at c
    torus(p, c, R, r) { const x = p[0] - c[0], y = p[1] - c[1], z = p[2] - c[2]; const q = Math.sqrt(x * x + z * z) - R; return Math.sqrt(q * q + y * y) - r; },
    // Polynomial smooth minimum / maximum
    smin(a, b, k) { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k * 0.25; },
    smax(a, b, k) { return -S.smin(-a, -b, k); },
    // Chain of capsules through points with radii (fingers, tails, tentacles)
    chain(p, pts, radii, k) {
      let d = 1e9;
      for (let i = 0; i < pts.length - 1; i++) {
        const di = S.capsule(p, pts[i], pts[i + 1], radii[i], radii[i + 1]);
        d = k ? S.smin(d, di, k) : Math.min(d, di);
      }
      return d;
    },
  };

  // ------------------------------------------------------------ value noise for displacement
  function hash3(x, y, z) { let h = (x * 374761393 + y * 668265263 + z * 1274126177) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
  function noise3(x, y, z) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    let xf = x - xi, yf = y - yi, zf = z - zi;
    xf = xf * xf * (3 - 2 * xf); yf = yf * yf * (3 - 2 * yf); zf = zf * zf * (3 - 2 * zf);
    const L = (a, b, t) => a + (b - a) * t;
    const c = (dx, dy, dz) => hash3(xi + dx, yi + dy, zi + dz);
    return L(L(L(c(0, 0, 0), c(1, 0, 0), xf), L(c(0, 1, 0), c(1, 1, 0), xf), yf), L(L(c(0, 0, 1), c(1, 0, 1), xf), L(c(0, 1, 1), c(1, 1, 1), xf), yf), zf);
  }
  function fbm3(x, y, z, oct = 3) { let v = 0, a = 0.5, f = 1; for (let o = 0; o < oct; o++) { v += (noise3(x * f, y * f, z * f) - 0.5) * a; f *= 2.03; a *= 0.5; } return v; }
  S.noise = noise3; S.fbm = fbm3;

  // ------------------------------------------------------------ mesher (naive surface nets)
  const cache = new Map();
  // fn(p) -> distance; bounds: [[x0,y0,z0],[x1,y1,z1]]; cell: voxel size in meters
  // opts.color(p, n) -> [r,g,b]; opts.id(p) -> number stored in a 'mid' attribute; opts.smooth: relax passes
  function mesh(key, fn, bounds, cell, opts = {}) {
    if (key && cache.has(key)) return cache.get(key).clone();
    const [b0, b1] = bounds;
    const nx = Math.ceil((b1[0] - b0[0]) / cell) + 1, ny = Math.ceil((b1[1] - b0[1]) / cell) + 1, nz = Math.ceil((b1[2] - b0[2]) / cell) + 1;
    const N = nx * ny * nz;
    const F = new Float32Array(N);
    const p = [0, 0, 0];
    for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      p[0] = b0[0] + i * cell; p[1] = b0[1] + j * cell; p[2] = b0[2] + k * cell;
      F[i + nx * (j + ny * k)] = fn(p);
    }
    const idx = (i, j, k) => i + nx * (j + ny * k);
    // One vertex per cell that the surface crosses
    const cellVert = new Int32Array((nx - 1) * (ny - 1) * (nz - 1)).fill(-1);
    const cidx = (i, j, k) => i + (nx - 1) * (j + (ny - 1) * k);
    const V = [];
    const corners = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
    const edges = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
    const cv = new Float32Array(8);
    for (let k = 0; k < nz - 1; k++) for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
      let mask = 0;
      for (let c = 0; c < 8; c++) { const o = corners[c]; cv[c] = F[idx(i + o[0], j + o[1], k + o[2])]; if (cv[c] < 0) mask |= 1 << c; }
      if (mask === 0 || mask === 255) continue;
      let sx = 0, sy = 0, sz = 0, n = 0;
      for (const [a, b] of edges) {
        const va = cv[a], vb = cv[b];
        if ((va < 0) === (vb < 0)) continue;
        const t = va / (va - vb), oa = corners[a], ob = corners[b];
        sx += oa[0] + (ob[0] - oa[0]) * t; sy += oa[1] + (ob[1] - oa[1]) * t; sz += oa[2] + (ob[2] - oa[2]) * t; n++;
      }
      cellVert[cidx(i, j, k)] = V.length / 3;
      V.push(b0[0] + (i + sx / n) * cell, b0[1] + (j + sy / n) * cell, b0[2] + (k + sz / n) * cell);
    }
    // Quads across every grid edge with a sign change
    const Q = [];
    for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const v0 = F[idx(i, j, k)];
      // x edges: cells around the edge vary in j,k
      if (i < nx - 1 && j > 0 && k > 0 && j < ny - 1 && k < nz - 1) {
        const v1 = F[idx(i + 1, j, k)];
        if ((v0 < 0) !== (v1 < 0)) {
          const a = cellVert[cidx(i, j - 1, k - 1)], b = cellVert[cidx(i, j, k - 1)], c = cellVert[cidx(i, j, k)], d = cellVert[cidx(i, j - 1, k)];
          if (a >= 0 && b >= 0 && c >= 0 && d >= 0) { if (v0 < 0) Q.push(a, b, c, d); else Q.push(a, d, c, b); }
        }
      }
      if (j < ny - 1 && i > 0 && k > 0 && i < nx - 1 && k < nz - 1) {
        const v1 = F[idx(i, j + 1, k)];
        if ((v0 < 0) !== (v1 < 0)) {
          const a = cellVert[cidx(i - 1, j, k - 1)], b = cellVert[cidx(i - 1, j, k)], c = cellVert[cidx(i, j, k)], d = cellVert[cidx(i, j, k - 1)];
          if (a >= 0 && b >= 0 && c >= 0 && d >= 0) { if (v0 < 0) Q.push(a, b, c, d); else Q.push(a, d, c, b); }
        }
      }
      if (k < nz - 1 && i > 0 && j > 0 && i < nx - 1 && j < ny - 1) {
        const v1 = F[idx(i, j, k + 1)];
        if ((v0 < 0) !== (v1 < 0)) {
          const a = cellVert[cidx(i - 1, j - 1, k)], b = cellVert[cidx(i, j - 1, k)], c = cellVert[cidx(i, j, k)], d = cellVert[cidx(i - 1, j, k)];
          if (a >= 0 && b >= 0 && c >= 0 && d >= 0) { if (v0 < 0) Q.push(a, b, c, d); else Q.push(a, d, c, b); }
        }
      }
    }
    // Relax: pull every vertex toward the average of its neighbors, then back onto the surface
    const nv = V.length / 3;
    const nb = Array.from({ length: nv }, () => []);
    for (let q = 0; q < Q.length; q += 4) for (let e = 0; e < 4; e++) { const a = Q[q + e], b = Q[q + (e + 1) % 4]; nb[a].push(b); nb[b].push(a); }
    const grad = (x, y, z) => { const e = cell * 0.35; p[0] = x + e; p[1] = y; p[2] = z; const fx1 = fn(p); p[0] = x - e; const fx0 = fn(p); p[0] = x; p[1] = y + e; const fy1 = fn(p); p[1] = y - e; const fy0 = fn(p); p[1] = y; p[2] = z + e; const fz1 = fn(p); p[2] = z - e; const fz0 = fn(p); const gx = fx1 - fx0, gy = fy1 - fy0, gz = fz1 - fz0, l = len3(gx, gy, gz) || 1; return [gx / l, gy / l, gz / l]; };
    const passes = opts.smooth != null ? opts.smooth : 2;
    for (let it = 0; it < passes; it++) {
      const Vn = V.slice();
      for (let v = 0; v < nv; v++) {
        const list = nb[v]; if (!list.length) continue;
        let ax = 0, ay = 0, az = 0;
        for (const u of list) { ax += V[u * 3]; ay += V[u * 3 + 1]; az += V[u * 3 + 2]; }
        ax /= list.length; ay /= list.length; az /= list.length;
        let x = V[v * 3] * 0.5 + ax * 0.5, y = V[v * 3 + 1] * 0.5 + ay * 0.5, z = V[v * 3 + 2] * 0.5 + az * 0.5;
        // project back onto the zero set (two Newton steps)
        for (let s = 0; s < 2; s++) { p[0] = x; p[1] = y; p[2] = z; const d = fn(p); const g = grad(x, y, z); x -= g[0] * d; y -= g[1] * d; z -= g[2] * d; }
        Vn[v * 3] = x; Vn[v * 3 + 1] = y; Vn[v * 3 + 2] = z;
      }
      for (let i = 0; i < V.length; i++) V[i] = Vn[i];
    }
    // Indexed geometry with gradient normals (and optional colors / ids)
    const pos = new Float32Array(V), nor = new Float32Array(V.length);
    const col = opts.color ? new Float32Array(V.length) : null;
    const mid = opts.id ? new Float32Array(nv) : null;
    for (let v = 0; v < nv; v++) {
      const x = V[v * 3], y = V[v * 3 + 1], z = V[v * 3 + 2];
      const g = grad(x, y, z);
      nor[v * 3] = g[0]; nor[v * 3 + 1] = g[1]; nor[v * 3 + 2] = g[2];
      if (col) { const c = opts.color([x, y, z], g); col[v * 3] = c[0]; col[v * 3 + 1] = c[1]; col[v * 3 + 2] = c[2]; }
      if (mid) mid[v] = opts.id([x, y, z]);
    }
    const index = [];
    for (let q = 0; q < Q.length; q += 4) {
      const a = Q[q], b = Q[q + 1], c = Q[q + 2], d = Q[q + 3];
      // split along the shorter diagonal
      const dac = len3(V[a * 3] - V[c * 3], V[a * 3 + 1] - V[c * 3 + 1], V[a * 3 + 2] - V[c * 3 + 2]);
      const dbd = len3(V[b * 3] - V[d * 3], V[b * 3 + 1] - V[d * 3 + 1], V[b * 3 + 2] - V[d * 3 + 2]);
      if (dac < dbd) index.push(a, b, c, a, c, d); else index.push(a, b, d, b, c, d);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    if (col) geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    if (mid) geo.setAttribute('mid', new THREE.BufferAttribute(mid, 1));
    // Box-projected UVs in meters (for detail textures)
    const uv = new Float32Array(nv * 2);
    for (let v = 0; v < nv; v++) {
      const ax = Math.abs(nor[v * 3]), ay = Math.abs(nor[v * 3 + 1]), az = Math.abs(nor[v * 3 + 2]);
      const x = V[v * 3], y = V[v * 3 + 1], z = V[v * 3 + 2];
      if (ax >= ay && ax >= az) { uv[v * 2] = z; uv[v * 2 + 1] = y; } else if (ay >= az) { uv[v * 2] = x; uv[v * 2 + 1] = z; } else { uv[v * 2] = x; uv[v * 2 + 1] = y; }
    }
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(index);
    geo.computeBoundingSphere();
    if (key) cache.set(key, geo);
    return key ? geo.clone() : geo;
  }

  PB.SDF = Object.assign(S, { mesh, cache, clear() { for (const g of cache.values()) g.dispose(); cache.clear(); } });
})(typeof window !== 'undefined' ? window : globalThis);
