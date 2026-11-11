export type LoveLanguageKey = 'words' | 'acts' | 'gifts' | 'time' | 'touch';

export interface LoveLanguageInfo {
  key: LoveLanguageKey;
  name: string;
  shortName: string;
  iconName: string;
  color: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  summary: string;
  whatItMeans: string;
  whatFillsItUp: string;
  weeklyAction: string;
  giveTip: string;
}

export const LOVE_LANGUAGES: Record<LoveLanguageKey, LoveLanguageInfo> = {
  words: {
    key: 'words',
    name: 'Words of Affirmation',
    shortName: 'Words',
    iconName: 'MessageCircle',
    color: '#E11D48',
    gradient: 'from-rose-500 to-pink-500',
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-700',
    summary: 'Words are your proof of love. Verbal compliments, unsolicited praise, and genuine appreciation make your heart full.',
    whatItMeans: 'For you, love is communicated most clearly through spoken and written words. An "I love you," a heartfelt compliment, or a simple text saying "I am so proud of you" reassures you deeply. Insults, harsh words, or prolonged silence hurt you more than others.',
    whatFillsItUp: 'Spontaneous loving texts during the day, handwritten notes, specific compliments on your effort, and hearing your partner say thank you for the things you do.',
    weeklyAction: 'Ask your partner: "Could you send me a sweet text during your day or tell me one specific thing you appreciate about me this week?"',
    giveTip: 'If your partner has Words of Affirmation, leave a small sticky note by their coffee or send an unexpected message saying why they matter to you.',
  },
  acts: {
    key: 'acts',
    name: 'Acts of Service',
    shortName: 'Service',
    iconName: 'Wrench',
    color: '#D97706',
    gradient: 'from-amber-500 to-orange-500',
    badgeBg: 'bg-amber-50 border-amber-200',
    badgeText: 'text-amber-700',
    summary: 'Love is a verb. When someone eases your burden, fixes what is broken, or steps up without asking, you feel truly cherished.',
    whatItMeans: 'You believe actions speak louder than words. Broken promises, laziness, or creating more chores for you feels like a lack of care. When your partner notices a need and quietly fulfills it, your emotional tank overflows.',
    whatFillsItUp: 'Making coffee before you wake up, taking over a chore you dread, filling the car with petrol, or handling an annoying task without being reminded.',
    weeklyAction: 'Ask your partner: "Could you help take care of [one specific task] this week without me having to remind or organize it?"',
    giveTip: 'If your partner has Acts of Service, find one chore they dislike doing and surprise them by doing it thoroughly before they even notice.',
  },
  gifts: {
    key: 'gifts',
    name: 'Receiving Gifts',
    shortName: 'Gifts',
    iconName: 'Gift',
    color: '#7C3AED',
    gradient: 'from-purple-500 to-indigo-500',
    badgeBg: 'bg-purple-50 border-purple-200',
    badgeText: 'text-purple-700',
    summary: 'Visual symbols of love and remembrance. It is never about the price tag — it is about the thought, effort, and being remembered.',
    whatItMeans: 'A gift in this language represents the giver’s mind: "He or she was thinking of me while we were apart." Forgetting a special occasion or giving a completely thoughtless gesture hurts because it feels like inattention, not materialism.',
    whatFillsItUp: 'A favorite snack picked up on a whim, a book on a subject you recently mentioned, a souvenir shell from a morning walk, or a beautifully wrapped token.',
    weeklyAction: 'Ask your partner: "Next time you stop by a store, bring me a small surprise treat or snack you know I love — it means so much to me."',
    giveTip: 'If your partner has Receiving Gifts, keep a running notes list on your phone of small things they admire or mention, and surprise them on an ordinary Tuesday.',
  },
  time: {
    key: 'time',
    name: 'Quality Time',
    shortName: 'Time',
    iconName: 'Clock',
    color: '#0284C7',
    gradient: 'from-sky-500 to-blue-500',
    badgeBg: 'bg-sky-50 border-sky-200',
    badgeText: 'text-sky-700',
    summary: 'Undivided, phone-free attention. Eye contact, deep conversations, shared experiences, and genuinely being present together.',
    whatItMeans: 'Being together in the same room is not enough if your eyes are glued to your screen. What you crave is focused presence: listening without interrupting, walking side by side, and sharing moments where neither of you is distracted.',
    whatFillsItUp: 'A 20-minute phone-free conversation, an evening walk together, cooking a meal side by side, or exploring a new place on the weekend.',
    weeklyAction: 'Ask your partner: "Can we have a 30-minute phone-free dinner or evening walk tonight where we just connect and catch up?"',
    giveTip: 'If your partner has Quality Time, put your phone face down on silent when they talk to you, look into their eyes, and ask an open-ended question about their day.',
  },
  touch: {
    key: 'touch',
    name: 'Physical Touch',
    shortName: 'Touch',
    iconName: 'HeartHandshake',
    color: '#E11D48',
    gradient: 'from-pink-500 to-rose-600',
    badgeBg: 'bg-pink-50 border-pink-200',
    badgeText: 'text-pink-700',
    summary: 'Warmth, closeness, and gentle reassurance. Hugs, holding hands, touches on the arm, and physical presence anchor your security.',
    whatItMeans: 'To you, physical presence and accessible touch speak louder than compliments or gifts. A warm hug after a long day melts stress immediately. Physical neglect or receiving harsh body language signals emotional distance.',
    whatFillsItUp: 'Holding hands while walking, sitting close on the couch, an unhurried morning hug, a gentle massage, or placing a hand on their shoulder in passing.',
    weeklyAction: 'Ask your partner: "Can you give me a warm, unhurried 30-second hug before we start our day or right when we get home?"',
    giveTip: 'If your partner has Physical Touch, reach out and hold their hand when sitting together, or offer a gentle shoulder rub when they look tired.',
  },
};

