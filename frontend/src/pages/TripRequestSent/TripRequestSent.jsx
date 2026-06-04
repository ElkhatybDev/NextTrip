import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  MapPin,
  Route,
  Send,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  getAgencyMatchesForRequest,
  getRequestOffers,
  getTripRequestById,
} from "../../data/userWorkspaceContent";
import "../../styles/portalPages.css";

export default function TripRequestSent() {
  const { requestId } = useParams();
  const request = getTripRequestById(requestId);
  const agencies = getAgencyMatchesForRequest(request);
  const offers = getRequestOffers(requestId);
  const activeOffers = offers.filter((offer) => offer.status !== "Needs update");

  if (!request) {
    return (
      <div className="portal-page request-sent-page">
        <Navbar />
        <main className="site-shell portal-main">
          <section className="portal-card">
            <h1>Trip request not found</h1>
            <p>This request may have been removed or the link is incorrect.</p>
            <Link to="/create-trip" className="portal-btn portal-btn-secondary">
              Create another request
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const summary = [
    { icon: MapPin, label: "Destination", value: request.destination },
    { icon: CalendarDays, label: "Dates", value: request.dates },
    { icon: UsersRound, label: "Travelers", value: request.travelers },
    { icon: WalletCards, label: "Budget", value: request.budget },
  ];

  const steps = [
    {
      title: "Request received",
      text: `Reference ${request.id} is saved in your traveler workspace.`,
      icon: CheckCircle2,
    },
    {
      title: "Agencies matched",
      text: `${agencies.length} agency workspace(s) received the brief.`,
      icon: Building2,
    },
    {
      title: "Offers in progress",
      text: activeOffers.length
        ? `${activeOffers.length} offer(s) are ready to compare.`
        : "Agencies can now prepare price, hotel, transport, and itinerary options.",
      icon: Clock3,
    },
    {
      title: "Compare offers",
      text: "You will choose the best agency offer from your request page.",
      icon: Route,
    },
  ];

  return (
    <div className="portal-page request-sent-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="request-success-panel">
          <div className="request-success-icon">
            <CheckCircle2 size={34} />
          </div>

          <div className="request-success-copy">
            <p className="portal-eyebrow">
              <Send size={14} />
              Request sent successfully
            </p>
            <h1>Your trip request is now on its way to agencies.</h1>
            <p>
              NextTrip saved your request, selected matching agencies, and opened
              the offer step. You can still view or edit the request from here.
            </p>
          </div>

          <div className="request-success-status">
            <span>Reference</span>
            <strong>{request.id}</strong>
            <small>{request.agencyDelivery?.status || "Sent to agencies"}</small>
          </div>
        </section>

        <section className="request-action-strip">
          <Link
            to={`/trip-requests/${request.id}`}
            className="request-action-card primary"
          >
            <Route size={20} />
            <span>Traveler view</span>
            <strong>Review full request</strong>
          </Link>
          <Link
            to={`/trip-requests/${request.id}/edit`}
            className="request-action-card"
          >
            <Edit3 size={20} />
            <span>Edit request</span>
            <strong>Update and resend</strong>
          </Link>
          <Link
            to={`/trip-requests/${request.id}/offers`}
            className="request-action-card"
          >
            <WalletCards size={20} />
            <span>Offers</span>
            <strong>{activeOffers.length} ready to compare</strong>
          </Link>
        </section>

        <section className="request-sent-grid">
          <article className="request-sent-card request-sent-status-card">
            <span className="portal-status">Delivery progress</span>
            <h2>What happens after send request</h2>
            <div className="request-sent-steps">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className={index < 2 ? "done" : ""}>
                    <span>
                      <Icon size={17} />
                    </span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <aside className="request-sent-card request-sent-summary-card">
            <span className="portal-status">Traveler brief</span>
            <h2>{request.title}</h2>
            <p>
              These are the main details agencies use to prepare the price and
              itinerary.
            </p>
            <div className="request-summary-grid request-sent-summary-grid">
              {summary.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="request-summary-item" key={item.label}>
                    <Icon size={17} />
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                );
              })}
            </div>
          </aside>
        </section>

        <section className="request-sent-card request-sent-agencies">
          <div className="profile-card-head">
            <div>
              <span className="portal-status">Agencies receiving request</span>
              <h2>Who can answer this trip request</h2>
              <p>
                This section shows the agencies selected by NextTrip. Their role
                is to receive the brief and send offers with price, hotel,
                transport, and itinerary.
              </p>
            </div>
            <Building2 size={28} />
          </div>
          <div className="request-agency-grid">
            {agencies.map((agency) => (
              <Link
                to={`/agency/requests/${request.id}?agency=${agency.id}`}
                className="request-agency-card"
                key={agency.id}
              >
                <img src={agency.cover} alt={agency.name} />
                <div>
                  <span>{agency.verified ? "Verified agency" : "Agency"}</span>
                  <h3>{agency.name}</h3>
                  <p>
                    <MapPin size={14} />
                    {agency.location}
                  </p>
                  <strong>{agency.responseTime}</strong>
                  <div className="portal-pill-row">
                    {agency.specialties.slice(0, 3).map((specialty) => (
                      <span className="portal-pill" key={specialty}>
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <span className="request-agency-link">
                    Open agency request form
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
