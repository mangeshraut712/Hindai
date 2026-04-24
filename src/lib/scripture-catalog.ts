import { MAHAPURANAS, UPANISHADS, scriptures } from "@/lib/data/scriptures";

export type ScriptureItem = {
  slug: string;
  name: string;
  sanskrit: string;
  category: string;
  description: string;
  highlight: string;
  href: string;
  language?: string;
  approximateDate?: string;
  keyConcepts?: string[];
  readingLens?: string;
};

export type ScriptureSection = {
  id: string;
  title: string;
  description: string;
  items: ScriptureItem[];
};

export const scriptureSections: ScriptureSection[] = [
  {
    id: "vedas",
    title: "Vedas",
    description:
      "Foundational hymns, rituals, and philosophical seeds from the oldest Sanskrit tradition.",
    items: [
      {
        slug: "rigveda",
        name: "Rigveda",
        sanskrit: "ऋग्वेद",
        category: "Veda",
        description: "The oldest layer of Vedic poetry, invocation, and cosmic imagination.",
        highlight: "Hymns, cosmology, praise",
        href: "/rigveda",
        language: "Vedic Sanskrit",
        approximateDate: "~1500–1200 BCE",
        keyConcepts: ["Cosmology", "Hymns", "Ritual", "Nature"],
        readingLens:
          "Begin with the opening hymns and treat the text as poetic cosmology, not only ritual material.",
      },
      {
        slug: "samaveda",
        name: "Samaveda",
        sanskrit: "सामवेद",
        category: "Veda",
        description: "The Veda of melodies, containing chants and songs for rituals.",
        highlight: "Music, chants, rituals",
        href: "/samaveda",
        language: "Vedic Sanskrit",
        approximateDate: "~1200–1000 BCE",
        keyConcepts: ["Music", "Chants", "Ritual", "Harmony"],
        readingLens:
          "Approach as musical scripture, understanding the role of sound in spiritual practice.",
      },
      {
        slug: "yajurveda",
        name: "Yajurveda",
        sanskrit: "यजुर्वेद",
        category: "Veda",
        description: "The Veda of sacrificial formulas and prose mantras.",
        highlight: "Rituals, formulas, sacrifice",
        href: "/yajurveda",
        language: "Vedic Sanskrit",
        approximateDate: "~1200–800 BCE",
        keyConcepts: ["Ritual", "Sacrifice", "Formulas", "Action"],
        readingLens: "Focus on the practical aspects of Vedic ritual and ceremonial practice.",
      },
      {
        slug: "atharvaveda",
        name: "Atharvaveda",
        sanskrit: "अथर्ववेद",
        category: "Veda",
        description: "The Veda of charms, spells, and everyday wisdom.",
        highlight: "Charms, healing, magic, wisdom",
        href: "/atharvaveda",
        language: "Vedic Sanskrit",
        approximateDate: "~1200–1000 BCE",
        keyConcepts: ["Healing", "Protection", "Wisdom", "Magic"],
        readingLens: "Explore the practical and magical dimensions of Vedic knowledge.",
      },
    ],
  },
  {
    id: "epics",
    title: "Epics",
    description:
      "Narratives of duty, exile, war, devotion, kinship, and the moral pressure of action.",
    items: [
      {
        slug: "mahabharata",
        name: "Mahabharata",
        sanskrit: "महाभारत",
        category: "Epic",
        description: "A civilizational epic about dharma under impossible human conditions.",
        highlight: "Dharma, statecraft, war",
        href: "/mahabharata",
        language: "Sanskrit",
        approximateDate: "~400 BCE–400 CE",
        keyConcepts: ["Dharma", "Politics", "War", "Kinship"],
        readingLens:
          "Use it as a text of ethical tension: the interesting questions are usually the unresolved ones.",
      },
      {
        slug: "ramayana",
        name: "Ramayana",
        sanskrit: "रामायण",
        category: "Epic",
        description: "The journey of Rama, Sita, Lakshmana, and Hanuman through love and duty.",
        highlight: "Exile, devotion, kingship",
        href: "/ramayana",
        language: "Sanskrit",
        approximateDate: "~500 BCE–100 BCE",
        keyConcepts: ["Devotion", "Kingship", "Exile", "Dharma"],
        readingLens: "Read it as both a narrative and a study in conduct, relationship, and rule.",
      },
      {
        slug: "bhagavad-gita",
        name: "Bhagavad Gita",
        sanskrit: "श्रीमद्भगवद्गीता",
        category: "Dialogue",
        description: "Krishna's teaching on action, devotion, knowledge, and inner steadiness.",
        highlight: "Karma, yoga, liberation",
        href: "/bhagavad-gita",
        language: "Sanskrit",
        approximateDate: "~400 BCE–200 CE",
        keyConcepts: ["Karma Yoga", "Bhakti", "Jnana", "Moksha"],
        readingLens:
          "The Gita works best as guided dialogue: question, crisis, instruction, then lived application.",
      },
    ],
  },
  {
    id: "puranas",
    title: "Puranas",
    description:
      "Mythic, devotional, and narrative worlds that make metaphysics emotionally legible.",
    items: [
      {
        slug: "srimad-bhagavatam",
        name: "Srimad Bhagavatam",
        sanskrit: "श्रीमद्भागवतम्",
        category: "Purana",
        description: "A devotional universe centered on Krishna, bhakti, and divine play.",
        highlight: "Bhakti, Krishna, cosmic story",
        href: "/srimad-bhagavatam",
        language: "Sanskrit",
        approximateDate: "~900–1000 CE",
        keyConcepts: ["Bhakti", "Krishna", "Narrative theology"],
        readingLens:
          "Enter through story, but notice how devotion is used as an interpretive framework for metaphysics.",
      },
      {
        slug: "markandeya-purana",
        name: "Markandeya Purana",
        sanskrit: "मार्कण्डेय पुराण",
        category: "Purana",
        description: "A wide-ranging Purana that contains the celebrated Devi Mahatmyam.",
        highlight: "Myth, cycles, goddess traditions",
        href: "/markandeya-purana",
        language: "Sanskrit",
        approximateDate: "~250–500 CE",
        keyConcepts: ["Mythic cycles", "Devi", "Narrative memory"],
        readingLens:
          "Useful for readers who want to understand how goddess traditions sit inside the wider Purana universe.",
      },
      {
        slug: "devi-mahatmyam",
        name: "Devi Mahatmyam",
        sanskrit: "देवीमहात्म्यम्",
        category: "Shakta",
        description: "A luminous text of the Divine Mother, power, protection, and cosmic balance.",
        highlight: "Shakti, victory, protection",
        href: "/devi-mahatmyam",
        language: "Sanskrit",
        approximateDate: "~400–600 CE",
        keyConcepts: ["Shakti", "Protection", "Cosmic order"],
        readingLens: "Approach it through symbolism and theology, not only mythology.",
      },
      {
        slug: "bhagavata-purana",
        name: "Bhagavata Purana",
        sanskrit: "भागवतपुराण",
        category: "Purana",
        description:
          "The story of Krishna and devotional theology, emphasizing bhakti and divine play.",
        highlight: "Krishna, bhakti, divine play",
        href: "/bhagavata-purana",
        language: "Sanskrit",
        approximateDate: "~900–1000 CE",
        keyConcepts: ["Bhakti", "Krishna", "Lila", "Devotion"],
        readingLens: "Focus on the emotional and relational aspects of divine-human connection.",
      },
      {
        slug: "vishnu-purana",
        name: "Vishnu Purana",
        sanskrit: "विष्णुपुराण",
        category: "Purana",
        description: "The Purana of Vishnu, covering creation, lineages, and Vaishnava theology.",
        highlight: "Vishnu, creation, lineages",
        href: "/vishnu-purana",
        language: "Sanskrit",
        approximateDate: "~300–500 CE",
        keyConcepts: ["Vishnu", "Creation", "Dynasties", "Avatars"],
        readingLens: "Explore the cosmic cycles and divine incarnations.",
      },
      {
        slug: "shiva-purana",
        name: "Shiva Purana",
        sanskrit: "शिवपुराण",
        category: "Purana",
        description: "The Purana of Shiva, detailing his forms, worship, and cosmic role.",
        highlight: "Shiva, asceticism, destruction",
        href: "/shiva-purana",
        language: "Sanskrit",
        approximateDate: "~800–1200 CE",
        keyConcepts: ["Shiva", "Asceticism", "Destruction", "Yoga"],
        readingLens: "Understand Shiva as the transcendent and immanent divine force.",
      },
    ],
  },
  {
    id: "philosophy",
    title: "Philosophy & Practice",
    description:
      "Texts that turn reflection inward: mind, yoga, conduct, and liberation as lived discipline.",
    items: [
      {
        slug: "isha-upanishad",
        name: "Isha Upanishad",
        sanskrit: "ईशोपनिषद्",
        category: "Upanishad",
        description:
          "The Upanishad of Lordship, exploring the relationship between the individual self and the universal Self.",
        highlight: "Self, Brahman, renunciation",
        href: "/isha-upanishad",
        language: "Sanskrit",
        approximateDate: "~800–600 BCE",
        keyConcepts: ["Atman", "Brahman", "Renunciation", "Unity"],
        readingLens: "Meditate on the paradox of ownership and non-ownership in spiritual life.",
      },
      {
        slug: "kena-upanishad",
        name: "Kena Upanishad",
        sanskrit: "केनोपनिषद्",
        category: "Upanishad",
        description:
          "The Upanishad of 'By Whom?', inquiring into the source of consciousness and knowledge.",
        highlight: "Consciousness, inquiry, Brahman",
        href: "/kena-upanishad",
        language: "Sanskrit",
        approximateDate: "~600–400 BCE",
        keyConcepts: ["Consciousness", "Knowledge", "Brahman", "Inquiry"],
        readingLens: "Question deeply: Who is the knower behind all knowing?",
      },
      {
        slug: "katha-upanishad",
        name: "Katha Upanishad",
        sanskrit: "कठोपनिषद्",
        category: "Upanishad",
        description:
          "The Upanishad of Death, containing Nachiketa's dialogue with Yama on immortality.",
        highlight: "Death, immortality, self-knowledge",
        href: "/katha-upanishad",
        language: "Sanskrit",
        approximateDate: "~500–300 BCE",
        keyConcepts: ["Death", "Immortality", "Self", "Knowledge"],
        readingLens: "Face the fear of death as a path to understanding eternal life.",
      },
      {
        slug: "prashna-upanishad",
        name: "Prashna Upanishad",
        sanskrit: "प्रश्नोपनिषद्",
        category: "Upanishad",
        description: "The Upanishad of Questions, structured as answers to six profound questions.",
        highlight: "Questions, creation, breath, meditation",
        href: "/prashna-upanishad",
        language: "Sanskrit",
        approximateDate: "~400–200 BCE",
        keyConcepts: ["Creation", "Prana", "Meditation", "Knowledge"],
        readingLens: "Ask the right questions to unlock spiritual understanding.",
      },
      {
        slug: "mundaka-upanishad",
        name: "Mundaka Upanishad",
        sanskrit: "मुण्डकोपनिषद्",
        category: "Upanishad",
        description: "The Upanishad of the Shaved Head, distinguishing higher and lower knowledge.",
        highlight: "Higher knowledge, Brahman, liberation",
        href: "/mundaka-upanishad",
        language: "Sanskrit",
        approximateDate: "~400–200 BCE",
        keyConcepts: ["Para Vidya", "Apara Vidya", "Brahman", "Moksha"],
        readingLens: "Distinguish between ritual knowledge and direct realization of truth.",
      },
      {
        slug: "mandukya-upanishad",
        name: "Mandukya Upanishad",
        sanskrit: "माण्डूक्योपनिषद्",
        category: "Upanishad",
        description: "The Upanishad of the Frog, analyzing the four states of consciousness.",
        highlight: "Consciousness, states, Om, Turiya",
        href: "/mandukya-upanishad",
        language: "Sanskrit",
        approximateDate: "~500–200 BCE",
        keyConcepts: ["Om", "Turiya", "Consciousness", "States"],
        readingLens: "Explore the levels of awareness from waking to transcendent unity.",
      },
      {
        slug: "aitareya-upanishad",
        name: "Aitareya Upanishad",
        sanskrit: "ऐतरेयोपनिषद्",
        category: "Upanishad",
        description:
          "The Upanishad of the Aitareya Aranyaka, exploring the nature of consciousness and creation.",
        highlight: "Consciousness, creation, Atman",
        href: "/aitareya-upanishad",
        language: "Sanskrit",
        approximateDate: "~800–600 BCE",
        keyConcepts: ["Atman", "Consciousness", "Creation", "Prajapati"],
        readingLens: "Contemplate the emergence of consciousness from the cosmic self.",
      },
      {
        slug: "taittiriya-upanishad",
        name: "Taittiriya Upanishad",
        sanskrit: "तैत्तिरीयोपनिषद्",
        category: "Upanishad",
        description:
          "A comprehensive Upanishad covering knowledge, instruction, and the layers of existence.",
        highlight: "Layers of self, instruction, Brahman",
        href: "/taittiriya-upanishad",
        language: "Sanskrit",
        approximateDate: "~600–400 BCE",
        keyConcepts: ["Annamaya", "Pranamaya", "Manomaya", "Vijnanamaya", "Anandamaya"],
        readingLens: "Study the five sheaths (koshas) that cover the true self.",
      },
      {
        slug: "brihadaranyaka-upanishad",
        name: "Brihadaranyaka Upanishad",
        sanskrit: "बृहदारण्यकोपनिषद्",
        category: "Upanishad",
        description:
          "The largest and oldest Upanishad, containing profound dialogues on Brahman and Atman.",
        highlight: "Brahman, Atman, dialogue, philosophy",
        href: "/brihadaranyaka-upanishad",
        language: "Sanskrit",
        approximateDate: "~900–700 BCE",
        keyConcepts: ["Brahman", "Atman", "Yajnavalkya", "Maitreyi"],
        readingLens: "The most philosophical Upanishad - engage with its dialogues deeply.",
      },
      {
        slug: "chandogya-upanishad",
        name: "Chandogya Upanishad",
        sanskrit: "छान्दोग्योपनिषद्",
        category: "Upanishad",
        description:
          "One of the oldest Upanishads, famous for the teaching 'Tat Tvam Asi' (You Are That).",
        highlight: "Tat Tvam Asi, Om, Sama Veda",
        href: "/chandogya-upanishad",
        language: "Sanskrit",
        approximateDate: "~800–600 BCE",
        keyConcepts: ["Tat Tvam Asi", "Om", "Sama", "Uddalaka"],
        readingLens: "Focus on the famous dialogues between Uddalaka and Shvetaketu.",
      },
      {
        slug: "shvetashvatara-upanishad",
        name: "Shvetashvatara Upanishad",
        sanskrit: "श्वेताश्वतरोपनिषद्",
        category: "Upanishad",
        description: "A theistic Upanishad that describes Rudra (Shiva) as the supreme reality.",
        highlight: "Rudra, Shiva, theism, yoga",
        href: "/shvetashvatara-upanishad",
        language: "Sanskrit",
        approximateDate: "~300–200 BCE",
        keyConcepts: ["Rudra", "Shiva", "Maya", "Yoga"],
        readingLens: "Explore the theistic philosophy and yoga practices described.",
      },
      {
        slug: "maitri-upanishad",
        name: "Maitri Upanishad",
        sanskrit: "मैत्री उपनिषद्",
        category: "Upanishad",
        description:
          "A post-Vedic Upanishad focusing on meditation, yoga, and the nature of the self.",
        highlight: "Meditation, yoga, mind, liberation",
        href: "/maitri-upanishad",
        language: "Sanskrit",
        approximateDate: "~300–100 BCE",
        keyConcepts: ["Meditation", "Yoga", "Prana", "Moksha"],
        readingLens: "Practical guide to meditation and spiritual practice.",
      },
      {
        slug: "yoga-sutras",
        name: "Yoga Sutras",
        sanskrit: "योगसूत्र",
        category: "Philosophy",
        description:
          "Patanjali's concise aphorisms on the theory and practice of Yoga by Patanjali",
        highlight: "Mind, discipline, stillness",
        href: "/yoga-sutras",
        language: "Sanskrit",
        approximateDate: "~400 CE",
        keyConcepts: ["Ashtanga Yoga", "Chitta", "Nirodha", "Samadhi"],
        readingLens:
          "Best approached slowly, aphorism by aphorism. Each sutra is compressed philosophy, not casual prose.",
      },
      {
        slug: "yoga-vasishtha",
        name: "Yoga Vasishtha",
        sanskrit: "योगवसिष्ठ",
        category: "Philosophy",
        description:
          "A vast contemplative dialogue on mind, reality, freedom, and awakened perception. (Coming Soon)",
        highlight: "Mind, non-duality, inquiry",
        href: "/yoga-vasishtha",
        language: "Sanskrit",
        approximateDate: "~10th century CE",
        keyConcepts: ["Mind", "Non-duality", "Inquiry"],
        readingLens:
          "Best used for slow reflective reading. The argument unfolds through stories and repeated philosophical pressure.",
      },
      {
        slug: "manu-smriti",
        name: "Manu Smriti",
        sanskrit: "मनुस्मृति",
        category: "Dharma",
        description:
          "An influential dharma text on conduct, society, and moral order. (Coming Soon)",
        highlight: "Law, ethics, social duty",
        href: "/manu-smriti",
        language: "Sanskrit",
        approximateDate: "~200 BCE–200 CE",
        keyConcepts: ["Law", "Ethics", "Social order"],
        readingLens:
          "Read historically and critically, with awareness of commentary and contested interpretation.",
      },
      {
        slug: "parashara",
        name: "Parashara Smriti",
        sanskrit: "पराशर स्मृति",
        category: "Dharma",
        description:
          "A dharma text often read for guidance in later historical periods and household life. (Coming Soon)",
        highlight: "Conduct, ritual, household life",
        href: "/parashara",
        language: "Sanskrit",
        approximateDate: "~1st millennium CE",
        keyConcepts: ["Conduct", "Ritual", "Household life"],
        readingLens:
          "Useful when comparing how lived dharma gets adapted across social and historical contexts.",
      },
    ],
  },
];

