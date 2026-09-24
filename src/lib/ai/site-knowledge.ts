import { KATHA_GRANTHAS } from "@/lib/data/katha-grantha";
import { scriptureCatalog } from "@/lib/scripture-catalog";

export type SitePageKind = "recitation" | "katha" | "book" | "scripture" | "place" | "practice";

export interface SitePage {
  id: string;
  title: string;
  titleSa: string;
  href: string;
  kind: SitePageKind;
  snippet: string;
  aliases: string[];
}

export interface SiteRetrieval {
  intent: "open" | "ask";
  query: string;
  hits: SitePage[];
  best: SitePage | null;
  shouldOpen: boolean;
  onSite: boolean;
}

const QUESTION =
  /\b(what|why|how|when|where|who|explain|meaning|mean|compare|difference|teach|understand)\b/;

const OPEN_LEAD =
  /^(?:please )?(?:open|show me|show|go to|take me to|take me|read|recite|start|launch) /;

const TYPO_REPLACEMENTS: Array<[string, string]> = [
  ["chanuman", "hanuman"],
  ["hanumaan", "hanuman"],
  ["hanuman chalisaa", "hanuman chalisa"],
  ["shivpuran", "shiva purana"],
  ["shiv puran", "shiva purana"],
  ["shivpurana", "shiva purana"],
  ["shiv purana", "shiva purana"],
  ["anukadhara", "kanakadhara"],
  ["anukadhar", "kanakadhara"],
  ["kanakadhara stotram", "kanakadhara"],
  ["sultan gopal", "santana gopala"],
  ["santan gopal", "santana gopala"],
  ["atharva shirsha", "atharvashirsha"],
  ["atharvashirsham", "atharvashirsha"],
  ["chandi path", "durga saptashati path"],
  ["durga path", "durga saptashati path"],
];

