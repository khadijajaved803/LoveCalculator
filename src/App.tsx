import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages — code-split so each route ships its own chunk instead of one
// ~1.6 MB bundle. Every page is a named export.
//
// WHY NOT React.lazy: lazy() ALWAYS suspends on first render — even when
// the chunk was preloaded, its .then() chain is still pending for a
// microtask, so the Suspense "Loading…" fallback flashes. Preloading a
// lazy chunk therefore cannot remove the flash (verified live: the flash
// stayed ~1s). Instead each page is built with createPage(): the chunk is
// loaded once, the resolved component is cached, and the rendered
// component returns it SYNCHRONOUSLY when cached — no suspension, no
// fallback, no flash. React.lazy is only the fallback path, used when the
// chunk was never preloaded (e.g. a click in the first seconds, or a
// failed preload). The prerender still renders every route fully: the
// worker imports the bundle in Node, where these dynamic imports resolve
// to the chunk files on disk.
type PageComponent = React.ComponentType<any>;

function createPage<T extends Record<string, unknown>>(
  load: () => Promise<T>,
  pick: (m: T) => PageComponent,
): { Component: React.FC<any>; preload: () => Promise<void> } {
  let cached: PageComponent | null = null;
  let promise: Promise<void> | null = null;
  const preload = (): Promise<void> => {
    if (!promise) {
      promise = load()
        .then((m) => {
          cached = pick(m);
        })
        .catch((err) => {
          // Let a later call retry instead of caching the failure.
          promise = null;
          throw err;
        });
    }
    return promise;
  };
  const LazyComp = lazy(() =>
    preload().then(() => ({ default: cached as PageComponent })),
  );
  const Component: React.FC<any> = (props) => {
    if (cached) {
      const C = cached;
      return <C {...props} />;
    }
    return <LazyComp {...props} />;
  };
  return { Component, preload };
}

