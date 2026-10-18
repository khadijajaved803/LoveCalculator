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

export type SupportedLocale = 'en' | 'es' | 'pt-BR';

/**
 * Deterministic Love & Compatibility Calculation with Engaging Details & Hinglish Suggestions
 */
export function calculateLoveScore(
  person1: string,
  person2: string,
  mode: 'general' | 'name' | 'percentage' | 'soulmate' = 'general',
  extra?: OptionalEngagementInputs,
  locale: SupportedLocale = 'en'
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

  if (locale === 'es') {
    if (score >= 90) {
      grade = 'Resonancia Excepcional';
      verdict = mode === 'soulmate' ? 'Conexión de Almas Gemelas' : 'Pareja Destinada';
      summary = `Una compatibilidad extraordinaria del ${score}%. La química entre ${clean1} y ${clean2} refleja valores fundamentales compartidos, complicidad natural y gran seguridad emocional.`;
      advice = 'Celebrad vuestro sentido del humor y el respeto mutuo. Proteged este vínculo tan especial.';
      hinglishTagline = '¡Almas Gemelas y Química Magnética! 💖';
      hinglishSuggestion = `¡Vuestra sintonía es asombrosa! Entenderos con solo una mirada y compartir risas sinceras es un regalo poco común.`;
      hinglishTip = `Consejo: Sorprende a tu pareja con un detalle inesperado o una escapada romántica. 🍕`;
    } else if (score >= 78) {
      grade = 'Gran Armonía';
      verdict = 'Conexión Profunda y Paz';
      summary = `Un sólido ${score}% de compatibilidad indica un excelente potencial para una relación duradera, risas compartidas y bienestar afectivo.`;
      advice = 'Expresad gratitud con frecuencia y mostrad curiosidad constante por los sueños de cada uno.';
      hinglishTagline = '¡Total Complicidad y Conexión de Corazón! 🌸';
      hinglishSuggestion = `La confianza y el respeto son los pilares más fuertes de vuestra relación. Pasar tiempo juntos al final del día renueva vuestras energías.`;
      hinglishTip = `Consejo: Apoya sus metas personales; ver crecer al otro fortalecerá vuestra unión. 🚗`;
    } else if (score >= 65) {
      grade = 'Dinámica Prometedora';
      verdict = 'Química Chispeante';
      summary = `Con un ${score}% de afinidad, ${clean1} y ${clean2} aportan cualidades complementarias donde las diferencias enriquecen y dinamizan la relación.`;
      advice = 'La paciencia y la escucha atenta transformarán pequeños desacuerdos en grandes fortalezas compartidas.';
      hinglishTagline = 'Los Opuestos se Atraen – ¡Mucha Pasión! 🌶️';
      hinglishSuggestion = `Podéis tener puntos de vista diferentes, ¡y justo ahí reside la emoción! Uno aporta orden y el otro aventura espontánea.`;
      hinglishTip = `Consejo: Cambiad las discusiones por humor juguetón; el cariño siempre triunfa. 😉`;
    } else {
      grade = 'Exploración Dinámica';
      verdict = 'Vínculo en Crecimiento';
      summary = `${clean1} y ${clean2} poseen personalidades únicas y enriquecedoras (${score}%). Esto ofrece una maravillosa oportunidad para descubrirse mutuamente día a día.`;
      advice = 'Buscad actividades y aficiones comunes que os permitan disfrutar de momentos distendidos y conversaciones sinceras.';
      hinglishTagline = 'Paso a Paso Hacia un Amor Duradero 🌱';
      hinglishSuggestion = `Las mejores conexiones requieren tiempo para florecer. Un poco de paciencia y diálogo abierto revelarán lo mejor de ambos.`;
      hinglishTip = `Consejo: Encontrad un pasatiempo que os apasione a los dos, como escuchar música o cocinar juntos. 🎧`;
    }
  } else if (locale === 'pt-BR') {
    if (score >= 90) {
      grade = 'Ressonância Excepcional';
      verdict = mode === 'soulmate' ? 'Conexão de Almas Gêmeas' : 'Feitos Um Para o Outro';
      summary = `Uma pontuação rara e deeply alinhada de ${score}%. A química entre ${clean1} e ${clean2} revela valores essenciais compartilhados, aconchego natural e segurança emocional.`;
      advice = 'Celebrem o bom humor e o respeito mútuo. Valorizem e cuidem com carinho dessa linda sintonia.';
      hinglishTagline = 'Conexão de Almas Gêmeas & Química Perfeita! 💖';
      hinglishSuggestion = `A sintonia de vocês é impressionante! Entender o que o outro sente só no olhar e rir das mesmas bobeiras é algo raro e precioso.`;
      hinglishTip = `Dica: Um carinho inesperado ou um convite para o lugar favorito do seu par vai render sorrisos sinceros! 🍕`;
    } else if (score >= 78) {
      grade = 'Forte Harmonia';
      verdict = 'Conexão Profunda & Paz';
      summary = `Uma sólida compatibilidade de ${score}% indica grande potencial para cumplicidade duradoura, risadas sinceras e segurança emocional.`;
      advice = 'Demonstrem gratidão todos os dias e apoiem com entusiasmo os sonhos e conquistas do outro.';
      hinglishTagline = 'Muita Cumplicidade & Sintonia de Coração! 🌸';
      hinglishSuggestion = `A confiança e o respeito mútuo são a base desse relacionamento. Curtir uma noite tranquila juntos alivia qualquer cansaço do dia a dia.`;
      hinglishTip = `Dica: Incentive os pequenos projetos do seu par; crescer lado a lado une ainda mais o casal! 🚗`;
    } else if (score >= 65) {
      grade = 'Dinâmica Promissora';
      verdict = 'Química Animada';
      summary = `Com ${score}% de afinidade, ${clean1} e ${clean2} possuem qualidades complementares onde personalidades marcantes mantêm a chama acesa.`;
      advice = 'A paciência e a escuta generosa transformarão diferenças em forças que enriquecem o relacionamento.';
      hinglishTagline = 'Os Opostos se Atraem – Paixão e Sintonia! 🌶️';
      hinglishSuggestion = `Vocês podem ter visões diferentes, e é isso que traz emoção! Enquanto um planeja com cuidado, o outro traz espontaneidade e alegria.`;
      hinglishTip = `Dica: Troque discussões bobas por um abraço apertado e uma risada; o afeto resolve tudo. 😉`;
    } else {
      grade = 'Exploração Dinâmica';
      verdict = 'Laço em Construção';
      summary = `${clean1} e ${clean2} trazem bagagens e perspectivas individuais distintas (${score}%). Isso abre espaço para aprendizado mútuo e ótimas descobertas.`;
      advice = 'Dediquem tempo para encontrar hobbies em comum e exercitar conversas sinceras e descomplicadas.';
      hinglishTagline = 'Construindo o Amor Passo a Passo 🌱';
      hinglishSuggestion = `Tudo o que é bom leva tempo para amadurecer! Uma boa dose de diálogo e carinho fará essa aproximação ficar ainda mais gostosa.`;
      hinglishTip = `Dica: Compartilhem músicas favoritas e façam passeios relaxantes juntos para se conhecerem melhor. 🎧`;
    }
  } else {
    // en-IN default Hinglish
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
  extra?: { age1?: string | number; age2?: string | number; bondType?: string },
  locale: SupportedLocale = 'en'
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
  
  const mapEn: Record<FlamesResult['resultLetter'], {
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

  const mapEs: Record<FlamesResult['resultLetter'], {
    word: string;
    meaning: string;
    tagline: string;
    hinglish: string;
    tip: string;
  }> = {
    F: {
      word: 'Amigos',
      meaning: `${person1} y ${person2} comparten una base sólida de amistad sincera, risas cómplices y lealtad incondicional.`,
      tagline: '¡Amistad Verdadera e Inquebrantable! 🤝',
      hinglish: 'Una complicidad tan genuina que podéis contar el uno con el otro a cualquier hora sin filtros ni condiciones.',
      tip: 'Consejo: Celebrad vuestra amistad compartiendo un café y recordando anécdotas inolvidables.',
    },
    L: {
      word: 'Enamorados',
      meaning: `¡Chispas de pasión y magnetismo romántico! Entre ${person1} y ${person2} existe una intensa atracción y química de pareja.`,
      tagline: '¡Amor Apasionado y Mariposas en el Estómago! 💘',
      hinglish: 'Miradas cómplices y una química romántica innegable. La ilusión de escribirse y estar juntos se siente en cada momento.',
      tip: 'Consejo: Una nota sincera o un detalle espontáneo derretirán su corazón.',
    },
    A: {
      word: 'Afecto',
      meaning: `Ternura profunda, cariño protector y empatía natural. Os cuidáis mutuamente de forma espontánea y desinteresada.`,
      tagline: '¡Cariño Genuino, Paz y Ternura! 🌸',
      hinglish: 'Un afecto tan natural y cálido como el de un hogar. Preguntarse cómo ha ido el día es vuestro lenguaje del amor.',
      tip: 'Consejo: Cuidaros mutuamente con pequeños gestos diarios mantiene viva la llama.',
    },
    M: {
      word: 'Matrimonio',
      meaning: `¡Destino compartido y estabilidad a largo plazo! Gran potencial conyugal, metas comunes y sintonía familiar.`,
      tagline: '¡Campanas de Boda y Futuro Compartido! 💍',
      hinglish: 'Una visión de vida armoniosa y valores compartidos. Tenéis todas las claves para construir un futuro sólido y feliz.',
      tip: 'Consejo: Hablad con ilusión y franqueza sobre vuestros proyectos y sueños a largo plazo.',
    },
    E: {
      word: 'Enemigos (Rivalidad Jugetona)',
      meaning: `¡Rivalidad chispeante y personalidades apasionadas! Dos caracteres fuertes con mucho ingenio y ganas de desafiarse.`,
      tagline: '¡Pique Divertido y Chispas de Contraste! ⚡',
      hinglish: 'No podéis evitar picaros con bromas, ¡pero tampoco pasar un día sin saber del otro! Una relación viva y entretenida.',
      tip: 'Consejo: Ante cualquier pequeño desacuerdo, sonreíd y resolvedlo compartiendo un buen postre.',
    },
    S: {
      word: 'Hermanos (Fraternidad)',
      meaning: `Un lazo protector e incondicional fundamentado en la lealtad absoluta y el apoyo mutuo permanente.`,
      tagline: '¡Vínculo Fraternal Puro y Protector! 🛡️',
      hinglish: 'Estar ahí como un escudo protector para el otro pase lo que pase. Lealtad incondicional para toda la vida.',
      tip: 'Consejo: Apoyad siempre al otro ante las dificultades del mundo exterior.',
    },
  };

  const mapPt: Record<FlamesResult['resultLetter'], {
    word: string;
    meaning: string;
    tagline: string;
    hinglish: string;
    tip: string;
  }> = {
    F: {
      word: 'Amigos',
      meaning: `${person1} e ${person2} compartilham uma conexão genuína de amizade verdadeira, risadas sem fim e lealdade sincera.`,
      tagline: 'Amizade Verdadeira Para a Vida Toda! 🤝',
      hinglish: 'Uma sintonia tão pura que vocês podem mandar mensagem em qualquer momento sem cerimônia nem filtros.',
      tip: 'Dica: Convide seu amigo para tomar um lanche e relembrar as histórias mais engraçadas de vocês.',
    },
    L: {
      word: 'Namorados',
      meaning: `Química magnética e frio na barriga! Existe uma atração romântica intensa e vibrante entre ${person1} e ${person2}.`,
      tagline: 'Química Irresistível & Paixão no Ar! 💘',
      hinglish: 'Olhares que falam por si e uma vontade enorme de estar perto. O romance de vocês tem tudo para brilhar intensamente.',
      tip: 'Dica: Uma mensagem carinhosa ou uma surpresa fofa vai deixar o dia do seu crush inesquecível.',
    },
    A: {
      word: 'Afeto',
      meaning: `Carinho doce, cuidado protetor e ternura genuína. Vocês cuidam um do outro com muita sensibilidade e afeto.`,
      tagline: 'Carinho Doce, Cuidado & Paz! 🌸',
      hinglish: 'Cuidar um do outro vem de dentro, de forma natural. Perguntar se chegou bem e demonstrar carinho é o seu jeito de amar.',
      tip: 'Dica: Continue demonstrando carinho nos pequenos detalhes do dia a dia.',
    },
    M: {
      word: 'Casamento',
      meaning: `Sintonia de vida e futuro a dois! Indica alto potencial matrimonial, sonhos alinhados e estabilidade para o futuro.`,
      tagline: 'Sintonia de Vida & Planos a Dois! 💍',
      hinglish: 'Valores compatíveis e planos que se encaixam com perfeição. Vocês têm a base ideal para construir um lar cheio de amor.',
      tip: 'Dica: Conversem com entusiasmo e cumplicidade sobre os sonhos e projetos que querem realizar juntos.',
    },
    E: {
      word: 'Inimigos (Provocações Fofas)',
      meaning: `Duas personalidades fortes e cheias de atitude que adoram se provocar com bom humor e energia contagiante.`,
      tagline: 'Provocações Divertidas & Muita Faísca! ⚡',
      hinglish: 'Não conseguem ficar sem implicar um com o outro, mas também não aguentam passar um dia sem conversar! Uma dinâmica cheia de vida.',
      tip: 'Dica: Em momentos de teimosia, faça uma piada leve e convide para um sorvete.',
    },
    S: {
      word: 'Irmãos (Fraternidade)',
      meaning: `Um laço protetor e fraternal construído com base em lealdade inabalável e carinho sincero.`,
      tagline: 'Vínculo Protetor & Amizade de Irmãos! 🛡️',
      hinglish: 'Defender um ao outro com unhas e dentes. Companheirismo leal e verdadeiro para qualquer hora da vida.',
      tip: 'Dica: Mostre sempre que o outro pode contar com você em qualquer circunstância.',
    },
  };

  const map = locale === 'es' ? mapEs : locale === 'pt-BR' ? mapPt : mapEn;
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
 * Friendship Compatibility Calculator with Engaging Localization
 */
export function calculateFriendshipScore(
  friend1: string,
  friend2: string,
  extra?: { age1?: string | number; age2?: string | number; friendVibe?: string },
  locale: SupportedLocale = 'en'
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

  if (locale === 'es') {
    if (score < 75) {
      title = 'Compañeros Leales y Constantes';
      desc = `${clean1} y ${clean2} aportan energías diferentes pero complementarias, creando una amistad sólida y de apoyo mutuo.`;
      hinglishTagline = '¡Amistad Tranquila y de Plena Confianza! ☕';
      hinglishSuggestion = 'Aunque pasen semanas sin hablar, cuando os reencontráis la complicidad y el afecto siguen intactos. Cero complicaciones, máxima lealtad.';
      hinglishTip = 'Consejo: Llama hoy mismo a tu amigo/a para ver cómo le va.';
    } else if (score < 88) {
      title = 'Dúo Dinámico y Cómplices de Aventuras';
      desc = `Siempre listos para planes espontáneos, confidencias nocturnas y apoyo incondicional en los altibajos de la vida.`;
      hinglishTagline = '¡Cómplices Inseparables y Mucha Energía! ⚡';
      hinglishSuggestion = 'Las escapadas y las risas no son lo mismo sin vosotros dos juntos. Compartís todas las novedades de la vida al instante.';
      hinglishTip = 'Consejo: ¡Es hora de organizar una salida o viaje este fin de semana!';
    } else {
      title = 'Mejores Amigos Inseparables';
      desc = `${clean1} y ${clean2} tienen una amistad extraordinaria caracterizada por un sentido del humor compartido y lealtad a prueba de fuego.`;
      hinglishTagline = '¡Amigos de Por Vida y Lealtad Total! 🏍️';
      hinglishSuggestion = 'Bromas que solo vosotros entendéis, secretos a buen recaudo y confianza ciega: esta amistad está hecha para durar siempre.';
      hinglishTip = 'Consejo: Comparte este resultado con tu amigo/a y celebradlo juntos.';
    }
  } else if (locale === 'pt-BR') {
    if (score < 75) {
      title = 'Companheiros Leais e Confiáveis';
      desc = `${clean1} e ${clean2} trazem personalidades diferentes para a mesa, gerando uma amizade madura, calma e acolhedora.`;
      hinglishTagline = 'Amizade Tranquila & Lealdade Genuína! ☕';
      hinglishSuggestion = 'Mesmo que fiquem dias sem se falar, quando se encontram o papo flui como se nunca tivessem se distanciado. Pouca cobrança, muita lealdade!';
      hinglishTip = 'Dica: Mande uma mensagem hoje mesmo perguntando como seu amigo está.';
    } else if (score < 88) {
      title = 'Dupla Dinâmica & Parceiros de Confiança';
      desc = `Sempre prontos para passeios espontâneos, conversas sinceras de madrugada e apoio mútuo em todas as fases da vida.`;
      hinglishTagline = 'Parceria Fechada & Muita Sintonia! ⚡';
      hinglishSuggestion = 'Passeios e zoeiras não têm graça sem vocês dois juntos. Toda novidade boa é compartilhada em primeira mão!';
      hinglishTip = 'Dica: Que tal marcar aquele lanche no fim de semana para colocar os papos em dia?';
    } else {
      title = 'Melhores Amigos Inseparáveis';
      desc = `${clean1} e ${clean2} possuem uma amizade incrível marcada por zoeira saudável, piadas internas e lealdade blindada.`;
      hinglishTagline = 'Amizade Blindada Para Toda a Vida! 🏍️';
      hinglishSuggestion = 'Segredos guardados a sete chaves, risadas de chorar e certeza de apoio em qualquer aperto. Essa amizade é rara e especial!';
      hinglishTip = 'Dica: Compartilhe o resultado com seu parça e comemore essa amizade nota 10!';
    }
  } else {
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
  extraOrLocale?: { age1?: string | number; age2?: string | number } | SupportedLocale,
  localeParam: SupportedLocale = 'en'
) {
  const locale: SupportedLocale = typeof extraOrLocale === 'string' ? extraOrLocale : localeParam;
  const extra = typeof extraOrLocale === 'object' && extraOrLocale !== null ? extraOrLocale : undefined;
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

  const lifePathMeaningsEn: Record<number, string> = {
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

  const lifePathMeaningsEs: Record<number, string> = {
    1: 'El Líder (Independiente, decidido y con iniciativa)',
    2: 'El Pacificador (Empático, diplomático y cariñoso)',
    3: 'El Creativo (Expresivo, alegre y espontáneo)',
    4: 'El Constructor (Disciplinado, leal y práctico)',
    5: 'El Aventurero (Espíritu libre, dinámico e innovador)',
    6: 'El Protector (Responsable, afectuoso y familiar)',
    7: 'El Pensador (Analítico, reflexivo e intuitivo)',
    8: 'El Triunfador (Determinado, visionario y perseverante)',
    9: 'El Humanitario (Generoso, sabio y compasivo)',
  };

  const lifePathMeaningsPt: Record<number, string> = {
    1: 'O Líder (Independente, determinado e proativo)',
    2: 'O Pacificador (Empático, carinhoso e diplomático)',
    3: 'O Criativo (Expressivo, alegre e espontâneo)',
    4: 'O Construtor (Disciplinado, leal e focado)',
    5: 'O Aventureiro (Espírito livre, dinâmico e flexível)',
    6: 'O Acolhedor (Carinhoso, protetor e familiar)',
    7: 'O Pensador (Intuitivo, analítico e profundo)',
    8: 'O Realizador (Determinado, ambicioso e visionário)',
    9: 'O Humanitário (Generoso, sábio e compreensivo)',
  };

  const lifePathMeanings = locale === 'es' ? lifePathMeaningsEs : locale === 'pt-BR' ? lifePathMeaningsPt : lifePathMeaningsEn;

  let harmonyStatus = isDirectHarmony ? 'Natural Elemental Harmony' : 'Complementary Growth Bond';
  let summary = `${name1} (Life Path ${lp1}) and ${name2} (Life Path ${lp2}) exhibit a ${totalScore}% resonance. Their birth numbers reflect balancing traits that foster personal development and shared strength.`;
  let hinglishTagline = isDirectHarmony
    ? 'Kismat Ka Connection & Life Path Harmony! 🔢✨'
    : 'Balancing Energies – Ek Doosre Ka Sahara! ⚖️';
  let hinglishSuggestion = `Life Path ${lp1} aur Life Path ${lp2} ka combination ek doosre ko balance karta hai. Ek agar thoda overthink karta hai toh doosra situation ko calm aur practical bana deta hai.`;
  let hinglishTip = `Tip: Important decisions mein dono ek doosre ka point of view zaroor suno! 💡`;

  if (locale === 'es') {
    harmonyStatus = isDirectHarmony ? 'Armonía Elemental Natural' : 'Vínculo de Crecimiento Complementario';
    summary = `${name1} (Sendero de Vida ${lp1}) y ${name2} (Sendero de Vida ${lp2}) presentan una resonancia del ${totalScore}%. Vuestros números natales reflejan energías que equilibran la relación y potencian el crecimiento mutuo.`;
    hinglishTagline = isDirectHarmony
      ? '¡Conexión del Destino y Armonía Natal! 🔢✨'
      : '¡Energías que se Equilibran con Amor! ⚖️';
    hinglishSuggestion = `La combinación del Sendero ${lp1} y el Sendero ${lp2} genera un balance armonioso: cuando uno reflexiona con calma, el otro aporta el impulso y la determinación necesaria.`;
    hinglishTip = `Consejo: Escuchad siempre el punto de vista del otro antes de tomar decisiones importantes. 💡`;
  } else if (locale === 'pt-BR') {
    harmonyStatus = isDirectHarmony ? 'Harmonia Elemental Natural' : 'Laço de Crescimento Complementar';
    summary = `${name1} (Caminho de Vida ${lp1}) e ${name2} (Caminho de Vida ${lp2}) revelam uma sintonia cósmica de ${totalScore}%. Seus números de nascimento equilibram a convivência e enriquecem a jornada a dois.`;
    hinglishTagline = isDirectHarmony
      ? 'Sintonia Cósmica & Caminhos Alinhados! 🔢✨'
      : 'Energias que se Complementam com Amor! ⚖️';
    hinglishSuggestion = `A combinação do Caminho ${lp1} com o Caminho ${lp2} traz equilíbrio: um ajuda a trazer estabilidade e clareza, enquanto o outro traz ânimo e alegria para a relação.`;
    hinglishTip = `Dica: Valorizem a opinião do outro ao planejar os próximos passos da vida a dois. 💡`;
  }

  return {
    score: totalScore,
    lp1,
    lp2,
    meaning1: lifePathMeanings[lp1] || 'Dynamic energy',
    meaning2: lifePathMeanings[lp2] || 'Dynamic energy',
    harmonyStatus,
    summary,
    hinglishTagline,
    hinglishSuggestion,
    hinglishTip,
    names: { person1: name1, person2: name2 },
  };
}

/**
 * Love vs. Arranged Marriage Alignment Calculator with Localization
 */
export function calculateMarriagePreference(
  name1: string,
  name2: string,
  answers: {
    familyPriority?: number; // 1 to 5
    socialCircle?: number;   // 1 to 5
    adventureStyle?: number; // 1 to 5
    communication?: number;  // 1 to 5
    age1?: string | number;
    age2?: string | number;
  } = {},
  locale: SupportedLocale = 'en'
) {
  const hash = getSymmetricHash(name1, name2);
  const famPri = typeof answers.familyPriority === 'number' ? answers.familyPriority : 3;
  const advStyle = typeof answers.adventureStyle === 'number' ? answers.adventureStyle : 3;
  const comm = typeof answers.communication === 'number' ? answers.communication : 4;
  
  const familyWeight = (famPri * 2) + ((hash % 10) / 2);
  const loveWeight = (advStyle * 2) + (comm * 2) + ((Math.abs(hash >> 3) % 10) / 2);

  const total = familyWeight + loveWeight;
  const lovePercentage = Math.round((loveWeight / total) * 100);
  const arrangedPercentage = 100 - lovePercentage;

  let outlook = 'Modern Hybrid Alliance (Love with Full Family Blessing)';
  let advice = 'You appreciate romance and organic chemistry while upholding deep respect for family traditions and heritage.';
  let hinglishTagline = 'Dil Aur Parivaar Dono Khush! 🪷';
  let hinglishSuggestion = 'Aap dono ke relationship mein love story bhi hai aur parivaar ke liye gehra samman bhi. Shaadi mein dono sides khushi-khushi shaamil hongi!';
  let hinglishTip = 'Tip: Parents ko shuru se hi apne thoughts mein include karo, sab smooth hoga! 💍';

  if (locale === 'es') {
    outlook = 'Alianza Armoniosa (Romance con Respaldo Familiar)';
    advice = 'Valoráis tanto la química romántica como la integración respetuosa en el entorno familiar.';
    hinglishTagline = '¡Amor Verdadero y Bendición Familiar! 🪷';
    hinglishSuggestion = 'Vuestra relación combina la chispa del enamoramiento con un profundo aprecio por las raíces familiares. Construís con madurez y cariño.';
    hinglishTip = 'Consejo: Compartid con naturalidad vuestros sueños con la familia para afianzar la unión. 💍';

    if (lovePercentage > 62) {
      outlook = 'Fuerte Afinidad de Matrimonio por Amor Espontáneo';
      advice = 'Vuestra conexión se basa en el noviazgo personal, la complicidad íntima y metas individuales compartidas.';
      hinglishTagline = '¡Romance Auténtico y Decisión de Corazón! 🌹';
      hinglishSuggestion = 'La complicidad entre ambos es la guía principal. La unión florecerá basada en la elección mutua y el amor sincero.';
      hinglishTip = 'Consejo: Conversad con ilusión sobre vuestro plan de vida independiente.';
    } else if (arrangedPercentage > 62) {
      outlook = 'Fuerte Afinidad de Matrimonio con Valores Familiares';
      advice = 'La estabilidad a largo plazo, el arraigo cultural y la armonía del hogar son vuestros pilares fundamentales.';
      hinglishTagline = '¡Tradición, Estabilidad y Respeto Mutuo! 🕊️';
      hinglishSuggestion = 'Los valores sólidos y la tranquilidad familiar os brindan una base formidable para construir una vida próspera y en paz.';
      hinglishTip = 'Consejo: Conoceros en profundidad y cultivar detalles cotidianos mantendrá viva la chispa.';
    }
  } else if (locale === 'pt-BR') {
    outlook = 'União Equilibrada (Romance com Apoio da Família)';
    advice = 'Vocês valorizam o carinho a dois e a boa convivência com a família de ambos.';
    hinglishTagline = 'Amor de Verdade & Família Feliz! 🪷';
    hinglishSuggestion = 'O relacionamento de vocês combina romantismo sincero com grande respeito pelos laços familiares. Vocês constroem o futuro com muita sensibilidade.';
    hinglishTip = 'Dica: Manter o diálogo transparente com quem ama vocês fortalece os laços do casal. 💍';

    if (lovePercentage > 62) {
      outlook = 'Forte Sintonia de Casamento por Amor Espontâneo';
      advice = 'A relação de vocês foi construída na cumplicidade a dois, no namoro sincero e nos sonhos compartilhados.';
      hinglishTagline = 'Romance Intenso & Escolha do Coração! 🌹';
      hinglishSuggestion = 'A química e a parceria de vocês são a maior força da relação. A vida a dois floresce com muita leveza e carinho mútuo.';
      hinglishTip = 'Dica: Conversem com frequência sobre os projetos que querem realizar a dois.';
    } else if (arrangedPercentage > 62) {
      outlook = 'Forte Afinidade com Base em Valores e Família';
      advice = 'Estabilidade para o futuro, respeito mútuo e harmonia familiar são as grandes prioridades da relação.';
      hinglishTagline = 'Base Sólida, Estabilidade & Paz! 🕊️';
      hinglishSuggestion = 'Valores alinhados e maturidade trazem segurança para o casal. Construir um lar acolhedor é o maior desejo de vocês.';
      hinglishTip = 'Dica: Invistam em momentos a dois para manter o romance sempre aquecido.';
    }
  } else {
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
