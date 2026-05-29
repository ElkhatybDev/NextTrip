import React from "react";
import "./BookingView.css";

export default function BookingView({
  selectedPackage,
  bookingForm,
  travelersCount,
  pricing,
  saveCard,
  onBookingChange,
  onSaveCardChange,
  onCheckout,
  onBackToPackages,
}) {
  return (
    <main className="packages-main">
      <div className="booking-grid">
        <section className="booking-card">
          <div className="selected-package-box">
            <img
              src={selectedPackage.image}
              alt={selectedPackage.title}
              className="selected-package-image"
            />
            <div className="selected-package-content">
              <p className="section-badge">SELECTED PACKAGE</p>
              <h2>{selectedPackage.title}</h2>
              <p className="package-location">{selectedPackage.location}</p>
              <div className="selected-package-meta">
                <p>
                  <span>Duration:</span> {selectedPackage.duration}
                </p>
                <p>
                  <span>Category:</span> {selectedPackage.category}
                </p>
                <p>
                  <span>Guests:</span> {travelersCount} Traveler(s)
                </p>
                <p>
                  <span>Rating:</span> {"\u2605"} {selectedPackage.rating}
                </p>
              </div>
            </div>
          </div>

          <div className="booking-section">
            <p className="section-badge">TRAVELER DETAILS</p>
            <h3>Enter Your Information</h3>
          </div>
          <div className="booking-form-grid">
            <div className="booking-field">
              <label>Full Name</label>
              <input
                name="fullName"
                value={bookingForm.fullName}
                onChange={onBookingChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="booking-field">
              <label>Email</label>
              <input
                name="email"
                value={bookingForm.email}
                onChange={onBookingChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="booking-field">
              <label>Phone Number</label>
              <input
                name="phone"
                value={bookingForm.phone}
                onChange={onBookingChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="booking-field">
              <label>Number of Travelers</label>
              <input
                type="number"
                min="1"
                name="travelers"
                value={bookingForm.travelers}
                onChange={onBookingChange}
                placeholder="2"
              />
            </div>
            <div className="booking-field booking-field-full">
              <label>Special Request</label>
              <textarea
                name="specialRequest"
                value={bookingForm.specialRequest}
                onChange={onBookingChange}
                rows={5}
                placeholder="Add any note, room preference, food request, or airport pickup details..."
              />
            </div>
          </div>

          <div className="booking-section payment-space">
            <p className="section-badge">PAYMENT DETAILS</p>
            <h3>Bank Card Information</h3>
          </div>
          <div className="booking-form-grid">
            <div className="booking-field booking-field-full">
              <label>Card Holder Name</label>
              <input
                name="cardName"
                value={bookingForm.cardName}
                onChange={onBookingChange}
                placeholder="Name on card"
              />
            </div>
            <div className="booking-field booking-field-full">
              <label>Card Number</label>
              <input
                name="cardNumber"
                value={bookingForm.cardNumber}
                onChange={onBookingChange}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="booking-field">
              <label>Expiry Date</label>
              <input
                name="expiry"
                value={bookingForm.expiry}
                onChange={onBookingChange}
                placeholder="MM/YY"
              />
            </div>
            <div className="booking-field">
              <label>CVV</label>
              <input
                name="cvv"
                value={bookingForm.cvv}
                onChange={onBookingChange}
                placeholder="123"
              />
            </div>
          </div>
          <div className="save-card-box">
            <input
              id="saveCard"
              type="checkbox"
              checked={saveCard}
              onChange={onSaveCardChange}
            />
            <label htmlFor="saveCard">Save this card for faster future bookings</label>
          </div>
        </section>

        <aside className="booking-sidebar">
          <section className="booking-card">
            <p className="section-badge">ORDER SUMMARY</p>
            <h3>Checkout</h3>
            <div className="price-info-box">
              Price updates automatically based on <strong>{travelersCount}</strong>{" "}
              traveler(s).
            </div>
            <div className="price-lines">
              <div>
                <span>Package Price</span>
                <strong>{pricing.tripPrice.toLocaleString()} MAD</strong>
              </div>
              <div>
                <span>Taxes and Fees</span>
                <strong>{pricing.taxes.toLocaleString()} MAD</strong>
              </div>
              <div>
                <span>Travel Insurance</span>
                <strong>{pricing.insurance.toLocaleString()} MAD</strong>
              </div>
            </div>
            <div className="price-total">
              <span>Total</span>
              <strong>{pricing.total.toLocaleString()} MAD</strong>
            </div>
            <div className="booking-actions">
              <button type="button" className="primary-btn" onClick={onCheckout}>
                Checkout
              </button>
              <button type="button" className="secondary-btn" onClick={onBackToPackages}>
                Back to Packages
              </button>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
