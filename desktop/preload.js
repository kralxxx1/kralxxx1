/* The native API the game sees as window.LEVEL256_NATIVE (sandboxed preload, context isolation on). */
'use strict';
const { contextBridge, ipcRenderer } = require('electron');

const config = ipcRenderer.sendSync('config');
let metrics = null;
ipcRenderer.on('metrics', (e, m) => { metrics = m; });
const fullscreenListeners = [];
ipcRenderer.on('fullscreen', (e, on) => { for (const cb of fullscreenListeners) { try { cb(on); } catch (err) { /* page error */ } } });

contextBridge.exposeInMainWorld('LEVEL256_NATIVE', {
  platform: process.platform,
  version: config.version,
  // V-Sync as this session started with it; a change applies at the next start
  vsync: config.vsync,
  metrics: () => metrics,
  quit: () => ipcRenderer.send('quit'),
  restart: () => ipcRenderer.send('restart'),
  setVsync: on => ipcRenderer.send('setVsync', !!on),
  setFullscreen: on => ipcRenderer.send('setFullscreen', !!on),
  isFullscreen: () => ipcRenderer.sendSync('isFullscreen'),
  onFullscreen: cb => { if (typeof cb === 'function') fullscreenListeners.push(cb); },
});
