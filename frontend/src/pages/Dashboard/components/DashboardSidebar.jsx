import React from "react";
import { agencySummary, dashboardNavItems } from "../../../data/dashboardContent";
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
        <div className="sidebar-brand-mark">NT</div>
        <div>
          <h1>
            Next<span>Trip</span>
          </h1>
          <p>Agency Workspace</p>
        </div>
      </div>

      <div className="agency-box">
        <div className="agency-top">
          <img src={agencySummary.image} alt="Agency" />
          <div>
            <h3>{agencySummary.name}</h3>
            <p>{agencySummary.status}</p>
          </div>
        </div>

        <div className="agency-rating">
          <StarIcon size={16} fill="white" />
          {agencySummary.rating}
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
