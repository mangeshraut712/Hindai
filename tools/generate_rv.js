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

function _cleanText(text) {
  if (!text) return "";
  return text.replace(/\\n/g, "\n").replace(/\r/g, "").trim();
}

function parseSuktaMetadata(metadataStr) {
  // Format: "९ मधुच्छन्दा वैश्वामित्रः । अग्निः। गायत्री।" or similar
  // Might not always have 4 parts, or might have multiple parts separated by "।"
  const parts = metadataStr
    .split("।")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  let sage = "Unknown Sage";
  let deity = "Unknown Deity";
  let meter = "Unknown Meter";

  if (parts.length >= 3) {
    // usually parts[0] contains a number followed by sage
    const sageMatch = parts[0].match(/^[०-९\d\s-]*([\s\S]+)$/);
    sage = sageMatch ? sageMatch[1].trim() : parts[0];

    deity = parts[1];
    meter = parts[2];
  } else if (parts.length === 2) {
    const sageMatch = parts[0].match(/^[०-९\d\s-]*([\s\S]+)$/);
    sage = sageMatch ? sageMatch[1].trim() : parts[0];
    deity = parts[1];
  } else if (parts.length === 1) {
    const sageMatch = parts[0].match(/^[०-९\d\s-]*([\s\S]+)$/);
    sage = sageMatch ? sageMatch[1].trim() : parts[0];
  }

  return { sage, deity, meter };
}

(async () => {
  try {
    console.log("Fetching DharmicData Rigveda Mandala 1...");
    const sanskritData = await fetchJson(
      "https://raw.githubusercontent.com/bhavykhatri/DharmicData/main/Rigveda/rigveda_mandala_1.json"
    );

    console.log("Fetching Indra AI Rigveda Mandala 1...");
    let englishDataRes = await fetchJson(
      "https://raw.githubusercontent.com/indraai/deva.veda/master/data/rigveda/books/01.json"
    );
    let englishData = englishDataRes.data; // array of suktas

    const formattedVerses = [];

    // We only want the first 10 Suktas as per instructions
    const suktasToProcess = Math.min(10, sanskritData.length);
    console.log(`Processing ${suktasToProcess} Suktas...`);

    for (let i = 0; i < suktasToProcess; i++) {
      const suktaObj = sanskritData[i];
      const suktaNum = suktaObj.sukta;

      // Split the raw text block into lines
      let rawLines = suktaObj.text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      let metadataStr = "";
      let verseLines = [];

      // first line is usually metadata
      if (!rawLines[0].includes("॥")) {
        metadataStr = rawLines[0];
        verseLines = rawLines.slice(1);
      } else {
        verseLines = rawLines;
      }

      const meta = parseSuktaMetadata(metadataStr);

      // get english data for this sukta
      // key is "01001", "01002" etc.
      const suktaKeyStr = "01" + String(suktaNum).padStart(3, "0");
      const enSukta = englishData.find((e) => e.key === suktaKeyStr);
      let enVerses = [];
      if (enSukta && enSukta.content) {
        // split by "p: "
        enVerses = enSukta.content
          .split("p:")
          .map((v) => v.trim())
          .filter((v) => v.length > 0);
      }

      // Iterate over verses in Sanskrit
      // Sometimes one line has multiple verses, or verses are spread. Usually they end in ॥१॥, ॥२॥
      // Let's rely on verseLines array where usually each line is a verse.
      let vCounter = 1;
      for (let j = 0; j < verseLines.length; j++) {
        const line = verseLines[j];
        const match = line.match(/॥(\d+|[०-९]+)॥/); // look for ॥1॥ or ॥१॥
        let _verseNumStr = String(vCounter);
        if (match) {
          // It has an explicit number
          // We'll just use vCounter sequentially, as it's more reliable.
          _verseNumStr = match[1]; // Store the matched number for potential future use
        }

        const enTrans = enVerses[j] || "Translation coming soon...";

        const transObj = {
          id: `rv-1-${suktaNum}-${vCounter}`,
          scriptureId: "rigveda",
          chapter: 1, // mapping chapter to Mandala
          sukta: suktaNum,
          verse: vCounter,
          sanskrit: line.replace(/॥(\d+|[०-९]+)॥/, "").trim() + "॥",
          transliteration: "Transliteration available soon...", // could add external service later
          translation: {
            en: enTrans,
          },
          speaker: meta.sage, // conventionally sage
          sage: meta.sage,
          deity: meta.deity,
          meter: meta.meter,
          keyTerms: ["Rigveda", "Veda"],
        };
        formattedVerses.push(transObj);
        vCounter++;
      }
    }

    fs.writeFileSync(
      "src/lib/data/rigveda-verses.ts",
      `import { ScriptureVerse } from "@/types/scripture";\n\nexport const rigvedaVerses: ScriptureVerse[] = ${JSON.stringify(formattedVerses, null, 2)};\n`
    );
    console.log(
      "Successfully created rigveda-verses.ts with " + formattedVerses.length + " verses!"
    );
  } catch (err) {
    console.error("Error fetching Rigveda data:", err);
  }
})();
