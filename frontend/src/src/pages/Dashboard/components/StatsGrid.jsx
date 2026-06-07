import React from "react";
import { dashboardIcons } from "../icons";

export default function StatsGrid({ pendingBookings, activePackages, unreadCount, onPageChange }) {
  const BookingIcon = dashboardIcons.bookings;
  const PackageIcon = dashboardIcons.packages;
  const MessageIcon = dashboardIcons.messages;

  return (
    <section className="stats-grid">
      <button type="button" onClick={() => onPageChange("bookings")} className="stat-card">
        <p>Pending traveler requests</p>
        <div className="stat-card-row">
          <h3>{pendingBookings}</h3>
          <BookingIcon size={32} />
        </div>
        <small>Ready for agency offers</small>
      </button>

      <button
        type="button"
        onClick={() => onPageChange("packages")}
        className="stat-card stat-card-orange"
      >
        <p>Active agency packages</p>
        <div className="stat-card-row">
          <h3>{activePackages}</h3>
          <PackageIcon size={32} />
        </div>
        <small>Published for travelers</small>
      </button>

      <button type="button" onClick={() => onPageChange("messages")} className="stat-card">
        <p>Unread messages</p>
        <div className="stat-card-row">
          <h3>{unreadCount}</h3>
          <MessageIcon size={32} />
        </div>
        <small>Fast agency replies improve conversions</small>
      </button>
    </section>
  );
}
