import React from 'react';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-14 pb-10 text-slate-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          {/* Brand Col */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 font-display"
            >
              <span className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              </span>
              <span>MilanMeter</span>
            </button>
            <p className="text-xs text-slate-500 leading-relaxed">
              India&apos;s clean, lightweight compatibility calculator platform. Dedicated to private, deterministic name matching, classic FLAMES games, and positive relationship reflections.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/80">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>100% Client-Side Privacy: No Names Stored</span>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Calculators
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/love-calculator/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Love Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/love-calculator-by-name/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Love Calculator by Name
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/flames-calculator/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  FLAMES Game
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/love-percentage-calculator/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Love Percentage Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/friendship-calculator/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Friendship Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/true-love-calculator/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  True Love & Soulmate Test
                </button>
              </li>
            </ul>
          </div>

          {/* Deep Exploration */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Explore & Match
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/love-or-arranged-marriage-calculator/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Love vs. Arranged Marriage
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/love-calculator-by-date-of-birth/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Date of Birth Compatibility
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/astrology/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Astrology & Zodiac Hub
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/numerology/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Numerology & Life Paths
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/blog/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Relationship Articles & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Trust & Legal
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/about/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  About MilanMeter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Contact & Feedback
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/privacy-policy/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/terms/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/disclaimer/')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer summary statement */}
        <div className="py-6 border-b border-slate-100 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> MilanMeter provides compatibility tests, FLAMES games, and numerological calculations strictly for fun, entertainment, and playful self-reflection. These tools do not provide clinical psychological diagnostics, scientific relationship predictions, or binding matrimonial advice. True relationships flourish through mutual respect, kindness, and honest communication.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-1.5">
            <span>© 2026 MilanMeter. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Crafted for India</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/privacy-policy/')}
              className="hover:text-slate-700"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/terms/')}
              className="hover:text-slate-700"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/disclaimer/')}
              className="hover:text-slate-700"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
