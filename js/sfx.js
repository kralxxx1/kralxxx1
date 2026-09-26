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

  // ------------------------------------------------------------ FOOTSTEPS (work boots)
  // A step is a contact, not a click. The boot hits the floor as a force pulse (a half-sine whose
  // width is set by how soft the pair is: rubber on carpet is slow, on tile fast); that force rings
  // the floor (modes for wood and metal, a damped noise burst for concrete, fibre rustle for carpet);
  // the sole scuffs while it rolls from heel to ball, then the ball lands, softer. A low body thump
  // carries the weight. Every take varies all of it.
  function pulse(n, sr, t0, width, amp) {
    const x = new Float32Array(n), i0 = S(t0 * sr), L = Math.max(2, S(width * sr));
    for (let i = 0; i < L && i0 + i < n; i++) x[i0 + i] = Math.sin(Math.PI * i / L) * amp;
    return x;
  }
  // Convolve a sparse excitation with a decaying noise "floor response" (fast: short kernel)
  function ringNoise(ex, sr, r, tau, len, colorF) {
    const K = S(len * sr), ker = new Float32Array(K);
    let lp = 0;
    for (let i = 0; i < K; i++) { lp = lp * colorF + (r() * 2 - 1) * (1 - colorF); ker[i] = lp * Math.exp(-i / sr / tau); }
    const y = new Float32Array(ex.length);
    for (let i = 0; i < ex.length; i++) { const e = ex[i]; if (e === 0) continue; for (let k = 0; k < K && i + k < y.length; k++) y[i + k] += e * ker[k]; }
    return y;
  }
  function scuff(n, sr, r, t0, dur, f, q, amp) {
    const x = biquad(white(n, r), 'bp', f, q, sr), i0 = S(t0 * sr), i1 = Math.min(n, S((t0 + dur) * sr));
    const y = new Float32Array(n);
    for (let i = i0; i < i1; i++) { const k = (i - i0) / (i1 - i0); y[i] = x[i] * Math.sin(Math.PI * k) * Math.pow(1 - k, 0.6) * amp * (0.7 + 0.3 * Math.sin(k * 40 + r() * 0.3)); }
    return y;
  }
  function grit(n, sr, r, t0, dur, rate, amp) {
    const y = new Float32Array(n);
    let i = S(t0 * sr); const end = Math.min(n, S((t0 + dur) * sr));
    while (i < end) { const k = (i / sr - t0) / dur; y[i] += (r() * 2 - 1) * amp * Math.pow(1 - k, 1.5); i += Math.max(1, Math.floor(-Math.log(1 - r()) / rate * sr)); }
    return biquad(biquad(y, 'hp', 2500, 0.7, sr), 'lp', 9000, 0.7, sr);
  }
  const STEP = {
    // width of the heel pulse (s), level, room for a relative loudness scale
    carpet: { w: 0.009, lvl: 0.45 }, wetCarpet: { w: 0.008, lvl: 0.55 }, concrete: { w: 0.0022, lvl: 0.9 }, tile: { w: 0.0014, lvl: 0.85 },
    lino: { w: 0.0022, lvl: 0.7 }, wood: { w: 0.0026, lvl: 0.85 }, metal: { w: 0.0012, lvl: 1 }, water: { w: 0.006, lvl: 0.8 }, puddle: { w: 0.005, lvl: 0.65 },
  };
  function step(sr, r, surf) {
    const P = STEP[surf] || STEP.carpet;
    const n = S(sr * (surf === 'metal' ? 0.7 : surf === 'water' || surf === 'puddle' ? 0.55 : 0.42));
    const out = new Float32Array(n);
    const v = 0.88 + r() * 0.24, toe = 0.055 + r() * 0.045, heelA = 0.85 + r() * 0.3, toeA = 0.35 + r() * 0.25;
    const wH = P.w * (0.85 + r() * 0.3), wT = P.w * (1.1 + r() * 0.3);
    // Body weight thump (the whole leg decelerating)
    add(out, modes(n, sr, [[58 * v + r() * 10, 0.028, 0.5 * heelA], [95 * v, 0.018, 0.2 * heelA]], 0.001, r));
    const ex = pulse(n, sr, 0, wH, heelA);
    add(ex, pulse(n, sr, toe, wT, toeA));
    switch (surf) {
      case 'carpet': case 'wetCarpet': {
        add(out, biquad(ringNoise(ex, sr, r, 0.012, 0.05, 0.6), 'lp', 900 * v, 0.7, sr), 0.9);
        add(out, biquad(ex, 'lp', 220, 0.7, sr), 0.9);
        // fibres crushing: a soft, short hiss
        add(out, scuff(n, sr, r, 0.004, 0.05 + r() * 0.03, 2600 * v, 0.8, 0.07));
        add(out, scuff(n, sr, r, toe + 0.004, 0.05, 2200 * v, 0.8, 0.05));
        if (surf === 'wetCarpet') {
          // water squeezed out of the pile
          add(out, decay(biquad(white(n, r), 'bp', 1100 * v, 1.5, sr), sr, 0.06, 0.012, 0.01), 0.2);
          for (let k = 0; k < 4; k++) { const t = 0.02 + r() * 0.12, f0 = 500 + r() * 700, b = new Float32Array(n), i0 = S(t * sr); for (let i = i0; i < Math.min(n, i0 + S(0.02 * sr)); i++) { const tt = (i - i0) / sr; b[i] = Math.sin(TAU * (f0 * tt + 8000 * tt * tt)) * Math.exp(-tt / 0.006); } add(out, b, 0.05); }
        }
        break;
      }
      case 'concrete': {
        add(out, biquad(ringNoise(ex, sr, r, 0.005, 0.03, 0.2), 'hp', 180, 0.7, sr), 0.8);
        add(out, biquad(ex, 'lp', 700, 0.7, sr), 0.5);
        // grit under the sole and the heel's rubber slap
        add(out, grit(n, sr, r, 0.001, 0.035, 900, 0.35));
        add(out, grit(n, sr, r, toe, 0.03, 700, 0.25));
        add(out, scuff(n, sr, r, 0.012, 0.045 + r() * 0.03, 1700 * v, 1.1, 0.12));
        break;
      }
      case 'tile': case 'lino': {
        const tile = surf === 'tile';
        add(out, biquad(ringNoise(ex, sr, r, tile ? 0.004 : 0.006, 0.02, 0.1), 'hp', 900, 0.7, sr), tile ? 0.7 : 0.45);
        if (tile) add(out, modes(n, sr, [[2150 * v, 0.014, 0.12], [3480 * v, 0.01, 0.09], [5300 * v, 0.007, 0.05]], 0, r));
        add(out, biquad(ex, 'lp', 600, 0.7, sr), 0.6);
        add(out, scuff(n, sr, r, 0.01, 0.04, 2200, 1.4, 0.06));
        // rubber squeak on a polished floor now and then
        if (r() < (tile ? 0.08 : 0.16)) { const b = new Float32Array(n), i0 = S((toe - 0.02) * sr), f0 = 1500 + r() * 800, L = S(0.07 * sr); for (let i = i0; i < Math.min(n, i0 + L); i++) { const k = (i - i0) / L; b[i] = Math.sin(TAU * (f0 * (i - i0) / sr + 900 * k * k * 0.05)) * Math.sin(Math.PI * k) * 0.5; } add(out, b, 0.12); }
        break;
      }
      case 'wood': {
        // hollow planks over joists: low modes, a boomy body, sometimes a creak as the plank flexes
        const m = modes(n, sr, [[118 * v, 0.06, 0.5], [236 * v, 0.045, 0.35], [415 * v, 0.03, 0.22], [790 * v, 0.018, 0.14], [1480 * v, 0.01, 0.08]], 0, r);
        const exl = biquad(ex, 'lp', 1200, 0.7, sr);
        const y = new Float32Array(n); for (let i = 0; i < n; i++) y[i] = m[i] * 0.4;
        add(out, y); add(out, exl, 0.9);
        add(out, biquad(ringNoise(ex, sr, r, 0.008, 0.03, 0.3), 'hp', 300, 0.7, sr), 0.4);
        if (r() < 0.35) add(out, creakPlank(n, sr, r, 0.03 + r() * 0.05), 0.35 + r() * 0.25);
        break;
      }
      case 'metal': case 'grate': {
        add(out, modes(n, sr, [[312 * v, 0.25, 0.28], [701 * v, 0.2, 0.22], [1283 * v, 0.14, 0.18], [2210 * v, 0.09, 0.12], [3690 * v, 0.06, 0.08], [5120 * v, 0.04, 0.05]], 0, r));
        add(out, biquad(ringNoise(ex, sr, r, 0.01, 0.04, 0.1), 'hp', 1500, 0.7, sr), 0.4);
        add(out, biquad(ex, 'lp', 400, 0.7, sr), 0.6);
        // the grate rattles in its frame a moment later
        add(out, modes(n, sr, [[1800 * v, 0.02, 0.1], [2700 * v, 0.015, 0.07]], 0.03 + r() * 0.02, r));
        break;
      }
      case 'water': case 'puddle': {
        const k = surf === 'puddle' ? 0.6 : 1;
        add(out, decay(sweep(white(n, r), 'bp', t => 3000 - 2500 * Math.min(1, t * 2.5), 1.3, sr), sr, 0.08 * k + 0.03, 0, 0.006), 0.7);
        add(out, biquad(ex, 'lp', 350, 0.7, sr), 0.6);
        for (let q = 0; q < 8 * k; q++) { const b = new Float32Array(n), i0 = S((0.015 + r() * 0.22) * sr), f0 = 350 + r() * 900, L = S((0.012 + r() * 0.03) * sr); for (let i = i0; i < Math.min(n, i0 + L); i++) { const tt = (i - i0) / sr; b[i] = Math.sin(TAU * (f0 * tt + 12000 * tt * tt)) * Math.exp(-tt / 0.01); } add(out, b, 0.12); }
        break;
      }
      default: add(out, biquad(ex, 'lp', 900, 0.8, sr), 0.9);
    }
    const y = normalize(biquad(out, 'hp', 35, 0.7, sr), 0.85);
    for (let i = 0; i < y.length; i++) y[i] *= P.lvl;
    return y;
  }
  // A floorboard creak: stick-slip pulses through the plank's resonances
  function creakPlank(n, sr, r, t0) {
    const x = new Float32Array(n), dur = 0.12 + r() * 0.12;
    let i = S(t0 * sr); const end = Math.min(n, S((t0 + dur) * sr)), rate0 = 90 + r() * 80, rate1 = rate0 * (0.6 + r() * 0.5);
    while (i < end) { const k = (i / sr - t0) / dur; x[i] = (0.6 + r() * 0.8) * Math.sin(Math.PI * k); i += Math.max(1, Math.floor(sr / (rate0 + (rate1 - rate0) * k) * (0.85 + r() * 0.3))); }
    const y = new Float32Array(n);
    for (const [f, q, g] of [[520, 12, 0.6], [1150, 14, 0.4], [2300, 10, 0.2]]) add(y, biquad(x, 'bp', f * (0.9 + r() * 0.2), q, sr), g);
    return y;
  }
  for (const s of ['carpet', 'wetCarpet', 'concrete', 'tile', 'lino', 'wood', 'metal', 'water', 'puddle']) R['step_' + s] = (sr, r) => step(sr, r, s);
  // Jacket and jeans moving with the stride (plays under the steps)
  R.rustle = (sr, r) => {
    const d = 0.18 + r() * 0.16, n = S(sr * d), out = new Float32Array(n);
    const src = biquad(biquad(pink(n, r), 'hp', 500, 0.7, sr), 'lp', 3800, 0.7, sr);
    for (let i = 0; i < n; i++) { const k = i / n; out[i] = src[i] * Math.pow(Math.sin(Math.PI * Math.pow(k, 0.7)), 1.5) * (0.8 + 0.2 * Math.sin(k * 60 + r())); }
    add(out, crackle(n, sr, r, 60, k => Math.sin(Math.PI * k) * 0.3));
    return normalize(out, 0.5);
  };

  // ------------------------------------------------------------ BREATHING
  // Air through the throat and mouth: turbulent noise shaped by the vocal tract (formants of an open
  // "hah" on the way out, a narrower "hih" on the way in), a nasal variant for calm breathing, a
  // weak voiced catch on hard exhales, and a tremor when afraid. Inhale and exhale have their own
  // envelopes (an inhale starts sharper, an exhale lets go).
  function breath(sr, r, o) {
    const d = o.dur * (0.9 + r() * 0.2), n = S(sr * d);
    const noise = new Float32Array(n);
    const pn = pink(n, r), bn = brown(n, r);
    for (let i = 0; i < n; i++) noise[i] = pn[i] * 0.8 + bn[i] * 0.2;
    let out = new Float32Array(n);
    const F = o.nose ? [[1150, 2.2, 0.55], [2300, 3, 0.4], [3400, 3.5, 0.15]]
      : o.inhale ? [[520, 2.5, 0.5], [1650, 3.5, 0.6], [2600, 4.5, 0.35]]
        : [[700, 2.5, 0.9], [1180, 3, 0.6], [2450, 4, 0.22]];
    for (const [f, q, g] of F) add(out, biquad(noise, 'bp', f * (0.93 + r() * 0.14), q, sr), g);
    // breathy aspiration, kept soft and low
    add(out, biquad(biquad(noise, 'hp', 900, 0.7, sr), 'lp', o.inhale ? 4200 : 3000, 0.7, sr), o.inhale ? 0.12 : 0.07);
    out = biquad(biquad(out, 'hp', o.nose ? 450 : 140, 0.7, sr), 'lp', o.nose ? 4200 : o.inhale ? 5200 : 3800, 0.7, sr);
    // voiced catch (fear, exhaustion): glottal pulses through the same formants
    if (o.voice) {
      const g = new Float32Array(n); let ph = 0; const f0 = o.voiceF || (100 + r() * 25);
      for (let i = 0; i < n; i++) { const k = i / n; ph += (f0 * (1 + 0.03 * Math.sin(i / sr * 7))) / sr; const pr = ph % 1; g[i] = (pr < 0.4 ? Math.sin(Math.PI * pr / 0.4) : 0) * Math.sin(Math.PI * k) * (0.7 + r() * 0.3); }
      let gv = new Float32Array(n);
      for (const [f, q, gg] of F) add(gv, biquad(g, 'bp', f, q * 2, sr), gg);
      add(out, gv, o.voice);
    }
    // envelope
    const atk = o.inhale ? 0.18 : 0.12, rel = o.inhale ? 0.3 : 0.55;
    for (let i = 0; i < n; i++) {
      const k = i / n;
      let e = k < atk ? Math.pow(k / atk, o.inhale ? 1.2 : 0.8) : k > 1 - rel ? Math.pow((1 - k) / rel, o.inhale ? 1.6 : 1.1) : 1;
      if (o.shake) e *= 1 - o.shake * (0.5 + 0.5 * Math.sin(TAU * (6.5 + r() * 0.2) * i / sr + r()));
      e *= 1 + 0.12 * Math.sin(TAU * 2.3 * i / sr);
      out[i] *= e;
    }
    // a lip smack or tongue click before some inhales
    if (o.inhale && !o.nose && r() < 0.3) add(out, hit(n, sr, r, 0.005, 0.25, 'bp', 2800, 2, 0.004));
    return normalize(out, o.level || 0.7);
  }
  R.breathCalmIn = (sr, r) => breath(sr, r, { inhale: true, nose: true, dur: 1.2, level: 0.35 });
  R.breathCalmOut = (sr, r) => breath(sr, r, { inhale: false, nose: true, dur: 1.5, level: 0.3 });
  R.breathIn = (sr, r) => breath(sr, r, { inhale: true, dur: 0.55, level: 0.6 });
  R.breathOut = (sr, r) => breath(sr, r, { inhale: false, dur: 0.7, level: 0.6 });
  R.breathInHeavy = (sr, r) => breath(sr, r, { inhale: true, dur: 0.36, level: 0.8, voice: 0.04 });
  R.breathOutHeavy = (sr, r) => breath(sr, r, { inhale: false, dur: 0.42, level: 0.8, voice: 0.12, voiceF: 115 });
  R.breathFearIn = (sr, r) => breath(sr, r, { inhale: true, dur: 0.6, level: 0.65, shake: 0.35, voice: 0.03 });
  R.breathFearOut = (sr, r) => breath(sr, r, { inhale: false, dur: 0.9, level: 0.6, shake: 0.5, voice: 0.1, voiceF: 125 });
  R.gasp = (sr, r) => breath(sr, r, { inhale: true, dur: 0.32, level: 0.9, voice: 0.12, voiceF: 160 });
  R.breathRelease = (sr, r) => breath(sr, r, { inhale: false, dur: 1.5, level: 0.75, shake: 0.4, voice: 0.08 });

  // ------------------------------------------------------------ THINGS FALLING SOMEWHERE ELSE
  // An impact, the object's own ring, and the bounces that follow at shrinking intervals
  function dropped(sr, r, kind) {
    const n = S(sr * (kind === 'metal' ? 2.4 : 1.4)), out = new Float32Array(n);
    let t = 0, a = 1, gap = kind === 'metal' ? 0.22 : 0.14;
    const bounces = kind === 'debris' ? 1 : 3 + (r() * 3 | 0);
    for (let b = 0; b < bounces; b++) {
      if (kind === 'metal') add(out, modes(n, sr, [[410, 0.6, 0.5 * a], [1130, 0.45, 0.35 * a], [2210, 0.3, 0.25 * a], [3570, 0.2, 0.15 * a], [5090, 0.12, 0.08 * a]].map(m => [m[0] * (1 + (r() - 0.5) * 0.004), m[1], m[2]]), t, r));
      else if (kind === 'wood') add(out, modes(n, sr, [[180, 0.05, 0.6 * a], [420, 0.04, 0.4 * a], [860, 0.025, 0.25 * a]], t, r));
      add(out, hit(n, sr, r, t, 0.6 * a, 'lp', kind === 'metal' ? 3000 : 1400, 0.7, 0.012));
      t += gap * (0.8 + r() * 0.4); gap *= 0.6; a *= 0.55;
    }
    if (kind === 'debris') { add(out, hit(n, sr, r, 0, 0.8, 'lp', 800, 0.7, 0.05)); add(out, grit(n, sr, r, 0.02, 0.9, 260, 0.35)); for (let k = 0; k < 7; k++) add(out, hit(n, sr, r, 0.05 + r() * 0.6, 0.15 + r() * 0.2, 'bp', 1500 + r() * 2500, 2, 0.01)); }
    if (kind === 'wood' || kind === 'box') { add(out, scuff(n, sr, r, t, 0.25, 900, 1, 0.08)); }
    return normalize(out, 0.9);
  }
  R.dropMetal = (sr, r) => dropped(sr, r, 'metal');
  R.dropWood = (sr, r) => dropped(sr, r, 'wood');
  R.dropDebris = (sr, r) => dropped(sr, r, 'debris');
  // Somebody else walking, a few rooms away, then stopping
  R.farSteps = (sr, r) => {
    const count = 4 + (r() * 4 | 0), per = 0.52 + r() * 0.1, n = S(sr * (count * per + 0.6)), out = new Float32Array(n);
    for (let k = 0; k < count; k++) {
      const st = step(sr, r, r() < 0.5 ? 'carpet' : 'wetCarpet');
      add(out, st, 0.8 * (k === count - 1 ? 0.6 : 1), S((k * per + (r() - 0.5) * 0.04) * sr));
    }
    return normalize(biquad(out, 'lp', 1800, 0.7, sr), 0.8);
  };
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

  // --- Things hitting the floor
  // Cardboard: a hollow box thump with a papery rattle inside
  R.impactCardboard = (sr, r) => {
    const n = S(sr * 0.45), out = new Float32Array(n);
    add(out, hit(n, sr, r, 0, 1, 'lp', 260 + r() * 80, 0.9, 0.05));
    add(out, modes(n, sr, [[140 + r() * 30, 0.06, 0.5], [330 + r() * 60, 0.04, 0.35], [720, 0.02, 0.2]], 0, r));
    add(out, biquad(crackle(n, sr, r, 300, t => Math.exp(-t * 9)), 'bp', 2600, 1, sr), 0.6);
    return normalize(out, 0.85);
  };
  // Empty plastic bottle: a couple of hollow tocks as it bounces and rolls
  R.impactBottle = (sr, r) => {
    const n = S(sr * 0.7), out = new Float32Array(n);
    let t = 0, a = 1;
    for (let k = 0; k < 4; k++) { add(out, modes(n, sr, [[780 + r() * 120, 0.03, a], [1650 + r() * 200, 0.02, a * 0.6], [3100, 0.01, a * 0.3]], t, r)); add(out, hit(n, sr, r, t, a * 0.3, 'bp', 2400, 1.5, 0.006)); t += 0.09 + r() * 0.08 * (1 - k * 0.2); a *= 0.55; }
    const roll = biquad(white(n, r), 'bp', 1400, 2, sr);
    for (let i = 0; i < n; i++) { const tt = i / sr; out[i] += roll[i] * 0.05 * Math.max(0, Math.min(1, (tt - 0.15) / 0.05)) * Math.exp(-(tt - 0.15) * 5) * (tt > 0.15 ? 1 : 0); }
    return normalize(out, 0.75);
  };
  // A soft heavy thing (a bag, a coil of cable) flopping down
  R.impactSoft = (sr, r) => {
    const n = S(sr * 0.4), out = new Float32Array(n);
    add(out, hit(n, sr, r, 0, 1, 'lp', 180, 0.8, 0.07));
    const cr = biquad(pink(n, r), 'bp', 900 + r() * 400, 0.8, sr);
    for (let i = 0; i < n; i++) cr[i] *= Math.exp(-i / sr * 12);
    add(out, cr, 0.4);
    return normalize(out, 0.8);
  };

  // --- Drawers and safes
  // Wood on wood: a dry, grainy friction rumble through the drawer box's resonances; the stop knocks
  function slideWood(n, sr, r, t0, dur, amp) {
    const fr = crackle(n, sr, r, 900, null), x = new Float32Array(n);
    const i0 = S(t0 * sr), i1 = Math.min(n, S((t0 + dur) * sr));
    for (let i = i0; i < i1; i++) { const k = (i - i0) / (i1 - i0); x[i] = fr[i] * Math.pow(Math.sin(Math.PI * Math.min(1, k * 1.15)), 0.5) * (0.7 + 0.3 * Math.sin(k * 31)); }
    const out = new Float32Array(n);
    add(out, biquad(x, 'bp', 520 + r() * 120, 2.5, sr), 1.2); add(out, biquad(x, 'bp', 1250 + r() * 200, 3, sr), 0.8); add(out, biquad(x, 'bp', 2900, 2, sr), 0.35);
    const hum = biquad(pink(n, r), 'bp', 380, 1.2, sr);
    for (let i = i0; i < i1; i++) out[i] += hum[i] * 0.25 * Math.sin(Math.PI * (i - i0) / (i1 - i0));
    for (let i = 0; i < n; i++) out[i] *= amp;
    return out;
  }
  // Steel on ball bearings: a fast metallic roll with a ringing body
  function slideMetal(n, sr, r, t0, dur, amp) {
    const x = new Float32Array(n), i0 = S(t0 * sr), i1 = Math.min(n, S((t0 + dur) * sr));
    const bump = crackle(n, sr, r, 2600, null);
    for (let i = i0; i < i1; i++) { const k = (i - i0) / (i1 - i0); x[i] = bump[i] * Math.sin(Math.PI * k); }
    const out = new Float32Array(n);
    for (const [f, q, g] of [[1850 + r() * 200, 14, 0.6], [3100 + r() * 300, 16, 0.5], [4700, 12, 0.3], [820, 8, 0.4]]) add(out, biquad(x, 'bp', f, q, sr), g);
    add(out, biquad(x, 'hp', 5000, 0.7, sr), 0.2);
    for (let i = 0; i < n; i++) out[i] *= amp;
    return out;
  }
  // Loose things in the drawer sliding and knocking together
  function rattle(n, sr, r, t0, count, amp) {
    const out = new Float32Array(n);
    for (let k = 0; k < count; k++) {
      const t = t0 + r() * 0.12;
      if (r() < 0.5) add(out, modes(n, sr, [[1900 + r() * 2600, 0.012 + r() * 0.02, amp], [4200 + r() * 2400, 0.008, amp * 0.5]], t, r));
      else add(out, hit(n, sr, r, t, amp * 0.8, 'bp', 700 + r() * 900, 1.5, 0.012));
    }
    return out;
  }
  R.drawerWoodOpen = (sr, r) => {
    const n = S(sr * 0.75), out = new Float32Array(n), d = 0.32 + r() * 0.12;
    add(out, hit(n, sr, r, 0, 0.35, 'bp', 1600, 2, 0.01));
    add(out, slideWood(n, sr, r, 0.02, d, 1));
    add(out, hit(n, sr, r, 0.02 + d, 0.6, 'lp', 300, 0.8, 0.04));
    add(out, modes(n, sr, [[210, 0.05, 0.4], [470, 0.03, 0.25], [1150, 0.015, 0.15]], 0.02 + d, r));
    add(out, rattle(n, sr, r, 0.03 + d, 4, 0.18));
    return normalize(out, 0.85);
  };
  R.drawerWoodSlide = (sr, r) => { const n = S(sr * 0.5); return normalize(slideWood(n, sr, r, 0, 0.3 + r() * 0.1, 1), 0.6); };
  R.drawerWoodShut = (sr, r) => {
    const n = S(sr * 0.5), out = new Float32Array(n);
    add(out, hit(n, sr, r, 0, 1, 'lp', 220, 0.8, 0.05));
    add(out, modes(n, sr, [[140, 0.07, 0.6], [320, 0.05, 0.4], [760, 0.025, 0.25], [1900, 0.01, 0.12]], 0, r));
    add(out, rattle(n, sr, r, 0.01, 3, 0.15));
    return normalize(out, 0.9);
  };
  R.drawerMetalOpen = (sr, r) => {
    const n = S(sr * 1.0), out = new Float32Array(n), d = 0.35 + r() * 0.1;
    add(out, modes(n, sr, [[2600, 0.01, 0.4], [5100, 0.006, 0.25]], 0, r));
    add(out, slideMetal(n, sr, r, 0.02, d, 1));
    add(out, hit(n, sr, r, 0.02 + d, 0.7, 'bp', 900, 1.2, 0.02));
    add(out, modes(n, sr, [[420, 0.12, 0.4], [1130, 0.09, 0.3], [2380, 0.06, 0.2], [3900, 0.04, 0.1]], 0.02 + d, r));
    add(out, rattle(n, sr, r, 0.03 + d, 3, 0.12));
    return normalize(out, 0.85);
  };
  R.drawerMetalSlide = (sr, r) => { const n = S(sr * 0.5); return normalize(slideMetal(n, sr, r, 0, 0.3 + r() * 0.08, 1), 0.55); };
  R.drawerMetalShut = (sr, r) => {
    const n = S(sr * 1.2), out = new Float32Array(n);
    add(out, hit(n, sr, r, 0, 1, 'lp', 400, 0.8, 0.03));
    add(out, modes(n, sr, [[180, 0.25, 0.5], [390, 0.2, 0.45], [960, 0.14, 0.35], [2150, 0.09, 0.25], [3600, 0.05, 0.12]], 0, r));
    add(out, modes(n, sr, [[2900, 0.012, 0.3], [4700, 0.008, 0.2]], 0.004, r));
    return normalize(out, 0.9);
  };
  // Safe: the handle turns and the bolts draw back, then the heavy door swings on stiff hinges
  R.safeOpen = (sr, r) => {
    const n = S(sr * 2.2), out = new Float32Array(n);
    add(out, modes(n, sr, [[600, 0.06, 0.5], [1500, 0.04, 0.35], [3200, 0.02, 0.2]], 0, r));
    add(out, hit(n, sr, r, 0, 0.5, 'bp', 1100, 1.5, 0.02));
    for (const t of [0.16, 0.2, 0.24]) add(out, modes(n, sr, [[900 + r() * 200, 0.05, 0.35], [2300, 0.03, 0.2]], t, r));
    add(out, creak(n, sr, r, 0.4, 1.4, 25, 55, [[240, 8, 0.8], [610, 10, 0.5], [1300, 9, 0.25]], 0.8));
    add(out, biquad(brown(n, r), 'lp', 180, 0.7, sr), 0.2);
    return normalize(out, 0.85);
  };
  R.safeClose = (sr, r) => {
    const n = S(sr * 1.8), out = new Float32Array(n);
    add(out, creak(n, sr, r, 0, 0.6, 50, 30, [[260, 8, 0.7], [640, 10, 0.4]], 0.5));
    add(out, hit(n, sr, r, 0.62, 1, 'lp', 160, 0.8, 0.12));
    add(out, modes(n, sr, [[75, 0.35, 0.6], [150, 0.25, 0.45], [340, 0.18, 0.3], [820, 0.1, 0.18]], 0.62, r));
    for (const t of [0.85, 0.9]) add(out, modes(n, sr, [[1000 + r() * 200, 0.04, 0.3]], t, r));
    return normalize(out, 0.9);
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
  // Flashlight batteries: tail cap unscrews (thread friction), old cells slide out and clink,
  // new ones drop in, cap screws back, the switch clicks
  R.batterySwap = (sr, r) => {
    const n = S(sr * 1.3), out = new Float32Array(n);
    const thread = (t0, len, amp) => { for (let k = 0; k < 5; k++) { const t = t0 + k * len / 5 + r() * 0.01; add(out, hit(n, sr, r, t, amp * (0.6 + r() * 0.4), 'bp', 2600 + r() * 1800, 3, 0.012)); } };
    const clink = (t0, amp) => { add(out, modes(n, sr, [[2350 + r() * 300, 0.05, amp], [4100 + r() * 400, 0.03, amp * 0.6], [6900 + r() * 500, 0.018, amp * 0.35]], t0, r)); add(out, hit(n, sr, r, t0, amp * 0.5, 'hp', 3500, 0.7, 0.003)); };
    const slide = (t0, dur, amp) => { const x = biquad(white(n, r), 'bp', 1800, 1.2, sr); const i0 = S(t0 * sr), i1 = Math.min(n, S((t0 + dur) * sr)); for (let i = i0; i < i1; i++) out[i] += x[i] * amp * Math.sin(Math.PI * (i - i0) / (i1 - i0)); };
    thread(0, 0.22, 0.25);
    slide(0.3, 0.12, 0.12); clink(0.42, 0.3); clink(0.47, 0.22);
    slide(0.62, 0.1, 0.1); clink(0.72, 0.28); add(out, hit(n, sr, r, 0.78, 0.35, 'lp', 500, 0.8, 0.02));
    thread(0.88, 0.2, 0.22);
    add(out, modes(n, sr, [[3200, 0.004, 0.5], [5400, 0.003, 0.3], [1800, 0.006, 0.3]], 1.18, r)); add(out, hit(n, sr, r, 1.18, 0.4, 'hp', 3000, 0.7, 0.002));
    return normalize(out, 0.7);
  };
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
  // --- Room tones for the later chapters
  // A water drop into a puddle: a short upward chirp
  function plip(out, sr, r, t0, f0, amp) {
    const i0 = S(t0 * sr), L = S(0.06 * sr);
    for (let i = 0; i < L && i0 + i < out.length; i++) { const tt = i / sr; out[i0 + i] += Math.sin(TAU * (f0 * tt + (6000 + r() * 8000) * tt * tt)) * Math.exp(-tt / 0.014) * amp; }
  }
  // Storm tunnel: water running in the channel, pipe rumble, drops far and near
  R.tunnel = (sr, r) => {
    const n = S(sr * 12.8), out = [new Float32Array(n), new Float32Array(n)];
    out.forEach((ch, c) => {
      const flow = sweep(pink(n, r), 'bp', t => 850 + 380 * Math.sin(t * TAU * 3 + c * 2) + 200 * Math.sin(t * TAU * 7.3), 0.9, sr);
      for (let i = 0; i < n; i++) flow[i] *= 0.7 + 0.3 * Math.sin(i / sr * TAU * 0.35 + c);
      add(ch, flow, 0.35);
      add(ch, biquad(brown(n, r), 'lp', 85, 0.7, sr), 0.8);
      for (let i = 0; i < n; i++) ch[i] += Math.sin(TAU * 38 * i / sr) * 0.03 * (1 + 0.5 * Math.sin(i / sr * 0.6));
      for (let k = 0; k < 16; k++) plip(ch, sr, r, r() * 12, 700 + r() * 900, 0.08 + r() * 0.25);
    });
    return out.map(c => normalize(loopify(c, sr, 0.8), 0.5));
  };
  // School hallway after hours: air handler, the wall clock ticking
  R.schoolHall = (sr, r) => {
    const n = S(sr * 8.5), out = new Float32Array(n);
    add(out, biquad(brown(n, r), 'lp', 200, 0.7, sr), 0.7);
    add(out, biquad(pink(n, r), 'bp', 600, 0.6, sr), 0.08);
    for (let k = 0; k < 8; k++) {
      add(out, hit(n, sr, r, 0.25 + k, 0.35, 'bp', 3400, 3, 0.004));
      add(out, modes(n, sr, [[2150, 0.02, 0.1], [4300, 0.01, 0.05]], 0.25 + k, r));
    }
    return normalize(loopify(out, sr, 0.5), 0.45);
  };
  // Mall atrium: the fountain, a huge empty hall
  R.mallAtrium = (sr, r) => {
    const n = S(sr * 12.8), out = [new Float32Array(n), new Float32Array(n)];
    out.forEach((ch, c) => {
      const splash = biquad(biquad(pink(n, r), 'hp', 380, 0.7, sr), 'lp', 7000, 0.7, sr);
      for (let i = 0; i < n; i++) splash[i] *= 0.75 + 0.25 * Math.sin(i / sr * TAU * (0.8 + c * 0.13)) * Math.sin(i / sr * TAU * 0.17);
      add(ch, splash, 0.3);
      add(ch, biquad(brown(n, r), 'lp', 70, 0.7, sr), 0.6);
      for (let k = 0; k < 90; k++) plip(ch, sr, r, r() * 12.5, 900 + r() * 1400, 0.04 + r() * 0.08);
    });
    return out.map(c => normalize(loopify(c, sr, 0.8), 0.5));
  };
  // Motel corridor: the VACANCY sign's neon buzz, the ice machine through the wall, Route 9 far off
  R.motelHall = (sr, r) => {
    const n = S(sr * 10.5), out = new Float32Array(n);
    const nb = new Float32Array(n); for (let i = 0; i < n; i++) nb[i] = Math.sign(Math.sin(TAU * 120 * i / sr)) * (0.6 + 0.4 * Math.sin(i / sr * TAU * 0.13));
    add(out, biquad(nb, 'bp', 1800, 4, sr), 0.05);
    const motor = new Float32Array(n); for (let i = 0; i < n; i++) motor[i] = Math.sin(TAU * 58 * i / sr) + 0.4 * Math.sin(TAU * 116 * i / sr);
    add(out, biquad(motor, 'lp', 300, 0.7, sr), 0.06);
    add(out, creak(n, sr, r, 3.2, 1.6, 40, 70, [[900, 5, 0.6], [2400, 6, 0.3]], 0.12));
    const road = biquad(brown(n, r), 'lp', 180, 0.7, sr); for (let i = 0; i < n; i++) road[i] *= 0.6 + 0.4 * Math.pow(Math.sin(i / n * Math.PI * 2), 2);
    add(out, road, 0.5);
    return normalize(loopify(out, sr, 0.5), 0.45);
  };
  // Hospital ward at night: ventilation, the building's low hum
  R.hospitalHall = (sr, r) => {
    const n = S(sr * 9.5), out = new Float32Array(n);
    add(out, biquad(brown(n, r), 'lp', 240, 0.7, sr), 0.7);
    add(out, biquad(pink(n, r), 'bp', 1200, 0.4, sr), 0.05);
    for (let i = 0; i < n; i++) out[i] += (Math.sin(TAU * 60 * i / sr) * 0.03 + Math.sin(TAU * 180 * i / sr) * 0.012);
    return normalize(loopify(out, sr, 0.5), 0.4);
  };
  // Rain outdoors: drops on asphalt and roofs, splashes, the whole street hissing
  R.rainOutside = (sr, r) => {
    const n = S(sr * 10.5), out = [new Float32Array(n), new Float32Array(n)];
    for (const ch of out) {
      add(ch, biquad(biquad(pink(n, r), 'lp', 6500, 0.7, sr), 'hp', 250, 0.7, sr), 0.55);
      add(ch, biquad(brown(n, r), 'lp', 140, 0.7, sr), 0.3);
      add(ch, biquad(crackle(n, sr, r, 1400, () => 0.2 + r() * 0.8), 'bp', 3200, 0.7, sr), 0.5);
      for (let k = 0; k < 60; k++) plip(ch, sr, r, r() * 10, 600 + r() * 1200, 0.05 + r() * 0.1);
    }
    return out.map(c => normalize(loopify(c, sr, 0.5), 0.6));
  };
  // Walt's basement: transformer hum, and the Kernel breathing behind the steel door
  R.workshop = (sr, r) => {
    const n = S(sr * 12.5), out = new Float32Array(n);
    for (const [f, a] of [[60, 0.25], [120, 0.18], [180, 0.08], [240, 0.05], [300, 0.03]]) { const w = TAU * f / sr; for (let i = 0; i < n; i++) out[i] += Math.sin(w * i) * a; }
    const br = biquad(brown(n, r), 'lp', 320, 0.7, sr);
    // two slow breaths per loop: in (rising filter), out (falling)
    const env = t => { const p = (t / 6) % 1; return p < 0.4 ? Math.sin(p / 0.4 * Math.PI / 2) : Math.cos((p - 0.4) / 0.6 * Math.PI / 2); };
    for (let i = 0; i < n; i++) br[i] *= 0.15 + 0.85 * Math.pow(env(i / sr), 1.5);
    add(out, br, 1.2);
    add(out, biquad(crackle(n, sr, r, 4, () => 0.3 + r() * 0.7), 'hp', 3000, 0.7, sr), 0.4);
    return normalize(loopify(out, sr, 0.5), 0.5);
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

  // --- Creature voices: a glottal pulse train with jitter and vocal fry through a throat of formants,
  // with breath noise and saturation. o.f0(t), o.env(t) over 0..1; formants [[f, q, gain], ...]
  function throat(n, sr, r, o) {
    const x = new Float32Array(n), br = pink(n, r);
    let ph = 0, jit = 0;
    for (let i = 0; i < n; i++) {
      const t = i / n;
      jit += ((r() - 0.5) * 0.4 - jit) * 0.02;
      const f = o.f0(t) * (1 + jit * (o.jitter || 0.1));
      ph += f / sr;
      const saw = 1 - 2 * (ph % 1);
      const fry = 1 - (o.fry || 0) * (Math.floor(ph) % 2);          // every other pulse weaker: a rattling growl
      const e = o.env(t);
      x[i] = (saw * fry * (1 - (o.breath || 0.2)) + br[i] * (o.breath || 0.2) * 2) * e;
    }
    const out = new Float32Array(n);
    for (const [f, q, g] of o.formants) add(out, biquad(x, 'bp', f, q, sr), g);
    if (o.low) add(out, biquad(x, 'lp', o.low, 0.7, sr), 0.6);
    return softclip(out, o.drive || 1.5);
  }
  // The Eater: a wet, gargling roar out of a wide throat, the jaw snapping shut at the end
  R.roarEater = (sr, r) => {
    const d = 1.9, n = S(sr * d), out = new Float32Array(n);
    add(out, throat(n, sr, r, { f0: t => 88 - 30 * t + 14 * Math.sin(t * 9) + (t < 0.1 ? 40 * (0.1 - t) * 10 : 0), env: t => Math.min(1, t / 0.06) * Math.pow(1 - t, 0.7), formants: [[330, 3, 1], [780, 4, 0.8], [1850, 5, 0.35], [2900, 6, 0.12]], low: 180, fry: 0.45, breath: 0.35, drive: 3 }));
    const gur = biquad(crackle(n, sr, r, 55, t => Math.sin(Math.PI * Math.min(1, t * 1.2))), 'bp', 520, 2, sr);
    add(out, gur, 3);
    add(out, modes(n, sr, [[1150, 0.03, 0.5], [2300, 0.02, 0.35], [180, 0.08, 0.6]], d - 0.28, r));
    add(out, hit(n, sr, r, d - 0.28, 0.8, 'lp', 250, 0.8, 0.06));
    return normalize(out, 0.95);
  };
  // Ghosts: a child's wail under wet cloth, bent out of tune
  R.screechGhost = (sr, r) => {
    const n = S(sr * 1.7);
    const out = throat(n, sr, r, { f0: t => (360 + 180 * Math.sin(Math.PI * t) - 90 * t) * (1 + 0.035 * Math.sin(t * 1.7 * TAU * 6)), env: t => Math.pow(Math.min(1, t / 0.3), 1.5) * Math.pow(1 - t, 0.8), formants: [[900, 6, 1], [1350, 7, 0.7], [2750, 8, 0.25]], fry: 0.1, breath: 0.45, drive: 2, jitter: 0.25 });
    // muffled by the sheet
    return normalize(biquad(out, 'lp', 2600, 0.7, sr), 0.85);
  };
  // Crawlers: a breathy hiss with a rattle of clicks from the mouth
  R.hissCrawler = (sr, r) => {
    const n = S(sr * 0.9), out = new Float32Array(n);
    const h = biquad(white(n, r), 'bp', 4200, 0.9, sr);
    for (let i = 0; i < n; i++) { const t = i / n; h[i] *= Math.min(1, t / 0.05) * Math.pow(1 - t, 1.2); }
    add(out, h, 1);
    add(out, biquad(crackle(n, sr, r, 45, t => 1 - t), 'bp', 2400, 3, sr), 4);
    return normalize(out, 0.8);
  };
  // The Counter: very low, slow, a crack of joints first
  R.groanCounter = (sr, r) => {
    const n = S(sr * 2.8), out = new Float32Array(n);
    for (const t of [0, 0.07, 0.11]) add(out, hit(n, sr, r, t, 0.6, 'bp', 1800 + r() * 800, 2, 0.008));
    add(out, throat(n, sr, r, { f0: t => 48 + 8 * Math.sin(t * 5), env: t => Math.min(1, Math.max(0, t - 0.05) / 0.2) * Math.pow(1 - t, 0.6), formants: [[240, 3, 1], [590, 4, 0.6], [1400, 5, 0.2]], low: 120, fry: 0.6, breath: 0.3, drive: 2.5 }), 1);
    return normalize(out, 0.9);
  };
  // The Neighbor: a man's long, tired groan that ends in a word you almost catch
  R.moanNeighbor = (sr, r) => {
    const n = S(sr * 2.2);
    const out = throat(n, sr, r, { f0: t => 112 - 28 * t + 6 * Math.sin(t * 11), env: t => Math.min(1, t / 0.15) * Math.pow(1 - t, 0.7), formants: [[470, 6, 1], [830, 6, 0.55], [2500, 7, 0.15]], fry: 0.3, breath: 0.3, drive: 1.6 });
    return normalize(out, 0.8);
  };
  // Chompy: the costume's laugh through the foam head, four muffled barks
  R.laughChompy = (sr, r) => {
    const n = S(sr * 1.5), out = new Float32Array(n);
    for (let k = 0; k < 4; k++) {
      const t0 = k * 0.27, seg = throat(n, sr, r, { f0: t => 190 - k * 12 - 40 * t, env: t => { const u = (t * 1.5 - t0) / 0.2; return u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0; }, formants: [[700, 5, 1], [1150, 6, 0.6]], fry: 0.2, breath: 0.4, drive: 1.8 });
      add(out, seg, 1);
    }
    return normalize(biquad(out, 'lp', 1300, 0.7, sr), 0.85);
  };
  // The Hall Monitor's whistle: two shrill blasts with a pea rattling in it
  R.whistle = (sr, r) => {
    const n = S(sr * 1.3), out = new Float32Array(n);
    let ph = 0;
    for (let i = 0; i < n; i++) {
      const t = i / sr, blast = (t < 0.45 ? Math.min(1, t / 0.02) * Math.min(1, (0.45 - t) / 0.03) : 0) + (t > 0.6 && t < 1.25 ? Math.min(1, (t - 0.6) / 0.02) * Math.min(1, (1.25 - t) / 0.05) : 0);
      const f = 2950 * (1 + 0.045 * Math.sign(Math.sin(t * TAU * 38)));
      ph += TAU * f / sr;
      out[i] = (Math.sin(ph) * 0.8 + (r() - 0.5) * 0.3) * blast;
    }
    return normalize(biquad(out, 'bp', 3000, 1.2, sr), 0.8);
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
      const asp = o.breathy ? 0.35 : 0.04;
      glot[i] = (ph < 0.4 ? Math.sin(Math.PI * ph / 0.4) : 0) * amp[i] * (o.breathy ? 0.55 : 1) + noise[i] + (r() - 0.5) * asp * amp[i];
    }
    // Time-varying formant filters
    let out = new Float32Array(n);
    for (const [arr, q, g] of [[F1, 6, 1], [F2, 9, 0.6], [F3, 12, 0.3]]) {
      const y = new Float32Array(n); let x1 = 0, x2 = 0, y1 = 0, y2 = 0, b0 = 0, b2 = 0, a1 = 0, a2 = 0;
      for (let i = 0; i < n; i++) {
        if ((i & 15) === 0) { const f = (arr[i] || 500) * (o.fscale || 1), w = TAU * Math.min(f, sr * 0.45) / sr, al = Math.sin(w) / (2 * q), a0 = 1 + al; b0 = al / a0; b2 = -al / a0; a1 = -2 * Math.cos(w) / a0; a2 = (1 - al) / a0; }
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
    if (o.echo) out = biquad(biquad(out, 'hp', 220, 0.7, sr), 'lp', 5200, 0.7, sr);
    if (o.tape) {
      out = biquad(biquad(out, 'hp', 180, 0.7, sr), 'lp', 4200, 0.7, sr);
      add(out, biquad(white(n, r), 'hp', 5000, 0.5, sr), 0.03);
    }
    return normalize(out, 0.75);
  }

  // ------------------------------------------------------------ CACHE
  // Rendering a sound takes 5-160 ms of main-thread time, too long to happen during play.
  // Everything is rendered ahead: the effects at boot, the chapter's room tones while it loads,
  // and a pool of long voice takes that dialogue lines are cut from. Buffers are made without an
  // AudioContext (one only exists after the first click), at a fixed rate the context resamples.
  const SR = 44100;
  // How many takes of each effect are used (footsteps and doors vary the most)
  const TAKES = { paper: 6, cloth: 4, chew: 4, plasticTap: 4, flashClick: 3, doorLocked: 3, squelch: 3, thunder: 3, stingSpot: 3, rustle: 6, breathIn: 4, breathOut: 4, breathInHeavy: 4, breathOutHeavy: 4, breathCalmIn: 3, breathCalmOut: 3, breathFearIn: 4, breathFearOut: 4, gasp: 2, dropMetal: 2, dropWood: 2, dropDebris: 2, farSteps: 3, roarEater: 3, screechGhost: 3, hissCrawler: 3, groanCounter: 2, moanNeighbor: 2, laughChompy: 2, whistle: 1, impactCardboard: 3, impactBottle: 3, impactSoft: 3, drawerWoodOpen: 3, drawerWoodShut: 3, drawerMetalOpen: 3, drawerMetalShut: 3 };
  const LOOPS = /^(rain|gutter|fluorescent|hvac|poolRoom|warehouse|darkRoom|tunnel|schoolHall|mallAtrium|motelHall|hospitalHall|workshop|carPass|radioStatic)/;
  class Sfx {
    constructor(ctx) { this.ctx = ctx || null; this.cache = new Map(); this.voices = new Map(); this.rng = U.rng(1234); this.sr = SR; }
    attach(ctx) { this.ctx = ctx; }
    toBuffer(data, rate) {
      const chans = Array.isArray(data) ? data : [data];
      const sr = rate || this.sr;
      let b = null;
      try { b = new AudioBuffer({ numberOfChannels: chans.length, length: chans[0].length, sampleRate: sr }); }
      catch (e) { if (this.ctx) b = this.ctx.createBuffer(chans.length, chans[0].length, sr); }
      if (b) chans.forEach((c, i) => b.copyToChannel(c, i));
      return b;
    }
    takes(name) { return /^step_/.test(name) ? 8 : TAKES[name] || (LOOPS.test(name) ? 1 : 2); }
    render(name, i) {
      const list = this.cache.get(name) || [];
      this.cache.set(name, list);
      if (!list[i]) list[i] = this.toBuffer(R[name](this.sr, U.rng(U.hashStr(name) + i * 7919), i));
      return list[i];
    }
    // Random take of a recipe. A take that was not rendered ahead is replaced by one that was.
    get(name, variants = 1) {
      if (!R[name]) return null;
      const list = this.cache.get(name);
      const k = Math.floor(Math.random() * variants);
      if (list && list[k]) return list[k];
      const have = list && list.find(b => b);
      if (have) return have;
      return this.render(name, 0);
    }
    // Render in slices of ~25 ms between frames
    async prerender(names, onProgress) {
      const jobs = [];
      for (const n of names) if (R[n]) for (let i = 0; i < this.takes(n); i++) { const l = this.cache.get(n); if (!l || !l[i]) jobs.push([n, i]); }
      let t0 = performance.now();
      for (let j = 0; j < jobs.length; j++) {
        this.render(jobs[j][0], jobs[j][1]);
        if (performance.now() - t0 > 25) { if (onProgress) onProgress((j + 1) / jobs.length); await new Promise(r => setTimeout(r, 0)); t0 = performance.now(); }
      }
      if (onProgress) onProgress(1);
    }
    effects() { return Object.keys(R).filter(n => !LOOPS.test(n)); }
    loops() { return Object.keys(R).filter(n => LOOPS.test(n)); }
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
    // Voices: one long take per speaker and style; each line is cut from it at a random point
    voiceTake(key, o) {
      let b = this.voices.get(key);
      if (!b) {
        const sr = o.radio ? 16000 : 22050, len = o.tape ? 14 : 12;
        b = this.toBuffer(voice(sr, U.rng(U.hashStr(key) * 131 + 7), len, o), sr);
        this.voices.set(key, b);
      }
      return b;
    }
    voiceClip(key, o, dur) {
      const b = this.voiceTake(key, o);
      const max = Math.max(0, b.duration - dur - 0.05);
      return { buf: b, offset: Math.random() * max, dur: Math.min(dur, b.duration) };
    }
    async prerenderVoices(list, onProgress) {
      for (let k = 0; k < list.length; k++) {
        this.voiceTake(list[k][0], list[k][1]);
        if (onProgress) onProgress((k + 1) / list.length);
        await new Promise(r => setTimeout(r, 0));
      }
    }
    // Kept for callers that only warm a few names
    warm(names) { this.prerender(names); }
  }
  PB.sfxLib = new Sfx(null);
  PB.Sfx = Sfx;
  PB.SfxRecipes = R;
  PB.SfxVoice = voice;
})(typeof window !== 'undefined' ? window : globalThis);
