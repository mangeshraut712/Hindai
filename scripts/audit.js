const fs = require("fs");
// Note: typescript module not needed - using regex/string manipulation for simplicity

let fileContent = fs.readFileSync("src/lib/data/scriptures.ts", "utf-8");

// Audit Scriptures
const scripturesMatch = fileContent.match(
  /export const scriptures: Scripture\[\] = \[([\s\S]*?)\];/
);
// Audit Upanishads
const upanishadsMatch = fileContent.match(/export const UPANISHADS = \[([\s\S]*?)\];/);
// Audit Puranas
const puranasMatch = fileContent.match(/export const MAHAPURANAS = \[([\s\S]*?)\];/);
// Audit sampleVerses
const sampleVersesMatch = fileContent.match(
  /export const sampleVerses: ScriptureVerse\[\] = \[([\s\S]*?)\];/
);

console.log("--- SCRIPTURE AUDIT ---");
if (scripturesMatch) {
  const count = (scripturesMatch[1].match(/\{/g) || []).length;
  console.log(`Scriptures found: ${count}`);
}
if (upanishadsMatch) {
  const items = upanishadsMatch[1].split("id:");
  console.log(`Upanishads found: ${items.length - 1}`);
  let countDups = 0;
  items.forEach((item) => {
    if (item.includes('-2"') || item.includes('-3"')) countDups++;
  });
  console.log(`Duplicate/Suffix Upanishads found: ${countDups}`);
}
if (puranasMatch) {
  const count = (puranasMatch[1].match(/\{/g) || []).length;
  console.log(`Mahapuranas found: ${count} (Expected 18)`);
}
if (sampleVersesMatch) {
  const bgVerses = (sampleVersesMatch[1].match(/scriptureId: "bhagavad-gita"/g) || []).length;
  console.log(`Bhagavad Gita Sample Verses found: ${bgVerses}`);
}

// 2. Add speaker attribution to BG verses
// We can use regex to find BG verses and insert speaker.
let updatedContent = fileContent.replace(
  /(\{\s*id: "bg-\d+-\d+",\s*scriptureId: "bhagavad-gita",\s*chapter: \d+,\s*verse: \d+,)/g,
  (match) => {
    // Determine speaker based on chapter/verse
    // Most are Krishna. Let's default to Krishna, then fix exceptions.
    return match + '\n    speaker: "Krishna",';
  }
);

// Fix specific speakers
updatedContent = updatedContent.replace(
  /id: "bg-1-1",\s*scriptureId: "bhagavad-gita",\s*chapter: 1,\s*verse: 1,\s*speaker: "Krishna"/,
  'id: "bg-1-1",\n    scriptureId: "bhagavad-gita",\n    chapter: 1,\n    verse: 1,\n    speaker: "Dhritarashtra"'
);
updatedContent = updatedContent.replace(
  /id: "bg-10-12",\s*scriptureId: "bhagavad-gita",\s*chapter: 10,\s*verse: 12,\s*speaker: "Krishna"/,
  'id: "bg-10-12",\n    scriptureId: "bhagavad-gita",\n    chapter: 10,\n    verse: 12,\n    speaker: "Arjuna"'
);
updatedContent = updatedContent.replace(
  /id: "bg-13-1",\s*scriptureId: "bhagavad-gita",\s*chapter: 13,\s*verse: 1,\s*speaker: "Krishna"/,
  'id: "bg-13-1",\n    scriptureId: "bhagavad-gita",\n    chapter: 13,\n    verse: 1,\n    speaker: "Arjuna"'
);
// Arjuna also speaks in bg-11 but we don't have his specific verses in the list (we have 11-32, 11-55 which are Krishna)

// Wait, the BG verses might have speaker already or not. The regex matches `verse: \d+,`. Let's also handle `id: "bg-12-13-14"`
updatedContent = updatedContent.replace(
  /(\{\s*id: "bg-12-13-14",\s*scriptureId: "bhagavad-gita",\s*chapter: 12,\s*verse: 13,)/g,
  '$1\n    speaker: "Krishna",'
);

// 3. Remove fake Upanishads
// We'll parse the UPANISHADS array and filter out the ones with `-2"`, `-3"` or we can just replace the whole array.
// Actually, many in the list of 108 are valid but there are duplicates like `aitareya-upanishad-2`.
// A true list of 108 Upanishads according to Muktika is specific.
// I'll just remove the ones ending in `-2",` or `-3",` and maybe there's 108 after that? Let's see.

fs.writeFileSync("audit_and_fix.js", fileContent); // Just for backup/debug
fs.writeFileSync("src/lib/data/scriptures.ts", updatedContent);

console.log("Updated BG speakers.");
