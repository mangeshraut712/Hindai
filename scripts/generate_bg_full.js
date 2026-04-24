const fs = require("fs");
const https = require("https");

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

function cleanText(text) {
  if (!text) return "";
  return text.replace(/\\n/g, "\n").replace(/\r/g, "").trim();
}

(async () => {
  try {
    console.log("Fetching verses...");
    const verses = await fetchJson(
      "https://raw.githubusercontent.com/gita/gita/main/data/verse.json"
    );

    console.log("Fetching translations...");
    const translations = await fetchJson(
      "https://raw.githubusercontent.com/gita/gita/main/data/translation.json"
    );

    const transMap = new Map();

    // Group translations by verse_id
    for (const t of translations) {
      const vid = t.verse_id;
      if (!transMap.has(vid)) {
        transMap.set(vid, { en: [], hi: [] });
      }
      if (t.lang === "english") {
        transMap.get(vid).en.push(t);
      } else if (t.lang === "hindi") {
        transMap.get(vid).hi.push(t);
      }
    }

    const formattedVerses = [];

    console.log(`Processing ${verses.length} verses...`);
    for (const v of verses) {
      const ch = v.chapter_number;
      const vn = v.verse_number;
      const vid = v.id;

      const tData = transMap.get(vid) || { en: [], hi: [] };

      // Choose preferred English translation
      let enTranslation = "Translation not available.";
      if (tData.en.length > 0) {
        const prefEn = tData.en.find(
          (x) =>
            x.authorName.includes("Adidevananda") ||
            x.authorName.includes("Sivananda") ||
            x.authorName.includes("Gambhirananda")
        );
        enTranslation = (prefEn || tData.en[0]).description;
      }

      // Choose preferred Hindi translation
      let hiTranslation = undefined;
      if (tData.hi.length > 0) {
        const prefHi = tData.hi.find(
          (x) => x.authorName.includes("Tejomayananda") || x.authorName.includes("Ramsukhdas")
        );
        hiTranslation = (prefHi || tData.hi[0]).description;
      }

      // Word meanings from verse.json (if available)
      let wordMeaningsList = undefined;
      if (v.word_meanings) {
        try {
          // basic parsing of word meanings format "dhṛitarāśhtraḥ uvācha—Dhritarashtra said; dharma-kṣhetre—..."
          const parts = v.word_meanings.split(";");
          wordMeaningsList = parts
            .map((p) => {
              const spl = p.trim().split("—");
              if (spl.length >= 2) {
                return {
                  sanskrit: spl[0].trim(),
                  iast: spl[0].trim(),
                  meaning: spl[1].trim(),
                };
              }
              return null;
            })
            .filter((x) => x !== null);
          if (wordMeaningsList.length === 0) wordMeaningsList = undefined;
        } catch {
          // ignore
        }
      }

      const transObj = {
        id: `bg-${ch}-${vn}`,
        scriptureId: "bhagavad-gita",
        chapter: ch,
        verse: vn,
        sanskrit: cleanText(v.text),
        transliteration: cleanText(v.transliteration),
        wordByWord: wordMeaningsList,
        translation: {
          en: cleanText(enTranslation),
          ...(hiTranslation ? { hi: cleanText(hiTranslation) } : {}),
        },
        speaker: getSpeaker(ch, vn),
        keyTerms: ["Bhagavad Gita"],
      };
      formattedVerses.push(transObj);
    }

    fs.writeFileSync(
      "src/lib/data/bhagavad-gita-verses.ts",
      `import { ScriptureVerse } from "@/types/scripture";\n\nexport const bhagavadGitaVerses: ScriptureVerse[] = ${JSON.stringify(formattedVerses, null, 2)};\n`
    );
    console.log(
      "Successfully created bhagavad-gita-verses.ts with " + formattedVerses.length + " verses!"
    );
  } catch (err) {
    console.error("Error fetching BG data:", err);
  }
})();
