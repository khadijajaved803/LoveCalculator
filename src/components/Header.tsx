import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Sparkles, Flame, Globe } from 'lucide-react';
import { CalculateLoveLogo } from './CalculateLoveLogo';
import { LanguageSwitcherModal } from './LanguageSwitcherModal';
import { getLocaleFromPath, getEquivalentPath } from '../i18n/routes';
import { getTranslations } from '../i18n/translations';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const locale = getLocaleFromPath(currentPath);
  const t = getTranslations(locale);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const homePath = getEquivalentPath('/', locale);
  const lovePath = getEquivalentPath('/love-calculator/', locale);
  const flamesPath = getEquivalentPath('/flames-calculator/', locale);
  const friendPath = getEquivalentPath('/friendship-calculator/', locale);
  const marriagePath = getEquivalentPath('/love-or-arranged-marriage-calculator/', locale);
  const dobPath = getEquivalentPath('/love-calculator-by-date-of-birth/', locale);
  const blogPath = getEquivalentPath('/blog/', locale);

  const navLinks = [
    { label: t.nav.loveTest, path: lovePath },
    { label: t.nav.flames, path: flamesPath },
    { label: t.nav.friendship, path: friendPath },
    { label: t.nav.marriage, path: marriagePath },
    { label: t.nav.dobMatch, path: dobPath },
    { label: t.nav.guides, path: blogPath },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const currentLangLabel = locale === 'pt-BR' ? 'PT-BR' : locale === 'es' ? 'ES' : 'EN';

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-rose-100/80 shadow-xs'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-100'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleLinkClick(homePath)}
            className="flex items-center gap-2.5 text-left group min-w-0"
          >
            <CalculateLoveLogo size={38} showWordmark={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 font-bold'
                      : 'hover:text-rose-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Language Switcher & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Compact Globe Icon Language Switcher */}
            <button
              type="button"
              onClick={() => setLangModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-rose-600 bg-slate-50 hover:bg-rose-50/80 border border-slate-200/90 hover:border-rose-200 rounded-xl transition-all shadow-2xs min-h-[38px] active:scale-95"
              aria-label="Select Language"
              title="Select Language / Seleccionar Idioma"
            >
              <Globe className="w-4 h-4 text-rose-600" />
              <span className="font-bold text-[11px] uppercase tracking-wider">{currentLangLabel}</span>
            </button>

            {/* Calculate Love CTA Button */}
            <button
              type="button"
              onClick={() => handleLinkClick(lovePath)}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 active:scale-[0.98] rounded-xl transition-all shadow-xs whitespace-nowrap min-h-[38px] gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white/80" />
              <span>{t.nav.calculateLoveBtn}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center border border-slate-200/60 active:scale-95 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {locale === 'es' ? 'Calculadoras y Guías' : locale === 'pt-BR' ? 'Calculadoras e Guias' : 'Calculators & Tools'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLangModalOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLangLabel}</span>
              </button>
            </div>
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    type="button"
                    onClick={() => handleLinkClick(link.path)}
                    className={`text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors min-h-[42px] flex items-center justify-between ${
                      isActive
                        ? 'bg-rose-50 text-rose-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                  </button>
                );
              })}

              <div className="pt-3 mt-1 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleLinkClick(lovePath)}
                  className="flex-1 py-3 px-3 rounded-xl text-center text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-xs min-h-[44px] flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>{t.nav.loveTest}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLinkClick(flamesPath)}
                  className="flex-1 py-3 px-3 rounded-xl text-center text-xs font-bold text-slate-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors shadow-xs min-h-[44px] flex items-center justify-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.nav.flames}</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Language Switcher Modal */}
      <LanguageSwitcherModal
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
        currentPath={currentPath}
        onNavigate={onNavigate}
      />
    </>
  );
};
