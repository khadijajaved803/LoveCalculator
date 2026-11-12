/**
 * Zodiac Compatibility Engine
 *
 * Deterministic, element-based compatibility between two zodiac signs.
 * Scores come from the real sign data in zodiacEngine (element, modality,
 * ruling planet, bestMatches) — never a random number. The same pair always
 * gives the same score. Scores stay in the 55–98 band: never 0, never a
 * perfect 100, never "do not marry" for a low score and never a guarantee
 * for a high score. Every reading is hedged as an indication.
 */

import {
  ALL_ZODIAC_SIGNS,
  getSunSignByDob,
  ZodiacSignDetails,
} from './zodiacEngine';

export type CompatibilityMode = 'western' | 'vedic';

export interface CompatibilityWorking {
  elements: string;
  modalities: string;
  rulingPlanets: string;
  bestMatch: boolean;
  elementBase: number;
  modalityAdjust: number;
  planetAdjust: number;
  bestMatchBonus: number;
}

export interface CompatibilityResult {
  sign1: ZodiacSignDetails;
  sign2: ZodiacSignDetails;
  score: number;
  elementPair: string;
  verdict: string;
  whatWorks: string;
  whatNeedsCare: string;
  loveLine: string;
  friendshipLine: string;
  marriageLine: string;
  working: CompatibilityWorking;
  mode: CompatibilityMode;
  vedicNote: string | null;
  moonNote: string | null;
}

export interface CompatibilityInput {
  signId1: string;
  signId2: string;
  mode?: CompatibilityMode;
  moonSign1?: string;
  moonSign2?: string;
}

type Element = 'Fire' | 'Earth' | 'Air' | 'Water';
type ElementPairCategory = 'same' | 'matching' | 'steady' | 'clashing';

/** Deterministic 0..n-1 hash from a string (same input → same output). */
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function elementPairCategory(a: Element, b: Element): ElementPairCategory {
  if (a === b) return 'same';
  const pair = [a, b].sort().join('-');
  if (pair === 'Air-Fire' || pair === 'Earth-Water') return 'matching';
  if (pair === 'Earth-Fire' || pair === 'Air-Water') return 'steady';
  return 'clashing';
}

const ELEMENT_BASE: Record<ElementPairCategory, number> = {
  same: 88,
  matching: 85,
  steady: 71,
  clashing: 67,
};

function planetTokens(planet: string): string[] {
  return planet.split(/\s*&\s*/).map((p) => p.trim());
}

function planetAdjust(a: ZodiacSignDetails, b: ZodiacSignDetails): number {
  const tokensA = planetTokens(a.rulingPlanet);
  const tokensB = planetTokens(b.rulingPlanet);
  if (tokensA.some((t) => tokensB.includes(t))) return 3;
  const has = (p: string) => tokensA.includes(p) || tokensB.includes(p);
  const pair = [...tokensA, ...tokensB];
  const sunMoon =
    (pair.includes('Sun') && pair.includes('Moon')) ||
    (tokensA.includes('Sun') && tokensB.includes('Moon')) ||
    (tokensA.includes('Moon') && tokensB.includes('Sun'));
  if (sunMoon) return 2;
  if (has('Venus') && has('Mars')) return 2;
  return 0;
}

function modalityAdjust(a: ZodiacSignDetails, b: ZodiacSignDetails): number {
  if (a.modality === b.modality) return 2;
  if (
    (a.modality === 'Cardinal' && b.modality === 'Fixed') ||
    (a.modality === 'Fixed' && b.modality === 'Cardinal')
  ) {
    return -2;
  }
  return 1;
}

const VERDICTS: Record<ElementPairCategory, { high: string; low: string }> = {
  same: {
    high: 'An easy, natural match — two signs that speak the same language from the first conversation.',
    low: 'A natural match — two signs that understand each other quickly, though the same habits can double up.',
  },
  matching: {
    high: 'A lively, easy match — two signs whose strengths feed each other.',
    low: 'A warm match — two signs that bring out the best in each other, with a little care needed on the pace.',
  },
  steady: {
    high: 'A steady match that grows with care — different speeds, but the same destination.',
    low: 'A match built on patience — the two signs want different things from the same day, and the pairing works when both make room.',
  },
  clashing: {
    high: 'A match that takes more translation — different languages of love, but real depth once the two learn each other.',
    low: 'A match that asks for honesty and patience — the two signs love differently, and the pairing works when neither tries to change the other.',
  },
};

