import React, { useState, useEffect, useMemo } from 'react';
import { Heart, Flame, Users, Gem, Sparkles, Wand2 } from 'lucide-react';
import { CalculateLoveLogo } from './CalculateLoveLogo';

export type CalculatorType = 'love' | 'flames' | 'friendship' | 'marriage' | 'dob';

interface CalculationLoaderProps {
  name1: string;
  name2: string;
  type?: CalculatorType;
  onComplete: () => void;
  minDuration?: number;
  maxDuration?: number;
}

const PHRASES: Record<CalculatorType, string[]> = {
  love: [
    'Scanning name harmonics & acoustic resonance...',
    'Decoding unspoken chemistry & emotional vibes...',
    'Measuring letter frequency & vowel balance...',
    'Matching heart frequencies between both souls...',
    'Evaluating communication depth & romantic passion...',
    'Calibrating longevity & shared couple connection...',
    'Almost ready! Generating your Compatibility Certificate...',
  ],
  flames: [
    'Crossing out common letters like classic school days...',
    'Counting remaining characters across both names...',
    'Cycling through Friends, Lovers, Affection, Marriage, Enemies...',
    'Simulating step-by-step circular countdown elimination...',
    'Testing nostalgic notebook chemistry & playful friction...',
    'Destiny unlocked! Revealing your final FLAMES letter...',
  ],
  friendship: [
    'Scanning bestie loyalty & secret-keeping quotient...',
    'Measuring chai tapri laughter & inside jokes index...',
    'Testing 3 AM emergency calls & unconditional support...',
    'Evaluating partner-in-crime chemistry & fun quotient...',
    'Calculating mutual trust & loyalty through thick and thin...',
    'Bestie meter calibrated! Preparing your friendship certificate...',
  ],
  marriage: [
    'Balancing romantic courtship with family blessing...',
    'Evaluating lifestyle priorities & communication harmony...',
    'Checking traditional alignment & mutual life goals...',
    'Testing shared future vision & household harmony...',
    'Calculating long-term matrimony readiness indicators...',
    'Shaadi alignment ready! Formulating your marriage certificate...',
  ],
  dob: [
    'Calculating Pythagorean Life Path numbers from birth dates...',
    'Analyzing cosmic elemental energies & planetary vibrations...',
    'Harmonizing destiny numbers & karmic life lessons...',
    'Evaluating solar-lunar synchronization & elemental blend...',
    'Synthesizing deep date-of-birth compatibility matrix...',
    'Cosmic connection aligned! Preparing your Life Path report...',
  ],
};

const THEMES: Record<
  CalculatorType,
  {
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    gradient: string;
    badgeBg: string;
    badgeText: string;
    title: string;
  }
> = {
  love: {
    icon: Heart,
    accentColor: 'text-rose-500',
    gradient: 'from-rose-500 via-pink-500 to-purple-500',
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-700',
    title: 'Calculating Romantic Resonance',
  },
  flames: {
    icon: Flame,
    accentColor: 'text-amber-500',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    badgeBg: 'bg-amber-50 border-amber-200',
    badgeText: 'text-amber-700',
    title: 'Unraveling FLAMES Nostalgia',
  },
  friendship: {
    icon: Users,
    accentColor: 'text-purple-500',
    gradient: 'from-purple-500 via-indigo-500 to-rose-500',
    badgeBg: 'bg-purple-50 border-purple-200',
    badgeText: 'text-purple-700',
    title: 'Testing Bestie Dynamics',
  },
  marriage: {
    icon: Gem,
    accentColor: 'text-purple-600',
    gradient: 'from-purple-600 via-rose-500 to-amber-500',
    badgeBg: 'bg-purple-50 border-purple-200',
    badgeText: 'text-purple-800',
    title: 'Evaluating Marriage Alignment',
  },
  dob: {
    icon: Sparkles,
    accentColor: 'text-indigo-500',
    gradient: 'from-indigo-500 via-purple-500 to-rose-500',
    badgeBg: 'bg-indigo-50 border-indigo-200',
    badgeText: 'text-indigo-700',
    title: 'Calculating Life Path Harmony',
  },
};

