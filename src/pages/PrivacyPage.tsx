import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Lock } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-slate-700 leading-relaxed text-sm">
      <SEOHead
        title="Privacy Policy - CalculateLove"
        description="Learn how CalculateLove protects user privacy with 100% client-side calculations and zero name storage."
        canonicalPath="/privacy-policy/"
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
        onNavigate={onNavigate}
      />

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Last updated: March 2026</p>
      </header>

      <div className="space-y-6">
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 leading-relaxed">
            <strong>Key Privacy Commitment:</strong> All calculator operations (names, birthdays, questions) run entirely within your local web browser. We do not store, harvest, or transmit your names to any server.
          </div>
        </div>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Information We Do Not Collect</h2>
          <p>
            When you enter your name, your partner&apos;s name, or dates of birth into CalculateLove, this information is processed locally via client-side JavaScript. We do not maintain any database of user names, match histories, or personal identities.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Analytics & Cookies</h2>
          <p>
            To monitor website reliability and technical performance, we may collect aggregated, non-personally identifiable diagnostic data (such as page load times, browser type, and general geographic country). We do not deploy invasive cross-site tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Third-Party Links & Sharing</h2>
          <p>
            When you choose to share your score via WhatsApp or native share triggers, you are interacting directly with third-party messaging services under their respective terms. We do not track who you share results with.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Contact Concerning Privacy</h2>
          <p>
            If you have questions regarding this privacy policy, please reach out via our{' '}
            <button
              type="button"
              onClick={() => onNavigate('/contact/')}
              className="text-rose-600 underline font-medium"
            >
              Contact page
            </button>.
          </p>
        </section>
      </div>
    </div>
  );
};
