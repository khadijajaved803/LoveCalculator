import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { CalculationLoader } from '../components/CalculationLoader';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import {
  Hash,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  MessageCircle,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

// Pythagorean letter values (1-9)
const pythagoreanMap: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

// Chaldean letter values (1-8)
const chaldeanMap: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

function calculateRootNumber(str: string, map: Record<string, number>): { root: number; breakdown: { char: string; val: number }[] } {
  const clean = str.toUpperCase().replace(/[^A-Z]/g, '');
  const breakdown = clean.split('').map((char) => ({
    char,
    val: map[char] || 0,
  }));

  let sum = breakdown.reduce((acc, curr) => acc + curr.val, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split('')
      .reduce((a, b) => a + parseInt(b, 10), 0);
  }
  return { root: sum, breakdown };
}

export const NameNumerologyPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [system, setSystem] = useState<'pythagorean' | 'chaldean'>('pythagorean');
  const [result, setResult] = useState<{
    p1: { name: string; root: number; breakdown: { char: string; val: number }[] };
    p2: { name: string; root: number; breakdown: { char: string; val: number }[] };
    compatibility: number;
    verdict: string;
  } | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleDownloadCard = async () => {
    if (!result) return;
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob({
        type: 'numerology',
        names: { person1: result.p1.name, person2: result.p2.name },
        score: result.compatibility,
        tagline: result.verdict,
        suggestion: `Name Destiny Numbers: ${result.p1.name} (Number ${result.p1.root}) & ${result.p2.name} (Number ${result.p2.root})`,
        tip: 'Numerological root vibration reflects conversational harmony and shared life expression.',
        details: `${system === 'pythagorean' ? 'Pythagorean' : 'Chaldean'} Name Numerology · Destiny Compatibility`,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Name-Numerology-Certificate-${result.p1.name}-${result.p2.name}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice('Certificate downloaded successfully!');
    } catch {
      setNotice('Could not generate certificate card.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShareWhatsApp = async () => {
    if (!result) return;
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob({
        type: 'numerology',
        names: { person1: result.p1.name, person2: result.p2.name },
        score: result.compatibility,
        tagline: result.verdict,
        suggestion: `Name Destiny Numbers: ${result.p1.name} (#${result.p1.root}) & ${result.p2.name} (#${result.p2.root})`,
        tip: 'Numerological root vibration reflects conversational harmony.',
        details: `${system === 'pythagorean' ? 'Pythagorean' : 'Chaldean'} Name Match`,
      });
      const file = new File([blob], `${result.p1.name}-${result.p2.name}-numerology.png`, { type: 'image/png' });
      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Name Numerology Certificate',
          text: `Check out our name numerology compatibility score on CalculateLove! https://calculatelove.online/numerology/name-numerology/`,
        });
      } else {
        const text = encodeURIComponent(`We got a ${result.compatibility}% Name Numerology compatibility match on CalculateLove! Check yours: https://calculatelove.online/numerology/name-numerology/`);
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
      }
    } catch {
      handleDownloadCard();
    } finally {
      setDownloading(false);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;

    const map = system === 'pythagorean' ? pythagoreanMap : chaldeanMap;
    const res1 = calculateRootNumber(name1, map);
    const res2 = calculateRootNumber(name2, map);

    // Deterministic compatibility based on root numbers
    const diff = Math.abs((res1.root % 9) - (res2.root % 9));
    let score = 85 - diff * 7;
    if (res1.root === res2.root) score = 96;
    if (score < 55) score = 62;

    let verdict = 'Complementary Numerical Chemistry';
    if (score >= 90) verdict = 'Sacred Harmonic Alignment';
    else if (score >= 75) verdict = 'Natural Dynamic Harmony';

    setResult({
      p1: { name: name1.trim(), ...res1 },
      p2: { name: name2.trim(), ...res2 },
      compatibility: score,
      verdict,
    });
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setResult(null);
  };

  const faqs = [
    {
      question: 'How does a name numerology calculator work?',
      answer:
        'A name numerology calculator translates each letter of a person’s name into a single numeric vibration according to an ancient numeric key (Pythagorean 1-9 or Chaldean 1-8). The numbers are summed recursively to reveal your Expression or Destiny root number.',
    },
    {
      question: 'What is a Chaldean numerology calculator and how is it calculated?',
      answer:
        'A Chaldean numerology calculator assigns numbers 1 through 8 based on ancient acoustic sound vibrations. Unlike Pythagorean charts, Chaldean calculations do not assign letters to the number 9 because 9 was historically held as sacred. It reveals deep soul desires and subconscious partnership chemistry.',
    },
    {
      question: 'How to calculate name number and numerology name value?',
      answer:
        'To calculate your name number, convert each letter of your first and full name to its corresponding digit using the numerology chart above. Sum all the digits together, and continue adding until a single digit (1 to 9) or Master Number (11, 22, 33) is reached.',
    },
    {
      question: 'What is the difference between Pythagorean and Chaldean numerology?',
      answer:
        'Pythagorean numerology assigns digits 1 through 9 sequentially across the Latin alphabet (A=1, B=2 ... I=9, J=1). Chaldean numerology assigns digits 1 through 8 based on phonetic vibrational frequency, omitting 9 as a sacred spiritual number.',
    },
    {
      question: 'What does my Name Destiny Number reveal about relationship compatibility?',
      answer:
        'Your Name Destiny Number represents your communicative persona, outward energy, and social interaction style. When two partners share harmonious number vibrations or complementary triads, everyday banter and problem-solving feel effortless.',
    },
    {
      question: 'Can name numerology be combined with Date of Birth Life Path numbers?',
      answer:
        'Yes! Numerologists frequently analyze both. The Date of Birth Life Path represents your foundational life mission and temperament, while your Name Number reflects your active personality and conversational expression.',
    },
    {
      question: 'Can you use a name number calculator for business and brand names?',
      answer:
        'Yes. Many entrepreneurs use a business name numerology calculator or company name numerology chart to evaluate brand resonance, marketing luck, and commercial vibration before officially registering a business.',
    },
    {
      question: 'What is the difference between Soul Urge, Personality, and Expression numbers?',
      answer:
        'The Expression (Destiny) number comes from all letters in your name. The Soul Urge (Heart’s Desire) comes exclusively from vowels (A, E, I, O, U), revealing inner spiritual yearnings. The Personality number comes from consonants, representing outward impressions.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Name Numerology Calculator – Pythagorean & Chaldean Name Numbers',
    url: 'https://calculatelove.online/numerology/name-numerology/',
    description:
      'Free name numerology calculator. Calculate Pythagorean and Chaldean name numbers, destiny root vibrations, and couple name compatibility.',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Name Numerology Calculator – Pythagorean & Chaldean Name Numbers"
        description="Calculate your name numerology number with our free interactive tool. Compare Pythagorean vs Chaldean name vibrations and discover couple destiny compatibility."
        canonicalPath="/numerology/name-numerology/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Numerology', href: '/numerology/' },
          { label: 'Name Numerology' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-3 border border-purple-200">
          <Hash className="w-3.5 h-3.5 text-purple-600" />
          <span>Vibrational Sound Mathematics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Name Numerology Calculator – Explore Name Numbers
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          Convert names into vibrational numbers. Compare Pythagorean and Chaldean name totals to evaluate couple destiny compatibility.
        </p>
      </div>

      {/* Calculator Dashboard */}
      <div className="w-full mb-12">
        {!result ? (
          <div className="bg-white rounded-3xl border border-purple-200/90 shadow-lg p-5 sm:p-7 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-rose-400" />

            <form onSubmit={handleCalculate} className="space-y-5">
              <div className="border-b border-slate-100 pb-3 mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 font-display">
                    Enter Names for Numerology Analysis
                  </h2>
                  <p className="text-xs text-slate-500">
                    Translates Latin alphabet letters into root numeric frequencies
                  </p>
                </div>

                {/* System Switcher */}
                <div className="inline-flex rounded-xl p-1 bg-purple-50 border border-purple-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setSystem('pythagorean')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      system === 'pythagorean'
                        ? 'bg-purple-600 text-white shadow-2xs'
                        : 'text-purple-700 hover:text-purple-900'
                    }`}
                  >
                    Pythagorean (1-9)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSystem('chaldean')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      system === 'chaldean'
                        ? 'bg-purple-600 text-white shadow-2xs'
                        : 'text-purple-700 hover:text-purple-900'
                    }`}
                  >
                    Chaldean (1-8)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="numName1" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="numName1"
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="e.g. Ananya"
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 min-h-[42px]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="numName2" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Partner / Crush Name
                  </label>
                  <input
                    id="numName2"
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="e.g. Siddharth"
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 min-h-[42px]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 min-h-[46px]"
              >
                <Hash className="w-4 h-4 fill-white" />
                <span>Calculate Name Numerology Numbers</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-purple-200/90 shadow-lg p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">
                  {system === 'pythagorean' ? 'Pythagorean' : 'Chaldean'} Numerology Analysis
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                  {result.p1.name} &amp; {result.p2.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Calculate Again</span>
              </button>
            </div>

            {/* Side-by-side Number Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900">{result.p1.name}</span>
                  <span className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold text-sm flex items-center justify-center font-mono">
                    {result.p1.root}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 text-[11px] font-mono bg-white p-2.5 rounded-xl border border-purple-100">
                  {result.p1.breakdown.map((item, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-800">
                      {item.char}={item.val}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-600">
                  Name Destiny Number: <strong className="text-slate-900 font-semibold">{result.p1.root}</strong>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900">{result.p2.name}</span>
                  <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center font-mono">
                    {result.p2.root}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 text-[11px] font-mono bg-white p-2.5 rounded-xl border border-indigo-100">
                  {result.p2.breakdown.map((item, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800">
                      {item.char}={item.val}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-600">
                  Name Destiny Number: <strong className="text-slate-900 font-semibold">{result.p2.root}</strong>
                </p>
              </div>
            </div>

            {/* Compatibility Score */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
                  Name Number Compatibility
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 font-display">
                  {result.verdict}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Calculated from the numeric resonance between Number {result.p1.root} and Number {result.p2.root}.
                </p>
              </div>
              <div className="text-4xl font-extrabold text-purple-600 font-display shrink-0">
                {result.compatibility}%
              </div>
            </div>

            {/* Certificate Download Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Download Name Numerology Certificate Card
                </h4>
                <p className="text-[11px] text-slate-500">
                  Save your official 1080×1350 name numerology match certificate for WhatsApp Status, Stories &amp; sharing
                </p>
              </div>

              {notice && (
                <p className="text-xs text-purple-700 font-semibold bg-purple-100/60 p-2 rounded-xl">
                  {notice}
                </p>
              )}

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  disabled={downloading}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloading ? 'Generating...' : 'Download Certificate PNG'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  disabled={downloading}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp Status</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* System Comparison: Pythagorean vs Chaldean */}
      <section className="bg-white rounded-3xl border border-purple-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12 space-y-10">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-2">
            Historical Systems &amp; Vibration
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            Pythagorean vs. Chaldean Name Numerology: Calculating Name Number Values
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Both systems translate names into cosmic numbers. Whether you want to calculate name numerology, find your numerology name value, or check name and numerology meaning, each system offers unique insights into couple dynamics, personal destiny, and vibrational energy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Pythagorean Numerology Calculator (Modern Western)</h3>
            <ul className="text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>Created by the ancient Greek philosopher Pythagoras.</li>
              <li>Numbers are assigned sequentially 1 through 9.</li>
              <li>Standardized worldwide for Latin alphabet name calculations.</li>
              <li>Focuses on life lessons, destiny expression, and outward communication.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Chaldean Numerology Name Calculator (Ancient Babylonian)</h3>
            <ul className="text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>One of the oldest documented metaphysical systems.</li>
              <li>Numbers are assigned 1 through 8 based on phonetic acoustic vibration.</li>
              <li>The number 9 is omitted from letter assignment as sacred and divine.</li>
              <li>Focuses on inner soul desires and subconscious energetic chemistry.</li>
            </ul>
          </div>
        </div>

        {/* Master Chart: Number Conversion Reference Table */}
        <div className="pt-6 border-t border-purple-100">
          <div className="max-w-3xl mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-2">
              Name Numerology Chart: Letters to Numbers Reference Guide
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Use this reference table to understand how each alphabetical letter converts to its numerical value in both the Pythagorean and Chaldean systems when performing manual calculation or checking your name letter number:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-purple-200 bg-purple-50/60 text-slate-900 font-bold">
                  <th className="py-2.5 px-3">System</th>
                  <th className="py-2.5 px-2 text-center">1</th>
                  <th className="py-2.5 px-2 text-center">2</th>
                  <th className="py-2.5 px-2 text-center">3</th>
                  <th className="py-2.5 px-2 text-center">4</th>
                  <th className="py-2.5 px-2 text-center">5</th>
                  <th className="py-2.5 px-2 text-center">6</th>
                  <th className="py-2.5 px-2 text-center">7</th>
                  <th className="py-2.5 px-2 text-center">8</th>
                  <th className="py-2.5 px-2 text-center">9</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100 text-slate-700">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-purple-900 bg-purple-50/30">Pythagorean</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">A, J, S</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">B, K, T</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">C, L, U</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">D, M, V</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">E, N, W</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">F, O, X</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">G, P, Y</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">H, Q, Z</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">I, R</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-indigo-900 bg-indigo-50/30">Chaldean</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">A, I, J, Q, Y</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">B, K, R</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">C, G, L, S</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">D, M, T</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">E, H, N, X</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">U, V, W</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">O, Z</td>
                  <td className="py-2.5 px-2 text-center font-mono font-medium">F, P</td>
                  <td className="py-2.5 px-2 text-center font-mono text-slate-400 italic font-medium">Sacred (None)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Step-by-Step: How to Calculate Name Number */}
        <div className="pt-6 border-t border-purple-100">
          <div className="max-w-3xl mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-2">
              How to Calculate Name Numerology: Step-by-Step Guide
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Wondering how to find numerology number for your name or calculating name number by hand? Follow these four straightforward steps:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center">1</span>
              <h4 className="font-bold text-slate-900">Write Full Name</h4>
              <p className="text-slate-600 leading-relaxed">
                Write down your official birth name or everyday first name in capital letters without punctuation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center">2</span>
              <h4 className="font-bold text-slate-900">Assign Numbers</h4>
              <p className="text-slate-600 leading-relaxed">
                Match each letter against the Pythagorean (1-9) or Chaldean (1-8) alphabet table.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center">3</span>
              <h4 className="font-bold text-slate-900">Sum the Values</h4>
              <p className="text-slate-600 leading-relaxed">
                Add all individual letter numbers together to obtain a preliminary compound sum.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center">4</span>
              <h4 className="font-bold text-slate-900">Reduce to Root</h4>
              <p className="text-slate-600 leading-relaxed">
                Reduce compound digits until a single root digit (1-9) or Master Number (11, 22, 33) remains.
              </p>
            </div>
          </div>
        </div>

        {/* Deep Meaning of Name Numbers 1 to 9 */}
        <div className="pt-6 border-t border-purple-100">
          <div className="max-w-3xl mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-2">
              Name Numbers 1 to 9: Meaning, Personality &amp; Love Energy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every name root number carries distinct energetic properties that shape romance, communication, and interpersonal relationships:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-1.5">
              <span className="font-mono font-bold text-purple-700 text-sm">Number 1 · The Pioneer</span>
              <p className="text-slate-600 leading-relaxed">
                Independent, bold, and ambitious. Brings strong initiative and leadership into romantic partnerships.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-1.5">
              <span className="font-mono font-bold text-purple-700 text-sm">Number 2 · The Peacemaker</span>
              <p className="text-slate-600 leading-relaxed">
                Empathetic, diplomatic, and tender. Prioritizes deep emotional connection, mutual listening, and balance.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-1.5">
              <span className="font-mono font-bold text-purple-700 text-sm">Number 3 · The Expresser</span>
              <p className="text-slate-600 leading-relaxed">
                Playful, creative, and conversational. Brings vibrant wit, laughter, and uplifting optimism to couples.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-1.5">
              <span className="font-mono font-bold text-purple-700 text-sm">Number 4 · The Builder</span>
              <p className="text-slate-600 leading-relaxed">
                Loyal, dependable, and grounded. Focuses on security, trustworthy actions, and long-term marital foundations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-1.5">
              <span className="font-mono font-bold text-purple-700 text-sm">Number 5 · The Adventurer</span>
              <p className="text-slate-600 leading-relaxed">
                Spontaneous, free-spirited, and passionate. Needs mental stimulation, exciting journeys, and adaptable love.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-1.5">
              <span className="font-mono font-bold text-purple-700 text-sm">Number 6 · The Caregiver</span>
              <p className="text-slate-600 leading-relaxed">
                Nurturing, family-oriented, and harmonious. Naturally devoted to home comfort, protection, and unconditional support.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-1.5">
              <span className="font-mono font-bold text-purple-700 text-sm">Number 7 · The Seeker</span>
              <p className="text-slate-600 leading-relaxed">
                Introspective, analytical, and spiritual. Values emotional depth, intellectual connection, and private serenity.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-1.5">
              <span className="font-mono font-bold text-purple-700 text-sm">Number 8 · The Achiever</span>
              <p className="text-slate-600 leading-relaxed">
                Resilient, authoritative, and goal-driven. Creates material abundance and protective stability for their partner.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/30 border border-purple-100 space-y-1.5">
              <span className="font-mono font-bold text-purple-700 text-sm">Number 9 · The Humanitarian</span>
              <p className="text-slate-600 leading-relaxed">
                Compassionate, generous, and idealistic. Seeks profound universal understanding and selfless devotion.
              </p>
            </div>
          </div>
        </div>

        {/* Business & Brand Name Numerology */}
        <div className="pt-6 border-t border-purple-100">
          <div className="max-w-3xl mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-2">
              Business Name Number &amp; Company Numerology Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Beyond romantic couples, numerology is extensively applied in corporate branding. Founders regularly use a business name numerology calculator or company name numerology chart to calculate business name numerology and ensure favorable brand vibration:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-slate-900">Commercial Magnetism &amp; Numbers</h4>
                <p className="text-slate-600 leading-relaxed">
                  Numbers like 1 (leadership and innovation), 5 (marketing and commerce), and 8 (financial prosperity and expansion) are frequently chosen for corporate and enterprise names.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-slate-900">Name Correction by Numerology</h4>
                <p className="text-slate-600 leading-relaxed">
                  Adding or modifying a letter in a personal or brand name (often called name correction or lucky name numerology) aligns the compound value with prosperous harmonic energies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking: Hubs & DOB */}
      <section className="bg-purple-50/50 rounded-3xl border border-purple-200/80 p-6 sm:p-8 mb-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-2">
          Compare with Date of Birth Compatibility
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          While Name Numerology evaluates active communication, your Date of Birth reveals your lifelong Life Path number triad (1-9):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/love-calculator-by-date-of-birth/')}
            className="p-4 rounded-2xl bg-white border border-purple-200 text-left hover:border-purple-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-purple-600 group-hover:text-purple-700 block mb-1">
              DOB Life Path Calculator →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Compute your Life Path number and check Pythagorean triad compatibility.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/numerology/')}
            className="p-4 rounded-2xl bg-white border border-purple-200 text-left hover:border-purple-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-purple-600 group-hover:text-purple-700 block mb-1">
              Numerology Hub &amp; Triads →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Read in-depth guides on numbers 1-9 archetypes and Master Numbers (11, 22, 33).
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/love-calculator/')}
            className="p-4 rounded-2xl bg-white border border-purple-200 text-left hover:border-purple-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-purple-600 group-hover:text-purple-700 block mb-1">
              True Love Calculator →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Our 4-pillar true love percentage tool with downloadable certificate.
            </p>
          </button>
        </div>
      </section>

      <RelatedTools currentToolId="name-numerology" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['love-compatibility-by-date-of-birth', 'how-love-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
