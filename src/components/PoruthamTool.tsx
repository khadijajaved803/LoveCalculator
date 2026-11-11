import React, { useState } from 'react';
import {
  calculateThirumanaPorutham,
  findStarFromInput,
  TAMIL_NAKSHATRAS,
  PoruthamResult,
} from '../lib/poruthamEngine';
import { PoruthamResultCard } from './PoruthamResultCard';
import { CalculationLoader } from './CalculationLoader';
import {
  Sparkles,
  Calendar,
  Star,
  User,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export type PoruthamMatchMode = 'dob' | 'star' | 'name';

export const PoruthamTool: React.FC = () => {
  const [mode, setMode] = useState<PoruthamMatchMode>('dob');

  // Inputs
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');

  // Mode: DOB
  const [brideDob, setBrideDob] = useState('');
  const [groomDob, setGroomDob] = useState('');
  const [brideTime, setBrideTime] = useState('');
  const [groomTime, setGroomTime] = useState('');

  // Mode: Star
  const [brideStarId, setBrideStarId] = useState<number>(1);
  const [groomStarId, setGroomStarId] = useState<number>(1);

  // States
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<PoruthamResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'dob') {
      if (!brideDob || !groomDob) {
        setError('Please select Date of Birth for both Bride and Groom.');
        return;
      }
    } else if (mode === 'name') {
      if (!brideName.trim() || !groomName.trim()) {
        setError('Please enter names for both Bride and Groom for Peyar Porutham.');
        return;
      }
    }

    setIsCalculating(true);
  };

  const handleLoaderComplete = () => {
    setIsCalculating(false);

    let bStarId = brideStarId;
    let gStarId = groomStarId;

    if (mode === 'dob') {
      bStarId = findStarFromInput('dob', undefined, brideDob);
      gStarId = findStarFromInput('dob', undefined, groomDob);
    } else if (mode === 'name') {
      bStarId = findStarFromInput('name', undefined, undefined, brideName);
      gStarId = findStarFromInput('name', undefined, undefined, groomName);
    }

    const res = calculateThirumanaPorutham(
      brideName || 'Bride',
      groomName || 'Groom',
      bStarId,
      gStarId
    );
    setResult(res);
  };

  const handleRetake = () => {
    setResult(null);
  };

  return (
    <div className="w-full">
      {/* ─── Calculating Loader ─── */}
      {isCalculating && (
        <CalculationLoader
          name1={brideName || 'Bride'}
          name2={groomName || 'Groom'}
          type="love"
          minDuration={1600}
          maxDuration={2200}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* ─── Result View ─── */}
      {!isCalculating && result && (
        <PoruthamResultCard result={result} onRetake={handleRetake} />
      )}

      {/* ─── Calculator Form ─── */}
      {!isCalculating && !result && (
        <div className="bg-white rounded-3xl shadow-xl border border-amber-200/80 overflow-hidden">
          {/* Top Decorative Header */}
          <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-orange-600 p-6 sm:p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
                <span>Tamil Jathagam Porutham · 100% Free Results</span>
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display mb-2">
                Thirumana Porutham
              </h2>

              <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-medium">
                Free thirumana porutham check — by date of birth, star or name. No sign-up.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8 max-w-2xl mx-auto">
            {/* Mode Switcher Tabs */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Select Matching Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setMode('dob'); setError(''); }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    mode === 'dob'
                      ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-xs font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Calendar className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                  <span className="text-xs block font-semibold">By Date of Birth</span>
                  <span className="text-[10px] text-slate-400">Full Standard</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMode('star'); setError(''); }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    mode === 'star'
                      ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-xs font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Star className="w-4 h-4 mx-auto mb-1 text-rose-500" />
                  <span className="text-xs block font-semibold">By Birth Star</span>
                  <span className="text-[10px] text-slate-400">Natchathiram</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMode('name'); setError(''); }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    mode === 'name'
                      ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-xs font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <User className="w-4 h-4 mx-auto mb-1 text-orange-500" />
                  <span className="text-xs block font-semibold">By Name</span>
                  <span className="text-[10px] text-slate-400">Peyar Porutham</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCalculate} className="space-y-6">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Bride & Groom Two-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ── Bride Column ── */}
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider pb-1 border-b border-rose-100">
                    <User className="w-3.5 h-3.5 text-rose-600" />
                    <span>Bride's Details (பெண்)</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bride's Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya or Soundarya"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden text-sm transition-all"
                    />
                  </div>

                  {mode === 'dob' && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={brideDob}
                          onChange={(e) => setBrideDob(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Birth Time (Optional)
                        </label>
                        <input
                          type="time"
                          value={brideTime}
                          onChange={(e) => setBrideTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden text-sm transition-all"
                        />
                      </div>
                    </>
                  )}

                  {mode === 'star' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Birth Star (Natchathiram)
                      </label>
                      <select
                        value={brideStarId}
                        onChange={(e) => setBrideStarId(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden text-xs sm:text-sm transition-all bg-white"
                      >
                        {TAMIL_NAKSHATRAS.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.tamilName} — {s.rasiTamilName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* ── Groom Column ── */}
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider pb-1 border-b border-amber-100">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    <span>Groom's Details (மாப்பிள்ளை)</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Groom's Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Karthik or Vignesh"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden text-sm transition-all"
                    />
                  </div>

                  {mode === 'dob' && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={groomDob}
                          onChange={(e) => setGroomDob(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Birth Time (Optional)
                        </label>
                        <input
                          type="time"
                          value={groomTime}
                          onChange={(e) => setGroomTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden text-sm transition-all"
                        />
                      </div>
                    </>
                  )}

                  {mode === 'star' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Birth Star (Natchathiram)
                      </label>
                      <select
                        value={groomStarId}
                        onChange={(e) => setGroomStarId(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden text-xs sm:text-sm transition-all bg-white"
                      >
                        {TAMIL_NAKSHATRAS.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.tamilName} — {s.rasiTamilName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Informative Checklist */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span><strong>Full 10 Poruthams:</strong> Dina, Gana, Mahendra, Sthree Deergha, Yoni, Rasi, Rasi Adhipathi, Vasya, Rajju, Vedha.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span><strong>Non-Negotiable Verification:</strong> Automatic Rajju & Vedha dosha alert flags.</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl text-center text-sm sm:text-base font-bold text-white bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 hover:from-amber-700 hover:to-rose-700 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 min-h-[52px]"
              >
                <span>Check Thirumana Porutham</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
