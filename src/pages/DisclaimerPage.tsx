import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AlertCircle, HeartHandshake } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const DisclaimerPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-slate-700 leading-relaxed text-sm">
      <SEOHead
        title="Disclaimer - Entertainment & Relationship Notice | MilanMeter"
        description="MilanMeter calculators and content are provided for entertainment, personal reflection, and fun. Read our full disclaimer."
        canonicalPath="/disclaimer/"
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Disclaimer' },
        ]}
        onNavigate={onNavigate}
      />

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
          Disclaimer
        </h1>
        <p className="text-xs text-slate-500">Last updated: March 2026</p>
      </header>

      <div className="space-y-6">
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 leading-relaxed">
            <strong>Entertainment Purpose Only:</strong> The calculators, compatibility scores, FLAMES games, Life Path analyses, and articles on MilanMeter are intended solely for entertainment, playful social sharing, and self-reflection.
          </div>
        </div>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. No Scientific Prediction or Guarantee</h2>
          <p>
            No digital calculator or algorithm possesses the scientific capacity to predict whether two human beings will fall in love, stay happily married, or encounter conflict. Human relationships depend on emotional maturity, shared commitments, active empathy, financial compatibility, and continuous communication.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Not Professional Matrimonial or Psychological Advice</h2>
          <p>
            The content and tools on MilanMeter do not constitute licensed marital counseling, psychiatric evaluation, or professional relationship therapy. If you or your partner are facing severe relational challenges or mental health distress, please consult a qualified counselor or family therapist.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Astrology & Numerology Representations</h2>
          <p>
            Astrological and numerological references are presented as cultural, historical, and philosophical frameworks. They must not be treated as fatalistic or scientifically verified assertions. We explicitly reject fatalistic claims regarding unavoidable marital failure or destiny.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. User Responsibility</h2>
          <p>
            Users are encouraged to treat all calculator outputs with a lighthearted spirit and constructive humor. MilanMeter accepts no liability for decisions made regarding personal relationships, dating, or marriage based on site content.
          </p>
        </section>
      </div>
    </div>
  );
};
