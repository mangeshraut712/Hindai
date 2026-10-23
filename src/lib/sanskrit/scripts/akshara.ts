import type { Script } from "./types";

export type ScriptSigns = {
  virama: string;
  vowels: Record<string, string>;
  marks: Record<string, string>;
};

const code = (hex: number) => String.fromCodePoint(hex);

const VOWEL_KEYS = ["ai", "au", "ā", "ī", "ū", "ṛ", "ṝ", "ḷ", "ḹ", "e", "o", "a", "i", "u"];
const MARK_KEYS = ["ṃ", "ḥ"];

const LATIN_FOLD: Record<string, string> = {
  ā: "aa",
  ī: "ii",
  ū: "uu",
  ṛ: "ri",
  ṝ: "rii",
  ḷ: "li",
  ḹ: "lii",
  ṃ: "m",
  ḥ: "h",
  ṅ: "ng",
  ñ: "ny",
  ṭh: "th",
  ḍh: "dh",
  ṭ: "t",
  ḍ: "d",
  ṇ: "n",
  ś: "sh",
  ṣ: "sh",
};

function signs(
  virama: number,
  vowels: Record<string, number>,
  anusvara: number,
  visarga: number
): ScriptSigns {
  const mapped: Record<string, string> = {};
  for (const [key, hex] of Object.entries(vowels)) {
    mapped[key] = code(hex);
  }
  return {
    virama: code(virama),
    vowels: mapped,
    marks: { ṃ: code(anusvara), ḥ: code(visarga) },
  };
}

export const SCRIPT_SIGNS: Partial<Record<Script, ScriptSigns>> = {
  Devanagari: signs(
    0x094d,
    {
      ā: 0x093e,
      i: 0x093f,
      ī: 0x0940,
      u: 0x0941,
      ū: 0x0942,
      ṛ: 0x0943,
      ṝ: 0x0944,
      ḷ: 0x0962,
      ḹ: 0x0963,
      e: 0x0947,
      ai: 0x0948,
      o: 0x094b,
      au: 0x094c,
    },
    0x0902,
    0x0903
  ),
  Bengali: signs(
    0x09cd,
    {
      ā: 0x09be,
      i: 0x09bf,
      ī: 0x09c0,
      u: 0x09c1,
      ū: 0x09c2,
      ṛ: 0x09c3,
      e: 0x09c7,
      ai: 0x09c8,
      o: 0x09cb,
      au: 0x09cc,
    },
    0x0982,
    0x0983
  ),
  Gurmukhi: signs(
    0x0a4d,
    {
      ā: 0x0a3e,
      i: 0x0a3f,
      ī: 0x0a40,
      u: 0x0a41,
      ū: 0x0a42,
      e: 0x0a47,
      ai: 0x0a48,
      o: 0x0a4b,
      au: 0x0a4c,
    },
    0x0a02,
    0x0a03
  ),
  Gujarati: signs(
    0x0acd,
    {
      ā: 0x0abe,
      i: 0x0abf,
      ī: 0x0ac0,
      u: 0x0ac1,
      ū: 0x0ac2,
      ṛ: 0x0ac3,
      e: 0x0ac7,
      ai: 0x0ac8,
      o: 0x0acb,
      au: 0x0acc,
    },
    0x0a82,
    0x0a83
  ),
  Odia: signs(
    0x0b4d,
    {
      ā: 0x0b3e,
      i: 0x0b3f,
      ī: 0x0b40,
      u: 0x0b41,
      ū: 0x0b42,
      ṛ: 0x0b43,
      e: 0x0b47,
      ai: 0x0b48,
      o: 0x0b4b,
      au: 0x0b4c,
    },
    0x0b02,
    0x0b03
  ),
  Tamil: signs(
    0x0bcd,
    {
      ā: 0x0bbe,
      i: 0x0bbf,
      ī: 0x0bc0,
      u: 0x0bc1,
      ū: 0x0bc2,
      e: 0x0bc6,
      ai: 0x0bc7,
      o: 0x0bca,
      au: 0x0bcc,
    },
    0x0b82,
    0x0b83
  ),
  Telugu: signs(
    0x0c4d,
    {
      ā: 0x0c3e,
      i: 0x0c3f,
      ī: 0x0c40,
      u: 0x0c41,
      ū: 0x0c42,
      ṛ: 0x0c43,
      e: 0x0c47,
      ai: 0x0c48,
      o: 0x0c4b,
      au: 0x0c4c,
    },
    0x0c02,
    0x0c03
  ),
  Kannada: signs(
    0x0ccd,
    {
      ā: 0x0cbe,
      i: 0x0cbf,
      ī: 0x0cc0,
      u: 0x0cc1,
      ū: 0x0cc2,
      ṛ: 0x0cc3,
      e: 0x0cc7,
      ai: 0x0cc8,
      o: 0x0ccb,
      au: 0x0ccc,
    },
    0x0c82,
    0x0c83
  ),
  Malayalam: signs(
    0x0d4d,
    {
      ā: 0x0d3e,
      i: 0x0d3f,
      ī: 0x0d40,
      u: 0x0d41,
      ū: 0x0d42,
      ṛ: 0x0d43,
      e: 0x0d47,
      ai: 0x0d48,
      o: 0x0d4b,
      au: 0x0d4c,
    },
    0x0d02,
    0x0d03
  ),
  Grantha: signs(
    0x1134d,
    {
      ā: 0x1133e,
      i: 0x1133f,
      ī: 0x11340,
      u: 0x11341,
      ū: 0x11342,
      ṛ: 0x11343,
      e: 0x11347,
      ai: 0x11348,
      o: 0x1134b,
      au: 0x1134c,
    },
    0x11302,
    0x11303
  ),
  Sharada: signs(
    0x111c0,
    {
      ā: 0x111b3,
      i: 0x111b4,
      ī: 0x111b5,
      u: 0x111b6,
      ū: 0x111b7,
      ṛ: 0x111b8,
      e: 0x111bc,
      ai: 0x111bd,
      o: 0x111be,
      au: 0x111bf,
    },
    0x11181,
    0x11182
  ),
};

