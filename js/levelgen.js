/* Bölüm üreticisi: ızgara + kenar duvarlı dünya modeli, sekiz farklı düzen ve eşya yerleştirici.
   THREE veya DOM kullanmaz; Node içinde test edilebilir. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const U = PB.U;

  const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0]; // K, D, G, B
  const EDGE = { NONE: 0, WALL: 1, LOW: 2, GLASS: 3, FENCE: 4 };
  const SOLID = { NONE: 0, BLOCK: 1, RACK: 2, GLITCH: 3, VOID: 9 };
  const FLOOR = { NORMAL: 0, WATER: 1 };

  class Level {
    constructor(w, h, o = {}) {
      this.w = w; this.h = h;
      this.cell = o.cell || 3;
      this.ceil = o.ceil || 3;
      this.theme = o.theme || 'yellow';
      this.seed = o.seed || 1;
      this.solid = new Uint8Array(w * h);
      this.hW = new Uint8Array(w * (h + 1));
      this.vW = new Uint8Array((w + 1) * h);
      this.hP = new Uint8Array(w * (h + 1)); // korunan kenarlar (bağlantı onarımı dokunmaz)
      this.vP = new Uint8Array((w + 1) * h);
      this.floorType = new Uint8Array(w * h);
      this.zone = new Uint8Array(w * h);
      this.reserved = new Uint8Array(w * h);
      this.noLight = new Uint8Array(w * h);
      this.doors = []; this.doorMap = new Map();
      this.lights = []; this.props = []; this.pillars = []; this.decals = [];
      this.spots = {}; this.portals = []; this.portalMap = new Map(); this.triggers = [];
      this.meta = {};
      this.spawn = { x: 1, y: 1, yaw: 0 };
      for (let x = 0; x < w; x++) { this.hW[x] = 1; this.hW[h * w + x] = 1; }
      for (let y = 0; y < h; y++) { this.vW[y * (w + 1)] = 1; this.vW[y * (w + 1) + w] = 1; }
    }
    i(x, y) { return y * this.w + x; }
    inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
    cx(x) { return (x + 0.5) * this.cell; }
    cz(y) { return (y + 0.5) * this.cell; }
    cellOf(wx, wz) { return { x: Math.floor(wx / this.cell), y: Math.floor(wz / this.cell) }; }
    passable(x, y) { return this.inb(x, y) && this.solid[y * this.w + x] === 0; }

    edgeKind(x, y, d) {
      const w = this.w;
      if (d === 0) return this.hW[y * w + x];
      if (d === 2) return this.hW[(y + 1) * w + x];
      if (d === 3) return this.vW[y * (w + 1) + x];
      return this.vW[y * (w + 1) + x + 1];
    }
    edgeKey(x, y, d) {
      const w = this.w;
      if (d === 0) return (y * w + x) * 2;
      if (d === 2) return ((y + 1) * w + x) * 2;
      if (d === 3) return (y * (w + 1) + x) * 2 + 1;
      return (y * (w + 1) + x + 1) * 2 + 1;
    }
    isBoundary(x, y, d) {
      return (d === 0 && y === 0) || (d === 2 && y === this.h - 1) || (d === 3 && x === 0) || (d === 1 && x === this.w - 1);
    }
    isProtected(x, y, d) {
      const k = this.edgeKey(x, y, d);
      return (k & 1) ? this.vP[k >> 1] === 1 : this.hP[k >> 1] === 1;
    }
    setEdge(x, y, d, kind, force) {
      if (!force && this.isProtected(x, y, d)) return false;
      if (!force && this.isBoundary(x, y, d) && kind === 0) return false;
      const k = this.edgeKey(x, y, d);
      if (k & 1) this.vW[k >> 1] = kind; else this.hW[k >> 1] = kind;
      return true;
    }
    protectEdge(x, y, d) {
      const k = this.edgeKey(x, y, d);
      if (k & 1) this.vP[k >> 1] = 1; else this.hP[k >> 1] = 1;
    }
    addDoor(x, y, d, o = {}) {
      this.setEdge(x, y, d, 0, true);
      this.protectEdge(x, y, d);
      const door = Object.assign({ id: 'door' + this.doors.length, kind: 'wood', locked: false, open: false, x, y, d }, o);
      door.x = x; door.y = y; door.d = d;
      door.key = this.edgeKey(x, y, d);
      this.doors.push(door);
      this.doorMap.set(door.key, door);
      return door;
    }
    doorAt(x, y, d) { return this.doorMap.get(this.edgeKey(x, y, d)); }
    addPortal(ax, ay, bx, by) {
      this.portals.push({ ax, ay, bx, by });
      this.portalMap.set(this.i(ax, ay), this.i(bx, by));
      this.portalMap.set(this.i(bx, by), this.i(ax, ay));
    }

    // mode: 'all' (tüm kapılar geçilir), 'nav' (kilitli kapı engel), 'player' (kapalı kapı engel)
    step(x, y, d, mode) {
      const nx = x + DX[d], ny = y + DY[d];
      if (nx < 0 || ny < 0 || nx >= this.w || ny >= this.h) return false;
      if (this.solid[ny * this.w + nx]) return false;
      if (this.edgeKind(x, y, d)) return false;
      const door = this.doorMap.get(this.edgeKey(x, y, d));
      if (door) {
        if (mode === 'all') return true;
        if (door.locked) return false;
        if (mode === 'player' && !door.open) return false;
      }
      return true;
    }
    openCount(x, y, mode = 'all') {
      let n = 0;
      for (let d = 0; d < 4; d++) if (this.step(x, y, d, mode)) n++;
      return n;
    }
    bfs(sx, sy, mode = 'nav', out) {
      const n = this.w * this.h, w = this.w;
      const dist = out && out.length === n ? out : new Int32Array(n);
      dist.fill(-1);
      if (!this.passable(sx, sy)) return dist;
      const q = this._q && this._q.length === n ? this._q : (this._q = new Int32Array(n));
      let qh = 0, qt = 0;
      const s = sy * w + sx;
      dist[s] = 0; q[qt++] = s;
      while (qh < qt) {
        const c = q[qh++], x = c % w, y = (c / w) | 0, nd = dist[c] + 1;
        for (let d = 0; d < 4; d++) {
          if (!this.step(x, y, d, mode)) continue;
          const ni = c + (d === 0 ? -w : d === 1 ? 1 : d === 2 ? w : -1);
          if (dist[ni] >= 0) continue;
          dist[ni] = nd; q[qt++] = ni;
        }
        if (this.portalMap.size) {
          const pi = this.portalMap.get(c);
          if (pi !== undefined && dist[pi] < 0) { dist[pi] = nd; q[qt++] = pi; }
        }
      }
      return dist;
    }
    blocksSight(x, y, d, forLight) {
      const k = this.edgeKind(x, y, d);
      if (k === EDGE.WALL) return true;
      if (k === EDGE.FENCE && forLight === 2) return true;
      const door = this.doorMap.size ? this.doorMap.get(this.edgeKey(x, y, d)) : null;
      if (door && !door.open && door.kind !== 'glass' && door.kind !== 'bars') return true;
      return false;
    }
    // Dünya koordinatlarında görüş hattı (DDA)
    los(ax, az, bx, bz, forLight) {
      const C = this.cell;
      const x = ax / C, y = az / C, ex = bx / C, ey = bz / C;
      let cx = Math.floor(x), cy = Math.floor(y);
      const tx = Math.floor(ex), ty = Math.floor(ey);
      if (!this.inb(cx, cy)) return false;
      const dx = ex - x, dy = ey - y;
      const stepX = dx > 0 ? 1 : -1, stepY = dy > 0 ? 1 : -1;
      const tdx = dx !== 0 ? Math.abs(1 / dx) : Infinity;
      const tdy = dy !== 0 ? Math.abs(1 / dy) : Infinity;
      let tmx = dx !== 0 ? (stepX > 0 ? cx + 1 - x : x - cx) * tdx : Infinity;
      let tmy = dy !== 0 ? (stepY > 0 ? cy + 1 - y : y - cy) * tdy : Infinity;
      let guard = 0;
      while ((cx !== tx || cy !== ty) && guard++ < 1024) {
        let d;
        if (tmx < tmy) { if (tmx > 1) break; d = stepX > 0 ? 1 : 3; tmx += tdx; }
        else { if (tmy > 1) break; d = stepY > 0 ? 2 : 0; tmy += tdy; }
        if (this.blocksSight(cx, cy, d, forLight)) return false;
        cx += DX[d]; cy += DY[d];
        if (!this.inb(cx, cy)) return false;
        const s = this.solid[cy * this.w + cx];
        if (s === SOLID.BLOCK || s === SOLID.RACK || s === SOLID.GLITCH || s === SOLID.VOID) return false;
      }
      return true;
    }

    clearRect(x0, y0, x1, y1) {
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          this.solid[this.i(x, y)] = 0;
          if (x < x1) this.setEdge(x, y, 1, 0, true);
          if (y < y1) this.setEdge(x, y, 2, 0, true);
        }
      }
    }
    wallRect(x0, y0, x1, y1, kind = 1, protect = true) {
      for (let x = x0; x <= x1; x++) {
        this.setEdge(x, y0, 0, kind, true); this.setEdge(x, y1, 2, kind, true);
        if (protect) { this.protectEdge(x, y0, 0); this.protectEdge(x, y1, 2); }
      }
      for (let y = y0; y <= y1; y++) {
        this.setEdge(x0, y, 3, kind, true); this.setEdge(x1, y, 1, kind, true);
        if (protect) { this.protectEdge(x0, y, 3); this.protectEdge(x1, y, 1); }
      }
    }
    reserveRect(x0, y0, x1, y1, v = 1) {
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) this.reserved[this.i(x, y)] = v;
    }
    stampRoom(x0, y0, x1, y1, openings = [], tag) {
      this.clearRect(x0, y0, x1, y1);
      this.wallRect(x0, y0, x1, y1, 1, true);
      this.reserveRect(x0, y0, x1, y1, 1);
      for (const o of openings) {
        if (o.door) this.addDoor(o.x, o.y, o.d, o.door);
        else this.setEdge(o.x, o.y, o.d, 0, true);
      }
      if (tag) (this.meta.rooms || (this.meta.rooms = {}))[tag] = { x0, y0, x1, y1 };
      return { x0, y0, x1, y1 };
    }
    rectFree(x0, y0, x1, y1) {
      if (x0 < 1 || y0 < 1 || x1 > this.w - 2 || y1 > this.h - 2) return false;
      for (let y = y0 - 1; y <= y1 + 1; y++) for (let x = x0 - 1; x <= x1 + 1; x++) if (this.reserved[this.i(x, y)]) return false;
      return true;
    }
    // Erişilemeyen hücreleri korunmayan duvarları açarak bağla; kalanları boşluk yap
    fixConnectivity(sx, sy, rng) {
      for (let pass = 0; pass < 400; pass++) {
        const dist = this.bfs(sx, sy, 'all');
        const cands = [];
        let unreachable = 0;
        for (let y = 0; y < this.h; y++) {
          for (let x = 0; x < this.w; x++) {
            const i = this.i(x, y);
            if (this.solid[i] || dist[i] >= 0) continue;
            unreachable++;
            for (let d = 0; d < 4; d++) {
              const nx = x + DX[d], ny = y + DY[d];
              if (!this.inb(nx, ny)) continue;
              const ni = this.i(nx, ny);
              if (this.solid[ni] || dist[ni] < 0) continue;
              if (this.isProtected(x, y, d)) continue;
              cands.push([x, y, d]);
            }
          }
        }
        if (!unreachable) return;
        if (!cands.length) {
          for (let i = 0; i < dist.length; i++) if (dist[i] < 0 && !this.solid[i]) this.solid[i] = SOLID.VOID;
          return;
        }
        rng.shuffle(cands);
        const count = Math.max(1, Math.ceil(cands.length / 6));
        for (let k = 0; k < count; k++) { const c = cands[k]; this.setEdge(c[0], c[1], c[2], 0); }
      }
    }
    wallSides(x, y) {
      const out = [];
      for (let d = 0; d < 4; d++) if (this.edgeKind(x, y, d) === EDGE.WALL && !this.doorAt(x, y, d)) out.push(d);
      return out;
    }
    addLight(o) {
      const l = Object.assign({ y: this.ceil - 0.03, kind: 'panel', color: [1, 0.96, 0.84], intensity: 1, range: 11, flicker: 0, zone: 0, on: true, broken: false }, o);
      const c = this.cellOf(l.x, l.z);
      l.cx = c.x; l.cy = c.y;
      this.lights.push(l);
      return l;
    }
    addProp(type, x, z, rot = 0, o = {}) {
      const p = Object.assign({ type, x, z, rot }, o);
      this.props.push(p);
      return p;
    }
    addSpot(name, s) { (this.spots[name] || (this.spots[name] = [])).push(s); return s; }
    addDecal(o) { this.decals.push(o); return o; }
  }

  // ---------------- Ortak yapı taşları ----------------

  // Gedikli özyinelemeli bölme: Arka Odalar'ın düzensiz oda yapısı
  function divide(L, r, x0, y0, x1, y1, o, depth) {
    const w = x1 - x0 + 1, h = y1 - y0 + 1;
    if (w < o.min * 2 && h < o.min * 2) return;
    if (depth >= (o.minDepth || 1) && w * h <= o.maxRoom && r.chance(o.stop)) return;
    let horiz;
    if (w < o.min * 2) horiz = true;
    else if (h < o.min * 2) horiz = false;
    else horiz = h > w ? r.chance(0.78) : w > h ? r.chance(0.22) : r.chance(0.5);
    const kind = o.kind || EDGE.WALL;
    if (horiz) {
      const wy = r.int(y0 + o.min, y1 - o.min + 1);
      const gaps = gapSet(r, x0, x1, o);
      for (let x = x0; x <= x1; x++) if (!gaps.has(x) && !L.reserved[L.i(x, wy)] && !L.reserved[L.i(x, wy - 1)]) L.setEdge(x, wy, 0, kind);
      divide(L, r, x0, y0, x1, wy - 1, o, depth + 1);
      divide(L, r, x0, wy, x1, y1, o, depth + 1);
    } else {
      const wx = r.int(x0 + o.min, x1 - o.min + 1);
      const gaps = gapSet(r, y0, y1, o);
      for (let y = y0; y <= y1; y++) if (!gaps.has(y) && !L.reserved[L.i(wx, y)] && !L.reserved[L.i(wx - 1, y)]) L.setEdge(wx, y, 3, kind);
      divide(L, r, x0, y0, wx - 1, y1, o, depth + 1);
      divide(L, r, wx, y0, x1, y1, o, depth + 1);
    }
  }
  function gapSet(r, a, b, o) {
    const len = b - a + 1, gaps = new Set();
    const n = Math.max(1, Math.round(len / o.gapEvery) + (r.chance(0.3) ? 1 : 0));
    for (let g = 0; g < n; g++) {
      const start = r.int(a, b), gw = r.int(1, o.gapMax);
      for (let k = 0; k < gw; k++) if (start + k <= b) gaps.add(start + k);
    }
    return gaps;
  }
  function randomRemove(L, r, p) {
    for (let y = 0; y < L.h; y++) {
      for (let x = 0; x < L.w; x++) {
        if (L.reserved[L.i(x, y)]) continue;
        if (x < L.w - 1 && L.edgeKind(x, y, 1) === EDGE.WALL && !L.reserved[L.i(x + 1, y)] && r.chance(p)) L.setEdge(x, y, 1, 0);
        if (y < L.h - 1 && L.edgeKind(x, y, 2) === EDGE.WALL && !L.reserved[L.i(x, y + 1)] && r.chance(p)) L.setEdge(x, y, 2, 0);
      }
    }
  }
  function addStubs(L, r, count, maxLen) {
    for (let s = 0; s < count; s++) {
      let x = r.int(1, L.w - 2), y = r.int(1, L.h - 2);
      const horiz = r.chance(0.5), len = r.int(1, maxLen);
      for (let k = 0; k < len; k++) {
        if (!L.inb(x, y) || L.reserved[L.i(x, y)]) break;
        if (horiz) { if (y > 0 && !L.reserved[L.i(x, y - 1)]) L.setEdge(x, y, 0, EDGE.WALL); x++; }
        else { if (x > 0 && !L.reserved[L.i(x - 1, y)]) L.setEdge(x, y, 3, EDGE.WALL); y++; }
      }
    }
  }
  function longCorridors(L, r, count) {
    for (let c = 0; c < count; c++) {
      const horiz = r.chance(0.5);
      const len = r.int(Math.floor(Math.min(L.w, L.h) * 0.3), Math.floor(Math.min(L.w, L.h) * 0.6));
      if (horiz) {
        const y = r.int(2, L.h - 3), x0 = r.int(1, Math.max(1, L.w - len - 2));
        let nextGap = r.int(3, 7);
        for (let x = x0; x < x0 + len && x < L.w - 1; x++) {
          if (L.reserved[L.i(x, y)]) continue;
          if (x > x0) L.setEdge(x, y, 3, 0);
          if (--nextGap <= 0) { nextGap = r.int(4, 9); continue; }
          if (!L.reserved[L.i(x, y - 1)]) L.setEdge(x, y, 0, EDGE.WALL);
          if (!L.reserved[L.i(x, y + 1)]) L.setEdge(x, y, 2, EDGE.WALL);
        }
      } else {
        const x = r.int(2, L.w - 3), y0 = r.int(1, Math.max(1, L.h - len - 2));
        let nextGap = r.int(3, 7);
        for (let y = y0; y < y0 + len && y < L.h - 1; y++) {
          if (L.reserved[L.i(x, y)]) continue;
          if (y > y0) L.setEdge(x, y, 0, 0);
          if (--nextGap <= 0) { nextGap = r.int(4, 9); continue; }
          if (!L.reserved[L.i(x - 1, y)]) L.setEdge(x, y, 3, EDGE.WALL);
          if (!L.reserved[L.i(x + 1, y)]) L.setEdge(x, y, 1, EDGE.WALL);
        }
      }
    }
  }
  // Açık alanlardaki köşe noktalarına sütun koy (hücre merkezlerinde yol serbest kalır)
  function addPillars(L, r, p, every) {
    for (let vy = 1; vy < L.h; vy++) {
      for (let vx = 1; vx < L.w; vx++) {
        if (every && (vx % every !== 0 || vy % every !== 0)) continue;
        if (!every && !r.chance(p)) continue;
        const a = L.i(vx - 1, vy - 1), b = L.i(vx, vy - 1), c = L.i(vx - 1, vy), d = L.i(vx, vy);
        if (L.solid[a] || L.solid[b] || L.solid[c] || L.solid[d]) continue;
        if (L.reserved[a] || L.reserved[b] || L.reserved[c] || L.reserved[d]) continue;
        if (L.floorType[a] || L.floorType[b] || L.floorType[c] || L.floorType[d]) continue;
        if (L.edgeKind(vx - 1, vy - 1, 1) || L.edgeKind(vx - 1, vy - 1, 2) || L.edgeKind(vx, vy, 0) || L.edgeKind(vx, vy, 3)) continue;
        if (every && !r.chance(p)) continue;
        L.pillars.push({ vx, vy, x: vx * L.cell, z: vy * L.cell, size: 0.7 });
      }
    }
  }
  function ceilingLights(L, r, o) {
    const seed = L.seed + 77;
    for (let y = 0; y < L.h; y++) {
      for (let x = 0; x < L.w; x++) {
        const i = L.i(x, y);
        if (L.solid[i] || L.noLight[i]) continue;
        if (o.every && ((x + (o.offX || 0)) % o.every !== 0 || (y + (o.offY || 0)) % o.every !== 0)) continue;
        const n = U.perlin(x * 0.11, y * 0.11, 4096, seed);
        if (n < (o.darkThreshold == null ? -2 : o.darkThreshold)) continue;
        if (!r.chance(o.density)) continue;
        const broken = r.chance(o.broken || 0);
        L.addLight({
          x: L.cx(x), z: L.cz(y), y: (o.height || L.ceil) - 0.03, kind: o.kind || 'panel',
          color: o.color || [1, 0.95, 0.8], intensity: (o.intensity || 1) * r.range(0.9, 1.05),
          range: o.range || 11, flicker: !broken && r.chance(o.flicker || 0) ? r.range(0.35, 1) : 0,
          zone: o.zoneFn ? o.zoneFn(x, y) : 0, on: !broken, broken, rot: o.rot || 0,
        });
      }
    }
  }
  function farthestBoundaryCell(L, dist, minFrac, r) {
    let max = 0;
    for (let i = 0; i < dist.length; i++) if (dist[i] > max) max = dist[i];
    const cands = [];
    for (let y = 0; y < L.h; y++) {
      for (let x = 0; x < L.w; x++) {
        const onB = x === 0 || y === 0 || x === L.w - 1 || y === L.h - 1;
        if (!onB) continue;
        const d = dist[L.i(x, y)];
        if (d >= max * minFrac) cands.push([x, y, d]);
      }
    }
    cands.sort((a, b) => b[2] - a[2]);
    return cands.length ? cands[Math.min(cands.length - 1, r.int(0, Math.min(6, cands.length - 1)))] : null;
  }
  // Harita kenarına kapısı dışarı açılan küçük bir çıkış odası koy
  function stampBoundaryRoom(L, r, bx, by, rw, rh, tag, doorOpts) {
    let side;
    if (by === 0) side = 0; else if (by === L.h - 1) side = 2; else if (bx === 0) side = 3; else side = 1;
    let x0, y0, x1, y1;
    if (side === 0 || side === 2) {
      x0 = U.clamp(bx - Math.floor(rw / 2), 1, L.w - rw - 1); x1 = x0 + rw - 1;
      if (side === 0) { y0 = 0; y1 = rh - 1; } else { y1 = L.h - 1; y0 = L.h - rh; }
    } else {
      y0 = U.clamp(by - Math.floor(rw / 2), 1, L.h - rw - 1); y1 = y0 + rw - 1;
      if (side === 3) { x0 = 0; x1 = rh - 1; } else { x1 = L.w - 1; x0 = L.w - rh; }
    }
    // İç kapı (odaya giriş) ve dış kapı (çıkış)
    const doorCell = side === 0 || side === 2 ? { x: Math.floor((x0 + x1) / 2), y: side === 0 ? y0 : y1 } : { x: side === 3 ? x0 : x1, y: Math.floor((y0 + y1) / 2) };
    const entry = side === 0 ? { x: doorCell.x, y: y1, d: 2 } : side === 2 ? { x: doorCell.x, y: y0, d: 0 } : side === 3 ? { x: x1, y: doorCell.y, d: 1 } : { x: x0, y: doorCell.y, d: 3 };
    L.stampRoom(x0, y0, x1, y1, [entry], tag);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) L.solid[L.i(x, y)] = 0;
    const door = L.addDoor(doorCell.x, doorCell.y, side, Object.assign({ kind: 'exit', locked: true, nameKey: 'door.exit' }, doorOpts || {}));
    L.meta.exit = { x: doorCell.x, y: doorCell.y, d: side, door: door.id, room: { x0, y0, x1, y1 }, entry };
    return { x0, y0, x1, y1, side, doorCell, entry, door };
  }
  // Oda içinde, verilen yöne bakmayan ve kapısı olmayan bir duvar yüzeyi bul (girişe en yakını)
  function roomWallSpot(L, room, excludeD, near) {
    let best = null, bestD = Infinity;
    for (let y = room.y0; y <= room.y1; y++) for (let x = room.x0; x <= room.x1; x++) {
      for (const d of L.wallSides(x, y)) {
        if (d === excludeD) continue;
        const dd = near ? Math.abs(near.x - x) + Math.abs(near.y - y) : 0;
        if (dd < bestD) { bestD = dd; best = { x, y, d }; }
      }
    }
    return best || { x: room.x0, y: room.y0, d: 3 };
  }
  function randomRoomSpot(L, r, rw, rh, tries = 200) {
    for (let t = 0; t < tries; t++) {
      const x0 = r.int(2, L.w - rw - 2), y0 = r.int(2, L.h - rh - 2);
      if (L.rectFree(x0, y0, x0 + rw - 1, y0 + rh - 1)) return { x0, y0, x1: x0 + rw - 1, y1: y0 + rh - 1 };
    }
    return null;
  }
  function roomOpenings(L, r, rc, count) {
    const out = [];
    const sides = r.shuffle([0, 1, 2, 3]).slice(0, count);
    for (const s of sides) {
      if (s === 0) out.push({ x: r.int(rc.x0, rc.x1), y: rc.y0, d: 0 });
      if (s === 2) out.push({ x: r.int(rc.x0, rc.x1), y: rc.y1, d: 2 });
      if (s === 3) out.push({ x: rc.x0, y: r.int(rc.y0, rc.y1), d: 3 });
      if (s === 1) out.push({ x: rc.x1, y: r.int(rc.y0, rc.y1), d: 1 });
    }
    return out;
  }
  function landmark(L, r, tag, rw, rh, openings = 1) {
    const rc = randomRoomSpot(L, r, rw, rh);
    if (!rc) return null;
    L.stampRoom(rc.x0, rc.y0, rc.x1, rc.y1, roomOpenings(L, r, rc, openings), tag);
    L.addSpot(tag, { x: Math.floor((rc.x0 + rc.x1) / 2), y: Math.floor((rc.y0 + rc.y1) / 2), room: rc });
    return rc;
  }
  function pickSpawnCenter(L, r, region) {
    const rg = region || { x0: Math.floor(L.w * 0.35), y0: Math.floor(L.h * 0.35), x1: Math.floor(L.w * 0.65), y1: Math.floor(L.h * 0.65) };
    for (let t = 0; t < 500; t++) {
      const x = r.int(rg.x0, rg.x1), y = r.int(rg.y0, rg.y1);
      if (L.passable(x, y) && !L.reserved[L.i(x, y)] && L.floorType[L.i(x, y)] === 0) return { x, y };
    }
    return { x: rg.x0, y: rg.y0 };
  }
  function yawToward(L, x, y) {
    // En açık yöne bak (yaw: -Z = kuzey, 0)
    let best = 0, bestLen = -1;
    for (let d = 0; d < 4; d++) {
      let len = 0, cx = x, cy = y;
      while (len < 12 && L.step(cx, cy, d, 'all')) { cx += DX[d]; cy += DY[d]; len++; }
      if (len > bestLen) { bestLen = len; best = d; }
    }
    return [0, -Math.PI / 2, Math.PI, Math.PI / 2][best];
  }
  function decorDecals(L, r, count, kinds) {
    for (let k = 0; k < count; k++) {
      const x = r.int(0, L.w - 1), y = r.int(0, L.h - 1);
      if (!L.passable(x, y)) continue;
      const kind = r.pick(kinds);
      if (kind.floor) {
        L.addDecal({ type: kind.type, surface: 'floor', x: L.cx(x) + r.range(-1, 1), z: L.cz(y) + r.range(-1, 1), size: r.range(kind.min || 0.8, kind.max || 2.2), rot: r.range(0, Math.PI * 2) });
      } else if (kind.ceil) {
        L.addDecal({ type: kind.type, surface: 'ceil', x: L.cx(x) + r.range(-1, 1), z: L.cz(y) + r.range(-1, 1), size: r.range(kind.min || 0.8, kind.max || 2), rot: r.range(0, Math.PI * 2) });
      } else {
        const sides = L.wallSides(x, y);
        if (!sides.length) continue;
        const d = r.pick(sides);
        const h = kind.h != null ? kind.h : r.range(0.6, 2.2);
        L.addDecal(wallDecal(L, x, y, d, kind.type, r.range(kind.min || 0.6, kind.max || 1.6), h, r.range(-1, 1), kind.text ? r.pick(kind.text) : null));
      }
    }
  }
  function wallDecal(L, x, y, d, type, size, h, along = 0, text = null) {
    const C = L.cell, off = C / 2 - 0.105;
    const nx = -DX[d], nz = -DY[d];
    const px = L.cx(x) + DX[d] * off + (d % 2 === 0 ? along : 0);
    const pz = L.cz(y) + DY[d] * off + (d % 2 === 1 ? along : 0);
    return { type, surface: 'wall', x: px, y: h, z: pz, nx, nz, size, text, rot: 0 };
  }

  // ---------------- 0. Atari salonu (el yapımı) ----------------
  function genArcade(def) {
    const L = new Level(13, 10, { cell: 3, ceil: 3.6, theme: 'arcade', seed: def.seed });
    const r = U.rng(def.seed);
    // Salon ile personel koridoru arası (sütun 9'un batı kenarı)
    for (let y = 0; y < 10; y++) if (y !== 1 && y !== 7) L.setEdge(9, y, 3, EDGE.WALL, true);
    // Koridor ile arka odalar arası
    for (let y = 0; y < 10; y++) L.setEdge(10, y, 3, EDGE.WALL, true);
    L.addDoor(10, 1, 3, { id: 'officeDoor', kind: 'wood', locked: true, nameKey: 'door.office', lockKey: 'lock.office' });
    L.addDoor(10, 4, 3, { id: 'storageDoor', kind: 'metal', nameKey: 'door.storage' });
    L.addDoor(10, 8, 3, { id: 'wcDoor', kind: 'wood', nameKey: 'door.wc' });
    for (let x = 10; x <= 12; x++) { L.setEdge(x, 3, 0, EDGE.WALL, true); L.setEdge(x, 6, 0, EDGE.WALL, true); }
    // Giriş holü ile salon arası
    for (let x = 0; x <= 8; x++) if (x !== 1 && x !== 2 && x !== 7) L.setEdge(x, 7, 0, EDGE.WALL, true);
    // Ön cephe: vitrin camları ve kilitli cam kapı
    L.setEdge(0, 9, 2, EDGE.GLASS, true); L.setEdge(3, 9, 2, EDGE.GLASS, true);
    L.addDoor(1, 9, 2, { id: 'frontDoorA', kind: 'glass', locked: true, nameKey: 'door.front', lockKey: 'lock.front' });
    L.addDoor(2, 9, 2, { id: 'frontDoorB', kind: 'glass', locked: true, nameKey: 'door.front', lockKey: 'lock.front' });
    for (let y = 0; y < 10; y++) for (let x = 0; x < 13; x++) L.reserved[L.i(x, y)] = 1;
    L.spawn = { x: 1, y: 8, yaw: 0, wx: L.cx(1) + 0.8, wz: L.cz(8) + 0.6 };

    const C = L.cell;
    // Kabin sıraları (sırt sırta)
    const games = ['galaksi', 'kurbaga', 'tugla', 'yilan', 'uzay', 'yaris', 'dovus', 'tetris'];
    let gi = 0;
    for (const row of [2, 4]) {
      const z = L.cz(row);
      for (let x = 2.2; x < 26.5; x += 1.25) {
        if (x > 11.3 && x < 15.7) continue;
        L.addProp('cabinet', x, z - 0.52, Math.PI, { game: games[gi++ % games.length] });
        L.addProp('cabinet', x, z + 0.52, 0, { game: games[gi++ % games.length] });
      }
      L.addProp('collider', 6.9, z, 0, { collider: { hw: 5.3, hd: 1.0 } });
      L.addProp('collider', 21.4, z, 0, { collider: { hw: 5.7, hd: 1.0 } });
    }
    // Özel kabin: kuzey duvarında, tek başına, spot ışığı altında
    L.addProp('cabinet', L.cx(4) + 0.75, 0.62, 0, { game: 'special', id: 'specialCabinet', collider: { hw: 0.45, hd: 0.45 } });
    L.addSpot('specialCabinet', { x: 4, y: 0, wx: L.cx(4) + 0.75, wz: 1.35 });
    // Bedava oynanan klasik kabin (girişe yakın)
    L.addProp('cabinet', 0.62, L.cz(6) - 0.2, Math.PI / 2, { game: 'classic', id: 'freeCabinet', collider: { hw: 0.45, hd: 0.45 } });
    L.addSpot('freeCabinet', { x: 0, y: 6, wx: 1.35, wz: L.cz(6) - 0.2 });
    // Hava hokeyi, pinball, pençe makinesi
    L.addProp('airhockey', L.cx(5), L.cz(6) - 0.4, 0, { collider: { hw: 1.2, hd: 0.7 } });
    L.addProp('pinball', L.cx(8) + 0.8, L.cz(0) + 0.2, 0, { collider: { hw: 0.45, hd: 0.8 } });
    L.addProp('pinball', L.cx(8) + 0.8, L.cz(1) + 0.4, 0, { collider: { hw: 0.45, hd: 0.8 } });
    L.addProp('claw', L.cx(0) - 0.4, L.cz(1), Math.PI / 2, { collider: { hw: 0.6, hd: 0.6 } });
    L.addProp('change', L.cx(0) - 0.8, L.cz(3), Math.PI / 2, { collider: { hw: 0.35, hd: 0.4 } });
    // Ödül tezgâhı
    L.addProp('counter', L.cx(6) + 0.3, L.cz(7) + 0.3, 0, { collider: { hw: 3.1, hd: 0.45 } });
    L.addSpot('counter', { x: 6, y: 8, wx: L.cx(6) + 0.3, wz: L.cz(7) + 1.05 });
    L.addProp('prizeShelf', L.cx(6), L.h * C - 0.35, 0, { collider: { hw: 3, hd: 0.3 } });
    L.addProp('bench', L.cx(1), L.cz(8) + 0.9, 0, { collider: { hw: 1.1, hd: 0.3 } });
    // Ofis
    L.addProp('desk', L.cx(11) + 0.3, 1.1, 0, { collider: { hw: 1.0, hd: 0.45 }, lamp: true });
    L.addProp('chair', L.cx(11) + 0.3, 2.1, Math.PI);
    L.addProp('filing', L.cx(12) + 0.9, 0.5, 0, { collider: { hw: 0.4, hd: 0.35 } });
    L.addProp('safe', L.cx(12) + 0.9, L.cz(2) + 0.6, -Math.PI / 2, { collider: { hw: 0.4, hd: 0.4 } });
    L.addProp('corkboard', L.cx(10) - 1.45 + 0.02, 1.7, Math.PI / 2, { wall: true });
    L.addSpot('officeDesk', { x: 11, y: 0, wx: L.cx(11) + 0.3, wz: 1.1, h: 0.792 });
    L.addSpot('officeWall', { x: 11, y: 2, d: 2 });
    // Depo: sigorta kutusu doğu duvarında
    L.addProp('shelf', L.cx(11), L.cz(3) + 0.1, 0, { collider: { hw: 1.3, hd: 0.35 } });
    L.addProp('boxes', L.cx(12) + 0.5, L.cz(5) + 0.6, 0.3, { collider: { hw: 0.6, hd: 0.6 } });
    L.addSpot('fuseBox', { x: 12, y: 4, d: 1 });
    L.addSpot('storage', { x: 11, y: 5 });
    // Tuvalet
    L.addProp('sink', L.cx(12) + 1.1, L.cz(7), -Math.PI / 2, { collider: { hw: 0.3, hd: 0.4 } });
    L.addProp('mirror', L.cx(12) + 1.4, L.cz(7), -Math.PI / 2, { wall: true });
    L.addProp('toilet', L.cx(12) + 0.95, L.cz(9) + 0.6, -Math.PI / 2, { collider: { hw: 0.4, hd: 0.3 } });
    L.addProp('paperHolder', L.cx(12) + 1.4, L.cz(9) + 0.05, -Math.PI / 2, { wall: true, y: 0.72 });
    L.addProp('handDryer', L.cx(12) + 1.4, L.cz(7) + 0.95, -Math.PI / 2, { wall: true, y: 1.25 });
    L.addProp('trashCan', L.cx(12) + 1.05, L.cz(7) - 0.75, 0, { collider: { hw: 0.18, hd: 0.18 } });
    L.addSpot('wc', { x: 11, y: 8 });
    L.addSpot('hall', { x: 3, y: 5 });
    L.addSpot('corridor', { x: 9, y: 4 });

    // Işıklar: 1. bölge ana şalter (başta kapalı), 0 acil durum
    for (let y = 0; y <= 6; y += 2) for (let x = 1; x <= 8; x += 2) L.addLight({ x: L.cx(x), z: L.cz(y) + 1.5, y: 3.5, kind: 'spot', color: [1, 0.85, 0.7], intensity: 0.8, range: 9, zone: 1 });
    L.addLight({ x: L.cx(4) + 0.75, z: 1.6, y: 3.4, kind: 'spot', color: [1, 0.9, 0.5], intensity: 1.3, range: 6, zone: 1 });
    L.addLight({ x: L.cx(1), z: L.cz(8), y: 3.5, kind: 'panel', color: [0.9, 0.95, 1], intensity: 0.9, range: 9, zone: 1 });
    L.addLight({ x: L.cx(6), z: L.cz(8), y: 3.5, kind: 'panel', color: [1, 0.9, 0.8], intensity: 0.9, range: 9, zone: 1 });
    for (let y = 1; y < 10; y += 3) L.addLight({ x: L.cx(9), z: L.cz(y), y: 3.5, kind: 'bulb', color: [1, 0.8, 0.55], intensity: 0.7, range: 8, zone: 1, flicker: y === 7 ? 0.6 : 0 });
    L.addLight({ x: L.cx(11) - 0.3, z: 1.06, y: 1.02, kind: 'lamp', color: [1, 0.78, 0.5], intensity: 0.42, range: 4.5, zone: 1 });
    L.addLight({ x: L.cx(11), z: L.cz(4) + 1, y: 3.5, kind: 'bulb', color: [1, 0.85, 0.6], intensity: 0.7, range: 7, zone: 1 });
    L.addLight({ x: L.cx(11), z: L.cz(8), y: 3.5, kind: 'panel', color: [0.85, 1, 0.9], intensity: 0.6, range: 7, zone: 1, flicker: 0.8 });
    // Neon yazı ve kabin ekranlarının yaydığı ışık
    L.addLight({ x: L.cx(4), z: 0.3, y: 3.0, kind: 'neon', color: [1, 0.2, 0.6], intensity: 0.9, range: 10, zone: 1, text: 'STARLIGHT' });
    L.addLight({ x: L.cx(1), z: L.cz(4), y: 1.3, kind: 'glow', color: [0.4, 0.5, 1], intensity: 0.5, range: 7, zone: 1 });
    L.addLight({ x: L.cx(7), z: L.cz(4), y: 1.3, kind: 'glow', color: [0.8, 0.3, 1], intensity: 0.5, range: 7, zone: 1 });
    L.addLight({ x: L.cx(2), z: L.cz(2), y: 1.3, kind: 'glow', color: [0.3, 1, 0.6], intensity: 0.5, range: 7, zone: 1 });
    L.addLight({ x: L.cx(1), z: L.cz(9) + 0.9, y: 2.9, kind: 'exitSign', color: [0.3, 1, 0.4], intensity: 0.25, range: 5, zone: 0 });
    L.addLight({ x: L.cx(9), z: L.cz(0), y: 2.9, kind: 'exitSign', color: [0.3, 1, 0.4], intensity: 0.2, range: 5, zone: 0 });
    // Dışarıdaki sokak lambası: vitrinden sızan soğuk ışık
    L.addLight({ x: L.cx(1.5), z: L.h * C + 2, y: 3, kind: 'street', color: [0.55, 0.65, 1], intensity: 0.7, range: 9, zone: 0, outside: true });

    decorDecals(L, r, 18, [{ type: 'grime', floor: true, min: 0.5, max: 1.6 }, { type: 'gum', floor: true, min: 0.1, max: 0.2 }]);
    L.addDecal(wallDecal(L, 4, 0, 0, 'poster', 1.3, 1.7, -1.6, 'poster1'));
    L.addDecal(wallDecal(L, 6, 0, 0, 'poster', 1.3, 1.7, 0.5, 'poster2'));
    L.addDecal(wallDecal(L, 0, 2, 3, 'poster', 1.3, 1.7, 0, 'poster3'));
    L.addDecal(wallDecal(L, 8, 3, 1, 'poster', 1.3, 1.7, 0, 'poster4'));
    L.addDecal(wallDecal(L, 9, 5, 1, 'sign', 1.0, 1.9, 0, 'STAFF ONLY'));
    L.meta.outsideRain = true;
    L.meta.zonesOn = [0];
    // Room finishes: the back rooms are not carpeted like the hall
    L.meta.finishes = [
      { x0: 10, y0: 6, x1: 12, y1: 9, floor: 'floorTile', wall: 'wallTile', h: 1.45 },
      { x0: 10, y0: 0, x1: 12, y1: 2, floor: 'floorWood', wall: 'wainscotWood', h: 0.95 },
      { x0: 10, y0: 3, x1: 12, y1: 5, floor: 'floorConcrete' },
      { x0: 9, y0: 0, x1: 9, y1: 9, floor: 'floorLino' },
    ];
    return L;
  }

  // ---------------- Arka Odalar (Seviye 0 ve Karanlık) ----------------
  function genBackrooms(def) {
    const p = Object.assign({ w: 50, h: 50, min: 2, gapEvery: 5, gapMax: 2, stop: 0.35, maxRoom: 30, remove: 0.1, stubs: 70, stubLen: 3, corridors: 4, pillar: 0.1,
      light: { density: 0.9, darkThreshold: -0.42, flicker: 0.07, broken: 0.05 }, landmarks: [], zones: 0, theme: 'yellow' }, def.gen || {});
    const L = new Level(p.w, p.h, { cell: 3, ceil: p.ceil || 3, theme: p.theme, seed: def.seed });
    const r = U.rng(def.seed);
    // Önce özel odalar (korunur)
    for (const lm of p.landmarks) landmark(L, r, lm.tag, lm.w, lm.h, lm.openings || 1);
    divide(L, r, 0, 0, L.w - 1, L.h - 1, p, 0);
    longCorridors(L, r, p.corridors);
    randomRemove(L, r, p.remove);
    addStubs(L, r, p.stubs, p.stubLen);
    const sp = pickSpawnCenter(L, r, p.spawnRegion);
    L.fixConnectivity(sp.x, sp.y, r);
    let dist = L.bfs(sp.x, sp.y, 'all');
    const ex = farthestBoundaryCell(L, dist, 0.7, r);
    stampBoundaryRoom(L, r, ex[0], ex[1], 4, 3, 'exitRoom', p.exitDoor);
    L.fixConnectivity(sp.x, sp.y, r);
    addPillars(L, r, p.pillar, 0);
    L.spawn = { x: sp.x, y: sp.y, yaw: yawToward(L, sp.x, sp.y) };

    if (p.zones) {
      // Voronoi bölgeleri: karanlık seviyede her bölgenin kendi jeneratörü var
      dist = L.bfs(sp.x, sp.y, 'all');
      const seeds = [{ x: sp.x, y: sp.y }];
      for (let z = 1; z < p.zones; z++) {
        let best = null, bestD = -1;
        for (let t = 0; t < 400; t++) {
          const x = r.int(2, L.w - 3), y = r.int(2, L.h - 3);
          if (dist[L.i(x, y)] < 0) continue;
          let md = Infinity;
          for (const s of seeds) md = Math.min(md, Math.hypot(s.x - x, s.y - y));
          if (md > bestD) { bestD = md; best = { x, y }; }
        }
        seeds.push(best);
      }
      for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
        let bi = 0, bd = Infinity;
        seeds.forEach((s, k) => { const d = Math.hypot(s.x - x, s.y - y); if (d < bd) { bd = d; bi = k; } });
        L.zone[L.i(x, y)] = bi + 1;
      }
      L.meta.zoneSeeds = seeds;
    }
    const ex0 = L.meta.exit;
    L.addSpot('exitPanel', { x: ex0.x, y: ex0.y, d: ex0.d });
    if (p.zones) {
      // Her bölge tohumunun yakınında, duvara yaslı bir jeneratör noktası
      const dz = L.bfs(sp.x, sp.y, 'all');
      L.meta.zoneSeeds.forEach((sd, k) => {
        let best = null, bestD = Infinity;
        for (let y = 1; y < L.h - 1; y++) for (let x = 1; x < L.w - 1; x++) {
          const i = L.i(x, y);
          if (L.zone[i] !== k + 1 || L.reserved[i] || dz[i] < 0 || L.solid[i]) continue;
          if (k === 0 && Math.abs(x - sp.x) + Math.abs(y - sp.y) < 4) continue;
          const sides = L.wallSides(x, y);
          if (!sides.length) continue;
          const d = Math.hypot(x - sd.x, y - sd.y);
          if (d < bestD) { bestD = d; best = { x, y, d: sides[0] }; }
        }
        if (best) L.addSpot('generator', Object.assign(best, { zone: k + 1 }));
      });
    }
    const zoneFn = p.zones ? (x, y) => L.zone[L.i(x, y)] : null;
    ceilingLights(L, r, Object.assign({ zoneFn }, p.light));
    // Çıkış odasına her zaman bir ışık
    const er = L.meta.exit.room;
    L.addLight({ x: (er.x0 + er.x1 + 1) / 2 * L.cell, z: (er.y0 + er.y1 + 1) / 2 * L.cell, y: L.ceil - 0.03, kind: 'panel', color: [0.9, 1, 0.9], intensity: 1, range: 9, zone: p.zones ? L.zone[L.i(er.x0, er.y0)] : 0, flicker: 0.3 });
    decorDecals(L, r, Math.floor(L.w * L.h / 9), p.decals || [
      { type: 'stain', min: 0.8, max: 2.4, h: 2.1 }, { type: 'stain', min: 0.6, max: 1.6 }, { type: 'mold', min: 0.4, max: 1.2, h: 0.4 },
      { type: 'damp', floor: true, min: 1.2, max: 3.5 }, { type: 'damp', floor: true, min: 0.8, max: 2 }, { type: 'ceilStain', ceil: true, min: 0.6, max: 1.8 },
    ]);
    L.meta.zonesOn = p.zones ? [] : [0];
    return L;
  }

  // ---------------- Beton depo (Seviye 1) ----------------
  function genWarehouse(def) {
    const p = Object.assign({ w: 44, h: 44 }, def.gen || {});
    const L = new Level(p.w, p.h, { cell: 3, ceil: 7, theme: 'concrete', seed: def.seed });
    const r = U.rng(def.seed);
    // Küçük odalar: sigorta odası, ofisler, türbe
    landmark(L, r, 'shrine', 3, 3, 1);
    landmark(L, r, 'office1', 3, 3, 1);
    landmark(L, r, 'office2', 4, 3, 2);
    landmark(L, r, 'camp', 3, 2, 1);
    divide(L, r, 0, 0, L.w - 1, L.h - 1, { min: 8, gapEvery: 5, gapMax: 4, stop: 0.2, maxRoom: 150, minDepth: 2 }, 0);
    // Raf sıraları
    for (let y = 3; y < L.h - 3; y += 4) {
      let x = r.int(2, 5);
      while (x < L.w - 3) {
        const len = r.int(3, 8);
        for (let k = 0; k < len && x + k < L.w - 2; k++) {
          const i = L.i(x + k, y);
          if (L.reserved[i] || L.reserved[L.i(x + k, y - 1)] || L.reserved[L.i(x + k, y + 1)]) continue;
          if (r.chance(0.92)) L.solid[i] = SOLID.RACK;
        }
        x += len + r.int(2, 4);
      }
    }
    randomRemove(L, r, 0.05);
    const sp = pickSpawnCenter(L, r, { x0: 3, y0: 3, x1: 10, y1: 10 });
    L.fixConnectivity(sp.x, sp.y, r);
    let dist = L.bfs(sp.x, sp.y, 'all');
    const ex = farthestBoundaryCell(L, dist, 0.75, r);
    stampBoundaryRoom(L, r, ex[0], ex[1], 4, 3, 'elevatorRoom', { kind: 'elevator', nameKey: 'door.elevator', lockKey: 'lock.elevator' });
    L.fixConnectivity(sp.x, sp.y, r);
    addPillars(L, r, 0.9, 4);
    L.spawn = { x: sp.x, y: sp.y, yaw: yawToward(L, sp.x, sp.y) };
    // Sigorta paneli asansör odasının iç duvarında
    const e = L.meta.exit;
    L.addSpot('fusePanel', roomWallSpot(L, e.room, e.d, e.entry));
    // Asma lambalar
    ceilingLights(L, r, { every: 3, density: 0.75, broken: 0.3, flicker: 0.12, kind: 'hanging', height: 5.6, color: [1, 0.86, 0.62], intensity: 1.5, range: 16, darkThreshold: -0.3 });
    for (const tag of ['shrine', 'office1', 'office2', 'camp']) {
      const s = L.spots[tag] && L.spots[tag][0];
      if (s) L.addLight({ x: L.cx(s.x), z: L.cz(s.y), y: 3.9, kind: tag === 'shrine' ? 'shrine' : 'bulb', color: tag === 'shrine' ? [1, 0.15, 0.1] : [1, 0.85, 0.6], intensity: tag === 'shrine' ? 1.2 : 0.9, range: 8, flicker: tag === 'camp' ? 0.2 : 0 });
    }
    const er = L.meta.exit.room;
    L.addLight({ x: (er.x0 + er.x1 + 1) / 2 * L.cell, z: (er.y0 + er.y1 + 1) / 2 * L.cell, y: 4, kind: 'cage', color: [1, 0.3, 0.2], intensity: 0.9, range: 9, zone: 0 });
    L.meta.lowCeilingRooms = true;
    // Dekor: kasa, varil, palet (duvar kenarına yaslı)
    for (let k = 0; k < 170; k++) {
      const x = r.int(0, L.w - 1), y = r.int(0, L.h - 1);
      if (!L.passable(x, y) || L.reserved[L.i(x, y)]) continue;
      const sidesW = L.wallSides(x, y);
      const solidSides = [0, 1, 2, 3].filter(d => !L.inb(x + DX[d], y + DY[d]) || L.solid[L.i(x + DX[d], y + DY[d])]);
      const all = sidesW.concat(solidSides);
      if (!all.length) continue;
      const d = r.pick(all);
      const type = r.pick(['crate', 'crate', 'barrel', 'pallet', 'crateStack']);
      const along = r.range(-0.9, 0.9);
      const off = 1.05;
      const px = L.cx(x) + DX[d] * off + (d % 2 === 0 ? along : 0);
      const pz = L.cz(y) + DY[d] * off + (d % 2 === 1 ? along : 0);
      const hs = type === 'barrel' ? 0.32 : type === 'pallet' ? 0.6 : 0.45;
      L.addProp(type, px, pz, r.range(-0.3, 0.3), { collider: { hw: hs, hd: hs } });
    }
    decorDecals(L, r, Math.floor(L.w * L.h / 7), [
      { type: 'oil', floor: true, min: 0.8, max: 2.6 }, { type: 'crack', floor: true, min: 1, max: 3 }, { type: 'paintLine', floor: true, min: 2, max: 3 },
      { type: 'rust', min: 0.8, max: 2, h: 2.4 }, { type: 'stain', min: 1, max: 2.5 }, { type: 'graffiti', min: 1.2, max: 2, h: 1.6, text: ['IF YOU SEE RED, RUN', 'BLY 1987', 'WHAT TIME IS IT?', 'THERE WERE FOUR OF US'] },
    ]);
    L.meta.zonesOn = [0];
    return L;
  }

  // ---------------- Havuz odaları (Seviye 2) ----------------
  function genPools(def) {
    const p = Object.assign({ w: 40, h: 40 }, def.gen || {});
    const L = new Level(p.w, p.h, { cell: 3, ceil: 4.2, theme: 'pool', seed: def.seed });
    const r = U.rng(def.seed);
    // Ana havuz odası ortada
    const mx0 = Math.floor(L.w / 2) - 5, my0 = Math.floor(L.h / 2) - 4;
    const main = L.stampRoom(mx0, my0, mx0 + 9, my0 + 7, [{ x: mx0 + 4, y: my0, d: 0 }, { x: mx0 + 5, y: my0 + 7, d: 2 }, { x: mx0, y: my0 + 3, d: 3 }, { x: mx0 + 9, y: my0 + 4, d: 1 }], 'mainPool');
    for (let y = main.y0 + 2; y <= main.y1 - 2; y++) for (let x = main.x0 + 2; x <= main.x1 - 2; x++) L.floorType[L.i(x, y)] = FLOOR.WATER;
    L.meta.mainPool = { x0: main.x0 + 2, y0: main.y0 + 2, x1: main.x1 - 2, y1: main.y1 - 2 };
    L.addSpot('drain', { x: main.x0 + 4, y: main.y0 + 3 });
    landmark(L, r, 'shrine', 2, 3, 1);
    landmark(L, r, 'camp', 3, 3, 1);
    divide(L, r, 0, 0, L.w - 1, L.h - 1, { min: 4, gapEvery: 3, gapMax: 2, stop: 0.3, maxRoom: 70, minDepth: 2 }, 0);
    randomRemove(L, r, 0.06);
    // Odalarda havuzlar: bölme sonrası kapalı dikdörtgenleri tahmin etmek yerine rastgele dikdörtgenler dene
    for (let t = 0; t < 70; t++) {
      const pw = r.int(2, 5), ph = r.int(2, 4);
      const x0 = r.int(2, L.w - pw - 3), y0 = r.int(2, L.h - ph - 3);
      let ok = true;
      for (let y = y0 - 1; y <= y0 + ph && ok; y++) for (let x = x0 - 1; x <= x0 + pw && ok; x++) {
        const i = L.i(x, y);
        if (L.reserved[i] || L.floorType[i]) ok = false;
      }
      if (!ok) continue;
      // İç kenarlarda duvar olmamalı
      for (let y = y0; y < y0 + ph && ok; y++) for (let x = x0; x < x0 + pw && ok; x++) {
        if (x < x0 + pw - 1 && L.edgeKind(x, y, 1)) ok = false;
        if (y < y0 + ph - 1 && L.edgeKind(x, y, 2)) ok = false;
      }
      if (!ok) continue;
      for (let y = y0; y < y0 + ph; y++) for (let x = x0; x < x0 + pw; x++) L.floorType[L.i(x, y)] = FLOOR.WATER;
    }
    const sp = pickSpawnCenter(L, r, { x0: 2, y0: 2, x1: 8, y1: 8 });
    L.fixConnectivity(sp.x, sp.y, r);
    addPillars(L, r, 0.25, 0);
    L.spawn = { x: sp.x, y: sp.y, yaw: yawToward(L, sp.x, sp.y) };
    ceilingLights(L, r, { density: 0.6, darkThreshold: -0.32, broken: 0.05, flicker: 0.05, kind: 'poolPanel', height: 4.2, color: [0.92, 0.98, 1], intensity: 1.25, range: 12 });
    const shrine = L.spots.shrine && L.spots.shrine[0];
    if (shrine) L.addLight({ x: L.cx(shrine.x), z: L.cz(shrine.y), y: 3, kind: 'shrine', color: [0.1, 0.9, 1], intensity: 1.1, range: 7 });
    // Havuz merdivenleri ve şezlonglar
    for (let y = 1; y < L.h - 1; y++) for (let x = 1; x < L.w - 1; x++) {
      const i = L.i(x, y);
      if (L.floorType[i] !== FLOOR.WATER) continue;
      for (let d = 0; d < 4; d++) {
        const nx = x + DX[d], ny = y + DY[d];
        if (L.floorType[L.i(nx, ny)] === 0 && L.passable(nx, ny) && !L.edgeKind(x, y, d) && r.chance(0.07)) {
          L.addProp('ladder', L.cx(x) + DX[d] * 1.45, L.cz(y) + DY[d] * 1.45, [0, -Math.PI / 2, Math.PI, Math.PI / 2][d] + Math.PI);
        }
      }
    }
    for (let k = 0; k < 40; k++) {
      const x = r.int(1, L.w - 2), y = r.int(1, L.h - 2);
      const i = L.i(x, y);
      if (!L.passable(x, y) || L.floorType[i] || L.reserved[i]) continue;
      const sides = L.wallSides(x, y);
      if (!sides.length) continue;
      const d = r.pick(sides);
      L.addProp(r.chance(0.7) ? 'lounger' : 'towelRack', L.cx(x) + DX[d] * 0.9, L.cz(y) + DY[d] * 0.9, [0, -Math.PI / 2, Math.PI, Math.PI / 2][d], { collider: { hw: 0.5, hd: 0.5 } });
    }
    decorDecals(L, r, 80, [{ type: 'grime', floor: true, min: 0.6, max: 1.5 }, { type: 'algae', min: 0.5, max: 1.4, h: 0.35 }, { type: 'ceilStain', ceil: true, min: 0.5, max: 1.4 }]);
    L.meta.zonesOn = [0];
    return L;
  }

  // ---------------- Ofis katı (Seviye 3) ----------------
  function genOffice(def) {
    const p = Object.assign({ w: 45, h: 45 }, def.gen || {});
    const L = new Level(p.w, p.h, { cell: 3, ceil: 3, theme: 'office', seed: def.seed });
    const r = U.rng(def.seed);
    const step = 9;
    // Koridor ızgarası: x ve y = 4, 13, 22, 31, 40
    const lines = [];
    for (let v = 4; v < L.w - 1; v += step) lines.push(v);
    const isCorr = v => lines.includes(v);
    // Bloklar koridorlarla ayrılır
    const blocks = [];
    const bounds = [0].concat(lines.map(v => v)).concat([L.w]);
    for (let by = 0; by < bounds.length - 1; by++) {
      for (let bx = 0; bx < bounds.length - 1; bx++) {
        const x0 = bx === 0 ? 0 : bounds[bx] + 1, x1 = bounds[bx + 1] - 1;
        const y0 = by === 0 ? 0 : bounds[by] + 1, y1 = bounds[by + 1] - 1;
        if (x1 - x0 < 2 || y1 - y0 < 2) continue;
        blocks.push({ x0, y0, x1, y1 });
      }
    }
    // Koridor duvarları: blokların çevresi duvar, rastgele kapı boşlukları
    for (const b of blocks) {
      L.wallRect(b.x0, b.y0, b.x1, b.y1, EDGE.WALL, false);
    }
    r.shuffle(blocks);
    const types = ['security', 'stairs', 'shrine', 'openplan', 'openplan', 'openplan', 'offices', 'offices', 'meeting', 'server', 'kitchen', 'openplan', 'offices', 'openplan', 'archive', 'openplan'];
    blocks.forEach((b, k) => { b.type = types[k] || r.pick(['openplan', 'offices', 'openplan']); });
    // Merdiven boşluğu harita kenarına dokunan bir blokta olmalı
    const edgeBlock = blocks.find(b => b.type !== 'security' && (b.x0 === 0 || b.y0 === 0 || b.x1 === L.w - 1 || b.y1 === L.h - 1));
    const st = blocks.find(b => b.type === 'stairs');
    if (edgeBlock && st && edgeBlock !== st) { const t = edgeBlock.type; edgeBlock.type = 'stairs'; st.type = t; }
    const openBlockSide = (b, count, doorOpts) => {
      const opts = [];
      if (b.y0 > 0) opts.push(() => ({ x: r.int(b.x0, b.x1), y: b.y0, d: 0 }));
      if (b.y1 < L.h - 1) opts.push(() => ({ x: r.int(b.x0, b.x1), y: b.y1, d: 2 }));
      if (b.x0 > 0) opts.push(() => ({ x: b.x0, y: r.int(b.y0, b.y1), d: 3 }));
      if (b.x1 < L.w - 1) opts.push(() => ({ x: b.x1, y: r.int(b.y0, b.y1), d: 1 }));
      r.shuffle(opts);
      const res = [];
      for (let k = 0; k < Math.min(count, opts.length); k++) {
        const o = opts[k]();
        if (doorOpts && k === 0) L.addDoor(o.x, o.y, o.d, doorOpts);
        else { L.setEdge(o.x, o.y, o.d, 0, true); if (r.chance(0.6)) { const o2 = { x: o.x, y: o.y, d: o.d }; if (o.d % 2 === 0 && o.x + 1 <= b.x1) L.setEdge(o.x + 1, o.y, o.d, 0, true); else if (o.d % 2 === 1 && o2.y + 1 <= b.y1) L.setEdge(o.x, o.y + 1, o.d, 0, true); } }
        res.push(o);
      }
      return res;
    };
    for (const b of blocks) {
      const cxm = Math.floor((b.x0 + b.x1) / 2), cym = Math.floor((b.y0 + b.y1) / 2);
      if (b.type === 'security') {
        L.reserveRect(b.x0, b.y0, b.x1, b.y1);
        for (let x = b.x0; x <= b.x1; x++) for (let y = b.y0; y <= b.y1; y++) { if (x < b.x1) L.setEdge(x, y, 1, 0, true); if (y < b.y1) L.setEdge(x, y, 2, 0, true); }
        L.wallRect(b.x0, b.y0, b.x1, b.y1, EDGE.WALL, true);
        const o = openBlockSide(b, 1, { id: 'securityDoor', kind: 'security', locked: true, nameKey: 'door.security', lockKey: 'lock.security' })[0];
        L.addSpot('keypad', { x: o.x + DX[o.d], y: o.y + DY[o.d], d: (o.d + 2) % 4 });
        L.addSpot('keycard', { x: cxm, y: cym });
        L.addSpot('monitors', { x: b.x0, y: b.y0 });
        L.meta.security = b;
        L.addProp('monitorWall', L.cx(b.x0) + 0.2, L.cz(b.y0) - 1.2, 0, { collider: { hw: 1.5, hd: 0.3 } });
      } else if (b.type === 'stairs') {
        L.reserveRect(b.x0, b.y0, b.x1, b.y1);
        L.clearRect(b.x0, b.y0, b.x1, b.y1);
        L.wallRect(b.x0, b.y0, b.x1, b.y1, EDGE.WALL, true);
        openBlockSide(b, 1);
        // Harita kenarındaki kilitli merdiven kapısı
        let door = null;
        if (b.y0 === 0) door = { x: cxm, y: 0, d: 0 };
        else if (b.y1 === L.h - 1) door = { x: cxm, y: L.h - 1, d: 2 };
        else if (b.x0 === 0) door = { x: 0, y: cym, d: 3 };
        else door = { x: L.w - 1, y: cym, d: 1 };
        const dd = L.addDoor(door.x, door.y, door.d, { id: 'stairDoor', kind: 'stair', locked: true, nameKey: 'door.stair', lockKey: 'lock.stair' });
        L.meta.exit = { x: door.x, y: door.y, d: door.d, door: dd.id, room: b };
        L.addSpot('cardReader', { x: door.x, y: door.y, d: door.d });
      } else if (b.type === 'shrine') {
        L.reserveRect(b.x0, b.y0, b.x1, b.y1);
        L.clearRect(b.x0, b.y0, b.x1, b.y1);
        L.wallRect(b.x0, b.y0, b.x1, b.y1, EDGE.WALL, true);
        openBlockSide(b, 1);
        L.addSpot('shrine', { x: cxm, y: cym });
        L.addProp('meetingTable', L.cx(cxm), L.cz(cym), 0, { collider: { hw: 2.2, hd: 0.9 } });
        L.addLight({ x: L.cx(cxm), z: L.cz(cym), y: 2.97, kind: 'shrine', color: [1, 0.45, 0.8], intensity: 1.1, range: 9 });
      } else if (b.type === 'openplan') {
        openBlockSide(b, 3);
        // Bölmeler: 2x2 kabin adacıkları, her 3. satır koridor
        for (let y = b.y0; y <= b.y1; y++) {
          const ry = (y - b.y0) % 3;
          if (ry === 2) continue;
          for (let x = b.x0; x <= b.x1; x++) {
            const rx = (x - b.x0) % 3;
            if (rx === 2 || x === b.x1 && rx === 0) continue;
            // adacık hücresi: sağ ve alt kenar alçak bölme
            if (rx === 0 && x + 1 <= b.x1) L.setEdge(x, y, 1, EDGE.LOW, true);
            if (ry === 0 && y + 1 <= b.y1) {
              // sadece adacığın ortasında ayırıcı
            }
            if (ry === 1 && y + 1 <= b.y1) L.setEdge(x, y, 2, EDGE.LOW, true);
            if (ry === 0 && y - 1 >= b.y0) L.setEdge(x, y, 0, EDGE.LOW, true);
            // masa: alçak bölmeye dayalı
            const d = rx === 0 ? 1 : 3;
            const px = L.cx(x) + DX[d] * 0.95, pz = L.cz(y);
            L.addProp('cubicleDesk', px, pz, d === 1 ? Math.PI : 0, { collider: { hw: 0.45, hd: 0.8 }, hide: true, monitor: r.chance(0.85), cellX: x, cellY: y });
            if (r.chance(0.8)) L.addProp('officeChair', L.cx(x) + DX[d] * 0.1, L.cz(y) + r.range(-0.5, 0.5), r.range(0, 6.28));
          }
        }
        L.addSpot('openplan', { x: cxm, y: cym, b });
      } else if (b.type === 'offices') {
        openBlockSide(b, 2);
        // Blok ortasından geçen iç koridor + iki yanda küçük ofisler
        const midY = cym;
        for (let x = b.x0; x <= b.x1; x++) {
          if (midY - 1 >= b.y0) L.setEdge(x, midY, 0, EDGE.WALL, true);
          if (midY + 1 <= b.y1) L.setEdge(x, midY, 2, EDGE.WALL, true);
        }
        for (let x = b.x0 + 2; x <= b.x1; x += 2) {
          for (let y = b.y0; y < midY; y++) L.setEdge(x, y, 3, EDGE.WALL, true);
          for (let y = midY + 1; y <= b.y1; y++) L.setEdge(x, y, 3, EDGE.WALL, true);
        }
        for (let x = b.x0; x <= b.x1; x += 2) {
          const dx = Math.min(x + r.int(0, 1), b.x1);
          if (midY - 1 >= b.y0) { if (r.chance(0.5)) L.addDoor(dx, midY, 0, { kind: 'wood', open: r.chance(0.5) }); else L.setEdge(dx, midY, 0, 0, true); }
          if (midY + 1 <= b.y1) { if (r.chance(0.5)) L.addDoor(dx, midY, 2, { kind: 'wood', open: r.chance(0.5) }); else L.setEdge(dx, midY, 2, 0, true); }
          // Her ofiste masa + dolap
          for (const oy of [b.y0, b.y1]) {
            if (oy === midY) continue;
            const ox = Math.min(x, b.x1);
            L.addProp('desk', L.cx(ox) + 0.5, L.cz(oy) + (oy < midY ? -0.9 : 0.9), oy < midY ? 0 : Math.PI, { collider: { hw: 0.9, hd: 0.45 }, hide: true, monitor: r.chance(0.6), cellX: ox, cellY: oy });
            if (r.chance(0.6)) L.addProp('filing', L.cx(ox) - 1.1, L.cz(oy), 0, { collider: { hw: 0.3, hd: 0.35 } });
          }
        }
        L.addSpot('offices', { x: cxm, y: midY, b });
      } else if (b.type === 'meeting') {
        openBlockSide(b, 2);
        L.addProp('meetingTable', L.cx(cxm), L.cz(cym), 0, { collider: { hw: 2.2, hd: 0.9 } });
        L.addSpot('whiteboard', { x: b.x0, y: cym, d: 3 });
        L.addSpot('meeting', { x: cxm, y: cym });
      } else if (b.type === 'server') {
        openBlockSide(b, 1);
        for (let y = b.y0 + 1; y < b.y1; y += 2) for (let x = b.x0 + 1; x < b.x1; x++) L.solid[L.i(x, y)] = SOLID.RACK;
        L.addSpot('server', { x: b.x0, y: b.y0 });
      } else if (b.type === 'kitchen') {
        openBlockSide(b, 2);
        L.addProp('kitchenCounter', L.cx(b.x0) + 0.6, L.cz(cym), 0, { collider: { hw: 0.4, hd: 2.8 } });
        L.addProp('waterCooler', L.cx(b.x1) + 1.1, L.cz(b.y0) - 0.9, 0, { collider: { hw: 0.3, hd: 0.3 } });
        L.addSpot('kitchen', { x: cxm, y: cym });
      } else if (b.type === 'archive') {
        openBlockSide(b, 1);
        for (let y = b.y0 + 1; y <= b.y1 - 1; y += 2) for (let x = b.x0; x < b.x1; x++) if (r.chance(0.8)) L.solid[L.i(x, y)] = SOLID.RACK;
        L.addSpot('archive', { x: b.x0, y: b.y0 });
      }
    }
    // Koridorlar arası bağlantı: tüm koridor hücreleri zaten açık
    let sp = { x: lines[0], y: lines[0] };
    L.fixConnectivity(sp.x, sp.y, r);
    // Doğuş: merdiven kapısından ve güvenlik odasından en uzak koridor kesişimi
    if (L.meta.exit) {
      const de = L.bfs(L.meta.exit.x, L.meta.exit.y, 'all');
      let best = -1;
      for (const lx of lines) for (const ly of lines) {
        const d = de[L.i(lx, ly)];
        if (d > best) { best = d; sp = { x: lx, y: ly }; }
      }
    }
    L.spawn = { x: sp.x, y: sp.y, yaw: yawToward(L, sp.x, sp.y) };
    // Işıklar
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
      const i = L.i(x, y);
      if (L.solid[i]) continue;
      const corr = isCorr(x) || isCorr(y);
      if (corr && (x + y) % 2) continue;
      if (!corr && r.chance(0.15)) continue;
      const broken = r.chance(0.07);
      L.addLight({ x: L.cx(x), z: L.cz(y), y: 2.97, kind: 'panel', color: [0.9, 0.97, 1], intensity: corr ? 0.95 : 0.85, range: 10, broken, on: !broken, flicker: !broken && r.chance(0.06) ? r.range(0.3, 1) : 0 });
    }
    decorDecals(L, r, 110, [
      { type: 'coffee', floor: true, min: 0.3, max: 0.7 }, { type: 'paperFloor', floor: true, min: 0.3, max: 0.5 }, { type: 'paperFloor', floor: true, min: 0.3, max: 0.5 },
      { type: 'scuff', min: 0.6, max: 1.4, h: 0.3 }, { type: 'poster', min: 0.9, max: 1.1, h: 1.6, text: ['motive1', 'motive2', 'motive3'] }, { type: 'ceilStain', ceil: true, min: 0.5, max: 1.2 },
    ]);
    L.meta.zonesOn = [0];
    return L;
  }

  // ---------------- Klasik labirent (Seviye 5) ve Bölünmüş Ekran (Seviye 256) ----------------
  const CLASSIC = [
    '############################',
    '#............##............#',
    '#.####.#####.##.#####.####.#',
    '#o####.#####.##.#####.####o#',
    '#.####.#####.##.#####.####.#',
    '#..........................#',
    '#.####.##.########.##.####.#',
    '#.####.##.########.##.####.#',
    '#......##....##....##......#',
    '######.##### ## #####.######',
    '     #.##### ## #####.#     ',
    '     #.##          ##.#     ',
    '     #.## ###--### ##.#     ',
    '######.## #      # ##.######',
    '      .   #      #   .      ',
    '######.## #      # ##.######',
    '     #.## ######## ##.#     ',
    '     #.##          ##.#     ',
    '     #.## ######## ##.#     ',
    '######.## ######## ##.######',
    '#............##............#',
    '#.####.#####.##.#####.####.#',
    '#.####.#####.##.#####.####.#',
    '#o..##.......  .......##..o#',
    '###.##.##.########.##.##.###',
    '###.##.##.########.##.##.###',
    '#......##....##....##......#',
    '#.##########.##.##########.#',
    '#.##########.##.##########.#',
    '#..........................#',
    '############################',
  ];
  function genMaze(def, glitch) {
    const PAD = 3, W = 28 + PAD * 2, H = 31;
    const L = new Level(W, H, { cell: 3, ceil: 3.2, theme: glitch ? 'glitch' : 'maze', seed: def.seed });
    L.meta.pad = PAD;
    L.meta.pellets = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const mx = x - PAD;
      const ch = mx >= 0 && mx < 28 ? CLASSIC[y][mx] : (y === 14 ? ' ' : '#');
      const i = L.i(x, y);
      if (ch === '#') L.solid[i] = SOLID.BLOCK;
      // Labirent dışındaki boşluklar erişilemez: katı say
      if (ch === ' ' && y !== 14 && (mx < 6 || mx > 21) && (y >= 9 && y <= 19)) L.solid[i] = SOLID.VOID;
      if (ch === '.') L.meta.pellets.push({ x, y, power: false });
      if (ch === 'o') L.meta.pellets.push({ x, y, power: true });
    }
    // Hayalet evi kapısı ('-' hücreleri) evin kuzey sınırında
    L.addDoor(PAD + 13, 12, 0, { id: 'houseDoorA', kind: 'house', locked: true, nameKey: 'door.house', lockKey: 'lock.house' });
    L.addDoor(PAD + 14, 12, 0, { id: 'houseDoorB', kind: 'house', locked: true, nameKey: 'door.house', lockKey: 'lock.house' });
    L.setEdge(PAD + 13, 12, 1, 0, true);
    // Tünel: iki uç birbirine bağlı
    L.addPortal(0, 14, W - 1, 14);
    L.spawn = { x: PAD + 13, y: 23, yaw: -Math.PI / 2, wx: (PAD + 14) * L.cell, wz: L.cz(23) };
    L.addSpot('house', { x: PAD + 13, y: 14 });
    L.addSpot('houseInside', { x: PAD + 14, y: 14 });
    for (const [x, y] of [[PAD + 1, 1], [PAD + 26, 1], [PAD + 1, 29], [PAD + 26, 29], [PAD + 6, 5], [PAD + 21, 5], [PAD + 9, 26], [PAD + 18, 26]]) L.addSpot('corner', { x, y });
    L.addSpot('fruit', { x: PAD + 13, y: 17 });
    L.meta.noCeiling = true;

    if (glitch) {
      // Sağ yarı bozuk: ASCII karmaşası, rastgele bloklar ve boşluklar (klasik 256. seviye hatası)
      L.meta.glitchFrom = PAD + 14;
      const gr = U.rng(def.seed + 256);
      for (let y = 1; y < H - 1; y++) for (let x = PAD + 15; x < W - 1; x++) {
        const i = L.i(x, y);
        if (y === 14 && x >= W - PAD - 1) continue;
        if (L.solid[i] === SOLID.VOID) L.solid[i] = gr.chance(0.75) ? SOLID.GLITCH : 0;
        else if (L.solid[i] === SOLID.BLOCK) L.solid[i] = gr.chance(0.78) ? SOLID.GLITCH : 0;
        else if (gr.chance(0.3)) L.solid[i] = SOLID.GLITCH;
      }
      // Çekirdek odası: sağ ortada
      const cx0 = W - PAD - 7, cy0 = 12;
      for (let y = cy0; y <= cy0 + 4; y++) for (let x = cx0; x <= cx0 + 5; x++) L.solid[L.i(x, y)] = 0;
      L.reserveRect(cx0, cy0, cx0 + 5, cy0 + 4);
      L.addSpot('core', { x: cx0 + 3, y: cy0 + 2 });
      L.meta.core = { x0: cx0, y0: cy0, x1: cx0 + 5, y1: cy0 + 4 };
      // ÇIKIŞ kapısı: sağ alt köşede harita kenarında
      for (let y = H - 5; y < H - 1; y++) for (let x = W - PAD - 6; x < W - PAD; x++) L.solid[L.i(x, y)] = 0;
      L.solid[L.i(W - PAD - 1, H - 2)] = 0;
      for (let x = W - PAD - 1; x < W; x++) L.solid[L.i(x, H - 2)] = 0;
      const dd = L.addDoor(W - 1, H - 2, 1, { id: 'exitDoor', kind: 'exit', locked: false, nameKey: 'door.exit' });
      L.meta.exit = { x: W - 1, y: H - 2, d: 1, door: dd.id };
      // Tünelin sağ ucu bozuk alanın içinde kalır: geçit yok
      L.portals = []; L.portalMap = new Map();
      // Hayalet evi ve dış çerçeve kazılmaz
      const avoid = (x, y) => x <= 0 || y <= 0 || y >= H - 1 || (x >= PAD + 10 && x <= PAD + 17 && y >= 12 && y <= 16);
      carveCheapest(L, L.spawn.x, L.spawn.y, cx0 + 2, cy0 + 2, avoid);
      carveCheapest(L, L.spawn.x, L.spawn.y, W - PAD - 3, H - 3, avoid);
      // Bozuk tarafta birkaç ek dolambaçlı yol
      for (let k = 0; k < 6; k++) {
        const tx = gr.int(PAD + 15, W - PAD - 2), ty = gr.int(1, H - 2);
        if (!L.solid[L.i(tx, ty)]) carveCheapest(L, L.spawn.x, L.spawn.y, tx, ty, avoid);
      }
      const dist = L.bfs(L.spawn.x, L.spawn.y, 'all');
      for (let i = 0; i < dist.length; i++) if (dist[i] < 0 && !L.solid[i]) L.solid[i] = SOLID.VOID;
      // Pelletler sadece sağlam taraftakiler kalsın
      L.meta.pellets = L.meta.pellets.filter(p => p.x < PAD + 14 || !L.solid[L.i(p.x, p.y)]);
      L.meta.pellets.forEach(p => { if (p.x >= PAD + 14) p.glitch = true; });
    }
    // Neon şeritlerin yaydığı mavi ışık: her koridor hücresine görünmez bir dolgu ışığı
    const lr = U.rng(def.seed + 7);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (L.solid[L.i(x, y)]) continue;
      const glitchSide = glitch && x >= PAD + 15;
      const col = glitchSide ? lr.pick([[1, 0.2, 0.3], [0.2, 1, 1], [1, 0.6, 1], [1, 1, 0.2], [0.3, 0.3, 1]]) : [0.3, 0.34, 1];
      L.addLight({ x: L.cx(x), z: L.cz(y), y: 2.9, kind: 'none', color: col, intensity: glitchSide ? 0.4 : 0.3, range: 5.5, flicker: glitchSide && lr.chance(0.3) ? 0.8 : 0 });
    }
    // Hayalet evinin pembe ışığı
    L.addLight({ x: L.cx(PAD + 13) + 1.5, z: L.cz(14), y: 2.5, kind: 'none', color: [1, 0.4, 0.8], intensity: 0.9, range: 8 });
    L.meta.zonesOn = [0];
    return L;
  }
  // En az bloğu kaldırarak başlangıçtan hedefe yol aç (küçük ızgarada basit Dijkstra)
  function carveCheapest(L, sx, sy, tx, ty, avoid) {
    const n = L.w * L.h, cost = new Float64Array(n).fill(Infinity), prev = new Int32Array(n).fill(-1), done = new Uint8Array(n);
    const s = L.i(sx, sy), t = L.i(tx, ty);
    cost[s] = 0;
    for (let iter = 0; iter < n; iter++) {
      let c = -1, best = Infinity;
      for (let i = 0; i < n; i++) if (!done[i] && cost[i] < best) { best = cost[i]; c = i; }
      if (c < 0 || c === t) break;
      done[c] = 1;
      const x = c % L.w, y = (c / L.w) | 0;
      for (let d = 0; d < 4; d++) {
        const nx = x + DX[d], ny = y + DY[d];
        if (!L.inb(nx, ny) || (avoid && avoid(nx, ny) && L.solid[L.i(nx, ny)])) continue;
        if (L.edgeKind(x, y, d)) continue;
        const ni = L.i(nx, ny), sv = L.solid[ni];
        const w = sv === 0 ? 0.01 : sv === SOLID.GLITCH ? 1 : 3;
        if (cost[c] + w < cost[ni]) { cost[ni] = cost[c] + w; prev[ni] = c; }
      }
    }
    let c = t, guard = 0;
    while (c >= 0 && c !== s && guard++ < n) { L.solid[c] = 0; c = prev[c]; }
  }

  // ---------------- Eşya yerleştirici ----------------
  // specs: [{type, id, place:'near'|'mid'|'far'|'deadEnd'|'any'|'spot', spot, count, group, sep, wall, h, minFrac, data}]
  function placeItems(L, specs, seed) {
    const r = U.rng(seed || L.seed + 999);
    const dist = L.bfs(L.spawn.x, L.spawn.y, 'all');
    let maxD = 1;
    for (let i = 0; i < dist.length; i++) if (dist[i] > maxD) maxD = dist[i];
    const used = new Set([L.i(L.spawn.x, L.spawn.y)]);
    const placed = [];
    const cells = [];
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
      const i = L.i(x, y);
      if (dist[i] < 0 || L.solid[i] || L.floorType[i]) continue;
      cells.push({ x, y, i, d: dist[i], open: L.openCount(x, y, 'all'), reserved: L.reserved[i] });
    }
    const spotUse = {};
    const expand = [];
    for (const s of specs) for (let k = 0; k < (s.count || 1); k++) expand.push(Object.assign({}, s, { _k: k }));
    for (const s of expand) {
      let cell = null;
      if (s.place === 'spot') {
        const list = L.spots[s.spot] || [];
        const idx = s.reuse ? 0 : (spotUse[s.spot] || 0);
        let spt = list[idx];
        if (!s.reuse) spotUse[s.spot] = idx + 1;
        if (spt && (!L.inb(spt.x, spt.y) || L.solid[L.i(spt.x, spt.y)] || dist[L.i(spt.x, spt.y)] < 0)) spt = null;
        if (spt) {
          cell = { x: spt.x, y: spt.y, d: spt.d != null ? spt.d : -1, spot: spt };
        } else if (s.fallback) {
          s.place = s.fallback;
        } else {
          continue;
        }
      }
      if (!cell) {
        const lo = s.place === 'near' ? 1 : s.place === 'mid' ? maxD * 0.25 : s.place === 'far' ? maxD * (s.minFrac || 0.55) : s.place === 'deadEnd' ? maxD * (s.minFrac || 0.3) : 3;
        const hi = s.place === 'near' ? 7 : s.place === 'mid' ? maxD * 0.7 : Infinity;
        let pool = cells.filter(c => c.d >= lo && c.d <= hi && !used.has(c.i) && (s.allowReserved || !c.reserved));
        if (s.place === 'deadEnd') {
          const de = pool.filter(c => c.open === 1);
          if (de.length >= 2) pool = de;
        }
        if (s.wall) pool = pool.filter(c => L.wallSides(c.x, c.y).length > 0);
        if (!pool.length) pool = cells.filter(c => !used.has(c.i) && c.d >= 1);
        if (!pool.length) continue;
        const group = placed.filter(p => s.group && p.group === s.group);
        if (group.length || s.sep) {
          // En uzak nokta örneklemesi (grup içinde dağınık)
          const sample = r.shuffle(pool.slice()).slice(0, 80);
          let best = sample[0], bestScore = -1;
          for (const c of sample) {
            let md = Infinity;
            for (const g of group) md = Math.min(md, Math.hypot(g.x - c.x, g.y - c.y));
            if (!group.length) md = r() * 10;
            const score = md + (s.place === 'far' ? c.d * 0.05 : 0);
            if (score > bestScore) { bestScore = score; best = c; }
          }
          cell = best;
        } else {
          cell = r.pick(pool);
        }
        cell = { x: cell.x, y: cell.y, d: -1 };
        if (s.wall) cell.d = r.pick(L.wallSides(cell.x, cell.y));
      }
      if (!s.reuse) used.add(L.i(cell.x, cell.y));
      const item = { type: s.type, id: s.id ? (s.count > 1 ? s.id + (s._k + 1) : s.id) : s.type + placed.length, x: cell.x, y: cell.y, d: cell.d, group: s.group, data: s.data || null, spot: cell.spot || null, clue: !!s.clue, prop: s.prop || null };
      const C = L.cell;
      if (cell.spot && cell.spot.wx != null) {
        item.wx = cell.spot.wx; item.wz = cell.spot.wz; item.wy = cell.spot.h != null ? cell.spot.h : (s.h != null ? s.h : 0);
        // a spot against a wall faces away from it
        if (cell.spot.yaw != null) item.yaw = cell.spot.yaw;
        else if (cell.d >= 0) item.yaw = [0, -Math.PI / 2, Math.PI, Math.PI / 2][cell.d];
      } else if (cell.d >= 0) {
        const off = C / 2 - 0.1 - (s.depth || 0);
        const along = s.beside || 0;
        item.wx = L.cx(cell.x) + DX[cell.d] * off + (cell.d % 2 === 0 ? along : 0);
        item.wz = L.cz(cell.y) + DY[cell.d] * off + (cell.d % 2 === 1 ? along : 0);
        item.wy = s.h != null ? s.h : 1.3;
        item.yaw = [0, -Math.PI / 2, Math.PI, Math.PI / 2][cell.d];
      } else {
        const jitter = s.center ? 0 : 0.75;
        item.wx = L.cx(cell.x) + r.range(-jitter, jitter);
        item.wz = L.cz(cell.y) + r.range(-jitter, jitter);
        item.wy = s.h != null ? s.h : 0;
        item.yaw = r.range(0, Math.PI * 2);
      }
      if (s.offset) { item.wx += s.offset[0]; item.wz += s.offset[1]; }
      placed.push(item);
    }
    return placed;
  }

  const GEN = { arcade: genArcade, backrooms: genBackrooms, warehouse: genWarehouse, pools: genPools, office: genOffice, maze: d => genMaze(d, false), killscreen: d => genMaze(d, true) };
  PB.LevelGen = {
    Level, DX, DY, EDGE, SOLID, FLOOR, CLASSIC,
    generate(def) {
      const fn = GEN[def.layout];
      if (!fn) throw new Error('Unknown layout: ' + def.layout);
      const L = fn(def);
      L.def = def;
      L.items = placeItems(L, def.items || [], def.seed + 4242);
      return L;
    },
    placeItems,
    // Internals shared with the extra layouts (levelgen2.js)
    layouts: GEN,
    util: { divide, randomRemove, addStubs, longCorridors, addPillars, ceilingLights, farthestBoundaryCell, stampBoundaryRoom, roomWallSpot, randomRoomSpot, roomOpenings, landmark, pickSpawnCenter, yawToward, decorDecals, wallDecal, genBackrooms },
  };
})(typeof window !== 'undefined' ? window : globalThis);
