import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      // Vite's modulepreload polyfill calls fetch() on every chunk URL it
      // sees. Under the jsdom prerender worker those URLs resolve to
      // file:// paths, which Node's fetch cannot load, so the worker dies
      // with an uncaught rejection the moment a lazy chunk is requested.
      // Modern browsers handle <link rel="modulepreload"> natively, so the
      // polyfill is not needed. Disabling it keeps React.lazy prerendering.
      modulePreload: { polyfill: false },
      // PREVIEW_BUILD=1 produces a single-bundle build for the single-file
      // githack preview: the preview has no chunk files to fetch, so
      // dynamic imports would 404 and the app would stick on "Loading…".
      // Vercel never sets this, so the deployed build keeps code-splitting.
      ...(process.env.PREVIEW_BUILD
        ? { rollupOptions: { output: { inlineDynamicImports: true } } }
        : {}),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
