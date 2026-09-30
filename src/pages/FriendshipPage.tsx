import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShareModal } from '../components/ShareModal';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateFriendshipScore } from '../lib/calculatorEngine';
import { Users, RotateCcw, Share2, Sparkles, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const FriendshipPage: React.FC<Props> = ({ onNavigate }) => {
  const [friend1, setFriend1] = useState('');
  const [friend2, setFriend2] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateFriendshipScore> | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friend1.trim() || !friend2.trim()) {
      setError('Please provide names for both friends.');
      return;
    }
    setError('');
    const res = calculateFriendshipScore(friend1, friend2);
    setResult(res);
  };

  const handleReset = () => {
    setFriend1('');
    setFriend2('');
    setResult(null);
    setError('');
  };

  const faqs = [
    {
      question: 'How is the friendship percentage score calculated?',
      answer:
        'The friendship score measures name vibration and harmonic balance between two companions, evaluating camaraderie, loyalty, and banter dynamics.',
    },
    {
      question: 'Can I test my entire friend group?',
      answer:
        'Yes! You can test pairs among your circle of friends to see who has the highest banter or shared adventure score.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Friendship Calculator',
    'url': 'https://milanmeter.com/friendship-calculator/',
    'description': 'Check best friend compatibility, loyalty score, and shared humor meter for you and your closest friends.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Friendship Calculator - Best Friend Compatibility Test | MilanMeter"
        description="Test friendship percentage and bestie compatibility with MilanMeter's Friendship Calculator. Fun, private, deterministic scores for loyalty, humor, and support."
        canonicalPath="/friendship-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Friendship', href: '/friendship-calculator/' },
          { label: 'Friendship Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Friendship Compatibility Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Celebrate your closest bonds! Check friendship percentage, loyalty resonance, and shared laughter between best friends.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label
                  htmlFor="frName1"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Your Name
                </label>
                <input
                  id="frName1"
                  type="text"
                  value={friend1}
                  onChange={(e) => setFriend1(e.target.value)}
                  placeholder="e.g. Tanvi"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-center my-2">
                <span className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <Users className="w-4 h-4" />
                </span>
              </div>

              <div>
                <label
                  htmlFor="frName2"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Best Friend&apos;s Name
                </label>
                <input
                  id="frName2"
                  type="text"
                  value={friend2}
                  onChange={(e) => setFriend2(e.target.value)}
                  placeholder="e.g. Riya"
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
                className="w-full py-4 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md min-h-[48px]"
              >
                <span>Check Friendship Score</span>
                <Users className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic match · Zero data logged</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-amber-200 shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Friendship Resonance</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {result.names.person1} & {result.names.person2}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{result.title}</p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50/80 to-white rounded-2xl border border-amber-100 mb-6">
              <span className="text-4xl font-extrabold text-amber-700 font-display tabular-nums">
                {result.score}%
              </span>
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mt-1">
                Friendship Bond Score
              </span>
              <p className="text-xs text-center text-slate-600 max-w-sm mt-3 leading-relaxed">
                {result.desc}
              </p>
            </div>

            {/* Sub-scores */}
            <div className="space-y-3 mb-6">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Loyalty & Trust</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {result.breakdown.loyalty}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${result.breakdown.loyalty}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Banter & Inside Jokes</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {result.breakdown.banter}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${result.breakdown.banter}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Mutual Support & Advice</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {result.breakdown.support}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${result.breakdown.support}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Bestie</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Test Another Friend</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {result && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          title="Friendship Score"
          shareText={`👯 Friendship Test: ${result.names.person1} & ${result.names.person2} scored ${result.score}% (${result.title}) on MilanMeter!`}
          url="https://milanmeter.com/friendship-calculator/"
        />
      )}

      <RelatedTools currentToolId="friendship-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['friendship-compatibility-guide', 'how-flames-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
