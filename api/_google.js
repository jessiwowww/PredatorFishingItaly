// Minimal Google Calendar client using a service account — no SDK needed.
// Setup (see SETUP.md): create a service account, share Roberto's calendar
// with it ("Make changes to events"), then set the three GOOGLE_* env vars.
import crypto from 'node:crypto';

const SCOPE = 'https://www.googleapis.com/auth/calendar';

export function googleConfigured() {
  return !!(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_CALENDAR_ID);
}

function b64url(input) {
  return Buffer.from(input).toString('base64url');
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: SCOPE,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claims}`;
  const key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
  const signature = crypto.createSign('RSA-SHA256').update(unsigned).sign(key).toString('base64url');
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  if (!res.ok) throw new Error(`Google token error: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

// Days with at least one event in [timeMin, timeMax) → ['YYYY-MM-DD', ...]
export async function busyDays(timeMin, timeMax) {
  const token = await getAccessToken();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const res = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ timeMin, timeMax, items: [{ id: calendarId }] }),
  });
  if (!res.ok) throw new Error(`Google freeBusy error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const periods = data.calendars?.[calendarId]?.busy || [];
  const days = new Set();
  for (const { start, end } of periods) {
    let d = new Date(start);
    const stop = new Date(end);
    while (d < stop) {
      days.add(d.toISOString().slice(0, 10));
      d = new Date(d.getTime() + 24 * 3600 * 1000);
    }
  }
  return [...days];
}

// All-day event that blocks the requested date on Roberto's calendar.
export async function blockDate(dateIso, summary, description) {
  const token = await getAccessToken();
  const calendarId = encodeURIComponent(process.env.GOOGLE_CALENDAR_ID);
  const next = new Date(new Date(dateIso + 'T00:00:00Z').getTime() + 24 * 3600 * 1000).toISOString().slice(0, 10);
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      summary,
      description,
      start: { date: dateIso },
      end: { date: next },
    }),
  });
  if (!res.ok) throw new Error(`Google insert error: ${res.status} ${await res.text()}`);
  return res.json();
}
