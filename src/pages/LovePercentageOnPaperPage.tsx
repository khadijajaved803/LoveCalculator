import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import {
  FileText,
  Sparkles,
  Heart,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  ListOrdered,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const LovePercentageOnPaperPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs = [
    {
      question: 'What is the paper method for calculating love percentage?',
      answer:
        'The paper method is a classic nostalgic game where you write two names on a sheet of paper alongside a keyword like LOVES or TRUE LOVE, count matching letter frequencies into a numeric string, and add outer or adjacent pairs until a two-digit percentage remains.',
    },
    {
      question: 'How do you calculate love percentage on paper step by step?',
      answer:
        'First, write both names side by side. Second, write the word LOVES underneath. Third, count the frequency of each unique letter across the names and phrase to form a row of single digits. Fourth, add the first digit to the last digit (or adjacent numbers) to form a new shorter row. Repeat until only two digits remain, representing your love percentage.',
    },
    {
      question: 'What happens when two digits add up to 10 or more on paper?',
      answer:
        'In the traditional schoolbook rules, if adding two numbers results in a two-digit sum like 12, you either add those two digits together (1 + 2 = 3) or carry the tens value forward depending on which local paper variation your friends follow. Single-digit reduction is the most widespread standard.',
    },
    {
      question: 'Love percentage kaise nikale pen aur paper se?',
      answer:
        'Ek notebook page par apna aur apne partner ka naam likhein. Saath mein beech mein "LOVES" word add karein. Har letter kitni baar repeat ho raha hai uski counting karke numbers ki line banayein. Phir pehle aur aakhri number ko jodkar nayi row banate jayein jab tak do anko ka percentage na nikal aaye.',
    },
    {
      question: 'Why does paper love percentage differ from online love calculators?',
      answer:
        'Paper calculation uses a simple manual addition trick primarily played for nostalgia. Modern online calculators like CalculateLove analyze phonetic sound vibrations, consonant-to-vowel ratios, and multidimensional relationship pillars (communication, emotional security, and longevity) for a deterministic evaluation.',
    },
    {
      question: 'Can you calculate love percentage on paper with just first names?',
      answer:
        'Yes, using first names is the most common practice. If both first names are very short, adding full names or middle names provides a longer starting sequence and more detailed addition rounds.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Love Percentage on Paper - Step by Step Guide',
    description:
      'Complete guide on how to calculate love percentage on paper using names, letter counting, and recursive addition rules. Includes worked examples and paper vs online comparison.',
    totalTime: 'PT5M',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Write both names on paper',
        text: 'Take a pen and sheet of paper. Write your name and your crush or partner’s name clearly on top.',
      },
      {
        '@type': 'HowToStep',
        name: 'Insert the connecting keyword',
        text: 'Write the word LOVES or TRUE LOVE between or below both names to establish the baseline letter grid.',
      },
      {
        '@type': 'HowToStep',
        name: 'Count letter occurrences',
        text: 'Count how many times each letter appears across the entire phrase and record the count as a numeric string.',
      },
      {
        '@type': 'HowToStep',
        name: 'Add pairs recursively',
        text: 'Add the first and last numbers together to generate the next row. Continue until only a two-digit number remains.',
      },
      {
        '@type': 'HowToStep',
        name: 'Read your final love percentage',
        text: 'The final two digits represent your love percentage score on paper.',
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="How to Calculate Love Percentage on Paper - Step-by-Step Pen & Paper Test"
        description="Learn how to calculate love percentage on paper with names. Discover the classic notebook method, letter frequency rules, worked examples, and online comparison."
        canonicalPath="/love-percentage-on-paper/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Love Percentage on Paper' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-3 border border-rose-200">
          <FileText className="w-3.5 h-3.5 text-rose-600" />
          <span>Classic Notebook Relationship Game</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          How to Calculate Love Percentage on Paper
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          Master the nostalgic pen-and-paper method to test love percentage with names. Follow easy step-by-step addition rules with real worked examples.
        </p>
      </div>

      {/* Interactive Online Calculator Callout Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prefer an Instant Calculation?</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display">
            Try Our Online Love Percentage Calculator
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-xl leading-relaxed">
            Skip manual notebook math! Enter your name and partner&apos;s name to calculate true love percentage, phonetic sound harmony, and download your free couple certificate.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/love-calculator/')}
          className="shrink-0 px-6 py-3.5 rounded-xl bg-white text-rose-600 font-bold text-xs sm:text-sm shadow-md hover:bg-rose-50 transition-colors inline-flex items-center gap-2"
        >
          <span>Open Online Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Step by Step Paper Guide Section */}
      <section className="bg-white rounded-3xl border border-rose-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-2">
            Step-by-Step Instructions
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            How to Find Love Percentage on Paper: The 4-Step Rule
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Generations of school friends and couples have used pen and paper to test love percentage before smartphones existed. Here is the standard method used across notebooks worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">Step 1: Write Names with the Word &quot;LOVES&quot;</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Take a blank sheet of paper. Write your name, followed by the word <strong>LOVES</strong>, followed by your crush or partner’s name in a single horizontal line.
            </p>
            <div className="bg-white p-3 rounded-xl border border-rose-200 text-center text-xs font-mono text-slate-800">
              RAHUL LOVES PRIYA
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">Step 2: Count Letter Frequencies</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Moving from left to right, count how many times each unique letter appears across the entire phrase. Ignore letters you have already counted so each letter is tallied once.
            </p>
            <div className="bg-white p-3 rounded-xl border border-rose-200 text-center text-xs font-mono text-slate-800">
              R(2) · A(2) · H(1) · U(1) · L(2) · O(1) · V(1) · E(1) · S(1) · P(1) · I(1) · Y(1)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">Step 3: Pair & Add the Numbers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Write the counts in a single number row. Add the first number to the last number (outer pair addition). Place the sum below. Next, add the second number to the second-to-last number, repeating inward.
            </p>
            <div className="bg-white p-3 rounded-xl border border-rose-200 text-center text-xs font-mono text-slate-800">
              First Digit + Last Digit = Next Row Number
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-900">Step 4: Reduce to Two Digits</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Keep repeating this pairwise addition on each new row until you are left with exactly two numbers. Those two digits give you your true love test percentage on paper.
            </p>
            <div className="bg-white p-3 rounded-xl border border-rose-200 text-center text-xs font-mono text-rose-600 font-bold">
              Final Two Digits = 82%
            </div>
          </div>
        </div>
      </section>

      {/* Concrete Worked Example Box */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 mb-12 shadow-xl">
        <div className="max-w-3xl mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-3 border border-rose-500/30">
            Real Worked Example
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display mb-3 text-balance">
            Paper Love Calculation Example: AARAV &amp; DIYA
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Let us walk through an exact calculation using two popular names so you can follow along on your own sheet of paper.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              Step 1: Write the Core Phrase
            </h3>
            <p className="text-xs font-mono text-amber-200 bg-black/30 p-2.5 rounded-lg text-center tracking-widest">
              A A R A V &nbsp;&nbsp; L O V E S &nbsp;&nbsp; D I Y A
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              Step 2: Calculate Letter Occurrences
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-200">
              <div className="bg-white/5 p-2 rounded text-center">A appears: 4 times</div>
              <div className="bg-white/5 p-2 rounded text-center">R appears: 1 time</div>
              <div className="bg-white/5 p-2 rounded text-center">V appears: 2 times</div>
              <div className="bg-white/5 p-2 rounded text-center">L appears: 1 time</div>
              <div className="bg-white/5 p-2 rounded text-center">O appears: 1 time</div>
              <div className="bg-white/5 p-2 rounded text-center">E appears: 1 time</div>
              <div className="bg-white/5 p-2 rounded text-center">S appears: 1 time</div>
              <div className="bg-white/5 p-2 rounded text-center">D appears: 1 time</div>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Initial Number Row: <span className="font-mono text-white">4 1 2 1 1 1 1 1 1 1</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              Step 3: Pairwise Addition Rounds
            </h3>
            <div className="space-y-1.5 font-mono text-xs sm:text-sm bg-black/40 p-4 rounded-xl text-center">
              <div className="text-slate-300">Row 1: 4 &nbsp; 1 &nbsp; 2 &nbsp; 1 &nbsp; 1 &nbsp; 1 &nbsp; 1 &nbsp; 1 &nbsp; 1 &nbsp; 1</div>
              <div className="text-slate-300">Row 2: (4+1) &nbsp; (1+1) &nbsp; (2+1) &nbsp; (1+1) &nbsp; (1+1) = 5 &nbsp; 2 &nbsp; 3 &nbsp; 2 &nbsp; 2</div>
              <div className="text-slate-300">Row 3: (5+2) &nbsp; (2+2) &nbsp; [3 stays middle] = 7 &nbsp; 4 &nbsp; 3</div>
              <div className="text-rose-400 font-bold">Row 4: (7+3) &nbsp; 4 = 10 &nbsp; 4 -&gt; (1+0) &nbsp; 4 = 1 &nbsp; 4 -&gt; 88% Final Score</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              The resulting paper love compatibility comes out to <strong>88%</strong>, indicating high romantic affinity and warm conversational chemistry.
            </p>
          </div>
        </div>
      </section>

      {/* Alternative Paper Love Calculator: The "TRUE LOVE" Grid */}
      <section className="bg-white rounded-3xl border border-rose-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12">
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-2">
            Alternative Paper Variation
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            The &quot;TRUE LOVE&quot; Letter Match Method on Paper
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Another beloved paper love calculator game involves writing the letters <strong>T-R-U-E &nbsp; L-O-V-E</strong> and counting matches against both partner names.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100">
            <h3 className="text-xs font-bold text-slate-900 mb-2">How It Works:</h3>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
              <li>Write your name and your partner’s name side by side.</li>
              <li>Underneath, write the 8 letters: T, R, U, E, L, O, V, E.</li>
              <li>Count how many times each of these 8 letters appears across both names.</li>
              <li>You will receive an 8-digit sequence (e.g. 1 2 0 3 1 1 0 2).</li>
              <li>Add outer numbers as before to reach your final two-digit percentage.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70">
            <h3 className="text-xs font-bold text-amber-900 mb-2">Why It Became Popular:</h3>
            <p className="text-xs text-amber-800 leading-relaxed mb-3">
              This method became iconic in school notebooks because it gave couples a standard 8-letter framework every time, regardless of whether names were short or long.
            </p>
            <p className="text-xs text-amber-800 leading-relaxed">
              If you want an even more traditional game, try our dedicated <button type="button" onClick={() => onNavigate('/flames-calculator/')} className="text-rose-600 font-semibold underline hover:text-rose-700">FLAMES Calculator</button>, which uses letter cancellation to reveal friendship, love, affection, marriage, enemy, or sibling status.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison: Paper vs. Modern Online Calculator */}
      <section className="bg-white rounded-3xl border border-rose-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12">
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-2">
            Side-by-Side Comparison
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            Paper Love Calculation vs. Online Love Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Understanding the difference helps you enjoy paper calculations for nostalgic fun while relying on digital algorithms for richer relationship insights.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-rose-200 bg-rose-50/60 text-slate-800">
                <th className="py-3 px-4 font-bold">Feature</th>
                <th className="py-3 px-4 font-bold">Notebook Paper Method</th>
                <th className="py-3 px-4 font-bold">CalculateLove Online Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Calculation Speed</td>
                <td className="py-3 px-4 text-slate-600">3-5 minutes with pen &amp; paper</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">Instant (less than 1 second)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Algorithm Type</td>
                <td className="py-3 px-4 text-slate-600">Manual digit summation</td>
                <td className="py-3 px-4 text-slate-600">Deterministic phonetic harmonics + vowel vibration</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Dimensional Breakdown</td>
                <td className="py-3 px-4 text-slate-600">Only single overall percentage</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">4 Pillars: Communication, Emotional Safety, Chemistry, Longevity</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Age &amp; Couple Dynamics</td>
                <td className="py-3 px-4 text-slate-600">Not supported</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">Customizable couple vibes &amp; age alignment</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Shareable Love Card</td>
                <td className="py-3 px-4 text-slate-600">Handwritten notebook page</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">High-res downloadable 1080×1350 certificate for WhatsApp Status</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Privacy</td>
                <td className="py-3 px-4 text-slate-600">Notebook can be seen by others</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">100% private, executed locally in browser</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Internal Linking & Next Steps */}
      <section className="bg-rose-50/50 rounded-3xl border border-rose-200/80 p-6 sm:p-8 mb-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-3">
          Explore Other Popular Love &amp; Compatibility Tests
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          CalculateLove offers specialized compatibility calculators designed for every stage of your relationship journey:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/love-calculator/')}
            className="p-4 rounded-2xl bg-white border border-rose-200 text-left hover:border-rose-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-rose-600 group-hover:text-rose-700 block mb-1">
              Love Calculator by Name →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Test true love percentage between two names with 4-pillar dimensional insights.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/flames-calculator/')}
            className="p-4 rounded-2xl bg-white border border-rose-200 text-left hover:border-rose-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-rose-600 group-hover:text-rose-700 block mb-1">
              FLAMES Game Calculator →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              The classic school game that determines Friends, Lovers, Affection, Marriage, Enemies, or Siblings.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/love-calculator-by-date-of-birth/')}
            className="p-4 rounded-2xl bg-white border border-rose-200 text-left hover:border-rose-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-rose-600 group-hover:text-rose-700 block mb-1">
              DOB Compatibility Test →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Calculate Life Path number harmony (1-9) using both partners&apos; dates of birth.
            </p>
          </button>
        </div>
      </section>

      {/* Editorial Articles */}
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-love-calculator-works', 'what-does-love-percentage-mean', 'how-flames-calculator-works']}
      />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </div>
  );
};
