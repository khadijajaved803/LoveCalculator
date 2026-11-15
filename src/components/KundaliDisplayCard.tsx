import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  Share2,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Compass,
  Star,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Briefcase,
  Heart,
  Eye,
} from 'lucide-react';
import { KundaliReport } from '../lib/kundaliChartEngine';
import { KundaliVedicDiagram } from './KundaliVedicDiagram';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface KundaliDisplayCardProps {
  report: KundaliReport;
  onReset: () => void;
  onNavigate: (path: string) => void;
}

export const KundaliDisplayCard: React.FC<KundaliDisplayCardProps> = ({
  report,
  onReset,
  onNavigate,
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'d1' | 'd9'>('d1');
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const websiteUrl = 'https://calculatelove.online';

  const handleCopySummary = async () => {
    const text =
      `🕉️ Janam Kundali for ${report.user.name}\n` +
      `⭐ Lagna: ${report.lagna.rashiName} (${report.lagna.rashiLord})\n` +
      `🌙 Moon: ${report.moon.nakshatra} · ${report.moon.rashiName}\n` +
      `✨ Key Yogas: ${report.yogas.map((y) => y.name).join(', ')}\n` +
      `🔗 Free Kundali Report: ${websiteUrl}/kundali/`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setNotice('Kundali summary copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setNotice('Could not copy to clipboard.');
    }
  };

  const handlePrintOrSave = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Badge & Profile Summary Card */}
      <div className="rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-orange-50/60 border border-amber-200/90 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-rose-400/15 blur-3xl pointer-events-none" />

        {/* Card Top Branding */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-100">
          <CalculateLoveLogo size={28} showWordmark={true} />
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            Janam Kundali Report
          </span>
        </div>

        {/* Profile Details Title */}
        <div className="text-center py-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Vedic Birth Chart
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            {report.user.name}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {report.accuracyNote}
          </p>

          {/* Core Astro Pillars Pills */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {/* Lagna (Ascendant) */}
            <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Lagna (Ascendant)
              </span>
              <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>{report.lagna.rashiName}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Lord: <span className="font-semibold text-slate-700">{report.lagna.rashiLord}</span> · {report.lagna.element}
              </div>
            </div>

            {/* Moon Sign (Rashi) */}
            <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Moon Sign (Janma Rashi)
              </span>
              <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-rose-600" />
                <span>{report.moon.rashiName}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Lord: <span className="font-semibold text-slate-700">{report.moon.rashiLord}</span>
              </div>
            </div>

            {/* Nakshatra (Birth Star) */}
            <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Nakshatra &amp; Pada
              </span>
              <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>{report.moon.nakshatra}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Pada {report.moon.nakshatraPada} · Vedic Moon Star
              </div>
            </div>
          </div>
        </div>

        {/* Chart View Toggle Tabs (D-1 Lagna vs D-9 Navamsa) */}
        <div className="mt-4 pt-6 border-t border-amber-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Birth Chart Diagram (Chakra)
            </h3>
            <div className="flex p-0.5 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveChartTab('d1')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeChartTab === 'd1'
                    ? 'bg-white text-rose-700 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lagna Chart (D-1)
              </button>
              <button
                type="button"
                onClick={() => setActiveChartTab('d9')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeChartTab === 'd9'
                    ? 'bg-white text-rose-700 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Navamsa Chart (D-9)
              </button>
            </div>
          </div>

          {/* Vedic Chart Canvas */}
          <div className="py-2">
            {activeChartTab === 'd1' ? (
              <KundaliVedicDiagram
                houses={report.houses}
                title="Lagna Kundali Chart (D-1 Rashi)"
              />
            ) : (
              <KundaliVedicDiagram
                houses={report.navamsaHouses}
                title="Navamsa Kundali Chart (D-9 Marriage & Soul Path)"
              />
            )}
          </div>
        </div>

        {/* Planetary Positions Table (Graha Sthiti) */}
        <div className="mt-8 pt-6 border-t border-amber-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Planetary Positions (9 Grahas)
            </h3>
            <span className="text-[11px] text-slate-500 font-semibold">
              Vedic Nirayana Ephemeris
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Planet</th>
                  <th className="py-2.5 px-3">Sign (Rashi)</th>
                  <th className="py-2.5 px-3 text-center">House</th>
                  <th className="py-2.5 px-3">Nakshatra</th>
                  <th className="py-2.5 px-3 text-right">Degree</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {report.planets.map((p) => (
                  <tr key={p.name} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {p.name}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {p.hindiName} ({p.symbol}) {p.isRetrograde ? '· [R]' : ''}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-[11px] font-semibold text-slate-700">
                      {p.rashi}
                    </td>
                    <td className="py-2 px-3 text-center font-bold text-rose-700 whitespace-nowrap">
                      House {p.house}
                    </td>
                    <td className="py-2 px-3 text-[11px] text-slate-600">
                      {p.nakshatra}
                    </td>
                    <td className="py-2 px-3 text-right text-[11px] font-mono text-slate-500">
                      {p.degree}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Yogas Detected */}
        <div className="mt-8 pt-6 border-t border-amber-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Yogas in Your Kundali</span>
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {report.yogas.length} Yogas Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {report.yogas.map((yoga) => (
              <div
                key={yoga.name}
                className={`p-3.5 rounded-2xl border ${
                  yoga.type === 'Auspicious'
                    ? 'bg-emerald-50/70 border-emerald-200/90 text-emerald-950'
                    : yoga.type === 'Challenging'
                    ? 'bg-amber-50/80 border-amber-200/90 text-amber-950'
                    : 'bg-indigo-50/70 border-indigo-200/90 text-indigo-950'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-sm">{yoga.name}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      yoga.type === 'Auspicious'
                        ? 'bg-emerald-200/70 text-emerald-900'
                        : 'bg-amber-200/70 text-amber-900'
                    }`}
                  >
                    {yoga.type}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-700 mb-1">
                  {yoga.description}
                </p>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {yoga.effects}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dosha Analysis Section */}
        <div className="mt-8 pt-6 border-t border-amber-100">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Dosha Analysis (Manglik &amp; Kaal Sarp)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Manglik */}
            <div
              className={`p-3.5 rounded-2xl border ${
                report.doshas.manglik.hasDosha
                  ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {report.doshas.manglik.hasDosha ? (
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span className="font-bold text-sm">
                  Manglik Status:{' '}
                  <span className="font-black">
                    {report.doshas.manglik.hasDosha ? `${report.doshas.manglik.intensity} Attention` : 'Clean'}
                  </span>
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                {report.doshas.manglik.description}
              </p>
            </div>

            {/* Kaal Sarp */}
            <div
              className={`p-3.5 rounded-2xl border ${
                report.doshas.kaalSarp.hasDosha
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {report.doshas.kaalSarp.hasDosha ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span className="font-bold text-sm">
                  Kaal Sarp Yoga:{' '}
                  <span className="font-black">
                    {report.doshas.kaalSarp.hasDosha ? 'Active' : 'Not Present'}
                  </span>
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                {report.doshas.kaalSarp.description}
              </p>
            </div>
          </div>
        </div>

        {/* Plain-Language Interpretations (Career, Marriage, General Future) */}
        <div className="mt-8 pt-6 border-t border-amber-100 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-rose-600" />
            <span>Kundali Predictions &amp; Life Guidance</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            {/* Career */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Career &amp; Professional Path (10th House)</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                {report.predictions.career}
              </p>
            </div>

            {/* Marriage */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>Marriage, Romance &amp; Spouse (7th House)</span>
                </div>
                <a
                  href="/kundali-matching/"
                  onClick={(e) => { e.preventDefault(); onNavigate('/kundali-matching/'); }}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                >
                  <span>Match Kundali (36 Gunas)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                {report.predictions.marriage}
              </p>
            </div>

            {/* General Future */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-600" />
                <span>Destiny, Longevity &amp; General Future</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                {report.predictions.generalFuture}
              </p>
            </div>
          </div>
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

        {/* Action Controls */}
        <div className="mt-8 pt-6 border-t border-amber-100 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleCopySummary}
            className="flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Kundali' : 'Copy Summary'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrintOrSave}
            className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center gap-1.5"
            title="Print or Save PDF report"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Print / Save Report</span>
          </button>

          <a
            href="/kundali-matching/"
            onClick={(e) => { e.preventDefault(); onNavigate('/kundali-matching/'); }}
            className="py-3 px-4 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-all flex items-center justify-center gap-1.5"
          >
            <Heart className="w-4 h-4 text-rose-600" />
            <span>Kundali Matching</span>
          </a>

          <button
            type="button"
            onClick={onReset}
            className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center gap-1.5"
            title="Create another Kundali"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
