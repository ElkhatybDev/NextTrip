import React from "react";
import {
  Building2,
  Clock3,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../styles/portalPages.css";

const contactChannels = [
  {
    icon: Mail,
    title: "Email support",
    text: "General questions, account help, and booking clarification.",
    value: "support@nexttrip.com",
  },
  {
    icon: Building2,
    title: "Agency partnerships",
    text: "For agencies joining NextTrip or updating profile details.",
    value: "partners@nexttrip.com",
  },
  {
    icon: PhoneCall,
    title: "Travel help",
    text: "For active booking issues, include your booking reference.",
    value: "+212 6 00 00 00 00",
  },
];

const contactStats = [
  { icon: Clock3, label: "Response target", value: "Within 24 hours" },
  { icon: MessageCircle, label: "Channels", value: "Email + support" },
  { icon: MapPin, label: "Coverage", value: "Morocco and worldwide" },
];

export default function Contact() {
  return (
    <div className="portal-page contact-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="portal-hero contact-hero">
          <div>
            <p className="portal-eyebrow">
              Contact NextTrip
            </p>
            <h1>Need a real answer? Reach the right team quickly.</h1>
            <p>
              Whether you are preparing a booking, comparing agencies, or solving an
              active travel issue, this page gives you a clear way to contact us.
            </p>
          </div>

          <div className="contact-hero-card">
            <Headphones size={28} />
            <strong>Support is available</strong>
            <span>7 days a week</span>
          </div>
        </section>

        <section className="contact-stats">
          {contactStats.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.label} className="contact-stat-card">
                <Icon size={20} />
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            );
          })}
        </section>

        <section className="portal-grid portal-grid-two">
          <div className="portal-card contact-form-card">
            <span className="portal-status">Message us</span>
            <h2>Send a clear request</h2>
            <p>
              Add enough context so support can route your message without asking the
              same questions again.
            </p>
            <form className="portal-form-grid">
              <div className="portal-field">
                <label>Full name</label>
                <input placeholder="Your name" />
              </div>
              <div className="portal-field">
                <label>Email</label>
                <input type="email" placeholder="you@example.com" />
              </div>
              <div className="portal-field">
                <label>Topic</label>
                <select defaultValue="booking">
                  <option value="booking">Booking question</option>
                  <option value="agency">Agency partnership</option>
                  <option value="support">Support request</option>
                  <option value="account">Account help</option>
                </select>
              </div>
              <div className="portal-field">
                <label>Booking reference</label>
                <input placeholder="Optional" />
              </div>
              <div className="portal-field portal-field-full">
                <label>Message</label>
                <textarea placeholder="Tell us what you need help with..." />
              </div>
              <button type="button" className="contact-send-btn">
                <Send size={16} />
                Send message
              </button>
            </form>
          </div>

          <div className="contact-channel-list">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;

              return (
                <article key={channel.title} className="portal-card contact-channel-card">
                  <div className="contact-channel-icon">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3>{channel.title}</h3>
                    <p>{channel.text}</p>
                    <strong>{channel.value}</strong>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
