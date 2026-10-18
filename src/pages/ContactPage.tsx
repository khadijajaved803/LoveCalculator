import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Mail, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { SupportedLocale, getEquivalentPath } from '../i18n/routes';
import { getTranslations } from '../i18n/translations';

interface Props {
  onNavigate: (path: string) => void;
  locale?: SupportedLocale;
}

export const ContactPage: React.FC<Props> = ({ onNavigate, locale = 'en' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = getTranslations(locale);
  const canonicalPath = getEquivalentPath('/contact/', locale);
  const homePath = getEquivalentPath('/', locale);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const title =
    locale === 'es'
      ? 'Contacto - CalculateLove: Sugerencias y Consultas'
      : locale === 'pt-BR'
      ? 'Contato - CalculateLove: Sugestões e Dúvidas'
      : 'Contact CalculateLove - Editorial Feedback & Suggestions';

  const description =
    locale === 'es'
      ? 'Ponte en contacto con el equipo de CalculateLove para consultas, sugerencias de nuevas herramientas de pareja o reportes técnicos.'
      : locale === 'pt-BR'
      ? 'Fale com a equipe do CalculateLove para dúvidas, sugestões de novos testes para casais ou dúvidas sobre nossos algoritmos.'
      : 'Get in touch with the CalculateLove team for editorial questions, feature suggestions, calculator feedback, or partnership inquiries.';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        locale={locale}
      />

      <Breadcrumbs
        items={[
          { label: locale === 'es' ? 'Inicio' : locale === 'pt-BR' ? 'Início' : 'Home', href: homePath },
          { label: locale === 'es' ? 'Contacto' : locale === 'pt-BR' ? 'Contato' : 'Contact Us' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
          {locale === 'es'
            ? 'Contacta con el Equipo de CalculateLove'
            : locale === 'pt-BR'
            ? 'Fale com a Equipe do CalculateLove'
            : 'Contact the CalculateLove Team'}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {locale === 'es'
            ? 'Agradecemos tus sugerencias, preguntas sobre nuestros algoritmos o ideas para nuevas funciones.'
            : locale === 'pt-BR'
            ? 'Adoramos receber seu feedback, sugestões de novas calculadoras e ideias de melhorias.'
            : 'We welcome your feedback, calculator feature suggestions, or mathematical inquiries.'}
        </p>
      </div>

      <div className="max-w-lg mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="cntName"
                className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                {locale === 'es' ? 'Tu Nombre' : locale === 'pt-BR' ? 'Seu Nome' : 'Your Name'}
              </label>
              <input
                id="cntName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === 'es' ? 'Carlos Gómez' : locale === 'pt-BR' ? 'Lucas Silva' : 'Aarav Sharma'}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cntEmail"
                className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                {locale === 'es' ? 'Correo Electrónico' : locale === 'pt-BR' ? 'Seu E-mail' : 'Your Email Address'}
              </label>
              <input
                id="cntEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contacto@ejemplo.com"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cntSubject"
                className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                {locale === 'es' ? 'Motivo' : locale === 'pt-BR' ? 'Assunto' : 'Topic'}
              </label>
              <select
                id="cntSubject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px]"
              >
                <option value="Feedback">
                  {locale === 'es' ? 'Opinión o sugerencia' : locale === 'pt-BR' ? 'Feedback sobre calculadora' : 'Calculator Feedback'}
                </option>
                <option value="New Feature">
                  {locale === 'es' ? 'Sugerir nueva herramienta' : locale === 'pt-BR' ? 'Sugerir novo teste ou recurso' : 'Suggest New Tool'}
                </option>
                <option value="Bug Report">
                  {locale === 'es' ? 'Reportar un error' : locale === 'pt-BR' ? 'Reportar erro ou problema' : 'Report a Bug / Issue'}
                </option>
                <option value="Partnership">
                  {locale === 'es' ? 'Contacto editorial / Colaboración' : locale === 'pt-BR' ? 'Parceria ou contato editorial' : 'Editorial / Partnership'}
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="cntMessage"
                className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                {locale === 'es' ? 'Mensaje' : locale === 'pt-BR' ? 'Mensagem' : 'Message'}
              </label>
              <textarea
                id="cntMessage"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  locale === 'es'
                    ? '¿Cómo podemos mejorar CalculateLove para ti?'
                    : locale === 'pt-BR'
                    ? 'Como podemos deixar o CalculateLove ainda melhor?'
                    : 'How can we make CalculateLove better for you?'
                }
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>{locale === 'es' ? 'Enviar Mensaje' : locale === 'pt-BR' ? 'Enviar Mensagem' : 'Send Message'}</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {locale === 'es' ? '¡Mensaje Recibido!' : locale === 'pt-BR' ? 'Mensagem Recebida!' : 'Message Received!'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              {locale === 'es'
                ? `Gracias por escribirnos, ${name}. Nuestro equipo revisa todos los mensajes y responde en 1–2 días hábiles.`
                : locale === 'pt-BR'
                ? `Muito obrigado pelo contato, ${name}! Nossa equipe lê todas as sugestões com carinho.`
                : `Thank you for contacting us, ${name}. Our editorial team reviews suggestions and responds within 1–2 business days.`}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="text-xs text-rose-600 font-semibold hover:underline"
            >
              {locale === 'es' ? 'Enviar otro mensaje' : locale === 'pt-BR' ? 'Enviar outra mensagem' : 'Send another note'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
