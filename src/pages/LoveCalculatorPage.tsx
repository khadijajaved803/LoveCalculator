import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResultCard } from '../components/ResultCard';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { EngagementInputs } from '../components/EngagementInputs';
import { CalculationLoader } from '../components/CalculationLoader';
import { calculateLoveScore } from '../lib/calculatorEngine';
import { CompatibilityResult } from '../types';
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Percent,
  CheckCircle2,
  Users,
  Compass,
  Zap,
  ArrowRight,
  HelpCircle,
  Award,
  Download,
} from 'lucide-react';
import loveCertificateImage from '../assets/images/love_certificate_showcase_1792223212819.jpg';

interface Props {
  onNavigate: (path: string) => void;
}

export const LoveCalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [bondType, setBondType] = useState('Dating');
  const [vibe, setVibe] = useState('Chai & Late Night Talks');

  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both your name and your partner’s name.');
      return;
    }
    setError('');
    setIsCalculating(true);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setAge1('');
    setAge2('');
    setResult(null);
    setIsCalculating(false);
    setError('');
  };

  const faqs = [
    {
      question: 'How is love compatibility calculated between two names?',
      answer:
        'CalculateLove implements a deterministic character harmonic algorithm. It evaluates letter frequencies, consonant-to-vowel ratios, and phonetic sound energy between both names. Paired with your couple vibe and age dynamic, it provides a stable, reproducible compatibility score without random fluctuation.',
    },
    {
      question: 'Can I use this tool as a crush love calculator or couple name compatibility test?',
      answer:
        'Yes. Whether you want to test compatibility with a secret crush, check boyfriend-girlfriend chemistry, or verify couple harmony with a partner, this name match calculator evaluates mutual phonetic resonance and relationship dynamics accurately.',
    },
    {
      question: 'What is the difference between Love Calculator by Name and Love Percentage Calculator?',
      answer:
        'They represent the same core mathematical evaluation! This master tool combines phonetic name harmonics with a 4-pillar dimensional percentage breakdown (Communication, Emotional Care, Passion, and Longevity) so you get the complete picture in one place.',
    },
    {
      question: 'How does an online love test compare to calculating love percentage on paper?',
      answer:
        'Paper calculations rely on nostalgic pen-and-paper addition grids, whereas CalculateLove uses advanced phonetic character harmonics and multidimensional relationship factors. Both are fun ways to explore love matching between two names.',
    },
    {
      question: 'Kya online love calculator ka score 100% accurate hota hai?',
      answer:
        'Hamara algorithm mathematically deterministic hai—iska matlab agar aap same naam enter karenge toh hamesha identical percentage milega. Yeh ek scientific-style entertainment model hai. Real life mein kisi bhi relation ka future dono partners ke trust, empathy, aur open communication par depend karta hai.',
    },
    {
      question: 'How does this test distinguish True Love from temporary attraction?',
      answer:
        'Infatuation is largely chemical and fleeting, whereas true love emphasizes emotional safety, mutual vulnerability, shared life values, and supportive humor. Our analysis highlights emotional security alongside passion.',
    },
    {
      question: 'Is my personal data saved or shared?',
      answer:
        'Zero personal data is stored. Every calculation executes exclusively inside your local web browser. Your names, ages, and relationship vibes never leave your device.',
    },
    {
      question: 'Can I share the generated Love Certificate on WhatsApp Status?',
      answer:
        'Yes! Simply tap "Share Card on WhatsApp" or "Save PNG" on your result card to download a high-resolution 1080×1350 certificate optimized for WhatsApp Status and Instagram Stories.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'True Love Calculator by Name & Love Percentage Compatibility Test',
    'url': 'https://calculatelove.online/love-calculator/',
    'description': 'Master love calculator by name, true love percentage meter, and relationship compatibility test. 100% free, private, and deterministic.',
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Love Calculator - True Love Percentage by Name & Compatibility Test"
        description="Calculate true love percentage between two names with CalculateLove. Test name compatibility, couple vibes, communication harmony, and download shareable love cards."
        canonicalPath="/love-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Love Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-3 border border-rose-200/80">
          <Sparkles className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>All-In-One Master Love Compatibility Platform</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          True Love Calculator by Name & Love Percentage Test
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          Test real love percentage, character sound harmony, and 4-pillar relationship compatibility between two names. Fast, deterministic, and 100% private.
        </p>
      </div>

      {/* Wide Calculator Dashboard (Width-Optimized Desktop, Clean Stacked Mobile) */}
      <div className="w-full mb-8 sm:mb-10">
        {isCalculating ? (
          <CalculationLoader
            name1={name1}
            name2={name2}
            type="love"
            onComplete={() => {
              const res = calculateLoveScore(name1, name2, 'general', {
                age1,
                age2,
                bondType,
                vibe,
              });
              setResult(res);
              setIsCalculating(false);
            }}
          />
        ) : !result ? (
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-lg p-4 sm:p-6 md:p-7 pb-5 sm:pb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

            <form onSubmit={handleCalculate} className="space-y-4 sm:space-y-5">
              {/* Row 1: Names & Ages spread across width on desktop (4 columns on lg) */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3.5">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 font-display">
                      Enter Couple Details
                    </h2>
                    <p className="text-xs text-slate-500">
                      Phonetic vibration matching based on letters & vowels
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                    <Sparkles className="w-3 h-3 text-rose-500" />
                    <span>Deterministic Match</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="min-w-0">
                    <label htmlFor="p1Name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="p1Name"
                      type="text"
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      placeholder="e.g. Aarav"
                      maxLength={40}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="p2Name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Partner&apos;s / Crush Name
                    </label>
                    <input
                      id="p2Name"
                      type="text"
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      placeholder="e.g. Ananya"
                      maxLength={40}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="p1Age" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Age (Optional)
                    </label>
                    <input
                      id="p1Age"
                      type="number"
                      min="13"
                      max="99"
                      value={age1}
                      onChange={(e) => setAge1(e.target.value)}
                      placeholder="e.g. 23"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="p2Age" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Partner Age (Optional)
                    </label>
                    <input
                      id="p2Age"
                      type="number"
                      min="13"
                      max="99"
                      value={age2}
                      onChange={(e) => setAge2(e.target.value)}
                      placeholder="e.g. 24"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Dynamics & Personalization (Stage & Vibe in 2 columns across width) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-50/40 border border-rose-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Current Stage */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="mobileBondSelect" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Current Bond Stage
                      </label>
                      <span className="text-[10px] text-slate-400 hidden sm:inline">Select stage</span>
                    </div>

                    {/* Mobile Dropdown (space-saving) */}
                    <div className="block sm:hidden">
                      <select
                        id="mobileBondSelect"
                        value={bondType}
                        onChange={(e) => setBondType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:border-rose-500 min-h-[42px]"
                      >
                        <option value="Crush">Crush 🤫</option>
                        <option value="Dating">Dating 💖</option>
                        <option value="Best Friends">Besties 🥰</option>
                        <option value="Planning Marriage">Engaged 💍</option>
                        <option value="Married">Married 🏠</option>
                      </select>
                    </div>

                    {/* Desktop Interactive Pills */}
                    <div className="hidden sm:flex flex-wrap gap-1.5">
                      {[
                        { id: 'Crush', label: 'Crush 🤫' },
                        { id: 'Dating', label: 'Dating 💖' },
                        { id: 'Best Friends', label: 'Besties 🥰' },
                        { id: 'Planning Marriage', label: 'Engaged 💍' },
                        { id: 'Married', label: 'Married 🏠' },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBondType(b.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all min-h-[34px] ${
                            bondType === b.id
                              ? 'bg-rose-600 text-white font-bold shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Couple Vibe */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="mobileVibeSelect" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Favourite Couple Vibe
                      </label>
                      <span className="text-[10px] text-slate-400 hidden sm:inline">Select vibe</span>
                    </div>

                    {/* Mobile Dropdown (space-saving) */}
                    <div className="block sm:hidden">
                      <select
                        id="mobileVibeSelect"
                        value={vibe}
                        onChange={(e) => setVibe(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:border-rose-500 min-h-[42px]"
                      >
                        <option value="Chai & Late Night Talks">Chai & Late Night Talks ☕</option>
                        <option value="Spontaneous Long Drives">Spontaneous Long Drives 🚗</option>
                        <option value="Movie & Food Marathons">Food & Movie Marathons 🍕</option>
                        <option value="Chill & Sukoon">Quiet Sukoon & Peace ✨</option>
                      </select>
                    </div>

                    {/* Desktop Segmented Buttons */}
                    <div className="hidden sm:grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'Chai & Late Night Talks', label: 'Chai & Talks ☕', desc: 'Deep heart talks' },
                        { id: 'Spontaneous Long Drives', label: 'Long Drives 🚗', desc: 'Road trips' },
                        { id: 'Movie & Food Marathons', label: 'Food & Movies 🍕', desc: 'Cozy weekend' },
                        { id: 'Chill & Sukoon', label: 'Quiet Sukoon ✨', desc: 'Peace & trust' },
                      ].map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVibe(v.id)}
                          className={`p-2 rounded-xl text-left border transition-all text-xs ${
                            vibe === v.id
                              ? 'border-rose-500 bg-white text-rose-900 shadow-xs ring-1 ring-rose-300 font-semibold'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="font-semibold block truncate text-[11px]">{v.label}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{v.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium text-center">{error}</p>}

              {/* Row 3: Action Button at the end of the system with snug spacing */}
              <div className="pt-2 flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full max-w-md py-3.5 px-8 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-700 hover:to-pink-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md shadow-rose-600/20 min-h-[48px]"
                >
                  <span>Calculate Love Compatibility</span>
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Deterministic formula · 100% private in your browser</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <ResultCard result={result} onReset={handleReset} onShare={() => {}} />
        )}
      </div>

      {/* SEO Authority Section 1: How Name Vibrations & Vowel Frequency Work */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 mb-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-2">
              Naam Se Love Match
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-4">
              How Name-Based Love Compatibility Works (Naam Se Pyar Check Karein)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Name compatibility testing traces back through Pythagorean numerology, phonetic acoustics, and sound vibration theory. When two names are pronounced together, their rhythmic synergy forms an audible and emotional cadence.
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Consonant & Vowel Ratios:</strong> Names sharing harmonic vowel placements naturally produce comfortable verbal rhythm and conversational ease.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Symmetric Invariance:</strong> Entering Person A + Person B produces the identical mathematical result as Person B + Person A.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Age & Stage Balancing:</strong> Life stage preferences influence communication styles and long-term partnership goals.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Compatibility Percentage Scale
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-white rounded-xl border border-rose-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-rose-600">88% – 99%</span>
                  <p className="text-[11px] text-slate-500">Unmatched Chemistry & Mutual Sukoon</p>
                </div>
                <span className="text-[11px] bg-rose-50 text-rose-700 font-semibold px-2 py-0.5 rounded-full">Exceptional</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-pink-600">75% – 87%</span>
                  <p className="text-[11px] text-slate-500">Harmonious Partnership & Deep Trust</p>
                </div>
                <span className="text-[11px] bg-pink-50 text-pink-700 font-semibold px-2 py-0.5 rounded-full">Very High</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-600">60% – 74%</span>
                  <p className="text-[11px] text-slate-500">Complementary Opposites & Playful Banter</p>
                </div>
                <span className="text-[11px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full">Balanced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Showcase: Official Love Compatibility Certificate Card */}
      <section className="bg-gradient-to-br from-rose-50/60 via-white to-pink-50/50 rounded-3xl border border-rose-200/90 p-6 sm:p-8 md:p-10 mb-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Certificate Image Frame */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-200/80 bg-slate-950">
              <img
                src={loveCertificateImage}
                alt="Personalized Love Compatibility Certificate Card with official seals and calligraphy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Certificate</span>
              </div>
            </div>
            <p className="text-center text-[11px] text-slate-500 mt-2 font-medium italic">
              Example of the free downloadable Love Compatibility Certificate
            </p>
          </div>

          {/* Text & Features */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Free High-Resolution Photo Card</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
              Generate & Download Your Love Compatibility Certificate Card
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When you calculate your compatibility on CalculateLove, you get more than a basic score. You unlock a beautifully rendered <strong>Love Compatibility Certificate</strong> containing your names in romantic calligraphy, mutual love percentage, cosmic relationship verdict, and 4-pillar balance ratings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-semibold">Instant Social Status Card</strong>
                  <span className="text-slate-500 text-[11px]">Formatted in 1080×1350 for WhatsApp Status, Snapchat, and Instagram Stories.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-semibold">100% Private & Deterministic</strong>
                  <span className="text-slate-500 text-[11px]">Calculated directly in your browser. No names or results are stored on any server.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-semibold">Multi-Pillar Insights</strong>
                  <span className="text-slate-500 text-[11px]">Individual scores for communication ease, emotional security, romantic passion, and longevity.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-semibold">One-Tap Direct Share</strong>
                  <span className="text-slate-500 text-[11px]">Download as PNG image or directly share a secure link with your partner or friends.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md shadow-rose-600/20 min-h-[44px]"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Calculate Compatibility & Download Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Authority Section 2: 4 Pillars of Real Love Percentage */}
      <section className="bg-gradient-to-br from-white via-rose-50/20 to-white rounded-3xl border border-rose-200 p-6 sm:p-8 md:p-10 mb-12 shadow-sm">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-2">
            Multi-Dimensional Analysis
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            What Does Your Love Percentage Score Actually Measure?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Rather than generating a flat, mysterious number, CalculateLove breaks down your relationship compatibility across four psychological pillars:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-3">
              💬
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">Communication</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Ease of daily dialogue, shared humor, mutual listening, and the ability to express feelings without fear.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold mb-3">
              🛡️
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">Emotional Safety</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Sukoon in silence, protective care, non-judgmental acceptance, and deep reassurance in difficult moments.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
              🔥
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">Passion & Chemistry</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Romantic spark, butterflies, emotional attraction, and spontaneous excitement when spending time together.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
              🤝
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">Long-Term Companionship</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Aligned future vision, conflict resolution capacity, mutual life respect, and shared family values.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Authority Section 3: Real Love vs. Temporary Infatuation (Asli Pyaar Test) */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 mb-12 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-3 border border-rose-500/30">
            Psychological Insight: Asli Pyaar Test
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display mb-4 text-balance">
            Real Love vs Temporary Crush: How to Know It’s Genuine
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            A common question when testing a love meter is: <em>&quot;Is this genuine love or just intense infatuation?&quot;</em> Understanding the distinction helps couples build lasting relationships rather than chasing temporary dopamine highs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Infatuation (Crush / Attraction)
              </h3>
              <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Obsession with an idealized version of the person</li>
                <li>Anxiety about their quick reply and constant validation</li>
                <li>Hiding flaws out of fear of rejection</li>
                <li>Driven primarily by physical attraction and excitement</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                True Love (Sukoon & Partnership)
              </h3>
              <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Accepting their real strengths, quirks, and imperfections</li>
                <li>Peace, emotional calmness, and security when together</li>
                <li>Honest discussions about boundaries and future plans</li>
                <li>Supporting each other’s personal growth and independence</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Specialized Calculators */}
      <RelatedTools currentToolId="love-calculator" onNavigate={onNavigate} />

      {/* Editorial Articles */}
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-love-calculator-works', 'what-does-love-percentage-mean', 'what-is-a-soulmate']}
      />

      {/* Comprehensive FAQ Section */}
      <FAQSection faqs={faqs} />
    </div>
  );
};
