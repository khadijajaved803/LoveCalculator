import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { LoveHoroscopeTool } from '../components/LoveHoroscopeTool';
import loveHoroscopeCoupleStarsImage from '../assets/images/love-horoscope-couple-stars.webp';
import loveHoroscopeHeartConstellationImage from '../assets/images/love-horoscope-heart-constellation.webp';
import { Moon } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LoveHoroscopePage: React.FC<Props> = ({ onNavigate }) => {
  const faqs = [
    {
      question: 'What is my love horoscope for today?',
      answer:
        'Pick your zodiac sign in the tool above — or enter your date of birth and let the tool find your sign — and it shows your love horoscope today, free. The reading refreshes every morning.',
    },
    {
      question: 'What is a daily love horoscope?',
      answer:
        'A daily love horoscope is a short reading of your love life for one day, written for your zodiac sign. This page’s tool gives it for today, tomorrow, this week and this month.',
    },
    {
      question: 'What is tomorrow’s love horoscope?',
      answer:
        'The same kind of reading, one day ahead. The tool above gives you tomorrow’s love horoscope for your sign, so you can plan what to say and when to say it.',
    },
    {
      question: 'How do I check my love horoscope by date of birth?',
      answer:
        'Enter your date of birth in the tool above. It works out your zodiac sign and gives you the same daily love horoscope — a free love horoscope by date of birth, with no sign-up.',
    },
    {
      question: 'Is there a love horoscope in Hindi?',
      answer:
        'Yes — choose Hindi in the tool. A today love horoscope in hindi is the same daily reading, in Hindi, for every sign, and a weekly love horoscope in hindi is the week’s reading in Hindi.',
    },
    {
      question: 'What is a Cancer love horoscope?',
      answer:
        'The daily love reading for Cancer, the water sign ruled by the Moon. Cancer horoscope today love is the most-searched Cancer reading, and the tool above gives it free every morning. Cancer gets its own section on this page.',
    },
    {
      question: 'Are love horoscopes accurate?',
      answer:
        'They are guides, not guarantees. A good love horoscope describes the day’s mood and helps you act better today; it does not promise an outcome. The best readings are specific, honest and refreshed daily.',
    },
    {
      question: 'Do I need a love horoscope app?',
      answer:
        'No. The tool on this page runs free in your browser — no love horoscope app to install, no sign-up. Bookmark the page and check it each morning.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Love Horoscope Today | Free Daily Love Horoscope by Zodiac Sign"
        description="Free love horoscope today — your daily love horoscope by zodiac sign or date of birth, with tomorrow, weekly and monthly love horoscope, singles and couples readings, and love horoscope in Hindi."
        canonicalPath="/love-horoscope/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Astrology', href: '/astrology/' },
            { label: 'Love Horoscope', href: '/love-horoscope/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="text-center mt-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-3">
            <Moon className="w-3.5 h-3.5 text-indigo-600" />
            <span>Daily Love Horoscope · Today, Tomorrow, Weekly &amp; Monthly</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Love Horoscope
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Check your love horoscope today, free. Pick your zodiac sign — or enter your date of
            birth and let the tool find it — and get your daily love horoscope: what love looks
            like for you today, what to say, and what to hold back on. Your horoscope today love
            reading refreshes every morning, so the love horoscope you see here is always
            today&apos;s, never yesterday&apos;s horoscope.
          </p>
        </div>

        {/* Tool Component at the Top */}
        <LoveHoroscopeTool onNavigate={onNavigate} />

        {/* Guide Content Below Tool */}
        <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-3xl shadow-xs border border-slate-100 text-slate-700 leading-relaxed space-y-8 mt-12">
          <section>
            <p className="text-base sm:text-lg leading-relaxed">
              Pick your sign — or type in your date of birth and let the tool find it — and your
              love horoscope today is ready in a moment: the mood between you and the person you
              care about, one thing worth saying, and one thing better left unsaid. Your
              horoscope today love reading refreshes every morning, so what you open is always
              today&apos;s — never yesterday&apos;s. The reading is free, it needs no sign-up,
              and it asks for nothing more than a sign or a date.
            </p>
            <p className="mt-3">
              Use it the way most readers do: a quick check over morning tea, before you text
              back, before you bring up something delicate. The daily love horoscope here is
              short on purpose — one sign, one day, one piece of advice — and it stays practical:
              what the day favours, what to avoid, and which signs it pairs well with today. And
              once you know what the day favours, the{' '}
              <a
                href="/love-language-test/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-language-test/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Love Language Test
              </a>
              {' '}shows how you express love day to day — the horoscope says when, the love
              languages say how. If you want a number with your reading, the{' '}
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
              {' '}on the home page gives you a quick compatibility score from two names.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={loveHoroscopeCoupleStarsImage}
              alt="A love horoscope scene: a couple under a starry night sky with a crescent moon"
              width="1200"
              height="1800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              The stars the reading is drawn from — the Moon sets the day&apos;s feeling, Venus
              sets the timing.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is a Love Horoscope?
            </h2>
            <p>
              The reading sticks to one part of the day: love. Work, money and health belong to
              the full daily horoscope; this one looks only at feelings, a partner, a crush, or
              the chance of meeting someone new. Behind it sit the Moon and Venus — the Moon
              shifts sign every two and a half days, so it sets the day&apos;s feeling, while
              Venus sets the timing of what you say and when. The tool reads those two against
              your sign and turns them into a short note with three parts: the mood, one thing
              worth saying, and one thing to hold back. It runs free in your browser, with no
              sign-up, and the note under every result says the same thing this page will keep
              saying: tendencies, not guarantees.
            </p>
            <p className="mt-3">
              The twelve{' '}
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
              {' '}give the reading its shape — each sign brings its own theme to the day — and
              the{' '}
              <a
                href="/astrology/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/astrology/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                astrology
              </a>
              {' '}behind it is the same tradition the rest of the site uses, pointed at love
              instead of work or money. Your{' '}
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
              {' '}is a different thing: your whole birth chart, fixed for life, while this
              reading changes every morning because the Moon keeps moving. For the full chart,
              the{' '}
              <a
                href="/birth-chart-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/birth-chart-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Birth Chart Calculator
              </a>
              {' '}draws it; for today, this page is the one to open. The rashifal is different
              again — it covers the whole day, love included — while this page reads only the
              love half. The{' '}
              <a
                href="/rashifal-today/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/rashifal-today/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Rashifal Today
              </a>
              {' '}page holds today&apos;s rashifal, love first; here you get the full love
              reading by sign. The reading here follows the Western signs — the Vedic chart is
              read on the Kundali page, and the two traditions don&apos;t mix on this tool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Today&apos;s Love Horoscope by Zodiac Sign
            </h2>
            <p>
              Every reading on this page is written for one sign, so the first step is always
              the same: pick yours. The tool holds all twelve, and each sign&apos;s reading
              leans on what that sign is known for — not as a verdict, but as the angle the
              day&apos;s advice takes. Aries gets told to speak plainly; Pisces gets told to
              trust what it feels. The list below is a flavour of each, not the reading itself —
              for the full note, pick your sign above.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Aries:</strong> bold and direct — when the reading tells Aries to say
                something, it usually means say it now, plainly, before the moment passes.
              </li>
              <li>
                <strong>Taurus:</strong> slow and steady wins the day — comfort, good food,
                showing up. The advice here is usually to prove love by being there, not by
                saying more.
              </li>
              <li>
                <strong>Gemini:</strong> talk first. For Gemini the way in is a good
                conversation, and the reading often points at a message worth sending or a
                question worth asking.
              </li>
              <li>
                <strong>Cancer:</strong> the most-searched sign on this page — Cancer gets its
                own section below, because more readers look for its reading than any other.
              </li>
              <li>
                <strong>Leo:</strong> warm and proud. Leo&apos;s reading is usually about
                generosity — a grand gesture, a compliment, making the other person feel
                chosen.
              </li>
              <li>
                <strong>Virgo:</strong> small acts, remembered details. Virgo&apos;s love
                advice is practical — help without being asked, and notice what the other
                person actually needs.
              </li>
              <li>
                <strong>Libra:</strong> balance first. Libra&apos;s reading is the
                peacemaker&apos;s note: smooth over the small friction before it grows, and
                make the other person feel chosen.
              </li>
              <li>
                <strong>Scorpio:</strong> deep and all-or-nothing. A Scorpio reading talks
                about loyalty and trust, and it is honest about jealousy when it shows up.
              </li>
              <li>
                <strong>Sagittarius:</strong> free and honest — Sagittarius wants a partner
                who keeps up. The reading usually points at something new to try together
                rather than a talk.
              </li>
              <li>
                <strong>Capricorn:</strong> slow-burn love. Capricorn&apos;s advice is about
                trust built over time, and the reading often says to let the other person
                prove themselves.
              </li>
              <li>
                <strong>Aquarius:</strong> friendship first. Aquarius falls for a mind before
                a face, and the reading often starts with a conversation, not a gesture.
              </li>
              <li>
                <strong>Pisces:</strong> dreamy and tender — Pisces feels what the other
                person feels, and the reading usually says to trust that instinct, then check
                it gently.
              </li>
            </ul>
            <p className="mt-3">
              Two signs read together are a different question, and the Love Match section below
              takes it up. For now, one sign is enough: pick yours above and read what the day
              holds for it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Tomorrow&apos;s Love Horoscope — Today and Tomorrow
            </h2>
            <p>
              Today&apos;s reading answers what to do now; the tomorrow love horoscope answers
              what to plan. The tool keeps both beside each other — today and tomorrow tabs on
              the same result — because the question most people ask after reading today is
              &ldquo;what about tomorrow?&rdquo; A day that looks tense for a hard conversation
              might look fine the morning after, and knowing that changes whether you speak
              today or wait.
            </p>
            <p className="mt-3">
              Yesterday is the one direction this page doesn&apos;t go. A reading for a day
              already gone can&apos;t change what you do now, and a page that keeps old
              readings is a page that has gone stale — so the tool looks forward only: today,
              tomorrow, this week, this month. Check each morning and the reading is always
              fresh.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Love Horoscope by Date of Birth
            </h2>
            <p>
              Don&apos;t know your sign? Type in your date of birth and the tool works it out,
              then gives you the same daily reading — a free love horoscope by date of birth,
              with no sign-up. The date is only the way in: it finds the sign, and the sign is
              what the reading is written for. The tool asks for the date only, not the time —
              there is no rising-sign step here — and if you want the full chart behind the
              sign, the Birth Chart Calculator draws it.
            </p>
            <p className="mt-3">
              The same date can be read more than one way. The{' '}
              <a
                href="/life-path-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/life-path-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Life Path Calculator
              </a>
              {' '}reads it as numbers, and the{' '}
              <a
                href="/numerology-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/numerology-calculator/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Numerology Calculator
              </a>
              {' '}reads it as a lucky number — this page reads it as a sign. Together they are
              three readings from one date. Your birthday is the date the tool uses to find
              your sign, so a birthday reading works the same way: enter the birthday, get the
              sign, read the day. And if a name matters to you as well, the{' '}
              <a
                href="/name-compatibility/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/name-compatibility/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Name Compatibility
              </a>
              {' '}page reads two names together — the name adds a second angle to the same
              date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Single Love Horoscope and Couples Love Horoscope
            </h2>
            <p>
              The tool asks one question before it reads: single or couple. Pick
              &ldquo;single&rdquo; and the reading is written for someone looking: a single
              love horoscope today answers whether to message first, whether the person on your
              mind is worth another chance, and whether to say yes to a date. Accurate love
              horoscopes for singles stay practical: they say what to do today, not that a
              stranger will appear at a fixed hour. That honesty is what makes a reading
              useful — it tells you how to act, not what will happen to you.
            </p>
            <p className="mt-3">
              Pick &ldquo;couple&rdquo; and the note changes: a couples love horoscope today
              reads how the day runs between two people already together — when to raise
              something hard, and when to leave it for a better day. It reads the mood between
              two people, not the chances of meeting a third — quieter, and closer to home.
              Readers also open the singles reading for a one sided love horoscope — not to
              find out what the other person feels, because no daily reading can do that, but
              to get an honest note on their own side: when to wait, and when to stop waiting.
              The tool never asks your age or your label — a teenager gets the same daily
              reading as anyone else, written plainly, and the reading is written for whoever
              is in love.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={loveHoroscopeHeartConstellationImage}
              alt="A heart-shaped constellation glowing in a deep indigo sky"
              width="1200"
              height="1600"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              A heart among the stars: one sign, one day, one note.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Weekly, Monthly and Yearly Love Horoscope
            </h2>
            <p>
              Today is the shortest span the tool gives, not the only one. The weekly tab pulls
              the week together — the best days for love, the days to keep things light — and
              the monthly tab reads the month&apos;s theme: a slow month for new love, a good
              month for sorting out a relationship, rather than day-by-day detail. There is no
              yearly tab here; the longest span is the month, and a year is read one month at a
              time. Read the month once, then come back each morning for the short readings —
              the month sets the theme, the day sets the timing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Love Horoscope in Hindi, Marathi, Urdu and Tamil
            </h2>
            <p>
              Hindi is the one other language the tool actually speaks. Flip the toggle to
              हिन्दी and the whole reading — mood, what to say, what to avoid, best matches —
              comes back in Hindi, for every sign, for today, tomorrow, the week and the
              month. That covers the way most Hindi readers ask for it: today love horoscope
              in hindi, or the shorter today love horoscope hindi, both land on the same
              toggle. The week&apos;s reading is there too — a weekly love horoscope in hindi
              is the same weekly note, in Hindi.
            </p>
            <p className="mt-3">
              Marathi, Urdu and Tamil are a different story: the tool reads in English and
              Hindi only, so those versions aren&apos;t offered on this page. The signs, the
              day and the advice don&apos;t change between languages — only the words do — and
              for now the Hindi toggle is the one that changes them. If you read in Marathi,
              Urdu or Tamil, the English reading on this page is the same daily note, and the
              sign picker works the same in either language.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Cancer Love Horoscope
            </h2>
            <p>
              Cancer is the most-searched sign in this group by far, so it gets its own
              section. Cancer readers open the cancer horoscope today love reading first — the
              water sign ruled by the Moon, read love-first every morning. Cancer feels first
              and thinks second, so the note usually turns on feelings: whether to say what
              you feel, or to wait until you are sure. And the cancer love horoscope itself is
              free in the tool, like every other sign&apos;s — no separate page, no separate
              charge.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Cancer today:</strong> how Cancer&apos;s love life runs today, mood
                first. The singles version reads the same day for Cancer readers who are
                looking — and the tool&apos;s singles toggle covers it, today and tomorrow.
              </li>
              <li>
                <strong>Cancer this week:</strong> the cancer weekly love horoscope is the
                week&apos;s reading for Cancer, and the singles version of it when the week is
                about meeting someone new. The weekly tab holds it; the month&apos;s theme
                sits one tab over.
              </li>
              <li>
                <strong>Cancer men and women:</strong> the tool doesn&apos;t split readings
                by men and women — it splits them by single and couple, and the reading is the
                same for any Cancer reader. What changes is the situation: Cancer men are
                often read as showing love quietly, through care rather than words, and Cancer
                women the same loyalty from the other side — the note is about how Cancer
                loves, not who is reading it.
              </li>
              <li>
                <strong>Cancer and other signs:</strong> two Cancers together, Cancer with
                Sagittarius, Leo with Cancer — the sign-pair readings all live on the
                compatibility page, because a match between two signs is a compatibility
                question, not a daily one. The daily tool gives you one sign&apos;s reading;
                the compatibility page gives you the pair.
              </li>
              <li>
                <strong>Cancer by time:</strong> the day&apos;s reading covers the evening as
                well — there is no separate tonight tab — and it looks forward only: tomorrow
                and the day after sit on their own tabs, while yesterday&apos;s reading is
                gone, because this page doesn&apos;t keep old readings. The Hindi toggle
                covers Cancer too, so the same day&apos;s note reads in Hindi when you choose
                it.
              </li>
              <li>
                <strong>Cancer predictions:</strong> predictions are the forward-looking part
                of the reading — what the next days favour for Cancer in love. They are
                written as tendencies, not certainties: the note says what the day favours,
                and your choices decide the rest.
              </li>
            </ul>
            <p className="mt-3">
              Cancer readers also look a day ahead for the singles readings — the singles
              toggle and the tomorrow tab cover them together. One sign, one day, one note:
              that is the whole of it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Love Match and Compatibility
            </h2>
            <p>
              Most readings end with a match question: who does my sign get on with? The short
              answer is the horoscope love match — the signs that suit yours best in love —
              and the tool&apos;s own result names them for today before pointing you on. The
              long answer lives on the{' '}
              <a
                href="/love-compatibility-by-zodiac-sign/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-compatibility-by-zodiac-sign/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Love Compatibility by Zodiac Sign
              </a>
              {' '}page: two signs, one match, with the reasons. The tool there works like a
              horoscope love calculator — enter two signs, or two dates of birth, and get the
              match. The question can also be asked from two names or two dates instead — the{' '}
              <a
                href="/love-calculator-by-date-of-birth/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-calculator-by-date-of-birth/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Love Calculator by Date of Birth
              </a>
              {' '}compares two dates, and the home page&apos;s calculator gives a{' '}
              <a
                href="/blog/what-does-love-percentage-mean/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/blog/what-does-love-percentage-mean/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                love percentage
              </a>
              {' '}from two names. A match is a starting point, not a verdict: the chart says
              which pairings run easy, and the two people decide whether it works.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              How Accurate Is a Love Horoscope? The Best and Most Accurate Readings
            </h2>
            <p>
              Are horoscopes accurate for love? It is the question that matters most, and it
              deserves a straight answer: a reading here is a guide, not a guarantee. It
              describes tendencies — a good day for honesty, a tense day for big talks — and it
              earns its keep when it helps you act better today, not when it promises an
              outcome. That is what an accurate love horoscope does: it describes the
              day&apos;s mood, it doesn&apos;t claim to decide your future, and it never
              claims a number or a sign guarantees luck, money or marriage. Judge a reading by
              whether you can use it: &ldquo;today favours a calm conversation&rdquo; helps;
              &ldquo;you will meet your soulmate at 4 pm&rdquo; doesn&apos;t. And a reading
              built from your own sign and date, refreshed daily, will always beat a generic
              paragraph written for everyone — which is why the tool asks for your sign or
              date of birth and refreshes every morning.
            </p>
            <p className="mt-3">
              Free doesn&apos;t mean vague. The free love horoscope here costs nothing because
              a daily reading is short — one sign, one day, one piece of advice — and the tool
              asks for nothing in return: no sign-up, no install. If you ever want a deeper
              reading, the Birth Chart Calculator draws the full chart, and a human astrologer
              can read it with you. But for today, the tool above is enough: the reading that
              helps you love better today is the one worth keeping, and the one that tells you
              the truth about the day, good or bad, is the one worth trusting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Love Horoscope and Marriage
            </h2>
            <p>
              Marriage is often the reason someone opens a love reading. Is horoscope
              important for love marriage? In the Indian tradition, yes — and the match is
              where it starts. A match can suit a love marriage or an arranged one, and the{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Kundali Matching
              </a>
              {' '}page answers that with the full guna-milan check. The{' '}
              <a
                href="/when-will-i-get-married/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/when-will-i-get-married/');
                }}
                className="text-indigo-600 hover:underline font-semibold"
              >
                When Will I Get Married
              </a>
              {' '}page answers the other half — when love is likely to arrive, and when
              marriage follows — with a prediction from your date of birth. Between the two
              sits the daily reading: it reads the relationship as it stands today, while the
              marriage pages read the life. Open this page for the day, and those pages for
              the years.
            </p>
          </section>
        </article>

        {/* FAQs */}
        <div className="mt-16">
          <FAQSection faqs={faqs} />
        </div>

        {/* Related Tools & Articles */}
        <div className="mt-16 space-y-12">
          <RelatedTools currentToolId="love-horoscope" onNavigate={onNavigate} />
          <RelatedArticles onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
};
