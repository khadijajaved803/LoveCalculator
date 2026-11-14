import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { FAQSection, FAQItem } from '../components/FAQSection';
import { LoveLanguageTool } from '../components/LoveLanguageTool';
import loveLanguageFiveImage from '../assets/images/love-language-test-five-languages.webp';
import loveLanguageTeaImage from '../assets/images/love-language-test-quiet-moment-tea.webp';
import {
  Heart,
  Sparkles,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Printer,
  Compass,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LoveLanguagePage: React.FC<Props> = ({ onNavigate }) => {
  const faqs: FAQItem[] = [
    {
      question: 'What are the 5 love languages?',
      answer:
        'Words of affirmation, acts of service, receiving gifts, quality time and physical touch — the five from The 5 Love Languages by Gary Chapman. That is the full list, and the guide below explains each one with examples.',
    },
    {
      question: 'What is love language?',
      answer:
        'The way you most want to be loved — and the way you most naturally show love back. Take the test above and you will have your answer in about five minutes.',
    },
    {
      question: "What's my love language quiz?",
      answer:
        "This page. What's my love language quiz, what's my love language free, and what is ur love language are the same search — take the test above, free, with free results and no sign-up.",
    },
    {
      question: 'Is this the official love languages quiz?',
      answer:
        'No. The official love languages quiz is the paid quiz on the book’s own site. This is a free love language quiz based on the same five languages, with free results on the page.',
    },
    {
      question: 'How do I take the five love languages test for couples?',
      answer:
        'Take the test, then ask your partner to take it too, and compare your charts. The five love languages test for couples is the same test, taken twice — the comparison is the point.',
    },
    {
      question: 'Can children take the love language test?',
      answer:
        'Yes, with a parent. The children’s love language quiz is the parent-guided version — the parent reads, the child picks, and the result starts a conversation.',
    },
    {
      question: 'Is communication a love language?',
      answer:
        'Is communication a love language is a question people ask when words of affirmation is not quite their result. Communication is the skill that carries every language — saying what you need, in the language your partner hears. It is not a sixth language on this test; it is how the five get spoken.',
    },
    {
      question: 'Is it possible to not have a love language?',
      answer:
        'Is it possible to not have a love language is a fair question — everyone has preferences, but some people score nearly level across all five, and that is a result too: it means you feel loved in many ways, and the top one is only slightly ahead.',
    },
    {
      question: 'What is the best love language test?',
      answer:
        'The best love language test is the one you finish and use. The best free love language test is this one if you want free results in five minutes — and the test that matters most is the conversation it starts afterwards.',
    },
    {
      question: 'What does "we\'ll figure it out together is a love language" mean?',
      answer:
        '"We ll figure it out together is a love language" is a phrase people share online — it means showing up for the hard part together, which is acts of service and quality time at once. It is not a sixth language; it is two of the five, working together.',
    },
    {
      question: 'Is being mean a love language?',
      answer:
        'Is being mean a love language is a joke people make about teasing — teasing between people who trust each other can feel like words of affirmation, but only when both people enjoy it. If it hurts, it is not a love language.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <SEOHead
        title="Love Language Test | Free 5 Love Languages Quiz with Results"
        description="Take the free love language test — the 5 love languages quiz with free results. Discover your love language and your partner's, for couples, teens and children."
        canonicalPath="/love-language-test/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Love Language Test', href: '/love-language-test/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* ─── Hero Section with Interactive Quiz Tool ─── */}
        <section className="mb-14">
          <LoveLanguageTool />
        </section>

        {/* ─── Comprehensive Guide Copy ─── */}
        <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-3xl shadow-xs border border-slate-100">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>The 5 Love Languages Assessment & Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            Love Language Test
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            Take the free love language quiz above and find your love language in about five minutes, with free results — no sign-up, no email.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            This love language test tells you how you most want to be loved — and, if you take it with a partner, how they most want to be loved too. Just as our{' '}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              love calculator
            </a>{' '}
            measures chemistry between two names, this test measures something quieter: the way love actually lands for you. It is free, it takes about five minutes, and your result appears on the page the moment you finish. Couples can each answer and compare charts; teenagers get a shorter set of questions; and parents can sit with a younger child and work through the parent-guided version together.
          </p>

          <hr className="my-8 border-slate-100" />

          {/* ─── Section: What Is Love Language? ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-8 mb-4">
            What Is Love Language?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Most people first hear the phrase from a friend and look up what is love language before they ever take a test. The idea is easy to hold in one sentence: two people can love each other deeply and still keep missing each other, because one of them shows love with words while the other only feels it when something gets done. Your own language is the channel love has to travel through before it reaches you — the one way of being loved that lands hardest, while the others feel pleasant but faint.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            In a relationship, the idea earns its keep when two people compare results. One partner's top language might be words; the other's might be acts of service. Neither is wrong — they are different channels, and knowing that stops a lot of arguments that were never really about the dishes or the unanswered text. People often ask what does love language mean once they have a result in hand; in practice, it means the one way of being loved that you notice first and miss most. Take the test, get your top language, and the rest of the page shows you what to do with it.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The answer is both. You give love in one language and receive it in another — most people do. You might fill a partner's day with small favours without thinking, yet feel most loved when they sit and talk with you properly. The test scores the receiving side, because that is the half your partner needs to know. The giving side is the language you offer without thinking, and it is usually the first clue to what you hope to receive.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Each language is a habit, not a{' '}
            <a
              href="/love-horoscope/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/love-horoscope/');
              }}
              className="text-rose-600 hover:underline font-semibold"
            >
              horoscope
            </a>
            {' '}— something you do without thinking, and something you wait for without realising it. If you are wondering how to know your love language without a test, notice three things: what you ask for most, what hurts most when it is missing, and what you do for the people you love without being asked. Those three clues usually point at the same language. The test does that noticing for you in about five minutes, and reading someone else's language works the same way — watch what they complain about, watch what they do for you, and ask them to take the test too.
          </p>

          <figure className="my-8">
            <img
              src={loveLanguageFiveImage}
              alt="Illustration of the five love languages: a gift, a helping hand, shared time, a kind gesture and an embrace"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              The five love languages, side by side — words, service, gifts, time and touch.
            </figcaption>
          </figure>

          {/* ─── Section: What Are the 5 Love Languages? ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            What Are the 5 Love Languages?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            They come from Gary Chapman's book <em>The 5 Love Languages</em>: words of affirmation, acts of service, receiving gifts, quality time and physical touch. Most people recognise their own within seconds of reading the names — the one that makes them think "yes, that one" is usually the answer. If you arrived here asking what are the 5 love languages, those five names are the whole answer, and the test tells you which one leads for you. It ranks all five rather than naming only one, because a close second often matters as much as the winner. The five names double as the 5 love languages categories the test scores — one score per language, shown on your chart.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The book came first and the test came from it. The five names come from the 5 love languages by Gary Chapman, and the test on this page scores them in five groups, one per language. The book itself is not on this page: some people arrive looking for a 5 love languages pdf of it, and there is none here. If you want to read it properly, buy it or borrow it from a library; if you want to know your language, the test above is the free way in.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The 5 love languages quiz on this page is the short forced-choice version: each question gives you two ways of being loved and asks which fits better, and your answers build a score for each of the five. A quiz for five love languages only works if it scores all five, and this one does. It costs nothing and asks for nothing — no sign-up, no email, and the result stays on the page. Finish it and your 5 love languages quiz free results are waiting on the same page: a chart, your top language, and one thing to ask your partner for this week. Search results will offer you a love languages quiz free with results, a paid one and a dozen in between; this one is the free kind, and the test that matters most is the conversation it starts afterwards.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The official love languages quiz lives on the book's own site and charges for it — this is not it, and it does not pretend to be. This test is built on the same five languages and the same kind of forced-choice questions, but it is free and it lives here. If the official badge matters to you, take the paid one; if you want your answer in five minutes, this one will do. Either way, the names and the idea come from Chapman, and the guide names him as the source.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A counsellor would call this a love language assessment — a short set of questions, a score for each language, and a result you can act on. That is all the test on this page is: answer, score, result, and one concrete thing to ask for this week.
          </p>

          {/* ─── The 5 Love Languages, One by One ─── */}
          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-4">
            The 5 Love Languages, One by One
          </h3>

          <div className="space-y-4 my-6">
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
              <h4 className="text-base font-bold text-rose-900 mb-1">
                1. Words of Affirmation
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed m-0">
                Some people need to hear it. "I love you", "I am proud of you", "thank you for sorting that" — said out loud, in a text in the middle of the day, or on a note tucked into a lunchbox. People whose top result is love language words of affirmation usually know it before the test finishes: they keep choosing the answer with the compliment in it. For this language, silence reads as distance, and a compliment said in front of other people counts double.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
              <h4 className="text-base font-bold text-amber-900 mb-1">
                2. Acts of Service
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed m-0">
                Coffee made before your partner wakes up. The thing that has been broken for a month, finally fixed. A chore taken off their list without being asked. The acts of service love language examples that land best are rarely grand — they are the small jobs done before anyone asks, and on a busy week they shrink to the smallest version of themselves: the dishwasher emptied, the car filled, the call made that your partner was dreading.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
              <h4 className="text-base font-bold text-purple-900 mb-1">
                3. Receiving Gifts
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed m-0">
                Receiving gifts is the language of the thought made visible: not the price, the noticing. A gift here is a small thing that says "I saw this and thought of you" — a snack from the shop, a flower from the garden, a book you mentioned once. It is the most misunderstood of the five, because it looks material; it is not about money, it is about being remembered.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
              <h4 className="text-base font-bold text-sky-900 mb-1">
                4. Quality Time
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed m-0">
                This one is about undivided attention, not hours on a clock. A walk with no phone, a meal with no television, an hour that belongs to the two of you. The quality time 5 love languages result surprises people who think they want more hours together — what they usually want is fewer distractions inside the hours they already have. Ten minutes of real listening beats a whole evening in the same room on different phones.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
              <h4 className="text-base font-bold text-pink-900 mb-1">
                5. Physical Touch
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed m-0">
                Physical touch is the language of closeness: a hand held, a hug on the way in the door, a shoulder touched as you pass. For some people, touch is the first proof of love and its absence is the first sign something is wrong; for others it matters less, and that is why the test ranks all five instead of naming only one.
              </p>
            </div>
          </div>

          {/* ─── The Love Language Chart ─── */}
          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-4">
            The Love Language Chart
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Your result comes back as a love language chart: five bars, one per language, tallest first. The order matters more than any single score — and the gap between first and second matters too, because plenty of people have two languages running nearly level. Read the top two together and you usually get a fuller picture than the winner alone.
          </p>

          {/* ─── Are There 10 or 18 Love Languages? ─── */}
          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-4">
            Are There 10 or 18 Love Languages?
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            You may have seen claims of 10 love languages, or an 18 love languages list, from writers who split the five into smaller pieces — quality time into "time together" and "shared activities", say, or physical touch into "touch" and "presence". Chapman named five, and the test on this page scores five, because those are the five the book and the quiz behind it use. If your result feels incomplete, read your two closest languages together — that is usually where the extra language you were looking for already lives. The number of languages is not what matters; the top one on your chart, and what you do with it this week, is.
          </p>

          {/* ─── Section: Love Languages Examples ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Love Languages Examples — What Each One Looks Like
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The love languages examples below are deliberately ordinary — a school run, a text, a hand held — because ordinary days are where a language shows up. Words: a partner who says "I noticed what you did today, thank you." Service: a partner who does the school run so you can sleep. Gifts: the snack you like, brought home without being asked. Time: a phone put away at dinner. Touch: a hand reached for first. The side you give without thinking is usually the same side you want to receive. The five work the same way for men, for friends and for single people — a friend who shows up is speaking service, a friend who texts first is speaking words — and knowing yours before a relationship starts is the best time to learn it.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            After the test, most people say the same sentence — "my love language is quality time" — and then wonder what is your love language meaning in practice. The practical answer is one small request: ask your partner for the thing your top language names, this week. Two different top languages in a couple is the normal case, not a mismatch, and the couples version exists so you can see both charts side by side. Love languages and star signs are two different systems, and this page does not hand you a language based on your birthday. If you want the zodiac side, the{' '}
            <a
              href="/zodiac-signs/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/zodiac-signs/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              zodiac signs
            </a>{' '}
            page has your sign; your love language comes from the test, not from your birthday. You can also explore Vedic insight with our{' '}
            <a
              href="/birth-chart-calculator/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/birth-chart-calculator/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              birth chart calculator
            </a>
            ,{' '}
            <a
              href="/kundali/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/kundali/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              kundali
            </a>{' '}
            and{' '}
            <a
              href="/kundali-matching/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/kundali-matching/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              kundali matching
            </a>{' '}
            tools, explore South Indian matching with{' '}
            <a
              href="/porutham/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/porutham/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              thirumana porutham
            </a>
            , or read your daily{' '}
            <a
              href="/rashifal-today/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/rashifal-today/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              rashifal today
            </a>{' '}
            guidance.
          </p>

          <figure className="my-8">
            <img
              src={loveLanguageTeaImage}
              alt="A couple sharing a quiet moment over tea after taking the love language test"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              Quality time can be as small as a cup of tea together, with nowhere else to be.
            </figcaption>
          </figure>

          {/* ─── Section: How to Know Your Love Language ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            How to Know Your Love Language
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Three questions answer how to know your love language without taking the test at all: what do you ask your partner for most often? What hurts most when it is missing? What do you do for the people you love without thinking? If you ask for words, miss words and give words, that is your language. The test is the short version of the same noticing — each question makes you choose between two ways of being loved, and the pattern of your choices is your result. Your scores come back top first, then the other four in order, so you can see the whole shape of it, not just the winner.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            This one is already the short version — fewer questions, the same five languages, about five minutes, and it still scores all five. If you want a longer check, take it again with your partner and compare the two charts: the comparison is where the useful conversation starts. For{' '}
            <a
              href="/life-path-calculator/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/life-path-calculator/');
              }}
              className="text-rose-600 hover:underline font-semibold"
            >
              number-based insights
            </a>
            {' '}, check out our{' '}
            <a
              href="/numerology-calculator/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/numerology-calculator/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              numerology calculator
            </a>{' '}
            tools or calculate your compatibility via{' '}
            <a
              href="/love-calculator-by-date-of-birth/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/love-calculator-by-date-of-birth/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              love calculator by date of birth
            </a>{' '}
            and read our in-depth article on{' '}
            <a
              href="/blog/love-compatibility-by-date-of-birth/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blog/love-compatibility-by-date-of-birth/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              love compatibility by date of birth
            </a>.
          </p>

          {/* ─── Section: The Test for Couples, Teens and Children ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            The Test for Couples, Teens and Children
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The five love languages test for couples works best when you take it together and talk about one difference at a time — "your top language is acts of service and mine is words of affirmation, so what is one thing I can do this week, and one thing I can say?" You each answer, then look at both charts side by side. If you are{' '}
            <a
              href="/love-compatibility-by-zodiac-sign/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/love-compatibility-by-zodiac-sign/');
              }}
              className="text-rose-600 hover:underline font-semibold"
            >
              comparing your chemistry as a couple
            </a>
            {' '}, pair this with our{' '}
            <a
              href="/name-compatibility/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/name-compatibility/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              name compatibility
            </a>{' '}
            tool and explore western{' '}
            <a
              href="/astrology/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/astrology/');
              }}
              className="text-rose-600 font-semibold hover:underline"
            >
              astrology
            </a>{' '}
            insights. If the question is when the wedding itself will happen, see our{' '}
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

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Teenagers get a shorter set with simpler wording — the love language quiz for teens covers the same five languages with fewer questions. The love language test for teens is the one to hand a teenager who has outgrown the children's version but finds the adult wording heavy. For younger children, the children's love language quiz is done with a parent: the parent reads the questions, the child picks, and the result is a starting point for a conversation, not a label. Adults take the main version.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Languages show up at work too — a colleague who likes to be thanked with words, another who would rather you took a task off their plate. Noticing that is the useful version of the test at work, and the giving side is the one that counts there. Cards with one language each make a decent game for a family evening, and writing your result down with one action per language turns it into a worksheet you can actually use. The printable result from this test is the simplest version of that: your chart, your top language, and one thing to do this week.
          </p>

          {/* ─── Section: Printable, PDF and Free Results ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Printable, PDF and Free Results
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            If you arrived looking for a love language quiz pdf, there is no file to download here — the test lives on this page, and it is free. People also search for a love language test pdf when they want the questions on paper; the questions stay on the page, but your answers and your chart print out fine. Finish the test, press print, and you have your chart and your top language on paper — ready to stick on the fridge or hand to your partner. What prints is, in effect, the 5 love languages quiz free printable version: your chart, your top language, and one thing to do this week. This page does not sell a PDF of the book, and it does not pretend the test is a PDF file.
          </p>
        </article>

        {/* ─── FAQs ─── */}
        <FAQSection faqs={faqs} title="Frequently Asked Questions About Love Languages" />

        {/* ─── Related Tools ─── */}
        <RelatedTools currentToolId="love-language-test" onNavigate={onNavigate} />
      </div>
    </div>
  );
};
