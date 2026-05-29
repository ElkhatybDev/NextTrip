import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Handshake,
  Headphones,
  LayoutDashboard,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { serviceCatalog } from "../../data/servicesCatalog";
import "../../styles/portalPages.css";

const serviceIcons = {
  sliders: SlidersHorizontal,
  handshake: Handshake,
  support: Headphones,
  dashboard: LayoutDashboard,
};

export default function Services() {
  return (
    <div className="portal-page services-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="portal-hero services-hero">
          <div>
            <p className="portal-eyebrow">
              <Sparkles size={14} />
              NextTrip services
            </p>
            <h1>Services for travelers and agencies.</h1>
            <p>
              Keep custom requests, agency matching, booking support, and agency
              workspace tools clear before backend integration.
            </p>
          </div>
          <div className="services-hero-panel">
            <span>Backend-ready flow</span>
            <strong>4 core services</strong>
            <p>Clean data, clear UI, and routes ready for API integration.</p>
            <Link to="/create-trip" className="portal-btn portal-btn-primary">
              Create trip
            </Link>
          </div>
        </section>

        <section className="services-grid">
          {serviceCatalog.map((service, index) => {
            const Icon = serviceIcons[service.icon] || Sparkles;

            return (
            <article className="portal-card service-card" key={service.slug}>
              <div className="service-card-top">
                <div className="service-icon">
                  <Icon size={24} />
                </div>
                <span>0{index + 1}</span>
              </div>
              <span className="portal-status">{service.eyebrow}</span>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <div className="portal-pill-row">
                <span className="portal-pill">{service.bestFor}</span>
              </div>
              <Link
                to={`/services/${service.slug}`}
                className="service-link"
              >
                View service
                <ArrowRight size={16} />
              </Link>
            </article>
            );
          })}
        </section>
      </main>
      <Footer />
    </div>
  );
}
