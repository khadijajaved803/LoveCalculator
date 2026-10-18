import React from 'react';
import { Heart, Sparkles, ArrowUp, Globe } from 'lucide-react';
import { CalculateLoveLogo } from './CalculateLoveLogo';
import { getLocaleFromPath, getEquivalentPath, SupportedLocale } from '../i18n/routes';
import { getTranslations } from '../i18n/translations';

interface FooterProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPath = '/', onNavigate }) => {
  const locale = getLocaleFromPath(currentPath);
  const t = getTranslations(locale);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const homePath = getEquivalentPath('/', locale);
  const lovePath = getEquivalentPath('/love-calculator/', locale);
  const flamesPath = getEquivalentPath('/flames-calculator/', locale);
  const friendPath = getEquivalentPath('/friendship-calculator/', locale);
  const marriagePath = getEquivalentPath('/love-or-arranged-marriage-calculator/', locale);
  const dobPath = getEquivalentPath('/love-calculator-by-date-of-birth/', locale);
  const astroPath = getEquivalentPath('/astrology/', locale);
  const numPath = getEquivalentPath('/numerology/', locale);
  const blogPath = getEquivalentPath('/blog/', locale);
  const aboutPath = getEquivalentPath('/about/', locale);
  const contactPath = getEquivalentPath('/contact/', locale);
  const privacyPath = getEquivalentPath('/privacy-policy/', locale);
  const termsPath = getEquivalentPath('/terms/', locale);
  const disclaimerPath = getEquivalentPath('/disclaimer/', locale);