const { Component: HomePage, preload: loadHomePage } = createPage(() => import('./pages/HomePage'), (m) => m.HomePage);
const { Component: LoveCalculatorPage, preload: loadLoveCalculatorPage } = createPage(() => import('./pages/LoveCalculatorPage'), (m) => m.LoveCalculatorPage);
const { Component: FlamesPage, preload: loadFlamesPage } = createPage(() => import('./pages/FlamesPage'), (m) => m.FlamesPage);
const { Component: FriendshipPage, preload: loadFriendshipPage } = createPage(() => import('./pages/FriendshipPage'), (m) => m.FriendshipPage);
const { Component: DobCalculatorPage, preload: loadDobCalculatorPage } = createPage(() => import('./pages/DobCalculatorPage'), (m) => m.DobCalculatorPage);
const { Component: MarriageCalculatorPage, preload: loadMarriageCalculatorPage } = createPage(() => import('./pages/MarriageCalculatorPage'), (m) => m.MarriageCalculatorPage);
const { Component: AstrologyPage, preload: loadAstrologyPage } = createPage(() => import('./pages/AstrologyPage'), (m) => m.AstrologyPage);
const { Component: NumerologyPage, preload: loadNumerologyPage } = createPage(() => import('./pages/NumerologyPage'), (m) => m.NumerologyPage);
const { Component: LovePercentageOnPaperPage, preload: loadLovePercentageOnPaperPage } = createPage(() => import('./pages/LovePercentageOnPaperPage'), (m) => m.LovePercentageOnPaperPage);
const { Component: CrushCalculatorPage, preload: loadCrushCalculatorPage } = createPage(() => import('./pages/CrushCalculatorPage'), (m) => m.CrushCalculatorPage);
const { Component: NameCompatibilityPage, preload: loadNameCompatibilityPage } = createPage(() => import('./pages/NameCompatibilityPage'), (m) => m.NameCompatibilityPage);
const { Component: NameNumerologyPage, preload: loadNameNumerologyPage } = createPage(() => import('./pages/NameNumerologyPage'), (m) => m.NameNumerologyPage);
const { Component: KundaliMatchingPage, preload: loadKundaliMatchingPage } = createPage(() => import('./pages/KundaliMatchingPage'), (m) => m.KundaliMatchingPage);
const { Component: KundaliPage, preload: loadKundaliPage } = createPage(() => import('./pages/KundaliPage'), (m) => m.KundaliPage);
const { Component: ZodiacSignsPage, preload: loadZodiacSignsPage } = createPage(() => import('./pages/ZodiacSignsPage'), (m) => m.ZodiacSignsPage);
const { Component: RashifalTodayPage, preload: loadRashifalTodayPage } = createPage(() => import('./pages/RashifalTodayPage'), (m) => m.RashifalTodayPage);
const { Component: LoveLanguagePage, preload: loadLoveLanguagePage } = createPage(() => import('./pages/LoveLanguagePage'), (m) => m.LoveLanguagePage);
const { Component: NumerologyCalculatorPage, preload: loadNumerologyCalculatorPage } = createPage(() => import('./pages/NumerologyCalculatorPage'), (m) => m.NumerologyCalculatorPage);
const { Component: PoruthamPage, preload: loadPoruthamPage } = createPage(() => import('./pages/PoruthamPage'), (m) => m.PoruthamPage);
const { Component: BirthChartPage, preload: loadBirthChartPage } = createPage(() => import('./pages/BirthChartPage'), (m) => m.BirthChartPage);
const { Component: LifePathPage, preload: loadLifePathPage } = createPage(() => import('./pages/LifePathPage'), (m) => m.LifePathPage);
const { Component: LoveHoroscopePage, preload: loadLoveHoroscopePage } = createPage(() => import('./pages/LoveHoroscopePage'), (m) => m.LoveHoroscopePage);
const { Component: WhenWillIGetMarriedPage, preload: loadWhenWillIGetMarriedPage } = createPage(() => import('./pages/WhenWillIGetMarriedPage'), (m) => m.WhenWillIGetMarriedPage);
const { Component: LoveCompatibilityZodiacPage, preload: loadLoveCompatibilityZodiacPage } = createPage(() => import('./pages/LoveCompatibilityZodiacPage'), (m) => m.LoveCompatibilityZodiacPage);
const { Component: BlogIndexPage, preload: loadBlogIndexPage } = createPage(() => import('./pages/BlogIndexPage'), (m) => m.BlogIndexPage);
const { Component: BlogPostPage, preload: loadBlogPostPage } = createPage(() => import('./pages/BlogPostPage'), (m) => m.BlogPostPage);
const { Component: AboutPage, preload: loadAboutPage } = createPage(() => import('./pages/AboutPage'), (m) => m.AboutPage);
const { Component: ContactPage, preload: loadContactPage } = createPage(() => import('./pages/ContactPage'), (m) => m.ContactPage);
const { Component: PrivacyPage, preload: loadPrivacyPage } = createPage(() => import('./pages/PrivacyPage'), (m) => m.PrivacyPage);
const { Component: TermsPage, preload: loadTermsPage } = createPage(() => import('./pages/TermsPage'), (m) => m.TermsPage);
const { Component: DisclaimerPage, preload: loadDisclaimerPage } = createPage(() => import('./pages/DisclaimerPage'), (m) => m.DisclaimerPage);

// All page loaders, for idle preloading after mount (see the App effect
// below). Warming every chunk once the app is interactive makes in-app
// navigation resolve instantly — no "Loading…" fallback on click either.
const allPageLoaders = [
  loadHomePage,
  loadLoveCalculatorPage,
  loadFlamesPage,
  loadFriendshipPage,
  loadDobCalculatorPage,
  loadMarriageCalculatorPage,
  loadAstrologyPage,
  loadNumerologyPage,
  loadLovePercentageOnPaperPage,
  loadCrushCalculatorPage,
  loadNameCompatibilityPage,
  loadNameNumerologyPage,
  loadKundaliMatchingPage,
  loadKundaliPage,
  loadZodiacSignsPage,
  loadRashifalTodayPage,
  loadLoveLanguagePage,
  loadNumerologyCalculatorPage,
  loadPoruthamPage,
  loadBirthChartPage,
  loadLifePathPage,
  loadLoveHoroscopePage,
  loadWhenWillIGetMarriedPage,
  loadLoveCompatibilityZodiacPage,
  loadBlogIndexPage,
  loadBlogPostPage,
  loadAboutPage,
  loadContactPage,
  loadPrivacyPage,
  loadTermsPage,
  loadDisclaimerPage,
];

// Warm every page chunk in the background. Each loader swallows its own
// failure, so one bad chunk can't break the rest.
export function preloadAllPages(): void {
  for (const load of allPageLoaders) {
    load().catch(() => {});
  }
}

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  // Ensure starts with / and ends with /
  let clean = path.trim();
  if (!clean.startsWith('/')) clean = `/${clean}`;
  if (!clean.endsWith('/')) clean = `${clean}/`;
  return clean;
}

