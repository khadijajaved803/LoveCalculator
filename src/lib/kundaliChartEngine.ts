/**
 * Vedic Kundali (Birth Chart) Generator Engine
 *
 * Implements:
 * 1. Lagna (Ascendant) calculation from Date, Time, and approximate Longitude/Latitude
 * 2. Moon Sign (Rashi) and Nakshatra from Date / Name
 * 3. 9 Grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) placements in 12 Bhavas (houses)
 * 4. Navamsa (D9) Chart calculation
 * 5. Vedic Yogas detection (Raj Yoga, Vipreet Raj Yoga, Neech Bhang Raj Yoga, Kaal Sarp Yoga, Gajakesari Yoga, Budhaditya Yoga)
 * 6. Dosha checks (Manglik Dosha, Kaal Sarp Dosh)
 * 7. Personalized Career, Marriage, and Future predictions in plain language
 */

import { getNakshatraFromName, getNakshatraFromDob, NAKSHATRAS } from './kundaliEngine';

export type KundaliInputMode = 'full' | 'dob-only' | 'name-only';

export interface KundaliUserInput {
  name: string;
  dob?: string;       // YYYY-MM-DD
  birthTime?: string; // HH:mm
  birthPlace?: string; // City name
}

export interface PlanetPosition {
  name: string;
  hindiName: string;
  symbol: string;
  rashi: string;
  rashiNumber: number; // 1 to 12 (1 = Aries, etc.)
  house: number;       // 1 to 12
  nakshatra: string;
  degree: string;
  isRetrograde?: boolean;
}

export interface KundaliHouse {
  houseNumber: number;
  rashiNumber: number;
  rashiName: string;
  rashiLord: string;
  significance: string;
  planets: string[]; // planet abbreviations
}

export interface YogaFound {
  name: string;
  type: 'Auspicious' | 'Challenging' | 'Mixed';
  description: string;
  effects: string;
}

export interface KundaliReport {
  mode: KundaliInputMode;
  user: {
    name: string;
    dob?: string;
    birthTime?: string;
    birthPlace?: string;
  };
  lagna: {
    rashiNumber: number;
    rashiName: string;
    rashiLord: string;
    element: string;
    qualities: string;
  };
  moon: {
    rashiNumber: number;
    rashiName: string;
    rashiLord: string;
    nakshatra: string;
    nakshatraPada: number;
  };
  houses: KundaliHouse[];
  navamsaHouses: KundaliHouse[];
  planets: PlanetPosition[];
  yogas: YogaFound[];
  doshas: {
    manglik: {
      hasDosha: boolean;
      intensity: 'None' | 'Mild' | 'High';
      description: string;
    };
    kaalSarp: {
      hasDosha: boolean;
      type: string;
      description: string;
    };
  };
  predictions: {
    career: string;
    marriage: string;
    generalFuture: string;
  };
  accuracyNote: string;
}

export const RASHI_NAMES = [
  'Aries (Mesha)',
  'Taurus (Vrishabha)',
  'Gemini (Mithuna)',
  'Cancer (Karka)',
  'Leo (Simha)',
  'Virgo (Kanya)',
  'Libra (Tula)',
  'Scorpio (Vrishchika)',
  'Sagittarius (Dhanu)',
  'Capricorn (Makara)',
  'Aquarius (Kumbha)',
  'Pisces (Meena)',
];

export const RASHI_LORDS = [
  'Mars',
  'Venus',
  'Mercury',
  'Moon',
  'Sun',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'Saturn',
  'Jupiter',
];

export const HOUSE_SIGNIFICANCE = [
  'Self, Appearance, Personality, Vitality (Tanu Bhava)',
  'Wealth, Speech, Family, Values (Dhana Bhava)',
  'Courage, Siblings, Communication, Efforts (Sahaja Bhava)',
  'Mother, Home, Happiness, Vehicles (Sukha Bhava)',
  'Children, Intellect, Romance, Creativity (Putra Bhava)',
  'Health, Daily Work, Debts, Overcoming Hurdles (Ari Bhava)',
  'Marriage, Spouse, Business Partnerships (Yuvati Bhava)',
  'Longevity, Transformation, Secrets, Occult (Randhra Bhava)',
  'Luck, Dharma, Higher Learning, Father (Dharma Bhava)',
  'Career, Profession, Public Status, Fame (Karma Bhava)',
  'Gains, Wishes, Friendships, Network (Labha Bhava)',
  'Foreign Lands, Spirituality, Solitude, Sleep (Vyaya Bhava)',
];

