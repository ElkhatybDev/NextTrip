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
  title = "Available packages",
  countLabel = "packages found",
  variant = "packages",
}) {
  const isOffersView = variant === "offers";

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
          <h3>{title}</h3>
          <p>
            {packages.length} {countLabel}
          </p>
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
              showOfferBadge={isOffersView}
            />
          ))}
        </section>
      ) : (
        <section className="packages-empty">
          <h3>No exact match found yet.</h3>
          <p>
            Try another destination, choose a broader category, or clear filters
            to see every available package.
          </p>
          <button type="button" onClick={onClearFilters}>
            Show all results
          </button>
        </section>
      )}
    </main>
  );
}
