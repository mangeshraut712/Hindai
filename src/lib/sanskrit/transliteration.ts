const INDEPENDENT_VOWELS: Record<string, string> = {
  अ: "a",
  आ: "ā",
  इ: "i",
  ई: "ī",
  उ: "u",
  ऊ: "ū",
  ऋ: "ṛ",
  ॠ: "ṝ",
  ऌ: "ḷ",
  ॡ: "ḹ",
  ए: "e",
  ऐ: "ai",
  ओ: "o",
  औ: "au",
};

const CONSONANTS: Record<string, string> = {
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
};

const VOWEL_SIGNS: Record<string, string> = {
  "ा": "ā",
  "ि": "i",
  "ी": "ī",
  "ु": "u",
  "ू": "ū",
  "ृ": "ṛ",
  "ॄ": "ṝ",
  "ॢ": "ḷ",
  "ॣ": "ḹ",
  "े": "e",
  "ै": "ai",
  "ो": "o",
  "ौ": "au",
};

const MARKS: Record<string, string> = {
  "ं": "ṃ",
  "ः": "ḥ",
  "ँ": "m̐",
  ऽ: "'",
  "।": ".",
  "॥": "..",
};

const DIGITS: Record<string, string> = {
  "०": "0",
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
};

const VIRAMA = "्";

export function transliterateToIast(text: string): string {
  const output: string[] = [];
  let index = 0;

  while (index < text.length) {
    const char = text[index];

    if (INDEPENDENT_VOWELS[char]) {
      output.push(INDEPENDENT_VOWELS[char]);
      index += 1;
      continue;
    }

    if (CONSONANTS[char]) {
      const nextChar = text[index + 1] || "";

      if (nextChar === VIRAMA) {
        output.push(CONSONANTS[char]);
        index += 2;
        continue;
      }

      if (VOWEL_SIGNS[nextChar]) {
        output.push(CONSONANTS[char] + VOWEL_SIGNS[nextChar]);
        index += 2;
        continue;
      }

      output.push(`${CONSONANTS[char]}a`);
      index += 1;
      continue;
    }

    if (MARKS[char]) {
      output.push(MARKS[char]);
      index += 1;
      continue;
    }

    if (DIGITS[char]) {
      output.push(DIGITS[char]);
      index += 1;
      continue;
    }

    if (VOWEL_SIGNS[char] || char === VIRAMA) {
      index += 1;
      continue;
    }

    output.push(char);
    index += 1;
  }

  return output.join("");
}
