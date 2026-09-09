/**
 * Deep tradition primers for god home pages.
 * Katha = scripture / oral tradition. Practice = living custom. Geography = checkable place.
 */

export type TraditionPrimer = {
  id: string;
  title: string;
  kind: "katha" | "practice" | "geography" | "etiquette" | "fun";
  body: string;
};

export const MAHADEV_DEEP: TraditionPrimer[] = [
  {
    id: "samudra-manthan",
    title: "Halahala and the blue throat",
    kind: "katha",
    body: "When the ocean was churned, poison rose before nectar. Shaiva Purāṇas tell that Śiva drank it so the worlds would live — hence Nīlakaṇṭha, the blue-throated one. This is Purāṇic cosmology: a story about responsibility under crisis, not chemistry.",
  },
  {
    id: "ardhanarishvara",
    title: "Half woman, half man — one form",
    kind: "katha",
    body: "Ardhanārīśvara joins Śiva and Pārvatī in one body. The form teaches that creation needs both stillness and śakti. Temple sculptures from Ellora to Chola bronzes keep the idea public — still art and theology, not anatomy class.",
  },
  {
    id: "panchayatana",
    title: "Panchayatana: five deities, one household altar",
    kind: "practice",
    body: "Smārta households often place Śiva with Viṣṇu, Devī, Gaṇeśa, and Sūrya. The arrangement is a living compromise between exclusive sects and a shared Hindu home. Rules for which deity sits in the centre vary by family lineage.",
  },
  {
    id: "temple-etiquette",
    title: "What not to do in a Shaiva garbhagriha",
    kind: "etiquette",
    body: "Remove footwear. Do not point feet at the linga. Ask before photographing. Do not touch the linga unless the temple invites devotee abhisheka. Silk or clean cotton is safer than beachwear. Loud phone calls near the sanctum break the room’s work.",
  },
  {
    id: "kashi-axis",
    title: "Kashi as a living axis",
    kind: "geography",
    body: "Vārāṇasī / Kashi is not only Vishwanath’s stone — it is a river city of burning ghats, learning maṭhas, and continuous liturgy. The 2021 corridor rebuild changed the approach streets; the Ganga’s current still writes the city’s daily clock.",
  },
  {
    id: "fun-nataraja",
    title: "Fun fact — the cosmic dance went global",
    kind: "fun",
    body: "Naṭarāja bronzes from Tamil country travelled into museums worldwide. CERN keeps a Naṭarāja as a gift of India — a modern emblem, not proof that particle physics equals Tāṇḍava. The Chola image still teaches motion-in-stillness better than any slogan.",
  },
];

export const DEVI_DEEP: TraditionPrimer[] = [
  {
    id: "devi-mahatmya",
    title: "Devi Mahatmya — three episodes, one goddess",
    kind: "katha",
    body: "Inside the Mārkaṇḍeya Purāṇa, the Devī Māhātmya (Durgā Saptaśatī) tells of Madhu-Kaitabha, Mahiṣāsura, and Śumbha-Niśumbha. Nine nights of autumn recite these chapters across India. It is śākta scripture — victory of clarity over chaos — not a war report.",
  },
  {
    id: "sati-daksha",
    title: "Sati, Daksha, and the peetha map",
    kind: "katha",
    body: "When Sati leaves her body at Daksha’s yajña, Śiva’s grief and Viṣṇu’s discus scatter her limbs. Later lists place peethas where those limbs fell. Lists disagree on count and sites. Hind AI maps living temples and labels disputes instead of inventing one GPS truth.",
  },
  {
    id: "blood-vs-veg",
    title: "Blood offerings and vegetarian shrines both exist",
    kind: "practice",
    body: "Some peethas historically accepted animal offering; many urban Durgā pandals are strictly vegetarian. Never assume. Ask the temple, follow posted boards, and do not import one region’s rule into another’s sanctum.",
  },
  {
    id: "etiquette-red",
    title: "Temple etiquette around Shakti",
    kind: "etiquette",
    body: "Cover shoulders and knees where required. Do not step over offerings. In Kamakhya and similar shrines, photography bans are real. During Navaratri, respect separate queues and late-night crowd control.",
  },
  {
    id: "geography-nilachal",
    title: "Nilachal is a hill, not a metaphor",
    kind: "geography",
    body: "Kāmākhyā sits on Nilachal in Guwahati. Ambubachi marks a yearly closing when the temple suspends ordinary darshan. That is living Assamese śākta calendar — check dates before you book flights.",
  },
  {
    id: "fun-garba",
    title: "Fun fact — garba is a circle around a lamp",
    kind: "fun",
    body: "Gujarati garba dances around a gārbā / lamp that stands for the womb of creation. The dance is theology in footwork. Stadium LEDs are optional; the circle is not.",
  },
];

