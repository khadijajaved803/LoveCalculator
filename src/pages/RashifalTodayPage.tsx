import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { CalculationLoader } from '../components/CalculationLoader';
import { RashifalResultCard } from '../components/RashifalResultCard';
import {
  findDailyRashifal,
  RashifalMode,
  DailySignPrediction,
  getTodayFormatted,
} from '../lib/rashifalEngine';
import { ALL_ZODIAC_SIGNS } from '../lib/zodiacEngine';
import {
  Sparkles,
  Calendar,
  Heart,
  Sun,
  Flame,
  ArrowRight,
  Clock,
  Compass,
} from 'lucide-react';
import rashifalTodaySunriseImage from '../assets/images/rashifal-today-sunrise.webp';
import rashifalTodayMorningTeaImage from '../assets/images/rashifal-today-morning-tea.webp';

interface Props {
  onNavigate: (path: string) => void;
}

export const RashifalTodayPage: React.FC<Props> = ({ onNavigate }) => {
  // Modes: 'dob' | 'sign' | 'name'
  const [mode, setMode] = useState<RashifalMode>('dob');

  // Form states
  const [dob, setDob] = useState('');
  const [signId, setSignId] = useState('aries');
  const [name, setName] = useState('');

  // Result & Calculation
  const [isCalculating, setIsCalculating] = useState(false);
  const [prediction, setPrediction] = useState<DailySignPrediction | null>(null);
  const [error, setError] = useState('');

  const { dateStr } = getTodayFormatted();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'dob' && !dob) {
      setError('Please select your date of birth.');
      return;
    }
    if (mode === 'name' && !name.trim()) {
      setError('Please enter your name to find your rashi.');
      return;
    }

    setIsCalculating(true);
    setTimeout(() => {
      const pred = findDailyRashifal(mode, {
        dob,
        signId,
        name: name.trim(),
      });
      setPrediction(pred);
      setIsCalculating(false);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 550);
  };

  const handleReset = () => {
    setPrediction(null);
    setDob('');
    setName('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      question: 'What is my rashifal?',
      answer:
        'Your rashifal is your daily horoscope, read from your rashi — your Moon sign. Enter your date of birth in the tool above and it finds your rashi and shows today\'s rashifal. What is my rashifal, in short, is today\'s reading for your sign.',
    },
    {
      question: 'How to check rashifal?',
      answer:
        'Enter your date of birth in the tool above, or pick your sign from the 12 sections. The date of birth gives the rashi, and the rashi gives today\'s rashifal — the tool does both steps for you.',
    },
    {
      question: 'What is aaj ka rashifal?',
      answer:
        'Aaj ka rashifal is Hindi for "today\'s rashifal". Aj ka rashifal is the same phrase, spelled "aj". Aaj ka rashifal kya hoga means "what will today\'s rashifal be?" — the tool above answers it for your sign.',
    },
    {
      question: 'Is today\'s rashifal the same every day?',
      answer:
        'No. A rashifal changes every day, because the Moon moves to a new sign every two and a half days. Today\'s rashifal is today\'s line, and tomorrow\'s rashifal — kal ka rashifal — is a new line. The tool on this page refreshes daily, so always read the date on the result.',
    },
    {
      question: 'Are daily horoscopes accurate?',
      answer:
        'A daily horoscope is a general reading for a whole sign, not a personal prediction. Some days it fits well, some days less so. Read it as a nudge for the day, not as a fixed fate, and never make a big decision on one day\'s line alone. Read our blog post on love compatibility by date of birth to see how lasting connections work.',
    },
    {
      question: 'What is the lucky number in today\'s rashifal?',
      answer:
        'Aaj ka rashifal number — the ank rashifal — is the lucky number for your sign today. The tool above shows it with today\'s rashifal. It is a traditional part of the reading, not a lottery number, and this site never gives lottery picks.',
    },
    {
      question: 'How is rashifal different from kundali?',
      answer:
        'A kundali is your whole birth chart, fixed for life. A rashifal is today\'s reading from your rashi, and it changes daily. For the full chart, use our kundali page; for today, this page is the right one.',
    },
    {
      question: 'Where is the weekly love rashifal?',
      answer:
        'The weekly love rashifal is the love reading for the whole week, rather than one day. This page shows today\'s love rashifal; the weekly shape is covered in the "Love Rashifal Today" section above, and the daily line is the one to read each morning.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': 'Rashifal Today',
        'applicationCategory': 'LifestyleApplication',
        'operatingSystem': 'Web browser',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Rashifal Today | Aaj Ka Rashifal & Daily Love Rashifal"
        description="Rashifal today — check today's rashifal, aaj ka rashifal love and daily horoscope by date of birth, free. All 12 signs, in Hindi and English."
        canonicalPath="/rashifal-today/"
        schemaJson={schemaJson}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Rashifal Today', href: '/rashifal-today/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="text-center mt-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Aaj Ka Love Rashifal · Refreshes Daily ({dateStr})</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Rashifal Today
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Check your rashifal today free — enter your date of birth in the tool above and get today&apos;s rashifal, with the love reading first.
          </p>
        </div>

        {/* Tool Card at the Top */}
        <div className="rounded-3xl bg-white border border-rose-100 shadow-xl p-6 sm:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

          {/* Copy on the tool card */}
          <div className="text-center mb-6">
            <p className="text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50/80 inline-block px-4 py-1.5 rounded-full border border-rose-100">
              Check your rashifal today free — enter your date of birth.
            </p>
          </div>

          {/* Mode Selector Tabs */}
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
                setMode('sign');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                mode === 'sign'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Choose Sign / Rashi
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

          {/* Form */}
          <form onSubmit={handleCheck} className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/30 via-white to-pink-50/30 border border-rose-100/80 space-y-4 max-w-xl mx-auto">
              {mode === 'dob' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Your Date of Birth <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all bg-white"
                  />
                </div>
              )}

              {mode === 'sign' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Your Zodiac Sign / Rashi
                  </label>
                  <select
                    value={signId}
                    onChange={(e) => setSignId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all bg-white"
                  >
                    {ALL_ZODIAC_SIGNS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.glyph} {s.name} ({s.rashiName}) — {s.dates}
                      </option>
                    ))}
                  </select>
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
                    placeholder="e.g. Priya, Rahul, Rohit"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm transition-all bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Phonetic classification via first letter (Janmakshar).
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-medium text-center max-w-xl mx-auto">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full sm:w-auto min-w-[260px] px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 shadow-lg shadow-rose-500/20 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Get Today&apos;s Love Rashifal</span>
              </button>
            </div>
          </form>

          {/* Loader */}
          {isCalculating && (
            <div className="mt-8">
              <CalculationLoader
                name1="Daily Moon Orbit"
                name2="Love Energy"
                type="love"
                minDuration={500}
                maxDuration={1000}
                onComplete={() => {}}
              />
            </div>
          )}

          {/* Result Card */}
          {prediction && !isCalculating && (
            <div className="mt-10 pt-8 border-t border-rose-100">
              <RashifalResultCard
                prediction={prediction}
                onReset={handleReset}
                onNavigate={onNavigate}
              />
            </div>
          )}
        </div>

        {/* 12 Signs Quick-Jump Badges */}
        <div className="mb-12">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-4">
            Select Any Sign to Read Today&apos;s Reading
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {ALL_ZODIAC_SIGNS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSignId(s.id);
                  setMode('sign');
                  const pred = findDailyRashifal('sign', { signId: s.id });
                  setPrediction(pred);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 hover:bg-rose-50/50 transition-all text-center group shadow-2xs"
              >
                <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                  {s.glyph}
                </span>
                <span className="text-xs font-bold text-slate-800 block">
                  {s.name}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {s.rashiName.split('(')[0].trim()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Guide Content Below Tool */}
        <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8">
          <section>
            <p className="text-base sm:text-lg leading-relaxed">
              Millions of readers start the morning the same way: a quick look at rashifal today before the day gets busy. The tool above does the looking for you — enter your date of birth and it works out your rashi, then shows today's rashifal with the love line first, because that is the part most readers open the page for. Below the tool, every sign has its own section, so you can read your sign in full or glance at another sign's day, and the Hindi reading, aaj ka rashifal hindi, sits further down the page for readers who prefer it. For the wider picture — how the signs fit together and what the planets are doing — explore our{' '}
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
              hub.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={rashifalTodaySunriseImage}
              alt="Sun rising over a zodiac wheel at the start of a new day for rashifal today"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              A new day begins — the tool above shows today&apos;s line for your sign.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is Rashifal?
            </h2>
            <p>
              Your rashi is the sign the Moon was sitting in on the day you were born, and the reading that follows from that sign is your rashifal. Because the Moon shifts into a new sign roughly every two and a half days, the reading changes with it — yesterday&apos;s line never carries over, and the tool on this page refreshes every morning so the line you see is always today&apos;s. The result leads with love: one short love rashifal for your sign, then the rest of the day — mood, work, and the small things worth watching.
            </p>
            <p className="mt-3">
              There are three ways to reach your reading, and the tool above offers all of them. The surest is your date of birth: it pins down the Moon&apos;s sign on the day you were born, so the rashi it returns is the one to trust. If you already know your sign, pick it straight from the list and the reading appears at once. And if you only have a name, the first letter can point to a rashi too — the tool does that through the old Janmakshar method — though a name alone is a rougher guide than a birth date, so it is worth confirming with the date when you can.
            </p>
            <p className="mt-3">
              A rashifal is not a kundali, and mixing the two up is the most common confusion on this page. A{' '}
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
              is your whole birth chart, fixed for life; a rashifal is one day&apos;s reading from one sign, and it is new again tomorrow. For the full chart, use our{' '}
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
              page; for today, this page is the right one. The love half of the day has its own home too — the{' '}
              <a
                href="/love-horoscope/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-horoscope/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                Love Horoscope
              </a>{' '}
              page carries the full daily love reading by sign, while here the love line leads the day&apos;s rashifal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Today&apos;s Rashifal — All 12 Signs
            </h2>
            <p className="mb-6">
              All twelve signs sit on this one page, so there is no need to open a new page for each sign. Read your own sign first — the love line, then the day line — and the tool above gives you today&apos;s actual lines to go with it. Each card below explains what that sign&apos;s daily reading usually points at and what to watch for, and the reading itself changes every day, so the card stays useful while the line stays fresh. The signs run in the usual order, starting with Mesh, and you can jump to any sign from the buttons above. For the full story of each sign — dates, element, and{' '}
              <a
                href="/love-compatibility-by-zodiac-sign/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-compatibility-by-zodiac-sign/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                best matches
              </a>
              {' '}— open the{' '}
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
              page.
            </p>

            <div className="space-y-6">
              {/* 1. Mesh */}
              <div id="aries" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♈</span>
                  <span>1. Mesh (Aries) — March 21 to April 19</span>
                </h3>
                <p>
                  Aries charges at the day headfirst, and its daily line usually rewards that directness — saying what you feel plainly, and listening the same way, is where the sign does its best work in love. When the reading points at energy, spend it on the thing you have been putting off, and keep one promise from yesterday.
                </p>
              </div>

              {/* 2. Vrishabh */}
              <div id="taurus" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♉</span>
                  <span>2. Vrishabh (Taurus) — April 20 to May 20</span>
                </h3>
                <p>
                  Taurus moves slowly and means it, so the sign&apos;s daily line is usually about comfort, money, and the steady things rather than sudden moves. In love, patience is the theme — a quiet partner needs time, not pressure, and a slow, kind word lands better than a grand gesture.
                </p>
              </div>

              {/* 3. Mithun */}
              <div id="gemini" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♊</span>
                  <span>3. Mithun (Gemini) — May 21 to June 20</span>
                </h3>
                <p>
                  Gemini runs on talk, and its daily line often turns on a single conversation — a message sent in the morning, or one that has been avoided for days. In love, honesty in small things does the heavy lifting: say the small truth now and the big one gets easier later.
                </p>
              </div>

              {/* 4. Kark */}
              <div id="cancer" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♋</span>
                  <span>4. Kark (Cancer) — June 21 to July 22</span>
                </h3>
                <p>
                  Cancer guards home and closeness above everything, so the sign&apos;s daily line usually points inward — rest, family, and the people who feel safe. In love, a quiet evening together beats a busy one, and looking after yourself first is not laziness; on a Cancer day it is the useful thing.
                </p>
              </div>

              {/* 5. Singh */}
              <div id="leo" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♌</span>
                  <span>5. Singh (Leo) — July 23 to August 22</span>
                </h3>
                <p>
                  Leo loves warmth and being seen, and its daily line usually plays on pride — praise given out loud, and praise accepted without deflecting it. In love, generosity is the move: the sign is at its best when it celebrates its partner instead of competing with them.
                </p>
              </div>

              {/* 6. Kanya */}
              <div id="virgo" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♍</span>
                  <span>6. Kanya (Virgo) — August 23 to September 22</span>
                </h3>
                <p>
                  Virgo notices the detail everyone else walks past, so the sign&apos;s daily line is usually practical — a small fix now that saves a bigger problem later. In love, care shows up as doing: one useful thing for your partner says more than a long message.
                </p>
              </div>

              {/* 7. Tula */}
              <div id="libra" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♎</span>
                  <span>7. Tula (Libra) — September 23 to October 22</span>
                </h3>
                <p>
                  Libra weighs everything, and the daily line for this sign usually turns on balance — something that feels unfair is better raised gently today than stored up for later. The love line is the part most Libra readers open first, which is why tula love rashifal is asked for so often, and a shared decision made together holds better than one made alone.
                </p>
              </div>

              {/* 8. Vrishchik */}
              <div id="scorpio" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♏</span>
                  <span>8. Vrishchik (Scorpio) — October 23 to November 21</span>
                </h3>
                <p>
                  Scorpio feels things deeply and keeps them close, so the sign&apos;s daily line usually points at a private conversation rather than a public gesture. Trust your first reading of a person — on a Scorpio day it is usually right — and keep one thing to yourself until you are sure of it.
                </p>
              </div>

              {/* 9. Dhanu */}
              <div id="sagittarius" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♐</span>
                  <span>9. Dhanu (Sagittarius) — November 22 to December 21</span>
                </h3>
                <p>
                  Sagittarius needs room and honesty in equal measure, and its daily line usually pairs the two — a joke at the right moment softens a hard truth, and a straight answer now saves a misunderstanding later. Even a short trip clears the head, and a new idea is worth writing down before it fades.
                </p>
              </div>

              {/* 10. Makar */}
              <div id="capricorn" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♑</span>
                  <span>10. Makar (Capricorn) — December 22 to January 19</span>
                </h3>
                <p>
                  Capricorn builds slowly and remembers promises, so the sign&apos;s daily line is usually about steady work rather than bursts of effort. In love, reliability is the whole message — show up when you said you would, and that is enough.
                </p>
              </div>

              {/* 11. Kumbh */}
              <div id="aquarius" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♒</span>
                  <span>11. Kumbh (Aquarius) — January 20 to February 18</span>
                </h3>
                <p>
                  Aquarius thinks sideways, so the sign&apos;s daily line often starts with a strange idea that deserves a hearing — a friend&apos;s odd suggestion may be the useful one. In love, space is the gift: give your partner room to be themselves and they come closer on their own.
                </p>
              </div>

              {/* 12. Meen */}
              <div id="pisces" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♓</span>
                  <span>12. Meen (Pisces) — February 19 to March 20</span>
                </h3>
                <p>
                  Pisces leads with kindness, and the sign&apos;s daily line usually turns on a small act of care — a message, a remembered detail — that means more than a big plan. Trust your feelings, but check the facts once before acting on them.
                </p>
              </div>
            </div>

            <p className="mt-4">
              The list above covers every sign, A to Z, but the tool offers one more way in: by name. The first letter of your name points to a rashi through the old Janmakshar method, and that rashi gives your{' '}
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
              reading — a little less exact than the date-of-birth check, so confirm it with your birth date when you can. If you have never worked out your sign at all, start with the birth date; it is the surest of the three ways in.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={rashifalTodayMorningTeaImage}
              alt="Reading the morning rashifal with a cup of tea by the window"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              A quiet minute with tea and the morning reading — love line first, then the day.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Love Rashifal Today
            </h2>
            <p>
              Love comes first on this page because this is a love site, and the result card puts the love line at the top for exactly that reason. The love line is the first thing you see when you open love rashifal today — one short line about love for your sign, then the rest of the day underneath it. That love line is the part of the reading worth reading twice: once in the morning, and once before you act on it.
            </p>
            <p className="mt-3">
              Hindi readers usually ask for it by name — aaj ka rashifal love — and the tool answers in either language, love first, then the day. If one day feels too narrow, the weekly love rashifal looks at the whole week instead: the same signs, a slower rhythm, and a better sense of whether a pattern is building or just one day&apos;s mood.
            </p>
            <p className="mt-3">
              In Hindi, love is prem, so the love reading often travels under that word — and dainik, meaning daily, marks the readings that refresh every morning rather than once a week. On Valentine&apos;s Day the same love line is the one to read, and if you want a number instead of a line, the{' '}
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
              on the home page scores two names for you. The love line itself never pretends to be more than it is: one short read on love for your sign today, to take as a nudge, not a verdict.
            </p>
            <p className="mt-3">
              What the love line actually gives you is one thing to carry into the day: a good moment to talk, a warning to wait, or a small thing to do for the person you love. Read it in the morning, hold it lightly, and let the rest of the day — the work line, the mood line, the lucky number — fill in around it. If the question is when the marriage itself will happen, see our{' '}
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
              {' '}page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Rashifal by Date of Birth
            </h2>
            <p>
              Your birth date is the surest way into your reading, and the tool is built around it: enter the date and it works out the Moon&apos;s sign for that day, which gives your rashi, which gives today&apos;s rashifal. That is rashifal by date of birth in practice — not a form to fill in for its own sake, but the shortest route to the right sign. The English name for the same finding is a daily horoscope by date of birth, and the tool covers it in the same step, since the rashi comes from the same date either way. Enter the date and the tool works out your rashifal as per date of birth — the Moon&apos;s sign on the day you were born, read as today&apos;s line. Also explore our{' '}
              <a
                href="/love-calculator-by-date-of-birth/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-calculator-by-date-of-birth/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                love calculator by date of birth
              </a>{' '}
              tool.
            </p>
            <p className="mt-3">
              The date alone is usually enough, because the Moon stays in one sign for about two and a half days — only the exact degree is approximate without the time. Adding the birth time sharpens the reading, and the full chart with houses and planets needs it, which is why the{' '}
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
              and{' '}
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
              page ask for it. For today&apos;s rashifal, though, the date on its own does the job.
            </p>
            <p className="mt-3">
              Someone born today gets a reading from today&apos;s Moon sign, exactly like anyone else — the tool takes the birth date, works out the rashi, and shows the line. A birthday reading is the same shape as any other day&apos;s: love first, then the day, then the lucky number. There is nothing special to do for it, and nothing special to fear from it either — a birthday rashifal is a nudge for the year ahead, not a verdict on it.
            </p>
            <p className="mt-3">
              The signs and their dates are the same everywhere in the world; only the time zone changes, and the tool works from your date, not your place. A longer, more detailed reading is still the same daily line with more written around it — the useful part stays the love line and the day line, and the extra words only help if they say something new about your sign.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Rashifal Today in Hindi
            </h2>
            <p>
              Hindi readers reach this page in Hindi, and the reading they want is rashifal today in hindi — today&apos;s line, in their own language. Most of them ask for it as aaj ka rashifal — sometimes typed as aj ka rashifal — the everyday phrase for today&apos;s reading. The tool answers all of them the same way: enter the birth date, and the line appears in English here, with the Hindi phrases on this page showing what to ask for.
            </p>
            <p className="mt-3">
              A lot of Hindi searches are not statements but questions — aaj ka rashifal kya hoga, what will today&apos;s rashifal be — and the tool is built to answer exactly that kind of ask. You do not need the right wording or the formal phrase: a birth date is enough, and the reading it returns is the answer to the question, in plain lines you can read in under a minute.
            </p>
            <p className="mt-3">
              Dainik means daily, and the daily reading is the one that refreshes every morning — yesterday&apos;s line never stands in for today&apos;s. Behind most Hindi searches sits one plain question: how will today go? The reading answers it in three short parts — the love line, the day line, and the lucky number — and the honest answer is always a shape for the day, never a promise about it.
            </p>
            <p className="mt-3">
              Ank means number, and the lucky number is a traditional part of the reading: the tool shows it beside today&apos;s rashifal, as a small extra to carry through the day. It is not a lottery pick, and this site never gives lottery numbers — if numbers themselves interest you, our{' '}
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
              or{' '}
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
              section goes deeper into what your numbers say. The reading itself stays live in the only sense that matters: it is always today&apos;s, and tomorrow brings a new one.
            </p>
            <p className="mt-3">
              The love half works in Hindi as well: readers ask for aaj ka love rashifal, and the tool gives the love line first, in Hindi words, with the rest of the day after it. The name check and the birthday check both work in Hindi the same way they work in English — if the name is what you have, test it on our{' '}
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
              page, where two names are read together. This page stays in English throughout, and the Hindi phrases on it are there so Hindi readers can find the reading they asked for.
            </p>
            <p className="mt-3">
              Kal ka rashifal is tomorrow&apos;s reading, and it arrives when the day changes — never before. The tool on this page always shows today, so there is no need to check twice in one day, and no way to read tomorrow&apos;s line early. Come back in the morning and the new line will be waiting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Daily Horoscope — App, Accuracy and How to Read It
            </h2>
            <p>
              A daily horoscope app puts the reading on your phone, and plenty of readers keep one — but this page needs no install at all. Enter your date of birth in the tool above and today&apos;s rashifal appears in the browser, free, in under a minute. If you already have an app you like, keep it; the reading here is the same day&apos;s line either way, and the tool is the faster way to reach it.
            </p>
            <p className="mt-3">
              Are daily horoscopes accurate? It is the question most readers ask after their first reading, and the honest answer starts with what a daily reading is: one line for a whole sign, not a personal prediction. Some days it fits well and some days it fits less, so take the useful part and leave the rest — and never make a big decision on one day&apos;s line alone. The reading describes the day&apos;s shape; it does not fix your fate. For the deeper question of how two people fit together over years rather than a day, compare charts on our{' '}
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
              page or check Tamil compatibility with our{' '}
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
              guide.
            </p>
            <p className="mt-3">
              Read the love line first, then the day line, then the lucky number — in that order, every morning, and the whole thing takes less than a minute. A couple can read the love line together, and a relationship reading is the same love line seen from two sides at once. Keep it light when it is light: a horoscope can be fun without being taken literally, and the best use of one is a nudge toward the conversation you have been putting off.
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
