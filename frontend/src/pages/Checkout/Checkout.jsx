import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { createBooking } from "../../services/bookingsApi";
import { fetchPackageDetails, calculatePackagePricing, getPackageDetails } from "../../services/packagesService";
import { getAuthSession } from "../../utils/authSession";
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

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function isValidCardNumber(value) {
  const digits = onlyDigits(value);
  return digits.length === 14;
}

function isValidExpiry(value) {
  const match = String(value || "").match(/^(\d{2})\/(\d{2})$/);

  if (!match) {
    return false;
  }

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);

  if (month < 1 || month > 12) {
    return false;
  }

  const expiresAt = new Date(year, month, 0, 23, 59, 59);

  return expiresAt >= new Date();
}

function getPaymentValidationError(form) {
  if (!form.cardName.trim()) {
    return "Saisissez le nom du titulaire de la carte.";
  }
  if (!isValidCardNumber(form.cardNumber)) {
    return "Numéro de carte invalide. Saisissez exactement 14 chiffres.";
  }
  if (!isValidExpiry(form.expiry)) {
    return "Date d’expiration invalide. Format attendu : MM/AA.";
  }
  if (!/^\d{3}$/.test(onlyDigits(form.cvv))) {
    return "Le code CVV doit contenir exactement 3 chiffres.";
  }

  return "";
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageId } = useParams();
  const [apiPackage, setApiPackage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const travelPackage = apiPackage || getPackageDetails(packageId || 1) || getPackageDetails(1);
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

  useEffect(() => {
    let isMounted = true;

    fetchPackageDetails(packageId || 1)
      .then((item) => {
        if (isMounted) {
          setApiPackage(item);
        }
      })
      .catch(() => {
        if (isMounted) {
          setApiPackage(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [packageId]);

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "cardNumber") {
      nextValue = onlyDigits(value).slice(0, 14).replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "expiry") {
      const digits = onlyDigits(value).slice(0, 4);
      nextValue = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }

    if (name === "cvv") {
      nextValue = onlyDigits(value).slice(0, 3);
    }

    setBookingForm((currentForm) => ({
      ...currentForm,
      [name]: nextValue,
    }));
  };

  const confirmBooking = async () => {
    const session = getAuthSession();

    if (!session?.token) {
      navigate("/auth", {
        state: {
          from: `/checkout/${travelPackage.id}`,
          role: "traveler",
        },
      });
      return;
    }

    setIsSubmitting(true);
    setCheckoutError("");

    const paymentError = getPaymentValidationError(bookingForm);

    if (paymentError) {
      setCheckoutError(paymentError);
      setIsSubmitting(false);
      return;
    }

    try {
      const booking = await createBooking({
        travel_package_id: travelPackage.id,
        guests_count: travelersCount,
        payment_provider: "card-demo",
        traveler_details: {
          fullName: bookingForm.fullName,
          email: bookingForm.email,
          phone: bookingForm.phone,
          specialRequest: bookingForm.specialRequest,
          saveCard,
        },
      });

      navigate(`/booking-success/${travelPackage.id}`, {
        state: {
          selectedPackage: travelPackage,
          bookingForm,
          travelersCount,
          pricing,
          saveCard,
          booking,
        },
      });
    } catch (error) {
      setCheckoutError(error?.data?.message || "Booking failed. Please sign in and try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        checkoutError={checkoutError}
        isSubmitting={isSubmitting}
        onBackToPackages={() => navigate(`/packages/${travelPackage.id}`)}
        backLabel="Retour au forfait"
      />

      <Footer />
    </div>
  );
}
