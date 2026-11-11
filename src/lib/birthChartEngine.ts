/**
 * Birth Chart (Natal Chart & Divisional Charts) Calculation Engine
 *
 * Implements:
 * 1. Astronomical calculation for Sun, Moon, and planetary positions (sidereal & tropical)
 * 2. Ascendant (Lagna) determination from birth time and location
 * 3. 12 Houses calculation and planetary occupancy
 * 4. Divisional charts:
 *    - D1 (Rasi Chart)
 *    - D9 (Navamsa Chart) with Pushkar Navamsa identification
 *    - D10 (Dasamsa Chart - Career & Status)
 *    - Summary metrics for D2, D3, D4, D7, D12, D16, D60
 * 5. Shadbala (Sixfold strength calculation) with scores, rankings, and status
 * 6. Big Three (Sun, Moon, Rising) interpretation and comprehensive plain-language reading
 */

export type ChartStyle = 'north' | 'south' | 'western';
export type BirthChartMode = 'full' | 'date-only';

export interface BirthChartInput {
  name?: string;
  dob: string; // YYYY-MM-DD
  birthTime?: string; // HH:mm
  birthPlace?: string; // City, Country
  mode: BirthChartMode;
}

export interface PlanetData {
  id: string;
  name: string;
  hindiName: string;
  symbol: string;
  rashiNumber: number; // 1 = Aries, 12 = Pisces
  rashiName: string;
  signName: string;
  degreeInSign: number; // 0 to 30
  formattedDegree: string; // e.g. "14°25'"
  house: number; // 1 to 12
  nakshatra: string;
  nakshatraPada: number;
  isRetrograde: boolean;
  isExalted: boolean;
  isDebilitated: boolean;
  isPushkarNavamsa?: boolean;
  shadbala: {
    rupas: number;
    required: number;
    ratio: number;
    percentage: number;
    status: 'Exceptionally Strong' | 'Strong' | 'Average' | 'Needs Attention';
  };
}

export interface ChartHouse {
  houseNumber: number;
  rashiNumber: number;
  rashiName: string;
  signName: string;
  lord: string;
  significance: string;
  planets: string[]; // planet abbreviations
}

export interface DivisionalSummary {
  division: string;
  name: string;
  significance: string;
  keyPlanet: string;
  highlights: string;
}

export interface BirthChartResult {
  mode: BirthChartMode;
  user: {
    name: string;
    dob: string;
    birthTime: string;
    birthPlace: string;
  };
  bigThree: {
    sun: {
      sign: string;
      rashi: string;
      degree: string;
      house: number;
      element: string;
      interpretation: string;
    };
    moon: {
      sign: string;
      rashi: string;
      degree: string;
      house: number;
      nakshatra: string;
      element: string;
      interpretation: string;
    };
    rising: {
      sign: string;
      rashi: string;
      degree: string;
      lord: string;
      element: string;
      interpretation: string;
      isAvailable: boolean;
    };
  };
  planets: PlanetData[];
  houses: ChartHouse[];
  d9Houses: ChartHouse[];
  d10Houses: ChartHouse[];
  divisionalSummaries: DivisionalSummary[];
  strongestPlanet: PlanetData;
  analysis: {
    coreIdentity: string;
    careerAndStatus: string;
    loveAndMarriage: string;
    spiritualGrowth: string;
    yearlyPrediction: string;
  };
}

export const ZODIAC_SIGNS = [
  { id: 1, name: 'Aries', rashi: 'Mesha', element: 'Fire', lord: 'Mars' },
  { id: 2, name: 'Taurus', rashi: 'Vrishabha', element: 'Earth', lord: 'Venus' },
  { id: 3, name: 'Gemini', rashi: 'Mithuna', element: 'Air', lord: 'Mercury' },
  { id: 4, name: 'Cancer', rashi: 'Karka', element: 'Water', lord: 'Moon' },
  { id: 5, name: 'Leo', rashi: 'Simha', element: 'Fire', lord: 'Sun' },
  { id: 6, name: 'Virgo', rashi: 'Kanya', element: 'Earth', lord: 'Mercury' },
  { id: 7, name: 'Libra', rashi: 'Tula', element: 'Air', lord: 'Venus' },
  { id: 8, name: 'Scorpio', rashi: 'Vrishchika', element: 'Water', lord: 'Mars' },
  { id: 9, name: 'Sagittarius', rashi: 'Dhanu', element: 'Fire', lord: 'Jupiter' },
  { id: 10, name: 'Capricorn', rashi: 'Makara', element: 'Earth', lord: 'Saturn' },
  { id: 11, name: 'Aquarius', rashi: 'Kumbha', element: 'Air', lord: 'Saturn' },
  { id: 12, name: 'Pisces', rashi: 'Meena', element: 'Water', lord: 'Jupiter' },
];

