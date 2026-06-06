const ARABIC_DIACRITICS_PATTERN = /[\u064B-\u065F\u0670]/g;
const LATIN_DIACRITICS_PATTERN = /[\u0300-\u036f]/g;
const ARABIC_TATWEEL_PATTERN = /\u0640/g;

export function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(LATIN_DIACRITICS_PATTERN, "")
    .replace(ARABIC_DIACRITICS_PATTERN, "")
    .replace(ARABIC_TATWEEL_PATTERN, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[ة]/g, "ه")
    .replace(/[\u2019'`´]/g, " ")
    .replace(/[؟،؛]/g, " ")
    .replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenizeText(value) {
  const normalized = normalizeText(value);

  return normalized ? normalized.split(" ").filter(Boolean) : [];
}

export function uniqueTokens(value) {
  return Array.from(new Set(tokenizeText(value)));
}

export function tokenOverlapRatio(sourceTokens, targetTokens) {
  if (!sourceTokens.length || !targetTokens.length) {
    return 0;
  }

  const sourceSet = new Set(sourceTokens);
  const matchedTokens = targetTokens.filter((token) => sourceSet.has(token));

  return matchedTokens.length / targetTokens.length;
}
