import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResultCard } from '../components/ResultCard';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { CalculationLoader } from '../components/CalculationLoader';
import { calculateLoveScore } from '../lib/calculatorEngine';
import { CompatibilityResult } from '../types';
import {
  Heart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
} from 'lucide-react';
import loveCertificateImage from '../assets/images/love_certificate_showcase_1792223212819.jpg';
import { SupportedLocale, getEquivalentPath } from '../i18n/routes';
import { getTranslations } from '../i18n/translations';

interface Props {
  onNavigate: (path: string) => void;
  locale?: SupportedLocale;
}

export const LoveCalculatorPage: React.FC<Props> = ({ onNavigate, locale = 'en' }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [bondType, setBondType] = useState('Dating');
  const [vibe, setVibe] = useState('Chai & Late Night Talks');

  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const t = getTranslations(locale);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) {
      setError(
        locale === 'es'
          ? 'Por favor, ingresa tu nombre y el de tu pareja.'
          : locale === 'pt-BR'
          ? 'Por favor, digite seu nome e o nome do seu par.'
          : 'Please enter both your name and your partner’s name.'
      );
      return;
    }
    setError('');
    setIsCalculating(true);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setAge1('');
    setAge2('');
    setResult(null);
    setIsCalculating(false);
    setError('');
  };

  const faqsEn = [
    {
      question: 'How is love compatibility calculated between two names?',
      answer:
        'CalculateLove implements a deterministic character harmonic algorithm. It evaluates letter frequencies, consonant-to-vowel ratios, and phonetic sound energy between both names. Paired with your couple vibe and age dynamic, it provides a stable, reproducible compatibility score without random fluctuation.',
    },
    {
      question: 'What is the difference between Love Calculator by Name and Love Percentage Calculator?',
      answer:
        'They represent the same core mathematical evaluation! This master tool combines phonetic name harmonics with a 4-pillar dimensional percentage breakdown (Communication, Emotional Care, Passion, and Longevity) so you get the complete picture in one place.',
    },
    {
      question: 'Kya online love calculator ka score 100% accurate hota hai?',
      answer:
        'Hamara algorithm mathematically deterministic hai—iska matlab agar aap same naam enter karenge toh hamesha identical percentage milega. Yeh ek scientific-style entertainment model hai. Real life mein kisi bhi relation ka future dono partners ke trust, empathy, aur open communication par depend karta hai.',
    },
    {
      question: 'How does this test distinguish True Love from temporary attraction?',
      answer:
        'Infatuation is largely chemical and fleeting, whereas true love emphasizes emotional safety, mutual vulnerability, shared life values, and supportive humor. Our analysis highlights emotional security alongside passion.',
    },
    {
      question: 'Is my personal data saved or shared?',
      answer:
        'Zero personal data is stored. Every calculation executes exclusively inside your local web browser. Your names, ages, and relationship vibes never leave your device.',
    },
    {
      question: 'Can I share the generated Love Certificate on WhatsApp Status?',
      answer:
        'Yes! Simply tap "Share Card on WhatsApp" or "Save PNG" on your result card to download a high-resolution 1080×1350 certificate optimized for WhatsApp Status and Instagram Stories.',
    },
  ];

  const faqsEs = [
    {
      question: '¿Cómo calcula la calculadora del amor la compatibilidad entre dos nombres?',
      answer:
        'CalculateLove implementa un algoritmo determinista de armonía de caracteres. Analiza la frecuencia de letras, la resonancia fonética entre consonantes y vocales, y la energía acústica de ambos nombres. Combinado con la etapa de relación y vuestra edad, entrega un porcentaje reproducible y sin fluctuaciones aleatorias.',
    },
    {
      question: '¿Qué mide el desglose en 4 pilares de compatibilidad?',
      answer:
        'Evalúa cuatro dimensiones fundamentales para cualquier pareja duradera: fluidez en la comunicación, seguridad y contención emocional, química y pasión romántica, y afinidad en proyectos a largo plazo.',
    },
    {
      question: '¿El porcentaje de la calculadora del amor es 100% exacto?',
      answer:
        'El cálculo es matemáticamente determinista: los mismos nombres siempre generarán exactamente el mismo resultado. Es una herramienta diseñada con fines de entretenimiento e inspiración; en la vida real, el éxito conyugal depende del cariño, la confianza y la comunicación sincera.',
    },
    {
      question: '¿Cómo diferenciar el amor verdadero de una simple atracción pasajera?',
      answer:
        'El capricho pasajero suele generar ansiedad y necesidad constante de validación, mientras que el amor auténtico brinda calma emocional, aceptación sincera de los defectos del otro y ganas de crecer juntos.',
    },
    {
      question: '¿Mis datos personales o nombres ingresados quedan guardados?',
      answer:
        'No se guarda ningún dato personal. Todo el algoritmo se ejecuta directamente en tu propio navegador web de forma confidencial y privada.',
    },
    {
      question: '¿Puedo compartir o descargar el Certificado de Pareja en WhatsApp?',
      answer:
        '¡Totalmente! Puedes tocar en "WhatsApp" o "Guardar PNG" para obtener una tarjeta en alta definición (1080×1350) especialmente diseñada para estados de WhatsApp e historias de Instagram.',
    },
  ];

  const faqsPt = [
    {
      question: 'Como a calculadora do amor calcula a compatibilidade entre dois nomes?',
      answer:
        'O CalculateLove utiliza um algoritmo determinístico de ressonância acústica de caracteres. Ele avalia a frequência de letras, o equilíbrio entre vogais e consoantes e a vibração fonética dos dois nomes. O resultado é consistente, reproduzível e sem sorteios aleatórios.',
    },
    {
      question: 'O que a análise em 4 pilares de compatibilidade avalia?',
      answer:
        'Ela divide a pontuação em quatro áreas essenciais para um relacionamento saudável: facilidade de diálogo, acolhimento e carinho emocional, atração e paixão romântica, e sintonia em projetos futuros a dois.',
    },
    {
      question: 'A porcentagem da calculadora do amor online é 100% exata?',
      answer:
        'O algoritmo é matematicamente determinístico: ao digitar os mesmos nomes, o resultado será sempre idêntico. É um teste descontraído para entretenimento e inspiração; o sucesso de uma relação real depende do respeito, carinho e compromisso diário do casal.',
    },
    {
      question: 'Como saber se é amor de verdade ou apenas uma paixonite?',
      answer:
        'A atração momentânea muitas vezes é guiada pela ansiedade e idealização. Já o amor verdadeiro se caracteriza por paz de espírito, segurança ao lado da pessoa e vontade de apoiar os sonhos um do outro.',
    },
    {
      question: 'Os nomes e idades digitados ficam salvos em algum lugar?',
      answer:
        'Zero dados são armazenados. Todo o processamento acontece diretamente no navegador do seu dispositivo de forma 100% privada e segura.',
    },
    {
      question: 'Posso baixar e postar o Certificado de Casal no WhatsApp e Instagram?',
      answer:
        'Sim! Basta clicar em "WhatsApp" ou "Baixar PNG" no cartão de resultado para salvar um certificado em alta resolução de 1080×1350, ideal para Status e Stories.',
    },
  ];

  const faqs = locale === 'es' ? faqsEs : locale === 'pt-BR' ? faqsPt : faqsEn;

  const canonicalPath = getEquivalentPath('/love-calculator/', locale);
  const homePath = getEquivalentPath('/', locale);

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': t.loveCalc.seoTitle,
    'url': `https://calculatelove.online${canonicalPath}`,
    'description': t.loveCalc.seoDesc,
    'applicationCategory': 'EntertainmentApplication',
    'operatingSystem': 'All',
    'inLanguage': t.langCode,
  };

  const breadcrumbs = [
    { label: locale === 'es' ? 'Inicio' : locale === 'pt-BR' ? 'Início' : 'Home', href: homePath },
    { label: t.nav.loveTest },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title={t.loveCalc.seoTitle}
        description={t.loveCalc.seoDesc}
        canonicalPath={canonicalPath}
        schemaJson={schemaJson}
        locale={locale}
      />

      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>{locale === 'es' ? 'Cálculo Determinista y Privado' : locale === 'pt-BR' ? 'Cálculo Determinístico e Privado' : 'Deterministic & Private Name Match'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          {t.loveCalc.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          {t.loveCalc.heroSubtitle}
        </p>
      </div>

      {/* Wide Calculator Dashboard */}
      <div className="w-full mb-8 sm:mb-10">
        {isCalculating ? (
          <CalculationLoader
            name1={name1}
            name2={name2}
            type="love"
            locale={locale}
            onComplete={() => {
              const res = calculateLoveScore(
                name1,
                name2,
                'general',
                {
                  age1,
                  age2,
                  bondType,
                  vibe,
                },
                locale
              );
              setResult(res);
              setIsCalculating(false);
            }}
          />
        ) : !result ? (
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-lg p-4 sm:p-6 md:p-7 pb-5 sm:pb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

            <form onSubmit={handleCalculate} className="space-y-4 sm:space-y-5">
              {/* Row 1: Names & Ages spread across width on desktop */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3.5">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 font-display">
                      {locale === 'es' ? 'Ingresa los Nombres de la Pareja' : locale === 'pt-BR' ? 'Digite os Nomes do Casal' : 'Enter Couple Details'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {locale === 'es' ? 'Armonía fonética basada en consonantes y vocales' : locale === 'pt-BR' ? 'Harmonia fonética baseada em consoantes e vogais' : 'Phonetic vibration matching based on letters & vowels'}
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                    <Sparkles className="w-3 h-3 text-rose-500" />
                    <span>{locale === 'es' ? 'Fórmula Estable' : locale === 'pt-BR' ? 'Fórmula Estável' : 'Deterministic Match'}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="min-w-0">
                    <label htmlFor="p1Name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.loveCalc.inputName1Label} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="p1Name"
                      type="text"
                      required
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      placeholder={t.common.namePlaceholder1}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="p2Name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.loveCalc.inputName2Label} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="p2Name"
                      type="text"
                      required
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      placeholder={t.common.namePlaceholder2}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="p1Age" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.loveCalc.inputAge1Label}
                    </label>
                    <input
                      id="p1Age"
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
                    <label htmlFor="p2Age" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t.loveCalc.inputAge2Label}
                    </label>
                    <input
                      id="p2Age"
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

              {/* Row 2: Dynamics & Personalization */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-50/40 border border-rose-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Current Stage */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-700">
                        {t.loveCalc.bondTypeLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'Crush', label: locale === 'es' ? 'Crush / Ilusión' : locale === 'pt-BR' ? 'Crush / Paquera' : 'Secret Crush' },
                        { id: 'Dating', label: locale === 'es' ? 'Saliendo / Pareja' : locale === 'pt-BR' ? 'Namorando' : 'Dating' },
                        { id: 'Engaged', label: locale === 'es' ? 'Comprometidos' : locale === 'pt-BR' ? 'Noivos' : 'Engaged' },
                        { id: 'Married', label: locale === 'es' ? 'Casados' : locale === 'pt-BR' ? 'Casados' : 'Married' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setBondType(item.id)}
                          className={`p-2 rounded-xl text-left border transition-all text-xs ${
                            bondType === item.id
                              ? 'border-rose-500 bg-white text-rose-900 shadow-xs ring-1 ring-rose-300 font-semibold'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="font-semibold block truncate text-[11px]">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Couple Vibe */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-700">
                        {t.loveCalc.relationshipVibeLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        {
                          id: 'Chai & Late Night Talks',
                          label: locale === 'es' ? 'Café y Charlas ☕' : locale === 'pt-BR' ? 'Conversas e Café ☕' : 'Chai & Talks ☕',
                          desc: locale === 'es' ? 'Complicidad' : locale === 'pt-BR' ? 'Cumplicidade' : 'Deep heart talks',
                        },
                        {
                          id: 'Spontaneous Long Drives',
                          label: locale === 'es' ? 'Escapadas 🚗' : locale === 'pt-BR' ? 'Viagens a Dois 🚗' : 'Long Drives 🚗',
                          desc: locale === 'es' ? 'Aventura' : locale === 'pt-BR' ? 'Aventura' : 'Road trips',
                        },
                        {
                          id: 'Movie & Food Marathons',
                          label: locale === 'es' ? 'Series y Pizza 🍕' : locale === 'pt-BR' ? 'Filmes e Lanches 🍕' : 'Food & Movies 🍕',
                          desc: locale === 'es' ? 'Plan casero' : locale === 'pt-BR' ? 'Fim de semana' : 'Cozy weekend',
                        },
                        {
                          id: 'Chill & Sukoon',
                          label: locale === 'es' ? 'Paz y Calma ✨' : locale === 'pt-BR' ? 'Paz e Sossego ✨' : 'Quiet Sukoon ✨',
                          desc: locale === 'es' ? 'Tranquilidad' : locale === 'pt-BR' ? 'Confiança' : 'Peace & trust',
                        },
                      ].map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVibe(v.id)}
                          className={`p-2 rounded-xl text-left border transition-all text-xs ${
                            vibe === v.id
                              ? 'border-rose-500 bg-white text-rose-900 shadow-xs ring-1 ring-rose-300 font-semibold'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="font-semibold block truncate text-[11px]">{v.label}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{v.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium text-center">{error}</p>}

              {/* Action Button */}
              <div className="pt-2 flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full max-w-md py-3.5 px-8 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-700 hover:to-pink-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md shadow-rose-600/20 min-h-[48px]"
                >
                  <span>{t.loveCalc.calculateBtnText}</span>
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.common.testedPrivate}</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <ResultCard result={result} onReset={handleReset} onShare={() => {}} locale={locale} />
        )}
      </div>

      {/* Featured Showcase: Official Love Compatibility Certificate Card */}
      <section className="bg-gradient-to-br from-rose-50/60 via-white to-pink-50/50 rounded-3xl border border-rose-200/90 p-6 sm:p-8 md:p-10 mb-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Certificate Image Frame */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-200/80 bg-slate-950">
              <img
                src={loveCertificateImage}
                alt="Personalized Love Compatibility Certificate Card"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
                <Award className="w-3.5 h-3.5" />
                <span>{locale === 'es' ? 'Certificado Oficial' : locale === 'pt-BR' ? 'Certificado Oficial' : 'Verified Certificate'}</span>
              </div>
            </div>
            <p className="text-center text-[11px] text-slate-500 mt-2 font-medium italic">
              {locale === 'es'
                ? 'Ejemplo del Certificado de Compatibilidad descargable'
                : locale === 'pt-BR'
                ? 'Exemplo do Certificado de Compatibilidade para download'
                : 'Example of the free downloadable Love Compatibility Certificate'}
            </p>
          </div>

          {/* Text & Features */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>{t.common.certificateBadge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
              {locale === 'es'
                ? 'Genera y Descarga tu Certificado Oficial de Amor'
                : locale === 'pt-BR'
                ? 'Gere e Baixe seu Certificado Oficial do Amor'
                : 'Generate & Download Your Love Compatibility Certificate Card'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {locale === 'es'
                ? 'Al calcular tu afinidad en CalculateLove, desbloqueas una tarjeta de certificado de amor en alta resolución lista para imprimir o compartir en tus redes sociales.'
                : locale === 'pt-BR'
                ? 'Ao calcular sua afinidade no CalculateLove, você desbloqueia um certificado de casal em alta resolução com nomes caligráficos, porcentagem e conselhos.'
                : 'When you calculate your compatibility on CalculateLove, you get more than a basic score. You unlock a beautifully rendered Love Compatibility Certificate containing your names in romantic calligraphy, mutual love percentage, cosmic relationship verdict, and 4-pillar balance ratings.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-semibold">
                    {locale === 'es' ? 'Formato Especial para Redes' : locale === 'pt-BR' ? 'Formato para Redes Sociais' : 'Instant Social Status Card'}
                  </strong>
                  <span className="text-slate-500 text-[11px]">
                    {locale === 'es'
                      ? 'Proporción 1080×1350 optimizada para estados de WhatsApp e historias de Instagram.'
                      : locale === 'pt-BR'
                      ? 'Proporção 1080×1350 perfeita para Status do WhatsApp e Stories do Instagram.'
                      : 'Formatted in 1080×1350 for WhatsApp Status, Snapchat, and Instagram Stories.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-semibold">
                    {locale === 'es' ? '100% Privado y Determinista' : locale === 'pt-BR' ? '100% Privado e Determinístico' : '100% Private & Deterministic'}
                  </strong>
                  <span className="text-slate-500 text-[11px]">
                    {locale === 'es'
                      ? 'Calculado de forma local en tu navegador. Tus nombres nunca quedan en servidores.'
                      : locale === 'pt-BR'
                      ? 'Calculado localmente no seu navegador. Nenhum dado é salvo em servidores.'
                      : 'Calculated directly in your browser. No names or results are stored on any server.'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md shadow-rose-600/20 min-h-[44px]"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>
                  {locale === 'es'
                    ? 'Calcular Compatibilidad y Descargar Certificado'
                    : locale === 'pt-BR'
                    ? 'Calcular Compatibilidade e Baixar Certificado'
                    : 'Calculate Compatibility & Download Certificate'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Authority Section: 4 Pillars */}
      <section className="bg-gradient-to-br from-white via-rose-50/20 to-white rounded-3xl border border-rose-200 p-6 sm:p-8 md:p-10 mb-12 shadow-sm">
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
              ? 'En lugar de generar un número al azar, CalculateLove desglosa vuestra afinidad en cuatro pilares de relación:'
              : locale === 'pt-BR'
              ? 'Em vez de um número aleatório qualquer, o CalculateLove analisa a conexão do casal em 4 pilares fundamentais:'
              : 'Rather than generating a flat, mysterious number, CalculateLove breaks down your relationship compatibility across four psychological pillars:'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-3">
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
            <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold mb-3">
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
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
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
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
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
      </section>

      {/* Related Specialized Calculators */}
      <RelatedTools currentToolId="love-calculator" onNavigate={onNavigate} locale={locale} />

      {/* Editorial Articles */}
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['how-love-calculator-works', 'what-does-love-percentage-mean', 'what-is-a-soulmate']}
        locale={locale}
      />

      {/* Comprehensive FAQ Section */}
      <FAQSection faqs={faqs} />
    </div>
  );
};
