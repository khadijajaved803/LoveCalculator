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
  Calendar,
  ArrowRight,
} from 'lucide-react';
import flamesImage from '../assets/images/flames_notebook_game_1790774216847.webp';
import flamesWorkedExampleImage from '../assets/images/flames-calculator-how-to-calculate.webp';
import flamesTwinFlameImage from '../assets/images/flames-calculator-twin-flame-vs-flames.webp';

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
  const dobToolPath = '/love-calculator-by-date-of-birth/';

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

  // FLAMES result by leftover-letter count, N = 1 to 30.
  // Verified against the calculator's own elimination (Josephus step N on F-L-A-M-E-S).
  const flamesCountChart: Array<{ count: number; letter: string; word: string }> = [
    { count: 1, letter: 'S', word: 'Siblings' },
    { count: 2, letter: 'E', word: 'Enemies' },
    { count: 3, letter: 'F', word: 'Friends' },
    { count: 4, letter: 'E', word: 'Enemies' },
    { count: 5, letter: 'F', word: 'Friends' },
    { count: 6, letter: 'M', word: 'Marriage' },
    { count: 7, letter: 'E', word: 'Enemies' },
    { count: 8, letter: 'A', word: 'Affection' },
    { count: 9, letter: 'E', word: 'Enemies' },
    { count: 10, letter: 'L', word: 'Lovers' },
    { count: 11, letter: 'M', word: 'Marriage' },
    { count: 12, letter: 'A', word: 'Affection' },
    { count: 13, letter: 'A', word: 'Affection' },
    { count: 14, letter: 'F', word: 'Friends' },
    { count: 15, letter: 'M', word: 'Marriage' },
    { count: 16, letter: 'F', word: 'Friends' },
    { count: 17, letter: 'A', word: 'Affection' },
    { count: 18, letter: 'F', word: 'Friends' },
    { count: 19, letter: 'L', word: 'Lovers' },
    { count: 20, letter: 'E', word: 'Enemies' },
    { count: 21, letter: 'F', word: 'Friends' },
    { count: 22, letter: 'E', word: 'Enemies' },
    { count: 23, letter: 'F', word: 'Friends' },
    { count: 24, letter: 'E', word: 'Enemies' },
    { count: 25, letter: 'E', word: 'Enemies' },
    { count: 26, letter: 'M', word: 'Marriage' },
    { count: 27, letter: 'S', word: 'Siblings' },
    { count: 28, letter: 'A', word: 'Affection' },
    { count: 29, letter: 'S', word: 'Siblings' },
    { count: 30, letter: 'A', word: 'Affection' },
  ];

  const faqs = [
    {
      question: 'What is the FLAMES full form and flames name game meaning?',
      answer:
        'FLAMES stands for Friends, Lovers, Affection, Marriage, Enemies and Siblings. Each letter names one relationship the game can land on. The full form is the whole point of the game: the count decides which of the six words describes the pair, and the calculator shows the meaning beside the letter so the result is never just an initial.',
    },
    {
      question: 'How does the FLAMES calculator calculate the flames love calculator percentage?',
      answer:
        'There is no percentage number. The flames calculator percentage people ask about is the affinity reading the result card gives you: the letter\'s meaning, suggestion and tip. The calculator counts the uncancelled letters from both names, applies cyclic elimination across F-L-A-M-E-S, then shows the full working, every cancelled letter, the remaining count and each elimination round, so you can see exactly how the result was reached.',
    },
    {
      question: 'Should I enter my flames real name or a nickname in the FLAMES calculator?',
      answer:
        'Use the name people actually call you by. A legal first name and a nickname can give different counts, and both are fair to try, because the game runs on whatever names you type. The game has no official rulebook, so the name you actually go by is the honest choice, and a nickname is a fair second test. Neither is more correct than the other.',
    },
    {
      question: 'How does letter cancellation work in the FLAMES name calculator?',
      answer:
        'Common letters between the two names are struck out on a strict 1-to-1 basis. If one name has two As and the other has one A, only one A is cancelled from each name. The letters left over are counted together, and that total, N, is used in the modular countdown across the six letters.',
    },
    {
      question: 'Can you calculate love flames by date of birth?',
      answer:
        'The original FLAMES game is strictly a name game: it counts letters, never birth dates. To check love flames by date of birth, use the companion Date of Birth Love Calculator, which reads the two birth dates instead. Comparing the FLAMES letter with a birth-date reading gives you two different lenses on the same pair, one from the names and one from the dates.',
    },
    {
      question: 'What does flames name compatibility say about "Enemies" or "Siblings"?',
      answer:
        'FLAMES is a lighthearted game, and neither word means what it sounds like. An Enemies result usually means spirited banter, playful friction or stubborn pride, the kind of friction that keeps two people talking. A Siblings result means fierce protective loyalty and unconditional support, the way family looks out for each other. Neither is a warning about the real relationship.',
    },
    {
      question: 'Why is CalculateLove’s online FLAMES calculator better than other sites?',
      answer:
        'Most FLAMES sites show you a letter and stop there. This calculator shows the whole working: every cancelled letter, the remaining count and each elimination round, so you can check the result yourself. It also gives you a shareable certificate card with the meaning, suggestion and tip, and a result chart that lets you look up any count from 1 to 30 without counting at all.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'FLAMES Calculator: FLAMES Game Online',
    'url': 'https://calculatelove.online/flames-calculator/',
    'description': 'Play the authentic FLAMES calculator and FLAMES game online. Free flames name game with step-by-step letter elimination, flames love calculator percentage, and downloadable certificate cards.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="FLAMES Calculator Online | FLAMES Game by Name"
        description="Play the FLAMES calculator and FLAMES game online. Free flames name game with 1-on-1 letter cancellation, FLAMES full form and instant result cards."
        canonicalPath="/flames-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'FLAMES Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-3 border border-amber-200 shadow-2xs">
          <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          <span>Nostalgic FLAMES Calculator &amp; FLAMES Game Online</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          FLAMES Calculator: Free FLAMES Game &amp; Name Matching Online
        </h1>
        <blockquote className="my-6 rounded-r-2xl border-l-4 border-rose-500 bg-rose-50/70 px-5 py-4 text-left">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            <strong>Quick answer: </strong>A <strong>FLAMES calculator</strong>{' '}
            turns two names into one of six results: Friends, Lovers, Affection, Marriage, Enemies or Siblings. It cancels the letters the two names share, one for one, counts what is left, then counts that number around{' '}
            <strong>F-L-A-M-E-S</strong> until one letter stands. It is a game, not a prediction.
          </p>
        </blockquote>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          FLAMES is a classic name game that turns two names into one of six outcomes: Friends, Lovers, Affection, Marriage, Enemies or Siblings. Type both names and the calculator cancels the letters the two names share, one for one, then counts what is left and eliminates letters from F-L-A-M-E-S until one remains. The surviving letter is your result, a lighthearted read on the pair that you can download as a shareable card.
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
                    <p className="text-base font-extrabold text-slate-900 font-display">
                      Enter Names for FLAMES Calculator
                    </p>
                    <p className="text-xs text-slate-500">
                      Automated 1-to-1 letter strikeout for accurate flames name matching &amp; compatibility
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <label htmlFor="flameName1" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Real Name / Nickname <span className="text-rose-500">*</span>
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
                        Crush / Partner Name <span className="text-rose-500">*</span>
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
                      <strong>Deterministic FLAMES Name Matching:</strong> Our <strong>flames name calculator</strong> eliminates identical characters 1-by-1 symmetrically, running circular elimination until exactly 1 letter survives.
                    </p>
                  </div>
                </div>

                {/* Right Column: FLAMES Legend */}
                <div className="lg:col-span-5 bg-amber-50/50 p-4 sm:p-5 rounded-2xl border border-amber-200 space-y-3">
                  <div className="border-b border-amber-200/80 pb-2">
                    <p className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      FLAMES Full Form &amp; Meaning Guide
                    </p>
                    <p className="text-[11px] text-amber-800">
                      Discover the authentic flames name game meaning behind each letter
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
                  <span>Calculate FLAMES Love Match</span>
                  <Flame className="w-4 h-4 fill-white" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Exact flames name game calculator with cyclic countdown · 100% Private in browser</span>
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
                FLAMES Calculator Result Certificate
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
                    <span>FLAMES Love Calculator Percentage &amp; Relationship Insights</span>
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
                    FLAMES Name Matching: Step-by-Step Mathematical Elimination
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
      <div className="mt-12 space-y-12 [&_p]:text-justify">
        {/* Featured Editorial Banner with Generated Image */}
        <div className="rounded-3xl overflow-hidden border border-amber-200 bg-slate-900 text-white shadow-lg relative">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 sm:p-10 space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>The Legendary Back-Page Notebook Game</span>
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display leading-tight text-white">
                FLAMES Calculator &amp; FLAMES Game Online: Relive School Romance
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Remember tearing out the last page of your rough notebook during boring math lectures to test your crush&apos;s name? The <strong>FLAMES game</strong> has entertained generations of students across India, turning simple letter cancellation into a rite of passage and a playground suspense: what will the two names turn out to be?
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
              FLAMES Full Form: What Each Letter in F-L-A-M-E-S Truly Signifies
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Each letter in the <strong>FLAMES full form</strong> stands for one relationship. F is Friends, L is Lovers, A is Affection, M is Marriage, E is Enemies and S is Siblings. The game hands you one of these six, depending on how many letters survive the name matching. Some classrooms read A as Admiration and S as Sisters, which are local variants, and the calculator on this page uses the Affection and Siblings reading. The full form sits beside your result, so the letter you land on never stays a mystery.
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
                Fiery banter and clashing egos. It sounds dramatic, but in this game Enemies usually means spirited teasing and stubborn pride, the kind of friction that keeps two people talking.
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
              How the FLAMES Calculator Works: Combinatorial Circular Elimination &amp; Name Matching
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Behind the classroom fun sits a real piece of mathematics: a counting-out elimination closely related to the famous <strong>Josephus Problem</strong>. Here is how the calculator turns two names into one letter, and the section below tells the story of the 1st-century historian the problem is named after.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Step 1: Clean &amp; Sanitize</span>
              <h3 className="font-bold text-base text-white">Character Normalization</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All spaces, special symbols, and capital letters are stripped away. Both names are converted to lowercase letters, so the matching treats both names the same way.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">Step 2: 1-on-1 Cancellation</span>
              <h3 className="font-bold text-base text-white">Symmetric Strike-Out</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If Name 1 has two &apos;a&apos;s and Name 2 has one &apos;a&apos;, only one &apos;a&apos; from each is cancelled. The letters left over are counted together, and that total is the count, <strong>N</strong>, the number the whole game turns on.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">Step 3: Cyclic Countdown</span>
              <h3 className="font-bold text-base text-white">Modular Elimination</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Starting from F, the count advances by <strong>N</strong>. The letter landed on is removed, and counting resumes from the next letter, until one survivor remains. That survivor is your result.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2b: Worked Example: How to Calculate FLAMES */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200">
            <img
              src={flamesWorkedExampleImage}
              alt="Two friends writing the names Liam and Emma in a school notebook to calculate FLAMES, with matching letters crossed out and the FLAMES letters circled"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-3 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Worked Example</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              How to Calculate FLAMES Between Two Names
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              The FLAMES game is the paper-and-pen cousin of a{' '}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                love calculator
              </a>
              {' '}, and it asks whether two names go together, but it answers with a letter instead of a number. Checking love flames by name takes about a minute and needs nothing but the two first names: no birth dates, no signs, and no flames calculator app to install.
            </p>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Here is how to calculate love flames on paper. Write the two names side by side and cross out the letters they share, one for one, then count what is left. Take Liam and Emma. The letter A appears in both names, so one A is crossed out from each; the letter M appears once in Liam and twice in Emma, so one M is crossed out from each. Four letters stay behind, L and I from Liam, E and M from Emma, and that count, 4, is the number the whole game turns on.
            </p>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl font-mono text-xs text-slate-700 leading-relaxed space-y-1 border border-slate-100">
              <div>Liam + Emma</div>
              <div>Shared letters crossed out, one for one: <span className="font-bold text-rose-600">A, M</span></div>
              <div>Letters left: L, I, E, M, count N = <span className="font-bold text-amber-700">4</span></div>
              <div>Count 4 around F-L-A-M-E-S: M out, then L, F, A, S</div>
              <div>Letter left standing: <span className="font-bold text-rose-600">E, Enemies</span></div>
            </div>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              Counting 4 around the letters strikes out M first, then L, F, A and S, and E is the letter left standing, so Liam and Emma land on Enemies. That sounds harsher than it is: in this game Enemies usually means spirited banter and stubborn pride, the kind of friction that keeps two people talking, and the FAQ below explains why it is rarely a real warning. If the letter had come out Lovers instead, the{' '}
              <a
                href="/crush-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/crush-calculator/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                crush calculator
              </a>
              {' '}is the next playful check, reading the same two names for crush chemistry rather than letter counts.
            </p>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              The flames calculator percentage people ask about is the affinity reading that comes with the letter: the meaning, the suggestion and the tip on the result card, not a second score hiding behind it. There is no separate flames percentage to chase. The game gives you one letter and the count that produced it, so the strength of the match is visible in the working rather than in a number. No flames percentage calculator can give you a second score, because the game has only one number: the count. That is also what makes a flames calculator love test different from a flames love meter: the game measures how two names line up on paper, not how two people actually feel.
            </p>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Think of it as a flames love test, not a verdict. A real flames calculator shows its working, the cancelled letters, the count and every round, so you can check the result yourself instead of taking it on trust. The calculator above generates the letter, the working and the shareable card in one go, free, in the browser, no sign-up. Use it whenever you want a quick, playful read on two names, or try{' '}
              <a
                href="/name-compatibility/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/name-compatibility/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                name compatibility
              </a>
              {' '}for a different lens on the same two names, one that reads sound and spelling patterns instead of shared letters.
            </p>
          </div>
        </section>

        {/* Section 2c: FLAMES Result Chart (count to result) */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-3 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Look It Up</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              The FLAMES Result Chart: Which Count Gives Which Letter
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              The <strong>flames calculator</strong> does the counting for you, but you can also look the answer up. The result depends on one number only: how many letters are left after the shared ones are crossed out. Count your leftover letters, find the number below, and you have the result without counting around the word at all.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full max-w-2xl text-sm border border-slate-200 rounded-2xl overflow-hidden">
              <caption className="sr-only">Letters left after cancellation, and the FLAMES result each count gives</caption>
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th scope="col" className="px-4 py-2.5 text-left font-bold">Letters left</th>
                  <th scope="col" className="px-4 py-2.5 text-left font-bold">Letter</th>
                  <th scope="col" className="px-4 py-2.5 text-left font-bold">Result</th>
                </tr>
              </thead>
              <tbody>
                {flamesCountChart.map((row) => (
                  <tr key={row.count} className="border-t border-slate-100 odd:bg-white even:bg-slate-50/60">
                    <td className="px-4 py-2 font-mono text-slate-700">{row.count}</td>
                    <td className="px-4 py-2 font-bold text-rose-600">{row.letter}</td>
                    <td className="px-4 py-2 text-slate-700">{row.word}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="max-w-3xl space-y-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
              What the Chart Shows
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Count the table and one pattern jumps out. Enemies turns up 8 times in the first 30 counts, more than any other letter, and Lovers turns up only twice. Friends turns up 7 times, Affection 6, Marriage 4, and Siblings 3. That is not a judgment on your names. It is just how the counting falls: the elimination lands on some letters more often than others.
            </p>
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 font-display">
              The Pattern Repeats Every 60 Counts
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Here is the part no other FLAMES page tells you. The pattern does not run on forever. It repeats every 60 counts: count 61 gives the same letter as count 1, count 62 the same as count 2, and so on. The reason is simple arithmetic. As the letters are struck out, the circle shrinks through 6, 5, 4, 3 and 2 letters, and 60 is the smallest number that divides evenly by all of them. Add 60 to any count and every round lands on the same letter, so the whole game, for any two names, lives inside one 60-count cycle.
            </p>
          </div>
        </section>

        {/* Section 2d: FLAMES and the Josephus Problem */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-4">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Two Thousand Years Old</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              FLAMES and the Josephus Problem: A Counting Game From the 1st Century
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              FLAMES is not the first counting-out game. It is the newest version of one. The method, count around a circle and strike out every Nth item until one is left, is called the <strong>Josephus Problem</strong>, and it is named after Flavius Josephus, a Jewish historian of the 1st century. In his account of the siege of Yodfat in 67 CE, Josephus wrote that he and 40 soldiers were trapped in a cave by Roman troops and agreed to draw lots rather than be captured. They stood in a circle and counted, and Josephus and one other man were the last two left. The two surrendered. The story is told in Book 3 of his history, The Jewish War.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              The circle-and-count idea did not stay in that cave. In 1612, the French mathematician Claude Gaspard Bachet described the same counting game with 41 men and a step of three, and worked out that the safe places were the 16th and the 31st. It became a puzzle mathematicians still teach, and the counting rhyme children use to pick who is it, eeny, meeny, miny, moe, works the same way: count around, strike one out, keep going. FLAMES is that game with six letters instead of 41 men. The count is the leftover letters, the circle is F-L-A-M-E-S, and the last letter standing is the survivor. The game in your notebook is two thousand years old, even if the letters are new.
            </p>
          </div>
        </section>

        {/* Section 3: FLAMES Real Name vs Nicknames & Name Generator */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider">
            <Users className="w-4 h-4 text-rose-600" />
            <span>Name Rules &amp; Tips</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
            FLAMES Real Name vs. Nicknames: How to Play the FLAMES Name Game
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Should you enter your real name or a playful nickname into the <strong>flames calculator</strong>? In Indian school classrooms and college canteens, friends tested both, formal names and pet nicknames, to see if the result changed. It can, because a nickname changes the letters, and the letters decide the count. Try both and compare, but treat the full name as the main result and the nickname as the fun second test.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-1.5">
              <h3 className="text-xs font-bold text-rose-950 uppercase tracking-wide">Using Your FLAMES Real Name</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Entering full, official names gives a stable, reproducible result. This is the one to use when you want the standard answer, the one you would have written in the notebook.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 space-y-1.5">
              <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wide">Testing Pet Names &amp; Nicknames</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Shortened nicknames (like Sonu, Chintu, or Priya) change the uncancelled letter count N, so the result can come out different. That is the fun of it, not a flaw: a nickname is a different pair of names.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Love FLAMES by Date of Birth vs. FLAMES Name Matching */}
        <section className="bg-gradient-to-br from-amber-50/40 via-white to-rose-50/30 rounded-3xl border border-amber-200/90 p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>Alternative Compatibility Methods</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
            Love FLAMES by Date of Birth vs. FLAMES Calculator by Name
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Many people look for <strong>love flames by date of birth</strong>. The traditional FLAMES game is strictly a name game, a formula based on character cancellation, and it never looks at a birth date. If you want a birth-date reading as well, the Date of Birth Love Calculator reads the two birth dates, and the two results together give you a fuller picture than either one alone.
          </p>
          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-900">
                Want to calculate compatibility by birth dates?
              </h3>
              <p className="text-xs text-slate-500">
                Check birth-date harmony alongside your <strong>flames calculator</strong> result.
              </p>
            </div>
            <a
              href={dobToolPath}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(dobToolPath);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-xs hover:from-amber-700 hover:to-rose-700 transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <span>Test DOB Love Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Section 4b: Twin Flame Calculator vs the FLAMES Game */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,280px] gap-6 items-start">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Not the Same Game</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                Twin Flame Calculator vs the FLAMES Game
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Twin flames are described as two halves of one soul, split apart and looking for each other across lifetimes, and a twin flame calculator claims to tell you whether two people fit that story, usually from their birth dates. That is a different kind of check from the FLAMES game, which only counts the letters in two names and never looks at a birth date. The two ideas share the word flame and almost nothing else, so a twin flame result and a FLAMES result cannot be compared with each other.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Most twin flame calculator pages call themselves free, and they ask for two birth dates before they answer. A free twin flame calculator usually returns a yes-or-no verdict, sometimes with a percentage, and the ones that go further ask for full birth details: a twin flame birthday calculator works from the two birthdays alone, while a twin flame birth chart calculator compares the two full charts. The ones that go furthest lay two birth charts side by side instead of just comparing birthdays, and that comparison is what a twin flame synastry chart calculator promises.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                If what you actually want is a birth-date reading, this site has better tools for it than a twin flame verdict. The{' '}
                <a
                  href="/love-calculator-by-date-of-birth/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/love-calculator-by-date-of-birth/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  love calculator by date of birth
                </a>
                {' '}compares two birth dates the way the FLAMES game compares two names, and the{' '}
                <a
                  href="/love-compatibility-by-zodiac-sign/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/love-compatibility-by-zodiac-sign/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  zodiac sign compatibility
                </a>
                {' '}reading looks at the two signs together. For the soulmate idea behind twin flames, the{' '}
                <a
                  href="/blog/what-is-a-soulmate/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog/what-is-a-soulmate/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  soulmate guide
                </a>
                {' '}explains what a soulmate is supposed to be and how people claim to recognise one. None of those is a twin flame calculator either. They are the closest honest checks this site offers for two people wondering how they fit.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 h-72 md:h-full min-h-[18rem]">
              <img
                src={flamesTwinFlameImage}
                alt="Two candle flames merging into one golden glow under a starry sky, titled Twin Flame vs FLAMES"
                width={1120}
                height={2240}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section 5: School Nostalgia */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Childhood Memories</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            The School Notebook Legacy: India&apos;s Favorite FLAMES Game
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In an era before smartphones, dating apps, and social media reels, the <strong>FLAMES calculator</strong> was the ultimate playground icebreaker. Friends would crowd around wooden school benches during tiffin breaks, giggling whenever a classmate&apos;s crush ended on M (Marriage) or teasing them endlessly when it landed on S (Siblings). The game needed nothing but a notebook and two names, and that is why it travelled so far. Any classroom could play it, and it never needed a battery.
          </p>
        </section>

        {/* Section 6: FLAMES on Screen */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-4">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>On Screen</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              FLAMES on Screen: The TV Show Named After the Game
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The game is famous enough to have a television show named after it. Flames, a Hindi coming-of-age series from The Viral Fever (TVF), premiered on 5 January 2018 and follows Rajat, a studious teenager, and Ishita, the new girl at his tuition centre in west Delhi. The tagline is Padhai aur Pyaar, studies and love, and the title is a direct nod to the notebook game: first love, worked out the way schoolchildren always have.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              The show ran for four seasons, the last in 2023, and streams on Amazon Prime Video. Its leads, Ritvik Sahore and Tanya Maniktala, play two students whose friendship turns into a first love in the middle of tuition classes and board exam pressure. If the game feels like your school days, that is the point. The show is the game, stretched into a love story.
            </p>
          </div>
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
