import React from "react";
import { dashboardIcons } from "../icons";
import SectionTitle from "./SectionTitle";
import StatusBadge from "./StatusBadge";

export default function BookingsSection({
  bookings,
  bookingFilter,
  bookingStats,
  onBookingFilterChange,
  onSubmitOffer,
  onExport,
}) {
  const ClockIcon = dashboardIcons.clock;
  const DollarIcon = dashboardIcons.dollar;
  const DownloadIcon = dashboardIcons.download;
  const MapPinIcon = dashboardIcons.mapPin;
  const statusLabels = {
    pending: "En attente",
    review: "En cours",
  };

  return (
    <section className="dashboard-section">
      <SectionTitle
        title="Demandes clients"
        subtitle="Nouveaux briefs de voyage en attente d’une offre de votre agence"
        action={
          <div className="booking-actions">
            <button
              type="button"
              onClick={() => onBookingFilterChange("all")}
              className={`filter-pill ${
                bookingFilter === "all" ? "filter-pill-active-blue" : ""
              }`}
            >
              Toutes ({bookingStats.all})
            </button>
            <button
              type="button"
              onClick={() => onBookingFilterChange("pending")}
              className={`filter-pill ${
                bookingFilter === "pending" ? "filter-pill-active-orange" : ""
              }`}
            >
              En attente ({bookingStats.pending})
            </button>
            <button
              type="button"
              onClick={() => onBookingFilterChange("review")}
              className={`filter-pill ${
                bookingFilter === "review" ? "filter-pill-active-review" : ""
              }`}
            >
              En cours ({bookingStats.review})
            </button>
            <button type="button" onClick={onExport} className="secondary-btn">
              <DownloadIcon size={16} />
              Exporter les demandes
            </button>
          </div>
        }
      />

      <div className="booking-list">
        {bookings.length === 0 ? (
          <div className="empty-box">Aucune demande client trouvée pour ce filtre.</div>
        ) : (
          bookings.map((item) => (
            <div key={item.id} className="booking-card">
              <div className="booking-card-inner">
                <div className="booking-client">
                  <img src={item.avatar} alt={item.client} loading="lazy" decoding="async" />
                  <div>
                    <h4>{item.client}</h4>
                    <p>{item.tier}</p>
                    <span className="request-code">{item.requestId}</span>
                  </div>
                </div>

                <div className="booking-grid">
                  <div>
                    <span>Destination</span>
                    <p className="booking-main-text">
                      <MapPinIcon size={16} className="icon-orange" />
                      {item.destination}
                    </p>
                    <small>{item.interest}</small>
                  </div>

                  <div>
                    <span>Budget</span>
                    <p className="booking-main-text">
                      <DollarIcon size={16} className="icon-green" />
                      {item.budget}
                    </p>
                  </div>

                  <div>
                    <span>Dates</span>
                    <p className="booking-main-text no-icon">{item.dates}</p>
                    <small>Envoyée : {item.submitted}</small>
                  </div>

                  <div>
                    <span>Voyageurs</span>
                    <p className="booking-main-text">
                      <ClockIcon size={16} className="icon-blue" />
                      {item.travelers}
                    </p>
                    <small>{item.duration}</small>
                  </div>
                </div>

                <div className="booking-right">
                  <StatusBadge tone={item.status === "pending" ? "orange" : "blue"}>
                    {statusLabels[item.status] || item.status}
                  </StatusBadge>

                  <button
                    type="button"
                    onClick={() => onSubmitOffer(item.id)}
                    className="primary-btn"
                  >
                    Envoyer une offre
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
