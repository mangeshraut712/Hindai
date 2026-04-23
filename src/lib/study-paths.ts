export type StudyPathStep = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type StudyPath = {
  id: string;
  audience: "student" | "teacher";
  title: string;
  summary: string;
  goal: string;
  duration: string;
  steps: StudyPathStep[];
};

export const studyPaths: StudyPath[] = [
  {
    id: "student-foundations",
    audience: "student",
    title: "Student Foundations",
    summary: "A beginner-friendly route into Shruti, Smriti, and the Bhagavad Gita.",
    goal: "Build a clear mental map of Hindu scripture and learn how to ask grounded questions.",
    duration: "45–60 min",
    steps: [
      {
        id: "student-structure",
        title: "Start with the structure",
        description: "Understand Shruti, Smriti, Vedas, Upanishads, Puranas, and Itihasa.",
        href: "/structure/",
      },
      {
        id: "student-gita",
        title: "Read one foundational verse",
        description: "Use Bhagavad Gita 2.47 as an entry point into Karma Yoga.",
        href: "/bhagavad-gita/#bg-2-47",
      },
      {
        id: "student-ai",
        title: "Ask Guru AI for a recap",
        description: "Summarize the verse in plain English and extract key terms.",
        href: "/ai-guide/?prompt=Summarize%20Bhagavad%20Gita%202.47%20for%20a%20beginner&audience=student",
      },
    ],
  },
  {
    id: "teacher-compare",
    audience: "teacher",
    title: "Teacher Compare Path",
    summary: "A compare-texts route built for classroom framing and discussion prompts.",
    goal: "Use Gemma 4 to contrast texts, identify shared concepts, and generate guided questions.",
    duration: "30–45 min",
    steps: [
      {
        id: "teacher-library",
        title: "Choose the shelves",
        description: "Review the catalog before selecting texts for comparison.",
        href: "/contents/",
      },
      {
        id: "teacher-compare-ai",
        title: "Run compare mode in Guru AI",
        description: "Compare Bhagavad Gita and Yoga Sutras on discipline and inner steadiness.",
        href: "/ai-guide/?mode=compare&compare=bhagavad-gita,yoga-sutras&prompt=Compare%20Bhagavad%20Gita%20and%20Yoga%20Sutras%20on%20discipline%2C%20attention%2C%20and%20inner%20steadiness&audience=teacher",
      },
      {
        id: "teacher-rigveda",
        title: "Add a broader civilizational text",
        description: "Use Rigveda as a contrastive shelf for poetry, invocation, and cosmology.",
        href: "/rigveda/",
      },
    ],
  },
  {
    id: "seeker-devotion",
    audience: "student",
    title: "Devotion and Narrative",
    summary: "A reading path through epics and Puranic devotional literature.",
    goal: "Move from narrative reading into reflective AI-guided interpretation.",
    duration: "45 min",
    steps: [
      {
        id: "seeker-ramayana",
        title: "Begin with the epic frame",
        description: "Open Ramayana as a story of exile, kingship, and devotion.",
        href: "/ramayana/",
      },
      {
        id: "seeker-bhagavatam",
        title: "Move into bhakti literature",
        description: "Read Srimad Bhagavatam through a devotional lens.",
        href: "/srimad-bhagavatam/",
      },
      {
        id: "seeker-ai",
        title: "Ask Guru AI to connect them",
        description: "Generate a reflective comparison on devotion across the two texts.",
        href: "/ai-guide/?mode=compare&compare=ramayana,srimad-bhagavatam&prompt=Compare%20devotion%20in%20the%20Ramayana%20and%20Srimad%20Bhagavatam&audience=student",
      },
    ],
  },
];
