// Indic Transliteration Implementation
// Converts between various Sanskrit scripts: Devanagari, IAST, SLP1, Harvard-Kyoto
// This is a TypeScript implementation - in production, use the Python library

export type Script = "Devanagari" | "IAST" | "SLP1" | "HK" | "ITRANS";

export interface TransliterationResult {
  original: string;
  originalScript: Script;
  targetScript: Script;
  converted: string;
}

export class IndicTransliteration {
  // Devanagari to IAST mapping
  private static DEVANAGARI_TO_IAST: Record<string, string> = {
    // Vowels
    अ: "a",
    आ: "ā",
    इ: "i",
    ई: "ī",
    उ: "u",
    ū: "ū",
    ऋ: "ṛ",
    ॠ: "ṝ",
    ऌ: "ḷ",
    ॡ: "ḹ",
    ए: "e",
    ऐ: "ai",
    ओ: "o",
    औ: "au",
    // Anusvara and Visarga
    "ं": "ṃ",
    "ः": "ḥ",
    // Consonants
    क: "k",
    ख: "kh",
    ग: "g",
    घ: "gh",
    ङ: "ṅ",
    च: "c",
    छ: "ch",
    ज: "j",
    झ: "jh",
    ञ: "ñ",
    ट: "ṭ",
    ठ: "ṭh",
    ड: "ḍ",
    ढ: "ḍh",
    ण: "ṇ",
    त: "t",
    थ: "th",
    द: "d",
    ध: "dh",
    न: "n",
    प: "p",
    फ: "ph",
    ब: "b",
    भ: "bh",
    म: "m",
    य: "y",
    र: "r",
    ल: "l",
    व: "v",
    श: "ś",
    ष: "ṣ",
    स: "s",
    ह: "h",
    // Misc
    "।": ".",
    "॥": "||",
    ऽ: "'",
  };

  // IAST to Devanagari mapping (reverse of above)
  private static IAST_TO_DEVANAGARI: Record<string, string> = {
    a: "अ",
    ā: "आ",
    i: "इ",
    ī: "ई",
    u: "उ",
    ū: "ऊ",
    ṛ: "ऋ",
    ṝ: "ॠ",
    ḷ: "ऌ",
    ḹ: "ॡ",
    e: "ए",
    ai: "ऐ",
    o: "ओ",
    au: "औ",
    ṃ: "ं",
    ḥ: "ः",
    k: "क",
    kh: "ख",
    g: "ग",
    gh: "घ",
    ṅ: "ङ",
    c: "च",
    ch: "छ",
    j: "ज",
    jh: "झ",
    ñ: "ञ",
    ṭ: "ट",
    ṭh: "ठ",
    ḍ: "ड",
    ḍh: "ढ",
    ṇ: "ण",
    t: "त",
    th: "थ",
    d: "द",
    dh: "ध",
    n: "न",
    p: "प",
    ph: "फ",
    b: "ब",
    bh: "भ",
    m: "म",
    y: "य",
    r: "र",
    l: "ल",
    v: "व",
    ś: "श",
    ṣ: "ष",
    s: "स",
    h: "ह",
    ".": "।",
    "||": "॥",
    "'": "ऽ",
  };

  // Devanagari to SLP1 mapping
  private static DEVANAGARI_TO_SLP1: Record<string, string> = {
    अ: "a",
    आ: "A",
    इ: "i",
    ई: "I",
    उ: "u",
    ऊ: "U",
    ऋ: "f",
    ॠ: "F",
    ऌ: "x",
    ॡ: "X",
    ए: "e",
    ऐ: "E",
    ओ: "o",
    औ: "O",
    "ं": "M",
    "ः": "H",
    क: "k",
    ख: "K",
    ग: "g",
    घ: "G",
    ङ: "N",
    च: "c",
    छ: "C",
    ज: "j",
    झ: "J",
    ञ: "Y",
    ट: "w",
    ठ: "W",
    ड: "q",
    ढ: "Q",
    ण: "R",
    त: "t",
    थ: "T",
    द: "d",
    ध: "D",
    न: "n",
    प: "p",
    फ: "P",
    ब: "b",
    भ: "B",
    म: "m",
    य: "y",
    र: "r",
    ल: "l",
    व: "v",
    श: "S",
    ष: "z",
    स: "s",
    ह: "h",
  };

