import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Calendar,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Sun,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { DailySignPrediction } from '../lib/rashifalEngine';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface RashifalResultCardProps {
  prediction: DailySignPrediction;
  onReset: () => void;
  onNavigate: (path: string) => void;
}

export const RashifalResultCard: React.FC<RashifalResultCardProps> = ({
  prediction,
  onReset,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const websiteUrl = 'https://calculatelove.online';

  const handleCopy = async () => {
    const text =
      `✨ Aaj Ka Love Rashifal (${prediction.todayDateStr})\n` +
      `♈ Sign: ${prediction.sign.name} (${prediction.sign.rashiName})\n` +
      `💖 Love Line: ${prediction.loveReading}\n` +
      `🌟 General Outlook: ${prediction.generalReading}\n` +
      `🔢 Lucky Number (Ank): ${prediction.luckyNumber} · Color: ${prediction.luckyColor}\n` +
      `🔗 Free Daily Rashifal: ${websiteUrl}/rashifal-today/`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setNotice('Daily Rashifal copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setNotice('Could not copy to clipboard.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="rounded-3xl bg-gradient-to-br from-white via-rose-50/40 to-pink-50/50 border border-rose-200/90 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-rose-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-100">
          <CalculateLoveLogo size={28} showWordmark={true} />
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <Calendar className="w-3.5 h-3.5" />
            <span>{prediction.todayDateStr}</span>
          </div>
        </div>

        {/* Hero Sign Header */}
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-600 text-white text-4xl shadow-lg mb-3">
            {prediction.sign.glyph}
          </div>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Today&apos;s Rashifal
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            {prediction.sign.name} <span className="text-rose-600 font-serif font-normal">({prediction.sign.rashiName})</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            {prediction.sign.dates} · {prediction.sign.symbol} · {prediction.sign.element}
          </p>
        </div>

        {/* Love Reading First (Special focus per brief) */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/5 border border-rose-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-rose-600 text-white shadow-2xs">
              <Heart className="w-4 h-4 fill-white" />
            </span>
            <span className="text-sm font-black text-rose-900 tracking-wide uppercase">
              Aaj Ka Love Rashifal (Love Focus)
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            &ldquo;{prediction.loveReading}&rdquo;
          </p>
        </div>

        {/* General Day Outlook */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500 text-white shadow-2xs">
              <Sun className="w-4 h-4" />
            </span>
            <span className="text-sm font-black text-slate-900 tracking-wide uppercase">
              General Day Reading
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {prediction.generalReading}
          </p>
        </div>

        {/* Astrological Metrics Grid (Lucky Number / Ank, Color, Mood) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
          <div className="p-3 rounded-2xl bg-white border border-rose-100 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              Lucky Number (Ank)
            </span>
            <span className="text-2xl font-black text-rose-600 font-display">
              {prediction.luckyNumber}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-rose-100 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              Lucky Color
            </span>
            <span className="text-xs font-bold text-slate-800 block mt-1">
              {prediction.luckyColor}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-rose-100 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              Today&apos;s Mood
            </span>
            <span className="text-xs font-bold text-slate-800 block mt-1">
              {prediction.mood}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-rose-100 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              Harmonious With
            </span>
            <span className="text-xs font-bold text-rose-600 block mt-1">
              {prediction.compatibilityWith}
            </span>
          </div>
        </div>

        {/* Notice alert */}
        {notice && (
          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between">
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="text-slate-400 hover:text-white text-xs ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-rose-100 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Today’s Rashifal'}</span>
          </button>

          <a
            href={`#${prediction.sign.id}`}
            className="py-3 px-4 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Read {prediction.sign.name} Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={onReset}
            className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center gap-1.5"
            title="Check another sign or date"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
