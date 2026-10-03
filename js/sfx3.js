/* Doors, synthesized from what a door is made of and what happens to it.
   A door sound is a short sequence of contacts, each ringing the parts it touches:
   - the handle: the lever's return spring and spindle rub, the follower bottoming out, the latch tongue
     sliding back out of the keep (a cottage thumb latch: the iron bar lifting out of its catch; a cold-room
     door: the big pull handle and the rubber seal letting go with a suck of air);
   - the leaf leaving the stop, then the swing: air pushed aside, and on a dry hinge the pin's stick-slip
     creak whose pitch and rate follow the leaf's speed (a steel door's hinge squeals instead, and its closer
     hisses);
   - shutting: the tongue riding up the strike plate, the leaf hitting the stop (its own modes: a panelled
     door's knock, a hollow door's boom, ledged boards' clatter, a steel leaf's long bong), the frame and the
     wall taking the blow, the tongue snapping into the keep, the leaf chattering in the frame for a moment,
     and on a glazed door the pane buzzing in its beads;
   - locked: the lever stopping short against the bolt and the leaf knocking the stop as you pull, twice.
   Every take varies the modes, the timing and the force. The swing and slam are timed to the leaf's motion
   in world.js (PB.DoorTiming). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const R = PB.SfxRecipes;
  const { biquad, white, brown, add, normalize, modes, hit, S, TAU } = PB.SfxDSP;
  const TAKES = PB.SfxTakes;

  // ------------------------------------------------------------ contacts and frictions
  const detune = (list, r, k = 0.06) => list.map(([f, tau, a]) => [f * (1 + (r() - 0.5) * 2 * k), tau * (0.85 + r() * 0.3), a * (0.8 + r() * 0.4)]);
  // A contact: a force pulse `width` long rings the modes (a soft, long contact barely reaches the high ones),
  // and the touch itself clicks. Everything is added into `out` in place, over only the samples it covers.
  function knock(out, sr, r, t0, width, list, A) {
    const n = out.length, i0 = S(t0 * sr), L = Math.max(2, S(width * sr));
    if (i0 >= n || A <= 0) return out;
    for (const [f, tau, amp] of list) {
      const g = A * amp / (1 + Math.pow(f * width * 2.2, 2)), w = TAU * f / sr, d = Math.exp(-1 / (tau * sr)), cr = d * Math.cos(w), ci = d * Math.sin(w);
      let re = g, im = 0;
      const end = Math.min(n, i0 + Math.ceil(tau * sr * 9.22));
      for (let i = Math.max(0, i0); i < end; i++) {
        const k = i - i0;
        out[i] += k < L ? im * (0.5 - 0.5 * Math.cos(Math.PI * k / L)) : im;
        const nr = re * cr - im * ci; im = re * ci + im * cr; re = nr;
      }
    }
    click(out, sr, r, t0, Math.min(12000, 0.9 / width), Math.max(0.0006, width * 1.4), 0.3 * A);
    return out;
  }
  // A short noise click, low-passed
  function click(out, sr, r, t0, f, tau, A) {
    const i0 = S(t0 * sr), L = Math.min(out.length - i0, Math.max(64, S(tau * 9 * sr)));
    if (L <= 0) return out;
    const y = biquad(white(L, r), 'lp', f, 0.7, sr);
    for (let i = 0; i < L; i++) out[i0 + i] += y[i] * Math.exp(-i / sr / tau) * Math.min(1, i / (sr * 0.0004)) * A;
    return out;
  }
  // Two surfaces sliding: band-limited noise with a grainy amplitude
  function rub(out, sr, r, t0, dur, lo, hi, A, shape) {
    const i0 = S(t0 * sr), L = Math.min(out.length - i0, Math.max(4, S(dur * sr)));
    if (L <= 0) return out;
    const y = biquad(biquad(white(L, r), 'hp', lo, 0.7, sr), 'lp', hi, 0.7, sr);
    let g = 0.6;
    for (let i = 0; i < L; i++) { if ((i & 63) === 0) g = 0.55 + r() * 0.45; const k = i / L; out[i0 + i] += y[i] * (shape ? shape(k) : Math.sin(Math.PI * k)) * g * A; }
    return out;
  }
  // Air the leaf pushes aside: a pressure swell far down, felt more than heard
  function whoosh(out, sr, r, t0, dur, A, shape) {
    const i0 = S(t0 * sr), L = Math.min(out.length - i0, Math.max(4, S(dur * sr)));
    if (L <= 0) return out;
    const y = biquad(biquad(brown(L, r), 'lp', 160, 0.7, sr), 'hp', 35, 0.7, sr);
    for (let i = 0; i < L; i++) { const k = i / L; out[i0 + i] += y[i] * (shape ? shape(k) : Math.pow(Math.sin(Math.PI * k), 2)) * A; }
    return out;
  }
  // A blow into the frame and the wall: a low, short thump
  function thump(out, sr, r, t0, f, tau, A) {
    const n = out.length, i0 = S(t0 * sr), w = TAU * f / sr;
    for (let i = i0; i < n; i++) { const t = (i - i0) / sr, e = Math.exp(-t / tau); if (e < 1e-4) break; out[i] += Math.sin(w * (i - i0)) * e * Math.min(1, t / 0.002) * A; }
    return click(out, sr, r, t0, f * 2.2, tau * 0.7, 0.8 * A);
  }
  // A dry hinge: the pin sticks and slips in the knuckle. Each slip is an impulse; their rate follows the
  // leaf's speed (vel(k), 0..1) and the hinge and leaf resonate them into a creak. A fast rate is a squeal.
  function hinge(out, sr, r, t0, dur, rate, res, A, vel) {
    const i0 = S(t0 * sr), L = Math.min(out.length - i0, S((dur + 0.15) * sr)), end = S(dur * sr);
    if (L <= 0) return out;
    const x = new Float32Array(L), wob = r() * 6;
    let i = 0;
    while (i < Math.min(L, end)) {
      const k = i / end, v = vel(k);
      if (v > 0.07) x[i] = (0.55 + r() * 0.45) * Math.min(1, v * 1.4);
      const f = rate * (0.35 + 0.65 * v) * (1 + 0.07 * Math.sin(k * 19 + wob) + 0.04 * Math.sin(k * 57));
      i += Math.max(1, Math.floor(sr / Math.max(20, f) * (0.9 + r() * 0.2)));
    }
    for (const [f, q, g] of res) { const y = biquad(x, 'bp', f * (0.93 + r() * 0.14), q, sr); for (let j = 0; j < L; j++) out[i0 + j] += y[j] * g * A; }
    return out;
  }

  // ------------------------------------------------------------ what rings
  const LATCH = [[2150, 0.012, 1], [3420, 0.009, 0.7], [4870, 0.007, 0.5], [6900, 0.005, 0.3], [1180, 0.02, 0.35]];
  const IRON = [[1240, 0.022, 1], [2130, 0.016, 0.7], [3310, 0.012, 0.5], [4720, 0.008, 0.3], [690, 0.03, 0.4]];
  const BOLT = [[640, 0.05, 1], [1130, 0.035, 0.8], [1910, 0.025, 0.55], [2870, 0.018, 0.35], [4100, 0.012, 0.2]];
  const GLASS = [[2380, 0.03, 1], [3910, 0.024, 0.8], [5620, 0.018, 0.6], [7840, 0.012, 0.4]];
  const KIND = {
    // a panelled timber door: a firm knock
    Panel: { leaf: [[105, 0.06, 1], [182, 0.05, 0.8], [296, 0.04, 0.6], [455, 0.03, 0.45], [690, 0.022, 0.3], [1010, 0.016, 0.2], [1500, 0.01, 0.12]],
      handle: 'lever', slam: 0.0026, frame: [74, 0.05], rattle: 2, creak: [[480, 14, 1], [1050, 16, 0.55], [2100, 12, 0.22]], rate: 190, air: 1 },
    Glazed: { leaf: [[112, 0.055, 1], [196, 0.045, 0.8], [318, 0.035, 0.6], [490, 0.028, 0.45], [720, 0.02, 0.3], [1080, 0.014, 0.2]],
      handle: 'lever', slam: 0.0026, frame: [76, 0.05], rattle: 2, glass: true, creak: [[500, 14, 1], [1120, 16, 0.5], [2200, 12, 0.2]], rate: 200, air: 1 },
    // a hollow flush door: light, boomy, short
    Flush: { leaf: [[72, 0.07, 1], [128, 0.06, 0.9], [215, 0.045, 0.6], [350, 0.03, 0.35], [540, 0.02, 0.2]],
      handle: 'lever', slam: 0.0034, frame: [82, 0.04], rattle: 1, creak: [[420, 12, 1], [930, 14, 0.5], [1900, 10, 0.2]], rate: 230, air: 0.8 },
    // ledged and braced boards: loose, clattering, an iron thumb latch
    Plank: { leaf: [[128, 0.045, 1], [236, 0.04, 0.7], [402, 0.03, 0.5], [610, 0.022, 0.35], [880, 0.016, 0.2], [1240, 0.012, 0.12]],
      handle: 'thumb', slam: 0.003, frame: [68, 0.055], rattle: 4, creak: [[380, 10, 1], [820, 12, 0.6], [1700, 10, 0.3]], rate: 150, air: 1.1 },
    // a ship's teak door: heavy, deep
    Ship: { leaf: [[92, 0.07, 1], [160, 0.06, 0.8], [270, 0.045, 0.6], [420, 0.035, 0.4], [640, 0.025, 0.25], [960, 0.018, 0.15]],
      handle: 'lever', slam: 0.0028, frame: [64, 0.06], rattle: 1, creak: [[440, 14, 1], [990, 16, 0.5], [1980, 12, 0.2]], rate: 170, air: 1.2 },
    // a hollow steel door: a long bong, a squealing hinge, the closer's hiss
    Steel: { leaf: [[86, 0.22, 1], [158, 0.18, 0.8], [284, 0.13, 0.55], [505, 0.1, 0.45], [870, 0.07, 0.35], [1330, 0.05, 0.25], [2080, 0.035, 0.18], [3250, 0.02, 0.1]],
      handle: 'bar', slam: 0.0018, frame: [58, 0.07], rattle: 1, closer: true, creak: [[960, 30, 1], [1930, 24, 0.35], [2900, 20, 0.15]], rate: 930, air: 1.3 },
    // a cold-room door: thick, dead, a seal that sucks shut
    Cold: { leaf: [[64, 0.06, 1], [118, 0.05, 0.6], [230, 0.03, 0.3], [410, 0.02, 0.15]],
      handle: 'pull', slam: 0.006, frame: [52, 0.08], rattle: 0, seal: true, creak: [[360, 10, 1], [760, 12, 0.4]], rate: 120, air: 1.5 },
    // a gate of iron bars: clang
    Gate: { leaf: [[310, 0.35, 1], [720, 0.25, 0.7], [1290, 0.18, 0.5], [2040, 0.12, 0.35], [3010, 0.08, 0.2]],
      handle: 'bolt', slam: 0.0012, frame: [90, 0.04], rattle: 3, creak: [[880, 26, 1], [1760, 22, 0.4], [2650, 18, 0.2]], rate: 700, air: 0.2 },
  };
  const timing = K => (PB.DoorTiming && PB.DoorTiming[K]) || { open: 0.9, close: 0.62 };

  // ------------------------------------------------------------ the handle
  function handleDown(out, n, sr, r, K, t, force = 1) {
    const L = detune(LATCH, r), I = detune(IRON, r);
    switch (K.handle) {
      case 'thumb':   // press the thumb plate: the bar lifts out of the catch
        rub(out, sr, r, t, 0.035, 900, 5000, 0.08 * force);
        knock(out, sr, r, t + 0.03, 0.0009, I, 0.45 * force);
        return 0.06;
      case 'pull':    // a big lever on the cold-room door: the cam swings the bolt out
        rub(out, sr, r, t, 0.09, 400, 3500, 0.1 * force);
        knock(out, sr, r, t + 0.08, 0.0012, detune(BOLT, r), 0.5 * force);
        return 0.12;
      case 'bar':     // the lever on a steel door: a heavy spring and the bolt drawn back with a chunk
        rub(out, sr, r, t, 0.08, 1200, 5000, 0.09 * force);
        knock(out, sr, r, t + 0.075, 0.0011, detune(BOLT, r), 0.42 * force);
        knock(out, sr, r, t + 0.08, 0.0006, L, 0.2 * force);
        return 0.1;
      case 'bolt':    // a gate: the bolt slid back through its keepers
        rub(out, sr, r, t, 0.16, 700, 4500, 0.14 * force, k => Math.sin(Math.PI * Math.min(1, k * 1.2)));
        knock(out, sr, r, t + 0.16, 0.0009, I, 0.5 * force);
        return 0.18;
      default:        // a lever: spindle and spring, the follower bottoms, the tongue slides back
        rub(out, sr, r, t, 0.065, 1800, 6500, 0.07 * force);
        rub(out, sr, r, t + 0.025, 0.045, 2600, 8000, 0.05 * force);
        knock(out, sr, r, t + 0.062, 0.0007, L, 0.32 * force);
        return 0.08;
    }
  }
  function handleUp(out, n, sr, r, K, t, force = 1) {
    if (K.handle === 'lever' || K.handle === 'bar') {
      rub(out, sr, r, t, 0.04, 2000, 7000, 0.03 * force);
      knock(out, sr, r, t + 0.038, 0.0006, detune(LATCH, r, 0.08).map(([f, tau, a]) => [f * 1.08, tau, a]), 0.16 * force);
    } else if (K.handle === 'thumb') knock(out, sr, r, t, 0.0008, detune(IRON, r), 0.2 * force);
  }

  // ------------------------------------------------------------ opening, shutting, locked
  function openDoor(Kname, creaky) {
    return (sr, r) => {
      const K = KIND[Kname], T = timing(Kname), n = S(sr * (T.open + 0.7)), out = new Float32Array(n);
      const leaf = detune(K.leaf, r, 0.05);
      const t1 = handleDown(out, n, sr, r, K, 0.0, 0.9 + r() * 0.2);
      // the leaf comes off the stop; a cold-room seal lets go
      knock(out, sr, r, t1 + 0.012, 0.005, leaf, 0.1);
      if (K.seal) { whoosh(out, sr, r, t1, 0.18, 0.5, k => Math.pow(1 - k, 2) * Math.min(1, k * 20)); rub(out, sr, r, t1, 0.1, 150, 900, 0.12, k => Math.pow(1 - k, 3)); }
      // the swing, slowing out (the same curve world.js turns the leaf by)
      const s0 = T.open * 0.1, sd = T.open * 0.9;
      const vel = k => Math.min(1, k / 0.1) * Math.pow(1 - Math.min(1, k), 1.2);
      whoosh(out, sr, r, s0, sd + 0.1, 0.09 * K.air, k => vel(k) * vel(k));
      if (creaky) hinge(out, sr, r, s0 + 0.02, sd * (0.55 + r() * 0.4), K.rate * (0.85 + r() * 0.3), detune(K.creak, r), 3.2, vel);
      else rub(out, sr, r, s0, sd * 0.6, 250, 1400, 0.012, vel);
      if (K.closer) rub(out, sr, r, s0, sd, 700, 1700, 0.025, k => Math.sin(Math.PI * Math.min(1, k * 1.1)));
      // the hand lets the handle go
      handleUp(out, n, sr, r, K, 0.28 + r() * 0.12, 0.9);
      return normalize(out, 0.55);
    };
  }
  function closeDoor(Kname, creaky) {
    return (sr, r) => {
      const K = KIND[Kname], T = timing(Kname).close, n = S(sr * (T + (K.closer || Kname === 'Gate' ? 1.4 : 0.9))), out = new Float32Array(n);
      const leaf = detune(K.leaf, r, 0.05), L = detune(LATCH, r);
      const force = 0.85 + r() * 0.3;
      // gathering speed (1 - (1 - a)^1.8 in world.js)
      const vel = k => Math.min(1, k / 0.08) * (0.25 + 0.75 * Math.min(1, k));
      whoosh(out, sr, r, 0, T, 0.12 * K.air, k => vel(k) * vel(k));
      if (creaky) hinge(out, sr, r, 0.03, T * (0.6 + r() * 0.3), K.rate * (0.85 + r() * 0.3), K.creak, 2.4, vel);
      if (K.closer) rub(out, sr, r, 0, T, 700, 1700, 0.03, k => Math.sin(Math.PI * Math.min(1, k * 1.05)) * 0.8 + 0.2);
      // the tongue rides up the strike plate (a thumb latch's bar rides up its catch)
      if (K.handle === 'thumb') rub(out, sr, r, T - 0.03, 0.03, 1200, 6000, 0.18 * force, k => k);
      else if (K.handle !== 'bolt') rub(out, sr, r, T - 0.016, 0.018, 2600, 8500, 0.2 * force, k => k);
      // the leaf hits the stop; the frame and the wall take it
      knock(out, sr, r, T, K.slam * (0.9 + r() * 0.2), leaf, force);
      thump(out, sr, r, T, K.frame[0] * (0.9 + r() * 0.2), K.frame[1], 0.55 * force);
      // the tongue snaps into the keep (or the bar drops into its catch, or the cold-room cam clunks)
      if (K.handle === 'thumb') { const I = detune(IRON, r); knock(out, sr, r, T + 0.008, 0.0008, I, 0.5 * force); knock(out, sr, r, T + 0.03 + r() * 0.01, 0.0008, I, 0.2 * force); }
      else if (K.handle === 'pull') knock(out, sr, r, T + 0.03, 0.0012, detune(BOLT, r), 0.45 * force);
      else if (K.handle === 'bolt') knock(out, sr, r, T + 0.05, 0.0009, detune(IRON, r), 0.3 * force);
      else { knock(out, sr, r, T + 0.006, 0.0005, L, 0.5 * force); if (K.handle === 'bar') knock(out, sr, r, T + 0.008, 0.0009, detune(BOLT, r), 0.3 * force); }
      // a cold-room seal sucks shut
      if (K.seal) whoosh(out, sr, r, T - 0.02, 0.12, 0.6, k => Math.pow(Math.sin(Math.PI * k), 2));
      // the leaf chatters in the frame
      for (let k = 0; k < K.rattle; k++) knock(out, sr, r, T + 0.03 + k * (0.018 + r() * 0.016), 0.0018, leaf.slice(2), 0.14 * Math.pow(0.55, k) * force);
      // the glass buzzes in its beads
      if (K.glass) { const G = detune(GLASS, r, 0.08); for (let k = 0; k < 3; k++) knock(out, sr, r, T + 0.002 + k * (0.009 + r() * 0.006), 0.0005, G, 0.16 * (1 - k * 0.3) * force); }
      return normalize(out, 0.9);
    };
  }
  function lockedDoor(Kname) {
    return (sr, r) => {
      const K = KIND[Kname], n = S(sr * 1.1), out = new Float32Array(n), leaf = detune(K.leaf, r, 0.05);
      const tries = [0, 0.42 + r() * 0.12];
      tries.forEach((t, j) => {
        const f = j ? 1.15 : 0.9;
        if (K.handle === 'thumb') {
          knock(out, sr, r, t, 0.0009, detune(IRON, r), 0.35 * f);
          // the boards shift against the bolt inside
          for (let k = 0; k < 3; k++) knock(out, sr, r, t + 0.06 + k * (0.035 + r() * 0.02), 0.004, leaf, (0.32 - k * 0.08) * f);
          knock(out, sr, r, t + 0.07, 0.0008, detune(IRON, r), 0.18 * f);
        } else {
          // the lever stops short: the bolt holds the follower
          rub(out, sr, r, t, 0.04, 1800, 6500, 0.07 * f);
          knock(out, sr, r, t + 0.04, 0.0006, detune(LATCH, r), 0.4 * f);
          // the pull: the leaf knocks the stop, the tongue plays in the keep
          knock(out, sr, r, t + 0.085, Kname === 'Steel' ? 0.003 : 0.005, leaf, (Kname === 'Steel' ? 0.32 : 0.42) * f);
          knock(out, sr, r, t + 0.09, 0.0006, detune(LATCH, r), 0.2 * f);
          knock(out, sr, r, t + 0.11 + r() * 0.02, 0.003, leaf.slice(1), 0.12 * f);
          handleUp(out, n, sr, r, K, t + 0.2 + r() * 0.05, 0.8 * f);
        }
      });
      return normalize(out, 0.62);
    };
  }
  for (const k of Object.keys(KIND)) {
    R['door' + k + 'Open'] = openDoor(k, false);
    R['door' + k + 'OpenCreak'] = openDoor(k, true);
    R['door' + k + 'Close'] = closeDoor(k, false);
    R['door' + k + 'CloseCreak'] = closeDoor(k, true);
    R['door' + k + 'Locked'] = lockedDoor(k);
    TAKES['door' + k + 'Open'] = 3; TAKES['door' + k + 'OpenCreak'] = 2; TAKES['door' + k + 'Close'] = 3; TAKES['door' + k + 'CloseCreak'] = 2; TAKES['door' + k + 'Locked'] = 2;
  }
  // The old generic names, for anything that still asks for them
  R.doorWoodOpen = R.doorPanelOpen; R.doorWoodClose = R.doorPanelClose;
  R.doorMetalOpen = R.doorSteelOpen; R.doorMetalClose = R.doorSteelClose;
  R.doorLocked = R.doorPanelLocked; R.doorGlass = R.doorGlazedClose;
  PB.DoorKinds = Object.keys(KIND);
  // Rendered when a place is loaded, for the doors it has (game.js), not all of them at boot
  const DOORS = new RegExp('^door((' + PB.DoorKinds.join('|') + ')(Open|Close|Locked)|WoodOpen$|WoodClose$|MetalOpen$|MetalClose$|Locked$|Glass$)');
  const effects = PB.Sfx.prototype.effects;
  PB.Sfx.prototype.effects = function () { return effects.call(this).filter(n => !DOORS.test(n)); };
})(typeof window !== 'undefined' ? window : globalThis);
