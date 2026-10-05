import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { calculateLoveScore } from '../lib/calculatorEngine';
import { ResultCard } from '../components/ResultCard';
import { EngagementInputs } from '../components/EngagementInputs';
import { TOOLS } from '../data/toolsData';
import { BLOG_POSTS } from '../data/blogData';
import {
  Heart,
  Flame,
  Users,
  Percent,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Gem,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Share2,
  Calendar,
  Lock,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<Props> = ({ onNavigate }) => {
  const [quickName1, setQuickName1] = useState('');
  const [quickName2, setQuickName2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [bondType, setBondType] = useState('Dating');
  const [vibe, setVibe] = useState('Chai & Late Night Talks');

  const [quickResult, setQuickResult] = useState<ReturnType<typeof calculateLoveScore> | null>(null);
  const [quickError, setQuickError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleQuickCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName1.trim() || !quickName2.trim()) {
      setQuickError('Please enter both your name and your partner’s name');
      return;
    }
    setQuickError('');
    const res = calculateLoveScore(quickName1, quickName2, 'general', {
      age1,
      age2,
      bondType,
      vibe,
    });
    setQuickResult(res);
  };

  const secondaryTools = [
    {
      title: 'Love Calculator by Name',
      sub: 'Naam Se Love Match',
      path: '/love-calculator-by-name/',
      desc: 'Test sound harmony, letter frequency, and romantic vibrations.',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      title: 'FLAMES Game Online',
      sub: 'School & College Classic',
      path: '/flames-calculator/',
      desc: 'Play authentic letter-cancellation for Friends, Lovers, Marriage & more.',
      icon: Flame,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: 'Love Percentage Calculator',
      sub: 'Asli Pyaar Percentage Test',
      path: '/love-percentage-calculator/',
      desc: 'Check detailed 4-pillar scores for communication, care, and chemistry.',
      icon: Percent,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      title: 'Friendship Calculator',
      sub: 'Dosti & Bestie Meter',
      path: '/friendship-calculator/',
      desc: 'Check best-friend loyalty, spontaneous banter, and mutual support.',
      icon: Users,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: 'True Love & Soulmate Test',
      sub: 'Dil Se Dil Ka Connection',
      path: '/true-love-calculator/',
      desc: 'Explore deep emotional resonance, crush affinity, and soulmate harmony.',
      icon: Sparkles,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      title: 'Love vs. Arranged Marriage',
      sub: 'Shaadi Ki Sambhavna',
      path: '/love-or-arranged-marriage-calculator/',
      desc: 'Balancing modern personal courtship with traditional family blessing.',
      icon: Gem,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
  ];

  const highVolumeFaqs = [
    {
      q: 'Kya online love calculator ka score accurate hota hai?',
      a: 'CalculateLove ka algorithm fully deterministic hai—iska matlab agar aap same naam enter karenge toh hamesha same score aayega. Yeh tool phonetic vibrations, letter matching aur bond preferences ka scientific-style entertainment model use karta hai. Asli relationship trust, respect aur open communication se grow karti hai.',
    },
    {
      q: 'How does the Love Calculator by Name calculate true love percentage?',
      a: 'The calculator analyzes symmetrical letter frequency, vowel-to-consonant ratios, and name harmony. By factoring in your couple vibe and age dynamic, it evaluates communication compatibility, emotional warmth, and relationship longevity.',
    },
    {
      q: 'Kya CalculateLove par mera data safe aur private hai?',
      a: 'Haan, 100% private! Aapka enter kiya hua koi bhi naam, age ya date of birth hamare server par store nahi hota. Saari calculations seedha aapke device browser mein hoti hain.',
    },
    {
      q: 'FLAMES game mein letters kaise cancel hote hain?',
      a: 'Dono naamo ke common letters 1-on-1 cancel hote hain. Baaki bache hue remaining letters ke total count se F-L-A-M-E-S (Friends, Lovers, Affectionate, Marriage, Enemies, Siblings) sequence mein cyclic elimination hoti hai jab tak ek final letter bache.',
    },
    {
      q: 'Can I share the generated Love Certificate card on WhatsApp Status?',
      a: 'Yes! Simply click "WhatsApp Card" or "Download Card PNG" on your result. It instantly downloads a high-resolution 1080×1350 certificate image that fits WhatsApp Status, Instagram Stories, and Facebook posts perfectly.',
    },
    {
      q: 'Love Marriage ya Arranged Marriage Calculator kis basis par result deta hai?',
      a: 'Yeh tool aapke lifestyle priorities—jaise family involvement, dating autonomy, aur communication openness—ko evaluate karke batata hai ki aapka inclination modern love courtship ki taraf zyada hai ya traditional family-guided alliance ki taraf.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'CalculateLove',
    'url': 'https://calculatelove.online/',
    'description': 'Free love, friendship, and relationship compatibility calculators with authentic card sharing for India.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://calculatelove.online/blog/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="w-full overflow-x-hidden">
      <SEOHead
        title="CalculateLove - Real Love Calculator by Name & Compatibility Test"
        description="Check real love percentage, test name compatibility, play authentic FLAMES game online, and get relationship advice at CalculateLove. 100% free and private."
        canonicalPath="/"
        schemaJson={schemaJson}
      />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-6 pb-12 sm:pt-10 sm:pb-16 max-w-5xl mx-auto text-center">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-rose-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-4 border border-rose-200/80 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>India&apos;s #1 Free & Private Relationship Platform</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4 text-balance">
          Real Love Calculator by Name & Compatibility Test
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 text-balance">
          Discover your true love percentage, test mutual chemistry with age and couple vibes, play authentic FLAMES, and download high-resolution shareable cards.
        </p>

        {/* Action Buttons - Fully responsive without truncation */}
        <div className="flex flex-col xs:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => onNavigate('/love-calculator/')}
            className="w-full xs:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-rose-600/15 transition-all flex items-center justify-center gap-2 min-h-[46px]"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Test Love Percentage</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/flames-calculator/')}
            className="w-full xs:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2 min-h-[46px] shadow-2xs"
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Play FLAMES Online</span>
          </button>
        </div>
      </section>

      {/* Interactive Quick Calculator Hero Card */}
      <section className="px-4 sm:px-6 max-w-xl mx-auto mb-16 sm:mb-20">
        {!quickResult ? (
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-xl p-5 sm:p-7 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

            <div className="text-center mb-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                Instant Love Compatibility Check
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter two names to calculate love percentage & relationship advice
              </p>
            </div>

            <form onSubmit={handleQuickCalculate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="min-w-0">
                  <label htmlFor="hpName1" className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="hpName1"
                    type="text"
                    value={quickName1}
                    onChange={(e) => setQuickName1(e.target.value)}
                    placeholder="e.g. Rahul"
                    maxLength={40}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px] box-border"
                    required
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor="hpName2" className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Partner / Crush Name
                  </label>
                  <input
                    id="hpName2"
                    type="text"
                    value={quickName2}
                    onChange={(e) => setQuickName2(e.target.value)}
                    placeholder="e.g. Pooja"
                    maxLength={40}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px] box-border"
                    required
                  />
                </div>
              </div>

              {/* Engaging Inputs */}
              <EngagementInputs
                age1={age1}
                setAge1={setAge1}
                age2={age2}
                setAge2={setAge2}
                bondType={bondType}
                setBondType={setBondType}
                vibe={vibe}
                setVibe={setVibe}
                person1Label="Your"
                person2Label="Partner's"
              />

              {quickError && (
                <p className="text-xs text-rose-600 font-medium">{quickError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/10 min-h-[46px]"
              >
                <span>Calculate Compatibility</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Deterministic match · Zero data logged · 100% Private</span>
              </div>
            </form>
          </div>
        ) : (
          <ResultCard
            result={quickResult}
            onReset={() => {
              setQuickName1('');
              setQuickName2('');
              setAge1('');
              setAge2('');
              setQuickResult(null);
            }}
            onShare={() => {}}
          />
        )}
      </section>

      {/* Popular Tools Grid */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
            Choose Your Match Intent
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Popular Relationship Calculators
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Each calculator is specifically calibrated for different relationship questions and stages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {secondaryTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.path}
                onClick={() => onNavigate(tool.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNavigate(tool.path)}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${tool.color} border flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 group-hover:text-rose-500 transition-colors">
                      {tool.sub}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-1 font-display">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-semibold">
                  <span>Start Test</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEO Section 1: True Love Percentage by Name (Naam Se Love Match Check Karein) */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-3 border border-rose-100">
                Trending Search: Naam Se Love Match
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4">
                True Love Percentage by Name (Naam Se Love Match Check Karein)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Kya aap janna chahte hain ki aapke aur aapke partner ke naam mein kitni compatibility hai? CalculateLove offers a deterministic phonetic vibration analysis that analyzes letter frequency, vowel structure, and sound rhythm between two names.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Symmetrical Harmony:</strong> Person A + Person B ka result hamesha identical hota hai chahe kisi ka bhi naam pehle daalein.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Dimensional Breakdown:</strong> Communication, emotional warmth, passion, aur long-term companionship ka alag percentage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Instant Certificate Card:</strong> Direct WhatsApp & Facebook photo card share karne ki suvidha.</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('/love-calculator-by-name/')}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center gap-2 min-h-[40px]"
              >
                <span>Check Name Match Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-200">
              <h3 className="font-bold text-slate-900 text-sm mb-3">Understanding the Compatibility Scale</h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-2xs">
                  <div className="font-bold text-rose-600 flex justify-between">
                    <span>88% – 98%</span>
                    <span>Rab Ne Bana Di Jodi</span>
                  </div>
                  <p className="text-slate-600 mt-1">Natural chemistry, deep mutual laughter, and comfort in silence.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-2xs">
                  <div className="font-bold text-pink-600 flex justify-between">
                    <span>75% – 87%</span>
                    <span>Solid Sukoon & Care</span>
                  </div>
                  <p className="text-slate-600 mt-1">Mutual respect, protective affection, and uplifting support.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-2xs">
                  <div className="font-bold text-amber-600 flex justify-between">
                    <span>60% – 74%</span>
                    <span>Opposites Attract</span>
                  </div>
                  <p className="text-slate-600 mt-1">Playful banter, complementary styles, and exciting discoveries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section 2: Real vs. Fake Love Meter (Asli Pyaar Test) */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-3 border border-rose-500/30">
              Real vs Infatuation
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display mb-4 text-balance">
              Real Love Meter vs Fake Clickbait Calculators (Asli Pyaar Test)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Bohot si websites par har baar page refresh karne par alag percentage dikhata hai ya user ka data track karti hain. CalculateLove eliminates random number generators with deterministic algorithms that guarantee the same result every single time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                <h3 className="font-bold text-xs text-white mb-1">Zero Logging</h3>
                <p className="text-[11px] text-slate-400">Browser-executed calculations ensure your names and crush details never touch an external server.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Sparkles className="w-5 h-5 text-amber-400 mb-2" />
                <h3 className="font-bold text-xs text-white mb-1">Deterministic Formula</h3>
                <p className="text-[11px] text-slate-400">Standard character hashing guarantees that the love score does not fluctuate randomly.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Share2 className="w-5 h-5 text-rose-400 mb-2" />
                <h3 className="font-bold text-xs text-white mb-1">Card Image Sharing</h3>
                <p className="text-[11px] text-slate-400">Generate 1080×1350 certificate cards with one click for WhatsApp Status and Instagram.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section 3: FLAMES Game Online & School Nostalgia */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-amber-50/70 border border-amber-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 border border-amber-200">
                Nostalgic School Game
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4">
                Play Authentic FLAMES Game Online (FLAMES Test in Hindi / English)
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                School aur college ke dino ki sabse popular game—FLAMES! Ab notebook par kaatne ki zaroorat nahi hai. Hamara automated tool 1-on-1 letters cancel karke cyclic countdown ke saath authentic outcome batata hai:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold mb-6">
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">F = Friends (Dosti)</div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">L = Lovers (Pyaar)</div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">A = Affection (Care)</div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">M = Marriage (Shaadi)</div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">E = Enemies (Nok-Jhok)</div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">S = Siblings (Raksha)</div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/flames-calculator/')}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center gap-2 min-h-[40px]"
              >
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>Play FLAMES Game Now</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">How Letters Are Cancelled</h3>
              <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-slate-700 leading-relaxed">
                1. "Aryan" + "Diya"<br/>
                2. Cancel common letters: &apos;a&apos;, &apos;y&apos;<br/>
                3. Remaining letters: r, n, d, i (4 letters)<br/>
                4. Count 4 through F-L-A-M-E-S repeatedly until 1 letter survives!
              </div>
              <p className="text-[11px] text-slate-500">
                Aapko har step ka complete mathematical breakdown aur visual certificate card milta hai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section 4: Kundli Milan vs Name Matching */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-2">
              Tradition & Modern Science
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4">
              Kundli Milan vs. Name Compatibility (Naam Milan Aur Guna)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Traditional Indian astrology mein Kundli Milan ke Ashta Kuta (36 Gunas)—jaise Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, aur Nadi—ka evaluation hota hai.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Hamara tool numerology aur conversational name harmonics par based ek accessible, fun compatibility check provide karta hai. Yeh kisi bhi traditional Kundli astrologer ya matrimonial pandit ka replacement nahi hai, balki couples ke liye ek safe, uplifting aur playful reflection tool hai.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/love-calculator-by-date-of-birth/')}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 min-h-[38px]"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-600" />
                <span>Life Path Birth Date Test</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/love-or-arranged-marriage-calculator/')}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 min-h-[38px]"
              >
                <Gem className="w-3.5 h-3.5 text-purple-600" />
                <span>Marriage Preference Check</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section 5: Why CalculateLove (Clean, Updated) */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-rose-50/20 to-white border border-rose-200/80 shadow-md">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-2">
              Why CalculateLove
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-display mb-4">
              A Better, Faster, and Private Way to Test Compatibility
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              CalculateLove replaces slow, ad-choked calculator websites with a clean, mobile-first experience. Whether calculating a lighthearted crush score or exploring marriage alignment, our platform provides stable, symmetric calculations with friendly relationship reflections.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs mb-2">
                  01
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Deterministic Results</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The exact same names always return the identical percentage, guaranteeing reproducibility and consistency.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs mb-2">
                  02
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Zero Data Harvesting</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  All algorithms run in your client browser. We never log or sell names, ages, or dates of birth.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs mb-2">
                  03
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Warm Relationship Advice</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Thoughtful reflections celebrating Indian couple culture, tea moments, and healthy open conversations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High Volume FAQ Accordion Section */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto mb-16 sm:mb-20">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Frequently Asked Questions (Aksar Pooche Jaane Wale Sawaal)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Clear answers about formulas, relationship psychology, and privacy.
          </p>
        </div>

        <div className="space-y-3">
          {highVolumeFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:text-rose-600 transition-colors min-h-[48px]"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-rose-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest Blog Guides */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Latest Relationship Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Read editorial breakdowns on formulas, dating advice, and compatibility.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/blog/')}
            className="text-xs font-semibold text-rose-600 hover:underline"
          >
            View all guides →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              onClick={() => onNavigate(`/blog/${post.slug}/`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate(`/blog/${post.slug}/`)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-2 line-clamp-2 leading-snug font-display">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-semibold">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
