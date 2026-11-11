/**
 * Authentic Tamil Thirumana Porutham (10 Poruthams) Engine
 * Implements classical South Indian marriage compatibility rules:
 * 1. Dina Porutham (Health & Longevity)
 * 2. Gana Porutham (Temperament & Nature)
 * 3. Mahendra Porutham (Progeny & Family Lineage)
 * 4. Sthree Deergha Porutham (Wife's Long Life & Well-Being)
 * 5. Yoni Porutham (Physical Compatibility)
 * 6. Rasi Porutham (Moon-sign Compatibility)
 * 7. Rasi Adhipathi Porutham (Planetary Lords' Friendship)
 * 8. Vasya Porutham (Mutual Attraction & Influence)
 * 9. Rajju Porutham (Longevity of the Marriage — MUST PASS)
 * 10. Vedha Porutham (Obstructions between Stars — MUST PASS)
 */

import { NAKSHATRAS, NakshatraData, getNakshatraFromName, getNakshatraFromDob } from './kundaliEngine';

export interface TamilNakshatraMeta {
  id: number;
  sanskritName: string;
  tamilName: string;
  rasiIndex: number;
  rasiName: string;
  rasiTamilName: string;
  rasiLord: string;
  gana: 'Deva' | 'Manushya' | 'Rakshasa';
  yoniAnimal: string;
  rajju: 'Shiro' | 'Kantha' | 'Nabhi' | 'Ooru' | 'Pada';
  rajjuTamil: string;
}