// Preload the chunk for a path (same route table as renderPage, aliases
// included). Resolves instantly when the chunk is already loaded; resolves
// to undefined for unknown paths (the 404 fallback needs no chunk).
// main.tsx awaits this before mounting so the first render never suspends.
export function preloadPageForPath(path: string): Promise<unknown> {
  const currentPath = normalizePath(path);

  // Blog Post route: /blog/:slug/
  if (/^\/blog\/[^/]+\/$/.test(currentPath)) {
    return loadBlogPostPage();
  }

  switch (currentPath) {
    case '/':
      return loadHomePage();
    case '/love-calculator/':
    case '/love-calculator-by-name/':
    case '/love-percentage-calculator/':
    case '/true-love-calculator/':
    case '/love-compatibility-calculator/':
      return loadLoveCalculatorPage();
    case '/name-compatibility/':
      return loadNameCompatibilityPage();
    case '/crush-calculator/':
      return loadCrushCalculatorPage();
    case '/flames-calculator/':
      return loadFlamesPage();
    case '/love-percentage-on-paper/':
    case '/how-to-calculate-love-percentage/':
      return loadLovePercentageOnPaperPage();
    case '/friendship-calculator/':
      return loadFriendshipPage();
    case '/love-calculator-by-date-of-birth/':
    case '/love-compatibility-by-date-of-birth/':
      return loadDobCalculatorPage();
    case '/love-or-arranged-marriage-calculator/':
    case '/marriage-prediction/':
      return loadMarriageCalculatorPage();
    case '/kundali/':
      return loadKundaliPage();
    case '/kundali-matching/':
      return loadKundaliMatchingPage();
    case '/love-language-test/':
    case '/love-languages-test/':
    case '/love-language-quiz/':
      return loadLoveLanguagePage();
    case '/astrology/':
      return loadAstrologyPage();
    case '/birth-chart-calculator/':
    case '/astrology/birth-chart-calculator/':
    case '/natal-chart-calculator/':
      return loadBirthChartPage();
    case '/porutham/':
    case '/thirumana-porutham/':
    case '/jathagam-porutham/':
      return loadPoruthamPage();
    case '/zodiac-signs/':
      return loadZodiacSignsPage();
    case '/rashifal-today/':
      return loadRashifalTodayPage();
    case '/numerology/':
      return loadNumerologyPage();
    case '/numerology-calculator/':
    case '/numerology/numerology-calculator/':
      return loadNumerologyCalculatorPage();
    case '/numerology/name-numerology/':
    case '/name-numerology/':
      return loadNameNumerologyPage();
    case '/life-path-calculator/':
      return loadLifePathPage();
    case '/love-horoscope/':
      return loadLoveHoroscopePage();
    case '/when-will-i-get-married/':
      return loadWhenWillIGetMarriedPage();
    case '/love-compatibility-by-zodiac-sign/':
      return loadLoveCompatibilityZodiacPage();
    case '/blog/':
      return loadBlogIndexPage();
    case '/about/':
      return loadAboutPage();
    case '/contact/':
      return loadContactPage();
    case '/privacy-policy/':
      return loadPrivacyPage();
    case '/terms/':
      return loadTermsPage();
    case '/disclaimer/':
      return loadDisclaimerPage();
    default:
      return Promise.resolve(undefined);
  }
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return normalizePath(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // After first paint, warm all page chunks while the browser is idle, so
  // clicking any link resolves instantly instead of showing the "Loading…"
  // fallback. Skipped when the document isn't visible — the jsdom
  // prerender reports visibilityState "prerender", so the build doesn't
  // pay for warming every route's chunk 37 times over.
  useEffect(() => {
    if (typeof document === 'undefined' || document.visibilityState !== 'visible') return;
    const preload = () => preloadAllPages();
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preload, { timeout: 5000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = setTimeout(preload, 2000);
    return () => clearTimeout(t);
  }, []);

  const handleNavigate = (path: string) => {
    const normalized = normalizePath(path);
    if (normalized !== currentPath) {
      window.history.pushState({}, '', normalized);
      setCurrentPath(normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route Resolver
  const renderPage = () => {
    // Blog Post route check: /blog/:slug/
    const blogMatch = currentPath.match(/^\/blog\/([^/]+)\/$/);
    if (blogMatch) {
      const slug = blogMatch[1];
      return <BlogPostPage slug={slug} onNavigate={handleNavigate} />;
    }

    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={handleNavigate} />;
      case '/love-calculator/':
      case '/love-calculator-by-name/':
      case '/love-percentage-calculator/':
      case '/true-love-calculator/':
      case '/love-compatibility-calculator/':
        return <LoveCalculatorPage onNavigate={handleNavigate} />;
      case '/name-compatibility/':
        return <NameCompatibilityPage onNavigate={handleNavigate} />;
      case '/crush-calculator/':
        return <CrushCalculatorPage onNavigate={handleNavigate} />;
      case '/flames-calculator/':
        return <FlamesPage onNavigate={handleNavigate} />;
      case '/love-percentage-on-paper/':
      case '/how-to-calculate-love-percentage/':
        return <LovePercentageOnPaperPage onNavigate={handleNavigate} />;
      case '/friendship-calculator/':
        return <FriendshipPage onNavigate={handleNavigate} />;
      case '/love-calculator-by-date-of-birth/':
      case '/love-compatibility-by-date-of-birth/':
        return <DobCalculatorPage onNavigate={handleNavigate} />;
      case '/love-or-arranged-marriage-calculator/':
      case '/marriage-prediction/':
        return <MarriageCalculatorPage onNavigate={handleNavigate} />;
      case '/kundali/':
        return <KundaliPage onNavigate={handleNavigate} />;
      case '/kundali-matching/':
        return <KundaliMatchingPage onNavigate={handleNavigate} />;
      case '/love-language-test/':
      case '/love-languages-test/':
      case '/love-language-quiz/':
        return <LoveLanguagePage onNavigate={handleNavigate} />;
      case '/astrology/':
        return <AstrologyPage onNavigate={handleNavigate} />;
      case '/birth-chart-calculator/':
      case '/astrology/birth-chart-calculator/':
      case '/natal-chart-calculator/':
        return <BirthChartPage onNavigate={handleNavigate} />;
      case '/porutham/':
      case '/thirumana-porutham/':
      case '/jathagam-porutham/':
        return <PoruthamPage onNavigate={handleNavigate} />;
      case '/zodiac-signs/':
        return <ZodiacSignsPage onNavigate={handleNavigate} />;
      case '/rashifal-today/':
        return <RashifalTodayPage onNavigate={handleNavigate} />;
      case '/numerology/':
        return <NumerologyPage onNavigate={handleNavigate} />;
      case '/numerology-calculator/':
      case '/numerology/numerology-calculator/':
        return <NumerologyCalculatorPage onNavigate={handleNavigate} />;
      case '/numerology/name-numerology/':
      case '/name-numerology/':
        return <NameNumerologyPage onNavigate={handleNavigate} />;
      case '/life-path-calculator/':
        return <LifePathPage onNavigate={handleNavigate} />;
      case '/love-horoscope/':
        return <LoveHoroscopePage onNavigate={handleNavigate} />;
      case '/when-will-i-get-married/':
        return <WhenWillIGetMarriedPage onNavigate={handleNavigate} />;
      case '/love-compatibility-by-zodiac-sign/':
        return <LoveCompatibilityZodiacPage onNavigate={handleNavigate} />;
      case '/blog/':
        return <BlogIndexPage onNavigate={handleNavigate} />;
      case '/about/':
        return <AboutPage onNavigate={handleNavigate} />;
      case '/contact/':
        return <ContactPage onNavigate={handleNavigate} />;
      case '/privacy-policy/':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case '/terms/':
        return <TermsPage onNavigate={handleNavigate} />;
      case '/disclaimer/':
        return <DisclaimerPage onNavigate={handleNavigate} />;
      default:
        // Fallback to Home or 404
        return (
          <div className="max-w-md mx-auto px-4 py-24 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-3">
              Page Not Found
            </h1>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              We couldn&apos;t find the calculator or guide at this URL.
            </p>
            <button
              type="button"
              onClick={() => handleNavigate('/')}
              className="px-6 py-3 rounded-xl bg-rose-600 text-white font-semibold text-xs shadow-sm hover:bg-rose-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      <Header currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-md mx-auto px-4 py-24 text-center">
              <p className="text-sm text-slate-500">Loading…</p>
            </div>
          }
        >
          {renderPage()}
        </Suspense>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
