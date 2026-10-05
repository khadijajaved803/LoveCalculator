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
import { Sparkles, Heart, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const TrueLovePage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [bondType, setBondType] = useState('Crush');
  const [vibe, setVibe] = useState('Chai & Late Night Talks');

  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names to test soulmate affinity.');
      return;
    }
    setError('');
    const res = calculateLoveScore(name1, name2, 'soulmate', {
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
      question: 'What is a "soulmate" according to relationship psychology?',
      answer:
        'Modern psychologists describe a soulmate not as a flawless pre-ordained destiny, but as someone with whom you cultivate a deep sanctuary of mutual emotional safety, shared purpose, and patient understanding.',
    },
    {
      question: 'Can this tool scientifically prove someone is my true love?',
      answer:
        'No. True love cannot be determined by an online program. Our True Love Calculator offers an entertaining, uplifting reflection on relationship harmony, but true love is proven through real actions, loyalty, and empathy.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'True Love & Soulmate Calculator',
    'url': 'https://calculatelove.online/true-love-calculator/',
    'description': 'Explore soulmate affinity and true love connection with intuitive name vibration analysis and romantic insights.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="True Love Calculator - Soulmate Compatibility Test | CalculateLove"
        description="Discover your soulmate connection and true love affinity with CalculateLove. Test crush compatibility and romantic chemistry with deterministic name analysis."
        canonicalPath="/true-love-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Love Calculators', href: '/love-calculator/' },
          { label: 'True Love Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          True Love & Soulmate Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Explore soulmate affinity and heartfelt emotional resonance with custom age and couple bond traits.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label
                  htmlFor="tlName1"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Your Name
                </label>
                <input
                  id="tlName1"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="e.g. Vikram"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-center my-1">
                <span className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                </span>
              </div>

              <div>
                <label
                  htmlFor="tlName2"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Your Soulmate&apos;s / Crush&apos;s Name
                </label>
                <input
                  id="tlName2"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="e.g. Maya"
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
                person1Label="Your"
                person2Label="Crush / Partner"
              />

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/10 min-h-[48px]"
              >
                <span>Discover Soulmate Resonance</span>
                <Sparkles className="w-4 h-4 text-white" />
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
          title="CalculateLove Soulmate Test"
          shareText={`💫 True Love Test: *${result.names.person1}* & *${result.names.person2}* scored *${result.score}%* Soulmate Harmony!\n✨ *${result.hinglishTagline}*\n💬 "${result.hinglishSuggestion}"`}
          url="https://calculatelove.online/true-love-calculator/"
        />
      )}

      <RelatedTools currentToolId="true-love-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['what-is-a-soulmate', 'what-does-love-percentage-mean']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