export const TAMIL_NAKSHATRAS: TamilNakshatraMeta[] = [
  { id: 1, sanskritName: 'Ashwini', tamilName: 'Aswini (அஸ்வினி)', rasiIndex: 0, rasiName: 'Aries (Mesha)', rasiTamilName: 'Mesham (மேஷம்)', rasiLord: 'Mars', gana: 'Deva', yoniAnimal: 'Horse', rajju: 'Pada', rajjuTamil: 'Pada Rajju (Foot / பாதம்)' },
  { id: 2, sanskritName: 'Bharani', tamilName: 'Bharani (பரணி)', rasiIndex: 0, rasiName: 'Aries (Mesha)', rasiTamilName: 'Mesham (மேஷம்)', rasiLord: 'Mars', gana: 'Manushya', yoniAnimal: 'Elephant', rajju: 'Ooru', rajjuTamil: 'Ooru Rajju (Thigh / தொடை)' },
  { id: 3, sanskritName: 'Krittika', tamilName: 'Karthigai (கார்த்திகை)', rasiIndex: 1, rasiName: 'Taurus (Vrishabha)', rasiTamilName: 'Rishabam (ரிஷபம்)', rasiLord: 'Venus', gana: 'Rakshasa', yoniAnimal: 'Sheep', rajju: 'Nabhi', rajjuTamil: 'Nabhi Rajju (Navel / நாபி)' },
  { id: 4, sanskritName: 'Rohini', tamilName: 'Rohini (ரோகிணி)', rasiIndex: 1, rasiName: 'Taurus (Vrishabha)', rasiTamilName: 'Rishabam (ரிஷபம்)', rasiLord: 'Venus', gana: 'Manushya', yoniAnimal: 'Serpent', rajju: 'Kantha', rajjuTamil: 'Kantha Rajju (Neck / கழுத்து)' },
  { id: 5, sanskritName: 'Mrigashira', tamilName: 'Mrigasheersham (மிருகசீரிடம்)', rasiIndex: 2, rasiName: 'Gemini (Mithuna)', rasiTamilName: 'Mithunam (மிதுனம்)', rasiLord: 'Mercury', gana: 'Deva', yoniAnimal: 'Serpent', rajju: 'Shiro', rajjuTamil: 'Shiro Rajju (Head / சிரசு)' },
  { id: 6, sanskritName: 'Ardra', tamilName: 'Thiruvathirai (திருவாதிரை)', rasiIndex: 2, rasiName: 'Gemini (Mithuna)', rasiTamilName: 'Mithunam (மிதுனம்)', rasiLord: 'Mercury', gana: 'Manushya', yoniAnimal: 'Dog', rajju: 'Shiro', rajjuTamil: 'Shiro Rajju (Head / சிரசு)' },
  { id: 7, sanskritName: 'Punarvasu', tamilName: 'Punarpoosam (புனர்பூசம்)', rasiIndex: 3, rasiName: 'Cancer (Karka)', rasiTamilName: 'Kadagam (கடகம்)', rasiLord: 'Moon', gana: 'Deva', yoniAnimal: 'Cat', rajju: 'Kantha', rajjuTamil: 'Kantha Rajju (Neck / கழுத்து)' },
  { id: 8, sanskritName: 'Pushya', tamilName: 'Poosam (பூசம்)', rasiIndex: 3, rasiName: 'Cancer (Karka)', rasiTamilName: 'Kadagam (கடகம்)', rasiLord: 'Moon', gana: 'Deva', yoniAnimal: 'Sheep', rajju: 'Nabhi', rajjuTamil: 'Nabhi Rajju (Navel / நாபி)' },
  { id: 9, sanskritName: 'Ashlesha', tamilName: 'Aayilyam (ஆயில்யம்)', rasiIndex: 3, rasiName: 'Cancer (Karka)', rasiTamilName: 'Kadagam (கடகம்)', rasiLord: 'Moon', gana: 'Rakshasa', yoniAnimal: 'Cat', rajju: 'Ooru', rajjuTamil: 'Ooru Rajju (Thigh / தொடை)' },
  { id: 10, sanskritName: 'Magha', tamilName: 'Magam (மகம்)', rasiIndex: 4, rasiName: 'Leo (Simha)', rasiTamilName: 'Simmam (சிம்மம்)', rasiLord: 'Sun', gana: 'Rakshasa', yoniAnimal: 'Rat', rajju: 'Pada', rajjuTamil: 'Pada Rajju (Foot / பாதம்)' },
  { id: 11, sanskritName: 'Purva Phalguni', tamilName: 'Pooram (பூரம்)', rasiIndex: 4, rasiName: 'Leo (Simha)', rasiTamilName: 'Simmam (சிம்மம்)', rasiLord: 'Sun', gana: 'Manushya', yoniAnimal: 'Rat', rajju: 'Ooru', rajjuTamil: 'Ooru Rajju (Thigh / தொடை)' },
  { id: 12, sanskritName: 'Uttara Phalguni', tamilName: 'Uthiram (உத்திரம்)', rasiIndex: 5, rasiName: 'Virgo (Kanya)', rasiTamilName: 'Kanni (கன்னி)', rasiLord: 'Mercury', gana: 'Manushya', yoniAnimal: 'Cow', rajju: 'Nabhi', rajjuTamil: 'Nabhi Rajju (Navel / நாபி)' },
  { id: 13, sanskritName: 'Hasta', tamilName: 'Hastham (அஸ்தம்)', rasiIndex: 5, rasiName: 'Virgo (Kanya)', rasiTamilName: 'Kanni (கன்னி)', rasiLord: 'Mercury', gana: 'Deva', yoniAnimal: 'Buffalo', rajju: 'Kantha', rajjuTamil: 'Kantha Rajju (Neck / கழுத்து)' },
  { id: 14, sanskritName: 'Chitra', tamilName: 'Chithirai (சித்திரை)', rasiIndex: 6, rasiName: 'Libra (Tula)', rasiTamilName: 'Thulam (துலாம்)', rasiLord: 'Venus', gana: 'Rakshasa', yoniAnimal: 'Tiger', rajju: 'Shiro', rajjuTamil: 'Shiro Rajju (Head / சிரசு)' },
  { id: 15, sanskritName: 'Swati', tamilName: 'Swathi (சுவாதி)', rasiIndex: 6, rasiName: 'Libra (Tula)', rasiTamilName: 'Thulam (துலாம்)', rasiLord: 'Venus', gana: 'Deva', yoniAnimal: 'Buffalo', rajju: 'Shiro', rajjuTamil: 'Shiro Rajju (Head / சிரசு)' },
  { id: 16, sanskritName: 'Vishakha', tamilName: 'Visakam (விசாகம்)', rasiIndex: 7, rasiName: 'Scorpio (Vrishchika)', rasiTamilName: 'Viruchigam (விருச்சிகம்)', rasiLord: 'Mars', gana: 'Rakshasa', yoniAnimal: 'Tiger', rajju: 'Kantha', rajjuTamil: 'Kantha Rajju (Neck / கழுத்து)' },
  { id: 17, sanskritName: 'Anuradha', tamilName: 'Anusham (அனுஷம்)', rasiIndex: 7, rasiName: 'Scorpio (Vrishchika)', rasiTamilName: 'Viruchigam (விருச்சிகம்)', rasiLord: 'Mars', gana: 'Deva', yoniAnimal: 'Deer', rajju: 'Nabhi', rajjuTamil: 'Nabhi Rajju (Navel / நாபி)' },
  { id: 18, sanskritName: 'Jyeshtha', tamilName: 'Kettai (கேட்டை)', rasiIndex: 7, rasiName: 'Scorpio (Vrishchika)', rasiTamilName: 'Viruchigam (விருச்சிகம்)', rasiLord: 'Mars', gana: 'Rakshasa', yoniAnimal: 'Deer', rajju: 'Ooru', rajjuTamil: 'Ooru Rajju (Thigh / தொடை)' },
  { id: 19, sanskritName: 'Mula', tamilName: 'Moolam (மூலம்)', rasiIndex: 8, rasiName: 'Sagittarius (Dhanu)', rasiTamilName: 'Dhanusu (தனுசு)', rasiLord: 'Jupiter', gana: 'Rakshasa', yoniAnimal: 'Dog', rajju: 'Pada', rajjuTamil: 'Pada Rajju (Foot / பாதம்)' },
  { id: 20, sanskritName: 'Purva Ashadha', tamilName: 'Pooradam (பூராடம்)', rasiIndex: 8, rasiName: 'Sagittarius (Dhanu)', rasiTamilName: 'Dhanusu (தனுசு)', rasiLord: 'Jupiter', gana: 'Manushya', yoniAnimal: 'Monkey', rajju: 'Ooru', rajjuTamil: 'Ooru Rajju (Thigh / தொடை)' },
  { id: 21, sanskritName: 'Uttara Ashadha', tamilName: 'Uthiradam (உத்திராடம்)', rasiIndex: 9, rasiName: 'Capricorn (Makara)', rasiTamilName: 'Magaram (மகரம்)', rasiLord: 'Saturn', gana: 'Manushya', yoniAnimal: 'Mongoose', rajju: 'Nabhi', rajjuTamil: 'Nabhi Rajju (Navel / நாபி)' },
  { id: 22, sanskritName: 'Shravana', tamilName: 'Thiruvonam (திருவோணம்)', rasiIndex: 9, rasiName: 'Capricorn (Makara)', rasiTamilName: 'Magaram (மகரம்)', rasiLord: 'Saturn', gana: 'Deva', yoniAnimal: 'Monkey', rajju: 'Kantha', rajjuTamil: 'Kantha Rajju (Neck / கழுத்து)' },
  { id: 23, sanskritName: 'Dhanishta', tamilName: 'Avittam (அவிட்டம்)', rasiIndex: 10, rasiName: 'Aquarius (Kumbha)', rasiTamilName: 'Kumbam (கும்பம்)', rasiLord: 'Saturn', gana: 'Rakshasa', yoniAnimal: 'Lion', rajju: 'Shiro', rajjuTamil: 'Shiro Rajju (Head / சிரசு)' },
  { id: 24, sanskritName: 'Shatabhisha', tamilName: 'Sadhayam (சதயம்)', rasiIndex: 10, rasiName: 'Aquarius (Kumbha)', rasiTamilName: 'Kumbam (கும்பம்)', rasiLord: 'Saturn', gana: 'Rakshasa', yoniAnimal: 'Horse', rajju: 'Shiro', rajjuTamil: 'Shiro Rajju (Head / சிரசு)' },
  { id: 25, sanskritName: 'Purva Bhadrapada', tamilName: 'Poorattathi (பூரட்டாதி)', rasiIndex: 11, rasiName: 'Pisces (Meena)', rasiTamilName: 'Meenam (மீனம்)', rasiLord: 'Jupiter', gana: 'Manushya', yoniAnimal: 'Lion', rajju: 'Kantha', rajjuTamil: 'Kantha Rajju (Neck / கழுத்து)' },
  { id: 26, sanskritName: 'Uttara Bhadrapada', tamilName: 'Uthirattathi (உத்திரட்டாதி)', rasiIndex: 11, rasiName: 'Pisces (Meena)', rasiTamilName: 'Meenam (மீனம்)', rasiLord: 'Jupiter', gana: 'Manushya', yoniAnimal: 'Cow', rajju: 'Nabhi', rajjuTamil: 'Nabhi Rajju (Navel / நாபி)' },
  { id: 27, sanskritName: 'Revati', tamilName: 'Revathi (ரேவதி)', rasiIndex: 11, rasiName: 'Pisces (Meena)', rasiTamilName: 'Meenam (மீனம்)', rasiLord: 'Jupiter', gana: 'Deva', yoniAnimal: 'Elephant', rajju: 'Ooru', rajjuTamil: 'Ooru Rajju (Thigh / தொடை)' },
];

