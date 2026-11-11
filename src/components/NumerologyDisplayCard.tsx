import React, { useState } from 'react';
import {
  FullNumerologyReading,
  MobileNumerologyResult,
  VehicleNumerologyResult,
  BusinessNumerologyResult,
} from '../lib/numerologyCalculatorEngine';
import {
  Hash,
  Sparkles,
  Printer,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Phone,
  Car,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import { CalculateLoveLogo } from './CalculateLoveLogo';

interface NumerologyDisplayCardProps {
  reading: FullNumerologyReading | null;
  mobileResult: MobileNumerologyResult | null;
  vehicleResult: VehicleNumerologyResult | null;
  businessResult: BusinessNumerologyResult | null;
  activeTab: 'full' | 'mobile' | 'vehicle' | 'business';
  onRetake: () => void;
}

export const NumerologyDisplayCard: React.FC<NumerologyDisplayCardProps> = ({
  reading,
  mobileResult,
  vehicleResult,
  businessResult,
  activeTab,
  onRetake,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      let titleName = 'You';
      let scoreNum = 1;
      let tagline = 'Numerology Reading';
      let details = 'Chaldean & Pythagorean Numerology';

      if (activeTab === 'mobile' && mobileResult) {
        titleName = `Mobile: ${mobileResult.fullNumber}`;
        scoreNum = mobileResult.rootNumber;
        tagline = `Mobile Root Number: ${mobileResult.rootNumber} (${mobileResult.harmonyWithDob})`;
        details = `Full Sum: ${mobileResult.totalDigitsSum} · Last-4 Sum: ${mobileResult.last4Sum}`;
      } else if (activeTab === 'vehicle' && vehicleResult) {
        titleName = `Vehicle: ${vehicleResult.plate}`;
        scoreNum = vehicleResult.rootNumber;
        tagline = `Vehicle Root Number: ${vehicleResult.rootNumber} (${vehicleResult.harmonyWithDob})`;
        details = `Plate Sum: ${vehicleResult.totalSum}`;
      } else if (activeTab === 'business' && businessResult) {
        titleName = businessResult.businessName;
        scoreNum = businessResult.chaldeanRoot;
        tagline = `Business Chaldean Number: ${businessResult.chaldeanRoot} (Compound ${businessResult.chaldeanCompound})`;
        details = businessResult.industrySuitability;
      } else if (reading) {
        titleName = reading.name || 'Your Reading';
        scoreNum = reading.primaryLuckyNumber;
        tagline = `Lucky Number ${reading.primaryLuckyNumber} · Fortune Number ${reading.fortuneNumber}`;
        details = `Ruler: ${reading.mainMeaning.ruler} · Today's Lucky: ${reading.todaysLuckyNumber}`;
      }

      const blob = await generateCardImageBlob({
        type: 'numerology',
        names: { person1: titleName, person2: '' },
        score: scoreNum,
        tagline,
        suggestion: reading ? reading.mainMeaning.description : 'Numerology vibration analysis.',
        tip: reading ? `Lucky Colors: ${reading.luckyColors.join(', ')} · Favorable Days: ${reading.favorableDays.join(', ')}` : '',
        details,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Numerology-Report-${titleName.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setNotice('Shareable numerology card downloaded!');
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
      let text = '';
      if (activeTab === 'mobile' && mobileResult) {
        text = `Mobile Number Numerology: ${mobileResult.fullNumber}\n` +
          `Root Number: ${mobileResult.rootNumber} (${mobileResult.meaning.title})\n` +
          `Last 4 Digits Root: ${mobileResult.last4Root}\n` +
          `Vibe: ${mobileResult.harmonyWithDob}\nhttps://calculatelove.online/numerology-calculator/`;
      } else if (activeTab === 'vehicle' && vehicleResult) {
        text = `Vehicle Plate Numerology: ${vehicleResult.plate}\n` +
          `Root Number: ${vehicleResult.rootNumber} (${vehicleResult.meaning.title})\n` +
          `Status: ${vehicleResult.harmonyWithDob}\nhttps://calculatelove.online/numerology-calculator/`;
      } else if (activeTab === 'business' && businessResult) {
        text = `Business Name Numerology: ${businessResult.businessName}\n` +
          `Chaldean Root: ${businessResult.chaldeanRoot} (Compound ${businessResult.chaldeanCompound})\n` +
          `Pythagorean Root: ${businessResult.pythagoreanRoot}\n` +
          `Recommended Industry: ${businessResult.industrySuitability}\nhttps://calculatelove.online/numerology-calculator/`;
      } else if (reading) {
        text = `Numerology Reading for ${reading.name || 'You'}:\n` +
          `• Primary Lucky Number: ${reading.primaryLuckyNumber}\n` +
          `• Fortune Number: ${reading.fortuneNumber}\n` +
          `• Today's Lucky Number: ${reading.todaysLuckyNumber}\n` +
          (reading.dobResult ? `• Birth Day Root: ${reading.dobResult.birthDayNumber}\n• Life Path: ${reading.dobResult.lifePathNumber}\n` : '') +
          (reading.chaldean ? `• Chaldean Name Root: ${reading.chaldean.singleNumber} (Compound ${reading.chaldean.compoundNumber})\n` : '') +
          (reading.pythagorean ? `• Pythagorean Name Root: ${reading.pythagorean.singleNumber}\n` : '') +
          `• Ruling Planet: ${reading.mainMeaning.ruler}\n` +
          `• Friendly Numbers: ${reading.friendlyNumbers.join(', ')}\n` +
          `Calculate free at: https://calculatelove.online/numerology-calculator/`;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setNotice('Reading copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setNotice(null);
      }, 3000);
    } catch {
      setNotice('Failed to copy. Please select and copy manually.');
      setTimeout(() => setNotice(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden printable-result-card animate-in fade-in duration-300">
      {notice && (
        <div className="bg-slate-900 text-white text-xs font-semibold py-2 px-4 text-center sticky top-0 z-20 animate-in fade-in duration-200">
          {notice}
        </div>
      )}

      {/* Decorative Top Accent Bar */}
      <div className="h-2.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-500" />

      <div className="p-5 sm:p-8">
        {/* Printable-only header */}
        <div className="hidden print:flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-2">
            <CalculateLoveLogo size={32} showWordmark={true} />
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-purple-600 block">calculatelove.online/numerology-calculator/</span>
            <span className="text-[10px] text-slate-400">Free Chaldean & Pythagorean Numerology Report</span>
          </div>
        </div>

        {/* ─── Mode 1: Full / Date of Birth / Name Reading ─── */}
        {activeTab === 'full' && reading && (
          <div>
            {/* Hero Header */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
                <span>Chaldean & Pythagorean Numerology Result</span>
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mb-2">
                {reading.name ? `${reading.name}'s Numerology Chart` : 'Your Personal Numerology Chart'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600">
                Calculated by date of birth and name vibrations, showing your core numbers, lucky numbers, and planetary ruler.
              </p>
            </div>

            {/* Lucky Number & Fortune Number Hero Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {/* Card 1: Primary Lucky Number */}
              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50/60 border-2 border-purple-200 p-5 text-center shadow-xs">
                <span className="text-[11px] font-extrabold text-purple-600 uppercase tracking-wider block mb-1">
                  Primary Lucky Number
                </span>
                <div className="text-4xl sm:text-5xl font-black text-purple-900 font-display mb-1">
                  {reading.primaryLuckyNumber}
                </div>
                <span className="text-xs font-semibold text-purple-700">
                  {reading.mainMeaning.title}
                </span>
              </div>

              {/* Card 2: Fortune Number */}
              <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border-2 border-amber-200 p-5 text-center shadow-xs">
                <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wider block mb-1">
                  Fortune Number (Destiny)
                </span>
                <div className="text-4xl sm:text-5xl font-black text-amber-950 font-display mb-1">
                  {reading.fortuneNumber}
                </div>
                <span className="text-xs font-semibold text-amber-800">
                  Overall Life Direction
                </span>
              </div>

              {/* Card 3: Today's Lucky Number */}
              <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50/60 border-2 border-rose-200 p-5 text-center shadow-xs">
                <span className="text-[11px] font-extrabold text-rose-600 uppercase tracking-wider block mb-1">
                  Today's Lucky Number
                </span>
                <div className="text-4xl sm:text-5xl font-black text-rose-900 font-display mb-1">
                  {reading.todaysLuckyNumber}
                </div>
                <span className="text-xs font-semibold text-rose-700">
                  Daily Cosmic Harmonic
                </span>
              </div>
            </div>

            {/* ─── Chaldean & Pythagorean Comparison Side-by-Side ─── */}
            <div className="rounded-2xl border border-slate-200 p-5 sm:p-6 mb-8 bg-slate-50/70">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-1 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" />
                <span>Chaldean vs. Pythagorean Name Numbers</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Both classical traditions side by side — Chaldean (sound-based 1-8) and Pythagorean (alphabet order 1-9).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Chaldean Column */}
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-purple-100 shadow-2xs">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-100 mb-3">
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                      Chaldean System
                    </span>
                    <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-semibold">
                      Sound-Based (1-8)
                    </span>
                  </div>

                  {reading.chaldean ? (
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-600">Compound Total:</span>
                        <span className="font-bold text-slate-800">{reading.chaldean.compoundNumber}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-600">Name Root Number:</span>
                        <span className="font-bold text-purple-700 text-base">{reading.chaldean.singleNumber}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-600">Soul Urge (Vowels):</span>
                        <span className="font-semibold text-slate-800">{reading.chaldean.soulUrgeNumber}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-600">Personality (Consonants):</span>
                        <span className="font-semibold text-slate-800">{reading.chaldean.personalityNumber}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Enter your full name above to see Chaldean values.</p>
                  )}
                </div>

                {/* Pythagorean Column */}
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-indigo-100 shadow-2xs">
                  <div className="flex items-center justify-between pb-2 border-b border-indigo-100 mb-3">
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                      Pythagorean System
                    </span>
                    <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-semibold">
                      Alphabet-Order (1-9)
                    </span>
                  </div>

                  {reading.pythagorean ? (
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-600">Raw Total:</span>
                        <span className="font-bold text-slate-800">{reading.pythagorean.totalRaw}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-600">Expression / Destiny Root:</span>
                        <span className="font-bold text-indigo-700 text-base">{reading.pythagorean.singleNumber}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-600">Heart's Desire (Vowels):</span>
                        <span className="font-semibold text-slate-800">{reading.pythagorean.soulUrgeNumber}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-600">Outer Personality:</span>
                        <span className="font-semibold text-slate-800">{reading.pythagorean.personalityNumber}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Enter your full name above to see Pythagorean values.</p>
                  )}
                </div>
              </div>
            </div>

            {/* ─── Lo Shu Grid (3x3 Numerology Chart) ─── */}
            {reading.dobResult && (
              <div className="rounded-2xl border border-slate-200 p-5 sm:p-6 mb-8 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                      Lo Shu Numerology Grid (Date of Birth Chart)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Vedic 3x3 birth chart showing the frequency and presence of cosmic elements in your date of birth.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                    {reading.dobResult.dayOfWeek} Born
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto text-center my-4 font-mono">
                  {/* Traditional Lo Shu Layout:
                      4  9  2
                      3  5  7
                      8  1  6
                  */}
                  {[
                    { num: 4, label: 'Wood / Wealth' },
                    { num: 9, label: 'Fire / Fame' },
                    { num: 2, label: 'Earth / Love' },
                    { num: 3, label: 'Wood / Family' },
                    { num: 5, label: 'Earth / Balance' },
                    { num: 7, label: 'Metal / Kids' },
                    { num: 8, label: 'Earth / Wisdom' },
                    { num: 1, label: 'Water / Career' },
                    { num: 6, label: 'Metal / Travel' },
                  ].map((cell) => {
                    const count = reading.dobResult?.loShuGrid[cell.num] || 0;
                    const isPresent = count > 0;
                    return (
                      <div
                        key={cell.num}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center min-h-[72px] transition-all ${
                          isPresent
                            ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-2xs font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-300'
                        }`}
                      >
                        <span className="text-lg sm:text-xl font-extrabold">{cell.num}</span>
                        <span className="text-[10px] mt-0.5">
                          {isPresent ? (count > 1 ? `(${count}x)` : '✓') : '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── Harmonious & Unlucky Numbers + Favorable Elements ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Friendly & Clash Numbers */}
              <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100">
                <h4 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Friendly & Challenging Numbers</span>
                </h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium">Friendly Numbers:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                      {reading.friendlyNumbers.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium">Clash Numbers:</span>
                    <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                      {reading.unluckyNumbers.length > 0 ? reading.unluckyNumbers.join(', ') : 'None major'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                    * Clashing numbers represent contrasting planetary energies in traditional numerology, not harmful forces.
                  </p>
                </div>
              </div>

              {/* Favorable Days & Colors */}
              <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
                <h4 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Ruling Planet & Astrological Elements</span>
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-600 font-medium">Governing Ruler: </span>
                    <span className="font-bold text-indigo-900">{reading.mainMeaning.ruler}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Lucky Days: </span>
                    <span className="font-semibold text-slate-800">{reading.favorableDays.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Lucky Colors: </span>
                    <span className="font-semibold text-slate-800">{reading.luckyColors.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep Description */}
            <div className="bg-amber-50/50 border border-amber-200/80 p-5 rounded-2xl mb-8">
              <h4 className="text-sm font-bold text-amber-900 mb-2">
                Vibration Insight: Number {reading.primaryLuckyNumber} — {reading.mainMeaning.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {reading.mainMeaning.description}
              </p>
            </div>
          </div>
        )}

        {/* ─── Mode 2: Mobile Number Reading ─── */}
        {activeTab === 'mobile' && mobileResult && (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 mb-2">
                <Phone className="w-3.5 h-3.5 text-purple-600" />
                <span>Mobile Number Numerology Result</span>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Phone Number: {mobileResult.fullNumber}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 p-6 text-center mb-6">
              <span className="text-xs font-extrabold text-purple-600 uppercase tracking-wider block mb-1">
                Mobile Root Number
              </span>
              <div className="text-5xl font-black text-purple-950 font-display mb-1">
                {mobileResult.rootNumber}
              </div>
              <span className="text-sm font-semibold text-purple-700 block mb-2">
                {mobileResult.meaning.title} (Governed by {mobileResult.meaning.ruler})
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-800 border border-purple-200 shadow-2xs">
                <span>Affinity Status:</span>
                <span className={mobileResult.harmonyWithDob === 'Highly Harmonious' ? 'text-emerald-600' : 'text-slate-700'}>
                  {mobileResult.harmonyWithDob}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">All Digits Sum:</span>
                <span className="font-bold text-slate-800">{mobileResult.totalDigitsSum} → Root {mobileResult.rootNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Last 4 Digits ({mobileResult.last4Digits}):</span>
                <span className="font-bold text-slate-800">Sum {mobileResult.last4Sum} → Root {mobileResult.last4Root}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-slate-700 leading-relaxed mb-6">
              {mobileResult.meaning.description}
            </div>
          </div>
        )}

        {/* ─── Mode 3: Vehicle Number Reading ─── */}
        {activeTab === 'vehicle' && vehicleResult && (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 mb-2">
                <Car className="w-3.5 h-3.5 text-purple-600" />
                <span>Vehicle / Car Plate Numerology</span>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Plate: {vehicleResult.plate}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-6 text-center mb-6">
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider block mb-1">
                Vehicle Root Number
              </span>
              <div className="text-5xl font-black text-amber-950 font-display mb-1">
                {vehicleResult.rootNumber}
              </div>
              <span className="text-sm font-semibold text-amber-800 block mb-2">
                Ruler: {vehicleResult.meaning.ruler}
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-800 border border-amber-200 shadow-2xs">
                <span>Vibe Match:</span>
                <span className={vehicleResult.harmonyWithDob === 'Lucky Fit' ? 'text-emerald-600' : 'text-slate-700'}>
                  {vehicleResult.harmonyWithDob}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Calculated Value (Letters + Digits):</span>
                <span className="font-bold text-slate-800">{vehicleResult.totalSum} → Root {vehicleResult.rootNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Safe Driving & Auspicious Colors:</span>
                <span className="font-semibold text-slate-800">{vehicleResult.meaning.luckyColors.join(', ')}</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── Mode 4: Business Name Reading ─── */}
        {activeTab === 'business' && businessResult && (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 mb-2">
                <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                <span>Business Name Numerology</span>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                {businessResult.businessName}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-center">
                <span className="text-[10px] uppercase font-bold text-purple-600 block">Chaldean (Trade Standard)</span>
                <div className="text-3xl font-black text-purple-900">{businessResult.chaldeanRoot}</div>
                <span className="text-xs text-purple-700">Compound {businessResult.chaldeanCompound}</span>
              </div>
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
                <span className="text-[10px] uppercase font-bold text-indigo-600 block">Pythagorean Root</span>
                <div className="text-3xl font-black text-indigo-900">{businessResult.pythagoreanRoot}</div>
                <span className="text-xs text-indigo-700">Expression Number</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm mb-6">
              <span className="font-bold text-emerald-900 block mb-1">Recommended Industry Alignment:</span>
              <p className="text-emerald-800">{businessResult.industrySuitability}</p>
            </div>
          </div>
        )}

        {/* ─── Action Controls ─── */}
        <div className="print:hidden pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all min-h-[44px]"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Results</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition-all shadow-xs min-h-[44px]"
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
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-700 hover:underline py-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recalculate / Change Input</span>
          </button>
        </div>
      </div>
    </div>
  );
};
