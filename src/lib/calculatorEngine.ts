import { CompatibilityResult, FlamesResult, FlamesStep } from '../types';

/**
 * Standard deterministic string hash for symmetric pair
 */
function getSymmetricHash(str1: string, str2: string): number {
  const s1 = str1.trim().toLowerCase();
  const s2 = str2.trim().toLowerCase();
  
  // Sort alphabetically so Person1 + Person2 == Person2 + Person1
  const [first, second] = [s1, s2].sort();
  const combined = `${first}♥${second}`;
  
  let hash = 5381;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) + hash) + combined.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Deterministic Love & Compatibility Calculation
 */
export function calculateLoveScore(person1: string, person2: string, mode: 'general' | 'name' | 'percentage' | 'soulmate' = 'general'): CompatibilityResult {
  const clean1 = person1.trim();
  const clean2 = person2.trim();

  if (!clean1 || !clean2) {
    throw new Error('Please enter both names');
  }

  const hash = getSymmetricHash(clean1, clean2);
  
  // Base percentage mapped between 52% and 98% for positive engagement
  const score = 52 + (hash % 47);

  // Sub-metrics derived deterministically
  const commHash = Math.abs((hash ^ 0x5a5a5a) % 45);
  const emoHash = Math.abs((hash ^ 0x3c3c3c) % 40);
  const passHash = Math.abs((hash ^ 0x1f1f1f) % 42);
  const longHash = Math.abs((hash ^ 0x7e7e7e) % 43);

  const communication = 55 + commHash;
  const emotionalHarmony = 58 + emoHash;
  const passion = 54 + passHash;
  const longevity = 56 + longHash;

  let grade = 'Strong Affinity';
  let verdict = 'Harmonious Bond';
  let summary = `${clean1} and ${clean2} share an organic affinity with high natural understanding.`;
  let advice = 'Open conversations and regular quality time will help this bond flourish into something profound.';

  if (score >= 90) {
    grade = 'Exceptional Resonance';
    verdict = mode === 'soulmate' ? 'Soulmate Connection' : 'High Emotional Alignment';
    summary = `A rare, deeply aligned compatibility score of ${score}%. The chemistry between ${clean1} and ${clean2} indicates shared core values and natural comfort.`;
    advice = 'Celebrate your shared humor and mutual respect. Cherish this warm natural connection.';
  } else if (score >= 78) {
    grade = 'Strong Harmony';
    verdict = 'Deep Connection';
    summary = `A solid ${score}% compatibility indicates great potential for meaningful companionship, shared laughter, and emotional security.`;
    advice = 'Express gratitude often and stay curious about each other’s evolving dreams and ambitions.';
  } else if (score >= 65) {
    grade = 'Promising Dynamic';
    verdict = 'Balanced Chemistry';
    summary = `With ${score}% affinity, ${clean1} and ${clean2} have complementary strengths where individuality adds excitement to the connection.`;
    advice = 'Patience and attentive listening will turn minor differences into strengths that deepen your bond.';
  } else {
    grade = 'Dynamic Exploration';
    verdict = 'Growing Connection';
    summary = `${clean1} and ${clean2} carry distinct individual perspectives (${score}%). This offers immense opportunity for personal growth and exciting discoveries.`;
    advice = 'Focus on finding common passions, playful activities, and clear honest communication.';
  }

  return {
    score,
    grade,
    verdict,
    summary,
    breakdown: {
      communication,
      emotionalHarmony,
      passion,
      longevity,
    },
    advice,
    names: {
      person1: clean1,
      person2: clean2,
    },
  };
}

/**
 * Authentic FLAMES Algorithm
 * Friends, Lovers, Affectionate, Marriage, Enemies, Siblings
 */
