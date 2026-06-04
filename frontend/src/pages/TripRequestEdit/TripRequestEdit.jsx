import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Edit3,
  MapPin,
  RefreshCw,
  Send,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TripForm from "../../components/TripForm/TripForm";
import RequestLoadingModal from "../../components/RequestLoadingModal/RequestLoadingModal";
import useModalBodyState from "../../hooks/useModalBodyState";
import {
  inspirationItems,
  serviceOptions,
  travelStyles,
  tripFilterGroups,
} from "../../data/tripBuilderOptions";
import { fallbackDestinations } from "../../data/homeContent";
import {
  getAgencyMatchesForRequest,
  getRequestOffers,
  getTripRequestById,
  updateTripRequest,
} from "../../data/userWorkspaceContent";
import { fetchDestinationOptions } from "../../services/destinationsApi";
import { calculateTripPrice } from "../../utils/tripPricing";
import "../CreateTrip/CreateTrip.css";
import "../../styles/portalPages.css";

const defaultForm = {
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
  tripMood: "Culture",
  budgetLevel: "Comfort",
  pace: "Balanced",
  accommodation: "Hotel",
};

function parseStoredDates(dates = "") {
  const [departureDate = "", returnDate = ""] = dates.split(" to ");

  return {
    departureDate: /^\d{4}-\d{2}-\d{2}$/.test(departureDate) ? departureDate : "",
    returnDate: /^\d{4}-\d{2}-\d{2}$/.test(returnDate) ? returnDate : "",
  };
}

function buildInitialForm(request) {
  const parsedDates = parseStoredDates(request.dates);

  return {
    ...defaultForm,
    ...parsedDates,
    ...(request.formFields || {}),
    destination: request.formFields?.destination || request.destination || "",
    travelers:
      request.formFields?.travelers ||
      String(request.travelers || "2").match(/\d+/)?.[0] ||
      "2",
    budget: request.formFields?.budget || request.preferences?.targetBudget || "",
    notes: request.formFields?.notes || request.notes || "",
    tripMood: request.formFields?.tripMood || request.mood || "Culture",
    pace: request.formFields?.pace || request.pace || "Balanced",
    accommodation:
      request.formFields?.accommodation || request.accommodation || "Hotel",
  };
}

