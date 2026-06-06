import {
  chatbotClarificationResponse,
  chatbotFallbackResponse,
  chatbotKnowledgeBase,
} from "../data/chatbotKnowledgeBase";
import { detectChatLanguage, mapSiteLanguageToReplyLanguage, normalizeReplyLanguage } from "./detectLanguage";
import { normalizeText, tokenOverlapRatio, uniqueTokens } from "./normalizeText";

const DEFAULT_SITE_LANGUAGE = "fra";
const MIN_CONFIDENT_SCORE = 3.6;
const CLARIFICATION_SCORE = 5.2;
const CLARIFICATION_GAP = 1.15;
const unsupportedLatinMarkers = new Set([
  "salam",
  "bghit",
  "baghi",
  "kifach",
  "wach",
  "fin",
  "fayn",
  "nreservi",
  "nreserver",
  "nhjez",
  "n7jez",
  "nkhless",
  "nkhlss",
  "ntabe3",
  "ntaba3",
  "dyali",
  "diali",
  "m3a",
  "3la",
  "3ndi",
  "9der",
  "n9der",
  "ndir",
  "nchof",
  "chno",
  "achno",
  "mzyan",
  "wakala",
  "taman",
  "chhal",
  "kayt7seb",
]);

function getLocalizedValue(value, languageCode) {
  if (typeof value === "string") {
    return value;
  }

  const replyLanguage = normalizeReplyLanguage(languageCode);

  return (
    value?.[replyLanguage] ||
    value?.[mapSiteLanguageToReplyLanguage(replyLanguage)] ||
    value?.fra ||
    value?.eng ||
    ""
  );
}

function localizeActions(actions = [], languageCode) {
  return actions.map((action) => ({
    ...action,
    label: getLocalizedValue(action.label, languageCode),
  }));
}

function localizeEntry(entry, languageCode, extra = {}) {
  const replyLanguage = normalizeReplyLanguage(languageCode);

  return {
    id: entry.id,
    intent: entry.intent || entry.id,
    title: entry.title,
    answer: getLocalizedValue(entry.answers || entry.answer, replyLanguage),
    actions: localizeActions(entry.actions || [], replyLanguage),
    detectedLanguage: replyLanguage,
    ...extra,
  };
}

function scorePhrase(query, queryTokens, phrase, weight) {
  const normalizedPhrase = normalizeText(phrase);

  if (!normalizedPhrase) {
    return 0;
  }

  if (query === normalizedPhrase) {
    return weight + 4;
  }

  if (normalizedPhrase.includes(" ") && query.includes(normalizedPhrase)) {
    return weight + 2;
  }

  const phraseTokens = uniqueTokens(normalizedPhrase);

  if (!phraseTokens.length) {
    return 0;
  }

  const overlapRatio = tokenOverlapRatio(queryTokens, phraseTokens);

  if (overlapRatio === 1) {
    return phraseTokens.length > 1 ? weight + 1.5 : weight;
  }

  if (phraseTokens.length > 1 && overlapRatio >= 0.72) {
    return weight * overlapRatio;
  }

  if (phraseTokens.length === 1 && queryTokens.includes(phraseTokens[0])) {
    return weight * 0.72;
  }

  return 0;
}

function scoreList(query, queryTokens, values = [], weight, cap) {
  const score = values.reduce(
    (total, value) => total + scorePhrase(query, queryTokens, value, weight),
    0
  );

  return Math.min(score, cap);
}

function getContextScore(entry, queryTokens, context) {
  if (!context?.lastIntent) {
    return 0;
  }

  const isRelatedContext = entry.contextIntents?.includes(context.lastIntent);
  const isSameContext = entry.id === context.lastIntent || entry.intent === context.lastIntent;
  const shortFollowUp = queryTokens.length > 0 && queryTokens.length <= 5;

  if (isSameContext && shortFollowUp) {
    return 1.2;
  }

  if (isRelatedContext) {
    return shortFollowUp ? 1.4 : 0.75;
  }

  return 0;
}

function scoreEntry(query, queryTokens, entry, context) {
  return (
    scorePhrase(query, queryTokens, entry.title, 1.2) +
    scoreList(query, queryTokens, entry.keywords, 3.2, 13) +
    scoreList(query, queryTokens, entry.synonyms, 3.8, 13) +
    scoreList(query, queryTokens, entry.examples, 4.3, 12) +
    scoreList(query, queryTokens, entry.related, 0.9, 3) +
    getContextScore(entry, queryTokens, context)
  );
}