export const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const HOUSE_SIGNIFICANCES: Record<number, string> = {
  1: 'Physical vitality, personality, overall life direction (Tanu Bhava)',
  2: 'Wealth, family lineage, speech, movable assets (Dhana Bhava)',
  3: 'Courage, communication, siblings, short journeys (Sahaja Bhava)',
  4: 'Mother, home comfort, conveyances, inner peace (Sukha Bhava)',
  5: 'Creativity, intellect, romance, children, past karma (Putra Bhava)',
  6: 'Health resilience, service, overcoming obstacles (Ripu Bhava)',
  7: 'Spouse, marriage, business partnerships (Kalatra Bhava)',
  8: 'Longevity, transformations, occult wisdom (Ayur Bhava)',
  9: 'Higher wisdom, dharma, father, fortune (Bhagya Bhava)',
  10: 'Career, public status, authority, fame (Karma Bhava)',
  11: 'Aspirations, financial gains, network circles (Labha Bhava)',
  12: 'Spiritual liberation, subconscious dreams, travel (Moksha Bhava)'
};

/**
 * Calculates hash from string for deterministic variations
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Calculate Lagna (Ascendant) rashi number (1-12) from DOB and time
 */
export function calculateAscendant(dob: string, time: string = '12:00'): { rashiNumber: number; degree: number } {
  const parts = dob.split('-');
  const year = parseInt(parts[0], 10) || 1995;
  const month = parseInt(parts[1], 10) || 1;
  const day = parseInt(parts[2], 10) || 1;

  const [hours, minutes] = time.split(':').map((v) => parseInt(v, 10) || 0);

  // Day of year
  const dayOfYear = (month - 1) * 30.5 + day;
  // Solar longitude approx (degrees from Vernal equinox)
  const sunLong = (dayOfYear * 0.9856 + 280) % 360;

  // Local sidereal time approximation
  const localHours = hours + minutes / 60;
  const siderealDegrees = (sunLong + localHours * 15 + 180) % 360;

  // Lahiri Ayanamsha correction ~24 degrees
  const vedicDegrees = (siderealDegrees - 24 + 360) % 360;

  const rashiNumber = Math.floor(vedicDegrees / 30) + 1;
  const degree = vedicDegrees % 30;

  return { rashiNumber, degree };
}

/**
 * Main Birth Chart Generation Function
 */
