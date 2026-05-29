import React from "react";

export function HeartIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`action-icon ${filled ? "filled-heart" : "outline-heart"}`}
      aria-hidden="true"
    >
      <path d="M12 21s-6.7-4.35-9-8.28C1 9.4 2.46 5.9 6.3 5.35A5.2 5.2 0 0 1 12 8.06a5.2 5.2 0 0 1 5.7-2.71c3.84.55 5.3 4.05 3.3 7.37C18.7 16.65 12 21 12 21Z" />
    </svg>
  );
}

export function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="action-icon outline-heart" aria-hidden="true">
      <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5 8.76 8.76 0 0 1-3.6-.76L3 21l1.3-5.38A8.45 8.45 0 0 1 3.5 12 8.5 8.5 0 1 1 21 12Z" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="action-icon outline-heart" aria-hidden="true">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function VerifiedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="verified-icon" aria-hidden="true">
      <path d="M12 2.8l2.2 1.5 2.7-.1 1.4 2.3 2.3 1.4-.1 2.7 1.5 2.2-1.5 2.2.1 2.7-2.3 1.4-1.4 2.3-2.7-.1L12 21.2l-2.2-1.5-2.7.1-1.4-2.3-2.3-1.4.1-2.7-1.5-2.2 1.5-2.2-.1-2.7 2.3-1.4 1.4-2.3 2.7.1L12 2.8Zm-1.1 11.5 5-5-1.1-1.1-3.9 3.9-1.8-1.8-1.1 1.1 2.9 2.9Z" />
    </svg>
  );
}
