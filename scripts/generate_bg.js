const fs = require("fs");

const chapterCounts = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];

function getSpeaker(chapter, verse) {
  if (chapter === 1) {
    if (verse === 1) return "Dhritarashtra";
    if (verse >= 2 && verse <= 20) return "Sanjaya";
    if (verse >= 21) return "Arjuna";
  }
  if (chapter === 2) {
    if (verse === 1 || verse === 9) return "Sanjaya";
    if (verse >= 4 && verse <= 8) return "Arjuna";
    if (verse === 54) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 3) {
    if (verse === 1 || verse === 2) return "Arjuna";
    if (verse === 36) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 4) {
    if (verse === 4) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 5) {
    if (verse === 1) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 6) {
    if (verse >= 33 && verse <= 34) return "Arjuna";
    if (verse >= 37 && verse <= 39) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 8) {
    if (verse >= 1 && verse <= 2) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 10) {
    if (verse >= 12 && verse <= 18) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 11) {
    if (verse >= 1 && verse <= 4) return "Arjuna";
    if (verse >= 15 && verse <= 31) return "Arjuna";
    if (verse >= 35 && verse <= 46) return "Arjuna";
    if (verse === 50) return "Sanjaya";
    if (verse >= 51) return "Krishna"; // and Sanjaya 50
    return "Krishna";
  }
  if (chapter === 12) {
    if (verse === 1) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 13) {
    if (verse === 1) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 14) {
    if (verse === 21) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 17) {
    if (verse === 1) return "Arjuna";
    return "Krishna";
  }
  if (chapter === 18) {
    if (verse === 1) return "Arjuna";
    if (verse === 73) return "Arjuna";
    if (verse >= 74 && verse <= 78) return "Sanjaya";
    return "Krishna";
  }
  return "Krishna"; // Default
}

const formattedVerses = [];

for (let ch = 1; ch <= 18; ch++) {
  const count = chapterCounts[ch - 1];
  for (let vn = 1; vn <= count; vn++) {
    formattedVerses.push({
      id: `bg-${ch}-${vn}`,
      scriptureId: "bhagavad-gita",
      chapter: ch,
      verse: vn,
      sanskrit: `Sanskrit verse for BG ${ch}.${vn} coming soon...`,
      transliteration: `Transliteration for BG ${ch}.${vn} coming soon...`,
      translation: {
        en: `Translation for BG ${ch}.${vn} coming soon...`,
      },
      speaker: getSpeaker(ch, vn),
      keyTerms: ["Bhagavad Gita"],
    });
  }
}

fs.writeFileSync(
  "src/lib/data/bhagavad-gita-verses.ts",
  `import { ScriptureVerse } from "@/types/scripture";\n\nexport const bhagavadGitaVerses: ScriptureVerse[] = ${JSON.stringify(formattedVerses, null, 2)};\n`
);
console.log(
  "Successfully created bhagavad-gita-verses.ts with " + formattedVerses.length + " verses!"
);
