/**
 * Marriage Prediction Engine
 *
 * Derives a marriage prediction from the birth chart — never a random number:
 * - 7th house (marriage) + its lord, Venus and Jupiter from generateBirthChart.
 * - Vimshottari dasha sequence from the birth nakshatra (getNakshatraFromDob),
 *   with the balance from the Moon's pada in the nakshatra.
 * - Lagna: the ascendant when birth time is given; the Moon sign (Chandra Lagna)
 *   when it is not — the tool says which one it used.
 * - Jupiter's simplified transit (about one sign a year) picks the peak year
 *   inside the window: the first age at which transit Jupiter aspects the
 *   7th house (5th / 7th / 9th aspect).
 *
 * Honesty: everything is an astrological indication ("the chart favours…"),
 * never a guaranteed day. A date-only reading gives an age RANGE only.
 * The marriage window is the first favourable dasha period at or after age 18
 * that is still ahead of the person's current age.
 */

import { generateBirthChart, calculateAscendant } from './birthChartEngine';
import { getNakshatraFromDob } from './kundaliEngine';

export type MarriageLean = 'love' | 'arranged' | 'balanced';
export type Lang = 'en' | 'hi';

const SIGN_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const SIGN_LORDS: Record<number, string> = {
  1: 'Mars', 2: 'Venus', 3: 'Mercury', 4: 'Moon', 5: 'Sun', 6: 'Mercury',
  7: 'Venus', 8: 'Mars', 9: 'Jupiter', 10: 'Saturn', 11: 'Saturn', 12: 'Jupiter',
};

const SIGN_ELEMENTS: Record<number, string> = {
  1: 'Fire', 2: 'Earth', 3: 'Air', 4: 'Water', 5: 'Fire', 6: 'Earth',
  7: 'Air', 8: 'Water', 9: 'Fire', 10: 'Earth', 11: 'Air', 12: 'Water',
};

const SIGN_HINDI: Record<number, string> = {
  1: 'मेष', 2: 'वृषभ', 3: 'मिथुन', 4: 'कर्क', 5: 'सिंह', 6: 'कन्या',
  7: 'तुला', 8: 'वृश्चिक', 9: 'धनु', 10: 'मकर', 11: 'कुंभ', 12: 'मीन',
};

/** Vimshottari dasha: lord order and years. */
const DASHA_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
const DASHA_YEARS: Record<string, number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
};

/** Nakshatra id (1–27) → dasha lord. Standard mapping: 3 nakshatras per lord. */
function dashaLordForNakshatra(nakshatraId: number): string {
  const group = (nakshatraId - 1) % 9;
  return DASHA_ORDER[group];
}

export interface DashaPeriod {
  lord: string;
  startAge: number;
  endAge: number;
}

export interface MarriageWorking {
  lagnaSign: string;
  lagnaBasis: 'ascendant' | 'moon';
  seventhHouseSign: string;
  seventhLord: string;
  venusSign: string;
  jupiterSign: string;
  dashaAtMarriage: string;
  dashaStartAge: number;
  dashaEndAge: number;
  nakshatra: string;
}

export interface MarriagePrediction {
  name: string;
  dob: string;
  currentAge: number;
  hasBirthTime: boolean;
  /** Predicted marriage age range (never a single guaranteed day). */
  marriageAgeRange: [number, number];
  marriageWindowLabel: string;
  marriageWindowYears: string;
  peakAge: number;
  loveOrArranged: {
    lean: MarriageLean;
    strength: 'strong' | 'moderate' | 'balanced';
    reason: string;
    reasonHi: string;
  };
  meetingWindowLabel: string;
  meetingWindowYears: string;
  partnerIndications: string[];
  partnerIndicationsHi: string[];
  working: MarriageWorking;
  honestyNote: string;
  honestyNoteHi: string;
}

function houseSign(lagnaRashi: number, house: number): number {
  return ((lagnaRashi - 1 + (house - 1)) % 12) + 1;
}

function signName(rashi: number): string {
  return SIGN_NAMES[rashi - 1];
}

function currentAgeFromDob(dob: string): number {
  const [y, m, d] = dob.split('-').map((v) => parseInt(v, 10));
  const now = new Date();
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age -= 1;
  return Math.max(0, age);
}

function yearForAge(dob: string, age: number): number {
  return parseInt(dob.split('-')[0], 10) + age;
}

