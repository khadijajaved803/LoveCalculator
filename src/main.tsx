import {createRoot} from 'react-dom/client';
import App, { preloadPageForPath } from './App.tsx';
import './index.css';

// Ensure HTML lang attribute is strictly en-IN at runtime
if (typeof document !== 'undefined') {
  document.documentElement.lang = 'en-IN';
  document.documentElement.setAttribute('lang', 'en-IN');
}

// Load the current page's chunk BEFORE React mounts. Until the mount the
// browser keeps showing the prerendered HTML, and once the chunk is in
// memory the first render resolves immediately — so the Suspense
// "Loading…" fallback never flashes over the prerendered content on page
// load. If the chunk fails or takes too long, mount anyway (the old
// fallback behaviour) instead of leaving the page unmounted forever.
const PRELOAD_TIMEOUT_MS = 8000;

async function boot() {
  try {
    await Promise.race([
      preloadPageForPath(window.location.pathname),
      new Promise((resolve) => setTimeout(resolve, PRELOAD_TIMEOUT_MS)),
    ]);
  } catch {
    // Chunk failed to preload — mount anyway; the lazy import will retry.
  }
  createRoot(document.getElementById('root')!).render(<App />);
}

boot();
