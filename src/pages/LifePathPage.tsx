import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { LifePathTool } from '../components/LifePathTool';
import { Hash } from 'lucide-react';
import lifePathJourneyImage from '../assets/images/life-path-number-journey.webp';
import lifePathStonesImage from '../assets/images/life-path-number-stones.webp';

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
              Start with the date you were born. To calculate life path number by hand, add
              every digit of that date together and keep reducing until one digit is left — that
              digit is the thread running through your whole life: the talents that come easily,
              the lessons that keep repeating, and the direction that suits you. Try it with
              29-07-1998: 2+9+0+7+1+9+9+8 makes 45, and 4+5 makes 9. This life path calculator
              runs the same sum and shows each step, so you can check the arithmetic yourself.
              Indian numerology runs that sum too and calls the result bhagyank, and it adds one
              more number from the day alone — your mulank, the root number that describes how
              you come across day to day.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={lifePathJourneyImage}
              alt="A winding garden path lit by lanterns at dusk, symbolising a life path number journey"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              A lantern-lit path at dusk — your life path number is the thread that runs through
              a whole life.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              What Is a Life Path Number?
            </h2>
            <p>
              Unlike a daily forecast, this number never changes. It is fixed the moment your
              birth date is fixed, which is why people treat it as the long view rather than the
              mood of the day. For the mood of the day, the{' '}
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
              page reads what today favours and what needs care — the number below it stays the
              same, and the daily reading changes around it.
            </p>
            <p className="mt-3">
              Read on its own, the number is only half the story. An astrology life path reading
              pairs it with the chart: your{' '}
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
              shows where the planets sat when you were born, your{' '}
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
              place you in the twelve-sign cycle, and the{' '}
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
              draws the full picture from your time and place of birth — the number gives the
              theme, the chart shows how it plays out in practice. The same pairing helps in
              love: your{' '}
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
              for the year reads differently once you know the number behind it, and{' '}
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
              compares two people&apos;s charts side by side. Treat all of it as a guide, not a
              verdict — the number describes tendencies, and your choices still decide the rest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              How to Calculate Life Path Number
            </h2>
            <p>
              All you need is your birth date and a minute of adding. How to calculate life path
              number, step by step: write the date as digits, add them all together, and if the
              answer still has two digits, add those two together. Keep going until one digit is
              left — unless you land on 11, 22 or 33, which are master numbers and stay exactly
              as they are. Take 14-03-2001: 1+4+0+3+2+0+0+1 makes 11, so it stays 11 and is not
              reduced to 2. Take 29-07-1998: 2+9+0+7+1+9+9+8 makes 45, and 4+5 makes 9. Landing
              on 10 works the same way — life path 10 reduces to 1, so a life path number 10
              reads as a 1 with the extra energy of the 0. A life path number calculator does
              this in one step, but doing it by hand takes less than a minute, and the tool above
              shows every step of the sum so you can see exactly how your number was reached.
            </p>
          </section>

          <figure className="my-8">
            <img
              src={lifePathStonesImage}
              alt="Nine glowing stones in a spiral on dark indigo ground, one for each life path number from 1 to 9"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              Nine stones, nine numbers — each life path number from 1 to 9 has its own
              traditional reading.
            </figcaption>
          </figure>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Life Path Number Meanings: 1 to 9
            </h2>
            <p>
              People who ask for a numerology life path number reading usually want one thing: to
              know what their birth date says about the shape of their life. The list below is
              the traditional answer, number by number — tendencies, not rules.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Life path number 1 (and life path 10):</strong> leadership and
                independence. 1s are natural self-starters who want to lead and do things their
                own way.
              </li>
              <li>
                <strong>Life path number 2:</strong> cooperation and sensitivity. 2s are
                peacemakers — diplomatic, gentle, and good at working with others.
              </li>
              <li>
                <strong>Life path number 3:</strong> creativity and expression. 3s are expressive
                and social, happiest when creating or communicating.
              </li>
              <li>
                <strong>Life path number 4:</strong> stability and hard work. 4s are builders —
                practical, patient, and steady.
              </li>
              <li>
                <strong>Life path number 5:</strong> freedom and change. 5s are restless and
                curious, happiest with variety and movement.
              </li>
              <li>
                <strong>Life path number 6:</strong> responsibility and care. 6s are the carers —
                home, family and looking after others matter most.
              </li>
              <li>
                <strong>Life path number 7:</strong> analysis and spirituality. 7s are thinkers —
                private, analytical, and drawn to deeper questions.
              </li>
              <li>
                <strong>Life path number 8:</strong> ambition and money. 8s are achievers, focused
                on success, status and material results.
              </li>
              <li>
                <strong>Life path number 9:</strong> compassion and completion. A life path
                number 9 is the humanitarian — generous, idealistic, and drawn to serving others.
                9 is the last single digit, the number of completion, so 9s are often described
                as old souls finishing a cycle.
              </li>
            </ul>
            <p className="mt-3">
              If your sum stopped at 11, 22 or 33, you have a master number, and the tool keeps
              it as it is — 11 for intuition and inspiration, 22 for big building and practical
              vision, 33 for teaching and healing. The tool also reads the reduced digit
              alongside it, so you get both the master reading and the single-digit one.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Mulank: Your Root Number
            </h2>
            <p>
              Indian numerology splits the work in two. The day you were born gives your mulank,
              the root number that describes your core nature — how you think and act day to day.
              Wondering what is my mulank? Take the day alone, add its digits and keep reducing:
              born on the 29th, 2+9 makes 11, then 1+1 makes 2, so your mulank is 2. How to find
              mulank number? Use only the day — never the month or year. The full date gives the
              bhagyank, your destiny number, which points the other way: the mulank says who you
              are, the bhagyank says where your life is heading.
            </p>
            <p className="mt-3">
              Root numbers are also compared between two people. When families check a match
              before a marriage, that comparison is mulank compatibility in practice, and it is
              read alongside{' '}
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
              — while{' '}
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
              checks the match through the 8-koota system. The numbers can also point at timing,
              which is why people check the{' '}
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
              page once they know theirs. In everyday love, the number says what you need and
              the{' '}
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
              shows how you express it — one tells you the need, the other tells you the
              language. And if you want the quick version first, the{' '}
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
              on the home page gives a compatibility score from names and birth dates.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-8 mb-3">
              Mulank 2: Personality, Love Life and Compatibility
            </h3>
            <p>
              Ruled by the Moon, the mulank 2 personality comes across as gentle, sensitive and
              diplomatic — 2s listen well, keep the peace and stay loyal to their friends, but
              they feel things deeply and would rather avoid a fight than win one. In love, a
              mulank 2 love life runs on reassurance and closeness: 2s are caring and emotional,
              and they do best with a partner who is steady and openly affectionate. For
              matching, mulank 2 compatibility is traditionally strongest with 1, 2 and 7 —
              numbers that steady the 2&apos;s softness without dulling it. Sevens follow a
              similar pattern: mulank 7 compatibility is traditionally strongest with 1, 2 and
              5. Nines love differently again — a mulank 9 love life is generous and devoted,
              driven by shared values, though 9s can give so much they forget their own needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-8 mb-4">
              Bhagyank and Destiny Number
            </h2>
            <p>
              &ldquo;Bhagya&rdquo; means destiny, and in Indian numerology the destiny number
              goes by that name: bhagyank. The bhagyank calculation runs the same sum as the life
              path number — add all the digits of your birth date and reduce to one digit — and
              a destiny number calculator does exactly that sum. When people look for the destiny
              number meaning, what they are really after is a sense of direction — while the
              mulank, from the day, describes your nature, the destiny number, from the full
              date, describes where your life is heading: the work, the relationships and the
              lessons that keep finding you. That is the question behind what is destiny number
              in numerology — where the road leads. A numerology destiny number reading uses the
              same digits as the life path number, so it always lands on the same digit — the
              Western and Indian systems are reading one birth date, not two.
            </p>
            <p className="mt-3">
              How to calculate destiny number? Add the digits of your full birth date and reduce
              to a single digit — the tool above shows it step by step. Anyone asking how to find
              destiny number only needs one birth date: it gives you both numbers at once. A
              destiny number 9 is the most talked-about of the set — the humanitarian path, built
              on service, compassion and finishing what others start — and a destiny number 2 is
              the path of cooperation and partnership, a life built through relationships.
              Bhagyank 9 is the Indian name for that same 9, and bhagyank 9 wale log — people
              with bhagyank 9 — are said to be compassionate, generous and drawn to helping
              others, sometimes at their own expense. If you want a human read on all three
              numbers together, a life path number numerologist can look at your life path
              number, mulank and destiny number as one chart — the tool above gives you the
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
              page gives the full reading, including your lucky numbers.
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
