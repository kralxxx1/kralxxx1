/* LEVEL 256 — desktop build (Electron). The game is the same HTML5 game as the web version, served from
   the app folder under app://level256/. three.js and cannon-es are bundled into the game by Vite; the one
   thing it would fetch from the internet (Google Fonts) is answered from local copies (see
   scripts/vendor.js), and every other
   request is refused, so the game runs offline and nothing leaves the machine.
   The page gets a small native API (preload.js → window.LEVEL256_NATIVE): quit, native fullscreen,
   the V-Sync preference (applied at the next start: Chromium's refresh cap can only be removed by
   command-line switches) and process metrics for the performance overlay. */
'use strict';
const { app, BrowserWindow, Menu, ipcMain, protocol, session, shell } = require('electron');
const fs = require('fs');
const os = require('os');
const path = require('path');

const HOST = 'level256';
const ORIGIN = `app://${HOST}/`;
const APP_DIR = path.join(__dirname, 'app');

// ---------------------------------------------------------------- preferences that need the native side
const PREFS_FILE = path.join(app.getPath('userData'), 'desktop.json');
let prefs = { vsync: true, fullscreen: true };
try { prefs = Object.assign(prefs, JSON.parse(fs.readFileSync(PREFS_FILE, 'utf8'))); } catch (e) { /* first start */ }
const savePrefs = () => { try { fs.mkdirSync(path.dirname(PREFS_FILE), { recursive: true }); fs.writeFileSync(PREFS_FILE, JSON.stringify(prefs, null, 1)); } catch (e) { /* read-only disk: keep going */ } };
const arg = name => process.argv.includes(name);

// ---------------------------------------------------------------- Chromium switches (before ready)
if (!prefs.vsync || arg('--no-vsync')) {
  // V-Sync off: present frames immediately and let requestAnimationFrame run past the refresh rate
  app.commandLine.appendSwitch('disable-gpu-vsync');
  app.commandLine.appendSwitch('disable-frame-rate-limit');
}
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('force_high_performance_gpu');
// Chromium turns WebGL off on graphics drivers it has blocklisted; a game that needs it asks for it anyway
app.commandLine.appendSwitch('ignore-gpu-blocklist');
if (arg('--steam-overlay') && process.platform === 'win32') {
  // The Steam overlay can only draw into a GPU surface in the main process
  app.commandLine.appendSwitch('in-process-gpu');
  app.commandLine.appendSwitch('disable-direct-composition');
}

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true, codeCache: true } },
]);

if (!app.requestSingleInstanceLock()) app.exit(0);

