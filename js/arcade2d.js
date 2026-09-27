/* The free cabinet in the arcade: HUNGRY HOUSE (Brightline Amusements, 1981), a fictional maze game.
   The Muncher eats the stars of a haunted house; four Haunts chase it; lanterns turn the tables. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  PB.Classic = function (canvas, opts = {}) {
  // 28 x 31 floor plan. # wall, . star, o lantern, - door of the Haunts' house.
  const MAP = [
    '############################',
    '#..........................#',
    '#.####.##.########.##.####.#',
    '#o####.##.########.##.####o#',
    '#.####.##.########.##.####.#',
    '#..........................#',
    '#.##.###.##########.###.##.#',
    '#.##.###.##########.###.##.#',
    '#...........####...........#',
    '######.####.####.####.######',
    '######.####.####.####.######',
    '######.#            #.######',
    '######.# ####--#### #.######',
    '######.# ##      ## #.######',
    '      .  ##      ##  .      ',
    '######.# ##      ## #.######',
    '######.# ########## #.######',
    '######.#            #.######',
    '######.# ########## #.######',
    '######.# ########## #.######',
    '#..........................#',
    '#.########.######.########.#',
    '#o########.######.########o#',
    '#....#......    ......#....#',
    '####.#.##############.#.####',
    '####.#.##############.#.####',
    '#....#.......##.......#....#',
    '#.########.#.##.#.########.#',
    '#.########.#.##.#.########.#',
    '#..........................#',
    '############################',
  ];
  const COLS = 28, ROWS = 31, TOP = 3, TOTAL_ROWS = 36, TUNNEL_ROW = 14;
  const UP = 0, LEFT = 1, DOWN = 2, RIGHT = 3;
  const DX = [0, -1, 0, 1], DY = [-1, 0, 1, 0];
  const opposite = d => (d + 2) % 4;
  const BASE = 9.6 / 60; // tiles per frame at 100% speed
  const STEP_MS = 1000 / 60;
  const EPS = 1e-6;
  const HI_KEY = 'pb.hungry.hi', MUTE_KEY = 'pb.classic.muted';

  const COLOR = {
    maze: '#8a3cff', mazeGlow: 'rgba(170, 90, 255, 0.85)',
    mazeFlash: '#ffe9c4', mazeFlashGlow: 'rgba(255, 220, 160, 0.7)',
    dot: '#ffe7a0', pac: '#ff8a1a', door: '#ff9a4a', text: '#f3e6ff', white: '#ffffff',
    red: '#ff3b30', cyan: '#3fe6c0', pink: '#ff9ad5',
    fright: '#d8d8e0', frightFace: '#3a3a48', flash: '#ff3b30', flashFace: '#ffffff', pupil: '#120818',
  };

  const GHOSTS = [
    { name: 'red', color: '#ff3b30', home: [13.5, 11], corner: { x: 25, y: -3 } },
    { name: 'violet', color: '#b46cff', home: [13.5, 14], corner: { x: 2, y: -3 } },
    { name: 'teal', color: '#2fe0b8', home: [11.5, 14], corner: { x: 27, y: 31 } },
    { name: 'amber', color: '#ffb020', home: [15.5, 14], corner: { x: 0, y: 31 } },
  ];
  const GLOBAL_LIMITS = { violet: 6, teal: 16, amber: 30 };
  const NO_UP = new Set();
  const FRUITS = [
    { kind: 'candy', pts: 100 }, { kind: 'soda', pts: 300 }, { kind: 'cupcake', pts: 500 },
    { kind: 'token', pts: 700 }, { kind: 'yoyo', pts: 1000 }, { kind: 'robot', pts: 2000 },
    { kind: 'crown', pts: 3000 }, { kind: 'trophy', pts: 5000 },
  ];
  const fruitFor = l => FRUITS[l === 1 ? 0 : l === 2 ? 1 : l <= 4 ? 2 : l <= 6 ? 3 : l <= 8 ? 4 : l <= 10 ? 5 : l <= 12 ? 6 : 7];
  const TOTAL_DOTS = MAP.join('').replace(/[^.o]/g, '').length;

  // Seviyeye göre hızlar ve süreler (salon makinesinin tablolarından)
  function spec(level) {
    const tier = level === 1 ? 0 : level <= 4 ? 1 : level <= 20 ? 2 : 3;
    const FRIGHT = [7, 6, 5, 4, 3, 5, 3, 2, 2, 4, 2, 2, 1, 3, 1, 1, 1, 1];
    const RAGE = [18, 28, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 90, 100, 110, 120];
    return {
      pac: [0.82, 0.9, 1.0, 0.92][tier],
      pacFright: [0.9, 0.96, 1.0, 1.0][tier],
      ghost: [0.74, 0.84, 0.94, 0.95][tier],
      ghostFright: [0.48, 0.54, 0.6, 0.6][tier],
      tunnel: [0.42, 0.46, 0.5, 0.5][tier],
      rage1: [0.8, 0.9, 1.0, 1.0][tier],
      rage2: [0.86, 0.95, 1.04, 1.05][tier],
      rageDots: RAGE[Math.min(level, RAGE.length) - 1],
      fright: level <= FRIGHT.length ? FRIGHT[level - 1] : 1,
      schedule: level === 1 ? [6, 22, 6, 22, 5, 24, 5, Infinity]
        : level <= 4 ? [6, 22, 6, 22, 4, 40, 3, Infinity]
        : [5, 24, 5, 24, 4, 60, 2, Infinity],
      idle: level <= 4 ? 220 : 170,
      dotLimits: level === 1 ? { violet: 0, teal: 28, amber: 56 }
        : level === 2 ? { violet: 0, teal: 0, amber: 46 }
        : { violet: 0, teal: 0, amber: 0 },
    };
  }

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* depolama kapalı */ } },
  };

  // ---------- Ses: tamamen WebAudio ile üretilir ----------
  const LOOPS = {
    siren: { type: 'triangle', f: 400, lfoType: 'triangle', rate: 2.4, depth: 120, vol: 0.12 },
    fright: { type: 'square', f: 150, lfoType: 'sawtooth', rate: 7.5, depth: 70, vol: 0.05 },
    eyes: { type: 'sawtooth', f: 750, lfoType: 'sawtooth', rate: 13, depth: 300, vol: 0.035 },
  };
  const Sound = {
    ctx: null, master: null, muted: false, loopName: null, loop: null, flip: false,
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        try { this.ctx = new AC(); } catch { return; }
        this.master = this.ctx.createGain();
        this.master.gain.value = this.muted ? 0 : 0.22;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      if (this.loopName && !this.loop) this.startLoop(this.loopName);
    },
    setMuted(m) {
      this.muted = m;
      if (this.master) this.master.gain.setTargetAtTime(m ? 0 : 0.22, this.ctx.currentTime, 0.02);
    },
    tone(f0, f1, dur, type = 'square', vol = 0.5, delay = 0) {
      if (!this.ctx || this.muted) return;
      const t = this.ctx.currentTime + delay;
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f0, t);
      if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(this.master);
      o.start(t);
      o.stop(t + dur + 0.02);
    },
    munch() {
      // a short crunch: two clicks of filtered noise, alternating in pitch
      if (!this.ctx || this.muted) return;
      this.flip = !this.flip;
      const c = this.ctx, t = c.currentTime, n = c.createBuffer(1, Math.floor(c.sampleRate * 0.06), c.sampleRate), d = n.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.012));
      const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      src.buffer = n; f.type = 'bandpass'; f.frequency.value = this.flip ? 1400 : 900; f.Q.value = 3; g.gain.value = 0.9;
      src.connect(f).connect(g).connect(this.master); src.start(t);
    },
    power() { this.tone(180, 720, 0.18, 'square', 0.25); },
    eatGhost() { this.tone(220, 1500, 0.22, 'sawtooth', 0.25); this.tone(1500, 900, 0.12, 'square', 0.15, 0.22); },
    fruit() { [880, 1175, 1568].forEach((f, i) => this.tone(f, f, 0.08, 'square', 0.25, i * 0.07)); },
    extra() { for (let i = 0; i < 6; i++) { const f = i % 2 ? 1319 : 1047; this.tone(f, f, 0.09, 'square', 0.22, i * 0.1); } },
    death() {
      for (let i = 0; i < 11; i++) { const f = 880 * Math.pow(0.86, i); this.tone(f, f * 0.7, 0.12, 'square', 0.3, i * 0.11); }
      this.tone(160, 60, 0.35, 'triangle', 0.5, 1.26);
    },
    jingle() {
      const q = 0.14;
      const lead = [[659, 1], [784, 1], [988, 1], [1319, 2], [1175, 1], [988, 1], [784, 2], [880, 1], [988, 1], [1047, 1], [1175, 1], [1319, 3]];
      const bass = [[165, 2], [196, 2], [247, 2], [196, 2], [220, 2], [247, 2], [330, 4]];
      let t = 0;
      for (const [f, d] of lead) { this.tone(f, f, d * q * 0.9, 'square', 0.2, t); t += d * q; }
      t = 0;
      for (const [f, d] of bass) { this.tone(f, f, d * q * 0.95, 'triangle', 0.5, t); t += d * q; }
    },
    setLoop(name) {
      if (name === this.loopName) return;
      this.loopName = name;
      this.stopLoop();
      if (name && this.ctx) this.startLoop(name);
    },
    startLoop(name) {
      const cfg = LOOPS[name], c = this.ctx, t = c.currentTime;
      const o = c.createOscillator(), l = c.createOscillator(), lg = c.createGain(), g = c.createGain();
      o.type = cfg.type; o.frequency.value = cfg.f;
      l.type = cfg.lfoType; l.frequency.value = cfg.rate; lg.gain.value = cfg.depth;
      l.connect(lg).connect(o.frequency);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(cfg.vol, t + 0.08);
      o.connect(g).connect(this.master);
      o.start(t); l.start(t);
      this.loop = { o, l, g };
    },
    stopLoop() {
      if (!this.loop) return;
      const { o, l, g } = this.loop, t = this.ctx.currentTime;
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + 0.06);
      o.stop(t + 0.08); l.stop(t + 0.08);
      this.loop = null;
    },
  };

  // ---------- Oyun durumu ----------
  const ctx = canvas.getContext('2d');
  const coarse = { matches: false };
  const reducedMotion = { matches: false };
  let T = 16; // karo başına cihaz pikseli
  let mazeBlue = null, mazeWhite = null;
  let state = 'attract', stateTime = 0, stateDur = 0, pausedFrom = null;
  let level = 1, score = 0, hi = 0, lives = 2, extraAwarded = false, lvl = spec(1);
  const dots = new Uint8Array(ROWS * COLS);
  let dotsLeft = 0, dotsEaten = 0;
  let pac = null, ghosts = [], leader = null;
  let frightTimer = 0, ghostCombo = 0, modeIndex = 0, modeTimer = 0, idleTimer = 0;
  let useGlobalCounter = false, globalDotCount = 0;
  let fruit = null, popups = [], eatenFlash = null;
  let frame = 0;

  const tileAt = (c, r) => {
    if (r < 0 || r >= ROWS) return '#';
    if (c < 0 || c >= COLS) return r === TUNNEL_ROW ? ' ' : '#';
    return MAP[r][c];
  };
  const open = (c, r) => { const t = tileAt(c, r); return t !== '#' && t !== '-'; };
  const atCenter = e => Math.abs(e.x - Math.round(e.x)) < EPS && Math.abs(e.y - Math.round(e.y)) < EPS;
  const approach = (v, target, s) => (v < target ? Math.min(target, v + s) : Math.max(target, v - s));

  function distToNext(e, d) {
    if (DX[d] > 0) return Math.floor(e.x + EPS) + 1 - e.x;
    if (DX[d] < 0) return e.x - (Math.ceil(e.x - EPS) - 1);
    if (DY[d] > 0) return Math.floor(e.y + EPS) + 1 - e.y;
    return e.y - (Math.ceil(e.y - EPS) - 1);
  }
  function snapNext(e, d) {
    if (DX[d] > 0) e.x = Math.floor(e.x + EPS) + 1;
    else if (DX[d] < 0) e.x = Math.ceil(e.x - EPS) - 1;
    else if (DY[d] > 0) e.y = Math.floor(e.y + EPS) + 1;
    else e.y = Math.ceil(e.y - EPS) - 1;
  }
  function wrap(e) {
    if (e.x < -1.5) e.x += 30;
    else if (e.x > 28.5) e.x -= 30;
  }

  function resetDots() {
    dotsLeft = 0; dotsEaten = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const ch = MAP[r][c], v = ch === '.' ? 1 : ch === 'o' ? 2 : 0;
        dots[r * COLS + c] = v;
        if (v) dotsLeft++;
      }
    }
  }

  function resetActors() {
    pac = { x: 13.5, y: 23, dir: LEFT, next: -1, stall: 0, anim: 0.3 };
    ghosts = GHOSTS.map(d => ({
      name: d.name, color: d.color, corner: d.corner,
      x: d.home[0], y: d.home[1],
      dir: d.name === 'red' ? LEFT : d.name === 'violet' ? DOWN : UP,
      state: d.name === 'red' ? 'active' : 'house',
      frightened: false, reverse: false, dotCount: 0,
    }));
    leader = ghosts[0];
    frightTimer = 0; ghostCombo = 0; modeIndex = 0; modeTimer = 0; idleTimer = 0;
    fruit = null; popups = []; eatenFlash = null;
  }

  function setState(name, dur = 0) {
    state = name; stateTime = 0; stateDur = dur;
    syncUi();
  }

  function startGame() {
    Sound.init();
    level = 1; score = 0; lives = 2; extraAwarded = false;
    lvl = spec(level);
    resetDots(); resetActors();
    useGlobalCounter = false; globalDotCount = 0;
    setState('ready', 140);
    Sound.jingle();
  }

  function nextLevel() {
    level++;
    lvl = spec(level);
    resetDots(); resetActors();
    useGlobalCounter = false; globalDotCount = 0;
    setState('ready', 120);
  }

  function loseLife() {
    if (lives === 0) { saveHi(); setState('gameover', 180); return; }
    lives--;
    resetActors();
    useGlobalCounter = true; globalDotCount = 0;
    setState('ready', 120);
  }

  function addScore(n) {
    score += n;
    if (!extraAwarded && score >= 10000) { extraAwarded = true; lives++; Sound.extra(); }
    if (score > hi) hi = score;
  }
  function saveHi() { store.set(HI_KEY, String(hi)); }

  // ---------- Güncelleme ----------
  function update() {
    frame++;
    if (state === 'paused' || state === 'attract') { Sound.setLoop(null); return; }
    stateTime++;
    switch (state) {
      case 'ready': if (stateTime >= stateDur) setState('playing'); break;
      case 'playing': updatePlaying(); break;
      case 'ghostEaten': if (stateTime >= 60) { eatenFlash = null; setState('playing'); } break;
      case 'dying':
        if (stateTime === 60) Sound.death();
        if (stateTime >= 200) loseLife();
        break;
      case 'levelDone': if (stateTime >= 180) nextLevel(); break;
      case 'gameover': if (stateTime >= 180) { resetDots(); setState('attract'); } break;
    }
    popups = popups.filter(p => --p.t > 0);
    if (state === 'playing') {
      const eyes = ghosts.some(g => g.state === 'eaten' || g.state === 'entering');
      Sound.setLoop(eyes ? 'eyes' : frightTimer > 0 ? 'fright' : 'siren');
    } else {
      Sound.setLoop(null);
    }
  }

  function updatePlaying() {
    if (frightTimer > 0) {
      if (--frightTimer === 0) ghosts.forEach(g => { g.frightened = false; });
    } else if (modeIndex < lvl.schedule.length - 1 && ++modeTimer >= lvl.schedule[modeIndex] * 60) {
      modeIndex++; modeTimer = 0;
      ghosts.forEach(g => { if (g.state === 'active') g.reverse = true; });
    }
    idleTimer++;
    updateHouse();

    if (pac.stall > 0) pac.stall--;
    else movePac(BASE * (frightTimer > 0 ? lvl.pacFright : lvl.pac));
    eatDot();
    if (state !== 'playing') return;

    for (const g of ghosts) updateGhost(g);
    checkCollisions();
    if (state !== 'playing') return;

    if (fruit) {
      if (--fruit.timer <= 0) fruit = null;
      else if (Math.abs(pac.y - 17) < 0.5 && Math.abs(pac.x - 13.5) < 0.8) {
        addScore(fruit.pts);
        popups.push({ text: String(fruit.pts), x: 13.5, y: 17, t: 120, color: COLOR.pink });
        fruit = null;
        Sound.fruit();
      }
    }
  }

  function movePac(s) {
    if (pac.next !== -1 && pac.next === opposite(pac.dir)) pac.dir = pac.next;
    let rem = s, moved = 0;
    for (let i = 0; i < 4 && rem > EPS; i++) {
      if (atCenter(pac)) {
        const c = Math.round(pac.x), r = Math.round(pac.y);
        if (pac.next !== -1 && open(c + DX[pac.next], r + DY[pac.next])) pac.dir = pac.next;
        if (!open(c + DX[pac.dir], r + DY[pac.dir])) break;
      }
      const d = distToNext(pac, pac.dir);
      if (d <= rem) { snapNext(pac, pac.dir); rem -= d; moved += d; }
      else { pac.x += DX[pac.dir] * rem; pac.y += DY[pac.dir] * rem; moved += rem; rem = 0; }
      wrap(pac);
    }
    pac.anim += moved;
  }

  function firstWaiting() {
    for (let i = 1; i < ghosts.length; i++) if (ghosts[i].state === 'house') return ghosts[i];
    return null;
  }

  function eatDot() {
    const c = Math.round(pac.x), r = Math.round(pac.y);
    if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return;
    const i = r * COLS + c, v = dots[i];
    if (!v) return;
    dots[i] = 0; dotsLeft--; dotsEaten++; idleTimer = 0;
    if (useGlobalCounter) globalDotCount++;
    else { const w = firstWaiting(); if (w) w.dotCount++; }
    if (v === 1) { addScore(10); pac.stall = 1; Sound.munch(); }
    else { addScore(50); pac.stall = 3; energize(); }
    if (dotsEaten === 70 || dotsEaten === 170) fruit = { ...fruitFor(level), timer: 570 };
    if (dotsLeft === 0) setState('levelDone');
  }

  function energize() {
    ghostCombo = 0;
    ghosts.forEach(g => { if (g.state === 'active') g.reverse = true; });
    Sound.power();
    if (lvl.fright <= 0) return;
    frightTimer = lvl.fright * 60;
    ghosts.forEach(g => { if (g.state !== 'eaten' && g.state !== 'entering') g.frightened = true; });
  }

  function updateHouse() {
    const w = firstWaiting();
    if (!w) { useGlobalCounter = false; return; }
    let release = useGlobalCounter
      ? globalDotCount >= GLOBAL_LIMITS[w.name]
      : w.dotCount >= lvl.dotLimits[w.name];
    if (!release && idleTimer >= lvl.idle) { release = true; idleTimer = 0; }
    if (release) w.state = 'leaving';
  }

  function rageLevel() {
    if (useGlobalCounter && ghosts[3].state === 'house') return 0;
    if (dotsLeft <= lvl.rageDots / 2) return 2;
    if (dotsLeft <= lvl.rageDots) return 1;
    return 0;
  }

  function inTunnel(g) {
    const c = Math.round(g.x);
    return Math.round(g.y) === TUNNEL_ROW && (c <= 5 || c >= 22);
  }

  function updateGhost(g) {
    switch (g.state) {
      case 'house': {
        const s = BASE * 0.5;
        g.y += g.dir === UP ? -s : s;
        if (g.y <= 13.5) { g.y = 13.5; g.dir = DOWN; }
        else if (g.y >= 14.5) { g.y = 14.5; g.dir = UP; }
        break;
      }
      case 'leaving': {
        const s = BASE * 0.5;
        if (Math.abs(g.x - 13.5) > EPS) {
          if (Math.abs(g.y - 14) > EPS) { g.dir = g.y > 14 ? UP : DOWN; g.y = approach(g.y, 14, s); }
          else { g.dir = g.x < 13.5 ? RIGHT : LEFT; g.x = approach(g.x, 13.5, s); }
        } else {
          g.dir = UP;
          g.y = approach(g.y, 11, s);
          if (Math.abs(g.y - 11) < EPS) { g.x = 13.5; g.y = 11; g.state = 'active'; g.dir = LEFT; g.reverse = false; }
        }
        break;
      }
      case 'eaten':
        if (Math.abs(g.y - 11) < EPS && Math.abs(g.x - 13.5) <= 0.5 + EPS) { g.state = 'entering'; break; }
        moveGhost(g, BASE * 2);
        break;
      case 'entering': {
        const s = BASE * 1.5;
        if (Math.abs(g.x - 13.5) > EPS) { g.dir = g.x < 13.5 ? RIGHT : LEFT; g.x = approach(g.x, 13.5, s); }
        else if (g.y < 14 - EPS) { g.dir = DOWN; g.y = approach(g.y, 14, s); }
        else { g.state = 'leaving'; g.frightened = false; }
        break;
      }
      case 'active': {
        let sp = lvl.ghost;
        if (inTunnel(g)) sp = lvl.tunnel;
        else if (g.frightened) sp = lvl.ghostFright;
        else if (g === leader) { const e = rageLevel(); if (e) sp = e === 2 ? lvl.rage2 : lvl.rage1; }
        moveGhost(g, BASE * sp);
        break;
      }
    }
  }

  function moveGhost(g, s) {
    if (g.reverse) { g.reverse = false; g.dir = opposite(g.dir); }
    let rem = s;
    for (let i = 0; i < 4 && rem > EPS; i++) {
      if (atCenter(g)) chooseDir(g);
      const d = distToNext(g, g.dir);
      if (d <= rem) { snapNext(g, g.dir); rem -= d; }
      else { g.x += DX[g.dir] * rem; g.y += DY[g.dir] * rem; rem = 0; }
      wrap(g);
    }
  }

  function ghostTarget(g) {
    if (g.state === 'eaten') return { x: 13, y: 11 };
    const scatter = modeIndex % 2 === 0;
    if (scatter && !(g === leader && rageLevel() > 0)) return g.corner;
    const pc = Math.round(pac.x), pr = Math.round(pac.y);
    switch (g.name) {
      case 'violet': {
        // cuts you off: aims three tiles ahead of the Muncher
        return { x: pc + DX[pac.dir] * 3, y: pr + DY[pac.dir] * 3 };
      }
      case 'teal': {
        // flanks: mirrors the red one across a point just ahead of you
        const ax = pc + DX[pac.dir] * 2, ay = pr + DY[pac.dir] * 2;
        return { x: 2 * ax - Math.round(leader.x), y: 2 * ay - Math.round(leader.y) };
      }
      case 'amber': {
        // bold from afar, shy up close
        const dx = pc - Math.round(g.x), dy = pr - Math.round(g.y);
        return dx * dx + dy * dy > 49 ? { x: pc, y: pr } : g.corner;
      }
      default: return { x: pc, y: pr };
    }
  }

  function chooseDir(g) {
    const c = Math.round(g.x), r = Math.round(g.y), back = opposite(g.dir);
    const opts = [];
    for (let d = 0; d < 4; d++) {
      if (d === back || !open(c + DX[d], r + DY[d])) continue;
      if (d === UP && g.state === 'active' && !g.frightened && NO_UP.has(c + ',' + r)) continue;
      opts.push(d);
    }
    if (!opts.length) { g.dir = back; return; }
    if (g.frightened && g.state === 'active') { g.dir = opts[Math.floor(Math.random() * opts.length)]; return; }
    const t = ghostTarget(g);
    let best = opts[0], bestD = Infinity;
    for (const d of opts) {
      const dx = c + DX[d] - t.x, dy = r + DY[d] - t.y, dist = dx * dx + dy * dy;
      if (dist < bestD) { bestD = dist; best = d; }
    }
    g.dir = best;
  }

  function checkCollisions() {
    for (const g of ghosts) {
      if (g.state !== 'active') continue;
      let dx = g.x - pac.x;
      if (dx > 15) dx -= 30; else if (dx < -15) dx += 30;
      const dy = g.y - pac.y;
      if (dx * dx + dy * dy > 0.25) continue;
      if (g.frightened) {
        const pts = 200 << ghostCombo;
        ghostCombo = Math.min(ghostCombo + 1, 3);
        addScore(pts);
        g.frightened = false;
        g.state = 'eaten';
        eatenFlash = { ghost: g, text: String(pts), x: g.x, y: g.y };
        setState('ghostEaten');
        Sound.eatGhost();
      } else {
        setState('dying');
      }
      return;
    }
  }

  // ---------- Çizim ----------
  const px = x => (x + 0.5) * T;
  const py = y => (y + 0.5 + TOP) * T;

  function renderMaze(color, glow) {
    const cv = document.createElement('canvas');
    cv.width = Math.ceil(COLS * T);
    cv.height = Math.ceil(ROWS * T);
    const g = cv.getContext('2d');
    const h = T / 2, inset = T * 0.3, R = h - inset;
    const wall = (c, r) => r >= 0 && r < ROWS && c >= 0 && c < COLS && MAP[r][c] === '#';
    g.beginPath();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!wall(c, r)) continue;
        const cx = (c + 0.5) * T, cy = (r + 0.5) * T;
        // Her duvar karosu dört çeyreğe bölünür; komşulara göre düz çizgi, dış köşe ya da iç köşe çizilir.
        for (const sx of [-1, 1]) {
          for (const sy of [-1, 1]) {
            const v = wall(c, r + sy), hz = wall(c + sx, r), dg = wall(c + sx, r + sy);
            if (!v && !hz) {
              g.moveTo(cx, cy + sy * R);
              g.arcTo(cx + sx * R, cy + sy * R, cx + sx * R, cy, R);
            } else if (!v) {
              g.moveTo(cx, cy + sy * R);
              g.lineTo(cx + sx * h, cy + sy * R);
            } else if (!hz) {
              g.moveTo(cx + sx * R, cy);
              g.lineTo(cx + sx * R, cy + sy * h);
            } else if (!dg) {
              g.moveTo(cx + sx * R, cy + sy * h);
              g.arcTo(cx + sx * R, cy + sy * R, cx + sx * h, cy + sy * R, inset);
            }
          }
        }
      }
    }
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.lineWidth = Math.max(1, T * 0.13);
    g.strokeStyle = color;
    g.shadowColor = glow;
    g.shadowBlur = T * 0.6;
    g.stroke();
    g.shadowBlur = 0;
    g.stroke();
    return cv;
  }

  function text(str, x, y, color, size = 1, align = 'left') {
    ctx.font = `${Math.max(6, Math.round(T * size))}px "Press Start 2P", ui-monospace, monospace`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.fillText(str, x, y);
  }

  function circle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // The Muncher: a round, horned little beast with a toothy jaw that opens toward where it is going
  function pacShape(x, y, r, dir, mouth) {
    const c = ctx, flip = dir === LEFT ? -1 : 1, look = [[0, -1], [-1, 0], [0, 1], [1, 0]][dir];
    c.save(); c.translate(x, y);
    // horns
    c.fillStyle = '#5a1e0a';
    for (const s2 of [-1, 1]) { c.beginPath(); c.moveTo(s2 * r * 0.35, -r * 0.8); c.lineTo(s2 * r * 0.62, -r * 1.25); c.lineTo(s2 * r * 0.7, -r * 0.62); c.closePath(); c.fill(); }
    // body
    const grd = c.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r);
    grd.addColorStop(0, '#ffc07a'); grd.addColorStop(1, COLOR.pac);
    c.fillStyle = grd; c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fill();
    // jaw: a dark mouth across the lower face, opening with the chew
    const open = Math.min(1, mouth / 0.86), mw = r * 0.72, mh = r * (0.08 + 0.42 * open), my = r * 0.28;
    c.fillStyle = '#2a0808'; c.beginPath(); c.ellipse(flip * r * 0.08, my, mw, mh, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#fff6e0';
    for (let k = -2; k <= 2; k++) {
      const tx = flip * r * 0.08 + k * mw * 0.36;
      c.beginPath(); c.moveTo(tx - r * 0.09, my - mh * 0.9); c.lineTo(tx + r * 0.09, my - mh * 0.9); c.lineTo(tx, my - mh * 0.9 + r * 0.16); c.closePath(); c.fill();
      if (open > 0.3) { c.beginPath(); c.moveTo(tx - r * 0.08, my + mh * 0.9); c.lineTo(tx + r * 0.08, my + mh * 0.9); c.lineTo(tx, my + mh * 0.9 - r * 0.13); c.closePath(); c.fill(); }
    }
    // eyes, looking the way it goes
    for (const s2 of [-1, 1]) {
      const ex = s2 * r * 0.34, ey = -r * 0.22;
      c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(ex, ey, r * 0.2, r * 0.24, 0, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#120818'; c.beginPath(); c.arc(ex + look[0] * r * 0.08, ey + look[1] * r * 0.09, r * 0.1, 0, Math.PI * 2); c.fill();
    }
    c.restore();
  }
  const pacMouth = () => 0.08 + Math.abs(Math.sin(pac.anim * Math.PI * 1.25)) * 0.78;

  // A Haunt: a tall hooded sheet with a ragged, drifting hem and hollow eyes
  function ghostBody(x, y, color) {
    const c = ctx, w = T * 0.72, top = y - T * 0.86, bottom = y + T * 0.7, ph = frame / 9;
    c.fillStyle = color;
    c.beginPath();
    c.moveTo(x - w, bottom);
    c.quadraticCurveTo(x - w * 1.05, y - T * 0.1, x - w * 0.55, top + T * 0.3);
    c.quadraticCurveTo(x, top - T * 0.1, x + w * 0.55, top + T * 0.3);
    c.quadraticCurveTo(x + w * 1.05, y - T * 0.1, x + w, bottom);
    for (let i = 1; i <= 5; i++) {
      const xx = x + w - (2 * w * i) / 5, dip = (i % 2 ? 0.26 : 0.02) + 0.06 * Math.sin(ph + i);
      c.quadraticCurveTo(xx + w * 0.2, bottom - T * dip * 0.5, xx, bottom - T * dip);
    }
    c.closePath();
    c.fill();
    c.fillStyle = 'rgba(255,255,255,0.18)';
    c.beginPath(); c.ellipse(x - w * 0.3, y - T * 0.4, w * 0.18, T * 0.3, -0.3, 0, Math.PI * 2); c.fill();
  }

  function ghostEyes(x, y, dir) {
    const ox = DX[dir] * T * 0.08, oy = DY[dir] * T * 0.08;
    for (const s2 of [-1, 1]) {
      const ex = x + s2 * T * 0.26 + ox, ey = y - T * 0.22 + oy;
      ctx.fillStyle = COLOR.pupil;
      ctx.beginPath(); ctx.ellipse(ex, ey, T * 0.14, T * 0.22, s2 * 0.25, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath(); ctx.arc(ex + DX[dir] * T * 0.04, ey - T * 0.08 + DY[dir] * T * 0.04, T * 0.04, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Scared: pale, a wavering open mouth
  function frightFace(x, y, color) {
    ctx.fillStyle = color;
    for (const s2 of [-1, 1]) { ctx.beginPath(); ctx.arc(x + s2 * T * 0.24, y - T * 0.22, T * 0.1, 0, Math.PI * 2); ctx.fill(); }
    ctx.beginPath(); ctx.ellipse(x, y + T * 0.16, T * 0.2, T * 0.14 + Math.sin(frame / 4) * T * 0.04, 0, 0, Math.PI * 2); ctx.fill();
  }

  function drawGhost(g) {
    const x = px(g.x), y = py(g.y);
    if (g.state === 'eaten' || g.state === 'entering') { ctx.globalAlpha = 0.5; ghostEyes(x, y, g.dir); ctx.globalAlpha = 1; return; }
    if (g.frightened) {
      const flash = frightTimer < 120 && Math.floor(frightTimer / 14) % 2 === 0;
      ghostBody(x, y, flash ? COLOR.flash : COLOR.fright);
      frightFace(x, y, flash ? COLOR.flashFace : COLOR.frightFace);
    } else {
      ghostBody(x, y, g.color);
      ghostEyes(x, y, g.dir);
    }
  }

  // Bonus prizes that appear under the Haunts' house
  function drawFruit(kind, x, y, s) {
    const c = ctx;
    c.save(); c.translate(x, y); c.scale(s, s); c.lineCap = 'round'; c.lineJoin = 'round';
    const rr = (x0, y0, w, h, r0, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(x0 + r0, y0); c.arcTo(x0 + w, y0, x0 + w, y0 + h, r0); c.arcTo(x0 + w, y0 + h, x0, y0 + h, r0); c.arcTo(x0, y0 + h, x0, y0, r0); c.arcTo(x0, y0, x0 + w, y0, r0); c.closePath(); c.fill(); };
    switch (kind) {
      case 'candy': // wrapped sweet
        c.fillStyle = '#ff4f9a'; c.beginPath(); c.ellipse(0, 0, 0.36, 0.26, 0, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.moveTo(-0.34, 0); c.lineTo(-0.7, -0.25); c.lineTo(-0.7, 0.25); c.closePath(); c.fill();
        c.beginPath(); c.moveTo(0.34, 0); c.lineTo(0.7, -0.25); c.lineTo(0.7, 0.25); c.closePath(); c.fill();
        c.strokeStyle = '#ffffff'; c.lineWidth = 0.07; c.beginPath(); c.moveTo(-0.15, -0.2); c.lineTo(0.05, 0.22); c.moveTo(0.1, -0.22); c.lineTo(0.28, 0.12); c.stroke();
        break;
      case 'soda': // a can of Star Pop
        rr(-0.3, -0.6, 0.6, 1.2, 0.1, '#d8263a'); rr(-0.3, -0.62, 0.6, 0.12, 0.05, '#c0c4cc'); rr(-0.3, 0.5, 0.6, 0.12, 0.05, '#c0c4cc');
        c.fillStyle = '#ffe07a'; c.beginPath(); for (let q = 0; q < 10; q++) { const r0 = q & 1 ? 0.08 : 0.2, a = q * Math.PI / 5 - Math.PI / 2; c.lineTo(Math.cos(a) * r0, Math.sin(a) * r0); } c.closePath(); c.fill();
        break;
      case 'cupcake':
        c.fillStyle = '#c47a3a'; c.beginPath(); c.moveTo(-0.4, 0); c.lineTo(0.4, 0); c.lineTo(0.28, 0.6); c.lineTo(-0.28, 0.6); c.closePath(); c.fill();
        c.fillStyle = '#ffd2e8'; c.beginPath(); c.arc(0, -0.05, 0.44, Math.PI, 0); c.fill();
        circle(0, -0.5, 0.1, '#ff2a40');
        break;
      case 'token': // a gold arcade token
        circle(0, 0, 0.55, '#e0a420'); circle(0, 0, 0.42, '#ffd24a');
        c.fillStyle = '#b07810'; c.font = 'bold 0.5px monospace'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('S', 0, 0.03);
        break;
      case 'yoyo':
        circle(0, 0, 0.5, '#3a8aff'); circle(0, 0, 0.18, '#ffffff');
        c.strokeStyle = '#ffffff'; c.lineWidth = 0.05; c.beginPath(); c.moveTo(0, 0); c.lineTo(0.2, -0.75); c.stroke();
        break;
      case 'robot': // a wind-up toy
        rr(-0.35, -0.3, 0.7, 0.7, 0.08, '#9aa4b0'); rr(-0.25, -0.62, 0.5, 0.34, 0.06, '#c4ccd6');
        circle(-0.1, -0.45, 0.06, '#ff3040'); circle(0.1, -0.45, 0.06, '#ff3040');
        c.strokeStyle = '#6a7480'; c.lineWidth = 0.08; c.beginPath(); c.moveTo(0.35, 0.05); c.lineTo(0.6, 0.05); c.moveTo(0.6, -0.1); c.lineTo(0.6, 0.2); c.stroke();
        break;
      case 'crown':
        c.fillStyle = '#ffcf33'; c.beginPath(); c.moveTo(-0.6, 0.4); c.lineTo(-0.6, -0.3); c.lineTo(-0.3, 0.05); c.lineTo(0, -0.45); c.lineTo(0.3, 0.05); c.lineTo(0.6, -0.3); c.lineTo(0.6, 0.4); c.closePath(); c.fill();
        circle(0, 0.15, 0.09, '#3a8aff'); circle(-0.35, 0.18, 0.07, '#ff3040'); circle(0.35, 0.18, 0.07, '#2fe0b8');
        break;
      default: // trophy
        c.fillStyle = '#e8c040'; c.beginPath(); c.moveTo(-0.4, -0.55); c.lineTo(0.4, -0.55); c.quadraticCurveTo(0.4, 0.1, 0, 0.15); c.quadraticCurveTo(-0.4, 0.1, -0.4, -0.55); c.fill();
        rr(-0.08, 0.1, 0.16, 0.3, 0.02, '#c8a030'); rr(-0.32, 0.4, 0.64, 0.16, 0.04, '#8a5a20');
    }
    c.restore();
  }

  // Stars are little four-point sparks; lanterns glow and sway
  function drawDots() {
    const blinkOn = state !== 'playing' || Math.floor(frame / 10) % 2 === 0;
    const ds = Math.max(2, T * 0.14);
    ctx.fillStyle = COLOR.dot;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const v = dots[r * COLS + c];
        const x = px(c), y = py(r);
        if (v === 1) { ctx.fillRect(x - ds / 2, y - ds * 1.4, ds, ds * 2.8); ctx.fillRect(x - ds * 1.4, y - ds / 2, ds * 2.8, ds); }
        else if (v === 2) {
          const sw = Math.sin(frame / 12 + c) * T * 0.05;
          ctx.fillStyle = '#3a2410'; ctx.fillRect(x - T * 0.05 + sw, y - T * 0.62, T * 0.1, T * 0.14);
          ctx.fillStyle = blinkOn ? '#ffd27a' : '#c8903a';
          ctx.beginPath(); ctx.moveTo(x - T * 0.28 + sw, y - T * 0.45); ctx.lineTo(x + T * 0.28 + sw, y - T * 0.45); ctx.lineTo(x + T * 0.34 + sw, y + T * 0.36); ctx.lineTo(x - T * 0.34 + sw, y + T * 0.36); ctx.closePath(); ctx.fill();
          ctx.fillStyle = blinkOn ? '#fff6d0' : '#ffe0a0'; ctx.fillRect(x - T * 0.12 + sw, y - T * 0.28, T * 0.24, T * 0.46);
          ctx.fillStyle = COLOR.dot;
        }
      }
    }
  }

  // Caught: the Muncher shivers, shrinks and pops like a soap bubble
  function drawDeath() {
    const x = px(pac.x), y = py(pac.y), t = stateTime;
    if (t < 60) pacShape(x + Math.sin(t) * T * 0.06, y, T * 0.75, pac.dir, 0.1);
    else if (t < 150) {
      const k = 1 - (t - 60) / 90;
      ctx.save(); ctx.globalAlpha = 0.4 + 0.6 * k; ctx.translate(x, y); ctx.rotate((1 - k) * 6); pacShape(0, 0, T * 0.75 * Math.max(0.05, k), pac.dir, 0.86 * (1 - k)); ctx.restore();
    } else if (t < 176) {
      const p = (t - 150) / 26;
      ctx.fillStyle = COLOR.pac;
      for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2, rr = T * (0.3 + 0.6 * p); ctx.globalAlpha = 1 - p; ctx.beginPath(); ctx.arc(x + Math.cos(a) * rr, y + Math.sin(a) * rr, T * 0.08, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1;
    }
  }

  function drawActors() {
    if (state === 'attract' || state === 'gameover') return;
    const s = state === 'paused' ? pausedFrom.state : state;
    const hideGhosts = (s === 'dying' || s === 'levelDone') && stateTime >= 60;

    if (s === 'dying') drawDeath();
    else if (s !== 'ghostEaten') {
      const still = s === 'ready' || s === 'levelDone';
      pacShape(px(pac.x), py(pac.y), T * 0.75, pac.dir, still ? 0 : pacMouth());
    }
    if (!hideGhosts) {
      for (let i = ghosts.length - 1; i >= 0; i--) {
        const g = ghosts[i];
        if (eatenFlash && eatenFlash.ghost === g) continue;
        drawGhost(g);
      }
    }
    if (eatenFlash) text(eatenFlash.text, px(eatenFlash.x), py(eatenFlash.y), COLOR.cyan, 0.55, 'center');
  }

  function drawHud() {
    text('SCORE', T, 0.8 * T, COLOR.text);
    text(score ? String(score) : '00', T, 2 * T, COLOR.white);
    text('HIGH SCORE', 14 * T, 0.8 * T, COLOR.text, 1, 'center');
    if (hi) text(String(hi), 14 * T, 2 * T, COLOR.white, 1, 'center');
    text('LEVEL', 27 * T, 0.8 * T, COLOR.text, 1, 'right');
    text(String(level), 27 * T, 2 * T, COLOR.white, 1, 'right');
  }

  function drawBottomHud() {
    if (state === 'attract') return;
    const y = 35 * T;
    for (let i = 0; i < Math.min(lives, 5); i++) pacShape((2.5 + i * 2) * T, y, T * 0.7, LEFT, 0.6);
    let x = 25;
    for (let l = level; l >= Math.max(1, level - 6); l--) { drawFruit(fruitFor(l).kind, x * T, y, T * 0.9); x -= 2; }
  }

  function strokeRoundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.stroke();
  }

  function drawAttract() {
    const x0 = 3 * T, y0 = 11 * T, w = 22 * T, h = 14 * T;
    ctx.fillStyle = '#000000';
    ctx.fillRect(x0, y0, w, h);
    ctx.strokeStyle = COLOR.maze;
    ctx.lineWidth = Math.max(1, T * 0.13);
    strokeRoundRect(x0 + T * 0.3, y0 + T * 0.3, w - T * 0.6, h - T * 0.6, T * 0.45);
    strokeRoundRect(x0 + T * 0.7, y0 + T * 0.7, w - T * 1.4, h - T * 1.4, T * 0.25);

    text('HUNGRY', 14 * T, 13.3 * T, COLOR.pac, 1.6, 'center');
    text('HOUSE', 14 * T, 15.0 * T, COLOR.pac, 1.6, 'center');
    text(`${TOTAL_DOTS} STARS · 4 HAUNTS`, 14 * T, 16.5 * T, COLOR.dot, 0.5, 'center');
    text('© 1981 BRIGHTLINE AMUSEMENTS', 14 * T, 24.4 * T, COLOR.text, 0.4, 'center');

    const y = 18.6 * T;
    pacShape(19.6 * T, y, T * 0.75, RIGHT, 0.08 + Math.abs(Math.sin(frame * 0.15)) * 0.7);
    for (let i = 0; i < 4; i++) {
      const g = GHOSTS[3 - i], gx = (8 + i * 2.4) * T;
      ghostBody(gx, y, g.color);
      ghostEyes(gx, y, RIGHT);
    }
    text('PRESS START', 14 * T, 21.4 * T, COLOR.text, 0.7, 'center');
    if (reducedMotion.matches || Math.floor(frame / 30) % 2 === 0) {
      text(coarse.matches ? 'TAP THE SCREEN' : 'PRESS ENTER', 14 * T, 23 * T, COLOR.pac, 0.7, 'center');
    }
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!mazeBlue) return;

    drawHud();
    const flashing = state === 'levelDone' && stateTime >= 60;
    const white = flashing && Math.floor((stateTime - 60) / 15) % 2 === 1;
    ctx.drawImage(white ? mazeWhite : mazeBlue, 0, TOP * T);
    if (!flashing) {
      ctx.fillStyle = COLOR.door;
      ctx.fillRect(12.7 * T, (TOP + 12.4) * T, 2.6 * T, T * 0.2);
    }
    drawDots();
    if (fruit) drawFruit(fruit.kind, px(13.5), py(17), T);
    drawActors();
    for (const p of popups) text(p.text, px(p.x), py(p.y), p.color, 0.55, 'center');

    const shown = state === 'paused' ? pausedFrom.state : state;
    if (shown === 'ready') text('READY!', 14 * T, 20.5 * T, COLOR.pac, 1, 'center');
    if (state === 'gameover') text('GAME OVER', 14 * T, 20.5 * T, COLOR.red, 1, 'center');
    if (state === 'attract') drawAttract();
    if (state === 'paused') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, TOP * T, COLS * T, ROWS * T);
      text('PAUSED', 14 * T, 17.5 * T, COLOR.pac, 1, 'center');
      text(coarse.matches ? 'TAP TO CONTINUE' : 'P TO CONTINUE', 14 * T, 19.5 * T, COLOR.text, 0.6, 'center');
    }
    drawBottomHud();
  }

  function resize() {
    canvas.width = COLS * 24; canvas.height = TOTAL_ROWS * 24;
    T = 24;
    mazeBlue = renderMaze(COLOR.maze, COLOR.mazeGlow);
    mazeWhite = renderMaze(COLOR.mazeFlash, COLOR.mazeFlashGlow);
  }


  // ---------- Girdi ----------
  const PAUSABLE = ['ready', 'playing', 'ghostEaten', 'dying', 'levelDone'];

  function togglePause() {
    if (state === 'paused') {
      state = pausedFrom.state; stateTime = pausedFrom.time; stateDur = pausedFrom.dur;
      pausedFrom = null;
    } else if (PAUSABLE.includes(state)) {
      pausedFrom = { state, time: stateTime, dur: stateDur };
      state = 'paused';
    }
    syncUi();
  }

  function toggleMute() {
    Sound.init();
    Sound.setMuted(!Sound.muted);
    store.set(MUTE_KEY, Sound.muted ? '1' : '0');
    syncUi();
  }

  function steer(d) {
    if (state === 'attract' || (state === 'gameover' && stateTime > 60)) startGame();
    if (state === 'paused' || !pac) return;
    pac.next = d;
  }

  function primaryAction() {
    if (state === 'attract' || (state === 'gameover' && stateTime > 60)) startGame();
    else if (state === 'paused') togglePause();
  }

  function syncUi() { if (opts.onState) opts.onState(state, score); }



  const KEYS = { ArrowUp: UP, KeyW: UP, ArrowLeft: LEFT, KeyA: LEFT, ArrowDown: DOWN, KeyS: DOWN, ArrowRight: RIGHT, KeyD: RIGHT };
  let running = false, last = 0, acc = 0, raf = 0;
  function loop(now) {
    if (!running) return;
    acc += Math.min(now - last, 200);
    last = now;
    let n = 0;
    while (acc >= STEP_MS && n < 12) { update(); acc -= STEP_MS; n++; }
    draw();
    raf = requestAnimationFrame(loop);
  }
  hi = parseInt(store.get(HI_KEY), 10) || 0;
  Sound.muted = PB.Settings ? PB.Settings.data.sfx < 0.05 : false;
  resetDots(); resetActors(); setState('attract');
  resize();
  if (document.fonts && document.fonts.load) document.fonts.load('16px "Press Start 2P"', 'HUNGRY HOUSE SCORE').catch(() => {});
  return {
    start() { if (running) return; running = true; Sound.init(); last = performance.now(); raf = requestAnimationFrame(loop); },
    stop() { running = false; cancelAnimationFrame(raf); Sound.setLoop(null); saveHi(); if (PAUSABLE.includes(state)) togglePause(); },
    key(code) {
      Sound.init();
      const d = KEYS[code];
      if (d !== undefined) { steer(d); return true; }
      if (code === 'Enter' || code === 'Space' || code === 'NumpadEnter' || code === 'KeyE') { primaryAction(); return true; }
      if (code === 'KeyP') { togglePause(); return true; }
      return false;
    },
    steer(d) { steer(d); },
    tap() { primaryAction(); },
    get score() { return score; },
    get hi() { return hi; },
    get state() { return state; },
  };
  };
})(typeof window !== 'undefined' ? window : globalThis);
