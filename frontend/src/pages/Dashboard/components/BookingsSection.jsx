import React from "react";
import { Link } from "react-router-dom";
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

  return (
    <section className="dashboard-section">
      <SectionTitle
        title="Recent booking requests"
        subtitle="Your latest client inquiries ready for action"
        action={
          <div className="booking-actions">
            <button
              type="button"
              onClick={() => onBookingFilterChange("all")}
              className={`filter-pill ${
                bookingFilter === "all" ? "filter-pill-active-blue" : ""
              }`}
            >
              All ({bookingStats.all})
            </button>
            <button
              type="button"
              onClick={() => onBookingFilterChange("pending")}
              className={`filter-pill ${
                bookingFilter === "pending" ? "filter-pill-active-orange" : ""
              }`}
            >
              Pending ({bookingStats.pending})
            </button>
            <button
              type="button"
              onClick={() => onBookingFilterChange("review")}
              className={`filter-pill ${
                bookingFilter === "review" ? "filter-pill-active-review" : ""
              }`}
            >
              Review ({bookingStats.review})
            </button>
            <button type="button" onClick={onExport} className="secondary-btn">
              <DownloadIcon size={16} />
              Export
            </button>
          </div>
        }
      />

      <div className="booking-list">
        {bookings.length === 0 ? (
          <div className="empty-box">No bookings found for this filter.</div>
        ) : (
          bookings.map((item) => (
            <div key={item.id} className="booking-card">
              <div className="booking-card-inner">
                <div className="booking-client">
                  <img src={item.avatar} alt={item.client} />
                  <div>
                    <h4>{item.client}</h4>
                    <p>{item.tier}</p>
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
                  </div>

                  <div>
                    <span>Duration</span>
                    <p className="booking-main-text">
                      <ClockIcon size={16} className="icon-blue" />
                      {item.duration}
                    </p>
                  </div>
                </div>

                <div className="booking-right">
                  <StatusBadge tone={item.status === "pending" ? "orange" : "blue"}>
                    {item.status}
                  </StatusBadge>

                  {item.requestId ? (
                    <Link
                      to={`/agency/requests/${item.requestId}`}
                      className="primary-btn"
                    >
                      Open brief
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSubmitOffer(item.id)}
                      className="primary-btn"
                    >
                      Submit offer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
