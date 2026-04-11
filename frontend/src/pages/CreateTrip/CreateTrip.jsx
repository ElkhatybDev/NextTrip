import React, { useState } from "react";
import "./CreateTrip.css";
import logo from "../../Assets/images/NextTrip logo.png";
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="footer-icon" aria-hidden="true">
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4H16V5.5c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3v2.5H9v2.8h2.3v7h2.2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="footer-icon" aria-hidden="true">
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.45 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="footer-icon globe-stroke" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

const travelStyles = ["Comfort", "Luxury", "Adventure", "Family", "Romantic"];
const serviceOptions = [
  "Airport Transfer",
  "Local Guide",
  "Excursions",
  "Travel Insurance",
];

const inspirationItems = [
  {
    name: "Marrakech",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Kyoto",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Santorini",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
  },
];

export default function CreateTrip({ onGoAuth }) {
  const [form, setForm] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: "2",
    budget: "",
    tripType: "Custom Trip",
    hotel: "",
    transport: "",
    notes: "",
    mealPlan: "Breakfast Included",
    travelStyle: "Comfort",
  });

  const [extras, setExtras] = useState([
    "Airport Transfer",
    "Local Guide",
    "Excursions",
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleExtra = (item) => {
    setExtras((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Trip request submitted successfully.");
  };

  return (
    <div className="create-trip-page">
      <header className="trip-header">
        <div className="trip-container trip-header-inner">
          <div className="home-logo">
                <img src={logo} alt="NextTrip" className="logo-img" />
          </div>

          <nav className="trip-nav">
            <a href="/">Explore</a>
            <a href="/">Deals</a>
            <a href="/">Agency</a>
            <a href="/">Support</a>
          </nav>

          <div className="trip-header-actions">
            <button
              type="button"
              className="trip-signin-btn"
              onClick={() => onGoAuth && onGoAuth()}
            >
              Sign In
            </button>
            <div className="trip-profile-icon">👤</div>
          </div>
        </div>
      </header>

      <section className="trip-hero">
        <div className="trip-hero-overlay" />
        <div className="trip-container trip-hero-content">
          <p className="trip-hero-badge">PERSONALIZED TRAVEL REQUEST</p>
          <h1>Create Your Dream Trip</h1>
          <p>
            Tell us what you want, and let trusted agencies build the perfect
            journey for you.
          </p>
        </div>
      </section>

      <main className="trip-main">
        <div className="trip-container">
          <section className="trip-form-card">
            <div className="trip-steps">
              <div className="trip-step">
                <p>STEP 1</p>
                <h4>Trip Basics</h4>
              </div>
              <div className="trip-step">
                <p>STEP 2</p>
                <h4>Preferences</h4>
              </div>
              <div className="trip-step">
                <p>STEP 3</p>
                <h4>Extras</h4>
              </div>
              <div className="trip-step">
                <p>STEP 4</p>
                <h4>Submit Request</h4>
              </div>
            </div>

            <div className="trip-form-head">
              <div>
                <p className="trip-section-label">CUSTOM REQUEST</p>
                <h2>Plan a Trip Your Way</h2>
              </div>
              <p className="trip-form-text">
                Fill in your preferences and send your request to agencies.
                They can review it and reply with personalized offers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="trip-form-grid">
              <div className="trip-field">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Example: Marrakech, Bali, Kyoto..."
                  required
                />
              </div>

              <div className="trip-field">
                <label>Trip Type</label>
                <select
                  name="tripType"
                  value={form.tripType}
                  onChange={handleChange}
                >
                  <option>Custom Trip</option>
                  <option>Luxury Trip</option>
                  <option>Family Trip</option>
                  <option>Adventure Trip</option>
                  <option>Honeymoon</option>
                </select>
              </div>

              <div className="trip-field">
                <label>Departure Date</label>
                <input
                  type="date"
                  name="departureDate"
                  value={form.departureDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="trip-field">
                <label>Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={form.returnDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="trip-field">
                <label>Travelers</label>
                <input
                  type="number"
                  min="1"
                  name="travelers"
                  value={form.travelers}
                  onChange={handleChange}
                />
              </div>

              <div className="trip-field">
                <label>Budget (MAD)</label>
                <input
                  type="text"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="Example: 12000 MAD"
                />
              </div>

              <div className="trip-field">
                <label>Meal Plan</label>
                <select
                  name="mealPlan"
                  value={form.mealPlan}
                  onChange={handleChange}
                >
                  <option>Breakfast Included</option>
                  <option>Half Board</option>
                  <option>Full Board</option>
                  <option>No Meal Plan</option>
                </select>
              </div>

              <div className="trip-field">
                <label>Hotel Preference</label>
                <select
                  name="hotel"
                  value={form.hotel}
                  onChange={handleChange}
                >
                  <option value="">Select hotel category</option>
                  <option>3 Stars</option>
                  <option>4 Stars</option>
                  <option>5 Stars</option>
                  <option>Luxury Riad</option>
                  <option>Villa</option>
                </select>
              </div>

              <div className="trip-field">
                <label>Transport Preference</label>
                <select
                  name="transport"
                  value={form.transport}
                  onChange={handleChange}
                >
                  <option value="">Select transport type</option>
                  <option>Flight</option>
                  <option>Train</option>
                  <option>Private Car</option>
                  <option>Bus</option>
                </select>
              </div>

              <div className="trip-field trip-field-full">
                <label>Travel Style</label>
                <div className="trip-style-wrap">
                  {travelStyles.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, travelStyle: style }))
                      }
                      className={
                        form.travelStyle === style
                          ? "style-chip active"
                          : "style-chip"
                      }
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="trip-field trip-field-full">
                <label>Extra Services</label>
                <div className="trip-services-grid">
                  {serviceOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleExtra(item)}
                      className={
                        extras.includes(item)
                          ? "service-chip active"
                          : "service-chip"
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="trip-double-block trip-field-full">
                <div className="trip-field">
                  <label>Additional Details</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Describe your ideal trip, activities, food preferences, special requests, etc."
                    rows="6"
                  />
                </div>

                <div className="trip-info-box">
                  <h3>Why agencies love clear briefs</h3>
                  <div className="trip-info-list">
                    <p>• Faster replies with better tailored offers</p>
                    <p>• More accurate pricing based on your needs</p>
                    <p>• Easier comparison between agencies</p>
                    <p>• Better hotel and activity suggestions</p>
                  </div>
                </div>
              </div>

              <div className="trip-double-block trip-field-full">
                <div className="trip-upload-box">
                  <label>Optional inspiration image</label>
                  <p>
                    Upload a screenshot or travel inspiration image to help
                    agencies understand your style.
                  </p>
                  <input type="file" accept="image/*" />
                </div>

                <div className="trip-budget-box">
                  <h3>Estimated Budget Guide</h3>
                  <div className="trip-budget-list">
                    <div className="trip-budget-item">
                      <span>Comfort</span>
                      <strong>8,000 - 14,000 MAD</strong>
                    </div>
                    <div className="trip-budget-item">
                      <span>Luxury</span>
                      <strong>15,000 - 35,000 MAD</strong>
                    </div>
                    <div className="trip-budget-item">
                      <span>Family</span>
                      <strong>10,000 - 22,000 MAD</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="trip-field trip-field-full">
                <label>Popular inspiration</label>
                <div className="trip-inspiration-grid">
                  {inspirationItems.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      className="trip-inspiration-card"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, destination: item.name }))
                      }
                    >
                      <img src={item.image} alt={item.name} />
                      <div className="trip-inspiration-content">
                        <p>{item.name}</p>
                        <span>Click to use this destination</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="trip-summary trip-field-full">
                <h3>Trip Summary</h3>
                <div className="trip-summary-grid">
                  <p>
                    <span>Destination:</span> {form.destination || "Not selected"}
                  </p>
                  <p>
                    <span>Trip Type:</span> {form.tripType}
                  </p>
                  <p>
                    <span>Travel Style:</span> {form.travelStyle}
                  </p>
                  <p>
                    <span>Travelers:</span> {form.travelers}
                  </p>
                  <p>
                    <span>Meal Plan:</span> {form.mealPlan}
                  </p>
                  <p>
                    <span>Extras:</span>{" "}
                    {extras.length > 0 ? extras.join(", ") : "None"}
                  </p>
                </div>
              </div>

              <div className="trip-actions">
                <button type="submit" className="trip-submit-btn">
                  Submit Trip Request
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <footer className="trip-footer">
        <div className="trip-container trip-footer-grid">
         
         <div className="home-logo">
                <img src={logo} alt="NextTrip" className="logo-img" />
          </div>

          <div>
            <h4>Site</h4>
            <p>Experiences</p>
            <p>Offers</p>
            <p>About us</p>
            <p>Contact us</p>
          </div>

          <div>
            <h4>Travels</h4>
            <p>Individual</p>
            <p>Group</p>
            <p>Family</p>
            <p>Honeymoon</p>
          </div>

          <div>
            <h4>Help</h4>
            <p>Help center</p>
            <p>Privacy</p>
            <p>Terms and Condition</p>
            <p>FAQ</p>
          </div>

          <div>
            <h4>Newsletter</h4>
            <p className="trip-footer-text trip-footer-text-wide">
              Subscribe to receive exclusive travel offers and discover amazing
              destinations around the world.
            </p>
            <div className="trip-newsletter">
              <input placeholder="Enter your email" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="trip-container trip-footer-bottom">
          <p>© 2026 NextTrip. All rights reserved.</p>
          <div>
            <p>Privacy policy</p>
            <p>Team service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}