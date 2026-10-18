import React from 'react';
import { TOOLS } from '../data/toolsData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface RelatedToolsProps {
  currentToolId: string;
  onNavigate: (path: string) => void;
  title?: string;
  maxItems?: number;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({
  currentToolId,
  onNavigate,
  title = 'Explore Related Compatibility Tools',
  maxItems = 3,
}) => {
  const filtered = TOOLS.filter((t) => t.id !== currentToolId).slice(0, maxItems);

  return (
    <section className="mt-14 pt-10 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 font-display">
          {title}
        </h2>
        <span className="text-xs text-slate-500 hidden sm:inline">
          Free & Private
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onNavigate(tool.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate(tool.path)}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">
                  {tool.category}
                </span>
                {tool.badge && (
                  <span className="text-[10px] text-slate-500 font-medium">
                    {tool.badge}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors mb-1.5">
                {tool.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-medium">
              <span>Try Tool</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
