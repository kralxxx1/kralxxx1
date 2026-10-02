/* The outdoors of the hand-authored places (PB.Exterior.Wild), set by L.meta.weather:
     { sky: [r,g,b] sky light on outdoor cells,
       dome: { zenith, horizon, moon: [x,y,z] direction or null, moonK, stars, cloud, glow },
       ground: floor texture beyond the map, groundTint, groundY,
       sea: { y, color } a wide sea or lake to the horizon (ferry, harbour),
       ice: { y } frozen lake to the horizon,
       ring: 'pines' | 'snowPines' | 'birches' | 'none'   real trees in a band around the map,
       silhouette: 'pines' | 'mountains' | 'harbour' | 'shore' | 'valley'   a skyline painted on the dome,
       precip: 'rain' | 'snow' | 'blizzard' | null, wind, lightning }
   The map ends at an invisible barrier; past it the ground, trees, water and sky go on until the fog
   takes them, so nothing ever looks like the edge of a level. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, T = PB.Tex, P = PB.Props;
  const PI = Math.PI;

  // ------------------------------------------------------------ skyline painted on the dome
  const SIL = {
    pines: (g, w, h, r) => { g.beginPath(); g.moveTo(0, h); let x = 0; while (x < w) { const tw = r.range(6, 16), th = r.range(0.35, 0.75) * h; g.lineTo(x, h - th * 0.2); g.lineTo(x + tw * 0.5, h - th); g.lineTo(x + tw, h - th * 0.2); x += tw * r.range(0.5, 0.9); } g.lineTo(w, h); g.fill(); },
    mountains: (g, w, h, r) => {
      for (const [k, a] of [[0.95, 0.55], [0.75, 1]]) { g.globalAlpha = a; g.beginPath(); g.moveTo(0, h); let y = h * (1 - k * 0.6); for (let x = 0; x <= w; x += 8) { y += r.range(-1, 1) * 9; y = U.clamp(y, h * (1 - k), h * 0.85); g.lineTo(x, y); } g.lineTo(w, h); g.fill(); }
      g.globalAlpha = 1; SIL.pines(g, w, h, r);
    },
    harbour: (g, w, h, r) => {
      g.beginPath(); g.moveTo(0, h); for (let x = 0; x < w; x += r.range(10, 40)) { const bh = r.range(0.08, 0.3) * h; g.lineTo(x, h - bh); g.lineTo(x + r.range(8, 30), h - bh); } g.lineTo(w, h); g.fill();
      for (let k = 0; k < 4; k++) { const x = r.range(0, w), ch = r.range(0.45, 0.7) * h; g.fillRect(x, h - ch, 3, ch); g.fillRect(x - 20, h - ch, 50, 3); g.fillRect(x + 22, h - ch, 2, ch * 0.5); }
    },
    shore: (g, w, h, r) => { g.beginPath(); g.moveTo(0, h); let y = h * 0.86; for (let x = 0; x <= w; x += 6) { y += r.range(-1, 1) * 2; y = U.clamp(y, h * 0.78, h * 0.92); g.lineTo(x, y); } g.lineTo(w, h); g.fill(); g.globalAlpha = 0.9; SIL.pines(g, w, h * 0.98, r); g.globalAlpha = 1; },
    valley: (g, w, h, r) => { g.beginPath(); g.moveTo(0, h); let y = h * 0.2; for (let x = 0; x <= w; x += 6) { y += r.range(-1, 1) * 6; y = U.clamp(y, h * 0.05, h * 0.6); g.lineTo(x, y); } g.lineTo(w, h); g.fill(); },
  };
  const silTex = key => T.canvas('sil:' + key, 2048, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h); g.fillStyle = '#fff';
    (SIL[key] || SIL.pines)(g, w, h, U.rng(U.hashStr(key)));
  });

  const DOME_FS = `
    varying vec3 vDir; uniform float uTime; uniform float uFlash; uniform sampler2D uSil; uniform float uSilH; uniform float uHasSil;
    uniform vec3 uZenith; uniform vec3 uHorizon; uniform vec3 uGlow; uniform vec3 uMoonDir; uniform float uMoonK; uniform float uStars; uniform float uCloud; uniform vec3 uSilCol;
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
    float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int k = 0; k < 5; k++) { v += n2(p) * a; p *= 2.03; a *= 0.5; } return v; }
    void main(){
      vec3 d = normalize(vDir);
      float up = clamp(d.y, -1.0, 1.0);
      vec3 col = mix(uHorizon, uZenith, smoothstep(-0.02, 0.55, up));
      col += uGlow * (1.0 - smoothstep(0.0, 0.3, abs(up)));
      vec2 p = d.xz / max(d.y + 0.18, 0.06) * 1.4 + vec2(uTime * 0.012, uTime * 0.005);
      float cl = smoothstep(0.35, 0.85, fbm(p) * uCloud + (1.0 - uCloud) * 0.3);
      // the moon behind thin cloud
      float md = max(dot(d, normalize(uMoonDir)), 0.0);
      vec3 moon = vec3(0.9, 0.92, 1.0) * (smoothstep(0.9993, 0.9996, md) * (1.0 - cl * 0.85) * 1.6 + pow(md, 60.0) * 0.08 + pow(md, 6.0) * 0.03) * uMoonK;
      col += moon;
      // stars where the cloud is thin
      vec2 sp = d.xz / max(d.y + 0.25, 0.05) * 90.0;
      float st = step(0.9975, h(floor(sp))) * (1.0 - cl) * smoothstep(0.1, 0.4, up) * uStars;
      col += vec3(st) * 0.5;
      col = mix(col, col * 0.6 + uHorizon * 0.5 + vec3(0.02) * uCloud, cl * 0.6);
      // skyline
      if (uHasSil > 0.5 && up < uSilH) {
        float a = atan(d.z, d.x) / 6.2832 + 0.5;
        float s = texture2D(uSil, vec2(a, 1.0 - clamp(up / uSilH, 0.0, 1.0))).r;
        col = mix(col, uSilCol, s * (0.9 + 0.1 * smoothstep(0.0, uSilH, up)));
      }
      if (up < 0.0) col = mix(col, uHorizon * 0.7, smoothstep(0.0, -0.08, up));
      col += vec3(0.5, 0.55, 0.7) * uFlash * (0.3 + cl);
      gl_FragColor = vec4(col, 1.0);
    }`;
  const DOME_VS = 'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';

  // Snow: soft flakes drifting with the wind, wrapped in a box that follows the camera
  const SNOW_VS = `
    attribute vec4 aSeed;
    uniform float uTime; uniform vec3 uCam; uniform vec3 uSize; uniform float uWind; uniform float uFall; uniform sampler2D uMask; uniform vec2 uMaskSize;
    varying float vA;
    void main(){
      vec3 s = aSeed.xyz * uSize;
      float t = uTime;
      vec3 p = s + vec3(uWind * t * (0.7 + aSeed.w * 0.6), -uFall * t * (0.6 + aSeed.w * 0.8), uWind * 0.3 * t);
      p.x += sin(t * (0.6 + aSeed.w) + aSeed.x * 40.0) * 0.4;
      p.z += cos(t * (0.5 + aSeed.w) + aSeed.z * 30.0) * 0.4;
      vec3 b = uCam - uSize * 0.5;
      p = b + mod(p - b, uSize);
      vA = smoothstep(0.2, 1.0, distance(p, uCam)) * (1.0 - smoothstep(uSize.x * 0.35, uSize.x * 0.5, distance(p.xz, uCam.xz)));
      if (texture2D(uMask, p.xz / uMaskSize).r < 0.5 && p.y < 3.6) vA = 0.0;
      vec4 mv = viewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = (0.8 + aSeed.w * 1.6) * 30.0 / -mv.z * projectionMatrix[1][1] * 0.05;
    }`;
  const SNOW_FS = `uniform sampler2D uTex; uniform float uAlpha; uniform vec3 uCol; varying float vA; void main(){ vec4 t = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(uCol, t.a * uAlpha * vA); }`;

  // Sea or lake water to the horizon: slow swell, a glint where the moon is
  const SEA_VS = `uniform float uTime; varying vec3 vW; varying vec3 vN;
    void main(){ vec3 p = position; float w = sin(p.x * 0.11 + uTime * 0.7) * 0.25 + sin(p.y * 0.07 + uTime * 0.5) * 0.35 + sin((p.x + p.y) * 0.21 + uTime * 1.1) * 0.12;
      vec4 wp = modelMatrix * vec4(p.x, p.y, w, 1.0); vW = wp.xyz;
      float dx = cos(p.x * 0.11 + uTime * 0.7) * 0.11 * 0.25 + cos((p.x + p.y) * 0.21 + uTime * 1.1) * 0.21 * 0.12;
      float dz = cos(p.y * 0.07 + uTime * 0.5) * 0.07 * 0.35 + cos((p.x + p.y) * 0.21 + uTime * 1.1) * 0.21 * 0.12;
      vN = normalize(vec3(-dx, 1.0, dz));
      gl_Position = projectionMatrix * viewMatrix * wp; }`;
  const SEA_FS = `uniform vec3 uCol; uniform vec3 uSky; uniform vec3 uMoonDir; uniform vec3 uCam; uniform float uFlash; uniform vec3 fogColor; uniform float fogDensity; varying vec3 vW; varying vec3 vN;
    void main(){ vec3 v = normalize(uCam - vW); vec3 r = reflect(-v, vN); float fr = pow(1.0 - max(dot(v, vN), 0.0), 4.0);
      vec3 col = uCol + uSky * fr * 1.5 + vec3(0.8, 0.85, 1.0) * pow(max(dot(r, normalize(uMoonDir)), 0.0), 120.0) * 0.6 + vec3(0.4, 0.45, 0.6) * uFlash * fr;
      float d = distance(uCam, vW); float f = 1.0 - exp(-fogDensity * fogDensity * d * d);
      gl_FragColor = vec4(mix(col, fogColor, f), 1.0); }`;

  class Wild {
    constructor(world) {
      this.w = world; this.L = world.L; this.C = world.C;
      this.W = this.L.meta.weather;
      this.uTime = { value: 0 }; this.flash = 0; this.nextFlash = 10 + Math.random() * 10; this.flashT = -9;
      this.lamp = new THREE.Vector3(0, -99, 0); this.lamps = [];
    }
    build() {
      const L = this.L, C = this.C, g = this.w.group, Wd = this.W, W = L.w * C, D = L.h * C;
      const add = m => { g.add(m); return m; };
      const dome = Wd.dome || {};
      const col = (v, d) => new THREE.Color().fromArray(v || d);
      // sky dome riding with the camera
      const u = this.skyU = {
        uTime: this.uTime, uFlash: { value: 0 }, uSil: { value: Wd.silhouette ? silTex(Wd.silhouette) : null }, uHasSil: { value: Wd.silhouette ? 1 : 0 }, uSilH: { value: dome.silH || 0.12 },
        uZenith: { value: col(dome.zenith, [0.006, 0.008, 0.014]) }, uHorizon: { value: col(dome.horizon, [0.03, 0.035, 0.045]) }, uGlow: { value: col(dome.glow, [0, 0, 0]) },
        uMoonDir: { value: new THREE.Vector3().fromArray(dome.moon || [0.4, 0.5, -0.7]) }, uMoonK: { value: dome.moonK != null ? dome.moonK : 0.6 }, uStars: { value: dome.stars != null ? dome.stars : 0.5 }, uCloud: { value: dome.cloud != null ? dome.cloud : 0.8 },
        uSilCol: { value: col(dome.silCol, [0.005, 0.006, 0.008]) },
      };
      const sky = new THREE.ShaderMaterial({ vertexShader: DOME_VS, fragmentShader: DOME_FS, uniforms: u, side: THREE.BackSide, depthWrite: false, fog: false });
      this.dome = add(new THREE.Mesh(new THREE.SphereGeometry(60, 32, 16), sky)); this.dome.renderOrder = -1; this.dome.frustumCulled = false;
      // ground past the map
      if (Wd.ground) {
        const key = 'F:' + Wd.ground + ':' + (Wd.groundTint != null ? (+Wd.groundTint).toString(16) : '');
        const m = this.w.mat(key);
        const geo = new THREE.PlaneGeometry(900, 900, 1, 1); geo.rotateX(-PI / 2);
        const uv = geo.attributes.uv, sc = (m.userData.scale || 3); for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 900 / sc, uv.getY(i) * 900 / sc);
        const col3 = new Float32Array(geo.attributes.position.count * 3).fill(0.85); geo.setAttribute('color', new THREE.BufferAttribute(col3, 3));
        const ground = add(new THREE.Mesh(geo, m)); ground.position.set(W / 2, Wd.groundY != null ? Wd.groundY : -0.025, D / 2); ground.receiveShadow = true;
        ground.userData.kind = 'F:ground';
      }
      // sea / lake water
      if (Wd.sea) {
        this.seaU = { uTime: this.uTime, uCol: { value: col(Wd.sea.color, [0.01, 0.018, 0.02]) }, uSky: { value: col(dome.horizon, [0.03, 0.035, 0.045]) }, uMoonDir: u.uMoonDir, uCam: { value: new THREE.Vector3() }, uFlash: u.uFlash,
          fogColor: { value: new THREE.Color() }, fogDensity: { value: 0.02 } };
        const geo = new THREE.PlaneGeometry(1200, 1200, 160, 160);
        const sea = add(new THREE.Mesh(geo, new THREE.ShaderMaterial({ vertexShader: SEA_VS, fragmentShader: SEA_FS, uniforms: this.seaU, fog: false })));
        sea.rotation.x = -PI / 2; sea.position.set(W / 2, Wd.sea.y, D / 2); sea.frustumCulled = false;
        this.sea = sea;
      }
      if (Wd.ice) {
        const m = this.w.mat('F:ice:' + (Wd.ice.tint != null ? (+Wd.ice.tint).toString(16) : ''));
        const geo = new THREE.PlaneGeometry(1400, 1400, 1, 1); geo.rotateX(-PI / 2);
        const uv = geo.attributes.uv, sc = (m.userData.scale || 4); for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 1400 / sc, uv.getY(i) * 1400 / sc);
        geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 3).fill(0.8), 3));
        const ice = add(new THREE.Mesh(geo, m)); ice.position.set(W / 2, Wd.ice.y != null ? Wd.ice.y : -0.03, D / 2); ice.receiveShadow = true;
      }
      // a band of real trees round the map so the edge is a forest, not a wall
      if (Wd.ring && Wd.ring !== 'none') this.treeRing(Wd.ring, Wd.ringR || [8, 70], Wd.ringN || 520);
      // precipitation
      const od = L.meta.outdoor, mask = new Uint8Array(L.w * L.h * 4);
      for (let i = 0; i < L.w * L.h; i++) { const v = od[i] ? 255 : 0; mask[i * 4] = mask[i * 4 + 1] = mask[i * 4 + 2] = v; mask[i * 4 + 3] = 255; }
      const mt = new THREE.DataTexture(mask, L.w, L.h); mt.needsUpdate = true; mt.minFilter = mt.magFilter = THREE.NearestFilter;
      // outside the map everything is outdoors: clamp the mask edge (the border cells are outdoor on outdoor maps)
      mt.wrapS = mt.wrapT = THREE.ClampToEdgeWrapping;
      if (Wd.precip === 'rain') {
        const fake = { w: this.w, uTime: this.uTime, lamp: this.lamp };
        PB.Exterior.Open.prototype.buildRain.call(fake, mt, W, D);
        this.rain = fake.rain; this.splash = fake.splash;
        if (Wd.rainK != null) this.rain.uAlpha.value *= Wd.rainK;
      } else if (Wd.precip === 'snow' || Wd.precip === 'blizzard') this.buildSnow(mt, W, D, Wd.precip === 'blizzard');
      if (Wd.lightning) {
        const lt = new THREE.DirectionalLight(0xc0d0ff, 0); lt.position.set(W / 2 + 10, 35, -20); lt.target.position.set(W / 2, 0, D / 2); lt.visible = false; add(lt); add(lt.target); this.lightning = lt;
      }
    }
    treeRing(kind, [r0, r1], n) {
      const L = this.L, C = this.C, W = L.w * C, D = L.h * C, r = U.rng(L.seed + 5);
      const list = [];
      const od = L.meta.outdoor;
      const free = (x, z) => { const c = L.cellOf(x, z); return !L.inb(c.x, c.y); };
      // trees outside the map, thickest close to it, thinning into the fog
      for (let k = 0; k < n * 4 && list.length < n; k++) {
        const side = r.int(0, 3), t = r(), d = r0 + Math.pow(r(), 1.6) * (r1 - r0);
        let x, z;
        if (side === 0) { x = -40 + t * (W + 80); z = -d; } else if (side === 1) { x = W + d; z = -40 + t * (D + 80); } else if (side === 2) { x = -40 + t * (W + 80); z = D + d; } else { x = -d; z = -40 + t * (D + 80); }
        if (!free(x, z)) continue;
        const s = r.range(0.75, 1.35);
        list.push({ x, z, rot: r.range(0, 6.28), sx: s, sy: s * r.range(0.85, 1.3), sz: s });
      }
      // plus trees inside the map where the map marks them (outdoor cells listed in L.meta.trees)
      for (const t of L.meta.trees || []) list.push(t);
      const def = kind === 'snowPines' ? 'pineSnow' : kind === 'birches' ? 'birch' : 'pine';
      this.w.instanced(def, P.DEFS[def], list, { cast: false });
      void od;
    }
    buildSnow(mask, W, D, blizzard) {
      const n = Math.round((blizzard ? 16000 : 9000) * (0.4 + PB.Settings.data.particles * 0.6));
      const geo = new THREE.BufferGeometry(), pos = new Float32Array(n * 3), seed = new Float32Array(n * 4), r = U.rng(31);
      for (let i = 0; i < n * 4; i++) seed[i] = r();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
      this.snowU = { uTime: this.uTime, uCam: { value: new THREE.Vector3() }, uSize: { value: new THREE.Vector3(30, 14, 30) }, uWind: { value: blizzard ? 7 : 0.8 }, uFall: { value: blizzard ? 2.2 : 0.9 },
        uMask: { value: mask }, uMaskSize: { value: new THREE.Vector2(W, D) }, uTex: { value: T.softDot() }, uAlpha: { value: blizzard ? 0.75 : 0.6 }, uCol: { value: new THREE.Color(0.75, 0.78, 0.85) } };
      const m = new THREE.ShaderMaterial({ vertexShader: SNOW_VS, fragmentShader: SNOW_FS, uniforms: this.snowU, transparent: true, depthWrite: false });
      const pts = new THREE.Points(geo, m); pts.frustumCulled = false; pts.renderOrder = 3; pts.userData.noPrepass = true;
      this.w.group.add(pts);
    }
    update(dt, t, cam) {
      this.uTime.value = t;
      if (this.dome) this.dome.position.set(cam.x, 0, cam.z);
      if (this.rain) { this.rain.uMin.value.set(cam.x - 18, 0, cam.z - 18); this.splash.uMin.value.set(cam.x - 15, 0.004, cam.z - 15); this.rain.uCam.value.copy(cam); }
      if (this.snowU) this.snowU.uCam.value.copy(cam);
      if (this.seaU) { this.seaU.uCam.value.copy(cam); const f = this.w.game.scene.fog; if (f) { this.seaU.fogColor.value.copy(f.color); this.seaU.fogDensity.value = f.density; } }
      if (this.lightning) {
        if (t > this.nextFlash) { this.nextFlash = t + U.lerp(14, 34, Math.random()); this.flashT = t; this.thunderAt = t + U.lerp(1, 4, Math.random()); }
        const k = t - this.flashT, fl = PB.Settings.data.reduceFlicker ? 0.35 : 1;
        let f = 0; if (k >= 0 && k < 0.7) f = (k < 0.07 ? 1 : k < 0.13 ? 0.15 : k < 0.2 ? 0.7 : Math.max(0, 0.3 - (k - 0.2))) * fl;
        this.lightning.visible = f > 0.01; this.lightning.intensity = f * 3; this.skyU.uFlash.value = f;
        if (this.rain) this.rain.uFlash.value = f;
        if (this.thunderAt && t > this.thunderAt) { this.thunderAt = 0; if (this.w.game.audio) this.w.game.audio.thunder(null); }
      }
    }
  }
  PB.Exterior.Wild = Wild;

  // ------------------------------------------------------------ trees
  const D = P.DEFS;
  // Norway spruce: a straight trunk and drooping tiers, darker toward the inside
  const spruce = (snow) => {
    const s = [['cyl', 'treeBark', 0.09, 0.22, 3.2, 8, 0, 1.6, 0]];
    const tiers = 9;
    for (let k = 0; k < tiers; k++) {
      const y = 1.3 + k * 1.05, rad = 2.2 * (1 - k / tiers) + 0.25;
      s.push(['cone', 'spruce', rad, 1.6, 9, 0, y + 0.8, 0, 0, k * 0.7, 0]);
      if (snow) s.push(['cone', 'snowCap', rad * 0.92, 0.55, 9, 0, y + 1.36, 0, 0, k * 0.7, 0]);
    }
    s.push(['cone', 'spruce', 0.35, 1.2, 7, 0, 1.3 + tiers * 1.05 + 0.4, 0]);
    return s;
  };
  D.pine = spruce(false);
  D.pineSnow = spruce(true);
  D.birch = [['cyl', 'birchBark', 0.07, 0.14, 7, 8, 0, 3.5, 0], ...[[0.9, 5.5, 0.2], [-0.8, 6.0, -0.4], [0.2, 6.6, 0.8], [0, 7.3, -0.1]].map(([x, y, z]) => ['sph', 'birchLeaf', 1.3, x, y, z, 8, 6, [1, 0.8, 1]])];
  Object.assign(PB.Models.MATS, {
    spruce: { color: 0x0f1f14, rough: 0.95, double: true }, snowCap: { color: 0xd8dee6, rough: 0.8 }, treeBark: { color: 0x2e241c, rough: 0.95 },
    birchBark: { color: 0xc8c4b8, rough: 0.8 }, birchLeaf: { color: 0x2a3a1c, rough: 0.9 },
  });
})(typeof window !== 'undefined' ? window : globalThis);
