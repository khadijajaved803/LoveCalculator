import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, X, ExternalLink } from 'lucide-react';

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
  url = 'https://calculatelove.online',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullShareText = `${shareText}\n\n👉 Test your love compatibility free at: ${url}`;

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

  const handleFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTwitter = () => {
    const tweetText = `${shareText} Test yours on CalculateLove:`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close Share Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <span className="inline-block p-2.5 bg-rose-50 rounded-2xl text-rose-600 mb-2">
            <Share2 className="w-5 h-5" />
          </span>
          <h3 className="text-base font-bold text-slate-900 font-display">
            Share Compatibility Result
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Share your score with your partner or friends!
          </p>
        </div>

        <div className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-100 mb-5 text-xs text-slate-700 font-sans leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
          {shareText}
          <div className="mt-2 text-rose-600 font-medium">calculatelove.online</div>
        </div>

        <div className="space-y-2.5">
          {/* WhatsApp Direct Action */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Share on WhatsApp</span>
          </button>

          {/* Facebook Share */}
          <button
            type="button"
            onClick={handleFacebook}
            className="w-full py-3 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Share to Facebook</span>
          </button>

          {/* Copy to Clipboard */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Result & Link'}</span>
          </button>

          {/* Twitter / More */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={handleTwitter}
              className="flex-1 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-100 min-h-[40px]"
            >
              <span>X / Twitter</span>
            </button>
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex-1 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-100 min-h-[40px]"
              >
                <span>More</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
