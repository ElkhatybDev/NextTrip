import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import "./BookingSuccessView.css";

function buildReceiptText({
  receiptId,
  issuedAt,
  selectedPackage,
  bookingForm,
  travelersCount,
  pricing,
  saveCard,
}) {
  return [
    "NEXTTRIP BOOKING RECEIPT",
    `Receipt ID: ${receiptId}`,
    `Issued: ${issuedAt}`,
    "",
    `Traveler: ${bookingForm.fullName || "Traveler"}`,
    `Email: ${bookingForm.email || "Not provided"}`,
    `Phone: ${bookingForm.phone || "Not provided"}`,
    `Saved Card: ${saveCard ? "Yes" : "No"}`,
    "",
    `Package: ${selectedPackage.title}`,
    `Location: ${selectedPackage.location}`,
    `Duration: ${selectedPackage.duration}`,
    `Category: ${selectedPackage.category}`,
    `Travelers: ${travelersCount}`,
    `Rating: ${selectedPackage.rating}`,
    "",
    `Package price: ${pricing.tripPrice.toLocaleString()} MAD`,
    `Taxes and fees: ${pricing.taxes.toLocaleString()} MAD`,
    `Travel insurance: ${pricing.insurance.toLocaleString()} MAD`,
    `Total paid: ${pricing.total.toLocaleString()} MAD`,
  ].join("\n");
}

export default function BookingSuccessView({
  selectedPackage,
  bookingForm,
  travelersCount,
  pricing,
  saveCard,
  onBackToPackages,
  onBackToBooking,
}) {
  const [showReceiptPanel, setShowReceiptPanel] = useState(false);
  const [showEmailPanel, setShowEmailPanel] = useState(false);
  const receiptId = "NT-2026-08421";
  const issuedAt = "11 Apr 2026";
  const receiptText = buildReceiptText({
    receiptId,
    issuedAt,
    selectedPackage,
    bookingForm,
    travelersCount,
    pricing,
    saveCard,
  });

  return (
    <div className="packages-page">
      <Navbar />
      <section className="packages-hero">
        <div className="packages-hero-overlay" />
        <div className="trip-container packages-hero-content">
          <p className="packages-badge">BOOKING CONFIRMED</p>
          <h1>Booking successful</h1>
          <p>Your package was booked successfully. Here is your detailed receipt.</p>
        </div>
      </section>
      <main className="packages-main success-main">
        <section className="success-card">
          <div className="success-top-box">
            <div>
              <p className="section-badge">PAYMENT RECEIPT</p>
              <h2>Thank you, {bookingForm.fullName || "Traveler"}</h2>
              <p className="success-subtext">
                Your reservation for {selectedPackage.title} is now confirmed.
              </p>
            </div>
            <div className="receipt-meta-box">
              <p>
                <span>Receipt ID:</span> {receiptId}
              </p>
              <p>
                <span>Issued:</span> {issuedAt}
              </p>
            </div>
          </div>
          <div className="success-grid">
            <div className="success-left">
              <div className="success-info-card">
                <h3>Package details</h3>
                <div className="success-info-grid">
                  <p>
                    <span>Package:</span> {selectedPackage.title}
                  </p>
                  <p>
                    <span>Location:</span> {selectedPackage.location}
                  </p>
                  <p>
                    <span>Duration:</span> {selectedPackage.duration}
                  </p>
                  <p>
                    <span>Category:</span> {selectedPackage.category}
                  </p>
                  <p>
                    <span>Travelers:</span> {travelersCount}
                  </p>
                  <p>
                    <span>Rating:</span> {"\u2605"} {selectedPackage.rating}
                  </p>
                </div>
              </div>
              <div className="success-info-card">
                <h3>Traveler information</h3>
                <div className="success-info-grid">
                  <p>
                    <span>Full name:</span> {bookingForm.fullName || "Not provided"}
                  </p>
                  <p>
                    <span>Email:</span> {bookingForm.email || "Not provided"}
                  </p>
                  <p>
                    <span>Phone:</span> {bookingForm.phone || "Not provided"}
                  </p>
                  <p>
                    <span>Saved Card:</span> {saveCard ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="success-info-card">
                <h3>Payment breakdown</h3>
                <div className="payment-lines">
                  <div>
                    <span>Package price</span>
                    <strong>{pricing.tripPrice.toLocaleString()} MAD</strong>
                  </div>
                  <div>
                    <span>Taxes and fees</span>
                    <strong>{pricing.taxes.toLocaleString()} MAD</strong>
                  </div>
                  <div>
                    <span>Travel insurance</span>
                    <strong>{pricing.insurance.toLocaleString()} MAD</strong>
                  </div>
                  <div className="payment-total">
                    <span>Total paid</span>
                    <strong>{pricing.total.toLocaleString()} MAD</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="success-right">
              <div className="success-image-card">
                <img src={selectedPackage.image} alt={selectedPackage.title} decoding="async" />
                <div className="success-image-content">
                  <h3>{selectedPackage.title}</h3>
                  <p>Your booking is secured and the receipt is ready below.</p>
                </div>
              </div>
              <div className="success-actions-card">
                <h3>Receipt actions</h3>
                <div className="success-actions">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => setShowReceiptPanel(true)}
                  >
                    Download receipt
                  </button>
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setShowEmailPanel(true)}
                  >
                    Send by email
                  </button>
                  <button type="button" className="secondary-btn" onClick={onBackToBooking}>
                    Back to booking
                  </button>
                  <button type="button" className="secondary-btn" onClick={onBackToPackages}>
                    Back to packages
                  </button>
                </div>
                {showReceiptPanel ? (
                  <div className="receipt-panel">
                    <div className="panel-head">
                      <h4>Receipt ready</h4>
                      <button type="button" onClick={() => setShowReceiptPanel(false)}>
                        Close
                      </button>
                    </div>
                    <p className="panel-text">
                      Preview environments can block real downloads, so the receipt is shown
                      here in a ready-to-copy format.
                    </p>
                    <textarea readOnly value={receiptText} rows={12} />
                  </div>
                ) : null}
                {showEmailPanel ? (
                  <div className="receipt-panel">
                    <div className="panel-head">
                      <h4>Email draft ready</h4>
                      <button type="button" onClick={() => setShowEmailPanel(false)}>
                        Close
                      </button>
                    </div>
                    <div className="email-meta">
                      <p>
                        <span>To:</span> {bookingForm.email || "your-email@example.com"}
                      </p>
                      <p>
                        <span>Subject:</span> NextTrip Receipt {receiptId}
                      </p>
                    </div>
                    <textarea readOnly value={receiptText} rows={10} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
