import React from "react";

export default function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-box">
        <h2>Ready to Start Your Adventure?</h2>
        <p>Join 50k+ travelers getting weekly secret deals and destination inspiration.</p>
        <div className="newsletter-form">
          <input placeholder="Your email address" />
          <button type="button">Subscribe</button>
        </div>
      </div>
    </section>
  );
}
