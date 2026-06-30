import React from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { calculatePackagePricing, getPackageDetails } from "../../services/packagesService";
import BookingSuccessView from "../Packages/components/BookingSuccessView";

const fallbackBookingForm = {
  fullName: "Voyageur NextTrip",
  email: "",
  phone: "",
  travelers: "2",
  specialRequest: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

function getSafeTravelersCount(stateTravelersCount, bookingForm) {
  return Math.max(1, Number(stateTravelersCount || bookingForm.travelers || 1) || 1);
}

export default function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageId } = useParams();
  const state = location.state || {};
  const selectedPackage =
    state.selectedPackage ||
    getPackageDetails(packageId || state.packageId || 1) ||
    getPackageDetails(1);
  const bookingForm = {
    ...fallbackBookingForm,
    ...(state.bookingForm || {}),
  };
  const travelersCount = getSafeTravelersCount(state.travelersCount, bookingForm);
  const saveCard = state.saveCard ?? true;
  const booking = state.booking || null;

  if (!selectedPackage) {
    return <Navigate to="/packages" replace />;
  }

  const pricing = state.pricing || calculatePackagePricing(selectedPackage, travelersCount);

  return (
    <BookingSuccessView
      selectedPackage={selectedPackage}
      bookingForm={bookingForm}
      travelersCount={travelersCount}
      pricing={pricing}
      saveCard={saveCard}
      booking={booking}
      onBackToBooking={() =>
        navigate(`/checkout/${selectedPackage.id}`, {
          state: { bookingForm, saveCard },
        })
      }
      onBackToPackages={() => navigate("/my-bookings")}
    />
  );
}
