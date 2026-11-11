import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { LifePathTool } from '../components/LifePathTool';
import { Hash } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LifePathPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs = [
    {
      question: 'What is my mulank?',
      answer:
        'Your mulank is the root number of the day you were born: add the digits of your birth day together until you get one digit. Born on the 29th, 2+9 = 11, then 1+1 = 2, so your mulank is 2.',
    },
    {
      question: 'How to find mulank number?',
      answer:
        'Use the day of your birth only — not the month or year. Add its digits together and reduce to a single digit. The tool above works it out from your full date of birth.',
    },
    {
      question: 'How to calculate life path number?',
      answer:
        'Add all the digits of your full date of birth together, then keep reducing until you get a single digit — except master numbers 11, 22 and 33, which stay as they are.',
    },
    {
      question: 'How to calculate destiny number?',
      answer:
        'The same sum as the life path number: add the digits of your full birth date and reduce to one digit. Your destiny number and your life path number are the same number — destiny number is the Indian name (bhagyank) for it.',
    },
    {
      question: 'What is destiny number in numerology?',
      answer:
        'The destiny number is the number of your life’s direction, calculated from your full date of birth. Your mulank (from the day) is your nature; your destiny number (from the full date) is where your life is headed.',
    },
    {
      question: 'What is my life path number?',
      answer:
        'Enter your date of birth in the calculator above — it shows your life path number, your mulank and your destiny number, with each step of the sum.',
    },
    {
      question: 'What is bhagyank 9?',
      answer:
        'Bhagyank 9 is destiny number 9: bhagyank 9 wale log — people with bhagyank 9 — are read as compassionate, generous and drawn to helping others.',
    },
    {
      question: 'What is life path number 10?',
      answer:
        'Life path 10 reduces to 1, so a life path number 10 is read as a 1 — leadership and independence, with the extra energy of the 0.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Life Path Calculator | Free Life Path Number by Date of Birth"
        description="Free life path calculator — find your life path number, mulank and destiny number by date of birth, with mulank 2 personality, bhagyank 9 and life path number meanings."
        canonicalPath="/life-path-calculator/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Numerology', href: '/numerology/' },
            { label: 'Life Path Calculator', href: '/life-path-calculator/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Hero Header */}
        <div className="text-center mt-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold mb-3">
            <Hash className="w-3.5 h-3.5 text-purple-600" />
            <span>Life Path, Mulank &amp; Destiny Number</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Life Path Calculator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Find your life path number free with this life path calculator. Enter your date of
            birth and get your life path number, your mulank and your destiny number — in seconds,
            free, with no sign-up.
          </p>
        </div>

        {/* Tool Component at the Top */}
        <LifePathTool />

        {/* Guide Content Below Tool */}
        <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-3xl shadow-xs border border-slate-100 text-slate-700 leading-relaxed space-y-8 mt-12">
          <section>
            <p className="text-base sm:text-lg leading-relaxed">
              Your life path number is the most important number in numerology: it is calculated
              from your full date of birth, and it is read as the theme of your life — your
              strengths, your challenges and the direction you are headed. A life path number
              calculator does the same sum the tool above does: add up all the digits of your
              birth date, reduce them to a single digit, and that digit is your life path number.
              To calculate life path number by hand, take your birth date — for example 29-07-1998
              — add 2+9+0+7+1+9+9+8 = 45, then 4+5 = 9, so the life path number is 9. The tool
              shows every step, so you can check the sum yourself. Numerology life path number
              readings are the same in the Western and Indian systems: the Western life path
              number and the Indian bhagyank are the same number, calculated the same way from the
              same date of birth. This page gives you both names for it, plus your mulank — the
              root number from your birth day alone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is a Life Path Number?
            </h2>
            <p>
              A life path number is the single digit you get when you reduce your full date of
              birth to one number. It is the first number any numerologist works out, and in
              numerology it is read as your life&apos;s theme: the talents you were born with, the
              lessons you keep meeting, and the kind of life that fits you. Your life path number
              never changes — it is fixed by your birth date, while your daily rashifal changes
              every day. The{' '}
              <a
                href="/rashifal-today/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/rashifal-today/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                Rashifal Today
              </a>{' '}
              page gives you the daily reading; your life path number gives you the long view.
            </p>
            <p className="mt-3">
              Astrology life path readings pair the number with the chart: your life path number
              is read alongside your{' '}
              <a
                href="/kundali/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                kundali
              </a>{' '}
              and your{' '}
              <a
                href="/zodiac-signs/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/zodiac-signs/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                zodiac signs
              </a>{' '}
              — the number says what your life&apos;s theme is, the chart says how it plays out.
              Your life path number comes from your date of birth; your birth chart adds the time
              and place — the{' '}
              <a
                href="/birth-chart-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/birth-chart-calculator/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                Birth Chart Calculator
              </a>{' '}
              page draws it. Your life path number also colours your{' '}
              <a
                href="/love-horoscope/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-horoscope/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                love horoscope
              </a>{' '}
              for the year, and it is read alongside{' '}
              <a
                href="/love-compatibility-by-zodiac-sign/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-compatibility-by-zodiac-sign/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                love compatibility by zodiac sign
              </a>{' '}
              when two people are compared. The number is a guide, not a verdict: it describes
              tendencies, and your choices still decide your life.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              How to Calculate Life Path Number
            </h2>
            <p>
              How to calculate life path number? Add up every digit of your date of birth, then
              keep adding the digits of the result until you get a single digit — except for the
              master numbers 11, 22 and 33, which are not reduced. A life path number calculator
              does this in one step, but the method is simple enough to do by hand. How to
              calculate life path number, step by step: write your birth date as numbers, add all
              the digits together, and if the result has two digits, add those two digits
              together. Repeat until you have one digit. For 14-03-2001: 1+4+0+3+2+0+0+1 = 11 — a
              master number, so it stays 11 and is not reduced to 2. For 29-07-1998:
              2+9+0+7+1+9+9+8 = 45, then 4+5 = 9. Life path 10 works the same way: 10 reduces to
              1, so a life path number 10 is read as a 1, with the extra energy of the 0. The tool
              above shows each step of the sum, so you can see exactly how your number was
              reached.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Life Path Number Meanings: 1 to 9
            </h2>
            <p>
              Every life path number has its own meaning. These are the traditional readings —
              tendencies, not rules.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Life path number 1 (and life path 10):</strong> leadership and
                independence. 1s are read as self-starters who want to lead and do things their
                own way. Life path 10 is read as a 1, because 10 reduces to 1.
              </li>
              <li>
                <strong>Life path number 2:</strong> cooperation and sensitivity. 2s are read as
                peacemakers — diplomatic, gentle, and good at working with others.
              </li>
              <li>
                <strong>Life path number 3:</strong> creativity and expression. 3s are read as
                expressive and social, happiest when creating or communicating.
              </li>
              <li>
                <strong>Life path number 4:</strong> stability and hard work. 4s are read as
                builders — practical, patient, and steady.
              </li>
              <li>
                <strong>Life path number 5:</strong> freedom and change. 5s are read as restless
                and curious, happiest with variety and movement.
              </li>
              <li>
                <strong>Life path number 6:</strong> responsibility and care. 6s are read as the
                carers — home, family and looking after others matter most.
              </li>
              <li>
                <strong>Life path number 7:</strong> analysis and spirituality. 7s are read as
                thinkers — private, analytical, and drawn to deeper questions.
              </li>
              <li>
                <strong>Life path number 8:</strong> ambition and money. 8s are read as
                achievers, focused on success, status and material results.
              </li>
              <li>
                <strong>Life path number 9:</strong> compassion and completion. A life path
                number 9 is read as the humanitarian — generous, idealistic, and drawn to serving
                others. 9 is the number of completion: the last single digit, so 9s are read as
                old souls finishing a cycle.
              </li>
            </ul>
            <p className="mt-3">
              Master numbers 11, 22 and 33 are not reduced: 11 is read as intuition and
              inspiration, 22 as big building and practical vision, 33 as teaching and healing. If
              your number is 11, 22 or 33, the tool keeps it as it is and reads both the master
              number and its reduced digit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Mulank: Your Root Number
            </h2>
            <p>
              In Indian numerology, your mulank is your root number — the number of your birth
              day. What is my mulank? Add the digits of the day you were born: born on the 29th,
              2+9 = 11, then 1+1 = 2, so your mulank is 2. How to find mulank number is that
              simple — the day alone, not the month or year. The mulank is read as your core
              nature: how you think and act day to day, while the bhagyank (your destiny number,
              from the full date) is read as your life&apos;s direction.
            </p>
            <p className="mt-3">
              Mulank 2 is the most searched mulank, so it gets its own section below. 2 mulank
              means the same thing as mulank 2 — &ldquo;2 mulank&rdquo; is simply the number
              written first. Mulank compatibility is the comparison of two people&apos;s mulanks:
              mulank compatibility is read for friendships, business and marriage, and it is read
              alongside{' '}
              <a
                href="/porutham/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/porutham/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                thirumana porutham
              </a>{' '}
              when a match is checked for marriage —{' '}
              <a
                href="/kundali-matching/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kundali-matching/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                Kundali Matching
              </a>{' '}
              does the same check with the 8-koota system. The same numbers are also read for
              marriage timing on the{' '}
              <a
                href="/when-will-i-get-married/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/when-will-i-get-married/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                When Will I Get Married
              </a>{' '}
              page. Once you know your life path number, the{' '}
              <a
                href="/love-language-test/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/love-language-test/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                Love Language Test
              </a>{' '}
              shows how you express love day to day — the number says what you need, the love
              languages say how you show it. If you want the love reading first, the{' '}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                love calculator
              </a>{' '}
              on the home page gives you a quick compatibility score from your names and birth
              dates.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-8 mb-3">
              Mulank 2: Personality, Love Life and Compatibility
            </h3>
            <p>
              Mulank 2 personality: 2s are ruled by the Moon, and mulank 2 personality is read as
              gentle, sensitive and diplomatic. People with mulank 2 are said to be good
              listeners, peacemakers and loyal friends — they feel things deeply and they avoid
              conflict. Mulank 2 love life is read the same way: in love, 2s are caring and
              emotional, and they need reassurance and closeness from their partner. A mulank 2
              love life works best with a partner who is steady and openly affectionate. Mulank 2
              compatibility is traditionally read as strongest with mulank 1, mulank 2 and mulank
              7 — numbers that balance the 2&apos;s softness with steadiness or understanding.
              Mulank 7 compatibility is read the same way for 7s: 7s are traditionally said to
              match well with 1, 2 and 5. Mulank 9 love life is different again: 9s are
              compassionate and idealistic in love, and they need a partner who shares their
              values — a mulank 9 love life is read as generous and devoted, but 9s can give too
              much and forget their own needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Bhagyank and Destiny Number
            </h2>
            <p>
              Bhagyank is the Indian name for the destiny number: &ldquo;bhagya&rdquo; means
              destiny, so bhagyank is your destiny number, calculated from your full date of
              birth. Bhagyank calculation is the same sum as the life path number — add all the
              digits of your birth date and reduce to one digit. A destiny number calculator does
              exactly this sum, and the destiny number it gives you is your bhagyank. What is
              destiny number in numerology? It is the number of your life&apos;s direction: while
              the mulank (from the day) is read as your nature, the destiny number (from the full
              date) is read as where your life is headed. Destiny number meaning is that
              direction — the work, the relationships and the lessons your life keeps bringing
              you. Numerology destiny number readings use the same digits as the life path number,
              so your destiny number and your life path number are the same number, under two
              names.
            </p>
            <p className="mt-3">
              How to calculate destiny number is the same as how to calculate life path number:
              add the digits of your full birth date and reduce to a single digit. How to find
              destiny number is the same sum — the tool above shows it step by step. Destiny
              number 9 is the most talked-about destiny number: a destiny number 9 is read as the
              humanitarian path — service, compassion and finishing what others start. Destiny
              number 2 is read as the path of cooperation and partnership — 2s build their life
              through relationships. Bhagyank 9 is the same as destiny number 9, and bhagyank 9
              wale log — people with bhagyank 9 — are said to be compassionate, generous and
              drawn to helping others, sometimes at their own expense. If you want a deeper
              reading of your numbers together, a life path number numerologist can read your life
              path number, mulank and destiny number as one chart — the tool above gives you the
              numbers, and the{' '}
              <a
                href="/numerology-calculator/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/numerology-calculator/');
                }}
                className="text-purple-600 hover:underline font-semibold"
              >
                Numerology Calculator
              </a>{' '}
              page gives you the full number reading, including your lucky numbers.
            </p>
          </section>
        </article>

        {/* FAQs */}
        <div className="mt-16">
          <FAQSection faqs={faqs} />
        </div>

        {/* Related Tools & Articles */}
        <div className="mt-16 space-y-12">
          <RelatedTools currentToolId="life-path-calculator" onNavigate={onNavigate} />
          <RelatedArticles onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
};