export interface QuizQuestion {
  id: number;
  optionA: {
    text: string;
    language: LoveLanguageKey;
  };
  optionB: {
    text: string;
    language: LoveLanguageKey;
  };
}

// ─── Adults / Couples Question Set (15 paired forced-choice questions) ────────
export const ADULT_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    optionA: { text: 'My partner sends me a sweet, unexpected text during a busy day.', language: 'words' },
    optionB: { text: 'My partner quietly takes care of a chore I was dreading.', language: 'acts' },
  },
  {
    id: 2,
    optionA: { text: 'My partner puts away their phone and gives me 100% undivided attention.', language: 'time' },
    optionB: { text: 'My partner brings me a small, thoughtful surprise they saw and thought of me.', language: 'gifts' },
  },
  {
    id: 3,
    optionA: { text: 'My partner wraps me in a warm, comforting hug when I come through the door.', language: 'touch' },
    optionB: { text: 'My partner looks into my eyes and tells me they are proud of who I am.', language: 'words' },
  },
  {
    id: 4,
    optionA: { text: 'My partner makes my favorite breakfast or coffee without me asking.', language: 'acts' },
    optionB: { text: 'My partner remembers a small item I admired weeks ago and gives it to me.', language: 'gifts' },
  },
  {
    id: 5,
    optionA: { text: 'We take a long, peaceful walk together with zero interruptions.', language: 'time' },
    optionB: { text: 'My partner holds my hand or sits close enough that our shoulders touch.', language: 'touch' },
  },
  {
    id: 6,
    optionA: { text: 'My partner gives me sincere praise in front of our friends or family.', language: 'words' },
    optionB: { text: 'My partner brings home my favorite snack or drink just to make me smile.', language: 'gifts' },
  },
  {
    id: 7,
    optionA: { text: 'My partner steps in to fix something that has been stressing me out.', language: 'acts' },
    optionB: { text: 'We spend an entire uninterrupted evening enjoying an activity together.', language: 'time' },
  },
  {
    id: 8,
    optionA: { text: 'My partner puts their arm around me or gently massages my neck when I am tired.', language: 'touch' },
    optionB: { text: 'My partner gives me a thoughtful souvenir from a place they visited.', language: 'gifts' },
  },
  {
    id: 9,
    optionA: { text: 'My partner writes a heartfelt card or letter telling me what I mean to them.', language: 'words' },
    optionB: { text: 'My partner plans an entire relaxing date night just for the two of us.', language: 'time' },
  },
  {
    id: 10,
    optionA: { text: 'My partner helps me pack, organize, or prepare for a busy upcoming day.', language: 'acts' },
    optionB: { text: 'My partner holds my hand across the table or cuddles close on the sofa.', language: 'touch' },
  },
  {
    id: 11,
    optionA: { text: 'My partner compliments how I look or notices a subtle positive change.', language: 'words' },
    optionB: { text: 'My partner fuels up my car or handles an errand I was putting off.', language: 'acts' },
  },
  {
    id: 12,
    optionA: { text: 'We share deep, open-hearted conversations about our dreams and feelings.', language: 'time' },
    optionB: { text: 'My partner surprises me with a small, beautifully wrapped gift for no reason.', language: 'gifts' },
  },
  {
    id: 13,
    optionA: { text: 'A gentle touch on my cheek or back when walking past each other at home.', language: 'touch' },
    optionB: { text: 'My partner thanks me out loud for the little ways I care for our relationship.', language: 'words' },
  },
  {
    id: 14,
    optionA: { text: 'My partner prepares something nourishing when I am feeling under the weather.', language: 'acts' },
    optionB: { text: 'My partner gives me something tangible that proves they truly know my tastes.', language: 'gifts' },
  },
  {
    id: 15,
    optionA: { text: 'Going on an exciting weekend trip or adventure together, just us two.', language: 'time' },
    optionB: { text: 'Falling asleep holding hands or curled up close to one another.', language: 'touch' },
  },
];

