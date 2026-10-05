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
import { Heart, Percent, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LovePercentagePage: React.FC<Props> = ({ onNavigate }) => {
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [bondType, setBondType] = useState('In Love');
  const [vibe, setVibe] = useState('Chai & Late Night Talks');

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
    const res = calculateLoveScore(partner1, partner2, 'percentage', {
      age1,
      age2,
      bondType,
      vibe,
    });
    setResult(res);
  };

  const handleReset = () => {
    setPartner1('');
    setPartner2('');
    setAge1('');
    setAge2('');
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
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love Percentage Calculator',
    'url': 'https://calculatelove.online/love-percentage-calculator/',
    'description': 'Calculate your exact love percentage score with dimensional breakdowns for communication, emotional harmony, and passion.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Percentage Calculator - Check Love Score Online | CalculateLove"
        description="Calculate your exact love percentage score with CalculateLove. Detailed compatibility metrics for communication, emotional harmony, and relationship longevity."
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
          Get an exact love percentage metric with multi-dimensional breakdowns and authentic Hinglish suggestions.
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

              <div className="flex items-center justify-center my-1">
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

              <EngagementInputs
                age1={age1}
                setAge1={setAge1}
                age2={age2}
                setAge2={setAge2}
                bondType={bondType}
                setBondType={setBondType}
                vibe={vibe}
                setVibe={setVibe}
                person1Label="Partner 1"
                person2Label="Partner 2"
              />

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

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500">
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
          title="CalculateLove Percentage"
          shareText={`📊 Love Percentage: *${result.names.person1}* & *${result.names.person2}* scored *${result.score}%*!\n✨ *${result.hinglishTagline}*\n💬 "${result.hinglishSuggestion}"`}
          url="https://calculatelove.online/love-percentage-calculator/"
        />
      )}

      <RelatedTools currentToolId="love-percentage-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['what-does-love-percentage-mean', 'how-love-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