  // Harvard-Kyoto mapping
  private static DEVANAGARI_TO_HK: Record<string, string> = {
    अ: "a",
    आ: "A",
    इ: "i",
    ई: "I",
    उ: "u",
    ऊ: "U",
    ऋ: "R",
    ॠ: "RR",
    ऌ: "lR",
    ॡ: "lRR",
    ए: "e",
    ऐ: "ai",
    ओ: "o",
    औ: "au",
    "ं": "M",
    "ः": "H",
    क: "k",
    ख: "Kh",
    ग: "g",
    घ: "Gh",
    ङ: "G",
    च: "c",
    छ: "Ch",
    ज: "j",
    झ: "Jh",
    ञ: "ny",
    ट: "T",
    ठ: "Th",
    ड: "D",
    ढ: "Dh",
    ण: "N",
    त: "t",
    थ: "th",
    द: "d",
    ध: "dh",
    न: "n",
    प: "p",
    फ: "ph",
    ब: "b",
    भ: "bh",
    म: "m",
    य: "y",
    र: "r",
    ल: "l",
    व: "v",
    श: "sh",
    ष: "Sh",
    स: "s",
    ह: "h",
  };

  /**
   * Convert text from one script to another
   */
  static convert(text: string, fromScript: Script, toScript: Script): TransliterationResult {
    if (fromScript === toScript) {
      return {
        original: text,
        originalScript: fromScript,
        targetScript: toScript,
        converted: text,
      };
    }

    // Convert to Devanagari first if not already
    let devanagari = text;
    if (fromScript !== "Devanagari") {
      devanagari = this.toDevanagari(text, fromScript);
    }

    // Convert from Devanagari to target
    const converted = this.fromDevanagari(devanagari, toScript);

    return {
      original: text,
      originalScript: fromScript,
      targetScript: toScript,
      converted,
    };
  }

  /**
   * Convert to Devanagari from various scripts
   */
  private static toDevanagari(text: string, fromScript: Script): string {
    switch (fromScript) {
      case "IAST":
        return this.applyMapping(text, this.IAST_TO_DEVANAGARI);
      case "SLP1":
        return this.slp1ToDevanagari(text);
      case "HK":
        return this.hkToDevanagari(text);
      case "ITRANS":
        return this.itransToDevanagari(text);
      default:
        return text;
    }
  }

  /**
   * Convert from Devanagari to various scripts
   */
  private static fromDevanagari(text: string, toScript: Script): string {
    switch (toScript) {
      case "IAST":
        return this.applyMapping(text, this.DEVANAGARI_TO_IAST);
      case "SLP1":
        return this.applyMapping(text, this.DEVANAGARI_TO_SLP1);
      case "HK":
        return this.applyMapping(text, this.DEVANAGARI_TO_HK);
      case "ITRANS":
        return this.devanagariToItrans(text);
      default:
        return text;
    }
  }

  /**
   * Apply character mapping
   */
  private static applyMapping(text: string, mapping: Record<string, string>): string {
    let result = text;
    // Sort keys by length (longest first) to handle multi-character mappings
    const sortedKeys = Object.keys(mapping).sort((a, b) => b.length - a.length);

    for (const key of sortedKeys) {
      result = result.split(key).join(mapping[key]);
    }
    return result;
  }

  /**
   * SLP1 to Devanagari conversion
   */
  private static slp1ToDevanagari(text: string): string {
    const mapping: Record<string, string> = {
      a: "अ",
      A: "आ",
      i: "इ",
      I: "ई",
      u: "उ",
      U: "ऊ",
      f: "ऋ",
      F: "ॠ",
      x: "ऌ",
      X: "ॡ",
      e: "ए",
      E: "ऐ",
      o: "ओ",
      O: "औ",
      M: "ं",
      H: "ः",
      k: "क",
      K: "ख",
      g: "ग",
      G: "घ",
      N: "ङ",
      c: "च",
      C: "छ",
      j: "ज",
      J: "झ",
      Y: "ञ",
      w: "ट",
      W: "ठ",
      q: "ड",
      Q: "ढ",
      R: "ण",
      t: "त",
      T: "थ",
      d: "द",
      D: "ध",
      n: "न",
      p: "प",
      P: "फ",
      b: "ब",
      B: "भ",
      m: "म",
      y: "य",
      r: "र",
      l: "ल",
      v: "व",
      S: "श",
      z: "ष",
      s: "स",
      h: "ह",
    };
    return this.applyMapping(text, mapping);
  }

