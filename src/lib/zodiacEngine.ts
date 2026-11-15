/**
 * Zodiac Sign Finder Engine
 *
 * Implements:
 * 1. Sun Sign calculation from Date of Birth (standard Western tropical dates)
 * 2. Moon Sign calculation from Date of Birth and optional Birth Time
 * 3. Vedic Rashi calculation (Sidereal Moon sign + Sanskrit/Hindi equivalent)
 * 4. Sign from Name (Avakahada Janmakshar phonetic Moon sign)
 * 5. Element, Ruling Planet, Modality, Qualities, and In-depth Reading
 */

import { getNakshatraFromName, getNakshatraFromDob } from './kundaliEngine';

export type ZodiacFinderMode = 'dob' | 'dob-time' | 'rashi' | 'name';

export interface ZodiacSignDetails {
  id: string;
  name: string;
  rashiName: string;
  symbol: string;
  glyph: string;
  dates: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  rulingPlanet: string;
  personality: string;
  strengths: string[];
  bestMatches: string[];
}

export const ALL_ZODIAC_SIGNS: ZodiacSignDetails[] = [
  {
    id: 'aries',
    name: 'Aries',
    rashiName: 'Mesha (मेष)',
    symbol: 'The Ram',
    glyph: '♈',
    dates: 'March 21 – April 19',
    element: 'Fire',
    modality: 'Cardinal',
    rulingPlanet: 'Mars',
    personality: 'Bold, adventurous, passionate, and pioneering with a natural spark of leadership.',
    strengths: ['Courageous', 'Direct', 'Enthusiastic', 'Determined'],
    bestMatches: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
  },
  {
    id: 'taurus',
    name: 'Taurus',
    rashiName: 'Vrishabha (वृषभ)',
    symbol: 'The Bull',
    glyph: '♉',
    dates: 'April 20 – May 20',
    element: 'Earth',
    modality: 'Fixed',
    rulingPlanet: 'Venus',
    personality: 'Grounded, patient, dependable, and deeply appreciative of beauty, loyalty, and comfort.',
    strengths: ['Reliable', 'Patient', 'Practical', 'Devoted'],
    bestMatches: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    rashiName: 'Mithuna (मिथुन)',
    symbol: 'The Twins',
    glyph: '♊',
    dates: 'May 21 – June 20',
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    personality: 'Curious, witty, communicative, and intellectually agile with an endless thirst for variety.',
    strengths: ['Adaptable', 'Clever', 'Outgoing', 'Expressive'],
    bestMatches: ['Libra', 'Aquarius', 'Aries', 'Leo'],
  },
  {
    id: 'cancer',
    name: 'Cancer',
    rashiName: 'Karka (कर्क)',
    symbol: 'The Crab',
    glyph: '♋',
    dates: 'June 21 – July 22',
    element: 'Water',
    modality: 'Cardinal',
    rulingPlanet: 'Moon',
    personality: 'Empathetic, nurturing, deeply intuitive, and protective of family, home, and loved ones.',
    strengths: ['Compassionate', 'Loyal', 'Intuitive', 'Protective'],
    bestMatches: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
  },
  {
    id: 'leo',
    name: 'Leo',
    rashiName: 'Simha (सिंह)',
    symbol: 'The Lion',
    glyph: '♌',
    dates: 'July 23 – August 22',
    element: 'Fire',
    modality: 'Fixed',
    rulingPlanet: 'Sun',
    personality: 'Radiant, charismatic, generous, and proud with a magnetic warmth that naturally commands the room.',
    strengths: ['Generous', 'Warm-hearted', 'Creative', 'Confident'],
    bestMatches: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
  },
  {
    id: 'virgo',
    name: 'Virgo',
    rashiName: 'Kanya (कन्या)',
    symbol: 'The Maiden',
    glyph: '♍',
    dates: 'August 23 – September 22',
    element: 'Earth',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    personality: 'Methodical, helpful, analytical, and attentive to detail with an intrinsic desire for improvement.',
    strengths: ['Analytical', 'Observant', 'Helpful', 'Precise'],
    bestMatches: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
  },
  {
    id: 'libra',
    name: 'Libra',
    rashiName: 'Tula (तुला)',
    symbol: 'The Scales',
    glyph: '♎',
    dates: 'September 23 – October 22',
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Venus',
    personality: 'Diplomatic, charming, artistic, and fair-minded with a perpetual pursuit of harmony and balance.',
    strengths: ['Harmonious', 'Diplomatic', 'Graceful', 'Fair-minded'],
    bestMatches: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    rashiName: 'Vrishchika (वृश्चिक)',
    symbol: 'The Scorpion',
    glyph: '♏',
    dates: 'October 23 – November 21',
    element: 'Water',
    modality: 'Fixed',
    rulingPlanet: 'Mars & Pluto',
    personality: 'Intense, magnetic, emotionally profound, and fiercely perceptive with unshakeable resolve.',
    strengths: ['Resourceful', 'Passionate', 'Perceptive', 'Brave'],
    bestMatches: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    rashiName: 'Dhanu (धनु)',
    symbol: 'The Archer',
    glyph: '♐',
    dates: 'November 22 – December 21',
    element: 'Fire',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter',
    personality: 'Optimistic, philosophical, free-spirited, and honest with a love for adventure and broad horizons.',
    strengths: ['Optimistic', 'Honest', 'Generous', 'Visionary'],
    bestMatches: ['Aries', 'Leo', 'Libra', 'Aquarius'],
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    rashiName: 'Makara (मकर)',
    symbol: 'The Sea-Goat',
    glyph: '♑',
    dates: 'December 22 – January 19',
    element: 'Earth',
    modality: 'Cardinal',
    rulingPlanet: 'Saturn',
    personality: 'Disciplined, ambitious, patient, and strategically minded with extraordinary endurance.',
    strengths: ['Responsible', 'Disciplined', 'Self-controlled', 'Tenacious'],
    bestMatches: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    rashiName: 'Kumbha (कुंभ)',
    symbol: 'The Water-Bearer',
    glyph: '♒',
    dates: 'January 20 – February 18',
    element: 'Air',
    modality: 'Fixed',
    rulingPlanet: 'Saturn & Uranus',
    personality: 'Visionary, original, humanitarian, and intellectually independent with an progressive outlook.',
    strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
    bestMatches: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
  },
  {
    id: 'pisces',
    name: 'Pisces',
    rashiName: 'Meena (मीन)',
    symbol: 'The Two Fishes',
    glyph: '♓',
    dates: 'February 19 – March 20',
    element: 'Water',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter & Neptune',
    personality: 'Compassionate, artistic, deeply intuitive, and gentle with profound emotional and spiritual empathy.',
    strengths: ['Empathetic', 'Artistic', 'Intuitive', 'Wise'],
    bestMatches: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
  },
];

