import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BLOG_POSTS } from '../data/blogData';
import { BookOpen, ArrowRight, Search, Calendar, User } from 'lucide-react';
import { SupportedLocale, getEquivalentPath } from '../i18n/routes';

interface Props {
  onNavigate: (path: string) => void;
  locale?: SupportedLocale;
}

export const BlogIndexPage: React.FC<Props> = ({ onNavigate, locale = 'en' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const canonicalPath = getEquivalentPath('/blog/', locale);
  const homePath = getEquivalentPath('/', locale);

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const title =
    locale === 'es'
      ? 'Blog y Guías de Pareja: Calculadora del Amor y Consejos | CalculateLove'
      : locale === 'pt-BR'
      ? 'Blog e Guias de Relacionamento: Calculadora do Amor e Dicas | CalculateLove'
      : 'Relationship Guides & Compatibility Blog | CalculateLove';

  const description =
    locale === 'es'
      ? 'Explora artículos completos sobre cómo funciona la calculadora del amor, reglas del juego FLAMES, numerología de pareja y amor saludable.'
      : locale === 'pt-BR'
      ? 'Confira artigos e guias práticos sobre a calculadora do amor, regras do jogo FLAMES, numerologia a dois e conexão afetiva saudável.'
      : 'Explore in-depth guides on how love calculators work, FLAMES rules, life path numerology, and modern relationship compatibility on CalculateLove.';

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': title,
    'url': `https://calculatelove.online${canonicalPath}`,
    'description': description,
  };

  const getPostUrl = (slug: string) => {
    if (locale === 'es') return `/es/blog/${slug}/`;
    if (locale === 'pt-BR') return `/pt-br/blog/${slug}/`;
    return `/blog/${slug}/`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
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
          { label: 'Blog' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3 text-balance">
          {locale === 'es'
            ? 'Guías de Relación y Artículos de Pareja'
            : locale === 'pt-BR'
            ? 'Guias de Relacionamento e Artigos de Casal'
            : 'Relationship Guides & Compatibility Articles'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {locale === 'es'
            ? 'Consejos sinceros sobre psicología de pareja, resonancia de nombres, historia de FLAMES y convivencia sana.'
            : locale === 'pt-BR'
            ? 'Dicas e reflexões sobre convivência a dois, ressonância fonética de nomes e harmonia no relacionamento.'
            : 'Grounded insights on relationship psychology, name resonance, the history of FLAMES, and modern matrimonial balance.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'All' ? (locale === 'es' ? 'Todos' : locale === 'pt-BR' ? 'Todos' : 'All') : cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'es' ? 'Buscar artículos...' : locale === 'pt-BR' ? 'Buscar artigos...' : 'Search articles...'}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs placeholder:text-slate-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            tabIndex={0}
            role="button"
            onClick={() => onNavigate(getPostUrl(post.slug))}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate(getPostUrl(post.slug))}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Unboxed metadata with typographic separators */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="font-semibold text-rose-600">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-2 leading-snug font-display">
                {post.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {post.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">By {post.author}</span>
              <span className="font-semibold text-rose-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {locale === 'es' ? 'Leer Guía' : locale === 'pt-BR' ? 'Ler Guia' : 'Read Article'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-700 font-medium">
            {locale === 'es' ? 'No se encontraron artículos con esa búsqueda.' : locale === 'pt-BR' ? 'Nenhum artigo encontrado para a busca.' : 'No matching articles found.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs text-rose-600 font-semibold hover:underline"
          >
            {locale === 'es' ? 'Reiniciar filtros' : locale === 'pt-BR' ? 'Limpar filtros' : 'Reset Filters'}
          </button>
        </div>
      )}
    </div>
  );
};
