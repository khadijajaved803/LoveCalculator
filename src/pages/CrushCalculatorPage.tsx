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

import crushCalculatorDoesMyCrushLikeMeImage from '../assets/images/crush-calculator-does-my-crush-like-me.webp';
import crushCalculatorSecretCrushDetectorImage from '../assets/images/crush-calculator-secret-crush-detector.webp';

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
          Take the crush test to discover your secret crush compatibility percentage, mutual chemistry vibes, and confession readiness between two names.
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

      {/* How the crush quiz works */}
      <section className="bg-white rounded-3xl border border-pink-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block mb-2">
            Crush Quiz &amp; Test
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            Crush Quiz: What This Crush Test Actually Checks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The tool above is a short crush quiz. The crush test behind it asks very little:
            two names, and the dynamic between you — a secret crush from afar, mutual smiles
            across the room, late-night texting. From that it returns a crush compatibility
            score with a chemistry spark reading, an emotional ease reading, and a confession
            readiness meter. The whole thing runs in your browser, takes under a minute, and
            never sends either name anywhere.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
            Most people arrive with a does my crush like me quiz in mind. The quiz answers from
            the dynamic you described: a high score means the warmth you described already runs
            both ways in how you two act, and a low score usually means distance so far, not a
            closed door. When the worry is whether the feeling comes back, run the test as a
            does my crush like me back quiz and read the score against the replies, the smiles,
            and the excuses to be near you. And if you came here through a
            does my crush have feelings for me quiz, the score is still the thing to read,
            because the test looks at the replies and the smiles, not at the wording of the
            question. When you already know how you feel, the question flips — and a
            does your crush like you quiz reads the signs from their side: the replies, the
            smiles, the excuses to be near you.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
            At the earliest stage, when you are not even sure the feeling has a name yet, a
            do i have a crush quiz gives you a score for the dynamic — and a quiet result
            usually matches a crush that is still mostly in your own head. An am i in love quiz
            comes later, when the feeling has lasted long enough to ask whether it has grown
            past a crush. The tool cannot answer that — love shows over weeks of how someone
            treats you, not in a score — but a high score does tell you the dynamic is warm
            enough to be worth finding out. A do i love him quiz sits between the two: the test
            reads the two names and the dynamic, and what you do with the answer — a
            conversation, a coffee, a little more time — is where the real question gets
            settled. And if all you want to know is do you like your crush, a quick
            do you like your crush quiz gives you a number for the dynamic and lets you
            decide what the number means.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
            If you want a quick test for crush compatibility, the tool above takes under a
            minute — the crush questions inside it are the three choices above the button: the
            names, the dynamic, and the way you talk. Short crush quizzes like this one work
            because they ask so little, and the result is a crush compatibility test in the full
            sense: a score, two readings, and a tip for what to do next. If the score comes
            back strong and you want a longer view, the{' '}
            <a
              href="/love-calculator/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/love-calculator/');
              }}
              className="text-pink-600 hover:underline font-semibold"
            >
              love calculator
            </a>
            {' '}runs the same two names through a four-pillar compatibility read. And once you
            know the feeling is shared, the{' '}
            <a
              href="/love-language-test/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/love-language-test/');
              }}
              className="text-pink-600 hover:underline font-semibold"
            >
              Love Language Test
            </a>
            {' '}shows how the two of you express affection day to day.
          </p>
        </div>
      </section>

      <figure className="my-8">
        <img
          src={crushCalculatorDoesMyCrushLikeMeImage}
          alt="Watercolor classroom scene with the title 'Does My Crush Like Me?' — a young woman glancing across the room at a smiling young man"
          width="1200"
          height="675"
          loading="lazy"
          className="w-full rounded-2xl object-cover"
        />
        <figcaption className="mt-2 text-center text-xs text-slate-500">
          The question behind the test — a glance across the room is usually where a crush starts.
        </figcaption>
      </figure>

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

          <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">5. They Text First and Keep Talking</h3>
            <p className="text-slate-600 leading-relaxed">
              A crush who starts conversations, replies quickly, and asks follow-up questions is showing more than politeness — they are looking for reasons to stay in touch.
            </p>
          </div>
        </div>
      </section>

      {/* How to read the signs */}
      <section className="bg-white rounded-3xl border border-pink-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block mb-2">
            Reading the Signs Together
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            How to Know If Someone Has a Crush on You
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            How can you tell someone has a crush on you? One sign on its own proves very
            little — anyone can hold eye contact once or remember one detail. What matters is
            the pattern: the same person showing up in your eyeline, remembering things you
            mentioned, replying fast, and finding reasons to be near you, day after day. That
            is how to know if someone has a crush on you — not from a single moment, but from
            several small ones pointing the same way. Read together, those small moments are
            the signs someone has a crush on you, and they are worth more than any single grand
            gesture.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
            How do you know if your crush likes you back? Start with replies: do they answer
            quickly, ask follow-up questions, and keep the conversation going after it could
            have ended? Then look at proximity: do they choose the seat near you, join your
            table, or find small reasons to talk? When both are true, the answer is usually
            yes — and the test above will generally agree with you. That is also
            how to tell if your crush likes you back without asking outright: watch what they
            do over a week, not what they say in one conversation. The question
            does my crush like me back is answered the same way — by the pattern, not by one
            moment — and if the question is how to know if my crush likes me, the answer is
            the pattern above, not any single sign.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
            A does he love me quiz asks a bigger question than a crush test can settle. A crush
            is attraction and attention; love is what shows over weeks — consistency, care when
            things are dull, remembering what matters to you. The signs overlap, which is why
            the two questions get confused, but a high score here means the attraction is real,
            not that love has already arrived. If the question is will my crush like me, the
            honest answer is that nobody can promise it — what you can do is watch whether the
            dynamic is warming, and let the score tell you where it stands today.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
            Some readers flip the question around and run a who has a crush on me quiz — the
            person who has noticed someone acting warmly and wants to know who it is. The way
            to use it is to run the names of the people you suspect one by one through the test
            above, and see whose score stands out. Behind the who has a crush on me question is
            usually one person you already suspect. The who is crushing on me version works the
            same way — the signs are the ones in the section above, read from the other side —
            and a will your crush like you quiz is only worth taking once you have a name in
            mind, because without one there is nothing for the test to read.
          </p>
        </div>
      </section>

      {/* Secret crush detector */}
      <section className="bg-white rounded-3xl border border-pink-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block mb-2">
            Detector, Horoscope &amp; Astrology
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            Secret Crush Detector: What It Can and Cannot Tell You
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A secret crush detector sounds like a device that reads minds. What this page
            actually does is simpler: it reads the two names you type and the dynamic you pick,
            and turns them into a score, two readings, and a tip. A secret crush calculator
            asks for two names and gives back a number. That is what the tool above does, with
            a score, two readings, and a tip attached. The crush detector on this page runs
            entirely in your browser. There is no secret crush detector app to download, no
            account to make, and both names stay on your device.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
            The astrology version of the question looks somewhere else entirely. A
            secret crush astrology reading looks at birth dates and star signs instead of
            names — it asks what the day favours for your sign, not what the person across the
            room thinks of you. A secret crush horoscope works the same way, by sign and by
            day, and neither one can see the dynamic between two real people. The tool here
            does not read stars, and it does not pretend to. If you want the star-based read,
            the{' '}
            <a
              href="/love-horoscope/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/love-horoscope/');
              }}
              className="text-pink-600 hover:underline font-semibold"
            >
              Love Horoscope
            </a>
            {' '}page gives the day&apos;s love reading by sign, and you can compare what it
            says with what the names say here.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
            Underneath the detector talk sits a simpler question: is my crush meant for me? No
            test can answer that outright — being meant for each other is something two people
            build, not something a score declares. What the detector can show is whether the
            dynamic you described already looks mutual, which is the closest a test can get to
            an answer.
          </p>
        </div>
      </section>

      <figure className="my-8 mx-auto max-w-md">
        <img
          src={crushCalculatorSecretCrushDetectorImage}
          alt="Watercolor scene with the title 'Secret Crush Detector' — a glowing phone with pink hearts rising from its screen beside a handwritten secret note"
          width="1120"
          height="2240"
          loading="lazy"
          className="w-full rounded-2xl object-cover"
        />
        <figcaption className="mt-2 text-center text-xs text-slate-500">
          No app, no account — the detector runs right here in your browser.
        </figcaption>
      </figure>

      {/* Code names and crush games */}
      <section className="bg-white rounded-3xl border border-pink-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-12">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block mb-2">
            Code Names &amp; Games
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
            Code Names for Your Crush — and the Crush Games People Play
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Most people with a crush invent a code name for them. Code names for crushes exist
            for one practical reason: you need to talk about the person in a group chat without
            the person — or anyone else — knowing who you mean. Code names for your crush work
            best when they come from a shared detail — a food they love, a place you met, the
            initials of their name — because a code name built on a memory is easy to remember
            and hard for outsiders to crack. A codename for crush usually runs to one word — a
            snack, a colour, a place — short enough to type fast when they walk into the room.
            A crush name that means nothing to anyone else is doing its job. When the code name
            stops being a secret and starts being affectionate, it has become a crush nickname.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
            Then there are the games. Most of them are group quizzes built around a
            my crush game: everyone answers, and the reveal is the fun. The how many people
            have a crush on me format is the classic one — the group guesses, the number comes
            out, and someone blushes. A how many people have a crush on me quiz adds a score
            to the guessing, which is why it travels so well in group chats, and the
            how many people have a crush on you version asks the whole group instead of one
            person. The how many people have crushes on you version counts admirers instead of
            naming one, which is why it works as a party game and not as a test. This page
            works differently: it checks one crush at a time, with a score for the dynamic
            rather than a count of admirers. The first question in every version is the same —
            who is your crush — and the tool above starts there too, with the name field. The
            trickiest version is the do i have a crush on my friend quiz, because a friend
            crush carries a real friendship underneath it. The test reads the dynamic the way
            it reads any other — the difference is only in what you do with a high score. As
            for games to play with your crush, the honest ones are simple — a quiz you both
            take, a question game over text — because the point is a conversation, not a
            result. If you want the game version of the same two names, the{' '}
            <a
              href="/flames-calculator/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/flames-calculator/');
              }}
              className="text-pink-600 hover:underline font-semibold"
            >
              FLAMES calculator
            </a>
            {' '}plays them through a letter game instead of a score.
          </p>
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
