import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { reasonIcons } from "../icons";

export default function WhySection({ image, reasons }) {
  const tripSteps = ["Trip brief", "Agency offers", "Better decision"];

  return (
    <section id="why" className="why-section">
      <div className="why-content">
        <div className="why-copy">
          <span className="why-badge">Why choose NextTrip?</span>
          <h2 className="why-title">Clear trips before you book.</h2>
          <p className="why-text">
            Compare ready packages, personal requests, agency replies, and
            booking details in one simple travel flow.
          </p>

          <div className="why-step-row">
            {tripSteps.map((step, index) => (
              <span key={step}>
                <CheckCircle2 size={16} />
                <small>{String(index + 1).padStart(2, "0")}</small>
                {step}
              </span>
            ))}
          </div>
        </div>

        <div className="reasons-list">
          {reasons.map((item) => {
            const Icon = reasonIcons[item.icon];

            return (
              <div key={item.title} className="reason-card">
                <div className="reason-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="why-visual-wrap">
        <img src={image} alt="Travel agency team planning a trip" />
        <div className="why-floating-card">
          <span>Comparison ready</span>
          <strong>3 offers</strong>
          <p>Same request, cleaner choices.</p>
        </div>
        <span className="why-visual-action">
          See how it feels
          <ArrowRight size={16} />
        </span>
      </div>
    </section>
  );
}
