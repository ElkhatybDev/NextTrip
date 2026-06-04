import {
  chatbotFallbackResponse,
  chatbotKnowledgeBase,
} from "../data/chatbotKnowledgeBase";

const DEFAULT_LANGUAGE_CODE = "fra";

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2019']/g, " ")
    .replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeLanguageCode(code) {
  return ["fra", "eng", "ara"].includes(code) ? code : DEFAULT_LANGUAGE_CODE;
}

function getLocalizedValue(value, languageCode) {
  if (typeof value === "string") {
    return value;
  }

  const nextLanguageCode = normalizeLanguageCode(languageCode);

  return value?.[nextLanguageCode] || value?.[DEFAULT_LANGUAGE_CODE] || value?.eng || "";
}

function localizeReply(entry, languageCode) {
  const nextLanguageCode = normalizeLanguageCode(languageCode);

  return {
    id: entry.id,
    title: entry.title,
    answer: getLocalizedValue(entry.answers || entry.answer, nextLanguageCode),
    actions: (entry.actions || []).map((action) => ({
      ...action,
      label: getLocalizedValue(action.label, nextLanguageCode),
    })),
  };
}

function scoreKeyword(query, keyword) {
  const normalizedKeyword = normalizeText(keyword);

  if (!normalizedKeyword) {
    return 0;
  }

  if (query === normalizedKeyword) {
    return 8;
  }

  if (normalizedKeyword.includes(" ") && query.includes(normalizedKeyword)) {
    return 5;
  }

  const queryTokens = query.split(" ");
  const keywordTokens = normalizedKeyword.split(" ");
  const everyKeywordTokenFound = keywordTokens.every((token) => queryTokens.includes(token));

  if (everyKeywordTokenFound) {
    return keywordTokens.length > 1 ? 4 : 3;
  }

  if (query.includes(normalizedKeyword) && normalizedKeyword.length > 3) {
    return 2;
  }

  return 0;
}

function scoreEntry(query, entry) {
  const titleScore = scoreKeyword(query, entry.title);
  const keywordScore = entry.keywords.reduce(
    (score, keyword) => score + scoreKeyword(query, keyword),
    0
  );

  return titleScore + keywordScore;
}

export function getChatbotReply(message, forcedTopicId, languageCode = DEFAULT_LANGUAGE_CODE) {
  if (forcedTopicId) {
    const forcedEntry = chatbotKnowledgeBase.find((entry) => entry.id === forcedTopicId);

    if (forcedEntry) {
      return localizeReply(forcedEntry, languageCode);
    }
  }

  const query = normalizeText(message);

  if (!query) {
    return localizeReply(chatbotFallbackResponse, languageCode);
  }

  const rankedEntries = chatbotKnowledgeBase
    .map((entry) => ({
      entry,
      score: scoreEntry(query, entry),
    }))
    .sort((a, b) => b.score - a.score);

  return localizeReply(
    rankedEntries[0]?.score > 0 ? rankedEntries[0].entry : chatbotFallbackResponse,
    languageCode
  );
}
