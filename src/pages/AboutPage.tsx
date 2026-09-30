import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Heart, Users, Sparkles } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-slate-700">
      <SEOHead
        title="About MilanMeter - India's Trusted Relationship Tools Platform"
        description="Learn about MilanMeter, our commitment to privacy, deterministic algorithms, and positive relationship reflections for couples and friends across India."
        canonicalPath="/about/"
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
        onNavigate={onNavigate}
      />

      <header className="mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
          About MilanMeter
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Building fast, private, and deterministic relationship compatibility calculators tailored for Indian and global audiences.
        </p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed">
        <section className="p-6 rounded-3xl bg-white border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 font-display mb-3">
            Our Mission: Clean, Honest & Private Calculators
          </h2>
          <p className="mb-3">
            Most online love calculators on the internet are plagued with intrusive ads, layout jumps, volatile random number generators, and deceptive claims. MilanMeter was created to offer an alternative: a clean, lightning-fast, and trustworthy suite of relationship tools.
          </p>
          <p>
            Whether you want to revisit the classic school nostalgia of the FLAMES game or explore the phonetic resonance of two names, our calculators are built to bring warmth, laughter, and thoughtful reflection into your connections.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
            <h3 className="font-bold text-slate-900 mb-1">100% Privacy</h3>
            <p className="text-xs text-slate-500">
              Calculations run entirely in your web browser. We never store or sell your names or dates of birth.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <Sparkles className="w-5 h-5 text-rose-500 mb-2" />
            <h3 className="font-bold text-slate-900 mb-1">Deterministic Logic</h3>
            <p className="text-xs text-slate-500">
              The same names always generate the identical result. No random shifts or deceptive trickery.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <Heart className="w-5 h-5 text-indigo-600 mb-2" />
            <h3 className="font-bold text-slate-900 mb-1">Healthy Perspective</h3>
            <p className="text-xs text-slate-500">
              We clearly distinguish playful entertainment calculations from the real, conscious work of building relationships.
            </p>
          </div>
        </section>

        <section className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 font-display mb-2">
            Editorial & Mathematical Integrity
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Our articles and tools are crafted by relationship writers, cultural researchers, and software engineers. We celebrate the rich tapestry of modern Indian relationships—from campus crushes and deep best-friend bonds to contemporary marriages that honor family blessings.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/contact/')}
            className="text-xs text-rose-600 font-semibold hover:underline"
          >
            Have feedback or suggestions? Contact our team →
          </button>
        </section>
      </div>
    </div>
  );
};
