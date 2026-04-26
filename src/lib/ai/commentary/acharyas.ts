// Acharya Profiles for Commentary-Aware AI
// Different philosophical perspectives on Vedanta

import { AcharyaProfile, AcharyaPerspective } from "./types";

export const ACHARYA_PROFILES: Record<AcharyaPerspective, AcharyaProfile> = {
  shankara: {
    id: "shankara",
    name: "Adi Shankaracharya",
    sanskrit: "आदि शंकराचार्य",
    school: "Advaita Vedanta",
    period: "788–820 CE",
    keyTeachings: [
      "Brahman is the only reality (Sat-Chit-Ananda)",
      "The world is Maya (illusion)",
      "Jiva (individual soul) is identical to Brahman",
      "Liberation is realizing this non-dual identity",
      "Neti-Neti (not this, not that) - negation of all attributes",
    ],
    famousWorks: [
      "Brahma Sutra Bhashya",
      "Bhagavad Gita Bhashya",
      "Vivekachudamani",
      "Atma Bodha",
      "Aparokshanubhuti",
    ],
    corePhilosophy:
      "Advaita (Non-dualism) - The individual soul (Jiva) and the Supreme Reality (Brahman) are identical. The world appears as Brahman due to Maya (illusion). Liberation (Moksha) is the realization of this identity through knowledge (Jnana).",
  },
  ramanuja: {
    id: "ramanuja",
    name: "Ramanujacharya",
    sanskrit: "रामानुजाचार्य",
    school: "Vishishtadvaita Vedanta",
    period: "1017–1137 CE",
    keyTeachings: [
      "Brahman has qualities (Saguna Brahman)",
      "Jiva is part of Brahman but distinct (qualified non-dualism)",
      "The world is real transformation of Brahman",
      "Devotion (Bhakti) is the primary path to liberation",
      "Complete surrender to Vishnu (Prapatti)",
    ],
    famousWorks: [
      "Sri Bhashya (Brahma Sutra commentary)",
      "Bhagavad Gita Bhashya",
      "Vedanta Sangraha",
      "Vedanta Deepa",
      "Gita Bhashya",
    ],
    corePhilosophy:
      "Vishishtadvaita (Qualified Non-dualism) - Brahman is the Supreme Reality with infinite qualities. Jivas and the world are real modes of Brahman, distinct yet dependent. Liberation is attained through loving devotion (Bhakti) to Vishnu.",
  },
  madhva: {
    id: "madhva",
    name: "Madhvacharya",
    sanskrit: "माध्वाचार्य",
    school: "Dvaita Vedanta",
    period: "1238–1317 CE",
    keyTeachings: [
      "Brahman and Jiva are eternally distinct (dualism)",
      "Vishnu is Supreme, independent reality",
      "Jivas are servants of Vishnu (Dasa-bhava)",
      "The world is real creation of Vishnu",
      "Bhakti is the only path to liberation",
    ],
    famousWorks: [
      "Brahma Sutra Bhashya",
      "Bhagavad Gita Bhashya",
      "Anu-Vyakhyana",
      "Tattva Viveka",
      "Mayavada Khandana",
    ],
    corePhilosophy:
      "Dvaita (Dualism) - Brahman (Vishnu) and Jivas are eternally distinct. Vishnu is the independent Supreme Reality, while Jivas are dependent servants. Liberation is eternal service to Vishnu in Vaikuntha.",
  },
  vallabha: {
    id: "vallabha",
    name: "Vallabhacharya",
    sanskrit: "वल्लभाचार्य",
    school: "Shuddhadvaita Vedanta",
    period: "1479–1531 CE",
    keyTeachings: [
      "Brahman is pure non-dual (Shuddhadvaita)",
      "The world is real manifestation of Krishna's play (Lila)",
      "Jiva is a part of Krishna (Ansh)",
      "Loving devotion (Pushti Bhakti) is the path",
      "Grace (Prasad) is essential for liberation",
    ],
    famousWorks: [
      "Shodasha Granth",
      "Siddhanta Muktavali",
      "Tattva Dipika",
      "Bhagavata Purana Subodhini",
    ],
    corePhilosophy:
      "Shuddhadvaita (Pure Non-dualism) - Brahman is Krishna alone, pure and complete. The world is His divine play. Jivas are parts of Krishna. Liberation is attained through loving devotion (Pushti Bhakti) and divine grace.",
  },
  nimbarka: {
    id: "nimbarka",
    name: "Nimbarkacharya",
    sanskrit: "निम्बार्काचार्य",
    school: "Dvaitadvaita Vedanta",
    period: "12th century CE",
    keyTeachings: [
      "Brahman and Jiva are simultaneously one and different",
      "Radha-Krishna are the Supreme Divine Couple",
      "The world is real transformation of Brahman",
      "Devotion (Bhakti) combined with knowledge (Jnana)",
      "Simultaneous identity and difference (Bhedabheda)",
    ],
    famousWorks: ["Vedanta Parijata Saurabha", "Brahma Sutra Bhashya", "Dashashloki"],
    corePhilosophy:
      "Dvaitadvaita (Dualism-Non-dualism) - Brahman and Jiva are simultaneously one and different (Bhedabheda). Radha-Krishna are the Supreme Divine Couple. Liberation is through devotion and knowledge.",
  },
  chaitanya: {
    id: "chaitanya",
    name: "Chaitanya Mahaprabhu",
    sanskrit: "चैतन्य महाप्रभु",
    school: "Achintya Bhedabheda Vedanta",
    period: "1486–1534 CE",
    keyTeachings: [
      "Inconceivable difference and non-difference (Achintya Bhedabheda)",
      "Radha and Krishna are one in two forms",
      "Sankirtana (congregational chanting) is the primary practice",
      "Hare Krishna Maha Mantra",
      "Divine love (Prema) is the goal",
    ],
    famousWorks: ["Sikshastakam", "Chaitanya Charitamrita", "Chaitanya Bhagavata"],
    corePhilosophy:
      "Achintya Bhedabheda (Inconceivable Difference-Non-difference) - Radha and Krishna are simultaneously one and different in an inconceivable way. The soul is eternally related to Krishna. Liberation is divine love (Prema) through chanting (Sankirtana).",
  },
  general: {
    id: "general",
    name: "General Vedanta",
    sanskrit: "सामान्य वेदान्त",
    school: "Synthesis",
    period: "Ancient to Modern",
    keyTeachings: [
      "Brahman is the ultimate reality",
      "The goal is liberation (Moksha)",
      "Multiple paths: Jnana, Bhakti, Karma, Yoga",
      "Scriptures are the authority (Shruti, Smriti)",
      "Guru guidance is essential",
    ],
    famousWorks: ["Upanishads", "Bhagavad Gita", "Brahma Sutras", "Puranas", "Epics"],
    corePhilosophy:
      "Synthesis of Vedantic teachings - Combining insights from various schools while maintaining respect for traditional interpretations. Focuses on practical application of spiritual principles.",
  },
};

export function getAcharyaProfile(perspective: AcharyaPerspective): AcharyaProfile {
  return ACHARYA_PROFILES[perspective];
}

export function getAllAcharyas(): AcharyaProfile[] {
  return Object.values(ACHARYA_PROFILES);
}
