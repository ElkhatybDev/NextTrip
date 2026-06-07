import React from "react";
import { Clock, Headphones, Mail, MessageCircle, ShieldQuestion } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Support.css";

const helpCards = [
  {
    icon: ShieldQuestion,
    title: "Before booking",
    text: "Understand package details, included services, payment flow, and what to ask before reserving.",
  },
  {
    icon: MessageCircle,
    title: "Agency contact",
    text: "Get directed to the right agency conversation with the destination and package context included.",
  },
  {
    icon: Clock,
    title: "After booking",
    text: "Follow next steps, prepare documents, and know what information your agency needs from you.",
  },
];

const faqItems = [
  "How do I compare two packages?",
  "Can I contact an agency before booking?",
  "Where can I see booking details?",
  "How do agencies receive my request?",
];

export default function Support() {
  return (
    <div className="support-page">
      <Navbar />

      <main>
        <section className="support-hero">
          <div className="site-shell support-hero-grid">
            <div>
              <p className="support-eyebrow">
                <Headphones size={16} />
                Help Center
              </p>
              <h1>Get unstuck faster, before or after booking.</h1>
              <p>
                Help on NextTrip is built around real traveler moments: choosing,
                confirming, contacting agencies, and preparing the next step.
              </p>
            </div>
            <div className="support-contact-card">
              <Mail size={26} />
              <h2>Need direct help?</h2>
              <p>Send the package name, destination, and booking reference if you have one.</p>
              <Link to="/contact">Contact support</Link>
            </div>
          </div>
        </section>

        <section className="site-shell support-cards">
          {helpCards.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="support-card">
                <Icon size={24} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </section>

        <section className="site-shell support-faq">
          <div>
            <p className="support-eyebrow">Quick questions</p>
            <h2>Common questions travelers ask.</h2>
          </div>
          <div className="support-question-list">
            {faqItems.map((item) => (
              <Link key={item} to="/faq">
                {item}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
