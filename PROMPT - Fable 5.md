# PROMPT FOR FABLE 5 — italianbassfishing.it (reproduce this build)

You do **not** need to start from zero. This prompt tells Fable 5 to reproduce the design
that already exists (the "presentation" prototype) as closely as possible, then wire the
real production behaviour. **Attach the reference screenshots** in `/reference/`
(01-home, 02-tours, 03-booking-modal, 04-about) when you paste this — they show the exact
look to match.

---

## ▶ Prompt to paste into Fable 5

Build **italianbassfishing.it** — the showcase + enquiry website for a guided
predator-fishing service in Italy, for English-speaking anglers (mainly Anglo-Saxon)
visiting Veneto and the Venice Lagoon.

**Reproduce the attached reference screenshots faithfully** (layout, colours, type,
spacing). This is not a from-scratch concept — match what's shown, then wire the behaviour
described under "Booking". Where a management detail is unknown, **ask me the questions in
"DECISIONS" and wait — do not invent prices, policies, or spot data.**

### Exact design system (match precisely)
- **Single dark background across the whole site:** deep green `#13221b`. No white, no
  cream panels anywhere. Modal surface slightly lighter: `#182a20`.
- **Text:** cream `#f3ead9` (headings full-opacity; body at ~70–75% opacity via
  `rgba(243,234,217,.72)`).
- **Accent:** gold `#c9a227` — used for eyebrow labels, the diamond bullet markers, chip
  outlines, the "Book Now" / CTA buttons, calendar selection, and map pins.
- **Fonts:** `Archivo` weight 900 for all headlines (tight line-height ~0.95–1.05,
  letter-spacing -0.01em on the big hero); `Barlow Condensed` (400/500/600/700) for body,
  labels, buttons. Eyebrow labels: Barlow Condensed 700, 11–13px, uppercase,
  letter-spacing .25–.3em, gold.
- **Buttons:** solid gold `#c9a227` fill, dark `#13221b` text, uppercase Barlow Condensed
  600, letter-spacing .05em, near-square corners (2px radius).
- **Chips** (species & credentials): pill (`border-radius:999px`), background
  `rgba(201,162,39,.12)`, 1px border `rgba(201,162,39,.4)`, gold text, uppercase.
- **Sticky header** on all pages: logo left ("ITALIAN BASS FISHING", Archivo 900),
  right-side nav Home / Tours & Booking / The Guide, an **EN/IT toggle**, and a gold
  "Book Now" button. Active page slightly brighter than the others.
- Generous section padding (~48–76px). Thin `rgba(243,234,217,.1)` dividers between
  sections. **No dense boxed stat grids** — the client dislikes them.

### Pages & sections (match the screenshots)

**HOME**
1. Full-bleed hero (~640px), photo with a bottom-up dark gradient to `#13221b`. Eyebrow
   "#PredatorFishing · Veneto, Italy"; H1 **"WHERE THE PREDATOR WAITS"** (Archivo 900,
   ~80px); sub "Not only fishing — a real interactive experience discovering local nature
   and wildlife."; gold CTA **"Discover the Tours"**.
2. **"Why fish with Roberto"** — a quiet 2-column checklist, each line prefixed by a small
   gold diamond (rotated square), keyword in gold: *40 years* chasing predators across
   Italy · *AIGUPP* certified guide · ITA 156/22 · *Fishery warden* — active in restocking
   · *Multiple* national tournament awards. (This replaced an earlier boxed stat grid — keep
   it airy.)
3. Guide teaser — split 50/50: portrait left; right: eyebrow "The Guide", name "Roberto
   Bertoncello", 40-years blurb, "Meet the guide →".
4. Target-species chips: Bass · Pike · Zander · Perch · Sea Bass · Gilthead Bream.
5. Waters teaser line: "Eleven waters across northern & central Italy — lakes, rivers and
   the Venice Lagoon." + "See the waters & map →".
6. "Discover the Tours" — 3 tour cards (image, title, duration · species).

**TOURS & BOOKING**
- Header: eyebrow "Book a Day on the Water", H1 "Guided predator fishing, Catch &
  Release", intro paragraph.
- **3 tour cards** in a bordered row (Full-Day Predator Hunt / Half-Day Spin & Cast /
  Lagoon Discovery, Burano) each with image, description, Duration / Group size / Species,
  and a gold **"Enquire to Book"** button.
- **"How Booking Works"** — a 3-step horizontal **timeline** (connected gold-ring numbered
  badges 01/02/03): *Send an enquiry* → *Personal confirmation* (Roberto confirms directly
  based on water & weather) → *Meet at the water* (gear rental available).
- **"Index of Waters"** — two columns: left an interactive **schematic SVG map of Italy**
  with gold numbered pins; right a numbered list of the 11 waters. "Schematic map, not to
  scale." caption.

