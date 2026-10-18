import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

interface StaticRoute {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  schema?: object;
}

const routes: StaticRoute[] = [
  {
    path: '/friendship-calculator/',
    title: 'Friendship Calculator by Name - Best Friend Compatibility Test',
    description: 'Calculate true friendship percentage and best friend compatibility by name with CalculateLove. Test mutual loyalty, secret-keeping score & get Dosti cards.',
    h1: 'Friendship Calculator by Name & Best Friend Compatibility Test',
    intro: 'Calculate your friendship percentage, bestie loyalty score, and secret-keeping quotient. Enter two names to test mutual vibe and download shareable Dosti Pact cards.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Friendship Calculator by Name - Best Friend Compatibility Test',
      'url': 'https://calculatelove.online/friendship-calculator/',
      'description': 'Free online friendship calculator and best friend loyalty compatibility test by name with custom shareable Dosti Pact cards.',
      'applicationCategory': 'EntertainmentApplication',
      'operatingSystem': 'All',
    },
  },
  {
    path: '/flames-calculator/',
    title: 'FLAMES Calculator Online - Authentic Crush & Relationship Game',
    description: 'Play the authentic FLAMES calculator game online with letter cancellation. Test your crush for Friends, Lovers, Affection, Marriage, Enemies, or Siblings.',
    h1: 'FLAMES Calculator - Authentic Crush & Relationship Game',
    intro: 'The authentic school & college FLAMES test! Discover your crush outcome with transparent letter elimination, relationship insights, and shareable result cards.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'FLAMES Calculator Online - Authentic Crush & Relationship Game',
      'url': 'https://calculatelove.online/flames-calculator/',
      'description': 'Play the authentic FLAMES calculator game online with step-by-step letter elimination and downloadable relationship certificates.',
      'applicationCategory': 'EntertainmentApplication',
      'operatingSystem': 'All',
    },
  },
  {
    path: '/love-or-arranged-marriage-calculator/',
    title: 'Love or Arranged Marriage Calculator - Shaadi Compatibility Test',
    description: 'Will you have a love marriage or arranged marriage? Test your matrimonial alignment, family blessing harmony, and partner compatibility with CalculateLove.',
    h1: 'Love or Arranged Marriage Calculator & Shaadi Match Test',
    intro: 'Will your future be a self-discovered love marriage or a family-guided arranged alliance? Test your marriage alignment, family harmony, and partner compatibility.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Love or Arranged Marriage Calculator - Shaadi Compatibility Test',
      'url': 'https://calculatelove.online/love-or-arranged-marriage-calculator/',
      'description': 'Free love or arranged marriage compatibility test analyzing matrimonial balance, partner romance, family blessing, and shaadi alignment.',
      'applicationCategory': 'EntertainmentApplication',
      'operatingSystem': 'All',
    },
  },
  {
    path: '/love-calculator-by-date-of-birth/',
    title: 'Love Calculator by Date of Birth - Life Path Compatibility Test',
    description: 'Calculate love compatibility by date of birth and Life Path numerology match (1-9) with CalculateLove. Discover your shared destiny and cosmic connection.',
    h1: 'Love Calculator by Date of Birth & Life Path Compatibility',
    intro: 'Discover your romantic compatibility through birth dates and Life Path numerology (1 to 9). Check cosmic harmony, emotional synergy, and personalized relationship forecasts.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Love Calculator by Date of Birth - Life Path Compatibility Test',
      'url': 'https://calculatelove.online/love-calculator-by-date-of-birth/',
      'description': 'Free date of birth love calculator and Life Path numerology compatibility test between two partners with personalized relationship predictions.',
      'applicationCategory': 'EntertainmentApplication',
      'operatingSystem': 'All',
    },
  },
  {
    path: '/love-calculator/',
    title: 'Love Calculator - True Love Percentage by Name & Compatibility Test',
    description: 'Calculate true love percentage between two names with CalculateLove. Test name compatibility, couple vibes, communication harmony, and download shareable love cards.',
    h1: 'True Love Calculator by Name & Love Percentage Test',
    intro: 'Test real love percentage, character sound harmony, and 4-pillar relationship compatibility between two names. Fast, deterministic, and 100% private.',
  },
  {
    path: '/love-calculator-by-name/',
    title: 'Love Calculator by Name - Name Matching & Couple Harmony',
    description: 'Test couple compatibility using first and full names. Discover character resonance, phonetic harmony, and deep connection at CalculateLove.',
    h1: 'Love Calculator by Name - Character & Phonetic Harmony',
    intro: 'Calculate name-based love percentage and sound resonance between two partners.',
  },
  {
    path: '/love-percentage-calculator/',
    title: 'Love Percentage Calculator - Accurate Couple Love Meter',
    description: 'Calculate accurate love percentage score (0-100%) between two people with CalculateLove. Detailed compatibility score breakdowns and advice.',
    h1: 'Love Percentage Calculator & Relationship Compatibility Meter',
    intro: 'Discover your love percentage score with multidimensional relationship breakdowns.',
  },
  {
    path: '/true-love-calculator/',
    title: 'True Love Calculator & Soulmate Compatibility Test',
    description: 'Discover your soulmate connection and true love potential with CalculateLove. Test mutual emotional chemistry and soulmate resonance.',
    h1: 'True Love & Soulmate Compatibility Calculator',
    intro: 'Measure genuine emotional connection and soulmate harmony between two names.',
  },
  {
    path: '/love-compatibility-calculator/',
    title: 'Love Compatibility Calculator - Full Relationship Alignment',
    description: 'Comprehensive love compatibility test evaluating communication, emotional harmony, passion, and long-term commitment at CalculateLove.',
    h1: 'Comprehensive Love Compatibility & Relationship Alignment',
    intro: 'Evaluate your romantic connection across all four relationship pillars.',
  },
  {
    path: '/astrology/',
    title: 'Astrology Love Calculator & Zodiac Compatibility Guide',
    description: 'Explore Western sun sign and Vedic Rashi elemental compatibility frameworks at CalculateLove. Free zodiac harmony insights.',
    h1: 'Astrology Love Calculator & Zodiac Compatibility Hub',
    intro: 'Explore elemental harmony and planetary alignment across all twelve zodiac signs.',
  },
  {
    path: '/numerology/',
    title: 'Numerology Love Compatibility & Life Path Numbers Hub',
    description: 'Discover Pythagorean Life Path resonance (1-9) and Chaldean sound vibration fundamentals for relationship compatibility at CalculateLove.',
    h1: 'Numerology Love Compatibility & Life Path Vibration Hub',
    intro: 'Learn how birth numbers and name vibrations influence romantic harmony and relationship destiny.',
  },
  {
    path: '/blog/',
    title: 'Relationship Guides, FLAMES & Compatibility Articles | CalculateLove',
    description: 'Explore expert guides on love calculation formulas, authentic FLAMES game rules, love vs arranged marriages, and Life Path compatibility.',
    h1: 'Relationship Wisdom, Guides & Calculator Insights',
    intro: 'Deepen your relationship understanding with expert editorial guides and compatibility deep-dives.',
  },
  {
    path: '/about/',
    title: 'About CalculateLove - Purpose, Team & Calculator Methodology',
    description: 'Learn about CalculateLove, our mission to deliver deterministic relationship calculators, mathematical formulas, and privacy-first architecture.',
    h1: 'About CalculateLove',
    intro: 'Our story, methodology, and dedication to privacy-friendly relationship exploration tools.',
  },
  {
    path: '/contact/',
    title: 'Contact CalculateLove - Feedback & Relationship Inquiries',
    description: 'Reach out to the CalculateLove team for feedback, calculator suggestions, partnerships, or support.',
    h1: 'Contact Our Team',
    intro: 'Have a question or suggestion? We would love to hear from you.',
  },
  {
    path: '/privacy-policy/',
    title: 'Privacy Policy - Zero-Data Retention Promise | CalculateLove',
    description: 'CalculateLove guarantees 100% private, on-device calculation. We never store names, birthdates, or calculator inputs.',
    h1: 'Privacy Policy & Zero-Data Retention',
    intro: 'Your privacy is our priority. Discover how CalculateLove protects your information.',
  },
  {
    path: '/terms/',
    title: 'Terms of Service | CalculateLove',
    description: 'Terms and conditions for using CalculateLove calculators, games, and relationship content.',
    h1: 'Terms of Service',
    intro: 'Terms of use governing our website, calculators, and entertainment tools.',
  },
  {
    path: '/disclaimer/',
    title: 'Entertainment & Advisory Disclaimer | CalculateLove',
    description: 'Read the entertainment disclaimer for CalculateLove calculators, FLAMES tests, and relationship compatibility tools.',
    h1: 'Entertainment Disclaimer',
    intro: 'Important information regarding the entertainment and informational purpose of our tools.',
  },
];

