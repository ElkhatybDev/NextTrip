export const agencyCatalog = [
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

export function getAgencyById(id) {
  return agencyCatalog.find((agency) => agency.id === id) || null;
}
