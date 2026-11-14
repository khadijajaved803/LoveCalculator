import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { FAQSection, FAQItem } from '../components/FAQSection';
import { PoruthamTool } from '../components/PoruthamTool';
import poruthamWeddingImage from '../assets/images/porutham-matching-wedding.webp';
import poruthamChartsImage from '../assets/images/porutham-matching-charts.webp';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const PoruthamPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs: FAQItem[] = [
    {
      question: 'What is thirumana porutham?',
      answer:
        'Thirumana porutham is Tamil marriage matching: the comparison of two jathagams (birth charts) on 10 poruthams — Dina, Gana, Mahendra, Sthree Deergha, Yoni, Rasi, Rasi Adhipathi, Vasya, Rajju and Vedha — before a wedding. "Thirumanam" means marriage and "porutham" means matching. Enter both partners\' dates of birth in the tool above and you get the 10-porutham table and the verdict in one report.',
    },
    {
      question: 'How many poruthams are there?',
      answer:
        'There are 10 poruthams in thirumana porutham: Dina, Gana, Mahendra, Sthree Deergha, Yoni, Rasi, Rasi Adhipathi, Vasya, Rajju and Vedha. The table in the "10 Poruthams" section above lists all 10 with what each one checks. A "10 porutham matching table" is that same list, written out from the two charts.',
    },
    {
      question: 'Which porutham is most important for marriage?',
      answer:
        'Rajju Porutham and Vedha Porutham are the most important — both must pass. After those, Dina, Gana, Mahendra and Sthree Deergha are read most carefully. A match with 9 or 10 poruthams and both must-pass poruthams clear is considered excellent; 7 or 8 with Rajju and Vedha clear is considered good.',
    },
    {
      question: 'Can I check porutham by date of birth only?',
      answer:
        'Yes. Choose the "by date of birth" mode. The tool finds each person\'s birth star and rasi from the date of birth and runs the full 10-porutham table. Birth time improves the chart, but the porutham matching itself is calculated from the date of birth (star), so the match still works without it.',
    },
    {
      question: 'Can I check porutham by name only?',
      answer:
        'Yes. Peyar porutham uses the birth star found from the first letter of each name, so it needs nothing but the two names. It is a good quick check; confirm it with the full matching by date of birth when you can.',
    },
    {
      question: 'What is rasi porutham?',
      answer:
        'Rasi porutham is the moon-sign porutham: whether the bride\'s rasi and the groom\'s rasi get along. It is one of the 10 poruthams, and it is always read together with rasi adhipathi porutham, which checks whether the lords of the two rasis are friends.',
    },
    {
      question: 'What is gana porutham?',
      answer:
        'Gana porutham is the temperament porutham: it compares the ganas (Deva, Manushya or Rakshasa) of the two birth stars. Gana porutham meaning in tamil is exactly this — the porutham of the couple\'s natures. Same-gana pairings are considered good; a Deva star with a Rakshasa star is traditionally considered a mismatch.',
    },
    {
      question: 'What if porutham does not match?',
      answer:
        'Read the table, not just the count. If Rajju or Vedha fails, the traditional advice is not to proceed with that match. If another porutham fails but Rajju and Vedha pass, families often take a second opinion from an astrologer — a single failed porutham among the other eight does not automatically cancel a match, and that is a decision for the couple and their families.',
    },
    {
      question: 'Is thirumana porutham free?',
      answer:
        'Yes. The tool on this page is free — no sign-up, no app, no payment. The full 10-porutham table, the count out of 10 and the verdict are all free, online, in Tamil or English.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <SEOHead
        title="Thirumana Porutham | Free Tamil Marriage Matching — 10 Porutham Check"
        description="Check thirumana porutham free online — Tamil marriage matching by date of birth and star, with all 10 poruthams, rasi porutham and jathagam porutham in Tamil."
        canonicalPath="/porutham/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Astrology', href: '/astrology/' },
            { label: 'Thirumana Porutham', href: '/porutham/' },
          ]}
          onNavigate={onNavigate}
        />

        {/* ─── Hero Section with Interactive Calculator Tool ─── */}
        <section className="mb-14">
          <PoruthamTool />
        </section>

        {/* ─── Comprehensive Guide Copy ─── */}
        <article className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-3xl shadow-xs border border-slate-100">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Tamil Marriage Astrology &amp; Jathagam Matching</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            Thirumana Porutham
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            Check thirumana porutham free online. Compare two jathagams for marriage and get your porutham result — by date of birth, by birth star, or by name.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Before a Tamil wedding is fixed, most families run a porutham matching check on the two birth charts — the bride's and the groom's — and read the answer before they read anything else. The tool above runs a porutham online check in seconds: it takes the two stars, runs all 10 poruthams, and shows you which ones match and which do not, with the verdict written plainly. There is nothing to install and nothing to pay for — the whole thing runs on this page, in your browser, and it gives you the same full table an astrologer would work out by hand. Alongside our{' '}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="text-amber-700 font-semibold hover:underline"
            >
              love calculator
            </a>, it is the quickest way to see whether a match is worth taking further, and because it works as a thirumana porutham calculator, you do not need a separate app for it.
          </p>

          <hr className="my-8 border-slate-100" />

          {/* ─── Section: What Is Thirumana Porutham? ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-8 mb-4">
            What Is Thirumana Porutham?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            In Tamil{' '}
            <a
              href="/astrology/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/astrology/');
              }}
              className="text-amber-700 font-semibold hover:underline"
            >
              astrology
            </a>, the moon's place at birth carries the most weight in a marriage reading. Your birth star and your moon sign — the natchathiram and the rasi — are read first, and the match is judged porutham by porutham, not from names or sun signs alone. That is why the report on this page looks the way it does: ten separate checks, each one scored on its own, so you can see exactly where two charts agree. The practice comes out of Tamil jothidam, the Tamil astrological tradition, and it has been the first step before fixing a wedding for generations.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Most people who come to this page ask for the report in Tamil words. Ask for it as thirumana porutham in tamil and you will get the birth-chart matching explained in Tamil, star by star — the jathagam is the birth chart, and the poruthams are read off it, one by one. Families planning a wedding look for a porutham for marriage tamil check before they fix a date, and the tool gives them the ten poruthams in Tamil words. Spelling changes from family to family, and nobody's chart changes with it: the stars are the same whichever way the word is written.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Families have used this matching for generations before fixing a marriage, and today most people run the check online first. It does not decide your marriage for you — it is a traditional guide, and the final decision is always yours. What it gives you is a clear, structured answer: how many of the 10 poruthams match, which ones they are, and whether the two must-pass poruthams — Rajju and Vedha — are clear. The fullest version of the check uses name, date of birth and birth star together, because that gives the tool the complete charts, and that is the default mode of the tool above. For an accurate thirumana porutham in tamil reading, look for all 10 poruthams checked from the correct stars — not a shortcut that checks two or three — which is why the tool shows the full table of 10 every time.
          </p>

          <figure className="my-8">
            <img
              src={poruthamWeddingImage}
              alt="Bride and groom seated under jasmine garlands with brass lamps at a traditional South Indian wedding"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              Porutham matching is read before a Tamil wedding is fixed, so families can see whether the two charts agree.
            </figcaption>
          </figure>

          {/* ─── Section: Porutham by Date of Birth ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Porutham by Date of Birth
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Of the three ways to run the match, the date of birth is the one most families choose. A marriage porutham by date of birth needs only the two dates, and it is the most accurate of the three, because the date fixes the birth star — the nakshatra — exactly, and the star is what the matching is calculated from. Most families choose thirumana porutham by date of birth for the same reason: two dates are usually all anyone has to hand. Add the birth time and the chart gets more precise, because the time fixes the ascendant, but the matching itself works from the dates alone.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Run a thirumana porutham in tamil by date of birth check and the tool finds each person's star and rasi from the date, then runs the 10-porutham table. For a jathaka porutham by date of birth, the tool needs the two dates and nothing else — the stars come from the dates, and the matching follows from the stars. A jathaka porutham for marriage takes the two dates and runs the ten poruthams from them. If you only have the dates, use them: a marriage porutham online check still gives you the full 10-porutham result from the dates alone.
          </p>

          {/* ─── Section: Porutham by Star ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Porutham by Star: Natchathira Porutham and Nakshatra Porutham
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            If you already know both birth stars, you can skip the date of birth entirely. Pick the two stars in the tool and it runs natchathira porutham from them — the star check, and the heart of the whole thing, because five of the ten poruthams are calculated from the stars alone. The star check also goes by its Sanskrit name, nakshatra porutham: pick the two stars and the tool runs the matching from them. When both birth stars are already known, star porutham is the quickest route — no dates needed — and a natchathira porutham for marriage needs nothing more than those two stars. A marriage porutham by star is the fastest way to get the ten-row table when the stars are already known.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The star decides most of the result — Dina, Gana, Yoni, Rajju and Vedha are all calculated from the two stars — but the moon sign has its own say. A rasi porutham for marriage reads the two moon signs against each other, and it is always read together with the lords of those signs, which is the next porutham in the table. Together, the star and the moon sign make up the two halves of the matching: the stars give you the poruthams, the rasi tells you whether the moon signs get along. If your stars match well, most of the score follows, and you can run a rasi porutham online check from the dates in seconds — the tool finds the rasis for you.
          </p>

          {/* ─── Section: Porutham by Name ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Porutham by Name: Peyar Porutham
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            When all you have is two names, the name check is the place to start. Peyar porutham takes the first letter of each name, finds the birth star that letter points to, and runs the matching from those stars. That is why so many people start here: no dates, no charts, just two names typed in. When the birth dates are not to hand, a name porutham is the right first step, and in Tamil the name check is asked for as peyar porutham in tamil. For a wedding match, thirumana peyar porutham asks for the two names and nothing else — the first letters give the stars, and the stars give the poruthams. You may also hear the name check called peru porutham, after the Tamil word peru for name.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Use the name check when you do not know the birth dates, or when you want a quick first look before doing the full matching by date of birth. With names alone the tool can compare stars, not the full planetary positions, so a name-only check is a good starting point — not the whole answer. If the name match looks good, confirm it with the full matching by date of birth when you can. A name porutham for marriage takes two names and returns the ten-row table, so it works as a first check before the full date-of-birth matching. Jodi porutham looks at the pair rather than the individuals — jodi means pair — so the check reads the bride and groom together, as one match. In Sanskrit words, the wedding match is called vivaha porutham, and it runs on the same ten poruthams.
          </p>

          {/* ─── Section: The 10 Poruthams ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            The 10 Poruthams: The Full Matching Table
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A full matching tests 10 poruthams. Below is the 10 porutham matching table families ask for before a wedding — all ten, in the traditional order, with what each one looks at and whether it must match. Read in Tamil, the list is the 10 porutham for marriage in tamil, and an astrologer writing the two charts out by hand would call the result a jathagam kattam porutham in tamil — the matching read off the two jathagam charts. The table below is also the thirumana porutham chart in tamil families ask for: the same ten, with their meanings alongside.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-800 font-semibold">
                <tr>
                  <th className="p-3 text-center">#</th>
                  <th className="p-3">Porutham</th>
                  <th className="p-3">What it checks</th>
                  <th className="p-3 text-center">Must match?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr><td className="p-3 text-center font-bold">1</td><td className="p-3 font-semibold">Dina Porutham</td><td className="p-3">Day-to-day well-being and longevity</td><td className="p-3 text-center text-slate-600">Yes, preferred</td></tr>
                <tr><td className="p-3 text-center font-bold">2</td><td className="p-3 font-semibold">Gana Porutham</td><td className="p-3">Temperament and nature</td><td className="p-3 text-center text-slate-600">Yes, preferred</td></tr>
                <tr><td className="p-3 text-center font-bold">3</td><td className="p-3 font-semibold">Mahendra Porutham</td><td className="p-3">Progeny and long married life</td><td className="p-3 text-center text-slate-600">Yes, preferred</td></tr>
                <tr><td className="p-3 text-center font-bold">4</td><td className="p-3 font-semibold">Sthree Deergha Porutham</td><td className="p-3">The wife's well-being and long life</td><td className="p-3 text-center text-slate-600">Yes, preferred</td></tr>
                <tr><td className="p-3 text-center font-bold">5</td><td className="p-3 font-semibold">Yoni Porutham</td><td className="p-3">Physical compatibility</td><td className="p-3 text-center text-slate-600">Yes, preferred</td></tr>
                <tr><td className="p-3 text-center font-bold">6</td><td className="p-3 font-semibold">Rasi Porutham</td><td className="p-3">Moon-sign compatibility</td><td className="p-3 text-center text-slate-600">Yes, preferred</td></tr>
                <tr><td className="p-3 text-center font-bold">7</td><td className="p-3 font-semibold">Rasi Adhipathi Porutham</td><td className="p-3">Friendship of the moon-sign lords</td><td className="p-3 text-center text-slate-600">Yes, preferred</td></tr>
                <tr><td className="p-3 text-center font-bold">8</td><td className="p-3 font-semibold">Vasya Porutham</td><td className="p-3">Mutual attraction and influence</td><td className="p-3 text-center text-slate-600">Yes, preferred</td></tr>
                <tr className="bg-rose-50/70 font-semibold"><td className="p-3 text-center font-bold text-rose-700">9</td><td className="p-3 text-rose-900 font-bold">Rajju Porutham</td><td className="p-3 text-rose-800">Longevity of the marriage itself</td><td className="p-3 text-center text-rose-700 font-bold">Must pass</td></tr>
                <tr className="bg-rose-50/70 font-semibold"><td className="p-3 text-center font-bold text-rose-700">10</td><td className="p-3 text-rose-900 font-bold">Vedha Porutham</td><td className="p-3 text-rose-800">Obstructions between the stars</td><td className="p-3 text-center text-rose-700 font-bold">Must pass</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The tool above shows your result for each of the 10, so you can see exactly where the match is strong and where it is weak — not just a single count. Rajju and Vedha matter more than the count, which is why the tool flags them separately. A check that only counts matches and hides the table is doing half the job: read the rows, especially the two must-pass ones, before you read the number at the top.
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
            1. Dina Porutham
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Dina porutham looks at day-to-day well-being: whether the stars promise a healthy, steady married life. The stars are counted from the bride's star to the groom's, and certain counts are read as good for daily life together. If this one does not match, the traditional reading is that everyday life together will face more friction — so families treat it as an important porutham, even though it is not one of the two must-pass ones.
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
            2. Gana Porutham
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Gana porutham looks at temperament: whether the two natures get along. Every birth star belongs to one of three ganas — Deva, Manushya or Rakshasa — and the check compares them. A Deva star with a Deva star, or Manushya with Manushya, is read as a good match of natures; a Rakshasa star with a Deva star is traditionally read as a mismatch. If you have ever looked up the gana porutham meaning in tamil, what you were really asking is whether two natures will get along day after day — and that is exactly what this porutham answers. Temperament is what a couple lives with every day, so families weigh this one heavily even though it is not a must-pass porutham on its own.
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
            3. Mahendra Porutham
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Mahendra porutham looks at progeny and a long married life. It is counted from the stars — the groom's star counted from the bride's — and a match here is traditionally read as a sign of children and a lasting marriage. Families who pay attention to this one are asking about the future of the family, not just the couple, which is why it sits near the top of the list when the table is read.
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
            4. Sthree Deergha Porutham
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Sthree deergha porutham looks at the wife's well-being and long life. It is counted from the groom's star counted from the bride's, and a match here is traditionally read as a sign of the wife's health and longevity. If this one does not match, families take it seriously — it is one of the poruthams read carefully even when the overall count is high. You may also see it written as stree deergha porutham.
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
            5. Yoni Porutham
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Yoni porutham looks at physical compatibility. Every birth star has an animal symbol — its yoni — and the check compares the two animals: friendly animals match, hostile ones do not. It is the porutham of closeness and physical harmony between the couple, and it is one of the five the tool calculates from the stars alone.
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
            6. Rasi Porutham
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Rasi porutham looks at moon-sign compatibility: whether the bride's rasi and the groom's rasi get along. The two moon signs are counted from each other, and certain counts are traditionally read as unfavourable — unless the lords of the two rasis are friends, which is where the next porutham comes in. Asked for in Tamil, the moon-sign check is rasi porutham in tamil. For a wedding, a rasi porutham for marriage in tamil check reads the two moon signs against each other and marks the result in the table.
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
            7. Rasi Adhipathi Porutham
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Rasi adhipathi porutham looks at the friendship of the lords of the two moon signs. If the lord of the bride's rasi and the lord of the groom's rasi are friends, the rasi match is read as good even when the raw rasi count is not ideal. It is the porutham that rescues a weak rasi match, which is why it is always read together with rasi porutham, never alone.
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
            8. Vasya Porutham
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Vasya porutham looks at mutual attraction and influence: whether each partner naturally draws the other. The stars are read for whether the couple will influence each other kindly and stay drawn to each other, and a match here is traditionally read as a sign of a close, affectionate marriage.
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
            9. Rajju Porutham
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Rajju porutham looks at the longevity of the marriage itself — and it is one of the two must-pass poruthams. The check looks at five rajju knots, from the feet to the head, to see whether the couple's stars fall in the same knot. If both stars fall in the same rajju, the porutham fails, and the traditional reading is that the marriage itself will not last. That is why some families run a rajju porutham calculator on its own first, before the other nine — a failed Rajju ends the discussion, whatever the count of the other nine. The tool above includes Rajju as row 9 of the same table, flagged as must-pass: a match that fails rajju porutham is not recommended, whatever the other nine say.
          </p>

          <h3 className="text-xl font-bold text-slate-900 font-display mt-8 mb-3">
            10. Vedha Porutham
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Vedha porutham looks for obstructions between the stars — and it is the other must-pass porutham. Certain star pairs are said to obstruct each other, and if the couple's stars are one of those pairs, the porutham fails. A few obstructing pairs have traditional exceptions, but the rule families follow is simple: vedha porutham must pass.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-4">
            Two related checks people ask about are not among the 10 poruthams, and the tool says so plainly. If you came here looking for the nadi porutham meaning in tamil, it belongs to the North Indian system: Nadi is one of the 8 kootas in{' '}
            <a
              href="/kundali-matching/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/kundali-matching/');
              }}
              className="text-amber-700 font-semibold hover:underline"
            >
              kundali matching
            </a>{' '}
            (36 gunas), not one of the 10 Tamil poruthams — see our Kundali Matching page for the Nadi koota. Lagna is the ascendant, fixed by the birth time, and it is used in the full jathagam reading rather than in the 10-porutham table — so a question about lagna porutham in tamil is really a question about the full chart, not about the ten poruthams. Both are real checks; neither belongs in the table above.
          </p>

          <figure className="my-8">
            <img
              src={poruthamChartsImage}
              alt="Two circular horoscope charts side by side, framed by marigold flowers, showing how two birth charts are compared in porutham matching"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              Two birth charts, read porutham by porutham — the stars decide five of the ten, the moon signs decide the rest.
            </figcaption>
          </figure>

          {/* ─── Section: Which Poruthams Matter Most? ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Which Poruthams Matter Most?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Not all 10 poruthams carry the same weight. When families ask which is the important porutham for marriage, the honest answer is that two of them are must-pass, four are read carefully, and four support the verdict — and the table above shows you which is which.
          </p>

          <ul className="text-sm text-slate-700 space-y-2 my-4">
            <li>
              <strong>Must pass, no exceptions in practice:</strong> Rajju Porutham and Vedha Porutham. If either fails, the match is not recommended — the count of the other eight does not rescue it.
            </li>
            <li>
              <strong>Read carefully:</strong> Dina, Gana, Mahendra and Sthree Deergha. A mismatch here is taken seriously, and families often look for a second opinion or a remedy before proceeding.
            </li>
            <li>
              <strong>Support the verdict:</strong> Yoni, Rasi, Rasi Adhipathi and Vasya. These shape how happy and close the marriage will be, and a strong showing here can balance a weak count elsewhere — but only when Rajju and Vedha pass.
            </li>
          </ul>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            As a rough guide, a match with 9 or 10 poruthams and both must-pass poruthams clear is considered excellent; 7 or 8 with Rajju and Vedha clear is considered good; 6 or fewer, or any failure of Rajju or Vedha, is traditionally not recommended. The count is a guide, not a verdict on its own — always read it together with the Rajju and Vedha rows, which is exactly what the tool above shows.
          </p>

          {/* ─── Section: How to Check Porutham Online ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            How to Check Porutham Online
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A jathagam porutham online check takes three steps, and the tool above does all three. This is how to check porutham — porutham parka, as it is said in Tamil ("parka" means to check or see):
          </p>

          <ol className="text-sm text-slate-700 space-y-2 my-4 list-decimal pl-5">
            <li>
              <strong>Enter both dates of birth</strong> — or both birth stars, if you know them, or both names for a peyar porutham check. The tool finds each person's star and rasi from whatever you give it.
            </li>
            <li>
              <strong>Run the 10-porutham table</strong> — the tool compares the two stars porutham by porutham and marks each one matched or not matched.
            </li>
            <li>
              <strong>Read the verdict together</strong> — the count out of 10, plus the Rajju and Vedha flags. Do not read the count alone.
            </li>
          </ol>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A porutham check online is free here — there is no paid version and no app to buy. What you get is a free jathaka porutham: the whole table, no sign-up, no download. Families looking for a thirumana porutham in tamil language online free check will find it here, in Tamil terms. The tool above is also the thirumana porutham online check families use before fixing a date, and a thirumana porutham tamil online free check costs nothing to run. What makes the best thirumana porutham online check is the full table of 10, shown with the two must-pass rows flagged — which is what the tool above does.
          </p>

          {/* ─── Section: Porutham in Tamil, Malayalam and English ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Porutham in Tamil, Malayalam and English
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Porutham is asked for in every South Indian language, and the matching does not change with the language — only the words do. In Tamil homes, families ask for a thirumana porutham in tamil reading when they want the report explained in Tamil, with the stars and the ten poruthams named the way Tamil families name them. The tool above gives you that: the same ten-porutham table, with the verdict written in Tamil words, star by star.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            <strong>Malayalam (Kerala).</strong> In Kerala, the matching goes by its Malayalam name, and the same ten poruthams are read the same way — the stars, the rasis and the checks are identical, only the language of the explanation changes. Open the page, enter the two birth details, and the ten-row table appears, explained in Malayalam. The English version on this page covers the same ten checks for families who read in English.
          </p>

          {/* ─── Section: Is Porutham Free? ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Is Porutham Free?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Yes — the check on this page is free, with the full ten-porutham table and the verdict included. There is no paid version, no sign-up and no app to buy.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            You also do not need a porutham app or any porutham software. A jathaka porutham online check runs in your browser: open the page, enter the two names and dates of birth, and get the 10-porutham table and the verdict immediately. The online check gives you the same 10-porutham result as a manual matching, in seconds.
          </p>

          {/* ─── Section: Porutham and Other Ways to Check a Match ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            Porutham and Other Ways to Check a Match
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Thirumana porutham is the Tamil check. Two other checks answer the marriage question in different systems, and they live on this site alongside it.{' '}
            <a
              href="/kundali-matching/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/kundali-matching/');
              }}
              className="text-amber-700 font-semibold hover:underline"
            >
              Kundali matching
            </a>{' '}
            is the North Indian check — the marriage question scored on 36 gunas instead of 10 poruthams — and our Kundali Matching page runs it. If you want the North Indian reading of the same couple, run both and compare: a couple can pass the 10 poruthams and still want to see their guna score, and the two systems are traditionally read together in many families.{' '}
            <a
              href="/kundali/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/kundali/');
              }}
              className="text-amber-700 font-semibold hover:underline"
            >
              Kundali
            </a>{' '}
            and our{' '}
            <a
              href="/birth-chart-calculator/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/birth-chart-calculator/');
              }}
              className="text-amber-700 font-semibold hover:underline"
            >
              birth chart calculator
            </a>{' '}
            — the birth chart behind both checks — are available on this site, and the{' '}
            <a
              href="/zodiac-signs/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/zodiac-signs/');
              }}
              className="text-amber-700 font-semibold hover:underline"
            >
              zodiac signs
            </a>{' '}
            page covers the{' '}
            <a
              href="/love-compatibility-by-zodiac-sign/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/love-compatibility-by-zodiac-sign/');
              }}
              className="text-amber-700 hover:underline font-semibold"
            >
              sun-sign reading
            </a>
            {' '}of the same match. Numerology reads the marriage question in numbers: our{' '}
            <a
              href="/numerology-calculator/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/numerology-calculator/');
              }}
              className="text-amber-700 font-semibold hover:underline"
            >
              numerology calculator
            </a>{' '}
            looks at the partners' numbers instead of their stars. And once the matching is done, the{' '}
            <a
              href="/love-language-test/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/love-language-test/');
              }}
              className="text-amber-700 font-semibold hover:underline"
            >
              love language test
            </a>{' '}
            helps the couple understand each other — matching tells you whether the stars agree, and the love languages tell you how the two of you actually talk to each other.
          </p>

          {/* ─── Section: When Will My Marriage Happen? ─── */}
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-10 mb-4">
            When Will My Marriage Happen?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Thirumana porutham tells you whether a match is compatible, not when the marriage will happen. If you are asking{' '}
            <a
              href="/when-will-i-get-married/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/when-will-i-get-married/');
              }}
              className="text-amber-700 hover:underline font-semibold"
            >
              when my marriage will happen
            </a>
            {' '}or when will be my marriage, that is a timing question, answered by marriage prediction from the birth chart. If you want a marriage date prediction, a marriage year prediction or a timing of marriage reading, those belong to a future prediction tool, not to matching. Matching tells you who matches; prediction tells you when.
          </p>
        </article>

        {/* ─── FAQs ─── */}
        <FAQSection faqs={faqs} title="Frequently Asked Questions About Thirumana Porutham" />

        {/* ─── Related Tools ─── */}
        <RelatedTools currentToolId="porutham" onNavigate={onNavigate} />
      </div>
    </div>
  );
};
