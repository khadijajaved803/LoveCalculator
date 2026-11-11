import React, { useState } from 'react';
import { ALL_ZODIAC_SIGNS } from '../lib/zodiacEngine';
import {
  getLoveHoroscope,
  signFromDob,
  getLocalIsoDate,
  LoveHoroscopeMode,
  LoveHoroscopeLang,
  LoveHoroscopeResult,
  LoveHoroscopeSpan,
} from '../lib/loveHoroscopeEngine';
import { CalculationLoader } from './CalculationLoader';
import { ShareModal } from './ShareModal';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import {
  Moon,
  Calendar,
  Sparkles,
  ArrowRight,
  AlertCircle,
  RotateCcw,
  Heart,
  Download,
  Share2,
  MessageCircle,
  ShieldAlert,
  Languages,
  Users,
  User,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

const LABELS: Record<
  LoveHoroscopeLang,
  {
    subtitle: string;
    pickSign: string;
    orDob: string;
    dobLabel: string;
    yourSignIs: string;
    single: string;
    couple: string;
    getReading: string;
    today: string;
    tomorrow: string;
    weekly: string;
    monthly: string;
    mood: string;
    say: string;
    avoid: string;
    bestMatches: string;
    seeCompat: string;
    download: string;
    generating: string;
    share: string;
    again: string;
    error: string;
    noReading: string;
    disclaimer: string;
    downloaded: string;
    downloadFail: string;
    info1: string;
    info2: string;
    info3: string;
  }
> = {
  en: {
    subtitle:
      'Free love horoscope — your daily love horoscope by sign or date of birth. Today, tomorrow, weekly and monthly. No sign-up, no app to install.',
    pickSign: 'Pick your zodiac sign',
    orDob: 'Or enter your date of birth',
    dobLabel: 'Date of Birth',
    yourSignIs: 'Your sign is',
    single: 'Single',
    couple: 'Couple',
    getReading: 'Get My Love Horoscope',
    today: 'Today',
    tomorrow: 'Tomorrow',
    weekly: 'Weekly',
    monthly: 'Monthly',
    mood: 'Mood',
    say: 'What to say',
    avoid: 'What to avoid',
    bestMatches: 'Best matches today',
    seeCompat: 'See full compatibility',
    download: 'Download Card',
    generating: 'Generating...',
    share: 'Share',
    again: 'Calculate Again',
    error: 'Please choose your zodiac sign or enter your date of birth.',
    noReading: 'Could not generate a reading right now — please try again.',
    disclaimer:
      'These are traditional horoscope readings — tendencies, not guarantees. Your choices still decide your life.',
    downloaded: 'Shareable love horoscope card downloaded!',
    downloadFail: 'Could not generate image. Please try again.',
    info1: 'Today, tomorrow, weekly and monthly readings for your sign.',
    info2: 'Singles and couples readings — pick the one that fits you.',
    info3: '100% Free & Private: results generated instantly on your device.',
  },
  hi: {
    subtitle:
      'मुफ़्त लव राशिफल — अपनी राशि या जन्म तिथि से दैनिक लव राशिफल। आज, कल, साप्ताहिक और मासिक। कोई साइन-अप नहीं, कोई ऐप नहीं।',
    pickSign: 'अपनी राशि चुनें',
    orDob: 'या अपनी जन्म तिथि दर्ज करें',
    dobLabel: 'जन्म तिथि',
    yourSignIs: 'आपकी राशि है',
    single: 'सिंगल',
    couple: 'कपल',
    getReading: 'मेरा लव राशिफल देखें',
    today: 'आज',
    tomorrow: 'कल',
    weekly: 'साप्ताहिक',
    monthly: 'मासिक',
    mood: 'मिज़ाज',
    say: 'क्या कहें',
    avoid: 'किससे बचें',
    bestMatches: 'आज के सर्वश्रेष्ठ मेल',
    seeCompat: 'पूरी संगतता देखें',
    download: 'कार्ड डाउनलोड करें',
    generating: 'बन रहा है...',
    share: 'शेयर करें',
    again: 'फिर से देखें',
    error: 'कृपया अपनी राशि चुनें या जन्म तिथि दर्ज करें।',
    noReading: 'अभी राशिफल नहीं बन सका — कृपया फिर से कोशिश करें।',
    disclaimer:
      'ये पारंपरिक राशिफल प्रवृत्तियाँ हैं — कोई वादा नहीं। आपके फैसले ही आपके जीवन को तय करते हैं।',
    downloaded: 'शेयर करने योग्य लव राशिफल कार्ड डाउनलोड हो गया!',
    downloadFail: 'तस्वीर नहीं बन सकी। कृपया फिर से कोशिश करें।',
    info1: 'आपकी राशि के लिए आज, कल, साप्ताहिक और मासिक राशिफल।',
    info2: 'सिंगल और कपल दोनों के लिए — जो आप पर लागू हो, उसे चुनें।',
    info3: '100% मुफ़्त और निजी: परिणाम आपके डिवाइस पर तुरंत बनते हैं।',
  },
};

const TABS: { id: LoveHoroscopeSpan; labelKey: 'today' | 'tomorrow' | 'weekly' | 'monthly' }[] = [
  { id: 'today', labelKey: 'today' },
  { id: 'tomorrow', labelKey: 'tomorrow' },
  { id: 'weekly', labelKey: 'weekly' },
  { id: 'monthly', labelKey: 'monthly' },
];

export const LoveHoroscopeTool: React.FC<Props> = ({ onNavigate }) => {
  const [signId, setSignId] = useState<string | null>(null);
  const [dob, setDob] = useState('');
  const [mode, setMode] = useState<LoveHoroscopeMode>('single');
  const [lang, setLang] = useState<LoveHoroscopeLang>('en');
  const [tab, setTab] = useState<LoveHoroscopeSpan>('today');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<LoveHoroscopeResult | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

  const t = LABELS[lang];
  const selectedSign = signId ? ALL_ZODIAC_SIGNS.find((s) => s.id === signId) ?? null : null;

  const handleDobChange = (value: string) => {
    setDob(value);
    if (value && value.length === 10) {
      const sign = signFromDob(value);
      setSignId(sign.id);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!signId) {
      setError(t.error);
      return;
    }

    setIsCalculating(true);
  };

  const handleLoaderComplete = () => {
    setIsCalculating(false);
    if (!signId) {
      setError(t.noReading);
      return;
    }
    const res = getLoveHoroscope(signId, mode, lang);
    if (!res || !res.spans) {
      setError(t.noReading);
      return;
    }
    setResult(res);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setResult(null);
    setError('');
  };

  const handleDownload = async () => {
    if (!result) return;
    try {
      setDownloading(true);
      const span = result.spans[tab];
      const blob = await generateCardImageBlob({
        type: 'love-horoscope',
        names: { person1: `${result.sign.glyph} ${result.sign.name}`, person2: '' },
        letter: result.sign.glyph,
        word: result.sign.name,
        tagline: `${result.sign.name} Love Horoscope`,
        suggestion:
          span.reading.length > 180 ? `${span.reading.slice(0, 177)}…` : span.reading,
        tip: `${span.dateLabel} · ${t.mood}: ${span.mood}`,
        details: `${t.bestMatches}: ${result.bestMatches.join(', ')}`,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Love-Horoscope-${result.sign.name}-${getLocalIsoDate()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setNotice(t.downloaded);
      setTimeout(() => setNotice(null), 3000);
    } catch {
      setNotice(t.downloadFail);
      setTimeout(() => setNotice(null), 4000);
    } finally {
      setDownloading(false);
    }
  };

  const shareText = result
    ? lang === 'hi'
      ? `मेरा ${result.sign.name} लव राशिफल (${result.spans[tab].dateLabel}): ${result.spans[tab].reading}`
      : `My ${result.sign.name} love horoscope (${result.spans[tab].dateLabel}): ${result.spans[tab].reading}`
    : '';

  const span = result ? result.spans[tab] : null;

  return (
    <div className="w-full">
      {/* ─── Calculating Loader ─── */}
      {isCalculating && selectedSign && (
        <CalculationLoader
          name1={`${selectedSign.glyph} ${selectedSign.name}`}
          name2={mode === 'single' ? t.single : t.couple}
          type="love"
          minDuration={1600}
          maxDuration={2200}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* ─── Result View ─── */}
      {!isCalculating && result && span && (
        <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
          {notice && (
            <div className="bg-slate-900 text-white text-xs font-semibold py-2 px-4 text-center">
              {notice}
            </div>
          )}

          {/* Result Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500 p-6 sm:p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 mb-3 shadow-xs">
                <span className="text-base leading-none">{result.sign.glyph}</span>
                <span>
                  {result.sign.name} · {result.sign.dates}
                </span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                {lang === 'hi'
                  ? `${result.sign.name} लव राशिफल`
                  : `${result.sign.name} Love Horoscope`}
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium mt-2 max-w-xl mx-auto">
                {mode === 'single' ? t.single : t.couple} · {span.dateLabel}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            {/* Span Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {TABS.map((tabItem) => (
                <button
                  key={tabItem.id}
                  type="button"
                  onClick={() => setTab(tabItem.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all min-h-[40px] ${
                    tab === tabItem.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  {t[tabItem.labelKey]}
                </button>
              ))}
            </div>

            {/* Reading */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto text-center">
              {span.reading}
            </p>

            {/* Mood / Say / Avoid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.mood}</span>
                </div>
                <p className="text-sm font-bold text-slate-800">{span.mood}</p>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-2">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.say}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{span.say}</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-2">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{t.avoid}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{span.avoid}</p>
              </div>
            </div>

            {/* Love Match Line */}
            <p className="text-xs sm:text-sm text-slate-600 text-center mt-6">
              <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500 mr-1" />
              <strong>
                {t.bestMatches}: {result.bestMatches.join(', ')}
              </strong>{' '}
              ·{' '}
              <a
                href="/love-compatibility-by-zodiac-sign/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-compatibility-by-zodiac-sign/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                {t.seeCompat}
              </a>
            </p>

            <p className="text-[11px] text-slate-400 leading-relaxed mt-6 text-center">
              {t.disclaimer}
            </p>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-95 transition-all shadow-xs min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? t.generating : t.download}</span>
              </button>
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 active:scale-95 transition-all min-h-[44px]"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.share}</span>
              </button>
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-700 transition-all min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" />
                {t.again}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Calculator Form ─── */}
      {!isCalculating && !result && (
        <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
          {/* Top Decorative Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500 p-6 sm:p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 mb-3 shadow-xs">
                <Moon className="w-3.5 h-3.5 fill-white text-white" />
                <span>Daily Love Horoscope · 100% Free Results</span>
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display mb-2">
                Love Horoscope
              </h2>

              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8 max-w-2xl mx-auto">
            <form onSubmit={handleCalculate} className="space-y-5">
              {/* Error Notice */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Sign Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{t.pickSign}</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {ALL_ZODIAC_SIGNS.map((sign) => (
                    <button
                      key={sign.id}
                      type="button"
                      onClick={() => setSignId(sign.id)}
                      className={`rounded-2xl border p-3 text-center transition-all min-h-[76px] ${
                        signId === sign.id
                          ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50'
                      }`}
                    >
                      <span className="block text-2xl leading-none mb-1">{sign.glyph}</span>
                      <span className="block text-xs font-bold text-slate-800">{sign.name}</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">{sign.dates}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{t.orDob}</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => handleDobChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden text-sm transition-all"
                />
                {selectedSign && dob && (
                  <p className="text-xs text-indigo-700 font-semibold mt-2">
                    {t.yourSignIs} {selectedSign.glyph} {selectedSign.name} ({selectedSign.dates})
                  </p>
                )}
              </div>

              {/* Mode + Language Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{mode === 'single' ? t.single : t.couple}</span>
                  </label>
                  <div className="flex rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMode('single')}
                      className={`flex-1 py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
                        mode === 'single'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-indigo-50'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      {t.single}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('couple')}
                      className={`flex-1 py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
                        mode === 'couple'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-indigo-50'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                      {t.couple}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{lang === 'hi' ? 'हिन्दी' : 'English'}</span>
                  </label>
                  <div className="flex rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setLang('en')}
                      className={`flex-1 py-2.5 text-sm font-bold transition-all min-h-[44px] ${
                        lang === 'en'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-indigo-50'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang('hi')}
                      className={`flex-1 py-2.5 text-sm font-bold transition-all min-h-[44px] ${
                        lang === 'hi'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-indigo-50'
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-2">
                  <Moon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>
                    <strong>{t.today}, {t.tomorrow}, {t.weekly}, {t.monthly}:</strong> {t.info1}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>
                    <strong>
                      {t.single} / {t.couple}:
                    </strong>{' '}
                    {t.info2}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>
                    <strong>100% Free &amp; Private:</strong> {t.info3}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl text-center text-sm sm:text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 min-h-[52px]"
              >
                <span>{t.getReading}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── Share Modal ─── */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={result ? `My ${result.sign.name} Love Horoscope` : 'My Love Horoscope'}
        shareText={shareText}
        url="https://calculatelove.online/love-horoscope/"
      />
    </div>
  );
};
