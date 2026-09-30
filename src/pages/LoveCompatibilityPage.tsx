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
import { HeartHandshake, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LoveCompatibilityPage: React.FC<Props> = ({ onNavigate }) => {
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!person1.trim() || !person2.trim()) {
      setError('Please enter both partner names.');
      return;
    }
    setError('');
    const res = calculateLoveScore(person1, person2, 'general');
    setResult(res);
  };

  const handleReset = () => {
    setPerson1('');
    setPerson2('');
    setResult(null);
    setError('');
  };

  const faqs = [
    {
      question: 'What distinguishes this compatibility test from a basic love score?',
      answer:
        'Our Love Compatibility Calculator explores relationship sustainability, emotional safety, shared worldview, and conflict resolution capacity alongside chemistry.',
    },
    {
      question: 'Can two people with very different personalities be compatible?',
      answer:
        'Yes! Often, complementary personalities (e.g. one reflective planner and one spontaneous explorer) create harmonious partnerships because they balance each other’s natural blind spots.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love Compatibility Calculator',
    'url': 'https://milanmeter.com/love-compatibility-calculator/',
    'description': 'In-depth relationship compatibility test evaluating communication, shared core values, and lasting commitment.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Compatibility Calculator - Relationship Harmony Test | MilanMeter"
        description="Test deep relationship compatibility and emotional harmony with MilanMeter. In-depth name chemistry analysis for communication, trust, and shared longevity."
        canonicalPath="/love-compatibility-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Love Calculators', href: '/love-calculator/' },
          { label: 'Love Compatibility' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Love Compatibility Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Comprehensive compatibility analysis evaluating conversational harmony, mutual trust, and long-term partnership potential.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label
                  htmlFor="lcPerson1"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Partner 1
                </label>
                <input
                  id="lcPerson1"
                  type="text"
                  value={person1}
                  onChange={(e) => setPerson1(e.target.value)}
                  placeholder="e.g. Devansh"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-center my-2">
                <span className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <HeartHandshake className="w-4 h-4 text-rose-500" />
                </span>
              </div>

              <div>
                <label
                  htmlFor="lcPerson2"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Partner 2
                </label>
                <input
                  id="lcPerson2"
                  type="text"
                  value={person2}
                  onChange={(e) => setPerson2(e.target.value)}
                  placeholder="e.g. Ishita"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/10 min-h-[48px]"
              >
                <span>Analyze Full Compatibility</span>
                <HeartHandshake className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Private & deterministic · Symmetric matching</span>
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
          title="MilanMeter Compatibility"
          shareText={`💞 Relationship Compatibility: ${result.names.person1} & ${result.names.person2} scored ${result.score}% on MilanMeter!`}
          url="https://milanmeter.com/love-compatibility-calculator/"
        />
      )}

      <RelatedTools currentToolId="love-compatibility-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['what-does-love-percentage-mean', 'how-love-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
