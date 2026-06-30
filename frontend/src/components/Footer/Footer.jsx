import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { footerBottomLinks, footerSections } from "../../data/siteNavigation";
import logo from "../../Assets/images/NextTrip logo.png";
import { subscribeNewsletter } from "../../services/newsletterApi";

function FooterItem({ item }) {
  if (!item.to) {
    return <span className="site-footer-static">{item.label}</span>;
  }

  return (
    <Link to={item.to} className="site-footer-link">
      {item.label}
    </Link>
  );
}

export default function Footer({
  description = "Smarter travel planning with trusted agencies, curated packages, and support that stays close to every trip.",
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitNewsletter = async (event) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMessage("Enter a valid email.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await subscribeNewsletter({ email, source: "footer" });
      setMessage("Subscribed.");
      setEmail("");
    } catch (error) {
      setMessage(error?.data?.message || "Subscription failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="site-shell site-footer-grid">
        <div>
          <Link to="/" className="site-footer-brand" aria-label="NextTrip home">
            <img
              src={logo}
              alt="NextTrip"
              className="site-footer-logo"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className="site-footer-brand-text">
            Curated travel planning with direct agency support and smoother booking flows.
          </p>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h4>{section.title}</h4>
            <div className="site-footer-links">
              {section.items.map((item) => (
                <FooterItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        ))}

        <div>
          <h4>Newsletter</h4>
          <p className="site-footer-text site-footer-text-wide">{description}</p>
          <form className="site-footer-newsletter" onSubmit={submitNewsletter}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Subscribe"}
            </button>
          </form>
          {message ? <p className="site-footer-newsletter-message">{message}</p> : null}
        </div>
      </div>

      <div className="site-shell site-footer-bottom">
        <p>(c) 2026 NextTrip. All rights reserved.</p>
        <div className="site-footer-bottom-links">
          {footerBottomLinks.map((item) => (
            <Link key={item.label} to={item.to} className="site-footer-link">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
