import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateFriendshipScore } from '../lib/calculatorEngine';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import {
  Users,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Copy,
  Check,
  Download,
  Lightbulb,
  Image as ImageIcon,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const FriendshipPage: React.FC<Props> = ({ onNavigate }) => {
  const [friend1, setFriend1] = useState('');
  const [friend2, setFriend2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [friendVibe, setFriendVibe] = useState('Chai Tapri & Gossip');

  const [result, setResult] = useState<ReturnType<typeof calculateFriendshipScore> | null>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState('');

  const websiteUrl = 'https://calculatelove.online';

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friend1.trim() || !friend2.trim()) {
      setError('Please provide names for both friends.');
      return;
    }
    setError('');
    const res = calculateFriendshipScore(friend1, friend2, { age1, age2, friendVibe });
    setResult(res);
  };

  const handleReset = () => {
    setFriend1('');
    setFriend2('');
    setAge1('');
    setAge2('');
    setResult(null);
    setError('');
  };

  const getFriendshipCardOptions = () => {
    if (!result) throw new Error('No result');
    return {
      type: 'friendship' as const,
      names: result.names,
      score: result.score,
      tagline: result.hinglishTagline,
      suggestion: result.hinglishSuggestion,
      tip: result.hinglishTip,
      details: `${result.title} · ${friendVibe}`,
    };
  };

  const triggerDownload = (blob: Blob) => {
    if (!result) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Friendship-${result.names.person1}-${result.names.person2}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const tryCopyImageBlob = async (blob: Blob) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
    }
  };

  const handleWhatsAppImageShare = async () => {
    if (!result) return;
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob(getFriendshipCardOptions());
      const file = new File([blob], `${result.names.person1}-${result.names.person2}-friendship-card.png`, {
        type: 'image/png',
      });

      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${result.names.person1} & ${result.names.person2} Friendship Score`,
          text: `Check out our friendship card! Test yours free at: ${websiteUrl}`,
        });
      } else {
        triggerDownload(blob);
        tryCopyImageBlob(blob);
        setNotice('Friendship card downloaded & copied! Paste (Ctrl+V) directly in your WhatsApp chat.');
        setTimeout(() => {
          window.location.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out our friendship card! Test free at: ${websiteUrl}`)}`;
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

  const handleFacebookImageShare = async () => {
    if (!result) return;
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob(getFriendshipCardOptions());
      triggerDownload(blob);
      tryCopyImageBlob(blob);
      setNotice('Friendship card downloaded & copied! Attach it to your Facebook post.');
      setTimeout(() => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent(`Check out our friendship card from ${websiteUrl}`)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }, 1200);
    } catch {
      // fallback
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      const blob = await generateCardImageBlob(getFriendshipCardOptions());
      triggerDownload(blob);
      setNotice('Card saved to your device!');
      setTimeout(() => setNotice(null), 3000);
    } catch {
      setNotice('Failed to download image');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyImage = async () => {
    if (!result) return;
    try {
      const blob = await generateCardImageBlob(getFriendshipCardOptions());
      await tryCopyImageBlob(blob);
      setCopiedImage(true);
      setNotice('Friendship card copied to clipboard! Paste it directly in any chat.');
      setTimeout(() => {
        setCopiedImage(false);
        setNotice(null);
      }, 3500);
    } catch {
      handleDownloadImage();
    }
  };

  const friendVibeOptions = [
    'Chai Tapri & Gossip ☕',
    '3 AM Deep Talks 🌙',
    'Trip & Spontaneous Masti 🚗',
    'Gaming & Meme Sharing 🎮',
  ];

  const faqs = [
    {
      question: 'How is the friendship percentage score calculated?',
      answer:
        'The friendship score measures name vibration and harmonic balance between two companions, evaluating camaraderie, loyalty, and banter dynamics.',
    },
    {
      question: 'Can I test my entire friend group?',
      answer:
        'Yes! You can test pairs among your circle of friends to see who has the highest banter or shared adventure score.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Friendship Calculator',
    'url': 'https://calculatelove.online/friendship-calculator/',
    'description': 'Check best friend compatibility, loyalty score, and shared humor meter for you and your closest friends.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Friendship Calculator - Best Friend Compatibility Test | CalculateLove"
        description="Test friendship percentage and bestie compatibility with CalculateLove's Friendship Calculator. Fun, private, deterministic scores for loyalty, humor, and support."
        canonicalPath="/friendship-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Friendship', href: '/friendship-calculator/' },
          { label: 'Friendship Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Friendship Compatibility Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Celebrate your closest bonds! Check friendship percentage, loyalty resonance, and shareable bestie cards with personalized relationship reflections.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label
                  htmlFor="frName1"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Your Name
                </label>
                <input
                  id="frName1"
                  type="text"
                  value={friend1}
                  onChange={(e) => setFriend1(e.target.value)}
                  placeholder="e.g. Tanvi"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-center my-1">
                <span className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <Users className="w-4 h-4" />
                </span>
              </div>

              <div>
                <label
                  htmlFor="frName2"
                  className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2"
                >
                  Best Friend&apos;s Name
                </label>
                <input
                  id="frName2"
                  type="text"
                  value={friend2}
                  onChange={(e) => setFriend2(e.target.value)}
                  placeholder="e.g. Riya"
                  maxLength={50}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-sm text-slate-900 placeholder:text-slate-400 min-h-[48px] transition-all"
                  required
                />
              </div>

              {/* Engaging Age Inputs */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div>
                  <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Ages (Optional)
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      min="10"
                      max="99"
                      value={age1}
                      onChange={(e) => setAge1(e.target.value)}
                      placeholder="Your Age"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs min-h-[42px]"
                    />
                    <input
                      type="number"
                      min="10"
                      max="99"
                      value={age2}
                      onChange={(e) => setAge2(e.target.value)}
                      placeholder="Friend's Age"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs min-h-[42px]"
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Friendship Vibe
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {friendVibeOptions.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setFriendVibe(v)}
                        className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                          friendVibe === v
                            ? 'border-amber-500 bg-amber-50 text-amber-900 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md min-h-[48px]"
              >
                <span>Check Friendship Score</span>
                <Users className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic match · Zero data logged</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="relative bg-gradient-to-b from-white via-amber-50/20 to-white rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500" />

            <div className="flex items-center justify-between border-b border-amber-100 pb-3 mb-5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 uppercase tracking-widest font-mono">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>calculatelove.online</span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full">
                Bestie Score Card
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {result.names.person1} & {result.names.person2}
              </h3>
              <p className="text-xs font-semibold text-amber-800 mt-1">{result.hinglishTagline}</p>
            </div>

            {/* Score Showcase */}
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-white rounded-3xl border border-amber-200 mb-6 shadow-inner">
              <span className="text-5xl font-extrabold text-amber-700 font-display tabular-nums">
                {result.score}%
              </span>
              <span className="text-[10px] text-amber-800 font-bold uppercase tracking-widest mt-1">
                Friendship Bond Score
              </span>
              <p className="text-xs text-center text-slate-600 max-w-sm mt-3 leading-relaxed">
                {result.desc}
              </p>
            </div>

            {/* Friendship Reflection */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-200/90 mb-6 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                <span>Dosti Ka Secret & Bond Insights</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {result.hinglishSuggestion}
              </p>
              <div className="pt-2 border-t border-amber-200/60 flex items-start gap-1.5 text-[11px] text-amber-950 font-medium">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{result.hinglishTip}</span>
              </div>
            </div>

            {/* Notice banner */}
            {notice && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-center font-medium animate-in fade-in duration-200">
                {notice}
              </div>
            )}

            {/* Share Card Image Affordances */}
            <div className="space-y-2 mb-4">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>Share Beautiful Card Image</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={downloading}
                  onClick={handleWhatsAppImageShare}
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm min-h-[46px] disabled:opacity-75"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{downloading ? 'Preparing Image...' : 'WhatsApp Card'}</span>
                </button>

                <button
                  type="button"
                  disabled={downloading}
                  onClick={handleFacebookImageShare}
                  className="py-3 px-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm min-h-[46px] disabled:opacity-75"
                >
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook Card</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadImage}
                  className="py-2.5 px-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                >
                  <Download className="w-3.5 h-3.5 text-amber-700" />
                  <span>Download Card PNG</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyImage}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                >
                  {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedImage ? 'Image Copied!' : 'Copy Card Image'}</span>
                </button>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[40px]"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Test Another Friend</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Generated on https://calculatelove.online</span>
              <span>100% Free & Private</span>
            </div>
          </div>
        )}
      </div>

      <RelatedTools currentToolId="friendship-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['friendship-compatibility-guide', 'how-flames-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
