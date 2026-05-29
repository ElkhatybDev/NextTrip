import React from "react";
import { Link } from "react-router-dom";
import { Building2, PlaneTakeoff, Route, ShieldCheck } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./About.css";

const platformParts = [
  {
    icon: PlaneTakeoff,
    title: "Travelers explore",
    text: "Users discover destinations, compare packages, and choose the travel style that matches their plan.",
  },
  {
    icon: Building2,
    title: "Agencies respond",
    text: "Agencies receive clearer requests and manage packages, messages, and offers from a focused workspace.",
  },
  {
    icon: Route,
    title: "Trips become organized",
    text: "The journey moves from inspiration to booking with fewer scattered steps and better context.",
  },
  {
    icon: ShieldCheck,
    title: "Support keeps trust",
    text: "Help pages, policies, and communication flows make the platform safer and easier to understand.",
  },
];

export default function About() {
  return (
    <div className="about-platform-page">
      <Navbar />

      <main>
        <section className="about-platform-hero">
          <div className="site-shell about-platform-grid">
            <div>
              <p className="about-platform-eyebrow">About NextTrip</p>
              <h1>A platform that connects travelers, agencies, and better trip planning.</h1>
              <p>
                NextTrip is not just a static travel website. It is a planning platform
                where travelers can discover offers, agencies can manage requests, and
                every step becomes easier to follow.
              </p>
              <div className="about-platform-actions">
                <Link to="/packages">Explore packages</Link>
                <Link to="/agency">Agency side</Link>
              </div>
            </div>

            <div className="about-platform-card">
              <span>Platform idea</span>
              <strong>Discovery + Agency Workspace + Booking Flow</strong>
              <p>One experience for both sides of the travel journey.</p>
            </div>
          </div>
        </section>

        <section className="site-shell about-platform-section">
          <div className="about-platform-heading">
            <p>How it works</p>
            <h2>NextTrip brings the important travel pieces into one place.</h2>
          </div>

          <div className="about-platform-parts">
            {platformParts.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title}>
                  <Icon size={24} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="site-shell about-platform-statement">
          <p>Our goal</p>
          <h2>
            Make travel planning feel clear for users and manageable for agencies.
          </h2>
        </section>
      </main>

      <Footer />
    </div>
  );
}
