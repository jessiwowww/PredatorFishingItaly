// ─────────────────────────────────────────────────────────────────────────────
// EVERYTHING that must be confirmed with Roberto lives in this file.
// Prices, bands, deposit, refund windows — change here, the whole site updates.
// ─────────────────────────────────────────────────────────────────────────────

export const CURRENCY = '€';

// Per-person price falls as the group grows: base × factor[party - 1].
export const GROUP_FACTORS = [1, 0.667, 0.5];
export const MAX_ANGLERS = 3;

// Price bands by zone. Each water (src/data.js) points to one band.
// Base price = 1 angler. PLACEHOLDER numbers — to confirm with Roberto.
export const PRICE_BANDS = {
  veneto: {
    halfDay: 180,
    fullDay: 300,
  },
  bigLakes: {
    halfDay: 200,
    fullDay: 340,
  },
  central: {
    halfDay: null, // too far for a half day — full day only
    fullDay: 400,
  },
  lagoon: {
    halfDay: null,
    fullDay: 350, // the Lagoon Discovery tour
  },
};

export const DEPOSIT_PERCENT = 30;
export const FULL_REFUND_DAYS = 15;
export const DEPOSIT_RETAINED_DAYS = 3;

export const INSTAGRAM = 'https://www.instagram.com/robertobertoncello_';

export function perPersonPrice(base, party) {
  const f = GROUP_FACTORS[Math.min(party, GROUP_FACTORS.length) - 1];
  return Math.round(base * f);
}

// Lowest possible per-person price for a band (used for "from €X" labels).
export function fromPrice(bandId) {
  const band = PRICE_BANDS[bandId];
  const bases = [band.halfDay, band.fullDay].filter(Boolean);
  return Math.min(...bases.map((b) => perPersonPrice(b, MAX_ANGLERS)));
}