const WHAT_WORKS: Record<ElementPairCategory, string[]> = {
  same: [
    'You understand each other at once — the same element means the same instincts, the same pace, and the same things that matter.',
    'Conversation and comfort come easily; neither of you has to explain the basics to the other.',
    'You back each other up the same way — loyalty, humour and a shared sense of what home means.',
  ],
  matching: [
    'Your strengths feed each other — one brings the spark, the other brings the air it needs to burn.',
    'You rarely get bored together: the pair talks fast, laughs easily, and keeps finding new things to do.',
    'You balance naturally — one steadies, the other lifts, and the two of you cover more ground together than apart.',
  ],
  steady: [
    'You bring out each other’s steadier side — one slows the other down, the other speeds things up, and both benefit.',
    'Trust builds slowly and holds: this pairing is read as loyal once it is chosen, not before.',
    'You complement each other’s blind spots — what one misses, the other notices.',
  ],
  clashing: [
    'The depth is real — when this pairing works, it works because both people chose it with their eyes open.',
    'You teach each other: one brings feeling, the other brings fire, and both grow from the contrast.',
    'Honesty runs deep here — once trust is given, it tends to hold.',
  ],
};

const WHAT_NEEDS_CARE: Record<ElementPairCategory, string[]> = {
  same: [
    'The same habits can double up — two of the same sign can share a blind spot, so watch for it together.',
    'When you disagree, you disagree the same way — which can turn a small row into a standoff. Name it early.',
    'Variety needs a little effort: plan something new now and then, instead of the same comfortable routine.',
  ],
  matching: [
    'Pace can differ — one of you moves faster than the other, so check in before big decisions.',
    'The easy flow can hide small resentments; say the small thing now, not the big thing later.',
    'Both of you like being right — agree to let the unimportant ones go.',
  ],
  steady: [
    'Speed is the friction: one wants to move now, the other wants to wait. Agree the pace before you agree the plan.',
    'Caution can read as coldness and enthusiasm as pressure — say what you mean, plainly, before either is assumed.',
    'Decisions take longer here; that is not a flaw, but it needs patience from both sides.',
  ],
  clashing: [
    'You love in different languages — one shows love by doing, the other by feeling — so translate, don’t assume.',
    'Pace is the main tension: warmth meets depth, and the two can misunderstand each other’s timing.',
    'Jealousy and space both need naming: agree what closeness looks like, and what time alone means.',
  ],
};

const LOVE_LINES: Record<ElementPairCategory, string[]> = {
  same: [
    'In love, this pair is read as quick to trust and slow to let go — the same element makes the romance feel familiar from the start.',
    'In love, expect warmth without effort: the two of you want the same kind of closeness, and you find it easily.',
  ],
  matching: [
    'In love, this pair is read as playful and alive — the conversation never really stops, and neither does the affection.',
    'In love, expect momentum: one of you lights the fire and the other keeps it burning.',
  ],
  steady: [
    'In love, this pair is read as slow-burn and steady — the romance builds through showing up, not through grand gestures.',
    'In love, expect loyalty that grows: it may start quietly, but it tends to last.',
  ],
  clashing: [
    'In love, this pair is read as intense and honest — the feelings run deep, and the pairing works when both say what they actually feel.',
    'In love, expect depth with work: the connection is real, and it asks both of you to listen differently.',
  ],
};

const FRIENDSHIP_LINES: Record<ElementPairCategory, string[]> = {
  same: [
    'As friends, you are read as instant allies — the same jokes, the same plans, the same loyalty.',
    'As friends, expect an easy rhythm: you turn up for each other without being asked.',
  ],
  matching: [
    'As friends, you are read as the pair that never runs out of things to say — ideas, plans and laughter in equal measure.',
    'As friends, expect energy: this is the pairing that organises the trip and actually goes.',
  ],
  steady: [
    'As friends, you are read as reliable above all — the ones who help each other move house, literally and otherwise.',
    'As friends, expect steadiness: the friendship may start slowly, but it holds.',
  ],
  clashing: [
    'As friends, you are read as loyal once trust is earned — the closeness is real, and it is not given lightly.',
    'As friends, expect honesty: this pairing tells the truth, even when it is uncomfortable.',
  ],
};

