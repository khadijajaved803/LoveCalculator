import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { Hash, ArrowRight, ShieldCheck, Compass, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import numerologyImage from '../assets/images/numerology_sacred_path_1792219943804.jpg';

interface Props {
  onNavigate: (path: string) => void;
}

export const NumerologyPage: React.FC<Props> = ({ onNavigate }) => {
  const faqs = [
    {
      question: 'How do numbers influence relationship harmony in a Numerology Love Calculator?',
      answer:
        'In classical Pythagorean numerology, single-digit root numbers (1 to 9) represent energetic archetypes and behavioral temperaments. For example, numbers in the same triad (such as the creative 3-6-9 triad) share intuitive resonance, mutual communication ease, and complementary emotional pacing.',
    },
    {
      question: 'How do I calculate my Life Path Number for relationship compatibility?',
      answer:
        'To find your Life Path Number, add every individual digit of your full date of birth (Day + Month + Year) until reduced to a single digit (1-9) or a Master Number (11, 22, 33). For instance, 15 October 1998 reduces as 1+5 + 1+0 + 1+9+9+8 = 6 + 1 + 27 = 34 -> 3+4 = 7.',
    },
    {
      question: 'What are the Master Numbers in relationship numerology?',
      answer:
        'Master Numbers 11, 22, and 33 carry heightened spiritual and energetic potential. In love numerology, partners with Master Numbers possess intense emotional intuition, requiring empathetic communication and grounded everyday routines.',
    },
    {
      question: 'Which numerology system does CalculateLove reference?',
      answer:
        'We reference the authentic Pythagorean Life Path system for our date-of-birth tools, which reduces solar calendar dates to single root digits for balanced psychological reflections.',
    },
  ];

  const numberVibrations = [
    {
      num: 1,
      archetype: 'The Leader',
      trait: 'Independent, pioneering, visionary',
      idealMatches: '3, 5, 7',
      loveStyle: 'Direct, proactive, seeks a partner who respects personal independence and bold ambitions.',
    },
    {
      num: 2,
      archetype: 'The Diplomat',
      trait: 'Sensitive, harmonious, peacemaker',
      idealMatches: '2, 4, 6, 8',
      loveStyle: 'Gentle, emotionally attentive, thrives in supportive partnerships with deep emotional security.',
    },
    {
      num: 3,
      archetype: 'The Expressive',
      trait: 'Artistic, charismatic, spontaneous',
      idealMatches: '1, 3, 6, 9',
      loveStyle: 'Playful, joyful banter, brings social energy, humor, and creative romance to everyday dates.',
    },
    {
      num: 4,
      archetype: 'The Builder',
      trait: 'Dependable, structured, practical',
      idealMatches: '2, 4, 7, 8',
      loveStyle: 'Loyal, protective, builds solid financial foundations and values long-term commitment.',
    },
    {
      num: 5,
      archetype: 'The Explorer',
      trait: 'Free-spirited, dynamic, curious',
      idealMatches: '1, 3, 5, 7',
      loveStyle: 'Adventurous, loves spontaneous travel, thrives with an open-minded and adaptable partner.',
    },
    {
      num: 6,
      archetype: 'The Caretaker',
      trait: 'Loving, supportive, family-centric',
      idealMatches: '2, 3, 6, 9',
      loveStyle: 'Nurturing, creates warm family harmony, highly protective, and prioritizes household peace.',
    },
    {
      num: 7,
      archetype: 'The Seeker',
      trait: 'Analytical, reflective, intuitive',
      idealMatches: '1, 4, 5, 7',
      loveStyle: 'Thoughtful, values intellectual conversations, and needs meaningful quiet time alongside love.',
    },
    {
      num: 8,
      archetype: 'The Manifestor',
      trait: 'Ambitious, resilient, goal-driven',
      idealMatches: '2, 4, 6, 8',
      loveStyle: 'Generous, visionary, supportive of partner’s career ambitions, and values shared triumphs.',
    },
    {
      num: 9,
      archetype: 'The Humanitarian',
      trait: 'Compassionate, generous, wise',
      idealMatches: '3, 6, 9',
      loveStyle: 'Selfless, deeply empathetic, connects over shared human values, artistic passions, and ideals.',
    },
  ];

  const triads = [
    {
      title: 'The Intellectual & Freedom Triad (1 - 5 - 7)',
      focus: 'Mind, Curiosity & Personal Liberty',
      desc: 'Driven by visionary ideas and exploration. Partners in this triad give each other healthy breathing space, enjoy deep debates, and never feel trapped.',
      badge: 'Vision & Autonomy',
      color: 'border-indigo-200 bg-indigo-50/50 text-indigo-900',
    },
    {
      title: 'The Practical & Manifesting Triad (2 - 4 - 8)',
      focus: 'Stability, Security & Dependability',
      desc: 'The bedrock of lasting long-term partnerships. They excel at managing household finances, nurturing family ties, and creating dependable routines.',
      badge: 'Grounded Stability',
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
    },
    {
      title: 'The Creative & Nurturing Triad (3 - 6 - 9)',
      focus: 'Emotion, Art & Universal Compassion',
      desc: 'The heart-centered resonance. They bond through humor, artistic pursuits, hospitality, caring for loved ones, and celebrating every small milestone.',
      badge: 'Warmth & Creativity',
      color: 'border-rose-200 bg-rose-50/50 text-rose-900',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Numerology Love Calculator & Life Path Compatibility Hub',
    url: 'https://calculatelove.online/numerology/',
    description: 'Explore numerology love compatibility, Life Path number resonance, and Pythagorean name vibration principles on CalculateLove.',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Numerology Love Calculator - Life Path Compatibility Hub | CalculateLove"
        description="Explore numerology love compatibility, Life Path numbers 1-9, and birth date vibration principles with CalculateLove. Calculate your relationship numbers."
        canonicalPath="/numerology/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Numerology Hub' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-3 border border-purple-200">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Pythagorean Relationship Mathematics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Numerology & Life Path Compatibility Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          The mathematical language of dates and names. Discover how birth date numbers, numerical archetypes, and harmonic triads align in romantic relationships.
        </p>
      </div>

      {/* Featured Banner with SEO-optimized generated artwork */}
      <div className="rounded-3xl overflow-hidden border border-purple-200 bg-slate-900 text-white shadow-md mb-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="p-8 sm:p-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Sacred Geometry & Vibration</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display leading-tight">
              Life Path Numbers: The Sacred Geometry of Love
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every date of birth contains a numerical signature. By reducing birthdays to single root digits (1 to 9), numerology reveals emotional temperament, instinctive communication styles, and natural romantic chemistry.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/love-calculator-by-date-of-birth/')}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Calculate Your Life Path Match</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="h-64 md:h-full aspect-4/3 overflow-hidden bg-slate-950 flex items-center justify-center">
            <img
              src={numerologyImage}
              alt="Sacred geometry numerology wheel with glowing golden numbers 1 to 9 and cosmic celestial nebula"
              className="w-full h-full object-cover opacity-95 transition-transform duration-500 hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Hero Action Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-1.5 text-rose-600 text-xs font-semibold">
            <Compass className="w-4 h-4" />
            <span>Interactive Numerology Love Calculator Available</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
            Test Your Date of Birth Compatibility Now
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Enter your birthday and your partner&apos;s birthday to compute your Life Path numbers, check mutual elemental harmony, and download your personalized compatibility certificate.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/love-calculator-by-date-of-birth/')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Calculate Birth Numbers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* The 3 Core Harmony Triads */}
      <section className="mb-14">
        <div className="mb-6">
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
            Numerology Resonance System
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            The Three Compatibility Triads
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pythagorean numerology groups numbers into three harmonic triads. When partners belong to the same triad, communication feels effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {triads.map((t, idx) => (
            <div key={idx} className={`p-5 rounded-2xl border ${t.color} flex flex-col justify-between`}>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/80 text-[10px] font-bold uppercase tracking-wide mb-2.5 shadow-2xs">
                  {t.badge}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{t.title}</h3>
                <p className="text-[11px] font-semibold text-purple-900/80 mb-2">{t.focus}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Archetypes Grid with Dating Profiles */}
      <section className="mb-14">
        <div className="mb-6">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
            Numbers 1 Through 9
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Life Path Archetypes in Love & Relationships
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Explore the romantic profile, relationship temperament, and ideal matches for each core root number.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {numberVibrations.map((n) => (
            <div
              key={n.num}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-xs transition-all space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-bold font-mono flex items-center justify-center text-xs">
                      {n.num}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{n.archetype}</span>
                  </div>
                  <span className="text-[10px] text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-full">
                    Ideal: {n.idealMatches}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 mb-1.5">{n.trait}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{n.loveStyle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Master Numbers Explainer */}
      <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-50/60 to-rose-50/40 border border-purple-200 shadow-2xs">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-600" />
          <span>Understanding Master Numbers (11, 22, 33) in Love</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          When birthday digits sum up to 11, 22, or 33, they are often preserved as Master Numbers rather than reduced to single digits. These individuals carry heightened intuition and profound relationship devotion:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
            <span className="font-bold text-purple-700 block mb-1">Master Number 11: The Intuitive</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Highly sensitive with psychic empathy. They sense partner moods instantly and crave emotional vulnerability.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
            <span className="font-bold text-purple-700 block mb-1">Master Number 22: The Master Builder</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Turns romantic dreams into reality. They build enduring security, beautiful homes, and reliable partnership routines.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
            <span className="font-bold text-purple-700 block mb-1">Master Number 33: The Master Teacher</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Expresses unconditional love and emotional generosity, uplifting their partner and broader community with compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed mb-12 shadow-2xs">
        <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Transparent Mathematical Methodology</span>
        </h3>
        <p>
          CalculateLove uses standard Pythagorean numerical reduction. Numerology serves as an empowering psychological mirror to understand natural communication temperaments, rather than fatalistic dogma. Real relationship success thrives on everyday kindness, mutual respect, and intentional emotional presence.
        </p>
      </div>

      <RelatedTools currentToolId="numerology" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['love-compatibility-by-date-of-birth', 'how-love-calculator-works']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
