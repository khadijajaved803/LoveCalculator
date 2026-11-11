import React, { useState } from 'react';
import {
  generateBirthChart,
  BirthChartMode,
  BirthChartResult,
} from '../lib/birthChartEngine';
import { BirthChartResultCard } from './BirthChartResultCard';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Sparkles,
  Compass,
  ArrowRight,
  Info,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const BirthChartTool: React.FC<Props> = ({ onNavigate }) => {
  const [mode, setMode] = useState<BirthChartMode>('full');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('1998-05-15');
  const [birthTime, setBirthTime] = useState('14:30');
  const [birthPlace, setBirthPlace] = useState('New Delhi, India');

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<BirthChartResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!dob) {
      setError('Please select your date of birth.');
      return;
    }

    setIsCalculating(true);
    setTimeout(() => {
      const generated = generateBirthChart({
        name: name.trim() || 'Seeker',
        dob,
        birthTime: mode === 'full' ? birthTime : undefined,
        birthPlace: mode === 'full' ? birthPlace : undefined,
        mode,
      });

      setResult(generated);
      setIsCalculating(false);

      // Smooth scroll down to result
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="w-full">
      {/* ─── Tool Input Card ─── */}
      <div className="rounded-3xl bg-white border border-indigo-100 shadow-xl p-6 sm:p-8 mb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600" />

        {/* Copy on the tool card */}
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50/80 inline-block px-4 py-1.5 rounded-full border border-indigo-100">
            Free birth chart calculator — by date of birth and time. No sign-up.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex p-1 bg-slate-100/90 rounded-2xl mb-6 max-w-md mx-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('full');
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              mode === 'full'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Full Chart (Date + Time + Place)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('date-only');
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              mode === 'date-only'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Date of Birth Only
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleCalculate} className="space-y-4 max-w-xl mx-auto">
          {/* Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Your Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Priya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              Date of Birth <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            />
          </div>

          {/* Full Mode Optional Fields: Time & Place */}
          {mode === 'full' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Birth Time */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  Time of Birth (Optional)
                </label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                />
              </div>

              {/* Birth Place */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  Place of Birth (City, Country)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai, India"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <p>
                <strong>Date-Only Mode:</strong> Time of birth is optional. Without the time the tool still makes the chart, calculates your sun sign, moon sign, and planetary positions, but without the ascendant and without the houses.
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Calculate Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Compass className="w-4 h-4" />
              <span>Generate Free Birth Chart &amp; Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Loader */}
      {isCalculating && (
        <div className="rounded-3xl bg-white border border-indigo-100 shadow-xl p-8 mb-10 text-center animate-pulse">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4 animate-spin">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display mb-1">
            Calculating Birth Chart &amp; Divisional Harmonics...
          </h3>
          <p className="text-xs text-slate-500">
            Mapping Ascendant (Lagna), planetary degrees, Navamsa (D9), and Shadbala strengths.
          </p>
        </div>
      )}

      {/* Result Display */}
      {result && !isCalculating && (
        <BirthChartResultCard result={result} onNavigate={onNavigate} />
      )}
    </div>
  );
};
