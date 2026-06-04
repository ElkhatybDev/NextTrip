import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Heart,
  MapPin,
  PlaneTakeoff,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import {
  getTravelStylePage,
  travelStyleOrder,
  travelStylePages,
} from "../../data/travelStyleContent";
import "./TravelStyle.css";

const snapshotItems = [
  { key: "bestFor", label: "Best for", icon: UsersRound },
  { key: "budget", label: "Budget", icon: WalletCards },
  { key: "duration", label: "Duration", icon: CalendarDays },
  { key: "mood", label: "Mood", icon: Heart },
];

export default function TravelStyle() {
  const { styleSlug = "individual" } = useParams();
  const page = getTravelStylePage(styleSlug);
  const otherStyles = travelStyleOrder.filter((slug) => slug !== page.slug);

  return (
    <div className="travel-style-page">
      <Navbar />

      <main className="travel-style-main">
        <section
          className="travel-style-hero"
          style={{ backgroundImage: `url(${page.image})` }}
        >
          <div className="travel-style-hero-overlay" />
          <div className="site-shell travel-style-hero-content">
            <div className="travel-style-copy">
              <p className="travel-style-eyebrow">
                <PlaneTakeoff size={15} />
                {page.eyebrow}
              </p>
              <h1>{page.title}</h1>
              <p>{page.description}</p>
              <div className="travel-style-actions">
                <Link to="/packages" className="travel-style-primary-btn">
                  Browse packages
                </Link>
                <Link to="/create-trip" className="travel-style-secondary-btn">
                  Create custom trip
                </Link>
              </div>
            </div>

            <aside className="travel-style-feature-card">
              <MapPin size={28} />
              <span>{page.accent}</span>
              <strong>{page.duration}</strong>
              <p>{page.bestFor}</p>
            </aside>
          </div>
        </section>

        <section className="site-shell travel-style-nav">
          {travelStyleOrder.map((slug) => (
            <Link
              key={slug}
              to={`/travel-styles/${slug}`}
              className={
                slug === page.slug
                  ? "travel-style-nav-link active"
                  : "travel-style-nav-link"
              }
            >
              {travelStylePages[slug].eyebrow.replace(" Travel", "")}
            </Link>
          ))}
        </section>

        <section className="site-shell travel-style-overview">
          <div className="travel-style-snapshot-grid">
            {snapshotItems.map((item) => {
              const Icon = item.icon;

              return (
                <article className="travel-style-snapshot-card" key={item.key}>
                  <Icon size={20} />
                  <span>{item.label}</span>
                  <strong>{page[item.key]}</strong>
                </article>
              );
            })}
          </div>

          <div className="travel-style-layout">
            <section className="travel-style-panel travel-style-pillars">
              <div className="travel-style-section-head">
                <p className="travel-style-eyebrow">Planning pillars</p>
                <h2>What makes this style feel right</h2>
              </div>
              <div className="travel-style-pillar-grid">
                {page.pillars.map((pillar, index) => (
                  <article className="travel-style-pillar-card" key={pillar.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <aside className="travel-style-panel travel-style-brief-card">
              <p className="travel-style-eyebrow">Agency brief</p>
              <h2>What agencies receive</h2>
              <p>
                NextTrip turns this style into a structured request: destination,
                dates, budget, travelers, services, pace, and notes. That makes agency
                replies easier to compare.
              </p>
              <Link to="/create-trip" className="travel-style-inline-link">
                Build this request
              </Link>
            </aside>
          </div>

          <div className="travel-style-layout travel-style-bottom-layout">
            <section className="travel-style-panel travel-style-itinerary-card">
              <div className="travel-style-section-head">
                <p className="travel-style-eyebrow">Sample rhythm</p>
                <h2>A simple trip flow</h2>
              </div>
              <div className="travel-style-timeline">
                {page.itinerary.map((step, index) => (
                  <div key={step}>
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="travel-style-panel travel-style-inclusions-card">
              <div className="travel-style-section-head">
                <p className="travel-style-eyebrow">Included ideas</p>
                <h2>Useful options to compare</h2>
              </div>
              <div className="travel-style-inclusion-list">
                {page.inclusions.map((item) => (
                  <p key={item}>
                    <CheckCircle2 size={17} />
                    {item}
                  </p>
                ))}
              </div>
            </section>
          </div>

          <section className="travel-style-cta">
            <div>
              <p className="travel-style-eyebrow">Explore more styles</p>
              <h2>Switch the travel mood without losing the platform structure.</h2>
            </div>
            <div className="travel-style-related">
              {otherStyles.slice(0, 3).map((slug) => (
                <Link key={slug} to={`/travel-styles/${slug}`}>
                  {travelStylePages[slug].eyebrow}
                </Link>
              ))}
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
