import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { calculateLoveScore } from '../lib/calculatorEngine';
import { ResultCard } from '../components/ResultCard';
import { ShareModal } from '../components/ShareModal';
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
  BookOpen,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<Props> = ({ onNavigate }) => {
  const [quickName1, setQuickName1] = useState('');
  const [quickName2, setQuickName2] = useState('');
  const [quickResult, setQuickResult] = useState<ReturnType<typeof calculateLoveScore> | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [quickError, setQuickError] = useState('');

  const handleQuickCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName1.trim() || !quickName2.trim()) {
      setQuickError('Please enter both names');
      return;
    }
    setQuickError('');
    const res = calculateLoveScore(quickName1, quickName2, 'general');
    setQuickResult(res);
  };

  const secondaryTools = [
    {
      title: 'Love Calculator by Name',
      path: '/love-calculator-by-name/',
      desc: 'Test sound harmony and letter vibration between full names.',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      title: 'Love Percentage Calculator',
      path: '/love-percentage-calculator/',
      desc: 'Check detailed scores for communication, care, and chemistry.',
      icon: Percent,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      title: 'Friendship Calculator',
      path: '/friendship-calculator/',
      desc: 'Discover best-friend compatibility, loyalty, and banter meter.',
      icon: Users,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'True Love & Soulmate Test',
      path: '/true-love-calculator/',
      desc: 'Explore deep emotional resonance and soulmate harmony.',
      icon: Sparkles,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      title: 'FLAMES Calculator Game',
      path: '/flames-calculator/',
      desc: 'Authentic school game with letter cancellation step-by-step.',
      icon: Flame,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Love Compatibility Test',
      path: '/love-compatibility-calculator/',
      desc: 'Comprehensive relationship assessment for lasting commitment.',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50',
    },
  ];

  const categories = [
    {
      name: 'Love & Romance',
      count: '4 Calculators',
      desc: 'Name vibration, compatibility scores, and soulmate testing.',
      path: '/love-calculator/',
    },
    {
      name: 'FLAMES & Fun',
      count: 'Nostalgic Classic',
      desc: 'Authentic letter-cancellation game played across Indian schools.',
      path: '/flames-calculator/',
    },
    {
      name: 'Friendship',
      count: 'Platonic Bonds',
      desc: 'Best-friend loyalty meters, humor resonance, and support scores.',
      path: '/friendship-calculator/',
    },
    {
      name: 'Marriage Alignment',
      count: 'Matrimonial Match',
      desc: 'Modern love marriage vs. traditional family-guided alliance balance.',
      path: '/love-or-arranged-marriage-calculator/',
    },
    {
      name: 'Numerology & Birth Dates',
      count: 'Life Path Harmony',
      desc: 'Birthdate reduction to single-digit Life Path vibrations.',
      path: '/love-calculator-by-date-of-birth/',
    },
    {
      name: 'Astrology & Zodiac',
      count: 'Cosmic Archetypes',
      desc: 'Elemental harmony between Fire, Earth, Air, and Water signs.',
      path: '/astrology/',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'MilanMeter',
    'url': 'https://milanmeter.com/',
    'description': 'Free love, friendship, and relationship compatibility calculators for India.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://milanmeter.com/blog/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="MilanMeter - Free Love & Compatibility Calculators"
        description="Check love, friendship and relationship compatibility with simple online calculators. Fast, private, deterministic name matching and FLAMES game."
        canonicalPath="/"
        schemaJson={schemaJson}
      />

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto pt-4 pb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-4 border border-rose-100">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>India&apos;s Private Relationship Tools Platform</span>
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4 text-balance">
          Free Love & Compatibility Calculators
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-6">
          Check love, friendship and relationship compatibility with simple online calculators.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/love-calculator/')}
            className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-rose-600/10 transition-all flex items-center gap-2 min-h-[44px]"
          >
            <span>Open Love Calculator</span>
            <Heart className="w-4 h-4 fill-white" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/flames-calculator/')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm transition-all flex items-center gap-2 min-h-[44px]"
          >
            <span>Play FLAMES Game</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      </section>

      {/* Interactive Quick Calculator Hero Card */}
      <section className="max-w-xl mx-auto mb-16">
        {!quickResult ? (
          <div className="bg-white rounded-3xl border border-rose-200/80 shadow-md p-6 sm:p-8">
            <div className="text-center mb-5">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Instant Love Compatibility Test
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter two names to calculate their deterministic love percentage
              </p>
            </div>

            <form onSubmit={handleQuickCalculate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    value={quickName1}
                    onChange={(e) => setQuickName1(e.target.value)}
                    placeholder="Your Name"
                    maxLength={40}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={quickName2}
                    onChange={(e) => setQuickName2(e.target.value)}
                    placeholder="Partner / Crush Name"
                    maxLength={40}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px]"
                    required
                  />
                </div>
              </div>

              {quickError && (
                <p className="text-xs text-rose-600 font-medium">{quickError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
              >
                <span>Calculate Love Score</span>
                <Heart className="w-3.5 h-3.5 fill-white" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic result · Browser-computed privacy</span>
              </div>
            </form>
          </div>
        ) : (
          <ResultCard
            result={quickResult}
            onReset={() => {
              setQuickName1('');
              setQuickName2('');
              setQuickResult(null);
            }}
            onShare={() => setShareOpen(true)}
          />
        )}
      </section>

      {quickResult && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          title="MilanMeter Love Score"
          shareText={`💖 ${quickResult.names.person1} & ${quickResult.names.person2} scored ${quickResult.score}% Compatibility on MilanMeter!`}
          url="https://milanmeter.com/"
        />
      )}

      {/* Secondary Tools Grid */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Popular Relationship Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Choose a dedicated tool designed specifically for your matching intent.
            </p>
          </div>
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
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-9 h-9 rounded-xl ${tool.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-1.5 font-display">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-medium">
                  <span>Start Test</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Editorial Overview Section / Platform explanation */}
      <section className="mb-16 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-2">
            Why MilanMeter
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-4">
            A Better, Faster, and Private Way to Test Compatibility
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            MilanMeter was built to replace chaotic, ad-choked calculator websites with a clean, mobile-first experience. Whether calculating a lighthearted crush score or exploring marriage alignment, our platform provides stable, symmetric calculations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-900">Deterministic Results</h3>
              <p className="text-xs text-slate-500">
                The exact same names always return the identical percentage, guaranteeing reproducibility.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-900">Zero Data Harvesting</h3>
              <p className="text-xs text-slate-500">
                All algorithms run in your client browser. We never log or sell names or dates of birth.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-900">Healthy Wisdom</h3>
              <p className="text-xs text-slate-500">
                Transparent disclaimers reminding users that true love is built on active daily kindness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-2">
          Explore by Category
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          From school nostalgia and platonic friends to matrimony and Life Path numbers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onNavigate(cat.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate(cat.path)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">
                  {cat.count}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                {cat.desc}
              </p>
              <span className="text-xs text-rose-600 font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blog Guides */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Latest Relationship Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Read editorial breakdowns on formulas, relationship psychology, and compatibility.
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-2 line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-medium">
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