// Blog posts
const blogPosts = [
  {
    slug: 'how-love-calculator-works',
    title: 'How Online Love Calculators Work: Formulas, Names & Compatibility',
    description: 'Understand the mathematics behind name-based love calculators, character hashing, and why deterministic matching offers fun relationship insights.',
  },
  {
    slug: 'what-does-love-percentage-mean',
    title: 'What Does Your Love Percentage Score Really Mean? A Complete Guide',
    description: 'Received a 75% or 95% love score? Discover how compatibility percentages translate to communication, emotional security, and shared goals.',
  },
  {
    slug: 'love-vs-arranged-marriage',
    title: 'Love Marriage vs. Arranged Marriage: Compatibility in Modern India',
    description: 'Explore the modern evolution of Indian matrimonial partnerships, blending romance with family blessing, and testing your relationship alignment.',
  },
  {
    slug: 'how-flames-calculator-works',
    title: 'The Origin of FLAMES: How the Classic Indian Love Game Works',
    description: 'Discover the full form, history, and mathematical elimination logic of the beloved FLAMES game played in Indian school notebooks.',
  },
  {
    slug: 'love-compatibility-by-date-of-birth',
    title: 'Love Compatibility by Date of Birth: Life Path Numbers & Harmony',
    description: 'Discover how Pythagorean Life Path numbers (1 to 9) reveal romantic compatibility, communication chemistry, and long-term harmony.',
  },
  {
    slug: 'what-is-a-soulmate',
    title: 'What Is a Soulmate? Psychology, Signs, and Emotional Connection',
    description: 'Learn the emotional and psychological indicators of genuine soul connections, beyond idealistic myths and fairy tales.',
  },
  {
    slug: 'friendship-compatibility-guide',
    title: 'Friendship Compatibility: What Makes Best Friends Last a Lifetime?',
    description: 'Explore the psychology of platonic chemistry, mutual loyalty, vulnerability, and why best friend compatibility is foundational for happiness.',
  },
];

