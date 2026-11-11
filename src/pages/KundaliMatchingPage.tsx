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
        'Compare the two kundalis: match the 36 gunas (gun milan), then check for Manglik dosha and Nadi dosha. Enter both partners\' names and dates of birth in the tool above and you get the guna score, the koota table and the dosha flags in one report. A marriage calculator by date of birth and a marriage calculator by name run the same check from different inputs. You can read our detailed guide on love compatibility by date of birth to understand how birth numbers and cosmic alignments interact.',
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
        'Kundali milan is kundali matching — "milan" means matching. Janam kundli milan is the same check: the milan of two janam kundalis (birth charts) for marriage.',
    },
    {
      question: 'How to calculate marriage date?',
      answer:
        'The marriage date is calculated from the birth chart\'s 7th house and Dasha periods — that is a prediction, not a matching score. See the "When Will My Marriage Happen?" section above and our When Will I Get Married page (coming soon). A marriage calculator in this group means the matching calculator above; the date calculation belongs to the prediction page.',
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
              Kundali matching, also called kundli matching, kundali milan and horoscope matching, is the traditional way of checking whether two people are compatible for marriage. This free kundali matching tool compares both birth charts, counts the matching gunas and shows you the score — in seconds, with no app and no sign-up. Whether you call it kundali matching, kundli matching, kundali milan, kundli milan, gun milan, horoscope matching or patrika matching, the check is the same: two charts, 36 gunas, one clear answer. It is{' '}
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
              kundali matching done the quick way: kundali milan online and online kundali milan, with the same 36-guna result as a manual check. It is the oldest form of matching making for marriage in India, and this page does the whole check online — online kundali matching, online horoscope matching and online kundli milan in one place.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is Kundali Matching?
            </h2>
            <p>
              Kundali matching is the comparison of two birth charts (kundalis) before marriage. In Vedic astrology, the moon&apos;s position at birth — the Janma Rashi and the Nakshatra (birth star) — decides how two people get along, so a kundali matching report compares the two charts point by point instead of guessing from names alone. That is why it is also called Vedic kundali matching and Indian astrology marriage compatibility: it is the Vedic, Indian method of checking a marriage, built on the same rules as Hindu astrology. A marriage kundali matching report is a Hindu astrology marriage compatibility check — marriage compatibility astrology, done the traditional way. An indian marriage matching horoscope, indian vedic astrology marriage compatibility and marriage compatibility hindu astrology all describe this same Vedic check.
            </p>
            <p className="mt-3">
              &ldquo;Marriage kundali matching&rdquo;, &ldquo;janam kundali matching&rdquo;, &ldquo;janma kundali matching&rdquo; and &ldquo;janam kundali milan&rdquo; all describe this same report. &ldquo;Milan&rdquo; simply means matching, &ldquo;vivah&rdquo; means marriage, so you will also see it written as vivah kundli milan or vivah kundali milan, and in the north as var vadhu kundli milan — the matching of the var (groom) and the vadhu (bride). A horoscope kundali matching or horoscope kundli matching report is the same thing again: the{' '}
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
              is the horoscope, so horoscope matching and kundali matching are two names for one check.
            </p>
            <p className="mt-3">
              Families have used kundali matching for generations before fixing a marriage, and today most people do the same check online first. It does not decide your marriage for you — it is a traditional guide, and the final decision is always yours. What it does give you is a clear, structured answer: a score out of 36, which areas match well, and which areas need attention. The best kundli matching is the full one — name plus date of birth plus birth time — because it uses the complete charts, and that is the default mode of the tool above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali Matching by Name
            </h2>
            <p>
              Kundali milan by name is the simplest way to check a match — you only need the two names. It works from the moon sign (Rashi) found from the first letter of each name, which is why so many people search for kundali matching by name, kundli milan by name and gun milan by name. Whether you call it kundali matching by name, kundli matching by name, marriage matching by name, horoscope matching by name or gun milan by name, the method is the same: the tool finds the Rashi from each name — rashi ke naam se gun milan, as it is asked in Hindi — and compares them.
            </p>
            <p className="mt-3">
              Use kundali milan by name when you do not know the birth time, or when you want a quick first check before doing the full matching by date of birth. Kundli milan by name only and marriage kundli milan by name only are the same quick mode: enter both names in the tool above and choose &ldquo;by name only&rdquo;. A kundali milan name se or kundli milan name se check — matching by name, as it is phrased in Hindi — needs nothing more than the two names.
            </p>
            <p className="mt-3">
              Name-only matching is a good starting point, but it is less detailed than a full matching: with names alone the tool can compare moon signs, not the full planetary positions. If the name match looks good, confirm it with the full kundali matching by name and date of birth. If you know even the date of birth, use that too — it makes the result more accurate. And if you only have names in Hindi, the same mode covers kundali matching by name in Hindi and kundali milan by name in Hindi, including kundli milan in Hindi by name — the names work in English letters either way. A name kundali milan is the same mode, and online kundali matching by name, kundali matching for marriage by name and kundli matching for marriage by name all run on this same name-only check. Janmakshar matching for marriage is the same name check too: &ldquo;janmakshar&rdquo; is the birth letter (akshar) the Rashi is found from.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali Matching by Date of Birth
            </h2>
            <p>
              Kundali matching by date of birth is the standard, most accurate check. The date of birth fixes the moon&apos;s Nakshatra (birth star), and the Nakshatra is what the guna matching is calculated from — so kundali matching by date of birth, kundli matching by date of birth and marriage matching by date of birth are all the same standard check.
            </p>
            <p className="mt-3">
              To match by date of birth you need each partner&apos;s date of birth. Birth time makes the result more precise because it fixes the ascendant (Lagna), but the tool also works without it. Kundali matching by date of birth only, kundli matching by date of birth only and kundali matching by date of birth only without time are all supported: choose &ldquo;by date of birth only&rdquo; and the matching is done from the date alone. Kundali matching without birth time, kundali matching without time, kundli matching without time and kundali matching without time of birth mean the same thing — no birth time needed. Even kundali matching by name and date of birth without time works: names plus dates, no clock time. A marriage compatibility calculator by date of birth and a marriage matching calculator by name and date of birth do exactly this calculation, and a date of birth matching for marriage calculator is the same tool under another name. Also compare your bond on our{' '}
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
            <p className="mt-3">
              The full check — kundali matching by name and date of birth, kundli matching by name and date of birth, kundali milan by name and date of birth, kundli milan by name and date of birth, gun milan by name and date of birth and marriage matching by name and date of birth — combines both: names for the moon sign and the date of birth for the Nakshatra. Marriage compatibility by name and date of birth and name compatibility with date of birth for marriage are the same combined check, and so is kundali matching by date of birth and time when you do have the time. That combined mode is the default of the tool above, and it is the most accurate kundali matching you can do online. Kundali milan by date of birth and horoscope matching by date of birth are the same standard check, and gun milan by date of birth is the guna score from that check. Marriage compatibility by date of birth without time, marriage compatibility by dob and kundali matching by dob are the same date-only mode — dob is simply short for date of birth — and indian marriage compatibility by date of birth only is that same mode named for the Indian method. It is free too: marriage compatibility by date of birth free uses this same tool at no cost.
            </p>
            <p className="mt-3">
              One more detail from the birth chart: the Lagna, or ascendant. Lagna kundali matching, lagn kundali milan and lagna patrika matching use the ascendant from the birth time, which is why adding the birth time improves the report. If you know the time, add it; if you do not, the date-only match still gives you the full guna score.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Gun Milan: The 36 Gunas Explained
            </h2>
            <p>
              Gun milan is the scoring heart of kundali matching. &ldquo;Guna&rdquo; means quality, and the match is scored on 36 gunas, grouped into 8 kootas based on the partners&apos;{' '}
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
              — so gun milan, guna milan, 36 gun milan and kundali gun milan are all the same score. Each koota is worth a fixed number of points:
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
              The tool above shows your score for each koota, so you can see exactly where the match is strong and where it is weak — not just a single number. Guna milan by name is the same table calculated from names only, and online gun milan or gun milan online is simply this table done on the website instead of by hand. Kundli gun milan, gun milan kundali and kundali gun milan are the same score written different ways, and a marriage points calculator, a marriage match score or kundali matching points all read from this same table: points for marriage, marriage matching points and marriage points are just the guna total. Shadi ke gun milan — the gun milan for a shadi (wedding), as it is asked in Hindi — is the same check, and so is guna matching for marriage. Gun milan for marriage is the full name of this score: the gun milan done for a marriage.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">
              How many gunas should match for a successful marriage?
            </h3>
            <p>
              18 gunas out of 36 is the commonly accepted minimum for marriage. The usual reading is: 32–36 is an excellent match, 24–31 is very good, 18–23 is acceptable, and below 18 is not recommended. A score above 18 with no serious dosha is traditionally considered workable; a higher score simply means an easier, more harmonious match. The number alone is not the whole story — a 20-point match with clean Nadi and Bhakoot can be better than a 28-point match with a Nadi dosha, which is why the tool shows the koota breakdown and the dosha flags together. If you are asking how many points should match for marriage, that is the answer: 18 at least, 24 or more for a good match.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Marriage Compatibility: What the Score Means
            </h2>
            <p>
              Marriage compatibility is what the guna score is really measuring — how two people will live together day to day. Marriage compatibility, birthdate compatibility for marriage and marriage compatibility by name are all read from the same scorecard: the total out of 36, plus the points in each koota. The tool above is a marriage compatibility calculator and a marriage compatibility test in one — run the marriage compatibility check and you get the score, the chart and the verdict together. A marriage compatibility chart is simply that scorecard written out, and a marriage compatibility calculator by date of birth is the same calculator run from birth dates. Try also our{' '}
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
                <strong>Mental match (Graha Maitri, Gana):</strong> do you think alike and get along as friends, not just as partners. Gana matching for marriage and ganalu matching for marriage are this part of the score.
              </li>
              <li>
                <strong>Emotional and physical match (Yoni, Vashya, Tara):</strong> attraction, closeness and well-being together.
              </li>
              <li>
                <strong>Family match (Bhakoot, Nadi):</strong> how the marriage affects the wider family and future children.
              </li>
            </ul>

            <p className="mt-3">
              Marriage compatibility by Nakshatra — also called star matching for marriage — is the same check seen from the birth star: the two Nakshatras decide most of the guna points, which is why matching by date of birth (which fixes the Nakshatra) is more accurate than matching by name alone. Star matching, a star matching calculator for marriage, nakshatra matching for marriage, a nakshatra matching chart for marriage and a nakshatra marriage compatibility chart are all this Nakshatra check. Marriage matching by rashi and nakshatra, marriage matching with rasi and nakshatra and horoscope matching by rashi and nakshatra add the moon sign (Rashi) to the same comparison, and horoscope matching by star is the same check in short. If your Nakshatras match well, most of the score follows. You can also test your daily romantic vibe with our{' '}
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
              Numerology reads the same question in numbers. Numerology marriage compatibility, numerology marriage matching and a marriage numerology compatibility calculator look at the partners&apos; numbers instead of their charts — 4 and 8 marriage compatibility and 4 and 9 marriage compatibility are two of the most checked number pairs. Zodiac marriage compatibility and zodiac sign compatibility for marriage read it from the sun signs instead. All three are real ways people check a match; this page uses the Vedic chart method, and our{' '}
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
              and Love Compatibility by Zodiac Sign pages (coming soon) cover the other two.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Horoscope Matching for Marriage
            </h2>
            <p>
              Horoscope matching for marriage is the full process, step by step. Horoscope matching, marriage matching, marriage horoscope matching and online horoscope matching all mean this process, and marriage matching astrology is the same process under its astrology name:
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
                <strong>Match the gunas</strong> — the 36-point gun milan above. This is the main score. A marriage horoscope by date of birth is read from the same two charts, and a marriage horoscope by name is the same report started from names only.
              </li>
              <li>
                <strong>Check the doshas</strong> — Manglik dosha and Nadi dosha especially (see below). A dosha does not automatically cancel a match, but it must be checked.
              </li>
              <li>
                <strong>Read the verdict together</strong> — score plus doshas, not score alone.
              </li>
            </ol>

            <p className="mt-3">
              Patrika matching is the same process under its North Indian name — &ldquo;patrika&rdquo; is the birth chart itself — so patrika matching, patrika matching for marriage, online patrika matching and lagna patrika matching are all this same four-step check. Whether you call it kundali matching, horoscope matching, marriage matching or patrika matching, the check is identical: two charts, 36 gunas, dosha check, verdict. Horoscope matching for marriage, horoscope matching online and online horoscope matching for marriage are the same check done on the website, and a marriage horoscope — the marriage horoscope of the couple — is what the report describes. Jataka matching for marriage is the same again: &ldquo;jataka&rdquo; is the birth chart, so a jataka match is a chart match.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Dosha Checks in Kundali Matching
            </h2>
            <p>
              A good kundali matching report also checks for doshas — combinations in the charts that need attention. A manglik marriage calculator checks the best-known one, and the tool above flags doshas automatically next to your guna score. In traditional{' '}
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
              , analyzing dosha positions ensures complete peace of mind:
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Manglik dosha (Mangal dosha):</strong> Mars placed in certain houses in one partner&apos;s chart. If one partner is Manglik and the other is not, traditional astrology recommends checking this carefully before marriage. A manglik match is the comparison of Manglik status between the two charts.
              </li>
              <li>
                <strong>Nadi dosha:</strong> both partners have the same Nadi (0 out of 8 points in the Nadi koota). It is the most heavily weighted single koota, so the tool flags it clearly.
              </li>
              <li>
                <strong>Bhakoot dosha:</strong> the moon signs fall in a 6–8, 5–9 or 2–12 pattern. It affects family happiness and is shown in the Bhakoot row of your scorecard.
              </li>
            </ul>

            <p className="mt-3">
              Other dosha checks people look for — a pitra dosha calculator, a kala sarpa dosha calculator (also written kalasarpa dosha check), a rahu ketu dosha calculator, a naga dosha calculator, a sarpa dosha calculator, a rahu dosha calculator and a death time dosha calculator — all run on the same birth details as the matching itself. A dosha is a flag to look closer, not a final &ldquo;no&rdquo; — many matches with a dosha are still considered workable with the traditional remedies, and that is a decision for the couple and their families. The marriage line on the palm is a different check altogether (palmistry), not kundali matching — this page covers the chart-based match.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali Matching in Hindi, Telugu, Tamil, Marathi and Malayalam
            </h2>
            <p>
              Kundali matching is searched in every major Indian language, and the check is the same in all of them — only the words change. Kundali matching in English is this page; the same tool serves every language below, because the matching rules do not change with language.
            </p>

            <div className="space-y-3 mt-4 text-sm sm:text-base">
              <p>
                <strong>Hindi.</strong> Kundali matching Hindi, kundli milan Hindi, kundali milan in Hindi and kundli milan Hindi mein are the most searched Hindi variants, with kundali matching by name in Hindi, kundali milan by name in Hindi, kundli milan in Hindi by name, kundli milan for marriage in Hindi, kundali matching for marriage in Hindi and kundli matching for marriage in Hindi close behind, and kundali milan for marriage in Hindi is the same phrase again. In Hindi the check is also called shadi matching and shadi kundali milan, and a shadi yog calculator in Hindi looks for the marriage yogas in the same charts. People also search in Hinglish — date of birth se kundali milan — and the answer is the same: enter the date of birth and the tool matches the charts.
              </p>
              <p>
                <strong>Telugu.</strong> Telugu marriage matching, horoscope matching for marriage in Telugu, marriage compatibility Telugu and horoscope matching Telugu are the big Telugu variants, with marriage matching by name in Telugu, online marriage matching Telugu and star matching for marriage Telugu alongside them. Online jyotish Telugu marriage matching and online jyotish marriage matching Telugu are the same check through a jyotish (astrology) site, and a marriage compatibility chart Telugu is the scorecard in Telugu. Marriage matching by date of birth Telugu and a marriage horoscope in Telugu are the same checks in Telugu.
              </p>
              <p>
                <strong>Tamil.</strong> Tamil horoscope matching, also known as{' '}
                <a
                  href="/porutham/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/porutham/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  thirumana porutham
                </a>
                , horoscope matching Tamil, horoscope matching in Tamil and marriage matching Tamil lead the Tamil variants, with star matching for marriage in Tamil, star matching Tamil, online horoscope matching Tamil, horoscope compatibility for marriage Tamil, marriage horoscope matching Tamil and marriage matching astrology in Tamil alongside them. Marriage matching by date of birth Tamil, marriage matching by date of birth in Tamil and date of birth marriage matching in Tamil are the Tamil date-of-birth check — same rules, same tool.
              </p>
              <p>
                <strong>Marathi.</strong> Kundali matching Marathi, marathi kundali matching, kundali matching in Marathi, kundali milan Marathi, gun milan Marathi and gun milan in Marathi are the main Marathi variants, with kundali matching marathi free, free kundali matching in Marathi, kundali matching in Marathi by birth date, lagn kundali milan Marathi and patrika matching Marathi alongside them. Online kundali matching Marathi and online kundli matching Marathi are the same check done on the website.
              </p>
              <p>
                <strong>Malayalam.</strong> Horoscope matching Malayalam, horoscope matching Malayalam free and star matching Malayalam are the Malayalam variants, and kerala kundali matching and horoscope matching Kerala are the same check named for the state. Gujarati and Bengali are covered the same way — kundli matching in Gujarati and kundali matching in Gujarati, kundali matching in Bengali and bengali kundli matching — one tool, every language, because the matching rules are the same.
              </p>
            </div>

            <p className="mt-4">
              There is no separate page per language — one matching tool serves every language variant, and this section answers the Hindi, Telugu, Tamil, Marathi, Malayalam, Gujarati and Bengali queries in one place.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Is Kundali Matching Free?
            </h2>
            <p>
              Yes. Online kundali matching on this site is free — free kundali matching, free kundli milan, free kundli matching, free kundali milan, kundali matching free and kundli matching free all use the same free tool above. Free kundali matching for marriage, free kundli matching for marriage, free kundli milan for marriage, kundli matching for marriage free, free online kundli matching for marriage, online kundli matching free for marriage and free horoscope matching for marriage are the same free check with &ldquo;for marriage&rdquo; added — there is no paid version and no marriage matching app to buy. Kundali milan for marriage is the full check itself, free here. Online free kundli matching, kundli matching online free, kundali matching online free, kundali matching online free for marriage, online kundali matching for marriage and free online horoscope matching are the same free check written different ways — and so is online jyotish kundali matching, the same check through a jyotish site. People type it many ways — kundli matching free kundli milan for marriage — and every version leads to this same free tool. Free gun milan, kundali milan free, free horoscope matching and free marriage matching are the same: the full 36-guna score, free.
            </p>
            <p className="mt-3">
              You also do not need a kundali milan app, a kundli milan app, a kundali matching app, a kundli matching app, a kundali matching app for marriage, a kundli matching app for marriage or the best kundli matching app — and you do not need kundali milan software or kundli milan software either. The tool runs in your browser: open the page, enter the two names and dates of birth, and get the guna score and the full koota table immediately. The online check gives you the same 36-guna score as a manual matching, in seconds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              When Will My Marriage Happen?
            </h2>
            <p>
              Kundali matching tells you whether a match is compatible, not when the marriage will happen. If you are asking when my marriage will happen or when will be my marriage, that is a timing question, answered by marriage prediction from the birth chart — see our When Will I Get Married page (coming soon) for that check. A marriage date calculator, a marriage date calculator by date of birth, a marriage date prediction, a marriage date by date of birth, my marriage date, a marriage year calculator, a marriage year prediction, a marriage time prediction and a timing of marriage calculator all ask the same timing question, and they belong to that prediction page, not to matching. Possibility of love marriage by date of birth, marriage by date of birth and marriage by name are the same timing question in short. Already married? A wedding anniversary calculator counts the years since your wedding — a different tool from matching, for after the marriage has happened.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is the Perfect Age for Marriage?
            </h2>
            <p>
              There is no single perfect age — the perfect age for marriage, the best age for marriage and the ideal age for marriage are the same question, and the honest answer is that it depends on the person. Traditionally, the right age is read from the chart (the timing of marriage comes from the 7th house and the Dasha periods) and from personal readiness — education, work and family. If you are asking what is the perfect age for marriage or which age is best for marriage, use the timing check above rather than the matching score: matching tells you who matches, prediction tells you when.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Questions to Ask Before Marriage
            </h2>
            <p>
              Matching the charts is one half of the decision; the other half is talking. These are the questions to ask your significant other before marriage and the questions to ask prior to marriage that couples most often search for:
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
