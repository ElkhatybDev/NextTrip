import {
  createNextChatbotContext,
  getChatbotDebugMatch,
  getSmartChatbotReply,
} from "../utils/chatbotEngine";

export function getChatbotReply(message, forcedTopicId, languageCode, context) {
  return getSmartChatbotReply(message, forcedTopicId, languageCode, context);
}

export function getNextChatbotContext(currentContext, userText, reply) {
  return createNextChatbotContext(currentContext, userText, reply);
}

export function inspectChatbotMatch(message, languageCode, context) {
  return getChatbotDebugMatch(message, languageCode, context);
}
