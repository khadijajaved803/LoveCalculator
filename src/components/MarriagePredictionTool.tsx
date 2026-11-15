import React, { useState } from 'react';
import {
  Heart,
  Download,
  Share2,
  RotateCcw,
  Calendar,
  MapPin,
  User,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
} from 'lucide-react';
import { CalculationLoader } from './CalculationLoader';
import { ShareModal } from './ShareModal';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import { predictMarriage, type MarriagePrediction, type Lang } from '../lib/marriagePredictionEngine';

interface Props {
  onNavigate: (path: string) => void;
}

type Strings = {
  badge: string;
  subtitle: string;
  dob: string;
  time: string;
  place: string;
  name: string;
  timeHint: string;
  getPrediction: string;
  yourPrediction: string;
  ageRange: string;
  window: string;
  peak: string;
  lean: string;
  meeting: string;
  partner: string;
  working: string;
  seventhHouse: string;
  venus: string;
  jupiter: string;
  dasha: string;
  nakshatra: string;
  lagna: string;
  ascendant: string;
  moonSign: string;
  loveLean: string;
  arrangedLean: string;
  balancedLean: string;
  strongLean: string;
  moderateLean: string;
  balancedStrength: string;
  download: string;
  share: string;
  again: string;
  generating: string;
  downloaded: string;
  downloadFail: string;
  errorNoDob: string;
  errorInvalid: string;
  ages: string;
  years: string;
};

const STRINGS: Record<Lang, Strings> = {
  en: {
    badge: 'Free Marriage Prediction · By Date of Birth',
    subtitle:
      'Free marriage prediction — when will I get married, by date of birth. Your marriage age, love or arranged marriage, and when you will meet your life partner. No sign-up.',
    dob: 'Date of Birth',
    time: 'Time of Birth (optional)',
    place: 'Place of Birth (optional)',
    name: 'Your Name (optional)',
    timeHint: 'Birth time sharpens the reading — it fixes the ascendant and the houses. Without it, you still get an age range.',
    getPrediction: 'Get My Marriage Prediction',
    yourPrediction: 'Your Marriage Prediction',
    ageRange: 'Predicted Marriage Age',
    window: 'Marriage Window',
    peak: 'Strongest year in the window',
    lean: 'Love or Arranged?',
    meeting: 'When You May Meet',
    partner: 'Your Life Partner — Indications',
    working: 'How the prediction was worked out',
    seventhHouse: '7th house',
    venus: 'Venus',
    jupiter: 'Jupiter',
    dasha: 'Dasha',
    nakshatra: 'Nakshatra',
    lagna: 'Lagna basis',
    ascendant: 'Ascendant',
    moonSign: 'Moon sign (Chandra Lagna)',
    loveLean: 'Leans Love Marriage',
    arrangedLean: 'Leans Arranged Marriage',
    balancedLean: 'Balanced — Both Possible',
    strongLean: 'Strong lean',
    moderateLean: 'Moderate lean',
    balancedStrength: 'Balanced',
    download: 'Download Card',
    share: 'Share',
    again: 'Calculate Again',
    generating: 'Generating…',
    downloaded: 'Shareable marriage prediction card downloaded!',
    downloadFail: 'Could not generate image. Try again.',
    errorNoDob: 'Please enter your date of birth.',
    errorInvalid: 'Please enter a valid date of birth in the past.',
    ages: 'Ages',
    years: 'Years',
  },
  hi: {
    badge: 'निःशुल्क विवाह भविष्यवाणी · जन्म तिथि से',
    subtitle:
      'निःशुल्क विवाह भविष्यवाणी — मेरी शादी कब होगी, जन्म तिथि से। विवाह की आयु, प्रेम या अरेंज मैरिज, और जीवनसाथी से मुलाकात। कोई साइन-अप नहीं।',
    dob: 'जन्म तिथि',
    time: 'जन्म का समय (वैकल्पिक)',
    place: 'जन्म स्थान (वैकल्पिक)',
    name: 'आपका नाम (वैकल्पिक)',
    timeHint: 'जन्म का समय भविष्यवाणी को और सटीक बनाता है — इससे लग्न और भाव तय होते हैं। बिना समय के भी आयु की सीमा मिलती है।',
    getPrediction: 'मेरी विवाह भविष्यवाणी देखें',
    yourPrediction: 'आपकी विवाह भविष्यवाणी',
    ageRange: 'विवाह की अनुमानित आयु',
    window: 'विवाह का समय',
    peak: 'इस अवधि का सबसे शुभ वर्ष',
    lean: 'प्रेम विवाह या अरेंज मैरिज?',
    meeting: 'मुलाकात कब हो सकती है',
    partner: 'जीवनसाथी — संकेत',
    working: 'भविष्यवाणी कैसे निकाली गई',
    seventhHouse: 'सप्तम भाव',
    venus: 'शुक्र',
    jupiter: 'गुरु',
    dasha: 'दशा',
    nakshatra: 'नक्षत्र',
    lagna: 'लग्न का आधार',
    ascendant: 'लग्न',
    moonSign: 'चंद्र लग्न',
    loveLean: 'प्रेम विवाह की ओर',
    arrangedLean: 'अरेंज मैरिज की ओर',
    balancedLean: 'संतुलित — दोनों संभव',
    strongLean: 'मज़बूत संकेत',
    moderateLean: 'मध्यम संकेत',
    balancedStrength: 'संतुलित',
    download: 'कार्ड डाउनलोड करें',
    share: 'शेयर करें',
    again: 'फिर से गणना करें',
    generating: 'बन रहा है…',
    downloaded: 'विवाह भविष्यवाणी कार्ड डाउनलोड हो गया!',
    downloadFail: 'तस्वीर नहीं बन सकी। फिर से कोशिश करें।',
    errorNoDob: 'कृपया अपनी जन्म तिथि डालें।',
    errorInvalid: 'कृपया अतीत की सही जन्म तिथि डालें।',
    ages: 'आयु',
    years: 'वर्ष',
  },
};

