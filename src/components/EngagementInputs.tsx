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
    { id: 'Crush', label: 'Crush / Secret Love 🤫' },
    { id: 'Dating', label: 'Dating / In Love 💖' },
    { id: 'Best Friends', label: 'Best Friends 🥰' },
    { id: 'Planning Marriage', label: 'Planning Marriage 💍' },
    { id: 'Married', label: 'Married Life 🏠' },
  ];

  const vibeOptions = [
    { id: 'Chai & Late Night Talks', label: 'Chai & Deep Talks ☕' },
    { id: 'Spontaneous Long Drives', label: 'Spontaneous Trips 🚗' },
    { id: 'Movie & Food Marathons', label: 'Food & Movies 🍕' },
    { id: 'Chill & Sukoon', label: 'Quiet Sukoon ✨' },
  ];

  return (
    <div className="space-y-4 pt-3 border-t border-slate-100">
      {/* Age Inputs */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Age (Optional - Refines Chemistry)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[11px] text-slate-500 block mb-1">{person1Label} Age</span>
            <input
              type="number"
              min="13"
              max="99"
              value={age1}
              onChange={(e) => setAge1(e.target.value)}
              placeholder="e.g. 23"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px]"
            />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block mb-1">{person2Label} Age</span>
            <input
              type="number"
              min="13"
              max="99"
              value={age2}
              onChange={(e) => setAge2(e.target.value)}
              placeholder="e.g. 24"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 min-h-[44px]"
            />
          </div>
        </div>
      </div>

      {/* Relationship Stage / Bond Picker */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Current Bond Stage
        </label>
        <div className="flex flex-wrap gap-1.5">
          {bondOptions.map((opt) => {
            const isSelected = bondType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setBondType(isSelected ? '' : opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all min-h-[38px] ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Favorite Couple Vibe */}
      {showVibe && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
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
                  className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all min-h-[42px] flex items-center justify-between ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/70 text-rose-800 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{v.label}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
