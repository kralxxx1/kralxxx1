/* More procedural PBR sets for the hand-authored places: snow, ice, mud, gravel, rock, forest floor,
   rail ballast, ship deck and bulkheads, rust, log walls, lime plaster (with a flood line), stone
   masonry, wood panelling, parquet, weathered boards, cobbles, floral wallpaper, corrugated sheet,
   tent canvas, train moquette. Same conventions as textures.js: tileable, height drives the normal
   map, r is roughness, m metalness. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U;
  const T = PB.Tex, R = T.R, { FImg, field, h32 } = T.lib;
  const sm = U.smoothstep, fr = U.fract, cl = U.clamp, lerp = U.lerp;

  // Tileable cellular noise: nearest and second-nearest feature distance and the nearest cell's id
  function worley(n, k, seed, jit = 0.9) {
    const f1 = new Float32Array(n * n), f2 = new Float32Array(n * n), id = new Float32Array(n * n);
    const px = new Float32Array(k * k), py = new Float32Array(k * k);
    for (let j = 0; j < k; j++) for (let i = 0; i < k; i++) { px[j * k + i] = (i + 0.5 + (h32(i, j, seed) - 0.5) * jit); py[j * k + i] = (j + 0.5 + (h32(i, j, seed + 7) - 0.5) * jit); }
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const u = x / n * k, v = y / n * k, ci = Math.floor(u), cj = Math.floor(v);
      let d1 = 9, d2 = 9, best = 0;
      for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
        const ii = ci + di, jj = cj + dj, wi = ((ii % k) + k) % k, wj = ((jj % k) + k) % k;
        const fx = px[wj * k + wi] + (ii - wi), fy = py[wj * k + wi] + (jj - wj);
        const d = Math.hypot(u - fx, v - fy);
        if (d < d1) { d2 = d1; d1 = d; best = wj * k + wi; } else if (d < d2) d2 = d;
      }
      const o = y * n + x;
      f1[o] = d1; f2[o] = d2; id[o] = h32(best, 3, seed + 11);
    }
    return { f1, f2, id };
  }
  T.lib.worley = worley;

  // ---------------------------------------------------------------- ground
  R.snow = (n, s) => {
    const img = new FImg(n);
    const drift = field(n, 2, 4, s), mid = field(n, 9, 3, s + 1), fine = field(n, 80, 2, s + 2), crust = field(n, 5, 3, s + 3);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, sp = h32(x, y, s);
      const sparkle = sp > 0.996 ? 1 : 0;
      const k = 0.9 + (drift[i] - 0.5) * 0.1 + (mid[i] - 0.5) * 0.05 + (fine[i] - 0.5) * 0.03;
      const blue = sm(0.4, 0.75, 1 - drift[i]) * 0.05;
      img.set(i, 0.86 * k - blue, 0.89 * k - blue * 0.4, 0.95 * k);
      img.h[i] = drift[i] * 0.55 + mid[i] * 0.25 + fine[i] * 0.12 + sm(0.6, 0.8, crust[i]) * 0.06;
      img.r[i] = 0.72 - sparkle * 0.55 - sm(0.62, 0.82, crust[i]) * 0.2;
    }
    img.normalStrength = 0.9; img.aoStrength = 0.5;
    return img;
  };
  R.ice = (n, s) => {
    const img = new FImg(n);
    const cell = worley(n, 7, s), cell2 = worley(n, 19, s + 5), cloud = field(n, 3, 4, s + 1), frost = field(n, 6, 4, s + 2), fine = field(n, 64, 2, s + 3);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const crack = (1 - sm(0.0, 0.035, cell.f2[i] - cell.f1[i])) * sm(0.35, 0.55, cloud[i]);
      const hair = (1 - sm(0.0, 0.02, cell2.f2[i] - cell2.f1[i])) * sm(0.5, 0.7, fine[i]) * 0.6;
      const bub = h32(x >> 1, y >> 1, s) > 0.997 ? 1 : 0;
      const fr_ = sm(0.55, 0.8, frost[i]);
      const deep = 0.6 + cloud[i] * 0.5;
      const wht = Math.max(crack * 0.8, hair * 0.5, bub * 0.7, fr_ * 0.55);
      img.set(i, lerp(0.07 * deep, 0.75, wht), lerp(0.11 * deep, 0.8, wht), lerp(0.15 * deep, 0.86, wht));
      img.h[i] = 0.5 - crack * 0.25 - hair * 0.1 + fr_ * 0.12 + (fine[i] - 0.5) * 0.04;
      img.r[i] = 0.05 + fr_ * 0.55 + crack * 0.3;
    }
    img.normalStrength = 0.8;
    return img;
  };
  R.mud = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 4, s), mid = field(n, 8, 4, s + 1), fine = field(n, 48, 2, s + 2), wet = field(n, 4, 3, s + 3), rut = field(n, 3, 3, s + 4);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, g = h32(x, y, s);
      const pool = sm(0.6, 0.72, wet[i]);
      const ridge = Math.abs(Math.sin((x / n + rut[i] * 0.3) * Math.PI * 6)) * 0.3;
      const k = 0.8 + (low[i] - 0.5) * 0.3 + (mid[i] - 0.5) * 0.2 + (g - 0.5) * 0.08;
      const stone = g > 0.995 ? 0.25 : 0;
      img.set(i, (0.2 * k + stone) * (1 - pool * 0.4), (0.15 * k + stone) * (1 - pool * 0.4), (0.1 * k + stone * 0.9) * (1 - pool * 0.3));
      img.h[i] = 0.5 + (mid[i] - 0.5) * 0.5 + (fine[i] - 0.5) * 0.25 + ridge * 0.2 - pool * 0.4 + stone;
      img.r[i] = lerp(0.7 - sm(0.4, 0.7, wet[i]) * 0.3, 0.06, pool);
    }
    img.normalStrength = 1.6;
    return img;
  };
  R.gravel = (n, s) => {
    const img = new FImg(n);
    const c = worley(n, 34, s, 1), dirt = field(n, 3, 3, s + 1), fine = field(n, 96, 2, s + 2);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const edge = c.f2[i] - c.f1[i];
      const stone = sm(0.02, 0.12, edge);
      const tone = 0.4 + c.id[i] * 0.4, warm = h32(Math.floor(c.id[i] * 1000), 1, s) * 0.08;
      const d = sm(0.55, 0.8, dirt[i]) * 0.5;
      const k = lerp(0.12, tone, stone) * (0.92 + (fine[i] - 0.5) * 0.2);
      img.set(i, lerp(k + warm, 0.24, d), lerp(k + warm * 0.6, 0.2, d), lerp(k, 0.15, d));
      img.h[i] = stone * (0.5 + c.id[i] * 0.4) * (1 - c.f1[i] * 0.8) + (fine[i] - 0.5) * 0.05;
      img.r[i] = 0.8 + (1 - stone) * 0.15;
    }
    img.normalStrength = 2.2; img.aoStrength = 1.4;
    return img;
  };
  R.ballast = (n, s) => {
    const img = new FImg(n);
    const c = worley(n, 22, s, 1), oil = field(n, 4, 3, s + 1), fine = field(n, 80, 2, s + 2);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const edge = c.f2[i] - c.f1[i];
      // angular crushed stone: facets from the distance gradient bands
      const stone = sm(0.015, 0.08, edge);
      const facet = Math.floor(c.f1[i] * 6) / 6;
      const tone = 0.32 + c.id[i] * 0.22 - facet * 0.08;
      const stain = sm(0.6, 0.85, oil[i]) * 0.55;
      const k = lerp(0.05, tone, stone) * (1 - stain) * (0.95 + (fine[i] - 0.5) * 0.15);
      img.set(i, k * 1.02, k, k * 0.97);
      img.h[i] = stone * (0.7 - c.f1[i] * 0.6 - facet * 0.15);
      img.r[i] = 0.85 - stain * 0.3;
    }
    img.normalStrength = 2.6; img.aoStrength = 1.6;
    return img;
  };
  R.forestFloor = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 4, s), moss = field(n, 5, 4, s + 1), fine = field(n, 64, 2, s + 2);
    const needles = new Float32Array(n * n), nTone = new Float32Array(n * n);
    const r = U.rng(s);
    const count = n * n / 22;
    for (let k = 0; k < count; k++) {
      const x0 = r() * n, y0 = r() * n, a = r() * Math.PI * 2, len = n * (0.012 + r() * 0.018), tone = 0.5 + r() * 0.5;
      const dx = Math.cos(a), dy = Math.sin(a);
      for (let t = 0; t < len; t += 0.7) {
        const xx = ((Math.round(x0 + dx * t) % n) + n) % n, yy = ((Math.round(y0 + dy * t) % n) + n) % n;
        const o = yy * n + xx; needles[o] = Math.min(1, needles[o] + 0.6); nTone[o] = tone;
      }
    }
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const ms = sm(0.6, 0.78, moss[i]);
      const soil = 0.1 + (low[i] - 0.5) * 0.06 + (fine[i] - 0.5) * 0.04;
      const nd = needles[i];
      let rr = soil * 1.1, gg = soil * 0.85, bb = soil * 0.6;
      rr = lerp(rr, 0.32 * nTone[i] + 0.08, nd); gg = lerp(gg, 0.2 * nTone[i] + 0.05, nd); bb = lerp(bb, 0.1 * nTone[i] + 0.03, nd);
      rr = lerp(rr, 0.12 + fine[i] * 0.05, ms); gg = lerp(gg, 0.2 + fine[i] * 0.08, ms); bb = lerp(bb, 0.06, ms);
      img.set(i, rr, gg, bb);
      img.h[i] = 0.4 + nd * 0.3 + ms * 0.2 + (fine[i] - 0.5) * 0.2;
      img.r[i] = 0.9 - ms * 0.1;
    }
    img.normalStrength = 2; img.aoStrength = 1.2;
    return img;
  };
  R.rock = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 5, s), mid = field(n, 6, 5, s + 1), fine = field(n, 48, 3, s + 2), crack = field(n, 4, 5, s + 3), wet = field(n, 3, 3, s + 4);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n;
      const strata = Math.sin((v * 7 + low[i] * 1.6) * Math.PI * 2) * 0.5 + 0.5;
      const cr = (1 - sm(0.006, 0.02, Math.abs(crack[i] - 0.5))) * sm(0.4, 0.6, mid[i]);
      const seep = sm(0.62, 0.8, wet[i]) * sm(0.2, 0.9, 1 - v);
      const k = 0.55 + strata * 0.18 + (mid[i] - 0.5) * 0.35 + (fine[i] - 0.5) * 0.2 - cr * 0.4;
      const ox = sm(0.55, 0.8, low[i]) * 0.1;
      img.set(i, (0.3 * k + ox) * (1 - seep * 0.4), (0.27 * k + ox * 0.5) * (1 - seep * 0.4), (0.24 * k) * (1 - seep * 0.3));
      img.h[i] = 0.5 + (low[i] - 0.5) * 0.6 + (mid[i] - 0.5) * 0.5 + (fine[i] - 0.5) * 0.25 + strata * 0.1 - cr * 0.5;
      img.r[i] = 0.88 - seep * 0.55;
    }
    img.normalStrength = 3; img.aoStrength = 1.6;
    return img;
  };
  R.cobbles = (n, s) => {
    const img = new FImg(n);
    const c = worley(n, 12, s, 0.55), moss = field(n, 4, 3, s + 1), fine = field(n, 64, 2, s + 2);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const edge = c.f2[i] - c.f1[i];
      const stone = sm(0.04, 0.16, edge);
      const dome = 1 - c.f1[i] * 1.3;
      const tone = 0.32 + c.id[i] * 0.2;
      const ms = (1 - stone) * sm(0.5, 0.7, moss[i]);
      const k = lerp(0.1, tone, stone) * (0.92 + (fine[i] - 0.5) * 0.18);
      img.set(i, lerp(k, 0.1, ms), lerp(k * 0.98, 0.16, ms), lerp(k * 0.94, 0.06, ms));
      img.h[i] = stone * (0.4 + dome * 0.6) + (fine[i] - 0.5) * 0.06;
      img.r[i] = 0.55 + (1 - stone) * 0.4 - stone * dome * 0.15;
    }
    img.normalStrength = 2.4; img.aoStrength = 1.5;
    return img;
  };
  R.flagstone = (n, s) => {
    const img = new FImg(n);
    const c = worley(n, 5, s, 0.75), low = field(n, 3, 4, s + 1), fine = field(n, 64, 2, s + 2);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const joint = 1 - sm(0.015, 0.035, c.f2[i] - c.f1[i]);
      const tone = 0.42 + c.id[i] * 0.16 + (low[i] - 0.5) * 0.12;
      const k = tone * (0.94 + (fine[i] - 0.5) * 0.14);
      img.set(i, lerp(k, 0.12, joint), lerp(k * 0.97, 0.11, joint), lerp(k * 0.92, 0.09, joint));
      img.h[i] = 0.6 - joint * 0.5 + (fine[i] - 0.5) * 0.1 + (low[i] - 0.5) * 0.08;
      img.r[i] = 0.75 + joint * 0.2;
    }
    img.normalStrength = 1.8;
    return img;
  };

  // ---------------------------------------------------------------- metal
  // Painted steel deck: non-slip paint, welded plate seams, scuffed lanes, rust bleeding at the welds
  R.steelDeck = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 4, s), wear = field(n, 3, 4, s + 1), rust = field(n, 10, 4, s + 2), grit = field(n, 128, 1, s + 3);
    img.m = new Float32Array(n * n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n, v = y / n;
      const seamU = Math.min(fr(u * 2), 1 - fr(u * 2)), seamV = Math.min(v, 1 - v);
      const seam = 1 - sm(0.002, 0.008, Math.min(seamU, seamV));
      const weld = (1 - sm(0.004, 0.014, Math.min(seamU, seamV))) * (1 - seam);
      const rs = sm(0.6, 0.85, rust[i]) * (0.3 + weld * 1.5);
      const worn = sm(0.55, 0.75, wear[i]);
      const g = h32(x, y, s);
      const k = 0.9 + (low[i] - 0.5) * 0.12 + (g - 0.5) * 0.08;
      let r_ = 0.24 * k, g_ = 0.28 * k, b_ = 0.25 * k;
      r_ = lerp(r_, 0.32, worn * 0.6); g_ = lerp(g_, 0.32, worn * 0.6); b_ = lerp(b_, 0.32, worn * 0.6);
      r_ = lerp(r_, 0.32, rs); g_ = lerp(g_, 0.15, rs); b_ = lerp(b_, 0.07, rs);
      img.set(i, r_ * (1 - seam * 0.5), g_ * (1 - seam * 0.5), b_ * (1 - seam * 0.5));
      img.h[i] = 0.5 + (grit[i] - 0.5) * 0.18 + weld * 0.25 - seam * 0.4 + rs * 0.1;
      img.r[i] = 0.62 - worn * 0.2 + rs * 0.25;
      img.m[i] = worn * 0.5;
    }
    img.normalStrength = 1.4;
    return img;
  };
  // Painted bulkhead: plates with welded seams, a stiffener line, rust weeping from the seams; tinted per room
  R.shipPaint = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 4, s), rust = field(n, 12, 4, s + 2), drip = field(n, 40, 2, s + 4), blister = field(n, 24, 3, s + 5);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n, v = y / n;
      const su = Math.min(fr(u * 2), 1 - fr(u * 2)), sv = Math.min(fr(v * 1.5), 1 - fr(v * 1.5));
      const weld = 1 - sm(0.002, 0.009, Math.min(su, sv));
      // round-headed rivets along the seams: a low dome, not a flat-topped disc (which lights up as a ring)
      const rd = (fr(u * 24) < 0.5 && sv < 0.02) ? Math.hypot(fr(u * 24) - 0.25, sv * 12) / 0.24 : 1;
      const rivet = rd < 1 ? Math.sqrt(1 - rd * rd) * 0.7 : 0;
      // rust weeps downward from seams
      const below = Math.min(1, Math.max(0, fr(v * 1.5)));
      const weep = sm(0.55, 0.8, rust[i]) * (1 - sm(0.0, 0.25, below)) * sm(0.4, 0.7, drip[i]);
      const bl = sm(0.75, 0.9, blister[i]) * 0.5;
      const k = 0.93 + (low[i] - 0.5) * 0.1;
      img.set(i, lerp(0.86 * k, 0.4, weep), lerp(0.84 * k, 0.2, weep), lerp(0.78 * k, 0.1, weep));
      img.h[i] = 0.5 + weld * 0.25 + rivet * 0.4 + bl * 0.2 - weep * 0.05;
      img.r[i] = 0.42 + weep * 0.4 + bl * 0.1;
    }
    img.normalStrength = 1.5;
    return img;
  };
  R.rustSteel = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 5, s), mid = field(n, 8, 4, s + 1), flake = field(n, 40, 3, s + 2), paint = field(n, 4, 4, s + 3);
    img.m = new Float32Array(n * n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x;
      const p = sm(0.6, 0.66, paint[i]);          // patches of old paint left
      const fl = sm(0.55, 0.7, flake[i]);
      const k = 0.7 + (mid[i] - 0.5) * 0.5 + (low[i] - 0.5) * 0.3;
      let r_ = 0.36 * k, g_ = 0.17 * k, b_ = 0.08 * k;
      r_ = lerp(r_, 0.22, p); g_ = lerp(g_, 0.27, p); b_ = lerp(b_, 0.26, p);
      img.set(i, r_ * (1 - fl * 0.25), g_ * (1 - fl * 0.25), b_);
      img.h[i] = 0.5 + (mid[i] - 0.5) * 0.4 + fl * 0.3 + p * 0.15;
      img.r[i] = 0.85 - p * 0.35;
      img.m[i] = p * 0.2;
    }
    img.normalStrength = 2.2;
    return img;
  };
  R.corrugated = (n, s) => {
    const img = new FImg(n);
    const rust = field(n, 6, 4, s), streak = field(n, 48, 2, s + 1), low = field(n, 2, 3, s + 2);
    img.m = new Float32Array(n * n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n, v = y / n;
      const wave = Math.sin(u * Math.PI * 2 * 16);
      const sheet = Math.min(fr(u * 2), 1 - fr(u * 2)) < 0.006 ? 1 : 0;
      const rs = sm(0.58, 0.8, rust[i]) * (0.4 + sm(0.3, 0.7, streak[(y * n + (x & ~3)) % (n * n)]) * 0.6) * (0.5 + v * 0.5);
      const k = 0.62 + wave * 0.06 + (low[i] - 0.5) * 0.12;
      img.set(i, lerp(0.6 * k, 0.36, rs), lerp(0.62 * k, 0.18, rs), lerp(0.62 * k, 0.08, rs));
      img.h[i] = 0.5 + wave * 0.45 - sheet * 0.3;
      img.r[i] = 0.4 + rs * 0.45;
      img.m[i] = (1 - rs) * 0.7;
    }
    img.normalStrength = 1.6;
    return img;
  };

  // ---------------------------------------------------------------- wood
  // Horizontal round logs with pale chinking between them (one tile = 8 logs)
  R.logWall = (n, s) => {
    const img = new FImg(n);
    const grain = field(n, 6, 4, s), knots = field(n, 10, 3, s + 1), low = field(n, 2, 3, s + 2);
    const logs = 8;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n * logs, row = Math.floor(v), fv = v - row;
      const across = Math.sin(fv * Math.PI);                   // round profile
      const chink = 1 - sm(0.05, 0.11, Math.min(fv, 1 - fv));
      const tone = 0.85 + h32(row, 1, s) * 0.3;
      const g = Math.sin((x / n * 3 + grain[(row * 37 % n) * n + x] * 2 + fv * 0.6) * Math.PI * 8) * 0.5 + 0.5;
      const kn = sm(0.78, 0.86, knots[i]) * (1 - chink);
      const k = tone * (0.55 + across * 0.45) * (0.85 + g * 0.18) * (1 - kn * 0.45) * (0.95 + (low[i] - 0.5) * 0.15);
      img.set(i, lerp(0.42 * k, 0.62, chink), lerp(0.26 * k, 0.6, chink), lerp(0.14 * k, 0.55, chink));
      img.h[i] = across * 0.8 * (1 - chink) + chink * 0.15 + g * 0.06 - kn * 0.1;
      img.r[i] = 0.72 + chink * 0.2;
    }
    img.normalStrength = 2.4; img.aoStrength = 1.6;
    return img;
  };
  // Vertical tongue-and-groove panelling, varnished (train compartments, the lodge, old offices)
  R.woodPanel = (n, s) => {
    const img = new FImg(n);
    const grain = field(n, 4, 4, s), fine = field(n, 64, 2, s + 1), low = field(n, 2, 3, s + 2);
    const boards = 12;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n * boards, b = Math.floor(u), fu = u - b;
      const groove = 1 - sm(0.015, 0.05, Math.min(fu, 1 - fu));
      const tone = 0.82 + h32(b, 2, s) * 0.3;
      const g = Math.sin((y / n * 2 + grain[i] * 1.5 + b * 0.37) * Math.PI * 14) * 0.5 + 0.5;
      const k = tone * (0.86 + g * 0.16 + (fine[i] - 0.5) * 0.08) * (0.94 + (low[i] - 0.5) * 0.12) * (1 - groove * 0.6);
      img.set(i, 0.5 * k, 0.3 * k, 0.17 * k);
      img.h[i] = 0.6 - groove * 0.5 + g * 0.04;
      img.r[i] = 0.32 + groove * 0.4 + (1 - g) * 0.05;
    }
    img.normalStrength = 1.4;
    return img;
  };
  // Herringbone parquet
  R.parquet = (n, s) => {
    const img = new FImg(n);
    const grain = field(n, 8, 3, s), wear = field(n, 2, 4, s + 1), fine = field(n, 64, 2, s + 2);
    const bl = 1 / 8, bw = bl / 4;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n, v = y / n;
      // herringbone: rotate 45 degrees, alternate direction per column of blocks
      const a = (u + v) / Math.SQRT2 / bw, b2 = (v - u) / Math.SQRT2 / bw;
      const col = Math.floor(a), dir = col & 1;
      const along = dir ? b2 + col * 0.5 : b2 + col * 0.5 + 0.5, fa = fr(along / 4), fb = fr(a);
      const id = Math.floor(along / 4) * 31 + col * 7;
      const gap = 1 - sm(0.02, 0.06, Math.min(fb, 1 - fb, fa * 4, (1 - fa) * 4));
      const tone = 0.8 + h32(id, 3, s) * 0.3;
      const g = Math.sin((fa * 4 + grain[i]) * Math.PI * 6) * 0.5 + 0.5;
      const w = sm(0.55, 0.8, wear[i]);
      const k = tone * (0.86 + g * 0.14 + (fine[i] - 0.5) * 0.08) * (1 - gap * 0.65) * (1 + w * 0.12);
      img.set(i, 0.48 * k, 0.29 * k, 0.15 * k);
      img.h[i] = 0.6 - gap * 0.5 + g * 0.03;
      img.r[i] = 0.3 + w * 0.3 + gap * 0.3;
    }
    img.normalStrength = 1.3;
    return img;
  };
  // Weathered grey deck boards with gaps and nail heads (pier, boardwalk, porch, ferry promenade)
  R.boards = (n, s) => {
    const img = new FImg(n);
    const grain = field(n, 6, 4, s), lichen = field(n, 5, 3, s + 1), fine = field(n, 96, 2, s + 2), wet = field(n, 3, 3, s + 3);
    const boards = 8;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n * boards, b = Math.floor(v), fv = v - b;
      const gap = 1 - sm(0.03, 0.07, Math.min(fv, 1 - fv));
      const endU = fr(x / n * 2 + h32(b, 5, s));
      const butt = 1 - sm(0.003, 0.01, Math.min(endU, 1 - endU));
      const nail = (Math.min(endU, 1 - endU) < 0.03 && Math.abs(fv - 0.5) > 0.25 && Math.abs(fv - 0.5) < 0.33) ? 1 : 0;
      const tone = 0.75 + h32(b, 2, s) * 0.3;
      const g = Math.sin((x / n * 2 + grain[i] * 2 + b) * Math.PI * 10) * 0.5 + 0.5;
      const li = sm(0.66, 0.8, lichen[i]) * 0.5;
      const dk = sm(0.5, 0.75, wet[i]) * 0.3;
      const k = tone * (0.8 + g * 0.22 + (fine[i] - 0.5) * 0.12) * (1 - gap * 0.85) * (1 - butt * 0.6) * (1 - dk);
      img.set(i, lerp(0.46 * k, 0.4 * k, li) + nail * 0.08, lerp(0.43 * k, 0.45 * k, li) + nail * 0.06, lerp(0.39 * k, 0.3 * k, li) + nail * 0.05);
      img.h[i] = 0.6 - gap * 0.6 - butt * 0.3 + g * 0.12 + (fine[i] - 0.5) * 0.08 + nail * 0.1;
      img.r[i] = 0.82 - dk * 0.4;
    }
    img.normalStrength = 2; img.aoStrength = 1.3;
    return img;
  };

  // ---------------------------------------------------------------- masonry and plaster
  // Lime plaster over stone; with a flood line: below it, silt and a hard brown tide mark (Gammel Ostra)
  const plaster = flood => (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 4, s), mid = field(n, 8, 4, s + 1), fine = field(n, 64, 2, s + 2), spall = field(n, 5, 4, s + 3), damp = field(n, 3, 3, s + 4);
    const stones = worley(n, 9, s + 6, 0.7);
    const line = 0.62;                                          // tide mark height in the tile (tile = 3 m)
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n;
      const sp = sm(0.74, 0.77, spall[i]) * sm(0.6, 0.75, low[i]);  // plaster fallen off here and there: stone shows
      const joint = 1 - sm(0.02, 0.06, stones.f2[i] - stones.f1[i]);
      const k = 0.92 + (low[i] - 0.5) * 0.12 + (mid[i] - 0.5) * 0.08 + (fine[i] - 0.5) * 0.05;
      let r_ = 0.82 * k, g_ = 0.79 * k, b_ = 0.72 * k;
      const st = 0.42 + stones.id[i] * 0.15;
      r_ = lerp(r_, lerp(st, 0.2, joint), sp); g_ = lerp(g_, lerp(st * 0.95, 0.19, joint), sp); b_ = lerp(b_, lerp(st * 0.88, 0.17, joint), sp);
      const dm = sm(0.5, 0.9, damp[i]) * sm(0.35, 0.0, v) * 0.35;
      r_ *= 1 - dm; g_ *= 1 - dm * 0.9; b_ *= 1 - dm * 0.8;
      if (flood) {
        const wob = (mid[i] - 0.5) * 0.02;
        const under = 1 - sm(line - 0.004 + wob, line + 0.004 + wob, v);
        const mark = (1 - sm(0, 0.01, Math.abs(v - line - wob))) * 0.7;
        const silt = under * (0.55 + (1 - v / line) * 0.25);
        r_ = lerp(r_, 0.24 + fine[i] * 0.05, silt) - mark * 0.15; g_ = lerp(g_, 0.21 + fine[i] * 0.04, silt) - mark * 0.15; b_ = lerp(b_, 0.16, silt) - mark * 0.12;
      }
      img.set(i, r_, g_, b_);
      img.h[i] = 0.55 + (mid[i] - 0.5) * 0.2 + (fine[i] - 0.5) * 0.12 - sp * 0.25 - joint * sp * 0.2;
      img.r[i] = 0.88;
    }
    img.normalStrength = 1.8;
    return img;
  };
  R.plaster = plaster(false);
  R.plasterFlood = plaster(true);
  // Rough coursed stone (church, dam, quay walls)
  R.stoneWall = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 2, 4, s), fine = field(n, 48, 3, s + 1), lichen = field(n, 4, 4, s + 2);
    const rows = 7;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, v = y / n * rows, row = Math.floor(v), fv = v - row;
      const len = 1.6 + h32(row, 9, s) * 1.2;
      const u = x / n * len * 2 + h32(row, 3, s) * 3, col = Math.floor(u), fu = u - col;
      const id = h32(col + row * 41, row, s);
      const mortar = 1 - sm(0.04, 0.1, Math.min(fv, 1 - fv, fu * 0.6, (1 - fu) * 0.6));
      const bulge = Math.sin(fv * Math.PI) * Math.sin(fu * Math.PI);
      const li = sm(0.66, 0.8, lichen[i]) * (1 - mortar);
      const k = (0.62 + id * 0.3) * (0.9 + (fine[i] - 0.5) * 0.25) * (0.95 + (low[i] - 0.5) * 0.15);
      img.set(i, lerp(lerp(0.44 * k, 0.32, mortar), 0.4, li * 0.5), lerp(lerp(0.42 * k, 0.31, mortar), 0.42, li * 0.5), lerp(lerp(0.38 * k, 0.28, mortar), 0.26, li * 0.5));
      img.h[i] = (1 - mortar) * (0.5 + bulge * 0.4) + (fine[i] - 0.5) * 0.15;
      img.r[i] = 0.85 + mortar * 0.1;
    }
    img.normalStrength = 2.6; img.aoStrength = 1.5;
    return img;
  };
  // Faded floral wallpaper with damp stains and a dado line (grandmother's house, lodge rooms)
  R.wallpaperFloral = (n, s) => {
    const img = new FImg(n);
    const low = field(n, 3, 4, s), stain = field(n, 4, 4, s + 1), paper = field(n, 160, 1, s + 2);
    const rep = 6;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n * rep, v = y / n * rep;
      const cx = fr(u) - 0.5, cy = fr(v + (Math.floor(u) & 1) * 0.5) - 0.5;
      const r = Math.hypot(cx, cy), a = Math.atan2(cy, cx);
      const petal = (1 - sm(0.12, 0.2, r - Math.cos(a * 5) * 0.05)) * sm(0.02, 0.05, r);
      const heart = 1 - sm(0.025, 0.04, r);
      const leaf = (1 - sm(0.02, 0.04, Math.abs(cy + cx * 0.6 - 0.28))) * sm(0.15, 0.35, cx + 0.5) * (1 - sm(0.35, 0.45, Math.abs(cx)));
      const stripe = 1 - sm(0.005, 0.012, Math.abs(fr(u * 2) - 0.5));
      const st = sm(0.6, 0.85, stain[i]) * 0.4;
      const k = (0.94 + (low[i] - 0.5) * 0.12 + (paper[i] - 0.5) * 0.05) * (1 - st);
      let r_ = 0.78, g_ = 0.72, b_ = 0.6;
      r_ = lerp(r_, 0.62, petal); g_ = lerp(g_, 0.4, petal); b_ = lerp(b_, 0.38, petal);
      r_ = lerp(r_, 0.75, heart * 0.6); g_ = lerp(g_, 0.6, heart * 0.6); b_ = lerp(b_, 0.3, heart * 0.6);
      r_ = lerp(r_, 0.45, leaf * 0.6); g_ = lerp(g_, 0.52, leaf * 0.6); b_ = lerp(b_, 0.38, leaf * 0.6);
      r_ -= stripe * 0.04; g_ -= stripe * 0.04;
      img.set(i, r_ * k, g_ * k * (1 - st * 0.2), b_ * k * (1 - st * 0.4));
      img.h[i] = 0.5 + (paper[i] - 0.5) * 0.15 + petal * 0.05;
      img.r[i] = 0.86;
    }
    img.normalStrength = 1.2;
    return img;
  };

  // ---------------------------------------------------------------- fabric
  // Tent canvas: wide red and cream stripes, coarse weave, sagging dirt (the carnival)
  R.canvas = (n, s) => {
    const img = new FImg(n);
    const dirt = field(n, 3, 4, s), fine = field(n, 128, 1, s + 1), sag = field(n, 2, 3, s + 2);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = x / n;
      const red = fr(u * 4) < 0.5;
      const weave = ((x >> 1) + (y >> 1)) & 1 ? 0.04 : -0.04;
      const d = sm(0.5, 0.85, dirt[i]) * 0.35 + sm(0.6, 0.9, 1 - y / n) * 0.1;
      const k = (0.9 + weave + (fine[i] - 0.5) * 0.1) * (1 - d);
      if (red) img.set(i, 0.55 * k, 0.07 * k, 0.06 * k); else img.set(i, 0.85 * k, 0.8 * k, 0.68 * k);
      img.h[i] = 0.5 + weave + (sag[i] - 0.5) * 0.3;
      img.r[i] = 0.92;
    }
    img.normalStrength = 1;
    return img;
  };
  // Train moquette: a small repeating diamond in wine and gold on dark blue
  R.trainCarpet = (n, s) => {
    const img = new FImg(n);
    const wear = field(n, 3, 4, s), fine = field(n, 96, 2, s + 1);
    const rep = 10;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, u = fr(x / n * rep) - 0.5, v = fr(y / n * rep) - 0.5;
      const dia = Math.abs(u) + Math.abs(v);
      const ring = 1 - sm(0.02, 0.05, Math.abs(dia - 0.3));
      const dot = 1 - sm(0.06, 0.09, dia);
      const w = sm(0.55, 0.8, wear[i]);
      const pile = 0.85 + h32(x, y, s) * 0.2 + (fine[i] - 0.5) * 0.1;
      let r_ = 0.06, g_ = 0.07, b_ = 0.16;
      r_ = lerp(r_, 0.4, ring); g_ = lerp(g_, 0.08, ring); b_ = lerp(b_, 0.12, ring);
      r_ = lerp(r_, 0.6, dot); g_ = lerp(g_, 0.45, dot); b_ = lerp(b_, 0.18, dot);
      const k = pile * (1 - w * 0.25);
      img.set(i, r_ * k + w * 0.03, g_ * k + w * 0.03, b_ * k + w * 0.02);
      img.h[i] = h32(x, y, s + 1) * 0.5 + ring * 0.1;
      img.r[i] = 0.95;
    }
    img.normalStrength = 1.8;
    return img;
  };

  Object.assign(T.SCALE, {
    snow: 3, ice: 4, mud: 3, gravel: 1.6, ballast: 1.4, forestFloor: 2.4, rock: 4, cobbles: 1.6, flagstone: 3,
    steelDeck: 3, shipPaint: 3, rustSteel: 2, corrugated: 2.4, logWall: 2.4, woodPanel: 1.6, parquet: 2,
    boards: 2.4, plaster: 3, plasterFlood: 3, stoneWall: 3, wallpaperFloral: 1.6, canvas: 3, trainCarpet: 1.4,
  });
})(typeof window !== 'undefined' ? window : globalThis);
