import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateFlames } from '../lib/calculatorEngine';
import { FlamesResult } from '../types';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import { CalculateLoveLogo } from '../components/CalculateLoveLogo';
import { CalculationLoader } from '../components/CalculationLoader';
import {
  Flame,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Copy,
  Check,
  Download,
  Lightbulb,
  Heart,
  CheckCircle2,
  BookOpen,
  Smile,
  Users,
  Gem,
  Award,
} from 'lucide-react';
import flamesImage from '../assets/images/flames_notebook_game_1790774216847.jpg';

interface Props {
  onNavigate: (path: string) => void;
}

export const FlamesPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');

  const [result, setResult] = useState<FlamesResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState('');

  const websiteUrl = 'https://calculatelove.online';

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      setError('Please provide names for both individuals.');
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
    setResult(null);
    setIsCalculating(false);
    setError('');
  };

  const getFlamesCardOptions = () => {
    if (!result) throw new Error('No result');
    return {
      type: 'flames' as const,
      names: { person1: result.person1, person2: result.person2 },
      letter: result.resultLetter,
      outcome: result.resultWord,
      tagline: result.hinglishTagline,
      suggestion: result.hinglishSuggestion,
      tip: result.hinglishTip,
      details: `${result.resultWord} · ${result.remainingCount} Remaining Letters`,
    };
  };

  const triggerDownload = (blob: Blob) => {
    if (!result) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FLAMES-${result.person1}-${result.person2}.png`;
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
      const blob = await generateCardImageBlob(getFlamesCardOptions());
      const file = new File([blob], `${result.person1}-${result.person2}-flames-card.png`, {
        type: 'image/png',
      });

      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${result.person1} & ${result.person2} FLAMES Match: ${result.resultWord}`,
          text: `Check out our FLAMES card! Play free at: ${websiteUrl}`,
        });
      } else {
        triggerDownload(blob);
        tryCopyImageBlob(blob);
        setNotice('FLAMES card downloaded & copied! Paste (Ctrl+V) directly in your WhatsApp chat.');
        setTimeout(() => {
          window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out our FLAMES Result! Test free at: ${websiteUrl}`)}`;
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
      const blob = await generateCardImageBlob(getFlamesCardOptions());
      triggerDownload(blob);
      setNotice('FLAMES certificate card downloaded!');
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
      const blob = await generateCardImageBlob(getFlamesCardOptions());
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
      question: 'What is the full form of FLAMES?',
      answer:
        'FLAMES stands for Friends, Lovers, Affectionate, Marriage, Enemies, and Siblings.',
    },
    {
      question: 'How does the letter cancellation work in the FLAMES calculator?',
      answer:
        'All matching letters in both names are crossed out 1-on-1. The total count of uncancelled letters is then used to cyclically count through F-L-A-M-E-S until only one letter survives.',
    },
    {
      question: 'Is the FLAMES calculator result symmetric?',
      answer:
        'Yes. Because common letters cancel out identically regardless of which name is entered first, the final count and surviving letter are identical.',
    },
    {
      question: 'What does "Enemies" or "Siblings" mean in a FLAMES test with your crush?',
      answer:
        'FLAMES is a nostalgic, lighthearted school game. An "Enemies" result often represents fiery banter, spirited friction, or clashing egos that can mask intense unspoken chemistry. A "Siblings" result simply reflects fierce protective loyalty!',
    },
    {
      question: 'Can you play FLAMES with nicknames or full names?',
      answer:
        'You can play with either! In school notebooks, people frequently tested both full names and pet nicknames to see if their FLAMES destiny changed. Testing pet names adds an extra layer of playful fun.',
    },
    {
      question: 'Why is CalculateLove’s online FLAMES tool better than other sites?',
      answer:
        'Unlike websites that show random letters without proof, CalculateLove provides an authentic step-by-step breakdown showing every single cancelled character, remaining count, and elimination round, plus an instant downloadable WhatsApp card.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'FLAMES Love Calculator Game Online',
    'url': 'https://calculatelove.online/flames-calculator/',
    'description': 'Play the authentic FLAMES relationship game online with step-by-step letter elimination and shareable cards.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="FLAMES Calculator Online - Authentic Crush Matching Game"
        description="Play the authentic FLAMES game online at CalculateLove. Step-by-step letter elimination, transparent strike-outs, and downloadable certificate cards."
        canonicalPath="/flames-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'FLAMES Game' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-3 border border-amber-200">
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span>Nostalgic School & College Game</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          FLAMES Love Calculator Game
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          The nostalgic Indian school & college game! Discover your outcome with letter cancellation, beautiful shareable cards, and personalized relationship predictions.
        </p>
      </div>

      {/* Wide Calculator Dashboard */}
      <div className="w-full mb-16">
        {isCalculating ? (
          <CalculationLoader
            name1={name1}
            name2={name2}
            type="flames"
            onComplete={() => {
              const res = calculateFlames(name1, name2, { age1, age2 });
              setResult(res);
              setIsCalculating(false);
            }}
          />
        ) : !result ? (
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-lg p-5 sm:p-7 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-pink-500" />

            <form onSubmit={handleCalculate}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Column: Names, Ages, Submit */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-base font-extrabold text-slate-900 font-display">
                      Enter Names for FLAMES
                    </h2>
                    <p className="text-xs text-slate-500">
                      Automated 1-to-1 letter strikeout and circular countdown
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <label htmlFor="flameName1" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Name
                      </label>
                      <input
                        id="flameName1"
                        type="text"
                        value={name1}
                        onChange={(e) => setName1(e.target.value)}
                        placeholder="e.g. Aryan"
                        maxLength={40}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px] box-border"
                        required
                      />
                    </div>
                    <div className="min-w-0">
                      <label htmlFor="flameName2" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Crush / Partner Name
                      </label>
                      <input
                        id="flameName2"
                        type="text"
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        placeholder="e.g. Diya"
                        maxLength={40}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px] box-border"
                        required
                      />
                    </div>
                  </div>

                  {/* Ages */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <label htmlFor="flAge1" className="block text-[11px] font-medium text-slate-600 mb-1 truncate">
                        Your Age (Optional)
                      </label>
                      <input
                        id="flAge1"
                        type="number"
                        min="10"
                        max="99"
                        value={age1}
                        onChange={(e) => setAge1(e.target.value)}
                        placeholder="e.g. 21"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-rose-500 min-h-[42px]"
                      />
                    </div>
                    <div className="min-w-0">
                      <label htmlFor="flAge2" className="block text-[11px] font-medium text-slate-600 mb-1 truncate">
                        Crush Age (Optional)
                      </label>
                      <input
                        id="flAge2"
                        type="number"
                        min="10"
                        max="99"
                        value={age2}
                        onChange={(e) => setAge2(e.target.value)}
                        placeholder="e.g. 21"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-rose-500 min-h-[42px]"
                      />
                    </div>
                  </div>

                  {/* Informative Micro-card on Desktop to eliminate empty space */}
                  <div className="hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <p className="text-[11px] leading-relaxed">
                      <strong>Zero Guesswork:</strong> Identical letters cancel out 1-by-1 symmetrically, running circular elimination until exactly 1 letter survives.
                    </p>
                  </div>
                </div>

                {/* Right Column: FLAMES Legend */}
                <div className="lg:col-span-5 bg-amber-50/50 p-4 sm:p-5 rounded-2xl border border-amber-200 space-y-3">
                  <div className="border-b border-amber-200/80 pb-2">
                    <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      The FLAMES Meaning Guide
                    </h3>
                    <p className="text-[11px] text-amber-800">
                      6 Classic childhood friendship and relationship outcomes
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">F</span>
                      <span>Friends</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold">L</span>
                      <span>Lovers</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-pink-50 text-pink-700 flex items-center justify-center font-bold">A</span>
                      <span>Affection</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">M</span>
                      <span>Marriage</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">E</span>
                      <span>Enemies</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">S</span>
                      <span>Siblings</span>
                    </div>
                  </div>
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium text-center">{error}</p>}

              {/* Bottom Centered Button across the entire card */}
              <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full max-w-md py-4 px-8 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-600/15 min-h-[50px]"
                >
                  <span>Play FLAMES Match</span>
                  <Flame className="w-4 h-4 fill-white" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Exact cyclic countdown elimination · 100% Private in browser</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Wide Result Card */
          <div className="relative bg-gradient-to-b from-white via-amber-50/20 to-white rounded-3xl border-2 border-rose-200 shadow-xl overflow-hidden p-5 sm:p-7 md:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-pink-500" />

            <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest font-mono">
                <CalculateLoveLogo size={22} />
                <span>calculatelove.online</span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                FLAMES Result Certificate
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Hero Outcome & Actions */}
              <div className="lg:col-span-5 space-y-5">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold mb-2 shadow-xs">
                    <span>{result.person1}</span>
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{result.person2}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-1">
                    {result.resultWord}
                  </h3>
                  <p className="text-xs text-rose-600 font-semibold mt-0.5">
                    {result.hinglishTagline}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50/90 to-amber-50/50 rounded-3xl border border-rose-200 shadow-inner">
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-rose-300 shadow-md flex items-center justify-center text-4xl font-extrabold text-rose-600 font-display mb-2">
                    {result.resultLetter}
                  </div>
                  <span className="text-lg font-bold text-slate-900">{result.resultWord}</span>
                  <p className="text-xs text-center text-slate-600 max-w-sm mt-2 leading-relaxed">
                    {result.meaning}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppImageShare}
                    disabled={downloading}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Share FLAMES Card on WhatsApp</span>
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
                    <span>Play Another FLAMES Round</span>
                  </button>
                </div>

                {notice && (
                  <div className="p-2.5 rounded-xl bg-slate-900 text-white text-[11px] text-center animate-in fade-in leading-relaxed">
                    {notice}
                  </div>
                )}
              </div>

              {/* Right Column: Prediction, Steps Visualizer */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50/50 border border-amber-200/80 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                    <span>FLAMES Prediction & Relationship Insights</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {result.hinglishSuggestion}
                  </p>
                  <div className="pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-950 font-medium">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{result.hinglishTip}</span>
                  </div>
                </div>

                {/* Step-by-Step Elimination Table */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Step-by-Step Mathematical Elimination
                  </h4>

                  <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-slate-700 leading-relaxed space-y-1">
                    <div>1. Cancelled letters: <span className="font-bold text-rose-600">{result.steps.cancelledLetters.join(', ') || 'None'}</span></div>
                    <div>2. Remaining letters count: <span className="font-bold text-amber-700">{result.remainingCount}</span></div>
                    <div>3. Circular elimination count: <span className="font-bold text-indigo-700">{result.remainingCount}</span></div>
                  </div>

                  <div className="space-y-1 pt-1 text-xs">
                    {result.steps.eliminationRounds.map((round, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px]">
                        <span className="font-mono text-slate-600">Round {idx + 1}: Struck out &apos;{round.letterEliminated}&apos;</span>
                        <span className="font-mono font-bold text-rose-600">[{round.remainingLetters.join(', ')}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Unique In-Depth Editorial Showcase & Guide Section */}
      <div className="mt-12 space-y-12">
        {/* Featured Editorial Banner with Generated Image */}
        <div className="rounded-3xl overflow-hidden border border-amber-200 bg-slate-900 text-white shadow-lg relative">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 sm:p-10 space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>The Legendary Back-Page Notebook Game</span>
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display leading-tight text-white">
                FLAMES Game Online: Relive School &amp; College Romance
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Remember tearing out the last page of your rough notebook during boring math lectures to test your crush&apos;s name? The FLAMES game has entertained generations of students across India, turning simple letter cancellation into an exciting rite of passage and playful playground suspense.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  ✓ Friends, Lovers, Affection
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                  ✓ Marriage, Enemies, Siblings
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30">
                  ✓ 1-on-1 Strike-Out Verification
                </span>
              </div>
            </div>
            <div className="h-64 md:h-full aspect-4/3 overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={flamesImage}
                alt="Nostalgic school notebook open with pen doodles hearts and hand-drawn FLAMES game letters"
                className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Section 1: The 6 Letters of FLAMES Explained */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-3 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>The Six Destinies</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              What Each Letter in F-L-A-M-E-S Truly Signifies
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Every final remaining letter in the cyclic elimination carries a unique symbolic dynamic between two personalities:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-black text-sm flex items-center justify-center">F</span>
                <h3 className="font-bold text-sm text-slate-900">Friends (Dosti)</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The most resilient of all bonds. Zero pressure, pure laughter, comfortable silences, and an unshakable vault for life&apos;s deepest secrets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-rose-600 text-white font-black text-sm flex items-center justify-center">L</span>
                <h3 className="font-bold text-sm text-slate-900">Lovers (Pyaar)</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Magnetic attraction, electric butterflies, and intense romantic yearning. You cannot stop thinking about each other from morning to night.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-pink-50/50 border border-pink-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-pink-600 text-white font-black text-sm flex items-center justify-center">A</span>
                <h3 className="font-bold text-sm text-slate-900">Affection (Sneha)</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gentle emotional tenderness, warmth, and care without demanding expectations. A soothing connection that calms life&apos;s daily anxieties.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-black text-sm flex items-center justify-center">M</span>
                <h3 className="font-bold text-sm text-slate-900">Marriage (Shaadi)</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The ultimate long-term companion jackpot. Complete compatibility in future dreams, domestic harmony, and building a blessed life together.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-red-600 text-white font-black text-sm flex items-center justify-center">E</span>
                <h3 className="font-bold text-sm text-slate-900">Enemies (Nok-Jhok)</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fiery banter and clashing egos! While it sounds dramatic, enemy friction in Indian pop culture is frequently the thin line masking unspoken romantic chemistry.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center">S</span>
                <h3 className="font-bold text-sm text-slate-900">Siblings (Parivaar)</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fierce protective loyalty and playful childhood teasing. A bond rooted in looking out for one another against the rest of the world.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The Mathematics Behind Circular Elimination */}
        <section className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block mb-2">
              Combinatorial Mathematics
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display">
              The Algorithm: Circular Permutations &amp; Letter Cancellation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Behind the classroom entertainment lies an authentic combinatorial elimination principle closely related to the famous mathematical Josephus Problem:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Step 1: Clean &amp; Sanitize</span>
              <h3 className="font-bold text-base text-white">Character Normalization</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All spaces, special symbols, and capitalization are stripped away. Names are converted to lowercase ASCII characters to ensure symmetric matching.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">Step 2: 1-on-1 Cancellation</span>
              <h3 className="font-bold text-base text-white">Symmetric Strike-Out</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If Name 1 has two &apos;a&apos;s and Name 2 has one &apos;a&apos;, only one &apos;a&apos; from each is cancelled. The remaining uncancelled letters are counted together as count <strong>N</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">Step 3: Cyclic Countdown</span>
              <h3 className="font-bold text-base text-white">Modular Elimination</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Starting from index 0 of &apos;FLAMES&apos;, the countdown advances by <strong>N</strong>. The letter hit on the Nth count is removed, and counting resumes from the next letter until 1 survivor remains.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: School Nostalgia */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Childhood Memories</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            The School Notebook Legacy Across India
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In an era before smartphones, dating apps, and social media reels, FLAMES was the ultimate playground icebreaker. Friends would crowd around wooden school benches during tiffin breaks, giggling uncontrollably whenever a classmate’s crush ended on &apos;M&apos; (Marriage) or teasing them endlessly when it landed on &apos;S&apos; (Siblings). CalculateLove honors that innocent nostalgia with authentic transparent mechanics and instant shareable status cards.
          </p>
        </section>
      </div>

      <div className="mt-12 space-y-10">
        <RelatedTools currentToolId="flames-calculator" onNavigate={onNavigate} />
        <RelatedArticles onNavigate={onNavigate} preferredSlugs={['how-love-calculator-works', 'what-does-love-percentage-mean']} />
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
};
