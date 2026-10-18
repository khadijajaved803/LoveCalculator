import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SupportedLocale, getEquivalentPath } from '../i18n/routes';

interface Props {
  onNavigate: (path: string) => void;
  locale?: SupportedLocale;
}

export const TermsPage: React.FC<Props> = ({ onNavigate, locale = 'en' }) => {
  const canonicalPath = getEquivalentPath('/terms/', locale);
  const homePath = getEquivalentPath('/', locale);

  const title =
    locale === 'es'
      ? 'Términos de Uso - CalculateLove'
      : locale === 'pt-BR'
      ? 'Termos de Uso - CalculateLove'
      : 'Terms of Service - CalculateLove';

  const description =
    locale === 'es'
      ? 'Consulta los términos y condiciones de uso de las calculadoras y contenidos de CalculateLove.'
      : locale === 'pt-BR'
      ? 'Confira os termos e condições de uso dos testes e conteúdos recreativos do CalculateLove.'
      : 'Review the terms and conditions governing the use of the CalculateLove relationship calculators and educational content.';

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
          { label: locale === 'es' ? 'Términos de Uso' : locale === 'pt-BR' ? 'Termos de Uso' : 'Terms of Service' },
        ]}
        onNavigate={onNavigate}
      />

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
          {locale === 'es'
            ? 'Términos y Condiciones de Uso'
            : locale === 'pt-BR'
            ? 'Termos e Condições de Uso'
            : 'Terms of Service'}
        </h1>
        <p className="text-xs text-slate-500">
          {locale === 'es' ? 'Última actualización: Octubre 2026' : locale === 'pt-BR' ? 'Última atualização: Outubro 2026' : 'Last updated: October 2026'}
        </p>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es' ? '1. Aceptación de los Términos' : locale === 'pt-BR' ? '1. Aceitação dos Termos' : '1. Acceptance of Terms'}
          </h2>
          <p>
            {locale === 'es'
              ? 'Al acceder y utilizar CalculateLove (calculatelove.online), aceptas cumplir con estos Términos de Servicio y con todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguna parte, te rogamos no utilizar el sitio.'
              : locale === 'pt-BR'
              ? 'Ao acessar ou utilizar o CalculateLove (calculatelove.online), você concorda com estes Termos de Uso e com a legislação aplicável. Se você não concordar com qualquer condição, solicitamos que não utilize a plataforma.'
              : 'By accessing or using CalculateLove (calculatelove.online), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es'
              ? '2. Naturaleza Recreativa y de Entretenimiento'
              : locale === 'pt-BR'
              ? '2. Finalidade Recreativa e de Entretenimento'
              : '2. Use License & Entertainment Nature'}
          </h2>
          <p>
            {locale === 'es'
              ? 'Todas las calculadoras, tests, algoritmos y artículos de CalculateLove son ofrecidos exclusivamente con fines lúdicos, educativos y de entretenimiento. El usuario se compromete a no utilizar este servicio para actividades ilegales o difamatorias.'
              : locale === 'pt-BR'
              ? 'Todas as ferramentas, testes de compatibilidade e artigos do CalculateLove são fornecidos estritamente para entretenimento e descontração. Você concorda em não utilizar a plataforma para propósitos ilegais ou ofensivos.'
              : 'All tools, tests, calculators, and articles on CalculateLove are provided strictly for recreational, entertainment, and educational purposes. You agree not to use the service for any unlawful purpose or to harass or defame any individual.'}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es' ? '3. Propiedad Intelectual' : locale === 'pt-BR' ? '3. Propriedade Intelectual' : '3. Intellectual Property'}
          </h2>
          <p>
            {locale === 'es'
              ? 'El código fuente, arquitectura web, diseño visual, logotipos y textos originales de CalculateLove están protegidos por leyes de derechos de autor y propiedad intelectual.'
              : locale === 'pt-BR'
              ? 'A arquitetura do software, design visual, textos e elementos originais da marca CalculateLove são protegidos pelas leis de direitos autorais e propriedade intelectual.'
              : 'The software architecture, original articles, brand assets, and custom styling of CalculateLove are protected by applicable copyright and trademark law.'}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es' ? '4. Limitación de Responsabilidad' : locale === 'pt-BR' ? '4. Limitação de Responsabilidade' : '4. Limitation of Liability'}
          </h2>
          <p>
            {locale === 'es'
              ? 'CalculateLove y sus desarrolladores no asumen responsabilidad alguna por decisiones personales, discusiones de pareja o situaciones emocionales derivadas del uso de las calculadoras.'
              : locale === 'pt-BR'
              ? 'O CalculateLove e seus administradores não se responsabilizam por decisões pessoais, discussões de relacionamento ou reações emocionais motivadas pelos resultados dos testes.'
              : 'CalculateLove and its operators shall not be held liable for any decisions, interpersonal conflicts, or emotional outcomes resulting from the use of its calculators or content.'}
          </p>
        </section>
      </div>
    </div>
  );
};
