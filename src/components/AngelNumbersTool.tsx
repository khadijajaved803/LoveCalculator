import React, { useState } from 'react';
import {
  calculateAngelNumber,
  getSingleDigitMeaning,
  AngelNumberResult,
} from '../lib/angelNumbersEngine';
import { CalculationLoader } from './CalculationLoader';
import { ShareModal } from './ShareModal';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  AlertCircle,
  RotateCcw,
  Heart,
  Download,
  Share2,
  Hash,
} from 'lucide-react';

export const AngelNumbersTool: React.FC = () => {
  const [dob, setDob] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<AngelNumberResult | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

  const meaning = result ? getSingleDigitMeaning(result.number) : null;

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
    const res = calculateAngelNumber(dob);
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
    if (!result || !meaning) return;
    try {
      setDownloading(true);
      const blob = await generateCardImageBlob({
        type: 'angel-numbers',
        names: { person1: `Angel Number ${result.number}`, person2: '' },
        score: result.number,
        tagline: `Angel Number ${result.number} — ${meaning.title}`,
        suggestion: meaning.description,
        tip: meaning.love,
        details: result.steps.join(' · '),
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Angel-Number-${result.number}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setNotice('Shareable angel number card downloaded!');
      setTimeout(() => setNotice(null), 3000);
    } catch {
      setNotice('Could not generate image. Please try again.');
      setTimeout(() => setNotice(null), 4000);
    } finally {
      setDownloading(false);
    }
  };

  const shareText = result && meaning
    ? `My Angel Number is ${result.number} (${meaning.title}). Find yours free.`
    : '';

  return (
    <div className="w-full">
      {/* ─── Calculating Loader ─── */}
      {isCalculating && (
        <CalculationLoader
          name1={dob || 'Your Birth Date'}
          name2="Angel Number"
          type="angel"
          minDuration={1600}
          maxDuration={2200}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* ─── Result View ─── */}
      {!isCalculating && result && meaning && (
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
                <span>Your Angel Number · Born on a {result.dayOfWeek}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                Your Angel Number is {result.number}
              </h2>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium mt-2 max-w-xl mx-auto">
                {meaning.title} — {meaning.description}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            {/* Number Card */}
            <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-5 sm:p-6 text-center max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-purple-700 mb-2">
                <Hash className="w-3.5 h-3.5" />
                <span>Your Angel Number</span>
              </div>
              <div className="text-6xl font-extrabold text-purple-700 font-display">
                {result.number}
              </div>
              <p className="text-sm font-bold text-slate-800 mt-2">{meaning.title}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                {meaning.description}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 flex items-start justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{meaning.love}</span>
              </p>
            </div>

            {/* Calculation Steps */}
            <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5 max-w-xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                How your angel number was calculated
              </p>
              <div className="space-y-2 font-mono text-sm text-slate-800">
                {result.steps.map((step, idx) => (
                  <p key={`an-${idx}`}>{step}</p>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Add every digit of your date of birth together, then keep adding the
                digits of the total until one digit from 1 to 9 is left. That digit is
                your angel number.
              </p>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mt-6 text-center">
              Angel numbers are a popular modern belief — a traditional reading, not
              a prediction. Your choices still decide your life.
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
                <span>Free Angel Number Calculator · 100% Free Results</span>
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display mb-2">
                Angel Number Calculator
              </h2>

              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium">
                Find your angel number free by date of birth — the angel number calculator free to use adds up your birth date and shows your number with its meaning. No sign-up.
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
                    <strong>One number, 1 to 9:</strong> your birth date reduces to a single
                    digit, and the guide below explains what each number is read as.
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
                <span>Calculate My Angel Number</span>
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
        title="My Angel Number Report"
        shareText={shareText}
        url="https://calculatelove.online/angel-numbers/"
      />
    </div>
  );
};
