import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Building2, CheckCircle2, Route } from "lucide-react";
import Footer from "../../components/Footer/Footer";
import HeroSearch from "../../components/HeroSearch/HeroSearch";
import Navbar from "../../components/Navbar/Navbar";
import {
  destinationHighlights,
  fallbackDestinations,
  featuredExperiences,
  homeFaqs,
  homeHowSteps,
  homeImages,
  homeNormalPackages,
  homeOfferPackages,
  homeVideos,
  reasons,
  testimonials,
  trustSignals,
  tripTypes,
} from "../../data/homeContent";
import { fetchDestinationOptions } from "../../services/destinationsApi";
import { formatGuestSummary, getTodayDate } from "../../utils/travelSearch";
import NewsletterSection from "./components/NewsletterSection";
import PackageModal from "./components/PackageModal";
import PackageSection from "./components/PackageSection";
import PersonalTripSection from "./components/PersonalTripSection";
import DestinationHighlightsSection from "./components/DestinationHighlightsSection";
import ExperienceCarouselSection from "./components/ExperienceCarouselSection";
import FinalCtaSection from "./components/FinalCtaSection";
import HomeFaqSection from "./components/HomeFaqSection";
import HowItWorksSection from "./components/HowItWorksSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import TrustSection from "./components/TrustSection";
import WhySection from "./components/WhySection";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("Home");
  const [searchForm, setSearchForm] = useState({
    destination: "Morocco",
    date: getTodayDate(),
    tripType: tripTypes[0],
  });
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);
  const [destinationOptions, setDestinationOptions] = useState(fallbackDestinations);
  const [searchMessage, setSearchMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const handleMenuClick = (label, id) => {
    setActiveMenu(label);
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const menuItems = useMemo(() => {
    const items = [
      { label: "Home", id: "home" },
      { label: "Experiences", to: "/experience" },
      { label: "Packages", to: "/packages" },
      { label: "Offers", to: "/offers" },
      { label: "Destinations", to: "/destinations" },
      { label: "Create Trip", to: "/create-trip", highlight: true },
    ];

    return items.map((item) =>
      item.to || item.children
        ? item
        : {
            label: item.label,
            active: activeMenu === item.label,
            onClick: () => handleMenuClick(item.label, item.id),
          }
    );
  }, [activeMenu]);

  const handleHeroSearch = () => {
    const guestSummary = formatGuestSummary(guestCounts);

    setSearchMessage("");
    setIsGuestMenuOpen(false);
    navigate("/packages", {
      state: {
        searchFilters: {
          destination: searchForm.destination,
          date: searchForm.date,
          tripType: searchForm.tripType,
          guests: guestSummary,
        },
      },
    });
  };

  const updateGuestCount = (key, change) => {
    setGuestCounts((currentCounts) => ({
      ...currentCounts,
      [key]: Math.max(0, currentCounts[key] + change),
    }));
  };

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) {
      return;
    }

    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const nextActiveLabel =
      {
        home: "Home",
        packages: "Packages",
        footer: "Contact Us",
      }[targetId] || "Home";

    setActiveMenu(nextActiveLabel);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    const controller = new AbortController();

    fetchDestinationOptions(controller.signal)
      .then(setDestinationOptions)
      .catch((error) => {
        if (error.name !== "AbortError") {
          setDestinationOptions(fallbackDestinations);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="home-page">
      <Navbar
        navItems={menuItems}
        rightSlot={
          <button type="button" className="site-signin-btn" onClick={() => navigate("/auth")}>
            Sign In
          </button>
        }
      />

      <section id="home" className="hero-section">
        {!videoFailed ? (
          <video
            className="hero-media"
            src={homeVideos.hero}
            poster={homeImages.hero}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label="NextTrip travel video preview"
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <img
            className="hero-media hero-media--fallback"
            src={homeImages.hero}
            alt="NextTrip"
          />
        )}
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-copy">
            <h1>Travel more, for less</h1>
            <p className="hero-text">
              Packages, custom trips, and agency offers in one place.
            </p>
          </div>

          <div className="hero-search-wrap">
            <HeroSearch
              searchForm={searchForm}
              onSearchFormChange={setSearchForm}
              destinationOptions={destinationOptions}
              tripTypes={tripTypes}
              guestCounts={guestCounts}
              isGuestMenuOpen={isGuestMenuOpen}
              onGuestMenuToggle={() => setIsGuestMenuOpen((isOpen) => !isOpen)}
              onGuestCountChange={updateGuestCount}
              onSearch={handleHeroSearch}
            />

            {searchMessage ? <div className="hero-search-message">{searchMessage}</div> : null}
          </div>
        </div>
      </section>

      <main className="container home-main">
        <section id="platform" className="trip-builder-zone" aria-labelledby="trip-builder-title">
          <div className="trip-builder-zone-head">
            <div>
              <h2 id="trip-builder-title">Create a personal trip request.</h2>
            </div>
          </div>

          <section className="home-flow-strip" aria-label="How NextTrip helps">
            <div>
              <span className="flow-number">01</span>
              <span className="flow-icon">
                <Route size={18} />
              </span>
              <div className="flow-copy">
                <strong>Choose your mood</strong>
                <small>Family trips, adventure, faith travel, luxury, or calm stays.</small>
              </div>
            </div>
            <div>
              <span className="flow-number">02</span>
              <span className="flow-icon">
                <Building2 size={18} />
              </span>
              <div className="flow-copy">
                <strong>Compare agencies</strong>
                <small>One request can bring several clear offers.</small>
              </div>
            </div>
            <div>
              <span className="flow-number">03</span>
              <span className="flow-icon">
                <CheckCircle2 size={18} />
              </span>
              <div className="flow-copy">
                <strong>Move to booking</strong>
                <small>Pick the best match and continue with confidence.</small>
              </div>
            </div>
          </section>

          <PersonalTripSection onCreateTrip={() => navigate("/create-trip")} />
        </section>
        <HowItWorksSection steps={homeHowSteps} />
        <DestinationHighlightsSection
          destinations={destinationHighlights}
          onOpenDestination={() => navigate("/destinations")}
        />
        <PackageSection
          id="packages"
          label="Agency offers"
          title="Offers ready to compare"
          desc="These cards are agency offers with clear prices, trip types, durations, and details."
          packages={homeOfferPackages}
          badgeText="Agency offer"
          onSelectPackage={setSelectedPackage}
        />
        <PackageSection
          id="normal-packages"
          label="Standard packages"
          title="Simpler package options"
          desc="Standard packages for users who want a straightforward trip option without a custom request."
          packages={homeNormalPackages}
          showOfferSign={false}
          onSelectPackage={setSelectedPackage}
        />
        <ExperienceCarouselSection
          experiences={featuredExperiences}
          onOpenExperience={(id) => navigate(`/experience/${id}`)}
        />
        <WhySection image={homeImages.why} reasons={reasons} />
        <TrustSection signals={trustSignals} />
        <StatsSection />
        <TestimonialsSection testimonials={testimonials} />
        <HomeFaqSection faqs={homeFaqs} />
        <FinalCtaSection
          onCreateTrip={() => navigate("/create-trip")}
          onBrowsePackages={() => navigate("/packages")}
        />
      </main>

      <NewsletterSection />

      <PackageModal
        packageItem={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBook={() => navigate("/auth")}
        onContact={() => navigate("/contact")}
      />

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
