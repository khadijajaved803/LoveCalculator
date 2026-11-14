import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedArticles } from '../components/RelatedArticles';
import { RelatedTools } from '../components/RelatedTools';
import { BLOG_POSTS } from '../data/blogData';
import soulmateWhatImage from '../assets/images/soulmate-what-is-a-soulmate.webp';
import soulmateSignsImage from '../assets/images/soulmate-signs-of-a-soulmate.webp';
import lovePercentageWorkedOutImage from '../assets/images/love-percentage-how-it-is-worked-out.webp';
import lovePercentageAppsImage from '../assets/images/love-percentage-apps.webp';
import birthdayCompatibilityImage from '../assets/images/birthday-compatibility-calendars.webp';
import lifePathNumbersImage from '../assets/images/life-path-numbers-circle.webp';
import { Calendar, User, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  slug: string;
  onNavigate: (path: string) => void;
}

interface BlogImage {
  src: string;
  width: number;
  height: number;
  figureClass: string;
}

// Images embedded in blog content via `![alt text](filename.webp)` lines.
// A filename not in this map renders nothing, never a broken image.
const BLOG_IMAGES: Record<string, BlogImage> = {
  'soulmate-what-is-a-soulmate.webp': { src: soulmateWhatImage, width: 1200, height: 800, figureClass: 'my-8' },
  'soulmate-signs-of-a-soulmate.webp': { src: soulmateSignsImage, width: 800, height: 1600, figureClass: 'mx-auto w-full max-w-[300px] my-8' },
  'love-percentage-how-it-is-worked-out.webp': { src: lovePercentageWorkedOutImage, width: 1200, height: 800, figureClass: 'my-8' },
  'love-percentage-apps.webp': { src: lovePercentageAppsImage, width: 1000, height: 1000, figureClass: 'mx-auto w-full max-w-[420px] my-8' },
  'birthday-compatibility-calendars.webp': { src: birthdayCompatibilityImage, width: 1200, height: 800, figureClass: 'my-8' },
  'life-path-numbers-circle.webp': { src: lifePathNumbersImage, width: 800, height: 1600, figureClass: 'mx-auto w-full max-w-[300px] my-8' },
};

// Render **bold** markers in blog copy as real bold text. The old posts were
// written with markdown-style markers but the renderer never parsed them,
// so they showed as literal asterisks. Unmatched ** is left as-is.
const renderInline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });

export const BlogPostPage: React.FC<Props> = ({ slug, onNavigate }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-3 font-display">
          Article Not Found
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          The guide you are looking for may have been moved or updated.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/blog/')}
          className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-xs"
        >
          Return to Blog Index
        </button>
      </div>
    );
  }

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
      '@id': `https://calculatelove.online/blog/${post.slug}/`,
    },
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title={`${post.title} | Calculate Love`}
        description={post.description}
        canonicalPath={`/blog/${post.slug}/`}
        schemaJson={schemaJson}
        type="article"
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
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
            Interactive Calculator
          </span>
          <p className="text-xs text-slate-700">
            Want to test this directly? Calculate your score with our free tool.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate(post.relatedCalculatorUrl)}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>Open Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Article Body */}
      <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
        {post.content.map((paragraph, idx) => {
          const imageMatch = paragraph.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
          if (imageMatch) {
            const alt = imageMatch[1] ?? '';
            const file = imageMatch[2] ?? '';
            const image = BLOG_IMAGES[file];
            if (!image) {
              return null;
            }
            return (
              <figure key={idx} className={image.figureClass}>
                <img
                  src={image.src}
                  alt={alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  className="w-full rounded-2xl object-cover"
                />
                <figcaption className="mt-2 text-center text-xs text-slate-500">
                  {alt}
                </figcaption>
              </figure>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <h3
                key={idx}
                className="text-lg font-bold text-slate-900 font-display pt-4 pb-1"
              >
                {renderInline(paragraph.replace('### ', ''))}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <li key={idx} className="ml-5 list-disc text-slate-700">
                {renderInline(paragraph.replace('- ', ''))}
              </li>
            );
          }
          if (/^\d+\.\s/.test(paragraph)) {
            return (
              <p key={idx} className="font-medium text-slate-800">
                {renderInline(paragraph)}
              </p>
            );
          }
          return (
            <p key={idx} className="leading-relaxed">
              {renderInline(paragraph)}
            </p>
          );
        })}
      </div>

      {/* Contextual links & Related */}
      <RelatedArticles
        onNavigate={onNavigate}
        preferredSlugs={BLOG_POSTS.filter((p) => p.slug !== post.slug).map((p) => p.slug)}
        maxItems={2}
      />

      <RelatedTools currentToolId="" onNavigate={onNavigate} maxItems={3} />
    </article>
  );
};
