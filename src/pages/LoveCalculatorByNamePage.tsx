import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResultCard } from '../components/ResultCard';
import { ShareModal } from '../components/ShareModal';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { EngagementInputs } from '../components/EngagementInputs';
import { calculateLoveScore } from '../lib/calculatorEngine';
import { CompatibilityResult } from '../types';
import { Heart, User, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LoveCalculatorByNamePage: React.FC<Props> = ({ onNavigate }) => {
  const [personA, setPersonA] = useState('');
  const [personB, setPersonB] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [bondType, setBondType] = useState('In Love');
  const [vibe, setVibe] = useState('Chai & Late Night Talks');

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
    const res = calculateLoveScore(personA, personB, 'name', {
      age1,
      age2,
      bondType,
      vibe,
    });
    setResult(res);
  };

  const handleReset = () => {
    setPersonA('');
    setPersonB('');
    setAge1('');
    setAge2('');
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
        'No. CalculateLove enforces symmetric matching. Entering Person A first and Person B second produces the identical percentage as reversing the order.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love Calculator by Name',
    'url': 'https://calculatelove.online/love-calculator-by-name/',
    'description': 'Calculate love score and romantic resonance by full name or first name with instant deterministic matching.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Calculator by Name - Test Compatibility by Name | CalculateLove"
        description="Enter two names into CalculateLove's Love Calculator by Name to test romantic affinity, sound resonance, and compatibility percentage instantly."
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
          Discover the romantic chemistry and name vibration between you and your partner with optional age & bond customization.
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

              <div className="flex items-center justify-center my-1">
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

              <EngagementInputs
                age1={age1}
                setAge1={setAge1}
                age2={age2}
                setAge2={setAge2}
                bondType={bondType}
                setBondType={setBondType}
                vibe={vibe}
                setVibe={setVibe}
                person1Label="Person A"
                person2Label="Person B"
              />

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

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500">
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
          title="CalculateLove Name Compatibility"
          shareText={`✨ *${result.names.person1}* & *${result.names.person2}* Name Match: *${result.score}%*!\n✨ *${result.hinglishTagline}*\n💬 "${result.hinglishSuggestion}"`}
          url="https://calculatelove.online/love-calculator-by-name/"
        />
      )}

      <RelatedTools currentToolId="love-calculator-by-name" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-love-calculator-works', 'what-does-love-percentage-mean']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
