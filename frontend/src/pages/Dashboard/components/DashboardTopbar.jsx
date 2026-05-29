import React from "react";
import { dashboardPageTitles } from "../../../data/dashboardContent";
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
        <h2>{dashboardPageTitles[page]}</h2>
        <p>Monitor requests, manage offers, and keep your agency workflow organized.</p>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <SearchIcon size={16} />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search anything..."
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
                onClick={() => selectBookingFilter("all", "All bookings selected.")}
                className={`dropdown-item ${
                  bookingFilter === "all" ? "dropdown-item-active-blue" : ""
                }`}
              >
                All bookings
              </button>
              <button
                type="button"
                onClick={() => selectBookingFilter("pending", "Pending bookings selected.")}
                className={`dropdown-item ${
                  bookingFilter === "pending" ? "dropdown-item-active-orange" : ""
                }`}
              >
                Pending bookings
              </button>
              <button
                type="button"
                onClick={() => selectBookingFilter("review", "Review bookings selected.")}
                className={`dropdown-item ${
                  bookingFilter === "review" ? "dropdown-item-active-review" : ""
                }`}
              >
                Review bookings
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
                  <p>{pendingBookings} pending booking request(s)</p>
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
                  <p>{activePackages} active package(s)</p>
                  <small>Check your package library</small>
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
