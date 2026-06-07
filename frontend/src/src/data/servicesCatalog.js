export const serviceCatalog = [
  {
    slug: "custom-trip-planning",
    icon: "sliders",
    title: "Custom Trip Planning",
    eyebrow: "Personal service",
    summary:
      "Build a trip brief with dates, budget, mood, travelers, and extras so agencies can send tailored offers.",
    bestFor: "Travelers who do not want a ready-made package.",
    includes: [
      "Destination and date planning",
      "Budget and travel style filters",
      "Hotel, transport, and activity preferences",
      "Agency-ready request summary",
    ],
  },
  {
    slug: "agency-matching",
    icon: "handshake",
    title: "Agency Matching",
    eyebrow: "Trusted agencies",
    summary:
      "Connect travelers with agencies that match their destination, budget, and response needs.",
    bestFor: "Users who want offers from the right agency faster.",
    includes: [
      "Verified agency profiles",
      "Specialty-based recommendations",
      "Response and rating visibility",
      "Direct contact flow",
    ],
  },
  {
    slug: "booking-support",
    icon: "support",
    title: "Booking Support",
    eyebrow: "Trip confidence",
    summary:
      "Keep booking details, receipts, support steps, and follow-ups in one place.",
    bestFor: "Travelers who want clear booking tracking.",
    includes: [
      "Booking status overview",
      "Payment and receipt summary",
      "Support handoff",
      "Policy and cancellation guidance",
    ],
  },
  {
    slug: "package-management",
    icon: "dashboard",
    title: "Package Management",
    eyebrow: "Agency workspace",
    summary:
      "Help agencies organize offers, requests, messages, and package performance from the dashboard.",
    bestFor: "Agencies that need a clearer travel workspace.",
    includes: [
      "Package publishing flow",
      "Request management",
      "Traveler messaging",
      "Simple performance metrics",
    ],
  },
];

export function getServiceBySlug(slug) {
  return serviceCatalog.find((service) => service.slug === slug) || null;
}
