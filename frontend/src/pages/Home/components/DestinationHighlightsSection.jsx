import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";

export default function DestinationHighlightsSection({
  destinations,
  onOpenDestination,
}) {
  return (
    <section className="home-destinations-section">
      <SectionHeading
        label="Featured destinations"
        title="Choose your next direction"
        desc="A compact destination deck across Africa, Europe, and Asia. Hover the card to open the places and compare them quickly."
        centered
      />

      <div className="home-destination-stack">
        <div className="home-destination-stack-copy">
          <span>Hover to discover</span>
          <strong>One deck, four travel moods.</strong>
        </div>

        <div className="home-destination-grid">
          {destinations.map((destination) => (
            <button
              key={destination.title}
              type="button"
              className="home-destination-card"
              onClick={() => onOpenDestination(destination)}
            >
              <img
                src={destination.image}
                alt={destination.title}
                loading="lazy"
                decoding="async"
              />
              <span className="home-destination-tag">{destination.tag}</span>
              <div className="home-destination-copy">
                <span>
                  <MapPin size={14} />
                  {destination.region}
                </span>
                <h3>{destination.title}</h3>
                <p>{destination.text}</p>
                <strong>
                  Explore destination
                  <ArrowRight size={15} />
                </strong>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
