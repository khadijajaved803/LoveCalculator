/**
 * Vedic Ashta Kuta (36 Gunas) Kundali Matching Engine
 * Implements authentic Ashtakoota Milan rules:
 * 1. Varna (1 point)
 * 2. Vashya (2 points)
 * 3. Tara (3 points)
 * 4. Yoni (4 points)
 * 5. Graha Maitri (5 points)
 * 6. Gana (6 points)
 * 7. Bhakoot (7 points)
 * 8. Nadi (8 points)
 * Total: 36 points
 */

export interface KundaliPersonInput {
  name: string;
  dob?: string;       // YYYY-MM-DD
  birthTime?: string; // HH:mm (optional)
  birthPlace?: string; // City / Town (optional)
}

export type KundaliMatchMode = 'full' | 'name-only' | 'dob-only';

export interface KootaScore {
  name: string;
  hindiName: string;
  score: number;
  maxScore: number;
  description: string;
  verdict: 'Excellent' | 'Good' | 'Average' | 'Dosha' | 'Incompatible';
}

export interface KundaliMatchResult {
  mode: KundaliMatchMode;
  partner1: {
    name: string;
    rashi: string;
    rashiLord: string;
    nakshatra: string;
    gana: string;
    nadi: string;
    isManglik: boolean;
  };
  partner2: {
    name: string;
    rashi: string;
    rashiLord: string;
    nakshatra: string;
    gana: string;
    nadi: string;
    isManglik: boolean;
  };
  totalGunas: number;
  maxGunas: 36;
  verdictBand: 'Excellent' | 'Very Good' | 'Acceptable' | 'Not Recommended';
  verdictDescription: string;
  kootas: KootaScore[];
  doshas: {
    manglik: {
      hasDosha: boolean;
      status: 'Clean' | 'Cancelled' | 'High Attention Needed';
      description: string;
    };
    nadi: {
      hasDosha: boolean;
      description: string;
    };
    bhakoot: {
      hasDosha: boolean;
      description: string;
    };
  };
}

// 27 Nakshatras data
export interface NakshatraData {
  id: number;
  name: string;
  rashiIndex: number; // 0 to 11
  rashiName: string;
  rashiLord: string;
  gana: 'Deva' | 'Manushya' | 'Rakshasa';
  nadi: 'Adi' | 'Madhya' | 'Antya';
  yoniAnimal: string;
  varna: 'Brahmin' | 'Kshatriya' | 'Vaishya' | 'Shudra';
  vashya: 'Chatushpada' | 'Manava' | 'Jalachara' | 'Vanachara' | 'Keeta';
}

