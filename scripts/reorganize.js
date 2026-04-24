const fs = require("fs");

let content = fs.readFileSync("src/lib/data/scriptures.ts", "utf-8");

// 1. Cleanup UPANISHADS
// The current UPANISHADS list has a lot of fake suffixes.
// We will filter them out. We can't simply eval the file easily without TS setup.
// Let's use regex to replace the UPANISHADS array.
// Actually, since it's an array of objects, we can extract it, parse it as JS, filter it, and stringify.
const upanishadsMatch = content.match(/export const UPANISHADS = \[([\s\S]*?)\];/);
if (upanishadsMatch) {
  let listStr = upanishadsMatch[1];
  // naive split by '},'
  let items = listStr.split(/\},\s*\{/);
  items = items.filter((item) => !item.includes('-2"') && !item.includes('-3"'));
  let newListStr = items.join("},\n  {");
  content = content.replace(upanishadsMatch[0], `export const UPANISHADS = [${newListStr}];`);
}

// 2. Update metadata
// Krishna Yajurveda verses: Taittiriya Samhita has approx 3,286.
content = content.replace(/id: "yajurveda-krishna"[\s\S]*?totalVerses: 1875,/m, (match) =>
  match.replace("totalVerses: 1875,", "totalVerses: 3286,")
);

// 3. Remove searchVersesByKeyword
content = content.replace(
  /export function searchVersesByKeyword\([\s\S]*?\}\s*export function/m,
  "export function"
);

fs.writeFileSync("src/lib/data/scriptures.ts", content);
console.log("Done cleanup");
