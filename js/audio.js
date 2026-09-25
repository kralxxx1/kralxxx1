/* Ses motoru: tamamen WebAudio ile anlık üretim. Veri yolları, yankı, 3D konumlandırma,
   engel arkasında boğuklaşma, ortam katmanları, dinamik müzik ve ses altyazıları. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const U = PB.U;

  // rt: decay time (s), er: early reflection window (s), taps: reflection count, damp: initial tail brightness (Hz), wet
  const REVERBS = {
    arcade: { rt: 1.5, er: 0.05, taps: 14, damp: 5000, wet: 0.2 },
    yellow: { rt: 1.9, er: 0.06, taps: 18, damp: 4200, wet: 0.28 },
    dark: { rt: 2.8, er: 0.08, taps: 16, damp: 3000, wet: 0.34 },
    concrete: { rt: 4.2, er: 0.12, taps: 26, damp: 5500, wet: 0.42 },
    pool: { rt: 4.6, er: 0.09, taps: 30, damp: 9000, wet: 0.5 },
    office: { rt: 0.9, er: 0.03, taps: 10, damp: 3500, wet: 0.16 },
    maze: { rt: 3.2, er: 0.1, taps: 20, damp: 6000, wet: 0.38 },
    glitch: { rt: 5, er: 0.15, taps: 24, damp: 8000, wet: 0.48 },
    menu: { rt: 3.2, er: 0.08, taps: 16, damp: 4000, wet: 0.45 },
    tunnel: { rt: 3.8, er: 0.07, taps: 26, damp: 4200, wet: 0.46 },
    school: { rt: 1.7, er: 0.05, taps: 18, damp: 5200, wet: 0.27 },
    mall: { rt: 3.6, er: 0.13, taps: 24, damp: 6500, wet: 0.42 },
    motel: { rt: 0.8, er: 0.025, taps: 10, damp: 3800, wet: 0.15 },
    hospital: { rt: 1.5, er: 0.04, taps: 16, damp: 4800, wet: 0.25 },
    street: { rt: 0.7, er: 0.02, taps: 8, damp: 7000, wet: 0.1 },
    workshop: { rt: 1.1, er: 0.03, taps: 12, damp: 3400, wet: 0.2 },
  };
  // Per-chapter flavour of the exploration score: pad chords, piano scale, extras
  const MUSIC = {
    default: { chords: [[110, 130.8, 164.8, 220], [98, 116.5, 146.8, 196], [87.3, 110, 130.8, 174.6], [82.4, 98, 123.5, 164.8]], scale: [220, 246.9, 261.6, 293.7, 329.6, 392, 440, 523.3, 587.3, 659.3], piano: 0.55 },
    // Mill: heavy low fifths, iron-coloured
    warehouse: { chords: [[65.4, 98, 130.8], [61.7, 92.5, 123.5], [58.3, 87.3, 116.5], [61.7, 92.5, 123.5]], scale: [130.8, 155.6, 196, 233.1, 261.6], piano: 0.3, lp: [200, 480] },
    // Pools: warm, wet, dreamy ninths
    pools: { chords: [[130.8, 196, 246.9, 293.7], [110, 164.8, 196, 246.9], [146.8, 220, 261.6, 329.6], [123.5, 185, 220, 277.2]], scale: [587.3, 659.3, 784, 880, 987.8, 1174.7], piano: 0.5, wave: 'sine', lp: [500, 1300], pad: 0.05 },
    // Office: a tritone that never resolves
    office: { chords: [[98, 138.6, 196], [92.5, 130.8, 185], [98, 138.6, 196], [103.8, 146.8, 207.7]], scale: [392, 415.3, 554.4, 587.3, 784], piano: 0.35 },
    // The dark: almost nothing, very low
    dark: { chords: [[55, 82.4, 110], [51.9, 77.8, 103.8], [49, 73.4, 98], [51.9, 77.8, 103.8]], scale: [220, 233.1, 329.6, 349.2], piano: 0.22, lp: [180, 420] },
    // Tunnels: a low, rubbing semitone drone; piano notes fall like drops
    pipes: { chords: [[73.4, 110, 146.8], [69.3, 110, 138.6], [73.4, 103.8, 146.8], [65.4, 98, 130.8]], scale: [587.3, 659.3, 698.5, 880, 1046.5, 1174.7], piano: 0.35, wave: 'triangle', lp: [220, 520] },
    // School: an out-of-tune music box over soft major sevenths
    school: { chords: [[130.8, 164.8, 196, 246.9], [110, 130.8, 164.8, 196], [87.3, 110, 130.8, 164.8], [98, 123.5, 146.8, 174.6]], scale: [523.3, 587.3, 659.3, 784, 880, 1046.5], piano: 0.2, box: 0.6, detune: 28, pad: 0.026 },
    // Mall: slowed, wobbling department-store muzak, too happy
    mall: { chords: [[130.8, 164.8, 196], [174.6, 220, 261.6], [196, 246.9, 293.7], [130.8, 164.8, 196]], melody: [659.3, 587.3, 523.3, 587.3, 659.3, 659.3, 659.3, 0, 587.3, 587.3, 587.3, 0, 659.3, 784, 784, 0], mstep: 0.62, wobble: 35, wave: 'triangle', lp: [500, 1400], pad: 0.03, piano: 0 },
    // Motel: slow lounge sevenths, a vibraphone somewhere through the wall
    motel: { chords: [[110, 138.6, 164.8, 207.7], [123.5, 146.8, 185, 220], [146.8, 174.6, 220, 261.6], [98, 123.5, 146.8, 185]], scale: [440, 554.4, 659.3, 830.6, 987.8], piano: 0.45, vibes: true, wave: 'sine', lp: [600, 1200], pad: 0.05 },
    // Hospital: open fifths, sparse high notes like a monitor
    hospital: { chords: [[110, 164.8, 220], [103.8, 155.6, 207.7], [98, 146.8, 196], [103.8, 155.6, 207.7]], scale: [880, 987.8, 1046.5, 1318.5, 1760], piano: 0.3, lp: [260, 560] },
    // Maple Street: a sad major key, a real melody on the piano
    maple: { chords: [[87.3, 130.8, 174.6, 220], [73.4, 110, 146.8, 174.6], [116.5, 146.8, 174.6, 233.1], [98, 130.8, 164.8, 196]], melody: [440, 0, 392, 349.2, 0, 0, 440, 523.3, 0, 466.2, 440, 0, 392, 0, 0, 0], mstep: 0.9, inst: 'piano', pad: 0.03 },
    // Workshop: a low cluster and a slow heartbeat thump
    workshop: { chords: [[55, 58.3, 82.4], [51.9, 55, 77.8], [55, 61.7, 82.4], [49, 51.9, 73.4]], scale: [220, 233.1, 277.2, 293.7], piano: 0.15, lp: [160, 420], pulse: true },
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
      this.sfx = new PB.Sfx(c);
      this.sfx.warm(['step_carpet', 'step_wetCarpet', 'rainInside', 'rainGlass', 'gutter', 'fluorescent', 'hvac', 'paper', 'doorWoodOpen', 'breathIn', 'breathOut', 'heartbeat', 'squelch', 'radioStatic',
        'thunder', 'carPass', 'stingSpot', 'stingJump', 'chew', 'keys', 'clink', 'plasticTap', 'flashClick', 'doorMetalOpen', 'doorLocked', 'poolRoom', 'warehouse', 'darkRoom']);
      this.duck = c.createGain(); this.duck.gain.value = 1;
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
      const c = this.ctx, sr = c.sampleRate, len = Math.floor(sr * p.rt * 1.1);
      const ir = c.createBuffer(2, len, sr);
      const rnd = U.rng(U.hashStr(name));
      for (let ch = 0; ch < 2; ch++) {
        const data = ir.getChannelData(ch);
        // Early reflections: discrete taps thinning out
        for (let k = 0; k < p.taps; k++) {
          const t = 0.003 + Math.pow(rnd(), 1.4) * p.er, i = Math.floor(t * sr);
          data[i] += (rnd() * 2 - 1) * (1 - t / (p.er * 1.2)) * 0.7;
        }
        // Diffuse tail: noise through a one-pole lowpass that darkens over time (air and wall absorption)
        let lp = 0;
        const i0 = Math.floor(p.er * 0.5 * sr);
        for (let i = i0; i < len; i++) {
          const t = i / sr, fc = 300 + p.damp * Math.exp(-t * 2.5 / p.rt);
          const a = Math.exp(-2 * Math.PI * fc / sr);
          lp = lp * a + (rnd() * 2 - 1) * (1 - a);
          data[i] += lp * Math.exp(-t * 6.9 / p.rt) * Math.min(1, (i - i0) / (0.03 * sr)) * 1.4;
        }
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
      // Air absorption: distant sounds lose their highs
      if (pos && this.listenerPos && o.air !== false) {
        const d = Math.hypot(pos.x - this.listenerPos.x, pos.z - this.listenerPos.z);
        if (d > 4) { const air = c.createBiquadFilter(); air.type = 'lowpass'; air.frequency.value = U.clamp(20000 / (1 + (d - 4) / 9), 1200, 20000); node.connect(air); node = air; }
      }
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

    // Play a synthesized sample (random variant) through the positional chain
    play(name, variants, bus, pos, o = {}) {
      if (!this.ctx || !this.sfx) return null;
      const buf = this.sfx.get(name, variants || 1);
      if (!buf) return null;
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      src.playbackRate.value = (o.rate || 1) * (1 + (Math.random() - 0.5) * (o.jitter != null ? o.jitter : 0.08));
      const chain = this.out(bus || 'sfx', pos, o);
      if (o.lowpass) { const f = this.filt('lowpass', o.lowpass, 0.7); src.connect(f).connect(chain.input); } else src.connect(chain.input);
      src.start(this.t + (o.delay || 0));
      return src;
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
      const surf = ['carpet', 'wetCarpet', 'concrete', 'tile', 'lino', 'wood', 'metal', 'water', 'puddle'].includes(surface) ? surface : 'carpet';
      this.play('step_' + surf, 8, 'sfx', pos, { rev: 0.22, gain: 0.55 * loud, jitter: 0.1 });
      if (loud > 0.8 && Math.random() < 0.3) this.play('cloth', 4, 'sfx', null, { rev: 0, gain: 0.12 });
    }
    breath(k) {
      if (!this.ctx) return;
      this.breathIn = !this.breathIn;
      const heavy = k > 0.6;
      this.play((this.breathIn ? 'breathIn' : 'breathOut') + (heavy ? 'Heavy' : ''), 4, 'sfx', null, { rev: 0.04, gain: 0.3 + 0.35 * k, jitter: 0.06 });
    }
    heartbeat(k) {
      if (!this.ctx) return;
      this.play('heartbeat', 2, 'sfx', null, { rev: 0, gain: 0.9 * k, jitter: 0.03 });
    }
    pickup(kind = 'item') {
      if (!this.ctx) return;
      const t = this.t;
      if (kind === 'pellet') { const o = this.out('ui', null, { rev: 0.45 }); this.tone(o.input, 'square', 180, 720, t, 0.18, 0.12); this.tone(o.input, 'sine', 90, 360, t, 0.5, 0.4); return; }
      this.play(kind === 'key' ? 'keys' : Math.random() < 0.5 ? 'plasticTap' : 'clink', 4, 'sfx', null, { rev: 0.1, gain: 0.7 });
      // A soft confirmation under the foley
      const o = this.out('ui', null, { rev: 0.35, gain: 0.35 });
      if (kind === 'key') [659, 988].forEach((f, k) => this.tone(o.input, 'sine', f, f, t + 0.12 + k * 0.09, 0.4, 0.07));
      else this.tone(o.input, 'sine', 880, 880, t + 0.1, 0.3, 0.05);
    }
    paper() {
      if (!this.ctx) return;
      this.play('paper', 6, 'ui', null, { rev: 0.08, gain: 0.8 });
    }
    flashClick() { if (this.ctx) this.play('flashClick', 3, 'sfx', null, { rev: 0.05, gain: 0.5 }); }
    // Walkie-talkie line: squelch, a voice made of formants, static under it; music and ambience duck
    radioVoice(dur, who) {
      if (!this.ctx || !this.sfx) return;
      const t = this.t;
      this.play('squelch', 3, 'sfx', null, { rev: 0, gain: 0.5 });
      const pitch = { eddie: 118, walt: 96, radio: 110, penny: 205, ivy: 190 }[who] || 115;
      const buf = this.sfx.voice(Math.min(9, dur), { pitch, radio: true, seed: (this.voiceSeed = (this.voiceSeed || 0) + 1) });
      const src = this.ctx.createBufferSource(); src.buffer = buf;
      const o = this.out('sfx', null, { rev: 0.05, gain: 0.32 });
      src.connect(o.input); src.start(t + 0.12);
      const st = this.play('radioStatic', 2, 'sfx', null, { rev: 0, gain: 0.07 });
      if (st) { st.loop = true; st.stop(t + dur + 0.2); }
      this.play('squelch', 3, 'sfx', null, { rev: 0, gain: 0.4, delay: Math.min(9, dur) + 0.15 });
      this.duckFor(dur + 0.3);
    }
    // A voice in the room with you, not on the radio: memory echoes of the kids, Walt, the Neighbor.
    // Breathy, far away, drifting from one side; children get higher pitch and smaller formants.
    echoVoice(dur, who) {
      if (!this.ctx || !this.sfx) return;
      const pitch = { clyde: 262, billy: 180, penny: 236, ivy: 244, lily: 300, walt: 98, voice: 140 }[who] || 220;
      const kid = pitch > 170;
      const buf = this.sfx.voice(Math.min(9, dur), { pitch, echo: true, breathy: true, fscale: kid ? 1.2 : 1, seed: (this.voiceSeed = (this.voiceSeed || 0) + 1) });
      const src = this.ctx.createBufferSource(); src.buffer = buf;
      const pan = this.ctx.createStereoPanner(), side = Math.random() < 0.5 ? -1 : 1;
      pan.pan.setValueAtTime(side * 0.7, this.t); pan.pan.linearRampToValueAtTime(-side * 0.3, this.t + dur);
      const o = this.out('sfx', null, { rev: 0.9, gain: 0.26 });
      src.connect(pan).connect(o.input); src.start(this.t + 0.1);
      this.duckFor(dur + 0.3);
    }
    // Old tape recorder voice (lo-fi, wow and flutter)
    tapeVoice(dur) {
      if (!this.ctx || !this.sfx) return;
      const buf = this.sfx.voice(Math.min(12, dur), { pitch: 98, tape: true, seed: 77 });
      const src = this.ctx.createBufferSource(); src.buffer = buf;
      const lfo = this.osc('sine', 0.7), lg = this.ctx.createGain(); lg.gain.value = 0.006; lfo.connect(lg).connect(src.playbackRate); lfo.start(); lfo.stop(this.t + dur + 1);
      const o = this.out('sfx', null, { rev: 0.1, gain: 0.35 });
      src.connect(o.input); src.start(this.t + 0.3);
      this.play('tapeClunk', 2, 'sfx', null, { rev: 0.1, gain: 0.6 });
    }
    duckFor(sec) {
      if (!this.ctx) return;
      const t = this.t;
      for (const b of [this.bus.music, this.bus.amb]) { b.gain.cancelScheduledValues(t); }
      const s = PB.Settings.data;
      this.bus.music.gain.setTargetAtTime(s.music * 0.55 * 0.45, t, 0.15); this.bus.music.gain.setTargetAtTime(s.music * 0.55, t + sec, 0.6);
      this.bus.amb.gain.setTargetAtTime(s.ambience * 0.7 * 0.6, t, 0.15); this.bus.amb.gain.setTargetAtTime(s.ambience * 0.7, t + sec, 0.6);
    }
    carPass(pos, dir, speed) {
      if (!this.ctx) return;
      const buf = this.sfx.get('carPass', 2);
      const src = this.ctx.createBufferSource(); src.buffer = buf;
      src.playbackRate.value = U.clamp(speed / 11, 0.85, 1.2);
      const chain = this.out('amb', null, { rev: 0.15, gain: 0.55 });
      const lp = this.filt('lowpass', 2600, 0.7);
      if (dir < 0) {
        // Cars from the other side: swap the stereo image
        const sp = this.ctx.createChannelSplitter(2), mg = this.ctx.createChannelMerger(2);
        src.connect(sp); sp.connect(mg, 0, 1); sp.connect(mg, 1, 0); mg.connect(lp);
      } else src.connect(lp);
      lp.connect(chain.input);
      src.start(this.t);
      this.caption('car', PB.t('cap.car'), pos, 20);
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
      const t = this.t, o0 = { rev: 0.4, gain: 0.8 };
      if (kind === 'elevator') {
        const o = this.out('sfx', pos, { rev: 0.4 });
        this.tone(o.input, 'sine', 1318, 1318, t, 1.2, 0.25); this.tone(o.input, 'sine', 1046, 1046, t + 0.25, 1.4, 0.2);
        this.play('doorMetalOpen', 2, 'sfx', pos, Object.assign({ delay: 0.5 }, o0));
      } else if (kind === 'metal' || kind === 'security' || kind === 'stair' || kind === 'exit') {
        this.play(open ? 'doorMetalOpen' : 'doorMetalClose', 3, 'sfx', pos, o0);
      } else if (kind === 'locked') {
        this.play('doorLocked', 3, 'sfx', pos, o0);
      } else if (kind === 'glass') {
        this.play('doorGlass', 2, 'sfx', pos, o0);
      } else if (kind === 'house') {
        const o = this.out('sfx', pos, { rev: 0.4 });
        this.tone(o.input, 'sine', 220, 880, t, 1.4, 0.3); this.tone(o.input, 'triangle', 330, 1320, t + 0.1, 1.2, 0.15);
      } else {
        this.play(open ? 'doorWoodOpen' : 'doorWoodClose', 4, 'sfx', pos, o0);
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
      // Heard from indoors: muffled, stereo, felt more than heard
      this.play('thunder', 3, 'amb', null, { rev: 0.25, gain: 1.3, lowpass: 1400, jitter: 0.1 });
      this.caption('thunder', PB.t('cap.thunder'), pos, 15);
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
      if (big > 0.6 && Math.random() < 0.35) this.play('chew', 4, 'ent', pos, { rev: 0.5, occl: true, occluded, ref: 3, gain: 0.8 * big });
      if (!occluded && big > 0.5) this.caption('waka', PB.t('cap.waka'), pos, 6);
      else this.caption('wakaFar', PB.t('cap.wakaFar'), pos, 10);
    }
    stinger(kind = 'spot') {
      if (!this.ctx) return;
      if (kind === 'jump') this.play('stingJump', 2, 'sfx', null, { rev: 0.5, gain: 1.2, jitter: 0.04 });
      else this.play('stingSpot', 3, 'music', null, { rev: 0.6, gain: 1.0, jitter: 0.03 });
    }
    // Looping sample (room tones, rain) with the same key/gain API as synthesized loops
    bufLoop(key, name, pos, o = {}) {
      if (!this.ctx || !this.sfx) return null;
      if (this.loops.has(key)) return this.loops.get(key);
      const buf = this.sfx.get(name, 1);
      if (!buf) return null;
      const outp = this.out(o.bus || 'amb', pos, { rev: o.rev != null ? o.rev : 0.2, occl: !!pos, ref: o.ref, roll: o.roll, max: o.max, gain: 0, air: o.air });
      const src = this.ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      src.playbackRate.value = o.rate || 1;
      if (o.lowpass) { const f = this.filt('lowpass', o.lowpass, 0.7); src.connect(f).connect(outp.input); } else src.connect(outp.input);
      src.start(this.t, Math.random() * buf.duration);
      const L = { key, type: name, out: outp, gain: outp.input, nodes: [src], target: 0 };
      this.loops.set(key, L);
      this.setLoop(key, o.gain != null ? o.gain : 0.5);
      return L;
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
      const L = (k, name, gain, o = {}) => this.bufLoop('amb:' + k, name, o.pos || null, Object.assign({ bus: 'amb', gain, rev: 0.1 }, o));
      if (theme === 'yellow') { L('hum', 'fluorescent', 0.16); L('air', 'hvac', 0.22); }
      if (theme === 'office') { L('hum', 'fluorescent', 0.08); L('air', 'hvac', 0.3); }
      if (theme === 'pool') { L('water', 'poolRoom', 0.35, { rev: 0.5 }); L('hum', 'fluorescent', 0.06); }
      if (theme === 'concrete') { L('room', 'warehouse', 0.4, { rev: 0.4 }); }
      if (theme === 'dark') { L('room', 'darkRoom', 0.45); }
      if (theme === 'arcade') { L('rain', 'rainInside', 0.2, { rev: 0, lowpass: 3200 }); }
      if (theme === 'maze' || theme === 'glitch' || theme === 'dark') this.loop('amb:wind', 'wind', null, { bus: 'amb', gain: 0.05, rev: 0.3 });
      if (theme === 'maze' || theme === 'glitch') L('room', 'darkRoom', 0.25);
      if (theme === 'tunnel') { L('water', 'tunnel', 0.5, { rev: 0.35 }); L('air', 'hvac', 0.06); }
      if (theme === 'school') { L('room', 'schoolHall', 0.32); L('hum', 'fluorescent', 0.06); }
      if (theme === 'mall') { L('room', 'mallAtrium', 0.36, { rev: 0.4 }); L('hum', 'fluorescent', 0.04); }
      if (theme === 'motel') { L('room', 'motelHall', 0.34); L('rain', 'rainInside', 0.12, { lowpass: 1800 }); }
      if (theme === 'hospital') { L('room', 'hospitalHall', 0.3); L('hum', 'fluorescent', 0.05); L('rain', 'rainInside', 0.1, { lowpass: 1500 }); }
      if (theme === 'street') { L('rain', 'rainOutside', 0.55, { rev: 0 }); this.loop('amb:wind', 'wind', null, { bus: 'amb', gain: 0.05, rev: 0.1 }); }
      if (theme === 'workshop') { L('room', 'workshop', 0.42); L('rain', 'rainInside', 0.05, { lowpass: 900 }); }
      this.nextAmb = this.t + 4;
    }
    // Positional rain on the storefront glass and the gutter outside (arcade)
    streetSounds(glassPos, gutterPos) {
      if (!this.ctx) return;
      this.bufLoop('amb:glass', 'rainGlass', glassPos, { bus: 'amb', gain: 0.5, rev: 0.05, ref: 3, roll: 1.1 });
      this.bufLoop('amb:gutter', 'gutter', gutterPos, { bus: 'amb', gain: 0.35, rev: 0.05, ref: 2, roll: 1.2, lowpass: 2500 });
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
      else if (th === 'tunnel') {
        if (Math.random() < 0.6) { for (let k = 0; k < 2; k++) this.tone(o.input, 'sine', 900 + Math.random() * 700, 1900, t + k * 0.9, 0.05, 0.3); this.caption('drip', PB.t('cap.drip'), pos, 30); }
        else { const f = 180 + Math.random() * 120; this.tone(o.input, 'triangle', f, f * 0.98, t, 1.6, 0.18, 0.002); this.tone(o.input, 'sine', f * 2.76, f * 2.7, t, 1.1, 0.08, 0.002); this.burst(o.input, 'bandpass', 700, 6, t, 0.08, 0.3); this.caption('thud', PB.t('cap.pipe'), pos, 35); }
      }
      else if (th === 'school') {
        if (Math.random() < 0.5) { this.burst(o.input, 'lowpass', 500, 1, t, 0.25, 0.5, 0.002); this.tone(o.input, 'square', 190, 170, t, 0.35, 0.05, 0.002); this.caption('door', PB.t('cap.locker'), pos, 35); }
        else { this.tone(o.input, 'sine', 988, 988, t, 0.25, 0.04, 0.01); this.tone(o.input, 'sine', 784, 784, t + 0.35, 0.4, 0.04, 0.01); }
      }
      else if (th === 'mall') { if (Math.random() < 0.5) { this.burst(o.input, 'bandpass', 900, 3, t, 0.4, 0.12, 0.05); this.caption('plastic', PB.t('cap.plastic'), pos, 30); } else { this.tone(o.input, 'sine', 1318, 1318, t, 0.9, 0.035, 0.01); this.tone(o.input, 'sine', 1046, 1046, t + 0.5, 1.2, 0.035, 0.01); } }
      else if (th === 'motel') { for (let k = 0; k < 3; k++) { this.burst(o.input, 'lowpass', 380, 1.5, t + k * 0.32, 0.09, 0.8, 0.001); this.tone(o.input, 'sine', 110, 80, t + k * 0.32, 0.08, 0.2, 0.001); } this.caption('knock', PB.t('cap.knock'), pos, 40); }
      else if (th === 'hospital') { for (let k = 0; k < (Math.random() < 0.5 ? 2 : 3); k++) this.tone(o.input, 'sine', 960, 960, t + k * 0.8, 0.12, 0.08, 0.004); this.caption('beep', PB.t('cap.beep'), pos, 30); }
      else if (th === 'street') { if (Math.random() < 0.35) { this.burst(o.input, 'lowpass', 110, 0.8, t, 3.5, 0.8, 0.4, this.brown); this.caption('thunder', PB.t('cap.thunder'), pos, 200); } }
      else if (th === 'workshop') { this.burst(o.input, 'highpass', 3500, 1, t, 0.04, 0.3); this.burst(o.input, 'highpass', 3500, 1, t + 0.06, 0.03, 0.25); this.burst(o.input, 'highpass', 4000, 1, t + 0.15, 0.05, 0.2); this.caption('buzz', PB.t('cap.arc'), pos, 30); }
    }

    // ---------------------------------------------------------- müzik
    // Render this chapter's piano notes ahead of time, one every few frames, so no music tick stalls
    warmMusic() {
      if (!this.sfx) return;
      const F = MUSIC[this.music.flavor] || MUSIC.default, sc = F.scale || [];
      const fs = sc.concat(sc.map(f => f * 1.5), sc.map(f => f * 1.2), F.inst === 'piano' ? F.melody || [] : []).filter(Boolean);
      const q = [...new Set(fs.map(f => Math.round(f)))];
      const next = () => { const f = q.shift(); if (f == null) return; this.sfx.note(f); setTimeout(next, 45); };
      setTimeout(next, 600);
    }
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
        // Slow evolving pad under sparse, detuned felt-piano notes; the chapter picks the flavour
        const F = MUSIC[m.flavor] || MUSIC.default;
        if (s % 4 === 0) {
          const chords = F.chords;
          const ch = chords[(s / 4 | 0) % chords.length];
          const o = this.out('music', null, { rev: 0.95, gain: 0.3 });
          const [lo, hi] = F.lp || [300, 720];
          const lp = this.filt('lowpass', lo, 0.9); lp.connect(o.input);
          lp.frequency.setValueAtTime(lo, m.next); lp.frequency.linearRampToValueAtTime(hi + Math.random() * 300, m.next + 5); lp.frequency.linearRampToValueAtTime(lo, m.next + 10);
          const pk = F.pad || 0.035;
          for (const f of ch) for (const det of [-7, 6]) {
            const osc = this.osc(F.wave || 'sawtooth', f), g = this.ctx.createGain();
            osc.detune.value = det + (Math.random() - 0.5) * 4;
            if (F.wobble) { const lfo = this.osc('sine', 0.23), lg = this.ctx.createGain(); lg.gain.value = F.wobble; lfo.connect(lg).connect(osc.detune); lfo.start(m.next); lfo.stop(m.next + 10.7); }
            osc.connect(g).connect(lp);
            g.gain.setValueAtTime(0.0001, m.next); g.gain.linearRampToValueAtTime(pk, m.next + 3.5); g.gain.setValueAtTime(pk, m.next + 7); g.gain.linearRampToValueAtTime(0.0001, m.next + 10.5);
            osc.start(m.next); osc.stop(m.next + 10.7);
          }
          // A melody that plays through once per chord cycle
          if (F.melody && (s / 4 | 0) % 2 === 0) {
            const mo = this.out('music', null, { rev: 1, gain: F.inst === 'piano' ? 0.2 : 0.12 });
            F.melody.forEach((f, k) => {
              if (!f) return;
              const at = m.next + 0.5 + k * (F.mstep || 0.6);
              if (F.inst === 'piano' && this.sfx) { const src = this.ctx.createBufferSource(); src.buffer = this.sfx.note(f); src.detune.value = (Math.random() - 0.5) * 10; src.connect(mo.input); src.start(at); }
              else { const osc = this.tone(mo.input, 'triangle', f, f, at, (F.mstep || 0.6) * 1.4, 0.05, 0.02); if (F.wobble) osc.detune.setValueAtTime(Math.sin(at * 1.3) * F.wobble, at); }
            });
          }
          const sub = this.osc('sine', ch[0] / 2), sg = this.ctx.createGain(); sub.connect(sg).connect(o.input);
          sg.gain.setValueAtTime(0.0001, m.next); sg.gain.linearRampToValueAtTime(0.08, m.next + 4); sg.gain.linearRampToValueAtTime(0.0001, m.next + 10.5);
          sub.start(m.next); sub.stop(m.next + 10.7);
        }
        // Music box: bright partials that die fast, slightly out of tune
        if (F.box && Math.random() < F.box) {
          const o = this.out('music', null, { rev: 1, gain: 0.1 });
          const f = F.scale[Math.floor(Math.random() * F.scale.length)] * 2, at = m.next + Math.random() * 0.6;
          const a = this.tone(o.input, 'sine', f, f, at, 1.6, 0.06, 0.002); a.detune.value = (Math.random() - 0.5) * (F.detune || 0);
          const b = this.tone(o.input, 'sine', f * 3.01, f * 3.01, at, 0.35, 0.02, 0.002); b.detune.value = a.detune.value;
        }
        if (F.vibes && Math.random() < 0.35) {
          const o = this.out('music', null, { rev: 0.9, gain: 0.12 });
          const f = F.scale[Math.floor(Math.random() * F.scale.length)], at = m.next + Math.random() * 1.2;
          const v = this.tone(o.input, 'sine', f, f, at, 2.2, 0.05, 0.004);
          const lfo = this.osc('sine', 5.5), lg = this.ctx.createGain(); lg.gain.value = 6; lfo.connect(lg).connect(v.detune); lfo.start(at); lfo.stop(at + 2.3);
        }
        if (F.pulse && s % 2 === 0) {
          const o = this.out('music', null, { rev: 0.4, gain: 0.35 });
          this.tone(o.input, 'sine', 52, 38, m.next, 0.22, 0.25, 0.004); this.tone(o.input, 'sine', 48, 36, m.next + 0.28, 0.2, 0.16, 0.004);
        }
        if (this.sfx && Math.random() < (F.piano != null ? F.piano : 0.55) && F.scale) {
          const scale = F.scale;
          const play = (f, d) => { const src = this.ctx.createBufferSource(); src.buffer = this.sfx.note(f); src.detune.value = (Math.random() - 0.5) * 18; const o = this.out('music', null, { rev: 1, gain: 0.16 + Math.random() * 0.08 }); src.connect(o.input); src.start(m.next + d); };
          const f = scale[Math.floor(Math.random() * scale.length)];
          play(f, Math.random() * 0.8);
          if (Math.random() < 0.3) play(f * (Math.random() < 0.5 ? 1.5 : 1.2), 0.35 + Math.random() * 0.5);
        }
        m.next += 2.6;
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
