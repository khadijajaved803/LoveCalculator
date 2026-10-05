import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

export const CalculateLoveLogo: React.FC<LogoProps> = ({
  className = '',
  size = 36,
  showWordmark = false,
  wordmarkClassName = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-label="CalculateLove Logo"
      >
        <defs>
          <linearGradient id="clBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E11D48" />
            <stop offset="60%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>

          <linearGradient id="clRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFE4E6" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>

          <linearGradient id="clRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          <linearGradient id="clSparkle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <filter id="clGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Base Squircle */}
        <rect width="512" height="512" rx="128" fill="url(#clBg)" />
        <rect
          x="16"
          y="16"
          width="480"
          height="480"
          rx="116"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="6"
        />

        {/* Interlocking Infinity-Heart Emblem */}
        <g filter="url(#clGlow)">
          {/* Main Heart Lobe */}
          <path
            d="M176 138 C116 138 68 186 68 246 C68 318 136 364 256 432 C376 364 444 318 444 246 C444 186 396 138 336 138 C294 138 266 164 256 182 C246 164 218 138 176 138 Z"
            fill="none"
            stroke="url(#clRibbon1)"
            strokeWidth="48"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Infinity Loop Bridge */}
          <path
            d="M168 256 C168 220 200 200 236 230 L276 282 C312 312 344 292 344 256 C344 220 312 200 276 230 L236 282 C200 312 168 292 168 256 Z"
            fill="none"
            stroke="url(#clRibbon2)"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner Heart Jewel */}
          <path
            d="M256 228 C251 216 237 212 227 222 C217 232 221 247 256 272 C291 247 295 232 285 222 C275 212 261 216 256 228 Z"
            fill="#FFFFFF"
          />

          {/* Calculation Sparkle Star */}
          <path
            d="M380 96 Q380 136 420 136 Q380 136 380 176 Q380 136 340 136 Q380 136 380 96 Z"
            fill="url(#clSparkle)"
          />
          <circle cx="132" cy="160" r="10" fill="#FDE047" opacity="0.9" />
        </g>
      </svg>

      {/* Optional Wordmark */}
      {showWordmark && (
        <div className={`flex flex-col text-left ${wordmarkClassName}`}>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 font-display leading-none group-hover:text-rose-600 transition-colors">
            CalculateLove
          </span>
          <span className="text-[10px] text-rose-500 font-medium tracking-wider uppercase font-mono mt-0.5">
            calculatelove.online
          </span>
        </div>
      )}
    </div>
  );
};
