/* Lights never drop out of the render list.
   three.js builds its shaders for an exact number of lights of each kind. A light that disappears
   for a frame (hidden with its object, removed with a taken item, a passing car, a lightning flash)
   makes every material in the scene recompile, which is a freeze of seconds on some GPUs.
   The keeper registers every light once the level is warm. Each frame, lights that would not be
   drawn are parked in an always-visible holder at zero intensity (their shadow maps paused), and
   put back where they were after the frame. The light count, and so every shader, stays the same. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;

  class LightKeeper {
    constructor(scene) {
      this.scene = scene;
      this.holder = new THREE.Group();
      this.holder.name = 'lightKeeper';
      scene.add(this.holder);
      this.lights = new Set();
      this.parked = [];
      this.scanT = 0;
      this.late = 0;
    }
    // New level: forget the old lights, register everything that is in the scene now
    reset() {
      this.lights.clear();
      this.collect();
      this.late = 0;
    }
    collect() {
      let n = 0;
      this.scene.traverse(o => { if (o.isLight && !this.lights.has(o)) { this.lights.add(o); n++; } });
      return n;
    }
    // A light created after the warmup still costs one recompile; keep it registered from then on
    tick(dt) {
      this.scanT -= dt;
      if (this.scanT > 0) return;
      this.scanT = 1;
      const n = this.collect();
      if (n) { this.late += n; if (PB.debug) console.warn('[lights] ' + n + ' light(s) appeared after the warmup'); }
    }
    attached(L) {
      let o = L;
      while (o) {
        if (!o.visible) return false;
        if (o === this.scene) return true;
        o = o.parent;
      }
      return false;
    }
    park() {
      const P = this.parked;
      P.length = 0;
      for (const L of this.lights) {
        if (this.attached(L)) continue;
        P.push(L, L.parent, L.visible, L.intensity, L.castShadow ? L.shadow.autoUpdate : null);
      }
      for (let i = 0; i < P.length; i += 5) {
        const L = P[i];
        this.holder.add(L);
        L.visible = true;
        L.intensity = 0;
        if (L.castShadow) L.shadow.autoUpdate = false;
      }
    }
    unpark() {
      const P = this.parked;
      for (let i = 0; i < P.length; i += 5) {
        const L = P[i], parent = P[i + 1];
        if (parent) parent.add(L); else this.holder.remove(L);
        L.visible = P[i + 2];
        L.intensity = P[i + 3];
        if (P[i + 4] !== null) L.shadow.autoUpdate = P[i + 4];
      }
      P.length = 0;
    }
    // Render with every registered light counted
    render(fn) {
      this.park();
      try { fn(); } finally { this.unpark(); }
    }
  }

  PB.LightKeeper = LightKeeper;
  PB.debug = typeof location !== 'undefined' && /[?&]debug\b/.test(location.search);
})(typeof window !== 'undefined' ? window : globalThis);
