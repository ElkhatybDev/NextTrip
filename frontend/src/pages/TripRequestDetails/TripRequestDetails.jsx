import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Route,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getTripRequestById } from "../../data/userWorkspaceContent";
import "../../styles/portalPages.css";

export default function TripRequestDetails() {
  const { requestId } = useParams();
  const request = getTripRequestById(requestId);

  if (!request) {
    return (
      <div className="portal-page request-detail-page">
        <Navbar />
        <main className="site-shell portal-main">
          <section className="portal-card">
            <h1>Trip request not found</h1>
            <p>This request may have been removed or the link is incorrect.</p>
            <Link to="/profile" className="portal-btn portal-btn-secondary">
              Back to profile
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const requestSummary = [
    { icon: MapPin, label: "Destination", value: request.destination },
    { icon: CalendarDays, label: "Dates", value: request.dates },
    { icon: UsersRound, label: "Travelers", value: request.travelers },
    { icon: WalletCards, label: "Budget", value: request.budget },
    { icon: Sparkles, label: "Mood", value: request.mood },
    { icon: Route, label: "Pace", value: request.pace },
  ];

  return (
    <div className="portal-page request-detail-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="portal-hero plan-hero request-detail-hero">
          <div>
            <p className="portal-eyebrow">
              <Route size={14} />
              Trip request details
            </p>
            <h1>{request.title}</h1>
            <p>{request.notes}</p>
          </div>
          <div className="plan-hero-card">
            <Clock3 size={26} />
            <span>Current status</span>
            <strong>{request.status}</strong>
          </div>
          <Link to="/profile" className="portal-btn portal-btn-ghost">
            <ArrowLeft size={16} />
            Back to profile
          </Link>
        </section>

        <section className="request-detail-layout">
          <article className="request-detail-card request-main-card">
            <div className="profile-card-head">
              <div>
                <span className="portal-status">Request summary</span>
                <h2>Everything agencies need before they reply</h2>
              </div>
              <CheckCircle2 size={28} />
            </div>
            <div className="request-summary-grid">
              {requestSummary.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="request-summary-item" key={item.label}>
                    <Icon size={17} />
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                );
              })}
              <div className="request-summary-item request-summary-wide">
                <Sparkles size={17} />
                <span>Stay</span>
                <strong>{request.accommodation}</strong>
              </div>
            </div>
          </article>

          <aside className="request-detail-card request-services-card">
            <span className="portal-status">Services requested</span>
            <h2>Agency checklist</h2>
            <div className="portal-pill-row">
              {request.services.map((service) => (
                <span className="portal-pill" key={service}>
                  {service}
                </span>
              ))}
            </div>
            <p>
              These services are attached to the request, so agencies can price the
              offer with fewer back-and-forth questions.
            </p>
          </aside>

          <article className="request-detail-card request-timeline-card">
            <div className="profile-card-head">
              <div>
                <span className="portal-status">Timeline</span>
                <h2>Request movement</h2>
              </div>
              <Clock3 size={28} />
            </div>
            <div className="request-timeline">
              {request.timeline.map((item, index) => (
                <div key={item.label} className={index === request.timeline.length - 1 ? "active" : ""}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{item.label}</h3>
                    <p>{item.value}</p>
                  </div>
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
