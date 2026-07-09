// The 11 waters, the 3 tours and the target species.
// Water characteristics researched online — to review with Roberto.
// x / y are pin coordinates on the SVG map (viewBox 0 0 100 120), derived
// from real lat/lon: x = (lon - 6.5) * 8.1 · y = (47.2 - lat) * 11.2

export const SPECIES = ['bass', 'pike', 'zander', 'perch', 'seabass', 'bream', 'asp'];

export const WATERS = [
  {
    id: 'garda', n: 1, name: 'Lake Garda', band: 'bigLakes', x: 33.6, y: 17.4,
    region: { en: 'Lombardy / Veneto', it: 'Lombardia / Veneto' },
    type: { en: 'Great alpine lake', it: 'Grande lago alpino' },
    species: ['pike', 'perch'],
    season: { en: 'Spring – Autumn', it: 'Primavera – Autunno' },
    blurb: {
      en: "Italy's largest lake — deep, clear water and rocky drop-offs where big pike patrol and perch school up. Vast and demanding: local knowledge makes the difference.",
      it: 'Il lago più grande d’Italia — acque profonde e limpide, scarpate rocciose pattugliate da grossi lucci e branchi di persici. Vasto ed esigente: la conoscenza locale fa la differenza.',
    },
  },
  {
    id: 'iseo', n: 2, name: 'Lake Iseo', band: 'bigLakes', x: 29, y: 16.6,
    region: { en: 'Lombardy', it: 'Lombardia' },
    type: { en: 'Deep glacial lake', it: 'Profondo lago glaciale' },
    species: ['perch', 'pike', 'zander'],
    season: { en: 'Spring – Autumn', it: 'Primavera – Autunno' },
    blurb: {
      en: 'A spinning classic: perch on topwater lures in late spring, then deeper with spinnerbaits and soft plastics into autumn. Pike and zander along the weed lines.',
      it: 'Un classico dello spinning: persici in superficie a fine primavera, poi più a fondo con spinnerbait e gomme verso l’autunno. Lucci e sandra lungo le erbaie.',
    },
  },
  {
    id: 'corlo', n: 3, name: 'Lake Corlo', band: 'veneto', x: 42.1, y: 13.2,
    region: { en: 'Veneto — Dolomites', it: 'Veneto — Dolomiti' },
    type: { en: 'Turquoise mountain reservoir', it: 'Lago artificiale di montagna' },
    species: ['pike', 'perch', 'zander'],
    season: { en: 'Late spring – Autumn', it: 'Tarda primavera – Autunno' },
    blurb: {
      en: 'A turquoise reservoir at the foot of the Dolomites, ringed by woods. Pike ambush along the flooded margins — wild scenery, quiet water, honest fishing.',
      it: 'Un bacino turchese ai piedi delle Dolomiti, circondato dai boschi. I lucci in agguato lungo i margini sommersi — scenario selvaggio, acqua tranquilla, pesca vera.',
    },
  },
  {
    id: 'revine', n: 4, name: 'Lake Revine', band: 'veneto', x: 46.5, y: 12.8,
    region: { en: 'Veneto — Treviso pre-Alps', it: 'Veneto — Prealpi trevigiane' },
    type: { en: 'Twin pre-alpine lakes', it: 'Laghi gemelli prealpini' },
    species: ['bass', 'pike', 'zander', 'perch'],
    season: { en: 'Spring – Autumn', it: 'Primavera – Autunno' },
    blurb: {
      en: 'Two small connected lakes in a glacial valley — black bass and pike among the reeds, and some surprisingly large zander for water this size.',
      it: 'Due piccoli laghi comunicanti in una valle glaciale — black bass e lucci tra i canneti, e sandre sorprendentemente grandi per acque così raccolte.',
    },
  },
  {
    id: 'bolsena', n: 5, name: 'Lake Bolsena', band: 'central', x: 44, y: 51.5,
    region: { en: 'Lazio — central Italy', it: 'Lazio — Italia centrale' },
    type: { en: 'Volcanic crater lake', it: 'Lago vulcanico' },
    species: ['bass', 'pike', 'perch'],
    season: { en: 'All year — best spring & autumn', it: 'Tutto l’anno — top primavera e autunno' },
    blurb: {
      en: 'Europe’s largest volcanic lake and the epicentre of Italian bass fishing — gin-clear water over black sand, big largemouth, pike and perch. Anglers call it "the Volcano".',
      it: 'Il più grande lago vulcanico d’Europa e l’epicentro del bass fishing italiano — acqua limpidissima su sabbia nera, grossi black bass, lucci e persici. Gli agonisti lo chiamano "il Vulcano".',
    },
  },
  {
    id: 'brenta', n: 6, name: 'Brenta River, Strà', band: 'veneto', x: 44.7, y: 19.6,
    region: { en: 'Veneto — Riviera del Brenta', it: 'Veneto — Riviera del Brenta' },
    type: { en: 'Lowland river', it: 'Fiume di pianura' },
    species: ['pike', 'asp'],
    season: { en: 'Autumn – Spring', it: 'Autunno – Primavera' },
    blurb: {
      en: 'A slow lowland river winding past the Venetian villas of the Riviera del Brenta. Pike in the slack water, and asp — the most explosive surface predator in Italian fresh water.',
      it: 'Un fiume lento che scorre tra le ville venete della Riviera del Brenta. Lucci nelle acque ferme e aspi — il predatore di superficie più esplosivo delle acque dolci italiane.',
    },
  },
  {
    id: 'bacchiglione', n: 7, name: 'Bacchiglione River', band: 'veneto', x: 41.8, y: 21.8,
    region: { en: 'Veneto — Padua', it: 'Veneto — Padova' },
    type: { en: 'Resurgence river', it: 'Fiume di risorgiva' },
    species: ['pike', 'perch'],
    season: { en: 'Autumn – Spring', it: 'Autunno – Primavera' },
    blurb: {
      en: 'Padua’s home river: steady flows, shaded banks and a healthy population of ambush pike. Short-session water — perfect for a focused half day.',
      it: 'Il fiume di Padova: portata costante, sponde ombreggiate e una buona popolazione di lucci in agguato. Acqua da sessione breve — perfetta per una mezza giornata mirata.',
    },
  },
  {
    id: 'sile', n: 8, name: 'Sile River', band: 'veneto', x: 46.9, y: 16.4,
    region: { en: 'Veneto — Treviso', it: 'Veneto — Treviso' },
    type: { en: 'Spring-fed river', it: 'Fiume di risorgiva' },
    species: ['pike', 'bass'],
    season: { en: 'All year', it: 'Tutto l’anno' },
    blurb: {
      en: 'Europe’s longest resurgence river — constant crystal flows and dense weed beds. Pike and black bass hunt tight to the grassy banks, sight-fishing at its best.',
      it: 'Il più lungo fiume di risorgiva d’Europa — portata costante, acqua cristallina e fitte erbaie. Lucci e black bass cacciano a ridosso delle sponde erbose: pesca a vista al suo meglio.',
    },
  },
  {
    id: 'lagoon', n: 9, name: 'Venice Lagoon, Burano', band: 'lagoon', x: 48.9, y: 19.4,
    region: { en: 'Veneto — Venice', it: 'Veneto — Venezia' },
    type: { en: 'Tidal lagoon', it: 'Laguna di marea' },
    species: ['seabass', 'bream'],
    season: { en: 'Spring – Late autumn', it: 'Primavera – Tardo autunno' },
    blurb: {
      en: 'Tidal channels threading between Burano, Torcello and the barene sandbanks. Sea bass smash topwater lures from spring to autumn, gilthead bream in the warm months — herons, egrets and fishing villages all around.',
      it: 'Canali di marea tra Burano, Torcello e le barene. Le spigole attaccano in superficie da primavera ad autunno, le orate nei mesi caldi — intorno aironi, garzette e villaggi di pescatori.',
    },
  },
  {
    id: 'bilancino', n: 10, name: 'Lake Bilancino', band: 'central', x: 38.5, y: 36.1,
    region: { en: 'Tuscany — Mugello', it: 'Toscana — Mugello' },
    type: { en: 'Open artificial basin', it: 'Bacino artificiale' },
    species: ['bass', 'pike'],
    season: { en: 'Spring – Autumn', it: 'Primavera – Autunno' },
    blurb: {
      en: 'A wide, open basin in the Mugello hills north of Florence — black bass on the flats and points, pike cruising the deeper edges.',
      it: 'Un ampio bacino aperto sulle colline del Mugello, a nord di Firenze — black bass su piane e punte, lucci lungo i bordi più profondi.',
    },
  },
  {
    id: 'massaciuccoli', n: 11, name: 'Lake Massaciuccoli', band: 'central', x: 31, y: 37.7,
    region: { en: 'Tuscany — Versilia', it: 'Toscana — Versilia' },
    type: { en: 'Shallow reed-fringed lake', it: 'Lago basso tra i canneti' },
    species: ['bass', 'pike'],
    season: { en: 'Spring – Autumn', it: 'Primavera – Autunno' },
    blurb: {
      en: "Puccini's lake: shallow, reed-fringed and full of character. Soft plastics between the lily pads for black bass — with pike over five kilos as the surprise guest.",
      it: 'Il lago di Puccini: basso, orlato di canneti, pieno di carattere. Gomme tra le ninfee per i black bass — con lucci oltre i cinque chili come ospite a sorpresa.',
    },
  },
];

export const TOURS = [
  {
    id: 'half',
    img: '/images/tour-half.jpg',
    duration: 4, // hours
    bands: ['veneto', 'bigLakes'],
    priceKey: 'halfDay',
    defaultWater: 'sile',
  },
  {
    id: 'full',
    img: '/images/tour-full.jpg',
    duration: 8,
    bands: ['veneto', 'bigLakes', 'central'],
    priceKey: 'fullDay',
    defaultWater: 'revine',
  },
  {
    id: 'lagoonTour',
    img: '/images/tour-lagoon.jpg',
    duration: 8,
    bands: ['lagoon'],
    priceKey: 'fullDay',
    defaultWater: 'lagoon',
  },
];

export function watersForTour(tour) {
  return WATERS.filter((w) => tour.bands.includes(w.band));
}

export function tourForWater(water) {
  // The tour a water's spot card should push to (full day always available).
  if (water.band === 'lagoon') return TOURS.find((t) => t.id === 'lagoonTour');
  return TOURS.find((t) => t.id === 'full');
}
