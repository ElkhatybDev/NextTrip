import React, { useState } from "react";
import { subscribeNewsletter } from "../../../services/newsletterApi";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitNewsletter = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setMessage("Saisissez une adresse e-mail valide.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await subscribeNewsletter({ email, source: "home" });
      setMessage("Merci, votre e-mail est inscrit à la newsletter.");
      setEmail("");
    } catch (error) {
      setMessage(error?.data?.message || "Inscription impossible pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-box">
        <h2>Ready to Start Your Adventure?</h2>
        <p>Join 50k+ travelers getting weekly secret deals and destination inspiration.</p>
        <form className="newsletter-form" onSubmit={submitNewsletter}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Subscribe"}
          </button>
        </form>
        {message ? <p className="newsletter-message">{message}</p> : null}
      </div>
    </section>
  );
}
