import React, { useState } from 'react';
import {
  Share2,
  RotateCcw,
  Heart,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Download,
  Lightbulb,
  Image as ImageIcon,
  ShieldCheck,
} from 'lucide-react';
import { CompatibilityResult } from '../types';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface ResultCardProps {
  result: CompatibilityResult;
  onReset: () => void;
  onShare: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const [copiedImage, setCopiedImage] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const websiteUrl = 'https://calculatelove.online';

  const getCardOptions = () => ({
    type: 'love' as const,
    names: result.names,
    score: result.score,
    tagline: result.hinglishTagline || result.verdict,
    suggestion: result.hinglishSuggestion,
    tip: result.hinglishTip,
    details: result.details?.bondType ? `Bond: ${result.details.bondType} · ${result.grade}` : undefined,
  });

  // 1. Share Real Card Image to WhatsApp
  const handleWhatsAppImageShare = async () => {
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob(getCardOptions());
      const file = new File([blob], `${result.names.person1}-${result.names.person2}-love-card.png`, {
        type: 'image/png',
      });

      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${result.names.person1} & ${result.names.person2} Love Compatibility`,
          text: `Check out our compatibility card! Test yours free at: ${websiteUrl}`,
        });
      } else {
        triggerDownload(blob);
        tryCopyImageBlob(blob);
        setNotice('Card image downloaded & copied! Paste (Ctrl+V) directly in your WhatsApp chat.');
        setTimeout(() => {
          window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out our Love Compatibility Card! Test yours free at: ${websiteUrl}`)}`;
        }, 1500);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setNotice('Sharing error. Downloading card image instead.');
      }
    } finally {
      setDownloading(false);
    }
  };

  // 2. Share Real Card Image to Facebook
  const handleFacebookImageShare = async () => {
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob(getCardOptions());
      triggerDownload(blob);
      tryCopyImageBlob(blob);
      setNotice('Card image downloaded & copied! Attach it to your Facebook post.');
      setTimeout(() => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent(`Check out our Love Card from ${websiteUrl}`)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }, 1200);
    } catch {
      // fallback
    } finally {
      setDownloading(false);
    }
  };

  // 3. Direct Download Image
  const handleDownloadImage = async () => {
    setDownloading(true);
    try {
      const blob = await generateCardImageBlob(getCardOptions());
      triggerDownload(blob);
      setNotice('High-res 1080×1350 Card downloaded successfully!');
    } catch {
      setNotice('Could not download image. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // 4. Copy Card Image to Clipboard
  const handleCopyCardImage = async () => {
    setDownloading(true);
    try {
      const blob = await generateCardImageBlob(getCardOptions());
      const success = await tryCopyImageBlob(blob);
      if (success) {
        setCopiedImage(true);
        setNotice('Card image copied to clipboard! Paste it directly in any chat.');
        setTimeout(() => setCopiedImage(false), 3000);
      } else {
        triggerDownload(blob);
        setNotice('Clipboard copy not supported by your browser. Image downloaded instead!');
      }
    } catch {
      setNotice('Could not copy image.');
    } finally {
      setDownloading(false);
    }
  };

  const triggerDownload = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.names.person1}-${result.names.person2}-love-card.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const tryCopyImageBlob = async (blob: Blob): Promise<boolean> => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
      try {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  return (
    <div className="relative bg-gradient-to-b from-white via-rose-50/20 to-white rounded-3xl border-2 border-rose-200/90 shadow-xl overflow-hidden p-5 sm:p-7 md:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300 w-full">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

      {/* Brand Header Tag */}
      <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest font-mono">
          <CalculateLoveLogo size={22} />
          <span>calculatelove.online</span>
        </div>
        <span className="text-[10px] bg-rose-100 text-rose-700 font-semibold px-2.5 py-0.5 rounded-full">
          Official Love Certificate
        </span>
      </div>

      {/* 2-Column Wide Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Names, Score Gauge & Primary Actions */}
        <div className="lg:col-span-5 flex flex-col space-y-5">
          {/* Names Banner */}
          <div className="text-center">
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

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display mt-1 tracking-tight">
              {result.hinglishTagline || result.verdict}
            </h3>

            {result.details?.bondType && (
              <span className="text-[11px] text-slate-500 block mt-0.5 capitalize">
                Bond: {result.details.bondType} · {result.grade}
              </span>
            )}
          </div>

          {/* Circular Score Gauge */}
          <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50/90 to-white rounded-3xl border border-rose-200/80 shadow-inner">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 sm:w-40 sm:h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="66"
                  stroke="#ffe4e6"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="66"
                  stroke="#e11d48"
                  strokeWidth="12"
                  strokeDasharray={415}
                  strokeDashoffset={415 - (415 * result.score) / 100}
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

            <p className="text-xs text-center text-slate-600 max-w-sm mt-3 leading-relaxed font-medium">
              {result.summary}
            </p>
          </div>

          {/* Action Buttons: WhatsApp, Download PNG, Reset */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleWhatsAppImageShare}
              disabled={downloading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share Card on WhatsApp</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={downloading}
                className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-rose-200 min-h-[40px]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save PNG</span>
              </button>

              <button
                type="button"
                onClick={handleCopyCardImage}
                disabled={downloading}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-200 min-h-[40px]"
              >
                {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedImage ? 'Copied!' : 'Copy Card'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onReset}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[40px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Test Another Couple</span>
            </button>
          </div>

          {notice && (
            <div className="p-2.5 rounded-xl bg-slate-900 text-white text-[11px] text-center animate-in fade-in leading-relaxed">
              {notice}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Pillars, Dil Ki Baat & Phonetic Harmony */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Dil Ki Baat - Relationship Advice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-rose-50/50 to-amber-50/70 border border-amber-200/80 shadow-xs space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
              <span>Dil Ki Baat · Relationship Advice</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium">
              {result.hinglishSuggestion}
            </p>
            <div className="pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-950 font-medium">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>{result.hinglishTip}</span>
            </div>
          </div>

          {/* 4 Compatibility Dimensions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Relationship Compatibility Pillars
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">Deterministic Match</span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">💬 Communication & Banter</span>
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
                <span className="text-slate-600 font-medium">🛡️ Emotional Safety & Sukoon</span>
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
                <span className="text-slate-600 font-medium">🔥 Chemistry & Passion</span>
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
                <span className="text-slate-600 font-medium">🤝 Long-Term Companionship</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {result.breakdown.longevity}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                  style={{ width: `${result.breakdown.longevity}%` }}
                />
              </div>
            </div>
          </div>

          {/* Phonetic & Letter Harmony Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
              <span>Deterministic Phonetic Harmony</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              This score was generated by evaluating mutual character frequencies, vowel-to-consonant resonance, and sound energy between <strong>{result.names.person1}</strong> and <strong>{result.names.person2}</strong>. The result is 100% symmetric and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
