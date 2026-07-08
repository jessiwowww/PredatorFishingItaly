import { WATERS } from '../data';

// Schematic map of Italy (same silhouette as the design prototype).
// Gold numbered pins; the selected water pulses slightly larger.
export default function ItalyMap({ selectedId, onSelect }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: '100/120' }}>
      <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full">
        <polygon
          points="11.5,12.0 24.6,5.4 38.5,1.1 59.2,5.4 60.8,15.2 49.2,17.4 48.5,31.7 63.1,51.2 76.2,55.7 86.2,72.0 81.5,78.6 74.6,96.0 73.8,99.2 76.2,88.3 71.5,76.3 63.1,67.1 57.7,63.2 50.0,61.1 39.2,46.9 33.1,36.0 30.0,28.3 23.1,28.3 12.3,32.8"
          fill="#22322a"
          stroke="#c9a227"
          strokeWidth="0.4"
          strokeOpacity="0.5"
        />
        {WATERS.map((w) => {
          const sel = w.id === selectedId;
          return (
            <g key={w.id} onClick={() => onSelect(w.id)} className="cursor-pointer">
              {/* generous invisible hit area */}
              <circle cx={w.x} cy={w.y} r="4" fill="transparent" />
              <circle cx={w.x} cy={w.y} r={sel ? 2.6 : 1.8} fill="#c9a227" opacity={sel ? 1 : 0.85} />
              <text
                x={w.x}
                y={w.y}
                fill="#13221b"
                fontSize={sel ? 3 : 2.2}
                fontFamily="Barlow Condensed, sans-serif"
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="central"
                pointerEvents="none"
              >
                {w.n}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
