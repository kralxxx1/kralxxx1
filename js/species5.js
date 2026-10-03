/* The creatures of the Weisshorn (Chapter 5).
   - The Frozen: guests in 1983 ski suits, white with frost, sitting where the cold found them. They only
     move while you are warm: stand at the fire, or by the kitchen range, and they get up.
   - The Whiteout: out in the storm, something walking. You do not see it; you see footprints appear in
     the snow, one after another, coming toward you. Up close the snow takes a shape for a moment.
     It hunts by sound.
   - The Cook: a big man in kitchen whites gone stiff with frost, a meat hook in his hand. He keeps to the
     kitchen, the service corridor and the cold room, and he hears everything.
   Deaths (kills.js): frost (the Frozen), snowSwallow (the Whiteout), hook (the Cook). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U;
  const K = PB.SpeciesKit, Sp = PB.Species;
  const PI = Math.PI, H = PI / 2;
  const outdoors = (cr, x, y) => !!(cr.L.meta.outdoor && cr.L.meta.outdoor[cr.L.i(x, y)]);

  // ============================================================ THE FROZEN
  const SUITS = [['#a8141a', [1, 1, 1]], ['#1a7a8a', [1, 1, 1]], ['#5a2a8a', [1, 1, 1]], ['#d8a818', [1, 1, 1]], ['#1a3a9a', [1, 1, 1]], ['#e8e4dc', [0.9, 0.95, 1]]];
  let fIdx = 0;
  function frozenModel() {
    const [base] = SUITS[fIdx++ % SUITS.length];
    const r = K.humanoid({
      key: 'frozen' + (fIdx % SUITS.length), h: 1.7 + (fIdx % 3) * 0.06, build: 1.0 + (fIdx % 2) * 0.12, coat: 0.0,
      clothBase: base, skin: { base: '#c8d4dc', mottle: ['200,214,224', '170,184,198', '230,236,240', '150,160,180'], mottleA: 0.5, veins: '110,130,170', veinCount: 20, spots: 40, spotColor: '220,230,240' },
      head: { eyes: 'hollow', mouth: 0.25, hair: true, hairLong: 2 }, skinVC: [0.95, 0.98, 1.05],
      // frost creeping over the suit from the edges
      clothVC: p => { const f = U.clamp(S.fbm(p[0] * 9, p[1] * 9, p[2] * 9, 2) * 2.2 + (p[1] > 0.4 ? 0.35 : 0), 0, 1); return [1 + f * 1.4, 1 + f * 1.5, 1 + f * 1.7]; },
    });
    for (const m of r.mats) { m.roughness = 0.35; }
    // icicles hanging from the chin and the brim of the hair, a scarf frozen stiff
    const ice = new THREE.MeshPhysicalMaterial({ color: 0xdfeaf2, roughness: 0.05, transmission: 0, clearcoat: 1, transparent: true, opacity: 0.85 });
    for (let k = 0; k < 6; k++) { const ic = new THREE.Mesh(new THREE.ConeGeometry(0.008, 0.05 + (k % 3) * 0.025, 5), ice); ic.rotation.x = PI; ic.position.set(-0.05 + k * 0.02, 0.0 - (k % 3) * 0.01, 0.07); r.head.add(ic); }
    const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.03, 8, 16), new THREE.MeshStandardMaterial({ color: new THREE.Color(base).multiplyScalar(0.6), roughness: 0.9 })); scarf.rotation.x = H; scarf.position.set(0, 0.68 * (r.s || 1), 0.01); r.hips.add(scarf);
    return {
      group: r.group, rig: r, mats: r.mats,
      animate(cr, dt) {
        const an = cr.anim;
        r.stand();
        // they sit where they froze until the first time they move
        if (!cr.woke && an.speed > 0.2) cr.woke = true;
        if (!cr.woke) { r.sit(1, 0.46); r.neck.rotation.x = 0.55 + Math.sin(an.t * 0.2) * 0.01; return; }
        const stiff = 1 - an.frozen;
        r.walk(an.walk, U.clamp(an.speed / 2, 0, 1) * stiff, 0);
        r.reach(cr.state === 'chase' ? 0.7 * stiff + (an.attack || 0) * 0.3 : 0.15);
        r.neck.rotation.x = 0.3; r.neck.rotation.z = Math.sin(an.walk * 0.5) * 0.12 * stiff;
      },
    };
  }
  Sp.add({
    kind: 'frozen', model: frozenModel, radius: 0.3, catchR: 1.05, height: 1.75,
    traits: ['warmthWake', 'sight', 'hearing'], senses: { sight: 12, fov: 2.2, hearing: 1.0 },
    speeds: { patrol: 0.6, investigate: 1.3, chase: 2.7 }, lose: 9, searchTime: 14, gait: 1.2,
    allowCell: (cr, x, y) => !outdoors(cr, x, y), kill: 'frost', stepRate: 1.7, stepHear: 10, voice: 'frozen',
  });

  // ============================================================ THE WHITEOUT
  const SW_VS = `attribute vec4 aSeed; uniform float uTime, uSpeed; varying float vA;
    void main(){
      float t = uTime * (0.6 + aSeed.w * 0.8) + aSeed.z * 6.28;
      float h = aSeed.y * 2.5;
      // a tall, stooped figure of snow: wider at the shoulders, arms hanging
      float w = 0.18 + 0.2 * smoothstep(0.6, 1.9, h) * (1.0 - smoothstep(2.0, 2.4, h)) + (h < 0.9 ? 0.08 : 0.0);
      vec3 p = vec3(cos(t + aSeed.x * 6.28) * w, h + sin(t * 1.7) * 0.05, sin(t + aSeed.x * 6.28) * w * 0.6);
      p.x += sin(uTime * 3.0 + h) * 0.04 * uSpeed;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      float d = length(mv.xyz);
      vA = (1.0 - smoothstep(3.5, 9.0, d)) * (0.35 + aSeed.w * 0.4);
      gl_PointSize = (6.0 + aSeed.w * 10.0) * (6.0 / max(d, 0.5));
      gl_Position = projectionMatrix * mv;
    }`;
  const SW_FS = `varying float vA; void main(){ vec2 c = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(c)) * vA; gl_FragColor = vec4(vec3(0.85, 0.88, 0.94) * a, a); }`;
  function whiteoutModel(game) {
    const n = 900, geo = new THREE.BufferGeometry(), seed = new Float32Array(n * 4), r = U.rng(19);
    for (let i = 0; i < n * 4; i++) seed[i] = r();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
    const u = { uTime: { value: 0 }, uSpeed: { value: 0 } };
    const pts = new THREE.Points(geo, new THREE.ShaderMaterial({ vertexShader: SW_VS, fragmentShader: SW_FS, uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    pts.frustumCulled = false; pts.userData.noPrepass = true;
    const g = new THREE.Group(); g.add(pts);
    // footprints: a pool of dark impressions laid behind it in the snow, fading
    const fpMat = new THREE.MeshBasicMaterial({ color: 0x3a4250, transparent: true, opacity: 0.55, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
    const fpGeo = new THREE.CircleGeometry(0.13, 10); fpGeo.scale(0.75, 1.6, 1); fpGeo.rotateX(-H);
    const prints = [];
    for (let k = 0; k < 28; k++) { const m = new THREE.Mesh(fpGeo, fpMat.clone()); m.visible = false; m.renderOrder = 2; game.scene.add(m); prints.push({ m, t: 0 }); }
    let pk = 0, side = 1;
    return {
      group: g, mats: [],
      lastPrint: null,
      animate(cr, dt) {
        const an = cr.anim;
        u.uTime.value = an.t; u.uSpeed.value = U.clamp(an.speed / 3, 0, 1);
        // a print every stride, left and right
        const lp = this.lastPrint;
        if (!lp || Math.hypot(cr.pos.x - lp.x, cr.pos.z - lp.z) > 0.75) {
          if (cr.state !== 'buried' && cr.state !== 'dormant') {
            const f = prints[pk++ % prints.length], hx = Math.cos(cr.heading), hz = -Math.sin(cr.heading);
            side = -side;
            f.m.position.set(cr.pos.x + hx * 0.13 * side, 0.02, cr.pos.z + hz * 0.13 * side); f.m.rotation.y = cr.heading; f.m.visible = true; f.t = 0;
          }
          this.lastPrint = { x: cr.pos.x, z: cr.pos.z };
        }
        for (const f of prints) if (f.m.visible) { f.t += dt; f.m.material.opacity = 0.55 * (1 - U.smoothstep(12, 26, f.t)); if (f.t > 26) f.m.visible = false; }
      },
    };
  }
  Sp.add({
    kind: 'whiteout', model: whiteoutModel, radius: 0.35, catchR: 1.3, height: 2.4,
    traits: ['hearing', 'blind'], senses: { sight: 0, fov: 0, hearing: 1.6 },
    speeds: { patrol: 1.0, investigate: 2.0, chase: 4.1 }, lose: 7, searchTime: 12, gait: 1.3,
    allowCell: outdoors, kill: 'snowSwallow', stepRate: 1.5, stepHear: 6, voice: 'whiteout',
  });

  // ============================================================ THE COOK
  function cookModel() {
    const r = K.humanoid({
      key: 'cook', h: 2.02, build: 1.45, belly: 1.3, coat: 0.55, long: 1.05,
      clothBase: '#d8d4c8', skin: { base: '#b8b0a8', mottle: ['160,150,140', '200,190,180', '130,120,120'], veins: '90,80,110', veinCount: 18 },
      head: { eyes: 'milky', mouth: 0.15, swell: 0.6 }, skinVC: [0.92, 0.9, 0.95],
      // the apron, stained down the front; frost on the shoulders
      clothVC: p => (p[2] > 0.05 && p[1] < 0.35 ? [0.85, 0.78, 0.7] : p[1] > 0.45 ? [1.08, 1.1, 1.14] : [1, 1, 1]),
    });
    for (const m of r.mats) m.roughness = 0.55;
    const white = new THREE.MeshStandardMaterial({ color: 0xe8e6e0, roughness: 0.85 });
    const toque = new THREE.Mesh(new THREE.LatheGeometry([[0.001, 0.0], [0.1, 0.0], [0.1, 0.12], [0.13, 0.2], [0.12, 0.28], [0.06, 0.31], [0.001, 0.31]].map(([x, y]) => new THREE.Vector2(x, y)), 18), white);
    toque.position.set(0, 0.2, -0.01); toque.scale.set(1.2, 1, 1.2); r.head.add(toque);
    // the meat hook in the right hand
    const steel = new THREE.MeshStandardMaterial({ color: 0x8a8e90, roughness: 0.35, metalness: 0.9 });
    const hand = r.arms.find(a => a.sx > 0).el;
    const hook = new THREE.Group(); hook.position.set(0, -0.42, 0.05); hand.add(hook);
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.14, 8), new THREE.MeshStandardMaterial({ color: 0x4a3020, roughness: 0.8 })); handle.rotation.z = H; hook.add(handle);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.18, 6), steel); shaft.position.y = -0.09; hook.add(shaft);
    const curve = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, 6, 14, PI * 1.3), steel); curve.position.set(0.06, -0.2, 0); curve.rotation.z = PI * 0.85; hook.add(curve);
    return {
      group: r.group, rig: r, mats: r.mats,
      animate(cr, dt) {
        const an = cr.anim;
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 2, 0, 1), cr.state === 'chase' ? 0.35 : 0);
        const ra = r.arms.find(a => a.sx > 0);
        if (cr.state === 'chase') { ra.sh.rotation.x = -0.6 + Math.sin(an.t * 3) * 0.1; ra.el.rotation.x = -1.0; }
        if (an.attack > 0) { ra.sh.rotation.x = U.lerp(ra.sh.rotation.x, -2.6, an.attack); ra.el.rotation.x = U.lerp(ra.el.rotation.x, -0.4, an.attack); }
        r.neck.rotation.x = 0.25; r.neck.rotation.y = cr.state === 'investigate' ? Math.sin(an.t * 0.9) * 0.6 : 0;
      },
    };
  }
  Sp.add({
    kind: 'cook', model: cookModel, radius: 0.42, catchR: 1.25, height: 2.1,
    traits: ['hearing', 'sight'], senses: { sight: 9, fov: 2.0, hearing: 1.5 },
    speeds: { patrol: 0.7, investigate: 1.6, chase: 3.2 }, lose: 8, searchTime: 14, gait: 1.25,
    confined: ['kitchenZone'], kill: 'hook', stepRate: 1.9, stepHear: 12, voice: 'cook',
  });
})(typeof window !== 'undefined' ? window : globalThis);