const MARRIAGE_LINES: Record<ElementPairCategory, string[]> = {
  same: [
    'For marriage, this pair is read as a natural fit — the same values, the same pace, and a home that both protect.',
    'For marriage, expect an easy household: you agree on the big things, and the small ones rarely become rows.',
  ],
  matching: [
    'For marriage, this pair is read as lively and warm — the home stays interesting, and the two of you keep choosing each other.',
    'For marriage, expect a partnership that grows: the differences are the fuel, not the friction.',
  ],
  steady: [
    'For marriage, this pair is read as built to last — slow, steady, and held together by showing up every day.',
    'For marriage, expect a solid home: the romance is quieter, and the commitment is louder.',
  ],
  clashing: [
    'For marriage, this pair is read as deep and deliberate — it works when both people keep choosing honesty over comfort.',
    'For marriage, expect a real partnership: the chart says the match takes work, and the work is worth doing.',
  ],
};

function pick<T>(pool: T[], seed: number): T {
  return pool[seed % pool.length];
}

export function checkCompatibility(input: CompatibilityInput): CompatibilityResult {
  const sign1 =
    ALL_ZODIAC_SIGNS.find((s) => s.id === input.signId1) ?? ALL_ZODIAC_SIGNS[0];
  const sign2 =
    ALL_ZODIAC_SIGNS.find((s) => s.id === input.signId2) ?? ALL_ZODIAC_SIGNS[0];
  const mode: CompatibilityMode = input.mode ?? 'western';

  const category = elementPairCategory(sign1.element, sign2.element);
  const base = ELEMENT_BASE[category];
  const modAdj = modalityAdjust(sign1, sign2);
  const plAdj = planetAdjust(sign1, sign2);
  const bestMatch =
    sign1.bestMatches.includes(sign2.name) ||
    sign2.bestMatches.includes(sign1.name);
  const bestBonus = bestMatch ? 4 : 0;
  const pairKey = [sign1.id, sign2.id].sort().join('-');
  const variation = hashString(pairKey) % 4;

  let score = base + modAdj + plAdj + bestBonus + variation;
  score = Math.max(55, Math.min(98, score));

  const verdict = score >= 80 ? VERDICTS[category].high : VERDICTS[category].low;
  const seed = hashString(pairKey + mode);
  const whatWorks = pick(WHAT_WORKS[category], seed);
  const whatNeedsCare = pick(WHAT_NEEDS_CARE[category], seed + 1);
  const loveLine = pick(LOVE_LINES[category], seed + 2);
  const friendshipLine = pick(FRIENDSHIP_LINES[category], seed + 3);
  const marriageLine = pick(MARRIAGE_LINES[category], seed + 4);

  const elementPair =
    sign1.element === sign2.element
      ? `${sign1.element} × ${sign2.element}`
      : `${sign1.element} × ${sign2.element}`;

  const vedicNote =
    mode === 'vedic'
      ? `Read from the Vedic chart: ${sign1.rashiName} with ${sign2.rashiName}. The same element logic applies — the signs are read as rashis. For the full guna-milan score out of 36, with dosha checks, see the Kundali Matching page.`
      : null;

  let moonNote: string | null = null;
  if (input.moonSign1 && input.moonSign2) {
    const m1 = ALL_ZODIAC_SIGNS.find((s) => s.name === input.moonSign1);
    const m2 = ALL_ZODIAC_SIGNS.find((s) => s.name === input.moonSign2);
    if (m1 && m2) {
      const moonCategory = elementPairCategory(m1.element, m2.element);
      const moonText =
        moonCategory === 'same' || moonCategory === 'matching'
          ? 'your Moons get on easily too, which tends to steady the emotional side of the match.'
          : 'your Moons want different things emotionally, so the feeling side of the match needs a little more care.';
      moonNote = `Moon signs: ${m1.name} (${m1.element}) with ${m2.name} (${m2.element}) — ${moonText}`;
    }
  }

  return {
    sign1,
    sign2,
    score,
    elementPair,
    verdict,
    whatWorks,
    whatNeedsCare,
    loveLine,
    friendshipLine,
    marriageLine,
    working: {
      elements: `${sign1.name} is ${sign1.element}, ${sign2.name} is ${sign2.element} — ${category} pairing.`,
      modalities: `${sign1.name} is ${sign1.modality}, ${sign2.name} is ${sign2.modality}.`,
      rulingPlanets: `${sign1.name} is ruled by ${sign1.rulingPlanet}; ${sign2.name} is ruled by ${sign2.rulingPlanet}.`,
      bestMatch,
      elementBase: base,
      modalityAdjust: modAdj,
      planetAdjust: plAdj,
      bestMatchBonus: bestBonus,
    },
    mode,
    vedicNote,
    moonNote,
  };
}

export function signsFromDobs(dob1: string, dob2: string): [ZodiacSignDetails, ZodiacSignDetails] {
  return [getSunSignByDob(dob1), getSunSignByDob(dob2)];
}
