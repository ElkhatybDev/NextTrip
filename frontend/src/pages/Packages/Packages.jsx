import React, { useMemo, useState } from "react";
import "./Packages.css";
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="search-icon" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function Header() {
  return (
    <header className="trip-header">
      <div className="trip-container trip-header-inner">
        <div className="home-logo">
                       <img src={logo} alt="NextTrip" className="logo-img" />
                     </div>

        <nav className="trip-nav">
          <a href="#">Explore</a>
          <a href="#">Deals</a>
          <a href="#">Agency</a>
          <a href="#">Support</a>
        </nav>

        <div className="trip-header-actions">
          <button type="button" className="trip-signin-btn">
            Sign In
          </button>
          <div className="trip-profile-icon">👤</div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="trip-footer">
      <div className="trip-container trip-footer-grid">
        <div>
         <div className="home-logo">
                       <img src={logo} alt="NextTrip" className="logo-img" />
                     </div>
        </div>

        <div>
          <h4>Site</h4>
          <div className="footer-links">
            <p>Experiences</p>
            <p>Offers</p>
            <p>About us</p>
            <p>Contact us</p>
          </div>
        </div>

        <div>
          <h4>Travels</h4>
          <div className="footer-links">
            <p>Individual</p>
            <p>Group</p>
            <p>Family</p>
            <p>Honeymoon</p>
          </div>
        </div>

        <div>
          <h4>Help</h4>
          <div className="footer-links">
            <p>Help center</p>
            <p>Privacy</p>
            <p>Terms and Condition</p>
            <p>FAQ</p>
          </div>
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
  );
}

const packagesData = [
  {
    id: 1,
    title: "Santorini Sunset Dream",
    location: "Santorini, Greece",
    category: "Romantic",
    duration: "6 Days / 5 Nights",
    price: 9900,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    description:
      "White cliffside houses, sea views, boutique stays, and unforgettable sunset moments.",
    details:
      "Enjoy a romantic stay in Santorini with elegant accommodation, panoramic caldera views, sunset dinners, island walks, and a premium travel atmosphere designed for unforgettable memories.",
  },
  {
    id: 2,
    title: "Kyoto Heritage Journey",
    location: "Kyoto, Japan",
    category: "Culture",
    duration: "7 Days / 6 Nights",
    price: 11400,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Traditional temples, quiet streets, gardens, and a calm cultural atmosphere.",
    details:
      "Discover Kyoto through temple visits, traditional neighborhoods, cultural landmarks, refined local cuisine, and a peaceful itinerary full of authenticity and heritage.",
  },
  {
    id: 3,
    title: "Swiss Alpine Escape",
    location: "Zermatt, Switzerland",
    category: "Luxury",
    duration: "5 Days / 4 Nights",
    price: 12800,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1200&q=80",
    description:
      "Snowy peaks, premium chalets, scenic train rides, and peaceful alpine comfort.",
    details:
      "Experience the Swiss Alps with luxury chalet stays, panoramic mountain scenery, scenic railway journeys, cozy evenings, and a high-end winter escape.",
  },
  {
    id: 4,
    title: "Dubai Skyline Experience",
    location: "Dubai, UAE",
    category: "City",
    duration: "4 Days / 3 Nights",
    price: 13500,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Modern luxury, iconic towers, premium shopping, and an energetic city break.",
    details:
      "Enjoy Dubai with a premium city package including stylish accommodation, skyline dining, iconic attractions, shopping moments, and polished urban comfort.",
  },
  {
    id: 5,
    title: "Bali Wellness Retreat",
    location: "Ubud, Bali",
    category: "Relax",
    duration: "6 Days / 5 Nights",
    price: 8600,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Tropical greenery, peaceful villas, spa moments, and serene island energy.",
    details:
      "Relax in Bali with private villa vibes, lush landscapes, wellness experiences, quiet moments, and a soft tropical atmosphere designed for total relaxation.",
  },
  {
    id: 6,
    title: "Amalfi Coast Escape",
    location: "Amalfi, Italy",
    category: "Seaside",
    duration: "5 Days / 4 Nights",
    price: 10700,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Colorful coastal towns, cliffside roads, sea views, and elegant Italian charm.",
    details:
      "Explore the Amalfi Coast through scenic drives, charming villages, sea-view stays, refined dining, and a stylish Mediterranean travel experience.",
  },
];

