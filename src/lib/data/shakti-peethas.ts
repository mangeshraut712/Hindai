import type { GeoPoint, ListStatus } from "./sacred-geography";

export interface ShaktiPeetha {
  id: number;
  slug: string;
  name: string;
  sanskrit: string;
  bodyPart: string;
  bodyPartNote: string;
  location: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  deviName: string;
  bhairavaName: string;
  listStatus: ListStatus;
  story: string;
  puranaStory: string;
  history: string;
  today: string;
  significance: string;
  rituals: string[];
  bestTimeToVisit: string;
  sources: string[];
  /** Optional artist impression; falls back to Devi hero when absent */
  image?: string;
}

function peetha(partial: Omit<ShaktiPeetha, "lat" | "lng"> & GeoPoint): ShaktiPeetha {
  return partial;
}

/**
 * Indexed Devi tirthas. Canonical printed lists name 51 (or 108) peethas;
 * those lists disagree on several sites. This catalog does not invent the missing
 * thirty-odd names. Vaishno Devi and Mansa Devi (Panchkula) are living yatras,
 * not treated here as secure Puranic peethas.
 */
export const SHAKTI_PEETHAS: ShaktiPeetha[] = [
  peetha({
    id: 1,
    slug: "kamakhya",
    name: "Kamakhya",
    sanskrit: "कामाख्या",
    bodyPart: "Yoni",
    bodyPartNote: "Among the most stable identifications in peetha lists.",
    location: "Nilachal hill, Guwahati",
    state: "Assam",
    country: "India",
    lat: 26.166,
    lng: 91.705,
    deviName: "Kamakhya",
    bhairavaName: "Umananda (associated Shiva shrine on the Brahmaputra)",
    listStatus: "peetha-common",
    story:
      "Sati’s yoni is said to have fallen on Nilachal. The garbhagriha is a natural stone cleft, not a standing murti.",
    puranaStory:
      "Kalika Purana and later Shakta mahatmya place Kamarupa at the centre of Devi’s creative power. That is tantric katha, not a dated autopsy.",
    history:
      "A living hill temple above the Brahmaputra with Koch, Ahom, and later layers. Ambubachi Mela in the monsoon is a documented annual closure and fair.",
    today:
      "A crowded Assamese hill shrine. Animal bali still occurs in some rites; calling it only ‘symbolic’ is inaccurate. Dress and photography rules are strict in the inner court.",
    significance: "Primary Shakta-tantric centre of eastern India.",
    rituals: ["Ambubachi Mela", "Red cloth and sindoor", "Nilachal hill darshan"],
    bestTimeToVisit: "October–March; June only if you intend Ambubachi crowds",
    sources: ["Kalika Purana Kamarupa mahatmya", "Kamakhya temple, Nilachal, Guwahati"],
    image: "/devi/peethas/kamakhya.png",
  }),
  peetha({
    id: 2,
    slug: "kalighat",
    name: "Kalighat",
    sanskrit: "कालीघाट",
    bodyPart: "Right toes (in common 51-lists)",
    bodyPartNote: "Standard Kolkata identification; not the only Kali ghat in Bengal.",
    location: "Kalighat, Kolkata",
    state: "West Bengal",
    country: "India",
    lat: 22.52,
    lng: 88.342,
    deviName: "Kali",
    bhairavaName: "Nakuleshwar",
    listStatus: "peetha-common",
    story: "Lists place Sati’s toes here. Kali is worshipped as a fierce standing image.",
    puranaStory:
      "The Daksha-yajna katha is pan-Indian. Kalighat’s local mahatmya attaches the toes to this ghat on Adi Ganga.",
    history:
      "A riverine Kali shrine that gave a neighbourhood its name. The present temple is largely nineteenth-century; the ghat is older as a settlement.",
    today:
      "A dense Kolkata temple: priests, markets, and a queue. Kali Puja night is the peak. It is not Dakshineswar, which is a later Ramakrishna-era temple.",
    significance: "The Kali peetha most visitors meet in Bengal.",
    rituals: ["Hibiscus and sindoor", "Morning and evening aarti"],
    bestTimeToVisit: "October–November (Kali Puja) or winter weekdays",
    sources: ["Bengal Shakta peetha lists", "Kalighat Kali temple, Kolkata"],
    image: "/devi/peethas/kalighat.png",
  }),
  peetha({
    id: 3,
    slug: "tarapith",
    name: "Tarapith",
    sanskrit: "तारापीठ",
    bodyPart: "Third eye / eyes (list-dependent)",
    bodyPartNote: "Tarapith and Naina Devi both claim ‘eyes’ in popular books.",
    location: "Tarapith, Birbhum",
    state: "West Bengal",
    country: "India",
    lat: 24.111,
    lng: 87.801,
    deviName: "Tara",
    bhairavaName: "Akshaya / cremation-ground Bhairava of local practice",
    listStatus: "peetha-disputed",
    story:
      "Tara as the saviouress; the shrine sits beside a smashan, which is part of the living cult.",
    puranaStory:
      "Tara is a Mahavidya. Local katha of Vashishtha and of Bamakhepa belongs to Bengal Shakta memory, not to a single Purana chapter everyone shares.",
    history:
      "A Birbhum Shakta centre. Bamakhyapa (Bamakhepa) is a nineteenth-century saint of this kshetra.",
    today:
      "Night worship, cremation-ground adjacency, and a small town queue. Not a tourist Kali-themed park.",
    significance: "Bengal’s Tara pitha; eye-assignment overlaps other sites.",
    rituals: ["Tara mantra", "Smashan-adjacent night puja as local custom"],
    bestTimeToVisit: "Winter; Shravan nights are locally important",
    sources: ["Bengal Tara-pitha tradition", "Tarapith, Birbhum"],
  }),
  peetha({
    id: 4,
    slug: "jwalamukhi",
    name: "Jwalamukhi",
    sanskrit: "ज्वालामुखी",
    bodyPart: "Tongue",
    bodyPartNote: "The flames are natural gas seeps, worshipped as the Goddess’s tongue.",
    location: "Jwalamukhi, Kangra",
    state: "Himachal Pradesh",
    country: "India",
    lat: 31.876,
    lng: 76.324,
    deviName: "Jwalamukhi",
    bhairavaName: "Unmatta Bhairava (in many peetha tables)",
    listStatus: "peetha-common",
    story: "No conventional murti: blue flames in the rock are the presence.",
    puranaStory: "Sati’s tongue is the mahatmya reading of an eternal fire.",
    history:
      "A Kangra valley shrine noted by medieval and early-modern travellers. The flame is geology plus worship, not a lamp someone forgot to blow out.",
    today:
      "Ghee offered into the flames, Navratri crowds, a Himachal bus town. Combine with Kangra Bajreshwari only as a road circuit.",
    significance: "The flame-peetha of the western Himalaya.",
    rituals: ["Ghee to the flames", "Navratri"],
    bestTimeToVisit: "March–April and September–October (Navratri)",
    sources: ["Kangra Jwalamukhi temple", "Peetha lists assigning the tongue here"],
  }),
  peetha({
    id: 5,
    slug: "hinglaj",
    name: "Hinglaj",
    sanskrit: "हिंगलाज",
    bodyPart: "Brahmarandhra / crown (common lists)",
    bodyPartNote: "Hinglaj Mata is the great western peetha, in Balochistan.",
    location: "Hingol National Park",
    state: "Balochistan",
    country: "Pakistan",
    lat: 25.514,
    lng: 65.515,
    deviName: "Hinglaj Mata",
    bhairavaName: "Bhimlochan (in peetha tables)",
    listStatus: "peetha-common",
    story:
      "A desert cave shrine of Hinglaj Mata — among the oldest named western peethas in living Hindu geography.",
    puranaStory:
      "The brahmarandhra falling in the west is mahatmya geography for the Makran. Cross-border politics are not part of the katha.",
    history:
      "A living Hindu tirtha in Balochistan. The Hinglaj Yatra is organised in Pakistan; it is not an Indian state temple.",
    today:
      "A remote national-park approach. Cross-border travel is a passport fact, not a mythic obstacle.",
    significance: "The western anchor of the peetha map.",
    rituals: ["Hinglaj yatra", "Cave darshan"],
    bestTimeToVisit: "The notified Pakistani yatra window, usually spring",
    sources: ["Hinglaj Mata, Lasbela / Hingol", "Western peetha lists"],
    image: "/devi/peethas/hinglaj.png",
  }),
  peetha({
    id: 6,
    slug: "vishalakshi",
    name: "Vishalakshi",
    sanskrit: "विशालाक्षी",
    bodyPart: "Earrings / eyes (list-dependent)",
    bodyPartNote: "Kashi’s Devi peetha beside Vishwanath; assignments vary by handbook.",
    location: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    lat: 25.31,
    lng: 83.013,
    deviName: "Vishalakshi",
    bhairavaName: "Kalabhairava of Kashi (city Bhairava, not a unique pairing)",
    listStatus: "peetha-common",
    story: "Devi as wide-eyed Vishalakshi in Shiva’s city.",
    puranaStory: "Kashi mahatmya places a Devi peetha in the same kshetra as Vishwanath.",
    history: "A lane shrine in the old city, rebuilt like most of Kashi’s inner temples.",
    today:
      "A short walk from the Vishwanath corridor. Do not confuse it with Annapurna or with Vaishno Devi.",
    significance: "The Kashi Shakta pin on the same map as the Jyotirlinga.",
    rituals: ["Lane darshan", "Pair with Vishwanath as two traditions in one city"],
    bestTimeToVisit: "October–March",
    sources: ["Kashi Vishalakshi temple", "Peetha tables for Varanasi"],
  }),
  peetha({
    id: 7,
    slug: "vimala",
    name: "Vimala",
    sanskrit: "विमला",
    bodyPart: "Foot (in some lists)",
    bodyPartNote: "Vimala inside Jagannath’s Puri compound is the Shakta heart of that kshetra.",
    location: "Jagannath temple complex, Puri",
    state: "Odisha",
    country: "India",
    lat: 19.805,
    lng: 85.818,
    deviName: "Vimala",
    bhairavaName: "Jagannath kshetra Bhairava of local tantra (not a separate famous temple)",
    listStatus: "peetha-common",
    story:
      "Food offered to Jagannath becomes mahaprasad only after Vimala’s offering — a living ritual fact of Puri.",
    puranaStory: "Utkala mahatmya treats Vimala as the kshetra-shakti of Purushottama.",
    history:
      "A shrine inside the Jagannath compound. Access follows temple rules for the whole complex.",
    today:
      "You visit Puri’s Vaishnava Char Dham and this Shakta peetha on the same island of stone. Non-Hindus face the same outer limits as for Jagannath.",
    significance: "Shakta peetha inside a Vaishnava Char Dham.",
    rituals: ["Vimala offering sequence", "Puri kshetra darshan"],
    bestTimeToVisit: "Winter; Rath Yatra is a crowd, not a quiet peetha day",
    sources: ["Puri Vimala temple", "Jagannath temple ritual order"],
  }),
  peetha({
    id: 8,
    slug: "tara-tarini",
    name: "Tara Tarini",
    sanskrit: "तारा तारिणी",
    bodyPart: "Breasts (in Odisha peetha telling)",
    bodyPartNote: "Twin goddesses on the Rushikulya; one of Odisha’s four major Shakta pithas.",
    location: "Purushottampur, Ganjam",
    state: "Odisha",
    country: "India",
    lat: 19.49,
    lng: 84.88,
    deviName: "Tara and Tarini",
    bhairavaName: "Listed variously; treat the pairing as handbook data",
    listStatus: "peetha-common",
    story:
      "Twin sisters on a hill above the Rushikulya — Odisha’s local peetha telling, not Bengal’s Tarapith.",
    puranaStory:
      "Odisha Shakta katha of the fallen breasts. Lists that merge this pin with Birbhum Tarapith are geography errors.",
    history:
      "A Ganjam hill temple with a modern cable approach plus steps. It sits in Odisha’s four-major-pitha circuit.",
    today:
      "A weekend Odisha yatra. Keep the map honest: Tara Tarini (Ganjam) ≠ Tarapith (Birbhum).",
    significance: "Southern Odisha’s twin-Devi pitha.",
    rituals: ["Hill darshan", "Navratri"],
    bestTimeToVisit: "October–March",
    sources: ["Tara Tarini temple, Ganjam", "Odisha Shakta pitha set"],
  }),
  peetha({
    id: 9,
    slug: "guhyeshwari",
    name: "Guhyeshwari",
    sanskrit: "गुह्येश्वरी",
    bodyPart: "Knees / secret part (list-dependent)",
    bodyPartNote: "Nepal’s principal peetha beside Pashupatinath.",
    location: "Kathmandu",
    state: "Bagmati",
    country: "Nepal",
    lat: 27.711,
    lng: 85.353,
    deviName: "Guhyeshwari",
    bhairavaName: "Pashupatinath kshetra",
    listStatus: "peetha-common",
    story:
      "The ‘hidden’ Goddess beside Pashupatinath — Nepal’s principal peetha pairing of Shiva and Shakti on the Bagmati.",
    puranaStory:
      "Nepalese mahatmya places a peetha next to Pashupati. Body-part assignments here are list-dependent; treat them as handbook data.",
    history:
      "A Licchavi-to-Malla Kathmandu shrine; the present structure is later. This is a Nepal sovereign temple, not an Indian state board.",
    today:
      "Combine with Pashupatinath. Cross-border travel is a passport fact — not a mythic obstacle.",
    significance: "The Himalayan-valley peetha on the Bagmati.",
    rituals: ["Guhyeshwari darshan", "Pashupati circuit"],
    bestTimeToVisit: "October–March",
    sources: ["Guhyeshwari temple, Kathmandu", "Pashupatinath kshetra"],
  }),
  peetha({
    id: 10,
    slug: "kanchi-kamakshi",
    name: "Kanchi Kamakshi",
    sanskrit: "काञ्ची कामाक्षी",
    bodyPart: "Navel / belt (in some 18-peetha lists)",
    bodyPartNote:
      "Kanchipuram’s Kamakshi is a south-Indian Shakta-and-Smart centre, also a Shankara matha town.",
    location: "Kanchipuram",
    state: "Tamil Nadu",
    country: "India",
    lat: 12.843,
    lng: 79.703,
    deviName: "Kamakshi",
    bhairavaName: "Ekambaranathar (Kanchi Shiva, city pair)",
    listStatus: "peetha-common",
    story: "Kamakshi seated in yogic pose; Kanchi is a mukti-kshetra of Tamil Shaiva-Shakta life.",
    puranaStory: "Kamakshi mahatmya and the 18-peetha lists used in the south.",
    history: "Pallava-Chola city. The Kamakshi temple and Ekambaranathar are separate complexes.",
    today:
      "A temple town circuit: Kamakshi, Ekambara, Varadaraja. Silk shops are economy, not liturgy.",
    significance: "The Tamil Kamakshi pin, not Assam’s Kamakhya.",
    rituals: ["Kamakshi darshan", "Kanchi temple walk"],
    bestTimeToVisit: "November–February",
    sources: ["Kamakshi Amman temple, Kanchipuram"],
  }),
  peetha({
    id: 11,
    slug: "kanyakumari",
    name: "Kanyakumari",
    sanskrit: "कन्याकुमारी",
    bodyPart: "Back / spine (in some lists)",
    bodyPartNote: "The virgin Goddess at the three-sea confluence; also a geographic cape.",
    location: "Kanyakumari",
    state: "Tamil Nadu",
    country: "India",
    lat: 8.088,
    lng: 77.538,
    deviName: "Bhagavathy / Kanyakumari",
    bhairavaName: "Not a famous independent Bhairava temple here",
    listStatus: "peetha-disputed",
    story: "Devi as the unmarried girl waiting at land’s end.",
    puranaStory: "Kanya-kshetra mahatmya. Body-part assignment is unstable across handbooks.",
    history:
      "A cape temple at the meeting of the Arabian Sea, Bay of Bengal, and Indian Ocean — that confluence is geography.",
    today:
      "Sunrise crowds and a small sanctum. Vivekananda Rock is a modern memorial, not the peetha.",
    significance: "The southern Devi pin of the peninsula.",
    rituals: ["Cape darshan", "Sunrise as tourism, not a required rite"],
    bestTimeToVisit: "October–March",
    sources: ["Kanyakumari Bhagavathy temple", "Cape Comorin geography"],
  }),
  peetha({
    id: 12,
    slug: "chamundeshwari",
    name: "Chamundeshwari",
    sanskrit: "चामुण्डेश्वरी",
    bodyPart: "Hair (in some Mysore tellings)",
    bodyPartNote: "Chamundi Hill is the Wodeyar state-goddess shrine; peetha status is regional.",
    location: "Chamundi Hills, Mysuru",
    state: "Karnataka",
    country: "India",
    lat: 12.273,
    lng: 76.671,
    deviName: "Chamundeshwari",
    bhairavaName: "Mahabala / hill Bhairava of local listing",
    listStatus: "peetha-disputed",
    story: "Devi slays Chanda and Munda; the hill Nandi is a separate sculpture.",
    puranaStory:
      "Devi Mahatmya’s Chamunda episode is the theological frame; the hill is Karnataka’s court-goddess seat.",
    history: "Wodeyar patronage. The ghat road and 1000-step path are the two approaches.",
    today: "A Mysuru evening drive. Dasara is the state festival, not a secret tantra.",
    significance: "Karnataka’s Chamunda hill.",
    rituals: ["Hill darshan", "Mysuru Dasara"],
    bestTimeToVisit: "October (Dasara) or winter weekdays",
    sources: ["Chamundeshwari temple, Mysuru"],
  }),
  peetha({
    id: 13,
    slug: "kolhapur-mahalakshmi",
    name: "Kolhapur Mahalakshmi",
    sanskrit: "कोल्हापुर महालक्ष्मी",
    bodyPart: "Eyes / three shaktis of the shrine (Ambabai)",
    bodyPartNote:
      "Karvir / Kolhapur is a major Maharashtra Shakta kshetra, often in 18-peetha lists.",
    location: "Kolhapur",
    state: "Maharashtra",
    country: "India",
    lat: 16.691,
    lng: 74.224,
    deviName: "Mahalakshmi / Ambabai",
    bhairavaName: "Kshetra pairing in local lists",
    listStatus: "peetha-common",
    story: "Ambabai of Karvir; the image faces west, which priests explain in local katha.",
    puranaStory:
      "Karvir mahatmya. Lakshmi here is the fierce-and-royal Kolhapur form, not only household Lakshmi.",
    history: "Chalukya-to-Maratha city temple in western Maharashtra.",
    today:
      "A busy Ambabai queue. Kirnotsav (sun on the murti) is a calendrical event, not a miracle you must photograph.",
    significance: "Maharashtra’s Mahalakshmi peetha.",
    rituals: ["Ambabai darshan", "Kirnotsav when announced"],
    bestTimeToVisit: "October–February",
    sources: ["Mahalakshmi temple, Kolhapur"],
  }),
  peetha({
    id: 14,
    slug: "tuljapur",
    name: "Tulja Bhavani",
    sanskrit: "तुळजा भवानी",
    bodyPart: "Not stably assigned",
    bodyPartNote: "Kuldevi of many Maratha families; Bhavani of Tuljapur. Peetha tables vary.",
    location: "Tuljapur, Dharashiv",
    state: "Maharashtra",
    country: "India",
    lat: 18.011,
    lng: 76.07,
    deviName: "Bhavani",
    bhairavaName: "Local kshetra pairing",
    listStatus: "peetha-disputed",
    story: "Bhavani remembered in Maratha memory with the sword gift motif — tradition, not a dated inventory.",
    puranaStory:
      "Bhavani mahatmya of Tuljapur. Shivaji’s sword-legend is regional history mixed with bhakti, not a Purana verse.",
    history: "A Yadava-to-Maratha hill shrine in the Deccan.",
    today:
      "A Maharashtra kuldevi yatra. Pair with Kolhapur and Saptashrungi only as a road story, not as one peetha.",
    significance: "Tuljapur Bhavani.",
    rituals: ["Bhavani darshan", "Navratri"],
    bestTimeToVisit: "October–March",
    sources: ["Tulja Bhavani temple, Tuljapur"],
  }),
  peetha({
    id: 15,
    slug: "ambaji",
    name: "Ambaji",
    sanskrit: "अंबाजी",
    bodyPart: "Heart (in Gujarat lists)",
    bodyPartNote: "Gabbar / Arasur hill; no anthropomorphic murti in the inner shrine — a yantra.",
    location: "Ambaji, Banaskantha",
    state: "Gujarat",
    country: "India",
    lat: 24.33,
    lng: 72.85,
    deviName: "Amba",
    bhairavaName: "Listed in Gujarat peetha booklets",
    listStatus: "peetha-common",
    story: "Amba of Gabbar; the original hill and the town temple are a pair.",
    puranaStory: "Arasur mahatmya. Heart-assignment is a Gujarat handbook reading.",
    history: "A north-Gujarat Shakta centre on the Rajasthan border.",
    today:
      "A large Gujarati yatra town. Climb Gabbar for the older hill spot; the market temple is easier.",
    significance: "Gujarat’s Ambaji pin.",
    rituals: ["Yantra darshan", "Gabbar climb", "Bhadarvi Purnima fair"],
    bestTimeToVisit: "Winter; Bhadarvi Purnima is extreme crowding",
    sources: ["Ambaji temple, Banaskantha"],
  }),
  peetha({
    id: 16,
    slug: "saptashrungi",
    name: "Saptashrungi",
    sanskrit: "सप्तशृङ्गी",
    bodyPart: "Not stably assigned",
    bodyPartNote: "Eighteen-armed Devi in the cliff; Vani, Nashik district.",
    location: "Vani, Nashik district",
    state: "Maharashtra",
    country: "India",
    lat: 20.391,
    lng: 73.908,
    deviName: "Saptashrungi Nivasini",
    bhairavaName: "Local listing",
    listStatus: "peetha-disputed",
    story: "The Goddess of seven peaks; a cliff-cut image.",
    puranaStory:
      "Devi Mahatmya is recited here as the hill’s book; that does not make the cliff a dated battlefield.",
    history: "A Nashik-district cliff temple with a later staircase and lift.",
    today:
      "Combine with Trimbakeshwar only as two Nashik-district yatras — one Shakta, one Shaiva.",
    significance: "The seven-peaked Devi of northwest Maharashtra.",
    rituals: ["Cliff darshan", "Navratri"],
    bestTimeToVisit: "October–February",
    sources: ["Saptashrungi temple, Vani"],
  }),
  peetha({
    id: 17,
    slug: "naina-devi",
    name: "Naina Devi",
    sanskrit: "नैना देवी",
    bodyPart: "Eyes",
    bodyPartNote: "Shares the ‘eyes’ claim with Tarapith; both pins stay on the map.",
    location: "Naina Devi, Bilaspur",
    state: "Himachal Pradesh",
    country: "India",
    lat: 31.386,
    lng: 76.536,
    deviName: "Naina Devi",
    bhairavaName: "Handbook pairing",
    listStatus: "peetha-disputed",
    story:
      "Hilltop Naina Devi above Gobind Sagar — a Himachal peetha pin that shares the ‘eyes’ claim with Tarapith.",
    puranaStory:
      "Himalayan peetha lists place Sati’s eyes here. Tarapith in Bengal makes the same claim; Hind AI keeps both pins and marks the dispute.",
    history:
      "A Bilaspur-district hill shrine. The reservoir view is modern Bhakra-Nangal geography, not Purāṇic landscape.",
    today:
      "Ropeway and steps from the plains side. Navratri fills the Himachal queue; weekdays are quieter.",
    significance: "One of two living ‘eye’ claims.",
    rituals: ["Hill darshan", "Navratri"],
    bestTimeToVisit: "March–April and September–October",
    sources: ["Naina Devi temple, Himachal Pradesh"],
  }),
  peetha({
    id: 18,
    slug: "chintpurni",
    name: "Chintpurni",
    sanskrit: "चिंतपूर्णी",
    bodyPart: "Feet (in many 51-lists)",
    bodyPartNote: "Una district; a Himachal Shakta yatra with peetha-table support.",
    location: "Chintpurni, Una",
    state: "Himachal Pradesh",
    country: "India",
    lat: 31.809,
    lng: 76.053,
    deviName: "Chinnamasta / Chintpurni in local speech",
    bhairavaName: "Handbook pairing",
    listStatus: "peetha-common",
    story: "The Goddess who ends worry — a folk etymology on a real hill temple.",
    puranaStory:
      "Feet of Sati in printed 51-lists. Chinnamasta theology is tantric overlay, not a tourist slogan.",
    history: "A Shivalik-range Devi temple of Himachal.",
    today: "A busy Una-district yatra. Pair with Jwalamukhi as a Himachal circuit.",
    significance: "Himachal feet-peetha of the common tables.",
    rituals: ["Chunri", "Navratri"],
    bestTimeToVisit: "Navratri or winter weekdays",
    sources: ["Chintpurni temple, Una"],
  }),
  peetha({
    id: 19,
    slug: "bajreshwari",
    name: "Kangra Bajreshwari",
    sanskrit: "बज्रेश्वरी",
    bodyPart: "Left breast (in some tables)",
    bodyPartNote: "Nagarkot / Kangra’s Vajreshwari; rebuilt after earthquake and invasion.",
    location: "Kangra",
    state: "Himachal Pradesh",
    country: "India",
    lat: 32.101,
    lng: 76.269,
    deviName: "Bajreshwari / Vajreshwari",
    bhairavaName: "Handbook pairing",
    listStatus: "peetha-disputed",
    story:
      "Vajra-bearing Devi of old Kangra town — Nagarkot’s Vajreshwari, rebuilt after war and earthquake.",
    puranaStory:
      "Some 51-lists assign a breast here. The assignment is not unique across printed tables; treat it as handbook data.",
    history:
      "Destroyed and rebuilt more than once, including after the 1905 Kangra earthquake. The fort and the Devi temple are separate monuments.",
    today:
      "A town temple below the fort ridge. Do the fort and the Devi as two visits; crowds peak in Navratri.",
    significance: "Kangra’s Vajreshwari.",
    rituals: ["Town darshan", "Navratri"],
    bestTimeToVisit: "October–March",
    sources: ["Bajreshwari temple, Kangra"],
  }),
  peetha({
    id: 20,
    slug: "vindhyavasini",
    name: "Vindhyavasini",
    sanskrit: "विन्ध्यावासिनी",
    bodyPart: "Not stably assigned",
    bodyPartNote: "Vindhyachal, Mirzapur; a major Ganga-plain Devi yatra.",
    location: "Vindhyachal, Mirzapur",
    state: "Uttar Pradesh",
    country: "India",
    lat: 25.165,
    lng: 82.577,
    deviName: "Vindhyavasini",
    bhairavaName: "Kali-khoh and Ashtabhuja as sister shrines of the same kshetra",
    listStatus: "peetha-disputed",
    story: "Devi dwelling in the Vindhyas; three shrines form a local circuit.",
    puranaStory: "Vindhya mahatmya. Body-part tables do not agree.",
    history: "A Mirzapur-district kshetra on the Ganga side of the Vindhyan edge.",
    today: "Navratri is a mela. The three-temple auto circuit is how most visitors actually move.",
    significance: "The Vindhya Devi pin of the Ganga plain.",
    rituals: ["Vindhyavasini, Kali Khoh, Ashtabhuja", "Navratri"],
    bestTimeToVisit: "Navratri or winter",
    sources: ["Vindhyavasini temple, Mirzapur"],
  }),
  peetha({
    id: 21,
    slug: "sharada-peeth",
    name: "Sharada Peeth",
    sanskrit: "शारदा पीठ",
    bodyPart: "Right hand (in some lists)",
    bodyPartNote:
      "Ruined temple-university in the Neelum valley. Not the same as Sringeri Sharada.",
    location: "Sharda, Neelum Valley",
    state: "Pakistan-administered Kashmir",
    country: "Pakistan",
    lat: 34.792,
    lng: 74.191,
    deviName: "Sharada",
    bhairavaName: "Not a functioning paired shrine today",
    listStatus: "peetha-common",
    story: "Sharada as learning; the stone ruins are what remains.",
    puranaStory: "Kashmir Sharada mahatmya and peetha tables.",
    history:
      "A historic centre of learning. The standing ruin is in Pakistan-administered Kashmir. Regular pilgrimage from India is generally not possible.",
    today:
      "Do not print a weekend-yatra timing. Sringeri in Karnataka is a living Advaita matha of Sharada, a different place.",
    significance: "The Kashmir Sharada pin — ruin plus memory.",
    rituals: ["Not a functioning daily temple in the ordinary Indian yatra sense"],
    bestTimeToVisit: "Not a practical Indian weekend yatra",
    sources: ["Sharada Peeth, Neelum / Sharda", "Distinction from Sringeri"],
  }),
  peetha({
    id: 22,
    slug: "vaishno-devi",
    name: "Vaishno Devi",
    sanskrit: "वैष्णो देवी",
    bodyPart: "Not assigned in this catalog",
    bodyPartNote:
      "A major living Devi yatra. Classical 51-peetha tables do not securely place Sati’s head here; older pages that said so were wrong.",
    location: "Trikuta, Katra",
    state: "Jammu and Kashmir",
    country: "India",
    lat: 33.029,
    lng: 74.949,
    deviName: "Vaishno Devi (three pindis)",
    bhairavaName:
      "Bhairavnath temple on the return path — a related shrine, not proof of a peetha verse",
    listStatus: "major-yatra",
    story: "Three rock pindis in a cave, read as Maha Kali, Maha Lakshmi, and Maha Saraswati.",
    puranaStory:
      "The Bhairavnath-and-Vaishno folk katha is local. It is not the Daksha-yajna list that names Kamakhya or Hinglaj.",
    history:
      "A Jammu hill yatra administered as a large modern pilgrimage (board, helicopter, track).",
    today:
      "A 12–13 km walk from Katra, or a helicopter. Peak Navratri needs planning. This page will not call it ‘Sati’s head’ to make the map tidier.",
    significance: "One of India’s busiest Devi yatras — listed honestly as a yatra.",
    rituals: ["Cave pindi darshan", "Bhairavnath on the loop as custom"],
    bestTimeToVisit: "March–April and September–November, avoiding peak storm days",
    sources: [
      "Vaishno Devi shrine board, Katra",
      "Classical peetha lists (non-inclusion of this cave as Sati’s head)",
    ],
    image: "/devi/peethas/vaishno-devi.png",
  }),
  peetha({
    id: 23,
    slug: "mansa-devi-panchkula",
    name: "Mansa Devi, Panchkula",
    sanskrit: "मनसा देवी",
    bodyPart: "Not a peetha body-part in this catalog",
    bodyPartNote:
      "A Shivalik wish-fulfilling Devi temple. ‘Sati’s mind fell here’ is not a secure Puranic line.",
    location: "Panchkula",
    state: "Haryana",
    country: "India",
    lat: 30.694,
    lng: 76.86,
    deviName: "Mansa Devi",
    bhairavaName: "Not used as a peetha pair here",
    listStatus: "major-yatra",
    story: "Hill Devi above Panchkula; ropeway from the plains.",
    puranaStory:
      "Mansa as wish (manasa) is folk etymology. Bengal’s serpent-goddess Mansa is a different cult.",
    history: "A modern-access Shivalik temple serving Chandigarh-region pilgrims.",
    today:
      "Navratri ropeway queues. Not interchangeable with Himachal peethas just because it is nearby.",
    significance: "Regional Devi yatra, not counted toward the 51 in this app.",
    rituals: ["Ropeway darshan", "Navratri"],
    bestTimeToVisit: "Navratri or winter weekdays",
    sources: ["Mansa Devi temple, Panchkula"],
  }),
];

