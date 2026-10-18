import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Sparkles, Flame, Users, BookOpen, Compass } from 'lucide-react';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Love Test', path: '/love-calculator/' },
    { label: 'FLAMES Game', path: '/flames-calculator/' },
    { label: 'Friendship', path: '/friendship-calculator/' },
    { label: 'Marriage Match', path: '/love-or-arranged-marriage-calculator/' },
    { label: 'DOB Match', path: '/love-calculator-by-date-of-birth/' },
    { label: 'Guides', path: '/blog/' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-rose-100/80 shadow-xs'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleLinkClick('/')}
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

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('/love-calculator/')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 active:scale-[0.98] rounded-xl transition-all shadow-xs whitespace-nowrap min-h-[38px] gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 fill-white/80" />
            <span>Calculate Love</span>
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
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
            Calculators & Tools
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
                onClick={() => handleLinkClick('/love-calculator/')}
                className="flex-1 py-3 px-3 rounded-xl text-center text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-xs min-h-[44px] flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Love Test</span>
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('/flames-calculator/')}
                className="flex-1 py-3 px-3 rounded-xl text-center text-xs font-bold text-slate-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors shadow-xs min-h-[44px] flex items-center justify-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Play FLAMES</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
