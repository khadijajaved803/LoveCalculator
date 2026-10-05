import React from 'react';
import { Calendar, Heart, Sparkles, Coffee } from 'lucide-react';

interface EngagementInputsProps {
  age1: string;
  setAge1: (val: string) => void;
  age2: string;
  setAge2: (val: string) => void;
  bondType: string;
  setBondType: (val: string) => void;
  vibe: string;
  setVibe: (val: string) => void;
  person1Label?: string;
  person2Label?: string;
  showVibe?: boolean;
}

export const EngagementInputs: React.FC<EngagementInputsProps> = ({
  age1,
  setAge1,
  age2,
  setAge2,
  bondType,
  setBondType,
  vibe,
  setVibe,
  person1Label = 'Your',
  person2Label = "Partner's",
  showVibe = true,
}) => {
  const bondOptions = [
    { id: 'Crush', label: 'Crush 🤫' },
    { id: 'Dating', label: 'Dating 💖' },
    { id: 'Best Friends', label: 'Besties 🥰' },
    { id: 'Planning Marriage', label: 'Engaged 💍' },
    { id: 'Married', label: 'Married 🏠' },
  ];

  const vibeOptions = [
    { id: 'Chai & Late Night Talks', label: 'Chai & Talks ☕', desc: 'Deep late conversations' },
    { id: 'Spontaneous Long Drives', label: 'Long Drives 🚗', desc: 'Spontaneous trips' },
    { id: 'Movie & Food Marathons', label: 'Food & Movies 🍕', desc: 'Cozy weekend dates' },
    { id: 'Chill & Sukoon', label: 'Quiet Sukoon ✨', desc: 'Calm understanding' },
  ];

  return (
    <div className="space-y-4 pt-3 border-t border-slate-100 w-full overflow-hidden">
      {/* Age Inputs - Fully responsive grid */}
      <div>
        <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Age (Optional)
        </label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="min-w-0">
            <span className="text-[11px] text-slate-500 block mb-1 truncate">{person1Label} Age</span>
            <input
              type="number"
              min="13"
              max="99"
              value={age1}
              onChange={(e) => setAge1(e.target.value)}
              placeholder="e.g. 23"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
            />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] text-slate-500 block mb-1 truncate">{person2Label} Age</span>
            <input
              type="number"
              min="13"
              max="99"
              value={age2}
              onChange={(e) => setAge2(e.target.value)}
              placeholder="e.g. 24"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[42px] box-border"
            />
          </div>
        </div>
      </div>

      {/* Relationship Stage / Bond Picker - Clean wrapping pills */}
      <div>
        <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Current Bond Stage
        </label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {bondOptions.map((opt) => {
            const isSelected = bondType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setBondType(isSelected ? '' : opt.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all min-h-[38px] flex items-center justify-center ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs font-semibold scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-[0.98]'
                }`}
              >
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Couple Vibe - Responsive 2-column or 1-column on ultra small */}
      {showVibe && (
        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Favourite Couple Vibe
          </label>
          <div className="grid grid-cols-2 gap-2">
            {vibeOptions.map((v) => {
              const isSelected = vibe === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVibe(isSelected ? '' : v.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all min-h-[44px] flex flex-col justify-center min-w-0 ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/70 text-rose-900 shadow-xs ring-1 ring-rose-300'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-semibold truncate block w-full">{v.label}</span>
                  <span className="text-[10px] text-slate-500 truncate block w-full">{v.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
