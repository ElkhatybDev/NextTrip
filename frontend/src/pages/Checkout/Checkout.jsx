import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { calculatePackagePricing, getPackageDetails } from "../../services/packagesService";
import BookingView from "../Packages/components/BookingView";
import "../Packages/Packages.css";

const checkoutInitialState = {
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

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageId } = useParams();
  const travelPackage = getPackageDetails(packageId || 1) || getPackageDetails(1);
  const [bookingForm, setBookingForm] = useState(() => ({
    ...checkoutInitialState,
    ...(location.state?.bookingForm || {}),
  }));
  const [saveCard, setSaveCard] = useState(location.state?.saveCard ?? true);

  const travelersCount = Math.max(1, parseInt(bookingForm.travelers || "1", 10) || 1);
  const pricing = useMemo(
    () => calculatePackagePricing(travelPackage, travelersCount),
    [travelPackage, travelersCount]
  );

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const confirmBooking = () => {
    navigate(`/booking-success/${travelPackage.id}`, {
      state: {
        selectedPackage: travelPackage,
        bookingForm,
        travelersCount,
        pricing,
        saveCard,
      },
    });
  };

  return (
    <div className="packages-page checkout-page">
      <Navbar />
      <section className="packages-hero checkout-hero">
        <div className="packages-hero-overlay" />
        <div className="trip-container packages-hero-content">
          <p className="packages-badge">Paiement sécurisé</p>
          <h1>Vérifiez et confirmez votre forfait.</h1>
          <p>
            Vérifiez les informations voyageur, les détails de paiement et le
            total avant de confirmer votre réservation NextTrip.
          </p>
          <Link to={`/packages/${travelPackage.id}`} className="checkout-hero-link">
            Détails du forfait
          </Link>
        </div>
      </section>

      <BookingView
        selectedPackage={travelPackage}
        bookingForm={bookingForm}
        travelersCount={travelersCount}
        pricing={pricing}
        saveCard={saveCard}
        onBookingChange={handleBookingChange}
        onSaveCardChange={() => setSaveCard((value) => !value)}
        onCheckout={confirmBooking}
        onBackToPackages={() => navigate(`/packages/${travelPackage.id}`)}
        backLabel="Retour au forfait"
      />

      <Footer />
    </div>
  );
}
