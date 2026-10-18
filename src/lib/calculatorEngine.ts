import { CompatibilityResult, FlamesResult, FlamesStep } from '../types';

/**
 * Standard deterministic string hash for symmetric pair
 */
function getSymmetricHash(str1: string, str2: string, extraSalt: string = ''): number {
  const s1 = str1.trim().toLowerCase();
  const s2 = str2.trim().toLowerCase();
  
  // Sort alphabetically so Person1 + Person2 == Person2 + Person1
  const [first, second] = [s1, s2].sort();
  const combined = `${first}♥${second}${extraSalt}`;
  
  let hash = 5381;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) + hash) + combined.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export interface OptionalEngagementInputs {
  age1?: string | number;
  age2?: string | number;
  bondType?: string; // 'crush' | 'dating' | 'friends' | 'engaged' | 'married'
  vibe?: string;     // 'chai' | 'travel' | 'movies' | 'deep_talks'
  zodiac1?: string;
  zodiac2?: string;
}

/**
 * Deterministic Love & Compatibility Calculation with Engaging Details & Hinglish Suggestions
 */
export function calculateLoveScore(
  person1: string,
  person2: string,
  mode: 'general' | 'name' | 'percentage' | 'soulmate' = 'general',
  extra?: OptionalEngagementInputs
): CompatibilityResult {
  const clean1 = person1.trim();
  const clean2 = person2.trim();

  if (!clean1 || !clean2) {
    throw new Error('Please enter both names');
  }

  // Factor in extra inputs deterministically if provided
  const salt = `${extra?.bondType || ''}-${extra?.vibe || ''}-${extra?.zodiac1 || ''}-${extra?.zodiac2 || ''}`;
  const hash = getSymmetricHash(clean1, clean2, salt);
  
  // Base percentage mapped between 54% and 98% for positive, encouraging engagement
  let score = 54 + (hash % 45);

  // Bonus alignment if ages or vibes are harmoniously tuned
  if (extra?.age1 && extra?.age2) {
    const a1 = Number(extra.age1);
    const a2 = Number(extra.age2);
    if (!isNaN(a1) && !isNaN(a2)) {
      const diff = Math.abs(a1 - a2);
      if (diff <= 3) score = Math.min(98, score + 2);
    }
  }

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

  // Hinglish Reflections for Indian users
  let hinglishTagline = 'Mast Chemistry & Pyar Bhara Connection! ✨';
  let hinglishSuggestion = `Aap dono ki chemistry bohot natural hai. Chai pe lambi baatein aur ek doosre ke din ke baare mein poochna aapke bond ko aur strong banayega.`;
  let hinglishTip = `Tip: Jab bhi thoda mood off ho, bina ego ke pehla text ya call kar lo—dil jeet loge! ☕`;

  if (score >= 90) {
    grade = 'Exceptional Resonance';
    verdict = mode === 'soulmate' ? 'Soulmate Connection' : 'Rab Ne Bana Di Jodi';
    summary = `A rare, deeply aligned compatibility score of ${score}%. The chemistry between ${clean1} and ${clean2} indicates shared core values, effortless comfort, and emotional security.`;
    advice = 'Celebrate your shared humor and mutual respect. Cherish this warm natural connection.';

    hinglishTagline = 'Rab Ne Bana Di Jodi! 💖 (Blockbuster Chemistry)';
    hinglishSuggestion = `Aap dono ki wavelength ekdum perfect match karti hai! Bina bole ek doosre ki baat samajh lena aur chhoti-chhoti baaton pe saath hasna—yeh connection bohot rare hai.`;
    hinglishTip = `Tip: Ek surprise date ya unka favourite street food le aao, chehre pe instant smile pakki hai! 🍕`;
  } else if (score >= 78) {
    grade = 'Strong Harmony';
    verdict = 'Deep Connection & Sukoon';
    summary = `A solid ${score}% compatibility indicates great potential for meaningful companionship, shared laughter, and emotional security.`;
    advice = 'Express gratitude often and stay curious about each other’s evolving dreams and ambitions.';

    hinglishTagline = 'Total Sukoon & Dil Se Dil Ka Connection! 🌸';
    hinglishSuggestion = `Rishte mein trust aur respect ki neenv bohot mazboot hai. Jab bhi work-life stress ho, bas ek shaam saath baitho—saara thakaan door ho jayega.`;
    hinglishTip = `Tip: Ek doosre ke chote dreams ko support karo, connection next-level ho jayega! 🚗`;
  } else if (score >= 65) {
    grade = 'Promising Dynamic';
    verdict = 'Masaledaar Chemistry';
    summary = `With ${score}% affinity, ${clean1} and ${clean2} have complementary strengths where individuality and lively banter add excitement to the connection.`;
    advice = 'Patience and attentive listening will turn minor differences into strengths that deepen your bond.';

    hinglishTagline = 'Opposites Attract – Thoda Drama, Zyada Pyaar! 🌶️';
    hinglishSuggestion = `Dono ke perspectives alag ho sakte hain, lekin wahi toh relationship ka asli maza hai! Ek plan karta hai toh doosra spontaneous masti lata hai.`;
    hinglishTip = `Tip: Differences pe argue karne ke bajaye thoda playful banter karo, romance badhega! 😉`;
  } else {
    grade = 'Dynamic Exploration';
    verdict = 'Growing Bond';
    summary = `${clean1} and ${clean2} carry distinct individual perspectives (${score}%). This offers immense opportunity for personal growth and exciting discoveries.`;
    advice = 'Focus on finding common passions, playful activities, and clear honest communication.';

    hinglishTagline = 'Dheere-Dheere Pyar Ko Badhana Hai! 🌱';
    hinglishSuggestion = `Har acchi cheez time leti hai! Ek doosre ko achhi tarah samajhne ke liye thoda patience aur open conversations ki zaroorat hai.`;
    hinglishTip = `Tip: Ek common hobby dhoondo—jaise late-night walks ya music share karna! 🎧`;
  }

  return {
    score,
    grade,
    verdict,
    summary,
    hinglishTagline,
    hinglishSuggestion,
    hinglishTip,
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
    details: {
      age1: extra?.age1,
      age2: extra?.age2,
      bondType: extra?.bondType,
      vibe: extra?.vibe,
      zodiac1: extra?.zodiac1,
      zodiac2: extra?.zodiac2,
    },
  };
}

