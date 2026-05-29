import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CreditCard, Landmark, ShieldCheck } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { calculatePackagePricing, getPackageDetails } from "../../services/packagesService";
import "../../styles/portalPages.css";

export default function Checkout() {
  const { packageId } = useParams();
  const travelPackage = getPackageDetails(packageId || 1) || getPackageDetails(1);
  const [travelers, setTravelers] = useState(2);
  const pricing = calculatePackagePricing(travelPackage, travelers);
  const paymentCards = ["VISA", "Mastercard", "Bank Card"];

  return (
    <div className="portal-page checkout-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="portal-hero">
          <div>
            <p className="portal-eyebrow">Secure checkout</p>
            <h1>Review and confirm your package.</h1>
            <p>
              This page keeps checkout ready for backend payment integration while the
              current version stays simple and readable.
            </p>
          </div>
          <Link to={`/packages/${travelPackage.id}`} className="portal-btn portal-btn-ghost">
            Package details
          </Link>
        </section>

        <section className="portal-grid portal-grid-two">
          <article className="portal-card">
            <h2>Traveler information</h2>
            <form className="portal-form-grid">
              <div className="portal-field">
                <label>Full name</label>
                <input placeholder="Traveler full name" />
              </div>
              <div className="portal-field">
                <label>Email</label>
                <input type="email" placeholder="email@example.com" />
              </div>
              <div className="portal-field">
                <label>Travelers</label>
                <input
                  type="number"
                  min="1"
                  value={travelers}
                  onChange={(event) => setTravelers(Number(event.target.value) || 1)}
                />
              </div>
              <div className="portal-field">
                <label>Payment method</label>
                <select defaultValue="card">
                  <option value="card">Bank card</option>
                  <option value="agency">Pay with agency</option>
                  <option value="deposit">Deposit request</option>
                </select>
              </div>
              <div className="checkout-payment-strip portal-field-full">
                <div className="checkout-payment-head">
                  <CreditCard size={18} />
                  <span>Accepted cards</span>
                </div>
                <div className="checkout-card-icons">
                  {paymentCards.map((card) => (
                    <span key={card} className={`checkout-card-icon checkout-card-${card.toLowerCase().replace(/\s+/g, "-")}`}>
                      {card}
                    </span>
                  ))}
                </div>
                <p>
                  <ShieldCheck size={15} />
                  Secure payment section ready for backend gateway integration.
                </p>
              </div>
              <div className="portal-field portal-field-full">
                <label>Special request</label>
                <textarea placeholder="Pickup, room preference, food request..." />
              </div>
            </form>
          </article>

          <aside className="portal-card">
            <span className="portal-status">Order summary</span>
            <h2>{travelPackage.title}</h2>
            <p>{travelPackage.location}</p>
            <div className="portal-list">
              <div className="portal-summary-item">
                <span>Package price</span>
                <strong>{pricing.tripPrice.toLocaleString()} MAD</strong>
              </div>
              <div className="portal-summary-item">
                <span>Taxes</span>
                <strong>{pricing.taxes.toLocaleString()} MAD</strong>
              </div>
              <div className="portal-summary-item">
                <span>Insurance</span>
                <strong>{pricing.insurance.toLocaleString()} MAD</strong>
              </div>
              <div className="portal-summary-item">
                <span>Total</span>
                <strong>{pricing.total.toLocaleString()} MAD</strong>
              </div>
            </div>
            <div className="portal-inline-actions">
              <Link to="/my-bookings" className="portal-btn portal-btn-secondary">
                Save checkout
              </Link>
              <Link to="/support" className="portal-btn portal-btn-secondary">
                Need help?
              </Link>
            </div>
            <div className="checkout-bank-note">
              <Landmark size={18} />
              <span>Bank transfer and agency deposit can be connected later.</span>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}
