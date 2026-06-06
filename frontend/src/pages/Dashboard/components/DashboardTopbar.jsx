import React from "react";
import { agencySummary, dashboardPageTitles } from "../../../data/dashboardContent";
import { dashboardIcons } from "../icons";

export default function DashboardTopbar({
  page,
  search,
  bookingFilter,
  unreadCount,
  pendingBookings,
  activePackages,
  showFilterMenu,
  showNotifications,
  onSearchChange,
  onPageChange,
  onBookingFilterChange,
  onToggleFilter,
  onToggleNotifications,
  onCloseNotifications,
  notify,
}) {
  const BellIcon = dashboardIcons.bell;
  const FilterIcon = dashboardIcons.filter;
  const SearchIcon = dashboardIcons.search;

  const selectBookingFilter = (filter, message) => {
    onBookingFilterChange(filter);
    onToggleFilter(false);
    notify(message);
  };

  return (
    <div className="dashboard-topbar">
      <div>
        <span className="topbar-agency-label">{agencySummary.type}</span>
        <h2>{dashboardPageTitles[page]}</h2>
        <p>
          {agencySummary.name} gère les demandes clients, les forfaits prêts
          et les réponses agence depuis un espace clair.
        </p>
        <div className="topbar-agency-meta">
          <span>{agencySummary.location}</span>
          <span>{agencySummary.phone}</span>
          <span>{agencySummary.email}</span>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <SearchIcon size={16} />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Rechercher un client, un forfait ou une destination..."
          />
        </div>

        <div className="relative-box">
          <button
            type="button"
            onClick={() => {
              onPageChange("bookings");
              onToggleFilter();
            }}
            className="secondary-btn topbar-btn"
          >
            <FilterIcon size={16} />
            Filtrer
          </button>

          {showFilterMenu ? (
            <div className="dropdown-menu filter-menu">
              <button
                type="button"
                onClick={() => selectBookingFilter("all", "Toutes les demandes sont affichées.")}
                className={`dropdown-item ${
                  bookingFilter === "all" ? "dropdown-item-active-blue" : ""
                }`}
              >
                Toutes les demandes
              </button>
              <button
                type="button"
                onClick={() => selectBookingFilter("pending", "Demandes en attente affichées.")}
                className={`dropdown-item ${
                  bookingFilter === "pending" ? "dropdown-item-active-orange" : ""
                }`}
              >
                Demandes en attente
              </button>
              <button
                type="button"
                onClick={() => selectBookingFilter("review", "Demandes en cours de traitement affichées.")}
                className={`dropdown-item ${
                  bookingFilter === "review" ? "dropdown-item-active-review" : ""
                }`}
              >
                En cours
              </button>
            </div>
          ) : null}
        </div>

        <div className="relative-box">
          <button type="button" onClick={onToggleNotifications} className="icon-btn">
            <BellIcon size={20} />
            {unreadCount > 0 ? <span className="notification-dot" /> : null}
          </button>

          {showNotifications ? (
            <div className="dropdown-menu notifications-menu">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <p>Activité récente de votre espace</p>
              </div>

              <div className="dropdown-body">
                <button
                  type="button"
                  onClick={() => {
                    onPageChange("messages");
                    onCloseNotifications();
                  }}
                  className="notification-item"
                >
                  <p>{unreadCount} message(s) non lu(s)</p>
                  <small>Ouvrir la boîte de réception</small>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onPageChange("bookings");
                    onBookingFilterChange("pending");
                    onCloseNotifications();
                  }}
                  className="notification-item"
                >
                  <p>{pendingBookings} demande(s) client en attente</p>
                  <small>Consulter et envoyer des offres</small>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onPageChange("packages");
                    onCloseNotifications();
                  }}
                  className="notification-item"
                >
                  <p>{activePackages} forfait(s) actif(s)</p>
                  <small>Consulter la bibliothèque agence</small>
                </button>
              </div>

              <div className="dropdown-footer">
                <button type="button" onClick={onCloseNotifications} className="primary-btn full-btn">
                  Fermer les notifications
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