/** Grantha consonants in the existing map are Tamil letters. Use the Grantha block. */
export const GRANTHA_GLYPHS: Record<string, string> = {
  a: code(0x11305),
  ā: code(0x11306),
  i: code(0x11307),
  ī: code(0x11308),
  u: code(0x11309),
  ū: code(0x1130a),
  ṛ: code(0x1130b),
  e: code(0x1130f),
  ai: code(0x11310),
  o: code(0x11313),
  au: code(0x11314),
  k: code(0x11315),
  kh: code(0x11316),
  g: code(0x11317),
  gh: code(0x11318),
  ṅ: code(0x11319),
  c: code(0x1131a),
  ch: code(0x1131b),
  j: code(0x1131c),
  jh: code(0x1131d),
  ñ: code(0x1131e),
  ṭ: code(0x1131f),
  ṭh: code(0x11320),
  ḍ: code(0x11321),
  ḍh: code(0x11322),
  ṇ: code(0x11323),
  t: code(0x11324),
  th: code(0x11325),
  d: code(0x11326),
  dh: code(0x11327),
  n: code(0x11328),
  p: code(0x1132a),
  ph: code(0x1132b),
  b: code(0x1132c),
  bh: code(0x1132d),
  m: code(0x1132e),
  y: code(0x1132f),
  r: code(0x11330),
  l: code(0x11332),
  v: code(0x11335),
  ś: code(0x11336),
  ṣ: code(0x11337),
  s: code(0x11338),
  h: code(0x11339),
};

type Token =
  | { kind: "consonant"; value: string }
  | { kind: "vowel"; value: string }
  | { kind: "mark"; value: string }
  | { kind: "other"; value: string };

function longestPrefix(text: string, index: number, keys: string[]): string | null {
  for (const key of keys) {
    if (text.startsWith(key, index)) return key;
  }
  return null;
}

