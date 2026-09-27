/* Rigid-body physics for the loose things in a level (cannon-es, loaded from the CDN at boot; without it
   everything simply stays put).
   Light clutter (cardboard boxes, bottles, cones, bags, wet-floor signs, trash cans, buckets, cables,
   fallen ceiling tiles, the odd chair) becomes a body. You shove it by walking into it, kick it by running
   into it, pick it up with E and throw it with G or the left mouse button. Monsters plough through it:
   the Eater sends boxes flying. Every hard landing makes a sound that fits the material, and noise that
   anything hunting you can hear, so a thrown bottle is a distraction.
   Bodies keep being drawn by their instanced meshes: only the instances that moved are rewritten.
   The static world (wall slabs, blocked cells, furniture boxes) is added lazily around wherever a body is,
   so a huge level costs nothing until something moves in it. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, P = PB.Props;
  const URL = 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';
  let C = null, loading = null;
  function load() {
    if (C || loading) return loading || Promise.resolve(C);
    loading = import(URL).then(m => { C = m; return C; }).catch(e => { console.warn('physics unavailable', e && e.message); C = null; return null; });
    return loading;
  }

  // mass (kg), shape, sound, how easily it tips; anything not listed stays fixed
  const KINDS = {
    boxOpen: { m: 2.5, shape: 'box', snd: 'cardboard' }, boxClosed: { m: 4, shape: 'box', snd: 'cardboard' }, boxes: { m: 6, shape: 'box', snd: 'cardboard' },
    trashBag: { m: 3, shape: 'sphere', snd: 'bag', damp: 0.6 }, cone: { m: 1.2, shape: 'cyl', snd: 'plastic' }, wetFloorSign: { m: 1.4, shape: 'box', snd: 'plastic' },
    bottle: { m: 0.25, shape: 'cyl', snd: 'bottle' }, bottleDown: { m: 0.25, shape: 'cyl', snd: 'bottle' }, cableCoil: { m: 1.5, shape: 'cyl', snd: 'bag' },
    fallenTile: { m: 0.8, shape: 'box', snd: 'tile' }, trashCan: { m: 4, shape: 'cyl', snd: 'metal' }, mopBucket: { m: 5, shape: 'box', snd: 'plastic' },
    chair: { m: 6, shape: 'box', snd: 'wood' }, officeChair: { m: 9, shape: 'box', snd: 'metal' },
  };
  const GRAB_MAX = 6.5;
  const tmpM = new THREE.Matrix4(), tmpQ = new THREE.Quaternion(), tmpV = new THREE.Vector3(), tmpS = new THREE.Vector3(1, 1, 1), up = new THREE.Vector3(0, 1, 0);

  class Physics {
    constructor(g) {
      this.g = g; this.bodies = []; this.statics = new Set(); this.ok = false;
      this.held = null; this.acc = 0; this.soundT = 0;
    }
    setup() {
      const g = this.g, L = g.level, w = g.world;
      if (!C || !w || !w.instMap) return this;
      const world = this.world = new C.World({ gravity: new C.Vec3(0, -9.82, 0), allowSleep: true });
      world.broadphase = new C.SAPBroadphase(world);
      world.solver.iterations = 8;
      world.defaultContactMaterial.friction = 0.45;
      world.defaultContactMaterial.restitution = 0.18;
      // floor
      const floor = new C.Body({ type: C.Body.STATIC, shape: new C.Plane() });
      floor.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
      world.addBody(floor);
      // loose props become bodies
      const fp = new Map();
      for (const p of L.props) {
        const k = KINDS[p.type];
        if (!k || p.wall || ((p.y || 0) > 0.05 && !p.stacked) || p.noPhysics) continue;
        // something is lying on it (an item was set on top): it stays where it is
        if (g.items.some(o => !o.taken && o.pos.y > 0.05 && Math.abs(o.pos.x - p.x) < 0.45 && Math.abs(o.pos.z - p.z) < 0.45)) continue;
        const rec = w.instMap.get(p.type);
        if (!rec) continue;
        const idx = rec.list.indexOf(p);
        if (idx < 0) continue;
        let box = fp.get(p.type);
        if (!box) {
          const b = new THREE.Box3();
          for (const part of P.build(p.type, P.DEFS[p.type])) { if (!part.geo.boundingBox) part.geo.computeBoundingBox(); b.union(part.geo.boundingBox); }
          fp.set(p.type, box = b);
        }
        const sx = p.sx || 1, sy = p.sy || 1, sz = p.sz || 1;
        const hx = (box.max.x - box.min.x) / 2 * sx, hy = Math.max(0.01, (box.max.y - box.min.y) / 2 * sy), hz = (box.max.z - box.min.z) / 2 * sz;
        const cx = (box.max.x + box.min.x) / 2 * sx, cy = (box.max.y + box.min.y) / 2 * sy, cz = (box.max.z + box.min.z) / 2 * sz;
        let shape;
        if (k.shape === 'sphere') shape = new C.Sphere(Math.min(hx, hy, hz) * 1.05);
        else if (k.shape === 'cyl') shape = new C.Cylinder(Math.min(hx, hz), Math.max(hx, hz), hy * 2, 10);
        else shape = new C.Box(new C.Vec3(hx, hy, hz));
        const body = new C.Body({ mass: k.m, shape, linearDamping: k.damp || 0.12, angularDamping: 0.25, allowSleep: true, sleepSpeedLimit: 0.12, sleepTimeLimit: 0.6 });
        // body at the shape's centre; the model's origin sits at offset -c in the body's frame
        const q = new THREE.Quaternion().setFromAxisAngle(up, p.rot || 0);
        const c = new THREE.Vector3(cx, cy, cz).applyQuaternion(q);
        body.position.set(p.x + c.x, (p.y || 0) + c.y + 0.002, p.z + c.z);
        body.quaternion.set(q.x, q.y, q.z, q.w);
        body.sleep();
        const rb = { p, k, body, rec, idx, off: new THREE.Vector3(-cx, -cy, -cz), scale: new THREE.Vector3(sx, sy, sz), cell: null, lastHit: 0 };
        body.addEventListener('collide', e => this.onHit(rb, e));
        rb.inWorld = false;
        this.bodies.push(rb);
        // the player pushes it now, instead of stopping against a box
        if (p.colBox) { w.removeCollider(p.colBox); p.colBox.phys = true; }
        // (Things are pushed and knocked over by walking into them; they are not picked up and thrown.)
      }
      // kinematic stand-ins for the player and anything solid that walks
      this.playerBody = new C.Body({ type: C.Body.KINEMATIC, mass: 0 });
      this.playerBody.addShape(new C.Sphere(0.28), new C.Vec3(0, 0.35, 0));
      this.playerBody.addShape(new C.Sphere(0.28), new C.Vec3(0, 0.95, 0));
      world.addBody(this.playerBody);
      this.movers = new Map();
      this.ok = this.bodies.length > 0;
      return this;
    }
    // Static geometry around a body's cell (walls as slabs with their thickness, blocked cells, furniture)
    around(rb) {
      const L = this.g.level, Cc = L.cell, b = rb.body;
      const cx = Math.floor(b.position.x / Cc), cy = Math.floor(b.position.z / Cc);
      const key = cx + ',' + cy;
      if (rb.cell === key) return;
      rb.cell = key;
      const t = PB.Placement.WALL_HALF, Hh = L.ceil;
      for (let y = cy - 1; y <= cy + 1; y++) for (let x = cx - 1; x <= cx + 1; x++) {
        const ck = 'c' + x + ',' + y;
        if (this.statics.has(ck)) continue;
        this.statics.add(ck);
        const add = (x0, z0, x1, z1, y1) => { const s = new C.Body({ type: C.Body.STATIC, shape: new C.Box(new C.Vec3((x1 - x0) / 2, y1 / 2, (z1 - z0) / 2)) }); s.position.set((x0 + x1) / 2, y1 / 2, (z0 + z1) / 2); this.world.addBody(s); };
        if (!L.passable(x, y)) { add(x * Cc, y * Cc, (x + 1) * Cc, (y + 1) * Cc, Hh); continue; }
        for (const d of [1, 2]) {
          const nx = x + (d === 1 ? 1 : 0), ny = y + (d === 2 ? 1 : 0);
          const door = L.doorMap.size && L.doorMap.get(L.edgeKey(x, y, d));
          if (!L.edgeKind(x, y, d) && !(door && !door.open)) continue;
          const ek = 'e' + x + ',' + y + ',' + d;
          if (this.statics.has(ek)) continue;
          this.statics.add(ek);
          if (d === 1) add((x + 1) * Cc - t, y * Cc, (x + 1) * Cc + t, (y + 1) * Cc, Hh);
          else add(x * Cc, (y + 1) * Cc - t, (x + 1) * Cc, (y + 1) * Cc + t, Hh);
        }
        // furniture (the player's collision boxes) in this cell, except the ones that are bodies themselves
        const list = this.g.world.colGrid.get(L.i(x, y)) || [];
        for (const box of list) {
          if (box.phys || this.statics.has(box)) continue;
          this.statics.add(box);
          add(box.minX, box.minZ, box.maxX, box.maxZ, Math.min(box.maxY || 1, 2.4));
        }
      }
    }
    onHit(rb, e) {
      const g = this.g, now = g.time;
      const v = Math.abs(e.contact.getImpactVelocityAlongNormal());
      if (v < 1.1 || now - rb.lastHit < 0.15) return;
      rb.lastHit = now;
      const pos = rb.body.position, gain = U.clamp((v - 1) / 5, 0.15, 1);
      if (g.audio && this.soundT <= 0) { g.audio.impact(rb.k.snd, { x: pos.x, y: pos.y, z: pos.z }, gain); this.soundT = 0.04; }
      // a crash carries: anything hunting by ear hears it
      if (v > 2.2 && g.noise) g.noise(pos.x, pos.z, 3 + gain * 9);
    }
    grab(rb) {
      if (this.held) return;
      const b = rb.body;
      if (!rb.inWorld) { this.world.addBody(b); rb.inWorld = true; }
      b.wakeUp();
      b.type = C.Body.KINEMATIC; b.mass = 0; b.updateMassProperties();
      this.held = rb;
      this.g.audio && this.g.audio.play('cloth', 4, 'sfx', null, { gain: 0.4 });
      this.g.ui.hint(PB.t('hint.throw'));
    }
    drop(throwIt) {
      const rb = this.held;
      if (!rb) return;
      this.held = null;
      const b = rb.body;
      b.type = C.Body.DYNAMIC; b.mass = rb.k.m; b.updateMassProperties();
      const cam = this.g.camera, f = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
      const sp = throwIt ? U.clamp(11 - rb.k.m, 4, 10) : 0.5;
      b.velocity.set(f.x * sp + this.g.player.vel.x, f.y * sp + (throwIt ? 1.5 : 0), f.z * sp + this.g.player.vel.z);
      b.angularVelocity.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6);
      b.wakeUp();
      if (throwIt && this.g.audio) this.g.audio.play('cloth', 4, 'sfx', null, { gain: 0.6, rate: 1.4 });
    }
    // Keep a kinematic body where an actor is, with the velocity it moved at (so it pushes, not teleports)
    follow(body, x, y, z, dt) {
      const dx = x - body.position.x, dz = z - body.position.z;
      // a jump (spawn, respawn, a portal) is a teleport, not a shove
      if (dx * dx + dz * dz > 1) body.velocity.set(0, 0, 0);
      else body.velocity.set(U.clamp(dx / dt, -12, 12), 0, U.clamp(dz / dt, -12, 12));
      body.position.set(x, y, z);
    }
    update(dt) {
      if (!this.ok) return;
      const g = this.g, pl = g.player;
      this.soundT -= dt;
      // actors
      this.follow(this.playerBody, pl.pos.x, pl.pos.y || 0, pl.pos.z, Math.max(dt, 1e-3));
      // Only what is around you is simulated: bodies far away (and asleep) leave the world until you come back.
      // The walls and furniture around the ones near you are put in place before they can get knocked about.
      if ((this.prepT = (this.prepT || 0) - dt) <= 0) {
        this.prepT = 0.3;
        for (const rb of this.bodies) {
          const d = Math.max(Math.abs(rb.body.position.x - pl.pos.x), Math.abs(rb.body.position.z - pl.pos.z));
          if (d < 24 && !rb.inWorld) { this.world.addBody(rb.body); rb.inWorld = true; rb.body.sleep(); }
          else if (d > 30 && rb.inWorld && rb.body.sleepState === C.Body.SLEEPING && rb !== this.held) { this.world.removeBody(rb.body); rb.inWorld = false; }
          if (d < 9 && rb.inWorld) this.around(rb);
        }
      }
      for (const e of g.entities) {
        if (!e.mesh || !e.mesh.visible || e.ghostly || e.kind === 'watcher' || e.kind === 'grinner' || e.state === 'dormant') continue;
        let mb = this.movers.get(e);
        if (!mb) {
          const r = e.kind === 'pacman' ? 1.05 : e.kind === 'chompy' ? 0.45 : e.kind === 'crawler' ? 0.3 : 0.32;
          mb = new C.Body({ type: C.Body.KINEMATIC, mass: 0 });
          mb.addShape(new C.Sphere(r), new C.Vec3(0, e.kind === 'pacman' ? 1.1 : r, 0));
          this.world.addBody(mb); this.movers.set(e, mb);
        }
        this.follow(mb, e.pos.x, 0, e.pos.z, Math.max(dt, 1e-3));
      }
      // what you are carrying floats in front of you
      if (this.held) {
        const cam = g.camera, f = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
        const b = this.held.body, tx = cam.position.x + f.x * 0.75, ty = cam.position.y - 0.25 + f.y * 0.5, tz = cam.position.z + f.z * 0.75;
        b.velocity.set((tx - b.position.x) * 12, (ty - b.position.y) * 12, (tz - b.position.z) * 12);
        b.angularVelocity.scale(0.8, b.angularVelocity);
        if (g.input.pressed('interact')) this.drop(false);
        else if (g.input.pressed('throw') || g.input.pressed('attack')) this.drop(true);
      }
      // fixed steps
      this.acc = Math.min(this.acc + dt, 0.1);
      while (this.acc >= 1 / 60) { this.world.step(1 / 60); this.acc -= 1 / 60; }
      // draw what moved; move its interaction point; statics around it
      const touched = new Set();
      for (const rb of this.bodies) {
        const b = rb.body;
        if (!rb.inWorld || (b.sleepState === C.Body.SLEEPING && !rb.moving)) continue;
        rb.moving = b.sleepState !== C.Body.SLEEPING;
        this.around(rb);
        if (b.position.y < -5) { b.position.set(rb.p.x, 1, rb.p.z); b.velocity.set(0, 0, 0); }
        tmpQ.set(b.quaternion.x, b.quaternion.y, b.quaternion.z, b.quaternion.w);
        tmpV.copy(rb.off).applyQuaternion(tmpQ).add(new THREE.Vector3(b.position.x, b.position.y, b.position.z));
        tmpM.compose(tmpV, tmpQ, rb.scale);
        for (const im of rb.rec.meshes) { im.setMatrixAt(rb.idx, tmpM); touched.add(im); }
        // its contact shadow follows it along the floor, and fades while it is in the air
        const bl = rb.p.blob;
        if (bl) { const lift = Math.max(0, b.position.y - (rb.restY || (rb.restY = b.position.y))); const k = Math.max(0, 1 - lift * 1.5); tmpM.compose(new THREE.Vector3(b.position.x, 0.004, b.position.z), new THREE.Quaternion().setFromAxisAngle(up, rb.p.rot || 0), new THREE.Vector3(bl.sx * k + 0.001, 1, bl.sz * k + 0.001)); bl.im.setMatrixAt(bl.k, tmpM); touched.add(bl.im); }
        rb.p.x = tmpV.x; rb.p.z = tmpV.z;
        const it = g.interactables.find(i => i.live === rb);
        if (it) it.pos.set(b.position.x, b.position.y, b.position.z);
      }
      for (const im of touched) { im.instanceMatrix.needsUpdate = true; im.computeBoundingSphere(); }
    }
  }

  PB.Physics = { load, KINDS, create: g => C ? new Physics(g).setup() : null, get engine() { return C; } };
})(typeof window !== 'undefined' ? window : globalThis);
