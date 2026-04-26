// Anvaya Analyzer - Converts Sanskrit verse to prose word order

import { AnvayaResult, WordOrder, GrammaticalRole } from "./types";
import { SandhiAnalyzer } from "../sandhi/analyzer";

export class AnvayaAnalyzer {
  /**
   * Analyze a Sanskrit verse and convert to prose word order (Anvaya)
   * This is a simplified implementation. For production use,
   * consider using a morphological analyzer or ML-based approach
   */
  static analyze(verse: string): AnvayaResult {
    // First, split the verse using sandhi analysis
    const sandhiResult = SandhiAnalyzer.analyze(verse);
    const words = sandhiResult.split;

    // Determine grammatical roles for each word
    const wordOrder = this.assignGrammaticalRoles(words);

    // Reorder words for prose (Anvaya)
    const anvaya = this.reorderForProse(wordOrder);

    // Generate explanation
    const explanation = this.generateExplanation(wordOrder);

    return {
      original: verse,
      anvaya,
      wordOrder,
      explanation,
      confidence: sandhiResult.confidence * 0.8, // Reduce confidence due to role assignment
    };
  }

  /**
   * Assign grammatical roles to words based on position and form
   */
  private static assignGrammaticalRoles(words: string[]): WordOrder[] {
    const wordOrder: WordOrder[] = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const role = this.detectGrammaticalRole(word, i, words.length);
      const meaning = this.getWordMeaning(word, role);

      wordOrder.push({
        word,
        position: i,
        grammaticalRole: role,
        meaning,
      });
    }

    return wordOrder;
  }

  /**
   * Detect grammatical role based on word form and position
   */
  private static detectGrammaticalRole(
    word: string,
    position: number,
    totalWords: number
  ): GrammaticalRole {
    const wordLower = word.toLowerCase();

    // Common verb endings
    if (wordLower.endsWith("ti") || wordLower.endsWith("nti") || wordLower.endsWith("te")) {
      return "Verb";
    }

    // Common subject markers (nominative case)
    if (wordLower.endsWith("ḥ") || wordLower.endsWith("āḥ") || wordLower.endsWith("s")) {
      if (position === 0 || position === totalWords - 2) {
        return "Subject";
      }
    }

    // Common object markers (accusative case)
    if (wordLower.endsWith("am") || wordLower.endsWith("ām") || wordLower.endsWith("au")) {
      return "Object";
    }

    // Common adjective markers
    if (wordLower.endsWith("a") || wordLower.endsWith("ā") || wordLower.endsWith("i")) {
      return "Adjective";
    }

    // Common adverb markers
    if (wordLower.startsWith("eva") || wordLower.startsWith("tu") || wordLower.startsWith("hi")) {
      return "Particle";
    }

    // Conjunctions
    if (wordLower === "ca" || wordLower === "vā" || wordLower === "atha") {
      return "Conjunction";
    }

    // Prepositions (upasargas)
    if (wordLower.startsWith("pra") || wordLower.startsWith("ni") || wordLower.startsWith("vi")) {
      return "Preposition";
    }

    // Default to unknown
    return "Unknown";
  }

  /**
   * Get meaning for a word based on its role
   */
  private static getWordMeaning(word: string, role: GrammaticalRole): string {
    const wordLower = word.toLowerCase();

    // Common words dictionary
    const commonWords: Record<string, string> = {
      // Pronouns
      aham: "I",
      tvam: "you",
      sah: "he",
      sā: "she",
      tat: "that",
      idam: "this",

      // Conjunctions
      ca: "and",
      vā: "or",
      atha: "then",
      tu: "but",
      hi: "for",
      eva: "indeed",

      // Particles
      api: "also",
      iva: "like",
      evam: "thus",
      tathā: "likewise",

      // Common nouns
      rāma: "Rama",
      kṛṣṇa: "Krishna",
      viṣṇu: "Vishnu",
      śiva: "Shiva",
      deva: "god",
      dharma: "dharma",
      karma: "action",
      mokṣa: "liberation",
      ātman: "self",
      brahman: "Brahman",
    };

    if (commonWords[wordLower]) {
      return commonWords[wordLower];
    }

    // Role-based default meanings
    const roleMeanings: Record<GrammaticalRole, string> = {
      Subject: "subject",
      Object: "object",
      Verb: "verb",
      Adjective: "adjective",
      Adverb: "adverb",
      Preposition: "preposition",
      Conjunction: "conjunction",
      Particle: "particle",
      Interjection: "interjection",
      Unknown: "word",
    };

    return roleMeanings[role] || "word";
  }

  /**
   * Reorder words for prose (Anvaya) - Subject-Object-Verb order
   */
  private static reorderForProse(wordOrder: WordOrder[]): string[] {
    // Separate by grammatical role
    const subjects = wordOrder.filter((w) => w.grammaticalRole === "Subject");
    const objects = wordOrder.filter((w) => w.grammaticalRole === "Object");
    const verbs = wordOrder.filter((w) => w.grammaticalRole === "Verb");
    const adjectives = wordOrder.filter((w) => w.grammaticalRole === "Adjective");
    const adverbs = wordOrder.filter((w) => w.grammaticalRole === "Adverb");
    const particles = wordOrder.filter((w) => w.grammaticalRole === "Particle");
    const others = wordOrder.filter(
      (w) =>
        !["Subject", "Object", "Verb", "Adjective", "Adverb", "Particle"].includes(
          w.grammaticalRole
        )
    );

    // Reorder: Subject + Adjectives + Objects + Adverbs + Verb + Particles + Others
    const anvaya: string[] = [
      ...subjects.map((w) => w.word),
      ...adjectives.map((w) => w.word),
      ...objects.map((w) => w.word),
      ...adverbs.map((w) => w.word),
      ...verbs.map((w) => w.word),
      ...particles.map((w) => w.word),
      ...others.map((w) => w.word),
    ];

    return anvaya;
  }

  /**
   * Generate explanation for the Anvaya analysis
   */
  private static generateExplanation(wordOrder: WordOrder[]): string {
    const subjects = wordOrder.filter((w) => w.grammaticalRole === "Subject");
    const objects = wordOrder.filter((w) => w.grammaticalRole === "Object");
    const verbs = wordOrder.filter((w) => w.grammaticalRole === "Verb");

    let explanation = "Anvaya (prose word order) analysis:\n";

    if (subjects.length > 0) {
      explanation += `\nSubject(s): ${subjects.map((w) => w.word).join(", ")}`;
    }

    if (objects.length > 0) {
      explanation += `\nObject(s): ${objects.map((w) => w.word).join(", ")}`;
    }

    if (verbs.length > 0) {
      explanation += `\nVerb(s): ${verbs.map((w) => w.word).join(", ")}`;
    }

    explanation +=
      "\n\nThe verse has been reordered from poetic Sanskrit to prose word order (Subject-Object-Verb) for easier understanding.";

    return explanation;
  }

  /**
   * Analyze multiple verses
   */
  static analyzeBatch(verses: string[]): AnvayaResult[] {
    return verses.map((verse) => this.analyze(verse));
  }
}
