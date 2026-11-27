const TRAILING_HONORIFIC = new Set(["जी", "देव", "देवी"]);

/**
 * Short Sanskrit name for a routine-generator option.
 * "भगवान शिव" → "शिव". "हनुमान जी" and "सूर्य देव" keep the name, not the honorific.
 * When an honorific comes last, the name is the word just before it, so a
 * leading honorific such as "श्री" in "श्री हनुमान जी" is not taken for the name.
 */
export function sanskritDeityToken(sanskrit: string): string {
  const words = sanskrit.trim().split(/\s+/);
  const last = words[words.length - 1] ?? "";
  if (words.length > 1 && TRAILING_HONORIFIC.has(last)) {
    return words[words.length - 2] ?? last;
  }
  return last;
}

export function deityOptionLabel(name: string, sanskrit: string): string {
  return `${name} (${sanskritDeityToken(sanskrit)})`;
}
