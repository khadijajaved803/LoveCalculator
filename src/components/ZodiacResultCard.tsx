import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Sun,
  Moon,
  Compass,
  ArrowRight,
  Flame,
  Globe,
  Share2,
} from 'lucide-react';
import { ZodiacFinderResult } from '../lib/zodiacEngine';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface ZodiacResultCardProps {
  result: ZodiacFinderResult;
  onReset: () => void;
  onNavigate: (path: string) => void;
}

export const ZodiacResultCard: React.FC<ZodiacResultCardProps> = ({
  result,
  onReset,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const websiteUrl = 'https://calculatelove.online';

  const handleCopy = async () => {
    const text =
      `♈ Sun Sign: ${result.sunSign.name} (${result.sunSign.dates})\n` +
      `🌙 Moon Sign: ${result.moonSign.name} (${result.rashi.nakshatra})\n` +
      `🕉️ Vedic Rashi: ${result.rashi.name} (Lord: ${result.rashi.rashiLord})\n` +
      `✨ Element: ${result.sunSign.element} · Ruling Planet: ${result.sunSign.rulingPlanet}\n` +
      `🔗 Find yours free at: ${websiteUrl}/zodiac-signs/`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setNotice('Zodiac details copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setNotice('Could not copy to clipboard.');
    }
  };

  const getElementBadgeColor = (element: string) => {
    switch (element) {
      case 'Fire':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Earth':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Air':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Water':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      default:
        return 'bg-purple-100 text-purple-900 border-purple-300';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="rounded-3xl bg-gradient-to-br from-white via-rose-50/30 to-purple-50/40 border border-rose-200/80 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-rose-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-100">
          <CalculateLoveLogo size={28} showWordmark={true} />
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
            Zodiac Sign Report
          </span>
        </div>

        {/* Main Sign Display */}
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 text-white text-4xl shadow-lg mb-3">
            {result.sunSign.glyph}
          </div>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Your Sun Sign
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            {result.sunSign.name}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-rose-600 mt-1">
            {result.sunSign.dates} · {result.sunSign.symbol}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            {result.reading}
          </p>
        </div>

        {/* The 3 Celestial Layers: Sun Sign, Moon Sign, Vedic Rashi */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {/* Sun Sign */}
          <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Sun Sign</span>
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              {result.sunSign.name}
            </div>
            <div className="text-[11px] text-slate-500">
              Element: <span className="font-semibold text-slate-700">{result.sunSign.element}</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Ruler: <span className="font-semibold text-slate-700">{result.sunSign.rulingPlanet}</span>
            </div>
          </div>

          {/* Moon Sign */}
          <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span>Moon Sign</span>
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              {result.moonSign.name}
            </div>
            <div className="text-[11px] text-slate-500">
              Star: <span className="font-semibold text-slate-700">{result.rashi.nakshatra}</span>
            </div>
            <div className="text-[11px] text-slate-500">
              {result.rashi.isApproximate ? 'Estimated Midday' : 'Exact via Time'}
            </div>
          </div>

          {/* Indian Rashi */}
          <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Vedic Rashi</span>
            </div>
            <div className="text-sm font-extrabold text-slate-900 truncate">
              {result.rashi.name}
            </div>
            <div className="text-[11px] text-slate-500">
              Lord: <span className="font-semibold text-slate-700">{result.rashi.rashiLord}</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Vedic Moon Sign
            </div>
          </div>
        </div>

        {/* Strengths & Compatibility Highlights */}
        <div className="mt-5 pt-5 border-t border-rose-100 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Core Strengths
            </span>
            <div className="flex flex-wrap gap-1.5">
              {result.sunSign.strengths.map((str) => (
                <span
                  key={str}
                  className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold text-[11px] border border-rose-100"
                >
                  {str}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Most Harmonious Matches
            </span>
            <div className="flex flex-wrap gap-1.5">
              {result.sunSign.bestMatches.map((match) => (
                <span
                  key={match}
                  className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold text-[11px] border border-purple-100"
                >
                  {match}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Note info */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
          {result.note}
        </div>

        {/* Notice alert */}
        {notice && (
          <div className="mt-4 p-3 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between">
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
        <div className="mt-6 pt-4 border-t border-rose-100 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Details'}</span>
          </button>

          <a
            href="/kundali-matching/"
            onClick={(e) => { e.preventDefault(); onNavigate('/kundali-matching/'); }}
            className="py-3 px-4 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Match 36 Gunas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={onReset}
            className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center gap-1.5"
            title="Find another sign"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
