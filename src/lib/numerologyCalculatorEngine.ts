/**
 * Comprehensive Numerology Calculator Engine
 * Supports Chaldean & Pythagorean systems side-by-side:
 * - Date of Birth (Mulank / Root, Bhagyank / Life Path)
 * - Name Expression, Soul Urge & Personality
 * - Lucky Number & Fortune Number
 * - Friendly & Clash / Unlucky Numbers
 * - Today's Lucky Number
 * - 3x3 Lo Shu Numerology Chart
 * - Mobile Number & Last-4 Digits Analysis
 * - Vehicle / Car Plate Analysis
 * - Business Name Analysis
 */

export interface NumberMeaning {
  number: number;
  ruler: string;
  planet: string;
  title: string;
  keywords: string[];
  description: string;
  favorableDays: string[];
  luckyColors: string[];
  friendlyNumbers: number[];
  unluckyNumbers: number[];
}

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    number: 1,
    ruler: 'Sun (Surya)',
    planet: 'Sun',
    title: 'The Originator & Leader',
    keywords: ['Leadership', 'Independence', 'Ambition', 'Pioneer', 'Confidence'],
    description: 'Number 1 represents beginnings, initiative, raw determination, and authority. You are a natural pioneer who thrives when given autonomy and leadership.',
    favorableDays: ['Sunday', 'Monday'],
    luckyColors: ['Gold', 'Yellow', 'Copper', 'Orange'],
    friendlyNumbers: [1, 2, 3, 5, 9],
    unluckyNumbers: [8, 6],
  },
  2: {
    number: 2,
    ruler: 'Moon (Chandra)',
    planet: 'Moon',
    title: 'The Diplomat & Peacemaker',
    keywords: ['Intuition', 'Harmony', 'Cooperation', 'Empathy', 'Sensitivity'],
    description: 'Number 2 represents balance, patience, emotional depth, and partnership. You are intuitive, diplomatic, and possess a gentle artistic nature that unites people.',
    favorableDays: ['Monday', 'Friday'],
    luckyColors: ['White', 'Cream', 'Light Green', 'Silver'],
    friendlyNumbers: [1, 2, 3, 5],
    unluckyNumbers: [8, 9],
  },
  3: {
    number: 3,
    ruler: 'Jupiter (Brihaspati / Guru)',
    planet: 'Jupiter',
    title: 'The Creative & Visionary',
    keywords: ['Wisdom', 'Optimism', 'Creativity', 'Expression', 'Expansion'],
    description: 'Number 3 represents self-expression, higher knowledge, optimism, and joy. You are expressive, cheerful, and gifted with communication and mentoring abilities.',
    favorableDays: ['Thursday', 'Friday'],
    luckyColors: ['Yellow', 'Purple', 'Violet', 'Rose'],
    friendlyNumbers: [1, 2, 3, 5, 7, 9],
    unluckyNumbers: [6],
  },
  4: {
    number: 4,
    ruler: 'Rahu (North Lunar Node) / Uranus',
    planet: 'Rahu',
    title: 'The Builder & Strategist',
    keywords: ['Discipline', 'Originality', 'Order', 'Practicality', 'Perseverance'],
    description: 'Number 4 represents structure, unconventional thinking, loyalty, and solid foundations. You find order in chaos and build lasting achievements through patience.',
    favorableDays: ['Saturday', 'Sunday'],
    luckyColors: ['Electric Blue', 'Grey', 'Khaki'],
    friendlyNumbers: [1, 4, 5, 6, 8],
    unluckyNumbers: [2, 9],
  },
  5: {
    number: 5,
    ruler: 'Mercury (Budh)',
    planet: 'Mercury',
    title: 'The Dynamic Communicator',
    keywords: ['Versatility', 'Freedom', 'Curiosity', 'Commerce', 'Speed'],
    description: 'Number 5 represents versatility, quick wit, commercial acumen, and love for freedom. You adapt effortlessly to change and excel in fast-paced communication and business.',
    favorableDays: ['Wednesday', 'Friday'],
    luckyColors: ['Emerald Green', 'Turquoise', 'Light Grey'],
    friendlyNumbers: [1, 3, 5, 6],
    unluckyNumbers: [2],
  },
  6: {
    number: 6,
    ruler: 'Venus (Shukra)',
    planet: 'Venus',
    title: 'The Harmonizer & Caregiver',
    keywords: ['Love', 'Beauty', 'Responsibility', 'Luxury', 'Family'],
    description: 'Number 6 represents unconditional love, aesthetic taste, domestic harmony, and magnetic charm. You naturally nurture others and appreciate comfort, art, and justice.',
    favorableDays: ['Friday', 'Tuesday'],
    luckyColors: ['Pink', 'Pale Blue', 'White', 'Floral'],
    friendlyNumbers: [4, 5, 6, 8],
    unluckyNumbers: [1, 3],
  },
  7: {
    number: 7,
    ruler: 'Ketu (South Lunar Node) / Neptune',
    planet: 'Ketu',
    title: 'The Thinker & Seeker',
    keywords: ['Introspection', 'Spirituality', 'Research', 'Mysticism', 'Wisdom'],
    description: 'Number 7 is the sacred number of contemplation, scientific analysis, and spiritual insight. You seek truth beyond surface appearances and treasure quiet moments.',
    favorableDays: ['Monday', 'Thursday'],
    luckyColors: ['Light Green', 'White', 'Yellow', 'Soft Blue'],
    friendlyNumbers: [1, 3, 5, 7],
    unluckyNumbers: [9],
  },
  8: {
    number: 8,
    ruler: 'Saturn (Shani)',
    planet: 'Saturn',
    title: 'The Manifestor & Powerhouse',
    keywords: ['Karma', 'Authority', 'Resilience', 'Material Mastery', 'Justice'],
    description: 'Number 8 represents karmic balance, financial mastery, executive ability, and relentless resilience. Success may test you early, but your rewards are enduring and profound.',
    favorableDays: ['Saturday', 'Friday'],
    luckyColors: ['Dark Blue', 'Black', 'Purple', 'Dark Grey'],
    friendlyNumbers: [4, 5, 6, 8],
    unluckyNumbers: [1, 2],
  },
  9: {
    number: 9,
    ruler: 'Mars (Mangal)',
    planet: 'Mars',
    title: 'The Humanitarian & Warrior',
    keywords: ['Courage', 'Compassion', 'Completion', 'Energy', 'Selflessness'],
    description: 'Number 9 represents universal compassion, martial courage, and cyclic completion. You possess generous idealism, fierce bravery, and a drive to protect the underdog.',
    favorableDays: ['Tuesday', 'Thursday'],
    luckyColors: ['Crimson Red', 'Rose Pink', 'Coral'],
    friendlyNumbers: [1, 3, 5, 9],
    unluckyNumbers: [2, 4, 7],
  },
};

