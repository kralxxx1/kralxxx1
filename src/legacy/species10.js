/* What the creatures became (V6, V8): bigger, and never a face.
   - The ones that were people grow to 2.2-2.9 m: long in the leg and the arm, their heads near the
     ceiling. Under a low ceiling or through a doorway they stoop, bent at the waist with the head hung,
     which is worse than if they stood up. Their strides lengthen with them (gait and step rate scale),
     their reach a little, and when one of them walks close the floor carries it: each footfall within a
     few metres is felt as a small jolt.
   - Nobody has a face. Nothing is laid over it (no hood, no hair, no cloth): where the face was there is
     a hollow in the head, black inside (the humanoid kit in species2.js carves it; the Sorter, Lotte and
     the paper man have their own).
   Applied over the species definitions (creatures.js, species1-9.js) without changing them: the model
   factory, the lift (buried depth scales with the body) and the animation are wrapped. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, Sp = PB.Species;
  const PI = Math.PI, H = PI / 2;

  // target height (metres)
  const V6 = {
    drowned: { h: 2.35 }, passenger: { h: 2.2 }, bellman: { h: 2.95 }, usher: { h: 2.55 }, lamplighter: { h: 2.6 },
    frozen: { h: 2.3 }, cook: { h: 2.7 }, silted: { h: 2.35 }, longone: {}, choir: { h: 2.4 }, conductor: { h: 2.8 },
    sleeper: { h: 2.45 }, laugher: { h: 2.5 }, hush: { h: 2.9 }, underice: {}, mask: { h: 2.35 }, wallpaperMan: { h: 2.6 },
  };

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
      // a giant cannot follow you into a crawlway
      if (g > 1.05) { const allow = sp.allowCell; sp.allowCell = (cr, x, y) => (allow ? allow(cr, x, y) : true) && !(cr.L.ceilAt(x, y) < sp.height * 0.62); }
      const make = sp.model;
      sp.model = function (game, o) {
        const m = make.call(this, game, o);
        if (g !== 1) m.group.scale.multiplyScalar(g);
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
  PB.SpeciesV6 = { V6 };
})(typeof window !== 'undefined' ? window : globalThis);
