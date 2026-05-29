import React, { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Send,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TripForm from "../../components/TripForm/TripForm";
import {
  inspirationItems,
  serviceOptions,
  travelStyles,
  tripFilterGroups,
} from "../../data/tripBuilderOptions";
import { fallbackDestinations } from "../../data/homeContent";
import { fetchDestinationOptions } from "../../services/destinationsApi";
import { calculateTripPrice } from "../../utils/tripPricing";
import "./CreateTrip.css";

export default function CreateTrip() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Trip request submitted successfully.");
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
          ? `${form.departureDate} -> ${form.returnDate}`
          : "Choose travel dates",
    },
    {
      icon: UsersRound,
      label: "Travelers",
      value: `${form.travelers || 1} traveler(s)`,
    },
    {
      icon: WalletCards,
      label: "Estimated Price",
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
              Choose your destination, mood, budget, travelers, services, and notes.
              NextTrip turns that into a clean request ready for agencies.
            </p>
            <div className="trip-hero-actions">
              <span>
                <CheckCircle2 size={16} />
                Structured request
              </span>
              <span>
                <CheckCircle2 size={16} />
                Better agency offers
              </span>
            </div>
          </div>

          <aside className="trip-hero-panel">
            <div className="trip-hero-panel-head">
              <SlidersHorizontal size={22} />
              <div>
                <span>Trip builder</span>
                <strong>4 step request</strong>
              </div>
            </div>
            <div className="trip-flow-list">
              <p>
                <Building2 size={16} />
                Agencies receive your clear brief
              </p>
              <p>
                <Send size={16} />
                Offers can be compared later
              </p>
            </div>
          </aside>
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
                <span>fields ready</span>
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
              <p className="trip-live-note">
                Agencies receive this as a structured request, so they can reply with
                cleaner offers instead of asking for missing details.
              </p>
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
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
