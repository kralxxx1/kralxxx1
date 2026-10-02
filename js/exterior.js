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
    // A main-street building front drawn at its real size (k px per meter): brick or stucco, a shop
    // front with its sign band, upper-floor windows. Returns the color map and a glow map that holds
    // only what gives light (lit windows, the sign, a lit shop).
    facade2: (key, o) => {
      const k = o.k, W = Math.max(64, Math.round(o.w * k)), Hh = Math.max(64, Math.round(o.h * k));
      const r = U.rng(U.hashStr(key));
      const Y = m => Hh - m * k;
      // Layout
      const winW = 1.1, winH = 1.6, pitch = r.range(2.3, 2.8);
      const nWin = Math.max(1, Math.floor((o.w - 0.8) / pitch));
      const off = (o.w - (nWin - 1) * pitch) / 2;
      const wins = [];
      for (let f = 0; f < o.floors; f++) for (let i = 0; i < nWin; i++) wins.push({ x: off + i * pitch, y: 4.9 + f * 3.3, lit: r() < 0.14, tv: r() < 0.25, curtain: r() < 0.6, broken: r() < 0.05 });
      const door = r() < 0.5 ? 0.9 : o.w - 1.9;
      const map = T.canvas('ex:f2:' + key, W, Hh, (g, w, h) => {
        g.fillStyle = o.col; g.fillRect(0, 0, w, h);
        if (o.kind === 'brick') {
          for (let y = 0; y < h; y += 4) { g.fillStyle = `rgba(0,0,0,${0.05 + r() * 0.08})`; g.fillRect(0, y, w, 1); }
          for (let q = 0; q < w * h / 40; q++) { const v = r(); g.fillStyle = v < 0.5 ? `rgba(0,0,0,${v * 0.18})` : `rgba(255,220,200,${(v - 0.5) * 0.08})`; g.fillRect(r() * w, r() * h, 3, 2); }
        } else {
          for (let q = 0; q < w * h / 30; q++) { const v = r(); g.fillStyle = v < 0.5 ? `rgba(0,0,0,${v * 0.1})` : `rgba(255,255,255,${(v - 0.5) * 0.06})`; g.fillRect(r() * w, r() * h, 2, 2); }
        }
        // Rain streaks and grime running down from the roof and sills
        for (let q = 0; q < w / 6; q++) { const x = r() * w, len = r.range(0.5, 4) * k; g.fillStyle = `rgba(20,16,12,${r.range(0.05, 0.2)})`; g.fillRect(x, r() * h * 0.6, r.range(1, 3), len); }
        // Upper floors
        for (const wd of wins) {
          const x = wd.x * k - winW * k / 2, y = Y(wd.y + winH);
          g.fillStyle = '#9a9488'; g.fillRect(x - 5, Y(wd.y) , winW * k + 10, 6); g.fillRect(x - 4, y - 7, winW * k + 8, 7);
          g.fillStyle = wd.lit ? (wd.tv ? '#3a4a78' : '#6a4a24') : '#07090d'; g.fillRect(x, y, winW * k, winH * k);
          if (!wd.lit) { const grd = g.createLinearGradient(x, y, x + winW * k, y + winH * k); grd.addColorStop(0, 'rgba(120,140,170,0.14)'); grd.addColorStop(0.5, 'rgba(0,0,0,0)'); grd.addColorStop(1, 'rgba(90,100,120,0.08)'); g.fillStyle = grd; g.fillRect(x, y, winW * k, winH * k); }
          if (wd.curtain) { g.fillStyle = wd.lit ? 'rgba(90,40,30,0.8)' : 'rgba(40,30,28,0.6)'; g.fillRect(x, y, winW * k * 0.3, winH * k); g.fillRect(x + winW * k * 0.72, y, winW * k * 0.28, winH * k); }
          if (wd.broken) { g.strokeStyle = 'rgba(200,210,220,0.5)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x + 4, y + 6); g.lineTo(x + winW * k * 0.6, y + winH * k * 0.4); g.lineTo(x + winW * k * 0.3, y + winH * k * 0.9); g.stroke(); }
          g.fillStyle = '#1c1a18'; g.fillRect(x + winW * k / 2 - 1.5, y, 3, winH * k); g.fillRect(x, y + winH * k * 0.5 - 1.5, winW * k, 3);
        }
        // Shop front
        g.fillStyle = '#1a1816'; g.fillRect(0, Y(4), w, 4 * k);
        g.fillStyle = '#2a2622'; g.fillRect(0, Y(0.6), w, 0.6 * k);
        const winX0 = 0.4 * k, winX1 = w - 0.4 * k;
        if (o.shut) {
          g.fillStyle = '#5a5c60'; g.fillRect(winX0, Y(3.1), winX1 - winX0, 2.5 * k);
          g.fillStyle = 'rgba(0,0,0,0.35)'; for (let y = Y(3.1); y < Y(0.6); y += 5) g.fillRect(winX0, y, winX1 - winX0, 1.5);
          g.save(); g.fillStyle = r() < 0.5 ? 'rgba(200,40,40,0.7)' : 'rgba(40,40,40,0.7)'; g.font = `bold ${Math.round(0.6 * k)}px ${T.FONTS.FONT_HAND}`; g.fillText(r() < 0.5 ? 'CLOSED' : 'NO EXIT', winX0 + r.range(0.3, 2) * k, Y(1.6)); g.restore();
        } else {
          g.fillStyle = o.lit ? '#6a5a40' : '#05070a'; g.fillRect(winX0, Y(3.1), winX1 - winX0, 2.5 * k);
          if (o.lit) { g.fillStyle = 'rgba(40,30,20,0.8)'; for (let q = 0; q < 5; q++) g.fillRect(winX0 + r.range(0.3, o.w - 1.5) * k, Y(r.range(1.2, 2.2)), r.range(0.4, 1.2) * k, r.range(0.3, 0.9) * k); }
          const grd = g.createLinearGradient(0, Y(3.1), 0, Y(0.6)); grd.addColorStop(0, 'rgba(150,170,200,0.18)'); grd.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = grd; g.fillRect(winX0, Y(3.1), winX1 - winX0, 2.5 * k);
          g.fillStyle = '#2c2a28'; for (let x = winX0; x < winX1; x += 2.2 * k) g.fillRect(x, Y(3.1), 4, 2.5 * k);
        }
        g.fillStyle = '#0e0d0c'; g.fillRect(door * k, Y(2.3), 0.95 * k, 2.3 * k);
        g.fillStyle = 'rgba(120,130,150,0.18)'; g.fillRect(door * k + 6, Y(2.15), 0.95 * k - 12, 1.2 * k);
        // Sign band
        g.fillStyle = '#231f1b'; g.fillRect(0.2 * k, Y(3.9), w - 0.4 * k, 0.75 * k);
        if (o.sign) { g.fillStyle = o.lit ? '#f4e2b0' : '#b8ab90'; g.font = `bold ${Math.round(0.5 * k)}px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText(o.sign, w / 2, Y(3.33)); g.textAlign = 'left'; }
        // Roof line
        g.fillStyle = '#8a8478'; g.fillRect(0, 0, w, 0.25 * k);
      }, { readback: false });
      map.colorSpace = THREE.SRGBColorSpace;
      const glow = T.canvas('ex:f2g:' + key, W >> 1, Hh >> 1, (g, w, h) => {
        const kk = k / 2, Yh = m => h - m * kk;
        g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
        for (const wd of wins) if (wd.lit) {
          const x = wd.x * kk - winW * kk / 2, y = Yh(wd.y + winH);
          g.fillStyle = wd.tv ? 'rgba(80,110,220,0.9)' : 'rgba(255,170,80,0.85)'; g.fillRect(x, y, winW * kk, winH * kk);
          if (wd.curtain) { g.fillStyle = 'rgba(0,0,0,0.75)'; g.fillRect(x, y, winW * kk * 0.3, winH * kk); g.fillRect(x + winW * kk * 0.72, y, winW * kk * 0.28, winH * kk); }
        }
        if (o.lit && !o.shut) { g.fillStyle = 'rgba(255,200,130,0.45)'; g.fillRect(0.4 * kk, Yh(3.1), w - 0.8 * kk, 2.5 * kk); }
        if (o.lit && o.sign) { g.fillStyle = 'rgba(255,230,170,0.9)'; g.font = `bold ${Math.round(0.5 * kk)}px ${T.FONTS.FONT_TYPE}`; g.textAlign = 'center'; g.fillText(o.sign, w / 2, Yh(3.33)); }
      }, { readback: false });
      glow.colorSpace = THREE.SRGBColorSpace;
      return { map, glow };
    },
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
    // The baked-light patch may already declare uTime
    const tDecl = /uniform\s+float\s+uTime\s*;/.test(sh.fragmentShader) ? '' : 'uniform float uTime; ';
    sh.fragmentShader = `varying vec3 vExW; ${tDecl}uniform sampler2D uPud; uniform float uPudScale; uniform float uWet;
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
      const zF = L.h * C, x0 = -78, x1 = L.w * C + 80;
      this.xi = L.w * C + 30;   // cross street
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
      // Buildings: a continuous main street on both sides, broken by a cross street
      this.buildBlocks(x0, x1);
      // Neon sign across the street (flickers)
      const neonTex = TX.neonSign('LAUNDROMAT', '#35a8ff');
      this.neon = new THREE.MeshBasicMaterial({ map: neonTex, transparent: true, depthWrite: false, color: new THREE.Color(2.2, 2.2, 2.2) });
      const nm = plane(4.2, 1.05, this.neon, 5, 3.4, zF + 16.2, 0, PI); nm.renderOrder = 2;
      this.neonLight = add(new THREE.PointLight(0x35a8ff, 3, 9, 2)); this.neonLight.position.set(5, 3.2, zF + 15.2);
      // Skyline and sky
      const sky = new THREE.ShaderMaterial({ vertexShader: 'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }', fragmentShader: SKY_FS, uniforms: { uTime: this.uTime, uFlash: { value: 0 }, uSkyline: { value: null } }, side: THREE.BackSide, depthWrite: false, fog: false });
      this.skyMat = sky;
      const dome = add(new THREE.Mesh(new THREE.SphereGeometry(40, 32, 16), sky)); dome.position.set(L.w * C / 2, 0, zF); dome.renderOrder = -1; dome.frustumCulled = false;
      this.dome = dome;
      const skl = new THREE.MeshBasicMaterial({ map: TX.skyline(), transparent: true, depthWrite: false, fog: false, color: new THREE.Color(1.2, 1.2, 1.2) });
      const sk = plane(260, 40, skl, L.w * C / 2, 18, zF + 70, 0, PI); sk.renderOrder = 0;
      this.bolt = new THREE.MeshBasicMaterial({ map: TX.bolt(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, color: new THREE.Color(3, 3, 3.4), opacity: 0 });
      this.boltMesh = plane(8, 30, this.bolt, 20, 30, zF + 75, 0, PI);
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
      // Parked cars along both curbs, and one that drives by now and then
      this.buildCars();
      this.buildLamps(x0, x1);
      this.buildTrees(x0, x1);
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
    // ---------------------------------------------------------- street blocks
    buildBlocks(x0, x1) {
      const L = this.L, C = this.C, g = this.w.group, zF = this.zF, W = L.w * C, xi = this.xi;
      const r = U.rng(1994);
      const shops = ['HARLOW HARDWARE', 'VIDEO KING', 'DINER', 'FOR LEASE', 'PAWN & LOAN', 'BARBER', 'LAUNDROMAT', 'DRUGS', 'SHOE REPAIR', 'TAVERN', 'FIVE & DIME', 'INSURANCE', 'TV REPAIR', 'BAKERY', '', 'FOR LEASE', 'QUICK LOANS', 'RECORDS'];
      const walls = [['brick', '#5a2c20'], ['brick', '#6a3a28'], ['brick', '#4a3228'], ['stucco', '#8a8274'], ['brick', '#5e4a3c'], ['stucco', '#6e6a60'], ['brick', '#3e2a24']];
      const sideMat = new THREE.MeshStandardMaterial({ color: 0x2a201c, roughness: 0.9 });
      const roofMat = new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.8 });
      const corniceMat = outMat(0x8a8478, 0.7, 0, { refl: 0.1 });
      const box = new THREE.BoxGeometry(1, 1, 1);
      let n = 0;
      const row = (from, to, zFront, facing, skip) => {
        for (let x = from; x < to - 3;) {
          if (skip && x + 6 > skip[0] && x < skip[1]) { x = skip[1]; continue; }
          let bw = r.range(7, 13);
          if (skip && x < skip[0] && x + bw > skip[0]) bw = skip[0] - x;
          bw = Math.min(bw, to - x);
          if (bw < 4) { x += bw; continue; }
          const floors = r.int(1, 3), bh = 4.2 + floors * 3.3 + r.range(-0.2, 0.6), bd = r.range(9, 14);
          const [kind, col] = walls[r.int(0, walls.length - 1)];
          const sign = shops[(n++) % shops.length];
          const lit = r() < 0.25;
          const key = 'b' + n + ':' + Math.round(x);
          const tx = TX.facade2(key, { w: bw, h: bh, floors, kind, col, sign, lit, shut: !lit && r() < 0.4, k: 44 });
          const front = new THREE.MeshStandardMaterial({ map: tx.map, emissiveMap: tx.glow, emissive: new THREE.Color(1, 1, 1), roughness: 0.82 });
          front.userData.refl = 0.05;
          const mats = [sideMat, sideMat, roofMat, roofMat, facing > 0 ? front : sideMat, facing > 0 ? sideMat : front];
          const m = new THREE.Mesh(box, mats);
          m.scale.set(bw, bh, bd);
          m.position.set(x + bw / 2, bh / 2, zFront - facing * bd / 2);
          m.receiveShadow = true;
          g.add(m);
          // Cornice along the roof line
          const c = new THREE.Mesh(box, corniceMat); c.scale.set(bw + 0.1, 0.35, 0.4); c.position.set(x + bw / 2, bh - 0.18, zFront + facing * 0.15); g.add(c);
          // Storefront sign band ledge
          const b = new THREE.Mesh(box, corniceMat); b.scale.set(bw, 0.12, 0.25); b.position.set(x + bw / 2, 3.95, zFront + facing * 0.1); g.add(b);
          x += bw + (r() < 0.12 ? r.range(1.5, 3) : 0.05);
        }
      };
      // Across the street, facing it (-z)
      row(x0, x1, zF + 16.4, -1, [xi - 7, xi + 7]);
      // This side, left and right of the arcade, facing the street (+z)
      row(x0, -0.3, zF, 1, null);
      row(W + 0.3, x1, zF, 1, [xi - 7, xi + 7]);
      // The cross street: asphalt running away on both sides, crosswalks
      const asph = TX.asphalt().clone(); asph.needsUpdate = true; asph.wrapS = asph.wrapT = THREE.RepeatWrapping; asph.repeat.set(2, 20);
      const cross = new THREE.Mesh(new THREE.PlaneGeometry(12, 130), wetMaterial(asph, { rough: 0.42, refl: 0.6, amb: 0x040507, pudScale: 0.09 }, this.uTime));
      cross.rotation.x = -H; cross.position.set(xi, -0.152, zF + 8.2); cross.receiveShadow = true; g.add(cross);
      const stripe = outMat(0xd8d4c8, 0.5, 0, { refl: 0.3, amb: 0x0a0a0a });
      const pl = new THREE.PlaneGeometry(0.5, 3);
      for (const cx of [xi - 7.6, xi + 7.6]) for (let k = 0; k < 18; k++) { const m = new THREE.Mesh(pl, stripe); m.rotation.x = -H; m.position.set(cx, -0.146, zF + 3.6 + k * 0.56); m.rotation.z = H; m.scale.set(1, 0.5, 1); g.add(m); }
      // Traffic signal hanging over the intersection, blinking yellow at night
      const sig = new THREE.Group(); sig.position.set(xi, 5.6, zF + 8.2); g.add(sig);
      const sigMat = outMat(0x2a2a1a, 0.5, 0.3);
      for (const a of [0, H, PI, -H]) {
        const hsg = new THREE.Mesh(PB.Models.roundedBox(0.35, 1.0, 0.3, 0.04, 2), sigMat); hsg.position.set(Math.sin(a) * 0.2, 0, Math.cos(a) * 0.2); hsg.rotation.y = a; sig.add(hsg);
      }
      this.sigLamp = new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2.2, 0.4) });
      for (const a of [0, H, PI, -H]) { const l = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), this.sigLamp); l.position.set(Math.sin(a) * 0.36, 0, Math.cos(a) * 0.36); l.rotation.y = a; sig.add(l); }
      const wire = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(xi - 8, 7.4, zF + 2.2), new THREE.Vector3(xi, 6.3, zF + 8.2), new THREE.Vector3(xi + 8, 7.4, zF + 14.2)]), 20, 0.015, 4), outMat(0x050505, 0.8)); g.add(wire);
      for (const [px, pz] of [[xi - 8, zF + 2.2], [xi + 8, zF + 14.2]]) { const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 7.6, 10), outMat(0x3a3028, 0.8)); pole.position.set(px, 3.8, pz); g.add(pole); }
    }
    // ---------------------------------------------------------- vehicles
    carMat(name, o) {
      const cm = this.carMats || (this.carMats = {});
      if (name === 'paint') {
        const k = 'paint:' + o.key;
        if (!cm[k]) { const tex = PB.Vehicles.paintTex(o); cm[k] = outMat(0xffffff, 0.32, 0.08, { refl: 0.45, amb: 0x020203, extra: { map: tex } }); }
        return cm[k];
      }
      if (name === 'plate') {
        const k = 'plate:' + (o.plate || 'x');
        if (!cm[k]) cm[k] = new THREE.MeshStandardMaterial({ map: PB.Vehicles.TX.plate(o.plate || 'HRL 227'), roughness: 0.5, emissive: new THREE.Color(0.015, 0.015, 0.015) });
        return cm[k];
      }
      if (!cm[name]) {
        const f = {
          glass: () => outMat(0x05070a, 0.04, 0.3, { refl: 0.85, amb: 0x000000 }),
          chrome: () => outMat(0xcfd3d8, 0.14, 1, { refl: 0.5 }), rubber: () => outMat(0x0b0b0c, 0.75), under: () => outMat(0x050506, 0.9),
          tire: () => outMat(0x121214, 0.85), rim: () => outMat(0xa8acb0, 0.3, 0.9, { refl: 0.4 }), rimDark: () => outMat(0x1a1b1c, 0.5, 0.6),
          grille: () => outMat(0x0a0a0b, 0.5, 0.5), headLens: () => outMat(0xd8dcdc, 0.08, 0, { refl: 0.5 }), tailLens: () => outMat(0x5a0808, 0.15, 0, { refl: 0.4 }),
          amber: () => outMat(0x8a5010, 0.2, 0, { refl: 0.3 }), mirror: () => outMat(0xffffff, 0.02, 1, { refl: 0.9 }),
          headOn: () => new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 6, 5.4) }), tailOn: () => new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 0.2, 0.15) }),
          interior: () => outMat(0x141210, 0.9), seat: () => outMat(0x2a1e18, 0.95), bedLiner: () => outMat(0x0e0e0f, 0.9),
        }[name];
        cm[name] = f ? f() : outMat(0x111111, 0.7);
      }
      return cm[name];
    }
    buildCars() {
      const g = this.w.group, zF = this.zF, W = this.L.w * this.C;
      const nearZ = zF + 3.95, farZ = zF + 12.45, y = -0.15;
      const list = [
        // Sam's pickup in front of the arcade: the flashlight he forgot is in its cab
        { type: 'pickup', color: 0x2f4a36, key: 'sam', plate: 'SAM 207', rust: 0.8, x: 4.8, z: nearZ, rot: 0.01 },
        { type: 'sedan', color: 0x5a1418, key: 'c1', plate: 'HRL 119', rust: 0.5, x: 11.8, z: nearZ, rot: -0.02 },
        { type: 'wagon', color: 0x1d3a5c, key: 'c2', plate: 'KTY 408', rust: 0.3, x: -8.5, z: nearZ, rot: 0.02 },
        { type: 'sedan', color: 0xb8ad90, key: 'c3', plate: 'MPL 511', rust: 0.2, x: -24, z: nearZ, rot: 0 },
        { type: 'van', color: 0xe4e2da, key: 'c4', plate: 'WLT 1987', rust: 0.7, x: W + 12, z: nearZ, rot: -0.01 },
        { type: 'sedan', color: 0x4a4e52, key: 'c5', plate: 'ILL 330', rust: 0.1, x: 2, z: farZ, rot: PI + 0.01 },
        { type: 'sedan', color: 0x28402a, key: 'c6', plate: 'HRL 884', rust: 0.4, x: 17, z: farZ, rot: PI },
        { type: 'wagon', color: 0x5c4030, key: 'c7', plate: 'OAK 172', rust: 0.6, x: -15, z: farZ, rot: PI - 0.02 },
        { type: 'pickup', color: 0x7a1a14, key: 'c8', plate: 'FRM 66', rust: 0.9, x: W + 44, z: farZ, rot: PI },
        { type: 'sedan', color: 0xd0d0c8, key: 'c9', plate: 'HRL 402', rust: 0.2, x: -42, z: nearZ, rot: 0.01 },
      ];
      this.parked = [];
      for (const o of list) {
        const car = PB.Vehicles.make(o, (n, oo) => this.carMat(n, oo));
        car.position.set(o.x, y, o.z); car.rotation.y = o.rot;
        g.add(car); this.parked.push(car);
      }
      // The passing car: lit, parked out of sight until it drives by
      const mv = { type: 'sedan', color: 0x2a2c30, key: 'mover', plate: 'HRL 915', lit: true };
      this.mover = PB.Vehicles.make(mv, (n, oo) => this.carMat(n, oo));
      const beam = new THREE.SpotLight(0xfff2d8, 90, 30, 0.42, 0.6, 1.4);
      beam.position.set(2.7, 0.7, 0); beam.target.position.set(12, 0, 0);
      this.mover.add(beam); this.mover.add(beam.target);
      const red = new THREE.PointLight(0xff2010, 2, 5, 2); red.position.set(-2.9, 0.7, 0); this.mover.add(red);
      this.mover.userData.beam = beam;
      this.mover.visible = false;
      g.add(this.mover);
    }
    // ---------------------------------------------------------- street lamps
    buildLamps(x0, x1) {
      const g = this.w.group, zF = this.zF, P2 = PB.Props;
      const poleMat = outMat(0x3a3d40, 0.4, 0.8, { refl: 0.2 });
      const lampSpecs = [
        ['lathe', 'x', [[0.001, 0], [0.2, 0], [0.2, 0.08], [0.14, 0.14], [0.11, 0.6], [0.09, 0.65], [0.08, 6.4], [0.06, 6.5], [0.001, 6.5]], 20],
        ['tube', 'x', [[0, 6.3, 0], [0, 6.9, -0.3], [0, 7.05, -1.2], [0, 7.0, -1.9]], 0.05, 10],
        ['lathe', 'x', [[0.001, 0.12], [0.22, 0.1], [0.3, 0.02], [0.3, -0.02], [0.2, -0.05], [0.001, -0.06]], 24, 0, 6.95, -2.2, 0, 0, 0, [1, 1, 1.9]],
      ];
      const spots = [];
      const near0 = this.lamp.x;
      for (let x = near0 - 26 * 3; x < x1 - 4; x += 26) if (Math.abs(x - near0) > 1 && x > x0 + 4) spots.push([x, zF + 2.7, 0]);
      for (let x = near0 - 13 - 26 * 3; x < x1 - 4; x += 26) if (x > x0 + 4 && Math.abs(x - this.xi) > 8) spots.push([x, zF + 13.7, PI]);
      const parts = P2.build('ex:lamp', lampSpecs);
      const dummy = new THREE.Object3D();
      for (const part of parts) {
        const im = new THREE.InstancedMesh(part.geo, poleMat, spots.length);
        spots.forEach(([x, z, ry], k) => { dummy.position.set(x, 0, z); dummy.rotation.set(0, ry === 0 ? PI : 0, 0); dummy.updateMatrix(); im.setMatrixAt(k, dummy.matrix); });
        im.castShadow = true; g.add(im);
      }
      // Lens, a halo in the rain, and the pool of light they throw on the wet ground
      const lensMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(4.2, 4.4, 5.2) });
      const lens = new THREE.InstancedMesh(new THREE.SphereGeometry(0.26, 20, 8, 0, PI * 2, H, H), lensMat, spots.length);
      const poolTex = T.canvas('ex:pool', 256, 256, (c, w, h) => { const grd = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); grd.addColorStop(0, 'rgba(255,255,255,0.9)'); grd.addColorStop(0.35, 'rgba(255,255,255,0.35)'); grd.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = grd; c.fillRect(0, 0, w, h); });
      const poolMat = new THREE.MeshBasicMaterial({ map: poolTex, color: new THREE.Color(0.18, 0.2, 0.26), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: true });
      const pool = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), poolMat, spots.length);
      const haloMat = new THREE.MeshBasicMaterial({ map: poolTex, color: new THREE.Color(0.35, 0.38, 0.5), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: true });
      const halo = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), haloMat, spots.length);
      spots.forEach(([x, z, ry], k) => {
        const dz = ry === 0 ? 2.2 : -2.2;
        dummy.position.set(x, 6.9, z + dz); dummy.rotation.set(0, 0, 0); dummy.scale.set(1, 0.25, 1.8); dummy.updateMatrix(); lens.setMatrixAt(k, dummy.matrix);
        dummy.position.set(x, -0.1, z + dz * 1.2); dummy.rotation.set(-H, 0, 0); dummy.scale.set(11, 11, 1); dummy.updateMatrix(); pool.setMatrixAt(k, dummy.matrix);
        dummy.position.set(x, 6.7, z + dz); dummy.rotation.set(0, 0, 0); dummy.scale.set(3.2, 3.2, 1); dummy.updateMatrix(); halo.setMatrixAt(k, dummy.matrix);
      });
      pool.renderOrder = 2; halo.renderOrder = 3;
      pool.userData.noPrepass = true; halo.userData.noPrepass = true;
      g.add(lens, pool, halo);
      this.halo = halo;
    }
    // ---------------------------------------------------------- bare November trees in sidewalk grates
    buildTrees(x0, x1) {
      const g = this.w.group, zF = this.zF, W = this.L.w * this.C;
      const r = U.rng(311);
      const bark = outMat(0x1a1512, 0.8, 0, { refl: 0.1 });
      const geos = [];
      const branch = (list, p, dir, len, rad, depth) => {
        const end = p.clone().addScaledVector(dir, len);
        const cyl = new THREE.CylinderGeometry(rad * 0.7, rad, len, 6, 1, true);
        cyl.translate(0, len / 2, 0);
        cyl.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir));
        cyl.translate(p.x, p.y, p.z);
        list.push(cyl.toNonIndexed()); cyl.dispose();
        if (depth <= 0 || rad < 0.012) return;
        const kids = depth > 2 ? 3 : 2;
        for (let k = 0; k < kids; k++) {
          const d = dir.clone().add(new THREE.Vector3(r.range(-0.8, 0.8), r.range(0.1, 0.6), r.range(-0.8, 0.8))).normalize();
          branch(list, end, d, len * r.range(0.6, 0.8), rad * 0.62, depth - 1);
        }
      };
      const variants = [];
      for (let v = 0; v < 2; v++) {
        const list = [];
        branch(list, new THREE.Vector3(0, 0, 0), new THREE.Vector3(r.range(-0.05, 0.05), 1, r.range(-0.05, 0.05)).normalize(), 2.4, 0.13, 5);
        variants.push(PB.Props.merge(list));
      }
      const spots = [];
      for (let x = -6; x > x0 + 4; x -= r.range(11, 17)) spots.push([x, zF + 2.2]);
      for (let x = W + 5; x < x1 - 4; x += r.range(11, 17)) if (Math.abs(x - this.xi) > 8) spots.push([x, zF + 2.2]);
      for (let x = x0 + 8; x < x1 - 4; x += r.range(10, 16)) if (Math.abs(x - this.xi) > 8 && Math.abs(x - 5) > 3) spots.push([x, zF + 14.4]);
      const dummy = new THREE.Object3D();
      variants.forEach((geo, v) => {
        const mine = spots.filter((s, k) => k % 2 === v);
        const im = new THREE.InstancedMesh(geo, bark, mine.length);
        mine.forEach(([x, z], k) => { dummy.position.set(x, 0, z); dummy.rotation.set(0, r() * 6.28, 0); const s = r.range(0.85, 1.25); dummy.scale.set(s, s, s); dummy.updateMatrix(); im.setMatrixAt(k, dummy.matrix); });
        im.castShadow = true; im.receiveShadow = true;
        g.add(im);
      });
      // Iron grates around the trunks
      const grate = new THREE.InstancedMesh(new THREE.PlaneGeometry(1.2, 1.2), outMat(0x151515, 0.5, 0.8, { refl: 0.3 }), spots.length);
      spots.forEach(([x, z], k) => { dummy.position.set(x, 0.008, z); dummy.rotation.set(-H, 0, 0); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); grate.setMatrixAt(k, dummy.matrix); });
      g.add(grate);
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
      if (this.dome) this.dome.position.set(cam.x, 0, cam.z);
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
      if (this.sigLamp) this.sigLamp.color.setRGB(...(Math.floor(t * 1.4) % 2 ? [3, 2.2, 0.4] : [0.05, 0.04, 0.01]));
      // Neon buzz flicker
      const nf = U.hash2(Math.floor(t * 9), 3, 1) < 0.06 ? 0.2 : 1;
      this.neon.color.setScalar(2.2 * nf); this.neonLight.intensity = 3 * nf;
      // A car drives by now and then: headlights sweep the wet street, tires hiss
      if (!this.car && t > this.nextCar) {
        const dir = Math.random() < 0.5 ? 1 : -1;
        this.car = { dir, x: dir > 0 ? -70 : this.L.w * this.C + 72, z: this.zF + (dir > 0 ? 6.9 : 9.6), v: U.lerp(9, 14, Math.random()) };
        this.mover.visible = true; this.mover.rotation.y = dir > 0 ? 0 : PI;
        if (this.w.game.audio && this.w.game.audio.carPass) this.w.game.audio.carPass(this.mover.position, dir, this.car.v);
      }
      if (this.car) {
        const c = this.car;
        c.x += c.dir * c.v * dt;
        this.mover.position.set(c.x, -0.15, c.z);
        // Slows for the flashing signal at the crossing
        const dxi = (this.xi - c.x) * c.dir;
        c.v = U.damp(c.v, dxi > 0 && dxi < 18 ? 7 : c.vMax || (c.vMax = c.v), 1.5, dt);
        if ((c.dir > 0 && c.x > this.L.w * this.C + 74) || (c.dir < 0 && c.x < -72)) { this.car = null; this.mover.visible = false; this.nextCar = t + U.lerp(25, 60, Math.random()); }
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
      // The sky rides along with the camera: it never ends, and it is never cut by the far plane
      const dome = add(new THREE.Mesh(new THREE.SphereGeometry(40, 32, 16), sky)); dome.position.set(W / 2, 0, D / 2); dome.renderOrder = -1; dome.frustumCulled = false;
      this.dome = dome;
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
      if (this.dome) this.dome.position.set(cam.x, 0, cam.z);
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
  PB.Exterior.SH = { RAIN_VS, RAIN_FS, SPLASH_VS, SPLASH_FS };
  PB.Exterior.outMat = outMat;
  PB.Exterior.wetPatch = wetPatch;
  PB.Exterior.Street = Street;
  PB.Exterior.TX = TX;
})(typeof window !== 'undefined' ? window : globalThis);