function tokenizeIast(text: string, consonantKeys: string[]): Token[] {
  const vowels = [...VOWEL_KEYS].sort((left, right) => right.length - left.length);
  const marks = [...MARK_KEYS].sort((left, right) => right.length - left.length);
  const tokens: Token[] = [];
  let index = 0;

  while (index < text.length) {
    const consonant = longestPrefix(text, index, consonantKeys);
    if (consonant) {
      tokens.push({ kind: "consonant", value: consonant });
      index += consonant.length;
      continue;
    }
    const vowel = longestPrefix(text, index, vowels);
    if (vowel) {
      tokens.push({ kind: "vowel", value: vowel });
      index += vowel.length;
      continue;
    }
    const mark = longestPrefix(text, index, marks);
    if (mark) {
      tokens.push({ kind: "mark", value: mark });
      index += mark.length;
      continue;
    }
    tokens.push({ kind: "other", value: text[index] ?? "" });
    index += 1;
  }

  return tokens;
}

function consonantKeys(mapping: Record<string, string>): string[] {
  return Object.keys(mapping)
    .filter((key) => !VOWEL_KEYS.includes(key) && !MARK_KEYS.includes(key))
    .sort((left, right) => right.length - left.length);
}

export function iastToScript(
  text: string,
  mapping: Record<string, string>,
  signsForScript: ScriptSigns
): string {
  const keys = consonantKeys(mapping);
  const tokens = tokenizeIast(text, keys);
  let output = "";

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!token) continue;

    if (token.kind === "consonant") {
      const glyph = mapping[token.value];
      if (!glyph) {
        output += token.value;
        continue;
      }
      const next = tokens[index + 1];
      if (next?.kind === "vowel") {
        output += next.value === "a" ? glyph : `${glyph}${signsForScript.vowels[next.value] ?? ""}`;
        index += 1;
        continue;
      }
      output += `${glyph}${signsForScript.virama}`;
      continue;
    }

    if (token.kind === "vowel") {
      output += mapping[token.value] ?? token.value;
      continue;
    }

    if (token.kind === "mark") {
      output += signsForScript.marks[token.value] ?? token.value;
      continue;
    }

    output += token.value;
  }

  return output;
}

function reverseShorter(mapping: Record<string, string>, keys: string[]): Record<string, string> {
  const reversed: Record<string, string> = {};
  for (const key of keys) {
    const glyph = mapping[key];
    if (!glyph) continue;
    const current = reversed[glyph];
    if (!current || key.length < current.length) reversed[glyph] = key;
  }
  return reversed;
}

export function scriptToIast(
  text: string,
  mapping: Record<string, string>,
  signsForScript: ScriptSigns
): string {
  const consonants = reverseShorter(mapping, consonantKeys(mapping));
  const vowels = reverseShorter(mapping, VOWEL_KEYS);
  const matras: Record<string, string> = {};
  for (const [iast, glyph] of Object.entries(signsForScript.vowels)) {
    matras[glyph] = iast;
  }
  const marks: Record<string, string> = {};
  for (const [iast, glyph] of Object.entries(signsForScript.marks)) {
    marks[glyph] = iast;
  }

  let output = "";
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index] ?? "";
    const consonant = consonants[char];
    if (consonant) {
      const next = text[index + 1] ?? "";
      if (next === signsForScript.virama) {
        output += consonant;
        index += 1;
        continue;
      }
      const vowel = matras[next];
      if (vowel) {
        output += consonant + vowel;
        index += 1;
        continue;
      }
      output += `${consonant}a`;
      continue;
    }

    if (vowels[char]) {
      output += vowels[char];
      continue;
    }
    if (marks[char]) {
      output += marks[char];
      continue;
    }
    if (char === signsForScript.virama || matras[char]) continue;
    output += char;
  }

  return output;
}

export function foldIastToLatin(text: string): string {
  const keys = Object.keys(LATIN_FOLD).sort((left, right) => right.length - left.length);
  let output = "";
  let index = 0;
  while (index < text.length) {
    const key = longestPrefix(text, index, keys);
    if (key) {
      output += LATIN_FOLD[key] ?? key;
      index += key.length;
      continue;
    }
    output += text[index] ?? "";
    index += 1;
  }
  return output;
}