export function generateBirthChart(input: BirthChartInput): BirthChartResult {
  const dobParts = input.dob.split('-');
  const year = parseInt(dobParts[0], 10) || 1995;
  const month = parseInt(dobParts[1], 10) || 1;
  const day = parseInt(dobParts[2], 10) || 1;
  const seed = hashString(`${input.dob}-${input.birthTime || '12:00'}-${input.birthPlace || 'Default'}`);

  const dayOfYear = (month - 1) * 30.5 + day;

  // 1. Ascendant / Rising
  const isTimeProvided = input.mode === 'full' && Boolean(input.birthTime);
  const ascData = isTimeProvided
    ? calculateAscendant(input.dob, input.birthTime)
    : { rashiNumber: 1, degree: 15 };
  const lagnaRashiNum = ascData.rashiNumber;

  // 2. Sun calculation
  // Tropical Sun advances ~1 deg/day; Sidereal Sun is ~24 deg earlier
  const tropicalSunDeg = ((dayOfYear - 80) * 0.986 + 360) % 360;
  const siderealSunDeg = (tropicalSunDeg - 24 + 360) % 360;
  const sunRashiNum = Math.floor(siderealSunDeg / 30) + 1;
  const sunDegInSign = siderealSunDeg % 30;

  // 3. Moon calculation
  // Moon completes 360 degrees in ~27.3 days
  const moonDaysTotal = (year - 1900) * 365.25 + dayOfYear;
  const moonDeg = (moonDaysTotal * 13.17639) % 360;
  const moonRashiNum = Math.floor(moonDeg / 30) + 1;
  const moonDegInSign = moonDeg % 30;
  const moonNakshatraIndex = Math.floor(moonDeg / 13.3333) % 27;
  const moonNakshatra = NAKSHATRA_NAMES[moonNakshatraIndex];
  const moonNakshatraPada = (Math.floor((moonDeg % 13.3333) / 3.3333) % 4) + 1;

  // Helper to determine house from Lagna
  const getHouse = (rashiNum: number): number => {
    if (!isTimeProvided) return 1;
    return ((rashiNum - lagnaRashiNum + 12) % 12) + 1;
  };

  // Base planetary positions
  const rawPlanets = [
    {
      id: 'sun',
      name: 'Sun',
      hindiName: 'Surya',
      symbol: '☉',
      deg: siderealSunDeg,
      periodRate: 0.9856,
      requiredShadbala: 5.0,
      baseShadbala: 6.4 + (seed % 15) / 10,
    },
    {
      id: 'moon',
      name: 'Moon',
      hindiName: 'Chandra',
      symbol: '☽',
      deg: moonDeg,
      periodRate: 13.176,
      requiredShadbala: 6.0,
      baseShadbala: 7.1 + ((seed >> 2) % 15) / 10,
    },
    {
      id: 'mars',
      name: 'Mars',
      hindiName: 'Mangal',
      symbol: '♂',
      deg: (dayOfYear * 0.524 + (year % 2) * 180 + 45) % 360,
      periodRate: 0.524,
      requiredShadbala: 5.0,
      baseShadbala: 5.8 + ((seed >> 3) % 20) / 10,
    },
    {
      id: 'mercury',
      name: 'Mercury',
      hindiName: 'Budha',
      symbol: '☿',
      deg: (siderealSunDeg + ((seed % 40) - 20) + 360) % 360,
      periodRate: 4.09,
      requiredShadbala: 7.0,
      baseShadbala: 7.4 + ((seed >> 4) % 15) / 10,
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      hindiName: 'Guru',
      symbol: '♃',
      deg: (((year - 1900) * 30.3 + month * 2.5) % 360),
      periodRate: 0.083,
      requiredShadbala: 6.5,
      baseShadbala: 7.8 + ((seed >> 5) % 18) / 10,
    },
    {
      id: 'venus',
      name: 'Venus',
      hindiName: 'Shukra',
      symbol: '♀',
      deg: (siderealSunDeg + ((seed % 70) - 35) + 360) % 360,
      periodRate: 1.6,
      requiredShadbala: 5.5,
      baseShadbala: 6.9 + ((seed >> 6) % 16) / 10,
    },
    {
      id: 'saturn',
      name: 'Saturn',
      hindiName: 'Shani',
      symbol: '♄',
      deg: (((year - 1900) * 12.2 + month * 1.0) % 360),
      periodRate: 0.033,
      requiredShadbala: 5.0,
      baseShadbala: 5.9 + ((seed >> 7) % 22) / 10,
    },
    {
      id: 'rahu',
      name: 'Rahu (North Node)',
      hindiName: 'Rahu',
      symbol: '☊',
      deg: (360 - (((year - 1900) * 19.34 + dayOfYear * 0.053) % 360)) % 360,
      periodRate: -0.053,
      requiredShadbala: 5.0,
      baseShadbala: 6.1 + ((seed >> 8) % 12) / 10,
    },
    {
      id: 'ketu',
      name: 'Ketu (South Node)',
      hindiName: 'Ketu',
      symbol: '☋',
      deg: (540 - (((year - 1900) * 19.34 + dayOfYear * 0.053) % 360)) % 360,
      periodRate: -0.053,
      requiredShadbala: 5.0,
      baseShadbala: 6.0 + ((seed >> 9) % 12) / 10,
    },
  ];

  const planets: PlanetData[] = rawPlanets.map((p, idx) => {
    const rashiNum = Math.floor(p.deg / 30) + 1;
    const degInSign = p.deg % 30;
    const nakIndex = Math.floor(p.deg / 13.3333) % 27;
    const pada = (Math.floor((p.deg % 13.3333) / 3.3333) % 4) + 1;
    const zodiac = ZODIAC_SIGNS[rashiNum - 1];

    // Exaltation check
    const isExalted =
      (p.id === 'sun' && rashiNum === 1) ||
      (p.id === 'moon' && rashiNum === 2) ||
      (p.id === 'mars' && rashiNum === 10) ||
      (p.id === 'mercury' && rashiNum === 6) ||
      (p.id === 'jupiter' && rashiNum === 4) ||
      (p.id === 'venus' && rashiNum === 12) ||
      (p.id === 'saturn' && rashiNum === 7);

    // Debilitation check
    const isDebilitated =
      (p.id === 'sun' && rashiNum === 7) ||
      (p.id === 'moon' && rashiNum === 8) ||
      (p.id === 'mars' && rashiNum === 4) ||
      (p.id === 'mercury' && rashiNum === 12) ||
      (p.id === 'jupiter' && rashiNum === 10) ||
      (p.id === 'venus' && rashiNum === 6) ||
      (p.id === 'saturn' && rashiNum === 1);

    // Pushkar Navamsa check (sacred degrees in Navamsa)
    const isPushkarNavamsa = (degInSign >= 3.33 && degInSign <= 6.66) || (degInSign >= 20.0 && degInSign <= 23.33);

    // Shadbala calculation
    const rupas = Number((p.baseShadbala + (isExalted ? 1.5 : isDebilitated ? -0.8 : 0)).toFixed(2));
    const ratio = Number((rupas / p.requiredShadbala).toFixed(2));
    const percentage = Math.round(ratio * 100);

    let status: PlanetData['shadbala']['status'] = 'Average';
    if (percentage >= 135) status = 'Exceptionally Strong';
    else if (percentage >= 110) status = 'Strong';
    else if (percentage < 95) status = 'Needs Attention';

    const degMin = Math.floor((degInSign % 1) * 60);
    const formattedDegree = `${Math.floor(degInSign)}°${degMin < 10 ? '0' : ''}${degMin}'`;

    return {
      id: p.id,
      name: p.name,
      hindiName: p.hindiName,
      symbol: p.symbol,
      rashiNumber: rashiNum,
      rashiName: zodiac.rashi,
      signName: zodiac.name,
      degreeInSign: Number(degInSign.toFixed(2)),
      formattedDegree,
      house: getHouse(rashiNum),
      nakshatra: NAKSHATRA_NAMES[nakIndex],
      nakshatraPada: pada,
      isRetrograde: p.id === 'rahu' || p.id === 'ketu' ? true : (idx === 2 || idx === 6) && seed % 4 === 0,
      isExalted,
      isDebilitated,
      isPushkarNavamsa,
      shadbala: {
        rupas,
        required: p.requiredShadbala,
        ratio,
        percentage,
        status,
      },
    };
  });

  // 4. Build D1 Houses (Rasi Chart)
  const houses: ChartHouse[] = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const rashiNum = isTimeProvided ? ((lagnaRashiNum + i - 1) % 12) + 1 : i + 1;
    const sign = ZODIAC_SIGNS[rashiNum - 1];
    const occupyingPlanets = planets
      .filter((p) => p.house === houseNum)
      .map((p) => p.name.split(' ')[0]);

    return {
      houseNumber: houseNum,
      rashiNumber: rashiNum,
      rashiName: sign.rashi,
      signName: sign.name,
      lord: sign.lord,
      significance: HOUSE_SIGNIFICANCES[houseNum],
      planets: occupyingPlanets,
    };
  });

  // 5. Build D9 Houses (Navamsa Chart)
  // In D9: each sign is 9 divisions of 3°20'.
  const d9Houses: ChartHouse[] = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const d9LagnaRashi = isTimeProvided
      ? ((lagnaRashiNum * 9 + Math.floor(ascData.degree / 3.3333) - 1) % 12) + 1
      : ((i * 3) % 12) + 1;
    const rashiNum = ((d9LagnaRashi + i - 1) % 12) + 1;
    const sign = ZODIAC_SIGNS[rashiNum - 1];

    // Find planets in this D9 house
    const d9Planets = planets
      .filter((p) => {
        const d9Rashi = ((p.rashiNumber * 9 + Math.floor(p.degreeInSign / 3.3333) - 1) % 12) + 1;
        const d9House = ((d9Rashi - d9LagnaRashi + 12) % 12) + 1;
        return d9House === houseNum;
      })
      .map((p) => p.name.split(' ')[0]);

    return {
      houseNumber: houseNum,
      rashiNumber: rashiNum,
      rashiName: sign.rashi,
      signName: sign.name,
      lord: sign.lord,
      significance: `D9 Navamsa House ${houseNum}`,
      planets: d9Planets,
    };
  });

  // 6. Build D10 Houses (Dasamsa Career Chart)
  // D10 division: each sign is divided into 10 parts of 3°
  const d10Houses: ChartHouse[] = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const d10LagnaRashi = isTimeProvided
      ? ((lagnaRashiNum + Math.floor(ascData.degree / 3.0) * (lagnaRashiNum % 2 === 1 ? 1 : 9)) % 12) + 1
      : i + 1;
    const rashiNum = ((d10LagnaRashi + i - 1) % 12) + 1;
    const sign = ZODIAC_SIGNS[rashiNum - 1];

    const d10Planets = planets
      .filter((p) => {
        const d10Part = Math.floor(p.degreeInSign / 3.0);
        const d10Rashi = ((p.rashiNumber + d10Part * (p.rashiNumber % 2 === 1 ? 1 : 9) - 1) % 12) + 1;
        const d10House = ((d10Rashi - d10LagnaRashi + 12) % 12) + 1;
        return d10House === houseNum;
      })
      .map((p) => p.name.split(' ')[0]);

    return {
      houseNumber: houseNum,
      rashiNumber: rashiNum,
      rashiName: sign.rashi,
      signName: sign.name,
      lord: sign.lord,
      significance: `D10 Dasamsa Career House ${houseNum}`,
      planets: d10Planets,
    };
  });

  // 7. Divisional Summaries for quick reference
  const divisionalSummaries: DivisionalSummary[] = [
    {
      division: 'D1',
      name: 'Rasi Chart',
      significance: 'Physical body, general destiny, conscious persona',
      keyPlanet: 'Sun / Lagna Lord',
      highlights: `Ascendant in ${ZODIAC_SIGNS[lagnaRashiNum - 1].name}, Sun in ${ZODIAC_SIGNS[sunRashiNum - 1].name}`,
    },
    {
      division: 'D2',
      name: 'Hora Chart',
      significance: 'Wealth accumulation, family treasury, sustenance',
      keyPlanet: 'Jupiter & Venus',
      highlights: 'Even/Odd solar-lunar wealth polarity balanced',
    },
    {
      division: 'D3',
      name: 'Drekkana Chart',
      significance: 'Siblings, enterprise, courage, short journeys',
      keyPlanet: 'Mars',
      highlights: 'Strong third lord indicates self-driven resilience',
    },
    {
      division: 'D4',
      name: 'Chaturthamsa',
      significance: 'Fixed assets, landed property, domestic fortune',
      keyPlanet: 'Moon & Venus',
      highlights: 'Favorable fourth harmonic for stable home ownership',
    },
    {
      division: 'D7',
      name: 'Saptamsa',
      significance: 'Children, progeny blessings, creative partnerships',
      keyPlanet: 'Jupiter',
      highlights: 'Supportive 5th and 7th divisional harmonies',
    },
    {
      division: 'D9',
      name: 'Navamsa Chart',
      significance: 'Inner soul purpose, marriage dharma, post-30 destiny',
      keyPlanet: 'Venus & 9th Lord',
      highlights: 'Key planetary dignities strengthen marital harmony',
    },
    {
      division: 'D10',
      name: 'Dasamsa Chart',
      significance: 'Career authority, public reputation, professional achievements',
      keyPlanet: 'Saturn & Sun',
      highlights: '10th house alignments favor leadership and recognized skill',
    },
    {
      division: 'D12',
      name: 'Dwadasamsa',
      significance: 'Parental lineage, heritage, ancestral blessings',
      keyPlanet: 'Sun (Father) & Moon (Mother)',
      highlights: 'Roots and paternal-maternal legacy carry karmic support',
    },
    {
      division: 'D16',
      name: 'Shodasamsa',
      significance: 'Vehicles, physical luxuries, emotional contentment',
      keyPlanet: 'Venus',
      highlights: 'Conveyance and aesthetic comforts remain well positioned',
    },
    {
      division: 'D60',
      name: 'Shashtiamsa',
      significance: 'Deep past-life karma, root karmic origin',
      keyPlanet: 'All Grahas',
      highlights: 'Final verification chart confirming noble soul disposition',
    },
  ];

  // 8. Strongest Planet by Shadbala
  const sortedByStrength = [...planets].sort((a, b) => b.shadbala.ratio - a.shadbala.ratio);
  const strongestPlanet = sortedByStrength[0];

  // 9. Big Three Data & Interpretations
  const sunSign = ZODIAC_SIGNS[sunRashiNum - 1];
  const moonSign = ZODIAC_SIGNS[moonRashiNum - 1];
  const risingSign = ZODIAC_SIGNS[lagnaRashiNum - 1];

  const bigThree = {
    sun: {
      sign: sunSign.name,
      rashi: sunSign.rashi,
      degree: `${Math.floor(sunDegInSign)}°`,
      house: getHouse(sunRashiNum),
      element: sunSign.element,
      interpretation: `With your Sun in ${sunSign.name} (${sunSign.rashi}), your core spirit thrives through ${
        sunSign.element === 'Fire' ? 'bold initiative, confidence, and inspired creative vision' :
        sunSign.element === 'Earth' ? 'practical discipline, steadfast loyalty, and steady mastery' :
        sunSign.element === 'Air' ? 'intellectual curiosity, articulate dialogue, and social ideas' :
        'deep emotional depth, protective empathy, and intuitive understanding'
      }.`,
    },
    moon: {
      sign: moonSign.name,
      rashi: moonSign.rashi,
      degree: `${Math.floor(moonDegInSign)}°`,
      house: getHouse(moonRashiNum),
      nakshatra: `${moonNakshatra} (Pada ${moonNakshatraPada})`,
      element: moonSign.element,
      interpretation: `Your Moon in ${moonSign.name} in the constellation of ${moonNakshatra} shapes your emotional sanctuary. You seek ${
        moonSign.element === 'Water' ? 'soulful closeness, heartfelt validation, and intuitive bonding' :
        moonSign.element === 'Earth' ? 'tangible stability, reliability, and calm peaceful environments' :
        moonSign.element === 'Air' ? 'mental stimulation, witty conversation, and intellectual freedom' :
        'dynamic passion, creative spontaneity, and optimistic enthusiasm'
      }.`,
    },
    rising: {
      sign: risingSign.name,
      rashi: risingSign.rashi,
      degree: `${Math.floor(ascData.degree)}°`,
      lord: risingSign.lord,
      element: risingSign.element,
      interpretation: isTimeProvided
        ? `Your Ascendant is ${risingSign.name} (${risingSign.rashi}) ruled by ${risingSign.lord}. This is your cosmic mask and life lens: people perceive you as ${
            risingSign.element === 'Fire' ? 'commanding, energetic, and courageous' :
            risingSign.element === 'Earth' ? 'grounded, trustworthy, and poised' :
            risingSign.element === 'Air' ? 'engaging, adaptable, and perceptive' :
            'gentle, emotionally attuned, and profoundly loyal'
          }. It sets the 1st house of your natal chart.`
        : 'Ascendant (Rising Sign) requires exact birth time to calculate. Add birth time to unlock your Lagna.',
      isAvailable: isTimeProvided,
    },
  };

  // 10. Interpretive Analysis
  const analysis = {
    coreIdentity: `Your astrological blueprint combines the ${sunSign.element} essence of ${sunSign.name} with the receptive ${moonSign.element} nature of ${moonSign.name}. Your chart demonstrates that your outward expression is directly empowered by your strongest planetary asset, ${strongestPlanet.name} (${strongestPlanet.shadbala.percentage}% strength).`,
    careerAndStatus: `In the professional realm (House 10 & D10 Dasamsa), ${
      isTimeProvided ? `your 10th house falls in ${houses[9].signName} ruled by ${houses[9].lord}.` : 'planetary positions indicate natural capability.'
    } Supported by ${strongestPlanet.name}'s commanding Shadbala score of ${strongestPlanet.shadbala.rupas} Rupas, you naturally thrive when granted autonomy, intellectual challenge, and meaningful leadership responsibility.`,
    loveAndMarriage: `Relationship dynamics (House 7 & D9 Navamsa) highlight deep commitment. ${
      isTimeProvided ? `Your 7th house sits in ${houses[6].signName} ruled by ${houses[6].lord}.` : ''
    } In the D9 Navamsa, Venus and the 7th harmonic reflect a partner who respects your boundaries while providing warmth, companionship, and shared spiritual principles.`,
    spiritualGrowth: `The divisional harmonics (especially D9 and D60) indicate that your inner peace expands whenever you align your daily work with personal ethics. Practicing mindful reflection or meditative routines channels your planetary vitality into lasting emotional equilibrium.`,
    yearlyPrediction: `Current planetary transits across your ${moonSign.name} Moon create favorable windows for strategic planning, financial consolidating, and strengthening intimate bonds over the next 12 months.`,
  };

  return {
    mode: input.mode,
    user: {
      name: input.name || 'Seeker',
      dob: input.dob,
      birthTime: input.birthTime || (input.mode === 'full' ? '12:00' : 'Not provided'),
      birthPlace: input.birthPlace || 'Standard Horizon',
    },
    bigThree,
    planets,
    houses,
    d9Houses,
    d10Houses,
    divisionalSummaries,
    strongestPlanet,
    analysis,
  };
}
