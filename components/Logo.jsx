export default function Logo({ variant = 'full', className = '' }) {
  const icon = variant === 'icon';

  return (
    <div
      className={`flex select-none flex-col items-center justify-center font-display ${className}`}
    >
      {/* Crown emblem */}
      <svg
        viewBox="0 0 100 65"
        width={icon ? 44 : 76}
        role="img"
        aria-label="Sarkin Agogo crown"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-[width] duration-700"
      >
        <g stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
          <path d="M15 20 L27 45 Q50 53 73 45 L85 20 L65 34 L50 8 L35 34 Z" fill="currentColor" />
          <path d="M20 49 Q50 55 80 49" strokeWidth="2.5" />
          <path d="M25 55 Q50 59 75 55" strokeWidth="1.4" />
        </g>
        <g fill="currentColor">
          <circle cx="15" cy="19" r="3.4" />
          <circle cx="35" cy="33" r="3" />
          <circle cx="50" cy="7" r="4" />
          <circle cx="65" cy="33" r="3" />
          <circle cx="85" cy="19" r="3.4" />
        </g>
      </svg>

      {/* Brand name */}
      <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
        <span
          className={`tracking-[0.055em] ${
            icon ? 'text-[length:clamp(13px,2vw,18px)]' : 'text-[length:clamp(15px,3vw,25px)]'
          }`}
        >
          SARKIN
        </span>
        <span className="text-[0.7em]" aria-hidden="true">•</span>
        <span
          className={`tracking-[0.055em] ${
            icon ? 'text-[length:clamp(13px,2vw,18px)]' : 'text-[length:clamp(15px,3vw,25px)]'
          }`}
        >
          AGOGO
        </span>
      </div>

      {!icon && (
        <>
          <div className="mt-0.5 flex items-center justify-center gap-2">
            <span className="h-px w-7 bg-current opacity-50" aria-hidden="true" />
            <span className="pl-[0.42em] text-[11px] tracking-[0.42em]">WATCHES</span>
            <span className="h-px w-7 bg-current opacity-50" aria-hidden="true" />
          </div>

          {variant === 'full' && (
            <span className="mt-1 text-[9px] tracking-[0.08em] opacity-70">
              Timeless · Refined · Trusted
            </span>
          )}
        </>
      )}
    </div>
  );
}