/** Build the Vimshottari timeline from birth to age 70. */
function buildDashaTimeline(nakshatraId: number, moonPada: number): DashaPeriod[] {
  const startLord = dashaLordForNakshatra(nakshatraId);
  const startIdx = DASHA_ORDER.indexOf(startLord);
  // Moon's pada (1–4) inside the nakshatra: elapsed fraction ≈ ((pada-1) + 0.5) / 4.
  const elapsed = ((Math.min(Math.max(moonPada, 1), 4) - 1) + 0.5) / 4;
  const balance = (1 - elapsed) * DASHA_YEARS[startLord];

  const timeline: DashaPeriod[] = [];
  let age = 0;
  let idx = startIdx;
  // First period: the balance of the birth dasha.
  timeline.push({ lord: startLord, startAge: 0, endAge: balance });
  age = balance;
  idx = (startIdx + 1) % DASHA_ORDER.length;
  while (age < 70) {
    const lord = DASHA_ORDER[idx];
    const years = DASHA_YEARS[lord];
    timeline.push({ lord, startAge: age, endAge: age + years });
    age += years;
    idx = (idx + 1) % DASHA_ORDER.length;
  }
  return timeline;
}

const FAVOURABLE_DASHA_LORDS = ['Venus', 'Jupiter', 'Moon'];