  const switchLanguage = (targetLocale: SupportedLocale) => {
    const eq = getEquivalentPath(currentPath, targetLocale);
    onNavigate(eq);
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
              href={homePath}
              onClick={(e) => handleLinkClick(e, homePath)}
              className="inline-block group focus:outline-none focus:ring-2 focus:ring-rose-400 rounded-lg"
              title="CalculateLove - Free Compatibility Calculator"
            >
              <CalculateLoveLogo size={32} showWordmark={true} />
            </a>

            <p className="text-xs text-slate-500 leading-relaxed">
              {t.footer.aboutDesc}
            </p>

            {/* Social Media Links: Instagram, Facebook, X */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                {t.footer.joinCommunity}
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
              <span>{t.footer.matchesGenerated}</span>
            </div>
          </div>

          {/* Popular Calculators Column */}
          <nav aria-label={t.footer.popularCalculators}>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{t.footer.popularCalculators}</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={lovePath}
                  onClick={(e) => handleLinkClick(e, lovePath)}
                  className="hover:text-rose-600 hover:translate-x-0.5 inline-block transition-all font-medium"
                  title={t.loveCalc.h1}
                >
                  {t.nav.loveTest}
                </a>
              </li>
              <li>
                <a
                  href={flamesPath}
                  onClick={(e) => handleLinkClick(e, flamesPath)}
                  className="hover:text-rose-600 hover:translate-x-0.5 inline-block transition-all"
                  title={t.flames.h1}
                >
                  {t.nav.flames}
                </a>
              </li>
              <li>
                <a
                  href={friendPath}
                  onClick={(e) => handleLinkClick(e, friendPath)}
                  className="hover:text-rose-600 hover:translate-x-0.5 inline-block transition-all"
                  title={t.friendship.h1}
                >
                  {t.nav.friendship}
                </a>
              </li>
              <li>
                <a
                  href={marriagePath}
                  onClick={(e) => handleLinkClick(e, marriagePath)}
                  className="hover:text-rose-600 hover:translate-x-0.5 inline-block transition-all"
                  title={t.marriage.h1}
                >
                  {t.nav.marriage}
                </a>
              </li>
              <li>
                <a
                  href={dobPath}
                  onClick={(e) => handleLinkClick(e, dobPath)}
                  className="hover:text-rose-600 hover:translate-x-0.5 inline-block transition-all"
                  title={t.dob.h1}
                >
                  {t.nav.dobMatch}
                </a>
              </li>
            </ul>
          </nav>

          {/* Cosmic & Astrology Hub */}
          <nav aria-label={t.footer.astrologyNumerology}>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>{t.footer.astrologyNumerology}</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={astroPath}
                  onClick={(e) => handleLinkClick(e, astroPath)}
                  className="hover:text-purple-600 hover:translate-x-0.5 inline-block transition-all"
                  title="Astrology & Zodiac Hub"
                >
                  {locale === 'es' ? 'Astrología y Signos' : locale === 'pt-BR' ? 'Astrologia e Signos' : 'Zodiac & Astrology Hub'}
                </a>
              </li>
              <li>
                <a
                  href={numPath}
                  onClick={(e) => handleLinkClick(e, numPath)}
                  className="hover:text-purple-600 hover:translate-x-0.5 inline-block transition-all"
                  title="Numerology & Life Path"
                >
                  {locale === 'es' ? 'Numerología y Senderos de Vida' : locale === 'pt-BR' ? 'Numerologia e Caminho de Vida' : 'Numerology & Life Paths'}
                </a>
              </li>
              <li>
                <a
                  href={blogPath}
                  onClick={(e) => handleLinkClick(e, blogPath)}
                  className="hover:text-purple-600 hover:translate-x-0.5 inline-block transition-all"
                  title="Guides & Articles"
                >
                  {t.nav.guides}
                </a>
              </li>
            </ul>
          </nav>

          {/* About & Trust */}
          <nav aria-label={t.footer.legalTrust}>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              {t.footer.legalTrust}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={aboutPath}
                  onClick={(e) => handleLinkClick(e, aboutPath)}
                  className="hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                >
                  {locale === 'es' ? 'Sobre Nosotros' : locale === 'pt-BR' ? 'Sobre Nós' : 'About CalculateLove'}
                </a>
              </li>
              <li>
                <a
                  href={contactPath}
                  onClick={(e) => handleLinkClick(e, contactPath)}
                  className="hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                >
                  {locale === 'es' ? 'Contacto' : locale === 'pt-BR' ? 'Contato' : 'Contact & Feedback'}
                </a>
              </li>
              <li>
                <a
                  href={privacyPath}
                  onClick={(e) => handleLinkClick(e, privacyPath)}
                  className="hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                >
                  {locale === 'es' ? 'Política de Privacidad' : locale === 'pt-BR' ? 'Política de Privacidade' : 'Privacy Policy'}
                </a>
              </li>
              <li>
                <a
                  href={termsPath}
                  onClick={(e) => handleLinkClick(e, termsPath)}
                  className="hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                >
                  {locale === 'es' ? 'Términos de Uso' : locale === 'pt-BR' ? 'Termos de Uso' : 'Terms of Service'}
                </a>
              </li>
              <li>
                <a
                  href={disclaimerPath}
                  onClick={(e) => handleLinkClick(e, disclaimerPath)}
                  className="hover:text-slate-900 hover:translate-x-0.5 inline-block transition-all"
                >
                  {locale === 'es' ? 'Aviso Legal' : locale === 'pt-BR' ? 'Aviso Legal' : 'Disclaimer'}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Multilingual Selector in Footer */}
        <div className="py-4 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Globe className="w-4 h-4 text-rose-600" />
            <span className="font-semibold text-slate-700">{t.footer.languageSelection}:</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => switchLanguage('en')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                locale === 'en'
                  ? 'bg-rose-100 text-rose-800 font-bold'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-slate-100'
              }`}
            >
              <span>🇮🇳</span>
              <span>English (India)</span>
            </button>
            <button
              type="button"
              onClick={() => switchLanguage('es')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                locale === 'es'
                  ? 'bg-rose-100 text-rose-800 font-bold'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-slate-100'
              }`}
            >
              <span>🇪🇸</span>
              <span>Español</span>
            </button>
            <button
              type="button"
              onClick={() => switchLanguage('pt-BR')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                locale === 'pt-BR'
                  ? 'bg-rose-100 text-rose-800 font-bold'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-slate-100'
              }`}
            >
              <span>🇧🇷</span>
              <span>Português (Brasil)</span>
            </button>
          </div>
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
              href={privacyPath}
              onClick={(e) => handleLinkClick(e, privacyPath)}
              className="hover:text-slate-800 transition-colors"
            >
              {locale === 'es' ? 'Privacidad' : locale === 'pt-BR' ? 'Privacidade' : 'Privacy'}
            </a>
            <a
              href={termsPath}
              onClick={(e) => handleLinkClick(e, termsPath)}
              className="hover:text-slate-800 transition-colors"
            >
              {locale === 'es' ? 'Términos' : locale === 'pt-BR' ? 'Termos' : 'Terms'}
            </a>
            <a
              href={disclaimerPath}
              onClick={(e) => handleLinkClick(e, disclaimerPath)}
              className="hover:text-slate-800 transition-colors"
            >
              {locale === 'es' ? 'Aviso' : locale === 'pt-BR' ? 'Aviso' : 'Disclaimer'}
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
