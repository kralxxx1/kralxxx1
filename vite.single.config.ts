import { defineConfig } from 'vite';

// One chunk, one stylesheet, nothing split: tools/finish-single.mjs then folds them into the HTML page
// so the whole game is a single file (dist/level256.html).
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist/single',
    emptyOutDir: true,
    target: 'es2022',
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 20000,
    rollupOptions: { output: { inlineDynamicImports: true, entryFileNames: 'app.js', assetFileNames: 'app[extname]' } },
  },
});