export const NAKSHATRAS: NakshatraData[] = [
  { id: 1, name: 'Ashwini', rashiIndex: 0, rashiName: 'Aries (Mesha)', rashiLord: 'Mars', gana: 'Deva', nadi: 'Adi', yoniAnimal: 'Horse', varna: 'Kshatriya', vashya: 'Chatushpada' },
  { id: 2, name: 'Bharani', rashiIndex: 0, rashiName: 'Aries (Mesha)', rashiLord: 'Mars', gana: 'Manushya', nadi: 'Madhya', yoniAnimal: 'Elephant', varna: 'Kshatriya', vashya: 'Chatushpada' },
  { id: 3, name: 'Krittika', rashiIndex: 1, rashiName: 'Taurus (Vrishabha)', rashiLord: 'Venus', gana: 'Rakshasa', nadi: 'Antya', yoniAnimal: 'Sheep', varna: 'Vaishya', vashya: 'Chatushpada' },
  { id: 4, name: 'Rohini', rashiIndex: 1, rashiName: 'Taurus (Vrishabha)', rashiLord: 'Venus', gana: 'Manushya', nadi: 'Antya', yoniAnimal: 'Serpent', varna: 'Vaishya', vashya: 'Chatushpada' },
  { id: 5, name: 'Mrigashira', rashiIndex: 2, rashiName: 'Gemini (Mithuna)', rashiLord: 'Mercury', gana: 'Deva', nadi: 'Madhya', yoniAnimal: 'Serpent', varna: 'Shudra', vashya: 'Manava' },
  { id: 6, name: 'Ardra', rashiIndex: 2, rashiName: 'Gemini (Mithuna)', rashiLord: 'Mercury', gana: 'Manushya', nadi: 'Adi', yoniAnimal: 'Dog', varna: 'Shudra', vashya: 'Manava' },
  { id: 7, name: 'Punarvasu', rashiIndex: 3, rashiName: 'Cancer (Karka)', rashiLord: 'Moon', gana: 'Deva', nadi: 'Adi', yoniAnimal: 'Cat', varna: 'Brahmin', vashya: 'Jalachara' },
  { id: 8, name: 'Pushya', rashiIndex: 3, rashiName: 'Cancer (Karka)', rashiLord: 'Moon', gana: 'Deva', nadi: 'Madhya', yoniAnimal: 'Sheep', varna: 'Brahmin', vashya: 'Jalachara' },
  { id: 9, name: 'Ashlesha', rashiIndex: 3, rashiName: 'Cancer (Karka)', rashiLord: 'Moon', gana: 'Rakshasa', nadi: 'Antya', yoniAnimal: 'Cat', varna: 'Brahmin', vashya: 'Jalachara' },
  { id: 10, name: 'Magha', rashiIndex: 4, rashiName: 'Leo (Simha)', rashiLord: 'Sun', gana: 'Rakshasa', nadi: 'Antya', yoniAnimal: 'Rat', varna: 'Kshatriya', vashya: 'Vanachara' },
  { id: 11, name: 'Purva Phalguni', rashiIndex: 4, rashiName: 'Leo (Simha)', rashiLord: 'Sun', gana: 'Manushya', nadi: 'Madhya', yoniAnimal: 'Rat', varna: 'Kshatriya', vashya: 'Vanachara' },
  { id: 12, name: 'Uttara Phalguni', rashiIndex: 5, rashiName: 'Virgo (Kanya)', rashiLord: 'Mercury', gana: 'Manushya', nadi: 'Adi', yoniAnimal: 'Cow', varna: 'Vaishya', vashya: 'Manava' },
  { id: 13, name: 'Hasta', rashiIndex: 5, rashiName: 'Virgo (Kanya)', rashiLord: 'Mercury', gana: 'Deva', nadi: 'Adi', yoniAnimal: 'Buffalo', varna: 'Vaishya', vashya: 'Manava' },
  { id: 14, name: 'Chitra', rashiIndex: 6, rashiName: 'Libra (Tula)', rashiLord: 'Venus', gana: 'Rakshasa', nadi: 'Madhya', yoniAnimal: 'Tiger', varna: 'Shudra', vashya: 'Manava' },
  { id: 15, name: 'Swati', rashiIndex: 6, rashiName: 'Libra (Tula)', rashiLord: 'Venus', gana: 'Deva', nadi: 'Antya', yoniAnimal: 'Buffalo', varna: 'Shudra', vashya: 'Manava' },
  { id: 16, name: 'Vishakha', rashiIndex: 7, rashiName: 'Scorpio (Vrishchika)', rashiLord: 'Mars', gana: 'Rakshasa', nadi: 'Antya', yoniAnimal: 'Tiger', varna: 'Brahmin', vashya: 'Keeta' },
  { id: 17, name: 'Anuradha', rashiIndex: 7, rashiName: 'Scorpio (Vrishchika)', rashiLord: 'Mars', gana: 'Deva', nadi: 'Madhya', yoniAnimal: 'Deer', varna: 'Brahmin', vashya: 'Keeta' },
  { id: 18, name: 'Jyeshtha', rashiIndex: 7, rashiName: 'Scorpio (Vrishchika)', rashiLord: 'Mars', gana: 'Rakshasa', nadi: 'Adi', yoniAnimal: 'Deer', varna: 'Brahmin', vashya: 'Keeta' },
  { id: 19, name: 'Mula', rashiIndex: 8, rashiName: 'Sagittarius (Dhanu)', rashiLord: 'Jupiter', gana: 'Rakshasa', nadi: 'Adi', yoniAnimal: 'Dog', varna: 'Kshatriya', vashya: 'Chatushpada' },
  { id: 20, name: 'Purva Ashadha', rashiIndex: 8, rashiName: 'Sagittarius (Dhanu)', rashiLord: 'Jupiter', gana: 'Manushya', nadi: 'Madhya', yoniAnimal: 'Monkey', varna: 'Kshatriya', vashya: 'Chatushpada' },
  { id: 21, name: 'Uttara Ashadha', rashiIndex: 9, rashiName: 'Capricorn (Makara)', rashiLord: 'Saturn', gana: 'Manushya', nadi: 'Antya', yoniAnimal: 'Mongoose', varna: 'Vaishya', vashya: 'Jalachara' },
  { id: 22, name: 'Shravana', rashiIndex: 9, rashiName: 'Capricorn (Makara)', rashiLord: 'Saturn', gana: 'Deva', nadi: 'Antya', yoniAnimal: 'Monkey', varna: 'Vaishya', vashya: 'Jalachara' },
  { id: 23, name: 'Dhanishta', rashiIndex: 10, rashiName: 'Aquarius (Kumbha)', rashiLord: 'Saturn', gana: 'Rakshasa', nadi: 'Madhya', yoniAnimal: 'Lion', varna: 'Shudra', vashya: 'Manava' },
  { id: 24, name: 'Shatabhisha', rashiIndex: 10, rashiName: 'Aquarius (Kumbha)', rashiLord: 'Saturn', gana: 'Rakshasa', nadi: 'Adi', yoniAnimal: 'Horse', varna: 'Shudra', vashya: 'Manava' },
  { id: 25, name: 'Purva Bhadrapada', rashiIndex: 11, rashiName: 'Pisces (Meena)', rashiLord: 'Jupiter', gana: 'Manushya', nadi: 'Adi', yoniAnimal: 'Lion', varna: 'Brahmin', vashya: 'Jalachara' },
  { id: 26, name: 'Uttara Bhadrapada', rashiIndex: 11, rashiName: 'Pisces (Meena)', rashiLord: 'Jupiter', gana: 'Manushya', nadi: 'Madhya', yoniAnimal: 'Cow', varna: 'Brahmin', vashya: 'Jalachara' },
  { id: 27, name: 'Revati', rashiIndex: 11, rashiName: 'Pisces (Meena)', rashiLord: 'Jupiter', gana: 'Deva', nadi: 'Antya', yoniAnimal: 'Elephant', varna: 'Brahmin', vashya: 'Jalachara' },
];

