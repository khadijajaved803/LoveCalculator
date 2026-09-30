import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface Props {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-slate-700 leading-relaxed text-sm">
      <SEOHead
        title="Terms of Service - MilanMeter"
        description="Review the terms and conditions governing the use of the MilanMeter relationship calculators and educational content."
        canonicalPath="/terms/"
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
        ]}
        onNavigate={onNavigate}
      />

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">Last updated: March 2026</p>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using MilanMeter (milanmeter.com), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Use License & Entertainment Nature</h2>
          <p>
            All tools, tests, calculators, and articles on MilanMeter are provided strictly for recreational, entertainment, and educational purposes. You agree not to use the service for any unlawful purpose or to harass or defame any individual.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Intellectual Property</h2>
          <p>
            The software architecture, original articles, brand assets, and custom styling of MilanMeter are protected by applicable copyright and trademark law.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Limitation of Liability</h2>
          <p>
            MilanMeter and its operators shall not be held liable for any decisions, interpersonal conflicts, or emotional outcomes resulting from the use of its calculators or content.
          </p>
        </section>
      </div>
    </div>
  );
};
