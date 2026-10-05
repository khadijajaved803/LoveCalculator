import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateDobCompatibility } from '../lib/calculatorEngine';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
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
  Image as ImageIcon,
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

  const tryCopyImageBlob = async (blob: Blob) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
    }
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

  const handleFacebookImageShare = async () => {
    if (!result) return;
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob(getDobCardOptions());
      triggerDownload(blob);
      tryCopyImageBlob(blob);
      setNotice('DOB card downloaded & copied! Attach it to your Facebook post.');
      setTimeout(() => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent(`Check out our DOB Card from ${websiteUrl}`)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }, 1200);
    } catch {
      // fallback
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
      setNotice('Card saved to your device!');
      setTimeout(() => setNotice(null), 3000);
    } catch {
      setNotice('Failed to download image');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyImage = async () => {
    if (!result) return;
    try {
      const blob = await generateCardImageBlob(getDobCardOptions());
      await tryCopyImageBlob(blob);
      setCopiedImage(true);
      setNotice('DOB card copied to clipboard! Paste it directly in any chat.');
      setTimeout(() => {
        setCopiedImage(false);
        setNotice(null);
      }, 3500);
    } catch {
      handleDownloadImage();
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
          Explore your Life Path number alignment and birth date compatibility with personalized relationship predictions.
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

            {/* Numerology Reflection */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50/50 border border-amber-200/80 mb-6 space-y-2">
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

            {/* Life Path Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[11px] text-slate-500 block">{name1}</span>
                <span className="font-bold text-slate-900 text-sm">Life Path {result.lp1}</span>
                <p className="text-slate-600 mt-1 text-[11px]">{result.meaning1}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[11px] text-slate-500 block">{name2}</span>
                <span className="font-bold text-slate-900 text-sm">Life Path {result.lp2}</span>
                <p className="text-slate-600 mt-1 text-[11px]">{result.meaning2}</p>
              </div>
            </div>

            {/* Notice banner */}
            {notice && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-center font-medium animate-in fade-in duration-200">
                {notice}
              </div>
            )}

            {/* Share Card Image Affordances */}
            <div className="space-y-2 mb-4">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-rose-500" />
                <span>Share Beautiful Card Image</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={downloading}
                  onClick={handleWhatsAppImageShare}
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm min-h-[46px] disabled:opacity-75"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{downloading ? 'Preparing Image...' : 'WhatsApp Card'}</span>
                </button>

                <button
                  type="button"
                  disabled={downloading}
                  onClick={handleFacebookImageShare}
                  className="py-3 px-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm min-h-[46px] disabled:opacity-75"
                >
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook Card</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadImage}
                  className="py-2.5 px-3 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                >
                  <Download className="w-3.5 h-3.5 text-rose-600" />
                  <span>Download Card PNG</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyImage}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                >
                  {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedImage ? 'Image Copied!' : 'Copy Card Image'}</span>
                </button>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[40px]"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Test Again</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Generated on https://calculatelove.online</span>
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
