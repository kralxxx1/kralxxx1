/* Sound for the nine shelves, on top of audio.js: each place's room tone and reverb, what every creature
   sounds like (its feet, its few quiet noises, and the breath right behind your head when it is close),
   the Hush taking the sound out of everything, the things the chapters do, footsteps on snow, ice,
   gravel, mud and grating, and the music: a theme for Wren that the menu, the lake and the endings share,
   a colour for each chapter, and a chase that is a heartbeat and strings rather than a beat.
   Nothing here is a sting. The fright is in what is quiet. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U;
  const A = PB.Audio, P = A.prototype;

  // ------------------------------------------------------------ rooms
  Object.assign(A.REVERBS, {
    depot: { rt: 2.2, er: 0.07, taps: 18, damp: 4200, wet: 0.3 },
    ferry: { rt: 1.6, er: 0.05, taps: 16, damp: 4800, wet: 0.24 },
    pinewood: { rt: 0.9, er: 0.03, taps: 8, damp: 5200, wet: 0.12 },
    mine: { rt: 3.6, er: 0.1, taps: 24, damp: 3800, wet: 0.4 },
    lodge: { rt: 1.3, er: 0.04, taps: 12, damp: 4000, wet: 0.2 },
    village: { rt: 1.1, er: 0.04, taps: 10, damp: 5000, wet: 0.14 },
    train: { rt: 0.55, er: 0.015, taps: 8, damp: 4200, wet: 0.1 },
    carnival: { rt: 1.5, er: 0.05, taps: 12, damp: 5200, wet: 0.17 },
    lake: { rt: 0.85, er: 0.03, taps: 8, damp: 5600, wet: 0.1 },
  });

  // ------------------------------------------------------------ music: a colour per chapter
  const N = s => 440 * Math.pow(2, s / 12);                      // semitones from A4
  const chord = (...s) => s.map(N);
  // Wren's theme: eight bars in A minor, a child's tune played slowly
  const WREN = [0, 3, 7, 5, 3, 2, 0, null, -5, 0, 2, 3, 2, -2, 0, null].map(s => (s == null ? 0 : N(s)));
  Object.assign(A.MUSIC, {
    depot: { chords: [chord(-28, -21, -16, -12), chord(-29, -22, -17, -14), chord(-31, -24, -19, -15), chord(-33, -26, -21, -17)], scale: [N(-9), N(-5), N(-2), N(0), N(3), N(7), N(10)], piano: 0.45, wave: 'triangle', lp: [300, 900], pad: 0.03 },
    under: { chords: [chord(-36, -29, -24), chord(-35, -29, -23), chord(-36, -28, -24), chord(-37, -30, -25)], scale: [N(-12), N(-11), N(-5), N(-4), N(3)], piano: 0.25, lp: [220, 520] },
    ferry: { chords: [chord(-31, -24, -19), chord(-31, -24, -17), chord(-33, -26, -21), chord(-31, -24, -19)], scale: [N(5), N(7), N(10), N(12), N(15), N(17)], piano: 0.3, wave: 'sine', lp: [260, 640], pad: 0.05 },
    pinewood: { chords: [chord(-24, -21, -17, -12), chord(-28, -24, -21, -16), chord(-33, -29, -24, -21), chord(-26, -22, -19, -14)], scale: [N(-12), N(-9), N(-5), N(0), N(3), N(7)], piano: 0.35, wobble: 22, wave: 'triangle', lp: [300, 800], pad: 0.035 },
    mine: { chords: [chord(-41, -40, -34), chord(-42, -41, -35), chord(-41, -39, -34), chord(-43, -42, -36)], scale: [N(-24), N(-23), N(-19), N(-17)], piano: 0.12, lp: [140, 360], pulse: true },
    lodge: { chords: [chord(-17, -10, -5, 2), chord(-21, -14, -9, -2), chord(-24, -17, -12, -5), chord(-22, -15, -8, -3)], scale: [N(7), N(10), N(12), N(14), N(19), N(22)], piano: 0.4, wave: 'sine', lp: [600, 1500], pad: 0.04, box: 0.25, detune: 12 },
    village: { chords: [chord(-31, -24, -19, -14), chord(-35, -28, -23, -19), chord(-28, -21, -16, -12), chord(-33, -26, -21, -16)], melody: [N(5), N(3), N(1), N(0), 0, N(-2), N(0), N(1), N(3), 0, N(1), N(0), N(-2), N(-4), 0, 0], mstep: 1.1, inst: 'piano', pad: 0.03, wave: 'triangle', lp: [280, 700] },
    train: { chords: [chord(-34, -27, -22, -19), chord(-36, -29, -24, -20), chord(-38, -31, -26, -22), chord(-39, -32, -27, -24)], scale: [N(2), N(5), N(9), N(14), N(17)], piano: 0.3, lp: [240, 600], pad: 0.03 },
    carnival: { chords: [chord(-31, -26, -22), chord(-36, -29, -24), chord(-33, -28, -24), chord(-31, -26, -22)], scale: [N(5), N(8), N(12), N(13), N(17), N(20)], piano: 0.15, box: 0.65, detune: 38, wobble: 30, wave: 'triangle', lp: [380, 1000], pad: 0.03 },
    lake: { chords: [chord(-24, -17, -12, -9), chord(-28, -21, -16, -12), chord(-33, -26, -21, -17), chord(-29, -22, -17, -13)], melody: WREN, mstep: 1.05, inst: 'piano', pad: 0.035, wave: 'triangle', lp: [300, 820] },
  });
  A.WREN = WREN;

  // ------------------------------------------------------------ the place around you
  const OUT_THEMES = { lodge: 1, village: 1, lake: 1, carnival: 1, pinewood: 1, ferry: 1, mine: 1, train: 1 };
  const baseAmbience = P.ambience;
  P.ambience = function (theme) {
    if (!this.ctx) return;
    if (!A.REVERBS[theme] || !OUT_THEMES[theme] && theme !== 'depot') return baseAmbience.call(this, theme);
    for (const k of [...this.loops.keys()]) if (k.startsWith('amb:')) this.stopLoop(k, 1);
    this.setReverb(theme);
    this.ambTheme = theme;
    const L = (k, name, gain, o = {}) => this.bufLoop('amb:' + k, name, o.pos || null, Object.assign({ bus: 'amb', gain, rev: 0.1 }, o));
    this.ambOut = { theme, k: -1 };
    switch (theme) {
      case 'depot': L('rain', 'rainInside', 0.22, { lowpass: 2600 }); L('hum', 'fluorescent', 0.05); L('air', 'hvac', 0.12); break;
      case 'ferry': L('sea', 'loopSea', 0.5); this.loop('amb:wind', 'wind', null, { bus: 'amb', gain: 0.04, rev: 0.2 }); break;
      case 'pinewood': L('out', 'loopForest', 0.45); break;
      case 'mine': L('out', 'loopMine', 0.55, { rev: 0.3 }); break;
      case 'lodge': L('out', 'loopBlizzard', 0.4); L('in', 'loopHouse', 0.0); break;
      case 'village': L('out', 'rainOutside', 0.42); L('river', 'loopRiver', 0.18); L('in', 'rainInside', 0.0, { lowpass: 2200 }); break;
      case 'train': L('in', 'hvac', 0.05); this.loop('amb:wind', 'wind', null, { bus: 'amb', gain: 0.05, rev: 0.05 }); break;
      case 'carnival': L('out', 'loopHarbour', 0.5); L('in', 'rainInside', 0.0, { lowpass: 1800 }); break;
      case 'lake': L('out', 'loopIceWind', 0.5); L('in', 'loopHouse', 0.0); break;
    }
    this.nextAmb = this.t + 5;
  };
  // Inside or out: the storm is muffled through walls, the stove only heard indoors
  P.ambOutdoor = function () {
    const g = PB.game, L = g && g.level, lp = this.listenerPos;
    if (!L || !lp || !L.meta || !L.meta.outdoor) return 1;
    const c = L.cellOf(lp.x, lp.z);
    return L.inb(c.x, c.y) && L.meta.outdoor[L.i(c.x, c.y)] ? 1 : 0;
  };
  // how loud the outside loop is out of doors, how much of it comes through the walls, and the inside loop
  const MIX = {
    lodge: { out: 0.42, inDim: 0.35, inn: 0.34 }, village: { out: 0.42, inDim: 0.3, inn: 0.14 }, carnival: { out: 0.5, inDim: 0.3, inn: 0.12 },
    lake: { out: 0.5, inDim: 0.25, inn: 0.4 }, pinewood: { out: 0.45, inDim: 0.4, inn: 0 }, ferry: { out: 0.5, inDim: 0.6, inn: 0 }, mine: { out: 0.55, inDim: 1, inn: 0 },
  };
  const baseAmbTick = P.ambienceTick;
  P.ambienceTick = function (cam) {
    const th = this.ambTheme;
    if (!OUT_THEMES[th] && th !== 'depot') return baseAmbTick.call(this, cam);
    if (!this.ctx) return;
    // the mix follows you in and out of doors
    const O = this.ambOut;
    if (O) {
      O.k = U.damp(O.k < 0 ? this.ambOutdoor() : O.k, this.ambOutdoor(), 1.6, 1 / 30);
      const k = O.k, M = MIX[th];
      if (M) {
        if (this.loops.get('amb:out')) this.setLoop('amb:out', M.out * (M.inDim + (1 - M.inDim) * k));
        if (M.inn && this.loops.get('amb:in')) this.setLoop('amb:in', M.inn * (1 - k));
      }
    }
    this.dreadTickV5(cam);
    if (this.t < this.nextAmb) return;
    this.nextAmb = this.t + 9 + Math.random() * 14;
    const a = Math.random() * Math.PI * 2, d = 10 + Math.random() * 18, pos = { x: cam.position.x + Math.cos(a) * d, y: 1.4, z: cam.position.z + Math.sin(a) * d };
    const r = Math.random();
    const far = (name, gain, o = {}) => this.play(name, 2, 'amb', pos, Object.assign({ rev: 0.7, gain, ref: 6, roll: 1, occl: true, occluded: this.los ? !this.los(cam.position.x, cam.position.z, pos.x, pos.z) : false, jitter: 0.1 }, o));
    switch (th) {
      case 'ferry': if (r < 0.4) far('cCreakBranch', 0.35, { rate: 0.6 }); else if (r < 0.6) far('sfxShipBell', 0.12, { rate: 0.5, lowpass: 900 }); break;
      case 'pinewood': if (r < 0.4) far('dropWood', 0.35, { rate: 1.6 }); else if (r < 0.6) far('cCreakBranch', 0.3); break;
      case 'mine': if (r < 0.5) far('sfxKnockSteel', 0.12, { rate: 0.7 }); else if (r < 0.75) far('dropDebris', 0.35); break;
      case 'lodge': if (r < 0.45) far('floorCreak', 0.4); else if (r < 0.65) far('sfxClunk', 0.15, { rate: 0.7 }); break;
      case 'village': if (r < 0.4) far('floorCreak', 0.3, { rate: 0.8 }); else if (r < 0.6) far('sfxSplash', 0.1, { rate: 0.7 }); break;
      case 'train': if (r < 0.5) far('sfxClunk', 0.12, { rate: 1.3 }); break;
      case 'carnival': if (r < 0.35) far('sfxChain', 0.12); else if (r < 0.6) far('floorCreak', 0.3, { rate: 0.7 }); else if (r < 0.75) far('cLaughLotte', 0.07, { lowpass: 1200 }); break;
      case 'lake': if (r < 0.45) far('sfxIceCrack', 0.18, { ref: 14, roll: 0.5 }); break;
      case 'depot': if (r < 0.5) far('farSteps', 0.35); else if (r < 0.7) far('dropWood', 0.3); break;
    }
  };
  // Rare things just behind you or far away, never loud: a whisper, a child humming (Wren), a board
  P.dreadTickV5 = function (cam) {
    if (this.t < (this.nextDread || (this.nextDread = this.t + 50))) return;
    const dread = U.clamp(this.dread || 0, 0, 1);
    this.nextDread = this.t + (90 - 45 * dread) * (0.7 + Math.random() * 0.6);
    const fwd = cam.getWorldDirection(this._df || (this._df = new root.THREE.Vector3())).clone(); fwd.y = 0; fwd.normalize();
    const at = (dist, behind) => { const a = Math.atan2(fwd.z, fwd.x) + (behind ? Math.PI : 0) + (Math.random() - 0.5) * 1.4; return { x: cam.position.x + Math.cos(a) * dist, y: 1.3, z: cam.position.z + Math.sin(a) * dist }; };
    const r = Math.random();
    if (r < 0.35) this.play('whisper', 4, 'amb', at(1.5 + Math.random(), true), { rev: 0.25, gain: 0.22 + dread * 0.2, ref: 1.2, roll: 1.6 });
    else if (r < 0.6) this.play('childHum', 2, 'amb', at(14 + Math.random() * 10, false), { rev: 0.8, gain: 0.35, ref: 4, occl: true, occluded: true });
    else if (r < 0.85) this.play('floorCreak', 3, 'amb', at(4 + Math.random() * 5, Math.random() < 0.6), { rev: 0.5, gain: 0.5, ref: 3 });
    else this.play('farSteps', 3, 'amb', at(16 + Math.random() * 8, Math.random() < 0.5), { rev: 0.7, gain: 0.4, ref: 5, occl: true, occluded: true });
  };

  // Only the room tones a chapter uses are rendered while it loads (the rest when they are first needed)
  const THEME_LOOPS = {
    depot: ['rainInside', 'fluorescent', 'hvac'], yellow: ['fluorescent', 'hvac'], ferry: ['loopSea'], pinewood: ['loopForest', 'radioStatic'], mine: ['loopMine', 'loopCable'],
    lodge: ['loopBlizzard', 'loopHouse', 'loopCable'], village: ['rainOutside', 'loopRiver', 'rainInside', 'loopChoir', 'loopFlood'], train: ['hvac', 'loopTrain', 'radioStatic'],
    carnival: ['loopHarbour', 'rainInside', 'loopOrgan', 'loopLotte', 'loopRide'], lake: ['loopIceWind', 'loopHouse'],
  };
  A.loopsFor = theme => (THEME_LOOPS[theme] ? THEME_LOOPS[theme].concat(['loopRasp']) : PB.sfxLib.loops());
  // ------------------------------------------------------------ footsteps
  const SURF = { carpet: 1, wetCarpet: 1, concrete: 1, tile: 1, lino: 1, wood: 1, metal: 1, water: 1, puddle: 1, snow: 1, deepSnow: 1, ice: 1, gravel: 1, grass: 1, mud: 1, grating: 1 };
  const ALIAS = { grate: 'grating', steel: 'metal', deck: 'metal', boards: 'wood', planks: 'wood', asphalt: 'concrete', stone: 'concrete', forest: 'grass', leaves: 'grass', sand: 'gravel' };
  P.footstep = function (surface, loud = 1, pos) {
    if (!this.ctx) return;
    let surf = ALIAS[surface] || surface;
    if (!SURF[surf]) surf = 'concrete';
    // rain on an outdoor floor: sometimes a puddle
    if (surf === 'concrete' && this.ambTheme === 'carnival' && Math.random() < 0.3) surf = 'puddle';
    const soft = surf === 'snow' || surf === 'grass' || surf === 'carpet' || surf === 'mud';
    this.play('step_' + surf, 8, 'sfx', pos, { rev: surf === 'snow' || surf === 'ice' ? 0.08 : 0.22, gain: (soft ? 0.65 : 0.72) * loud, jitter: 0.07 });
    this.play('rustle', 6, 'sfx', null, { rev: 0.02, gain: 0.04 + 0.1 * loud, jitter: 0.12, delay: 0.02 });
  };

  // ------------------------------------------------------------ creatures
  // What each one sounds like: its feet, its breath (rate = pitch of the breath loop, null = none), its voices
  const KIND = {
    sorter: { step: 'cStepShuffle', breath: 0.8, v: { spot: 'cIntake' } },
    wallpaperMan: { step: null, breath: null, v: { emerge: 'paper', spot: 'cHiss', kill: 'paper' } },
    hummer: { step: null, breath: null, v: {} },
    drowned: { step: 'cStepWet', breath: 0.85, v: { emerge: 'sfxSplash', spot: 'cGurgle', kill: 'cGurgle' } },
    bellman: { step: 'cStepBoot', breath: 0.75, v: { toll: 'cBellToll', spot: 'cBellToll', kill: 'cBellToll' } },
    passenger: { step: 'cStepShuffle', breath: 0.95, v: { emerge: 'cIntake', spot: 'cMoanWet', kill: 'cGroanDeep' } },
    pines: { step: 'cCreakBranch', breath: null, v: { emerge: 'cCreakBranch', spot: 'cCreakBranch', kill: 'cCreakBranch' } },
    stag: { step: 'cStepHeavy', breath: 0.7, v: { spot: 'cBellow', windup: 'cBellow', charge: 'cStepHeavy', impact: 'sfxClunk', kill: 'cBellow' } },
    usher: { step: 'cStepBoot', breath: 1.0, v: { spot: 'cIntake', alarm: 'whistle', kill: 'sfxClunk' } },
    burrower: { step: null, breath: 0.7, v: { emerge: 'dropDebris', spot: 'cGroanDeep', kill: 'dropDebris' } },
    lamplighter: { step: 'cStepBoot', breath: 0.85, v: { spot: 'sfxCough', kill: 'cGroanDeep' } },
    crawler: { step: 'cStepBare', breath: 1.15, v: { emerge: 'cClicks', spot: 'cClicks', kill: 'cClicks' } },
    frozen: { step: 'cStepBare', breath: 1.0, v: { emerge: 'cRattle', spot: 'cIntake', kill: 'cRattle' } },
    whiteout: { step: 'cStepSnow', breath: null, v: { spot: 'cWhump', kill: 'cWhump' } },
    cook: { step: 'cStepHeavy', breath: 0.75, v: { spot: 'cGroanDeep', kill: 'sfxClunk' } },
    silted: { step: 'cStepWet', breath: 0.8, v: { emerge: 'cGurgle', spot: 'cMoanWet', kill: 'cGurgle' } },
    longone: { step: 'cStepWet', breath: 0.7, v: { emerge: 'sfxSplash', spot: 'cIntake', kill: 'cGurgle' } },
    choir: { step: 'cStepBare', breath: 1.05, v: { spot: 'cIntake', kill: 'cMoanWet' } },
    conductor: { step: 'cStepBoot', breath: 0.8, v: { ticket: 'cGroanDeep', punch: 'cPunch', turn: 'cIntake', spot: 'cIntake', kill: 'sfxGateSlam' } },
    sleeper: { step: 'cStepBare', breath: 1.05, v: { emerge: 'cIntake', spot: 'cIntake', kill: 'cMoanWet' } },
    underhand: { step: null, breath: null, v: { knock: 'cKnockUnder', emerge: 'sfxClunk', spot: 'cIntake', kill: 'sfxClunk' } },
    mask: { step: 'cStepBare', breath: null, v: { kill: 'cIntake' } },
    horse: { step: 'cStepClop', breath: null, v: { emerge: 'cStepClop', spot: 'cStepClop', kill: 'cStepClop' } },
    lotte: { step: 'cStepHeavy', breath: null, laugh: true, v: { spot: 'cLaughLotte', kill: 'cLaughLotte' } },
    hush: { step: null, breath: null, v: { spot: 'cShh', kill: 'cShh' } },
    underice: { step: null, breath: 0.9, v: { emerge: 'sfxIceCrack', spot: 'cIntake', kill: 'sfxSplash' } },
    laugher: { step: 'cStepSnow', breath: null, v: { alarm: 'cLaughTeen', spot: 'cLaughTeen' } },
  };
  A.KIND = KIND;
  const headOf = cr => ({ x: cr.pos.x, y: (cr.sp.height || 1.8) * 0.88 + (cr.mesh ? cr.mesh.position.y : 0), z: cr.pos.z });
  const hidden = (a, p) => (a.los && a.listenerPos ? !a.los(a.listenerPos.x, a.listenerPos.z, p.x, p.z) : false);
  // a voice: kill sounds are close and plain; the rest are quiet
  P.species = function (cr, ev) {
    if (!this.ctx || !cr || !cr.sp) return;
    const K = KIND[cr.kind] || {}, name = (K.v || {})[ev] || (ev === 'emerge' || ev === 'spot' ? 'cIntake' : ev === 'kill' ? 'cGroanDeep' : null);
    if (!name) return;
    const p = headOf(cr), kill = ev === 'kill';
    const gain = kill ? 0.75 : ev === 'toll' ? 0.6 : ev === 'alarm' ? 0.55 : ev === 'punch' ? 0.6 : name === 'cIntake' ? 0.5 : 0.45;
    const rate = name === 'cGroanDeep' && cr.kind === 'conductor' ? 1.7 : (cr.sp.height > 2.4 ? 0.85 : cr.sp.height < 1.6 ? 1.15 : 1);
    this.play(name, 2, 'ent', p, { rev: 0.35, gain, ref: kill ? 1 : 2.2, roll: 1.25, occl: true, occluded: !kill && hidden(this, p), rate, jitter: 0.05 });
  };
  P.speciesStep = function (cr, d) {
    if (!this.ctx) return;
    const K = KIND[cr.kind];
    const name = K ? K.step : 'cStepBare';
    if (!name) return;
    const heavy = name === 'cStepHeavy', p = { x: cr.pos.x, y: 0.1, z: cr.pos.z };
    this.play(name, 3, 'ent', p, { rev: 0.25, gain: heavy ? 0.7 : 0.5, ref: heavy ? 3 : 1.8, roll: 1.2, occl: true, occluded: hidden(this, p), jitter: 0.1 });
  };
  // the breath close behind you in a chase (k: 0 far .. 1 at your neck); Lotte laughs instead
  P.speciesBreath = function (cr, k) {
    if (!this.ctx || !this.sfx) return;
    const K = KIND[cr.kind] || { breath: 1 }, key = 'cbreath:' + cr.id;
    if (K.laugh) {
      // she is never quiet: her laugh carries a long way, nearer louder
      const d = cr.distToPlayer();
      let L = this.loops.get(key);
      if (!L && d < 40 && cr.state !== 'dormant') L = this.bufLoop(key, 'loopLotte', headOf(cr), { bus: 'ent', gain: 0, rev: 0.4, ref: 4, roll: 0.9, max: 60 });
      if (L) this.setLoop(key, cr.state === 'dormant' ? 0 : 0.5, headOf(cr), hidden(this, cr.pos));
      return;
    }
    if (K.breath == null) return;
    let L = this.loops.get(key);
    if (!L && k > 0.01) { L = this.bufLoop(key, 'loopRasp', headOf(cr), { bus: 'ent', gain: 0, rev: 0.12, ref: 0.9, roll: 1.6, max: 14, rate: K.breath }); }
    if (L) this.setLoop(key, Math.pow(k, 1.6) * 0.95, headOf(cr), hidden(this, cr.pos));
  };
  // The Hush: near it, everything goes quiet, even you
  P.hush = function (k) {
    if (!this.ctx) return;
    k = U.clamp(k, 0, 1);
    if (Math.abs(k - (this.hushK || 0)) < 0.02) return;
    this.hushK = k; this.applyVolumes();
  };
  const baseVolumes = P.applyVolumes;
  P.applyVolumes = function () {
    baseVolumes.call(this);
    const k = this.hushK || 0;
    if (!this.ctx || !k) return;
    const s = PB.Settings.data, t = this.ctx.currentTime, q = 1 - 0.9 * k;
    this.bus.sfx.gain.setTargetAtTime(s.sfx * q, t, 0.3);
    this.bus.amb.gain.setTargetAtTime(s.ambience * 0.7 * q, t, 0.3);
    this.bus.ent.gain.setTargetAtTime(s.entities * q, t, 0.3);
    this.bus.music.gain.setTargetAtTime(s.music * 0.55 * (1 - 0.7 * k), t, 0.3);
  };
  P.killStart = function () { if (!this.ctx) return; this.setMusic('none'); this.play('cStepHeavy', 2, 'sfx', null, { rev: 0.4, gain: 0.35, rate: 0.6 }); };

  // ------------------------------------------------------------ what the chapters do
  const at = (p, y = 1.0) => (p ? { x: p.x, y: p.y != null ? Math.max(p.y, y * 0.5) : y, z: p.z } : null);
  const one = (name, takes = 2, gain = 0.8, o = {}) => function (pos) { if (!this.ctx) return null; return this.play(name, takes, 'sfx', at(pos), Object.assign({ rev: 0.3, gain, ref: 3 }, o)); };
  Object.assign(P, {
    engineCrank: one('sfxCrank', 1, 0.75),
    engineFail(pos, gain = 1) { if (this.ctx) this.play('sfxSputter', 1, 'sfx', at(pos), { rev: 0.3, gain: 0.8 * gain, ref: 3 }); },
    engineStart(pos) { if (!this.ctx) return; this.play('sfxEngineCatch', 1, 'sfx', at(pos), { rev: 0.3, gain: 0.85, ref: 3 }); setTimeout(() => this.loop('eng:car', 'engine', at(pos), { bus: 'sfx', gain: 0.25, rev: 0.2 }), 2400); },
    fuelTap(pos) { if (!this.ctx) return; this.play('sfxClink', 1, 'sfx', at(pos), { rev: 0.2, gain: 0.6 }); this.play('sfxPour', 1, 'sfx', at(pos), { rev: 0.2, gain: 0.45, delay: 0.3 }); },
    fuelPour: one('sfxPour', 1, 0.55),
    speakerField() { if (!this.ctx) return; this.bufLoop('spk', 'radioStatic', null, { bus: 'sfx', gain: 0.22, rev: 0.4 }); setTimeout(() => this.stopLoop('spk', 1.5), 3200); },
    gateChain: one('sfxChain', 1, 0.7),
    carHood: one('sfxClunk', 1, 0.8),
    click(pos) { if (this.ctx) this.play('flashClick', 3, 'sfx', at(pos), { rev: 0.15, gain: 0.7 }); },
    cageGate() { if (this.ctx) this.play('sfxGateSlam', 1, 'sfx', null, { rev: 0.5, gain: 0.8 }); },
    cageStart() { if (!this.ctx) return; this.play('sfxMotorUp', 1, 'sfx', null, { rev: 0.4, gain: 0.6 }); this.bufLoop('cage', 'loopCable', null, { bus: 'sfx', gain: 0.32, rev: 0.4 }); },
    cageStop() { if (!this.ctx) return; this.stopLoop('cage', 0.4); this.play('sfxTwang', 1, 'sfx', null, { rev: 0.6, gain: 0.85 }); },
    winch: one('sfxRatchet', 1, 0.7),
    winchRun(sec = 8) { if (!this.ctx) return; for (let k = 0; k < sec; k++) this.play('sfxRatchet', 1, 'sfx', null, { rev: 0.3, gain: 0.45, delay: k * 0.98 }); },
    knockSeven(pos, dd = 0) { if (!this.ctx) return; const g = U.clamp(1 - dd / 40, 0.15, 1); for (let k = 0; k < 7; k++) this.play('sfxKnockSteel', 3, 'sfx', at(pos), { rev: 0.6, gain: 0.8 * g, delay: k * 0.62 + Math.random() * 0.06, ref: 4, occl: true, occluded: dd > 6 }); },
    canary(alive) { if (!this.ctx) return; this.play('sfxCanary', 1, 'sfx', null, { rev: 0.2, gain: alive ? 0.35 : 0.12, rate: alive ? 1 : 0.8 }); },
    cough() { if (this.ctx) this.play('sfxCough', 1, 'sfx', null, { rev: 0.25, gain: 0.5 }); },
    pullStart: one('sfxPullCord', 1, 0.7),
    generatorStart(pos) { if (!this.ctx) return; this.play('sfxEngineCatch', 1, 'sfx', at(pos), { rev: 0.4, gain: 0.85, ref: 4 }); setTimeout(() => this.loop('eng:gen', 'engine', at(pos), { bus: 'sfx', gain: 0.3, rev: 0.3 }), 2600); },
    tagHang(pos, n = 0) { if (this.ctx) this.play('sfxClink', 1, 'sfx', at(pos), { rev: 0.3, gain: 0.6, rate: 1 + n * 0.03 }); },
    motorStart: one('sfxMotorUp', 1, 0.7),
    cableRun(pos) { if (this.ctx) this.bufLoop('cable', 'loopCable', at(pos), { bus: 'sfx', gain: 0.4, rev: 0.3, ref: 4 }); },
    gondolaDoors: one('sfxSlide', 1, 0.7),
    gondolaLeave(pos) { if (!this.ctx) return; this.play('sfxClunk', 1, 'sfx', at(pos), { rev: 0.4, gain: 0.8 }); this.play('sfxTwang', 1, 'sfx', at(pos), { rev: 0.5, gain: 0.6, delay: 0.4 }); },
    glassThump: one('sfxGlassThump', 1, 0.9, { ref: 2 }),
    choir(on) {
      if (!this.ctx) return;
      if (!on) { this.stopLoop('choir', 0.25); return; }
      const g = PB.game, c = g && g.entities && g.entities.find(e => e.kind === 'choir'), p = c ? { x: c.pos.x, y: 1.6, z: c.pos.z } : null;
      this.bufLoop('choir', 'loopChoir', p, { bus: 'amb', gain: 0.5, rev: 0.7, ref: 6, roll: 0.8, max: 90 });
    },
    musicBox(pos, sec = 6) { if (!this.ctx) return; const s = this.play('sfxMusicBox', 1, 'sfx', at(pos, 1.4), { rev: 0.45, gain: 0.55, ref: 2.5, jitter: 0 }); if (s) try { s.stop(this.t + sec); } catch (e) { /* already */ } },
    clockStrike(pos, n = 6) { if (!this.ctx) return; for (let k = 0; k < n; k++) this.play('sfxClockStrike', 1, 'sfx', at(pos, 1.8), { rev: 0.5, gain: 0.55, delay: 0.8 + k * 1.7, ref: 3, jitter: 0 }); },
    floodRoar() { if (!this.ctx) return; this.bufLoop('flood', 'loopFlood', null, { bus: 'amb', gain: 0.6, rev: 0.4 }); },
    ladderStep() { if (this.ctx) this.play('sfxRung', 3, 'sfx', null, { rev: 0.3, gain: 0.45 }); },
    trainStart() { if (this.ctx) this.play('sfxCoupling', 1, 'sfx', null, { rev: 0.3, gain: 0.7 }); },
    trainRun(k) {
      if (!this.ctx) return;
      k = U.clamp(k, 0, 1);
      let L = this.loops.get('train');
      if (!L && k > 0.01) L = this.bufLoop('train', 'loopTrain', null, { bus: 'amb', gain: 0, rev: 0.05 });
      if (L) { this.setLoop('train', 0.6 * k); if (L.nodes[0]) L.nodes[0].playbackRate.setTargetAtTime(0.7 + 0.35 * k, this.t, 0.5); }
    },
    trainClack(k = 1) { if (this.ctx) this.play('sfxClack', 3, 'sfx', null, { rev: 0.1, gain: 0.42 * k, lowpass: 1400 }); },
    trainBrake() { if (this.ctx) this.play('sfxBrake', 1, 'sfx', null, { rev: 0.3, gain: 0.75 }); },
    pa() { if (!this.ctx) return; this.play('sfxChime', 1, 'sfx', null, { rev: 0.25, gain: 0.45 }); this.bufLoop('pa', 'radioStatic', null, { bus: 'sfx', gain: 0.08, rev: 0.2 }); setTimeout(() => this.stopLoop('pa', 0.6), 3200); },
    carousel(on) {
      if (!this.ctx) return;
      if (!on) {
        // the organ runs down: the music slows and sags before it stops
        const L = this.loops.get('organ'); if (L && L.nodes[0]) L.nodes[0].playbackRate.setTargetAtTime(0.55, this.t, 0.6);
        setTimeout(() => this.stopLoop('organ', 0.6), 1600);
        return;
      }
      const g = PB.game, sp = g && g.level && g.level.spots.carousel && g.level.spots.carousel[0], p = sp ? { x: sp.wx, y: 3, z: sp.wz } : null;
      const L = this.bufLoop('organ', 'loopOrgan', p, { bus: 'amb', gain: 0.6, rev: 0.45, ref: 9, roll: 0.7, max: 120 });
      if (L && L.nodes[0]) L.nodes[0].playbackRate.value = 1;
    },
    rideRun(on) { if (!this.ctx) return; if (on) this.bufLoop('ride', 'loopRide', null, { bus: 'sfx', gain: 0.35, rev: 0.3 }); else this.stopLoop('ride', 0.5); },
    crash() { if (this.ctx) this.play('sfxCrash', 1, 'sfx', null, { rev: 0.4, gain: 0.85 }); },
    iceCrack(pos, k = 1) { if (this.ctx) this.play('sfxIceCrack', 1, 'amb', at(pos, 0.2), { rev: 0.6, gain: 0.7 * k, ref: 10, roll: 0.6, max: 200 }); },
    splash: one('sfxSplash', 1, 0.7),
    waterSurge(pos) { if (!this.ctx) return; this.play('sfxSplash', 1, 'sfx', at(pos), { rev: 0.5, gain: 0.9, rate: 0.5 }); },
    typewriter(sec, pos) { if (this.ctx) this.play('sfxTypewriter', 1, 'sfx', at(pos), { rev: 0.3, gain: 0.6 }); },
    tube: one('sfxWhoosh', 1, 0.6),
    chute(pos) { if (!this.ctx) return; this.play('sfxWhoosh', 1, 'sfx', at(pos), { rev: 0.4, gain: 0.5 }); this.play('impactCardboard', 3, 'sfx', at(pos), { rev: 0.4, gain: 0.8, delay: 0.9 }); },
    elevatorRun(pos, sec = 6) { if (!this.ctx) return; this.loop('elev', 'elevator', null, { bus: 'sfx', gain: 0.4, rev: 0.4 }); setTimeout(() => this.stopLoop('elev', 0.8), sec * 1000); },
    keyTurn: one('sfxKeyTurn', 1, 0.6),
    powerDown() { if (this.ctx) this.play('sfxPowerDown', 1, 'sfx', null, { rev: 0.6, gain: 0.7 }); },
    shipBell(pos, gain = 0.5) { if (this.ctx) this.play('sfxShipBell', 1, 'sfx', at(pos, 2), { rev: 0.6, gain, ref: 5, roll: 0.8 }); },
    shipBellRinging(pos) { if (!this.ctx) return; for (let k = 0; k < 6; k++) this.play('sfxShipBell', 1, 'sfx', at(pos, 2), { rev: 0.6, gain: 0.5, delay: k * 1.3, ref: 5, roll: 0.8, jitter: 0 }); },
    stairs(sound = 'wood', dur = 1) { if (!this.ctx) return; const surf = SURF[ALIAS[sound] || sound] ? ALIAS[sound] || sound : 'wood'; for (let k = 0; k < 6; k++) this.play('step_' + surf, 8, 'sfx', null, { rev: 0.2, gain: 0.5, delay: k * dur / 6 }); },
  });

  // ------------------------------------------------------------ music: Wren's theme, a heartbeat chase
  const baseTick = P.tickMusic;
  P.tickMusic = function () {
    if (!this.ctx) return;
    const m = this.music;
    if (m.mode !== 'menu' && m.mode !== 'chase' && m.mode !== 'ending') return baseTick.call(this);
    const t = this.t;
    if (t + 0.2 < m.next) return;
    const s = m.step++;
    const piano = (f, when, gain = 0.2, det = 6) => { if (!f || !this.sfx) return; const src = this.ctx.createBufferSource(); src.buffer = this.sfx.note(f); src.detune.value = (Math.random() - 0.5) * det; const o = this.out('music', null, { rev: 1, gain }); src.connect(o.input); src.start(when); };
    const pad = (ch, when, dur, gain = 0.028, lo = 300, hi = 760) => {
      const o = this.out('music', null, { rev: 0.95, gain: 0.3 }), lp = this.filt('lowpass', lo, 0.9); lp.connect(o.input);
      lp.frequency.setValueAtTime(lo, when); lp.frequency.linearRampToValueAtTime(hi, when + dur * 0.5); lp.frequency.linearRampToValueAtTime(lo, when + dur);
      for (const f of ch) for (const det of [-6, 7]) { const osc = this.osc('triangle', f), g = this.ctx.createGain(); osc.detune.value = det; osc.connect(g).connect(lp); g.gain.setValueAtTime(0.0001, when); g.gain.linearRampToValueAtTime(gain, when + dur * 0.3); g.gain.linearRampToValueAtTime(0.0001, when + dur); osc.start(when); osc.stop(when + dur + 0.1); }
    };
    if (m.mode === 'menu' || m.mode === 'ending') {
      // Wren's theme: one note a beat, a chord every bar, slow
      const beat = m.mode === 'ending' ? 1.15 : 1.0, CH = [chord(-24, -21, -17, -12), chord(-28, -24, -21, -16), chord(-33, -29, -24, -21), chord(-29, -25, -22, -17)];
      if (s % 4 === 0) pad(CH[(s / 4 | 0) % 4], m.next, beat * 4.4, m.mode === 'ending' ? 0.032 : 0.026);
      const f = WREN[s % WREN.length];
      if (f) piano(f, m.next + 0.02, m.mode === 'ending' ? 0.24 : 0.2);
      if (s % 8 === 0) piano(CH[(s / 4 | 0) % 4][0], m.next, 0.1);
      // every other time through, an octave up and very soft, like someone humming along
      if (f && (s / 16 | 0) % 2 === 1 && Math.random() < 0.6) piano(f * 2, m.next + 0.04, 0.06);
      m.next += beat;
      return;
    }
    // chase: a heartbeat under low strings that grind a semitone apart, tremolo high above
    const k = U.clamp(m.intensity || 0, 0, 1), step = 0.2 - k * 0.05;
    const o = this.out('music', null, { rev: 0.35, gain: 0.75 });
    if (s % 4 === 0 || s % 4 === 1) { const w = m.next; this.tone(o.input, 'sine', 62, 34, w, 0.28, s % 4 ? 0.32 : 0.5, 0.004); this.burst(o.input, 'lowpass', 140, 1, w, 0.12, 0.25, 0.002); }
    if (s % 16 === 0) {
      const lp = this.filt('lowpass', 260 + k * 700, 2); lp.connect(o.input);
      for (const [f, det] of [[55, -5], [58.27, 4], [110, 2]]) { const osc = this.osc('sawtooth', f), g = this.ctx.createGain(); osc.detune.value = det; osc.connect(g).connect(lp); const w = m.next; g.gain.setValueAtTime(0.0001, w); g.gain.linearRampToValueAtTime(0.09, w + step * 6); g.gain.linearRampToValueAtTime(0.0001, w + step * 16.5); osc.start(w); osc.stop(w + step * 17); }
    }
    if (s % 32 === 8 && k > 0.25) {
      const w = m.next, tr = this.ctx.createGain(), lfo = this.osc('square', 11), lg = this.ctx.createGain(); lg.gain.value = 0.5; tr.gain.value = 0.5; lfo.connect(lg).connect(tr.gain); tr.connect(o.input);
      for (const f of [1760, 1864.7, 1975.5]) { const osc = this.osc('triangle', f), g = this.ctx.createGain(); osc.connect(g).connect(tr); g.gain.setValueAtTime(0.0001, w); g.gain.linearRampToValueAtTime(0.012 * k, w + 1.2); g.gain.linearRampToValueAtTime(0.0001, w + 3.6); osc.start(w); osc.stop(w + 3.7); }
      lfo.start(w); lfo.stop(w + 3.7);
    }
    m.next += step;
  };
  // the notes of Wren's theme rendered ahead, so the menu never stalls on its first bar
  const baseInit = P.init;
  P.init = function () {
    const first = !this.ctx;
    baseInit.call(this);
    if (first && this.sfx) { let i = 0; const fs = [...new Set(WREN.filter(Boolean).concat(WREN.filter(Boolean).map(f => f * 2), [N(-24), N(-28), N(-33), N(-29)]))]; const step = () => { if (i < fs.length) { this.sfx.note(fs[i++]); setTimeout(step, 30); } }; setTimeout(step, 200); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
