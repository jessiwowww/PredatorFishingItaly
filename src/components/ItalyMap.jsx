import { WATERS } from '../data';

// Recognizable Italy silhouette. Coordinates come from a simple geographic
// projection (lon 6.5–18.5°E → x 0–100, lat 47.2–36.5°N → y 0–120), so pin
// positions in src/data.js can be derived from real lat/lon the same way:
//   x = (lon - 6.5) * 8.1   ·   y = (47.2 - lat) * 11.2
const MAINLAND = `
  M 40.5 2.2
  L 44.6 5.6 L 50.5 7.5 L 57.5 7.8 L 58.7 17.4
  L 52.5 19.8 L 47.4 19.7 L 47.8 25.2 L 49.2 35.2
  L 56.7 40.1 L 62.4 53 L 70 57.5 L 78.4 59.6 L 74.5 62.5
  L 84 68 L 93.2 73.4 L 97.2 79 L 96 82.9 L 91 79.5
  L 86.7 75 Q 83 79.5 81 83.4 L 86.3 90.9 L 84.5 96.5 L 81.8 98
  L 79.5 103.5 L 77.4 104 L 74.1 101.9 L 75.5 96 L 73.5 89
  L 71.3 80.6 L 66 76.5 L 62.8 71.7 Q 63.5 69 60 68.5
  L 52 63.5 L 46.2 60.5 L 41 56 L 37.3 53.8 L 34 47
  L 30.8 41.4 L 26.7 34.7 L 22 32.8 L 19.4 31.4 Q 13 33.5 8.1 38
  L 4 33.6 L 1.6 23.5 L 4 15.7 L 12 13.5 L 22.7 11.2
  L 30 6.5 L 35 3.5 Z
`;
const SICILY = `
  M 73.3 100.8 L 69.7 108.6 L 71.3 113.6 L 67.6 117.6
  L 57.4 110.9 L 48 105.3 L 48.6 103 L 55.5 101.4 L 64 102.5 Z
`;
const SARDINIA = `
  M 21.9 66.6 L 24.7 68.3 L 26.7 75 L 25.5 83 L 21.9 89.6
  L 19.4 93 L 15.8 90 L 15.4 81.8 L 13.8 71.1 L 18 67.5 Z
`;

export default function ItalyMap({ selectedId, onSelect }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: '100/120' }}>
      <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full">
        {[MAINLAND, SICILY, SARDINIA].map((d, i) => (
          <path key={i} d={d} fill="#22322a" stroke="#c9a227" strokeWidth="0.4" strokeOpacity="0.5" strokeLinejoin="round" />
        ))}
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