/**
 * Authentic FLAMES Algorithm with Engaging Hinglish Prediction & Steps
 */
export function calculateFlames(
  person1: string,
  person2: string,
  extra?: { age1?: string | number; age2?: string | number; bondType?: string }
): FlamesResult {
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
  
  const map: Record<FlamesResult['resultLetter'], {
    word: string;
    meaning: string;
    tagline: string;
    hinglish: string;
    tip: string;
  }> = {
    F: {
      word: 'Friends',
      meaning: `${person1} and ${person2} share a pure, reliable foundation of unconditional friendship, shared laughter, and loyal companionship.`,
      tagline: 'Yeh Dosti Hum Nahi Todenge! 🤝',
      hinglish: 'Dosti itni solid hai ki 3 AM emergency ho ya spontaneous chai ka plan, pehla text ek doosre ko hi jayega. No fake filters, pure honesty!',
      tip: 'Tip: Apne dost ko unki favourite treat khilao aur puraane school/college moments yaad karo! ☕',
    },
    L: {
      word: 'Lovers',
      meaning: `A magnetic romantic spark! Passion, romantic energy, and emotional longing define the chemistry between ${person1} and ${person2}.`,
      tagline: 'Pyaar Dosti Hai – Total Bollywood Romance! 💘',
      hinglish: 'Aankhon hi aankhon mein baatein aur dil mein butterflies! Romantic chemistry ekdum peak pe hai. Ek doosre ke messages ka wait karna band nahi hoga.',
      tip: 'Tip: Late-night phone call ya thoughtful handwritten note se dil jeet lo! 💌',
    },
    A: {
      word: 'Affectionate',
      meaning: `Deep tenderness, gentle care, and protective warmth. You naturally look out for each other with genuine affection.`,
      tagline: 'Care, Sukoon & Gentle Warmth! 🌸',
      hinglish: 'Care itni natural hai jaise koi apna family member ho. “Khana khaya?” aur “Pohanch gaye ghar?” poochna inka love language hai.',
      tip: 'Tip: Unka dhyan rakhna hi aapki sabse badi power hai. Continue spreading warmth! 🫂',
    },
    M: {
      word: 'Marriage',
      meaning: `Long-term destiny and family stability! Indicates strong matrimonial potential, shared life vision, and mutual commitment.`,
      tagline: 'Shaadi Ke Laddoo & Saat Phere Vibes! 💍',
      hinglish: 'Band baaja baaraat ready samjho! Dono ki life priorities aur family values ekdum match karti hain. Kundli aur dil dono raazi lagte hain!',
      tip: 'Tip: Long-term plans aur family integration ke baare mein open baatein shuru karo! 🪷',
    },
    E: {
      word: 'Enemies',
      meaning: `Playful rivalry or high-voltage friction! You both have strong, independent personalities that either clash or ignite thrilling banter.`,
      tagline: 'Tom & Jerry Wali Sweet Nok-Jhok! ⚡',
      hinglish: 'Bina ladhe chain nahi milta, aur bina baat kiye din poora nahi hota! Yeh rivalry boring nahi hai, yeh full-on entertaining aur spicy hai.',
      tip: 'Tip: Jab argument zyada ho, ek smile pass karke ice cream order kar do! 🍨',
    },
    S: {
      word: 'Siblings',
      meaning: `A wholesome, protective bond built on innocence, deep familial care, and unquestioned loyalty.`,
      tagline: 'Protective & Pure Wholesome Bond! 🛡️',
      hinglish: 'Ek doosre ke liye protective shield jaise khade rehna. Pure loyalty, bina kisi hidden motive ke. Life bhar ka reliable support!',
      tip: 'Tip: Hamesha unki side lena jab duniya khilaaf ho! 🤝',
    },
  };

  const item = map[resultLetter];

  return {
    person1: person1.trim(),
    person2: person2.trim(),
    remainingCount,
    resultLetter,
    resultWord: item.word,
    meaning: item.meaning,
    hinglishTagline: item.tagline,
    hinglishSuggestion: item.hinglish,
    hinglishTip: item.tip,
    steps: {
      name1Letters: p1Arr,
      name2Letters: p2Arr,
      cancelledLetters: cancelled,
      remainingCount,
      eliminationRounds,
    },
    details: {
      age1: extra?.age1,
      age2: extra?.age2,
      bondType: extra?.bondType,
    },
  };
}

