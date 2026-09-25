/* GPU light baker. Bakes every static light into a 3D irradiance volume (x, height, z) on the GPU:
   - walls, low partitions, glass and closed doors occlude (grid DDA per light sample),
   - furniture casts soft shadows (height-slab occupancy map, ray-marched),
   - fixtures are area lights: several jittered samples give soft penumbras,
   - two volumes: irradiance on up-facing surfaces and on vertical surfaces facing the light.
   Bounce light and ambient come from a coarse CPU pass per cell (also used by the AI to judge
   how visible the player is). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, G = PB.LevelGen;
  const { DX, DY, EDGE, SOLID } = G;

  const MAXL = 24;          // lights per cell bin
  const OCC_TOP = 2.6;      // tallest furniture that can cast baked shadows (m)
  const OCC_Y = 4.0;        // occupancy heights are stored /OCC_Y

  // Occluder slabs per prop type: [bottom, top, transmittance-blocked (0..1)], footprint from its collider
  const OCCLUDER = {
    desk: [0.7, 0.78, 1], cubicleDesk: [0.7, 0.76, 1], meetingTable: [0.72, 0.78, 1], counter: [0, 1.05, 1], kitchenCounter: [0, 0.92, 1],
    cabinet: [0, 1.95, 1], pinball: [0.75, 1.9, 0.8], claw: [0, 2.1, 0.7], change: [0, 1.6, 1], airhockey: [0.78, 0.88, 1],
    filing: [0, 1.32, 1], safe: [0, 1.1, 1], shelf: [0, 2.0, 0.7], prizeShelf: [0, 2.2, 0.6], boxes: [0, 1.0, 1], bench: [0.42, 0.48, 1],
    waterCooler: [0, 1.3, 0.8], toilet: [0, 0.8, 1], sink: [0.75, 0.92, 1], monitorWall: [0, 2.2, 1], officeChair: [0.45, 0.52, 0.8], chair: [0.45, 0.5, 0.8],
    collider: [0, 1.8, 0.6], ladder: [0, 2.2, 0.3],
  };

  const VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
  const FRAG = `
precision highp float;
precision highp int;
uniform sampler2D uGrid;     // (w+1)x(h+1): r=north edge, g=west edge, b=solid (codes/255)
uniform sampler2D uOcc;      // WxD: r=slab bottom, g=slab top (/OCC_Y), b=opacity
uniform sampler2D uLights;   // 3 texels per light, row-major in a LW-wide texture
uniform sampler2D uBins;     // (w*BK)xh light indices (-1 = none)
uniform sampler2D uBounce;   // wxh cell bounce + ambient
uniform vec2 uCells;         // w, h
uniform float uCell;
uniform vec3 uWorld;         // world size x, height, z
uniform float uLayerY;
uniform vec2 uTexels;        // W, D
uniform float uTs;           // texel size (m)
uniform int uSamples;
uniform int uMode;           // 0 = up-facing, 1 = vertical
uniform int uLW;
uniform int uBK;
uniform float uBounceK;
uniform vec3 uAmbient;
varying vec2 vUv;

const float OCC_TOP = ${OCC_TOP.toFixed(2)};
const float OCC_Y = ${OCC_Y.toFixed(2)};

int code(vec4 g, int ch) { return int((ch == 0 ? g.r : ch == 1 ? g.g : g.b) * 255.0 + 0.5); }
vec4 gridAt(ivec2 c) { return texelFetch(uGrid, clamp(c, ivec2(0), ivec2(uCells)), 0); }
bool inGrid(ivec2 c) { return c.x >= 0 && c.y >= 0 && c.x < int(uCells.x) && c.y < int(uCells.y); }

// Walls, partitions, glass and closed doors between p and q (world space)
float wallVis(vec3 p, vec3 q) {
  vec2 a = p.xz / uCell, b = q.xz / uCell;
  ivec2 c = ivec2(floor(a)), cb = ivec2(floor(b));
  vec2 d = b - a;
  ivec2 st = ivec2(d.x > 0.0 ? 1 : -1, d.y > 0.0 ? 1 : -1);
  vec2 td = vec2(abs(d.x) > 1e-6 ? abs(1.0 / d.x) : 1e9, abs(d.y) > 1e-6 ? abs(1.0 / d.y) : 1e9);
  vec2 tm = vec2(abs(d.x) > 1e-6 ? (st.x > 0 ? (float(c.x) + 1.0 - a.x) : (a.x - float(c.x))) * td.x : 1e9,
                 abs(d.y) > 1e-6 ? (st.y > 0 ? (float(c.y) + 1.0 - a.y) : (a.y - float(c.y))) * td.y : 1e9);
  float vis = 1.0;
  for (int i = 0; i < 32; i++) {
    if (c == cb) break;
    float t; int k;
    if (tm.x < tm.y) {
      t = tm.x; if (t > 1.0) break;
      k = code(gridAt(st.x > 0 ? ivec2(c.x + 1, c.y) : c), 1);
      c.x += st.x; tm.x += td.x;
    } else {
      t = tm.y; if (t > 1.0) break;
      k = code(gridAt(st.y > 0 ? ivec2(c.x, c.y + 1) : c), 0);
      c.y += st.y; tm.y += td.y;
    }
    float yh = mix(p.y, q.y, t);
    if (k == 1 || k == 5) return 0.0;
    if (k == 2 && yh < 1.35) return 0.0;
    if (k == 3) { if (yh < 0.55 || yh > 2.75) return 0.0; vis *= 0.85; }
    if (k == 4) vis *= 0.8;
    if (!inGrid(c)) break;
    int s = code(gridAt(c), 2);
    if (s == 1 || s == 3 || s == 9) return 0.0;
    if (s == 2) vis *= 0.5;
  }
  return vis;
}
// Furniture: march the occupancy slabs until the ray rises above the tallest prop
float occVis(vec3 p, vec3 q) {
  vec3 D = q - p;
  float hd = length(D.xz);
  if (hd < 1e-3) return 1.0;
  float maxT = 1.0;
  if (D.y > 1e-4) maxT = min(1.0, (OCC_TOP - p.y) / D.y);
  if (maxT <= 0.0) return 1.0;
  float stepT = (uTs * 0.6) / hd;
  float vis = 1.0;
  for (int i = 1; i < 64; i++) {
    float t = float(i) * stepT;
    if (t > maxT) break;
    vec3 s = p + D * t;
    vec4 o = texture2D(uOcc, s.xz / uWorld.xz);
    if (s.y > o.r * OCC_Y && s.y < o.g * OCC_Y) vis *= 1.0 - o.b * 0.85;
    if (vis < 0.03) return 0.0;
  }
  return vis;
}
vec4 lightTexel(int idx, int k) { int n = idx * 3 + k; return texelFetch(uLights, ivec2(n % uLW, n / uLW), 0); }
vec2 disk(int i, int n) {
  float a = float(i) * 2.39996 + 0.5;
  float r = sqrt((float(i) + 0.5) / float(n));
  return vec2(cos(a), sin(a)) * r;
}
// Wall ambient occlusion inside the current cell (large-scale; GTAO adds the fine detail)
float cellAO(vec3 p) {
  vec2 cf = p.xz / uCell; ivec2 c = ivec2(floor(cf)); vec2 f = (cf - vec2(c)) * uCell;
  float dmin = 9.0;
  if (code(gridAt(c), 0) == 1 || (c.y > 0 && code(gridAt(ivec2(c.x, c.y - 1)), 2) != 0)) dmin = min(dmin, f.y);
  if (code(gridAt(ivec2(c.x, c.y + 1)), 0) == 1 || code(gridAt(ivec2(c.x, c.y + 1)), 2) != 0) dmin = min(dmin, uCell - f.y);
  if (code(gridAt(c), 1) == 1 || (c.x > 0 && code(gridAt(ivec2(c.x - 1, c.y)), 2) != 0)) dmin = min(dmin, f.x);
  if (code(gridAt(ivec2(c.x + 1, c.y)), 1) == 1 || code(gridAt(ivec2(c.x + 1, c.y)), 2) != 0) dmin = min(dmin, uCell - f.x);
  float wallK = mix(1.0, 0.45, 1.0 - smoothstep(0.0, 0.9, dmin));
  float h = p.y / max(uWorld.y, 0.1);
  float edge = max(1.0 - smoothstep(0.0, 0.18, h), smoothstep(0.82, 1.0, h));
  return mix(1.0, wallK, 0.55 + 0.45 * edge);
}
void main() {
  vec3 P = vec3(vUv.x * uWorld.x, uLayerY, vUv.y * uWorld.z);
  ivec2 cell = clamp(ivec2(floor(P.xz / uCell)), ivec2(0), ivec2(uCells) - 1);
  vec3 E = vec3(0.0);
  for (int b = 0; b < ${MAXL / 4}; b++) {
    if (b >= uBK) break;
    vec4 ids = texelFetch(uBins, ivec2(cell.x * uBK + b, cell.y), 0);
    for (int j = 0; j < 4; j++) {
      int li = int(j == 0 ? ids.x : j == 1 ? ids.y : j == 2 ? ids.z : ids.w);
      if (li < 0) continue;
      vec4 L0 = lightTexel(li, 0), L1 = lightTexel(li, 1), L2 = lightTexel(li, 2);
      vec3 lp = L0.xyz; float range = L0.w;
      vec3 v = lp - P; float d2 = dot(v, v);
      if (d2 > range * range) continue;
      float d = sqrt(d2); vec3 l = v / max(d, 1e-4);
      int kind = int(L1.a + 0.5);
      float emit = kind == 1 ? pow(max(l.y, 0.0), 0.8) : kind == 2 ? max(l.y, 0.0) * max(l.y, 0.0) : 1.0;
      if (emit <= 0.0) continue;
      float win = 1.0 - pow(d / range, 4.0); win *= win;
      float cosN = uMode == 0 ? max(l.y, 0.0) : length(l.xz);
      if (cosN <= 0.0) continue;
      float vis = 0.0;
      float cr = cos(L2.z), sr = sin(L2.z);
      for (int s = 0; s < 8; s++) {
        if (s >= uSamples) break;
        vec2 o = uSamples > 1 ? disk(s, uSamples) * L2.xy : vec2(0.0);
        vec3 q = lp + vec3(o.x * cr - o.y * sr, -0.04, o.x * sr + o.y * cr);
        float wv = wallVis(P, q);
        if (wv > 0.0) wv *= occVis(P, q);
        vis += wv;
      }
      vis /= float(uSamples);
      E += L1.rgb * (vis * emit * win * cosN / max(d2, 0.3));
    }
  }
  vec3 B = texture2D(uBounce, P.xz / uWorld.xz).rgb;
  E += B * uBounceK * (uMode == 0 ? 0.55 : 0.8) + uAmbient;
  E *= cellAO(P);
  gl_FragColor = vec4(min(E, vec3(60.0)), 1.0);
}`;

  class LightBake {
    constructor(renderer) {
      this.r = renderer;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
      this.quad = new THREE.Mesh(geo);
      this.quad.frustumCulled = false;
      this.scene = new THREE.Scene(); this.scene.add(this.quad);
      this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      this.mat = new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG, depthTest: false, depthWrite: false,
        uniforms: {
          uGrid: { value: null }, uOcc: { value: null }, uLights: { value: null }, uBins: { value: null }, uBounce: { value: null },
          uCells: { value: new THREE.Vector2() }, uCell: { value: 3 }, uWorld: { value: new THREE.Vector3() }, uLayerY: { value: 0 },
          uTexels: { value: new THREE.Vector2() }, uTs: { value: 0.5 }, uSamples: { value: 1 }, uMode: { value: 0 }, uLW: { value: 1024 }, uBK: { value: MAXL / 4 },
          uBounceK: { value: 0.4 }, uAmbient: { value: new THREE.Vector3() },
        },
      });
      this.quad.material = this.mat;
    }
    // ---------------------------------------------------------------- data textures
    gridTexture(L) {
      const w = L.w, h = L.h, W1 = w + 1, H1 = h + 1;
      const data = new Uint8Array(W1 * H1 * 4);
      const doorCode = (k) => {
        const door = L.doorMap.get(k);
        if (!door) return -1;
        if (door.open) return 0;
        if (door.kind === 'glass' || door.kind === 'bars') return 3;
        return 5;
      };
      for (let y = 0; y < H1; y++) for (let x = 0; x < W1; x++) {
        const o = (y * W1 + x) * 4;
        let n = 0, wv = 0, s = 1;
        if (x < w) { n = L.hW[y * w + x]; const dc = doorCode((y * w + x) * 2); if (dc >= 0) n = dc; }
        if (y < h) { wv = L.vW[y * (w + 1) + x]; const dc = doorCode((y * (w + 1) + x) * 2 + 1); if (dc >= 0) wv = dc; }
        if (x < w && y < h) s = L.solid[y * w + x];
        data[o] = n; data[o + 1] = wv; data[o + 2] = s; data[o + 3] = 255;
      }
      const t = new THREE.DataTexture(data, W1, H1, THREE.RGBAFormat, THREE.UnsignedByteType);
      t.magFilter = t.minFilter = THREE.NearestFilter; t.needsUpdate = true;
      return t;
    }
    occTexture(L, W, D, ts) {
      const data = new Uint8Array(W * D * 4);
      for (let i = 0; i < W * D; i++) { data[i * 4] = 255; data[i * 4 + 1] = 0; }
      const put = (minX, maxX, minZ, maxZ, y0, y1, op) => {
        const tx0 = Math.max(0, Math.floor(minX / ts)), tx1 = Math.min(W - 1, Math.floor(maxX / ts));
        const tz0 = Math.max(0, Math.floor(minZ / ts)), tz1 = Math.min(D - 1, Math.floor(maxZ / ts));
        for (let z = tz0; z <= tz1; z++) for (let x = tx0; x <= tx1; x++) {
          const o = (z * W + x) * 4;
          data[o] = Math.min(data[o], Math.round(y0 / OCC_Y * 255));
          data[o + 1] = Math.max(data[o + 1], Math.round(y1 / OCC_Y * 255));
          data[o + 2] = Math.max(data[o + 2], Math.round(op * 255));
        }
      };
      for (const p of L.props) {
        const occ = OCCLUDER[p.type];
        if (!occ || !p.collider) continue;
        const c = Math.abs(Math.cos(p.rot || 0)), s = Math.abs(Math.sin(p.rot || 0));
        const hw = p.collider.hw * c + p.collider.hd * s, hd = p.collider.hw * s + p.collider.hd * c;
        put(p.x - hw, p.x + hw, p.z - hd, p.z + hd, occ[0], occ[1], occ[2]);
      }
      for (const pl of L.pillars || []) put(pl.x - 0.3, pl.x + 0.3, pl.z - 0.3, pl.z + 0.3, 0, OCC_TOP, 1);
      const t = new THREE.DataTexture(data, W, D, THREE.RGBAFormat, THREE.UnsignedByteType);
      t.magFilter = t.minFilter = THREE.NearestFilter; t.needsUpdate = true;
      return t;
    }
    // Light list and per-cell bins
    lightData(L, lights, K) {
      const LW = 1024, n = Math.max(1, lights.length);
      const rows = Math.ceil(n * 3 / LW);
      const data = new Float32Array(LW * rows * 4);
      lights.forEach((l, i) => {
        const hl = (l.y != null ? l.y : L.ceil) - 0.05;
        const kind = l.kind === 'panel' || l.kind === 'poolPanel' || l.kind === 'tube' || l.kind === 'troffer' ? 1 : l.kind === 'spot' || l.kind === 'lamp' || l.kind === 'pendant' ? 2 : 0;
        const size = l.kind === 'panel' || l.kind === 'troffer' ? [0.55, 0.28] : l.kind === 'poolPanel' ? [0.5, 0.5] : l.kind === 'tube' ? [0.6, 0.05] : l.kind === 'neon' ? [1.4, 0.1] : [0.12, 0.12];
        const I = l.intensity * (l.flicker ? 0.75 : 1) * K;
        const put = (k, a, b, c, d) => { const o = (i * 3 + k) * 4; data[o] = a; data[o + 1] = b; data[o + 2] = c; data[o + 3] = d; };
        put(0, l.x, hl, l.z, l.range || 10);
        put(1, l.color[0] * I, l.color[1] * I, l.color[2] * I, kind);
        put(2, size[0], size[1], l.rot || 0, 0);
      });
      const tex = new THREE.DataTexture(data, LW, rows, THREE.RGBAFormat, THREE.FloatType);
      tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.needsUpdate = true;
      // Bins: for each cell the strongest lights whose range reaches it
      const w = L.w, h = L.h, C = L.cell, BK = MAXL / 4;
      const bins = new Float32Array(w * BK * h * 4).fill(-1);
      const lists = Array.from({ length: w * h }, () => []);
      lights.forEach((l, i) => {
        const range = l.range || 10;
        const x0 = Math.max(0, Math.floor((l.x - range) / C)), x1 = Math.min(w - 1, Math.floor((l.x + range) / C));
        const y0 = Math.max(0, Math.floor((l.z - range) / C)), y1 = Math.min(h - 1, Math.floor((l.z + range) / C));
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
          const nx = U.clamp(l.x, x * C, (x + 1) * C), nz = U.clamp(l.z, y * C, (y + 1) * C);
          const d2 = (nx - l.x) ** 2 + (nz - l.z) ** 2;
          if (d2 > range * range) continue;
          const score = l.intensity / (d2 + 2);
          lists[y * w + x].push([score, i]);
        }
      });
      for (let c = 0; c < w * h; c++) {
        const lst = lists[c];
        if (!lst.length) continue;
        lst.sort((a, b) => b[0] - a[0]);
        const x = c % w, y = (c / w) | 0;
        for (let k = 0; k < Math.min(MAXL, lst.length); k++) bins[(y * w * BK + x * BK + (k >> 2)) * 4 + (k & 3)] = lst[k][1];
      }
      const bt = new THREE.DataTexture(bins, w * BK, h, THREE.RGBAFormat, THREE.FloatType);
      bt.magFilter = bt.minFilter = THREE.NearestFilter; bt.needsUpdate = true;
      return { tex, LW, bins: bt, BK };
    }
    // Coarse CPU pass: direct light at each cell centre (walls only), then wall-aware diffusion
    cellLight(L, lights, K) {
      const w = L.w, h = L.h, C = L.cell, n = w * h;
      const direct = new Float32Array(n * 3);
      for (const l of lights) {
        const range = l.range || 10, hl = Math.max(0.5, (l.y != null ? l.y : L.ceil) - 1.0);
        const I = l.intensity * (l.flicker ? 0.75 : 1) * K;
        const x0 = Math.max(0, Math.floor((l.x - range) / C)), x1 = Math.min(w - 1, Math.floor((l.x + range) / C));
        const y0 = Math.max(0, Math.floor((l.z - range) / C)), y1 = Math.min(h - 1, Math.floor((l.z + range) / C));
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
          const c = y * w + x;
          if (L.solid[c] && L.solid[c] !== SOLID.RACK) continue;
          const px = (x + 0.5) * C, pz = (y + 0.5) * C, d2 = (px - l.x) ** 2 + (pz - l.z) ** 2;
          if (d2 > range * range) continue;
          if (!L.los(l.x, l.z, px, pz, 1)) continue;
          const q = d2 + hl * hl;
          const wgt = 1 - Math.pow(Math.sqrt(q) / (range + hl), 4);
          const E = I * hl / (q * Math.sqrt(q)) * Math.max(0, wgt) ** 2;
          direct[c * 3] += l.color[0] * E; direct[c * 3 + 1] += l.color[1] * E; direct[c * 3 + 2] += l.color[2] * E;
        }
      }
      let cur = Float32Array.from(direct), nxt = new Float32Array(n * 3);
      for (let it = 0; it < 6; it++) {
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          const c = y * w + x;
          if (L.solid[c] && L.solid[c] !== SOLID.RACK) { nxt[c * 3] = nxt[c * 3 + 1] = nxt[c * 3 + 2] = 0; continue; }
          let r = cur[c * 3], g = cur[c * 3 + 1], b = cur[c * 3 + 2], m = 1;
          for (let d = 0; d < 4; d++) {
            if (!L.step(x, y, d, 'all')) continue;
            const nc = (y + DY[d]) * w + x + DX[d];
            r += cur[nc * 3]; g += cur[nc * 3 + 1]; b += cur[nc * 3 + 2]; m++;
          }
          nxt[c * 3] = r / m; nxt[c * 3 + 1] = g / m; nxt[c * 3 + 2] = b / m;
        }
        const t = cur; cur = nxt; nxt = t;
      }
      return { direct, bounce: cur };
    }
    // ---------------------------------------------------------------- bake
    bake(L, opts) {
      const r = this.r;
      const C = L.cell, R = opts.res, W = L.w * R, D = L.h * R, ts = C / R;
      const NY = Math.max(4, Math.ceil(L.ceil / 0.8) + 1);
      const lights = opts.lights;
      const cellL = this.cellLight(L, lights, opts.K);
      // Bounce + ambient per cell for the GPU and for ceilings/undersides in the material shader
      const w = L.w, h = L.h, amb = opts.ambient, bk = opts.bounce;
      const bData = new Uint16Array(w * h * 4), toH = THREE.DataUtils.toHalfFloat;
      for (let c = 0; c < w * h; c++) {
        bData[c * 4] = toH(Math.min(60, cellL.bounce[c * 3]));
        bData[c * 4 + 1] = toH(Math.min(60, cellL.bounce[c * 3 + 1]));
        bData[c * 4 + 2] = toH(Math.min(60, cellL.bounce[c * 3 + 2]));
        bData[c * 4 + 3] = toH(1);
      }
      const bounceTex = new THREE.DataTexture(bData, w, h, THREE.RGBAFormat, THREE.HalfFloatType);
      bounceTex.magFilter = bounceTex.minFilter = THREE.LinearFilter; bounceTex.wrapS = bounceTex.wrapT = THREE.ClampToEdgeWrapping; bounceTex.needsUpdate = true;
      const grid = this.gridTexture(L), occ = this.occTexture(L, W, D, ts), ld = this.lightData(L, lights, opts.K);
      const mk = () => {
        const rt = new THREE.WebGL3DRenderTarget(W, D, NY, { type: THREE.HalfFloatType, format: THREE.RGBAFormat, depthBuffer: false });
        rt.texture.minFilter = rt.texture.magFilter = THREE.LinearFilter;
        rt.texture.wrapS = rt.texture.wrapT = rt.texture.wrapR = THREE.ClampToEdgeWrapping;
        return rt;
      };
      const up = mk(), side = mk();
      const u = this.mat.uniforms;
      u.uGrid.value = grid; u.uOcc.value = occ; u.uLights.value = ld.tex; u.uBins.value = ld.bins; u.uBounce.value = bounceTex;
      u.uCells.value.set(L.w, L.h); u.uCell.value = C; u.uWorld.value.set(L.w * C, L.ceil, L.h * C);
      u.uTexels.value.set(W, D); u.uTs.value = ts; u.uSamples.value = opts.samples; u.uLW.value = ld.LW; u.uBK.value = ld.BK;
      u.uBounceK.value = bk; u.uAmbient.value.set(amb[0], amb[1], amb[2]);
      const prevRT = r.getRenderTarget();
      for (const [rt, mode] of [[up, 0], [side, 1]]) {
        u.uMode.value = mode;
        for (let k = 0; k < NY; k++) {
          u.uLayerY.value = Math.min(L.ceil - 0.02, Math.max(0.02, k / (NY - 1) * L.ceil));
          r.setRenderTarget(rt, k);
          r.render(this.scene, this.cam);
        }
      }
      r.setRenderTarget(prevRT);
      grid.dispose(); occ.dispose(); ld.tex.dispose(); ld.bins.dispose();
      return { up, side, bounceTex, cells: cellL, NY, W, D };
    }
  }
  PB.LightBake = LightBake;
})(typeof window !== 'undefined' ? window : globalThis);
