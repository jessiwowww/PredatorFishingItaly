import { googleConfigured, busyDays } from './_google.js';

// GET /api/availability?month=YYYY-MM → { busy: ['YYYY-MM-DD', ...] }
// Without Google credentials it degrades gracefully: every date is available.
export default async function handler(req, res) {
  const month = (req.query?.month || '').trim();
  if (!/^\d{4}-\d{2}$/.test(month)) {
    return res.status(400).json({ error: 'month must be YYYY-MM' });
  }
  if (!googleConfigured()) {
    return res.status(200).json({ busy: [], mocked: true });
  }
  try {
    const [y, m] = month.split('-').map(Number);
    const timeMin = new Date(Date.UTC(y, m - 1, 1)).toISOString();
    const timeMax = new Date(Date.UTC(y, m, 1)).toISOString();
    const busy = await busyDays(timeMin, timeMax);
    return res.status(200).json({ busy });
  } catch (e) {
    console.error('[availability]', e);
    // Never break the calendar UI over an availability hiccup.
    return res.status(200).json({ busy: [], error: true });
  }
}
