import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AlertCircle, HeartHandshake } from 'lucide-react';
import { SupportedLocale, getEquivalentPath } from '../i18n/routes';

interface Props {
  onNavigate: (path: string) => void;
  locale?: SupportedLocale;
}

export const DisclaimerPage: React.FC<Props> = ({ onNavigate, locale = 'en' }) => {
  const canonicalPath = getEquivalentPath('/disclaimer/', locale);
  const homePath = getEquivalentPath('/', locale);

  const title =
    locale === 'es'
      ? 'Aviso Legal y Descargo de Responsabilidad - CalculateLove'
      : locale === 'pt-BR'
      ? 'Aviso Legal e Isenção de Responsabilidade - CalculateLove'
      : 'Disclaimer - Entertainment & Relationship Notice | CalculateLove';

  const description =
    locale === 'es'
      ? 'Las calculadoras del amor y juegos de CalculateLove tienen fines recreativos y de entretenimiento. Lee nuestro descargo de responsabilidad.'
      : locale === 'pt-BR'
      ? 'Os testes de amor e jogos do CalculateLove têm finalidade recreativa e de lazer. Leia nosso aviso legal completo.'
      : 'CalculateLove calculators and content are provided for entertainment, personal reflection, and fun. Read our full disclaimer.';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-slate-700 leading-relaxed text-sm">
      <SEOHead
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        locale={locale}
      />

      <Breadcrumbs
        items={[
          { label: locale === 'es' ? 'Inicio' : locale === 'pt-BR' ? 'Início' : 'Home', href: homePath },
          { label: locale === 'es' ? 'Aviso Legal' : locale === 'pt-BR' ? 'Aviso Legal' : 'Disclaimer' },
        ]}
        onNavigate={onNavigate}
      />

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
          {locale === 'es'
            ? 'Descargo de Responsabilidad y Aviso Legal'
            : locale === 'pt-BR'
            ? 'Aviso Legal e Isenção de Responsabilidade'
            : 'Disclaimer'}
        </h1>
        <p className="text-xs text-slate-500">
          {locale === 'es' ? 'Última actualización: Octubre 2026' : locale === 'pt-BR' ? 'Última atualização: Outubro 2026' : 'Last updated: October 2026'}
        </p>
      </header>

      <div className="space-y-6">
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 leading-relaxed">
            <strong>
              {locale === 'es'
                ? 'Finalidad Exclusiva de Entretenimiento: '
                : locale === 'pt-BR'
                ? 'Finalidade Exclusiva de Entretenimento: '
                : 'Entertainment Purpose Only: '}
            </strong>
            {locale === 'es'
              ? 'Las calculadoras, puntuaciones de compatibilidad, juegos FLAMES y análisis de Sendero de Vida en CalculateLove están diseñados únicamente con fines de esparcimiento lúdico, compartir en redes sociales y reflexión personal.'
              : locale === 'pt-BR'
              ? 'As calculadoras de amor, pontuações de compatibilidade, jogos FLAMES e análises de Caminho de Vida no CalculateLove são criados exclusivamente para diversão, compartilhamento descontraído e reflexão pessoal.'
              : 'The calculators, compatibility scores, FLAMES games, Life Path analyses, and articles on CalculateLove are intended solely for entertainment, playful social sharing, and self-reflection.'}
          </div>
        </div>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es'
              ? '1. Sin Predicción Científica ni Garantía de Destino'
              : locale === 'pt-BR'
              ? '1. Sem Previsão Científica ou Garantia de Destino'
              : '1. No Scientific Prediction or Guarantee'}
          </h2>
          <p>
            {locale === 'es'
              ? 'Ningún algoritmo informático ni calculadora online tiene la capacidad científica de determinar con certeza si dos personas se enamorarán o tendrán una relación eterna. Las relaciones reales se construyen día a día con afecto, madurez emocional, respeto y comunicación abierta.'
              : locale === 'pt-BR'
              ? 'Nenhum teste digital ou algoritmo possui a capacidade científica de determinar o sucesso ou fracasso de um relacionamento humano. Uma convivência harmoniosa depende de diálogo sincero, respeito mútuo, empatia e compromisso diário.'
              : 'No digital calculator or algorithm possesses the scientific capacity to predict whether two human beings will fall in love, stay happily married, or encounter conflict. Human relationships depend on emotional maturity, shared commitments, active empathy, financial compatibility, and continuous communication.'}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es'
              ? '2. No Sustituye Asesoramiento Profesional de Pareja'
              : locale === 'pt-BR'
              ? '2. Não Substitui Aconselhamento Terapêutico de Casal'
              : '2. Not Professional Matrimonial or Psychological Advice'}
          </h2>
          <p>
            {locale === 'es'
              ? 'Las respuestas y consejos generados no constituyen terapia psicológica, mediación conyugal ni asesoramiento profesional. Ante dificultades serias de convivencia o salud emocional, recomendamos acudir a especialistas calificados.'
              : locale === 'pt-BR'
              ? 'Os conselhos e reflexões gerados no site não substituem terapia psicológica ou orientação profissional de casal. Diante de conflitos graves, recomendamos buscar o apoio de terapeutas e psicólogos habilitados.'
              : 'The content and tools on CalculateLove do not constitute licensed marital counseling, psychiatric evaluation, or professional relationship therapy. If you or your partner are facing severe relational challenges or mental health distress, please consult a qualified counselor or family therapist.'}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es'
              ? '3. Numerología y Marcos Culturales'
              : locale === 'pt-BR'
              ? '3. Numerologia e Referências Culturais'
              : '3. Astrology & Numerology Representations'}
          </h2>
          <p>
            {locale === 'es'
              ? 'Las menciones a números y signos astrológicos se presentan como tradiciones culturales y filosóficas milenarias, no como sentencias deterministas inmutables.'
              : locale === 'pt-BR'
              ? 'As referências a caminhos de vida e traços dos signos são apresentadas sob uma ótica cultural e simbólica, sem qualquer pretensão fatalista.'
              : 'Astrological and numerological references are presented as cultural, historical, and philosophical frameworks. They must not be treated as fatalistic or scientifically verified assertions. We explicitly reject fatalistic claims regarding unavoidable marital failure or destiny.'}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es' ? '4. Responsabilidad del Usuario' : locale === 'pt-BR' ? '4. Responsabilidade do Usuário' : '4. User Responsibility'}
          </h2>
          <p>
            {locale === 'es'
              ? 'Invitamos a los usuarios a disfrutar de los resultados con ligereza y sentido del humor. CalculateLove no asume responsabilidad alguna por decisiones personales o de noviazgo tomadas con base en el uso del sitio.'
              : locale === 'pt-BR'
              ? 'Incentivamos nossos visitantes a aproveitarem os resultados com bom humor e carinho. O CalculateLove não se responsabiliza por decisões pessoais tomadas a partir dos resultados dos testes.'
              : 'Users are encouraged to treat all calculator outputs with a lighthearted spirit and constructive humor. CalculateLove accepts no liability for decisions made regarding personal relationships, dating, or marriage based on site content.'}
          </p>
        </section>
      </div>
    </div>
  );
};
