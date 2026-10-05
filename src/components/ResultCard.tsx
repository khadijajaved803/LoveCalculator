import React, { useState } from 'react';
import {
  Share2,
  RotateCcw,
  Heart,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Flame,
  Coffee,
  Lightbulb,
} from 'lucide-react';
import { CompatibilityResult } from '../types';

interface ResultCardProps {
  result: CompatibilityResult;
  onReset: () => void;
  onShare: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset, onShare }) => {
  const [copied, setCopied] = useState(false);

  const websiteUrl = 'https://calculatelove.online';

  const shareText = `💖 *${result.names.person1}* & *${result.names.person2}* Love Compatibility: *${result.score}%*!\n✨ *${result.hinglishTagline}*\n💬 "${result.hinglishSuggestion}"\n\n👉 Test your love free at: ${websiteUrl}`;

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    window.location.href = `https://api.whatsapp.com/send?text=${encoded}`;
  };

  const handleFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-white via-rose-50/30 to-white rounded-3xl border-2 border-rose-200/90 shadow-xl overflow-hidden p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

      {/* Brand Header Tag */}
      <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 uppercase tracking-widest font-mono">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>calculatelove.online</span>
        </div>
        <span className="text-[10px] bg-rose-100 text-rose-700 font-semibold px-2.5 py-0.5 rounded-full">
          Official Love Certificate
        </span>
      </div>

      {/* Names & Pair Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-rose-800 text-xs font-semibold mb-2 shadow-xs">
          <span>{result.names.person1}</span>
          {result.details?.age1 && (
            <span className="text-[10px] text-slate-500 font-mono">({result.details.age1}y)</span>
          )}
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span>{result.names.person2}</span>
          {result.details?.age2 && (
            <span className="text-[10px] text-slate-500 font-mono">({result.details.age2}y)</span>
          )}
        </div>

        {/* Dynamic Tagline */}
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display mt-1 tracking-tight">
          {result.hinglishTagline || result.verdict}
        </h3>

        {result.details?.bondType && (
          <span className="text-[11px] text-slate-500 block mt-0.5 capitalize">
            Bond: {result.details.bondType} · {result.grade}
          </span>
        )}
      </div>

      {/* Score Meter Visual */}
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50/90 to-white rounded-3xl border border-rose-200/80 mb-6 shadow-inner">
        <div className="relative flex items-center justify-center">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#ffe4e6"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#e11d48"
              strokeWidth="12"
              strokeDasharray={427}
              strokeDashoffset={427 - (427 * result.score) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display tabular-nums">
              {result.score}%
            </span>
            <span className="text-[10px] text-rose-600 font-bold uppercase tracking-widest mt-0.5">
              Compatibility
            </span>
          </div>
        </div>

        <p className="text-xs text-center text-slate-600 max-w-md mt-4 leading-relaxed font-medium">
          {result.summary}
        </p>
      </div>

      {/* Dil Ki Baat - Hinglish Reflection & Suggestions */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-rose-50/50 to-amber-50/70 border border-amber-200/80 mb-6 shadow-xs space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
          <span>Dil Ki Baat · Hinglish Reflection</span>
        </div>
        <p className="text-xs text-slate-800 leading-relaxed font-sans font-medium">
          {result.hinglishSuggestion}
        </p>
        <div className="pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-950 font-medium">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>{result.hinglishTip}</span>
        </div>
      </div>

      {/* 4 Compatibility Dimensions */}
      <div className="space-y-3 mb-6 p-4 rounded-2xl bg-white border border-slate-200/80">
        <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Relationship Pillars</span>
          <span className="text-[10px] text-slate-400 font-normal">Deterministic Breakdown</span>
        </h4>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 flex items-center gap-1">
              <span>Communication & Humor</span>
            </span>
            <span className="font-bold text-slate-900 tabular-nums">
              {result.breakdown.communication}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-700"
              style={{ width: `${result.breakdown.communication}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Emotional Security & Care</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {result.breakdown.emotionalHarmony}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-pink-500 rounded-full transition-all duration-700"
              style={{ width: `${result.breakdown.emotionalHarmony}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Chemistry & Passion</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {result.breakdown.passion}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${result.breakdown.passion}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Long-term Companionship</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {result.breakdown.longevity}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${result.breakdown.longevity}%` }}
            />
          </div>
        </div>
      </div>

      {/* Social Sharing Affordances */}
      <div className="space-y-2 mb-4">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center">
          Share Your Love Score
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* WhatsApp Direct */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </button>

          {/* Facebook Direct */}
          <button
            type="button"
            onClick={handleFacebook}
            className="py-3 px-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm min-h-[44px]"
          >
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied Card!' : 'Copy Share Text'}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Test Another</span>
          </button>
        </div>
      </div>

      {/* Watermark Footer */}
      <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-[10px] text-slate-400">
        <span>Tested on calculatelove.online</span>
        <span>100% Free & Private</span>
      </div>
    </div>
  );
};
