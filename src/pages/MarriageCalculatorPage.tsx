import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateMarriagePreference } from '../lib/calculatorEngine';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import { CalculateLoveLogo } from '../components/CalculateLoveLogo';
import { CalculationLoader } from '../components/CalculationLoader';
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
  Heart,
  Users,
  Calendar,
  Scale,
  CheckCircle2,
  HeartHandshake,
  BookOpen,
} from 'lucide-react';
import weddingImage from '../assets/images/wedding_hands_harmony_1792219742165.jpg';

interface Props {
  onNavigate: (path: string) => void;
}

export const MarriageCalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [relationshipDuration, setRelationshipDuration] = useState('1-2 Years');
  const [familyPriority, setFamilyPriority] = useState(3);
  const [kundliBelief, setKundliBelief] = useState('Balanced Cultural Respect');
  const [vedicAlignment, setVedicAlignment] = useState(false);
  const [careerPriority, setCareerPriority] = useState(false);

  const [result, setResult] = useState<ReturnType<typeof calculateMarriagePreference> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
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
    setIsCalculating(true);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setAge1('');
    setAge2('');
    setVedicAlignment(false);
    setCareerPriority(false);
    setResult(null);
    setIsCalculating(false);
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
      const blob = await generateCardImageBlob(getMarriageCardOptions());
      const file = new File([blob], `${result.names.person1}-${result.names.person2}-marriage-card.png`, {
        type: 'image/png',
      });

      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${result.names.person1} & ${result.names.person2} Marriage Alignment`,
          text: `Check out our marriage compatibility card! Test free at: ${websiteUrl}`,
        });
      } else {
        triggerDownload(blob);
        tryCopyImageBlob(blob);
        setNotice('Marriage card downloaded & copied! Paste (Ctrl+V) directly in your WhatsApp chat.');
        setTimeout(() => {
          window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out our Marriage Compatibility Card! Test free at: ${websiteUrl}`)}`;
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
      const blob = await generateCardImageBlob(getMarriageCardOptions());
      triggerDownload(blob);
      setNotice('Marriage certificate card downloaded!');
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
      const blob = await generateCardImageBlob(getMarriageCardOptions());
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
      question: 'How is Love vs Arranged Marriage probability calculated?',
      answer:
        'The calculator models modern Indian relationship dynamics: personal courtship duration, independence in decision-making, and family involvement. It balances your romance autonomy with family alignment.',
    },
    {
      question: 'Can an arranged marriage have higher compatibility than a love marriage?',
      answer:
        'Yes. Lasting matrimonial success depends on emotional maturity, shared financial priorities, and family support, regardless of how the couple originally met.',
    },
    {
      question: 'Does this calculator replace traditional Kundli matching?',
      answer:
        'No. This is a lifestyle and relationship alignment model for entertainment. Traditional Vedic Kundli matching requires exact birth times, coordinates, and astrologer review.',
    },
    {
      question: 'What is a "Semi-Arranged" or "Love-Cum-Arranged" marriage?',
      answer:
        'In modern urban India, over 65% of marriages fall into the love-cum-arranged spectrum. Couples meet independently or via matrimonial platforms, spend 6 to 18 months getting to know each other, and then actively involve both families to secure their blessings.',
    },
    {
      question: 'How can we convince parents for a love marriage?',
      answer:
        'Effective communication, career stability, and patience are key. Introduce your partner gradually as a good friend, highlight shared cultural values, show financial preparedness, and address parental concerns with empathy rather than rebellion.',
    },
    {
      question: 'What are the top factors in marriage compatibility?',
      answer:
        'Research shows the top five predictors of marital longevity are mutual respect during arguments, financial transparency, alignment on living arrangements (nuclear vs joint family), shared work-life priorities, and emotional intimacy.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love or Arranged Marriage Calculator - Shaadi Compatibility Test',
    'url': 'https://calculatelove.online/love-or-arranged-marriage-calculator/',
    'description': 'Free love or arranged marriage compatibility test analyzing matrimonial balance, partner romance, family blessing, and shaadi alignment.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love or Arranged Marriage Calculator - Shaadi Compatibility Test"
        description="Will you have a love marriage or arranged marriage? Test your matrimonial alignment, family blessing harmony, and partner compatibility with CalculateLove."
        canonicalPath="/love-or-arranged-marriage-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Marriage Match' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-3 border border-purple-200">
          <Gem className="w-3.5 h-3.5 text-purple-600" />
          <span>Shaadi & Marriage Alignment Test</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Love or Arranged Marriage Calculator & Shaadi Match Test
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          Will your future be a self-discovered love marriage or a family-guided arranged alliance? Test your marriage alignment, family harmony, and partner compatibility.
        </p>
      </div>

      {/* Wide Calculator Dashboard (Width-Optimized Desktop, Clean Stacked Mobile) */}
      <div className="w-full mb-8 sm:mb-10">
        {isCalculating ? (
          <CalculationLoader
            name1={name1}
            name2={name2}
            type="marriage"
            onComplete={() => {
              const res = calculateMarriagePreference(name1, name2, {
                familyPriority,
                socialCircle: 3,
                adventureStyle: 3,
                communication: 4,
                age1,
                age2,
              });
              setResult(res);
              setIsCalculating(false);
            }}
          />
        ) : !result ? (
          <div className="bg-white rounded-3xl border border-purple-200 shadow-lg p-4 sm:p-6 md:p-7 pb-5 sm:pb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-400" />

            <form onSubmit={handleCalculate} className="space-y-4 sm:space-y-5">
              {/* Row 1: Names & Ages spread across width on desktop */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3.5">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 font-display">
                      Enter Couple Details
                    </h2>
                    <p className="text-xs text-slate-500">
                      Evaluates lifestyle preferences, family bonding, and courtship style
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>Matrimonial Balance</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="min-w-0">
                    <label htmlFor="mName1" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="mName1"
                      type="text"
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      placeholder="e.g. Siddharth"
                      maxLength={40}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 min-h-[42px] box-border"
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="mName2" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Partner&apos;s Name
                    </label>
                    <input
                      id="mName2"
                      type="text"
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      placeholder="e.g. Neha"
                      maxLength={40}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 min-h-[42px] box-border"
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="mAge1" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Age (Optional)
                    </label>
                    <input
                      id="mAge1"
                      type="number"
                      min="18"
                      max="99"
                      value={age1}
                      onChange={(e) => setAge1(e.target.value)}
                      placeholder="e.g. 26"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-purple-500 min-h-[42px] box-border"
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="mAge2" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Partner Age (Optional)
                    </label>
                    <input
                      id="mAge2"
                      type="number"
                      min="18"
                      max="99"
                      value={age2}
                      onChange={(e) => setAge2(e.target.value)}
                      placeholder="e.g. 25"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-purple-500 min-h-[42px] box-border"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Marriage Dynamics & Alignment (2 columns across width) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-50/40 border border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Relationship Duration */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="mDurationSelect" className="block text-[11px] font-bold text-purple-950 uppercase tracking-wider">
                        Relationship Duration
                      </label>
                      <span className="text-[10px] text-purple-800 hidden sm:inline">Courtship time</span>
                    </div>

                    {/* Mobile Dropdown (space-saving) */}
                    <div className="block sm:hidden">
                      <select
                        id="mDurationSelect"
                        value={relationshipDuration}
                        onChange={(e) => setRelationshipDuration(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:border-purple-500 min-h-[42px]"
                      >
                        {['Just Met', '< 1 Year', '1-2 Years', '3+ Years', 'Family Match Intro'].map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    {/* Desktop Pills */}
                    <div className="hidden sm:flex flex-wrap gap-1.5">
                      {['Just Met', '< 1 Year', '1-2 Years', '3+ Years', 'Family Match Intro'].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setRelationshipDuration(d)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all min-h-[34px] ${
                            relationshipDuration === d
                              ? 'bg-purple-600 text-white font-bold shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>

                    {/* Kundli & Traditional Alignment Sub-group */}
                    <div className="mt-3.5 pt-3 border-t border-purple-100">
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Traditional Alignment
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setVedicAlignment(!vedicAlignment)}
                          className={`p-2 rounded-xl border text-center transition-all min-h-[36px] flex items-center justify-center font-medium ${
                            vedicAlignment
                              ? 'border-purple-500 bg-white text-purple-900 font-semibold shadow-xs ring-1 ring-purple-300'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{vedicAlignment ? '✓ Kundli Match Checked' : 'Kundli Guna Match'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCareerPriority(!careerPriority)}
                          className={`p-2 rounded-xl border text-center transition-all min-h-[36px] flex items-center justify-center font-medium ${
                            careerPriority
                              ? 'border-purple-500 bg-white text-purple-900 font-semibold shadow-xs ring-1 ring-purple-300'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{careerPriority ? '✓ Dual-Career Focus' : 'Dual-Career Focus'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Family Involvement Priority Slider */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[11px] font-bold text-purple-950 uppercase tracking-wider">
                          Family Involvement Priority
                        </label>
                        <span className="text-xs text-purple-700 font-bold bg-white px-2 py-0.5 rounded-full border border-purple-200">
                          {familyPriority === 5 ? 'Family-First 🏡' : familyPriority >= 3 ? 'Balanced ⚖️' : 'Autonomous 🕊️'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={familyPriority}
                        onChange={(e) => setFamilyPriority(Number(e.target.value))}
                        className="w-full accent-purple-600 cursor-pointer my-2"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Autonomous 🕊️</span>
                        <span>50-50 Balance ⚖️</span>
                        <span>Family Guidance 🏡</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white/80 rounded-xl border border-purple-100 text-xs text-slate-600 mt-3">
                      <p className="text-[11px] leading-relaxed">
                        Balances mutual romantic courtship dynamics with family blessing and lifestyle expectations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium text-center">{error}</p>}

              {/* Row 3: Action Button AT THE VERY END of all inputs */}
              <div className="pt-2 flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full max-w-md py-3.5 px-8 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-600/20 min-h-[48px]"
                >
                  <span>Analyze Marriage Alignment</span>
                  <Gem className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Deterministic formula · 100% private in your browser</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Wide Result Card */
          <div className="relative bg-gradient-to-b from-white via-purple-50/20 to-white rounded-3xl border-2 border-purple-200 shadow-xl overflow-hidden p-5 sm:p-7 md:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-400" />

            <div className="flex items-center justify-between border-b border-purple-100 pb-3 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-800 uppercase tracking-widest font-mono">
                <CalculateLoveLogo size={22} />
                <span>calculatelove.online</span>
              </div>
              <span className="text-[10px] bg-purple-100 text-purple-900 font-bold px-2.5 py-0.5 rounded-full">
                Marriage Alignment Certificate
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Names, Dual Gauge, Actions */}
              <div className="lg:col-span-5 space-y-5">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold mb-2 shadow-xs">
                    <span>{result.names.person1}</span>
                    <Heart className="w-3.5 h-3.5 fill-purple-600 text-purple-600" />
                    <span>{result.names.person2}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display mt-1">
                    {result.outlook}
                  </h3>
                  <p className="text-xs text-purple-700 font-medium mt-0.5">
                    {result.hinglishTagline}
                  </p>
                </div>

                {/* Dual Probability Display */}
                <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3">
                  <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wider text-center">
                    Marriage Path Probability
                  </h4>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-medium">❤️ Love Marriage Probability</span>
                      <span className="font-bold text-purple-900 tabular-nums">{result.lovePercentage}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-rose-500 to-purple-600 rounded-full" style={{ width: `${result.lovePercentage}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-medium">🏡 Arranged Marriage Probability</span>
                      <span className="font-bold text-amber-900 tabular-nums">{result.arrangedPercentage}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-purple-500 rounded-full" style={{ width: `${result.arrangedPercentage}%` }} />
                    </div>
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
                    <span>Share Marriage Card on WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadImage}
                      disabled={downloading}
                      className="py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-purple-200 min-h-[40px]"
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
                    <span>Test Another Match</span>
                  </button>
                </div>

                {notice && (
                  <div className="p-2.5 rounded-xl bg-slate-900 text-white text-[11px] text-center animate-in fade-in leading-relaxed">
                    {notice}
                  </div>
                )}
              </div>

              {/* Right Column: Salah, Pillars, Advice */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50/50 border border-amber-200/80 shadow-xs space-y-2.5">
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

                {/* 4 Marriage Pillars */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-purple-200/80 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Matrimonial Readiness Indicators
                  </h4>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">🏡 Family Harmony & Tradition</span>
                      <span className="font-bold text-purple-900 tabular-nums">{result.arrangedPercentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: `${result.arrangedPercentage}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">💬 Personal Romance & Courtship</span>
                      <span className="font-bold text-rose-900 tabular-nums">{result.lovePercentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${result.lovePercentage}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">🕊️ Long-Term Partnership Readiness</span>
                      <span className="font-bold text-amber-900 tabular-nums">{Math.min(96, Math.max(72, Math.round((result.lovePercentage + result.arrangedPercentage) / 2 + 35)))}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(96, Math.max(72, Math.round((result.lovePercentage + result.arrangedPercentage) / 2 + 35)))}%` }} />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>The Golden Rule of Indian Matrimony</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Whether love marriage or arranged alliance, marriages flourish when two partners commit to active listening, mutual respect, and honoring each other&apos;s individuality alongside family traditions.
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
        <div className="rounded-3xl overflow-hidden border border-purple-200 bg-slate-900 text-white shadow-lg relative">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 sm:p-10 space-y-4">
              <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-purple-300" />
                <span>Modern Romance Meets Traditional Matrimony</span>
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display leading-tight text-white">
                Shaadi Ki Sambhavna: Balancing Love & Family Harmony
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In India, a marriage is never just a union of two individuals; it is the blossoming alliance between two families, life philosophies, and shared dreams. Whether you found each other organically or through familial matchmaking, lasting marital joy stems from mutual respect, emotional transparency, and aligned expectations.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                  ✓ Courtship Duration
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30">
                  ✓ Family Involvement
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  ✓ Vedic Guna Alignment
                </span>
              </div>
            </div>
            <div className="h-64 md:h-full aspect-4/3 overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={weddingImage}
                alt="Traditional Indian wedding ceremony showing couple hands united with marigold flowers and sacred ceremonial fire"
                className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Section 1: The Modern Indian Marriage Spectrum */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold mb-3 border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Cultural Evolution</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Love Marriage vs. Arranged Marriage: The &apos;Love-Cum-Arranged&apos; Era
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              The stark divide between &apos;pure love marriage&apos; and &apos;traditional blind arranged marriage&apos; has largely dissolved in modern society. Today, progressive Indian matrimonial alliances celebrate autonomy combined with family blessings:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-2">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block">Option 1</span>
              <h3 className="font-bold text-sm text-slate-900">Organic Love Marriage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Born out of college dating, workplace camaraderie, or mutual friend circles. Partners develop strong emotional bonding and shared memories before bringing families into the discussion.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">Option 2</span>
              <h3 className="font-bold text-sm text-slate-900">Love-Cum-Arranged (The Sweet Spot)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Families initiate the introduction via matrimonial platforms or relatives, but the couple is granted 6 to 12 months of unmonitored courtship, coffee dates, and travel to evaluate romantic chemistry independently.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Option 3</span>
              <h3 className="font-bold text-sm text-slate-900">Traditional Family-Guided Alliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prioritizes socio-cultural symmetry, astrological Kundli Milan (Ashtakoota), joint family harmony, and parental vetting, allowing romantic affection to blossom post-nuptials through dedication.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The 5 Foundations of Lifelong Matrimonial Alignment */}
        <section className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold block mb-2">
              Matrimonial Science
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display">
              The 5 Pillars of Lifelong Marriage Compatibility & Readiness
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Marriages thrive not on fairytale perfection, but on resilient everyday partnership across these key areas:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <Heart className="w-5 h-5 text-rose-400" />
              <h3 className="font-bold text-sm text-white">1. Romance & Intimacy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Maintaining passion, flirtatious banter, and intentional date nights even amid busy work routines and household responsibilities.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <Users className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-sm text-white">2. In-Law Harmony</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Navigating parental expectations with grace, setting healthy boundaries, and ensuring both sets of parents feel cherished and respected.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm text-white">3. Financial Alignment</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Openness about savings, EMIs, investments, lifestyle expenditures, and mutual goals for purchasing a home or building family wealth.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">4. Dual-Career Support</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Celebrating each other&apos;s professional milestones, equally sharing chores, and accommodating job relocations or late work hours.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-sm text-white">5. Fair Conflict Rules</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Banning insults or silent treatment during disputes; focusing on solving the problem together rather than winning an argument.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: The Premarital Compatibility Checklist */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
              The Premarital Checklist: 8 Crucial Discussions Before Tying the Knot
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Before printing wedding invitations or conducting roka ceremonies, discuss these practical lifestyle questions with your partner:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[
              {
                title: 'Living Arrangements (Nuclear vs Joint Family)',
                desc: 'Will you live with parents, near parents, or independently in a separate apartment? Clarify short-term vs long-term expectations.',
              },
              {
                title: 'Financial Transparency & Joint Accounts',
                desc: 'How will monthly household bills, rent, and discretionary personal allowances be split? Are there existing student loans or personal debts?',
              },
              {
                title: 'Career Mobility & Ambition Pacing',
                desc: 'If one partner receives an overseas promotion or transferable government posting, how will the couple adapt their professional lives?',
              },
              {
                title: 'Children, Timing & Parenting Styles',
                desc: 'Do you both wish to have children? What is the ideal timeline, and what role will grandparents play in daily childcare?',
              },
              {
                title: 'Religious Beliefs & Festive Traditions',
                desc: 'How will Diwali, Eid, Christmas, or regional festivals be celebrated between two diverse family traditions?',
              },
              {
                title: 'Division of Daily Domestic Responsibilities',
                desc: 'Who manages grocery runs, cooking, domestic helper coordination, and laundry on weekdays vs weekends?',
              },
              {
                title: 'Personal Space & Social Freedom',
                desc: 'How much individual alone time, friend-group nights, and personal hobby pursuits does each partner require to recharge?',
              },
              {
                title: 'Crisis & Stress Coping Mechanisms',
                desc: 'When faced with job loss, medical emergencies, or grief, how does each person react—by withdrawing or seeking immediate verbal comfort?',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 space-y-10">
        <RelatedTools currentToolId="love-or-arranged-marriage-calculator" onNavigate={onNavigate} />
        <RelatedArticles onNavigate={onNavigate} preferredSlugs={['how-love-calculator-works', 'love-compatibility-by-date-of-birth']} />
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
};