// Vedha Mutually Afflicting Pairs
const VEDHA_PAIRS: [number, number][] = [
  [1, 18],   // Ashwini & Jyeshtha
  [2, 17],   // Bharani & Anuradha
  [3, 16],   // Krittika & Vishakha
  [4, 15],   // Rohini & Swati
  [5, 23],   // Mrigashira & Dhanishta
  [6, 22],   // Ardra & Shravana
  [7, 21],   // Punarvasu & Uttara Ashadha
  [8, 20],   // Pushya & Purva Ashadha
  [9, 19],   // Ashlesha & Mula
  [10, 27],  // Magha & Revati
  [11, 26],  // Purva Phalguni & Uttara Bhadrapada
  [12, 25],  // Uttara Phalguni & Purva Bhadrapada
  [13, 24],  // Hasta & Shatabhisha
];

// Sworn enemies in Yoni
const YONI_ENEMIES: [string, string][] = [
  ['Horse', 'Buffalo'],
  ['Elephant', 'Lion'],
  ['Sheep', 'Monkey'],
  ['Serpent', 'Mongoose'],
  ['Dog', 'Deer'],
  ['Cat', 'Rat'],
  ['Cow', 'Tiger'],
];

// Planetary friendships for Rasi Adhipathi
const PLANET_FRIENDS: Record<string, { friends: string[]; neutrals: string[]; enemies: string[] }> = {
  Sun: { friends: ['Moon', 'Mars', 'Jupiter'], neutrals: ['Mercury'], enemies: ['Venus', 'Saturn'] },
  Moon: { friends: ['Sun', 'Mercury'], neutrals: ['Mars', 'Jupiter', 'Venus', 'Saturn'], enemies: [] },
  Mars: { friends: ['Sun', 'Moon', 'Jupiter'], neutrals: ['Venus', 'Saturn'], enemies: ['Mercury'] },
  Mercury: { friends: ['Sun', 'Venus'], neutrals: ['Mars', 'Jupiter', 'Saturn'], enemies: ['Moon'] },
  Jupiter: { friends: ['Sun', 'Moon', 'Mars'], neutrals: ['Saturn'], enemies: ['Mercury', 'Venus'] },
  Venus: { friends: ['Mercury', 'Saturn'], neutrals: ['Mars', 'Jupiter'], enemies: ['Sun', 'Moon'] },
  Saturn: { friends: ['Mercury', 'Venus'], neutrals: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'] },
};

// Vasya pairs (Rasi index 0-11)
const VASYA_MAP: Record<number, number[]> = {
  0: [4, 7],     // Mesha attracts Simha, Vrishchika
  1: [3, 6],     // Vrishabha attracts Kataka, Tula
  2: [5],        // Mithuna attracts Kanya
  3: [7, 8],     // Kataka attracts Vrishchika, Dhanu
  4: [6],        // Simha attracts Tula
  5: [2, 11],    // Kanya attracts Mithuna, Meena
  6: [9],        // Tula attracts Makara
  7: [3],        // Vrishchika attracts Kataka
  8: [11],       // Dhanu attracts Meena
  9: [0, 10],    // Makara attracts Mesha, Kumbha
  10: [0],       // Kumbha attracts Mesha
  11: [9],       // Meena attracts Makara
};

export interface SinglePoruthamItem {
  id: number;
  name: string;
  tamilName: string;
  whatItChecks: string;
  isMustPass: boolean;
  isMatched: boolean;
  scoreDescription: string;
}

export interface PoruthamResult {
  bride: {
    name: string;
    star: TamilNakshatraMeta;
  };
  groom: {
    name: string;
    star: TamilNakshatraMeta;
  };
  poruthams: SinglePoruthamItem[];
  matchedCount: number;
  totalCount: 10;
  rajjuPassed: boolean;
  vedhaPassed: boolean;
  verdictBand: 'Excellent' | 'Good' | 'Acceptable' | 'Not Recommended';
  verdictTamil: string;
  verdictDescription: string;
}

export function calculateThirumanaPorutham(
  brideName: string,
  groomName: string,
  brideStarId: number,
  groomStarId: number
): PoruthamResult {
  const brideStar = TAMIL_NAKSHATRAS.find((s) => s.id === brideStarId) || TAMIL_NAKSHATRAS[0];
  const groomStar = TAMIL_NAKSHATRAS.find((s) => s.id === groomStarId) || TAMIL_NAKSHATRAS[0];

  const brideIndex = brideStar.id; // 1-27
  const groomIndex = groomStar.id; // 1-27

  // Distance from bride to groom (1-27)
  const dist = ((groomIndex - brideIndex + 27) % 27) + 1;

  // 1. Dina Porutham
  const dinaRemainder = dist % 9;
  const dinaMatched = [2, 4, 6, 8, 0].includes(dinaRemainder) || dist === 27;
  const dinaDesc = dinaMatched
    ? 'Favorable day count ensures mutual health, emotional peace, and daily harmony.'
    : 'Challenging day count may bring day-to-day friction unless mitigated by strong chart lords.';

  // 2. Gana Porutham
  let ganaMatched = false;
  if (brideStar.gana === groomStar.gana) {
    ganaMatched = true;
  } else if (
    (brideStar.gana === 'Deva' && groomStar.gana === 'Manushya') ||
    (brideStar.gana === 'Manushya' && groomStar.gana === 'Deva')
  ) {
    ganaMatched = true;
  }
  const ganaDesc = ganaMatched
    ? `Harmonious temperament (${brideStar.gana} & ${groomStar.gana}) ensures compatible mindsets and social alignment.`
    : `Contrasting natures (${brideStar.gana} & ${groomStar.gana}) require patience and understanding of temperamental differences.`;

  // 3. Mahendra Porutham
  const mahendraMatched = [4, 7, 10, 13, 16, 19, 22, 25].includes(dist);
  const mahendraDesc = mahendraMatched
    ? 'Auspicious count promises healthy progeny, affectionate family continuity, and lasting marital welfare.'
    : 'Neutral for progeny; family lineage benefits from positive Jupiter aspects in both natal charts.';

  // 4. Sthree Deergha Porutham
  const sthreeMatched = dist > 13;
  const sthreeDesc = sthreeMatched
    ? `Star distance is ${dist} (>13), conferring prosperity, happiness, and long life to the bride.`
    : `Star distance is ${dist} (≤13); traditional South Indian astrology advises strong Venus and Jupiter support.`;

  // 5. Yoni Porutham
  const isEnemies = YONI_ENEMIES.some(
    ([a, b]) => (a === brideStar.yoniAnimal && b === groomStar.yoniAnimal) || (b === brideStar.yoniAnimal && a === groomStar.yoniAnimal)
  );
  const yoniMatched = !isEnemies;
  const yoniDesc = yoniMatched
    ? `Compatible animals (${brideStar.yoniAnimal} & ${groomStar.yoniAnimal}) foster deep physical attraction and warmth.`
    : `Opposing animals (${brideStar.yoniAnimal} & ${groomStar.yoniAnimal}) indicate potential physical mismatch or intimacy friction.`;

  // 6. Rasi Porutham
  const rasiDist = ((groomStar.rasiIndex - brideStar.rasiIndex + 12) % 12) + 1;
  const rasiMatched = [1, 7, 3, 4, 10, 11].includes(rasiDist);
  const rasiDesc = rasiMatched
    ? `Favorable Moon sign relationship (${rasiDist}th house) ensures mental alignment and emotional trust.`
    : `Challenging Moon sign placement (${rasiDist}th house); harmony relies on the Rasi Adhipathi friendship.`;

  // 7. Rasi Adhipathi Porutham
  const lordB = brideStar.rasiLord;
  const lordG = groomStar.rasiLord;
  const isSameLord = lordB === lordG;
  const friendsB = PLANET_FRIENDS[lordB]?.friends || [];
  const neutralB = PLANET_FRIENDS[lordB]?.neutrals || [];
  const adhipathiMatched = isSameLord || friendsB.includes(lordG) || neutralB.includes(lordG);
  const adhipathiDesc = adhipathiMatched
    ? `Planetary lords (${lordB} & ${lordG}) share warm or neutral camaraderie, protecting mutual goodwill.`
    : `Planetary lords (${lordB} & ${lordG}) are astrological adversaries, suggesting differing core worldviews.`;

  // 8. Vasya Porutham
  const vasyaForBride = VASYA_MAP[brideStar.rasiIndex] || [];
  const vasyaForGroom = VASYA_MAP[groomStar.rasiIndex] || [];
  const vasyaMatched = vasyaForBride.includes(groomStar.rasiIndex) || vasyaForGroom.includes(brideStar.rasiIndex);
  const vasyaDesc = vasyaMatched
    ? 'Magnetic attraction exists; the couple naturally influences and commands mutual respect.'
    : 'Ordinary mutual magnetism; affection builds steadily through shared experiences over time.';

  // 9. Rajju Porutham (MUST PASS)
  const rajjuMatched = brideStar.rajju !== groomStar.rajju;
  const rajjuDesc = rajjuMatched
    ? `Cleared! Bride belongs to ${brideStar.rajjuTamil} and Groom belongs to ${groomStar.rajjuTamil}. Free from Rajju Dosha.`
    : `CRITICAL ALERT: Both belong to ${brideStar.rajjuTamil}. Same Rajju causes Rajju Dosha, which traditionally compromises longevity.`;

  // 10. Vedha Porutham (MUST PASS)
  const isVedhaAfflicted = VEDHA_PAIRS.some(
    ([a, b]) => (a === brideIndex && b === groomIndex) || (b === brideIndex && a === groomIndex)
  );
  const vedhaMatched = !isVedhaAfflicted;
  const vedhaDesc = vedhaMatched
    ? 'Cleared! No mutual star affliction or piercing between the two nakshatras.'
    : 'CRITICAL ALERT: These two birth stars form an obstructing Vedha pair, indicating persistent invisible hurdles.';

  const poruthams: SinglePoruthamItem[] = [
    { id: 1, name: 'Dina Porutham', tamilName: 'தினப் பொருத்தம்', whatItChecks: 'Day-to-day well-being and longevity', isMustPass: false, isMatched: dinaMatched, scoreDescription: dinaDesc },
    { id: 2, name: 'Gana Porutham', tamilName: 'கணப் பொருத்தம்', whatItChecks: 'Temperament and nature', isMustPass: false, isMatched: ganaMatched, scoreDescription: ganaDesc },
    { id: 3, name: 'Mahendra Porutham', tamilName: 'மகேந்திரப் பொருத்தம்', whatItChecks: 'Progeny and long married life', isMustPass: false, isMatched: mahendraMatched, scoreDescription: mahendraDesc },
    { id: 4, name: 'Sthree Deergha Porutham', tamilName: 'ஸ்திரீ தீர்க்கப் பொருத்தம்', whatItChecks: "The wife's well-being and long life", isMustPass: false, isMatched: sthreeMatched, scoreDescription: sthreeDesc },
    { id: 5, name: 'Yoni Porutham', tamilName: 'யோனிப் பொருத்தம்', whatItChecks: 'Physical compatibility', isMustPass: false, isMatched: yoniMatched, scoreDescription: yoniDesc },
    { id: 6, name: 'Rasi Porutham', tamilName: 'ராசிப் பொருத்தம்', whatItChecks: 'Moon-sign compatibility', isMustPass: false, isMatched: rasiMatched, scoreDescription: rasiDesc },
    { id: 7, name: 'Rasi Adhipathi Porutham', tamilName: 'ராசி அதிபதிப் பொருத்தம்', whatItChecks: 'Friendship of the moon-sign lords', isMustPass: false, isMatched: adhipathiMatched, scoreDescription: adhipathiDesc },
    { id: 8, name: 'Vasya Porutham', tamilName: 'வசியப் பொருத்தம்', whatItChecks: 'Mutual attraction and influence', isMustPass: false, isMatched: vasyaMatched, scoreDescription: vasyaDesc },
    { id: 9, name: 'Rajju Porutham', tamilName: 'ரஜ்ஜுப் பொருத்தம்', whatItChecks: 'Longevity of the marriage itself (Must Pass)', isMustPass: true, isMatched: rajjuMatched, scoreDescription: rajjuDesc },
    { id: 10, name: 'Vedha Porutham', tamilName: 'வேதைப் பொருத்தம்', whatItChecks: 'Obstructions between the stars (Must Pass)', isMustPass: true, isMatched: vedhaMatched, scoreDescription: vedhaDesc },
  ];

  const matchedCount = poruthams.filter((p) => p.isMatched).length;

  // Verdict calculation
  let verdictBand: 'Excellent' | 'Good' | 'Acceptable' | 'Not Recommended' = 'Good';
  let verdictTamil = 'மத்தியமப் பொருத்தம் (Good Match)';
  let verdictDescription = '';

  if (!rajjuMatched || !vedhaMatched) {
    verdictBand = 'Not Recommended';
    verdictTamil = 'பொருந்தவில்லை (Not Recommended - Dosha Present)';
    verdictDescription = !rajjuMatched && !vedhaMatched
      ? 'Both Rajju Dosha and Vedha Dosha are present. In Tamil marriage astrology, this match is strongly not recommended.'
      : !rajjuMatched
      ? 'Rajju Porutham failed (Rajju Dosha). In traditional Tamil astrology, Rajju is a non-negotiable must-pass factor.'
      : 'Vedha Porutham failed (Vedha Dosha). The stars obstruct each other, so this match is traditionally not advised.';
  } else if (matchedCount >= 9) {
    verdictBand = 'Excellent';
    verdictTamil = 'உத்தமப் பொருத்தம் (Excellent / Uthama Porutham)';
    verdictDescription = 'Exceptional alignment! 9 or more poruthams match with both Rajju and Vedha perfectly clear. An auspicious, blessed match.';
  } else if (matchedCount >= 7) {
    verdictBand = 'Good';
    verdictTamil = 'மத்தியமப் பொருத்தம் (Good / Madhyama Porutham)';
    verdictDescription = 'Favorable match! 7 or 8 poruthams match with critical longevity and obstruction checks safely passed.';
  } else if (matchedCount >= 6) {
    verdictBand = 'Acceptable';
    verdictTamil = 'சுமாரான பொருத்தம் (Acceptable Match)';
    verdictDescription = 'Acceptable baseline match. While 6 poruthams match, consulting an astrologer for individual planetary Dasha periods is advised.';
  } else {
    verdictBand = 'Not Recommended';
    verdictTamil = 'பொருந்தவில்லை (Low Match Count)';
    verdictDescription = `Only ${matchedCount} out of 10 poruthams match. The traditional minimum recommended threshold is at least 6 to 7 poruthams.`;
  }

  return {
    bride: {
      name: brideName || 'Bride',
      star: brideStar,
    },
    groom: {
      name: groomName || 'Groom',
      star: groomStar,
    },
    poruthams,
    matchedCount,
    totalCount: 10,
    rajjuPassed: rajjuMatched,
    vedhaPassed: vedhaMatched,
    verdictBand,
    verdictTamil,
    verdictDescription,
  };
}

export function findStarFromInput(
  mode: 'dob' | 'star' | 'name',
  starId?: number,
  dob?: string,
  name?: string
): number {
  if (mode === 'star' && starId) {
    return starId;
  }
  if (mode === 'dob' && dob) {
    const kStar = getNakshatraFromDob(dob);
    return kStar.id;
  }
  if (mode === 'name' && name) {
    const kStar = getNakshatraFromName(name);
    return kStar.id;
  }
  return 1; // Default Ashwini
}
