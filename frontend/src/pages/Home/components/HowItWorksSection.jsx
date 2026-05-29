import React from "react";
import { Building2, CheckCircle2, Search } from "lucide-react";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";

const stepIcons = [Search, Building2, CheckCircle2];

export default function HowItWorksSection({ steps }) {
  return (
    <section className="home-how-section" aria-labelledby="home-how-title">
      <SectionHeading
        label="How it works"
        title="From first search to clear choice"
        desc="A short flow that helps users understand the platform before they open details or create a custom request."
        centered
      />

      <div className="home-how-grid">
        {steps.map((step, index) => {
          const Icon = stepIcons[index] || CheckCircle2;

          return (
            <article key={step.title} className="home-how-card">
              <span className="home-how-count">{String(index + 1).padStart(2, "0")}</span>
              <span className="home-how-icon">
                <Icon size={20} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
