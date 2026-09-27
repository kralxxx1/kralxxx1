/* Creature bodies sculpted as signed distance fields (see sdf.js) and dressed with procedural skin.
   - The Eater: the maze's hunger given a body. A swollen, waxy yellow sphere with a sick hide
     (veins, bruises, sores), a mouth that is all gum and too many human teeth, a long tongue, and one
     bloodshot human eye that follows you. Built as two jaws that open around a hinge.
   - The ghosts: the four kids under wet, torn bedsheets that drag on the floor. You can see a head
     and shoulders pushing against the cloth, the eye holes are torn and black, the dye of their
     color has run down from the hem.
   Everything is meshed once and cached; per-instance state lives in the materials' uniforms. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U, T = PB.Tex;
  const PI = Math.PI;

  // ------------------------------------------------------------ THE EATER
  const R = 1.15;
  // The eye sits in a socket on the upper jaw, pushed out a little past the hide
  const EYE = [0.475, 0.836, 0.814];
  function eaterJaw(upper) {
    const sgn = upper ? 1 : -1;
    return p => {
      // Lumpy hide: the sphere swells in slow bulges
      let d = S.sphere(p, [0, 0, 0], R) - S.fbm(p[0] * 1.6 + 3, p[1] * 1.6, p[2] * 1.6, 3) * 0.09;
      // Only this jaw's half (with a lip that overhangs the seam a little)
      d = S.smax(d, -sgn * p[1] - 0.015, 0.03);
      // Mouth cavity: the jaw is a thick shell
      const cav = S.sphere(p, [0, 0, 0.05], R * 0.86);
      d = S.smax(d, -cav, 0.05);
      // A heavy lip rolled along the front of the seam
      const ang = Math.atan2(p[0], p[2]);
      if (Math.abs(ang) < 1.9) {
        const rim = S.torus([p[0], p[1] - sgn * 0.02, p[2]], [0, 0, 0], R * 0.93, 0.07);
        d = S.smin(d, rim + Math.max(0, Math.abs(ang) - 1.5) * 0.3, 0.05);
      }
      // Eye socket on the upper jaw (the eye sits in it)
      if (upper) {
        // two sockets (the body is symmetric here), each with swollen, raw lids set around the eye's axis
        const q = [Math.abs(p[0]), p[1], p[2]];
        const ec = EYE, l = Math.hypot(ec[0], ec[1], ec[2]), ax = [ec[0] / l, ec[1] / l, ec[2] / l];
        d = S.smax(d, -S.sphere(q, ec, 0.18), 0.02);
        d = S.smin(d, S.torusAxis(q, [ec[0] - ax[0] * 0.02, ec[1] - ax[1] * 0.02, ec[2] - ax[2] * 0.02], ax, 0.17, 0.055), 0.05);
        // a heavy brow ridge over both eyes
        d = S.smin(d, S.capsule(q, [0, 1.02, 0.66], [0.62, 0.98, 0.62], 0.08, 0.06), 0.12);
      }
      return d;
    };
  }
  function eaterSkinTex() {
    return T.canvas('eater:skin', 1024, 1024, (g, w, h) => {
      const r = U.rng(66);
      g.fillStyle = '#8e6454'; g.fillRect(0, 0, w, h);
      // mottling
      for (let k = 0; k < 220; k++) { const x = r() * w, y = r() * h, rr = r.range(20, 120); const grd = g.createRadialGradient(x, y, 0, x, y, rr); const c = r() < 0.5 ? '140,80,64' : r() < 0.5 ? '205,150,120' : '105,52,44'; grd.addColorStop(0, `rgba(${c},0.35)`); grd.addColorStop(1, `rgba(${c},0)`); g.fillStyle = grd; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
      // bruises
      for (let k = 0; k < 16; k++) { const x = r() * w, y = r() * h, rr = r.range(30, 90); const grd = g.createRadialGradient(x, y, 0, x, y, rr); grd.addColorStop(0, 'rgba(90,40,70,0.55)'); grd.addColorStop(0.6, 'rgba(110,90,40,0.3)'); grd.addColorStop(1, 'rgba(110,90,40,0)'); g.fillStyle = grd; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
      // veins: branching dark red-purple lines
      const vein = (x, y, a, len, wdt, depth) => {
        g.strokeStyle = `rgba(${100 + r() * 40 | 0},${20 + r() * 20 | 0},${40 + r() * 30 | 0},${0.35 + wdt * 0.12})`; g.lineWidth = wdt; g.beginPath(); g.moveTo(x, y);
        for (let s = 0; s < len; s++) { a += r.range(-0.4, 0.4); x += Math.cos(a) * 6; y += Math.sin(a) * 6; g.lineTo(x, y); if (depth < 3 && r() < 0.08) { g.stroke(); vein(x, y, a + r.range(-1.2, 1.2), len * 0.6 | 0, wdt * 0.6, depth + 1); g.beginPath(); g.moveTo(x, y); } }
        g.stroke();
      };
      for (let k = 0; k < 26; k++) vein(r() * w, r() * h, r() * 6.28, 30 + r() * 40 | 0, r.range(1.5, 4), 0);
      // sores: wet dark-red craters with a pale rim
      for (let k = 0; k < 22; k++) { const x = r() * w, y = r() * h, rr = r.range(4, 14); g.fillStyle = 'rgba(230,210,150,0.7)'; g.beginPath(); g.arc(x, y, rr * 1.4, 0, 6.28); g.fill(); g.fillStyle = 'rgba(90,10,15,0.95)'; g.beginPath(); g.arc(x, y, rr, 0, 6.28); g.fill(); g.fillStyle = 'rgba(40,0,5,0.9)'; g.beginPath(); g.arc(x + rr * 0.2, y + rr * 0.1, rr * 0.5, 0, 6.28); g.fill(); }
      // pores and stubble
      for (let k = 0; k < 26000; k++) { g.fillStyle = r() < 0.7 ? 'rgba(80,40,30,0.18)' : 'rgba(40,15,10,0.4)'; g.fillRect(r() * w, r() * h, 1.5, 1.5); }
    }, { repeat: true });
  }
  function eaterBumpTex() {
    return T.canvas('eater:bump', 512, 512, (g, w, h) => {
      const r = U.rng(67);
      g.fillStyle = '#808080'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 5000; k++) { const v = 90 + r() * 80 | 0; g.fillStyle = `rgba(${v},${v},${v},0.3)`; g.beginPath(); g.arc(r() * w, r() * h, r.range(0.8, 3), 0, 6.28); g.fill(); }
      g.strokeStyle = 'rgba(60,60,60,0.5)';
      for (let k = 0; k < 120; k++) { let x = r() * w, y = r() * h; g.lineWidth = r.range(1, 2.5); g.beginPath(); g.moveTo(x, y); for (let s = 0; s < 8; s++) { x += r.range(-14, 14); y += r.range(-4, 4); g.lineTo(x, y); } g.stroke(); }
      for (let k = 0; k < 22; k++) { const x = r() * w, y = r() * h, rr = r.range(3, 8); g.fillStyle = 'rgba(40,40,40,0.8)'; g.beginPath(); g.arc(x, y, rr, 0, 6.28); g.fill(); g.strokeStyle = 'rgba(200,200,200,0.6)'; g.lineWidth = 2; g.stroke(); }
    }, { repeat: true });
  }
  function eyeTex() {
    return T.canvas('eater:eye', 512, 512, (g, w, h) => {
      const r = U.rng(3);
      g.fillStyle = '#e8dcc4'; g.fillRect(0, 0, w, h);
      // bloodshot sclera
      g.strokeStyle = 'rgba(170,20,20,0.6)';
      for (let k = 0; k < 70; k++) { let x = r() < 0.5 ? r() * w : (r() < 0.5 ? 0 : w), y = r() * h; g.lineWidth = r.range(0.8, 2.5); g.beginPath(); g.moveTo(x, y); for (let s = 0; s < 12; s++) { x += (w / 2 - x) * 0.06 + r.range(-10, 10); y += (h / 2 - y) * 0.06 + r.range(-10, 10); g.lineTo(x, y); } g.stroke(); }
      const grd0 = g.createRadialGradient(w / 2, h / 2, 60, w / 2, h / 2, w / 2); grd0.addColorStop(0, 'rgba(255,220,200,0)'); grd0.addColorStop(1, 'rgba(160,40,40,0.55)'); g.fillStyle = grd0; g.fillRect(0, 0, w, h);
      // iris: murky yellow-brown with radial fibres, dilated pupil
      const cx = w / 2, cy = h / 2, ir = 96;
      const grd = g.createRadialGradient(cx, cy, 20, cx, cy, ir); grd.addColorStop(0, '#6a5a18'); grd.addColorStop(0.6, '#8a7422'); grd.addColorStop(1, '#2a2008'); g.fillStyle = grd; g.beginPath(); g.arc(cx, cy, ir, 0, 6.28); g.fill();
      for (let k = 0; k < 220; k++) { const a = r() * 6.28; g.strokeStyle = r() < 0.5 ? 'rgba(40,30,5,0.5)' : 'rgba(200,170,60,0.4)'; g.lineWidth = 1; g.beginPath(); g.moveTo(cx + Math.cos(a) * 40, cy + Math.sin(a) * 40); g.lineTo(cx + Math.cos(a) * ir, cy + Math.sin(a) * ir); g.stroke(); }
      g.fillStyle = '#050302'; g.beginPath(); g.arc(cx, cy, 52, 0, 6.28); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.85)'; g.beginPath(); g.ellipse(cx - 30, cy - 34, 14, 9, -0.5, 0, 6.28); g.fill();
    });
  }
  // A few tooth shapes: incisor, canine, molar, broken
  function toothDist(kind) {
    return p => {
      if (kind === 0) return S.smin(S.box(p, [0, 0.07, 0], [0.028, 0.07, 0.012], 0.01), S.capsule(p, [0, -0.02, 0], [0, 0.06, 0], 0.018), 0.02);
      if (kind === 1) return S.smin(S.capsule(p, [0, -0.02, 0], [0.004, 0.13, 0.006], 0.026, 0.004), S.sphere(p, [0, 0.0, 0], 0.028), 0.02);
      if (kind === 2) return S.smin(S.box(p, [0, 0.05, 0], [0.04, 0.05, 0.035], 0.015), S.sphere(p, [0.015, 0.1, 0.01], 0.02) - 0.005, 0.01);
      return S.smax(S.smin(S.box(p, [0, 0.06, 0], [0.03, 0.06, 0.014], 0.01), S.capsule(p, [0, -0.02, 0], [0, 0.05, 0], 0.02), 0.02), p[1] - 0.075 - p[0] * 0.8, 0.005);
    };
  }
  function toothGeos() {
    return [0, 1, 2, 3].map(k => S.mesh('eater:tooth' + k, toothDist(k), [[-0.06, -0.05, -0.05], [0.06, 0.16, 0.06]], 0.009, { smooth: 1 }));
  }

  // Many small parts with one material (teeth) drawn as one mesh instead of dozens of draw calls
  function mergeMeshes(meshes) {
    let nv = 0, ni = 0;
    for (const m of meshes) { m.updateMatrix(); nv += m.geometry.attributes.position.count; ni += m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count; }
    const pos = new Float32Array(nv * 3), nor = new Float32Array(nv * 3), idx = new Uint32Array(ni);
    let vo = 0, io = 0;
    const v = new THREE.Vector3(), nm = new THREE.Matrix3();
    for (const m of meshes) {
      const g = m.geometry, pa = g.attributes.position, na = g.attributes.normal;
      nm.getNormalMatrix(m.matrix);
      for (let i = 0; i < pa.count; i++) {
        v.fromBufferAttribute(pa, i).applyMatrix4(m.matrix); pos.set([v.x, v.y, v.z], (vo + i) * 3);
        v.fromBufferAttribute(na, i).applyMatrix3(nm).normalize(); nor.set([v.x, v.y, v.z], (vo + i) * 3);
      }
      if (g.index) for (let i = 0; i < g.index.count; i++) idx[io + i] = g.index.array[i] + vo;
      else for (let i = 0; i < pa.count; i++) idx[io + i] = vo + i;
      io += g.index ? g.index.count : pa.count; vo += pa.count;
    }
    const out = new THREE.BufferGeometry();
    out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    out.setIndex(new THREE.BufferAttribute(idx, 1));
    out.computeBoundingSphere();
    return out;
  }
  function eater() {
    const t0 = performance.now();
    const skin = eaterSkinTex(), bump = eaterBumpTex();
    skin.repeat.set(2, 2); bump.repeat.set(3, 3);
    const uT = { value: 0 }, uBreath = { value: 0 }, uRage = { value: 0 };
    // Color the inside of the jaws (gums) differently from the hide, by the vertex's depth in the shell
    const jawColor = (p, n) => {
      const rr = Math.hypot(p[0], p[1], p[2] - 0.05), inside = rr < R * 0.9 && (n[0] * p[0] + n[1] * p[1] + n[2] * (p[2] - 0.05)) < 0;
      return inside ? [0.32, 0.03, 0.05] : [1, 1, 1];
    };
    const upperG = S.mesh('eater:upper', eaterJaw(true), [[-1.3, -0.12, -1.3], [1.3, 1.3, 1.3]], 0.03, { color: jawColor, smooth: 2 });
    const lowerG = S.mesh('eater:lower', eaterJaw(false), [[-1.3, -1.3, -1.3], [1.3, 0.12, 1.3]], 0.03, { color: jawColor, smooth: 2 });
    const mat = new THREE.MeshPhysicalMaterial({ map: skin, bumpMap: bump, bumpScale: 3, vertexColors: true, roughness: 0.55, metalness: 0, clearcoat: 0.2, clearcoatRoughness: 0.55, emissive: 0x2a0e06, emissiveIntensity: 0.25 });
    mat.onBeforeCompile = sh => {
      sh.uniforms.uT = uT; sh.uniforms.uBreath = uBreath; sh.uniforms.uRage = uRage;
      sh.vertexShader = 'uniform float uT; uniform float uBreath; uniform float uRage;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        float crawl = sin(position.x * 5.0 + uT * 1.7) * sin(position.y * 4.3 - uT * 1.1) * sin(position.z * 6.1 + uT * 1.3);
        float twitch = sin(uT * 31.0 + position.y * 9.0) * uRage * 0.012;
        transformed += normal * (crawl * (0.028 + uRage * 0.02) + uBreath * 0.05 + twitch);`);
      // spherical UVs so the hide wraps without seams across the jaw split
      sh.vertexShader = sh.vertexShader.replace('#include <uv_vertex>', `#include <uv_vertex>
        #ifdef USE_MAP
          vec3 pn = normalize(position);
          vMapUv = vec2(atan(pn.z, pn.x) / 6.2832 + 0.5, pn.y * 0.5 + 0.5) * vec2(2.0, 1.0);
        #endif`);
    };
    mat.customProgramCacheKey = () => 'eater-hide-v2';
    const up = new THREE.Group(), lo = new THREE.Group();
    const upper = new THREE.Mesh(upperG, mat), lower = new THREE.Mesh(lowerG, mat);
    upper.castShadow = lower.castShadow = true;
    up.add(upper); lo.add(lower);
    // Teeth: two ragged rows along the front of each jaw, human-shaped, stained
    const teethMat = new THREE.MeshStandardMaterial({ color: 0xd8c898, roughness: 0.38, emissive: 0x1a140a, emissiveIntensity: 0.3 });
    const tg = toothGeos();
    const tr = U.rng(17);
    for (const [jaw, down] of [[up, false], [lo, true]]) {
      for (const row of [0, 1]) for (let k = -9; k <= 9; k++) {
        if (tr() < 0.1) continue;
        const a = (k + (row ? 0.5 : 0)) / 9 * 1.45, rr = R * (0.9 - row * 0.1);
        const kind = Math.abs(k) > 6 ? 2 : Math.abs(k) === 4 || Math.abs(k) === 3 ? 1 : tr() < 0.18 ? 3 : 0;
        const tooth = new THREE.Mesh(tg[kind], teethMat);
        const s = (row ? 0.85 : 1.25) * tr.range(0.85, 1.25);
        tooth.scale.setScalar(s);
        tooth.position.set(Math.sin(a) * rr, down ? -0.02 : 0.02, Math.cos(a) * rr);
        tooth.rotation.set(down ? 0 : PI, a + (tr() - 0.5) * 0.4, (tr() - 0.5) * 0.35);
        tooth.rotation.x += (down ? -1 : 1) * (0.15 + (tr() - 0.5) * 0.3);
        (jaw.userData.teeth || (jaw.userData.teeth = [])).push(tooth);
      }
      const set = new THREE.Mesh(mergeMeshes(jaw.userData.teeth), teethMat);
      set.castShadow = true;
      jaw.add(set);
      jaw.userData.teeth = null;
    }
    // Tongue: a long, heavy muscle lolling out over the lower teeth
    const tongueG = S.mesh('eater:tongue', p => S.smin(S.chain(p, [[0, -0.25, -0.3], [0, -0.18, 0.2], [0, -0.14, 0.62], [0.05, -0.2, 0.95]], [0.28, 0.24, 0.17, 0.1], 0.08), S.ellipsoid(p, [0, -0.2, 0.2], [0.36, 0.1, 0.5]), 0.1) + S.fbm(p[0] * 8, p[1] * 8, p[2] * 8, 2) * 0.02, [[-0.5, -0.6, -0.7], [0.5, 0.2, 1.2]], 0.03, { smooth: 2 });
    const tongueMat = new THREE.MeshPhysicalMaterial({ color: 0x8a1c26, roughness: 0.25, clearcoat: 0.8, clearcoatRoughness: 0.15, emissive: 0x200004, emissiveIntensity: 0.4 });
    const tongue = new THREE.Mesh(tongueG, tongueMat);
    lo.add(tongue);
    // The eye
    const eyeMat = new THREE.MeshPhysicalMaterial({ map: eyeTex(), roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.03, emissive: 0x181010, emissiveIntensity: 0.2 });
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.165, 32, 24), eyeMat);
    eye.position.set(EYE[0], EYE[1], EYE[2]);
    // texture center (u=0.5, v=0.5) faces +z after this turn
    eye.rotation.y = -PI / 2;
    const eyeHolder = new THREE.Group(); eyeHolder.position.copy(eye.position); eye.position.set(0, 0, 0); eyeHolder.add(eye);
    up.add(eyeHolder);
    const eye2 = new THREE.Mesh(eye.geometry, eyeMat); eye2.rotation.y = -PI / 2;
    const eyeHolder2 = new THREE.Group(); eyeHolder2.position.set(-EYE[0], EYE[1], EYE[2]); eyeHolder2.add(eye2);
    up.add(eyeHolder2);
    // Horns: two thick, ridged, curling horns of old bone, like the Muncher's on the cabinet
    const hornG = S.mesh('eater:horn', p => {
      let d = S.chain(p, [[-0.05, -0.1, 0], [0.26, 0.12, 0.12], [0.52, 0.42, 0.16], [0.6, 0.76, 0.04]], [0.16, 0.115, 0.065, 0.015], 0.06);
      const t = Math.hypot(p[0], p[1], p[2]);
      return d + Math.sin(t * 60) * 0.006 + S.fbm(p[0] * 9, p[1] * 9, p[2] * 9, 2) * 0.01;
    }, [[-0.26, -0.3, -0.24], [0.8, 0.95, 0.4]], 0.012, { color: (p) => { const k = Math.min(1, Math.max(0, (p[1] + 0.1) / 0.5)); return [0.55 + k * 0.45, 0.5 + k * 0.42, 0.42 + k * 0.36]; }, smooth: 2 });
    const hornMat = new THREE.MeshStandardMaterial({ color: 0xcdbb98, roughness: 0.55, vertexColors: true });
    for (const sx of [-1, 1]) { const h = new THREE.Mesh(hornG, hornMat); h.position.set(sx * 0.62, 0.8, 0.34); h.scale.x = sx; h.castShadow = true; up.add(h); }
    // Arms: two long, thin, human arms hanging from under the jaw. Walt's. The fingers drag on the floor.
    const armG = S.mesh('eater:arm', p => {
      let d = S.chain(p, [[0, 0, 0], [0.34, -0.3, 0.12], [0.3, -0.76, 0.4]], [0.1, 0.07, 0.05], 0.03);
      d = S.smin(d, S.ellipsoid(p, [0.3, -0.81, 0.49], [0.065, 0.03, 0.085]), 0.03);
      for (let f = 0; f < 4; f++) { const fx = 0.3 + (f - 1.5) * 0.032; d = S.smin(d, S.capsule(p, [fx, -0.82, 0.55], [0.3 + (f - 1.5) * 0.05, -0.87, 0.7 - Math.abs(f - 1.5) * 0.03], 0.013, 0.009), 0.012); }
      d = S.smin(d, S.capsule(p, [0.35, -0.8, 0.48], [0.4, -0.85, 0.57], 0.014, 0.01), 0.012);
      return d + S.fbm(p[0] * 14, p[1] * 14, p[2] * 14, 2) * 0.004;
    }, [[-0.14, -0.94, -0.14], [0.5, 0.12, 0.76]], 0.011, { color: (p) => p[2] > 0.66 ? [0.3, 0.24, 0.22] : [1, 1, 1], smooth: 2 });
    const armMat = new THREE.MeshStandardMaterial({ color: 0x9a8478, roughness: 0.6, vertexColors: true });
    const arms = [];
    for (const sx of [-1, 1]) {
      const pivot = new THREE.Group(); pivot.position.set(sx * 0.78, -0.34, 0.42);
      const m = new THREE.Mesh(armG, armMat); m.scale.set(sx, 1, 1); m.castShadow = true; pivot.add(m);
      arms.push({ pivot, side: sx });
    }
    // Throat: black inside
    const throat = new THREE.Mesh(new THREE.SphereGeometry(R * 0.7, 24, 16), new THREE.MeshBasicMaterial({ color: 0x030000, side: THREE.BackSide }));
    throat.position.z = -0.2;
    const g = new THREE.Group();
    g.add(up, lo, throat);
    for (const a of arms) g.add(a.pivot);
    // Saliva strands between the jaws
    const spit = new THREE.MeshPhysicalMaterial({ color: 0xd8dccc, roughness: 0.05, transparent: true, opacity: 0.5, depthWrite: false, clearcoat: 1 });
    const strands = [];
    for (let k = 0; k < 7; k++) {
      const a = (k - 3) * 0.3 + tr.range(-0.1, 0.1);
      const sgeo = new THREE.CylinderGeometry(0.008 + tr() * 0.012, 0.005, 1, 6, 6);
      const pa = sgeo.attributes.position; for (let i = 0; i < pa.count; i++) { const y = pa.getY(i); pa.setX(i, pa.getX(i) * (1 - Math.abs(y) * 0.8)); pa.setZ(i, pa.getZ(i) + (0.25 - y * y) * 0.25); }
      sgeo.computeVertexNormals();
      const m = new THREE.Mesh(sgeo, spit);
      m.position.set(Math.sin(a) * R * 0.8, 0, Math.cos(a) * R * 0.8);
      m.userData.a = a;
      g.add(m); strands.push(m);
    }
    // A dim, sick glow: enough to see it coming down a dark corridor, not a lamp
    const light = new THREE.PointLight(0xc8704a, 10, 14, 1.8);
    light.position.set(0, 0.4, 1.0);
    g.add(light);
    return { group: g, up, lo, light, mat, R, uT, uBreath, uRage, strands, tongue, eye, eyeHolder, eye2, eyeHolder2, arms, ms: performance.now() - t0 };
  }

  // ------------------------------------------------------------ THE HAUNTS
  // Hungry House's hooded Haunts, made of soaked, dyed cloth: a big round hood that is as wide as the body,
  // a bell of cloth falling from it to a hem torn into long points, and two huge oval eye holes with a
  // pinpoint glowing deep inside each. Under the hood a child's face presses through the wet cloth.
  const EYEH = [[-0.085, 1.305, 0.188], [0.085, 1.318, 0.186]];
  const HOOD = [0, 1.28, 0], HOODR = [0.235, 0.265, 0.215];
  function sheetDist(p) {
    const y = p[1];
    let d = S.ellipsoid(p, HOOD, HOODR);
    // the face under the cloth: brow, nose, a slack open mouth
    d = S.smin(d, S.capsule(p, [-0.07, 1.36, 0.19], [0.07, 1.36, 0.19], 0.028), 0.03);
    d = S.smin(d, S.capsule(p, [0, 1.285, 0.205], [0, 1.25, 0.222], 0.014, 0.02), 0.025);
    d = S.smax(d, -S.ellipsoid(p, [0, 1.165, 0.2], [0.045, 0.08, 0.06]), 0.015);   // a mouth stretched open in a scream
    {
      // the bell: the cloth falls from the hood, a little wider at the bottom, folding as it goes
      const t = Math.min(1, Math.max(0, (1.2 - y) / 1.2));
      const ang = Math.atan2(p[2], p[0]);
      const folds = Math.sin(ang * 8 + t * 2) * 0.022 * t + Math.sin(ang * 3 - t * 3) * 0.018 * t + Math.sin(ang * 15 + y * 7) * 0.005 * t;
      const rad = 0.22 + t * 0.15 + folds + S.fbm(p[0] * 5, y * 3, p[2] * 5, 2) * 0.04 * t;
      let bell = (Math.hypot(p[0], p[2] * 1.08) - rad) * 0.8;
      // the hem: five long points, torn ragged, one strip dragging on the floor
      const points = Math.pow(Math.abs(Math.sin(ang * 2.5 + 0.3)), 0.7);
      const hem = 0.01 + points * 0.16 + (S.fbm(ang * 4.1, 0, 0, 3) + 0.5) * 0.05 - Math.max(0, Math.sin(ang * 7 + 1.3) - 0.8) * 0.2;
      bell = S.smax(bell, hem - y, 0.02);
      bell = S.smax(bell, y - 1.3, 0.05);
      d = S.smin(d, bell, 0.08);
    }
    // arms reaching forward under the cloth
    d = S.smin(d, S.capsule(p, [0.2, 1.1, 0.03], [0.17, 0.82, 0.26], 0.05, 0.042), 0.06);
    d = S.smin(d, S.capsule(p, [-0.2, 1.1, 0.03], [-0.18, 0.86, 0.22], 0.05, 0.042), 0.06);
    // the eye holes are torn right through: big, oval, black
    for (const [k, e] of EYEH.entries()) d = S.smax(d, -S.ellipsoid(p, [e[0], e[1] - k * 0.006, e[2] + 0.02], [0.052 - k * 0.006, 0.072 + k * 0.008, 0.1]), 0.008);
    return d;
  }
  function sheetColor(p, n) {
    // black in the eye holes and the mouth, darker and wetter toward the dragging hem
    for (const e of EYEH) if (Math.hypot((p[0] - e[0]) / 0.058, (p[1] - e[1]) / 0.074, (p[2] - e[2] - 0.01) / 0.09) < 1) return [0.02, 0.015, 0.015];
    if (Math.hypot((p[0]) / 0.05, (p[1] - 1.165) / 0.085, (p[2] - 0.2) / 0.07) < 1) return [0.03, 0.02, 0.02];
    const wet = 0.55 + 0.45 * Math.min(1, Math.max(0, p[1] / 0.8));
    let occ = 0;
    for (const s of [0.02, 0.05]) { const q = [p[0] + n[0] * s, p[1] + n[1] * s, p[2] + n[2] * s]; occ += Math.max(0, s - sheetDist(q)) / s; }
    const a = Math.max(0.35, 1 - occ * 0.6) * wet;
    return [a, a * 0.98, a * 0.95];
  }
  function sheetGeo() {
    const geo = S.mesh('ghost:haunt1', sheetDist, [[-0.62, -0.05, -0.6], [0.62, 1.6, 0.6]], 0.016, { color: sheetColor, smooth: 2 });
    // Wrap the cloth texture around the body (mirrored at the back, so there is no seam) and up its height
    const pa = geo.attributes.position, uv = geo.attributes.uv;
    for (let i = 0; i < pa.count; i++) uv.setXY(i, Math.abs(Math.atan2(pa.getX(i), pa.getZ(i))) / Math.PI * 1.5, pa.getY(i) / 1.56);
    uv.needsUpdate = true;
    return geo;
  }
  function sheetTex(key, color) {
    return T.canvas('ghost:sheet:' + key, 512, 512, (g, w, h) => {
      const r = U.rng(U.hashStr(key));
      // cloth dyed through in the Haunt's color, faded on the hood, soaked dark at the hem (v=0 at the bottom)
      const c = new THREE.Color(color);
      const col = (a, k = 1) => `rgba(${Math.min(255, c.r * 255 * k) | 0},${Math.min(255, c.g * 255 * k) | 0},${Math.min(255, c.b * 255 * k) | 0},${a})`;
      g.fillStyle = col(1, 0.78); g.fillRect(0, 0, w, h);
      const fade = g.createLinearGradient(0, h, 0, 0); fade.addColorStop(0, 'rgba(10,6,6,0.55)'); fade.addColorStop(0.35, 'rgba(10,6,6,0.1)'); fade.addColorStop(0.8, 'rgba(230,225,215,0.12)'); fade.addColorStop(1, 'rgba(230,225,215,0.2)');
      g.fillStyle = fade; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 9000; k++) { g.fillStyle = r() < 0.5 ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)'; g.fillRect(r() * w, r() * h, 2, 1); }
      // weave
      g.fillStyle = 'rgba(0,0,0,0.06)'; for (let y = 0; y < h; y += 3) g.fillRect(0, y, w, 1);
      // runs of darker dye where the water ran down
      for (let k = 0; k < 70; k++) { const x = r() * w; g.fillStyle = col(0.25 + r() * 0.3, 0.5); g.fillRect(x, h * r.range(0.25, 0.7), r.range(2, 7), h); }
      // dark runs weeping down from under the eye holes (u = 0.2 on both sides) and from the mouth (u = 0)
      for (const [u0, v0, n] of [[0.2, 0.2, 5], [0.0, 0.27, 4]]) for (let k = 0; k < n; k++) {
        const x = (u0 + r.range(-0.035, 0.035)) * w, len = h * r.range(0.12, 0.42), wd = r.range(2, 6);
        const gr = g.createLinearGradient(0, v0 * h, 0, v0 * h + len); gr.addColorStop(0, 'rgba(25,8,8,0.8)'); gr.addColorStop(1, 'rgba(25,8,8,0)');
        g.fillStyle = gr; g.fillRect(x, v0 * h, wd, len); g.beginPath(); g.arc(x + wd / 2, v0 * h + len * 0.7, wd * 0.7, 0, 6.283); g.fill();
      }
      // grime, mould and old stains
      for (let k = 0; k < 40; k++) { const x = r() * w, y = r() * h, rr = r.range(10, 50); const gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, 'rgba(70,60,40,0.35)'); gr.addColorStop(1, 'rgba(70,60,40,0)'); g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
    });
  }

  PB.Monsters = { eater, sheetGeo, sheetTex, toothGeos, mergeMeshes, R };
})(typeof window !== 'undefined' ? window : globalThis);
