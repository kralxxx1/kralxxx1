/* Settings: schema (the settings screen is drawn from it), presets and persistence.
   Labels, options and help texts are i18n keys. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const U = PB.U;

  const pct = v => Math.round(v * 100) + '%';
  const RES = ['3840x2160', '3440x1440', '2560x1440', '2560x1080', '1920x1200', '1920x1080', '1680x1050', '1600x900', '1440x900', '1366x768', '1280x720', '1024x576', '960x540', '640x360'];
  const SCHEMA = [
    // ---------------- SCREEN ----------------
    { key: 'displayMode', tab: 'screen', type: 'select', def: 'windowed', transient: true,
      options: [['windowed', 'opt.windowed'], ['fullscreen', 'opt.fullscreen']] },
    { key: 'resolution', tab: 'screen', type: 'select', def: 'native',
      options: [['native', 'opt.native']].concat(RES.map(r => [r, r.replace('x', ' × ')])) },
    { key: 'scaleMode', tab: 'screen', type: 'select', def: 'fit',
      options: [['fit', 'opt.fit'], ['stretch', 'opt.stretch'], ['fill', 'opt.fill']] },
    { key: 'upscale', tab: 'screen', type: 'select', def: 'smooth',
      options: [['smooth', 'opt.smooth'], ['pixel', 'opt.pixel']] },
    { key: 'sharpen', tab: 'screen', type: 'range', def: 0.2, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'fpsLimit', tab: 'screen', type: 'select', def: 0,
      options: [[0, 'opt.unlimited'], [30, '30'], [45, '45'], [60, '60'], [75, '75'], [90, '90'], [100, '100'], [120, '120'], [144, '144'], [165, '165'], [200, '200'], [240, '240'], [300, '300'], [360, '360']] },
    { key: 'vsync', tab: 'screen', type: 'toggle', def: true },
    { key: 'showFps', tab: 'screen', type: 'toggle', def: false },

    // ---------------- GRAPHICS ----------------
    { key: 'preset', tab: 'graphics', type: 'select', def: 'high',
      options: ['low', 'medium', 'high', 'ultra', 'extreme', 'custom'].map(v => [v, 'preset.' + v]) },
    { key: 'renderScale', tab: 'graphics', type: 'range', def: 1, min: 0.5, max: 2, step: 0.05, fmt: pct },
    { key: 'textureRes', tab: 'graphics', type: 'select', def: 1024, reload: true,
      options: [[512, '512 px'], [1024, '1024 px'], [2048, '2048 px']] },
    { key: 'shadows', tab: 'graphics', type: 'select', def: 2,
      options: [[0, 'opt.off'], [1, 'opt.shadow1'], [2, 'opt.shadow2'], [3, 'opt.shadow3']] },
    { key: 'antialias', tab: 'graphics', type: 'select', def: 'msaa',
      options: [['none', 'opt.off'], ['fxaa', 'FXAA'], ['msaa', 'MSAA 4x'], ['both', 'MSAA 4x + FXAA']] },
    { key: 'lightmapRes', tab: 'graphics', type: 'select', def: 6, reload: true,
      options: [[3, 'opt.low'], [4, 'opt.medium'], [6, 'opt.high'], [8, 'opt.ultra'], [12, 'opt.extreme']] },
    { key: 'ao', tab: 'graphics', type: 'select', def: 'high',
      options: [['off', 'opt.off'], ['low', 'opt.low'], ['high', 'opt.high'], ['ultra', 'opt.ultra']] },
    { key: 'ssr', tab: 'graphics', type: 'select', def: 'high',
      options: [['off', 'opt.off'], ['low', 'opt.low'], ['high', 'opt.high'], ['ultra', 'opt.ultra']] },
    { key: 'dynLights', tab: 'graphics', type: 'range', def: 6, min: 2, max: 12, step: 1, fmt: v => String(v) },
    { key: 'bloom', tab: 'graphics', type: 'toggle', def: true },
    { key: 'bloomStrength', tab: 'graphics', type: 'range', def: 1, min: 0, max: 2, step: 0.05, fmt: pct },
    { key: 'volumetric', tab: 'graphics', type: 'select', def: 'high',
      options: [['off', 'opt.off'], ['low', 'opt.low'], ['high', 'opt.high'], ['ultra', 'opt.ultra'], ['extreme', 'opt.extreme']] },
    { key: 'motionBlur', tab: 'graphics', type: 'range', def: 0.3, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'lensDirt', tab: 'graphics', type: 'toggle', def: true },
    { key: 'particles', tab: 'graphics', type: 'range', def: 0.8, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'viewDist', tab: 'graphics', type: 'range', def: 90, min: 30, max: 160, step: 5, fmt: v => v + ' m' },
    { key: 'anisotropy', tab: 'graphics', type: 'select', def: 8, reload: true,
      options: [[1, 'opt.off'], [2, '2x'], [4, '4x'], [8, '8x'], [16, '16x']] },

    // ---------------- DISPLAY ----------------
    { key: 'brightness', tab: 'display', type: 'range', def: 1, min: 0.5, max: 1.8, step: 0.05, fmt: pct },
    { key: 'contrast', tab: 'display', type: 'range', def: 1, min: 0.8, max: 1.3, step: 0.01, fmt: pct },
    { key: 'saturation', tab: 'display', type: 'range', def: 1, min: 0.3, max: 1.5, step: 0.05, fmt: pct },
    { key: 'fov', tab: 'display', type: 'range', def: 75, min: 60, max: 110, step: 1, fmt: v => v + '°' },
    { key: 'headBob', tab: 'display', type: 'range', def: 0.8, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'shake', tab: 'display', type: 'range', def: 0.8, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'grain', tab: 'display', type: 'range', def: 0.5, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'chromatic', tab: 'display', type: 'range', def: 0.5, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'vignette', tab: 'display', type: 'range', def: 0.6, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'vhs', tab: 'display', type: 'toggle', def: false },
    { key: 'reduceFlicker', tab: 'display', type: 'toggle', def: false },
    { key: 'crosshair', tab: 'display', type: 'toggle', def: true },
    { key: 'subtitles', tab: 'display', type: 'toggle', def: true },
    { key: 'captions', tab: 'display', type: 'toggle', def: true },
    { key: 'subtitleSize', tab: 'display', type: 'select', def: 'medium',
      options: [['small', 'opt.small'], ['medium', 'opt.medium'], ['large', 'opt.large']] },

    // ---------------- AUDIO ----------------
    { key: 'master', tab: 'audio', type: 'range', def: 0.85, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'music', tab: 'audio', type: 'range', def: 0.6, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'sfx', tab: 'audio', type: 'range', def: 0.9, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'ambience', tab: 'audio', type: 'range', def: 0.8, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'entities', tab: 'audio', type: 'range', def: 1, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'voice', tab: 'audio', type: 'range', def: 0.9, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'hrtf', tab: 'audio', type: 'toggle', def: true },

    // ---------------- CONTROLS ----------------
    { key: 'mouseSens', tab: 'controls', type: 'range', def: 1, min: 0.1, max: 3, step: 0.05, fmt: v => v.toFixed(2) },
    { key: 'invertY', tab: 'controls', type: 'toggle', def: false },
    { key: 'touchSens', tab: 'controls', type: 'range', def: 1, min: 0.2, max: 3, step: 0.05, fmt: v => v.toFixed(2) },
    { key: 'toggleCrouch', tab: 'controls', type: 'toggle', def: false },
    { key: 'toggleSprint', tab: 'controls', type: 'toggle', def: false },

    // ---------------- GAMEPLAY ----------------
    { key: 'lang', tab: 'gameplay', type: 'select', def: 'en', options: [['en', 'English'], ['tr', 'Türkçe']] },
    { key: 'difficulty', tab: 'gameplay', type: 'select', def: 'normal',
      options: [['easy', 'diff.easy'], ['normal', 'diff.normal'], ['nightmare', 'diff.nightmare']] },
    { key: 'jumpscare', tab: 'gameplay', type: 'select', def: 'full', options: [['full', 'opt.full'], ['reduced', 'opt.reduced']] },
    { key: 'hints', tab: 'gameplay', type: 'toggle', def: true },
  ];

  const PRESETS = {
    low: { renderScale: 0.75, textureRes: 512, shadows: 0, antialias: 'fxaa', lightmapRes: 3, ao: 'off', ssr: 'off', dynLights: 2, bloom: true, bloomStrength: 0.8, volumetric: 'off', motionBlur: 0, lensDirt: false, particles: 0.25, viewDist: 45, anisotropy: 2 },
    medium: { renderScale: 1, textureRes: 1024, shadows: 1, antialias: 'fxaa', lightmapRes: 4, ao: 'low', ssr: 'off', dynLights: 4, bloom: true, bloomStrength: 1, volumetric: 'low', motionBlur: 0.2, lensDirt: true, particles: 0.5, viewDist: 70, anisotropy: 4 },
    high: { renderScale: 1, textureRes: 1024, shadows: 2, antialias: 'msaa', lightmapRes: 6, ao: 'high', ssr: 'low', dynLights: 6, bloom: true, bloomStrength: 1, volumetric: 'high', motionBlur: 0.3, lensDirt: true, particles: 0.8, viewDist: 90, anisotropy: 8 },
    ultra: { renderScale: 1.5, textureRes: 2048, shadows: 3, antialias: 'both', lightmapRes: 8, ao: 'ultra', ssr: 'high', dynLights: 8, bloom: true, bloomStrength: 1.1, volumetric: 'ultra', motionBlur: 0.3, lensDirt: true, particles: 1, viewDist: 130, anisotropy: 16 },
    extreme: { renderScale: 2, textureRes: 2048, shadows: 3, antialias: 'both', lightmapRes: 12, ao: 'ultra', ssr: 'ultra', dynLights: 12, bloom: true, bloomStrength: 1.1, volumetric: 'extreme', motionBlur: 0.35, lensDirt: true, particles: 1, viewDist: 160, anisotropy: 16 },
  };
  const PRESET_KEYS = Object.keys(PRESETS.ultra);
  const STORE_KEY = 'pb.settings.v2';

  const S = PB.Settings = {
    SCHEMA, PRESETS, PRESET_KEYS,
    TABS: ['screen', 'graphics', 'display', 'audio', 'controls', 'gameplay'],
    data: {},
    events: new U.Emitter(),
    fresh: false,
    def(key) { const s = SCHEMA.find(x => x.key === key); return s && s.def; },
    get(key) { return this.data[key]; },
    set(key, value, silent) {
      const s = SCHEMA.find(x => x.key === key);
      if (!s) return;
      if (s.type === 'range') value = U.clamp(Number(value), s.min, s.max);
      else if (s.type === 'toggle') value = !!value;
      else if (s.type === 'select') {
        const opt = s.options.find(o => String(o[0]) === String(value));
        value = opt ? opt[0] : s.def;
      }
      const old = this.data[key];
      this.data[key] = value;
      if (key === 'preset' && value !== 'custom') {
        const p = PRESETS[value];
        for (const k of PRESET_KEYS) this.set(k, p[k], true);
      } else if (!silent && PRESET_KEYS.includes(key) && this.data.preset !== 'custom') {
        const p = PRESETS[this.data.preset];
        if (p && p[key] !== value) this.data.preset = 'custom';
      }
      this.save();
      if (old !== value || key === 'preset') this.events.emit('change', key, value);
    },
    reset() {
      const lang = this.data.lang;
      for (const s of SCHEMA) this.data[s.key] = s.def;
      this.data.lang = lang || 'en';
      this.autoDetect();
      this.save();
      this.events.emit('change', '*', null);
    },
    load() {
      for (const s of SCHEMA) this.data[s.key] = s.def;
      const saved = U.store.get(STORE_KEY, null);
      this.fresh = !saved;
      if (saved) for (const s of SCHEMA) if (saved[s.key] !== undefined && !s.transient) this.data[s.key] = this.valid(s, saved[s.key]);
      if (this.fresh) this.autoDetect();
      return this.data;
    },
    save() { U.store.set(STORE_KEY, this.data); },
    // Stored values from older versions (e.g. volumetric: true) fall back to the default
    valid(s, v) {
      if (s.type === 'range') return typeof v === 'number' && isFinite(v) ? U.clamp(v, s.min, s.max) : s.def;
      if (s.type === 'toggle') return typeof v === 'boolean' ? v : s.def;
      if (s.type === 'select') { const o = s.options.find(x => String(x[0]) === String(v)); return o ? o[0] : s.def; }
      return v;
    },
    // First launch: pick a sensible preset for the device
    autoDetect() {
      const coarse = root.matchMedia && root.matchMedia('(pointer: coarse)').matches;
      const cores = (root.navigator && root.navigator.hardwareConcurrency) || 4;
      let preset = 'high';
      if (coarse) preset = cores >= 8 ? 'medium' : 'low';
      else if (cores <= 4) preset = 'medium';
      this.data.preset = preset;
      Object.assign(this.data, PRESETS[preset]);
    },
    difficulty() {
      const d = this.data.difficulty;
      return {
        easy: { speed: 0.82, hearing: 0.7, sight: 0.75, battery: 0.6, catchGrace: 0.5, fear: 0.7 },
        normal: { speed: 1, hearing: 1, sight: 1, battery: 1, catchGrace: 0.25, fear: 1 },
        nightmare: { speed: 1.12, hearing: 1.35, sight: 1.25, battery: 1.4, catchGrace: 0, fear: 1.3 },
      }[d] || { speed: 1, hearing: 1, sight: 1, battery: 1, catchGrace: 0.25, fear: 1 };
    },
  };
  S.load();
})(typeof window !== 'undefined' ? window : globalThis);
