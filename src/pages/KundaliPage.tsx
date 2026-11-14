import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { CalculationLoader } from '../components/CalculationLoader';
import { KundaliDisplayCard } from '../components/KundaliDisplayCard';
import {
  generateKundali,
  KundaliInputMode,
  KundaliReport,
} from '../lib/kundaliChartEngine';
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
  Compass,
} from 'lucide-react';
import kundaliWheelImage from '../assets/images/kundali-birth-chart-wheel.webp';
import kundaliAstrologerImage from '../assets/images/kundali-astrologer-reading-chart.webp';

interface Props {
  onNavigate: (path: string) => void;
}

export const KundaliPage: React.FC<Props> = ({ onNavigate }) => {
  // Modes: 'full' | 'dob-only' | 'name-only'
  const [mode, setMode] = useState<KundaliInputMode>('full');

  // User input states
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');

  // Status
  const [isCalculating, setIsCalculating] = useState(false);
  const [report, setReport] = useState<KundaliReport | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'full') {
      if (!name.trim()) {
        setError('Please enter your name.');
        return;
      }
      if (!dob) {
        setError('Please select your date of birth.');
        return;
      }
    } else if (mode === 'dob-only') {
      if (!dob) {
        setError('Please select your date of birth.');
        return;
      }
    } else if (mode === 'name-only') {
      if (!name.trim()) {
        setError('Please enter your name.');
        return;
      }
    }

    setIsCalculating(true);
    setTimeout(() => {
      const generated = generateKundali(
        {
          name: name.trim() || 'Native',
          dob,
          birthTime,
          birthPlace,
        },
        mode
      );
      setReport(generated);
      setIsCalculating(false);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 600);
  };

  const handleReset = () => {
    setReport(null);
    setName('');
    setDob('');
    setBirthTime('');
    setBirthPlace('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      question: 'What is kundli?',
      answer:
        'Kundli is the Vedic birth chart — a map of the twelve houses with the planets placed as they were at your birth. It is also called kundali, janam kundali, janampatri and jathagam. It is made from your date of birth, birth time and birth place, and it is read for career, marriage, health and future predictions.',
    },
    {
      question: 'How to check kundali?',
      answer:
        'Enter your date of birth (and birth time, if you know it) in the tool above. It makes your kundali chart and shows your Lagna, Moon sign, Nakshatra, planetary positions and yogas. Checking your kundali online is free, with no app and no sign-up.',
    },
    {
      question: 'How to make kundali?',
      answer:
        'Enter your birth details in the tool above — name, date of birth, birth time and place if known — and it generates your kundali chart in seconds. You can also make a kundali by date of birth only if you do not know the birth time.',
    },
    {
      question: 'Can I make a kundali without birth time?',
      answer:
        'Yes. Choose the "by date of birth only" mode. The Moon sign and Nakshatra are fixed by the date alone, so the chart still works — the Lagna and house positions are approximate without the time, but the reading is still useful. Add the birth time later for the full chart. The date alone is enough to start, so kundli without time of birth works the same way.',
    },
    {
      question: 'How to read kundli?',
      answer:
        'Start with the Lagna (ascendant), then the Moon sign and Nakshatra, then the planets house by house — the tenth house for career, the seventh for marriage, the fifth for children. The section "Reading Your Kundali Chart" above walks through it step by step, and the tool\'s result explains each placement in plain words. Read our guide on love compatibility by date of birth to discover how planetary dynamics shape long-term alignment.',
    },
    {
      question: 'Is kundali free online?',
      answer:
        'Yes — the kundali tool on this page is completely free. No app, no software download and no sign-up. You can also save your kundali report from the result.',
    },
    {
      question: 'How to match kundali for marriage?',
      answer:
        'Make both people\'s kundalis on this page first, then compare them on our kundali matching page, which scores the match out of 36 gunas and checks for doshas. Matching compares two charts; this page reads one chart.',
    },
    {
      question: 'What is Raj Yoga in kundali?',
      answer:
        'Raj Yoga is a combination of planets traditionally read as status and success, formed when the lords of the kendra and trikona houses combine. The tool above checks your chart for Raj Yoga and the other main yogas automatically.',
    },
    {
      question: 'What is kundali by dob?',
      answer:
        'Kundali by dob means kundali by date of birth — dob is short for date of birth. Enter your date of birth in the tool above and it makes your kundali from the date alone. The same date-only mode covers kundli by dob, and if you only have a name, the kundli by name mode reads your Moon sign from its first letter.',
    },
    {
      question: 'Is there a kundali in English?',
      answer:
        'Yes. Kundali in English and kundli in English are the same request — the chart and its reading explained in English. The tool above reads your kundali in English, and the janampatri in English and janam kundli in English are the same English reading.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Kundali | Free Kundali Online by Date of Birth"
        description="Free kundali online — make your janam kundali by date of birth and time, read your kundli chart, yogas and predictions."
        canonicalPath="/kundali/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Kundali', href: '/kundali/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="text-center mt-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Vedic Janam Kundali Generator &amp; Planetary Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Kundali
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Make your free kundali online. Enter your date of birth — and your birth time, if you know it — and get your janam kundali: your birth chart, planetary positions, yogas and a plain reading of what they mean.
          </p>
        </div>

        {/* Tool Card at the Top */}
        <div className="rounded-3xl bg-white border border-amber-100 shadow-xl p-6 sm:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

          {/* Copy on the tool card */}
          <div className="text-center mb-6">
            <p className="text-xs sm:text-sm font-semibold text-amber-800 bg-amber-50 inline-block px-4 py-1.5 rounded-full border border-amber-200">
              Free kundali online — no app needed, no sign-up.
            </p>
          </div>

          {/* Mode Selector Tabs */}
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
              Date &amp; Time (Full)
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
          </div>

          {/* Generator Form */}
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/30 via-white to-orange-50/30 border border-amber-100/80 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                {mode !== 'dob-only' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all bg-white"
                    />
                  </div>
                )}

                {/* Date of Birth */}
                {mode !== 'name-only' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all bg-white"
                    />
                  </div>
                )}

                {/* Birth Time */}
                {mode === 'full' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Birth Time <span className="text-[10px] text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all bg-white"
                    />
                  </div>
                )}

                {/* Birth Place */}
                {mode !== 'name-only' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Birth Place <span className="text-[10px] text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      placeholder="City or Town (e.g. New Delhi)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm transition-all bg-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-medium text-center">
                {error}
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full sm:w-auto min-w-[280px] px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Generate Free Janam Kundali</span>
              </button>
            </div>
          </form>

          {/* Loader */}
          {isCalculating && (
            <div className="mt-8">
              <CalculationLoader
                name1={name || 'Native'}
                name2="Cosmic Sky"
                type="dob"
                minDuration={600}
                maxDuration={1200}
                onComplete={() => {}}
              />
            </div>
          )}

          {/* Report Display Result */}
          {report && !isCalculating && (
            <div className="mt-10 pt-8 border-t border-amber-100">
              <KundaliDisplayCard
                report={report}
                onReset={handleReset}
                onNavigate={onNavigate}
              />
            </div>
          )}
        </div>

        {/* Guide Content Below Tool */}
        <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8">
          <section>
            <p className="text-base sm:text-lg leading-relaxed">
              People have read their lives from the sky for thousands of years, and in India that reading starts with the kundali — twelve houses, with the planets placed in them exactly as they were at the moment of birth. In India it still comes first before the big decisions: a wedding, a career change, a move. The tool above makes yours in seconds, and the quickest route is kundali by date of birth — enter the date, add the birth time if you know it, and it draws your janam kundali: the chart, the planetary positions and a plain reading of what they show. You get all of it as a free online kundali — the chart, the reading and the report — with no sign-up and no payment.
            </p>
            <p className="mt-3">
              Once you have the chart, the rest of this page walks through it: how to read the houses, what the yogas mean, and where the South Indian jathagam fits in. The kundali sits inside a much older system, and the{' '}
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
              {' '}hub explains how the pieces of that system fit together. And if your question is marriage, one chart only takes you halfway — two charts have to be compared, and that comparison is what{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                kundali matching
              </a>
              {' '}does.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={kundaliWheelImage}
              alt="Kundali birth chart wheel in the North Indian style, with the twelve houses and planet symbols"
              width="1200"
              height="1200"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              The twelve houses of a kundali, with the planets placed as they were at birth.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is Kundali?
            </h2>
            <p>
              Twelve houses hold the whole reading. The first house is you — your body, your manner, the way you meet the world. The seventh holds marriage, the tenth holds career, the fifth holds children and creativity, and the rest divide up health, money, family and everything in between. Into those houses go the planets as they stood at your birth, and the pattern they make is the chart. Three points matter most when you first look at it: the Lagna, the sign rising in the east at that moment; the Moon sign, or Rashi, found among the twelve{' '}
              <a
                href="/zodiac-signs/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/zodiac-signs/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                zodiac signs
              </a>
              {' '}and the Nakshatra, the birth star the Moon was passing through. Together they set the tone of the whole chart — your nature, your strengths, and the timing of the big events. Those three points are what turn twelve empty houses into a kundali birth chart worth reading.
            </p>
            <p className="mt-3">
              Different families call the chart by different names, and the names tell you where the family comes from. In the north it is usually janam kundali, the chart of birth; in the south it is jathagam, read in the South Indian style with the houses drawn in a fixed square. The old texts call it janampatri, the written record of the birth, or jataka kundali — jataka meaning birth. Two systems read it most often: the Vedic way, which gives you a vedic kundali, and the Krishnamurti system, which gives you a kp kundali and divides the houses differently. People also reach this page through astro kundali searches, because the chart is what an astrologer actually reads — and the{' '}
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
              {' '}hub explains how the chart fits into the wider system.
            </p>
            <p className="mt-3">
              Your kundli is personal to you. It is built from your own date, time and place of birth, so two people born on the same day can have different charts — a different Lagna, different houses, different yogas. That is why the tool makes a new kundali for every person, fresh each time, and why it asks for the birth time when you have it: the time is what sets the Lagna. From the result you can save the whole thing — the chart, the planetary table and the reading together — as a kundali report, free to download and yours to keep.
            </p>
            <p className="mt-3">
              Open the result and you see the chart drawn out — the kundali image itself, a square of twelve houses with the planets placed in them, or the same chart as a circle, the kundli view with the planets around the wheel. Look first at five things: the houses, the planets, the Lagna, the Moon sign and the Nakshatra. Those are the kundali details that carry the reading, and the tool&apos;s result shows them all — a detailed kundali, with nothing left out. If you are looking for a chart you made before, the tool finds it again from your birth details, which is what a kundali finder does. And the kundli place the tool asks for is your place of birth: it fixes the Lagna. Type too fast and you get kunduli — the misspelling is common enough to have its own search numbers, and if you typed it, you are in the right place.
            </p>
            <p className="mt-3">
              The whole page reads in English, including the tool&apos;s result. If you arrived by searching kundli in english, that is what you get — the chart and its reading in plain words, with the Sanskrit names explained as they come up. In Hindi the request is usually kundali nikale — to draw the chart out — and the tool does exactly that in seconds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali by Date of Birth
            </h2>
            <p>
              The date of birth does most of the work. It fixes the Moon&apos;s position, and the Moon&apos;s position fixes your Nakshatra — the birth star the whole chart is built on. That is why kundali by date of birth is the way most people make their chart: enter the date in the tool above and you get your kundali chart, your Moon sign and your Nakshatra in seconds. You may have typed it as kundli by date of birth, or shortened it to kundali by dob — dob is short for date of birth — and either way the tool draws the same chart.
            </p>
            <p className="mt-3">
              Add the birth time and the chart gets sharper. The time fixes the Lagna — the sign rising when you were born — and the exact house each planet sits in, so the reading can speak about timing as well as character. That is the full version: a janam kundali by date of birth and time, the chart to use when you have the time written down somewhere — a hospital record, a family diary, an old horoscope. The same two details — date and time — are what a janampatri by date of birth needs, and what a jathakam based on date of birth and time needs in the south.
            </p>
            <p className="mt-3">
              If you do not know your birth time, use the &ldquo;by date of birth only&rdquo; mode. The tool builds the chart from the date alone, using the Moon sign and Nakshatra, and it is honest about what is missing: the Lagna and the house positions are approximate, not exact. The Moon sign, the Nakshatra and the planetary signs are still correct, and that is enough for a first reading. If your search was kundli without time of birth, this mode is your answer: the date alone is enough to start. With the date alone you get a kundali chart by date of birth — complete for the Moon sign and Nakshatra, approximate for the houses — and it is free: a free kundali by date of birth, made online in seconds. You can add the time later, when you find it, and the chart sharpens.
            </p>
            <p className="mt-3">
              There is also a simpler way in: by name alone. The first letter of your name points to a Moon sign, and from that the tool gives a basic kundali by name — enough to start with, though far less detailed than a chart from the date. It works the same as a kundli by name check, and adding the date gives you kundali by name and date of birth: the name for the Moon sign, the date for the Nakshatra. It is the quickest check on the page, and the right one when a name is all you have. Families also pick a name from the chart — the kundali name by date of birth, the name the Nakshatra suggests for the child. For a lighter look at two names together, you can test{' '}
              <a
                href="/name-compatibility/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/name-compatibility/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                name compatibility
              </a>
              {' '}alongside your chart.
            </p>
            <p className="mt-3">
              You can also check date-based relationship synergy on our{' '}
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
              {' '}The analysis section below explains the other thing people ask the date for: a kundali prediction by date of birth — what the chart says about your future, and what it can and cannot say.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              How to Make Your Kundali
            </h2>
            <p>
              Kundali making used to mean sitting with an astrologer and a panchang — the almanac the calculations came from. The tool above does the same calculation in seconds, and you do not need to know the maths to use it. Most people arrive with a simple aim — to make my kundali — and if you have ever wondered how to make kundali online, the answer is three steps, and the first is the only one that needs you.
            </p>

            <ol className="list-decimal pl-5 space-y-2 mt-3">
              <li>
                <strong>Enter your birth details</strong> — name, date of birth, and birth time and place if you know them.
              </li>
              <li>
                <strong>Generate the chart</strong> — the tool places the planets in the twelve houses and finds your Lagna, Moon sign and Nakshatra.
              </li>
              <li>
                <strong>Read the result</strong> — the chart, the planetary positions table, the yogas in your kundali and the short reading below it.
              </li>
            </ol>

            <p className="mt-3">
              That is all there is to it. The tool draws the chart from your birth details, then explains what the chart shows — a kundli maker in the plain sense. It costs nothing, a free kundali maker with no software to install and no app to download, and it works as an online kundali maker, so the same chart comes out on a phone, which is why people also use it as a kundali making app. To create kundli online, free, enter the details and press the button — the tool will generate kundali online in seconds, and the full report is yours immediately.
            </p>
            <p className="mt-3">
              Behind the scenes, the tool works out the planetary positions from the date, time and place, so you never do the maths by hand. That is the kundali calculator at work — a kundali calculator free to use, with no payment and no sign-up — and the report it generates, chart, planetary table and yogas in one file, is the kundli generator at work. If all you want is the picture, it works as a kundali chart maker too, and the chart is ready to save from the result. The whole thing is free kundali making: no payment, no sign-up, no app.
            </p>
            <p className="mt-3">
              If you are making a kundali for someone else — a child, a partner, a family member — enter their birth details instead of yours. A new kundali is made fresh for each person; there is no shared or family kundali, because every chart depends on the exact birth moment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Reading Your Kundali Chart
            </h2>
            <p>
              Look at the result and you see your kundali chart — a square divided into twelve houses. Each house stands for an area of life — the first house is you, the seventh is marriage, the tenth is career — and each planet in a house colours that area. Reading the chart means reading the planets in their houses, not just looking at the picture. A{' '}
              <a
                href="/birth-chart-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/birth-chart-calculator/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                birth chart calculator
              </a>
              {' '}draws the same square, and the tool above draws an online kundli chart in seconds — but the reading is yours to do, and this section is how. If your question is how to read kundli at all, start with the Lagna, then the Moon sign, then the planets house by house.
            </p>

            <div className="space-y-3 mt-4 text-sm sm:text-base">
              <p>
                <strong>Find the Lagna (ascendant).</strong> The Lagna is the sign rising at your birth, and it is the first house — the house the whole chart is built from. Everything else follows from it: the other houses are counted from the Lagna, so a wrong Lagna means a wrong chart, which is why the birth time matters so much. The tool above shows your lagna kundali with the ascendant marked, free — a free lagna kundali, made from your birth details in seconds.
              </p>
              <p>
                <strong>Find the Moon sign and Nakshatra.</strong> Your Rashi, the Moon sign, is the sign the Moon was in when you were born, and your Nakshatra is the birth star it was passing through. Together they describe your mind, your emotions and your nature — the inner life, where the Lagna describes the outer one. It is your own chart that matters — my kundali chart, with your Lagna and Moon sign in it, not anyone else&apos;s.
              </p>
              <p>
                <strong>Read the planets house by house.</strong> A planet in the tenth house speaks about career; a planet in the seventh speaks about marriage; a planet in the fifth speaks about children and creativity. The same planet means something different in each house, which is why the chart is read house by house, not planet by planet. Go house by house and the chart starts to speak — that slow reading, house by house, is what a kundali house chart is for.
              </p>
              <p>
                <strong>Check the Navamsa (Navmansh) chart.</strong> The Navmansh kundali — also called a navamsa kundali — is a second, finer chart made from the same birth details. Astrologers read it alongside the main chart, especially for marriage — a planet that is strong in both charts is genuinely strong. Read the navmansh kundli alongside the main chart, and the tool above draws it for you: a navmansh kundli calculator is built into the result, and the Navamsa chart sits beside the main one.
              </p>
              <p>
                <strong>Check the Chalit chart.</strong> The Chalit kundali adjusts the house positions for the exact birth time. It matters most when a planet sits near the edge of a house — the Chalit chart tells you which side of the line it falls on.
              </p>
            </div>

            <p className="mt-4">
              You do not need to memorise all of this to use the tool: the result shows your Lagna chart, your Navamsa chart and your planetary positions, with a plain reading of each. The square and the circle are the same chart — the kundli chakra is the wheel diagram, drawn as a circle — and the chart is free: a free kundali chart, made online in seconds, yours to keep.
            </p>
            <p className="mt-3">
              A kundli online check takes seconds; understanding the result takes a little longer, and that is what this section is for. If your question is how to check kundali at all, the answer is the tool above: enter the date, and the chart appears. From there you can read kundali online, on this page — the chart, the reading and the report together. The kundali photo on the result is the chart itself, drawn out for you to see — save it, and you have the chart wherever you go.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={kundaliAstrologerImage}
              alt="A Vedic astrologer reading a kundali chart by lamplight"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              Reading a kundali means reading the planets in their houses — the chart is the starting point, not the answer.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali Analysis and Prediction
            </h2>
            <p>
              A chart only matters when it answers a question — about career, marriage, health or what is ahead. That is what analysis is: reading the chart with a question in mind, and letting the houses answer it. The tool above gives you a free kundali analysis from your birth details — the chart read for your questions, not in the abstract — and this section explains what each part of that analysis means.
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Career:</strong> the tenth house, its lord and the planets in it describe your career — the kind of work that suits you, and when career changes are likely. Start with the tenth house, then look at its lord, then at the planets sitting in it; a strong tenth house usually means a steady career, and a weak one means the work will take longer to settle. People looking for kundali for career usually want one thing: the tenth house, its lord and the planets in it, read in that order. A career kundli reading starts in the same place — the tenth house — and follows the same order.
              </li>
              <li>
                <strong>Marriage and love:</strong> the seventh house describes marriage and partnership, and Venus describes love — read them together and you get the timing of marriage and the shape of the partnership. Love marriage in kundli is read from the seventh house and from Venus — the house for partnership, the planet for love — and the chart can show whether the marriage is likely to be love or arranged. For a full match between two people, use the{' '}
                <a
                  href="/kundali-matching/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/kundali-matching/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  kundali matching
                </a>
                {' '}page — matching compares two kundalis, while this page reads one. You can also explore our core{' '}
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  love calculator
                </a>
                {' '}for romantic chemistry.
              </li>
              <li>
                <strong>Future prediction:</strong> the Dasha periods — the planetary periods running through your life — say when things are likely to happen, not just what they are. A kundali prediction reads those periods, and a kundli prediction reads them the same way; the strongest signal in either is a Dasha change, when the ruling planet changes and the theme of your life changes with it. That timing is what a free kundali prediction gives you — the periods, laid out year by year, with what each one favours. In Hindi it is called kundali bhavishya — bhavishya means the future — and the question people usually bring is my kundali and future: their own chart, read for what is ahead.
              </li>
              <li>
                <strong>My kundali, checked:</strong> if you came here by searching my kundali, this is the report you were looking for — your own chart, with your own placements. Enter your details above and the tool gives your chart, your analysis and your prediction in one report, including a free kundli analysis of the houses that matter for your question. The point is to know your kundli well enough to use it: not to memorise every placement, but to know which houses matter for the question you have. That is the report to save — a free kundali report, yours to download and keep. For additional destiny clues, explore our{' '}
                <a
                  href="/numerology-calculator/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/numerology-calculator/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  numerology calculator
                </a>
                {' '}and{' '}
                <a
                  href="/numerology/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/numerology/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  numerology
                </a>
                {' '}alongside your astrological chart.
              </li>
              <li>
                <strong>Reading:</strong> the tool&apos;s result is written as a kundali reading: the chart first, then what it means, in plain words. It is free, and it is online — a free kundli reading, made in seconds — and you can come back to it whenever the question changes.
              </li>
              <li>
                <strong>Horoscope and today:</strong> your horoscope is drawn from this chart, not from your sun sign alone — a kundali horoscope follows the Moon and the Lagna, so it is personal in a way a newspaper horoscope never is. The tool&apos;s daily reading is the same chart read for today: kundali today, with what the day favours and what needs care. It updates every day, which is why people call it a live kundali — the chart, read fresh each morning.
              </li>
            </ul>

            <p className="mt-3">
              Treat a kundali reading as a guide, not a verdict. The chart shows tendencies and timings; what you do with them is yours. If a prediction worries you, read the dosha and yoga sections too — a single placement is never the whole story. And the best kundli is your own chart made from correct birth details — the best kundli of a person is their own accurate kundali, not anyone else&apos;s.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Yogas in Your Kundali
            </h2>
            <p>
              Some combinations of planets matter more than single placements. When two or more planets combine in a particular way, the result has a name — a yoga — and the tool above checks your chart for the main ones automatically. To check yogas in your kundali free, enter your birth details above; the tool looks for kundli yog, one combination at a time, and lists the ones it finds with the reading, in plain words.
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Raj Yoga:</strong> the classic yoga of status and success — formed when the lords of the good houses, the kendra and trikona houses, combine. A raj yoga calculator checks your chart for these combinations, and a strong Raj Yoga is traditionally read as success in career and public life. From the date alone, a raj yoga calculator by date of birth finds the same combinations, and it is free — a raj yoga calculator free, in the tool above.
              </li>
              <li>
                <strong>Vipreet Raj Yoga:</strong> a Raj Yoga formed from the lords of the difficult houses — the 6th, 8th and 12th. A vipreet raj yoga calculator checks for it. It is read as success rising out of difficulty — gains after struggle, and often later in life than a straight Raj Yoga.
              </li>
              <li>
                <strong>Neech Bhang Raj Yoga:</strong> formed when a debilitated planet&apos;s weakness is cancelled — a weak planet made strong by the company it keeps. A neech bhang raj yoga calculator checks for it, and it is read as recovery: a weak start that turns strong.
              </li>
              <li>
                <strong>Kaal Sarp Yoga (Kaal Sarp Dosh):</strong> formed when all seven planets sit between Rahu and Ketu. A kaal sarp dosh calculator checks for this pattern, and a kaal sarp yog calculator is the tool that looks for it. It is traditionally read as delays and struggle early in life, easing with time — a flag to look closer, not a final verdict.
              </li>
              <li>
                <strong>Child Yog:</strong> combinations read for children — their timing and well-being — from the fifth house. If you came looking for child yog in my kundli free, the tool above checks it the same way: enter the birth details, and the yogas found are listed with the reading.
              </li>
            </ul>

            <p className="mt-3">
              A yoga is one combination among many — always read it with the rest of the chart. Use the tool above as a yoga calculator in kundli: enter your birth details, and the yogas found are listed with the reading.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Jathagam and Jathakam
            </h2>
            <p>
              In Tamil and Telugu families the chart has another name: jathagam, also spelled jathakam. It is the same birth chart, read in the South Indian style — a south indian kundali chart looks different from a North Indian one, because the houses are drawn in a fixed square, but the planets, the houses and the readings are the same. In Kerala it is a kerala kundali, and the tool above makes all three: the North Indian kundali, the South Indian jathagam and the Kerala chart, because the chart is the same.
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Jathagam online:</strong> make your jathagam online from your date of birth and time, in the same tool above. Enter your details and you get your jathagam chart, your Rashi and your Nakshatra. It is the most searched South Indian form — jathagam online is the way most Tamil and Telugu families look for it — and it is free: a jathagam online free check, with no sign-up.
              </li>
              <li>
                <strong>Jathagam by date of birth:</strong> the date of birth fixes the Nakshatra, exactly as in a North Indian kundali. Add the time and you get the Lagna and the house positions as well — a jathagam by date of birth and time, the full chart. With the date alone, the south Indian form is a date of birth jathakam, and a jathakam based on date of birth and time is the full version with the Lagna included.
              </li>
              <li>
                <strong>Jathakam matching:</strong> the South Indian form of kundali matching is jathakam matching — the same guna check between two charts, read in the Tamil or Telugu way. That matching is covered in full on our{' '}
                <a
                  href="/kundali-matching/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/kundali-matching/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  kundali matching
                </a>
                {' '}page, including telugu jathakam matching for marriage and online jathakam for marriage in telugu. The Tamil form is checked as{' '}
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
                {' '}in the Tamil way.
              </li>
              <li>
                <strong>Jathagam calculator:</strong> the tool above is also a jathagam calculator — it makes the chart from your birth details and reads it, in English, for Tamil, Telugu and Malayalam names alike. Families looking for a tamil jathagam calculator land on the same tool, and a jathagam generator is the same tool named for what it generates: the jathagam itself.
              </li>
              <li>
                <strong>Jathagam in English:</strong> the whole page reads in English, including the tool&apos;s result. If you arrived by searching jathagam in english, that is what you get — the South Indian chart, explained in plain words, with the Tamil and Telugu names explained as they come up. For marriage, the chart is read as a marriage jathagam — the same chart, read for the wedding rather than for career. A free jathagam is the chart itself, free — the same tool, no payment. You can save the jathagam report from the result — a free jathagam download, yours to keep.
              </li>
              <li>
                <strong>Jathagam parka:</strong> in Tamil, to look at the chart is tamil jathagam parka — &ldquo;to look at the jathagam&rdquo; — and the tool above is where you look: enter the details, and the chart appears. Families searching computer jathagam tamil want a chart made by software, not by hand — and that is what the tool above is.
              </li>
            </ul>

            <p className="mt-3">
              There is no separate page per language or region — one kundali tool serves the North Indian kundali, the South Indian jathagam and the Kerala kundali, because the chart is the same.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Is Kundali Free? Online, App and Software
            </h2>
            <p>
              Yes. Everything on this page is free kundali — the chart, the reading and the report — with no app to install and no sign-up. Open the page, enter your date of birth, and the chart appears in seconds. That is the whole offer: a free online kundali, with nothing to install and nothing to pay. What you get is a free janam kundali — the chart, the reading and the report, with no sign-up.
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Online kundali:</strong> the tool above is an online kundali maker — a free kundali online, made in your browser, with nothing to install. The tool also makes a janam kundali online and a janampatri online — the written record of your birth, drawn from the same details. An online kundali check works the same way: enter the details, get the chart, read the result. The chart is Vedic — a free vedic kundali, read the Vedic way, with no payment.
              </li>
              <li>
                <strong>Kundali app:</strong> a kundali app does the same job on a phone — the chart, the reading and the report, in an app instead of a browser. The website tool gives you the same chart without installing anything, and it works on any phone browser. A kundali app download takes a minute to install; the website tool takes seconds, and the chart is the same. If you prefer an app, a free kundali app does the same work for free — and a janam kundli app is the app form of the janam kundali, for families who want the chart on their phone. People ask for the best kundli app — the answer is the one that gives you the chart without a fee, and this tool does that in the browser.
              </li>
              <li>
                <strong>Kundali software:</strong> kundli software is the desktop version of the same calculation — a program on your computer that draws the chart. Free kundali software does it for free, and kundli software for pc is the Windows version. Kundali software and the online tool do the same calculation; the online tool is the quicker way to get the same result. A kundli software download takes minutes to install; the online tool takes seconds, and the chart is the same. People ask for the best kundli software — the honest answer is the one that draws the chart correctly, and the online tool does that for free.
              </li>
              <li>
                <strong>Kundali download:</strong> you can save your kundali report — the chart and the reading — from the result. That saved file is a kundali download, and it is free: a free kundali download, yours to keep. Save it as a kundli download and it is the same file — chart and reading together. The janampatri saves the same way — a janampatri online free download is the saved janampatri, free.
              </li>
              <li>
                <strong>AI kundali:</strong> if you came looking for an ai kundali reading, the tool above already does that job — it takes the chart and turns the placements into a plain-language reading, without an astrologer in the room. The reading is written by software, and the chart comes first, then what it means. The same software reading is what people mean by kundali ai, and an online jyotish kundali is a reading through a jyotish — astrology — site.
              </li>
              <li>
                <strong>Kundli near me:</strong> a lot of people search kundli near me, expecting a shop or an office to visit. There isn&apos;t one to visit — the chart is made online, so the same free tool answers it wherever you are. The same goes for kundali near me, and for a computer jathagam near me: the answer is the free online tool above, wherever you are.
              </li>
              <li>
                <strong>Languages:</strong> the tool reads the chart in English, for names in any Indian language. Gujarati families looking for kundli online gujarati will find the same tool — the chart is drawn from the birth details, whatever language the name is in — and a free bengali kundali is the same free chart in Bengali.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali for Marriage
            </h2>
            <p>
              Kundali for marriage works in two ways: reading your own chart, and matching two charts. Reading your own chart means the seventh house — its lord, the planets in it and Venus — which describes marriage timing and partnership. Read this way, your own chart is a marriage kundali, and a kundali check for marriage is that reading: the seventh house, read for marriage. A free janam kundali analysis for marriage is that reading, free — the chart read for marriage, with nothing to pay. The tool above reads the seventh house in your analysis, so the check is already in your result — and the{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                kundali matching
              </a>
              {' '}page takes it further, comparing your chart with a partner&apos;s.
            </p>
            <p className="mt-3">
              Matching two kundalis is a different check: it compares two charts, guna by guna, out of 36, and the result is a kundali compatibility score, with the doshas checked beside it. That comparison is covered in full on our{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                kundali matching
              </a>
              {' '}page — if your question is how to match kundali at all, that page walks through it. Use this page to make each person&apos;s kundali, then use the{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                kundali matching
              </a>
              {' '}page to compare them. To match kundali online, make both charts here first. Families searching in Marathi often ask for kundli match marathi, and the matching page covers that too, along with kundli match making for everyone else.
            </p>
          </section>
        </article>

        {/* FAQs */}
        <div className="mt-16">
          <FAQSection faqs={faqs} />
        </div>

        {/* Related Tools & Articles */}
        <div className="mt-16 space-y-12">
          <RelatedTools onNavigate={onNavigate} currentToolId="dob" />
          <RelatedArticles onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
};
