import type { GeoPoint } from "./sacred-geography";

export interface CharDhamSite {
  id: number;
  slug: string;
  name: string;
  sanskrit: string;
  location: string;
  state: string;
  lat: number;
  lng: number;
  image: string;
  puranaStory: string;
  history: string;
  today: string;
  circuitNote: string;
  sources: string[];
}

export const CHAR_DHAM_ORDER_NOTE =
  "Adi Shankara’s four-corners yatra is commonly listed as Badrinath, Puri, Dwarka, and Rameswaram. Uttarakhand’s smaller Char Dham (Yamunotri, Gangotri, Kedarnath, Badrinath) is a different circuit.";

export const CHAR_DHAM: CharDhamSite[] = [
  {
    id: 1,
    slug: "badrinath",
    name: "Badrinath",
    sanskrit: "बद्रीनाथ",
    location: "Badrinath, Chamoli",
    state: "Uttarakhand",
    lat: 30.744,
    lng: 79.491,
    image: "/vishnu/char-dham/badrinath.png",
    puranaStory:
      "Vishnu as Badarīnārāyaṇa in the Himalaya, associated with Nara-Nārāyaṇa tapas under the badari tree. Vaishnava mahātmya frames the cold valley as a place where dual forms of the divine practise austerity for the world’s sake — tradition, not a dated diary.",
    history:
      "A Garhwal temple on the Alaknanda, closed in winter; the utsava murti is taken to Joshimath. Early medieval Shaiva-Vaishnava Himalayan layers sit under a living Vishnu shrine.",
    today:
      "Open roughly May–November, dates notified yearly. Helipad and road are modern. Altitude and the last stretch of highway are the actual hardship.",
    circuitNote: "Northern Char Dham of the four-corners set; also in the Uttarakhand Char Dham.",
    sources: ["Badrinath temple, Chamoli", "Four-corners Char Dham lists"],
  },
  {
    id: 2,
    slug: "puri",
    name: "Puri Jagannath",
    sanskrit: "जगन्नाथ पुरी",
    location: "Puri",
    state: "Odisha",
    lat: 19.805,
    lng: 85.818,
    image: "/vishnu/char-dham/puri.png",
    puranaStory:
      "Krishna as Jagannātha with Balabhadra and Subhadrā. Wooden images are periodically renewed (nabakalebara) — a documented ritual fact inside a larger Purāṇic ocean of stories about the lord of the world who rides a public cart.",
    history:
      "An eastern coastal kshetra with Ganga-era and later temple fabric. Rath Yatra is a documented public procession.",
    today:
      "Entry rules for the inner temple are strict. Vimala’s shrine in the same compound is the Shakta peetha of this pin.",
    circuitNote: "Eastern Char Dham. Same coordinates as the Vimala peetha inside the complex.",
    sources: ["Jagannath temple, Puri", "Nabakalebara as temple custom"],
  },
  {
    id: 3,
    slug: "dwarka",
    name: "Dwarka",
    sanskrit: "द्वारका",
    location: "Dwarka",
    state: "Gujarat",
    lat: 22.239,
    lng: 68.968,
    image: "/vishnu/char-dham/dwarka.png",
    puranaStory:
      "Krishna’s western city on the sea. The sea-taking of Dvārakā is mahātmya; underwater archaeology is a separate, checkable argument. Pilgrims meet a living Dwarkadhish flag-ritual, not a sealed underwater palace tour.",
    history:
      "A Saurashtra Krishna temple town. The present Dwarkadhish is a later rebuild on an old tirtha. Bet Dwarka is an island visit.",
    today:
      "Combine with Nageshwar Jyotirlinga only as Gujarat travel. Gomti ghat and the flag-changing are living temple custom.",
    circuitNote: "Western Char Dham.",
    sources: ["Dwarkadhish temple, Dwarka"],
  },
  {
    id: 4,
    slug: "rameswaram",
    name: "Rameswaram",
    sanskrit: "रामेश्वरम्",
    location: "Rameswaram Island",
    state: "Tamil Nadu",
    lat: 9.288,
    lng: 79.317,
    image: "/vishnu/char-dham/rameswaram.png",
    puranaStory:
      "Rāma worships Śiva at Setu after the Lanka war — a rare public braid of Vaishnava and Shaiva devotion on one island. The same pin is a Jyotirlinga and a Char Dham. Two traditions, one corridor of stone.",
    history: "Ramanathaswamy temple with long pillared corridors; Chola-Pandya-Nayaka work.",
    today:
      "Twenty-two theerthams as a counted circuit. The railway bridge is not the Puranic setu.",
    circuitNote: "Southern Char Dham, shared with the Jyotirlinga map.",
    sources: ["Ramanathaswamy temple", "Four-corners Char Dham"],
  },
];

export function listCharDhamSlugs(): string[] {
  return CHAR_DHAM.map((item) => item.slug);
}

export function getCharDhamBySlug(slug: string): CharDhamSite | undefined {
  return CHAR_DHAM.find((item) => item.slug === slug);
}

export function charDhamPoint(site: CharDhamSite): GeoPoint {
  return { lat: site.lat, lng: site.lng };
}
