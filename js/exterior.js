/* Rainy night street outside the arcade's storefront.
   Wet asphalt and sidewalk with puddles and procedural rain ripples, GPU rain streaks lit by the
   street lamp and lightning, ground splashes, drips from the awning, a gutter spout, rain beads
   sliding down the inside view of the glass, a parked car, buildings across the street,
   a cloudy sky with lightning bolts and the occasional car driving past. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, T = PB.Tex, P = PB.Props;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ TEXTURES
  const TX = {
    asphalt: () => T.canvas('ex:asphalt', 1024, 1024, (g, w, h) => {
      const r = U.rng(21);
      g.fillStyle = '#2b2b2d'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 60000; k++) { const v = 20 + r() * 50 | 0; g.fillStyle = `rgb(${v},${v},${v + 2})`; g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2); }
      // Patches and cracks
      for (let k = 0; k < 6; k++) { g.fillStyle = `rgba(${15 + r() * 15 | 0},${15 + r() * 15 | 0},${18 + r() * 15 | 0},0.6)`; const x = r() * w, y = r() * h; g.fillRect(x, y, 80 + r() * 200, 60 + r() * 140); }
      g.strokeStyle = 'rgba(8,8,10,0.9)'; g.lineWidth = 2;
      for (let k = 0; k < 14; k++) { let x = r() * w, y = r() * h; g.beginPath(); g.moveTo(x, y); for (let q = 0; q < 12; q++) { x += r.range(-30, 30); y += r.range(-30, 30); g.lineTo(x, y); } g.stroke(); }
    }, { repeat: true }),
    // Wetness mask: R = puddle depth (smooth blobs)
    puddles: () => T.canvas('ex:puddles', 512, 512, (g, w, h) => {
      const r = U.rng(8);
      g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 26; k++) {
        const x = r() * w, y = r() * h, rx = r.range(20, 90), ry = r.range(12, 50);
        const grd = g.createRadialGradient(x, y, 0, x, y, rx);
        grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.6, 'rgba(255,255,255,0.85)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
        g.save(); g.translate(x, y); g.scale(1, ry / rx); g.translate(-x, -y); g.fillStyle = grd; g.beginPath(); g.arc(x, y, rx, 0, PI * 2); g.fill(); g.restore();
      }
    }, { repeat: true }),
    sidewalk: () => T.canvas('ex:sidewalk', 512, 512, (g, w, h) => {
      const r = U.rng(5);
      g.fillStyle = '#6a6862'; g.fillRect(0, 0, w, h);
      for (let k = 0; k < 30000; k++) { const v = 80 + r() * 40 | 0; g.fillStyle = `rgba(${v},${v},${v - 4},0.5)`; g.fillRect(r() * w, r() * h, 1.5, 1.5); }
      g.fillStyle = 'rgba(0,0,0,0.12)';
      for (let k = 0; k < 20; k++) { g.beginPath(); g.arc(r() * w, r() * h, r.range(4, 30), 0, PI * 2); g.fill(); }
      g.strokeStyle = '#2a2926'; g.lineWidth = 4; g.strokeRect(0, 0, w, h);
      g.strokeStyle = 'rgba(30,30,28,0.7)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(r() * w, 0); g.lineTo(r() * w, r() * h); g.lineTo(w, r() * h); g.stroke();
    }, { repeat: true }),
    // A building front: brick, lintels, a row of windows (some lit), shop front at street level
    facade: (key, o = {}) => T.canvas('ex:facade:' + key, 1024, 1024, (g, w, h) => {
      const r = U.rng(U.hashStr(key));
      g.fillStyle = o.base || '#4a2a22'; g.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 12) for (let x = (y / 12) % 2 ? -12 : 0; x < w; x += 26) {
        const v = r.range(0.75, 1.1); g.fillStyle = `rgba(${110 * v | 0},${58 * v | 0},${44 * v | 0},1)`; g.fillRect(x + 1, y + 1, 24, 10);
      }
      g.fillStyle = 'rgba(0,0,0,0.25)'; for (let k = 0; k < 40; k++) g.fillRect(r() * w, r() * h * 0.7, r.range(2, 6), r.range(40, 200));
      const lit = o.lit != null ? o.lit : 0.35;
      for (let fl = 0; fl < 3; fl++) for (let k = 0; k < 4; k++) {
        const x = 70 + k * 240, y = 60 + fl * 190, ww = 120, hh = 140;
        g.fillStyle = '#b8b0a0'; g.fillRect(x - 8, y - 10, ww + 16, 12); g.fillRect(x - 6, y + hh, ww + 12, 10);
        const on = r() < lit, tv = r() < 0.15;
        const grd = g.createLinearGradient(x, y, x, y + hh);
        if (on) { grd.addColorStop(0, tv ? '#5f7ad8' : '#ffcf80'); grd.addColorStop(1, tv ? '#304080' : '#d88838'); } else { grd.addColorStop(0, '#12161e'); grd.addColorStop(1, '#070a10'); }
        g.fillStyle = grd; g.fillRect(x, y, ww, hh);
        if (on && r() < 0.6) { g.fillStyle = 'rgba(60,30,20,0.85)'; g.fillRect(x, y, ww * r.range(0.2, 0.45), hh); g.fillRect(x + ww * r.range(0.55, 0.8), y, ww, hh); }
        g.fillStyle = '#2a2622'; g.fillRect(x + ww / 2 - 3, y, 6, hh); g.fillRect(x, y + hh / 2 - 3, ww, 6);
      }
      // Street level: shop front with a shutter or lit window
      g.fillStyle = '#1b1c20'; g.fillRect(0, 700, w, 324);
      if (o.shop) {
        g.fillStyle = '#d8e0ff'; g.fillRect(90, 760, 520, 200);
        const grd = g.createLinearGradient(0, 760, 0, 960); grd.addColorStop(0, 'rgba(255,255,255,0.4)'); grd.addColorStop(1, 'rgba(120,140,200,0.2)'); g.fillStyle = grd; g.fillRect(90, 760, 520, 200);
        g.fillStyle = '#9aa0b0'; for (let k = 0; k < 6; k++) { g.fillRect(110 + k * 84, 830, 60, 90); g.fillStyle = '#6e7584'; g.beginPath(); g.arc(140 + k * 84, 870, 22, 0, PI * 2); g.fill(); g.fillStyle = '#9aa0b0'; }
        g.fillStyle = '#28282c'; g.fillRect(660, 760, 220, 264);
      } else {
        g.fillStyle = '#5a5c60'; g.fillRect(90, 740, 820, 284);
        g.fillStyle = 'rgba(0,0,0,0.35)'; for (let y = 745; y < 1024; y += 14) g.fillRect(90, y, 820, 3);
        g.fillStyle = 'rgba(200,40,40,0.8)'; g.font = `bold 64px ${T.FONTS.FONT_HAND}`; g.fillText('NO EXIT', 300, 880);
      }
    }),
    skyline: () => T.canvas('ex:skyline', 2048, 512, (g, w, h) => {
      const r = U.rng(77);
      const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, 'rgba(0,0,0,0)'); grd.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = grd; g.fillRect(0, 0, w, h);
      for (let x = 0; x < w;) {
        const bw = r.range(60, 180), bh = r.range(120, 460);
        g.fillStyle = `rgb(${8 + r() * 6 | 0},${9 + r() * 6 | 0},${14 + r() * 6 | 0})`; g.fillRect(x, h - bh, bw, bh);
        for (let y = h - bh + 10; y < h - 10; y += 14) for (let wx = x + 6; wx < x + bw - 8; wx += 12) if (r() < 0.08) { g.fillStyle = r() < 0.8 ? 'rgba(255,200,120,0.9)' : 'rgba(140,170,255,0.9)'; g.fillRect(wx, y, 5, 7); }
        if (r() < 0.2) { g.fillStyle = '#ff2020'; g.fillRect(x + bw / 2 - 2, h - bh - 8, 4, 4); }
        x += bw + r.range(0, 20);
      }
    }),
    neonSign: (text, color) => T.canvas('ex:neon:' + text, 1024, 256, (g, w, h) => {
      g.clearRect(0, 0, w, h);
      g.font = `bold 120px ${T.FONTS.FONT_HAND}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.shadowColor = color; g.shadowBlur = 30; g.strokeStyle = color; g.lineWidth = 9; g.strokeText(text, w / 2, h / 2);
      g.shadowBlur = 0; g.strokeStyle = '#fff'; g.lineWidth = 3; g.strokeText(text, w / 2, h / 2);
    }),
    plate: () => T.canvas('ex:plate', 256, 128, (g, w, h) => {
      g.fillStyle = '#f0ece0'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#1a3a8a'; g.font = `bold 20px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText('ILLINOIS', w / 2, 26);
      g.fillStyle = '#111'; g.font = `bold 58px ${T.FONTS.FONT_TYPE}`; g.fillText('WLT 1987', w / 2, 94);
    }),
    awning: () => T.canvas('ex:awning', 512, 128, (g, w, h) => {
      for (let x = 0; x < w; x += 64) { g.fillStyle = (x / 64) % 2 ? '#e8e2d4' : '#8a1a2a'; g.fillRect(x, 0, 64, h); }
      g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(0, h - 18, w, 18);
      g.fillStyle = '#fff'; g.font = `bold 44px ${T.FONTS.FONT_PIX}`; g.textAlign = 'center'; g.fillText('', w / 2, 70);
    }),
    bolt: () => T.canvas('ex:bolt', 256, 1024, (g, w, h) => {
      g.clearRect(0, 0, w, h);
      const r = U.rng(3);
      const branch = (x, y, len, width, depth) => {
        g.lineWidth = width; g.strokeStyle = 'rgba(220,230,255,1)'; g.shadowColor = '#9ab0ff'; g.shadowBlur = 18;
        g.beginPath(); g.moveTo(x, y);
        for (let k = 0; k < len; k++) { x += r.range(-18, 18); y += r.range(14, 30); g.lineTo(x, y); if (depth < 2 && r() < 0.12) { g.stroke(); branch(x, y, len / 3 | 0, width * 0.5, depth + 1); g.beginPath(); g.moveTo(x, y); } }
        g.stroke();
      };
      branch(w / 2, 0, 38, 5, 0);
    }),
  };
  PB.Exterior = PB.Exterior || {};

  // ------------------------------------------------------------ MATERIALS
  // Wet ground: puddle mask lowers roughness and darkens, rain ripples perturb the normal
  // Shader edit shared by the street and outdoor floors of other levels
  let puddleTex = null;
  function wetPatch(sh, uTime, o = {}) {
    if (!puddleTex) { puddleTex = TX.puddles(); puddleTex.wrapS = puddleTex.wrapT = THREE.RepeatWrapping; }
    sh.uniforms.uTime = uTime; sh.uniforms.uPud = { value: puddleTex }; sh.uniforms.uPudScale = { value: o.pudScale || 0.08 }; sh.uniforms.uWet = { value: o.wet != null ? o.wet : 1 };
    sh.vertexShader = 'varying vec3 vExW;\n' + sh.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\nvExW = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = `varying vec3 vExW; uniform float uTime; uniform sampler2D uPud; uniform float uPudScale; uniform float uWet;
float exH(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 exRipple(vec2 p, float t){
  vec2 n = vec2(0.0);
  for (int l = 0; l < 3; l++) {
    vec2 q = p * (3.0 + float(l) * 1.7) + float(l) * 7.3;
    vec2 c = floor(q), f = fract(q) - 0.5;
    float h = exH(c + float(l) * 13.1);
    vec2 o = vec2(exH(c + 3.1), exH(c + 5.7)) - 0.5;
    f -= o * 0.5;
    float ph = fract(t * (0.9 + h * 0.6) + h);
    float d = length(f);
    float r = ph * 0.45;
    float ring = exp(-pow((d - r) * 40.0, 2.0)) * (1.0 - ph) * (1.0 - ph);
    n += (d > 0.001 ? f / d : vec2(0.0)) * ring;
  }
  return n;
}
` + sh.fragmentShader
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
float pud = smoothstep(0.35, 0.75, texture2D(uPud, vExW.xz * uPudScale).r) * uWet;
roughnessFactor = mix(roughnessFactor * mix(1.0, 0.6, uWet), 0.03, pud);`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float pud0 = smoothstep(0.35, 0.75, texture2D(uPud, vExW.xz * uPudScale).r) * uWet;
diffuseColor.rgb *= mix(mix(1.0, 0.72, uWet), 0.35, pud0);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{ vec2 rp = exRipple(vExW.xz, uTime) * (0.25 + 0.75 * pud) * uWet;
  normal = normalize(normal + (viewMatrix * vec4(rp.x, 0.0, rp.y, 0.0)).xyz * 0.9); }`);
  }
  function wetMaterial(map, o, uTime) {
    const m = new THREE.MeshStandardMaterial({ map, color: o.color || 0xffffff, roughness: o.rough || 0.45, metalness: 0, emissive: new THREE.Color(o.amb || 0x05070a), emissiveMap: map });
    m.userData.refl = o.refl || 0.5;
    m.onBeforeCompile = sh => wetPatch(sh, uTime, o);
    m.customProgramCacheKey = () => 'ex-wet';
    return m;
  }
  function outMat(color, rough, metal, o = {}) {
    const m = new THREE.MeshStandardMaterial(Object.assign({ color, roughness: rough, metalness: metal || 0, emissive: new THREE.Color(o.amb != null ? o.amb : 0x030406) }, o.extra || {}));
    m.userData.refl = o.refl != null ? o.refl : 0.15;
    return m;
  }

  // ------------------------------------------------------------ RAIN SHADERS
  const RAIN_VS = `
    attribute vec4 aSeed;
    uniform float uTime; uniform vec3 uCam; uniform vec3 uMin; uniform vec3 uSize; uniform vec3 uLamp; uniform float uFlash;
    uniform vec4 uHole; uniform float uHoleY; uniform float uLen; uniform float uSpeed; uniform float uWind;
    uniform sampler2D uMask; uniform vec2 uMaskSize; uniform float uHasMask;
    varying vec2 vUv; varying float vLit; varying float vA;
    void main(){
      float sp = uSpeed * (0.85 + aSeed.w * 0.3);
      float y = fract(aSeed.z - uTime * sp / uSize.y);
      vec3 p = uMin + vec3(aSeed.x, y, aSeed.y) * uSize;
      // Around-the-camera mode: world-anchored drops wrapped into the box
      if (uHasMask > 0.5) p.xz = uMin.xz + mod(aSeed.xy * uSize.xz - uMin.xz, uSize.xz);
      p.x += (y - 0.5) * uWind;
      vA = 1.0;
      if (p.x > uHole.x && p.x < uHole.z && p.z > uHole.y && p.z < uHole.w && p.y < uHoleY) vA = 0.0;
      if (uHasMask > 0.5 && (texture2D(uMask, p.xz / uMaskSize).r < 0.5 && p.y < 3.4)) vA = 0.0;
      vec3 vel = normalize(vec3(uWind * 0.12, -1.0, 0.0));
      vec3 toCam = normalize(uCam - p);
      vec3 side = normalize(cross(vel, toCam));
      float len = uLen * (0.7 + aSeed.w * 0.6);
      vec3 pos = p + side * position.x * 0.006 + vel * position.y * len;
      vec3 dl = p - uLamp;
      vLit = 1.6 / (1.0 + dot(dl, dl) * 0.12) + uFlash * 2.5;
      vUv = position.xy + 0.5;
      float d = distance(uCam, p);
      vA *= smoothstep(0.3, 1.2, d) * (1.0 - smoothstep(18.0, 30.0, d));
      gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1.0);
    }`;
  const RAIN_FS = `
    varying vec2 vUv; varying float vLit; varying float vA; uniform float uAlpha;
    void main(){
      float a = (1.0 - abs(vUv.x * 2.0 - 1.0)) * smoothstep(0.0, 0.35, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
      gl_FragColor = vec4(vec3(0.62, 0.7, 0.85) * (0.05 + vLit), a * uAlpha * vA);
    }`;
  const SPLASH_VS = `
    attribute vec4 aSeed;
    uniform float uTime; uniform vec3 uMin; uniform vec3 uSize; uniform vec3 uLamp; uniform float uFlash; uniform vec4 uHole;
    uniform sampler2D uMask; uniform vec2 uMaskSize; uniform float uHasMask;
    varying vec2 vUv; varying float vT; varying float vLit; varying float vA;
    void main(){
      float rate = 1.6 + aSeed.w;
      float cyc = uTime * rate + aSeed.z * 17.0;
      float t = fract(cyc);
      float k = floor(cyc);
      vec2 j = fract(vec2(sin(k * 12.9898 + aSeed.x * 78.2), sin(k * 39.34 + aSeed.y * 11.1)) * 43758.5453);
      vec3 p = uMin + vec3(fract(aSeed.x + j.x * 0.2), 0.0, fract(aSeed.y + j.y * 0.2)) * uSize;
      if (uHasMask > 0.5) p.xz = uMin.xz + mod(vec2(fract(aSeed.x + j.x * 0.2), fract(aSeed.y + j.y * 0.2)) * uSize.xz - uMin.xz, uSize.xz);
      vA = (p.x > uHole.x && p.x < uHole.z && p.z > uHole.y && p.z < uHole.w) ? 0.0 : 1.0;
      if (uHasMask > 0.5 && texture2D(uMask, p.xz / uMaskSize).r < 0.5) vA = 0.0;
      float s = 0.03 + t * 0.12;
      vec3 pos = p + vec3(position.x * s, 0.004, position.y * s);
      vUv = position.xy + 0.5; vT = t;
      vec3 dl = p - uLamp; vLit = 1.4 / (1.0 + dot(dl, dl) * 0.1) + uFlash * 2.0;
      gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1.0);
    }`;
  const SPLASH_FS = `
    varying vec2 vUv; varying float vT; varying float vLit; varying float vA;
    void main(){
      float d = length(vUv - 0.5) * 2.0;
      float ring = exp(-pow((d - 0.8) * 7.0, 2.0)) + (1.0 - smoothstep(0.0, 0.3, d)) * (1.0 - smoothstep(0.0, 0.25, vT)) * 1.5;
      float a = ring * (1.0 - vT) * vA;
      gl_FragColor = vec4(vec3(0.7, 0.78, 0.9) * (0.08 + vLit), a * 0.5);
    }`;
  // Rain on the storefront glass (seen from inside): static beads, sliding drops with trails, condensation
  const GLASS_FS = `
    varying vec2 vUv; uniform float uTime; uniform float uFlash; uniform vec2 uSize; uniform vec3 uTint;
    float h1(float n){ return fract(sin(n) * 43758.5453); }
    float h2(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    vec4 drops(vec2 uv, float t, float scale){
      vec2 a = vec2(3.0, 1.0);
      vec2 st = uv * scale * a;
      vec2 id = floor(st);
      st.y += t * 0.22 * (0.6 + h1(id.x * 7.1));
      id = floor(st);
      st = fract(st) - 0.5;
      float n = h2(id);
      t += n * 6.2831;
      float w = uv.y * 10.0;
      float x = (n - 0.5) * 0.8 + (0.4 - abs(n - 0.5)) * sin(3.0 * w) * pow(sin(w), 6.0) * 0.45;
      float y = -sin(t + sin(t + sin(t) * 0.5)) * 0.45;
      y -= (st.x - x) * (st.x - x);
      vec2 dp = (st - vec2(x, y)) / a;
      float drop = smoothstep(0.05, 0.035, length(dp));
      float hl = smoothstep(0.018, 0.0, length(dp - vec2(-0.012, 0.018)));
      vec2 tp = (st - vec2(x, 0.0)) / a; tp.y = (fract(tp.y * 8.0) - 0.5) / 8.0;
      float trail = smoothstep(0.03, 0.015, length(tp)) * smoothstep(-0.05, 0.05, dp.y) * smoothstep(0.5, y, st.y);
      float fog = smoothstep(-0.02, 0.02, dp.y) * smoothstep(0.5, y, st.y) * smoothstep(0.05, 0.03, abs(dp.x));
      return vec4(drop, trail, fog, hl * drop);
    }
    vec2 statics(vec2 uv, float t){
      uv *= 40.0;
      vec2 id = floor(uv); uv = fract(uv) - 0.5;
      vec3 n = vec3(h2(id), h2(id + 3.7), h2(id + 9.1));
      vec2 p = (n.xy - 0.5) * 0.7;
      float d = length(uv - p);
      float fade = smoothstep(0.0, 1.0, fract(t * 0.3 + n.z)) * (1.0 - smoothstep(0.8, 1.0, fract(t * 0.3 + n.z)));
      float m = smoothstep(0.3, 0.1, d) * fract(n.z * 10.0) * fade;
      return vec2(m, smoothstep(0.12, 0.0, length(uv - p - vec2(-0.08, 0.1))) * m);
    }
    void main(){
      vec2 uv = vUv * uSize * 7.0;
      float t = uTime * 0.6;
      vec2 s = statics(uv * 0.35, t);
      vec4 l1 = drops(uv, t, 1.0), l2 = drops(uv * 1.35 + 7.23, t, 1.5);
      float body = clamp(s.x + l1.x + l1.y * 0.6 + l2.x + l2.y * 0.6, 0.0, 1.0);
      float hl = clamp(s.y + l1.w + l2.w, 0.0, 1.0);
      float fog = clamp(1.0 - (l1.z + l2.z) * 2.0, 0.0, 1.0);
      float cond = smoothstep(0.22, 0.0, vUv.y) * 0.06 * fog;
      // Beads darken and refract the view; a tiny specular highlight catches the street light
      vec3 col = mix(vec3(0.015, 0.018, 0.024), uTint * (1.4 + uFlash * 4.0), hl) + uTint * cond * 2.0;
      float alpha = clamp(body * 0.22 + hl * 0.75 + cond, 0.0, 0.8);
      gl_FragColor = vec4(col, alpha);
    }`;
  const SKY_FS = `
    varying vec3 vDir; uniform float uTime; uniform float uFlash; uniform sampler2D uSkyline;
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
    float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int k = 0; k < 5; k++) { v += n2(p) * a; p *= 2.03; a *= 0.5; } return v; }
    void main(){
      vec3 d = normalize(vDir);
      float up = clamp(d.y, 0.0, 1.0);
      vec2 p = d.xz / max(d.y + 0.15, 0.05) * 1.6 + vec2(uTime * 0.02, uTime * 0.008);
      float cl = fbm(p);
      vec3 base = mix(vec3(0.045, 0.04, 0.05), vec3(0.008, 0.01, 0.018), smoothstep(0.0, 0.5, up));
      vec3 glow = vec3(0.09, 0.055, 0.03) * (1.0 - smoothstep(0.0, 0.25, up));
      vec3 col = base + glow + vec3(0.02, 0.022, 0.03) * cl * (0.5 + up);
      col += vec3(0.55, 0.6, 0.8) * uFlash * (0.4 + cl * 1.6);
      gl_FragColor = vec4(col, 1.0);
    }`;

  // ------------------------------------------------------------ CAR MODEL (1980s sedan, front +x)
  function carSpecs() {
    const L = 4.7, W = 1.74;
    const lower = [[-2.35, 0.32], [2.35, 0.32], [2.4, 0.5], [2.38, 0.78], [1.3, 0.86], [-1.9, 0.9], [-2.38, 0.86], [-2.42, 0.55]];
    const cabin = [[1.2, 0.86], [0.55, 1.33], [-1.05, 1.36], [-1.75, 0.92]];
    const s = [
      ['ext', 'carPaint', lower, W, 0.05, 0, 0, 0, 0, 0, 0],
      ['ext', 'carGlass', cabin, W - 0.18, 0.03, 0, 0, 0, 0, 0, 0],
      ['rbox', 'carPaint', 1.6, 0.05, W - 0.16, 0.02, -0.25, 1.37, 0],
      // Pillars
      ...[-1, 1].flatMap(sz => [
        ['box', 'carPaint', 0.07, 0.56, 0.06, 0.88, 1.1, sz * (W / 2 - 0.1), 0, 0, 0.9],
        ['box', 'carPaint', 0.08, 0.5, 0.06, -0.2, 1.12, sz * (W / 2 - 0.1)],
        ['box', 'carPaint', 0.1, 0.5, 0.06, -1.42, 1.12, sz * (W / 2 - 0.1), 0, 0, -0.9],
        ['rbox', 'chrome', 0.02, 0.02, 0.1, 0.005, -0.5, 0.78, sz * (W / 2 + 0.03)], ['rbox', 'chrome', 0.02, 0.02, 0.1, 0.005, 0.5, 0.78, sz * (W / 2 + 0.03)],
        ['rbox', 'rubberBlack', 4.5, 0.06, 0.02, 0.008, 0, 0.55, sz * (W / 2 + 0.03)],
        ['rbox', 'carPaint', 0.12, 0.08, 0.12, 0.02, 0.95, 0.98, sz * (W / 2 + 0.06)],
      ]),
      // Bumpers, grille, lights, plate
      ['rbox', 'chrome', 0.14, 0.14, W + 0.04, 0.04, 2.42, 0.45, 0], ['rbox', 'chrome', 0.14, 0.14, W + 0.04, 0.04, -2.45, 0.45, 0],
      ['box', 'grilleDark', 0.02, 0.2, 0.9, 2.39, 0.66, 0],
      ['rbox', 'carLens', 0.03, 0.14, 0.3, 0.02, 2.39, 0.66, 0.62], ['rbox', 'carLens', 0.03, 0.14, 0.3, 0.02, 2.39, 0.66, -0.62],
      ['rbox', 'tailLens', 0.03, 0.14, 0.38, 0.02, -2.42, 0.72, 0.6], ['rbox', 'tailLens', 0.03, 0.14, 0.38, 0.02, -2.42, 0.72, -0.6],
      ['plane', 'plate', 0.3, 0.15, -2.525, 0.47, 0, 0, -H, 0],
      // Wipers
      ['box', 'rubberBlack', 0.02, 0.01, 0.55, 1.15, 0.9, 0.3, 0, 0.3, 0.4], ['box', 'rubberBlack', 0.02, 0.01, 0.55, 1.15, 0.9, -0.35, 0, 0.3, 0.4],
    ];
    for (const x of [1.45, -1.5]) for (const z of [-W / 2 + 0.08, W / 2 - 0.08]) {
      s.push(['torus', 'tire', 0.26, 0.085, 24, 0, x, 0.33, z, 0, 0, 0]);
      s.push(['rcyl', 'chrome', 0.19, 0.06, 0.02, 20, x, 0.33, z + Math.sign(z) * 0.03, H]);
      s.push(['cyl', 'rubberBlack', 0.37, 0.37, 0.2, 20, x, 0.37, z, H, 0, 0, true]);
    }
    return s;
  }

  // ------------------------------------------------------------ BUILD
  class Street {
    constructor(world) {
      this.w = world; this.L = world.L; this.C = world.C;
      this.uTime = { value: 0 };
      this.flash = 0; this.nextFlash = 5 + Math.random() * 6; this.flashT = -9;
      this.nextCar = 12 + Math.random() * 20; this.car = null;
      this.lamp = new THREE.Vector3();
    }
    build() {
      const L = this.L, C = this.C, W = this.w, g = W.group;
      const zF = L.h * C, x0 = -14, x1 = L.w * C + 16;
      const add = m => { g.add(m); return m; };
      const plane = (w, h, mat, x, y, z, rx = -H, ry = 0) => { const m = add(new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat)); m.position.set(x, y, z); m.rotation.set(rx, ry, 0); m.receiveShadow = true; return m; };
      this.zF = zF;
      // Ground: sidewalk, curb, street with lane lines, far sidewalk
      const asph = TX.asphalt(); asph.wrapS = asph.wrapT = THREE.RepeatWrapping; asph.repeat.set((x1 - x0) / 6, 10 / 6);
      const street = plane(x1 - x0, 10.4, wetMaterial(asph, { rough: 0.42, refl: 0.6, amb: 0x040507, pudScale: 0.09 }, this.uTime), (x0 + x1) / 2, -0.15, zF + 8.2);
      street.material.map.repeat.set((x1 - x0) / 6, 10.4 / 6);
      const sw = TX.sidewalk(); sw.wrapS = sw.wrapT = THREE.RepeatWrapping; sw.repeat.set((x1 - x0) / 1.5, 3 / 1.5);
      plane(x1 - x0, 3.0, wetMaterial(sw, { rough: 0.5, refl: 0.35, amb: 0x05060a, pudScale: 0.14, wet: 0.7 }, this.uTime), (x0 + x1) / 2, 0, zF + 1.5);
      const sw2 = TX.sidewalk().clone(); sw2.needsUpdate = true; sw2.wrapS = sw2.wrapT = THREE.RepeatWrapping; sw2.repeat.set((x1 - x0) / 1.5, 2);
      plane(x1 - x0, 3.0, wetMaterial(sw2, { rough: 0.5, refl: 0.35, amb: 0x05060a, pudScale: 0.14, wet: 0.7 }, this.uTime), (x0 + x1) / 2, 0, zF + 14.9);
      const curbMat = outMat(0x77756e, 0.6, 0, { refl: 0.2 });
      for (const cz of [zF + 3.0, zF + 13.4]) {
        const c = add(new THREE.Mesh(PB.Models.roundedBox(x1 - x0, 0.17, 0.2, 0.03, 2), curbMat)); c.position.set((x0 + x1) / 2, -0.065, cz); c.receiveShadow = true;
      }
      const lineMat = outMat(0xc8a020, 0.5, 0, { refl: 0.3, amb: 0x0a0802 });
      for (let x = x0; x < x1; x += 4) plane(2, 0.12, lineMat, x + 1, -0.148, zF + 8.2);
      // Manhole with steam
      const mh = add(new THREE.Mesh(new THREE.CircleGeometry(0.4, 24), outMat(0x2a2a2c, 0.35, 0.8, { refl: 0.4 }))); mh.rotation.x = -H; mh.position.set(4, -0.147, zF + 6.2);
      // Buildings across the street
      const fac = [['a', '#4a2a22', true], ['b', '#3e3a36', false], ['c', '#52301f', false], ['d', '#403028', true]];
      let fx = x0;
      fac.forEach(([k, base, shop], i) => {
        const bw = i % 2 ? 11 : 13;
        const tex = TX.facade(k, { base, shop, lit: 0.3 + i * 0.05 });
        const m = new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: new THREE.Color(0.35, 0.33, 0.3), roughness: 0.8 });
        m.userData.refl = 0;
        const f = plane(bw, 12, m, fx + bw / 2, 6, zF + 16.4, 0, PI);
        f.castShadow = false;
        fx += bw + 0.2;
      });
      // Neon sign across the street (flickers)
      const neonTex = TX.neonSign('LAUNDROMAT', '#35a8ff');
      this.neon = new THREE.MeshBasicMaterial({ map: neonTex, transparent: true, depthWrite: false, color: new THREE.Color(2.2, 2.2, 2.2) });
      const nm = plane(4.2, 1.05, this.neon, 5, 3.4, zF + 16.2, 0, PI); nm.renderOrder = 2;
      this.neonLight = add(new THREE.PointLight(0x35a8ff, 3, 9, 2)); this.neonLight.position.set(5, 3.2, zF + 15.2);
      // Skyline and sky
      const sky = new THREE.ShaderMaterial({ vertexShader: 'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }', fragmentShader: SKY_FS, uniforms: { uTime: this.uTime, uFlash: { value: 0 }, uSkyline: { value: null } }, side: THREE.BackSide, depthWrite: false, fog: false });
      this.skyMat = sky;
      const dome = add(new THREE.Mesh(new THREE.SphereGeometry(58, 32, 16), sky)); dome.position.set(L.w * C / 2, 0, zF); dome.renderOrder = -1;
      const skl = new THREE.MeshBasicMaterial({ map: TX.skyline(), transparent: true, depthWrite: false, fog: false, color: new THREE.Color(1.2, 1.2, 1.2) });
      const sk = plane(130, 32, skl, L.w * C / 2, 14, zF + 42, 0, PI); sk.renderOrder = 0;
      this.bolt = new THREE.MeshBasicMaterial({ map: TX.bolt(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, color: new THREE.Color(3, 3, 3.4), opacity: 0 });
      this.boltMesh = plane(8, 30, this.bolt, 20, 26, zF + 47, 0, PI);
      // Awning over the entrance, dripping at its edge
      const aw = new THREE.MeshStandardMaterial({ map: TX.awning(), roughness: 0.6, emissive: new THREE.Color(0.02, 0.02, 0.025), side: THREE.DoubleSide });
      const awn = add(new THREE.Mesh(new THREE.PlaneGeometry(8.5, 1.55), aw)); awn.position.set(4.5, 3.05, zF + 0.72); awn.rotation.set(-H + 0.32, 0, 0); awn.castShadow = true;
      const valance = add(new THREE.Mesh(new THREE.PlaneGeometry(8.5, 0.28), aw)); valance.position.set(4.5, 2.66, zF + 1.46); valance.castShadow = true;
      const frameMat = outMat(0x1a1a1c, 0.5, 0.7);
      for (const x of [0.3, 8.7]) { const a = add(new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.6, 8), frameMat)); a.position.set(x, 3.0, zF + 0.72); a.rotation.x = H + 0.32; }
      // Gutter downspout at the corner of the facade
      const spx = 4 * C + 0.4;
      const pipe = add(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.6, 12), outMat(0x4a4c50, 0.45, 0.6))); pipe.position.set(spx, 1.9, zF + 0.18);
      const elbow = add(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.35, 12), pipe.material)); elbow.position.set(spx, 0.12, zF + 0.32); elbow.rotation.x = 1.0;
      this.spout = { x: spx, z: zF + 0.5 };
      // Street lamp (cobra head) at the curb
      const lx = L.cx(1.5), lz = zF + 2.7;
      const poleMat = outMat(0x3a3d40, 0.4, 0.8, { refl: 0.2 });
      const lampSpecs = [
        ['lathe', 'x', [[0.001, 0], [0.2, 0], [0.2, 0.08], [0.14, 0.14], [0.11, 0.6], [0.09, 0.65], [0.08, 6.4], [0.06, 6.5], [0.001, 6.5]], 20],
        ['tube', 'x', [[0, 6.3, 0], [0, 6.9, -0.3], [0, 7.05, -1.2], [0, 7.0, -1.9]], 0.05, 10],
        ['lathe', 'x', [[0.001, 0.12], [0.22, 0.1], [0.3, 0.02], [0.3, -0.02], [0.2, -0.05], [0.001, -0.06]], 24, 0, 6.95, -2.2, 0, 0, 0, [1, 1, 1.9]],
      ];
      for (const part of P.build('ex:lamp', lampSpecs)) { const m = add(new THREE.Mesh(part.geo, poleMat)); m.position.set(lx, 0, lz); m.rotation.y = PI; m.castShadow = true; }
      const lens = add(new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 8, 0, PI * 2, H, H), new THREE.MeshBasicMaterial({ color: new THREE.Color(4.2, 4.4, 5.2) })));
      lens.scale.set(1, 0.25, 1.8); lens.position.set(lx, 6.9, lz + 2.2);
      this.lamp.set(lx, 6.85, lz + 2.2);
      const sl = new THREE.SpotLight(0xa8b8ff, 60, 16, 1.0, 0.7, 1.6);
      sl.position.copy(this.lamp); sl.target.position.set(lx, 0, lz + 2.6);
      sl.castShadow = PB.Settings.data.shadows > 0; sl.shadow.mapSize.set(1024, 1024); sl.shadow.bias = -0.0006; sl.shadow.camera.near = 0.5; sl.shadow.camera.far = 18;
      add(sl); add(sl.target); this.streetLight = sl;
      // Hydrant, mailbox, newspaper box, trash bags
      const red = outMat(0x8a1a14, 0.45, 0.2, { refl: 0.25 });
      for (const part of P.build('ex:hydrant', [['lathe', 'x', [[0.001, 0], [0.16, 0], [0.16, 0.05], [0.11, 0.08], [0.11, 0.55], [0.14, 0.58], [0.14, 0.62], [0.09, 0.7], [0.03, 0.78], [0.001, 0.8]], 16], ['cyl', 'x', 0.05, 0.05, 0.34, 10, 0, 0.45, 0, 0, 0, H], ['cyl', 'x', 0.06, 0.06, 0.14, 10, 0, 0.45, 0.14, H]])) { const m = add(new THREE.Mesh(part.geo, red)); m.position.set(9.5, 0, zF + 2.5); m.castShadow = true; }
      const blue = outMat(0x1a3470, 0.4, 0.3, { refl: 0.25 });
      for (const part of P.build('ex:mailbox', [['rbox', 'x', 0.5, 0.9, 0.45, 0.06, 0, 0.85, 0], ['lathe', 'x', [[0.001, 0], [0.225, 0], [0.225, 0.01], [0.001, 0.01]], 16, 0, 1.3, 0, 0, 0, 0, [1.1, 1, 1]], ...[[-0.2, -0.17], [0.2, -0.17], [-0.2, 0.17], [0.2, 0.17]].map(([x, z]) => ['box', 'x', 0.04, 0.4, 0.04, x, 0.2, z]), ['box', 'x', 0.3, 0.04, 0.02, 0, 1.1, 0.23]])) { const m = add(new THREE.Mesh(part.geo, blue)); m.position.set(-1.5, 0, zF + 2.4); m.castShadow = true; }
      const bags = outMat(0x0c0c0e, 0.2, 0, { refl: 0.3 });
      for (const [bx, bz, s] of [[11.2, zF + 0.5, 1], [11.7, zF + 0.7, 0.8], [11.4, zF + 1.0, 0.9]]) { const b = add(new THREE.Mesh(new THREE.SphereGeometry(0.35 * s, 12, 10), bags)); b.scale.set(1, 0.8, 0.9); b.position.set(bx, 0.25 * s, bz); b.castShadow = true; }
      // Parked car at the curb
      this.carMats = {
        carPaint: outMat(0x3a0f12, 0.18, 0.6, { refl: 0.5 }), carGlass: outMat(0x06080a, 0.05, 0.2, { refl: 0.7 }), chrome: outMat(0xcfd3d8, 0.12, 1, { refl: 0.5 }),
        rubberBlack: outMat(0x0b0b0c, 0.7), tire: outMat(0x101012, 0.85), grilleDark: outMat(0x0a0a0b, 0.5, 0.5), carLens: outMat(0xd8dcdc, 0.1, 0, { refl: 0.4 }),
        tailLens: outMat(0x5a0808, 0.15, 0, { refl: 0.4 }), plate: new THREE.MeshStandardMaterial({ map: TX.plate(), roughness: 0.5, emissive: new THREE.Color(0.02, 0.02, 0.02) }),
      };
      this.carParts = P.build('ex:car', carSpecs());
      const parked = this.makeCar(); parked.position.set(7.8, -0.15, zF + 4.1); parked.rotation.y = 0.02; add(parked);
      // Passing car (hidden until it drives by)
      this.mover = this.makeCar(true); this.mover.visible = false; add(this.mover);
      // Utility wires across the street
      const wireMat = outMat(0x050505, 0.8);
      for (const k of [0, 1, 2]) {
        const pts = []; for (let q = 0; q <= 12; q++) { const t = q / 12; pts.push(new THREE.Vector3(U.lerp(-6, 30, t), 7.4 + k * 0.25 - Math.sin(t * PI) * 0.9, zF + 15.6 - k * 0.05)); }
        add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.012, 4), wireMat));
      }
      // Lightning: a shadowed directional flash so it only enters through the glass
      const lt = new THREE.DirectionalLight(0xc0d0ff, 0);
      lt.position.set(8, 30, zF + 40); lt.target.position.set(6, 0, zF - 8);
      lt.castShadow = PB.Settings.data.shadows > 0; lt.shadow.mapSize.set(1024, 1024); lt.shadow.bias = -0.0008;
      Object.assign(lt.shadow.camera, { left: -22, right: 22, top: 22, bottom: -22, near: 1, far: 80 });
      lt.visible = false;
      add(lt); add(lt.target); this.lightning = lt;
      this.buildRain(x0, x1);
      this.buildGlass();
    }
    makeCar(moving) {
      const grp = new THREE.Group();
      for (const part of this.carParts) {
        const m = new THREE.Mesh(part.geo, this.carMats[part.mat] || this.carMats.chrome);
        m.castShadow = true; m.receiveShadow = true;
        grp.add(m);
      }
      if (moving) {
        const hl = new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 6, 5.4) }), tl = new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 0.2, 0.15) });
        for (const z of [0.62, -0.62]) {
          const h = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.12), hl); h.position.set(2.41, 0.66, z); h.rotation.y = H; grp.add(h);
          const tt = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.12), tl); tt.position.set(-2.44, 0.72, z); tt.rotation.y = -H; grp.add(tt);
        }
        const beam = new THREE.SpotLight(0xfff2d8, 90, 30, 0.42, 0.6, 1.4);
        beam.position.set(2.5, 0.7, 0); beam.target.position.set(12, 0, 0);
        grp.add(beam); grp.add(beam.target);
        const red = new THREE.PointLight(0xff2010, 2, 5, 2); red.position.set(-2.8, 0.7, 0); grp.add(red);
        grp.userData.beam = beam;
      }
      return grp;
    }
    buildRain(x0, x1) {
      const zF = this.zF, g = this.w.group;
      const quality = PB.Settings.data.particles;
      const quad = new THREE.PlaneGeometry(1, 1);
      const mk = (count, vs, fs, uniforms, horiz) => {
        const geo = new THREE.InstancedBufferGeometry();
        geo.index = quad.index; geo.setAttribute('position', quad.getAttribute('position'));
        const seed = new Float32Array(count * 4); const r = U.rng(count + 17);
        for (let i = 0; i < count * 4; i++) seed[i] = r();
        geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 4));
        geo.instanceCount = count;
        const mat = new THREE.ShaderMaterial({ vertexShader: vs, fragmentShader: fs, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
        const m = new THREE.Mesh(geo, mat); m.frustumCulled = false; m.renderOrder = 3; m.userData.noPrepass = true;
        g.add(m);
        return mat;
      };
      this.rainU = [];
      const hole = new THREE.Vector4(0.2, zF - 1, 8.8, zF + 1.45);
      const common = () => ({ uTime: this.uTime, uCam: { value: new THREE.Vector3() }, uLamp: { value: this.lamp }, uFlash: { value: 0 }, uMask: { value: null }, uMaskSize: { value: new THREE.Vector2(1, 1) }, uHasMask: { value: 0 } });
      const rain = Object.assign(common(), { uMin: { value: new THREE.Vector3(x0 + 8, -0.15, zF + 0.25) }, uSize: { value: new THREE.Vector3(x1 - x0 - 16, 10, 16) }, uHole: { value: hole }, uHoleY: { value: 3.1 }, uLen: { value: 0.5 }, uSpeed: { value: 9 }, uWind: { value: 0.6 }, uAlpha: { value: 0.32 } });
      mk(Math.round(9000 * (0.4 + quality * 0.6)), RAIN_VS, RAIN_FS, rain);
      this.rainU.push(rain);
      // Drips from the awning edge
      const drip = Object.assign(common(), { uMin: { value: new THREE.Vector3(0.3, 0, zF + 1.5) }, uSize: { value: new THREE.Vector3(8.4, 2.6, 0.04) }, uHole: { value: new THREE.Vector4(0, 0, 0, 0) }, uHoleY: { value: 0 }, uLen: { value: 0.12 }, uSpeed: { value: 5 }, uWind: { value: 0 }, uAlpha: { value: 0.6 } });
      mk(160, RAIN_VS, RAIN_FS, drip);
      this.rainU.push(drip);
      // Downspout stream
      const sp = Object.assign(common(), { uMin: { value: new THREE.Vector3(this.spout.x - 0.05, -0.1, this.spout.z - 0.05) }, uSize: { value: new THREE.Vector3(0.1, 0.25, 0.1) }, uHole: { value: new THREE.Vector4(0, 0, 0, 0) }, uHoleY: { value: 0 }, uLen: { value: 0.2 }, uSpeed: { value: 2 }, uWind: { value: 0 }, uAlpha: { value: 0.8 } });
      mk(120, RAIN_VS, RAIN_FS, sp);
      this.rainU.push(sp);
      // Ground splashes
      const spl = { uTime: this.uTime, uLamp: { value: this.lamp }, uFlash: { value: 0 }, uMin: { value: new THREE.Vector3(x0 + 8, -0.148, zF + 0.3) }, uSize: { value: new THREE.Vector3(x1 - x0 - 16, 0, 16) }, uHole: { value: hole }, uMask: { value: null }, uMaskSize: { value: new THREE.Vector2(1, 1) }, uHasMask: { value: 0 } };
      mk(Math.round(1400 * (0.4 + quality * 0.6)), SPLASH_VS, SPLASH_FS, spl, true);
      this.rainU.push(spl);
    }
    buildGlass() {
      const L = this.L, C = this.C, zF = this.zF;
      const mat = new THREE.ShaderMaterial({
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: GLASS_FS,
        uniforms: { uTime: this.uTime, uFlash: { value: 0 }, uSize: { value: new THREE.Vector2(L.w * C, 2.2) }, uTint: { value: new THREE.Vector3(0.55, 0.62, 0.8) } },
        transparent: true, depthWrite: false,
      });
      this.glassMat = mat;
      // One pane per glass edge / glass door along the facade
      for (let x = 0; x < L.w; x++) {
        const glassEdge = L.edgeKind(x, L.h - 1, 2) === PB.LevelGen.EDGE.GLASS || L.doors.some(d => d.kind === 'glass' && d.x === x && d.y === L.h - 1);
        if (!glassEdge) continue;
        const m = new THREE.Mesh(new THREE.PlaneGeometry(C - 0.2, 2.2), mat);
        m.geometry.attributes.uv.array.forEach((v, i, a) => { if (i % 2 === 0) a[i] = (x * C + 0.1 + v * (C - 0.2)) / (L.w * C); });
        m.position.set(L.cx(x), 1.65, zF - 0.03); m.rotation.y = PI;
        m.userData.noPrepass = true; m.renderOrder = 4;
        this.w.group.add(m);
      }
    }
    update(dt, t, cam) {
      this.uTime.value = t;
      // Lightning: double/triple flicker, bolt visible in the sky, thunder later
      if (t > this.nextFlash) { this.nextFlash = t + U.lerp(9, 24, Math.random()); this.flashT = t; this.boltMesh.position.x = U.lerp(-10, 40, Math.random()); this.boltMesh.scale.x = Math.random() < 0.5 ? -1 : 1; this.thunderAt = t + U.lerp(0.8, 3.5, Math.random()); }
      const k = t - this.flashT;
      const fl = PB.Settings.data.reduceFlicker ? 0.35 : 1;
      let f = 0;
      if (k >= 0 && k < 0.7) f = (k < 0.07 ? 1 : k < 0.13 ? 0.15 : k < 0.2 ? 0.8 : k < 0.3 ? 0.1 : Math.max(0, 0.45 - (k - 0.3))) * fl;
      this.flash = f;
      this.lightning.visible = f > 0.01;
      this.lightning.intensity = f * 9;
      this.skyMat.uniforms.uFlash.value = f;
      this.bolt.opacity = k < 0.25 ? f : 0;
      this.glassMat.uniforms.uFlash.value = f;
      if (this.thunderAt && t > this.thunderAt) { this.thunderAt = 0; if (this.w.game.audio) this.w.game.audio.thunder(new THREE.Vector3(this.boltMesh.position.x, 10, this.zF + 40)); }
      for (const u of this.rainU) { u.uFlash.value = f; if (u.uCam) u.uCam.value.copy(cam); }
      // Neon buzz flicker
      const nf = U.hash2(Math.floor(t * 9), 3, 1) < 0.06 ? 0.2 : 1;
      this.neon.color.setScalar(2.2 * nf); this.neonLight.intensity = 3 * nf;
      // A car drives by now and then: headlights sweep the wet street, tires hiss
      if (!this.car && t > this.nextCar) {
        const dir = Math.random() < 0.5 ? 1 : -1;
        this.car = { dir, x: dir > 0 ? -30 : 50, z: this.zF + (dir > 0 ? 6.9 : 9.6), v: U.lerp(9, 14, Math.random()) };
        this.mover.visible = true; this.mover.rotation.y = dir > 0 ? 0 : PI;
        if (this.w.game.audio && this.w.game.audio.carPass) this.w.game.audio.carPass(this.mover.position, dir, this.car.v);
      }
      if (this.car) {
        const c = this.car;
        c.x += c.dir * c.v * dt;
        this.mover.position.set(c.x, -0.15, c.z);
        if ((c.dir > 0 && c.x > 50) || (c.dir < 0 && c.x < -30)) { this.car = null; this.mover.visible = false; this.nextCar = t + U.lerp(30, 75, Math.random()); }
      }
    }
  }
  // ------------------------------------------------------------ OPEN (outdoor levels: Maple Street)
  class Open {
    constructor(world) {
      this.w = world; this.L = world.L; this.C = world.C;
      this.uTime = { value: 0 }; this.flash = 0; this.nextFlash = 6 + Math.random() * 8; this.flashT = -9;
      this.lamp = new THREE.Vector3(); this.spout = null;
    }
    build() {
      const L = this.L, C = this.C, g = this.w.group, W = L.w * C, D = L.h * C;
      const add = m => { g.add(m); return m; };
      // Sky and distant houses
      const sky = new THREE.ShaderMaterial({ vertexShader: 'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }', fragmentShader: SKY_FS, uniforms: { uTime: this.uTime, uFlash: { value: 0 }, uSkyline: { value: null } }, side: THREE.BackSide, depthWrite: false, fog: false });
      this.skyMat = sky;
      const dome = add(new THREE.Mesh(new THREE.SphereGeometry(Math.min(58, W * 0.6), 32, 16), sky)); dome.position.set(W / 2, 0, D / 2); dome.renderOrder = -1;
      this.bolt = new THREE.MeshBasicMaterial({ map: TX.bolt(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, color: new THREE.Color(3, 3, 3.4), opacity: 0 });
      this.boltMesh = add(new THREE.Mesh(new THREE.PlaneGeometry(8, 30), this.bolt)); this.boltMesh.position.set(W / 2, 26, -40);
      // Street lamps (cobra heads) at the lamp lights
      const poleMat = outMat(0x3a3d40, 0.4, 0.8, { refl: 0.2 });
      const lensMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(4.4, 3.4, 2.2) });
      this.lamps = [];
      for (const l of L.meta.streetLamps || []) {
        const toward = l.z < D / 2 ? 1 : -1;
        const specs = [['lathe', 'x', [[0.001, 0], [0.2, 0], [0.2, 0.08], [0.14, 0.14], [0.11, 0.6], [0.09, 0.65], [0.08, 6.4], [0.06, 6.5], [0.001, 6.5]], 20], ['tube', 'x', [[0, 6.3, 0], [0, 6.9, 0.3], [0, 7.05, 1.2], [0, 7.0, 1.6]], 0.05, 10], ['lathe', 'x', [[0.001, 0.12], [0.22, 0.1], [0.3, 0.02], [0.3, -0.02], [0.2, -0.05], [0.001, -0.06]], 24, 0, 6.95, 1.9, 0, 0, 0, [1, 1, 1.9]]];
        for (const part of P.build('ex:lampO', specs)) { const m = add(new THREE.Mesh(part.geo, poleMat)); m.position.set(l.x, 0, l.z - toward * 1.9); m.rotation.y = toward > 0 ? 0 : PI; m.castShadow = true; }
        const lens = add(new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 8, 0, PI * 2, H, H), lensMat)); lens.scale.set(1, 0.25, 1.8); lens.position.set(l.x, l.y + 0.1, l.z);
        this.lamps.push(new THREE.Vector3(l.x, l.y, l.z));
      }
      // Rain over outdoor cells only (mask texture)
      const od = L.meta.outdoor, mask = new Uint8Array(L.w * L.h * 4);
      for (let i = 0; i < L.w * L.h; i++) { const v = od[i] ? 255 : 0; mask[i * 4] = mask[i * 4 + 1] = mask[i * 4 + 2] = v; mask[i * 4 + 3] = 255; }
      const mt = new THREE.DataTexture(mask, L.w, L.h); mt.needsUpdate = true; mt.minFilter = mt.magFilter = THREE.NearestFilter;
      this.buildRain(mt, W, D);
      // Lightning through the whole street, shadowed so the houses stay dark inside
      const lt = new THREE.DirectionalLight(0xc0d0ff, 0);
      lt.position.set(W / 2 + 10, 35, -20); lt.target.position.set(W / 2, 0, D / 2);
      lt.castShadow = PB.Settings.data.shadows > 0; lt.shadow.mapSize.set(2048, 2048); lt.shadow.bias = -0.0008;
      Object.assign(lt.shadow.camera, { left: -W * 0.6, right: W * 0.6, top: D, bottom: -D, near: 1, far: 120 });
      lt.visible = false; add(lt); add(lt.target); this.lightning = lt;
    }
    buildRain(mask, W, D) {
      const g = this.w.group, quality = PB.Settings.data.particles;
      const quad = new THREE.PlaneGeometry(1, 1);
      const mk = (count, vs, fs, uniforms) => {
        const geo = new THREE.InstancedBufferGeometry();
        geo.index = quad.index; geo.setAttribute('position', quad.getAttribute('position'));
        const seed = new Float32Array(count * 4); const r = U.rng(count + 29);
        for (let i = 0; i < count * 4; i++) seed[i] = r();
        geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 4));
        geo.instanceCount = count;
        const mat = new THREE.ShaderMaterial({ vertexShader: vs, fragmentShader: fs, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
        const m = new THREE.Mesh(geo, mat); m.frustumCulled = false; m.renderOrder = 3; m.userData.noPrepass = true;
        g.add(m);
        return mat;
      };
      const mk2 = () => ({ uTime: this.uTime, uCam: { value: new THREE.Vector3() }, uLamp: { value: this.lamp }, uFlash: { value: 0 }, uMask: { value: mask }, uMaskSize: { value: new THREE.Vector2(W, D) }, uHasMask: { value: 1 }, uHole: { value: new THREE.Vector4(0, 0, 0, 0) }, uHoleY: { value: 0 } });
      // Rain follows the camera (a 36 m box around it) so the whole street is covered
      this.rain = Object.assign(mk2(), { uMin: { value: new THREE.Vector3() }, uSize: { value: new THREE.Vector3(36, 10, 36) }, uLen: { value: 0.5 }, uSpeed: { value: 9 }, uWind: { value: 0.5 }, uAlpha: { value: 0.3 } });
      mk(Math.round(12000 * (0.4 + quality * 0.6)), RAIN_VS, RAIN_FS, this.rain);
      this.splash = Object.assign(mk2(), { uMin: { value: new THREE.Vector3() }, uSize: { value: new THREE.Vector3(30, 0, 30) } });
      mk(Math.round(1800 * (0.4 + quality * 0.6)), SPLASH_VS, SPLASH_FS, this.splash);
    }
    update(dt, t, cam) {
      this.uTime.value = t;
      // Nearest lamp lights the rain around the player
      let best = null, bd = Infinity;
      for (const l of this.lamps) { const d = Math.hypot(l.x - cam.x, l.z - cam.z); if (d < bd) { bd = d; best = l; } }
      if (best) this.lamp.copy(best);
      this.rain.uMin.value.set(cam.x - 18, 0, cam.z - 18);
      this.splash.uMin.value.set(cam.x - 15, 0.004, cam.z - 15);
      if (t > this.nextFlash) { this.nextFlash = t + U.lerp(10, 26, Math.random()); this.flashT = t; this.boltMesh.position.x = cam.x + U.lerp(-30, 30, Math.random()); this.thunderAt = t + U.lerp(0.6, 3, Math.random()); }
      const k = t - this.flashT, fl = PB.Settings.data.reduceFlicker ? 0.35 : 1;
      let f = 0;
      if (k >= 0 && k < 0.7) f = (k < 0.07 ? 1 : k < 0.13 ? 0.15 : k < 0.2 ? 0.8 : k < 0.3 ? 0.1 : Math.max(0, 0.45 - (k - 0.3))) * fl;
      this.flash = f;
      this.lightning.visible = f > 0.01; this.lightning.intensity = f * 5;
      this.skyMat.uniforms.uFlash.value = f; this.bolt.opacity = k < 0.25 ? f : 0;
      this.rain.uFlash.value = f; this.splash.uFlash.value = f; this.rain.uCam.value.copy(cam);
      if (this.thunderAt && t > this.thunderAt) { this.thunderAt = 0; if (this.w.game.audio) this.w.game.audio.thunder(new THREE.Vector3(this.boltMesh.position.x, 10, -40)); }
    }
  }
  PB.Exterior.Open = Open;
  PB.Exterior.wetPatch = wetPatch;
  PB.Exterior.Street = Street;
  PB.Exterior.TX = TX;
})(typeof window !== 'undefined' ? window : globalThis);
