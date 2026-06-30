import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CircleOff,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { fetchPackageDetails, getPackageDetails } from "../../services/packagesService";
import "./PackageDetails.css";

function DetailList({ title, items, tone = "default" }) {
  const ListIcon = tone === "muted" ? CircleOff : CheckCircle2;

  return (
    <section className={`package-detail-card package-detail-list package-detail-list-${tone}`}>
      <h2>{title}</h2>
      <div>
        {items.map((item) => (
          <p key={item}>
            <ListIcon size={16} />
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}

export default function PackageDetails() {
  const { id } = useParams();
  const [apiPackage, setApiPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const travelPackage = apiPackage || getPackageDetails(id);
  const isOfferDetails = Number(travelPackage?.id) >= 100;
  const backLink = isOfferDetails ? "/offers" : "/packages";
  const backLabel = isOfferDetails ? "Back to offers" : "Back to packages";

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    fetchPackageDetails(id)
      .then((item) => {
        if (isMounted) {
          setApiPackage(item);
        }
      })
      .catch(() => {
        if (isMounted) {
          setApiPackage(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading && !travelPackage) {
    return (
      <div className="package-detail-page">
        <Navbar />
        <main className="site-shell package-detail-empty">
          <h1>Loading package...</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (!travelPackage) {
    return (
      <div className="package-detail-page">
        <Navbar />
        <main className="site-shell package-detail-empty">
          <h1>Package not found</h1>
          <p>This package may have been removed or the link is incorrect.</p>
          <Link to="/packages">Back to packages</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="package-detail-page">
      <Navbar />

      <main>
        <section className="package-detail-hero">
          <img src={travelPackage.image} alt={travelPackage.title} decoding="async" />
          <div className="package-detail-overlay" />
          <div className="site-shell package-detail-hero-content">
            <Link to={backLink} className="package-detail-back">
              <ArrowLeft size={16} />
              {backLabel}
            </Link>
            <p className="package-detail-eyebrow">{travelPackage.dealTag}</p>
            <h1>{travelPackage.title}</h1>
            <p>{travelPackage.details}</p>
          </div>
        </section>

        <section className="site-shell package-detail-summary">
          <div className="package-summary-item">
            <MapPin size={20} />
            <span>{travelPackage.location}</span>
          </div>
          <div className="package-summary-item">
            <CalendarDays size={20} />
            <span>{travelPackage.duration}</span>
          </div>
          <div className="package-summary-item">
            <Users size={20} />
            <span>{travelPackage.groupSize}</span>
          </div>
          <div className="package-summary-item">
            <Star size={20} />
            <span>{travelPackage.rating} rating</span>
          </div>
        </section>

        <section className="site-shell package-detail-layout">
          <div className="package-detail-main">
            <section className="package-detail-card">
              <p className="package-detail-eyebrow">Trip overview</p>
              <h2>What makes this deal worth checking</h2>
              <p className="package-detail-text">{travelPackage.description}</p>
              <div className="package-highlight-grid">
                {travelPackage.highlights.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </section>

            <section className="package-detail-card">
              <h2>Suggested itinerary</h2>
              <div className="package-itinerary">
                {travelPackage.itinerary.map((item) => (
                  <article key={item.title}>
                    <span>{item.title}</span>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="package-detail-two-col">
              <DetailList title="What's included" items={travelPackage.includes} />
              <DetailList
                title="Not included"
                items={travelPackage.notIncluded}
                tone="muted"
              />
            </div>

            <div className="package-detail-two-col">
              <DetailList title="Available add-ons" items={travelPackage.availableAddOns} />
              <DetailList title="Requirements" items={travelPackage.requirements} />
            </div>
          </div>

          <aside className="package-booking-panel">
            <p className="package-detail-eyebrow">Deal summary</p>
            <h2>{travelPackage.price.toLocaleString()} MAD</h2>
            <span>Starting price per traveler</span>
            <div className="package-booking-lines">
              <p>
                <strong>Agency</strong>
                {travelPackage.agency}
              </p>
              <p>
                <strong>Category</strong>
                {travelPackage.category}
              </p>
              <p>
                <strong>Difficulty</strong>
                {travelPackage.difficulty}
              </p>
              <p>
                <strong>Next departure</strong>
                {travelPackage.nextDeparture}
              </p>
            </div>
            <Link to={`/checkout/${travelPackage.id}`} className="package-detail-primary">
              Book now
            </Link>
            <Link to="/contact" className="package-detail-secondary">
              Ask about this deal
            </Link>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
