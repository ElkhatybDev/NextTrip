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
          {agencySummary.name} manages traveler requests, ready packages, and
          agency replies from one clean workspace.
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
            placeholder="Search traveler, package, or destination..."
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
            Filter
          </button>

          {showFilterMenu ? (
            <div className="dropdown-menu filter-menu">
              <button
                type="button"
                onClick={() => selectBookingFilter("all", "All traveler requests selected.")}
                className={`dropdown-item ${
                  bookingFilter === "all" ? "dropdown-item-active-blue" : ""
                }`}
              >
                All requests
              </button>
              <button
                type="button"
                onClick={() => selectBookingFilter("pending", "Pending traveler requests selected.")}
                className={`dropdown-item ${
                  bookingFilter === "pending" ? "dropdown-item-active-orange" : ""
                }`}
              >
                Pending requests
              </button>
              <button
                type="button"
                onClick={() => selectBookingFilter("review", "Requests in review selected.")}
                className={`dropdown-item ${
                  bookingFilter === "review" ? "dropdown-item-active-review" : ""
                }`}
              >
                In review
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
                <p>Recent activity in your workspace</p>
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
                  <p>You have {unreadCount} unread message(s)</p>
                  <small>Open inbox and reply faster</small>
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
                  <p>{pendingBookings} pending traveler request(s)</p>
                  <small>Review and send offers</small>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onPageChange("packages");
                    onCloseNotifications();
                  }}
                  className="notification-item"
                >
                  <p>{activePackages} active packages</p>
                  <small>Check your agency package library</small>
                </button>
              </div>

              <div className="dropdown-footer">
                <button type="button" onClick={onCloseNotifications} className="primary-btn full-btn">
                  Close notifications
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
