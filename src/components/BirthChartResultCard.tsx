import React, { useState } from 'react';
import { BirthChartResult } from '../lib/birthChartEngine';
import { BirthChartVisualizer } from './BirthChartVisualizer';
import {
  Sun,
  Moon,
  Compass,
  Star,
  Award,
  BookOpen,
  Layers,
  Heart,
  Briefcase,
  Sparkles,
  Calendar,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

interface Props {
  result: BirthChartResult;
  onNavigate: (path: string) => void;
}

export const BirthChartResultCard: React.FC<Props> = ({ result, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'planets' | 'houses' | 'divisions'>('overview');
  const isTimeProvided = result.mode === 'full';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ─── 1. Top Card: The Big Three ─── */}
      <div className="rounded-3xl bg-white border border-indigo-100 shadow-xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600" />

        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Vedic &amp; Natal Astrological Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            {result.user.name}&apos;s Birth Chart
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Born: {result.user.dob} • Time: {result.user.birthTime} • Location: {result.user.birthPlace}
          </p>
        </div>

        {/* The Big Three Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Sun Sign */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-white border border-amber-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-600" />
                Sun Sign (Surya)
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-900">
                {result.bigThree.sun.degree}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {result.bigThree.sun.sign}
            </div>
            <div className="text-xs font-semibold text-amber-700 mt-0.5">
              Rashi: {result.bigThree.sun.rashi} • {result.bigThree.sun.element}
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {result.bigThree.sun.interpretation}
            </p>
          </div>

          {/* Moon Sign */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-sky-50/80 via-indigo-50/40 to-white border border-sky-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-sky-600" />
                Moon Sign (Rashi)
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-100/80 text-sky-900">
                {result.bigThree.moon.degree}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {result.bigThree.moon.sign}
            </div>
            <div className="text-xs font-semibold text-sky-700 mt-0.5">
              Star: {result.bigThree.moon.nakshatra}
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {result.bigThree.moon.interpretation}
            </p>
          </div>

          {/* Ascendant / Rising Sign */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-rose-50/80 via-purple-50/40 to-white border border-rose-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-rose-600" />
                Rising Sign (Lagna)
              </span>
              {result.bigThree.rising.isAvailable && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-100/80 text-rose-900">
                  {result.bigThree.rising.degree}
                </span>
              )}
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {result.bigThree.rising.sign}
            </div>
            <div className="text-xs font-semibold text-rose-700 mt-0.5">
              {result.bigThree.rising.isAvailable
                ? `Ruler: ${result.bigThree.rising.lord} • House 1`
                : 'Approximate Mode'}
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {result.bigThree.rising.interpretation}
            </p>
          </div>
        </div>

        {/* Strongest Planet Badge */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900">
                Leading Graha (Shadbala Leader): {result.strongestPlanet.name} ({result.strongestPlanet.hindiName})
              </span>
              <p className="text-slate-500 text-[11px]">
                Delivering {result.strongestPlanet.shadbala.rupas} Rupas ({result.strongestPlanet.shadbala.percentage}% power) — {result.strongestPlanet.shadbala.status}.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px] whitespace-nowrap">
            Prime Cosmic Strength
          </span>
        </div>
      </div>

      {/* ─── 2. Interactive Chart Visualizer ─── */}
      <BirthChartVisualizer
        houses={result.houses}
        d9Houses={result.d9Houses}
        d10Houses={result.d10Houses}
        planets={result.planets}
        isTimeProvided={isTimeProvided}
      />

      {/* ─── 3. Detailed Tabs (Planets, Houses, Divisional, Analysis) ─── */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-5 transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Chart Interpretation</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('planets')}
            className={`py-3.5 px-5 transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'planets'
                ? 'border-indigo-600 text-indigo-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Planetary Positions &amp; Shadbala</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('houses')}
            className={`py-3.5 px-5 transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'houses'
                ? 'border-indigo-600 text-indigo-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>12 Houses Chart</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('divisions')}
            className={`py-3.5 px-5 transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'divisions'
                ? 'border-indigo-600 text-indigo-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Divisional Charts (D1 to D60)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: Interpretive Analysis */}
          {activeTab === 'overview' && (
            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Core Identity &amp; Elemental Balance
                </h3>
                <p>{result.analysis.coreIdentity}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-100">
                  <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-amber-600" />
                    Career, Authority &amp; D10 Dasamsa
                  </h3>
                  <p>{result.analysis.careerAndStatus}</p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100">
                  <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    Love, Marriage &amp; D9 Navamsa
                  </h3>
                  <p>{result.analysis.loveAndMarriage}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Spiritual Evolution &amp; 12-Month Outlook
                </h3>
                <p className="mb-2">{result.analysis.spiritualGrowth}</p>
                <p className="font-medium text-slate-800">{result.analysis.yearlyPrediction}</p>
              </div>
            </div>
          )}

          {/* TAB 2: Planetary Positions & Shadbala Table */}
          {activeTab === 'planets' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Planet</th>
                    <th className="py-3 px-3">Sign (Rashi)</th>
                    <th className="py-3 px-3">House</th>
                    <th className="py-3 px-3">Degree</th>
                    <th className="py-3 px-3">Nakshatra</th>
                    <th className="py-3 px-3">Shadbala</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {result.planets.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-slate-900 flex items-center gap-1.5">
                        <span className="text-base">{p.symbol}</span>
                        <span>{p.name}</span>
                        {p.isRetrograde && (
                          <span className="text-[10px] px-1 py-0.2 rounded bg-rose-100 text-rose-700 font-bold">
                            [R]
                          </span>
                        )}
                        {p.isPushkarNavamsa && (
                          <span className="text-[10px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-bold" title="Pushkar Navamsa Degree">
                            [P]
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-medium">{p.signName}</span>{' '}
                        <span className="text-slate-400 text-xs">({p.rashiName})</span>
                      </td>
                      <td className="py-2.5 px-3 font-bold text-indigo-700">
                        {isTimeProvided ? `H${p.house}` : '—'}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-xs">{p.formattedDegree}</td>
                      <td className="py-2.5 px-3">
                        {p.nakshatra}{' '}
                        <span className="text-slate-400 text-xs">(P{p.nakshatraPada})</span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold">
                        {p.shadbala.rupas} <span className="text-slate-400 text-xs font-normal">rupas</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.shadbala.status === 'Exceptionally Strong'
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.shadbala.status === 'Strong'
                              ? 'bg-blue-100 text-blue-800'
                              : p.shadbala.status === 'Needs Attention'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {p.shadbala.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[11px] text-slate-400 mt-3">
                * Note: [R] denotes Retrograde motion; [P] marks auspicious Pushkar Navamsa degrees.
              </p>
            </div>
          )}

          {/* TAB 3: 12 Houses Chart Table */}
          {activeTab === 'houses' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">House</th>
                    <th className="py-3 px-3">Sign</th>
                    <th className="py-3 px-3">Ruler</th>
                    <th className="py-3 px-4">Governs &amp; Signification</th>
                    <th className="py-3 px-3">Occupants</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {result.houses.map((h) => (
                    <tr key={h.houseNumber} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-indigo-700">
                        House {h.houseNumber}
                      </td>
                      <td className="py-2.5 px-3 font-medium">
                        {h.signName} <span className="text-slate-400 text-xs">({h.rashiName})</span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold">{h.lord}</td>
                      <td className="py-2.5 px-4 text-xs sm:text-sm text-slate-600">
                        {h.significance}
                      </td>
                      <td className="py-2.5 px-3">
                        {h.planets.length > 0 ? (
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            {h.planets.join(', ')}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: Divisional Charts D1 to D60 */}
          {activeTab === 'divisions' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 mb-2">
                In Vedic Shodashvarga astrology, divisional charts provide microscope-level precision into specific life arenas.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {result.divisionalSummaries.map((div) => (
                  <div
                    key={div.division}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                        {div.division}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{div.name}</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-1.5 font-medium">
                      {div.significance}
                    </p>
                    <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span>Ruler: <strong>{div.keyPlanet}</strong></span>
                      <span className="text-indigo-600 font-semibold">{div.highlights}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
