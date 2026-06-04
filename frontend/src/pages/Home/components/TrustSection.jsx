import React from "react";
import { BadgeCheck, FileText, ShieldCheck } from "lucide-react";

const signalIcons = [ShieldCheck, FileText, BadgeCheck];

export default function TrustSection({ signals }) {
  return (
    <section className="home-trust-section">
      <div className="home-trust-copy">
        <h2>Less noise before booking.</h2>
        <p>
          NextTrip keeps the important travel details visible: destination,
          date, travelers, trip type, agency offer, price, and support.
        </p>
      </div>

      <div className="home-trust-grid">
        {signals.map((signal, index) => {
          const Icon = signalIcons[index] || BadgeCheck;

          return (
            <article key={signal.title} className="home-trust-card">
              <span>
                <Icon size={19} />
              </span>
              <div>
                <h3>{signal.title}</h3>
                <p>{signal.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
