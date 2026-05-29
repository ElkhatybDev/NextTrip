import React from "react";
import "./TripFilters.css";

export default function TripFilters({ filterGroups, form, onFilterChange }) {
  return (
    <section className="trip-filters-panel">
      <div className="trip-filters-head">
        <p className="trip-section-label">QUICK FILTER</p>
        <h3>Choose what your trip needs</h3>
        <span>
          These choices help agencies understand the offer before they contact you.
        </span>
      </div>

      <div className="trip-filters-grid">
        {filterGroups.map((group) => (
          <div className="trip-filter-group" key={group.key}>
            <p>{group.label}</p>
            <div>
              {group.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onFilterChange(group.key, option)}
                  className={
                    form[group.key] === option
                      ? "trip-filter-chip active"
                      : "trip-filter-chip"
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
