import React from "react";
import { dashboardIcons } from "../icons";

export default function StatsGrid({ pendingBookings, activePackages, unreadCount, onPageChange }) {
  const BookingIcon = dashboardIcons.bookings;
  const PackageIcon = dashboardIcons.packages;
  const MessageIcon = dashboardIcons.messages;

  return (
    <section className="stats-grid">
      <button type="button" onClick={() => onPageChange("bookings")} className="stat-card">
        <p>Demandes clients en attente</p>
        <div className="stat-card-row">
          <h3>{pendingBookings}</h3>
          <BookingIcon size={32} />
        </div>
        <small>Prêtes pour une offre agence</small>
      </button>

      <button
        type="button"
        onClick={() => onPageChange("packages")}
        className="stat-card stat-card-orange"
      >
        <p>Forfaits agence actifs</p>
        <div className="stat-card-row">
          <h3>{activePackages}</h3>
          <PackageIcon size={32} />
        </div>
        <small>Publiés pour les voyageurs</small>
      </button>

      <button type="button" onClick={() => onPageChange("messages")} className="stat-card">
        <p>Messages non lus</p>
        <div className="stat-card-row">
          <h3>{unreadCount}</h3>
          <MessageIcon size={32} />
        </div>
        <small>Les réponses rapides améliorent les conversions</small>
      </button>
    </section>
  );
}