function BookingSuccessPage({
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

  const receiptText = [
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
    `Package Price: ${pricing.tripPrice.toLocaleString()} MAD`,
    `Taxes and Fees: ${pricing.taxes.toLocaleString()} MAD`,
    `Travel Insurance: ${pricing.insurance.toLocaleString()} MAD`,
    `Total Paid: ${pricing.total.toLocaleString()} MAD`,
  ].join("\n");

  return (
    <div className="packages-page">
      <Header />

      <section className="packages-hero">
        <div className="packages-hero-overlay" />
        <div className="trip-container packages-hero-content">
          <p className="packages-badge">BOOKING CONFIRMED</p>
          <h1>Booking Success</h1>
          <p>
            Your package was booked successfully. Here is your detailed receipt.
          </p>
        </div>
      </section>

      <main className="packages-main success-main">
        <section className="booking-card">
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
                <h3>Package Details</h3>
                <div className="success-info-grid">
                  <p><span>Package:</span> {selectedPackage.title}</p>
                  <p><span>Location:</span> {selectedPackage.location}</p>
                  <p><span>Duration:</span> {selectedPackage.duration}</p>
                  <p><span>Category:</span> {selectedPackage.category}</p>
                  <p><span>Travelers:</span> {travelersCount}</p>
                  <p><span>Rating:</span> ★ {selectedPackage.rating}</p>
                </div>
              </div>

              <div className="success-info-card">
                <h3>Traveler Information</h3>
                <div className="success-info-grid">
                  <p><span>Full Name:</span> {bookingForm.fullName || "Not provided"}</p>
                  <p><span>Email:</span> {bookingForm.email || "Not provided"}</p>
                  <p><span>Phone:</span> {bookingForm.phone || "Not provided"}</p>
                  <p><span>Saved Card:</span> {saveCard ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="success-info-card">
                <h3>Payment Breakdown</h3>
                <div className="payment-lines">
                  <div><span>Package Price</span><strong>{pricing.tripPrice.toLocaleString()} MAD</strong></div>
                  <div><span>Taxes and Fees</span><strong>{pricing.taxes.toLocaleString()} MAD</strong></div>
                  <div><span>Travel Insurance</span><strong>{pricing.insurance.toLocaleString()} MAD</strong></div>
                  <div className="payment-total"><span>Total Paid</span><strong>{pricing.total.toLocaleString()} MAD</strong></div>
                </div>
              </div>
            </div>

            <div className="success-right">
              <div className="success-image-card">
                <img src={selectedPackage.image} alt={selectedPackage.title} />
                <div className="success-image-content">
                  <h3>{selectedPackage.title}</h3>
                  <p>Your booking is secured and the receipt is ready below.</p>
                </div>
              </div>

              <div className="success-actions-card">
                <h3>Receipt Actions</h3>
                <div className="success-actions">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => setShowReceiptPanel(true)}
                  >
                    Download Receipt
                  </button>

                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setShowEmailPanel(true)}
                  >
                    Send by Email
                  </button>

                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={onBackToBooking}
                  >
                    Back to Booking
                  </button>

                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={onBackToPackages}
                  >
                    Back to Packages
                  </button>
                </div>

                {showReceiptPanel ? (
                  <div className="receipt-panel">
                    <div className="panel-head">
                      <h4>Receipt Ready</h4>
                      <button type="button" onClick={() => setShowReceiptPanel(false)}>
                        Close
                      </button>
                    </div>
                    <p className="panel-text">
                      Preview environments can block real downloads, so the receipt
                      is shown here in a ready-to-copy format.
                    </p>
                    <textarea readOnly value={receiptText} rows={12} />
                  </div>
                ) : null}

                {showEmailPanel ? (
                  <div className="receipt-panel">
                    <div className="panel-head">
                      <h4>Email Draft Ready</h4>
                      <button type="button" onClick={() => setShowEmailPanel(false)}>
                        Close
                      </button>
                    </div>
                    <div className="email-meta">
                      <p><span>To:</span> {bookingForm.email || "your-email@example.com"}</p>
                      <p><span>Subject:</span> NextTrip Receipt {receiptId}</p>
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

export default function Packages() {
  const [page, setPage] = useState("packages");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: "2",
    specialRequest: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [saveCard, setSaveCard] = useState(true);

  const categories = [
    "All",
    "Romantic",
    "Culture",
    "Luxury",
    "City",
    "Relax",
    "Seaside",
  ];

  const filteredPackages = useMemo(() => {
    return packagesData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const activePackage = selectedPackage || filteredPackages[0] || packagesData[0];

  const travelersCount = Math.max(
    1,
    parseInt(bookingForm.travelers || "1", 10) || 1
  );

  const pricing = useMemo(() => {
    const taxesPerTraveler = 350;
    const insurancePerTraveler = 175;
    const tripPrice = activePackage.price * travelersCount;
    const taxes = taxesPerTraveler * travelersCount;
    const insurance = insurancePerTraveler * travelersCount;
    const total = tripPrice + taxes + insurance;

    return { tripPrice, taxes, insurance, total };
  }, [activePackage, travelersCount]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const scrollTopSafe = () => {
    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openBooking = (item) => {
    setSelectedPackage(item);
    setPage("booking");
    scrollTopSafe();
  };

  const backToPackages = () => {
    setPage("packages");
    setSelectedPackage(null);
    scrollTopSafe();
  };

  if (page === "success" && activePackage) {
    return (
      <BookingSuccessPage
        selectedPackage={activePackage}
        bookingForm={bookingForm}
        travelersCount={travelersCount}
        pricing={pricing}
        saveCard={saveCard}
        onBackToBooking={() => setPage("booking")}
        onBackToPackages={backToPackages}
      />
    );
  }

  if (page === "booking" && activePackage) {
    return (
      <div className="packages-page">
        <Header />

        <section className="packages-hero">
          <div className="packages-hero-overlay" />
          <div className="trip-container packages-hero-content">
            <p className="packages-badge">SECURE BOOKING</p>
            <h1>Booking Details</h1>
            <p>
              Complete your booking for {activePackage.title} and review your
              total before checkout.
            </p>
          </div>
        </section>

        <main className="packages-main">
          <div className="booking-grid">
            <section className="booking-card">
              <div className="selected-package-box">
                <img
                  src={activePackage.image}
                  alt={activePackage.title}
                  className="selected-package-image"
                />

                <div className="selected-package-content">
                  <p className="section-badge">SELECTED PACKAGE</p>
                  <h2>{activePackage.title}</h2>
                  <p className="package-location">{activePackage.location}</p>

                  <div className="selected-package-meta">
                    <p><span>Duration:</span> {activePackage.duration}</p>
                    <p><span>Category:</span> {activePackage.category}</p>
                    <p><span>Guests:</span> {travelersCount} Traveler(s)</p>
                    <p><span>Rating:</span> ★ {activePackage.rating}</p>
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
                    onChange={handleBookingChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="booking-field">
                  <label>Email</label>
                  <input
                    name="email"
                    value={bookingForm.email}
                    onChange={handleBookingChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="booking-field">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleBookingChange}
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
                    onChange={handleBookingChange}
                    placeholder="2"
                  />
                </div>

                <div className="booking-field booking-field-full">
                  <label>Special Request</label>
                  <textarea
                    name="specialRequest"
                    value={bookingForm.specialRequest}
                    onChange={handleBookingChange}
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
                    onChange={handleBookingChange}
                    placeholder="Name on card"
                  />
                </div>

                <div className="booking-field booking-field-full">
                  <label>Card Number</label>
                  <input
                    name="cardNumber"
                    value={bookingForm.cardNumber}
                    onChange={handleBookingChange}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="booking-field">
                  <label>Expiry Date</label>
                  <input
                    name="expiry"
                    value={bookingForm.expiry}
                    onChange={handleBookingChange}
                    placeholder="MM/YY"
                  />
                </div>

                <div className="booking-field">
                  <label>CVV</label>
                  <input
                    name="cvv"
                    value={bookingForm.cvv}
                    onChange={handleBookingChange}
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="save-card-box">
                <input
                  id="saveCard"
                  type="checkbox"
                  checked={saveCard}
                  onChange={() => setSaveCard((v) => !v)}
                />
                <label htmlFor="saveCard">
                  Save this card for faster future bookings
                </label>
              </div>
            </section>

            <aside className="booking-sidebar">
              <section className="booking-card">
                <p className="section-badge">ORDER SUMMARY</p>
                <h3>Checkout</h3>

                <div className="price-info-box">
                  Price updates automatically based on{" "}
                  <strong>{travelersCount}</strong> traveler(s).
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
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => {
                      setPage("success");
                      scrollTopSafe();
                    }}
                  >
                    Checkout
                  </button>

                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={backToPackages}
                  >
                    Back to Packages
                  </button>
                </div>
              </section>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="packages-page">
      <Header />

      <section className="packages-hero">
        <div className="packages-hero-overlay" />
        <div className="trip-container packages-hero-content">
          <p className="packages-badge">CURATED TRAVEL PACKAGES</p>
          <h1>Packages</h1>
          <p>
            Discover handpicked packages designed for romance, adventure,
            culture, and unforgettable escapes.
          </p>
        </div>
      </section>

      <main className="packages-main">
        <section className="filters-card">
          <div className="filters-top">
            <div>
              <p className="section-badge">FIND YOUR NEXT TRIP</p>
              <h2>Explore our premium packages</h2>
            </div>

            <div className="search-wrap">
              <div className="search-bar">
                <SearchIcon />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, destination, or category"
                />
              </div>
            </div>
          </div>

          <div className="category-row">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${
                  selectedCategory === category ? "active-category" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="packages-head">
          <div>
            <h3>Available Packages</h3>
            <p>{filteredPackages.length} package(s) found</p>
          </div>
        </section>

        <section className="packages-grid">
          {filteredPackages.map((item) => (
            <article key={item.id} className="package-card">
              <div className="package-image-wrap">
                <img src={item.image} alt={item.title} className="package-image" />
                <div className="package-category-badge">{item.category}</div>
              </div>

              <div className="package-content">
                <div className="package-top">
                  <div>
                    <h4>{item.title}</h4>
                    <p className="package-location">{item.location}</p>
                  </div>

                  <div className="package-price">
                    {item.price.toLocaleString()} MAD
                  </div>
                </div>

                <p className="package-description">{item.description}</p>

                <div className="package-meta">
                  <p>{item.duration}</p>
                  <p>★ {item.rating}</p>
                </div>

                <div className="package-actions">
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(item)}
                    className="secondary-btn flex-btn"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => openBooking(item)}
                    className="primary-btn flex-btn"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      {selectedPackage ? (
        <div className="modal-overlay">
          <div className="details-modal">
            <div className="modal-image-wrap">
              <img
                src={selectedPackage.image}
                alt={selectedPackage.title}
                className="modal-image"
              />

              <button
                type="button"
                onClick={() => setSelectedPackage(null)}
                className="modal-close"
              >
                ✕
              </button>

              <div className="modal-category-badge">
                {selectedPackage.category}
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-top">
                <div>
                  <h3>{selectedPackage.title}</h3>
                  <p>{selectedPackage.location}</p>
                </div>

                <div className="package-price modal-price">
                  {selectedPackage.price.toLocaleString()} MAD
                </div>
              </div>

              <div className="modal-stats">
                <div>
                  <p>DURATION</p>
                  <span>{selectedPackage.duration}</span>
                </div>
                <div>
                  <p>CATEGORY</p>
                  <span>{selectedPackage.category}</span>
                </div>
                <div>
                  <p>RATING</p>
                  <span>★ {selectedPackage.rating}</span>
                </div>
              </div>

              <div className="modal-details-text">
                <p className="section-badge">PACKAGE DETAILS</p>
                <p>{selectedPackage.details}</p>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => openBooking(selectedPackage)}
                  className="primary-btn flex-btn"
                >
                  Book This Package
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  className="secondary-btn flex-btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}