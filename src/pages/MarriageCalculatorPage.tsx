import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShareModal } from '../components/ShareModal';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateMarriagePreference } from '../lib/calculatorEngine';
import { Gem, RotateCcw, Share2, Sparkles, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const MarriageCalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [familyPriority, setFamilyPriority] = useState(3);
  const [adventureStyle, setAdventureStyle] = useState(3);
  const [communication, setCommunication] = useState(4);
  const [result, setResult] = useState<ReturnType<typeof calculateMarriagePreference> | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      setError('Please provide names for both partners.');
      return;
    }
    setError('');
    const res = calculateMarriagePreference(name1, name2, {
      familyPriority,
      socialCircle: 3,
      adventureStyle,
      communication,
    });
    setResult(res);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setResult(null);
    setError('');
  };

  const faqs = [
    {
      question: 'How does the Love vs. Arranged Marriage Calculator work?',
      answer:
        'It synthesizes name harmony with practical lifestyle preferences—evaluating personal dating autonomy, family involvement priorities, and communication style to compute a percentage alignment between modern romance and traditional family blessing.',
    },
    {
      question: 'Can any tool predict the exact type of marriage I will have?',
      answer:
        'No algorithm or astrological tool can definitively control or predict your marital future. Your life choices, family dialogues, and personal values will ultimately shape whether you pursue a self-found romance, an assisted matrimonial match, or a blended love marriage with full parental blessings.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love vs. Arranged Marriage Calculator',
    'url': 'https://milanmeter.com/love-or-arranged-marriage-calculator/',
    'description': 'Evaluate personality traits, family orientation, and romance style to explore your marriage destiny alignment.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love or Arranged Marriage Calculator - Marriage Match Test | MilanMeter"
        description="Check your marriage destiny alignment with MilanMeter's Love vs. Arranged Marriage Calculator. Explore love marriage probability, family dynamics, and compatibility."
        canonicalPath="/love-or-arranged-marriage-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/love-calculator/' },
          { label: 'Love vs. Arranged Marriage' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Love vs. Arranged Marriage Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Will your path be a self-discovered love marriage or a traditional family-guided alliance? Explore your personality and relationship alignment.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="mName1"
                    className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="mName1"
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="e.g. Ankit"
                    maxLength={50}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="mName2"
                    className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                  >
                    Partner Name
                  </label>
                  <input
                    id="mName2"
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="e.g. Shalini"
                    maxLength={50}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 min-h-[44px]"
                    required
                  />
                </div>
              </div>

              {/* Preference Questions */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-700">Family Involvement & Tradition</span>
                    <span className="text-slate-500 font-mono">{familyPriority} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={familyPriority}
                    onChange={(e) => setFamilyPriority(parseInt(e.target.value, 10))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Individual Autonomy</span>
                    <span>High Family Centrality</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-700">Spontaneous Dating & Courtship</span>
                    <span className="text-slate-500 font-mono">{adventureStyle} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={adventureStyle}
                    onChange={(e) => setAdventureStyle(parseInt(e.target.value, 10))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Practical & Calm</span>
                    <span>Passionate & Spontaneous</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-700">Direct Vulnerable Communication</span>
                    <span className="text-slate-500 font-mono">{communication} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={communication}
                    onChange={(e) => setCommunication(parseInt(e.target.value, 10))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Reserved</span>
                    <span>Deeply Expressive</span>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md min-h-[48px]"
              >
                <Gem className="w-4 h-4" />
                <span>Calculate Marriage Alignment</span>
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Culturally tuned · Non-judgmental & private</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-rose-200 shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
                <Gem className="w-3.5 h-3.5" />
                <span>Matrimonial Balance</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {result.names.person1} & {result.names.person2}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{result.outlook}</p>
            </div>

            {/* Split comparison bar */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-rose-600">Love Marriage: {result.lovePercentage}%</span>
                <span className="text-indigo-600">Arranged Alliance: {result.arrangedPercentage}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-indigo-100 overflow-hidden flex">
                <div
                  className="h-full bg-rose-500 transition-all duration-700"
                  style={{ width: `${result.lovePercentage}%` }}
                />
                <div
                  className="h-full bg-indigo-600 transition-all duration-700"
                  style={{ width: `${result.arrangedPercentage}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200/60">
              {result.advice}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Marriage Outcome</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Calculate Again</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {result && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          title="MilanMeter Marriage Alignment"
          shareText={`💍 Marriage Alignment: ${result.names.person1} & ${result.names.person2} received ${result.lovePercentage}% Love Marriage / ${result.arrangedPercentage}% Arranged Alliance on MilanMeter!`}
          url="https://milanmeter.com/love-or-arranged-marriage-calculator/"
        />
      )}

      <RelatedTools currentToolId="love-or-arranged-marriage-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['love-vs-arranged-marriage', 'how-love-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
