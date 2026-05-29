import React from "react";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Hotel,
  MapPinned,
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

  const requestItems = [
    { icon: <MapPinned size={15} />, text: "Destination" },
    { icon: <CalendarDays size={15} />, text: "Dates" },
    { icon: <Hotel size={15} />, text: "Hotel level" },
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
        </div>

        <div className="personal-trip-preview">
          <div className="personal-trip-preview-top">
            <span>
              <FileText size={18} />
            </span>
            <div>
              <p>Custom request</p>
              <strong>Plan your trip your way.</strong>
            </div>
          </div>

          <p className="personal-trip-preview-text">
            Add the basics and send one clear request to agencies.
          </p>

          <div className="personal-trip-preview-grid">
            {requestItems.map((item) => (
              <div key={item.text}>
                <span>{item.icon}</span>
                <strong>{item.text}</strong>
              </div>
            ))}
          </div>

          <button type="button" className="personal-trip-action" onClick={onCreateTrip}>
            Start custom trip
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
