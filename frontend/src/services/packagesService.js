import { packageCatalog } from "../data/packageCatalog";

export function getPackages() {
  return packageCatalog;
}

export function getPackageDetails(id) {
  const normalizedId = Number(id);
  return packageCatalog.find((item) => item.id === normalizedId) || null;
}

export function filterPackages(packages, { search = "", category = "All" }) {
  const query = search.trim().toLowerCase();
  const queryTokens = query
    .split(/[\s,|/-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);

  return packages.filter((item) => {
    const searchableText = [
      item.title,
      item.location,
      item.category,
      item.dealTag,
      item.agency,
      item.description,
    ]
      .join(" ")
      .toLowerCase();

    const matchesCategory = category === "All" || item.category === category;
    const matchesSearch =
      query === "" ||
      queryTokens.length === 0 ||
      queryTokens.some((token) => searchableText.includes(token));

    return matchesCategory && matchesSearch;
  });
}

export function calculatePackagePricing(packageItem, travelersCount) {
  const safeTravelersCount = Math.max(1, Number(travelersCount) || 1);
  const tripPrice = packageItem.price * safeTravelersCount;
  const taxes = 350 * safeTravelersCount;
  const insurance = 175 * safeTravelersCount;

  return {
    tripPrice,
    taxes,
    insurance,
    total: tripPrice + taxes + insurance,
  };
}
