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
import { Heart, Sparkles, ShieldCheck, SlidersHorizontal } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LoveCalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [bondType, setBondType] = useState('Dating');
  const [vibe, setVibe] = useState('Chai & Late Night Talks');
  const [showAdvanced, setShowAdvanced] = useState(true);

  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both your name and your partner’s name.');
      return;
    }
    setError('');
    const res = calculateLoveScore(name1, name2, 'general', {
      age1,
      age2,
      bondType,
      vibe,
    });
    setResult(res);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setAge1('');
    setAge2('');
    setResult(null);
    setError('');
  };

  const faqs = [
    {
      question: 'How does the online love calculator compute the score?',
      answer:
        'Our love calculator uses deterministic character harmonic analysis. It analyzes letter frequency, vowel structure, and phonetic synergy between both names. It also factors in your optional ages and couple vibe for personalized relationship reflections.',
    },
    {
      question: 'Is this love test private?',
      answer:
        'Yes, 100% private. Calculations take place instantly inside your browser. We never store, transmit, or share your names or ages.',
    },
    {
      question: 'Can a love calculator predict if a relationship will succeed?',
      answer:
        'No. Love calculators are fun entertainment tools designed to spark romantic conversation and playful reflection. Real, lasting relationships depend on mutual trust, emotional maturity, open communication, and shared values.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love Calculator - Test Compatibility Score Online',
    'url': 'https://calculatelove.online/love-calculator/',
    'description': 'Free online love calculator to test real compatibility percentage and relationship chemistry between two names.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Calculator - Test True Love Percentage by Name | CalculateLove"
        description="Calculate love compatibility percentage between two names instantly with CalculateLove. Fun, private, deterministic love score with personalized relationship insights."
        canonicalPath="/love-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Love Calculators', href: '/love-calculator/' },
          { label: 'Love Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Free Online Love Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Test love percentage, mutual chemistry, and emotional harmony between two names with custom age & relationship vibe analysis.
        </p>
      </div>

      {/* Calculator Shell */}
      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label
                  htmlFor="person1"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Your Name
                </label>
                <input
                  id="person1"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-center my-1">
                <span className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                </span>
              </div>

              <div>
                <label
                  htmlFor="person2"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Partner&apos;s / Crush&apos;s Name
                </label>
                <input
                  id="person2"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="e.g. Ananya Patel"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              {/* Engaging Inputs: Age, Bond Type, Vibe */}
              <EngagementInputs
                age1={age1}
                setAge1={setAge1}
                age2={age2}
                setAge2={setAge2}
                bondType={bondType}
                setBondType={setBondType}
                vibe={vibe}
                setVibe={setVibe}
                person1Label="Your"
                person2Label="Partner's"
              />

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/10 min-h-[48px]"
              >
                <span>Calculate Compatibility</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic match · Zero data logged</span>
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
          title="CalculateLove Compatibility Score"
          shareText={`💖 *${result.names.person1}* & *${result.names.person2}* Love Score: *${result.score}%*!\n✨ *${result.hinglishTagline}*\n💬 "${result.hinglishSuggestion}"`}
          url="https://calculatelove.online/love-calculator/"
        />
      )}

      {/* Editorial Content */}
      <section className="mt-16 pt-12 border-t border-slate-200 space-y-10 text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
            How Does the Love Calculator Work?
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            Unlike superficial tools that generate random percentages, CalculateLove uses deterministic character harmonization and phonetic vibrations. Every letter carries structural resonance, and when paired with your age dynamic and couple vibe, generates custom relationship reflections.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
            Understanding Your Love Compatibility Score
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">85% to 98% · Rab Ne Bana Di Jodi</h3>
              <p className="text-slate-600">
                Deep natural chemistry, effortless conversations, and emotional security. You understand each other without saying much.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">70% to 84% · Harmonious Sukoon</h3>
              <p className="text-slate-600">
                Solid foundation with mutual respect and care. Both partners uplift and support each other&apos;s individuality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools currentToolId="love-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-love-calculator-works', 'what-does-love-percentage-mean']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
