import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calendar,
  Compass,
  Eye,
  Languages,
  Map,
  Sparkles,
  Sun,
  TimerReset,
  Trophy,
  Users,
} from "lucide-react";

export type SiteNavItem = {
  label: string;
  hint: string;
  href: string;
  icon: LucideIcon;
};

export type SiteNavGroup = {
  id: string;
  label: string;
  description: string;
  items: SiteNavItem[];
  /** Desktop flyout alignment */
  align: "left" | "center" | "right";
};

/**
 * Single source of truth for Header + Footer destinations.
 * Keep groups short and role-based so people know where to go.
 */
export const SITE_NAV_GROUPS: SiteNavGroup[] = [
  {
    id: "places",
    label: "Places",
    description: "Temples and tirtha maps by tradition",
    align: "left",
    items: [
      {
        label: "Tirtha map",
        hint: "All gods on one South Asia map",
        href: "/pilgrimage",
        icon: Map,
      },
      {
        label: "Mahadeva",
        hint: "Shiva and 12 Jyotirlingas",
        href: "/mahadev",
        icon: BookOpen,
      },
      {
        label: "Devi",
        hint: "Shakti peethas and honest yatras",
        href: "/devi",
        icon: BookOpen,
      },
      {
        label: "Vishnu",
        hint: "Four-corners Char Dham",
        href: "/vishnu",
        icon: BookOpen,
      },
      {
        label: "Ganesha",
        hint: "Ashtavinayak circuit",
        href: "/ganesha",
        icon: BookOpen,
      },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    description: "Daily rites, hymns, and reading books",
    align: "left",
    items: [
      {
        label: "Daily Sadhana",
        hint: "Japa mala and routines",
        href: "/sadhana",
        icon: TimerReset,
      },
      {
        label: "Stotras",
        hint: "Hymns and sacred names",
        href: "/stotras",
        icon: BookOpen,
      },
      {
        label: "Ganesh Aarti",
        hint: "Marathi aarti sangrah",
        href: "/ganesh-aarti",
        icon: BookOpen,
      },
      {
        label: "Shivlilamrit",
        hint: "Shravan pothi reader",
        href: "/shivlilamrit",
        icon: BookOpen,
      },
      {
        label: "Festivals",
        hint: "Utsav calendar — origin to temple do/don’t",
        href: "/festivals",
        icon: Calendar,
      },
      {
        label: "Katha",
        hint: "Book-depth god stories",
        href: "/katha",
        icon: BookOpen,
      },
      {
        label: "Panchanga",
        hint: "Today’s Hindu calendar",
        href: "/panchanga",
        icon: Calendar,
      },
      {
        label: "Daily",
        hint: "A short practice for today",
        href: "/daily",
        icon: Sun,
      },
    ],
  },
  {
    id: "ask-ai",
    label: "Ask AI",
    description: "Gemma 4 study helpers",
    align: "left",
    items: [
      {
        label: "Guru AI",
        hint: "Ask scripture questions",
        href: "/ai-guide",
        icon: Sparkles,
      },
      {
        label: "Vision",
        hint: "Read images with Gemma 4",
        href: "/vision",
        icon: Eye,
      },
      {
        label: "Dharma Guide",
        hint: "Rituals and festivals",
        href: "/dharma",
        icon: Compass,
      },
    ],
  },
  {
    id: "learn",
    label: "Learn",
    description: "Language, courses, and paths",
    align: "center",
    items: [
      {
        label: "Sanskrit Studio",
        hint: "Gemma 4 language lab",
        href: "/sanskrit-nova",
        icon: Languages,
      },
      {
        label: "Sanskrit Tools",
        hint: "Grammar and conversion",
        href: "/sanskrit-tools",
        icon: Languages,
      },
      {
        label: "Learning Hub",
        hint: "Courses and progress",
        href: "/learning",
        icon: BookOpen,
      },
      {
        label: "Study Paths",
        hint: "Guided reading plans",
        href: "/study-paths",
        icon: BookOpen,
      },
      {
        label: "Philosophies",
        hint: "Darshana schools",
        href: "/philosophies",
        icon: BookOpen,
      },
      {
        label: "Frameworks",
        hint: "Study maps",
        href: "/frameworks",
        icon: BookOpen,
      },
    ],
  },
  {
    id: "more",
    label: "More",
    description: "Guide, quiz, and about",
    align: "right",
    items: [
      {
        label: "Guide",
        hint: "How Hind AI works",
        href: "/guide",
        icon: Sparkles,
      },
      {
        label: "Audio",
        hint: "Listen and recite",
        href: "/audio",
        icon: BookOpen,
      },
      {
        label: "Quiz",
        hint: "Gemma 4 pariksha",
        href: "/quiz",
        icon: Trophy,
      },
      {
        label: "Community",
        hint: "Study with others",
        href: "/community",
        icon: Users,
      },
      {
        label: "Site map",
        hint: "Scripture structure",
        href: "/structure",
        icon: BookOpen,
      },
      {
        label: "Preface",
        hint: "About this work",
        href: "/preface",
        icon: Sparkles,
      },
    ],
  },
];

/** Compact destination cards for homepage / explore strips. */
export const EXPLORE_DESTINATIONS = [
  {
    label: "Library",
    href: "/contents",
    hint: "Vedas, epics, Puranas, and shelves",
  },
  {
    label: "Places",
    href: "/pilgrimage",
    hint: "Jyotirlingas, Devi, Vishnu, Ganesha",
  },
  {
    label: "Festivals",
    href: "/festivals",
    hint: "Year of utsav — stories, rites, etiquette",
  },
  {
    label: "Katha",
    href: "/katha",
    hint: "Deep god stories in book chapters",
  },
  {
    label: "Practice",
    href: "/sadhana",
    hint: "Sadhana, aarti, Shivlilamrit",
  },
  {
    label: "Ask AI",
    href: "/ai-guide",
    hint: "Guru AI with Gemma 4",
  },
  {
    label: "Learn",
    href: "/learning",
    hint: "Sanskrit and study paths",
  },
  {
    label: "Guide",
    href: "/guide",
    hint: "How the site fits together",
  },
] as const;

export function allSiteNavHrefs(): string[] {
  const hrefs = SITE_NAV_GROUPS.flatMap((group) => group.items.map((item) => item.href));
  hrefs.push("/contents", "/");
  return [...new Set(hrefs)];
}
