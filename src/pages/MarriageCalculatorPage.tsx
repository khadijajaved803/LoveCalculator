import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateMarriagePreference } from '../lib/calculatorEngine';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import {
  Gem,
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

export const MarriageCalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [familyPriority, setFamilyPriority] = useState(3);
  const [adventureStyle, setAdventureStyle] = useState(3);
  const [communication, setCommunication] = useState(4);

  const [result, setResult] = useState<ReturnType<typeof calculateMarriagePreference> | null>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState('');

  const websiteUrl = 'https://calculatelove.online';

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
      age1,
      age2,
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

  const getMarriageCardOptions = () => {
    if (!result) throw new Error('No result');
    return {
      type: 'marriage' as const,
      names: result.names,
      score: result.lovePercentage,
      tagline: result.hinglishTagline,
      suggestion: result.hinglishSuggestion,
      tip: result.hinglishTip,
      details: `Love Marriage: ${result.lovePercentage}% · Arranged: ${result.arrangedPercentage}%`,
    };
  };

  const triggerDownload = (blob: Blob) => {
    if (!result) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Marriage-Alignment-${result.names.person1}-${result.names.person2}.png`;
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
      const blob = await generateCardImageBlob(getMarriageCardOptions());
      const file = new File([blob], `${result.names.person1}-${result.names.person2}-marriage-card.png`, {
        type: 'image/png',
      });

      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${result.names.person1} & ${result.names.person2} Marriage Alignment`,
          text: `Check out our marriage alignment card! Test yours free at: ${websiteUrl}`,
        });
      } else {
        triggerDownload(blob);
        tryCopyImageBlob(blob);
        setNotice('Marriage card downloaded & copied! Paste (Ctrl+V) directly in your WhatsApp chat.');
        setTimeout(() => {
          window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out our marriage alignment card! Test free at: ${websiteUrl}`)}`;
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
      const blob = await generateCardImageBlob(getMarriageCardOptions());
      triggerDownload(blob);
      tryCopyImageBlob(blob);
      setNotice('Marriage card downloaded & copied! Attach it to your Facebook post.');
      setTimeout(() => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent(`Check out our Marriage Alignment Card from ${websiteUrl}`)}`;
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
      const blob = await generateCardImageBlob(getMarriageCardOptions());
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
      const blob = await generateCardImageBlob(getMarriageCardOptions());
      await tryCopyImageBlob(blob);
      setCopiedImage(true);
      setNotice('Marriage card copied to clipboard! Paste it directly in any chat.');
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
      question: 'How does the Love vs. Arranged Marriage Calculator work?',
      answer:
        'It synthesizes name harmony with practical lifestyle preferences—evaluating personal dating autonomy, family involvement priorities, and communication style to compute a percentage alignment between modern romance and traditional family blessing.',
    },
    {
      question: 'Can any tool predict the exact type of marriage I will have?',
      answer:
        'No algorithm or astrological tool can definitively control or predict your marital future. Your life choices, family dialogues, and personal values will ultimately shape your matrimonial path.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love vs. Arranged Marriage Calculator',
    'url': 'https://calculatelove.online/love-or-arranged-marriage-calculator/',
    'description': 'Evaluate personality traits, family orientation, and romance style to explore your marriage destiny alignment.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love or Arranged Marriage Calculator - Marriage Match Test | CalculateLove"
        description="Check your marriage destiny alignment with CalculateLove's Love vs. Arranged Marriage Calculator. Explore love marriage probability, family dynamics, and compatibility."
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
          Will your path be a self-discovered love marriage or a traditional family-guided alliance? Explore your alignment with custom relationship advice.
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

              {/* Age Inputs */}
              <div>
                <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Ages (Optional)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="18"
                    max="99"
                    value={age1}
                    onChange={(e) => setAge1(e.target.value)}
                    placeholder="Your Age (e.g. 26)"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs min-h-[42px]"
                  />
                  <input
                    type="number"
                    min="18"
                    max="99"
                    value={age2}
                    onChange={(e) => setAge2(e.target.value)}
                    placeholder="Partner Age (e.g. 25)"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs min-h-[42px]"
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

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Culturally tuned · Non-judgmental & private</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="relative bg-gradient-to-b from-white via-rose-50/20 to-white rounded-3xl border-2 border-rose-200 shadow-xl overflow-hidden p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500" />

            <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 uppercase tracking-widest font-mono">
                <Gem className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>calculatelove.online</span>
              </div>
              <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-2.5 py-0.5 rounded-full">
                Marriage Forecast Card
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {result.names.person1} & {result.names.person2}
              </h3>
              <p className="text-xs font-semibold text-rose-600 mt-1">{result.hinglishTagline}</p>
            </div>

            {/* Split comparison bar */}
            <div className="mb-6 p-5 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-rose-600">Love Marriage: {result.lovePercentage}%</span>
                <span className="text-indigo-600">Arranged Alliance: {result.arrangedPercentage}%</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-indigo-100 overflow-hidden flex">
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

            {/* Marriage Guidance */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50/50 border border-amber-200/80 mb-6 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                <span>Shaadi Ki Salah & Marriage Guidance</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {result.hinglishSuggestion}
              </p>
              <div className="pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-950 font-medium">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{result.hinglishTip}</span>
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

      <RelatedTools currentToolId="love-or-arranged-marriage-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['love-vs-arranged-marriage', 'how-love-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
