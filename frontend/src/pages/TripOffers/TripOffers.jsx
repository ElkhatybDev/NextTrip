import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock3,
  Hotel,
  MapPin,
  Route,
  Send,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getAgencyById } from "../../data/agencyCatalog";
import {
  getRequestOffers,
  getTripRequestById,
  selectTripOffer,
} from "../../data/userWorkspaceContent";
import "../../styles/portalPages.css";

export default function TripOffers() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const request = getTripRequestById(requestId);
  const offers = getRequestOffers(requestId);
  const activeOffers = offers.filter((offer) => offer.status !== "Needs update");

  if (!request) {
    return (
      <div className="portal-page trip-offers-page">
        <Navbar />
        <main className="site-shell portal-main">
          <section className="portal-card">
            <h1>Trip request not found</h1>
            <p>This request may have been removed or the link is incorrect.</p>
            <Link to="/create-trip" className="portal-btn portal-btn-secondary">
              Back to create trip
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

  return (
    <div className="portal-page trip-offers-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="portal-hero plan-hero trip-offers-hero">
          <div>
            <p className="portal-eyebrow">
              <WalletCards size={14} />
              Agency offers
            </p>
            <h1>Compare agency proposals before choosing your trip.</h1>
            <p>
              Review price, hotel, transport, itinerary, and agency message. If
              the request was edited, older offers are marked as needing update.
            </p>
          </div>
          <div className="plan-hero-card">
            <Building2 size={26} />
            <span>Offers received</span>
            <strong>{activeOffers.length} active offer(s)</strong>
          </div>
          <Link to={`/trip-requests/${request.id}`} className="portal-btn portal-btn-ghost">
            <ArrowLeft size={16} />
            Request details
          </Link>
        </section>

        {offers.length === 0 ? (
          <section className="request-empty-state">
            <Clock3 size={34} />
            <span className="portal-status">Waiting for agencies</span>
            <h2>No offers yet</h2>
            <p>
              Agencies can now respond from their request brief. Once an agency
              sends an offer, it will appear here for comparison.
            </p>
            <div className="portal-actions">
              <Link
                to={`/agency/requests/${request.id}`}
                className="portal-btn portal-btn-primary"
              >
                Open agency brief
              </Link>
              <Link
                to={`/trip-requests/${request.id}/edit`}
                className="portal-btn portal-btn-secondary"
              >
                Edit request
              </Link>
            </div>
          </section>
        ) : (
          <section className="offer-comparison-grid">
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
                    {agency?.cover ? <img src={agency.cover} alt={offer.agencyName} /> : null}
                    <span className={needsUpdate ? "offer-status muted" : "offer-status"}>
                      {offer.status}
                    </span>
                  </div>
                  <div className="offer-card-body">
                    <div className="offer-card-head">
                      <div>
                        <span>{offer.agencyName}</span>
                        <h2>{offer.title}</h2>
                      </div>
                      {isSelected ? <CheckCircle2 size={26} /> : <ShieldCheck size={26} />}
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
                      {needsUpdate ? "Needs update" : isSelected ? "Selected" : "Select offer"}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
