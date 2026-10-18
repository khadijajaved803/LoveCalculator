import { SupportedLocale } from './routes';

export interface TranslationDictionary {
  locale: SupportedLocale;
  langCode: string;
  name: string;
  region: string;
  flag: string;
  nav: {
    loveTest: string;
    flames: string;
    friendship: string;
    marriage: string;
    dobMatch: string;
    guides: string;
    calculateLoveBtn: string;
    language: string;
  };
  common: {
    yourName: string;
    partnerName: string;
    friend1: string;
    friend2: string;
    namePlaceholder1: string;
    namePlaceholder2: string;
    calculateNow: string;
    reset: string;
    shareCard: string;
    downloadCard: string;
    shareWhatsApp: string;
    shareFacebook: string;
    copyLink: string;
    copied: string;
    testedPrivate: string;
    backToHome: string;
    calculating: string;
    viewAllCalculators: string;
    faqTitle: string;
    faqSubtitle: string;
    readMore: string;
    minRead: string;
    lastUpdated: string;
    writtenBy: string;
    popularBadge: string;
    trendingBadge: string;
    classicBadge: string;
    relatedToolsTitle: string;
    relatedArticlesTitle: string;
    certificateTitle: string;
    certificateBadge: string;
  };
  loveCalc: {
    heroTitle: string;
    heroSubtitle: string;
    h1: string;
    primaryKeyword: string;
    inputName1Label: string;
    inputName2Label: string;
    inputAge1Label: string;
    inputAge2Label: string;
    relationshipVibeLabel: string;
    bondTypeLabel: string;
    calculateBtnText: string;
    breakdownTitle: string;
    communication: string;
    emotionalHarmony: string;
    passion: string;
    longevity: string;
    cardBoxTitle: string;
    seoTitle: string;
    seoDesc: string;
  };
  flames: {
    heroTitle: string;
    heroSubtitle: string;
    h1: string;
    calculateBtnText: string;
    letters: {
      F: { word: string; meaning: string; advice: string };
      L: { word: string; meaning: string; advice: string };
      A: { word: string; meaning: string; advice: string };
      M: { word: string; meaning: string; advice: string };
      E: { word: string; meaning: string; advice: string };
      S: { word: string; meaning: string; advice: string };
    };
    seoTitle: string;
    seoDesc: string;
  };
  friendship: {
    heroTitle: string;
    heroSubtitle: string;
    h1: string;
    calculateBtnText: string;
    loyalty: string;
    banter: string;
    support: string;
    seoTitle: string;
    seoDesc: string;
  };
  dob: {
    heroTitle: string;
    heroSubtitle: string;
    h1: string;
    dob1Label: string;
    dob2Label: string;
    calculateBtnText: string;
    lifePathTitle: string;
    harmonyTitle: string;
    seoTitle: string;
    seoDesc: string;
  };
  marriage: {
    heroTitle: string;
    heroSubtitle: string;
    h1: string;
    calculateBtnText: string;
    loveVsArranged: string;
    seoTitle: string;
    seoDesc: string;
  };
  modal: {
    title: string;
    subtitle: string;
    selectLanguage: string;
    currentLanguage: string;
    close: string;
  };
  footer: {
    tagline: string;
    aboutDesc: string;
    popularCalculators: string;
    astrologyNumerology: string;
    legalTrust: string;
    rightsReserved: string;
    languageSelection: string;
    joinCommunity: string;
    matchesGenerated: string;
  };
}

