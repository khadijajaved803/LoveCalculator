import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages — lazy-loaded so each route ships its own chunk instead of one
// ~1.6 MB bundle. Every page is a named export, so each dynamic import
// maps it to `default` for React.lazy. The prerender still renders every
// route fully: the worker imports the bundle in Node, where these dynamic
// imports resolve to the chunk files on disk.
//
// Each page also has a named loader (loadXPage) shared by its lazy()
// wrapper AND by preloadPageForPath() below: main.tsx awaits the current
// route's loader BEFORE React mounts, so the first render never suspends
// on it and the "Loading…" fallback never flashes over the prerendered
// HTML. The fallback still shows for in-app navigation to a page whose
// chunk hasn't loaded yet — that's the correct behaviour there.
const loadHomePage = () => import('./pages/HomePage');
const loadLoveCalculatorPage = () => import('./pages/LoveCalculatorPage');
const loadFlamesPage = () => import('./pages/FlamesPage');
const loadFriendshipPage = () => import('./pages/FriendshipPage');
const loadDobCalculatorPage = () => import('./pages/DobCalculatorPage');
const loadMarriageCalculatorPage = () => import('./pages/MarriageCalculatorPage');
const loadAstrologyPage = () => import('./pages/AstrologyPage');
const loadNumerologyPage = () => import('./pages/NumerologyPage');
const loadLovePercentageOnPaperPage = () => import('./pages/LovePercentageOnPaperPage');
const loadCrushCalculatorPage = () => import('./pages/CrushCalculatorPage');
const loadNameCompatibilityPage = () => import('./pages/NameCompatibilityPage');
const loadNameNumerologyPage = () => import('./pages/NameNumerologyPage');
const loadKundaliMatchingPage = () => import('./pages/KundaliMatchingPage');
const loadKundaliPage = () => import('./pages/KundaliPage');
const loadZodiacSignsPage = () => import('./pages/ZodiacSignsPage');
const loadRashifalTodayPage = () => import('./pages/RashifalTodayPage');
const loadLoveLanguagePage = () => import('./pages/LoveLanguagePage');
const loadNumerologyCalculatorPage = () => import('./pages/NumerologyCalculatorPage');
const loadPoruthamPage = () => import('./pages/PoruthamPage');
const loadBirthChartPage = () => import('./pages/BirthChartPage');
const loadLifePathPage = () => import('./pages/LifePathPage');
const loadLoveHoroscopePage = () => import('./pages/LoveHoroscopePage');
const loadWhenWillIGetMarriedPage = () => import('./pages/WhenWillIGetMarriedPage');
const loadLoveCompatibilityZodiacPage = () => import('./pages/LoveCompatibilityZodiacPage');
const loadBlogIndexPage = () => import('./pages/BlogIndexPage');
const loadBlogPostPage = () => import('./pages/BlogPostPage');
const loadAboutPage = () => import('./pages/AboutPage');
const loadContactPage = () => import('./pages/ContactPage');
const loadPrivacyPage = () => import('./pages/PrivacyPage');
const loadTermsPage = () => import('./pages/TermsPage');
const loadDisclaimerPage = () => import('./pages/DisclaimerPage');

const HomePage = lazy(() => loadHomePage().then((m) => ({ default: m.HomePage })));
const LoveCalculatorPage = lazy(() => loadLoveCalculatorPage().then((m) => ({ default: m.LoveCalculatorPage })));
const FlamesPage = lazy(() => loadFlamesPage().then((m) => ({ default: m.FlamesPage })));
const FriendshipPage = lazy(() => loadFriendshipPage().then((m) => ({ default: m.FriendshipPage })));
const DobCalculatorPage = lazy(() => loadDobCalculatorPage().then((m) => ({ default: m.DobCalculatorPage })));
const MarriageCalculatorPage = lazy(() => loadMarriageCalculatorPage().then((m) => ({ default: m.MarriageCalculatorPage })));
const AstrologyPage = lazy(() => loadAstrologyPage().then((m) => ({ default: m.AstrologyPage })));
const NumerologyPage = lazy(() => loadNumerologyPage().then((m) => ({ default: m.NumerologyPage })));
const LovePercentageOnPaperPage = lazy(() => loadLovePercentageOnPaperPage().then((m) => ({ default: m.LovePercentageOnPaperPage })));
const CrushCalculatorPage = lazy(() => loadCrushCalculatorPage().then((m) => ({ default: m.CrushCalculatorPage })));
const NameCompatibilityPage = lazy(() => loadNameCompatibilityPage().then((m) => ({ default: m.NameCompatibilityPage })));
const NameNumerologyPage = lazy(() => loadNameNumerologyPage().then((m) => ({ default: m.NameNumerologyPage })));
const KundaliMatchingPage = lazy(() => loadKundaliMatchingPage().then((m) => ({ default: m.KundaliMatchingPage })));
const KundaliPage = lazy(() => loadKundaliPage().then((m) => ({ default: m.KundaliPage })));
const ZodiacSignsPage = lazy(() => loadZodiacSignsPage().then((m) => ({ default: m.ZodiacSignsPage })));
const RashifalTodayPage = lazy(() => loadRashifalTodayPage().then((m) => ({ default: m.RashifalTodayPage })));
const LoveLanguagePage = lazy(() => loadLoveLanguagePage().then((m) => ({ default: m.LoveLanguagePage })));
const NumerologyCalculatorPage = lazy(() => loadNumerologyCalculatorPage().then((m) => ({ default: m.NumerologyCalculatorPage })));
const PoruthamPage = lazy(() => loadPoruthamPage().then((m) => ({ default: m.PoruthamPage })));
const BirthChartPage = lazy(() => loadBirthChartPage().then((m) => ({ default: m.BirthChartPage })));
const LifePathPage = lazy(() => loadLifePathPage().then((m) => ({ default: m.LifePathPage })));
const LoveHoroscopePage = lazy(() => loadLoveHoroscopePage().then((m) => ({ default: m.LoveHoroscopePage })));
const WhenWillIGetMarriedPage = lazy(() => loadWhenWillIGetMarriedPage().then((m) => ({ default: m.WhenWillIGetMarriedPage })));
const LoveCompatibilityZodiacPage = lazy(() => loadLoveCompatibilityZodiacPage().then((m) => ({ default: m.LoveCompatibilityZodiacPage })));
const BlogIndexPage = lazy(() => loadBlogIndexPage().then((m) => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => loadBlogPostPage().then((m) => ({ default: m.BlogPostPage })));
const AboutPage = lazy(() => loadAboutPage().then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => loadContactPage().then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => loadPrivacyPage().then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => loadTermsPage().then((m) => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => loadDisclaimerPage().then((m) => ({ default: m.DisclaimerPage })));

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
