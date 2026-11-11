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
        'Yes. Choose the "by date of birth only" mode. The Moon sign and Nakshatra are fixed by the date alone, so the chart still works — the Lagna and house positions are approximate without the time, but the reading is still useful. Add the birth time later for the full chart. Kundli without time of birth is the same question, with the same answer.',
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
        'Kundali by dob is kundali by date of birth — dob is short for date of birth. Enter your date of birth in the tool above and it makes your kundali from the date alone. Kundli by dob is the same check, and kundli by name is the name-only check: the first letter of your name gives your Moon sign.',
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
              Kundali, also spelled kundli, is your Vedic birth chart — a map of the sky at the moment you were born. It is the starting point for almost everything in Vedic{' '}
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
              : <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-rose-600 hover:underline font-semibold"
              >
                kundali matching
              </a>{' '}
              for marriage, career and future predictions, and reading your yogas and doshas. This page is a kundali maker, kundli maker, kundali generator, kundli generator and kundali calculator in one: it makes your kundali and explains how to read it. To make my kundali is what most people type first — make my kundli is the same request — and the tool above does it in seconds: generate kundali, kundali create, create kundli or kundli create, it is the same free chart. Kundali make, making kundali and kundali making are all the same act, and the tool above is the quickest way to do it — a kundali making app in your browser, free kundali making with no download, and kundali making free online in the same place. Online kundali making and online kundli making are the same online check, and kundli making online free is the free version of it. Kundali maker online and online kundali maker are the same tool written two ways, and so are online kundali generator and online kundli generator — a kundali generator free to use, with no sign-up.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is Kundali?
            </h2>
            <p>
              A kundali is a chart of the twelve houses (bhavas) with the planets placed in them as they were at your birth. The most important points in it are the Lagna (ascendant, the sign rising at your birth), the Moon sign or Rashi across the twelve{' '}
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
              , and the Nakshatra (birth star). Together they describe your nature, your strengths, your career, your relationships and the timing of major events. A kundali is also a kundali birth chart and a birth chart kundli — the same chart, named by what it is: your birth kundali and your birth kundli, the chart of your birth.
            </p>
            <p className="mt-3">
              It goes by several names, and they all mean the same chart: kundali, kundli, janam kundali, janma kundali, janma kundli, janampatri, jataka kundali and kundali jataka. In South India it is called jathagam or jathakam, and the same chart is read from the date of birth and time in Tamil, Telugu and Malayalam families. A Vedic kundali and a vedic kundli are the North Indian names for it; a KP kundali (Krishnamurti Paddhati) and a kp kundli are the same chart read with a different house system. Astro kundali,{' '}
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
              kundali, kundli astrology and astrology kundli are four ways of saying the same thing — the kundali as astrology. Whether you call it kundali, kundli, janam kundali or jathagam, the tool above makes the same chart. It is a hindu kundali, an india kundli and a kundali of india all at once — the Indian, Hindu form of the birth chart — and it is also a kundali horoscope and a kundli horoscope: the horoscope drawn from your birth chart.
            </p>
            <p className="mt-3">
              Some people type it as kunduli — a common misspelling of kundali — and it means the same chart. Others search in English: kundli in English, kundali in English, janam kundli in English and janampatri in English are all the same request, a kundali explained in English rather than in Hindi or Sanskrit terms. And &ldquo;kundali nikale&rdquo; — to make or draw a kundali, as it is said in Hindi — is the same act: making the chart from the birth details.
            </p>
            <p className="mt-3">
              Your kundali is personal to you — it is made from your own date, time and place of birth, which is why two people born on the same day can have different kundalis. The tool above builds yours in seconds, free, with no app and no sign-up: a new kundali made fresh for you. You can also download or save your kundali report from the result — the chart, the planetary table and the reading together — and a kundli report and a free kundali report and a free kundli report are the same saved report.
            </p>
            <p className="mt-3">
              A kundali has details worth knowing, and a detailed kundali is simply one that shows them all: the kundali details are the houses, the planets, the Lagna, the Moon sign and the Nakshatra. A kundali finder and a kundli finder are the same thing — a tool that finds your kundali from your birth details — and find kundali, find kundli and find my kundali are the same search: your own chart, found and read. Get kundali and get kundali online are the same request too, answered by the tool above. And your kundali image, kundali photo and kundali drawing are all the chart itself drawn out — the kundli view of the twelve houses, square or circle, with the planets placed in them. An e kundali is the same chart made online, and the kundli place the tool asks for is your place of birth, which fixes the Lagna.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali by Date of Birth
            </h2>
            <p>
              Kundali by date of birth is the way most people make their kundali: the date of birth fixes the Moon&apos;s Nakshatra, and the Nakshatra is the foundation of the chart. Enter your date of birth in the tool above and you get your kundali chart, your Moon sign and your Nakshatra. Kundli by date of birth is the same check spelled the other way, and kundali by dob and kundli by dob are the same check shortened — dob is simply short for date of birth. Kundali by date of birth and time is the full version: the date fixes the Nakshatra and the time fixes the Lagna. Janam kundali by date of birth and time is the same full check in its longer name, and janam kundali by date of birth, janam kundli by date of birth and janam kundli by date of birth and time are the same checks with &ldquo;janam&rdquo; added. Janam kundali by date of birth and time without name is the same full check too — the chart needs no name at all, only the birth details.
            </p>
            <p className="mt-3">
              Janampatri by date of birth, jatakam by date of birth and jathakam by date of birth are the same date-of-birth check in their other names, and jathakam based on date of birth and time and jathakam based on date of birth are the same check again, with &ldquo;based on&rdquo; added. A date of birth jathakam is the same South Indian chart from the date alone. Kundali based on date of birth, kundli based on date of birth and kundali according to date of birth are the same check written three more ways. A kundali chart by date of birth is the chart the date alone produces, and a kundali name by date of birth is a name chosen from that chart — the name suggested by the Nakshatra. You can also check date-based relationship synergy on our{' '}
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
              Adding your birth time makes the kundali more precise, because the time fixes the Lagna (ascendant) — the sign rising when you were born — and the exact house each planet sits in. With the date of birth and time together you get the full chart: houses, planetary positions and yogas.
            </p>
            <p className="mt-3">
              If you do not know your birth time, you can still make your kundali. Choose the &ldquo;by date of birth only&rdquo; mode: the tool builds the chart from the date alone, using the Moon sign and Nakshatra. It is less detailed than a full kundali — the Lagna and the house positions are approximate — but the Moon sign, Nakshatra and planetary signs are still correct, and that is enough for a first reading. The same applies to kundli without time of birth and kundli without birth time: the date alone is enough to start. Free kundali by date of birth is this same date-only check, free here, and online kundali by date of birth and kundali online by date of birth are the same check done online.
            </p>
            <p className="mt-3">
              You can also make a kundali by name: the first letter of your name gives your Moon sign (Rashi), and from that the tool gives a basic kundali by name. Kundli by name is the same name check, and kundali by name and date of birth and kundli by name and date of birth combine both: the name for the Moon sign and the date of birth for the Nakshatra. It is the simplest check — useful when you only have a name — but it is less detailed than a kundali by date of birth, so confirm it with the full date-of-birth kundali when you can. For a fun look at name chemistry, you can test{' '}
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
              alongside your chart.
            </p>
            <p className="mt-3">
              Kundali making by date of birth and kundli making by date of birth are the same making, from the date alone. Janam kundli free, janam kundali free, janam kundli free online, janam kundli online free and online janam kundali free are all the same free janam kundali from the date of birth, free here, and janma kundali free is the same free chart in its janma spelling. And a kundali prediction by date of birth — what the chart says about your future, read from the date — is covered in the analysis section below, as is a raj yoga calculator by date of birth, which checks for Raj Yoga from the date alone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              How to Make Your Kundali
            </h2>
            <p>
              Making a kundali used to mean sitting with an astrologer and a panchang. Now the tool above does it in seconds. How to make kundali is the question most people ask first, and how to make kundali online and how to make kundli online are the same question with &ldquo;online&rdquo; added. Make kundali is the short form of it, and make my kundali free, make my kundali for free and make my kundli free are the same free making, free here.
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
              That is all there is to it: create your kundli online, free, and get the full kundali report immediately — create kundli online is the same making, generate kundali online is the same making done online, and a kundali calculator free to use and a free kundli calculator are the same tool, as is a janma kundali calculator. A free kundali maker, a free kundli maker and a kundali maker free are the same free maker. There is no software to install and no app to download — the online kundali maker works in your browser. Kundali making free and kundali making free online are the same free making, and free kundali making is the same again. A kundali chart maker is the same tool named for what it makes — the chart — and a kundali making app is the same tool on a phone. If you prefer an app, the same check is available as a kundali app (see the section below), but the website tool gives you the same chart without installing anything.
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
              A kundali chart is a square divided into twelve houses. Each house stands for an area of life — the first house is you, the seventh is marriage, the tenth is career — and each planet in a house colours that area. Reading a kundali generated by a{' '}
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
              means reading the planets in their houses, not just looking at the picture. A kundli chart is the same chart spelled the other way, and a kundali chart online, a kundli chart online and an online kundli chart are the same chart made online. A free kundli chart, a free kundali chart and a free kundali chart online are the same chart, free here.
            </p>

            <div className="space-y-3 mt-4 text-sm sm:text-base">
              <p>
                <strong>Find the Lagna (ascendant).</strong> The Lagna kundali starts from the sign rising at your birth. It is the first house, and it sets the whole chart — the other houses follow from it. A lagna kundli is the same ascendant chart, and a lagna kundali chart is the chart drawn from the Lagna. A lagna kundali online and a lagna kundli online are the same Lagna chart made online, and a free lagna kundali is the same chart, free here.
              </p>
              <p>
                <strong>Find the Moon sign and Nakshatra.</strong> Your Rashi (Moon sign) is the sign the Moon was in, and your Nakshatra is the birth star. They describe your mind, your emotions and your nature. My kundali chart and my kundli chart are the same request — your own chart, with your Lagna and Moon sign in it.
              </p>
              <p>
                <strong>Read the planets house by house.</strong> A planet in the tenth house speaks about career; a planet in the seventh speaks about marriage; a planet in the fifth speaks about children and creativity. The same planet means something different in each house. A kundali house chart and a kundli house chart are the same reading: the houses, with the planets in them.
              </p>
              <p>
                <strong>Check the Navamsa (Navmansh) chart.</strong> The Navmansh kundali is a second, finer chart made from the same birth details. Astrologers read it alongside the main chart, especially for marriage — a planet that is strong in both charts is genuinely strong. A navmansh kundli is the same Navamsa chart, a navamsa kundali is the same chart in its Sanskrit spelling, and a navmansh kundli calculator is the tool that makes it.
              </p>
              <p>
                <strong>Check the Chalit chart.</strong> The Chalit kundali adjusts the house positions for the exact birth time. It matters most when a planet sits near the edge of a house.
              </p>
            </div>

            <p className="mt-4">
              You do not need to memorise all of this to use the tool: the result shows your Lagna kundali chart, your Navamsa chart and your planetary positions, with a plain reading of each. The kundli chakra (the wheel diagram) is the same chart drawn as a circle — square or circle, the houses and planets are the same. A janma kundali chart is the same chart in its &ldquo;janma&rdquo; name, and today&apos;s kundali chart is the same chart read for today — the daily reading of your chart.
            </p>
            <p className="mt-3">
              Read kundali online and read my kundali are the same request: your chart, read for you, online. How to check kundali and how to check kundli are the same question, and check kundali, check my kundali and check my kundli are the same act — checking your own chart. A kundli check and a kundali check are the same check, and a kundali check online, a kundli online check, an online kundali check and check kundali online are the same check done online, while check kundli online free is the same check, free and online. The kundali image and the kundali photo on the result are the chart itself, drawn out for you to see.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali Analysis and Prediction
            </h2>
            <p>
              Kundali analysis is reading the chart to answer a question — about career, marriage, health or the future. A kundali analysis, a kundli analysis, a free kundali analysis and a free kundli analysis are the same reading, and a kundali analysis free is the same free reading. My kundali analysis and my kundli analysis are the same request — your own chart, analysed for you. A free online kundali analysis, an online free kundli analysis and an online free kundali analysis are the same analysis done online, free. The tool above gives a free kundli analysis and a free kundali analysis from your birth details, and this section explains what each part of the analysis means.
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Career:</strong> the tenth house, its lord and the planets in it describe your career — the kind of work that suits you, and when career changes are likely. Kundali for career, career kundli and kundali career are the same check: read the tenth house first.
              </li>
              <li>
                <strong>Marriage and love:</strong> the seventh house describes marriage and partnership, and love marriage in kundli is read from the seventh house and from Venus. Love marriage in kundali is the same reading, and a love marriage kundali is the chart read for a love marriage. For a full match between two people, use the{' '}
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
                page — matching compares two kundalis, while this page reads one. You can also explore our core{' '}
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
                for romantic chemistry.
              </li>
              <li>
                <strong>Future prediction:</strong> kundali prediction and kundli prediction read the Dasha periods — the planetary periods running through your life — to say when things are likely to happen, not just what they are. A free kundali prediction and a free kundli prediction are the same prediction, free here, and an online kundali prediction, an online kundli prediction, a free online kundli prediction and an online free kundali prediction are the same prediction made online. A kundali future prediction and a kundli future prediction are the same reading, and future prediction by kundali and future prediction kundli are the same again. Kundali bhavishya is the same future reading in its Hindi name — bhavishya means the future — and my kundali and future is the same request: your chart, read for what is ahead.
              </li>
              <li>
                <strong>My kundali, checked:</strong> my kundali, my kundli, my kundali online, my kundli online, my kundali free and my kundli free are the same request — your own chart, read for you. Know your kundli and know your kundali are the same request too. Enter your details above and the tool gives your chart, your analysis and your prediction in one report — your kundali report and your kundli report, and a free kundli report and a free kundali report are the same saved report. For additional destiny clues, explore our{' '}
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
                  href="/numerology/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/numerology/');
                  }}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  numerology
                </a>{' '}
                alongside your astrological chart.
              </li>
              <li>
                <strong>Reading:</strong> a kundali reading and a kundli reading are the same plain-language reading of your chart. A free kundali reading and a free kundli reading are the same reading, free here, and an online kundali reading, a kundli reading online, an online free kundali reading and a free online kundali reading are the same reading done online.
              </li>
              <li>
                <strong>Horoscope and today:</strong> a kundali horoscope and a kundli horoscope are the horoscope drawn from your kundali, and a free kundali horoscope is the same horoscope, free here. Kundali today and today kundali are the same daily reading — your chart read for today — and a live kundli and a live kundali are the same live reading, updated for the current day.
              </li>
            </ul>

            <p className="mt-3">
              A kundali reading is a guide, not a verdict. The chart shows tendencies and timings; what you do with them is yours. If a prediction worries you, read the dosha and yoga sections too — a single placement is never the whole story. And the best kundli is simply your own chart made from correct birth details — the best kundli of a person is their own accurate kundali, not anyone else&apos;s.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Yogas in Your Kundali
            </h2>
            <p>
              A yoga in kundli is a combination of planets that gives a specific result. The tool above checks your chart for the main yogas automatically and lists the ones it finds. A kundli yog is the same yoga, and a yoga calculator in kundli, a yoga calculator in kundali and a yoga in kundli calculator are the same check — a calculator that finds the yogas in your kundali. Check yogas in your kundali free with the tool above: enter your birth details and the yogas found are listed with the reading. These are the yogas people search for most:
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Raj Yoga:</strong> the classic yoga of status and success — formed when the lords of the good houses (kendra and trikona) combine. A Raj Yoga calculator checks your chart for these combinations; a raj yog calculator is the same check, and a raj yoga calculator by date of birth checks it from the date alone, while a raj yoga calculator free is the same check, free here. A strong Raj Yoga in kundali is traditionally read as success in career and public life.
              </li>
              <li>
                <strong>Vipreet Raj Yoga:</strong> a Raj Yoga formed from the lords of the difficult houses (6th, 8th, 12th). A vipreet raj yoga calculator checks for it. It is read as success rising out of difficulty — gains after struggle.
              </li>
              <li>
                <strong>Neech Bhang Raj Yoga:</strong> formed when a debilitated planet&apos;s weakness is cancelled. A neech bhang raj yoga calculator and a neech bhang raj yog calculator check for it. It is read as recovery — a weak start that turns strong.
              </li>
              <li>
                <strong>Kaal Sarp Yoga (Kaal Sarp Dosh):</strong> formed when all seven planets sit between Rahu and Ketu. A Kaal Sarp Dosh calculator and a kaal sarp yog calculator check for this pattern. It is traditionally read as delays and struggle early in life, easing with time — it is a flag to look closer, not a final verdict.
              </li>
              <li>
                <strong>Child Yog:</strong> combinations read for children — their timing and well-being. Child yog in my kundli is the same check, read from the fifth house, and child yog in my kundli free is the same check, free here.
              </li>
            </ul>

            <p className="mt-3">
              Use the yoga calculator in kundli (the tool above) to check yogas in your kundali free: enter your birth details and the yogas found are listed with the reading. A yoga is one combination among many — always read it with the rest of the chart.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Jathagam and Jathakam
            </h2>
            <p>
              Jathagam (also spelled jathakam) is the Tamil and Telugu name for the kundali — the same birth chart, read in the South Indian style. A South Indian kundali chart looks different from a North Indian one (the houses are drawn in a fixed square), but the planets, houses and readings are the same. A south indian kundali and a south indian kundli chart are the same South Indian chart, and a kerala kundali is the same chart in its Kerala name.
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Jathagam online:</strong> make your jathagam online from your date of birth and time, in the same tool above. Jathagam online is the most searched South Indian variant, and a jathagam online free is the same check, free here. Enter your details and you get your jathagam chart, your Rashi and your Nakshatra. Online jathakam is the same online check, and an online jathakam free is the same check, free here.
              </li>
              <li>
                <strong>Jathagam by date of birth:</strong> the date of birth fixes the Nakshatra, exactly as in a North Indian kundali. Jathagam by date of birth and time adds the Lagna and the house positions. Jathakam based on date of birth and time and jathakam based on date of birth are the same checks, and a date of birth jathakam is the same chart from the date alone.
              </li>
              <li>
                <strong>Jathakam matching:</strong> matching two jathakams for marriage is the South Indian form of kundali matching. Jathakam matching, jathagam matching and matching jathagam are the same matching, and telugu jathakam matching is the Telugu form of it. The check is the same — guna matching between two charts — and it is covered in full on our{' '}
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
                page, which also covers telugu jathakam matching for marriage, telugu jathakam for marriage based on date of birth, online jathakam for marriage, online jathakam for marriage in telugu and online telugu jathakam matching. Jathagam match in tamil and jathagam matching tamil are the Tamil forms of the same matching, also checked as{' '}
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
                .
              </li>
              <li>
                <strong>Jathagam calculator:</strong> the tool above is also a jathagam calculator and a tamil jathagam calculator — it makes the chart from your birth details and reads it, in English, for Tamil, Telugu and Malayalam names alike. A jathagam generator and an online jathagam generator are the same tool named for what it generates — the jathagam.
              </li>
              <li>
                <strong>Jathagam in English:</strong> jathagam in English and jathakam in English are the same request — the South Indian chart explained in English. My jathagam is your own jathagam, a birth jathagam is the jathagam of your birth, a marriage jathagam and a marriage jathakam are jathagams read for marriage, and a free jathagam, a free jathakam, a free jathagam online and a free jathagam download are the same free jathagam, free here. An online jathagam download is the saved jathagam report.
              </li>
              <li>
                <strong>Jathagam parka:</strong> jathagam parka and tamil jathagam parka — &ldquo;to look at the jathagam&rdquo;, as Tamil speakers say — are the same request: to see your jathagam. A computer jathagam tamil and a computer jathakam are the same computer-made jathagam, and a computer jathagam near me is the same computer jathagam, found online.
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
              Yes. Online kundali on this site is free — free kundali, free kundli online, free online kundali, free kundali online, online kundali free, kundali free, kundali online free and online free kundali all use the same free tool above. Free vedic kundali and vedic kundali free are the same free Vedic chart. There is no app to install and no sign-up: open the page, enter your date of birth, and get your kundali chart, planetary positions and reading immediately. Janam kundli online, janam kundali online and online janam kundali are the same janam kundali made online, and free janam kundali, janam kundali free, janam kundli free, janam kundli free online, janam kundli online free and online janam kundali free are the same free janam kundali, free here. Janampatri online and janampatri online free are the same janampatri made online, free.
            </p>

            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Online kundali:</strong> the tool above is an online kundali maker — make, check and read your kundali in the browser, free. Online kundali check, check kundali online and online kundli analysis all work the same way, and an online free kundli analysis and an online free kundali analysis are the same online analysis, free.
              </li>
              <li>
                <strong>Kundali app:</strong> a kundali app and a free kundali app do the same job on a phone, and a free kundli app is the same free app spelled the other way. A janam kundli app, a janma kundali app and a janam kundali app are the same app named for the janam kundali. A kundli app download, a kundali app download and a kundli app download free are the same download, and the best kundli app and the best kundli app free are the same app asked for as &ldquo;the best&rdquo;. A kundli astrology app is the same astrology app. The website tool gives you the same chart without installing anything, and works on any phone browser.
              </li>
              <li>
                <strong>Kundali software:</strong> kundli software and free kundali software are desktop programs that make charts, and free kundli software is the same free software. A kundli software download is the downloaded program, kundli software for pc is the PC version, free kundli software online is the same software used online, kundali software free is the same free software, best kundli software is the same software asked for as &ldquo;the best&rdquo;, online kundali software is the same software used online, and kundli for windows is the Windows version. They do the same calculation as the online tool; the online tool is the quicker way to get the same result.
              </li>
              <li>
                <strong>Kundali download:</strong> you can save your kundali report — the chart and the reading — from the result. A kundali download and a free kundali download are the saved report, and a kundli download is the same saved report. A janampatri online free download is the same saved janampatri, and kundli in hindi download is the same saved kundli in Hindi.
              </li>
              <li>
                <strong>AI kundali:</strong> an AI kundali reading is a chart reading written in plain language, and kundali ai is the same AI reading. The tool&apos;s reading is written the same way — the chart first, then what it means, in plain words. Online jyotish kundali and online jyotish kundli are the same check through a jyotish (astrology) site.
              </li>
              <li>
                <strong>Kundli near me:</strong> kundli near me and kundali near me are the same search — a kundali made for you, wherever you are. There is no physical place to visit for this — the kundali tool is online, so &ldquo;kundli near me&rdquo; is answered by the free online tool above, wherever you are. A computer jathagam near me is the same online answer for a jathagam.
              </li>
              <li>
                <strong>Languages:</strong> kundli online gujarati, gujarati kundali free and free kundli gujarati are the same Gujarati kundali, free here, and free bengali kundali is the same free kundali in Bengali. The tool reads the chart in English, for names in any Indian language.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Kundali for Marriage
            </h2>
            <p>
              Your kundali is used for marriage in two ways: reading your own chart for marriage, and matching two charts. Reading your own kundali for marriage means the seventh house — its lord, the planets in it and Venus — which describes marriage timing and partnership. Kundali for marriage, marriage kundali and marriage kundli are that check, and the tool above reads the seventh house in your analysis. A kundali check for marriage and a kundli check for marriage are the same check of your own chart, and a free janam kundali analysis for marriage is the same analysis, free here. A kundli reading for marriage is the same reading of your own chart, and online kundali for marriage and online kundli for marriage are the same check done online.
            </p>
            <p className="mt-3">
              Matching two kundalis is a different check: it compares two charts, guna by guna, out of 36. That is covered in full on our{' '}
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
              page — kundali match for marriage, match kundali online, kundli match making and janam kundli match all belong there, as do kundli match for marriage, kundli match matching, matching kundali, match making kundali, match making kundli, match kundli, kundali match by name, match kundali for marriage, how to match kundli for marriage, how to match kundli, how to match kundali, how to match kundli online, matchmaking kundali, kundali online matching, online kundali match making, online kundli match making, kundali compatibility, kundli compatibility, astro kundali match, astro kundli match, vedic kundli match, kundali name matching, jatakam match, online jathakam matching and online telugu jathakam matching. Kundli match marathi is the same match asked in Marathi, and the best kundali match app is the same match asked for as &ldquo;the best app&rdquo; — both are covered on the{' '}
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
              page too. Use this page to make each person&apos;s kundali, then use the{' '}
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
              page to compare them. The matching keywords in this page&apos;s group point to that page, not to a second matching guide here.
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
