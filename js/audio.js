/* Ses motoru: tamamen WebAudio ile anlık üretim. Veri yolları, yankı, 3D konumlandırma,
   engel arkasında boğuklaşma, ortam katmanları, dinamik müzik ve ses altyazıları. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U;

  const REVERBS = {
    arcade: { dur: 1.6, decay: 2.6, wet: 0.22 },
    yellow: { dur: 2.2, decay: 2.2, wet: 0.3 },
    dark: { dur: 3.2, decay: 2.0, wet: 0.38 },
    concrete: { dur: 4.2, decay: 1.8, wet: 0.45 },
    pool: { dur: 4.8, decay: 1.6, wet: 0.55 },
    office: { dur: 1.2, decay: 3.0, wet: 0.18 },
    maze: { dur: 3.5, decay: 1.9, wet: 0.4 },
    glitch: { dur: 5, decay: 1.4, wet: 0.5 },
    menu: { dur: 3.5, decay: 2, wet: 0.5 },
  };

  class Audio {
    constructor() {
      this.ctx = null;
      this.ready = false;
      this.events = new U.Emitter();
      this.loops = new Map();
      this.music = { mode: 'none', intensity: 0, next: 0, step: 0 };
      this.lastCaption = {};
    }
    init() {
      if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {}); return; }
      const AC = root.AudioContext || root.webkitAudioContext;
      if (!AC) return;
      try { this.ctx = new AC({ latencyHint: 'interactive' }); } catch (e) { return; }
      const c = this.ctx;
      this.master = c.createGain();
      this.comp = c.createDynamicsCompressor();
      this.comp.threshold.value = -14; this.comp.ratio.value = 4; this.comp.attack.value = 0.005; this.comp.release.value = 0.2;
      this.master.connect(this.comp).connect(c.destination);
      this.bus = {};
      for (const name of ['music', 'sfx', 'amb', 'ent', 'ui']) { const g = c.createGain(); g.connect(this.master); this.bus[name] = g; }
      this.reverb = c.createConvolver();
      this.reverbOut = c.createGain();
      this.reverb.connect(this.reverbOut).connect(this.master);
      this.reverbSend = c.createGain();
      this.reverbSend.connect(this.reverb);
      // Gürültü tamponları
      const len = c.sampleRate * 2;
      this.noise = c.createBuffer(1, len, c.sampleRate);
      const d = this.noise.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.brown = c.createBuffer(1, len, c.sampleRate);
      const b = this.brown.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; b[i] = last * 3.5; }
      this.distCurve = new Float32Array(1024);
      for (let i = 0; i < 1024; i++) { const x = i / 512 - 1; this.distCurve[i] = Math.tanh(x * 4); }
      this.setReverb('menu');
      this.applyVolumes();
      PB.Settings.events.on('change', () => this.applyVolumes());
      this.ready = true;
      this.sched = setInterval(() => this.tickMusic(), 40);
    }
    applyVolumes() {
      if (!this.ctx) return;
      const s = PB.Settings.data, t = this.ctx.currentTime;
      this.master.gain.setTargetAtTime(s.master * 0.9, t, 0.05);
      this.bus.music.gain.setTargetAtTime(s.music * 0.55, t, 0.05);
      this.bus.sfx.gain.setTargetAtTime(s.sfx, t, 0.05);
      this.bus.amb.gain.setTargetAtTime(s.ambience * 0.7, t, 0.05);
      this.bus.ent.gain.setTargetAtTime(s.entities, t, 0.05);
      this.bus.ui.gain.setTargetAtTime(Math.max(s.sfx, 0.3) * 0.8, t, 0.05);
    }
    setReverb(name) {
      if (!this.ctx) return;
      const p = REVERBS[name] || REVERBS.yellow;
      const c = this.ctx, len = Math.floor(c.sampleRate * p.dur);
      const ir = c.createBuffer(2, len, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = ir.getChannelData(ch);
        for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, p.decay) * (i < 30 ? i / 30 : 1);
      }
      this.reverb.buffer = ir;
      this.reverbOut.gain.value = p.wet;
      this.reverbSend.gain.value = 1;
    }
    get t() { return this.ctx ? this.ctx.currentTime : 0; }

    // ---------------------------------------------------------- dinleyici ve konum
    listen(cam) {
      if (!this.ctx) return;
      const l = this.ctx.listener, t = this.ctx.currentTime;
      const p = cam.position, f = cam.getWorldDirection(this._f || (this._f = new root.THREE.Vector3()));
      if (l.positionX) {
        l.positionX.setTargetAtTime(p.x, t, 0.02); l.positionY.setTargetAtTime(p.y, t, 0.02); l.positionZ.setTargetAtTime(p.z, t, 0.02);
        l.forwardX.setTargetAtTime(f.x, t, 0.02); l.forwardY.setTargetAtTime(f.y, t, 0.02); l.forwardZ.setTargetAtTime(f.z, t, 0.02);
        l.upX.value = 0; l.upY.value = 1; l.upZ.value = 0;
      } else {
        l.setPosition(p.x, p.y, p.z); l.setOrientation(f.x, f.y, f.z, 0, 1, 0);
      }
      this.listenerPos = { x: p.x, y: p.y, z: p.z };
    }
    panner(pos, o = {}) {
      const c = this.ctx;
      const p = c.createPanner();
      p.panningModel = PB.Settings.data.hrtf ? 'HRTF' : 'equalpower';
      p.distanceModel = 'inverse';
      p.refDistance = o.ref || 1.6;
      p.maxDistance = o.max || 80;
      p.rolloffFactor = o.roll || 1.3;
      if (p.positionX) { p.positionX.value = pos.x; p.positionY.value = pos.y; p.positionZ.value = pos.z; } else p.setPosition(pos.x, pos.y, pos.z);
      return p;
    }
    setPos(p, pos) {
      const t = this.ctx.currentTime;
      if (p.positionX) { p.positionX.setTargetAtTime(pos.x, t, 0.03); p.positionY.setTargetAtTime(pos.y, t, 0.03); p.positionZ.setTargetAtTime(pos.z, t, 0.03); }
      else p.setPosition(pos.x, pos.y, pos.z);
    }
    // Çıkış zinciri: [filtre] → [konum] → veri yolu (+ yankı gönderimi)
    out(bus, pos, o = {}) {
      const c = this.ctx;
      const g = c.createGain();
      g.gain.value = o.gain != null ? o.gain : 1;
      let node = g;
      let lp = null;
      if (o.occl) { lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = o.occluded ? 700 : 18000; node.connect(lp); node = lp; }
      let pan = null;
      if (pos) { pan = this.panner(pos, o); node.connect(pan); node = pan; }
      node.connect(this.bus[bus]);
      if (o.rev !== 0) { const s = c.createGain(); s.gain.value = o.rev != null ? o.rev : 0.35; node.connect(s).connect(this.reverbSend); }
      return { input: g, pan, lp };
    }
    caption(key, text, pos, minGap = 3) {
      if (!PB.Settings.data.captions) return;
      const now = performance.now() / 1000;
      if (this.lastCaption[key] && now - this.lastCaption[key] < minGap) return;
      this.lastCaption[key] = now;
      let dir = '';
      if (pos && this.listenerPos && this.camYaw != null) {
        const a = Math.atan2(pos.x - this.listenerPos.x, pos.z - this.listenerPos.z);
        const rel = U.angleWrap(a - (this.camYaw + Math.PI));
        dir = PB.t(Math.abs(rel) < 0.6 ? 'cap.front' : Math.abs(rel) > 2.5 ? 'cap.back' : rel > 0 ? 'cap.left' : 'cap.right');
      }
      this.events.emit('caption', text, dir);
    }

    // ---------------------------------------------------------- yapı taşları
    env(g, t, a, peak, d, sustain = 0) {
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + a);
      if (sustain) g.gain.setValueAtTime(peak, t + a + sustain);
      g.gain.exponentialRampToValueAtTime(0.0001, t + a + sustain + d);
    }
    noiseSrc(buf) {
      const s = this.ctx.createBufferSource();
      s.buffer = buf || this.noise;
      s.loop = true;
      s.loopStart = Math.random();
      return s;
    }
    osc(type, f) { const o = this.ctx.createOscillator(); o.type = type; o.frequency.value = f; return o; }
    filt(type, f, q = 1) { const b = this.ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; }
    tone(dest, type, f0, f1, t, dur, peak, a = 0.005) {
      const o = this.osc(type, f0), g = this.ctx.createGain();
      o.frequency.setValueAtTime(f0, t);
      if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
      o.connect(g).connect(dest);
      this.env(g, t, a, peak, dur);
      o.start(t); o.stop(t + a + dur + 0.05);
      return o;
    }
    burst(dest, filterType, f, q, t, dur, peak, a = 0.002, buf) {
      const s = this.noiseSrc(buf), fl = this.filt(filterType, f, q), g = this.ctx.createGain();
      s.connect(fl).connect(g).connect(dest);
      this.env(g, t, a, peak, dur);
      s.start(t, Math.random() * 1.5); s.stop(t + a + dur + 0.05);
      return fl;
    }

    // ---------------------------------------------------------- oyuncu sesleri
    footstep(surface, loud = 1, pos) {
      if (!this.ctx) return;
      const t = this.t, o = this.out('sfx', pos, { rev: 0.25, gain: loud });
      const v = 0.85 + Math.random() * 0.3;
      switch (surface) {
        case 'carpet':
          this.burst(o.input, 'lowpass', 520 * v, 0.7, t, 0.13, 0.5);
          this.tone(o.input, 'sine', 90 * v, 55, t, 0.09, 0.35);
          break;
        case 'concrete':
          this.burst(o.input, 'bandpass', 1900 * v, 1.3, t, 0.06, 0.55);
          this.tone(o.input, 'sine', 130 * v, 70, t, 0.07, 0.3);
          break;
        case 'tile':
          this.burst(o.input, 'highpass', 2600 * v, 0.8, t, 0.045, 0.45);
          this.burst(o.input, 'bandpass', 3300 * v, 9, t, 0.12, 0.2);
          break;
        case 'water': {
          const f = this.burst(o.input, 'lowpass', 2200, 1, t, 0.32, 0.55, 0.01);
          f.frequency.setValueAtTime(2400, t); f.frequency.exponentialRampToValueAtTime(380, t + 0.3);
          for (let k = 0; k < 3; k++) this.tone(o.input, 'sine', 500 + Math.random() * 500, 900 + Math.random() * 600, t + 0.05 + k * 0.05, 0.04, 0.05);
          break;
        }
        case 'metal':
          this.burst(o.input, 'bandpass', 2800 * v, 5, t, 0.1, 0.5);
          this.tone(o.input, 'triangle', 420 * v, 400, t, 0.2, 0.05);
          break;
        default:
          this.burst(o.input, 'lowpass', 900 * v, 0.7, t, 0.08, 0.45);
      }
    }
    breath(k) {
      if (!this.ctx) return;
      const t = this.t, o = this.out('sfx', null, { rev: 0.05, gain: 0.35 * k });
      const f = this.burst(o.input, 'bandpass', 900, 0.9, t, 0.55, 0.5, 0.25);
      f.frequency.setValueAtTime(700, t); f.frequency.linearRampToValueAtTime(1300, t + 0.4);
    }
    heartbeat(k) {
      if (!this.ctx) return;
      const t = this.t, o = this.out('sfx', null, { rev: 0, gain: 0.8 * k });
      this.tone(o.input, 'sine', 62, 38, t, 0.16, 0.9, 0.004);
      this.tone(o.input, 'sine', 58, 36, t + 0.2, 0.14, 0.6, 0.004);
    }
    pickup(kind = 'item') {
      if (!this.ctx) return;
      const t = this.t, o = this.out('ui', null, { rev: 0.45 });
      if (kind === 'key') [659, 784, 988, 1319].forEach((f, k) => this.tone(o.input, 'triangle', f, f, t + k * 0.07, 0.3, 0.2));
      else if (kind === 'pellet') { this.tone(o.input, 'square', 180, 720, t, 0.18, 0.12); this.tone(o.input, 'sine', 90, 360, t, 0.5, 0.4); }
      else { this.tone(o.input, 'sine', 880, 880, t, 0.25, 0.25); this.tone(o.input, 'sine', 1320, 1320, t + 0.08, 0.35, 0.18); }
    }
    paper() {
      if (!this.ctx) return;
      const t = this.t, o = this.out('ui', null, { rev: 0.1 });
      for (let k = 0; k < 6; k++) this.burst(o.input, 'bandpass', 2500 + Math.random() * 2500, 1.5, t + k * 0.035 + Math.random() * 0.02, 0.04, 0.25);
    }
    click() { if (!this.ctx) return; const o = this.out('ui', null, { rev: 0 }); this.burst(o.input, 'highpass', 3000, 1, this.t, 0.02, 0.4); }
    uiMove() { if (!this.ctx) return; const o = this.out('ui', null, { rev: 0 }); this.tone(o.input, 'square', 440, 440, this.t, 0.03, 0.06); }
    uiOk() { if (!this.ctx) return; const o = this.out('ui', null, { rev: 0.2 }); this.tone(o.input, 'square', 660, 660, this.t, 0.05, 0.07); this.tone(o.input, 'square', 990, 990, this.t + 0.06, 0.08, 0.07); }
    beep(ok) {
      if (!this.ctx) return;
      const t = this.t, o = this.out('sfx', null, { rev: 0.1 });
      if (ok === true) { this.tone(o.input, 'square', 880, 880, t, 0.07, 0.12); this.tone(o.input, 'square', 1320, 1320, t + 0.09, 0.12, 0.12); }
      else if (ok === false) this.tone(o.input, 'sawtooth', 180, 160, t, 0.35, 0.18);
      else this.tone(o.input, 'square', 1000, 1000, t, 0.05, 0.09);
    }
    door(kind, pos, open = true) {
      if (!this.ctx) return;
      const t = this.t, o = this.out('sfx', pos, { rev: 0.4 });
      if (kind === 'elevator') {
        this.tone(o.input, 'sine', 1318, 1318, t, 1.2, 0.25); this.tone(o.input, 'sine', 1046, 1046, t + 0.25, 1.4, 0.2);
        this.burst(o.input, 'lowpass', 400, 1, t + 0.5, 1.6, 0.3, 0.3, this.brown);
      } else if (kind === 'metal' || kind === 'security' || kind === 'stair' || kind === 'exit') {
        this.burst(o.input, 'bandpass', 700, 2, t, 0.35, 0.5);
        this.tone(o.input, 'sawtooth', 70, 60, t, 0.4, 0.15);
        if (!open) this.tone(o.input, 'sine', 90, 40, t + 0.3, 0.3, 0.6);
      } else if (kind === 'locked') {
        this.burst(o.input, 'bandpass', 1500, 3, t, 0.05, 0.5); this.burst(o.input, 'bandpass', 1300, 3, t + 0.1, 0.05, 0.4);
      } else if (kind === 'house') {
        this.tone(o.input, 'sine', 220, 880, t, 1.4, 0.3); this.tone(o.input, 'triangle', 330, 1320, t + 0.1, 1.2, 0.15);
      } else {
        const osc = this.osc('sawtooth', 110), bp = this.filt('bandpass', 600, 12), g = this.ctx.createGain();
        osc.connect(bp).connect(g).connect(o.input);
        bp.frequency.setValueAtTime(400, t); bp.frequency.linearRampToValueAtTime(1100, t + 0.6);
        osc.frequency.setValueAtTime(95, t); osc.frequency.linearRampToValueAtTime(130, t + 0.6);
        this.env(g, t, 0.05, 0.2, 0.6);
        osc.start(t); osc.stop(t + 0.8);
        this.burst(o.input, 'lowpass', 300, 1, t + 0.55, 0.2, 0.4);
      }
    }
    mech(kind, pos) {
      if (!this.ctx) return;
      const t = this.t, o = this.out('sfx', pos, { rev: 0.4 });
      if (kind === 'fuse') { this.burst(o.input, 'bandpass', 2400, 4, t, 0.05, 0.6); this.tone(o.input, 'square', 60, 60, t + 0.05, 0.3, 0.12); }
      else if (kind === 'valve') {
        const osc = this.osc('sine', 1300), g = this.ctx.createGain(), lfo = this.osc('sine', 7), lg = this.ctx.createGain();
        lg.gain.value = 180; lfo.connect(lg).connect(osc.frequency);
        osc.connect(g).connect(o.input); this.env(g, t, 0.1, 0.12, 1.4, 0.8);
        osc.frequency.setValueAtTime(1100, t); osc.frequency.linearRampToValueAtTime(1700, t + 2);
        osc.start(t); lfo.start(t); osc.stop(t + 2.5); lfo.stop(t + 2.5);
        this.burst(o.input, 'lowpass', 500, 1, t, 2.2, 0.25, 0.3, this.brown);
      } else if (kind === 'generator') {
        this.tone(o.input, 'sawtooth', 28, 48, t, 2.5, 0.4, 0.3);
        for (let k = 0; k < 18; k++) this.burst(o.input, 'lowpass', 300, 1, t + 0.4 + k * 0.08, 0.06, 0.35);
      } else if (kind === 'breaker') {
        this.burst(o.input, 'bandpass', 1200, 2, t, 0.08, 0.9);
        this.tone(o.input, 'sine', 55, 30, t, 0.5, 0.7);
        this.tone(o.input, 'sawtooth', 120, 120, t + 0.1, 1.2, 0.05, 0.4);
      } else if (kind === 'coin') {
        [0, 0.09, 0.15, 0.2].forEach((d, k) => this.tone(o.input, 'triangle', 2600 - k * 200, 2400 - k * 200, t + d, 0.12, 0.2));
        this.tone(o.input, 'sine', 180, 60, t + 0.4, 0.6, 0.5);
      } else if (kind === 'drain') {
        this.burst(o.input, 'lowpass', 600, 1, t, 6, 0.5, 1, this.brown);
        for (let k = 0; k < 25; k++) this.tone(o.input, 'sine', 200 + Math.random() * 300, 100 + Math.random() * 200, t + Math.random() * 5, 0.2, 0.08);
      } else if (kind === 'card') { this.burst(o.input, 'highpass', 4000, 1, t, 0.12, 0.3); this.beep(true); }
    }
    thunder(pos) {
      if (!this.ctx) return;
      const t = this.t, o = this.out('amb', pos, { rev: 0.5, gain: 1.6, ref: 8 });
      this.burst(o.input, 'lowpass', 180, 0.7, t + 0.3 + Math.random() * 0.8, 3.5, 0.9, 0.15, this.brown);
      this.burst(o.input, 'lowpass', 900, 0.7, t + 0.2, 0.4, 0.4, 0.01);
    }
    glitchBurst(pos) {
      if (!this.ctx) return;
      const t = this.t, o = this.out('amb', pos, { rev: 0.3, gain: 0.3 });
      for (let k = 0; k < 8; k++) this.tone(o.input, 'square', 100 + Math.random() * 2000, 100 + Math.random() * 2000, t + k * 0.03, 0.03, 0.15);
    }

    // ---------------------------------------------------------- yaratık sesleri
    waka(pos, occluded, big = 1) {
      if (!this.ctx) return;
      const t = this.t, o = this.out('ent', pos, { rev: 0.5, occl: true, occluded, ref: 3, roll: 1.1, gain: 1.4 * big });
      const ws = this.ctx.createWaveShaper(); ws.curve = this.distCurve;
      const lp = this.filt('lowpass', 1400, 0.8);
      ws.connect(lp).connect(o.input);
      this.wakaFlip = !this.wakaFlip;
      if (this.wakaFlip) this.tone(ws, 'triangle', 300, 150, t, 0.11, 0.7);
      else this.tone(ws, 'triangle', 150, 300, t, 0.11, 0.7);
      this.tone(o.input, 'sine', 60, 45, t, 0.14, 0.5);
      if (!occluded && big > 0.5) this.caption('waka', PB.t('cap.waka'), pos, 6);
      else this.caption('wakaFar', PB.t('cap.wakaFar'), pos, 10);
    }
    stinger(kind = 'spot') {
      if (!this.ctx) return;
      const t = this.t, o = this.out('sfx', null, { rev: 0.5, gain: kind === 'jump' ? 1.4 : 0.7 });
      if (kind === 'jump') {
        const ws = this.ctx.createWaveShaper(); ws.curve = this.distCurve; ws.connect(o.input);
        this.burst(ws, 'bandpass', 1800, 0.5, t, 0.9, 0.9, 0.005);
        this.tone(ws, 'sawtooth', 1400, 180, t, 0.8, 0.6);
        this.tone(o.input, 'sine', 55, 28, t, 1.4, 1, 0.005);
      } else {
        [110, 116.5, 155.6, 233.1, 246.9].forEach((f, k) => this.tone(o.input, 'sawtooth', f, f * 0.98, t, 2.2, 0.08, 0.02 + k * 0.01));
        this.burst(o.input, 'highpass', 3000, 0.5, t, 0.8, 0.2, 0.01);
      }
    }
    // Sürekli döngü sesi: key ile tekil. params: {type:'rumble'|'wail'|'whisper'|'phone'|'hum'|'tinnitus'|'shuffle'|'engine'|'giggle'|'water'|'rain'}
    loop(key, type, pos, o = {}) {
      if (!this.ctx) return null;
      if (this.loops.has(key)) return this.loops.get(key);
      const c = this.ctx, t = c.currentTime;
      const bus = o.bus || 'ent';
      const outp = this.out(bus, pos, { rev: o.rev != null ? o.rev : 0.45, occl: !!pos, ref: o.ref, roll: o.roll, max: o.max, gain: 0 });
      const nodes = [];
      const g = outp.input;
      const start = n => { n.start(t); nodes.push(n); return n; };
      switch (type) {
        case 'rumble': {
          const a = start(this.osc('sawtooth', 38)), b = start(this.osc('sawtooth', 57.3)), lp = this.filt('lowpass', 220, 1);
          a.connect(lp); b.connect(lp); lp.connect(g);
          break;
        }
        case 'wail': {
          const base = o.pitch || 330;
          const a = start(this.osc('sine', base)), b = start(this.osc('sine', base * 1.012)), lfo = start(this.osc('sine', 0.35)), lg = c.createGain();
          lg.gain.value = base * 0.25; lfo.connect(lg); lg.connect(a.frequency); lg.connect(b.frequency);
          const vib = start(this.osc('sine', 5.5)), vg = c.createGain(); vg.gain.value = 6; vib.connect(vg); vg.connect(a.frequency);
          const bp = this.filt('bandpass', base * 2, 2); a.connect(bp); b.connect(bp); bp.connect(g);
          const n = start(this.noiseSrc()), nb = this.filt('bandpass', base * 3, 6), ng = c.createGain(); ng.gain.value = 0.3; n.connect(nb).connect(ng).connect(g);
          break;
        }
        case 'whisper': {
          const n = start(this.noiseSrc());
          for (const f of [700, 1200, 2600]) {
            const bp = this.filt('bandpass', f, 9), gg = c.createGain(), lfo = start(this.osc('sine', 1 + Math.random() * 4)), lg = c.createGain();
            lg.gain.value = f * 0.3; lfo.connect(lg).connect(bp.frequency);
            gg.gain.value = 0.6; n.connect(bp).connect(gg).connect(g);
          }
          break;
        }
        case 'phone': {
          const a = start(this.osc('sine', 440)), b = start(this.osc('sine', 480)), am = c.createGain(), mod = start(this.osc('square', 20)), mg = c.createGain();
          mg.gain.value = 0.5; am.gain.value = 0.5; mod.connect(mg).connect(am.gain);
          const gate = c.createGain(); gate.gain.value = 0;
          a.connect(am); b.connect(am); am.connect(gate).connect(g);
          for (let k = 0; k < 60; k++) { gate.gain.setValueAtTime(0.35, t + k * 6); gate.gain.setValueAtTime(0, t + k * 6 + 2); }
          break;
        }
        case 'hum': {
          const a = start(this.osc('sawtooth', 120)), bp = this.filt('bandpass', 240, 3), h2 = start(this.osc('sine', 60)), hg = c.createGain();
          hg.gain.value = 0.4; h2.connect(hg).connect(g);
          const n = start(this.noiseSrc()), nb = this.filt('bandpass', 7200, 4), ng = c.createGain(); ng.gain.value = 0.05; n.connect(nb).connect(ng).connect(g);
          a.connect(bp).connect(g);
          break;
        }
        case 'tinnitus': { const a = start(this.osc('sine', 6800)), gg = c.createGain(); gg.gain.value = 0.12; a.connect(gg).connect(g); break; }
        case 'shuffle': {
          const n = start(this.noiseSrc()), bp = this.filt('bandpass', 800, 1.2), am = c.createGain(), lfo = start(this.osc('sine', 3.2)), lg = c.createGain();
          lg.gain.value = 0.5; am.gain.value = 0.5; lfo.connect(lg).connect(am.gain);
          n.connect(bp).connect(am).connect(g);
          break;
        }
        case 'engine': {
          const a = start(this.osc('sawtooth', 46)), lp = this.filt('lowpass', 300, 1), am = c.createGain(), lfo = start(this.osc('square', 12)), lg = c.createGain();
          lg.gain.value = 0.3; am.gain.value = 0.7; lfo.connect(lg).connect(am.gain);
          a.connect(lp).connect(am).connect(g);
          break;
        }
        case 'giggle': {
          const a = start(this.osc('square', 1100)), am = c.createGain(), lfo = start(this.osc('square', 13)), lg = c.createGain(), bp = this.filt('bandpass', 1400, 3);
          lg.gain.value = 0.5; am.gain.value = 0.5; lfo.connect(lg).connect(am.gain);
          const vib = start(this.osc('sine', 0.7)), vg = c.createGain(); vg.gain.value = 300; vib.connect(vg).connect(a.frequency);
          a.connect(bp).connect(am).connect(g);
          break;
        }
        case 'water': { const n = start(this.noiseSrc(this.brown)), lp = this.filt('lowpass', 500, 0.7), am = c.createGain(), lfo = start(this.osc('sine', 0.25)), lg = c.createGain(); lg.gain.value = 0.4; am.gain.value = 0.6; lfo.connect(lg).connect(am.gain); n.connect(lp).connect(am).connect(g); break; }
        case 'rain': { const n = start(this.noiseSrc()), hp = this.filt('highpass', 900, 0.5), lp = this.filt('lowpass', 7000, 0.5); n.connect(hp).connect(lp).connect(g); const n2 = start(this.noiseSrc(this.brown)), lp2 = this.filt('lowpass', 300, 0.5), g2 = c.createGain(); g2.gain.value = 0.6; n2.connect(lp2).connect(g2).connect(g); break; }
        case 'wind': { const n = start(this.noiseSrc(this.brown)), bp = this.filt('bandpass', 400, 0.8), lfo = start(this.osc('sine', 0.08)), lg = c.createGain(); lg.gain.value = 250; lfo.connect(lg).connect(bp.frequency); n.connect(bp).connect(g); break; }
        case 'elevator': { const a = start(this.osc('sawtooth', 55)), lp = this.filt('lowpass', 180, 1); a.connect(lp).connect(g); const n = start(this.noiseSrc(this.brown)), l2 = this.filt('lowpass', 250, 1); n.connect(l2).connect(g); break; }
        case 'tape': { const n = start(this.noiseSrc()), hp = this.filt('highpass', 5000, 0.5), gg = c.createGain(); gg.gain.value = 0.25; n.connect(hp).connect(gg).connect(g); const m = start(this.osc('sine', 110)), mg = c.createGain(); mg.gain.value = 0.05; m.connect(mg).connect(g); break; }
        default: break;
      }
      const L = { key, type, out: outp, gain: g, nodes, target: 0 };
      this.loops.set(key, L);
      this.setLoop(key, o.gain != null ? o.gain : 0.5);
      return L;
    }
    setLoop(key, gain, pos, occluded) {
      const L = this.loops.get(key);
      if (!L || !this.ctx) return;
      const t = this.ctx.currentTime;
      if (Math.abs(gain - L.target) > 0.005) { L.gain.gain.setTargetAtTime(gain, t, 0.12); L.target = gain; }
      if (pos && L.out.pan) this.setPos(L.out.pan, pos);
      if (L.out.lp && occluded != null && occluded !== L.occ) { L.out.lp.frequency.setTargetAtTime(occluded ? 650 : 18000, t, 0.1); L.occ = occluded; }
    }
    stopLoop(key, fade = 0.3) {
      const L = this.loops.get(key);
      if (!L || !this.ctx) return;
      const t = this.ctx.currentTime;
      L.gain.gain.setTargetAtTime(0, t, fade / 3);
      for (const n of L.nodes) { try { n.stop(t + fade + 0.1); } catch (e) { /* zaten durdu */ } }
      this.loops.delete(key);
    }
    stopAllLoops() { for (const k of [...this.loops.keys()]) this.stopLoop(k, 0.2); }

    // ---------------------------------------------------------- ortam
    ambience(theme) {
      if (!this.ctx) return;
      for (const k of [...this.loops.keys()]) if (k.startsWith('amb:')) this.stopLoop(k, 1);
      this.setReverb(theme);
      this.ambTheme = theme;
      if (['yellow', 'office', 'pool', 'dark', 'concrete'].includes(theme)) this.loop('amb:hum', 'hum', null, { bus: 'amb', gain: theme === 'dark' ? 0.02 : theme === 'concrete' ? 0.04 : 0.09, rev: 0.1 });
      if (theme === 'arcade') { this.loop('amb:rain', 'rain', null, { bus: 'amb', gain: 0.14, rev: 0 }); }
      if (theme === 'pool') this.loop('amb:water', 'water', null, { bus: 'amb', gain: 0.1, rev: 0.6 });
      if (theme === 'maze' || theme === 'glitch' || theme === 'dark') this.loop('amb:wind', 'wind', null, { bus: 'amb', gain: 0.08, rev: 0.3 });
      this.nextAmb = this.t + 4;
    }
    ambienceTick(cam) {
      if (!this.ctx || !this.ambTheme || this.t < this.nextAmb) return;
      this.nextAmb = this.t + 5 + Math.random() * 9;
      const th = this.ambTheme;
      const a = Math.random() * Math.PI * 2, d = 12 + Math.random() * 25;
      const pos = { x: cam.position.x + Math.cos(a) * d, y: 2, z: cam.position.z + Math.sin(a) * d };
      const t = this.t, o = this.out('amb', pos, { rev: 0.7, ref: 4 });
      if (th === 'concrete' || th === 'pool') { for (let k = 0; k < 3; k++) this.tone(o.input, 'sine', 1800 + Math.random() * 1500, 1200, t + k * 0.7, 0.06, 0.25); this.caption('drip', PB.t('cap.drip'), pos, 30); }
      else if (th === 'yellow' || th === 'dark') { if (Math.random() < 0.5) { this.burst(o.input, 'lowpass', 200, 1, t, 0.5, 0.5, 0.02, this.brown); this.caption('thud', PB.t('cap.thud'), pos, 25); } else { this.burst(o.input, 'bandpass', 3000, 8, t, 0.05, 0.3); this.burst(o.input, 'bandpass', 3000, 8, t + 0.07, 0.05, 0.2); this.caption('buzz', PB.t('cap.buzz'), pos, 40); } }
      else if (th === 'office') { this.tone(o.input, 'square', 1300, 1300, t, 0.08, 0.06); this.tone(o.input, 'square', 1300, 1300, t + 0.15, 0.08, 0.06); }
      else if (th === 'glitch') this.glitchBurst(pos);
      else if (th === 'maze') { this.tone(o.input, 'triangle', 300, 150, t, 0.1, 0.12); this.tone(o.input, 'triangle', 150, 300, t + 0.12, 0.1, 0.12); }
    }

    // ---------------------------------------------------------- müzik
    setMusic(mode, intensity = 0) {
      if (this.music.mode !== mode) { this.music.mode = mode; this.music.step = 0; this.music.next = this.t + 0.1; }
      this.music.intensity = intensity;
    }
    tickMusic() {
      if (!this.ctx) return;
      const m = this.music, t = this.t;
      if (m.mode === 'none' || t + 0.2 < m.next) return;
      const s = m.step++;
      if (m.mode === 'menu') {
        // Özgün, yavaşlatılmış ve bozulmuş bir arcade melodisi
        const mel = [523, 0, 659, 784, 0, 659, 587, 0, 523, 0, 494, 523, 587, 0, 0, 0, 440, 0, 523, 659, 0, 587, 523, 0, 494, 0, 440, 392, 440, 0, 0, 0];
        const bass = [131, 131, 165, 165, 147, 147, 123, 123];
        const step = 0.36;
        const f = mel[s % mel.length];
        const o = this.out('music', null, { rev: 0.8, gain: 0.5 });
        if (f) { const osc = this.tone(o.input, 'square', f * 0.5, f * 0.5 * 0.995, m.next, step * 1.6, 0.06, 0.02); osc.detune.setValueAtTime(-20 + Math.sin(t) * 30, m.next); }
        if (s % 4 === 0) this.tone(o.input, 'triangle', bass[(s / 4 | 0) % bass.length] * 0.5, bass[(s / 4 | 0) % bass.length] * 0.5, m.next, step * 3.8, 0.18, 0.05);
        if (s % 16 === 0) this.burst(o.input, 'lowpass', 300, 1, m.next, 3, 0.05, 1, this.brown);
        m.next += step;
      } else if (m.mode === 'explore') {
        const chords = [[110, 130.8, 164.8], [98, 116.5, 146.8], [87.3, 110, 130.8], [92.5, 110, 138.6]];
        const ch = chords[(s / 1 | 0) % chords.length];
        const o = this.out('music', null, { rev: 0.9, gain: 0.35 });
        for (const f of ch) {
          const osc = this.osc('sawtooth', f), lp = this.filt('lowpass', 500 + Math.random() * 200, 0.7), g = this.ctx.createGain();
          osc.detune.value = (Math.random() - 0.5) * 16;
          osc.connect(lp).connect(g).connect(o.input);
          g.gain.setValueAtTime(0.0001, m.next); g.gain.linearRampToValueAtTime(0.05, m.next + 3); g.gain.linearRampToValueAtTime(0.0001, m.next + 9);
          osc.start(m.next); osc.stop(m.next + 9.2);
        }
        m.next += 8;
      } else if (m.mode === 'chase') {
        const k = 0.5 + m.intensity * 0.5;
        const step = 0.16;
        const o = this.out('music', null, { rev: 0.25, gain: 0.8 * k });
        const pat = [55, 0, 55, 55, 0, 55, 65.4, 0, 55, 0, 55, 55, 0, 51.9, 0, 49];
        const f = pat[s % pat.length];
        if (f) { const lp = this.filt('lowpass', 700 + m.intensity * 900, 4); lp.connect(o.input); this.tone(lp, 'sawtooth', f, f, m.next, 0.14, 0.5); }
        if (s % 4 === 0) this.burst(o.input, 'lowpass', 120, 1, m.next, 0.2, 0.7, 0.002);
        if (s % 8 === 4) this.burst(o.input, 'highpass', 5000, 1, m.next, 0.05, 0.12);
        if (s % 16 === 0) { const hi = [880, 932, 988][(s / 16 | 0) % 3]; this.tone(o.input, 'sawtooth', hi, hi * 0.99, m.next, 2.4, 0.03 * k, 0.4); }
        m.next += step;
      } else if (m.mode === 'ending') {
        const mel = [392, 440, 523, 587, 523, 440, 392, 330, 349, 392, 440, 392];
        const o = this.out('music', null, { rev: 0.9, gain: 0.5 });
        this.tone(o.input, 'triangle', mel[s % mel.length], mel[s % mel.length], m.next, 1.2, 0.12, 0.05);
        if (s % 3 === 0) this.tone(o.input, 'sine', mel[s % mel.length] / 2, mel[s % mel.length] / 2, m.next, 2.6, 0.12, 0.2);
        m.next += 0.8;
      } else m.next = t + 1;
    }
  }
  PB.Audio = Audio;
})(typeof window !== 'undefined' ? window : globalThis);
