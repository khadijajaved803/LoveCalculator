import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { MarriagePredictionTool } from '../components/MarriagePredictionTool';
import weddingImage from '../assets/images/when-will-i-get-married-wedding.webp';
import ringsImage from '../assets/images/when-will-i-get-married-rings.webp';
import { Heart } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const WhenWillIGetMarriedPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs = [
    {
      question: 'When will I get married?',
      answer:
        'Enter your date of birth in the tool above. It gives a free marriage prediction by date of birth: a predicted marriage age and window, a love-or-arranged lean, and when you are likely to meet your life partner.',
    },
    {
      question: 'How is a marriage prediction by date of birth calculated?',
      answer:
        'From your chart: the 7th house and its lord, Venus and Jupiter, and the dasha running at each age. When Jupiter supports the 7th house in a favourable dasha, that is read as a marriage window.',
    },
    {
      question: 'How to calculate marriage age?',
      answer:
        'Find the 7th house lord, find which dasha runs at which age, and find when Jupiter supports the 7th house. The tool above shows the calculation, and returns the age as a range rather than a single year.',
    },
    {
      question: 'Is the marriage prediction accurate?',
      answer:
        'It is an astrological indication, not a guarantee. A good prediction names its window and shows its reasons; it never promises one exact day. Treat it as guidance for planning, not as a fixed date.',
    },
    {
      question: 'Will it be a love marriage or an arranged marriage?',
      answer:
        'The tool gives a lean, not a verdict: if the 5th house of love connects with the 7th house of marriage, the chart leans towards love marriage; otherwise it leans towards arranged. The people involved decide in the end.',
    },
    {
      question: 'When will I meet my life partner?',
      answer:
        'The prediction above gives a meeting window too, usually a little before the marriage window. The tool describes the kind of person the chart points to, not a name.',
    },
    {
      question: 'Is the marriage prediction free?',
      answer:
        'Yes. The tool above is a free marriage prediction — no sign-up, no app to install. A free marriage prediction by name and date of birth mode is included, using your name as well as your date.',
    },
    {
      question: 'What is shadi kab hogi?',
      answer:
        '“Shadi kab hogi” is Hindi for “when will I get married”. The shadi kab hogi calculator in the tool above answers it, in Hindi or English, from your date of birth.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': 'When Will I Get Married',
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
        title="When Will I Get Married? Free Marriage Prediction"
        description="Free marriage prediction by date of birth — when will I get married, your marriage age, and when you will meet your life partner, with Vedic astrology."
        canonicalPath="/when-will-i-get-married/"
        schemaJson={schemaJson}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Astrology', href: '/astrology/' },
            { label: 'When Will I Get Married', href: '/when-will-i-get-married/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="text-center mt-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 text-indigo-600" />
            <span>Free Marriage Prediction · By Date of Birth</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            When Will I Get Married
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            When will I get married? It is the question almost everyone asks their horoscope at
            some point — not just the year, but the age, the kind of marriage, and the person.
            This page gives you a free marriage prediction by date of birth: enter your date of
            birth in the tool above and get your predicted marriage age, a marriage window, and
            whether your chart points to a love marriage or an arranged marriage. If you want the
            love reading first, the{' '}
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
            on the home page gives you a quick compatibility score from two names.
          </p>
        </div>

        {/* Tool Component at the Top */}
        <MarriagePredictionTool onNavigate={onNavigate} />

        {/* Guide Content Below Tool */}
        <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-3xl shadow-xs border border-slate-100 text-slate-700 leading-relaxed space-y-8 mt-12">
          <section>
            <p className="text-base sm:text-lg leading-relaxed">
              Almost everyone asks their horoscope this question at some point — not only the
              year, but the age, the kind of marriage, and the person. The tool above works as a
              marriage prediction calculator: one date in, and it gives back the age, the window,
              and whether the chart leans towards love or arranged marriage. You can run a free
              marriage prediction by date of birth here with nothing but the date — no fee, no
              sign-up, and the reasoning shown beside the result, so you can see the answer was
              worked out rather than guessed. If you want the short answer first, the when will i
              get married calculator by date of birth above gives it in one line: date in, age
              and window out. Read on if you want to know how that answer is reached.
            </p>
            <p className="mt-3">
              Your date of birth fixes the chart — the planets as they stood when you were born —
              and a marriage prediction by date of birth reads that chart forward to find when
              marriage is most likely. Ask it as when will i get married according to date of
              birth and the tool answers from that date alone: no time of birth needed for the
              first reading, and if you add the time later, the window gets sharper. When only
              the date is known, a marriage prediction by dob still works — the planets come from
              the date, the timing comes from the planets, and the tool shows you the steps.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={weddingImage}
              alt="A joyful wedding ceremony with marigold flowers and warm lights"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              The celebration at the end of the reading — a marriage prediction looks ahead to
              this moment.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">What Is a Marriage Prediction?</h2>
            <p>
              A useful reading covers three things: when, what kind, and whom. The age tells you
              the timing, the lean tells you whether the chart points to love or arranged
              marriage, and the partner indications tell you what kind of person to expect —
              never a name, only a description. That is what makes a result a complete marriage
              prediction: not a single line like “you will marry at 27”, but the age, the window,
              the lean, and the reasons behind them, so you can judge the reading for yourself.
              Behind the tool sits a simple practice, marriage prediction astrology: the chart
              read house by house and period by period, looking for when marriage is favoured.
            </p>
            <p className="mt-3">
              Some people come here for themselves, some for a son or daughter, some for a
              sibling — and some are already in a relationship and want to know whether the chart
              supports marrying now or waiting. The tool above returns my marriage prediction for
              whoever&apos;s date you enter, with the same method in every case: one date in, one
              reading out, reasons shown. Matching two charts is a different job, and it belongs
              on the{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Kundali Matching
              </a>{' '}
              page; this page reads one chart for one question: when.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">Marriage Prediction by Date of Birth</h2>
            <p>
              Enter the date and the tool reads the 7th house — the house of marriage — along
              with Venus, the planet of love, and Jupiter, the planet of blessings and, in a
              woman&apos;s chart, of the husband. Add the time of birth and the reading sharpens,
              because the time fixes the ascendant and the houses; without it, you still get an
              age range rather than a narrow window, and the tool says so plainly. The date alone
              is enough to start: the planets come from the date, the periods come from the
              planets, and the result comes with its working shown.
            </p>
            <p className="mt-3">
              The question everyone asks next is whether the answer can be trusted. Treat it as
              an indication, not a certainty: a good reading names the favourable period and the
              age it points to, and it is useful when it helps you plan — when to look, when to
              wait, what to prepare. It is not useful when it is treated as a fixed appointment.
              This page&apos;s tool never promises one guaranteed day; it gives a window and an
              age, and it says the window is the chart&apos;s favour, not a promise. And if you
              think in Hindi first, the language toggle gives the whole reading — age, window,
              lean — in Hindi, with nothing lost.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">How to Know When Will I Get Married</h2>
            <p>
              Start with the chart, not with a guess. How to know when will i get married comes
              down to reading three things together: the 7th house and its lord, the dasha — the
              planetary period — running at the time, and the transits of Jupiter and Saturn.
              When Jupiter crosses the 7th house or aspects it, and the dasha supports marriage,
              astrologers read that as a marriage window. When Saturn is involved, the reading
              often points later: Saturn delays, but it also steadies, so a Saturn-delayed
              marriage is often read as a later, more settled one. The tool above does this
              reading for you — it does not pick a year out of the air, it reads the periods and
              shows you which one it used.
            </p>
            <p className="mt-3">
              Sometimes the chart is silent — no strong marriage period is running in the next
              year or two — and the honest reading says so instead of inventing one. What matters
              is a reading that shows its reasons and its limits, and remembers that the chart
              reads timing while the decision to marry is yours. For the shortest form, use the
              tool above as a one-line check: date in, age and window out, with the lean beside
              it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">Marriage Age Prediction: How to Calculate Marriage Age</h2>
            <p>
              For most people, the age matters more than the date on a calendar. You can get a
              marriage age prediction by date of birth free online right here — one date in, an
              age range out, usually a small span like 26 to 28 rather than a single year, with
              the dasha shown beside it. How to calculate marriage age comes down to three steps:
              find the 7th house lord and where it sits, find which dasha runs at which age, and
              find when Jupiter supports the 7th house. The tool above shows that calculation,
              so the age it returns is worked out, not guessed.
            </p>
            <p className="mt-3">
              A later age is not a worse one. Charts that point late often point to a steadier
              marriage, and the reading says why — a slow Saturn, a dasha that matures late, a
              7th house lord that strengthens with time. Numbers from the same date can say more:
              the{' '}
              <a
                href="/life-path-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/life-path-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Life Path Calculator
              </a>{' '}
              reads your date of birth as numbers, and some readers like to set the two results
              side by side.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">When Will I Get Married Astrology: Horoscope, Kundali and Vedic Astrology</h2>
            <p>
              The tool above answers when will i get married astrology from your date of birth:
              the whole chart read for timing, with the marriage houses, the dasha, and the
              transits. If you want that reading as a quick check, the when will i get married
              astrology calculator above turns it into a tool — enter the date and it works out
              the age window from the chart. You can run a when will i get married astrology
              prediction free, in the browser, with no sign-up: the full reading, age window,
              lean and meeting window, at no cost. The reading is free in every form: a when will
              i get married astrology free result from the tool above costs nothing and asks for
              no sign-up. From the horoscope chart alone, a free horoscope marriage prediction
              reads the twelve{' '}
              <a
                href="/zodiac-signs/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/zodiac-signs/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                zodiac signs
              </a>{' '}
              one by one, and costs nothing. If you want the reading from the horoscope alone, a
              when will i get married horoscope check starts from that chart and reads the
              marriage houses in it. The{' '}
              <a
                href="/rashifal-today/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/rashifal-today/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Rashifal Today
              </a>{' '}
              page gives the same chart&apos;s reading for today.
            </p>
            <p className="mt-3">
              In India the method is Vedic, and a hindu astrology marriage prediction works from
              the kundali, the dasha and the navamsa — the tool above follows that method. Under
              the Vedic method — a vedic astrology marriage prediction — the reading checks the
              7th house, the navamsa chart, the dasha, and the yogas that point to marriage. The
              kundali form is the one people search for most, so a kundli marriage prediction
              reads the 7th house in the kundali, the navamsa, and the dasha. From the birth chart
              itself, a marriage prediction by kundali reads the timing from the kundali, and a
              free astro marriage prediction gives the quick, free version of that reading in the
              browser. For the full kundali itself — the chart, not just the timing — the{' '}
              <a
                href="/kundali/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Kundali
              </a>{' '}
              page builds it, and the{' '}
              <a
                href="/birth-chart-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/birth-chart-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Birth Chart Calculator
              </a>{' '}
              draws the same chart.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={ringsImage}
              alt="Two intertwined gold wedding rings on cream silk with soft rose petals"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              Two rings, one timing — the tool reads when the chart favours the wedding, not just
              the year.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">Love Marriage Prediction and Love or Arranged Marriage Prediction</h2>
            <p>
              The second half of the question is not when, but what kind. The tool&apos;s lean
              answers a love or arrange marriage prediction in one line: which way the chart
              points, and how strongly. Whether the chart points to love turns on one connection:
              the 5th house — love, romance, choice — joined to the 7th house of marriage. When
              the two connect, a love marriage prediction leans towards love marriage; when the
              7th house stands with the family houses and Saturn, it leans the other way. The
              tool gives a love marriage or arrange marriage prediction as a lean, with the
              reasons shown, and a love or arranged marriage prediction by date of birth reads
              the same two houses from your date alone.
            </p>
            <p className="mt-3">
              A lean is not a verdict. A reading that points to love does not mean the family
              will agree tomorrow, and one that points to arranged does not mean you cannot
              choose — the chart reads tendencies, and the people decide. The{' '}
              <a
                href="/love-or-arranged-marriage-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-or-arranged-marriage-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                love or arranged marriage calculator
              </a>{' '}
              on this site is the tool form of it, and it is linked below. If the chart points
              to love, the{' '}
              <a
                href="/love-language-test/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-language-test/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Love Language Test
              </a>{' '}
              page can help you understand how you and your partner express love once you are
              together; if it points to arranged, run the match itself through the{' '}
              <a
                href="/porutham/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/porutham/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Porutham
              </a>{' '}
              page and its ten poruthams.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">When Will I Meet My Life Partner?</h2>
            <p>
              Often the real question is not the wedding date but the meeting. The tool above
              answers it as part of the reading: the dasha and transits that point to marriage
              usually point to the meeting a little before it, so you get the meeting window
              first and the marriage window after. A when will i meet my life partner astrology
              calculator reads those same periods and gives the meeting window on its own, for
              readers who want that answer first. And the “to whom” half is answered as
              indications, never a name: the kind of person, the direction they may come from,
              and the age difference the chart suggests. Nobody&apos;s chart names a person; it
              describes one. For the full sign-by-sign match, the{' '}
              <a
                href="/love-compatibility-by-zodiac-sign/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-compatibility-by-zodiac-sign/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Love Compatibility by Zodiac Sign
              </a>{' '}
              page compares the two signs, and the{' '}
              <a
                href="/love-horoscope/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-horoscope/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Love Horoscope
              </a>{' '}
              page reads the love half of the chart, day by day.
            </p>
            <p className="mt-3">
              Once you have met someone, two dates tell more than one. A couple&apos;s reading
              takes your date and your partner&apos;s together, and the{' '}
              <a
                href="/love-calculator-by-date-of-birth/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-calculator-by-date-of-birth/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Love Calculator by Date of Birth
              </a>{' '}
              page reads two dates of birth together for compatibility. Love now, marriage later,
              and how the two connect — that wider reading runs through the same tool above; the
              only difference is which dates you enter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">Shadi Kab Hogi: Marriage Prediction in Hindi</h2>
            <p>
              A large part of the people asking this question ask it in Hindi, and the tool
              answers in Hindi too. In Hindi the question is “shadi kab hogi”, and a shadi kab
              hogi calculator answers it from your date of birth, in Hindi or English — the
              whole prediction, age, window, and lean, in either language. Readers who type
              shadi kab hogi kaise jane want the method, not just the answer: your date fixes
              the chart, the chart gives the periods, and the periods give the window. That is
              the whole method, in one line, and the tool above shows each step as it works.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">Free Marriage Prediction: True, Accurate and Complete</h2>
            <p>
              On this page, a free marriage prediction costs nothing and asks for no sign-up:
              the tool, the result, and the reasons, all in the browser. Add your name and you
              get a free marriage prediction by name and date of birth — the name adds a
              numerology flavour, the date does the astrology, and the{' '}
              <a
                href="/numerology-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/numerology-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Numerology Calculator
              </a>{' '}
              reads the name&apos;s number. Some people search for an app instead, but a browser
              tool gives that reading without the install, and there is nothing to download.
            </p>
            <p className="mt-3">
              Two words in this group need honest handling: “true” and “exact”. A reading earns
              trust by showing its working, naming its window, and admitting what it cannot
              know — that is the honest version of a true prediction, and it is free here. On
              “exact”: the tool is exact about its method — “age 27 to 29, in the Jupiter
              dasha” — and honest in not promising one guaranteed day. A complete reading
              covers when, what kind, and whom, and that is what this page aims to give. To check
              a prediction you already have, ask what it was based on: if it names no house, no
              dasha and no planet, it was not a reading.
            </p>
            <p className="mt-3">
              One method inside Vedic astrology deserves a mention: KP astrology, which reads
              the sub-lords, and the tool draws on it among its methods. Add the time of birth
              and the reading sharpens, because the time fixes the houses. And the reading does
              not stop at the wedding: the same chart can say something about life after
              marriage, from the same houses and periods that gave the timing.
            </p>
          </section>
        </article>

        <FAQSection faqs={faqs} />

        <RelatedTools currentToolId="when-will-i-get-married" onNavigate={onNavigate} />
        <RelatedArticles onNavigate={onNavigate} />
      </div>
    </>
  );
};
