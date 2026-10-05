import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShareModal } from '../components/ShareModal';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateDobCompatibility } from '../lib/calculatorEngine';
import {
  Calendar,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Copy,
  Check,
  Lightbulb,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const DobCalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [dob1, setDob1] = useState('');
  const [name2, setName2] = useState('');
  const [dob2, setDob2] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateDobCompatibility> | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const websiteUrl = 'https://calculatelove.online';

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !dob1 || !name2.trim() || !dob2) {
      setError('Please provide names and dates of birth for both individuals.');
      return;
    }
    setError('');
    const res = calculateDobCompatibility(name1, dob1, name2, dob2);
    setResult(res);
  };

  const handleReset = () => {
    setName1('');
    setDob1('');
    setName2('');
    setDob2('');
    setResult(null);
    setError('');
  };

  const getShareText = () => {
    if (!result) return '';
    return `📅 *Date of Birth Compatibility* for *${name1}* & *${name2}*!\n🔢 Score: *${result.score}%* (Life Path ${result.lp1} & ${result.lp2})\n✨ *${result.hinglishTagline}*\n💬 "${result.hinglishSuggestion}"\n\n👉 Test birthdate compatibility at: ${websiteUrl}`;
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
      question: 'How is love compatibility calculated using dates of birth?',
      answer:
        'Birth dates are reduced to single-digit Life Path numbers (1 through 9). Each number represents specific archetypal temperament traits. Our calculator analyzes the natural harmonic triplicities between the two numbers.',
    },
    {
      question: 'Is this calculation the same as Vedic Kundli Milan (Horoscope Matching)?',
      answer:
        'No. Vedic Kundli Milan involves detailed birth times, planetary degrees, Nakshatra lords, and Ashta Kuta (36 Gunas). Our DOB tool provides a numerological Life Path alignment for entertainment and personal reflection, clearly separated from traditional astrological consultations.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love Calculator by Date of Birth',
    'url': 'https://calculatelove.online/love-calculator-by-date-of-birth/',
    'description': 'Discover birth date compatibility and Life Path vibrational harmony using deterministic numerological principles.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Calculator by Date of Birth - DOB Compatibility | CalculateLove"
        description="Calculate love compatibility by date of birth and discover your Life Path number harmony with CalculateLove. Deterministic, fun, and private birth date test."
        canonicalPath="/love-calculator-by-date-of-birth/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/love-calculator/' },
          { label: 'Love Calculator by DOB' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Love Calculator by Date of Birth
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Explore your Life Path number alignment and birth date compatibility with authentic Hinglish relationship predictions.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              {/* Partner 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  First Person
                </span>
                <div>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Your Name"
                    maxLength={50}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dob1" className="block text-[11px] font-medium text-slate-500 mb-1">
                    Date of Birth
                  </label>
                  <input
                    id="dob1"
                    type="date"
                    value={dob1}
                    onChange={(e) => setDob1(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 min-h-[44px]"
                    required
                  />
                </div>
              </div>

              {/* Partner 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Second Person
                </span>
                <div>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Partner / Crush Name"
                    maxLength={50}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dob2" className="block text-[11px] font-medium text-slate-500 mb-1">
                    Date of Birth
                  </label>
                  <input
                    id="dob2"
                    type="date"
                    value={dob2}
                    onChange={(e) => setDob2(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 min-h-[44px]"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md min-h-[48px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Calculate DOB Compatibility</span>
              </button>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic Life Path reduction · 100% Private</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="relative bg-gradient-to-b from-white via-rose-50/20 to-white rounded-3xl border-2 border-rose-200 shadow-xl overflow-hidden p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500" />

            <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 uppercase tracking-widest font-mono">
                <Calendar className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>calculatelove.online</span>
              </div>
              <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-2.5 py-0.5 rounded-full">
                DOB Compatibility Card
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {name1} & {name2}
              </h3>
              <p className="text-xs font-semibold text-rose-600 mt-1">{result.hinglishTagline}</p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50/90 to-white rounded-3xl border border-rose-200 mb-6 shadow-inner">
              <span className="text-5xl font-extrabold text-slate-900 font-display tabular-nums">
                {result.score}%
              </span>
              <span className="text-[10px] text-rose-600 font-bold uppercase tracking-widest mt-1">
                Life Path Compatibility Score
              </span>
            </div>

            {/* Hinglish Reflection */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50/50 border border-amber-200/80 mb-6 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>Numerology Ki Baat · Hinglish Reflection</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {result.hinglishSuggestion}
              </p>
              <div className="pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-950 font-medium">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{result.hinglishTip}</span>
              </div>
            </div>

            {/* Life Path Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[11px] text-slate-500 block">{name1}</span>
                <span className="font-bold text-slate-900 text-sm">Life Path {result.lp1}</span>
                <p className="text-slate-600 mt-1 text-[11px]">{result.meaning1}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[11px] text-slate-500 block">{name2}</span>
                <span className="font-bold text-slate-900 text-sm">Life Path {result.lp2}</span>
                <p className="text-slate-600 mt-1 text-[11px]">{result.meaning2}</p>
              </div>
            </div>

            {/* Sharing actions */}
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
                  <span>{copied ? 'Copied DOB Card!' : 'Copy Share Text'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Test Again</span>
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

      <RelatedTools currentToolId="love-calculator-by-date-of-birth" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['love-compatibility-by-date-of-birth', 'how-love-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
