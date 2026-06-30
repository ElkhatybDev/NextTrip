import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Send,
  Sparkles,
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
  profileOverview,
  saveTripRequest,
} from "../../data/userWorkspaceContent";
import { fetchDestinationOptions } from "../../services/destinationsApi";
import { createTripRequest } from "../../services/tripRequestsApi";
import { getAuthSession } from "../../utils/authSession";
import { calculateTripPrice } from "../../utils/tripPricing";
import "./CreateTrip.css";

export default function CreateTrip() {
  const navigate = useNavigate();
  const submitTimerRef = useRef(null);
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
    tripMood: "Culture",
    budgetLevel: "Comfort",
    pace: "Balanced",
    accommodation: "Hotel",
  });

  const [extras, setExtras] = useState([
    "Airport Transfer",
    "Local Guide",
    "Excursions",
  ]);
  const [destinationOptions, setDestinationOptions] = useState(fallbackDestinations);
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleExtra = (item) => {
    setExtras((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleFilterChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittedRequest || isSendingRequest) {
      return;
    }

    const session = getAuthSession();

    if (!session?.token) {
      navigate("/auth", { state: { from: "/create-trip", role: "traveler" } });
      return;
    }

    const createdAt = new Date();
    const requestId = `REQ-${createdAt.getFullYear()}-${String(createdAt.getTime()).slice(-6)}`;
    const datesLabel =
      form.departureDate && form.returnDate
        ? `${form.departureDate} to ${form.returnDate}`
        : form.departureDate || "Flexible dates";
    const request = {
      id: requestId,
      title: form.destination
        ? `${form.destination.split(",")[0]} custom trip`
        : `${form.tripType} request`,
      destination: form.destination || "Not selected yet",
      dates: datesLabel,
      travelers: `${form.travelers || 1} traveler(s)`,
      budget: priceEstimate.totalLabel,
      status: "Request sent",
      requestVersion: 1,
      formFields: form,
      extras,
      traveler: {
        name: profileOverview.name,
        email: profileOverview.email,
        phone: profileOverview.phone,
        homeCity: profileOverview.homeCity,
        status: profileOverview.status,
      },
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
        "Traveler created a custom trip request and is waiting for tailored agency offers.",
      timeline: [
        {
          label: "Request created",
          value: createdAt.toLocaleDateString("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        },
        { label: "Matched by NextTrip", value: "Agencies selected" },
        { label: "Current step", value: "Waiting for agency offers" },
      ],
      priceQuote: {
        total: priceEstimate.total,
        perTraveler: priceEstimate.perTraveler,
        days: priceEstimate.days,
        season: priceEstimate.season.label,
        region: priceEstimate.region,
        breakdown: priceEstimate.breakdown,
      },
      createdAt: createdAt.toISOString(),
    };
    const agencyMatches = getAgencyMatchesForRequest(request);
    const routedRequest = {
      ...request,
      assignedAgencyIds: agencyMatches.map((agency) => agency.id),
      agencyDelivery: {
        status: "Sent to matching agencies",
        sentAt: createdAt.toISOString(),
        recipients: agencyMatches.length,
      },
      timeline: [
        request.timeline[0],
        {
          label: "Sent to agencies",
          value: agencyMatches.map((agency) => agency.name).join(", "),
        },
        request.timeline[2],
      ],
    };

    setIsSendingRequest(true);

    try {
      const apiRequest = await createTripRequest({
        destination: form.destination || "Not selected yet",
        start_date: form.departureDate || null,
        end_date: form.returnDate || null,
        travelers_count: Number(form.travelers || 1),
        budget: priceEstimate.total,
        currency: "MAD",
        preferences: {
          ...routedRequest.preferences,
          extras,
          mood: form.tripMood,
          pace: form.pace,
          accommodation: form.accommodation,
          localDraft: routedRequest,
        },
        notes: routedRequest.notes,
      });
      const savedRequest = {
        ...routedRequest,
        id: String(apiRequest.id),
        apiId: apiRequest.id,
        requestReference: apiRequest.request_reference,
      };

      saveTripRequest(savedRequest);
      setSubmittedRequest(savedRequest);
    } catch {
      saveTripRequest(routedRequest);
      setSubmittedRequest(routedRequest);
    } finally {
      setIsSendingRequest(false);
      submitTimerRef.current = null;
    }
  };

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

  useModalBodyState(
    isSendingRequest || Boolean(submittedRequest),
    submittedRequest ? "trip-request-success-open" : ""
  );

  useEffect(() => (
    () => {
      if (submitTimerRef.current) {
        window.clearTimeout(submitTimerRef.current);
      }
    }
  ), []);

  const openSubmittedRequest = () => {
    if (!submittedRequest) {
      return;
    }

    navigate(`/trip-requests/${submittedRequest.id}/sent`);
  };

  const editSubmittedRequest = () => {
    if (!submittedRequest) {
      return;
    }

    navigate(`/trip-requests/${submittedRequest.id}/edit`);
  };

  const priceEstimate = useMemo(() => calculateTripPrice(form, extras), [form, extras]);

  const liveBrief = [
    {
      icon: MapPin,
      label: "Destination",
      value: form.destination || "Not selected",
    },
    {
      icon: CalendarDays,
      label: "Dates",
      value:
        form.departureDate && form.returnDate
          ? `${form.departureDate} to ${form.returnDate}`
          : "Choose travel dates",
    },
    {
      icon: UsersRound,
      label: "Travelers",
      value: `${form.travelers || 1} traveler(s)`,
    },
    {
      icon: WalletCards,
      label: "Estimate",
      value: priceEstimate.totalLabel,
    },
  ];

  const requestProgress = [
    form.destination,
    form.departureDate,
    form.returnDate,
    form.travelers,
    form.tripMood,
    extras.length > 0,
  ].filter(Boolean).length;

  const loadingModal = isSendingRequest ? (
    <RequestLoadingModal
      eyebrow="SENDING REQUEST"
      title="Matching your brief with agencies."
      description="NextTrip is saving your trip details, finding relevant agencies, and preparing the request workspace."
      steps={["Save brief", "Match agencies", "Open offers"]}
    />
  ) : null;

  const successModal = submittedRequest && !isSendingRequest ? (
    <div className="trip-success-overlay" role="dialog" aria-modal="true">
      <div className="trip-success-card">
        <span className="trip-success-icon">
          <CheckCircle2 size={34} />
        </span>
        <p className="trip-section-label">REQUEST SENT SUCCESSFULLY</p>
        <h2>Your request was sent.</h2>
        <p>
          Reference <strong>{submittedRequest.id}</strong> is saved and sent
          to matching agencies. Choose what you want to do next.
        </p>
        <div className="trip-success-summary">
          <div>
            <MapPin size={16} />
            <span>{submittedRequest.destination}</span>
          </div>
          <div>
            <WalletCards size={16} />
            <span>{submittedRequest.budget}</span>
          </div>
          <div>
            <Clock3 size={16} />
            <span>Sent to agencies</span>
          </div>
        </div>
        <div className="trip-success-actions">
          <button
            type="button"
            className="trip-success-primary"
            onClick={openSubmittedRequest}
          >
            View request
            <Send size={16} />
          </button>
          <button
            type="button"
            className="trip-success-secondary"
            onClick={editSubmittedRequest}
          >
            Edit request
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="create-trip-page">
      <Navbar />

      <section className="trip-hero">
        <div className="trip-hero-overlay" />
        <div className="trip-container trip-hero-content trip-hero-grid">
          <div>
            <p className="trip-hero-badge">
              <Sparkles size={14} />
              PERSONALIZED TRAVEL REQUEST
            </p>
            <h1>Create a trip brief agencies can answer faster.</h1>
            <p>
              Add the details agencies need to send accurate offers.
            </p>
          </div>
        </div>
      </section>

      <main className="trip-main">
        <div className="trip-container">
          <div className="trip-builder-shell">
            <aside className="trip-live-brief">
              <p className="trip-section-label">LIVE BRIEF</p>
              <h2>Your request snapshot</h2>
              <div
                className="trip-progress-ring"
                style={{ "--trip-progress": `${(requestProgress / 6) * 100}%` }}
              >
                <strong>{requestProgress}/6</strong>
                <span>ready</span>
              </div>
              <div className="trip-live-list">
                {liveBrief.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="trip-live-item">
                      <Icon size={18} />
                      <div>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="trip-live-tags">
                <span>{form.tripMood}</span>
                <span>{form.pace}</span>
                <span>{form.accommodation}</span>
              </div>
            </aside>

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
              onTravelStyleChange={(style) =>
                setForm((prev) => ({ ...prev, travelStyle: style }))
              }
              onDestinationPick={(destination) =>
                setForm((prev) => ({ ...prev, destination }))
              }
              onSubmit={handleSubmit}
              submitDisabled={isSendingRequest}
              submitLabel={isSendingRequest ? "Sending..." : "Send request"}
              compact
            />
          </div>
        </div>
      </main>

      {loadingModal ? createPortal(loadingModal, document.body) : null}
      {successModal ? createPortal(successModal, document.body) : null}

      <Footer />
    </div>
  );
}
