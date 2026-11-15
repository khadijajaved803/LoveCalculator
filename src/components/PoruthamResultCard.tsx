import React, { useState } from 'react';
import { PoruthamResult } from '../lib/poruthamEngine';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Printer,
  Download,
  Copy,
  Check,
  RotateCcw,
  Heart,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface PoruthamResultCardProps {
  result: PoruthamResult;
  onRetake: () => void;
}

export const PoruthamResultCard: React.FC<PoruthamResultCardProps> = ({ result, onRetake }) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const blob = await generateCardImageBlob({
        type: 'porutham',
        names: {
          person1: result.bride.name,
          person2: result.groom.name,
        },
        score: result.matchedCount,
        maxScore: 10,
        tagline: `${result.matchedCount}/10 Poruthams Matched · ${result.verdictBand}`,
        suggestion: result.verdictDescription,
        tip: result.rajjuPassed && result.vedhaPassed
          ? '✓ Both Rajju & Vedha Poruthams Cleared'
          : '⚠ Alert: Critical Must-Pass Porutham Requires Review',
        details: `Bride: ${result.bride.star.tamilName} · Groom: ${result.groom.star.tamilName}`,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Thirumana-Porutham-${result.bride.name.replace(/\s+/g, '-')}-${result.groom.name.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setNotice('Shareable Porutham card downloaded!');
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
      const summaryText = `Tamil Thirumana Porutham Result for ${result.bride.name} & ${result.groom.name}:\n` +
        `• Bride Star: ${result.bride.star.tamilName} (${result.bride.star.rasiTamilName})\n` +
        `• Groom Star: ${result.groom.star.tamilName} (${result.groom.star.rasiTamilName})\n` +
        `• Total Score: ${result.matchedCount} / 10 Poruthams Matched\n` +
        `• Rajju Porutham: ${result.rajjuPassed ? 'PASSED ✓' : 'FAILED ✗ (Rajju Dosha)'}\n` +
        `• Vedha Porutham: ${result.vedhaPassed ? 'PASSED ✓' : 'FAILED ✗ (Vedha Dosha)'}\n` +
        `• Final Verdict: ${result.verdictBand} (${result.verdictTamil})\n` +
        `Check free online at: https://calculatelove.online/porutham/`;
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setNotice('Porutham report copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setNotice(null);
      }, 3000);
    } catch {
      setNotice('Failed to copy. Please select and copy manually.');
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const getBadgeStyle = () => {
    switch (result.verdictBand) {
      case 'Excellent':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Good':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'Acceptable':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'Not Recommended':
      default:
        return 'bg-rose-50 text-rose-800 border-rose-300';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-amber-200/80 overflow-hidden printable-result-card animate-in fade-in duration-300">
      {notice && (
        <div className="bg-slate-900 text-white text-xs font-semibold py-2 px-4 text-center sticky top-0 z-20 animate-in fade-in duration-200">
          {notice}
        </div>
      )}

      {/* Decorative Top Accent Bar */}
      <div className="h-2.5 bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500" />

      <div className="p-5 sm:p-8">
        {/* Printable-only header */}
        <div className="hidden print:flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-2">
            <CalculateLoveLogo size={32} showWordmark={true} />
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-amber-700 block">calculatelove.online/porutham/</span>
            <span className="text-[10px] text-slate-400">Official Tamil Thirumana Porutham Report (10 Poruthams)</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Tamil Marriage Matching · 10 Poruthams</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mb-1">
            {result.bride.name} &amp; {result.groom.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Jathagam Porutham calculated from birth stars and rasis according to Tamil Jothidam rules.
          </p>
        </div>

        {/* Top Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Bride Card */}
          <div className="bg-gradient-to-br from-rose-50/70 to-pink-50/50 p-4 sm:p-5 rounded-2xl border border-rose-200 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-600 tracking-wider block mb-1">
              Bride (பெண்)
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {result.bride.name}
            </h4>
            <div className="mt-2 text-xs text-slate-700 space-y-1">
              <div><strong>Star:</strong> {result.bride.star.tamilName}</div>
              <div><strong>Rasi:</strong> {result.bride.star.rasiTamilName}</div>
              <div><strong>Gana:</strong> {result.bride.star.gana} · <strong>Yoni:</strong> {result.bride.star.yoniAnimal}</div>
              <div className="text-[11px] text-amber-800 bg-amber-100/60 rounded-md py-0.5 mt-1 font-medium">
                {result.bride.star.rajjuTamil}
              </div>
            </div>
          </div>

          {/* Central Verdict Score Badge */}
          <div className={`p-5 rounded-2xl border-2 flex flex-col items-center justify-center text-center shadow-xs ${getBadgeStyle()}`}>
            <span className="text-[11px] font-extrabold uppercase tracking-wider block mb-0.5">
              Porutham Score
            </span>
            <div className="text-4xl sm:text-5xl font-black font-display tracking-tight my-1">
              {result.matchedCount} <span className="text-xl sm:text-2xl font-bold opacity-80">/ 10</span>
            </div>
            <span className="text-xs sm:text-sm font-bold block">
              {result.verdictTamil}
            </span>
            <span className="text-[11px] font-semibold opacity-90 mt-0.5">
              {result.verdictBand} Rating
            </span>
          </div>

          {/* Groom Card */}
          <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 p-4 sm:p-5 rounded-2xl border border-amber-200 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block mb-1">
              Groom (மாப்பிள்ளை)
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {result.groom.name}
            </h4>
            <div className="mt-2 text-xs text-slate-700 space-y-1">
              <div><strong>Star:</strong> {result.groom.star.tamilName}</div>
              <div><strong>Rasi:</strong> {result.groom.star.rasiTamilName}</div>
              <div><strong>Gana:</strong> {result.groom.star.gana} · <strong>Yoni:</strong> {result.groom.star.yoniAnimal}</div>
              <div className="text-[11px] text-amber-800 bg-amber-100/60 rounded-md py-0.5 mt-1 font-medium">
                {result.groom.star.rajjuTamil}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Non-Negotiable Must-Pass Flags (Rajju & Vedha) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Rajju Status Box */}
          <div className={`p-4 rounded-2xl border-2 flex items-start gap-3 ${
            result.rajjuPassed
              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            {result.rajjuPassed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">Rajju Porutham (Must Pass)</span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  result.rajjuPassed ? 'bg-emerald-200/80 text-emerald-900' : 'bg-rose-200/80 text-rose-900'
                }`}>
                  {result.rajjuPassed ? 'PASSED' : 'RAJJU DOSHA'}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {result.poruthams.find((p) => p.id === 9)?.scoreDescription}
              </p>
            </div>
          </div>

          {/* Vedha Status Box */}
          <div className={`p-4 rounded-2xl border-2 flex items-start gap-3 ${
            result.vedhaPassed
              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            {result.vedhaPassed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">Vedha Porutham (Must Pass)</span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  result.vedhaPassed ? 'bg-emerald-200/80 text-emerald-900' : 'bg-rose-200/80 text-rose-900'
                }`}>
                  {result.vedhaPassed ? 'PASSED' : 'VEDHA DOSHA'}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {result.poruthams.find((p) => p.id === 10)?.scoreDescription}
              </p>
            </div>
          </div>
        </div>

        {/* ─── The 10 Poruthams Full Matching Table ─── */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 shadow-2xs">
          <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              10 Poruthams Matching Table (பத்துப் பொருத்தங்கள்)
            </h3>
            <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
              Full Breakdown
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Porutham</th>
                  <th className="py-3 px-4 hidden sm:table-cell">What It Checks</th>
                  <th className="py-3 px-4 text-center">Must Match?</th>
                  <th className="py-3 px-4 text-center">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.poruthams.map((p) => {
                  const isCrucial = p.isMustPass;
                  return (
                    <tr
                      key={p.id}
                      className={`transition-colors ${
                        isCrucial && !p.isMatched
                          ? 'bg-rose-50/50'
                          : isCrucial && p.isMatched
                          ? 'bg-amber-50/30'
                          : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <td className="py-3 px-4 text-center font-mono text-slate-400 font-bold">
                        {p.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{p.name}</span>
                          {isCrucial && (
                            <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-semibold">
                              Must Pass
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-amber-800 font-medium">{p.tamilName}</div>
                        <div className="text-[11px] text-slate-500 sm:hidden mt-0.5">{p.whatItChecks}</div>
                        <div className="text-[11px] text-slate-600 mt-1 italic">{p.scoreDescription}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 hidden sm:table-cell">
                        {p.whatItChecks}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          p.isMustPass ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {p.isMustPass ? 'Must Pass' : 'Preferred'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {p.isMatched ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Matched</span>
                          </span>
                        ) : (
                          <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full text-xs border ${
                            p.isMustPass
                              ? 'text-rose-700 bg-rose-50 border-rose-300'
                              : 'text-slate-500 bg-slate-100 border-slate-200'
                          }`}>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Not Matched</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Verdict Explanation Box */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 text-slate-800 mb-8">
          <h4 className="text-sm font-bold text-amber-950 mb-1 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600" />
            <span>Astrological Guidance &amp; Verdict</span>
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed mb-2">
            {result.verdictDescription}
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed italic">
            * Note: Thirumana porutham is a traditional astrological screening guideline. A final wedding decision should be made alongside family understanding, mutual communication, and complete horoscope scrutiny.
          </p>
        </div>

        {/* ─── Actions (Print, Download, Share, Recalculate) ─── */}
        <div className="print:hidden pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all min-h-[44px]"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Porutham Chart</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 active:scale-95 transition-all shadow-xs min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Generating...' : 'Download Card'}</span>
            </button>

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
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-700 hover:text-amber-800 hover:underline py-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recalculate / Switch Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