const LIBRARY_PAGES: SitePage[] = [
  page("recite", "Recitations", "पाठ", "/recite", "recitation", "Full hymns for difficult days.", [
    "recite",
    "mantra",
    "stotra",
    "hymns",
  ]),
  page(
    "hanuman-chalisa",
    "Hanuman Chalisa",
    "हनुमान चालीसा",
    "/recite/hanuman-chalisa",
    "recitation",
    "Tulsidas’s forty chaupais, opening dohas, and closing doha.",
    ["hanuman", "chalisa", "bajrang", "hanuman chalisa"]
  ),
  page(
    "vishnu-sahasranama",
    "Vishnu Sahasranama",
    "विष्णुसहस्रनाम",
    "/recite/vishnu-sahasranama",
    "recitation",
    "The thousand names of Vishnu from the Mahabharata.",
    ["vishnu sahasranama", "vishnu sahasranamam", "thousand names of vishnu"]
  ),
  page(
    "kanakadhara",
    "Kanakadhara Stotram",
    "कनकधारास्तोत्रम्",
    "/recite/kanakadhara-stotram",
    "recitation",
    "Shankaracharya’s hymn to Lakshmi.",
    ["kanakadhara", "kanaka dhara", "anukadhara stotram"]
  ),
  page(
    "shiva-shatakam",
    "Shiva Shatakam",
    "शिवशतकम्",
    "/recite/shiva-shatakam",
    "recitation",
    "The Shiva Shatakam beginning with Shivam Gaurishlishtam.",
    ["shiva shatakam", "shiv shatakam", "shataka"]
  ),
  page(
    "kalabhairava",
    "Kala Bhairava Ashtakam",
    "कालभैरवाष्टकम्",
    "/recite/kalabhairava-ashtakam",
    "recitation",
    "Eight verses to Kala Bhairava.",
    ["kala bhairava", "kalabhairav", "bhairava ashtakam", "bhairav ashtak"]
  ),
  page(
    "atharvashirsha",
    "Ganapati Atharvashirsha",
    "गणपत्यथर्वशीर्षम्",
    "/recite/ganapati-atharvashirsha",
    "recitation",
    "The Ganapati Upanishad from the Dagdusheth booklet.",
    ["atharvashirsha", "ganapati atharvashirsha", "ganesh atharvashirsha"]
  ),
  page(
    "santana-gopala",
    "Santana Gopala",
    "सन्तानगोपाल",
    "/recite/santana-gopala",
    "recitation",
    "The Santana Gopala mantra and stotra.",
    ["santana gopala", "santan gopal", "sultan gopal mantra"]
  ),
  page(
    "durga-path",
    "Durga Saptashati path",
    "दुर्गासप्तशती",
    "/recite/durga-saptashati",
    "recitation",
    "The Chandi path: kavacha, argala, kilaka, and thirteen adhyayas.",
    ["durga saptashati path", "chandi path", "devi mahatmya path", "durga path"]
  ),
  page(
    "aditya",
    "Aditya Hridayam",
    "आदित्यहृदयम्",
    "/recite/aditya-hridayam",
    "recitation",
    "The hymn to the sun taught to Rama.",
    ["aditya hridayam", "aditya hrudayam", "surya hridayam"]
  ),
  page(
    "katha",
    "Katha",
    "कथा",
    "/katha",
    "katha",
    "Story library for Mahadeva, Devi, Vishnu, and Ganesha.",
    ["katha", "stories", "katha grantha"]
  ),
  page(
    "durga-katha",
    "Durga Saptashati katha",
    "दुर्गा सप्तशती कथा",
    "/durga-saptashati",
    "katha",
    "Story guide for the Devi Mahatmya. The Sanskrit path is a separate recitation page.",
    ["durga katha", "chandi katha", "devi mahatmya story"]
  ),
  page(
    "satyanarayan-katha",
    "Satyanarayan Vrat Katha",
    "श्री सत्यनारायण व्रतकथा",
    "/satyanarayan-puja",
    "katha",
    "Five full chapters in the supplied Marathi, Hindi and English editions, a separate Sanskrit reading, printed page views and chapter explanations.",
    [
      "satyanarayan",
      "satyanarayan katha",
      "satyanarayana katha",
      "satyanarayan vrat katha",
      "सत्यनारायण कथा",
      "सत्यनारायण व्रतकथा",
    ]
  ),
  page(
    "shivlilamrit",
    "Shivlilamrit",
    "शिवलीलामृत",
    "/shivlilamrit/book",
    "book",
    "Shridhar’s Marathi ovi pothi.",
    ["shivlilamrit", "shiv lilamrit", "shridhar"]
  ),
  page("haripaat", "Haripaat", "हरिपाठ", "/haripaat/book", "book", "Daily Hari reading.", [
    "haripaat",
    "hari paath",
  ]),
  page("harivijay", "Harivijay", "हरिविजय", "/harivijay/book", "book", "Harivijay katha-sar.", [
    "harivijay",
  ]),
  page("ramvijay", "Ramvijay", "रामविजय", "/ramvijay/book", "book", "Ramvijay katha-sar.", [
    "ramvijay",
  ]),
  page("stotras", "Stotras", "स्तोत्र", "/stotras", "practice", "Hymns and sacred names.", [
    "stotras",
    "mantras",
  ]),
  page(
    "ganesh-aarti",
    "Ganesh Aarti Sangrah",
    "जय गणेश आरती",
    "/ganesh-aarti",
    "recitation",
    "Marathi aarti book from the Dagdusheth collection.",
    ["aarti", "ganesh aarti", "sukhakarta"]
  ),
  page(
    "sukhakarta",
    "Sukhakarta Dukhaharta",
    "सुखकर्ता दुःखहर्ता",
    "/ganesh-aarti/sukhakarta-dukhaharta",
    "recitation",
    "The household Ganpati aarti.",
    ["sukhakarta dukhaharta", "ganpati aarti"]
  ),
  page(
    "mahadev",
    "Mahadeva",
    "महादेव",
    "/mahadev",
    "place",
    "Shiva temples and the twelve Jyotirlingas.",
    ["mahadev", "jyotirlinga", "shiva temples"]
  ),
  page("devi", "Devi", "देवी", "/devi", "place", "Shakti peethas.", ["devi", "shakti peetha"]),
  page("vishnu-tirtha", "Vishnu tirtha", "विष्णु", "/vishnu", "place", "Char Dham.", [
    "char dham",
    "vishnu temples",
  ]),
  page("ganesha", "Ganesha", "गणेश", "/ganesha", "place", "Ashtavinayak circuit.", [
    "ashtavinayak",
    "ganesha temples",
  ]),
  page("festivals", "Festivals", "उत्सव", "/festivals", "practice", "Festival calendar.", [
    "festivals",
    "utsav",
  ]),
  page("panchanga", "Panchanga", "पञ्चाङ्ग", "/panchanga", "practice", "The day’s calendar.", [
    "panchanga",
    "panchang",
  ]),
  page(
    "ai-guide",
    "Guru AI",
    "गुरु एआई",
    "/ai-guide",
    "practice",
    "Ask Gemma 4 about the library.",
    ["guru ai", "chatbot"]
  ),
];

