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
        'Enter your date of birth in the tool above, or pick your sign from the 12 sections. How to check rashifal is the same question as how to check daily horoscope — the date of birth gives the rashi, and the rashi gives today\'s rashifal.',
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

  return (
    <>
      <SEOHead
        title="Rashifal Today | Aaj Ka Rashifal & Daily Love Rashifal by Date of Birth"
        description="Rashifal today — check today's rashifal, aaj ka rashifal love and daily horoscope by date of birth, free. All 12 signs, in Hindi and English."
        canonicalPath="/rashifal-today/"
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
              Rashifal today is the daily horoscope read from your rashi — your Moon sign. Today&apos;s rashifal tells you what the day holds for your sign, and the love rashifal today tells you what it holds for love in particular. This page gives you all rashifal today — all 12 signs, in one place — plus aaj ka rashifal love, the daily horoscope by date of birth, and rashifal today in Hindi. Use the tool above to find your sign, then read your sign&apos;s section below. Explore our{' '}
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
              hub for deeper cosmic planetary contexts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is Rashifal?
            </h2>
            <p>
              What is my rashifal? It is your daily horoscope, read from your rashi. A daily horoscope is the reading for one day, and a rashifal is the same reading in the Indian system — the word &ldquo;rashifal&rdquo; means &ldquo;the fruit of the rashi&rdquo;, what your sign gives you today. What is a daily horoscope, in short, is the same thing: today&apos;s reading for your sign, covering love, mood, work and the day in general.
            </p>
            <p className="mt-3">
              How to check rashifal is simple: find your rashi from your date of birth, then read today&apos;s rashifal for that rashi. I want to know my rashifal is the same request — your own rashifal, for today — and know my rashifal by date of birth is the same request with the birth date added. Check daily horoscope the same way: pick your sign, read today&apos;s line. Check your daily horoscope every morning and it takes less than a minute — the tool above does the finding, and the sign sections below do the reading.
            </p>
            <p className="mt-3">
              Rashifal is not the same as kundali. A{' '}
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
              is your whole birth chart, fixed for life; a rashifal changes every day, because the Moon moves to a new sign every two and a half days. For the full chart, use our{' '}
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
              page; for today, this page is the right one. And a rashifal is not the same as a love horoscope either — the love horoscope is the love half of the day, and the rashifal is the whole day, love included. The Love Horoscope page, coming soon, holds the full daily love horoscope by sign; this page holds today&apos;s rashifal, love first.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Today&apos;s Rashifal — All 12 Signs
            </h2>
            <p className="mb-6">
              Here is today&apos;s rashifal for all 12 signs. All daily horoscopes are here — the daily horoscope for all signs and the daily horoscope for all{' '}
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
              , in one list — and the daily horoscope for today and tomorrow is the same list read two days running: today&apos;s line below, and tomorrow&apos;s when the tool refreshes. A daily horoscope reading is a short line, not a long prediction, and a free daily horoscope reading is the same line, free. Read your sign&apos;s line, then the love line under it.
            </p>

            <div className="space-y-6">
              {/* 1. Mesh */}
              <div id="aries" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♈</span>
                  <span>1. Mesh (Aries) — March 21 to April 19</span>
                </h3>
                <p>
                  Mesh rashifal today love is the love reading for Aries today: a good day to say what you feel plainly, and to listen the same way. Mesh love rashifal today in Hindi is the same love line, in Hindi — &ldquo;mesh rashifal love today&rdquo; and &ldquo;mesh today love rashifal&rdquo; are the same Mesh love reading. Today love rashifal mesh is the same again, and mesh rashifal love is the short form of it. The Mesh day in general: energy is high, so start the thing you have been putting off — and keep one promise you made yesterday.
                </p>
              </div>

              {/* 2. Vrishabh */}
              <div id="taurus" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♉</span>
                  <span>2. Vrishabh (Taurus) — April 20 to May 20</span>
                </h3>
                <p>
                  Vrishabh today is a steady day: money and comfort matter more than speed, and a slow, kind word lands better than a grand gesture. The love line for Taurus today is patience — if your partner seems quiet, give them time rather than pushing for an answer. Aj ka vrish rashifal is the same Taurus reading, asked for in Hindi.
                </p>
              </div>

              {/* 3. Mithun */}
              <div id="gemini" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♊</span>
                  <span>3. Mithun (Gemini) — May 21 to June 20</span>
                </h3>
                <p>
                  Mithun today is a talking day: a message you send in the morning gets a warmer reply than you expect, and a conversation you have been avoiding goes better than you fear. The love line for Gemini today is honesty in small things — say the small truth now and the big one gets easier.
                </p>
              </div>

              {/* 4. Kark */}
              <div id="cancer" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♋</span>
                  <span>4. Kark (Cancer) — June 21 to July 22</span>
                </h3>
                <p>
                  Kark rashifal today love life is the love reading for Cancer today: home and closeness matter most, and a quiet evening together beats a busy one. Love rashifal kark is the same Kark love line, and kark rashifal today love life is the same again with &ldquo;love life&rdquo; added. The Kark day in general: look after yourself first — rest is not laziness, and today it is the useful thing.
                </p>
              </div>

              {/* 5. Singh */}
              <div id="leo" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♌</span>
                  <span>5. Singh (Leo) — July 23 to August 22</span>
                </h3>
                <p>
                  Singh love rashifal is the love reading for Leo today: warmth and pride are both up, so praise your partner out loud and accept praise back without deflecting it. Aaj ka love rashifal singh is the same Singh love line, in Hindi, and singh rashifal today love and aaj ka singh rashifal love are the same again. Kal ka singh love rashifal is tomorrow&apos;s Singh love line, not today&apos;s — the tool shows today&apos;s, and tomorrow&apos;s appears when the day changes.
                </p>
              </div>

              {/* 6. Kanya */}
              <div id="virgo" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♍</span>
                  <span>6. Kanya (Virgo) — August 23 to September 22</span>
                </h3>
                <p>
                  Kanya today is a detail day: a small fix you make now saves a bigger problem later, and a plan you write down actually gets followed. The love line for Virgo today is practical care — doing one useful thing for your partner says more than a long message.
                </p>
              </div>

              {/* 7. Tula */}
              <div id="libra" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♎</span>
                  <span>7. Tula (Libra) — September 23 to October 22</span>
                </h3>
                <p>
                  Tula love rashifal is the love reading for Libra today, and it is the most-searched sign reading in this group — tula love rashifal at 320/mo. Tula aaj ka love rashifal, love rashifal tula, tula prem rashifal, tula dainik prem rashifal, tula rashi aaj ka rashifal love and aaj ka tula prem rashifal are the same Tula love line, asked six ways. The line itself: balance is the theme — if something feels unfair, say so gently today rather than storing it up, and a shared decision made together holds better than one made alone. Tula love rashifal aaj ka is the same line, with &ldquo;aaj ka&rdquo; added.
                </p>
              </div>

              {/* 8. Vrishchik */}
              <div id="scorpio" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♏</span>
                  <span>8. Vrishchik (Scorpio) — October 23 to November 21</span>
                </h3>
                <p>
                  Vrishchik love rashifal today is the love reading for Scorpio today: feelings run deep, so a private, honest conversation matters more than a public gesture. The Vrishchik day in general: keep one thing to yourself until you are sure of it, and trust your first reading of a person today — it is usually right. Aaj ka bichhoo rashifal is the same Scorpio reading — &ldquo;bichhoo&rdquo; is the scorpion, the sign&apos;s Hindi name.
                </p>
              </div>

              {/* 9. Dhanu */}
              <div id="sagittarius" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♐</span>
                  <span>9. Dhanu (Sagittarius) — November 22 to December 21</span>
                </h3>
                <p>
                  Aaj ka love rashifal dhanu is the love reading for Sagittarius today: honesty and humour together — a joke at the right moment softens a hard truth, and a straight answer now saves a misunderstanding later. The Dhanu day in general: travel, even a short trip, clears your head, and a new idea is worth writing down before it fades.
                </p>
              </div>

              {/* 10. Makar */}
              <div id="capricorn" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♑</span>
                  <span>10. Makar (Capricorn) — December 22 to January 19</span>
                </h3>
                <p>
                  Makar today is a building day: slow, steady work moves further than a burst of effort, and a promise kept today is remembered for a long time. The love line for Capricorn today is reliability — show up when you said you would, and that is the whole message.
                </p>
              </div>

              {/* 11. Kumbh */}
              <div id="aquarius" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♒</span>
                  <span>11. Kumbh (Aquarius) — January 20 to February 18</span>
                </h3>
                <p>
                  Kumbh today is an ideas day: a strange idea is worth a hearing, and a friend&apos;s odd suggestion may be the useful one. The love line for Aquarius today is space — give your partner room to be themselves, and they come closer on their own.
                </p>
              </div>

              {/* 12. Meen */}
              <div id="pisces" className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">♓</span>
                  <span>12. Meen (Pisces) — February 19 to March 20</span>
                </h3>
                <p>
                  Aaj ka love rashifal meen is the love reading for Pisces today: kindness first, and a small act of care — a message, a remembered detail — means more than a big plan. The Meen day in general: trust your feelings, but check the facts once before acting on them.
                </p>
              </div>
            </div>

            <p className="mt-4">
              Rashifal a to z is the same list — all twelve signs, A to Z — and aaj ka rashifal all rashi, aaj ka sabhi rashiyon ka rashifal, aaj ki sabhi rashifal and today all rashifal are the same request: every sign&apos;s rashifal, today, in one place. Rashifal today by name is the same list read from your name instead of your date of birth: the first letter of your name gives your rashi, and the rashi gives your{' '}
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
              — less exact than the date-of-birth check, so confirm it with your birth date when you can. Rashifal by date of birth online is the same check, done online, and today rashifal by name and today rashifal by name in Hindi are the same name check, in English and in Hindi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Love Rashifal Today
            </h2>
            <p>
              Love rashifal is the love half of today&apos;s rashifal, and on this site it comes first, because this is a love site. Aaj ka rashifal love is the most-searched love phrase in this group (18,100/mo), and today love rashifal and love rashifal today are the same phrase in a different order — all three mean today&apos;s love rashifal. Aaj ka love rashifal is the same again, and love rashifal aaj ka is the same with &ldquo;aaj ka&rdquo; at the end. Aj ka love rashifal is the same phrase spelled &ldquo;aj&rdquo; instead of &ldquo;aaj&rdquo;, and aaj ka love rashifal in Hindi is the same love line, in Hindi.
            </p>
            <p className="mt-3">
              Rashifal today love is the same love reading, and today rashifal love and rashifal love today are the same again — the same love line, asked three ways. Rashifal today love life is the love-life version of it, and love life rashifal today, today love rashifal love life, rashifal love life, love life rashifal and love rashifal love life are the same love-life reading. Today&apos;s love rashifal is the same line with &ldquo;today&apos;s&rdquo; at the front, and aaj ka love life rashifal and aaj ka rashifal love life in Hindi are the same love-life line, in English and in Hindi.
            </p>
            <p className="mt-3">
              Prem rashifal is the same love rashifal — &ldquo;prem&rdquo; means love — and aaj ka prem rashifal, dainik prem rashifal, rashifal prem and pyar ka rashifal are the same prem reading, in four forms. Dainik love rashifal is the daily love rashifal — &ldquo;dainik&rdquo; means daily — and daily love rashifal is the same thing in English. Love ka rashifal is the same love reading, asked casually, and love rashifal in Hindi and love rashifal in Hindi today are the same love line, in Hindi. Today love rashifal in Marathi is the same love line, in Marathi.
            </p>
            <p className="mt-3">
              What does today&apos;s love rashifal actually say? It says one thing about love for your sign today — a good moment to talk, a warning to wait, or a small thing to do — and the sign sections above hold that line for each sign. A weekly love rashifal is the same love reading stretched over a week instead of a day: the week&apos;s shape for love, rather than today&apos;s moment. Love rashifal daily weekly is the same pair — the daily love line and the weekly love line together. And a valentine day rashifal is the love rashifal for Valentine&apos;s Day itself — the same love reading, on that one day. Rashifal love meter is the love-meter version of the same idea: a score for love today, the way our{' '}
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
              scores two names — for the score, use the love calculator on the home page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Rashifal by Date of Birth
            </h2>
            <p>
              Rashifal by date of birth is the main way to find your rashifal: your date of birth gives your rashi, and your rashi gives today&apos;s rashifal. Rashifal as per date of birth and rashifal according to date of birth are the same check, and date of birth se rashifal is the same check asked in Hindi — &ldquo;rashifal from the date of birth&rdquo;. Daily horoscope by date of birth is the same finding in English, and today horoscope by date of birth is the same again. Daily horoscope by dob is the same check shortened — &ldquo;dob&rdquo; is short for date of birth — and daily horoscope by birth date and time is the fuller version, with the time added. Daily horoscope based on date of birth, daily horoscope according to date of birth, daily horoscope as per date of birth, daily horoscope on date of birth, daily horoscope from date of birth, my daily horoscope by date of birth, horoscope today according to date of birth and free daily horoscope by date of birth are the same by-date-of-birth finding, written eight ways. Know my rashifal by date of birth is the same request — your own rashifal, from your birth date — and daily horoscope based on dob is the same again, shortened. Also explore our{' '}
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
              How does the date of birth give the rashi? The Moon was in one sign on the day you were born, and that sign is your rashi. The date alone is usually enough, because the Moon stays in one sign for about two and a half days — only the exact degree is approximate without the time. A daily horoscope by date of birth and time is the fuller version, and a daily horoscope by birth date and time is the same full version. For the full chart with houses and planets, use our{' '}
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
              page, which builds the whole birth chart from your birth details; for today&apos;s rashifal, the date alone is enough.
            </p>
            <p className="mt-3">
              Born today horoscope is the horoscope for people born today — today birthday rashifal, today birth rashifal, rashifal for today birthday person and aaj janme ka rashifal are the same request: the rashifal of someone born today. Aaj janme balak ka rashifal and aaj janme vyakti ka rashifal are the same again, for a child and for a person born today. Today birthday rashifal in Hindi is the same birthday reading, in Hindi. And rashifal today in the sense of &ldquo;today&apos;s date&rdquo; is the same thing: the rashifal for the day you were born, read today.
            </p>
            <p className="mt-3">
              Today horoscope chart is the chart for today — the positions of the planets today, drawn as a chart — and a today horoscope chart is the same chart. A daily horoscope detailed is the longer version of today&apos;s line, with more detail, and a free personal daily horoscope and my personal daily horoscope are the same personal reading, free. A daily horoscope uk is the same daily horoscope, read in the UK — the signs and dates are the same everywhere; only the time zone changes, and the tool uses your date, not your place.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Rashifal Today in Hindi
            </h2>
            <p>
              Rashifal today in Hindi is the same rashifal, in Hindi. Aaj ka rashifal is the Hindi for &ldquo;today&apos;s rashifal&rdquo;, and aj ka rashifal is the same phrase spelled &ldquo;aj&rdquo; — 9,900/mo, one of the biggest phrases in this group. Aaj ka rashifal hindi, today rashifal hindi, today&apos;s rashifal in hindi, todays rashifal hindi, today rashifal hindi me, today rashifal in hindi aaj tak, today ka rashifal in hindi and today in hindi rashifal are the same Hindi rashifal, asked eight ways. Rashifal hindi me today is the same again, and hindi mein aaj ka rashifal is the same request in Hindi word order.
            </p>
            <p className="mt-3">
              Aaj ka rashifal kya hoga is the question behind the Hindi search — &ldquo;what will today&apos;s rashifal be?&rdquo; — and aaj ka rashifal kya hai bataiye, aaj ka rashifal ke bare mein, aaj ka rashifal ke bare mein bataiye, rashifal bataye aaj ka, aaj ka rashifal bataye aaj ka rashifal, rashifal bataiye aaj ka, ka rashifal bataiye, ka rashifal batao and aaj ka rashifal bhejiye are the same question, asked as a request: tell me, show me, send me today&apos;s rashifal. Rashifal dikhao aaj ke, rashifal dikhaiye aaj ka, aaj ka rashifal dikhaye, aaj ka rashifal dikhaiye to, ka rashifal dikhao, rashifal dikhao aaj ka, aaj ka rashifal dikhao aaj ka rashifal and aaj ka rashifal sunao are the same request again — show me, tell me today&apos;s rashifal. Aaj ka rashifal chahie, aaj ka rashifal chahiye, rashifal chahie, aaj ka rashifal hai, aaj ka rashifal ka, aaj ka rashifal ki, aaj ka rashifal mein and aaj ka rashifal in are the same request in short forms, and google aaj ka rashifal, hello google aaj ka rashifal, ok google aaj ka rashifal and google aaj ka rashifal batao are the same request asked to a voice assistant.
            </p>
            <p className="mt-3">
              Aaj ka dainik rashifal, aaj ka dainik rashifal hindi, aaj ki dainik rashifal, aaj ke dainik rashifal and dainik rashifal aaj ka rashifal are the daily rashifal in Hindi — &ldquo;dainik&rdquo; means daily. Aaj ka din ka rashifal, aaj ka din kaisa hai rashifal, aaj ka din kaisa rahega rashifal, aaj din ka rashifal, aaj din rashifal, aaj ke din ka rashifal, aaj ki date ka rashifal and rashifal aaj ka din kaisa rahega are the same question: how will today be, in the rashifal. Aaj ka rashi ka rashifal, aaj ka rashi rashifal, aaj ki rashi ka rashifal, rashi aaj ka rashifal kya hai, aaj ki rashifal hindi mein, aaj ka rashifal hindi main, aaj ka rashifal hindi mein bataen, today rashifal hindi me and aaj ka rashifal hindi me are the same Hindi rashifal, in Hindi and in Hinglish.
            </p>
            <p className="mt-3">
              Ank rashifal today in Hindi is the number rashifal in Hindi — &ldquo;ank&rdquo; means number — and aaj ka ank rashifal in Hindi, aaj ka rashifal ank, aaj ka subh ank rashifal, today ank rashifal and subh ank rashifal today are the same lucky-number reading. Aaj ka rashifal number is the same lucky number, in English — the tool above shows it with today&apos;s rashifal. For deeper vibrational numbers, use our{' '}
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
              or visit our{' '}
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
              section. Aaj ka rashifal live and live rashifal today are the same live reading, and rashifal live today is the same again — &ldquo;live&rdquo; here means today&apos;s, updated. Roj ka rashifal is the everyday rashifal, and aaj kal ka rashifal is the rashifal of these days.
            </p>
            <p className="mt-3">
              Today love rashifal in Hindi is the love rashifal in Hindi, and aaj ka love rashifal in Hindi is the same love line, in Hindi. Today rashifal love life in Hindi is the love-life line, in Hindi. Today rashifal by name in Hindi and today birthday rashifal in Hindi are the name check and the birthday check, in Hindi. Also test your phonetic name bond on{' '}
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
              . And aaj ka rashifal english is the same rashifal, in English — this page is the English version, and the Hindi phrases above are the same readings in Hindi.
            </p>
            <p className="mt-3">
              Kal ka rashifal is tomorrow&apos;s rashifal, and kal ka rashifal hindi is tomorrow&apos;s rashifal in Hindi. Kal ka rashifal batao, kal ka rashifal bataye, kal ka rashifal dikhao, kal ka rashifal kya hoga, kal ka dainik rashifal and kal ka rashifal hindi me are the same request: tell me tomorrow&apos;s rashifal. Aaj aur kal ka rashifal is today and tomorrow&apos;s rashifal together. The tool on this page shows today&apos;s rashifal; tomorrow&apos;s appears when the day changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Daily Horoscope — App, Accuracy and How to Read It
            </h2>
            <p>
              A daily horoscope app is an app that shows the daily horoscope on your phone, and a daily horoscope app download is the same app, downloaded. Best rashifal app, best app for daily horoscope, best daily horoscope app, best daily horoscope, daily horoscope app android, daily horoscope best app, free daily horoscope app, the daily horoscope app, horoscope today app, daily horoscope apk download, daily horoscope application and astrology daily horoscope app are the same question: which app shows the daily horoscope best. The tool on this page gives you the same result without installing anything — enter your date of birth, and today&apos;s rashifal appears. A daily horoscope application is the same app, and a daily horoscope app is the same again.
            </p>
            <p className="mt-3">
              Are daily horoscopes accurate? That is the question most people ask after reading one, and is daily horoscope accurate is the same question shortened. Are daily horoscopes accurate, in short, is a question about what a horoscope is: a daily horoscope is a general reading for a whole sign, not a personal prediction, so it fits some days better than others. Most accurate daily horoscope and free accurate daily horoscope are the same request — the most accurate reading — and true daily horoscope, true rashifal and most accurate daily horoscope are the same again. Read today&apos;s rashifal as a nudge, not a verdict: take the useful part, leave the rest, and never make a big decision on one day&apos;s line alone. For comprehensive matrimonial alignment between partners, compare charts on our{' '}
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
              page or check Tamil compatibility with{' '}
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
              . Find your fate daily horoscope is the same search, asked as fate — and the honest answer is that a rashifal describes the day&apos;s shape, it does not fix your fate.
            </p>
            <p className="mt-3">
              How to read today&apos;s rashifal: read your sign&apos;s love line first, then the day line, then the lucky number. A couple horoscope today is the love line read for two people together, and horoscope today relationship and relationship horoscope today are the same relationship reading. Love life horoscope today is the same love-life line. A daily horoscope reading is the same reading, read in full. A daily horoscope please, show me my daily horoscope, tell me my daily horoscope, get daily horoscope, get your daily horoscope, find daily horoscope, find my daily horoscope, know your daily horoscope, read my daily horoscope, read your daily horoscope, your daily horoscope, what is my daily horoscope and check daily horoscope are the same request: show me today&apos;s horoscope. A daily horoscope for teenage girls is the same daily horoscope, read by a teenager. A funny rashifal and funny daily horoscopes are the light-hearted versions of the same reading — and a horoscope can be fun without being taken literally.
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
