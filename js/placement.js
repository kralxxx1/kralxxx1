/* Item placement against the real geometry.
   Level generation only knows cells and nominal heights; the furniture is built later. Once the
   world exists, every free-standing item is settled by casting rays at what is actually there:
   - an item meant for a table sits exactly on the table top, or, if no table stands there, is
     moved to the nearest table, desk, counter, crate or shelf in view, or left on the floor;
   - an item on the floor that ended up under or inside a piece of furniture is lifted onto it
     (if it is low) or slid out beside it;
   - a paper pinned to a wall is moved flush with the wall.
   validate() reports anything still floating, sunk or in a wall (used by the tests). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;

  // Items with their own furniture or fixed mounting: leave them alone
  const SELF = new Set(['computer', 'phone', 'keycard', 'generator', 'shrine', 'plug', 'specialCabinet', 'freeCabinet', 'register', 'drain', 'portal', 'powerPellet', 'booth', 'dial', 'monitor', 'token', 'exitPanel']);
  const WALL = new Set(['keypad', 'cardReader', 'fuseBox', 'fusePanel', 'valve']);
  // Furniture an item can be put on (definition names used by the world's instanced props)
  const SUPPORT = /^(desk|cubicleDesk|teacherDesk|schoolDesk|readingTable|cafTable|meetingTable|kitchenCounter|counter|storeCounter|nurseCounter|frontDesk|nightstand|dresserTv|workbench|crate|crateStack|boxes|pallet|bench|mallBench|filing|safe|shelf|toyShelf|bookshelf|washer|dryer|iceMachine|altar|kiosk|chompyStand|tvStack|table|sideTable|coffeeTable)/;

  const DOWN = new THREE.Vector3(0, -1, 0);
  const ray = new THREE.Raycaster();
  const v = new THREE.Vector3();

  function targetsOf(g, skip) {
    const out = [];
    g.world.group.traverse(o => {
      if (!(o.isMesh || o.isInstancedMesh) || !o.visible) return;
      const m = o.material;
      if (!m || Array.isArray(m) && !o.isMesh) return;
      // glows, pellets, lamp lenses and screens are not something to set a thing on
      if (!Array.isArray(m) && (m.transparent || m.isShaderMaterial || m.isPointsMaterial || m.isMeshBasicMaterial)) return;
      if (o.userData.noPrepass || o.userData.noSupport) return;
      out.push(o);
    });
    for (const it of g.items) if (it.mesh && it.mesh !== skip && !it.taken) it.mesh.traverse(o => { if (o.isMesh && o.material && !o.material.transparent) out.push(o); });
    return out;
  }
  // Height of the first upward-facing surface below (x, top, z); null if none
  function hitDown(targets, x, z, top, far) {
    ray.set(v.set(x, top, z), DOWN);
    ray.near = 0; ray.far = far != null ? far : top + 0.3;
    const hits = ray.intersectObjects(targets, false);
    for (const h of hits) {
      const n = h.face && h.face.normal;
      if (n && Math.abs(n.y) < 0.35) continue;
      return { y: h.point.y, obj: h.object, id: h.instanceId };
    }
    return null;
  }
  // Tops of support furniture within reach, found by casting down at every instance's center
  function supports(g, targets) {
    if (g._supports) return g._supports;
    const out = [], m4 = new THREE.Matrix4(), p = new THREE.Vector3();
    g.world.group.traverse(o => {
      if (!o.isInstancedMesh || !SUPPORT.test(o.userData.def || '') || o.userData.def.includes('~')) return;
      for (let k = 0; k < o.count; k++) {
        o.getMatrixAt(k, m4); p.setFromMatrixPosition(m4);
        const h = hitDown(targets, p.x, p.z, 2.4, 2.6);
        if (h && h.y > 0.3 && h.y < 1.35) out.push({ x: p.x, z: p.z, y: h.y, def: o.userData.def, used: 0 });
      }
    });
    return (g._supports = out);
  }
  // A free spot on top of support s (the whole footprint of a small item must be on the surface)
  function spotOn(targets, s, taken, rng) {
    for (let t = 0; t < 14; t++) {
      const a = rng() * Math.PI * 2, d = t === 0 ? 0 : rng() * 0.45;
      const x = s.x + Math.cos(a) * d, z = s.z + Math.sin(a) * d;
      if (taken.some(q => Math.hypot(q[0] - x, q[1] - z) < 0.28)) continue;
      let ok = true;
      for (const [ox, oz] of [[0, 0], [0.09, 0], [-0.09, 0], [0, 0.09], [0, -0.09]]) {
        const h = hitDown(targets, x + ox, z + oz, s.y + 0.3, 0.45);
        if (!h || Math.abs(h.y - s.y) > 0.02) { ok = false; break; }
      }
      if (ok) return [x, z];
    }
    return null;
  }
  function moveTo(o, x, y, z) {
    o.pos.set(x, y, z);
    if (o.mesh) { o.mesh.position.set(x, y, z); o.baseY = y; }
    if (o.interactPos) o.interactPos.set(x, y + 0.1, z);
  }
  // ---- Furniture against walls -------------------------------------------------------------
  const WALL_HALF = 0.1;
  // Mounted on or built into a wall, or deliberately spanning cells: not pushed around
  const FIXED = /^(collider|pegboard|nightWindow|wallPipes|wallClock|monitorWall|chalkboard|keyBoard|handDryer|mirror|corkboard|paperHolder|curtain|hoop|roof|rug|poster|sign|vent|pipeRun|beam|stairsUp|bleachers|fix-)/;
  // Loose clutter that is simply left out when it cannot fit
  const DECOR = /^(crate|crateStack|barrel|pallet|boxes|trashCan|mopBucket|planter|towelRack|lounger|debris|trashBag|cone|tire|bucket|chairPile)$/;
  // Axis-aligned boxes of everything solid around (x, z): walls with their thickness, doorways, blocked cells
  function solidsNear(L, x, z, rad, pad) {
    const C = L.cell, out = [];
    const x0 = Math.floor((x - rad) / C) - 1, x1 = Math.floor((x + rad) / C) + 1;
    const y0 = Math.floor((z - rad) / C) - 1, y1 = Math.floor((z + rad) / C) + 1;
    for (let cy = y0; cy <= y1; cy++) for (let cx = x0; cx <= x1; cx++) {
      if (!L.passable(cx, cy)) { out.push([cx * C - pad, cy * C - pad, (cx + 1) * C + pad, (cy + 1) * C + pad]); continue; }
      for (const d of [0, 1, 2, 3]) {
        const nx = cx + (d === 1 ? 1 : d === 3 ? -1 : 0), ny = cy + (d === 2 ? 1 : d === 0 ? -1 : 0);
        if (!L.passable(nx, ny)) continue;
        if (!L.edgeKind(cx, cy, d) && !(L.doorMap.size && L.doorMap.get(L.edgeKey(cx, cy, d)))) continue;
        if (d === 1 || d === 3) { const ex = (cx + (d === 1 ? 1 : 0)) * C; out.push([ex - pad, cy * C - pad, ex + pad, (cy + 1) * C + pad]); }
        else { const ez = (cy + (d === 2 ? 1 : 0)) * C; out.push([cx * C - pad, ez - pad, (cx + 1) * C + pad, ez + pad]); }
      }
    }
    return out;
  }
  // Oriented footprint of a prop in the world
  function obbOf(p, f) {
    const r = p.rot || 0, c = Math.cos(r), s = Math.sin(r), sx = p.sx || 1, sz = p.sz || 1;
    const ox = (f.x0 + f.x1) / 2 * sx, oz = (f.z0 + f.z1) / 2 * sz;
    return { x: p.x + ox * c + oz * s, z: p.z - ox * s + oz * c, u: [c, -s], v: [s, c], hx: (f.x1 - f.x0) / 2 * sx, hz: (f.z1 - f.z0) / 2 * sz };
  }
  // Separating-axis test; returns the smallest push {x, z} that frees box a from box b, or null
  function sat(a, bAxes, bProj, bx, bz) {
    let best = null;
    for (const ax of [[1, 0], [0, 1], a.u, a.v].concat(bAxes)) {
      const ra = a.hx * Math.abs(a.u[0] * ax[0] + a.u[1] * ax[1]) + a.hz * Math.abs(a.v[0] * ax[0] + a.v[1] * ax[1]);
      const rb = bProj(ax);
      const d = (a.x - bx) * ax[0] + (a.z - bz) * ax[1];
      const o = ra + rb - Math.abs(d);
      if (o <= 0) return null;
      if (!best || o < best.o) best = { o, x: ax[0] * Math.sign(d || 1), z: ax[1] * Math.sign(d || 1) };
    }
    return best;
  }
  const vsBox = (a, b) => sat(a, [], ax => (b[2] - b[0]) / 2 * Math.abs(ax[0]) + (b[3] - b[1]) / 2 * Math.abs(ax[1]), (b[0] + b[2]) / 2, (b[1] + b[3]) / 2);
  const vsObb = (a, b) => sat(a, [b.u, b.v], ax => b.hx * Math.abs(b.u[0] * ax[0] + b.u[1] * ax[1]) + b.hz * Math.abs(b.v[0] * ax[0] + b.v[1] * ax[1]), b.x, b.z);

  const Placement = PB.Placement = {
    WALL_HALF, FIXED, solidsNear, obbOf, vsBox, vsObb,
    // Before anything is built: slide every free-standing piece of furniture out of the walls (their real
    // thickness, not the cell line), and leave out loose clutter that overlaps other furniture.
    fitProps(L, footprint) {
      const pad = WALL_HALF + 0.03, placed = [], log = { moved: 0, dropped: 0, stuck: [] };
      const drop = new Set();
      const fp = p => !p.wall && !FIXED.test(p.type) && !(p.y > 0.05) ? footprint(p.type === 'cabinet' ? 'cabinetBody' : p.type) : null;
      // Furniture first, clutter after, so clutter gives way
      const isDecor = p => DECOR.test(p.type) || !!p.dressing;
      const order = L.props.filter(p => !isDecor(p)).concat(L.props.filter(isDecor));
      for (const p of order) {
        const f = fp(p);
        if (!f) continue;
        const x0 = p.x, z0 = p.z;
        let ok = false;
        for (let it = 0; it < 10; it++) {
          const a = obbOf(p, f);
          let push = null;
          for (const b of solidsNear(L, a.x, a.z, Math.hypot(a.hx, a.hz), pad)) {
            const m = vsBox(a, b);
            if (m && (!push || m.o > push.o)) push = m;
          }
          if (!push) { ok = true; break; }
          p.x += push.x * (push.o + 0.004); p.z += push.z * (push.o + 0.004);
        }
        const decor = isDecor(p);
        const moved = Math.hypot(p.x - x0, p.z - z0);
        // Clutter shoved more than half a meter was in the wrong place: better absent than odd
        if (decor && (!ok || moved > 0.6)) { log.dropped++; drop.add(p); continue; }
        if (!ok) { p.x = x0; p.z = z0; log.stuck.push(p.type); }
        else if (moved > 0.001) {
          log.moved++;
          // Things resting on it (items and spots set on the furniture) move with it
          const q = { x: x0, z: z0, rot: p.rot, sx: p.sx, sz: p.sz }, a0 = obbOf(q, f), dx = p.x - x0, dz = p.z - z0;
          const on = (x, z) => { const rx = x - a0.x, rz = z - a0.z; return Math.abs(rx * a0.u[0] + rz * a0.u[1]) < a0.hx + 0.05 && Math.abs(rx * a0.v[0] + rz * a0.v[1]) < a0.hz + 0.05; };
          for (const it of L.items || []) if ((it.wy || 0) > 0.05 && on(it.wx, it.wz)) { it.wx += dx; it.wz += dz; }
          for (const k in L.spots) for (const sp of L.spots[k]) if (sp.wx != null && (sp.h || 0) > 0.05 && on(sp.wx, sp.wz)) { sp.wx += dx; sp.wz += dz; }
        }
        const a = obbOf(p, f);
        if (decor && placed.some(q => vsObb(a, q))) { log.dropped++; drop.add(p); continue; }
        placed.push(a);
      }
      if (drop.size) { const keep = L.props.filter(p => !drop.has(p)); L.props.length = 0; L.props.push(...keep); }
      L.fitLog = log;
      return log;
    },
    settle(g) {
      const L = g.level, taken = [], rng = PB.U.rng((L.def && L.def.seed || 1) + 77);
      g._supports = null;
      g.world.group.updateMatrixWorld(true);
      for (const o of g.items) if (o.mesh) o.mesh.updateMatrixWorld(true);
      const report = [];
      for (const o of g.items) {
        if (!o.mesh || o.taken || SELF.has(o.type) || o.item.prop || o.container) continue;
        const it = o.item, targets = targetsOf(g, o.mesh);
        const onWall = it.d >= 0 && (it.wy || 0) > 0.5;
        if (onWall || WALL.has(o.type)) { Placement.toWall(g, o, targets); continue; }
        const want = it.wy || 0;
        let h = hitDown(targets, o.pos.x, o.pos.z, want + 0.35);
        let y = h ? h.y : 0;
        if (want > 0.25 && y < want - 0.2) {
          // The furniture it was meant for is not here: nearest one in view, else the floor
          const list = supports(g, targets).filter(s => Math.hypot(s.x - o.pos.x, s.z - o.pos.z) < 5 && L.los(o.pos.x, o.pos.z, s.x, s.z)).sort((a, b) => (a.used - b.used) || (Math.hypot(a.x - o.pos.x, a.z - o.pos.z) - Math.hypot(b.x - o.pos.x, b.z - o.pos.z)));
          let done = false;
          for (const s of list) { const p = spotOn(targets, s, taken, rng); if (p) { s.used++; moveTo(o, p[0], s.y, p[1]); taken.push(p); done = true; report.push([o.id, 'toSupport', s.def]); break; } }
          if (!done) { moveTo(o, o.pos.x, y, o.pos.z); report.push([o.id, 'toFloor']); }
          continue;
        }
        if (want <= 0.25) {
          // Dropped inside or under furniture? Look from above.
          const top = hitDown(targets, o.pos.x, o.pos.z, 2.6, 2.7);
          if (top && top.y > 0.06) {
            if (top.y < 1.3) { const s = { x: o.pos.x, z: o.pos.z, y: top.y }; const p = spotOn(targets, s, taken, rng) || [o.pos.x, o.pos.z]; moveTo(o, p[0], top.y, p[1]); taken.push(p); report.push([o.id, 'onTop']); continue; }
            // Under something tall: slide out to clear floor next to it
            let moved = false;
            for (let t = 1; t <= 24 && !moved; t++) {
              const a = t * 2.4, d = 0.4 + t * 0.06, x = o.pos.x + Math.cos(a) * d, z = o.pos.z + Math.sin(a) * d;
              const c = L.cellOf(x, z);
              if (!L.passable(c.x, c.y) || !L.los(o.pos.x, o.pos.z, x, z)) continue;
              const t2 = hitDown(targets, x, z, 2.6, 2.7);
              if (t2 && t2.y < 0.05) { moveTo(o, x, t2.y, z); moved = true; report.push([o.id, 'slidOut']); }
            }
            if (moved) continue;
          }
        }
        moveTo(o, o.pos.x, Math.max(0, y), o.pos.z);
        taken.push([o.pos.x, o.pos.z]);
      }
      g.placementLog = report;
      return report;
    },
    // Wall items sit flush with the wall they face away from
    toWall(g, o, targets) {
      const yaw = o.mesh.rotation.y, nx = Math.sin(yaw), nz = Math.cos(yaw);
      ray.set(v.set(o.pos.x + nx * 0.35, o.pos.y, o.pos.z + nz * 0.35), new THREE.Vector3(-nx, 0, -nz));
      ray.near = 0; ray.far = 0.9;
      const hits = ray.intersectObjects(targets, false);
      if (!hits.length) return false;
      const p = hits[0].point;
      const gap = WALL.has(o.type) ? 0.0 : 0.006;
      o.pos.set(p.x + nx * gap, o.pos.y, p.z + nz * gap);
      o.mesh.position.copy(o.pos);
      if (o.interactPos) o.interactPos.set(o.pos.x + nx * 0.1, o.interactPos.y, o.pos.z + nz * 0.1);
      return true;
    },
    // Test helper: anything floating, sunk into furniture, or pushed into a wall
    validate(g) {
      const issues = [], L = g.level;
      g.world.group.updateMatrixWorld(true);
      for (const o of g.items) {
        if (!o.mesh || o.taken || SELF.has(o.type) || o.item.prop || o.container) continue;
        const targets = targetsOf(g, o.mesh), it = o.item;
        const onWall = it.d >= 0 && (it.wy || 0) > 0.5;
        if (onWall || WALL.has(o.type)) {
          const yaw = o.mesh.rotation.y, nx = Math.sin(yaw), nz = Math.cos(yaw);
          ray.set(v.set(o.pos.x + nx * 0.3, o.pos.y, o.pos.z + nz * 0.3), new THREE.Vector3(-nx, 0, -nz)); ray.near = 0; ray.far = 0.6;
          const hits = ray.intersectObjects(targets, false);
          const d = hits.length ? hits[0].distance - 0.3 : 9;
          if (d > 0.05) issues.push({ id: o.id, type: o.type, kind: 'wallGap', gap: +d.toFixed(2) });
          continue;
        }
        const h = hitDown(targets, o.pos.x, o.pos.z, o.pos.y + 0.05, o.pos.y + 0.5);
        const gap = h ? o.pos.y - h.y : o.pos.y;
        if (gap > 0.04) issues.push({ id: o.id, type: o.type, kind: 'floating', gap: +gap.toFixed(2), y: +o.pos.y.toFixed(2) });
        // Buried: something right on top of it, or shut in on every side under a lid (an open shelf is fine)
        const top = hitDown(targets, o.pos.x, o.pos.z, 2.6, 2.7);
        if (top && top.y > o.pos.y + 0.03 && top.y < 2.4) {
          let walls = 0;
          for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            ray.set(v.set(o.pos.x, o.pos.y + 0.06, o.pos.z), new THREE.Vector3(dx, 0, dz)); ray.near = 0; ray.far = 0.7;
            if (ray.intersectObjects(targets, false).length) walls++;
          }
          if (top.y < o.pos.y + 0.15 || walls === 4) issues.push({ id: o.id, type: o.type, kind: 'buried', under: +top.y.toFixed(2), y: +o.pos.y.toFixed(2), walls });
        }
        const c = L.cellOf(o.pos.x, o.pos.z);
        if (!L.inb(c.x, c.y) || !L.passable(c.x, c.y)) issues.push({ id: o.id, type: o.type, kind: 'inSolid' });
      }
      // Furniture pushed through walls: the footprint (a few cm of slack) must not reach into a wall's thickness
      const m4 = new THREE.Matrix4(), p = new THREE.Vector3(), sc = new THREE.Vector3(), qt = new THREE.Quaternion(), e = new THREE.Euler();
      g.world.group.traverse(o => {
        const def = o.userData.def;
        if (!o.isInstancedMesh || !def || o.userData.wallMounted || FIXED.test(def) || /^(pillar|beam|pipeRun|vent|rack|archiveShelf|serverRack|serverLeds|crt|fix-|cabinetScreen|cabinetMarquee|deskLamp|cubicleMonitor)/.test(def)) return;
        if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
        const b = o.geometry.boundingBox;
        if (b.min.y > 2.2) return;
        const f = { x0: b.min.x + 0.03, x1: b.max.x - 0.03, z0: b.min.z + 0.03, z1: b.max.z - 0.03 };
        if (f.x1 <= f.x0 || f.z1 <= f.z0) return;
        for (let k = 0; k < o.count; k++) {
          o.getMatrixAt(k, m4); m4.decompose(p, qt, sc); e.setFromQuaternion(qt, 'YXZ');
          if (sc.x < 1e-4) continue;   // swapped out for a moving copy (an open drawer or door)
          const a = obbOf({ x: p.x, z: p.z, rot: e.y, sx: sc.x, sz: sc.z }, f);
          let worst = 0;
          for (const box of solidsNear(L, a.x, a.z, Math.hypot(a.hx, a.hz), WALL_HALF)) { const m = vsBox(a, box); if (m && m.o > worst) worst = m.o; }
          if (worst > 0.005) issues.push({ id: def + '#' + k, kind: 'inWall', depth: +worst.toFixed(3), x: +p.x.toFixed(1), z: +p.z.toFixed(1) });
        }
      });
      // One report per prop instance, not per material part
      const seen = new Set();
      return issues.filter(i => { const key = i.kind + i.id + (i.x || '') + (i.z || ''); if (seen.has(key)) return false; seen.add(key); return true; });
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
