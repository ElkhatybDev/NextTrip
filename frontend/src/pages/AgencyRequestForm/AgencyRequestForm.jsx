import React, { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Send,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  getAgencyMatchesForRequest,
  getTripRequestById,
  saveAgencyOffer,
} from "../../data/userWorkspaceContent";
import "../../styles/portalPages.css";

const defaultAgencyMessage =
  "Thank you for the clear brief. We can prepare a tailored itinerary with hotel, transport, and guided experiences based on your preferences.";

export default function AgencyRequestForm() {
  const { requestId } = useParams();
  const [searchParams] = useSearchParams();
  const request = getTripRequestById(requestId);
  const agencies = getAgencyMatchesForRequest(request);
  const agencyParam = searchParams.get("agency");
  const agency = agencies.find((item) => item.id === agencyParam) || agencies[0];
  const [submitted, setSubmitted] = useState(false);
  const [submittedOffer, setSubmittedOffer] = useState(null);
  const [offer, setOffer] = useState(() => ({
    title: request?.destination
      ? `${request.destination.split(",")[0]} tailored agency offer`
      : "Tailored agency offer",
    totalPrice: request?.priceQuote?.total ? String(request.priceQuote.total) : "",
    hotelPlan: request?.preferences?.hotel || request?.accommodation || "Hotel",
    transportPlan: request?.preferences?.transport || "Private Car",
    itinerary:
      "Day 1: Arrival and transfer\nDay 2: Guided city experience\nDay 3: Local activity and free time\nDay 4: Return transfer",
    includedServices: request?.services?.join(", ") || "Airport Transfer, Local Guide",
    message: defaultAgencyMessage,
    validUntil: "",
    deposit: "30%",
  }));

  const briefItems = useMemo(() => {
    if (!request) {
      return [];
    }

    return [
      { icon: MapPin, label: "Destination", value: request.destination },
      { icon: CalendarDays, label: "Dates", value: request.dates },
      { icon: UsersRound, label: "Travelers", value: request.travelers },
      { icon: WalletCards, label: "Budget", value: request.budget },
      { icon: Sparkles, label: "Mood", value: request.mood },
      { icon: Clock3, label: "Pace", value: request.pace },
    ];
  }, [request]);

  const updateOffer = (field, value) => {
    setOffer((previous) => ({ ...previous, [field]: value }));
  };

  const submitOffer = (event) => {
    event.preventDefault();
    const savedOffer = saveAgencyOffer(request.id, agency?.id, offer);

    setSubmittedOffer(savedOffer);
    setSubmitted(true);
  };

  if (!request) {
    return (
      <div className="portal-page agency-request-page">
        <Navbar />
        <main className="site-shell portal-main">
          <section className="portal-card">
            <h1>Agency request not found</h1>
            <p>This request may have been removed or the link is incorrect.</p>
            <Link to="/agency-dashboard" className="portal-btn portal-btn-secondary">
              Back to dashboard
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="portal-page agency-request-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="portal-hero plan-hero agency-request-hero">
          <div>
            <p className="portal-eyebrow">
              <Building2 size={14} />
              Agency request
            </p>
            <h1>{request.title}</h1>
            <p>
              This is the structured brief an agency receives from NextTrip after
              the traveler sends a custom trip request.
            </p>
          </div>
          <div className="plan-hero-card">
            <FileText size={26} />
            <span>Assigned to</span>
            <strong>{agency?.name || "Matching agency"}</strong>
          </div>
          <Link
            to={`/trip-requests/${request.id}/sent`}
            className="portal-btn portal-btn-ghost"
          >
            <ArrowLeft size={16} />
            Sent page
          </Link>
        </section>

        <section className="agency-request-layout">
          <article className="agency-brief-card">
            <div className="profile-card-head">
              <div>
                <span className="portal-status">Request brief</span>
                <h2>Traveler details received by agency</h2>
              </div>
              <CheckCircle2 size={28} />
            </div>

            <div className="agency-brief-traveler">
              <div className="profile-avatar">
                {(request.traveler?.name || "NextTrip Traveler")
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <span>Traveler</span>
                <h3>{request.traveler?.name || "NextTrip Traveler"}</h3>
                <p>{request.traveler?.email || "traveler@example.com"}</p>
                <p>{request.traveler?.phone || "Phone not provided"}</p>
              </div>
            </div>

            <div className="request-summary-grid agency-brief-grid">
              {briefItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="request-summary-item" key={item.label}>
                    <Icon size={17} />
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                );
              })}
            </div>

            <div className="agency-brief-section">
              <span className="portal-status">Preferences</span>
              <div className="portal-pill-row">
                {[
                  request.preferences?.tripType,
                  request.preferences?.travelStyle,
                  request.preferences?.mealPlan,
                  request.preferences?.hotel,
                  request.preferences?.transport,
                ]
                  .filter(Boolean)
                  .map((item) => (
                    <span className="portal-pill" key={item}>
                      {item}
                    </span>
                  ))}
              </div>
            </div>

            <div className="agency-brief-section">
              <span className="portal-status">Requested services</span>
              <div className="portal-pill-row">
                {request.services.map((service) => (
                  <span className="portal-pill" key={service}>
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="agency-brief-notes">
              <span className="portal-status">Traveler notes</span>
              <p>{request.notes}</p>
            </div>
          </article>

          <aside className="agency-offer-card">
            <div className="profile-card-head">
              <div>
                <span className="portal-status">Agency reply</span>
                <h2>Send offer to traveler</h2>
              </div>
              <Send size={28} />
            </div>

            {submitted ? (
              <div className="agency-offer-success">
                <CheckCircle2 size={38} />
                <h3>Offer ready for traveler</h3>
                <p>
                  {agency?.name || "The agency"} prepared{" "}
                  <strong>{submittedOffer?.totalPrice || "an offer"}</strong> for{" "}
                  <strong>{request.id}</strong>. The traveler can compare it from
                  their request workspace.
                </p>
                <Link
                  to={`/trip-requests/${request.id}/offers`}
                  className="portal-btn portal-btn-primary"
                >
                  Compare traveler offers
                </Link>
                <Link
                  to={`/trip-requests/${request.id}/sent`}
                  className="portal-btn portal-btn-secondary"
                >
                  Back to sent page
                </Link>
              </div>
            ) : (
              <form className="portal-form-grid agency-offer-form" onSubmit={submitOffer}>
                <div className="portal-field portal-field-full">
                  <label>Offer title</label>
                  <input
                    value={offer.title}
                    onChange={(event) => updateOffer("title", event.target.value)}
                    required
                  />
                </div>

                <div className="portal-field">
                  <label>Total price MAD</label>
                  <input
                    value={offer.totalPrice}
                    onChange={(event) => updateOffer("totalPrice", event.target.value)}
                    placeholder="Example: 18000"
                    required
                  />
                </div>

                <div className="portal-field">
                  <label>Deposit</label>
                  <input
                    value={offer.deposit}
                    onChange={(event) => updateOffer("deposit", event.target.value)}
                    required
                  />
                </div>

                <div className="portal-field">
                  <label>Hotel proposal</label>
                  <input
                    value={offer.hotelPlan}
                    onChange={(event) => updateOffer("hotelPlan", event.target.value)}
                    required
                  />
                </div>

                <div className="portal-field">
                  <label>Transport proposal</label>
                  <input
                    value={offer.transportPlan}
                    onChange={(event) => updateOffer("transportPlan", event.target.value)}
                    required
                  />
                </div>

                <div className="portal-field portal-field-full">
                  <label>Included services</label>
                  <textarea
                    value={offer.includedServices}
                    onChange={(event) =>
                      updateOffer("includedServices", event.target.value)
                    }
                    required
                  />
                </div>

                <div className="portal-field portal-field-full">
                  <label>Itinerary proposal</label>
                  <textarea
                    value={offer.itinerary}
                    onChange={(event) => updateOffer("itinerary", event.target.value)}
                    required
                  />
                </div>

                <div className="portal-field portal-field-full">
                  <label>Message to traveler</label>
                  <textarea
                    value={offer.message}
                    onChange={(event) => updateOffer("message", event.target.value)}
                    required
                  />
                </div>

                <div className="portal-field portal-field-full">
                  <label>Offer valid until</label>
                  <input
                    type="date"
                    value={offer.validUntil}
                    onChange={(event) => updateOffer("validUntil", event.target.value)}
                  />
                </div>

                <button type="submit" className="portal-btn portal-btn-primary">
                  <Send size={16} />
                  Send offer
                </button>
              </form>
            )}
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}
