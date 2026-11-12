import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ChevronDown, Star, Heart, Flame, Calculator, Users, Sparkles, BookHeart, Calendar, Hash, ChevronRight, Compass, Moon } from 'lucide-react';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface NavLink {
  label: string;
  path: string;
  icon?: React.ReactNode;
  description?: string;
}

interface NavDropdown {
  label: string;
  key: string;
  icon?: React.ReactNode;
  items: NavLink[];
}

type NavItem =
  | { type: 'link'; link: NavLink }
  | { type: 'dropdown'; dropdown: NavDropdown };

// ─── Navigation Structure ─────────────────────────────────────────────────────
const topLevelLinks: NavLink[] = [
  { label: 'Kundali', path: '/kundali/', icon: <Star className="w-4 h-4 text-amber-500" />, description: 'Janam Kundali Chart' },
  { label: 'Kundali Matching', path: '/kundali-matching/', icon: <Sparkles className="w-4 h-4 text-purple-500" />, description: 'Ashta-Kuta Matching' },
  { label: 'Zodiac Signs', path: '/zodiac-signs/', icon: <Star className="w-4 h-4 text-indigo-500" />, description: 'All 12 Signs' },
];

const astrologyDropdown: NavDropdown = {
  label: 'Astrology',
  key: 'astrology',
  icon: <Calendar className="w-4 h-4 text-violet-500" />,
  items: [
    { label: 'Rashifal Today', path: '/rashifal-today/', icon: <Calendar className="w-4 h-4 text-orange-500" />, description: 'Daily horoscope' },
    { label: 'Birth Chart Calculator', path: '/birth-chart-calculator/', icon: <Compass className="w-4 h-4 text-indigo-500" />, description: 'Natal & divisional charts' },
    { label: 'Love Horoscope', path: '/love-horoscope/', icon: <Moon className="w-4 h-4 text-rose-500" />, description: 'Daily love horoscope by sign' },
    { label: 'Thirumana Porutham', path: '/porutham/', icon: <Sparkles className="w-4 h-4 text-amber-500" />, description: '10 Porutham match' },
    { label: 'When Will I Get Married', path: '/when-will-i-get-married/', icon: <Heart className="w-4 h-4 text-rose-500" />, description: 'Marriage prediction by date of birth' },
    { label: 'Love Compatibility by Zodiac Sign', path: '/love-compatibility-by-zodiac-sign/', icon: <Users className="w-4 h-4 text-indigo-500" />, description: 'Love compatibility by zodiac sign' },
    { label: 'Astrology', path: '/astrology/', icon: <Star className="w-4 h-4 text-violet-500" />, description: 'Astrology hub' },
  ],
};

const loveToolsDropdown: NavDropdown = {
  label: 'Love Tools',
  key: 'love-tools',
  icon: <Heart className="w-4 h-4 text-rose-500" />,
  items: [
    { label: 'Love Language Test', path: '/love-language-test/', icon: <Heart className="w-4 h-4 text-rose-500" />, description: '5 love languages quiz' },
    { label: 'FLAMES Calculator', path: '/flames-calculator/', icon: <Flame className="w-4 h-4 text-amber-500" />, description: 'Classic FLAMES game' },
    { label: 'Love % on Paper', path: '/love-percentage-on-paper/', icon: <BookHeart className="w-4 h-4 text-pink-500" />, description: 'Paper method' },
    { label: 'Crush Calculator', path: '/crush-calculator/', icon: <Heart className="w-4 h-4 text-rose-400" />, description: 'Crush compatibility' },
    { label: 'Friendship Calculator', path: '/friendship-calculator/', icon: <Users className="w-4 h-4 text-sky-500" />, description: 'Friendship score' },
    { label: 'Name Compatibility', path: '/name-compatibility/', icon: <Sparkles className="w-4 h-4 text-fuchsia-500" />, description: 'Name match test' },
    { label: 'Love or Arranged', path: '/love-or-arranged-marriage-calculator/', icon: <Heart className="w-4 h-4 text-red-500" />, description: 'Marriage prediction' },
    { label: 'Love by DOB', path: '/love-calculator-by-date-of-birth/', icon: <Calculator className="w-4 h-4 text-rose-500" />, description: 'Date of birth match' },
  ],
};