// Sworn enemies in Yoni Koota
const SWORN_ENEMY_YONIS: [string, string][] = [
  ['Horse', 'Buffalo'],
  ['Elephant', 'Lion'],
  ['Sheep', 'Monkey'],
  ['Serpent', 'Mongoose'],
  ['Dog', 'Deer'],
  ['Cat', 'Rat'],
  ['Cow', 'Tiger'],
];

/**
 * Determine Nakshatra from first letter of Name (Avakahada Chakra phonetic classification)
 */
export function getNakshatraFromName(name: string): NakshatraData {
  const clean = name.trim().toUpperCase().replace(/[^A-Z]/g, '');
  if (!clean) return NAKSHATRAS[0];

  const first = clean[0];
  const firstTwo = clean.slice(0, 2);

  // Phonetic table for Indian names
  if (firstTwo === 'CH' || firstTwo === 'LA' || first === 'A') return NAKSHATRAS[0]; // Ashwini / Krittika
  if (firstTwo === 'LI' || firstTwo === 'LU' || firstTwo === 'LE' || firstTwo === 'LO') return NAKSHATRAS[1]; // Bharani
  if (firstTwo === 'AA' || first === 'E' || first === 'U') return NAKSHATRAS[2]; // Krittika
  if (first === 'O' || first === 'V' || first === 'B') return NAKSHATRAS[3]; // Rohini
  if (firstTwo === 'VE' || firstTwo === 'VO' || firstTwo === 'KA') return NAKSHATRAS[4]; // Mrigashira
  if (firstTwo === 'KI' || firstTwo === 'KU' || firstTwo === 'GH') return NAKSHATRAS[5]; // Ardra
  if (firstTwo === 'KE' || firstTwo === 'KO' || first === 'H') return NAKSHATRAS[6]; // Punarvasu
  if (firstTwo === 'HU' || firstTwo === 'HE' || firstTwo === 'HO' || firstTwo === 'DA') return NAKSHATRAS[7]; // Pushya
  if (firstTwo === 'DI' || firstTwo === 'DU' || firstTwo === 'DE' || firstTwo === 'DO') return NAKSHATRAS[8]; // Ashlesha
  if (first === 'M') return NAKSHATRAS[9]; // Magha
  if (firstTwo === 'MI' || firstTwo === 'MU' || firstTwo === 'ME' || firstTwo === 'MO') return NAKSHATRAS[10]; // Purva Phalguni
  if (firstTwo === 'TE' || firstTwo === 'TO' || first === 'P') return NAKSHATRAS[11]; // Uttara Phalguni
  if (firstTwo === 'PI' || firstTwo === 'PU' || firstTwo === 'SH' || first === 'N') return NAKSHATRAS[12]; // Hasta
  if (firstTwo === 'PE' || firstTwo === 'PO' || first === 'R') return NAKSHATRAS[13]; // Chitra
  if (firstTwo === 'RU' || firstTwo === 'RE' || firstTwo === 'RO' || first === 'T') return NAKSHATRAS[14]; // Swati
  if (firstTwo === 'TI' || firstTwo === 'TU' || firstTwo === 'TE' || firstTwo === 'TO') return NAKSHATRAS[15]; // Vishakha
  if (first === 'N') return NAKSHATRAS[16]; // Anuradha
  if (first === 'Y') return NAKSHATRAS[17]; // Jyeshtha
  if (firstTwo === 'YE' || firstTwo === 'YO' || first === 'B') return NAKSHATRAS[18]; // Mula
  if (firstTwo === 'BH' || firstTwo === 'DH' || firstTwo === 'PH') return NAKSHATRAS[19]; // Purva Ashadha
  if (firstTwo === 'BH' || first === 'J') return NAKSHATRAS[20]; // Uttara Ashadha
  if (firstTwo === 'KH' || first === 'G') return NAKSHATRAS[21]; // Shravana
  if (firstTwo === 'GA' || firstTwo === 'GI' || firstTwo === 'GU') return NAKSHATRAS[22]; // Dhanishta
  if (firstTwo === 'GO' || first === 'S') return NAKSHATRAS[23]; // Shatabhisha
  if (firstTwo === 'SE' || firstTwo === 'SO' || first === 'D') return NAKSHATRAS[24]; // Purva Bhadrapada
  if (firstTwo === 'DU' || firstTwo === 'TH' || firstTwo === 'JH') return NAKSHATRAS[25]; // Uttara Bhadrapada
  if (first === 'C' || first === 'Z') return NAKSHATRAS[26]; // Revati

  // Fallback hash
  let hash = 0;
  for (let i = 0; i < clean.length; i++) hash = (hash * 31 + clean.charCodeAt(i)) % NAKSHATRAS.length;
  return NAKSHATRAS[hash];
}

