import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Heart, Users, Sparkles } from 'lucide-react';
import { SupportedLocale, getEquivalentPath } from '../i18n/routes';
import { getTranslations } from '../i18n/translations';

interface Props {
  onNavigate: (path: string) => void;
  locale?: SupportedLocale;
}

export const AboutPage: React.FC<Props> = ({ onNavigate, locale = 'en' }) => {
  const t = getTranslations(locale);
  const canonicalPath = getEquivalentPath('/about/', locale);
  const homePath = getEquivalentPath('/', locale);
  const contactPath = getEquivalentPath('/contact/', locale);

  const title =
    locale === 'es'
      ? 'Sobre Nosotros - CalculateLove: Herramientas Confiables de Pareja'
      : locale === 'pt-BR'
      ? 'Sobre Nós - CalculateLove: Ferramentas de Casal e Afetividade'
      : "About CalculateLove - India's Trusted Relationship Tools Platform";

  const description =
    locale === 'es'
      ? 'Conoce la misión de CalculateLove: cálculos 100% privados en el navegador, algoritmos deterministas y reflexiones románticas positivas para parejas.'
      : locale === 'pt-BR'
      ? 'Conheça a missão do CalculateLove: testes 100% privados no navegador, algoritmos determinísticos e testes descontraídos de afinidade para casais.'
      : 'Learn about CalculateLove, our commitment to privacy, deterministic algorithms, and positive relationship reflections for couples and friends across India.';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-slate-700">
      <SEOHead
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        locale={locale}
      />

      <Breadcrumbs
        items={[
          { label: locale === 'es' ? 'Inicio' : locale === 'pt-BR' ? 'Início' : 'Home', href: homePath },
          { label: locale === 'es' ? 'Sobre Nosotros' : locale === 'pt-BR' ? 'Sobre Nós' : 'About Us' },
        ]}
        onNavigate={onNavigate}
      />

      <header className="mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
          {locale === 'es'
            ? 'Sobre CalculateLove'
            : locale === 'pt-BR'
            ? 'Sobre o CalculateLove'
            : 'About CalculateLove'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {locale === 'es'
            ? 'Creamos calculadoras de amor rápidas, deterministas y 100% privadas para parejas y amigos de todo el mundo.'
            : locale === 'pt-BR'
            ? 'Criamos calculadoras de amor rápidas, determinísticas e 100% privadas para casais e amigos no Brasil e no mundo.'
            : 'Building fast, private, and deterministic relationship compatibility calculators tailored for Indian and global audiences.'}
        </p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed">
        <section className="p-6 rounded-3xl bg-white border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 font-display mb-3">
            {locale === 'es'
              ? 'Nuestra Misión: Calculadoras Limpias, Claras y Privadas'
              : locale === 'pt-BR'
              ? 'Nossa Missão: Calculadoras Claras, Rápidas e Privadas'
              : 'Our Mission: Clean, Honest & Private Calculators'}
          </h2>
          <p className="mb-3">
            {locale === 'es'
              ? 'La mayoría de calculadoras del amor en internet muestran publicidad invasiva, resultados aleatorios inconsistentes y falsas promesas. CalculateLove nació como una alternativa: una plataforma limpia, ultrarrápida y transparente.'
              : locale === 'pt-BR'
              ? 'A maioria dos testes de amor na internet possui anúncios invasivos, porcentagens que mudam a cada clique e promessas irreais. O CalculateLove foi criado para oferecer uma experiência leve, transparente e divertida.'
              : 'Most online love calculators on the internet are plagued with intrusive ads, layout jumps, volatile random number generators, and deceptive claims. CalculateLove was created to offer an alternative: a clean, lightning-fast, and trustworthy suite of relationship tools.'}
          </p>
          <p>
            {locale === 'es'
              ? 'Ya sea para revivir la nostalgia escolar con el juego FLAMES o evaluar la resonancia armónica de dos nombres, nuestras herramientas fomentan la complicidad, las sonrisas y el diálogo sincero en pareja.'
              : locale === 'pt-BR'
              ? 'Seja para relembrar os tempos de escola com o clássico jogo FLAMES ou testar a harmonia fonética de dois nomes, nossas ferramentas foram pensadas para trazer leveza, sorrisos e conexão sincera.'
              : 'Whether you want to revisit the classic school nostalgia of the FLAMES game or explore the phonetic resonance of two names, our calculators are built to bring warmth, laughter, and thoughtful reflection into your connections.'}
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
            <h3 className="font-bold text-slate-900 mb-1">
              {locale === 'es' ? '100% Privado' : locale === 'pt-BR' ? '100% Privado' : '100% Privacy'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'es'
                ? 'Los algoritmos se ejecutan dentro de tu navegador web. Jamás guardamos ni compartimos tus nombres ni fechas.'
                : locale === 'pt-BR'
                ? 'Os cálculos rodam inteiramente no seu navegador. Nunca salvamos nem compartilhamos nomes ou datas.'
                : 'Calculations run entirely in your web browser. We never store or sell your names or dates of birth.'}
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <Sparkles className="w-5 h-5 text-rose-500 mb-2" />
            <h3 className="font-bold text-slate-900 mb-1">
              {locale === 'es' ? 'Lógica Determinista' : locale === 'pt-BR' ? 'Lógica Determinística' : 'Deterministic Logic'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'es'
                ? 'Los mismos nombres generan siempre el mismo porcentaje exacto. Sin fluctuaciones caprichosas.'
                : locale === 'pt-BR'
                ? 'Os mesmos nomes sempre geram exatamente a mesma pontuação. Sem sorteios aleatórios.'
                : 'The same names always generate the identical result. No random shifts or deceptive trickery.'}
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <Heart className="w-5 h-5 text-indigo-600 mb-2" />
            <h3 className="font-bold text-slate-900 mb-1">
              {locale === 'es' ? 'Enfoque Saludable' : locale === 'pt-BR' ? 'Visão Saudável' : 'Healthy Perspective'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'es'
                ? 'Distinguimos el juego y la diversión del compromiso diario real que hace florecer una relación.'
                : locale === 'pt-BR'
                ? 'Diferenciamos o entretenimento leve do trabalho diário e carinhoso que constrói um relacionamento duradouro.'
                : 'We clearly distinguish playful entertainment calculations from the real, conscious work of building relationships.'}
            </p>
          </div>
        </section>

        <section className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 font-display mb-2">
            {locale === 'es'
              ? 'Integridad Editorial y Rigor'
              : locale === 'pt-BR'
              ? 'Integridade e Rigor dos Conteúdos'
              : 'Editorial & Mathematical Integrity'}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {locale === 'es'
              ? 'Nuestras guías y herramientas son desarrolladas por investigadores culturales y programadores, celebrando el amor sincero, la complicidad entre amigos y la belleza de caminar juntos.'
              : locale === 'pt-BR'
              ? 'Nossos artigos e calculadoras são desenvolvidos com cuidado por redatores e programadores apaixonados por tecnologia, valorizando o diálogo, a empatia e o carinho mútuo.'
              : 'Our articles and tools are crafted by relationship writers, cultural researchers, and software engineers. We celebrate the rich tapestry of modern relationships.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate(contactPath)}
            className="text-xs text-rose-600 font-semibold hover:underline"
          >
            {locale === 'es'
              ? '¿Tienes sugerencias o comentarios? Escríbenos →'
              : locale === 'pt-BR'
              ? 'Tem alguma sugestão ou dúvida? Fale conosco →'
              : 'Have feedback or suggestions? Contact our team →'}
          </button>
        </section>
      </div>
    </div>
  );
};
