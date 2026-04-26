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
        slug: "nyaya-sutras",
        name: "Nyaya Sutras",
        sanskrit: "न्यायसूत्र",
        category: "Philosophy",
        description: "Gautama's foundational text on logic, epistemology, and debate.",
        highlight: "Logic, epistemology, debate",
        href: "/nyaya-sutras",
        language: "Sanskrit",
        approximateDate: "~200 BCE–200 CE",
        keyConcepts: ["Logic", "Epistemology", "Debate", "Pramana"],
        readingLens:
          "Study the pramanas (valid means of knowledge) and the systematic approach to logical reasoning.",
      },
      {
        slug: "brahma-sutras",
        name: "Brahma Sutras",
        sanskrit: "ब्रह्मसूत्र",
        category: "Vedanta",
        description: "Badarayana's systematic exposition of Vedanta philosophy.",
        highlight: "Vedanta, Brahman, metaphysics",
        href: "/brahma-sutras",
        language: "Sanskrit",
        approximateDate: "~200 BCE–200 CE",
        keyConcepts: ["Brahman", "Vedanta", "Metaphysics", "Unity"],
        readingLens:
          "Best read with commentaries (Shankara, Ramanuja, Madhva) to understand different interpretive schools.",
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
  {
    id: "agamas-tantras",
    title: "Agamas & Tantras",
    description:
      "Ritual manuals, temple architecture, and esoteric practices of Shaiva, Vaishnava, and Shakta traditions.",
    items: [
      {
        slug: "agamas-tantras",
        name: "Agamas & Tantras",
        sanskrit: "आगम तन्त्र",
        category: "Tantric",
        description:
          "Shaiva Agamas (28), Vaishnava Pancharatra Agamas, and Shakta Tantras covering temple worship, rituals, and philosophy.",
        highlight: "Temple worship, rituals, esoteric",
        href: "/agamas-tantras",
        language: "Sanskrit",
        approximateDate: "~500–1200 CE",
        keyConcepts: ["Temple worship", "Rituals", "Esoteric", "Deity worship"],
        readingLens:
          "Essential for understanding temple traditions and ritual practices across different sampradayas.",
      },
    ],
  },
  {
    id: "stotras-mantras",
    title: "Stotras & Mantras",
    description:
      "Devotional hymns, sacred mantras, and praise literature for daily worship and spiritual practice.",
    items: [
      {
        slug: "vishnu-sahasranama",
        name: "Vishnu Sahasranama",
        sanskrit: "विष्णुसहस्रनाम",
        category: "Stotra",
        description:
          "1000 sacred names of Vishnu from the Mahabharata, with word-by-word meanings.",
        highlight: "1000 names, Vishnu, devotion",
        href: "/vishnu-sahasranama",
        language: "Sanskrit",
        approximateDate: "~200 BCE–200 CE",
        keyConcepts: ["Vishnu", "Names", "Devotion", "Mahabharata"],
        readingLens:
          "Chant daily for spiritual merit. Each name reveals a different aspect of the divine.",
      },
      {
        slug: "sahasranama-collection",
        name: "Sahasranama Collection",
        sanskrit: "सहस्रनाम संग्रह",
        category: "Stotra",
        description:
          "Collection of Sahasranamas including Lalita Sahasranama, Shiva Sahasranama, and more.",
        highlight: "Multiple Sahasranamas, devotion",
        href: "/sahasranama",
        language: "Sanskrit",
        approximateDate: "Various",
        keyConcepts: ["Devi", "Shiva", "Names", "Devotion"],
        readingLens:
          "Explore the different Sahasranamas to understand the diverse aspects of deities in Hindu tradition.",
      },
    ],
  },
  {
    id: "minor-gitas",
    title: "Minor Gitas",
    description:
      "Gita-style dialogues found in various Puranas and texts, expanding on the Bhagavad Gita's teachings.",
    items: [
      {
        slug: "minor-gitas",
        name: "Minor Gitas",
        sanskrit: "गीताएँ",
        category: "Dialogue",
        description:
          "Collection of Gitas including Ashtavakra Gita, Avadhuta Gita, Ribhu Gita, and others.",
        highlight: "Non-duality, wisdom, liberation",
        href: "/minor-gitas",
        language: "Sanskrit",
        approximateDate: "Various",
        keyConcepts: ["Non-duality", "Wisdom", "Liberation", "Advaita"],
        readingLens:
          "These Gitas often focus on Advaita philosophy and direct experience of the Self.",
      },
    ],
  },
  {
    id: "samskaras",
    title: "Shodasha Samskaras",
    description:
      "The 16 sacraments of Hindu life from conception to death, marking important life transitions.",
    items: [
      {
        slug: "shodasha-samskaras",
        name: "Shodasha Samskaras",
        sanskrit: "षोडश संस्कार",
        category: "Ritual",
        description:
          "The 16 rites of passage including Garbhadhana (conception), Namakarana (naming), Upanayana (sacred thread), Vivaha (marriage), and Antyeshti (funeral).",
        highlight: "16 rites, life transitions, rituals",
        href: "/shodasha-samskaras",
        language: "Sanskrit",
        approximateDate: "Ancient tradition",
        keyConcepts: ["Rituals", "Life transitions", "Dharma", "Ceremony"],
        readingLens:
          "Understanding these rituals provides insight into the Hindu worldview on life stages and spiritual progression.",
      },
    ],
  },
  {
    id: "pilgrimage",
    title: "Sacred Places",
    description:
      "Tirtha kshetras, Jyotirlingas, Shakti Peethas, and other sacred pilgrimage sites in Hindu tradition.",
    items: [
      {
        slug: "jyotirlingas",
        name: "12 Jyotirlingas",
        sanskrit: "द्वादश ज्योतिर्लिंग",
        category: "Pilgrimage",
        description:
          "The 12 sacred abodes of Shiva where He appeared as a column of light, including Kashi Vishwanath, Somnath, and Rameshwaram.",
        highlight: "Shiva, pilgrimage, light",
        href: "/jyotirlingas",
        language: "Sanskrit",
        approximateDate: "Ancient tradition",
        keyConcepts: ["Shiva", "Pilgrimage", "Sacred geography", "Light"],
        readingLens:
          "Each Jyotirlinga has unique mythology and significance. Visiting all 12 is considered spiritually meritorious.",
      },
      {
        slug: "shakti-peethas",
        name: "51 Shakti Peethas",
        sanskrit: "५१ शक्तिपीठ",
        category: "Pilgrimage",
        description:
          "Sacred sites where parts of Sati's body fell, including Kamakhya, Kalighat, and Vaishno Devi.",
        highlight: "Devi, pilgrimage, power",
        href: "/shakti-peethas",
        language: "Sanskrit",
        approximateDate: "Ancient tradition",
        keyConcepts: ["Devi", "Shakti", "Pilgrimage", "Mythology"],
        readingLens:
          "These sites represent the divine feminine power and are important centers of Shakta worship.",
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
