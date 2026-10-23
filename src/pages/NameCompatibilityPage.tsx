import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { CalculationLoader } from '../components/CalculationLoader';
import { calculateLoveScore } from '../lib/calculatorEngine';
import { generateCardImageBlob } from '../lib/cardImageGenerator';
import {
  Users,
  Sparkles,
  RotateCcw,
  Heart,
  Volume2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Download,
  MessageCircle,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const NameCompatibilityPage: React.FC<Props> = ({ onNavigate }) => {
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateLoveScore> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleDownloadCard = async () => {
    if (!result) return;
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob({
        type: 'name-compatibility',
        names: { person1: partner1, person2: partner2 },
        score: result.score,
        tagline: result.hinglishTagline || 'Name Compatibility Match',
        suggestion: result.hinglishSuggestion || result.summary,
        tip: result.hinglishTip || 'Spoken names carry acoustic warmth and emotional cadence.',
        details: `Name Match · Syllable Flow: ${result.breakdown.communication}% · Vowel Harmony: ${result.breakdown.passion}%`,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Name-Compatibility-Certificate-${partner1}-${partner2}.png`;
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
        type: 'name-compatibility',
        names: { person1: partner1, person2: partner2 },
        score: result.score,
        tagline: result.hinglishTagline || 'Name Compatibility Match',
        suggestion: result.hinglishSuggestion || result.summary,
        tip: result.hinglishTip || 'Spoken names carry acoustic warmth and emotional cadence.',
        details: `Name Match · Score: ${result.score}%`,
      });
      const file = new File([blob], `${partner1}-${partner2}-name-compatibility.png`, { type: 'image/png' });
      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Name Compatibility Certificate',
          text: `Check out our name compatibility test score on CalculateLove! https://calculatelove.online/name-compatibility/`,
        });
      } else {
        const text = encodeURIComponent(`We got a ${result.score}% Name Compatibility Test match on CalculateLove! Check yours: https://calculatelove.online/name-compatibility/`);
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
    if (!partner1.trim() || !partner2.trim()) {
      setError('Please enter both names to test compatibility.');
      return;
    }
    setError('');
    setIsCalculating(true);
  };

  const handleReset = () => {
    setPartner1('');
    setPartner2('');
    setResult(null);
    setIsCalculating(false);
    setError('');
  };

  const faqs = [
    {
      question: 'How does the Name Compatibility Test work?',
      answer:
        'The name compatibility test uses phonetic harmonic analysis. It compares the balance of vowels and consonants, sound resonance, and letter energy frequencies between both names to determine how melodically and energetically they harmonize.',
    },
    {
      question: 'What is name compatibility by numerology?',
      answer:
        'Name compatibility by numerology analyzes the numerical values of both partners’ first names using the ancient Pythagorean or Chaldean number keys. This numerology of name compatibility reveals couple personality resonance and mutual communication styles.',
    },
    {
      question: 'Can I check compatible names for marriage using a name match test?',
      answer:
        'Yes. Checking compatible names for marriage evaluates phonetic ease, family name flow, and daily conversational harmony. While traditional couples often consult astrology, an online compatibility test for couples by name offers an instant, entertaining relationship check.',
    },
    {
      question: 'How to do the name compatibility test with first names?',
      answer:
        'Simply enter your first name and your partner’s first name into the calculator above. The tool checks name birthday compatibility, letter matching, and phonetic vibration without requiring complex birth charts.',
    },
    {
      question: 'What is the difference between Name Compatibility and Love Percentage?',
      answer:
        'Name compatibility focuses specifically on phonetic sound vibrations, rhythm, and character harmony between spoken names. Love percentage combines this phonetic evaluation with broader emotional dimensions, age dynamics, and relationship pillars.',
    },
    {
      question: 'Can two names with low phonetic harmony have a wonderful relationship?',
      answer:
        'Of course! Phonetic name matching is an entertaining linguistic model. Real romantic relationships thrive on emotional safety, honesty, shared future goals, and mutual empathy.',
    },
    {
      question: 'Is name matching for marriage identical to Vedic Kundli Milan?',
      answer:
        'No. Traditional Vedic Kundli Milan evaluates birth coordinates, planetary lagna, and Nakshatra Gunas (out of 36). Our name compatibility test is a modern linguistic entertainment tool based on letters and vowels.',
    },
    {
      question: 'Are our entered names saved on your server?',
      answer:
        'No data is stored. All name calculations occur 100% inside your local web browser, ensuring total privacy.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Name Compatibility Test – Check Your Match by Name',
    url: 'https://calculatelove.online/name-compatibility/',
    description:
      'Test name compatibility, vowel-consonant phonetic harmony, and letter matching between two partners on CalculateLove. Free and private.',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Name Compatibility Test – Check Your Match by Name | CalculateLove"
        description="Check couple name compatibility and true love name match. Discover phonetic sound vibrations, vowel-consonant harmony, and letter resonance between two names."
        canonicalPath="/name-compatibility/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Name Compatibility' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-3 border border-rose-200">
          <Volume2 className="w-3.5 h-3.5 text-rose-600" />
          <span>Phonetic Sound Harmony &amp; Letter Resonance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Name Compatibility Test – Check Your Match by Name
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          Analyze phonetic resonance, first name compatibility test results, and love compatibility using names for couples and marriage.
        </p>
      </div>

      {/* Interactive Tool Section */}
      <div className="w-full mb-12">
        {isCalculating ? (
          <CalculationLoader
            name1={partner1}
            name2={partner2}
            type="love"
            onComplete={() => {
              const res = calculateLoveScore(partner1, partner2, 'general', {
                bondType: 'Couple',
                vibe: 'Phonetic Harmony',
              });
              setResult(res);
              setIsCalculating(false);
            }}
          />
        ) : !result ? (
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-lg p-5 sm:p-7 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

            <form onSubmit={handleCalculate} className="space-y-5">
              <div className="border-b border-slate-100 pb-3 mb-2">
                <h2 className="text-base font-extrabold text-slate-900 font-display">
                  Compare Two Names
                </h2>
                <p className="text-xs text-slate-500">
                  Calculates letter frequency balance, phonetic vibrations, and character resonance
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="p1NameInput" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    First Name
                  </label>
                  <input
                    id="p1NameInput"
                    type="text"
                    value={partner1}
                    onChange={(e) => setPartner1(e.target.value)}
                    placeholder="e.g. Kabir"
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="p2NameInput" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Second Name
                  </label>
                  <input
                    id="p2NameInput"
                    type="text"
                    value={partner2}
                    onChange={(e) => setPartner2(e.target.value)}
                    placeholder="e.g. Tara"
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px]"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 min-h-[46px]"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Calculate Name Compatibility</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-lg p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
                  Name Compatibility Score
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                  {partner1} &amp; {partner2}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Test Other Names</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 text-center space-y-2">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  Harmonic Score
                </span>
                <div className="text-5xl font-extrabold text-rose-600 font-display">
                  {result.score}%
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  {result.grade}
                </p>
              </div>

              <div className="md:col-span-2 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Linguistic &amp; Phonetic Breakdown
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {result.summary}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block text-[11px]">Syllable Flow</span>
                    <strong className="text-slate-900 font-semibold">{result.breakdown.communication}%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block text-[11px]">Vowel Harmony</span>
                    <strong className="text-slate-900 font-semibold">{result.breakdown.passion}%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Card Actions */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Official Name Compatibility Certificate Card
                </h4>
                <p className="text-[11px] text-slate-500">
                  Save a high-resolution 1080×1350 certificate of your couple name match for WhatsApp Status &amp; Instagram Stories
                </p>
              </div>

              {notice && (
                <p className="text-xs text-rose-700 font-semibold bg-rose-100/60 p-2 rounded-xl">
                  {notice}
                </p>
              )}

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  disabled={downloading}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
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

      {/* Authority Section: How Name Compatibility Works */}
      <section className="bg-white rounded-3xl border border-rose-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12 space-y-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-2">
            Linguistic &amp; Numerological Principles
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            How Name Compatibility Works: Names Compatibility for Marriage &amp; Dating
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Whether you want a quick name compatibility test, are checking compatible names for marriage, or assessing name relationship compatibility between first names, name matching combines vowel-consonant cadence with character energy.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Many couples also explore name compatibility in numerology or couple name matcher techniques to understand relationship name compatibility and love test love match dynamics between partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">1. Symmetrical Letter Matching</h3>
            <p className="text-slate-600 leading-relaxed">
              Shared alphabet letters and rhythmic letter frequencies create subconscious audio symmetry when a couple introduces themselves.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">2. Vowel-to-Consonant Ratio</h3>
            <p className="text-slate-600 leading-relaxed">
              Names balanced with open vowels (A, E, I, O, U) convey emotional warmth, while structured consonants ground conversational strength.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">3. Syllable Cadence &amp; Marriage Match</h3>
            <p className="text-slate-600 leading-relaxed">
              Shorter two-syllable names often complement longer three-syllable names naturally, creating a pleasant spoken couple cadence for lifelong partnership.
            </p>
          </div>
        </div>

        {/* Detailed Comprehensive Content Expansion */}
        <div className="space-y-8 pt-6 border-t border-rose-100">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-3">
              How to Do the Name Compatibility Test: Step-by-Step Guide
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Curious about how to do the name compatibility test with your partner or crush? Finding out your couple compatibility by name only takes a few simple steps:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
              <li>
                <strong className="text-slate-800 font-semibold">Enter Both First Names:</strong> Start with standard everyday first names. Running a first name compatibility test gives immediate clarity on daily conversational ease and natural phonetics.
              </li>
              <li>
                <strong className="text-slate-800 font-semibold">Run the Compatibility Check by Name:</strong> Our compatibility calculator by name inspects letter count parity, vowel resonance, and shared phonemes to produce an exact harmonic match score.
              </li>
              <li>
                <strong className="text-slate-800 font-semibold">Review Syllable Flow &amp; Vowel Balance:</strong> Examine how easily your names sound when spoken side-by-side, which indicates conversational flow.
              </li>
              <li>
                <strong className="text-slate-800 font-semibold">Download Your Couple Match Card:</strong> Save your official Name Compatibility Certificate card for sharing on WhatsApp status or Instagram stories.
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-3">
              Name Compatibility for Marriage &amp; Finding Compatible Names
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Throughout history, matchmaking traditions across cultures have evaluated name matching compatibility for marriage. When couples search for compatible names for marriage or conduct a name match marriage test, they often assess how both partners' names blend with prospective family surnames:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-slate-900">Marriage Name Compatibility &amp; Flow</h4>
                <p className="text-slate-600 leading-relaxed">
                  In marriage name compatibility, having smooth transitions between first names and joint surnames avoids awkward verbal stumbling and creates a harmonious social identity for married life.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-slate-900">Matchmaker Names &amp; Long-Term Bonding</h4>
                <p className="text-slate-600 leading-relaxed">
                  A couple name matcher helps identify compatible name pairs whose vocal sounds complement one another, fostering warmth during lifelong mutual conversations.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-3">
              Name Compatibility by Numerology: Sound Vibrations &amp; Name Energy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Beyond auditory phonetics, many people examine name compatibility by numerology. Each alphabet character holds a distinct numeric frequency according to Pythagorean and Chaldean traditions. The numerology of name compatibility evaluates these vibrational root numbers:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
              <li>
                <strong className="text-slate-800 font-semibold">Chaldean Name Vibrations:</strong> Focuses on the cosmic sound frequency of each spoken consonant and vowel.
              </li>
              <li>
                <strong className="text-slate-800 font-semibold">Pythagorean Expression Numbers:</strong> Calculates the energetic destiny number that both partners project into their union.
              </li>
              <li>
                <strong className="text-slate-800 font-semibold">Name Birthday Compatibility:</strong> Pairing your name root number with your life path birthday number provides deeper insight into personal relationship dynamics.
              </li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
              Want to calculate your exact numerological expression number? Try our dedicated <button type="button" onClick={() => onNavigate('/numerology/name-numerology/')} className="text-rose-600 font-semibold underline hover:text-rose-700">name numerology calculator</button> to see your Pythagorean and Chaldean number values.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-3">
              Online Name Compatibility Calculator vs. Name Compatibility Test on Paper
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Before modern digital tools, students and couples loved doing the name compatibility test on paper using the famous pen-and-paper letter crossing method. In that traditional technique, you write both names, tally letter occurrences with the word "LOVE", and sum adjacent digits until a two-digit percentage remains.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our digital compatibility check by name automates these phonetic formulas with instantaneous mathematical precision, giving you both detailed linguistic breakdowns and an instant printable match certificate. If you enjoy the nostalgia of hand calculations, explore our step-by-step <button type="button" onClick={() => onNavigate('/love-percentage-on-paper/')} className="text-rose-600 font-semibold underline hover:text-rose-700">love percentage on paper guide</button>.
            </p>
          </div>
        </div>

        {/* Additional couple match guidance */}
        <div className="pt-6 border-t border-rose-100 text-xs text-slate-600 leading-relaxed">
          <h4 className="font-bold text-slate-900 mb-2">Check Love Compatibility by Name: Practical Tips</h4>
          <p>
            When performing a compatibility check by name, consider both formal legal names and everyday nicknames. Looking for a traditional pen-and-paper experience? You can also try our classic <button type="button" onClick={() => onNavigate('/love-percentage-on-paper/')} className="text-rose-600 font-semibold underline hover:text-rose-700">love percentage on paper method</button> or explore numerical vibration through our <button type="button" onClick={() => onNavigate('/numerology/name-numerology/')} className="text-rose-600 font-semibold underline hover:text-rose-700">name numerology calculator</button>.
          </p>
        </div>
      </section>

      {/* Internal Linking & Next Steps */}
      <section className="bg-rose-50/50 rounded-3xl border border-rose-200/80 p-6 sm:p-8 mb-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-3">
          Explore Other Popular Love &amp; Compatibility Tests
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/love-calculator/')}
            className="p-4 rounded-2xl bg-white border border-rose-200 text-left hover:border-rose-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-rose-600 group-hover:text-rose-700 block mb-1">
              Master Love Calculator →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Our complete 4-pillar true love percentage tool with downloadable certificate.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/crush-calculator/')}
            className="p-4 rounded-2xl bg-white border border-rose-200 text-left hover:border-rose-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-rose-600 group-hover:text-rose-700 block mb-1">
              Crush Calculator →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Test secret crush chemistry and confession readiness between you and your crush.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/love-percentage-on-paper/')}
            className="p-4 rounded-2xl bg-white border border-rose-200 text-left hover:border-rose-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-rose-600 group-hover:text-rose-700 block mb-1">
              Paper Love Percentage →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Learn how to calculate love percentage on paper with step-by-step instructions.
            </p>
          </button>
        </div>
      </section>

      <RelatedTools currentToolId="name-compatibility" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-love-calculator-works', 'what-does-love-percentage-mean']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
