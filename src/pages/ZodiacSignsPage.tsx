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
import zodiacSignsWheelImage from '../assets/images/zodiac-signs-wheel.webp';
import zodiacSignsConstellationsImage from '../assets/images/zodiac-signs-constellations-dusk.webp';

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
        'Enter your date of birth in the tool above. It gives you your sun sign, your moon sign (when you add your birth time) and your rashi.',
    },
    {
      question: 'How to know my zodiac sign?',
      answer:
        'By your date of birth: the sign the Sun was in on that date is your sun sign. Use the tool above, or look up your birth date in the sign sections. Read our in-depth blog post on love compatibility by date of birth to understand how signs connect emotionally.',
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
              Twelve slices of sky, one for each stretch of the year — that is the wheel behind everything on this page. If you have ever wondered what is a zodiac sign, the practical answer is in the tool above: put your date of birth in and it reads the wheel for you — the sign the Sun was in that day, the sign the Moon was in, and your rashi in the Indian system, all free and in a few seconds. Below the tool you will find all zodiac signs with their dates, the signs month by month, and the three ways to find your own sign — by birth date, by birth date and time, and by name. If you want the wider picture, our{' '}
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
{' '}hub walks through the planets and houses behind the signs.
            </p>
          </section>

          <figure className="my-8">
            <img src={zodiacSignsWheelImage} alt="The twelve zodiac signs arranged in a circular wheel under a night sky" width="1200" height="1200" loading="lazy" className="w-full rounded-2xl object-cover" />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              The twelve signs in a circle — the wheel every reading on this page is drawn from.
            </figcaption>
          </figure>


          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is a Zodiac Sign?
            </h2>
            <p>
              Look up at the night sky and the stars seem scattered at random, but astrologers have always divided the band of sky the Sun travels through into twelve equal slices. Each slice is a sign, and the Sun spends about a month in each one as the year turns. The Moon moves much faster, crossing a sign in about two and a half days, which is why your moon sign can differ from your sun sign even though both come from the same wheel. Your rising sign is a third layer again: the sign that was climbing over the eastern horizon at the exact moment you were born, which is why it needs a birth time and a birth place. In India the same Moon sign is called your rashi, and the rashi chart is the Indian form of the wheel — the same twelve signs, read through the Vedic system. Drawn out, that wheel is a zodiac chart — twelve slices in a circle, with the dates marked on it.
            </p>
            <p className="mt-3">
              People often ask what the signs are for, and the honest answer is that they are a language for talking about temperament — not a verdict. A fire sign tends to act first and think later; an earth sign tends to want something solid before moving; air signs talk things through; water signs feel their way in. The twelve split into four types of zodiac signs by element — fire, earth, air and water — and the element is the quickest clue to a sign&apos;s temperament. None of that is a prediction about your day, and no sign is better than another. The tool above keeps it practical: it tells you which sign belongs to your birth date, and the sections below show what each sign is traditionally read as, so you can decide for yourself how much weight to give it. Outside the US you will more often hear the twelve called star signs — the name most newspapers use — and the word is sometimes written as one word, sunsigns.
            </p>
            <p className="mt-3">
              Your sign has three layers, and this page covers all three: the sun sign from your date of birth, the moon sign from the Moon&apos;s position, and the rising sign from the exact birth time and place. The tool above finds all three, and the sections below walk through each one — the moon sign in its own section, the rising sign beside the sun sign, and the rashi in the Indian section. For the wider story behind the wheel, our{' '}
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
{' '}hub explains the planets and houses that sit behind the signs.
            </p>
          </section>

          {/* The 12 Zodiac Signs Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-6">
              The 12 Zodiac Signs
            </h2>
            <p className="mb-6">
              Here is the full list of zodiac signs — the zodiac signs in order from Aries to Pisces — with the zodiac signs in english and the zodiac signs and names together on each card. The zodiac names run from Aries to Pisces, and the zodiac list below runs the same way — a birth signs list with the dates on every card. The zodiac star signs are listed below in the same order. Each card gives the birth signs dates, the birth month and the horoscope dates for its sign. Can you name all the zodiac signs? The twelve, in order, are Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius and Pisces — and the zodiac birth dates are on the cards, so you can find your sign however you search for it. The zodiac signs dates here are the ones the tool above uses to place a birthday, and the dates on the cards are the sun sign dates, the dates the Sun is in each sign. All 12 zodiac signs are below.
            </p>

            <div className="space-y-6">
              {/* 1. Aries */}
              <div id="aries" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♈</span>
                  <span>1. Aries — March 21 to April 19</span>
                </h3>
                <p>
                  Aries is the 1st zodiac sign of the wheel, and it opens the year with a rush: bold, direct and quick to start things, ruled by Mars. The aries dates run March 21 to April 19, so the aries birth month is mostly April — the last ten days of March belong to Aries too, which is why the aries birthday month is March and April together. The aries date range is March 21–April 19, and your daily reading uses the aries horoscope dates to decide which sign&apos;s forecast to show you. If you are checking aries birth dates for a birthday card or a gift, the tool above settles it in seconds: born on April 18, your sign is Aries; born on April 21, it is Taurus.
                </p>
              </div>

              {/* 2. Taurus */}
              <div id="taurus" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♉</span>
                  <span>2. Taurus — April 20 to May 20</span>
                </h3>
                <p>
                  Taurus is the steady one of the wheel: patient, practical and fond of comfort, ruled by Venus. The taurus dates run April 20 to May 20, and the taurus birth month is May for most of the sign, with the last ten days of April in Taurus too. The taurus birth dates run April 20 to May 20, and the taurus zodiac dates and the taurus sign dates mark the same window — so April 23 is Taurus and so is May 12. The taurus date range covers both, and the taurus sun sign dates are what the tool above uses to place a May birthday.
                </p>
              </div>

              {/* 3. Gemini */}
              <div id="gemini" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♊</span>
                  <span>3. Gemini — May 21 to June 20</span>
                </h3>
                <p>
                  Gemini is the quick one: curious, talkative and good with words, ruled by Mercury. The gemini dates run May 21 to June 20, so the gemini birth month is June for most of the sign, with the last ten days of May in Gemini too. The gemini birth dates run May 21 to June 20, and the gemini zodiac dates mark the same window. The gemini date range straddles the two months — a May 31 birthday and a June 1 birthday share the same sign.
                </p>
              </div>

              {/* 4. Cancer */}
              <div id="cancer" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♋</span>
                  <span>4. Cancer — June 21 to July 22</span>
                </h3>
                <p>
                  Cancer is the home sign: caring, protective and close to family, ruled by the Moon. The cancer zodiac dates run June 21 to July 22, and the cancer zodiac sign dates and the cancer sign dates mark the same window. The cancer birth month is July for most of the sign, with the last ten days of June in Cancer too. July 12 is Cancer, and the cancer zodiac sign personality — warm at home, guarded with strangers — is the part people usually recognise first. Your daily reading follows the cancer horoscope dates, June 21 to July 22, and the cancer sun sign dates are the same June-to-July window. The cancer birthday month is June and July together.
                </p>
              </div>

              {/* 5. Leo */}
              <div id="leo" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♌</span>
                  <span>5. Leo — July 23 to August 22</span>
                </h3>
                <p>
                  Leo likes the spotlight: warm, proud and generous, ruled by the Sun itself. The leo horoscope dates run July 23 to August 22, and the leo birth month is August for most of the sign, with the last nine days of July in Leo too. The leo birth dates run July 23 to August 22, and the leo zodiac dates mark the same window — so August 21 is Leo and so is August 12. The leo date range covers both, and the leo sun sign dates are what the tool uses to place a late-July birthday. The leo zodiac sign dates are July 23 to August 22.
                </p>
              </div>

              {/* 6. Virgo */}
              <div id="virgo" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♍</span>
                  <span>6. Virgo — August 23 to September 22</span>
                </h3>
                <p>
                  Virgo is the careful one: practical, precise and good with detail, ruled by Mercury. The virgo birth dates run August 23 to September 22, and the virgo zodiac sign dates mark the same window on any calendar. September 12 is Virgo, and so are September 20 and 21 — the sign holds right up to the autumn equinox.
                </p>
              </div>

              {/* 7. Libra */}
              <div id="libra" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♎</span>
                  <span>7. Libra — September 23 to October 22</span>
                </h3>
                <p>
                  Libra is the peacemaker: fair, social and fond of balance, ruled by Venus. The libra dates run September 23 to October 22, so the libra birth month is October for most of the sign, with the last week of September in Libra too. The libra birth dates run September 23 to October 22, and the libra zodiac dates mark the same window. The libra zodiac sign dates are September 23 to October 22, and your daily reading follows the libra horoscope dates. September 24 is Libra, and so are October 12 and October 19 — the libra date range covers all three, and a libra birthday is any date inside it. The libra birthday month is September and October together.
                </p>
              </div>

              {/* 8. Scorpio */}
              <div id="scorpio" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♏</span>
                  <span>8. Scorpio — October 23 to November 21</span>
                </h3>
                <p>
                  Scorpio is the intense one: private, determined and hard to read, ruled by Mars and Pluto. The scorpio birth dates run October 23 to November 21, and the scorpio sign dates mark the same window. The scorpio birth month is November for most of the sign, with the last nine days of October in Scorpio too. November 19 is Scorpio, and the scorpio date range is the one to check if a birthday falls near the edges. Your daily reading follows the scorpio horoscope dates, and the scorpio sun sign dates are October 23 to November 21. The scorpio zodiac sign dates are the same October-to-November window.
                </p>
              </div>

              {/* 9. Sagittarius */}
              <div id="sagittarius" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♐</span>
                  <span>9. Sagittarius — November 22 to December 21</span>
                </h3>
                <p>
                  Sagittarius is the traveller: open, honest and fond of new ideas, ruled by Jupiter. The sagittarius dates run November 22 to December 21, and the sagittarius birth month is December for most of the sign, with the last nine days of November in Sagittarius too. The sagittarius birth dates run November 22 to December 21, and the sagittarius date range crosses into winter — a late-November birthday and an early-December one share the same sign.
                </p>
              </div>

              {/* 10. Capricorn */}
              <div id="capricorn" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♑</span>
                  <span>10. Capricorn — December 22 to January 19</span>
                </h3>
                <p>
                  Capricorn is the long-game sign: patient, ambitious and steady, ruled by Saturn. Capricorn is the 10th zodiac sign of the wheel, and the capricorn date range runs December 22 to January 19 — across the new year, which catches people out. The capricorn birth month is January for most of the sign, with the last ten days of December in Capricorn too.
                </p>
              </div>

              {/* 11. Aquarius */}
              <div id="aquarius" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♒</span>
                  <span>11. Aquarius — January 20 to February 18</span>
                </h3>
                <p>
                  Aquarius is the original: independent, inventive and fond of new ideas, ruled by Saturn and Uranus. The aquarius dates run January 20 to February 18, and the aquarius birth month is February for most of the sign, with the last twelve days of January in Aquarius too. The aquarius sun sign dates run January 20 to February 18, and the aquarius zodiac sign dates mark the same window. The aquarius birth dates fall in the same January-to-February window.
                </p>
              </div>

              {/* 12. Pisces */}
              <div id="pisces" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♓</span>
                  <span>12. Pisces — February 19 to March 20</span>
                </h3>
                <p>
                  Pisces is the dreamer: kind, imaginative and quick to feel what others feel, ruled by Neptune and Jupiter. The pisces dates run February 19 to March 20, and the pisces birth month is March for most of the sign, with the last ten days of February in Pisces too. The pisces birth dates run February 19 to March 20, and the pisces zodiac dates mark the same window. March 12 is Pisces. Your daily reading follows the pisces horoscope dates, and the pisces date range ends the wheel — Pisces is the last sign before Aries begins again.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Zodiac Signs by Month
            </h2>
            <p>
              Every month holds two signs, because each sign straddles two months. The zodiac and months list below covers January to December: read it by your birth month, and let the exact day decide which of the two signs is yours — the changeover usually falls around the 19th to the 23rd. The zodiac signs according to months below use the same sun sign dates as the cards above, just arranged by month instead of by sign, and the zodiac signs months and dates are listed together so you can check a birthday in one glance. The zodiac signs dates by month are in the list below. The zodiac signs for each month are in the list below, and the zodiac signs for every month are always two — two zodiac signs per month, every month. The zodiac signs and their months are laid out with the zodiac signs and dates on each line. The star signs and months follow the same split, two signs to a month. If you want the month wise zodiac sign for a birthday, find the month below and check which side of the changeover the day falls on — a zodiac sign according to birth month alone is only a rough guess, because two signs share every month. The zodiac signs by birth month are the quickest way to check a birthday, and birth months and zodiac signs go together the same way all year: the month narrows it to two, the day picks one.
            </p>

            <ul className="list-disc pl-5 space-y-2.5 mt-4">
              <li>
                <strong>January:</strong> Capricorn until January 19, then Aquarius from January 20. A january born zodiac sign is Capricorn before the 20th and Aquarius after it, and the january sun sign follows the same split. The january month zodiac sign is Capricorn for most of the month, and a jan born zodiac sign is Capricorn or Aquarius depending on the day.
              </li>
              <li>
                <strong>February:</strong> Aquarius until February 18, then Pisces from February 19. A february month zodiac sign is Aquarius before the 19th and Pisces after it, and the february star sign and february sun sign follow the same split. A feb born zodiac sign is Aquarius or Pisces depending on the day, and a feb star sign is Aquarius before the 19th and Pisces after it.
              </li>
              <li>
                <strong>March:</strong> Pisces until March 20, then Aries from March 21. A march born zodiac sign is Pisces before the 21st and Aries after it, and the march month zodiac sign follows the same split. March 12 is Pisces, and a march born zodiac is Pisces or Aries depending on the day.
              </li>
              <li>
                <strong>April:</strong> Aries until April 19, then Taurus from April 20. The april 18 zodiac sign is Aries, the april 21 zodiac sign is Taurus, and the april 23 zodiac sign is Taurus — the changeover sits right in the middle of the month.
              </li>
              <li>
                <strong>May:</strong> Taurus until May 20, then Gemini from May 21. A may month zodiac sign is Taurus before the 21st and Gemini after it, and a may born zodiac sign is Taurus or Gemini depending on the day. The may zodiac split is Taurus then Gemini, and the may 12 zodiac sign is Taurus.
              </li>
              <li>
                <strong>June:</strong> Gemini until June 20, then Cancer from June 21. A june zodiac sign is Gemini before the 21st and Cancer after it, and a june born zodiac sign is Gemini or Cancer depending on the day. The june sun sign and the june month zodiac sign follow the same split, and the june zodiac split is Gemini then Cancer.
              </li>
              <li>
                <strong>July:</strong> Cancer until July 22, then Leo from July 23. A july sun sign is Cancer before the 23rd and Leo after it, and a july zodiac sign and a july born zodiac sign follow the same split. The july 12 zodiac is Cancer — the 12 july star sign and the july month zodiac sign are Cancer for most of July — and the 19th july zodiac sign is Cancer too. The july zodiac split is Cancer then Leo.
              </li>
              <li>
                <strong>August:</strong> Leo until August 22, then Virgo from August 23. An august zodiac sign is Leo before the 23rd and Virgo after it, and an august born zodiac sign is Leo or Virgo depending on the day. The august sun sign is Leo for most of the month, and the august star sign and august month zodiac sign follow the same split. The august 21 zodiac sign is Leo, the august 12 zodiac sign is Leo, and the 18 august zodiac sign is Leo too.
              </li>
              <li>
                <strong>September:</strong> Virgo until September 22, then Libra from September 23. A september zodiac sign is Virgo before the 23rd and Libra after it, and a september born zodiac sign is Virgo or Libra depending on the day. The september sun sign, the september star sign and the september month zodiac sign follow the same split. September 12 is Virgo — the september 12 zodiac sign, the 12 sep zodiac sign and the 12 sep zodiac all point to Virgo — and the sept 20 zodiac sign is Virgo, while the september 21 zodiac sign is Virgo and September 24 is Libra. A september born zodiac is Virgo or Libra depending on the day, and the september birthday zodiac is Virgo or Libra depending on the day.
              </li>
              <li>
                <strong>October:</strong> Libra until October 22, then Scorpio from October 23. An october zodiac sign is Libra before the 23rd and Scorpio after it, and an october born zodiac sign is Libra or Scorpio depending on the day. The october sun sign and the oct sun sign follow the same split, and the october month zodiac sign, the october star sign and the october zodiac follow it too. October 12 is Libra — the october 12 zodiac, the october 12 zodiac sign and the 12 october zodiac sign are all Libra — and the october 19 zodiac sign is Libra too. The october birthday zodiac sign is Libra or Scorpio depending on the day.
              </li>
              <li>
                <strong>November:</strong> Scorpio until November 21, then Sagittarius from November 22. A november zodiac sign is Scorpio before the 22nd and Sagittarius after it, and a november born zodiac sign is Scorpio or Sagittarius depending on the day. The november sun sign, the november star sign and the november month zodiac sign follow the same split. November 19 is Scorpio — the november 19 zodiac sign and the 19 november zodiac both point to Scorpio. The november zodiac split is Scorpio then Sagittarius, and what are the two zodiac signs for november? Scorpio and Sagittarius.
              </li>
              <li>
                <strong>December:</strong> Sagittarius until December 21, then Capricorn from December 22. A december zodiac sign is Sagittarius before the 22nd and Capricorn after it, and a december born zodiac sign is Sagittarius or Capricorn depending on the day. The december star sign, the december month zodiac sign and the december zodiac follow the same split, and a december born zodiac is Sagittarius or Capricorn depending on the day.
              </li>
            </ul>

            <p className="mt-4">
              A single date is all it takes: the july 12 zodiac is Cancer, the september 24 zodiac sign is Libra, the april 23 zodiac sign is Taurus, the march 12 zodiac sign is Pisces, the august 21 zodiac sign is Leo and the october 19 zodiac sign is Libra. The tool above answers any other date the same way, in seconds.
            </p>
            <p className="mt-3">
              The dates above are the sun sign dates — the dates each sun sign covers — and the sun signs and dates are listed the same way in the cards above. Printed as a calendar, they make a zodiac calendar you can check a birthday against at a glance, and the sun sign calendar on this page is the quick-jump grid at the top. All zodiac signs dates are in the sign sections above, and the zodiac signs dates of birth are read from your own birth date in the tool. The sunsign months run January to December, two signs to a month.
            </p>
          </section>

          <figure className="my-8">
            <img src={zodiacSignsConstellationsImage} alt="Zodiac constellations over a calm landscape at dusk" width="1200" height="800" loading="lazy" className="w-full rounded-2xl object-cover" />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              The constellations above a quiet landscape at dusk — the same sky the signs are read from.
            </figcaption>
          </figure>


          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              How to Find Your Zodiac Sign
            </h2>
            <p>
              Start with your date of birth — that is all the tool above needs. Pick the By Date of Birth tab, enter the day you were born, and it gives you your sun sign straight away. That is how to find your zodiac sign in under a minute, and how to know your zodiac sign if you have only ever guessed from your birth month. People usually arrive here asking how to know my zodiac sign, and the answer is the same for everyone: start with the birth date. How to find my zodiac sign is the same tab, and it is also how to check zodiac sign when a birthday sits near a changeover — the exact day decides it. The button says Find My Zodiac Sign, and that is all it takes — one birth date in, one sign out. It helps to know your zodiac sign before you read a daily horoscope, because the forecast is written for the sign, not the person.
            </p>
            <p className="mt-3">
              The tool above is built around one question — what is my zodiac sign — and it answers it from your birth date in seconds. It answers what is my zodiac sign by date of birth from the date alone, with no time needed, and if a friend asks what is your zodiac sign, the tool gives you the answer to pass on. Ask for my zodiac sign by date of birth and the tool returns it from the date alone. Which zodiac sign is yours is decided by the Sun&apos;s position on the day you were born — not by your name, not by your birth month alone. If your birthday sits near a changeover, the exact day matters: someone born on April 20 is Taurus, and someone born on April 19 is Aries. And if you are wondering how can i know my zodiac sign without a birth time, the date alone is enough for the sun sign.
            </p>
            <p className="mt-3">
              The card above is a zodiac sign calculator: one date in, one sign out, with the moon sign added when you give it your birth time. If you arrived here looking for a zodiac sign finder, a zodiac finder or a zodiac calculator, the tool at the top of the page is the one you want — it takes a date of birth and returns your sign, and it takes a birth time too when you want the moon sign as well. Use it as a birth sign finder when you only have a date to work with, or ask for a zodiac sign by date of birth and time and the tool adds your moon sign to the answer. The By Date of Birth tab answers how to find zodiac sign by date of birth and how to know zodiac sign by date of birth — enter the date, read the sign — and you can find zodiac sign by date of birth in the tool above, or find zodiac by date of birth the same way. Enter your birth date and the tool returns your zodiac sign according to birth date — and your zodiac sign according to date of birth, from the same date. That is the Sun&apos;s sign on the day you were born. The tool also shows how to determine zodiac sign from a birth date, step by step. The same birth dates can also run a love score — our{' '}
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
              There is a second way in, through your name. In the Indian rashi system the first letter of your name gives your Nakshatra, and the Nakshatra gives your rashi — so a zodiac sign by name is the rashi read from the name instead of the date. The By Name Only tab does this for you: type your name and it returns the sign. That is how to find zodiac sign by name, and the tab also answers how to know zodiac sign by name: the first letter gives the Nakshatra, and the Nakshatra gives the rashi. The By Name Only tab answers what is my zodiac sign by name, from the first letter of the name. An s name zodiac sign is the sign for names starting with S, and a t name zodiac sign is the sign for names starting with T — both are read from the first letter, in the Indian rashi system. The zodiac signs by name and date of birth together give you both readings — the rashi from the name and the sun sign from the date — and your rashi by name and date of birth is the fullest answer the tool gives. A zodiac sign according to name is read the same way, from the first letter of your name. The name check is less exact than the date check, so confirm it with your birth date when you can. Two names can also be read together in our{' '}
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
{' '}tool.
            </p>
            <p className="mt-3">
              If you prefer a phone, a zodiac app or a zodiac sign app asks for your birth date and returns your sign — the tool above does the same without installing anything. The best zodiac app is the one you already have open, and a star sign app does the same job on a phone. A star sign calculator on the web does the same work for free. The star sign dates for each sign are on the cards above, the star sign symbols are the glyphs beside each name, and the star sign months run January to December, two signs to a month. The star signs in english — Aries to Pisces — are the names on the cards above. If you grew up calling them star signs, ask the tool what is my star sign and it will answer from your birth date, just as it does for zodiac signs. To find star sign by date of birth, use the By Date of Birth tab.
            </p>
            <p className="mt-3">
              Love is where most people take the signs next. A zodiac love calculator reads two signs and gives a love score, and it lives on the{' '}
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
{' '}home page. Love rashi asks it from the Indian side: two rashis, read for love. Birth sign love compatibility is the fuller check — how well two birth signs get along — covered in full on our Love Compatibility by Zodiac Sign page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Rashi — Your Indian Zodiac Sign
            </h2>
            <p>
              In India the sign most people ask about is not the sun sign but the rashi — the sign the Moon was in when you were born. A rashi chart draws the Indian wheel: the same twelve signs, read through the Vedic system, with the Moon&apos;s position at the centre of the reading. In Hindi the same chart is often called a rashi ka chart, and if you want the rashi chart in english, the tool above labels every sign in English. The rashi calculator in the tool above finds your rashi from your birth details, and a rashi by date of birth is the rashi found from the date alone. The tool gives your rashi by date from the date alone, and your rashi by birth date and time when you add the hour. For the full chart behind it, our{' '}
              <a
                href="/kundali/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                kundali
              </a>
{' '}generator builds the whole birth chart from your birth details.
            </p>
            <p className="mt-3">
              The question most people start with is how to know rashi by date of birth: the date fixes the Moon&apos;s Nakshatra, and the Nakshatra gives the rashi. That is also how to find rashi by date of birth, and how to find my rashi when you only have the date to work with — the tool above answers find my rashi from a birth date, and find rashi by date of birth from the date alone. The tool above is a rashi finder in the simplest sense: birth date in, rashi out. The By Date of Birth tab is the way to find my rashi by date of birth: enter the date, read the rashi. Ask what is my rashi by date of birth and the tool returns it from the date alone, and it finds your rashi according to date of birth from the date alone. The all rashi symbol list is on the cards above — the Ram for Mesha, the Bull for Vrishabha, the Twins for Mithuna, and so on through all twelve. You can know your rashi by date of birth in seconds, using the tool above. If you want to find your rashi, the tool above does it from your birth date in seconds. To know rashi by date of birth is to enter the date and read the sign — and how to know my rashi comes down to two things: the date gives the Nakshatra, and the Nakshatra gives the rashi.
            </p>
            <p className="mt-3">
              The tool above is a rashi calculator by date of birth, and adding your birth time makes it a rashi calculator by birth date and time — the time fixes the exact Moon position, so the answer is precise to the degree. A birth rashi by birth time and date is the fullest answer the tool gives, and it is the one to use when the Moon sat near the edge of a sign on your birthday. A janam rashi by date of birth and time is the reading most Indian families ask for by that name, and the tool gives it from the same two boxes. Ask for your rashi from birth date and time and the tool uses both. To find rashi by date of birth and time, use the DOB + Time tab — it fixes the exact Moon position. To check rashi by date of birth, use the date tab — it returns your rashi in seconds, and it is how to check my rashi from the date alone. This page is an online rashi calculator: no app, no sign-up, just your birth details. It is a free rashi calculator, and it stays free — the result is on the page, not behind a paywall. Run an online rashi check here and the answer is on the page in seconds. A rashi calculator by name runs the same tool from your name — type it in the By Name Only tab.
            </p>
            <p className="mt-3">
              The other spelling you will see is rasi: a rasi calculator works from the same birth details, and rasi by date of birth is the rasi found from the date alone. A date of birth rasi is the rasi for your birth date, and a rasi finder by date of birth is the tool that finds it. The wheel is also drawn as a rasi chart in South Indian almanacs, and a name rasi chart is the chart read from a name. To find rasi, use the date tab — it returns the rasi from your birth date. Ask it to find my rasi and it answers from the date alone, and how to find rasi comes down to the birth date: enter it, read the sign. Enter a birth date and the tool returns a rasi based on date of birth, ready to read. A rasi chart for date of birth is the wheel for one birth date — the tool above reads it from the date you enter. A rasi calculator by date of birth does the same work from the date, and a date of birth rasi palan is the daily forecast read from that rasi.
            </p>
            <p className="mt-3">
              The Vedic side of the tool has its own names. A vedic rashi calculator reads the Moon&apos;s sign the Vedic way, and a vedic astrology rashi calculator is the fuller Vedic chart behind it. A lagna rashi calculator finds the rising sign&apos;s rashi, a chandra rashi calculator finds the Moon&apos;s rashi, and a janma rashi calculator finds the birth rashi — three readings from the same birth details, each answering a different question. A hindu rashi calculator is the tool most families reach for first, and it reads the Moon&apos;s sign the Vedic way. Ask for a rashi name by date of birth in hindu and the tool returns the Hindu name of your rashi. The hindu zodiac signs by date of birth are read the Vedic way, from the Moon&apos;s position on your birth date, and the zodiac signs in hindi by date of birth are the Hindi names for the same twelve signs. A rashi according to month is only a rough guide, because the Moon changes sign every two and a half days. A rashi by month tells you the sign most people born that month share, and a rashi by month and date narrows it to the day. Wondering how to know rashi by date of birth without time? The date alone still gives your rashi, because the Moon stays in one sign for about two and a half days — only the exact degree is approximate. In Hindi the question is date of birth se rashi — rashi from the date of birth — and the tool above answers it from the date alone. The today birth rashi is the rashi of babies born today — the Moon&apos;s sign right now. A rashi prediction takes your rashi and says what it is said to mean for your day, week or year — read your{' '}
              <a
                href="/rashifal-today/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/rashifal-today/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                rashifal today
              </a>
{' '}for the daily version, or run your numbers through our{' '}
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
              Rashi is also how two people are matched in India. Rashi matching for marriage compares two rashis before a wedding, looking at whether the two Moon signs sit well together. In Tamil families the comparison is often called rasi matching for marriage. It adds the Nakshatras to the reading: rashi nakshatra matching for marriage compares both the rashis and the Nakshatras, and rasi nakshatra matching looks at the same two things from the Tamil side. Rasi matching is used the same way in Tamil families. Couples in the West usually ask about zodiac matching for marriage instead — two sun signs, read for how they get along. A zodiac signs match for marriage is judged by the same elements and rulers: fire with air, earth with water, and signs of the same element understanding each other best. The fullest version of that reading is on our{' '}
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
{' '}page, which compares two charts guna by guna, and on our{' '}
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
{' '}tool for Tamil compatibility.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Moon Sign
            </h2>
            <p>
              The Moon moves fast — it spends about two and a half days in each sign — so the sign it was in on your birthday says something different from your sun sign. The tool above finds it when you add your birth time, and what is my moon sign is the question the DOB + Time tab answers. People usually ask what is a moon sign when they see it beside their sun sign — it is the Moon&apos;s sign on the day you were born, and the tool reads it from your birth time. A moon sign calculator reads the Moon&apos;s position from your date of birth and time, and a moon sign calculator by date of birth works from the date alone — the answer is usually right, because the Moon stays in one sign for about two and a half days. It is a free moon sign calculator, and it stays free: the result is on the page, not behind a paywall. Run it as an online moon sign calculator or a vedic moon sign calculator and the reading comes back the Vedic way. You can calculate moon sign free in the tool above, from your birth date and time, and find moon sign by date of birth in the same place. How to calculate moon sign comes down to one thing: the Moon&apos;s position at your birth, which the tool reads from your birth time. The tool is a moon calculator in the simplest sense: birth time in, moon sign out. If you want a moon on my birthday calculator, the DOB + Time tab does exactly that — it shows the Moon&apos;s sign on the day you were born. A moon chart calculator draws the Moon&apos;s place in the wheel, and the tool above gives it with your sun sign.
            </p>
            <p className="mt-3">
              People care most about the moon sign meaning — the Moon rules your feelings, your habits and your inner life, while the Sun rules your outer nature. Read a moon sign horoscope and you get the forecast for your inner life, not your outer day. The moon sign dates change every two and a half days, so the Moon&apos;s sign is different for people born a week apart. In India the moon sign is the moon sign rashi, and most families just say moon rashi. A moon sign chart draws the Moon&apos;s place in the wheel, and the study of it is moon astrology.
            </p>
            <p className="mt-3">
              To find your moon sign, add your birth time to the tool above — that is how to find moon sign, how to know moon sign and how to know your moon sign in one step. If you only have the date, the tool still gives a moon sign by date of birth, because the Moon stays in one sign for about two and a half days — it is just less precise at the edges. People also ask how to know my moon sign, how to find out moon sign and how to find your moon sign; all three are answered by the same step, with your birth time added. And my moon is the shortest way to ask for it — your own moon sign, from your birth time. Use the tool above to find moon sign from your birth date and time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Sun Sign vs Moon Sign vs Rising Sign
            </h2>
            <p>
              Your sun sign comes from your date of birth alone — the sign the Sun was in on the day you were born. A sun sign calculator finds it from the date, and a sun sign by date of birth is the reading the tool above gives first. If you are wondering what is my sun sign, the tool answers it from the date alone. Ask what&apos;s my sun sign and the tool answers from the date you enter. How to know sun sign comes down to the birth date: enter it, read the sign. Use the tool above as a sun sign finder — one date in, one sign out. The sun sign list is the twelve signs in order, in the cards above, and there are 12 sun signs in the wheel. The sun sign months run January to December, two signs to a month, and the sunsign months are listed the same way in the month section below. Drawn as a circle, the twelve make a sun sign chart — the wheel with the dates marked on it. A sun sign by name is read from the first letter of your name, in the Indian system.
            </p>
            <p className="mt-3">
              Read together, the two signs describe you better than either alone: the sun sign is your outer nature, the moon sign is your inner nature, and the gap between them is where most of the interesting stuff lives. The DOB + Time tab gives you both at once. That is the sun and moon signs reading, and the sun sign moon sign is the pair the tool returns together. The zodiac sun and moon signs are the two lists the cards above hold, and the zodiac sun signs and the zodiac moon sign are the two halves of that pair — the sun signs by date, the moon signs by birth time. Ask it what is my sun sign and moon sign, or what is my sun and moon sign, and it answers both from one birth date and time. The DOB + Time tab works as a sun and moon sign calculator: one birth date and time in, both signs out. Sun sign compatibility — how well two sun signs get along — is covered in full on our Love Compatibility by Zodiac Sign page.
            </p>
            <p className="mt-3">
              The third layer is the rising sign — the sign that was climbing over the eastern horizon at the exact moment you were born. It needs your birth time and your birth place, because the horizon turns fast: a few hours can change it. The rising sign is sometimes written as the rising sun sign. A sun moon rising calculator finds all three at once — sun sign, moon sign and rising sign. Sun moon rising is the three-sign reading the birth chart is built on, and for the full chart with houses and planets, use our{' '}
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
{' '}or{' '}
              <a
                href="/kundali/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                kundali
              </a>
{' '}page, which builds the whole birth chart from your birth details. You can also explore our{' '}
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
{' '}hub to calculate your core numbers alongside your cosmic signs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Zodiac Compatibility
            </h2>
            <p>
              Different zodiac signs get along in different ways: fire signs get along with air signs, earth signs with water signs, and signs of the same element usually understand each other best — that is the whole logic of zodiac compatibility, and the compatibility page turns it into a score for every pair. The zodiac sign matches that score highest are the pairs whose elements feed each other: fire with air, earth with water. Birth sign love compatibility looks at it from the birth-date side — how well two birth signs get along — and zodiac matching for marriage looks at it for a wedding: two signs, read for a lifetime together. The compatibility page holds a score and a reading for every pair, including the four people ask about most — taurus and sagittarius compatibility percentage, capricorn and aries compatibility percentage, libra and pisces compatibility percentage and aries and scorpio compatibility percentage. Each one comes with the reasons, not just the number. For a marriage match between two people, our{' '}
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
{' '}page compares the two full charts, guna by guna.
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
