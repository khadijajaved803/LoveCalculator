import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { CalculationLoader } from '../components/CalculationLoader';
import { KundaliResultCard } from '../components/KundaliResultCard';
import {
  calculateKundaliMilan,
  KundaliMatchMode,
  KundaliMatchResult,
} from '../lib/kundaliEngine';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  HelpCircle,
  Award,
  ChevronDown,
  Layers,
  Star,
  Users,
} from 'lucide-react';
import kundaliMatchingGunaMilanImage from '../assets/images/kundali-matching-guna-milan-chart.webp';
import kundaliMatchingTwoChartsImage from '../assets/images/kundali-matching-two-birth-charts.webp';

interface Props {
  onNavigate: (path: string) => void;
}

export const KundaliMatchingPage: React.FC<Props> = ({ onNavigate }) => {
  // Mode selection: 'full' | 'name-only' | 'dob-only'
  const [mode, setMode] = useState<KundaliMatchMode>('full');

  // Partner 1 inputs
  const [name1, setName1] = useState('');
  const [dob1, setDob1] = useState('');
  const [time1, setTime1] = useState('');
  const [place1, setPlace1] = useState('');

  // Partner 2 inputs
  const [name2, setName2] = useState('');
  const [dob2, setDob2] = useState('');
  const [time2, setTime2] = useState('');
  const [place2, setPlace2] = useState('');

  // State
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<KundaliMatchResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation according to selected mode
    if (mode === 'full') {
      if (!name1.trim() || !name2.trim()) {
        setError('Please enter names for both Partner 1 and Partner 2.');
        return;
      }
      if (!dob1 || !dob2) {
        setError('Please select dates of birth for both partners.');
        return;
      }
    } else if (mode === 'name-only') {
      if (!name1.trim() || !name2.trim()) {
        setError('Please enter names for both partners to match by name.');
        return;
      }
    } else if (mode === 'dob-only') {
      if (!dob1 || !dob2) {
        setError('Please select dates of birth for both partners.');
        return;
      }
    }

    setIsCalculating(true);
    setTimeout(() => {
      const matchResult = calculateKundaliMilan(
        {
          name: name1.trim() || (mode === 'dob-only' ? 'Partner 1' : ''),
          dob: dob1,
          birthTime: time1,
          birthPlace: place1,
        },
        {
          name: name2.trim() || (mode === 'dob-only' ? 'Partner 2' : ''),
          dob: dob2,
          birthTime: time2,
          birthPlace: place2,
        },
        mode
      );
      setResult(matchResult);
      setIsCalculating(false);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 600);
  };

  const handleReset = () => {
    setResult(null);
    setName1('');
    setName2('');
    setDob1('');
    setDob2('');
    setTime1('');
    setTime2('');
    setPlace1('');
    setPlace2('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FAQ list matching page copy
  const faqs = [
    {
      question: 'How many gunas should match for a successful marriage?',
      answer:
        'At least 18 out of 36 gunas should match. 18–23 is acceptable, 24–31 is very good, and 32–36 is excellent. Always read the score together with the dosha check — a clean 20-point match can be better than a high score with a Nadi dosha.',
    },
    {
      question: 'How to check compatibility for marriage?',
      answer:
        'Compare the two kundalis: match the 36 gunas (gun milan), then check for Manglik dosha and Nadi dosha. Enter both partners\' names and dates of birth in the tool above and you get the guna score, the koota table and the dosha flags in one report. A marriage calculator by date of birth and a marriage calculator by name both score the same two charts — they just start from different inputs. You can read our detailed guide on love compatibility by date of birth to understand how birth numbers and cosmic alignments interact.',
    },
    {
      question: 'How to check horoscope for marriage?',
      answer:
        'Make both horoscopes from the date of birth (and birth time, if known), then match them guna by guna. If you do not have the birth time, match by date of birth only — the tool supports that mode. A marriage horoscope by date of birth free is the same report without paying for it.',
    },
    {
      question: 'How to match horoscopes for marriage?',
      answer:
        'Match the moon signs and Nakshatras first (that gives the guna score), then check the doshas. The four steps are on this page under "Horoscope Matching for Marriage": make both kundalis, match the gunas, check the doshas, read the verdict together. If you want to know how to check horoscope match for marriage or how to check match for marriage, that four-step process is the answer.',
    },
    {
      question: 'Can I do kundali matching by name only?',
      answer:
        'Yes. Kundali milan by name uses the moon sign from the first letter of each name, so it needs nothing but the two names. It is a good quick check; confirm it with the full matching by name and date of birth when you can.',
    },
    {
      question: 'Can I do kundali matching without birth time?',
      answer:
        'Yes. Choose the "by date of birth only" mode. Birth time improves the chart, but the guna matching itself is calculated from the date of birth (Nakshatra), so the match still works without it.',
    },
    {
      question: 'What is gun milan?',
      answer:
        'Gun milan is the 36-point compatibility score in kundali matching. The two charts are compared on 8 kootas — Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot and Nadi — worth 1 to 8 points each, 36 in total. 18 or more is the accepted minimum for marriage.',
    },
    {
      question: 'What is kundali milan?',
      answer:
        'Kundali milan is kundali matching — "milan" means matching. Janam kundli milan is the milan of two janam kundalis (birth charts) for marriage.',
    },
    {
      question: 'How to calculate marriage date?',
      answer:
        'The marriage date is calculated from the birth chart\'s 7th house and Dasha periods — that is a prediction, not a matching score. See the "When Will My Marriage Happen?" section above and our When Will I Get Married page. A marriage calculator in this group means the matching calculator above; the date calculation belongs to the prediction page.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Kundali Matching | Free Kundali Milan for Marriage"
        description="Free kundali matching online — check kundli milan, gun milan (36 gunas) and horoscope matching for marriage by name and date of birth."
        canonicalPath="/kundali-matching/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Kundali Matching', href: '/kundali-matching/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="text-center mt-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vedic Ashta Kuta Gun Milan (36 Gunas)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Kundali Matching
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Check kundali matching free online. Compare two kundalis for marriage and get your gun milan score out of 36 — by name and date of birth, by name only, or by date of birth only.
          </p>
        </div>

        {/* Calculator Card (Top of page as requested) */}
        <div className="rounded-3xl bg-white border border-rose-100/90 shadow-xl p-6 sm:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

          {/* Copy on the tool card */}
          <div className="text-center mb-6">
            <p className="text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50/80 inline-block px-4 py-1.5 rounded-full border border-rose-100">
              Free{' '}
              <a
                href="/kundali/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali/');
                }}
                className="hover:underline font-bold text-rose-600"
              >
                kundali
              </a>{' '}
              matching online — no app needed, no sign-up.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex p-1 bg-slate-100/90 rounded-2xl mb-6 max-w-md mx-auto text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('full');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                mode === 'full'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Name &amp; DOB
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('name-only');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                mode === 'name-only'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Name Only
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('dob-only');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                mode === 'dob-only'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By DOB Only
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Partner 1 Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/40 via-white to-pink-50/30 border border-rose-100/80 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-rose-100/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Partner 1 (Groom / Bride)
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">First Chart</span>
                </div>

                {/* Name (shown if not dob-only) */}
                {mode !== 'dob-only' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all bg-white"
                    />
                  </div>
                )}

                {/* DOB (shown if not name-only) */}
                {mode !== 'name-only' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={dob1}
                      onChange={(e) => setDob1(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all bg-white"
                    />
                  </div>
                )}

                {/* Optional Time & Place (for full mode or dob-only) */}
                {mode !== 'name-only' && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Birth Time <span className="text-[10px] text-slate-400">(optional)</span>
                      </label>
                      <input
                        type="time"
                        value={time1}
                        onChange={(e) => setTime1(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Birth Place <span className="text-[10px] text-slate-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={place1}
                        onChange={(e) => setPlace1(e.target.value)}
                        placeholder="City"
                        className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500 bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Partner 2 Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50/40 via-white to-pink-50/30 border border-purple-100/80 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-purple-100/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    Partner 2 (Bride / Groom)
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Second Chart</span>
                </div>

                {/* Name */}
                {mode !== 'dob-only' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      placeholder="e.g. Priya Patel"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all bg-white"
                    />
                  </div>
                )}

                {/* DOB */}
                {mode !== 'name-only' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={dob2}
                      onChange={(e) => setDob2(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all bg-white"
                    />
                  </div>
                )}

                {/* Optional Time & Place */}
                {mode !== 'name-only' && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Birth Time <span className="text-[10px] text-slate-400">(optional)</span>
                      </label>
                      <input
                        type="time"
                        value={time2}
                        onChange={(e) => setTime2(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Birth Place <span className="text-[10px] text-slate-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={place2}
                        onChange={(e) => setPlace2(e.target.value)}
                        placeholder="City"
                        className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500 bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-medium text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full sm:w-auto min-w-[280px] px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 shadow-lg shadow-rose-500/20 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Calculate Kundali Milan (36 Gunas)</span>
              </button>
            </div>
          </form>

          {/* Loader Overlay */}
          {isCalculating && (
            <div className="mt-8">
              <CalculationLoader
                name1={name1 || 'Partner 1'}
                name2={name2 || 'Partner 2'}
                type="marriage"
                minDuration={600}
                maxDuration={1200}
                onComplete={() => {}}
              />
            </div>
          )}

          {/* Result Section */}
          {result && !isCalculating && (
            <div className="mt-10 pt-8 border-t border-rose-100">
              <KundaliResultCard
                result={result}
                onReset={handleReset}
                onNavigate={onNavigate}
              />
            </div>
          )}
        </div>

        {/* Guide Content Below Tool (Word-for-word copy from kundali-matching.md with only the allowed Link Now internal links) */}
        <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8">
          <section>
            <p className="text-base sm:text-lg leading-relaxed">
              Before a marriage is fixed, most Indian families want one thing first: a clear answer on whether the two people will get along. For generations that answer has come from kundali matching — laying the two birth charts side by side and scoring how they fit. This page does the whole comparison in seconds. Enter two names and two dates of birth in the tool above and you get a score out of 36, a breakdown of where the match is strong, and a flag for anything that needs a closer look — no app, no sign-up, nothing to pay. The tool runs the horoscope matching for you: two charts in, one score out. Most people write it kundli matching, with an i instead of an a, and the spelling changes nothing about the method. Done online, the comparison takes seconds: online kundali matching runs the traditional scoring in your browser instead of by hand. That is what kundali matching for marriage is for: a clear answer before the date is fixed. It is{' '}
              <a
                href="/astrology/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/astrology/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                astrology
              </a>{' '}
              applied to the one question that matters most before a wedding: will these two live well together?
            </p>
          </section>

          <figure className="my-8">
            <img
              src={kundaliMatchingGunaMilanImage}
              alt="A traditional Vedic kundali chart with planet symbols, drawn on aged paper with marigold flowers"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              A Vedic kundali chart — the twelve houses of the birth chart that kundali matching compares.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is Kundali Matching?
            </h2>
            <p>
              Two birth charts go in, and a score comes out — that is the whole idea. For each partner the chart is drawn from the date, time and place of birth, and the scoring follows vedic kundali matching: the moon&apos;s position at birth — the Janma Rashi, or moon sign, and the Nakshatra, or birth star — is what the comparison turns on. The tool scores the two charts against each other on 36 gunas and hands you the total, the koota-by-koota breakdown and any dosha flags, so you can see where the match is strong and where it needs attention.
            </p>
            <p className="mt-3">
              In Hindi the comparison is usually called kundali milan — milan is the word for matching — and you will see it spelled kundli milan just as often. What you get at the end is a marriage kundali matching report: the score out of 36, the koota table, and any dosha flags, all in one place. The{' '}
              <a
                href="/kundali/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                kundali
              </a>{' '}
              itself is the birth chart, so the report is only as good as the birth details behind it — add the birth time when you know it, and the chart gets sharper.
            </p>
            <p className="mt-3">
              Families have run kundli matching for marriage before fixing a date for generations, and today most people start with the online version. It does not decide the marriage for you — it is a traditional guide, and the final decision is always yours. What it gives you is structure: a number, the reasons behind it, and the weak spots named plainly, so the conversation that follows is about real things instead of a vague feeling. The best kundli matching is the full one — name plus date of birth plus birth time — because the complete charts give the most detailed report, and that is the default mode of the tool above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali Matching by Name
            </h2>
            <p>
              When you only have two names, the name-only mode is the way in. Each name&apos;s first letter fixes a moon sign — the Rashi — and the tool compares those two signs on the 36-point scale. That is how kundali milan by name works: no birth dates, no birth times, just the names. It takes seconds, which is why people reach for it first, before they have the full birth details to hand.
            </p>
            <p className="mt-3">
              Use it as marriage matching by name when the birth details are not known yet, or when you want a quick first read before the full check. The score it produces is a gun milan by name — the 36-point scoring, run from moon signs alone. That also sets its limit: with names alone the tool can compare moon signs, not the full planetary positions, so treat the result as a first impression rather than a final word. If the name match looks good, confirm it with the full mode — name plus date of birth — and if you know even the date of birth, add it, because the Nakshatra it fixes makes the result noticeably more precise.
            </p>
            <p className="mt-3">
              Names in Hindi work the same way, typed in English letters: the first letter still fixes the Rashi, so kundali matching by name covers Hindi names without any extra step. The mechanism has a Hindi shorthand of its own — rashi ke naam se gun milan, the gun milan from the name&apos;s rashi — and it works the same way whatever language the names come from.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali Matching by Date of Birth
            </h2>
            <p>
              The date of birth is what makes the check precise, so kundali matching by date of birth is the standard mode on this page — and the default of the tool above. A date fixes the moon&apos;s Nakshatra, and the Nakshatra is what the gun milan by date of birth is calculated from, so two dates are enough to run the full 36-point comparison. That is also why marriage matching by date of birth is more accurate than matching by name alone: the Nakshatras decide most of the guna points, and a name can only fix the moon sign.
            </p>
            <p className="mt-3">
              Birth time is optional. Kundali matching by date of birth only works because the gunas are calculated from the Nakshatra, and the date alone fixes the Nakshatra — so kundali matching without birth time still gives the full guna score. When you do have the birth time, add it: kundali matching by date of birth and time reads the ascendant as well, and the ascendant, called the Lagna, sharpens the report. The fullest version combines both inputs — kundali matching by name and date of birth, names for the moon sign and dates for the Nakshatra, with the birth time on top when you know it. You will also see the date-only mode shortened to kundali matching by dob — dob is short for date of birth.
            </p>
            <p className="mt-3">
              The tool above works as a marriage compatibility calculator by date of birth — enter the two dates and it returns the score, the koota table and the dosha flags in one report. Also compare your bond on our{' '}
              <a
                href="/love-calculator-by-date-of-birth/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-calculator-by-date-of-birth/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                love calculator by date of birth
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Gun Milan: The 36 Gunas Explained
            </h2>
            <p>
              Every point in the score comes from gun milan — eight kootas, each worth a fixed number of points. Guna means quality, and the eight kootas are eight qualities of a marriage, scored one by one. They are read from the partners&apos;{' '}
              <a
                href="/zodiac-signs/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/zodiac-signs/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                zodiac signs
              </a>{' '}
              — the moon sign and the birth star decide most of the points — and the tool above shows your points for each koota, so you can see exactly where the match is strong and where it is weak, instead of getting a single unexplained number. Add the eight together and you have the guna milan score out of 36.
            </p>

            <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Koota</th>
                    <th className="py-3 px-4">What it checks</th>
                    <th className="py-3 px-4 text-center">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Varna</td>
                    <td className="py-2.5 px-4">Nature and temperament</td>
                    <td className="py-2.5 px-4 text-center font-bold">1</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Vashya</td>
                    <td className="py-2.5 px-4">Mutual attraction and influence</td>
                    <td className="py-2.5 px-4 text-center font-bold">2</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Tara</td>
                    <td className="py-2.5 px-4">Health and well-being of both partners</td>
                    <td className="py-2.5 px-4 text-center font-bold">3</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Yoni</td>
                    <td className="py-2.5 px-4">Physical compatibility</td>
                    <td className="py-2.5 px-4 text-center font-bold">4</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Graha Maitri</td>
                    <td className="py-2.5 px-4">Mental compatibility and friendship</td>
                    <td className="py-2.5 px-4 text-center font-bold">5</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Gana</td>
                    <td className="py-2.5 px-4">Temperament and behaviour</td>
                    <td className="py-2.5 px-4 text-center font-bold">6</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Bhakoot</td>
                    <td className="py-2.5 px-4">Family happiness and prosperity</td>
                    <td className="py-2.5 px-4 text-center font-bold">7</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Nadi</td>
                    <td className="py-2.5 px-4">Health of children and the family line</td>
                    <td className="py-2.5 px-4 text-center font-bold">8</td>
                  </tr>
                  <tr className="bg-rose-50/60 font-bold text-slate-900">
                    <td className="py-3 px-4">Total</td>
                    <td className="py-3 px-4">Complete Vedic Matrix</td>
                    <td className="py-3 px-4 text-center text-rose-700 font-extrabold text-base">36</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              The full 36 gun milan table is what the tool shows you after the calculation, koota by koota, and in Hindi the same table is often called shadi ke gun milan, the gun milan for a wedding. Run from names alone, the eight kootas still apply — a guna milan by name, with the moon signs deciding the points, so the score is rougher than the full check. Done on this page, the table is calculated in seconds — online gun milan, scored on the same eight kootas an astrologer would use by hand. All eight are scored for one purpose — a gun milan for marriage, read before the date is fixed.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">
              How many gunas should match for a successful marriage?
            </h3>
            <p>
              Eighteen out of 36 is the commonly accepted minimum for marriage. The usual reading is: 32–36 is an excellent match, 24–31 is very good, 18–23 is acceptable, and below 18 is not recommended. Think of the total as points for marriage: a score above 18 with no serious dosha is traditionally considered workable, and a higher score means an easier, more harmonious match. The number alone is not the whole story — a 20-point match with clean Nadi and Bhakoot can be better than a 28-point match with a Nadi dosha, which is why the tool shows the koota breakdown and the dosha flags together.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={kundaliMatchingTwoChartsImage}
              alt="Two circular Vedic birth charts side by side, joined by a golden thread, with marigold flowers and a brass lamp"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              Two birth charts, compared side by side — the heart of kundali matching.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Marriage Compatibility: What the Score Means
            </h2>
            <p>
              The score is really a measure of marriage compatibility — how two people will live together day to day, not just how they look on paper. The tool above does the work of a marriage compatibility calculator: enter the two charts and it returns the score, the koota table and the verdict together. What comes back is a scorecard — the marriage compatibility chart, with each koota&apos;s points laid out and the total at the bottom. Run from names alone, the same scorecard reads marriage compatibility by name, moon signs only, so rougher than the full check. Try also our{' '}
              <a
                href="/love-or-arranged-marriage-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-or-arranged-marriage-calculator/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                love or arranged marriage calculator
              </a>{' '}
              to explore romantic versus traditional marriage dynamics.
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Mental match (Graha Maitri, Gana):</strong> do you think alike, and do you get along as friends — not just as partners?
              </li>
              <li>
                <strong>Emotional and physical match (Yoni, Vashya, Tara):</strong> attraction, closeness, and how well you look after each other.
              </li>
              <li>
                <strong>Family match (Bhakoot, Nadi):</strong> how the marriage sits with the wider family, and what it means for future children.
              </li>
            </ul>

            <p className="mt-3">
              Most of the points come from the Nakshatras. The two birth stars decide the bulk of the guna score, which is why matching by date of birth — which fixes the Nakshatra — is more accurate than matching by name alone, and why the comparison is often done star by star: star matching for marriage, with the two birth stars compared koota by koota. Because the birth stars decide most of the points, the score is at heart a marriage compatibility by nakshatra — read the birth stars and you have read most of the match. If your Nakshatras match well, most of the score follows, and that is why nakshatra matching for marriage is the part families look at first. You can also test your daily romantic vibe with our{' '}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                love calculator
              </a>{' '}
              on the homepage.
            </p>

            <p className="mt-3">
              Numerology reads the question in numbers instead. A numerology marriage compatibility check looks at the partners&apos; numbers instead of their charts — 4 and 8 marriage compatibility and 4 and 9 marriage compatibility are two of the most checked number pairs. Zodiac marriage compatibility reads it from the sun signs instead. All three are real ways people check a match; this page uses the Vedic chart method, and our{' '}
              <a
                href="/numerology-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/numerology-calculator/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                numerology calculator
              </a>{' '}
              and{' '}
              <a
                href="/love-compatibility-by-zodiac-sign/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-compatibility-by-zodiac-sign/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                Love Compatibility by Zodiac Sign
              </a>
              {' '}pages cover the other two.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Horoscope Matching for Marriage
            </h2>
            <p>
              Four steps make up horoscope matching for marriage, and the tool above runs them in order. Marriage matching starts with the charts and ends with a verdict — and each step answers a different question.
            </p>

            <ol className="list-decimal pl-5 space-y-2 mt-3">
              <li>
                <strong>Make both kundalis</strong> — from the date, time and place of birth (or from the name, if the birth details are not known). A{' '}
                <a
                  href="/birth-chart-calculator/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/birth-chart-calculator/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  birth chart calculator
                </a>{' '}
                makes the chart; this matching tool then compares the two.
              </li>
              <li>
                <strong>Match the gunas</strong> — the 36-point gun milan above. This is the main score, and it carries most of the verdict&apos;s weight.
              </li>
              <li>
                <strong>Check the doshas</strong> — Manglik dosha and Nadi dosha especially (see below). A dosha does not automatically cancel a match, but it must be checked.
              </li>
              <li>
                <strong>Read the verdict together</strong> — score plus doshas, not score alone.
              </li>
            </ol>

            <p className="mt-3">
              In North India the birth chart is called a patrika, so the four-step process is usually called patrika matching there. Jataka is another word for the birth chart, and jataka matching for marriage follows the same four steps. What comes out at the end is the couple&apos;s marriage horoscope: the two charts, the score and the verdict, written out. Done online, the four steps take seconds — online horoscope matching, with the same four steps an astrologer would follow by hand.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Dosha Checks in Kundali Matching
            </h2>
            <p>
              A good report checks for doshas as well as gunas — combinations in the charts that need attention. The tool above flags them automatically next to your guna score, so you see them beside the number instead of discovering them later. In traditional{' '}
              <a
                href="/astrology/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/astrology/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                astrology
              </a>
              , a dosha is read as something to look at closely, not as a verdict on its own:
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Manglik dosha (Mangal dosha):</strong> Mars placed in certain houses in one partner&apos;s chart. If one partner is Manglik and the other is not, traditional astrology recommends checking this carefully before marriage.
              </li>
              <li>
                <strong>Nadi dosha:</strong> both partners have the same Nadi (0 out of 8 points in the Nadi koota). It is the most heavily weighted single koota, so the tool flags it clearly.
              </li>
              <li>
                <strong>Bhakoot dosha:</strong> the moon signs fall in a 6–8, 5–9 or 2–12 pattern. It affects family happiness and is shown in the Bhakoot row of your scorecard.
              </li>
            </ul>

            <p className="mt-3">
              A dosha is a flag to look closer, not a final &ldquo;no&rdquo; — many matches with a dosha are still considered workable with the traditional remedies, and that is a decision for the couple and their families. The marriage line on the palm is a different check altogether (palmistry), not kundali matching — this page covers the chart-based match.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali Matching in Hindi, Telugu, Tamil, Marathi and Malayalam
            </h2>
            <p>
              The check is the same in every Indian language — only the words change, because the matching rules do not change with language. One tool serves every language below.
            </p>

            <div className="space-y-3 mt-4 text-sm sm:text-base">
              <p>
                <strong>Hindi.</strong> Hindi is the language most families ask in. The tool takes names in English letters, so a Hindi name works exactly as an English one does — the first letter still fixes the Rashi. People usually ask for it as kundali matching hindi, or for the shorter kundli milan hindi, and both lead to the same tool above. Shadi is the Hindi word for wedding, and shadi matching is how many families phrase the request.
              </p>
              <p>
                <strong>Telugu.</strong> In Andhra Pradesh and Telangana the check runs on the same Vedic rules, asked for in Telugu — telugu marriage matching is the usual phrase, and marriage compatibility telugu the other common one. The tool does not change with the language: the same two charts, the same 36 gunas.
              </p>
              <p>
                <strong>Tamil.</strong> Tamil families have their own version of the check — tamil horoscope matching, which scores ten poruthams instead of eight kootas. It is the same idea — two charts, scored for marriage — worked out in the Tamil way, and our{' '}
                <a
                  href="/porutham/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/porutham/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  thirumana porutham
                </a>{' '}
                page covers the ten poruthams in detail.
              </p>
              <p>
                <strong>Marathi.</strong> In Maharashtra the check is usually asked for as kundali matching marathi, and the score itself is often called gun milan marathi — the Marathi name for the same 36-point table.
              </p>
              <p>
                <strong>Malayalam.</strong> In Kerala families ask for horoscope matching malayalam, and the check runs on the same Vedic rules as everywhere else — the language changes, the scoring does not.
              </p>
            </div>

            <p className="mt-4">
              Gujarati and Bengali families use the same tool too. There is no separate page per language — one matching tool serves every language above, and the scoring stays the same throughout.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Is Kundali Matching Free?
            </h2>
            <p>
              Yes — free kundali matching, with nothing held back: the full 36-guna score, the koota table and the dosha flags. There is no paid version and no sign-up. Nothing here asks for payment. Open the page, enter the two names and dates of birth, and the score appears in seconds — kundali matching free, with the full report, not a sample. What you get is kundali milan for marriage — the full check, from the two charts to the verdict — and here it costs nothing.
            </p>
            <p className="mt-3">
              You do not need an app — no kundali milan app, no download, no sign-up. The tool runs in your browser: open the page, enter the two names and dates of birth, and the guna score and the full koota table appear immediately. The online check gives you the same 36-guna score as a manual matching, in seconds, at no cost.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              When Will My Marriage Happen?
            </h2>
            <p>
              Kundali matching tells you whether a match is compatible, not when the marriage will happen. The marriage calculator above answers whether, not when. If you are asking when my marriage will happen, or when will be my marriage, that is a timing question, answered by marriage prediction from the birth chart — see our{' '}
              <a
                href="/when-will-i-get-married/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/when-will-i-get-married/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                When Will I Get Married
              </a>
              {' '}page for that check. A marriage date calculator, a marriage year calculator or a marriage time prediction is a timing tool — it belongs to the prediction page, not to matching. Already married? A wedding anniversary calculator counts the years since your wedding — a different tool from matching, for after the marriage has happened.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is the Perfect Age for Marriage?
            </h2>
            <p>
              People ask which age is best for marriage, and the honest answer is that there is no single perfect age for marriage — it depends on the person. Traditionally, the right age is read from the chart: the timing of marriage comes from the 7th house and the Dasha periods. Personal readiness matters just as much — education, work and family. The best age for marriage is the one where the chart and the person agree, and the timing check on the prediction page reads the chart side of it. Matching tells you who matches; prediction tells you when.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Questions to Ask Before Marriage
            </h2>
            <p>
              Matching the charts is one half of the decision; the other half is talking. These are the questions to ask your significant other before marriage — the ones couples most often bring up before fixing a date:
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>What do we each expect from married life — and from each other&apos;s families?</li>
              <li>How will we handle money, work and living arrangements?</li>
              <li>Do we want children, and when?</li>
              <li>What does each of us need when we disagree?</li>
            </ul>

            <p className="mt-3">
              A good guna score helps; honest answers to these questions help just as much. Some people also check a marriage fortune teller or a tarot cards prediction for marriage — those are different methods from Vedic kundali matching, and this page uses the chart method.
            </p>
          </section>
        </article>

        {/* FAQs */}
        <div className="mt-16">
          <FAQSection faqs={faqs} />
        </div>

        {/* Related Tools & Articles */}
        <div className="mt-16 space-y-12">
          <RelatedTools onNavigate={onNavigate} currentToolId="marriage" />
          <RelatedArticles onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
};
