import { googleConfigured, blockDate } from './_google.js';

// POST /api/request — receives a booking request, then:
//  1. creates an all-day event on Roberto's Google Calendar (date shows as taken)
//  2. emails a summary to the site owner and a confirmation to the requester
// Both steps degrade gracefully if the relevant env vars are missing, so the
// site can be demoed before Resend / Google are set up.

const OWNER_EMAIL = process.env.BOOKING_TO || 'jessicabertoncello@gmail.com';
const FROM = process.env.BOOKING_FROM || 'Italian Bass Fishing <onboarding@resend.dev>';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const b = typeof req.body === 'object' && req.body ? req.body : await readJson(req);
  const required = ['tourName', 'waterName', 'date', 'party', 'name', 'email', 'total', 'deposit', 'currency'];
  if (!b || required.some((k) => b[k] === undefined || b[k] === '')) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date)) return res.status(400).json({ error: 'Bad date' });

  const result = { ok: true, calendar: false, email: false };
  const summaryLine = `${b.tourName} — ${b.waterName} — ${b.date} — ${b.party} anglers — ${b.name}`;

  // 1. block the date on Google Calendar
  if (googleConfigured()) {
    try {
      await blockDate(
        b.date,
        `[RICHIESTA] ${b.tourName} — ${b.name} (${b.party}p)`,
        `Richiesta dal sito italianbassfishing.it\n\nTour: ${b.tourName}\nAcqua: ${b.waterName}\nData: ${b.date}\nPescatori: ${b.party}\nTotale: ${b.currency}${b.total} (acconto ${b.currency}${b.deposit})\n\nNome: ${b.name}\nEmail: ${b.email}\nNote: ${b.notes || '—'}\n\nSe rifiuti la richiesta, elimina questo evento per liberare la data.`
      );
      result.calendar = true;
    } catch (e) {
      console.error('[request] calendar', e);
    }
  }

  // 2. emails via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: FROM,
        to: OWNER_EMAIL,
        replyTo: b.email,
        subject: `🎣 Nuova richiesta: ${summaryLine}`,
        text:
`Nuova richiesta di prenotazione dal sito.

Tour:       ${b.tourName}
Acqua:      ${b.waterName}
Data:       ${b.date}
Pescatori:  ${b.party}
Prezzo:     ${b.currency}${b.perPerson} a persona — totale ${b.currency}${b.total}
Acconto:    ${b.currency}${b.deposit}

Nome:   ${b.name}
Email:  ${b.email}
Note:   ${b.notes || '—'}

${result.calendar ? 'La data è stata bloccata sul calendario Google. Per rifiutare, elimina l\'evento.' : 'Calendario Google non configurato: data NON bloccata automaticamente.'}
Rispondi a questa email per scrivere direttamente al richiedente.`,
      });

      const it = b.lang === 'it';
      await resend.emails.send({
        from: FROM,
        to: b.email,
        subject: it
          ? `La tua richiesta — ${b.tourName}, ${b.date}`
          : `Your request — ${b.tourName}, ${b.date}`,
        text: it
          ? `Ciao ${b.name},

abbiamo ricevuto la tua richiesta:

Tour:       ${b.tourName}
Acqua:      ${b.waterName}
Data:       ${b.date}
Pescatori:  ${b.party}
Totale:     ${b.currency}${b.total} (acconto ${b.currency}${b.deposit})

IMPORTANTE: questa è una richiesta, non una prenotazione confermata.
Attendi il messaggio diretto di Roberto che conferma la data prima di
effettuare qualsiasi pagamento — niente è prenotato finché lui non conferma.

A presto in acqua,
Italian Bass Fishing`
          : `Hi ${b.name},

we've received your request:

Tour:      ${b.tourName}
Water:     ${b.waterName}
Date:      ${b.date}
Anglers:   ${b.party}
Total:     ${b.currency}${b.total} (deposit ${b.currency}${b.deposit})

IMPORTANT: this is a request, not a confirmed booking.
Please wait for a direct message from Roberto confirming your date before
making any payment or arrangement — nothing is booked until he confirms.

See you on the water,
Italian Bass Fishing`,
      });
      result.email = true;
    } catch (e) {
      console.error('[request] email', e);
    }
  } else {
    console.log('[request] mock (no RESEND_API_KEY):', summaryLine);
  }

  return res.status(200).json(result);
}

function readJson(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      try { resolve(JSON.parse(data)); } catch { resolve(null); }
    });
  });
}
