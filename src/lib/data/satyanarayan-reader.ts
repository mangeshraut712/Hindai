import source from "./satyanarayan-katha.json";

export interface SatyanarayanReadingChapter {
  number: number;
  original: string[];
  hindi: string[];
  sourceUrl: string;
}

function paragraphs(text: string, preserveLines = false): string[] {
  return text
    .split(/\n\s*\n/)
    .map((part) =>
      part
        .split("\n")
        .map((line) => line.replace(/[ \t]+/g, " ").trim())
        .filter(Boolean)
        .join(preserveLines ? "\n" : " ")
        .trim()
        .replace(/^\"+/, "")
    )
    .filter(Boolean);
}

function readChapter(number: number, text: string, sourceUrl: string): SatyanarayanReadingChapter {
  if (number < 5) {
    const marker = text.indexOf("अनुवाद:-");
    if (marker < 0) throw new Error(`Satyanarayan chapter ${number} has no Hindi marker`);
    const originalText =
      number === 1 ? text.slice(text.indexOf("॥अथ-कथा॥"), marker) : text.slice(0, marker);
    return {
      number,
      original: paragraphs(originalText, true),
      hindi: paragraphs(text.slice(marker).replace(/^अनुवाद:-/, "")),
      sourceUrl,
    };
  }

  // The fifth source page alternates Sanskrit verses with Hindi explanations.
  // These block positions select its 24 numbered Sanskrit verses and colophon.
  // Keep the untouched community transcription in satyanarayan-katha.json.
  const blocks = text.split(/\n\s*\n/);
  if (blocks.length !== 55 || !blocks[35]?.includes("शतानन्दो")) {
    throw new Error("Satyanarayan chapter 5 source layout changed; review its extraction");
  }
  const verse19 = blocks[35].slice(blocks[35].indexOf("शतानन्दो"));
  const originalBlocks = [
    ...blocks.slice(0, 5),
    ...blocks.slice(10, 14),
    ...blocks.slice(18, 22),
    ...blocks.slice(26, 31),
    verse19,
    blocks[37],
    blocks[39],
    blocks[41],
    blocks[43],
    blocks[45],
    blocks[52],
  ];
  const excluded = new Set([
    0, 1, 2, 3, 4, 10, 11, 12, 13, 18, 19, 20, 21, 26, 27, 28, 29, 30, 37, 39, 41, 43, 45, 52, 54,
  ]);
  const hindiBlocks = blocks
    .filter((_, index) => !excluded.has(index))
    .map((block) =>
      block.includes("__________") ? block.slice(0, block.indexOf("__________")) : block
    );
  return {
    number,
    original: paragraphs(originalBlocks.join("\n\n"), true),
    hindi: paragraphs(hindiBlocks.join("\n\n")),
    sourceUrl,
  };
}

const PROSE_MARKER =
  /(?:आता|म्हण|विचार|सांग|करुन|करून|होउन|होऊन|आहे|होता|कथेचा|अध्याय|बोले|कहा|सुनें|सुना)/;

export type ReadingBlock =
  | { kind: "heading"; text: string }
  | { kind: "verse"; text: string }
  | { kind: "meaning"; text: string };

function classifyReading(paragraph: string): ReadingBlock {
  if (paragraph.length < 48 && !paragraph.includes("।"))
    return { kind: "heading", text: paragraph };
  const prose = PROSE_MARKER.test(paragraph);
  const verse = (paragraph.includes("॥") || paragraph.includes("।।")) && !prose;
  return { kind: verse ? "verse" : "meaning", text: paragraph };
}

/** The Marathi book prints a Sanskrit verse, then its meaning. Keep those roles apart. */
export function readingBlocks(paragraphs: string[], separateVerses: boolean): ReadingBlock[] {
  if (!separateVerses) return paragraphs.map((text) => ({ kind: "meaning", text }));
  const blocks: ReadingBlock[] = [];
  for (const paragraph of paragraphs) {
    const marker = paragraph.search(PROSE_MARKER);
    const head = marker > 12 ? paragraph.slice(0, marker).trim() : "";
    const tail = marker > 12 ? paragraph.slice(marker).trim() : "";
    if (head && tail && (head.includes("॥") || head.includes("।"))) {
      blocks.push({ kind: "verse", text: head });
      blocks.push(classifyReading(tail));
      continue;
    }
    blocks.push(classifyReading(paragraph));
  }
  return blocks;
}

export const SATYANARAYAN_READING_CHAPTERS: SatyanarayanReadingChapter[] = source.chapters.map(
  (chapter) => readChapter(chapter.number, chapter.text, chapter.sourceUrl)
);