// ─── Teen Question Set (10 simpler questions) ─────────────────────────────────
export const TEEN_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    optionA: { text: 'Someone texts me a compliment or tells me they believe in me.', language: 'words' },
    optionB: { text: 'A friend or family member helps me study or finish a hard project.', language: 'acts' },
  },
  {
    id: 2,
    optionA: { text: 'Hanging out together one-on-one with no phones in our faces.', language: 'time' },
    optionB: { text: 'Getting a surprise snack or small treat someone picked up for me.', language: 'gifts' },
  },
  {
    id: 3,
    optionA: { text: 'A warm hug, high-five, or pat on the back when I achieve something.', language: 'touch' },
    optionB: { text: 'Hearing someone say: "You did such an amazing job on that!"', language: 'words' },
  },
  {
    id: 4,
    optionA: { text: 'Someone gives me a ride or carries something heavy for me.', language: 'acts' },
    optionB: { text: 'Someone gives me a cool sticker, playlist, or item they made for me.', language: 'gifts' },
  },
  {
    id: 5,
    optionA: { text: 'Spending an entire afternoon playing games or talking about life.', language: 'time' },
    optionB: { text: 'A reassuring hug when I am stressed out about exams or life.', language: 'touch' },
  },
  {
    id: 6,
    optionA: { text: 'Someone leaves a supportive comment or note praising my talents.', language: 'words' },
    optionB: { text: 'Receiving a thoughtful birthday or holiday present I really wanted.', language: 'gifts' },
  },
  {
    id: 7,
    optionA: { text: 'Someone cleans up a mess with me or covers my shift/task.', language: 'acts' },
    optionB: { text: 'Sitting together and listening to music together without distractions.', language: 'time' },
  },
  {
    id: 8,
    optionA: { text: 'Someone puts their arm over my shoulder to make me feel included.', language: 'touch' },
    optionB: { text: 'Someone remembers my favorite chocolate and gives it to me.', language: 'gifts' },
  },
  {
    id: 9,
    optionA: { text: 'Hearing someone defend me or say kind things behind my back.', language: 'words' },
    optionB: { text: 'Going out to our favorite café or park for quality time together.', language: 'time' },
  },
  {
    id: 10,
    optionA: { text: 'Someone helps me fix my phone, bike, or organize my messy room.', language: 'acts' },
    optionB: { text: 'Cuddling with family/friends during a cozy movie night.', language: 'touch' },
  },
];

// ─── Child Question Set (10 parent-guided prompts) ────────────────────────────
export const CHILD_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    optionA: { text: 'Your child beams when you say: "You are so smart and kind! I love you so much."', language: 'words' },
    optionB: { text: 'Your child loves when you help them build a complex LEGO set or tie their shoes.', language: 'acts' },
  },
  {
    id: 2,
    optionA: { text: 'Your child asks: "Mom/Dad, come play with me right now in my room!"', language: 'time' },
    optionB: { text: 'Your child treasures small stickers, little rocks, or treats you bring home.', language: 'gifts' },
  },
  {
    id: 3,
    optionA: { text: 'Your child loves sitting in your lap, cuddling, or holding your hand.', language: 'touch' },
    optionB: { text: 'Your child asks for praise: "Look what I drew! Do you love it?"', language: 'words' },
  },
  {
    id: 4,
    optionA: { text: 'Your child appreciates when you fix their broken toy or make their special snack.', language: 'acts' },
    optionB: { text: 'Your child loves unwrapping small surprise packages or party favors.', language: 'gifts' },
  },
  {
    id: 5,
    optionA: { text: 'Your child wants you to sit on the floor and read stories together without rushing.', language: 'time' },
    optionB: { text: 'Your child gives you big bedtime hugs and kisses and asks for back rubs.', language: 'touch' },
  },
  {
    id: 6,
    optionA: { text: 'Your child responds best when you whisper encouraging words before school.', language: 'words' },
    optionB: { text: 'Your child collects and proudly displays little toys or tokens they were gifted.', language: 'gifts' },
  },
  {
    id: 7,
    optionA: { text: 'Your child feels secure when you help them clean their room or pack their backpack.', language: 'acts' },
    optionB: { text: 'Your child begs for a trip to the park just with you, one-on-one.', language: 'time' },
  },
  {
    id: 8,
    optionA: { text: 'Your child leans against you when tired or holds your finger while walking.', language: 'touch' },
    optionB: { text: 'Your child is excited when you surprise them with their favorite fruit or juice.', language: 'gifts' },
  },
  {
    id: 9,
    optionA: { text: 'Your child repeats the nice compliments you gave them days later.', language: 'words' },
    optionB: { text: 'Your child values you watching their game or performance without looking at your phone.', language: 'time' },
  },
  {
    id: 10,
    optionA: { text: 'Your child is comforted when you nurse them or care for them when sick.', language: 'acts' },
    optionB: { text: 'Your child asks for tickles, gentle wrestling, or gentle hugs.', language: 'touch' },
  },
];

