import React from "react";
import {
  ArrowRight,
  CalendarDays,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";

export default function PersonalTripSection({ onCreateTrip }) {
  const points = [
    {
      icon: <SlidersHorizontal size={18} />,
      title: "Choose the vibe",
      text: "Tell agencies if you want calm, adventure, culture, family comfort, or luxury.",
    },
    {
      icon: <CalendarDays size={18} />,
      title: "Set the basics",
      text: "Add destination, dates, budget, travelers, hotel level, and transport needs.",
    },
    {
      icon: <UsersRound size={18} />,
      title: "Compare replies",
      text: "Agencies answer with organized offers so you can choose without confusion.",
    },
  ];

  return (
    <section className="personal-trip-section">
      <div className="personal-trip-card">
        <div className="personal-trip-content">
          <h2>Tell agencies exactly what you need.</h2>
          <p>
            Use this when ready packages are not enough. Write the trip you want
            once, keep the details organized, and let agencies send offers that
            match your real needs.
          </p>
          <p className="personal-trip-note">
            This personal card collects your destination, date, travelers, budget,
            hotel level, transport, and preferences before any agency replies.
          </p>

          <div className="personal-trip-points">
            {points.map((point) => (
              <article key={point.title}>
                <span>{point.icon}</span>
                <div>
                  <strong>{point.title}</strong>
                  <small>{point.text}</small>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="personal-trip-action personal-trip-content-action"
            onClick={onCreateTrip}
          >
            Create Trip
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
