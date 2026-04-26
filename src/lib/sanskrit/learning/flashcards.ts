// Sanskrit Learning Flashcards with Spaced Repetition

import { Flashcard } from "./types";

export const FLASHCARDS: Flashcard[] = [
  // Basic Vocabulary
  {
    id: "vocab-1",
    category: "vocabulary",
    sanskrit: "नमस्ते",
    transliteration: "namaste",
    meaning: "hello/greetings",
    example: "नमस्ते महाराज",
    difficulty: "easy",
  },
  {
    id: "vocab-2",
    category: "vocabulary",
    sanskrit: "धन्यवादः",
    transliteration: "dhanyavādaḥ",
    meaning: "thank you",
    example: "धन्यवादः गुरुदेव",
    difficulty: "easy",
  },
  {
    id: "vocab-3",
    category: "vocabulary",
    sanskrit: "पुस्तकम्",
    transliteration: "pustakam",
    meaning: "book",
    example: "अहम् पुस्तकम् पश्यामि",
    difficulty: "easy",
  },
  {
    id: "vocab-4",
    category: "vocabulary",
    sanskrit: "जलम्",
    transliteration: "jalám",
    meaning: "water",
    example: "जलम् पिबामि",
    difficulty: "easy",
  },
  {
    id: "vocab-5",
    category: "vocabulary",
    sanskrit: "अग्निः",
    transliteration: "agníḥ",
    meaning: "fire",
    example: "अग्निः तपति",
    difficulty: "easy",
  },

  // Grammar - Vibhakti
  {
    id: "grammar-1",
    category: "grammar",
    sanskrit: "रामः",
    transliteration: "rāmaḥ",
    meaning: "Rama (nominative singular)",
    example: "रामः गच्छति",
    difficulty: "medium",
  },
  {
    id: "grammar-2",
    category: "grammar",
    sanskrit: "रामम्",
    transliteration: "rāmam",
    meaning: "Rama (accusative singular)",
    example: "अहम् रामम् पश्यामि",
    difficulty: "medium",
  },
  {
    id: "grammar-3",
    category: "grammar",
    sanskrit: "रामेण",
    transliteration: "rāmeṇa",
    meaning: "by Rama (instrumental singular)",
    example: "रामेण कार्यं क्रियते",
    difficulty: "medium",
  },
  {
    id: "grammar-4",
    category: "grammar",
    sanskrit: "रामाय",
    transliteration: "rāmāya",
    meaning: "to/for Rama (dative singular)",
    example: "रामाय फलं ददामि",
    difficulty: "medium",
  },
  {
    id: "grammar-5",
    category: "grammar",
    sanskrit: "रामस्य",
    transliteration: "rāmasya",
    meaning: "of Rama (genitive singular)",
    example: "रामस्य गृहम्",
    difficulty: "medium",
  },

  // Sandhi Rules
  {
    id: "sandhi-1",
    category: "sandhi",
    sanskrit: "अ + अ = आ",
    transliteration: "a + a = ā",
    meaning: "Vowel sandhi: a + a becomes ā",
    example: "राम + अत्र = रामात्र",
    difficulty: "hard",
  },
  {
    id: "sandhi-2",
    category: "sandhi",
    sanskrit: "इ + इ = ई",
    transliteration: "i + i = ī",
    meaning: "Vowel sandhi: i + i becomes ī",
    example: "हिम + इन्दुः = हिमीन्दुः",
    difficulty: "hard",
  },
  {
    id: "sandhi-3",
    category: "sandhi",
    sanskrit: "अहम् + इदम् = अयमिदम्",
    transliteration: "aham + idam = ayamidam",
    meaning: "Consonant sandhi: m + i becomes y",
    example: "अहम् + इदम् = अयमिदम्",
    difficulty: "hard",
  },

  // Dhatu (Verb Roots)
  {
    id: "dhatu-1",
    category: "dhatu",
    sanskrit: "गम्",
    transliteration: "gam",
    meaning: "to go",
    example: "गच्छति (he goes)",
    difficulty: "medium",
  },
  {
    id: "dhatu-2",
    category: "dhatu",
    sanskrit: "पा",
    transliteration: "pā",
    meaning: "to drink",
    example: "पिबति (he drinks)",
    difficulty: "medium",
  },
  {
    id: "dhatu-3",
    category: "dhatu",
    sanskrit: "भू",
    transliteration: "bhū",
    meaning: "to be/exist",
    example: "भवति (he becomes)",
    difficulty: "medium",
  },
  {
    id: "dhatu-4",
    category: "dhatu",
    sanskrit: "दृश्",
    transliteration: "dṛś",
    meaning: "to see",
    example: "पश्यति (he sees)",
    difficulty: "medium",
  },
  {
    id: "dhatu-5",
    category: "dhatu",
    sanskrit: "श्रु",
    transliteration: "śru",
    meaning: "to hear",
    example: "शृणोति (he hears)",
    difficulty: "medium",
  },

  // Numbers
  {
    id: "number-1",
    category: "numbers",
    sanskrit: "एकम्",
    transliteration: "ekam",
    meaning: "one",
    example: "एकम् पुस्तकम्",
    difficulty: "easy",
  },
  {
    id: "number-2",
    category: "numbers",
    sanskrit: "द्वे",
    transliteration: "dve",
    meaning: "two",
    example: "द्वे पुस्तके",
    difficulty: "easy",
  },
  {
    id: "number-3",
    category: "numbers",
    sanskrit: "त्रीणि",
    transliteration: "trīṇi",
    meaning: "three",
    example: "त्रीणि पुस्तकानि",
    difficulty: "easy",
  },
  {
    id: "number-4",
    category: "numbers",
    sanskrit: "चत्वारि",
    transliteration: "catvāri",
    meaning: "four",
    example: "चत्वारि पुस्तकानि",
    difficulty: "medium",
  },
  {
    id: "number-5",
    category: "numbers",
    sanskrit: "पञ्च",
    transliteration: "pañca",
    meaning: "five",
    example: "पञ्च पुस्तकानि",
    difficulty: "medium",
  },
];

export function getFlashcardById(id: string): Flashcard | undefined {
  return FLASHCARDS.find((card) => card.id === id);
}

export function getFlashcardsByCategory(category: string): Flashcard[] {
  return FLASHCARDS.filter((card) => card.category === category);
}

export function getFlashcardsByDifficulty(difficulty: "easy" | "medium" | "hard"): Flashcard[] {
  return FLASHCARDS.filter((card) => card.difficulty === difficulty);
}

export function getRandomFlashcards(count: number): Flashcard[] {
  const shuffled = [...FLASHCARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function searchFlashcards(query: string): Flashcard[] {
  const lowerQuery = query.toLowerCase();
  return FLASHCARDS.filter(
    (card) =>
      card.sanskrit.includes(lowerQuery) ||
      card.transliteration.includes(lowerQuery) ||
      card.meaning.toLowerCase().includes(lowerQuery) ||
      (card.example && card.example.toLowerCase().includes(lowerQuery))
  );
}