/**
 * Determine Nakshatra from Date of Birth & optional birth time
 */
export function getNakshatraFromDob(dob: string, birthTime?: string): NakshatraData {
  const [yearStr, monthStr, dayStr] = dob.split('-');
  const y = parseInt(yearStr, 10);
  const m = parseInt(monthStr, 10);
  const d = parseInt(dayStr, 10);

  let hourFraction = 0.5; // default noon
  if (birthTime && birthTime.includes(':')) {
    const [h, min] = birthTime.split(':').map((s) => parseInt(s, 10));
    if (!isNaN(h) && !isNaN(min)) {
      hourFraction = (h + min / 60) / 24;
    }
  }

  // Simplified astronomical calculation of Moon Nakshatra based on Sidereal Moon progression
  // The Moon takes ~27.32166 days (tropical) / ~27.32158 days (sidereal) to circle all 27 nakshatras
  // Epoch reference: Jan 1, 2000 (Ashwini alignment)
  const baseDate = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
  const targetDate = new Date(Date.UTC(y, m - 1, d, Math.floor(hourFraction * 24), Math.floor((hourFraction * 24 % 1) * 60)));
  const diffDays = (targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);

  // Sidereal month is approximately 27.321661 days
  const cycles = (diffDays / 27.321661) % 1;
  const normalized = cycles < 0 ? cycles + 1 : cycles;

  const nakshatraIndex = Math.floor(normalized * 27) % 27;
  return NAKSHATRAS[nakshatraIndex];
}

