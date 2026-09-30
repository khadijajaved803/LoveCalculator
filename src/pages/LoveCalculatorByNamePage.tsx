import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResultCard } from '../components/ResultCard';
import { ShareModal } from '../components/ShareModal';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateLoveScore } from '../lib/calculatorEngine';
import { CompatibilityResult } from '../types';
import { Heart, Sparkles, User, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LoveCalculatorByNamePage: React.FC<Props> = ({ onNavigate }) => {
  const [personA, setPersonA] = useState('');
  const [personB, setPersonB] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personA.trim() || !personB.trim()) {
      setError('Please provide both names to test compatibility.');
      return;
    }
    setError('');
    const res = calculateLoveScore(personA, personB, 'name');
    setResult(res);
  };

  const handleReset = () => {
    setPersonA('');
    setPersonB('');
    setResult(null);
    setError('');
  };

  const faqs = [
    {
      question: 'Can I enter just first names or full names?',
      answer:
        'You can enter first names, full names, or nicknames! Full names provide a deeper character harmonic count, while first names evaluate everyday conversational phonetic resonance.',
    },
    {
      question: 'Does the order of names change the love test score?',
      answer:
        'No. MilanMeter enforces symmetric matching. Entering Person A first and Person B second produces the identical percentage as reversing the order.',
    },
    {
      question: 'Why do names influence relationship compatibility in folklore?',
      answer:
        'In Indian cultural traditions and Western onomastics, names are closely tied to sound vibration (Naam Akshar in Vedic astrology, or Pythagorean vibration in numerology). While this calculator is designed for fun and entertainment, name resonance has been celebrated for centuries as a symbol of romantic destiny.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love Calculator by Name',
    'url': 'https://milanmeter.com/love-calculator-by-name/',
    'description': 'Calculate love score and romantic resonance by full name or first name with instant deterministic matching.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Calculator by Name - Test Compatibility by Name | MilanMeter"
        description="Enter two names into MilanMeter's Love Calculator by Name to test romantic affinity, sound resonance, and compatibility percentage instantly."
        canonicalPath="/love-calculator-by-name/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Love Calculators', href: '/love-calculator/' },
          { label: 'Love Calculator by Name' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Love Calculator by Name
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Discover the romantic chemistry and name vibration between you and your partner. Works with first names or full names.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label
                  htmlFor="personA"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Person A (Your Name)
                </label>
                <div className="relative">
                  <input
                    id="personA"
                    type="text"
                    value={personA}
                    onChange={(e) => setPersonA(e.target.value)}
                    placeholder="e.g. Rohan Mehra"
                    maxLength={50}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="flex items-center justify-center my-2">
                <span className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                </span>
              </div>

              <div>
                <label
                  htmlFor="personB"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Person B (Partner / Crush Name)
                </label>
                <div className="relative">
                  <input
                    id="personB"
                    type="text"
                    value={personB}
                    onChange={(e) => setPersonB(e.target.value)}
                    placeholder="e.g. Simran Kaur"
                    maxLength={50}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/10 min-h-[48px]"
              >
                <span>Calculate Name Compatibility</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic algorithm · Symmetrical calculation</span>
              </div>
            </form>
          </div>
        ) : (
          <ResultCard
            result={result}
            onReset={handleReset}
            onShare={() => setShareOpen(true)}
          />
        )}
      </div>

      {result && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          title="MilanMeter Name Compatibility"
          shareText={`✨ Name Love Compatibility: ${result.names.person1} & ${result.names.person2} scored ${result.score}% (${result.verdict}) on MilanMeter!`}
          url="https://milanmeter.com/love-calculator-by-name/"
        />
      )}

      {/* Deep Content */}
      <section className="mt-16 pt-12 border-t border-slate-200 space-y-8 text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
            Why Test Love Compatibility by Name?
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            Names are not merely labels; they are sound frequencies we hear hundreds of times every month. In Indian onomastics and relationship folklore, names that blend melodiously create a feeling of familiarity and warmth.
          </p>
          <p className="text-sm leading-relaxed">
            Our Love Calculator by Name calculates the cross-resonance of vowels, consonant structures, and letter symmetry to output a fun, deterministic compatibility metric.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-2">
          <h3 className="font-bold text-slate-900">Tips for Best Results:</h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Try testing both full legal names and affectionate everyday nicknames.</li>
            <li>Compare with our <button type="button" onClick={() => onNavigate('/flames-calculator/')} className="text-rose-600 underline">FLAMES game</button> for another playful perspective.</li>
            <li>Remember that real-life relationships are forged through compassion, trust, and shared values.</li>
          </ul>
        </div>
      </section>

      <RelatedTools currentToolId="love-calculator-by-name" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-love-calculator-works', 'what-does-love-percentage-mean']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
