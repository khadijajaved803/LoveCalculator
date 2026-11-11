import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { BirthChartTool } from '../components/BirthChartTool';
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

  return (
    <>
      <SEOHead
        title="Birth Chart Calculator | Free Natal Chart by Date of Birth"
        description="Free birth chart calculator — make your natal chart by date of birth and time, with lagna chart, navamsa chart (D9), D10 chart and free birth chart analysis."
        canonicalPath="/birth-chart-calculator/"
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
              A birth chart is the map of the sky at the moment you were born. This natal chart calculator draws it for you: your ascendant, your sun sign and moon sign, every planet&apos;s position, and your houses chart — the 12 houses of your chart. Whether you call it a birth chart, a natal chart or an astro chart, it is the same thing: one chart, made from your birth details. Use it to find birth chart details for yourself or for anyone whose birth details you know — to find my birth chart is the same search with the same answer: your chart, made free, on this page. It works as a birth chart online tool and a free online birth chart calculator, so you do not need an app or a book: open the page, enter your details, and your free online birth chart is ready. A free natal chart from this tool comes with a free birth chart analysis — a plain reading of what the chart shows — and if you want the Vedic version, the same tool gives you a free vedic birth chart with interpretation too.
            </p>
            <p className="mt-3">
              Your birthday chart is the same as your birth chart — the chart of the day you were born — and this tool makes it from your birth date and birth time. A birth chart maker, an astrology birth chart generator and a free birth chart generator are all the same kind of tool, and this one is free: a free birth chart maker that draws your chart and explains it. Create birth chart in three steps — date, time, place — and the calculator does the rest. The best astrology birth chart is the one made from the correct birth time, so enter your time as exactly as you know it; if you do not know it, the tool still makes your chart, but without the houses and the ascendant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is a Birth Chart?
            </h2>
            <p>
              What is a birth chart? A birth chart is a snapshot of the sky — the positions of the sun, moon and planets — at the exact moment and place you were born. What are birth charts used for? In astrology, the chart is read as a map of your personality, your strengths, your relationships and the timing of events in your life. In Vedic astrology a birth chart is a{' '}
              <a
                href="/kundali/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                kundali
              </a>{' '}
              — your janam kundali — and the reading of it is the same whether you call it a chart or a kundali. A birth chart reading, also called a natal chart reading, explains what each placement means: which sign your sun is in, which sign your moon is in, which sign was rising, and which house each planet sits in. A birth chart analysis goes further — it weighs the whole chart together, and a free birth chart analysis from the tool above gives you that reading without paying an astrologer. A birth chart prediction is the timing part of the reading: what the chart says about the year ahead. The tool gives you a free birth chart prediction as part of the analysis, and the same reading works as horoscope birth chart — your horoscope, drawn from your own chart instead of a generic sun-sign column. Birth chart astrology is simply astrology done from the chart: the chart is the source, and everything else — your horoscope, your compatibility, your predictions — is read from it.
            </p>
            <p className="mt-3">
              Your chart has three layers. The sun sign is the sign the sun was in on your birthday. The moon sign is the sign the moon was in — in Vedic astrology this is your Rasi, and the{' '}
              <a
                href="/rashifal-today/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/rashifal-today/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                rashifal today
              </a>{' '}
              page gives you the daily reading for it. And the rising sign — your ascendant — is the sign that was rising on the eastern horizon at your birth time. Together they are the big three of any chart, and the tool shows all three at the top of your result.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Your Rising Sign and Ascendant
            </h2>
            <p>
              Your rising sign is the sign on the eastern horizon when you were born, and in astrology it is called your ascendant. Your rising sign is one of the twelve{' '}
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
              . What is my rising sign? It is the sign that was rising at your birth time — and what is your rising sign is the same question asked about anyone. The ascendant sign is the first house of your chart: it sets the shape of the whole chart, because the houses are counted from it. What is ascendant sign, exactly? The ascendant is the degree of the zodiac rising in the east at the moment of birth, and your ascendant sign is the sign that degree falls in.
            </p>
            <p className="mt-3">
              A rising sign calculator works from your birth time and birth place: give the tool your time and place and it finds your ascendant. This page&apos;s sun moon rising sign calculator shows all three at once — your sun sign, your moon sign and your rising sign — and a moon and rising sign calculator view shows the moon and the ascendant side by side. The tool&apos;s sun moon and rising sign view puts all three together on one card. If you want to know how to find ascendant sign, the answer is your birth time: without the time there is no ascendant, because the rising sign changes about every two hours. How to know your rising sign without a tool? You would need an ephemeris and the exact time — easier to use the ascendant calculator above. How to find rising sign on your own chart? Look at the first house: the sign on its cusp is your rising sign. Find my ascendant sign is the most common way people ask, and what is my ascendant sign and my ascendant sign are the same search: the tool answers all of them from your birth details. How to tell someone&apos;s rising sign? You cannot tell it from their face or their sun sign — you need their birth time. In ascendant astrology, the ascendant describes how you come across and how you meet the world, while the sun describes your core and the moon describes your feelings. A zodiac rising sign reading is the same as an ascendant reading — &ldquo;rising sign&rdquo; and &ldquo;ascendant&rdquo; are two names for the same thing, and an ascendant sign calculator and a rising sign calculator are the same tool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              How to Make a Birth Chart
            </h2>
            <p>
              How to make a birth chart? You need three things: your date of birth, your time of birth and your place of birth. Enter them in the tool above and the calculator draws your chart — that is how to read a birth chart too, because the reading starts from the same three details. Pick your date from the birth calendar on the tool — the date of birth calendar fixes your sun and moon signs — then add the time, which fixes your ascendant and your houses, and the place, which fixes the horizon for your location. Your date of birth chart is ready in seconds.
            </p>
            <p className="mt-3">
              A birth chart by date of birth alone — without the time — still gives you your sun sign, your moon sign and the planetary positions, but not your ascendant or your houses. If you know the time, always add it: the time is what turns a generic chart into your chart. How to read a birth chart starts with the big three — sun, moon, rising — then the planets by sign and house, then the divisional charts below. The tool&apos;s reading walks you through it in that order, so you do not need to know astrology to follow it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Lagna Chart
            </h2>
            <p>
              A lagna chart is the Vedic name for the chart drawn from your ascendant: &ldquo;lagna&rdquo; means ascendant, so a lagna chart is your ascendant chart. The astrology lagna chart is the first chart any Vedic astrologer draws, and a lagna chart calculator makes it from your birth time and place. The lagna chart houses are the 12 houses counted from the ascendant — the first house is you, the second is money, the seventh is marriage, the tenth is career — and the houses chart is the same 12-house wheel drawn from the lagna. How to read lagna chart? Start with the lagna itself: the sign in the first house and the planet ruling it. Then read the planets house by house. A lagna chart online view and a lagna chart generator both draw the same wheel; this tool gives you the lagna chart with the planets placed and the houses labelled. Your lagna chart is fixed at birth — it is not a today lagna chart that changes every day. The lagna in your birth chart stays the same for your whole life; what changes day to day is the transit, not the birth chart.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Navamsa Chart and the D9 Chart
            </h2>
            <p>
              What is navamsa chart? The navamsa chart is the ninth divisional chart of Vedic astrology, and it is so important that it has its own name: the D9 chart. Navamsa chart means the chart of the ninth division — each sign is divided into nine parts, and the navamsa chart meaning is the deeper strength of the planets: a planet that is strong in both the main chart and the navamsa is strong in reality. What is D9 chart? It is the same navamsa chart — D9 is the number, navamsa is the name — and a D9 chart calculator draws it from your birth details. A navamsa chart calculator and a d9 chart calculator are the same tool, and this page&apos;s tool draws both the main chart and the D9 chart together.
            </p>
            <p className="mt-3">
              A navamsa chart analysis looks at the planets in the D9: which planets are exalted, which are in their own sign, and whether the lagna lord is strong. A d9 chart analysis is the same reading. Navamsa chart predictions are traditionally read for marriage and for the second half of life — a free navamsa chart prediction on this page covers the marriage reading, and a free navamsa chart prediction for marriage looks specifically at the seventh house of the D9 and the position of Venus and Jupiter. How to read D9 chart? Check the lagna of the D9 first, then the seventh house, then whether the planets that look weak in the main chart gain strength here. A D9 navamsa chart is read side by side with the main chart, never alone. The navamsa calculator on this page also finds your pushkar navamsa — a pushkar navamsa calculator check that marks the especially auspicious degrees in the navamsa — and the D9 chart in astrology is the standard second chart of every Vedic reading, after the main chart. Navamsa, on its own, is the word for the ninth part — and the d9 chart meaning is the same as the navamsa chart meaning: the hidden strength behind the main chart.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Divisional Charts: D1 to D60
            </h2>
            <p>
              The main chart is the D1 chart — the rasi chart — and a D1 chart calculator draws it from your birth details. A d1 chart in astrology is the foundation: every other chart is a division of it. The D1 and D9 chart calculator view on this page shows both together — the main chart and the navamsa side by side — because the D9 is the most-read divisional chart after the D1.
            </p>
            <p className="mt-3">
              The tool also draws the other divisional charts. A D10 chart calculator draws the D10 chart, the chart of career and status; a free D10 chart calculator check is included in the same result. A D60 chart calculator draws the D60 chart, the chart of past-life karma, and a D60 chart analysis reads the planets there for karmic strengths. A D7 chart calculator draws the D7 chart, the chart of children. A D2 chart calculator draws the D2 chart, the chart of wealth. A D3 chart calculator draws the D3 chart, the chart of siblings and courage, and a D4 chart calculator draws the D4 chart, the chart of property and fortune. A D5 chart calculator draws the D5 chart, the chart of creativity and children, and a D6 chart calculator draws the D6 chart, the chart of health and obstacles. A D8 chart calculator draws the D8 chart, the chart of longevity. A D11 chart calculator draws the D11 chart, the chart of gains, and a D12 chart calculator draws the D12 chart, the chart of parents. A D16 chart calculator draws the D16 chart, the chart of comforts and vehicles — a d16 chart in astrology is read for the comforts of life. A D20 chart calculator draws the D20 chart, the chart of spiritual progress, and a D27 chart calculator draws the D27 chart — a d27 chart in astrology is read for strengths and weaknesses. A D30 chart calculator draws the D30 chart, the chart of evils and misfortunes. Each chart has its own reading, and the tool shows the one you ask for with the same birth details — one birth time, every divisional chart.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Vedic, Western, Indian and South Indian Charts
            </h2>
            <p>
              A vedic astrology birth chart is drawn on the sidereal zodiac — the fixed stars — while a western birth chart is drawn on the tropical zodiac, the seasons. The two zodiacs differ by about 24 degrees, so your vedic birth chart and your Western chart can put the same planet in different signs. A vedic birth chart calculator draws the sidereal chart, and a free vedic birth chart from the tool above comes with the Vedic reading: lagna, navamsa and divisional charts included.
            </p>
            <p className="mt-3">
              An indian birth chart is the Vedic chart as drawn in India, and a birth chart calculator indian search usually means the same Vedic chart with the Indian chart style. A south indian birth chart uses the South Indian square format — the signs stay fixed in the squares and the planets move — while the North Indian format keeps the houses fixed and moves the signs. A birth chart calculator south indian result from this tool draws the South Indian format when you choose it. A bengali astrology birth chart follows the Bengali tradition of Vedic astrology, and a kp astrology birth chart follows KP astrology — the Krishnamurti system, which reads the chart through sub-lords. This tool draws the standard Vedic chart and the Western wheel; the reading notes where KP and regional styles differ.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Houses, Planets and Shadbala
            </h2>
            <p>
              Your houses chart — the 12 houses — is where the reading happens. Each house rules one area of life: the first is you, the second is money, the fourth is home, the fifth is children and creativity, the seventh is marriage, the tenth is career. The planets in each house colour that area: Jupiter in the tenth is read for career luck, Venus in the seventh for marriage. A birth chart analysis weighs the houses together with the signs and the divisional charts, and a free birth chart analysis from the tool gives you that whole reading.
            </p>
            <p className="mt-3">
              Shadbala is the measure of a planet&apos;s strength. A shadbala calculator works out six kinds of strength for each planet and adds them into one score. What is shadbala? Shadbala means &ldquo;sixfold strength&rdquo;, and shadbala in astrology is the standard way to say whether a planet can deliver its results: a planet with high shadbala is strong, one with low shadbala is weak even if it sits in a good sign. Shadbala meaning is simply that sixfold strength, and the tool shows the shadbala score beside each planet in your chart.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Birth Chart Compatibility and Love
            </h2>
            <p>
              A birth chart compatibility check compares two charts — yours and your partner&apos;s — and a natal chart compatibility reading looks at how the two charts fit: sun to sun, moon to moon, and Venus to Mars. Natal chart love compatibility is the love version of the same comparison: it asks whether the two charts support a relationship, and which areas need care. This site&apos;s{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                kundali matching
              </a>{' '}
              page does the full Vedic version of this check with the 8-koota system, and the Porutham page does the Tamil 10-porutham version —{' '}
              <a
                href="/porutham/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/porutham/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                thirumana porutham
              </a>{' '}
              — and both of them start from the two birth charts this calculator draws. Once the charts say you fit, the{' '}
              <a
                href="/love-language-test/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-language-test/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                love language test
              </a>{' '}
              shows how the two of you express love day to day. If you want the love reading first, the{' '}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                love calculator
              </a>{' '}
              on the home page gives you a quick compatibility score from your names and birth dates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Numerology Birth Chart
            </h2>
            <p>
              A numerology birth chart is the number version of your chart: it reads your birth date as numbers instead of planets. A numerology birth chart calculator works out your{' '}
              <a
                href="/life-path-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/life-path-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                life path calculator
              </a>{' '}
              number, your destiny number and your lucky numbers from the same date of birth this calculator uses. The{' '}
              <a
                href="/numerology-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/numerology-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                numerology calculator
              </a>{' '}
              page on this site does that reading in full — enter the same date of birth there and compare the number reading with the planet reading here. The two systems agree more often than people expect: a strong chart and a strong life path number usually show up together.
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
