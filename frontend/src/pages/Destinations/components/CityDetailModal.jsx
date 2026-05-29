import React from "react";
import { CalendarDays, Clock3, MapPin, Sparkles, X } from "lucide-react";

export default function CityDetailModal({ city, onClose }) {
  if (!city) {
    return null;
  }

  return (
    <div className="city-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="city-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="city-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="city-modal-close" onClick={onClose} aria-label="Close city details">
          <X size={20} />
        </button>

        <div className="city-modal-media">
          <video src={city.video} poster={city.image} controls muted loop playsInline preload="metadata" />
          <span>
            <Sparkles size={15} />
            Video preview
          </span>
        </div>

        <div className="city-modal-content">
          <p className="city-modal-eyebrow">
            <MapPin size={15} />
            {city.region} | {city.country}
          </p>
          <h2 id="city-modal-title">{city.name}</h2>
          <p>{city.summary}</p>

          <div className="city-modal-meta">
            <div>
              <Clock3 size={18} />
              <span>Recommended duration</span>
              <strong>{city.duration}</strong>
            </div>
            <div>
              <CalendarDays size={18} />
              <span>Best season</span>
              <strong>{city.season}</strong>
            </div>
          </div>

          <div className="city-modal-info">
            <span>Best for</span>
            <strong>{city.bestFor}</strong>
          </div>

          <div className="city-modal-highlights">
            {city.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
