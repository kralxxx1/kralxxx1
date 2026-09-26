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
      if (!Array.isArray(m) && (m.transparent || m.isShaderMaterial || m.isPointsMaterial)) return;
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
      if (!o.isInstancedMesh || !SUPPORT.test(o.userData.def || '')) return;
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
  const Placement = PB.Placement = {
    settle(g) {
      const L = g.level, taken = [], rng = PB.U.rng((L.def && L.def.seed || 1) + 77);
      g._supports = null;
      g.world.group.updateMatrixWorld(true);
      for (const o of g.items) if (o.mesh) o.mesh.updateMatrixWorld(true);
      const report = [];
      for (const o of g.items) {
        if (!o.mesh || o.taken || SELF.has(o.type) || o.item.prop) continue;
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
        if (!o.mesh || o.taken || SELF.has(o.type) || o.item.prop) continue;
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
        const top = hitDown(targets, o.pos.x, o.pos.z, 2.6, 2.7);
        if (top && top.y > o.pos.y + 0.12 && top.y < 2.4) issues.push({ id: o.id, type: o.type, kind: 'buried', under: +top.y.toFixed(2), y: +o.pos.y.toFixed(2) });
        const c = L.cellOf(o.pos.x, o.pos.z);
        if (!L.inb(c.x, c.y) || !L.passable(c.x, c.y)) issues.push({ id: o.id, type: o.type, kind: 'inSolid' });
      }
      // Furniture pushed through walls: every corner of an instance's footprint must be on its side of the walls
      const m4 = new THREE.Matrix4(), bb = new THREE.Box3(), p = new THREE.Vector3(), q = new THREE.Vector3();
      g.world.group.traverse(o => {
        if (!o.isInstancedMesh || !o.userData.def || /^(pillar|beam|pipeRun|vent|rack|archiveShelf|serverRack|serverLeds|crt|fix-)/.test(o.userData.def)) return;
        if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
        const b = o.geometry.boundingBox;
        for (let k = 0; k < o.count; k++) {
          o.getMatrixAt(k, m4); p.setFromMatrixPosition(m4);
          let bad = 0;
          for (const [sx, sz] of [[b.min.x + 0.04, b.min.z + 0.04], [b.max.x - 0.04, b.min.z + 0.04], [b.min.x + 0.04, b.max.z - 0.04], [b.max.x - 0.04, b.max.z - 0.04]]) {
            q.set(sx, 0, sz).applyMatrix4(m4);
            if (!L.los(p.x, p.z, q.x, q.z)) bad++;
          }
          if (bad) issues.push({ id: o.userData.def + '#' + k, kind: 'inWall', corners: bad, x: +p.x.toFixed(1), z: +p.z.toFixed(1) });
        }
      });
      // One report per prop instance, not per material part
      const seen = new Set();
      return issues.filter(i => { const key = i.kind + i.id + (i.x || '') + (i.z || ''); if (seen.has(key)) return false; seen.add(key); return true; });
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
