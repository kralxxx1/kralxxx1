/* Dekor ve eşya modelleri: temel şekillerden kurulur, aynı malzemeli parçalar birleştirilir.
   Her tanım: [şekil, malzeme, boyutlar..., konum..., dönüş...] listesi. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const P = PB.Props = {};

  const tmpM = new THREE.Matrix4(), tmpQ = new THREE.Quaternion(), tmpE = new THREE.Euler(), tmpS = new THREE.Vector3(), tmpP = new THREE.Vector3();

  // Extra shape kinds (rounded boxes, lathes, extrusions, tubes...) are registered by models.js
  P.shapes = {};
  // One spec → list of [material, geometry] (a shape can emit parts with different materials)
  function prims(spec) {
    const [kind, mat, ...a] = spec;
    let g, pos, rot = [0, 0, 0], scl = [1, 1, 1], extra = null;
    switch (kind) {
      case 'box': g = new THREE.BoxGeometry(a[0], a[1], a[2]); pos = [a[3], a[4], a[5]]; rot = [a[6] || 0, a[7] || 0, a[8] || 0]; break;
      case 'cyl': g = new THREE.CylinderGeometry(a[0], a[1], a[2], a[3] || 16, 1, a[10] || false); pos = [a[4], a[5], a[6]]; rot = [a[7] || 0, a[8] || 0, a[9] || 0]; break;
      case 'sph': g = new THREE.SphereGeometry(a[0], a[4] || 16, a[5] || 12); pos = [a[1], a[2], a[3]]; if (a[6]) scl = a[6]; break;
      case 'plane': g = new THREE.PlaneGeometry(a[0], a[1]); pos = [a[2], a[3], a[4]]; rot = [a[5] || 0, a[6] || 0, a[7] || 0]; break;
      case 'torus': g = new THREE.TorusGeometry(a[0], a[1], 8, a[2] || 16, a[3] || Math.PI * 2); pos = [a[4], a[5], a[6]]; rot = [a[7] || 0, a[8] || 0, a[9] || 0]; break;
      case 'cone': g = new THREE.ConeGeometry(a[0], a[1], a[2] || 16, 1, true); pos = [a[3], a[4], a[5]]; rot = [a[6] || 0, a[7] || 0, a[8] || 0]; break;
      default: {
        const sh = P.shapes[kind];
        if (!sh) throw new Error('unknown shape: ' + kind);
        const r = sh(a);
        g = r.g; pos = r.pos || [0, 0, 0]; rot = r.rot || rot; scl = r.scl || scl; extra = r.extra || null;
      }
    }
    tmpE.set(rot[0], rot[1], rot[2]);
    tmpQ.setFromEuler(tmpE);
    tmpM.compose(tmpP.set(pos[0], pos[1], pos[2]), tmpQ, tmpS.set(scl[0], scl[1], scl[2]));
    const out = [[mat, g]];
    if (extra) for (const [m2, g2] of extra) out.push([m2 || mat, g2]);
    for (const o of out) {
      o[1] = o[1].index ? o[1].toNonIndexed() : o[1];
      o[1].applyMatrix4(tmpM);
    }
    return out;
  }
  function prim(spec) { return prims(spec)[0][1]; }
  // Basit birleştirme (index'siz, position/normal/uv)
  function merge(geos) {
    let n = 0;
    for (const g of geos) n += g.attributes.position.count;
    const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2);
    let o = 0;
    for (const g of geos) {
      const c = g.attributes.position.count;
      pos.set(g.attributes.position.array, o * 3);
      nor.set(g.attributes.normal.array, o * 3);
      if (g.attributes.uv) uv.set(g.attributes.uv.array.subarray(0, c * 2), o * 2);
      o += c;
      g.dispose();
    }
    const out = new THREE.BufferGeometry();
    out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    out.computeBoundingSphere();
    return out;
  }
  P.merge = merge;
  P.prim = prim;
  P.prims = prims;
  // Tanımı malzemeye göre gruplanmış geometrilere çevir (önbellekli)
  const cache = new Map();
  P.build = function (key, specs) {
    if (cache.has(key)) return cache.get(key);
    const groups = new Map();
    for (const s of specs) {
      for (const [mat, g] of prims(s)) {
        if (!groups.has(mat)) groups.set(mat, []);
        groups.get(mat).push(g);
      }
    }
    const out = [];
    for (const [mat, list] of groups) out.push({ mat, geo: merge(list) });
    cache.set(key, out);
    return out;
  };
  P.clearCache = () => { for (const parts of cache.values()) parts.forEach(p => p.geo.dispose()); cache.clear(); };

  const PI = Math.PI, H = PI / 2;
  const D = P.DEFS = {};
  // --- Atari salonu
  D.cabinetBody = [
    ['box', 'cabinetBody', 0.74, 1.0, 0.78, 0, 0.5, 0],
    ['box', 'cabinetBody', 0.74, 0.64, 0.5, 0, 1.32, -0.14],
    ['box', 'cabinetBody', 0.74, 0.34, 0.5, 0, 1.79, -0.14],
    ['box', 'blackPlastic', 0.6, 0.05, 0.3, 0, 1.63, 0.02],
    ['box', 'cabinetSide', 0.03, 1.94, 0.82, -0.385, 0.97, 0],
    ['box', 'cabinetSide', 0.03, 1.94, 0.82, 0.385, 0.97, 0],
    ['box', 'blackPlastic', 0.7, 0.08, 0.34, 0, 1.02, 0.4, -0.25],
    ['cyl', 'redPlastic', 0.035, 0.035, 0.05, 12, -0.15, 1.1, 0.42],
    ['cyl', 'yellowPlastic', 0.035, 0.035, 0.05, 12, 0.12, 1.1, 0.44],
    ['cyl', 'chrome', 0.012, 0.012, 0.12, 8, -0.15, 1.15, 0.42],
    ['sph', 'redPlastic', 0.035, -0.15, 1.22, 0.42],
    ['box', 'darkMetal', 0.26, 0.3, 0.02, 0, 0.45, 0.4],
    ['box', 'coinSlot', 0.05, 0.08, 0.02, -0.06, 0.52, 0.415],
    ['box', 'coinSlot', 0.05, 0.08, 0.02, 0.06, 0.52, 0.415],
  ];
  D.cabinetScreen = [['plane', 'screen', 0.54, 0.44, 0, 1.33, 0.125, -0.18]];
  D.cabinetMarquee = [['plane', 'marquee', 0.68, 0.2, 0, 1.8, 0.115]];
  D.airhockey = [
    ['box', 'whitePlastic', 2.2, 0.12, 1.2, 0, 0.8, 0],
    ['box', 'blackPlastic', 2.1, 0.7, 1.1, 0, 0.38, 0],
    ['box', 'redPlastic', 2.24, 0.1, 0.06, 0, 0.9, 0.6], ['box', 'redPlastic', 2.24, 0.1, 0.06, 0, 0.9, -0.6],
    ['cyl', 'redPlastic', 0.08, 0.08, 0.04, 16, -0.6, 0.88, 0.1], ['cyl', 'bluePlastic', 0.08, 0.08, 0.04, 16, 0.7, 0.88, -0.2],
  ];
  D.pinball = [
    ['box', 'cabinetBody', 0.7, 0.3, 1.4, 0, 0.95, 0, 0.12],
    ['box', 'chrome', 0.05, 0.85, 0.05, -0.3, 0.42, 0.6], ['box', 'chrome', 0.05, 0.85, 0.05, 0.3, 0.42, 0.6],
    ['box', 'chrome', 0.05, 0.85, 0.05, -0.3, 0.42, -0.6], ['box', 'chrome', 0.05, 0.85, 0.05, 0.3, 0.42, -0.6],
    ['box', 'cabinetBody', 0.7, 0.7, 0.16, 0, 1.55, -0.68],
    ['plane', 'pinballArt', 0.62, 0.55, 0, 1.57, -0.59],
  ];
  D.claw = [
    ['box', 'redPlastic', 1.1, 0.9, 1.1, 0, 0.45, 0],
    ['box', 'glass', 1.04, 1.0, 1.04, 0, 1.4, 0],
    ['box', 'redPlastic', 1.1, 0.2, 1.1, 0, 2.0, 0],
    ['sph', 'pinkPlush', 0.14, -0.2, 0.98, 0.1], ['sph', 'bluePlush', 0.14, 0.15, 0.98, -0.15], ['sph', 'yellowPlastic', 0.13, 0.05, 1.02, 0.2],
  ];
  D.change = [['box', 'paintMetal', 0.6, 1.6, 0.5, 0, 0.8, 0], ['box', 'blackPlastic', 0.3, 0.2, 0.02, 0, 1.2, 0.26], ['box', 'chrome', 0.2, 0.1, 0.05, 0, 0.5, 0.26]];
  D.counter = [
    ['box', 'wood', 6.2, 1.0, 0.7, 0, 0.5, 0],
    ['box', 'darkWood', 6.3, 0.05, 0.8, 0, 1.02, 0],
    ['box', 'glass', 6.0, 0.35, 0.02, 0, 0.7, 0.36],
    ['box', 'register', 0.45, 0.25, 0.4, 1.4, 1.17, -0.05],
  ];
  D.prizeShelf = [
    ['box', 'wood', 6, 0.04, 0.45, 0, 1.0, 0], ['box', 'wood', 6, 0.04, 0.45, 0, 1.6, 0], ['box', 'wood', 6, 0.04, 0.45, 0, 2.2, 0],
    ['sph', 'pinkPlush', 0.18, -2, 1.2, 0], ['sph', 'bluePlush', 0.2, -1, 1.22, 0], ['sph', 'yellowPlastic', 0.22, 0.5, 1.8, 0], ['sph', 'pinkPlush', 0.16, 2.1, 1.8, 0],
    ['box', 'redPlastic', 0.3, 0.3, 0.3, 1.2, 1.17, 0], ['box', 'bluePlastic', 0.25, 0.4, 0.25, -2.4, 1.82, 0], ['box', 'yellowPlastic', 0.35, 0.3, 0.3, 2.5, 2.37, 0],
  ];
  D.bench = [['box', 'wood', 2.2, 0.08, 0.45, 0, 0.45, 0], ['box', 'darkMetal', 0.06, 0.45, 0.4, -1, 0.22, 0], ['box', 'darkMetal', 0.06, 0.45, 0.4, 1, 0.22, 0]];
  D.desk = [
    ['box', 'wood', 1.8, 0.05, 0.85, 0, 0.75, 0],
    ['box', 'darkWood', 0.05, 0.73, 0.8, -0.86, 0.37, 0], ['box', 'darkWood', 0.05, 0.73, 0.8, 0.86, 0.37, 0],
    ['box', 'darkWood', 0.5, 0.7, 0.8, 0.6, 0.37, 0], ['box', 'darkWood', 1.7, 0.4, 0.03, 0, 0.5, -0.4],
  ];
  D.deskLamp = [['cyl', 'darkMetal', 0.08, 0.1, 0.03, 16, 0, 0.79, 0], ['cyl', 'darkMetal', 0.01, 0.01, 0.4, 8, 0, 0.98, 0, 0.3], ['cone', 'greenShade', 0.14, 0.14, 16, 0.05, 1.15, 0.08, 0.5]];
  D.chair = [
    ['box', 'darkWood', 0.45, 0.05, 0.45, 0, 0.46, 0], ['box', 'darkWood', 0.45, 0.5, 0.05, 0, 0.72, -0.2],
    ['box', 'darkMetal', 0.04, 0.46, 0.04, -0.2, 0.23, -0.2], ['box', 'darkMetal', 0.04, 0.46, 0.04, 0.2, 0.23, -0.2],
    ['box', 'darkMetal', 0.04, 0.46, 0.04, -0.2, 0.23, 0.2], ['box', 'darkMetal', 0.04, 0.46, 0.04, 0.2, 0.23, 0.2],
  ];
  D.filing = [['box', 'paintMetal', 0.6, 1.3, 0.65, 0, 0.65, 0], ['box', 'darkMetal', 0.5, 0.01, 0.01, 0, 0.35, 0.33], ['box', 'darkMetal', 0.5, 0.01, 0.01, 0, 0.75, 0.33], ['box', 'darkMetal', 0.5, 0.01, 0.01, 0, 1.1, 0.33], ['box', 'chrome', 0.14, 0.03, 0.03, 0, 0.55, 0.34], ['box', 'chrome', 0.14, 0.03, 0.03, 0, 0.95, 0.34]];
  D.safe = [['box', 'darkMetal', 0.8, 0.9, 0.7, 0, 0.45, 0], ['cyl', 'chrome', 0.08, 0.08, 0.05, 20, 0.15, 0.55, 0.37, H], ['box', 'chrome', 0.04, 0.2, 0.04, -0.2, 0.5, 0.37]];
  D.corkboard = [['box', 'cork', 1.4, 0.9, 0.03, 0, 0, 0], ['box', 'paper', 0.25, 0.3, 0.005, -0.35, 0.1, 0.02, 0, 0, 0.1], ['box', 'paper', 0.3, 0.2, 0.005, 0.3, -0.15, 0.02, 0, 0, -0.08], ['box', 'yellowPaper', 0.15, 0.15, 0.005, 0.4, 0.25, 0.02]];
  D.shelf = [
    ['box', 'paintMetal', 2.6, 0.03, 0.55, 0, 0.3, 0], ['box', 'paintMetal', 2.6, 0.03, 0.55, 0, 1.0, 0], ['box', 'paintMetal', 2.6, 0.03, 0.55, 0, 1.7, 0],
    ['box', 'paintMetal', 0.04, 2.0, 0.04, -1.28, 1, 0.26], ['box', 'paintMetal', 0.04, 2.0, 0.04, 1.28, 1, 0.26], ['box', 'paintMetal', 0.04, 2.0, 0.04, -1.28, 1, -0.26], ['box', 'paintMetal', 0.04, 2.0, 0.04, 1.28, 1, -0.26],
    ['box', 'cardboard', 0.5, 0.4, 0.45, -0.8, 0.52, 0], ['box', 'cardboard', 0.6, 0.35, 0.45, 0.3, 1.2, 0], ['box', 'cardboard', 0.4, 0.3, 0.4, 0.9, 1.87, 0],
  ];
  D.boxes = [['box', 'cardboard', 0.7, 0.5, 0.6, 0, 0.25, 0], ['box', 'cardboard', 0.6, 0.45, 0.5, 0.05, 0.72, 0.02, 0, 0.3], ['box', 'cardboard', 0.4, 0.3, 0.4, -0.1, 1.1, 0, 0, -0.2]];
  D.sink = [['box', 'ceramic', 0.55, 0.18, 0.45, 0, 0.85, 0], ['cyl', 'ceramic', 0.08, 0.1, 0.75, 12, 0, 0.4, 0], ['cyl', 'chrome', 0.015, 0.015, 0.2, 8, 0, 1.02, -0.15]];
  D.mirror = [['box', 'mirror', 0.6, 0.8, 0.02, 0, 1.6, 0]];
  D.toilet = [['box', 'ceramic', 0.4, 0.4, 0.55, 0, 0.2, 0.05], ['box', 'ceramic', 0.4, 0.45, 0.18, 0, 0.6, -0.22], ['cyl', 'ceramic', 0.2, 0.2, 0.04, 16, 0, 0.42, 0.08]];
  // --- Depo
  D.crate = [['box', 'crateWood', 1.1, 1.0, 1.1, 0, 0.5, 0]];
  D.crateStack = [['box', 'crateWood', 1.1, 1.0, 1.1, 0, 0.5, 0], ['box', 'cardboard', 0.9, 0.7, 0.9, 0.05, 1.35, 0, 0, 0.3]];
  D.barrel = [['cyl', 'barrelBlue', 0.3, 0.3, 0.9, 20, 0, 0.45, 0], ['torus', 'darkMetal', 0.3, 0.015, 20, 0, 0, 0.2, 0, H, 0, 0], ['torus', 'darkMetal', 0.3, 0.015, 20, 0, 0, 0.7, 0, H, 0, 0]];
  D.pallet = [['box', 'crateWood', 1.2, 0.03, 1.0, 0, 0.14, 0], ['box', 'crateWood', 1.2, 0.1, 0.1, 0, 0.06, -0.45], ['box', 'crateWood', 1.2, 0.1, 0.1, 0, 0.06, 0], ['box', 'crateWood', 1.2, 0.1, 0.1, 0, 0.06, 0.45], ['box', 'cardboard', 0.8, 0.4, 0.6, 0.1, 0.36, 0]];
  D.rack = (() => {
    const s = [];
    for (const x of [-1.4, 1.4]) for (const z of [-1.2, -0.05, 0.05, 1.2]) s.push(['box', 'rackBlue', 0.08, 4.6, 0.08, x, 2.3, z]);
    for (const y of [0.15, 1.5, 2.85, 4.2]) for (const z of [-0.62, 0.62]) {
      s.push(['box', 'rackOrange', 2.9, 0.12, 0.06, 0, y, z - 0.55]); s.push(['box', 'rackOrange', 2.9, 0.12, 0.06, 0, y, z + 0.55]);
      s.push(['box', 'crateWood', 2.8, 0.04, 1.1, 0, y + 0.08, z]);
    }
    return s;
  })();
  D.rackGoods = (() => {
    const s = [];
    const r = PB.U.rng(7);
    for (const y of [0.25, 1.6, 2.95]) for (const z of [-0.62, 0.62]) for (let x = -1.1; x <= 1.1; x += 0.75) {
      if (r() < 0.25) continue;
      const w = r.range(0.45, 0.7), h = r.range(0.4, 1.0);
      s.push([r() < 0.2 ? 'barrelBlue' : 'cardboard', w, h, r.range(0.6, 1.0), x, y + h / 2, z]);
    }
    return s.map(v => ['box', v[0], v[1], v[2], v[3], v[4], v[5], v[6]]);
  })();
  D.pillarConcrete = [['box', 'pillar', 0.7, 1, 0.7, 0, 0.5, 0]];
  D.pipe = [['cyl', 'darkMetal', 0.12, 0.12, 3, 12, 0, 0, 0, 0, 0, H]];
  // --- Havuz
  D.ladder = [
    ['torus', 'chrome', 0.3, 0.025, 12, PI, -0.3, 0.9, 0.05, 0, H, 0], ['torus', 'chrome', 0.3, 0.025, 12, PI, 0.3, 0.9, 0.05, 0, H, 0],
    ['cyl', 'chrome', 0.025, 0.025, 1.4, 8, -0.3, 0.2, -0.25], ['cyl', 'chrome', 0.025, 0.025, 1.4, 8, 0.3, 0.2, -0.25],
    ['box', 'chrome', 0.6, 0.03, 0.12, 0, -0.1, -0.25], ['box', 'chrome', 0.6, 0.03, 0.12, 0, -0.35, -0.25],
  ];
  D.lounger = [['box', 'whitePlastic', 0.7, 0.06, 1.8, 0, 0.35, 0], ['box', 'whitePlastic', 0.7, 0.06, 0.7, 0, 0.6, -0.8, -0.8], ['box', 'whitePlastic', 0.06, 0.35, 0.06, -0.3, 0.17, 0.8], ['box', 'whitePlastic', 0.06, 0.35, 0.06, 0.3, 0.17, 0.8], ['box', 'whitePlastic', 0.06, 0.35, 0.06, -0.3, 0.17, -0.6], ['box', 'whitePlastic', 0.06, 0.35, 0.06, 0.3, 0.17, -0.6]];
  D.towelRack = [['box', 'chrome', 0.04, 1.2, 0.04, -0.4, 0.6, 0], ['box', 'chrome', 0.04, 1.2, 0.04, 0.4, 0.6, 0], ['box', 'chrome', 0.84, 0.04, 0.04, 0, 1.1, 0], ['box', 'towel', 0.5, 0.7, 0.03, 0, 0.8, 0.02]];
  // --- Ofis
  D.cubicleDesk = [
    ['box', 'laminate', 0.75, 0.04, 1.6, 0, 0.74, 0], ['box', 'darkMetal', 0.7, 0.7, 0.04, 0, 0.36, -0.78], ['box', 'darkMetal', 0.7, 0.7, 0.04, 0, 0.36, 0.78],
    ['box', 'beigePlastic', 0.42, 0.34, 0.4, -0.08, 0.95, 0.15], ['box', 'beigePlastic', 0.36, 0.08, 0.3, -0.08, 0.8, 0.15], ['box', 'beigePlastic', 0.18, 0.03, 0.45, 0.2, 0.77, 0.15],
    ['box', 'paper', 0.21, 0.01, 0.3, 0.15, 0.765, -0.45, 0, 0.2],
  ];
  D.crtScreen = [['plane', 'crt', 0.3, 0.24, 0.131, 0.965, 0.15, 0, H]];
  D.officeChair = [['box', 'blackFabric', 0.48, 0.08, 0.48, 0, 0.48, 0], ['box', 'blackFabric', 0.46, 0.55, 0.06, 0, 0.82, -0.22], ['cyl', 'darkMetal', 0.03, 0.03, 0.38, 8, 0, 0.26, 0], ['cyl', 'darkMetal', 0.3, 0.3, 0.03, 5, 0, 0.06, 0]];
  D.monitorWall = (() => { const s = [['box', 'darkMetal', 3, 1.7, 0.4, 0, 1.25, 0]]; return s; })();
  D.meetingTable = [['box', 'laminate', 4.4, 0.05, 1.7, 0, 0.75, 0], ['box', 'darkMetal', 0.2, 0.72, 1.2, -1.6, 0.37, 0], ['box', 'darkMetal', 0.2, 0.72, 1.2, 1.6, 0.37, 0]];
  D.kitchenCounter = [['box', 'laminate', 0.75, 0.9, 5.6, 0, 0.45, 0], ['box', 'whitePlastic', 0.5, 0.35, 0.4, 0, 1.08, 1.5], ['box', 'darkMetal', 0.3, 0.4, 0.3, 0, 1.1, -1.8], ['cyl', 'ceramic', 0.05, 0.04, 0.1, 10, 0.1, 0.95, -1.4]];
  D.waterCooler = [['box', 'whitePlastic', 0.35, 1.0, 0.35, 0, 0.5, 0], ['cyl', 'waterJug', 0.15, 0.15, 0.42, 16, 0, 1.22, 0]];
  D.serverRack = [['box', 'blackPlastic', 0.8, 2.1, 1.0, -0.95, 1.05, 0], ['box', 'blackPlastic', 0.8, 2.1, 1.0, 0, 1.05, 0], ['box', 'blackPlastic', 0.8, 2.1, 1.0, 0.95, 1.05, 0]];
  D.serverLeds = [['plane', 'leds', 0.7, 1.9, -0.95, 1.05, 0.505], ['plane', 'leds', 0.7, 1.9, 0, 1.05, 0.505], ['plane', 'leds', 0.7, 1.9, 0.95, 1.05, 0.505], ['plane', 'leds', 0.7, 1.9, -0.95, 1.05, -0.505, 0, PI], ['plane', 'leds', 0.7, 1.9, 0, 1.05, -0.505, 0, PI], ['plane', 'leds', 0.7, 1.9, 0.95, 1.05, -0.505, 0, PI]];
  D.archiveShelf = [['box', 'paintMetal', 2.9, 2.4, 0.9, 0, 1.2, 0], ['box', 'folders', 2.8, 2.2, 0.02, 0, 1.2, 0.46], ['box', 'folders', 2.8, 2.2, 0.02, 0, 1.2, -0.46, 0, PI]];
  // --- Arka Odalar dönüm noktaları
  D.chairPile = (() => {
    const s = [];
    const r = PB.U.rng(55);
    for (let k = 0; k < 14; k++) {
      const x = r.range(-1.6, 1.6), z = r.range(-1.6, 1.6), y = r.range(0.2, 1.6), ry = r.range(0, 6.28), rx = r.range(-1, 1);
      s.push(['box', 'redPlastic', 0.45, 0.05, 0.45, x, y, z, rx, ry]);
      s.push(['box', 'redPlastic', 0.45, 0.45, 0.05, x, y + 0.25, z - 0.2, rx, ry]);
    }
    return s;
  })();
  D.stairsUp = (() => {
    const s = [];
    for (let k = 0; k < 12; k++) s.push(['box', 'carpetStep', 1.4, 0.25, 0.3, 0, 0.125 + k * 0.25, 1.6 - k * 0.3]);
    s.push(['box', 'wood', 0.05, 3.1, 3.6, 0.72, 1.55, 0]);
    return s;
  })();
  D.sleepingBag = [['box', 'bagFabric', 0.8, 0.15, 1.9, 0, 0.075, 0], ['sph', 'bagFabric', 0.25, 0, 0.12, -0.8, 16, 8, [1.2, 0.5, 0.8]], ['cyl', 'darkMetal', 0.06, 0.06, 0.25, 12, 0.7, 0.125, 0.5], ['sph', 'glassYellow', 0.07, 0.7, 0.3, 0.5]];
  D.shrineAltar = [['box', 'darkWood', 1.2, 0.8, 0.6, 0, 0.4, 0], ['box', 'darkWood', 0.4, 0.5, 0.04, 0, 1.05, -0.15, -0.15], ['box', 'photoPlane', 0.34, 0.42, 0.01, 0, 1.05, -0.12, -0.15], ['cyl', 'candle', 0.04, 0.04, 0.18, 10, -0.4, 0.89, 0.1], ['cyl', 'candle', 0.04, 0.04, 0.12, 10, 0.4, 0.86, 0.12]];

  // --- Eşyalar (etkileşimli nesneler)
  D.flashlight = [['cyl', 'blackPlastic', 0.03, 0.03, 0.22, 12, 0, 0.03, 0, 0, 0, H], ['cyl', 'chrome', 0.045, 0.03, 0.06, 12, 0.13, 0.03, 0, 0, 0, H]];
  D.token = [['cyl', 'brass', 0.03, 0.03, 0.006, 20, 0, 0.003, 0]];
  D.note = [['box', 'paper', 0.21, 0.004, 0.29, 0, 0.002, 0]];
  D.noteWall = [['box', 'paper', 0.21, 0.29, 0.004, 0, 0, 0]];
  D.tape = [['box', 'blackPlastic', 0.32, 0.1, 0.18, 0, 0.05, 0], ['box', 'chrome', 0.1, 0.02, 0.12, -0.06, 0.1, 0], ['box', 'redPlastic', 0.03, 0.01, 0.03, 0.1, 0.1, 0.05], ['box', 'cassette', 0.1, 0.012, 0.064, -0.06, 0.112, 0]];
  D.battery = [['cyl', 'batteryBody', 0.017, 0.017, 0.06, 10, 0, 0.03, 0, 0, 0, H], ['cyl', 'chrome', 0.006, 0.006, 0.006, 8, 0.033, 0.03, 0, 0, 0, H]];
  D.almond = [['cyl', 'waterJug', 0.035, 0.035, 0.2, 12, 0, 0.1, 0], ['cyl', 'whitePlastic', 0.015, 0.015, 0.03, 8, 0, 0.215, 0], ['cyl', 'almondLabel', 0.036, 0.036, 0.08, 12, 0, 0.1, 0]];
  D.glowstick = [['cyl', 'glowGreen', 0.012, 0.012, 0.16, 8, 0, 0.012, 0, 0, 0, H]];
  D.fuse = [['cyl', 'ceramic', 0.03, 0.03, 0.12, 12, 0, 0.03, 0, 0, 0, H], ['cyl', 'brass', 0.032, 0.032, 0.02, 12, 0.06, 0.03, 0, 0, 0, H], ['cyl', 'brass', 0.032, 0.032, 0.02, 12, -0.06, 0.03, 0, 0, 0, H]];
  D.fuelCan = [['box', 'redPlastic', 0.3, 0.38, 0.16, 0, 0.19, 0], ['box', 'redPlastic', 0.14, 0.05, 0.03, 0.02, 0.4, 0], ['cyl', 'blackPlastic', 0.025, 0.025, 0.06, 8, -0.1, 0.4, 0]];
  D.keycard = [['box', 'whitePlastic', 0.085, 0.002, 0.054, 0, 0.001, 0], ['box', 'bluePlastic', 0.085, 0.003, 0.015, 0, 0.001, -0.015]];
  D.key = [['torus', 'brass', 0.015, 0.004, 12, 0, 0, 0.004, 0, H, 0, 0], ['box', 'brass', 0.05, 0.004, 0.008, 0.035, 0.004, 0]];
  D.watch = [['torus', 'blackPlastic', 0.03, 0.006, 16, 0, 0, 0.004, 0, H, 0, 0], ['cyl', 'chrome', 0.022, 0.022, 0.008, 16, 0, 0.006, 0], ['box', 'blackPlastic', 0.02, 0.003, 0.12, 0, 0.002, 0.07]];
  D.glasses = [['torus', 'darkMetal', 0.028, 0.004, 16, 0, -0.035, 0.03, 0, 0, 0, 0], ['torus', 'darkMetal', 0.028, 0.004, 16, 0, 0.035, 0.03, 0, 0, 0, 0], ['box', 'darkMetal', 0.004, 0.004, 0.12, -0.065, 0.03, -0.06], ['box', 'darkMetal', 0.004, 0.004, 0.12, 0.065, 0.03, -0.06]];
  // Walkie-talkie (lying on the floor)
  D.walkie = [['box', 'blackPlastic', 0.07, 0.04, 0.2, 0, 0.02, 0], ['box', 'darkMetal', 0.05, 0.005, 0.07, 0, 0.042, 0.04], ['cyl', 'blackPlastic', 0.006, 0.006, 0.16, 8, 0.02, 0.025, -0.17, H, 0, 0], ['cyl', 'redPlastic', 0.009, 0.009, 0.012, 10, -0.022, 0.04, -0.07, 0, 0, 0]];
  D.walkman = [['box', 'pinkPlastic', 0.11, 0.03, 0.08, 0, 0.015, 0], ['box', 'cassette', 0.08, 0.004, 0.05, 0, 0.031, 0], ['torus', 'blackPlastic', 0.07, 0.005, 16, PI, 0, 0.005, -0.1, H, 0, 0]];
  D.lighter = [['box', 'chrome', 0.035, 0.055, 0.012, 0, 0.0275, 0], ['box', 'brass', 0.035, 0.015, 0.012, 0, 0.062, 0]];
  D.powerPellet = [['sph', 'pellet', 0.18, 0, 0, 0, 24, 16]];
  D.exitPanel = [['box', 'darkMetal', 0.5, 0.5, 0.06, 0, 0, 0], ['cyl', 'socket', 0.07, 0.07, 0.03, 16, -0.12, 0.12, 0.03, H], ['cyl', 'socket', 0.07, 0.07, 0.03, 16, 0.12, 0.12, 0.03, H], ['cyl', 'socket', 0.07, 0.07, 0.03, 16, -0.12, -0.12, 0.03, H], ['cyl', 'socket', 0.07, 0.07, 0.03, 16, 0.12, -0.12, 0.03, H]];
  D.fuseBox = [['box', 'paintMetal', 0.5, 0.7, 0.14, 0, 0, 0], ['box', 'darkMetal', 0.06, 0.2, 0.06, 0, -0.05, 0.08], ['box', 'yellowPaper', 0.3, 0.08, 0.005, 0, 0.26, 0.072]];
  D.fusePanel = [['box', 'paintMetal', 0.6, 0.8, 0.14, 0, 0, 0], ['cyl', 'socket', 0.045, 0.045, 0.03, 12, -0.15, 0.05, 0.075, H], ['cyl', 'socket', 0.045, 0.045, 0.03, 12, 0, 0.05, 0.075, H], ['cyl', 'socket', 0.045, 0.045, 0.03, 12, 0.15, 0.05, 0.075, H], ['box', 'yellowPaper', 0.4, 0.1, 0.005, 0, 0.3, 0.072]];
  D.register = [['box', 'register', 0.45, 0.25, 0.4, 0, 0.125, 0], ['box', 'blackPlastic', 0.3, 0.1, 0.02, 0, 0.3, -0.1, -0.3]];
  D.valve = [['torus', 'redPaint', 0.2, 0.025, 20, 0, 0, 0, 0.14, 0, 0, 0], ['box', 'redPaint', 0.4, 0.03, 0.03, 0, 0, 0.14], ['box', 'redPaint', 0.03, 0.4, 0.03, 0, 0, 0.14], ['cyl', 'darkMetal', 0.04, 0.04, 0.14, 12, 0, 0, 0.07, H], ['cyl', 'darkMetal', 0.08, 0.08, 0.04, 16, 0, 0, 0.01, H]];
  D.drain = [['cyl', 'darkMetal', 0.6, 0.6, 0.05, 24, 0, 0.025, 0], ['box', 'chrome', 0.3, 0.06, 0.06, 0, 0.07, 0]];
  D.keypad = [['box', 'darkMetal', 0.16, 0.24, 0.04, 0, 0, 0], ['box', 'keys', 0.12, 0.14, 0.005, 0, -0.03, 0.022], ['box', 'lcd', 0.12, 0.04, 0.005, 0, 0.08, 0.022]];
  D.cardReader = [['box', 'darkMetal', 0.1, 0.16, 0.04, 0, 0, 0], ['box', 'blackPlastic', 0.012, 0.1, 0.03, 0, -0.01, 0.025]];
  D.computer = D.cubicleDesk;
  D.phone = [['box', 'beigePlastic', 0.22, 0.07, 0.2, 0, 0.035, 0], ['box', 'beigePlastic', 0.22, 0.05, 0.06, 0, 0.1, -0.05], ['box', 'darkMetal', 0.08, 0.005, 0.08, 0.05, 0.072, 0.04]];
  D.printer = [['box', 'beigePlastic', 0.5, 0.25, 0.4, 0, 0.125, 0], ['box', 'paper', 0.21, 0.01, 0.3, 0, 0.26, 0.05]];
  D.generator = [['box', 'yellowPaint', 0.9, 0.7, 0.55, 0, 0.35, 0], ['box', 'darkMetal', 0.92, 0.1, 0.57, 0, 0.72, 0], ['cyl', 'darkMetal', 0.07, 0.07, 0.1, 12, 0.3, 0.8, 0], ['cyl', 'darkMetal', 0.04, 0.04, 0.3, 8, -0.3, 0.9, 0.1], ['box', 'blackPlastic', 0.3, 0.2, 0.02, -0.1, 0.4, 0.28]];
  D.portal = [['torus', 'portal', 0.9, 0.06, 32, 0, 0, 1.3, 0, 0, 0, 0]];
  D.plug = [['box', 'darkMetal', 1.4, 2.2, 0.8, 0, 1.1, 0], ['box', 'blackPlastic', 0.6, 0.8, 0.5, 0, 1.2, 0.6], ['box', 'chrome', 0.08, 0.4, 0.3, -0.15, 1.2, 0.95], ['box', 'chrome', 0.08, 0.4, 0.3, 0.15, 1.2, 0.95], ['cyl', 'blackPlastic', 0.18, 0.18, 6, 16, 0, 1.2, -3.5, H]];
  D.whiteboard = [['box', 'darkMetal', 1.6, 0.9, 0.03, 0, 0, 0]];
  D.whiteboardFace = [['plane', 'wb', 1.55, 0.85, 0, 0, 0.017]];
  D.shrine = D.shrineAltar;
  D.specialCabinet = D.cabinetBody;
  D.freeCabinet = D.cabinetBody;
  D.codeClue = D.note;
  D.memento = D.watch;
  D.elevatorCar = [
    ['box', 'metal', 2.4, 0.05, 2.4, 0, 0, 0], ['box', 'metal', 2.4, 0.05, 2.4, 0, 2.7, 0],
    ['box', 'metal', 0.05, 2.7, 2.4, -1.2, 1.35, 0], ['box', 'metal', 0.05, 2.7, 2.4, 1.2, 1.35, 0], ['box', 'metal', 2.4, 2.7, 0.05, 0, 1.35, 1.2],
    ['box', 'chrome', 2.3, 0.04, 0.04, 0, 1.0, 1.15], ['box', 'elevatorPanel', 0.25, 0.5, 0.02, 0.9, 1.3, 1.17],
  ];
  D.stairsDown = (() => {
    const s = [['box', 'concrete', 2.4, 3.2, 0.1, 0, 1.6, 3.4], ['box', 'concrete', 0.1, 3.2, 3.4, -1.2, 1.6, 1.7], ['box', 'concrete', 0.1, 3.2, 3.4, 1.2, 1.6, 1.7]];
    for (let k = 0; k < 10; k++) s.push(['box', 'concrete', 2.3, 0.2, 0.32, 0, -0.1 - k * 0.2, 0.3 + k * 0.32]);
    s.push(['box', 'rackOrange', 0.05, 0.05, 3.4, -1.05, 0.9, 1.7]);
    return s;
  })();
  D.exitBeyond = [['box', 'whiteLight', 1.4, 2.4, 0.1, 0, 1.2, 1.5]];
})(typeof window !== 'undefined' ? window : globalThis);
