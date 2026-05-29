import React from "react";
import PackageFilter from "../../../components/PackageFilter/PackageFilter";
import PackageCard from "../../../components/PackageCard/PackageCard";

export default function PackagesListView({
  search,
  categories,
  selectedCategory,
  packages,
  activeSearchSummary = [],
  onSearchChange,
  onCategoryChange,
  onClearFilters,
  onViewDetails,
  onBookNow,
}) {
  return (
    <main className="packages-main">
      <PackageFilter
        search={search}
        onSearchChange={onSearchChange}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      {activeSearchSummary.length ? (
        <div className="package-search-summary">
          <span>Search from Home</span>
          <div>
            {activeSearchSummary.map((item) => (
              <strong key={item}>{item}</strong>
            ))}
          </div>
        </div>
      ) : null}
      <section className="packages-head">
        <div>
          <h3>Available Packages</h3>
          <p>{packages.length} package(s) found</p>
        </div>
      </section>
      {packages.length ? (
        <section className="packages-grid">
          {packages.map((item) => (
            <PackageCard
              key={item.id}
              item={item}
              onViewDetails={() => onViewDetails(item)}
              onBookNow={() => onBookNow(item)}
            />
          ))}
        </section>
      ) : (
        <section className="packages-empty">
          <h3>No exact package found yet.</h3>
          <p>
            Try another destination, choose a broader category, or clear filters
            to see every available package.
          </p>
          <button type="button" onClick={onClearFilters}>
            Show all packages
          </button>
        </section>
      )}
    </main>
  );
}
