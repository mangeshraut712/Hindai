const fs = require("fs");
let content = fs.readFileSync("src/lib/data/scriptures.ts", "utf-8");

const lines = content.split("\n");
const cleanedLines = [];
let seenKeys = new Set();

for (let line of lines) {
  if (line.includes("{")) {
    seenKeys.clear();
  }

  if (line.trim().startsWith("speaker:")) {
    if (seenKeys.has("speaker")) {
      continue;
    }
    seenKeys.add("speaker");
  }

  cleanedLines.push(line);
}

fs.writeFileSync("src/lib/data/scriptures.ts", cleanedLines.join("\n"));
console.log("Cleaned up duplicate keys!");
