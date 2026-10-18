import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getLocaleFromPath, findRouteMapping, normalizePath, getEquivalentPath } from './i18n/routes';

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

  // Route Resolver supporting English (en-IN), Spanish (es), and Brazilian Portuguese (pt-BR)
  const renderPage = () => {
    const locale = getLocaleFromPath(currentPath);

    // Blog Post route check: /blog/:slug/, /es/blog/:slug/, /pt-br/blog/:slug/
    const blogMatch =
      currentPath.match(/^\/blog\/([^/]+)\/$/) ||
      currentPath.match(/^\/es\/blog\/([^/]+)\/$/) ||
      currentPath.match(/^\/pt-br\/blog\/([^/]+)\/$/);

    if (blogMatch) {
      const slug = blogMatch[1];
      return <BlogPostPage slug={slug} onNavigate={handleNavigate} locale={locale} />;
    }

    const route = findRouteMapping(currentPath);
    const routeId = route ? route.id : null;

    if (routeId) {
      switch (routeId) {
        case 'home':
          return <HomePage onNavigate={handleNavigate} locale={locale} />;
        case 'love-calculator':
          return <LoveCalculatorPage onNavigate={handleNavigate} locale={locale} />;
        case 'flames':
          return <FlamesPage onNavigate={handleNavigate} locale={locale} />;
        case 'friendship':
          return <FriendshipPage onNavigate={handleNavigate} locale={locale} />;
        case 'dob':
          return <DobCalculatorPage onNavigate={handleNavigate} locale={locale} />;
        case 'marriage':
          return <MarriageCalculatorPage onNavigate={handleNavigate} locale={locale} />;
        case 'astrology':
          return <AstrologyPage onNavigate={handleNavigate} locale={locale} />;
        case 'numerology':
          return <NumerologyPage onNavigate={handleNavigate} locale={locale} />;
        case 'blog':
          return <BlogIndexPage onNavigate={handleNavigate} locale={locale} />;
        case 'about':
          return <AboutPage onNavigate={handleNavigate} locale={locale} />;
        case 'contact':
          return <ContactPage onNavigate={handleNavigate} locale={locale} />;
        case 'privacy':
          return <PrivacyPage onNavigate={handleNavigate} locale={locale} />;
        case 'terms':
          return <TermsPage onNavigate={handleNavigate} locale={locale} />;
        case 'disclaimer':
          return <DisclaimerPage onNavigate={handleNavigate} locale={locale} />;
      }
    }

    // Direct legacy path fallbacks for English
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={handleNavigate} locale="en" />;
      case '/love-calculator/':
      case '/love-calculator-by-name/':
      case '/love-percentage-calculator/':
      case '/true-love-calculator/':
      case '/love-compatibility-calculator/':
        return <LoveCalculatorPage onNavigate={handleNavigate} locale="en" />;
      case '/flames-calculator/':
        return <FlamesPage onNavigate={handleNavigate} locale="en" />;
      case '/friendship-calculator/':
        return <FriendshipPage onNavigate={handleNavigate} locale="en" />;
      case '/love-calculator-by-date-of-birth/':
        return <DobCalculatorPage onNavigate={handleNavigate} locale="en" />;
      case '/love-or-arranged-marriage-calculator/':
        return <MarriageCalculatorPage onNavigate={handleNavigate} locale="en" />;
      case '/astrology/':
        return <AstrologyPage onNavigate={handleNavigate} locale="en" />;
      case '/numerology/':
        return <NumerologyPage onNavigate={handleNavigate} locale="en" />;
      case '/blog/':
        return <BlogIndexPage onNavigate={handleNavigate} locale="en" />;
      case '/about/':
        return <AboutPage onNavigate={handleNavigate} locale="en" />;
      case '/contact/':
        return <ContactPage onNavigate={handleNavigate} locale="en" />;
      case '/privacy-policy/':
        return <PrivacyPage onNavigate={handleNavigate} locale="en" />;
      case '/terms/':
        return <TermsPage onNavigate={handleNavigate} locale="en" />;
      case '/disclaimer/':
        return <DisclaimerPage onNavigate={handleNavigate} locale="en" />;
      default:
        const homeTarget = getEquivalentPath('/', locale);
        return (
          <div className="max-w-md mx-auto px-4 py-24 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-3">
              {locale === 'es' ? 'Página no encontrada' : locale === 'pt-BR' ? 'Página não encontrada' : 'Page Not Found'}
            </h1>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {locale === 'es'
                ? 'No pudimos encontrar la calculadora o guía en esta dirección.'
                : locale === 'pt-BR'
                ? 'Não encontramos o teste ou artigo correspondente a esta página.'
                : 'We couldn’t find the calculator or guide at this URL.'}
            </p>
            <button
              type="button"
              onClick={() => handleNavigate(homeTarget)}
              className="px-6 py-3 rounded-xl bg-rose-600 text-white font-semibold text-xs shadow-sm hover:bg-rose-700 transition-colors"
            >
              {locale === 'es' ? 'Volver al Inicio' : locale === 'pt-BR' ? 'Voltar ao Início' : 'Back to Home'}
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
      <Footer currentPath={currentPath} onNavigate={handleNavigate} />
    </div>
  );
}
