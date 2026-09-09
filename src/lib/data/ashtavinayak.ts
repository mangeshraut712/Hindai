export interface AshtavinayakSite {
  id: number;
  slug: string;
  name: string;
  sanskrit: string;
  location: string;
  lat: number;
  lng: number;
  circuitOrder: number;
  /** Local mahātmya — tradition, not dated news */
  puranaStory: string;
  history: string;
  today: string;
  doList: string[];
  dontList: string[];
  sources: string[];
}

export const ASHTAVINAYAK_NOTE =
  "The eight are a documented Maharashtra circuit. Traditional visiting order starts at Morgaon. This is Ganapatya geography, not a Puranic all-India list. Katha below is local tradition; roads and hours are living fact.";

export const ASHTAVINAYAK: AshtavinayakSite[] = [
  {
    id: 1,
    slug: "morgaon",
    name: "Mayureshwar, Morgaon",
    sanskrit: "मयूरेश्वर",
    location: "Morgaon, Pune district",
    lat: 18.277,
    lng: 74.524,
    circuitOrder: 1,
    puranaStory:
      "Local tellings place Gaṇeśa as Mayūreśvara — the peacock-mounted remover who defeats the demon Sindhu in Karha-valley mahātmya. The peacock is the story’s vehicle, not a zoo claim. Morgaon is treated as the circuit’s first bow.",
    history:
      "The starting shrine of the usual Ashtavinayak order, in the Karha valley east of Pune. Village fabric and later sabha halls sit around an older Ganapati centre.",
    today:
      "Begin here if you follow printed yatra books. Expect village queues on weekends and Chaturthi. Footwear outside; ask before photographing the sanctum.",
    doList: [
      "Take a sankalpa for the whole eight-halt circuit at the first bow",
      "Buy prasād only from clean stalls if you eat outside food",
    ],
    dontList: [
      "Do not treat Morgaon as a selfie stop and skip the murti’s quiet",
      "Do not invent a GPS for the peacock battle — it is katha",
    ],
    sources: ["Ashtavinayak circuit mahatmya (tradition)", "Morgaon temple geography"],
  },
  {
    id: 2,
    slug: "siddhatek",
    name: "Siddhivinayak, Siddhatek",
    sanskrit: "सिद्धिविनायक",
    location: "Siddhatek, Ahilyanagar district",
    lat: 18.444,
    lng: 74.716,
    circuitOrder: 2,
    puranaStory:
      "Local tradition says the Siddhi form is linked to accomplishment after Vishnu’s worship here in a battle cycle — mahātmya, not a guaranteed outcome. The right-trunk murti is the living emblem; trunk direction is temple description, not a medical omen.",
    history: "A Bhima-river shrine on the usual second halt. Approach changes with monsoon water.",
    today:
      "Ferry or bridge depending on season. Carry water for the heat. Second in the printed order after Morgaon.",
    doList: [
      "Check river approach before you commit a timetable",
      "Keep the queue calm on the ghats",
    ],
    dontList: ["Do not swim in the Bhima as ‘tirtha sport’ without local advice"],
    sources: ["Siddhatek Ganapati living temple", "Ashtavinayak order books"],
  },
  {
    id: 3,
    slug: "pali-ballaleshwar",
    name: "Ballaleshwar, Pali",
    sanskrit: "बल्लाळेश्वर",
    location: "Pali, Raigad",
    lat: 18.541,
    lng: 73.222,
    circuitOrder: 3,
    puranaStory:
      "Named for the child-devotee Ballāl whose stubborn bhakti, in Konkan tellings, draws Gaṇeśa’s grace against a cruel village headman. The story teaches that devotion can be young and still serious.",
    history: "A Raigad-district Ganapati on the western arc of the circuit.",
    today:
      "Western-side halt. Roads from Khopoli / Pali town are the real navigation — not mythic shortcuts.",
    doList: ["Read Ballāl’s story once before darshan", "Respect village temple closing hours"],
    dontList: ["Do not confuse this Pali with other Indian towns of the same name"],
    sources: ["Ballaleshwar Pali mahatmya (tradition)", "Raigad temple geography"],
  },
  {
    id: 4,
    slug: "mahad-varadavinayak",
    name: "Varadavinayak, Mahad",
    sanskrit: "वरदविनायक",
    location: "Mahad, Raigad",
    lat: 18.075,
    lng: 73.407,
    circuitOrder: 4,
    puranaStory:
      "Varada — the boon-giver — is the name’s heart. A lamp said to have burned for long years is temple lore; treat the lamp story as devotion’s poetry, not a fuel log.",
    history:
      "Fourth halt. The shrine is the village temple of that name — not the coastal Mahad town centre people often confuse it with.",
    today: "Confirm the village pin on a map. Fourth in the usual books after Pali.",
    doList: ["Verify ‘Mahad’ means this village shrine before you drive"],
    dontList: ["Do not equate lamp-lore with a measurable miracle certificate"],
    sources: ["Varadavinayak Mahad", "Ashtavinayak circuit notes"],
  },
  {
    id: 5,
    slug: "theur",
    name: "Chintamani, Theur",
    sanskrit: "चिन्तामणि",
    location: "Theur, Pune district",
    lat: 18.525,
    lng: 74.05,
    circuitOrder: 5,
    puranaStory:
      "Chintāmaṇi is the wish-jewel name. Local tellings link Kapila and a jewel-theft cycle to Gaṇeśa’s settling worry — chintā — into clarity. Again: mahātmya ethics, not a gemstone inventory.",
    history: "Near Pune; an accessible fifth halt on the usual circuit.",
    today: "Easy Pune-side visit. Weekday mornings are kinder than Sunday noon.",
    doList: [
      "Combine thoughtfully with Pune logistics — do not rush five temples in one breathless afternoon",
    ],
    dontList: ["Do not treat ‘wish-jewel’ as a lottery ticket theology"],
    sources: ["Chintamani Theur", "Ashtavinayak order"],
  },
  {
    id: 6,
    slug: "lenyadri",
    name: "Girijatmaj, Lenyadri",
    sanskrit: "गिरिजात्मज",
    location: "Lenyadri, Pune district",
    lat: 19.182,
    lng: 73.877,
    circuitOrder: 6,
    puranaStory:
      "Girijātmaj — son of the Mountain Goddess — is worshipped in a cave. The katha of Pārvatī’s child and the archaeology of Buddhist chaitya caves share one hill without cancelling each other.",
    history:
      "A cave shrine in a Buddhist-era hill complex; the Ganapati occupies a chaitya cave. That layered rock history is checkable.",
    today:
      "Steps up the hill. Carry water; mind knees and monsoon slip. Archaeology boards and the living murti coexist.",
    doList: [
      "Climb with respect for both cave heritage and the murti",
      "Wear shoes you can remove at the cave mouth",
    ],
    dontList: ["Do not carve or litter in protected cave areas"],
    sources: ["Girijatmaj Lenyadri", "Lenyadri cave archaeology notes"],
  },
  {
    id: 7,
    slug: "ozar",
    name: "Vighnahar, Ozar",
    sanskrit: "विघ्नहर",
    location: "Ozar, Pune district",
    lat: 19.188,
    lng: 73.958,
    circuitOrder: 7,
    puranaStory:
      "Vighnahar — remover of obstacles — is the name you hear before beginnings. Local tellings place a battle with Vighnāsura near the Kukadi; the ethic is that obstacles can be named and faced.",
    history: "Vighnahar of Ozar on the Kukadi. Seventh in the usual order before Ranjangaon.",
    today: "A paved temple-town halt. Seventh stop if you began at Morgaon.",
    doList: ["Name one real obstacle you will work on after darshan"],
    dontList: ["Do not block local traffic for convoy photos"],
    sources: ["Vighnahar Ozar", "Ashtavinayak circuit"],
  },
  {
    id: 8,
    slug: "ranjangaon",
    name: "Mahaganapati, Ranjangaon",
    sanskrit: "महागणपति",
    location: "Ranjangaon, Pune district",
    lat: 18.633,
    lng: 74.248,
    circuitOrder: 8,
    puranaStory:
      "Mahāgaṇapati closes the circuit as the ‘great’ form — the full presence after seven earlier bows. Some tellings link a Tripura-related worship; keep that as Shaiva-Ganapatya braid, not a war report.",
    history: "Closing shrine of the usual order on the Pune–Ahmednagar road.",
    today:
      "End here if you began at Morgaon. Offer thanks for the whole road, not only the last queue.",
    doList: ["Complete the circuit’s gratitude — thank drivers, elders, and temple sevaks"],
    dontList: ["Do not skip Morgaon’s first bow and still claim ‘full Ashtavinayak’ casually"],
    sources: ["Mahaganapati Ranjangaon", "Ashtavinayak closing custom"],
  },
];

export function listAshtavinayakSlugs(): string[] {
  return ASHTAVINAYAK.map((item) => item.slug);
}

export function getAshtavinayakBySlug(slug: string): AshtavinayakSite | undefined {
  return ASHTAVINAYAK.find((item) => item.slug === slug);
}
