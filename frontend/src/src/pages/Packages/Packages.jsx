import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { packageCategories } from "../../data/packageCatalog";
import {
  calculatePackagePricing,
  filterPackages,
  getOffers,
  getPackages,
} from "../../services/packagesService";
import BookingSuccessView from "./components/BookingSuccessView";
import BookingView from "./components/BookingView";
import PackagesListView from "./components/PackagesListView";
import "./Packages.css";

const bookingInitialState = {
  fullName: "",
  email: "",
  phone: "",
  travelers: "2",
  specialRequest: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

export default function Packages({ variant = "packages" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOffersPage = variant === "offers";
  const filtersFromHome = location.state?.searchFilters || null;
  const [page, setPage] = useState("packages");
  const [search, setSearch] = useState(() => filtersFromHome?.destination || "");
  const [selectedCategory, setSelectedCategory] = useState(() =>
    packageCategories.includes(filtersFromHome?.tripType) ? filtersFromHome.tripType : "All"
  );
  const [activeHomeFilters, setActiveHomeFilters] = useState(filtersFromHome);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingForm, setBookingForm] = useState(bookingInitialState);
  const [saveCard, setSaveCard] = useState(true);

  const packages = getPackages();
  const offers = getOffers();
  const visiblePackages = isOffersPage ? offers : packages;
  const visibleCategories = useMemo(
    () => ["All", ...Array.from(new Set(visiblePackages.map((item) => item.category)))],
    [visiblePackages]
  );
  const filteredPackages = useMemo(
    () => filterPackages(visiblePackages, { search, category: selectedCategory }),
    [visiblePackages, search, selectedCategory]
  );

  const activePackage = selectedPackage || filteredPackages[0] || visiblePackages[0] || packages[0];
  const travelersCount = Math.max(1, parseInt(bookingForm.travelers || "1", 10) || 1);
  const pricing = useMemo(
    () => calculatePackagePricing(activePackage, travelersCount),
    [activePackage, travelersCount]
  );

  const activeSearchSummary = useMemo(() => {
    if (!activeHomeFilters) {
      return [];
    }

    return [
      activeHomeFilters.destination,
      activeHomeFilters.date,
      activeHomeFilters.tripType,
      activeHomeFilters.guests,
    ].filter(Boolean);
  }, [activeHomeFilters]);

  useEffect(() => {
    if (!filtersFromHome) {
      return;
    }

    setActiveHomeFilters(filtersFromHome);
    setSearch(filtersFromHome.destination || "");
    setSelectedCategory(
      packageCategories.includes(filtersFromHome.tripType)
        ? filtersFromHome.tripType
        : "All"
    );
  }, [filtersFromHome]);

  useEffect(() => {
    if (!visibleCategories.includes(selectedCategory)) {
      setSelectedCategory("All");
    }
  }, [selectedCategory, visibleCategories]);

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingForm((previousForm) => ({ ...previousForm, [name]: value }));
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

  const goToSuccess = () => {
    setPage("success");
    scrollTopSafe();
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setActiveHomeFilters(null);
  };

  if (page === "success" && activePackage) {
    return (
      <BookingSuccessView
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

  return (
    <div className="packages-page">
      <Navbar />
      <section className="packages-hero">
        <div className="packages-hero-overlay" />
        <div className="trip-container packages-hero-content">
          <p className="packages-badge">
            {page === "booking"
              ? "PAIEMENT SÉCURISÉ"
              : isOffersPage
                ? "AGENCY OFFERS"
                : "CURATED TRAVEL PACKAGES"}
          </p>
          <h1>
            {page === "booking"
              ? "Vérifiez et confirmez votre voyage"
              : isOffersPage
                ? "Offers"
                : "Packages"}
          </h1>
          <p>
            {page === "booking"
              ? `Vérifiez les informations voyageur, les détails de paiement et le total pour ${activePackage.title}.`
              : isOffersPage
                ? "Compare highlighted agency offers with clear prices, trip styles, and booking details."
                : "Discover handpicked packages designed for romance, adventure, culture, and unforgettable escapes."}
          </p>
        </div>
      </section>

      {page === "booking" ? (
        <BookingView
          selectedPackage={activePackage}
          bookingForm={bookingForm}
          travelersCount={travelersCount}
          pricing={pricing}
          saveCard={saveCard}
          onBookingChange={handleBookingChange}
          onSaveCardChange={() => setSaveCard((value) => !value)}
          onCheckout={goToSuccess}
          onBackToPackages={backToPackages}
        />
      ) : (
        <PackagesListView
          search={search}
          categories={visibleCategories}
          selectedCategory={selectedCategory}
          packages={filteredPackages}
          activeSearchSummary={activeSearchSummary}
          title={isOffersPage ? "Available offers" : "Available packages"}
          countLabel={isOffersPage ? "offers found" : "packages found"}
          variant={isOffersPage ? "offers" : "packages"}
          onSearchChange={setSearch}
          onCategoryChange={setSelectedCategory}
          onClearFilters={clearFilters}
          onViewDetails={(item) => navigate(`/packages/${item.id}`)}
          onBookNow={openBooking}
        />
      )}

      <Footer />
    </div>
  );
}