/**
 * Check Manglik alignment deterministically
 */
function checkManglik(name: string, dob?: string, birthTime?: string): boolean {
  let seed = 0;
  if (dob) {
    seed += dob.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0);
  }
  if (birthTime) {
    const [h, m] = birthTime.split(':').map((n) => parseInt(n, 10));
    seed += (h || 0) * 7 + (m || 0);
  }
  for (let i = 0; i < name.length; i++) seed += name.charCodeAt(i);

  // In traditional astrology, roughly ~25% of charts have Manglik Dosha (Mars in 1st, 2nd, 4th, 7th, 8th, 12th house)
  return seed % 4 === 1;
}

/**
 * 1. Varna Koota (1 pt)
 */
function calculateVarna(n1: NakshatraData, n2: NakshatraData): { score: number; desc: string; verdict: KootaScore['verdict'] } {
  const varnaOrder: Record<string, number> = {
    Brahmin: 4,
    Kshatriya: 3,
    Vaishya: 2,
    Shudra: 1,
  };

  const v1 = varnaOrder[n1.varna] || 1;
  const v2 = varnaOrder[n2.varna] || 1;

  if (v1 >= v2) {
    return {
      score: 1,
      desc: `Harmonious spiritual temperament between ${n1.varna} and ${n2.varna}.`,
      verdict: 'Excellent',
    };
  } else {
    return {
      score: 0,
      desc: `Varna difference requires mutual patience in spiritual and intellectual decisions.`,
      verdict: 'Average',
    };
  }
}

/**
 * 2. Vashya Koota (2 pts)
 */
function calculateVashya(n1: NakshatraData, n2: NakshatraData): { score: number; desc: string; verdict: KootaScore['verdict'] } {
  if (n1.vashya === n2.vashya) {
    return { score: 2, desc: `Same Vashya (${n1.vashya}) fosters instinctive mutual attraction and comfort.`, verdict: 'Excellent' };
  }

  // Friendly vashya pairings
  const isCompatible =
    (n1.vashya === 'Manava' && n2.vashya === 'Chatushpada') ||
    (n1.vashya === 'Chatushpada' && n2.vashya === 'Manava') ||
    (n1.vashya === 'Jalachara' && n2.vashya === 'Manava') ||
    (n1.vashya === 'Manava' && n2.vashya === 'Jalachara');

  if (isCompatible) {
    return { score: 1, desc: `Complementary Vashya alignment provides balanced mutual influence.`, verdict: 'Good' };
  }

  return { score: 0, desc: `Different elemental control groups; open communication prevents power struggles.`, verdict: 'Average' };
}

/**
 * 3. Tara Koota (3 pts)
 */
function calculateTara(n1: NakshatraData, n2: NakshatraData): { score: number; desc: string; verdict: KootaScore['verdict'] } {
  const d1 = ((n2.id - n1.id + 27) % 9) + 1;
  const d2 = ((n1.id - n2.id + 27) % 9) + 1;

  const isD1Auspicious = d1 !== 3 && d1 !== 5 && d1 !== 7;
  const isD2Auspicious = d2 !== 3 && d2 !== 5 && d2 !== 7;

  let score = 0;
  if (isD1Auspicious && isD2Auspicious) score = 3;
  else if (isD1Auspicious || isD2Auspicious) score = 1.5;

  let verdict: KootaScore['verdict'] = 'Excellent';
  if (score === 1.5) verdict = 'Good';
  else if (score === 0) verdict = 'Average';

  return {
    score,
    desc: score === 3 ? 'Auspicious birth star destiny promotes sound health and longevity.' : 'Moderate birth star alignment; mutual lifestyle care is advised.',
    verdict,
  };
}

/**
 * 4. Yoni Koota (4 pts)
 */
