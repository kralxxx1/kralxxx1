/* Post-processing pipeline (HDR):
   depth/normal prepass → scene → ambient occlusion (SAO + bilateral blur) → screen-space reflections →
   volumetric light and fog (ray-marched, flashlight shadows, fixture cones, baked-light glow) →
   combine → camera motion blur → dual-filter bloom with lens dirt → tone map and grade → FXAA.
   Every stage has a quality level; the heaviest settings are meant for high-end GPUs. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;

  const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
  const COMMON = `
    #include <packing>
    float ign(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
    vec3 viewPosAt(sampler2D depthTex, mat4 invProj, vec2 uv){
      float d = texture2D(depthTex, uv).x;
      vec4 c = invProj * vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
      return c.xyz / c.w;
    }`;
  const PREFILTER = `
    uniform sampler2D tIn; uniform vec2 texel; uniform float threshold; uniform float knee; varying vec2 vUv;
    void main(){
      vec3 s = texture2D(tIn, vUv + texel * vec2(-1.0,-1.0)).rgb + texture2D(tIn, vUv + texel * vec2(1.0,-1.0)).rgb
             + texture2D(tIn, vUv + texel * vec2(-1.0, 1.0)).rgb + texture2D(tIn, vUv + texel * vec2(1.0, 1.0)).rgb;
      s *= 0.25;
      float br = max(s.r, max(s.g, s.b));
      float soft = clamp(br - threshold + knee, 0.0, 2.0 * knee);
      soft = soft * soft / (4.0 * knee + 1e-4);
      float c = max(soft, br - threshold) / max(br, 1e-4);
      gl_FragColor = vec4(min(s * c, vec3(30.0)), 1.0);
    }`;
  const DOWN = `
    uniform sampler2D tIn; uniform vec2 texel; varying vec2 vUv;
    void main(){
      vec2 h = texel * 0.5;
      vec3 s = texture2D(tIn, vUv).rgb * 4.0;
      s += texture2D(tIn, vUv - h).rgb; s += texture2D(tIn, vUv + h).rgb;
      s += texture2D(tIn, vUv + vec2(h.x, -h.y)).rgb; s += texture2D(tIn, vUv - vec2(h.x, -h.y)).rgb;
      gl_FragColor = vec4(s / 8.0, 1.0);
    }`;
  const UP = `
    uniform sampler2D tIn; uniform vec2 texel; uniform float weight; varying vec2 vUv;
    void main(){
      vec2 h = texel * 0.5;
      vec3 s = texture2D(tIn, vUv + vec2(-h.x * 2.0, 0.0)).rgb;
      s += texture2D(tIn, vUv + vec2(-h.x, h.y)).rgb * 2.0;
      s += texture2D(tIn, vUv + vec2(0.0, h.y * 2.0)).rgb;
      s += texture2D(tIn, vUv + vec2(h.x, h.y)).rgb * 2.0;
      s += texture2D(tIn, vUv + vec2(h.x * 2.0, 0.0)).rgb;
      s += texture2D(tIn, vUv + vec2(h.x, -h.y)).rgb * 2.0;
      s += texture2D(tIn, vUv + vec2(0.0, -h.y * 2.0)).rgb;
      s += texture2D(tIn, vUv + vec2(-h.x, -h.y)).rgb * 2.0;
      gl_FragColor = vec4(s / 12.0 * weight, 1.0);
    }`;
  // Scalable ambient obscurance (Alchemy/SAO style), golden-angle spiral, per-pixel rotation
  const AO = COMMON + `
    uniform sampler2D tDepth; uniform sampler2D tNormal; uniform mat4 uProj; uniform mat4 uInvProj;
    uniform vec2 uRes; uniform float uRadius; uniform float uIntensity; uniform int uSamples; uniform float uFrame;
    varying vec2 vUv;
    void main(){
      float d = texture2D(tDepth, vUv).x;
      if (d >= 0.99999) { gl_FragColor = vec4(1.0); return; }
      vec3 P = viewPosAt(tDepth, uInvProj, vUv);
      vec3 N = normalize(unpackRGBToNormal(texture2D(tNormal, vUv).rgb));
      float rs = uRadius * uProj[1][1] * 0.5 / max(-P.z, 0.1);
      rs = min(rs, 0.12);
      float rot = ign(gl_FragCoord.xy + uFrame * 7.13) * 6.2831;
      float occ = 0.0;
      for (int i = 0; i < 32; i++) {
        if (i >= uSamples) break;
        float fi = (float(i) + 0.5) / float(uSamples);
        float a = float(i) * 2.39996 + rot;
        vec2 off = vec2(cos(a), sin(a)) * rs * sqrt(fi) * vec2(uRes.y / uRes.x, 1.0);
        vec3 S = viewPosAt(tDepth, uInvProj, vUv + off);
        vec3 v = S - P;
        float vv = dot(v, v);
        float fall = max(0.0, 1.0 - vv / (uRadius * uRadius));
        occ += max(0.0, dot(v, N) - 0.015 * -P.z) / (vv + 0.02) * fall;
      }
      float ao = clamp(1.0 - 2.0 * uIntensity * occ / float(uSamples), 0.0, 1.0);
      gl_FragColor = vec4(vec3(ao), 1.0);
    }`;
  const AO_BLUR = COMMON + `
    uniform sampler2D tIn; uniform sampler2D tDepth; uniform mat4 uInvProj; uniform vec2 uDir; varying vec2 vUv;
    void main(){
      float z0 = viewPosAt(tDepth, uInvProj, vUv).z;
      float sum = 0.0, wsum = 0.0;
      for (int i = -4; i <= 4; i++) {
        vec2 uv = vUv + uDir * float(i);
        float z = viewPosAt(tDepth, uInvProj, uv).z;
        float w = exp(-float(i * i) * 0.12) * exp(-abs(z - z0) * 6.0 / max(0.3, -z0 * 0.08));
        sum += texture2D(tIn, uv).r * w; wsum += w;
      }
      gl_FragColor = vec4(vec3(sum / max(wsum, 1e-4)), 1.0);
    }`;
  // Screen-space reflections: view-space ray march with thickness test and binary refinement
  const SSR = COMMON + `
    uniform sampler2D tColor; uniform sampler2D tDepth; uniform sampler2D tNormal; uniform mat4 uProj; uniform mat4 uInvProj;
    uniform int uSteps; uniform float uMaxDist; uniform float uFrame;
    varying vec2 vUv;
    vec2 project(vec3 p){ vec4 c = uProj * vec4(p, 1.0); return c.xy / c.w * 0.5 + 0.5; }
    void main(){
      vec4 nr = texture2D(tNormal, vUv);
      float refl = nr.a;
      float d = texture2D(tDepth, vUv).x;
      if (refl < 0.02 || d >= 0.99999) { gl_FragColor = vec4(0.0); return; }
      vec3 P = viewPosAt(tDepth, uInvProj, vUv);
      vec3 N = normalize(unpackRGBToNormal(nr.rgb));
      vec3 V = normalize(P);
      vec3 R = normalize(reflect(V, N));
      float stepL = uMaxDist / float(uSteps);
      float t = stepL * (0.3 + ign(gl_FragCoord.xy + uFrame * 3.7));
      vec3 O = P + N * 0.03;
      vec2 hitUv = vec2(-1.0);
      float prevT = 0.0;
      for (int i = 0; i < 96; i++) {
        if (i >= uSteps) break;
        vec3 X = O + R * t;
        vec2 uv = project(X);
        if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0 || X.z > -0.05) break;
        float sz = viewPosAt(tDepth, uInvProj, uv).z;
        float thick = 0.12 + t * 0.04;
        if (X.z < sz && sz - X.z < thick) {
          float a = prevT, b = t;
          for (int k = 0; k < 5; k++) {
            float m = (a + b) * 0.5; vec3 Y = O + R * m; vec2 u2 = project(Y);
            if (Y.z < viewPosAt(tDepth, uInvProj, u2).z) b = m; else a = m;
          }
          hitUv = project(O + R * b);
          break;
        }
        prevT = t;
        t += stepL * (1.0 + float(i) * 0.04);
      }
      if (hitUv.x < 0.0) { gl_FragColor = vec4(0.0); return; }
      vec2 e = smoothstep(0.0, 0.08, hitUv) * smoothstep(1.0, 0.92, hitUv);
      float fade = e.x * e.y * (1.0 - smoothstep(uMaxDist * 0.6, uMaxDist, t));
      float fres = mix(0.35, 1.0, pow(1.0 - max(dot(-V, N), 0.0), 4.0));
      vec3 col = texture2D(tColor, hitUv).rgb;
      gl_FragColor = vec4(min(col, vec3(40.0)) * refl * fres * fade, 1.0);
    }`;
  // Volumetric light: fog density from 3D noise, in-scattering from the baked light volume,
  // the flashlight (with its shadow map) and the nearest fixtures
  const VOL = COMMON + `
    uniform sampler2D tDepth; uniform mat4 uInvProj; uniform mat4 uCamWorld; uniform vec3 uCamPos;
    uniform highp sampler3D uLvUp; uniform vec3 uLvSize; uniform float uLvLayers; uniform float uLvK; uniform float uHasLv;
    uniform highp sampler3D uNoise;
    uniform float uDensity; uniform float uTime; uniform int uSteps; uniform float uMaxDist; uniform float uFrame;
    uniform vec3 uFlPos; uniform vec3 uFlDir; uniform vec3 uFlColor; uniform float uFlCosOuter; uniform float uFlCosInner; uniform float uFlDist; uniform float uFlOn;
    uniform sampler2D uFlShadow; uniform mat4 uFlShadowMat; uniform float uFlShadowOn;
    uniform vec4 uPL[8]; uniform vec3 uPC[8]; uniform int uNPL;
    varying vec2 vUv;
    float hg(float c, float g){ float g2 = g * g; return (1.0 - g2) / (12.566 * pow(1.0 + g2 - 2.0 * g * c, 1.5)); }
    void main(){
      float d = texture2D(tDepth, vUv).x;
      vec4 c = uInvProj * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
      vec3 vp = c.xyz / c.w;
      float dist = d >= 0.99999 ? uMaxDist : length(vp);
      vec3 dir = normalize((uCamWorld * vec4(vp, 0.0)).xyz);
      float tMax = min(dist, uMaxDist);
      float stepL = tMax / float(uSteps);
      float jit = ign(gl_FragCoord.xy + uFrame * 5.588);
      vec3 scat = vec3(0.0); float T = 1.0;
      for (int i = 0; i < 128; i++) {
        if (i >= uSteps) break;
        float t = (float(i) + jit) * stepL;
        vec3 p = uCamPos + dir * t;
        float n = texture(uNoise, p * vec3(0.11, 0.2, 0.11) + vec3(uTime * 0.013, -uTime * 0.02, uTime * 0.009)).r;
        float h = clamp(p.y / max(uLvSize.y, 0.5), 0.0, 1.0);
        float rho = uDensity * (0.25 + 1.5 * n * n) * mix(1.15, 0.8, h);
        vec3 Ls = vec3(0.0);
        if (uHasLv > 0.5) {
          vec3 uvw = vec3(p.x / uLvSize.x, p.z / uLvSize.z, h * (uLvLayers - 1.0) / uLvLayers + 0.5 / uLvLayers);
          Ls += texture(uLvUp, uvw).rgb * uLvK;
        }
        if (uFlOn > 0.5) {
          vec3 lv = p - uFlPos; float ld = length(lv); vec3 l = lv / max(ld, 1e-3);
          float cs = dot(l, uFlDir);
          if (cs > uFlCosOuter && ld < uFlDist) {
            float cone = smoothstep(uFlCosOuter, uFlCosInner, cs);
            float att = 1.0 / (1.0 + ld * ld * 0.35) * (1.0 - smoothstep(uFlDist * 0.6, uFlDist, ld));
            float sh = 1.0;
            if (uFlShadowOn > 0.5) {
              vec4 sc = uFlShadowMat * vec4(p, 1.0); sc.xyz /= sc.w;
              if (sc.x > 0.0 && sc.x < 1.0 && sc.y > 0.0 && sc.y < 1.0 && sc.z < 1.0) sh = step(sc.z - 0.002, unpackRGBAToDepth(texture2D(uFlShadow, sc.xy)));
            }
            Ls += uFlColor * cone * att * sh * hg(dot(dir, l), 0.55) * 12.566;
          }
        }
        for (int k = 0; k < 8; k++) {
          if (k >= uNPL) break;
          vec3 lv = uPL[k].xyz - p; float ld2 = dot(lv, lv); float r = uPL[k].w;
          if (ld2 > r * r) continue;
          float ld = sqrt(ld2);
          float emit = pow(max(lv.y / ld, 0.0), 1.5);
          Ls += uPC[k] * emit * (1.0 - ld / r) / (ld2 + 0.35);
        }
        scat += T * rho * Ls * stepL;
        T *= exp(-rho * stepL * 0.6);
      }
      gl_FragColor = vec4(scat, T);
    }`;
  const COMBINE = `
    uniform sampler2D tScene; uniform sampler2D tAO; uniform sampler2D tSSR; uniform sampler2D tVol;
    uniform float uAoStr; uniform float uHasAO; uniform float uHasSSR; uniform float uHasVol; varying vec2 vUv;
    void main(){
      vec3 col = texture2D(tScene, vUv).rgb;
      if (uHasAO > 0.5) {
        float ao = texture2D(tAO, vUv).r;
        float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col *= mix(1.0, ao, uAoStr * (1.0 - smoothstep(4.0, 16.0, l)));
      }
      if (uHasSSR > 0.5) col += texture2D(tSSR, vUv).rgb;
      if (uHasVol > 0.5) { vec4 v = texture2D(tVol, vUv); col = col * v.a + v.rgb; }
      gl_FragColor = vec4(col, 1.0);
    }`;
  const MBLUR = `
    uniform sampler2D tIn; uniform sampler2D tDepth; uniform mat4 uInvViewProj; uniform mat4 uPrevViewProj; uniform float uAmount; varying vec2 vUv;
    void main(){
      float d = texture2D(tDepth, vUv).x;
      vec4 w = uInvViewProj * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0); w /= w.w;
      vec4 pc = uPrevViewProj * w;
      vec2 prev = pc.xy / pc.w * 0.5 + 0.5;
      vec2 vel = (vUv - prev) * uAmount;
      float len = length(vel);
      if (len > 0.04) vel *= 0.04 / len;
      vec3 s = vec3(0.0);
      for (int i = 0; i < 10; i++) s += texture2D(tIn, vUv - vel * (float(i) / 9.0 - 0.5)).rgb;
      gl_FragColor = vec4(s / 10.0, 1.0);
    }`;
  const COMPOSITE = `
    uniform sampler2D tScene; uniform sampler2D tBloom; uniform sampler2D tDirt;
    uniform vec2 res; uniform vec2 srcTexel; uniform float ss;
    uniform float time, bloomStrength, exposure, grain, chroma, vignette, brightness, contrast, saturation, dirt;
    uniform float fear, damage, flash, blackout, glitch, vhs, blur;
    uniform vec3 tint; uniform vec3 fadeColor;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
    vec3 src(vec2 uv){
      if (ss > 1.05) {
        vec2 o = srcTexel * 0.5 * ss * 0.5;
        return 0.25 * (texture2D(tScene, uv + vec2(-o.x, -o.y)).rgb + texture2D(tScene, uv + vec2(o.x, -o.y)).rgb
                     + texture2D(tScene, uv + vec2(-o.x, o.y)).rgb + texture2D(tScene, uv + vec2(o.x, o.y)).rgb);
      }
      return texture2D(tScene, uv).rgb;
    }
    void main(){
      vec2 uv = vUv;
      if (vhs > 0.0) {
        float line = floor(uv.y * res.y * 0.5);
        uv.x += (hash(vec2(line, floor(time * 30.0))) - 0.5) * 0.0016 * vhs;
        float band = smoothstep(0.985, 1.0, fract(uv.y * 0.6 - time * 0.11));
        uv.x += band * 0.012 * vhs;
      }
      if (glitch > 0.0) {
        float blk = floor(uv.y * 26.0);
        float g = step(1.0 - glitch * 0.35, hash(vec2(blk, floor(time * 12.0))));
        uv.x += g * (hash(vec2(blk, floor(time * 24.0))) - 0.5) * 0.09 * glitch;
      }
      uv += vec2(sin(uv.y * 17.0 + time * 2.1), cos(uv.x * 13.0 + time * 1.7)) * 0.0022 * fear;
      vec2 dir = uv - 0.5; float d = length(dir);
      float ca = (chroma * 0.004 + fear * 0.006 + glitch * 0.012 + vhs * 0.003) * d;
      vec3 col;
      col.r = src(uv + dir * ca).r;
      col.g = src(uv).g;
      col.b = src(uv - dir * ca).b;
      if (blur > 0.0) {
        vec3 b = vec3(0.0);
        for (int i = 0; i < 12; i++) { float a = float(i) * 0.5236; b += src(uv + vec2(cos(a), sin(a)) * blur * 0.012 * (0.6 + 0.4 * mod(float(i), 2.0))); }
        col = mix(col, b / 12.0, clamp(blur, 0.0, 1.0));
      }
      vec3 bl = texture2D(tBloom, uv).rgb;
      col += bl * bloomStrength * (1.0 + dirt * texture2D(tDirt, uv).r * 2.5);
      col *= exposure * tint;
      col = aces(col);
      col = pow(col, vec3(1.0 / 2.2));
      col = pow(max(col, 0.0), vec3(1.0 / brightness));
      col = (col - 0.5) * contrast + 0.5;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, saturation * (1.0 - fear * 0.4));
      col = mix(col, col * vec3(1.18, 0.82, 0.8), fear * 0.35);
      col *= mix(1.0, smoothstep(0.9, 0.2, d), clamp(vignette * 0.85 + fear * 0.35, 0.0, 1.0));
      col = mix(col, vec3(0.55, 0.0, 0.02), damage * 0.65);
      col = mix(col, vec3(1.0), flash);
      float n = hash(uv * res + fract(time * 7.31) * 100.0) - 0.5;
      col += n * (grain * 0.075 + fear * 0.05 + vhs * 0.05);
      if (vhs > 0.0) {
        col *= 0.9 + 0.1 * sin(uv.y * res.y * 3.14159);
        col = mix(col, col * vec3(1.06, 1.0, 0.86) + vec3(0.02, 0.01, 0.0), vhs * 0.7);
      }
      col += (hash(gl_FragCoord.xy + fract(time)) - 0.5) / 255.0;
      col = mix(col, fadeColor, blackout);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`;
  const FXAA = `
    uniform sampler2D tIn; uniform vec2 rcp; varying vec2 vUv;
    void main(){
      vec3 nw = texture2D(tIn, vUv + vec2(-1.0, -1.0) * rcp).rgb;
      vec3 ne = texture2D(tIn, vUv + vec2(1.0, -1.0) * rcp).rgb;
      vec3 sw = texture2D(tIn, vUv + vec2(-1.0, 1.0) * rcp).rgb;
      vec3 se = texture2D(tIn, vUv + vec2(1.0, 1.0) * rcp).rgb;
      vec3 m = texture2D(tIn, vUv).rgb;
      vec3 L = vec3(0.299, 0.587, 0.114);
      float lnw = dot(nw, L), lne = dot(ne, L), lsw = dot(sw, L), lse = dot(se, L), lm = dot(m, L);
      float lmin = min(lm, min(min(lnw, lne), min(lsw, lse)));
      float lmax = max(lm, max(max(lnw, lne), max(lsw, lse)));
      vec2 dir = vec2(-((lnw + lne) - (lsw + lse)), ((lnw + lsw) - (lne + lse)));
      float red = max((lnw + lne + lsw + lse) * 0.03125, 0.0078125);
      float rmin = 1.0 / (min(abs(dir.x), abs(dir.y)) + red);
      dir = clamp(dir * rmin, vec2(-8.0), vec2(8.0)) * rcp;
      vec3 a = 0.5 * (texture2D(tIn, vUv + dir * (1.0 / 3.0 - 0.5)).rgb + texture2D(tIn, vUv + dir * (2.0 / 3.0 - 0.5)).rgb);
      vec3 b = a * 0.5 + 0.25 * (texture2D(tIn, vUv - dir * 0.5).rgb + texture2D(tIn, vUv + dir * 0.5).rgb);
      float lb = dot(b, L);
      gl_FragColor = vec4((lb < lmin || lb > lmax) ? a : b, 1.0);
    }`;

  // Quality tables
  const Q = {
    ao: { off: null, low: { scale: 0.5, samples: 8 }, high: { scale: 0.75, samples: 14 }, ultra: { scale: 1, samples: 24 } },
    ssr: { off: null, low: { steps: 24, dist: 10 }, high: { steps: 48, dist: 16 }, ultra: { steps: 80, dist: 24 } },
    vol: { off: null, low: { scale: 0.25, steps: 16 }, high: { scale: 0.35, steps: 32 }, ultra: { scale: 0.5, steps: 56 }, extreme: { scale: 0.5, steps: 96 } },
  };

  class Post {
    constructor(renderer) {
      this.r = renderer;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
      this.quad = new THREE.Mesh(geo);
      this.quad.frustumCulled = false;
      this.scene = new THREE.Scene();
      this.scene.add(this.quad);
      this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const mk = (frag, uniforms, blend) => new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false, blending: blend || THREE.NoBlending });
      const V2 = () => ({ value: new THREE.Vector2() }), M4 = () => ({ value: new THREE.Matrix4() }), V3 = () => ({ value: new THREE.Vector3() });
      this.mPre = mk(PREFILTER, { tIn: { value: null }, texel: V2(), threshold: { value: 2.4 }, knee: { value: 1.2 } });
      this.mDown = mk(DOWN, { tIn: { value: null }, texel: V2() });
      this.mUp = mk(UP, { tIn: { value: null }, texel: V2(), weight: { value: 1 } }, THREE.AdditiveBlending);
      this.mAO = mk(AO, { tDepth: { value: null }, tNormal: { value: null }, uProj: M4(), uInvProj: M4(), uRes: V2(), uRadius: { value: 0.5 }, uIntensity: { value: 0.9 }, uSamples: { value: 12 }, uFrame: { value: 0 } });
      this.mAOBlur = mk(AO_BLUR, { tIn: { value: null }, tDepth: { value: null }, uInvProj: M4(), uDir: V2() });
      this.mSSR = mk(SSR, { tColor: { value: null }, tDepth: { value: null }, tNormal: { value: null }, uProj: M4(), uInvProj: M4(), uSteps: { value: 32 }, uMaxDist: { value: 12 }, uFrame: { value: 0 } });
      const pl = [], pc = [];
      for (let i = 0; i < 8; i++) { pl.push(new THREE.Vector4()); pc.push(new THREE.Vector3()); }
      this.mVol = mk(VOL, {
        tDepth: { value: null }, uInvProj: M4(), uCamWorld: M4(), uCamPos: V3(),
        uLvUp: { value: null }, uLvSize: { value: new THREE.Vector3(1, 3, 1) }, uLvLayers: { value: 4 }, uLvK: { value: 0.03 }, uHasLv: { value: 0 },
        uNoise: { value: this.noise3D() }, uDensity: { value: 0.03 }, uTime: { value: 0 }, uSteps: { value: 24 }, uMaxDist: { value: 40 }, uFrame: { value: 0 },
        uFlPos: V3(), uFlDir: V3(), uFlColor: V3(), uFlCosOuter: { value: 0.9 }, uFlCosInner: { value: 0.95 }, uFlDist: { value: 30 }, uFlOn: { value: 0 },
        uFlShadow: { value: null }, uFlShadowMat: M4(), uFlShadowOn: { value: 0 },
        uPL: { value: pl }, uPC: { value: pc }, uNPL: { value: 0 },
      });
      this.mCombine = mk(COMBINE, { tScene: { value: null }, tAO: { value: null }, tSSR: { value: null }, tVol: { value: null }, uAoStr: { value: 0.85 }, uHasAO: { value: 0 }, uHasSSR: { value: 0 }, uHasVol: { value: 0 } });
      this.mMBlur = mk(MBLUR, { tIn: { value: null }, tDepth: { value: null }, uInvViewProj: M4(), uPrevViewProj: M4(), uAmount: { value: 0.5 } });
      this.mComp = mk(COMPOSITE, {
        tScene: { value: null }, tBloom: { value: null }, tDirt: { value: this.dirtTexture() }, res: V2(), srcTexel: V2(), ss: { value: 1 },
        time: { value: 0 }, bloomStrength: { value: 0.6 }, exposure: { value: 1 }, grain: { value: 0.5 }, chroma: { value: 0.5 }, vignette: { value: 0.6 }, dirt: { value: 0.6 },
        brightness: { value: 1 }, contrast: { value: 1 }, saturation: { value: 1 }, fear: { value: 0 }, damage: { value: 0 }, flash: { value: 0 },
        blackout: { value: 0 }, glitch: { value: 0 }, vhs: { value: 0 }, blur: { value: 0 }, tint: { value: new THREE.Vector3(1, 1, 1) }, fadeColor: { value: new THREE.Vector3(0, 0, 0) },
      });
      this.mFxaa = mk(FXAA, { tIn: { value: null }, rcp: V2() });
      this.black = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1); this.black.needsUpdate = true;
      this.white = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1); this.white.needsUpdate = true;
      this.bloom = [];
      this.p = this.mComp.uniforms;
      this.vol = this.mVol.uniforms;
      this.enabled = { bloom: true, fxaa: false };
      this.q = { ao: null, ssr: null, vol: null, mblur: 0 };
      this.w = 1; this.h = 1; this.scale = 1; this.msaa = 0;
      this.frame = 0;
      this.prepassCache = new WeakMap();
      this.prevViewProj = new THREE.Matrix4(); this.hasPrev = false;
      this.tmpM = new THREE.Matrix4();
    }
    // Tileable 3D value-noise volume for drifting fog
    noise3D() {
      const N = 32, data = new Uint8Array(N * N * N);
      const rnd = PB.U.rng(4711);
      const base = new Float32Array(8 * 8 * 8).map(() => rnd());
      const at = (x, y, z) => base[((z & 7) * 8 + (y & 7)) * 8 + (x & 7)];
      const smooth = t => t * t * (3 - 2 * t);
      for (let z = 0; z < N; z++) for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        let v = 0, amp = 0.6, tot = 0;
        for (let o = 0; o < 2; o++) {
          const f = (o ? 2 : 1) * 8 / N;
          const fx = x * f, fy = y * f, fz = z * f;
          const ix = Math.floor(fx), iy = Math.floor(fy), iz = Math.floor(fz);
          const tx = smooth(fx - ix), ty = smooth(fy - iy), tz = smooth(fz - iz);
          const l = (a, b, t) => a + (b - a) * t;
          const c = l(l(l(at(ix, iy, iz), at(ix + 1, iy, iz), tx), l(at(ix, iy + 1, iz), at(ix + 1, iy + 1, iz), tx), ty),
            l(l(at(ix, iy, iz + 1), at(ix + 1, iy, iz + 1), tx), l(at(ix, iy + 1, iz + 1), at(ix + 1, iy + 1, iz + 1), tx), ty), tz);
          v += c * amp; tot += amp; amp *= 0.5;
        }
        data[(z * N + y) * N + x] = Math.round(v / tot * 255);
      }
      const t = new THREE.Data3DTexture(data, N, N, N);
      t.format = THREE.RedFormat; t.type = THREE.UnsignedByteType;
      t.minFilter = t.magFilter = THREE.LinearFilter;
      t.wrapS = t.wrapT = t.wrapR = THREE.RepeatWrapping;
      t.needsUpdate = true;
      return t;
    }
    // Procedural lens dirt for the bloom
    dirtTexture() {
      const S = 256, data = new Uint8Array(S * S * 4);
      const rnd = PB.U.rng(99);
      const f = new Float32Array(S * S);
      for (let k = 0; k < 90; k++) {
        const cx = rnd() * S, cy = rnd() * S, r = 4 + rnd() * rnd() * 34, a = 0.15 + rnd() * 0.5;
        for (let y = Math.max(0, cy - r | 0); y < Math.min(S, cy + r + 1); y++) for (let x = Math.max(0, cx - r | 0); x < Math.min(S, cx + r + 1); x++) {
          const d = Math.hypot(x - cx, y - cy) / r;
          if (d < 1) f[y * S + x] += a * (1 - d * d) * (0.7 + 0.3 * Math.sin(d * 9));
        }
      }
      for (let i = 0; i < S * S; i++) { const v = Math.min(255, f[i] * 200 + 20); data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = v; data[i * 4 + 3] = 255; }
      const t = new THREE.DataTexture(data, S, S);
      t.minFilter = t.magFilter = THREE.LinearFilter; t.needsUpdate = true;
      return t;
    }
    configure(o) {
      this.q.ao = Q.ao[o.ao] || null;
      this.q.ssr = Q.ssr[o.ssr] || null;
      this.q.vol = Q.vol[o.vol] || null;
      this.q.mblur = o.mblur || 0;
      this.p.dirt.value = o.lensDirt ? 0.6 : 0;
      this.dirty = true;
      this.setSize(this.w, this.h, this.scaleReq || 1, this.msaa, true);
    }
    // World data for the volumetric pass
    setWorld(o) {
      const v = this.vol;
      v.uLvUp.value = o.lvUp || null; v.uHasLv.value = o.lvUp ? 1 : 0;
      if (o.lvSize) v.uLvSize.value.copy(o.lvSize);
      v.uLvLayers.value = o.lvLayers || 4;
      v.uDensity.value = o.density != null ? o.density : 0.03;
      v.uLvK.value = o.lvK != null ? o.lvK : 0.035;
      v.uMaxDist.value = o.maxDist || 40;
      this.hasPrev = false;
    }
    rt(w, h, o = {}) {
      const t = new THREE.WebGLRenderTarget(Math.max(1, w | 0), Math.max(1, h | 0), Object.assign({ type: THREE.HalfFloatType, depthBuffer: false }, o));
      t.texture.minFilter = t.texture.magFilter = THREE.LinearFilter;
      return t;
    }
    setSize(w, h, scale, msaa, force) {
      const max = Math.min(this.r.capabilities.maxTextureSize, 8192);
      this.scaleReq = scale;
      const budget = 20e6;
      let s = scale;
      if (w * h * s * s > budget) s = Math.sqrt(budget / (w * h));
      const sw = Math.max(1, Math.min(max, Math.round(w * s))), sh = Math.max(1, Math.min(max, Math.round(h * s)));
      if (!force && this.sceneRT && this.sceneRT.width === sw && this.sceneRT.height === sh && this.msaa === msaa && this.w === w && this.h === h) return;
      this.w = w; this.h = h; this.scale = s; this.msaa = msaa;
      const old = [this.sceneRT, this.ldrRT, this.hdrRT, this.hdr2RT, this.gRT, this.aoRT, this.aoRT2, this.ssrRT, this.volRT].concat(this.bloom);
      old.forEach(t => t && t.dispose());
      this.sceneRT = this.rt(sw, sh, { samples: msaa, depthBuffer: true });
      this.hdrRT = this.rt(sw, sh);
      this.hdr2RT = this.q.mblur > 0 ? this.rt(sw, sh) : null;
      // G-buffer (depth + view normal + reflectivity) at effect resolution
      const needG = this.q.ao || this.q.ssr || this.q.vol || this.q.mblur > 0;
      this.gRT = null;
      if (needG) {
        const gs = Math.max(this.q.ao ? this.q.ao.scale : 0.5, this.q.ssr ? 0.75 : 0.5);
        const gw = Math.round(w * gs), gh = Math.round(h * gs);
        const dt = new THREE.DepthTexture(gw, gh); dt.type = THREE.UnsignedIntType;
        this.gRT = new THREE.WebGLRenderTarget(gw, gh, { depthBuffer: true, depthTexture: dt, type: THREE.UnsignedByteType });
        this.gRT.texture.minFilter = this.gRT.texture.magFilter = THREE.NearestFilter;
        dt.minFilter = dt.magFilter = THREE.NearestFilter;
      }
      this.aoRT = this.q.ao ? this.rt(this.gRT.width, this.gRT.height, { type: THREE.UnsignedByteType }) : null;
      this.aoRT2 = this.q.ao ? this.rt(this.gRT.width, this.gRT.height, { type: THREE.UnsignedByteType }) : null;
      this.ssrRT = this.q.ssr ? this.rt(this.gRT.width, this.gRT.height) : null;
      this.volRT = this.q.vol ? this.rt(w * this.q.vol.scale, h * this.q.vol.scale) : null;
      this.bloom = [];
      let bw = Math.max(1, Math.round(w / 2)), bh = Math.max(1, Math.round(h / 2));
      for (let i = 0; i < 6; i++) {
        this.bloom.push(this.rt(bw, bh));
        bw = Math.max(1, bw >> 1); bh = Math.max(1, bh >> 1);
      }
      this.ldrRT = new THREE.WebGLRenderTarget(w, h, { depthBuffer: false });
      this.ldrRT.texture.minFilter = THREE.LinearFilter;
      this.p.res.value.set(w, h);
      this.p.srcTexel.value.set(1 / sw, 1 / sh);
      this.p.ss.value = sw / w;
      this.mFxaa.uniforms.rcp.value.set(1 / w, 1 / h);
      this.hasPrev = false;
    }
    pass(mat, target) {
      this.quad.material = mat;
      this.r.setRenderTarget(target);
      this.r.render(this.scene, this.cam);
    }
    // Depth + normals (+ reflectivity in alpha) with per-material normal variants
    prepassMat(m) {
      let v = this.prepassCache.get(m);
      if (!v) {
        v = new THREE.MeshNormalMaterial({ normalMap: m.normalMap || null, side: m.side != null ? m.side : THREE.FrontSide });
        if (m.normalScale) v.normalScale.copy(m.normalScale);
        v.opacity = m.userData && m.userData.refl != null ? m.userData.refl : 0;
        v.transparent = false; v.blending = THREE.NoBlending;
        this.prepassCache.set(m, v);
      }
      return v;
    }
    prepass(scene, camera) {
      const r = this.r, swapped = [], hidden = [];
      scene.traverseVisible(o => {
        if (o.isPoints || o.isSprite || o.isLine) { hidden.push(o); return; }
        if (!o.isMesh) return;
        const m = o.material;
        if (Array.isArray(m) || (m.transparent && !(m.userData && m.userData.prepass)) || o.userData.noPrepass) { hidden.push(o); return; }
        swapped.push([o, m]);
        o.material = this.prepassMat(m);
      });
      for (const o of hidden) o.visible = false;
      const bg = scene.background, fog = scene.fog;
      scene.background = null; scene.fog = null;
      const cc = r.getClearColor(new THREE.Color()), ca = r.getClearAlpha();
      r.setClearColor(0x8080ff, 0);
      r.setRenderTarget(this.gRT);
      r.clear(true, true, false);
      r.render(scene, camera);
      r.setClearColor(cc, ca);
      scene.background = bg; scene.fog = fog;
      for (const [o, m] of swapped) o.material = m;
      for (const o of hidden) o.visible = true;
    }
    // Per-frame volumetric light inputs (flashlight + nearby fixtures)
    setLights(flash, fixtures) {
      const v = this.vol;
      if (flash && flash.intensity > 0.5) {
        v.uFlOn.value = 1;
        v.uFlPos.value.copy(flash.position);
        v.uFlDir.value.copy(flash.target.position).sub(flash.position).normalize();
        v.uFlColor.value.set(flash.color.r, flash.color.g, flash.color.b).multiplyScalar(flash.intensity * 0.0011);
        // The visible shaft is the hot core of the beam, not the whole spill
        v.uFlCosOuter.value = Math.cos(flash.angle * 0.62); v.uFlCosInner.value = Math.cos(flash.angle * 0.25);
        v.uFlDist.value = flash.distance || 30;
        const sm = flash.castShadow && flash.shadow && flash.shadow.map;
        v.uFlShadowOn.value = sm ? 1 : 0;
        if (sm) { v.uFlShadow.value = flash.shadow.map.texture; v.uFlShadowMat.value.copy(flash.shadow.matrix); }
      } else v.uFlOn.value = 0;
      let n = 0;
      for (const f of fixtures || []) {
        if (n >= 8) break;
        v.uPL.value[n].set(f.x, f.y, f.z, f.range);
        v.uPC.value[n].set(f.r, f.g, f.b);
        n++;
      }
      v.uNPL.value = n;
    }
    render(scene, camera, time) {
      const r = this.r;
      const auto = r.autoClear;
      r.autoClear = false;
      this.frame = (this.frame + 1) % 64;
      const q = this.q;
      camera.updateMatrixWorld();
      const proj = camera.projectionMatrix, invProj = camera.projectionMatrixInverse;
      if (this.gRT) this.prepass(scene, camera);
      r.setRenderTarget(this.sceneRT);
      r.clear(true, true, false);
      r.render(scene, camera);
      let hdr = this.sceneRT.texture;
      const needCombine = q.ao || q.ssr || q.vol;
      if (q.ao) {
        const a = this.mAO.uniforms;
        a.tDepth.value = this.gRT.depthTexture; a.tNormal.value = this.gRT.texture;
        a.uProj.value.copy(proj); a.uInvProj.value.copy(invProj); a.uRes.value.set(this.gRT.width, this.gRT.height);
        a.uSamples.value = q.ao.samples; a.uFrame.value = this.frame;
        this.pass(this.mAO, this.aoRT);
        const b = this.mAOBlur.uniforms;
        b.tDepth.value = this.gRT.depthTexture; b.uInvProj.value.copy(invProj);
        b.tIn.value = this.aoRT.texture; b.uDir.value.set(1 / this.gRT.width, 0); this.pass(this.mAOBlur, this.aoRT2);
        b.tIn.value = this.aoRT2.texture; b.uDir.value.set(0, 1 / this.gRT.height); this.pass(this.mAOBlur, this.aoRT);
      }
      if (q.ssr) {
        const s = this.mSSR.uniforms;
        s.tColor.value = this.sceneRT.texture; s.tDepth.value = this.gRT.depthTexture; s.tNormal.value = this.gRT.texture;
        s.uProj.value.copy(proj); s.uInvProj.value.copy(invProj); s.uSteps.value = q.ssr.steps; s.uMaxDist.value = q.ssr.dist; s.uFrame.value = this.frame;
        this.pass(this.mSSR, this.ssrRT);
      }
      if (q.vol) {
        const v = this.vol;
        v.tDepth.value = this.gRT.depthTexture; v.uInvProj.value.copy(invProj); v.uCamWorld.value.copy(camera.matrixWorld);
        v.uCamPos.value.setFromMatrixPosition(camera.matrixWorld); v.uTime.value = time; v.uSteps.value = q.vol.steps; v.uFrame.value = this.frame;
        this.pass(this.mVol, this.volRT);
      }
      if (needCombine) {
        const c = this.mCombine.uniforms;
        c.tScene.value = this.sceneRT.texture;
        c.tAO.value = q.ao ? this.aoRT.texture : this.white; c.uHasAO.value = q.ao ? 1 : 0;
        c.tSSR.value = q.ssr ? this.ssrRT.texture : this.black; c.uHasSSR.value = q.ssr ? 1 : 0;
        c.tVol.value = q.vol ? this.volRT.texture : this.black; c.uHasVol.value = q.vol ? 1 : 0;
        this.pass(this.mCombine, this.hdrRT);
        hdr = this.hdrRT.texture;
      }
      // Camera motion blur from depth reprojection
      const viewProj = this.tmpM.multiplyMatrices(proj, camera.matrixWorldInverse);
      if (q.mblur > 0 && this.gRT && this.hasPrev && this.hdr2RT) {
        const m = this.mMBlur.uniforms;
        m.tIn.value = hdr; m.tDepth.value = this.gRT.depthTexture;
        m.uInvViewProj.value.copy(viewProj).invert(); m.uPrevViewProj.value.copy(this.prevViewProj); m.uAmount.value = q.mblur;
        this.pass(this.mMBlur, this.hdr2RT);
        hdr = this.hdr2RT.texture;
      }
      this.prevViewProj.copy(viewProj); this.hasPrev = true;
      let bloomTex = this.black;
      if (this.enabled.bloom && this.bloom.length) {
        const b = this.bloom;
        this.mPre.uniforms.tIn.value = hdr;
        this.mPre.uniforms.texel.value.set(1 / this.sceneRT.width, 1 / this.sceneRT.height);
        this.pass(this.mPre, b[0]);
        for (let i = 1; i < b.length; i++) {
          this.mDown.uniforms.tIn.value = b[i - 1].texture;
          this.mDown.uniforms.texel.value.set(1 / b[i - 1].width, 1 / b[i - 1].height);
          this.pass(this.mDown, b[i]);
        }
        for (let i = b.length - 2; i >= 0; i--) {
          this.mUp.uniforms.tIn.value = b[i + 1].texture;
          this.mUp.uniforms.texel.value.set(1 / b[i + 1].width, 1 / b[i + 1].height);
          this.mUp.uniforms.weight.value = 0.7;
          this.pass(this.mUp, b[i]);
        }
        bloomTex = b[0].texture;
      }
      this.p.tScene.value = hdr;
      this.p.tBloom.value = bloomTex;
      this.p.time.value = time;
      if (this.enabled.fxaa) {
        this.pass(this.mComp, this.ldrRT);
        this.mFxaa.uniforms.tIn.value = this.ldrRT.texture;
        this.pass(this.mFxaa, null);
      } else {
        this.pass(this.mComp, null);
      }
      r.autoClear = auto;
    }
    dispose() {
      [this.sceneRT, this.ldrRT, this.hdrRT, this.hdr2RT, this.gRT, this.aoRT, this.aoRT2, this.ssrRT, this.volRT].concat(this.bloom).forEach(rt => rt && rt.dispose());
    }
  }
  PB.Post = Post;
})(typeof window !== 'undefined' ? window : globalThis);