export default function TripRequestEdit() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const resendTimerRef = useRef(null);
  const request = getTripRequestById(requestId);
  const existingOffers = getRequestOffers(requestId);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isResendingUpdate, setIsResendingUpdate] = useState(false);
  const [form, setForm] = useState(() =>
    request ? buildInitialForm(request) : defaultForm
  );
  const [extras, setExtras] = useState(() =>
    request?.extras?.length ? request.extras : request?.services || []
  );
  const [destinationOptions, setDestinationOptions] = useState(fallbackDestinations);

  const priceEstimate = useMemo(() => calculateTripPrice(form, extras), [form, extras]);

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

  useModalBodyState(showConfirm || isResendingUpdate);

  useEffect(() => (
    () => {
      if (resendTimerRef.current) {
        window.clearTimeout(resendTimerRef.current);
      }
    }
  ), []);

  if (!request) {
    return (
      <div className="portal-page request-edit-page">
        <Navbar />
        <main className="site-shell portal-main">
          <section className="portal-card">
            <h1>Trip request not found</h1>
            <p>This request may have been removed or the link is incorrect.</p>
            <Link to="/profile" className="portal-btn portal-btn-secondary">
              Back to profile
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateField(name, value);
  };

  const handleFilterChange = (field, value) => {
    updateField(field, value);
  };

  const handleDestinationPick = (destination) => {
    updateField("destination", destination);
  };

  const toggleExtra = (service) => {
    setExtras((previous) =>
      previous.includes(service)
        ? previous.filter((item) => item !== service)
        : [...previous, service]
    );
  };

  const confirmUpdate = () => {
    if (isResendingUpdate) {
      return;
    }

    const now = new Date();
    const datesLabel =
      form.departureDate && form.returnDate
        ? `${form.departureDate} to ${form.returnDate}`
        : form.departureDate || "Flexible dates";
    const agencyMatches = getAgencyMatchesForRequest({
      ...request,
      destination: form.destination,
      mood: form.tripMood,
      pace: form.pace,
      accommodation: form.accommodation,
      services: extras,
      notes: form.notes,
    });
    const nextRequest = {
      ...request,
      title: form.destination
        ? `${form.destination.split(",")[0]} custom trip`
        : request.title,
      destination: form.destination || "Not selected yet",
      dates: datesLabel,
      travelers: `${form.travelers || 1} traveler(s)`,
      budget: priceEstimate.totalLabel,
      status: "Updated request sent",
      requestVersion: (request.requestVersion || 1) + 1,
      formFields: form,
      extras,
      mood: form.tripMood,
      pace: form.pace,
      accommodation: form.accommodation,
      preferences: {
        tripType: form.tripType,
        travelStyle: form.travelStyle,
        budgetLevel: form.budgetLevel,
        mealPlan: form.mealPlan,
        hotel: form.hotel || "Agency recommendation",
        transport: form.transport || "Agency recommendation",
        targetBudget: form.budget || "Not specified",
      },
      services: extras.length ? extras : ["Agency recommendation"],
      notes:
        form.notes ||
        "Traveler updated the trip request and is waiting for refreshed agency offers.",
      selectedOfferId: null,
      bookingStatus: null,
      assignedAgencyIds: agencyMatches.map((agency) => agency.id),
      agencyDelivery: {
        status: "Updated request sent to agencies",
        sentAt: now.toISOString(),
        recipients: agencyMatches.length,
      },
      timeline: [
        { label: "Request updated", value: now.toLocaleDateString("en") },
        {
          label: "Resent to agencies",
          value: agencyMatches.map((agency) => agency.name).join(", "),
        },
        { label: "Current step", value: "Waiting for updated offers" },
      ],
      priceQuote: {
        total: priceEstimate.total,
        perTraveler: priceEstimate.perTraveler,
        days: priceEstimate.days,
        season: priceEstimate.season.label,
        region: priceEstimate.region,
        breakdown: priceEstimate.breakdown,
      },
      updatedAt: now.toISOString(),
    };

    setShowConfirm(false);
    setIsResendingUpdate(true);

    resendTimerRef.current = window.setTimeout(() => {
      updateTripRequest(request.id, nextRequest);
      setIsResendingUpdate(false);
      navigate(`/trip-requests/${request.id}/sent`);
      resendTimerRef.current = null;
    }, 900);
  };

  const openConfirmUpdate = (event) => {
    event.preventDefault();
    setShowConfirm(true);
  };

  const summaryItems = [
    { icon: MapPin, label: "Destination", value: form.destination || "Not selected" },
    {
      icon: CalendarDays,
      label: "Dates",
      value:
        form.departureDate && form.returnDate
          ? `${form.departureDate} to ${form.returnDate}`
          : "Flexible dates",
    },
    { icon: UsersRound, label: "Travelers", value: form.travelers || "1" },
    { icon: WalletCards, label: "Estimate", value: priceEstimate.totalLabel },
  ];

  const confirmModal = showConfirm ? (
    <div className="portal-modal-overlay" role="dialog" aria-modal="true">
      <section className="portal-confirm-modal">
        <span className="portal-status">Confirm update</span>
        <h2>Resend this request to agencies?</h2>
        <p>
          NextTrip will send version {(request.requestVersion || 1) + 1} to
          matching agencies. Any old offers will be treated as needing update.
        </p>
        <div className="portal-confirm-actions">
          <button
            type="button"
            className="portal-btn portal-btn-secondary"
            onClick={() => setShowConfirm(false)}
          >
            Keep editing
          </button>
          <button
            type="button"
            className="portal-btn portal-btn-primary"
            onClick={confirmUpdate}
            disabled={isResendingUpdate}
          >
            <Send size={16} />
            Confirm and resend
          </button>
        </div>
      </section>
    </div>
  ) : null;

  const resendLoadingModal = isResendingUpdate ? (
    <RequestLoadingModal
      eyebrow="RESENDING UPDATE"
      title="Sending the new brief version."
      description="NextTrip is saving your edits and routing the refreshed request to matching agencies."
      steps={["Save edits", "Refresh agencies", "Open status"]}
    />
  ) : null;

  return (
    <div className="portal-page request-edit-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="portal-hero plan-hero request-edit-hero">
          <div>
            <p className="portal-eyebrow">
              <Edit3 size={14} />
              Edit request
            </p>
            <h1>Update your brief before agencies prepare the next offers.</h1>
            <p>
              Change the trip details, review the new estimate, then confirm the
              update so NextTrip resends the request to matching agencies.
            </p>
          </div>
          <div className="plan-hero-card">
            <RefreshCw size={26} />
            <span>Request version</span>
            <strong>Version {(request.requestVersion || 1) + 1} after update</strong>
          </div>
          <Link to={`/trip-requests/${request.id}`} className="portal-btn portal-btn-ghost">
            <ArrowLeft size={16} />
            Back to request
          </Link>
        </section>

        <section className="request-edit-layout">
          <div className="request-edit-form-panel">
            <TripForm
              form={form}
              extras={extras}
              travelStyles={travelStyles}
              serviceOptions={serviceOptions}
              destinationOptions={destinationOptions}
              priceEstimate={priceEstimate}
              inspirationItems={inspirationItems}
              tripFilterGroups={tripFilterGroups}
              onChange={handleChange}
              onFilterChange={handleFilterChange}
              onToggleExtra={toggleExtra}
              onTravelStyleChange={(style) => updateField("travelStyle", style)}
              onDestinationPick={handleDestinationPick}
              onSubmit={openConfirmUpdate}
              compact
              sectionLabel="EDIT REQUEST"
              heading="Update your trip"
              description="Change the details agencies need, then resend the newest brief."
              summaryTitle="Updated trip summary"
              summaryDescription="Review the changed details before confirming the resend."
              submitLabel="Review update"
              submitDisabled={isResendingUpdate}
            />
            <div className="request-edit-secondary-actions">
              <Link
                to={`/trip-requests/${request.id}`}
                className="portal-btn portal-btn-secondary"
              >
                Cancel
              </Link>
            </div>
          </div>

          <aside className="request-edit-summary-card">
            <span className="portal-status">Live update</span>
            <h2>New request preview</h2>
            <div className="request-edit-summary-list">
              {summaryItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label}>
                    <Icon size={17} />
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                );
              })}
            </div>
            {existingOffers.length ? (
              <p className="request-edit-warning">
                Existing offers will need refresh after this update because the
                request details changed.
              </p>
            ) : (
              <p>
                Agencies will receive this updated brief and prepare offers from
                the newest request version.
              </p>
            )}
          </aside>
        </section>
      </main>

      {confirmModal ? createPortal(confirmModal, document.body) : null}
      {resendLoadingModal ? createPortal(resendLoadingModal, document.body) : null}

      <Footer />
    </div>
  );
}