export function predictMarriage(
  dob: string,
  birthTime?: string,
  birthPlace?: string,
  name?: string,
): MarriagePrediction | null {
  if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const [y, m, d] = dob.split('-').map((v) => parseInt(v, 10));
  if (!y || !m || !d || m < 1 || m > 12 || d < 1 || d > 31) return null;
  const dobDate = new Date(y, m - 1, d);
  if (isNaN(dobDate.getTime()) || dobDate.getTime() > Date.now()) return null;

  const hasBirthTime = Boolean(birthTime && birthTime.includes(':'));
  const chart = generateBirthChart({
    dob,
    birthTime: hasBirthTime ? birthTime : undefined,
    birthPlace: birthPlace || undefined,
    mode: hasBirthTime ? 'full' : 'date-only',
  });

  const planetById = (id: string) => chart.planets.find((p) => p.id === id);
  const moon = planetById('moon');
  const venus = planetById('venus');
  const jupiter = planetById('jupiter');
  const saturn = planetById('saturn');
  const mars = planetById('mars');
  if (!moon || !venus || !jupiter || !saturn || !mars) return null;

  // Lagna: ascendant when time is known, Moon sign (Chandra Lagna) otherwise.
  // (calculateAscendant gives the ascendant rashi number directly.)
  const lagnaRashi = hasBirthTime
    ? calculateAscendant(dob, birthTime as string).rashiNumber
    : moon.rashiNumber;
  const lagnaBasis: 'ascendant' | 'moon' = hasBirthTime ? 'ascendant' : 'moon';
  const seventhRashi = houseSign(lagnaRashi, 7);
  const fifthRashi = houseSign(lagnaRashi, 5);
  const seventhLord = SIGN_LORDS[seventhRashi];
  const fifthLord = SIGN_LORDS[fifthRashi];
  const seventhLordPlanet = planetById(seventhLord.toLowerCase());

  const houseOf = (rashi: number): number => ((rashi - lagnaRashi + 12) % 12) + 1;
  const venusHouse = houseOf(venus.rashiNumber);
  const saturnHouse = houseOf(saturn.rashiNumber);
  const moonHouse = houseOf(moon.rashiNumber);

  // ─── Love / arranged lean: deterministic scoring from the chart ───
  let loveScore = 0;
  let arrangedScore = 0;
  const loveReasons: string[] = [];
  const arrangedReasons: string[] = [];

  if (venusHouse === 5 || venusHouse === 7) {
    loveScore += 2;
    loveReasons.push(`Venus, the planet of love, sits in the ${venusHouse === 5 ? '5th' : '7th'} house`);
  }
  if (fifthLord === seventhLord) {
    loveScore += 2;
    loveReasons.push(`the 5th lord and the 7th lord are the same planet (${fifthLord})`);
  }
  if (seventhLordPlanet && venus.rashiNumber === seventhLordPlanet.rashiNumber) {
    loveScore += 1;
    loveReasons.push(`Venus sits with the 7th lord (${seventhLord})`);
  }
  if (moonHouse === 5 || moonHouse === 7) {
    loveScore += 1;
    loveReasons.push('the Moon sits in a house of love or marriage');
  }
  if (saturnHouse === 7) {
    arrangedScore += 2;
    arrangedReasons.push('Saturn sits in the 7th house');
  }
  if (seventhLord === 'Saturn') {
    arrangedScore += 1;
    arrangedReasons.push(`the 7th house is ruled by Saturn (${signName(seventhRashi)})`);
  }
  if (saturnHouse === 5) {
    arrangedScore += 1;
    arrangedReasons.push('Saturn sits in the 5th house of romance');
  }
  const seventhLordHouse = seventhLordPlanet ? houseOf(seventhLordPlanet.rashiNumber) : 0;
  if ([2, 4, 10].includes(seventhLordHouse)) {
    arrangedScore += 1;
    arrangedReasons.push(`the 7th lord sits in the ${seventhLordHouse === 2 ? '2nd' : seventhLordHouse === 4 ? '4th' : '10th'} house of family and standing`);
  }

  let lean: MarriageLean;
  let strength: 'strong' | 'moderate' | 'balanced';
  if (loveScore > arrangedScore) {
    lean = 'love';
    strength = loveScore - arrangedScore >= 3 ? 'strong' : 'moderate';
  } else if (arrangedScore > loveScore) {
    lean = 'arranged';
    strength = arrangedScore - loveScore >= 3 ? 'strong' : 'moderate';
  } else {
    lean = 'balanced';
    strength = 'balanced';
  }

  const leanReason =
    lean === 'love'
      ? `The chart leans towards a love marriage — ${loveReasons.join('; ')}.`
      : lean === 'arranged'
        ? `The chart leans towards an arranged marriage — ${arrangedReasons.join('; ')}.`
        : 'The chart shows both love and arranged indications in balance — neither side dominates.';
  const leanReasonHi =
    lean === 'love'
      ? 'कुंडली प्रेम विवाह की ओर इशारा करती है।'
      : lean === 'arranged'
        ? 'कुंडली अरेंज मैरिज की ओर इशारा करती है।'
        : 'कुंडली में प्रेम और अरेंज दोनों के संकेत बराबर हैं।';

  // ─── Dasha timeline + marriage window ───
  const nakshatra = getNakshatraFromDob(dob, hasBirthTime ? birthTime : undefined);
  const timeline = buildDashaTimeline(nakshatra.id, moon.nakshatraPada || 2);
  const currentAge = currentAgeFromDob(dob);

  const favourable = (lord: string) =>
    FAVOURABLE_DASHA_LORDS.includes(lord) || lord === seventhLord;

  let windowPeriod: DashaPeriod | undefined;
  for (const p of timeline) {
    if (!favourable(p.lord)) continue;
    if (p.endAge <= Math.max(18, currentAge)) continue;
    windowPeriod = p;
    break;
  }
  if (!windowPeriod) windowPeriod = timeline[timeline.length - 1];

  const rangeStart = Math.max(18, currentAge, Math.ceil(windowPeriod.startAge));
  // Always a range of at least two years (e.g. 27–28), never a single year.
  const rangeEnd = Math.max(rangeStart + 1, Math.min(Math.floor(windowPeriod.endAge), rangeStart + 2));
  const marriageAgeRange: [number, number] = [rangeStart, rangeEnd];

  // Peak year: first age in the range where transit Jupiter (about one sign a
  // year from its birth sign) aspects the 7th house (5th / 7th / 9th aspect).
  const birthJupiterRashi = jupiter.rashiNumber;
  let peakAge = rangeStart;
  for (let age = rangeStart; age <= rangeEnd; age++) {
    const transitJupiter = ((birthJupiterRashi - 1 + age) % 12) + 1;
    const rel = (seventhRashi - transitJupiter + 12) % 12;
    if (rel === 4 || rel === 6 || rel === 8) {
      peakAge = age;
      break;
    }
  }

  const marriageWindowLabel = `Age ${rangeStart}–${rangeEnd}`;
  const marriageWindowYears = `${yearForAge(dob, rangeStart)}–${yearForAge(dob, rangeEnd)}`;
  const meetingStart = Math.max(16, rangeStart - 2);
  const meetingEnd = Math.max(meetingStart, rangeStart - 1);
  const meetingWindowLabel = `Age ${meetingStart}–${meetingEnd}`;
  const meetingWindowYears = `${yearForAge(dob, meetingStart)}–${yearForAge(dob, meetingEnd)}`;

  // ─── Partner indications: 7th sign + 7th lord ───
  const element = SIGN_ELEMENTS[seventhRashi];
  const elementLine: Record<string, string> = {
    Fire: 'warm, energetic and direct',
    Earth: 'steady, practical and dependable',
    Air: 'talkative, social and quick-minded',
    Water: 'caring, sensitive and loyal',
  };
  const lordLine: Record<string, string> = {
    Venus: 'charming and artistic, with a love of beauty and comfort',
    Jupiter: 'wise, kind and well-respected',
    Saturn: 'older or more settled, responsible and serious',
    Mars: 'bold, energetic and protective',
    Mercury: 'clever, talkative and quick-witted',
    Sun: 'proud, respected and strong-willed',
    Moon: 'gentle, caring and emotionally close',
  };
  const partnerIndications = [
    `The 7th house falls in ${signName(seventhRashi)} (${element}), ruled by ${seventhLord} — the chart points to a partner who is ${elementLine[element]}.`,
    `With the 7th lord ${seventhLord}, the partner is traditionally read as ${lordLine[seventhLord] || 'steady and supportive'}.`,
    saturnHouse === 7 || seventhLord === 'Saturn'
      ? 'Saturn’s hand on the 7th house suggests the partner may be a few years older than you.'
      : 'No strong Saturn delay on the 7th house — the partner is read as close to your own age.',
    `The meeting is read as coming through ${lean === 'love' ? 'your own circle — friends, work or a place you already go' : 'family, elders or a trusted introduction'}.`,
  ];
  const partnerIndicationsHi = [
    `सप्तम भाव ${SIGN_HINDI[seventhRashi]} राशि में है — जीवनसाथी ${element === 'Fire' ? 'उत्साही और सीधा' : element === 'Earth' ? 'स्थिर और भरोसेमंद' : element === 'Air' ? 'मिलनसार और समझदार' : 'देखभाल करने वाला और वफादार'} होगा।`,
    `सप्तम भाव का स्वामी ${seventhLord} है — जीवनसाथी के बारे में यही संकेत मिलता है।`,
    saturnHouse === 7 || seventhLord === 'Saturn'
      ? 'शनि का प्रभाव बताता है कि जीवनसाथी आपसे कुछ साल बड़ा हो सकता है।'
      : 'सप्तम भाव पर शनि का भारी प्रभाव नहीं है — जीवनसाथी लगभग आपकी ही उम्र का होगा।',
    lean === 'love'
      ? 'मुलाकात अपने ही दायरे से होने का संकेत है — दोस्त, काम या कोई जानी-पहचानी जगह।'
      : 'मुलाकात परिवार या बड़ों के परिचय से होने का संकेत है।',
  ];

  return {
    name: name || '',
    dob,
    currentAge,
    hasBirthTime,
    marriageAgeRange,
    marriageWindowLabel,
    marriageWindowYears,
    peakAge,
    loveOrArranged: { lean, strength, reason: leanReason, reasonHi: leanReasonHi },
    meetingWindowLabel,
    meetingWindowYears,
    partnerIndications,
    partnerIndicationsHi,
    working: {
      lagnaSign: signName(lagnaRashi),
      lagnaBasis,
      seventhHouseSign: signName(seventhRashi),
      seventhLord,
      venusSign: signName(venus.rashiNumber),
      jupiterSign: signName(jupiter.rashiNumber),
      dashaAtMarriage: windowPeriod.lord,
      dashaStartAge: Math.round(windowPeriod.startAge * 10) / 10,
      dashaEndAge: Math.round(windowPeriod.endAge * 10) / 10,
      nakshatra: nakshatra.name,
    },
    honestyNote:
      'This is an astrological indication of timing, not a guaranteed date. The chart favours this window; the real date depends on the people involved.',
    honestyNoteHi:
      'यह ज्योतिषीय संकेत है, कोई पक्की तारीख नहीं। कुंडली इस समय को शुभ बताती है; असली तारीख लोगों पर निर्भर करती है।',
  };
}