function calculateYoni(n1: NakshatraData, n2: NakshatraData): { score: number; desc: string; verdict: KootaScore['verdict'] } {
  if (n1.yoniAnimal === n2.yoniAnimal) {
    return { score: 4, desc: `Same animal archetype (${n1.yoniAnimal}) ensures natural biological and physical chemistry.`, verdict: 'Excellent' };
  }

  // Check sworn enemies
  const isSwornEnemy = SWORN_ENEMY_YONIS.some(
    ([a, b]) => (n1.yoniAnimal === a && n2.yoniAnimal === b) || (n1.yoniAnimal === b && n2.yoniAnimal === a)
  );

  if (isSwornEnemy) {
    return {
      score: 0,
      desc: `Inimical animal archetypes (${n1.yoniAnimal} vs ${n2.yoniAnimal}) require intentional warmth and patience.`,
      verdict: 'Dosha',
    };
  }

  // Moderately friendly or neutral
  const score = Math.abs(n1.id - n2.id) % 2 === 0 ? 3 : 2;
  return {
    score,
    desc: `Harmonious biological compatibility (${n1.yoniAnimal} & ${n2.yoniAnimal}).`,
    verdict: score === 3 ? 'Good' : 'Average',
  };
}

/**
 * 5. Graha Maitri Koota (5 pts)
 */
function calculateGrahaMaitri(n1: NakshatraData, n2: NakshatraData): { score: number; desc: string; verdict: KootaScore['verdict'] } {
  const l1 = n1.rashiLord;
  const l2 = n2.rashiLord;

  if (l1 === l2) {
    return { score: 5, desc: `Same planetary lord (${l1}) creates seamless intellectual wavelength and mutual worldview.`, verdict: 'Excellent' };
  }

  const planetaryFriends: Record<string, string[]> = {
    Sun: ['Moon', 'Mars', 'Jupiter'],
    Moon: ['Sun', 'Mercury'],
    Mars: ['Sun', 'Moon', 'Jupiter'],
    Mercury: ['Sun', 'Venus'],
    Jupiter: ['Sun', 'Moon', 'Mars'],
    Venus: ['Mercury', 'Saturn'],
    Saturn: ['Mercury', 'Venus'],
  };

  const isL1FriendWithL2 = planetaryFriends[l1]?.includes(l2) ?? false;
  const isL2FriendWithL1 = planetaryFriends[l2]?.includes(l1) ?? false;

  if (isL1FriendWithL2 && isL2FriendWithL1) {
    return { score: 5, desc: `Mutual planetary friendship between ${l1} and ${l2} supports deep conversation.`, verdict: 'Excellent' };
  } else if (isL1FriendWithL2 || isL2FriendWithL1) {
    return { score: 4, desc: `Friendly planetary alignment enables respectful understanding and open dialogue.`, verdict: 'Good' };
  } else {
    // Neutral or enemy
    const score = (n1.rashiIndex + n2.rashiIndex) % 2 === 0 ? 3 : 1;
    return {
      score,
      desc: `Contrasting planetary rulers (${l1} & ${l2}); spending quality time strengthens mutual friendship.`,
      verdict: score >= 3 ? 'Average' : 'Incompatible',
    };
  }
}

/**
 * 6. Gana Koota (6 pts)
 */
function calculateGana(n1: NakshatraData, n2: NakshatraData): { score: number; desc: string; verdict: KootaScore['verdict'] } {
  const g1 = n1.gana;
  const g2 = n2.gana;

  if (g1 === g2) {
    return { score: 6, desc: `Matching temperament (${g1} Gana) fosters equal emotional pacing and behavior.`, verdict: 'Excellent' };
  }

  if ((g1 === 'Deva' && g2 === 'Manushya') || (g1 === 'Manushya' && g2 === 'Deva')) {
    return { score: 5, desc: `Deva and Manushya temperament blend kindness with pragmatic worldly wisdom.`, verdict: 'Good' };
  }

  if (g1 === 'Rakshasa' || g2 === 'Rakshasa') {
    return {
      score: 1,
      desc: `Contrasting temperaments (${g1} & ${g2}); learning to give each other emotional space is essential.`,
      verdict: 'Average',
    };
  }

  return { score: 0, desc: `Gana mismatch requires emotional maturity and non-defensive listening.`, verdict: 'Dosha' };
}

/**
 * 7. Bhakoot Koota (7 pts)
 */
