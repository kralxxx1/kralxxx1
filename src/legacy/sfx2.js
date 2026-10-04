/* More synthesized sounds for the nine shelves (same approach as sfx.js: noise, resonators, modal
   partials, rendered once into buffers):
   - footsteps on snow, ice, gravel, grass, mud and steel grating;
   - softer breathing when you are out of breath (the old takes were too loud and too rough);
   - what the creatures sound like: their footfalls (heavy, bare, wet, a carved hoof, a polished boot,
     a shuffle), the breath close behind you in a chase, and their few quiet voices — nothing screams;
   - the room tones of each place (sea against a hull, pines, a mine, a blizzard, a river in rain, a
     train at speed, a harbour in drizzle, wind over ice, a warm kitchen), the band organ's waltz, a
     choir humming, a music box;
   - the things the chapters do (a starter motor, a chain, a cage, seven knocks on a fire door, a
     canary, a cough, a generator, a gondola, a clock, a flood, a ladder, couplings, wheels, brakes, a
     PA chime, a ride's motor, a crash, the ice cracking far off). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U;
  const R = PB.SfxRecipes;
  const { biquad, sweep, white, pink, brown, decay, add, normalize, modes, hit, crackle, loopify, softclip, throat, breath, S, TAU } = PB.SfxDSP;
  const env = (x, fn) => { const n = x.length; for (let i = 0; i < n; i++) x[i] *= fn(i / n); return x; };
  const tick = (n, sr, r, t0, dur, lo, hi, A) => { const out = new Float32Array(n), L = S(dur * 4 * sr), x = new Float32Array(L); for (let i = 0; i < L; i++) x[i] = (r() * 2 - 1) * Math.exp(-i / sr / dur) * Math.min(1, i / (sr * 0.0006)); let y = biquad(x, 'lp', hi, 0.7, sr); if (lo) y = biquad(y, 'hp', lo, 0.7, sr); return add(out, y, A, S(t0 * sr)); };
  const thud = (n, sr, r, t0, f, tau, A) => { const out = new Float32Array(n), i0 = S(t0 * sr), w = TAU * f / sr; for (let i = i0; i < n; i++) { const t = (i - i0) / sr, e = Math.exp(-t / tau); if (e < 1e-4) break; out[i] = Math.sin(w * (i - i0)) * e * A * Math.min(1, t / 0.003); } return out; };
  const T = PB.SfxTakes;

  // ------------------------------------------------------------ FOOTSTEPS, OUTSIDE
  // Snow: the boot packs it (a low, soft thud) and the crystals squeak and crunch under the weight
  function snowStep(sr, r, deep) {
    const n = S(sr * 0.42), out = new Float32Array(n), v = 0.9 + r() * 0.2;
    for (const [t0, A] of [[0.0, 1], [0.07 + r() * 0.03, 0.7]]) {
      add(out, thud(n, sr, r, t0, 70 * v, 0.035, 0.55 * A));
      const c = crackle(n, sr, r, 2600 * v, k => { const u = (k * n / sr - t0) / 0.14; return u > 0 && u < 1 ? Math.sin(Math.PI * Math.pow(u, 0.6)) * (1 - u) : 0; });
      add(out, biquad(biquad(c, 'bp', 2200 * v, 0.9, sr), 'lp', 6000, 0.7, sr), 2.2 * A);
      add(out, biquad(c, 'bp', 900, 1.2, sr), 1.2 * A);
    }
    if (deep) add(out, biquad(env(pink(n, r), k => Math.sin(Math.PI * Math.min(1, k * 2.2)) * 0.5), 'lp', 1200, 0.7, sr), 0.6);
    return normalize(biquad(out, 'hp', 45, 0.7, sr), 0.6);
  }
  // Ice: hard, a glassy tick, the sheet ringing faintly under you, sometimes a dull knock deeper down
  function iceStep(sr, r) {
    const n = S(sr * 0.5), out = new Float32Array(n), v = 0.9 + r() * 0.2;
    for (const [t0, A] of [[0.0, 1], [0.075 + r() * 0.03, 0.6]]) {
      add(out, tick(n, sr, r, t0, 0.0025, 1800, 9000, 1.3 * A));
      add(out, thud(n, sr, r, t0, 95 * v, 0.02, 0.5 * A));
      add(out, modes(n, sr, [[1850 * v, 0.12, 0.05 * A], [2930 * v, 0.09, 0.035 * A], [4100 * v, 0.06, 0.02 * A]], t0, r));
    }
    if (r() < 0.3) add(out, thud(n, sr, r, 0.02, 48, 0.12, 0.25));
    return normalize(biquad(out, 'hp', 50, 0.7, sr), 0.7);
  }
  function gravelStep(sr, r) {
    const n = S(sr * 0.4), out = new Float32Array(n), v = 0.9 + r() * 0.2;
    for (const [t0, A] of [[0.0, 1], [0.08 + r() * 0.03, 0.75]]) {
      add(out, thud(n, sr, r, t0, 85 * v, 0.025, 0.5 * A));
      const c = crackle(n, sr, r, 1800, k => { const u = (k * n / sr - t0) / 0.12; return u > 0 && u < 1 ? Math.pow(1 - u, 1.2) : 0; });
      add(out, biquad(c, 'bp', 2600 * v, 1.4, sr), 2.5 * A); add(out, biquad(c, 'bp', 5200 * v, 2, sr), 1.0 * A);
    }
    return normalize(biquad(out, 'hp', 50, 0.7, sr), 0.75);
  }
  function grassStep(sr, r) {
    const n = S(sr * 0.32), out = new Float32Array(n);
    for (const [t0, A] of [[0.0, 1], [0.07, 0.7]]) {
      add(out, thud(n, sr, r, t0, 80, 0.025, 0.45 * A));
      const sw = biquad(biquad(pink(n, r), 'hp', 700, 0.7, sr), 'lp', 3200, 0.7, sr);
      add(out, env(sw, k => { const u = (k * n / sr - t0) / 0.15; return u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0; }), 0.6 * A);
    }
    return normalize(out, 0.45);
  }
  // Mud: the foot goes in, and comes out with a suck
  function mudStep(sr, r) {
    const n = S(sr * 0.55), out = new Float32Array(n);
    add(out, thud(n, sr, r, 0, 70, 0.04, 0.6));
    add(out, decay(sweep(white(n, r), 'bp', k => 400 + 300 * k, 1.4, sr), sr, 0.05, 0.0, 0.004), 0.5);
    const t1 = 0.22 + r() * 0.08;
    add(out, decay(sweep(white(n, r), 'bp', k => 300 + 1600 * Math.max(0, (k * 0.55 - t1) * 5), 3, sr), sr, 0.08, t1, 0.03), 0.65);
    add(out, tick(n, sr, r, t1 + 0.07, 0.003, 600, 3000, 0.2));
    return normalize(biquad(out, 'lp', 3500, 0.7, sr), 0.65);
  }
  // Steel grating: a ring and a rattle of the loose grid
  function gratingStep(sr, r) {
    const n = S(sr * 0.6), out = new Float32Array(n), v = 0.9 + r() * 0.2;
    for (const [t0, A] of [[0.0, 1], [0.07, 0.65]]) {
      add(out, modes(n, sr, [[455 * v, 0.09, 0.3 * A], [980 * v, 0.07, 0.22 * A], [1720 * v, 0.05, 0.14 * A], [2890 * v, 0.03, 0.08 * A]], t0, r));
      add(out, tick(n, sr, r, t0, 0.002, 1200, 8000, 0.7 * A));
      for (let k = 0; k < 3; k++) add(out, modes(n, sr, [[2300 + r() * 900, 0.01, 0.06 * A]], t0 + 0.02 + k * (0.012 + r() * 0.01), r));
    }
    return normalize(biquad(out, 'hp', 60, 0.7, sr), 0.8);
  }
  R.step_snow = (sr, r) => snowStep(sr, r, false);
  R.step_deepSnow = (sr, r) => snowStep(sr, r, true);
  R.step_ice = iceStep; R.step_gravel = gravelStep; R.step_grass = grassStep; R.step_mud = mudStep; R.step_grating = gratingStep;

  // ------------------------------------------------------------ BREATHING, SOFTER
  // Out of breath you pant, but it is your own breathing, close and quiet, not a sound effect
  R.breathInHeavy = (sr, r) => breath(sr, r, { inhale: true, dur: 0.48, level: 0.46, voice: 0.01 });
  R.breathOutHeavy = (sr, r) => breath(sr, r, { inhale: false, dur: 0.58, level: 0.44, voice: 0.035, voiceF: 112 });
  R.breathFearIn = (sr, r) => breath(sr, r, { inhale: true, dur: 0.62, level: 0.5, shake: 0.25, voice: 0.012 });
  R.breathFearOut = (sr, r) => breath(sr, r, { inhale: false, dur: 0.9, level: 0.46, shake: 0.35, voice: 0.04, voiceF: 122 });
  R.gasp = (sr, r) => breath(sr, r, { inhale: true, dur: 0.34, level: 0.55, voice: 0.05, voiceF: 150 });
  R.breathRelease = (sr, r) => breath(sr, r, { inhale: false, dur: 1.5, level: 0.5, shake: 0.3, voice: 0.03 });

  // ------------------------------------------------------------ CREATURE FOOTFALLS
  R.cStepHeavy = (sr, r) => { const n = S(sr * 0.6), out = new Float32Array(n); add(out, thud(n, sr, r, 0, 46 + r() * 8, 0.09, 1)); add(out, thud(n, sr, r, 0.004, 110, 0.03, 0.5)); add(out, tick(n, sr, r, 0, 0.006, 120, 1400, 0.8)); add(out, biquad(crackle(n, sr, r, 400, k => Math.exp(-k * 8)), 'bp', 2500, 1, sr), 0.4); return normalize(out, 0.85); };
  R.cStepBare = (sr, r) => { const n = S(sr * 0.25), out = new Float32Array(n); add(out, tick(n, sr, r, 0, 0.005, 500, 2600, 1)); add(out, thud(n, sr, r, 0, 105, 0.018, 0.4)); add(out, tick(n, sr, r, 0.05 + r() * 0.03, 0.004, 700, 2400, 0.4)); return normalize(out, 0.55); };
  R.cStepWet = (sr, r) => { const n = S(sr * 0.4), out = new Float32Array(n); add(out, thud(n, sr, r, 0, 80, 0.03, 0.5)); add(out, decay(sweep(white(n, r), 'bp', k => 2200 - 1600 * Math.min(1, k * 3), 1.3, sr), sr, 0.06, 0, 0.003), 0.7); add(out, tick(n, sr, r, 0.12 + r() * 0.1, 0.003, 900, 4000, 0.1)); return normalize(out, 0.6); };
  R.cStepClop = (sr, r) => { const n = S(sr * 0.35), out = new Float32Array(n), v = 0.9 + r() * 0.2; add(out, modes(n, sr, [[620 * v, 0.035, 0.5], [1270 * v, 0.025, 0.35], [2140 * v, 0.015, 0.2]], 0, r)); add(out, tick(n, sr, r, 0, 0.002, 900, 7000, 0.8)); add(out, thud(n, sr, r, 0, 140, 0.02, 0.4)); return normalize(out, 0.7); };
  R.cStepBoot = (sr, r) => { const n = S(sr * 0.32), out = new Float32Array(n); add(out, tick(n, sr, r, 0, 0.0025, 900, 7000, 1.1)); add(out, thud(n, sr, r, 0, 135, 0.02, 0.5)); add(out, tick(n, sr, r, 0.06, 0.003, 700, 5000, 0.5)); if (r() < 0.5) add(out, modes(n, sr, [[2300 + r() * 400, 0.03, 0.04]], 0.07, r)); return normalize(out, 0.65); };
  R.cStepShuffle = (sr, r) => { const n = S(sr * 0.45), out = env(biquad(biquad(pink(n, r), 'bp', 900, 1.1, sr), 'lp', 2800, 0.7, sr), k => Math.sin(Math.PI * Math.pow(k, 0.7)) * (1 - k * 0.5)); add(out, thud(n, sr, r, 0.02, 90, 0.02, 0.2)); return normalize(out, 0.45); };
  R.cStepSnow = (sr, r) => snowStep(sr, r, true);
  T.cStepHeavy = 3; T.cStepBare = 4; T.cStepWet = 4; T.cStepClop = 4; T.cStepBoot = 4; T.cStepShuffle = 3; T.cStepSnow = 4;

  // ------------------------------------------------------------ CREATURE VOICES (low, close, never a scream)
  R.cGroanDeep = (sr, r) => { const n = S(sr * 2.4); return normalize(throat(n, sr, r, { f0: t => 58 + 10 * Math.sin(t * 5) - 8 * t, env: t => Math.min(1, t / 0.35) * Math.pow(1 - t, 0.9), formants: [[260, 3, 1], [610, 4, 0.55], [1450, 5, 0.15]], low: 140, fry: 0.55, breath: 0.35, drive: 1.6 }), 0.7); };
  R.cMoanWet = (sr, r) => { const n = S(sr * 2.0), out = throat(n, sr, r, { f0: t => 92 - 22 * t + 5 * Math.sin(t * 9), env: t => Math.min(1, t / 0.25) * Math.pow(1 - t, 0.8), formants: [[380, 5, 1], [900, 5, 0.5], [2300, 6, 0.12]], fry: 0.35, breath: 0.4, drive: 1.4 }); add(out, biquad(crackle(n, sr, r, 50, t => Math.sin(Math.PI * t)), 'bp', 450, 2, sr), 1.5); return normalize(out, 0.65); };
  // The intake of breath when one of them knows you are there
  R.cIntake = (sr, r) => { const n = S(sr * 0.9), x = biquad(biquad(pink(n, r), 'bp', 2400, 1.1, sr), 'hp', 900, 0.7, sr); env(x, k => Math.pow(Math.min(1, k / 0.55), 1.6) * (k > 0.6 ? Math.pow((1 - k) / 0.4, 2) : 1)); add(x, biquad(throat(n, sr, r, { f0: () => 75, env: k => (k > 0.5 && k < 0.8 ? Math.sin(Math.PI * (k - 0.5) / 0.3) : 0) * 0.3, formants: [[500, 4, 1], [1200, 5, 0.4]], fry: 0.6, breath: 0.6, drive: 1.2 }), 'lp', 2000, 0.7, sr), 0.6); return normalize(x, 0.55); };
  R.cHiss = (sr, r) => { const n = S(sr * 1.4), x = env(biquad(white(n, r), 'bp', 5200, 1.2, sr), k => Math.min(1, k / 0.35) * Math.pow(1 - k, 1.4)); return normalize(x, 0.4); };
  R.cClicks = (sr, r) => { const n = S(sr * 1.3), out = new Float32Array(n); let t = 0.02; while (t < 1.2) { add(out, modes(n, sr, [[1500 + r() * 600, 0.006, 0.6], [3100 + r() * 500, 0.003, 0.3]], t, r)); t += 0.035 + r() * 0.05; } add(out, throat(n, sr, r, { f0: () => 40, env: k => Math.sin(Math.PI * k) * 0.4, formants: [[300, 3, 1]], fry: 0.8, breath: 0.4, drive: 1.2 }), 0.4); return normalize(out, 0.55); };
  R.cGurgle = (sr, r) => { const n = S(sr * 1.6), out = biquad(crackle(n, sr, r, 45, t => Math.sin(Math.PI * t)), 'bp', 380, 1.8, sr); for (let i = 0; i < n; i++) out[i] *= 3; add(out, throat(n, sr, r, { f0: t => 44 + 6 * Math.sin(t * 12), env: t => Math.sin(Math.PI * t) * 0.6, formants: [[300, 4, 1], [700, 5, 0.4]], low: 120, fry: 0.7, breath: 0.5, drive: 1.6 }), 0.6); return normalize(biquad(out, 'lp', 1600, 0.7, sr), 0.6); };
  // The Hush: a long shh, the way you would quiet a child
  R.cShh = (sr, r) => { const n = S(sr * 2.6), x = env(biquad(biquad(pink(n, r), 'hp', 2400, 0.7, sr), 'lp', 7500, 0.7, sr), k => Math.pow(Math.sin(Math.PI * Math.min(1, k * 1.05)), 1.4)); return normalize(x, 0.35); };
  // Older kids laughing, somewhere inside a hut
  R.cLaughTeen = (sr, r) => { const n = S(sr * 2.0), out = new Float32Array(n); const who = [[230, 0.0], [270, 0.35], [205, 0.9]]; for (const [f, t0] of who) for (let k = 0; k < 5; k++) { const a = t0 + k * (0.15 + r() * 0.04); add(out, throat(n, sr, r, { f0: t => f * (1 - 0.15 * ((t * 2 - a) / 0.12)), env: t => { const u = (t * 2.0 - a) / 0.12; return u > 0 && u < 1 ? Math.sin(Math.PI * u) * (1 - k * 0.12) : 0; }, formants: [[750, 5, 1], [1250, 6, 0.6], [2600, 7, 0.2]], fry: 0.1, breath: 0.45, drive: 1.3 }), 0.5); } return normalize(biquad(out, 'lp', 1700, 0.7, sr), 0.6); };
  // Lotte: an old laughing record through a horn speaker, warbling
  R.cLaughLotte = (sr, r) => { const n = S(sr * 3.2), out = new Float32Array(n); for (let k = 0; k < 9; k++) { const a = 0.05 + k * 0.31; add(out, throat(n, sr, r, { f0: t => (175 + (k % 3) * 25) * (1 + 0.04 * Math.sin(t * 3.2 * TAU * 4)), env: t => { const u = (t * 3.2 - a) / 0.2; return u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0; }, formants: [[720, 4, 1], [1150, 5, 0.7], [2500, 6, 0.25]], fry: 0.15, breath: 0.35, drive: 2.4 }), 0.6); } let y = biquad(biquad(out, 'hp', 500, 0.8, sr), 'lp', 2600, 1.2, sr); add(y, crackle(n, sr, r, 40), 0.25); add(y, biquad(white(n, r), 'hp', 3000, 0.7, sr), 0.02); return normalize(softclip(y, 1.6), 0.7); };
  // A bronze bell (the Bellman's; a church's; a clock's), several pitches
  const bell = (sr, r, f, dur) => { const n = S(sr * dur), out = modes(n, sr, [[f * 0.5, dur * 0.6, 0.5], [f, dur * 0.45, 1], [f * 1.19, dur * 0.4, 0.5], [f * 1.5, dur * 0.3, 0.45], [f * 2.0, dur * 0.25, 0.4], [f * 2.52, dur * 0.18, 0.3], [f * 3.38, dur * 0.12, 0.2]], 0, r); add(out, hit(n, sr, r, 0, 0.5, 'bp', f * 3, 1.5, 0.01)); return normalize(out, 0.8); };
  R.cBellToll = (sr, r) => bell(sr, r, 196, 4.5);
  R.sfxClockStrike = (sr, r) => bell(sr, r, 392, 2.6);
  R.sfxShipBell = (sr, r) => bell(sr, r, 523, 2.2);
  // The punch: two clean clicks of steel
  R.cPunch = (sr, r) => { const n = S(sr * 0.3), out = new Float32Array(n); add(out, modes(n, sr, [[3200, 0.01, 0.6], [5400, 0.006, 0.3], [1800, 0.012, 0.3]], 0.0, r)); add(out, modes(n, sr, [[2900, 0.012, 0.5], [4900, 0.007, 0.3]], 0.09, r)); add(out, tick(n, sr, r, 0.09, 0.002, 2000, 9000, 0.4)); return normalize(out, 0.6); };
  // Under the plates of a gangway: three knocks, muffled by steel
  R.cKnockUnder = (sr, r) => { const n = S(sr * 1.2), out = new Float32Array(n); for (const t of [0, 0.32 + r() * 0.05, 0.6 + r() * 0.08]) { add(out, modes(n, sr, [[180, 0.05, 0.6], [420, 0.04, 0.4], [960, 0.02, 0.2]], t, r)); add(out, tick(n, sr, r, t, 0.004, 100, 900, 0.6)); } return normalize(biquad(out, 'lp', 1200, 0.7, sr), 0.6); };
  R.cCreakBranch = (sr, r) => { const n = S(sr * 1.6), x = new Float32Array(n); let i = 0; const r0 = 30 + r() * 30; while (i < n) { const k = i / n; x[i] = Math.sin(Math.PI * k) * (0.5 + r()); i += Math.max(1, S(sr / (r0 + 40 * Math.sin(k * 4)) * (0.8 + r() * 0.4))); } const out = new Float32Array(n); for (const [f, q, g] of [[310, 10, 0.7], [740, 12, 0.4], [1500, 10, 0.2]]) add(out, biquad(x, 'bp', f * (0.9 + r() * 0.2), q, sr), g); return normalize(out, 0.6); };
  R.cBellow = (sr, r) => { const n = S(sr * 2.2); return normalize(biquad(throat(n, sr, r, { f0: t => 125 - 55 * t + 10 * Math.sin(t * 7), env: t => Math.min(1, t / 0.2) * Math.pow(1 - t, 0.7), formants: [[420, 4, 1], [880, 4, 0.6], [1900, 5, 0.25]], low: 160, fry: 0.4, breath: 0.4, drive: 2 }), 'lp', 2400, 0.7, sr), 0.7); };
  R.cWhump = (sr, r) => { const n = S(sr * 1.2), out = env(biquad(brown(n, r), 'lp', 220, 0.8, sr), k => Math.min(1, k / 0.02) * Math.exp(-k * 5)); add(out, env(biquad(white(n, r), 'hp', 3000, 0.7, sr), k => Math.exp(-k * 4) * Math.min(1, k / 0.05)), 0.15); return normalize(out, 0.7); };
  R.cRattle = (sr, r) => { const n = S(sr * 0.8), out = new Float32Array(n); for (let k = 0; k < 9; k++) add(out, modes(n, sr, [[2600 + r() * 2000, 0.012, 0.3], [5200 + r() * 1500, 0.008, 0.15]], k * 0.06 + r() * 0.03, r)); return normalize(out, 0.5); };
  for (const k of ['cGroanDeep', 'cMoanWet', 'cIntake', 'cHiss', 'cClicks', 'cGurgle', 'cShh', 'cLaughTeen', 'cLaughLotte', 'cPunch', 'cKnockUnder', 'cCreakBranch', 'cBellow', 'cWhump', 'cRattle']) T[k] = T[k] || 2;

  // ------------------------------------------------------------ THE CLOSE BREATH, LOOPED
  // In, out, in, out: a wet rattle in the throat on the way in, a low voiced growl out. Played at the
  // creature's head, it is what you hear right behind you when it is close.
  R.loopRasp = (sr, r) => {
    const cyc = 1.7, N = 4, n = S(sr * cyc * N + sr * 0.5), out = new Float32Array(n);
    for (let k = 0; k < N; k++) {
      const t0 = k * cyc + r() * 0.1, inL = 0.65 + r() * 0.1, outL = 0.8 + r() * 0.1;
      const m = S(inL * sr), noi = biquad(biquad(pink(m, r), 'bp', 1300 + r() * 400, 1.3, sr), 'hp', 500, 0.7, sr);
      env(noi, u => Math.pow(Math.sin(Math.PI * u), 1.3));
      add(out, noi, 0.9, S(t0 * sr));
      add(out, biquad(crackle(m, sr, r, 70, u => Math.sin(Math.PI * u)), 'bp', 900, 2, sr), 1.6, S(t0 * sr));
      const o2 = S(outL * sr), gr = throat(o2, sr, r, { f0: u => 62 - 10 * u, env: u => Math.pow(Math.sin(Math.PI * u), 1.2) * 0.8, formants: [[350, 3, 1], [800, 4, 0.5], [1700, 5, 0.15]], low: 150, fry: 0.6, breath: 0.6, drive: 1.3 });
      add(out, gr, 0.75, S((t0 + inL + 0.05) * sr));
    }
    return loopify(normalize(biquad(out, 'lp', 3200, 0.7, sr), 0.7), sr, 0.4);
  };
  // Lotte never stops laughing: her laugh with the whirr of her works under it
  R.loopLotte = (sr, r) => {
    const n = S(sr * 7.0), out = new Float32Array(n), l = R.cLaughLotte(sr, r);
    add(out, l, 1, 0); add(out, l, 0.8, S(sr * 3.6));
    const wh = new Float32Array(n); for (let i = 0; i < n; i++) wh[i] = Math.sin(TAU * 118 * i / sr) * 0.04 * (0.6 + 0.4 * Math.sin(TAU * 0.9 * i / sr));
    add(out, biquad(wh, 'lp', 600, 0.7, sr), 1); add(out, biquad(crackle(n, sr, r, 9), 'bp', 2400, 3, sr), 0.4);
    return loopify(normalize(out, 0.7), sr, 0.4);
  };

  // ------------------------------------------------------------ ROOM TONES (looped)
  const gust = (n, sr, r, rate, depth) => { const g = new Float32Array(n); let a = r() * 6, b = r() * 6; for (let i = 0; i < n; i++) { const t = i / sr; g[i] = 1 - depth + depth * (0.5 + 0.3 * Math.sin(TAU * rate * t + a) + 0.2 * Math.sin(TAU * rate * 2.7 * t + b)); } return g; };
  const mul = (x, g) => { for (let i = 0; i < x.length; i++) x[i] *= g[i]; return x; };
  // Sea against a steel hull in fog: a slow swell, the slap and run of water, the ship working
  R.loopSea = (sr, r) => {
    const n = S(sr * 14), out = mul(biquad(brown(n, r), 'lp', 380, 0.7, sr), gust(n, sr, r, 0.11, 0.7));
    for (let t = 0.5; t < 13; t += 1.6 + r() * 2.2) { const m = S(sr * 1.2), s = env(biquad(biquad(white(m, r), 'bp', 900 + r() * 700, 0.8, sr), 'lp', 3000, 0.7, sr), u => Math.min(1, u * 8) * Math.pow(1 - u, 2)); add(out, s, 0.25 + r() * 0.2, S(t * sr)); }
    for (let t = 2; t < 13; t += 4 + r() * 4) add(out, R.cCreakBranch(sr, r), 0.12, S(t * sr));
    return loopify(normalize(out, 0.55), sr, 1);
  };
  // Pines at night: wind in the needles, gusting; far off, an owl; the field crickets very faint
  R.loopForest = (sr, r) => {
    const n = S(sr * 16), out = mul(biquad(biquad(pink(n, r), 'bp', 700, 0.6, sr), 'lp', 2200, 0.7, sr), gust(n, sr, r, 0.07, 0.75));
    for (let t = 0.2; t < 15.5; t += 0.9 + r() * 1.6) for (let k = 0; k < 3; k++) add(out, modes(S(sr * 0.05), sr, [[4300 + r() * 300, 0.006, 1]], 0, r), 0.012, S((t + k * 0.05) * sr));
    const owl = t0 => { const m = S(sr * 1.4), o = new Float32Array(m); for (const [a, l] of [[0, 0.35], [0.5, 0.5]]) { const i0 = S(a * sr), L = S(l * sr); for (let i = 0; i < L; i++) { const u = i / L; o[i0 + i] += Math.sin(TAU * (380 - 40 * u) * i / sr) * Math.sin(Math.PI * u) * 0.5; } } add(out, biquad(o, 'lp', 900, 0.7, sr), 0.08, S(t0 * sr)); };
    owl(6 + r() * 4);
    return loopify(normalize(out, 0.5), sr, 1);
  };
  // A mine level: the deep rumble of the rock, drips, a timber taking weight somewhere
  R.loopMine = (sr, r) => {
    const n = S(sr * 14), out = mul(biquad(brown(n, r), 'lp', 95, 0.8, sr), gust(n, sr, r, 0.05, 0.4));
    for (let t = 0.3; t < 13.5; t += 0.7 + r() * 2.6) { const f = 1500 + r() * 1500, m = S(sr * 0.15), d = new Float32Array(m); for (let i = 0; i < m; i++) { const u = i / sr; d[i] = Math.sin(TAU * (f + 900 * u * 6) * u) * Math.exp(-u / 0.03); } add(out, d, 0.12 + r() * 0.1, S(t * sr)); }
    add(out, R.cCreakBranch(sr, r), 0.15, S(sr * (5 + r() * 5)));
    return loopify(normalize(out, 0.55), sr, 1);
  };
  // The blizzard: a howl through the eaves, rising and falling, a whistle in a gap
  R.loopBlizzard = (sr, r) => {
    const n = S(sr * 14), src = pink(n, r), g = gust(n, sr, r, 0.09, 0.8);
    const out = mul(sweep(src, 'bp', k => 420 + 300 * Math.sin(k * TAU * 1.3) + 200 * Math.sin(k * TAU * 3.1), 2.2, sr), g);
    add(out, mul(sweep(white(n, r), 'bp', k => 1250 + 350 * Math.sin(k * TAU * 2.2), 14, sr), gust(n, sr, r, 0.13, 0.95)), 0.35);
    add(out, mul(biquad(brown(n, r), 'lp', 200, 0.7, sr), g), 0.6);
    return loopify(normalize(out, 0.6), sr, 1);
  };
  // A river over its banks in the rain
  R.loopRiver = (sr, r) => {
    const n = S(sr * 10), out = biquad(biquad(pink(n, r), 'hp', 280, 0.7, sr), 'lp', 3200, 0.7, sr);
    mul(out, gust(n, sr, r, 0.2, 0.25)); add(out, biquad(brown(n, r), 'lp', 300, 0.7, sr), 0.5);
    return loopify(normalize(out, 0.55), sr, 0.8);
  };
  // A train at night: the rumble of the bogies, the hum of the wheels, the wind along the windows
  R.loopTrain = (sr, r) => {
    const n = S(sr * 10), out = biquad(brown(n, r), 'lp', 170, 0.8, sr);
    const hum = new Float32Array(n); for (let i = 0; i < n; i++) { const t = i / sr; hum[i] = Math.sin(TAU * 48 * t) * 0.25 * (0.8 + 0.2 * Math.sin(TAU * 0.7 * t)) + Math.sin(TAU * 96.5 * t) * 0.08; }
    add(out, hum, 1); add(out, mul(biquad(pink(n, r), 'bp', 1400, 0.7, sr), gust(n, sr, r, 0.15, 0.5)), 0.12);
    add(out, biquad(white(n, r), 'bp', 2400, 18, sr), 0.02);
    return loopify(normalize(out, 0.6), sr, 0.8);
  };
  // The harbour after closing: drizzle on asphalt, water against the quay, a buoy bell far out
  R.loopHarbour = (sr, r) => {
    const n = S(sr * 16), out = biquad(biquad(white(n, r), 'hp', 3500, 0.7, sr), 'lp', 9000, 0.7, sr);
    for (let i = 0; i < n; i++) out[i] *= 0.12;
    add(out, mul(biquad(brown(n, r), 'lp', 300, 0.7, sr), gust(n, sr, r, 0.1, 0.6)), 0.6);
    for (let t = 0.4; t < 15; t += 1.1 + r() * 1.8) add(out, env(biquad(white(S(sr * 0.5), r), 'bp', 700 + r() * 500, 1.1, sr), u => Math.min(1, u * 6) * Math.pow(1 - u, 2)), 0.15, S(t * sr));
    add(out, biquad(R.sfxShipBell(sr, r), 'lp', 1500, 0.7, sr), 0.06, S(sr * (4 + r() * 6)));
    return loopify(normalize(out, 0.5), sr, 1);
  };
  // Wind over the ice, and the ice singing: long falling pings travelling under it
  R.loopIceWind = (sr, r) => {
    const n = S(sr * 18), out = mul(biquad(biquad(pink(n, r), 'bp', 520, 0.6, sr), 'lp', 1800, 0.7, sr), gust(n, sr, r, 0.06, 0.8));
    add(out, biquad(biquad(white(n, r), 'hp', 4500, 0.7, sr), 'lp', 10000, 0.7, sr), 0.04);
    for (let t = 1.5; t < 17; t += 4 + r() * 5) { const m = S(sr * 1.4), s = new Float32Array(m), f0 = 1800 + r() * 1400; let ph = 0; for (let i = 0; i < m; i++) { const u = i / m; ph += (f0 * Math.pow(0.12, u)) / sr; s[i] = Math.sin(TAU * ph) * Math.pow(1 - u, 1.5) * Math.min(1, u * 30); } add(out, s, 0.05 + r() * 0.04, S(t * sr)); }
    return loopify(normalize(out, 0.5), sr, 1.2);
  };
  // Inside a warm house: the stove ticking and crackling, the long-case clock, the wind outside
  R.loopHouse = (sr, r) => {
    const n = S(sr * 12), out = biquad(crackle(n, sr, r, 9, () => 0.5 + r() * 0.5), 'bp', 3000, 1.2, sr);
    for (let i = 0; i < n; i++) out[i] *= 0.8;
    for (let t = 0.3; t < 12; t += 2.6 + r() * 3) add(out, hit(S(sr * 0.1), sr, r, 0, 0.4, 'bp', 1600, 1, 0.01), 0.5, S(t * sr));
    for (let t = 0; t < 12; t += 1.0) add(out, modes(S(sr * 0.1), sr, [[1900, 0.01, 0.4], [3400, 0.006, 0.2], [700, 0.015, 0.3]], 0, r), t % 2 ? 0.1 : 0.13, S(t * sr));
    add(out, mul(biquad(pink(n, r), 'bp', 400, 0.7, sr), gust(n, sr, r, 0.07, 0.8)), 0.08);
    return loopify(normalize(out, 0.4), sr, 0.8);
  };
  // A rushing flood: the whole valley coming back
  R.loopFlood = (sr, r) => {
    const n = S(sr * 10), out = mul(biquad(pink(n, r), 'lp', 900, 0.7, sr), gust(n, sr, r, 0.18, 0.4));
    add(out, biquad(brown(n, r), 'lp', 140, 0.8, sr), 1.2);
    return loopify(normalize(out, 0.7), sr, 0.8);
  };
  // A ride's motor and chain under the track
  R.loopRide = (sr, r) => {
    const n = S(sr * 6), out = new Float32Array(n);
    for (let i = 0; i < n; i++) { const t = i / sr; out[i] = Math.sin(TAU * 98 * t) * 0.2 + ((t * 49) % 1 - 0.5) * 0.2; }
    add(out, biquad(crackle(n, sr, r, 22), 'bp', 1600, 2, sr), 0.6); add(out, biquad(brown(n, r), 'lp', 200, 0.7, sr), 0.4);
    return loopify(normalize(biquad(out, 'lp', 1200, 0.7, sr), 0.5), sr, 0.5);
  };
  R.loopCable = (sr, r) => {
    const n = S(sr * 6), out = new Float32Array(n);
    for (let i = 0; i < n; i++) { const t = i / sr; out[i] = Math.sin(TAU * (220 + 3 * Math.sin(TAU * 0.5 * t)) * t) * 0.15 + Math.sin(TAU * 440 * t) * 0.05; }
    add(out, biquad(crackle(n, sr, r, 12), 'bp', 900, 2, sr), 0.6); add(out, biquad(brown(n, r), 'lp', 150, 0.7, sr), 0.5);
    return loopify(normalize(out, 0.5), sr, 0.5);
  };
  // The band organ's waltz: reeds and pipes, an oom-pah-pah bass, a glockenspiel, a little out of tune
  R.loopOrgan = (sr, r) => {
    const bpm = 132, beat = 60 / bpm, bars = 16, n = S(sr * beat * 3 * bars), out = new Float32Array(n);
    const A = 440, note = s => A * Math.pow(2, s / 12);
    // a waltz in D minor: melody in semitones from A4 (one note per beat, 0 = rest)
    const mel = [5, 0, 8, 7, 5, 3, 5, 0, 0, 1, 3, 5, 3, 1, 0, -2, 0, 1, 0, -2, -4, -2, 0, 0, 5, 0, 8, 7, 5, 3, 5, 0, 10, 8, 7, 5, 3, 1, 3, 5, 3, 1, 0, -2, -4, -7, 0, 0];
    const roots = [-7, -7, -10, -10, -12, -12, -7, -7, -7, -7, -10, -10, -14, -12, -7, -7];
    const voice = (f, t0, dur, amp, kind) => {
      const i0 = S(t0 * sr), L = Math.min(n - i0, S(dur * sr)); let ph = 0;
      for (let i = 0; i < L; i++) {
        const t = i / sr, e = Math.min(1, t / 0.012) * (kind === 'glock' ? Math.exp(-t / 0.4) : Math.min(1, (dur - t) / 0.04)), vib = 1 + 0.004 * Math.sin(TAU * 5.6 * t);
        ph += f * vib / sr; const p = ph % 1;
        const w = kind === 'reed' ? (p < 0.5 ? 1 : -1) * 0.5 + (2 * p - 1) * 0.5 : kind === 'pipe' ? Math.sin(TAU * p) + 0.3 * Math.sin(2 * TAU * p) : kind === 'glock' ? Math.sin(TAU * p) + 0.25 * Math.sin(TAU * p * 2.76) : Math.sin(TAU * p);
        out[i0 + i] += w * e * amp;
      }
    };
    for (let b = 0; b < bars * 3; b++) {
      const t0 = b * beat, m = mel[b % mel.length], bar = Math.floor(b / 3), rt = roots[bar % roots.length];
      if (m) { const f = note(m) * (1 + (r() - 0.5) * 0.006); voice(f, t0, beat * 0.92, 0.16, 'reed'); voice(f * 2, t0, beat * 0.92, 0.05, 'pipe'); if (b % 3 === 0) voice(f * 4, t0, beat, 0.05, 'glock'); }
      if (b % 3 === 0) voice(note(rt - 12), t0, beat * 0.8, 0.22, 'pipe');
      else { voice(note(rt), t0, beat * 0.45, 0.06, 'reed'); voice(note(rt + 3), t0, beat * 0.45, 0.05, 'reed'); voice(note(rt + 7), t0, beat * 0.45, 0.05, 'reed'); }
      if (b % 3 === 0) add(out, hit(S(sr * 0.2), sr, r, 0, 0.25, 'lp', 160, 0.8, 0.06), 1, S(t0 * sr));
    }
    let y = biquad(biquad(out, 'lp', 4200, 0.7, sr), 'hp', 70, 0.7, sr);
    // the slow wobble of a tired bellows
    for (let i = 0; i < n; i++) y[i] *= 0.85 + 0.15 * Math.sin(TAU * 0.31 * i / sr);
    return normalize(y, 0.7);
  };
  // The choir: five voices humming the last hymn on "oo", slow, in the dark
  R.loopChoir = (sr, r) => {
    const n = S(sr * 16), out = new Float32Array(n);
    const chords = [[146.8, 220, 293.7, 349.2, 440], [130.8, 196, 261.6, 329.6, 392], [116.5, 174.6, 233.1, 293.7, 349.2], [130.8, 196, 246.9, 329.6, 392]];
    chords.forEach((ch, k) => ch.forEach((f, v) => {
      const m = S(sr * 4.6), g = throat(m, sr, r, { f0: u => f * (1 + 0.006 * Math.sin(u * 4.6 * TAU * (4.8 + v * 0.3))), env: u => Math.min(1, u / 0.25) * Math.min(1, (1 - u) / 0.3), formants: [[310, 6, 1], [860, 8, 0.35], [2250, 10, 0.06]], fry: 0, breath: 0.25, drive: 1, jitter: 0.03 });
      add(out, g, 0.22, S(k * 4 * sr));
    }));
    return loopify(normalize(biquad(out, 'lp', 2600, 0.7, sr), 0.6), sr, 0.6);
  };
  // A music box: comb tines, a waltz you almost know, slowing a little
  R.sfxMusicBox = (sr, r) => {
    const n = S(sr * 12), out = new Float32Array(n), mel = [0, 4, 7, 12, 11, 7, 9, 5, 4, 0, 2, 4, 7, 4, 2, -1, 0, 4, 7, 12, 14, 12, 11, 9, 7, 9, 5, 2, 4, 0, 0, 0];
    let t = 0.1;
    for (let k = 0; k < mel.length && t < 11.5; k++) { const f = 784 * Math.pow(2, mel[k] / 12) * (1 + (r() - 0.5) * 0.01); add(out, modes(S(sr * 1.4), sr, [[f, 0.6, 0.5], [f * 2.0, 0.25, 0.15], [f * 5.4, 0.06, 0.08]], 0, r), 0.6, S(t * sr)); t += 0.36 * (1 + k / mel.length * 0.4); }
    add(out, biquad(crackle(n, sr, r, 30), 'bp', 4000, 2, sr), 0.05);
    return normalize(out, 0.55);
  };
  T.sfxMusicBox = 1; T.loopOrgan = 1; T.loopChoir = 1;

  // ------------------------------------------------------------ WHAT THE CHAPTERS DO
  const motor = (sr, r, dur, f0, f1, amp = 1, am = 0) => { const n = S(sr * dur), out = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const u = i / n, f = f0 + (f1 - f0) * u; ph += f / sr; out[i] = ((ph % 1) * 2 - 1) * amp * (am ? 0.6 + 0.4 * Math.sin(TAU * am * i / sr) : 1) * Math.min(1, u * 20) * Math.min(1, (1 - u) * 10); } return biquad(out, 'lp', 900, 0.7, sr); };
  R.sfxCrank = (sr, r) => { const n = S(sr * 1.8), out = motor(sr, r, 1.8, 130, 120, 0.5, 9); add(out, biquad(crackle(n, sr, r, 18), 'bp', 1200, 2, sr), 0.6); return normalize(out, 0.7); };
  R.sfxSputter = (sr, r) => { const n = S(sr * 1.6), out = new Float32Array(n); for (let t = 0.05; t < 1.3; t += 0.08 + Math.pow(r(), 0.5) * 0.25) add(out, hit(S(sr * 0.2), sr, r, 0, 0.8, 'lp', 300, 0.8, 0.04), 1, S(t * sr)); add(out, motor(sr, r, 1.6, 90, 30, 0.3, 6), 1); return normalize(out, 0.75); };
  R.sfxEngineCatch = (sr, r) => { const n = S(sr * 3.0), out = new Float32Array(n); for (let t = 0.05; t < 0.6; t += 0.08) add(out, hit(S(sr * 0.2), sr, r, 0, 0.7, 'lp', 280, 0.8, 0.04), 1, S(t * sr)); add(out, motor(sr, r, 3.0, 35, 32, 0.6, 12), 1); return normalize(out, 0.75); };
  R.sfxPour = (sr, r) => { const n = S(sr * 3), out = new Float32Array(n); for (let t = 0.05; t < 2.8; t += 0.12 + r() * 0.08) add(out, env(biquad(white(S(sr * 0.12), r), 'bp', 400 + r() * 400, 4, sr), u => Math.sin(Math.PI * u)), 0.5, S(t * sr)); add(out, biquad(pink(n, r), 'bp', 1800, 0.8, sr), 0.08); return normalize(out, 0.6); };
  R.sfxChain = (sr, r) => { const n = S(sr * 1.3), out = new Float32Array(n); for (let k = 0; k < 16; k++) add(out, modes(S(sr * 0.2), sr, [[2400 + r() * 2600, 0.03, 0.4], [5600 + r() * 1800, 0.015, 0.2]], 0, r), 0.6, S((k * 0.06 + r() * 0.05) * sr)); return normalize(out, 0.6); };
  R.sfxClunk = (sr, r) => { const n = S(sr * 0.8), out = modes(n, sr, [[160, 0.12, 0.6], [420, 0.08, 0.4], [1100, 0.03, 0.2]], 0, r); add(out, hit(n, sr, r, 0, 0.8, 'lp', 600, 0.8, 0.03)); return normalize(out, 0.85); };
  R.sfxGateSlam = (sr, r) => { const n = S(sr * 1.6), out = modes(n, sr, [[210, 0.5, 0.4], [530, 0.4, 0.3], [1180, 0.25, 0.2], [2350, 0.12, 0.1]], 0, r); add(out, hit(n, sr, r, 0, 0.9, 'lp', 900, 0.8, 0.02)); add(out, R.sfxChain(sr, r), 0.3, S(sr * 0.05)); return normalize(out, 0.9); };
  R.sfxTwang = (sr, r) => { const n = S(sr * 1.8), out = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const u = i / sr; ph += (310 - 90 * Math.min(1, u)) / sr; out[i] = Math.sin(TAU * ph) * Math.exp(-u / 0.6) * 0.5; } add(out, R.sfxClunk(sr, r), 0.8); return normalize(out, 0.8); };
  R.sfxMotorUp = (sr, r) => { const n = S(sr * 2.6), out = new Float32Array(n); let a = 0, b = 0; for (let i = 0; i < n; i++) { const u = i / n, f = 40 + 90 * Math.min(1, u * 1.4); a += f / sr; b += f * 9 / sr; out[i] = (Math.sin(TAU * a) * 0.5 + Math.sin(TAU * b) * 0.08) * Math.min(1, u * 6); } return normalize(out, 0.6); };
  R.sfxRatchet = (sr, r) => { const n = S(sr * 1.0), out = new Float32Array(n); for (let t = 0; t < 0.95; t += 0.11) add(out, modes(S(sr * 0.08), sr, [[2100, 0.01, 0.5], [3700, 0.006, 0.25], [900, 0.012, 0.3]], 0, r), 0.7, S(t * sr)); return normalize(out, 0.6); };
  R.sfxKnockSteel = (sr, r) => { const n = S(sr * 0.5), out = modes(n, sr, [[175, 0.08, 0.6], [410, 0.06, 0.4], [930, 0.03, 0.2]], 0, r); add(out, tick(n, sr, r, 0, 0.004, 80, 900, 0.7)); return normalize(biquad(out, 'lp', 1100, 0.7, sr), 0.7); };
  R.sfxCanary = (sr, r) => { const n = S(sr * 1.6), out = new Float32Array(n); let t = 0.05; while (t < 1.4) { const L = S(sr * (0.04 + r() * 0.05)), f0 = 3200 + r() * 1600, f1 = f0 * (0.8 + r() * 0.5); let ph = 0; for (let i = 0; i < L; i++) { const u = i / L; ph += (f0 + (f1 - f0) * u) / sr; out[S(t * sr) + i] += Math.sin(TAU * ph) * Math.sin(Math.PI * u) * 0.4; } t += 0.05 + r() * 0.12; } return normalize(out, 0.5); };
  R.sfxCough = (sr, r) => { const n = S(sr * 1.2), out = new Float32Array(n); for (const t of [0, 0.35, 0.62]) add(out, throat(S(sr * 0.3), sr, r, { f0: u => 160 - 40 * u, env: u => Math.min(1, u * 15) * Math.pow(1 - u, 2), formants: [[600, 3, 1], [1400, 4, 0.6], [2800, 5, 0.3]], fry: 0.3, breath: 0.85, drive: 1.6 }), t ? 0.7 : 1, S(t * sr)); return normalize(out, 0.7); };
  R.sfxPullCord = (sr, r) => { const n = S(sr * 0.7), out = env(sweep(white(n, r), 'bp', u => 600 + 2400 * u, 3, sr), u => Math.sin(Math.PI * Math.pow(u, 0.5))); add(out, hit(n, sr, r, 0.5, 0.6, 'lp', 300, 0.8, 0.04)); return normalize(out, 0.6); };
  R.sfxClink = (sr, r) => normalize(modes(S(sr * 0.6), sr, [[2850 + r() * 300, 0.12, 0.5], [4150 + r() * 300, 0.08, 0.3], [6900, 0.04, 0.15]], 0, r), 0.5);
  R.sfxSlide = (sr, r) => { const n = S(sr * 1.6), out = env(biquad(brown(n, r), 'lp', 300, 0.7, sr), u => Math.sin(Math.PI * u)); add(out, R.sfxClunk(sr, r), 0.6, S(sr * 1.3)); return normalize(out, 0.7); };
  R.sfxGlassThump = (sr, r) => { const n = S(sr * 0.9), out = modes(n, sr, [[2300, 0.1, 0.2], [3400, 0.06, 0.12], [5100, 0.04, 0.06]], 0.01, r); add(out, thud(n, sr, r, 0, 75, 0.06, 1)); add(out, hit(n, sr, r, 0, 0.6, 'lp', 500, 0.8, 0.02)); return normalize(out, 0.9); };
  R.sfxRung = (sr, r) => normalize(add(modes(S(sr * 0.4), sr, [[620 + r() * 80, 0.06, 0.5], [1450, 0.04, 0.3], [2600, 0.02, 0.15]], 0, r), tick(S(sr * 0.4), sr, r, 0, 0.003, 600, 6000, 0.4)), 0.55);
  R.sfxCoupling = (sr, r) => { const n = S(sr * 3.0), out = new Float32Array(n); for (let k = 0; k < 6; k++) add(out, R.sfxClunk(sr, r), 1 - k * 0.14, S((0.1 + k * 0.38) * sr)); add(out, env(biquad(white(n, r), 'hp', 2000, 0.7, sr), u => (u > 0.75 ? Math.sin(Math.PI * (u - 0.75) / 0.25) : 0)), 0.15); return normalize(biquad(out, 'lp', 2500, 0.7, sr), 0.8); };
  R.sfxClack = (sr, r) => { const n = S(sr * 0.4), out = new Float32Array(n); for (const t of [0, 0.105 + r() * 0.01]) { add(out, modes(n, sr, [[190, 0.05, 0.5], [430, 0.035, 0.35], [880, 0.02, 0.15]], t, r)); add(out, tick(n, sr, r, t, 0.003, 200, 2000, 0.5)); } return normalize(biquad(out, 'lp', 1600, 0.7, sr), 0.6); };
  R.sfxBrake = (sr, r) => { const n = S(sr * 6.5), out = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const u = i / n, f = 2750 + 300 * Math.sin(u * 13) - 400 * u; ph += f / sr; out[i] = Math.sin(TAU * ph) * (0.4 + 0.3 * Math.sin(TAU * 7 * i / sr)) * Math.min(1, u * 8) * Math.pow(1 - u, 0.6) * 0.3; } add(out, env(biquad(white(n, r), 'hp', 3000, 0.7, sr), u => Math.min(1, u * 4) * (1 - u)), 0.12); add(out, env(biquad(brown(n, r), 'lp', 200, 0.7, sr), u => 1 - u), 0.6); return normalize(out, 0.8); };
  R.sfxChime = (sr, r) => { const n = S(sr * 2.4), out = modes(n, sr, [[784, 0.8, 0.5], [1568, 0.3, 0.1]], 0, r); add(out, modes(n, sr, [[659, 0.9, 0.5], [1318, 0.3, 0.1]], 0.55, r)); add(out, biquad(crackle(n, sr, r, 30), 'bp', 2500, 2, sr), 0.05); return normalize(biquad(biquad(out, 'hp', 400, 0.7, sr), 'lp', 3500, 0.7, sr), 0.6); };
  R.sfxCrash = (sr, r) => { const n = S(sr * 2.4), out = env(biquad(white(n, r), 'lp', 2200, 0.7, sr), u => Math.exp(-u * 4)); for (let k = 0; k < 14; k++) add(out, hit(S(sr * 0.3), sr, r, 0, 0.6, 'bp', 1200 + r() * 2500, 1.5, 0.03), 0.8, S((r() * 0.9) * sr)); add(out, thud(n, sr, r, 0, 52, 0.25, 1.2)); add(out, R.sfxChain(sr, r), 0.4, S(sr * 0.2)); return normalize(out, 0.95); };
  // The ice cracking far out: a boom, then a long falling twang that runs away under the ice
  R.sfxIceCrack = (sr, r) => { const n = S(sr * 3.0), out = new Float32Array(n); add(out, thud(n, sr, r, 0, 55, 0.3, 0.9)); let ph = 0; for (let i = 0; i < n; i++) { const u = i / sr; ph += (2400 * Math.pow(0.08, Math.min(1, u / 1.4))) / sr; out[i] += Math.sin(TAU * ph) * Math.exp(-u / 0.9) * 0.35 * Math.min(1, u * 40); } add(out, biquad(crackle(n, sr, r, 300, u => Math.exp(-u * 6)), 'bp', 2200, 1.5, sr), 0.6); return normalize(out, 0.85); };
  R.sfxSplash = (sr, r) => { const n = S(sr * 1.2), out = env(sweep(white(n, r), 'bp', u => 2500 - 1800 * Math.min(1, u * 2), 1, sr), u => Math.min(1, u * 30) * Math.exp(-u * 4)); add(out, thud(n, sr, r, 0, 70, 0.06, 0.5)); return normalize(out, 0.75); };
  R.sfxWhoosh = (sr, r) => { const n = S(sr * 1.1), out = env(sweep(pink(n, r), 'bp', u => 400 + 2200 * Math.sin(Math.PI * u), 1.5, sr), u => Math.sin(Math.PI * u)); add(out, R.sfxClunk(sr, r), 0.5, S(sr * 0.9)); return normalize(out, 0.6); };
  R.sfxTypewriter = (sr, r) => { const n = S(sr * 2.8), out = new Float32Array(n); for (let t = 0.05; t < 2.5; t += 0.09 + r() * 0.12) add(out, modes(S(sr * 0.08), sr, [[1800 + r() * 500, 0.008, 0.6], [3500, 0.005, 0.3], [600, 0.01, 0.4]], 0, r), 0.6, S(t * sr)); add(out, modes(S(sr * 0.5), sr, [[4200, 0.2, 0.3]], 0, r), 0.2, S(sr * 2.55)); return normalize(out, 0.65); };
  R.sfxKeyTurn = (sr, r) => { const n = S(sr * 0.6), out = new Float32Array(n); add(out, R.keys ? R.keys(sr, r) : new Float32Array(n), 0.5); add(out, modes(n, sr, [[1700, 0.02, 0.5], [3200, 0.01, 0.3]], 0.3, r)); add(out, hit(n, sr, r, 0.32, 0.5, 'bp', 900, 1, 0.01)); return normalize(out, 0.6); };
  R.sfxPowerDown = (sr, r) => { const n = S(sr * 2.2), out = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const u = i / n; ph += (120 * Math.pow(0.15, u)) / sr; out[i] = Math.sin(TAU * ph) * (1 - u) * 0.5; } add(out, R.sfxClunk(sr, r), 0.6); return normalize(out, 0.7); };
  for (const k of ['sfxCrank', 'sfxSputter', 'sfxEngineCatch', 'sfxPour', 'sfxChain', 'sfxClunk', 'sfxGateSlam', 'sfxTwang', 'sfxMotorUp', 'sfxRatchet', 'sfxKnockSteel', 'sfxCanary', 'sfxCough', 'sfxPullCord', 'sfxClink', 'sfxSlide', 'sfxGlassThump', 'sfxRung', 'sfxCoupling', 'sfxClack', 'sfxBrake', 'sfxChime', 'sfxCrash', 'sfxIceCrack', 'sfxSplash', 'sfxWhoosh', 'sfxTypewriter', 'sfxKeyTurn', 'sfxPowerDown', 'sfxClockStrike', 'sfxShipBell', 'cBellToll']) T[k] = T[k] || (k === 'sfxRung' || k === 'sfxClack' || k === 'sfxKnockSteel' ? 3 : 1);
})(typeof window !== 'undefined' ? window : globalThis);
