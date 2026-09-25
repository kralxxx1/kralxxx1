/* Sample-level sound synthesis. Every sound is rendered into an AudioBuffer once (with several
   random variants) and then played through the positional audio graph in audio.js.
   Nothing is recorded: footsteps, doors, rain, hum, thunder, breathing, radio voices and the
   rest are modelled from noise, resonators and modal partials. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U;
  const TAU = Math.PI * 2;

  // ------------------------------------------------------------ DSP helpers (Float32Array in/out)
  function biquad(x, type, f, q = 0.707, sr, gainDb = 0) {
    const w = TAU * Math.min(f, sr * 0.45) / sr, cw = Math.cos(w), sw = Math.sin(w), a = sw / (2 * q);
    let b0, b1, b2, a0, a1, a2;
    const A = Math.pow(10, gainDb / 40);
    switch (type) {
      case 'lp': b0 = (1 - cw) / 2; b1 = 1 - cw; b2 = (1 - cw) / 2; a0 = 1 + a; a1 = -2 * cw; a2 = 1 - a; break;
      case 'hp': b0 = (1 + cw) / 2; b1 = -(1 + cw); b2 = (1 + cw) / 2; a0 = 1 + a; a1 = -2 * cw; a2 = 1 - a; break;
      case 'bp': b0 = a; b1 = 0; b2 = -a; a0 = 1 + a; a1 = -2 * cw; a2 = 1 - a; break;
      case 'peak': b0 = 1 + a * A; b1 = -2 * cw; b2 = 1 - a * A; a0 = 1 + a / A; a1 = -2 * cw; a2 = 1 - a / A; break;
      default: return x;
    }
    b0 /= a0; b1 /= a0; b2 /= a0; a1 /= a0; a2 /= a0;
    const y = new Float32Array(x.length);
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    for (let i = 0; i < x.length; i++) {
      const v = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
      x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v;
    }
    return y;
  }
  // Time-varying biquad (cutoff follows fn(t) in 0..1 of the buffer), for sweeps
  function sweep(x, type, fFn, q, sr) {
    const y = new Float32Array(x.length);
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0, b0 = 0, b1 = 0, b2 = 0, a1 = 0, a2 = 0;
    for (let i = 0; i < x.length; i++) {
      if ((i & 31) === 0) {
        const f = Math.max(20, fFn(i / x.length)), w = TAU * Math.min(f, sr * 0.45) / sr, cw = Math.cos(w), sw = Math.sin(w), al = sw / (2 * q);
        let c0, c1, c2; const a0 = 1 + al;
        if (type === 'lp') { c0 = (1 - cw) / 2; c1 = 1 - cw; c2 = c0; } else if (type === 'hp') { c0 = (1 + cw) / 2; c1 = -(1 + cw); c2 = c0; } else { c0 = al; c1 = 0; c2 = -al; }
        b0 = c0 / a0; b1 = c1 / a0; b2 = c2 / a0; a1 = -2 * cw / a0; a2 = (1 - al) / a0;
      }
      const v = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
      x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v;
    }
    return y;
  }
  const white = (n, r) => { const a = new Float32Array(n); for (let i = 0; i < n; i++) a[i] = r() * 2 - 1; return a; };
  function pink(n, r) {
    const a = new Float32Array(n); let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < n; i++) {
      const w = r() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852; b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
      a[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
    }
    return a;
  }
  function brown(n, r) { const a = new Float32Array(n); let l = 0; for (let i = 0; i < n; i++) { l = (l + 0.02 * (r() * 2 - 1)) / 1.02; a[i] = l * 3.5; } return a; }
  // Multiply by an exponential decay starting at t0 (seconds)
  function decay(x, sr, tau, t0 = 0, attack = 0.001) {
    const i0 = Math.floor(t0 * sr);
    for (let i = 0; i < x.length; i++) {
      if (i < i0) { x[i] = 0; continue; }
      const t = (i - i0) / sr;
      x[i] *= Math.min(1, t / attack) * Math.exp(-t / tau);
    }
    return x;
  }
  function add(dst, src, gain = 1, offset = 0) { for (let i = 0; i < src.length && i + offset < dst.length; i++) if (i + offset >= 0) dst[i + offset] += src[i] * gain; return dst; }
  function normalize(x, peak = 0.9) { let m = 0; for (let i = 0; i < x.length; i++) m = Math.max(m, Math.abs(x[i])); if (m > 0) { const k = peak / m; for (let i = 0; i < x.length; i++) x[i] *= k; } return x; }
  // Sum of exponentially decaying sine partials: [[freq, tau, amp], ...]
  function modes(n, sr, list, t0 = 0, r) {
    const a = new Float32Array(n), i0 = Math.floor(t0 * sr);
    for (const [f, tau, amp] of list) {
      const ph = r ? r() * TAU : 0, w = TAU * f / sr;
      for (let i = i0; i < n; i++) { const t = (i - i0) / sr, e = Math.exp(-t / tau); if (e < 1e-4) break; a[i] += Math.sin(w * (i - i0) + ph) * e * amp; }
    }
    return a;
  }
  // Short noise click shaped by a filter
  function hit(n, sr, r, t0, amp, type, f, q, tau) {
    const x = decay(biquad(white(n, r), type, f, q, sr), sr, tau, t0, 0.0004);
    for (let i = 0; i < n; i++) x[i] *= amp;
    return x;
  }
  // Sparse random impulses (crackle): rate per second
  function crackle(n, sr, r, rate, ampFn) {
    const a = new Float32Array(n);
    let i = 0;
    while (i < n) { i += Math.floor(-Math.log(1 - r()) / rate * sr); if (i < n) a[i] = (r() * 2 - 1) * (ampFn ? ampFn(i / n) : 1); }
    return a;
  }
  // Loop-safe: crossfade the tail into the head
  function loopify(x, sr, fade = 0.5) {
    const f = Math.floor(fade * sr), n = x.length - f;
    const y = new Float32Array(n);
    for (let i = 0; i < n; i++) y[i] = x[i];
    for (let i = 0; i < f; i++) { const k = i / f; y[i] = x[i] * k + x[n + i] * (1 - k); }
    return y;
  }
  function softclip(x, drive = 1) { for (let i = 0; i < x.length; i++) x[i] = Math.tanh(x[i] * drive); return x; }

  // ------------------------------------------------------------ SOUND RECIPES
  // Each recipe: (sr, r, variant) -> Float32Array | [Float32Array, Float32Array]
  const R = {};
  const S = s => Math.floor(s);

  // --- Footsteps: heel + toe, per surface
  function step(sr, r, surf) {
    const n = S(sr * (surf === 'water' || surf === 'puddle' ? 0.5 : surf === 'metal' ? 0.6 : 0.3));
    const out = new Float32Array(n);
    const toe = 0.045 + r() * 0.035, v = 0.85 + r() * 0.3;
    const heel = (t0, amp) => {
      switch (surf) {
        case 'carpet': case 'wetCarpet':
          add(out, hit(n, sr, r, t0, amp, 'lp', 260 * v, 0.8, 0.028));
          add(out, modes(n, sr, [[62 * v, 0.03, amp * 0.7]], t0));
          add(out, hit(n, sr, r, t0 + 0.012, amp * 0.1, 'bp', 3200 * v, 0.8, 0.05));
          if (surf === 'wetCarpet') {
            add(out, decay(biquad(white(n, r), 'bp', 900 * v, 2, sr), sr, 0.07, t0 + 0.01, 0.02), amp * 0.35);
            for (let k = 0; k < 3; k++) { const t = t0 + 0.03 + r() * 0.08, f0 = 700 + r() * 600; const b = new Float32Array(n); const i0 = S(t * sr); for (let i = i0; i < Math.min(n, i0 + S(0.025 * sr)); i++) { const tt = (i - i0) / sr; b[i] = Math.sin(TAU * (f0 * tt + 9000 * tt * tt)) * Math.exp(-tt / 0.008); } add(out, b, amp * 0.12); }
          }
          break;
        case 'concrete':
          add(out, hit(n, sr, r, t0, amp * 0.8, 'hp', 2800 * v, 0.7, 0.004));
          add(out, hit(n, sr, r, t0, amp, 'lp', 900 * v, 0.8, 0.018));
          add(out, decay(biquad(crackle(n, sr, r, 700), 'hp', 4000, 0.7, sr), sr, 0.03, t0), amp * 0.5);
          break;
        case 'tile': case 'lino':
          add(out, hit(n, sr, r, t0, amp * 0.7, 'hp', 2500 * v, 0.7, 0.003));
          add(out, modes(n, sr, surf === 'tile' ? [[2100 * v, 0.012, amp * 0.25], [3400 * v, 0.009, amp * 0.2], [5200 * v, 0.006, amp * 0.12]] : [[1200 * v, 0.01, amp * 0.15]], t0, r));
          add(out, hit(n, sr, r, t0, amp * 0.8, 'lp', 650 * v, 0.8, 0.016));
          if (surf === 'lino' && r() < 0.18) { const b = new Float32Array(n), i0 = S((t0 + 0.02) * sr), f0 = 1700 + r() * 700; for (let i = i0; i < Math.min(n, i0 + S(0.08 * sr)); i++) { const tt = (i - i0) / sr; b[i] = Math.sin(TAU * (f0 * tt + 2500 * tt * tt)) * Math.sin(Math.PI * tt / 0.08) * 0.5; } add(out, b, amp * 0.18); }
          break;
        case 'wood':
          add(out, modes(n, sr, [[150 * v, 0.05, amp * 0.6], [340 * v, 0.035, amp * 0.4], [720 * v, 0.022, amp * 0.25], [1500 * v, 0.012, amp * 0.15]], t0, r));
          add(out, hit(n, sr, r, t0, amp * 0.6, 'lp', 1400, 0.8, 0.01));
          break;
        case 'metal': case 'grate':
          add(out, modes(n, sr, [[310 * v, 0.22, amp * 0.3], [780 * v, 0.16, amp * 0.25], [1450 * v, 0.1, amp * 0.18], [2380 * v, 0.07, amp * 0.12], [3700 * v, 0.05, amp * 0.08]], t0, r));
          add(out, hit(n, sr, r, t0, amp * 0.8, 'bp', 2400, 1, 0.006));
          add(out, hit(n, sr, r, t0, amp * 0.7, 'lp', 400, 0.8, 0.02));
          break;
        case 'water': case 'puddle': {
          const k = surf === 'puddle' ? 0.6 : 1;
          add(out, decay(sweep(white(n, r), 'bp', t => 3200 - 2600 * Math.min(1, t * 3), 1.2, sr), sr, 0.09 * k + 0.03, t0, 0.008), amp * 0.9);
          add(out, hit(n, sr, r, t0, amp * 0.5, 'lp', 300, 0.8, 0.05));
          for (let q = 0; q < 6 * k; q++) { const b = new Float32Array(n), i0 = S((t0 + 0.02 + r() * 0.2) * sr), f0 = 400 + r() * 900, L = S((0.015 + r() * 0.03) * sr); for (let i = i0; i < Math.min(n, i0 + L); i++) { const tt = (i - i0) / sr; b[i] = Math.sin(TAU * (f0 * tt + 14000 * tt * tt)) * Math.exp(-tt / 0.012); } add(out, b, amp * 0.15); }
          break;
        }
        default: add(out, hit(n, sr, r, t0, amp, 'lp', 900, 0.8, 0.02));
      }
    };
    heel(0, 1);
    heel(toe, 0.55);
    return normalize(out, 0.85);
  }
  for (const s of ['carpet', 'wetCarpet', 'concrete', 'tile', 'lino', 'wood', 'metal', 'water', 'puddle']) R['step_' + s] = (sr, r) => step(sr, r, s);

  // --- Breathing through formants
  function breathe(sr, r, inhale, heavy) {
    const d = inhale ? 0.55 + r() * 0.2 : 0.7 + r() * 0.3, n = S(sr * d);
    const src = pink(n, r);
    let out = new Float32Array(n);
    const F = inhale ? [[650, 4, 0.6], [1350, 5, 0.5], [2600, 6, 0.3]] : [[520, 4, 0.7], [1100, 5, 0.45], [2300, 6, 0.25]];
    for (const [f, q, g] of F) add(out, biquad(src, 'bp', f * (0.9 + r() * 0.2), q, sr), g);
    out = biquad(out, 'hp', 180, 0.7, sr);
    for (let i = 0; i < n; i++) { const t = i / n; out[i] *= Math.pow(Math.sin(Math.PI * Math.pow(t, inhale ? 0.7 : 0.45)), heavy ? 1.2 : 1.8); }
    if (heavy && !inhale) { const v = modes(n, sr, [[140 + r() * 30, 0.2, 0.02]], 0.05); add(out, v, 1); }
    return normalize(out, 0.7);
  }
  R.breathIn = (sr, r) => breathe(sr, r, true, false);
  R.breathOut = (sr, r) => breathe(sr, r, false, false);
  R.breathInHeavy = (sr, r) => breathe(sr, r, true, true);
  R.breathOutHeavy = (sr, r) => breathe(sr, r, false, true);
  R.heartbeat = (sr, r) => {
    const n = S(sr * 0.5), out = new Float32Array(n);
    for (const [t0, a] of [[0, 1], [0.17, 0.65]]) {
      const b = new Float32Array(n), i0 = S(t0 * sr);
      for (let i = i0; i < n; i++) { const t = (i - i0) / sr; b[i] = Math.sin(TAU * (52 * t - 30 * t * t)) * Math.exp(-t / 0.055) * Math.min(1, t / 0.004); }
      add(out, b, a); add(out, hit(n, sr, r, t0, a * 0.4, 'lp', 120, 0.8, 0.03));
    }
    return normalize(out, 0.9);
  };

  // --- Doors
  // Friction creak: stick-slip pulse train through wood/metal resonances
  function creak(n, sr, r, t0, dur, rateA, rateB, reson, amp) {
    const x = new Float32Array(n);
    let i = S(t0 * sr);
    const end = Math.min(n, S((t0 + dur) * sr));
    while (i < end) {
      const k = (i / sr - t0) / dur;
      const rate = rateA + (rateB - rateA) * k + Math.sin(k * 23) * 8;
      x[i] = (0.6 + r() * 0.8) * Math.sin(Math.PI * k);
      i += Math.max(1, Math.floor(sr / Math.max(8, rate) * (0.8 + r() * 0.4)));
    }
    let y = new Float32Array(n);
    for (const [f, q, g] of reson) add(y, biquad(x, 'bp', f, q, sr), g);
    for (let q = 0; q < n; q++) y[q] *= amp;
    return y;
  }
  R.doorWoodOpen = (sr, r) => {
    const n = S(sr * 1.4), out = new Float32Array(n);
    add(out, modes(n, sr, [[2300, 0.01, 0.4], [3900, 0.008, 0.3], [1100, 0.02, 0.25]], 0, r)); // latch
    add(out, hit(n, sr, r, 0, 0.3, 'bp', 1800, 2, 0.01));
    add(out, creak(n, sr, r, 0.12, 0.8 + r() * 0.3, 30 + r() * 20, 90 + r() * 60, [[420 + r() * 80, 12, 1], [980 + r() * 150, 14, 0.7], [1900, 10, 0.3]], 0.9));
    return normalize(out, 0.85);
  };
  R.doorWoodClose = (sr, r) => {
    const n = S(sr * 0.8), out = new Float32Array(n);
    add(out, creak(n, sr, r, 0, 0.3, 80, 40, [[500, 10, 1], [1100, 12, 0.5]], 0.4));
    add(out, hit(n, sr, r, 0.32, 1, 'lp', 180, 0.8, 0.09));
    add(out, modes(n, sr, [[120, 0.08, 0.5], [260, 0.05, 0.3]], 0.32));
    add(out, modes(n, sr, [[2600, 0.008, 0.3], [4100, 0.006, 0.2]], 0.34, r));
    return normalize(out, 0.9);
  };
  R.doorMetalOpen = (sr, r) => {
    const n = S(sr * 1.8), out = new Float32Array(n);
    add(out, modes(n, sr, [[880, 0.05, 0.5], [2300, 0.03, 0.4], [4100, 0.02, 0.2]], 0, r)); // push bar clack
    add(out, hit(n, sr, r, 0, 0.6, 'bp', 1400, 1.5, 0.015));
    // Hinge squeal: a slowly bending sine with rough vibrato
    const sq = new Float32Array(n), i0 = S(0.15 * sr), L = S((0.9 + r() * 0.4) * sr), f0 = 900 + r() * 500;
    let ph = 0;
    for (let i = i0; i < Math.min(n, i0 + L); i++) { const t = (i - i0) / L; const f = f0 * (1 + 0.25 * t) * (1 + 0.012 * Math.sin(i / sr * TAU * 23) + 0.01 * (r() - 0.5)); ph += TAU * f / sr; sq[i] = Math.sin(ph) * Math.sin(Math.PI * t) * (0.6 + 0.4 * Math.sin(t * 17)); }
    add(out, biquad(sq, 'bp', f0 * 1.1, 1.5, sr), 0.25);
    add(out, creak(n, sr, r, 0.12, 1.0, 20, 50, [[300, 8, 0.6], [760, 10, 0.4]], 0.5));
    return normalize(out, 0.85);
  };
  R.doorMetalClose = (sr, r) => {
    const n = S(sr * 2.2), out = new Float32Array(n);
    add(out, hit(n, sr, r, 0, 1, 'lp', 110, 0.7, 0.35));
    add(out, modes(n, sr, [[95, 0.5, 0.6], [180, 0.4, 0.4], [410, 0.25, 0.3], [930, 0.15, 0.2], [1870, 0.1, 0.12], [3100, 0.06, 0.08]], 0, r));
    add(out, modes(n, sr, [[2900, 0.01, 0.4], [4600, 0.008, 0.3]], 0.02, r));
    return normalize(out, 0.95);
  };
  R.doorLocked = (sr, r) => {
    const n = S(sr * 0.55), out = new Float32Array(n);
    for (const t of [0, 0.13 + r() * 0.04, 0.3 + r() * 0.05]) {
      add(out, modes(n, sr, [[1500 + r() * 300, 0.012, 0.5], [3300 + r() * 400, 0.008, 0.35], [650, 0.02, 0.3]], t, r));
      add(out, hit(n, sr, r, t, 0.4, 'bp', 2200, 2, 0.01));
    }
    return normalize(out, 0.8);
  };
  R.doorGlass = (sr, r) => {
    const n = S(sr * 0.9), out = new Float32Array(n);
    add(out, modes(n, sr, [[1900, 0.12, 0.3], [3700, 0.09, 0.25], [5600, 0.06, 0.15], [7400, 0.04, 0.1]], 0, r));
    add(out, hit(n, sr, r, 0, 0.5, 'lp', 250, 0.8, 0.06));
    for (let k = 0; k < 5; k++) add(out, modes(n, sr, [[4200 + r() * 3000, 0.01, 0.1]], 0.05 + r() * 0.3, r));
    return normalize(out, 0.8);
  };

  // --- Foley
  R.paper = (sr, r) => {
    const n = S(sr * (0.35 + r() * 0.25));
    const cr = crackle(n, sr, r, 1800, t => Math.pow(Math.sin(Math.PI * t), 0.6) * (0.4 + 0.6 * Math.abs(Math.sin(t * 13))));
    let out = new Float32Array(n);
    add(out, biquad(cr, 'bp', 3500, 0.8, sr), 1);
    add(out, biquad(cr, 'bp', 7000, 1, sr), 0.5);
    const rustle = biquad(pink(n, r), 'bp', 2500, 0.6, sr);
    for (let i = 0; i < n; i++) rustle[i] *= Math.sin(Math.PI * i / n) * 0.3;
    add(out, rustle, 1);
    return normalize(out, 0.7);
  };
  R.cloth = (sr, r) => {
    const n = S(sr * 0.3), x = biquad(pink(n, r), 'bp', 1800 + r() * 800, 0.7, sr);
    for (let i = 0; i < n; i++) x[i] *= Math.pow(Math.sin(Math.PI * i / n), 1.5);
    return normalize(x, 0.5);
  };
  R.keys = (sr, r) => {
    const n = S(sr * 0.6), out = new Float32Array(n);
    for (let k = 0; k < 14; k++) add(out, modes(n, sr, [[2800 + r() * 4500, 0.03 + r() * 0.06, 0.3], [5000 + r() * 4000, 0.02, 0.15]], r() * 0.35, r));
    add(out, R.cloth(sr, r), 0.4);
    return normalize(out, 0.7);
  };
  R.clink = (sr, r) => { const n = S(sr * 0.35), out = modes(n, sr, [[3100 + r() * 800, 0.05, 0.4], [6200 + r() * 900, 0.03, 0.2], [1200, 0.02, 0.2]], 0, r); add(out, R.cloth(sr, r), 0.5); return normalize(out, 0.6); };
  R.plasticTap = (sr, r) => { const n = S(sr * 0.25), out = modes(n, sr, [[900 + r() * 300, 0.02, 0.4], [2100 + r() * 400, 0.012, 0.3]], 0, r); add(out, hit(n, sr, r, 0, 0.4, 'bp', 1600, 1, 0.008)); add(out, R.cloth(sr, r), 0.5); return normalize(out, 0.6); };
  R.flashClick = (sr, r) => { const n = S(sr * 0.12), out = new Float32Array(n); for (const t of [0, 0.045 + r() * 0.01]) { add(out, modes(n, sr, [[3200, 0.004, 0.5], [5400, 0.003, 0.3], [1800, 0.006, 0.3]], t, r)); add(out, hit(n, sr, r, t, 0.4, 'hp', 3000, 0.7, 0.002)); } return normalize(out, 0.7); };
  R.tapeClunk = (sr, r) => { const n = S(sr * 0.5), out = new Float32Array(n); add(out, modes(n, sr, [[700, 0.03, 0.5], [1900, 0.02, 0.3], [3300, 0.01, 0.2]], 0, r)); add(out, hit(n, sr, r, 0, 0.6, 'lp', 400, 0.8, 0.03)); add(out, modes(n, sr, [[1100, 0.02, 0.2]], 0.18, r)); return normalize(out, 0.7); };
  R.switchThunk = (sr, r) => { const n = S(sr * 0.8), out = new Float32Array(n); add(out, modes(n, sr, [[160, 0.12, 0.6], [420, 0.06, 0.4], [1300, 0.02, 0.3]], 0, r)); add(out, hit(n, sr, r, 0, 0.8, 'bp', 900, 1, 0.02)); add(out, biquad(crackle(n, sr, r, 3000, t => Math.exp(-t * 6)), 'hp', 3000, 0.7, sr), 0.25); return normalize(out, 0.9); };

  // --- Weather
  R.thunder = (sr, r) => {
    const d = 7 + r() * 3, n = S(sr * d);
    const L = new Float32Array(n), Rt = new Float32Array(n);
    const crack = r() < 0.5;
    for (const ch of [L, Rt]) {
      let b = brown(n, r);
      b = sweep(b, 'lp', t => 420 * Math.exp(-t * 2.2) + 70, 0.6, sr);
      const swells = 5 + (r() * 4 | 0), env = new Float32Array(n);
      for (let k = 0; k < swells; k++) { const c = (0.05 + r() * 0.7) * n, w = (0.05 + r() * 0.2) * n, a = 0.4 + r() * 0.6; for (let i = 0; i < n; i++) { const z = (i - c) / w; env[i] += a * Math.exp(-z * z); } }
      for (let i = 0; i < n; i++) ch[i] = b[i] * env[i] * Math.min(1, i / (sr * 0.2)) * Math.exp(-i / n * 1.5);
      if (crack) add(ch, decay(biquad(white(n, r), 'hp', 1200, 0.7, sr), sr, 0.12, 0.02, 0.005), 0.4);
    }
    normalize(L, 0.95); normalize(Rt, 0.95);
    return [L, Rt];
  };
  // Rain heard from indoors through glass: dense drops, low roar
  R.rainInside = (sr, r) => {
    const n = S(sr * 10.5), out = [new Float32Array(n), new Float32Array(n)];
    for (const ch of out) {
      add(ch, biquad(biquad(pink(n, r), 'lp', 2200, 0.7, sr), 'hp', 120, 0.7, sr), 0.5);
      add(ch, biquad(brown(n, r), 'lp', 160, 0.7, sr), 0.4);
      add(ch, biquad(crackle(n, sr, r, 900, () => 0.3 + r() * 0.7), 'bp', 2400, 0.9, sr), 0.55);
    }
    return out.map(c => normalize(loopify(c, sr, 0.5), 0.7));
  };
  // Close rain ticking on the storefront glass
  R.rainGlass = (sr, r) => {
    const n = S(sr * 8.5), out = [new Float32Array(n), new Float32Array(n)];
    for (const ch of out) {
      let i = 0;
      while (i < n) {
        i += Math.floor(-Math.log(1 - r()) / 45 * sr);
        if (i >= n) break;
        const f = 2200 + r() * 3800, a = 0.2 + r() * 0.8, L = S(0.02 * sr), w = TAU * f / sr;
        for (let k = 0; k < L && i + k < n; k++) ch[i + k] += Math.sin(w * k) * Math.exp(-k / (0.004 * sr)) * a;
      }
      add(ch, biquad(pink(n, r), 'bp', 4000, 0.5, sr), 0.08);
    }
    return out.map(c => normalize(loopify(c, sr, 0.4), 0.6));
  };
  R.gutter = (sr, r) => {
    const n = S(sr * 6.5), out = new Float32Array(n);
    const w = biquad(white(n, r), 'bp', 900, 0.8, sr);
    for (let i = 0; i < n; i++) w[i] *= 0.6 + 0.4 * Math.sin(i / sr * TAU * (3 + Math.sin(i / sr) * 1.5));
    add(out, w, 0.6);
    for (let k = 0; k < 40; k++) { const b = new Float32Array(n), i0 = S(r() * n), f0 = 300 + r() * 500, L = S((0.03 + r() * 0.05) * sr); for (let i = i0; i < Math.min(n, i0 + L); i++) { const tt = (i - i0) / sr; b[i] = Math.sin(TAU * (f0 * tt + 5000 * tt * tt)) * Math.exp(-tt / 0.02); } add(out, b, 0.25); }
    return normalize(loopify(out, sr, 0.4), 0.6);
  };
  R.carPass = (sr, r) => {
    const d = 6, n = S(sr * d), L = new Float32Array(n), Rt = new Float32Array(n);
    const hiss = biquad(biquad(white(n, r), 'bp', 2200, 0.5, sr), 'hp', 700, 0.7, sr);
    const spray = biquad(pink(n, r), 'hp', 3000, 0.7, sr);
    const eng = new Float32Array(n); let ph = 0;
    for (let i = 0; i < n; i++) { const t = i / n, f = 48 * (1.1 - 0.2 * t); ph += TAU * f / sr; eng[i] = (Math.sin(ph) + 0.5 * Math.sin(ph * 2) + 0.25 * Math.sin(ph * 3)) * 0.3; }
    const engF = biquad(eng, 'lp', 300, 0.7, sr);
    for (let i = 0; i < n; i++) {
      const t = i / n, bell = Math.exp(-Math.pow((t - 0.5) * 5, 2)), pan = U.clamp((t - 0.5) * 3, -1, 1);
      const v = hiss[i] * bell * 0.8 + spray[i] * bell * bell * 0.4 + engF[i] * (0.3 + bell * 0.7);
      L[i] = v * (0.5 - pan * 0.4); Rt[i] = v * (0.5 + pan * 0.4);
    }
    return [normalize(L, 0.8), normalize(Rt, 0.8)];
  };

  // --- Room tones (loops)
  R.fluorescent = (sr, r) => {
    const n = S(sr * 4), out = new Float32Array(n);
    const H = [[120, 0.5], [240, 0.35], [360, 0.2], [480, 0.12], [600, 0.08], [720, 0.06], [960, 0.03], [1200, 0.02]];
    for (const [f, a] of H) { const w = TAU * f / sr, ph = r() * TAU; for (let i = 0; i < n; i++) out[i] += Math.sin(w * i + ph) * a; }
    // Ballast buzz: clipped 120 Hz with rattling harmonics
    const bz = new Float32Array(n); for (let i = 0; i < n; i++) bz[i] = Math.sign(Math.sin(TAU * 120 * i / sr)) * 0.1;
    add(out, biquad(bz, 'bp', 3000, 3, sr), 0.4);
    add(out, biquad(white(n, r), 'bp', 9000, 3, sr), 0.02);
    add(out, biquad(crackle(n, sr, r, 3, () => 0.5 + r() * 0.5), 'bp', 2500, 1, sr), 0.6);
    for (let i = 0; i < n; i++) out[i] *= 1 + 0.08 * Math.sin(TAU * 0.5 * i / sr);
    return normalize(out, 0.5);
  };
  R.hvac = (sr, r) => {
    const n = S(sr * 9), out = new Float32Array(n);
    add(out, biquad(brown(n, r), 'lp', 260, 0.7, sr), 0.8);
    add(out, biquad(pink(n, r), 'bp', 700, 0.5, sr), 0.15);
    const w = TAU * 47 / sr; for (let i = 0; i < n; i++) out[i] += Math.sin(w * i) * 0.04 * (1 + 0.3 * Math.sin(i / sr * 0.7));
    return normalize(loopify(out, sr, 1), 0.5);
  };
  R.poolRoom = (sr, r) => {
    const n = S(sr * 12), out = new Float32Array(n);
    const lap = biquad(brown(n, r), 'lp', 420, 0.7, sr);
    for (let i = 0; i < n; i++) lap[i] *= 0.5 + 0.5 * Math.pow(Math.sin(i / sr * TAU * 0.23 + Math.sin(i / sr * 0.9)), 2);
    add(out, lap, 0.8);
    for (let k = 0; k < 12; k++) { const b = new Float32Array(n), i0 = S(r() * n * 0.95), f0 = 800 + r() * 900, L = S(0.05 * sr); for (let i = i0; i < Math.min(n, i0 + L); i++) { const tt = (i - i0) / sr; b[i] = Math.sin(TAU * (f0 * tt + 11000 * tt * tt)) * Math.exp(-tt / 0.015); } add(out, b, 0.2); }
    return normalize(loopify(out, sr, 1), 0.5);
  };
  R.warehouse = (sr, r) => {
    const n = S(sr * 14), out = new Float32Array(n);
    add(out, sweep(brown(n, r), 'bp', t => 300 + 250 * Math.sin(t * TAU * 2) + 200 * Math.sin(t * TAU * 5.3), 0.9, sr), 0.9);
    add(out, biquad(brown(n, r), 'lp', 80, 0.7, sr), 0.6);
    for (let k = 0; k < 3; k++) add(out, creak(n, sr, r, r() * 12, 0.6 + r() * 0.6, 12, 30, [[180, 6, 1], [420, 8, 0.5]], 0.15));
    return normalize(loopify(out, sr, 1.2), 0.5);
  };
  R.darkRoom = (sr, r) => {
    const n = S(sr * 12), out = new Float32Array(n);
    add(out, biquad(brown(n, r), 'lp', 120, 0.7, sr), 0.9);
    add(out, sweep(pink(n, r), 'bp', t => 500 + 300 * Math.sin(t * TAU * 1.5), 2, sr), 0.08);
    return normalize(loopify(out, sr, 1.2), 0.4);
  };
  R.radioStatic = (sr, r) => {
    const n = S(sr * 3.2), out = biquad(biquad(white(n, r), 'bp', 2200, 0.6, sr), 'hp', 500, 0.7, sr);
    add(out, crackle(n, sr, r, 60, () => 0.5 + r()), 0.5);
    for (let i = 0; i < n; i++) out[i] *= 0.7 + 0.3 * Math.sin(i / sr * TAU * 0.6);
    return normalize(loopify(out, sr, 0.3), 0.4);
  };
  R.squelch = (sr, r) => {
    const n = S(sr * 0.18), out = decay(biquad(white(n, r), 'bp', 1800, 0.7, sr), sr, 0.06, 0, 0.003);
    add(out, modes(n, sr, [[1100, 0.03, 0.2]], 0.005));
    return normalize(out, 0.6);
  };

  // --- Creatures and stingers
  R.chew = (sr, r) => {
    const n = S(sr * 0.35), out = new Float32Array(n);
    for (let k = 0; k < 6; k++) add(out, hit(n, sr, r, r() * 0.2, 0.3 + r() * 0.7, 'bp', 1000 + r() * 2500, 1.5, 0.012 + r() * 0.02));
    add(out, hit(n, sr, r, 0, 0.8, 'lp', 220, 0.8, 0.06));
    const sq = decay(biquad(white(n, r), 'bp', 600, 3, sr), sr, 0.08, 0.02, 0.02); add(out, sq, 0.3);
    return normalize(out, 0.8);
  };
  R.stingSpot = (sr, r) => {
    const d = 3.5, n = S(sr * d), L = new Float32Array(n), Rt = new Float32Array(n);
    const fs = [110, 116.5, 155.6, 164.8, 233.1, 246.9, 466];
    for (const ch of [L, Rt]) {
      for (const f of fs) { let ph = r() * TAU; const det = 1 + (r() - 0.5) * 0.01; for (let i = 0; i < n; i++) { const t = i / sr; ph += TAU * f * det * (1 + 0.004 * Math.sin(t * TAU * 5.5)) / sr; ch[i] += ((ph / TAU) % 1 * 2 - 1) * 0.1 * (1 + 0.5 * Math.sin(t * TAU * 11)); } }
      const f = sweep(ch, 'lp', t => 400 + 2600 * Math.pow(t < 0.3 ? t / 0.3 : 1, 2), 0.9, sr);
      for (let i = 0; i < n; i++) { const t = i / n; ch[i] = f[i] * Math.min(1, t / 0.25) * Math.exp(-Math.max(0, t - 0.4) * 3); }
    }
    return [normalize(L, 0.8), normalize(Rt, 0.8)];
  };
  R.stingJump = (sr, r) => {
    const n = S(sr * 2.4), out = new Float32Array(n);
    add(out, hit(n, sr, r, 0, 1, 'lp', 90, 0.7, 0.5));
    add(out, modes(n, sr, [[48, 0.6, 1]], 0));
    const scr = new Float32Array(n); let ph = 0;
    for (let i = 0; i < n; i++) { const t = i / sr; const f = 1900 - 1400 * Math.min(1, t / 0.9) + 90 * Math.sin(t * TAU * 37); ph += TAU * f / sr; scr[i] = Math.sin(ph) * Math.sin(ph * 1.51) * Math.exp(-t / 0.5); }
    add(out, softclip(scr, 2), 0.5);
    add(out, decay(biquad(white(n, r), 'hp', 2000, 0.7, sr), sr, 0.25, 0, 0.003), 0.5);
    return normalize(softclip(out, 1.2), 0.95);
  };

  // --- Radio / tape voice: formant-synthesized babble with intonation (no words)
  const VOWELS = [[730, 1090, 2440], [530, 1840, 2480], [270, 2290, 3010], [570, 840, 2410], [300, 870, 2240], [660, 1720, 2410], [490, 1350, 1690]];
  function voice(sr, r, dur, o) {
    const n = S(sr * dur), glot = new Float32Array(n), noise = new Float32Array(n);
    const F1 = new Float32Array(n), F2 = new Float32Array(n), F3 = new Float32Array(n), amp = new Float32Array(n);
    let t = 0.05, vIdx = r() * VOWELS.length | 0;
    // Syllable plan
    while (t < dur - 0.2) {
      const syl = 0.12 + r() * 0.16, gap = r() < 0.12 ? 0.18 + r() * 0.25 : 0.02;
      const next = r() * VOWELS.length | 0, a = VOWELS[vIdx], b = VOWELS[next];
      const i0 = S(t * sr), i1 = Math.min(n, S((t + syl) * sr));
      const cons = r();
      for (let i = i0; i < i1; i++) {
        const k = (i - i0) / Math.max(1, i1 - i0);
        const m = U.smoothstep(0.2, 0.9, k);
        F1[i] = a[0] + (b[0] - a[0]) * m; F2[i] = a[1] + (b[1] - a[1]) * m; F3[i] = a[2] + (b[2] - a[2]) * m;
        amp[i] = Math.sin(Math.PI * Math.min(1, k * 1.2)) * (0.6 + 0.4 * Math.sin(t * 3));
      }
      if (cons < 0.5) { const L = S((0.03 + r() * 0.05) * sr); for (let i = i0; i < Math.min(n, i0 + L); i++) noise[i] = (r() * 2 - 1) * (cons < 0.25 ? 0.5 : 0.25); }
      vIdx = next; t += syl + gap;
    }
    // Glottal pulses with a phrase-level pitch contour
    let ph = 0;
    for (let i = 0; i < n; i++) {
      const tt = i / sr, k = tt / dur;
      const f0 = o.pitch * (1 + 0.12 * Math.sin(k * Math.PI * 2 * (1 + (o.seed || 0) % 3)) - 0.15 * k + 0.03 * Math.sin(tt * TAU * 5));
      ph += f0 / sr;
      if (ph >= 1) ph -= 1;
      glot[i] = (ph < 0.4 ? Math.sin(Math.PI * ph / 0.4) : 0) * amp[i] + noise[i] + (r() - 0.5) * 0.04 * amp[i];
    }
    // Time-varying formant filters
    let out = new Float32Array(n);
    for (const [arr, q, g] of [[F1, 6, 1], [F2, 9, 0.6], [F3, 12, 0.3]]) {
      const y = new Float32Array(n); let x1 = 0, x2 = 0, y1 = 0, y2 = 0, b0 = 0, b2 = 0, a1 = 0, a2 = 0;
      for (let i = 0; i < n; i++) {
        if ((i & 15) === 0) { const f = arr[i] || 500, w = TAU * f / sr, al = Math.sin(w) / (2 * q), a0 = 1 + al; b0 = al / a0; b2 = -al / a0; a1 = -2 * Math.cos(w) / a0; a2 = (1 - al) / a0; }
        const v = b0 * glot[i] + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = glot[i]; y2 = y1; y1 = v; y[i] = v;
      }
      add(out, y, g);
    }
    if (o.radio) {
      out = biquad(biquad(out, 'hp', 420, 0.7, sr), 'lp', 2900, 0.9, sr);
      out = softclip(normalize(out, 1), 2.2);
      add(out, biquad(white(n, r), 'bp', 2000, 0.6, sr), 0.05);
      add(out, crackle(n, sr, r, 25), 0.15);
    }
    if (o.tape) {
      out = biquad(biquad(out, 'hp', 180, 0.7, sr), 'lp', 4200, 0.7, sr);
      add(out, biquad(white(n, r), 'hp', 5000, 0.5, sr), 0.03);
    }
    return normalize(out, 0.75);
  }

  // ------------------------------------------------------------ CACHE
  class Sfx {
    constructor(ctx) { this.ctx = ctx; this.cache = new Map(); this.rng = U.rng(1234); }
    toBuffer(data, rate) {
      const chans = Array.isArray(data) ? data : [data];
      const b = this.ctx.createBuffer(chans.length, chans[0].length, rate || this.ctx.sampleRate);
      chans.forEach((c, i) => b.copyToChannel(c, i));
      return b;
    }
    // Random variant of a recipe (rendered on first use)
    get(name, variants = 1) {
      let list = this.cache.get(name);
      if (!list) { list = []; this.cache.set(name, list); }
      const k = Math.floor(Math.random() * variants);
      const fn = R[name];
      if (!fn) return null;
      const render = i => { if (!list[i]) list[i] = this.toBuffer(fn(this.ctx.sampleRate, U.rng(U.hashStr(name) + i * 7919), i)); };
      if (!list[k]) {
        // Render new variants in the background once one exists, so a frame never waits for it
        const have = list.find(b => b);
        if (have) { if (!list['p' + k]) { list['p' + k] = true; setTimeout(() => render(k), 0); } return have; }
        render(k);
      }
      return list[k];
    }
    // Felt piano note (modal, slightly inharmonic, hammer thump), cached per pitch
    note(freq) {
      const key = 'note:' + Math.round(freq);
      if (this.cache.has(key)) return this.cache.get(key);
      const sr = 22050, n = Math.floor(sr * 4.5), out = new Float32Array(n), r = U.rng(Math.round(freq));
      for (let k = 1; k <= 9; k++) {
        const f = freq * k * Math.sqrt(1 + 0.00035 * k * k);
        if (f > sr * 0.45) break;
        const tau = 2.6 / Math.pow(k, 0.8), amp = 1 / Math.pow(k, 1.15) * (k === 1 ? 1 : 0.9), w = TAU * f / sr, ph = r() * TAU;
        for (let i = 0; i < n; i++) { const e = Math.exp(-i / sr / tau); if (e < 1e-4) break; out[i] += Math.sin(w * i + ph) * e * amp * (1 + 0.002 * Math.sin(i / sr * 30)); }
      }
      const thump = decay(biquad(white(n, r), 'lp', 900, 0.7, sr), sr, 0.02, 0, 0.002);
      add(out, thump, 0.15);
      for (let i = 0; i < Math.min(n, 60); i++) out[i] *= i / 60;
      const b = this.toBuffer(normalize(biquad(out, 'lp', 3000, 0.5, sr), 0.8), sr);
      this.cache.set(key, b);
      return b;
    }
    // Voices are band-limited anyway: render them at a low rate to keep it quick
    voice(dur, o) { const sr = o.radio ? 16000 : 22050; return this.toBuffer(voice(sr, U.rng((o.seed || 1) * 131 + Math.floor(dur * 100)), dur, o), sr); }
    // Render a few heavy loops ahead of time without blocking a frame for long
    warm(names) {
      const q = names.slice();
      const next = () => { const n = q.shift(); if (!n) return; this.get(n); setTimeout(next, 30); };
      setTimeout(next, 50);
    }
  }
  PB.Sfx = Sfx;
  PB.SfxRecipes = R;
  PB.SfxVoice = voice;
})(typeof window !== 'undefined' ? window : globalThis);
