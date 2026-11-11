import React, { useState } from 'react';
import { ChartHouse, ChartStyle, PlanetData } from '../lib/birthChartEngine';
import { LayoutGrid, Compass, PieChart, Sparkles } from 'lucide-react';

interface Props {
  houses: ChartHouse[];
  d9Houses: ChartHouse[];
  d10Houses: ChartHouse[];
  planets: PlanetData[];
  isTimeProvided: boolean;
}

export const BirthChartVisualizer: React.FC<Props> = ({
  houses,
  d9Houses,
  d10Houses,
  planets,
  isTimeProvided,
}) => {
  const [style, setStyle] = useState<ChartStyle>('north');
  const [activeDivision, setActiveDivision] = useState<'D1' | 'D9' | 'D10'>('D1');

  const currentHouses =
    activeDivision === 'D1' ? houses : activeDivision === 'D9' ? d9Houses : d10Houses;

  const houseMap = new Map<number, ChartHouse>();
  currentHouses.forEach((h) => houseMap.set(h.houseNumber, h));
  const getH = (n: number) => houseMap.get(n);

  return (
    <div className="w-full bg-slate-900/95 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-800">
      {/* Top Controls: Divisional Tab & Chart Style Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-800">
        {/* Divisional Chart Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/90 rounded-2xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveDivision('D1')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeDivision === 'D1'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            D1 Rasi
          </button>
          <button
            type="button"
            onClick={() => setActiveDivision('D9')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeDivision === 'D9'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            D9 Navamsa
          </button>
          <button
            type="button"
            onClick={() => setActiveDivision('D10')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeDivision === 'D10'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            D10 Dasamsa
          </button>
        </div>

        {/* Style Switcher (North / South / Western) */}
        <div className="flex items-center gap-1 p-1 bg-slate-800/90 rounded-2xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setStyle('north')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              style === 'north'
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>North Indian</span>
          </button>
          <button
            type="button"
            onClick={() => setStyle('south')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              style === 'south'
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>South Indian</span>
          </button>
          <button
            type="button"
            onClick={() => setStyle('western')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              style === 'western'
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Western Wheel</span>
          </button>
        </div>
      </div>

      {/* Chart Diagram Container */}
      <div className="flex flex-col items-center justify-center py-2">
        {/* Style 1: North Indian Diamond Chart */}
        {style === 'north' && (
          <div className="w-full max-w-[420px] aspect-square relative select-none">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-lg rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 border border-amber-500/30"
            >
              {/* Outer Border */}
              <rect x="4" y="4" width="392" height="392" fill="none" stroke="#f59e0b" strokeWidth="2.5" rx="14" />

              {/* Diagonal Cross Lines */}
              <line x1="4" y1="4" x2="396" y2="396" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="396" y1="4" x2="4" y2="396" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.8" />

              {/* Inner Rhombus (Diamond) */}
              <polygon points="200,4 396,200 200,396 4,200" fill="none" stroke="#f59e0b" strokeWidth="2" />

              {/* House 1 (Lagna / Ascendant - Top Diamond) */}
              <g>
                <text x="200" y="80" textAnchor="middle" className="text-[11px] fill-amber-400 font-bold">
                  H1 {isTimeProvided ? '· Lagna' : ''}
                </text>
                <text x="200" y="100" textAnchor="middle" className="text-[15px] fill-rose-400 font-black">
                  {getH(1)?.rashiNumber}
                </text>
                <text x="200" y="122" textAnchor="middle" className="text-[11px] fill-emerald-300 font-semibold">
                  {getH(1)?.planets.join(' ') || '—'}
                </text>
              </g>

              {/* House 2 */}
              <g>
                <text x="100" y="58" textAnchor="middle" className="text-[10px] fill-amber-300 font-bold">H2</text>
                <text x="100" y="76" textAnchor="middle" className="text-[13px] fill-rose-400 font-black">{getH(2)?.rashiNumber}</text>
                <text x="100" y="94" textAnchor="middle" className="text-[10px] fill-emerald-300 font-semibold">{getH(2)?.planets.join(' ') || '—'}</text>
              </g>

              {/* House 12 */}
              <g>
                <text x="300" y="58" textAnchor="middle" className="text-[10px] fill-amber-300 font-bold">H12</text>
                <text x="300" y="76" textAnchor="middle" className="text-[13px] fill-rose-400 font-black">{getH(12)?.rashiNumber}</text>
                <text x="300" y="94" textAnchor="middle" className="text-[10px] fill-emerald-300 font-semibold">{getH(12)?.planets.join(' ') || '—'}</text>
              </g>

              {/* House 3 */}
              <g>
                <text x="58" y="100" textAnchor="middle" className="text-[10px] fill-amber-300 font-bold">H3</text>
                <text x="76" y="100" textAnchor="middle" className="text-[13px] fill-rose-400 font-black">{getH(3)?.rashiNumber}</text>
                <text x="65" y="120" textAnchor="middle" className="text-[10px] fill-emerald-300 font-semibold">{getH(3)?.planets.join(' ') || '—'}</text>
              </g>

              {/* House 4 (Left Diamond) */}
              <g>
                <text x="100" y="190" textAnchor="middle" className="text-[11px] fill-amber-400 font-bold">H4</text>
                <text x="100" y="210" textAnchor="middle" className="text-[15px] fill-rose-400 font-black">{getH(4)?.rashiNumber}</text>
                <text x="100" y="230" textAnchor="middle" className="text-[11px] fill-emerald-300 font-semibold">{getH(4)?.planets.join(' ') || '—'}</text>
              </g>

              {/* House 5 */}
              <g>
                <text x="58" y="300" textAnchor="middle" className="text-[10px] fill-amber-300 font-bold">H5</text>
                <text x="76" y="300" textAnchor="middle" className="text-[13px] fill-rose-400 font-black">{getH(5)?.rashiNumber}</text>
                <text x="65" y="320" textAnchor="middle" className="text-[10px] fill-emerald-300 font-semibold">{getH(5)?.planets.join(' ') || '—'}</text>
              </g>

              {/* House 6 */}
              <g>
                <text x="100" y="338" textAnchor="middle" className="text-[10px] fill-amber-300 font-bold">H6</text>
                <text x="100" y="356" textAnchor="middle" className="text-[13px] fill-rose-400 font-black">{getH(6)?.rashiNumber}</text>
                <text x="100" y="374" textAnchor="middle" className="text-[10px] fill-emerald-300 font-semibold">{getH(6)?.planets.join(' ') || '—'}</text>
              </g>

              {/* House 7 (Bottom Diamond) */}
              <g>
                <text x="200" y="280" textAnchor="middle" className="text-[11px] fill-amber-400 font-bold">H7 · Kalatra</text>
                <text x="200" y="300" textAnchor="middle" className="text-[15px] fill-rose-400 font-black">{getH(7)?.rashiNumber}</text>
                <text x="200" y="322" textAnchor="middle" className="text-[11px] fill-emerald-300 font-semibold">{getH(7)?.planets.join(' ') || '—'}</text>
              </g>

              {/* House 8 */}
              <g>
                <text x="300" y="338" textAnchor="middle" className="text-[10px] fill-amber-300 font-bold">H8</text>
                <text x="300" y="356" textAnchor="middle" className="text-[13px] fill-rose-400 font-black">{getH(8)?.rashiNumber}</text>
                <text x="300" y="374" textAnchor="middle" className="text-[10px] fill-emerald-300 font-semibold">{getH(8)?.planets.join(' ') || '—'}</text>
              </g>

              {/* House 9 */}
              <g>
                <text x="342" y="300" textAnchor="middle" className="text-[10px] fill-amber-300 font-bold">H9</text>
                <text x="324" y="300" textAnchor="middle" className="text-[13px] fill-rose-400 font-black">{getH(9)?.rashiNumber}</text>
                <text x="335" y="320" textAnchor="middle" className="text-[10px] fill-emerald-300 font-semibold">{getH(9)?.planets.join(' ') || '—'}</text>
              </g>

              {/* House 10 (Right Diamond) */}
              <g>
                <text x="300" y="190" textAnchor="middle" className="text-[11px] fill-amber-400 font-bold">H10 · Karma</text>
                <text x="300" y="210" textAnchor="middle" className="text-[15px] fill-rose-400 font-black">{getH(10)?.rashiNumber}</text>
                <text x="300" y="230" textAnchor="middle" className="text-[11px] fill-emerald-300 font-semibold">{getH(10)?.planets.join(' ') || '—'}</text>
              </g>

              {/* House 11 */}
              <g>
                <text x="342" y="100" textAnchor="middle" className="text-[10px] fill-amber-300 font-bold">H11</text>
                <text x="324" y="100" textAnchor="middle" className="text-[13px] fill-rose-400 font-black">{getH(11)?.rashiNumber}</text>
                <text x="335" y="120" textAnchor="middle" className="text-[10px] fill-emerald-300 font-semibold">{getH(11)?.planets.join(' ') || '—'}</text>
              </g>
            </svg>
          </div>
        )}

        {/* Style 2: South Indian Fixed Sign Square Chart */}
        {style === 'south' && (
          <div className="w-full max-w-[420px] aspect-square relative select-none">
            {/* 4x4 Grid with hollow 2x2 center */}
            <div className="w-full h-full grid grid-cols-4 grid-rows-4 rounded-2xl border-2 border-amber-500/50 bg-slate-950 overflow-hidden text-xs">
              {/* Row 1: Pisces (12), Aries (1), Taurus (2), Gemini (3) */}
              {[
                { rashiNum: 12, name: 'Pisces' },
                { rashiNum: 1, name: 'Aries' },
                { rashiNum: 2, name: 'Taurus' },
                { rashiNum: 3, name: 'Gemini' },
              ].map((box) => renderSouthBox(box, currentHouses, isTimeProvided))}

              {/* Row 2: Aquarius (11), CENTER (2 cols), Cancer (4) */}
              {renderSouthBox({ rashiNum: 11, name: 'Aquarius' }, currentHouses, isTimeProvided)}
              <div className="col-span-2 row-span-2 border border-amber-500/20 bg-gradient-to-br from-indigo-950/40 to-slate-900 flex flex-col items-center justify-center p-3 text-center">
                <span className="text-amber-400 font-bold font-display text-sm tracking-wide">
                  South Indian {activeDivision}
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  Signs Fixed Clockwise
                </span>
                <span className="text-[10px] text-amber-500/80 mt-1 font-mono">
                  Ascendant marked [ASC]
                </span>
              </div>
              {renderSouthBox({ rashiNum: 4, name: 'Cancer' }, currentHouses, isTimeProvided)}

              {/* Row 3: Capricorn (10), Leo (5) */}
              {renderSouthBox({ rashiNum: 10, name: 'Capricorn' }, currentHouses, isTimeProvided)}
              {renderSouthBox({ rashiNum: 5, name: 'Leo' }, currentHouses, isTimeProvided)}

              {/* Row 4: Sagittarius (9), Scorpio (8), Libra (7), Virgo (6) */}
              {[
                { rashiNum: 9, name: 'Sagittarius' },
                { rashiNum: 8, name: 'Scorpio' },
                { rashiNum: 7, name: 'Libra' },
                { rashiNum: 6, name: 'Virgo' },
              ].map((box) => renderSouthBox(box, currentHouses, isTimeProvided))}
            </div>
          </div>
        )}

        {/* Style 3: Western Wheel Chart */}
        {style === 'western' && (
          <div className="w-full max-w-[420px] aspect-square relative select-none">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-lg rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700"
            >
              {/* Outer wheel circle */}
              <circle cx="200" cy="200" r="190" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.6" />
              <circle cx="200" cy="200" r="145" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
              <circle cx="200" cy="200" r="75" fill="#0f172a" stroke="#6366f1" strokeWidth="2" opacity="0.9" />

              {/* Center Title */}
              <text x="200" y="195" textAnchor="middle" className="text-[12px] fill-amber-400 font-bold">
                Western Wheel
              </text>
              <text x="200" y="213" textAnchor="middle" className="text-[10px] fill-slate-300">
                {activeDivision} Natal
              </text>

              {/* 12 House Cusps & Wedges */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = i * 30; // 30 deg each
                const rad = (angle * Math.PI) / 180;
                const x2 = 200 + 190 * Math.cos(rad);
                const y2 = 200 + 190 * Math.sin(rad);

                const midAngle = angle + 15;
                const midRad = (midAngle * Math.PI) / 180;
                const textX = 200 + 165 * Math.cos(midRad);
                const textY = 200 + 165 * Math.sin(midRad);

                const houseIdx = ((12 - i) % 12) + 1;
                const hData = getH(houseIdx);

                return (
                  <g key={i}>
                    {/* Cusp line */}
                    <line x1="200" y1="200" x2={x2} y2={y2} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                    {/* House number */}
                    <text
                      x={200 + 105 * Math.cos(midRad)}
                      y={200 + 105 * Math.sin(midRad)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[10px] fill-amber-400 font-semibold"
                    >
                      {houseIdx}
                    </text>
                    {/* Sign name */}
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[9px] fill-slate-300 font-bold"
                    >
                      {hData?.signName.slice(0, 3)}
                    </text>
                    {/* Planets occupying */}
                    {hData?.planets && hData.planets.length > 0 && (
                      <text
                        x={200 + 130 * Math.cos(midRad)}
                        y={200 + 130 * Math.sin(midRad)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[8px] fill-emerald-300 font-bold"
                      >
                        {hData.planets.join(' ')}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Ascendant Marker line (9 o'clock / Left Horizon) */}
              <line x1="10" y1="200" x2="125" y2="200" stroke="#f43f5e" strokeWidth="2.5" />
              <polygon points="10,200 22,194 22,206" fill="#f43f5e" />
              <text x="35" y="192" className="text-[10px] fill-rose-400 font-extrabold">
                ASC
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Active Division: <strong className="text-white">{activeDivision}</strong></span>
        </div>
        <div>
          <span>Format: <strong className="text-white capitalize">{style} Indian / Tropical</strong></span>
        </div>
      </div>
    </div>
  );
};

// Helper to render one box in South Indian fixed layout
function renderSouthBox(
  box: { rashiNum: number; name: string },
  houses: ChartHouse[],
  isTimeProvided: boolean
) {
  // Find which house corresponds to this rashi
  const matchingHouse = houses.find((h) => h.rashiNumber === box.rashiNum);
  const isLagna = isTimeProvided && matchingHouse?.houseNumber === 1;

  return (
    <div
      key={box.rashiNum}
      className={`border border-amber-500/20 p-1.5 flex flex-col justify-between transition-colors ${
        isLagna ? 'bg-amber-500/15' : 'bg-slate-900/40 hover:bg-slate-900/70'
      }`}
    >
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-slate-400 font-medium">{box.name.slice(0, 3)}</span>
        {isLagna && (
          <span className="px-1 py-0.2 rounded text-[8px] font-black bg-rose-600 text-white">
            ASC
          </span>
        )}
      </div>

      <div className="my-auto py-1 text-center">
        {matchingHouse?.planets && matchingHouse.planets.length > 0 ? (
          <span className="text-[11px] font-bold text-emerald-300 tracking-tight">
            {matchingHouse.planets.join(' ')}
          </span>
        ) : (
          <span className="text-[10px] text-slate-600">—</span>
        )}
      </div>

      <div className="text-right text-[9px] text-amber-400/80 font-mono">
        {matchingHouse ? `H${matchingHouse.houseNumber}` : ''}
      </div>
    </div>
  );
}
