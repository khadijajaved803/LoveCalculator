import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateDobCompatibility } from '../lib/calculatorEngine';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import { CalculateLoveLogo } from '../components/CalculateLoveLogo';
import { CalculationLoader } from '../components/CalculationLoader';
import {
  Calendar,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Copy,
  Check,
  Download,
  Lightbulb,
  Heart,
  Compass,
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
  const [isCalculating, setIsCalculating] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState('');

  const websiteUrl = 'https://calculatelove.online';

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !dob1 || !name2.trim() || !dob2) {
      setError('Please provide names and dates of birth for both individuals.');
      return;
    }
    setError('');
    setIsCalculating(true);
  };

  const handleReset = () => {
    setName1('');
    setDob1('');
    setName2('');
    setDob2('');
    setResult(null);
    setIsCalculating(false);
    setError('');
  };

  const getDobCardOptions = () => {
    if (!result) throw new Error('No result');
    return {
      type: 'dob' as const,
      names: { person1: name1, person2: name2 },
      score: result.score,
      tagline: result.hinglishTagline,
      suggestion: result.hinglishSuggestion,
      tip: result.hinglishTip,
      details: `Life Path ${result.lp1} & Life Path ${result.lp2} · ${result.harmonyStatus}`,
    };
  };

  const triggerDownload = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DOB-Compatibility-${name1}-${name2}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const tryCopyImageBlob = async (blob: Blob): Promise<boolean> => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
      try {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  const handleWhatsAppImageShare = async () => {
    if (!result) return;
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob(getDobCardOptions());
      const file = new File([blob], `${name1}-${name2}-dob-card.png`, {
        type: 'image/png',
      });

      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${name1} & ${name2} Birth Date Compatibility`,
          text: `Check out our DOB compatibility card! Test yours free at: ${websiteUrl}`,
        });
      } else {
        triggerDownload(blob);
        tryCopyImageBlob(blob);
        setNotice('DOB card downloaded & copied! Paste (Ctrl+V) directly in your WhatsApp chat.');
        setTimeout(() => {
          window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out our DOB compatibility card! Test free at: ${websiteUrl}`)}`;
        }, 1500);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setNotice('Sharing error. Downloading card image instead.');
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      const blob = await generateCardImageBlob(getDobCardOptions());
      triggerDownload(blob);
      setNotice('DOB card downloaded successfully!');
    } catch {
      setNotice('Could not download image.');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyCardImage = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      const blob = await generateCardImageBlob(getDobCardOptions());
      const ok = await tryCopyImageBlob(blob);
      if (ok) {
        setCopiedImage(true);
        setNotice('Card image copied to clipboard!');
        setTimeout(() => setCopiedImage(false), 3000);
      } else {
        triggerDownload(blob);
        setNotice('Card downloaded to device!');
      }
    } catch {
      setNotice('Could not copy image.');
    } finally {
      setDownloading(false);
    }
  };

  const faqs = [
    {
      question: 'How is a Life Path Number calculated from a Date of Birth?',
      answer:
        'A Life Path number is derived by summing all digits of the birth day, month, and year, and reducing them recursively until a single digit from 1 to 9 is obtained.',
    },
    {
      question: 'Which Life Path numbers are considered natural partners?',
      answer:
        'Numbers belonging to the same Pythagorean Triad often experience immediate harmony. For example, the 3-6-9 triad thrives on warmth, creativity, and family, while the 2-4-8 triad excels in security and practical foundations.',
    },
    {
      question: 'Can two people with incompatible Life Path numbers have a great relationship?',
      answer:
        'Absolutely! Numerology highlights contrasting energetic styles. Contrasting numbers frequently balance each other beautifully through complementary strengths and intentional empathy.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Date of Birth Love Calculator & Life Path Compatibility Test',
    'url': 'https://calculatelove.online/love-calculator-by-date-of-birth/',
    'description': 'Free birth date compatibility calculator and numerology Life Path matching engine.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Calculator by Date of Birth - Life Path Compatibility Test"
        description="Calculate birth date compatibility and Life Path numerology match (1-9) between two partners at CalculateLove. Free, deterministic, and instant."
        canonicalPath="/love-calculator-by-date-of-birth/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'DOB Match' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-3 border border-rose-200">
          <Calendar className="w-3.5 h-3.5 text-rose-600" />
          <span>Numerology & Life Path Match</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Love Calculator by Date of Birth
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          Explore your Life Path number alignment and birth date compatibility with personalized relationship predictions.
        </p>
      </div>

      {/* Wide Calculator Dashboard */}
      <div className="w-full mb-16">
        {isCalculating ? (
          <CalculationLoader
            name1={name1}
            name2={name2}
            type="dob"
            onComplete={() => {
              const res = calculateDobCompatibility(name1, dob1, name2, dob2);
              setResult(res);
              setIsCalculating(false);
            }}
          />
        ) : !result ? (
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-lg p-5 sm:p-7 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500" />

            <form onSubmit={handleCalculate}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Column: Inputs & Submit */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-base font-extrabold text-slate-900 font-display">
                      Enter Names & Birth Dates
                    </h2>
                    <p className="text-xs text-slate-500">
                      Calculates exact Pythagorean Life Path numbers (1-9)
                    </p>
                  </div>

                  {/* Person 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <label htmlFor="p1DobName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Name
                      </label>
                      <input
                        id="p1DobName"
                        type="text"
                        value={name1}
                        onChange={(e) => setName1(e.target.value)}
                        placeholder="e.g. Rahul"
                        maxLength={40}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px] box-border"
                        required
                      />
                    </div>
                    <div className="min-w-0">
                      <label htmlFor="dob1" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Date of Birth
                      </label>
                      <input
                        id="dob1"
                        type="date"
                        value={dob1}
                        onChange={(e) => setDob1(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 min-h-[44px] box-border"
                        required
                      />
                    </div>
                  </div>

                  {/* Person 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <label htmlFor="p2DobName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Partner&apos;s Name
                      </label>
                      <input
                        id="p2DobName"
                        type="text"
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        placeholder="e.g. Pooja"
                        maxLength={40}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px] box-border"
                        required
                      />
                    </div>
                    <div className="min-w-0">
                      <label htmlFor="dob2" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Partner&apos;s Date of Birth
                      </label>
                      <input
                        id="dob2"
                        type="date"
                        value={dob2}
                        onChange={(e) => setDob2(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 min-h-[44px] box-border"
                        required
                      />
                    </div>
                  </div>

                  {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md min-h-[46px]"
                  >
                    <span>Calculate Birth Date Compatibility</span>
                    <Calendar className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Deterministic Life Path reduction · 100% Private in browser</span>
                  </div>
                </div>

                {/* Right Column: Numerology Triad Preview */}
                <div className="lg:col-span-5 bg-indigo-50/50 p-4 sm:p-5 rounded-2xl border border-indigo-100 space-y-3">
                  <div className="border-b border-indigo-100 pb-2">
                    <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                      Life Path Harmony Triads
                    </h3>
                    <p className="text-[11px] text-indigo-800">
                      Ancient Pythagorean number vibration groupings
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white rounded-xl border border-indigo-100">
                      <span className="font-bold text-indigo-900 block">Triad 1-5-7 (Intellect & Freedom)</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Driven by curious minds, leadership, and philosophical exploration.</p>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-indigo-100">
                      <span className="font-bold text-indigo-900 block">Triad 2-4-8 (Builders & Peacemakers)</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Driven by dependability, security, structured loyalty, and dedication.</p>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-indigo-100">
                      <span className="font-bold text-indigo-900 block">Triad 3-6-9 (Creatives & Humanitarians)</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Driven by expressive joy, deep empathy, family devotion, and artistic soul.</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Wide Result Card */
          <div className="relative bg-gradient-to-b from-white via-rose-50/20 to-white rounded-3xl border-2 border-rose-200 shadow-xl overflow-hidden p-5 sm:p-7 md:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500" />

            <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest font-mono">
                <CalculateLoveLogo size={22} />
                <span>calculatelove.online</span>
              </div>
              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2.5 py-0.5 rounded-full">
                DOB Life Path Certificate
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Names, Score, Actions */}
              <div className="lg:col-span-5 space-y-5">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold mb-2 shadow-xs">
                    <span>{name1}</span>
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{name2}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display mt-1">
                    {result.harmonyStatus}
                  </h3>
                  <p className="text-xs text-rose-600 font-semibold mt-0.5">
                    {result.hinglishTagline}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50/90 to-white rounded-3xl border border-rose-200 shadow-inner">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-36 h-36 sm:w-40 sm:h-40 transform -rotate-90">
                      <circle cx="80" cy="80" r="66" stroke="#ffe4e6" strokeWidth="12" fill="transparent" />
                      <circle
                        cx="80"
                        cy="80"
                        r="66"
                        stroke="#e11d48"
                        strokeWidth="12"
                        strokeDasharray={415}
                        strokeDashoffset={415 - (415 * result.score) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display tabular-nums">
                        {result.score}%
                      </span>
                      <span className="text-[10px] text-rose-600 font-bold uppercase tracking-widest mt-0.5">
                        Life Path Match
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-4 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 font-bold text-rose-800">
                      {name1}: Path {result.lp1}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 font-bold text-rose-800">
                      {name2}: Path {result.lp2}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppImageShare}
                    disabled={downloading}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Share DOB Card on WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadImage}
                      disabled={downloading}
                      className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-rose-200 min-h-[40px]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save PNG</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyCardImage}
                      disabled={downloading}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-200 min-h-[40px]"
                    >
                      {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedImage ? 'Copied!' : 'Copy Card'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[40px]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Test Another Birthday Match</span>
                  </button>
                </div>

                {notice && (
                  <div className="p-2.5 rounded-xl bg-slate-900 text-white text-[11px] text-center animate-in fade-in leading-relaxed">
                    {notice}
                  </div>
                )}
              </div>

              {/* Right Column: Archetypes & Reflection */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50/50 border border-amber-200/80 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                    <span>Numerology Ki Baat · Birth Harmony</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {result.hinglishSuggestion}
                  </p>
                  <div className="pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-950 font-medium">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{result.hinglishTip}</span>
                  </div>
                </div>

                {/* Life Path Archetypes Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">{name1}</span>
                    <span className="font-extrabold text-slate-900 text-sm">Life Path {result.lp1}</span>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{result.meaning1}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">{name2}</span>
                    <span className="font-extrabold text-slate-900 text-sm">Life Path {result.lp2}</span>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{result.meaning2}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                    <span>Pythagorean Reduction Principles</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Every date of birth resolves to a single root number representing natural life rhythm, temperamental priorities, and personal vibration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <RelatedTools currentToolId="love-calculator-by-date-of-birth" onNavigate={onNavigate} />
      <RelatedArticles onNavigate={onNavigate} preferredSlugs={['love-compatibility-by-date-of-birth', 'how-love-calculator-works']} />
      <FAQSection faqs={faqs} />
    </div>
  );
};
