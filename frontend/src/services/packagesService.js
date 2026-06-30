import { offerCatalog, packageCatalog } from "../data/packageCatalog";
import { apiRequest } from "./apiClient";

const fallbackImage =
  "https://images.pexels.com/photos/32013475/pexels-photo-32013475.jpeg?auto=compress&cs=tinysrgb&w=1200";

function getMetadataValue(metadata, key, fallback) {
  if (!metadata || typeof metadata !== "object") {
    return fallback;
  }

  return metadata[key] ?? fallback;
}

export function normalizePackage(apiPackage) {
  const metadata = apiPackage.metadata || {};
  const durationDays = Number(apiPackage.duration_days || 1);
  const agencyName = apiPackage.agency?.name || "NextTrip Agency";

  return {
    id: apiPackage.id,
    title: apiPackage.title,
    location: apiPackage.destination,
    category: getMetadataValue(metadata, "category", "Culture"),
    duration: `${durationDays} Day${durationDays > 1 ? "s" : ""}`,
    price: Number(apiPackage.price || 0),
    rating: Number(apiPackage.agency?.rating || getMetadataValue(metadata, "rating", 4.7)),
    dealTag: getMetadataValue(metadata, "dealTag", "NextTrip Package"),
    difficulty: getMetadataValue(metadata, "difficulty", "Easy"),
    groupSize: apiPackage.capacity
      ? `1-${apiPackage.capacity} travelers`
      : getMetadataValue(metadata, "groupSize", "1-8 travelers"),
    nextDeparture: apiPackage.starts_at || getMetadataValue(metadata, "nextDeparture", ""),
    agency: agencyName,
    image: apiPackage.image_url || getMetadataValue(metadata, "image", fallbackImage),
    description: apiPackage.description || "A curated NextTrip package.",
    details: getMetadataValue(metadata, "details", apiPackage.description || "A curated NextTrip package."),
    highlights: getMetadataValue(metadata, "highlights", [
      "Agency-supported itinerary.",
      "Clear price and booking flow.",
      "Flexible traveler details.",
    ]),
    includes: getMetadataValue(metadata, "includes", ["Agency support", "Trip planning", "Booking confirmation"]),
    itinerary: getMetadataValue(metadata, "itinerary", [
      { title: "Day 1", text: "Arrival and first trip moments." },
      { title: "Day 2", text: "Main experience and local discovery." },
    ]),
    notIncluded: getMetadataValue(metadata, "notIncluded", ["Flights", "Personal expenses"]),
    availableAddOns: getMetadataValue(metadata, "availableAddOns", ["Private transfer", "Local guide"]),
    requirements: getMetadataValue(metadata, "requirements", ["Valid travel documents"]),
    raw: apiPackage,
  };
}

export function getPackages() {
  return packageCatalog;
}

export function getOffers() {
  return offerCatalog;
}

export function getPackageDetails(id) {
  const normalizedId = Number(id);
  return (
    packageCatalog.find((item) => item.id === normalizedId) ||
    offerCatalog.find((item) => item.id === normalizedId) ||
    null
  );
}

export async function fetchPackages() {
  const response = await apiRequest("/packages");
  return (response.data || []).map(normalizePackage);
}

export async function fetchPackageDetails(id) {
  const response = await apiRequest(`/packages/${id}`);
  return normalizePackage(response);
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
