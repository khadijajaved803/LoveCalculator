import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { CalculationLoader } from '../components/CalculationLoader';
import { calculateLoveScore } from '../lib/calculatorEngine';
import {
  Users,
  Sparkles,
  RotateCcw,
  Heart,
  Volume2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const NameCompatibilityPage: React.FC<Props> = ({ onNavigate }) => {
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateLoveScore> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partner1.trim() || !partner2.trim()) {
      setError('Please enter both names to test compatibility.');
      return;
    }
    setError('');
    setIsCalculating(true);
  };

  const handleReset = () => {
    setPartner1('');
    setPartner2('');
    setResult(null);
    setIsCalculating(false);
    setError('');
  };

  const faqs = [
    {
      question: 'How does the Name Compatibility Test work?',
      answer:
        'The name compatibility test uses phonetic harmonic analysis. It compares the balance of vowels and consonants, sound resonance, and letter energy frequencies between both names to determine how melodically and energetically they harmonize.',
    },
    {
      question: 'What is the difference between Name Compatibility and Love Percentage?',
      answer:
        'Name compatibility focuses specifically on phonetic sound vibrations, rhythm, and character harmony between spoken names. Love percentage combines this phonetic evaluation with broader emotional dimensions, age dynamics, and relationship pillars.',
    },
    {
      question: 'Can two names with low phonetic harmony have a wonderful relationship?',
      answer:
        'Of course! Phonetic name matching is an entertaining linguistic model. Real romantic relationships thrive on emotional safety, honesty, shared future goals, and mutual empathy.',
    },
    {
      question: 'Is name matching for marriage identical to Vedic Kundli Milan?',
      answer:
        'No. Traditional Vedic Kundli Milan evaluates birth coordinates, planetary lagna, and Nakshatra Gunas (out of 36). Our name compatibility test is a modern linguistic entertainment tool based on letters and vowels.',
    },
    {
      question: 'Are our entered names saved on your server?',
      answer:
        'No data is stored. All name calculations occur 100% inside your local web browser, ensuring total privacy.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Name Compatibility Test – Check Your Match by Name',
    url: 'https://calculatelove.online/name-compatibility/',
    description:
      'Test name compatibility, vowel-consonant phonetic harmony, and letter matching between two partners on CalculateLove. Free and private.',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Name Compatibility Test – Check Your Match by Name | CalculateLove"
        description="Check couple name compatibility and true love name match. Discover phonetic sound vibrations, vowel-consonant harmony, and letter resonance between two names."
        canonicalPath="/name-compatibility/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Name Compatibility' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-3 border border-rose-200">
          <Volume2 className="w-3.5 h-3.5 text-rose-600" />
          <span>Phonetic Sound Harmony &amp; Letter Resonance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Name Compatibility Test – Check Your Match by Name
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          Analyze phonetic resonance, syllable balance, and vowel-consonant harmony between two names for genuine couple compatibility.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <div className="w-full mb-12">
        {isCalculating ? (
          <CalculationLoader
            name1={partner1}
            name2={partner2}
            type="love"
            onComplete={() => {
              const res = calculateLoveScore(partner1, partner2, 'general', {
                bondType: 'Couple',
                vibe: 'Phonetic Harmony',
              });
              setResult(res);
              setIsCalculating(false);
            }}
          />
        ) : !result ? (
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-lg p-5 sm:p-7 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

            <form onSubmit={handleCalculate} className="space-y-5">
              <div className="border-b border-slate-100 pb-3 mb-2">
                <h2 className="text-base font-extrabold text-slate-900 font-display">
                  Compare Two Names
                </h2>
                <p className="text-xs text-slate-500">
                  Calculates letter frequency balance, phonetic vibrations, and character resonance
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="p1NameInput" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    First Name
                  </label>
                  <input
                    id="p1NameInput"
                    type="text"
                    value={partner1}
                    onChange={(e) => setPartner1(e.target.value)}
                    placeholder="e.g. Kabir"
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="p2NameInput" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Second Name
                  </label>
                  <input
                    id="p2NameInput"
                    type="text"
                    value={partner2}
                    onChange={(e) => setPartner2(e.target.value)}
                    placeholder="e.g. Tara"
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px]"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 min-h-[46px]"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Calculate Name Compatibility</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-lg p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
                  Name Compatibility Score
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                  {partner1} &amp; {partner2}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Test Other Names</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 text-center space-y-2">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  Harmonic Score
                </span>
                <div className="text-5xl font-extrabold text-rose-600 font-display">
                  {result.score}%
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  {result.grade}
                </p>
              </div>

              <div className="md:col-span-2 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Linguistic &amp; Phonetic Breakdown
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {result.explanation}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block text-[11px]">Syllable Flow</span>
                    <strong className="text-slate-900 font-semibold">{result.breakdown.communication}%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block text-[11px]">Vowel Harmony</span>
                    <strong className="text-slate-900 font-semibold">{result.breakdown.passion}%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Authority Section: How Name Compatibility Works */}
      <section className="bg-white rounded-3xl border border-rose-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-2">
            Linguistic Principles
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            How Name Compatibility Works: Letters, Vowels &amp; Rhythm
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Names are not just labels; they are sound frequencies we hear every day. Linguistic researchers note that names sharing phonetic vowel heights and complementary consonant clusters often sound inherently harmonious when spoken together as a couple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">1. Symmetrical Letter Matching</h3>
            <p className="text-slate-600 leading-relaxed">
              Shared alphabet letters and rhythmic letter frequencies create subconscious audio symmetry when a couple introduces themselves.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">2. Vowel-to-Consonant Ratio</h3>
            <p className="text-slate-600 leading-relaxed">
              Names balanced with open vowels (A, E, I, O, U) convey emotional warmth, while structured consonants ground conversational strength.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">3. Syllable Cadence</h3>
            <p className="text-slate-600 leading-relaxed">
              Shorter two-syllable names often complement longer three-syllable names naturally, creating a pleasant spoken couple cadence.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Linking & Next Steps */}
      <section className="bg-rose-50/50 rounded-3xl border border-rose-200/80 p-6 sm:p-8 mb-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-3">
          Explore Other Popular Love &amp; Compatibility Tests
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/love-calculator/')}
            className="p-4 rounded-2xl bg-white border border-rose-200 text-left hover:border-rose-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-rose-600 group-hover:text-rose-700 block mb-1">
              Master Love Calculator →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Our complete 4-pillar true love percentage tool with downloadable certificate.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/crush-calculator/')}
            className="p-4 rounded-2xl bg-white border border-rose-200 text-left hover:border-rose-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-rose-600 group-hover:text-rose-700 block mb-1">
              Crush Calculator →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Test secret crush chemistry and confession readiness between you and your crush.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/love-percentage-on-paper/')}
            className="p-4 rounded-2xl bg-white border border-rose-200 text-left hover:border-rose-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-rose-600 group-hover:text-rose-700 block mb-1">
              Paper Love Percentage →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Learn how to calculate love percentage on paper with step-by-step instructions.
            </p>
          </button>
        </div>
      </section>

      <RelatedTools currentToolId="name-compatibility" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-love-calculator-works', 'what-does-love-percentage-mean']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