export const MarriagePredictionTool: React.FC<Props> = () => {
  const [dob, setDob] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [name, setName] = useState('');
  const [lang, setLang] = useState<Lang>('en');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<MarriagePrediction | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const t = STRINGS[lang];
  const [minAge, maxAge] = result ? result.marriageAgeRange : [0, 0];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) {
      setError(t.errorNoDob);
      return;
    }
    const d = new Date(dob);
    if (isNaN(d.getTime()) || d.getTime() > Date.now()) {
      setError(t.errorInvalid);
      return;
    }
    setError('');
    setIsCalculating(true);
  };

  const handleLoaderComplete = () => {
    const prediction = predictMarriage(
      dob,
      birthTime || undefined,
      birthPlace || undefined,
      name || undefined,
    );
    setIsCalculating(false);
    if (!prediction) {
      setError(t.errorInvalid);
      return;
    }
    setResult(prediction);
  };

  const handleRetake = () => {
    setResult(null);
    setError('');
  };

  const handleDownload = async () => {
    if (!result) return;
    try {
      setDownloading(true);
      const partnerLine =
        lang === 'hi' ? result.partnerIndicationsHi[0] : result.partnerIndications[0];
      const leanLabel =
        result.loveOrArranged.lean === 'love'
          ? t.loveLean
          : result.loveOrArranged.lean === 'arranged'
            ? t.arrangedLean
            : t.balancedLean;
      const blob = await generateCardImageBlob({
        type: 'marriage',
        names: { person1: result.name || (lang === 'hi' ? 'आपकी भविष्यवाणी' : 'Your Prediction'), person2: '' },
        word: `${minAge}–${maxAge}`,
        tagline:
          lang === 'hi'
            ? `विवाह ${minAge}–${maxAge} वर्ष की आयु में · ${leanLabel}`
            : `Marriage at age ${minAge}–${maxAge} · ${leanLabel}`,
        suggestion:
          partnerLine.length > 180 ? `${partnerLine.slice(0, 177)}…` : partnerLine,
        tip: `${t.dasha}: ${result.working.dashaAtMarriage} · ${t.seventhHouse}: ${result.working.seventhHouseSign}`,
        details: `${t.window}: ${result.marriageWindowLabel} (${result.marriageWindowYears})`,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Marriage-Prediction-${minAge}-${maxAge}.png`;
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
      ? `मेरी विवाह भविष्यवाणी: ${minAge}–${maxAge} वर्ष की आयु में (${result.marriageWindowYears})। ${result.loveOrArranged.reasonHi}`
      : `My marriage prediction: age ${minAge}–${maxAge} (${result.marriageWindowYears}). ${result.loveOrArranged.reason}`
    : '';

  const leanLabel = result
    ? result.loveOrArranged.lean === 'love'
      ? t.loveLean
      : result.loveOrArranged.lean === 'arranged'
        ? t.arrangedLean
        : t.balancedLean
    : '';
  const strengthLabel = result
    ? result.loveOrArranged.strength === 'strong'
      ? t.strongLean
      : result.loveOrArranged.strength === 'moderate'
        ? t.moderateLean
        : t.balancedStrength
    : '';

  return (
    <div className="w-full">
      {/* ─── Calculating Loader ─── */}
      {isCalculating && (
        <CalculationLoader
          name1={name || (lang === 'hi' ? 'आपकी कुंडली' : 'Your Chart')}
          name2={lang === 'hi' ? 'हिन्दी' : 'English'}
          type="marriage"
          minDuration={1600}
          maxDuration={2200}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* ─── Result View ─── */}
      {!isCalculating && result && (
        <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
          {/* Result Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500 p-6 sm:p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 mb-3 shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-white text-white" />
                <span>{t.yourPrediction}</span>
              </span>
              <div className="text-5xl sm:text-6xl font-extrabold tracking-tight font-display">
                {minAge}–{maxAge}
              </div>
              <p className="text-sm sm:text-base font-semibold mt-2">{t.ageRange}</p>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium mt-2 max-w-xl mx-auto">
                {t.window}: {result.marriageWindowLabel} ({result.marriageWindowYears})
                {' · '}
                {t.peak}: {result.peakAge}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            {/* Honesty note */}
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-center bg-indigo-50/60 border border-indigo-100 rounded-2xl px-4 py-3">
              {lang === 'hi' ? result.honestyNoteHi : result.honestyNote}
            </p>

            {/* Lean */}
            <div className="mt-6 rounded-2xl border border-indigo-100 bg-white p-5">
              <h3 className="text-sm font-bold text-slate-900 font-display mb-1 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                {t.lean} — {leanLabel}
              </h3>
              <p className="text-xs text-indigo-600 font-semibold mb-2">{strengthLabel}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'hi' ? result.loveOrArranged.reasonHi : result.loveOrArranged.reason}
              </p>
            </div>

            {/* Meeting window */}
            <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50/50 p-5">
              <h3 className="text-sm font-bold text-slate-900 font-display mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-500" />
                {t.meeting}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {result.meetingWindowLabel} ({result.meetingWindowYears})
              </p>
            </div>

            {/* Partner indications */}
            <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 className="text-sm font-bold text-slate-900 font-display mb-2">{t.partner}</h3>
              <ul className="space-y-2">
                {(lang === 'hi' ? result.partnerIndicationsHi : result.partnerIndications).map(
                  (line, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-600 leading-relaxed flex gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Working */}
            <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {t.working}
              </p>
              <div className="space-y-2 text-sm text-slate-800">
                <p>
                  <span className="font-semibold">{t.lagna}: </span>
                  {result.working.lagnaSign} (
                  {result.working.lagnaBasis === 'ascendant' ? t.ascendant : t.moonSign})
                </p>
                <p>
                  <span className="font-semibold">{t.seventhHouse}: </span>
                  {result.working.seventhHouseSign} — {lang === 'hi' ? 'स्वामी' : 'ruled by'}{' '}
                  {result.working.seventhLord}
                </p>
                <p>
                  <span className="font-semibold">{t.venus}: </span>
                  {result.working.venusSign} · <span className="font-semibold">{t.jupiter}: </span>
                  {result.working.jupiterSign}
                </p>
                <p>
                  <span className="font-semibold">{t.dasha}: </span>
                  {result.working.dashaAtMarriage} ({t.ages} {result.working.dashaStartAge}–
                  {result.working.dashaEndAge})
                </p>
                <p>
                  <span className="font-semibold">{t.nakshatra}: </span>
                  {result.working.nakshatra}
                </p>
              </div>
              {!result.hasBirthTime && (
                <p className="text-xs text-slate-500 mt-3">
                  {lang === 'hi'
                    ? 'जन्म का समय दिए बिना सप्तम भाव चंद्र लग्न से पढ़ा गया है — समय देने पर भविष्यवाणी और सटीक होती है।'
                    : 'Without a birth time, the 7th house is read from the Moon sign — adding your birth time sharpens the reading.'}
                </p>
              )}
            </div>

            {notice && (
              <p className="text-sm text-emerald-600 font-semibold text-center mt-4">{notice}</p>
            )}

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
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 mb-3 shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-white text-white" />
                <span>{t.badge}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                {lang === 'hi' ? 'मेरी शादी कब होगी?' : 'When Will I Get Married?'}
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium mt-2 max-w-xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="p-5 sm:p-8">
            {/* Language toggle */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all min-h-[40px] ${
                  lang === 'en'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all min-h-[40px] ${
                  lang === 'hi'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  {t.dob}
                </span>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[48px]"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  {t.time}
                </span>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[48px]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  {t.place}
                </span>
                <input
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  placeholder={lang === 'hi' ? 'जैसे: लाहौर, पाकिस्तान' : 'e.g. Lahore, Pakistan'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[48px]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <User className="w-4 h-4 text-indigo-600" />
                  {t.name}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'hi' ? 'आपका नाम' : 'Your name'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[48px]"
                />
              </label>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mt-4">{t.timeHint}</p>

            {error && (
              <p className="text-sm text-rose-600 font-semibold text-center mt-4">{error}</p>
            )}

            <button
              type="submit"
              className="w-full mt-6 py-4 px-6 rounded-2xl text-center text-sm sm:text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 min-h-[52px]"
            >
              <span>{t.getPrediction}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ─── Share Modal ─── */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={
          result
            ? lang === 'hi'
              ? `मेरी विवाह भविष्यवाणी: ${minAge}–${maxAge} वर्ष`
              : `My Marriage Prediction: Age ${minAge}–${maxAge}`
            : lang === 'hi'
              ? 'मेरी विवाह भविष्यवाणी'
              : 'My Marriage Prediction'
        }
        shareText={shareText}
        url="https://calculatelove.online/when-will-i-get-married/"
      />
    </div>
  );
};
