/* Prosedürel dokular: tek bir resim dosyası yok. Döşenebilir PBR setleri (renk, normal, AO/pürüzlülük/metal),
   tabelalar, afişler, çıkartmalar, ekranlar ve arcade görselleri. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U;
  const THREE = root.THREE;
  const T = PB.Tex = { cache: new Map(), aniso: 4, maxAniso: 1 };
  const sm = U.smoothstep, fr = U.fract, cl = U.clamp;

  const h32 = (x, y, s) => {
    let h = (x * 374761393 + y * 668265263 + s * 982451653) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  // Düşük çözünürlükte fBm üret, hedef boyuta büyüt
  const field = (n, period, oct, seed, gain) => {
    const base = Math.min(n, period * 8 > 256 ? 256 : Math.max(64, period * 8));
    return U.upsample(U.fbmField(base, period, oct, seed, gain), base, n);
  };
  const downUp = (src, n, f) => {
    const m = Math.max(4, n / f | 0), out = new Float32Array(m * m), k = n / m;
    for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) {
      let s = 0;
      for (let yy = 0; yy < k; yy++) for (let xx = 0; xx < k; xx++) s += src[(y * k + yy) * n + x * k + xx];
      out[y * m + x] = s / (k * k);
    }
    return U.upsample(out, m, n);
  };

  class FImg {
    constructor(n) {
      this.n = n;
      this.rgb = new Float32Array(n * n * 3);
      this.h = new Float32Array(n * n).fill(0.5);
      this.r = new Float32Array(n * n).fill(0.8);
      this.m = null; this.e = null;
      this.normalStrength = 1; this.aoStrength = 1;
    }
    set(i, r, g, b) { this.rgb[i * 3] = r; this.rgb[i * 3 + 1] = g; this.rgb[i * 3 + 2] = b; }
  }

  function setup(tex, srgb) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.generateMipmaps = true;
    tex.anisotropy = T.aniso;
    if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }
  function finalize(img) {
    const n = img.n, N = n * n;
    const a = new Uint8Array(N * 4);
    for (let i = 0; i < N; i++) {
      a[i * 4] = cl(img.rgb[i * 3] * 255, 0, 255);
      a[i * 4 + 1] = cl(img.rgb[i * 3 + 1] * 255, 0, 255);
      a[i * 4 + 2] = cl(img.rgb[i * 3 + 2] * 255, 0, 255);
      a[i * 4 + 3] = 255;
    }
    const map = setup(new THREE.DataTexture(a, n, n, THREE.RGBAFormat), true);
    // Normal haritası: yükseklikten Sobel
    const nm = new Uint8Array(N * 4), h = img.h;
    const st = img.normalStrength * n / 256;
    for (let y = 0; y < n; y++) {
      const y0 = ((y - 1 + n) % n) * n, y1 = y * n, y2 = ((y + 1) % n) * n;
      for (let x = 0; x < n; x++) {
        const x0 = (x - 1 + n) % n, x2 = (x + 1) % n;
        const dx = (h[y0 + x2] + 2 * h[y1 + x2] + h[y2 + x2] - h[y0 + x0] - 2 * h[y1 + x0] - h[y2 + x0]) * 0.25;
        const dy = (h[y2 + x0] + 2 * h[y2 + x] + h[y2 + x2] - h[y0 + x0] - 2 * h[y0 + x] - h[y0 + x2]) * 0.25;
        let nx = -dx * st, ny = -dy * st, nz = 1;
        const l = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
        const i = (y1 + x) * 4;
        nm[i] = (nx * l * 0.5 + 0.5) * 255; nm[i + 1] = (ny * l * 0.5 + 0.5) * 255; nm[i + 2] = (nz * l * 0.5 + 0.5) * 255; nm[i + 3] = 255;
      }
    }
    const normalMap = setup(new THREE.DataTexture(nm, n, n, THREE.RGBAFormat), false);
    // ORM: R = boşluk AO, G = pürüzlülük, B = metal
    const low = downUp(h, n, 16);
    const orm = new Uint8Array(N * 4);
    for (let i = 0; i < N; i++) {
      const ao = cl(1 - Math.max(0, low[i] - h[i]) * 2.2 * img.aoStrength, 0.35, 1);
      orm[i * 4] = ao * 255;
      orm[i * 4 + 1] = cl(img.r[i], 0.02, 1) * 255;
      orm[i * 4 + 2] = img.m ? cl(img.m[i], 0, 1) * 255 : 0;
      orm[i * 4 + 3] = 255;
    }
    const ormMap = setup(new THREE.DataTexture(orm, n, n, THREE.RGBAFormat), false);
    let emissiveMap = null;
    if (img.e) {
      const e = new Uint8Array(N * 4);
      for (let i = 0; i < N; i++) { e[i * 4] = cl(img.e[i * 3] * 255, 0, 255); e[i * 4 + 1] = cl(img.e[i * 3 + 1] * 255, 0, 255); e[i * 4 + 2] = cl(img.e[i * 3 + 2] * 255, 0, 255); e[i * 4 + 3] = 255; }
      emissiveMap = setup(new THREE.DataTexture(e, n, n, THREE.RGBAFormat), true);
    }
    return { map, normalMap, ormMap, emissiveMap, metal: !!img.m };
  }

  // ------------------------------------------------------------ TARİFLER
  const R = {};
  // Level-0 wallpaper: four 53 cm rolls per tile, each printed with two pale pinstripes and a column
  // of small chevrons, hung a little out of register (every roll starts at a different height, and
  // comes from a slightly different dye lot). Butt seams, a bubble or two, a seam lifting at the bottom.
  R.wallpaper = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 3, 4, s), mid = field(n, 12, 3, s + 1), fine = field(n, 64, 2, s + 2), paper = field(n, 160, 1, s + 5);
    const rolls = 4, rollOff = [0, 0.37, 0.71, 0.19], lot = [1, 0.965, 1.02, 0.985];
    const bubbles = [];
    for (let k = 0; k < 5; k++) bubbles.push([h32(k, 1, s), h32(k, 2, s), 0.012 + h32(k, 3, s) * 0.02]);
    const peelRoll = Math.floor(h32(7, 7, s) * rolls);
    for (let y = 0; y < n; y++) {
      const v = y / n;
      for (let x = 0; x < n; x++) {
        const u = x / n, i = y * n + x;
        const ru = u * rolls, roll = Math.floor(ru), fu = ru - roll;
        // Pattern inside the roll: stripes at 1/4 and 3/4, chevrons down the middle
        const pv = fr(v * 20 + rollOff[roll]);
        const stripe = Math.max(1 - sm(0.004, 0.012, Math.abs(fu - 0.25)), 1 - sm(0.004, 0.012, Math.abs(fu - 0.75)));
        const cx = Math.abs(fu - 0.5);
        const chev = cx < 0.14 ? 1 - sm(0.01, 0.024, Math.abs(pv - (0.3 + cx * 2.2))) : 0;
        const dot = (1 - sm(0.012, 0.022, Math.hypot((fu - 0.5) * 0.53, (fr(v * 20 + rollOff[roll] + 0.5) - 0.5) * 0.106))) * 0.6;
        // Butt seam between rolls: a hairline gap, the paper edges slightly raised
        const se = Math.min(fu, 1 - fu);
        const seam = 1 - sm(0, 0.0035, se), lip = (1 - sm(0.0035, 0.012, se)) * (1 - seam);
        // Bubbles
        let bub = 0;
        for (const [bx, by, br] of bubbles) { const d = Math.hypot((u - bx) * 1, (v - by) * 1); bub = Math.max(bub, 1 - sm(br * 0.5, br, d)); }
        // The bottom of one seam is lifting
        const peel = roll === peelRoll || roll === (peelRoll + 1) % rolls ? (1 - sm(0, 0.03, se)) * sm(0.86, 0.97, v) : 0;
        const w = h32(x, y, s);
        const shade = (1 + (low[i] - 0.5) * 0.14 + (mid[i] - 0.5) * 0.06 + (w - 0.5) * 0.035 + (fine[i] - 0.5) * 0.05 + (paper[i] - 0.5) * 0.04) * lot[roll];
        const print = stripe * 0.075 + chev * 0.06 + dot * 0.05;
        const k = shade * (1 + print) * (1 - seam * 0.45) * (1 + lip * 0.04) * (1 - peel * 0.25);
        const age = sm(0.55, 0.85, 1 - low[i]) * 0.5;
        img.set(i, (0.79 - age * 0.06) * k, (0.70 - age * 0.09) * k, (0.40 - age * 0.1) * k);
        img.h[i] = 0.5 + print * 1.2 - seam * 0.6 + lip * 0.18 + bub * 0.35 + peel * 0.5 + (w - 0.5) * 0.05 + (fine[i] - 0.5) * 0.1 + (paper[i] - 0.5) * 0.12;
        img.r[i] = 0.84 + (mid[i] - 0.5) * 0.12 - print * 0.35 - bub * 0.1;
      }
    }
    img.normalStrength = 1.8; img.aoStrength = 1.2;
    return img;
  };
  R.carpet = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 3, 4, s), damp = field(n, 5, 5, s + 3), mid = field(n, 24, 2, s + 4);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const f = h32(x, y, s), f2 = h32(x >> 1, y >> 1, s + 9), f3 = h32((x + (y & 1)) >> 2, y >> 1, s + 7);
      const dm = sm(0.56, 0.78, damp[i]);
      const shade = 0.84 + f * 0.16 + f2 * 0.08 + (low[i] - 0.5) * 0.22 + (mid[i] - 0.5) * 0.08;
      const k = shade * (1 - dm * 0.38);
      img.set(i, 0.57 * k * (1 - dm * 0.05), 0.48 * k, 0.28 * k * (1 - dm * 0.15));
      img.h[i] = f * 0.55 + f2 * 0.3 + f3 * 0.25 - dm * 0.1;
      img.r[i] = 0.96 - dm * 0.3;
    }
    img.normalStrength = 2.4; img.aoStrength = 0.7;
    return img;
  };
  R.ceiling = (n, s) => {
    const img = new FImg(n);
    const fis = field(n, 40, 2, s), stain = field(n, 6, 4, s + 1), low = field(n, 4, 3, s + 2);
    const g = 0.012;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n, v = y / n;
      const gu = fr(u * 2), gv = fr(v * 2);
      const dg = Math.min(Math.min(gu, 1 - gu), Math.min(gv, 1 - gv));
      const grid = 1 - sm(g * 0.7, g, dg);
      const bevel = sm(g, g * 3, dg);
      const tileId = (Math.floor(u * 2) + Math.floor(v * 2) * 2);
      const tr = h32(tileId, 7, s);
      const fissure = sm(0.66, 0.71, fis[i]) * (1 - grid);
      const pin = h32(x, y, s) < 0.004 ? 1 : 0;
      const st = sm(0.6, 0.8, stain[i]) * (tr > 0.55 ? 1 : 0.15) * (1 - grid);
      const k = (1 + (tr - 0.5) * 0.06 + (low[i] - 0.5) * 0.08) * (1 - fissure * 0.35 - pin * 0.5);
      if (grid > 0.5) img.set(i, 0.9, 0.89, 0.85);
      else img.set(i, (0.84 - st * 0.12) * k, (0.815 - st * 0.2) * k, (0.73 - st * 0.3) * k);
      img.h[i] = grid * 1 + (1 - grid) * (0.4 + bevel * 0.2) - fissure * 0.25 - pin * 0.3;
      img.r[i] = grid > 0.5 ? 0.45 : 0.92;
      if (grid > 0.5) { (img.m || (img.m = new Float32Array(n * n)))[i] = 0.6; }
    }
    img.normalStrength = 1.3;
    return img;
  };
  R.concreteWall = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 4, s), mid = field(n, 8, 4, s + 1), hi = field(n, 64, 2, s + 2), rust = field(n, 16, 3, s + 3);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n, v = y / n;
      const hx = fr(u * 2) - 0.5, hy = fr(v * 2) - 0.5;
      const hole = 1 - sm(0.014, 0.022, Math.hypot(hx, hy));
      const streak = (1 - sm(0.004, 0.012, Math.abs(hx))) * (hy > 0 ? 1 - sm(0, 0.3, hy) : 0) * sm(0.35, 0.6, rust[i]);
      const seam = 1 - sm(0, 0.004, Math.abs(fr(v * 2) - 0.5) < 0.5 ? Math.min(fr(v * 2 + 0.5), 1 - fr(v * 2 + 0.5)) : 1);
      const pore = h32(x, y, s) < 0.012 ? 1 : 0;
      const k = 1 + (low[i] - 0.5) * 0.2 + (mid[i] - 0.5) * 0.14 + (hi[i] - 0.5) * 0.1 - pore * 0.2 - hole * 0.5 - seam * 0.15;
      img.set(i, 0.5 * k + streak * 0.12, 0.5 * k + streak * 0.03, 0.49 * k - streak * 0.04);
      img.h[i] = 0.5 + (mid[i] - 0.5) * 0.4 + (hi[i] - 0.5) * 0.3 - pore * 0.3 - hole * 0.8 - seam * 0.3;
      img.r[i] = 0.86 + (hi[i] - 0.5) * 0.1;
    }
    img.normalStrength = 1.5;
    return img;
  };
  R.concreteFloor = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 4, s), mid = field(n, 6, 4, s + 1), crack = field(n, 5, 5, s + 2), swirl = field(n, 12, 3, s + 3);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const c = (1 - sm(0.004, 0.012, Math.abs(crack[i] - 0.5))) * sm(0.45, 0.7, mid[i]);
      const k = 1 + (low[i] - 0.5) * 0.24 + (swirl[i] - 0.5) * 0.08 + (h32(x, y, s) - 0.5) * 0.04 - c * 0.35;
      img.set(i, 0.45 * k, 0.45 * k, 0.44 * k);
      img.h[i] = 0.5 + (swirl[i] - 0.5) * 0.12 - c * 0.6;
      img.r[i] = 0.55 + (low[i] - 0.5) * 0.3 + c * 0.3;
    }
    img.normalStrength = 1.2;
    return img;
  };
  R.tile = (n, s) => {
    const img = new FImg(n);
    const grime = field(n, 16, 3, s), low = field(n, 3, 3, s + 1);
    const tiles = 8, gw = 0.055;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n * tiles, v = y / n * tiles;
      const tx = Math.floor(u), ty = Math.floor(v), fu = u - tx, fv = v - ty;
      const d = Math.min(Math.min(fu, 1 - fu), Math.min(fv, 1 - fv));
      const grout = 1 - sm(gw * 0.5, gw, d);
      const bevel = sm(gw, gw * 2.4, d);
      const tr = h32(tx, ty, s), blue = h32(tx, ty, s + 5) > 0.93 ? 1 : 0;
      if (grout > 0.5) {
        const g = 0.6 - sm(0.4, 0.8, grime[i]) * 0.22;
        img.set(i, g, g + 0.02, g);
        img.r[i] = 0.9;
      } else {
        const k = 0.95 + tr * 0.06 + (low[i] - 0.5) * 0.04;
        img.set(i, (0.9 - blue * 0.5) * k, (0.93 - blue * 0.2) * k, 0.94 * k);
        img.r[i] = 0.08 + tr * 0.06;
      }
      img.h[i] = grout > 0.5 ? 0.1 : 0.6 + bevel * 0.35;
    }
    img.normalStrength = 1.5; img.aoStrength = 1.2;
    return img;
  };
  R.drywall = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 3, 4, s), peel = field(n, 64, 2, s + 1);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const k = 1 + (low[i] - 0.5) * 0.08 + (peel[i] - 0.5) * 0.05 + (h32(x, y, s) - 0.5) * 0.02;
      img.set(i, 0.8 * k, 0.79 * k, 0.75 * k);
      img.h[i] = 0.5 + (peel[i] - 0.5) * 0.35;
      img.r[i] = 0.78;
    }
    img.normalStrength = 0.8;
    return img;
  };
  R.officeCarpet = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 3, 3, s);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n * 4, v = y / n * 4;
      const cx = Math.floor(u), cy = Math.floor(v), dir = (cx + cy) & 1;
      const line = Math.sin((dir ? u : v) * Math.PI * 48) * 0.5 + 0.5;
      const edge = Math.min(Math.min(u - cx, cx + 1 - u), Math.min(v - cy, cy + 1 - v));
      const seam = 1 - sm(0, 0.02, edge);
      const f = h32(x, y, s);
      const k = (0.85 + f * 0.2 + line * 0.08 + (low[i] - 0.5) * 0.12) * (1 - seam * 0.2);
      img.set(i, 0.3 * k, 0.33 * k, 0.4 * k);
      img.h[i] = f * 0.5 + line * 0.4;
      img.r[i] = 0.97;
    }
    img.normalStrength = 2;
    return img;
  };
  R.fabric = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 3, s);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const a = Math.sin(x / n * Math.PI * 160), b = Math.sin(y / n * Math.PI * 160);
      const weave = (a * b) * 0.5 + 0.5;
      const k = 0.85 + weave * 0.18 + (low[i] - 0.5) * 0.1 + (h32(x, y, s) - 0.5) * 0.05;
      img.set(i, 0.36 * k, 0.4 * k, 0.47 * k);
      img.h[i] = weave;
      img.r[i] = 1;
    }
    img.normalStrength = 1.2;
    return img;
  };
  R.metal = (n, s) => {
    const img = new FImg(n);
    img.m = new Float32Array(n * n);
    const low = field(n, 3, 3, s), scratch = field(n, 32, 2, s + 1);
    for (let y = 0; y < n; y++) {
      const line = h32(0, y, s);
      for (let x = 0; x < n; x++) {
        const i = y * n + x;
        const brush = (h32(x >> 5, y, s + 3) - 0.5) * 0.06 + (line - 0.5) * 0.05;
        const sc = sm(0.72, 0.76, scratch[i]);
        const k = 1 + brush + (low[i] - 0.5) * 0.12 + sc * 0.15;
        img.set(i, 0.56 * k, 0.57 * k, 0.6 * k);
        img.h[i] = 0.5 + brush * 2 - sc * 0.2;
        img.r[i] = 0.38 + (low[i] - 0.5) * 0.2 - sc * 0.1;
        img.m[i] = 1;
      }
    }
    img.normalStrength = 0.6;
    return img;
  };
  // Wood: growth rings stretched along the grain with dark latewood bands, fine fibre streaks and pores,
  // and a slow tone drift across the board
  R.wood = (n, s) => {
    // Flat-sawn board, grain along u. UVs are in meters, so one tile is a meter of board:
    // ~34 growth rings, each a pale earlywood band ending in a thin dark latewood line; the saw plane
    // crossing the rings at a shallow angle bends them into long nested arches ("cathedrals").
    const img = new FImg(n);
    const warp = field(n, 2, 3, s), jit = field(n, 24, 2, s + 1), tone = field(n, 2, 2, s + 2), streak = field(n, 3, 2, s + 4), knot = field(n, 4, 2, s + 5);
    const fib = (x, y) => { const X = x / 24, xi = Math.floor(X), t = X - xi; const a = h32(xi, y, s + 9), b = h32(xi + 1, y, s + 9); return a + (b - a) * (t * t * (3 - 2 * t)); };
    const ph = h32(3, 1, s), ph2 = h32(5, 2, s);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n, v = y / n;
      // cathedral arches: nested, round-tipped peaks that open up into straight grain, once per tile
      const sa = Math.sin((u + ph + (tone[i] - 0.5) * 0.25) * 3.1416), arch = Math.sqrt(sa * sa + 0.03), arch2 = 0.5 - 0.5 * Math.cos((u * 2 + ph2) * 6.2832);
      const rc = v * 34 + (warp[i] - 0.5) * 2.2 - arch * 4.5 + arch2 * 0.8 + (jit[i] - 0.5) * 0.3 + sm(0.8, 1, knot[i]) * 3;
      // every ring is different: wide and narrow years, strong and faint latewood (mod 34 keeps it tiling)
      const ri = ((Math.floor(rc) % 34) + 34) % 34, rw = h32(ri, 7, s), rs = 0.35 + 0.65 * h32(ri, 8, s);
      const ring = rc - Math.floor(rc), lo = 0.5 + rw * 0.3;
      const late = sm(lo, lo + 0.22, ring) * (1 - sm(0.9, 0.99, ring)) * rs;
      const fibre = fib(x, y) * 0.6 + fib(x * 3.1, y * 2 + 7) * 0.4;
      const pore = h32(x >> 2, y, s + 3) > 0.988 ? 1 - late : 0;
      const k = (1 + (tone[i] - 0.5) * 0.24 + (streak[i] - 0.5) * 0.1) * (0.95 + fibre * 0.1) * (1 - pore * 0.18);
      const e = 1 - late * 0.7;
      img.set(i, (0.33 + 0.23 * e) * k, (0.21 + 0.19 * e) * k, (0.13 + 0.13 * e) * k);
      img.h[i] = 0.5 - late * 0.06 + fibre * 0.05 - pore * 0.15;
      img.r[i] = 0.5 + late * 0.06 + pore * 0.15;
    }
    img.normalStrength = 0.4;
    return img;
  };
  // Floor planks: staggered joints, per-board tone, grain, dark gaps and a worn walking path
  R.planks = (n, s) => {
    const img = new FImg(n);
    const warp = field(n, 6, 3, s), wear = field(n, 2, 3, s + 3), dirt = field(n, 24, 2, s + 4);
    const rows = 8;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n * rows, row = Math.floor(v), fv = v - row;
      const off = h32(row, 7, s) * 0.8, u = fr(x / n * 2 + off), board = Math.floor((x / n * 2 + off)) + row * 13;
      const tone = 0.8 + h32(board, row, s) * 0.35;
      const g = Math.sin((fv * 3 + warp[i] * 5 + h32(board, 1, s) * 10) * Math.PI * 2) * 0.5 + 0.5;
      const gap = 1 - sm(0, 0.035, Math.min(fv, 1 - fv)), joint = 1 - sm(0, 0.006, Math.min(u, 1 - u));
      const worn = sm(0.45, 0.75, wear[i]) * 0.25;
      const k = tone * (0.82 + g * 0.2 + (dirt[i] - 0.5) * 0.08) * (1 - Math.max(gap, joint) * 0.75) * (1 + worn * 0.3);
      img.set(i, 0.46 * k, 0.3 * k, 0.18 * k);
      img.h[i] = 0.55 + g * 0.1 - Math.max(gap, joint) * 0.5;
      img.r[i] = 0.45 + g * 0.1 + worn * 0.25 + Math.max(gap, joint) * 0.3;
    }
    img.normalStrength = 1.2;
    return img;
  };
  // Small hexagonal bathroom floor tiles with a few black ones and dirty grout
  R.hexTile = (n, s) => {
    const img = new FImg(n);
    const grime = field(n, 12, 3, s);
    const R6 = 8;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      let px = x / n * R6 * 1.7320508, py = y / n * R6 * 3;
      const r1 = [Math.round(px / 1.7320508) * 1.7320508, Math.round(py / 3) * 3];
      const r2 = [Math.round((px - 0.8660254) / 1.7320508) * 1.7320508 + 0.8660254, Math.round((py - 1.5) / 3) * 3 + 1.5];
      const d1 = Math.hypot(px - r1[0], py - r1[1]), d2 = Math.hypot(px - r2[0], py - r2[1]);
      const c = d1 < d2 ? r1 : r2, dx = Math.abs(px - c[0]), dy = Math.abs(py - c[1]);
      const hexD = Math.max(dx * 0.8660254 + dy * 0.5, dy);
      const edge = 1 - sm(0.8, 0.9, hexD);
      const id = h32(Math.round(c[0] * 10), Math.round(c[1] * 10), s);
      const black = id > 0.9 ? 1 : 0;
      if (edge < 0.5) { const g = 0.5 - sm(0.4, 0.8, grime[i]) * 0.25; img.set(i, g, g * 0.98, g * 0.92); img.r[i] = 0.9; img.h[i] = 0.1; }
      else { const k = 0.92 + id * 0.08 - (grime[i] - 0.5) * 0.08; const b = black ? 0.12 : 0.9; img.set(i, b * k, b * k, (b - 0.03) * k); img.r[i] = 0.12 + id * 0.05; img.h[i] = 0.6 + (1 - sm(0.6, 0.85, hexD)) * 0.3; }
    }
    img.normalStrength = 1.6; img.aoStrength = 1.2;
    return img;
  };
  // Pale green subway tiles for bathroom walls
  R.subway = (n, s) => {
    const img = new FImg(n);
    const grime = field(n, 10, 3, s), low = field(n, 3, 3, s + 1);
    const cols = 4, rows = 8, gw = 0.03;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n * rows, row = Math.floor(v), fv = v - row;
      const u = x / n * cols + (row % 2) * 0.5, col = Math.floor(u), fu = u - col;
      const d = Math.min(Math.min(fu, 1 - fu) * 2, Math.min(fv, 1 - fv));
      const grout = d < gw ? 1 : 0, bevel = sm(gw, gw * 3, d);
      const tr = h32(col + row * 31, row, s);
      if (grout) { const g = 0.62 - sm(0.4, 0.8, grime[i]) * 0.25; img.set(i, g, g, g * 0.95); img.r[i] = 0.9; img.h[i] = 0.1; }
      else { const k = 0.94 + tr * 0.06 + (low[i] - 0.5) * 0.05; img.set(i, 0.8 * k, 0.88 * k, 0.8 * k); img.r[i] = 0.06 + tr * 0.05; img.h[i] = 0.6 + bevel * 0.35; }
    }
    img.normalStrength = 1.4;
    return img;
  };
  // Worn checkered vinyl floor tiles
  R.linoleum = (n, s) => {
    const img = new FImg(n);
    const wear = field(n, 3, 3, s), dirt = field(n, 20, 2, s + 2);
    const t = 4;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n * t, v = y / n * t, tx = Math.floor(u), ty = Math.floor(v);
      const fu = u - tx, fv = v - ty, seam = 1 - sm(0, 0.012, Math.min(Math.min(fu, 1 - fu), Math.min(fv, 1 - fv)));
      const dark = (tx + ty) % 2;
      const k = (0.92 + h32(tx, ty, s) * 0.08) * (1 - seam * 0.3) * (1 - (dirt[i] - 0.5) * 0.12);
      const worn = sm(0.5, 0.8, wear[i]);
      img.set(i, (dark ? 0.42 : 0.82) * k, (dark ? 0.3 : 0.76) * k, (dark ? 0.2 : 0.62) * k);
      img.h[i] = 0.5 - seam * 0.3;
      img.r[i] = 0.35 + worn * 0.35 + seam * 0.2;
    }
    img.normalStrength = 0.8;
    return img;
  };
  // Old red brick with mortar, soot and efflorescence (storm tunnels)
  R.brick = (n, s) => {
    const img = new FImg(n);
    const grime = field(n, 6, 4, s), stain = field(n, 2, 3, s + 1);
    const rows = 16, cols = 4;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n * rows, row = Math.floor(v), fv = v - row;
      const u = x / n * cols + (row % 2) * 0.5, col = Math.floor(u), fu = u - col;
      const mortar = Math.min(fv, 1 - fv) < 0.08 || Math.min(fu, 1 - fu) < 0.03;
      const t = h32(col + row * 57, row, s), wet = sm(0.55, 0.8, 1 - stain[i]);
      if (mortar) { const g = 0.42 - grime[i] * 0.15; img.set(i, g, g * 0.97, g * 0.9); img.h[i] = 0.15; img.r[i] = 0.95; }
      else {
        const k = (0.75 + t * 0.35) * (0.85 + grime[i] * 0.25) * (1 - wet * 0.35);
        const salt = sm(0.72, 0.9, grime[i]) * 0.25;
        img.set(i, 0.46 * k + salt, 0.2 * k + salt, 0.14 * k + salt);
        img.h[i] = 0.6 + (h32(x >> 2, y >> 2, s) - 0.5) * 0.15; img.r[i] = 0.8 - wet * 0.45;
      }
    }
    img.normalStrength = 2; img.aoStrength = 1.4;
    return img;
  };
  // Painted cinder blocks (school, workshop)
  R.cinderblock = (n, s) => {
    const img = new FImg(n);
    const grime = field(n, 5, 3, s), pores = field(n, 64, 2, s + 2);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n * 4, row = Math.floor(v), fv = v - row;
      const u = x / n * 2 + (row % 2) * 0.5, fu = u - Math.floor(u);
      const joint = Math.min(fv, 1 - fv) < 0.03 || Math.min(fu, 1 - fu) < 0.015;
      const k = 0.9 + (pores[i] - 0.5) * 0.1 - sm(0.6, 0.9, grime[i]) * 0.15;
      img.set(i, 0.86 * k, 0.84 * k, 0.74 * k);
      img.h[i] = joint ? 0.35 : 0.55 + (pores[i] - 0.5) * 0.25; img.r[i] = 0.55;
    }
    img.normalStrength = 1.5;
    return img;
  };
  // Speckled vinyl composition tile (hospital, school halls)
  R.vinyl = (n, s) => {
    const img = new FImg(n);
    const wear = field(n, 3, 3, s);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n * 4, v = y / n * 4, fu = u - Math.floor(u), fv = v - Math.floor(v);
      const seam = Math.min(Math.min(fu, 1 - fu), Math.min(fv, 1 - fv)) < 0.008;
      const tone = h32(Math.floor(u), Math.floor(v), s) * 0.06;
      const sp = h32(x, y, s + 9); const chip = sp > 0.94 ? -0.25 : sp < 0.04 ? 0.08 : 0;
      const k = 0.82 + tone + chip - (seam ? 0.2 : 0);
      img.set(i, 0.8 * k, 0.8 * k, 0.76 * k);
      img.h[i] = seam ? 0.3 : 0.55; img.r[i] = 0.3 + sm(0.4, 0.8, wear[i]) * 0.35;
    }
    img.normalStrength = 0.8;
    return img;
  };
  // Pale green hospital paint with a darker lower band
  R.hospitalWall = (n, s) => {
    const img = new FImg(n);
    const grime = field(n, 6, 3, s), fine = field(n, 48, 2, s + 1);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n;
      const k = 0.94 + (fine[i] - 0.5) * 0.05 - sm(0.65, 0.9, grime[i]) * 0.12;
      img.set(i, 0.66 * k, 0.78 * k, 0.7 * k);
      img.h[i] = 0.5 + (fine[i] - 0.5) * 0.1; img.r[i] = 0.5; void v;
    }
    return img;
  };
  // Motel wallpaper: brown damask-like stripes, water stains
  R.motelWallpaper = (n, s) => {
    const img = new FImg(n);
    const stain = field(n, 3, 3, s), fine = field(n, 40, 2, s + 1);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n * 6, fu = u - Math.floor(u), v = y / n * 6;
      const stripe = fu < 0.1 ? 1 : 0;
      const motif = Math.abs(Math.sin((fu - 0.55) * 7 + Math.sin(v * 6.28) * 0.8)) < 0.18 && fu > 0.2 ? 1 : 0;
      const k = (0.9 + (fine[i] - 0.5) * 0.08) * (1 - sm(0.6, 0.85, stain[i]) * 0.25);
      img.set(i, (0.55 - stripe * 0.12 + motif * 0.08) * k, (0.4 - stripe * 0.1 + motif * 0.06) * k, (0.24 - stripe * 0.06 + motif * 0.02) * k);
      img.h[i] = 0.5 + motif * 0.08; img.r[i] = 0.8;
    }
    return img;
  };
  // 1970s motel carpet: orange/brown geometric pattern
  R.motelCarpet = (n, s) => {
    const img = new FImg(n);
    const dirt = field(n, 4, 3, s), fiber = field(n, 128, 1, s + 1);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n * 4, v = y / n * 4, fu = u - Math.floor(u), fv = v - Math.floor(v);
      const d = Math.abs(fu - 0.5) + Math.abs(fv - 0.5);
      const ring = Math.abs(Math.sin(d * 18)) > 0.6 ? 1 : 0;
      const k = (0.85 + (fiber[i] - 0.5) * 0.25) * (1 - sm(0.55, 0.85, dirt[i]) * 0.3);
      img.set(i, (ring ? 0.62 : 0.32) * k, (ring ? 0.3 : 0.18) * k, (ring ? 0.1 : 0.08) * k);
      img.h[i] = 0.5 + (fiber[i] - 0.5) * 0.3; img.r[i] = 0.98;
    }
    img.normalStrength = 1.2;
    return img;
  };
  // Polished terrazzo (mall)
  R.terrazzo = (n, s) => {
    const img = new FImg(n);
    const base = field(n, 8, 2, s);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const c = h32(x >> 1, y >> 1, s), c2 = h32(x >> 2, y >> 2, s + 3);
      let r = 0.78, g = 0.76, b = 0.72;
      if (c > 0.93) { r = 0.45; g = 0.42; b = 0.4; } else if (c < 0.05) { r = 0.9; g = 0.6; b = 0.5; } else if (c2 > 0.96) { r = 0.3; g = 0.4; b = 0.35; }
      const k = 0.95 + (base[i] - 0.5) * 0.1;
      const u = x / n * 2, v = y / n * 2, strip = Math.min(u - Math.floor(u), v - Math.floor(v)) < 0.006;
      img.set(i, strip ? 0.6 : r * k, strip ? 0.55 : g * k, strip ? 0.4 : b * k);
      img.h[i] = 0.5; img.r[i] = strip ? 0.3 : 0.12;
    }
    img.normalStrength = 0.4;
    return img;
  };
  // Clapboard siding (houses)
  R.siding = (n, s) => {
    const img = new FImg(n);
    const grime = field(n, 4, 3, s), fine = field(n, 64, 2, s + 1);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n * 12, fv = v - Math.floor(v);
      const lap = 1 - fv;
      const k = (0.85 + lap * 0.15 + (fine[i] - 0.5) * 0.05) * (1 - sm(0.6, 0.9, grime[i]) * 0.3);
      img.set(i, 0.78 * k, 0.8 * k, 0.76 * k);
      img.h[i] = lap * 0.6; img.r[i] = 0.6;
    }
    img.normalStrength = 2.2;
    return img;
  };
  R.grass = (n, s) => {
    const img = new FImg(n);
    const patch = field(n, 4, 3, s), blades = field(n, 96, 2, s + 1);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, b = h32(x, y >> 1, s);
      const mud = sm(0.62, 0.8, patch[i]);
      const k = 0.6 + blades[i] * 0.5 + (b - 0.5) * 0.2;
      img.set(i, U.lerp(0.14, 0.3, mud) * k, U.lerp(0.26, 0.22, mud) * k, U.lerp(0.08, 0.14, mud) * k);
      img.h[i] = blades[i] * 0.7 + b * 0.3; img.r[i] = 0.85 - mud * 0.4;
    }
    img.normalStrength = 1.8;
    return img;
  };
  R.asphalt = (n, s) => {
    const img = new FImg(n);
    const patch = field(n, 3, 3, s), fine = field(n, 96, 1, s + 2);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, a = h32(x, y, s);
      const k = 0.18 + a * 0.12 + (fine[i] - 0.5) * 0.08 - sm(0.6, 0.8, patch[i]) * 0.05;
      img.set(i, k, k, k * 1.03);
      img.h[i] = a * 0.6 + fine[i] * 0.4; img.r[i] = 0.7 + a * 0.2;
    }
    img.normalStrength = 1.6;
    return img;
  };
  R.shingles = (n, s) => {
    const img = new FImg(n);
    const grime = field(n, 4, 3, s);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n * 10, row = Math.floor(v), fv = v - row;
      const u = x / n * 6 + (row % 2) * 0.5, col = Math.floor(u), fu = u - col;
      const edge = fv > 0.9 || Math.min(fu, 1 - fu) < 0.02;
      const k = (0.6 + h32(col, row, s) * 0.35) * (1 - sm(0.6, 0.85, grime[i]) * 0.3);
      img.set(i, 0.22 * k, 0.2 * k, 0.2 * k);
      img.h[i] = edge ? 0.2 : 0.4 + fv * 0.4; img.r[i] = 0.75;
    }
    img.normalStrength = 2;
    return img;
  };
  R.arcadeWall = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 4, 4, s), sponge = field(n, 32, 3, s + 1);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const k = 1 + (low[i] - 0.5) * 0.25 + (sponge[i] - 0.5) * 0.18;
      img.set(i, 0.13 * k, 0.07 * k, 0.17 * k);
      img.h[i] = sponge[i];
      img.r[i] = 0.7;
    }
    return img;
  };
  R.mazeWall = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 3, 3, s);
    img.e = new Float32Array(n * n * 3);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n;
      const scan = (Math.sin(v * Math.PI * 180) * 0.5 + 0.5);
      const k = 1 + (low[i] - 0.5) * 0.3;
      img.set(i, 0.02 * k, 0.02 * k, 0.07 * k);
      img.h[i] = scan * 0.2;
      img.r[i] = 0.22 + (low[i] - 0.5) * 0.1;
      const glow = scan * 0.02;
      img.e[i * 3] = glow * 0.3; img.e[i * 3 + 1] = glow * 0.3; img.e[i * 3 + 2] = glow;
    }
    return img;
  };
  R.mazeFloor = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 3, 3, s);
    img.e = new Float32Array(n * n * 3);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n * 3, v = y / n * 3;
      const d = Math.min(Math.min(fr(u), 1 - fr(u)), Math.min(fr(v), 1 - fr(v)));
      const line = 1 - sm(0.004, 0.012, d);
      const k = 1 + (low[i] - 0.5) * 0.4;
      img.set(i, 0.012 * k, 0.012 * k, 0.03 * k);
      img.h[i] = 0.5 - line * 0.3;
      img.r[i] = 0.18 + (low[i] - 0.5) * 0.15;
      img.e[i * 3] = line * 0.05; img.e[i * 3 + 1] = line * 0.06; img.e[i * 3 + 2] = line * 0.25;
    }
    return img;
  };
  // Siyah ışıkta parlayan klasik atari salonu halısı (tuval ile çizilir)
  // 80s "cosmic" arcade carpet: printed planets, rings, stars, squiggles and confetti on a deep
  // indigo cut pile. The print sits in the fibres (broken up, slightly bled), the pile has tufts,
  // and the walking lanes are matted and dull. The UV-reactive inks glow faintly.
  R.arcadeCarpet = (n, s) => {
    const c = document.createElement('canvas'); c.width = c.height = n;
    const g = c.getContext('2d');
    g.fillStyle = '#000'; g.fillRect(0, 0, n, n);
    const r = U.rng(s);
    const cols = ['#ff2bb4', '#22e0ff', '#ffe02b', '#7dff2b', '#ff8a2b', '#9b6bff', '#ff4050'];
    const S0 = n / 1024;
    const shapes = [];
    // big motifs first (planets with rings), then stars and squiggles, then confetti on top
    for (let k = 0; k < 22; k++) shapes.push({ t: 0, x: r() * n, y: r() * n, s: r.range(30, 55) * S0, c: r.pick(cols), c2: r.pick(cols), a: r() * 6.28 });
    for (let k = 0; k < 60; k++) shapes.push({ t: 1 + r.int(0, 3), x: r() * n, y: r() * n, s: r.range(14, 30) * S0, c: r.pick(cols), c2: r.pick(cols), a: r() * 6.28 });
    for (let k = 0; k < 260; k++) shapes.push({ t: 5, x: r() * n, y: r() * n, s: r.range(3, 7) * S0, c: r.pick(cols), a: r() * 6.28 });
    const draw = (sh, ox, oy) => {
      g.save(); g.translate(sh.x + ox, sh.y + oy); g.rotate(sh.a);
      g.fillStyle = sh.c; g.strokeStyle = sh.c; g.lineCap = 'round'; g.lineJoin = 'round';
      const z = sh.s;
      switch (sh.t) {
        case 0: { // planet: filled disc with a darker band, and a tilted ring in the second colour
          g.beginPath(); g.arc(0, 0, z, 0, 6.28); g.fill();
          g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.arc(z * 0.25, z * 0.2, z * 0.8, 0, 6.28); g.fill();
          g.strokeStyle = sh.c2; g.lineWidth = z * 0.16; g.beginPath(); g.ellipse(0, 0, z * 1.7, z * 0.45, 0.35, 0, 6.28); g.stroke();
          break;
        }
        case 1: { // four-point star
          g.beginPath(); for (let q = 0; q < 8; q++) { const rr = q & 1 ? z * 0.28 : z; g.lineTo(Math.cos(q * 0.785) * rr, Math.sin(q * 0.785) * rr); } g.closePath(); g.fill(); break;
        }
        case 2: { // thick squiggle
          g.lineWidth = z * 0.28; g.beginPath(); for (let q = 0; q <= 7; q++) g.lineTo(-z * 1.6 + q * z * 0.46, (q & 1) ? -z * 0.45 : z * 0.45); g.stroke(); break;
        }
        case 3: { // triangle outline with a filled centre dot in the other colour
          g.lineWidth = z * 0.2; g.beginPath(); g.moveTo(-z, z * 0.7); g.lineTo(0, -z); g.lineTo(z, z * 0.7); g.closePath(); g.stroke();
          g.fillStyle = sh.c2; g.beginPath(); g.arc(0, z * 0.1, z * 0.22, 0, 6.28); g.fill(); break;
        }
        case 4: { // comet: a disc with a tapering tail
          g.beginPath(); g.arc(0, 0, z * 0.45, 0, 6.28); g.fill();
          g.beginPath(); g.moveTo(0, -z * 0.35); g.quadraticCurveTo(-z * 1.2, -z * 0.1, -z * 2, z * 0.05); g.quadraticCurveTo(-z * 1.2, z * 0.2, 0, z * 0.35); g.fill(); break;
        }
        default: g.beginPath(); g.arc(0, 0, z, 0, 6.28); g.fill();
      }
      g.restore();
    };
    for (const sh of shapes) for (const ox of [-n, 0, n]) for (const oy of [-n, 0, n]) draw(sh, ox, oy);
    const data = g.getImageData(0, 0, n, n).data;
    const wear = field(n, 2, 3, s + 11), mott = field(n, 9, 3, s + 12), tuft = field(n, 64, 2, s + 13);
    const img = new FImg(n);
    img.e = new Float32Array(n * n * 3);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      // print bleeds a little along the fibres and breaks up where a tuft leans away
      const j = ((y + (h32(x, y, s + 5) < 0.5 ? 0 : 1)) % n) * n + x;
      let pr = data[j * 4] / 255, pg = data[j * 4 + 1] / 255, pb = data[j * 4 + 2] / 255;
      const f = h32(x, y, s), f2 = h32(x >> 1, y >> 1, s + 9);
      const drop = f < 0.12 ? 0.35 : 1;
      const w = sm(0.52, 0.8, wear[i]);             // matted, dirty walking lanes
      const pile = 0.72 + f * 0.2 + f2 * 0.12 + (tuft[i] - 0.5) * 0.25;
      const ink = Math.max(pr, pg, pb);
      const fade = (1 - w * 0.45) * drop * pile;
      const base = [0.028, 0.02, 0.07].map(v => v * pile * (0.85 + (mott[i] - 0.5) * 0.4) * (1 - w * 0.3));
      const R_ = base[0] + pr * 0.58 * fade, G_ = base[1] + pg * 0.58 * fade, B_ = base[2] + pb * 0.58 * fade;
      img.set(i, R_ + w * 0.012, G_ + w * 0.01, B_ + w * 0.004);
      const uv = ink > 0.25 ? 0.11 * drop * (1 - w * 0.6) : 0;
      img.e[i * 3] = pr * uv; img.e[i * 3 + 1] = pg * uv; img.e[i * 3 + 2] = pb * uv;
      img.h[i] = f * 0.45 + f2 * 0.3 + tuft[i] * 0.35 - w * 0.2 + ink * 0.04;
      img.r[i] = 0.97 - w * 0.12;
    }
    img.normalStrength = 1.6; img.aoStrength = 0.8;
    return img;
  };

  // Her dokunun dünyadaki tekrar boyu (metre)
  T.SCALE = { brick: 2.4, cinderblock: 1.6, vinyl: 1.2, hospitalWall: 2, motelWallpaper: 1.6, motelCarpet: 2.4, terrazzo: 2.4, siding: 2.4, grass: 2, asphalt: 3, shingles: 2, planks: 2.4, hexTile: 0.7, subway: 0.9, linoleum: 1.2, wallpaper: 2.12, carpet: 2, ceiling: 1.2, concreteWall: 3, concreteFloor: 3, tile: 1.2, drywall: 2, officeCarpet: 2, fabric: 1, metal: 1.2, wood: 1.2, arcadeWall: 2, mazeWall: 3, mazeFloor: 3, arcadeCarpet: 1.8 };

  T.init = function (renderer, aniso) {
    T.maxAniso = renderer.capabilities.getMaxAnisotropy();
    T.aniso = Math.min(aniso || 4, T.maxAniso);
  };
  // PBR seti: önbellekli. Seed isimden türetilir, böylece her yüklemede aynı görünür.
  T.get = function (name, res) {
    const key = name + '@' + res;
    if (T.cache.has(key)) return T.cache.get(key);
    const fn = R[name];
    if (!fn) throw new Error('Doku tarifi yok: ' + name);
    const set = finalize(fn(res, U.hashStr(name) % 100000));
    set.scale = T.SCALE[name] || 2;
    T.cache.set(key, set);
    return set;
  };
  T.names = () => Object.keys(R);
  // More recipes live in textures2.js
  T.R = R; T.lib = { FImg, field, h32, downUp };
  T.dispose = function () {
    for (const set of T.cache.values()) for (const k of ['map', 'normalMap', 'ormMap', 'emissiveMap']) if (set[k]) set[k].dispose();
    T.cache.clear();
    for (const t of T.canvasCache.values()) t.dispose();
    T.canvasCache.clear();
  };

  // ------------------------------------------------------------ TUVAL DOKULARI
  T.canvasCache = new Map();
  T.canvas = function (key, w, h, draw, opts = {}) {
    if (key && T.canvasCache.has(key)) return T.canvasCache.get(key);
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d', opts.readback ? { willReadFrequently: true } : undefined);
    draw(g, w, h);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = T.aniso;
    if (opts.repeat) tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    if (opts.nearest) { tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; }
    tex.userData.canvas = c;
    if (key) T.canvasCache.set(key, tex);
    return tex;
  };
  const FONT_PIX = '"Press Start 2P", ui-monospace, monospace';
  const FONT_TERM = '"VT323", ui-monospace, monospace';
  const FONT_HAND = '"Caveat", "Comic Sans MS", cursive';
  const FONT_TYPE = '"Courier Prime", "Courier New", monospace';
  T.FONTS = { FONT_PIX, FONT_TERM, FONT_HAND, FONT_TYPE };

  // Wraps and paints text: words stay whole, Chinese and Japanese break between characters, and
  // right-to-left writing (Arabic) is set from the right edge of the same box
  function wrapText(g, text, x, y, maxW, lh) {
    const F = PB.Fonts, lines = [];
    for (const para of String(text).split('\n')) {
      if (F) { lines.push(...F.lines(para, maxW, s => g.measureText(s).width)); continue; }
      let line = '';
      for (const word of para.split(' ')) {
        const test = line ? line + ' ' + word : word;
        if (g.measureText(test).width > maxW && line) { lines.push(line); line = word; } else line = test;
      }
      lines.push(line);
    }
    const rtl = F && F.isRTL(text) && (g.textAlign === 'left' || g.textAlign === 'start');
    if (rtl) { g.save(); g.direction = 'rtl'; g.textAlign = 'right'; }
    lines.forEach((l, k) => g.fillText(l, rtl ? x + maxW : x, y + k * lh));
    if (rtl) g.restore();
    return lines.length;
  }
  T.wrapText = wrapText;

  T.exitSign = (label = 'EXIT') => T.canvas('exit:' + label, 256, 96, (g, w, h) => {
    g.fillStyle = '#06260d'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#35ff6a'; g.font = `bold 56px ${FONT_TYPE}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.shadowColor = '#35ff6a'; g.shadowBlur = 12;
    g.fillText(label, w / 2 + 18, h / 2 + 3);
    // koşan adam
    g.lineWidth = 5; g.strokeStyle = '#35ff6a'; g.lineCap = 'round';
    g.beginPath(); g.arc(30, 24, 7, 0, 6.28); g.fill();
    g.beginPath(); g.moveTo(30, 33); g.lineTo(26, 56); g.lineTo(38, 74); g.moveTo(26, 56); g.lineTo(16, 74); g.moveTo(28, 40); g.lineTo(42, 48); g.moveTo(28, 40); g.lineTo(16, 46); g.stroke();
  });
  T.label = (key, text, o = {}) => T.canvas('label:' + key, o.w || 512, o.h || 128, (g, w, h) => {
    g.fillStyle = o.bg || '#1a1a1a'; g.fillRect(0, 0, w, h);
    if (o.border) { g.strokeStyle = o.border; g.lineWidth = 6; g.strokeRect(6, 6, w - 12, h - 12); }
    g.fillStyle = o.color || '#f2f2f2'; g.font = o.font || `bold ${Math.floor(h * 0.45)}px ${FONT_TYPE}`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    if (o.glow) { g.shadowColor = o.color; g.shadowBlur = 16; }
    g.fillText(text, w / 2, h / 2 + 2);
  });

  // Afişler: hayali atari oyunları ve ofis "motivasyon" afişleri
  const POSTERS = {
    poster1: { title: 'GALAXY 2000', sub: 'DEEP IN SPACE', bg: ['#07052a', '#3a0b5e'], fg: '#ffe23b', art: 'ship' },
    poster2: { title: 'FROG ROAD', sub: 'CAN YOU MAKE IT ACROSS?', bg: ['#0b3d0b', '#0c1c3a'], fg: '#8cff4a', art: 'frog' },
    poster3: { title: 'HUNGRY HOUSE', sub: 'HIGH SCORE 921,450 — DAN, 1987', bg: ['#1a0624', '#3d0f2a'], fg: '#ff8a1a', art: 'muncher' },
    poster4: { title: 'TOKENS 25¢', sub: 'BUY 10, GET 1 FREE', bg: ['#2a002a', '#000033'], fg: '#ff66dd', art: 'coin' },
    motive1: { title: 'TEAMWORK', sub: 'Nobody escapes alone.', bg: ['#1c2a3a', '#0c141c'], fg: '#e8eef5', art: 'mountain' },
    motive2: { title: 'GOALS', sub: 'The exit is always in the next hallway.', bg: ['#2c2418', '#120e08'], fg: '#f5e6c8', art: 'arrow' },
    motive3: { title: 'PATIENCE', sub: 'Shift ends at 3:17. It is always 3:17.', bg: ['#1a2a1a', '#0a120a'], fg: '#dfeedd', art: 'clock' },
    school1: { title: 'READ!', sub: 'Books take you anywhere. Library open until 4.', bg: ['#f2c230', '#e08a1a'], fg: '#1a1a40', art: 'book' },
    school2: { title: 'SPRING DANCE', sub: 'Friday April 24 — Gym — 7 PM. Tickets $2.', bg: ['#e05a9a', '#6a2a8a'], fg: '#fff4c8', art: 'note' },
    school3: { title: 'GO HORNETS!', sub: 'Basketball: Hornets 54, Valley 51', bg: ['#1a3a8a', '#0a1a4a'], fg: '#ffd21a', art: 'ball' },
    school4: { title: 'SCIENCE FAIR', sub: 'Room 112. Volcanoes welcome. No real lava.', bg: ['#2a8a5a', '#0a3a2a'], fg: '#f4fff0', art: 'star' },
    motelArt1: { title: '', sub: '', bg: ['#7a9ac0', '#e0c898'], fg: '#f4efe4', art: 'boat', frame: '#6a4a24' },
    motelArt2: { title: '', sub: '', bg: ['#9ab0c8', '#6a8a50'], fg: '#3a5a2a', art: 'hills', frame: '#6a4a24' },
    hosp1: { title: 'WASH YOUR HANDS', sub: 'Germs travel. Soap stops them.', bg: ['#e8f0f0', '#b8d0d0'], fg: '#1a4a5a', art: 'drop' },
    mall1: { title: 'HOLIDAY SALE', sub: 'Up to 40% off. Harlow Mall, open late.', bg: ['#b01a1a', '#5a0a0a'], fg: '#f8f0e0', art: 'star' },
  };
  T.poster = key => T.canvas('poster:' + key, 384, 512, (g, w, h) => {
    if (key === 'missing87') {
      // the flyer that went up on every pole in Harlow in April 1987, gone soft with rain
      const r = U.rng(87);
      g.fillStyle = '#ece6d4'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#111'; g.textAlign = 'center'; g.font = `bold 64px ${FONT_TYPE}`; g.fillText('MISSING', w / 2, 70);
      const kids = [['DANNY K., 16', '#3a4a6a', '#3a2a1a'], ['ROSIE A., 15', '#8a3a6a', '#4a2a1a'], ['NELL P., 15', '#2a6a6a', '#1a1210'], ['TOBY M., 13', '#c86a20', '#b04a18']];
      kids.forEach(([name, shirt, hair], k) => {
        const x = 30 + (k % 2) * 172, y = 96 + Math.floor(k / 2) * 178;
        g.fillStyle = '#8a8478'; g.fillRect(x, y, 150, 140);
        g.fillStyle = shirt; g.fillRect(x + 35, y + 95, 80, 45);
        g.fillStyle = '#c8b09a'; g.beginPath(); g.ellipse(x + 75, y + 70, 28, 34, 0, 0, 6.283); g.fill();
        g.fillStyle = hair; g.beginPath(); g.ellipse(x + 75, y + 52, 30, 22, 0, Math.PI, 0); g.fill();
        g.fillStyle = 'rgba(40,40,40,0.35)'; g.fillRect(x, y, 150, 140);
        g.fillStyle = '#111'; g.font = `bold 16px ${FONT_TYPE}`; g.fillText(name, x + 75, y + 160);
      });
      g.font = `15px ${FONT_TYPE}`; g.fillStyle = '#222'; g.fillText('LAST SEEN APRIL 16, 1987 — FRONT STREET', w / 2, h - 44); g.fillText('HARLOW P.D.', w / 2, h - 22);
      for (let k = 0; k < 14; k++) { g.fillStyle = 'rgba(90,70,40,0.18)'; g.fillRect(r() * w, r.range(0.2, 0.9) * h, r.range(3, 10), r.range(40, 180)); }
      for (let k = 0; k < 1500; k++) { g.fillStyle = `rgba(90,70,40,${r() * 0.07})`; g.fillRect(r() * w, r() * h, 2, 2); }
      return;
    }
    const p = POSTERS[key] || POSTERS.poster1;
    const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, p.bg[0]); grd.addColorStop(1, p.bg[1]);
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
    const r = U.rng(U.hashStr(key));
    g.fillStyle = 'rgba(255,255,255,0.8)';
    for (let k = 0; k < 60; k++) g.fillRect(r() * w, r() * h * 0.7, 2, 2);
    g.save(); g.translate(w / 2, h * 0.45);
    g.fillStyle = p.fg; g.strokeStyle = p.fg; g.lineWidth = 6;
    if (p.art === 'ship') { g.beginPath(); g.moveTo(0, -70); g.lineTo(50, 50); g.lineTo(0, 25); g.lineTo(-50, 50); g.closePath(); g.fill(); g.fillStyle = '#ff3b3b'; g.fillRect(-8, 50, 16, 30); }
    else if (p.art === 'frog') { g.beginPath(); g.arc(0, 0, 60, 0, 6.28); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(-25, -40, 16, 0, 6.28); g.arc(25, -40, 16, 0, 6.28); g.fill(); g.fillStyle = '#000'; g.beginPath(); g.arc(-25, -40, 7, 0, 6.28); g.arc(25, -40, 7, 0, 6.28); g.fill(); }
    else if (p.art === 'muncher') {
      // the Hungry House Muncher: round, horned, a toothy grin, chasing a row of stars
      g.fillStyle = '#5a1e0a'; for (const d of [-1, 1]) { g.beginPath(); g.moveTo(d * 28, -62); g.lineTo(d * 52, -104); g.lineTo(d * 58, -48); g.fill(); }
      g.fillStyle = p.fg; g.beginPath(); g.arc(-20, 0, 78, 0, 6.28); g.fill();
      g.fillStyle = '#2a0808'; g.beginPath(); g.ellipse(-14, 24, 54, 22, 0, 0, 6.28); g.fill();
      g.fillStyle = '#fff6e0'; for (let k = -2; k <= 2; k++) { g.beginPath(); g.moveTo(-14 + k * 20 - 7, 4); g.lineTo(-14 + k * 20 + 7, 4); g.lineTo(-14 + k * 20, 18); g.fill(); }
      for (const d of [-1, 1]) { g.fillStyle = '#fff'; g.beginPath(); g.ellipse(-20 + d * 26, -22, 15, 18, 0, 0, 6.28); g.fill(); g.fillStyle = '#120818'; g.beginPath(); g.arc(-14 + d * 26, -20, 7, 0, 6.28); g.fill(); }
      g.fillStyle = '#ffe7a0'; for (let k = 0; k < 3; k++) { const x = 100 + k * 36, y = 0; g.beginPath(); for (let j = 0; j < 10; j++) { const a = -Math.PI / 2 + j * Math.PI / 5, rr = j % 2 ? 5 : 12; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.fill(); }
    }
    else if (p.art === 'coin') { g.beginPath(); g.arc(0, 0, 75, 0, 6.28); g.stroke(); g.font = `bold 60px ${FONT_TYPE}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('¢', 0, 4); }
    else if (p.art === 'mountain') { g.beginPath(); g.moveTo(-140, 80); g.lineTo(-40, -60); g.lineTo(10, 0); g.lineTo(60, -80); g.lineTo(150, 80); g.closePath(); g.globalAlpha = 0.6; g.fill(); }
    else if (p.art === 'arrow') { g.beginPath(); g.moveTo(-90, 20); g.lineTo(30, 20); g.lineTo(30, 55); g.lineTo(100, 0); g.lineTo(30, -55); g.lineTo(30, -20); g.lineTo(-90, -20); g.closePath(); g.globalAlpha = 0.7; g.fill(); }
    else if (p.art === 'book') { g.beginPath(); g.moveTo(-100, -50); g.quadraticCurveTo(-50, -70, 0, -45); g.quadraticCurveTo(50, -70, 100, -50); g.lineTo(100, 60); g.quadraticCurveTo(50, 40, 0, 65); g.quadraticCurveTo(-50, 40, -100, 60); g.closePath(); g.fill(); g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, -45); g.lineTo(0, 65); g.stroke(); }
    else if (p.art === 'note') { g.beginPath(); g.ellipse(-30, 50, 34, 24, -0.4, 0, 6.28); g.fill(); g.fillRect(-2, -80, 10, 130); g.beginPath(); g.moveTo(8, -80); g.quadraticCurveTo(60, -60, 50, -10); g.lineTo(40, -14); g.quadraticCurveTo(46, -50, 8, -55); g.fill(); }
    else if (p.art === 'ball') { g.fillStyle = '#e07020'; g.beginPath(); g.arc(0, 0, 80, 0, 6.28); g.fill(); g.strokeStyle = '#1a1a1a'; g.lineWidth = 5; g.beginPath(); g.moveTo(-80, 0); g.lineTo(80, 0); g.moveTo(0, -80); g.lineTo(0, 80); g.stroke(); g.beginPath(); g.arc(-110, 0, 80, -0.8, 0.8); g.stroke(); g.beginPath(); g.arc(110, 0, 80, Math.PI - 0.8, Math.PI + 0.8); g.stroke(); }
    else if (p.art === 'star') { g.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? 36 : 85; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } g.closePath(); g.fill(); }
    else if (p.art === 'boat') { g.fillStyle = '#2a4a7a'; g.fillRect(-190, 40, 380, 200); g.fillStyle = '#f4efe4'; g.beginPath(); g.moveTo(0, -90); g.lineTo(0, 30); g.lineTo(70, 30); g.closePath(); g.fill(); g.beginPath(); g.moveTo(-8, -70); g.lineTo(-8, 30); g.lineTo(-60, 30); g.closePath(); g.fill(); g.fillStyle = '#6a3a1a'; g.beginPath(); g.moveTo(-70, 38); g.lineTo(80, 38); g.lineTo(55, 60); g.lineTo(-50, 60); g.closePath(); g.fill(); g.fillStyle = 'rgba(255,240,200,0.8)'; g.beginPath(); g.arc(120, -120, 26, 0, 6.28); g.fill(); }
    else if (p.art === 'hills') { g.fillStyle = '#5a7a40'; g.beginPath(); g.moveTo(-200, 60); g.quadraticCurveTo(-90, -60, 20, 40); g.quadraticCurveTo(110, -30, 200, 30); g.lineTo(200, 240); g.lineTo(-200, 240); g.closePath(); g.fill(); g.fillStyle = '#3a5a2a'; g.beginPath(); g.moveTo(-200, 120); g.quadraticCurveTo(0, 40, 200, 110); g.lineTo(200, 240); g.lineTo(-200, 240); g.closePath(); g.fill(); g.fillStyle = '#6a4a24'; g.fillRect(60, 30, 50, 40); g.fillStyle = '#8a2a1a'; g.beginPath(); g.moveTo(52, 32); g.lineTo(85, 5); g.lineTo(118, 32); g.fill(); }
    else if (p.art === 'drop') { g.beginPath(); g.moveTo(0, -85); g.quadraticCurveTo(70, 10, 0, 70); g.quadraticCurveTo(-70, 10, 0, -85); g.fill(); }
    else if (p.art === 'clock') { g.beginPath(); g.arc(0, 0, 80, 0, 6.28); g.stroke(); g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -60); g.moveTo(0, 0); g.lineTo(45, 20); g.stroke(); }
    g.restore();
    g.fillStyle = p.fg; g.textAlign = 'center';
    const pix = key.startsWith('poster');
    g.font = pix ? `26px ${FONT_PIX}` : `bold 46px ${FONT_TYPE}`;
    g.fillText(p.title, w / 2, h * 0.8);
    g.font = pix ? `13px ${FONT_PIX}` : `22px ${FONT_TYPE}`;
    wrapText(g, p.sub, w / 2, h * 0.88, w - 40, 26);
    if (p.frame) { g.strokeStyle = p.frame; g.lineWidth = 34; g.strokeRect(0, 0, w, h); g.strokeStyle = 'rgba(255,220,150,0.35)'; g.lineWidth = 3; g.strokeRect(17, 17, w - 34, h - 34); }
    else { g.strokeStyle = 'rgba(0,0,0,0.5)'; g.lineWidth = 10; g.strokeRect(0, 0, w, h); }
  });

  // Çıkartmalar (saydam): lekeler, küf, çatlaklar, grafitiler, ısırık izleri
  T.decal = (type, text) => T.canvas('decal:' + type + ':' + (text || ''), text ? 1024 : 512, text ? 512 : 512, (g, w, h) => {
    const r = U.rng(U.hashStr(type + (text || '')));
    const blob = (cx, cy, rad, col, alpha, pts = 22) => {
      g.beginPath();
      for (let k = 0; k <= pts; k++) {
        const a = k / pts * Math.PI * 2, rr = rad * (0.7 + r() * 0.5);
        g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      }
      g.fillStyle = col; g.globalAlpha = alpha; g.fill(); g.globalAlpha = 1;
    };
    const soft = (cx, cy, rad, col, a0) => {
      const grd = g.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grd.addColorStop(0, col.replace('A', a0)); grd.addColorStop(1, col.replace('A', 0));
      g.fillStyle = grd; g.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
    };
    const W = w, H = h;
    switch (type) {
      case 'stain': case 'ceilStain': {
        for (let k = 0; k < 9; k++) soft(W / 2 + r.range(-80, 80), H / 2 + r.range(-80, 80), r.range(80, 200), 'rgba(90,60,25,A)', 0.35);
        g.strokeStyle = 'rgba(70,45,15,0.45)'; g.lineWidth = 4;
        for (let ring = 0; ring < 3; ring++) { g.beginPath(); const R0 = 150 + ring * 40; for (let k = 0; k <= 40; k++) { const a = k / 40 * 6.28; const rr = R0 * (0.8 + 0.25 * Math.sin(a * 3 + ring) + r() * 0.05); g.lineTo(W / 2 + Math.cos(a) * rr, H / 2 + Math.sin(a) * rr); } g.stroke(); }
        if (type === 'stain') for (let k = 0; k < 7; k++) { g.fillStyle = 'rgba(80,55,20,0.25)'; g.fillRect(W / 2 + r.range(-120, 120), H / 2, r.range(3, 8), r.range(80, 240)); }
        break;
      }
      case 'damp': case 'grime': case 'oil': case 'algae': case 'mold': {
        const col = type === 'oil' ? 'rgba(10,10,12,A)' : type === 'algae' ? 'rgba(30,90,60,A)' : type === 'mold' ? 'rgba(25,35,15,A)' : type === 'grime' ? 'rgba(20,18,12,A)' : 'rgba(40,30,10,A)';
        for (let k = 0; k < (type === 'mold' ? 40 : 14); k++) soft(W / 2 + r.range(-150, 150), H / 2 + r.range(-150, 150), r.range(20, type === 'mold' ? 50 : 170), col, type === 'oil' ? 0.55 : 0.4);
        break;
      }
      case 'crack': {
        g.strokeStyle = 'rgba(15,15,15,0.8)'; g.lineWidth = 3;
        const branch = (x, y, a, len, depth) => {
          g.beginPath(); g.moveTo(x, y);
          for (let k = 0; k < 8; k++) { a += r.range(-0.5, 0.5); x += Math.cos(a) * len / 8; y += Math.sin(a) * len / 8; g.lineTo(x, y); }
          g.stroke();
          if (depth < 3) for (let q = 0; q < 2; q++) if (r.chance(0.6)) branch(x, y, a + r.range(-1, 1), len * 0.6, depth + 1);
        };
        branch(W * 0.1, H / 2, 0, W * 0.5, 0);
        break;
      }
      case 'paintLine': { g.fillStyle = 'rgba(230,190,40,0.8)'; g.fillRect(0, H * 0.44, W, H * 0.12); for (let k = 0; k < 300; k++) { g.clearRect(r() * W, H * 0.44 + r() * H * 0.12, r.range(2, 12), r.range(2, 6)); } break; }
      case 'rust': { for (let k = 0; k < 10; k++) { g.fillStyle = `rgba(${120 + r() * 40},${50 + r() * 20},20,0.35)`; g.fillRect(W / 2 + r.range(-60, 60), H * 0.2, r.range(4, 14), r.range(120, 380)); } soft(W / 2, H * 0.2, 90, 'rgba(120,60,20,A)', 0.5); break; }
      case 'gum': { blob(W / 2, H / 2, W * 0.3, '#2a2a2a', 0.8); break; }
      case 'coffee': { g.strokeStyle = 'rgba(70,40,20,0.6)'; g.lineWidth = 16; g.beginPath(); g.arc(W / 2, H / 2, W * 0.32, 0, 6.28); g.stroke(); soft(W / 2, H / 2, W * 0.3, 'rgba(90,55,25,A)', 0.25); break; }
      case 'paperFloor': { g.fillStyle = '#e9e4d6'; g.save(); g.translate(W / 2, H / 2); g.rotate(0.2); g.fillRect(-W * 0.3, -H * 0.4, W * 0.6, H * 0.8); g.fillStyle = '#8a8579'; for (let k = 0; k < 12; k++) g.fillRect(-W * 0.24, -H * 0.32 + k * 26, W * r.range(0.3, 0.48), 5); g.restore(); break; }
      case 'scuff': { for (let k = 0; k < 20; k++) { g.strokeStyle = 'rgba(30,30,30,0.3)'; g.lineWidth = r.range(2, 6); g.beginPath(); const y = H / 2 + r.range(-60, 60); g.moveTo(r.range(0, W / 2), y); g.lineTo(r.range(W / 2, W), y + r.range(-20, 20)); g.stroke(); } break; }
      case 'bite': {
        // Yutucu’nun ısırık izi: yarım daire biçimli yırtık boşluk
        g.fillStyle = 'rgba(8,6,4,0.96)';
        g.beginPath();
        for (let k = 0; k <= 60; k++) { const a = Math.PI * 0.15 + k / 60 * Math.PI * 1.7; const rr = W * 0.36 + (k % 3 === 0 ? W * 0.04 : 0) + r() * 6; g.lineTo(W / 2 + Math.cos(a) * rr, H / 2 + Math.sin(a) * rr); }
        g.closePath(); g.fill();
        soft(W / 2, H / 2, W * 0.48, 'rgba(40,25,5,A)', 0.4);
        break;
      }
      case 'tally': {
        g.strokeStyle = 'rgba(25,20,15,0.85)'; g.lineWidth = 6; g.lineCap = 'round';
        for (let grp = 0; grp < 9; grp++) {
          const gx = 40 + (grp % 3) * 150, gy = 60 + Math.floor(grp / 3) * 140;
          for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(gx + k * 22, gy); g.lineTo(gx + k * 22 + r.range(-4, 4), gy + 90); g.stroke(); }
          g.beginPath(); g.moveTo(gx - 10, gy + 70); g.lineTo(gx + 80, gy + 20); g.stroke();
        }
        break;
      }
      case 'lipstick': {
        // Written with a lipstick on glass: waxy red strokes, doubled edge where it dragged, smears
        g.clearRect(0, 0, W, H);
        g.textAlign = 'center'; g.textBaseline = 'middle';
        const lines = String(text || '').split('\n').filter(Boolean).slice(0, 4);
        let size = Math.min(150, Math.floor(H / Math.max(2.4, lines.length * 1.25)));
        g.font = `bold ${size}px ${FONT_HAND}`;
        const widest = Math.max(1, ...lines.map(l => g.measureText(l).width));
        if (widest > W * 0.84) { size = Math.floor(size * W * 0.84 / widest); g.font = `bold ${size}px ${FONT_HAND}`; }
        lines.forEach((ln, k) => {
          const y = H / 2 + (k - (lines.length - 1) / 2) * size * 1.12, x = W / 2 + r.range(-18, 18);
          g.save(); g.translate(x, y); g.rotate(r.range(-0.06, 0.06));
          for (let q = 0; q < 5; q++) { g.fillStyle = `rgba(${150 + r() * 40 | 0},${12 + r() * 12 | 0},${28 + r() * 12 | 0},${0.35 + r() * 0.3})`; g.fillText(ln, r.range(-2.5, 2.5), r.range(-2.5, 2.5)); }
          g.globalCompositeOperation = 'destination-out';
          for (let q = 0; q < 160; q++) g.fillRect(r.range(-W * 0.45, W * 0.45), r.range(-size * 0.6, size * 0.6), r.range(1, 5), r.range(1, 3));
          g.globalCompositeOperation = 'source-over';
          g.restore();
        });
        g.strokeStyle = 'rgba(160,20,36,0.35)'; g.lineWidth = 6; g.lineCap = 'round';
        for (let k = 0; k < 3; k++) { const x = r.range(W * 0.2, W * 0.8), y = r.range(H * 0.6, H * 0.9); g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + r.range(-30, 30), y + 30, x + r.range(-60, 60), y + r.range(40, 70)); g.stroke(); }
        break;
      }
      case 'graffiti': case 'wallText': {
        const col = type === 'graffiti' ? r.pick(['#c81d1d', '#111111', '#1d3cc8']) : 'rgba(30,20,10,0.9)';
        g.font = type === 'graffiti' ? `bold 110px Impact, "Arial Black", sans-serif` : PB.Fonts ? PB.Fonts.canvas(`78px ${FONT_HAND}`, 'hand') : `78px ${FONT_HAND}`;
        g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = col;
        const lines = wrapText(g, text || '', W / 2, H / 2 - 50, W - 60, 110);
        void lines;
        if (type === 'graffiti') for (let k = 0; k < 14; k++) { g.fillRect(r.range(W * 0.15, W * 0.85), H / 2 + 30, 5, r.range(20, 120)); }
        break;
      }
      case 'poster': { g.drawImage(T.poster(text || 'motive1').userData.canvas, 0, 0, W, H); break; }
      case 'hands': {
        // small handprints, a child's, pressed into the grime at different heights as if someone was feeling their way along
        const hand = (cx, cy, s, a) => {
          g.save(); g.translate(cx, cy); g.rotate(a); g.fillStyle = 'rgba(28,18,12,0.72)';
          g.beginPath(); g.ellipse(0, 0, 30 * s, 36 * s, 0, 0, 6.283); g.fill();
          [[-24, -44, 0.3], [-9, -56, 0.1], [7, -58, -0.05], [22, -50, -0.2]].forEach(([x, y, fa]) => { g.save(); g.translate(x * s, y * s); g.rotate(fa); g.beginPath(); g.ellipse(0, 0, 7 * s, 18 * s, 0, 0, 6.283); g.fill(); g.restore(); });
          g.save(); g.translate(34 * s, -4 * s); g.rotate(-0.9); g.beginPath(); g.ellipse(0, 0, 8 * s, 17 * s, 0, 0, 6.283); g.fill(); g.restore();
          for (let k = 0; k < 40; k++) { g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(r.range(-30, 30) * s, r.range(-60, 30) * s, 2, 2); }
          g.restore();
        };
        const n = 2 + (r() * 3 | 0);
        for (let k = 0; k < n; k++) hand(W * r.range(0.2, 0.8), H * r.range(0.25, 0.75), r.range(0.9, 1.3), r.range(-0.5, 0.5));
        g.globalCompositeOperation = 'destination-out'; for (let k = 0; k < 900; k++) { g.fillStyle = `rgba(0,0,0,${r() * 0.6})`; g.fillRect(r() * W, r() * H, 3, 3); } g.globalCompositeOperation = 'source-over';
        break;
      }
      case 'storeSign': {
        const cols = ['#ff4fa3', '#4fd8ff', '#ffd23f', '#7dff6a', '#ff7a3d', '#c77dff'];
        const col = cols[U.hashStr(text || '') % cols.length];
        g.fillStyle = '#17121a'; g.fillRect(0, H * 0.32, W, H * 0.36);
        g.strokeStyle = col; g.globalAlpha = 0.6; g.lineWidth = 6; g.strokeRect(10, H * 0.32 + 10, W - 20, H * 0.36 - 20); g.globalAlpha = 1;
        g.font = `bold ${text && text.length > 12 ? 92 : 112}px ${FONT_TYPE}`; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.shadowColor = col; g.shadowBlur = 28; g.fillStyle = col; g.fillText(text || '', W / 2, H / 2 + 4);
        g.shadowBlur = 0; g.fillStyle = 'rgba(255,255,255,0.75)'; g.fillText(text || '', W / 2, H / 2 + 4);
        break;
      }
      case 'sign': { g.fillStyle = '#e8e2d0'; g.fillRect(0, H * 0.3, W, H * 0.4); g.fillStyle = '#1b1b1b'; g.font = `bold 120px ${FONT_TYPE}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text || '', W / 2, H / 2 + 6); break; }
      default: soft(W / 2, H / 2, W * 0.4, 'rgba(0,0,0,A)', 0.4);
    }
  });

  // CRT monitör ekranı (yeşil/amber)
  T.crt = (key, lines, color = '#7dff8a') => T.canvas('crt:' + key, 512, 384, (g, w, h) => {
    g.fillStyle = '#031006'; g.fillRect(0, 0, w, h);
    g.fillStyle = color; g.shadowColor = color; g.shadowBlur = 8;
    g.font = `26px ${FONT_TERM}`;
    const arr = Array.isArray(lines) ? lines : String(lines).split('\n');
    arr.slice(0, 13).forEach((l, k) => g.fillText(l, 22, 36 + k * 26));
    g.shadowBlur = 0;
    for (let y = 0; y < h; y += 3) { g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(0, y, w, 1); }
    const grd = g.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.75);
    grd.addColorStop(0, 'rgba(0,0,0,0)'); grd.addColorStop(1, 'rgba(0,0,0,0.6)');
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
  });
  T.whiteboard = (key, text) => T.canvas('wb:' + key, 1024, 512, (g, w, h) => {
    g.fillStyle = '#f1f2ee'; g.fillRect(0, 0, w, h);
    const grd = g.createLinearGradient(0, 0, w, h); grd.addColorStop(0, 'rgba(255,255,255,0.4)'); grd.addColorStop(1, 'rgba(0,0,0,0.06)');
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
    g.fillStyle = '#1b3fa8'; g.font = `40px ${FONT_HAND}`;
    wrapText(g, text, 40, 60, w - 80, 44);
    g.strokeStyle = '#8b8e90'; g.lineWidth = 18; g.strokeRect(0, 0, w, h);
  });
  T.paper = (key, handwritten = true) => T.canvas('paper:' + key, 256, 320, (g, w, h) => {
    g.fillStyle = handwritten ? '#efe8d2' : '#f2f0ea'; g.fillRect(0, 0, w, h);
    const r = U.rng(U.hashStr(key));
    for (let k = 0; k < 900; k++) { g.fillStyle = `rgba(90,70,40,${r() * 0.05})`; g.fillRect(r() * w, r() * h, 2, 2); }
    g.strokeStyle = handwritten ? 'rgba(40,40,90,0.75)' : 'rgba(20,20,20,0.8)'; g.lineWidth = handwritten ? 2.2 : 3;
    for (let y = 36; y < h - 30; y += handwritten ? 20 : 16) {
      g.beginPath(); let x = 24; g.moveTo(x, y);
      const end = r.range(w * 0.55, w - 24);
      while (x < end) { x += r.range(3, 8); g.lineTo(x, y + (handwritten ? r.range(-3, 3) : 0)); }
      g.stroke();
    }
    g.fillStyle = 'rgba(120,90,50,0.15)'; g.beginPath(); g.arc(w * 0.8, h * 0.85, 30, 0, 6.28); g.fill();
  });
  // A document as it lies in the world: its real paper and its real text, in the writer's hand, so what
  // you read up close is what you then read in the viewer
  const HAND_FONT = {
    walt: ['700 {s}px "Caveat", cursive', '#1d2c5e', 1.25], eddie: ['400 {s}px "Kalam", cursive', '#37373a', 0.95], lily: ['600 {s}px "Mali", cursive', '#6a2aa8', 0.95],
    rosie: ['400 {s}px "Sriracha", cursive', '#a82a64', 0.95], toby: ['400 {s}px "Patrick Hand", cursive', '#1d4a90', 1.05], danny: ['700 {s}px "Kalam", cursive', '#141414', 0.95],
    theo: ['500 {s}px "Mali", cursive', '#2a5aa8', 0.95], sam: ['400 {s}px "Patrick Hand", cursive', '#262626', 1.05], adult: ['500 {s}px "Caveat", cursive', '#243a6a', 1.25],
    wall: ['700 {s}px "Kalam", cursive', '#1b120a', 1], type: ['400 {s}px "Courier Prime", "Courier New", monospace', '#222', 0.8], dot: ['400 {s}px "VT323", monospace', '#2a2a3a', 1.05],
  };
  T.docPaper = (key, n, hand) => T.canvas('doc:' + key + ':' + (PB.I18N && PB.I18N.lang || ''), 384, 512, (g, w, h) => {
    const r = U.rng(U.hashStr(key));
    const en = PB.Story && n.id && PB.Story.note(n.id, 'en');
    const kind = n.kind, sticky = /yellow|sticky/i.test((en && en.title) || n.title || '');
    const F = PB.Fonts, lang = PB.I18N && PB.I18N.lang;
    const base = sticky ? '#f1df72' : kind === 'flyer' ? '#f4e46a' : kind === 'diary' ? '#efe6cf' : ['letter', 'notice', 'printout', 'report', 'card'].includes(kind) ? '#f3f0e6' : '#efe6cf';
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    // ruled or banded paper
    if (kind === 'diary' || kind === 'card') { g.fillStyle = 'rgba(120,150,200,0.45)'; for (let y = 70; y < h; y += 26) g.fillRect(0, y, w, 1.5); g.fillStyle = 'rgba(200,90,90,0.5)'; g.fillRect(kind === 'diary' ? 40 : 0, kind === 'diary' ? 0 : 56, kind === 'diary' ? 1.5 : w, kind === 'diary' ? h : 1.5); }
    if (kind === 'printout') { g.fillStyle = 'rgba(150,190,140,0.25)'; for (let y = 0; y < h; y += 48) g.fillRect(0, y, w, 24); g.fillStyle = 'rgba(20,20,20,0.7)'; for (let y = 12; y < h; y += 24) { g.beginPath(); g.arc(10, y, 4, 0, 6.28); g.arc(w - 10, y, 4, 0, 6.28); g.fill(); } }
    if (kind === 'notice') { g.fillStyle = '#7a1a14'; g.fillRect(0, 0, w, 14); }
    // fibres, age, edges
    for (let k = 0; k < 1600; k++) { g.fillStyle = `rgba(90,70,40,${r() * 0.07})`; g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2); }
    const edge = g.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.8); edge.addColorStop(0, 'rgba(0,0,0,0)'); edge.addColorStop(1, 'rgba(100,70,30,0.22)'); g.fillStyle = edge; g.fillRect(0, 0, w, h);
    if (['letter', 'notice', 'report', 'printout'].includes(kind)) for (const fy of [h / 3, h * 2 / 3]) { const fg = g.createLinearGradient(0, fy - 6, 0, fy + 6); fg.addColorStop(0, 'rgba(0,0,0,0)'); fg.addColorStop(0.5, 'rgba(0,0,0,0.12)'); fg.addColorStop(0.55, 'rgba(255,255,255,0.4)'); fg.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = fg; g.fillRect(0, fy - 6, w, 12); }
    // the words
    const typed = !hand;
    const [fontT, ink, scale] = HAND_FONT[hand || (kind === 'printout' ? 'dot' : 'type')];
    const size = Math.round((typed ? 17 : 24) * scale);
    let y = kind === 'diary' || kind === 'card' ? 64 : 44;
    const x0 = kind === 'diary' ? 52 : kind === 'printout' ? 28 : 24, maxW = w - x0 - 22;
    const face = (f, role) => F ? F.canvas(f, role) : f;
    if (typed && n.title) { g.fillStyle = '#1a1a1a'; g.font = face(`700 ${size + 2}px "Courier Prime", "Courier New", monospace`, 'type'); y += wrapText(g, n.title.toLocaleUpperCase(lang || 'en'), x0, y, maxW, size + 6) * (size + 6) + 10; }
    const role = typed ? 'type' : 'hand';
    g.fillStyle = ink; g.font = face(fontT.replace('{s}', size), role);
    const lh = kind === 'diary' || kind === 'card' ? 26 : Math.round(size * (typed ? 1.35 : 1.22));
    const body = String(n.body || '').replace(/\n\s*\n/g, '\n\n');
    for (const line of body.split('\n')) {
      if (y > h - 24) break;
      if (!line.trim()) { y += lh * 0.6; continue; }
      if (/^[(（].*[)）]$/.test(line.trim())) continue;   // narration, not on the paper
      g.fillStyle = ink; g.font = face(fontT.replace('{s}', size), role);
      y += wrapText(g, line, x0 + (typed ? 0 : r.range(-2, 2)), y, maxW, lh) * lh;
    }
    // a coffee ring now and then
    if (r() < 0.4) { g.strokeStyle = 'rgba(120,72,28,0.22)'; g.lineWidth = 5; g.beginPath(); g.arc(w * r.range(0.55, 0.85), h * r.range(0.15, 0.8), 34, 0, 6.28); g.stroke(); }
  }, { readback: false });
  T.photo = key => T.canvas('photo:' + key, 320, 240, (g, w, h) => {
    g.fillStyle = '#f4f1e8'; g.fillRect(0, 0, w, h);
    const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, '#3a2a40'); grd.addColorStop(1, '#1a1216');
    g.fillStyle = grd; g.fillRect(12, 12, w - 24, h - 50);
    const cols = ['#c83030', '#d88fbf', '#3cb6c8', '#d8903a', '#e0c070'];
    for (let k = 0; k < 5; k++) {
      const x = 50 + k * 55, y = 120;
      g.fillStyle = '#e8c9a8'; g.beginPath(); g.arc(x, y - 30, 14, 0, 6.28); g.fill();
      g.fillStyle = cols[k]; g.fillRect(x - 16, y - 14, 32, 60);
    }
    g.fillStyle = 'rgba(255,230,160,0.15)'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#333'; g.font = `18px ${FONT_HAND}`; g.fillText('4/16/87', 20, h - 16);
  });
  // Bozuk ekran karakterleri (256. seviye)
  T.glitch = seed => T.canvas('glitch:' + seed, 512, 512, (g, w, h) => {
    const r = U.rng(seed);
    g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
    const cols = ['#ff3b30', '#b46cff', '#2fe0b8', '#ffb020', '#ff8a1a', '#8a3cff', '#f3e6ff', '#ff9ad5', '#66ff66'];
    const chars = 'ABCDEFGHIJKLMNOPRSTUVYZ0123456789!?#%&*ÇĞİÖŞÜ▓▒░';
    const cs = 32;
    g.font = `22px ${FONT_PIX}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let y = 0; y < h; y += cs) for (let x = 0; x < w; x += cs) {
      const t = r();
      if (t < 0.18) { g.fillStyle = r.pick(cols); g.fillRect(x, y, cs, cs); }
      else if (t < 0.7) { g.fillStyle = r.pick(cols); g.fillText(r.pick(chars.split('')), x + cs / 2, y + cs / 2 + 2); }
      else if (t < 0.8) { g.fillStyle = r.pick(cols); for (let k = 0; k < 4; k++) g.fillRect(x + r() * cs, y + r() * cs, 6, 6); }
    }
  }, { repeat: true, nearest: true });
  // Gökyüzündeki dev skor tablosu
  T.skyScore = () => T.canvas('skyScore', 2048, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.font = `64px ${FONT_PIX}`; g.textBaseline = 'middle';
    g.fillStyle = '#ffffff'; g.shadowColor = '#ffffff'; g.shadowBlur = 20;
    g.textAlign = 'left'; g.fillText('1UP', 80, 70); g.fillText('00', 80, 180);
    g.textAlign = 'center'; g.fillText('HIGH SCORE', w / 2, 70); g.fillText('921450', w / 2, 180);
    g.textAlign = 'right'; g.fillText('2UP', w - 80, 70);
    g.fillStyle = '#ffff00'; g.shadowColor = '#ffff00'; g.fillText('SAM', w - 80, 180);
  });
  T.readyText = (text, color) => T.canvas('ready:' + text, 1024, 160, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.font = `96px ${FONT_PIX}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = color; g.shadowColor = color; g.shadowBlur = 24; g.fillText(text, w / 2, h / 2);
  });
  // Yağmur (vitrin arkası)
  T.rain = () => T.canvas('rain', 256, 512, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    const r = U.rng(9);
    g.strokeStyle = 'rgba(180,200,255,0.35)'; g.lineWidth = 1.5;
    for (let k = 0; k < 220; k++) { const x = r() * w, y = r() * h, l = r.range(12, 40); g.beginPath(); g.moveTo(x, y); g.lineTo(x - 2, y + l); g.stroke(); }
  }, { repeat: true });
  // Yumuşak nokta (parçacıklar ve ışık hüzmeleri için)
  T.softDot = () => T.canvas('softDot', 64, 64, (g, w, h) => {
    const grd = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.4, 'rgba(255,255,255,0.35)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
  });
  // Floresan panel yayıcı dokusu: prizmatik difüzör ızgarası
  T.panelTex = () => T.canvas('panelTex', 256, 128, (g, w, h) => {
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(200,200,190,0.35)';
    for (let x = 0; x < w; x += 8) g.fillRect(x, 0, 1, h);
    for (let y = 0; y < h; y += 8) g.fillRect(0, y, w, 1);
    const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, 'rgba(255,255,240,0)'); grd.addColorStop(0.5, 'rgba(255,255,255,0.4)'); grd.addColorStop(1, 'rgba(255,255,240,0)');
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#8a8a80'; g.lineWidth = 8; g.strokeRect(0, 0, w, h);
  });

  // ------------------------------------------------------------ KABİN EKRANLARI (canlı)
  // Her oyun için küçük bir "çekim modu" animasyonu. update(t) ile yeniden çizilir.
  T.cabinetScreens = {};
  T.cabinetScreen = function (game) {
    if (T.cabinetScreens[game]) return T.cabinetScreens[game];
    const W = 160, H = 200;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext('2d');
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false;
    const r = U.rng(U.hashStr(game));
    const stars = Array.from({ length: 40 }, () => ({ x: r() * W, y: r() * H, s: r.range(0.3, 1.2) }));
    const titles = { galaksi: 'GALAXY 2000', kurbaga: 'FROG ROAD', tugla: 'BRICK BASH', yilan: 'NEON SERPENT', uzay: 'ORBIT RAID', yaris: 'MIDNIGHT MILE', dovus: 'ALLEY BRAWL', gems: 'GEM CASCADE', special: '', classic: 'HUNGRY HOUSE' };
    const scr = {
      tex, canvas: c, game, on: true, text: null,
      update(t) {
        g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
        if (!this.on) { tex.needsUpdate = true; return; }
        g.font = `8px ${FONT_PIX}`; g.textAlign = 'center'; g.textBaseline = 'middle';
        if (game === 'special') {
          // Özel kabin: 255. seviye ve bozulan sağ yarı
          g.strokeStyle = '#8a3cff'; g.lineWidth = 2;
          for (let k = 0; k < 6; k++) g.strokeRect(10 + k * 6, 30 + k * 6, W / 2 - 20 - k * 12, H - 70 - k * 12);
          g.fillStyle = '#ffe7a0';
          for (let y = 40; y < H - 40; y += 10) for (let x = 16; x < W / 2 - 6; x += 10) g.fillRect(x, y, 2, 2);
          const gr = U.rng(Math.floor(t * 6));
          for (let y = 24; y < H - 24; y += 8) for (let x = W / 2; x < W - 4; x += 8) {
            const q = gr();
            if (q < 0.5) { g.fillStyle = ['#ff3b30', '#b46cff', '#2fe0b8', '#ffb020', '#ff8a1a', '#f3e6ff'][Math.floor(gr() * 6)]; g.fillText('ABCDEF0123456789'[Math.floor(gr() * 16)], x + 4, y + 4); }
          }
          g.fillStyle = '#fff'; g.fillText(this.text || 'LEVEL 255', W / 2, 12);
          if (Math.floor(t * 2) % 2 === 0) { g.fillStyle = '#ff8a1a'; g.fillText(this.sub || 'PLAYER 1 READY', W / 2, H - 12); }
        } else if (game === 'classic') {
          g.fillStyle = '#ff8a1a'; g.font = `14px ${FONT_PIX}`; g.fillText('HUNGRY HOUSE', W / 2, 40);
          g.font = `8px ${FONT_PIX}`; g.fillStyle = '#f3e6ff'; g.fillText('FREE PLAY', W / 2, 70);
          // attract loop: the horned Muncher runs from four hooded Haunts
          const px = ((t * 40) % (W + 60)) - 30, chew = Math.abs(Math.sin(t * 10));
          g.fillStyle = '#5a1e0a'; for (const d of [-1, 1]) { g.beginPath(); g.moveTo(px + d * 3, 102); g.lineTo(px + d * 6, 97); g.lineTo(px + d * 7, 104); g.fill(); }
          g.fillStyle = '#ff8a1a'; g.beginPath(); g.arc(px, 110, 9, 0, 6.283); g.fill();
          g.fillStyle = '#2a0808'; g.beginPath(); g.ellipse(px + 1, 113, 6, 1 + chew * 3, 0, 0, 6.283); g.fill();
          g.fillStyle = '#fff'; for (const d of [-1, 1]) g.fillRect(px + d * 3 - 1, 106, 3, 3);
          const gc = ['#ff3b30', '#b46cff', '#2fe0b8', '#ffb020'];
          gc.forEach((col, k) => {
            const gx = px - 28 - k * 22; g.fillStyle = col; g.beginPath();
            g.moveTo(gx - 8, 119); g.quadraticCurveTo(gx - 9, 100, gx, 99); g.quadraticCurveTo(gx + 9, 100, gx + 8, 119);
            for (let j = 1; j <= 4; j++) g.lineTo(gx + 8 - j * 4, j % 2 ? 115 : 119);
            g.fill(); g.fillStyle = '#120818'; g.fillRect(gx - 4, 106, 3, 4); g.fillRect(gx + 1, 106, 3, 4);
          });
          if (Math.floor(t * 2) % 2 === 0) { g.fillStyle = '#fff'; g.fillText('E: PLAY', W / 2, 160); }
        } else {
          for (const s of stars) { s.y = (s.y + s.s) % H; g.fillStyle = `rgba(255,255,255,${0.3 + s.s * 0.4})`; g.fillRect(s.x, s.y, 1, 1); }
          const hue = (U.hashStr(game) % 360);
          g.fillStyle = `hsl(${hue},90%,60%)`;
          if (game === 'galaksi' || game === 'uzay') {
            for (let k = 0; k < 5; k++) for (let j = 0; j < 3; j++) g.fillRect(20 + k * 26 + Math.sin(t * 2) * 10, 40 + j * 18, 12, 8);
            g.fillStyle = '#fff'; g.fillRect(W / 2 + Math.sin(t * 1.3) * 50 - 6, H - 40, 12, 8);
          } else if (game === 'tugla' || game === 'gems') {
            for (let k = 0; k < 8; k++) for (let j = 0; j < 4; j++) { g.fillStyle = `hsl(${(hue + j * 40) % 360},80%,55%)`; g.fillRect(8 + k * 18, 36 + j * 10, 16, 8); }
            g.fillStyle = '#fff'; g.fillRect(W / 2 + Math.sin(t * 2) * 50 - 14, H - 30, 28, 4);
          } else if (game === 'yilan' || game === 'kurbaga') {
            for (let k = 0; k < 12; k++) g.fillRect(20 + ((t * 30 + k * 8) % 120), 100 + Math.sin(t * 3 + k * 0.4) * 20, 7, 7);
          } else {
            g.fillRect(W / 2 - 20 + Math.sin(t * 3) * 30, 100, 16, 30);
            g.fillStyle = '#fff'; g.fillRect(W / 2 + 10 - Math.sin(t * 3) * 30, 100, 16, 30);
          }
          g.fillStyle = '#fff'; g.fillText(titles[game] || '', W / 2, 16);
          if (Math.floor(t * 1.5) % 2 === 0) g.fillText('INSERT COIN', W / 2, H - 12);
        }
        for (let y = 0; y < H; y += 2) { g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(0, y, W, 1); }
        tex.needsUpdate = true;
      },
    };
    scr.update(0);
    T.cabinetScreens[game] = scr;
    return scr;
  };
  T.marquee = game => T.canvas('marquee:' + game, 512, 128, (g, w, h) => {
    const titles = { galaksi: 'GALAXY 2000', kurbaga: 'FROG ROAD', tugla: 'BRICK BASH', yilan: 'NEON SERPENT', uzay: 'ORBIT RAID', yaris: 'MIDNIGHT MILE', dovus: 'ALLEY BRAWL', gems: 'GEM CASCADE', special: 'HUNGRY HOUSE ★ #7', classic: 'HUNGRY HOUSE' };
    const hue = U.hashStr(game) % 360;
    const grd = g.createLinearGradient(0, 0, w, 0); grd.addColorStop(0, `hsl(${hue},70%,15%)`); grd.addColorStop(1, `hsl(${(hue + 60) % 360},70%,25%)`);
    g.fillStyle = game === 'special' || game === 'classic' ? '#000018' : grd; g.fillRect(0, 0, w, h);
    g.font = `28px ${FONT_PIX}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = game === 'special' || game === 'classic' ? '#ffff00' : `hsl(${hue},100%,70%)`;
    g.shadowColor = g.fillStyle; g.shadowBlur = 14;
    g.fillText(titles[game] || game.toUpperCase(), w / 2, h / 2 + 2);
  });
})(typeof window !== 'undefined' ? window : globalThis);
