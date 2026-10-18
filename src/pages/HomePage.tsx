import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { calculateLoveScore } from '../lib/calculatorEngine';
import { ResultCard } from '../components/ResultCard';
import { CalculationLoader } from '../components/CalculationLoader';
import { BLOG_POSTS } from '../data/blogData';
import {
  Heart,
  Flame,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Gem,
  CheckCircle2,
  ChevronDown,
  Calendar,
  Award,
  Hash,
  Lock,
  MessageCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';
import loveCertificateImage from '../assets/images/love_certificate_showcase_1792223212819.jpg';
import heroRomanticImage from '../assets/images/hero_romantic_connection_1790774199412.jpg';
import { SupportedLocale, getEquivalentPath } from '../i18n/routes';
import { getTranslations } from '../i18n/translations';

interface Props {
  onNavigate: (path: string) => void;
  locale?: SupportedLocale;
}

export const HomePage: React.FC<Props> = ({ onNavigate, locale = 'en' }) => {
  const [quickName1, setQuickName1] = useState('');
  const [quickName2, setQuickName2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [bondType, setBondType] = useState('Dating');
  const [vibe, setVibe] = useState('Chai & Late Night Talks');

  const [quickResult, setQuickResult] = useState<ReturnType<typeof calculateLoveScore> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [quickError, setQuickError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const t = getTranslations(locale);
  const canonicalPath = getEquivalentPath('/', locale);

  const handleQuickCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName1.trim() || !quickName2.trim()) {
      setQuickError(
        locale === 'es'
          ? 'Por favor, ingresa tu nombre y el de tu pareja'
          : locale === 'pt-BR'
          ? 'Por favor, digite seu nome e o nome do seu par'
          : 'Please enter both your name and your partner’s name'
      );
      return;
    }
    setQuickError('');
    setIsCalculating(true);
  };

  const loveToolPath = getEquivalentPath('/love-calculator/', locale);
  const flamesToolPath = getEquivalentPath('/flames-calculator/', locale);
  const friendToolPath = getEquivalentPath('/friendship-calculator/', locale);
  const marriageToolPath = getEquivalentPath('/love-or-arranged-marriage-calculator/', locale);
  const dobToolPath = getEquivalentPath('/love-calculator-by-date-of-birth/', locale);
  const astroToolPath = getEquivalentPath('/astrology/', locale);
  const numToolPath = getEquivalentPath('/numerology/', locale);
  const blogIndexPath = getEquivalentPath('/blog/', locale);

  const secondaryTools = [
    {
      title: locale === 'es' ? 'Calculadora del Amor' : locale === 'pt-BR' ? 'Calculadora do Amor' : 'Master Love Calculator',
      sub: locale === 'es' ? 'Test por Nombres' : locale === 'pt-BR' ? 'Teste por Nomes' : 'Naam Se Love Match',
      path: loveToolPath,
      desc:
        locale === 'es'
          ? 'Descubre la química romántica, vibración acústica y 4 pilares de compatibilidad.'
          : locale === 'pt-BR'
          ? 'Descubra a química romântica, equilíbrio de letras e análise completa de casal.'
          : 'Test sound harmony, letter frequency, and romantic vibrations with our core Love Calculator.',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      title: locale === 'es' ? 'Juego FLAMES Online' : locale === 'pt-BR' ? 'Jogo FLAMES Online' : 'FLAMES Game Online',
      sub: locale === 'es' ? 'Clásico del Cuaderno' : locale === 'pt-BR' ? 'Clássico dos Tempos de Escola' : 'School & College Classic',
      path: flamesToolPath,
      desc:
        locale === 'es'
          ? 'Elimina letras comunes para saber si sois Amigos, Enamorados, Afecto o Matrimonio.'
          : locale === 'pt-BR'
          ? 'Elimine letras repetidas e descubra se vocês são Amigos, Namorados ou Casamento.'
          : 'Play authentic letter-cancellation for Friends, Lovers, Marriage & more.',
      icon: Flame,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: locale === 'es' ? 'Calculadora de Amistad' : locale === 'pt-BR' ? 'Calculadora da Amizade' : 'Friendship & Bestie Meter',
      sub: locale === 'es' ? 'Nivel de Mejores Amigos' : locale === 'pt-BR' ? 'Termômetro da Amizade' : 'Dosti & Bestie Test',
      path: friendToolPath,
      desc:
        locale === 'es'
          ? 'Mide la lealtad incondicional, complicidad de risas y confianza para guardar secretos.'
          : locale === 'pt-BR'
          ? 'Avalie a lealdade, a cumplicidade e as risadas compartilhadas com seu melhor amigo.'
          : 'Check best-friend loyalty, secret-keeping quotient, and mutual support.',
      icon: Users,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: locale === 'es' ? 'Calculadora de Matrimonio' : locale === 'pt-BR' ? 'Calculadora de Casamento' : 'Love vs. Arranged Marriage',
      sub: locale === 'es' ? 'Armonía y Futuro' : locale === 'pt-BR' ? 'Planos e Futuro a Dois' : 'Shaadi Ki Sambhavna',
      path: marriageToolPath,
      desc:
        locale === 'es'
          ? 'Evalúa el balance entre romance personal y estabilidad para un proyecto conyugal sólido.'
          : locale === 'pt-BR'
          ? 'Analise a sintonia entre paixão espontânea e valores familiares para o futuro a dois.'
          : 'Balancing modern personal courtship with traditional family blessing using our marriage Love Calculator.',
      icon: Gem,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      title: locale === 'es' ? 'Por Fecha de Nacimiento' : locale === 'pt-BR' ? 'Por Data de Nascimento' : 'Date of Birth Love Calculator',
      sub: locale === 'es' ? 'Numerología Natal' : locale === 'pt-BR' ? 'Numerologia do Casal' : 'Numerology DOB Check',
      path: dobToolPath,
      desc:
        locale === 'es'
          ? 'Calcula la afinidad entre vuestros Senderos de Vida pitagóricos y números cósmicos.'
          : locale === 'pt-BR'
          ? 'Descubra a harmonia cósmica entre os números de Caminho de Vida de ambos.'
          : 'Discover Pythagorean Life Path triads and birth elemental synergy.',
      icon: Sparkles,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      title: locale === 'es' ? 'Astrología y Zodíaco' : locale === 'pt-BR' ? 'Astrologia e Signos' : 'Astrology & Zodiac Hub',
      sub: locale === 'es' ? 'Compatibilidad Astral' : locale === 'pt-BR' ? 'Harmonia dos Astros' : 'Rashi & Sun Sign Harmony',
      path: astroToolPath,
      desc:
        locale === 'es'
          ? 'Explora la afinidad elemental de los signos del zodíaco en el amor y la convivencia.'
          : locale === 'pt-BR'
          ? 'Veja como os elementos astrológicos influenciam a conexão do casal.'
          : 'Explore Western sun signs and Vedic Moon Rashi relationship principles.',
      icon: Compass,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
  ];

  const highVolumeFaqsEn = [
    {
      q: 'Kya online Love Calculator ka score accurate hota hai?',
      a: 'CalculateLove ka Love Calculator algorithm fully deterministic hai—iska matlab agar aap same naam enter karenge toh hamesha same score aayega. Yeh tool phonetic vibrations, letter matching aur bond preferences ka scientific-style entertainment model use karta hai. Asli relationship trust, respect aur open communication se grow karti hai.',
    },
    {
      q: 'How does the Love Calculator by Name calculate true love percentage?',
      a: 'The Love Calculator analyzes symmetrical letter frequency, vowel-to-consonant ratios, and name harmony. By factoring in your couple vibe and age dynamic, this Love Calculator evaluates communication compatibility, emotional warmth, and relationship longevity.',
    },
    {
      q: 'Kya is Love Calculator par mera data safe aur private hai?',
      a: 'Haan, 100% private! Aapka enter kiya hua koi bhi naam, age ya date of birth hamare server par store nahi hota. Saari calculations seedha aapke device browser mein hoti hain.',
    },
    {
      q: 'FLAMES game mein letters kaise cancel hote hain?',
      a: 'Dono naamo ke common letters 1-on-1 cancel hote hain. Baaki bache hue remaining letters ke total count se F-L-A-M-E-S (Friends, Lovers, Affectionate, Marriage, Enemies, Siblings) sequence mein cyclic elimination hoti hai jab tak ek final letter bache.',
    },
    {
      q: 'Can I share the generated Love Certificate card on WhatsApp Status?',
      a: 'Yes! Simply click "WhatsApp Card" or "Download Card PNG" on your result. It instantly downloads a high-resolution 1080×1350 certificate image that fits WhatsApp Status, Instagram Stories, and Facebook posts perfectly.',
    },
    {
      q: 'Love Marriage ya Arranged Marriage Love Calculator kis basis par result deta hai?',
      a: 'Yeh tool aapke lifestyle priorities—jaise family involvement, dating autonomy, aur communication openness—ko evaluate karke batata ki aapka inclination modern love courtship ki taraf zyada hai ya traditional family-guided alliance ki taraf.',
    },
  ];

  const highVolumeFaqsEs = [
    {
      q: '¿Cómo funciona la Calculadora del Amor por Nombre?',
      a: 'Analiza la vibración fonética y frecuencia de caracteres compartidos entre ambos nombres mediante un algoritmo simétrico y determinista. Al introducir los mismos nombres siempre obtendrás exactamente el mismo resultado.',
    },
    {
      q: '¿Es 100% privado y seguro el test de amor?',
      a: '¡Sí, totalmente privado! Ningún nombre, edad ni fecha queda guardado en ningún servidor. Todo el proceso corre de forma instantánea dentro de tu propio navegador.',
    },
    {
      q: '¿Cómo se juega al juego FLAMES online?',
      a: 'Se eliminan letras repetidas entre ambos nombres una por una. Con el recuento de letras restantes se realiza una cuenta circular eliminando hasta obtener la predicción: Amigos, Enamorados, Afecto, Matrimonio, Enemigos o Hermanos.',
    },
    {
      q: '¿Puedo descargar mi Certificado de Amor para WhatsApp e Instagram?',
      a: 'Sí, tras calcular la afinidad podrás descargar una tarjeta en alta definición 1080×1350 con caligrafía romántica, lista para compartir en estados de WhatsApp e historias de Instagram.',
    },
    {
      q: '¿Qué mide el análisis de los 4 pilares de pareja?',
      a: 'Desglosa la compatibilidad en Diálogo y Comunicación, Seguridad y Cuidado Emocional, Pasión y Química, y Metas a Largo Plazo.',
    },
  ];

  const highVolumeFaqsPt = [
    {
      q: 'Como a Calculadora do Amor por Nome calcula a porcentagem?',
      a: 'Ela cruza a ressonância harmônica e a frequência de letras dos dois nomes com uma fórmula matemática determinística. Ao digitar os mesmos nomes, o resultado é sempre idêntico.',
    },
    {
      q: 'Meus dados e os nomes digitados são seguros e privados?',
      a: 'Sim, 100% privados! Nenhum nome ou dado digitado é armazenado em servidores externos. Todo o cálculo é processado localmente no navegador do seu celular ou computador.',
    },
    {
      q: 'Como funciona o jogo FLAMES online?',
      a: 'O jogo elimina letras repetidas entre os dois nomes. Com as letras restantes, realiza a contagem circular clássica para revelar: Amigos, Namorados, Afeto, Casamento, Inimigos ou Irmãos.',
    },
    {
      q: 'Posso baixar o Certificado de Casal para o WhatsApp e Instagram?',
      a: 'Com certeza! Ao concluir o cálculo, você pode baixar uma imagem nítida em formato vertical (1080×1350) perfeita para Status do WhatsApp e Stories do Instagram.',
    },
    {
      q: 'O que os 4 pilares de compatibilidade avaliam?',
      a: 'Avaliam a facilidade no Diálogo, Carinho e Apoio Emocional, Química Romântica e Afinidade em Planos Futuros a dois.',
    },
  ];

  const highVolumeFaqs = locale === 'es' ? highVolumeFaqsEs : locale === 'pt-BR' ? highVolumeFaqsPt : highVolumeFaqsEn;

  const pageTitle =
    locale === 'es'
      ? 'CalculateLove - Calculadora del Amor por Nombre y Tests de Pareja'
      : locale === 'pt-BR'
      ? 'CalculateLove - Calculadora do Amor por Nome e Testes de Casal'
      : 'CalculateLove - Real Love Calculator by Name & Compatibility Test';

  const pageDesc =
    locale === 'es'
      ? 'Calcula tu porcentaje de amor verdadero por nombre, juega a FLAMES online y descarga tu certificado oficial de pareja. 100% gratis y privado.'
      : locale === 'pt-BR'
      ? 'Calcule sua porcentagem de amor verdadeiro por nome, jogue FLAMES online e baixe seu certificado de casal em HD. 100% grátis e privado.'
      : 'Free online Love Calculator to test true love percentage between two names. Use our accurate Love Calculator for instant compatibility, FLAMES, and couple analysis.';

  const heroHeading =
    locale === 'es'
      ? 'Calculadora del Amor por Nombre y Test de Compatibilidad'
      : locale === 'pt-BR'
      ? 'Calculadora do Amor por Nome e Teste de Compatibilidade'
      : 'Real Love Calculator by Name & Compatibility Test';

  const heroSub =
    locale === 'es'
      ? 'Descubre tu porcentaje de amor verdadero, evalúa la química con edades y sintonía de pareja, juega al clásico FLAMES y descarga certificados oficiales.'
      : locale === 'pt-BR'
      ? 'Descubra sua pontuação de amor verdadeiro, teste a química com idades e vibe de casal, jogue FLAMES online e baixe cartões de certificado em HD.'
      : 'Discover your true love percentage with our deterministic Love Calculator, test mutual chemistry with age and couple vibes, play authentic FLAMES, and download high-resolution shareable cards.';

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'CalculateLove',
    'url': `https://calculatelove.online${canonicalPath}`,
    'description': pageDesc,
    'inLanguage': t.langCode,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `https://calculatelove.online${blogIndexPath}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="w-full overflow-x-hidden">
      <SEOHead
        title={pageTitle}
        description={pageDesc}
        canonicalPath={canonicalPath}
        schemaJson={schemaJson}
        locale={locale}
      />

      {/* Hero Section Header */}
      <section className="relative px-4 sm:px-6 pt-6 pb-10 sm:pt-10 sm:pb-14 max-w-5xl mx-auto text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-rose-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-4 border border-rose-200/80 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>
            {locale === 'es'
              ? 'Plataforma #1 de Calculadoras de Amor y Pareja Gratis'
              : locale === 'pt-BR'
              ? 'Plataforma #1 de Calculadoras do Amor e Testes de Casal Grátis'
              : 'India’s #1 Free & Private Love Calculator Platform'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4 text-balance">
          {heroHeading}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 text-balance">
          {heroSub}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col xs:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-2">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('master-calculator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full xs:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-rose-600/15 transition-all flex items-center justify-center gap-2 min-h-[46px]"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>{locale === 'es' ? 'Probar Calculadora del Amor' : locale === 'pt-BR' ? 'Testar Calculadora do Amor' : 'Test Love Calculator'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(flamesToolPath)}
            className="w-full xs:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2 min-h-[46px] shadow-2xs"
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>{locale === 'es' ? 'Jugar a FLAMES Online' : locale === 'pt-BR' ? 'Jogar FLAMES Online' : 'Play FLAMES Online'}</span>
          </button>
        </div>
      </section>

      {/* Main Interactive Love Calculator Dashboard */}
      <section id="master-calculator" className="px-4 sm:px-6 max-w-5xl mx-auto mb-14 sm:mb-16 scroll-mt-20">
        {isCalculating ? (
          <CalculationLoader
            name1={quickName1}
            name2={quickName2}
            type="love"
            locale={locale}
            onComplete={() => {
              const res = calculateLoveScore(
                quickName1,
                quickName2,
                'general',
                {
                  age1,
                  age2,
                  bondType,
                  vibe,
                },
                locale
              );
              setQuickResult(res);
              setIsCalculating(false);
            }}
          />
        ) : !quickResult ? (
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-xl p-4 sm:p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 mb-5 gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <span>
                    {locale === 'es'
                      ? 'Calculadora del Amor: Comprueba tu Afinidad'
                      : locale === 'pt-BR'
                      ? 'Calculadora do Amor: Teste sua Compatibilidade'
                      : 'Love Calculator: Check True Compatibility'}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {locale === 'es'
                    ? 'Ingresa dos nombres para calcular el porcentaje de amor y consejos de pareja'
                    : locale === 'pt-BR'
                    ? 'Digite dois nomes para calcular a porcentagem de casal e receber conselhos'
                    : 'Enter two names into our free Love Calculator for deterministic percentage & 4-pillar analysis'}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>{locale === 'es' ? '100% Determinista y Privado' : locale === 'pt-BR' ? '100% Determinístico e Privado' : 'Deterministic & Private Match'}</span>
              </span>
            </div>

            <form onSubmit={handleQuickCalculate} className="space-y-4 sm:space-y-5">
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="min-w-0">
                    <label htmlFor="hpName1" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.common.yourName} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="hpName1"
                      type="text"
                      value={quickName1}
                      onChange={(e) => setQuickName1(e.target.value)}
                      placeholder={t.common.namePlaceholder1}
                      maxLength={40}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="hpName2" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.common.partnerName} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="hpName2"
                      type="text"
                      value={quickName2}
                      onChange={(e) => setQuickName2(e.target.value)}
                      placeholder={t.common.namePlaceholder2}
                      maxLength={40}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="hpAge1" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.loveCalc.inputAge1Label}
                    </label>
                    <input
                      id="hpAge1"
                      type="number"
                      min="13"
                      max="99"
                      value={age1}
                      onChange={(e) => setAge1(e.target.value)}
                      placeholder="e.g. 23"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="hpAge2" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.loveCalc.inputAge2Label}
                    </label>
                    <input
                      id="hpAge2"
                      type="number"
                      min="13"
                      max="99"
                      value={age2}
                      onChange={(e) => setAge2(e.target.value)}
                      placeholder="e.g. 24"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
                    />
                  </div>
                </div>
              </div>

              {/* Personalization Row */}
              <div className="p-3 sm:p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Stage */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t.loveCalc.bondTypeLabel}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'Crush', label: locale === 'es' ? 'Crush / Ilusión' : locale === 'pt-BR' ? 'Crush / Paquera' : 'Secret Crush' },
                        { id: 'Dating', label: locale === 'es' ? 'Saliendo' : locale === 'pt-BR' ? 'Namorando' : 'Dating' },
                        { id: 'Engaged', label: locale === 'es' ? 'Comprometidos' : locale === 'pt-BR' ? 'Noivos' : 'Engaged' },
                        { id: 'Married', label: locale === 'es' ? 'Casados' : locale === 'pt-BR' ? 'Casados' : 'Married' },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBondType(b.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all min-h-[34px] ${
                            bondType === b.id
                              ? 'bg-rose-600 text-white font-bold shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vibe */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t.loveCalc.relationshipVibeLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'Chai & Late Night Talks', label: locale === 'es' ? 'Café y Charlas ☕' : locale === 'pt-BR' ? 'Café e Papo ☕' : 'Chai & Talks ☕' },
                        { id: 'Spontaneous Long Drives', label: locale === 'es' ? 'Escapadas 🚗' : locale === 'pt-BR' ? 'Passeios 🚗' : 'Long Drives 🚗' },
                        { id: 'Movie & Food Marathons', label: locale === 'es' ? 'Películas 🍕' : locale === 'pt-BR' ? 'Filmes 🍕' : 'Movies & Food 🍕' },
                        { id: 'Chill & Sukoon', label: locale === 'es' ? 'Paz y Calma ✨' : locale === 'pt-BR' ? 'Paz e Sintonia ✨' : 'Chill & Sukoon ✨' },
                      ].map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVibe(v.id)}
                          className={`p-2 rounded-xl text-left border transition-all text-xs ${
                            vibe === v.id
                              ? 'border-rose-500 bg-white text-rose-900 shadow-xs font-semibold'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="block truncate text-[11px]">{v.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {quickError && <p className="text-xs text-rose-600 font-medium text-center">{quickError}</p>}

              <div className="pt-2 flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full max-w-md py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/20 min-h-[46px]"
                >
                  <span>{t.common.calculateNow}</span>
                  <Heart className="w-4 h-4 fill-white" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.common.testedPrivate}</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <ResultCard
            result={quickResult}
            locale={locale}
            onReset={() => {
              setQuickName1('');
              setQuickName2('');
              setAge1('');
              setAge2('');
              setQuickResult(null);
            }}
            onShare={() => {}}
          />
        )}
      </section>

      {/* Hero Visual Section: Why Millions Trust CalculateLove */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="rounded-3xl border border-rose-200/90 bg-gradient-to-br from-white via-rose-50/30 to-pink-50/20 p-6 sm:p-8 md:p-10 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Photo */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-rose-100 bg-slate-900">
                <img
                  src={heroRomanticImage}
                  alt="Romantic connection and genuine couple compatibility test"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                    {locale === 'es' ? 'Química Real' : locale === 'pt-BR' ? 'Conexão Real' : 'Real Chemistry'}
                  </span>
                  <p className="text-xs font-semibold leading-tight mt-0.5">
                    {locale === 'es'
                      ? 'Amor medido con respeto, complicidad y valores compartidos'
                      : locale === 'pt-BR'
                      ? 'Amor medido com respeito, cumplicidade e valores em sintonia'
                      : 'Love evaluated through respect, shared laughs, and emotional security'}
                  </p>
                </div>
              </div>
            </div>

            {/* Why CalculateLove Features */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-bold border border-rose-200">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                <span>
                  {locale === 'es' ? 'Por qué Elegir CalculateLove' : locale === 'pt-BR' ? 'Por que Escolher o CalculateLove' : 'Why Millions Trust CalculateLove'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
                {locale === 'es'
                  ? 'Compatibilidad Auténtica: Algoritmo Determinista y Privado'
                  : locale === 'pt-BR'
                  ? 'Compatibilidade Autêntica: Algoritmo Determinístico e Privado'
                  : 'Authentic Compatibility: Deterministic & 100% Private'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {locale === 'es'
                  ? 'A diferencia de sitios genéricos que inventan un número al azar en cada intento, CalculateLove ofrece una experiencia confiable, matemáticamente coherente y respetuosa con tu privacidad.'
                  : locale === 'pt-BR'
                  ? 'Diferente de geradores aleatórios que mudam a pontuação a cada clique, o CalculateLove utiliza uma lógica estável, matematicamente consistente e 100% focada na sua privacidade.'
                  : 'Unlike random lottery calculators that change your love score every time you hit refresh, CalculateLove implements a deterministic invariant formula. Entering the same two names always yields identical, reproducible compatibility metrics.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-rose-600" />
                    <strong className="text-xs font-bold text-slate-900">
                      {locale === 'es' ? 'Fórmula Invariante' : locale === 'pt-BR' ? 'Fórmula Invariante' : 'Symmetric Determinism'}
                    </strong>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {locale === 'es'
                      ? 'El orden de los nombres no altera el porcentaje; la vibración mutua es siempre idéntica.'
                      : locale === 'pt-BR'
                      ? 'A ordem dos nomes não altera a porcentagem; a ressonância entre ambos é sempre estável.'
                      : 'Testing "Rahul & Pooja" or "Pooja & Rahul" gives the exact same compatibility score.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <strong className="text-xs font-bold text-slate-900">
                      {locale === 'es' ? 'Privacidad en Navegador' : locale === 'pt-BR' ? 'Privacidade no Navegador' : 'Zero-Storage Privacy'}
                    </strong>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {locale === 'es'
                      ? 'Todo se procesa en tu dispositivo; ningún nombre ni fecha se guarda en servidores.'
                      : locale === 'pt-BR'
                      ? 'Tudo é calculado no seu dispositivo; nenhum nome ou dado é salvo em servidores.'
                      : 'Calculations occur exclusively inside your browser; names and personal details are never stored.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Authority Section: 4 Pillars of Compatibility */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="bg-gradient-to-br from-white via-rose-50/20 to-white rounded-3xl border border-rose-200 p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-2">
              {locale === 'es' ? 'Análisis Multidimensional' : locale === 'pt-BR' ? 'Análise Multidimensional' : 'Multi-Dimensional Analysis'}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-display mb-3">
              {locale === 'es'
                ? '¿Qué Mide Realmente tu Porcentaje de Amor?'
                : locale === 'pt-BR'
                ? 'O que a Pontuação do Amor Realmente Mede?'
                : 'What Does Your Love Percentage Score Actually Measure?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {locale === 'es'
                ? 'En lugar de generar un número plano, CalculateLove desglosa vuestra afinidad en cuatro dimensiones fundamentales de pareja:'
                : locale === 'pt-BR'
                ? 'Em vez de um número aleatório qualquer, o CalculateLove analisa a conexão do casal em 4 pilares essenciais:'
                : 'Rather than generating a flat, mysterious number, CalculateLove breaks down your relationship compatibility across four psychological pillars:'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-3 text-lg">
                💬
              </div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">{t.loveCalc.communication}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {locale === 'es'
                  ? 'Facilidad para conversar, compartir bromas cotidianas y expresar sentimientos con confianza.'
                  : locale === 'pt-BR'
                  ? 'Facilidade no diálogo diário, piadas internas e capacidade de falar o que sente sem receios.'
                  : 'Ease of daily dialogue, shared humor, mutual listening, and the ability to express feelings without fear.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold mb-3 text-lg">
                🛡️
              </div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">{t.loveCalc.emotionalHarmony}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {locale === 'es'
                  ? 'Paz en el silencio, cuidado protector y respaldo incondicional en los momentos difíciles.'
                  : locale === 'pt-BR'
                  ? 'Paz no silêncio, cuidado com os sentimentos do outro e suporte nos momentos difíceis.'
                  : 'Sukoon in silence, protective care, non-judgmental acceptance, and deep reassurance in difficult moments.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3 text-lg">
                🔥
              </div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">{t.loveCalc.passion}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {locale === 'es'
                  ? 'Chispa romántica, mariposas en el estómago y entusiasmo al verse y pasar tiempo juntos.'
                  : locale === 'pt-BR'
                  ? 'Frio na barriga, atração magnética e vontade de estar perto e curtir a dois.'
                  : 'Romantic spark, butterflies, emotional attraction, and spontaneous excitement when spending time together.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3 text-lg">
                🤝
              </div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">{t.loveCalc.longevity}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {locale === 'es'
                  ? 'Visión de futuro compartida, resolución constructiva de conflictos y valores familiares en sintonía.'
                  : locale === 'pt-BR'
                  ? 'Sonhos alinhados para o futuro, resolução madura de desentendimentos e valores semelhantes.'
                  : 'Aligned future vision, conflict resolution capacity, mutual life respect, and shared family values.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works: 3-Step Mathematical & Sound Harmonic Method */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
            {locale === 'es' ? 'Metodología Transparente' : locale === 'pt-BR' ? 'Metodologia Transparente' : 'How It Works'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {locale === 'es'
              ? '¿Cómo Funciona la Calculadora del Amor por Nombre?'
              : locale === 'pt-BR'
              ? 'Como Funciona a Calculadora do Amor por Nome?'
              : 'How Does the Name Love Calculator Engine Work?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {locale === 'es'
              ? 'Una combinación de resonancia fonética de caracteres y calibración multidimensional.'
              : locale === 'pt-BR'
              ? 'Uma combinação de ressonância fonética e calibração multidimensional de casal.'
              : 'A deterministic blend of phonetic resonance, letter harmonics, and couple stage weighting.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-bold text-base text-slate-900">
              {locale === 'es' ? 'Normalización y Armonía Fonética' : locale === 'pt-BR' ? 'Normalização e Harmonia Fonética' : 'Character Normalization & Harmonics'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {locale === 'es'
                ? 'Se eliminan espacios y mayúsculas para analizar la frecuencia de consonantes y vocales compartidas con invariancia simétrica.'
                : locale === 'pt-BR'
                ? 'Espaços e maiúsculas são limpos para avaliar o equilíbrio de vogais e consoantes de ambos os nomes.'
                : 'Names are normalized to remove casing and punctuation. Symmetrical letter frequencies and phonetic acoustic balances are mapped mathematically.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-bold text-base text-slate-900">
              {locale === 'es' ? 'Dinámica de Pareja y Sintonía' : locale === 'pt-BR' ? 'Dinâmica de Casal e Vibe' : 'Couple Dynamics & Stage Weighting'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {locale === 'es'
                ? 'Tus elecciones de etapa (Crush, Saliendo, Casados) y sintonía enriquecen el análisis de los 4 pilares de compatibilidad.'
                : locale === 'pt-BR'
                ? 'A etapa da relação e a sintonia do casal refinam as notas de diálogo, carinho, química e longevidade.'
                : 'Your current relationship stage and shared date vibe fine-tune the 4-pillar scores for dialogue, emotional security, and romantic spark.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-bold text-base text-slate-900">
              {locale === 'es' ? 'Resultado y Certificado HD' : locale === 'pt-BR' ? 'Resultado e Certificado em HD' : 'Deterministic Verdict & Certificate'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {locale === 'es'
                ? 'Obtén tu porcentaje oficial, consejos honestos y una tarjeta en alta definición 1080×1350 lista para WhatsApp e Instagram.'
                : locale === 'pt-BR'
                ? 'Veja sua porcentagem definitiva, conselhos práticos e baixe o certificado personalizado de casal pronto para compartilhar.'
                : 'Receive your reproducible love percentage, personalized advice, and a 1080×1350 certificate card ready to save and share.'}
            </p>
          </div>
        </div>
      </section>

      {/* Understanding Compatibility Tiers */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-8 relative">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
              {locale === 'es' ? 'Escala de Puntuación' : locale === 'pt-BR' ? 'Escala de Pontuação' : 'Score Spectrum Guide'}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display">
              {locale === 'es'
                ? '¿Qué Significa tu Porcentaje de Amor?'
                : locale === 'pt-BR'
                ? 'O que Significa a sua Porcentagem de Amor?'
                : 'What Does Your Love Percentage Score Really Mean?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {locale === 'es'
                ? 'Cada rango de puntuación refleja una dinámica única entre dos personas. Conoce las 4 zonas de compatibilidad:'
                : locale === 'pt-BR'
                ? 'Cada faixa de pontuação reflete uma dinâmica de convivência. Veja o que cada intervalo revela:'
                : 'Every compatibility score reflects a different conversational and emotional dynamic. Here is how relationship coaches interpret the ranges:'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">90% – 100%</span>
              <h3 className="font-bold text-sm text-white">
                {locale === 'es' ? 'Almas Gemelas' : locale === 'pt-BR' ? 'Almas Gêmeas' : 'Deep Resonance (Soulmate)'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'es'
                  ? 'Conexión intuitiva, valores compartidos y facilidad para entenderse incluso sin palabras.'
                  : locale === 'pt-BR'
                  ? 'Sintonia intuitiva, valores muito parecidos e facilidade de se entender até pelo olhar.'
                  : 'Intuitive empathy, effortless conversational flow, and shared core life ideals ("Rab Ne Bana Di Jodi").'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-rose-400 block">75% – 89%</span>
              <h3 className="font-bold text-sm text-white">
                {locale === 'es' ? 'Gran Compañerismo' : locale === 'pt-BR' ? 'Forte Companheirismo' : 'Strong Companionship'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'es'
                  ? 'Equilibrio sano y duradero: fuerte atracción mutua mientras cada uno conserva su propia identidad.'
                  : locale === 'pt-BR'
                  ? 'Equilíbrio saudável e duradouro: forte atração com respeito à individualidade de cada um.'
                  : 'A balanced, highly sustainable bond where strong mutual attraction coexists with healthy individuality.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-amber-400 block">60% – 74%</span>
              <h3 className="font-bold text-sm text-white">
                {locale === 'es' ? 'Crecimiento y Chispa' : locale === 'pt-BR' ? 'Crescimento e Química' : 'Growth & Discovery'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'es'
                  ? '¡Los polos opuestos se atraen! Las diferencias enriquecen la relación cuando hay escucha sincera.'
                  : locale === 'pt-BR'
                  ? 'Os opostos se atraem! Pontos de vista diferentes trazem entusiasmo quando há diálogo sincero.'
                  : 'Opposites attract! Differences in perspectives introduce fresh excitement ("Thoda Drama, Zyada Pyaar").'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2">
              <span className="text-xs font-bold text-purple-400 block">Below 60%</span>
              <h3 className="font-bold text-sm text-white">
                {locale === 'es' ? 'Perspectivas Únicas' : locale === 'pt-BR' ? 'Mundos Diferentes' : 'Unique Dynamic & Focus'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'es'
                  ? 'Dos personas con mundos distintos que pueden aprender mucho el uno del otro mediante la empatía.'
                  : locale === 'pt-BR'
                  ? 'Duas pessoas de mundos diferentes que podem crescer muito quando decidem se escutar com carinho.'
                  : 'Two distinct personalities. Real relationships are built through deliberate care, kindness, and active listening.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Grid */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
            {locale === 'es' ? 'Elige tu Test' : locale === 'pt-BR' ? 'Escolha seu Teste' : 'Choose Your Match Intent'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {locale === 'es'
              ? 'Calculadoras de Pareja y Amor Populares'
              : locale === 'pt-BR'
              ? 'Calculadoras do Amor e Testes Populares'
              : 'Popular Relationship & Love Calculator Tools'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {locale === 'es'
              ? 'Cada herramienta está calibrada para responder preguntas específicas de pareja, amistad y compatibilidad.'
              : locale === 'pt-BR'
              ? 'Cada ferramenta é calibrada para responder perguntas específicas de casal, amizade e sintonia.'
              : 'Each Love Calculator is specifically calibrated for different relationship questions, friendship meters, and compatibility stages.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {secondaryTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.path}
                onClick={() => onNavigate(tool.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNavigate(tool.path)}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${tool.color} border flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 group-hover:text-rose-500 transition-colors">
                      {tool.sub}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-1 font-display">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-semibold">
                  <span>{locale === 'es' ? 'Iniciar Test' : locale === 'pt-BR' ? 'Iniciar Teste' : 'Start Test'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Showcase: Official Love Compatibility Certificate Card */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="rounded-3xl overflow-hidden border border-rose-200/90 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/40 shadow-xl p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Certificate Image Frame */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-200/80 bg-slate-950">
                <img
                  src={loveCertificateImage}
                  alt="Official Love Compatibility Certificate Card generated by CalculateLove"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>{t.common.certificateBadge}</span>
                </div>
              </div>
              <p className="text-center text-[11px] text-slate-500 mt-2 font-medium italic">
                {locale === 'es'
                  ? 'Vista previa de tu Certificado de Compatibilidad descargable'
                  : locale === 'pt-BR'
                  ? 'Prévia do Certificado de Compatibilidade em alta resolução'
                  : 'Sample preview of your customized Love Compatibility Certificate'}
              </p>
            </div>

            {/* Content & SEO Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 text-rose-800 text-xs font-bold border border-rose-200">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>{locale === 'es' ? 'Descarga Gratuita en Alta Definición' : locale === 'pt-BR' ? 'Download Gratuito em Alta Definição' : 'Free WhatsApp Status & Instagram Story Card'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
                {locale === 'es'
                  ? 'Obtén tu Certificado Oficial de Amor de Pareja (Descarga Gratis)'
                  : locale === 'pt-BR'
                  ? 'Receba seu Certificado Oficial de Casal (Download Gratuito)'
                  : 'Get Your Official Love Compatibility Certificate Card (Free Download)'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {locale === 'es'
                  ? 'Tras cada cálculo, obtienes un Certificado Oficial de Pareja con vuestros nombres en caligrafía romántica, porcentaje de afinidad, y el desglose de pilares listo para redes sociales.'
                  : locale === 'pt-BR'
                  ? 'Após cada cálculo, gere um Certificado Oficial de Casal personalizado com nomes, porcentagem geral e análise detalhada dos 4 pilares do relacionamento.'
                  : 'Har successful calculation ke baad, hamara Love Calculator aapko ek authentic, high-resolution Love Compatibility Certificate Card generate karke deta hai.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-rose-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-slate-900 block font-semibold">
                      {locale === 'es' ? 'Caligrafía Elegante' : locale === 'pt-BR' ? 'Caligrafia de Casal' : 'Custom Couple Calligraphy'}
                    </strong>
                    <span className="text-slate-500 text-[11px]">
                      {locale === 'es' ? 'Impresión vintage con borde dorado.' : locale === 'pt-BR' ? 'Nomes destacados com moldura dourada.' : 'Printed in romantic typography with vintage gold border.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-rose-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-slate-900 block font-semibold">
                      {locale === 'es' ? 'Formato Vertical 1080×1350' : locale === 'pt-BR' ? 'Formato Vertical 1080×1350' : '1080×1350 High Resolution'}
                    </strong>
                    <span className="text-slate-500 text-[11px]">
                      {locale === 'es' ? 'Diseñado para estados de WhatsApp e historias.' : locale === 'pt-BR' ? 'Ideal para Status e Stories do Instagram.' : 'Perfect ratio for WhatsApp Status and Stories.'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('master-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md shadow-rose-600/20 min-h-[44px]"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{locale === 'es' ? 'Calcular Amor y Obtener Certificado' : locale === 'pt-BR' ? 'Calcular Amor e Obter Certificado' : 'Calculate Love & Get Certificate Now'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate(loveToolPath)}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm inline-flex items-center gap-2 min-h-[44px]"
                >
                  <span>{locale === 'es' ? 'Ir a la Calculadora del Amor' : locale === 'pt-BR' ? 'Ir para a Calculadora do Amor' : 'Explore Master Love Calculator'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High Volume FAQ Accordion Section */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto mb-16 sm:mb-20">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
            {t.common.faqSubtitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            {t.common.faqTitle}
          </h2>
        </div>

        <div className="space-y-3">
          {highVolumeFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:text-rose-600 transition-colors min-h-[48px]"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-rose-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest Blog Guides */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              {locale === 'es' ? 'Últimas Guías de Pareja' : locale === 'pt-BR' ? 'Últimos Guias de Casal' : 'Latest Relationship Guides'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {locale === 'es'
                ? 'Consejos editoriales sobre compatibilidad, dinámicas de amor y relaciones.'
                : locale === 'pt-BR'
                ? 'Artigos e reflexões sobre compatibilidade de casal, química e amor.'
                : 'Read editorial breakdowns on how our Love Calculator works, dating advice, and compatibility.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate(blogIndexPath)}
            className="text-xs font-semibold text-rose-600 hover:underline"
          >
            {locale === 'es' ? 'Ver todas las guías →' : locale === 'pt-BR' ? 'Ver todos os guias →' : 'View all guides →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {BLOG_POSTS.slice(0, 3).map((post) => {
            const articlePath = locale === 'es' ? `/es/blog/${post.slug}/` : locale === 'pt-BR' ? `/pt-br/blog/${post.slug}/` : `/blog/${post.slug}/`;

            return (
              <article
                key={post.slug}
                onClick={() => onNavigate(articlePath)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNavigate(articlePath)}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-2 line-clamp-2 leading-snug font-display">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-semibold">
                  <span>{locale === 'es' ? 'Leer Guía' : locale === 'pt-BR' ? 'Ler Guia' : 'Read Guide'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
