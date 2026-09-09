/**
 * Deep festival (utsav) encyclopedia for Hind AI.
 * Dates are civil Gregorian approximations for India (IST), 2026,
 * cross-checked against common public panchang listings. Exact local
 * observance can shift by timezone and Amanta/Purnimanta naming.
 * Katha is labelled as tradition; living practice is labelled as custom.
 */

export type UtsavTradition =
  | "shaiva"
  | "shakta"
  | "vaishnava"
  | "ganapatya"
  | "saura"
  | "buddhist"
  | "pan-hindu";

export type UtsavKind = "major" | "vrat" | "jayanti" | "sankranti" | "regional" | "cluster";

export interface UtsavEntry {
  slug: string;
  name: string;
  sanskrit: string;
  /** ISO date YYYY-MM-DD for primary 2026 civil date in India */
  dateISO: string;
  lunarHint: string;
  kind: UtsavKind;
  tradition: UtsavTradition;
  monthLabel: string;
  tagline: string;
  /** Short card blurb */
  summary: string;
  /** Puranic / itihasa story — tradition, not dated history */
  katha: string;
  /** Living geography, temple customs, documented public practice */
  livingPractice: string;
  /** What a first-time visitor usually sees at temples */
  inTheTemple: string;
  doList: string[];
  dontList: string[];
  funFacts: string[];
  relatedHrefs: Array<{ label: string; href: string }>;
  regions: string[];
  sources: string[];
  image?: string;
}

export const UTSAV_NOTE =
  "Festival civil dates move with the panchanga. Katha is scripture and oral tradition — not a dated news report. Temple queues, food, and dress rules are living custom and vary by place. Hind AI will not invent a single ‘correct’ India, and will not sell miracle guarantees.";

