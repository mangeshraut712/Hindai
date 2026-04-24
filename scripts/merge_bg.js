const fs = require("fs");

// Read the original scriptures.ts
let scripturesFile = fs.readFileSync("src/lib/data/scriptures.ts", "utf-8");

// Extract sampleVerses string using regex
const sampleVersesMatch = scripturesFile.match(
  /export const sampleVerses: ScriptureVerse\[\] = \[([\s\S]*?)\];\n/
);
if (!sampleVersesMatch) {
  console.log("Could not find sampleVerses array.");
  process.exit(1);
}

// We need to parse it, but it's typescript with actual objects.
// Wait, we can't easily parse TS. I'll use a trick:
// Replace the sampleVerses array with the ones without BG verses, and append the BG verses from a new TS file.
// Or just import the new BG verses into scriptures.ts.

let updatedScripturesFile = scripturesFile.replace(
  /export const sampleVerses: ScriptureVerse\[\] = \[([\s\S]*?)\];\n/,
  "export const sampleVerses: ScriptureVerse[] = [\n$1\n  ...bhagavadGitaVerses.filter(bgv => !sampleVersesIds.has(bgv.id))\n];\n"
);

// Instead of string manipulation, it's easier to add an import at the top:
// import { bhagavadGitaVerses } from './bhagavad-gita-verses';
// Then at the end, append it.
