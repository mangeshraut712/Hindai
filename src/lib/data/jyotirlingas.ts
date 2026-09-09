export interface JyotirlingaClaim {
  name: string;
  place: string;
  note: string;
}

export interface Jyotirlinga {
  id: number;
  slug: string;
  name: string;
  sanskrit: string;
  location: string;
  state: string;
  image: string;
  stotraPlace: string;
  story: string;
  significance: string;
  puranaStory: string;
  history: string;
  today: string;
  rituals: string[];
  bestTimeToVisit: string;
  nearbyPlaces: string[];
  otherClaims: JyotirlingaClaim[];
  sources: string[];
}

export const DWADASHA_JYOTIRLINGA_LINES = [
  "सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम् ।",
  "उज्जयिन्यां महाकालम् ॐकारममलेश्वरम् ॥",
  "परल्यां वैद्यनाथं च डाकिन्यां भीमशङ्करम् ।",
  "सेतुबन्धे तु रामेशं नागेशं दारुकावने ॥",
  "वाराणस्यां तु विश्वेशं त्र्यम्बकं गौतमीतटे ।",
  "हिमालये तु केदारं घुश्मेशं च शिवालये ॥",
] as const;

export const JYOTIRLINGAS: Jyotirlinga[] = [
  {
    id: 1,
    slug: "somnath",
    name: "Somnath",
    sanskrit: "सोमनाथ",
    location: "Prabhas Patan, Gir Somnath",
    state: "Gujarat",
    image: "/jyotirlingas/somnath.webp",
    stotraPlace: "Saurashtra",
    story:
      "Tradition holds that Soma, the moon, worshipped Shiva here after a curse and Shiva remained as Somnath, lord of the moon.",
    significance:
      "First name in the common twelve-fold stotra. The present sea-facing temple is a twentieth-century reconstruction on an older tirtha.",
    puranaStory:
      "In the Shiva Purana cycle, Daksha curses Soma. Soma’s penance at Prabhas is said to restore the moon’s light in a waxing and waning rhythm. That is a Puranic katha, not an astronomical paper.",
    history:
      "Prabhas is an old Shaiva tirtha on the Arabian Sea. Medieval sources describe raids on the temple, including Mahmud of Ghazni (commonly dated 1025–26 CE). The standing temple was rebuilt after Independence and inaugurated in 1951. Popular counts of “seventeen destructions” are later slogans, not a secure excavation log.",
    today:
      "A coastal pilgrimage: sea wind, a rebuilt shikhara, and a queue. Combine with Dwarka only as travel, not as proof that every Gujarat shrine is the same kshetra.",
    rituals: ["Rudrabhisheka", "Bilva offering", "Evening aarti by the sea"],
    bestTimeToVisit: "October to March",
    nearbyPlaces: ["Dwarka", "Porbandar", "Gir National Park"],
    otherClaims: [],
    sources: [
      "Shiva Purana, Jyotirlinga cycle (Kotirudra / Shatarudra recensions)",
      "Dwadasa Jyotirlinga stotra: Saurashtre Somanatham",
      "Somnath reconstruction, inaugurated 1951",
    ],
  },
  {
    id: 2,
    slug: "mallikarjuna",
    name: "Mallikarjuna",
    sanskrit: "मल्लिकार्जुन",
    location: "Srisailam, Nallamala hills",
    state: "Andhra Pradesh",
    image: "/jyotirlingas/mallikarjuna.webp",
    stotraPlace: "Sri Shaila",
    story:
      "Tradition names Shiva here Mallikarjuna and Parvati Bhramaramba. The hill is both a Jyotirlinga and a major Shakti seat.",
    significance:
      "One of the few sites where a Jyotirlinga and a widely accepted Shakti Peetha stand in one kshetra, above the Krishna river.",
    puranaStory:
      "Local Shaiva-Shakta katha tells of Skanda leaving Kailasa after Ganesha wins a contest, and of the parents dwelling at Srisailam as Mallikarjuna and Bhramaramba so the son would not be far. Treat this as temple legend.",
    history:
      "Srisailam is an old hill shrine in the Nallamala forest, with Chalukya, Kakatiya, Vijayanagara, and later layers. It is a living Andhra-Telangana pilgrimage, not a modern invention.",
    today:
      "A forest-and-dam journey: ghat roads, the Krishna, and a crowded gopuram. Sikharam and the river ghat are separate walks, not the same courtyard.",
    rituals: ["Abhisheka", "Bhramaramba darshan", "Pradakshina"],
    bestTimeToVisit: "October to March; Maha Shivaratri is peak",
    nearbyPlaces: ["Krishna river", "Srisailam dam", "Nagarjunasagar"],
    otherClaims: [],
    sources: [
      "Dwadasa Jyotirlinga stotra: Shrishaile Mallikarjunam",
      "Andhra temple tradition of Mallikarjuna–Bhramaramba",
    ],
  },
  {
    id: 3,
    slug: "mahakaleshwar",
    name: "Mahakaleshwar",
    sanskrit: "महाकालेश्वर",
    location: "Ujjain (Avanti), Shipra",
    state: "Madhya Pradesh",
    image: "/jyotirlingas/mahakaleshwar.webp",
    stotraPlace: "Ujjayini",
    story:
      "Shaiva katha says Shiva rose as Mahakala to protect Ujjain from the demon Dushana. The linga is worshipped as dakshinamukhi, facing south.",
    significance:
      "Among the twelve, this is the shrine famous for facing south and for the dawn Bhasma Aarti. Ujjain is also one of the Sapta Puri and a Kumbh city.",
    puranaStory:
      "The Kotirudra cycle narrates devotees and a threatening asura; Shiva appears as the lord of time. That is Purana, not a dated battle.",
    history:
      "Ujjain / Avanti is an ancient city on the Shipra. The present Mahakaleshwar complex has been rebuilt in phases; the south-facing linga and the Bhasma Aarti are living temple custom reported by the shrine itself.",
    today:
      "If you go now, the hard fact is the clock: Bhasma Aarti is a pre-dawn booking, not a casual stroll. The rest of the day is ordinary crowded darshan in a busy Madhya Pradesh city.",
    rituals: ["Bhasma Aarti at dawn (advance booking)", "Rudrabhisheka", "Mahamrityunjaya japa"],
    bestTimeToVisit: "October to March; Maha Shivaratri is extremely crowded",
    nearbyPlaces: ["Ram Ghat", "Kal Bhairav", "Sandipani ashram tradition"],
    otherClaims: [],
    sources: [
      "Dwadasa Jyotirlinga stotra: Ujjayinyam Mahakalam",
      "Mahakaleshwar temple administration: south-facing linga and Bhasma Aarti",
    ],
  },
  {
    id: 4,
    slug: "omkareshwar",
    name: "Omkareshwar",
    sanskrit: "ओंकारेश्वर",
    location: "Mandhata island, Narmada, Khandwa district",
    state: "Madhya Pradesh",
    image: "/jyotirlingas/omkareshwar.webp",
    stotraPlace: "Omkara / Amaleshvara",
    story:
      "The island in the Narmada is likened to the shape of Om. Shiva is worshipped as Omkareshwar; Mamleshwar (Amareshwar) stands on the south bank as the paired shrine named in the same stotra line.",
    significance:
      "The stotra pairs Omkara and Amaleshvara. Honest reading: two related Narmada shrines, not a single building.",
    puranaStory:
      "Puranic katha speaks of Mandhata’s penance and of Shiva dwelling as Omkara. The Om-shaped island is a later geographic reading of the same name.",
    history:
      "Mandhata is a Narmada island pilgrimage with medieval and Maratha layers. Ahilyabai Holkar’s patronage is part of the regional temple history, as at several other Shaiva sites.",
    today:
      "A river island: boats or the bridge, ghat steps, and a second shrine across the water. Do not skip Mamleshwar and then claim you “finished” the stotra’s Omkara–Amaleshvara pair.",
    rituals: ["Abhisheka with Narmada water", "Island and south-bank darshan", "Ghat meditation"],
    bestTimeToVisit: "September to March",
    nearbyPlaces: ["Mamleshwar", "Maheshwar", "Mandu"],
    otherClaims: [
      {
        name: "Mamleshwar / Amareshwar",
        place: "South bank of the Narmada, opposite the island",
        note: "Named with Omkara in the stotra; visit both rather than arguing which stone is “the” Jyotirlinga.",
      },
    ],
    sources: [
      "Dwadasa Jyotirlinga stotra: Omkaram Amaleshvaram",
      "Narmada Mandhata island geography",
    ],
  },
  {
    id: 5,
    slug: "kedarnath",
    name: "Kedarnath",
    sanskrit: "केदारनाथ",
    location: "Kedarnath, Rudraprayag, Mandakini valley",
    state: "Uttarakhand",
    image: "/jyotirlingas/kedarnath.webp",
    stotraPlace: "Himalaya",
    story:
      "After Kurukshetra, the Pandavas are said to have sought Shiva. He took a bull’s form and sank into the earth; the hump is worshipped at Kedarnath, other parts at the remaining Panch Kedar.",
    significance:
      "Highest of the twelve (~3,583 m). Also part of Uttarakhand Char Dham. The shrine is closed in winter; the utsava murti is taken to Ukhimath.",
    puranaStory:
      "Panch Kedar is Mahabharata-local Shaiva legend: Kedarnath (hump), Tungnath (arms), Rudranath (face), Madhyamaheshwar (navel), Kalpeshwar (hair). It is katha, not a zoological event.",
    history:
      "A stone Himalayan temple on a high terrace, traditionally linked to early medieval Shaiva builders and to Adi Shankara’s Himalayan circuit. In June 2013 a catastrophic flood destroyed much of the town; the old temple stone mass survived. Winter closure is administrative and climatic, not a mystery.",
    today:
      "A trek or helicopter from Gaurikund / Phata in the open season (roughly May–October, dates notified yearly). Altitude sickness is a medical fact. Closed months are closed.",
    rituals: [
      "Abhisheka in the open season",
      "Panch Kedar as a longer circuit",
      "Winter worship at Ukhimath",
    ],
    bestTimeToVisit: "May–June and September–October; confirm the opening bulletin",
    nearbyPlaces: ["Gaurikund", "Vasuki Tal", "Ukhimath (winter seat)"],
    otherClaims: [],
    sources: [
      "Dwadasa Jyotirlinga stotra: Himalaye tu Kedaram",
      "Uttarakhand Char Dham and Panch Kedar pilgrimage",
      "Temple altitude commonly given as about 3,583 m",
    ],
  },
  {
    id: 6,
    slug: "bhimashankar",
    name: "Bhimashankar",
    sanskrit: "भीमाशंकर",
    location: "Khed taluka, Pune district, Sahyadri",
    state: "Maharashtra",
    image: "/jyotirlingas/bhimashankar.webp",
    stotraPlace: "Dakini",
    story:
      "Katha says Shiva destroyed the asura Bhima who tormented sages. The Sahyadri shrine stands in a reserved forest that is also a wildlife sanctuary.",
    significance:
      "The stotra locates Bhimashankar in Dakini. Maharashtra’s Sahyadri temple is the site most all-India yatras use. Assam also preserves a Bhimashankar claim.",
    puranaStory:
      "The asura Bhima of this katha is a local Shaiva antagonist, not Bhima the Pandava. Mixing the two is a common modern mix-up.",
    history:
      "A hill temple in the Western Ghats with Yadava / later Maratha layers, inside Bhimashankar Wildlife Sanctuary. Monsoon roads are a practical limit, not a ritual rule.",
    today:
      "A forest drive from Pune: mist, langurs, and a stone sabhamandapa. Peak Shravan and Shivaratri mean traffic jams. The sanctuary is for animals as well as pilgrims.",
    rituals: ["Abhisheka", "Rudram recitation", "Quiet forest pradakshina"],
    bestTimeToVisit: "October to February; monsoon is beautiful and slow",
    nearbyPlaces: ["Pune", "Ahupe ghat", "Kedareshwar caves nearby"],
    otherClaims: [
      {
        name: "Bhimashankar of Kamarupa",
        place: "Kamrup region, Assam",
        note: "Uses the Dakini / Kamarupa reading of the same stotra. Named here because the verse is ambiguous, not because this site invents a thirteenth linga.",
      },
    ],
    sources: [
      "Dwadasa Jyotirlinga stotra: Dakinyam Bhimashankaram",
      "Bhimashankar Wildlife Sanctuary, Pune district",
    ],
  },
  {
    id: 7,
    slug: "vishwanath",
    name: "Kashi Vishwanath",
    sanskrit: "काशी विश्वनाथ",
    location: "Varanasi, Ganga",
    state: "Uttar Pradesh",
    image: "/jyotirlingas/vishwanath.webp",
    stotraPlace: "Varanasi",
    story:
      "Kashi is Shiva’s city in Shaiva theology. Vishwanath, lord of the universe, is the Jyotirlinga name for the Ganga-side shrine.",
    significance:
      "Varanasi is a Sapta Puri. Belief that death in Kashi yields moksha is a theological claim, not a medical or legal fact.",
    puranaStory:
      "Puranas describe Shiva’s never leaving Kashi and the Ganga’s descent. Those are mahatmya texts. They explain why the city is loved; they do not date the first stone.",
    history:
      "The Vishwanath shrine has been destroyed and rebuilt more than once. The temple associated with Ahilyabai Holkar dates to 1780. The Kashi Vishwanath Corridor, opened in 2021, is a documented contemporary urban-religious project.",
    today:
      "Ghats, a reconstructed approach, airport-style queues, and the Ganga aarti at Dashashwamedh as a separate public ritual. Corridor photographs are not the eighteenth-century lane.",
    rituals: [
      "Ganga water abhisheka",
      "Mangala and evening aarti",
      "Ghat bathing as custom, with river-safety sense",
    ],
    bestTimeToVisit: "October to March",
    nearbyPlaces: ["Dashashwamedh Ghat", "Sarnath", "Annapurna temple"],
    otherClaims: [],
    sources: [
      "Dwadasa Jyotirlinga stotra: Varanasyam tu Vishvesham",
      "Ahilyabai Holkar rebuild, 1780",
      "Kashi Vishwanath Corridor opening, 2021",
    ],
  },
  {
    id: 8,
    slug: "trimbakeshwar",
    name: "Trimbakeshwar",
    sanskrit: "त्र्यम्बकेश्वर",
    location: "Trimbak, Nashik district",
    state: "Maharashtra",
    image: "/jyotirlingas/trimbakeshwar.webp",
    stotraPlace: "Gautami (Godavari) bank",
    story:
      "Sage Gautama’s ashram katha is tied to the rise of the Godavari from Brahmagiri. The linga is unusual: three faces, read as Brahma, Vishnu, and Shiva.",
    significance:
      "Source-region of the Godavari, the longest river of peninsular India. Kushavarta kund is part of the living tirtha.",
    puranaStory:
      "Gautama is accused of go-hatya in the katha; his penance and Ganga-Godavari’s appearance cleanse the ashram. That is mahatmya, not a hydrology paper. The river’s actual catchment is a geographic fact beside the story.",
    history:
      "A major Nashik-district Shaiva temple with Hemadpanti and later work. Nashik-Trimbak is a Godavari Kumbh pair. The three-faced linga is a distinctive, visible ritual fact.",
    today:
      "A small hill town: kund bath, temple queue, and a climb toward Brahmagiri if you have the legs. Godavari origin is a spring landscape, not a tap in the sanctum.",
    rituals: ["Abhisheka", "Kushavarta snana", "Ancestral rites as local custom"],
    bestTimeToVisit: "October to March; Maha Shivaratri is peak",
    nearbyPlaces: ["Nashik", "Brahmagiri", "Anjaneri"],
    otherClaims: [],
    sources: [
      "Dwadasa Jyotirlinga stotra: Tryambakam Gautami tate",
      "Godavari headwaters at Brahmagiri / Trimbak",
    ],
  },
  {
    id: 9,
    slug: "vaidyanath",
    name: "Vaidyanath",
    sanskrit: "वैद्यनाथ",
    location: "Deoghar (widely visited identification)",
    state: "Jharkhand",
    image: "/jyotirlingas/vaidyanath.webp",
    stotraPlace: "Parli / Chitabhumi (verse variants)",
    story:
      "Katha: Ravana wins a linga and is tricked into setting it down; Shiva remains as Vaidyanath, lord of physicians. Another telling: Shiva restores Ravana’s heads and is named the physician.",
    significance:
      "Healing is the theological theme of the name. The Kanwar walk from Sultanganj to Deoghar in Shravan is a documented mass pilgrimage.",
    puranaStory:
      "Ravana-lila around an immovable linga is Purana / local mahatmya. It is told at more than one temple that claims this name.",
    history:
      "The stotra itself is the problem: one recension says Paralyam Vaidyanatham (read as Parli Vaijnath, Beed / Maharashtra), another tradition reads Chitabhumi (read as Deoghar, Jharkhand). Baijnath in Kangra is a third, weaker popular claim. This site lists Deoghar as the busiest living identification and names the others instead of erasing them.",
    today:
      "If you walk with kanwars in Shravan, you are in a real crowd with heat, police, and Ganga water pots — not a movie. Parli remains a full Shaiva temple for those who follow the Parli reading.",
    rituals: ["Shravan kanwar jal abhisheka at Deoghar", "Daily abhisheka", "Bilva offering"],
    bestTimeToVisit: "July–August for Kanwar (extreme crowding); October–March otherwise",
    nearbyPlaces: [
      "Sultanganj (kanwar start)",
      "Nandan Pahar",
      "Parli Vaijnath if you follow that reading",
    ],
    otherClaims: [
      {
        name: "Vaijnath",
        place: "Parli, Maharashtra",
        note: "Matches the परल्यां reading of the stotra. Maharashtra Shaiva yatras often start or insist here.",
      },
      {
        name: "Baijnath",
        place: "Kangra, Himachal Pradesh",
        note: "A historic Shiva temple sometimes pulled into the twelve; weaker fit to the standard stotra geography.",
      },
    ],
    sources: [
      "Dwadasa Jyotirlinga stotra variants: Parali vs Chitabhumi",
      "Baba Baidyanath Dham, Deoghar, and the Sultanganj–Deoghar Kanwar",
      "Parli Vaijnath temple, Maharashtra",
    ],
  },
  {
    id: 10,
    slug: "nageshwar",
    name: "Nageshwar",
    sanskrit: "नागेश्वर",
    location: "Near Dwarka (common Gujarat identification)",
    state: "Gujarat",
    image: "/jyotirlingas/nageshwar.webp",
    stotraPlace: "Darukavana",
    story:
      "Shiva Purana: the asura Daruka imprisons devotees, including Supriya; Shiva appears as Nagesha, lord of serpents, in Daruka’s forest.",
    significance:
      "Protection-from-fear is the theological theme. Darukavana is a forest name, which is why three living temples argue.",
    puranaStory: "Daruka–Supriya is Kotirudra katha. It does not print a modern district map.",
    history:
      "Three living claimants: Nageshwar near Dwarka (Gujarat), Aundha Nagnath in Hingoli (Maharashtra, Hemadpanti temple), and Jageshwar in Almora (Uttarakhand). Popular all-India lists print Dwarka; Maharashtra lists often print Aundha. There is no inscription that settles the stotra for every sampradaya.",
    today:
      "Dwarka gives you a large modern campus and a tall Shiva murti on the approach — art and tourism, not the Puranic forest. Aundha is an older stone temple off the main Gujarat–Dwarka trail.",
    rituals: [
      "Abhisheka",
      "Pair with Dwarkadhish only as a travel circuit",
      "Visit Aundha if that is your family’s reading",
    ],
    bestTimeToVisit: "October to March",
    nearbyPlaces: ["Dwarka", "Bet Dwarka", "Aundha Nagnath for the Maharashtra claim"],
    otherClaims: [
      {
        name: "Aundha Nagnath",
        place: "Hingoli district, Maharashtra",
        note: "Hemadpanti temple; strong Maharashtra identification of Nagesha / Darukavana.",
      },
      {
        name: "Jageshwar",
        place: "Almora district, Uttarakhand",
        note: "A dense Shiva-temple grove sometimes claimed as Nagesha; treat as a third reading, not a secret proof.",
      },
    ],
    sources: [
      "Shiva Purana, Nagesha / Darukavana narrative",
      "Dwadasa Jyotirlinga stotra: Nagesham Darukavane",
    ],
  },
  {
    id: 11,
    slug: "rameshwaram",
    name: "Rameswaram",
    sanskrit: "रामेश्वर",
    location: "Rameswaram island, Ramanathapuram",
    state: "Tamil Nadu",
    image: "/jyotirlingas/rameshwaram.webp",
    stotraPlace: "Setubandha",
    story:
      "Ramayana-linked katha: Rama worships Shiva on the shore before the Lanka war. Two lingas are told: a sand linga associated with Sita, and a stone linga Hanuman is said to have fetched.",
    significance:
      "A Jyotirlinga, a Char Dham of the four-corners yatra, and a major Tamil Shaiva temple (Ramanathaswamy). The long pillared corridors are an architectural fact.",
    puranaStory:
      "Setu and Rama’s worship are itihasa-purana. They explain the name Ramesha. They are not a marine-archaeology report on Adam’s Bridge / Ram Setu.",
    history:
      "The island temple has Chola, Pandya, and later Nayaka work. Twenty-two theerthams (wells) inside the complex are a counted ritual circuit. The Pamban bridge is modern transport, not scripture.",
    today:
      "A sea-island day: corridor walk, well-bathing if you join that custom, and a separate trip to Dhanushkodi. Do not confuse the railway bridge with the Puranic setu.",
    rituals: ["Bathing the 22 theerthams as temple custom", "Abhisheka", "Setu shore visit"],
    bestTimeToVisit: "October to April",
    nearbyPlaces: ["Dhanushkodi", "Pamban bridge", "Gandhamadana"],
    otherClaims: [],
    sources: [
      "Dwadasa Jyotirlinga stotra: Setubandhe tu Ramesham",
      "Sri Ramanathaswamy temple, Rameswaram",
      "Char Dham of Badrinath, Puri, Dwarka, and Rameswaram",
    ],
  },
  {
    id: 12,
    slug: "grishneshwar",
    name: "Grishneshwar",
    sanskrit: "घृष्णेश्वर",
    location: "Verul, near Ellora, Chhatrapati Sambhajinagar",
    state: "Maharashtra",
    image: "/jyotirlingas/grishneshwar.webp",
    stotraPlace: "Shivalaya",
    story:
      "Katha of Ghushma (or Kusuma): a devoted wife whose son is killed by a jealous co-wife; her Shiva-puja restores the child, and Shiva stays as Ghushmeshwar / Grishneshwar.",
    significance:
      "Twelfth name in the common recitation. The red-stone temple stands beside the UNESCO Ellora cave complex — caves are archaeology; the linga is a living shrine.",
    puranaStory:
      "Ghushma’s katha is the Shiva Purana’s closing Jyotirlinga tale. Spellings Grishneshwar, Ghrishneshwar, and Ghushmeshwar all point at this kshetra.",
    history:
      "A Deccan Shaiva shrine rebuilt in the eighteenth century under Ahilyabai Holkar, next to the much older Ellora (Elura) rock-cut caves.",
    today:
      "One ticketed cave world and one village temple. You can see both in a day. The caves do not make the linga “older” in a carbon-date sense; they share a hill.",
    rituals: ["Abhisheka", "Bilva offering", "Ellora as a separate heritage visit"],
    bestTimeToVisit: "October to March",
    nearbyPlaces: ["Ellora Caves", "Daulatabad", "Aurangabad / Chhatrapati Sambhajinagar"],
    otherClaims: [],
    sources: [
      "Dwadasa Jyotirlinga stotra: Ghushmesham cha Shivalaye",
      "Ellora Caves, UNESCO World Heritage list",
      "Holkar-period rebuild of the Verul shrine",
    ],
  },
];

