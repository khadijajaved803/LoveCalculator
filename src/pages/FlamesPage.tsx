import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShareModal } from '../components/ShareModal';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateFlames } from '../lib/calculatorEngine';
import { FlamesResult } from '../types';
import {
  Flame,
  RotateCcw,
  Share2,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  ShieldCheck,
  Lightbulb,
  Heart,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const FlamesPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [bondType, setBondType] = useState('Crush');

  const [result, setResult] = useState<FlamesResult | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const websiteUrl = 'https://calculatelove.online';

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names to play FLAMES.');
      return;
    }
    try {
      setError('');
      const res = calculateFlames(name1, name2, { age1, age2, bondType });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Please enter valid alphabetic names.');
    }
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setAge1('');
    setAge2('');
    setResult(null);
    setError('');
  };

  const getShareText = () => {
    if (!result) return '';
    return `🔥 *FLAMES Result* for *${result.person1}* & *${result.person2}*!\n🏆 Outcome: *[${result.resultLetter}] - ${result.resultWord}*\n✨ *${result.hinglishTagline}*\n💬 "${result.hinglishSuggestion}"\n\n👉 Play FLAMES free at: ${websiteUrl}`;
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(getShareText());
    window.location.href = `https://api.whatsapp.com/send?text=${encoded}`;
  };

  const handleFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent(getShareText())}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
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
    'url': 'https://calculatelove.online/flames-calculator/',
    'description': 'Play the authentic FLAMES relationship game online with step-by-step letter cancellation and cyclic elimination.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="FLAMES Calculator - Play FLAMES Love Game Online | CalculateLove"
        description="Play the authentic FLAMES love calculator game online with CalculateLove. Real step-by-step letter cancellation for Friends, Lovers, Affection, Marriage, Enemies, Siblings."
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
          The nostalgic Indian school & college game! Discover your outcome with letter cancellation and authentic Hinglish predictions.
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

              <div className="flex items-center justify-center my-1">
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

              {/* Engaging Age Inputs */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Ages (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="10"
                    max="99"
                    value={age1}
                    onChange={(e) => setAge1(e.target.value)}
                    placeholder="Your Age (e.g. 21)"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs min-h-[42px]"
                  />
                  <input
                    type="number"
                    min="10"
                    max="99"
                    value={age2}
                    onChange={(e) => setAge2(e.target.value)}
                    placeholder="Crush Age (e.g. 21)"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs min-h-[42px]"
                  />
                </div>
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

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Authentic elimination algorithm</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="relative bg-gradient-to-b from-white via-amber-50/20 to-white rounded-3xl border-2 border-rose-200 shadow-xl overflow-hidden p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-pink-500" />

            <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 uppercase tracking-widest font-mono">
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>calculatelove.online</span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full">
                FLAMES Result
              </span>
            </div>

            {/* Outcome Display */}
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {result.person1} & {result.person2}
              </h3>
              <p className="text-xs font-semibold text-rose-600 mt-1">
                {result.hinglishTagline}
              </p>
            </div>

            {/* Letter Showcase Hero */}
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50/90 to-amber-50/50 rounded-3xl border border-rose-200/80 mb-6 shadow-inner">
              <div className="w-20 h-20 rounded-2xl bg-white border-2 border-rose-300 shadow-md flex items-center justify-center text-4xl font-extrabold text-rose-600 font-display mb-2">
                {result.resultLetter}
              </div>
              <span className="text-2xl font-extrabold text-slate-900 font-display">
                {result.resultWord}
              </span>
              <p className="text-xs text-center text-slate-600 max-w-sm mt-2 leading-relaxed">
                {result.meaning}
              </p>
            </div>

            {/* Dil Ki Baat - Hinglish Reflection */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50/50 border border-amber-200/80 mb-6 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>FLAMES Ki Bhavishyavani · Hinglish</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {result.hinglishSuggestion}
              </p>
              <div className="pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-950 font-medium">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{result.hinglishTip}</span>
              </div>
            </div>

            {/* Step-by-Step Calculation Breakdown */}
            <div className="space-y-3 mb-6 p-4 rounded-2xl bg-white border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider">
                FLAMES Mathematical Step Breakdown
              </h4>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Letters Cancelled:</span>
                  <span className="font-mono font-medium text-slate-800">
                    {result.steps.cancelledLetters.length > 0
                      ? result.steps.cancelledLetters.join(', ')
                      : 'None'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Unmatched Letters:</span>
                  <span className="font-mono font-bold text-rose-600">
                    {result.remainingCount} letters
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-500 block mb-1">
                  Cyclic Elimination Rounds:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.steps.eliminationRounds.map((round, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px]"
                    >
                      Round {idx + 1}: Struck <strong>{round.letterEliminated}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Sharing Actions */}
            <div className="space-y-2 mb-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleFacebook}
                  className="py-3 px-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm min-h-[44px]"
                >
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Copied FLAMES Card!' : 'Copy FLAMES Text'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Play Again</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Tested on calculatelove.online</span>
              <span>100% Free & Private</span>
            </div>
          </div>
        )}
      </div>

      <RelatedTools currentToolId="flames-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-flames-calculator-works', 'friendship-compatibility-guide']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