const numerologyDropdown: NavDropdown = {
  label: 'Numerology',
  key: 'numerology',
  icon: <Hash className="w-4 h-4 text-emerald-500" />,
  items: [
    { label: 'Numerology', path: '/numerology/', icon: <Hash className="w-4 h-4 text-emerald-500" />, description: 'Numerology hub' },
    { label: 'Numerology Calculator', path: '/numerology-calculator/', icon: <Calculator className="w-4 h-4 text-emerald-600" />, description: 'Chaldean & Pythagorean' },
    { label: 'Life Path Calculator', path: '/life-path-calculator/', icon: <Calculator className="w-4 h-4 text-emerald-600" />, description: 'Life path, mulank & destiny number' },
    { label: 'Name Numerology', path: '/numerology/name-numerology/', icon: <Calculator className="w-4 h-4 text-teal-500" />, description: 'Name number analysis' },
  ],
};

const navItems: NavItem[] = [
  { type: 'link', link: topLevelLinks[0] },
  { type: 'link', link: topLevelLinks[1] },
  { type: 'link', link: topLevelLinks[2] },
  { type: 'dropdown', dropdown: astrologyDropdown },
  { type: 'dropdown', dropdown: loveToolsDropdown },
  { type: 'dropdown', dropdown: numerologyDropdown },
];

