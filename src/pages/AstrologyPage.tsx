import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { Sparkles, Moon, Sun, ArrowRight, ShieldCheck } from 'lucide-react';
import astrologyImage from '../assets/images/astrology_zodiac_harmony_1790774231196.jpg';

interface Props {
  onNavigate: (path: string) => void;
}

export const AstrologyPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs = [
    {
      question: 'What is the difference between Western Sun Sign compatibility and Vedic Kundli Milan?',
      answer:
        'Western astrology relies predominantly on the Sun sign (based on the solar month of birth). Vedic astrology (Jyotish) prioritizes the Moon sign (Chandra Rashi), birth star (Nakshatra), and Ashta Kuta (the 36 Guna matching system).',
    },
    {
      question: 'Will CalculateLove add Kundli and Rashi compatibility tools?',
      answer:
        'Yes. We are currently architecting vetted astrological formulas based on classic texts so that future tools provide transparent, authentic calculations without fabricated assertions.',
    },
  ];

  const zodiacSigns = [
    { name: 'Aries (Mesha)', element: 'Fire', dates: 'Mar 21 - Apr 19' },
    { name: 'Taurus (Vrishabha)', element: 'Earth', dates: 'Apr 20 - May 20' },
    { name: 'Gemini (Mithuna)', element: 'Air', dates: 'May 21 - Jun 20' },
    { name: 'Cancer (Karka)', element: 'Water', dates: 'Jun 21 - Jul 22' },
    { name: 'Leo (Simha)', element: 'Fire', dates: 'Jul 23 - Aug 22' },
    { name: 'Virgo (Kanya)', element: 'Earth', dates: 'Aug 23 - Sep 22' },
    { name: 'Libra (Tula)', element: 'Air', dates: 'Sep 23 - Oct 22' },
    { name: 'Scorpio (Vrishchika)', element: 'Water', dates: 'Oct 23 - Nov 21' },
    { name: 'Sagittarius (Dhanu)', element: 'Fire', dates: 'Nov 22 - Dec 21' },
    { name: 'Capricorn (Makara)', element: 'Earth', dates: 'Dec 22 - Jan 19' },
    { name: 'Aquarius (Kumbha)', element: 'Air', dates: 'Jan 20 - Feb 18' },
    { name: 'Pisces (Meena)', element: 'Water', dates: 'Feb 19 - Mar 20' },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Astrology & Zodiac Relationship Compatibility Hub',
    'url': 'https://calculatelove.online/astrology/',
    'description': 'Explore astrology love calculators, zodiac compatibility concepts, and Rashi relationship dynamics on CalculateLove.',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Astrology Love Calculator & Zodiac Compatibility Hub | CalculateLove"
        description="Explore astrology love compatibility, zodiac elements, and Rashi relationship dynamics with CalculateLove. Grounded, authentic, and educational insights."
        canonicalPath="/astrology/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Astrology Hub' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Astrology & Zodiac Compatibility Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Understanding elemental affinities, planetary archetypes, and celestial relationship dynamics without superstitious dogma.
        </p>
      </div>

      {/* Featured Banner with generated celestial art */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 text-white shadow-sm mb-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="p-8 sm:p-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>Cosmic Archetypes</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display leading-tight">
              Elemental Harmony: Fire, Earth, Air & Water
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Astrological compatibility evaluates how your core elemental energies interact. Fire fuels Air, Earth stabilizes Water, and complementary balances foster emotional growth.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/love-calculator-by-date-of-birth/')}
                className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-slate-100 transition-colors inline-flex items-center gap-2"
              >
                <span>Try Date of Birth Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="h-64 md:h-full aspect-4/3 overflow-hidden bg-slate-800">
            <img
              src={astrologyImage}
              alt="Astrological constellation harmony"
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Zodiac Elements Overview */}
      <section className="mb-14">
        <h2 className="text-lg font-bold text-slate-900 font-display mb-4">
          Zodiac & Rashi Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
          {zodiacSigns.map((z) => (
            <div
              key={z.name}
              className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-rose-200 transition-colors"
            >
              <span className="font-bold text-slate-900 block truncate">{z.name}</span>
              <span className="text-[11px] text-rose-600 block mt-0.5">{z.element} Element</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{z.dates}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology & Integrity Note */}
      <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 leading-relaxed mb-12">
        <h3 className="font-bold mb-1 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Our Commitment to Astrological Transparency</span>
        </h3>
        <p>
          CalculateLove respects the cultural heritage of Vedic and Western astrological traditions. We do not invent arbitrary astrological rules to claim that couples are &quot;destined&quot; to divorce or fail. Astrological reflections should inspire mutual understanding, emotional maturity, and compassion.
        </p>
      </div>

      <RelatedTools currentToolId="astrology" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['love-compatibility-by-date-of-birth', 'what-does-love-percentage-mean']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
