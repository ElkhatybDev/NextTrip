import React from "react";
import { agencySummary, dashboardNavItems } from "../../../data/dashboardContent";
import nextTripLogo from "../../../Assets/images/NextTrip logo.png";
import { dashboardIcons } from "../icons";

export default function DashboardSidebar({
  activePage,
  unreadCount,
  onPageChange,
  onCreatePackage,
}) {
  const StarIcon = dashboardIcons.star;
  const PlusIcon = dashboardIcons.plus;

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <img src={nextTripLogo} alt="NextTrip" className="sidebar-brand-logo" />
        <div>
          <h1>
            Next<span>Trip</span>
          </h1>
          <p>Agency workspace</p>
        </div>
      </div>

      <div className="agency-box">
        <div className="agency-top">
          <img src={agencySummary.image} alt={agencySummary.name} decoding="async" />
          <div>
            <h3>{agencySummary.name}</h3>
            <p>{agencySummary.status}</p>
          </div>
        </div>

        <div className="agency-rating">
          <StarIcon size={16} fill="white" />
          {agencySummary.rating}
        </div>

        <div className="agency-info-list">
          <span>{agencySummary.location}</span>
          <span>Manager: {agencySummary.manager}</span>
          <span>License: {agencySummary.license}</span>
          <span>{agencySummary.responseTime}</span>
        </div>

        <div className="agency-specialties">
          {agencySummary.specialties.map((specialty) => (
            <span key={specialty}>{specialty}</span>
          ))}
        </div>
      </div>

      <nav className="sidebar-nav">
        {dashboardNavItems.map((item) => {
          const Icon = dashboardIcons[item.icon];
          const active = activePage === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onPageChange(item.key)}
              className={`sidebar-link ${active ? "sidebar-link-active" : ""}`}
            >
              <span className="sidebar-link-left">
                <Icon size={20} />
                {item.label}
              </span>

              {item.key === "messages" && unreadCount > 0 ? (
                <span className="sidebar-badge">{unreadCount}</span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button type="button" onClick={onCreatePackage} className="primary-btn full-btn">
          <PlusIcon size={16} />
          Create package
        </button>
      </div>
    </aside>
  );
}
