import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { Hash, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const NumerologyPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs = [
    {
      question: 'How do numbers influence relationship harmony in numerology?',
      answer:
        'In classical numerology, single-digit root numbers (1 to 9) represent energetic temperaments. For example, numbers in the same triad (such as the creative 3-6-9 triad) share intuitive resonance and similar emotional pacing.',
    },
    {
      question: 'Which numerology system does CalculateLove reference?',
      answer:
        'We reference the Pythagorean Life Path system (reducing birth dates to single root digits) for our date-of-birth tools, and are preparing Chaldean sound vibration charts for upcoming name numerology expansions.',
    },
  ];

  const numberVibrations = [
    { num: 1, archetype: 'The Leader', trait: 'Independent, pioneering, visionary' },
    { num: 2, archetype: 'The Diplomat', trait: 'Sensitive, harmonious, peacemaker' },
    { num: 3, archetype: 'The Expressive', trait: 'Artistic, charismatic, spontaneous' },
    { num: 4, archetype: 'The Builder', trait: 'Dependable, structured, practical' },
    { num: 5, archetype: 'The Explorer', trait: 'Free-spirited, dynamic, curious' },
    { num: 6, archetype: 'The Caretaker', trait: 'Loving, supportive, family-centric' },
    { num: 7, archetype: 'The Seeker', trait: 'Analytical, reflective, intuitive' },
    { num: 8, archetype: 'The Manifestor', trait: 'Ambitious, resilient, goal-driven' },
    { num: 9, archetype: 'The Humanitarian', trait: 'Compassionate, generous, wise' },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Numerology & Relationship Compatibility Hub',
    'url': 'https://calculatelove.online/numerology/',
    'description': 'Discover numerology love compatibility, Life Path number resonance, and Pythagorean name vibration principles on CalculateLove.',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Numerology Love Calculator - Life Path Compatibility Hub | CalculateLove"
        description="Explore numerology love compatibility, Life Path numbers 1-9, and name vibration principles with CalculateLove. Mathematical, grounded, and fun relationship tools."
        canonicalPath="/numerology/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Numerology Hub' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Numerology & Life Path Compatibility
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          The mathematical language of dates and names. Discover how birth numbers and numerical archetypes harmonize in relationships.
        </p>
      </div>

      {/* Hero Action Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-1.5 text-rose-600 text-xs font-semibold">
            <Compass className="w-4 h-4" />
            <span>Interactive Tool Available</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
            Test Your Date of Birth Compatibility
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Enter your birthday and your partner&apos;s birthday to compute your Life Path numbers and reveal your natural harmonic triad.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/love-calculator-by-date-of-birth/')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-2"
        >
          <span>Calculate Birth Numbers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Archetypes Grid */}
      <section className="mb-14">
        <h2 className="text-lg font-bold text-slate-900 font-display mb-4">
          Life Path Archetypes (1 to 9)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {numberVibrations.map((n) => (
            <div
              key={n.num}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-200 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 font-bold font-mono flex items-center justify-center text-xs">
                  {n.num}
                </span>
                <span className="font-bold text-slate-900">{n.archetype}</span>
              </div>
              <p className="text-slate-500 leading-relaxed">{n.trait}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology note */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed mb-12">
        <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Transparent Methodology</span>
        </h3>
        <p>
          Numerology reduces complex calendar dates into simplified root numbers to mirror core behavioral patterns. It is an engaging philosophical framework for mutual empathy, rather than an absolute prediction of future events.
        </p>
      </div>

      <RelatedTools currentToolId="numerology" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['love-compatibility-by-date-of-birth', 'how-love-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