  /**
   * Harvard-Kyoto to Devanagari conversion
   */
  private static hkToDevanagari(text: string): string {
    const mapping: Record<string, string> = {
      a: "अ",
      A: "आ",
      i: "इ",
      I: "ई",
      u: "उ",
      U: "ऊ",
      R: "ऋ",
      RR: "ॠ",
      lR: "ऌ",
      lRR: "ॡ",
      e: "ए",
      ai: "ऐ",
      o: "ओ",
      au: "औ",
      M: "ं",
      H: "ः",
      k: "क",
      Kh: "ख",
      g: "ग",
      Gh: "घ",
      G: "ङ",
      c: "च",
      Ch: "छ",
      j: "ज",
      Jh: "झ",
      ny: "ञ",
      T: "ट",
      Th: "ठ",
      D: "ड",
      Dh: "ढ",
      N: "ण",
      t: "त",
      th: "थ",
      d: "द",
      dh: "ध",
      n: "न",
      p: "प",
      ph: "फ",
      b: "ब",
      bh: "भ",
      m: "म",
      y: "य",
      r: "र",
      l: "ल",
      v: "व",
      sh: "श",
      Sh: "ष",
      s: "स",
      h: "ह",
    };
    return this.applyMapping(text, mapping);
  }

  /**
   * ITRANS to Devanagari conversion
   */
  private static itransToDevanagari(text: string): string {
    const mapping: Record<string, string> = {
      a: "अ",
      aa: "आ",
      i: "इ",
      ii: "ई",
      u: "उ",
      uu: "ऊ",
      RRi: "ऋ",
      RRI: "ॠ",
      LLi: "ऌ",
      LLI: "ॡ",
      e: "ए",
      ai: "ऐ",
      o: "ओ",
      au: "औ",
      M: "ं",
      H: "ः",
      k: "क",
      kh: "ख",
      g: "ग",
      gh: "घ",
      ng: "ङ",
      ch: "च",
      Ch: "छ",
      j: "ज",
      jh: "झ",
      ny: "ञ",
      T: "ट",
      Th: "ठ",
      D: "ड",
      Dh: "ढ",
      N: "ण",
      t: "त",
      th: "थ",
      d: "द",
      dh: "ध",
      n: "न",
      p: "प",
      ph: "फ",
      b: "ब",
      bh: "भ",
      m: "म",
      y: "य",
      r: "र",
      l: "ल",
      v: "व",
      sh: "श",
      Sh: "ष",
      s: "स",
      h: "ह",
    };
    return this.applyMapping(text, mapping);
  }

  /**
   * Devanagari to ITRANS conversion
   */
  private static devanagariToItrans(text: string): string {
    const mapping: Record<string, string> = {
      अ: "a",
      आ: "aa",
      इ: "i",
      ई: "ii",
      उ: "u",
      ऊ: "uu",
      ऋ: "RRi",
      ॠ: "RRI",
      ऌ: "LLi",
      ॡ: "LLI",
      ए: "e",
      ऐ: "ai",
      ओ: "o",
      औ: "au",
      "ं": "M",
      "ः": "H",
      क: "k",
      ख: "kh",
      ग: "g",
      घ: "gh",
      ङ: "ng",
      च: "ch",
      छ: "Ch",
      ज: "j",
      झ: "jh",
      ञ: "ny",
      ट: "T",
      ठ: "Th",
      ड: "D",
      ढ: "Dh",
      ण: "N",
      त: "t",
      थ: "th",
      द: "d",
      ध: "dh",
      न: "n",
      प: "p",
      फ: "ph",
      ब: "b",
      भ: "bh",
      म: "m",
      य: "y",
      र: "r",
      ल: "l",
      व: "v",
      श: "sh",
      ष: "Sh",
      स: "s",
      ह: "h",
    };
    return this.applyMapping(text, mapping);
  }

  /**
   * Detect the script of a given text
   */
  static detectScript(text: string): Script {
    if (/[\u0900-\u097F]/.test(text)) return "Devanagari";
    if (/[āīūṛṝḷḹṃḥśṣ]/.test(text)) return "IAST";
    if (/[aAfFiIuUxXeEoOMHKkKgGNcCjJYwWqQRtTdDpPbBmMyrlvSzs]/.test(text)) return "SLP1";
    if (/[AIRRRlRlaiouMkKhgGcChJhjTThDhDphbhshSh]/.test(text)) return "HK";
    return "ITRANS"; // Default
  }

  /**
   * Get supported scripts
   */
  static getSupportedScripts(): Script[] {
    return ["Devanagari", "IAST", "SLP1", "HK", "ITRANS"];
  }
}
