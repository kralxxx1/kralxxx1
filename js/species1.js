/* Species of Depot 9 and the Underneath.
   - The Sorter (Depot 9): a very tall, stooped figure in a storekeeper's grey coat, sorting boxes in the
     dark at the far end of the archive. Never hostile. Gone when the light reaches it.
   - Wallpaper Men (the Underneath): flat men made of the wallpaper itself, torn at the edges, a face
     that is three holes. They lie in the walls as a figure-shaped bulge and peel off when your back is
     turned; they only move while nobody looks at them.
   - Hummers (the Underneath): nothing to see. Where one stands, the lights falter and the hum of the
     place gets deeper; they hear, they do not see. Your torch shows a slow swirl of dust standing up.
   Shared helpers for all species files are exported as PB.SpeciesKit. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U, T = PB.Tex, MO = PB.Monsters;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ kit shared by species*.js
  const aoColor = (fn, base, k = 1, tint = [0.5, 0.35, 0.3]) => (p, n) => {
    let occ = 0;
    for (const s of [0.015, 0.035, 0.07]) { const q = [p[0] + n[0] * s, p[1] + n[1] * s, p[2] + n[2] * s]; occ += Math.max(0, s - fn(q)) / s; }
    const a = Math.max(0.25, 1 - occ / 3 * 1.4 * k);
    return [base[0] * (a + (1 - a) * tint[0] * 0.3), base[1] * (a + (1 - a) * tint[1] * 0.3), base[2] * (a + (1 - a) * tint[2] * 0.3)];
  };
  const mat = (o) => new THREE[o.physical ? 'MeshPhysicalMaterial' : 'MeshStandardMaterial'](Object.assign({ roughness: 0.6, metalness: 0, vertexColors: true }, o.params || {}));
  function skin(key, o, extra = {}) {
    const m = mat({ physical: extra.physical, params: Object.assign({ map: MO.skinTex(key, o), bumpMap: MO.bumpTex(key, extra.bump || { wrinkles: 40 }), bumpScale: extra.bumpScale || 1.4, roughness: extra.rough != null ? extra.rough : 0.55 }, extra.params || {}) });
    m.map.repeat.set(extra.rep || 3, extra.rep || 3); m.bumpMap.repeat.set(extra.bumpRep || 6, extra.bumpRep || 6);
    return m;
  }
  // cloth from a canvas painter
  function cloth(key, base, opts = {}) {
    const tex = T.canvas('cloth:' + key, 512, 512, (g, w, h) => {
      const r = U.rng(U.hashStr(key));
      g.fillStyle = base; g.fillRect(0, 0, w, h);
      for (let x = 0; x < w; x += 2) { g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},${r.range(0.015, 0.05)})`; g.fillRect(x, 0, 1, h); }
      for (let y = 0; y < h; y += 2) { g.fillStyle = `rgba(0,0,0,${r.range(0.01, 0.04)})`; g.fillRect(0, y, w, 1); }
      for (let k = 0; k < (opts.stains || 40); k++) { const x = r() * w, y = r() * h, rr = r.range(10, 60); const gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, `rgba(${opts.stain || '30,24,16'},${r.range(0.15, 0.4)})`); gr.addColorStop(1, `rgba(${opts.stain || '30,24,16'},0)`); g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
      if (opts.paint) opts.paint(g, w, h, r);
    }, { repeat: true });
    const m = mat({ params: { map: tex, bumpMap: MO.bumpTex('cl:' + key, { n: 5000, size: 1, a: 0.25 }), bumpScale: 1, roughness: opts.rough != null ? opts.rough : 0.95, side: opts.double ? THREE.DoubleSide : THREE.FrontSide } });
    tex.repeat.set(opts.rep || 3, opts.rep || 3); m.bumpMap.repeat.set(10, 10);
    return m;
  }
  const meshOf = (key, fn, bounds, cell, material, opts = {}) => {
    const geo = S.mesh(key, fn, bounds, cell, Object.assign({ color: opts.color || aoColor(fn, [1, 1, 1], opts.ao || 1.1), smooth: 2 }, opts.mesh || {}));
    const m = new THREE.Mesh(geo, material); m.castShadow = opts.shadow !== false; m.receiveShadow = true;
    return m;
  };
  // A limb that swings from a pivot
  const pivot = (parent, x, y, z) => { const p = new THREE.Group(); p.position.set(x, y, z); parent.add(p); return p; };
  // Mirror a mesh's geometry in x (and fix the winding)
  const mirrorX = geo => {
    const g = geo.clone(); const pos = g.attributes.position, n = g.attributes.normal;
    for (let i = 0; i < pos.count; i++) { pos.setX(i, -pos.getX(i)); n.setX(i, -n.getX(i)); }
    const idx = g.index.array; for (let i = 0; i < idx.length; i += 3) { const t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    return g;
  };
  // Walk cycle helpers for legs/arms under pivots: phase w, amplitude a
  const swing = (w, a, off = 0) => Math.sin(w + off) * a;
  PB.SpeciesKit = { aoColor, mat, skin, cloth, meshOf, pivot, mirrorX, swing };
  const Sp = PB.Species;

  // ============================================================ THE SORTER
  function sorterBody(p) {
    const y = p[1], ax = Math.abs(p[0]);
    // long storekeeper's coat, hanging straight from stooped shoulders to the shins
    const t = U.clamp((2.25 - y) / 1.9, 0, 1);
    const ang = Math.atan2(p[2], p[0]);
    const folds = (Math.sin(ang * 7 + t * 3) * 0.012 + Math.sin(ang * 13) * 0.004) * t;
    let coat = Math.hypot(p[0], (p[2] - t * 0.04) * 1.35) - (0.17 + t * 0.09 + folds);
    coat = S.smax(coat, 0.42 - y, 0.03);
    coat = S.smax(coat, y - 2.3, 0.08);
    coat = S.smin(coat, S.ellipsoid(p, [0, 2.22, 0.06], [0.26, 0.12, 0.16]), 0.08);   // hunched shoulders
    let d = coat;
    // shins and long flat shoes
    d = S.smin(d, S.capsule([ax, y, p[2]], [0.08, 0.45, 0], [0.085, 0.06, 0.01], 0.04, 0.035), 0.03);
    d = S.smin(d, S.ellipsoid([ax, y, p[2]], [0.085, 0.035, 0.07], [0.05, 0.035, 0.15]), 0.03);
    // the neck bent far forward
    d = S.smin(d, S.capsule(p, [0, 2.25, 0.08], [0, 2.38, 0.26], 0.05, 0.04), 0.05);
    return d;
  }
  function sorterHead(p) {
    // small, bald, bowed; the face turned down and away
    let d = S.ellipsoid(p, [0, 0.09, 0.03], [0.085, 0.11, 0.1]);
    d = S.smin(d, S.ellipsoid(p, [0, 0.0, 0.08], [0.05, 0.05, 0.05]), 0.04);
    for (const sx of [-1, 1]) d = S.smax(d, -S.sphere(p, [sx * 0.033, 0.07, 0.115], 0.022), 0.008);
    d += S.fbm(p[0] * 30, p[1] * 30, p[2] * 30, 2) * 0.003;
    return d;
  }
  function sorterArm(p) {
    // sleeve from the shoulder to the elbow, forearm, a hand with long fingers (origin: shoulder, hangs -y)
    let d = S.capsule(p, [0, 0, 0], [0.02, -0.55, 0.06], 0.065, 0.06);
    d = S.smin(d, S.capsule(p, [0.02, -0.55, 0.06], [0.0, -0.98, 0.2], 0.05, 0.035), 0.04);
    d = S.smin(d, S.ellipsoid(p, [0, -1.04, 0.24], [0.02, 0.06, 0.04]), 0.02);
    for (let f = 0; f < 4; f++) d = S.smin(d, S.capsule(p, [0, -1.08, 0.22 + f * 0.016], [0.006, -1.24, 0.24 + f * 0.018], 0.008, 0.005), 0.008);
    return d;
  }
  function sorterModel() {
    const coatM = cloth('sorterCoat', '#4e4c44', { stains: 60, rep: 2 });
    const skinM = skin('sorter', { base: '#9a9286', mottle: ['120,110,100', '160,150,140', '90,85,80'], veins: '80,60,70', veinCount: 8 }, { rough: 0.6 });
    const g = new THREE.Group();
    const body = meshOf('sorter:body', sorterBody, [[-0.36, -0.02, -0.3], [0.36, 2.45, 0.42]], 0.016, coatM);
    g.add(body);
    const head = meshOf('sorter:head', sorterHead, [[-0.11, -0.06, -0.09], [0.11, 0.22, 0.17]], 0.007, skinM);
    head.position.set(0, 2.36, 0.25); head.rotation.x = 0.9; g.add(head);
    // a mail sack drawn down over the head and tied at the neck: whatever it has for a face, nobody sees it
    const sackM = new THREE.MeshStandardMaterial({ color: 0x6b5f46, roughness: 1 });
    const sack = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), sackM); sack.scale.set(0.112, 0.138, 0.124); sack.position.set(0, 0.095, 0.035); sack.castShadow = true; head.add(sack);
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.125, 0.07, 16, 1, true), sackM); skirt.material.side = THREE.DoubleSide; skirt.position.set(0, -0.045, 0.04); head.add(skirt);
    const rope = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.008, 6, 16), new THREE.MeshStandardMaterial({ color: 0x3a3226, roughness: 1 })); rope.rotation.x = Math.PI / 2; rope.position.set(0, -0.012, 0.04); head.add(rope);
    const arms = [];
    const ag = S.mesh('sorter:arm', sorterArm, [[-0.1, -1.3, -0.1], [0.1, 0.08, 0.32]], 0.012, { color: aoColor(sorterArm, [1, 1, 1]), smooth: 2 });
    for (const sx of [-1, 1]) {
      const pv = pivot(g, sx * 0.25, 2.2, 0.08);
      const m = new THREE.Mesh(sx < 0 ? mirrorX(ag) : ag, coatM); m.castShadow = true; pv.add(m);
      arms.push(pv);
    }
    // the box it carries
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.32), new THREE.MeshStandardMaterial({ color: 0x7d6f58, roughness: 0.95 }));
    box.position.set(0, 1.2, 0.48); box.castShadow = true; g.add(box);
    return {
      group: g, head, arms, box,
      animate(cr, dt) {
        const t = cr.anim.t, k = Math.sin(t * 0.6);
        // slowly lifting the box to a shelf and lowering it again
        arms[0].rotation.x = -0.7 - k * 0.35; arms[1].rotation.x = -0.7 - k * 0.35;
        box.position.y = 1.2 + (k + 1) * 0.3; box.position.z = 0.48 + (k + 1) * 0.1;
        head.rotation.y = Math.sin(t * 0.23) * 0.3;
      },
    };
  }
  Sp.add({
    kind: 'sorter', model: sorterModel, hostile: false, radius: 0, catchR: 0, traits: ['blind', 'deaf'], ghostly: true,
    senses: { sight: 0, hearing: 0 }, speeds: { patrol: 0, investigate: 0, chase: 0 },
    // it stands at its lair sorting; light or nearness and it is simply not there any more
    preUpdate(cr, g, dt) {
      if (cr.state === 'dormant') { cr.mesh.visible = false; return false; }
      if (cr.state === 'gone') { cr.mesh.visible = false; cr.goneT -= dt; if (cr.goneT <= 0 && cr.lairs().length) { cr.bury(); cr.setState('sorting'); } return false; }
      cr.mesh.visible = true;
      if (cr.state !== 'sorting') cr.setState('sorting');
      const d = cr.distToPlayer();
      if (cr.torchOnMe(30) || d < 7 || g.world.lightAt(cr.pos.x, cr.pos.z) > 0.5) {
        if (cr.losToPlayer()) { g.fearAdd(8); if (g.script.onSorter) g.script.onSorter(g, cr); }
        cr.setState('gone'); cr.goneT = 25 + Math.random() * 30;
        return false;
      }
      cr.faceToward(cr.pos.x + Math.sin(cr.heading) * 2, cr.pos.z + Math.cos(cr.heading) * 2, dt, 1);
      return false;
    },
  });

  // ============================================================ WALLPAPER MEN
  function paperSil(p) {
    // the 2D outline of a man (x, y), torn at the edges
    const x = p[0], y = p[1], q = [x, y, 0], ax = [Math.abs(x), y, 0];
    let d = S.ellipsoid(q, [0, 1.84, 0], [0.105, 0.15, 1]);
    d = S.smin(d, S.capsule(q, [0, 1.7, 0], [0, 1.6, 0], 0.045), 0.04);
    d = S.smin(d, S.capsule(ax, [0.0, 1.57, 0], [0.24, 1.55, 0], 0.07, 0.06), 0.05);
    d = S.smin(d, S.capsule(q, [0, 1.55, 0], [0, 1.0, 0], 0.17, 0.12), 0.06);
    d = S.smin(d, S.capsule(ax, [0.07, 0.98, 0], [0.1, 0.5, 0], 0.07, 0.055), 0.04);
    d = S.smin(d, S.capsule(ax, [0.1, 0.5, 0], [0.11, 0.04, 0], 0.055, 0.045), 0.03);
    // torn edge: high-frequency bites out of the outline
    d += S.fbm(x * 22 + 3, y * 22, 1.7, 3) * 0.035 + Math.max(0, S.noise(x * 40, y * 40, 2.2) - 0.65) * 0.05;
    return d;
  }
  function paperBody(p) {
    // the outline extruded as a sheet of wet paper, bent and crumpled
    const bend = S.fbm(p[0] * 3, p[1] * 2.2, 0.5, 3) * 0.11 + S.fbm(p[0] * 9, p[1] * 7, 2.5, 2) * 0.025 + Math.sin(p[1] * 3.2) * 0.02;
    let d = S.smax(paperSil(p), Math.abs(p[2] - bend) - 0.014, 0.008);
    // no face: the sheet's head is blank wet paper, the pattern running straight over it
    return d;
  }
  function paperArm(p) {
    // origin: shoulder; a long flat arm to below the knee, the hand a fan of torn strips
    const bend = S.fbm(p[0] * 4, p[1] * 3, 1.3, 2) * 0.04;
    const q = [p[0], p[1], 0];
    let d = S.capsule(q, [0, 0, 0], [0.01, -0.62, 0], 0.05, 0.04);
    d = S.smin(d, S.capsule(q, [0.01, -0.62, 0], [0.0, -1.12, 0], 0.04, 0.03), 0.02);
    for (let f = 0; f < 4; f++) d = S.smin(d, S.capsule(q, [0, -1.12, 0], [-0.045 + f * 0.03, -1.36 - (f === 1 || f === 2 ? 0.04 : 0), 0], 0.012, 0.005), 0.01);
    d += S.fbm(p[0] * 30, p[1] * 30, 4.1, 2) * 0.012;
    return S.smax(d, Math.abs(p[2] - bend) - 0.012, 0.006);
  }
  function wallpaperModel(game) {
    const set = T.get('wallpaper', PB.Settings.data.textureRes);
    const map = set.map.clone(); map.needsUpdate = true; map.repeat.set(1 / 2.12, 1 / 2.12);
    const nrm = set.normalMap.clone(); nrm.needsUpdate = true; nrm.repeat.copy(map.repeat);
    const m = new THREE.MeshStandardMaterial({ map, normalMap: nrm, roughness: 0.92, vertexColors: true, side: THREE.DoubleSide, color: 0x8a7c5e });
    const g = new THREE.Group();
    const inner = new THREE.Group(); g.add(inner);
    // damp grime along the torn edges darkens the colour there
    const edgeCol = (pp, n) => { const e = U.clamp(1 + paperSil(pp) * 14, 0, 1); const a = aoColor(paperBody, [1, 1, 1], 0.8)(pp, n); return [a[0] * (1 - e * 0.55), a[1] * (1 - e * 0.6), a[2] * (1 - e * 0.65)]; };
    const body = meshOf('paper:body', paperBody, [[-0.36, -0.02, -0.1], [0.36, 2.04, 0.1]], 0.01, m, { color: edgeCol });
    inner.add(body);
    const ag = S.mesh('paper:arm', paperArm, [[-0.12, -1.45, -0.08], [0.12, 0.08, 0.08]], 0.009, { color: aoColor(paperArm, [1, 1, 1], 0.6), smooth: 1 });
    const arms = [];
    for (const sx of [-1, 1]) { const pv = pivot(inner, sx * 0.27, 1.55, 0); const am = new THREE.Mesh(sx < 0 ? mirrorX(ag) : ag, m); am.castShadow = true; pv.add(am); arms.push(pv); }
    const pose = { a0: 0, a1: 0, h: 0, lean: 0 };
    const target = { a0: 0, a1: 0, h: 0, lean: 0 };
    let wasFrozen = 0;
    return {
      group: g, mats: [m], arms,
      animate(cr, dt) {
        const an = cr.anim, buried = cr.state === 'buried';
        // in the wall: pressed flat, a figure-shaped bulge in the paper; peeling off when it emerges
        const e = buried ? 0 : cr.state === 'emerge' ? an.emerge : 1;
        inner.scale.z = U.lerp(0.12, 1, e);
        inner.position.z = U.lerp(-0.62, 0, e);
        inner.rotation.x = Math.sin(e * PI) * -0.35;
        // a new pose every time it stops: reaching, head cocked, leaning in
        if (an.frozen > 0.5 && wasFrozen < 0.5) {
          target.a0 = -U.lerp(0.2, 1.9, Math.random()); target.a1 = -U.lerp(0.2, 1.9, Math.random());
          target.h = (Math.random() - 0.5) * 0.9; target.lean = Math.random() * 0.25;
        }
        wasFrozen = an.frozen;
        const k = an.frozen > 0.5 ? 40 : 6;
        if (!buried && cr.state !== 'emerge' && an.frozen < 0.5) { target.a0 = -1.2 - Math.sin(an.t * 7) * 0.2; target.a1 = -1.1 - Math.cos(an.t * 6) * 0.2; target.lean = 0.2; target.h = Math.sin(an.t * 3) * 0.2; }
        if (buried) { target.a0 = 0; target.a1 = 0; target.h = 0; target.lean = 0; }
        for (const key in pose) pose[key] = U.damp(pose[key], target[key], k, dt);
        arms[0].rotation.x = pose.a0; arms[1].rotation.x = pose.a1;
        arms[0].rotation.z = -0.15; arms[1].rotation.z = 0.15;
        body.rotation.z = pose.h * 0.15;
        inner.rotation.x += pose.lean;
        // it flutters when it moves
        if (an.speed > 0.2) { body.rotation.y = Math.sin(an.t * 31) * 0.05; }
      },
    };
  }
  Sp.add({
    kind: 'wallpaperMan', model: wallpaperModel, radius: 0.25, catchR: 0.95, height: 2,
    traits: ['freezeWhenSeen', 'sight'], ambush: 'wall', ambushR: 4.5, visibleBuried: true, wakeOnSound: false,
    senses: { sight: 16, fov: 2.4, hearing: 0.6 }, speeds: { patrol: 1.6, investigate: 2.6, chase: 5.2 }, lose: 9, notice: 1.4, hunt: true,
    kill: 'wrap', stepRate: 0.9, stepHear: 7, voice: 'paper',
    // lair spots are walls: generated along wall faces when the map does not list them
    autoLairs: 'wall',
  });

  // ============================================================ HUMMERS
  function hummerModel() {
    // dust standing up in the shape of something tall, only seen in the beam
    const n = 900, pos = new Float32Array(n * 3), seed = new Float32Array(n);
    const r = U.rng(77);
    for (let k = 0; k < n; k++) {
      const y = r() * 2.3, rad = (y > 1.9 ? 0.12 : y > 1.55 ? 0.22 : 0.18) * Math.sqrt(r());
      const a = r() * PI * 2;
      pos[k * 3] = Math.cos(a) * rad * (y > 1.4 && y < 1.6 ? 1.8 : 1); pos[k * 3 + 1] = y; pos[k * 3 + 2] = Math.sin(a) * rad * 0.7; seed[k] = r();
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const uni = { uTime: { value: 0 }, uLit: { value: 0 }, uTex: { value: T.softDot() } };
    const m = new THREE.ShaderMaterial({
      uniforms: uni, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `attribute float aSeed; uniform float uTime; uniform float uLit; varying float vA;
        void main(){ vec3 p = position; float a = uTime * (0.4 + aSeed * 0.6) + aSeed * 30.0; p.x += sin(a) * 0.05; p.z += cos(a * 1.3) * 0.05; p.y += sin(uTime * 0.5 + aSeed * 12.0) * 0.06;
          vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = (2.0 + aSeed * 3.0) * 6.0 / -mv.z * projectionMatrix[1][1];
          vA = uLit * (0.4 + 0.6 * sin(uTime * 2.0 + aSeed * 40.0) * 0.5 + 0.3); }`,
      fragmentShader: `uniform sampler2D uTex; varying float vA; void main(){ vec4 t = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(vec3(0.95, 0.9, 0.8), t.a * vA * 0.5); }`,
    });
    const pts = new THREE.Points(geo, m); pts.frustumCulled = false;
    const g = new THREE.Group(); g.add(pts);
    return {
      group: g, mats: [],
      animate(cr, dt) {
        uni.uTime.value = cr.anim.t;
        uni.uLit.value = U.damp(uni.uLit.value, cr.torchOnMe(14) ? 1 : 0.06, 4, dt);
        // the lights near it falter; the place's hum drops and swells around it
        const w = cr.g.world; if (w) { (w.disturb || (w.disturb = new Map())).set(cr.id, { x: cr.pos.x, z: cr.pos.z, w: cr.state === 'chase' ? 1 : 0.7, r: 9 }); }
      },
    };
  }
  Sp.add({
    kind: 'hummer', model: hummerModel, radius: 0.3, catchR: 1.1, ghostly: false, selfLit: false,
    traits: ['blind', 'hearing', 'invisible'], senses: { sight: 0, hearing: 1.7 }, speeds: { patrol: 0.9, investigate: 2.3, chase: 3.4 }, lose: 6, searchTime: 16,
    kill: 'pressure', stepRate: 99, voice: 'hum',
  });
})(typeof window !== 'undefined' ? window : globalThis);
