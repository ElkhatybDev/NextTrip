import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Hotel,
  MapPin,
  Route,
  Send,
  ShieldCheck,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getAgencyById } from "../../data/agencyCatalog";
import {
  getAgencyMatchesForRequest,
  getRequestOffers,
  getTripRequestById,
  selectTripOffer,
} from "../../data/userWorkspaceContent";
import "../../styles/portalPages.css";

export default function TripRequestSent() {
  const { requestId } = useParams();
  const navigate = useNavigate();
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

  const chooseOffer = (offerId) => {
    const selectedRequest = selectTripOffer(request.id, offerId);

    if (selectedRequest) {
      navigate(`/trip-requests/${request.id}/booking`);
    }
  };

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
        ? `${activeOffers.length} active offer(s) are ready to compare below.`
        : "Agencies can now prepare price, hotel, transport, and itinerary options.",
      icon: Clock3,
    },
    {
      title: "Choose and book",
      text: "Select the best proposal, then continue to the booking and payment step.",
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
            <h1>Your trip request is now in your traveler workspace.</h1>
            <p>
              NextTrip saved your request, notified matching agencies, and keeps
              every proposal in this same page so you can compare and book later.
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
          <a href="#request-offers" className="request-action-card">
            <WalletCards size={20} />
            <span>Agency offers</span>
            <strong>
              {activeOffers.length
                ? `${activeOffers.length} ready to compare`
                : "Waiting for offers"}
            </strong>
          </a>
        </section>

        <section className="request-sent-grid">
          <article className="request-sent-card request-sent-status-card">
            <span className="portal-status">Delivery progress</span>
            <h2>How this request moves</h2>
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
              <span className="portal-status">Agencies notified</span>
              <h2>Who can answer this trip request</h2>
              <p>
                Travelers only see the agencies selected by NextTrip. The agency
                reply form stays in the protected agency workspace.
              </p>
            </div>
            <Building2 size={28} />
          </div>
          <div className="request-agency-grid">
            {agencies.map((agency) => (
              <article className="request-agency-card" key={agency.id}>
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
                    Agency notified
                    <CheckCircle2 size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="request-offers" className="request-offers-section">
          <div className="request-offers-head">
            <div>
              <span className="portal-status">Agency proposals</span>
              <h2>Compare offers from agencies</h2>
              <p>
                This is the same traveler page after the request is sent. Once
                agencies answer, their offers appear here for selection.
              </p>
            </div>
            <div className="request-offers-stat">
              <WalletCards size={22} />
              <span>{activeOffers.length}</span>
              <strong>active offer(s)</strong>
            </div>
          </div>

          {offers.length === 0 ? (
            <section className="request-empty-state request-offers-empty">
              <Clock3 size={34} />
              <span className="portal-status">Waiting for agencies</span>
              <h2>No offers yet</h2>
              <p>
                The traveler stays on this page while agencies prepare their
                proposals in the protected agency workspace.
              </p>
              <div className="portal-actions">
                <Link
                  to={`/trip-requests/${request.id}/edit`}
                  className="portal-btn portal-btn-primary"
                >
                  Edit request
                </Link>
                <Link
                  to={`/trip-requests/${request.id}`}
                  className="portal-btn portal-btn-secondary"
                >
                  Review request
                </Link>
              </div>
            </section>
          ) : (
            <section className="offer-comparison-grid request-offers-grid">
              {offers.map((offer) => {
                const agency = getAgencyById(offer.agencyId);
                const isSelected = request.selectedOfferId === offer.id;
                const needsUpdate = offer.status === "Needs update";
                const itineraryLines = String(offer.itinerary || "")
                  .split("\n")
                  .filter(Boolean);

                return (
                  <article
                    className={
                      isSelected ? "offer-card offer-card-selected" : "offer-card"
                    }
                    key={offer.id}
                  >
                    <div className="offer-card-cover">
                      {agency?.cover ? (
                        <img src={agency.cover} alt={offer.agencyName} />
                      ) : null}
                      <span
                        className={needsUpdate ? "offer-status muted" : "offer-status"}
                      >
                        {isSelected ? "Selected" : offer.status}
                      </span>
                    </div>
                    <div className="offer-card-body">
                      <div className="offer-card-head">
                        <div>
                          <span>{offer.agencyName}</span>
                          <h2>{offer.title}</h2>
                        </div>
                        {isSelected ? (
                          <CheckCircle2 size={26} />
                        ) : (
                          <ShieldCheck size={26} />
                        )}
                      </div>

                      <div className="offer-price-row">
                        <div>
                          <span>Total price</span>
                          <strong>{offer.totalPrice}</strong>
                        </div>
                        <div>
                          <span>Deposit</span>
                          <strong>{offer.deposit}</strong>
                        </div>
                      </div>

                      <div className="offer-detail-list">
                        <p>
                          <Hotel size={16} />
                          {offer.hotelPlan}
                        </p>
                        <p>
                          <Route size={16} />
                          {offer.transportPlan}
                        </p>
                        {agency?.location ? (
                          <p>
                            <MapPin size={16} />
                            {agency.location}
                          </p>
                        ) : null}
                      </div>

                      <div className="offer-itinerary">
                        <span>Itinerary</span>
                        {itineraryLines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>

                      <div className="offer-message">
                        <span>Agency message</span>
                        <p>{offer.message}</p>
                      </div>

                      <button
                        type="button"
                        className="portal-btn portal-btn-primary"
                        disabled={needsUpdate}
                        onClick={() => chooseOffer(offer.id)}
                      >
                        <Send size={16} />
                        {needsUpdate
                          ? "Needs update"
                          : isSelected
                            ? "Continue booking"
                            : "Select offer"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