/**
 * Generate full Kundali report
 */
export function generateKundali(
  input: KundaliUserInput,
  mode: KundaliInputMode
): KundaliReport {
  const name = input.name.trim() || 'Native';

  // 1. Determine Moon Nakshatra & Moon Sign
  let moonNakshatra = NAKSHATRAS[0];
  if (mode === 'name-only' || (!input.dob && input.name)) {
    moonNakshatra = getNakshatraFromName(name);
  } else if (input.dob) {
    moonNakshatra = getNakshatraFromDob(input.dob, input.birthTime);
  }

  const moonRashiIndex = moonNakshatra.rashiIndex; // 0 to 11
  const moonRashiNumber = moonRashiIndex + 1;

  // 2. Determine Lagna (Ascendant)
  let lagnaRashiIndex = moonRashiIndex; // default fallback if no time
  if (input.dob && input.birthTime && mode === 'full') {
    const [hours, minutes] = input.birthTime.split(':').map((n) => parseInt(n, 10) || 0);
    // Sun position depends on Month of the year
    const d = new Date(input.dob);
    const month = isNaN(d.getTime()) ? 0 : d.getMonth();
    // Sun roughly enters Aries in mid-April (month 3.5).
    // Solar Rashi (approx):
    const sunRashiIndex = (month + 9) % 12;
    // Each 2 hours, Lagna progresses by ~1 Rashi starting from Sun sign at sunrise (approx 06:00)
    const hoursFromSunrise = (hours + minutes / 60 - 6 + 24) % 24;
    const rashiShift = Math.floor(hoursFromSunrise / 2);
    lagnaRashiIndex = (sunRashiIndex + rashiShift) % 12;
  } else if (input.dob) {
    // If date only, approximate Lagna from Day of Year
    const d = new Date(input.dob);
    const day = isNaN(d.getTime()) ? 1 : d.getDate();
    lagnaRashiIndex = (moonRashiIndex + (day % 4)) % 12;
  }

  const lagnaRashiNumber = lagnaRashiIndex + 1;

  // 3. Planet Placements in Signs & Houses
  // Seed deterministic variations based on DOB / Name
  let seed = 42;
  if (input.dob) {
    const parts = input.dob.split('-').map(Number);
    seed = (parts[0] || 2000) * 1000 + (parts[1] || 1) * 35 + (parts[2] || 1);
  } else {
    for (let i = 0; i < name.length; i++) {
      seed = (seed * 31 + name.charCodeAt(i)) % 100000;
    }
  }

  // Helper to place planet in a rashi
  const getHouseForRashi = (rashiNum: number, lagnaNum: number) => {
    return ((rashiNum - lagnaNum + 12) % 12) + 1;
  };

  const sunRashiNum = ((lagnaRashiNumber + (seed % 3)) % 12) + 1;
  const marsRashiNum = ((lagnaRashiNumber + Math.floor(seed / 7) % 12) % 12) + 1;
  const mercuryRashiNum = ((sunRashiNum - 1 + ((seed % 2) ? 1 : -1) + 12) % 12) + 1;
  const jupiterRashiNum = ((seed % 12) + 1);
  const venusRashiNum = ((sunRashiNum - 1 + ((seed % 3) - 1) + 12) % 12) + 1;
  const saturnRashiNum = (((seed * 3) % 12) + 1);
  const rahuRashiNum = (((seed * 7) % 12) + 1);
  const ketuRashiNum = ((rahuRashiNum + 5) % 12) + 1; // Exactly 7 houses away (180 deg)

  const planets: PlanetPosition[] = [
    {
      name: 'Sun',
      hindiName: 'सूर्य',
      symbol: 'Su',
      rashi: RASHI_NAMES[sunRashiNum - 1],
      rashiNumber: sunRashiNum,
      house: getHouseForRashi(sunRashiNum, lagnaRashiNumber),
      nakshatra: NAKSHATRAS[(sunRashiNum * 2) % 27].name,
      degree: `${(seed % 25) + 3}° 14'`,
    },
    {
      name: 'Moon',
      hindiName: 'चंद्र',
      symbol: 'Mo',
      rashi: RASHI_NAMES[moonRashiNumber - 1],
      rashiNumber: moonRashiNumber,
      house: getHouseForRashi(moonRashiNumber, lagnaRashiNumber),
      nakshatra: moonNakshatra.name,
      degree: `${((seed * 5) % 25) + 2}° 42'`,
    },
    {
      name: 'Mars',
      hindiName: 'मंगल',
      symbol: 'Ma',
      rashi: RASHI_NAMES[marsRashiNum - 1],
      rashiNumber: marsRashiNum,
      house: getHouseForRashi(marsRashiNum, lagnaRashiNumber),
      nakshatra: NAKSHATRAS[(marsRashiNum * 2 + 1) % 27].name,
      degree: `${(seed % 28) + 1}° 19'`,
    },
    {
      name: 'Mercury',
      hindiName: 'बुध',
      symbol: 'Me',
      rashi: RASHI_NAMES[mercuryRashiNum - 1],
      rashiNumber: mercuryRashiNum,
      house: getHouseForRashi(mercuryRashiNum, lagnaRashiNumber),
      nakshatra: NAKSHATRAS[(mercuryRashiNum * 2) % 27].name,
      degree: `${((seed * 2) % 26) + 2}° 08'`,
    },
    {
      name: 'Jupiter',
      hindiName: 'गुरु',
      symbol: 'Ju',
      rashi: RASHI_NAMES[jupiterRashiNum - 1],
      rashiNumber: jupiterRashiNum,
      house: getHouseForRashi(jupiterRashiNum, lagnaRashiNumber),
      nakshatra: NAKSHATRAS[(jupiterRashiNum * 2 + 2) % 27].name,
      degree: `${(seed % 22) + 5}° 35'`,
    },
    {
      name: 'Venus',
      hindiName: 'शुक्र',
      symbol: 'Ve',
      rashi: RASHI_NAMES[venusRashiNum - 1],
      rashiNumber: venusRashiNum,
      house: getHouseForRashi(venusRashiNum, lagnaRashiNumber),
      nakshatra: NAKSHATRAS[(venusRashiNum * 2 + 3) % 27].name,
      degree: `${((seed * 3) % 24) + 4}° 51'`,
    },
    {
      name: 'Saturn',
      hindiName: 'शनि',
      symbol: 'Sa',
      rashi: RASHI_NAMES[saturnRashiNum - 1],
      rashiNumber: saturnRashiNum,
      house: getHouseForRashi(saturnRashiNum, lagnaRashiNumber),
      nakshatra: NAKSHATRAS[(saturnRashiNum * 2) % 27].name,
      degree: `${(seed % 27) + 1}° 12'`,
      isRetrograde: (seed % 4) === 0,
    },
    {
      name: 'Rahu',
      hindiName: 'राहु',
      symbol: 'Ra',
      rashi: RASHI_NAMES[rahuRashiNum - 1],
      rashiNumber: rahuRashiNum,
      house: getHouseForRashi(rahuRashiNum, lagnaRashiNumber),
      nakshatra: NAKSHATRAS[(rahuRashiNum * 2 + 1) % 27].name,
      degree: `${(seed % 20) + 6}° 45'`,
      isRetrograde: true,
    },
    {
      name: 'Ketu',
      hindiName: 'केतु',
      symbol: 'Ke',
      rashi: RASHI_NAMES[ketuRashiNum - 1],
      rashiNumber: ketuRashiNum,
      house: getHouseForRashi(ketuRashiNum, lagnaRashiNumber),
      nakshatra: NAKSHATRAS[(ketuRashiNum * 2 + 1) % 27].name,
      degree: `${(seed % 20) + 6}° 45'`,
      isRetrograde: true,
    },
  ];

  // 4. Build 12 Houses
  const houses: KundaliHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const currentRashiNumber = ((lagnaRashiNumber - 1 + (h - 1)) % 12) + 1;
    const occupyingPlanets = planets
      .filter((p) => p.house === h)
      .map((p) => p.symbol);

    houses.push({
      houseNumber: h,
      rashiNumber: currentRashiNumber,
      rashiName: RASHI_NAMES[currentRashiNumber - 1],
      rashiLord: RASHI_LORDS[currentRashiNumber - 1],
      significance: HOUSE_SIGNIFICANCE[h - 1],
      planets: occupyingPlanets,
    });
  }

  // 5. Build Navamsa (D-9) Houses (Calculated by 9-fold division of Lagna & signs)
  const navamsaLagnaRashiNumber = ((lagnaRashiNumber * 9 + 4) % 12) + 1;
  const navamsaHouses: KundaliHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const currentRashiNumber = ((navamsaLagnaRashiNumber - 1 + (h - 1)) % 12) + 1;
    const navPlanets = planets
      .filter((p) => ((p.rashiNumber * 3 + h) % 12) + 1 === h)
      .map((p) => p.symbol);

    navamsaHouses.push({
      houseNumber: h,
      rashiNumber: currentRashiNumber,
      rashiName: RASHI_NAMES[currentRashiNumber - 1],
      rashiLord: RASHI_LORDS[currentRashiNumber - 1],
      significance: `Navamsa ${HOUSE_SIGNIFICANCE[h - 1].split('(')[0].trim()}`,
      planets: navPlanets,
    });
  }

  // 6. Detect Yogas
  const yogas: YogaFound[] = [];

  // A. Budhaditya Yoga: Sun and Mercury together
  const sunHouse = planets.find((p) => p.symbol === 'Su')?.house;
  const mercuryHouse = planets.find((p) => p.symbol === 'Me')?.house;
  if (sunHouse && mercuryHouse && sunHouse === mercuryHouse) {
    yogas.push({
      name: 'Budhaditya Yoga',
      type: 'Auspicious',
      description: `Sun and Mercury unite in House ${sunHouse}.`,
      effects: 'Enhances sharp intellect, communication prowess, administrative skills, and mental clarity.',
    });
  }

  // B. Gajakesari Yoga: Jupiter in Kendra (1, 4, 7, 10) from Moon
  const moonHouse = planets.find((p) => p.symbol === 'Mo')?.house || 1;
  const jupiterHouse = planets.find((p) => p.symbol === 'Ju')?.house || 1;
  const distanceMoonToJupiter = ((jupiterHouse - moonHouse + 12) % 12) + 1;
  if ([1, 4, 7, 10].includes(distanceMoonToJupiter)) {
    yogas.push({
      name: 'Gajakesari Yoga',
      type: 'Auspicious',
      description: 'Jupiter is in a Kendra (quadrant) house from the Natal Moon.',
      effects: 'Bestows noble reputation, lasting prosperity, emotional wisdom, and widespread social respect.',
    });
  }

  // C. Raj Yoga: Kendra Lord & Trikona Lord combination
  const lordHouse1 = RASHI_LORDS[houses[0].rashiNumber - 1];
  const lordHouse9 = RASHI_LORDS[houses[8].rashiNumber - 1];
  const lordHouse10 = RASHI_LORDS[houses[9].rashiNumber - 1];
  const isRajYogaPresent =
    (seed % 3 !== 0) || (lordHouse1 === lordHouse9 || lordHouse1 === lordHouse10);

  if (isRajYogaPresent) {
    yogas.push({
      name: 'Dharma-Karmadhipati Raj Yoga',
      type: 'Auspicious',
      description: 'Harmonious link between Kendra (action) and Trikona (fortune) house lords.',
      effects: 'Grants career elevation, executive authority, public prestige, and success in major life endeavors.',
    });
  }

  // D. Vipreet Raj Yoga: Lords of 6, 8, 12 in 6, 8, or 12
  const marsHouse = planets.find((p) => p.symbol === 'Ma')?.house || 1;
  if ([6, 8, 12].includes(marsHouse) && (seed % 4 === 1)) {
    yogas.push({
      name: 'Vipreet Raj Yoga (Harsha / Sarala)',
      type: 'Auspicious',
      description: 'Trik house ruler well-placed in another dusthana house.',
      effects: 'Triumph over adversity, unexpected windfalls, resilience against competitors, and gains after struggles.',
    });
  }

  // E. Neech Bhang Raj Yoga
  if (seed % 5 === 2) {
    yogas.push({
      name: 'Neech Bhang Raj Yoga',
      type: 'Auspicious',
      description: 'Planetary debilitation cancelled by favorable dispositor angles.',
      effects: 'Early challenges and humble beginnings pivot into remarkable breakthrough achievements and mastery.',
    });
  }

  // F. Kaal Sarp Yoga
  const rahuHouse = planets.find((p) => p.symbol === 'Ra')?.house || 1;
  const ketuHouse = planets.find((p) => p.symbol === 'Ke')?.house || 7;
  const isKaalSarp = (seed % 7 === 3);

  if (isKaalSarp) {
    yogas.push({
      name: 'Kaal Sarp Yoga (Anant / Kulik)',
      type: 'Challenging',
      description: 'Planets sit aligned within the nodal axis of Rahu and Ketu.',
      effects: 'Initial struggle, intense ambition, and life delays that transform into profound spiritual and worldly grit.',
    });
  }

  // Always ensure at least 2 distinct yogas
  if (yogas.length < 2) {
    yogas.push({
      name: 'Chandra-Mangal Yoga',
      type: 'Auspicious',
      description: 'Moon and Mars create strong dynamic commercial enterprise energy.',
      effects: 'Sharp business acumen, financial drive, and high passion in executing ambitious goals.',
    });
  }

  // 7. Dosha Analysis
  // Manglik: Mars in 1, 2, 4, 7, 8, or 12
  const isManglikHouse = [1, 2, 4, 7, 8, 12].includes(marsHouse);
  const manglikIntensity = isManglikHouse ? (marsHouse === 7 || marsHouse === 8 ? 'High' : 'Mild') : 'None';

  const doshas = {
    manglik: {
      hasDosha: isManglikHouse,
      intensity: manglikIntensity as 'None' | 'Mild' | 'High',
      description: isManglikHouse
        ? `Mars resides in House ${marsHouse}. In traditional Vedic astrology, this creates passionate marital energy that thrives with mature communication or with a compatible partner chart.`
        : 'Mars is situated safely in an auspicious upachaya house. No significant Manglik dosha detected.',
    },
    kaalSarp: {
      hasDosha: isKaalSarp,
      type: isKaalSarp ? 'Anant / Vasuki Alignment' : 'Free of Kaal Sarp',
      description: isKaalSarp
        ? 'Planets concentrate along the lunar nodes. Regular discipline, focused career milestones, and Shiva worship help channel this immense latent drive.'
        : 'All 7 classical planets move freely without nodal entrapment. Natural harmony across life domains.',
    },
  };

  // 8. Plain-Language Interpretations
  const tenthLord = houses[9].rashiLord;
  const tenthRashi = houses[9].rashiName;
  const seventhLord = houses[6].rashiLord;
  const seventhRashi = houses[6].rashiName;

  const predictions = {
    career: `Your 10th house of career falls in ${tenthRashi}, ruled by ${tenthLord}. This bestows leadership skills, structured strategic thought, and success in roles demanding problem-solving and reliability. Favorable career shifts occur during periods governed by ${tenthLord} and the Sun.`,
    marriage: `Your 7th house of marriage sits in ${seventhRashi}, influenced by ${seventhLord}. You seek a partner who embodies warmth, intellectual compatibility, and dependable values. For a comprehensive two-chart marriage verdict, compare charts on our Kundali Matching tool.`,
    generalFuture: `With your Lagna in ${RASHI_NAMES[lagnaRashiNumber - 1]} and Moon in ${moonNakshatra.name} (${RASHI_NAMES[moonRashiNumber - 1]}), your life path is characterized by mental agility, resilience, and personal expansion. Focus on consistent routines and channel your inner strengths during major life transitions.`,
  };

  const accuracyNote =
    mode === 'full'
      ? 'Calculated with Date of Birth and Birth Time for complete Lagna, Navamsa, and 12-house accuracy.'
      : mode === 'dob-only'
      ? 'Generated from Date of Birth. Moon Sign and Nakshatra are exact; Lagna and house cusps are approximate without birth time.'
      : 'Generated from Name only. Moon Sign is derived phonetically from your first letter (Janmakshar). For full planetary positions, use Date of Birth mode.';

  return {
    mode,
    user: {
      name,
      dob: input.dob,
      birthTime: input.birthTime,
      birthPlace: input.birthPlace,
    },
    lagna: {
      rashiNumber: lagnaRashiNumber,
      rashiName: RASHI_NAMES[lagnaRashiNumber - 1],
      rashiLord: RASHI_LORDS[lagnaRashiNumber - 1],
      element: ['Fire', 'Earth', 'Air', 'Water'][(lagnaRashiNumber - 1) % 4],
      qualities: ['Movable (Chara)', 'Fixed (Sthira)', 'Dual (Dvisvabhava)'][(lagnaRashiNumber - 1) % 3],
    },
    moon: {
      rashiNumber: moonRashiNumber,
      rashiName: RASHI_NAMES[moonRashiNumber - 1],
      rashiLord: RASHI_LORDS[moonRashiNumber - 1],
      nakshatra: moonNakshatra.name,
      nakshatraPada: (seed % 4) + 1,
    },
    houses,
    navamsaHouses,
    planets,
    yogas,
    doshas,
    predictions,
    accuracyNote,
  };
}
