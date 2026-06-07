import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  Hotel,
  MapPin,
  Route,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  confirmTripBooking,
  getSelectedTripOffer,
  getTripRequestById,
} from "../../data/userWorkspaceContent";
import "../../styles/portalPages.css";

export default function TripBooking() {
  const { requestId } = useParams();
  const request = getTripRequestById(requestId);
  const selectedOffer = getSelectedTripOffer(requestId);
  const [confirmed, setConfirmed] = useState(request?.bookingStatus === "Ready for payment");

  if (!request || !selectedOffer) {
    return (
      <div className="portal-page trip-booking-page">
        <Navbar />
        <main className="site-shell portal-main">
          <section className="portal-card">
            <h1>No selected offer yet</h1>
            <p>Select an agency offer before preparing the booking.</p>
            <Link
              to={`/trip-requests/${requestId}/offers`}
              className="portal-btn portal-btn-secondary"
            >
              Compare offers
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const prepareBooking = () => {
    confirmTripBooking(request.id);
    setConfirmed(true);
  };

  return (
    <div className="portal-page trip-booking-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="portal-hero plan-hero trip-booking-hero">
          <div>
            <p className="portal-eyebrow">
              <CalendarCheck size={14} />
              Booking step
            </p>
            <h1>Your selected offer is ready to become a booking.</h1>
            <p>
              NextTrip keeps the agency offer, booking status, and payment step in
              one flow so the traveler can confirm without leaving the platform.
            </p>
          </div>
          <div className="plan-hero-card">
            <ShieldCheck size={26} />
            <span>Status</span>
            <strong>{confirmed ? "Ready for payment" : "Booking pending"}</strong>
          </div>
          <Link
            to={`/trip-requests/${request.id}/offers`}
            className="portal-btn portal-btn-ghost"
          >
            <ArrowLeft size={16} />
            Back to offers
          </Link>
        </section>

        <section className="trip-booking-layout">
          <article className="booking-confirm-card">
            <div className="profile-card-head">
              <div>
                <span className="portal-status">Selected offer</span>
                <h2>{selectedOffer.title}</h2>
              </div>
              <CheckCircle2 size={28} />
            </div>

            <div className="booking-offer-summary">
              <div>
                <span>Agency</span>
                <strong>{selectedOffer.agencyName}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>{selectedOffer.totalPrice}</strong>
              </div>
              <div>
                <span>Deposit</span>
                <strong>{selectedOffer.deposit}</strong>
              </div>
            </div>

            <div className="trip-booking-request-grid">
              <div>
                <MapPin size={17} />
                <span>Destination</span>
                <strong>{request.destination}</strong>
              </div>
              <div>
                <CalendarCheck size={17} />
                <span>Travel dates</span>
                <strong>{request.dates}</strong>
              </div>
              <div>
                <Users size={17} />
                <span>Travelers</span>
                <strong>{request.travelers}</strong>
              </div>
            </div>

            <div className="offer-detail-list">
              <p>
                <Hotel size={16} />
                {selectedOffer.hotelPlan}
              </p>
              <p>
                <Route size={16} />
                {selectedOffer.transportPlan}
              </p>
              <p>
                <WalletCards size={16} />
                {request.destination} | {request.dates}
              </p>
            </div>

            <div className="booking-progress-panel">
              <div className="active">
                <i />
                <span>Offer selected</span>
              </div>
              <div className={confirmed ? "active" : ""}>
                <i />
                <span>Booking prepared</span>
              </div>
              <div>
                <i />
                <span>Payment</span>
              </div>
              <div>
                <i />
                <span>Confirmed</span>
              </div>
            </div>

            {confirmed ? (
              <Link to="/checkout" className="portal-btn portal-btn-primary">
                <CreditCard size={16} />
                Continue to checkout
              </Link>
            ) : (
              <button
                type="button"
                className="portal-btn portal-btn-primary"
                onClick={prepareBooking}
              >
                <CalendarCheck size={16} />
                Prepare booking
              </button>
            )}
          </article>

          <aside className="booking-side-card">
            <span className="portal-status">Next step</span>
            <h2>{confirmed ? "Payment is ready" : "Prepare the booking"}</h2>
            <p>
              The selected agency offer stays linked to this traveler request, so the
              payment step can continue with the right destination, dates, price, and
              agency context.
            </p>
            <div className="portal-pill-row">
              <span className="portal-pill">Selected offer</span>
              <span className="portal-pill">Agency context</span>
              <span className="portal-pill">Payment step</span>
              <span className="portal-pill">Booking status</span>
            </div>
            <div className="trip-booking-secure-note">
              <ShieldCheck size={18} />
              <span>Secure checkout remains connected to this booking request.</span>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}