**THE GUIDE (About)**
- Hero (~520px) with portrait + gradient, eyebrow "The Guide", big name.
- Two-paragraph bio (see "Copy" below).
- Credential chips: 40 years experience · AIGUPP certified — ITA 156/22 · Fishery warden &
  restocking · Multiple national awards · Custom-built bass boat · English spoken.
- "On the Water" 4-image gallery.
- "Beyond Fishing" — Roberto is also a cyclist; a second guided experience, coming soon.

### Booking flow (the interactive part)
Clicking **"Enquire to Book"** opens a modal:
- **Left:** tour image, name, description, **per-person price**, and a **Payment &
  Cancellation** block: payment by bank transfer (bonifico); a deposit is required; full
  refund if cancelled ≥ N days before; deposit retained if cancelled within M days.
- **Right:** a working **calendar** (month nav, past dates disabled, one selectable date),
  an **anglers stepper** (1–6), a note "The more anglers share the boat, the lower the
  per-person rate", a live summary (per-person × anglers = total, deposit = X%), and a gold
  **"Send booking request"** button (disabled until a date is picked).
- **On submit:** a confirmation state — "Request sent", summary of tour/date/party, and a
  highlighted notice: **"Please wait for a direct message from Roberto to confirm your date
  before making any payment or arrangement — nothing is booked until he confirms."**
- Copy throughout must stress this is a **request, not a confirmed booking**; you get a
  **summary email**, then a **direct message from Roberto**.

**Group pricing model used in the prototype** (per-person rate drops as the group grows):
solo = base price; multiply base by these factors for party size 1→6:
`[1, 0.667, 0.5, 0.417, 0.367, 0.333]`, round to whole currency. Example at base €300:
1 → €300, 2 → €200/pp, 3 → €150/pp. Treat base prices and these factors as **placeholders**
— confirm real numbers with me. Base placeholders now: Full-day €300, Half-day €180,
Lagoon €350; deposit 30%; full refund ≥15 days; deposit retained within 3 days.

### Data (placeholders — confirm with me)
- **Species:** Bass, Pike, Zander, Perch, Sea Bass, Gilthead Bream.
- **Waters (11):** Lake Garda, Lake Iseo, Lake Corlo, Lake Revine, Lake Bolsena (volcanic),
  Brenta River at Strà, Bacchiglione, Sile, Venice Lagoon (Burano), Lake Bilancino, Lake
  Massaciuccoli. (Confirm the final list + each one's region for accurate pins.)
- **Guide facts:** AIGUPP ITA 156/22; 40 years; fishery warden + restocking; **winner of
  several national awards** (phrase as wins — not "qualified"; e.g. 1st of 30 boats in the
  2021 Italian Predator Boat Championship qualifier at Lago di Endine); custom-built bass
  boat; speaks English; guides in the Venice Lagoon.

### Copy to reuse verbatim (About bio)
> "Roberto has spent 40 years reading Italian water — from Alpine lakes to the tidal
> channels of the Venice Lagoon. A certified AIGUPP Fishing Guide (ITA 156/22), he is also
> a fishery warden, active in local fish restocking, and a familiar face at national
> predator-fishing tournaments, where he has taken home multiple awards — including 1st of
> 30 boats in the qualifying round of the 2021 Italian Predator Boat Championship at Lago
> di Endine."
>
> "His boat is custom-built to his own specification for chasing bass, pike, zander and
> perch. Roberto speaks English and regularly guides visiting anglers through the Venice
> Lagoon — not only fishing, but a real interactive experience discovering local nature and
> wildlife."

### Tech
Vite + React, Tailwind CSS, React Router, **Sanity** (blog CMS), **Calendly** (slot
requests), **i18next** (IT/EN), deploy Vercel/Netlify. Domain **italianbassfishing.it**.
Photos from Instagram **@robertobertoncello_**.

---

### DECISIONS — ask me first, then recommend the cleanest approach
1. **Spot list & regions** — final list? each water's region for map pins?
2. **On-site pricing** — hide it ("on request, confirmed by email"), show **price bands by
   zone**, or an indicative "from €X per person" per area? If bands: which spots share a
   band, and indicative min–max? (Prices genuinely vary by location and party size, but
   are finalised by email — so decide how much to show.)
3. **Deposit % + cancellation windows** — real numbers; payment = bank transfer, confirm.
4. **Request channel** — Calendly, a form → email, or both?
5. **Blog (Sanity)** — v1 or later phase?
6. **Future teasers** — mention the branded-lures shop / cycling service now, or keep out
   of v1?

After my answers, propose the map → slot-request → email wiring and flag Roberto's manual
confirmation step.
