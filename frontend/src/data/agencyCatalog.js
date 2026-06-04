import { offerCatalog, packageCatalog } from "./packageCatalog";

export function getAgencySlug(name) {
  return String(name || "agency")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const curatedAgencyProfiles = [
  {
    id: "atlas-voyages",
    name: "Atlas Voyages",
    location: "Marrakech, Morocco",
    rating: 4.9,
    responseTime: "Usually replies in 2 hours",
    verified: true,
    cover:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1400&q=80",
    tagline: "Morocco culture, desert routes, and premium private trips.",
    specialties: ["Morocco tours", "Desert trips", "Private guides", "Family travel"],
    stats: [
      { label: "Active offers", value: "42" },
      { label: "Travelers served", value: "1.8k" },
      { label: "Response rate", value: "97%" },
    ],
    services: [
      "Custom Morocco itineraries",
      "Hotel and riad sourcing",
      "Airport transfers",
      "Local guide coordination",
    ],
    packages: ["Morocco Magic", "Sahara Private Route", "Chefchaouen Weekend"],
  },
  {
    id: "sakura-routes",
    name: "Sakura Routes",
    location: "Kyoto, Japan",
    rating: 4.8,
    responseTime: "Usually replies same day",
    verified: true,
    cover:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
    tagline: "Calm cultural journeys across Kyoto, Osaka, Tokyo, and Nara.",
    specialties: ["Cultural routes", "Temple visits", "Food planning", "Rail guidance"],
    stats: [
      { label: "Active offers", value: "28" },
      { label: "Travelers served", value: "940" },
      { label: "Response rate", value: "95%" },
    ],
    services: [
      "Cultural route planning",
      "Rail and transfer guidance",
      "Food experience reservations",
      "Day trip coordination",
    ],
    packages: ["Kyoto Heritage Journey", "Tokyo Food Route", "Nara Day Escape"],
  },
];

const marketplaceItems = [...packageCatalog, ...offerCatalog];
const marketplaceAgencyNames = Array.from(
  new Set(marketplaceItems.map((item) => item.agency).filter(Boolean))
);

function buildMarketplaceAgencyProfile(name) {
  const agencyItems = marketplaceItems.filter((item) => item.agency === name);
  const firstItem = agencyItems[0];
  const averageRating =
    agencyItems.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
    Math.max(agencyItems.length, 1);
  const locations = Array.from(new Set(agencyItems.map((item) => item.location).filter(Boolean)));
  const specialties = Array.from(new Set(agencyItems.map((item) => item.category).filter(Boolean)));
  const packages = agencyItems.map((item) => item.title);

  return {
    id: getAgencySlug(name),
    name,
    location: locations[0] || "NextTrip marketplace",
    rating: Number(averageRating.toFixed(1)),
    responseTime: "Usually replies through NextTrip",
    verified: agencyItems.length > 1,
    cover: firstItem?.image || "",
    tagline: `${specialties.slice(0, 3).join(", ")} trips with clear package planning and agency support.`,
    specialties,
    stats: [
      { label: "Active packages", value: String(packages.length) },
      { label: "Main location", value: locations[0] || "Marketplace" },
      { label: "Average rating", value: Number(averageRating.toFixed(1)).toString() },
    ],
    services: [
      "Package planning and availability support",
      "Traveler request follow-up",
      "Booking details coordination",
      "Destination and add-on guidance",
    ],
    packages,
  };
}

const marketplaceAgencyProfiles = marketplaceAgencyNames.map(buildMarketplaceAgencyProfile);

export const agencyCatalog = [
  ...curatedAgencyProfiles,
  ...marketplaceAgencyProfiles.filter(
    (agency) => !curatedAgencyProfiles.some((profile) => profile.name === agency.name)
  ),
];

export function getAgencyById(id) {
  return agencyCatalog.find((agency) => agency.id === id || getAgencySlug(agency.name) === id) || null;
}

export function getAgencyByName(name) {
  return (
    agencyCatalog.find(
      (agency) => agency.name === name || getAgencySlug(agency.name) === getAgencySlug(name)
    ) || null
  );
}
