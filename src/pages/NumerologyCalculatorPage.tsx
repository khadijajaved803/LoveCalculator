import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { FAQSection, FAQItem } from '../components/FAQSection';
import { NumerologyCalculatorTool } from '../components/NumerologyCalculatorTool';
import numerologyNumbersGrid from '../assets/images/numerology-calculator-numbers-grid.webp';
import numerologyLifePathJourney from '../assets/images/numerology-calculator-life-path-journey.webp';
import {
  Hash,
  Sparkles,
  Layers,
  Phone,
  Car,
  Briefcase,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const NumerologyCalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs: FAQItem[] = [
    {
      question: 'What is the best numerology calculator?',
      answer:
        'The best numerology calculator is the one that shows both systems and explains its working — this page’s tool shows Chaldean and Pythagorean side by side, with the charts above, so you can check it.',
    },
    {
      question: 'Is this numerology calculator free?',
      answer:
        'Yes. A free numerology calculator is this page’s tool: free, online, with free results on the page and no sign-up. A numerology calculator online search and a free numerology calculator search both land here, on the same free tool.',
    },
    {
      question: 'What is the difference between Chaldean and Pythagorean numerology?',
      answer:
        'Chaldean numerology gives letters values from 1 to 8 by sound and leaves 9 out; Pythagorean numerology gives letters values from 1 to 9 in alphabet order. A chaldean and pythagorean numerology calculator shows both, and this page’s tool does exactly that.',
    },
    {
      question: 'What is my lucky number?',
      answer:
        'Use the calculator above: enter your date of birth, and it gives you your lucky number, your fortune number and your chart. How to know your lucky number, how to find your lucky number and how to check your lucky number are all answered by the same tool.',
    },
    {
      question: 'What is my lucky number by date of birth?',
      answer:
        'The same tool, in its date-of-birth mode: lucky number by date of birth is the number your birth date adds up to, and the calculator gives it with the full chart.',
    },
    {
      question: 'What is my lucky number by name?',
      answer:
        'Lucky number by name is the number your name adds up to, in the calculator’s name mode — and the numerology calculator name and date of birth mode gives you both at once.',
    },
    {
      question: 'Can the calculator check my mobile number?',
      answer:
        'Yes — the mobile mode adds up your number and compares it with your date-of-birth number. Show my lucky mobile number is the request, and the tool answers it; find lucky mobile number by date of birth is the matching version, and the tool answers that too.',
    },
    {
      question: 'Can it check my vehicle number?',
      answer:
        'Yes — the vehicle mode works the same way for a car, bike or any vehicle number plate, and it flags the unlucky vehicle numbers as clashes, not as warnings.',
    },
    {
      question: 'What is a fortune number?',
      answer:
        'A fortune number is the number of your whole chart — name and date of birth together — read as your overall direction, while your lucky number is the number of the day.',
    },
    {
      question: 'Is 9 a lucky number?',
      answer:
        '9 is a lucky number in Pythagorean numerology, where it means completion and kindness — and in Chaldean numerology 9 is sacred and is not given to letters, so the two systems answer this question differently, and this page says so plainly.',
    },
    {
      question: 'What are unlucky numbers?',
      answer:
        'Unlucky numbers are the numbers that clash with your main number in the traditional reading. They are meanings, not warnings — nothing on this page claims a number will harm you.',
    },
    {
      question: 'Does numerology predict the future?',
      answer:
        'No. Numerology predictions by date of birth describe tendencies and affinities — which numbers suit you, which clash — not events. This page presents them that way throughout.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <SEOHead
        title="Numerology Calculator | Free Chaldean & Pythagorean Calculator by Name and Date of Birth"
        description="Use the free numerology calculator to find your lucky number, fortune number and numerology chart by date of birth and name — Chaldean and Pythagorean, mobile and vehicle numbers included."
        canonicalPath="/numerology-calculator/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Numerology', href: '/numerology/' },
            { label: 'Numerology Calculator', href: '/numerology-calculator/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* ─── Hero Section with Interactive Calculator Tool ─── */}
        <section className="mb-14">
          <NumerologyCalculatorTool />
        </section>

        {/* ─── Comprehensive Guide Copy ─── */}
        <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-3xl shadow-xs border border-slate-100">
          <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Hash className="w-4 h-4 text-purple-600" />
            <span>Chaldean & Pythagorean Numerology Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            Numerology Calculator
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            Use the free numerology calculator above and find your numbers in under a minute — your lucky number, your fortune number and your numerology chart, by name and date of birth.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Behind every result on this page sits a very old idea: a name or a date of birth can be turned into numbers, and each number from 1 to 9 carries a meaning of its own. The tool above does the turning for you — use the numerology calculator online, free, with your result on the page the moment you finish and nothing to sign up for. It is a free numerology calculator in the plainest sense: no account, no email, no payment, and the result appears on the page, not in your inbox. Alongside our{' '}
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              love calculator
            </button>{' '}
            and the newly added{' '}
            <button
              type="button"
              onClick={() => onNavigate('/love-language-test/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              love language test
            </button>, this calculator covers the personal side of the site: not how two people match, but what your own numbers say. Start with the date of birth if that is all you have — the numerology calculator by date of birth mode needs only the day, month and year — or with the name alone, in the numerology calculator name mode. When you have both, use them together, because the numerology calculator name and date of birth mode gives you both at once, and that combined reading is the fullest one this page gives.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            People arrive here from all kinds of searches, and they all land on the same tool. Some come with a date of birth and want one number; others come with a name and want to know what it adds up to; plenty come with a phone number or a number plate they are curious about. Whatever you typed to get here, the way in is the same: enter a name, enter a date of birth, and the calculator does the adding. If you are comparing tools, the best numerology calculator is the one that shows both systems and lets you check the adding yourself — and that is how this page is built: two systems side by side, the tables visible, and every result explained beside the number.
          </p>

          <hr className="my-8 border-slate-100" />

          {/* ─── Section: What Is a Numerology Calculator? ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-8 mb-4">
            What Is a Numerology Calculator?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The obvious question is how does a numerology calculator work, and the answer is less mysterious than the name suggests: every letter gets a value from the table you have picked, the values are added, and the total is reduced by adding its digits together until one number is left. A date works the same way — the day, month and year are added and reduced to one number — and that is the whole method. The tool above does the adding for you, while this guide explains what the numbers are said to mean once you have them. If you are new to the subject, the wider{' '}
            <button
              type="button"
              onClick={() => onNavigate('/numerology/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              numerology
            </button>{' '}
            hub is the place to start, and this page is the calculator that belongs to it.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            One date can be entered in several ways, and the tool accepts all of them: the full date, or just the day and month if that is what you have. A name works on letters instead of digits, and the combined mode runs the numerology date of birth and name together — both inputs, one chart — which is why it gives the fullest reading. Adding your birth time doesn&apos;t change the main number; it adds detail to the chart underneath, and that is what the numerology calculator by date of birth and time mode is for.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Names carry more than one number, because a name has both a sound and a spelling — and the two systems on this page read those two things differently. The Chaldean table listens to the sound; the Pythagorean table follows the alphabet. Run your name through both and you get two readings of the same name, which is the point of showing them side by side: not to pick a winner, but to let you see where they agree and where they part.
          </p>

          <figure className="my-8">
            <img
              src={numerologyNumbersGrid}
              alt="Glowing number grid on a dark indigo background, illustrating the number tables a numerology calculator uses to turn letters and dates into numbers"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              The number tables behind the calculator: every letter and date is reduced to a single number from 1 to 9.
            </figcaption>
          </figure>

          {/* ─── Section: Chaldean Numerology ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Chaldean Numerology
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The oldest system on this page grew up in Babylon, and it still does things its own way. In chaldean numerology, a letter&apos;s value comes from how it sounds, not from where it sits in the alphabet — so two letters that sound alike can carry the same value, and the order of the alphabet matters less than the sound of the name. That sound-first habit is also why this system is the one most people in India ask for first: it grew out of the same tradition as Vedic astrology, and it reads a name the way that tradition reads it.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The values live in a table, and that table is worth seeing: a chaldean numerology chart lists each letter beside its value from 1 to 8, and the tool above uses exactly that table when you pick the Chaldean side. The chaldean method is easy to describe and slow to do by hand — look each letter up, add the values, reduce the total — which is the honest reason the calculator exists. One habit makes it fiddly: compound numbers such as 11 and 22 are read for their own meaning first, before any reducing happens, because in this tradition a double number carries its own message. If you want to check the tool&apos;s working, the chaldean chart is the place to look — every letter, its value, and nothing hidden.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Nine has no place in that table. In this system the number is treated as sacred and kept apart, which is why a name worked out under Chaldean rules can come out differently from the same name under Pythagorean rules — the two tables simply don&apos;t agree about 9. The values a name is built from run from 1 to 8, and those chaldean numerology numbers are the whole range the system works with — the chaldean numbers run 1 to 8, and everything past that is built by adding them and reducing the result.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Some numbers are said to get on well together and some to clash, and that pairing is what the chaldean numerology friendly numbers list describes — the tool shows it beside your result, so you can see at a glance which numbers suit your own and which ones clash. Run a name through a chaldean numerology calculator and through the Pythagorean side, and the two totals can disagree; that disagreement is the point of showing both, not a fault in either. A chaldean calculator on its own gives you the sound-based answer, while a chaldean and pythagorean numerology calculator gives you both answers at once, so the comparison is visible instead of guessed.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Cheiro, the famous palmist and numerologist, popularised this system in the English-speaking world, so a search for a cheiro numerology calculator is looking for the Chaldean tool under its older name. Days and years get numbers too in this tradition — which is why you will see references to a chaldean calendar — not a wall calendar, but the same number-giving habit applied to dates.
          </p>

          {/* ─── Section: Pythagorean Numerology ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Pythagorean Numerology
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The other system on this page is the simpler one to learn. It runs through the alphabet in order: A is 1, B is 2, C is 3, and so on through to I is 9, then J starts again at 1. That table is what a pythagorean numerology calculator uses, and a pythagorean numerology chart shows it written out in full — every letter, its value, and no exceptions to remember.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Put the two tables together and the difference is easy to see: one values letters by sound and stops at 8, the other values them by alphabet order and runs to 9. Neither is &quot;the correct one&quot; — they are two traditions, and this page presents both without picking a winner. That side-by-side comparison is what people mean when they search numerology chaldean and pythagorean — two tables, one name, and the differences laid out where you can see them. The tool above lets you run your name through both, so you can see both results and decide which one feels right.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Some Pythagorean readings lay the numbers out as a pyramid, stacking them by date of birth — a pyramid numerology calculator is a tool built around that shape, and this page&apos;s calculator doesn&apos;t use it. It works with the two letter tables and the chart of your numbers instead, so if you were looking for the pyramid layout, what you will find here is the same numbers arranged as a chart, not as a pyramid.
          </p>

          {/* ─── Section: Vedic Numerology and Other Systems ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Vedic Numerology and Other Systems
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            In the Vedic tradition, the birth date carries the weight and the name is read alongside it — that is the approach a vedic numerology calculator follows, and it sits close to the Chaldean side of this page because both grew out of the same Indian tradition. It is the system many people mean when they ask for numerology in Tamil or Hindi, and a search for a numerology calculator tamil is asking for the same working with the explanation in Tamil — the numbers don&apos;t change, only the language around them does.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Other systems turn up in smaller searches and get a brief, honest answer here. Hebrew numerology reads letters by their Hebrew values. Chinese numerology reads numbers by their sound in Chinese, which is why 8 is favoured and 4 is avoided there. Occult numerology is the older Western name for the same study. None of these is a separate tool on this page: the calculator above is Chaldean and Pythagorean, and this section names them so that a search for them finds an honest answer instead of a wrong tool.
          </p>

          {/* ─── Section: Your Lucky Number ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Your Lucky Number
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Most people come here for one thing: the number that belongs to them. Enter a date of birth and the tool gives it to you — the number your birth date adds up to, with the full chart around it. The date is added, the total is reduced digit by digit, and the number it lands on is your lucky number by date of birth — the one the rest of the chart is built around. It is called lucky in the tradition, not because it guarantees anything, but because it is the number the tradition says suits you best.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Most people arrive with one question — what is my lucky number — and the tool answers it in seconds from the date of birth alone. Some arrive with astrology in the question — what is my lucky number astrology — expecting a horoscope; here the answer comes from the numbers, not the planets, and the page says so plainly. When two numbers are on the table, which is the lucky number is decided by the date: whichever number your birth date reduces to is yours.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The practical question is how to find lucky number without doing the adding by hand — and the answer is the tool above: enter the date and it finds the number for you. If you already have a number in mind and want to confirm it, how to check your lucky number works the same way: enter the date, and the tool shows whether that number is the one your date reduces to. And the question behind all of this — how to know your lucky number and what to do with it once you have it — is answered in two halves: the calculator gives you the number, and the meaning written beside each number tells you what the tradition says about it. Type find lucky number into any search box and you&apos;ll get a hundred tools; the difference here is that the result comes with the working shown, so you can follow the adding yourself.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A lucky number calculator that returns only the one number would do for most visitors — this tool returns the number with the whole chart around it, so you can see where it came from. Some people call the same tool a lucky number generator, because it produces a number on demand — but it doesn&apos;t invent one; it derives it from the date and name you enter, and you can follow every step. The name gives a second number as well: your lucky number by name is the total your name reduces to, and the tool shows it in the name mode, beside the date number, so you can compare the two. The name mode is the other half of a numerology lucky number calculator — your name reduced to its number, shown beside the date number so you can compare them.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The result is rarely a single digit. Most charts show a main number and supporting ones, which is why people ask for my lucky numbers in the plural — the tool lists them together, with the main number first. The request is always personal: a lucky number for me is the number that belongs to your date of birth, not a number that suits everyone. Adding the birth time refines the chart underneath without changing that main number — that is what the lucky number by date of birth and time mode is for.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Seven is the number people ask about most: a lucky number 7 result is read as thinking, study and quiet, and if 7 is your number the calculator will say so. One leads and starts: a lucky number 1 result is read as independence, and it is the first number in the table. People also check whether 9 is a lucky number — in the Pythagorean table it means completion and kindness, while in the Chaldean table it is kept apart as sacred, so the two systems can disagree about it. There is no ranking of best lucky numbers that applies to everyone; the number that suits your date is the best one for you, and any list that claims otherwise is selling a certainty the tradition doesn&apos;t offer. The same goes for the idea of a universal lucky number, or a world lucky number: one number lucky for everyone doesn&apos;t exist in this tradition, because the number always comes from a specific date or name.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The other side of the chart is the unlucky numbers: totals that clash with your main number in the traditional reading. Treat them as meanings, not warnings — nothing here claims a number will harm you. In the tradition every weekday carries a number too, and the saturday lucky number is the one people look up most, ahead of Friday, Tuesday and Wednesday.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            You can also explore our Vedic{' '}
            <button
              type="button"
              onClick={() => onNavigate('/birth-chart-calculator/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              birth chart calculator
            </button>
            ,{' '}
            <button
              type="button"
              onClick={() => onNavigate('/kundali/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              kundali
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => onNavigate('/kundali-matching/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              kundali matching
            </button>{' '}
            tools, South Indian{' '}
            <button
              type="button"
              onClick={() => onNavigate('/porutham/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              thirumana porutham
            </button>{' '}
            matching, or explore your sign on our{' '}
            <button
              type="button"
              onClick={() => onNavigate('/zodiac-signs/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              zodiac signs
            </button>{' '}
            and daily{' '}
            <button
              type="button"
              onClick={() => onNavigate('/rashifal-today/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              rashifal today
            </button>{' '}
            pages.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            For couples matching, try our{' '}
            <button
              type="button"
              onClick={() => onNavigate('/love-calculator-by-date-of-birth/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              love calculator by date of birth
            </button>{' '}
            or read the complete guide to{' '}
            <button
              type="button"
              onClick={() => onNavigate('/blog/love-compatibility-by-date-of-birth/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              love compatibility by date of birth
            </button>.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Today&apos;s number is a daily question, and it is worked out the same way as everything else on this page: combine your birth number with today&apos;s date, add, reduce, and read the result. The adding never changes — only the date you feed into it does.
          </p>

          {/* ─── Section: Mobile Number Numerology ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Mobile Number Numerology
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A phone number is a string of digits, and digits are exactly what this system reads — so mobile number numerology is the most practical use of the tool after the date and name. Paste the number into the mobile mode and it adds the digits, reduces them to one number, and reads that number the same way it reads a name — then compares it with your date-of-birth number, so you can see whether the two get on or clash. A mobile number numerology calculator does that adding for you; shortened to a mobile numerology calculator, it is the same mode, and it works for any phone number, not just a mobile — a phone number numerology calculator takes a landline the same way, digit by digit.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Doing it by hand is simple enough to check: how to calculate mobile number numerology comes down to adding every digit, reducing by adding again until one digit is left, and that digit is the number&apos;s number. A shortcut people use is to add only the last 4 digits of mobile number numerology — those are the digits that feel personal, and they are the ones most people remember. The full version goes digit by digit: a lucky mobile number analysis numerology reading looks at the whole number, notes which digits help and which clash, and compares the total with your birth number. The tool that does all of this is a lucky mobile number calculator in the plainest sense — it takes a number and tells you what the tradition says about it.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The request is often phrased as show my lucky mobile number — show me whether my number suits me — and the mobile mode answers it on the page, with the comparison beside it. The matching version starts from the other end: find lucky mobile number by date of birth asks which totals suit your birth number, and the tool answers by comparing the two numbers. People ask for this in Hindi and Tamil too — the digits don&apos;t change, only the language of the explanation does — and the language section below covers those searches.
          </p>

          {/* ─── Section: Vehicle and Car Number Numerology ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Vehicle and Car Number Numerology
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A number plate is a mix of letters and digits, and the tool reads it the same way it reads a name and a date together — letters by their table values, digits by their face value, added and reduced to one number. That is the work a vehicle lucky number calculator does: it takes the plate and returns the total, with the meaning beside it. The car version has its own name in searches — a car number numerology calculator — but it is the same mode, applied to a car&apos;s plate instead of a phone&apos;s digits. What you get back is one number for the plate — in search terms, a numerology lucky car number — and the tool shows it beside your own birth number so you can compare them. A lucky vehicle number, then, is a plate whose total gets on with your birth number — the tool flags the match; it doesn&apos;t tell you to change your plate.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The other side is the unlucky vehicle numbers: totals that clash with your birth number in the traditional reading. They are listed as meanings, not as a reason to change a plate — a number plate is paperwork, not a prediction. A bike&apos;s plate works the same way, digit by digit, and the tool compares it with your birth number just as it does for a car.
          </p>

          {/* ─── Section: Business Numerology ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Business Numerology
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A business name is read the way a person&apos;s name is read: the letters add up, the total is reduced, and the number is read for what it is said to mean for a business — growth, stability, visibility, or caution. That is the work of a business numerology calculator, and the tool&apos;s business mode does it in the same place as the name mode. The Chaldean side is the one most business searches ask for, because it is the system Indian business owners use most often — so pick the Chaldean mode for a business name, and read the business number beside your own, because the pairing matters: if the two get on, the tradition calls them friendly. To explore personal and baby names in depth, visit our dedicated{' '}
            <button
              type="button"
              onClick={() => onNavigate('/numerology/name-numerology/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              name numerology
            </button>{' '}
            calculator.
          </p>

          {/* ─── Section: Fortune Number ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Fortune Number
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Look past the day-to-day number and there is a bigger one underneath. Your fortune number comes from your name and your date of birth together, and the tool gives it as part of the full reading. It is read as your overall direction, where the lucky number is read as the number of the day. Often the two are the same number; when they differ, the fortune number is the one to remember and the lucky number is the one to use. That combined reading is what the numerology calculator name and date of birth mode is for — both inputs, one chart.
          </p>

          <figure className="my-8">
            <img
              src={numerologyLifePathJourney}
              alt="Stepping stones winding through a garden at dusk, symbolising the life path journey behind a numerology reading"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              One number at a time: your chart is a path, not a single step.
            </figcaption>
          </figure>

          {/* ─── Section: Numerology by Language and Place ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Numerology by Language and Place
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Numerology is searched for in many languages, and the calculator is the same in all of them. The numbers don&apos;t change when the language changes — only the words around them do — so a Tamil, Telugu or Hindi search lands on the same tool, explained in the terms those searches use. Indian lucky number, unlucky numbers in India, and the weekday numbers by Indian tradition are covered in the chart section, because the Indian tradition is the one most of this page&apos;s searches come from. Explore our wider{' '}
            <button
              type="button"
              onClick={() => onNavigate('/astrology/')}
              className="text-purple-600 font-semibold hover:underline"
            >
              astrology
            </button>{' '}
            hub for complementary Vedic and Western planetary interpretations.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The two letter tables are worth seeing for themselves: an alphabet numerology calculator shows the alphabet with each letter&apos;s value beside it, and the Chaldean and Pythagorean charts above are exactly that — two tables, side by side, so you can see both.
          </p>

          {/* ─── Section: Your Numerology Chart and Predictions ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Your Numerology Chart and Predictions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The chart is the full picture: your main number, your lucky number, your fortune number, and the supporting numbers that sit alongside them — all drawn from one birth date by a numerology chart by date of birth. It is the part of the result worth reading slowly, because the single numbers only make sense beside each other. The wider question — numerology predictions by date of birth — is answered here too, and the honest answer is that the chart describes tendencies, not events: it says which numbers suit you and which clash, and the rest is up to you.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The tradition also gives numbers to days and months — each weekday carries one, Saturday&apos;s being the one people ask for most — but those are readings in the tradition, not part of the tool&apos;s chart, which is built from your name and date. The part of the result that changes daily is the number for today: combine your birth number with today&apos;s date, add, reduce, and read the result — the same adding as everything else on this page.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Take a date and do it by hand once — say 14 July 1998. Add the digits: 1 + 4 + 0 + 7 + 1 + 9 + 9 + 8 = 39, then 3 + 9 = 12, then 1 + 2 = 3. The number is 3. A name works the same way: give each letter its Chaldean or Pythagorean value, add, and reduce. That is how to calculate lucky number by hand — and the tool above does the same adding, instantly, for any name or date you enter.
          </p>
        </article>

        {/* ─── FAQs ─── */}
        <FAQSection faqs={faqs} title="Frequently Asked Questions About Numerology" />

        {/* ─── Related Tools ─── */}
        <RelatedTools currentToolId="numerology-calculator" onNavigate={onNavigate} />
      </div>
    </div>
  );
};
