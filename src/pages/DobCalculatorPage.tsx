import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShareModal } from '../components/ShareModal';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { calculateDobCompatibility } from '../lib/calculatorEngine';
import { Calendar, RotateCcw, Share2, Sparkles, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const DobCalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [dob1, setDob1] = useState('');
  const [name2, setName2] = useState('');
  const [dob2, setDob2] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateDobCompatibility> | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !dob1 || !name2.trim() || !dob2) {
      setError('Please provide names and dates of birth for both individuals.');
      return;
    }
    setError('');
    const res = calculateDobCompatibility(name1, dob1, name2, dob2);
    setResult(res);
  };

  const handleReset = () => {
    setName1('');
    setDob1('');
    setName2('');
    setDob2('');
    setResult(null);
    setError('');
  };

  const faqs = [
    {
      question: 'How is love compatibility calculated using dates of birth?',
      answer:
        'Birth dates are reduced to single-digit Life Path numbers (1 through 9). Each number represents specific archetypal temperament traits. Our calculator analyzes the natural harmonic triplicities between the two numbers.',
    },
    {
      question: 'Is this calculation the same as Vedic Kundli Milan (Horoscope Matching)?',
      answer:
        'No. Vedic Kundli Milan involves detailed birth times, planetary degrees, Nakshatra lords, and Ashta Kuta (36 Gunas). Our DOB tool provides a numerological Life Path alignment for entertainment and personal reflection, clearly separated from traditional astrological consultations.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Love Calculator by Date of Birth',
    'url': 'https://milanmeter.com/love-calculator-by-date-of-birth/',
    'description': 'Discover birth date compatibility and Life Path vibrational harmony using deterministic numerological principles.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Calculator by Date of Birth - DOB Compatibility | MilanMeter"
        description="Calculate love compatibility by date of birth and discover your Life Path number harmony with MilanMeter. Deterministic, fun, and private birth date test."
        canonicalPath="/love-calculator-by-date-of-birth/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/love-calculator/' },
          { label: 'Love Calculator by DOB' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Love Calculator by Date of Birth
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Explore your Life Path number alignment and birth date compatibility. Deterministic numerological calculation.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {!result ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleCalculate} className="space-y-5">
              {/* Partner 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  First Person
                </span>
                <div>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Your Name"
                    maxLength={50}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dob1" className="block text-[11px] font-medium text-slate-500 mb-1">
                    Date of Birth
                  </label>
                  <input
                    id="dob1"
                    type="date"
                    value={dob1}
                    onChange={(e) => setDob1(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 min-h-[44px]"
                    required
                  />
                </div>
              </div>

              {/* Partner 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Second Person
                </span>
                <div>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Partner / Crush Name"
                    maxLength={50}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dob2" className="block text-[11px] font-medium text-slate-500 mb-1">
                    Date of Birth
                  </label>
                  <input
                    id="dob2"
                    type="date"
                    value={dob2}
                    onChange={(e) => setDob2(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 min-h-[44px]"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md min-h-[48px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Calculate DOB Compatibility</span>
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic Life Path reduction · 100% Private</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-rose-200 shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Life Path Vibration</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {name1} & {name2}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{result.harmonyStatus}</p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50/80 to-white rounded-2xl border border-rose-100 mb-6">
              <span className="text-4xl font-extrabold text-slate-900 font-display tabular-nums">
                {result.score}%
              </span>
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mt-1">
                Life Path Compatibility Score
              </span>
            </div>

            {/* Life Path Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[11px] text-slate-500 block">{name1}</span>
                <span className="font-bold text-slate-900 text-sm">Life Path {result.lp1}</span>
                <p className="text-slate-600 mt-1 text-[11px]">{result.meaning1}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[11px] text-slate-500 block">{name2}</span>
                <span className="font-bold text-slate-900 text-sm">Life Path {result.lp2}</span>
                <p className="text-slate-600 mt-1 text-[11px]">{result.meaning2}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200/60">
              {result.summary}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm min-h-[44px]"
              >
                <Share2 className="w-4 h-4" />
                <span>Share DOB Result</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Calculate Another DOB</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {result && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          title="MilanMeter DOB Compatibility"
          shareText={`📅 Date of Birth Compatibility: ${name1} (Life Path ${result.lp1}) & ${name2} (Life Path ${result.lp2}) scored ${result.score}% on MilanMeter!`}
          url="https://milanmeter.com/love-calculator-by-date-of-birth/"
        />
      )}

      <RelatedTools currentToolId="love-calculator-by-date-of-birth" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['love-compatibility-by-date-of-birth', 'how-love-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