export function calculateFlames(person1: string, person2: string): FlamesResult {
  const p1 = person1.toLowerCase().replace(/[^a-z]/g, '');
  const p2 = person2.toLowerCase().replace(/[^a-z]/g, '');

  if (!p1 || !p2) {
    throw new Error('Please enter valid names containing letters');
  }

  const p1Arr = p1.split('');
  const p2Arr = p2.split('');
  const cancelled: string[] = [];

  // Match and cancel common letters
  for (let i = 0; i < p1Arr.length; i++) {
    const char = p1Arr[i];
    const matchIndex = p2Arr.indexOf(char);
    if (matchIndex !== -1) {
      cancelled.push(char);
      p1Arr.splice(i, 1);
      p2Arr.splice(matchIndex, 1);
      i--;
    }
  }

  let remainingCount = p1Arr.length + p2Arr.length;
  if (remainingCount === 0) {
    // If exact same letters, default count 6 for full cycle
    remainingCount = 6;
  }

  // FLAMES elimination sequence
  let flamesLetters = ['F', 'L', 'A', 'M', 'E', 'S'];
  const eliminationRounds: FlamesStep['eliminationRounds'] = [];
  let currentIndex = 0;

  while (flamesLetters.length > 1) {
    currentIndex = (currentIndex + remainingCount - 1) % flamesLetters.length;
    const eliminated = flamesLetters[currentIndex];
    flamesLetters.splice(currentIndex, 1);
    
    eliminationRounds.push({
      letterEliminated: eliminated,
      remainingLetters: [...flamesLetters],
      indexEliminated: currentIndex,
    });
  }

  const resultLetter = flamesLetters[0] as FlamesResult['resultLetter'];
  
  const map: Record<FlamesResult['resultLetter'], { word: string; meaning: string }> = {
    F: {
      word: 'Friends',
      meaning: `${person1} and ${person2} share a pure, reliable foundation of unconditional friendship, shared laughter, and loyal companionship.`,
    },
    L: {
      word: 'Lovers',
      meaning: `A magnetic romantic spark! Passion, romantic energy, and emotional longing define the chemistry between ${person1} and ${person2}.`,
    },
    A: {
      word: 'Affectionate',
      meaning: `Deep tenderness, gentle care, and protective warmth. You naturally look out for each other with genuine affection.`,
    },
    M: {
      word: 'Marriage',
      meaning: `Long-term destiny and family stability! Indicates strong matrimonial potential, shared life vision, and mutual commitment.`,
    },
    E: {
      word: 'Enemies',
      meaning: `Playful rivalry or high-voltage friction! You both have strong, independent personalities that either clash or ignite thrilling banter.`,
    },
    S: {
      word: 'Siblings',
      meaning: `A wholesome, protective bond built on innocence, deep familial care, and unquestioned loyalty.`,
    },
  };

  return {
    person1: person1.trim(),
    person2: person2.trim(),
    remainingCount,
    resultLetter,
    resultWord: map[resultLetter].word,
    meaning: map[resultLetter].meaning,
    steps: {
      name1Letters: p1Arr,
      name2Letters: p2Arr,
      cancelledLetters: cancelled,
      remainingCount,
      eliminationRounds,
    },
  };
}

/**
 * Friendship Compatibility Calculator
 */
export function calculateFriendshipScore(friend1: string, friend2: string) {
  const clean1 = friend1.trim();
  const clean2 = friend2.trim();

  const hash = getSymmetricHash(clean1, clean2);
  const score = 65 + (hash % 34); // 65% to 98%

  const loyalty = 70 + (Math.abs(hash ^ 0x1234) % 29);
  const banter = 68 + (Math.abs(hash ^ 0x5678) % 31);
  const support = 72 + (Math.abs(hash ^ 0x9abc) % 27);

  let title = 'Unbreakable Besties';
  let desc = `${clean1} and ${clean2} possess an exceptional friendship bond marked by effortless banter and fierce loyalty.`;

  if (score < 75) {
    title = 'Steadfast Companions';
    desc = `${clean1} and ${clean2} bring different energies to the table, creating a grounded and supportive friendship.`;
  } else if (score < 88) {
    title = 'Dynamic Duo';
    desc = `Always ready for spontaneous chai runs, deep late-night chats, and mutual support through life’s ups and downs.`;
  }

  return {
    score,
    title,
    desc,
    breakdown: {
      loyalty,
      banter,
      support,
    },
    names: { person1: clean1, person2: clean2 },
  };
}

/**
 * Life Path Number Calculator from Date of Birth
 */