export interface LanguageScore {
  key: LoveLanguageKey;
  score: number; // Raw count
  percentage: number; // Normalized to 100%
  info: LoveLanguageInfo;
}

export interface LoveLanguageQuizResult {
  scores: LanguageScore[]; // Ranked tallest first
  topLanguage: LoveLanguageInfo;
  secondLanguage: LoveLanguageInfo;
  gap: number; // Difference between 1st and 2nd percentage
  isCloseCall: boolean;
  totalQuestions: number;
}

export function scoreLoveLanguageQuiz(
  answers: Record<number, LoveLanguageKey>,
  questions: QuizQuestion[]
): LoveLanguageQuizResult {
  const counts: Record<LoveLanguageKey, number> = {
    words: 0,
    acts: 0,
    gifts: 0,
    time: 0,
    touch: 0,
  };

  const answeredIds = Object.keys(answers).map(Number);
  answeredIds.forEach((id) => {
    const lang = answers[id];
    if (lang && counts[lang] !== undefined) {
      counts[lang] += 1;
    }
  });

  const totalAnswered = Math.max(1, answeredIds.length);

  const scores: LanguageScore[] = (Object.keys(counts) as LoveLanguageKey[]).map((key) => {
    const count = counts[key];
    const pct = Math.round((count / totalAnswered) * 100);
    return {
      key,
      score: count,
      percentage: pct,
      info: LOVE_LANGUAGES[key],
    };
  });

  // Sort descending by score
  scores.sort((a, b) => b.score - a.score || b.percentage - a.percentage);

  // Normalize percentages so they sum to exactly 100%
  const currentSum = scores.reduce((sum, s) => sum + s.percentage, 0);
  if (currentSum !== 100 && scores.length > 0) {
    scores[0].percentage += 100 - currentSum;
  }

  const topLanguage = scores[0].info;
  const secondLanguage = scores[1].info;
  const gap = scores[0].percentage - scores[1].percentage;
  const isCloseCall = gap <= 10;

  return {
    scores,
    topLanguage,
    secondLanguage,
    gap,
    isCloseCall,
    totalQuestions: questions.length,
  };
}

export interface CoupleCompatibilityResult {
  partner1Name: string;
  partner2Name: string;
  result1: LoveLanguageQuizResult;
  result2: LoveLanguageQuizResult;
  isSameLanguage: boolean;
  matchInsight: string;
  partner1ActionFor2: string;
  partner2ActionFor1: string;
}

export function analyzeCoupleLoveLanguages(
  p1Name: string,
  p2Name: string,
  res1: LoveLanguageQuizResult,
  res2: LoveLanguageQuizResult
): CoupleCompatibilityResult {
  const lang1 = res1.topLanguage.key;
  const lang2 = res2.topLanguage.key;
  const isSame = lang1 === lang2;

  let matchInsight = '';
  if (isSame) {
    matchInsight = `Both of you share the same primary love language: ${res1.topLanguage.name}! This creates an intuitive, natural connection because what satisfies one partner directly satisfies the other. Your biggest growth area is ensuring you do not neglect the remaining four languages during stressful weeks.`;
  } else {
    matchInsight = `${p1Name}'s primary language is ${res1.topLanguage.name}, while ${p2Name}'s primary language is ${res2.topLanguage.name}. This is the most common and beautiful relationship dynamic! It simply means ${p1Name} hears love through ${res1.topLanguage.shortName.toLowerCase()}, while ${p2Name} feels it most through ${res2.topLanguage.shortName.toLowerCase()}. When both of you intentionally speak the other's language, you eliminate emotional misunderstandings completely.`;
  }

  return {
    partner1Name: p1Name || 'Partner 1',
    partner2Name: p2Name || 'Partner 2',
    result1: res1,
    result2: res2,
    isSameLanguage: isSame,
    matchInsight,
    partner1ActionFor2: `For ${p1Name} to speak ${p2Name}'s language: ${res2.topLanguage.giveTip}`,
    partner2ActionFor1: `For ${p2Name} to speak ${p1Name}'s language: ${res1.topLanguage.giveTip}`,
  };
}