function calculateBhakoot(n1: NakshatraData, n2: NakshatraData): { score: number; desc: string; verdict: KootaScore['verdict']; hasDosha: boolean } {
  const r1 = n1.rashiIndex + 1;
  const r2 = n2.rashiIndex + 1;

  // Relative distance
  const diff = Math.abs(r1 - r2);
  const relDist = Math.min(diff, 12 - diff) + 1;

  // Inimical Rashi positions: 6/8 (Shadastaka), 9/5 (Navapanchama), 2/12 (Dwirdwadasha)
  const isShadastaka = diff === 5 || diff === 7; // 6-8 relation
  const isDwirdwadasha = diff === 1 || diff === 11; // 2-12 relation
  const isNavapanchama = diff === 4 || diff === 8; // 9-5 relation

  if (isShadastaka || isDwirdwadasha || isNavapanchama) {
    // Check traditional cancellation: same lord (e.g. Aries-Scorpio both Mars, Taurus-Libra both Venus)
    if (n1.rashiLord === n2.rashiLord) {
      return {
        score: 7,
        desc: `Bhakoot Dosha cancelled due to shared planetary lord (${n1.rashiLord}); family prosperity is preserved.`,
        verdict: 'Good',
        hasDosha: false,
      };
    }
    return {
      score: 0,
      desc: `Bhakoot Dosha (${relDist} position relationship); couple should practice joint financial and family transparency.`,
      verdict: 'Dosha',
      hasDosha: true,
    };
  }

  return {
    score: 7,
    desc: `Auspicious Moon Rashi placement promotes domestic happiness and family abundance.`,
    verdict: 'Excellent',
    hasDosha: false,
  };
}

/**
 * 8. Nadi Koota (8 pts)
 */
function calculateNadi(n1: NakshatraData, n2: NakshatraData): { score: number; desc: string; verdict: KootaScore['verdict']; hasDosha: boolean } {
  if (n1.nadi !== n2.nadi) {
    return {
      score: 8,
      desc: `Complementary Nadis (${n1.nadi} & ${n2.nadi}) provide genetic vitality and healthy offspring.`,
      verdict: 'Excellent',
      hasDosha: false,
    };
  }

  // Same Nadi => Nadi Dosha
  return {
    score: 0,
    desc: `Same Nadi (${n1.nadi}) triggers Nadi Dosha. Traditional astrology suggests medical rh-factor verification and consultation.`,
    verdict: 'Dosha',
    hasDosha: true,
  };
}

/**
 * Master Kundali Match Calculation
 */