function rankIntents(message, context) {
  const query = normalizeText(message);
  const queryTokens = uniqueTokens(query);

  if (!query) {
    return [];
  }

  return chatbotKnowledgeBase
    .map((entry) => ({
      entry,
      score: scoreEntry(query, queryTokens, entry, context),
    }))
    .sort((a, b) => b.score - a.score);
}

function hasUnsupportedLatinDarija(message) {
  if (/[\u0600-\u06FF]/.test(String(message || ""))) {
    return false;
  }

  const query = normalizeText(message);
  const queryTokens = uniqueTokens(query);

  return (
    queryTokens.some((token) => unsupportedLatinMarkers.has(token)) ||
    /\b(n|t)(reservi|reserver|hjez|khless|tabe3|dir|chof)\b/.test(query)
  );
}

function buildClarificationReply(matches, languageCode) {
  const replyLanguage = normalizeReplyLanguage(languageCode);
  const actions = matches.slice(0, 3).map(({ entry }) => ({
    label: entry.label || entry.title,
    topicId: entry.id,
  }));

  return localizeEntry(chatbotClarificationResponse, replyLanguage, {
    actions: localizeActions(actions, replyLanguage),
    candidates: matches.slice(0, 3).map(({ entry, score }) => ({
      id: entry.id,
      intent: entry.intent,
      score,
    })),
  });
}

function shouldClarify(topMatch, secondMatch) {
  if (!topMatch || !secondMatch) {
    return false;
  }

  if (topMatch.score < CLARIFICATION_SCORE || secondMatch.score < CLARIFICATION_SCORE) {
    return false;
  }

  if (topMatch.entry.intent === secondMatch.entry.intent) {
    return false;
  }

  return topMatch.score - secondMatch.score <= CLARIFICATION_GAP;
}

export function getSmartChatbotReply(
  message,
  forcedTopicId,
  siteLanguageCode = DEFAULT_SITE_LANGUAGE,
  context = {}
) {
  const replyLanguage = mapSiteLanguageToReplyLanguage(siteLanguageCode);

  if (forcedTopicId) {
    const forcedEntry = chatbotKnowledgeBase.find(
      (entry) => entry.id === forcedTopicId || entry.intent === forcedTopicId
    );

    if (forcedEntry) {
      return localizeEntry(forcedEntry, replyLanguage, { score: Infinity, forced: true });
    }
  }

  if (hasUnsupportedLatinDarija(message)) {
    return localizeEntry(chatbotFallbackResponse, replyLanguage, {
      score: 0,
      rejectedLanguage: "darija-latin",
      candidates: [],
    });
  }

  const rankedMatches = rankIntents(message, context);
  const topMatch = rankedMatches[0];
  const secondMatch = rankedMatches[1];

  if (!topMatch || topMatch.score < MIN_CONFIDENT_SCORE) {
    return localizeEntry(chatbotFallbackResponse, replyLanguage, {
      score: topMatch?.score || 0,
      candidates: rankedMatches.slice(0, 3).map(({ entry, score }) => ({
        id: entry.id,
        intent: entry.intent,
        score,
      })),
    });
  }

  if (shouldClarify(topMatch, secondMatch)) {
    return buildClarificationReply([topMatch, secondMatch], replyLanguage);
  }

  return localizeEntry(topMatch.entry, replyLanguage, {
    score: topMatch.score,
    candidates: rankedMatches.slice(0, 3).map(({ entry, score }) => ({
      id: entry.id,
      intent: entry.intent,
      score,
    })),
  });
}

export function createNextChatbotContext(currentContext, userText, reply) {
  const nextIntent = reply?.intent && reply.intent !== "unknown-question" ? reply.intent : currentContext?.lastIntent;

  return {
    ...currentContext,
    lastIntent: nextIntent,
    lastTopicId: reply?.id || currentContext?.lastTopicId || "",
    lastLanguage: reply?.detectedLanguage || detectChatLanguage(userText, DEFAULT_SITE_LANGUAGE),
    turns: (currentContext?.turns || 0) + 1,
  };
}

export function getChatbotDebugMatch(message, siteLanguageCode = DEFAULT_SITE_LANGUAGE, context = {}) {
  return {
    language: detectChatLanguage(message, siteLanguageCode),
    matches: rankIntents(message, context).slice(0, 5).map(({ entry, score }) => ({
      id: entry.id,
      intent: entry.intent,
      score,
    })),
  };
}
