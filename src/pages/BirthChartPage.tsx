import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { BirthChartTool } from '../components/BirthChartTool';
import birthChartWheelImage from '../assets/images/birth-chart-calculator-wheel.webp';
import birthChartCandlelightImage from '../assets/images/birth-chart-calculator-candlelight.webp';
import { Compass, Sparkles } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const BirthChartPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs = [
    {
      question: 'What is a birth chart?',
      answer:
        'A birth chart is the map of the sky — sun, moon and planets — at the moment you were born, drawn for your birth time and place.',
    },
    {
      question: 'What is my rising sign?',
      answer:
        'Your rising sign is the zodiac sign that was rising on the eastern horizon at your birth time. The tool above finds it from your birth time and place.',
    },
    {
      question: 'What is navamsa chart?',
      answer:
        'The navamsa chart, or D9 chart, is the ninth divisional chart of Vedic astrology. It shows the hidden strength of your planets and is traditionally read for marriage.',
    },
    {
      question: 'What is D9 chart?',
      answer:
        'The D9 chart is the navamsa chart — the ninth division of each sign. It is read side by side with your main birth chart.',
    },
    {
      question: 'How to read a birth chart?',
      answer:
        'Start with your sun, moon and rising signs, then read the planets by sign and house, then check the navamsa (D9) and the divisional charts.',
    },
    {
      question: 'How to find rising sign?',
      answer:
        'Enter your birth time and place in the calculator above — the rising sign needs the exact time, because it changes about every two hours.',
    },
    {
      question: 'What is your ascendant sign?',
      answer:
        'Your ascendant sign is your rising sign — the sign on the eastern horizon at your birth time, which sets the first house of your chart.',
    },
    {
      question: 'What is ascendant sign?',
      answer:
        'The ascendant is the degree of the zodiac rising in the east at your birth moment; the sign it falls in is your ascendant sign.',
    },
    {
      question: 'How to know your rising sign?',
      answer:
        'Use the calculator above with your birth time and place — or read it from the first house of a chart drawn for your birth time.',
    },
    {
      question: 'What are birth charts?',
      answer:
        'Birth charts are maps of the sky at birth — one per person — read in astrology for personality, relationships and timing.',
    },
    {
      question: 'Do I need my birth time?',
      answer:
        'For the full chart — ascendant, houses and divisional charts — yes. Without the time you still get your sun sign, moon sign and planetary positions, but no lagna and no houses.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': 'Birth Chart Calculator',
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
        title="Birth Chart Calculator | Free Natal Chart by Date of Birth"
        description="Free birth chart calculator — make your natal chart by date of birth and time, with lagna, navamsa (D9) and D10 charts and free analysis."
        canonicalPath="/birth-chart-calculator/"
        schemaJson={schemaJson}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Astrology', href: '/astrology/' },
            { label: 'Birth Chart Calculator', href: '/birth-chart-calculator/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="text-center mt-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Natal, Lagna &amp; Divisional Astrological Chart Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Birth Chart Calculator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Make your free birth chart with this free birth chart calculator. Enter your date of birth, time of birth and place of birth and get your birth chart — your natal chart — in seconds, free, with no sign-up.
          </p>
        </div>

        {/* Tool Component at the Top */}
        <BirthChartTool onNavigate={onNavigate} />

        {/* Guide Content Below Tool */}
        <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8 mt-12">
          <section>
            <p className="text-base sm:text-lg leading-relaxed">
              Three details are all it takes to draw your chart: the date you were born, the time, and the place. The tool above is a free birth chart calculator — enter your date, time and place and it draws your wheel in seconds: the sun, the moon, every planet, and the houses they fall into — then adds a plain reading of what the wheel shows, with no sign-up and nothing to pay. It is an online birth chart calculator, so there is nothing to download and nothing to install, and your birth chart online result appears the moment the details are in, with the reading attached. Most people arrive here wanting one thing — my birth chart, drawn from my own birth details, with the reading included — and you can look up a chart for yourself or for anyone whose birth details you know.
            </p>
            <p className="mt-3">
              Your birthday chart is drawn from the same three details — date, time and place — and the most useful chart is the one made from the correct birth time, so enter your time as exactly as you know it. If you do not know the time, the tool still draws your chart, but without the houses and the ascendant: the date alone gives you the sun sign, the moon sign and the planetary positions, and the page says so plainly wherever it matters. You get a free birth chart with every calculation, and a free natal chart reading with it, the same wheel explained in plain words. Every chart also comes with a free birth chart analysis — a plain explanation of the placements, not just the wheel. This birth chart generator needs no app and no book: open the page, enter your details, and your chart is ready. If you would rather not pay an astrologer, this free birth chart maker draws the wheel and explains it for you.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={birthChartWheelImage}
              alt="Natal birth chart wheel with planets and zodiac symbols on a deep indigo night sky"
              width="1200"
              height="1200"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              Your free online birth chart, drawn as a wheel — the sun, moon and planets placed in the twelve signs.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is a Birth Chart?
            </h2>
            <p>
              Picture the sky at the exact minute you were born — where the sun stood, where the moon stood, where each planet stood — and imagine that sky drawn as a wheel. That wheel is what astrologers read, and the tool above draws it for you from your birth details. The natal chart reading the tool gives you walks through the wheel in order: the three signs that shape you most, the planets by sign and house, and the smaller wheels that sit underneath the main one. What are birth charts used for, in practice? They are read for personality, for relationships, and for timing — which years favour a move,{' '}
              <a
                href="/when-will-i-get-married/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/when-will-i-get-married/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                a marriage
              </a>
              {' '}, a change of direction. A birth chart analysis weighs the whole wheel together instead of reading one placement at a time, and the free birth chart analysis on this page is included with every chart. The timing part of the reading — the free birth chart prediction for the year ahead — comes at the end, and it is written as an indication, not a guarantee. Your{' '}
              <a
              href="/love-horoscope/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/love-horoscope/');
              }}
              className="text-indigo-600 hover:underline font-semibold"
              >
              horoscope
              </a>
              {' '}comes from the same wheel: a horoscope birth chart reading is your own chart read for the year ahead, not a generic sun-sign column. In birth chart astrology, the wheel is the source and everything else — the horoscope, the compatibility check, the timing — is read from it. In Vedic astrology the wheel has its own name —{' '}
              <a
                href="/kundali/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                kundali
              </a>
              {' '}— your janam kundali — and the reading follows the same placements, sign by sign.
            </p>
            <p className="mt-3">
              Three placements matter more than the rest, and an astrology birth chart reading starts with them. The sun stood in one sign on your birthday, and that sign shapes the core of the reading. The moon stood in its own sign that day — in Vedic astrology this is your Rasi — and the{' '}
              <a
                href="/rashifal-today/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/rashifal-today/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                rashifal today
              </a>
              {' '}page gives the daily reading for it. The rising sign was coming up over the eastern horizon at your birth time, and it sets the first house of the whole wheel. Together they are the big three of any chart — sun moon and rising sign — and the tool shows all three at the top of your result. Use this natal chart calculator with your birth time and you get the ascendant and the houses as well as the planets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Your Rising Sign and Ascendant
            </h2>
            <p>
              The sign on the eastern horizon when you were born sets the shape of the whole wheel, because the houses are counted from it. That sign is your rising sign, and astrologers call that same sign your ascendant. The ascendant sign sets the first house, and everything else in the wheel is counted from there. Your rising sign is one of the twelve{' '}
              <a
                href="/zodiac-signs/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/zodiac-signs/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                zodiac signs
              </a>
              {' '}— and it changes roughly every two hours, which is why the birth time matters so much: without the time there is no ascendant to find, and no houses either. The first question most people ask is what is my rising sign, and the answer is in your birth time — the tool finds it from the time and place you enter. If you are wondering what is my ascendant sign, it is the same answer: the sign that was rising when you were born.
            </p>
            <p className="mt-3">
              Finding it takes two details: your birth time and your birth place. A rising sign calculator works from both — give the tool your time and place and it finds your ascendant for you, and that is how to find ascendant sign without an ephemeris or a book. Use the ascendant calculator above and it finds your rising sign from the same two details. The tool shows all three together on one card — the sun moon rising sign calculator view, with your sun sign, your moon sign and your rising sign in one place — and a moon and rising sign calculator view shows the moon and the ascendant side by side. To find my ascendant sign you need the birth time, not the birth date, and that is the one detail people most often get wrong. How to know your rising sign on your own chart? Look at the first house: the sign on its cusp is the rising sign. How to tell someone&apos;s rising sign? You cannot tell it from their face or their sun sign — you need their birth time. Every zodiac rising sign changes about every two hours, so a time that is off by an hour can move the whole wheel. In ascendant astrology, the rising sign describes how you come across and how you meet the world, while the sun describes your core and the moon your feelings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              How to Make a Birth Chart
            </h2>
            <p>
              To create a birth chart, enter three things: your date of birth, your time of birth and your place of birth. Create birth chart in three steps — date, time, place — and the calculator does the rest. Pick your date from the date of birth calendar in the tool — the calendar sets your sun and moon signs — then add the time, which sets your ascendant and your houses, and the place, which sets the horizon for your location. That is how to make a birth chart, and the same three details are where the reading starts. Your date of birth chart is ready in seconds.
            </p>
            <p className="mt-3">
              A birth chart by date of birth alone — without the time — still gives you the sun sign, the moon sign and the planetary positions, but not the ascendant or the houses. If you know the time, always add it: the time is what turns a generic chart into your chart. Enter the time as exactly as you know it — the best astrology birth chart is the one drawn from the right time, and a rough guess can shift the ascendant by a whole sign. Learning how to read a birth chart starts with the big three — sun, moon, rising — then the planets by sign and house, then the smaller wheels below. The tool&apos;s reading walks you through it in that order, so you do not need to know astrology to follow it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Lagna Chart
            </h2>
            <p>
              The ascendant has a Vedic name — lagna — and the lagna chart is the wheel drawn from it: the first chart any Vedic astrologer draws. The astrology lagna chart is read house by house, and the twelve houses are counted from the lagna — the first house is you, the second is money, the seventh is marriage, the tenth is career — so the lagna chart houses are the frame the whole reading hangs on. A lagna chart calculator makes it from your birth time and place, and the tool draws your lagna chart online with the planets placed and the houses labelled. Learning how to read lagna chart follows the same order — lagna first, then the houses — so start with the sign in the first house and the planet ruling it, then read the planets house by house. Your lagna is fixed at birth, so there is no separate today lagna chart that changes each morning; what shifts day to day is the transit of the planets, not the wheel you were born with.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Navamsa Chart and the D9 Chart
            </h2>
            <p>
              After the main wheel, Vedic astrologers turn to a second wheel. Each sign is split into nine equal parts, and the wheel drawn from those parts shows how strong each planet really is — a planet that looks strong in the main chart but weak here is weaker than it first appears, and one that gains strength here carries more weight than the main wheel suggests. That second wheel — the navamsa chart — is the one astrologers reach for when the main wheel leaves a question open. The tool draws both wheels together — the main chart and the d9 chart — so you can compare them side by side, and a d9 chart calculator draws the second wheel from the same birth details you entered for the main chart. What is d9 chart for? It checks whether the strengths in the main wheel hold up when the chart is divided finer.
            </p>
            <p className="mt-3">
              The marriage reading is where this wheel earns its reputation. Navamsa chart predictions are traditionally read for marriage and for the second half of life, and the free navamsa chart prediction on this page covers the marriage reading — the seventh house of the D9, and the positions of Venus and Jupiter there. A free navamsa chart prediction for marriage looks at the same three things in closer detail. A navamsa chart analysis looks at the planets in the D9: which are exalted, which sit in their own sign, and whether the lagna lord is strong — and the d9 chart analysis on this page reads those same placements beside the main chart, so you can see where the two wheels agree. Learning how to read d9 chart starts with the lagna of the D9, then the seventh house, then whether the planets that look weak in the main chart gain strength here. Read the d9 navamsa chart beside the main wheel, never on its own, and in a Vedic reading the d9 chart in astrology comes second only to the main wheel. The navamsa chart calculator on this page also flags your pushkar navamsa degrees, and a pushkar navamsa calculator check marks the especially auspicious ones in the ninth-division wheel.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={birthChartCandlelightImage}
              alt="A person studying a large birth chart by candlelight"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              Reading a birth chart takes time: the wheel is studied placement by placement, not skimmed.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Divisional Charts: D1 to D60
            </h2>
            <p>
              Start with the main wheel, the D1 chart — the rasi chart — and every other wheel in Vedic astrology is a division of it. Splitting the same birth moment into finer parts lets one area of life be read at a time: the D1 shows the whole picture, and each division zooms in on one part of it. A d1 chart calculator draws the main wheel from your birth details, and the result lets you switch between the main chart and the navamsa, because the D9 is the division astrologers check first after the D1. In practice, the d1 chart in astrology is the foundation every other wheel is divided from, and the result on this page includes the other divisions the tool calculates.
            </p>
            <p className="mt-3">
              The tool calculates ten divisions in all. Wealth is read from the D2, the hora chart, and a d2 chart calculator splits the wheel in two to show it. The D3 drekkana covers siblings and courage, the D4 chaturthamsa covers property and fortune, and the D7 saptamsa covers children — the d3 chart calculator, d4 chart calculator and d7 chart calculator views all draw from the same birth details. Career and status belong to the D10, the dasamsa, and the d10 chart calculator is the one to open when a job question is on your mind; a free d10 chart calculator check is included in the same result. Parents are read from the D12, comforts and vehicles from the D16 — in the d16 chart in astrology, a strong placement is read as ease in daily life — and past-life karma from the D60, the shashtiamsa: the d12 chart calculator, d16 chart calculator and d60 chart calculator readings sit beside them in the result, with a d60 chart analysis that reads the planets there for karmic strengths. The tradition divides the wheel further still — a d5 chart calculator for creativity, a d6 chart calculator for health, a d8 chart calculator for longevity, a d11 chart calculator for gains, a d20 chart calculator for spiritual progress, the d27 chart in astrology for strengths and weaknesses, and a d30 chart calculator for the harder side of life — but the result on this page covers the ten divisions above, which are the ones astrologers reach for first.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Vedic, Western, Indian and South Indian Charts
            </h2>
            <p>
              Two zodiacs are in use, and they differ by about 24 degrees. The vedic astrology birth chart on this page is drawn on the sidereal zodiac — the fixed stars — while a western birth chart is drawn on the tropical zodiac, the seasons, so the same planet can fall in a different sign depending on which zodiac you use. A vedic birth chart calculator draws the sidereal chart, and the free vedic birth chart with interpretation on this page comes with the Vedic reading: lagna, navamsa and divisional charts included, not just the wheel.
            </p>
            <p className="mt-3">
              An indian birth chart is the Vedic chart as it is drawn in India, and the tool gives you the Indian drawing styles to match: the North Indian diamond, where the houses stay fixed and the signs move, or the South Indian square, where the signs stay fixed in their squares and the planets move. If you came looking for a birth chart calculator indian style, this is it — the Vedic chart with the North Indian diamond or the South Indian square as the drawing. Choose the South Indian style and you get a birth chart calculator south indian layout, the square format readers in the south recognise at once, and that is the layout a south indian birth chart is drawn in. The Bengali tradition draws the same Vedic chart with its own house layout — a bengali astrology birth chart follows the same sidereal rules, with the Bengali chart style. KP astrology works differently again: a kp astrology birth chart is read through sub-lords, the small divisions of each star, rather than whole signs. This page draws the standard Vedic chart, so if you follow KP, use the planetary positions here and apply the sub-lord rules yourself.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Houses, Planets and Shadbala
            </h2>
            <p>
              The twelve houses are where the reading happens. Each house rules one area of life: the first is you, the second is money, the fourth is home, the fifth is children and creativity, the seventh is marriage, the tenth is career. A planet colours the house it sits in — Jupiter in the tenth is read for career luck, Venus in the seventh for marriage — and the tool lays out your houses chart with each area labelled, so you can see which parts of life the planets are touching. A birth chart analysis weighs the houses together with the signs and the divisional wheels, and the free birth chart analysis on this page gives you that whole reading.
            </p>
            <p className="mt-3">
              Every planet also carries a strength score. A shadbala calculator works out six kinds of strength for each planet and adds them into one number, and the tool shows that score beside each planet in your chart — a planet with a high score can deliver its results, while one with a low score stays weak even in a good sign. Astrologers check shadbala in astrology before trusting a placement, because a weak planet in a good sign still struggles to deliver.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Birth Chart Compatibility and Love
            </h2>
            <p>
              Two charts side by side tell you more than one chart alone. A{' '}
              <a
                href="/love-compatibility-by-zodiac-sign/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-compatibility-by-zodiac-sign/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                birth chart compatibility check
              </a>
              {' '}compares your wheel with your partner&apos;s, and a natal chart compatibility reading looks at the same two wheels for fit — sun to sun, moon to moon, Venus to Mars — and asks where they support each other and where they need care. When the question is love, the comparison becomes natal chart love compatibility, and the focus shifts to Venus, Mars and the two moons. This site&apos;s{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                kundali matching
              </a>
              {' '}page does the full Vedic version with the 8-koota system, and the{' '}
              <a
                href="/porutham/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/porutham/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                thirumana porutham
              </a>
              {' '}page does the Tamil 10-porutham version — both start from the two birth charts this calculator draws. Once the charts say you fit, the{' '}
              <a
                href="/love-language-test/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-language-test/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                love language test
              </a>
              {' '}shows how the two of you express love day to day, and the{' '}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                love calculator
              </a>
              {' '}on the home page gives a quick compatibility score from your names and birth dates if you want the love reading first.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Numerology Birth Chart
            </h2>
            <p>
              Numbers tell the same story another way. A numerology birth chart reads your birth date as numbers instead of planets, and a numerology birth chart calculator works out your life path number and your destiny number from the same date of birth this calculator uses. The{' '}
              <a
                href="/life-path-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/life-path-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                life path calculator
              </a>
              {' '}number is the one most people start with, and the{' '}
              <a
                href="/numerology-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/numerology-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                numerology calculator
              </a>
              {' '}page does that reading in full — enter the same date of birth there and compare the number reading with the planet reading here. The two systems agree more often than people expect: a strong chart and a strong life path number usually show up together.
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
