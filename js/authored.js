/* Hand-authored maps. Every chapter but the Underneath is drawn by hand as a plan on a "thin wall"
   grid and compiled here into the same Level the generators produce (no THREE, no DOM: Node can test it).

   The plan is 2h+1 rows of 2w+1 characters.
     Row 2k   is the edge line north of cell row k: corners at even columns (any character, '+' by
              habit), the kind of each north edge at odd columns.
     Row 2k+1 is cell row k: the kind of each west edge at even columns, the cell's region at odd columns.
   Edge characters:
     ' ' open          '-' '|' wall        'w' window wall      'l' low wall (counter, parapet)
     'f' fence         'r' railing         'i' invisible barrier (edge of an outdoor map)
     'd' wooden door   'm' metal door      'g' glass door       'b' bars
     anything else     a named door from the map's `doors` table
   Cell characters: a region from the map's `regions` table. ' ' is solid nothing.

   A region names a style (materials, ceiling height, footstep surface, outdoors or not) and optionally
   a light zone, water, or a room tag. After the plan is laid, the map's build(L, K) adds furniture,
   lights, spots and decals with the kit K (cell coordinates, fractions allowed). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const G = PB.LevelGen;
  const { Level, DX, DY, EDGE, SOLID } = G;
  const H = Math.PI / 2;

  const EDGE_CH = { ' ': 0, '.': 0, '-': EDGE.WALL, '|': EDGE.WALL, '+': EDGE.WALL, '#': EDGE.WALL, w: EDGE.GLASS, l: EDGE.LOW, f: EDGE.FENCE, r: EDGE.RAIL, i: EDGE.INVIS };
  const DOOR_CH = { d: 'wood', m: 'metal', g: 'glass', b: 'bars' };
  // Footstep surface by floor texture, when a style does not say
  const STEP_OF = { carpet: 'wetCarpet', officeCarpet: 'carpet', motelCarpet: 'carpet', arcadeCarpet: 'carpet', concreteFloor: 'concrete', tile: 'tile', hexTile: 'tile', terrazzo: 'tile', linoleum: 'lino', vinyl: 'lino', planks: 'wood', wood: 'wood', grass: 'grass', asphalt: 'concrete', snow: 'snow', ice: 'ice', mud: 'mud', gravel: 'gravel', rock: 'rock', steelDeck: 'deck', grating: 'grating', forestFloor: 'leaves', ballast: 'ballast', boards: 'wood', parquet: 'wood', trainCarpet: 'carpet', cobbles: 'concrete', flagstone: 'concrete', sand: 'gravel' };

  function err(def, msg) { return new Error('map ' + def.id + ': ' + msg); }

  // Material keys the world understands: W:/F:/C: + texture + ':' + tint (hex, optional)
  function styleKeys(st) {
    const tint = v => (v == null ? '' : (+v).toString(16));
    st.wallKey = 'W:' + st.wall + ':' + tint(st.wallTint);
    st.floorKey = 'F:' + st.floor + ':' + tint(st.floorTint);
    st.ceilKey = 'C:' + (st.ceil || st.wall) + ':' + tint(st.ceilTint);
    st.sidingKey = st.siding ? 'W:' + st.siding + ':' + tint(st.sidingTint) : null;
    if (st.wainscot) st.wainscotKey = 'W:' + st.wainscot.mat + ':' + tint(st.wainscot.tint);
    st.step = st.step || STEP_OF[st.floor] || 'concrete';
    return st;
  }

  function compile(def) {
    const A = def.authored;
    const rows = A.grid.slice();
    if (rows.length % 2 !== 1) throw err(def, 'plan needs an odd number of rows, has ' + rows.length);
    const width = Math.max(...rows.map(r => r.length));
    const W = (width - 1) >> 1, Hh = (rows.length - 1) >> 1;
    if (W < 1 || Hh < 1) throw err(def, 'empty plan');
    for (let k = 0; k < rows.length; k++) rows[k] = rows[k].padEnd(2 * W + 1, ' ');
    const L = new Level(W, Hh, { cell: A.cell || 3, ceil: A.ceil || 3, theme: def.theme, seed: def.seed });
    // the plan says where the boundary is; clear the generator's default frame
    L.hW.fill(0); L.vW.fill(0);
    const regions = A.regions || {};
    const styles = A.styles || {};
    // style table
    L.styles = []; const sIndex = new Map();
    const styleIdx = name => {
      if (sIndex.has(name)) return sIndex.get(name);
      const src = styles[name];
      if (!src) throw err(def, 'unknown style "' + name + '"');
      const st = styleKeys(Object.assign({ name, wall: 'drywall', floor: 'concreteFloor', ceil: null, h: A.ceil || 3 }, src));
      sIndex.set(name, L.styles.length); L.styles.push(st);
      return L.styles.length - 1;
    };
    L.styleOf = new Uint8Array(W * Hh);
    L.ceilH = new Float32Array(W * Hh);
    const outdoor = new Uint8Array(W * Hh);
    let anyOut = false, maxH = 0;
    const regionAt = new Array(W * Hh).fill(null);
    // cells
    for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
      const ch = rows[2 * y + 1][2 * x + 1], i = L.i(x, y);
      if (ch === ' ') { L.solid[i] = SOLID.VOID; continue; }
      const rg = regions[ch];
      if (!rg) throw err(def, 'unknown region "' + ch + '" at cell ' + x + ',' + y);
      regionAt[i] = rg;
      if (rg.solid === 'void') { L.solid[i] = SOLID.VOID; continue; }
      if (rg.solid === 'block') L.solid[i] = SOLID.BLOCK;
      else if (rg.solid === 'rack') L.solid[i] = SOLID.RACK;
      const si = styleIdx(rg.style || A.defaultStyle);
      const st = L.styles[si];
      L.styleOf[i] = si;
      const out = rg.outdoor != null ? rg.outdoor : !!st.outdoor;
      if (out) { outdoor[i] = 1; anyOut = true; }
      L.ceilH[i] = rg.h || st.h || (out ? 7 : 3);
      maxH = Math.max(maxH, L.ceilH[i]);
      if (rg.zone) L.zone[i] = rg.zone;
      if (rg.water) L.floorType[i] = 1;
      if (rg.noLight) L.noLight[i] = 1;
      if (rg.tag) {
        const rooms = L.meta.rooms || (L.meta.rooms = {});
        const r = rooms[rg.tag];
        if (!r) rooms[rg.tag] = { x0: x, y0: y, x1: x, y1: y };
        else { r.x0 = Math.min(r.x0, x); r.y0 = Math.min(r.y0, y); r.x1 = Math.max(r.x1, x); r.y1 = Math.max(r.y1, y); }
      }
    }
    L.ceil = maxH || 3;
    if (anyOut) L.meta.outdoor = outdoor;
    // edges
    const doorsTable = A.doors || {};
    const addEdge = (x, y, d, ch) => {
      if (ch in EDGE_CH) { L.setEdge(x, y, d, EDGE_CH[ch], true); if (EDGE_CH[ch]) L.protectEdge(x, y, d); return; }
      const spec = DOOR_CH[ch] ? { kind: DOOR_CH[ch] } : doorsTable[ch];
      if (!spec) throw err(def, 'unknown edge "' + ch + '" at cell ' + x + ',' + y + ' side ' + d);
      const o = Object.assign({}, spec);
      if (!DOOR_CH[ch] && !o.id) o.id = 'door_' + ch;
      L.addDoor(x, y, d, o);
    };
    for (let y = 0; y <= Hh; y++) for (let x = 0; x < W; x++) {
      const ch = rows[2 * y][2 * x + 1];
      // the edge north of cell (x, y) is the south edge of (x, y-1); address it from whichever side exists
      if (y < Hh) addEdge(x, y, 0, ch); else addEdge(x, y - 1, 2, ch);
    }
    for (let y = 0; y < Hh; y++) for (let x = 0; x <= W; x++) {
      const ch = rows[2 * y + 1][2 * x];
      if (x < W) addEdge(x, y, 3, ch); else addEdge(x - 1, y, 1, ch);
    }
    // Safety: an open edge between floor and nothing gets a wall (indoors) or an invisible barrier (outdoors)
    for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
      if (!L.passable(x, y)) continue;
      for (let d = 0; d < 4; d++) {
        const nx = x + DX[d], ny = y + DY[d];
        const voidN = !L.inb(nx, ny) || L.solid[L.i(nx, ny)] === SOLID.VOID;
        if (!voidN || L.edgeKind(x, y, d) || L.doorAt(x, y, d)) continue;
        L.setEdge(x, y, d, outdoor[L.i(x, y)] ? EDGE.INVIS : EDGE.WALL, true);
      }
    }
    // Wainscots and floor finishes are carried by the style; the world reads them per cell
    L.meta.authored = true;
    L.meta.noCeilingOut = anyOut;
    // spawn
    const sp = A.spawn || [0.5, 0.5, 0];
    L.spawn = { x: Math.floor(sp[0]), y: Math.floor(sp[1]), wx: sp[0] * L.cell, wz: sp[1] * L.cell, yaw: sp[2] || 0 };
    // links: pairs of doors that lead to each other (stairs, ladders, hatches)
    L.links = [];
    for (const [a, b] of A.links || []) {
      const da = L.doors.find(d => d.id === a), db = L.doors.find(d => d.id === b);
      if (!da || !db) throw err(def, 'link between unknown doors ' + a + ' / ' + b);
      da.link = b; db.link = a;
      L.links.push([a, b]);
    }
    // furniture, lights, spots
    const K = kit(L, def);
    if (A.build) A.build(L, K);
    // portal pairs so creatures can follow through linked doors
    for (const [a, b] of L.links) {
      const da = L.doors.find(d => d.id === a), db = L.doors.find(d => d.id === b);
      const ca = insideOf(L, da), cb = insideOf(L, db);
      if (ca && cb) L.portalMap.set(L.i(ca.x, ca.y), L.i(cb.x, cb.y)), L.portalMap.set(L.i(cb.x, cb.y), L.i(ca.x, ca.y));
    }
    validate(L, def);
    return L;
  }
  // The cell a door opens from (the passable side)
  function insideOf(L, door) {
    if (L.passable(door.x, door.y)) return { x: door.x, y: door.y };
    const nx = door.x + DX[door.d], ny = door.y + DY[door.d];
    return L.passable(nx, ny) ? { x: nx, y: ny } : null;
  }

  // Every floor cell must be reachable from the spawn (doors count as open) unless a region says otherwise
  function validate(L, def) {
    const dist = L.bfs(L.spawn.x, L.spawn.y, 'all');
    // linked doors connect their two sides
    let lost = 0;
    const reach = new Uint8Array(L.w * L.h);
    const stack = [L.i(L.spawn.x, L.spawn.y)];
    const link = new Map();
    for (const [a, b] of L.links) {
      const ca = insideOf(L, L.doors.find(d => d.id === a)), cb = insideOf(L, L.doors.find(d => d.id === b));
      if (ca && cb) { link.set(L.i(ca.x, ca.y), L.i(cb.x, cb.y)); link.set(L.i(cb.x, cb.y), L.i(ca.x, ca.y)); }
    }
    void dist;
    reach[stack[0]] = 1;
    while (stack.length) {
      const c = stack.pop(), x = c % L.w, y = (c / L.w) | 0;
      for (let d = 0; d < 4; d++) {
        if (!L.step(x, y, d, 'all')) continue;
        const n = L.i(x + DX[d], y + DY[d]);
        if (!reach[n]) { reach[n] = 1; stack.push(n); }
      }
      const l = link.get(c);
      if (l != null && !reach[l]) { reach[l] = 1; stack.push(l); }
    }
    const out = [];
    for (let i = 0; i < reach.length; i++) if (L.solid[i] === 0 && !reach[i]) { lost++; if (out.length < 6) out.push((i % L.w) + ',' + ((i / L.w) | 0)); }
    L.meta.unreachable = lost;
    if (lost && !(def.authored.allowIslands)) throw err(def, lost + ' cells cannot be reached from the spawn: ' + out.join(' '));
  }

  // ------------------------------------------------------------ the build kit
  function kit(L, def) {
    const C = L.cell;
    const K = {
      L, C, H,
      // world position of cell coordinates (fractions allowed: 3.5 is the middle of column 3)
      wx: x => x * C, wz: y => y * C,
      cell: (x, y) => ({ x: Math.floor(x), y: Math.floor(y) }),
      // furniture: cell coords, rotation in radians; o.col = [hw, hd] collider half-size (metres) or true
      prop(type, x, y, rot = 0, o = {}) {
        const p = L.addProp(type, x * C, y * C, rot, o);
        if (o.col) {
          const [hw, hd] = o.col === true ? [0.4, 0.4] : o.col;
          const c = Math.abs(Math.cos(rot)), s = Math.abs(Math.sin(rot));
          p.collider = { hw: hw * c + hd * s, hd: hw * s + hd * c };
          delete p.col;
        }
        return p;
      },
      // rows and grids of the same thing
      row(type, x0, y0, x1, y1, n, rot = 0, o = {}) {
        const out = [];
        for (let k = 0; k < n; k++) { const f = n === 1 ? 0.5 : k / (n - 1); out.push(K.prop(type, x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, rot, Object.assign({}, o))); }
        return out;
      },
      // a light at cell coords; y defaults to just under the ceiling there
      light(x, y, o = {}) {
        const cx = Math.floor(x), cy = Math.floor(y);
        const l = L.addLight(Object.assign({ x: x * C, z: y * C, y: (o.drop != null ? L.ceilAt(cx, cy) - o.drop : L.ceilAt(cx, cy) - 0.03) }, o));
        return l;
      },
      // an item spot: h = height above the floor, yaw = facing
      spot(name, x, y, o = {}) {
        return L.addSpot(name, Object.assign({ x: Math.floor(x), y: Math.floor(y), wx: x * C, wz: y * C, h: o.h != null ? o.h : 0 }, o));
      },
      // a spot on a wall: side d (0 N, 1 E, 2 S, 3 W) of cell (x, y), `along` metres from the cell middle
      wallSpot(name, x, y, d, o = {}) {
        const off = C / 2 - 0.1 - (o.depth || 0), along = o.along || 0;
        const wx = (x + 0.5) * C + DX[d] * off + (d % 2 === 0 ? along : 0), wz = (y + 0.5) * C + DY[d] * off + (d % 2 === 1 ? along : 0);
        return L.addSpot(name, Object.assign({ x, y, d, wx, wz, h: o.h != null ? o.h : 1.3, yaw: [0, -H, Math.PI, H][d] }, o));
      },
      decal(type, x, y, o = {}) { return L.addDecal(Object.assign({ type, surface: 'floor', x: x * C, z: y * C, size: 1, rot: 0 }, o)); },
      wallDecal(type, x, y, d, o = {}) {
        const off = C / 2 - 0.1, along = o.along || 0;
        return L.addDecal(Object.assign({ type, surface: 'wall', x: (x + 0.5) * C + DX[d] * off + (d % 2 === 0 ? along : 0), z: (y + 0.5) * C + DY[d] * off + (d % 2 === 1 ? along : 0), y: o.y || 1.5, nx: -DX[d], nz: -DY[d], size: 1 }, o));
      },
      room(tag, x0, y0, x1, y1) { (L.meta.rooms || (L.meta.rooms = {}))[tag] = { x0, y0, x1, y1 }; },
      // A hiding place built into furniture
      hide(p, kind, o = {}) { p.hide = true; p.hideKind = kind; Object.assign(p, o); return p; },
      // a trigger area (cells) the chapter script watches: { id, x0, y0, x1, y1 }
      trigger(id, x0, y0, x1, y1, o = {}) { const t = Object.assign({ id, x0, y0, x1, y1 }, o); L.triggers.push(t); return t; },
      // a place a creature starts or lurks
      lair(name, x, y, o = {}) { return K.spot('lair:' + name, x, y, o); },
      rng: PB.U.rng(def.seed || 1),
    };
    return K;
  }

  PB.Authored = { compile, kit, STEP_OF };
})(typeof window !== 'undefined' ? window : globalThis);
