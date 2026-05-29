export const profileOverview = {
  name: "Amine Traveler",
  email: "amine.traveler@example.com",
  phone: "+212 6 12 34 56 78",
  homeCity: "Casablanca, Morocco",
  memberSince: "May 2026",
  status: "Verified traveler",
  preferences: [
    { label: "Travel style", value: "Comfort + culture" },
    { label: "Preferred budget", value: "10,000 - 18,000 MAD" },
    { label: "Favorite regions", value: "Europe, Asia, Africa" },
    { label: "Support language", value: "Arabic, French, English" },
  ],
  stats: [
    { label: "Bookings", value: "3" },
    { label: "Trip requests", value: "2" },
    { label: "Saved offers", value: "8" },
  ],
};

export const bookingRecords = [
  {
    id: "BK-2026-1042",
    packageId: 1,
    title: "Santorini Sunset Dream",
    location: "Santorini, Greece",
    travelDate: "2026-06-18",
    travelers: 2,
    total: 20850,
    status: "Confirmed",
    paymentStatus: "Paid",
    nextAction: "Download receipt and review travel documents.",
  },
  {
    id: "BK-2026-1035",
    packageId: 2,
    title: "Kyoto Heritage Journey",
    location: "Kyoto, Japan",
    travelDate: "2026-07-04",
    travelers: 1,
    total: 11925,
    status: "Agency follow-up",
    paymentStatus: "Deposit pending",
    nextAction: "Confirm pickup details with the agency.",
  },
  {
    id: "BK-2026-1028",
    packageId: 5,
    title: "Bali Wellness Retreat",
    location: "Ubud, Bali",
    travelDate: "2026-08-15",
    travelers: 2,
    total: 18250,
    status: "Draft",
    paymentStatus: "Not paid",
    nextAction: "Finish checkout when ready.",
  },
];

export const tripRequests = [
  {
    id: "REQ-2026-2201",
    title: "Japan culture route for two",
    destination: "Kyoto, Osaka, Tokyo",
    dates: "2026-07-04 to 2026-07-13",
    travelers: "2 adults",
    budget: "22,000 MAD",
    status: "Agency reviewing",
    mood: "Culture",
    pace: "Balanced",
    accommodation: "Hotel",
    services: ["Local Guide", "Airport Transfer", "Restaurant Booking"],
    notes:
      "A calm cultural trip with temples, food experiences, and enough free time between cities.",
    timeline: [
      { label: "Request created", value: "May 12, 2026" },
      { label: "Sent to agencies", value: "May 12, 2026" },
      { label: "Current step", value: "Waiting for tailored offers" },
    ],
  },
  {
    id: "REQ-2026-2194",
    title: "Family seaside break",
    destination: "Agadir or Antalya",
    dates: "Flexible summer dates",
    travelers: "2 adults, 2 children",
    budget: "18,000 MAD",
    status: "Offer ready",
    mood: "Beach",
    pace: "Relaxed",
    accommodation: "Resort",
    services: ["Travel Insurance", "Airport Transfer", "Excursions"],
    notes:
      "Family-friendly stay with easy transfers, safe beach access, and simple activities for children.",
    timeline: [
      { label: "Request created", value: "May 10, 2026" },
      { label: "Agency response", value: "May 11, 2026" },
      { label: "Current step", value: "Review offer and confirm budget" },
    ],
  },
];

export function getTripRequestById(id) {
  return tripRequests.find((request) => request.id === id) || null;
}
