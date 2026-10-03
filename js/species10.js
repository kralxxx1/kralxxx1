/* What the creatures became (V6): bigger, and never a face.
   - The ones that were people grow to 2.2–2.9 m: long in the leg and the arm, their heads near the
     ceiling. Under a low ceiling or through a doorway they stoop, bent at the waist with the head hung,
     which is worse than if they stood up. Their strides lengthen with them (gait and step rate scale),
     their reach a little, and when one of them walks close the floor carries it: each footfall within a
     few metres is felt as a small jolt.
   - Nobody sees a face. Each kind keeps it hidden its own way: long wet hair plastered down over it (the
     Drowned, the Silted, the Long Ones, the Under-ice), a sodden cloth hanging from the brow (the
     Sleepers, the lamplighters, the Hush), a gauze veil (the Choir), a frost-stiff scarf wound over it
     (the Frozen), a flour sack tied at the neck (the Cook, the Laughers), or a hood with nothing in it
     but dark (the Bellman, the Ushers, the Conductor, the Passengers).
   Applied over the species definitions (creatures.js, species1–9.js) without changing them: the model
   factory, the lift (buried depth scales with the body) and the animation are wrapped. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, T = PB.Tex, K = PB.SpeciesKit, Sp = PB.Species;
  const PI = Math.PI, H = PI / 2;

  // target height (metres) and how the face is hidden
  const V6 = {
    drowned: { h: 2.35, face: 'hair' }, passenger: { h: 2.2, face: 'void' }, bellman: { h: 2.95, face: 'void' },
    usher: { h: 2.55, face: 'void' }, lamplighter: { h: 2.6, face: 'shroud' }, frozen: { h: 2.3, face: 'frost' },
    cook: { h: 2.7, face: 'sack' }, silted: { h: 2.35, face: 'hair' }, longone: { face: 'hair' }, choir: { h: 2.4, face: 'veil' },
    conductor: { h: 2.8, face: 'void' }, sleeper: { h: 2.45, face: 'shroud' }, laugher: { h: 2.5, face: 'sack' },
    hush: { h: 2.9, face: 'veil' }, underice: { face: 'hair' }, mask: { h: 2.35 }, wallpaperMan: { h: 2.6 },
  };

  // ------------------------------------------------------------ materials for what covers the face
  const mats = {};
  const hairMat = () => mats.hair || (mats.hair = (() => {
    const tex = T.canvas('v6:hairStrands', 256, 512, (g, w, h) => {
      const r = U.rng(31);
      g.fillStyle = '#0c0b0a'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 900; k++) {
        const x = r() * w, a = r.range(0.05, 0.25), c = r() < 0.5 ? '40,34,28' : '18,16,14';
        g.strokeStyle = `rgba(${c},${a})`; g.lineWidth = r.range(0.6, 2);
        g.beginPath(); g.moveTo(x, 0); g.bezierCurveTo(x + r.range(-6, 6), h * 0.3, x + r.range(-10, 10), h * 0.7, x + r.range(-14, 14), h); g.stroke();
      }
      // wet sheen in clumps
      for (let k = 0; k < 60; k++) { g.fillStyle = `rgba(150,150,150,${r.range(0.03, 0.08)})`; g.fillRect(r() * w, r() * h, 2, r.range(20, 80)); }
    });
    const m = new THREE.MeshStandardMaterial({ map: tex, color: 0xb0aaa4, roughness: 0.6, metalness: 0.0, side: THREE.DoubleSide });
    return m;
  })());
  // (the kit's materials expect per-vertex colour from the SDF meshes; these covers are plain geometry)
  const clothOf = (key, base, o) => mats[key] || (mats[key] = (() => { const m = K.cloth('v6:' + key, base, Object.assign({ double: true }, o)); m.side = THREE.DoubleSide; m.vertexColors = false; m.needsUpdate = true; return m; })());
  const voidMat = () => mats.void || (mats.void = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }));
  const ropeMat = () => mats.rope || (mats.rope = new THREE.MeshStandardMaterial({ color: 0x6a5838, roughness: 1 }));
  const coverMat = kind => kind === 'hair' ? hairMat()
    : kind === 'sack' ? clothOf('sack', '#7a6a4a', { stains: 90, rep: 4, stain: '40,30,18', paint: (g, w, h, r) => { g.strokeStyle = 'rgba(30,22,12,0.35)'; for (let x = 0; x < w; x += 6) { g.lineWidth = 2; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); } for (let y = 0; y < h; y += 6) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); } } })
    : kind === 'veil' ? clothOf('veil', '#1a1a1c', { stains: 10, rep: 2, rough: 0.8 })
    : kind === 'frost' ? clothOf('frost', '#b8c4cc', { stains: 30, rep: 2, stain: '240,246,252' })
    : kind === 'void' ? clothOf('hood', '#121214', { stains: 30, rep: 2 })
    : clothOf('shroud', '#5e574a', { stains: 70, rep: 3 });

  // Everything is fitted to the head's own bounds (in the neck's space), so a swollen face or a long
  // jaw is covered as well as a plain one. hb: the head mesh's bounding box.
  // A drape hanging in front of the face from the brow: it follows the face and then falls free, folds
  // running down it, the sides wrapping back round the cheeks, the bottom edge ragged.
  function drapeGeo(hb, len, extraW, seed, out = 0.012) {
    const r = U.rng(seed), g = new THREE.PlaneGeometry(1, 1, 12, 18), p = g.attributes.position;
    const front = hb.max.z, halfW = Math.max(-hb.min.x, hb.max.x), Hh = hb.max.y - hb.min.y;
    const top = hb.min.y + Hh * 0.82, chin = hb.min.y;
    for (let i = 0; i < p.count; i++) {
      const u = p.getX(i), v = 0.5 - p.getY(i);           // u -0.5..0.5 across, v 0..1 down
      const w = halfW * 2 + 0.03 + extraW, flare = 1 + v * 0.3;
      let x = u * w * flare;
      let y = top - v * len;
      let z = front + out;
      if (y < chin + Hh * 0.1) z += (chin + Hh * 0.1 - y) * 0.16;       // hanging free below the chin
      z -= u * u * 4 * (front - 0.005);                                 // back round the sides
      x += Math.sin(u * 23 + v * 3 + seed) * 0.004;
      z += Math.sin(u * 31 + seed) * 0.006 * v;
      if (v > 0.98) y -= r() * 0.035;
      p.setXYZ(i, x, y, z);
    }
    g.computeVertexNormals();
    return g;
  }
  // A cap over the crown and the back of the head, a little bigger than the head
  function capGeo(hb, grow, theta, fwd = 0) {
    const c = hb.getCenter(new THREE.Vector3()), sz = hb.getSize(new THREE.Vector3());
    const g = new THREE.SphereGeometry(1, 28, 16, 0, PI * 2, 0, theta);
    g.scale(sz.x / 2 + grow, sz.y / 2 + grow, sz.z / 2 + grow + fwd); g.translate(c.x, c.y, c.z + fwd * 0.5);
    return g;
  }
  function addCover(rig, kind, key) {
    const grp = new THREE.Group(), seed = U.hashStr(key) % 97;
    const hg = rig.head && rig.head.geometry;
    if (!hg) return null;
    if (!hg.boundingBox) hg.computeBoundingBox();
    const hb = hg.boundingBox.clone().applyMatrix4(rig.head.matrix);
    const Hh = hb.max.y - hb.min.y;
    const m = coverMat(kind);
    const add = (geo, mat) => { const mesh = new THREE.Mesh(geo, mat); mesh.castShadow = true; mesh.receiveShadow = true; grp.add(mesh); return mesh; };
    if (kind === 'hair') {
      add(capGeo(hb, 0.012, PI * 0.62), m);
      add(drapeGeo(hb, Hh * 2.4, 0.03, seed), m);
      // heavy locks hanging forward over the cheeks and off the shoulders
      for (const sx of [-1, 1]) { const l = add(drapeGeo(hb, Hh * 2.0, -0.05, seed + sx, 0.004), m); l.position.x = sx * 0.04; l.rotation.y = sx * 0.6; }
    } else if (kind === 'sack') {
      add(capGeo(hb, 0.022, PI * 0.93, 0.01), m);
      const rope = new THREE.Mesh(new THREE.TorusGeometry(Math.max(-hb.min.x, hb.max.x) * 0.85, 0.009, 6, 20), ropeMat()); rope.rotation.x = H; rope.position.set(0, hb.min.y + 0.005, (hb.min.z + hb.max.z) / 2); grp.add(rope);
      // the gathered neck of the sack below the rope
      const skirt = new THREE.Mesh(new THREE.CylinderGeometry(Math.max(-hb.min.x, hb.max.x) * 0.8, Math.max(-hb.min.x, hb.max.x) * 1.15, 0.07, 18, 1, true), m); skirt.position.set(0, hb.min.y - 0.035, (hb.min.z + hb.max.z) / 2); grp.add(skirt);
    } else if (kind === 'void') {
      // a deep hood: the crown and sides, drawn forward past the face; inside it, nothing
      const c = hb.getCenter(new THREE.Vector3()), sz = hb.getSize(new THREE.Vector3());
      const hood = new THREE.SphereGeometry(1, 28, 16, PI * 0.62, PI * 1.76, 0, PI * 0.72);
      hood.scale(sz.x / 2 + 0.035, sz.y / 2 + 0.04, sz.z / 2 + 0.06); hood.translate(c.x, c.y + 0.01, c.z + 0.03);
      add(hood, m);
      const dark = new THREE.Mesh(new THREE.CircleGeometry(1, 24), voidMat()); dark.scale.set(sz.x / 2 + 0.02, sz.y / 2 + 0.02, 1); dark.position.set(c.x, c.y, hb.max.z + 0.012); grp.add(dark);
    } else {
      // shroud, veil, frost: a cloth over the crown and down over the face
      add(capGeo(hb, 0.014, PI * 0.6), m);
      add(drapeGeo(hb, Hh * (kind === 'veil' ? 2.8 : kind === 'frost' ? 1.6 : 2.2), kind === 'veil' ? 0.06 : 0.03, seed), m);
    }
    rig.neck.add(grp);
    rig.cover = grp;
    return grp;
  }

  // ------------------------------------------------------------ stooping
  function stoop(cr, m, dt) {
    const r = m.rig;
    if (!r || !r.hips || !r.legs) return;
    const g = cr.g, L = g.level, c = L.cellOf(cr.pos.x, cr.pos.z);
    let room = 99;
    if (L.inb(c.x, c.y) && !(L.meta.outdoor && L.meta.outdoor[L.i(c.x, c.y)])) room = L.ceilAt(c.x, c.y);
    // a doorway: duck under the lintel on the way through
    if (g.world && g.world.doorObjs) for (const o of g.world.doorObjs.values()) {
      const G = o.g, d = Math.hypot(cr.pos.x - G.cx, cr.pos.z - G.cz);
      if (d < 1.3) room = Math.min(room, G.height + Math.max(0, d - 0.25) * 0.7);
    }
    const need = cr.sp.height + 0.05, k = U.clamp((need - room) / (cr.sp.height * 0.28), 0, 1);
    cr.stoopK = U.damp(cr.stoopK || 0, k, 4, dt);
    const s = cr.stoopK;
    if (s < 0.005) return;
    r.hips.rotation.x += 0.62 * s;
    r.neck.rotation.x += 0.5 * s;
    for (const l of r.legs) { l.hp.rotation.x -= 0.5 * s; l.kn.rotation.x += 0.85 * s; }
    r.hips.position.y -= (r.hipY || 0.9) * 0.15 * s;
    for (const a of r.arms || []) a.sh.rotation.x -= 0.25 * s;     // arms hang forward
  }

  // ------------------------------------------------------------ wrap the species
  function apply() {
    for (const [kind, cfg] of Object.entries(V6)) {
      const sp = Sp.get(kind);
      if (!sp || sp.v6) continue;
      sp.v6 = true;
      const g = cfg.h ? cfg.h / (sp.height || 1.8) : 1;
      if (g !== 1) {
        sp.height = cfg.h;
        sp.radius = (sp.radius || 0.3) * Math.min(g, 1.25);
        sp.catchR = (sp.catchR || 1.05) * (0.85 + 0.15 * g);
        sp.stepRate = (sp.stepRate || 1.6) * g;
        sp.gait = (sp.gait || 1.8) / g;
        sp.giant = g;
      }
      const make = sp.model;
      sp.model = function (game, o) {
        const m = make.call(this, game, o);
        if (g !== 1) m.group.scale.multiplyScalar(g);
        if (cfg.face && m.rig && m.rig.neck) addCover(m.rig, cfg.face, kind);
        if (m.lift && g !== 1) {
          const lift = m.lift;
          // buried and rising: as deep as the body is long
          m.lift = function (cr, dt) { const y = lift.call(this, cr, dt), st = cr.state; return (st === 'buried' || st === 'dormant' || st === 'emerge') && y < 0 ? y * g : y; };
        }
        const anim = m.animate;
        m.animate = function (cr, dt) { if (anim) anim.call(this, cr, dt); if (g > 1.05) stoop(cr, m, dt); };
        return m;
      };
    }
  }
  apply();

  // Heavy footfalls are felt: within a few metres of a giant each step jolts the view a little
  const C = PB.Creature && PB.Creature.prototype;
  if (C && C.footsteps) {
    const steps = C.footsteps;
    C.footsteps = function (dt, speed, d) {
      const before = this.stepAcc || 0;
      steps.call(this, dt, speed, d);
      const g = this.sp.giant || 1;
      if (g > 1.15 && (this.stepAcc || 0) < before && d < 7 && this.g.player && this.g.player.addTrauma) {
        this.g.player.addTrauma(0.05 * (g - 1) * (1 - d / 7) * (this.state === 'chase' ? 1.6 : 1));
      }
    };
  }
  PB.SpeciesV6 = { V6, addCover };
})(typeof window !== 'undefined' ? window : globalThis);