export const UTSAVS: UtsavEntry[] = [
  {
    slug: "makar-sankranti",
    name: "Makar Sankranti",
    sanskrit: "मकर संक्रांति",
    dateISO: "2026-01-14",
    lunarHint: "Solar transit of the Sun into Makara (Capricorn)",
    kind: "sankranti",
    tradition: "saura",
    monthLabel: "January",
    tagline: "Sun turns north — harvest, sesame, and longer light",
    summary:
      "One of the rare major festivals fixed by the solar year. Across India it wears many names: Pongal, Uttarayan, Magh Bihu, Lohri’s neighbour.",
    katha:
      "In the Mahabharata, Bhishma waits for Uttarayana — the Sun’s northward path — before leaving his body. Sankranti literature praises Surya as the visible face of order (ṛta). That is epic and Purāṇic framing, not a clocked historical event.",
    livingPractice:
      "People bathe, offer arghya to the rising Sun, cook sesame-jaggery sweets (tilgul), and give charity. In Tamil Nadu the four-day Pongal cycle cooks freshly harvested rice. In Gujarat kite skies mark Uttarayan. Assam’s Magh Bihu is a community feast after harvest.",
    inTheTemple:
      "Surya shrines and river ghats are busy at dawn. Expect oil lamps, sesame offerings, and short queues rather than night vigils. Dress for cold January mornings in the north.",
    doList: [
      "Offer water to the Sun at sunrise if that is your family custom",
      "Share tilgul or regional sweets without demanding return gifts",
      "Donate warm clothes or grain if you can",
    ],
    dontList: [
      "Do not treat kite fights as the ‘essence’ of the festival",
      "Do not force one regional name (Pongal vs Sankranti) on every household",
      "Do not claim medical miracles from sesame alone",
    ],
    funFacts: [
      "Unlike Diwali or Holi, Makar Sankranti is solar — it stays near 14–15 January even when lunar festivals drift.",
      "‘Tilgul ghya, god god bola’ in Marathi means take sesame-jaggery and speak sweetly — a social ethic coded as food.",
    ],
    relatedHrefs: [
      { label: "Panchanga", href: "/panchanga" },
      { label: "Daily practice", href: "/daily" },
    ],
    regions: ["Pan-India", "Tamil Nadu (Pongal)", "Gujarat", "Assam", "Punjab (near Lohri)"],
    sources: [
      "Mahabharata Uttarayana motif (epic tradition)",
      "Regional harvest customs: Pongal, Magh Bihu, Uttarayan",
      "Public 2026 civil date listings for India",
    ],
    image: "/festivals/makar-sankranti.webp",
  },
  {
    slug: "vasant-panchami",
    name: "Vasant Panchami",
    sanskrit: "वसंत पंचमी",
    dateISO: "2026-01-23",
    lunarHint: "Magha Shukla Panchami",
    kind: "major",
    tradition: "shakta",
    monthLabel: "January",
    tagline: "Yellow spring — Saraswati, books, and first learning",
    summary:
      "The fifth bright day of Magha opens spring in many calendars. Saraswati is worshipped with books, veena imagery, and yellow cloth.",
    katha:
      "Later Purāṇic and poetic traditions place Saraswati as speech, learning, and the flowing river of knowledge. Stories of her birth and rivalry with other goddesses are mahātmya literature — devotion framed as narrative, not archaeology.",
    livingPractice:
      "Students place notebooks before the deity; music schools bless instruments. Yellow mustard fields in north India coincide with the season’s colour. Many families avoid meat that day.",
    inTheTemple:
      "Saraswati temples and school puja halls fill in the morning. Expect book offerings, marigold/yellow flowers, and children’s first-writing ceremonies (vidyārambha) in some communities.",
    doList: [
      "Wear yellow if your family does",
      "Keep study materials clean and begin a small learning vow",
      "Speak gently — the day is about vāc (speech)",
    ],
    dontList: [
      "Do not treat the day as only ‘exam luck’",
      "Do not discard books carelessly after the puja",
      "Do not invent a single mandatory mantra for every school",
    ],
    funFacts: [
      "In eastern India the day is tightly tied to Saraswati; elsewhere spring colour and harvest notes also matter.",
      "Basant is also a classical raga season — music culture and calendar meet.",
    ],
    relatedHrefs: [
      { label: "Devi tirthas", href: "/devi" },
      { label: "Learning Hub", href: "/learning" },
    ],
    regions: ["North India", "Bengal", "Pan-India schools"],
    sources: [
      "Saraswati worship as living Smārta and Śākta custom",
      "Magha Shukla Panchami panchang listings 2026",
    ],
    image: "/festivals/vasant-panchami.webp",
  },
  {
    slug: "maha-shivaratri",
    name: "Maha Shivaratri",
    sanskrit: "महाशिवरात्रि",
    dateISO: "2026-02-15",
    lunarHint: "Phalguna Krishna Chaturdashi (naming varies Amanta/Purnimanta)",
    kind: "vrat",
    tradition: "shaiva",
    monthLabel: "February",
    tagline: "The great night — bilva, abhisheka, and keeping awake",
    summary:
      "Shaiva India’s most widely shared night vigil. Milk, bilva, and the five-syllable mantra fill Jyotirlinga and village linga shrines alike.",
    katha:
      "Shiva Purāṇa traditions tell of the cosmic linga of light, of Śiva drinking hālāhala at the churning of the ocean, and of the marriage to Pārvatī. These are Purāṇic katha. The night’s power is framed as presence, not as a dated wedding certificate.",
    livingPractice:
      "Many observe a day-long fast and night jagaran. Temples run four prahara pujas. Crowds peak after midnight at major Jyotirlingas. Offerings commonly include bilva leaves, water, milk, and bael fruit.",
    inTheTemple:
      "Expect long queues, wet floors near the linga, and strict phone rules in garbhagriha. Women and men may have separate lines. Wear clothes you can stand in for hours. Footwear stays outside.",
    doList: [
      "Offer bilva if the temple allows devotee offerings",
      "Chant Om Namah Shivaya without blocking the queue",
      "Carry water and respect local fasting rules if you vow a fast",
    ],
    dontList: [
      "Do not push into the sanctum or film forbidden areas",
      "Do not offer plastic flowers or impure water where priests refuse them",
      "Do not treat the night as a party with alcohol near the shrine",
    ],
    funFacts: [
      "Monthly Masik Shivaratri exists; Maha Shivaratri is the year’s great one.",
      "Pradosha twilight on trayodashi is a related but separate Shaiva rhythm.",
    ],
    relatedHrefs: [
      { label: "Mahadeva", href: "/mahadev" },
      { label: "Shivlilamrit", href: "/shivlilamrit" },
      { label: "Twelve Jyotirlingas", href: "/pilgrimage" },
    ],
    regions: ["Pan-India", "Nepal", "Shaiva diaspora"],
    sources: [
      "Shiva Purana linga and Samudra Manthan motifs (tradition)",
      "Living Jyotirlinga temple night-vigil custom",
      "2026 Phalguna Krishna Chaturdashi civil date listings",
    ],
    image: "/festivals/maha-shivaratri.webp",
  },
  {
    slug: "holi",
    name: "Holi",
    sanskrit: "होली",
    dateISO: "2026-03-04",
    lunarHint: "After Holika Dahan on Phalguna Purnima evening (2026-03-03)",
    kind: "major",
    tradition: "vaishnava",
    monthLabel: "March",
    tagline: "Fire of Holika, colours of spring, and Prahlada’s faith",
    summary:
      "Holika Dahan burns fear; the next day colours and embraces reset social distance. Barsana’s Lathmar and Bengal’s Basanta Utsav are cousins, not copies.",
    katha:
      "Vishnu Purāṇa and Bhāgavata traditions tell of Prahlāda, Holikā’s fire, and Narasimha’s protection. Holi’s joy is also tied to Krishna’s play in Vraja in later bhakti poetry. That is sacred story and song — not a forensic report.",
    livingPractice:
      "Community bonfires, gulal, gujiya, and visiting. Eco-colour movements grow each year. Some regions play Holi for more than one day.",
    inTheTemple:
      "Krishna temples in Mathura-Vrindavan are ecstatic and crowded. Shaiva temples may stay quieter. Protect cameras and phones; coloured water reaches everywhere.",
    doList: [
      "Ask consent before smearing colour on strangers",
      "Use skin-safe colours",
      "Forgive small debts of the year if that is your custom",
    ],
    dontList: [
      "Do not force entry into gendered or family-only Holi circles",
      "Do not mix alcohol coercion with ‘festival spirit’",
      "Do not burn unsafe plastics in Holika pyres",
    ],
    funFacts: [
      "Holika Dahan and Rangwali Holi are two linked days — many calendars list both.",
      "Yaosang in Manipur and Basanta Utsav in Santiniketan show how spring colour travels beyond one script.",
    ],
    relatedHrefs: [
      { label: "Vishnu / Char Dham", href: "/vishnu" },
      { label: "Stotras", href: "/stotras" },
    ],
    regions: ["Pan-India", "Braj", "Bengal", "Punjab", "Manipur"],
    sources: [
      "Bhagavata / Vishnu Purana Prahlada-Holika motif (tradition)",
      "Regional Holi ethnography (Braj, Bengal, Punjab)",
      "2026 Holika Dahan 3 Mar / Holi 4 Mar public listings",
    ],
    image: "/festivals/holi.webp",
  },
  {
    slug: "ugadi-gudi-padwa",
    name: "Ugadi / Gudi Padwa",
    sanskrit: "युगादि / गुढी पाडवा",
    dateISO: "2026-03-19",
    lunarHint: "Chaitra Shukla Pratipada — lunisolar New Year for many regions",
    kind: "regional",
    tradition: "pan-hindu",
    monthLabel: "March",
    tagline: "New year of the bright fortnight — neem, jaggery, and the raised gudi",
    summary:
      "Andhra, Telangana, and Karnataka mark Ugadi; Maharashtra raises the Gudi; Sindhi households keep Cheti Chand on the same pratipada. One tithi, many kitchens.",
    katha:
      "Purāṇic and almanac traditions place the beginning of a new year-cycle on Chaitra’s first bright day. Brahma’s creation motif and the turning of Vasanta appear in regional tellings. Treat these as sacred time-myths that organise community life — not as a single dated ‘birthday of the universe’.",
    livingPractice:
      "Ugadi pachadi mixes six tastes (sweet, sour, salt, bitter, spice, astringent) as a teaching about the year ahead. Maharashtrian homes hoist a gudi — bamboo, cloth, garland, and inverted pot — and share shrikhand-puri. Panchanga reading (panchanga shravanam) is common in the Deccan.",
    inTheTemple:
      "Temple courtyards host early kalash and gudi rites. Expect neem flowers, mango leaves, and short morning crowds before office hours. Dress festive but keep footwear discipline.",
    doList: [
      "Taste something bitter with something sweet — the day’s ethic",
      "Listen to or read the year’s panchanga summary if offered",
      "Wish neighbours across language lines — Ugadi and Gudi Padwa share the sky",
    ],
    dontList: [
      "Do not mock another region’s New Year food as ‘wrong’",
      "Do not confuse this lunisolar New Year with mid-April solar New Years",
    ],
    funFacts: [
      "Cheti Chand for Sindhi Hindus falls on the same pratipada cluster.",
      "Chaitra Navaratri often begins the same morning in many calendars.",
    ],
    relatedHrefs: [
      { label: "Festivals hub", href: "/festivals" },
      { label: "Panchanga", href: "/panchanga" },
      { label: "Rama Navami", href: "/festivals/rama-navami" },
    ],
    regions: ["Andhra Pradesh", "Telangana", "Karnataka", "Maharashtra", "Sindhi diaspora"],
    sources: [
      "Chaitra Shukla Pratipada New Year custom (Deccan / Maharashtra)",
      "2026 Ugadi / Gudi Padwa listings (19 Mar)",
    ],
    image: "/festivals/ugadi.webp",
  },
  {
    slug: "rama-navami",
    name: "Rama Navami",
    sanskrit: "राम नवमी",
    dateISO: "2026-03-26",
    lunarHint: "Chaitra Shukla Navami",
    kind: "jayanti",
    tradition: "vaishnava",
    monthLabel: "March",
    tagline: "Birth of Rama — dharma as a life story",
    summary:
      "Nine days after many New Year observances, Rama’s birth tithi fills Ayodhya, Bhadrachalam, and home shrines with Ramayana reading.",
    katha:
      "Valmiki’s Rāmāyaṇa narrates Rama’s birth in Ayodhya to Dasharatha and Kausalya. The epic is itihāsa — remembered narrative with theological weight — not a modern birth certificate.",
    livingPractice:
      "Recitation of Ramcharitmanas or Valmiki, fasting until noon or sunset, processions with infant Rama icons. Temples distribute panakam and kosambari in the south.",
    inTheTemple:
      "Expect bhajan, sundara-kanda readings, and long queues at major Rama temples. Midday abhisheka of the child form is common.",
    doList: [
      "Read or hear at least one Ramayana episode",
      "Offer fruit and tulsi where the temple permits",
      "Speak truth carefully — the day’s ideal is Maryāda Puruṣottama",
    ],
    dontList: [
      "Do not politicise darshan lines inside the sanctum",
      "Do not skip basic temple dress rules",
      "Do not claim one language’s Ramayana cancels another",
    ],
    funFacts: [
      "Chaitra Navaratri often frames the week leading to Rama Navami.",
      "South Indian kalyanotsava (divine wedding) dramas also peak in Rama temples around this season.",
    ],
    relatedHrefs: [
      { label: "Philosophies", href: "/philosophies" },
      { label: "Library catalog", href: "/contents" },
      { label: "Katha grantha", href: "/katha/vishnu" },
    ],
    regions: ["Pan-India", "Ayodhya", "Bhadrachalam", "Tamil Vaishnava temples"],
    sources: [
      "Valmiki Ramayana birth narrative (itihasa tradition)",
      "Living Rama temple calendars",
      "2026 Chaitra Shukla Navami listings",
    ],
    image: "/festivals/rama-navami.webp",
  },
  {
    slug: "hanuman-jayanti",
    name: "Hanuman Jayanti",
    sanskrit: "हनुमान जयंती",
    dateISO: "2026-04-02",
    lunarHint:
      "Chaitra Purnima (North India) — 2026 Purnima spans 1–2 Apr; many Delhi calendars favour 2 Apr sunrise. South Indian dates often differ.",
    kind: "jayanti",
    tradition: "vaishnava",
    monthLabel: "April",
    tagline: "Strength that serves — Hanuman’s birth full moon",
    summary:
      "North Indian calendars often mark Hanuman’s jayanti on Chaitra Purnima. Tamil and other southern lineages may keep Margazhi / other local dates — ask your temple. Civil listings for 2026 commonly give 2 April for New Delhi–style observance.",
    katha:
      "The Rāmāyaṇa and later Hanumān-centred poetry tell of Anjaneya’s birth to Anjana, his leap for the sun, and his service to Rama. These are itihāsa and bhakti narrative — devotion shaped as biography, not a modern birth certificate.",
    livingPractice:
      "Sindoor offerings, Hanuman Chalisa recitation, wrestling akharas’ blessings, and orange flags. Many keep a sattvic fast until evening arati.",
    inTheTemple:
      "Hanuman murti shrines are loud with chalisa. Expect oil and sindoor stains — wear clothes you can wash. Tuesday and Saturday crowds are related but separate rhythms.",
    doList: [
      "Recite Chalisa slowly enough to understand one verse",
      "Offer seva of strength — help someone lift a real burden",
      "Check your city’s panchanga when Purnima straddles two sunrises",
    ],
    dontList: [
      "Do not force one civil date on every sampradaya",
      "Do not treat gym bravado as the whole of Hanuman’s ethic",
    ],
    funFacts: [
      "Some South Indian temples celebrate Hanuman Jayanti in Margazhi (Dec–Jan).",
      "Sundarākāṇḍa reading is a living companion practice year-round.",
      "In 2026, Purnima begins 1 Apr morning and ends 2 Apr morning in many India panchangas — sunrise-rule calendars pick 2 Apr.",
    ],
    relatedHrefs: [
      { label: "Stotras", href: "/stotras" },
      { label: "Rama Navami", href: "/festivals/rama-navami" },
    ],
    regions: ["North India", "Pan-India temples", "South India (alternate dates)"],
    sources: [
      "Ramayana Hanuman narrative (itihasa tradition)",
      "Drik / public North India 2026 Chaitra Purnima listings (often 2 Apr)",
    ],
    image: "/festivals/hanuman-jayanti.webp",
  },
  {
    slug: "solar-new-year",
    name: "Solar New Year",
    sanskrit: "मेष संक्रांति",
    dateISO: "2026-04-14",
    lunarHint: "Mesha Sankranti — Puthandu, Vishu, Vaisakhi, Poila Boishakh cousins",
    kind: "sankranti",
    tradition: "saura",
    monthLabel: "April",
    tagline: "When the Sun enters Mesha — many New Years under one sky",
    summary:
      "Tamil Puthandu, Kerala Vishu, Punjabi Vaisakhi, Bengali Poila Boishakh, Odia Pana Sankranti, and Assamese Bohag Bihu cluster around mid-April’s solar turn.",
    katha:
      "Solar sankranti lore praises Surya’s ordered path. Harvest thanksgiving and community feasts grow from that sky-clock. Regional founding myths differ; the shared fact is the solar year.",
    livingPractice:
      "Vishu kani arrangements, Puthandu mango-pachadi, Vaisakhi harvest gatherings and Sikh Khalsa remembrance on nearby days, Bengali cultural processions. Food and first-sight rituals matter more than a single temple script.",
    inTheTemple:
      "Surya and local gramadevata shrines see morning visitors. In Kerala, the first auspicious sight at home can matter as much as the temple visit.",
    doList: [
      "Learn your region’s name for the day and a neighbour’s name too",
      "Share a harvest dish if you can",
    ],
    dontList: [
      "Do not collapse Sikh Vaisakhi history into only a Hindu harvest note — both can be honoured with care",
      "Do not skip sun-safety at outdoor melas",
    ],
    funFacts: [
      "This solar cluster is independent of Ugadi’s lunisolar pratipada.",
      "Baisakhi harvest fairs historically doubled as labour and community markets.",
    ],
    relatedHrefs: [
      { label: "Makar Sankranti", href: "/festivals/makar-sankranti" },
      { label: "Ugadi / Gudi Padwa", href: "/festivals/ugadi-gudi-padwa" },
    ],
    regions: ["Tamil Nadu", "Kerala", "Punjab", "Bengal", "Odisha", "Assam"],
    sources: [
      "Mesha Sankranti / regional solar New Year customs",
      "2026 Mesha Sankranti listings (14 Apr)",
    ],
    image: "/festivals/solar-new-year.webp",
  },
  {
    slug: "akshaya-tritiya",
    name: "Akshaya Tritiya",
    sanskrit: "अक्षय तृतीया",
    dateISO: "2026-04-19",
    lunarHint: "Vaishakha Shukla Tritiya (local sunrise rules can shift the civil day)",
    kind: "major",
    tradition: "pan-hindu",
    monthLabel: "April",
    tagline: "The day deeds are called ‘never diminishing’",
    summary:
      "An auspicious open day for beginnings, charity, and — in modern India — gold. Older texts emphasise dana and Vishnu-Kubera prosperity motifs.",
    katha:
      "Padma Purāṇa and related mahātmyas praise acts done on Akshaya Tritiya as akṣaya — inexhaustible. Treta Yuga’s beginning is sometimes placed here in Purāṇic chronology. Treat that as sacred time-myth, not geology.",
    livingPractice:
      "Temple visits, river baths, buying metal or tools, starting ledgers. Farmers and traders mark account books. Jain communities also observe the day with distinct narratives.",
    inTheTemple:
      "Vishnu and Lakshmi shrines see steady morning crowds. Less theatrical than Diwali; more transactional calm.",
    doList: [
      "Give a real gift of food or learning if you buy gold",
      "Start a study or seva vow that you can keep",
    ],
    dontList: [
      "Do not equate the festival only with jewellery ads",
      "Do not take on debt you cannot carry just because the day is ‘lucky’",
    ],
    funFacts: [
      "‘Akshaya’ names both the tithi’s fame and the wish that merit not decay.",
      "Some regions link the day to the first ploughing or river descent myths.",
    ],
    relatedHrefs: [
      { label: "Dharma Guide", href: "/dharma" },
      { label: "Panchanga", href: "/panchanga" },
    ],
    regions: ["Pan-India"],
    sources: [
      "Padma Purana akshaya-tithi mahatmya (tradition)",
      "2026 India festival calendar listings (19 Apr civil day; verify local tithi)",
    ],
    image: "/festivals/akshaya-tritiya.webp",
  },
  {
    slug: "buddha-purnima",
    name: "Buddha Purnima",
    sanskrit: "बुद्ध पूर्णिमा",
    dateISO: "2026-05-01",
    lunarHint:
      "Vaishakha Purnima in many Indian Hindu/Buddhist calendars (1 May 2026 common). Theravada Vesak and some national calendars can differ — ask a local sangha.",
    kind: "major",
    tradition: "buddhist",
    monthLabel: "May",
    tagline: "Vesak full moon — birth, awakening, and compassion under one name",
    summary:
      "Buddha Purnima / Vesak commemorates Siddhartha Gautama. Hind AI hosts it because Indian civil calendars and shared subcontinental memory keep the day — without claiming Buddhism is a Hindu subset.",
    katha:
      "Buddhist tradition remembers Lumbini birth, Bodh Gaya awakening, and Kushinagar parinirvana. Many tellings braid these into one Vaishakha full moon. That is sacred biography inside Buddhist lineages — not a single forensic timeline Hind AI can certify.",
    livingPractice:
      "Vihara visits, dana, meditation, bathing Buddha images, releasing captive animals in some regions. Hindu neighbours may also mark Vaishakha Purnima with their own customs; do not collapse the two into one rite.",
    inTheTemple:
      "At Bodh Gaya, Sarnath, and city viharas expect quiet queues and shoe racks. Photography rules vary. Dress modestly; leave loud festival noise outside.",
    doList: [
      "Practise one concrete act of non-harm or generosity",
      "If you visit a vihara, follow that sangha’s etiquette, not a Hindu temple script",
      "Name the day honestly — Buddhist observance, even when the civil calendar is shared",
    ],
    dontList: [
      "Do not claim one civil date for every Buddhist country",
      "Do not treat the Buddha as only ‘the ninth avatar’ and erase Buddhist self-understanding",
      "Do not invent Hind AI miracles for Vesak",
    ],
    funFacts: [
      "Indian almanacs often list Buddha Purnima on Vaishakha Purnima; Sri Lanka, SE Asia, and East Asia may use different algorithms.",
      "The Bodhi tree lineage at Bodh Gaya is a living botanical and pilgrimage fact beside the katha.",
    ],
    relatedHrefs: [
      { label: "Philosophies", href: "/philosophies" },
      { label: "Panchanga", href: "/panchanga" },
    ],
    regions: ["India", "Nepal", "Sri Lanka", "SE Asia", "global Buddhist diaspora"],
    sources: [
      "Buddhist Vesak / Buddha Jayanti living custom",
      "Drik-style India 2026 Vaishakha Purnima listings (1 May)",
    ],
    image: "/festivals/buddha-purnima.webp",
  },
  {
    slug: "guru-purnima",
    name: "Guru Purnima",
    sanskrit: "गुरु पूर्णिमा",
    dateISO: "2026-07-29",
    lunarHint: "Ashadha Purnima",
    kind: "major",
    tradition: "pan-hindu",
    monthLabel: "July",
    tagline: "Honour the teacher — Vyasa’s full moon",
    summary:
      "Buddhists, Jains, and Hindus share a full-moon reverence for the guru. Hindu calendars tie it to Vyasa and the transmission of Veda and Itihāsa.",
    katha:
      "Tradition holds that Veda Vyasa divided the Veda and composed the Mahābhārata. Guru Purnima praises the lineage that carries knowledge. That is civilizational memory, not a single classroom attendance sheet.",
    livingPractice:
      "Padapuja, letters to teachers, donations to ashrams, quiet study. Many begin scriptural reading vows for the chaturmasya season.",
    inTheTemple:
      "Mathas and ashrams hold formal assemblies. Village temples may simply have extended evening arati with guru stotras.",
    doList: [
      "Thank a living teacher by name",
      "Offer a book or fee-help to a learner",
      "Begin a small daily study streak",
    ],
    dontList: [
      "Do not reduce the day to influencer worship",
      "Do not skip integrity while praising ‘guru’",
    ],
    funFacts: [
      "Chaturmasya often begins around this full moon for wandering sadhus.",
      "The same purnima is sacred in Buddhist and Jain calendars with different emphases.",
    ],
    relatedHrefs: [
      { label: "Study Paths", href: "/study-paths" },
      { label: "Preface", href: "/preface" },
    ],
    regions: ["Pan-India", "Ashrams worldwide"],
    sources: [
      "Vyasa-purnima tradition in Smarta and Vedanta lineages",
      "2026 Ashadha Purnima listings",
    ],
    image: "/festivals/guru-purnima.webp",
  },
  {
    slug: "onam",
    name: "Onam",
    sanskrit: "ओणम",
    dateISO: "2026-08-26",
    lunarHint: "Chingam month — Thiruvonam peak day in the Kerala calendar",
    kind: "regional",
    tradition: "pan-hindu",
    monthLabel: "August",
    tagline: "Mahabali’s homecoming — pookalam, sadya, and Kerala’s harvest heart",
    summary:
      "Kerala’s ten-day harvest festival peaks on Thiruvonam. Flower mandalas, boat races, and the Onam sadya feast welcome the beloved king Mahabali.",
    katha:
      "Vāmana Purāṇa and local Kerala tellings narrate Vishnu’s Vamana avatāra and King Mahabali’s vow of generosity. Onam remembers Bali’s yearly visit home. This is sacred story and regional identity — not a census of an ancient bureaucracy.",
    livingPractice:
      "Pookalam grows day by day; families prepare multi-course sadya on banana leaves; snake-boat races and Kathakali fill the season. Hindu, and often wider Malayali, households keep the feast as cultural belonging.",
    inTheTemple:
      "Vishnu / Vamana temples and local bhagavati shrines hold special liturgy. Much of Onam’s beauty is domestic and civic — streets and homes matter as much as garbhagriha.",
    doList: [
      "Lay even a small pookalam with attention",
      "Share sadya without ranking whose recipe is ‘authentic enough’",
      "Learn one line of the Mahabali story from an elder",
    ],
    dontList: [
      "Do not turn boat-race rivalry into street harm",
      "Do not erase Muslim and Christian Malayali participation in the cultural feast",
    ],
    funFacts: [
      "Thiruvonam is the asterism peak; the festival arc is longer than one civil day.",
      "Onam sadya’s ordered courses are a edible map of hospitality ethics.",
    ],
    relatedHrefs: [
      { label: "Vishnu", href: "/vishnu" },
      { label: "Katha — Vishnu", href: "/katha/vishnu" },
    ],
    regions: ["Kerala", "Malayali diaspora"],
    sources: [
      "Vamana / Mahabali narrative (Purana and Kerala tradition)",
      "2026 Thiruvonam / Onam listings (26 Aug)",
    ],
    image: "/festivals/onam.webp",
  },
  {
    slug: "raksha-bandhan",
    name: "Raksha Bandhan",
    sanskrit: "रक्षा बंधन",
    dateISO: "2026-08-28",
    lunarHint: "Shravana Purnima (also Upakarma in many Vedic lineages; 2026 tithi spans 27–28)",
    kind: "major",
    tradition: "pan-hindu",
    monthLabel: "August",
    tagline: "Thread of protection — siblings, and the sacred cord",
    summary:
      "Sisters tie rakhi; brothers vow care. The same full moon is Upakarma — thread-changing — for many Brahmin lineages.",
    katha:
      "Puranic tellings speak of Indrani tying a protective thread on Indra, and of Draupadi tearing her sari to bind Krishna’s wound — later returned as endless cloth. These are narrative ethics of protection, not uniform history.",
    livingPractice:
      "Household rakhi mornings, sweets, gifts. Coastal and Vedic communities perform sea-bath and yajnopavita rites the same day under Upakarma rules. In 2026, Purnima spans two civil mornings — many India calendars favour 28 August after sunrise.",
    inTheTemple:
      "Some temples offer collective rakhi at deity hands. Mostly a home festival. Shravan crowds still fill Shiva temples on Mondays around this month.",
    doList: [
      "Tie with attention, not only photography",
      "Extend protection ethics beyond blood siblings if that is your vow",
      "Check local sunrise and Bhadra windows before locking a muhurta",
    ],
    dontList: [
      "Do not shame families who mark chosen-family bonds",
      "Do not confuse Upakarma rules with rakhi gift pressure",
    ],
    funFacts: [
      "Shravana is also the great month of Mondays for Shiva in much of North and West India.",
      "Narali Purnima on the Konkan coast offers coconuts to the sea on this full moon.",
    ],
    relatedHrefs: [
      { label: "Mahadeva", href: "/mahadev" },
      { label: "Daily Sadhana", href: "/sadhana" },
    ],
    regions: ["Pan-India", "Konkan (Narali Purnima)"],
    sources: [
      "Raksha thread legends in Purana and folk retellings",
      "Yajurveda Upakarma custom on Shravana Purnima",
      "2026 Shravana Purnima / Raksha Bandhan India listings (28 Aug favoured)",
    ],
    image: "/festivals/raksha-bandhan.webp",
  },
  {
    slug: "janmashtami",
    name: "Krishna Janmashtami",
    sanskrit: "कृष्ण जन्माष्टमी",
    dateISO: "2026-09-04",
    lunarHint: "Bhadrapada Krishna Ashtami (Nishita / midnight birth observance)",
    kind: "jayanti",
    tradition: "vaishnava",
    monthLabel: "September",
    tagline: "Midnight in Mathura’s story — butter, bhajan, and Gita’s speaker",
    summary:
      "Krishna’s birth ashtami. Temples swing the cradle at midnight; the next day often brings dahi-handi in Maharashtra.",
    katha:
      "Bhāgavata Purāṇa narrates the prison birth in Mathura, the Yamuna crossing, and Gokula’s childhood. The Bhagavad Gītā later speaks on Kurukshetra’s field. These are Purāṇic and epic pillars of Vaishnava bhakti.",
    livingPractice:
      "Fast until midnight, abhisheka of the infant form, bhajans, and public handi sport in cities. ISKCON and Pushtimarg temples run distinct liturgies. Smarta and Vaishnava rules can pick neighbouring civil dates in some years — 2026 New Delhi listings converge on 4 September.",
    inTheTemple:
      "Arrive early for midnight. Security is tight at major centres. Footwear, bags, and phones may be restricted near the cradle.",
    doList: [
      "Learn one Gita verse with meaning, not only the tune",
      "Offer dairy sweets only if the temple accepts outside food",
    ],
    dontList: [
      "Do not treat dahi-handi injuries as devotion’s requirement",
      "Do not erase regional birth-date debates — ask your sampradaya",
    ],
    funFacts: [
      "Civil dates can differ by timezone because the ashtami must cover midnight in local panchang rules.",
      "Nandotsava the next morning celebrates Nanda’s joy in many lineages.",
      "For New Delhi 2026, Drik lists Nishita puja roughly 11:57 PM 4 Sep to 12:43 AM 5 Sep.",
    ],
    relatedHrefs: [
      { label: "Vishnu", href: "/vishnu" },
      { label: "Library — Gita shelves", href: "/contents" },
    ],
    regions: ["Pan-India", "Mathura-Vrindavan", "Maharashtra", "ISKCON worldwide"],
    sources: [
      "Bhagavata Purana birth narrative (tradition)",
      "Bhagavad Gita as spoken teaching within Mahabharata",
      "Drik Panchang New Delhi 2026: Krishna Janmashtami Friday 4 September",
    ],
    image: "/festivals/janmashtami.webp",
  },
  {
    slug: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    sanskrit: "गणेश चतुर्थी",
    dateISO: "2026-09-14",
    lunarHint: "Bhadrapada Shukla Chaturthi; visarjan often Anant Chaturdashi",
    kind: "major",
    tradition: "ganapatya",
    monthLabel: "September",
    tagline: "Clay, modaka, and the city that sings Ganapati Bappa",
    summary:
      "Maharashtra’s public sarvajanik festival made Ganesha a civic language. Homes and pandals install clay murtis for days, then immerse.",
    katha:
      "Purāṇic tellings of Ganesha’s birth from Parvati, the beheading and elephant head, and his writing of the Mahābhārata for Vyasa are classic Ganapatya katha. They teach wit, obstacle-removal, and learning — not zoology.",
    livingPractice:
      "From 1.5 to 10+ days of worship. Modaka, durva grass, and aarti. Eco-clay movements respond to lake pollution. Visarjan processions need civic care.",
    inTheTemple:
      "Ashtavinayak temples and local Ganapati mandirs are packed. Pandal art is a living museum of satire and bhakti. Expect loudspeakers and dense crowds.",
    doList: [
      "Choose natural clay if you install a murti",
      "Keep visarjan lines safe and sober",
      "Learn one Ganapati atharvashirsha verse with humility",
    ],
    dontList: [
      "Do not immerse plaster-of-Paris idols in drinking-water lakes",
      "Do not block ambulances during processions",
      "Do not mock other families’ visarjan day choices",
    ],
    funFacts: [
      "Lokmanya Tilak’s era scaled sarvajanik Ganeshotsav as public culture in Pune-Mumbai.",
      "Anant Chaturdashi often closes the cycle with immersion and Vishnu’s Ananta vow in some homes.",
    ],
    relatedHrefs: [
      { label: "Ashtavinayak", href: "/ganesha" },
      { label: "Ganesh Aarti", href: "/ganesh-aarti" },
    ],
    regions: ["Maharashtra", "Goa", "Karnataka", "Telugu states", "Diaspora"],
    sources: [
      "Ganesha Purana / Mudgala motifs (tradition)",
      "Sarvajanik Ganeshotsav civic history",
      "2026 Bhadrapada Shukla Chaturthi listings (14 Sep)",
    ],
    image: "/festivals/ganesh-chaturthi.webp",
  },
  {
    slug: "sharad-navaratri",
    name: "Sharad Navaratri",
    sanskrit: "शारदीय नवरात्रि",
    dateISO: "2026-10-11",
    lunarHint: "Ashvina Shukla Pratipada through Navami; Vijayadashami follows",
    kind: "cluster",
    tradition: "shakta",
    monthLabel: "October",
    tagline: "Nine nights of Devi — garba, Durga Puja, and the sword of victory",
    summary:
      "Nine nights for Durga’s forms. Gujarat dances garba; Bengal builds pandals; Himachal and Kullu open processional worlds. Dussehra closes the arc.",
    katha:
      "Devi Māhātmya (from Mārkaṇḍeya Purāṇa) narrates Durga’s battle with Mahishasura. Rama’s victory over Ravana is told in the Rāmāyaṇa and staged as Ramlila. Two victory stories share one autumn — Śākta and Rāma strands braided in the calendar.",
    livingPractice:
      "Ghatasthapana, fasting, Ayudha Puja, Kanya Puja, sindoor khela in Bengal, and Ravan dahan in many north Indian grounds. Exact local calendars differ for Maha Ashtami timing.",
    inTheTemple:
      "Shakti peethas and Devi mandirs run continuous liturgy. Expect flowers, red cloth, and loud dhak drums in eastern India. Dress modestly; photography rules vary by pandal.",
    doList: [
      "Learn which of the nine nights your family emphasises",
      "Respect blood-offering vs vegetarian temple rules — they differ by shrine",
      "Keep late-night garba safe for everyone",
    ],
    dontList: [
      "Do not force meat offerings where the shrine forbids them",
      "Do not treat Ramlila violence as real vengeance",
      "Do not erase regional Devi names under one marketing brand",
    ],
    funFacts: [
      "Chaitra Navaratri in spring is a sister cycle; Sharad is the great autumn one.",
      "Vijayadashami is also a day for beginning weapons-training and learning in many traditions (ayudha / vidya start).",
    ],
    relatedHrefs: [
      { label: "Devi", href: "/devi" },
      { label: "Tirtha map", href: "/pilgrimage" },
    ],
    regions: ["Gujarat", "Bengal", "North India", "Himachal", "South India (Ayudha Puja)"],
    sources: [
      "Devi Mahatmya / Markandeya Purana (tradition)",
      "Ramayana Ramlila custom",
      "2026 Sharad Navaratri start 11 Oct / Dussehra ~19–20 Oct listings",
    ],
    image: "/festivals/navaratri.webp",
  },
  {
    slug: "vijayadashami",
    name: "Vijayadashami / Dussehra",
    sanskrit: "विजयादशमी",
    dateISO: "2026-10-20",
    lunarHint: "Ashvina Shukla Dashami — closes Sharad Navaratri",
    kind: "major",
    tradition: "pan-hindu",
    monthLabel: "October",
    tagline: "Victory day — Durga’s sword and Rama’s return path",
    summary:
      "Dashami braids Śākta victory over Mahisha with Rāma’s victory over Ravana. Mysuru Dasara, Ayudha Puja, and Ramlila grounds each keep a different face of the same tithi.",
    katha:
      "Devi Māhātmya closes Mahisha’s defeat in fierce splendour. The Rāmāyaṇa stages Rama’s triumph and the ethics of reclaiming a kidnapped spouse and a broken city. Two victory grammars share one autumn afternoon.",
    livingPractice:
      "Ravana dahan in many north Indian grounds; Aparajita puja; shastra / ayudha worship of tools and instruments in the south; sindoor khela and visarjan rhythms in Bengal spilling from Navami into Dashami.",
    inTheTemple:
      "Devi temples overflow; Ramlila maidans become temporary cities. Keep children back from fireworks and effigy burn zones. Photography can be restricted near certain visarjan routes.",
    doList: [
      "Begin a learning or craft vow if that is your Ayudha Puja custom",
      "Watch Ramlila as theatre of dharma, not a cue for real vengeance",
      "Help clean the ground after the crowd leaves",
    ],
    dontList: [
      "Do not stand under burning effigies for a reel",
      "Do not erase Durga’s victory by speaking only of Ravana fireworks",
    ],
    funFacts: [
      "Mysuru Dasara is a living royal-civic procession recognised worldwide.",
      "Many families start children’s formal learning on Vijayadashami.",
    ],
    relatedHrefs: [
      { label: "Sharad Navaratri", href: "/festivals/sharad-navaratri" },
      { label: "Devi", href: "/devi" },
      { label: "Katha — Devi", href: "/katha/devi" },
    ],
    regions: ["Pan-India", "Mysuru", "North Indian Ramlila towns", "Bengal"],
    sources: [
      "Devi Mahatmya victory motif; Ramayana Ramlila custom",
      "2026 Vijayadashami listings (20 Oct)",
    ],
    image: "/festivals/dussehra.webp",
  },
  {
    slug: "karwa-chauth",
    name: "Karwa Chauth",
    sanskrit: "करवा चौथ",
    dateISO: "2026-10-29",
    lunarHint: "Kartik Krishna Chaturthi — moonrise fast-breaking",
    kind: "vrat",
    tradition: "pan-hindu",
    monthLabel: "October",
    tagline: "A day’s fast for a partner’s long life — moonrise as the hinge",
    summary:
      "Observed widely in North India, Karwa Chauth is a sunrise-to-moonrise fast kept especially by married women, with sargi, sieve, and moon-sight rituals.",
    katha:
      "Folk and later Purāṇic-flavoured tellings speak of Savitri, of queens and karwa pots, and of the ethic of mutual protection in marriage. These are narrative supports for a living vrata — not uniform history across every district.",
    livingPractice:
      "Pre-dawn sargi meal, day-long fast (often without water in stricter homes), evening mehfil with friends, then moonrise sighting through a sieve before water and food. Urban practice increasingly emphasises consent and health.",
    inTheTemple:
      "Some visit Shiva-Parvati or Gauri shrines; much of the rite is domestic and rooftop. Moonrise timing is local — check a city panchanga, not a national meme.",
    doList: [
      "Prioritise health — modify the fast if pregnant, ill, or advised by a doctor",
      "Treat the vow as mutual care, not one-sided pressure",
    ],
    dontList: [
      "Do not shame women who do not keep the fast",
      "Do not confuse Instagram aesthetics with the vow’s ethic",
    ],
    funFacts: [
      "Karwa refers to the earthen pot / vessel central to many ritual sets.",
      "Moonrise can differ by an hour across Indian longitudes — local sky wins.",
    ],
    relatedHrefs: [
      { label: "Panchanga", href: "/panchanga" },
      { label: "Devi", href: "/devi" },
    ],
    regions: ["Punjab", "Haryana", "Rajasthan", "UP", "Delhi NCR", "diaspora"],
    sources: [
      "North Indian Karwa Chauth living custom",
      "2026 Kartik Krishna Chaturthi listings (29 Oct)",
    ],
    image: "/festivals/karwa-chauth.webp",
  },
  {
    slug: "diwali",
    name: "Diwali",
    sanskrit: "दीपावली",
    dateISO: "2026-11-08",
    lunarHint: "Kartik Amavasya Lakshmi Puja; five-day cluster ~6–10 Nov 2026",
    kind: "cluster",
    tradition: "pan-hindu",
    monthLabel: "November",
    tagline: "Lamps, Lakshmi, Rama’s return — and Kali’s night in the east",
    summary:
      "India’s festival of lights is a cluster: Dhanteras, Naraka Chaturdashi, Amavasya Lakshmi Puja, Govardhan, Bhai Dooj. Bengal’s Kali Puja shares the amavasya.",
    katha:
      "North Indian telling: Rama returns to Ayodhya; lamps welcome him. Vaishnava Vraja telling: Krishna and Govardhan. Eastern telling: Kali on the darkest night. Jain and Sikh histories add their own lamp meanings. Multiple truths share one darkness.",
    livingPractice:
      "Cleaning, diyas, accounts closed and opened, fireworks debates, and family travel peaks. Business communities mark Chopda Pujan. South Indian Deepavali oil baths before dawn are a distinct rhythm.",
    inTheTemple:
      "Lakshmi-Ganesha home altars matter as much as temples. Crowds surge at major Vaishnava and Shakta shrines. Firecracker smoke can be intense — plan air and pets.",
    doList: [
      "Light at least one real diya with attention",
      "Share food with someone outside your usual circle",
      "Keep accounts honest if you open new books",
    ],
    dontList: [
      "Do not force fireworks on elders, animals, or polluted airsheds",
      "Do not shame Kali Puja families for not doing ‘Rama Diwali’ the same way",
      "Do not leave oil lamps unattended",
    ],
    funFacts: [
      "The five-day arc is as important as the single amavasya night.",
      "Kartik Purnima weeks later brings Dev Deepawali to Kashi’s ghats — another lamp ocean.",
    ],
    relatedHrefs: [
      { label: "Vishnu", href: "/vishnu" },
      { label: "Devi", href: "/devi" },
      { label: "Ganesha", href: "/ganesha" },
    ],
    regions: ["Pan-India", "Bengal (Kali Puja)", "Gujarat (New Year next day)", "Diaspora"],
    sources: [
      "Ramayana return motif; Bhagavata Govardhan motif; Kali Puja custom (traditions)",
      "2026 Diwali cluster listings (Dhanteras 6 / main 8 / Govardhan 9–10 / Bhai Dooj 11 Nov)",
    ],
    image: "/festivals/diwali.webp",
  },
  {
    slug: "govardhan-puja",
    name: "Govardhan Puja",
    sanskrit: "गोवर्धन पूजा",
    dateISO: "2026-11-10",
    lunarHint: "Kartik Shukla Pratipada — Annakut day after many Diwali Lakshmi Puja listings",
    kind: "major",
    tradition: "vaishnava",
    monthLabel: "November",
    tagline: "Food-mountain and the hill — Krishna’s Braj ethic",
    summary:
      "Govardhan / Annakut follows Diwali’s amavasya night in many North Indian and Pushtimarg calendars. 2026 civil listings commonly give 10 November.",
    katha:
      "The Bhāgavata Purāṇa tells of Krishna lifting Govardhan to shelter villagers from Indra’s storm. That is Purāṇic theology of care over cosmic ego — not a meteorology report.",
    livingPractice:
      "Annakut mountains of vegetarian food, cow seva, and Govardhan parikrama in Braj. Gujarati and Vaishnava homes build elaborate food displays. Share the feast; do not waste for spectacle.",
    inTheTemple:
      "ISKCON and Pushtimarg temples run long food lines. Expect crowds the morning after Diwali travel. Footwear and bag rules stay strict.",
    doList: [
      "Offer food you would eat yourself",
      "Learn one verse of the Govardhan episode with meaning",
      "Keep the kitchen honest — Annakut is gratitude, not a catering contest",
    ],
    dontList: [
      "Do not litter Braj paths during parikrama",
      "Do not treat Indra’s storm as a license to mock other deities’ devotees",
    ],
    funFacts: [
      "Annakut and Govardhan Puja names travel together; exact emphasis varies by sampradaya.",
      "The day sits inside the larger Diwali cluster — not a free-floating ‘extra’ holiday.",
    ],
    relatedHrefs: [
      { label: "Diwali", href: "/festivals/diwali" },
      { label: "Vishnu", href: "/vishnu" },
      { label: "Katha — Vishnu", href: "/katha/vishnu" },
    ],
    regions: ["Braj", "Gujarat", "Vaishnava homes worldwide"],
    sources: [
      "Bhagavata Purana Govardhan motif (tradition)",
      "2026 Annakut / Govardhan listings (often 10 Nov)",
    ],
    image: "/festivals/govardhan-puja.webp",
  },
  {
    slug: "bhai-dooj",
    name: "Bhai Dooj",
    sanskrit: "भाई दूज",
    dateISO: "2026-11-11",
    lunarHint: "Kartik Shukla Dwitiya — Yama Dwitiya in many almanacs",
    kind: "major",
    tradition: "pan-hindu",
    monthLabel: "November",
    tagline: "Tilak and protection — the Diwali cluster’s sibling day",
    summary:
      "Sisters mark brothers’ foreheads; brothers renew care. The day closes many families’ five-day Diwali arc.",
    katha:
      "Tellings speak of Yama visiting sister Yamuna, and of the ethic that death itself honours a sibling bond. Treat this as sacred folklore teaching protection — not a literal timetable of the afterlife.",
    livingPractice:
      "Tilak, aarti, sweets, and gifts. Regional names include Bhai Tika and Bhau Beej. Some families include cousins and chosen siblings.",
    inTheTemple:
      "Mostly a home festival. Yamuna-bank cities may see special visits; elsewhere the living room is the sanctum.",
    doList: [
      "Make the blessing mutual — ask what care your sibling actually needs",
      "Include those without brothers/sisters through friendship rites if that is your custom",
    ],
    dontList: [
      "Do not reduce the day to gift receipt value",
      "Do not force the rite on estranged relatives as public theatre",
    ],
    funFacts: [
      "Bhau Beej in Maharashtra keeps a distinct food and aarti flavour within the same tithi family.",
      "It mirrors Raksha Bandhan’s protection ethic on the opposite side of the year.",
    ],
    relatedHrefs: [
      { label: "Diwali", href: "/festivals/diwali" },
      { label: "Raksha Bandhan", href: "/festivals/raksha-bandhan" },
    ],
    regions: ["Pan-India", "Nepal (related sibling rites)"],
    sources: [
      "Yama-Yamuna sibling motif (tradition)",
      "2026 Kartik Shukla Dwitiya listings (11 Nov)",
    ],
    image: "/festivals/bhai-dooj.webp",
  },
  {
    slug: "chhath-puja",
    name: "Chhath Puja",
    sanskrit: "छठ पूजा",
    dateISO: "2026-11-18",
    lunarHint: "Kartik Shukla Shashthi peak — four-day arc often 15–18 Nov 2026",
    kind: "vrat",
    tradition: "saura",
    monthLabel: "November",
    tagline: "Arghya to the setting and rising Sun — Bihar’s great river vow",
    summary:
      "A rigorous four-day Sun vow of the Gangetic plains: nahay-khay, kharna, sandhya arghya, and usha arghya. Standing in water at dusk and dawn is the icon of the rite.",
    katha:
      "Folk and later tellings link Chhathi Maiya and Surya with Draupadi–Pandava gratitude motifs and local river goddess care. The living centre is Surya bhakti and ecological river reverence — not a single sealed Purāṇa chapter.",
    livingPractice:
      "36-hour style fasting patterns, thekua prasad, bamboo soop baskets, and community ghats. Bihar, Jharkhand, eastern UP, and Nepal Terai keep the densest observance; metros now host diaspora ghats.",
    inTheTemple:
      "The ‘temple’ is often the river itself. Follow local volunteer marshals. Wet steps are slippery; phones and loud music break the vow’s gravity.",
    doList: [
      "Keep the ghat clean — plastic has no place in arghya water",
      "Respect women-led ritual authority on the bank",
      "Hydrate carefully around the fast under medical common sense",
    ],
    dontList: [
      "Do not treat the ghat as a concert stage",
      "Do not shove for camera angles during arghya",
      "Do not pollute offerings with packaged waste",
    ],
    funFacts: [
      "Sandhya arghya faces the setting Sun; usha arghya faces the rising Sun — a complete solar grammar.",
      "Thekua’s wheat-jaggery craft is edible geography of the festival.",
    ],
    relatedHrefs: [
      { label: "Makar Sankranti", href: "/festivals/makar-sankranti" },
      { label: "Panchanga", href: "/panchanga" },
    ],
    regions: ["Bihar", "Jharkhand", "Eastern UP", "Nepal Terai", "diaspora ghats"],
    sources: [
      "Chhath living custom of the Gangetic plains",
      "2026 Kartik Chhath cluster listings (15–18 Nov; Shashthi peak 18 Nov)",
    ],
    image: "/festivals/chhath.webp",
  },
  {
    slug: "kartik-purnima",
    name: "Kartik Purnima",
    sanskrit: "कार्तिक पूर्णिमा",
    dateISO: "2026-11-24",
    lunarHint: "Kartik Purnima — Dev Deepawali / Tripuri Purnima motifs",
    kind: "major",
    tradition: "pan-hindu",
    monthLabel: "November",
    tagline: "Million lamps on the Ganga — and Shiva’s tripura lore",
    summary:
      "One of the year’s holiest full moons. Kashi’s Dev Deepawali, Pushkar’s fair, and Tripuri Purnima Shaiva tellings meet under the same moon.",
    katha:
      "Shaiva tradition remembers Śiva destroying the three cities of the demons (Tripura). Vaishnava Kartik mahātmya praises lamp-lighting and Tulsi. Sikh history marks Guru Nanak’s birth anniversary near this purnima in many years — check the exact Nanakshahi date separately.",
    livingPractice:
      "Ghat lamps, holy baths, charity, and pilgrimage fairs. Kartik month itself is a lamp discipline for many homes from Diwali onward.",
    inTheTemple:
      "Varanasi ghats become rivers of fire. Arrive early; steps are slippery. Respect photography bans during certain aartis.",
    doList: [
      "Light a lamp for ancestors or teachers",
      "Bathe mindfully — rivers have currents",
      "Give warm clothes in early winter north India",
    ],
    dontList: [
      "Do not litter diya cups into the river",
      "Do not treat Dev Deepawali only as a drone-photo event",
    ],
    funFacts: [
      "Pushkar camel fair historically clustered around Kartik Purnima.",
      "Tulsi Vivah often falls in Kartik and opens wedding seasons in many regions.",
    ],
    relatedHrefs: [
      { label: "Mahadeva — Kashi Vishwanath", href: "/mahadev/vishwanath" },
      { label: "Pilgrimage map", href: "/pilgrimage" },
    ],
    regions: ["Kashi", "Pushkar", "Pan-India Kartik observances"],
    sources: [
      "Tripura-dahana Shaiva tradition; Kartik mahatmya lamp customs",
      "2026 Kartik Purnima listings (24 Nov)",
    ],
    image: "/festivals/kartik-purnima.webp",
  },
];

