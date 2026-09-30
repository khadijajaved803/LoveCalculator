import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, X } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  shareText: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  shareText,
  url = 'https://milanmeter.com/',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullShareText = `${shareText}\nTest your love compatibility on MilanMeter: ${url}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(fullShareText);
    window.location.href = `https://api.whatsapp.com/send?text=${encoded}`;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close Share Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-base font-bold text-slate-900 font-display mb-1">
          Share Your Result
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Share your compatibility score with your partner or friends on WhatsApp!
        </p>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-5 text-xs text-slate-700 font-mono whitespace-pre-wrap line-clamp-3">
          {shareText}
        </div>

        <div className="space-y-2.5">
          {/* WhatsApp Direct Action */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>

          {/* Copy to Clipboard */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-medium text-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Result & Link'}</span>
          </button>

          {/* Native Share */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 rounded-xl text-slate-500 hover:text-slate-800 text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>More Sharing Options</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