export const VISHNU_DEEP: TraditionPrimer[] = [
  {
    id: "dashavatara",
    title: "Dashavatara — ten descents, many lists",
    kind: "katha",
    body: "Matsya, Kūrma, Varāha, Narasiṃha, Vāmana, Paraśurāma, Rāma, Balarāma or Kṛṣṇa, Buddha or Kṛṣṇa, and Kalki appear in classical lists with small variations. Avatāra means descent to restore dharma — Purāṇic theology, not a species tree.",
  },
  {
    id: "char-dham",
    title: "Char Dham as a peninsula circuit",
    kind: "geography",
    body: "Badrinath (north), Dwarka (west), Puri (east), Rameswaram (south) mark a living Vaishnava map of Bhārat. Adi Shankara’s name is tied to the circuit in later memory; the temples themselves have distinct local histories and rebuilds.",
  },
  {
    id: "tulsi-etiquette",
    title: "Tulsi, shankha, and Vaishnava courtesy",
    kind: "etiquette",
    body: "Many Vaishnava temples prefer tulsi garlands and restrict onions/garlic prasad. Do not wear leather into certain mathas. Ask before photographing the garbhagriha. In Puri, trust local queues and kitchen rules — the Jagannath kitchen is a city unto itself.",
  },
  {
    id: "practice-ekadashi",
    title: "Ekadashi — twice a month, not once a year",
    kind: "practice",
    body: "The eleventh lunar day is a fasting and listening rhythm across Vaishnava homes. Rules differ (water, fruit, full fast). Pair it with Gītā or Bhāgavata reading rather than only calorie maths.",
  },
  {
    id: "fun-rathyatra",
    title: "Fun fact — the word juggernaut",
    kind: "fun",
    body: "English ‘juggernaut’ comes from Jagannātha’s ratha. The Puri cart festival is still a living civic theology — wood, rope, and millions of feet — not a colonial metaphor alone.",
  },
];

export const GANESHA_DEEP: TraditionPrimer[] = [
  {
    id: "birth-head",
    title: "Why an elephant head — Purāṇic answers",
    kind: "katha",
    body: "Pārvatī forms a guardian; Śiva’s contest ends with a new head from the first creature found — an elephant. Other tellings exist. All teach that obstacle and wisdom can share one face. They are sacred story, not zoology.",
  },
  {
    id: "ashtavinayak",
    title: "Eight forms as a road, not a slogan",
    kind: "geography",
    body: "Mayureshwar, Siddhi, Ballaleshwar, Varad, Chintamani, Girijatmaj, Vighnahar, and Mahaganapati form a Maharashtra circuit with a traditional visiting order. Distances are real; start early, respect village temple hours, and do not treat the yatra as a selfie checklist.",
  },
  {
    id: "modaka",
    title: "Modaka, durva, and the clay question",
    kind: "practice",
    body: "Modaka sweets and durva grass are classic offerings. Public Ganeshotsav after Tilak’s era made clay murtis civic theatre. Prefer natural clay; plaster idols poison lakes. Visarjan day is devotion plus civic duty.",
  },
  {
    id: "etiquette-start",
    title: "Why rites begin with Ganapati",
    kind: "etiquette",
    body: "Many samskaras open with Gaṇeśa so obstacles are named before the work begins. Keep the tone short and sincere. Do not skip temple shoe racks or block visarjan ambulances ‘for bhakti’.",
  },
  {
    id: "fun-scribe",
    title: "Fun fact — scribe of the Mahabharata",
    kind: "fun",
    body: "Tradition says Vyasa dictated and Gaṇeśa wrote the Mahābhārata on condition the narration never pause — and Vyasa answered with dense verses so the scribe had to think. A story about attention, not stenography software.",
  },
];

export function primersByKind(
  list: TraditionPrimer[],
  kind: TraditionPrimer["kind"]
): TraditionPrimer[] {
  return list.filter((item) => item.kind === kind);
}
