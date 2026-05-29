import React from "react";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";

export default function HomeFaqSection({ faqs }) {
  return (
    <section className="home-faq-section">
      <SectionHeading
        label="Quick answers"
        title="Questions users may ask first"
        desc="Short answers near the end of the home page reduce confusion before people move to packages or custom trips."
        centered
      />

      <div className="home-faq-grid">
        {faqs.map((faq) => (
          <article key={faq.question} className="home-faq-card">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
