import React from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { ArrowRight, BookOpen } from 'lucide-react';

interface RelatedArticlesProps {
  onNavigate: (path: string) => void;
  preferredSlugs?: string[];
  maxItems?: number;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  onNavigate,
  preferredSlugs,
  maxItems = 3,
}) => {
  let posts = BLOG_POSTS;
  if (preferredSlugs && preferredSlugs.length > 0) {
    posts = BLOG_POSTS.filter((p) => preferredSlugs.includes(p.slug));
  }
  const displayPosts = posts.slice(0, maxItems);

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-slate-900 font-display">
          Helpful Relationship Guides
        </h2>
        <button
          type="button"
          onClick={() => onNavigate('/blog/')}
          className="text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors"
        >
          View all articles
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayPosts.map((post) => (
          <article
            key={post.slug}
            onClick={() => onNavigate(`/blog/${post.slug}/`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate(`/blog/${post.slug}/`)}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                <span>{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-1.5 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {post.description}
              </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-medium">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