export interface ZodiacFinderResult {
  mode: ZodiacFinderMode;
  sunSign: ZodiacSignDetails;
  moonSign: ZodiacSignDetails;
  rashi: {
    name: string;
    englishSign: string;
    rashiLord: string;
    nakshatra: string;
    isApproximate: boolean;
  };
  reading: string;
  note: string;
}

/**
 * Determine Sun Sign from month and day (Standard Western Tropical Astrology)
 */
export function getSunSignByDob(dob: string): ZodiacSignDetails {
  const parts = dob.split('-').map(Number);
  const month = parts[1] || 1; // 1 to 12
  const day = parts[2] || 1;   // 1 to 31

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ALL_ZODIAC_SIGNS[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ALL_ZODIAC_SIGNS[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ALL_ZODIAC_SIGNS[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ALL_ZODIAC_SIGNS[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ALL_ZODIAC_SIGNS[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ALL_ZODIAC_SIGNS[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ALL_ZODIAC_SIGNS[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ALL_ZODIAC_SIGNS[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ALL_ZODIAC_SIGNS[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ALL_ZODIAC_SIGNS[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ALL_ZODIAC_SIGNS[10]; // Aquarius
  return ALL_ZODIAC_SIGNS[11]; // Pisces
}

/**
 * Calculate complete Zodiac Finder output
 */
export function findZodiacDetails(
  dob?: string,
  birthTime?: string,
  name?: string,
  mode: ZodiacFinderMode = 'dob'
): ZodiacFinderResult {
  let sunSign = ALL_ZODIAC_SIGNS[0];
  let moonNakshatra = getNakshatraFromDob('2000-01-01');
  let isMoonApproximate = true;

  if (dob) {
    sunSign = getSunSignByDob(dob);
    moonNakshatra = getNakshatraFromDob(dob, birthTime);
    if (birthTime) {
      isMoonApproximate = false;
    }
  } else if (name) {
    moonNakshatra = getNakshatraFromName(name);
    // Approximate Sun sign from Rashi when only name is provided
    sunSign = ALL_ZODIAC_SIGNS[moonNakshatra.rashiIndex];
  }

  const moonSignIndex = moonNakshatra.rashiIndex;
  const moonSign = ALL_ZODIAC_SIGNS[moonSignIndex];

  let note = '';
  if (mode === 'dob' && !birthTime) {
    note = 'Sun sign is exact based on your date of birth. Moon sign and Rashi are calculated for midday (exact birth time refines degrees).';
  } else if (mode === 'name') {
    note = 'Sign and Rashi are determined phonetically from the first letter of your name (Avakahada Chakra). Confirm with your date of birth for exact alignment.';
  } else {
    note = 'Exact Sun sign, Moon sign, and Vedic Rashi computed with Date of Birth and Birth Time.';
  }

  const reading = `Your Sun in ${sunSign.name} (${sunSign.dates}) shapes your outward drive, vital energy, and core personality — marked by ${sunSign.element.toLowerCase()} element traits and ${sunSign.rulingPlanet} stewardship. Your Moon in ${moonSign.name} (${moonNakshatra.name} Nakshatra) illuminates your emotional instincts, inner desires, and unspoken feelings. In the Vedic system, your Janma Rashi is ${moonSign.rashiName}, ruled by ${moonNakshatra.rashiLord}.`;

  return {
    mode,
    sunSign,
    moonSign,
    rashi: {
      name: moonSign.rashiName,
      englishSign: moonSign.name,
      rashiLord: moonNakshatra.rashiLord,
      nakshatra: moonNakshatra.name,
      isApproximate: isMoonApproximate,
    },
    reading,
    note,
  };
}
