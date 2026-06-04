import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, MoreHorizontal, Send, X } from "lucide-react";
import nextTripLogo from "../../Assets/images/NextTrip logo.png";
import { chatbotQuickActions, chatbotUiText } from "../../data/chatbotKnowledgeBase";
import { getSavedLanguageCode, LANGUAGE_CHANGE_EVENT } from "../../i18n/siteLanguage";
import { getChatbotReply } from "../../services/chatbotService";
import ChatMessage from "./ChatMessage";
import "./Chatbot.css";

const hiddenPathPrefixes = [
  "/dashboard",
  "/nexttrip-dashboard",
  "/workspace",
  "/profile",
  "/my-bookings",
  "/trip-requests",
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

export default function Chatbot() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [languageCode, setLanguageCode] = useState(() => getSavedLanguageCode());
  const [messages, setMessages] = useState(() => [
    createMessage("assistant", getChatbotUiText(getSavedLanguageCode()).welcome),
  ]);
  const uiText = getChatbotUiText(languageCode);

  const shouldHide = useMemo(
    () => hiddenPathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)),
    [pathname]
  );

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const nextLanguageCode = event.detail?.code || getSavedLanguageCode();

      setLanguageCode(nextLanguageCode);
      setMessages([createMessage("assistant", getChatbotUiText(nextLanguageCode).welcome)]);
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
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const appendConversation = (userText, reply) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage("user", userText),
      createMessage("assistant", reply.answer, reply.actions),
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userText = inputValue.trim();

    if (!userText) {
      return;
    }

    const reply = getChatbotReply(userText, null, languageCode);
    appendConversation(userText, reply);
    setInputValue("");
  };

  const handleQuickAction = (action) => {
    const reply = getChatbotReply(action.prompt, action.topicId, languageCode);
    appendConversation(getLocalizedValue(action.label, languageCode), reply);
  };

  const handleNavigate = (route) => {
    if (!route) {
      return;
    }

    navigate(route);
    setIsOpen(false);
  };

  if (shouldHide) {
    return null;
  }

  return (
    <div className={`nt-chatbot-root ${isOpen ? "nt-chatbot-open" : ""}`}>
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
              <span className="nt-chatbot-header-icon" aria-hidden="true">
                <img src={nextTripLogo} alt="" decoding="async" />
              </span>
              <div>
                <strong>{uiText.title}</strong>
                <p>{uiText.subtitle}</p>
              </div>
            </div>

            <div className="nt-chatbot-header-actions">
              <button
                type="button"
                className="nt-chatbot-more"
                aria-label={uiText.quickActionsLabel}
                onClick={() => inputRef.current?.focus()}
              >
                <MoreHorizontal size={21} />
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
                onAction={handleNavigate}
              />
            ))}
          </div>

          <div className="nt-chatbot-quick-actions" aria-label={uiText.quickActionsLabel}>
            {chatbotQuickActions.map((action) => (
              <button
                type="button"
                key={action.topicId}
                onClick={() => handleQuickAction(action)}
              >
                {getLocalizedValue(action.label, languageCode)}
              </button>
            ))}
          </div>

          <form className="nt-chatbot-form" onSubmit={handleSubmit}>
            <label>
              <span className="nt-chatbot-sr-only">{uiText.inputLabel}</span>
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={uiText.inputPlaceholder}
              />
            </label>
            <button type="submit" aria-label={uiText.sendLabel}>
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
        <MessageCircle size={23} />
        <span>{uiText.closedLabel}</span>
      </button>
    </div>
  );
}
