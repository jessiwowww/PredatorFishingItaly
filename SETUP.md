# predatorfishingitaly.com — setup

Sito vetrina + richieste di prenotazione per Roberto Bertoncello, fishing guide.
Vite + React + Tailwind. Le funzioni in `/api` girano come serverless su Vercel.

## Sviluppo locale

```bash
npm install
npm run dev        # http://localhost:5173 — /api/* funziona anche in dev
```

Senza variabili d'ambiente il sito funziona in **modalità demo**: il calendario
mostra tutte le date libere e l'invio richiesta "riesce" senza mandare email né
bloccare date. Perfetto per mostrare il sito. Per attivare il flusso vero:

## 1. Email — Resend (10 minuti)

Resend è un servizio per mandare email da codice (l'equivalente moderno di
Sendgrid). Piano gratuito: 100 email/giorno, più che sufficiente.

1. Registrati su https://resend.com (basta la tua email Google).
2. Dashboard → **API Keys** → Create API key → copia la chiave in `RESEND_API_KEY`.
3. **Nota sandbox:** senza dominio verificato Resend spedisce solo
   all'indirizzo con cui ti sei registrata (jessicabertoncello@gmail.com) e il
   mittente è `onboarding@resend.dev`. Va benissimo per la fase regalo: le
   richieste arrivano a te.
4. Quando il dominio `predatorfishingitaly.com` è collegato: Dashboard → Domains →
   Add domain → aggiungi i 3 record DNS che ti mostra → poi imposta
   `BOOKING_FROM="Roberto <booking@predatorfishingitaly.com>"` e le email di
   conferma arriveranno anche ai clienti.

## 2. Google Calendar — disponibilità + blocco automatico (15 minuti)

Il calendario del sito legge i giorni occupati dal Google Calendar di Roberto e
**ogni richiesta inviata crea un evento** `[RICHIESTA] …` che blocca la data.
Per liberare una data (richiesta rifiutata) basta cancellare l'evento.

1. Vai su https://console.cloud.google.com → crea un progetto (es. "ibf-booking").
2. **API & Services → Library** → cerca "Google Calendar API" → Enable.
3. **API & Services → Credentials → Create credentials → Service account**.
   Nome qualsiasi, nessun ruolo necessario → Done.
4. Apri il service account → **Keys → Add key → JSON** → scarica il file.
   Dal JSON copia `client_email` in `GOOGLE_SERVICE_ACCOUNT_EMAIL` e
   `private_key` in `GOOGLE_PRIVATE_KEY` (tienilo tra virgolette, con i `\n`).
5. In Google Calendar (l'account di Roberto, o il tuo per ora):
   Impostazioni del calendario → **Condividi con persone specifiche** →
   aggiungi l'email del service account con permesso
   **"Apportare modifiche agli eventi"**.
6. `GOOGLE_CALENDAR_ID` = l'indirizzo Gmail del calendario (o l'ID nella
   sezione "Integra calendario"). Consiglio: crea un calendario dedicato
   "Pesca" così gli impegni privati non bloccano il sito (ma se vuoi che
   blocchino, usa il calendario principale).

## 3. Deploy — Vercel

1. Pusha il repo su GitHub, importalo su https://vercel.com → Framework: Vite.
2. Project → Settings → **Environment Variables** → incolla le variabili di
   `.env.example` con i valori veri.
3. Quando vuoi: Settings → Domains → aggiungi `predatorfishingitaly.com`.

## Dove si cambiano prezzi e testi

- **Prezzi, fasce per zona, acconto, giorni di rimborso** → `src/config.js`
- **Acque della mappa (descrizioni, specie, stagioni, fascia)** → `src/data.js`
- **Tutti i testi EN/IT** (tour compresi) → `src/i18n.jsx`
