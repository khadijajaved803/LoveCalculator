/**
 * Daily Rashifal Engine
 *
 * Implements:
 * 1. Deterministic Daily Seed based on Today's Date (YYYY-MM-DD)
 *    Ensures predictions refresh each day and remain constant throughout that day.
 * 2. 12 Signs Daily Love Reading, General Outlook, Mood, and Lucky Number (Ank).
 * 3. Supports 3 lookup modes:
 *    - Date of Birth (Sun Sign / Rashi calculation)
 *    - Direct Sign selector (Pick one of 12 signs)
 *    - Name phonetic classification (Avakahada Janmakshar)
 */

import { ALL_ZODIAC_SIGNS, getSunSignByDob, ZodiacSignDetails } from './zodiacEngine';
import { getNakshatraFromName } from './kundaliEngine';

export type RashifalMode = 'dob' | 'sign' | 'name';

export interface DailySignPrediction {
  sign: ZodiacSignDetails;
  todayDateStr: string;
  loveReading: string;
  generalReading: string;
  luckyNumber: number;
  luckyColor: string;
  mood: string;
  compatibilityWith: string;
}

// Pool of daily love reflections for variety across days
const LOVE_REFLECTIONS = [
  'Express what you feel plainly and with sincerity; your honesty will dissolve lingering doubts.',
  'A calm, affectionate conversation over tea or coffee brings unexpected closeness.',
  'Patience is your strongest romantic ally today. Give your partner room to share their thoughts.',
  'A thoughtful small gesture — a kind text or small compliment — resonates much deeper than grand displays.',
  'Vulnerability turns into mutual strength. Open up about what you have been keeping to yourself.',
  'Shared humor and lighthearted banter rekindle vibrant chemistry today.',
  'Emotional balance is key: listen with curiosity instead of rushing to formulate answers.',
  'Loyalty and quiet support shine bright. Show up reliably and let your actions speak.',
  'Romantic intuition is high today. Trust your inner feelings regarding a developing relationship.',
  'An old shared memory brings warmth and mutual smiles. Revisit what brought you together.',
  'A harmonious planetary transit invites romantic surprises. Keep your schedule flexible.',
  'Gentle clarity clears away assumptions. Speak your heart without fear of misunderstanding.',
];

const GENERAL_REFLECTIONS = [
  'Energy and focus run high today. Tackle the main task you have been putting off.',
  'Steady progress beats impulsive haste. Methodical effort yields lasting satisfaction.',
  'An encouraging message or fruitful conversation brightens your mid-day momentum.',
  'Prioritize your personal well-being and rest; taking care of your vitality pays dividends.',
  'Your natural creativity and leadership inspire peers. Share your ideas with confidence.',
  'Attention to subtle details protects your progress. Organize your priorities before moving forward.',
  'Harmony and collaboration bring the best outcomes. Strive for equitable middle ground.',
  'Deep insights emerge during quiet focus. Trust your instincts when making a personal decision.',
  'Optimism and expansive thinking attract positive opportunities. Keep an open mind.',
  'Discipline and structured planning lay solid foundations for long-term aspirations.',
  'A fresh perspective or spontaneous brainstorm unlocks an inventive way forward.',
  'Empathy and intuitive discernment guide you well. Surround yourself with calm environments.',
];

const COLORS = ['Crimson Red', 'Golden Amber', 'Emerald Green', 'Royal Blue', 'Rose Pink', 'Deep Violet', 'Warm Coral', 'Sky Blue', 'Saffron Yellow', 'Turquoise'];
const MOODS = ['Radiant & Confident', 'Peaceful & Reflective', 'Passionate & Dynamic', 'Harmonious & Joyful', 'Grounded & Patient', 'Playful & Witty'];

/**
 * Get formatted current date in 'Month Day, Year'
 */
export function getTodayFormatted(): { dateStr: string; isoDate: string } {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return {
    dateStr: now.toLocaleDateString('en-US', options),
    isoDate: now.toISOString().split('T')[0],
  };
}

/**
 * Get daily rashifal prediction for a specific sign
 */
export function getDailyPredictionForSign(sign: ZodiacSignDetails): DailySignPrediction {
  const { dateStr, isoDate } = getTodayFormatted();

  // Create a day-specific numeric seed
  let seed = 0;
  for (let i = 0; i < isoDate.length; i++) {
    seed = (seed * 31 + isoDate.charCodeAt(i)) % 100000;
  }

  // Combine with sign index (0-11)
  const signIndex = ALL_ZODIAC_SIGNS.findIndex((s) => s.id === sign.id);
  const combinedSeed = (seed + signIndex * 17) % 10000;

  const loveIndex = (combinedSeed + signIndex) % LOVE_REFLECTIONS.length;
  const generalIndex = (combinedSeed + signIndex * 3) % GENERAL_REFLECTIONS.length;
  const luckyNumber = (combinedSeed % 9) + 1; // 1 to 9
  const luckyColor = COLORS[(combinedSeed + signIndex) % COLORS.length];
  const mood = MOODS[(combinedSeed + signIndex * 2) % MOODS.length];
  const compIndex = (signIndex + 4) % ALL_ZODIAC_SIGNS.length;
  const compatibilityWith = ALL_ZODIAC_SIGNS[compIndex].name;

  return {
    sign,
    todayDateStr: dateStr,
    loveReading: LOVE_REFLECTIONS[loveIndex],
    generalReading: GENERAL_REFLECTIONS[generalIndex],
    luckyNumber,
    luckyColor,
    mood,
    compatibilityWith,
  };
}

/**
 * Find daily prediction by DOB, Sign ID, or Name
 */
export function findDailyRashifal(
  mode: RashifalMode,
  params: { dob?: string; signId?: string; name?: string }
): DailySignPrediction {
  let targetSign = ALL_ZODIAC_SIGNS[0]; // fallback Aries

  if (mode === 'dob' && params.dob) {
    targetSign = getSunSignByDob(params.dob);
  } else if (mode === 'sign' && params.signId) {
    const found = ALL_ZODIAC_SIGNS.find((s) => s.id === params.signId);
    if (found) targetSign = found;
  } else if (mode === 'name' && params.name) {
    const nak = getNakshatraFromName(params.name);
    targetSign = ALL_ZODIAC_SIGNS[nak.rashiIndex] || ALL_ZODIAC_SIGNS[0];
  }

  return getDailyPredictionForSign(targetSign);
}