function page(
  id: string,
  title: string,
  titleSa: string,
  href: string,
  kind: SitePageKind,
  snippet: string,
  aliases: string[]
): SitePage {
  return { id, title, titleSa, href, kind, snippet, aliases };
}

function catalogPages(): SitePage[] {
  return scriptureCatalog.map((item) =>
    page(item.slug, item.name, item.sanskrit, item.href, "scripture", item.description, [
      item.slug.replace(/-/g, " "),
      item.name,
      item.sanskrit,
      ...(item.keyConcepts ?? []),
    ])
  );
}

function kathaPages(): SitePage[] {
  return KATHA_GRANTHAS.map((item) =>
    page(
      `katha-${item.slug}`,
      item.title,
      item.sanskrit,
      `/katha/${item.slug}`,
      "katha",
      item.tagline,
      [item.title, item.sanskrit, `${item.slug} katha`]
    )
  );
}

let cached: SitePage[] | null = null;

export function listSitePages(): SitePage[] {
  if (!cached) {
    const seen = new Set<string>();
    cached = [...LIBRARY_PAGES, ...kathaPages(), ...catalogPages()].filter((item) => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    });
  }
  return cached;
}

export function siteKindLabel(kind: SitePageKind): string {
  switch (kind) {
    case "recitation":
      return "Recitation";
    case "katha":
      return "Katha";
    case "book":
      return "Book";
    case "scripture":
      return "Scripture";
    case "place":
      return "Place";
    case "practice":
      return "Practice";
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

export function normalizeSiteQuery(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\u0900-\u097f\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function expandQuery(value: string): string {
  let next = normalizeSiteQuery(value);
  const replacements = [...TYPO_REPLACEMENTS].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of replacements) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next.replace(/\s+/g, " ").trim();
}

function fieldScore(field: string, query: string): number {
  const normalized = normalizeSiteQuery(field);
  if (!normalized || !query) return 0;
  if (normalized === query) return 100;
  if (query.length >= 4 && (normalized.includes(query) || query.includes(normalized))) {
    const coverage =
      Math.min(normalized.length, query.length) / Math.max(normalized.length, query.length);
    return Math.round(40 + coverage * 50);
  }
  const queryTokens = query.split(" ").filter((token) => token.length > 2);
  if (queryTokens.length === 0) return 0;
  const fieldTokens = new Set(normalized.split(" "));
  const hits = queryTokens.filter((token) => fieldTokens.has(token)).length;
  return Math.round((hits / queryTokens.length) * 55);
}

function scorePage(item: SitePage, query: string): number {
  const title = Math.max(fieldScore(item.title, query), fieldScore(item.titleSa, query));
  const alias = item.aliases.reduce((best, name) => Math.max(best, fieldScore(name, query)), 0);
  const snippet = Math.round(fieldScore(item.snippet, query) * 0.45);
  return Math.max(title, alias, snippet);
}

export function retrieveSitePages(raw: string): SiteRetrieval {
  const normalized = normalizeSiteQuery(raw);
  const open = OPEN_LEAD.test(normalized);
  const rest = open ? normalized.replace(OPEN_LEAD, "").trim() : normalized;
  const query = expandQuery(rest);
  const ranked = listSitePages()
    .map((item) => ({ item, score: scorePage(item, query) }))
    .filter((entry) => entry.score >= 40)
    .sort((a, b) => b.score - a.score);
  const hits = ranked.slice(0, 3).map((entry) => entry.item);
  const best = hits[0] ?? null;
  const second = ranked[1]?.score ?? 0;
  const clear = best !== null && ranked[0].score >= 70 && ranked[0].score - second >= 20;
  const asking = QUESTION.test(normalized);
  const shouldOpen = Boolean(best) && clear && (open || !asking);
  return {
    intent: open ? "open" : "ask",
    query,
    hits,
    best,
    shouldOpen,
    onSite: hits.length > 0,
  };
}

export function siteGroundingBlock(retrieval: SiteRetrieval): string {
  if (!retrieval.onSite) {
    return [
      "No Hind AI page matches this question.",
      "Answer as general study help. Do not invent Sanskrit verses or claim a page exists.",
      "Say that this topic is outside the Hind AI library.",
    ].join(" ");
  }
  const lines = retrieval.hits.map(
    (hit) => `${hit.title} (${siteKindLabel(hit.kind)}) at ${hit.href}: ${hit.snippet}`
  );
  return [
    "These Hind AI pages match the question. Prefer them. Give the path so the reader can open the page.",
    "Do not invent verses that are not described here.",
    ...lines,
  ].join("\n");
}
