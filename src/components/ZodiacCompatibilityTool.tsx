import React, { useState } from 'react';
import { ALL_ZODIAC_SIGNS, findZodiacDetails } from '../lib/zodiacEngine';
import {
  checkCompatibility,
  CompatibilityMode,
  CompatibilityResult,
  signsFromDobs,
} from '../lib/zodiacCompatibilityEngine';
import { CalculationLoader } from './CalculationLoader';
import { ShareModal } from './ShareModal';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import {
  Heart,
  Calendar,
  Sparkles,
  ArrowRight,
  AlertCircle,
  RotateCcw,
  Download,
  Share2,
  MessageCircle,
  ShieldAlert,
  Users,
  User,
  Scale,
  Star,
  Gem,
  Clock,
  MapPin,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const ZodiacCompatibilityTool: React.FC<Props> = ({ onNavigate }) => {
  const [signId1, setSignId1] = useState<string | null>(null);
  const [signId2, setSignId2] = useState<string | null>(null);
  const [dob1, setDob1] = useState('');
  const [dob2, setDob2] = useState('');
  const [birthTime1, setBirthTime1] = useState('');
  const [birthTime2, setBirthTime2] = useState('');
  const [place1, setPlace1] = useState('');
  const [place2, setPlace2] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [mode, setMode] = useState<CompatibilityMode>('western');
  const [birthChartMode, setBirthChartMode] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

  const selectedSign1 = signId1
    ? ALL_ZODIAC_SIGNS.find((s) => s.id === signId1) ?? null
    : null;
  const selectedSign2 = signId2
    ? ALL_ZODIAC_SIGNS.find((s) => s.id === signId2) ?? null
    : null;

  const handleDobChange = (which: 1 | 2, value: string) => {
    if (which === 1) {
      setDob1(value);
      if (value && value.length === 10) {
        const [sign] = signsFromDobs(value, dob2 || '2000-01-01');
        setSignId1(sign.id);
      }
    } else {
      setDob2(value);
      if (value && value.length === 10) {
        const [, sign] = signsFromDobs(dob1 || '2000-01-01', value);
        setSignId2(sign.id);
      }
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!signId1 || !signId2) {
      setError('Please choose both zodiac signs — or enter both dates of birth.');
      return;
    }
    setIsCalculating(true);
  };

  const handleLoaderComplete = () => {
    setIsCalculating(false);
    if (!signId1 || !signId2) {
      setError('Could not generate a reading right now — please try again.');
      return;
    }
    let moonSign1: string | undefined;
    let moonSign2: string | undefined;
    if (birthChartMode && birthTime1 && birthTime2 && dob1 && dob2) {
      try {
        moonSign1 = findZodiacDetails(dob1, birthTime1).moonSign.name;
        moonSign2 = findZodiacDetails(dob2, birthTime2).moonSign.name;
      } catch {
        moonSign1 = undefined;
        moonSign2 = undefined;
      }
    }
    const res = checkCompatibility({
      signId1,
      signId2,
      mode,
      moonSign1,
      moonSign2,
    });
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
      const blob = await generateCardImageBlob({
        type: 'love',
        names: {
          person1: name1.trim() || `${result.sign1.glyph} ${result.sign1.name}`,
          person2: name2.trim() || `${result.sign2.glyph} ${result.sign2.name}`,
        },
        score: result.score,
        tagline: result.verdict,
        suggestion: result.loveLine,
        tip: result.whatWorks,
        details: `${result.elementPair} · ${result.sign1.modality} × ${result.sign2.modality}`,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Zodiac-Compatibility-${result.sign1.name}-${result.sign2.name}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setNotice('Shareable zodiac compatibility card downloaded!');
      setTimeout(() => setNotice(null), 3000);
    } catch {
      setNotice('Could not generate image. Please try again.');
      setTimeout(() => setNotice(null), 4000);
    } finally {
      setDownloading(false);
    }
  };

  const shareText = result
    ? `${name1.trim() || result.sign1.name} × ${name2.trim() || result.sign2.name}: ${result.score}% zodiac compatibility — ${result.verdict}`
    : '';

  const personCard = (
    which: 1 | 2,
    signId: string | null,
    setSignId: (id: string) => void,
    dob: string,
    name: string,
    setName: (v: string) => void,
    birthTime: string,
    setBirthTime: (v: string) => void,
    place: string,
    setPlace: (v: string) => void,
    label: string,
  ) => {
    const selected = signId
      ? ALL_ZODIAC_SIGNS.find((s) => s.id === signId) ?? null
      : null;
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
        <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-600" />
          <span>{label}</span>
        </p>
        <div className="grid grid-cols-4 gap-2">
          {ALL_ZODIAC_SIGNS.map((sign) => (
            <button
              key={sign.id}
              type="button"
              onClick={() => setSignId(sign.id)}
              className={`rounded-xl border p-2 text-center transition-all min-h-[64px] ${
                signId === sign.id
                  ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50'
              }`}
            >
              <span className="block text-xl leading-none mb-1">{sign.glyph}</span>
              <span className="block text-[11px] font-bold text-slate-800">{sign.name}</span>
            </button>
          ))}
        </div>
        <label className="block text-xs font-bold text-slate-700 mt-3 mb-1 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span>Or date of birth</span>
        </label>
        <input
          type="date"
          value={dob}
          onChange={(e) => handleDobChange(which, e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden text-sm transition-all bg-white"
        />
        {selected && dob && (
          <p className="text-xs text-indigo-700 font-semibold mt-2">
            Your sign is {selected.glyph} {selected.name} ({selected.dates})
          </p>
        )}
        <label className="block text-xs font-bold text-slate-700 mt-3 mb-1">
          Name (optional)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name"
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden text-sm transition-all bg-white"
        />
        {birthChartMode && (
          <>
            <label className="block text-xs font-bold text-slate-700 mt-3 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Birth time (optional)</span>
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden text-sm transition-all bg-white"
            />
            <label className="block text-xs font-bold text-slate-700 mt-3 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>Birth place (optional)</span>
            </label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="City, country"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden text-sm transition-all bg-white"
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* ─── Calculating Loader ─── */}
      {isCalculating && selectedSign1 && selectedSign2 && (
        <CalculationLoader
          name1={`${selectedSign1.glyph} ${selectedSign1.name}`}
          name2={`${selectedSign2.glyph} ${selectedSign2.name}`}
          type="love"
          minDuration={1600}
          maxDuration={2200}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* ─── Result View ─── */}
      {!isCalculating && result && (
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
                <Heart className="w-3.5 h-3.5 fill-white text-white" />
                <span>
                  {result.sign1.glyph} {result.sign1.name} × {result.sign2.glyph}{' '}
                  {result.sign2.name}
                </span>
              </span>
              <div className="text-6xl sm:text-7xl font-extrabold tracking-tight font-display">
                {result.score}%
              </div>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium mt-2 max-w-xl mx-auto">
                {result.verdict}
              </p>
              <p className="text-[11px] text-indigo-200 mt-2">
                {result.mode === 'vedic'
                  ? `Vedic reading · ${result.sign1.rashiName} with ${result.sign2.rashiName}`
                  : `${result.sign1.element} × ${result.sign2.element} · ${result.sign1.modality} × ${result.sign2.modality}`}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            {/* What Works / What Needs Care */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>What works</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{result.whatWorks}</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-2">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>What needs care</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{result.whatNeedsCare}</p>
              </div>
            </div>

            {/* Love / Friendship / Marriage lines */}
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 flex gap-3">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">In love — </strong>
                  {result.loveLine}
                </p>
              </div>
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 flex gap-3">
                <Users className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">In friendship — </strong>
                  {result.friendshipLine}
                </p>
              </div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-4 flex gap-3">
                <Gem className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">In marriage — </strong>
                  {result.marriageLine}
                </p>
              </div>
            </div>

            {/* Working */}
            <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                How this score was worked out
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <Star className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{result.working.elements}</span>
                </li>
                <li className="flex gap-2">
                  <Scale className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{result.working.modalities}</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{result.working.rulingPlanets}</span>
                </li>
                {result.working.bestMatch && (
                  <li className="flex gap-2">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0 mt-0.5" />
                    <span>
                      These two signs are in each other&apos;s best matches — a traditional
                      sign of an easy pairing.
                    </span>
                  </li>
                )}
                {result.moonNote && (
                  <li className="flex gap-2">
                    <MessageCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{result.moonNote}</span>
                  </li>
                )}
              </ul>
              <p className="text-xs text-slate-500 mt-3">
                Element {result.working.elementBase} · Modality{' '}
                {result.working.modalityAdjust >= 0 ? '+' : ''}
                {result.working.modalityAdjust} · Ruling planets{' '}
                {result.working.planetAdjust >= 0 ? '+' : ''}
                {result.working.planetAdjust} · Best match{' '}
                {result.working.bestMatchBonus > 0
                  ? `+${result.working.bestMatchBonus}`
                  : '0'}
              </p>
              {result.vedicNote && (
                <p className="text-xs text-slate-500 mt-2">{result.vedicNote}</p>
              )}
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mt-6 text-center">
              A compatibility score is an astrological indication, not a verdict — it reads
              tendencies, not guarantees. The two people decide whether it works.
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
                <span>{downloading ? 'Generating...' : 'Download Card'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 active:scale-95 transition-all min-h-[44px]"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-700 transition-all min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" />
                Calculate Again
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
                <Heart className="w-3.5 h-3.5 fill-white text-white" />
                <span>Zodiac Compatibility · 100% Free Results</span>
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display mb-2">
                Love Compatibility by Zodiac Sign
              </h2>

              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium">
                Free zodiac sign compatibility — pick two signs, or two birth dates, and see
                how they match in love, friendship and marriage. No sign-up.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8 max-w-3xl mx-auto">
            <form onSubmit={handleCalculate} className="space-y-5">
              {/* Error Notice */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Two person cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personCard(
                  1,
                  signId1,
                  setSignId1,
                  dob1,
                  name1,
                  setName1,
                  birthTime1,
                  setBirthTime1,
                  place1,
                  setPlace1,
                  'Your sign',
                )}
                {personCard(
                  2,
                  signId2,
                  setSignId2,
                  dob2,
                  name2,
                  setName2,
                  birthTime2,
                  setBirthTime2,
                  place2,
                  setPlace2,
                  "Partner's sign",
                )}
              </div>

              {/* Mode toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Reading style</span>
                  </label>
                  <div className="flex rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMode('western')}
                      className={`flex-1 py-2.5 text-sm font-bold transition-all min-h-[44px] ${
                        mode === 'western'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-indigo-50'
                      }`}
                    >
                      Western
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('vedic')}
                      className={`flex-1 py-2.5 text-sm font-bold transition-all min-h-[44px] ${
                        mode === 'vedic'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-indigo-50'
                      }`}
                    >
                      Vedic
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Birth-chart mode</span>
                  </label>
                  <div className="flex rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setBirthChartMode(false)}
                      className={`flex-1 py-2.5 text-sm font-bold transition-all min-h-[44px] ${
                        !birthChartMode
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-indigo-50'
                      }`}
                    >
                      Sun signs
                    </button>
                    <button
                      type="button"
                      onClick={() => setBirthChartMode(true)}
                      className={`flex-1 py-2.5 text-sm font-bold transition-all min-h-[44px] ${
                        birthChartMode
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-indigo-50'
                      }`}
                    >
                      Sun, Moon &amp; rising
                    </button>
                  </div>
                </div>
              </div>

              {birthChartMode && (
                <p className="text-xs text-slate-500 leading-relaxed">
                  Birth-chart mode adds the Moon signs to the reading when both birth times
                  are given. The full chart for one person is drawn by the Birth Chart
                  Calculator.
                </p>
              )}

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>
                    <strong>Love, friendship &amp; marriage:</strong> one pair, three readings
                    — plus the working behind the score.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>
                    <strong>Any two people:</strong> the signs do not change with the genders
                    of the two people — the tool reads any two signs.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>
                    <strong>100% Free &amp; Private:</strong> results generated instantly on
                    your device.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl text-center text-sm sm:text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 min-h-[52px]"
              >
                <span>Check Compatibility</span>
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
        title={
          result
            ? `${result.sign1.name} × ${result.sign2.name} Zodiac Compatibility`
            : 'Zodiac Compatibility'
        }
        shareText={shareText}
        url="https://calculatelove.online/love-compatibility-by-zodiac-sign/"
      />
    </div>
  );
};