export function getUtsavBySlug(slug: string): UtsavEntry | undefined {
  return UTSAVS.find((item) => item.slug === slug);
}

export function utsavsByMonth(): Map<string, UtsavEntry[]> {
  const map = new Map<string, UtsavEntry[]>();
  for (const item of UTSAVS) {
    const list = map.get(item.monthLabel) ?? [];
    list.push(item);
    map.set(item.monthLabel, list);
  }
  return map;
}

export function upcomingUtsavs(from: Date = new Date(), count = 6): UtsavEntry[] {
  const start = new Date(from);
  start.setHours(0, 0, 0, 0);
  return [...UTSAVS]
    .filter((item) => new Date(`${item.dateISO}T12:00:00`) >= start)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO))
    .slice(0, count);
}

export function utsavSlugs(): string[] {
  return UTSAVS.map((item) => item.slug);
}

/** Only ids that differ from the deep encyclopedia slug need an alias. */
const PANCHANGA_ID_ALIASES: Record<string, string> = {
  "ram-navami": "rama-navami",
  navratri: "sharad-navaratri",
  dussehra: "vijayadashami",
};

export function deepFestivalHref(panchangaId: string): string | undefined {
  const slug = PANCHANGA_ID_ALIASES[panchangaId] ?? panchangaId;
  return getUtsavBySlug(slug) ? `/festivals/${slug}` : undefined;
}
