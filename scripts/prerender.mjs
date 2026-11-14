// Prerender step — runs after `vite build` and writes a fully-rendered static
// HTML file per sitemap route into dist/ (dist/<route>/index.html).
// Each route is rendered in its own Node child process (scripts/prerender-worker.mjs)
// where the built bundle is executed against a jsdom DOM at that route's URL,
// so React mounts and all useEffect hooks (including SEOHead's title/meta/
// canonical/OG/JSON-LD injection) run exactly as in a browser. The serialized
// HTML keeps the <script type="module"> bundle tag, so the client app still
// boots and hydrates normally in a real browser.
//
// Wired into the build: `npm run build` = `vite build && node scripts/prerender.mjs`
// so Vercel produces the static HTML on every deploy. No vercel.json change is
// needed: Vercel checks the filesystem before applying rewrites, so a real
// dist/<route>/index.html is served for that route and the SPA catch-all
// rewrite only fires for unknown paths.
import { execFile } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const CONCURRENCY = 4;

function routesFromSitemap() {
  const xml = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8');
  const urls = [...xml.matchAll(/<loc>https:\/\/calculatelove\.online([^<]*)<\/loc>/g)].map(
    (m) => m[1]
  );
  if (urls.length === 0) throw new Error('No routes found in public/sitemap.xml');
  return urls;
}

function bundleFromShell(shellHtml) {
  const m = shellHtml.match(/<script[^>]*type="module"[^>]*src="([^"]+)"[^>]*>/)
    || shellHtml.match(/<script[^>]*src="([^"]+)"[^>]*type="module"[^>]*>/);
  if (!m) throw new Error('No <script type="module"> bundle found in dist/index.html');
  const src = m[1].replace(/^\//, '');
  const bundle = join(DIST, src);
  try {
    readFileSync(bundle);
  } catch {
    throw new Error(`Bundle not found on disk: ${bundle}`);
  }
  return bundle;
}

function runWorker(route, shellPath, bundle) {
  return new Promise((resolvePromise) => {
    execFile(
      process.execPath,
      [join(ROOT, 'scripts', 'prerender-worker.mjs'), route, DIST, shellPath, bundle],
      { timeout: 120000 },
      (err, stdout, stderr) => {
        const out = (stdout || '').trim();
        if (err) {
          resolvePromise({ route, ok: false, error: (stderr || err.message).trim().split('\n').pop() });
        } else {
          resolvePromise({ route, ok: true, detail: out });
        }
      }
    );
  });
}

async function main() {
  const routes = routesFromSitemap();
  const shellHtml = readFileSync(join(DIST, 'index.html'), 'utf8');
  const bundle = bundleFromShell(shellHtml);

  // Snapshot the shell BEFORE any worker overwrites dist/index.html (the '/'
  // route), so every route renders from the same unmounted template.
  const tmp = mkdtempSync(join(tmpdir(), 'calculatelove-prerender-'));
  const shellPath = join(tmp, 'shell.html');
  writeFileSync(shellPath, shellHtml);

  console.log(`Prerendering ${routes.length} routes from ${bundle} ...`);
  const results = [];
  let next = 0;
  const workers = Array.from({ length: Math.min(CONCURRENCY, routes.length) }, async () => {
    while (next < routes.length) {
      const route = routes[next++];
      const res = await runWorker(route, shellPath, bundle);
      results.push(res);
      console.log(res.ok ? `  ${res.detail}` : `  FAIL ${route}: ${res.error}`);
    }
  });
  await Promise.all(workers);
  rmSync(tmp, { recursive: true, force: true });

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.error(`\nPrerender FAILED for ${failed.length}/${routes.length} routes:`);
    for (const f of failed) console.error(`  ${f.route}: ${f.error}`);
    process.exit(1);
  }
  console.log(`\nPrerender complete: ${results.length}/${routes.length} routes written to dist/`);
}

main().catch((err) => {
  console.error(`Prerender error: ${err?.message ?? err}`);
  process.exit(1);
});