/**
 * Friendship Compatibility Calculator with Engaging Hinglish
 */
export function calculateFriendshipScore(
  friend1: string,
  friend2: string,
  extra?: { age1?: string | number; age2?: string | number; friendVibe?: string }
) {
  const clean1 = friend1.trim();
  const clean2 = friend2.trim();

  const hash = getSymmetricHash(clean1, clean2, extra?.friendVibe || '');
  const score = 65 + (hash % 34); // 65% to 98%

  const loyalty = 70 + (Math.abs(hash ^ 0x1234) % 29);
  const banter = 68 + (Math.abs(hash ^ 0x5678) % 31);
  const support = 72 + (Math.abs(hash ^ 0x9abc) % 27);

  let title = 'Unbreakable Besties (Jai-Veeru Jodi)';
  let desc = `${clean1} and ${clean2} possess an exceptional friendship bond marked by effortless banter and fierce loyalty.`;
  let hinglishTagline = 'Jai-Veeru Level Dosti! 🏍️';
  let hinglishSuggestion = 'Tapri wali chai, ghatiya jokes pe hasna aur ek doosre ke saare raaz sambhal ke rakhna—yeh dosti hamesha ke liye hai!';
  let hinglishTip = 'Tip: Apne dost ko yeh result share karke treat maang lo! 😉';

  if (score < 75) {
    title = 'Steadfast Companions';
    desc = `${clean1} and ${clean2} bring different energies to the table, creating a grounded and supportive friendship.`;
    hinglishTagline = 'Chill & Reliable Dosti! ☕';
    hinglishSuggestion = 'Roz roz baat na bhi ho, toh bhi jab milte ho wahi purana comfort rehta hai. Low maintenance, high loyalty!';
    hinglishTip = 'Tip: Aaj hi phone mila ke unka haal-chaal pooch lo!';
  } else if (score < 88) {
    title = 'Dynamic Duo & Crime Partners';
    desc = `Always ready for spontaneous chai runs, deep late-night chats, and mutual support through life’s ups and downs.`;
    hinglishTagline = 'Partner-in-Crime Chemistry! ⚡';
    hinglishSuggestion = 'Spontaneous plans aur shopping trips bina inke adhure hain. Ek dusre ke life ki saari gossip ka live update!';
    hinglishTip = 'Tip: Next weekend ka trip plan finalize karo!';
  }

  return {
    score,
    title,
    desc,
    hinglishTagline,
    hinglishSuggestion,
    hinglishTip,
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
  const digits = dobString.replace(/\D/g, '');
  if (!digits) return 1;

  let sum = digits.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }
  if (sum > 9) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }
  return sum || 1;
}

