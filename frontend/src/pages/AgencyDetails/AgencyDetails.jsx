import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getAgencyById } from "../../data/agencyCatalog";
import "../../styles/portalPages.css";

export default function AgencyDetails() {
  const { agencyId } = useParams();
  const agency = getAgencyById(agencyId);

  if (!agency) {
    return (
      <div className="portal-page agency-detail-page">
        <Navbar />
        <main className="site-shell portal-main">
          <section className="portal-card">
            <h1>Agency not found</h1>
            <p>This agency profile is not available.</p>
            <Link to="/agency" className="portal-btn portal-btn-secondary">
              Back to agency page
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="portal-page agency-detail-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section
          className="agency-detail-cover"
          style={{ backgroundImage: `url(${agency.cover})` }}
        >
          <div>
            <p className="portal-eyebrow">{agency.verified ? "Verified agency" : "Agency"}</p>
            <h1>{agency.name}</h1>
            <p>{agency.tagline}</p>
          </div>
        </section>

        <section className="portal-grid portal-grid-two">
          <article className="portal-card">
            <h2>Agency profile</h2>
            <p>{agency.location}</p>
            <div className="portal-kpi-grid">
              {agency.stats.map((item) => (
                <div className="portal-kpi" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className="portal-pill-row">
              {agency.specialties.map((item) => (
                <span className="portal-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="portal-card">
            <h2>Contact summary</h2>
            <div className="portal-summary-grid">
              <div className="portal-summary-item">
                <span>Rating</span>
                <strong>{agency.rating}</strong>
              </div>
              <div className="portal-summary-item">
                <span>Response time</span>
                <strong>{agency.responseTime}</strong>
              </div>
            </div>
            <div className="portal-inline-actions">
              <Link to="/contact" className="portal-btn portal-btn-secondary">
                Contact agency
              </Link>
              <Link
                to="/auth"
                state={{ role: "agency", from: "/dashboard" }}
                className="portal-btn portal-btn-secondary"
              >
                Agency sign in
              </Link>
            </div>
          </article>
        </section>

        <section className="portal-grid portal-grid-two">
          <article className="portal-card">
            <h2>Services</h2>
            <div className="portal-list">
              {agency.services.map((service) => (
                <div className="portal-list-item" key={service}>
                  <h3>{service}</h3>
                  <p>Available through this agency profile.</p>
                </div>
              ))}
            </div>
          </article>

          <article className="portal-card">
            <h2>Known packages</h2>
            <div className="portal-list">
              {agency.packages.map((item) => (
                <div className="portal-list-item" key={item}>
                  <h3>{item}</h3>
                  <p>Ask the agency for availability and price details.</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
