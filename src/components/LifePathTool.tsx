import React, { useState } from 'react';
import {
  calculateLifePath,
  getLifePathMeaning,
  getMulankMeaning,
  MULANK_2_PROFILE,
  BHAGYANK_9_PROFILE,
  LifePathResult,
} from '../lib/lifePathEngine';
import { CalculationLoader } from './CalculationLoader';
import { ShareModal } from './ShareModal';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import {
  Hash,
  Calendar,
  Sparkles,
  ArrowRight,
  AlertCircle,
  RotateCcw,
  Moon,
  Compass,
  Heart,
  Download,
  Share2,
} from 'lucide-react';

export const LifePathTool: React.FC = () => {
  const [dob, setDob] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<LifePathResult | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

  const lifePathMeaning = result ? getLifePathMeaning(result.lifePathNumber) : null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!dob) {
      setError('Please select your Date of Birth.');
      return;
    }

    setIsCalculating(true);
  };

  const handleLoaderComplete = () => {
    setIsCalculating(false);
    const res = calculateLifePath(dob);
    setResult(res);
    if (res) {
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleRetake = () => {
    setResult(null);
    setError('');
  };

  const handleDownload = async () => {
    if (!result || !lifePathMeaning) return;
    try {
      setDownloading(true);
      const blob = await generateCardImageBlob({
        type: 'life-path',
        names: { person1: `Life Path ${result.lifePathNumber}`, person2: '' },
        score: result.lifePathNumber,
        tagline: `Life Path ${result.lifePathNumber} — ${lifePathMeaning.title} · Mulank ${result.mulank}`,
        suggestion: lifePathMeaning.description,
        tip: `Mulank ${result.mulank} · Destiny Number ${result.destinyNumber} (Bhagyank) — your life path and destiny numbers are the same.`,
        details: result.steps.join(' · '),
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Life-Path-Report-${result.lifePathNumber}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setNotice('Shareable life path card downloaded!');
      setTimeout(() => setNotice(null), 3000);
    } catch {
      setNotice('Could not generate image. Please try again.');
      setTimeout(() => setNotice(null), 4000);
    } finally {
      setDownloading(false);
    }
  };

  const shareText = result && lifePathMeaning
    ? `My Life Path Number is ${result.lifePathNumber} (${lifePathMeaning.title}) · Mulank ${result.mulank} · Destiny Number ${result.destinyNumber} (Bhagyank).`
    : '';

  return (
    <div className="w-full">
      {/* ─── Calculating Loader ─── */}
      {isCalculating && (
        <CalculationLoader
          name1={dob || 'Your Birth Date'}
          name2="Life Path"
          type="dob"
          minDuration={1600}
          maxDuration={2200}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* ─── Result View ─── */}
      {!isCalculating && result && lifePathMeaning && (
        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
          {notice && (
            <div className="bg-slate-900 text-white text-xs font-semibold py-2 px-4 text-center">
              {notice}
            </div>
          )}
          {/* Result Header */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 p-6 sm:p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
                <span>Your Numbers · Born on a {result.dayOfWeek}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                Your Life Path Number is {result.lifePathNumber}
              </h2>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium mt-2 max-w-xl mx-auto">
                {lifePathMeaning.theme} — {lifePathMeaning.description}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            {/* Three Number Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Life Path Number */}
              <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-purple-700 mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Life Path Number</span>
                </div>
                <div className="text-5xl font-extrabold text-purple-700 font-display">
                  {result.lifePathNumber}
                </div>
                <p className="text-xs font-bold text-slate-800 mt-2">{lifePathMeaning.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {lifePathMeaning.description}
                </p>
              </div>

              {/* Mulank */}
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700 mb-2">
                  <Moon className="w-3.5 h-3.5" />
                  <span>Mulank · Root Number</span>
                </div>
                <div className="text-5xl font-extrabold text-indigo-700 font-display">
                  {result.mulank}
                </div>
                <p className="text-xs font-bold text-slate-800 mt-2">From your birth day</p>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {getMulankMeaning(result.mulank)}
                </p>
              </div>

              {/* Destiny Number / Bhagyank */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-2">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Destiny Number · Bhagyank</span>
                </div>
                <div className="text-5xl font-extrabold text-amber-700 font-display">
                  {result.destinyNumber}
                </div>
                <p className="text-xs font-bold text-slate-800 mt-2">Same as your life path number</p>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Traditionally read as where your life is headed — the work, the relationships
                  and the lessons your life keeps bringing you.
                </p>
              </div>
            </div>

            {/* Calculation Steps */}
            <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                How your numbers were calculated
              </p>
              <div className="space-y-2 font-mono text-sm text-slate-800">
                {result.steps.map((step, idx) => (
                  <p key={`lp-${idx}`}>{step}</p>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Mulank (from the birth day only):{' '}
                <span className="font-mono text-slate-700">{result.mulankSteps.join(' → ')}</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Note: a life path 10 reduces to 1 — a 10 is read as a 1. Master numbers 11, 22
                and 33 are not reduced further.
              </p>
            </div>

            {/* Mulank 2 Profile */}
            {result.mulank === 2 && (
              <div className="mt-6 rounded-2xl border border-purple-100 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-900 font-display mb-2">
                  Mulank 2 Profile
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {MULANK_2_PROFILE.personality}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  {MULANK_2_PROFILE.loveLife}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  {MULANK_2_PROFILE.compatibility}
                </p>
              </div>
            )}

            {/* Bhagyank 9 Profile */}
            {result.destinyNumber === 9 && (
              <div className="mt-6 rounded-2xl border border-amber-100 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-900 font-display mb-2">
                  {BHAGYANK_9_PROFILE.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {BHAGYANK_9_PROFILE.description}
                </p>
              </div>
            )}

            <p className="text-[11px] text-slate-400 leading-relaxed mt-6 text-center">
              These are traditional numerology readings — tendencies, not rules or guarantees.
              Your choices still decide your life.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition-all shadow-xs min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Generating...' : 'Download Card'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 active:scale-95 transition-all min-h-[44px]"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:border-purple-300 hover:text-purple-700 transition-all min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" />
                Calculate Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Calculator Form ─── */}
      {!isCalculating && !result && (
        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
          {/* Top Decorative Header */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 p-6 sm:p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
                <span>Life Path, Mulank &amp; Destiny Number · 100% Free Results</span>
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display mb-2">
                Life Path Calculator
              </h2>

              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium">
                Free life path calculator — your life path number, mulank and destiny number by
                date of birth. No sign-up.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8 max-w-2xl mx-auto">
            <form
              onSubmit={handleCalculate}
              className="space-y-4"
            >
              {/* Error Notice */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  <span>Date of Birth</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden text-sm transition-all"
                />
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>
                    <strong>Step-by-step working:</strong> the result shows every step of the
                    addition, so you can check the sum yourself.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>
                    <strong>Three numbers:</strong> life path number, mulank (root number) and
                    destiny number (bhagyank) — all from one date of birth.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>
                    <strong>100% Free &amp; Private:</strong> results generated instantly on your
                    device.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl text-center text-sm sm:text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 min-h-[52px]"
              >
                <span>Calculate My Life Path Number</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── Share Modal ─── */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title="My Life Path Number Report"
        shareText={shareText}
        url="https://calculatelove.online/life-path-calculator/"
      />
    </div>
  );
};
