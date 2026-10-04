import { defineConfig } from 'vite';

// The multi-file web build (dist/web). `npm run build:single` makes the one-file version with
// vite.single.config.ts. base './' lets the build run from any folder or from the desktop app.
export default defineConfig({
  base: './',
  server: { port: 5173, host: true },
  build: {
    outDir: 'dist/web',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: false,
    chunkSizeWarningLimit: 6000,
  },
});
