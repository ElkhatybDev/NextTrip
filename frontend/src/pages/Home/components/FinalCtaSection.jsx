import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCtaSection({ onCreateTrip, onBrowsePackages }) {
  return (
    <section className="home-final-cta">
      <span>
        <Sparkles size={17} />
        Ready when the user is
      </span>
      <h2>Choose a package or build a personal trip.</h2>
      <p>
        Users can start simple with ready packages, then move to a custom request
        if they need more control over budget, hotel level, transport, or travel
        style.
      </p>
      <div className="home-final-actions">
        <button type="button" onClick={onBrowsePackages}>
          Browse packages
          <ArrowRight size={17} />
        </button>
        <button type="button" onClick={onCreateTrip}>
          Start custom trip
        </button>
      </div>
    </section>
  );
}
