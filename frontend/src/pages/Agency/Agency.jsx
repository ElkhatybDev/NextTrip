import React from "react";
import { BarChart3, CalendarCheck, MessageSquare, PackagePlus } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Agency.css";

const tools = [
  {
    icon: CalendarCheck,
    title: "Booking requests",
    text: "Receive structured client requests with destination, dates, budget, and traveler details.",
  },
  {
    icon: PackagePlus,
    title: "Package library",
    text: "Publish curated offers and keep premium packages clear for travelers.",
  },
  {
    icon: MessageSquare,
    title: "Client messages",
    text: "Keep follow-ups close to the booking flow instead of scattered conversations.",
  },
  {
    icon: BarChart3,
    title: "Simple performance",
    text: "Track active packages, response flow, and agency activity from one workspace.",
  },
];

export default function Agency() {
  return (
    <div className="agency-page">
      <Navbar />

      <main>
        <section className="agency-hero">
          <div className="site-shell agency-hero-grid">
            <div>
              <p className="agency-eyebrow">For travel agencies</p>
              <h1>Turn traveler interest into organized bookings.</h1>
              <p>
                NextTrip gives agencies a clearer way to receive requests, present
                packages, and keep communication moving without losing context.
              </p>
              <div className="agency-actions">
                <Link
                  to="/auth"
                  state={{ role: "agency", from: "/agency-dashboard" }}
                  className="agency-primary"
                >
                  Sign in as agency
                </Link>
                <Link
                  to="/auth"
                  state={{ role: "agency", activeTab: "signup" }}
                  className="agency-secondary"
                >
                  Create agency account
                </Link>
              </div>
            </div>

            <div className="agency-panel">
              <div className="agency-panel-top">
                <span>Live workspace</span>
                <strong>Atlas Voyages</strong>
              </div>
              <div className="agency-metric">
                <p>Pending requests</p>
                <strong>18</strong>
              </div>
              <div className="agency-metric agency-metric-orange">
                <p>Active packages</p>
                <strong>42</strong>
              </div>
              <div className="agency-message">New message from traveler about Kyoto route</div>
            </div>
          </div>
        </section>

        <section className="site-shell agency-tools">
          <div className="agency-section-head">
            <p>Workspace tools</p>
            <h2>Everything an agency needs to respond faster.</h2>
          </div>

          <div className="agency-tools-grid">
            {tools.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="agency-tool-card">
                  <div>
                    <Icon size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="site-shell agency-onboarding">
          <div>
            <p className="agency-eyebrow">Simple onboarding</p>
            <h2>From profile to first offer in a clear flow.</h2>
          </div>
          <div className="agency-steps">
            <span>1. Create agency profile</span>
            <span>2. Add packages</span>
            <span>3. Receive requests</span>
            <span>4. Reply and convert</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
