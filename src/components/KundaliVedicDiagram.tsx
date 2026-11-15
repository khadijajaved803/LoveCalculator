import React from 'react';
import { KundaliHouse } from '../lib/kundaliChartEngine';

interface KundaliVedicDiagramProps {
  houses: KundaliHouse[];
  title?: string;
  size?: number;
}

/**
 * Traditional Diamond-Style North Indian Kundali Chart
 * 
 * Houses layout in North Indian Chart:
 * House 1 (Lagna): Top Diamond (Center)
 * House 2: Top-Left Triangle
 * House 3: Middle-Left Triangle
 * House 4: Left Diamond (Center)
 * House 5: Bottom-Left Triangle
 * House 6: Bottom-Left-Center Triangle
 * House 7: Bottom Diamond (Center)
 * House 8: Bottom-Right-Center Triangle
 * House 9: Bottom-Right Triangle
 * House 10: Right Diamond (Center)
 * House 11: Middle-Right Triangle
 * House 12: Top-Right Triangle
 */
export const KundaliVedicDiagram: React.FC<KundaliVedicDiagramProps> = ({
  houses,
  title = 'Lagna Kundali (D-1)',
}) => {
  // Map houses by number 1-12
  const houseMap = new Map<number, KundaliHouse>();
  houses.forEach((h) => houseMap.set(h.houseNumber, h));

  const getH = (n: number) => houseMap.get(n);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[420px] aspect-square relative select-none">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-md rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-100/60 border border-amber-300"
        >
          {/* Outer Border */}
          <rect
            x="4"
            y="4"
            width="392"
            height="392"
            fill="none"
            stroke="#b45309"
            strokeWidth="3"
            rx="12"
          />

          {/* Diagonal Cross Lines */}
          <line x1="4" y1="4" x2="396" y2="396" stroke="#b45309" strokeWidth="2" />
          <line x1="396" y1="4" x2="4" y2="396" stroke="#b45309" strokeWidth="2" />

          {/* Inner Diamond (Rhombus) */}
          <polygon
            points="200,4 396,200 200,396 4,200"
            fill="none"
            stroke="#b45309"
            strokeWidth="2.5"
          />

          {/* ================= House 1 (Lagna - Top Diamond) ================= */}
          <g className="house-1">
            <text x="200" y="85" textAnchor="middle" className="text-[12px] fill-amber-900 font-bold font-sans">
              H1 · Lagna
            </text>
            <text x="200" y="105" textAnchor="middle" className="text-[14px] fill-rose-700 font-black font-sans">
              {getH(1)?.rashiNumber}
            </text>
            <text x="200" y="125" textAnchor="middle" className="text-[11px] fill-slate-800 font-bold font-sans">
              {getH(1)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 2 (Top Left Triangle) ================= */}
          <g className="house-2">
            <text x="100" y="60" textAnchor="middle" className="text-[10px] fill-amber-900 font-bold font-sans">
              H2
            </text>
            <text x="100" y="78" textAnchor="middle" className="text-[12px] fill-rose-700 font-black font-sans">
              {getH(2)?.rashiNumber}
            </text>
            <text x="100" y="94" textAnchor="middle" className="text-[10px] fill-slate-800 font-bold font-sans">
              {getH(2)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 12 (Top Right Triangle) ================= */}
          <g className="house-12">
            <text x="300" y="60" textAnchor="middle" className="text-[10px] fill-amber-900 font-bold font-sans">
              H12
            </text>
            <text x="300" y="78" textAnchor="middle" className="text-[12px] fill-rose-700 font-black font-sans">
              {getH(12)?.rashiNumber}
            </text>
            <text x="300" y="94" textAnchor="middle" className="text-[10px] fill-slate-800 font-bold font-sans">
              {getH(12)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 3 (Middle-Left Triangle) ================= */}
          <g className="house-3">
            <text x="60" y="145" textAnchor="middle" className="text-[10px] fill-amber-900 font-bold font-sans">
              H3
            </text>
            <text x="60" y="165" textAnchor="middle" className="text-[12px] fill-rose-700 font-black font-sans">
              {getH(3)?.rashiNumber}
            </text>
            <text x="60" y="182" textAnchor="middle" className="text-[10px] fill-slate-800 font-bold font-sans">
              {getH(3)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 4 (Left Diamond) ================= */}
          <g className="house-4">
            <text x="110" y="195" textAnchor="middle" className="text-[11px] fill-amber-900 font-bold font-sans">
              H4 (Sukha)
            </text>
            <text x="110" y="215" textAnchor="middle" className="text-[13px] fill-rose-700 font-black font-sans">
              {getH(4)?.rashiNumber}
            </text>
            <text x="110" y="235" textAnchor="middle" className="text-[11px] fill-slate-800 font-bold font-sans">
              {getH(4)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 5 (Bottom-Left Triangle) ================= */}
          <g className="house-5">
            <text x="60" y="255" textAnchor="middle" className="text-[10px] fill-amber-900 font-bold font-sans">
              H5
            </text>
            <text x="60" y="275" textAnchor="middle" className="text-[12px] fill-rose-700 font-black font-sans">
              {getH(5)?.rashiNumber}
            </text>
            <text x="60" y="292" textAnchor="middle" className="text-[10px] fill-slate-800 font-bold font-sans">
              {getH(5)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 6 (Bottom-Left-Center Triangle) ================= */}
          <g className="house-6">
            <text x="100" y="335" textAnchor="middle" className="text-[10px] fill-amber-900 font-bold font-sans">
              H6
            </text>
            <text x="100" y="352" textAnchor="middle" className="text-[12px] fill-rose-700 font-black font-sans">
              {getH(6)?.rashiNumber}
            </text>
            <text x="100" y="368" textAnchor="middle" className="text-[10px] fill-slate-800 font-bold font-sans">
              {getH(6)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 7 (Bottom Diamond - Marriage) ================= */}
          <g className="house-7">
            <text x="200" y="275" textAnchor="middle" className="text-[12px] fill-amber-900 font-bold font-sans">
              H7 · Marriage
            </text>
            <text x="200" y="295" textAnchor="middle" className="text-[14px] fill-rose-700 font-black font-sans">
              {getH(7)?.rashiNumber}
            </text>
            <text x="200" y="315" textAnchor="middle" className="text-[11px] fill-slate-800 font-bold font-sans">
              {getH(7)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 8 (Bottom-Right-Center Triangle) ================= */}
          <g className="house-8">
            <text x="300" y="335" textAnchor="middle" className="text-[10px] fill-amber-900 font-bold font-sans">
              H8
            </text>
            <text x="300" y="352" textAnchor="middle" className="text-[12px] fill-rose-700 font-black font-sans">
              {getH(8)?.rashiNumber}
            </text>
            <text x="300" y="368" textAnchor="middle" className="text-[10px] fill-slate-800 font-bold font-sans">
              {getH(8)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 9 (Bottom-Right Triangle) ================= */}
          <g className="house-9">
            <text x="340" y="255" textAnchor="middle" className="text-[10px] fill-amber-900 font-bold font-sans">
              H9 (Bhagya)
            </text>
            <text x="340" y="275" textAnchor="middle" className="text-[12px] fill-rose-700 font-black font-sans">
              {getH(9)?.rashiNumber}
            </text>
            <text x="340" y="292" textAnchor="middle" className="text-[10px] fill-slate-800 font-bold font-sans">
              {getH(9)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 10 (Right Diamond - Career) ================= */}
          <g className="house-10">
            <text x="290" y="195" textAnchor="middle" className="text-[11px] fill-amber-900 font-bold font-sans">
              H10 (Career)
            </text>
            <text x="290" y="215" textAnchor="middle" className="text-[13px] fill-rose-700 font-black font-sans">
              {getH(10)?.rashiNumber}
            </text>
            <text x="290" y="235" textAnchor="middle" className="text-[11px] fill-slate-800 font-bold font-sans">
              {getH(10)?.planets.join(' ') || '—'}
            </text>
          </g>

          {/* ================= House 11 (Middle-Right Triangle) ================= */}
          <g className="house-11">
            <text x="340" y="145" textAnchor="middle" className="text-[10px] fill-amber-900 font-bold font-sans">
              H11 (Gains)
            </text>
            <text x="340" y="165" textAnchor="middle" className="text-[12px] fill-rose-700 font-black font-sans">
              {getH(11)?.rashiNumber}
            </text>
            <text x="340" y="182" textAnchor="middle" className="text-[10px] fill-slate-800 font-bold font-sans">
              {getH(11)?.planets.join(' ') || '—'}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 text-center">
        <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
          {title}
        </span>
        <p className="text-[11px] text-slate-500 mt-1">
          Red numbers represent Rashi (1=Aries ... 12=Pisces). Labels show Graha placements.
        </p>
      </div>
    </div>
  );
};
