# SKILL — Italian Bass Fishing (superpower website brief)

A reusable project brief for building / rebuilding **italianbassfishing.it** — a guided
predator-fishing showcase + enquiry site aimed at English-speaking anglers (mainly
Anglo-Saxon) visiting Veneto and the Venice Lagoon.

Use this document as the source of truth. Anything marked **[DECISION]** is not yet
settled and must be resolved with the client before or during the build — do not invent
an answer, ask.

---

## 1. One-liner & positioning

> **"Not only fishing — a real interactive experience discovering local nature and wildlife."**

The site is a **vetrina** (showcase), not a transactional booking engine. Its job is to
set the atmosphere first, details second, and to make it easy to **request a day-slot**.
The exact spot, format and price are then finalised **by email / direct message** with
the guide. Do not over-engineer checkout, payments, or rigid packages.

Tone: **evocative, not descriptive. Atmosphere first, details after.** In English, with a
visible IT/EN language toggle (EN is the default content).

Identity hashtag: **#predatorfishing**

---

## 2. The guide — Roberto Bertoncello

- Certified fishing guide, **AIGUPP n. ITA 156/22**.
- **40 years** of experience in predator fishing.
- **Fishery warden** (guardia pesca), active in fish restocking.
- **Multiple national-level tournament awards.** ⚠️ He is a *winner of several national
  awards* — NOT "qualified for the national tournaments". Word it as achievements/wins.
  (Historical note: qualified for the Italian national team for the World
  Championships in the USA in the early 2000s; 1st of 30 boats in the 2021 qualifiers for
  the Italian Predator-from-boat Championship, Lake Endine — use as colour, carefully.)
- Bass boat **custom-built to his own specifications**.
- **Speaks English**; regularly works with foreign tourists in the Venice Lagoon.
- Also a cyclist — a **future second service**, out of scope for v1.

---

## 3. Product

**Today:** full-day and half-day guided predator fishing, **catch & release**, spinning &
casting with artificial lures. **Gear rental available.** Booking confirmation is
**manual** (personal confirmation by Roberto).

**Tomorrow (out of scope for v1, mention only if asked):** branded lures under the
Roberto Bertoncello name (sourced via Alibaba, brand to be built), integrated e-commerce.

**Target species:** Bass, Pike (Luccio), Zander (Lucioperca), Perch (Persico Reale),
Sea Bass (Spigola), Gilthead Bream (Orata).

---

## 4. Waters / spots (map pins)

Spread across **northern & central Italy** — NOT one region, NOT all Alpine (Bolsena is a
volcanic lake). Lakes, rivers and the Venice Lagoon:

Lake Garda · Lake Iseo · Lake Corlo · Lake Revine · Lake Bolsena (volcanic) · Brenta
river at Strà · Bacchiglione · Sile · Venice Lagoon (incl. Burano) · Lake Bilancino ·
Lake Massaciuccoli.

**[DECISION]** Is this the final list? The client mentioned "others of the same kind".
Ask for the complete list + each water's region so map pins land correctly.

---

## 5. Booking model — MAP-DRIVEN (option A, chosen)

The **map is the entry point** to the enquiry:

1. On the Tours page, the map of Italy is interactive. Clicking a spot (or a group of
   spots) opens a card with that place's **characteristics**: target species, technique,
   best season, difficulty, scenery.
2. From that card the visitor requests a **day-slot** (full or half day) with preferred
   dates and party size — a *request*, not a confirmed booking.
3. Everything else (exact water, format, and **price**) is clarified afterwards **by
   email**. The site should say this plainly.

**Pricing reality:** price varies by **location (or group of locations)** and by **number
of people** (per-person rate scales down as the group grows). Because this is finalised by
email, the site does **not** need a hard-coded price matrix.

**[DECISION]** How to present price on-site? Options to offer the client:
- (a) show nothing, "price on request, confirmed by email";
- (b) show broad **price bands / fasce** by zone (e.g. "from €X per person");
- (c) show an indicative "from" figure per area.
Recommend (b) or (c) for trust, but only if the client can give indicative min–max per
zone. Ask.

**[DECISION]** Deposit & cancellation policy wording (bank transfer / bonifico, deposit %,
full refund if cancelled ≥ N days before, deposit retained if cancelled within M days).
The current prototype uses 30% / 15 days / 3 days as placeholders — confirm real numbers.

**Post-request UX:** after sending, the visitor gets a **summary email** and is told to
**wait for a direct message from Roberto before paying or arranging anything** — nothing
is booked until he confirms.

---

## 6. Visual direction (as built in the prototype)

- **Single dark background** across the whole site — deep green **#13221b**. No white / no
  cream sections. Cream text **#f3ead9**, gold accent **#c9a227**.
- Type: **Archivo** (900/700) for headlines, **Barlow Condensed** for body/labels. Bold
  sans headings + clean condensed body.
- Mood: luminous-Venetian + premium outdoor/hunting-magazine editorial. Cinematic
  full-bleed dawn imagery, generous spacing (avoid dense "schematic" boxed stat grids —
  the client dislikes them; prefer quiet checklists / big figures with air).
- Species & credentials shown as **gold-outlined chips**; highlights as a quiet
  gold-marker checklist ("Why fish with Roberto"), not boxed stats.
- **Fixed / sticky header** on all pages.
- Photos: real images from Instagram **@robertobertoncello_** (drag-drop image slots in
  the prototype; replace with real assets).

Pages: **Home**, **Tours & Booking** (with interactive map), **The Guide (About)**.

---

## 7. Tech stack (target production build)

Vite + React · Tailwind CSS · React Router · **Sanity** (blog CMS) · **Calendly**
(booking/slot requests) · **i18next** (IT/EN) · deploy on **Vercel/Netlify**.
Domain: **italianbassfishing.it** (note: **.it**, already reserved).

---

## 9. What already exists (the prototype — hand this off, don't rebuild)

A working prototype is built and is the visual source of truth. Reference screenshots live
in `/reference/` (01-home, 02-tours, 03-booking-modal, 04-about). Hand these to any builder
(Fable 5, a developer) together with `PROMPT — Fable 5.md` so nobody starts from zero.

Key implemented details worth preserving:
- **Group pricing math:** per-person rate falls as the party grows. base × factor, where
  factors for party 1→6 are `[1, 0.667, 0.5, 0.417, 0.367, 0.333]`, rounded. (e.g. base
  €300 → €300 / €200pp / €150pp for 1 / 2 / 3 anglers.) Base prices are placeholders.
- **Booking modal:** tour detail + per-person price + payment/cancellation block on the
  left; calendar (past dates disabled) + anglers stepper + live total/deposit on the right;
  submit → confirmation stressing "wait for Roberto's direct message, nothing booked until
  he confirms."
- Tweakable placeholders: currency, full/half/lagoon base price, deposit %, full-refund
  days, deposit-retained days.

## 10. Open decisions checklist (ask the client)


1. Final list of waters + each one's region (map pins).
2. On-site pricing presentation: hidden / bands / "from" figure — and indicative numbers.
3. Real deposit % and cancellation windows, payment = bank transfer.
4. Does the day-slot request go through Calendly, a simple form → email, or both?
5. Which spots share a price band / group?
6. Confirm blog (Sanity) is in scope for v1 or later.
