/* Deaths. Every species kills its own way, as a short choreographed sequence: the camera, the creature's
   body, a layer over the eyes (wet paper, frost, mud, water, wool), the sound going under. Never gore:
   a grab, a pull, darkness, cold (STORY.md, tone rules). 2 to 4 seconds, then the death card.

   A kill program is (run) => ({ dur, update(t, dt) }). In update it sets
     run.look      a world point the head is turned toward (or null)
     run.off       camera offset from the eye (world metres)
     run.roll      camera roll, run.fov extra field of view
     run.place(f, u, s, faceCam)   the creature's body relative to the eye: forward/up/side metres
   and calls run.over(layer, amount, shape), run.tint(css, a), run.dark(a), run.shake(k), run.once(id, fn). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, T = PB.Tex;
  const sm = (t, a, b) => U.smoothstep(a, b, t);
  const V = () => new THREE.Vector3();

  // ------------------------------------------------------------ overlay layers (DOM, above the canvas)
  const TEX = {
    paper: () => T.canvas('kill:paper', 512, 512, (g, w, h) => {
      const r = U.rng(3);
      g.fillStyle = '#9a8a4c'; g.fillRect(0, 0, w, h);
      for (let x = 0; x < w; x += 64) { g.fillStyle = 'rgba(80,60,20,0.25)'; g.fillRect(x + 16, 0, 3, h); g.fillRect(x + 48, 0, 3, h); for (let y = 0; y < h; y += 26) { g.strokeStyle = 'rgba(80,60,20,0.3)'; g.beginPath(); g.moveTo(x + 26, y); g.lineTo(x + 32, y + 8); g.lineTo(x + 38, y); g.stroke(); } }
      for (let k = 0; k < 40; k++) { g.strokeStyle = `rgba(40,30,10,${r.range(0.1, 0.35)})`; g.lineWidth = r.range(1, 4); g.beginPath(); let x = r() * w, y = r() * h; g.moveTo(x, y); for (let s = 0; s < 6; s++) { x += r.range(-60, 60); y += r.range(-60, 60); g.lineTo(x, y); } g.stroke(); }
      for (let k = 0; k < 18; k++) { const x = r() * w, y = r() * h, rr = r.range(30, 120), gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, 'rgba(60,45,15,0.45)'); gr.addColorStop(1, 'rgba(60,45,15,0)'); g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
    }),
    frost: () => T.canvas('kill:frost', 512, 512, (g, w, h) => {
      const r = U.rng(5);
      g.clearRect(0, 0, w, h);
      const fern = (x, y, a, len, wdt, depth) => {
        g.strokeStyle = `rgba(230,240,255,${0.25 + wdt * 0.12})`; g.lineWidth = wdt; g.beginPath(); g.moveTo(x, y);
        for (let s = 0; s < len; s++) { a += r.range(-0.15, 0.15); x += Math.cos(a) * 5; y += Math.sin(a) * 5; g.lineTo(x, y); if (depth < 3 && s % 3 === 0) { g.stroke(); fern(x, y, a + (r() < 0.5 ? 1 : -1) * r.range(0.6, 1.1), len * 0.4 | 0, wdt * 0.6, depth + 1); g.beginPath(); g.moveTo(x, y); } }
        g.stroke();
      };
      for (let k = 0; k < 70; k++) { const side = k % 4, t = r(); const [x, y, a] = side === 0 ? [t * w, 0, Math.PI / 2] : side === 1 ? [w, t * h, Math.PI] : side === 2 ? [t * w, h, -Math.PI / 2] : [0, t * h, 0]; fern(x, y, a + r.range(-0.6, 0.6), 18 + r() * 30 | 0, r.range(1, 3), 0); }
      for (let k = 0; k < 3000; k++) { g.fillStyle = `rgba(255,255,255,${r.range(0.05, 0.3)})`; g.fillRect(r() * w, r() * h, 1.5, 1.5); }
    }),
    mud: () => T.canvas('kill:mud', 512, 512, (g, w, h) => {
      const r = U.rng(7);
      g.fillStyle = '#2a1e12'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 400; k++) { const x = r() * w, y = r() * h, rr = r.range(4, 40); g.fillStyle = `rgba(${r.int(20, 70)},${r.int(14, 45)},${r.int(6, 25)},${r.range(0.3, 0.8)})`; g.beginPath(); g.ellipse(x, y, rr, rr * r.range(0.4, 1), r() * 3, 0, 6.28); g.fill(); }
      for (let k = 0; k < 120; k++) { g.fillStyle = `rgba(255,240,200,${r.range(0.03, 0.1)})`; g.beginPath(); g.arc(r() * w, r() * h, r.range(2, 8), 0, 6.28); g.fill(); }
    }),
    soil: () => T.canvas('kill:soil', 512, 512, (g, w, h) => {
      const r = U.rng(8);
      g.fillStyle = '#1c140c'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 2500; k++) { g.fillStyle = `rgba(${r.int(30, 90)},${r.int(20, 60)},${r.int(10, 35)},${r.range(0.4, 1)})`; const s = r.range(2, 9); g.fillRect(r() * w, r() * h, s, s * r.range(0.5, 1.2)); }
      for (let k = 0; k < 60; k++) { g.strokeStyle = 'rgba(160,130,90,0.35)'; g.lineWidth = r.range(0.5, 2); g.beginPath(); let x = r() * w, y = r() * h; g.moveTo(x, y); for (let s = 0; s < 5; s++) { x += r.range(-20, 20); y += r.range(-20, 20); g.lineTo(x, y); } g.stroke(); }
    }),
    wool: () => T.canvas('kill:wool', 512, 512, (g, w, h) => {
      g.fillStyle = '#1e3a24'; g.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 14) for (let x = 0; x < w; x += 12) {
        g.fillStyle = (x + y) % 3 ? '#2c5234' : '#24482c';
        g.beginPath(); g.ellipse(x + 3, y + 7, 4, 7, 0.5, 0, 6.28); g.fill(); g.beginPath(); g.ellipse(x + 9, y + 7, 4, 7, -0.5, 0, 6.28); g.fill();
      }
      const r = U.rng(9); for (let k = 0; k < 900; k++) { g.strokeStyle = `rgba(160,200,160,${r.range(0.05, 0.2)})`; g.beginPath(); const x = r() * w, y = r() * h; g.moveTo(x, y); g.lineTo(x + r.range(-8, 8), y + r.range(-8, 8)); g.stroke(); }
    }),
    blanket: () => T.canvas('kill:blanket', 512, 512, (g, w, h) => {
      g.fillStyle = '#2a2420'; g.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 4) { g.fillStyle = y % 8 ? 'rgba(0,0,0,0.25)' : 'rgba(120,100,80,0.12)'; g.fillRect(0, y, w, 2); }
      for (let x = 0; x < w; x += 64) { g.fillStyle = 'rgba(110,30,30,0.35)'; g.fillRect(x, 0, 10, h); }
    }),
    snow: () => T.canvas('kill:snow', 512, 512, (g, w, h) => {
      const r = U.rng(11); g.fillStyle = '#d8dee8'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 900; k++) { g.fillStyle = `rgba(255,255,255,${r.range(0.2, 0.8)})`; g.beginPath(); g.arc(r() * w, r() * h, r.range(1, 6), 0, 6.28); g.fill(); }
      for (let k = 0; k < 30; k++) { const x = r() * w, y = r() * h, rr = r.range(30, 90), gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, 'rgba(160,175,200,0.35)'); gr.addColorStop(1, 'rgba(160,175,200,0)'); g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
    }),
    water: () => T.canvas('kill:water', 512, 512, (g, w, h) => {
      const r = U.rng(13); const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#2a4a48'); gr.addColorStop(1, '#06100e'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 220; k++) { const x = r() * w, y = r() * h, rr = r.range(1.5, 7); g.strokeStyle = `rgba(200,240,230,${r.range(0.15, 0.5)})`; g.lineWidth = 1; g.beginPath(); g.arc(x, y, rr, 0, 6.28); g.stroke(); }
      for (let k = 0; k < 500; k++) { g.fillStyle = `rgba(120,140,110,${r.range(0.05, 0.25)})`; g.fillRect(r() * w, r() * h, 2, 2); }
    }),
    ice: () => T.canvas('kill:ice', 512, 512, (g, w, h) => {
      const r = U.rng(17); const gr = g.createRadialGradient(w / 2, h * 0.15, 10, w / 2, h * 0.15, w * 0.9); gr.addColorStop(0, '#6a8a9a'); gr.addColorStop(0.35, '#1a3442'); gr.addColorStop(1, '#02070a'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 40; k++) { g.strokeStyle = `rgba(200,230,255,${r.range(0.08, 0.3)})`; g.lineWidth = r.range(0.5, 2); g.beginPath(); let x = w / 2 + r.range(-120, 120), y = h * 0.15 + r.range(-40, 40); g.moveTo(x, y); for (let s = 0; s < 6; s++) { x += r.range(-50, 50); y += r.range(-10, 30); g.lineTo(x, y); } g.stroke(); }
      for (let k = 0; k < 160; k++) { g.strokeStyle = `rgba(220,240,255,${r.range(0.2, 0.6)})`; g.beginPath(); g.arc(r() * w, r() * h, r.range(1, 4), 0, 6.28); g.stroke(); }
    }),
    bronze: () => T.canvas('kill:bronze', 512, 512, (g, w, h) => {
      const gr = g.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w * 0.7); gr.addColorStop(0, '#3a2a12'); gr.addColorStop(0.6, '#1a1006'); gr.addColorStop(1, '#050301'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
      const r = U.rng(19); for (let k = 0; k < 40; k++) { g.strokeStyle = `rgba(160,120,50,${r.range(0.05, 0.2)})`; g.lineWidth = r.range(1, 3); g.beginPath(); g.arc(w / 2, h / 2, r.range(60, 260), 0, 6.28); g.stroke(); }
      for (let k = 0; k < 300; k++) { g.fillStyle = `rgba(40,110,80,${r.range(0.05, 0.25)})`; g.fillRect(r() * w, r() * h, r.range(2, 8), r.range(2, 8)); }
    }),
    faces: () => T.canvas('kill:faces', 512, 512, (g, w, h) => {
      const r = U.rng(23); g.fillStyle = '#050404'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 9; k++) {
        const x = r.range(60, w - 60), y = r.range(60, h - 60), s = r.range(50, 110);
        g.fillStyle = r.pick(['#e8e0d0', '#d8c8b0', '#f0e8e0', '#c8a888']); g.beginPath(); g.ellipse(x, y, s * 0.7, s, r.range(-0.3, 0.3), 0, 6.28); g.fill();
        g.fillStyle = '#080606'; for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(x + sx * s * 0.28, y - s * 0.15, s * 0.13, s * 0.09, 0, 0, 6.28); g.fill(); }
        g.strokeStyle = '#080606'; g.lineWidth = s * 0.06; g.beginPath(); g.arc(x, y + s * 0.2, s * 0.32, 0.25, Math.PI - 0.25); g.stroke();
        g.fillStyle = r.pick(['#a01818', '#1a3aa0', '#d8a020']); g.beginPath(); g.arc(x, y + s * 0.03, s * 0.09, 0, 6.28); g.fill();
      }
    }),
  };
  let layerRoot = null;
  const layers = {};
  function ensureLayers() {
    if (layerRoot) return;
    layerRoot = document.createElement('div');
    layerRoot.id = 'killfx';
    layerRoot.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:6;overflow:hidden';
    const view = document.getElementById('view');
    (view && view.parentNode ? view.parentNode : document.body).insertBefore(layerRoot, view ? view.nextSibling : null);
    for (const name of ['tex', 'tex2', 'tint', 'vig']) {
      const el = document.createElement('div');
      el.style.cssText = 'position:absolute;inset:-8%;opacity:0;background-size:cover;background-position:center;will-change:opacity,transform,mask-image';
      layerRoot.appendChild(el);
      layers[name] = el;
    }
  }
  const urls = {};
  const texUrl = name => urls[name] || (urls[name] = TEX[name]().image.toDataURL());
  // shape: 'full', 'edges' (closes in from the edges; amount 0..1 is how far), 'top' (comes down from the
  // top), 'bottom' (rises from below)
  function setLayer(el, name, amount, shape) {
    if (!name || amount <= 0.001) { el.style.opacity = 0; return; }
    if (el.dataset.tex !== name) { el.dataset.tex = name; el.style.backgroundImage = `url(${texUrl(name)})`; }
    el.style.opacity = U.clamp(amount, 0, 1).toFixed(3);
    let mask = 'none';
    const a = U.clamp(amount, 0, 1);
    if (shape === 'edges') { const r = (1 - a) * 75; mask = `radial-gradient(ellipse at center, transparent ${r}%, black ${r + 22}%)`; el.style.opacity = Math.min(1, a * 2.5).toFixed(3); }
    else if (shape === 'top') { const p = a * 110 - 10; mask = `linear-gradient(to bottom, black ${p}%, transparent ${p + 12}%)`; el.style.opacity = 1; }
    else if (shape === 'bottom') { const p = 100 - a * 110; mask = `linear-gradient(to bottom, transparent ${p}%, black ${p + 12}%)`; el.style.opacity = 1; }
    el.style.maskImage = mask; el.style.webkitMaskImage = mask;
  }
  function clearLayers() {
    if (!layerRoot) return;
    for (const k in layers) { const el = layers[k]; el.style.opacity = 0; el.style.background = ''; el.style.backgroundImage = ''; el.dataset.tex = ''; el.style.transform = ''; el.style.maskImage = 'none'; el.style.webkitMaskImage = 'none'; }
  }

  // ------------------------------------------------------------ the runner
  class KillRun {
    constructor(g, ent) {
      this.g = g; this.ent = ent; this.t = 0;
      const pl = g.player, cam = g.camera;
      this.eye = cam.position.clone();
      this.yaw0 = pl.yaw; this.pitch0 = pl.pitch;
      this.off = V(); this.roll = 0; this.fov = 0; this.look = null;
      this.done = new Set();
      ensureLayers(); clearLayers();
      this.layers = {};
      const kind = ent && ent.killKind ? ent.killKind() : ent ? ({ eater: 'swallow' }[ent.kind] || 'grab') : 'grab';
      this.kind = kind;
      this.prog = (PROG[kind] || PROG.grab)(this);
      if (g.audio && g.audio.killStart) g.audio.killStart(this);
    }
    // where the creature should be: forward/up/side of the eye; faceCam turns it toward the eye
    place(f, u, s, faceCam = true) {
      const e = this.ent; if (!e || !e.mesh) return;
      const yaw = this.yaw0, fx = -Math.sin(yaw), fz = -Math.cos(yaw), rx = Math.cos(yaw), rz = -Math.sin(yaw);
      e.mesh.position.set(this.eye.x + fx * f + rx * s, this.eye.y + u, this.eye.z + fz * f + rz * s);
      if (faceCam) e.mesh.rotation.y = Math.atan2(this.eye.x - e.mesh.position.x, this.eye.z - e.mesh.position.z);
      e.mesh.visible = true;
    }
    // point in front of the eye
    ahead(f, u = 0, s = 0) { const yaw = this.yaw0; return new THREE.Vector3(this.eye.x - Math.sin(yaw) * f + Math.cos(yaw) * s, this.eye.y + u, this.eye.z - Math.cos(yaw) * f - Math.sin(yaw) * s); }
    over(name, amount, shape = 'full', slot = 'tex') { setLayer(layers[slot], name, amount, shape); }
    tint(css, a) { const el = layers.tint; el.style.background = css; el.style.opacity = U.clamp(a, 0, 1).toFixed(3); }
    vig(a) { const el = layers.vig; el.style.background = 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.95) 80%)'; el.style.opacity = U.clamp(a, 0, 1).toFixed(3); }
    dark(a) { this.g.fx.blackout = Math.max(this.g.fx.blackout, U.clamp(a, 0, 1)); }
    shake(k) { this.g.player.addTrauma(k); }
    once(id, fn) { if (!this.done.has(id)) { this.done.add(id); fn(); } }
    voice(ev) { if (this.ent && this.ent.voice) this.ent.voice(ev); }
    muffle(k) { const a = this.g.audio; if (a && a.muffle) a.muffle(k); }
    update(dt) {
      const g = this.g, pl = g.player, cam = g.camera;
      this.t += dt;
      if (this.ent && this.ent.anim) this.ent.anim.attack = Math.min(1, this.t / Math.max(0.3, this.prog.dur * 0.7));
      this.prog.update(this.t, dt);
      if (this.ent && this.ent.vis && this.ent.vis.animate) this.ent.vis.animate(this.ent, dt);
      if (this.look) {
        const dx = this.look.x - this.eye.x - this.off.x, dy = this.look.y - this.eye.y - this.off.y, dz = this.look.z - this.eye.z - this.off.z;
        pl.yaw = U.angleDamp(pl.yaw, Math.atan2(-dx, -dz), 9, dt);
        pl.pitch = U.damp(pl.pitch, Math.atan2(dy, Math.hypot(dx, dz)), 9, dt);
      }
      pl.updateCamera(dt, 0);
      cam.position.copy(this.eye).add(this.off);
      cam.rotation.z += this.roll;
      const fov = PB.Settings.data.fov + this.fov;
      if (Math.abs(cam.fov - fov) > 0.05) { cam.fov = fov; cam.updateProjectionMatrix(); }
      return this.t >= this.prog.dur;
    }
    end() { clearLayers(); const a = this.g.audio; if (a && a.muffle) a.muffle(0); const cam = this.g.camera; cam.fov = PB.Settings.data.fov; cam.updateProjectionMatrix(); }
  }

  // ------------------------------------------------------------ the programs
  const PROG = {
    // fallback: it closes the distance, a grab, the dark
    grab: r => ({ dur: 2.0, update(t) { r.look = r.ent ? r.ent.mesh.position.clone().setY(r.eye.y - 0.1) : null; r.place(U.lerp(1.4, 0.6, sm(t, 0, 0.5)), -1.6, 0); r.once('a', () => { r.shake(0.5); r.voice('kill'); }); r.vig(sm(t, 0.3, 1.2)); r.dark(sm(t, 1.0, 1.9)); } }),
    // The Eater: pulled into the open mouth, the teeth come together, then nothing
    swallow: r => ({ dur: 2.4, update(t) {
      const e = r.ent; r.look = r.ahead(2, 0.0);
      r.place(U.lerp(2.2, 0.9, sm(t, 0, 0.8)), -0.4 + Math.sin(t * 9) * 0.02, 0);
      if (e && e.vis && e.vis.up) { const open = t < 1.2 ? sm(t, 0, 0.6) * 0.95 : U.lerp(0.95, 0, sm(t, 1.2, 1.5)); e.vis.up.rotation.x = -open; e.vis.lo.rotation.x = open * 0.4; }
      r.off.set(0, -sm(t, 0.6, 1.2) * 0.25, 0).add(r.ahead(sm(t, 0.5, 1.2) * 0.9).sub(r.eye));
      r.once('a', () => { r.shake(0.6); r.voice('kill'); });
      r.once('b', () => { if (t > 1.25) r.shake(0.9); });
      r.tint('radial-gradient(ellipse at center, rgba(60,10,10,0.0) 10%, rgba(40,5,5,0.9) 75%)', sm(t, 0.7, 1.3));
      r.dark(sm(t, 1.3, 1.5)); r.muffle(sm(t, 1.2, 1.6));
    } }),
    // Wallpaper Man: it falls onto you like wet paper over the face; the breathing under it stops
    wrap: r => ({ dur: 3.0, update(t) {
      r.look = r.ahead(1.5, 0.1);
      r.place(U.lerp(1.2, 0.25, sm(t, 0, 0.45)), -1.4 + sm(t, 0, 0.45) * 0.3, 0);
      r.once('a', () => { r.voice('kill'); r.shake(0.35); });
      r.over('paper', sm(t, 0.25, 0.9), 'edges');
      r.over('paper', sm(t, 0.9, 1.8) * 0.9, 'full', 'tex2');
      r.off.set(0, -sm(t, 1.4, 2.6) * 0.9, 0); r.roll = sm(t, 1.4, 2.6) * 0.5;
      r.muffle(sm(t, 0.4, 1.4)); r.dark(sm(t, 2.2, 2.9));
    } }),
    // Hummer: the lights near you burst, the hum becomes pressure, you go down
    pressure: r => ({ dur: 3.2, update(t, dt) {
      r.once('a', () => { const g = r.g; for (const f of g.world.fixtures) if (f.mesh && f.powered && Math.hypot(f.light.x - r.eye.x, f.light.z - r.eye.z) < 9) { f.light.popT = g.time + 2.2; } g.world.fixDirty = true; r.voice('kill'); });
      r.g.fx.flash = t < 0.15 ? 0.6 : 0;
      r.shake(dt * 1.2 * sm(t, 0.3, 2));
      r.fov = -sm(t, 0.3, 2.2) * 18;
      r.vig(sm(t, 0.4, 2.0));
      r.off.set(0, -sm(t, 1.8, 2.6) * 1.35, 0); r.roll = sm(t, 1.8, 2.6) * 1.2;
      r.tint('rgba(10,10,20,1)', sm(t, 0.6, 2.4) * 0.5);
      r.muffle(sm(t, 0.8, 2.2)); r.dark(sm(t, 2.5, 3.1));
    } }),
    // The Drowned: hands from below, yanked under; the surface light goes away above you
    pullUnder: r => ({ dur: 3.2, update(t) {
      r.look = r.ahead(1.5, -0.4 - sm(t, 0.3, 1.4) * 1.2);
      r.place(0.7, -1.7 + sm(t, 0, 0.3) * 0.6, 0.1);
      r.off.set(0, -sm(t, 0.3, 0.9) * 1.9, 0);
      r.roll = Math.sin(t * 3) * 0.15 * sm(t, 0.5, 1);
      r.once('a', () => { r.voice('kill'); r.shake(0.6); });
      r.over('water', sm(t, 0.55, 0.9), 'full');
      r.muffle(sm(t, 0.5, 0.8)); r.vig(sm(t, 0.8, 2.4)); r.dark(sm(t, 2.4, 3.1));
    } }),
    // The Bellman: the bell comes down over your head; one stroke, very close
    bell: r => ({ dur: 3.2, update(t) {
      r.look = r.ahead(1.2, 1.2 - sm(t, 0.2, 0.8) * 1.0);
      r.place(0.9, -0.2, 0);
      r.once('a', () => { r.voice('kill'); r.shake(0.3); });
      r.over('bronze', sm(t, 0.6, 1.0), 'top');
      r.once('b', () => { if (t > 1.0) { r.voice('toll'); r.shake(1); } });
      r.fov = -sm(t, 0.8, 1.4) * 10;
      r.muffle(sm(t, 1.1, 2.6)); r.dark(sm(t, 2.4, 3.1));
    } }),
    // Passengers: knocked down and dragged backward under the rows of seats
    underSeats: r => ({ dur: 3.4, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(0.7); });
      const fall = sm(t, 0.1, 0.5);
      r.off.set(0, -fall * 1.35, 0);
      const back = sm(t, 0.7, 3.0) * 4;
      r.off.add(r.ahead(-back).sub(r.eye));
      r.look = r.ahead(3, -1.2 + fall * 1.2);
      r.roll = fall * 0.25;
      r.place(0.5, -1.3, 0.1);
      r.vig(sm(t, 0.8, 2.6)); r.dark(sm(t, 2.6, 3.3));
    } }),
    // The Pines: lifted up into the branches
    lift: r => ({ dur: 3.2, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(0.5); });
      r.off.set(0, sm(t, 0.3, 2.4) * 5.5, 0);
      r.look = r.ahead(0.6, -2 + sm(t, 1.0, 2.5) * 6);
      r.roll = Math.sin(t * 2.2) * 0.2;
      r.place(0.5, -1.0 + sm(t, 0.3, 2.4) * 5.5, 0);
      r.tint('rgba(4,8,4,1)', sm(t, 1.2, 2.6) * 0.8); r.dark(sm(t, 2.4, 3.1));
    } }),
    // The Stag: the hit, thrown on your back, the antlers over you, dragged
    pin: r => ({ dur: 3.2, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(1); r.g.fx.damage = 1; });
      const k = sm(t, 0, 0.35);
      r.off.set(0, -k * 1.4, 0).add(r.ahead(-k * 1.6).sub(r.eye));
      r.look = r.ahead(0.5, 2.5 * k);
      r.place(U.lerp(1.0, -0.8, k), -0.6, 0);
      r.roll = k * 0.4;
      r.off.add(r.ahead(-sm(t, 1.2, 3.0) * 2.5).sub(r.eye));
      r.vig(sm(t, 0.8, 2.6)); r.dark(sm(t, 2.5, 3.1));
    } }),
    // The Usher: the red torch in your eyes; led to a seat in a car; the doors lock
    escort: r => ({ dur: 3.6, update(t) {
      r.look = r.ent ? r.ent.mesh.position.clone().setY(r.eye.y) : r.ahead(2);
      r.place(1.1, -0.1, 0);
      r.once('a', () => r.voice('kill'));
      r.tint('radial-gradient(circle at 50% 45%, rgba(255,40,30,0.95) 0%, rgba(120,0,0,0.6) 25%, rgba(0,0,0,0) 60%)', sm(t, 0.0, 0.6) * (1 - sm(t, 2.2, 2.6)));
      r.off.add(r.ahead(sm(t, 0.6, 2.2) * 0.04).sub(r.eye));
      r.once('b', () => { if (t > 2.6) r.voice('lock'); });
      r.dark(sm(t, 2.5, 2.7) * 0.9 + sm(t, 3.0, 3.5) * 0.1);
    } }),
    // Burrowers: the ground opens; you go down into the earth
    earth: r => ({ dur: 3.0, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(0.8); });
      r.off.set(0, -sm(t, 0.2, 1.4) * 1.7, 0);
      r.look = r.ahead(1, -0.5 + sm(t, 0.6, 1.6) * 2.5);
      r.over('soil', sm(t, 0.6, 1.5), 'bottom');
      r.muffle(sm(t, 0.8, 1.6)); r.dark(sm(t, 2.2, 2.9));
    } }),
    // Lamplighter: the lamp in your eyes, a hand over your mouth, silence
    lamp: r => ({ dur: 3.0, update(t) {
      r.look = r.ahead(1, 0.05);
      r.place(0.55, -0.3, 0);
      r.once('a', () => r.voice('kill'));
      r.g.fx.flash = U.clamp(sm(t, 0.0, 0.4) * (1 - sm(t, 1.6, 2.4)), 0, 1) * 0.9;
      r.tint('radial-gradient(circle at 50% 50%, rgba(255,250,230,1) 0%, rgba(255,230,180,0.7) 20%, rgba(0,0,0,0) 60%)', sm(t, 0, 0.5) * (1 - sm(t, 1.8, 2.4)));
      r.over('blanket', sm(t, 1.0, 1.6), 'bottom');
      r.muffle(sm(t, 1.0, 1.4)); r.dark(sm(t, 2.2, 2.9));
    } }),
    // Timber Crawler: something drops on you from above, then you are pulled up into the dark
    dropAbove: r => ({ dur: 3.2, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(1); });
      const knock = sm(t, 0, 0.25);
      r.off.set(0, -knock * 0.9 + sm(t, 1.0, 2.4) * 3.0, 0);
      r.look = r.ahead(0.3, -3 + knock * 1.5);
      r.place(0.2, 0.6 - knock * 0.3 + sm(t, 1.0, 2.4) * 3.0, 0);
      r.roll = knock * 0.3;
      r.vig(sm(t, 0.6, 2.2)); r.dark(sm(t, 2.4, 3.1));
    } }),
    // The Frozen: frost closes over your eyes; your breath stops clouding
    frost: r => ({ dur: 3.4, update(t) {
      r.look = r.ent ? r.ent.mesh.position.clone().setY(r.eye.y + 0.1) : r.ahead(2);
      r.place(0.8, -0.05, 0);
      r.once('a', () => r.voice('kill'));
      r.over('frost', sm(t, 0.2, 2.6), 'edges');
      r.tint('rgba(200,220,240,1)', sm(t, 1.4, 3.0) * 0.7);
      r.fov = -sm(t, 0.5, 2.5) * 6;
      r.muffle(sm(t, 1.0, 2.6)); r.dark(sm(t, 2.8, 3.3) * 0.6);
    } }),
    // The Whiteout: the snow swallows you
    snowSwallow: r => ({ dur: 3.0, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(0.4); });
      r.off.set(0, -sm(t, 0.2, 1.5) * 1.6, 0);
      r.look = r.ahead(1, -0.3 + sm(t, 0.5, 1.5));
      r.over('snow', sm(t, 0.5, 1.4), 'bottom');
      r.tint('rgba(230,236,245,1)', sm(t, 1.2, 2.6));
      r.muffle(sm(t, 0.6, 1.6));
    } }),
    // The Cook: the hook catches; dragged backward across the kitchen floor to the cold room
    hook: r => ({ dur: 3.6, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(0.9); r.g.fx.damage = 1; });
      const fall = sm(t, 0.15, 0.55);
      r.off.set(0, -fall * 1.3, 0).add(r.ahead(-sm(t, 0.5, 3.0) * 5).sub(r.eye));
      r.look = r.ahead(4, -1.0 + fall * 0.4);
      r.roll = fall * 0.2 + Math.sin(t * 7) * 0.03 * fall;
      r.place(-1.0 - sm(t, 0.5, 3.0) * 5, -0.0, 0, false);
      r.once('b', () => { if (t > 3.0) r.voice('slam'); });
      r.tint('rgba(200,230,255,1)', sm(t, 2.6, 3.0) * 0.3);
      r.dark(sm(t, 3.0, 3.1));
    } }),
    // The Silted: pulled down into the mud
    mud: r => ({ dur: 3.0, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(0.6); });
      r.off.set(0, -sm(t, 0.2, 1.6) * 1.65, 0);
      r.look = r.ahead(1, -0.8 + sm(t, 0.4, 1.4) * 1.6);
      r.place(0.6, -1.5 + sm(t, 0, 0.3) * 0.5, 0.0);
      r.over('mud', sm(t, 0.7, 1.5), 'bottom');
      r.muffle(sm(t, 0.9, 1.6)); r.dark(sm(t, 2.2, 2.9));
    } }),
    // Long One: coiled and dragged sideways into the channel, under
    coil: r => ({ dur: 3.4, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(0.8); });
      r.roll = sm(t, 0.1, 1.2) * 1.6 + Math.sin(t * 5) * 0.1;
      r.off.set(0, -sm(t, 0.3, 1.0) * 1.4, 0).add(r.ahead(0, 0, sm(t, 0.2, 1.8) * 3).sub(r.eye));
      r.look = r.ahead(2, -0.6, 2);
      r.over('water', sm(t, 1.4, 1.8), 'full');
      r.muffle(sm(t, 1.3, 1.7)); r.vig(sm(t, 1.6, 2.8)); r.dark(sm(t, 2.6, 3.3));
    } }),
    // The Choir: taken into the pews; the faces turn to you; the singing stops
    pews: r => ({ dur: 3.6, update(t) {
      r.once('a', () => r.voice('kill'));
      r.off.set(0, -sm(t, 0.3, 1.0) * 0.55, 0).add(r.ahead(-sm(t, 0.3, 1.0) * 0.6).sub(r.eye));
      r.look = r.ahead(3, -0.2);
      r.over('faces', sm(t, 1.4, 2.4) * 0.65, 'edges');
      r.once('b', () => { if (t > 2.2) r.muffle(1); });
      r.dark(sm(t, 2.8, 3.5));
    } }),
    // The Conductor: put off the train; thrown out into the snow, the lit windows going by
    offTrain: r => ({ dur: 3.6, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(0.7); });
      const out = sm(t, 0.3, 1.0);
      r.off.set(0, -out * 1.5, 0).add(r.ahead(0, 0, -out * 3.5).sub(r.eye));
      r.roll = out * 0.8;
      r.look = r.ahead(2, 0.5, out * 3);
      r.over('snow', sm(t, 1.0, 1.4) * 0.7, 'bottom');
      r.tint('rgba(10,14,24,1)', sm(t, 1.4, 3.2) * 0.85);
      r.muffle(sm(t, 1.0, 1.6) * 0.6); r.dark(sm(t, 3.0, 3.6));
    } }),
    // Sleepers: pulled into a bunk under a blanket
    bunk: r => ({ dur: 3.0, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(0.5); });
      r.off.set(0, -sm(t, 0.2, 0.7) * 0.7, 0).add(r.ahead(0, 0, sm(t, 0.2, 0.8) * 0.8).sub(r.eye));
      r.roll = sm(t, 0.2, 0.8) * 1.4;
      r.over('blanket', sm(t, 0.6, 1.3), 'edges');
      r.muffle(sm(t, 0.8, 1.4)); r.dark(sm(t, 2.0, 2.8));
    } }),
    // Underhands: dragged down between the cars; the sleepers rush past below
    gap: r => ({ dur: 2.8, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(1); });
      r.off.set(0, -sm(t, 0.1, 0.6) * 2.2, 0);
      r.look = r.ahead(0.4, -2.5);
      r.shake(0.05);
      r.tint('repeating-linear-gradient(to bottom, rgba(20,16,12,0.9) 0px, rgba(20,16,12,0.9) 20px, rgba(60,55,50,0.8) 20px, rgba(60,55,50,0.8) 40px)', sm(t, 0.4, 0.9));
      r.dark(sm(t, 1.8, 2.6));
    } }),
    // Masks: they press in from every side
    masks: r => ({ dur: 3.0, update(t) {
      r.once('a', () => r.voice('kill'));
      r.over('faces', sm(t, 0.0, 1.8), 'edges');
      r.fov = -sm(t, 0.2, 2.0) * 14;
      r.shake(0.02);
      r.dark(sm(t, 2.2, 2.9));
    } }),
    // Carousel horses: trampled
    trample: r => ({ dur: 2.8, update(t, dt) {
      r.once('a', () => { r.voice('kill'); r.shake(1); r.g.fx.damage = 1; });
      const k = sm(t, 0, 0.3);
      r.off.set(0, -k * 1.4, 0); r.roll = k * 0.5;
      r.look = r.ahead(1, -0.5 + k * 2.5);
      r.place(0.3, -0.8 + Math.abs(Math.sin(t * 9)) * 0.3, 0);
      if (Math.sin(t * 9) > 0.95) r.shake(dt * 8);
      r.vig(sm(t, 0.6, 2.2)); r.dark(sm(t, 2.0, 2.7));
    } }),
    // Laughing Lotte: lifted up to the laughing mouth
    lotte: r => ({ dur: 3.4, update(t) {
      r.once('a', () => r.voice('kill'));
      r.off.set(0, sm(t, 0.3, 1.8) * 2.4, 0).add(r.ahead(sm(t, 0.3, 1.8) * 0.4).sub(r.eye));
      r.look = r.ahead(2, 2.6);
      r.place(1.4, -1.6, 0);
      r.roll = Math.sin(t * 1.7) * 0.12;
      r.tint('radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.95) 70%)', sm(t, 1.4, 2.8));
      r.dark(sm(t, 2.8, 3.4));
    } }),
    // The Hush: the scarf; green wool across your eyes; no sound at all
    scarf: r => ({ dur: 3.6, update(t) {
      r.look = r.ent ? r.ent.mesh.position.clone().setY(r.eye.y + 0.05) : r.ahead(2);
      r.place(U.lerp(1.0, 0.5, sm(t, 0, 1)), -0.15, 0);
      r.once('a', () => r.voice('kill'));
      r.muffle(sm(t, 0.0, 1.0));
      r.over('wool', sm(t, 0.8, 2.2), 'edges');
      r.over('wool', sm(t, 2.0, 2.9), 'full', 'tex2');
      r.dark(sm(t, 3.0, 3.6) * 0.7);
    } }),
    // Under-ice: the ice breaks and you go through; the hole recedes above you
    iceBreak: r => ({ dur: 3.6, update(t) {
      r.once('a', () => { r.voice('kill'); r.shake(1); });
      r.off.set(0, -sm(t, 0.2, 0.6) * 2.0 - sm(t, 0.6, 3.2) * 2.5, 0);
      r.look = r.ahead(0.2, 3);
      r.over('ice', sm(t, 0.45, 0.8), 'full');
      r.muffle(sm(t, 0.4, 0.7)); r.dark(sm(t, 2.8, 3.6));
    } }),
  };

  PB.Kills = {
    PROG, TEX,
    start: (g, ent) => new KillRun(g, ent),
    clear: clearLayers,
  };
})(typeof window !== 'undefined' ? window : globalThis);
