import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { LoveCalculatorPage } from './pages/LoveCalculatorPage';
import { FlamesPage } from './pages/FlamesPage';
import { FriendshipPage } from './pages/FriendshipPage';
import { DobCalculatorPage } from './pages/DobCalculatorPage';
import { MarriageCalculatorPage } from './pages/MarriageCalculatorPage';
import { AstrologyPage } from './pages/AstrologyPage';
import { NumerologyPage } from './pages/NumerologyPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';

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
      case '/flames-calculator/':
        return <FlamesPage onNavigate={handleNavigate} />;
      case '/friendship-calculator/':
        return <FriendshipPage onNavigate={handleNavigate} />;
      case '/love-calculator-by-date-of-birth/':
        return <DobCalculatorPage onNavigate={handleNavigate} />;
      case '/love-or-arranged-marriage-calculator/':
        return <MarriageCalculatorPage onNavigate={handleNavigate} />;
      case '/astrology/':
        return <AstrologyPage onNavigate={handleNavigate} />;
      case '/numerology/':
        return <NumerologyPage onNavigate={handleNavigate} />;
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
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
