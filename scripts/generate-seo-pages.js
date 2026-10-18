import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf-8');

const pages = [
  {
    path: 'flames-calculator',
    title: 'FLAMES Calculator Online - Authentic Crush Matching & Love Game',
    description: 'Play the authentic FLAMES game online. Test crush compatibility with step-by-step letter elimination, discover your relationship outcome, and download custom cards.',
    canonical: 'https://calculatelove.online/flames-calculator/',
  },
  {
    path: 'friendship-calculator',
    title: 'Friendship Calculator - Best Friend Percentage & Loyalty Test',
    description: 'Calculate true friendship percentage and test bestie loyalty with CalculateLove. Check secret-keeping quotients, mutual banter, and download official Dosti Pact cards.',
    canonical: 'https://calculatelove.online/friendship-calculator/',
  },
  {
    path: 'love-calculator',
    title: 'Love Calculator - True Love Percentage by Name & Compatibility Test',
    description: 'Calculate true love percentage between two names with CalculateLove. Test name compatibility, couple vibes, communication harmony, and download shareable love cards.',
    canonical: 'https://calculatelove.online/love-calculator/',
  },
];

for (const page of pages) {
  let html = baseHtml;

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`);

  // Replace <meta name="description" content="..." />
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
    `<meta name="description" content="${page.description}" />`
  );

  // Replace <link rel="canonical" href="..." />
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s,
    `<link rel="canonical" href="${page.canonical}" />`
  );

  // Replace og:title
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:title" content="${page.title}" />`
  );

  // Replace og:description
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:description" content="${page.description}" />`
  );

  // Replace twitter:title
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/s,
    `<meta name="twitter:title" content="${page.title}" />`
  );

  // Replace twitter:description
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/s,
    `<meta name="twitter:description" content="${page.description}" />`
  );

  const outDir = path.join(distDir, page.path);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  console.log(`Generated distinct SEO page: dist/${page.path}/index.html`);
}
