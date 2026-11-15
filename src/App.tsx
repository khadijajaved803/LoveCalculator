import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages — lazy-loaded so each route ships its own chunk instead of one
// ~1.6 MB bundle. Every page is a named export, so each dynamic import
// maps it to `default` for React.lazy. The prerender still renders every
// route fully: the worker imports the bundle in Node, where these dynamic
// imports resolve to the chunk files on disk.
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const LoveCalculatorPage = lazy(() => import('./pages/LoveCalculatorPage').then((m) => ({ default: m.LoveCalculatorPage })));
const FlamesPage = lazy(() => import('./pages/FlamesPage').then((m) => ({ default: m.FlamesPage })));
const FriendshipPage = lazy(() => import('./pages/FriendshipPage').then((m) => ({ default: m.FriendshipPage })));
const DobCalculatorPage = lazy(() => import('./pages/DobCalculatorPage').then((m) => ({ default: m.DobCalculatorPage })));
const MarriageCalculatorPage = lazy(() => import('./pages/MarriageCalculatorPage').then((m) => ({ default: m.MarriageCalculatorPage })));
const AstrologyPage = lazy(() => import('./pages/AstrologyPage').then((m) => ({ default: m.AstrologyPage })));
const NumerologyPage = lazy(() => import('./pages/NumerologyPage').then((m) => ({ default: m.NumerologyPage })));
const LovePercentageOnPaperPage = lazy(() => import('./pages/LovePercentageOnPaperPage').then((m) => ({ default: m.LovePercentageOnPaperPage })));
const CrushCalculatorPage = lazy(() => import('./pages/CrushCalculatorPage').then((m) => ({ default: m.CrushCalculatorPage })));
const NameCompatibilityPage = lazy(() => import('./pages/NameCompatibilityPage').then((m) => ({ default: m.NameCompatibilityPage })));
const NameNumerologyPage = lazy(() => import('./pages/NameNumerologyPage').then((m) => ({ default: m.NameNumerologyPage })));
const KundaliMatchingPage = lazy(() => import('./pages/KundaliMatchingPage').then((m) => ({ default: m.KundaliMatchingPage })));
const KundaliPage = lazy(() => import('./pages/KundaliPage').then((m) => ({ default: m.KundaliPage })));
const ZodiacSignsPage = lazy(() => import('./pages/ZodiacSignsPage').then((m) => ({ default: m.ZodiacSignsPage })));
const RashifalTodayPage = lazy(() => import('./pages/RashifalTodayPage').then((m) => ({ default: m.RashifalTodayPage })));
const LoveLanguagePage = lazy(() => import('./pages/LoveLanguagePage').then((m) => ({ default: m.LoveLanguagePage })));
const NumerologyCalculatorPage = lazy(() => import('./pages/NumerologyCalculatorPage').then((m) => ({ default: m.NumerologyCalculatorPage })));
const PoruthamPage = lazy(() => import('./pages/PoruthamPage').then((m) => ({ default: m.PoruthamPage })));
const BirthChartPage = lazy(() => import('./pages/BirthChartPage').then((m) => ({ default: m.BirthChartPage })));
const LifePathPage = lazy(() => import('./pages/LifePathPage').then((m) => ({ default: m.LifePathPage })));
const LoveHoroscopePage = lazy(() => import('./pages/LoveHoroscopePage').then((m) => ({ default: m.LoveHoroscopePage })));
const WhenWillIGetMarriedPage = lazy(() => import('./pages/WhenWillIGetMarriedPage').then((m) => ({ default: m.WhenWillIGetMarriedPage })));
const LoveCompatibilityZodiacPage = lazy(() => import('./pages/LoveCompatibilityZodiacPage').then((m) => ({ default: m.LoveCompatibilityZodiacPage })));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage').then((m) => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage').then((m) => ({ default: m.DisclaimerPage })));

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  // Ensure starts with / and ends with /
  let clean = path.trim();
  if (!clean.startsWith('/')) clean = `/${clean}`;
  if (!clean.endsWith('/')) clean = `${clean}/`;
  return clean;
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
