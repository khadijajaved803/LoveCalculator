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
  Heart,
  Sparkles,
  RotateCcw,
  Eye,
  MessageCircle,
  Share2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Download,
  Copy,
  Check,
} from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const CrushCalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const [yourName, setYourName] = useState('');
  const [crushName, setCrushName] = useState('');
  const [crushStage, setCrushStage] = useState('Mutual Eye Contact & Smiles');
  const [talkFrequency, setTalkFrequency] = useState('We Talk Almost Daily');

  const [result, setResult] = useState<ReturnType<typeof calculateLoveScore> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleDownloadCard = async () => {
    if (!result) return;
    setDownloading(true);
    setNotice(null);
    try {
      const blob = await generateCardImageBlob({
        type: 'crush',
        names: { person1: yourName, person2: crushName },
        score: result.score,
        tagline: result.hinglishTagline || 'Secret Crush Connection',
        suggestion: result.hinglishSuggestion || result.summary,
        tip: result.hinglishTip || 'Watch for subtle smiles and shared glances.',
        details: `Crush Test · Chemistry: ${result.breakdown.passion}% · Communication: ${result.breakdown.communication}%`,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Crush-Certificate-${yourName}-${crushName}.png`;
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
        type: 'crush',
        names: { person1: yourName, person2: crushName },
        score: result.score,
        tagline: result.hinglishTagline || 'Secret Crush Connection',
        suggestion: result.hinglishSuggestion || result.summary,
        tip: result.hinglishTip || 'Watch for subtle smiles and shared glances.',
        details: `Crush Test · Chemistry: ${result.breakdown.passion}%`,
      });
      const file = new File([blob], `${yourName}-${crushName}-crush-card.png`, { type: 'image/png' });
      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Crush Compatibility Certificate',
          text: `Check out our crush compatibility score on CalculateLove! https://calculatelove.online/crush-calculator/`,
        });
      } else {
        const text = encodeURIComponent(`We got a ${result.score}% Crush Compatibility Score on CalculateLove! Check yours: https://calculatelove.online/crush-calculator/`);
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
    if (!yourName.trim() || !crushName.trim()) {
      setError('Please enter both your name and your crush’s name.');
      return;
    }
    setError('');
    setIsCalculating(true);
  };

  const handleReset = () => {
    setYourName('');
    setCrushName('');
    setCrushStage('Mutual Eye Contact & Smiles');
    setTalkFrequency('We Talk Almost Daily');
    setResult(null);
    setIsCalculating(false);
    setError('');
  };

  const faqs = [
    {
      question: 'How does the Crush Calculator calculate crush compatibility?',
      answer:
        'The Crush Calculator combines phonetic name resonance with behavioral interaction dynamics. It evaluates letter vibrations, shared vowels, and your day-to-day communication frequency to produce a deterministic crush compatibility percentage and confession readiness meter.',
    },
    {
      question: 'What is a crush detector and how does it find mutual attraction?',
      answer:
        'A crush detector evaluates behavioral hints—such as lingering eye contact, spontaneous texting, body language mirroring, and mutual banter. Our crush finder algorithm factors these interaction levels alongside character sound harmony to detect romantic affinity.',
    },
    {
      question: 'Is your crush really meant for you according to the crush simulator?',
      answer:
        'While our crush simulator provides an entertaining phonetic and behavioral match score, true romantic compatibility develops over time through mutual trust, vulnerability, shared values, and honest communication.',
    },
    {
      question: 'Is my crush calculator result kept private?',
      answer:
        'Yes, 100% private. All calculations run strictly in your web browser. Neither your name nor your crush’s name is ever sent to or stored on any server.',
    },
    {
      question: 'What is the secret crush calculator score?',
      answer:
        'The secret crush score indicates romantic spark, mutual conversational comfort, and the psychological likelihood that your crush reciprocates interest based on your current dynamic.',
    },
    {
      question: 'How can I know who is my crush or if they like me back?',
      answer:
        'Key signs include consistent eye contact, mirroring your gestures, finding excuses to sit or walk near you, remembering small details you mentioned, and quick replies to your messages.',
    },
    {
      question: 'Should I confess my feelings if I get a high crush score?',
      answer:
        'A high score is a fun encouragement! If you feel safe, comfortable, and share genuine warm banter in real life, taking a gentle step like inviting them for chai or coffee is a wonderful way to see where things lead.',
    },
  ];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Crush Calculator - Check Your Crush Compatibility & Love Score',
    url: 'https://calculatelove.online/crush-calculator/',
    description:
      'Free crush calculator and secret crush test. Check crush compatibility percentage, confession readiness, and phonetic name match.',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Crush Calculator - Check Your Crush Compatibility & Love Score"
        description="Calculate crush compatibility percentage between you and your crush. Test secret crush vibes, confession readiness, and phonetic name harmony at CalculateLove."
        canonicalPath="/crush-calculator/"
        schemaJson={schemaJson}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Crush Calculator' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold mb-3 border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Secret Crush & Chemistry Meter</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          Crush Calculator – Check Your Crush Compatibility
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          Discover your secret crush compatibility percentage, mutual chemistry vibes, and confession readiness between two names.
        </p>
      </div>

      {/* Calculator Form / Loader / Result */}
      <div className="w-full mb-12">
        {isCalculating ? (
          <CalculationLoader
            name1={yourName}
            name2={crushName}
            type="love"
            onComplete={() => {
              const res = calculateLoveScore(yourName, crushName, 'general', {
                bondType: 'Crush',
                vibe: crushStage,
              });
              setResult(res);
              setIsCalculating(false);
            }}
          />
        ) : !result ? (
          <div className="bg-white rounded-3xl border border-pink-200/90 shadow-lg p-5 sm:p-7 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400" />

            <form onSubmit={handleCalculate} className="space-y-5">
              <div className="border-b border-slate-100 pb-3 mb-2">
                <h2 className="text-base font-extrabold text-slate-900 font-display">
                  Enter Your Crush Details
                </h2>
                <p className="text-xs text-slate-500">
                  Analyze secret crush chemistry, phonetic harmony, and conversational pacing
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="yourNameInput" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="yourNameInput"
                    type="text"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    placeholder="e.g. Maya"
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 min-h-[42px]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="crushNameInput" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Crush’s Name
                  </label>
                  <input
                    id="crushNameInput"
                    type="text"
                    value={crushName}
                    onChange={(e) => setCrushName(e.target.value)}
                    placeholder="e.g. Rohan"
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 min-h-[42px]"
                    required
                  />
                </div>
              </div>

              {/* Crush Dynamics */}
              <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="crushStageSelect" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Current Crush Dynamic
                    </label>
                    <select
                      id="crushStageSelect"
                      value={crushStage}
                      onChange={(e) => setCrushStage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 min-h-[42px]"
                    >
                      <option value="Secret Crush from Afar">Secret Crush from Afar</option>
                      <option value="Mutual Eye Contact & Smiles">Mutual Eye Contact &amp; Smiles</option>
                      <option value="Casual Friends & Banter">Casual Friends &amp; Banter</option>
                      <option value="Late Night Texting & Memes">Late Night Texting &amp; Memes</option>
                      <option value="Definite Mutual Sparks">Definite Mutual Sparks</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="talkFrequencySelect" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      How Often Do You Interact?
                    </label>
                    <select
                      id="talkFrequencySelect"
                      value={talkFrequency}
                      onChange={(e) => setTalkFrequency(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 min-h-[42px]"
                    >
                      <option value="We Talk Almost Daily">We Talk Almost Daily</option>
                      <option value="A Few Times a Week">A Few Times a Week</option>
                      <option value="Only in Group Settings">Only in Group Settings</option>
                      <option value="Just Smiles & Passing Looks">Just Smiles &amp; Passing Looks</option>
                      <option value="Haven't Spoken Yet">Haven&apos;t Spoken Yet</option>
                    </select>
                  </div>
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-600/20 transition-all flex items-center justify-center gap-2 min-h-[46px]"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Calculate Crush Compatibility</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-pink-200/90 shadow-lg p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block mb-1">
                  Crush Compatibility Result
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                  {yourName} &amp; {crushName}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Test Another Crush</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 text-center space-y-2">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
                  Crush Score
                </span>
                <div className="text-5xl font-extrabold text-pink-600 font-display">
                  {result.score}%
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  {result.grade}
                </p>
              </div>

              <div className="md:col-span-2 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Relationship Vibe &amp; Insight
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {result.summary}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block text-[11px]">Chemistry Spark</span>
                    <strong className="text-slate-900 font-semibold">{result.breakdown.passion}%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block text-[11px]">Emotional Ease</span>
                    <strong className="text-slate-900 font-semibold">{result.breakdown.communication}%</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Crush Tip for {yourName}:</strong>
                <span>
                  {result.hinglishTip || 'Notice subtle cues in conversation. Shared smiles and genuine curiosity are the strongest initial signs of reciprocal affection.'}
                </span>
              </div>
            </div>

            {/* Certificate Download & Social Share Actions */}
            <div className="p-4 sm:p-5 rounded-2xl bg-pink-50/60 border border-pink-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Download Official Crush Certificate Card
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    High-resolution 1080×1350 card designed for WhatsApp Status, Snapchat &amp; Instagram Stories
                  </p>
                </div>
              </div>

              {notice && (
                <p className="text-xs text-pink-700 font-semibold bg-pink-100/60 p-2 rounded-xl">
                  {notice}
                </p>
              )}

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  disabled={downloading}
                  className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
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

      {/* Guide Content: Signs Your Crush Likes You Back */}
      <section className="bg-white rounded-3xl border border-pink-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block mb-2">
            Crush Psychology &amp; Detection
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            Crush Detector: 5 Signs to Know If Your Crush Is Really Meant for You
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Wondering &quot;who is my crush&quot; or &quot;is your crush really meant for you&quot;? Use our crush finder and crush detector guide to interpret everyday body language and conversational vibes before using the crush simulator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">1. Extended Eye Contact &amp; Quick Smiles</h3>
            <p className="text-slate-600 leading-relaxed">
              When someone has feelings for you, they instinctively look your way across rooms and hold eye contact slightly longer than casual acquaintances.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">2. Subconscious Physical Mirroring</h3>
            <p className="text-slate-600 leading-relaxed">
              People who feel mutual attraction unconsciously copy your posture, hand gestures, and tone of voice during conversations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">3. Remembering Minor Details</h3>
            <p className="text-slate-600 leading-relaxed">
              If your crush recalls your favorite chai order, a story you told weeks ago, or a family detail, they are paying intentional emotional attention.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">4. Finding Excuses to Be Close</h3>
            <p className="text-slate-600 leading-relaxed">
              Whether picking an adjacent seat in class, joining your break table, or asking simple questions, proximity is a classic crush indicator.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Linking: Compare with Other Tools */}
      <section className="bg-gradient-to-br from-pink-50/60 to-rose-50/40 rounded-3xl border border-pink-200 p-6 sm:p-8 mb-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-2">
          Want a Deeper Look Beyond Crush Attraction?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          Explore our other free relationship tools to test deeper compatibility:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/love-calculator/')}
            className="p-4 rounded-2xl bg-white border border-pink-200 text-left hover:border-pink-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-pink-600 group-hover:text-pink-700 block mb-1">
              True Love Calculator →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Evaluate 4-pillar compatibility including communication, emotional security, and longevity.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/flames-calculator/')}
            className="p-4 rounded-2xl bg-white border border-pink-200 text-left hover:border-pink-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-pink-600 group-hover:text-pink-700 block mb-1">
              FLAMES Name Game →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Play letter-cancellation to see if your crush is meant for Friends, Lovers, or Marriage.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/love-percentage-on-paper/')}
            className="p-4 rounded-2xl bg-white border border-pink-200 text-left hover:border-pink-300 transition-colors shadow-2xs group"
          >
            <span className="text-xs font-bold text-pink-600 group-hover:text-pink-700 block mb-1">
              Love Percentage on Paper →
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Step-by-step notebook guide to calculating love percentage using pen and paper.
            </p>
          </button>
        </div>
      </section>

      {/* Related Tools & Articles */}
      <RelatedTools currentToolId="crush-calculator" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['what-does-love-percentage-mean', 'how-love-calculator-works', 'what-is-a-soulmate']}
      />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </div>
  );
};