// ---------------------------------------------------------------- serving the game
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml',
};
async function fileResponse(rel, extraHeaders) {
  const file = path.normalize(path.join(APP_DIR, rel));
  if (!file.startsWith(APP_DIR + path.sep)) return new Response('Forbidden', { status: 403 });
  try {
    const data = await fs.promises.readFile(file);
    return new Response(data, { headers: Object.assign({ 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' }, extraHeaders) });
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}
// The page may only run its own code: the font addresses below never reach the network (see
// installProtocols), and inline code is limited to style attributes
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self' data: blob:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-src 'none'",
].join('; ');
// Google Fonts css2 requests (family=Name:wght@400;700&...) → the matching local @font-face rules
let fontManifest = null;
async function fontCss(url) {
  if (!fontManifest) {
    try { fontManifest = JSON.parse(await fs.promises.readFile(path.join(APP_DIR, 'vendor/fonts/manifest.json'), 'utf8')); } catch (e) { fontManifest = {}; }
  }
  const parts = [];
  for (const fam of url.searchParams.getAll('family')) {
    const [name, spec] = fam.split(':');
    const weights = spec && spec.includes('@') ? spec.split('@')[1].split(';') : ['400'];
    for (const w of weights) {
      const rel = fontManifest[name] && fontManifest[name][w];
      if (rel) { try { parts.push(await fs.promises.readFile(path.join(APP_DIR, 'vendor/fonts', rel), 'utf8')); } catch (e) { /* missing file: the fallback fonts take over */ } }
    }
  }
  return new Response(parts.join('\n'), { headers: { 'content-type': 'text/css; charset=utf-8', 'access-control-allow-origin': '*' } });
}
function installProtocols() {
  protocol.handle('app', req => {
    const u = new URL(req.url);
    if (u.host !== HOST) return new Response('Not found', { status: 404 });
    let rel = decodeURIComponent(u.pathname);
    if (rel === '/' || rel === '') rel = '/index.html';
    return fileResponse(rel.slice(1), rel.endsWith('.html') ? { 'content-security-policy': CSP } : undefined);
  });
  const outside = req => {
    const u = new URL(req.url);
    if (u.host === 'fonts.googleapis.com' && u.pathname === '/css2') return fontCss(u);
    return new Response('', { status: 404 }); // offline game: nothing else is fetched
  };
  protocol.handle('https', outside);
  protocol.handle('http', outside);
}

// ---------------------------------------------------------------- the window
let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 1600, height: 900, minWidth: 960, minHeight: 540,
    fullscreen: prefs.fullscreen !== false && !arg('--windowed'),
    backgroundColor: '#000000', show: false, title: 'LEVEL 256',
    icon: path.join(__dirname, 'build', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, sandbox: true, nodeIntegration: false,
      backgroundThrottling: false, spellcheck: false,
      devTools: !app.isPackaged || arg('--devtools'),
    },
  });
  win.once('ready-to-show', () => win.show());
  win.on('enter-full-screen', () => { prefs.fullscreen = true; savePrefs(); win.webContents.send('fullscreen', true); });
  win.on('leave-full-screen', () => { prefs.fullscreen = false; savePrefs(); win.webContents.send('fullscreen', false); });
  win.on('closed', () => { win = null; });
  const wc = win.webContents;
  // Links open in the player's browser; the game window never navigates away
  wc.setWindowOpenHandler(({ url }) => { if (/^https:\/\//.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  wc.on('will-navigate', (e, url) => { if (!url.startsWith(ORIGIN)) e.preventDefault(); });
  // F11 toggles fullscreen (there is no browser menu to do it)
  wc.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11' && !input.isAutoRepeat) { e.preventDefault(); win.setFullScreen(!win.isFullScreen()); }
  });
  wc.on('render-process-gone', (e, d) => { if (d.reason !== 'clean-exit') console.error('renderer gone:', d.reason); });
  win.loadURL(ORIGIN + 'index.html');
}

// ---------------------------------------------------------------- native API for the page
ipcMain.on('config', e => { e.returnValue = { version: app.getVersion(), vsync: prefs.vsync !== false, fullscreen: win ? win.isFullScreen() : !!prefs.fullscreen }; });
ipcMain.on('quit', () => app.quit());
ipcMain.on('restart', () => { app.relaunch(); app.exit(0); });
ipcMain.on('setFullscreen', (e, on) => { if (win) win.setFullScreen(!!on); });
ipcMain.on('isFullscreen', e => { e.returnValue = win ? win.isFullScreen() : false; });
ipcMain.on('setVsync', (e, on) => { if (prefs.vsync !== !!on) { prefs.vsync = !!on; savePrefs(); } });

// Process metrics for the performance overlay, once a second: whole-system CPU load, the game's own
// CPU share (all its processes) and its memory
const cpuTimes = () => os.cpus().reduce((a, c) => { const t = c.times; a.idle += t.idle; a.total += t.user + t.nice + t.sys + t.idle + t.irq; return a; }, { idle: 0, total: 0 });
let lastCpu = cpuTimes();
function sendMetrics() {
  if (!win || win.isDestroyed()) return;
  const now = cpuTimes(), idle = now.idle - lastCpu.idle, total = now.total - lastCpu.total;
  lastCpu = now;
  let mem = 0, appCpu = 0, gpuCpu = null;
  for (const m of app.getAppMetrics()) {
    mem += (m.memory && m.memory.workingSetSize) || 0;
    appCpu += (m.cpu && m.cpu.percentCPUUsage) || 0;
    if (m.type === 'GPU') gpuCpu = m.cpu.percentCPUUsage;
  }
  const cores = Math.max(1, os.cpus().length);
  win.webContents.send('metrics', {
    cpu: total > 0 ? 100 * (1 - idle / total) : null,
    appCpu: appCpu / cores, gpuProcCpu: gpuCpu == null ? null : gpuCpu / cores,
    mem: mem / 1024, cores,
  });
}

// ---------------------------------------------------------------- start
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  installProtocols();
  const ses = session.defaultSession;
  const allowed = new Set(['pointerLock', 'fullscreen']);
  ses.setPermissionRequestHandler((wc, perm, cb) => cb(allowed.has(perm)));
  ses.setPermissionCheckHandler((wc, perm) => allowed.has(perm));
  createWindow();
  setInterval(sendMetrics, 1000);
});
app.on('window-all-closed', () => app.quit());
