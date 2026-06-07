import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./InfoPageLayout.css";

export default function InfoPageLayout({
  eyebrow,
  title,
  description,
  sections = [],
  asideTitle,
  asideItems = [],
  ctaTitle,
  ctaText,
  ctaPrimary,
  ctaSecondary,
}) {
  return (
    <div className="info-page">
      <Navbar />
      <main className="info-shell info-main">
        <section className="info-card info-header-card">
          <p className="info-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="info-description">{description}</p>

          {asideItems.length ? (
            <>
              {asideTitle ? <h2 className="info-summary-title">{asideTitle}</h2> : null}
              <div className="info-summary-grid">
                {asideItems.map((item) => (
                  <div key={item.label} className="info-summary-item">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </section>

        <div className="info-content">
          {sections.map((section) => (
            <section key={section.title} className="info-card">
              <h2>{section.title}</h2>
              {section.text ? <p>{section.text}</p> : null}
              {section.items ? (
                <div className="info-list">
                  {section.items.map((item) => (
                    <div key={item.title || item} className="info-list-item">
                      {typeof item === "string" ? (
                        <p>{item}</p>
                      ) : (
                        <>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          <div className="info-card info-cta-card">
            <h2>{ctaTitle}</h2>
            <p>{ctaText}</p>
            <div className="info-cta-actions">
              {ctaPrimary ? (
                <Link to={ctaPrimary.to} className="info-btn info-btn-primary">
                  {ctaPrimary.label}
                </Link>
              ) : null}
              {ctaSecondary ? (
                <Link to={ctaSecondary.to} className="info-btn info-btn-secondary">
                  {ctaSecondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
