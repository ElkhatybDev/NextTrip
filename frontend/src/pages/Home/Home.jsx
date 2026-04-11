import React, { useMemo, useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import logo from "../../Assets/images/NextTrip logo.png";
import {
  Search,
  MapPin,
  Wallet,
  User,
  ChevronRight,
  ShieldCheck,
  SlidersHorizontal,
  MessagesSquare,
  Globe,
  Users,
  Star,
  X,
} from "lucide-react";
import "./Home.css";

const packages = [
  {
    title: "Morocco Magic",
    price: "9,900 MAD",
    tag: "Popular",
    meta: "6 Days • 4 Adults",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    desc: "Vibrant souks, blue lanes, and a handcrafted cultural route.",
    details:
      "Discover the energy of Marrakech, the beauty of traditional riads, guided cultural tours, local cuisine, and a personalized itinerary designed for comfort and authenticity.",
  },
  {
    title: "Amalfi Coast",
    price: "24,500 MAD",
    tag: "Luxury",
    meta: "10 Days • 2 Adults",
    image:
      "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?auto=format&fit=crop&w=900&q=80",
    desc: "A romantic journey through Italy’s most iconic coastline.",
    details:
      "Enjoy premium coastal stays, elegant dining experiences, curated excursions, scenic boat moments, and a luxury-focused trip tailored for unforgettable memories.",
  },
  {
    title: "Kyoto Zen",
    price: "18,500 MAD",
    tag: "Cultural",
    meta: "8 Days • 1 Adult",
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=80",
    desc: "Calm gardens, old temples, and timeless local traditions.",
    details:
      "Experience peaceful temple visits, immersive cultural walks, local food discoveries, traditional districts, and a balanced itinerary blending calm and exploration.",
  },
  {
    title: "Bali Retreat",
    price: "12,990 MAD",
    tag: "Escape",
    meta: "7 Days • 2 Adults",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
    desc: "Oceanfront stays, peaceful vibes, and tropical slow living.",
    details:
      "Relax in tropical stays with ocean views, wellness-focused experiences, flexible activity planning, and a smooth island escape built around comfort and nature.",
  },


];

const travelCards = [
  {
    title: "Group Travel Experience",
    type: "Travel trips",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    desc: "Travel together, share unforgettable moments, and explore with new friends.",
  },
  {
    title: "Adventure Together",
    type: "Travel trips",
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    desc: "Discover breathtaking landscapes and create unforgettable memories.",
  },
  {
    title: "Family Experience",
    type: "Travel trips",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
    desc: "Explore vibrant cities and enjoy meaningful family travel moments.",
  },
];

const destinationHighlights = [
  {
    name: "Marrakech",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Chefchaouen",
    image:
      "https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Santorini",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Kyoto",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
  },
];

const testimonials = [
  {
    name: "Salma R.",
    role: "Traveler",
    text: "NextTrip made planning super easy. I customized everything and the agency replied fast.",
  },
  {
    name: "Youssef A.",
    role: "Explorer",
    text: "The real-time pricing and direct communication saved me time and helped me choose better.",
  },
  {
    name: "Imane B.",
    role: "Traveler",
    text: "Clean experience, beautiful offers, and I loved how flexible the trip customization was.",
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure Travel",
    text: "Your safety is our priority, with trusted partners and reliable support.",
  },
  {
    icon: SlidersHorizontal,
    title: "Personalized Trips",
    text: "Build your travel experience around your budget, mood, and preferences.",
  },
  {
    icon: MessagesSquare,
    title: "Agency Interaction",
    text: "Talk directly with travel agencies to refine your trip in real time.",
  },
];

function Logo() {
  return (
    <div className="home-logo">
      <img src={logo} alt="NextTrip" className="logo-img" />
    </div>
  );
}

function SocialDot({ label }) {
  return <div className="social-dot">{label}</div>;
}

function SectionHeading({ label, title, desc, centered = false }) {
  return (
    <div className={centered ? "section-heading centered" : "section-heading"}>
      <div>
        <p className="section-label">{label}</p>
        <h2>{title}</h2>
      </div>
      {desc ? <p className="section-desc">{desc}</p> : null}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Explore");
  const [searchForm, setSearchForm] = useState({
    destination: "Morocco",
    budget: "5000 - 15000 MAD",
    travelers: "2 Travelers",
  });
  const [searchMessage, setSearchMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const menuItems = useMemo(
    () => [
      { label: "Explore", id: "home" },
      { label: "Deals", id: "packages" },
      { label: "Agency", id: "why" },
      { label: "About Us", id: "about" },
      { label: "Support", id: "footer" },
    ],
    []
  );

  const handleMenuClick = (label, id) => {
    setActiveMenu(label);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleHeroSearch = () => {
    setSearchMessage(
      `Searching trips for ${searchForm.destination} • ${searchForm.budget} • ${searchForm.travelers}`
    );
    setActiveMenu("Deals");
    const section = document.getElementById("packages");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="container home-header-inner">
          <Logo />

          <nav className="home-nav">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleMenuClick(item.label, item.id)}
                className={activeMenu === item.label ? "nav-btn active" : "nav-btn"}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="home-header-actions">
            <button className="signin-btn" onClick={() => navigate("/auth")}>
                Sign In
            </button>
            <button className="profile-btn" onClick={() => navigate("/auth")}>
                  <User size={16} />
            </button>
          </div>
        </div>
      </header>

      <section id="home" className="hero-section">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
          alt="Hero"
          className="hero-image"
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="hero-badge">Curated Journeys • Real-Time Travel Planning</p>
          <h1>
            Your Journey,
            <span>Your Way</span>
          </h1>
          <p className="hero-text">
            Discover personalized travel experiences with direct agency interaction,
            dynamic packages, and real-time price updates for every choice you make.
          </p>

          <div className="hero-search-box">
            <div className="hero-search-item">
              <MapPin size={16} />
              <div>
                <p>Destination</p>
                <select
                  value={searchForm.destination}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, destination: e.target.value })
                  }
                >
                  <option>Morocco</option>
                  <option>Italy</option>
                  <option>Japan</option>
                  <option>Bali</option>
                  <option>Greece</option>
                </select>
              </div>
            </div>

            <div className="hero-search-item">
              <Wallet size={16} />
              <div>
                <p>Budget</p>
                <select
                  value={searchForm.budget}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, budget: e.target.value })
                  }
                >
                  <option>5000 - 15000 MAD</option>
                  <option>15000 - 30000 MAD</option>
                  <option>30000 - 50000 MAD</option>
                  <option>50000+ MAD</option>
                </select>
              </div>
            </div>

            <div className="hero-search-item">
              <Users size={16} />
              <div>
                <p>Travelers</p>
                <select
                  value={searchForm.travelers}
                  onChange={(e) =>
                    setSearchForm({ ...searchForm, travelers: e.target.value })
                  }
                >
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>Family</option>
                  <option>Group</option>
                </select>
              </div>
            </div>

            <button className="hero-search-btn" onClick={handleHeroSearch}>
              <Search size={16} />
              Search
            </button>
          </div>

          {searchMessage ? <div className="hero-search-message">{searchMessage}</div> : null}
        </div>
      </section>

      <main className="container home-main">
        <section id="packages">
          <SectionHeading
            label="Curated Discovery"
            title="Popular Packages"
            desc="Our hand-picked selection for curious travelers, mixing luxury, culture, adventure, and local spirit."
          />

          <div className="packages-grid">
            {packages.map((item) => (
              <article key={item.title} className="package-card">
                <div className="package-image-wrap">
                  <img src={item.image} alt={item.title} className="package-image" />
                  <span className="package-tag">{item.tag}</span>
                </div>

                <div className="package-content">
                  <div className="package-top">
                    <h3>{item.title}</h3>
                    <span className="package-price">{item.price}</span>
                  </div>

                  <p className="package-desc">{item.desc}</p>

                  <div className="package-bottom">
                    <span>{item.meta}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedPackage(item)}
                      className="details-btn"
                    >
                      Details <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="last-travels-section">
          <div className="section-row">
            <h2 className="simple-title">Last Travels</h2>
            <div className="slider-btns">
              <button>‹</button>
              <button>›</button>
            </div>
          </div>

          <div className="travel-grid">
            {travelCards.map((item) => (
              <article key={item.title} className="travel-card">
                <img src={item.image} alt={item.title} />
                <div className="travel-card-content">
                  <p>{item.type}</p>
                  <h3>{item.title}</h3>
                  <span>{item.desc}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="why" className="why-section">
          <div className="why-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1400&q=80"
              alt="Why choose us"
            />
          </div>

          <div>
            <span className="why-badge">Why choose NextTrip?</span>
            <h2 className="why-title">Travel with Confidence</h2>
            <p className="why-text">
              We go above and beyond to ensure your journey is seamless, safe, and
              unforgettable. NextTrip blends intelligent personalization with direct
              agency collaboration.
            </p>

            <div className="reasons-list">
              {reasons.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="reason-card">
                    <div className="reason-icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-grid">
            <div className="about-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80"
                alt="About NextTrip"
              />
            </div>

            <div>
              <p className="section-label">About Us</p>
              <h2 className="about-title">We Build Smarter Travel Experiences</h2>
              <p className="about-text">
                NextTrip is a modern travel platform designed to make trip planning
                easier, more flexible, and more personal. We connect travelers with
                trusted agencies, allow full package customization, and provide
                real-time pricing based on user choices.
              </p>
              <p className="about-text">
                Our goal is simple: give every traveler the freedom to shape their
                perfect journey while keeping direct communication, clear options,
                and a smooth booking experience in one place.
              </p>

              <div className="about-stats">
                <div className="about-stat">
                  <h3>50K+</h3>
                  <p>Travelers Inspired</p>
                </div>
                <div className="about-stat orange">
                  <h3>120+</h3>
                  <p>Trusted Agencies</p>
                </div>
                <div className="about-stat">
                  <h3>24/7</h3>
                  <p>Support Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="global-stats">
          <div className="global-stat">
            <h3>50K+</h3>
            <p>Happy Travelers</p>
          </div>
          <div className="global-stat">
            <h3>120+</h3>
            <p>Agency Partners</p>
          </div>
          <div className="global-stat">
            <h3>300+</h3>
            <p>Curated Packages</p>
          </div>
          <div className="global-stat">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </section>

        <section className="destinations-section">
          <SectionHeading
            label="Featured Destinations"
            title="Inspiration for Your Next Trip"
            desc="Discover top destinations loved by travelers looking for culture, adventure, and unforgettable views."
          />

          <div className="destinations-grid">
            {destinationHighlights.map((item) => (
              <article key={item.name} className="destination-card">
                <img src={item.image} alt={item.name} />
                <div className="destination-overlay" />
                <div className="destination-name">{item.name}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials-section">
          <SectionHeading label="Testimonials" title="What Travelers Say" centered />

          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <div className="stars-row">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="testimonial-text">“{item.text}”</p>
                <div className="testimonial-footer">
                  <h3>{item.name}</h3>
                  <p>{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <section className="newsletter-section">
        <div className="newsletter-box">
          <h2>Ready to Start Your Adventure?</h2>
          <p>
            Join 50k+ travelers getting weekly secret deals and destination inspiration.
          </p>
          <div className="newsletter-form">
            <input placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>

      {selectedPackage ? (
        <div className="package-modal-overlay">
          <div className="package-modal">
            <div className="package-modal-image-wrap">
              <img
                src={selectedPackage.image}
                alt={selectedPackage.title}
                className="package-modal-image"
              />
              <button
                className="package-modal-close"
                onClick={() => setSelectedPackage(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="package-modal-content">
              <div className="package-modal-top">
                <div>
                  <span className="package-modal-tag">{selectedPackage.tag}</span>
                  <h3>{selectedPackage.title}</h3>
                  <p>{selectedPackage.meta}</p>
                </div>
                <div className="package-modal-price-box">
                  <span>Starting from</span>
                  <strong>{selectedPackage.price}</strong>
                </div>
              </div>

              <p className="package-modal-details">{selectedPackage.details}</p>

              <div className="package-modal-actions">
                <button className="book-btn" onClick={() => navigate("/auth")}>
                    Book this package
                </button>

                <button className="contact-btn" onClick={() => navigate("/dashboard")}>
                    Contact agency
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <footer id="footer" className="home-footer">
        <div className="container footer-grid">
          <div>
            <Logo />
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
              <p>Terms & Condition</p>
              <p>FAQ</p>
            </div>
          </div>

          <div>
            <h4>Newsletter</h4>
            <p className="footer-text small">
              Subscribe to receive exclusive travel offers and discover amazing
              destinations around the world.
            </p>
            <div className="footer-newsletter">
              <input placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
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