import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShareModal } from '../components/ShareModal';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateFlames } from '../lib/calculatorEngine';
import { FlamesResult } from '../types';
import { Flame, RotateCcw, Share2, Sparkles, Check, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const FlamesPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<FlamesResult | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names to play FLAMES.');
      return;
    }
    try {
      setError('');
      const res = calculateFlames(name1, name2);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Please enter valid alphabetic names.');
    }
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setResult(null);
    setError('');
  };

  const faqs = [
    {
      question: 'What does FLAMES stand for?',
      answer:
        'FLAMES is an acronym representing six relationship possibilities: F = Friends, L = Lovers (Love), A = Affectionate (Attraction), M = Marriage, E = Enemies, and S = Siblings (Sister).',
    },
    {
      question: 'How are letters cancelled in the FLAMES test?',
      answer:
        'All matching letters between both names are eliminated on a 1-to-1 basis. For example, if both names contain the letter "a", one "a" from each name is struck out. The total count of all remaining uncancelled letters is then used to cyclically count through F-L-A-M-E-S until only one letter survives.',
    },
    {
      question: 'Does the MilanMeter FLAMES calculator use random results?',
      answer:
        'Never! Our calculator executes the exact authentic mathematical elimination steps that students have played on pen and paper for decades across Indian schools and colleges.',
    },
  ];

  const flamesFullList = [
    { letter: 'F', word: 'Friends', desc: 'Loyal companionship & shared humor' },
    { letter: 'L', word: 'Lovers', desc: 'Passionate romantic attraction' },
    { letter: 'A', word: 'Affectionate', desc: 'Tenderness, care & warmth' },
    { letter: 'M', word: 'Marriage', desc: 'Lifelong partnership & family destiny' },
    { letter: 'E', word: 'Enemies', desc: 'Dramatic rivalry or witty clashes' },
    { letter: 'S', word: 'Siblings', desc: 'Wholesome protective bond' },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'FLAMES Calculator Game Online',
    'url': 'https://milanmeter.com/flames-calculator/',
    'description': 'Play the authentic FLAMES relationship game online with step-by-step letter cancellation and cyclic elimination.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="FLAMES Calculator - Play FLAMES Love Game Online | MilanMeter"
        description="Play the authentic FLAMES love calculator game online with MilanMeter. Real step-by-step letter cancellation for Friends, Lovers, Affection, Marriage, Enemies, Siblings."
        canonicalPath="/flames-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/love-calculator/' },
          { label: 'FLAMES Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          FLAMES Love Calculator Game
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          The nostalgic Indian school & college game! Test your relationship fate: Friends, Lovers, Affectionate, Marriage, Enemies, or Siblings.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label
                  htmlFor="flameName1"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Your Name
                </label>
                <input
                  id="flameName1"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="e.g. Aryan"
                  maxLength={40}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-center my-2">
                <span className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 font-bold text-xs">
                  VS
                </span>
              </div>

              <div>
                <label
                  htmlFor="flameName2"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Crush / Partner Name
                </label>
                <input
                  id="flameName2"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="e.g. Diya"
                  maxLength={40}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md min-h-[48px]"
              >
                <Flame className="w-4 h-4 fill-white" />
                <span>Play FLAMES Now</span>
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Authentic elimination algorithm</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-rose-200 shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Outcome Display */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>FLAMES Verdict</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {result.person1} & {result.person2}
              </h3>
            </div>

            {/* Letter Showcase */}
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50/80 to-amber-50/40 rounded-2xl border border-rose-100 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-white border border-rose-200 shadow-sm flex items-center justify-center text-4xl font-extrabold text-rose-600 font-display mb-2">
                {result.resultLetter}
              </div>
              <span className="text-2xl font-bold text-slate-900 font-display">
                {result.resultWord}
              </span>
              <p className="text-xs text-center text-slate-600 max-w-sm mt-3 leading-relaxed">
                {result.meaning}
              </p>
            </div>

            {/* Step-by-Step Calculation Breakdown */}
            <div className="space-y-4 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider">
                FLAMES Mathematical Step Breakdown
              </h4>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Letters Cancelled:</span>
                  <span className="font-mono font-medium text-slate-800">
                    {result.steps.cancelledLetters.length > 0
                      ? result.steps.cancelledLetters.join(', ')
                      : 'None'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Unmatched Remainder Count:</span>
                  <span className="font-mono font-bold text-rose-600">
                    {result.remainingCount} letters
                  </span>
                </div>
              </div>

              {/* Elimination order */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-500 block mb-1">
                  Cyclic Elimination Rounds:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.steps.eliminationRounds.map((round, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-mono text-[11px]"
                    >
                      Round {idx + 1}: Struck <strong>{round.letterEliminated}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
              >
                <Share2 className="w-4 h-4" />
                <span>Share FLAMES Result</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {result && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          title="MilanMeter FLAMES Game"
          shareText={`🔥 FLAMES Result: ${result.person1} & ${result.person2} got [${result.resultLetter} - ${result.resultWord}] on MilanMeter!`}
          url="https://milanmeter.com/flames-calculator/"
        />
      )}

      {/* Nostalgic Guide & Letter Definitions */}
      <section className="mt-16 pt-12 border-t border-slate-200 space-y-8 text-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
              The History of FLAMES in India
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              The FLAMES game is an inseparable part of school and college nostalgia across India. From quiet backbenches to lively hostel corridors, generations of friends have struck through letters with pencils to discover romantic fates.
            </p>
            <p className="text-sm leading-relaxed">
              Our digital FLAMES tool eliminates the human counting mistakes that frequently occurred in busy classrooms, providing the true cyclic mathematical outcome every single time!
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-4/3 bg-slate-100">
            <img
              src="/src/assets/images/flames_notebook_game_1790774216847.jpg"
              alt="FLAMES game notebook nostalgia"
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 font-display mb-4">
            What Every Letter in F.L.A.M.E.S. Means:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {flamesFullList.map((item) => (
              <div
                key={item.letter}
                className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3"
              >
                <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 font-bold font-display flex items-center justify-center shrink-0">
                  {item.letter}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{item.word}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedTools currentToolId="flames-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-flames-calculator-works', 'friendship-compatibility-guide']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
