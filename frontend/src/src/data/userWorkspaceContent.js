import { agencyCatalog } from "./agencyCatalog";
import { cleanDestinationText } from "../utils/destinationLabels";

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

export const seededTripOffers = [
  {
    id: "OFF-REQ-2026-2194-ATLAS",
    requestId: "REQ-2026-2194",
    requestVersion: 1,
    agencyId: "atlas-voyages",
    agencyName: "Atlas Voyages",
    title: "Family seaside comfort plan",
    totalPrice: "17,600 MAD",
    deposit: "30%",
    hotelPlan: "Family resort with breakfast and beach access",
    transportPlan: "Private airport transfer",
    includedServices: "Travel Insurance, Airport Transfer, Excursions",
    itinerary:
      "Day 1: Arrival and resort check-in\nDay 2: Beach day with family activity\nDay 3: Guided excursion\nDay 4: Free time and transfer",
    message:
      "We can keep the rhythm relaxed and family-friendly with simple transfers and flexible activity timing.",
    validUntil: "2026-06-20",
    status: "Active",
    submittedAt: "2026-05-11T10:30:00.000Z",
  },
  {
    id: "OFF-REQ-2026-2194-SAKURA",
    requestId: "REQ-2026-2194",
    requestVersion: 1,
    agencyId: "sakura-routes",
    agencyName: "Sakura Routes",
    title: "Antalya family route with easy extras",
    totalPrice: "18,400 MAD",
    deposit: "25%",
    hotelPlan: "Family hotel near the beach",
    transportPlan: "Shared transfer with private return option",
    includedServices: "Airport Transfer, Excursions",
    itinerary:
      "Day 1: Arrival and hotel check-in\nDay 2: Beach and old town walk\nDay 3: Family boat activity\nDay 4: Flexible morning and transfer",
    message:
      "This option keeps the budget clear while adding one stronger family activity.",
    validUntil: "2026-06-18",
    status: "Active",
    submittedAt: "2026-05-11T14:10:00.000Z",
  },
];

const TRIP_REQUESTS_STORAGE_KEY = "nexttrip_trip_requests";
const TRIP_OFFERS_STORAGE_KEY = "nexttrip_trip_offers";

function cleanTripRequest(request) {
  if (!request) {
    return request;
  }

  const cleanedDestination = cleanDestinationText(request.destination);
  const cleanedTitle = cleanDestinationText(request.title);
  const cleanedFormDestination = cleanDestinationText(request.formFields?.destination);

  return {
    ...request,
    title: cleanedTitle || request.title,
    destination: cleanedDestination || request.destination,
    formFields: request.formFields
      ? {
          ...request.formFields,
          destination: cleanedFormDestination || request.formFields.destination,
        }
      : request.formFields,
  };
}

function cleanTripOffer(offer) {
  if (!offer) {
    return offer;
  }

  const cleanedTitle = cleanDestinationText(offer.title);

  return {
    ...offer,
    title: cleanedTitle || offer.title,
  };
}

export function getStoredTripRequests() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedRequests = window.localStorage.getItem(TRIP_REQUESTS_STORAGE_KEY);
    const parsedRequests = storedRequests ? JSON.parse(storedRequests) : [];

    return Array.isArray(parsedRequests) ? parsedRequests.map(cleanTripRequest) : [];
  } catch {
    return [];
  }
}

export function saveTripRequest(request) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const cleanedRequest = cleanTripRequest(request);
    const savedRequests = getStoredTripRequests();
    const nextRequests = [
      cleanedRequest,
      ...savedRequests.filter((item) => item.id !== cleanedRequest.id),
    ].slice(0, 20);

    window.localStorage.setItem(
      TRIP_REQUESTS_STORAGE_KEY,
      JSON.stringify(nextRequests)
    );
  } catch {
    // Storage can fail in private mode; the UI confirmation still keeps the request visible.
  }
}

export function updateTripRequest(requestId, updater) {
  const currentRequest = getTripRequestById(requestId);

  if (!currentRequest) {
    return null;
  }

  const nextRequest =
    typeof updater === "function"
      ? updater(currentRequest)
      : { ...currentRequest, ...updater };

  saveTripRequest(nextRequest);

  return nextRequest;
}

export function getAllTripRequests() {
  return [...getStoredTripRequests(), ...tripRequests.map(cleanTripRequest)];
}

export function getTripRequestById(id) {
  return getAllTripRequests().find((request) => request.id === id) || null;
}

function scoreAgencyForRequest(agency, request) {
  const requestText = [
    request.destination,
    request.mood,
    request.pace,
    request.accommodation,
    request.notes,
    ...(request.services || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const agencyText = [
    agency.location,
    agency.tagline,
    ...(agency.specialties || []),
    ...(agency.services || []),
    ...(agency.packages || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return requestText
    .split(/[\s,|/.-]+/)
    .filter((word) => word.length > 3)
    .reduce((score, word) => score + (agencyText.includes(word) ? 1 : 0), 0);
}

export function getAgencyMatchesForRequest(request) {
  if (!request) {
    return [];
  }

  if (Array.isArray(request.assignedAgencyIds) && request.assignedAgencyIds.length) {
    const assignedAgencies = request.assignedAgencyIds
      .map((agencyId) => agencyCatalog.find((agency) => agency.id === agencyId))
      .filter(Boolean);

    if (assignedAgencies.length) {
      return assignedAgencies;
    }
  }

  const scoredAgencies = agencyCatalog
    .map((agency) => ({
      agency,
      score: scoreAgencyForRequest(agency, request),
    }))
    .sort((a, b) => b.score - a.score);

  const matches = scoredAgencies
    .filter((item) => item.score > 0)
    .map((item) => item.agency);

  return (matches.length ? matches : agencyCatalog).slice(0, 3);
}

export function getStoredTripOffers() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedOffers = window.localStorage.getItem(TRIP_OFFERS_STORAGE_KEY);
    const parsedOffers = storedOffers ? JSON.parse(storedOffers) : [];

    return Array.isArray(parsedOffers) ? parsedOffers.map(cleanTripOffer) : [];
  } catch {
    return [];
  }
}

function saveTripOffers(offers) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      TRIP_OFFERS_STORAGE_KEY,
      JSON.stringify(offers.map(cleanTripOffer))
    );
  } catch {
    // Keep the UI usable if local storage is blocked.
  }
}

