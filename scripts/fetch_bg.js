const https = require("https");
const fs = require("fs");

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        },
        (res) => {
          let data = "";
          if (res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 302) {
            return reject(new Error("Status: " + res.statusCode + " URL: " + url));
          }
          if (res.statusCode === 301 || res.statusCode === 302) {
            return fetchJson(res.headers.location).then(resolve).catch(reject);
          }
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              resolve(JSON.parse(data));
            } catch {
              resolve(data); // might not be JSON
            }
          });
        }
      )
      .on("error", reject);
  });
}

(async () => {
  try {
    console.log("Fetching chapter metadata...");
    const _chapters = await fetchJson(
      "https://raw.githubusercontent.com/gita/gita/master/data/chapters.json"
    );

    console.log("Fetching verses...");
    const verses = await fetchJson(
      "https://raw.githubusercontent.com/gita/gita/master/data/verses.json"
    );

    // Transform the data
    const formattedVerses = [];

    // Some simple speaker heuristics based on verse IDs:
    // C1: Dhritarashtra (1), Sanjaya (2-19), Arjuna (20-47)
    // C2: Sanjaya (1, 9-10), Krishna (2-3, 11-53, 55-72), Arjuna (4-8, 54)
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

    console.log(`Processing ${verses.length} verses...`);
    for (const v of verses) {
      const ch = v.chapter_number;
      const vn = v.verse_number;

      const transObj = {
        id: `bg-${ch}-${vn}`,
        scriptureId: "bhagavad-gita",
        chapter: ch,
        verse: vn,
        sanskrit: v.text || "",
        transliteration: v.transliteration || "",
        translation: {
          en: v.word_meanings || "Translation coming soon...",
        },
        speaker: getSpeaker(ch, vn),
        keyTerms: ["Bhagavad Gita"],
      };
      formattedVerses.push(transObj);
    }

    // We can also fetch Swami Sivananda or another translation, but this is a placeholder to get all 700 structure.
    fs.writeFileSync(
      "src/lib/data/bhagavad-gita-full.ts",
      `import { ScriptureVerse } from "@/types/scripture";\n\nexport const bhagavadGitaVerses: ScriptureVerse[] = ${JSON.stringify(formattedVerses, null, 2)};\n`
    );
    console.log("Successfully created bhagavad-gita-full.ts with 700 verses!");
  } catch (err) {
    console.error("Error fetching BG data:", err);
  }
})();
