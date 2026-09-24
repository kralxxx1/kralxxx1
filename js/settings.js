/* Ayarlar: şema (arayüz bu şemadan otomatik çizilir), ön ayarlar ve kalıcılık. */
(function (root) {
  'use strict';
  const PB = root.PB || (root.PB = {});
  const U = PB.U;

  const pct = v => Math.round(v * 100) + '%';
  const SCHEMA = [
    // ---------------- GRAFİK ----------------
    { key: 'preset', tab: 'grafik', label: 'Kalite ön ayarı', type: 'select', def: 'yuksek',
      options: [['dusuk', 'Düşük'], ['orta', 'Orta'], ['yuksek', 'Yüksek'], ['ultra', 'Ultra'], ['ozel', 'Özel']],
      help: 'Aşağıdaki grafik ayarlarını tek seferde değiştirir.' },
    { key: 'renderScale', tab: 'grafik', label: 'Çözünürlük ölçeği', type: 'range', def: 1, min: 0.5, max: 2, step: 0.05, fmt: pct,
      help: '%100 üstü süper örnekleme yapar: daha keskin görüntü, daha fazla GPU yükü.' },
    { key: 'textureRes', tab: 'grafik', label: 'Doku çözünürlüğü', type: 'select', def: 1024, reload: true,
      options: [[512, '512 px'], [1024, '1024 px'], [2048, '2048 px (Ultra)']], help: 'Sonraki bölüm yüklemesinde uygulanır.' },
    { key: 'shadows', tab: 'grafik', label: 'Gölgeler', type: 'select', def: 2,
      options: [[0, 'Kapalı'], [1, 'Düşük (1024)'], [2, 'Yüksek (2048)'], [3, 'Ultra (4096)']] },
    { key: 'antialias', tab: 'grafik', label: 'Kenar yumuşatma', type: 'select', def: 'msaa',
      options: [['none', 'Kapalı'], ['fxaa', 'FXAA'], ['msaa', 'MSAA 4x'], ['both', 'MSAA 4x + FXAA']] },
    { key: 'lightmapRes', tab: 'grafik', label: 'Işık haritası kalitesi', type: 'select', def: 6, reload: true,
      options: [[3, 'Düşük'], [4, 'Orta'], [6, 'Yüksek'], [8, 'Ultra']], help: 'Pişirilmiş yumuşak aydınlatmanın detayı. Sonraki yüklemede uygulanır.' },
    { key: 'dynLights', tab: 'grafik', label: 'Dinamik ışık sayısı', type: 'range', def: 6, min: 2, max: 10, step: 1, fmt: v => String(v) },
    { key: 'bloom', tab: 'grafik', label: 'Işıma (bloom)', type: 'toggle', def: true },
    { key: 'bloomStrength', tab: 'grafik', label: 'Işıma şiddeti', type: 'range', def: 1, min: 0, max: 2, step: 0.05, fmt: pct },
    { key: 'volumetric', tab: 'grafik', label: 'Hacimsel ışık ve toz', type: 'toggle', def: true },
    { key: 'particles', tab: 'grafik', label: 'Parçacık yoğunluğu', type: 'range', def: 0.8, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'viewDist', tab: 'grafik', label: 'Görüş mesafesi', type: 'range', def: 90, min: 30, max: 140, step: 5, fmt: v => v + ' m' },
    { key: 'anisotropy', tab: 'grafik', label: 'Anizotropik süzme', type: 'select', def: 8, reload: true,
      options: [[1, 'Kapalı'], [2, '2x'], [4, '4x'], [8, '8x'], [16, '16x']] },
    { key: 'showFps', tab: 'grafik', label: 'FPS göstergesi', type: 'toggle', def: false },

    // ---------------- GÖRÜNTÜ ----------------
    { key: 'brightness', tab: 'goruntu', label: 'Parlaklık', type: 'range', def: 1, min: 0.5, max: 1.8, step: 0.05, fmt: pct,
      help: 'Karanlık bölümlerde bile sembolün zar zor görüneceği seviyeye getir.' },
    { key: 'contrast', tab: 'goruntu', label: 'Kontrast', type: 'range', def: 1, min: 0.8, max: 1.3, step: 0.01, fmt: pct },
    { key: 'saturation', tab: 'goruntu', label: 'Renk doygunluğu', type: 'range', def: 1, min: 0.3, max: 1.5, step: 0.05, fmt: pct },
    { key: 'fov', tab: 'goruntu', label: 'Görüş alanı (FOV)', type: 'range', def: 75, min: 60, max: 105, step: 1, fmt: v => v + '°' },
    { key: 'headBob', tab: 'goruntu', label: 'Kafa sallanması', type: 'range', def: 0.8, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'shake', tab: 'goruntu', label: 'Kamera sarsıntısı', type: 'range', def: 0.8, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'grain', tab: 'goruntu', label: 'Film greni', type: 'range', def: 0.5, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'chromatic', tab: 'goruntu', label: 'Renk sapması', type: 'range', def: 0.5, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'vignette', tab: 'goruntu', label: 'Kenar kararması', type: 'range', def: 0.6, min: 0, max: 1, step: 0.05, fmt: pct },
    { key: 'vhs', tab: 'goruntu', label: 'Kamera kaydı (VHS) görünümü', type: 'toggle', def: false,
      help: 'Ekranı 1994 model bir el kamerasının vizöründen görmüş gibi yapar.' },
    { key: 'reduceFlicker', tab: 'goruntu', label: 'Yanıp sönmeyi azalt', type: 'toggle', def: false,
      help: 'Işığa duyarlı oyuncular için titreşen ışıkları ve ekran flaşlarını yumuşatır.' },
    { key: 'crosshair', tab: 'goruntu', label: 'Nişangâh noktası', type: 'toggle', def: true },
    { key: 'subtitles', tab: 'goruntu', label: 'Altyazılar', type: 'toggle', def: true },
    { key: 'captions', tab: 'goruntu', label: 'Ses altyazıları', type: 'toggle', def: true,
      help: '[uzakta çiğneme sesi] gibi önemli sesleri yazıyla gösterir.' },
    { key: 'subtitleSize', tab: 'goruntu', label: 'Altyazı boyutu', type: 'select', def: 'orta',
      options: [['kucuk', 'Küçük'], ['orta', 'Orta'], ['buyuk', 'Büyük']] },

    // ---------------- SES ----------------
    { key: 'master', tab: 'ses', label: 'Ana ses', type: 'range', def: 0.85, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'music', tab: 'ses', label: 'Müzik', type: 'range', def: 0.6, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'sfx', tab: 'ses', label: 'Efektler', type: 'range', def: 0.9, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'ambience', tab: 'ses', label: 'Ortam (uğultu, damlalar)', type: 'range', def: 0.8, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'entities', tab: 'ses', label: 'Yaratık sesleri', type: 'range', def: 1, min: 0, max: 1, step: 0.01, fmt: pct },
    { key: 'hrtf', tab: 'ses', label: '3D ses (HRTF, kulaklık önerilir)', type: 'toggle', def: true },

    // ---------------- KONTROLLER ----------------
    { key: 'mouseSens', tab: 'kontrol', label: 'Fare hassasiyeti', type: 'range', def: 1, min: 0.1, max: 3, step: 0.05, fmt: v => v.toFixed(2) },
    { key: 'invertY', tab: 'kontrol', label: 'Dikey ekseni ters çevir', type: 'toggle', def: false },
    { key: 'touchSens', tab: 'kontrol', label: 'Dokunmatik bakış hassasiyeti', type: 'range', def: 1, min: 0.2, max: 3, step: 0.05, fmt: v => v.toFixed(2) },
    { key: 'toggleCrouch', tab: 'kontrol', label: 'Eğilme: bas-bırak yerine aç/kapa', type: 'toggle', def: false },
    { key: 'toggleSprint', tab: 'kontrol', label: 'Koşma: basılı tut yerine aç/kapa', type: 'toggle', def: false },

    // ---------------- OYNANIŞ ----------------
    { key: 'difficulty', tab: 'oynanis', label: 'Zorluk', type: 'select', def: 'normal',
      options: [['kolay', 'Kolay: hikâyeye odaklan'], ['normal', 'Normal'], ['kabus', 'Kâbus']],
      help: 'Yaratıkların hızını, duyuşunu ve fener pilini etkiler.' },
    { key: 'jumpscare', tab: 'oynanis', label: 'Ani korkutmalar', type: 'select', def: 'tam',
      options: [['tam', 'Tam'], ['azaltilmis', 'Azaltılmış']] },
    { key: 'hints', tab: 'oynanis', label: 'İpuçları', type: 'toggle', def: true },
  ];

  const PRESETS = {
    dusuk: { renderScale: 0.75, textureRes: 512, shadows: 0, antialias: 'fxaa', lightmapRes: 3, dynLights: 2, bloom: true, bloomStrength: 0.8, volumetric: false, particles: 0.25, viewDist: 45, anisotropy: 2 },
    orta: { renderScale: 1, textureRes: 1024, shadows: 1, antialias: 'fxaa', lightmapRes: 4, dynLights: 4, bloom: true, bloomStrength: 1, volumetric: true, particles: 0.5, viewDist: 70, anisotropy: 4 },
    yuksek: { renderScale: 1, textureRes: 1024, shadows: 2, antialias: 'msaa', lightmapRes: 6, dynLights: 6, bloom: true, bloomStrength: 1, volumetric: true, particles: 0.8, viewDist: 90, anisotropy: 8 },
    ultra: { renderScale: 1.5, textureRes: 2048, shadows: 3, antialias: 'both', lightmapRes: 8, dynLights: 8, bloom: true, bloomStrength: 1.1, volumetric: true, particles: 1, viewDist: 130, anisotropy: 16 },
  };
  const PRESET_KEYS = Object.keys(PRESETS.ultra);
  const STORE_KEY = 'pb.settings.v1';

  const S = PB.Settings = {
    SCHEMA, PRESETS,
    TABS: [['grafik', 'Grafik'], ['goruntu', 'Görüntü'], ['ses', 'Ses'], ['kontrol', 'Kontroller'], ['oynanis', 'Oynanış']],
    data: {},
    events: new U.Emitter(),
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
      if (key === 'preset' && value !== 'ozel') {
        const p = PRESETS[value];
        for (const k of PRESET_KEYS) this.set(k, p[k], true);
      } else if (!silent && PRESET_KEYS.includes(key) && this.data.preset !== 'ozel') {
        const p = PRESETS[this.data.preset];
        if (p && p[key] !== value) this.data.preset = 'ozel';
      }
      this.save();
      if (old !== value || key === 'preset') this.events.emit('change', key, value);
    },
    reset() {
      for (const s of SCHEMA) this.data[s.key] = s.def;
      this.save();
      this.events.emit('change', '*', null);
    },
    load() {
      for (const s of SCHEMA) this.data[s.key] = s.def;
      const saved = U.store.get(STORE_KEY, null);
      const fresh = !saved;
      if (saved) for (const s of SCHEMA) if (saved[s.key] !== undefined) this.data[s.key] = saved[s.key];
      if (fresh) this.autoDetect();
      return this.data;
    },
    save() { U.store.set(STORE_KEY, this.data); },
    // İlk açılışta cihaza göre makul bir ön ayar seç
    autoDetect() {
      const coarse = root.matchMedia && root.matchMedia('(pointer: coarse)').matches;
      const cores = (root.navigator && root.navigator.hardwareConcurrency) || 4;
      let preset = 'yuksek';
      if (coarse) preset = cores >= 8 ? 'orta' : 'dusuk';
      else if (cores <= 4) preset = 'orta';
      this.data.preset = preset;
      Object.assign(this.data, PRESETS[preset]);
    },
    difficulty() {
      const d = this.data.difficulty;
      return {
        kolay: { speed: 0.82, hearing: 0.7, sight: 0.75, battery: 0.6, catchGrace: 0.5, fear: 0.7 },
        normal: { speed: 1, hearing: 1, sight: 1, battery: 1, catchGrace: 0.25, fear: 1 },
        kabus: { speed: 1.12, hearing: 1.35, sight: 1.25, battery: 1.4, catchGrace: 0, fear: 1.3 },
      }[d] || { speed: 1, hearing: 1, sight: 1, battery: 1, catchGrace: 0.25, fear: 1 };
    },
  };
  S.load();
})(typeof window !== 'undefined' ? window : globalThis);
