# Predator Fishing Italy

Sito vetrina + richieste di prenotazione per Roberto Bertoncello, guida di pesca
ai predatori (AIGUPP ITA 156/22). Vite + React + Tailwind.

- **Sviluppo:** `npm install` poi `npm run dev` → http://localhost:5180
- **Build:** `npm run build` → cartella `dist/`
- **Deploy:** GitHub Actions pubblica su GitHub Pages a ogni push su `main`
  (Settings → Pages → Source = "GitHub Actions").
- **Config:** prezzi/fasce in `src/config.js`, acque in `src/data.js`, testi IT/EN
  in `src/i18n.jsx`. Setup email/calendario in `SETUP.md`. Permessi in `PERMESSI.md`.
