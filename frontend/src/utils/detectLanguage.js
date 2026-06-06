import { normalizeText, tokenizeText } from "./normalizeText";

const supportedReplyLanguages = ["fra", "eng", "ara"];

const frenchMarkers = new Set([
  "bonjour",
  "salut",
  "comment",
  "je",
  "veux",
  "voir",
  "forfait",
  "forfaits",
  "reservation",
  "reserver",
  "paiement",
  "payer",
  "agence",
  "compte",
  "suivre",
  "personnalise",
  "personnalisee",
  "voyage",
]);

const englishMarkers = new Set([
  "hello",
  "hi",
  "how",
  "can",
  "where",
  "want",
  "show",
  "package",
  "packages",
  "booking",
  "book",
  "payment",
  "pay",
  "agency",
  "dashboard",
  "track",
  "custom",
  "trip",
]);

function scoreMarkers(tokens, markerSet) {
  return tokens.reduce((score, token) => score + (markerSet.has(token) ? 1 : 0), 0);
}

export function normalizeReplyLanguage(code) {
  return supportedReplyLanguages.includes(code) ? code : "fra";
}

export function mapSiteLanguageToReplyLanguage(code) {
  if (code === "eng" || code === "ara") {
    return code;
  }

  return "fra";
}

export function detectChatLanguage(value, fallbackCode = "fra") {
  const rawText = String(value || "");

  if (/[\u0600-\u06FF]/.test(rawText)) {
    return "ara";
  }

  const normalizedText = normalizeText(rawText);
  const tokens = tokenizeText(normalizedText);
  const frenchScore = scoreMarkers(tokens, frenchMarkers);
  const englishScore = scoreMarkers(tokens, englishMarkers);

  if (englishScore > frenchScore) {
    return "eng";
  }

  if (frenchScore > 0) {
    return "fra";
  }

  return mapSiteLanguageToReplyLanguage(fallbackCode);
}