for (const blog of blogPosts) {
  routes.push({
    path: `/blog/${blog.slug}/`,
    title: `${blog.title} | CalculateLove`,
    description: blog.description,
    h1: blog.title,
    intro: blog.description,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': blog.title,
      'description': blog.description,
      'url': `https://calculatelove.online/blog/${blog.slug}/`,
      'publisher': {
        '@type': 'Organization',
        'name': 'CalculateLove',
        'url': 'https://calculatelove.online/',
      },
    },
  });
}

function generateStaticPages() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`dist/index.html not found at ${indexHtmlPath}`);
    return;
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  console.log(`Generating ${routes.length} static SEO pages...`);

  for (const route of routes) {
    const canonicalUrl = `https://calculatelove.online${route.path}`;
    
    // Clean target dir: e.g. dist/friendship-calculator/
    const routeDir = path.join(distDir, route.path.replace(/^\/|\/$/g, ''));
    fs.mkdirSync(routeDir, { recursive: true });

    let pageHtml = baseHtml;

    // 1. Replace <title>
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

    // 2. Replace meta description
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // 3. Replace canonical
    pageHtml = pageHtml.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // 4. Replace OG tags
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // 5. Replace Twitter tags
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // 6. Inject page-specific JSON-LD Schema
    if (route.schema) {
      const schemaScript = `\n    <script id="page-structured-data" type="application/ld+json">\n    ${JSON.stringify(route.schema, null, 2)}\n    </script>\n  </head>`;
      pageHtml = pageHtml.replace(/<\/head>/i, schemaScript);
    }

    // 7. Inject crawlable pre-rendered SEO content inside <div id="root">
    const crawlableContent = `
      <div class="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <header class="border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 py-3">
          <div class="max-w-6xl mx-auto flex items-center justify-between">
            <a href="/" class="flex items-center gap-2 font-display font-bold text-slate-900">
              <span class="text-rose-600 font-extrabold text-xl">CalculateLove</span>
            </a>
            <nav class="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-600">
              <a href="/love-calculator/" class="hover:text-rose-600">Love Calculator</a>
              <a href="/flames-calculator/" class="hover:text-rose-600">FLAMES Game</a>
              <a href="/friendship-calculator/" class="hover:text-rose-600">Friendship Calculator</a>
              <a href="/love-or-arranged-marriage-calculator/" class="hover:text-rose-600">Marriage Match</a>
              <a href="/love-calculator-by-date-of-birth/" class="hover:text-rose-600">DOB Match</a>
            </nav>
          </div>
        </header>
        <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div class="text-center max-w-3xl mx-auto mb-10">
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
              ${route.h1}
            </h1>
            <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
              ${route.intro}
            </p>
          </div>
        </main>
      </div>
    `.trim();

    pageHtml = pageHtml.replace(
      /<div id=["']root["']><\/div>/i,
      `<div id="root">${crawlableContent}</div>`
    );

    const targetFile = path.join(routeDir, 'index.html');
    fs.writeFileSync(targetFile, pageHtml, 'utf8');
    console.log(`Generated: ${route.path} -> ${targetFile}`);
  }

  console.log('Static SEO pages generation complete!');
}

generateStaticPages();
