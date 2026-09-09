/**
 * Original Hind AI katha grantha — book-style chapters for on-platform deep reading.
 * Prose is original to Hind AI. Motifs draw on public-domain itihāsa / Purāṇa tradition
 * and are labelled as tradition, not dated journalism. Not a copy of any modern paperback.
 */

export type KathaTradition = "mahadev" | "devi" | "vishnu" | "ganesha";

export type KathaChapter = {
  id: string;
  title: string;
  sanskrit: string;
  readingMinutes: number;
  body: string[];
  sources: string[];
};

export type KathaGrantha = {
  slug: KathaTradition;
  title: string;
  sanskrit: string;
  tagline: string;
  heroImage: string;
  relatedHref: string;
  note: string;
  chapters: KathaChapter[];
};

export const KATHA_NOTE =
  "These chapters are original Hind AI teaching prose. They retell public-domain motifs from itihāsa and Purāṇa with clear ‘tradition’ labelling. They are not scans or paraphrases of copyrighted modern Kathasar / paperback editions.";

export const KATHA_GRANTHAS: KathaGrantha[] = [
  {
    slug: "mahadev",
    title: "Mahadeva Katha",
    sanskrit: "महादेव कथा",
    tagline: "From cosmic stillness to twelve lights on the map",
    heroImage: "/mahadev/hero.webp",
    relatedHref: "/mahadev",
    note: "Shaiva chapters for learners who want story depth without fake GPS certainty.",
    chapters: [
      {
        id: "stillness",
        title: "The one who sits when worlds shake",
        sanskrit: "स्थिरता",
        readingMinutes: 6,
        body: [
          "Before temples had clocks, Shaiva imagination already had a posture: Śiva seated, spine like a mountain, eyes half-open. The stories do not begin with a résumé. They begin with a stillness that can hold poison, dance, and teaching without becoming chaos.",
          "When Purāṇic tellings speak of the ocean’s churning, poison rises before nectar. Gods and asuras panic. Śiva drinks. The throat turns blue — Nīlakaṇṭha — and the worlds continue. Read this as a theology of responsibility under crisis: someone absorbs the cost so others may live. It is not a chemistry experiment.",
          "That same stillness becomes the Himalaya’s silence in later poetry, the ash-smeared ascetic at the cremation ground, and the householder who blesses marriage. Shaivism refuses a single costume. The god who drinks poison also weds Pārvatī; the dancer who shreds worlds also teaches as Dakṣiṇāmūrti under a banyan.",
        ],
        sources: [
          "Shiva Purana Samudra Manthan / Nilakantha motifs (tradition)",
          "Living Shaiva iconography: ascetic, householder, teacher, dancer",
        ],
      },
      {
        id: "linga-of-light",
        title: "Linga of light — and why twelve names travel",
        sanskrit: "ज्योतिर्लिङ्ग",
        readingMinutes: 7,
        body: [
          "A jyotirliṅga is a sign of radiance. The Shiva Purāṇa speaks of a column of light without beginning or end — a teaching against the ego that wants to measure the Absolute. Pilgrims later walk to twelve living temples whose names echo a stotra’s geography.",
          "Somnath by the sea, Mallikarjuna in the hills, Mahakaleshwar where time itself is named, Omkareshwar on a river island, Kedarnath under snow — each place keeps its own rebuild history, altitude, and queue culture. The stotra is one song; the stones are many rebuilds.",
          "Hind AI’s map therefore separates katha from cadastral fact. Where two towns claim one name, we name the dispute. The light of the story is not cancelled by honesty about roads, floods, and corridor rebuilds.",
        ],
        sources: [
          "Dwadasa Jyotirlinga stotra geography (tradition)",
          "Hind AI Jyotirlinga place pages — history labelled as history",
        ],
      },
      {
        id: "night-and-monday",
        title: "The great night and the Monday vow",
        sanskrit: "शिवरात्रि · सोमवार",
        readingMinutes: 5,
        body: [
          "Maha Shivaratri gathers India into one night of bilva, abhisheka, and wakefulness. Monthly Shivaratri and Pradosha twilight keep smaller drums beating through the year. Shravan Mondays turn North and West Indian lanes toward the linga with water pots and quiet resolve.",
          "What not to do matters as much as what to chant: do not shove the sanctum, do not film forbidden rooms, do not treat the night as a party with alcohol at the threshold. Devotion that harms the queue harms the vow.",
          "When you finish this chapter, open the festival page and the Mahadeva map. Story without geography becomes fog; geography without story becomes a tourist checklist. Hind AI keeps both on one platform.",
        ],
        sources: [
          "Living Maha Shivaratri / Shravan Monday custom",
          "Hind AI /festivals/maha-shivaratri",
        ],
      },
    ],
  },
  {
    slug: "devi",
    title: "Devi Katha",
    sanskrit: "देवी कथा",
    tagline: "Three battles, many peethas, one refusal to fake the map",
    heroImage: "/devi/hero.webp",
    relatedHref: "/devi",
    note: "Śākta chapters that honour Devi Māhātmya while refusing a fake GPS of Sati’s body.",
    chapters: [
      {
        id: "three-episodes",
        title: "Three episodes inside one hymn",
        sanskrit: "देवी माहात्म्य",
        readingMinutes: 7,
        body: [
          "The Devī Māhātmya, nested in the Mārkaṇḍeya Purāṇa, is not a single battle report. It is three rising storms: Madhu-Kaitabha, Mahiṣāsura, and Śumbha-Niśumbha. Each time, the Goddess gathers the powers of the gods into one clarity that can cut confusion.",
          "Readers who only know ‘Durga on a lion’ miss the hymn’s psychology: fear organises itself as a buffalo demon, pride as a pair of brothers, and sleep as a cosmic threat. The sword is insight with courage. Autumn’s nine nights recite this grammar aloud across India.",
          "Garba circles in Gujarat, Durga Puja pandals in Bengal, and mountain processions in Himachal are not copies of one another. They are regional bodies dancing the same hymn’s heat.",
        ],
        sources: [
          "Devi Mahatmya / Markandeya Purana (tradition)",
          "Regional Sharad Navaratri living custom",
        ],
      },
      {
        id: "sati-and-lists",
        title: "Sati’s grief and the problem of lists",
        sanskrit: "सती · पीठ",
        readingMinutes: 6,
        body: [
          "When Sati leaves her body at Daksha’s insulted yajña, Śiva’s grief shakes the worlds. Later tellings say Viṣṇu’s discus scatters her limbs, and peethas rise where they fall. The story teaches that the sacred feminine is not confined to one palace.",
          "Printed books love the number fifty-one. Living India disagrees about sites. Some famous yatras are not peethas at all. Hind AI indexes places we can locate, then labels common peetha, disputed assignment, or major yatra — so learning does not require lying.",
          "Kamakhya on Nilachal, for example, is a living centre of Assamese Śākta calendar with Ambubachi’s yearly closing. That is geography and custom you can check — beside the katha, not underneath it.",
        ],
        sources: [
          "Daksha-yajna / peetha origin motif (tradition)",
          "Hind AI Devi tirtha index and list-status labels",
        ],
      },
      {
        id: "blood-and-flowers",
        title: "Blood, flowers, and asking the shrine",
        sanskrit: "उपचार",
        readingMinutes: 5,
        body: [
          "Some peethas historically knew blood offering; many urban Durgā spaces are strictly vegetarian. Both facts can be true in one civilisation. The error is importing one district’s rule into another’s sanctum without asking.",
          "Navaratri etiquette is practical holiness: cover shoulders where asked, respect photography bans, keep late-night garba safe, and never treat the Goddess as a costume prop.",
          "When the nine nights end in Vijayadashami, victory is not cruelty. It is clarity that refuses to let chaos wear the crown.",
        ],
        sources: [
          "Living Shakta temple variance on offerings",
          "Hind AI /festivals/sharad-navaratri and /festivals/vijayadashami",
        ],
      },
    ],
  },
  {
    slug: "vishnu",
    title: "Vishnu Katha",
    sanskrit: "विष्णु कथा",
    tagline: "Descents, dharma fields, and four corners of the peninsula",
    heroImage: "/vishnu/hero.webp",
    relatedHref: "/vishnu",
    note: "Vaishnava chapters for Dashavatara literacy and Char Dham as real places. For Marathi pothi depth open /harivijay and /ramvijay.",
    chapters: [
      {
        id: "descents",
        title: "Why the Absolute descends",
        sanskrit: "अवतार",
        readingMinutes: 6,
        body: [
          "Avatāra means descent. In Vaishnava theology, when dharma thins, Viṣṇu takes forms the world can meet: fish and tortoise of cosmic rescue, man-lion of threshold justice, dwarf of measured asking, Rama of maryādā, Krishna of intimate play and hard teaching.",
          "Lists of ten vary slightly — Balarāma or Buddha appear in different classical enumerations. The point is not a zoology quiz. The point is that transcendence refuses to abandon history’s mess.",
          "Read the Gītā not as a motivational poster but as a conversation on a battlefield about duty, grief, and the self that is not killed when bodies fall. Then the avatāra stops being a comic-book power-up.",
        ],
        sources: [
          "Classical Dashavatara lists (tradition)",
          "Bhagavad Gita within Mahabharata (itihasa)",
        ],
      },
      {
        id: "rama-krishna",
        title: "Two childhoods, two ethics",
        sanskrit: "राम · कृष्ण",
        readingMinutes: 7,
        body: [
          "Rama’s birth in Ayodhya is told as the arrival of Maryāda Puruṣottama — the person who keeps the measure. Exile, forest, war, and return become a public curriculum of promise-keeping. Diwali lamps in many homes remember that return.",
          "Krishna’s birth in a prison, the Yamuna crossing, butter thefts, and the Kurukshetra discourse form another curriculum: intimacy and toughness braided. Janmashtami’s midnight cradle is not only cute — it is the claim that the Absolute enters risk.",
          "Onam’s Mahabali story and Vamana’s three steps remind South India that generosity and cosmic order can argue inside one festival table.",
        ],
        sources: [
          "Valmiki Ramayana; Bhagavata Purana (tradition)",
          "Hind AI festival pages: Rama Navami, Janmashtami, Onam, Diwali",
        ],
      },
      {
        id: "four-corners",
        title: "Four corners you can walk",
        sanskrit: "चार धाम",
        readingMinutes: 5,
        body: [
          "Badrinath, Dwarka, Puri, and Rameswaram mark a Vaishnava map of the peninsula. Later memory ties the circuit to Adi Shankara; each temple keeps its own rebuilds, kitchens, and crowd sciences.",
          "Puri’s ratha gave English the word juggernaut — a reminder that Indian ritual entered world language as living force, not as museum dust.",
          "Ekadashi fasting twice a month is the quiet drum under the famous festivals. If you only visit Char Dham once, still keep one ekadashi as a listening day for the Gītā or a name of Viṣṇu.",
        ],
        sources: ["Char Dham pilgrimage geography", "Living ekadashi custom in Vaishnava homes"],
      },
    ],
  },
  {
    slug: "ganesha",
    title: "Ganesha Katha",
    sanskrit: "गणेश कथा",
    tagline: "Obstacle, wit, and eight roads in Maharashtra",
    heroImage: "/festivals/ganesh-chaturthi.webp",
    relatedHref: "/ganesha",
    note: "Ganapatya chapters for beginnings, clay ethics, and Ashtavinayak as a real circuit.",
    chapters: [
      {
        id: "guardian",
        title: "The guardian at the door",
        sanskrit: "द्वारपाल",
        readingMinutes: 6,
        body: [
          "Pārvatī forms a guardian; a contest with Śiva ends in a new head — an elephant’s — and a god who remembers both wound and wisdom. Other Purāṇic tellings exist. Together they teach that the one who removes obstacles first knows what an obstacle is.",
          "Gaṇeśa sits at thresholds: new ledgers, new journeys, new manuscripts. The Mahābhārata scribe legend — Vyasa dictating, Gaṇeśa writing without pause — is a story about attention. Dense verses force the scribe to think. Learning is not stenography.",
          "Begin rites with Gaṇapati not as superstition insurance, but as naming the work’s friction before you pretend the road is smooth.",
        ],
        sources: [
          "Ganesha birth narratives in Purana tradition",
          "Mahabharata scribe motif (tradition)",
        ],
      },
      {
        id: "clay-city",
        title: "Clay, city, and the visarjan vow",
        sanskrit: "मृत्तिका",
        readingMinutes: 6,
        body: [
          "Ganesh Chaturthi in Maharashtra became civic language through sarvajanik pandals — public devotion that also taught satire, solidarity, and neighbourhood art. Tilak’s era scaled what homes already loved.",
          "Modaka and durva remain classic offerings. The modern ethical test is clay: natural clay returns to water; plaster poisons lakes. Visarjan day is bhakti plus civic duty. Blocking ambulances is not devotion.",
          "When the murti leaves, the empty corner of the home teaches non-attachment more sharply than a slogan. Keep the aarti book open anyway — Hind AI’s Marathi sangrah is for the whole year.",
        ],
        sources: [
          "Sarvajanik Ganeshotsav civic history",
          "Hind AI /festivals/ganesh-chaturthi and /ganesh-aarti",
        ],
      },
      {
        id: "eight-roads",
        title: "Eight forms, one circuit",
        sanskrit: "अष्टविनायक",
        readingMinutes: 5,
        body: [
          "Mayureshwar to Mahaganapati — eight living Ganapatis form a Maharashtra road story with a traditional order. Distances are real. Village temple hours are real. Treating the yatra as a selfie checklist insults both map and murti.",
          "Each halt keeps a local mahātmya: peacock legends, ballala devotion, hill caves, river crossings. Read one local story per halt, then walk. That is how geography becomes memory.",
          "Obstacle-removal that cannot wait in a queue has already failed the lesson.",
        ],
        sources: ["Ashtavinayak circuit living pilgrimage", "Hind AI /ganesha map and place pages"],
      },
    ],
  },
];

export function getKathaBySlug(slug: string): KathaGrantha | undefined {
  return KATHA_GRANTHAS.find((item) => item.slug === slug);
}

export function kathaSlugs(): KathaTradition[] {
  return KATHA_GRANTHAS.map((item) => item.slug);
}
