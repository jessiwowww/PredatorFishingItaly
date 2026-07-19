import { useState } from 'react';

// Brand lockup: the MARK (a stylized "R" formed by rod + line) + the
// "PREDATOR FISHING ITALY" wordmark.
//
// LOGO DI TUA SORELLA (la "R" tra canna e lenza):
//   • salvala come /public/images/logo.svg (preferito) o /public/images/logo.png
//     → viene usata automaticamente al posto dell'emblema segnaposto.
//   • è pensata per essere GRANDE: lo slot arriva a ~52px di altezza (40px in
//     versione compatta quando si scrolla). Se serve ancora più grande dimmelo.
//   • se il file è già un lockup completo con le parole incluse, salvalo invece
//     come /public/images/logo-full.svg e togliamo il testo qui accanto.

function EmblemFallback({ size = 46 }) {
  // Placeholder: an "R" suggested by a rod (diagonal) and line (curve),
  // inside a gold ring — a stand-in until the real mark arrives.
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" stroke="#c9a227" strokeWidth="1.6" />
      {/* rod */}
      <path d="M17 13v22" stroke="#c9a227" strokeWidth="3" strokeLinecap="round" />
      {/* R bowl */}
      <path d="M17 14h7a6 6 0 0 1 0 12h-7" stroke="#c9a227" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* R leg / line cast out to a hook */}
      <path d="M17 26c5 1 8 3 10 9" stroke="#c9a227" strokeWidth="3" strokeLinecap="round" />
      <circle cx="28.5" cy="35.5" r="1.7" fill="#c9a227" />
    </svg>
  );
}

export default function Logo({ compact = false, className = '' }) {
  const [imgOk, setImgOk] = useState(true);
  const markH = compact ? 40 : 52;

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      {imgOk ? (
        <img
          src="/images/logo.svg"
          alt=""
          aria-hidden="true"
          onError={() => setImgOk(false)}
          style={{ height: markH, width: 'auto', display: 'block' }}
        />
      ) : (
        <EmblemFallback size={markH} />
      )}

      <span className="leading-none">
        <span className="block font-archivo font-black tracking-[0.02em] text-cream text-[17px] md:text-[19px]">
          PREDATOR FISHING
        </span>
        <span className="block font-barlow font-semibold uppercase tracking-[0.42em] text-gold text-[9px] md:text-[10px] mt-[3px]">
          Italy
        </span>
      </span>
    </span>
  );
}