export function calculateLifePath(dobString: string): number {
  // expects YYYY-MM-DD or similar
  const digits = dobString.replace(/\D/g, '');
  if (!digits) return 1;

  let sum = digits.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }
  // Reduce master numbers to 1-9 for standard compatibility
  if (sum > 9) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }
  return sum || 1;
}

export function calculateDobCompatibility(name1: string, dob1: string, name2: string, dob2: string) {
  const lp1 = calculateLifePath(dob1);
  const lp2 = calculateLifePath(dob2);

  // Life Path Natural Harmonies
  const harmonyMatrix: Record<number, number[]> = {
    1: [1, 5, 7, 3],
    2: [2, 4, 8, 6],
    3: [3, 6, 9, 1, 5],
    4: [4, 2, 8, 7],
    5: [5, 1, 3, 7],
    6: [6, 2, 3, 9],
    7: [7, 1, 4, 5],
    8: [8, 2, 4, 6],
    9: [9, 3, 6],
  };

  const isDirectHarmony = harmonyMatrix[lp1]?.includes(lp2);
  let baseScore = isDirectHarmony ? 84 : 72;
  const hash = getSymmetricHash(dob1, dob2) % 15;
  const totalScore = Math.min(98, baseScore + hash);

  const lifePathMeanings: Record<number, string> = {
    1: 'The Leader (Independent, driven, ambitious)',
    2: 'The Peacemaker (Empathetic, diplomatic, loving)',
    3: 'The Creative (Expressive, joyful, spontaneous)',
    4: 'The Builder (Disciplined, loyal, practical)',
    5: 'The Adventurer (Free-spirited, dynamic, progressive)',
    6: 'The Nurturer (Responsible, caring, family-first)',
    7: 'The Thinker (Analytical, spiritual, intuitive)',
    8: 'The Achiever (Authoritative, determined, visionary)',
    9: 'The Humanitarian (Generous, wise, compassionate)',
  };

  return {
    score: totalScore,
    lp1,
    lp2,
    meaning1: lifePathMeanings[lp1] || 'Dynamic energy',
    meaning2: lifePathMeanings[lp2] || 'Dynamic energy',
    harmonyStatus: isDirectHarmony ? 'Natural Elemental Harmony' : 'Complementary Growth Bond',
    summary: `${name1} (Life Path ${lp1}) and ${name2} (Life Path ${lp2}) exhibit a ${totalScore}% resonance. Their birth numbers reflect balancing traits that foster personal development and shared strength.`,
  };
}

/**
 * Love vs. Arranged Marriage Alignment Calculator
 */
export function calculateMarriagePreference(
  name1: string,
  name2: string,
  answers: {
    familyPriority: number; // 1 to 5
    socialCircle: number;   // 1 to 5
    adventureStyle: number; // 1 to 5
    communication: number;  // 1 to 5
  }
) {
  const hash = getSymmetricHash(name1, name2);
  
  // Traditional/Family index (1 to 10)
  const familyWeight = (answers.familyPriority * 2) + ((hash % 10) / 2);
  const loveWeight = (answers.adventureStyle * 2) + (answers.communication * 2) + ((Math.abs(hash >> 3) % 10) / 2);

  const total = familyWeight + loveWeight;
  const lovePercentage = Math.round((loveWeight / total) * 100);
  const arrangedPercentage = 100 - lovePercentage;

  let outlook = 'Modern Hybrid Alliance (Love with Full Family Blessing)';
  let advice = 'You appreciate romance and organic chemistry while upholding deep respect for family traditions and heritage.';

  if (lovePercentage > 62) {
    outlook = 'Strong Love Marriage Affinity';
    advice = 'Your connection is built on personal courtship, shared mutual goals, and deep one-on-one understanding.';
  } else if (arrangedPercentage > 62) {
    outlook = 'Strong Arranged Alliance Affinity';
    advice = 'Shared cultural values, extended family harmony, and grounded marital stability guide your long-term relationship.';
  }

  return {
    lovePercentage,
    arrangedPercentage,
    outlook,
    advice,
    names: { person1: name1, person2: name2 },
  };
}
