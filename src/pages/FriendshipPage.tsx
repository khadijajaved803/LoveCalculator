import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateFriendshipScore } from '../lib/calculatorEngine';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import { CalculateLoveLogo } from '../components/CalculateLoveLogo';
import { CalculationLoader } from '../components/CalculationLoader';
import {
  Users,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Copy,
  Check,
  Download,
  Lightbulb,
  CheckCircle2,
  Heart,
  Smile,
  Coffee,
  Award,
  BookOpen,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import bestFriendsImage from '../assets/images/best_friends_chai_1792219741237.jpg';

interface Props {
  onNavigate: (path: string) => void;
}

export const FriendshipPage: React.FC<Props> = ({ onNavigate }) => {
  const [friend1, setFriend1] = useState('');
  const [friend2, setFriend2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [howMet, setHowMet] = useState('School / College');
  const [friendVibe, setFriendVibe] = useState('Chai Tapri & Gossip');

  const [result, setResult] = useState<ReturnType<typeof calculateFriendshipScore> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState('');

  const websiteUrl = 'https://calculatelove.online';

  const friendVibeOptions = [
    { id: 'Chai Tapri & Gossip', label: 'Chai Tapri & Gossip ☕', desc: 'Hours of endless conversation' },
    { id: 'Gaming & Late Night Memes', label: 'Memes & Late Gaming 🎮', desc: 'Tagging each other 24/7' },
    { id: 'Spontaneous Travel & Trips', label: 'Spontaneous Road Trips 🚗', desc: 'Last-minute adventure squad' },
    { id: 'Sukoon & 3 AM Venting', label: '3 AM Sukoon & Venting 🤫', desc: 'Deep emotional mutual vault' },
  ];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friend1.trim() || !friend2.trim()) {
      setError('Please provide names for both friends.');
      return;
    }
    setError('');
    setIsCalculating(true);
  };

  const handleReset = () => {
    setFriend1('');
    setFriend2('');
    setAge1('');
    setAge2('');
    setResult(null);
    setIsCalculating(false);
    setError('');
  };

  const getFriendshipCardOptions = () => {
    if (!result) throw new Error('No result');
    return {
      type: 'friendship' as const,
      names: result.names,
      score: result.score,
      tagline: result.hinglishTagline,
      suggestion: result.hinglishSuggestion,
      tip: result.hinglishTip,
      details: `${result.title} · ${friendVibe}`,
    };
  };

  const triggerDownload = (blob: Blob) => {
    if (!result) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bestie-${result.names.person1}-${result.names.person2}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const tryCopyImageBlob = async (blob: Blob) => {
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
      const blob = await generateCardImageBlob(getFriendshipCardOptions());
      const file = new File([blob], `${result.names.person1}-${result.names.person2}-friendship-card.png`, {
        type: 'image/png',
      });

      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${result.names.person1} & ${result.names.person2} Friendship Score`,
          text: `Check out our bestie card! Test yours free at: ${websiteUrl}`,
        });
      } else {
        triggerDownload(blob);
        tryCopyImageBlob(blob);
        setNotice('Friendship card downloaded & copied! Paste (Ctrl+V) directly in your WhatsApp chat.');
        setTimeout(() => {
          window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out our friendship card! Test free at: ${websiteUrl}`)}`;
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
      const blob = await generateCardImageBlob(getFriendshipCardOptions());
      triggerDownload(blob);
      setNotice('Bestie card downloaded successfully!');
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
      const blob = await generateCardImageBlob(getFriendshipCardOptions());
      const ok = await tryCopyImageBlob(blob);
      if (ok) {
        setCopiedImage(true);
        setNotice('Card image copied to clipboard!');
        setTimeout(() => setCopiedImage(false), 3000);
      } else {
        triggerDownload(blob);
        setNotice('Image downloaded to your device!');
      }
    } catch {
      setNotice('Could not copy image.');
    } finally {
      setDownloading(false);
    }
  };

  const faqs = [
    {
      question: 'How is friendship compatibility measured differently from a love test?',
      answer:
        'Friendship compatibility prioritizes loyalty, shared humor, unspoken mutual support, and secret-keeping resilience over romantic passion. Our deterministic formula weights conversational pacing and mutual loyalty.',
    },
    {
      question: 'What does the "3 AM Best Friend" tier mean?',
      answer:
        'Scores above 85% reflect rare emotional availability—someone you can call in the middle of the night without pretense or hesitation, knowing they have your back unconditionally.',
    },
    {
      question: 'Can you use nicknames for friendship testing?',
      answer:
        'Yes! Since close friends often call each other by nicknames, entering your everyday nicknames reflects your unique playful banter.',
    },
    {
      question: 'Can friendship compatibility evolve into romantic love?',
      answer:
        'Absolutely. Strong friendships form the most resilient foundation for romantic relationships (often known as the "friends-to-lovers" dynamic). When mutual trust and respect already exist, emotional intimacy transitions smoothly into romantic love.',
    },
    {
      question: 'How accurate is the Friendship Calculator by name?',
      answer:
        'Our Friendship Calculator uses a 100% deterministic algorithm that pairs name character resonance with dynamic friendship variables (origin of meeting and shared vibe). Entering the same names and parameters will consistently produce the exact same score.',
    },
    {
      question: 'Can I share the generated Friendship Card on WhatsApp and Instagram?',
      answer:
        'Yes! With a single click on "Save PNG" or "WhatsApp Card", you get a beautiful 1080×1350 vertical high-resolution Dosti Pact certificate designed specifically for Instagram Stories and WhatsApp Status updates.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Friendship & Bestie Compatibility Calculator',
    'url': 'https://calculatelove.online/friendship-calculator/',
    'description': 'Free friendship compatibility calculator and bestie loyalty meter with authentic card sharing.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Friendship Calculator - Best Friend & Loyalty Compatibility Test"
        description="Test friendship percentage and bestie loyalty with CalculateLove. Check secret-keeping quotients, mutual banter, and download official Dosti Pact cards."
        canonicalPath="/friendship-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Friendship Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-3 border border-amber-200">
          <Users className="w-3.5 h-3.5 text-amber-600" />
          <span>Dosti & Best Friend Meter</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Friendship & Bestie Loyalty Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          Celebrate your closest bonds! Check friendship percentage, loyalty resonance, secret-keeping quotient, and download official shareable Bestie cards.
        </p>
      </div>

      {/* Wide Calculator Dashboard (Width-Optimized Desktop, Clean Stacked Mobile) */}
      <div className="w-full mb-8 sm:mb-10">
        {isCalculating ? (
          <CalculationLoader
            name1={friend1}
            name2={friend2}
            type="friendship"
            onComplete={() => {
              const res = calculateFriendshipScore(friend1, friend2, { age1, age2, friendVibe });
              setResult(res);
              setIsCalculating(false);
            }}
          />
        ) : !result ? (
          <div className="bg-white rounded-3xl border border-amber-200 shadow-lg p-4 sm:p-6 md:p-7 pb-5 sm:pb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500" />

            <form onSubmit={handleCalculate} className="space-y-4 sm:space-y-5">
              {/* Row 1: Friend Names & Ages spread across width on desktop */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3.5">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 font-display">
                      Enter Friend Names
                    </h2>
                    <p className="text-xs text-slate-500">
                      Evaluates loyalty, shared humor, and communication chemistry
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Bestie Chemistry</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="min-w-0">
                    <label htmlFor="frName1" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Name / Nickname
                    </label>
                    <input
                      id="frName1"
                      type="text"
                      value={friend1}
                      onChange={(e) => setFriend1(e.target.value)}
                      placeholder="e.g. Tanvi"
                      maxLength={40}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 min-h-[42px] box-border"
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="frName2" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Best Friend&apos;s Name / Nickname
                    </label>
                    <input
                      id="frName2"
                      type="text"
                      value={friend2}
                      onChange={(e) => setFriend2(e.target.value)}
                      placeholder="e.g. Riya"
                      maxLength={40}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 min-h-[42px] box-border"
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="frAge1" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Age (Optional)
                    </label>
                    <input
                      id="frAge1"
                      type="number"
                      min="10"
                      max="99"
                      value={age1}
                      onChange={(e) => setAge1(e.target.value)}
                      placeholder="e.g. 21"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-amber-500 min-h-[42px] box-border"
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="frAge2" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Friend Age (Optional)
                    </label>
                    <input
                      id="frAge2"
                      type="number"
                      min="10"
                      max="99"
                      value={age2}
                      onChange={(e) => setAge2(e.target.value)}
                      placeholder="e.g. 22"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-amber-500 min-h-[42px] box-border"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Dynamics (Where Met & Bestie Vibe in 2 columns across width) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Where Did You Meet? */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="frWhereMetSelect" className="block text-[11px] font-bold text-amber-950 uppercase tracking-wider">
                        Where Did You Meet?
                      </label>
                      <span className="text-[10px] text-amber-800 hidden sm:inline">Select origin</span>
                    </div>

                    {/* Mobile Dropdown (space-saving) */}
                    <div className="block sm:hidden">
                      <select
                        id="frWhereMetSelect"
                        value={howMet}
                        onChange={(e) => setHowMet(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:border-amber-500 min-h-[42px]"
                      >
                        {['School / College', 'Workplace', 'Childhood Neighbors', 'Internet / Social'].map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    {/* Desktop Pills */}
                    <div className="hidden sm:flex flex-wrap gap-1.5">
                      {['School / College', 'Workplace', 'Childhood Neighbors', 'Internet / Social'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setHowMet(m)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all min-h-[34px] ${
                            howMet === m
                              ? 'bg-amber-600 text-white font-bold shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bestie Vibe */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="frVibeSelect" className="block text-[11px] font-bold text-amber-950 uppercase tracking-wider">
                        Bestie Vibe
                      </label>
                      <span className="text-[10px] text-amber-800 hidden sm:inline">Select dynamic</span>
                    </div>

                    {/* Mobile Dropdown (space-saving) */}
                    <div className="block sm:hidden">
                      <select
                        id="frVibeSelect"
                        value={friendVibe}
                        onChange={(e) => setFriendVibe(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:border-amber-500 min-h-[42px]"
                      >
                        {friendVibeOptions.map((v) => (
                          <option key={v.id} value={v.id}>{v.label} - {v.desc}</option>
                        ))}
                      </select>
                    </div>

                    {/* Desktop Segmented Buttons */}
                    <div className="hidden sm:grid grid-cols-2 gap-1.5">
                      {friendVibeOptions.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setFriendVibe(v.id)}
                          className={`p-2 rounded-xl text-left border transition-all text-xs ${
                            friendVibe === v.id
                              ? 'border-amber-500 bg-white text-amber-950 shadow-xs ring-1 ring-amber-300 font-semibold'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="font-semibold block truncate text-[11px]">{v.label}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{v.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium text-center">{error}</p>}

              {/* Row 3: Action Button AT THE END of all inputs on both mobile and desktop */}
              <div className="pt-2 flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full max-w-md py-3.5 px-8 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-600/20 min-h-[48px]"
                >
                  <span>Check Friendship Compatibility</span>
                  <Users className="w-4 h-4" />
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
          <div className="relative bg-gradient-to-b from-white via-amber-50/20 to-white rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden p-5 sm:p-7 md:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500" />

            <div className="flex items-center justify-between border-b border-amber-100 pb-3 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest font-mono">
                <CalculateLoveLogo size={22} />
                <span>calculatelove.online</span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
                Official Dosti Certificate
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Names, Score, Actions */}
              <div className="lg:col-span-5 space-y-5">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-2 shadow-xs">
                    <span>{result.names.person1}</span>
                    <Smile className="w-3.5 h-3.5 text-amber-600" />
                    <span>{result.names.person2}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display mt-1">
                    {result.title}
                  </h3>
                  <p className="text-xs text-amber-700 font-medium mt-0.5">
                    {result.hinglishTagline}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50/80 to-white rounded-3xl border border-amber-200 shadow-inner">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-36 h-36 sm:w-40 sm:h-40 transform -rotate-90">
                      <circle cx="80" cy="80" r="66" stroke="#fef3c7" strokeWidth="12" fill="transparent" />
                      <circle
                        cx="80"
                        cy="80"
                        r="66"
                        stroke="#d97706"
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
                      <span className="text-[10px] text-amber-700 font-bold uppercase tracking-widest mt-0.5">
                        Dosti Score
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-center text-slate-600 max-w-sm mt-3 leading-relaxed font-medium">
                    {result.desc}
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
                    <span>Share Bestie Card on WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadImage}
                      disabled={downloading}
                      className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-amber-200 min-h-[40px]"
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
                    <span>Test Another Friendship</span>
                  </button>
                </div>

                {notice && (
                  <div className="p-2.5 rounded-xl bg-slate-900 text-white text-[11px] text-center animate-in fade-in leading-relaxed">
                    {notice}
                  </div>
                )}
              </div>

              {/* Right Column: Pillars, Reflections, Tip */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-200/90 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                    <span>Dosti Ka Secret & Bond Insights</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {result.hinglishSuggestion}
                  </p>
                  <div className="pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-950 font-medium">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{result.hinglishTip}</span>
                  </div>
                </div>

                {/* 4 Friendship Pillars */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Friendship Dimensions
                    </h4>
                    <span className="text-[10px] text-amber-700 font-semibold">Bond: {friendVibe}</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">🛡️ Unconditional Loyalty</span>
                      <span className="font-bold text-slate-900 tabular-nums">{result.score}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${result.score}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">😂 Shared Banter & Meme Frequency</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        {Math.min(100, result.score + 5)}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${Math.min(100, result.score + 5)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">🤐 Secret-Keeping Reliability</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        {Math.max(50, result.score - 4)}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.max(50, result.score - 4)}%` }} />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 text-xs text-amber-950 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>The Unwritten Bestie Pact</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    True friendship doesn&apos;t require daily phone calls. When life gets busy, genuine best friends can pick up right where they left off without awkwardness or guilt.
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
        <div className="rounded-3xl overflow-hidden border border-amber-200 bg-slate-900 text-white shadow-lg relative">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 sm:p-10 space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-amber-300" />
                <span>The Tapri Chai Bond & Lifelong Camaraderie</span>
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display leading-tight text-white">
                Best Friend Compatibility: Beyond Mere Small Talk
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                True friendship is measured in comfortable silences, spontaneous road trips, and 3 AM emergency calls. Our Friendship Calculator explores how two individuals foster unspoken loyalty, shared humor, and emotional security that stands the test of time and distance.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  ✓ Unspoken Telepathy
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                  ✓ Zero Judgment Zone
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30">
                  ✓ 100% Private Matching
                </span>
              </div>
            </div>
            <div className="h-64 md:h-full aspect-4/3 overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={bestFriendsImage}
                alt="Two best friends laughing joyfully over tea at an outdoor cafe showcasing authentic friendship chemistry"
                className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Section 1: The Psychology of Lifelong Friendships */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-3 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Dosti Ke Chaar Sutra</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              The 4 Core Pillars of Friendship Compatibility & Mutual Loyalty
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Why do you connect effortlessly with certain people while struggling to keep conversations going with others? Psychologists identify four fundamental pillars that distinguish casual acquaintances from genuine, lifelong soul besties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <h3>1. Psychological Safety & Emotional Vault</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Can you confess your deepest insecurities, awkward mistakes, and career fears without the fear of mockery or gossip? A top-tier friendship score reflects a sealed mutual vault where secrets remain completely safeguarded.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <Smile className="w-4 h-4 text-rose-600 shrink-0" />
                <h3>2. Shared Humor & Unfiltered Banter</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                From hilarious inside jokes to laughing uncontrollably in solemn rooms, shared comedic frequency is the glue of youthful energy. If both names share high phonetic rhythm, playful teasing flows without hurt feelings.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-2">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                <RotateCcw className="w-4 h-4 text-purple-600 shrink-0" />
                <h3>3. Time & Distance Invariance</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The truest hallmark of an Indian best friendship: you might move to separate cities for jobs or higher education, yet when you reunite months later, it feels like zero seconds have elapsed. There is no awkwardness or need to restart.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <h3>4. Ego-Free Apologies & Conflict Resolution</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every long friendship faces disagreements. In toxic bonds, people hold grudges or play silent treatment. In authentic friendships, an honest conversation or a simple cup of cutting chai washes away disputes instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Friendship Scoring Spectrum Breakdown */}
        <section className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block mb-2">
              Friendship Compatibility Scale
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display">
              How to Interpret Your Friendship Calculator Percentage Score
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Every compatibility bracket provides a different flavor of mutual companionship. Here is how relationship experts categorize friendship percentages:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">90% - 100%</span>
              <h3 className="font-bold text-sm text-white">Jai & Veeru (Soul Bestie)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unshakable mutual devotion. You know what the other is thinking with just a glance across the room. The gold standard of lifelong dosti.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">75% - 89%</span>
              <h3 className="font-bold text-sm text-white">Ride-or-Die Companions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your reliable inner circle. Always ready for impromptu plans, deep heart-to-hearts, and honest feedback when you need a reality check.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">60% - 74%</span>
              <h3 className="font-bold text-sm text-white">Fun Explorers & Squad</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Great companions for concerts, college festivals, gym sessions, and weekend dinners. Thrives on common activities and active hobbies.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">Under 60%</span>
              <h3 className="font-bold text-sm text-white">Budding Connection</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Different temperaments or newer friends who haven&apos;t yet discovered their shared passions. Often transforms with time and mutual effort.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Green Flags vs Red Flags Checklist */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
              Friendship Health Checklist: Green Flags vs. Red Flags
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Healthy friendships energize your soul. Evaluate where your dynamic stands with these behavioral benchmarks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Green Flags */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3>5 Green Flags of a Lifelong Friend</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Celebrates Your Wins:</strong> Genuinely thrilled when you land a job, fall in love, or achieve personal milestones without hidden jealousy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Defends Your Honor:</strong> Speaks up on your behalf when you are not present in the room to defend yourself.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Respects Your Boundaries:</strong> Doesn&apos;t take offense when you need personal recharge time or family weekends.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Calls Out Mistakes Lovingly:</strong> Tells you the harsh truth in private to save you from public embarrassment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Zero Scorekeeping:</strong> Never reminds you of past favors or who paid for coffee last week.</span>
                </li>
              </ul>
            </div>

            {/* Red Flags */}
            <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-rose-600 shrink-0" />
                <h3>5 Red Flags in a Toxic Friendship</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Subtle Competitive Digs:</strong> Disguises insult humor as &quot;just a joke&quot; to demean your achievements in front of mutual peers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>One-Sided Venting:</strong> Reaches out only when they need a shoulder to cry on, but disappears when you need emotional support.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Leaking Private Information:</strong> Treats your vulnerable confessions as gossip currency at social gatherings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Possessive &amp; Controlling:</strong> Gets angry or passive-aggressive when you hang out with other friend groups.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Exhaustion After Meetings:</strong> Leaving conversations feeling emotionally depleted, criticized, or anxious.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 space-y-10">
        <RelatedTools currentToolId="friendship-calculator" onNavigate={onNavigate} />
        <RelatedArticles onNavigate={onNavigate} preferredSlugs={['friendship-compatibility-guide', 'how-love-calculator-works', 'what-does-love-percentage-mean']} />
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
};
