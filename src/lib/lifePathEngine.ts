/**
 * Life Path Calculator Engine
 * Thin wrapper over the numerology engine:
 * - Life Path Number = Bhagyank (full date of birth reduced, master numbers 11/22/33 kept)
 * - Mulank = root number from the birth day only
 * - Destiny Number = Bhagyank, same number as the life path number
 * Every meaning below is a traditional reading ("traditionally read as"),
 * never a guarantee.
 */

import {
  calculateDateOfBirthNumerology,
  NUMBER_MEANINGS,
} from './numerologyCalculatorEngine';

export interface LifePathResult {
  lifePathNumber: number;
  mulank: number;
  destinyNumber: number; // same as lifePathNumber (Bhagyank)
  dayOfWeek: string;
  steps: string[]; // full-DOB addition, step by step
  mulankSteps: string[]; // birth-day addition, step by step
  birthDay: number;
  birthMonth: number;
  birthYear: number;
}

function buildReductionSteps(digits: number[], allowMaster: boolean): string[] {
  const steps: string[] = [];
  let current = digits.reduce((a, b) => a + b, 0);
  steps.push(`${digits.join('+')} = ${current}`);
  while (current > 9) {
    if (allowMaster && (current === 11 || current === 22 || current === 33)) {
      steps.push(`${current} is a master number — not reduced further`);
      break;
    }
    const parts = current.toString().split('').map(Number);
    const next = parts.reduce((a, b) => a + b, 0);
    steps.push(`${parts.join('+')} = ${next}`);
    current = next;
  }
  return steps;
}

export function calculateLifePath(dob: string): LifePathResult | null {
  const res = calculateDateOfBirthNumerology(dob);
  if (!res) return null;
  const parts = dob.split('-'); // YYYY-MM-DD
  if (parts.length !== 3) return null;
  const [yearStr, monthStr, dayStr] = parts;

  // Full date digits, zero-padded as typed (e.g. 29-07-1998 -> 2+9+0+7+1+9+9+8 = 45)
  const allDigits = `${dayStr}${monthStr}${yearStr}`.split('').map(Number);
  const steps = buildReductionSteps(allDigits, true);

  // Birth day digits only (Mulank)
  const dayDigits = dayStr.split('').map(Number);
  const mulankSteps = buildReductionSteps(dayDigits, false);

  return {
    lifePathNumber: res.lifePathNumber,
    mulank: res.birthDayNumber,
    destinyNumber: res.lifePathNumber,
    dayOfWeek: res.dayOfWeek,
    steps,
    mulankSteps,
    birthDay: res.birthDayRaw,
    birthMonth: parseInt(monthStr, 10),
    birthYear: parseInt(yearStr, 10),
  };
}

// ─── Life Path Number Meanings (from the page copy) ───────────────────────────
export interface LifePathMeaning {
  number: number;
  title: string;
  theme: string;
  description: string;
}

export const LIFE_PATH_MEANINGS: Record<number, LifePathMeaning> = {
  1: {
    number: 1,
    title: 'The Leader',
    theme: 'Leadership & independence',
    description:
      'Traditionally read as a self-starter who wants to lead and do things their own way.',
  },
  2: {
    number: 2,
    title: 'The Peacemaker',
    theme: 'Cooperation & sensitivity',
    description:
      'Traditionally read as diplomatic and gentle, good at working with others.',
  },
  3: {
    number: 3,
    title: 'The Creative',
    theme: 'Creativity & expression',
    description:
      'Traditionally read as expressive and social, happiest when creating or communicating.',
  },
  4: {
    number: 4,
    title: 'The Builder',
    theme: 'Stability & hard work',
    description:
      'Traditionally read as practical, patient and steady.',
  },
  5: {
    number: 5,
    title: 'The Free Spirit',
    theme: 'Freedom & change',
    description:
      'Traditionally read as restless and curious, happiest with variety and movement.',
  },
  6: {
    number: 6,
    title: 'The Carer',
    theme: 'Responsibility & care',
    description:
      'Traditionally read as the carer — home, family and looking after others matter most.',
  },
  7: {
    number: 7,
    title: 'The Thinker',
    theme: 'Analysis & spirituality',
    description:
      'Traditionally read as private and analytical, drawn to deeper questions.',
  },
  8: {
    number: 8,
    title: 'The Achiever',
    theme: 'Ambition & money',
    description:
      'Traditionally read as focused on success, status and material results.',
  },
  9: {
    number: 9,
    title: 'The Humanitarian',
    theme: 'Compassion & completion',
    description:
      'Traditionally read as generous and idealistic, drawn to serving others. 9 is the number of completion — the last single digit, so 9s are traditionally read as old souls finishing a cycle.',
  },
  11: {
    number: 11,
    title: 'The Intuitive',
    theme: 'Intuition & inspiration',
    description:
      'Master number — traditionally read as intuition and inspiration. Master numbers are not reduced further.',
  },
  22: {
    number: 22,
    title: 'The Master Builder',
    theme: 'Big building & practical vision',
    description:
      'Master number — traditionally read as big building and practical vision. Master numbers are not reduced further.',
  },
  33: {
    number: 33,
    title: 'The Teacher',
    theme: 'Teaching & healing',
    description:
      'Master number — traditionally read as teaching and healing. Master numbers are not reduced further.',
  },
};

export function getLifePathMeaning(num: number): LifePathMeaning {
  return LIFE_PATH_MEANINGS[num] || LIFE_PATH_MEANINGS[1];
}

/** Short meaning for a Mulank number, from the shared number meanings. */
export function getMulankMeaning(num: number): string {
  const m = NUMBER_MEANINGS[num] || NUMBER_MEANINGS[1];
  return `Traditionally read as your core nature — ${m.title.toLowerCase()}: ${m.keywords.join(', ').toLowerCase()}.`;
}

// ─── Mulank 2 Profile (from the page copy) ───────────────────────────────────
export const MULANK_2_PROFILE = {
  personality:
    'Mulank 2 personality is traditionally read as gentle, sensitive and diplomatic. People with mulank 2 are said to be good listeners, peacemakers and loyal friends — they feel things deeply and they avoid conflict. 2s are ruled by the Moon.',
  loveLife:
    'In love, 2s are traditionally read as caring and emotional, and they need reassurance and closeness from their partner. A mulank 2 love life is said to work best with a partner who is steady and openly affectionate.',
  compatibility:
    'Mulank 2 compatibility is traditionally read as strongest with mulank 1, mulank 2 and mulank 7 — numbers said to balance the 2’s softness with steadiness or understanding.',
};

// ─── Bhagyank 9 Profile (from the page copy) ─────────────────────────────────
export const BHAGYANK_9_PROFILE = {
  title: 'Bhagyank 9 — The Humanitarian Path',
  description:
    'Bhagyank 9 is the same as destiny number 9. Bhagyank 9 wale log — people with bhagyank 9 — are traditionally read as compassionate, generous and drawn to helping others, sometimes at their own expense.',
};
