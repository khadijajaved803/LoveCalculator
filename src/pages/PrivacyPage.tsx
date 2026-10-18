import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Lock } from 'lucide-react';
import { SupportedLocale, getEquivalentPath } from '../i18n/routes';

interface Props {
  onNavigate: (path: string) => void;
  locale?: SupportedLocale;
}

export const PrivacyPage: React.FC<Props> = ({ onNavigate, locale = 'en' }) => {
  const canonicalPath = getEquivalentPath('/privacy-policy/', locale);
  const homePath = getEquivalentPath('/', locale);
  const contactPath = getEquivalentPath('/contact/', locale);

  const title =
    locale === 'es'
      ? 'Política de Privacidad - CalculateLove: 100% Privado en tu Navegador'
      : locale === 'pt-BR'
      ? 'Política de Privacidade - CalculateLove: 100% Seguro no seu Navegador'
      : 'Privacy Policy - CalculateLove';

  const description =
    locale === 'es'
      ? 'Descubre cómo CalculateLove protege tu intimidad: cálculos 100% locales en tu navegador, sin guardar nombres ni fechas en ningún servidor.'
      : locale === 'pt-BR'
      ? 'Saiba como o CalculateLove protege sua privacidade: cálculos 100% locais no seu navegador, sem armazenamento de nomes ou dados pessoais.'
      : 'Learn how CalculateLove protects user privacy with 100% client-side calculations and zero name storage.';

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
          { label: locale === 'es' ? 'Política de Privacidad' : locale === 'pt-BR' ? 'Política de Privacidade' : 'Privacy Policy' },
        ]}
        onNavigate={onNavigate}
      />

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
          {locale === 'es'
            ? 'Política de Privacidad'
            : locale === 'pt-BR'
            ? 'Política de Privacidade'
            : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-slate-500">
          {locale === 'es' ? 'Última actualización: Octubre 2026' : locale === 'pt-BR' ? 'Última atualização: Outubro 2026' : 'Last updated: October 2026'}
        </p>
      </header>

      <div className="space-y-6">
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 leading-relaxed">
            <strong>
              {locale === 'es'
                ? 'Compromiso Central de Privacidad: '
                : locale === 'pt-BR'
                ? 'Compromisso Central de Privacidade: '
                : 'Key Privacy Commitment: '}
            </strong>
            {locale === 'es'
              ? 'Todos los cálculos (nombres, fechas de nacimiento, preguntas de pareja) se ejecutan directamente en tu navegador web. No guardamos ni transmitimos tus datos a ningún servidor.'
              : locale === 'pt-BR'
              ? 'Todos os testes (nomes, datas de aniversário e respostas) são processados diretamente no navegador do seu dispositivo. Zero dados são enviados ou salvos em servidores externos.'
              : 'All calculator operations (names, birthdays, questions) run entirely within your local web browser. We do not store, harvest, or transmit your names to any server.'}
          </div>
        </div>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es'
              ? '1. Datos que NO recopilamos'
              : locale === 'pt-BR'
              ? '1. Dados que NÃO coletamos'
              : '1. Information We Do Not Collect'}
          </h2>
          <p>
            {locale === 'es'
              ? 'Al ingresar tu nombre o el de tu pareja, el cálculo se ejecuta mediante código JavaScript en tu propio dispositivo. No mantenemos bases de datos de nombres, historiales de cálculo ni identidades.'
              : locale === 'pt-BR'
              ? 'Ao preencher seu nome e o de seu par, a fórmula roda localmente em JavaScript no seu próprio dispositivo. Não mantemos banco de dados de nomes de usuários ou histórico de testes.'
              : 'When you enter your name, your partner’s name, or dates of birth into CalculateLove, this information is processed locally via client-side JavaScript. We do not maintain any database of user names, match histories, or personal identities.'}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es'
              ? '2. Métricas y Rendimiento Técnico'
              : locale === 'pt-BR'
              ? '2. Métricas e Desempenho Técnico'
              : '2. Analytics & Cookies'}
          </h2>
          <p>
            {locale === 'es'
              ? 'Para asegurar la estabilidad técnica y la velocidad de carga, registramos diagnósticos generales y anónimos (tiempos de respuesta, navegador). No usamos cookies de seguimiento invasivas.'
              : locale === 'pt-BR'
              ? 'Para acompanhar o tempo de carregamento e a estabilidade da página, podemos analisar dados técnicos anônimos e agregados. Não utilizamos cookies invasivos de rastreamento.'
              : 'To monitor website reliability and technical performance, we may collect aggregated, non-personally identifiable diagnostic data (such as page load times, browser type, and general geographic country). We do not deploy invasive cross-site tracking cookies.'}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es'
              ? '3. Compartir en WhatsApp y Redes Sociales'
              : locale === 'pt-BR'
              ? '3. Compartilhamento no WhatsApp e Redes'
              : '3. Third-Party Links & Sharing'}
          </h2>
          <p>
            {locale === 'es'
              ? 'Al tocar los botones de compartir tarjeta en WhatsApp o guardar la imagen, la interacción se realiza directamente con la app de mensajería en tu teléfono. No monitorizamos tus conversaciones.'
              : locale === 'pt-BR'
              ? 'Ao compartilhar o cartão de resultado no WhatsApp ou baixar a imagem PNG, a ação ocorre no próprio aplicativo de mensagens do seu celular. Não temos acesso a com quem você compartilha.'
              : 'When you choose to share your score via WhatsApp or native share triggers, you are interacting directly with third-party messaging services under their respective terms. We do not track who you share results with.'}
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {locale === 'es'
              ? '4. Contacto sobre Privacidad'
              : locale === 'pt-BR'
              ? '4. Contato sobre Privacidade'
              : '4. Contact Concerning Privacy'}
          </h2>
          <p>
            {locale === 'es'
              ? 'Si tienes dudas acerca de nuestras políticas de privacidad, no dudes en escribirnos en nuestra '
              : locale === 'pt-BR'
              ? 'Caso tenha qualquer dúvida sobre a nossa política de privacidade, fale conosco na nossa '
              : 'If you have questions regarding this privacy policy, please reach out via our '}
            <button
              type="button"
              onClick={() => onNavigate(contactPath)}
              className="text-rose-600 underline font-medium"
            >
              {locale === 'es' ? 'página de contacto' : locale === 'pt-BR' ? 'página de contato' : 'Contact page'}
            </button>.
          </p>
        </section>
      </div>
    </div>
  );
};
