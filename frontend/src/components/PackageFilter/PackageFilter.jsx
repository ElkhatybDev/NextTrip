import React from "react";
import { Search } from "lucide-react";
import "./PackageFilter.css";

export default function PackageFilter({
  title = "Explore our premium packages",
  subtitle = "FIND YOUR NEXT TRIP",
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <section className="package-filter-card">
      <div className="package-filter-top">
        <div>
          <p className="package-filter-badge">{subtitle}</p>
          <h2>{title}</h2>
        </div>

        <div className="package-filter-search-wrap">
          <div className="package-filter-search-bar">
            <Search className="package-filter-search-icon" size={20} />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by title, destination, or category"
            />
          </div>
        </div>
      </div>

      <div className="package-filter-categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`package-filter-chip ${
              selectedCategory === category ? "package-filter-chip-active" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
