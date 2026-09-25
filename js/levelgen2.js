/* More layouts: buildings (school, hospital, motel, mall), a rainy suburban street, Walt's
   workshop and the storm tunnels. Rooms get furniture, spots for items, numbered door signs. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U;
  const G = PB.LevelGen;
  const { Level, DX, DY, EDGE, SOLID } = G;
  const X = G.util;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ helpers
  const inner = (L, room) => ({ x0: room.x0 * L.cell + 0.12, x1: (room.x1 + 1) * L.cell - 0.12, z0: room.y0 * L.cell + 0.12, z1: (room.y1 + 1) * L.cell - 0.12 });
  // A point against wall side d of a room, at fraction f along it, pushed off the wall by off
  function wallPoint(L, room, d, f, off) {
    const b = inner(L, room);
    if (d === 0) return { x: U.lerp(b.x0, b.x1, f), z: b.z0 + off, rot: 0 };
    if (d === 2) return { x: U.lerp(b.x0, b.x1, f), z: b.z1 - off, rot: PI };
    if (d === 3) return { x: b.x0 + off, z: U.lerp(b.z0, b.z1, f), rot: H };
    return { x: b.x1 - off, z: U.lerp(b.z0, b.z1, f), rot: -H };
  }
  const opposite = d => (d + 2) % 4;
  const sideLen = (L, room, d) => (d % 2 === 0 ? room.x1 - room.x0 + 1 : room.y1 - room.y0 + 1) * L.cell;
  const doorFrac = (L, room) => { const dr = room.door; if (!dr) return -1; return dr.d % 2 === 0 ? (dr.x - room.x0 + 0.5) / (room.x1 - room.x0 + 1) : (dr.y - room.y0 + 0.5) / (room.y1 - room.y0 + 1); };
  function prop(L, type, x, z, rot, o = {}) { return L.addProp(type, x, z, rot, o); }
  function spotIn(L, room, tag, o = {}) { return L.addSpot(tag, Object.assign({ x: Math.floor((room.x0 + room.x1) / 2), y: Math.floor((room.y0 + room.y1) / 2), room }, o)); }
  function wallSpot(L, room, tag, d, f, h) {
    const p = wallPoint(L, room, d, f, 0.02);
    const c = L.cellOf(p.x, p.z);
    return L.addSpot(tag, { x: c.x, y: c.y, d, wx: p.x - DX[d] * 0.0, wz: p.z, h, wall: true });
  }

  // ------------------------------------------------------------ BUILDING (corridors + rooms)
  function genBuilding(def) {
    const p = Object.assign({ w: 34, h: 22, ceil: 3.2, rows: [10], cols: [], cw: 2, maxDepth: 4, roomW: [3, 4], specials: [], tags: [['room', 1]], doorKind: 'wood', lockedFrac: 0.15, light: {}, exitKind: 'metal', numbered: 0, glassFronts: false, corridorProps: null }, def.gen);
    const L = new Level(p.w, p.h, { cell: 3, ceil: p.ceil, theme: def.theme, seed: def.seed });
    const r = U.rng(def.seed), W = p.w, Hh = p.h, C = L.cell;
    const corr = new Uint8Array(W * Hh);
    for (const row of p.rows) for (let k = 0; k < p.cw; k++) for (let x = 0; x < W; x++) corr[L.i(x, row + k)] = 1;
    for (const col of p.cols) for (let k = 0; k < p.cw; k++) for (let y = 0; y < Hh; y++) corr[L.i(col + k, y)] = 1;
    L.meta.corridor = corr;
    // Blocks between corridors
    const seen = new Uint8Array(W * Hh), blocks = [];
    for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
      const i0 = L.i(x, y);
      if (corr[i0] || seen[i0]) continue;
      let x0 = x, x1 = x, y0 = y, y1 = y;
      const q = [[x, y]]; seen[i0] = 1;
      while (q.length) {
        const [cx, cy] = q.pop();
        x0 = Math.min(x0, cx); x1 = Math.max(x1, cx); y0 = Math.min(y0, cy); y1 = Math.max(y1, cy);
        for (let d = 0; d < 4; d++) { const nx = cx + DX[d], ny = cy + DY[d]; if (!L.inb(nx, ny)) continue; const ni = L.i(nx, ny); if (corr[ni] || seen[ni]) continue; seen[ni] = 1; q.push([nx, ny]); }
      }
      blocks.push({ x0, y0, x1, y1 });
    }
    const specials = p.specials.map(s => Object.assign({ left: s.count || 1 }, s));
    const pickTag = () => { let t = r() * p.tags.reduce((a, b) => a + b[1], 0); for (const [tag, wgt] of p.tags) { t -= wgt; if (t <= 0) return tag; } return p.tags[0][0]; };
    const rooms = [];
    for (const b of blocks) {
      const adj = { top: b.y0 > 0 && corr[L.i(b.x0, b.y0 - 1)], bottom: b.y1 < Hh - 1 && corr[L.i(b.x0, b.y1 + 1)], left: b.x0 > 0 && corr[L.i(b.x0 - 1, b.y0)], right: b.x1 < W - 1 && corr[L.i(b.x1 + 1, b.y0)] };
      const horiz = adj.top || adj.bottom;
      // Bands: along the corridor side(s)
      const bands = [];
      if (horiz) {
        const depth = b.y1 - b.y0 + 1;
        if (adj.top && adj.bottom && depth > p.maxDepth) { const mid = b.y0 + Math.floor(depth / 2) - 1; bands.push({ a0: b.x0, a1: b.x1, b0: b.y0, b1: mid, d: 0 }, { a0: b.x0, a1: b.x1, b0: mid + 1, b1: b.y1, d: 2 }); }
        else bands.push({ a0: b.x0, a1: b.x1, b0: b.y0, b1: b.y1, d: adj.top ? 0 : 2 });
      } else {
        const depth = b.x1 - b.x0 + 1;
        if (adj.left && adj.right && depth > p.maxDepth) { const mid = b.x0 + Math.floor(depth / 2) - 1; bands.push({ a0: b.y0, a1: b.y1, b0: b.x0, b1: mid, d: 3 }, { a0: b.y0, a1: b.y1, b0: mid + 1, b1: b.x1, d: 1 }); }
        else bands.push({ a0: b.y0, a1: b.y1, b0: b.x0, b1: b.x1, d: adj.left ? 3 : adj.right ? 1 : 3 });
      }
      for (const band of bands) {
        const depth = band.b1 - band.b0 + 1;
        let a = band.a0;
        while (a <= band.a1) {
          const rem = band.a1 - a + 1;
          let wdt = r.int(p.roomW[0], p.roomW[1]), tag = null, sp = null;
          sp = specials.find(s => s.left > 0 && (s.minD || 1) <= depth && s.w <= rem && (!s.maxD || depth <= s.maxD));
          if (sp && r() < (sp.chance || 0.6)) { wdt = sp.w; tag = sp.tag; sp.left--; } else sp = null;
          if (rem - wdt < p.roomW[0]) wdt = rem;
          const room = horiz ? { x0: a, x1: a + wdt - 1, y0: band.b0, y1: band.b1 } : { x0: band.b0, x1: band.b1, y0: a, y1: a + wdt - 1 };
          // Rooms are only as deep as they need to be; what lies behind the back wall is solid
          const want = Math.max(1, (sp && sp.depth) || p.roomDepth || depth);
          if (depth > want) {
            const cut = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) L.solid[L.i(x, y)] = SOLID.VOID; };
            if (horiz) { if (band.d === 0) { cut(room.x0, room.y0 + want, room.x1, room.y1); room.y1 = room.y0 + want - 1; } else { cut(room.x0, room.y0, room.x1, room.y1 - want); room.y0 = room.y1 - want + 1; } }
            else if (band.d === 3) { cut(room.x0 + want, room.y0, room.x1, room.y1); room.x1 = room.x0 + want - 1; } else { cut(room.x0, room.y0, room.x1 - want, room.y1); room.x0 = room.x1 - want + 1; }
          }
          room.side = band.d; room.tag = tag || pickTag(); room.special = sp;
          rooms.push(room);
          a += wdt;
        }
      }
    }
    // Specials that found no place take over the largest fitting rooms
    for (const s of specials) while (s.left > 0) {
      const cand = rooms.filter(rm => !rm.special).sort((A, B) => (B.x1 - B.x0 + 1) * (B.y1 - B.y0 + 1) - (A.x1 - A.x0 + 1) * (A.y1 - A.y0 + 1))[0];
      if (!cand) break;
      cand.tag = s.tag; cand.special = s; s.left--;
    }
    // Walls, doors, signs
    let num = p.numbered || 0;
    rooms.sort((A, B) => (A.y0 - B.y0) || (A.x0 - B.x0));
    for (const rm of rooms) {
      L.wallRect(rm.x0, rm.y0, rm.x1, rm.y1, 1, true);
      const d = rm.side;
      const span = d % 2 === 0 ? [rm.x0, rm.x1] : [rm.y0, rm.y1];
      const along = (span[1] - span[0]) >= 2 ? r.int(span[0], span[1]) : span[0];
      const cx = d % 2 === 0 ? along : (d === 3 ? rm.x0 : rm.x1), cy = d % 2 === 0 ? (d === 0 ? rm.y0 : rm.y1) : along;
      const sp = rm.special || {};
      const locked = sp.locked != null ? sp.locked : !rm.special && r() < p.lockedFrac;
      rm.randomLocked = locked && !rm.special;
      let label = sp.label || null;
      if (!label && p.numbered != null && p.numbered !== false && !sp.noNumber && !sp.sign) { do { num++; } while (specials.some(x => x.label === String(num))); label = String(num); }
      if (p.glassFronts && !sp.noGlass) for (let k = span[0]; k <= span[1]; k++) { const ex = d % 2 === 0 ? k : cx, ey = d % 2 === 0 ? cy : k; L.setEdge(ex, ey, d, EDGE.GLASS, true); L.protectEdge(ex, ey, d); }
      const door = L.addDoor(cx, cy, d, { kind: sp.doorKind || (p.glassFronts ? 'glass' : p.doorKind), locked, nameKey: sp.nameKey || (locked ? 'door.jammed' : null), lockKey: sp.lockKey || 'lock.jammed', id: sp.doorId || undefined, label });
      rm.door = door; rm.doors = [door]; rm.label = label;
      if (sp.keypad) { const ox = cx + DX[d], oy = cy + DY[d]; L.addSpot(rm.tag + 'Keypad', { x: ox, y: oy, d: opposite(d) }); }
      if (label || sp.sign) {
        const ox = cx + DX[d], oy = cy + DY[d];
        if (L.inb(ox, oy)) L.addDecal(X.wallDecal(L, ox, oy, opposite(d), 'sign', 0.42, 2.05, 0.95 * (d === 0 || d === 1 ? -1 : 1), sp.sign || label));
      }
      // Mall storefronts: a big lit sign across the top of the glass
      if (p.storeSigns && sp.sign) {
        const C = L.cell, mid = (span[0] + span[1] + 1) / 2 * C;
        const lineC = d === 0 ? rm.y0 * C : d === 2 ? (rm.y1 + 1) * C : d === 3 ? rm.x0 * C : (rm.x1 + 1) * C;
        const off = 0.115, x = d % 2 === 0 ? mid : lineC + DX[d] * off, z = d % 2 === 0 ? lineC + DY[d] * off : mid;
        L.addDecal({ type: 'storeSign', surface: 'wall', x, y: Math.min(p.ceil - 0.9, 3.7), z, nx: DX[d], nz: DY[d], size: Math.min(5, (span[1] - span[0] + 1) * C * 0.75), text: sp.sign, rot: 0 });
      }
      if (sp.second && (span[1] - span[0]) >= 4) { const k2 = along > (span[0] + span[1]) / 2 ? span[0] + 1 : span[1] - 1; const ex = d % 2 === 0 ? k2 : cx, ey = d % 2 === 0 ? cy : k2; rm.doors.push(L.addDoor(ex, ey, d, { kind: p.glassFronts ? 'glass' : p.doorKind, locked: false })); }
      L.reserveRect(rm.x0, rm.y0, rm.x1, rm.y1, 1);
      (L.meta.rooms || (L.meta.rooms = {}))[rm.tag] = L.meta.rooms[rm.tag] || rm;
      spotIn(L, rm, rm.tag);
      spotIn(L, rm, 'room');
    }
    L.meta.bRooms = rooms;
    // Exit at the far end of the first corridor, spawn at the near end
    const er = p.rows[0], exitY = er + (p.cw > 1 ? 1 : 0);
    const exitDoor = L.addDoor(W - 1, exitY, 1, { kind: p.exitKind, locked: true, nameKey: p.exitName || 'door.exit', lockKey: p.exitLock || 'lock.exit', id: 'exitDoor' });
    L.meta.exit = { x: W - 1, y: exitY, d: 1, door: exitDoor.id, room: { x0: W - 2, y0: er, x1: W - 1, y1: er + p.cw - 1 } };
    L.addLight({ x: (W - 0.5) * C, z: (exitY + 0.5) * C, y: p.ceil - 0.25, kind: 'exitSign', color: [0.3, 1, 0.4], intensity: 0.3, range: 5 });
    L.spawn = { x: 0, y: er, yaw: -H, wx: 1.2, wz: (er + (p.cw > 1 ? 1 : 0.5)) * C };
    L.addSpot('spawn', { x: 0, y: er });
    L.addSpot('exitHall', { x: W - 2, y: er });
    // Lights
    const lo = Object.assign({ kind: 'panel', color: [1, 0.96, 0.88], intensity: 0.9, range: 10, flicker: 0.08, broken: 0.08, every: 2 }, p.light);
    for (const row of p.rows) for (let x = 1; x < W; x += lo.every) {
      const broken = r() < lo.broken;
      L.addLight({ x: (x + 0.5) * C, z: (row + p.cw / 2) * C, y: p.ceil - 0.03, kind: lo.kind, color: lo.color, intensity: lo.intensity, range: lo.range, flicker: !broken && r() < lo.flicker ? r.range(0.3, 1) : 0, on: !broken, broken, rot: 0 });
    }
    for (const col of p.cols) for (let y = 1; y < Hh; y += lo.every) {
      if (p.rows.some(row => y >= row && y < row + p.cw)) continue;
      const broken = r() < lo.broken;
      L.addLight({ x: (col + p.cw / 2) * C, z: (y + 0.5) * C, y: p.ceil - 0.03, kind: lo.kind, color: lo.color, intensity: lo.intensity, range: lo.range, flicker: !broken && r() < lo.flicker ? r.range(0.3, 1) : 0, on: !broken, broken, rot: H });
    }
    for (const rm of rooms) {
      const n = Math.max(1, Math.round((rm.x1 - rm.x0 + 1) * (rm.y1 - rm.y0 + 1) / 8));
      for (let k = 0; k < n; k++) {
        const fx = (k + 0.5) / n;
        const wide = rm.x1 - rm.x0 >= rm.y1 - rm.y0;
        const x = wide ? U.lerp(rm.x0, rm.x1 + 1, fx) : (rm.x0 + rm.x1 + 1) / 2, z = wide ? (rm.y0 + rm.y1 + 1) / 2 : U.lerp(rm.y0, rm.y1 + 1, fx);
        const broken = r() < (lo.roomBroken != null ? lo.roomBroken : 0.25);
        L.addLight({ x: x * C, z: z * C, y: p.ceil - 0.03, kind: (rm.special && rm.special.light) || lo.roomKind || lo.kind, color: lo.roomColor || lo.color, intensity: lo.intensity * 0.85, range: 9, flicker: !broken && r() < 0.12 ? r.range(0.3, 1) : 0, on: !broken, broken, rot: wide ? 0 : H });
      }
    }
    // Furniture
    for (const rm of rooms) (FURNISH[rm.tag] || FURNISH.room)(L, r, rm, p);
    if (p.corridor && CORRIDOR[p.corridor]) CORRIDOR[p.corridor](L, r, rooms, corr, p);
    // Rooms that are simply stuck shut never hold anything the player needs
    const stuck = rooms.filter(rm => rm.randomLocked);
    const inStuck = (x, y) => stuck.some(rm => x >= rm.x0 && x <= rm.x1 && y >= rm.y0 && y <= rm.y1);
    for (const tag of Object.keys(L.spots)) L.spots[tag] = L.spots[tag].filter(sp => !inStuck(sp.x, sp.y));
    X.decorDecals(L, r, p.decals || 30, p.decalKinds || [{ type: 'grime', floor: true, min: 0.6, max: 1.6 }, { type: 'scuff', min: 0.6, max: 1.4, h: 0.3 }, { type: 'ceilStain', ceil: true, min: 0.5, max: 1.3 }]);
    return L;
  }

  // ------------------------------------------------------------ FURNISHING
  const FURNISH = {};
  FURNISH.room = () => {};
  // Classroom: chalkboard on the wall facing the students, teacher's desk (a hiding place), rows of desks
  FURNISH.classroom = (L, r, rm) => {
    const front = rm.side % 2 === 0 ? (rm.x1 - rm.x0 >= 3 ? 3 : 1) : (rm.y1 - rm.y0 >= 3 ? 0 : 2);
    const b = inner(L, rm);
    const cb = wallPoint(L, rm, front, 0.5, 0.02); prop(L, 'chalkboard', cb.x, cb.z, cb.rot, { wall: true, y: 1.45 });
    const td = wallPoint(L, rm, front, 0.3, 1.2); prop(L, 'teacherDesk', td.x, td.z, td.rot + PI, { collider: { hw: 0.75, hd: 0.75 }, hide: true });
    const fx = front === 3 ? 1 : front === 1 ? -1 : 0, fz = front === 0 ? 1 : front === 2 ? -1 : 0;
    const startX = front === 3 ? b.x0 + 2.4 : front === 1 ? b.x1 - 2.4 : b.x0 + 0.9, startZ = front === 0 ? b.z0 + 2.4 : front === 2 ? b.z1 - 2.4 : b.z0 + 0.9;
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
      const x = fx ? startX + fx * i * 1.25 : startX + j * 1.25, z = fz ? startZ + fz * i * 1.25 : startZ + j * 1.25;
      if (x < b.x0 + 0.5 || x > b.x1 - 0.5 || z < b.z0 + 0.5 || z > b.z1 - 0.5) continue;
      const dp = rm.door; if (dp && Math.hypot(x - L.cx(dp.x), z - L.cz(dp.y)) < 1.6) continue;
      if (r() < 0.12) continue;
      prop(L, 'schoolDesk', x + r.range(-0.1, 0.1), z + r.range(-0.1, 0.1), cb.rot + PI + r.range(-0.15, 0.15) + (r() < 0.06 ? r.range(-1.5, 1.5) : 0), { collider: { hw: 0.32, hd: 0.32 } });
    }
    // Papers go on the teacher's desk, not the floor
    { const c = L.cellOf(td.x, td.z); L.addSpot('classroom', { x: c.x, y: c.y, wx: td.x + r.range(-0.3, 0.3), wz: td.z + r.range(-0.15, 0.15), h: 0.785, room: rm }); }
    // A clock stopped at 3:05 over the board, a corkboard, a bookshelf, posters
    const side = (front + 1) % 4, back = (front + 2) % 4;
    const ck = wallPoint(L, rm, front, 0.5, 0.03); prop(L, 'wallClock', ck.x, ck.z, ck.rot, { wall: true, y: 2.45 });
    const cw = wallPoint(L, rm, side, 0.35, 0.03); prop(L, 'corkboard', cw.x, cw.z, cw.rot, { wall: true, y: 1.5 });
    const bs = wallPoint(L, rm, back, 0.82, 0.3); prop(L, 'bookshelf', bs.x, bs.z, bs.rot, { collider: { hw: back % 2 === 0 ? 1.1 : 0.3, hd: back % 2 === 0 ? 0.3 : 1.1 } });
    const posters = ['school1', 'school2', 'school3', 'school4'];
    for (const [d, f] of [[side, 0.72], [(front + 3) % 4, 0.3], [(front + 3) % 4, 0.7]]) {
      const pp = wallPoint(L, rm, d, f, 0.012);
      L.addDecal({ type: 'poster', surface: 'wall', x: pp.x, y: 1.55, z: pp.z, nx: -DX[d], nz: -DY[d], size: 0.62, text: r.pick(posters), rot: 0 });
    }
    L.addSpot('chalkboard', { x: L.cellOf(cb.x, cb.z).x, y: L.cellOf(cb.x, cb.z).y, wx: cb.x + fx * 0.06, wz: cb.z + fz * 0.06, h: 1.1, d: front });
  };
  FURNISH.gym = (L, r, rm) => {
    const long = rm.x1 - rm.x0 >= rm.y1 - rm.y0;
    const dLong = long ? (rm.side === 0 ? 2 : 0) : (rm.side === 3 ? 1 : 3);
    const n = Math.floor(sideLen(L, rm, dLong) / 6.5);
    for (let k = 0; k < n; k++) { const bp = wallPoint(L, rm, dLong, (k + 0.5) / n, 1.4); prop(L, 'bleachers', bp.x, bp.z, bp.rot, { collider: { hw: long ? 3.1 : 1.4, hd: long ? 1.4 : 3.1 } }); }
    for (const d of long ? [1, 3] : [0, 2]) { const hp = wallPoint(L, rm, d, 0.5, 0.05); prop(L, 'hoop', hp.x, hp.z, hp.rot, { wall: true }); }
    const ban = wallPoint(L, rm, dLong, 0.5, 0.02);
    L.addDecal({ type: 'sign', surface: 'wall', x: ban.x, y: 3.1, z: ban.z, nx: -DX[dLong], nz: -DY[dLong], size: 4.5, text: 'SPRING DANCE \'87', rot: 0 });
    spotIn(L, rm, 'gym');
  };
  FURNISH.library = (L, r, rm) => {
    const b = inner(L, rm);
    const long = rm.x1 - rm.x0 >= rm.y1 - rm.y0;
    for (let k = 1; k < 4; k++) {
      const x = long ? U.lerp(b.x0, b.x1, k / 4) : (b.x0 + b.x1) / 2, z = long ? (b.z0 + b.z1) / 2 - 0.8 : U.lerp(b.z0, b.z1, k / 4);
      prop(L, 'bookshelf', x, z, long ? H : 0, { collider: { hw: long ? 0.25 : 1.1, hd: long ? 1.1 : 0.25 } });
    }
    const t = { x: (b.x0 + b.x1) / 2 + (long ? 0 : 1.4), z: (b.z0 + b.z1) / 2 + (long ? 1.6 : 0) };
    prop(L, 'readingTable', t.x, t.z, long ? 0 : H, { collider: { hw: 0.9, hd: 0.5 }, hide: true });
    spotIn(L, rm, 'library');
  };
  FURNISH.office = (L, r, rm) => {
    const d = opposite(rm.side), p1 = wallPoint(L, rm, d, 0.5, 1.2);
    prop(L, 'desk', p1.x, p1.z, p1.rot + PI, { collider: { hw: 1.0, hd: 0.45 }, hide: true });
    const f = wallPoint(L, rm, (d + 1) % 4, 0.2, 0.35); prop(L, 'filing', f.x, f.z, f.rot, { collider: { hw: 0.35, hd: 0.35 } });
    spotIn(L, rm, 'officeRoom');
    L.addSpot('officeDeskTop', { x: L.cellOf(p1.x, p1.z).x, y: L.cellOf(p1.x, p1.z).y, wx: p1.x, wz: p1.z, h: 0.79 });
  };
  FURNISH.janitor = (L, r, rm) => {
    const d = opposite(rm.side), s = wallPoint(L, rm, d, 0.5, 0.35);
    prop(L, 'shelf', s.x, s.z, s.rot, { collider: { hw: 1.3, hd: 0.35 } });
    const m = wallPoint(L, rm, (d + 1) % 4, 0.7, 0.4); prop(L, 'mopBucket', m.x, m.z, r.range(0, 6), { collider: { hw: 0.25, hd: 0.25 } });
    prop(L, 'boxes', inner(L, rm).x0 + 0.6, inner(L, rm).z0 + 0.6, 0.3, { collider: { hw: 0.5, hd: 0.5 } });
    spotIn(L, rm, 'janitorRoom');
  };
  FURNISH.cafeteria = (L, r, rm) => {
    const b = inner(L, rm);
    const long = rm.x1 - rm.x0 >= rm.y1 - rm.y0;
    const nA = Math.max(1, Math.floor((long ? b.x1 - b.x0 : b.z1 - b.z0) / 3.2)), nB = Math.max(1, Math.floor((long ? b.z1 - b.z0 : b.x1 - b.x0) / 2.6));
    for (let i = 0; i < nA; i++) for (let j = 0; j < nB; j++) {
      const x = long ? U.lerp(b.x0, b.x1, (i + 0.5) / nA) : U.lerp(b.x0, b.x1, (j + 0.5) / nB), z = long ? U.lerp(b.z0, b.z1, (j + 0.5) / nB) : U.lerp(b.z0, b.z1, (i + 0.5) / nA);
      prop(L, 'cafTable', x, z, long ? 0 : H, { collider: { hw: long ? 1.2 : 0.6, hd: long ? 0.6 : 1.2 } });
    }
    spotIn(L, rm, 'cafeteria');
  };
  FURNISH.restroom = (L, r, rm) => {
    const d = opposite(rm.side);
    for (let k = 0; k < 2; k++) { const s = wallPoint(L, rm, d, 0.25 + k * 0.5, 0.35); prop(L, 'toilet', s.x, s.z, s.rot, { collider: { hw: 0.35, hd: 0.35 } }); }
    const sk = wallPoint(L, rm, (d + 1) % 4, 0.5, 0.3); prop(L, 'sink', sk.x, sk.z, sk.rot, { collider: { hw: 0.3, hd: 0.3 } });
    const mr = wallPoint(L, rm, (d + 1) % 4, 0.5, 0.0); prop(L, 'mirror', mr.x, mr.z, mr.rot, { wall: true });
    spotIn(L, rm, 'restroom');
  };
  // Hospital
  FURNISH.patient = (L, r, rm) => {
    const d = opposite(rm.side);
    const two = sideLen(L, rm, d) > 5;
    for (let k = 0; k < (two ? 2 : 1); k++) {
      const f = two ? 0.28 + k * 0.44 : 0.5;
      const bp = wallPoint(L, rm, d, f, 1.05);
      prop(L, 'hospitalBed', bp.x, bp.z, bp.rot, { collider: { hw: 0.55, hd: 1.05 }, hide: true });
      const iv = wallPoint(L, rm, d, f + 0.14, 0.45); prop(L, 'ivStand', iv.x, iv.z, r.range(0, 6));
      const ns = wallPoint(L, rm, d, f - 0.16, 0.3); prop(L, 'nightstand', ns.x, ns.z, ns.rot, { collider: { hw: 0.25, hd: 0.25 } });
      if (two) { const cu = wallPoint(L, rm, d, 0.5, 1.2); prop(L, 'curtain', cu.x, cu.z, cu.rot + H); }
    }
    if (r() < 0.5) { const wc = wallPoint(L, rm, (d + 1) % 4, 0.7, 0.5); prop(L, 'wheelchair', wc.x, wc.z, wc.rot + r.range(-0.4, 0.4), { collider: { hw: 0.35, hd: 0.35 } }); }
    { const wn = wallPoint(L, rm, (d + 1) % 4, 0.35, 0.01); prop(L, 'nightWindow', wn.x, wn.z, wn.rot, { wall: true, y: 1.5 }); }
    // Things are left on the bed and the nightstand, not on the floor
    const f0 = two ? 0.28 : 0.5;
    const bp = wallPoint(L, rm, d, f0, 1.25), c = L.cellOf(bp.x, bp.z);
    L.addSpot('patient', { x: c.x, y: c.y, wx: bp.x + r.range(-0.15, 0.15), wz: bp.z + r.range(-0.15, 0.15), h: 0.66, room: rm });
    const ns = wallPoint(L, rm, d, f0 - 0.16, 0.3), cn = L.cellOf(ns.x, ns.z);
    L.addSpot('patientStand', { x: cn.x, y: cn.y, wx: ns.x, wz: ns.z, h: 0.62, room: rm });
    L.addSpot('bed', { x: c.x, y: c.y, wx: bp.x, wz: bp.z, h: 0.66 });
  };
  FURNISH.nurse = (L, r, rm) => {
    const d = opposite(rm.side), c = wallPoint(L, rm, d, 0.5, 1.3);
    prop(L, 'nurseCounter', c.x, c.z, c.rot, { collider: { hw: 1.4, hd: 0.4 }, hide: true });
    const f = wallPoint(L, rm, d, 0.15, 0.35); prop(L, 'filing', f.x, f.z, f.rot, { collider: { hw: 0.35, hd: 0.35 } });
    spotIn(L, rm, 'nurse');
    L.addSpot('nurseTop', { x: L.cellOf(c.x, c.z).x, y: L.cellOf(c.x, c.z).y, wx: c.x, wz: c.z, h: 1.08 });
  };
  FURNISH.chapel = (L, r, rm) => {
    const d = opposite(rm.side), b = inner(L, rm);
    const al = wallPoint(L, rm, d, 0.5, 0.6); prop(L, 'altar', al.x, al.z, al.rot, { collider: { hw: 0.9, hd: 0.4 } });
    for (let k = 0; k < 4; k++) for (const s of [-1, 1]) {
      const p = wallPoint(L, rm, d, 0.5 + s * 0.22, 2.1 + k * 1.2);
      if (p.x < b.x0 || p.x > b.x1 || p.z < b.z0 || p.z > b.z1) continue;
      prop(L, 'pew', p.x, p.z, p.rot, { collider: { hw: d % 2 ? 0.3 : 0.9, hd: d % 2 ? 0.9 : 0.3 } });
    }
    spotIn(L, rm, 'chapel');
  };
  FURNISH.storage = (L, r, rm) => {
    const d = opposite(rm.side), s = wallPoint(L, rm, d, 0.5, 0.35);
    prop(L, 'shelf', s.x, s.z, s.rot, { collider: { hw: 1.3, hd: 0.35 } });
    if (r() < 0.6) { const w = wallPoint(L, rm, (d + 1) % 4, 0.5, 0.5); prop(L, 'wheelchair', w.x, w.z, w.rot, { collider: { hw: 0.35, hd: 0.35 } }); }
    prop(L, 'boxes', inner(L, rm).x1 - 0.6, inner(L, rm).z1 - 0.6, 0.6, { collider: { hw: 0.5, hd: 0.5 } });
    spotIn(L, rm, 'storageRoom');
  };
  // Motel
  FURNISH.motelRoom = (L, r, rm) => {
    const d = opposite(rm.side);
    const bp = wallPoint(L, rm, d, 0.5, 1.05);
    prop(L, 'motelBed', bp.x, bp.z, bp.rot, { collider: { hw: 0.8, hd: 1.05 }, hide: true });
    for (const s of [-1, 1]) { const n = wallPoint(L, rm, d, 0.5 + s * 0.28, 0.25); prop(L, 'nightstand', n.x, n.z, n.rot, { collider: { hw: 0.25, hd: 0.25 } }); }
    const tv = wallPoint(L, rm, rm.side, rm.door && doorFrac(L, rm) < 0.5 ? 0.78 : 0.22, 0.3);
    prop(L, 'dresserTv', tv.x, tv.z, tv.rot, { collider: { hw: 0.6, hd: 0.3 } });
    // A thrift-store painting over the bed, a chair by the dresser
    const art = wallPoint(L, rm, d, 0.5, 0.012);
    L.addDecal({ type: 'poster', surface: 'wall', x: art.x, y: 1.72, z: art.z, nx: -DX[d], nz: -DY[d], size: 0.7, text: r.pick(['motelArt1', 'motelArt2']), rot: 0 });
    const chp = wallPoint(L, rm, (d + 1) % 4, 0.3, 0.45); prop(L, 'chair', chp.x, chp.z, chp.rot + r.range(-0.4, 0.4), { collider: { hw: 0.25, hd: 0.25 } });
    spotIn(L, rm, 'motelRoom');
    const c = L.cellOf(bp.x, bp.z); L.addSpot('motelBed', { x: c.x, y: c.y, wx: bp.x, wz: bp.z, h: 0.62 });
  };
  FURNISH.lobby = (L, r, rm) => {
    const d = opposite(rm.side);
    const fd = wallPoint(L, rm, d, 0.5, 1.4); prop(L, 'frontDesk', fd.x, fd.z, fd.rot, { collider: { hw: 1.5, hd: 0.45 }, hide: true });
    const kb = wallPoint(L, rm, d, 0.5, 0.02); prop(L, 'keyBoard', kb.x, kb.z, kb.rot, { wall: true, y: 1.5 });
    const cp = wallPoint(L, rm, (d + 1) % 4, 0.5, 0.5); prop(L, 'couch', cp.x, cp.z, cp.rot, { collider: { hw: 1.0, hd: 0.45 } });
    spotIn(L, rm, 'lobbyRoom');
    L.addSpot('frontDesk', { x: L.cellOf(fd.x, fd.z).x, y: L.cellOf(fd.x, fd.z).y, wx: fd.x, wz: fd.z, h: 1.08 });
    L.addSpot('keyBoard', { x: L.cellOf(kb.x, kb.z).x, y: L.cellOf(kb.x, kb.z).y, wx: kb.x, wz: kb.z, h: 1.5, d });
  };
  FURNISH.room12 = (L, r, rm) => { FURNISH.motelRoom(L, r, rm); spotIn(L, rm, 'room12'); };
  FURNISH.room207 = (L, r, rm) => {
    const d = opposite(rm.side), bp = wallPoint(L, rm, d, 0.5, 1.05);
    prop(L, 'hospitalBed', bp.x, bp.z, bp.rot, { collider: { hw: 0.55, hd: 1.05 } });
    const iv = wallPoint(L, rm, d, 0.72, 0.45); prop(L, 'ivStand', iv.x, iv.z, 0.4);
    const ns = wallPoint(L, rm, d, 0.26, 0.3); prop(L, 'nightstand', ns.x, ns.z, ns.rot, { collider: { hw: 0.25, hd: 0.25 } });
    const ch = wallPoint(L, rm, (d + 1) % 4, 0.6, 0.45); prop(L, 'chair', ch.x, ch.z, ch.rot);
    spotIn(L, rm, 'room207');
    // Where the papers of 207 belong: the Polaroid over the bed, the chart on the footboard, the card on the nightstand, the drawing on the side wall
    const at = (tag, pt, h, dd) => { const c = L.cellOf(pt.x, pt.z); L.addSpot(tag, { x: c.x, y: c.y, wx: pt.x, wz: pt.z, h, d: dd }); };
    at('room207Wall', wallPoint(L, rm, d, 0.5, 0.02), 1.55, d);
    at('room207Foot', wallPoint(L, rm, d, 0.5, 2.13), 0.8, d);
    at('room207Stand', { x: ns.x, z: ns.z }, 0.62);
    const sd = (d + 1) % 4; at('room207Side', wallPoint(L, rm, sd, 0.66, 0.02), 1.45, sd);
    // Her window: it is always raining in it
    const wn = wallPoint(L, rm, (d + 1) % 4, 0.3, 0.01); prop(L, 'nightWindow', wn.x, wn.z, wn.rot, { wall: true, y: 1.5 });
  };
  FURNISH.laundry = (L, r, rm) => {
    const d = opposite(rm.side);
    const n = Math.floor(sideLen(L, rm, d) / 0.8);
    for (let k = 0; k < n; k++) { const w = wallPoint(L, rm, d, (k + 0.5) / n, 0.38); prop(L, k % 2 ? 'dryer' : 'washer', w.x, w.z, w.rot, { collider: { hw: 0.35, hd: 0.35 } }); }
    spotIn(L, rm, 'laundry');
  };
  FURNISH.ice = (L, r, rm) => {
    const d = opposite(rm.side), i1 = wallPoint(L, rm, d, 0.3, 0.45); prop(L, 'iceMachine', i1.x, i1.z, i1.rot, { collider: { hw: 0.45, hd: 0.4 } });
    const v = wallPoint(L, rm, d, 0.72, 0.45); prop(L, 'vending', v.x, v.z, v.rot, { collider: { hw: 0.5, hd: 0.45 } });
    spotIn(L, rm, 'iceRoom');
  };
  // Mall stores
  const store = (inside) => (L, r, rm) => {
    const d = opposite(rm.side), b = inner(L, rm);
    const c = wallPoint(L, rm, d, 0.25, 0.8); prop(L, 'storeCounter', c.x, c.z, c.rot, { collider: { hw: 0.9, hd: 0.4 }, hide: true });
    inside(L, r, rm, d, b);
    spotIn(L, rm, rm.tag);
    L.addSpot(rm.tag + 'Counter', { x: L.cellOf(c.x, c.z).x, y: L.cellOf(c.x, c.z).y, wx: c.x, wz: c.z, h: 1.02 });
  };
  const rows = (L, r, rm, d, b, type, col, n) => {
    for (let k = 0; k < n; k++) { const p = wallPoint(L, rm, d, 0.45 + (k % 2) * 0.3, 1.8 + Math.floor(k / 2) * 1.5); if (p.x < b.x0 + 0.4 || p.x > b.x1 - 0.4 || p.z < b.z0 + 0.4 || p.z > b.z1 - 0.4) continue; prop(L, type, p.x, p.z, p.rot + (k % 2 ? 0 : 0.1), { collider: col }); }
  };
  FURNISH.records = store((L, r, rm, d, b) => rows(L, r, rm, d, b, 'recordBins', { hw: 0.5, hd: 0.4 }, 4));
  FURNISH.comics = store((L, r, rm, d, b) => { const w = wallPoint(L, rm, (d + 1) % 4, 0.5, 0.25); prop(L, 'comicRack', w.x, w.z, w.rot, { collider: { hw: 1.0, hd: 0.3 } }); rows(L, r, rm, d, b, 'recordBins', { hw: 0.5, hd: 0.4 }, 2); });
  FURNISH.toys = store((L, r, rm, d, b) => rows(L, r, rm, d, b, 'toyShelf', { hw: 0.9, hd: 0.3 }, 4));
  FURNISH.clothes = store((L, r, rm, d, b) => { rows(L, r, rm, d, b, 'clothesRack', { hw: 0.6, hd: 0.3 }, 4); for (let k = 0; k < 2; k++) { const m = wallPoint(L, rm, rm.side, 0.25 + k * 0.5, 0.8); prop(L, 'mannequinStatic', m.x, m.z, m.rot + PI); } });
  FURNISH.food = (L, r, rm) => { FURNISH.cafeteria(L, r, rm); spotIn(L, rm, 'food'); };
  FURNISH.photo = (L, r, rm) => { const d = opposite(rm.side), p = wallPoint(L, rm, d, 0.5, 0.75); prop(L, 'photoBooth', p.x, p.z, p.rot, { collider: { hw: 0.65, hd: 0.7 } }); spotIn(L, rm, 'photo'); L.addSpot('photoBooth', { x: L.cellOf(p.x, p.z).x, y: L.cellOf(p.x, p.z).y, wx: p.x - DX[d] * 0.0, wz: p.z, h: 0 }); };
  FURNISH.empty = (L, r, rm) => { prop(L, 'boxes', (inner(L, rm).x0 + inner(L, rm).x1) / 2, (inner(L, rm).z0 + inner(L, rm).z1) / 2, r.range(0, 3), { collider: { hw: 0.5, hd: 0.5 } }); spotIn(L, rm, 'emptyStore'); };

  // ------------------------------------------------------------ CORRIDOR DECOR
  // Walk along the corridor-facing wall of each room, calling fn(x, z, rot) every step metres (clear of the door)
  function alongFront(L, rm, step, off, fn) {
    const C = L.cell, d = rm.side;
    const doorCs = (rm.doors || (rm.door ? [rm.door] : [])).map(dr => (d % 2 === 0 ? L.cx(dr.x) : L.cz(dr.y)));
    const a0 = (d % 2 === 0 ? rm.x0 : rm.y0) * C + 0.2, a1 = (d % 2 === 0 ? rm.x1 + 1 : rm.y1 + 1) * C - 0.2;
    const line = d === 0 ? rm.y0 * C - 0.1 - off : d === 2 ? (rm.y1 + 1) * C + 0.1 + off : d === 3 ? rm.x0 * C - 0.1 - off : (rm.x1 + 1) * C + 0.1 + off;
    const rot = [PI, H, 0, -H][d]; // front faces the corridor
    for (let a = a0 + step / 2; a <= a1 - step / 2 + 0.01; a += step) {
      if (doorCs.some(dc => Math.abs(a - dc) < step / 2 + 0.75)) continue;
      if (d % 2 === 0) fn(a, line, rot); else fn(line, a, rot);
    }
  }
  const CORRIDOR = {
    school(L, r, rooms) {
      let k = 0;
      const banks = [];
      for (const rm of rooms) alongFront(L, rm, 2.05, 0.23, (x, z, rot) => {
        const hide = (k++ % 5) === 2;
        prop(L, 'lockerBank', x, z, rot, { collider: { hw: rot % PI === 0 ? 1.0 : 0.25, hd: rot % PI === 0 ? 0.25 : 1.0 }, hide, hideEye: 1.52, hideKind: 'locker' });
        if (!hide) banks.push({ x, z, rot });
      });
      // Sam's old locker: a note taped to the door of one bank, a little way down the hall
      if (banks.length) {
        const b = banks[Math.min(banks.length - 1, Math.floor(banks.length * 0.6))];
        const fx = Math.round(Math.sin(b.rot)), fz = Math.round(Math.cos(b.rot));
        const d = DX.findIndex((dx, i) => dx === -fx && DY[i] === -fz);
        const px = b.x + fx * 0.27 + (fz ? 0.25 : 0), pz = b.z + fz * 0.27 + (fx ? 0.25 : 0);
        const c = L.cellOf(px, pz);
        L.addSpot('locker217', { x: c.x, y: c.y, wx: px, wz: pz, h: 1.42, d });
      }
    },
    hospital(L, r, rooms) {
      // Health posters and handrail-height scuffs along the ward walls
      for (const rm of rooms) alongFront(L, rm, 6, 0.012, (x, z, rot) => { if (r() < 0.45) L.addDecal({ type: 'poster', surface: 'wall', x, y: 1.55, z, nx: Math.round(Math.sin(rot)), nz: Math.round(Math.cos(rot)), size: 0.55, text: 'hosp1', rot: 0 }); });
      for (const rm of rooms) alongFront(L, rm, 3, 0.45, (x, z, rot) => {
        const q = r();
        if (q < 0.18) prop(L, 'wheelchair', x, z, rot + r.range(-0.5, 0.5), { collider: { hw: 0.35, hd: 0.35 } });
        else if (q < 0.3) prop(L, 'hospitalBed', x, z, rot + H, { collider: { hw: 1.0, hd: 1.0 }, hide: true });
        else if (q < 0.4) prop(L, 'mallBench', x, z, rot, { collider: { hw: 0.9, hd: 0.3 } });
      });
    },
    motel(L, r, rooms) {
      for (const rm of rooms) alongFront(L, rm, 3, 0.35, (x, z, rot) => { if (r() < 0.12) prop(L, 'boxes', x, z, r.range(0, 3), { collider: { hw: 0.45, hd: 0.45 } }); });
    },
    mall(L, r, rooms, corr, p) {
      const C = L.cell, row = p.rows[0], zc = (row + p.cw / 2) * C;
      for (let x = 6; x < L.w - 4; x += 10) {
        const k = Math.floor(x / 10) % 4;
        if (k === 0) prop(L, 'fountain', x * C, zc, 0, { collider: { hw: 2.0, hd: 2.0 } });
        else if (k === 1) prop(L, 'xmasTree', x * C, zc, 0, { collider: { hw: 1.45, hd: 1.45 } });
        else if (k === 2) prop(L, 'kiosk', x * C, zc, 0, { collider: { hw: 1.1, hd: 0.7 }, hide: true });
        else prop(L, 'planter', x * C, zc, 0, { collider: { hw: 0.55, hd: 0.55 } });
        for (const s of [-1, 1]) prop(L, 'mallBench', x * C + 3.5, zc + s * 1.6, s > 0 ? PI : 0, { collider: { hw: 0.9, hd: 0.3 } });
        L.addSpot('atrium', { x, y: row + 1 });
      }
    },
  };

  // ------------------------------------------------------------ STREET (Maple Street, outdoors, rain)
  function genStreet(def) {
    const p = Object.assign({ w: 40, h: 14, houses: 6 }, def.gen);
    const L = new Level(p.w, p.h, { cell: 3, ceil: 3.0, theme: def.theme, seed: def.seed });
    const r = U.rng(def.seed), W = p.w, Hh = p.h, C = L.cell;
    // Rows: 0-1 back yards, 2-4 houses (north), 5 yard, 6 sidewalk, 7-8 street, 9 sidewalk, 10 yard, 11-13 houses (south)
    const outdoor = new Uint8Array(W * Hh);
    const fin = [];
    for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) outdoor[L.i(x, y)] = 1;
    const houses = [];
    const hw = Math.floor((W - 2) / (p.houses / 2));
    for (let k = 0; k < p.houses; k++) {
      const north = k < p.houses / 2, idx = north ? k : k - p.houses / 2;
      const x0 = 1 + idx * hw + 1, x1 = x0 + hw - 3;
      const y0 = north ? 1 : 10, y1 = north ? 3 : 12;
      const d = north ? 2 : 0;
      houses.push({ x0, y0, x1, y1, d, north, n: k });
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) outdoor[L.i(x, y)] = 0;
      L.wallRect(x0, y0, x1, y1, 1, true);
      // Interior wall splitting front room and back room
      const mid = Math.floor((x0 + x1) / 2);
      for (let y = y0; y <= y1; y++) if (y !== (north ? y0 + 1 : y1 - 1)) L.setEdge(mid, y, 1, EDGE.WALL, true);
      fin.push({ x0, y0, x1, y1, floor: 'floorWood', wall: 'wainscotWood', h: 0.9 });
    }
    // Yards (grass), sidewalks, street
    fin.push({ x0: 0, y0: 0, x1: W - 1, y1: 0, floor: 'floorGrass' }, { x0: 0, y0: 4, x1: W - 1, y1: 5, floor: 'floorGrass' }, { x0: 0, y0: 9, x1: W - 1, y1: 9, floor: 'floorGrass' }, { x0: 0, y0: 13, x1: W - 1, y1: 13, floor: 'floorGrass' });
    fin.push({ x0: 0, y0: 6, x1: W - 1, y1: 6, floor: 'floorSidewalk' }, { x0: 0, y0: 8, x1: W - 1, y1: 8, floor: 'floorSidewalk' }, { x0: 0, y0: 7, x1: W - 1, y1: 7, floor: 'floorAsphalt' });
    // Yards between houses: grass everywhere else outdoors
    for (let y = 1; y <= 12; y++) for (let x = 0; x < W; x++) if (outdoor[L.i(x, y)] && (y <= 3 || y >= 10)) fin.push({ x0: x, y0: y, x1: x, y1: y, floor: 'floorGrass' });
    L.meta.finishes = fin;
    L.meta.outdoor = outdoor;
    L.meta.outsideRain = true;
    // Fences between yards
    for (const hs of houses) {
      const fy0 = hs.north ? 0 : 10, fy1 = hs.north ? 3 : 13;
      for (let y = fy0; y <= fy1; y++) { if (hs.x0 - 1 >= 0 && outdoor[L.i(hs.x0 - 1, y)] && y !== (hs.north ? 3 : 10)) L.setEdge(hs.x0 - 1, y, 3, EDGE.FENCE, true); }
    }
    // Doors: front doors facing the street; Sam's (house 1) and Clyde's (house 4) open, others locked
    // Your house, and Clyde's two doors down on the same side
    const tags = ['house0', 'samHouse', 'house2', 'clydeHouse', 'house4', 'house5', 'house6', 'house7', 'house8', 'house9'];
    houses.forEach((hs, k) => {
      const tag = tags[k] || 'house' + k;
      const dx = Math.floor((hs.x0 + hs.x1) / 2) - 1, dy = hs.north ? hs.y1 : hs.y0;
      const open = tag === 'samHouse' || tag === 'clydeHouse';
      hs.door = L.addDoor(dx, dy, hs.d, { kind: 'wood', locked: !open, id: tag + 'Door', nameKey: open ? (tag === 'samHouse' ? 'door.samHouse' : 'door.clydeHouse') : 'door.neighbor', lockKey: 'lock.neighbor' });
      hs.tag = tag;
      (L.meta.rooms || (L.meta.rooms = {}))[tag] = hs;
      L.addSpot(tag, { x: dx, y: hs.north ? hs.y1 : hs.y0, room: hs });
      L.addSpot(tag + 'Back', { x: hs.x1 - 1, y: hs.north ? hs.y0 : hs.y1, room: hs });
      L.addSpot(tag + 'Porch', { x: dx, y: hs.north ? hs.y1 + 1 : hs.y0 - 1 });
      // Porch light (Clyde's is on)
      L.addLight({ x: L.cx(dx) + 0.8, z: hs.north ? (hs.y1 + 1) * C + 0.25 : hs.y0 * C - 0.25, y: 2.4, kind: 'cage', color: [1, 0.78, 0.45], intensity: tag === 'clydeHouse' ? 0.9 : 0.35, range: 7, on: tag === 'clydeHouse' || r() < 0.4, flicker: tag === 'clydeHouse' ? 0 : 0.2, outside: true });
      // Locked neighbors' houses are shells: nothing inside
      if (!open) {
        for (let y = hs.y0; y <= hs.y1; y++) for (let x = hs.x0; x <= hs.x1; x++) L.solid[L.i(x, y)] = G.SOLID.VOID;
        prop(L, 'roof', ((hs.x0 + hs.x1 + 1) / 2) * C, ((hs.y0 + hs.y1 + 1) / 2) * C, hs.north ? 0 : PI, { sx: (hs.x1 - hs.x0 + 1) * C + 0.8, sz: (hs.y1 - hs.y0 + 1) * C + 0.8, sy: 5, y: 3.0 });
        prop(L, 'mailboxPost', L.cx(dx) - 1.2, hs.north ? 6 * C - 0.3 : 9 * C + 0.3, hs.north ? PI : 0, { collider: { hw: 0.15, hd: 0.15 } });
        return;
      }
      // Furniture inside
      const mid = Math.floor((hs.x0 + hs.x1) / 2);
      const living = { x0: hs.x0, x1: mid, y0: hs.y0, y1: hs.y1, side: hs.d, door: hs.door };
      const bed = { x0: mid + 1, x1: hs.x1, y0: hs.y0, y1: hs.y1, side: hs.d };
      const lb = inner(L, living), bb = inner(L, bed);
      prop(L, 'couch', (lb.x0 + lb.x1) / 2, hs.north ? lb.z0 + 0.5 : lb.z1 - 0.5, hs.north ? 0 : PI, { collider: { hw: 1.0, hd: 0.45 } });
      prop(L, 'dresserTv', lb.x0 + 0.35, (lb.z0 + lb.z1) / 2, H, { collider: { hw: 0.3, hd: 0.6 } });
      prop(L, 'motelBed', (bb.x0 + bb.x1) / 2, hs.north ? bb.z0 + 1.1 : bb.z1 - 1.1, hs.north ? 0 : PI, { collider: { hw: 0.8, hd: 1.05 }, hide: true });
      L.addSpot(tag + 'Living', { x: Math.floor((hs.x0 + mid) / 2), y: Math.floor((hs.y0 + hs.y1) / 2), room: living });
      L.addSpot(tag + 'Bed', { x: Math.floor((mid + 1 + hs.x1) / 2), y: Math.floor((hs.y0 + hs.y1) / 2), room: bed });
      L.addLight({ x: ((hs.x0 + mid + 1) / 2) * C, z: ((hs.y0 + hs.y1 + 1) / 2) * C, y: 2.97, kind: 'bulb', color: [1, 0.8, 0.55], intensity: open ? 0.6 : 0.25, range: 7, on: open || r() < 0.5, zone: 0 });
      // Roof over the house
      prop(L, 'roof', ((hs.x0 + hs.x1 + 1) / 2) * C, ((hs.y0 + hs.y1 + 1) / 2) * C, hs.north ? 0 : PI, { sx: (hs.x1 - hs.x0 + 1) * C + 0.8, sz: (hs.y1 - hs.y0 + 1) * C + 0.8, sy: 5, y: 3.0 });
      // Mailbox and a car in some driveways
      prop(L, 'mailboxPost', L.cx(dx) - 1.2, hs.north ? 6 * C - 0.3 : 9 * C + 0.3, hs.north ? PI : 0, { collider: { hw: 0.15, hd: 0.15 } });
    });
    L.meta.houses = houses;
    // Street lights along the sidewalk
    for (let x = 3; x < W; x += 8) L.addLight({ x: L.cx(x), z: 6 * C + 0.4, y: 6.8, kind: 'street', color: [1, 0.72, 0.4], intensity: 0.8, range: 12, outside: true });
    for (let x = 7; x < W; x += 8) L.addLight({ x: L.cx(x), z: 9 * C - 0.4, y: 6.8, kind: 'street', color: [1, 0.72, 0.4], intensity: 0.8, range: 12, outside: true, flicker: x === 23 ? 0.5 : 0 });
    L.meta.streetLamps = L.lights.filter(l => l.kind === 'street');
    // Spawn at the west end of the street; exit: the arcade's back alley at the east end
    L.spawn = { x: 0, y: 7, yaw: -H, wx: 1.5, wz: L.cz(7) };
    const exitDoor = L.addDoor(W - 1, 7, 1, { kind: 'metal', locked: true, nameKey: 'door.alley', lockKey: 'lock.alley', id: 'exitDoor' });
    L.meta.exit = { x: W - 1, y: 7, d: 1, door: exitDoor.id, room: { x0: W - 2, y0: 6, x1: W - 1, y1: 8 } };
    L.addSpot('corner', { x: Math.floor(W / 2), y: 6 });
    L.addSpot('streetEnd', { x: W - 3, y: 7 });
    for (let x = 2; x < W - 2; x += 6) L.addSpot('street', { x, y: r() < 0.5 ? 6 : 8 });
    L.meta.noCeiling = false;
    return L;
  }

  // ------------------------------------------------------------ WORKSHOP (hand made)
  function genWorkshop(def) {
    const L = new Level(12, 10, { cell: 3, ceil: 3.2, theme: def.theme, seed: def.seed });
    const r = U.rng(def.seed), C = L.cell;
    // Rooms: main shop (0-7 x 0-9), Kernel room (8-11 x 0-4), storage (8-11 x 5-9)
    for (let y = 0; y < 10; y++) if (y !== 2 && y !== 7) L.setEdge(7, y, 1, EDGE.WALL, true);
    L.addDoor(7, 2, 1, { kind: 'metal', locked: true, id: 'kernelDoor', nameKey: 'door.kernel', lockKey: 'lock.kernel' });
    L.addDoor(7, 7, 1, { kind: 'wood', locked: false, id: 'storeDoor', nameKey: 'door.storage' });
    for (let x = 8; x < 12; x++) L.setEdge(x, 4, 2, EDGE.WALL, true);
    for (let y = 0; y < 10; y++) for (let x = 0; x < 12; x++) L.reserved[L.i(x, y)] = 1;
    // Benches along the walls
    const bench = (x, z, rot) => prop(L, 'workbench', x, z, rot, { collider: { hw: rot % PI === 0 ? 1.1 : 0.45, hd: rot % PI === 0 ? 0.45 : 1.1 } });
    bench(L.cx(1), 0.55, 0); bench(L.cx(3), 0.55, 0); bench(L.cx(5), 0.55, 0);
    bench(0.55, L.cz(4), H); bench(0.55, L.cz(6), H);
    prop(L, 'pegboard', L.cx(2), 0.02, 0, { wall: true, y: 1.6 }); prop(L, 'pegboard', L.cx(5), 0.02, 0, { wall: true, y: 1.6 });
    prop(L, 'tvStack', L.cx(1), L.cz(9) + 0.6, PI, { collider: { hw: 1.0, hd: 0.5 } }); prop(L, 'tvStack', L.cx(3.5), L.cz(9) + 0.6, PI, { collider: { hw: 1.0, hd: 0.5 } });
    prop(L, 'shelf', L.cx(6) + 0.3, L.cz(9) + 0.9, PI, { collider: { hw: 1.3, hd: 0.35 } });
    prop(L, 'desk', L.cx(4), L.cz(4), 0, { collider: { hw: 1.0, hd: 0.45 }, hide: true });
    prop(L, 'chair', L.cx(4), L.cz(4) + 1.0, PI);
    prop(L, 'chompyStand', L.cx(6) + 0.5, L.cz(5), -H, { collider: { hw: 0.6, hd: 0.6 } });
    prop(L, 'kernel', L.cx(10), L.cz(0) + 0.9, 0, { collider: { hw: 1.4, hd: 0.7 } });
    prop(L, 'oscilloscope', L.cx(3) - 0.6, 0.55, 0);
    prop(L, 'shelf', L.cx(10), L.cz(9) + 0.9, PI, { collider: { hw: 1.3, hd: 0.35 } });
    prop(L, 'boxes', L.cx(8) + 0.4, L.cz(8), 0.2, { collider: { hw: 0.5, hd: 0.5 } });
    L.addSpot('bench1', { x: 1, y: 0, wx: L.cx(1), wz: 0.55, h: 0.92 });
    L.addSpot('bench2', { x: 3, y: 0, wx: L.cx(3) + 0.4, wz: 0.55, h: 0.92 });
    L.addSpot('bench3', { x: 5, y: 0, wx: L.cx(5), wz: 0.55, h: 0.92 });
    L.addSpot('benchW', { x: 0, y: 4, wx: 0.55, wz: L.cz(4), h: 0.92 });
    L.addSpot('desk', { x: 4, y: 4, wx: L.cx(4), wz: L.cz(4), h: 0.79 });
    L.addSpot('tvs', { x: 2, y: 9 });
    L.addSpot('kernel', { x: 10, y: 1, wx: L.cx(10), wz: L.cz(0) + 0.9 + 0.8, h: 1.0 });
    L.addSpot('kernelRoom', { x: 9, y: 2 });
    L.addSpot('storage', { x: 9, y: 7 });
    L.addSpot('chompy', { x: 6, y: 5, wx: L.cx(6) + 0.5, wz: L.cz(5) });
    for (const [x, z] of [[L.cx(9) - 0.8, L.cz(0) + 0.3], [L.cx(10) + 0.2, L.cz(0) + 0.3], [L.cx(11) + 0.6, L.cz(0) + 0.3]]) L.addSpot('dial', { x: Math.floor(x / C), y: 0, wx: x, wz: z + 0.5, h: 1.1 });
    // Lights: bench lamps and bare bulbs
    for (let x = 1; x < 7; x += 2) L.addLight({ x: L.cx(x), z: L.cz(1), y: 3.1, kind: 'hanging', color: [1, 0.85, 0.6], intensity: 0.8, range: 8 });
    for (let y = 4; y < 10; y += 3) L.addLight({ x: L.cx(3), z: L.cz(y), y: 3.1, kind: 'bulb', color: [1, 0.8, 0.55], intensity: 0.6, range: 8, flicker: y === 7 ? 0.4 : 0 });
    L.addLight({ x: L.cx(10), z: L.cz(2), y: 3.1, kind: 'cage', color: [0.6, 1, 0.7], intensity: 0.7, range: 8 });
    L.addLight({ x: L.cx(10), z: L.cz(7), y: 3.1, kind: 'bulb', color: [1, 0.8, 0.55], intensity: 0.5, range: 7 });
    L.spawn = { x: 0, y: 8, yaw: -H, wx: 1.4, wz: L.cz(8) };
    const exitDoor = L.addDoor(11, 3, 1, { kind: 'exit', locked: true, id: 'exitDoor', nameKey: 'door.exit', lockKey: 'lock.exit' });
    L.meta.exit = { x: 11, y: 3, d: 1, door: exitDoor.id, room: { x0: 8, y0: 0, x1: 11, y1: 4 } };
    L.meta.finishes = [{ x0: 0, y0: 0, x1: 11, y1: 9, floor: 'floorConcrete' }, { x0: 8, y0: 0, x1: 11, y1: 4, floor: 'floorLino' }];
    X.decorDecals(L, r, 26, [{ type: 'grime', floor: true, min: 0.5, max: 1.5 }, { type: 'scuff', min: 0.6, max: 1.4, h: 0.3 }]);
    L.addDecal(X.wallDecal(L, 8, 0, 0, 'poster', 1.4, 1.8, 0.2, 'kernel'));
    return L;
  }

  // ------------------------------------------------------------ STORM TUNNELS (Pipe Dreams)
  function genTunnels(def) {
    const L = X.genBackrooms(def);
    const r = U.rng(def.seed + 5), C = L.cell;
    // Pipes along the walls of long corridors, steam valves in the boiler room
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
      if (!L.passable(x, y) || r() > 0.35) continue;
      const sides = L.wallSides(x, y);
      if (!sides.length) continue;
      const d = r.pick(sides);
      const off = C / 2 - 0.3;
      L.addProp('wallPipes', L.cx(x) + DX[d] * off, L.cz(y) + DY[d] * off, [0, -H, PI, H][d] + PI, { d });
    }
    return L;
  }

  Object.assign(G.layouts, { building: genBuilding, street: genStreet, workshop: genWorkshop, tunnels: genTunnels });
  G.furnish = FURNISH;
})(typeof window !== 'undefined' ? window : globalThis);
