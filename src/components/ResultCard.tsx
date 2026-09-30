import React from 'react';
import { Share2, RotateCcw, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { CompatibilityResult } from '../types';

interface ResultCardProps {
  result: CompatibilityResult;
  onReset: () => void;
  onShare: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset, onShare }) => {
  return (
    <div className="bg-white rounded-3xl border border-rose-200/90 shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Names & Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>Compatibility Analysis</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
          {result.names.person1} & {result.names.person2}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {result.verdict} · {result.grade}
        </p>
      </div>

      {/* Main Score Hero */}
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50/70 to-white rounded-2xl border border-rose-100 mb-6">
        <div className="relative flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#fee2e2"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#e11d48"
              strokeWidth="10"
              strokeDasharray={377}
              strokeDashoffset={377 - (377 * result.score) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-slate-900 font-display tabular-nums">
              {result.score}%
            </span>
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
              Match Score
            </span>
          </div>
        </div>

        <p className="text-xs text-center text-slate-600 max-w-md mt-4 leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Metric Breakdown Bars */}
      <div className="space-y-3.5 mb-6">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Compatibility Dimensions
        </h4>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Communication & Humor</span>
            <span className="font-semibold text-slate-900 tabular-nums">
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
            <span className="font-semibold text-slate-900 tabular-nums">
              {result.breakdown.emotionalHarmony}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-700"
              style={{ width: `${result.breakdown.emotionalHarmony}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Passion & Chemistry</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {result.breakdown.passion}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-700"
              style={{ width: `${result.breakdown.passion}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Long-term Companionship</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {result.breakdown.longevity}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-700"
              style={{ width: `${result.breakdown.longevity}%` }}
            />
          </div>
        </div>
      </div>

      {/* Relationship Insight Advice */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 mb-6 text-xs text-amber-900">
        <p className="font-semibold mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Relationship Reflection:</span>
        </p>
        <p className="leading-relaxed text-amber-800">
          {result.advice}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onShare}
          className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Result</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Calculate Another</span>
        </button>
      </div>

      {/* Honest Disclaimer */}
      <p className="text-[11px] text-center text-slate-400 mt-5 leading-normal">
        Results are generated deterministically for fun and entertainment. True bonds are built on mutual respect and care.
      </p>
    </div>
  );
};