export function listJyotirlingaSlugs(): string[] {
  return JYOTIRLINGAS.map((item) => item.slug);
}

export function getJyotirlingaById(id: number): Jyotirlinga | undefined {
  return JYOTIRLINGAS.find((item) => item.id === id);
}

export function getJyotirlingaBySlug(slug: string): Jyotirlinga | undefined {
  return JYOTIRLINGAS.find((item) => item.slug === slug);
}

export function getJyotirlingaByName(name: string): Jyotirlinga | undefined {
  const needle = name.toLowerCase();
  return JYOTIRLINGAS.find(
    (item) => item.name.toLowerCase() === needle || item.sanskrit === name || item.slug === needle
  );
}

export function getJyotirlingasByState(state: string): Jyotirlinga[] {
  return JYOTIRLINGAS.filter((item) => item.state.toLowerCase() === state.toLowerCase());
}

export function searchJyotirlingas(query: string): Jyotirlinga[] {
  const lowerQuery = query.toLowerCase();
  return JYOTIRLINGAS.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.sanskrit.includes(lowerQuery) ||
      item.location.toLowerCase().includes(lowerQuery) ||
      item.state.toLowerCase().includes(lowerQuery) ||
      item.story.toLowerCase().includes(lowerQuery) ||
      item.slug.includes(lowerQuery)
  );
}
