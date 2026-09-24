/* Son işleme hattı: HDR sahne → parlak geçiş + çift filtreli bloom → birleştirme
   (ACES ton eşleme, renk sapması, gren, vinyet, korku efektleri, VHS) → isteğe bağlı FXAA. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;

  const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
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
  const COMPOSITE = `
    uniform sampler2D tScene; uniform sampler2D tBloom;
    uniform vec2 res; uniform vec2 srcTexel; uniform float ss;
    uniform float time, bloomStrength, exposure, grain, chroma, vignette, brightness, contrast, saturation;
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
        for (int i = 0; i < 8; i++) { float a = float(i) * 0.785; b += src(uv + vec2(cos(a), sin(a)) * blur * 0.01); }
        col = mix(col, b / 8.0, clamp(blur, 0.0, 1.0));
      }
      col += texture2D(tBloom, uv).rgb * bloomStrength;
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
      this.mPre = mk(PREFILTER, { tIn: { value: null }, texel: { value: new THREE.Vector2() }, threshold: { value: 2.4 }, knee: { value: 1.2 } });
      this.mDown = mk(DOWN, { tIn: { value: null }, texel: { value: new THREE.Vector2() } });
      this.mUp = mk(UP, { tIn: { value: null }, texel: { value: new THREE.Vector2() }, weight: { value: 1 } }, THREE.AdditiveBlending);
      this.mComp = mk(COMPOSITE, {
        tScene: { value: null }, tBloom: { value: null }, res: { value: new THREE.Vector2() }, srcTexel: { value: new THREE.Vector2() }, ss: { value: 1 },
        time: { value: 0 }, bloomStrength: { value: 0.6 }, exposure: { value: 1 }, grain: { value: 0.5 }, chroma: { value: 0.5 }, vignette: { value: 0.6 },
        brightness: { value: 1 }, contrast: { value: 1 }, saturation: { value: 1 }, fear: { value: 0 }, damage: { value: 0 }, flash: { value: 0 },
        blackout: { value: 0 }, glitch: { value: 0 }, vhs: { value: 0 }, blur: { value: 0 }, tint: { value: new THREE.Vector3(1, 1, 1) }, fadeColor: { value: new THREE.Vector3(0, 0, 0) },
      });
      this.mFxaa = mk(FXAA, { tIn: { value: null }, rcp: { value: new THREE.Vector2() } });
      this.black = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1);
      this.black.needsUpdate = true;
      this.bloom = [];
      this.p = this.mComp.uniforms;
      this.enabled = { bloom: true, fxaa: false };
      this.w = 1; this.h = 1; this.scale = 1; this.msaa = 0;
    }
    setSize(w, h, scale, msaa) {
      const max = Math.min(this.r.capabilities.maxTextureSize, 8192);
      // Piksel bütçesi: 4K ekranda %200 = aşırı; toplamı sınırla
      const budget = 20e6;
      let s = scale;
      if (w * h * s * s > budget) s = Math.sqrt(budget / (w * h));
      const sw = Math.max(1, Math.min(max, Math.round(w * s))), sh = Math.max(1, Math.min(max, Math.round(h * s)));
      if (this.sceneRT && this.sceneRT.width === sw && this.sceneRT.height === sh && this.msaa === msaa && this.w === w && this.h === h) return;
      this.w = w; this.h = h; this.scale = s; this.msaa = msaa;
      if (this.sceneRT) this.sceneRT.dispose();
      this.sceneRT = new THREE.WebGLRenderTarget(sw, sh, { type: THREE.HalfFloatType, samples: msaa, depthBuffer: true, colorSpace: THREE.LinearSRGBColorSpace });
      this.sceneRT.texture.minFilter = THREE.LinearFilter; this.sceneRT.texture.magFilter = THREE.LinearFilter;
      this.bloom.forEach(rt => rt.dispose());
      this.bloom = [];
      let bw = Math.max(1, Math.round(w / 2)), bh = Math.max(1, Math.round(h / 2));
      for (let i = 0; i < 6; i++) {
        const rt = new THREE.WebGLRenderTarget(bw, bh, { type: THREE.HalfFloatType, depthBuffer: false });
        rt.texture.minFilter = THREE.LinearFilter; rt.texture.magFilter = THREE.LinearFilter;
        this.bloom.push(rt);
        bw = Math.max(1, bw >> 1); bh = Math.max(1, bh >> 1);
      }
      if (this.ldrRT) this.ldrRT.dispose();
      this.ldrRT = new THREE.WebGLRenderTarget(w, h, { depthBuffer: false });
      this.ldrRT.texture.minFilter = THREE.LinearFilter;
      this.p.res.value.set(w, h);
      this.p.srcTexel.value.set(1 / sw, 1 / sh);
      this.p.ss.value = sw / w;
      this.mFxaa.uniforms.rcp.value.set(1 / w, 1 / h);
    }
    pass(mat, target) {
      this.quad.material = mat;
      this.r.setRenderTarget(target);
      this.r.render(this.scene, this.cam);
    }
    render(scene, camera, time) {
      const r = this.r;
      const auto = r.autoClear;
      r.autoClear = false;
      r.setRenderTarget(this.sceneRT);
      r.clear(true, true, false);
      r.render(scene, camera);
      let bloomTex = this.black;
      if (this.enabled.bloom && this.bloom.length) {
        const b = this.bloom;
        this.mPre.uniforms.tIn.value = this.sceneRT.texture;
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
      this.p.tScene.value = this.sceneRT.texture;
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
      [this.sceneRT, this.ldrRT].concat(this.bloom).forEach(rt => rt && rt.dispose());
    }
  }
  PB.Post = Post;
})(typeof window !== 'undefined' ? window : globalThis);
