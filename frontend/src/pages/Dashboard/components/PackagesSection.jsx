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
        title="Featured packages"
        subtitle="Curated travel products ready to sell"
        action={
          <button type="button" onClick={onCreatePackage} className="primary-btn">
            <PlusIcon size={16} />
            Add package
          </button>
        }
      />

      <div className="packages-grid">
        {packages.map((item) => (
          <div key={item.id} className="package-card">
            <img src={item.image} alt={item.title} className="package-image" />

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

              <div className="package-bottom">
                <strong>{item.price}</strong>
                <button
                  type="button"
                  onClick={() => onViewDetails(item)}
                  className="secondary-btn"
                >
                  View details
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