export function calculateDobCompatibility(
  name1: string,
  dob1: string,
  name2: string,
  dob2: string,
  extra?: { age1?: string | number; age2?: string | number }
) {
  const lp1 = calculateLifePath(dob1);
  const lp2 = calculateLifePath(dob2);

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

  const hinglishTagline = isDirectHarmony
    ? 'Kismat Ka Connection & Life Path Harmony! 🔢✨'
    : 'Balancing Energies – Ek Doosre Ka Sahara! ⚖️';

  const hinglishSuggestion = `Life Path ${lp1} aur Life Path ${lp2} ka combination ek doosre ko balance karta hai. Ek agar thoda overthink karta hai toh doosra situation ko calm aur practical bana deta hai.`;
  const hinglishTip = `Tip: Important decisions mein dono ek doosre ka point of view zaroor suno! 💡`;

  return {
    score: totalScore,
    lp1,
    lp2,
    meaning1: lifePathMeanings[lp1] || 'Dynamic energy',
    meaning2: lifePathMeanings[lp2] || 'Dynamic energy',
    harmonyStatus: isDirectHarmony ? 'Natural Elemental Harmony' : 'Complementary Growth Bond',
    summary: `${name1} (Life Path ${lp1}) and ${name2} (Life Path ${lp2}) exhibit a ${totalScore}% resonance. Their birth numbers reflect balancing traits that foster personal development and shared strength.`,
    hinglishTagline,
    hinglishSuggestion,
    hinglishTip,
    names: { person1: name1, person2: name2 },
  };
}

/**
 * Love vs. Arranged Marriage Alignment Calculator with Hinglish
 */
export function calculateMarriagePreference(
  name1: string,
  name2: string,
  answers: {
    familyPriority: number; // 1 to 5
    socialCircle: number;   // 1 to 5
    adventureStyle: number; // 1 to 5
    communication: number;  // 1 to 5
    age1?: string | number;
    age2?: string | number;
  }
) {
  const hash = getSymmetricHash(name1, name2);
  
  const familyWeight = (answers.familyPriority * 2) + ((hash % 10) / 2);
  const loveWeight = (answers.adventureStyle * 2) + (answers.communication * 2) + ((Math.abs(hash >> 3) % 10) / 2);

  const total = familyWeight + loveWeight;
  const lovePercentage = Math.round((loveWeight / total) * 100);
  const arrangedPercentage = 100 - lovePercentage;

  let outlook = 'Modern Hybrid Alliance (Love with Full Family Blessing)';
  let advice = 'You appreciate romance and organic chemistry while upholding deep respect for family traditions and heritage.';
  let hinglishTagline = 'Dil Aur Parivaar Dono Khush! 🪷';
  let hinglishSuggestion = 'Aap dono ke relationship mein love story bhi hai aur parivaar ke liye gehra samman bhi. Shaadi mein dono sides khushi-khushi shaamil hongi!';
  let hinglishTip = 'Tip: Parents ko shuru se hi apne thoughts mein include karo, sab smooth hoga! 💍';

  if (lovePercentage > 62) {
    outlook = 'Strong Love Marriage Affinity';
    advice = 'Your connection is built on personal courtship, shared mutual goals, and deep one-on-one understanding.';
    hinglishTagline = 'Shuddh Desi Romance – Love Marriage Alert! 🌹';
    hinglishSuggestion = 'Aap dono ki bonding personal understanding aur dosti pe tiki hai. Shaadi khud ki pasand aur mutual consent se hi flourishing hogi!';
    hinglishTip = 'Tip: Apne future goals pe khul ke charcha karo!';
  } else if (arrangedPercentage > 62) {
    outlook = 'Strong Arranged Alliance Affinity';
    advice = 'Shared cultural values, extended family harmony, and grounded marital stability guide your long-term relationship.';
    hinglishTagline = 'Khandaani Rishta & Traditional Sukoon! 🕊️';
    hinglishSuggestion = 'Family values, sanskaar aur long-term stability aap dono ke liye priority hain. Arranged setup mein bhi romance bohot khoobsurat khilta hai.';
    hinglishTip = 'Tip: Shaadi se pehle achhi conversations se ek doosre ki pasand-napasan jaan lo!';
  }

  return {
    lovePercentage,
    arrangedPercentage,
    outlook,
    advice,
    hinglishTagline,
    hinglishSuggestion,
    hinglishTip,
    names: { person1: name1, person2: name2 },
  };
}