export function listShaktiPeethaSlugs(): string[] {
  return SHAKTI_PEETHAS.map((item) => item.slug);
}

export function getShaktiPeethaById(id: number): ShaktiPeetha | undefined {
  return SHAKTI_PEETHAS.find((item) => item.id === id);
}

export function getShaktiPeethaBySlug(slug: string): ShaktiPeetha | undefined {
  return SHAKTI_PEETHAS.find((item) => item.slug === slug);
}

export function getShaktiPeethaByName(name: string): ShaktiPeetha | undefined {
  const needle = name.toLowerCase();
  return SHAKTI_PEETHAS.find(
    (item) => item.name.toLowerCase() === needle || item.sanskrit === name || item.slug === needle
  );
}

export function getShaktiPeethasByCountry(country: string): ShaktiPeetha[] {
  return SHAKTI_PEETHAS.filter((item) => item.country.toLowerCase() === country.toLowerCase());
}

export function getShaktiPeethasByState(state: string): ShaktiPeetha[] {
  return SHAKTI_PEETHAS.filter((item) => item.state.toLowerCase() === state.toLowerCase());
}

export function searchShaktiPeethas(query: string): ShaktiPeetha[] {
  const lowerQuery = query.toLowerCase();
  return SHAKTI_PEETHAS.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.sanskrit.includes(lowerQuery) ||
      item.location.toLowerCase().includes(lowerQuery) ||
      item.state.toLowerCase().includes(lowerQuery) ||
      item.country.toLowerCase().includes(lowerQuery) ||
      item.bodyPart.toLowerCase().includes(lowerQuery) ||
      item.deviName.toLowerCase().includes(lowerQuery) ||
      item.slug.includes(lowerQuery)
  );
}
