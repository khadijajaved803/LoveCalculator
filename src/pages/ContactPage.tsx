import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Mail, CheckCircle2, MessageSquare, Send } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<Props> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Contact CalculateLove - Editorial Feedback & Suggestions"
        description="Get in touch with the CalculateLove team for editorial questions, feature suggestions, calculator feedback, or partnership inquiries."
        canonicalPath="/contact/"
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
          Contact the CalculateLove Team
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          We welcome your feedback, calculator feature suggestions, or mathematical inquiries.
        </p>
      </div>

      <div className="max-w-lg mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="cntName"
                className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                Your Name
              </label>
              <input
                id="cntName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cntEmail"
                className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                Your Email Address
              </label>
              <input
                id="cntEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cntSubject"
                className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                Topic
              </label>
              <select
                id="cntSubject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px]"
              >
                <option value="Feedback">Calculator Feedback</option>
                <option value="New Feature">Suggest New Tool (e.g. Kundli/Numerology)</option>
                <option value="Bug Report">Report a Bug / Issue</option>
                <option value="Partnership">Editorial / Partnership</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="cntMessage"
                className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                Message
              </label>
              <textarea
                id="cntMessage"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we make CalculateLove better for you?"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Message Received!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Thank you for contacting us, {name}. Our editorial team reviews suggestions and responds within 1–2 business days.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="text-xs text-rose-600 font-semibold hover:underline"
            >
              Send another note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
