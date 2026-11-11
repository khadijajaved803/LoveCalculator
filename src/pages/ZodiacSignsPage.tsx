import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { CalculationLoader } from '../components/CalculationLoader';
import { ZodiacResultCard } from '../components/ZodiacResultCard';
import {
  findZodiacDetails,
  ZodiacFinderMode,
  ZodiacFinderResult,
  ALL_ZODIAC_SIGNS,
} from '../lib/zodiacEngine';
import {
  Sparkles,
  Calendar,
  Clock,
  User,
  Compass,
  ArrowRight,
  Sun,
  Flame,
  Globe,
  Star,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const ZodiacSignsPage: React.FC<Props> = ({ onNavigate }) => {
  // Modes: 'dob' (main) | 'dob-time' (with moon sign) | 'name' (rashi by name)
  const [mode, setMode] = useState<ZodiacFinderMode>('dob');

  // Inputs
  const [dob, setDob] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [name, setName] = useState('');

  // Status
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<ZodiacFinderResult | null>(null);
  const [error, setError] = useState('');

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'name') {
      if (!name.trim()) {
        setError('Please enter your name to find your sign.');
        return;
      }
    } else {
      if (!dob) {
        setError('Please select your date of birth.');
        return;
      }
    }

    setIsCalculating(true);
    setTimeout(() => {
      const res = findZodiacDetails(dob, birthTime, name.trim(), mode);
      setResult(res);
      setIsCalculating(false);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 550);
  };

  const handleReset = () => {
    setResult(null);
    setDob('');
    setBirthTime('');
    setName('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      question: 'What is my zodiac sign?',
      answer:
        'Enter your date of birth in the tool above. It gives you your sun sign, your moon sign (when you add your birth time) and your rashi. What is my zodiac sign by date of birth is the same question, answered the same way.',
    },
    {
      question: 'How to know my zodiac sign?',
      answer:
        'By your date of birth: the sign the Sun was in on that date is your sun sign. How to know your zodiac sign, how to find my zodiac sign and how to check my zodiac sign are the same question, with the same answer — use the tool above, or look up your birth date in the sign sections. Read our in-depth blog post on love compatibility by date of birth to understand how signs connect emotionally.',
    },
    {
      question: 'What is a moon sign?',
      answer:
        'Your moon sign is the sign the Moon was in when you were born. It describes your feelings and inner life, while your sun sign describes your outer nature. It needs your birth time for an exact answer, because the Moon changes sign every two and a half days.',
    },
    {
      question: 'What is my rashi?',
      answer:
        'Your rashi is your Indian moon sign — the sign the Moon was in at your birth, in the Vedic system. Find it with the rashi calculator in the tool above, from your date of birth and time. Rashi by date of birth alone is usually right too, because the Moon stays in one sign for about two and a half days.',
    },
    {
      question: 'How do I find my zodiac sign by name?',
      answer:
        'From the first letter of your name, in the Indian rashi system: the letter gives your Nakshatra, and the Nakshatra gives your rashi. S name zodiac sign and t name zodiac sign are the signs for names starting with S and T. The name check is less exact than the date-of-birth check, so confirm it with your birth date when you can.',
    },
    {
      question: 'What are the two zodiac signs for November?',
      answer:
        'Scorpio until November 21, then Sagittarius from November 22.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Zodiac Signs | All 12 Zodiac Signs, Dates & Your Sign by Date of Birth"
        description="All 12 zodiac signs with dates by month — find your zodiac sign, sun sign, moon sign and rashi by date of birth, free."
        canonicalPath="/zodiac-signs/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Zodiac Signs', href: '/zodiac-signs/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="text-center mt-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Your Sun Sign, Moon Sign &amp; Vedic Rashi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Zodiac Signs
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Find your zodiac sign free — enter your date of birth in the tool above and get your sun sign, your moon sign and your rashi, with the dates and what they mean.
          </p>
        </div>

        {/* Calculator Tool Card at the Top */}
        <div className="rounded-3xl bg-white border border-rose-100 shadow-xl p-6 sm:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

          {/* Copy on the tool card */}
          <div className="text-center mb-6">
            <p className="text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50/80 inline-block px-4 py-1.5 rounded-full border border-rose-100">
              Find your zodiac sign free — enter your date of birth.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex p-1 bg-slate-100/90 rounded-2xl mb-6 max-w-md mx-auto text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('dob');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                mode === 'dob'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Date of Birth
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('dob-time');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                mode === 'dob-time'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              DOB + Time (Moon Sign)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('name');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                mode === 'name'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Name Only
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleFind} className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/30 via-white to-pink-50/30 border border-rose-100/80 space-y-4 max-w-xl mx-auto">
              {mode !== 'name' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all bg-white"
                  />
                </div>
              )}

              {mode === 'dob-time' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Birth Time <span className="text-[10px] text-slate-400 font-normal">(refines exact Moon sign degree)</span>
                  </label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all bg-white"
                  />
                </div>
              )}

              {mode === 'name' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Suman, Tarun, Rohit"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all bg-white"
                  />
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-medium text-center max-w-xl mx-auto">
                {error}
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full sm:w-auto min-w-[260px] px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 shadow-lg shadow-rose-500/20 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Find My Zodiac Sign</span>
              </button>
            </div>
          </form>

          {/* Loader */}
          {isCalculating && (
            <div className="mt-8">
              <CalculationLoader
                name1="Celestial Orbit"
                name2="Solar Alignment"
                type="dob"
                minDuration={500}
                maxDuration={1000}
                onComplete={() => {}}
              />
            </div>
          )}

          {/* Result Card */}
          {result && !isCalculating && (
            <div className="mt-10 pt-8 border-t border-rose-100">
              <ZodiacResultCard
                result={result}
                onReset={handleReset}
                onNavigate={onNavigate}
              />
            </div>
          )}
        </div>

        {/* 12 Signs Quick Navigation Grid */}
        <div className="mb-12">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-4">
            Jump to any Zodiac Sign
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {ALL_ZODIAC_SIGNS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 hover:bg-rose-50/50 transition-all text-center group shadow-2xs"
              >
                <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                  {s.glyph}
                </span>
                <span className="text-xs font-bold text-slate-800 block">
                  {s.name}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {s.dates.split('–')[0].trim()}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Guide Content Below Tool */}
        <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8">
          <section>
            <p className="text-base sm:text-lg leading-relaxed">
              Zodiac signs are the twelve signs of the zodiac — Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius and Pisces — and each one covers a slice of the year. Your zodiac sign is decided by your date of birth: the sign the Sun was in when you were born is your sun sign, and the sign the Moon was in is your moon sign. This page lists all 12 zodiac signs with their dates, shows you the zodiac signs by month, and helps you find your own sign, your rashi and your moon sign — all in one place. You can also explore our foundational{' '}
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
              hub for deeper planetary insights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is a Zodiac Sign?
            </h2>
            <p>
              What is a zodiac sign? It is one of the twelve divisions of the sky that the Sun, Moon and planets pass through in a year. What is zodiac, in short, is this wheel of twelve signs — and what does zodiac sign mean, in practice, is which sign was rising over you at your birth, and what that sign is said to mean for your nature. A zodiac sign is also called a star sign, and star signs are the same twelve signs under their other name. Sunsigns is the same word again, written as one.
            </p>
            <p className="mt-3">
              There are 12 zodiac signs, and all 12 zodiac signs are listed below in order, with their dates: the zodiac signs in order are Aries (1st zodiac sign), Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn (the 10th zodiac sign), Aquarius and Pisces. A list of zodiac signs is also called a zodiac list, and the zodiac names — the zodiac signs and names together — are the same twelve names. To name all the zodiac signs is to list the twelve: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius and Pisces. A birth signs list is the same list, and birth signs dates and zodiac birth dates are the same dates — the dates each sign covers. Zodiac star signs are the same twelve signs under their star name. The types of zodiac signs are the same twelve, and different zodiac signs simply means different signs of the same wheel. A zodiac chart and a zodiac sign chart are the wheel drawn out — the twelve signs in a circle, with the dates on them. Zodiac signs in English are the same signs in their English names, and star signs in English are the same again.
            </p>
            <p className="mt-3">
              Your sign has three layers, and this page covers all three: the sun sign (from your date of birth), the moon sign (from the Moon&apos;s position, which needs your birth time) and the rising sign (from the exact birth time and place). In the Indian system the same Moon sign is called your rashi — the rashi chart is the Indian form of the same wheel, and zodiac signs in Hindi by date of birth and hindu zodiac signs by date of birth are the same signs read the Indian way. Zodiac astrology and{' '}
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
              zodiac signs are the same subject: the study of the signs and what they mean.
            </p>
          </section>

          {/* The 12 Zodiac Signs Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-6">
              The 12 Zodiac Signs
            </h2>
            <p className="mb-6">
              Here are all zodiac signs with their dates. The zodiac signs dates are the sun sign dates — the dates the Sun is in each sign — and the zodiac dates below are the standard Western dates used on this page. Each sign below also lists its birth dates, its birth month and its horoscope dates, so you can find your sign however you search for it.
            </p>

            <div className="space-y-6">
              {/* 1. Aries */}
              <div id="aries" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♈</span>
                  <span>1. Aries — March 21 to April 19</span>
                </h3>
                <p>
                  Aries dates are March 21 to April 19. Aries birth dates are the same range, and the aries birth month is mostly April — March 21 to 31 is Aries too, so the aries birthday month is March and April together. The aries date range is March 21–April 19, and the aries horoscope dates are the same range. Aries is a fire sign, ruled by Mars: bold, direct and quick to start things. If you were born on April 18, your sign is Aries — and if you were born on April 21, your sign is Taurus, not Aries.
                </p>
              </div>

              {/* 2. Taurus */}
              <div id="taurus" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♉</span>
                  <span>2. Taurus — April 20 to May 20</span>
                </h3>
                <p>
                  Taurus dates are April 20 to May 20. Taurus birth dates are the same range, and the taurus birth month is May for most of the sign, with April 20 to 30 in Taurus too. The taurus date range is April 20–May 20, and the taurus zodiac dates, taurus sign dates and taurus sun sign dates are the same range. Taurus is an earth sign, ruled by Venus: steady, patient and fond of comfort. If you were born on April 23, your sign is Taurus — and if you were born on May 12, your sign is Taurus too.
                </p>
              </div>

              {/* 3. Gemini */}
              <div id="gemini" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♊</span>
                  <span>3. Gemini — May 21 to June 20</span>
                </h3>
                <p>
                  Gemini dates are May 21 to June 20. Gemini birth dates are the same range, and the gemini birth month is June for most of the sign, with May 21 to 31 in Gemini too. The gemini date range is May 21–June 20, and the gemini zodiac dates are the same range. Gemini is an air sign, ruled by Mercury: quick, curious and good with words.
                </p>
              </div>

              {/* 4. Cancer */}
              <div id="cancer" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♋</span>
                  <span>4. Cancer — June 21 to July 22</span>
                </h3>
                <p>
                  Cancer zodiac dates are June 21 to July 22, and the cancer zodiac sign dates are the same range. The cancer horoscope dates are June 21–July 22 as well, and the cancer sun sign dates are the same. The cancer birth month is July for most of the sign, with June 21 to 30 in Cancer too, so the cancer birthday month is June and July together, and the cancer sign dates are the same range. A cancer zodiac sign personality is traditionally read as caring, protective and close to home and family. If you were born on July 12, your sign is Cancer.
                </p>
              </div>

              {/* 5. Leo */}
              <div id="leo" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♌</span>
                  <span>5. Leo — July 23 to August 22</span>
                </h3>
                <p>
                  Leo horoscope dates are July 23 to August 22, and the leo sun sign dates and leo zodiac sign dates are the same range. Leo birth dates are July 23–August 22, and the leo birth month is August for most of the sign, with July 23 to 31 in Leo too. The leo date range is July 23–August 22, and the leo zodiac dates are the same range. Leo dob — the date of birth of a Leo — falls in that range, and Leo is a fire sign, ruled by the Sun: warm, proud and fond of being noticed. If you were born on August 21, your sign is Leo — and if you were born on August 12, your sign is Leo too.
                </p>
              </div>

              {/* 6. Virgo */}
              <div id="virgo" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♍</span>
                  <span>6. Virgo — August 23 to September 22</span>
                </h3>
                <p>
                  Virgo birth dates are August 23 to September 22, and the virgo zodiac sign dates are the same range. Virgo is an earth sign, ruled by Mercury: careful, practical and good with detail. If you were born on September 12, your sign is Virgo — and if you were born on September 21, your sign is Virgo too, and so is September 20.
                </p>
              </div>

              {/* 7. Libra */}
              <div id="libra" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♎</span>
                  <span>7. Libra — September 23 to October 22</span>
                </h3>
                <p>
                  Libra dates are September 23 to October 22. Libra birth dates are the same range, and the libra birth month is October for most of the sign, with September 23 to 30 in Libra too, so the libra birthday month is September and October together. The libra date range is September 23–October 22, and the libra zodiac dates, libra zodiac sign dates and libra horoscope dates are the same range. Libra dob — the date of birth of a Libra — falls in that range, and a libra birthday is any date in it. Libra is an air sign, ruled by Venus: fair, social and fond of balance. If you were born on September 24, your sign is Libra — and if you were born on October 12 or October 19, your sign is Libra too.
                </p>
              </div>

              {/* 8. Scorpio */}
              <div id="scorpio" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♏</span>
                  <span>8. Scorpio — October 23 to November 21</span>
                </h3>
                <p>
                  Scorpio birth dates are October 23 to November 21. The scorpio birth month is November for most of the sign, with October 23 to 31 in Scorpio too. The scorpio date range is October 23–November 21, and the scorpio sign dates, scorpio sun sign dates, scorpio horoscope dates and scorpio zodiac sign dates are the same range. Scorpio is a water sign, ruled by Mars and Pluto: intense, private and determined. If you were born on November 19, your sign is Scorpio.
                </p>
              </div>

              {/* 9. Sagittarius */}
              <div id="sagittarius" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♐</span>
                  <span>9. Sagittarius — November 22 to December 21</span>
                </h3>
                <p>
                  Sagittarius dates are November 22 to December 21. Sagittarius birth dates are the same range, and the sagittarius birth month is December for most of the sign, with November 22 to 30 in Sagittarius too. The sagittarius date range is November 22–December 21. Sagittarius is a fire sign, ruled by Jupiter: open, honest and fond of travel and new ideas.
                </p>
              </div>

              {/* 10. Capricorn */}
              <div id="capricorn" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♑</span>
                  <span>10. Capricorn — December 22 to January 19</span>
                </h3>
                <p>
                  Capricorn bday dates are December 22 to January 19, and the capricorn birth month is January for most of the sign, with December 22 to 31 in Capricorn too. The capricorn date range is December 22–January 19. Capricorn is an earth sign, ruled by Saturn: patient, ambitious and steady over the long run.
                </p>
              </div>

              {/* 11. Aquarius */}
              <div id="aquarius" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♒</span>
                  <span>11. Aquarius — January 20 to February 18</span>
                </h3>
                <p>
                  Aquarius dates are January 20 to February 18. Aquarius birth dates are the same range, and the aquarius birth month is February for most of the sign, with January 20 to 31 in Aquarius too. The aquarius sun sign dates and aquarius zodiac sign dates are the same range. Aquarius is an air sign, ruled by Saturn and Uranus: original, independent and fond of new ideas.
                </p>
              </div>

              {/* 12. Pisces */}
              <div id="pisces" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♓</span>
                  <span>12. Pisces — February 19 to March 20</span>
                </h3>
                <p>
                  Pisces dates are February 19 to March 20. Pisces birth dates are the same range, and the pisces birth month is March for most of the sign, with February 19 to 29 in Pisces too. The pisces date range is February 19–March 20, and the pisces zodiac dates, pisces horoscope dates and pisces zodiac sign dates are the same range. Pisces is a water sign, ruled by Neptune and Jupiter: kind, dreamy and quick to feel what others feel. If you were born on March 12, your sign is Pisces.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Zodiac Signs by Month
            </h2>
            <p>
              Two zodiac signs fall in every month, because each sign straddles two months. The zodiac signs by month below give the signs for each month, and the zodiac signs for each month, the zodiac signs for every month and the zodiac signs per month are the same list. Zodiac signs according to months and zodiac signs according to dates are the same list read two ways — by month and by date. The zodiac signs months and the zodiac signs months and dates are the same list with the dates on it, and the zodiac signs and dates and the zodiac signs and their months are the same list again. The zodiac and months list is the same thing, and star signs and months are the same list under the star-sign name. Birth months and zodiac signs go together the same way: your birth month decides your sign, with the exact day deciding which of the two signs in that month is yours. A month wise zodiac sign is the sign for that month, and zodiac signs by birth month are the same month list.
            </p>

            <ul className="list-disc pl-5 space-y-2.5 mt-4">
              <li>
                <strong>January:</strong> Capricorn until January 19, then Aquarius from January 20. A january born zodiac sign is Capricorn before January 20 and Aquarius after it, and the january sun sign is the same split. The january month zodiac sign is Capricorn for most of the month, and a jan born zodiac sign is the same January sign.
              </li>
              <li>
                <strong>February:</strong> Aquarius until February 18, then Pisces from February 19. A february month zodiac sign is Aquarius before February 19 and Pisces after it, and the february star sign and february sun sign are the same split. A feb born zodiac sign is the same February sign, and a feb star sign is the same again.
              </li>
              <li>
                <strong>March:</strong> Pisces until March 20, then Aries from March 21. A march born zodiac sign is Pisces before March 21 and Aries after it, and the march month zodiac sign is the same split. March 12 is Pisces, and a march born zodiac is the same March sign.
              </li>
              <li>
                <strong>April:</strong> Aries until April 19, then Taurus from April 20. April 18 is Aries, April 21 is Taurus and April 23 is Taurus.
              </li>
              <li>
                <strong>May:</strong> Taurus until May 20, then Gemini from May 21. A may month zodiac sign is Taurus before May 21 and Gemini after it, and a may born zodiac sign is the same May sign. May zodiac is the same May list, and the rashi of may born is the Indian sign for a May birth.
              </li>
              <li>
                <strong>June:</strong> Gemini until June 20, then Cancer from June 21. A june zodiac sign is Gemini before June 21 and Cancer after it, and a june born zodiac sign is the same June sign. The june sun sign and the june month zodiac sign are the same split, and june zodiac is the same June list.
              </li>
              <li>
                <strong>July:</strong> Cancer until July 22, then Leo from July 23. A july sun sign is Cancer before July 23 and Leo after it, and a july zodiac sign and a july born zodiac sign are the same July split. July 12 is Cancer, the 19th july zodiac sign is Cancer, and the 12 july star sign is Cancer too. July zodiac is the same July list, and the july month zodiac sign is the same split.
              </li>
              <li>
                <strong>August:</strong> Leo until August 22, then Virgo from August 23. An august zodiac sign is Leo before August 23 and Virgo after it, and an august born zodiac sign is the same August split. The august sun sign is the same split, and the august star sign and august month zodiac sign are the same again. August 21 is Leo, August 12 is Leo, and 18 august zodiac sign is Leo too.
              </li>
              <li>
                <strong>September:</strong> Virgo until September 22, then Libra from September 23. A september zodiac sign is Virgo before September 23 and Libra after it, and a september born zodiac sign is the same September split. The september sun sign, the september star sign, the september month zodiac sign and the september birthday zodiac are the same split. September 12 is Virgo, September 21 is Virgo, sept 20 zodiac sign is Virgo, 12 sep zodiac sign is Virgo and 12 sep zodiac is Virgo too, while September 24 is Libra.
              </li>
              <li>
                <strong>October:</strong> Libra until October 22, then Scorpio from October 23. An october zodiac sign is Libra before October 23 and Scorpio after it, and an october born zodiac sign is the same October split. The october sun sign and the oct sun sign are the same split, and the october month zodiac sign, the october star sign, the october zodiac and the october birthday zodiac sign are the same again. October 12 is Libra — the october 12 zodiac, the october 12 zodiac sign and the 12 october zodiac sign are all Libra — and October 19 is Libra too. The rashi of october born is the Indian sign for an October birth.
              </li>
              <li>
                <strong>November:</strong> Scorpio until November 21, then Sagittarius from November 22. A november zodiac sign is Scorpio before November 22 and Sagittarius after it, and a november born zodiac sign is the same November split. The november sun sign, the november star sign, the november month zodiac sign and the november zodiac are the same split. November 19 is Scorpio — the november 19 zodiac sign and the 19 november zodiac are both Scorpio. What are the two zodiac signs for november? Scorpio and Sagittarius.
              </li>
              <li>
                <strong>December:</strong> Sagittarius until December 21, then Capricorn from December 22. A december zodiac sign is Sagittarius before December 22 and Capricorn after it, and a december born zodiac sign is the same December split. The december star sign, the december month zodiac sign, the december zodiac and the december born zodiac are the same split.
              </li>
            </ul>

            <p className="mt-4">
              What sign is it on a single date? July 12 zodiac is Cancer, September 24 zodiac sign is Libra, September 12 zodiac sign is Virgo, September 21 zodiac sign is Virgo, April 23 zodiac sign is Taurus, April 18 zodiac sign is Aries, April 21 zodiac sign is Taurus, May 12 zodiac sign is Taurus, March 12 zodiac sign is Pisces, August 21 zodiac sign is Leo, August 12 zodiac sign is Leo, and October 19 zodiac sign is Libra.
            </p>
            <p className="mt-3">
              The zodiac signs dates by month above are the same as the sun sign dates: sun signs and dates, sun signs date wise and sunsign months are all the same list — the dates each sun sign covers. A zodiac calendar and a zodiac sign calendar are the same list drawn as a calendar, and a sun sign calendar is the same calendar under the sun-sign name. All zodiac signs dates are in the sign sections above, and the zodiac signs dates of birth are the same dates read from your birth date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              How to Find Your Zodiac Sign
            </h2>
            <p>
              How to find your zodiac sign is the question this page answers first: enter your date of birth in the tool above, and it gives you your sign. How to know your zodiac sign, how to check zodiac sign and how to find zodiac sign are the same question, and how to know zodiac sign, how to know my zodiac sign, how to find my zodiac sign, how to find your zodiac sign and how to find out zodiac sign are the same question again. How can i know my zodiac sign, how do i know my zodiac sign, how to determine zodiac sign, how to identify zodiac sign, how can i find my zodiac sign, know your zodiac sign and know my zodiac sign are the same question too, and how to find out your zodiac sign is the same again.
            </p>
            <p className="mt-3">
              What is my zodiac sign? That is the question the tool answers: what is my zodiac sign by date of birth is the same question with the birth date added, and what is my zodiac sign by name is the same question answered from your name instead. How to check your zodiac sign and how to check my zodiac sign are the same check, and which is my zodiac sign, which zodiac sign, what&apos;s your zodiac sign and what is your zodiac sign are the same question asked four ways. How to know my zodiac is the same question shortened, and how to know zodiac sign by date of birth is the same question with the birth date added.
            </p>
            <p className="mt-3">
              Find my zodiac sign with the tool above, or find my zodiac sign by date of birth the same way — the date of birth is all it needs. Find zodiac sign by date of birth, find zodiac by date of birth, find zodiac sign by date of birth and time, and find my zodiac sign by date of birth are the same finding, and a zodiac sign finder and a zodiac finder are the same tool. How to find zodiac sign by date of birth is the same question, answered the same way. A zodiac sign calculator and a zodiac calculator are the same tool too, and a zodiac sign by date of birth and time is the same calculation with the time added. A birth sign finder is the same finder, and a zodiac sign according to birth date, a zodiac sign according to date of birth, a zodiac sign according to birth month, a zodiac sign according to name, a zodiac sign according to birthday, a zodiac sign as per date of birth, a zodiac sign based on date of birth and a zodiac according to date of birth are the same finding written different ways. A date wise zodiac sign is the sign for that date, and a zodiac sign by name is the sign from your name. You can also calculate relationship metrics using our{' '}
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
              How to find zodiac sign by name and how to know zodiac sign by name are the same question: the first letter of your name gives your rashi, and the rashi gives your sign. What is my zodiac sign by name is the same question, and a zodiac sign by name is the answer. S name zodiac sign is the sign for names starting with S, and t name zodiac sign is the sign for names starting with T — both are read from the first letter of the name, in the Indian rashi system. Zodiac signs by name and date of birth combine both: the name for the rashi and the date of birth for the sun sign. You can also test your acoustic chemistry with our{' '}
              <a
                href="/name-compatibility/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/name-compatibility/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                name compatibility
              </a>{' '}
              tool.
            </p>
            <p className="mt-3">
              A zodiac app and a zodiac sign app do the same job on a phone, and a star sign app is the same app under the star-sign name. The best zodiac app is the same app asked for as &ldquo;the best&rdquo; — the website tool above gives you the same result without installing anything. A star sign calculator is the same calculator under the star-sign name, and star sign dates, star sign months and star sign symbols are the same dates, months and symbols of the twelve signs. What is my star sign is the same question as what is my zodiac sign, and how to find star sign and find star sign by date of birth are the same finding.
            </p>
            <p className="mt-3">
              A zodiac love calculator is the love calculator read by zodiac sign — enter two signs and get a love score — and it lives on the{' '}
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
              home page. Love rashi is the same idea in the Indian system: the rashi read for love. Birth sign love compatibility is the same check: how well two birth signs get along, covered in full on our Love Compatibility by Zodiac Sign page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Rashi — Your Indian Zodiac Sign
            </h2>
            <p>
              Rashi is the Indian name for your moon sign — the sign the Moon was in when you were born. A rashi chart is the Indian form of the zodiac wheel, and a rasi chart is the same chart spelled the other way. Rashi ka chart is the same chart asked for in Hindi, and a rashi chart in english is the same chart explained in English. The rashi calculator in the tool above finds your rashi from your birth details, and a rashi by date of birth is the rashi found from the date alone. For a complete personal chart, visit our{' '}
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
              generator.
            </p>
            <p className="mt-3">
              How to know rashi by date of birth is the question most people ask first: the date of birth fixes the Moon&apos;s Nakshatra, and the Nakshatra gives the rashi. How to find rashi by date of birth and how to find my rashi are the same question, and find your rashi is the same finding — your own rashi, found from your birth date. The all rashi symbol list shows the symbol of each rashi: the Ram for Mesha, the Bull for Vrishabha, the Twins for Mithuna, and so on through all twelve. Rashi according to date of birth, rashi based on date of birth, rashi as per date of birth and rashi according to birth date are the same finding, and how to know my rashi, how to know your rashi by date of birth, how to know my rashi by date of birth, know your rashi and know rashi by date of birth are the same question. Find my rashi, find rashi by date of birth, find my rashi by date of birth, find out rashi based on date of birth and find rashi by date of birth and time are the same finding, and a rashi finder is the same tool. What is my rashi by date of birth is the same question, and my rashi by date of birth is the same answer.
            </p>
            <p className="mt-3">
              A rashi calculator by date of birth is the main rashi tool, and a rashi calculator by birth date and time is the fuller version — the time fixes the exact Moon position. A birth rashi by birth time and date is the same full rashi, and a janam rashi by date of birth and time is the same full rashi in its janam name. Rashi from birth date and time and rashi by birth date and time are the same full finding, and a rashi check by date of birth, check rashi by date of birth, how to check rashi by date of birth, how to check my rashi and check my rashi are the same check of your own rashi. A rashi by month and date, a rashi by month, a rashi by date and a rashi by birth are the same finding written shorter, and rashi according to month is the same month finding. A free rashi calculator, an online rashi calculator, an online rashi check and an online rashi are the same free online rashi tool, and a rashi calculator by name is the same tool run from your name — rashi by name and date of birth combines both, the name for the rashi and the date of birth for the sun sign.
            </p>
            <p className="mt-3">
              The other rashi spellings work the same way: a rasi calculator is the same calculator spelled &ldquo;rasi&rdquo;, and rasi by date of birth, date of birth rasi, rasi finder by date of birth, find rasi, find my rasi, how to find rasi, how to find my rasi, rasi based on date of birth, rasi chart for date of birth, name rasi chart, date of birth rasi palan and rasi calculator by date of birth are the same rasi findings. A hindu rashi calculator, a vedic rashi calculator and a vedic astrology rashi calculator are the same Vedic rashi tool, and a lagna rashi calculator, a chandra rashi calculator and a janma rashi calculator are the same tool named for what it finds — the Lagna rashi, the Chandra (Moon) rashi and the Janma (birth) rashi. A rashi name by date of birth in hindu is the Hindu name for your rashi, found from your date of birth.
            </p>
            <p className="mt-3">
              How to know rashi by date of birth without time is the same question with the time missing: the date alone still gives your rashi, because the Moon stays in one sign for about two and a half days — only the exact degree is approximate. Date of birth se rashi is the same question asked in Hindi — &ldquo;rashi from the date of birth&rdquo;. Today birth rashi is the rashi of people born today, and a rashi prediction is what the rashi is said to mean for your day, week or year — read your{' '}
              <a
                href="/rashifal-today/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/rashifal-today/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                rashifal today
              </a>{' '}
              for daily horoscope insights, or calculate your personal numbers with our{' '}
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
              .
            </p>
            <p className="mt-3">
              Rashi matching is the Indian form of matching two people: rashi matching for marriage, rasi matching for marriage, rashi nakshatra matching for marriage and rasi nakshatra matching are the same matching — two rashis and two Nakshatras compared for marriage — and rashi matching and rasi matching are the same matching shortened. Zodiac matching for marriage and zodiac signs match for marriage are the same matching in the Western system. All of it is covered in full on our{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                kundali matching
              </a>{' '}
              page, which compares two charts guna by guna, as well as on our{' '}
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
              tool for Tamil compatibility.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Moon Sign
            </h2>
            <p>
              What is a moon sign? It is the sign the Moon was in when you were born — and what is my moon sign is the question the tool above answers when you add your birth time. A moon sign calculator finds it from your date of birth and time, and a moon sign calculator by date of birth is the same calculator run from the date alone. A free moon sign calculator and calculate moon sign free are the same free calculation, and an online moon sign calculator and a vedic moon sign calculator are the same calculator online and in the Vedic system. Find moon sign by date of birth, find moon sign and how to calculate moon sign are the same finding, and a moon calculator, a birth moon calculator and a moon on my birthday calculator are the same calculator named three ways. A moon chart calculator is the tool that draws the Moon&apos;s chart, and moon chart astrology is the study of the Moon&apos;s chart.
            </p>
            <p className="mt-3">
              Moon sign meaning is what your moon sign is said to mean: the Moon rules your feelings, your habits and your inner life, while the Sun rules your outer nature. What is a moon sign, in short, is your emotional sign — and a moon sign horoscope is the horoscope read from it. Moon sign dates are the dates the Moon is in each sign — about two and a half days per sign, so the Moon sign changes far faster than the sun sign. A moon sign rashi is the same sign in the Indian system, and moon rashi is the same again. A moon sign chart is the chart drawn from the Moon&apos;s position, and moon astro and moon astrology are the same subject. Astrology moon sign is the same subject named the other way round.
            </p>
            <p className="mt-3">
              How to find moon sign, how to know moon sign, how to know your moon sign, how to know my moon sign, how to find out moon sign and how to find your moon sign are the same question, and how to find your moon sign is answered by the tool above when you add your birth time. My moon is the same request shortened — your own moon sign.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Sun Sign vs Moon Sign vs Rising Sign
            </h2>
            <p>
              Your sun sign is the sign from your date of birth — the sign the Sun was in. A sun sign calculator finds it from the date alone, and a sun sign by date of birth and a sun sign according to date of birth are the same finding. What is my sun sign and what&apos;s my sun sign are the same question, and how to know sun sign, how to know the sun sign and how to know your sun sign are the same question again. A sun sign finder finds it, a sun sign list lists all twelve sun signs, and sun sign months and sunsign months are the months each sun sign covers. There are 12 sun signs, and a sun sign chart is the wheel drawn from the Sun&apos;s position. A sun sign by name is the sign from the first letter of your name, in the Indian system.
            </p>
            <p className="mt-3">
              Sun sign and moon sign together describe you better than either alone: the sun sign is your outer nature and the moon sign is your inner nature. Sun and moon signs, sun sign moon sign and zodiac sun and moon signs are the same pair, and what is my sun sign and moon sign and what is my sun and moon sign are the same question about both. A sun and moon sign calculator and a sun sign moon sign calculator find both at once, and zodiac sun signs and zodiac moon sign are the two lists — the sun signs and the moon signs. Sun sign compatibility is how well two sun signs get along, covered in full on our Love Compatibility by Zodiac Sign page.
            </p>
            <p className="mt-3">
              The rising sign — also called the ascendant — is the sign rising on the eastern horizon at your exact birth moment, and it needs your birth time and place. The rising sun sign is the same as the rising sign — the sign on the eastern horizon at your birth. A sun moon rising calculator finds all three at once — sun sign, moon sign and rising sign — and sun moon rising is the same three-sign reading. For the full three-sign chart with houses and planets, use our{' '}
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
              or{' '}
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
              page, which builds the whole birth chart from your birth details. You can also explore our{' '}
              <a
                href="/numerology/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/numerology/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                numerology
              </a>{' '}
              hub to calculate your core numbers alongside your cosmic signs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Zodiac Compatibility
            </h2>
            <p>
              Zodiac signs match each other in different ways: fire signs get along with air signs, earth signs with water signs, and signs of the same element usually understand each other best. Zodiac sign matches are the pairs that get along best, and the compatibility chart on that page lists them all. Birth sign love compatibility is the same check — how well two birth signs get along — and zodiac matching for marriage is the same check asked for marriage. The compatibility percentages in this group are examples of that check: taurus and sagittarius compatibility percentage, capricorn and aries compatibility percentage, libra and pisces compatibility percentage and aries and scorpio compatibility percentage are all answered in full on our Love Compatibility by Zodiac Sign page, which holds the compatibility chart for every pair of signs. For a marriage match between two people, our{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                kundali matching
              </a>{' '}
              page compares the two full charts, guna by guna.
            </p>
          </section>
        </article>

        {/* FAQs */}
        <div className="mt-16">
          <FAQSection faqs={faqs} />
        </div>

        {/* Related Tools & Articles */}
        <div className="mt-16 space-y-12">
          <RelatedTools onNavigate={onNavigate} currentToolId="astrology" />
          <RelatedArticles onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
};
