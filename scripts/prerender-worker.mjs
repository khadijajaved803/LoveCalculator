// Prerender worker: renders ONE route of the built SPA in jsdom and writes
// the serialized, fully-mounted HTML to dist/<route>/index.html.
// Usage: node scripts/prerender-worker.mjs <route> <distDir> <templatePath> <bundlePath>
// The bundle is imported as an ES module against jsdom globals so React mounts
// and all useEffect hooks (incl. SEOHead) run, exactly as in a browser.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const [route, distDir, templatePath, bundlePath] = process.argv.slice(2);
const SHELL_TITLE = 'Calculate Love - Real Love Calculator by Name';

function polyfill(win) {
  // matchMedia — jsdom does not implement it; framer-motion / motion checks it.
  if (typeof win.matchMedia !== 'function') {
    win.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
  if (typeof win.IntersectionObserver !== 'function') {
    win.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  if (typeof win.ResizeObserver !== 'function') {
    win.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  // jsdom logs "not implemented" for scrollTo; silence it.
  win.scrollTo = () => {};
  if (typeof win.requestAnimationFrame !== 'function') {
    win.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
    win.cancelAnimationFrame = (id) => clearTimeout(id);
  }
}

async function main() {
  const html = readFileSync(templatePath, 'utf8');
  const dom = new JSDOM(html, {
    url: `http://localhost:4173${route}`,
    runScripts: 'outside-only', // we import the bundle ourselves below
    pretendToBeVisual: true,
  });
  const { window } = dom;
  polyfill(window);

  // Expose jsdom globals so the bundle (which references bare `document` /
  // `window` / `navigator`) runs against this DOM. Node 24 ships some of
  // these (navigator, location) as getter-only globals, so define them
  // explicitly instead of plain assignment.
  const g = globalThis;
  const setGlobal = (key, value) => {
    try {
      Object.defineProperty(g, key, { value, writable: true, configurable: true });
    } catch {
      g[key] = value;
    }
  };
  setGlobal('window', window);
  setGlobal('document', window.document);
  setGlobal('navigator', window.navigator);
  setGlobal('location', window.location);
  setGlobal('history', window.history);
  setGlobal('HTMLElement', window.HTMLElement);
  setGlobal('Element', window.Element);
  setGlobal('Node', window.Node);
  setGlobal('Event', window.Event);
  setGlobal('CustomEvent', window.CustomEvent);
  setGlobal('MouseEvent', window.MouseEvent);
  setGlobal('KeyboardEvent', window.KeyboardEvent);
  setGlobal('getComputedStyle', window.getComputedStyle.bind(window));
  setGlobal('requestAnimationFrame', window.requestAnimationFrame.bind(window));
  setGlobal('cancelAnimationFrame', window.cancelAnimationFrame.bind(window));
  setGlobal('matchMedia', window.matchMedia.bind(window));
  setGlobal('IntersectionObserver', window.IntersectionObserver);
  setGlobal('ResizeObserver', window.ResizeObserver);
  setGlobal('localStorage', window.localStorage);
  setGlobal('sessionStorage', window.sessionStorage);
  setGlobal('MutationObserver', window.MutationObserver);
  setGlobal('DOMParser', window.DOMParser);
  setGlobal('XMLSerializer', window.XMLSerializer);
  setGlobal('SVGElement', window.SVGElement);
  setGlobal('Image', window.Image);
  setGlobal('Text', window.Text);
  setGlobal('Range', window.Range);
  setGlobal('DocumentFragment', window.DocumentFragment);
  setGlobal('getSelection', window.getSelection.bind(window));
  setGlobal('scrollTo', window.scrollTo);
  setGlobal('scrollBy', () => {});

  // (scrollTo and friends are stubbed above, so jsdom's "not implemented"
  // noise stays quiet without touching the virtual console.)

  // Import the built bundle fresh for this route (query-bust the module cache).
  const bundleUrl = `${pathToFileURL(bundlePath).href}?route=${encodeURIComponent(route)}`;
  await import(bundleUrl);

  // Wait until React has mounted and the DOM has settled: #root has real
  // content and two consecutive polls (300 ms apart) show no change.
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let lastLen = -1;
  let stable = 0;
  let mounted = false;
  for (let i = 0; i < 40; i++) {
    await sleep(300);
    const rootHtml = window.document.getElementById('root')?.innerHTML ?? '';
    const len = rootHtml.length;
    if (len > 500) mounted = true;
    if (mounted && len === lastLen) {
      stable++;
      if (stable >= 2) break;
    } else {
      stable = 0;
    }
    lastLen = len;
  }
  if (!mounted) {
    throw new Error(`React did not mount for ${route} (root stayed empty)`);
  }
  // One last tick so trailing effects (SEOHead title/meta) flush.
  await sleep(300);

  const out = dom.serialize();
  const outPath =
    route === '/'
      ? join(distDir, 'index.html')
      : join(distDir, route.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, out);
  console.log(
    `OK ${route} title=${JSON.stringify(window.document.title)} bytes=${out.length}`
  );
}

main().catch((err) => {
  console.error(`FAIL ${route}: ${err?.message ?? err}`);
  process.exit(1);
});
