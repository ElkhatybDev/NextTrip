import React from "react";
import { UserRound } from "lucide-react";

export default function ChatMessage({ message, onAction }) {
  const isAssistant = message.role === "assistant";

  return (
    <article
      className={`nt-chat-message ${
        isAssistant ? "nt-chat-message-assistant" : "nt-chat-message-user"
      }`}
    >
      <span className="nt-chat-message-avatar" aria-hidden="true">
        {isAssistant ? (
          <img src="/favicon.svg" alt="" decoding="async" />
        ) : (
          <UserRound size={16} />
        )}
      </span>
      <div className="nt-chat-message-body">
        {message.text.split("\n").map((line, index) =>
          line ? <p key={`${message.id}-${index}`}>{line}</p> : <br key={`${message.id}-${index}`} />
        )}

        {isAssistant && message.actions?.length ? (
          <div className="nt-chat-message-actions">
            {message.actions.map((action, index) => (
              <button
                type="button"
                key={`${message.id}-${action.label}-${index}`}
                onClick={() => onAction(action)}
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
