import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="relative bg-gradient-to-b from-white via-slate-50/60 to-purple-50/30 border-t border-slate-200 mt-20 text-slate-600 overflow-hidden">
      {/* Decorative top rainbow accent bar */}
      <div className="h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-amber-400" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        {/* Main 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200/80">
          {/* Brand & Social Column */}
          <div className="space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-block group focus:outline-none focus:ring-2 focus:ring-rose-400 rounded-lg"
              title="CalculateLove - Free Compatibility Calculator"
            >
              <CalculateLoveLogo size={32} showWordmark={true} />
            </a>

            <p className="text-xs text-slate-500 leading-relaxed">
              Discover romantic chemistry, celebrate unbreakable friendships, and test cosmic alignment with instant shareable result cards.
            </p>

            {/* Social Media Links: Instagram, Facebook, X */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Join Our Community
              </span>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-600 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:border-transparent transition-all duration-200 group"
                  aria-label="Follow CalculateLove on Instagram"
                  title="Follow us on Instagram"
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-600 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200 group"
                  aria-label="Follow CalculateLove on Facebook"
                  title="Follow us on Facebook"
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-600 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all duration-200 group"
                  aria-label="Follow CalculateLove on X"
                  title="Follow us on X"
                >
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Engaging Live Vibes Badge */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span>100K+ Matches & Cards Generated</span>
            </div>
          </div>

          {/* Popular Calculators Column */}
          <nav aria-label="Popular Calculators">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Popular Calculators</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="/love-calculator/"
                  onClick={(e) => handleLinkClick(e, '/love-calculator/')}
                  className="hover:text-rose-600 hover:translate-x-0.5 inline-block transition-all font-medium"
                  title="True Love Calculator by Name"
                >
                  True Love Calculator
                </a>
              </li>
              <li>
                <a
                  href="/flames-calculator/"
                  onClick={(e) => handleLinkClick(e, '/flames-calculator/')}
                  className="hover:text-rose-600 hover:translate-x-0.5 inline-block transition-all"
                  title="FLAMES Game Online"
                >
                  FLAMES Game Online
                </a>
              </li>
              <li>
                <a
                  href="/friendship-calculator/"
                  onClick={(e) => handleLinkClick(e, '/friendship-calculator/')}
                  className="hover:text-rose-600 hover:translate-x-0.5 inline-block transition-all"
                  title="Friendship & Bestie Meter"
                >
                  Friendship & Bestie Meter
                </a>
              </li>
              <li>
                <a
                  href="/love-or-arranged-marriage-calculator/"
                  onClick={(e) => handleLinkClick(e, '/love-or-arranged-marriage-calculator/')}
                  className="hover:text-rose-600 hover:translate-x-0.5 inline-block transition-all"
                  title="Love vs. Arranged Marriage Calculator"
                >
                  Love vs. Arranged Marriage
                </a>
              </li>
              <li>
                <a
                  href="/love-calculator-by-date-of-birth/"
                  onClick={(e) => handleLinkClick(e, '/love-calculator-by-date-of-birth/')}
                  className="hover:text-rose-600 hover:translate-x-0.5 inline-block transition-all"
                  title="Date of Birth & Life Path Compatibility"
                >
                  Date of Birth & Life Path Match
                </a>
              </li>
            </ul>
          </nav>

          {/* Cosmic & Astrology Hub */}
          <nav aria-label="Cosmic and Guides">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Cosmic & Guides</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="/astrology/"
                  onClick={(e) => handleLinkClick(e, '/astrology/')}
                  className="hover:text-purple-600 hover:translate-x-0.5 inline-block transition-all"
                  title="Zodiac & Astrology Compatibility"
                >
                  Zodiac & Astrology Hub
                </a>
              </li>
              <li>
                <a
                  href="/numerology/"
                  onClick={(e) => handleLinkClick(e, '/numerology/')}
                  className="hover:text-purple-600 hover:translate-x-0.5 inline-block transition-all"
                  title="Numerology & Life Path Calculator"
                >
                  Numerology & Life Paths
                </a>
              </li>
              <li>
                <a
                  href="/blog/"
                  onClick={(e) => handleLinkClick(e, '/blog/')}
                  className="hover:text-purple-600 hover:translate-x-0.5 inline-block transition-all"
                  title="Relationship Advice & Dating Guides"
                >
                  Relationship Articles & Guides
                </a>
              </li>
              <li>
                <a
                  href="/blog/how-love-calculator-works/"
                  onClick={(e) => handleLinkClick(e, '/blog/how-love-calculator-works/')}
                  className="hover:text-purple-600 hover:translate-x-0.5 inline-block transition-all"
                  title="How Online Love Calculators Work"
                >
                  How Love Calculators Work
                </a>
              </li>
              <li>
                <a
                  href="/blog/how-flames-calculator-works/"
                  onClick={(e) => handleLinkClick(e, '/blog/how-flames-calculator-works/')}
                  className="hover:text-purple-600 hover:translate-x-0.5 inline-block transition-all"
                  title="How FLAMES Game Works"
                >
                  The Psychology of FLAMES
                </a>
              </li>
            </ul>
          </nav>

          {/* About & Trust */}
          <nav aria-label="About and Legal">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              About & Trust
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="/about/"
                  onClick={(e) => handleLinkClick(e, '/about/')}
                  className="hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                  title="About CalculateLove"
                >
                  About CalculateLove
                </a>
              </li>
              <li>
                <a
                  href="/contact/"
                  onClick={(e) => handleLinkClick(e, '/contact/')}
                  className="hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                  title="Contact & Feedback"
                >
                  Contact & Feedback
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy/"
                  onClick={(e) => handleLinkClick(e, '/privacy-policy/')}
                  className="hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                  title="Privacy Policy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms/"
                  onClick={(e) => handleLinkClick(e, '/terms/')}
                  className="hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                  title="Terms of Service"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer/"
                  onClick={(e) => handleLinkClick(e, '/disclaimer/')}
                  className="hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                  title="Legal Disclaimer"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span>© 2026 CalculateLove (calculatelove.online).</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Made with <span className="text-rose-500 inline-block animate-pulse">❤️</span> for romance, friendship & fun.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/privacy-policy/"
              onClick={(e) => handleLinkClick(e, '/privacy-policy/')}
              className="hover:text-slate-800 transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms/"
              onClick={(e) => handleLinkClick(e, '/terms/')}
              className="hover:text-slate-800 transition-colors"
            >
              Terms
            </a>
            <a
              href="/disclaimer/"
              onClick={(e) => handleLinkClick(e, '/disclaimer/')}
              className="hover:text-slate-800 transition-colors"
            >
              Disclaimer
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-white hover:text-slate-900 hover:border-slate-300 transition-all shadow-2xs group flex items-center gap-1 text-[11px] font-medium"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

