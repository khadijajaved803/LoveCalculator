import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';
import { FAQSection } from '../components/FAQSection';
import { Sparkles, Moon, Sun, ArrowRight, ShieldCheck } from 'lucide-react';
import astrologyImage from '../assets/images/astrology_zodiac_harmony_1790774231196.jpg';
import { SupportedLocale, getEquivalentPath } from '../i18n/routes';

interface Props {
  onNavigate: (path: string) => void;
  locale?: SupportedLocale;
}

export const AstrologyPage: React.FC<Props> = ({ onNavigate, locale = 'en' }) => {
  const canonicalPath = getEquivalentPath('/astrology/', locale);
  const homePath = getEquivalentPath('/', locale);
  const dobPath = getEquivalentPath('/love-calculator-by-date-of-birth/', locale);

  const faqsEn = [
    {
      question: 'What is the difference between Western Sun Sign compatibility and Vedic Kundli Milan?',
      answer:
        'Western astrology relies predominantly on the Sun sign (based on the solar month of birth). Vedic astrology (Jyotish) prioritizes the Moon sign (Chandra Rashi), birth star (Nakshatra), and Ashta Kuta (the 36 Guna matching system).',
    },
    {
      question: 'Will CalculateLove add Kundli and Rashi compatibility tools?',
      answer:
        'Yes. We are currently architecting vetted astrological formulas based on classic texts so that future tools provide transparent, authentic calculations without fabricated assertions.',
    },
  ];

  const faqsEs = [
    {
      question: '¿Cómo influyen los elementos del zodíaco en la química de pareja?',
      answer:
        'Fuego, Tierra, Aire y Agua representan diferentes temperamentos emocionales. El Fuego aporta entusiasmo y pasión; la Tierra estabilidad y prudencia; el Aire diálogo e ideas; y el Agua empatía y profundidad emocional.',
    },
    {
      question: '¿La compatibilidad astral garantiza el éxito de una relación?',
      answer:
        'No. La astrología ofrece una mirada simbólica y psicológica para comprender diferencias de carácter. El éxito real depende de la paciencia, el respeto mutuo y la comunicación abierta entre ambos.',
    },
  ];

  const faqsPt = [
    {
      question: 'Como os quatro elementos astrológicos influenciam o casal?',
      answer:
        'Fogo, Terra, Ar e Água simbolizam energias complementares. O Fogo traz paixão e iniciativa; a Terra traz segurança prática; o Ar estimula a conversa e o companheirismo; e a Água aprofunda o acolhimento emocional.',
    },
    {
      question: 'A compatibilidade dos signos define o futuro do namoro?',
      answer:
        'A astrologia é uma lente de autoconhecimento e reflexão, não uma sentença fechada. O futuro de qualquer união depende do diálogo, respeito e carinho diário dos parceiros.',
    },
  ];

  const faqs = locale === 'es' ? faqsEs : locale === 'pt-BR' ? faqsPt : faqsEn;

  const zodiacSigns = [
    { name: locale === 'es' ? 'Aries' : locale === 'pt-BR' ? 'Áries' : 'Aries (Mesha)', element: locale === 'es' ? 'Fuego' : locale === 'pt-BR' ? 'Fogo' : 'Fire', dates: 'Mar 21 - Apr 19' },
    { name: locale === 'es' ? 'Tauro' : locale === 'pt-BR' ? 'Touro' : 'Taurus (Vrishabha)', element: locale === 'es' ? 'Tierra' : locale === 'pt-BR' ? 'Terra' : 'Earth', dates: 'Apr 20 - May 20' },
    { name: locale === 'es' ? 'Géminis' : locale === 'pt-BR' ? 'Gêmeos' : 'Gemini (Mithuna)', element: locale === 'es' ? 'Aire' : locale === 'pt-BR' ? 'Ar' : 'Air', dates: 'May 21 - Jun 20' },
    { name: locale === 'es' ? 'Cáncer' : locale === 'pt-BR' ? 'Câncer' : 'Cancer (Karka)', element: locale === 'es' ? 'Agua' : locale === 'pt-BR' ? 'Água' : 'Water', dates: 'Jun 21 - Jul 22' },
    { name: locale === 'es' ? 'Leo' : locale === 'pt-BR' ? 'Leão' : 'Leo (Simha)', element: locale === 'es' ? 'Fuego' : locale === 'pt-BR' ? 'Fogo' : 'Fire', dates: 'Jul 23 - Aug 22' },
    { name: locale === 'es' ? 'Virgo' : locale === 'pt-BR' ? 'Virgem' : 'Virgo (Kanya)', element: locale === 'es' ? 'Tierra' : locale === 'pt-BR' ? 'Terra' : 'Earth', dates: 'Aug 23 - Sep 22' },
    { name: locale === 'es' ? 'Libra' : locale === 'pt-BR' ? 'Libra' : 'Libra (Tula)', element: locale === 'es' ? 'Aire' : locale === 'pt-BR' ? 'Ar' : 'Air', dates: 'Sep 23 - Oct 22' },
    { name: locale === 'es' ? 'Escorpio' : locale === 'pt-BR' ? 'Escorpião' : 'Scorpio (Vrishchika)', element: locale === 'es' ? 'Agua' : locale === 'pt-BR' ? 'Água' : 'Water', dates: 'Oct 23 - Nov 21' },
    { name: locale === 'es' ? 'Sagitario' : locale === 'pt-BR' ? 'Sagitário' : 'Sagittarius (Dhanu)', element: locale === 'es' ? 'Fuego' : locale === 'pt-BR' ? 'Fogo' : 'Fire', dates: 'Nov 22 - Dec 21' },
    { name: locale === 'es' ? 'Capricornio' : locale === 'pt-BR' ? 'Capricórnio' : 'Capricorn (Makara)', element: locale === 'es' ? 'Tierra' : locale === 'pt-BR' ? 'Terra' : 'Earth', dates: 'Dec 22 - Jan 19' },
    { name: locale === 'es' ? 'Acuario' : locale === 'pt-BR' ? 'Aquário' : 'Aquarius (Kumbha)', element: locale === 'es' ? 'Aire' : locale === 'pt-BR' ? 'Ar' : 'Air', dates: 'Jan 20 - Feb 18' },
    { name: locale === 'es' ? 'Piscis' : locale === 'pt-BR' ? 'Peixes' : 'Pisces (Meena)', element: locale === 'es' ? 'Agua' : locale === 'pt-BR' ? 'Água' : 'Water', dates: 'Feb 19 - Mar 20' },
  ];

  const title =
    locale === 'es'
      ? 'Astrología y Compatibilidad de Signos del Zodíaco | CalculateLove'
      : locale === 'pt-BR'
      ? 'Astrologia e Compatibilidade de Signos do Zodíaco | CalculateLove'
      : 'Astrology Love Calculator & Zodiac Compatibility Hub | CalculateLove';

  const description =
    locale === 'es'
      ? 'Descubre la compatibilidad elemental de los signos del zodíaco en el amor. Fuego, Tierra, Aire y Agua explicados con madurez y calidez.'
      : locale === 'pt-BR'
      ? 'Descubra a harmonia elemental dos signos no amor. Veja a sinergia entre Fogo, Terra, Ar e Água para o relacionamento do casal.'
      : 'Explore astrology love compatibility, zodiac elements, and Rashi relationship dynamics with CalculateLove. Grounded, authentic, and educational insights.';

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': title,
    'url': `https://calculatelove.online${canonicalPath}`,
    'description': description,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        schemaJson={schemaJson}
        locale={locale}
      />

      <Breadcrumbs
        items={[
          { label: locale === 'es' ? 'Inicio' : locale === 'pt-BR' ? 'Início' : 'Home', href: homePath },
          { label: locale === 'es' ? 'Astrología' : locale === 'pt-BR' ? 'Astrologia' : 'Astrology Hub' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          {locale === 'es'
            ? 'Guía de Astrología y Compatibilidad Zodiacal'
            : locale === 'pt-BR'
            ? 'Guia de Astrologia e Harmonia dos Signos'
            : 'Astrology & Zodiac Compatibility Hub'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {locale === 'es'
            ? 'Comprende las afinidades elementales, arquetipos planetarios y dinámicas de pareja sin dogmas fatalistas.'
            : locale === 'pt-BR'
            ? 'Entenda as afinidades elementares e a dinâmica cósmica do casal de forma leve e acolhedora.'
            : 'Understanding elemental affinities, planetary archetypes, and celestial relationship dynamics without superstitious dogma.'}
        </p>
      </div>

      {/* Featured Banner with generated celestial art */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 text-white shadow-sm mb-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="p-8 sm:p-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>{locale === 'es' ? 'Arquetipos Cósmicos' : locale === 'pt-BR' ? 'Arquétipos Cósmicos' : 'Cosmic Archetypes'}</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display leading-tight">
              {locale === 'es'
                ? 'Armonía Elemental: Fuego, Tierra, Aire y Agua'
                : locale === 'pt-BR'
                ? 'Harmonia Elemental: Fogo, Terra, Ar e Água'
                : 'Elemental Harmony: Fire, Earth, Air & Water'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {locale === 'es'
                ? 'La afinidad zodiacal explora cómo interactúan vuestras energías base: el Fuego inspira al Aire, la Tierra sostiene al Agua y los contrastes enriquecen el crecimiento mutuo.'
                : locale === 'pt-BR'
                ? 'A afinidade dos signos mostra como suas energias se complementam: o Fogo acende o Ar, a Terra dá estabilidade à Água e as diferenças ensinam a amar.'
                : 'Astrological compatibility evaluates how your core elemental energies interact. Fire fuels Air, Earth stabilizes Water, and complementary balances foster emotional growth.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate(dobPath)}
                className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-slate-100 transition-colors inline-flex items-center gap-2"
              >
                <span>{locale === 'es' ? 'Probar por Fecha de Nacimiento' : locale === 'pt-BR' ? 'Testar por Data de Nascimento' : 'Try Date of Birth Tool'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="h-64 md:h-full aspect-4/3 overflow-hidden bg-slate-800">
            <img
              src={astrologyImage}
              alt="Astrological constellation harmony"
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Zodiac Elements Overview */}
      <section className="mb-14">
        <h2 className="text-lg font-bold text-slate-900 font-display mb-4">
          {locale === 'es' ? 'Signos del Zodíaco y sus Elementos' : locale === 'pt-BR' ? 'Signos do Zodíaco e Elementos' : 'Zodiac & Rashi Overview'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
          {zodiacSigns.map((z) => (
            <div
              key={z.name}
              className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-rose-200 transition-colors"
            >
              <span className="font-bold text-slate-900 block truncate">{z.name}</span>
              <span className="text-[11px] text-rose-600 block mt-0.5">{z.element}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{z.dates}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology & Integrity Note */}
      <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 leading-relaxed mb-12">
        <h3 className="font-bold mb-1 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>{locale === 'es' ? 'Compromiso con la Transparencia y el Respeto' : locale === 'pt-BR' ? 'Compromisso com o Respeito e a Transparência' : 'Our Commitment to Astrological Transparency'}</span>
        </h3>
        <p>
          {locale === 'es'
            ? 'En CalculateLove abordamos la astrología con rigor cultural e inspiración constructiva. Jamás emitimos vaticinios negativos que condicionen una relación. Cada pareja crea su propio destino.'
            : locale === 'pt-BR'
            ? 'No CalculateLove enxergamos a astrologia como ferramenta de acolhimento e reflexão, nunca como imposição fatalista. O amor verdadeiro é nutrido pelas escolhas e pelo afeto de cada dia.'
            : 'CalculateLove respects the cultural heritage of astrological traditions. We do not invent arbitrary rules to claim that couples are destined to fail. Astrological reflections should inspire mutual understanding, emotional maturity, and compassion.'}
        </p>
      </div>

      <RelatedTools currentToolId="astrology" onNavigate={onNavigate} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={['love-compatibility-by-date-of-birth', 'what-does-love-percentage-mean']}
      />
      <FAQSection faqs={faqs} />
    </div>
  );
};
