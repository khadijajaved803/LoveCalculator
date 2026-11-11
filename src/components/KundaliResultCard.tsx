import React, { useState } from 'react';
import {
  Share2,
  RotateCcw,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Download,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Info,
  Calendar,
  Star,
  Flame,
} from 'lucide-react';
import { KundaliMatchResult } from '../lib/kundaliEngine';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface KundaliResultCardProps {
  result: KundaliMatchResult;
  onReset: () => void;
  onNavigate: (path: string) => void;
}

export const KundaliResultCard: React.FC<KundaliResultCardProps> = ({
  result,
  onReset,
  onNavigate,
}) => {
  const [copiedImage, setCopiedImage] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const websiteUrl = 'https://calculatelove.online';

  const getCardOptions = () => ({
    type: 'kundali' as const,
    names: {
      person1: result.partner1.name,
      person2: result.partner2.name,
    },
    score: result.totalGunas,
    maxScore: 36,
    tagline: `${result.verdictBand} Match (${result.totalGunas}/36 Gunas)`,
    suggestion: result.verdictDescription,
    tip: result.doshas.manglik.hasDosha
      ? 'Manglik attention flagged: consult Vedic chart remedies.'
      : result.doshas.nadi.hasDosha
      ? 'Nadi Dosha flagged (0/8): check cancellation exceptions.'
      : 'Ashta Kuta planetary alignment is balanced.',
    details: `${result.partner1.nakshatra} & ${result.partner2.nakshatra} · Mode: ${result.mode}`,
  });

  const handleWhatsAppImageShare = async () => {
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob(getCardOptions());
      const file = new File(
        [blob],
        `${result.partner1.name}-${result.partner2.name}-kundali-card.png`,
        { type: 'image/png' }
      );

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Kundali Milan: ${result.partner1.name} & ${result.partner2.name}`,
          text: `✨ Kundali Matching Result: ${result.partner1.name} + ${result.partner2.name} scored ${result.totalGunas}/36 Gunas (${result.verdictBand})! Check yours free on CalculateLove:`,
          url: `${websiteUrl}/kundali-matching/`,
        });
      } else {
        const text = encodeURIComponent(
          `✨ *Kundali Milan: ${result.partner1.name} & ${result.partner2.name}*\n` +
            `🕉️ Guna Score: *${result.totalGunas}/36 Gunas* (${result.verdictBand})\n` +
            `⭐ Partner 1: ${result.partner1.nakshatra} (${result.partner1.rashi})\n` +
            `⭐ Partner 2: ${result.partner2.nakshatra} (${result.partner2.rashi})\n` +
            `🔗 Check your free Kundali match here: ${websiteUrl}/kundali-matching/`
        );
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setNotice('Could not launch WhatsApp share. Use Download Card instead.');
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadImage = async () => {
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob(getCardOptions());
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Kundali-Milan-${result.partner1.name}-and-${result.partner2.name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setNotice('Kundali card image saved successfully!');
    } catch {
      setNotice('Unable to generate image. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyImage = async () => {
    setNotice(null);
    try {
      const blob = await generateCardImageBlob(getCardOptions());
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopiedImage(true);
        setNotice('Kundali card copied to clipboard!');
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        await navigator.clipboard.writeText(
          `Kundali Matching: ${result.partner1.name} & ${result.partner2.name} scored ${result.totalGunas}/36 Gunas (${result.verdictBand}). Test free at ${websiteUrl}/kundali-matching/`
        );
        setCopiedImage(true);
        setNotice('Link & score copied to clipboard!');
        setTimeout(() => setCopiedImage(false), 2500);
      }
    } catch {
      setNotice('Copy not supported on this browser. Try Download Card.');
    }
  };

  // Verdict style badge
  const getVerdictBadge = () => {
    switch (result.verdictBand) {
      case 'Excellent':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Very Good':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Acceptable':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Main Result Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-amber-50/40 to-orange-50/60 border border-amber-200/80 shadow-xl overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 rounded-full bg-rose-400/10 blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-100/80">
          <CalculateLoveLogo size={28} showWordmark={true} />
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            Vedic Ashta Kuta
          </span>
        </div>

        {/* Couple & Score Display */}
        <div className="text-center py-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Kundali Milan Report
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            {result.partner1.name} <span className="text-amber-600">&amp;</span> {result.partner2.name}
          </h2>

          {/* Gunas Gauge */}
          <div className="my-6 inline-flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-1 shadow-lg flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
                  {result.totalGunas}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest -mt-1">
                  / 36 Gunas
                </span>
              </div>
            </div>

            {/* Verdict Badge */}
            <div className="mt-4">
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${getVerdictBadge()}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{result.verdictBand} Match</span>
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md text-center leading-relaxed">
              {result.verdictDescription}
            </p>
          </div>

          {/* Chart Details Pills */}
          <div className="grid grid-cols-2 gap-3 text-left bg-white/80 rounded-2xl p-4 border border-amber-100 shadow-2xs">
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {result.partner1.name}
              </div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500" />
                <span>{result.partner1.nakshatra}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Rashi: <span className="font-semibold text-slate-700">{result.partner1.rashi}</span> ({result.partner1.rashiLord})
              </div>
              <div className="text-[11px] text-slate-500">
                Gana: <span className="font-semibold text-slate-700">{result.partner1.gana}</span> · Nadi: <span className="font-semibold text-slate-700">{result.partner1.nadi}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {result.partner2.name}
              </div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500" />
                <span>{result.partner2.nakshatra}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Rashi: <span className="font-semibold text-slate-700">{result.partner2.rashi}</span> ({result.partner2.rashiLord})
              </div>
              <div className="text-[11px] text-slate-500">
                Gana: <span className="font-semibold text-slate-700">{result.partner2.gana}</span> · Nadi: <span className="font-semibold text-slate-700">{result.partner2.nadi}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dosha Flags Section */}
        <div className="mt-4 pt-4 border-t border-amber-100 space-y-2.5">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Dosha Analysis</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Manglik Flag */}
            <div
              className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                result.doshas.manglik.hasDosha
                  ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                  : result.doshas.manglik.status === 'Cancelled'
                  ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              }`}
            >
              {result.doshas.manglik.hasDosha ? (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold flex items-center gap-1">
                  <span>Manglik Dosha:</span>
                  <span className="font-semibold">{result.doshas.manglik.status}</span>
                </div>
                <p className="text-[11px] leading-snug mt-0.5 opacity-90">
                  {result.doshas.manglik.description}
                </p>
              </div>
            </div>

            {/* Nadi Dosha Flag */}
            <div
              className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                result.doshas.nadi.hasDosha
                  ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              }`}
            >
              {result.doshas.nadi.hasDosha ? (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold flex items-center gap-1">
                  <span>Nadi Dosha:</span>
                  <span className="font-semibold">
                    {result.doshas.nadi.hasDosha ? 'Present (0/8)' : 'Clean (8/8)'}
                  </span>
                </div>
                <p className="text-[11px] leading-snug mt-0.5 opacity-90">
                  {result.doshas.nadi.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Kootas Detailed Table */}
        <div className="mt-6 pt-4 border-t border-amber-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Ashta Kuta Breakdown</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-500">
              Total: {result.totalGunas} / 36
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Koota</th>
                  <th className="py-2.5 px-3">Aspect</th>
                  <th className="py-2.5 px-3 text-center">Score</th>
                  <th className="py-2.5 px-3 text-right">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {result.kootas.map((k) => (
                  <tr key={k.name} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">
                      {k.name}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {k.hindiName}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-600">
                      {k.description}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-900 whitespace-nowrap">
                      <span
                        className={
                          k.score === k.maxScore
                            ? 'text-emerald-600'
                            : k.score === 0
                            ? 'text-rose-600'
                            : 'text-amber-600'
                        }
                      >
                        {k.score}
                      </span>
                      <span className="text-slate-400 font-normal"> / {k.maxScore}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          k.verdict === 'Excellent' || k.verdict === 'Good'
                            ? 'bg-emerald-50 text-emerald-700'
                            : k.verdict === 'Average'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {k.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-amber-100 flex flex-wrap gap-2.5">
          {/* WhatsApp share */}
          <button
            type="button"
            onClick={handleWhatsAppImageShare}
            disabled={downloading}
            className="flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share WhatsApp</span>
          </button>

          {/* Download Card */}
          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={downloading}
            className="flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Card</span>
          </button>

          {/* Copy image/text */}
          <button
            type="button"
            onClick={handleCopyImage}
            className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center gap-1.5"
            title="Copy Kundali Result"
          >
            {copiedImage ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{copiedImage ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Recalculate */}
          <button
            type="button"
            onClick={onReset}
            className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center gap-1.5"
            title="Match another couple"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
