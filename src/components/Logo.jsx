import { useState } from 'react';

// Brand lockup: an emblem + the "PREDATOR FISHING ITALY" wordmark.
//
// LOGO DI TUA SORELLA: appena arriva, salvala in /public/images/logo.svg
// (o logo.png) e questo componente la userà automaticamente al posto
// dell'emblema segnaposto qui sotto. Nessun'altra modifica necessaria.

function EmblemFallback({ size = 34 }) {
  // Placeholder emblem: a stylized predator fish inside a gold ring.
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" stroke="#c9a227" strokeWidth="1.4" />
      <path
        d="M9 20c3-4.2 7.4-6.3 11.6-6.3 3 0 5.6 1 7.6 2.6l3.8-3v13.4l-3.8-3c-2 1.6-4.6 2.6-7.6 2.6C16.4 26.3 12 24.2 9 20Z"
        fill="#c9a227"
      />
      <circle cx="16.4" cy="18.4" r="1.3" fill="#13221b" />
    </svg>
  );
}

export default function Logo({ compact = false, className = '' }) {
  const [imgOk, setImgOk] = useState(true);
  const showImg = imgOk;

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {/* Try the real logo; fall back to the emblem if it's not there yet. */}
      {showImg ? (
        <img
          src="/images/logo.svg"
          alt=""
          aria-hidden="true"
          onError={() => setImgOk(false)}
          className={compact ? 'h-8 w-auto' : 'h-9 w-auto'}
          style={{ display: 'block' }}
        />
      ) : (
        <EmblemFallback size={compact ? 30 : 34} />
      )}

      <span className="leading-none">
        <span className="block font-archivo font-black tracking-[0.02em] text-cream text-[16px] md:text-[18px]">
          PREDATOR FISHING
        </span>
        <span className="block font-barlow font-semibold uppercase tracking-[0.42em] text-gold text-[9px] md:text-[10px] mt-[3px]">
          Italy
        </span>
      </span>
    </span>
  );
}
