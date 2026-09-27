/* Performance overlay (Settings → Performance): FPS, 1% low, a frame-time graph, CPU and GPU time per
   frame and how busy each one is, draw calls, triangles, memory, render resolution and the graphics card.
   GPU time comes from EXT_disjoint_timer_query_webgl2 when the browser exposes it; CPU time is the main
   thread's work per frame (game logic plus submitting the frame). The desktop build can add system-wide
   numbers through window.LEVEL256_NATIVE.metrics(). */
(function (root) {
  'use strict';
  const PB = root.PB, t = k => PB.t(k);
  const N = 240;

  class Perf {
    constructor(renderer) {
      this.r = renderer;
      // draw calls and triangles are counted over the whole frame (every post pass), not just the last render
      renderer.info.autoReset = false;
      this.gl = renderer.getContext();
      this.ext = null;
      try { this.ext = this.gl.getExtension('EXT_disjoint_timer_query_webgl2'); } catch (e) { this.ext = null; }
      this.queries = []; this.active = null;
      this.frameMs = new Float32Array(N); this.cpuMs = new Float32Array(N); this.gpuMs = new Float32Array(N);
      this.i = 0; this.count = 0;
      this.lastFrame = 0; this.frameStart = 0; this.lastGpu = 0;
      this.nextUi = 0;
      this.gpuName = '';
      try {
        const dbg = this.gl.getExtension('WEBGL_debug_renderer_info');
        const raw = dbg ? String(this.gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '') : '';
        // "ANGLE (Vendor, Device Direct3D11 vs_5_0 ps_5_0, D3D11)" -> "Device"
        const inner = (raw.match(/^ANGLE \((.*)\)$/) || [0, raw])[1], parts = inner.split(/,\s*/);
        let name = (parts.length >= 2 ? parts[1] : parts[0]).replace(/\s*(Direct3D|D3D\d|vs_\d|ps_\d|OpenGL|Vulkan \d[\d.]*|Metal)\b.*$/i, '').replace(/\(0x[0-9a-f]+\)/ig, '').trim();
        if (!name) name = /SwiftShader/i.test(raw) ? 'SwiftShader (software)' : parts[0];
        this.gpuName = name.slice(0, 48);
      } catch (e) { this.gpuName = ''; }
      this.el = document.createElement('div');
      this.el.id = 'perf'; this.el.hidden = true;
      this.el.innerHTML = '<div class="pf-main"><b class="pf-fps">—</b><span class="pf-unit">FPS</span></div><div class="pf-rows"></div><canvas class="pf-graph" width="220" height="56"></canvas>';
      document.body.appendChild(this.el);
      this.rows = this.el.querySelector('.pf-rows');
      this.fpsEl = this.el.querySelector('.pf-fps');
      this.graph = this.el.querySelector('.pf-graph');
      this.mode = 'off';
    }
    setMode(mode, corner) {
      this.mode = mode || 'off';
      this.el.hidden = this.mode === 'off';
      this.el.className = 'pf-' + this.mode + ' pf-' + (corner || 'tr');
    }
    // Frame boundaries: call begin() first thing in the frame, end() after the frame has been submitted
    begin(now) {
      this.r.info.reset();
      if (this.mode === 'off') return;
      if (this.lastFrame) this.frameMs[this.i] = now - this.lastFrame;
      this.lastFrame = now; this.frameStart = now;
    }
    gpuBegin() {
      if (this.mode === 'off' || !this.ext || this.active) return;
      const gl = this.gl;
      // collect finished queries first
      while (this.queries.length) {
        const q = this.queries[0];
        if (!gl.getQueryParameter(q, gl.QUERY_RESULT_AVAILABLE)) break;
        const disjoint = gl.getParameter(this.ext.GPU_DISJOINT_EXT);
        const ns = gl.getQueryParameter(q, gl.QUERY_RESULT);
        if (!disjoint) this.lastGpu = ns / 1e6;
        gl.deleteQuery(q); this.queries.shift();
      }
      if (this.queries.length > 4) return;
      const q = gl.createQuery();
      gl.beginQuery(this.ext.TIME_ELAPSED_EXT, q);
      this.active = q;
    }
    gpuEnd() {
      if (!this.active) return;
      this.gl.endQuery(this.ext.TIME_ELAPSED_EXT);
      this.queries.push(this.active); this.active = null;
    }
    end(now) {
      if (this.mode === 'off') return;
      this.cpuMs[this.i] = now - this.frameStart;
      this.gpuMs[this.i] = this.lastGpu;
      this.i = (this.i + 1) % N; this.count = Math.min(N, this.count + 1);
      if (now >= this.nextUi) { this.nextUi = now + 250; this.draw(); }
    }
    stats() {
      const n = Math.max(1, this.count), fr = [], k0 = (this.i - n + N) % N;
      let f = 0, c = 0, g = 0;
      for (let k = 0; k < n; k++) { const j = (k0 + k) % N; f += this.frameMs[j]; c += this.cpuMs[j]; g += this.gpuMs[j]; fr.push(this.frameMs[j]); }
      f /= n; c /= n; g /= n;
      fr.sort((a, b) => b - a);
      const worst = fr.slice(0, Math.max(1, Math.round(n * 0.01)));
      const low = worst.reduce((a, b) => a + b, 0) / worst.length;
      return { fps: f > 0 ? 1000 / f : 0, frame: f, cpu: c, gpu: g, low1: low > 0 ? 1000 / low : 0 };
    }
    draw() {
      const s = this.stats();
      this.fpsEl.textContent = Math.round(s.fps);
      this.fpsEl.className = 'pf-fps ' + (s.fps >= 55 ? 'ok' : s.fps >= 30 ? 'mid' : 'bad');
      if (this.mode === 'fps') return;
      const pct = (a, b) => b > 0 ? Math.min(100, Math.round(a / b * 100)) + '%' : '—';
      const gpuOk = !!this.ext && s.gpu > 0;
      const rows = [
        [t('perf.frame'), s.frame.toFixed(1) + ' ms', t('perf.low1'), Math.round(s.low1) + ' FPS'],
        [t('perf.cpu'), s.cpu.toFixed(1) + ' ms', t('perf.cpuUse'), pct(s.cpu, s.frame)],
        [t('perf.gpu'), gpuOk ? s.gpu.toFixed(1) + ' ms' : t('perf.na'), t('perf.gpuUse'), gpuOk ? pct(s.gpu, s.frame) : t('perf.na')],
      ];
      if (this.mode === 'detailed') {
        const info = this.r.info, g = PB.game, post = g && g.post;
        const res = post && post.sceneRT ? post.sceneRT.width + '×' + post.sceneRT.height : this.r.domElement.width + '×' + this.r.domElement.height;
        rows.push([t('perf.draws'), String(info.render.calls), t('perf.tris'), (info.render.triangles / 1000).toFixed(0) + 'k']);
        rows.push([t('perf.textures'), String(info.memory.textures), t('perf.programs'), String(info.programs ? info.programs.length : 0)]);
        const mem = root.performance && root.performance.memory;
        rows.push([t('perf.res'), res, t('perf.heap'), mem ? Math.round(mem.usedJSHeapSize / 1048576) + ' MB' : t('perf.na')]);
        const nat = root.LEVEL256_NATIVE && root.LEVEL256_NATIVE.metrics && root.LEVEL256_NATIVE.metrics();
        if (nat) rows.push([t('perf.sysCpu'), nat.cpu != null ? Math.round(nat.cpu) + '%' : t('perf.na'), t('perf.procMem'), nat.mem != null ? Math.round(nat.mem) + ' MB' : t('perf.na')]);
        if (this.gpuName) rows.push([t('perf.card'), this.gpuName]);
      }
      this.rows.innerHTML = rows.map(r => `<div><span>${r[0]}</span><b>${r[1]}</b>${r[2] ? `<span>${r[2]}</span><b>${r[3]}</b>` : ''}</div>`).join('');
      if (this.mode === 'detailed') this.plot();
    }
    plot() {
      const c = this.graph, x = c.getContext('2d'), w = c.width, h = c.height, n = this.count;
      x.clearRect(0, 0, w, h);
      x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, 0, w, h);
      const max = 50;
      x.strokeStyle = 'rgba(255,255,255,0.15)'; x.beginPath();
      for (const ms of [16.7, 33.3]) { const y = h - ms / max * h; x.moveTo(0, y); x.lineTo(w, y); }
      x.stroke();
      const line = (arr, col) => {
        x.strokeStyle = col; x.lineWidth = 1.2; x.beginPath();
        for (let k = 0; k < n; k++) { const j = (this.i - n + k + N) % N, X = (k + N - n) / (N - 1) * w, Y = h - Math.min(max, arr[j]) / max * h; if (k) x.lineTo(X, Y); else x.moveTo(X, Y); }
        x.stroke();
      };
      line(this.frameMs, '#e8e2d0'); line(this.cpuMs, '#6bd6ff'); if (this.ext) line(this.gpuMs, '#ff9a4a');
    }
  }
  PB.Perf = Perf;
})(typeof window !== 'undefined' ? window : globalThis);
