import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface Props {
  onNavigate: (path: string) => void;
}

export const LoveCompatibilityZodiacPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <SEOHead
        title="Love Compatibility by Zodiac Sign"
        description="Love Compatibility by Zodiac Sign - Coming soon."
        canonicalPath="/love-compatibility-by-zodiac-sign/"
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Love Compatibility by Zodiac Sign', href: '/love-compatibility-by-zodiac-sign/' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center mt-6 mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight mb-4">
          Love Compatibility by Zodiac Sign
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Coming soon — this page is being written.
        </p>
      </div>
    </div>
  );
};
