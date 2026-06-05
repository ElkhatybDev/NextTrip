import React from "react";
import "./RequestLoadingModal.css";

export default function RequestLoadingModal({
  eyebrow = "SENDING REQUEST",
  title,
  description,
  steps = [],
}) {
  return (
    <div className="request-loading-overlay" role="status" aria-live="polite">
      <div className="request-loading-card">
        <div className="request-loading-spinner" aria-hidden="true">
          <span />
        </div>
        <p className="request-loading-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        {steps.length ? (
          <div className="request-loading-steps" aria-hidden="true">
            {steps.map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
