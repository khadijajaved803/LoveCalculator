import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResultCard } from '../components/ResultCard';
import { ShareModal } from '../components/ShareModal';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateLoveScore } from '../lib/calculatorEngine';
import { CompatibilityResult } from '../types';
import { Heart, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LoveCalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both your name and your partner’s name.');
      return;
    }
    setError('');
    const res = calculateLoveScore(name1, name2, 'general');
    setResult(res);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setResult(null);
    setError('');
  };

  const faqs = [
    {
      question: 'How does the online love calculator compute the score?',
      answer:
        'Our love calculator uses deterministic character harmonic analysis. It analyzes letter frequency, vowel structure, and phonetic synergy between both names. Most importantly, it is symmetric: testing "Rahul" and "Priya" produces the exact same score as "Priya" and "Rahul".',
    },
    {
      question: 'Is this love test private?',
      answer:
        'Yes, 100% private. Calculations take place instantly inside your browser. We never store, transmit, or share your names.',
    },
    {
      question: 'Can a love calculator predict if a relationship will succeed?',
      answer:
        'No. Love calculators are fun entertainment tools designed to spark romantic conversation and playful reflection. Real, lasting relationships depend on mutual trust, emotional maturity, open communication, and shared values.',
    },
    {
      question: 'What is considered a good love percentage score?',
      answer:
        'Scores above 75% indicate strong natural resonance. However, even couples with scores in the 60s often make wonderful partners because complementary differences bring fresh perspective and balance.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love Calculator - Test Compatibility Score Online',
    'url': 'https://milanmeter.com/love-calculator/',
    'description': 'Free online love calculator to test real compatibility percentage and relationship chemistry between two names.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Calculator - Test True Love Percentage by Name | MilanMeter"
        description="Calculate love compatibility percentage between two names instantly with MilanMeter. Fun, private, deterministic love score with deep relationship insights."
        canonicalPath="/love-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Love Calculators', href: '/love-calculator/' },
          { label: 'Love Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Free Online Love Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Test love percentage, mutual chemistry, and emotional harmony between two names. Fast, private, and deterministic.
        </p>
      </div>

      {/* Calculator Shell */}
      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label
                  htmlFor="person1"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Your Name
                </label>
                <input
                  id="person1"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-center my-2">
                <span className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                </span>
              </div>

              <div>
                <label
                  htmlFor="person2"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Partner&apos;s / Crush&apos;s Name
                </label>
                <input
                  id="person2"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="e.g. Ananya Patel"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/10 min-h-[48px]"
              >
                <span>Calculate Compatibility</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic match · Zero data logged</span>
              </div>
            </form>
          </div>
        ) : (
          <ResultCard
            result={result}
            onReset={handleReset}
            onShare={() => setShareOpen(true)}
          />
        )}
      </div>

      {/* Share Modal */}
      {result && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          title="MilanMeter Love Score"
          shareText={`💖 ${result.names.person1} & ${result.names.person2} have a ${result.score}% Love Compatibility score on MilanMeter! (${result.verdict})`}
          url="https://milanmeter.com/love-calculator/"
        />
      )}

      {/* Editorial Content / How it Works / Search Intent */}
      <section className="mt-16 pt-12 border-t border-slate-200 space-y-10 text-slate-700">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
            How Does the MilanMeter Love Calculator Work?
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            Unlike superficial tools that generate random percentages, the MilanMeter love calculator uses deterministic character harmonization. Every letter in your name carries a phonetic vibration and structural position. Our algorithm normalizes both names, calculates letter overlap ratios, balances vowel-to-consonant harmony, and applies a symmetric mathematical hash.
          </p>
          <p className="text-sm leading-relaxed">
            This guarantees that whether you enter your name first or your partner&apos;s name first, your result remains completely consistent.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
            Understanding Your Love Compatibility Score
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">85% to 98% · Deep Resonance</h3>
              <p className="text-slate-600">
                Natural comfort, mutual trust, and shared humor. Conversations feel effortless and emotional safety is naturally present.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">70% to 84% · Harmonious Affinity</h3>
              <p className="text-slate-600">
                A strong, loving foundation with healthy individuality. Both partners support each other&apos;s personal dreams and aspirations.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">55% to 69% · Complementary Dynamics</h3>
              <p className="text-slate-600">
                Opposites attract! Differences provide healthy spark and room for mutual growth when approached with curiosity and respect.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Core Reflection</h3>
              <p className="text-slate-600">
                Every score is an opportunity to reflect on your relationship strengths. Real love is built through continuous care, patience, and affection.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Callout */}
        <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-900">Note on Love Testing:</strong> This calculator is created for entertainment, romantic curiosity, and fun social sharing. True romantic compatibility cannot be reduced to a mechanical algorithm alone; it is cultivated through daily acts of kindness, active listening, and unwavering loyalty.
        </div>
      </section>

      {/* Internal Linking: Related Tools & Articles */}
      <RelatedTools currentToolId="love-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-love-calculator-works', 'what-does-love-percentage-mean']}
      />

      {/* FAQs */}
      <FAQSection faqs={faqs} />
    </div>
  );
};
