import React from "react";
import { dashboardIcons } from "../icons";
import SectionTitle from "./SectionTitle";
import StatusBadge from "./StatusBadge";

export default function PackagesSection({ packages, onCreatePackage, onViewDetails }) {
  const ChevronIcon = dashboardIcons.chevronRight;
  const PlusIcon = dashboardIcons.plus;

  return (
    <section className="dashboard-section">
      <SectionTitle
        title="Agency packages"
        subtitle="Ready travel packages published by your agency"
        action={
          <button type="button" onClick={onCreatePackage} className="primary-btn">
            <PlusIcon size={16} />
            Add agency package
          </button>
        }
      />

      <div className="packages-grid">
        {packages.map((item) => (
          <div key={item.id} className="package-card">
            <img
              src={item.image}
              alt={item.title}
              className="package-image"
              loading="lazy"
              decoding="async"
            />

            <div className="package-content">
              <div className="package-top">
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.place}</p>
                </div>
                <StatusBadge tone={item.status === "Active" ? "green" : "blue"}>
                  {item.status}
                </StatusBadge>
              </div>

              <div className="package-meta-row">
                <span>{item.category}</span>
                <span>{item.duration}</span>
                <span>{item.requests} matching requests</span>
              </div>

              <div className="package-bottom">
                <strong>{item.price}</strong>
                <button
                  type="button"
                  onClick={() => onViewDetails(item)}
                  className="secondary-btn"
                >
                  Manage package
                  <ChevronIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
