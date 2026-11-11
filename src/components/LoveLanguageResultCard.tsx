import React, { useState } from 'react';
import {
  LoveLanguageQuizResult,
  CoupleCompatibilityResult,
} from '../lib/loveLanguageEngine';
import {
  MessageCircle,
  Wrench,
  Gift,
  Clock,
  HeartHandshake,
  Printer,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Heart,
  Lightbulb,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface LoveLanguageResultCardProps {
  personName?: string;
  result: LoveLanguageQuizResult;
  couplesData?: CoupleCompatibilityResult | null;
  onRetake: () => void;
}

export const LoveLanguageResultCard: React.FC<LoveLanguageResultCardProps> = ({
  personName,
  result,
  couplesData,
  onRetake,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const getLanguageIcon = (key: string, className = 'w-5 h-5') => {
    switch (key) {
      case 'words':
        return <MessageCircle className={className} />;
      case 'acts':
        return <Wrench className={className} />;
      case 'gifts':
        return <Gift className={className} />;
      case 'time':
        return <Clock className={className} />;
      case 'touch':
        return <HeartHandshake className={className} />;
      default:
        return <Heart className={className} />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const blob = await generateCardImageBlob({
        type: 'love-language',
        names: {
          person1: personName || 'You',
          person2: couplesData ? couplesData.partner2Name : '',
        },
        score: result.topLanguage ? result.scores[0].percentage : 100,
        word: result.topLanguage.name,
        tagline: `Primary Love Language: ${result.topLanguage.name}`,
        suggestion: result.topLanguage.whatItMeans,
        tip: result.topLanguage.weeklyAction,
        details: 'The 5 Love Languages Quiz · Free Result',
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Love-Language-${(personName || 'Result').replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setNotice('Shareable result card downloaded!');
      setTimeout(() => setNotice(null), 3000);
    } catch {
      setNotice('Could not generate image. Use the Print button to save as PDF.');
      setTimeout(() => setNotice(null), 4000);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    try {
      const summaryText = `My primary love language is ${result.topLanguage.name} (${result.scores[0].percentage}%)!\n` +
        `Scores Breakdown:\n` +
        result.scores.map((s) => `• ${s.info.name}: ${s.percentage}%`).join('\n') +
        `\nTake the free Love Language Test at: https://calculatelove.online/love-language-test/`;
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setNotice('Results copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setNotice(null);
      }, 3000);
    } catch {
      setNotice('Failed to copy. Please select and copy manually.');
      setTimeout(() => setNotice(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden printable-result-card animate-in fade-in duration-300">
      {/* Notice Toast */}
      {notice && (
        <div className="bg-slate-900 text-white text-xs font-semibold py-2 px-4 text-center sticky top-0 z-20 animate-in fade-in duration-200">
          {notice}
        </div>
      )}

      {/* Decorative Top Accent Bar */}
      <div className="h-2.5 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500" />

      <div className="p-5 sm:p-8">
        {/* Printable-only header */}
        <div className="hidden print:flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-2">
            <CalculateLoveLogo size={32} showWordmark={true} />
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-rose-600 block">calculatelove.online/love-language-test/</span>
            <span className="text-[10px] text-slate-400">Free 5 Love Languages Assessment Result</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Official 5 Love Languages Result</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mb-2">
            {personName ? `${personName}'s Love Language` : 'Your Primary Love Language'}
          </h2>

          <p className="text-sm text-slate-600">
            Based on Gary Chapman’s 5 Love Languages framework, here is how love lands hardest for you.
          </p>
        </div>

        {/* Primary Winner Banner Card */}
        <div className="rounded-2xl bg-gradient-to-br from-rose-50/80 via-white to-pink-50/80 border-2 border-rose-200 p-6 sm:p-8 text-center relative shadow-sm mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md mb-4">
            {getLanguageIcon(result.topLanguage.key, 'w-8 h-8 sm:w-10 sm:h-10')}
          </div>

          <div className="text-xs uppercase font-extrabold tracking-wider text-rose-600 mb-1">
            Top Love Language ({result.scores[0].percentage}%)
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 font-display tracking-tight mb-3">
            {result.topLanguage.name}
          </h3>

          <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed mb-4">
            {result.topLanguage.summary}
          </p>

          {result.isCloseCall && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                <strong>Close Second:</strong> Your score for <strong>{result.secondLanguage.name}</strong> ({result.scores[1].percentage}%) is very close! Many people naturally operate with a dual love language.
              </span>
            </div>
          )}
        </div>

        {/* ─── The Love Language Chart (Ordered Bar Breakdown) ─── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                The Love Language Chart
              </h4>
              <p className="text-xs text-slate-500">
                All 5 love languages ranked from your strongest to lowest preference.
              </p>
            </div>
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
              Ranked Tallest First
            </span>
          </div>

          <div className="space-y-3 bg-slate-50/80 rounded-2xl p-4 sm:p-6 border border-slate-100">
            {result.scores.map((item, idx) => {
              const isTop = idx === 0;
              return (
                <div key={item.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="flex items-center gap-2 font-semibold text-slate-800">
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        isTop ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        #{idx + 1}
                      </span>
                      <span>{item.info.name}</span>
                    </span>
                    <span className={`font-bold font-mono ${isTop ? 'text-rose-600' : 'text-slate-600'}`}>
                      {item.percentage}%
                    </span>
                  </div>

                  {/* Bar */}
                  <div className="h-3 w-full bg-slate-200/70 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        isTop
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500'
                          : idx === 1
                          ? 'bg-rose-300'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${Math.max(6, item.percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Deep Dive: What It Means, What Fills It Up, Weekly Action ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Card 1: What It Means */}
          <div className="rounded-2xl p-5 bg-rose-50/50 border border-rose-100/80 flex flex-col">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-2.5">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>What It Means</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
              {result.topLanguage.whatItMeans}
            </p>
          </div>

          {/* Card 2: What Fills It Up */}
          <div className="rounded-2xl p-5 bg-pink-50/50 border border-pink-100/80 flex flex-col">
            <div className="flex items-center gap-2 text-pink-800 font-bold text-sm mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-pink-600" />
              <span>What Fills It Up</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
              {result.topLanguage.whatFillsItUp}
            </p>
          </div>

          {/* Card 3: One Thing to Ask For This Week */}
          <div className="rounded-2xl p-5 bg-amber-50/60 border border-amber-200/80 flex flex-col">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Ask For This Week</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed flex-1">
              {result.topLanguage.weeklyAction}
            </p>
          </div>
        </div>

        {/* ─── Couples Mode Comparison (if present) ─── */}
        {couplesData && (
          <div className="rounded-2xl p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border-2 border-purple-200 mb-8">
            <div className="flex items-center gap-2 text-purple-900 font-extrabold text-base mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Couples Comparison & Dynamics</span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              {couplesData.matchInsight}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-3 border-t border-purple-100">
              <div className="bg-white/80 p-3.5 rounded-xl border border-purple-100">
                <span className="font-bold text-purple-900 block mb-1">
                  💡 Action for {couplesData.partner1Name}:
                </span>
                <span className="text-slate-700">{couplesData.partner1ActionFor2}</span>
              </div>
              <div className="bg-white/80 p-3.5 rounded-xl border border-purple-100">
                <span className="font-bold text-purple-900 block mb-1">
                  💡 Action for {couplesData.partner2Name}:
                </span>
                <span className="text-slate-700">{couplesData.partner2ActionFor1}</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── Action Buttons (Print, Download, Share, Retake) ─── */}
        <div className="print:hidden pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Print Your Results button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all min-h-[44px]"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Your Results</span>
            </button>

            {/* Download Card button */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 active:scale-95 transition-all shadow-xs min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Generating...' : 'Download Card'}</span>
            </button>

            {/* Copy / Share button */}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all min-h-[44px] min-w-[44px]"
              title="Copy Summary"
              aria-label="Copy results to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 hover:underline py-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz / Switch Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
