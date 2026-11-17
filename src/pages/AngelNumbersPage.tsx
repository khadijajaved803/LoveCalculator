import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { FAQSection, FAQItem } from '../components/FAQSection';
import { AngelNumbersTool } from '../components/AngelNumbersTool';
import { REPEATED_MEANINGS } from '../lib/angelNumbersEngine';
import angelNumbersSky from '../assets/images/angel-numbers-sky.webp';
import angelNumbersLoveSky from '../assets/images/angel-numbers-love-sky.webp';
import {
  Sparkles,
  Hash,
  Heart,
  Clock,
  Sun,
  Eye,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

const MEANING_ORDER = [
  '111',
  '222',
  '333',
  '444',
  '555',
  '666',
  '777',
  '888',
  '999',
  '000',
  '11:11',
  '1212',
];

export const AngelNumbersPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs: FAQItem[] = [
    {
      question: 'What is my angel number?',
      answer:
        'Enter your date of birth in the calculator above and it shows your angel number: the single digit your birth date adds up to, with its meaning beside it. If you keep noticing a repeated number instead — 111, 222 or 11:11 — that number has its own meaning in the guide below.',
    },
    {
      question: 'How do I calculate my angel number?',
      answer:
        'Add all the digits of your full date of birth together, then keep adding the digits of the total until one digit from 1 to 9 is left. Born 29 July 1998: 2 + 9 + 0 + 7 + 1 + 9 + 9 + 8 = 45, then 4 + 5 = 9, so the angel number is 9. The calculator above does the same adding and shows every step.',
    },
    {
      question: 'What does 11:11 mean?',
      answer:
        '11:11 is read as alignment and new beginnings: the moment you look up at the clock and catch it, the tradition says your thoughts and your direction are lining up. It is the most searched angel number there is, and the simplest to explain — you noticed it because you were ready to notice it.',
    },
    {
      question: 'What is the best angel number for love?',
      answer:
        '222 is the one most often called the love number: partnership, balance and two people moving at the same pace. 1111 is the number for a new love arriving, and 777 is the number for a deep connection. Which is "best" depends on the question you are asking — 222 for a relationship finding its footing, 1111 for a new beginning.',
    },
    {
      question: 'Is 666 a bad angel number?',
      answer:
        'No. In the angel number tradition 666 means rebalance, not harm: too much attention on money, worry or appearances, and not enough on what actually matters. It is a nudge to bring your energy back to the people and things you value — not a warning of anything bad.',
    },
    {
      question: 'What is the 2026 angel number?',
      answer:
        'The 2026 angel number is 1: 2 + 0 + 2 + 6 = 10, then 1 + 0 = 1. One is read as new beginnings, so 2026 is read as a year for starting things — a new project, a new relationship, a new direction. A year number is a general reading, not a personal one: your own angel number comes from your date of birth.',
    },
    {
      question: 'Can my angel number change?',
      answer:
        'Your angel number from your date of birth does not change — the digits of your birth date are fixed. The repeated numbers you notice do change: 111 in a month of new beginnings, 555 in a month of change, 222 when a relationship is finding its footing. The birth-date number is yours; the repeated numbers are the moment.',
    },
    {
      question: 'Are angel numbers real?',
      answer:
        'Angel numbers are a popular modern belief, and there is no scientific evidence that a number carries a message. Read them as a prompt for reflection, not as a prediction: noticing 222 while you are thinking about a relationship is a good moment to ask yourself what you want from it. Nothing on this page claims a number will decide anything for you.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': 'Angel Numbers',
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
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <SEOHead
        title="Angel Numbers: Meanings of 111, 222, 333, 11:11 & More"
        description="Angel numbers explained: what 111, 222, 333, 11:11 and 1212 mean, angel numbers for love, and a free calculator to find your angel number by date of birth."
        canonicalPath="/angel-numbers/"
        schemaJson={schemaJson}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Numerology', href: '/numerology/' },
            { label: 'Angel Numbers', href: '/angel-numbers/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* ─── Hero Section with Interactive Calculator Tool ─── */}
        <section className="mb-14">
          <AngelNumbersTool />
        </section>

        {/* ─── Comprehensive Guide Copy ─── */}
        <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-3xl shadow-xs border border-slate-100">
          <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Angel Numbers Guide — Meanings, Love &amp; Calculator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            Angel Numbers
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            Angel numbers are the repeated numbers that keep catching your eye — 11:11 on the clock, 222 on a receipt, 333 on a number plate — and the idea behind them is simple: a number that shows up again and again is worth a second look. Use the free angel number calculator above to find your own number from your date of birth, then read what each number is said to mean below.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The angel numbers meaning is not a prediction and not a warning. It is a traditional reading: each repeated number is given a meaning — new beginnings, partnership, change, completion — and the reading is a prompt to think about what is going on in your life, not a message from somewhere else deciding it for you. This page gives you both halves honestly: the calculator that finds your number, and the number meanings as the tradition reads them, so you can decide for yourself what, if anything, they mean to you.
          </p>

          <figure className="my-8">
            <img
              src={angelNumbersSky}
              alt="Glowing golden angel numbers 111, 222 and 333 shining in a starry indigo night sky over mountains"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              The numbers people notice most — 111, 222 and 333 — glowing in the night sky.
            </figcaption>
          </figure>

          {/* ─── Section: What Are Angel Numbers? ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-8 mb-4">
            What Are Angel Numbers?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            An angel number is a repeated number — usually three or four of the same digit, or a mirrored time like 11:11 — that you notice more than once. People see them on clocks, on receipts, on number plates, on phone numbers and on page numbers. The number itself is ordinary; what makes it an angel number is that you keep noticing it, and the noticing is what the tradition reads.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The idea grew out of numerology, where every number from 1 to 9 carries a meaning, and repeated digits are read as that meaning turned up louder. A single 2 means balance; 222 means balance you cannot miss. That is the whole idea — no hidden code, no secret language, just the same meanings, repeated. The calculator above works on the same principle as our{' '}
            <a
              href="/numerology-calculator/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/numerology-calculator/');
              }}
              className="text-purple-600 font-semibold hover:underline"
            >
              numerology calculator
            </a>{' '}
            and our{' '}
            <a
              href="/life-path-calculator/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/life-path-calculator/');
              }}
              className="text-purple-600 font-semibold hover:underline"
            >
              life path calculator
            </a>{' '}
            — a date of birth added up and reduced to one number — except here the number is read the way the angel number tradition reads it, not the way a numerology chart does.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            There is an honest difference between noticing a number once and seeing a pattern. A clock reads 11:11 twice a day, every day, for everyone — so seeing it once means very little. Seeing it every day for a week, while the same question is on your mind, is the pattern the tradition is talking about. And the reading is never a deadline: no angel number tells you that something will happen on a certain day, and no number on this page is a warning. If a number makes you anxious, that feeling is the useful part — it is telling you what you are worried about, and that is worth more than the number itself.
          </p>

          <hr className="my-8 border-slate-100" />

          {/* ─── Section: How to Calculate Your Angel Number ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            How to Calculate Your Angel Number
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The angel number calculation is simple addition, and it is the same method the calculator above uses. If you searched for how to calculate angel number, the answer is the addition below — to calculate angel number from a birth date, add every digit together, then keep adding the digits of the total until one digit from 1 to 9 is left. That digit is your angel number. To calculate your angel number by hand, take 29 July 1998: 2 + 9 + 0 + 7 + 1 + 9 + 9 + 8 = 45, then 4 + 5 = 9, so the angel number is 9. The tool above shows the same steps, so you can check the adding yourself.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A birth year on its own works the same way, which is why people look up a year they were born in. Take 1977: 1 + 9 + 7 + 7 = 24, then 2 + 4 = 6, so the 1977 angel number is 6 — the angel number 1977 works out to care, home and responsibility, the number of looking after people. An angel number based on birthday is worked out from the full date, not just the year, so the year example is a shortcut, not the full reading: your real number comes from the day, the month and the year together. That is what an angel number birthday calculator does — it takes the whole date and reduces it — and the calculator at the top of this page is exactly that: a free angel number calculator that works from your date of birth, with no sign-up and no payment.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Some tools work from a name instead of a date: an angel number calculator by name turns your letters into numbers and adds those, the same way a numerology name reading does. If that is what you were looking for, the method is the same — letters become numbers, numbers are added and reduced — but this page&apos;s calculator uses your date of birth, because the birth date is the one input everyone has and everyone can check. Either way, what you get back is a starting point, not a verdict: an angel number finder does one job, which is to find the number, and the meaning beside it is the tradition&apos;s reading of that number. And if you want the plainest description of the tool, it is an angel number generator in the honest sense: it generates your number from the date you enter — it derives it, it does not invent one, and the working is shown so you can follow it.
          </p>

          <hr className="my-8 border-slate-100" />

          {/* ─── Section: Angel Number Meanings ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Angel Number Meanings: 111 to 999, 000, 11:11 and 1212
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The number meanings below are the traditional readings — what each repeated number is said to mean, and what it is said to mean in love. Read them as prompts, not as predictions: the number that fits your situation is the one that makes you stop and think, and the rest can wait.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 not-prose">
            {MEANING_ORDER.map((num) => {
              const m = REPEATED_MEANINGS[num];
              return (
                <div
                  key={num}
                  className="rounded-2xl border border-purple-100 bg-purple-50/40 p-5"
                >
                  <div className="text-3xl font-extrabold text-purple-700 font-display">
                    {num}
                  </div>
                  <p className="text-sm font-bold text-slate-900 mt-1">{m.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {m.meaning}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    <span className="font-semibold text-rose-600">In love: </span>
                    {m.love}
                  </p>
                </div>
              );
            })}
          </div>

          <h3 className="text-lg font-bold text-slate-900 font-display mt-8 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Why 11:11 Gets Noticed Most
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Of all the numbers on this page, 11:11 is the one people search for most — and the reason is simple: it is the easiest to catch. A clock shows 11:11 twice a day, and the four identical digits are impossible to miss once you have seen them. The 11:11 meaning in the tradition is alignment and new beginnings: your thoughts and your direction lining up, and a beginning opening. It is also the number with the most folklore around it — make a wish at 11:11 — which is why it spreads: one person tells another, and the next time both of them look at a clock, they look at 11:11. That does not make the reading less useful. If 11:11 keeps catching your eye while the same question is on your mind, the useful question is not what the number means — it is what the question means.
          </p>

          <hr className="my-8 border-slate-100" />

          {/* ─── Section: Angel Numbers for Love ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Angel Numbers for Love
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Angel numbers and love go together in most searches for a reason: the question behind the number is usually about a person. An angel number for love is a repeated number you notice while you are thinking about a relationship — a crush, a partner, a marriage — and an angel number love reading is about that relationship, not about the number in the abstract.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            So what angel number means love? The short answer is 222. The angel number of love, as the tradition reads it, is 222: partnership, balance, and two people moving at the same pace. When people ask what are the angel numbers for love, the answer is a small set, not a long list: the angel numbers of love are 222 for partnership, 1111 for a new love arriving, and 777 for a deep connection. The best angel number for love is 222 if the question is about a relationship finding its footing — and the best angel numbers for love, taken together, are 222, 1111 and 777, each for a different question: 222 for partnership, 1111 for a new beginning, 777 for depth. A love angel number is not a guarantee and not a test — it is a way of naming what you already feel about the relationship, and the number that keeps appearing is usually the one that names it best.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            For a marriage question, the numbers people look for are 222 and 1111 together: 222 for the partnership finding its footing, and 1111 for the new beginning the marriage represents. That is the reading behind an angel number for love marriage — not a date, and not a yes or no, but a way of asking whether the partnership is steady enough to build on. If the question is about marriage in the Vedic tradition rather than a number, our{' '}
            <a
              href="/kundali-matching/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/kundali-matching/');
              }}
              className="text-purple-600 font-semibold hover:underline"
            >
              kundali matching
            </a>{' '}
            tool reads the same question from the birth charts instead of from a number. And if the question is simpler — how compatible are we, right now — our{' '}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="text-purple-600 font-semibold hover:underline"
            >
              love calculator
            </a>{' '}
            answers it from your names, while the number above answers it from your birth date.
          </p>

          <figure className="my-8">
            <img
              src={angelNumbersLoveSky}
              alt="A couple holding hands under a starry sky with glowing angel numbers 222 and 1111 shining among the stars"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              222 and 1111 in the sky — the numbers people look for when the question is about love.
            </figcaption>
          </figure>

          <hr className="my-8 border-slate-100" />

          {/* ─── Section: 2026 Angel Number ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            What Is the 2026 Angel Number?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The 2026 angel number is 1. Add the digits of the year: 2 + 0 + 2 + 6 = 10, then 1 + 0 = 1. One is read as new beginnings — the first step, the new idea, the decision only you can make — so 2026 is read as a year for starting things: a new project, a new relationship, a new direction. That is the whole calculation, and it is worth doing yourself, because the method is the point: any year can be reduced the same way, and the number it lands on is the year&apos;s reading in this tradition.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A year number is a general reading, not a personal one. It describes the year, not you — your own angel number comes from your date of birth, and the two can point in different directions. If 2026 is a 1 year for starting and your own number is a 4, the reading is not a contradiction: the year opens the door, and your number says build it properly once you walk through. Treat the year number as background, and your own number as the foreground.
          </p>

          <hr className="my-8 border-slate-100" />

          {/* ─── Section: What to Do ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            What to Do When You Keep Seeing the Same Number
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The useful response to a repeated number is small and practical. First, notice the moment: what were you thinking about when you saw it? The question on your mind is usually the point — the number is just what caught your attention while you were thinking it. Second, write it down: the number, the date, and the question. A pattern you can see on paper is worth more than a feeling you half-remember. Third, look up the meaning on this page and ask whether it fits the question — not whether it is true, but whether it helps you think about the question more clearly.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            What not to do matters more. Do not chase the number: checking the clock every hour to catch 11:11 turns a noticing into a habit, and a habit into anxiety. Do not treat it as a deadline: no number means something will happen on a certain day, and no reading on this page gives you a date. And do not let a number make a decision for you — especially not a big one, like ending a relationship or quitting a job. If a number keeps appearing and the question behind it is about love, the honest next step is a conversation with the person, not another look at the clock. If the question is about today rather than a number, our{' '}
            <a
              href="/love-horoscope/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/love-horoscope/');
              }}
              className="text-purple-600 font-semibold hover:underline"
            >
              love horoscope
            </a>{' '}
            reads the day the same way this page reads a number — as a prompt, not a prediction.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            One last honest note: the reason a number keeps appearing is often simpler than the reading. You notice 222 because you have started looking for it, and you started looking for it because the question matters to you. That is not a trick and it does not make the noticing meaningless — it means the question is the real thing, and the number did its job by making you stop and ask it.
          </p>
        </article>

        {/* ─── FAQs ─── */}
        <FAQSection faqs={faqs} title="Frequently Asked Questions About Angel Numbers" />

        {/* ─── Related Tools ─── */}
        <RelatedTools currentToolId="angel-numbers" onNavigate={onNavigate} />
      </div>
    </div>
  );
};
