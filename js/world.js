/* Dünya kurucu: ızgaradan birleşik ve parçalı geometri, pişirilmiş ışık haritası, armatürler,
   dinamik ışık havuzu, kapılar, dekorlar, çıkartmalar, tema ekstraları ve çarpışma. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, T = PB.Tex, P = PB.Props, G = PB.LevelGen;
  const { DX, DY, EDGE, SOLID } = G;

  const THEMES = {
    arcade: { floorRefl: 0.02, wall: 'arcadeWall', floor: 'arcadeCarpet', ceil: 'arcadeWall', ceilTint: 0x3a3440, trim: 'darkWood', pillar: 'arcadeWall', ambient: [0.012, 0.01, 0.018], bounce: 0.3, ceilFactor: 0.5, env: [0.05, 0.03, 0.08], envPanel: [1.4, 1.1, 1.6], trimH: 0.12, wainscot: true },
    yellow: { floorRefl: 0.04, wall: 'wallpaper', floor: 'carpet', ceil: 'ceiling', trim: 'trimPaint', pillar: 'wallpaper', ambient: [0.05, 0.045, 0.028], bounce: 0.45, ceilFactor: 0.8, env: [0.5, 0.42, 0.2], envPanel: [4, 3.8, 3.2], trimH: 0.1 },
    dark: { floorRefl: 0.03, wall: 'wallpaper', wallTint: 0x6a6258, floor: 'carpet', floorTint: 0x5a5448, ceil: 'ceiling', ceilTint: 0x707070, trim: 'trimPaint', pillar: 'wallpaper', ambient: [0.004, 0.004, 0.005], bounce: 0.35, ceilFactor: 0.7, env: [0.05, 0.05, 0.05], envPanel: [1.5, 1.4, 1.2], trimH: 0.1 },
    concrete: { floorRefl: 0.14, wall: 'concreteWall', floor: 'concreteFloor', ceil: 'concreteWall', ceilTint: 0x55585c, trim: null, pillar: 'concreteWall', ambient: [0.012, 0.013, 0.016], bounce: 0.35, ceilFactor: 0.45, env: [0.08, 0.09, 0.1], envPanel: [3, 2.6, 2], trimH: 0 },
    pool: { floorRefl: 0.45, wallRefl: 0.25, wall: 'tile', floor: 'tile', ceil: 'tile', trim: null, pillar: 'tile', ambient: [0.1, 0.12, 0.13], bounce: 0.6, ceilFactor: 0.85, env: [0.4, 0.46, 0.5], envPanel: [2.6, 2.8, 3], trimH: 0 },
    office: { floorRefl: 0, wall: 'drywall', floor: 'officeCarpet', ceil: 'ceiling', trim: 'rubber', pillar: 'drywall', low: 'fabric', ambient: [0.03, 0.033, 0.036], bounce: 0.4, ceilFactor: 0.8, env: [0.25, 0.28, 0.3], envPanel: [3.5, 3.7, 4], trimH: 0.1 },
    maze: { floorRefl: 0.35, wall: 'mazeWall', floor: 'mazeFloor', ceil: null, trim: null, pillar: 'mazeWall', block: 'mazeWall', ambient: [0.01, 0.01, 0.04], bounce: 0.3, ceilFactor: 1, env: [0.02, 0.02, 0.1], envPanel: [0.6, 0.6, 3], trimH: 0 },
    glitch: { floorRefl: 0.35, wall: 'mazeWall', floor: 'mazeFloor', ceil: null, trim: null, pillar: 'mazeWall', block: 'mazeWall', ambient: [0.02, 0.01, 0.03], bounce: 0.3, ceilFactor: 1, env: [0.08, 0.02, 0.1], envPanel: [3, 0.6, 2], trimH: 0 },
    tunnel: { cove: 0.6, floorRefl: 0.3, wall: 'brick', floor: 'concreteFloor', floorTint: 0x7a7870, ceil: 'brick', ceilTint: 0x6a6660, trim: null, pillar: 'brick', ambient: [0.006, 0.006, 0.007], bounce: 0.3, env: [0.04, 0.04, 0.045], envPanel: [1.2, 1.0, 0.8], trimH: 0 },
    school: { floorRefl: 0.22, wall: 'cinderblock', wallTint: 0xe8ecd8, floor: 'linoleum', ceil: 'ceiling', trim: 'rubber', pillar: 'cinderblock', ambient: [0.018, 0.02, 0.02], bounce: 0.42, env: [0.2, 0.22, 0.2], envPanel: [3, 3.2, 3.2], trimH: 0.1 },
    hospital: { floorRefl: 0.3, wall: 'hospitalWall', floor: 'vinyl', ceil: 'ceiling', trim: 'rubber', pillar: 'hospitalWall', ambient: [0.012, 0.016, 0.015], bounce: 0.45, env: [0.18, 0.22, 0.2], envPanel: [3, 3.4, 3.2], trimH: 0.12 },
    motel: { floorRefl: 0, wall: 'motelWallpaper', floor: 'motelCarpet', ceil: 'ceiling', ceilTint: 0xd8d0c0, trim: 'darkWood', pillar: 'motelWallpaper', ambient: [0.012, 0.009, 0.006], bounce: 0.35, env: [0.12, 0.08, 0.05], envPanel: [2.4, 2, 1.5], trimH: 0.1 },
    mall: { floorRefl: 0.4, wall: 'drywall', wallTint: 0xf0ece4, floor: 'terrazzo', ceil: 'ceiling', trim: null, pillar: 'drywall', ambient: [0.02, 0.02, 0.022], bounce: 0.5, env: [0.25, 0.25, 0.26], envPanel: [3.5, 3.5, 3.6], trimH: 0 },
    street: { floorRefl: 0.05, wall: 'wallpaper', wallTint: 0xd8c8b0, floor: 'planks', ceil: 'ceiling', trim: 'darkWood', pillar: 'siding', ambient: [0.01, 0.011, 0.016], bounce: 0.3, env: [0.05, 0.06, 0.08], envPanel: [1.2, 1.1, 1.0], trimH: 0.1 },
    workshop: { floorRefl: 0.1, wall: 'cinderblock', wallTint: 0xa8aca4, floor: 'concreteFloor', ceil: 'concreteWall', ceilTint: 0x6a6a68, trim: null, pillar: 'cinderblock', ambient: [0.01, 0.01, 0.009], bounce: 0.35, env: [0.08, 0.08, 0.07], envPanel: [2, 1.8, 1.4], trimH: 0 },
  };
  PB.THEMES = THEMES;

  const LM_K = 20;
  const CHUNK = 8;

  const FRAG_HEAD = `
varying vec3 vPbWorld; varying vec3 vPbNormal;
uniform highp sampler3D uLvUp; uniform highp sampler3D uLvSide; uniform sampler2D uBounce;
uniform vec3 uLvSize; uniform float uLvLayers; uniform float uLmIntensity; uniform float uDownK;
uniform vec4 uPac; uniform vec2 uPacR; uniform float uTime; uniform float uEnvK;
float pbHash(float n){ return fract(sin(n) * 43758.5453); }
`;
  // Baked light volume: irradiance for up-facing and vertical surfaces, bounce for down-facing ones.
  // The shading normal (with normal maps) picks the blend, so bumps catch the light from above.
  const FRAG_LM = `
#if defined( RE_IndirectDiffuse )
{
  vec3 wn = inverseTransformDirection(normal, viewMatrix);
  vec3 wp = vPbWorld + normalize(vPbNormal) * 0.16;
  float ly = clamp(wp.y / uLvSize.y, 0.0, 1.0) * (uLvLayers - 1.0) / uLvLayers + 0.5 / uLvLayers;
  vec3 uvw = vec3(wp.x / uLvSize.x, wp.z / uLvSize.z, ly);
  vec3 eUp = texture(uLvUp, uvw).rgb, eSide = texture(uLvSide, uvw).rgb;
  vec3 eDown = texture2D(uBounce, wp.xz / uLvSize.xz).rgb * uDownK;
  vec3 lm = wn.y >= 0.0 ? mix(eSide, eUp, wn.y) : mix(eSide, eDown, -wn.y);
  float nearP = (1.0 - smoothstep(uPacR.x, uPacR.y, distance(vPbWorld, uPac.xyz))) * uPac.w;
  float blink = step(0.42, pbHash(floor(uTime * 13.0) + floor(vPbWorld.x / 3.0) * 7.0 + floor(vPbWorld.z / 3.0) * 13.0));
  lm *= mix(1.0, 0.12 + 0.55 * blink, nearP);
  lm *= uLmIntensity;
  irradiance += lm * PI;
  float pbLum = clamp(dot(lm, vec3(0.3, 0.59, 0.11)) * 1.2, 0.0, 1.0) * uEnvK;
  iblIrradiance *= pbLum;
  #if defined( RE_IndirectSpecular )
  radiance *= pbLum;
  #endif
}
#endif
`;

  class GeoBuf {
    constructor() { this.p = []; this.n = []; this.uv = []; this.c = []; }
    quad(a, b, c, d, n, uva, uvb, uvc, uvd, ca, cb, cc, cd) {
      // a=sol alt, b=sağ alt, c=sağ üst, d=sol üst (önden bakınca saat yönünün tersi)
      const P = this.p, N = this.n, UV = this.uv, C = this.c;
      for (const v of [a, b, c, a, c, d]) P.push(v[0], v[1], v[2]);
      for (let k = 0; k < 6; k++) N.push(n[0], n[1], n[2]);
      for (const t of [uva, uvb, uvc, uva, uvc, uvd]) UV.push(t[0], t[1]);
      for (const col of [ca, cb, cc, ca, cc, cd]) C.push(col, col, col);
    }
    get count() { return this.p.length / 3; }
    build() {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
      g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
      g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
      g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
      g.computeBoundingSphere();
      return g;
    }
  }

  class World {
    constructor(game, level) {
      this.game = game;
      this.L = level;
      this.C = level.cell;
      this.theme = THEMES[level.theme] || THEMES.yellow;
      this.group = new THREE.Group();
      this.group.name = 'world';
      this.mats = new Map();
      this.colGrid = new Map();
      this.fixtures = [];
      this.fxMeshes = [];
      this.doorObjs = new Map();
      this.animated = [];
      this.screens = [];
      this.zonesOn = new Set(level.meta.zonesOn || [0]);
      this.U = {
        uLvUp: { value: null }, uLvSide: { value: null }, uBounce: { value: null },
        uLvSize: { value: new THREE.Vector3(level.w * this.C, level.ceil, level.h * this.C) }, uLvLayers: { value: 4 }, uDownK: { value: this.theme.bounce * (this.theme.downK || 0.45) },
        uLmIntensity: { value: 1 },
        uPac: { value: new THREE.Vector4(0, -999, 0, 0) }, uPacR: { value: new THREE.Vector2(5, 16) }, uTime: { value: 0 }, uEnvK: { value: 1 },
      };
      const S = PB.Settings.data;
      this.texRes = S.textureRes;
      this.lmRes = S.lightmapRes;
      this.lastFix = 0; this.lastPool = 0;
    }

    // ------------------------------------------------------------ MALZEMELER
    patch(mat) {
      const Uu = this.U;
      mat.onBeforeCompile = sh => {
        Object.assign(sh.uniforms, Uu);
        sh.vertexShader = 'varying vec3 vPbWorld;\nvarying vec3 vPbNormal;\n' + sh.vertexShader.replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
  vec4 pbW = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    pbW = instanceMatrix * pbW;
  #endif
  pbW = modelMatrix * pbW; vPbWorld = pbW.xyz;
  vec3 pbN = objectNormal;
  #ifdef USE_INSTANCING
    pbN = mat3(instanceMatrix) * pbN;
  #endif
  vPbNormal = normalize(mat3(modelMatrix) * pbN);`);
        sh.fragmentShader = FRAG_HEAD + sh.fragmentShader.replace('#include <lights_fragment_maps>', '#include <lights_fragment_maps>\n' + FRAG_LM);
      };
      mat.customProgramCacheKey = () => 'pb-baked-v2';
      return mat;
    }
    pbr(name, o = {}) {
      const set = T.get(name, this.texRes);
      const m = new THREE.MeshStandardMaterial({
        map: set.map, normalMap: set.normalMap, roughnessMap: set.ormMap, aoMap: set.ormMap, metalnessMap: set.metal ? set.ormMap : null,
        roughness: 1, metalness: set.metal ? 1 : 0, color: o.color != null ? o.color : 0xffffff, vertexColors: !!o.vertexColors,
        emissive: set.emissiveMap ? 0xffffff : 0x000000, emissiveMap: set.emissiveMap || null, emissiveIntensity: o.emissiveIntensity != null ? o.emissiveIntensity : 1,
        side: o.side || THREE.FrontSide,
      });
      m.aoMapIntensity = 0.9;
      m.normalScale.set(o.normalScale || 1, o.normalScale || 1);
      m.userData.scale = set.scale;
      return this.patch(m);
    }
    // Wet outdoor ground: puddles and rain ripples layered on top of the baked light patch
    wetten(m, wet) {
      const base = m.onBeforeCompile, uT = this.U.uTime;
      m.onBeforeCompile = (sh, r) => { base(sh, r); PB.Exterior.wetPatch(sh, uT, { wet, pudScale: 0.1 }); };
      m.customProgramCacheKey = () => 'pb-baked-wet';
      return m;
    }
    // Dekor malzeme kütüphanesi
    mat(key) {
      if (this.mats.has(key)) return this.mats.get(key);
      const th = this.theme;
      const S = (color, rough = 0.6, metal = 0, extra = {}) => {
        const { refl, ...rest } = extra;
        const mm = this.patch(new THREE.MeshStandardMaterial(Object.assign({ color, roughness: rough, metalness: metal }, rest)));
        // Screen-space reflection strength (read by the post prepass)
        mm.userData.refl = refl != null ? refl : rest.transparent ? 0 : U.clamp((0.3 - rough) * (metal > 0.5 ? 2.5 : 1.2), 0, 0.6);
        return mm;
      };
      const MT = PB.Models.tex;
      const E = (color, k = 1, extra = {}) => { const c = new THREE.Color(color).multiplyScalar(k); return new THREE.MeshBasicMaterial(Object.assign({ color: c }, extra)); };
      let m;
      switch (key) {
        case 'wall': m = this.pbr(th.wall, { vertexColors: true, color: th.wallTint }); m.userData.refl = th.wallRefl || 0; break;
        case 'floor': m = this.pbr(th.floor, { vertexColors: true, color: th.floorTint, emissiveIntensity: 0.35 }); m.userData.refl = th.floorRefl || 0; break;
        case 'ceil': m = this.pbr(th.ceil || th.wall, { vertexColors: true, color: th.ceilTint }); break;
        case 'block': m = this.pbr(th.block || th.wall, { vertexColors: true }); break;
        case 'low': m = this.pbr('fabric', { vertexColors: true }); break;
        case 'pool': m = this.pbr('tile', { vertexColors: true }); m.userData.refl = 0.4; break;
        case 'pillar': m = this.pbr(th.pillar || th.wall, { color: th.wallTint }); break;
        case 'trimPaint': m = S(0xa89c74, 0.5); break;
        case 'trim': m = th.trim === 'trimPaint' ? S(0xa89c74, 0.5) : th.trim === 'rubber' ? S(0x2a2a2c, 0.8) : th.trim === 'darkWood' ? this.pbr('wood', { color: 0x5a4030 }) : S(0x333333, 0.6); break;
        case 'wood': m = this.pbr('wood'); break;
        case 'darkWood': m = this.pbr('wood', { color: 0x6a4a36 }); break;
        case 'laminate': m = this.pbr('wood', { color: 0xe0d0b4 }); m.roughness = 0.6; break;
        case 'crateWood': m = this.pbr('wood', { color: 0xc8a878 }); break;
        case 'metal': m = this.pbr('metal'); break;
        case 'darkMetal': m = this.pbr('metal', { color: 0x44464c }); break;
        case 'paintMetal': m = S(0x6d7a82, 0.5, 0.25); break;
        case 'cabinetBody': m = S(0x121216, 0.45); break;
        case 'cabinetSide': m = S(0x3b1a6a, 0.4); break;
        case 'blackPlastic': m = S(0x0d0d0f, 0.45); break;
        case 'whitePlastic': m = S(0xe8e6e0, 0.35); break;
        case 'beigePlastic': m = S(0xcfc4a8, 0.5); break;
        case 'redPlastic': m = S(0xc81d1d, 0.35); break;
        case 'yellowPlastic': m = S(0xf2c21b, 0.35); break;
        case 'bluePlastic': m = S(0x1d4fc8, 0.35); break;
        case 'pinkPlastic': m = S(0xff7ad0, 0.35); break;
        case 'redPaint': m = S(0xb01818, 0.45, 0.2); break;
        case 'yellowPaint': m = S(0xe8b818, 0.5, 0.2); break;
        case 'chrome': m = S(0xdddddd, 0.15, 1); break;
        case 'brass': m = S(0xc8a040, 0.3, 1); break;
        case 'mirror': m = S(0xffffff, 0.03, 1, { refl: 1 }); break;
        case 'glass': m = S(0x9ab8d0, 0.05, 0, { transparent: true, opacity: 0.22, depthWrite: false }); break;
        case 'waterJug': m = S(0x7ab0e0, 0.08, 0, { transparent: true, opacity: 0.5 }); break;
        case 'ceramic': m = S(0xf2f2ee, 0.15); break;
        case 'paper': m = S(0xf0ebdc, 0.9); break;
        case 'yellowPaper': m = S(0xf5e36b, 0.9); break;
        case 'cork': m = S(0xa77b4f, 1); break;
        case 'register': m = S(0x3a3a3a, 0.5); break;
        case 'pinkPlush': m = S(0xff8fd8, 1); break;
        case 'bluePlush': m = S(0x6f8fff, 1); break;
        case 'cardboard': m = S(0xa47c4c, 0.95); break;
        case 'greenShade': m = S(0x1f6b3a, 0.5, 0.3); break;
        case 'rackBlue': m = S(0x1c4f9c, 0.45, 0.5); break;
        case 'rackOrange': m = S(0xd8641b, 0.5, 0.3); break;
        case 'barrelBlue': m = S(0x1f4f8f, 0.5, 0.3); break;
        case 'towel': m = S(0x9fd3e8, 1); break;
        case 'blackFabric': m = S(0x1a1a1f, 1); break;
        case 'bagFabric': m = S(0x2f5a3a, 1); break;
        case 'fabric': m = this.pbr('fabric'); break;
        case 'carpetStep': m = this.pbr(th.floor === 'arcadeCarpet' ? 'carpet' : th.floor); break;
        case 'concrete': m = this.pbr('concreteWall'); break;
        case 'batteryBody': m = S(0x1a1a1a, 0.4, 0.3); break;
        case 'almondLabel': m = S(0xe8d7a8, 0.8); break;
        case 'candle': m = S(0xf2ead0, 0.8, 0, { emissive: 0xffaa55, emissiveIntensity: 0.3 }); break;
        case 'socket': m = S(0x050505, 0.4); break;
        case 'cassette': m = S(0x222222, 0.4); break;
        case 'folders': m = new THREE.MeshStandardMaterial({ map: this.foldersTex(), roughness: 0.8 }); this.patch(m); break;
        case 'photoPlane': m = new THREE.MeshStandardMaterial({ map: T.photo('shrine'), roughness: 0.4 }); this.patch(m); break;
        case 'pinballArt': m = new THREE.MeshBasicMaterial({ map: T.poster('poster1'), color: new THREE.Color(0.9, 0.9, 0.9) }); break;
        case 'wb': m = new THREE.MeshStandardMaterial({ map: T.whiteboard('blank', ''), roughness: 0.3 }); this.patch(m); break;
        case 'coinSlot': m = E(0xff2020, 2.5); break;
        case 'glassYellow': m = E(0xffd070, 3); break;
        case 'glowGreen': m = E(0x40ff60, 3); break;
        case 'lcd': m = E(0x40ff90, 1.5); break;
        case 'keys': m = S(0x999999, 0.5, 0.6); break;
        case 'leds': m = new THREE.MeshBasicMaterial({ map: this.ledsTex(), color: new THREE.Color(1.6, 1.6, 1.6) }); break;
        case 'pellet': m = E(0xffb8ae, 6); break;
        case 'portal': m = E(0xff9ad5, 5); break;
        case 'whiteLight': m = E(0xfff8e8, 9); break;
        case 'elevatorPanel': m = E(0xffb040, 2); break;
        case 'crt': m = new THREE.MeshBasicMaterial({ map: T.crt('idle', ['C:\\> _']), color: new THREE.Color(1.3, 1.3, 1.3) }); break;
        // --- Detailed model materials (models.js)
        case 'tmold': m = S(0xd8b020, 0.3, 0, { refl: 0.2 }); break;
        case 'kick': m = S(0x18181b, 0.45, 0.7); break;
        case 'coinDoor': m = S(0xa4a7ab, 0.32, 1); break;
        case 'bezel': m = S(0x040405, 0.12, 0, { refl: 0.35 }); break;
        case 'grille': m = new THREE.MeshStandardMaterial({ map: MT.grille(), roughness: 0.6, metalness: 0.4 }); m.map.repeat.set(4, 1); this.patch(m); break;
        case 'cpArt': m = new THREE.MeshStandardMaterial({ map: MT.panel('classic'), roughness: 0.25 }); this.patch(m); break;
        case 'coinCard': m = new THREE.MeshStandardMaterial({ map: MT.coinCard(), roughness: 0.6, emissive: 0xff3020, emissiveIntensity: 0.05 }); this.patch(m); break;
        case 'airTable': m = S(0xf4f4f0, 0.2, 0, { refl: 0.3 }); break;
        case 'airLine': m = S(0xd01818, 0.3); break;
        case 'pinballPlay': m = new THREE.MeshStandardMaterial({ map: T.poster('poster3'), roughness: 0.3 }); this.patch(m); break;
        case 'changeFace': m = new THREE.MeshStandardMaterial({ map: T.label('changeFace', 'CHANGE', { w: 256, h: 256, bg: '#1b2a48', color: '#ffd84a', font: `bold 58px ${T.FONTS.FONT_TYPE}` }), roughness: 0.4 }); this.patch(m); break;
        case 'woodVarnish': m = this.pbr('wood', { color: 0x8a5a3c }); m.roughness = 0.55; m.userData.refl = 0.18; break;
        case 'drawerWood': m = this.pbr('wood', { color: 0x6e4a30 }); break;
        case 'drawer': m = new THREE.MeshStandardMaterial({ map: MT.drawer(), roughness: 0.5 }); this.patch(m); break;
        case 'leather': m = S(0x3b2217, 0.55, 0, { refl: 0.05 }); break;
        case 'folderBrown': m = S(0xb08850, 0.85); break;
        case 'mug': m = S(0xe6dfcc, 0.25, 0, { refl: 0.15 }); break;
        case 'coffee': m = S(0x1d0f06, 0.05, 0, { refl: 0.5 }); break;
        case 'cigarette': m = S(0xefe9dc, 0.8); break;
        case 'greenGlass': m = S(0x0f5a2c, 0.12, 0, { emissive: 0x1d7a3e, emissiveIntensity: 0.35, refl: 0.2 }); break;
        case 'labelCard': m = S(0xe8e2cf, 0.8); break;
        case 'safeGreen': m = S(0x2f3f35, 0.4, 0.5); break;
        case 'tape': m = S(0xb89868, 0.4, 0, { refl: 0.1 }); break;
        case 'porcelain': m = S(0xf3f2ec, 0.07, 0, { refl: 0.35 }); break;
        case 'porcelainIn': m = S(0xe4e2d6, 0.09, 0, { refl: 0.3 }); break;
        case 'water': m = S(0x6f8a88, 0.02, 0, { refl: 0.85 }); break;
        case 'seat': m = S(0xf0eee6, 0.18, 0, { refl: 0.15 }); break;
        case 'soap': m = S(0xf2d8e0, 0.3); break;
        case 'paperRoll': m = S(0xf4f2ea, 0.95); break;
        case 'keysBeige': m = new THREE.MeshStandardMaterial({ map: T.canvas('keysBeige', 128, 64, (g, w, h) => { g.fillStyle = '#6b6352'; g.fillRect(0, 0, w, h); g.fillStyle = '#d8ceb2'; for (let y = 0; y < 5; y++) for (let x = 0; x < 15; x++) g.fillRect(2 + x * 8.4, 2 + y * 12.4, 7, 10.4); }), roughness: 0.5 }); this.patch(m); break;
        case 'lace': m = S(0xefe8da, 0.95); break;
        case 'wrap': m = S(0xd8e4ea, 0.1, 0, { transparent: true, opacity: 0.35, depthWrite: false }); break;
        case 'batteryTop': m = S(0xc89a28, 0.3, 0.8); break;
        case 'rubber': m = S(0x121212, 0.9); break;
        case 'floorTile': m = this.pbr('hexTile', { vertexColors: true }); m.userData.refl = 0.3; break;
        case 'floorWood': m = this.pbr('planks', { vertexColors: true }); m.userData.refl = 0.12; break;
        case 'floorConcrete': m = this.pbr('concreteFloor', { vertexColors: true }); m.userData.refl = 0.05; break;
        case 'floorLino': m = this.pbr('linoleum', { vertexColors: true }); m.userData.refl = 0.12; break;
        case 'wallTile': m = this.pbr('subway', { vertexColors: true }); m.userData.refl = 0.2; break;
        case 'wainscotWood': m = this.pbr('wood', { vertexColors: true, color: 0x6e4a30 }); m.userData.scale = 0.8; break;
        case 'rackUpright': m = new THREE.MeshStandardMaterial({ map: PB.Models.tex.perforated(), color: 0x2a5fb0, roughness: 0.45, metalness: 0.5 }); this.patch(m); break;
        case 'wireDeck': m = new THREE.MeshStandardMaterial({ map: PB.Models.tex.wire(), alphaTest: 0.5, color: 0x9aa0a8, roughness: 0.4, metalness: 0.8, side: THREE.DoubleSide }); this.patch(m); break;
        case 'siding': m = this.pbr('siding', { vertexColors: true }); m.userData.refl = 0.05; break;
        case 'fence': m = this.pbr('wood', { vertexColors: true, color: 0xe8e4da }); break;
        case 'floorGrass': m = this.pbr('grass', { vertexColors: true }); m.userData.refl = 0.08; this.wetten(m, 0.6); break;
        case 'floorAsphalt': m = this.pbr('asphalt', { vertexColors: true }); m.userData.refl = 0.55; this.wetten(m, 1); break;
        case 'floorSidewalk': m = this.pbr('concreteFloor', { vertexColors: true, color: 0xb8b4ac }); m.userData.refl = 0.35; this.wetten(m, 0.8); break;
        case 'roofShingle': m = this.pbr('shingles'); break;
        case 'fixtureWhite': m = S(0xe9e6dc, 0.45, 0.1); break;
        case 'fixtureGrime': m = S(0x6b6250, 0.9, 0, { transparent: true, opacity: 0.35, depthWrite: false }); break;
        case 'fixtureGrey': m = S(0x9aa0a4, 0.5, 0.1); break;
        case 'enamel': m = S(0x2c4a3a, 0.28, 0.1); break;
        case 'enamelIn': m = S(0xf2f0e6, 0.3, 0, { emissive: 0xfff0d0, emissiveIntensity: 0.15 }); break;
        case 'bakelite': m = S(0x1c1410, 0.35); break;
        case 'blackMetal': m = S(0x151517, 0.4, 0.7); break;
        case 'calendar': m = new THREE.MeshStandardMaterial({ map: MT.calendar(), roughness: 0.8 }); this.patch(m); break;
        case 'screen': m = new THREE.MeshBasicMaterial({ color: 0x050505 }); break;
        case 'marquee': m = new THREE.MeshBasicMaterial({ color: 0x050505 }); break;
        default: {
          // Simple colored materials and textured ones from the model library
          const spec = PB.Models.MATS[key];
          if (spec && spec.tex) { m = new THREE.MeshStandardMaterial({ map: PB.Models.tex[spec.tex](), color: spec.color != null ? spec.color : 0xffffff, roughness: spec.rough != null ? spec.rough : 0.7, metalness: spec.metal || 0, transparent: !!spec.transparent, opacity: spec.opacity != null ? spec.opacity : 1, depthWrite: !spec.transparent, side: spec.double ? THREE.DoubleSide : THREE.FrontSide, emissive: spec.emissive != null ? new THREE.Color(spec.emissive) : new THREE.Color(0), emissiveMap: spec.emissive != null ? PB.Models.tex[spec.tex]() : null, emissiveIntensity: spec.ei != null ? spec.ei : 1 }); this.patch(m); m.userData.refl = spec.refl || 0; }
          else if (spec && spec.glow) m = E(spec.color, spec.glow);
          else if (spec) m = S(spec.color, spec.rough != null ? spec.rough : 0.6, spec.metal || 0, Object.assign({}, spec.transparent ? { transparent: true, opacity: spec.opacity, depthWrite: false } : {}, spec.double ? { side: THREE.DoubleSide } : {}, spec.refl != null ? { refl: spec.refl } : {}));
          else m = S(0x888888, 0.6);
        }
      }
      this.mats.set(key, m);
      return m;
    }
    ledsTex() {
      return T.canvas('leds', 128, 256, (g, w, h) => {
        g.fillStyle = '#060607'; g.fillRect(0, 0, w, h);
        const r = U.rng(3);
        for (let y = 8; y < h; y += 12) { g.fillStyle = '#16161a'; g.fillRect(6, y, w - 12, 9); for (let k = 0; k < 6; k++) { g.fillStyle = r() < 0.6 ? '#30ff60' : r() < 0.5 ? '#ffb020' : '#1a1a1a'; g.fillRect(12 + k * 6, y + 3, 3, 3); } }
      });
    }
    foldersTex() {
      return T.canvas('folders', 512, 256, (g, w, h) => {
        const r = U.rng(8);
        for (let y = 0; y < h; y += 64) for (let x = 0; x < w;) { const fw = r.int(6, 16); g.fillStyle = r.pick(['#b8a070', '#8a6a3a', '#3a5a8a', '#8a3a3a', '#d8d0b8']); g.fillRect(x, y + 4, fw - 1, 58); x += fw; }
      });
    }

    // ------------------------------------------------------------ İNŞA
    async build(progress) {
      const step = async (p, label) => { progress(p, label); await U.nextFrame(); };
      await step(0.02, PB.t('load.textures', { n: 0, m: 1 }));
      const texNames = [this.theme.wall, this.theme.floor, this.theme.ceil, this.theme.block, this.theme.pillar, 'wood', 'metal'].filter(Boolean);
      if (this.L.theme === 'office') texNames.push('fabric');
      if (this.L.theme === 'pool' || this.L.floorType.some(v => v)) texNames.push('tile');
      if (this.L.meta.finishes) texNames.push('hexTile', 'subway', 'planks', 'linoleum', 'concreteFloor');
      if (this.L.meta.outdoor) texNames.push('siding', 'grass', 'asphalt', 'shingles');
      if (this.L.doors.some(d => d.kind === 'stair')) texNames.push('concreteWall');
      const uniq = [...new Set(texNames)];
      for (let k = 0; k < uniq.length; k++) {
        T.get(uniq[k], this.texRes);
        await step(0.02 + 0.33 * (k + 1) / uniq.length, PB.t('load.textures', { n: k + 1, m: uniq.length }));
      }
      await step(0.36, PB.t('load.walls'));
      this.buildArchitecture();
      await step(0.42, PB.t('load.bake'));
      await this.bake(p => progress(0.42 + p * 0.38, PB.t('load.bake')));
      await step(0.82, PB.t('load.fixtures'));
      this.buildFixtures();
      this.buildLightPool();
      await step(0.86, PB.t('load.props'));
      this.buildProps();
      this.buildPillars();
      this.buildDoors();
      await step(0.9, PB.t('load.decals'));
      this.buildDecals();
      this.buildThemeExtras();
      this.buildParticles();
      this.buildEnvironment();
      await step(0.96, PB.t('load.shaders'));
      this.ready = true;
      return this;
    }

    chunkBuf(bufs, mat, x, z) {
      const key = mat + '|' + Math.floor(x / (this.C * CHUNK)) + ',' + Math.floor(z / (this.C * CHUNK));
      let b = bufs.get(key);
      if (!b) { b = new GeoBuf(); b.mat = mat; bufs.set(key, b); }
      return b;
    }
    // Dikey yüzey: p0→p1 (dünya xz), normal (nx,nz), y0..y1, AO satırları
    vface(buf, x0, z0, x1, z1, y0, y1, nx, nz, scale, ao) {
      // Sağ vektör = (nz, 0, -nx); a sol alt olacak biçimde sırala
      const rx = nz, rz = -nx;
      if ((x1 - x0) * rx + (z1 - z0) * rz < 0) { let t = x0; x0 = x1; x1 = t; t = z0; z0 = z1; z1 = t; }
      const alongX = Math.abs(x1 - x0) > Math.abs(z1 - z0);
      const u0 = (alongX ? x0 : z0) / scale, u1 = (alongX ? x1 : z1) / scale;
      const rows = ao || [[y0, 1], [y1, 1]];
      for (let k = 0; k < rows.length - 1; k++) {
        const ya = Math.max(y0, rows[k][0]), yb = Math.min(y1, rows[k + 1][0]);
        if (yb <= ya + 1e-4) continue;
        const aoA = U.lerp(rows[k][1], rows[k + 1][1], (ya - rows[k][0]) / Math.max(1e-4, rows[k + 1][0] - rows[k][0]));
        const aoB = U.lerp(rows[k][1], rows[k + 1][1], (yb - rows[k][0]) / Math.max(1e-4, rows[k + 1][0] - rows[k][0]));
        buf.quad([x0, ya, z0], [x1, ya, z1], [x1, yb, z1], [x0, yb, z0], [nx, 0, nz],
          [u0, ya / scale], [u1, ya / scale], [u1, yb / scale], [u0, yb / scale], aoA, aoA, aoB, aoB);
      }
    }
    hface(buf, x0, z0, x1, z1, y, up, scale, ao = 1) {
      // x0<x1, z0<z1
      const u0 = x0 / scale, u1 = x1 / scale, v0 = z0 / scale, v1 = z1 / scale;
      if (up) buf.quad([x0, y, z1], [x1, y, z1], [x1, y, z0], [x0, y, z0], [0, 1, 0], [u0, v1], [u1, v1], [u1, v0], [u0, v0], ao, ao, ao, ao);
      else buf.quad([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1], [0, -1, 0], [u0, v0], [u1, v0], [u1, v1], [u0, v1], ao, ao, ao, ao);
    }
    // Picket fence along an edge
    fenceRun(bufs, horiz, line, a0, a1) {
      const buf = this.chunkBuf(bufs, 'fence', horiz ? (a0 + a1) / 2 : line, horiz ? line : (a0 + a1) / 2);
      const t = 0.03;
      for (let a = a0 + 0.06; a < a1; a += 0.16) {
        const b = Math.min(a1, a + 0.09);
        if (horiz) { this.vface(buf, a, line - t, b, line - t, 0, 1.05, 0, -1, 1, null); this.vface(buf, a, line + t, b, line + t, 0, 1.05, 0, 1, 1, null); this.hface(buf, a, line - t, b, line + t, 1.05, true, 1); }
        else { this.vface(buf, line - t, a, line - t, b, 0, 1.05, -1, 0, 1, null); this.vface(buf, line + t, a, line + t, b, 0, 1.05, 1, 0, 1, null); this.hface(buf, line - t, a, line + t, b, 1.05, true, 1); }
      }
      for (const y of [0.3, 0.8]) {
        if (horiz) { this.vface(buf, a0, line - t - 0.02, a1, line - t - 0.02, y, y + 0.08, 0, -1, 1, null); this.vface(buf, a0, line + t + 0.02, a1, line + t + 0.02, y, y + 0.08, 0, 1, 1, null); }
        else { this.vface(buf, line - t - 0.02, a0, line - t - 0.02, a1, y, y + 0.08, -1, 0, 1, null); this.vface(buf, line + t + 0.02, a0, line + t + 0.02, a1, y, y + 0.08, 1, 0, 1, null); }
      }
    }
    // Quarter-round cove along a wall top. wline: across-coordinate of the wall face; e0..e1 along the run;
    // (nx, nz): the wall face normal (into the room); H: ceiling height; r: radius
    cove(buf, horiz, wline, e0, e1, nx, nz, H, r, s) {
      const N = 6, dir = horiz ? nz : nx;
      const alongRight = horiz ? nz : -nx;            // right vector (nz, -nx) projected on the run axis
      const aL = alongRight < 0 ? e1 : e0, aR = alongRight < 0 ? e0 : e1;
      const pt = (a, q) => { const across = wline + dir * r * (1 - Math.cos(q)), y = H - r + r * Math.sin(q); return horiz ? [a, y, across] : [across, y, a]; };
      let arc = (H - r) / s;
      for (let k = 0; k < N; k++) {
        const qa = k / N * Math.PI / 2, qb = (k + 1) / N * Math.PI / 2, qm = (qa + qb) / 2;
        const n = horiz ? [0, -Math.sin(qm), dir * Math.cos(qm)] : [dir * Math.cos(qm), -Math.sin(qm), 0];
        const va = arc, vb = arc + r * (qb - qa) / s; arc = vb;
        const ao = 0.92 - 0.2 * Math.sin(qm);
        buf.quad(pt(aL, qa), pt(aR, qa), pt(aR, qb), pt(aL, qb), n, [aL / s, va], [aR / s, va], [aR / s, vb], [aL / s, vb], ao, ao, ao, ao);
      }
      // end caps (both windings: one of them faces whoever looks at the open end)
      for (const a of [e0, e1]) {
        const cn = horiz ? [a === e0 ? -1 : 1, 0, 0] : [0, 0, a === e0 ? -1 : 1];
        const corner = horiz ? [a, H, wline] : [wline, H, a];
        for (let k = 0; k < N; k++) {
          const p0 = pt(a, k / N * Math.PI / 2), p1 = pt(a, (k + 1) / N * Math.PI / 2);
          buf.quad(corner, p0, p1, p1, cn, [0, 0], [0.1, 0], [0.1, 0.1], [0.1, 0.1], 0.7, 0.7, 0.7, 0.7);
          buf.quad(corner, p1, p0, p0, cn.map(v => -v), [0, 0], [0.1, 0], [0.1, 0.1], [0.1, 0.1], 0.7, 0.7, 0.7, 0.7);
        }
      }
    }
    wallAO(h) { return [[0, 0.42], [0.14, 0.58], [0.65, 0.86], [Math.max(0.7, h - 0.45), 0.98], [h, 0.8]]; }

    buildArchitecture() {
      const L = this.L, C = this.C, th = this.theme, H = L.ceil;
      const bufs = new Map();
      const scaleOf = key => (this.mat(key).userData.scale || 2);
      const passable = (x, y) => L.inb(x, y) && L.solid[L.i(x, y)] === 0;
      const vis = (x, y) => L.inb(x, y) && (L.solid[L.i(x, y)] === 0 || L.solid[L.i(x, y)] === SOLID.RACK);
      const t = 0.2;
      const wallS = scaleOf('wall');
      const trimMat = th.trim ? 'trim' : null;
      this.trimH = th.trimH;
      const outdoor = L.meta.outdoor;
      const od = (x, y) => !!(outdoor && L.inb(x, y) && outdoor[L.i(x, y)]);
      const emitRun = (horiz, line, a0, a1, kind, sideA, sideB, odA, odB) => {
        // horiz: kenar x boyunca, z = line; değilse z boyunca, x = line
        if (kind === EDGE.FENCE) { this.fenceRun(bufs, horiz, line, a0, a1); return; }
        const mkey = kind === EDGE.LOW ? 'low' : 'wall';
        const h = kind === EDGE.LOW ? 1.35 : kind === EDGE.GLASS ? H : H;
        const s = kind === EDGE.LOW ? scaleOf('low') : wallS;
        const ao = kind === EDGE.LOW ? [[0, 0.55], [0.3, 0.85], [h, 1]] : this.wallAO(h);
        const e0 = a0 - t / 2, e1 = a1 + t / 2;
        const midX = horiz ? (a0 + a1) / 2 : line, midZ = horiz ? line : (a0 + a1) / 2;
        const buf0 = this.chunkBuf(bufs, mkey, midX, midZ);
        // Outdoor faces of a house wall are clapboard siding
        const sideBuf = od2 => (od2 ? this.chunkBuf(bufs, 'siding', midX, midZ) : buf0);
        const buf = buf0;
        const segs = kind === EDGE.GLASS ? [[0, 0.55], [2.75, h]] : [[0, h]];
        for (const [ya, yb] of segs) {
          if (horiz) {
            if (sideA) this.vface(sideBuf(odA), e0, line - t / 2, e1, line - t / 2, ya, yb, 0, -1, odA ? scaleOf('siding') : s, odA ? null : ao);
            if (sideB) this.vface(sideBuf(odB), e0, line + t / 2, e1, line + t / 2, ya, yb, 0, 1, odB ? scaleOf('siding') : s, odB ? null : ao);
            this.vface(buf, e0, line + t / 2, e0, line - t / 2, ya, yb, -1, 0, s, ao);
            this.vface(buf, e1, line - t / 2, e1, line + t / 2, ya, yb, 1, 0, s, ao);
            if (kind !== EDGE.WALL || !th.ceil) this.hface(buf, e0, line - t / 2, e1, line + t / 2, yb, true, s, 1);
            if (kind === EDGE.GLASS && ya > 0) this.hface(buf, e0, line - t / 2, e1, line + t / 2, ya, false, s, 1);
          } else {
            if (sideA) this.vface(sideBuf(odA), line - t / 2, e0, line - t / 2, e1, ya, yb, -1, 0, odA ? scaleOf('siding') : s, odA ? null : ao);
            if (sideB) this.vface(sideBuf(odB), line + t / 2, e0, line + t / 2, e1, ya, yb, 1, 0, odB ? scaleOf('siding') : s, odB ? null : ao);
            this.vface(buf, line - t / 2, e0, line + t / 2, e0, ya, yb, 0, -1, s, ao);
            this.vface(buf, line + t / 2, e1, line - t / 2, e1, ya, yb, 0, 1, s, ao);
            if (kind !== EDGE.WALL || !th.ceil) this.hface(buf, line - t / 2, e0, line + t / 2, e1, yb, true, s, 1);
            if (kind === EDGE.GLASS && ya > 0) this.hface(buf, line - t / 2, e0, line + t / 2, e1, ya, false, s, 1);
          }
        }
        // Vaulted haunch: a curved brick cove where wall meets ceiling (storm tunnels)
        if (th.cove && kind === EDGE.WALL) {
          if (horiz) { if (sideA && !odA) this.cove(buf, true, line - t / 2, a0, a1, 0, -1, H, th.cove, wallS); if (sideB && !odB) this.cove(buf, true, line + t / 2, a0, a1, 0, 1, H, th.cove, wallS); }
          else { if (sideA && !odA) this.cove(buf, false, line - t / 2, a0, a1, -1, 0, H, th.cove, wallS); if (sideB && !odB) this.cove(buf, false, line + t / 2, a0, a1, 1, 0, H, th.cove, wallS); }
        }
        if (kind === EDGE.GLASS) {
          const gb = this.chunkBuf(bufs, 'glassPane', midX, midZ);
          if (horiz) { this.vface(gb, a0, line, a1, line, 0.55, 2.75, 0, 1, 1); this.vface(gb, a0, line, a1, line, 0.55, 2.75, 0, -1, 1); }
          else { this.vface(gb, line, a0, line, a1, 0.55, 2.75, 1, 0, 1); this.vface(gb, line, a0, line, a1, 0.55, 2.75, -1, 0, 1); }
        }
        // Süpürgelik
        if (trimMat && kind === EDGE.WALL && th.trimH > 0) {
          const tb = this.chunkBuf(bufs, 'trim', midX, midZ);
          const o = t / 2 + 0.016, hh = th.trimH;
          if (horiz) {
            if (sideA && !odA) { this.vface(tb, e0, line - o, e1, line - o, 0, hh, 0, -1, 1); this.hface(tb, e0, line - o, e1, line - t / 2, hh, true, 1); }
            if (sideB && !odB) { this.vface(tb, e0, line + o, e1, line + o, 0, hh, 0, 1, 1); this.hface(tb, e0, line + t / 2, e1, line + o, hh, true, 1); }
          } else {
            if (sideA && !odA) { this.vface(tb, line - o, e0, line - o, e1, 0, hh, -1, 0, 1); this.hface(tb, line - o, e0, line - t / 2, e1, hh, true, 1); }
            if (sideB && !odB) { this.vface(tb, line + o, e0, line + o, e1, 0, hh, 1, 0, 1); this.hface(tb, line + t / 2, e0, line + o, e1, hh, true, 1); }
          }
        }
      };
      // Yatay kenarlar (z = y*C)
      for (let y = 0; y <= L.h; y++) {
        let x = 0;
        while (x < L.w) {
          const kind = L.hW[y * L.w + x];
          const vA = vis(x, y - 1), vB = vis(x, y), oA = od(x, y - 1), oB = od(x, y);
          if (!kind || (!vA && !vB) || L.doorMap.get((y * L.w + x) * 2)) { x++; continue; }
          let x1 = x;
          while (x1 + 1 < L.w && L.hW[y * L.w + x1 + 1] === kind && !L.doorMap.get((y * L.w + x1 + 1) * 2) && vis(x1 + 1, y - 1) === vA && vis(x1 + 1, y) === vB && od(x1 + 1, y - 1) === oA && od(x1 + 1, y) === oB) x1++;
          emitRun(true, y * C, x * C, (x1 + 1) * C, kind, vA, vB, oA, oB);
          x = x1 + 1;
        }
      }
      // Dikey kenarlar (x = x*C)
      for (let x = 0; x <= L.w; x++) {
        let y = 0;
        while (y < L.h) {
          const kind = L.vW[y * (L.w + 1) + x];
          const vA = vis(x - 1, y), vB = vis(x, y), oA = od(x - 1, y), oB = od(x, y);
          if (!kind || (!vA && !vB) || L.doorMap.get((y * (L.w + 1) + x) * 2 + 1)) { y++; continue; }
          let y1 = y;
          while (y1 + 1 < L.h && L.vW[(y1 + 1) * (L.w + 1) + x] === kind && !L.doorMap.get(((y1 + 1) * (L.w + 1) + x) * 2 + 1) && vis(x - 1, y1 + 1) === vA && vis(x, y1 + 1) === vB && od(x - 1, y1 + 1) === oA && od(x, y1 + 1) === oB) y1++;
          emitRun(false, x * C, y * C, (y1 + 1) * C, kind, vA, vB, oA, oB);
          y = y1 + 1;
        }
      }
      // Katı bloklar (labirent duvarları, bozuk bloklar)
      const blockS = scaleOf('block');
      const bh = L.meta.noCeiling ? H : H;
      this.neon = [];
      for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
        const s = L.solid[L.i(x, y)];
        if (s !== SOLID.BLOCK && s !== SOLID.GLITCH) continue;
        const mkey = s === SOLID.GLITCH ? 'glitch' + ((x * 7 + y * 13) % 4) : 'block';
        for (let d = 0; d < 4; d++) {
          const nx = x + DX[d], ny = y + DY[d];
          if (!passable(nx, ny)) continue;
          const buf = this.chunkBuf(bufs, mkey, L.cx(x), L.cz(y));
          const x0 = x * C, x1 = (x + 1) * C, z0 = y * C, z1 = (y + 1) * C;
          const ao = [[0, 0.5], [0.5, 0.85], [bh, 1]];
          if (d === 0) this.vface(buf, x0, z0, x1, z0, 0, bh, 0, -1, blockS, ao);
          if (d === 2) this.vface(buf, x0, z1, x1, z1, 0, bh, 0, 1, blockS, ao);
          if (d === 3) this.vface(buf, x0, z0, x0, z1, 0, bh, -1, 0, blockS, ao);
          if (d === 1) this.vface(buf, x1, z0, x1, z1, 0, bh, 1, 0, blockS, ao);
          if (s === SOLID.BLOCK && (L.theme === 'maze' || L.theme === 'glitch')) this.neon.push({ x, y, d });
        }
        if (L.meta.noCeiling) this.hface(this.chunkBuf(bufs, mkey, L.cx(x), L.cz(y)), x * C, y * C, (x + 1) * C, (y + 1) * C, bh, true, blockS, 0.6);
      }
      // Zemin, havuzlar ve tavan
      const floorS = scaleOf('floor');
      const finishOf = new Map();
      for (const f of L.meta.finishes || []) for (let y = f.y0; y <= f.y1; y++) for (let x = f.x0; x <= f.x1; x++) finishOf.set(L.i(x, y), f);
      for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
        const i = L.i(x, y);
        if (!vis(x, y)) continue;
        const x0 = x * C, x1 = (x + 1) * C, z0 = y * C, z1 = (y + 1) * C;
        if (L.floorType[i] === 1) {
          const pb = this.chunkBuf(bufs, 'pool', L.cx(x), L.cz(y));
          this.hface(pb, x0, z0, x1, z1, -0.5, true, 1.2, 0.8);
          for (let d = 0; d < 4; d++) {
            const nx = x + DX[d], ny = y + DY[d];
            if (L.inb(nx, ny) && L.floorType[L.i(nx, ny)] === 1) continue;
            const ao = [[-0.5, 0.6], [0, 1]];
            if (d === 0) this.vface(pb, x0, z0, x1, z0, -0.5, 0, 0, 1, 1.2, ao);
            if (d === 2) this.vface(pb, x0, z1, x1, z1, -0.5, 0, 0, -1, 1.2, ao);
            if (d === 3) this.vface(pb, x0, z0, x0, z1, -0.5, 0, 1, 0, 1.2, ao);
            if (d === 1) this.vface(pb, x1, z0, x1, z1, -0.5, 0, -1, 0, 1.2, ao);
          }
          const wb = this.chunkBuf(bufs, 'water', L.cx(x), L.cz(y));
          this.hface(wb, x0, z0, x1, z1, -0.1, true, 3, 1);
        } else {
          const fin = finishOf.get(i);
          if (fin && fin.floor) this.hface(this.chunkBuf(bufs, fin.floor, L.cx(x), L.cz(y)), x0, z0, x1, z1, 0, true, scaleOf(fin.floor), 1);
          else this.hface(this.chunkBuf(bufs, 'floor', L.cx(x), L.cz(y)), x0, z0, x1, z1, 0, true, floorS, 1);
        }
        if (!L.meta.noCeiling && !od(x, y)) this.hface(this.chunkBuf(bufs, 'ceil', L.cx(x), L.cz(y)), x0, z0, x1, z1, H, false, scaleOf('ceil'), 1);
      }
      // Wainscot panels (tiles, wood) and a small ledge on the walls of finished rooms
      for (const f of L.meta.finishes || []) {
        if (!f.wall) continue;
        const ws = scaleOf(f.wall), o = t / 2 + 0.006, lo = o + 0.022, hh = f.h;
        for (let y = f.y0; y <= f.y1; y++) for (let x = f.x0; x <= f.x1; x++) for (let d = 0; d < 4; d++) {
          if (L.edgeKind(x, y, d) !== EDGE.WALL) continue;
          const buf = this.chunkBuf(bufs, f.wall, L.cx(x), L.cz(y));
          const x0 = x * C, x1 = (x + 1) * C, z0 = y * C, z1 = (y + 1) * C;
          const trim = this.chunkBuf(bufs, 'trimPaint', L.cx(x), L.cz(y));
          if (d === 0) { this.vface(buf, x0, z0 + o, x1, z0 + o, 0, hh, 0, 1, ws, null); this.vface(trim, x0, z0 + lo, x1, z0 + lo, hh, hh + 0.035, 0, 1, 1, null); this.hface(trim, x0, z0 + o, x1, z0 + lo, hh + 0.035, true, 1, 1); }
          if (d === 2) { this.vface(buf, x0, z1 - o, x1, z1 - o, 0, hh, 0, -1, ws, null); this.vface(trim, x0, z1 - lo, x1, z1 - lo, hh, hh + 0.035, 0, -1, 1, null); this.hface(trim, x0, z1 - lo, x1, z1 - o, hh + 0.035, true, 1, 1); }
          if (d === 3) { this.vface(buf, x0 + o, z0, x0 + o, z1, 0, hh, 1, 0, ws, null); this.vface(trim, x0 + lo, z0, x0 + lo, z1, hh, hh + 0.035, 1, 0, 1, null); this.hface(trim, x0 + o, z0, x0 + lo, z1, hh + 0.035, true, 1, 1); }
          if (d === 1) { this.vface(buf, x1 - o, z0, x1 - o, z1, 0, hh, -1, 0, ws, null); this.vface(trim, x1 - lo, z0, x1 - lo, z1, hh, hh + 0.035, -1, 0, 1, null); this.hface(trim, x1 - lo, z0, x1 - o, z1, hh + 0.035, true, 1, 1); }
        }
      }
      // Kapı yanı duvar parçaları ve lentolar
      for (const door of L.doors) this.doorWall(bufs, door);

      // Birleştir
      this.archMeshes = [];
      for (const b of bufs.values()) {
        if (!b.count) continue;
        let mat;
        if (b.mat === 'water') mat = this.waterMat();
        else if (b.mat === 'glassPane') mat = this.mat('glass');
        else if (b.mat.startsWith('glitch')) mat = this.glitchMat(+b.mat.slice(6));
        else mat = this.mat(b.mat);
        const mesh = new THREE.Mesh(b.build(), mat);
        mesh.receiveShadow = true;
        mesh.castShadow = b.mat !== 'floor' && b.mat !== 'ceil' && b.mat !== 'water' && b.mat !== 'glassPane';
        mesh.matrixAutoUpdate = false;
        mesh.userData.kind = b.mat;
        this.group.add(mesh);
        this.archMeshes.push(mesh);
      }
    }
    doorGeom(door) {
      const L = this.L, C = this.C, d = door.d, x = door.x, y = door.y;
      let ax, az, cx, cz;
      if (d === 0 || d === 2) { ax = 1; az = 0; cz = (d === 0 ? y : y + 1) * C; cx = (x + 0.5) * C; }
      else { ax = 0; az = 1; cx = (d === 3 ? x : x + 1) * C; cz = (y + 0.5) * C; }
      const width = door.kind === 'house' ? C : door.kind === 'elevator' ? 1.8 : door.kind === 'glass' ? 1.5 : 1.15;
      const height = door.kind === 'house' ? L.ceil : door.kind === 'elevator' ? 2.4 : 2.25;
      // Hücrenin içine doğru normal
      const nIn = { x: -DX[d], z: -DY[d] };
      return { ax, az, cx, cz, width, height, nIn, boundary: L.isBoundary(x, y, d) };
    }
    doorWall(bufs, door) {
      const L = this.L, C = this.C, H = L.ceil, t = 0.2;
      const g = this.doorGeom(door);
      if (door.kind === 'house') return;
      const s = this.mat('wall').userData.scale || 2;
      const buf = this.chunkBuf(bufs, 'wall', g.cx, g.cz);
      const half = C / 2, ow = g.width / 2;
      const pieces = [[-half - t / 2, -ow, 0, H], [ow, half + t / 2, 0, H], [-ow, ow, g.height, H]];
      const ao = this.wallAO(H);
      for (const [a0, a1, y0, y1] of pieces) {
        const p0x = g.cx + g.ax * a0, p0z = g.cz + g.az * a0, p1x = g.cx + g.ax * a1, p1z = g.cz + g.az * a1;
        const nxA = g.az ? -1 : 0, nzA = g.ax ? -1 : 0;
        this.vface(buf, p0x + nxA * t / 2, p0z + nzA * t / 2, p1x + nxA * t / 2, p1z + nzA * t / 2, y0, y1, nxA, nzA, s, y0 > 0 ? null : ao);
        this.vface(buf, p0x - nxA * t / 2, p0z - nzA * t / 2, p1x - nxA * t / 2, p1z - nzA * t / 2, y0, y1, -nxA, -nzA, s, y0 > 0 ? null : ao);
        if (y0 > 0) this.hface(buf, Math.min(p0x, p1x) - (g.az ? t / 2 : 0), Math.min(p0z, p1z) - (g.ax ? t / 2 : 0), Math.max(p0x, p1x) + (g.az ? t / 2 : 0), Math.max(p0z, p1z) + (g.ax ? t / 2 : 0), y0, false, s, 0.7);
      }
      // Kasa kenarları (açıklığın iç yüzleri)
      for (const sgn of [-1, 1]) {
        const ex = g.cx + g.ax * sgn * ow, ez = g.cz + g.az * sgn * ow;
        if (g.ax) this.vface(buf, ex, g.cz - t / 2, ex, g.cz + t / 2, 0, g.height, -sgn, 0, s);
        else this.vface(buf, g.cx - t / 2, ez, g.cx + t / 2, ez, 0, g.height, 0, -sgn, s);
      }
      // Çarpışma: kasa parçaları
      const minA = -half, maxA = half;
      this.addCollider(g.ax ? { minX: g.cx + minA, maxX: g.cx - ow, minZ: g.cz - t / 2, maxZ: g.cz + t / 2 } : { minX: g.cx - t / 2, maxX: g.cx + t / 2, minZ: g.cz + minA, maxZ: g.cz - ow });
      this.addCollider(g.ax ? { minX: g.cx + ow, maxX: g.cx + maxA, minZ: g.cz - t / 2, maxZ: g.cz + t / 2 } : { minX: g.cx - t / 2, maxX: g.cx + t / 2, minZ: g.cz + ow, maxZ: g.cz + maxA });
    }
    waterMat() {
      if (this.mats.has('water')) return this.mats.get('water');
      const nrm = T.get('tile', 256);
      void nrm;
      const waveTex = T.canvas('waves', 256, 256, (g, w, h) => {
        const img = g.createImageData(w, h);
        const f1 = U.fbmField(64, 4, 3, 5), f2 = U.upsample(f1, 64, w);
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          const i = y * w + x;
          const dx = f2[y * w + (x + 1) % w] - f2[y * w + (x - 1 + w) % w];
          const dy = f2[((y + 1) % h) * w + x] - f2[((y - 1 + h) % h) * w + x];
          img.data[i * 4] = U.clamp(128 - dx * 900, 0, 255); img.data[i * 4 + 1] = U.clamp(128 - dy * 900, 0, 255); img.data[i * 4 + 2] = 255; img.data[i * 4 + 3] = 255;
        }
        g.putImageData(img, 0, 0);
      }, { repeat: true });
      waveTex.colorSpace = THREE.NoColorSpace;
      const m = new THREE.MeshStandardMaterial({ color: 0x4fa8b8, transparent: true, opacity: 0.62, roughness: 0.04, metalness: 0.1, normalMap: waveTex, depthWrite: false });
      m.normalScale.set(0.35, 0.35);
      this.patch(m);
      this.waterTex = waveTex;
      this.mats.set('water', m);
      return m;
    }
    glitchMat(k) {
      const key = 'glitchM' + k;
      if (this.mats.has(key)) return this.mats.get(key);
      const tex = T.glitch(100 + k);
      const m = new THREE.MeshBasicMaterial({ map: tex, color: new THREE.Color(1.6, 1.6, 1.6) });
      m.userData.tex = tex;
      this.mats.set(key, m);
      (this.glitchTex || (this.glitchTex = [])).push(tex);
      return m;
    }

    // ------------------------------------------------------------ IŞIK HARİTASI
    async bake(progress) {
      const L = this.L;
      const S = PB.Settings.data;
      const lights = L.lights.filter(l => l.on && !l.broken && this.zonesOn.has(l.zone));
      if (!World.baker) World.baker = new PB.LightBake(this.game.renderer);
      progress(0.1);
      await U.nextFrame();
      const samples = this.lmRes >= 12 ? 8 : this.lmRes >= 8 ? 4 : this.lmRes >= 6 ? 2 : 1;
      const res = World.baker.bake(L, { res: this.lmRes, lights, K: LM_K, samples, ambient: this.theme.ambient, bounce: this.theme.bounce });
      this.disposeBake();
      this.bakeRes = res;
      this.U.uLvUp.value = res.up.texture; this.U.uLvSide.value = res.side.texture; this.U.uBounce.value = res.bounceTex;
      this.U.uLvLayers.value = res.NY;
      this.cellLight = res.cells;
      if (this.game.syncPostWorld && this.game.world === this) this.game.syncPostWorld();
      progress(1);
      void S;
    }
    disposeBake() {
      const b = this.bakeRes;
      if (!b) return;
      b.up.dispose(); b.side.dispose(); b.bounceTex.dispose();
      this.bakeRes = null;
    }
    // Bir dünya noktasındaki pişmiş ışık parlaklığı (yapay zekâ görüşü için)
    lightAt(x, z) {
      const cl = this.cellLight;
      if (!cl) return 1;
      const L = this.L, cx = U.clamp(Math.floor(x / this.C), 0, L.w - 1), cz = U.clamp(Math.floor(z / this.C), 0, L.h - 1);
      const o = (cz * L.w + cx) * 3, bk = this.theme.bounce, a = this.theme.ambient;
      const r = cl.direct[o] + cl.bounce[o] * bk + a[0], g = cl.direct[o + 1] + cl.bounce[o + 1] * bk + a[1], b = cl.direct[o + 2] + cl.bounce[o + 2] * bk + a[2];
      return (r * 0.3 + g * 0.59 + b * 0.11) * this.U.uLmIntensity.value;
    }
    async setZone(zone, on) {
      if (on) this.zonesOn.add(zone); else this.zonesOn.delete(zone);
      for (const f of this.fixtures) if (f.light.zone === zone) f.powered = on;
      this.fixDirty = true;
      await this.bake(() => {});
    }

    // ------------------------------------------------------------ ARMATÜRLER
    fixtureMat(tex, key) {
      const m = new THREE.MeshBasicMaterial({ color: 0xffffff, map: tex || null });
      m.onBeforeCompile = sh => {
        sh.vertexShader = 'attribute float aBright;\nvarying float vBright;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvBright = aBright;');
        sh.fragmentShader = 'varying float vBright;\n' + sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb *= vBright;');
      };
      m.customProgramCacheKey = () => 'pb-fixture-' + key;
      return m;
    }
    buildFixtures() {
      const L = this.L, MF = PB.Models.fixture, MT = PB.Models.tex;
      const kinds = new Map();
      L.lights.forEach((l, i) => {
        l.id = i;
        l.phase = U.hash2(i, 3, 9);
        if (['glow', 'street', 'none'].includes(l.kind)) { this.fixtures.push({ light: l, mesh: null, powered: this.zonesOn.has(l.zone) }); return; }
        // Fixtures hang from the ceiling, so the model depends on the drop below it
        const key = l.kind + ':' + Math.max(0, L.ceil - l.y).toFixed(2);
        if (!kinds.has(key)) kinds.set(key, []);
        kinds.get(key).push(l);
      });
      const texOf = name => name === 'troffer' ? MT.troffer(L.theme) : name === 'opal' ? MT.opal() : name === 'exit' ? T.exitSign()
        : name === 'neon' ? T.label('neon', 'STARLIGHT', { w: 1024, h: 256, bg: 'rgba(0,0,0,0)', color: '#ff4fb0', glow: true, font: `bold 150px ${T.FONTS.FONT_HAND}` }) : null;
      const dummy = new THREE.Object3D();
      const col = new THREE.Color();
      for (const [key, list] of kinds) {
        const kind = list[0].kind;
        const d = MF(kind, L.ceil, list[0].y) || MF('bulb', L.ceil, list[0].y);
        const mat = this.fixtureMat(texOf(d.tex), kind);
        if (d.transparent) { mat.transparent = true; mat.depthWrite = false; }
        const glowGeo = P.build('fxg:' + key, d.glow)[0].geo;
        const mesh = new THREE.InstancedMesh(glowGeo, mat, list.length);
        const bright = new Float32Array(list.length);
        mesh.geometry.setAttribute('aBright', new THREE.InstancedBufferAttribute(bright, 1));
        const mats = [];
        list.forEach((l, k) => {
          dummy.position.set(l.x, l.y + d.yOff, l.z);
          dummy.rotation.set(0, l.rot || 0, 0);
          if (kind === 'neon' || kind === 'exitSign') dummy.rotation.set(0, l.x < 1 ? Math.PI / 2 : 0, 0);
          dummy.updateMatrix();
          mats.push(dummy.matrix.clone());
          mesh.setMatrixAt(k, dummy.matrix);
          col.setRGB(l.color[0], l.color[1], l.color[2]);
          mesh.setColorAt(k, col);
          this.fixtures.push({ light: l, mesh, index: k, base: d.base, powered: this.zonesOn.has(l.zone), cur: -1 });
        });
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        mesh.frustumCulled = false;
        this.group.add(mesh);
        this.fxMeshes.push(mesh);
        // Housing: shades, frames, sockets, chains
        if (d.body.length) {
          for (const part of P.build('fxb:' + key, d.body)) {
            const im = new THREE.InstancedMesh(part.geo, this.mat(part.mat), list.length);
            mats.forEach((m, k) => im.setMatrixAt(k, m));
            im.castShadow = false; im.receiveShadow = true;
            im.computeBoundingSphere();
            this.group.add(im);
          }
        }
      }
      this.fixDirty = true;
      this.updateFixtures(0, null, true);
    }
    flick(l, t) {
      if (!l.flicker) return 1;
      const slot = Math.floor(t * 11 + l.phase * 50);
      const r = U.hash2(slot, l.id, 77);
      const k = PB.Settings.data.reduceFlicker ? 0.3 : 1;
      if (r < l.flicker * 0.3 * k) return 0.06;
      if (r < l.flicker * 0.45 * k) return 0.55;
      return 1;
    }
    fixtureBrightness(f, t, pac) {
      if (f.light.broken) return 0.05;
      if (!f.powered) return 0.02;
      let b = this.flick(f.light, t);
      if (pac && pac.w > 0) {
        const d = Math.hypot(f.light.x - pac.x, f.light.z - pac.z);
        if (d < 16) {
          const near = (1 - U.smoothstep(5, 16, d)) * pac.w;
          const r = U.hash2(Math.floor(t * 13) + Math.floor(f.light.x / 3) * 7, Math.floor(f.light.z / 3), 5);
          b *= U.lerp(1, r < 0.42 ? 0.1 : 0.7, near);
        }
      }
      return b;
    }
    updateFixtures(t, cam, force) {
      const pac = this.pacInfo;
      const range2 = 60 * 60;
      const dirty = new Set();
      for (const f of this.fixtures) {
        if (!f.mesh) continue;
        const l = f.light;
        if (!force && !this.fixDirty && cam) {
          const dx = l.x - cam.x, dz = l.z - cam.z;
          if (dx * dx + dz * dz > range2) continue;
          if (!l.flicker && !(pac && pac.w > 0 && Math.abs(l.x - pac.x) < 18 && Math.abs(l.z - pac.z) < 18) && f.cur >= 0) continue;
        }
        const b = this.fixtureBrightness(f, t, pac) * f.base;
        f.bright = b / f.base;
        if (b !== f.cur) { f.mesh.geometry.attributes.aBright.array[f.index] = b; f.cur = b; dirty.add(f.mesh); }
      }
      for (const m of dirty) m.geometry.attributes.aBright.needsUpdate = true;
      this.fixDirty = false;
    }
    buildLightPool() {
      const n = PB.Settings.data.dynLights;
      this.pool = [];
      for (let k = 0; k < n; k++) {
        // Downward spot lights: recessed fixtures must not light the ceiling around them
        const pl = new THREE.SpotLight(0xffffff, 0, 9, 1.25, 0.85, 2);
        pl.castShadow = false;
        this.group.add(pl);
        this.group.add(pl.target);
        this.pool.push({ pl, fix: null, cur: 0 });
      }
    }
    updateLightPool(cam, t, dt) {
      if (!this.pool.length) return;
      if (t - this.lastPool > 0.12) {
        this.lastPool = t;
        const cands = [];
        for (const f of this.fixtures) {
          const l = f.light;
          if (!f.powered || l.broken || l.kind === 'street') continue;
          const dx = l.x - cam.x, dz = l.z - cam.z, d2 = dx * dx + dz * dz;
          if (d2 > 22 * 22) continue;
          cands.push([d2, f]);
        }
        cands.sort((a, b) => a[0] - b[0]);
        const chosen = cands.slice(0, this.pool.length).map(c => c[1]);
        // Zaten atanmış olanları koru, boşalanları yeniden ata
        const keep = new Set();
        for (const p of this.pool) if (p.fix && chosen.includes(p.fix)) keep.add(p.fix); else p.fix = null;
        for (const f of chosen) {
          if (keep.has(f)) continue;
          const free = this.pool.find(p => !p.fix);
          if (!free) break;
          free.fix = f; free.cur = 0;
          const recessed = ['panel', 'poolPanel', 'spot', 'cage', 'exitSign'].includes(f.light.kind);
          free.pl.position.set(f.light.x, f.light.y - (recessed ? 0.08 : 0.2), f.light.z);
          free.pl.target.position.set(f.light.x, 0, f.light.z);
          free.pl.angle = recessed ? 1.25 : Math.PI / 2 - 0.02;
          free.pl.color.setRGB(f.light.color[0], f.light.color[1], f.light.color[2]);
          free.pl.distance = Math.min(12, (f.light.range || 10) * 0.9);
        }
      }
      for (const p of this.pool) {
        const target = p.fix ? (p.fix.bright != null ? p.fix.bright : 1) * p.fix.light.intensity * 7 * this.U.uLmIntensity.value : 0;
        p.cur = U.damp(p.cur, target, 18, dt);
        p.pl.intensity = p.cur;
      }
    }

    // ------------------------------------------------------------ DEKOR
    addCollider(b) {
      const C = this.C;
      const box = Object.assign({ minY: 0, maxY: 3 }, b);
      const x0 = Math.floor(box.minX / C), x1 = Math.floor(box.maxX / C), z0 = Math.floor(box.minZ / C), z1 = Math.floor(box.maxZ / C);
      for (let y = z0; y <= z1; y++) for (let x = x0; x <= x1; x++) {
        if (!this.L.inb(x, y)) continue;
        const i = this.L.i(x, y);
        if (!this.colGrid.has(i)) this.colGrid.set(i, []);
        this.colGrid.get(i).push(box);
      }
      return box;
    }
    removeCollider(box) {
      for (const list of this.colGrid.values()) { const k = list.indexOf(box); if (k >= 0) list.splice(k, 1); }
    }
    instanced(defKey, specs, list, opts = {}) {
      const parts = P.build(defKey, specs);
      const dummy = new THREE.Object3D();
      const meshes = [];
      for (const part of parts) {
        const mat = opts.matFn ? opts.matFn(part.mat) : this.mat(part.mat);
        const im = new THREE.InstancedMesh(part.geo, mat, list.length);
        list.forEach((p, k) => {
          dummy.position.set(p.x, p.y || 0, p.z);
          dummy.rotation.set(0, p.rot || 0, 0);
          dummy.scale.set(p.sx || 1, p.sy || 1, p.sz || 1);
          dummy.updateMatrix();
          im.setMatrixAt(k, dummy.matrix);
        });
        im.castShadow = opts.cast !== false && !(mat.transparent);
        im.receiveShadow = true;
        im.computeBoundingSphere();
        this.group.add(im);
        meshes.push(im);
      }
      return meshes;
    }
    buildProps() {
      const L = this.L, C = this.C;
      const byType = new Map();
      const add = (type, p) => { if (!byType.has(type)) byType.set(type, []); byType.get(type).push(p); };
      for (const p of L.props) {
        if (p.collider) this.addCollider({ minX: p.x - p.collider.hw, maxX: p.x + p.collider.hw, minZ: p.z - p.collider.hd, maxZ: p.z + p.collider.hd, maxY: 2.2, hide: p.hide ? p : null });
        if (p.type === 'collider') continue;
        if (p.type === 'cabinet') { add('cabinet:' + p.game, p); continue; }
        add(p.type, p);
        if (p.type === 'desk' && p.lamp) add('deskLamp', { x: p.x - 0.6, z: p.z - 0.1, rot: 0 });
        if ((p.type === 'cubicleDesk' || p.type === 'desk') && p.monitor) {
          if (p.type === 'desk') add('cubicleMonitor', { x: p.x, z: p.z, rot: p.rot });
          else add('crt' + (U.hash2(Math.round(p.x * 10), Math.round(p.z * 10), 4) * 4 | 0), p);
        }
      }
      // Raf hücreleri
      const serverSpot = L.spots.server && L.spots.server[0];
      for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
        if (L.solid[L.i(x, y)] !== SOLID.RACK) continue;
        const horiz = !L.passable(x - 1, y) && !L.passable(x + 1, y) ? false : true;
        const rot = horiz ? 0 : Math.PI / 2;
        if (L.theme === 'office') {
          const nearServer = serverSpot && Math.abs(x - serverSpot.x) < 9 && Math.abs(y - serverSpot.y) < 9;
          add(nearServer ? 'serverRack' : 'archiveShelf', { x: L.cx(x), z: L.cz(y), rot });
          if (nearServer) add('serverLeds', { x: L.cx(x), z: L.cz(y), rot });
        } else {
          add('rack', { x: L.cx(x), z: L.cz(y), rot });
          add('rackGoods' + ((x * 3 + y * 5) % 3), { x: L.cx(x), z: L.cz(y), rot: rot + ((x + y) % 2) * Math.PI });
        }
      }
      // Dönüm noktası dekorları
      const rooms = L.meta.rooms || {};
      const center = r => ({ x: (r.x0 + r.x1 + 1) / 2 * C, z: (r.y0 + r.y1 + 1) / 2 * C });
      if (rooms.chairs) add('chairPile', Object.assign(center(rooms.chairs), { rot: 0.4 }));
      if (rooms.stairs) { const c = center(rooms.stairs); add('stairsUp', { x: c.x, z: c.z + 0.2, rot: 0 }); this.addCollider({ minX: c.x - 0.75, maxX: c.x + 0.75, minZ: c.z - 1.6, maxZ: c.z + 1.9 }); }
      if (rooms.camp) { const c = center(rooms.camp); add('sleepingBag', { x: c.x - 0.9, z: c.z + 0.4, rot: 0.3 }); }
      if (rooms.lone) { const c = center(rooms.lone); add('cabinet:special', { x: c.x, z: c.z - 1.2, rot: 0, lone: true }); this.addCollider({ minX: c.x - 0.45, maxX: c.x + 0.45, minZ: c.z - 1.65, maxZ: c.z - 0.75 }); }
      if (rooms.shrine && !L.items.some(i => i.type === 'shrine')) { const c = center(rooms.shrine); add('shrineAltar', { x: c.x, z: c.z, rot: 0 }); }

      for (const [type, list] of byType) {
        if (type.startsWith('cabinet:')) { this.buildCabinets(type.slice(8), list); continue; }
        if (type.startsWith('crt')) {
          const k = +type.slice(3);
          const lines = [['C:\\> DIR', ' COUNTER  EXE', ' PERSONNL TXT', ' CODE     TXT', '', 'C:\\> _'], ['NO EXIT', 'NO EXIT', 'NO EXIT', 'NO EXIT'], ['REPORT 4/17', '', 'Yellow visitor', 'seen on floor.', '', 'Hide under', 'the desks.'], ['> ', '> waka', '> waka waka', '> _']][k];
          const tex = T.crt('desk' + k, lines, k === 1 ? '#ffb040' : '#7dff8a');
          const mat = new THREE.MeshBasicMaterial({ map: tex, color: new THREE.Color(1.4, 1.4, 1.4) });
          this.instanced('crtScreen', P.DEFS.crtScreen, list, { matFn: () => mat, cast: false });
          continue;
        }
        if (type === 'cubicleMonitor') {
          const specs = [['box', 'beigePlastic', 0.42, 0.34, 0.4, 0, 0.95, -0.15], ['box', 'beigePlastic', 0.36, 0.08, 0.3, 0, 0.8, -0.15]];
          this.instanced('cubicleMonitor', specs, list);
          continue;
        }
        const def = P.DEFS[type];
        if (!def) continue;
        this.instanced(type, def, list, { cast: type !== 'chairPile' });
      }
    }
    buildCabinets(game, list) {
      const scr = T.cabinetScreen(game);
      const mq = T.marquee(game);
      // Per-game side art and control panel overlay
      const MT = PB.Models.tex;
      const side = new THREE.MeshStandardMaterial({ map: MT.side(game), roughness: 0.4 }); this.patch(side); side.userData.refl = 0.08;
      const cp = new THREE.MeshStandardMaterial({ map: MT.panel(game), roughness: 0.22 }); this.patch(cp); cp.userData.refl = 0.2;
      this.instanced('cabinetBody', P.DEFS.cabinetBody, list, { matFn: k => k === 'cabinetSide' ? side : k === 'cpArt' ? cp : this.mat(k) });
      const sMat = new THREE.MeshBasicMaterial({ map: scr.tex, color: new THREE.Color(1.7, 1.7, 1.7) });
      const mMat = new THREE.MeshBasicMaterial({ map: mq, color: new THREE.Color(1.6, 1.6, 1.6) });
      const sm = this.instanced('cabinetScreen', P.DEFS.cabinetScreen, list, { matFn: () => sMat, cast: false });
      const mm = this.instanced('cabinetMarquee', P.DEFS.cabinetMarquee, list, { matFn: () => mMat, cast: false });
      this.screens.push({ scr, mats: [sMat, mMat], list, meshes: sm.concat(mm), lone: list.some(p => p.lone) });
    }
    buildPillars() {
      const L = this.L;
      if (!L.pillars.length) return;
      const H = L.ceil;
      const list = L.pillars.map(p => ({ x: p.x, z: p.z, rot: 0, sy: H }));
      this.instanced('pillarConcrete', P.DEFS.pillarConcrete, list, { matFn: () => this.mat('pillar') });
      for (const p of L.pillars) this.addCollider({ minX: p.x - 0.36, maxX: p.x + 0.36, minZ: p.z - 0.36, maxZ: p.z + 0.36, maxY: H });
    }

    // ------------------------------------------------------------ KAPILAR
    buildDoors() {
      const L = this.L;
      for (const door of L.doors) {
        const g = this.doorGeom(door);
        const obj = { door, g, amt: door.open ? 1 : 0, group: new THREE.Group() };
        const grp = obj.group;
        grp.position.set(g.cx, 0, g.cz);
        grp.rotation.y = g.ax ? 0 : Math.PI / 2;
        this.group.add(grp);
        const w = g.width, h = g.height;
        let leafMat;
        switch (door.kind) {
          case 'glass': leafMat = this.mat('glass'); break;
          case 'wood': leafMat = this.mat('darkWood'); break;
          case 'house': leafMat = null; break;
          case 'exit': leafMat = this.mat('paintMetal'); break;
          default: leafMat = this.mat('paintMetal');
        }
        if (door.kind === 'house') {
          const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 0.8, 1.6), transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
          const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
          plane.position.y = h / 2;
          grp.add(plane);
          obj.curtain = plane;
        } else if (door.kind === 'elevator') {
          const pm = this.mat('chrome');
          obj.slides = [];
          for (const sgn of [-1, 1]) {
            const leaf = new THREE.Mesh(new THREE.BoxGeometry(w / 2, h, 0.05), pm);
            leaf.position.set(sgn * w / 4, h / 2, 0);
            leaf.castShadow = true;
            grp.add(leaf);
            obj.slides.push({ leaf, sgn });
          }
          const ind = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.14), new THREE.MeshBasicMaterial({ map: T.label('elev-ind', '▼ 0', { w: 256, h: 72, bg: '#140800', color: '#ff9a20', glow: true }), color: new THREE.Color(1.5, 1.5, 1.5) }));
          ind.position.set(0, h + 0.2, 0.13 * this.nInSign(g));
          ind.rotation.y = this.nInSign(g) > 0 ? 0 : Math.PI;
          grp.add(ind);
          obj.indicator = ind;
        } else {
          const pivot = new THREE.Group();
          pivot.position.set(-w / 2, 0, 0);
          const leaf = new THREE.Mesh(new THREE.BoxGeometry(w - 0.04, h - 0.02, 0.05), leafMat);
          leaf.position.set(w / 2, h / 2, 0);
          leaf.castShadow = true; leaf.receiveShadow = true;
          pivot.add(leaf);
          const knob = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), this.mat('brass'));
          knob.position.set(w - 0.12, 1.0, 0.05);
          pivot.add(knob);
          const knob2 = knob.clone(); knob2.position.z = -0.05; pivot.add(knob2);
          grp.add(pivot);
          obj.pivot = pivot;
        }
        // Kasa
        if (door.kind !== 'house') {
          const fm = door.kind === 'glass' ? this.mat('chrome') : this.mat(door.kind === 'wood' ? 'darkWood' : 'darkMetal');
          for (const sgn of [-1, 1]) { const post = new THREE.Mesh(new THREE.BoxGeometry(0.07, h, 0.24), fm); post.position.set(sgn * (w / 2 + 0.035), h / 2, 0); grp.add(post); }
          const top = new THREE.Mesh(new THREE.BoxGeometry(w + 0.14, 0.07, 0.24), fm); top.position.set(0, h + 0.035, 0); grp.add(top);
        }
        // Çıkış tabelası
        if (door.kind === 'exit' || door.kind === 'stair') {
          const sign = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.22, 0.05), this.fixtureSignMat());
          const sIn = this.nInSign(g);
          sign.position.set(0, h + 0.35, 0.14 * sIn);
          grp.add(sign);
        }
        // Harita dışı: kapının arkasında görünen mekân
        if (g.boundary) {
          const beyond = new THREE.Group();
          const sOut = -this.nInSign(g);
          beyond.position.set(0, 0, sOut * 0.1);
          if (sOut < 0) beyond.rotation.y = Math.PI;
          let def = null;
          if (door.kind === 'elevator') def = 'elevatorCar';
          else if (door.kind === 'stair') def = 'stairsDown';
          else if (door.kind === 'exit') def = 'exitBeyond';
          if (def) {
            for (const part of P.build(def, P.DEFS[def])) {
              const m = new THREE.Mesh(part.geo, this.mat(part.mat));
              m.position.z = def === 'elevatorCar' ? 1.25 : 0;
              beyond.add(m);
            }
            if (door.kind === 'elevator') {
              const lamp = new THREE.PointLight(0xffd9a0, 0, 5, 2);
              lamp.position.set(0, 2.4, 1.25);
              beyond.add(lamp);
              obj.carLight = lamp;
            }
            if (door.kind === 'stair') {
              const red = new THREE.PointLight(0xff2a1a, 3, 7, 2);
              red.position.set(0, 2.4, 1.5);
              beyond.add(red);
            }
          }
          beyond.visible = false;
          grp.add(beyond);
          obj.beyond = beyond;
        }
        this.doorObjs.set(door.id, obj);
        this.applyDoor(obj);
      }
    }
    nInSign(g) {
      // Grup yerel +z ekseninin hücre içine bakıp bakmadığı
      return g.ax ? (g.nIn.z > 0 ? 1 : -1) : (g.nIn.x > 0 ? 1 : -1);
    }
    fixtureSignMat() {
      if (this.mats.has('exitSignMat')) return this.mats.get('exitSignMat');
      const m = new THREE.MeshBasicMaterial({ map: T.exitSign(), color: new THREE.Color(1.8, 1.8, 1.8) });
      this.mats.set('exitSignMat', m);
      return m;
    }
    applyDoor(obj) {
      const a = obj.amt;
      if (obj.pivot) obj.pivot.rotation.y = -a * 1.75 * (obj.swing || 1);
      if (obj.slides) for (const s of obj.slides) s.leaf.position.x = s.sgn * (obj.g.width / 4 + a * obj.g.width * 0.48);
      if (obj.curtain) { obj.curtain.visible = a < 0.99; obj.curtain.material.opacity = 0.55 * (1 - a); }
      if (obj.beyond) obj.beyond.visible = a > 0.01;
      if (obj.carLight) obj.carLight.intensity = a * 4;
    }
    openDoor(id, fromX, fromZ) {
      const obj = this.doorObjs.get(id);
      if (!obj) return;
      if (obj.pivot && fromX != null) {
        // Oyuncudan uzağa doğru aç
        const g = obj.g;
        const side = g.ax ? Math.sign(fromZ - g.cz) : Math.sign(fromX - g.cx);
        obj.swing = side >= 0 ? -1 : 1;
      }
      obj.target = 1;
      obj.door.open = true;
    }
    closeDoor(id) {
      const obj = this.doorObjs.get(id);
      if (!obj) return;
      obj.target = 0;
      obj.door.open = false;
    }

    // ------------------------------------------------------------ ÇIKARTMALAR
    buildDecals() {
      const L = this.L;
      const groups = new Map();
      for (const d of L.decals) {
        const key = d.type + '|' + (d.text || '');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(d);
      }
      // Yutucu ısırıkları ve Sayaç çentikleri: bazı temalarda ekstra
      const dummy = new THREE.Object3D();
      let layer = 0;
      for (const [key, list] of groups) {
        const [type, text] = key.split('|');
        const tex = T.decal(type, text || null);
        const aspect = (type === 'graffiti' || type === 'wallText' || type === 'sign' || type === 'storeSign') ? 0.5 : type === 'poster' ? 1.33 : 1;
        const mat = new THREE.MeshStandardMaterial({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4, roughness: type === 'poster' ? 0.55 : type === 'oil' ? 0.2 : 0.9 });
        // Store signs are lit from inside
        if (type === 'storeSign') { mat.emissive = new THREE.Color(1, 1, 1); mat.emissiveMap = tex; mat.emissiveIntensity = 1.6; }
        this.patch(mat);
        const im = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), mat, list.length);
        list.forEach((d, k) => {
          const s = d.size || 1;
          layer = (layer + 1) % 20;
          if (d.surface === 'floor') { dummy.position.set(d.x, 0.004 + layer * 0.0004, d.z); dummy.rotation.set(-Math.PI / 2, 0, d.rot || 0); }
          else if (d.surface === 'ceil') { dummy.position.set(d.x, L.ceil - 0.004 - layer * 0.0004, d.z); dummy.rotation.set(Math.PI / 2, 0, d.rot || 0); }
          else { dummy.position.set(d.x + d.nx * (0.004 + layer * 0.0004), d.y, d.z + d.nz * (0.004 + layer * 0.0004)); dummy.rotation.set(0, Math.atan2(d.nx, d.nz), 0); }
          dummy.scale.set(s, s * aspect, 1);
          dummy.updateMatrix();
          im.setMatrixAt(k, dummy.matrix);
        });
        im.receiveShadow = true;
        im.renderOrder = 1;
        im.computeBoundingSphere();
        this.group.add(im);
      }
    }

    // ------------------------------------------------------------ TEMA EKSTRALARI
    buildThemeExtras() {
      const L = this.L, C = this.C;
      if (L.theme === 'maze' || L.theme === 'glitch') this.buildMazeExtras();
      if (L.theme === 'arcade') {
        // Rainy street outside the storefront
        this.street = new PB.Exterior.Street(this);
        this.street.build();
      }
      if (L.meta.outdoor) {
        this.street = new PB.Exterior.Open(this);
        this.street.build();
      }
      if (L.theme === 'concrete') {
        // Tavanda borular ve kirişler
        const list = [];
        for (let y = 2; y < L.h; y += 5) list.push({ x: L.w * C / 2, z: y * C, rot: 0 });
        const beam = [['box', 'darkMetal', L.w * C, 0.4, 0.25, 0, L.ceil - 0.3, 0]];
        this.instanced('beam', beam, list, { cast: false });
        const pipes = [];
        for (let x = 4; x < L.w; x += 9) pipes.push({ x: x * C + 0.6, z: L.h * C / 2, rot: Math.PI / 2 });
        this.instanced('pipeRun', [['cyl', 'darkMetal', 0.15, 0.15, L.h * C, 10, 0, L.ceil - 0.8, 0, Math.PI / 2, 0, 0]], pipes, { cast: false });
      }
      if (L.theme === 'office') {
        // Tavan havalandırma ızgaraları
        const r = U.rng(4);
        const vents = [];
        for (let k = 0; k < 120; k++) { const x = r.int(0, L.w - 1), y = r.int(0, L.h - 1); if (L.passable(x, y)) vents.push({ x: L.cx(x) + 0.9, z: L.cz(y) - 0.9, rot: 0 }); }
        this.instanced('vent', [['box', 'paintMetal', 0.6, 0.02, 0.6, 0, L.ceil - 0.01, 0]], vents, { cast: false });
      }
    }
    buildMazeExtras() {
      const L = this.L, C = this.C, H = L.ceil;
      // Blokların üzerinde çift neon şerit
      const buf = new GeoBuf();
      for (const n of this.neon) {
        const x0 = n.x * C, x1 = (n.x + 1) * C, z0 = n.y * C, z1 = (n.y + 1) * C, o = 0.012;
        for (const [ya, yb] of [[H - 0.16, H - 0.1], [H - 0.34, H - 0.3], [0.12, 0.17]]) {
          if (n.d === 0) this.vface(buf, x0, z0 - o, x1, z0 - o, ya, yb, 0, -1, 1);
          if (n.d === 2) this.vface(buf, x0, z1 + o, x1, z1 + o, ya, yb, 0, 1, 1);
          if (n.d === 3) this.vface(buf, x0 - o, z0, x0 - o, z1, ya, yb, -1, 0, 1);
          if (n.d === 1) this.vface(buf, x1 + o, z0, x1 + o, z1, ya, yb, 1, 0, 1);
        }
      }
      const neonCol = L.theme === 'glitch' ? new THREE.Color(1.2, 0.4, 3.2) : new THREE.Color(0.45, 0.45, 4.2);
      const neon = new THREE.Mesh(buf.build(), new THREE.MeshBasicMaterial({ color: neonCol }));
      this.group.add(neon);
      this.neonMesh = neon;
      // Yıldızlı boşluk gökyüzü
      const r = U.rng(256);
      const starPos = [];
      for (let k = 0; k < 1500; k++) {
        const a = r() * Math.PI * 2, e = r.range(0.15, 1.4), d = 180;
        starPos.push(L.w * C / 2 + Math.cos(a) * Math.cos(e) * d, 20 + Math.sin(e) * d, L.h * C / 2 + Math.sin(a) * Math.cos(e) * d);
      }
      const sg = new THREE.BufferGeometry();
      sg.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
      const stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: new THREE.Color(2, 2, 2.4), size: 1.2, sizeAttenuation: true, map: T.softDot(), transparent: true, depthWrite: false, fog: false }));
      this.group.add(stars);
      // Havadaki dev skor tablosu
      const sky = new THREE.Mesh(new THREE.PlaneGeometry(64, 8), new THREE.MeshBasicMaterial({ map: T.skyScore(), transparent: true, color: new THREE.Color(1.6, 1.6, 1.6), depthWrite: false, fog: false }));
      sky.position.set(L.w * C / 2, 26, -6);
      sky.rotation.x = 0.35;
      this.group.add(sky);
      this.skyScore = sky;
      const ready = new THREE.Mesh(new THREE.PlaneGeometry(14, 2.2), new THREE.MeshBasicMaterial({ map: T.readyText('HAZIR!', '#ffff00'), transparent: true, color: new THREE.Color(2, 2, 2), depthWrite: false, fog: false, side: THREE.DoubleSide }));
      ready.position.set(L.w * C / 2, 9, 17.5 * C);
      ready.rotation.x = -0.4;
      ready.visible = false;
      this.group.add(ready);
      this.readyText = ready;
      // Pelletler (anlık örnekli, toplanınca gizlenir)
      const pel = (L.meta.pellets || []).filter(p => !p.power);
      this.pellets = pel.map((p, k) => ({ x: L.cx(p.x), z: L.cz(p.y), cx: p.x, cy: p.y, k, alive: true, glitch: p.glitch }));
      const pm = new THREE.InstancedMesh(new THREE.SphereGeometry(0.11, 12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 2.6, 2.3) }), this.pellets.length);
      const dummy = new THREE.Object3D();
      this.pellets.forEach((p, k) => { dummy.position.set(p.x, 1.0, p.z); dummy.updateMatrix(); pm.setMatrixAt(k, dummy.matrix); });
      pm.frustumCulled = false;
      this.group.add(pm);
      this.pelletMesh = pm;
      // Bozuk ekranda uçuşan harfler
      if (L.theme === 'glitch') {
        const sprites = [];
        for (let k = 0; k < 90; k++) {
          const x = r.range((L.meta.glitchFrom || 17) * C, L.w * C), z = r.range(0, L.h * C), y = r.range(1, 14);
          const m = new THREE.SpriteMaterial({ map: T.glitch(300 + (k % 6)), color: new THREE.Color(r.range(1, 2.5), r.range(0.5, 2), r.range(1, 2.5)), transparent: true, opacity: 0.85, depthWrite: false });
          const s = new THREE.Sprite(m);
          s.position.set(x, y, z);
          s.scale.setScalar(r.range(0.4, 1.8));
          s.userData.base = y; s.userData.ph = r() * 6;
          this.group.add(s);
          sprites.push(s);
        }
        this.glitchSprites = sprites;
      }
    }
    hidePellet(k) {
      const p = this.pellets[k];
      if (!p || !p.alive) return;
      p.alive = false;
      const m = new THREE.Matrix4().makeScale(0, 0, 0);
      this.pelletMesh.setMatrixAt(k, m);
      this.pelletMesh.instanceMatrix.needsUpdate = true;
    }

    // ------------------------------------------------------------ PARÇACIKLAR
    buildParticles() {
      const S = PB.Settings.data;
      const n = Math.floor(1400 * S.particles);
      if (n < 10) return;
      const pos = new Float32Array(n * 3), seed = new Float32Array(n);
      const r = U.rng(11);
      for (let k = 0; k < n; k++) { pos[k * 3] = r.range(-12, 12); pos[k * 3 + 1] = r.range(0.1, Math.min(this.L.ceil, 6)); pos[k * 3 + 2] = r.range(-12, 12); seed[k] = r(); }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
      const dark = this.L.theme === 'dark';
      const m = new THREE.ShaderMaterial({
        uniforms: { uTime: this.U.uTime, uCam: { value: new THREE.Vector3() }, uTex: { value: T.softDot() }, uAlpha: { value: dark ? 0.08 : this.L.theme === 'maze' || this.L.theme === 'glitch' ? 0.16 : 0.2 }, uCol: { value: new THREE.Color(this.L.theme === 'pool' ? 0xdff4ff : this.L.theme === 'maze' ? 0x8899ff : 0xfff0c8) } },
        vertexShader: `attribute float aSeed; uniform float uTime; uniform vec3 uCam; varying float vA;
          void main(){
            vec3 p = position;
            p.x += sin(uTime * 0.13 + aSeed * 40.0) * 0.6; p.y += sin(uTime * 0.09 + aSeed * 21.0) * 0.3; p.z += cos(uTime * 0.11 + aSeed * 33.0) * 0.6;
            p.xz = uCam.xz + mod(p.xz - uCam.xz + 12.0, 24.0) - 12.0;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (0.5 + aSeed * 0.7) * 9.0 / -mv.z * (projectionMatrix[1][1]);
            vA = smoothstep(12.0, 3.0, length(p.xz - uCam.xz)) * (0.5 + 0.5 * sin(uTime * 0.7 + aSeed * 60.0));
          }`,
        fragmentShader: `uniform sampler2D uTex; uniform float uAlpha; uniform vec3 uCol; varying float vA;
          void main(){ vec4 t = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(uCol * 1.4, t.a * uAlpha * vA); }`,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      });
      const pts = new THREE.Points(g, m);
      pts.frustumCulled = false;
      this.dust = pts;
      this.group.add(pts);
    }
    // Yansımalar için basit prosedürel ortam haritası (tema renkleriyle)
    buildEnvironment() {
      const r = this.game.renderer;
      const sc = new THREE.Scene();
      const th = this.theme;
      const room = new THREE.Mesh(new THREE.BoxGeometry(20, 6, 20), new THREE.MeshBasicMaterial({ color: new THREE.Color(th.env[0], th.env[1], th.env[2]), side: THREE.BackSide }));
      sc.add(room);
      const pc = new THREE.Color(th.envPanel[0], th.envPanel[1], th.envPanel[2]);
      for (let x = -8; x <= 8; x += 4) for (let z = -8; z <= 8; z += 4) {
        const p = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7), new THREE.MeshBasicMaterial({ color: pc, side: THREE.DoubleSide }));
        p.rotation.x = Math.PI / 2; p.position.set(x, 2.9, z);
        sc.add(p);
      }
      const pm = new THREE.PMREMGenerator(r);
      this.envRT = pm.fromScene(sc, 0.02);
      pm.dispose();
      this.envMap = this.envRT.texture;
    }

    // ------------------------------------------------------------ GÜNCELLEME
    update(dt, t, cam, info) {
      this.U.uTime.value = t;
      this.pacInfo = info.pac;
      if (info.pac) this.U.uPac.value.set(info.pac.x, 1.2, info.pac.z, info.pac.w);
      else this.U.uPac.value.w = 0;
      if (t - this.lastFix > 1 / 30 || this.fixDirty) { this.lastFix = t; this.updateFixtures(t, cam); }
      this.updateLightPool(cam, t, dt);
      for (const obj of this.doorObjs.values()) {
        if (obj.target == null) continue;
        const sp = obj.door.kind === 'elevator' ? 0.6 : obj.door.kind === 'house' ? 0.8 : 1.6;
        const na = U.clamp(obj.amt + Math.sign(obj.target - obj.amt) * dt * sp, 0, 1);
        if (na !== obj.amt) { obj.amt = na; this.applyDoor(obj); }
      }
      // Kabin ekranları (yakındakiler, 12 fps)
      if (this.screens.length && t - (this.lastScr || 0) > 1 / 12) {
        this.lastScr = t;
        const powered = this.L.theme !== 'arcade' || this.zonesOn.has(1);
        for (const s of this.screens) {
          const on = powered || s.lone;
          s.scr.on = on;
          const near = s.list.some(p => Math.abs(p.x - cam.x) < 22 && Math.abs(p.z - cam.z) < 22);
          if (near || s.scr.dirty) { s.scr.update(t); s.scr.dirty = false; }
          for (const m of s.mats) m.color.setScalar(on ? 1.7 : 0.08);
        }
      }
      if (this.waterTex) { this.waterTex.offset.set(t * 0.02, t * 0.013); }
      if (this.street) this.street.update(dt, t, cam);
      if (this.glitchTex && Math.random() < 0.25) {
        const tx = this.glitchTex[(Math.random() * this.glitchTex.length) | 0];
        tx.offset.set(Math.floor(Math.random() * 16) / 16, Math.floor(Math.random() * 16) / 16);
      }
      if (this.glitchSprites) for (const s of this.glitchSprites) { s.position.y = s.userData.base + Math.sin(t * 0.7 + s.userData.ph) * 0.6; s.material.rotation = Math.sin(t + s.userData.ph) * 0.3; }
      if (this.dust) this.dust.material.uniforms.uCam.value.set(cam.x, 0, cam.z);
      if (this.neonMesh) {
        const pulse = 1 + Math.sin(t * 2) * 0.08;
        const lm = this.U.uLmIntensity.value;
        this.neonMesh.material.color.setRGB(0.45 * pulse * lm, 0.45 * pulse * lm, 4.2 * pulse * lm);
        if (this.L.theme === 'glitch') this.neonMesh.material.color.setRGB(1.2 * pulse * lm, 0.4 * lm, 3.2 * pulse * lm);
      }
      if (this.pelletMesh && this.pellets) {
        // Hafif süzülme: tüm örnekleri her karede güncellemek yerine grubu salla
        this.pelletMesh.position.y = Math.sin(t * 2.2) * 0.05;
      }
    }

    // ------------------------------------------------------------ ÇARPIŞMA
    collide(pos, r, opts = {}) {
      const L = this.L, C = this.C, t = 0.1;
      let px = pos.x, pz = pos.z;
      const box = (minX, maxX, minZ, maxZ) => {
        const qx = px < minX ? minX : px > maxX ? maxX : px;
        const qz = pz < minZ ? minZ : pz > maxZ ? maxZ : pz;
        const dx = px - qx, dz = pz - qz, d2 = dx * dx + dz * dz;
        if (d2 >= r * r) return false;
        if (d2 > 1e-10) { const d = Math.sqrt(d2); px = qx + dx / d * r; pz = qz + dz / d * r; }
        else {
          const l = px - minX, rr = maxX - px, u = pz - minZ, dd = maxZ - pz, m = Math.min(l, rr, u, dd);
          if (m === l) px = minX - r; else if (m === rr) px = maxX + r; else if (m === u) pz = minZ - r; else pz = maxZ + r;
        }
        return true;
      };
      for (let iter = 0; iter < 3; iter++) {
        const cx = Math.floor(px / C), cz = Math.floor(pz / C);
        let hit = false;
        for (let y = cz - 1; y <= cz + 1; y++) for (let x = cx - 1; x <= cx + 1; x++) {
          if (!L.inb(x, y)) continue;
          const s = L.solid[L.i(x, y)];
          if (s) hit = box(x * C, (x + 1) * C, y * C, (y + 1) * C) || hit;
          for (let d = 0; d < 4; d++) {
            const k = L.edgeKind(x, y, d);
            const door = k ? null : L.doorAt(x, y, d);
            if (!k && !(door && (!door.open || opts.closedDoors))) continue;
            const th = k ? t : 0.06;
            if (d === 0) hit = box(x * C - t, (x + 1) * C + t, y * C - th, y * C + th) || hit;
            else if (d === 2) hit = box(x * C - t, (x + 1) * C + t, (y + 1) * C - th, (y + 1) * C + th) || hit;
            else if (d === 3) hit = box(x * C - th, x * C + th, y * C - t, (y + 1) * C + t) || hit;
            else hit = box((x + 1) * C - th, (x + 1) * C + th, y * C - t, (y + 1) * C + t) || hit;
          }
          const list = this.colGrid.get(L.i(x, y));
          if (list) for (const b of list) { if (opts.skip && opts.skip(b)) continue; hit = box(b.minX, b.maxX, b.minZ, b.maxZ) || hit; }
        }
        if (!hit) break;
      }
      pos.x = px; pos.z = pz;
      return pos;
    }
    // Footstep surface of a finished room (tiles, planks...), or null
    finishAt(x, z) {
      const L = this.L, fl = L.meta.finishes;
      if (!fl) return null;
      const cx = Math.floor(x / this.C), cy = Math.floor(z / this.C);
      for (const f of fl) if (cx >= f.x0 && cx <= f.x1 && cy >= f.y0 && cy <= f.y1) return { floorTile: 'tile', floorWood: 'wood', floorLino: 'lino', floorConcrete: 'concrete' }[f.floor] || null;
      return null;
    }
    floorAt(x, z) {
      const c = this.L.cellOf(x, z);
      if (!this.L.inb(c.x, c.y)) return 0;
      return this.L.floorType[this.L.i(c.x, c.y)] === 1 ? (this.drained ? -0.5 : -0.4) : 0;
    }
    dispose() {
      this.group.traverse(o => {
        if (o.geometry) o.geometry.dispose();
      });
      for (const m of this.mats.values()) m.dispose();
      this.disposeBake();
      if (this.envRT) this.envRT.dispose();
      P.clearCache();
    }
  }
  PB.World = World;
})(typeof window !== 'undefined' ? window : globalThis);
