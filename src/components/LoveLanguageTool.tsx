import React, { useState } from 'react';
import {
  ADULT_QUESTIONS,
  TEEN_QUESTIONS,
  CHILD_QUESTIONS,
  LoveLanguageKey,
  scoreLoveLanguageQuiz,
  analyzeCoupleLoveLanguages,
  LoveLanguageQuizResult,
  CoupleCompatibilityResult,
  QuizQuestion,
} from '../lib/loveLanguageEngine';
import { LoveLanguageResultCard } from './LoveLanguageResultCard';
import { CalculationLoader } from './CalculationLoader';
import {
  Heart,
  Users,
  Smile,
  Baby,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

export type QuizAudienceMode = 'adult' | 'couples' | 'teen' | 'child';

export const LoveLanguageTool: React.FC = () => {
  const [mode, setMode] = useState<QuizAudienceMode>('adult');
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');

  // Quiz progress state
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 to questions.length - 1
  const [currentPartnerTaking, setCurrentPartnerTaking] = useState<1 | 2>(1);

  // Answers storage
  const [partner1Answers, setPartner1Answers] = useState<Record<number, LoveLanguageKey>>({});
  const [partner2Answers, setPartner2Answers] = useState<Record<number, LoveLanguageKey>>({});

  // Loading & Result state
  const [isCalculating, setIsCalculating] = useState(false);
  const [singleResult, setSingleResult] = useState<LoveLanguageQuizResult | null>(null);
  const [couplesResult, setCouplesResult] = useState<CoupleCompatibilityResult | null>(null);

  // Get active questions based on mode
  const getQuestions = (): QuizQuestion[] => {
    switch (mode) {
      case 'teen':
        return TEEN_QUESTIONS;
      case 'child':
        return CHILD_QUESTIONS;
      case 'couples':
      case 'adult':
      default:
        return ADULT_QUESTIONS;
    }
  };

  const questions = getQuestions();
  const currentQ = questions[currentStep];

  const currentAnswers = currentPartnerTaking === 1 ? partner1Answers : partner2Answers;

  const handleStart = () => {
    setStarted(true);
    setCurrentStep(0);
    setCurrentPartnerTaking(1);
    setPartner1Answers({});
    setPartner2Answers({});
    setSingleResult(null);
    setCouplesResult(null);
  };

  const handleAnswerSelect = (language: LoveLanguageKey) => {
    if (!currentQ) return;

    if (currentPartnerTaking === 1) {
      const updated = { ...partner1Answers, [currentQ.id]: language };
      setPartner1Answers(updated);

      if (currentStep + 1 < questions.length) {
        setTimeout(() => setCurrentStep((prev) => prev + 1), 220);
      } else {
        // Partner 1 finished
        if (mode === 'couples') {
          // Switch to Partner 2
          setTimeout(() => {
            setCurrentPartnerTaking(2);
            setCurrentStep(0);
          }, 300);
        } else {
          // Finished single quiz
          finishQuiz(updated, {});
        }
      }
    } else {
      // Partner 2 answering in couples mode
      const updated = { ...partner2Answers, [currentQ.id]: language };
      setPartner2Answers(updated);

      if (currentStep + 1 < questions.length) {
        setTimeout(() => setCurrentStep((prev) => prev + 1), 220);
      } else {
        // Both finished
        finishQuiz(partner1Answers, updated);
      }
    }
  };

  const finishQuiz = (
    p1Ans: Record<number, LoveLanguageKey>,
    p2Ans: Record<number, LoveLanguageKey>
  ) => {
    setIsCalculating(true);
    const res1 = scoreLoveLanguageQuiz(p1Ans, questions);

    if (mode === 'couples') {
      const res2 = scoreLoveLanguageQuiz(p2Ans, questions);
      const coupleRes = analyzeCoupleLoveLanguages(
        partner1Name || 'Partner 1',
        partner2Name || 'Partner 2',
        res1,
        res2
      );
      setCouplesResult(coupleRes);
      setSingleResult(res1);
    } else {
      setSingleResult(res1);
      setCouplesResult(null);
    }
  };

  const handleRetake = () => {
    setStarted(false);
    setCurrentStep(0);
    setCurrentPartnerTaking(1);
    setPartner1Answers({});
    setPartner2Answers({});
    setSingleResult(null);
    setCouplesResult(null);
  };

  const progressPct = questions.length > 0
    ? Math.round(((currentStep + 1) / questions.length) * 100)
    : 0;

  return (
    <div className="w-full">
      {/* ─── Calculating Loader ─── */}
      {isCalculating && (
        <CalculationLoader
          name1={partner1Name || (mode === 'child' ? 'Child' : 'Your')}
          name2={mode === 'couples' ? (partner2Name || 'Partner') : 'Love Language'}
          type="love"
          minDuration={1800}
          maxDuration={2400}
          onComplete={() => setIsCalculating(false)}
        />
      )}

      {/* ─── Finished Result View ─── */}
      {!isCalculating && singleResult && (
        <LoveLanguageResultCard
          personName={
            mode === 'couples'
              ? `${partner1Name || 'Partner 1'} & ${partner2Name || 'Partner 2'}`
              : partner1Name || (mode === 'child' ? 'Child' : undefined)
          }
          result={singleResult}
          couplesData={couplesResult}
          onRetake={handleRetake}
        />
      )}

      {/* ─── Quiz Intake or Question Step ─── */}
      {!isCalculating && !singleResult && (
        <div className="bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden">
          {/* Top Decorative Header */}
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500 p-6 sm:p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
                <span>100% Free · No Sign-Up · Free Results</span>
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display mb-2">
                Love Language Test
              </h2>

              <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-medium">
                Take the free love language quiz — find your love language in about 5 minutes, with free results.
              </p>
            </div>
          </div>

          {/* ─── Intake Screen (Mode Selection & Names) ─── */}
          {!started ? (
            <div className="p-5 sm:p-8 max-w-2xl mx-auto">
              {/* Audience Mode Switcher Tabs */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Select Quiz Version
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode('adult')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      mode === 'adult'
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xs font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Heart className="w-5 h-5 mx-auto mb-1 text-rose-500" />
                    <span className="text-xs block font-semibold">Adults</span>
                    <span className="text-[10px] text-slate-400">15 Pairs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('couples')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      mode === 'couples'
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xs font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                    <span className="text-xs block font-semibold">Couples</span>
                    <span className="text-[10px] text-slate-400">Compare Both</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('teen')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      mode === 'teen'
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xs font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Smile className="w-5 h-5 mx-auto mb-1 text-indigo-500" />
                    <span className="text-xs block font-semibold">Teens</span>
                    <span className="text-[10px] text-slate-400">10 Simpler</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('child')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      mode === 'child'
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xs font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Baby className="w-5 h-5 mx-auto mb-1 text-amber-500" />
                    <span className="text-xs block font-semibold">Children</span>
                    <span className="text-[10px] text-slate-400">Parent-Guided</span>
                  </button>
                </div>
              </div>

              {/* Name Inputs */}
              <div className="space-y-4 mb-6">
                {mode === 'couples' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Partner 1 Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul"
                        value={partner1Name}
                        onChange={(e) => setPartner1Name(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Partner 2 Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Priya"
                        value={partner2Name}
                        onChange={(e) => setPartner2Name(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden text-sm transition-all"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      {mode === 'child' ? "Child's Name (Optional)" : 'Your Name (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder={mode === 'child' ? 'e.g. Aarav' : 'e.g. Ananya'}
                      value={partner1Name}
                      onChange={(e) => setPartner1Name(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden text-sm transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Explanatory bullet points */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Gary Chapman's 5 Languages:</strong> Words, Acts, Gifts, Time & Touch.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Forced-Choice:</strong> Pick the statement that feels truer to you.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Instant Results:</strong> Full chart + 1 concrete action for your partner.</span>
                </div>
              </div>

              {/* Start Button */}
              <button
                type="button"
                onClick={handleStart}
                className="w-full py-4 px-6 rounded-2xl text-center text-sm sm:text-base font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-700 hover:to-pink-700 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 min-h-[52px]"
              >
                <span>Start Free Love Language Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* ─── Active Quiz Question Interface ─── */
            <div className="p-5 sm:p-8 max-w-2xl mx-auto">
              {/* Partner Indicator in Couples Mode */}
              {mode === 'couples' && (
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
                  <Users className="w-3.5 h-3.5" />
                  <span>
                    Now Answering: {currentPartnerTaking === 1 ? (partner1Name || 'Partner 1') : (partner2Name || 'Partner 2')}
                  </span>
                </div>
              )}

              {/* Progress Bar & Counter */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
                  <span>Question {currentStep + 1} of {questions.length}</span>
                  <span className="text-rose-600">{progressPct}% Complete</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Question Card & Instructions */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                  Which makes you feel more loved?
                </h3>
                <p className="text-xs text-slate-500">
                  Pick the statement in this pair that resonates most with your heart:
                </p>
              </div>

              {/* Pair of Options */}
              {currentQ && (
                <div className="space-y-3 mb-6">
                  {/* Option A */}
                  <button
                    type="button"
                    onClick={() => handleAnswerSelect(currentQ.optionA.language)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all active:scale-[0.99] flex items-start gap-3.5 ${
                      currentAnswers[currentQ.id] === currentQ.optionA.language
                        ? 'border-rose-500 bg-rose-50/70 text-rose-900 shadow-sm'
                        : 'border-slate-200 hover:border-rose-300 hover:bg-slate-50/70 text-slate-800'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-rose-600 shrink-0 mt-0.5 shadow-xs">
                      A
                    </span>
                    <span className="text-sm sm:text-base font-medium leading-relaxed">
                      {currentQ.optionA.text}
                    </span>
                  </button>

                  {/* Option B */}
                  <button
                    type="button"
                    onClick={() => handleAnswerSelect(currentQ.optionB.language)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all active:scale-[0.99] flex items-start gap-3.5 ${
                      currentAnswers[currentQ.id] === currentQ.optionB.language
                        ? 'border-rose-500 bg-rose-50/70 text-rose-900 shadow-sm'
                        : 'border-slate-200 hover:border-rose-300 hover:bg-slate-50/70 text-slate-800'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-rose-600 shrink-0 mt-0.5 shadow-xs">
                      B
                    </span>
                    <span className="text-sm sm:text-base font-medium leading-relaxed">
                      {currentQ.optionB.text}
                    </span>
                  </button>
                </div>
              )}

              {/* Navigation Controls (Back button & Restart) */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <button
                  type="button"
                  disabled={currentStep === 0 && currentPartnerTaking === 1}
                  onClick={() => {
                    if (currentStep > 0) {
                      setCurrentStep((prev) => prev - 1);
                    } else if (currentPartnerTaking === 2) {
                      setCurrentPartnerTaking(1);
                      setCurrentStep(questions.length - 1);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 font-semibold py-2 px-3 rounded-xl transition-colors ${
                    currentStep === 0 && currentPartnerTaking === 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={handleRetake}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors py-2 px-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