// ─── Alphabet Maps ────────────────────────────────────────────────────────────

// Pythagorean letter values (1-9)
export const PYTHAGOREAN_MAP: Record<string, number> = {
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

// Chaldean letter values (1-8, 9 is sacred and excluded)
export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

// Helper to reduce number to single digit (preserving 11, 22, 33 if masterNumbers=true)
export function reduceToSingleDigit(num: number, allowMaster = false): number {
  if (num <= 0) return 0;
  let current = num;
  while (current > 9) {
    if (allowMaster && (current === 11 || current === 22 || current === 33)) {
      return current;
    }
    current = current
      .toString()
      .split('')
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return current;
}

// ─── Core Name Breakdown Function ─────────────────────────────────────────────
export interface NameSystemResult {
  system: 'chaldean' | 'pythagorean';
  totalRaw: number;
  compoundNumber: number;
  singleNumber: number;
  soulUrgeNumber: number; // vowels only
  personalityNumber: number; // consonants only
  breakdown: { char: string; value: number }[];
}

export function calculateNameNumerology(name: string, system: 'chaldean' | 'pythagorean'): NameSystemResult {
  const map = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  const clean = (name || '').toUpperCase().replace(/[^A-Z]/g, '');

  let totalRaw = 0;
  let vowelRaw = 0;
  let consRaw = 0;
  const breakdown: { char: string; value: number }[] = [];

  for (const char of clean) {
    const val = map[char] || 0;
    breakdown.push({ char, value: val });
    totalRaw += val;
    if (VOWELS.has(char)) {
      vowelRaw += val;
    } else {
      consRaw += val;
    }
  }

  const compoundNumber = totalRaw;
  const singleNumber = reduceToSingleDigit(totalRaw, true);
  const soulUrgeNumber = reduceToSingleDigit(vowelRaw);
  const personalityNumber = reduceToSingleDigit(consRaw);

  return {
    system,
    totalRaw,
    compoundNumber,
    singleNumber,
    soulUrgeNumber,
    personalityNumber,
    breakdown,
  };
}

// ─── Date of Birth Calculation ────────────────────────────────────────────────
export interface DateOfBirthResult {
  birthDayNumber: number; // Mulank (Day of birth reduced)
  lifePathNumber: number; // Bhagyank (Full DD/MM/YYYY reduced)
  birthDayRaw: number;
  loShuGrid: Record<number, number>; // Counts of digits 1-9
  dayOfWeek: string;
}

export function calculateDateOfBirthNumerology(dobString: string): DateOfBirthResult | null {
  if (!dobString) return null;
  const parts = dobString.split('-'); // YYYY-MM-DD
  if (parts.length !== 3) return null;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

  // Day root number (Mulank)
  const birthDayNumber = reduceToSingleDigit(day);

  // Full date sum (Life Path / Bhagyank)
  const allDigits = `${day}${month}${year}`.split('').map(Number);
  const lifePathNumber = reduceToSingleDigit(allDigits.reduce((a, b) => a + b, 0), true);

  // Lo Shu Grid digit frequency (counts occurrences of 1 through 9)
  const loShuGrid: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  allDigits.forEach((digit) => {
    if (digit >= 1 && digit <= 9) {
      loShuGrid[digit] += 1;
    }
  });

  // Day of week
  const dateObj = new Date(year, month - 1, day);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[dateObj.getDay()] || 'Unknown';

  return {
    birthDayNumber,
    lifePathNumber,
    birthDayRaw: day,
    loShuGrid,
    dayOfWeek,
  };
}

// ─── Combined Full Reading ────────────────────────────────────────────────────
export interface FullNumerologyReading {
  name: string;
  dob: string;
  birthTime?: string;
  dobResult: DateOfBirthResult | null;
  chaldean: NameSystemResult | null;
  pythagorean: NameSystemResult | null;
  primaryLuckyNumber: number;
  fortuneNumber: number;
  todaysLuckyNumber: number;
  favorableDays: string[];
  luckyColors: string[];
  friendlyNumbers: number[];
  unluckyNumbers: number[];
  mainMeaning: NumberMeaning;
}

export function calculateFullNumerology(
  name: string,
  dob: string,
  birthTime?: string
): FullNumerologyReading {
  const dobResult = calculateDateOfBirthNumerology(dob);
  const chaldean = name.trim() ? calculateNameNumerology(name, 'chaldean') : null;
  const pythagorean = name.trim() ? calculateNameNumerology(name, 'pythagorean') : null;

  // Lucky Number: Defaults to DOB Mulank, or Chaldean single, or Pythagorean single, or 1
  let luckyNum = 1;
  if (dobResult) {
    luckyNum = reduceToSingleDigit(dobResult.birthDayNumber);
  } else if (chaldean) {
    luckyNum = reduceToSingleDigit(chaldean.singleNumber);
  } else if (pythagorean) {
    luckyNum = reduceToSingleDigit(pythagorean.singleNumber);
  }

  // Fortune Number: Combined composite (DOB Life Path + Chaldean/Pythagorean Name)
  let fortuneComposite = luckyNum;
  if (dobResult && chaldean) {
    fortuneComposite = reduceToSingleDigit(dobResult.lifePathNumber + chaldean.singleNumber);
  } else if (dobResult) {
    fortuneComposite = reduceToSingleDigit(dobResult.lifePathNumber);
  } else if (chaldean) {
    fortuneComposite = reduceToSingleDigit(chaldean.singleNumber);
  }

  // Today's Lucky Number: (Lucky Number + Today's Date reduced)
  const today = new Date();
  const todaySum = today.getDate() + (today.getMonth() + 1) + today.getFullYear();
  const todaysLuckyNumber = reduceToSingleDigit(luckyNum + todaySum);

  const meaning = NUMBER_MEANINGS[luckyNum] || NUMBER_MEANINGS[1];

  return {
    name,
    dob,
    birthTime,
    dobResult,
    chaldean,
    pythagorean,
    primaryLuckyNumber: luckyNum,
    fortuneNumber: fortuneComposite,
    todaysLuckyNumber,
    favorableDays: meaning.favorableDays,
    luckyColors: meaning.luckyColors,
    friendlyNumbers: meaning.friendlyNumbers,
    unluckyNumbers: meaning.unluckyNumbers,
    mainMeaning: meaning,
  };
}

// ─── Mobile Number Numerology ─────────────────────────────────────────────────
export interface MobileNumerologyResult {
  fullNumber: string;
  totalDigitsSum: number;
  rootNumber: number;
  last4Digits: string;
  last4Sum: number;
  last4Root: number;
  harmonyWithDob: 'Highly Harmonious' | 'Neutral' | 'Challenging Affinity';
  meaning: NumberMeaning;
}

export function calculateMobileNumerology(phone: string, userDobRoot?: number): MobileNumerologyResult {
  const digitsOnly = phone.replace(/\D/g, '');
  const digits = digitsOnly.split('').map(Number);
  const totalDigitsSum = digits.reduce((a, b) => a + b, 0);
  const rootNumber = reduceToSingleDigit(totalDigitsSum);

  const last4 = digitsOnly.slice(-4);
  const last4Digits = last4.split('').map(Number);
  const last4Sum = last4Digits.reduce((a, b) => a + b, 0);
  const last4Root = reduceToSingleDigit(last4Sum);

  const meaning = NUMBER_MEANINGS[rootNumber] || NUMBER_MEANINGS[1];

  let harmony: 'Highly Harmonious' | 'Neutral' | 'Challenging Affinity' = 'Neutral';
  if (userDobRoot) {
    const userMeaning = NUMBER_MEANINGS[userDobRoot];
    if (userMeaning) {
      if (userMeaning.friendlyNumbers.includes(rootNumber)) {
        harmony = 'Highly Harmonious';
      } else if (userMeaning.unluckyNumbers.includes(rootNumber)) {
        harmony = 'Challenging Affinity';
      }
    }
  }

  return {
    fullNumber: digitsOnly,
    totalDigitsSum,
    rootNumber,
    last4Digits: last4,
    last4Sum,
    last4Root,
    harmonyWithDob: harmony,
    meaning,
  };
}

// ─── Vehicle Number Numerology ────────────────────────────────────────────────
export interface VehicleNumerologyResult {
  plate: string;
  totalSum: number;
  rootNumber: number;
  harmonyWithDob: 'Lucky Fit' | 'Neutral Match' | 'Clash Tendency';
  meaning: NumberMeaning;
}

export function calculateVehicleNumerology(plate: string, userDobRoot?: number): VehicleNumerologyResult {
  const clean = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
  let sum = 0;

  for (const char of clean) {
    if (/\d/.test(char)) {
      sum += parseInt(char, 10);
    } else if (/[A-Z]/.test(char)) {
      sum += CHALDEAN_MAP[char] || 0;
    }
  }

  const rootNumber = reduceToSingleDigit(sum);
  const meaning = NUMBER_MEANINGS[rootNumber] || NUMBER_MEANINGS[1];

  let harmony: 'Lucky Fit' | 'Neutral Match' | 'Clash Tendency' = 'Neutral Match';
  if (userDobRoot) {
    const userMeaning = NUMBER_MEANINGS[userDobRoot];
    if (userMeaning) {
      if (userMeaning.friendlyNumbers.includes(rootNumber)) {
        harmony = 'Lucky Fit';
      } else if (userMeaning.unluckyNumbers.includes(rootNumber)) {
        harmony = 'Clash Tendency';
      }
    }
  }

  return {
    plate: clean,
    totalSum: sum,
    rootNumber,
    harmonyWithDob: harmony,
    meaning,
  };
}

// ─── Business Numerology ──────────────────────────────────────────────────────
export interface BusinessNumerologyResult {
  businessName: string;
  chaldeanRoot: number;
  chaldeanCompound: number;
  pythagoreanRoot: number;
  harmonyWithOwner: 'Thriving Alignment' | 'Balanced Growth' | 'Needs Rebalancing';
  industrySuitability: string;
  chaldeanMeaning: NumberMeaning;
}

export function calculateBusinessNumerology(bizName: string, ownerDobRoot?: number): BusinessNumerologyResult {
  const chaldean = calculateNameNumerology(bizName, 'chaldean');
  const pythagorean = calculateNameNumerology(bizName, 'pythagorean');

  const chaldeanRoot = reduceToSingleDigit(chaldean.compoundNumber);
  const chaldeanMeaning = NUMBER_MEANINGS[chaldeanRoot] || NUMBER_MEANINGS[1];

  let industry = 'General trade, commerce, and services.';
  switch (chaldeanRoot) {
    case 1:
      industry = 'Leadership, technology, innovation, government contracting, consulting.';
      break;
    case 2:
      industry = 'Design, arts, counseling, hospitality, food & dairy, partnerships.';
      break;
    case 3:
      industry = 'Media, entertainment, publishing, education, advertising, coaching.';
      break;
    case 4:
      industry = 'Real estate, construction, IT infrastructure, legal services, logistics.';
      break;
    case 5:
      industry = 'E-commerce, travel, trading, marketing, public relations, sales.';
      break;
    case 6:
      industry = 'Fashion, luxury, beauty, wellness, jewelry, fine dining, interior decor.';
      break;
    case 7:
      industry = 'Research, healthcare, pharmaceuticals, spiritual products, data science.';
      break;
    case 8:
      industry = 'Finance, banking, heavy manufacturing, investment, corporate law.';
      break;
    case 9:
      industry = 'Sports, philanthropy, defense, NGOs, medical emergencies, imports.';
      break;
  }

  let harmony: 'Thriving Alignment' | 'Balanced Growth' | 'Needs Rebalancing' = 'Balanced Growth';
  if (ownerDobRoot) {
    const ownerMeaning = NUMBER_MEANINGS[ownerDobRoot];
    if (ownerMeaning) {
      if (ownerMeaning.friendlyNumbers.includes(chaldeanRoot)) {
        harmony = 'Thriving Alignment';
      } else if (ownerMeaning.unluckyNumbers.includes(chaldeanRoot)) {
        harmony = 'Needs Rebalancing';
      }
    }
  }

  return {
    businessName: bizName,
    chaldeanRoot,
    chaldeanCompound: chaldean.compoundNumber,
    pythagoreanRoot: pythagorean.singleNumber,
    harmonyWithOwner: harmony,
    industrySuitability: industry,
    chaldeanMeaning,
  };
}