export const CalculationLoader: React.FC<CalculationLoaderProps> = ({
  name1,
  name2,
  type = 'love',
  onComplete,
  minDuration = 5000,
  maxDuration = 10000,
}) => {
  // Random duration between 5s and 10s (up to 10 seconds)
  const duration = useMemo(() => {
    return Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
  }, [minDuration, maxDuration]);

  const [progress, setProgress] = useState(0);

  const sentences = PHRASES[type] || PHRASES.love;
  const theme = THEMES[type] || THEMES.love;
  const IconComponent = theme.icon;

  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawPct);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Small gentle pause at 100% before transition
        setTimeout(() => {
          onComplete();
        }, 250);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration, onComplete]);

  // Determine current active sentence index based on progress (0% - 100%)
  const sentenceIndex = Math.min(
    sentences.length - 1,
    Math.floor((progress / 100) * sentences.length)
  );
  const activeSentence = sentences[sentenceIndex];

  return (
    <div className="w-full bg-white rounded-3xl border border-rose-200/80 shadow-xl p-6 sm:p-10 text-center relative overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95">
      {/* Top Animated Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-purple-500 to-amber-400 animate-pulse" />

      {/* Subtle Background Glow Spheres */}
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-rose-200/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-purple-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Header Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold mb-6 shadow-2xs animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        <span className="text-slate-700">{theme.title}</span>
      </div>

      {/* Names Display */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
        <span className="text-base sm:text-lg font-bold text-slate-800 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
          {name1 || 'Partner 1'}
        </span>

        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 border border-rose-200">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-ping absolute opacity-50" />
          <Heart className="w-4 h-4 text-rose-600 fill-rose-500 relative" />
        </div>

        <span className="text-base sm:text-lg font-bold text-slate-800 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
          {name2 || 'Partner 2'}
        </span>
      </div>

      {/* Pulsing Visual Centerpiece */}
      <div className="relative my-7 flex items-center justify-center">
        {/* Outer glowing pulsing halo */}
        <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-rose-400/20 via-purple-400/20 to-amber-400/20 animate-ping opacity-60" />
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-50 to-purple-50 border-2 border-rose-200 shadow-md flex items-center justify-center relative">
          <div className="w-16 h-16 rounded-full bg-white shadow-inner flex items-center justify-center">
            <IconComponent className={`w-8 h-8 ${theme.accentColor} animate-bounce`} />
          </div>
          {/* Orbiting Sparkle */}
          <div className="absolute top-1 right-2">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
          </div>
        </div>
      </div>

      {/* Dynamic Animated Status Sentences */}
      <div className="min-h-[48px] flex items-center justify-center mb-6 px-4">
        <p
          key={sentenceIndex}
          className="text-sm sm:text-base font-semibold text-slate-800 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 leading-relaxed max-w-lg"
        >
          {activeSentence}
        </p>
      </div>

      {/* Smooth Filling Progress Bar */}
      <div className="max-w-md mx-auto mb-3">
        <div className="flex justify-between items-center text-xs text-slate-500 font-semibold mb-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Analyzing compatibility matrix</span>
          </span>
          <span className="font-mono text-rose-600 font-bold tabular-nums text-sm">
            {progress}%
          </span>
        </div>

        <div className="w-full h-3.5 rounded-full bg-slate-100 p-0.5 border border-slate-200/80 overflow-hidden shadow-inner">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-100 ease-out shadow-xs`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Gentle Reassuring Note */}
      <p className="text-[11px] text-slate-400 mt-4 flex items-center justify-center gap-1.5">
        <Wand2 className="w-3.5 h-3.5 text-purple-400" />
        <span>Synthesizing authentic, deterministic alignment... Please wait</span>
      </p>
    </div>
  );
};
