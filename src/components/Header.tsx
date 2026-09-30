import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Love Calculator', path: '/love-calculator/' },
    { label: 'Name Test', path: '/love-calculator-by-name/' },
    { label: 'FLAMES', path: '/flames-calculator/' },
    { label: 'Friendship', path: '/friendship-calculator/' },
    { label: 'Marriage', path: '/love-or-arranged-marriage-calculator/' },
    { label: 'Blog', path: '/blog/' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 font-display hover:opacity-90 transition-opacity"
        >
          <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          </span>
          <span>MilanMeter</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleLinkClick(link.path)}
                className={`whitespace-nowrap transition-colors hover:text-rose-600 relative py-1 ${
                  isActive ? 'text-rose-600 font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleLinkClick('/love-calculator/')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] rounded-xl transition-all shadow-sm whitespace-nowrap min-h-[40px]"
          >
            Calculate Love
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] flex items-center justify-between ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleLinkClick('/love-calculator/')}
                className="w-full py-3 px-4 rounded-xl text-center text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm min-h-[44px] flex items-center justify-center"
              >
                Start Love Test
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
