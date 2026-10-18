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
  Moon,
  Sun,
  BookOpen,
  CheckCircle2,
  Layers,
  Award,
} from 'lucide-react';
import dobImage from '../assets/images/birth_chart_calendar_1792219741407.jpg';

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
    {
      question: 'What are Master Numbers in relationship numerology?',
      answer:
        'The numbers 11, 22, and 33 are considered Master Numbers. When present in a birth chart, they reflect heightened intuition, deep emotional sensitivity, and visionary life missions, requiring partners who offer patient emotional grounding.',
    },
    {
      question: 'Is date of birth matching more accurate than name matching?',
      answer:
        'While name matching reveals phonetic attraction, cultural familiarity, and spoken chemistry, date of birth calculations reflect deeper psychological temperaments and core personality traits that remain consistent over a lifetime.',
    },
    {
      question: 'Does birth time matter for this Life Path calculation?',
      answer:
        'No. Pythagorean numerology relies strictly on the solar calendar date (day, month, and year). Exact birth times are only required for advanced Vedic astrology (Kundli) Lagna and Moon Nakshatra charts.',
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

      {/* Unique In-Depth Editorial Showcase & Guide Section */}
      <div className="mt-12 space-y-12">
        {/* Featured Editorial Banner with Generated Image */}
        <div className="rounded-3xl overflow-hidden border border-indigo-200 bg-slate-900 text-white shadow-lg relative">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 sm:p-10 space-y-4">
              <span className="text-xs uppercase tracking-widest text-indigo-300 font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-300" />
                <span>Cosmic Solar Pacing & Pythagorean Geometry</span>
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display leading-tight text-white">
                Life Path Compatibility: The Soul Rhythm of Your Birth Date
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                While names represent outward social presentation, your date of birth is an immutable cosmic imprint. In classical Pythagorean numerology, the day you entered the world reveals your innate behavioral tendencies, emotional requirements, and instinctual reaction under pressure.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                  ✓ Day + Month + Year Synthesis
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                  ✓ Harmonic Triads (3-6-9)
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30">
                  ✓ Master Numbers (11 & 22)
                </span>
              </div>
            </div>
            <div className="h-64 md:h-full aspect-4/3 overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={dobImage}
                alt="Mystical celestial calendar wheel with astrological constellations and sacred geometry charts"
                className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Section 1: The 1 to 9 Life Path Compatibility Matrix */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold mb-3 border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Life Path Archetypes (1 to 9)</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Life Path Numbers in Love: How Your Birth Date Shapes Relationship Harmony
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Every single-digit Life Path number (1 through 9) embodies distinct romantic inclinations, communication needs, and ideal partners:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              {
                num: 1,
                title: 'The Pioneering Leader',
                trait: 'Bold, autonomous, goal-oriented',
                matches: 'Best with 3, 5, 7',
                desc: 'Values personal freedom and hates being micromanaged. Thrives with a confident partner who pursues their own ambitions with equal passion.',
              },
              {
                num: 2,
                title: 'The Empathetic Diplomat',
                trait: 'Gentle, intuitive, peacekeeper',
                matches: 'Best with 2, 4, 6, 8',
                desc: 'Craves emotional security and deep one-on-one devotion. Radiates kindness and seeks a steady, protective, and affectionate companion.',
              },
              {
                num: 3,
                title: 'The Expressive Romantic',
                trait: 'Charismatic, playful, artistic',
                matches: 'Best with 1, 3, 6, 9',
                desc: 'Brings laughter, spontaneous road trips, and social sparkle to relationships. Needs verbal appreciation and lively banter every single day.',
              },
              {
                num: 4,
                title: 'The Structured Anchor',
                trait: 'Loyal, grounded, dependable',
                matches: 'Best with 2, 4, 7, 8',
                desc: 'The bedrock of lasting marriage. Highly practical, values financial stability, and shows affection through steadfast acts of service.',
              },
              {
                num: 5,
                title: 'The Free-Spirited Explorer',
                trait: 'Curious, versatile, adventurous',
                matches: 'Best with 1, 3, 5, 7',
                desc: 'Despises monotony and predictable routines. Loves traveling, learning new skills, and requires an open-minded, adaptable partner.',
              },
              {
                num: 6,
                title: 'The Loving Caregiver',
                trait: 'Nurturing, protective, harmonious',
                matches: 'Best with 2, 3, 6, 9',
                desc: 'The domestic heart of relationships. Dedicated to family well-being, creating a warm hospitable home, and providing steady emotional solace.',
              },
              {
                num: 7,
                title: 'The Spiritual Thinker',
                trait: 'Analytical, introspective, perceptive',
                matches: 'Best with 1, 4, 5, 7',
                desc: 'Needs intellectual depth and comfortable quiet solitude. Connects through profound philosophical debates, books, and shared values.',
              },
              {
                num: 8,
                title: 'The Visionary Manifestor',
                trait: 'Ambitious, resilient, strategic',
                matches: 'Best with 2, 4, 6, 8',
                desc: 'Driven by legacy and material accomplishments. Highly generous and protective, seeking an equally capable, encouraging partner.',
              },
              {
                num: 9,
                title: 'The Universal Humanitarian',
                trait: 'Compassionate, idealistic, wise',
                matches: 'Best with 3, 6, 9',
                desc: 'Deeply empathetic with a global perspective. Believes in unconditional love, artistic beauty, and mutual self-transcendence.',
              },
            ].map((lp) => (
              <div key={lp.num} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 hover:border-indigo-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center">
                    {lp.num}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                    {lp.matches}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{lp.title}</h4>
                <p className="text-[11px] text-indigo-900/80 font-medium">{lp.trait}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{lp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: The 3 Harmonic Triads */}
        <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-indigo-300 font-semibold block mb-2">
              Pythagorean Triads
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display">
              The 3 Cosmic Triads of Relationship Harmony
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              In numerological philosophy, numbers that share the same triad possess natural vibrational resonance, reducing misunderstandings:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">Triad 1 (1 - 5 - 7)</span>
              <h3 className="font-bold text-base text-white">The Intellectual & Freedom Triad</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                United by visionary thinking, mental curiosity, and personal independence. Partners in this triad give each other breathing room and connect deeply through ideas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">Triad 2 (2 - 4 - 8)</span>
              <h3 className="font-bold text-base text-white">The Grounded Manifestation Triad</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The pillars of real-world stability. They excel in building financial security, managing long-term household responsibilities, and creating dependable routines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">Triad 3 (3 - 6 - 9)</span>
              <h3 className="font-bold text-base text-white">The Creative & Heart Triad</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The emotional heart center. Connected through warm empathy, artistic pursuits, hospitality, caring for children and elders, and celebrating every small joy in life.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Master Numbers 11 & 22 */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-800 uppercase tracking-wider">
            <Award className="w-4 h-4 text-purple-600" />
            <span>Advanced Numerology</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            Master Numbers 11 & 22 in Romantic Relationships
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When birth dates reduce to 11 or 22 before single-digit reduction, they carry heightened spiritual and energetic potential. Master Number 11 individuals possess profound intuitive empathy, often sensing their partner&apos;s moods before a single word is spoken. Master Number 22 individuals are master architects of long-term security, turning visionary marital dreams into practical realities. Both numbers require partners who provide grounded emotional calm and unconditional loyalty.
          </p>
        </section>
      </div>

      <div className="mt-12 space-y-10">
        <RelatedTools currentToolId="love-calculator-by-date-of-birth" onNavigate={onNavigate} />
        <RelatedArticles onNavigate={onNavigate} preferredSlugs={['love-compatibility-by-date-of-birth', 'how-love-calculator-works']} />
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
};
