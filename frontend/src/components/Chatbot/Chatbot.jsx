import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, BotMessageSquare, RotateCcw, Send, X } from "lucide-react";
import { chatbotQuickActions, chatbotUiText } from "../../data/chatbotKnowledgeBase";
import { getSavedLanguageCode, LANGUAGE_CHANGE_EVENT } from "../../i18n/siteLanguage";
import { getChatbotReply, getNextChatbotContext } from "../../services/chatbotService";
import ChatMessage from "./ChatMessage";
import "./Chatbot.css";

const hiddenPathPrefixes = [
  "/agency-dashboard",
  "/nexttrip-dashboard",
];

function createMessage(role, text, actions = []) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    text,
    actions,
  };
}

function getLocalizedValue(value, languageCode) {
  if (typeof value === "string") {
    return value;
  }

  return value?.[languageCode] || value?.fra || value?.eng || "";
}

function getChatbotUiText(languageCode) {
  return chatbotUiText[languageCode] || chatbotUiText.fra;
}

function createInitialMessages(languageCode) {
  const uiText = getChatbotUiText(languageCode);

  return [uiText.welcome, uiText.guide]
    .filter(Boolean)
    .map((messageText) => createMessage("assistant", messageText));
}

export default function Chatbot() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const responseTimerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [languageCode, setLanguageCode] = useState(() => getSavedLanguageCode());
  const [messages, setMessages] = useState(() => createInitialMessages(getSavedLanguageCode()));
  const [conversationContext, setConversationContext] = useState({});
  const uiText = getChatbotUiText(languageCode);
  const hasInputValue = inputValue.trim().length > 0;

  const shouldHide = useMemo(
    () => hiddenPathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)),
    [pathname]
  );

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const nextLanguageCode = event.detail?.code || getSavedLanguageCode();

      window.clearTimeout(responseTimerRef.current);
      setIsBotTyping(false);
      setLanguageCode(nextLanguageCode);
      setMessages(createInitialMessages(nextLanguageCode));
      setConversationContext({});
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);

    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !listRef.current) {
      return;
    }

    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [isOpen, messages, isBotTyping]);

  useEffect(
    () => () => {
      window.clearTimeout(responseTimerRef.current);
    },
    []
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const resetConversation = () => {
    window.clearTimeout(responseTimerRef.current);
    setMessages(createInitialMessages(languageCode));
    setConversationContext({});
    setIsBotTyping(false);
    setInputValue("");
    inputRef.current?.focus();
  };

  const appendConversation = (userText, reply) => {
    window.clearTimeout(responseTimerRef.current);
    setIsBotTyping(true);
    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage("user", userText),
    ]);

    responseTimerRef.current = window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", reply.answer, reply.actions),
      ]);
      setConversationContext((currentContext) =>
        getNextChatbotContext(currentContext, userText, reply)
      );
      setIsBotTyping(false);
    }, 420);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userText = inputValue.trim();

    if (!userText || isBotTyping) {
      return;
    }

    const reply = getChatbotReply(userText, null, languageCode, conversationContext);
    appendConversation(userText, reply);
    setInputValue("");
  };

  const handleQuickAction = (action) => {
    if (isBotTyping) {
      return;
    }

    const reply = getChatbotReply(action.prompt, action.topicId, languageCode, conversationContext);
    appendConversation(getLocalizedValue(action.label, languageCode), reply);
  };

  const handleMessageAction = (action) => {
    if (!action || isBotTyping) {
      return;
    }

    if (typeof action === "string") {
      navigate(action);
      setIsOpen(false);
      return;
    }

    if (action.topicId) {
      const reply = getChatbotReply(action.label, action.topicId, languageCode, conversationContext);
      appendConversation(action.label, reply);
      return;
    }

    if (action.route) {
      navigate(action.route);
      setIsOpen(false);
    }
  };

  if (shouldHide) {
    return null;
  }

  return (
    <div ref={rootRef} className={`nt-chatbot-root ${isOpen ? "nt-chatbot-open" : ""}`}>
      {isOpen ? (
        <section
          className="nt-chatbot-window"
          role="dialog"
          aria-label={uiText.title}
          aria-modal="false"
        >
          <header className="nt-chatbot-header">
            <button
              type="button"
              className="nt-chatbot-back"
              aria-label={uiText.closeLabel}
              onClick={() => setIsOpen(false)}
            >
              <ArrowLeft size={20} />
            </button>

            <div className="nt-chatbot-brand">
              <div>
                <strong>{uiText.title}</strong>
                {uiText.subtitle ? <p>{uiText.subtitle}</p> : null}
              </div>
            </div>

            <div className="nt-chatbot-header-actions">
              <button
                type="button"
                className="nt-chatbot-more"
                aria-label={uiText.clearLabel}
                onClick={resetConversation}
              >
                <RotateCcw size={19} />
              </button>
              <button
                type="button"
                className="nt-chatbot-close"
                aria-label={uiText.closeLabel}
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </header>

          <div className="nt-chatbot-messages" ref={listRef} aria-live="polite">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onAction={handleMessageAction}
              />
            ))}

            {isBotTyping ? (
              <div className="nt-chat-typing" role="status" aria-label={uiText.typingLabel}>
                <span />
                <span />
                <span />
              </div>
            ) : null}
          </div>

          <div className="nt-chatbot-quick-actions" aria-label={uiText.quickActionsLabel}>
            {chatbotQuickActions.map((action) => (
              <button
                type="button"
                key={action.topicId}
                disabled={isBotTyping}
                onClick={() => handleQuickAction(action)}
              >
                {getLocalizedValue(action.label, languageCode)}
              </button>
            ))}
          </div>

          <form className="nt-chatbot-form" onSubmit={handleSubmit} aria-busy={isBotTyping}>
            <label>
              <span className="nt-chatbot-sr-only">{uiText.inputLabel}</span>
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={uiText.inputPlaceholder}
              />
            </label>
            <button type="submit" aria-label={uiText.sendLabel} disabled={!hasInputValue || isBotTyping}>
              <Send size={18} />
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className="nt-chatbot-toggle"
        aria-label={isOpen ? uiText.closeLabel : uiText.openLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <BotMessageSquare size={23} />
        <span>{uiText.closedLabel}</span>
      </button>
    </div>
  );
}