export const TRANSLATIONS: Record<SupportedLocale, TranslationDictionary> = {
  en: {
    locale: 'en',
    langCode: 'en-IN',
    name: 'English (India)',
    region: 'India & Global',
    flag: '🇮🇳',
    nav: {
      loveTest: 'Love Test',
      flames: 'FLAMES Game',
      friendship: 'Friendship',
      marriage: 'Marriage Match',
      dobMatch: 'DOB Match',
      guides: 'Guides',
      calculateLoveBtn: 'Calculate Love',
      language: 'Language',
    },
    common: {
      yourName: 'Your Name',
      partnerName: 'Partner’s Name',
      friend1: 'Friend 1 Name',
      friend2: 'Friend 2 Name',
      namePlaceholder1: 'e.g. Rahul',
      namePlaceholder2: 'e.g. Ananya',
      calculateNow: 'Calculate Compatibility',
      reset: 'Test Another Pair',
      shareCard: 'Share Card',
      downloadCard: 'Download Card (PNG)',
      shareWhatsApp: 'Share on WhatsApp',
      shareFacebook: 'Share on Facebook',
      copyLink: 'Copy Share Link',
      copied: 'Copied to Clipboard!',
      testedPrivate: '100% Private & Free · Tested Locally in Your Browser',
      backToHome: 'Back to Homepage',
      calculating: 'Harmonizing Letters & Energy...',
      viewAllCalculators: 'View All Calculators',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Everything you need to know about compatibility scores and relationship tests',
      readMore: 'Read Full Guide',
      minRead: 'min read',
      lastUpdated: 'Updated',
      writtenBy: 'By',
      popularBadge: 'Popular',
      trendingBadge: 'Trending',
      classicBadge: 'Classic',
      relatedToolsTitle: 'Explore More Compatibility Tools',
      relatedArticlesTitle: 'Relationship Guides & Insights',
      certificateTitle: 'Official Love & Compatibility Certificate',
      certificateBadge: 'HD Certificate Included',
    },
    loveCalc: {
      heroTitle: 'True Love Calculator & Percentage Compatibility',
      heroSubtitle: 'Calculate love score by name with deep 4-pillar compatibility breakdown, romantic chemistry analysis, and custom downloadable certificate cards.',
      h1: 'True Love Calculator by Name & Love Percentage Compatibility Test',
      primaryKeyword: 'love calculator',
      inputName1Label: 'Your First Name',
      inputName2Label: 'Partner / Crush First Name',
      inputAge1Label: 'Your Age',
      inputAge2Label: 'Partner’s Age',
      relationshipVibeLabel: 'Your Couple Vibe',
      bondTypeLabel: 'Current Bond Stage',
      calculateBtnText: 'Calculate Love Percentage',
      breakdownTitle: '4-Pillar Compatibility Breakdown',
      communication: 'Communication Flow',
      emotionalHarmony: 'Emotional Care & Trust',
      passion: 'Romantic Spark & Passion',
      longevity: 'Long-Term Vision',
      cardBoxTitle: '✨ Dil Ki Baat · Relationship Advice',
      seoTitle: 'True Love Calculator by Name & Love Percentage Compatibility Test',
      seoDesc: 'Calculate love score and percentage compatibility by name. Free online true love calculator analyzing communication, emotional harmony, and romantic chemistry with instant shareable cards.',
    },
    flames: {
      heroTitle: 'FLAMES Calculator Game Online',
      heroSubtitle: 'The iconic childhood letter-elimination test for Friends, Lovers, Affectionate, Marriage, Enemies, and Siblings with step-by-step breakdown.',
      h1: 'FLAMES Calculator Online – Test Friends, Lovers, Marriage & Siblings',
      calculateBtnText: 'Play FLAMES Game',
      letters: {
        F: { word: 'Friends', meaning: 'Unbreakable bond of loyalty and shared laughter.', advice: 'A true friendship that stands the test of time.' },
        L: { word: 'Lovers', meaning: 'Irresistible romantic sparks and deep passion.', advice: 'Cherish every moment of your romantic connection.' },
        A: { word: 'Affectionate', meaning: 'Gentle warmth, protection, and unconditional care.', advice: 'Nurture your tenderness with thoughtful gestures.' },
        M: { word: 'Marriage', meaning: 'Destined life partnership and shared family values.', advice: 'Start planning your future goals with confidence.' },
        E: { word: 'Enemies', meaning: 'Playful rivalry and contrasting perspectives.', advice: 'Turn playful friction into entertaining teamwork.' },
        S: { word: 'Siblings', meaning: 'Pure protective loyalty and unconditional support.', advice: 'Always stand by each other in times of need.' },
      },
      seoTitle: 'FLAMES Calculator Online – Play Classic FLAMES Game Free',
      seoDesc: 'Play authentic FLAMES love calculator game online. Remove common letters step-by-step to predict Friendship, Love, Affection, Marriage, Enemies, or Siblings.',
    },
    friendship: {
      heroTitle: 'Friendship & Bestie Compatibility Calculator',
      heroSubtitle: 'Measure your true friendship quotient, secret-keeping loyalty, and mutual humor alignment with your bestie.',
      h1: 'Friendship Calculator – Test Best Friend Loyalty & Bond Online',
      calculateBtnText: 'Check Friendship Score',
      loyalty: 'Unconditional Loyalty',
      banter: 'Humor & Banter',
      support: 'Mutual Support',
      seoTitle: 'Friendship Calculator – Test Best Friend Compatibility & Loyalty',
      seoDesc: 'Free online friendship compatibility calculator. Discover how strong your best friend bond is with loyalty metrics, secret-keeping scores, and custom pact cards.',
    },
    dob: {
      heroTitle: 'Love Calculator by Date of Birth & Life Path',
      heroSubtitle: 'Pythagorean Life Path number compatibility and cosmic birth date numerology alignment.',
      h1: 'Love Calculator by Date of Birth – Life Path Compatibility Test',
      dob1Label: 'Your Date of Birth',
      dob2Label: 'Partner’s Date of Birth',
      calculateBtnText: 'Calculate Birth Compatibility',
      lifePathTitle: 'Life Path Numerology Triad',
      harmonyTitle: 'Cosmic Elemental Harmony',
      seoTitle: 'Love Calculator by Date of Birth – Numerology & Life Path Match',
      seoDesc: 'Calculate relationship compatibility using birth dates. Discover your Pythagorean Life Path numbers and cosmic harmony with our free DOB love calculator.',
    },
    marriage: {
      heroTitle: 'Love vs. Arranged Marriage Alignment Calculator',
      heroSubtitle: 'Explore whether your relationship thrives on personal courtship, family traditions, or a modern harmonious hybrid.',
      h1: 'Love Marriage or Arranged Marriage Calculator – Compatibility Test',
      calculateBtnText: 'Analyze Marriage Affinity',
      loveVsArranged: 'Courtship vs Family Harmony',
      seoTitle: 'Love vs Arranged Marriage Calculator – Relationship Alignment Test',
      seoDesc: 'Discover your love marriage vs arranged marriage affinity. Assess lifestyle independence, family values, and long-term marital alignment.',
    },
    modal: {
      title: 'Select Language / Seleccionar Idioma',
      subtitle: 'Choose your preferred language version of CalculateLove',
      selectLanguage: 'Choose Language',
      currentLanguage: 'Current Active Language',
      close: 'Close',
    },
    footer: {
      tagline: 'Empowering couples, besties, and seekers worldwide with deterministic relationship compatibility tools and shareable certificate cards.',
      aboutDesc: 'CalculateLove provides reliable, entertaining compatibility tests based on phonetic algorithms, Pythagorean numerology, and classic nostalgic relationship games.',
      popularCalculators: 'Popular Calculators',
      astrologyNumerology: 'Astrology & Numerology',
      legalTrust: 'Legal & Trust',
      rightsReserved: 'All rights reserved. For entertainment and inspirational purposes.',
      languageSelection: 'Language / Idioma',
      joinCommunity: 'Join Our Community',
      matchesGenerated: '100K+ Matches & Cards Generated',
    },
  },

  es: {
    locale: 'es',
    langCode: 'es',
    name: 'Español',
    region: 'España y Latinoamérica',
    flag: '🇪🇸',
    nav: {
      loveTest: 'Test de Amor',
      flames: 'Juego FLAMES',
      friendship: 'Amistad',
      marriage: 'Matrimonio',
      dobMatch: 'Por Fecha de Nacimiento',
      guides: 'Guías',
      calculateLoveBtn: 'Calcular Amor',
      language: 'Idioma',
    },
    common: {
      yourName: 'Tu Nombre',
      partnerName: 'Nombre de tu Pareja',
      friend1: 'Nombre del Primer Amigo/a',
      friend2: 'Nombre del Segundo Amigo/a',
      namePlaceholder1: 'ej. Carlos',
      namePlaceholder2: 'ej. Sofía',
      calculateNow: 'Calcular Compatibilidad',
      reset: 'Probar Otra Pareja',
      shareCard: 'Compartir Tarjeta',
      downloadCard: 'Descargar Tarjeta (PNG)',
      shareWhatsApp: 'Compartir en WhatsApp',
      shareFacebook: 'Compartir en Facebook',
      copyLink: 'Copiar Enlace',
      copied: '¡Copiado al Portapapeles!',
      testedPrivate: '100% Privado y Gratuito · Calculado Localmente en tu Navegador',
      backToHome: 'Volver al Inicio',
      calculating: 'Armonizando Nombres y Energía...',
      viewAllCalculators: 'Ver Todas las Calculadoras',
      faqTitle: 'Preguntas Frecuentes',
      faqSubtitle: 'Todo lo que necesitas saber sobre los porcentajes de amor y los tests de compatibilidad',
      readMore: 'Leer Guía Completa',
      minRead: 'min de lectura',
      lastUpdated: 'Actualizado',
      writtenBy: 'Por',
      popularBadge: 'Popular',
      trendingBadge: 'Tendencia',
      classicBadge: 'Clásico',
      relatedToolsTitle: 'Descubre Más Calculadoras de Pareja',
      relatedArticlesTitle: 'Guías y Consejos de Amor',
      certificateTitle: 'Certificado Oficial de Compatibilidad y Amor',
      certificateBadge: 'Certificado HD Incluido',
    },
    loveCalc: {
      heroTitle: 'Calculadora del Amor Verdadera y Compatibilidad de Pareja',
      heroSubtitle: 'Calcula tu porcentaje de amor por nombre con desglose de 4 pilares: comunicación, empatía emocional, pasión y visión a largo plazo.',
      h1: 'Calculadora del Amor por Nombre y Test de Porcentaje de Compatibilidad',
      primaryKeyword: 'calculadora del amor',
      inputName1Label: 'Tu Nombre',
      inputName2Label: 'Nombre de tu Pareja o Crush',
      inputAge1Label: 'Tu Edad',
      inputAge2Label: 'Edad de tu Pareja',
      relationshipVibeLabel: 'Sintonía de la Relación',
      bondTypeLabel: 'Etapa Actual',
      calculateBtnText: 'Calcular Porcentaje de Amor',
      breakdownTitle: 'Desglose de Compatibilidad en 4 Pilares',
      communication: 'Fluidez en la Comunicación',
      emotionalHarmony: 'Cuidado Emocional y Confianza',
      passion: 'Atracción y Pasión Romántica',
      longevity: 'Compromiso a Largo Plazo',
      cardBoxTitle: '✨ Consejo Romántico · Guía de Pareja',
      seoTitle: 'Calculadora del Amor por Nombre – Test de Compatibilidad Gratis',
      seoDesc: 'Calcula tu porcentaje de amor gratis con la calculadora del amor por nombre. Analiza química romántica, armonía emocional y descarga tu certificado de pareja.',
    },
    flames: {
      heroTitle: 'Calculadora FLAMES Online – Juego de Amor Clásico',
      heroSubtitle: 'El legendario juego de eliminación de letras para descubrir: Amigos, Enamorados, Afecto, Matrimonio, Enemigos y Hermanos con explicación paso a paso.',
      h1: 'Calculadora FLAMES Online – Descubre Amigos, Enamorados o Matrimonio',
      calculateBtnText: 'Jugar a FLAMES',
      letters: {
        F: { word: 'Amigos', meaning: 'Una base inquebrantable de lealtad sincera, risas compartidas y complicidad.', advice: 'La verdadera amistad es el tesoro más duradero.' },
        L: { word: 'Enamorados', meaning: 'Chispas magnéticas de pasión irresistible y profunda atracción romántica.', advice: 'Disfrutad intensamente de vuestra conexión amorosa.' },
        A: { word: 'Afecto', meaning: 'Ternura suave, cariño protector y un cuidado sincero y mutuo.', advice: 'Demuestra tu afecto con pequeños detalles diarios.' },
        M: { word: 'Matrimonio', meaning: 'Destino compartido, estabilidad familiar y sintonía en planes de vida.', advice: 'Construid juntos con ilusión vuestro proyecto de futuro.' },
        E: { word: 'Enemigos', meaning: 'Rivalidad divertida o personalidades intensas que generan chispas.', advice: 'Canalizad las diferencias con humor y comprensión mutua.' },
        S: { word: 'Hermanos', meaning: 'Lealtad incondicional, pureza de intenciones y protección fraternal.', advice: 'Un apoyo inquebrantable en cualquier momento de la vida.' },
      },
      seoTitle: 'Calculadora FLAMES en Español – Juego del Amor Gratis',
      seoDesc: 'Juega al clásico juego FLAMES online. Elimina letras repetidas entre vuestros nombres para saber si sois Amigos, Enamorados, Afecto o Matrimonio.',
    },
    friendship: {
      heroTitle: 'Calculadora de Amistad y Nivel de Mejores Amigos',
      heroSubtitle: 'Mide la lealtad, la complicidad para guardar secretos y el sentido del humor compartido con tu mejor amigo o amiga.',
      h1: 'Calculadora de Amistad – Test de Compatibilidad de Mejores Amigos',
      calculateBtnText: 'Calcular Nivel de Amistad',
      loyalty: 'Lealtad Incondicional',
      banter: 'Complicidad y Humor',
      support: 'Apoyo en Momentos Clave',
      seoTitle: 'Calculadora de Amistad Online – Test de Mejores Amigos Gratis',
      seoDesc: 'Calcula la compatibilidad con tu mejor amigo o amiga. Descubre vuestro porcentaje de lealtad, confianza y genera una tarjeta de amistad personalizada.',
    },
    dob: {
      heroTitle: 'Calculadora de Amor por Fecha de Nacimiento y Número de Vida',
      heroSubtitle: 'Descubre la compatibilidad numerológica pitagórica entre vuestras fechas de nacimiento y la armonía de vuestros senderos de vida.',
      h1: 'Calculadora de Amor por Fecha de Nacimiento – Numerología de Pareja',
      dob1Label: 'Tu Fecha de Nacimiento',
      dob2Label: 'Fecha de Nacimiento de tu Pareja',
      calculateBtnText: 'Calcular Compatibilidad Natal',
      lifePathTitle: 'Tríada Numerológica del Sendero de Vida',
      harmonyTitle: 'Sinergia Elemental Cósmica',
      seoTitle: 'Calculadora de Amor por Fecha de Nacimiento – Numerología Gratis',
      seoDesc: 'Descubre tu compatibilidad de pareja según la fecha de nacimiento. Calcula vuestro Sendero de Vida numerológico y afinidad astrológica.',
    },
    marriage: {
      heroTitle: 'Calculadora de Matrimonio y Armonía Conyugal',
      heroSubtitle: 'Evalúa la compatibilidad entre el romance espontáneo y la estabilidad familiar para proyectar un futuro matrimonial sólido.',
      h1: 'Calculadora de Matrimonio – Test de Compatibilidad Matrimonial',
      calculateBtnText: 'Analizar Afinidad Matrimonial',
      loveVsArranged: 'Romance vs Estabilidad Familiar',
      seoTitle: 'Calculadora de Matrimonio – Test de Compatibilidad para Parejas',
      seoDesc: 'Evalúa la compatibilidad a largo plazo de tu relación. Analiza proyectos familiares, valores compartidos y sintonía de vida con nuestra calculadora matrimonial.',
    },
    modal: {
      title: 'Seleccionar Idioma / Select Language',
      subtitle: 'Elige tu versión preferida de CalculateLove',
      selectLanguage: 'Elige un Idioma',
      currentLanguage: 'Idioma Activo',
      close: 'Cerrar',
    },
    footer: {
      tagline: 'Calculadoras deterministas de compatibilidad de pareja, juegos nostálgicos y certificados de amor compartibles para parejas y amigos.',
      aboutDesc: 'CalculateLove ofrece pruebas de compatibilidad fiables y entretenidas basadas en algoritmos fonéticos, numerología pitagórica y juegos clásicos.',
      popularCalculators: 'Calculadoras Populares',
      astrologyNumerology: 'Astrología y Numerología',
      legalTrust: 'Legal y Privacidad',
      rightsReserved: 'Todos los derechos reservados. Diseñado con fines de entretenimiento e inspiración.',
      languageSelection: 'Idioma / Language',
      joinCommunity: 'Únete a Nuestra Comunidad',
      matchesGenerated: '+100K Parejas y Tarjetas Generadas',
    },
  },

  'pt-BR': {
    locale: 'pt-BR',
    langCode: 'pt-BR',
    name: 'Português (Brasil)',
    region: 'Brasil',
    flag: '🇧🇷',
    nav: {
      loveTest: 'Teste do Amor',
      flames: 'Jogo FLAMES',
      friendship: 'Amizade',
      marriage: 'Casamento',
      dobMatch: 'Por Data de Nascimento',
      guides: 'Guias',
      calculateLoveBtn: 'Calcular Amor',
      language: 'Idioma',
    },
    common: {
      yourName: 'Seu Nome',
      partnerName: 'Nome do seu Par',
      friend1: 'Nome do Primeiro Amigo(a)',
      friend2: 'Nome do Segundo Amigo(a)',
      namePlaceholder1: 'ex. Lucas',
      namePlaceholder2: 'ex. Beatriz',
      calculateNow: 'Calcular Compatibilidade',
      reset: 'Testar Outro Casal',
      shareCard: 'Compartilhar Cartão',
      downloadCard: 'Baixar Cartão (PNG)',
      shareWhatsApp: 'Compartilhar no WhatsApp',
      shareFacebook: 'Compartilhar no Facebook',
      copyLink: 'Copiar Link',
      copied: 'Copiado para a Área de Transferência!',
      testedPrivate: '100% Privado e Grátis · Calculado Localmente no seu Navegador',
      backToHome: 'Voltar ao Início',
      calculating: 'Sincronizando Nomes e Energia...',
      viewAllCalculators: 'Ver Todas as Calculadoras',
      faqTitle: 'Perguntas Frequentes',
      faqSubtitle: 'Tudo o que você precisa saber sobre porcentagens de amor e testes de casal',
      readMore: 'Ler Guia Completo',
      minRead: 'min de leitura',
      lastUpdated: 'Atualizado em',
      writtenBy: 'Por',
      popularBadge: 'Popular',
      trendingBadge: 'Em Alta',
      classicBadge: 'Clássico',
      relatedToolsTitle: 'Descubra Mais Calculadoras de Casal',
      relatedArticlesTitle: 'Guias e Dicas de Relacionamento',
      certificateTitle: 'Certificado Oficial de Compatibilidade e Amor',
      certificateBadge: 'Certificado HD Incluso',
    },
    loveCalc: {
      heroTitle: 'Calculadora do Amor Verdadeiro e Porcentagem de Casal',
      heroSubtitle: 'Calcule a pontuação de amor por nome com análise detalhada em 4 pilares: comunicação, carinho emocional, paixão e sintonia a longo prazo.',
      h1: 'Calculadora do Amor por Nome e Teste de Porcentagem de Compatibilidade',
      primaryKeyword: 'calculadora do amor',
      inputName1Label: 'Seu Nome',
      inputName2Label: 'Nome do seu Crush ou Par',
      inputAge1Label: 'Sua Idade',
      inputAge2Label: 'Idade do seu Par',
      relationshipVibeLabel: 'Vibe do Casal',
      bondTypeLabel: 'Fase Atual',
      calculateBtnText: 'Calcular Porcentagem de Amor',
      breakdownTitle: 'Análise de Compatibilidade em 4 Pilares',
      communication: 'Diálogo e Sintonia',
      emotionalHarmony: 'Carinho Emocional e Confiança',
      passion: 'Química e Paixão',
      longevity: 'Planos para o Futuro',
      cardBoxTitle: '✨ Conselho de Amor · Harmonia do Casal',
      seoTitle: 'Calculadora do Amor por Nome – Teste de Compatibilidade Grátis',
      seoDesc: 'Calcule sua porcentagem de amor grátis com a calculadora do amor por nome. Veja química romântica, afinidade emocional e baixe seu certificado de casal.',
    },
    flames: {
      heroTitle: 'Calculadora FLAMES Online – Jogo Clássico do Amor',
      heroSubtitle: 'O teste clássico de eliminação de letras para descobrir: Amigos, Namorados, Afeto, Casamento, Inimigos ou Irmãos com passo a passo.',
      h1: 'Calculadora FLAMES Online – Amigos, Namorados, Casamento ou Inimigos',
      calculateBtnText: 'Jogar FLAMES',
      letters: {
        F: { word: 'Amigos', meaning: 'Uma conexão sincera de amizade verdadeira, risadas e cumplicidade.', advice: 'A amizade sólida é o melhor alicerce para a vida.' },
        L: { word: 'Namorados', meaning: 'Química irresistível, frio na barriga e paixão romântica vibrante.', advice: 'Aproveitem cada instante dessa conexão apaixonada.' },
        A: { word: 'Afeto', meaning: 'Cuidado afetuoso, carinho suave e proteção mútua no dia a dia.', advice: 'Demonstre carinho nos pequenos gestos cotidianos.' },
        M: { word: 'Casamento', meaning: 'Sintonia de vida, planos em comum e futuro a dois com estabilidade.', advice: 'Construam juntos sonhos e projetos com muito diálogo.' },
        E: { word: 'Inimigos', meaning: 'Provocações divertidas e personalidades fortes que faíscam.', advice: 'Usem o bom humor para transformar diferenças em diversão.' },
        S: { word: 'Irmãos', meaning: 'Lealdade pura, proteção fraterna e apoio incondicional para sempre.', advice: 'Estejam sempre presentes para apoiar um ao outro.' },
      },
      seoTitle: 'Calculadora FLAMES Online – Jogo do Amor em Português',
      seoDesc: 'Jogue o clássico jogo FLAMES online grátis. Elimine letras iguais entre seus nomes e descubra se vocês são Amigos, Namorados, Afeto ou Casamento.',
    },
    friendship: {
      heroTitle: 'Calculadora da Amizade e Nível de Melhores Amigos',
      heroSubtitle: 'Descubra a sintonia da sua amizade, o nível de lealdade para guardar segredos e as piadas internas que só vocês entendem.',
      h1: 'Calculadora da Amizade – Teste de Compatibilidade de Melhores Amigos',
      calculateBtnText: 'Calcular Nível de Amizade',
      loyalty: 'Lealdade Incondicional',
      banter: 'Sintonia e Zueira Boa',
      support: 'Apoio em Momentos Difíceis',
      seoTitle: 'Calculadora da Amizade Online – Teste de Melhores Amigos Grátis',
      seoDesc: 'Calcule a afinidade com seu melhor amigo ou amiga. Descubra sua porcentagem de cumplicidade, confiança e gere um cartão de amizade personalizado.',
    },
    dob: {
      heroTitle: 'Calculadora do Amor por Data de Nascimento e Caminho de Vida',
      heroSubtitle: 'Numerologia pitagórica de casal: analise a compatibilidade do Caminho de Vida e a sintonia cósmica pelas datas de nascimento.',
      h1: 'Calculadora do Amor por Data de Nascimento – Numerologia de Casal',
      dob1Label: 'Sua Data de Nascimento',
      dob2Label: 'Data de Nascimento do seu Par',
      calculateBtnText: 'Calcular Compatibilidade Natal',
      lifePathTitle: 'Tríade Numerológica do Caminho de Vida',
      harmonyTitle: 'Harmonia Elemental Cósmica',
      seoTitle: 'Calculadora do Amor por Data de Nascimento – Numerologia Grátis',
      seoDesc: 'Calcule a compatibilidade do casal pela data de nascimento. Descubra os números do Caminho de Vida pitagórico e a harmonia cósmica do seu relacionamento.',
    },
    marriage: {
      heroTitle: 'Calculadora de Casamento e Harmonia a Dois',
      heroSubtitle: 'Avalie a compatibilidade entre o romance e a construção de planos familiares sólidos para um futuro a dois sustentável.',
      h1: 'Calculadora de Casamento – Teste de Compatibilidade para Casais',
      calculateBtnText: 'Analisar Harmonia de Casamento',
      loveVsArranged: 'Romance vs Estabilidade Familiar',
      seoTitle: 'Calculadora de Casamento – Teste de Compatibilidade Conjugal',
      seoDesc: 'Avalie a afinidade de longo prazo da sua relação. Analise projetos de vida, valores em comum e harmonia familiar com nossa calculadora matrimonial.',
    },
    modal: {
      title: 'Selecionar Idioma / Select Language',
      subtitle: 'Escolha a versão de idioma do CalculateLove',
      selectLanguage: 'Escolha um Idioma',
      currentLanguage: 'Idioma Selecionado',
      close: 'Fechar',
    },
    footer: {
      tagline: 'Ferramentas determinísticas de compatibilidade para casais e amigos, jogos nostálgicos e cartões certificados para compartilhar nas redes.',
      aboutDesc: 'O CalculateLove oferece testes de compatibilidade confiáveis e divertidos baseados em algoritmos fonéticos, numerologia pitagórica e jogos clássicos.',
      popularCalculators: 'Calculadoras Populares',
      astrologyNumerology: 'Astrologia e Numerologia',
      legalTrust: 'Legal e Privacidade',
      rightsReserved: 'Todos os direitos reservados. Desenvolvido para fins de entretenimento e inspiração.',
      languageSelection: 'Idioma / Language',
      joinCommunity: 'Participe da Nossa Comunidade',
      matchesGenerated: '+100 Mil Casais e Cartões Gerados',
    },
  },
};

export function getTranslations(locale: SupportedLocale): TranslationDictionary {
  return TRANSLATIONS[locale] || TRANSLATIONS.en;
}
