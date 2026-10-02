/* World builder for hand-authored maps (see authored.js). Each cell has a style, so every face of
   a wall takes the material and height of the room it faces: a tiled washroom next to a panelled
   office, a three-metre corridor opening onto an eight-metre hall, a brick facade seen from the street.
   Railings, invisible barriers and the step in the ceiling between rooms of different heights are
   drawn here too. Generated maps (the Underneath) keep the original single-style path in world.js. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, T = PB.Tex;
  const { DX, DY, EDGE, SOLID } = PB.LevelGen;
  const W = PB.World.prototype;

  // Reflection strength of floors by texture (screen-space reflections read userData.refl)
  const FLOOR_REFL = { tile: 0.4, hexTile: 0.3, terrazzo: 0.4, linoleum: 0.15, vinyl: 0.25, planks: 0.12, parquet: 0.18, ice: 0.7, steelDeck: 0.12, concreteFloor: 0.06, asphalt: 0.4, cobbles: 0.25, flagstone: 0.15, boards: 0.06 };
  // Outdoor floors that are wet (rain puddles and ripples): style.wet overrides
  const WET = { asphalt: 1, cobbles: 0.9, flagstone: 0.7, grass: 0.6, steelDeck: 0.8, mud: 0.9, gravel: 0.5, boards: 0.6, concreteFloor: 0.7 };

  // Materials named by style keys: W:/F:/C: + texture + ':' + hex tint
  W.styleMat = function (key) {
    const th = this.theme;
    const [kind, tex, tintS] = key.split(':');
    const color = tintS ? parseInt(tintS, 16) : undefined;
    let m;
    if (kind === 'F') {
      m = this.macro(this.pbr(tex, { vertexColors: true, color, emissiveIntensity: 0.35 }), 0.1, 0.1, 0);
      m.userData.refl = FLOOR_REFL[tex] || 0;
      const out = this.L.meta.weather && this.L.meta.weather.wet;
      if (out && WET[tex] && this.outdoorFloors && this.outdoorFloors.has(key)) this.wetten(m, WET[tex] * out);
    } else if (kind === 'C') m = this.macro(this.pbr(tex, { vertexColors: true, color }), 0.07, 0.15, 0);
    else m = this.macro(this.pbr(tex, { vertexColors: true, color }), th.macro != null ? th.macro : 0.12, th.damp != null ? th.damp : 0.22, th.wave != null ? th.wave : 0.025);
    return m;
  };

  W.buildAuthored = function (bufs) {
    const L = this.L, C = this.C, th = this.theme, t = 0.2;
    const od = L.meta.outdoor;
    const isOut = (x, y) => !!(od && L.inb(x, y) && od[L.i(x, y)]);
    const vis = (x, y) => L.inb(x, y) && (L.solid[L.i(x, y)] === 0 || L.solid[L.i(x, y)] === SOLID.RACK);
    const st = (x, y) => L.styles[L.styleOf[L.i(x, y)]];
    const scaleOf = key => (this.mat(key).userData.scale || 2);
    // the outdoor floor materials (they get rain puddles)
    this.outdoorFloors = new Set();
    for (let i = 0; i < L.w * L.h; i++) if (od && od[i] && L.solid[i] === 0) this.outdoorFloors.add(L.styles[L.styleOf[i]].floorKey);
    // What one side of an edge shows: material key and height. Facing outdoors, a building wall is its
    // facade (the indoor style's siding) and rises a little above the roof line.
    const side = (x, y, ox, oy) => {
      if (!vis(x, y)) return null;
      const s = st(x, y);
      if (isOut(x, y)) {
        if (vis(ox, oy) && !isOut(ox, oy)) { const so = st(ox, oy); return { key: so.sidingKey || so.wallKey, h: L.ceilAt(ox, oy) + (so.parapet != null ? so.parapet : 0.45), out: true, trim: 0, s: so }; }
        return { key: s.wallKey, h: s.wallH || 2.4, out: true, trim: 0, s };
      }
      return { key: s.wallKey, h: L.ceilAt(x, y), out: false, trim: s.trimH != null ? s.trimH : (th.trim ? th.trimH : 0), s };
    };
    const sig = S => (S ? S.key + '@' + S.h.toFixed(2) + (S.out ? 'o' : '') + S.trim : '-');
    this.trimH = th.trimH;
    const emit = (horiz, line, a0, a1, kind, A, B) => {
      if (kind === EDGE.INVIS) return;
      if (kind === EDGE.FENCE) { this.fenceRun(bufs, horiz, line, a0, a1, (A && A.s.fence) || (B && B.s.fence)); return; }
      if (kind === EDGE.RAIL) { this.railRun(bufs, horiz, line, a0, a1, (A && A.s.rail) || (B && B.s.rail) || 'steel'); return; }
      const e0 = a0 - t / 2, e1 = a1 + t / 2;
      const midX = horiz ? (a0 + a1) / 2 : line, midZ = horiz ? line : (a0 + a1) / 2;
      const low = kind === EDGE.LOW, glass = kind === EDGE.GLASS;
      const lowH = (A && A.s.lowH) || (B && B.s.lowH) || 1.05;
      const hA = A ? (low ? lowH : A.h) : 0, hB = B ? (low ? lowH : B.h) : 0, hTop = Math.max(hA, hB);
      const sill = 0.85, gTop = Math.max(sill + 0.6, Math.min(2.6, Math.min(A ? A.h : 99, B ? B.h : 99) - 0.3));
      const segs = h => (glass ? [[0, sill], [gTop, h]] : [[0, h]]);
      const face = (S, h, sgn) => {
        const buf = this.chunkBuf(bufs, S.key, midX, midZ), s = scaleOf(S.key), ao = S.out || low ? null : this.wallAO(h);
        for (const [ya, yb] of segs(h)) {
          if (yb <= ya) continue;
          if (horiz) this.vface(buf, e0, line + sgn * t / 2, e1, line + sgn * t / 2, ya, yb, 0, sgn, s, ao);
          else this.vface(buf, line + sgn * t / 2, e0, line + sgn * t / 2, e1, ya, yb, sgn, 0, s, ao);
        }
      };
      if (A) face(A, hA, -1);
      if (B) face(B, hB, 1);
      // ends of the run and the top: the outer side's material, or the indoor one
      const M = (A && A.out ? A : B && B.out ? B : A || B);
      const eb = this.chunkBuf(bufs, M.key, midX, midZ), es = scaleOf(M.key);
      for (const [ya, yb] of segs(hTop)) {
        if (yb <= ya) continue;
        if (horiz) { this.vface(eb, e0, line + t / 2, e0, line - t / 2, ya, yb, -1, 0, es); this.vface(eb, e1, line - t / 2, e1, line + t / 2, ya, yb, 1, 0, es); }
        else { this.vface(eb, line - t / 2, e0, line + t / 2, e0, ya, yb, 0, -1, es); this.vface(eb, line + t / 2, e1, line - t / 2, e1, ya, yb, 0, 1, es); }
      }
      const capTop = low || (A && A.out) || (B && B.out) || hA !== hB;
      const lo = (x0, z0, x1, z1) => [Math.min(x0, x1), Math.min(z0, z1), Math.max(x0, x1), Math.max(z0, z1)];
      const slab = horiz ? lo(e0, line - t / 2, e1, line + t / 2) : lo(line - t / 2, e0, line + t / 2, e1);
      if (capTop) this.hface(low ? this.chunkBuf(bufs, 'trimPaint', midX, midZ) : eb, slab[0], slab[1], slab[2], slab[3], hTop, true, es, 1);
      if (glass) {
        this.hface(eb, slab[0], slab[1], slab[2], slab[3], sill, true, es, 0.9);
        this.hface(eb, slab[0], slab[1], slab[2], slab[3], gTop, false, es, 0.8);
        const gb = this.chunkBuf(bufs, 'glassPane', midX, midZ);
        if (horiz) { this.vface(gb, a0, line, a1, line, sill, gTop, 0, 1, 1); this.vface(gb, a0, line, a1, line, sill, gTop, 0, -1, 1); }
        else { this.vface(gb, line, a0, line, a1, sill, gTop, 1, 0, 1); this.vface(gb, line, a0, line, a1, sill, gTop, -1, 0, 1); }
        // window frames and the mullion every cell
        this.windowFrames(bufs, horiz, line, a0, a1, sill, gTop, (A && !A.out ? A.s : B && !B.s.outdoor ? B.s : (A || B).s).frame);
      }
      // baseboards
      if (kind === EDGE.WALL) for (const [S, sgn] of [[A, -1], [B, 1]]) {
        if (!S || S.out || !(S.trim > 0)) continue;
        const tb = this.chunkBuf(bufs, S.s.trimMat || 'trim', midX, midZ), o = t / 2 + 0.016, hh = S.trim;
        if (horiz) { this.vface(tb, e0, line + sgn * o, e1, line + sgn * o, 0, hh, 0, sgn, 1); const z0 = line + sgn * t / 2, z1 = line + sgn * o; this.hface(tb, e0, Math.min(z0, z1), e1, Math.max(z0, z1), hh, true, 1); }
        else { this.vface(tb, line + sgn * o, e0, line + sgn * o, e1, 0, hh, sgn, 0, 1); const x0 = line + sgn * t / 2, x1 = line + sgn * o; this.hface(tb, Math.min(x0, x1), e0, Math.max(x0, x1), e1, hh, true, 1); }
      }
    };
    // Horizontal edge lines (z = y*C): side A is the cell to the north, B to the south
    for (let y = 0; y <= L.h; y++) {
      let x = 0;
      while (x < L.w) {
        const kind = L.hW[y * L.w + x];
        if (!kind || L.doorMap.get((y * L.w + x) * 2)) { x++; continue; }
        const A = side(x, y - 1, x, y), B = side(x, y, x, y - 1);
        if (!A && !B) { x++; continue; }
        const key = sig(A) + '|' + sig(B);
        let x1 = x;
        while (x1 + 1 < L.w && L.hW[y * L.w + x1 + 1] === kind && !L.doorMap.get((y * L.w + x1 + 1) * 2) && sig(side(x1 + 1, y - 1, x1 + 1, y)) + '|' + sig(side(x1 + 1, y, x1 + 1, y - 1)) === key) x1++;
        emit(true, y * C, x * C, (x1 + 1) * C, kind, A, B);
        x = x1 + 1;
      }
    }
    // Vertical edge lines (x = x*C): A west, B east
    for (let x = 0; x <= L.w; x++) {
      let y = 0;
      while (y < L.h) {
        const kind = L.vW[y * (L.w + 1) + x];
        if (!kind || L.doorMap.get((y * (L.w + 1) + x) * 2 + 1)) { y++; continue; }
        const A = side(x - 1, y, x, y), B = side(x, y, x - 1, y);
        if (!A && !B) { y++; continue; }
        const key = sig(A) + '|' + sig(B);
        let y1 = y;
        while (y1 + 1 < L.h && L.vW[(y1 + 1) * (L.w + 1) + x] === kind && !L.doorMap.get(((y1 + 1) * (L.w + 1) + x) * 2 + 1) && sig(side(x - 1, y1 + 1, x, y1 + 1)) + '|' + sig(side(x, y1 + 1, x - 1, y1 + 1)) === key) y1++;
        emit(false, x * C, y * C, (y1 + 1) * C, kind, A, B);
        y = y1 + 1;
      }
    }
    // Steps in the ceiling across open edges (a low corridor opening onto a tall hall), and the facade
    // above an opening from indoors to outdoors (a porch, a garage mouth, a tunnel portal)
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) for (const d of [1, 2]) {
      const nx = x + DX[d], ny = y + DY[d];
      if (!vis(x, y) || !vis(nx, ny) || L.edgeKind(x, y, d) || L.doorAt(x, y, d)) continue;
      const oA = isOut(x, y), oB = isOut(nx, ny);
      if (oA && oB) continue;
      const hA = oA ? null : L.ceilAt(x, y), hB = oB ? null : L.ceilAt(nx, ny);
      let lowC, y0, y1, key, toward;
      if (oA || oB) {
        const inX = oA ? nx : x, inY = oA ? ny : y, s = st(inX, inY), h = L.ceilAt(inX, inY);
        y0 = h; y1 = h + (s.parapet != null ? s.parapet : 0.45); key = s.sidingKey || s.wallKey; toward = oA ? -1 : 1;
        // face the outdoor side, plus the lintel underside facing down into the opening
        lowC = null;
        this.stepFace(bufs, x, y, d, y0, y1, key, toward, scaleOf(key));
        continue;
      }
      if (Math.abs(hA - hB) < 0.01) continue;
      lowC = hA < hB ? -1 : 1;       // -1: the (x, y) side is lower
      y0 = Math.min(hA, hB); y1 = Math.max(hA, hB);
      const lowStyle = lowC < 0 ? st(x, y) : st(nx, ny);
      key = lowStyle.wallKey;
      this.stepFace(bufs, x, y, d, y0, y1, key, lowC, scaleOf(key));
    }
    // Floors, water and ceilings
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
      const i = L.i(x, y);
      if (!vis(x, y)) continue;
      const s = st(x, y);
      const x0 = x * C, x1 = (x + 1) * C, z0 = y * C, z1 = (y + 1) * C;
      if (L.floorType[i] === 1) {
        const bed = s.bed ? 'F:' + s.bed + ':' : 'pool';
        const pb = this.chunkBuf(bufs, bed, L.cx(x), L.cz(y)), depth = s.depth || 0.5;
        this.hface(pb, x0, z0, x1, z1, -depth, true, s.bed ? scaleOf(bed) : 1.2, 0.8);
        for (let d = 0; d < 4; d++) {
          const nx = x + DX[d], ny = y + DY[d];
          if (L.inb(nx, ny) && L.floorType[L.i(nx, ny)] === 1) continue;
          const ao = [[-depth, 0.6], [0, 1]];
          if (d === 0) this.vface(pb, x0, z0, x1, z0, -depth, 0, 0, 1, 1.2, ao);
          if (d === 2) this.vface(pb, x0, z1, x1, z1, -depth, 0, 0, -1, 1.2, ao);
          if (d === 3) this.vface(pb, x0, z0, x0, z1, -depth, 0, 1, 0, 1.2, ao);
          if (d === 1) this.vface(pb, x1, z0, x1, z1, -depth, 0, -1, 0, 1.2, ao);
        }
        this.hface(this.chunkBuf(bufs, s.murky ? 'murk' : 'water', L.cx(x), L.cz(y)), x0, z0, x1, z1, -0.1, true, 3, 1);
      } else this.hface(this.chunkBuf(bufs, s.floorKey, L.cx(x), L.cz(y)), x0, z0, x1, z1, 0, true, scaleOf(s.floorKey), 1);
      if (!isOut(x, y) && !s.noCeil) this.hface(this.chunkBuf(bufs, s.ceilKey, L.cx(x), L.cz(y)), x0, z0, x1, z1, L.ceilAt(x, y), false, scaleOf(s.ceilKey), 1);
    }
  };
  // A vertical strip across an open edge (x, y, d in {1, 2}) from y0 to y1, facing the side `toward`
  // (-1: toward (x, y), +1: toward the neighbour)
  W.stepFace = function (bufs, x, y, d, y0, y1, key, toward, s) {
    const C = this.C, buf = this.chunkBuf(bufs, key, (x + 0.5) * C, (y + 0.5) * C);
    if (d === 1) { const lx = (x + 1) * C; this.vface(buf, lx, y * C, lx, (y + 1) * C, y0, y1, toward > 0 ? 1 : -1, 0, s); }
    else { const lz = (y + 1) * C; this.vface(buf, x * C, lz, (x + 1) * C, lz, y0, y1, 0, toward > 0 ? 1 : -1, s); }
  };
  // Railing along an edge: posts every 1.25 m, a top rail and two lower rails
  W.railRun = function (bufs, horiz, line, a0, a1, kind) {
    const mat = kind === 'wood' ? 'railWood' : kind === 'iron' ? 'railIron' : 'railSteel';
    const buf = this.chunkBuf(bufs, mat, horiz ? (a0 + a1) / 2 : line, horiz ? line : (a0 + a1) / 2);
    const top = kind === 'wood' ? 1.0 : 1.05, pw = kind === 'wood' ? 0.05 : 0.025, rw = kind === 'wood' ? 0.035 : 0.022;
    const box = (cA, cB, y0, y1, hwA, hwB) => {
      // a box centred on along=cA, across=cB
      const xa = horiz ? cA - hwA : cB - hwB, xb = horiz ? cA + hwA : cB + hwB, za = horiz ? cB - hwB : cA - hwA, zb = horiz ? cB + hwB : cA + hwA;
      this.vface(buf, xa, za, xb, za, y0, y1, 0, -1, 1, null); this.vface(buf, xa, zb, xb, zb, y0, y1, 0, 1, 1, null);
      this.vface(buf, xa, za, xa, zb, y0, y1, -1, 0, 1, null); this.vface(buf, xb, za, xb, zb, y0, y1, 1, 0, 1, null);
      this.hface(buf, xa, za, xb, zb, y1, true, 1, 1); this.hface(buf, xa, za, xb, zb, y0, false, 1, 1);
    };
    const len = a1 - a0, n = Math.max(1, Math.round(len / 1.25));
    for (let k = 0; k <= n; k++) box(a0 + len * k / n, line, 0, top, pw, pw);
    box((a0 + a1) / 2, line, top - 0.02, top + 0.035, len / 2 + pw, rw * 1.4);
    for (const y of kind === 'wood' ? [0.5] : [0.38, 0.7]) box((a0 + a1) / 2, line, y - rw / 2, y + rw / 2, len / 2, rw * 0.7);
  };
  // Window frame: a slim frame round the opening, a mullion at every cell line
  W.windowFrames = function (bufs, horiz, line, a0, a1, sill, top, kind) {
    const mat = kind || 'windowFrame';
    const buf = this.chunkBuf(bufs, mat, horiz ? (a0 + a1) / 2 : line, horiz ? line : (a0 + a1) / 2);
    const fw = 0.045, fd = 0.07;
    const bar = (aa, ab, y0, y1) => {
      const xa = horiz ? aa : line - fd, xb = horiz ? ab : line + fd, za = horiz ? line - fd : aa, zb = horiz ? line + fd : ab;
      this.vface(buf, xa, za, xb, za, y0, y1, 0, -1, 1, null); this.vface(buf, xa, zb, xb, zb, y0, y1, 0, 1, 1, null);
      this.vface(buf, xa, za, xa, zb, y0, y1, -1, 0, 1, null); this.vface(buf, xb, za, xb, zb, y0, y1, 1, 0, 1, null);
      this.hface(buf, xa, za, xb, zb, y1, true, 1, 1); this.hface(buf, xa, za, xb, zb, y0, false, 1, 1);
    };
    bar(a0, a1, sill, sill + fw); bar(a0, a1, top - fw, top);
    const C = this.C;
    for (let a = a0; a <= a1 + 1e-6; a += C / 2) bar(a - fw / 2, a + fw / 2, sill, top);
    bar(a0, a1, (sill + top) / 2 + 0.25 - fw / 2, (sill + top) / 2 + 0.25 + fw / 2);
  };
  // The wall round a door on an authored map: each side its own material and height
  W.doorWallAuthored = function (bufs, door) {
    const L = this.L, C = this.C, t = 0.2;
    const g = this.doorGeom(door);
    if (door.kind === 'house' || door.kind === 'open') return;
    const od = L.meta.outdoor;
    const nxA = g.az ? -1 : 0, nzA = g.ax ? -1 : 0;
    const cellAt = (sx, sz) => L.cellOf(g.cx + sx * 0.6, g.cz + sz * 0.6);
    const info = (c, o) => {
      if (!L.inb(c.x, c.y) || !(L.solid[L.i(c.x, c.y)] === 0)) return null;
      const s = L.styles[L.styleOf[L.i(c.x, c.y)]], out = !!(od && od[L.i(c.x, c.y)]);
      if (out) { const oo = L.inb(o.x, o.y) && L.solid[L.i(o.x, o.y)] === 0 ? L.styles[L.styleOf[L.i(o.x, o.y)]] : s; const oOut = !!(od && L.inb(o.x, o.y) && od[L.i(o.x, o.y)]); return { key: (!oOut && oo.sidingKey) || oo.wallKey, h: oOut ? (s.wallH || 2.4) : L.ceilAt(o.x, o.y) + (oo.parapet != null ? oo.parapet : 0.45), out: true }; }
      return { key: s.wallKey, h: L.ceilAt(c.x, c.y), out: false };
    };
    const cA = cellAt(nxA, nzA), cB = cellAt(-nxA, -nzA);
    const A = info(cA, cB), B = info(cB, cA);
    const half = C / 2, ow = g.width / 2;
    const pieces = (h) => [[-half - t / 2, -ow, 0, h], [ow, half + t / 2, 0, h], [-ow, ow, g.height, h]];
    for (const [S, sgn] of [[A, 1], [B, -1]]) {
      if (!S) continue;
      const buf = this.chunkBuf(bufs, S.key, g.cx, g.cz), s = this.mat(S.key).userData.scale || 2, ao = this.wallAO(S.h);
      for (const [a0, a1, y0, y1] of pieces(S.h)) {
        if (y1 <= y0) continue;
        const p0x = g.cx + g.ax * a0, p0z = g.cz + g.az * a0, p1x = g.cx + g.ax * a1, p1z = g.cz + g.az * a1;
        const nx = nxA * sgn, nz = nzA * sgn;
        this.vface(buf, p0x + nx * t / 2, p0z + nz * t / 2, p1x + nx * t / 2, p1z + nz * t / 2, y0, y1, nx, nz, s, y0 > 0 || S.out ? null : ao);
      }
    }
    const M = A || B, mb = this.chunkBuf(bufs, M.key, g.cx, g.cz), ms = this.mat(M.key).userData.scale || 2;
    // lintel underside, the top of the wall where a side is outdoors, and the jambs
    this.hface(mb, g.cx - (g.ax ? ow : t / 2), g.cz - (g.az ? ow : t / 2), g.cx + (g.ax ? ow : t / 2), g.cz + (g.az ? ow : t / 2), g.height, false, ms, 0.7);
    if ((A && A.out) || (B && B.out)) {
      const top = Math.max(A ? A.h : 0, B ? B.h : 0);
      this.hface(mb, g.cx - (g.ax ? half + t / 2 : t / 2), g.cz - (g.az ? half + t / 2 : t / 2), g.cx + (g.ax ? half + t / 2 : t / 2), g.cz + (g.az ? half + t / 2 : t / 2), top, true, ms, 1);
    }
    for (const sgn of [-1, 1]) {
      const ex = g.cx + g.ax * sgn * ow, ez = g.cz + g.az * sgn * ow;
      if (g.ax) this.vface(mb, ex, g.cz - t / 2, ex, g.cz + t / 2, 0, g.height, -sgn, 0, ms);
      else this.vface(mb, g.cx - t / 2, ez, g.cx + t / 2, ez, 0, g.height, 0, -sgn, ms);
    }
    this.addCollider(g.ax ? { minX: g.cx - half, maxX: g.cx - ow, minZ: g.cz - t / 2, maxZ: g.cz + t / 2 } : { minX: g.cx - t / 2, maxX: g.cx + t / 2, minZ: g.cz - half, maxZ: g.cz - ow });
    this.addCollider(g.ax ? { minX: g.cx + ow, maxX: g.cx + half, minZ: g.cz - t / 2, maxZ: g.cz + t / 2 } : { minX: g.cx - t / 2, maxX: g.cx + t / 2, minZ: g.cz + ow, maxZ: g.cz + half });
  };

  // Corner beads on an authored map: each takes the wall material and height of the room it is seen from
  // (outdoors: the facade of the building on the corner)
  W.beadsAuthored = function (beads) {
    const L = this.L, od = L.meta.outdoor, groups = new Map();
    const out = (x, y) => !!(od && L.inb(x, y) && od[L.i(x, y)]);
    for (const cls of ['full', 'low']) for (const b of beads[cls]) {
      let key, h;
      const s = L.styleAt(b.qx, b.qy);
      if (!s) continue;
      if (cls === 'low') { key = 'trimPaint'; h = s.lowH || 1.05; }
      else if (!out(b.qx, b.qy)) { key = s.wallKey; h = L.ceilAt(b.qx, b.qy); }
      else {
        // the indoor cell at this corner, if any
        let best = null;
        for (const [cx, cy] of [[b.vx - 1, b.vy - 1], [b.vx, b.vy - 1], [b.vx - 1, b.vy], [b.vx, b.vy]]) if (L.passable(cx, cy) && !out(cx, cy)) best = [cx, cy];
        if (!best) { key = s.wallKey; h = s.wallH || 2.4; }
        else { const si = L.styleAt(best[0], best[1]); key = si.sidingKey || si.wallKey; h = L.ceilAt(best[0], best[1]) + (si.parapet != null ? si.parapet : 0.45); }
      }
      const gk = key + '|' + h.toFixed(2);
      if (!groups.has(gk)) groups.set(gk, { key, h, list: [] });
      groups.get(gk).list.push(b);
    }
    const dummy = new THREE.Object3D();
    for (const { key, h, list } of groups.values()) {
      const geo = new THREE.CylinderGeometry(0.022, 0.022, h, 10, 1, true);
      geo.translate(0, h / 2, 0);
      const bm = this.mat(key), sc = bm.userData.scale || 2;
      const uv = geo.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 0.14 / sc, uv.getY(i) * h / sc);
      const im = new THREE.InstancedMesh(geo, bm, list.length);
      list.forEach((b, k) => { dummy.position.set(b.x, 0, b.z); dummy.updateMatrix(); im.setMatrixAt(k, dummy.matrix); });
      im.castShadow = false; im.receiveShadow = true; im.userData.def = 'bead';
      im.computeBoundingSphere();
      this.group.add(im);
    }
  };
  // Dark, still water: a flooded engine room, a ditch, a drained reservoir's last pools
  W.murkMat = function () {
    const base = this.waterMat();
    const m = base.clone();
    m.color.setHex(0x1c2422); m.opacity = 0.9; m.roughness = 0.02;
    m.normalMap = base.normalMap; m.normalScale.set(0.12, 0.12);
    this.patch(m);
    this.mats.set('murk', m);
    return m;
  };

  // Other fences: chain-link on galvanised posts, wrought iron bars, rustic post-and-rail
  W.fenceKind = function (bufs, horiz, line, a0, a1, kind) {
    const mid = [horiz ? (a0 + a1) / 2 : line, horiz ? line : (a0 + a1) / 2];
    const box = (buf, cA, cB, y0, y1, hwA, hwB) => {
      const xa = horiz ? cA - hwA : cB - hwB, xb = horiz ? cA + hwA : cB + hwB, za = horiz ? cB - hwB : cA - hwA, zb = horiz ? cB + hwB : cA + hwA;
      this.vface(buf, xa, za, xb, za, y0, y1, 0, -1, 1, null); this.vface(buf, xa, zb, xb, zb, y0, y1, 0, 1, 1, null);
      this.vface(buf, xa, za, xa, zb, y0, y1, -1, 0, 1, null); this.vface(buf, xb, za, xb, zb, y0, y1, 1, 0, 1, null);
      this.hface(buf, xa, za, xb, zb, y1, true, 1, 1);
    };
    const len = a1 - a0;
    if (kind === 'chain') {
      const pb = this.chunkBuf(bufs, 'galvanized', mid[0], mid[1]), mb = this.chunkBuf(bufs, 'chainLink', mid[0], mid[1]);
      const n = Math.max(1, Math.round(len / 2.5)), top = 2.1;
      for (let k = 0; k <= n; k++) box(pb, a0 + len * k / n, line, 0, top + 0.05, 0.03, 0.03);
      box(pb, (a0 + a1) / 2, line, top - 0.03, top + 0.01, len / 2, 0.02);
      if (horiz) { this.vface(mb, a0, line, a1, line, 0.04, top, 0, 1, 1, null); this.vface(mb, a0, line, a1, line, 0.04, top, 0, -1, 1, null); }
      else { this.vface(mb, line, a0, line, a1, 0.04, top, 1, 0, 1, null); this.vface(mb, line, a0, line, a1, 0.04, top, -1, 0, 1, null); }
    } else if (kind === 'iron') {
      const ib = this.chunkBuf(bufs, 'railIron', mid[0], mid[1]), top = 1.6;
      for (let a = a0 + 0.07; a < a1; a += 0.14) { box(ib, a, line, 0, top, 0.009, 0.009); box(ib, a, line, top, top + 0.07, 0.016, 0.016); }
      for (const y of [0.12, top - 0.18]) box(ib, (a0 + a1) / 2, line, y, y + 0.03, len / 2, 0.014);
      const n = Math.max(1, Math.round(len / 3));
      for (let k = 0; k <= n; k++) box(ib, a0 + len * k / n, line, 0, top + 0.18, 0.04, 0.04);
    } else {
      // post and rail
      const wb = this.chunkBuf(bufs, 'railWood', mid[0], mid[1]);
      const n = Math.max(1, Math.round(len / 2.2));
      for (let k = 0; k <= n; k++) box(wb, a0 + len * k / n, line, 0, 1.15, 0.06, 0.06);
      for (const y of [0.45, 0.95]) box(wb, (a0 + a1) / 2, line, y, y + 0.1, len / 2, 0.025);
    }
  };

  // A gate of iron bars as a door leaf (centred on its own origin, like the box leaf it replaces)
  W.barsLeaf = function (w, h) {
    const g = new THREE.Group(), m = this.mat('railIron');
    const n = Math.max(3, Math.round(w / 0.12));
    const bar = new THREE.CylinderGeometry(0.011, 0.011, h - 0.04, 8);
    for (let k = 0; k < n; k++) { const b = new THREE.Mesh(bar, m); b.position.x = -w / 2 + 0.06 + k * (w - 0.12) / (n - 1); b.castShadow = true; g.add(b); }
    for (const y of [-h / 2 + 0.12, -0.05, h / 2 - 0.08]) { const r = new THREE.Mesh(new THREE.BoxGeometry(w - 0.04, 0.045, 0.03), m); r.position.y = y; r.castShadow = true; g.add(r); }
    const lock = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.16, 0.07), this.mat('brass')); lock.position.set(w / 2 - 0.12, -0.05, 0); g.add(lock);
    return g;
  };
  // A door leaf from a prop model (ship doors, carriage doors...): model space x 0..w, y 0..h, centred here
  W.leafModel = function (key, w, h) {
    const g = new THREE.Group();
    for (const part of PB.Props.build(key, PB.Props.DEFS[key])) { const m = new THREE.Mesh(part.geo, this.mat(part.mat)); m.position.set(-w / 2, -h / 2, 0); m.castShadow = true; m.receiveShadow = true; g.add(m); }
    return g;
  };

  // Themes of the hand-authored chapters: ambient (the light every place has when nothing is lit) is near
  // black everywhere; the materials come from the map's styles, these are fallbacks
  Object.assign(PB.THEMES, {
    ferry: { wall: 'shipPaint', floor: 'steelDeck', ceil: 'shipPaint', pillar: 'shipPaint', block: 'shipPaint', trim: 'rubber', trimH: 0.08, ambient: [0.003, 0.0035, 0.004], bounce: 0.35, ceilFactor: 0.6, env: [0.03, 0.035, 0.04], envPanel: [0.8, 0.9, 1.0], dust: 0.2, floorRefl: 0.12 },
    depot: { wall: 'plaster', floor: 'linoleum', ceil: 'plaster', pillar: 'plaster', trim: 'darkWood', trimH: 0.1, ambient: [0.0035, 0.003, 0.0026], bounce: 0.38, ceilFactor: 0.6, env: [0.04, 0.035, 0.03], envPanel: [1.2, 1.0, 0.8], dust: 0.35, floorRefl: 0.1 },
  });

  // Things that make the lights falter where they stand (Hummers, the Choir...): world.disturb is a map
  // of { x, z, w, r } kept up to date by the creatures
  W.disturbAt = function (x, z) {
    let k = 0;
    for (const d of this.disturb.values()) { const dd = Math.hypot(x - d.x, z - d.z); if (dd < d.r) k = Math.max(k, (1 - dd / d.r) * d.w); }
    return k;
  };
  const fb0 = W.fixtureBrightness;
  W.fixtureBrightness = function (f, t, pac) {
    let b = fb0.call(this, f, t, pac);
    if (this.disturb && this.disturb.size && b > 0.05) {
      const k = this.disturbAt(f.light.x, f.light.z);
      if (k > 0) { const r = U.hash2(Math.floor(t * 7 + f.light.x * 0.37), Math.floor(f.light.z), 11); b *= U.lerp(1, r < 0.45 ? 0.08 : r < 0.7 ? 0.45 : 0.85, k); }
    }
    return b;
  };

  // Cars on a hand-made map (a car deck, a drive-in): the street's car materials, lit by the baked light
  W.buildVehicles = function () {
    const ex = { carMats: {} }, carMat = PB.Exterior.Street.prototype.carMat;
    const patched = new Set();
    const mat = (n, o) => { const m = carMat.call(ex, n, o); if (!patched.has(m) && !m.isMeshBasicMaterial) { patched.add(m); this.patch(m); } return m; };
    this.vehicles = [];
    for (const v of this.L.meta.vehicles) {
      const car = PB.Vehicles.make(v, mat);
      car.position.set(v.x, v.y || 0, v.z); car.rotation.y = v.rot || 0;
      if (v.tilt) car.rotation.z = v.tilt;
      this.group.add(car); this.vehicles.push(car);
      const t = PB.Vehicles.TYPES[v.type] || PB.Vehicles.TYPES.sedan, c = Math.abs(Math.cos(v.rot || 0)), s = Math.abs(Math.sin(v.rot || 0));
      const hw = t.len / 2 * c + (t.hw + 0.05) * s, hd = t.len / 2 * s + (t.hw + 0.05) * c;
      this.addCollider({ minX: v.x - hw, maxX: v.x + hw, minZ: v.z - hd, maxZ: v.z + hd, maxY: 1.6 });
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
