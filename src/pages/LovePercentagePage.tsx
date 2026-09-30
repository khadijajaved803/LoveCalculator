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
import { Heart, Percent, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LovePercentagePage: React.FC<Props> = ({ onNavigate }) => {
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partner1.trim() || !partner2.trim()) {
      setError('Please provide both partner names.');
      return;
    }
    setError('');
    const res = calculateLoveScore(partner1, partner2, 'percentage');
    setResult(res);
  };

  const handleReset = () => {
    setPartner1('');
    setPartner2('');
    setResult(null);
    setError('');
  };

  const faqs = [
    {
      question: 'What does a love percentage score signify?',
      answer:
        'A love percentage score is an entertaining metric evaluating mutual harmony, communication resonance, and shared emotional energy based on name mathematics. It provides a fun conversational spark for couples.',
    },
    {
      question: 'Is a 100% love score possible?',
      answer:
        'In genuine mathematics and realistic relationships, perfection is a myth! Our tool caps maximum scores at 98% because healthy partnerships always leave room for personal growth, individuality, and discovery.',
    },
    {
      question: 'Does a lower percentage mean a couple should separate?',
      answer:
        'Absolutely not! A digital calculator is an entertainment utility. Real love is determined by loyalty, shared memories, how you handle stress together, and daily commitments—not an online score.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love Percentage Calculator',
    'url': 'https://milanmeter.com/love-percentage-calculator/',
    'description': 'Calculate your exact love percentage score with dimensional breakdowns for communication, emotional harmony, and passion.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Percentage Calculator - Check Love Score Online | MilanMeter"
        description="Calculate your exact love percentage score with MilanMeter. Detailed compatibility metrics for communication, emotional harmony, and relationship longevity."
        canonicalPath="/love-percentage-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Love Calculators', href: '/love-calculator/' },
          { label: 'Love Percentage Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Love Percentage Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Get an exact love percentage metric with multi-dimensional breakdowns for communication, care, chemistry, and longevity.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label
                  htmlFor="lpPartner1"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  First Partner Name
                </label>
                <input
                  id="lpPartner1"
                  type="text"
                  value={partner1}
                  onChange={(e) => setPartner1(e.target.value)}
                  placeholder="e.g. Siddharth"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-center my-2">
                <span className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <Percent className="w-4 h-4 text-rose-500" />
                </span>
              </div>

              <div>
                <label
                  htmlFor="lpPartner2"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Second Partner Name
                </label>
                <input
                  id="lpPartner2"
                  type="text"
                  value={partner2}
                  onChange={(e) => setPartner2(e.target.value)}
                  placeholder="e.g. Meera"
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
                <span>Calculate Love Percentage</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic calculations · Safe & private</span>
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
          title="MilanMeter Love Percentage"
          shareText={`📊 Love Percentage Result: ${result.names.person1} & ${result.names.person2} share a ${result.score}% compatibility score!`}
          url="https://milanmeter.com/love-percentage-calculator/"
        />
      )}

      {/* Editorial Content */}
      <section className="mt-16 pt-12 border-t border-slate-200 space-y-8 text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
            What Does a Love Percentage Truly Represent?
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            A love percentage score is a playful, engaging way to look at how different facets of personality fit together. In relationship psychology, compatibility is multi-faceted—comprising emotional safety, cognitive alignment, shared humor, and romantic chemistry.
          </p>
          <p className="text-sm leading-relaxed">
            Our score breaks down these four dimensions so you and your partner can reflect on what makes your connection unique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">Communication Flow</h3>
            <p className="text-slate-600">The ease of expressing vulnerability, sharing daily joys, and resolving disagreements with compassion.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">Emotional Security</h3>
            <p className="text-slate-600">Knowing your partner has your back during stressful work days or personal challenges.</p>
          </div>
        </div>
      </section>

      <RelatedTools currentToolId="love-percentage-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['what-does-love-percentage-mean', 'how-love-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