function normalizePriceLabel(price) {
  if (!price) {
    return "Price pending";
  }

  const priceText = String(price).trim();
  return priceText.toLowerCase().includes("mad") ? priceText : `${priceText} MAD`;
}

function getOfferStatusForRequest(offer, request) {
  if (!request) {
    return offer.status || "Active";
  }

  const requestVersion = request.requestVersion || 1;
  const offerVersion = offer.requestVersion || 1;

  if (offerVersion < requestVersion) {
    return "Needs update";
  }

  if (request.selectedOfferId === offer.id) {
    return "Selected";
  }

  return offer.status || "Active";
}

export function getRequestOffers(requestId) {
  const request = getTripRequestById(requestId);
  const offers = [...seededTripOffers.map(cleanTripOffer), ...getStoredTripOffers()]
    .filter((offer) => offer.requestId === requestId)
    .map((offer) => ({
      ...offer,
      status: getOfferStatusForRequest(offer, request),
    }));

  return offers.sort(
    (a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0)
  );
}

export function getSelectedTripOffer(requestId) {
  const request = getTripRequestById(requestId);

  if (!request?.selectedOfferId) {
    return null;
  }

  return (
    getRequestOffers(requestId).find((offer) => offer.id === request.selectedOfferId) ||
    null
  );
}

export function saveAgencyOffer(requestId, agencyId, offerInput) {
  const request = getTripRequestById(requestId);
  const agency =
    agencyCatalog.find((item) => item.id === agencyId) ||
    getAgencyMatchesForRequest(request)[0];
  const submittedAt = new Date();
  const offer = {
    id: `OFF-${requestId}-${agency?.id || "agency"}-${String(submittedAt.getTime()).slice(-6)}`,
    requestId,
    requestVersion: request?.requestVersion || 1,
    agencyId: agency?.id || agencyId,
    agencyName: agency?.name || "NextTrip agency",
    title: cleanDestinationText(offerInput.title) || offerInput.title,
    totalPrice: normalizePriceLabel(offerInput.totalPrice),
    deposit: offerInput.deposit,
    hotelPlan: offerInput.hotelPlan,
    transportPlan: offerInput.transportPlan,
    includedServices: offerInput.includedServices,
    itinerary: offerInput.itinerary,
    message: offerInput.message,
    validUntil: offerInput.validUntil,
    status: "Active",
    submittedAt: submittedAt.toISOString(),
  };

  saveTripOffers([
    offer,
    ...getStoredTripOffers().filter((item) => item.id !== offer.id),
  ]);

  updateTripRequest(requestId, (currentRequest) => ({
    ...currentRequest,
    status: "Offers received",
    selectedOfferId: currentRequest.selectedOfferId || null,
    timeline: [
      ...(currentRequest.timeline || []),
      {
        label: "Agency offer received",
        value: `${offer.agencyName} sent ${offer.totalPrice}`,
      },
    ].slice(-5),
  }));

  return offer;
}

export function selectTripOffer(requestId, offerId) {
  const selectedOffer = getRequestOffers(requestId).find((offer) => offer.id === offerId);

  if (!selectedOffer || selectedOffer.status === "Needs update") {
    return null;
  }

  return updateTripRequest(requestId, (request) => ({
    ...request,
    status: "Offer selected",
    selectedOfferId: offerId,
    bookingStatus: "Booking pending",
    timeline: [
      ...(request.timeline || []),
      {
        label: "Offer selected",
        value: `${selectedOffer.agencyName} selected for ${selectedOffer.totalPrice}`,
      },
      { label: "Current step", value: "Confirm booking and payment" },
    ].slice(-5),
  }));
}

export function confirmTripBooking(requestId) {
  return updateTripRequest(requestId, (request) => ({
    ...request,
    status: "Booking pending",
    bookingStatus: "Ready for payment",
    timeline: [
      ...(request.timeline || []),
      { label: "Booking prepared", value: "Offer converted to booking" },
    ].slice(-5),
  }));
}

export function getAgencyRequestCards() {
  return getStoredTripRequests().map((request) => ({
    id: request.id,
    requestId: request.id,
    client: request.traveler?.name || profileOverview.name,
    tier: request.traveler?.status || "NextTrip traveler",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=240&q=80",
    destination: request.destination,
    interest: request.services?.join(" | ") || request.title,
    budget: request.budget,
    dates: request.dates,
    duration: request.priceQuote?.days
      ? `${request.priceQuote.days} day(s)`
      : "Flexible",
    status: String(request.status || "").toLowerCase().includes("offer")
      ? "review"
      : "pending",
  }));
}
