import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedArticles } from '../components/RelatedArticles';
import { RelatedTools } from '../components/RelatedTools';
import { BLOG_POSTS } from '../data/blogData';
import { Calendar, User, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { SupportedLocale, getEquivalentPath } from '../i18n/routes';

interface Props {
  slug: string;
  onNavigate: (path: string) => void;
  locale?: SupportedLocale;
}

export const BlogPostPage: React.FC<Props> = ({ slug, onNavigate, locale = 'en' }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const homePath = getEquivalentPath('/', locale);
  const blogPath = getEquivalentPath('/blog/', locale);

  const canonicalPath =
    locale === 'es' ? `/es/blog/${slug}/` : locale === 'pt-BR' ? `/pt-br/blog/${slug}/` : `/blog/${slug}/`;

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-3 font-display">
          {locale === 'es' ? 'Artículo no encontrado' : locale === 'pt-BR' ? 'Artigo não encontrado' : 'Article Not Found'}
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          {locale === 'es'
            ? 'La guía que buscas no se encuentra o ha sido reubicada.'
            : locale === 'pt-BR'
            ? 'O artigo que você procura pode ter sido alterado ou atualizado.'
            : 'The guide you are looking for may have been moved or updated.'}
        </p>
        <button
          type="button"
          onClick={() => onNavigate(blogPath)}
          className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-xs"
        >
          {locale === 'es' ? 'Volver al Blog' : locale === 'pt-BR' ? 'Voltar ao Blog' : 'Return to Blog Index'}
        </button>
      </div>
    );
  }

  const relatedCalculatorUrl = getEquivalentPath(post.relatedCalculatorUrl, locale);

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.description,
    'author': {
      '@type': 'Person',
      'name': post.author,
    },
    'datePublished': post.date,
    'dateModified': post.updated,
    'publisher': {
      '@type': 'Organization',
      'name': 'CalculateLove',
      'url': 'https://calculatelove.online/',
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://calculatelove.online${canonicalPath}`,
    },
    'inLanguage': locale === 'es' ? 'es' : locale === 'pt-BR' ? 'pt-BR' : 'en-IN',
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title={`${post.title} | CalculateLove`}
        description={post.description}
        canonicalPath={canonicalPath}
        schemaJson={schemaJson}
        type="article"
        locale={locale}
      />

      <Breadcrumbs
        items={[
          { label: locale === 'es' ? 'Inicio' : locale === 'pt-BR' ? 'Início' : 'Home', href: homePath },
          { label: 'Blog', href: blogPath },
          { label: post.title },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Info */}
      <header className="mb-8 pt-4">
        {/* Unboxed metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
          <span className="font-semibold text-rose-600">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>Published {post.date}</span>
          <span aria-hidden="true">·</span>
          <span>Updated {post.updated}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4 text-balance">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>Written by <strong>{post.author}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Reviewed for Accuracy</span>
        </div>
      </header>

      {/* Interactive Tool Banner in Article */}
      <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/80 border border-rose-200/80 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">
            {locale === 'es' ? 'Calculadora Relacionada' : locale === 'pt-BR' ? 'Calculadora Relacionada' : 'Interactive Calculator'}
          </span>
          <p className="text-xs text-slate-700">
            {locale === 'es'
              ? '¿Quieres probar esto ahora mismo? Calcula tu porcentaje gratis.'
              : locale === 'pt-BR'
              ? 'Quer ver como isso funciona na prática? Teste agora seu casal.'
              : 'Want to test this directly? Calculate your score with our free tool.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate(relatedCalculatorUrl)}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>{locale === 'es' ? 'Abrir Calculadora' : locale === 'pt-BR' ? 'Abrir Teste' : 'Open Calculator'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
        {post.content.map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h2
                key={idx}
                className="text-lg sm:text-xl font-bold text-slate-900 font-display pt-4 mb-2"
              >
                {paragraph.replace('### ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <li key={idx} className="list-disc ml-5 pl-1 my-1">
                {paragraph.replace('- ', '')}
              </li>
            );
          }
          return (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      <hr className="my-10 border-slate-200" />

      {/* Related Section */}
      <RelatedTools currentToolId="blog" onNavigate={onNavigate} locale={locale} />
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={BLOG_POSTS.filter((p) => p.slug !== post.slug).map((p) => p.slug)}
        locale={locale}
      />
    </article>
  );
};
