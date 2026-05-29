import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, CreditCard, MapPin, PackageCheck, PlaneTakeoff } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { bookingRecords } from "../../data/userWorkspaceContent";
import "../../styles/portalPages.css";

export default function MyBookings() {
  const featuredBooking = bookingRecords[0];
  const otherBookings = bookingRecords.slice(1);

  return (
    <div className="portal-page bookings-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="portal-hero plan-hero bookings-hero">
          <div>
            <p className="portal-eyebrow">
              <PackageCheck size={14} />
              My bookings
            </p>
            <h1>Track reservations, payments, and next steps.</h1>
            <p>
              A simple traveler view for booking status, receipts, package details, and
              agency follow-up.
            </p>
          </div>
          <div className="plan-hero-card">
            <PlaneTakeoff size={26} />
            <span>Active trips</span>
            <strong>{bookingRecords.length} bookings tracked</strong>
          </div>
          <Link to="/packages" className="portal-btn portal-btn-primary">
            Browse packages
          </Link>
        </section>

        <section className="booking-board">
          <article className="booking-feature-card">
            <div>
              <span className="portal-status">Featured booking</span>
              <h2>{featuredBooking.title}</h2>
              <p>
                <MapPin size={15} />
                {featuredBooking.location}
              </p>
            </div>
            <div className="booking-progress">
              {["Request", "Payment", "Confirmed", "Travel"].map((step, index) => (
                <div key={step} className={index < 3 ? "active" : ""}>
                  <i />
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="booking-feature-summary">
              <div>
                <span>Date</span>
                <strong>{featuredBooking.travelDate}</strong>
              </div>
              <div>
                <span>Travelers</span>
                <strong>{featuredBooking.travelers}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>{featuredBooking.total.toLocaleString()} MAD</strong>
              </div>
            </div>
            <div className="portal-inline-actions">
              <Link
                to={`/packages/${featuredBooking.packageId}`}
                className="portal-btn portal-btn-secondary"
              >
                Package details
              </Link>
              <Link
                to={`/checkout/${featuredBooking.packageId}`}
                className="portal-btn portal-btn-secondary"
              >
                Checkout
              </Link>
            </div>
          </article>

          <div className="booking-side-list">
            {otherBookings.map((booking) => (
              <article className="portal-card booking-plan-card" key={booking.id}>
                <div className="booking-plan-top">
                  <span className="portal-status">{booking.status}</span>
                  <strong>{booking.paymentStatus}</strong>
                </div>
                <h2>{booking.title}</h2>
                <p className="booking-location">
                  <MapPin size={15} />
                  {booking.location}
                </p>
                <div className="portal-list">
                  <div className="portal-summary-item">
                    <span>Booking ID</span>
                    <strong>{booking.id}</strong>
                  </div>
                  <div className="portal-summary-item">
                    <span>
                      <CalendarDays size={13} />
                      Travel date
                    </span>
                    <strong>{booking.travelDate}</strong>
                  </div>
                  <div className="portal-summary-item">
                    <span>
                      <CreditCard size={13} />
                      Total
                    </span>
                    <strong>{booking.total.toLocaleString()} MAD</strong>
                  </div>
                </div>
                <p>{booking.nextAction}</p>
                <div className="portal-inline-actions">
                  <Link
                    to={`/packages/${booking.packageId}`}
                    className="portal-btn portal-btn-secondary"
                  >
                    Package details
                  </Link>
                  <Link
                    to={`/checkout/${booking.packageId}`}
                    className="portal-btn portal-btn-secondary"
                  >
                    Checkout
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
