const TRAILING_HONORIFIC = new Set(["जी", "देव", "देवी"]);

/**
 * Short Sanskrit name for a routine-generator option.
 * "भगवान शिव" → "शिव". "हनुमान जी" and "सूर्य देव" keep the name, not the honorific.
 */
export function sanskritDeityToken(sanskrit: string): string {
  const words = sanskrit
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  if (words.length === 0) {
    return sanskrit.trim();
  }
  const last = words[words.length - 1];
  if (!last) {
    return sanskrit.trim();
  }
  if (words.length > 1 && TRAILING_HONORIFIC.has(last)) {
    return words[0] ?? last;
  }
  return last;
}

export function deityOptionLabel(name: string, sanskrit: string): string {
  return `${name} (${sanskritDeityToken(sanskrit)})`;
}