// ─── Desktop Dropdown Component ───────────────────────────────────────────────
const DesktopDropdown: React.FC<{
  dropdown: NavDropdown;
  currentPath: string;
  onNavigate: (path: string) => void;
}> = ({ dropdown, currentPath, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isGroupActive = dropdown.items.some((item) => currentPath === item.path);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  // Close on outside click (fallback for accessibility)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
          isGroupActive
            ? 'bg-rose-50 text-rose-700 font-bold'
            : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>{dropdown.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 py-2 min-w-[240px]">
            {dropdown.items.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => {
                    onNavigate(item.path);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm transition-colors ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-rose-600'
                  }`}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span className="font-medium">{item.label}</span>
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Mobile Accordion Section ─────────────────────────────────────────────────
const MobileAccordion: React.FC<{
  dropdown: NavDropdown;
  currentPath: string;
  onNavigate: (path: string) => void;
}> = ({ dropdown, currentPath, onNavigate }) => {
  const [expanded, setExpanded] = useState(false);
  const isGroupActive = dropdown.items.some((item) => currentPath === item.path);
  const activeCount = dropdown.items.filter((item) => currentPath === item.path).length;

  return (
    <div className="rounded-2xl overflow-hidden mb-1.5">
      {/* Accordion Trigger */}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className={`w-full flex items-center justify-between px-4 py-3.5 min-h-[52px] text-[15px] font-semibold transition-all active:scale-[0.99] ${
          expanded
            ? 'bg-slate-50 text-slate-900'
            : isGroupActive
              ? 'bg-rose-50/60 text-rose-700'
              : 'text-slate-800 hover:bg-slate-50'
        }`}
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-3">
          {dropdown.icon && (
            <span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
              expanded ? 'bg-white shadow-sm' : isGroupActive ? 'bg-rose-100' : 'bg-slate-100'
            }`}>
              {dropdown.icon}
            </span>
          )}
          <span className="flex flex-col items-start">
            <span>{dropdown.label}</span>
            <span className="text-[11px] font-normal text-slate-400">
              {dropdown.items.length} tools
              {activeCount > 0 && ' · 1 active'}
            </span>
          </span>
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ease-out ${
            expanded ? 'rotate-180 text-rose-500' : ''
          }`}
        />
      </button>

      {/* Accordion Items */}
      {expanded && (
        <div className="px-2 pb-2 pt-0.5 space-y-0.5">
          {dropdown.items.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => onNavigate(item.path)}
                className={`w-full text-left pl-5 pr-3 py-3 min-h-[48px] flex items-center gap-3 rounded-xl transition-all active:scale-[0.98] ${
                  isActive
                    ? 'bg-rose-50 text-rose-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'
                }`}
              >
                {item.icon && (
                  <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-rose-100' : 'bg-white border border-slate-100'
                  }`}>
                    {item.icon}
                  </span>
                )}
                <span className="flex flex-col min-w-0">
                  <span className={`text-[14px] truncate ${isActive ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="text-[11px] text-slate-400 truncate">
                      {item.description}
                    </span>
                  )}
                </span>
                {isActive ? (
                  <span className="ml-auto w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                ) : (
                  <ChevronRight className="ml-auto w-3.5 h-3.5 text-slate-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── Main Header Component ────────────────────────────────────────────────────
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

  // Close mobile menu on navigation
  const handleLinkClick = useCallback(
    (path: string) => {
      onNavigate(path);
      setMobileMenuOpen(false);
    },
    [onNavigate]
  );

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-rose-100/80 shadow-xs'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Brand Logo — single instance, wordmark hidden on mobile via CSS */}
          <button
            type="button"
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2 text-left group min-w-0 shrink-0"
          >
            <CalculateLoveLogo
              size={36}
              showWordmark={true}
            />
          </button>

          {/* ─── Desktop Navigation ─────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-xs font-semibold text-slate-600">
            {navItems.map((item) => {
              if (item.type === 'link') {
                const { link } = item;
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
              } else {
                return (
                  <DesktopDropdown
                    key={item.dropdown.key}
                    dropdown={item.dropdown}
                    currentPath={currentPath}
                    onNavigate={handleLinkClick}
                  />
                );
              }
            })}
          </nav>

          {/* ─── Mobile Menu Toggle ─────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center transition-all active:scale-95 shrink-0 ${
              mobileMenuOpen
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* ─── Mobile Drawer (rendered OUTSIDE header to avoid backdrop-filter containment) ─── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-[60] top-14 sm:top-16">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div className="absolute inset-0 overflow-y-auto overscroll-contain bg-white">
            <nav className="max-w-lg mx-auto px-3 sm:px-4 pt-4 pb-8">

              {/* ─── Top-level standalone links (cards style) ─── */}
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] px-1 mb-2.5">
                ✦ Explore
              </div>
              <div className="grid grid-cols-1 gap-1.5 mb-4">
                {topLevelLinks.map((link) => {
                  const isActive = currentPath === link.path;
                  return (
                    <button
                      key={link.path}
                      type="button"
                      onClick={() => handleLinkClick(link.path)}
                      className={`w-full text-left px-4 py-3.5 min-h-[56px] flex items-center gap-3 rounded-2xl transition-all active:scale-[0.98] ${
                        isActive
                          ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 shadow-sm border border-rose-100'
                          : 'text-slate-800 bg-white border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 shadow-xs'
                      }`}
                    >
                      {link.icon && (
                        <span className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-rose-100' : 'bg-slate-50'
                        }`}>
                          {link.icon}
                        </span>
                      )}
                      <span className="flex flex-col min-w-0">
                        <span className={`text-[15px] truncate ${isActive ? 'font-bold' : 'font-semibold'}`}>
                          {link.label}
                        </span>
                        {link.description && (
                          <span className="text-[11px] text-slate-400 truncate">
                            {link.description}
                          </span>
                        )}
                      </span>
                      {isActive ? (
                        <span className="ml-auto w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      ) : (
                        <ChevronRight className="ml-auto w-4 h-4 text-slate-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ─── Divider ─── */}
              <div className="border-t border-slate-100 mb-4" />

              {/* ─── Dropdown Groups as Accordions ─── */}
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] px-1 mb-2.5">
                ♥ Tools & Calculators
              </div>
              <div className="space-y-1">
                <MobileAccordion
                  dropdown={astrologyDropdown}
                  currentPath={currentPath}
                  onNavigate={handleLinkClick}
                />
                <MobileAccordion
                  dropdown={loveToolsDropdown}
                  currentPath={currentPath}
                  onNavigate={handleLinkClick}
                />
                <MobileAccordion
                  dropdown={numerologyDropdown}
                  currentPath={currentPath}
                  onNavigate={handleLinkClick}
                />
              </div>

              {/* ─── Quick Access CTA ─── */}
              <div className="mt-6 px-1">
                <button
                  type="button"
                  onClick={() => handleLinkClick('/')}
                  className="w-full py-3.5 px-5 rounded-2xl text-center text-[15px] font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-700 hover:to-pink-700 transition-all shadow-md active:scale-[0.98] min-h-[52px] flex items-center justify-center gap-2.5"
                >
                  <Heart className="w-5 h-5 fill-white/90" />
                  <span>Calculate Love</span>
                  <Sparkles className="w-4 h-4 fill-white/60 text-white/80" />
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Free love calculator — try it now!
                </p>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