const curatedScriptureCatalog = scriptureSections.flatMap((section) => section.items);

function titleCaseCategory(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function mergeCatalogItems(items: ScriptureItem[]) {
  const bySlug = new Map<string, ScriptureItem>();

  for (const item of items) {
    if (!bySlug.has(item.slug)) {
      bySlug.set(item.slug, item);
    }
  }

  return [...bySlug.values()];
}

const generatedScriptureCatalog: ScriptureItem[] = scriptures.map((scripture) => ({
  slug: scripture.id,
  name: scripture.name,
  sanskrit: scripture.sanskritName,
  category: titleCaseCategory(scripture.category),
  description: scripture.description,
  highlight: scripture.keyConcepts.slice(0, 3).join(", ") || titleCaseCategory(scripture.category),
  href: `/${scripture.id}`,
  language: scripture.language,
  approximateDate: scripture.approximateDate,
  keyConcepts: scripture.keyConcepts,
  readingLens:
    scripture.totalVerses && scripture.totalVerses > 0
      ? `Use the verse generator for precise chapter and verse access across ${scripture.totalVerses.toLocaleString()} indexed or generation-ready verses.`
      : undefined,
}));

const generatedUpanishadCatalog: ScriptureItem[] = UPANISHADS.map((upanishad) => ({
  slug: upanishad.id,
  name: upanishad.name,
  sanskrit: upanishad.sanskrit,
  category: "Upanishad",
  description:
    upanishad.theme && upanishad.theme !== "unknown"
      ? `${upanishad.name} is an Upanishadic text focused on ${upanishad.theme}.`
      : `${upanishad.name} is cataloged for guided study and on-demand verse generation.`,
  highlight:
    upanishad.theme && upanishad.theme !== "unknown" ? upanishad.theme : "Upanishadic wisdom",
  href: `/${upanishad.id}`,
  language: "Sanskrit",
  approximateDate: upanishad.period,
  keyConcepts:
    upanishad.theme && upanishad.theme !== "unknown" ? [upanishad.theme] : ["Atman", "Brahman"],
  readingLens:
    upanishad.verses > 0
      ? `Use the generator to retrieve or create any of the ${upanishad.verses} cataloged verses.`
      : "Use the generator for targeted verse access while the direct verse library is expanded.",
}));

const generatedPuranaCatalog: ScriptureItem[] = MAHAPURANAS.map((purana) => ({
  slug: purana.id,
  name: purana.name,
  sanskrit: purana.sanskrit,
  category: "Purana",
  description: `${purana.name} is a Mahapurana centered on ${purana.theme}.`,
  highlight: purana.theme,
  href: `/${purana.id}`,
  language: "Sanskrit",
  approximateDate: purana.period,
  keyConcepts: [purana.deity, "Purana", "Devotion"].filter(Boolean),
  readingLens:
    purana.verses > 0
      ? `Use the generator for targeted access across the traditional ${purana.verses.toLocaleString()} verse scope.`
      : "Use the generator for targeted verse access while the direct verse library is expanded.",
}));

export const scriptureCatalog = mergeCatalogItems([
  ...curatedScriptureCatalog,
  ...generatedScriptureCatalog,
  ...generatedUpanishadCatalog,
  ...generatedPuranaCatalog,
]);

export const featuredScriptures = scriptureCatalog.slice(0, 6);

export const headerScriptures = scriptureCatalog.slice(0, 5);

export function getScriptureCatalogItem(slug: string) {
  return scriptureCatalog.find((item) => item.slug === slug);
}