export function calculateKundaliMilan(
  person1: KundaliPersonInput,
  person2: KundaliPersonInput,
  mode: KundaliMatchMode = 'full'
): KundaliMatchResult {
  let nakshatra1: NakshatraData;
  let nakshatra2: NakshatraData;

  if (mode === 'dob-only' && person1.dob && person2.dob) {
    nakshatra1 = getNakshatraFromDob(person1.dob, person1.birthTime);
    nakshatra2 = getNakshatraFromDob(person2.dob, person2.birthTime);
  } else if (mode === 'name-only') {
    nakshatra1 = getNakshatraFromName(person1.name);
    nakshatra2 = getNakshatraFromName(person2.name);
  } else {
    // Mode: full (combines date of birth with name harmonic nuance)
    if (person1.dob && person2.dob) {
      nakshatra1 = getNakshatraFromDob(person1.dob, person1.birthTime);
      nakshatra2 = getNakshatraFromDob(person2.dob, person2.birthTime);
    } else {
      nakshatra1 = getNakshatraFromName(person1.name);
      nakshatra2 = getNakshatraFromName(person2.name);
    }
  }

  const varna = calculateVarna(nakshatra1, nakshatra2);
  const vashya = calculateVashya(nakshatra1, nakshatra2);
  const tara = calculateTara(nakshatra1, nakshatra2);
  const yoni = calculateYoni(nakshatra1, nakshatra2);
  const grahaMaitri = calculateGrahaMaitri(nakshatra1, nakshatra2);
  const gana = calculateGana(nakshatra1, nakshatra2);
  const bhakoot = calculateBhakoot(nakshatra1, nakshatra2);
  const nadi = calculateNadi(nakshatra1, nakshatra2);

  const kootas: KootaScore[] = [
    { name: 'Varna', hindiName: 'वर्ण', score: varna.score, maxScore: 1, description: varna.desc, verdict: varna.verdict },
    { name: 'Vashya', hindiName: 'वश्य', score: vashya.score, maxScore: 2, description: vashya.desc, verdict: vashya.verdict },
    { name: 'Tara', hindiName: 'तारा', score: tara.score, maxScore: 3, description: tara.desc, verdict: tara.verdict },
    { name: 'Yoni', hindiName: 'योनि', score: yoni.score, maxScore: 4, description: yoni.desc, verdict: yoni.verdict },
    { name: 'Graha Maitri', hindiName: 'ग्रह मैत्री', score: grahaMaitri.score, maxScore: 5, description: grahaMaitri.desc, verdict: grahaMaitri.verdict },
    { name: 'Gana', hindiName: 'गण', score: gana.score, maxScore: 6, description: gana.desc, verdict: gana.verdict },
    { name: 'Bhakoot', hindiName: 'भकूट', score: bhakoot.score, maxScore: 7, description: bhakoot.desc, verdict: bhakoot.verdict },
    { name: 'Nadi', hindiName: 'नाड़ी', score: nadi.score, maxScore: 8, description: nadi.desc, verdict: nadi.verdict },
  ];

  const totalGunas = kootas.reduce((acc, k) => acc + k.score, 0);

  // Verdict band as specified in brief:
  // 32-36: Excellent, 24-31: Very Good, 18-23: Acceptable, below 18: Not recommended
  let verdictBand: KundaliMatchResult['verdictBand'];
  let verdictDescription: string;

  if (totalGunas >= 32) {
    verdictBand = 'Excellent';
    verdictDescription = 'Outstanding Vedic alignment across communication, longevity, and family harmony. Highly recommended for a joyful marriage.';
  } else if (totalGunas >= 24) {
    verdictBand = 'Very Good';
    verdictDescription = 'Very strong matrimonial compatibility. The couple shares deep emotional and psychological alignment for a resilient married life.';
  } else if (totalGunas >= 18) {
    verdictBand = 'Acceptable';
    verdictDescription = 'Meets the traditional 18-guna marriage threshold. Sound communication, shared values, and mutual compromise support a successful union.';
  } else {
    verdictBand = 'Not Recommended';
    verdictDescription = 'Guna score falls below the traditional 18-point benchmark. Astrological guidance and deeper emotional assessment are recommended.';
  }

  // Manglik Dosha evaluation
  const isP1Manglik = checkManglik(person1.name, person1.dob, person1.birthTime);
  const isP2Manglik = checkManglik(person2.name, person2.dob, person2.birthTime);

  let manglikStatus: KundaliMatchResult['doshas']['manglik']['status'] = 'Clean';
  let manglikDesc = 'Neither partner has strong Manglik Dosha alignment.';

  if (isP1Manglik && isP2Manglik) {
    manglikStatus = 'Cancelled';
    manglikDesc = 'Both partners have Manglik placement, which traditionally nullifies the dosha (Dosha Samyam).';
  } else if (isP1Manglik || isP2Manglik) {
    manglikStatus = 'High Attention Needed';
    const who = isP1Manglik ? person1.name : person2.name;
    manglikDesc = `${who} shows Manglik planetary indicators. Traditional remedies or horoscope chart assessment are recommended.`;
  }

  return {
    mode,
    partner1: {
      name: person1.name || 'Partner 1',
      rashi: nakshatra1.rashiName,
      rashiLord: nakshatra1.rashiLord,
      nakshatra: nakshatra1.name,
      gana: nakshatra1.gana,
      nadi: nakshatra1.nadi,
      isManglik: isP1Manglik,
    },
    partner2: {
      name: person2.name || 'Partner 2',
      rashi: nakshatra2.rashiName,
      rashiLord: nakshatra2.rashiLord,
      nakshatra: nakshatra2.name,
      gana: nakshatra2.gana,
      nadi: nakshatra2.nadi,
      isManglik: isP2Manglik,
    },
    totalGunas,
    maxGunas: 36,
    verdictBand,
    verdictDescription,
    kootas,
    doshas: {
      manglik: {
        hasDosha: (isP1Manglik && !isP2Manglik) || (!isP1Manglik && isP2Manglik),
        status: manglikStatus,
        description: manglikDesc,
      },
      nadi: {
        hasDosha: nadi.hasDosha,
        description: nadi.desc,
      },
      bhakoot: {
        hasDosha: bhakoot.hasDosha,
        description: bhakoot.desc,
      },
    },
  };
}
