import { agencyCatalog, getAgencyById } from "./agencyCatalog";
import { offerCatalog, packageCatalog } from "./packageCatalog";
import {
  bookingRecords,
  getAgencyMatchesForRequest,
  getAllTripRequests,
  getRequestOffers,
  profileOverview,
  seededTripOffers,
} from "./userWorkspaceContent";

const numberFormatter = new Intl.NumberFormat("fr-FR");
const moneyFormatter = new Intl.NumberFormat("fr-FR");

const marketplaceItems = [
  ...packageCatalog.map((item) => ({ ...item, sourceType: "Forfait" })),
  ...offerCatalog.map((item) => ({ ...item, sourceType: "Offre" })),
];

const frenchLabels = {
  "Morocco tours": "Circuits au Maroc",
  "Desert trips": "Voyages désert",
  "Private guides": "Guides privés",
  "Family travel": "Voyages en famille",
  "Cultural routes": "Circuits culturels",
  "Temple visits": "Visites culturelles",
  "Food planning": "Adresses et repas",
  "Rail guidance": "Conseil transport",
  "Package planning and availability support": "Planification des forfaits et disponibilités",
  "Traveler request follow-up": "Suivi des demandes voyageurs",
  "Booking details coordination": "Coordination des réservations",
  "Destination and add-on guidance": "Conseil destination et options",
  "Custom Morocco itineraries": "Itinéraires sur mesure au Maroc",
  "Hotel and riad sourcing": "Sélection d’hôtels et riads",
  "Airport transfers": "Transferts aéroport",
  "Local guide coordination": "Coordination des guides locaux",
};

function toFrenchLabel(value) {
  return frenchLabels[value] || value;
}

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function parseMad(value) {
  return Number(String(value || "").replace(/[^\d]/g, "")) || 0;
}

export function formatMad(value) {
  return `${moneyFormatter.format(Math.round(Number(value) || 0))} MAD`;
}

function getAgencyItems(agency) {
  const packageNames = (agency.packages || []).map(normalize);

  return marketplaceItems.filter((item) => {
    const itemTitle = normalize(item.title);
    const sameAgency = normalize(item.agency) === normalize(agency.name);
    const listedPackage = packageNames.some(
      (packageName) => itemTitle.includes(packageName) || packageName.includes(itemTitle)
    );

    return sameAgency || listedPackage;
  });
}

function getLiveRequests() {
  try {
    const requests = getAllTripRequests();

    return requests.length ? requests : [];
  } catch {
    return [];
  }
}

function agencyMatchesRequest(agency, request) {
  try {
    return getAgencyMatchesForRequest(request).some((matchedAgency) => matchedAgency.id === agency.id);
  } catch {
    return false;
  }
}

function requestStatus(status) {
  const statusMap = {
    "Agency reviewing": "En attente",
    "Offer ready": "Offre envoyée",
    "Offers received": "Offre envoyée",
    "Offer selected": "Confirmée",
    "Booking pending": "Confirmée",
    Confirmed: "Confirmée",
    Cancelled: "Refusée",
  };

  return statusMap[status] || "Nouvelle";
}

function offerStatus(status) {
  const statusMap = {
    Active: "Envoyée",
    Selected: "Acceptée",
    "Needs update": "Expirée",
    Cancelled: "Annulée",
    Refused: "Refusée",
  };

  return statusMap[status] || "Envoyée";
}

function reservationStatus(status) {
  const statusMap = {
    Confirmed: "Confirmée",
    "Agency follow-up": "En attente",
    Draft: "En attente",
    Completed: "Terminée",
    Cancelled: "Annulée",
  };

  return statusMap[status] || "En attente";
}

function paymentStatus(status) {
  const statusMap = {
    Paid: "Payé",
    "Deposit pending": "En attente",
    "Not paid": "Non payé",
    Failed: "Échoué",
    Refunded: "Remboursé",
  };

  return statusMap[status] || "En attente";
}

function splitDestination(value) {
  const parts = String(value || "").split(",").map((part) => part.trim());

  return {
    city: parts[0] || "Marrakech",
    country: parts[1] || "Maroc",
  };
}

const selectedAgency = getAgencyById("atlas-voyages") || agencyCatalog[0];
const agencyItems = getAgencyItems(selectedAgency);
const liveRequests = getLiveRequests();
const matchedRequests = liveRequests.filter((request) => agencyMatchesRequest(selectedAgency, request));
const sourceRequests = (matchedRequests.length ? matchedRequests : liveRequests).slice(0, 8);
const primaryItem = agencyItems[0] || marketplaceItems[0];

export const agencyProfile = {
  id: selectedAgency.id,
  name: selectedAgency.name,
  email: "contact@atlasvoyages.ma",
  phone: "+212 6 24 18 77 90",
  address: "Avenue Mohammed V, Guéliz",
  city: splitDestination(selectedAgency.location).city,
  country: splitDestination(selectedAgency.location).country,
  description: `Agence partenaire NextTrip spécialisée dans ${(
    selectedAgency.specialties || ["les voyages organisés"]
  )
    .slice(0, 3)
    .map(toFrenchLabel)
    .join(", ")}. Elle suit les demandes sur mesure, les offres et les réservations depuis un espace agence clair.`,
  manager: "Nadia El Amrani",
  verificationStatus: selectedAgency.verified ? "Vérifiée" : "En attente",
  rating: selectedAgency.rating || 4.8,
  responseTime: selectedAgency.responseTime || "Réponse via NextTrip",
  logo: selectedAgency.cover || primaryItem?.image || "",
  specialties: (selectedAgency.specialties || []).map(toFrenchLabel),
  services: (selectedAgency.services || []).map(toFrenchLabel),
  license: "NT-AG-2148",
};

const fallbackRequests = [
  {
    id: "REQ-AG-3101",
    title: "Séjour culturel à Marrakech",
    destination: primaryItem?.location || "Marrakech, Maroc",
    dates: "18 juin 2026",
    travelers: "2 adultes, 2 enfants",
    budget: "14 000 MAD",
    services: ["Transfert aéroport", "Guide local", "Hôtel ou riad"],
    notes: "Le client souhaite un voyage familial confortable avec une journée dans le désert.",
    status: "Agency reviewing",
  },
  {
    id: "REQ-AG-3102",
    title: "Week-end dans le désert",
    destination: "Agafay, Maroc",
    dates: "05 juillet 2026",
    travelers: "2 adultes",
    budget: "8 500 MAD",
    services: ["Camp désert", "Transport privé", "Dîner inclus"],
    notes: "Demande courte, rythme calme, expérience premium souhaitée.",
    status: "Offer ready",
  },
  {
    id: "REQ-AG-3103",
    title: "Circuit Atlas et médina",
    destination: "Marrakech, Haut Atlas",
    dates: "20 août 2026",
    travelers: "3 voyageurs",
    budget: "11 000 MAD",
    services: ["Excursions", "Guide local", "Assurance voyage"],
    notes: "Le groupe veut combiner nature, culture et temps libre.",
    status: "Agency reviewing",
  },
];

const requestSource = sourceRequests.length ? sourceRequests : fallbackRequests;

export const clientRequests = requestSource.map((request, index) => ({
  id: request.id,
  client: request.traveler?.name || (index === 1 ? "Salma Alaoui" : profileOverview.name),
  email: request.traveler?.email || (index === 1 ? "salma.alaoui@example.com" : profileOverview.email),
  phone: request.traveler?.phone || (index === 1 ? "+212 6 98 45 12 30" : profileOverview.phone),
  destination: request.destination,
  departureDate: request.dates || "Dates flexibles",
  travelers: request.travelers || "1 voyageur",
  budget: request.budget || "Budget à confirmer",
  services: request.services || [],
  notes: request.notes || "Aucune note détaillée pour cette demande.",
  status: requestStatus(request.status),
  createdAt: index === 0 ? "Aujourd’hui" : index === 1 ? "Hier" : "Cette semaine",
}));

const liveOffers = requestSource.flatMap((request) => getRequestOffers(request.id));
const agencyOffers = [...seededTripOffers, ...liveOffers]
  .filter((offer) => normalize(offer.agencyName) === normalize(selectedAgency.name))
  .slice(0, 8);

export const sentOffers = (agencyOffers.length
  ? agencyOffers
  : clientRequests.slice(0, 3).map((request, index) => ({
      id: `OFF-${request.id}`,
      requestId: request.id,
      agencyName: agencyProfile.name,
      title: request.destination,
      totalPrice: `${parseMad(request.budget) || Number(primaryItem?.price || 9000) + index * 1200} MAD`,
      deposit: index === 0 ? "30%" : "25%",
      hotelPlan: "Hôtel ou riad validé selon le budget du client",
      transportPlan: "Transfert privé inclus",
      includedServices: request.services.join(", "),
      message: "Proposition préparée selon la demande du client.",
      validUntil: index === 0 ? "2026-06-20" : "2026-07-05",
      status: index === 0 ? "Active" : "Selected",
      submittedAt: index === 0 ? "2026-06-06T10:00:00.000Z" : "2026-06-04T13:30:00.000Z",
    }))
).map((offer, index) => {
  const relatedRequest = clientRequests.find((request) => offer.requestId === request.id) || clientRequests[index] || clientRequests[0];

  return {
    id: offer.id,
    requestId: offer.requestId,
    client: relatedRequest?.client || profileOverview.name,
    destination: relatedRequest?.destination || offer.title,
    price: parseMad(offer.totalPrice),
    duration: relatedRequest?.departureDate || "Durée à confirmer",
    hotel: offer.hotelPlan || "Hôtel selon disponibilité",
    transport: offer.transportPlan || "Transport coordonné par l’agence",
    services: String(offer.includedServices || "")
      .split(",")
      .map((service) => service.trim())
      .filter(Boolean),
    message: offer.message || "Message envoyé au client.",
    status: offerStatus(offer.status),
    sentAt: offer.submittedAt ? new Date(offer.submittedAt).toLocaleDateString("fr-FR") : "06/06/2026",
  };
});

const bookingSource = bookingRecords.filter((booking) =>
  agencyItems.some((item) => item.id === booking.packageId || normalize(item.title) === normalize(booking.title))
);

const fallbackReservations = clientRequests.slice(0, 3).map((request, index) => ({
  id: `BK-AG-${2026 + index}`,
  client: request.client,
  destination: request.destination,
  date: request.departureDate,
  amount: sentOffers[index]?.price || parseMad(request.budget) || Number(primaryItem?.price || 9000),
  reservationStatus: index === 0 ? "En attente" : index === 1 ? "Confirmée" : "Terminée",
  paymentStatus: index === 0 ? "En attente de paiement" : "Payé",
}));

export const reservations = (bookingSource.length
  ? bookingSource.map((booking) => ({
      id: booking.id,
      client: profileOverview.name,
      destination: booking.location,
      date: booking.travelDate,
      amount: booking.total,
      reservationStatus: reservationStatus(booking.status),
      paymentStatus: paymentStatus(booking.paymentStatus),
    }))
  : fallbackReservations
);

export const clients = Array.from(
  new Map(
    clientRequests.map((request, index) => [
      request.email,
      {
        id: `CL-${index + 1}`,
        name: request.client,
        email: request.email,
        phone: request.phone,
        bookings: reservations.filter((reservation) => reservation.client === request.client).length,
        lastRequest: request.destination,
        status: index === 0 ? "Actif" : "Suivi en cours",
      },
    ])
  ).values()
);

export const payments = reservations.map((reservation, index) => ({
  id: `PAY-AG-${index + 1}${String(index + 7).padStart(2, "0")}`,
  client: reservation.client,
  reservationId: reservation.id,
  amount: reservation.amount,
  method: index === 0 ? "Carte" : index === 1 ? "Virement" : "Espèces",
  status: reservation.paymentStatus === "Payé" ? "Payé" : "En attente",
  date: reservation.date,
}));

export const messages = clientRequests.slice(0, 4).map((request, index) => ({
  id: `MSG-${index + 1}`,
  client: request.client,
  subject: index === 0 ? "Précisions sur la demande" : "Question sur l’offre",
  preview:
    index === 0
      ? "Le client souhaite confirmer les services inclus avant de recevoir l’offre finale."
      : "Le client demande plus de détails sur l’hôtel, le transport et le paiement.",
  date: index === 0 ? "Aujourd’hui" : "Hier",
  status: index === 0 ? "Non lu" : "Lu",
}));

export const notifications = [
  {
    id: "NOT-AG-1",
    title: "Nouvelle demande reçue",
    type: "Demande",
    message: `${clientRequests[0]?.client || "Un client"} attend une réponse pour ${clientRequests[0]?.destination || "sa destination"}.`,
    date: "Aujourd’hui",
    status: "Non lu",
  },
  {
    id: "NOT-AG-2",
    title: "Paiement à vérifier",
    type: "Paiement",
    message: "Un paiement est en attente de confirmation.",
    date: "Hier",
    status: "Non lu",
  },
  {
    id: "NOT-AG-3",
    title: "Offre acceptée",
    type: "Offre",
    message: "Une offre envoyée par l’agence a été acceptée par un client.",
    date: "Cette semaine",
    status: "Lu",
  },
];

const paidTotal = payments
  .filter((payment) => payment.status === "Payé")
  .reduce((sum, payment) => sum + payment.amount, 0);
const pendingTotal = payments
  .filter((payment) => payment.status !== "Payé")
  .reduce((sum, payment) => sum + payment.amount, 0);

export const paymentStats = {
  paidTotal: formatMad(paidTotal),
  pendingTotal: formatMad(pendingTotal),
  failedCount: numberFormatter.format(payments.filter((payment) => payment.status === "Échoué").length),
};

export const agencyStats = [
  {
    label: "Total demandes reçues",
    value: numberFormatter.format(clientRequests.length),
    note: "Demandes liées à votre agence",
    tone: "blue",
  },
  {
    label: "Offres envoyées",
    value: numberFormatter.format(sentOffers.length),
    note: "Propositions préparées",
    tone: "orange",
  },
  {
    label: "Réservations confirmées",
    value: numberFormatter.format(reservations.filter((reservation) => reservation.reservationStatus === "Confirmée").length),
    note: "Voyages validés",
    tone: "green",
  },
  {
    label: "Revenus de l’agence",
    value: formatMad(paidTotal),
    note: "Paiements confirmés",
    tone: "blue",
  },
  {
    label: "Demandes en attente",
    value: numberFormatter.format(clientRequests.filter((request) => ["Nouvelle", "En attente"].includes(request.status)).length),
    note: "À traiter rapidement",
    tone: "orange",
  },
  {
    label: "Voyages terminés",
    value: numberFormatter.format(reservations.filter((reservation) => reservation.reservationStatus === "Terminée").length),
    note: "Historique suivi",
    tone: "green",
  },
];

export const revenueSummary = {
  total: formatMad(reservations.reduce((sum, reservation) => sum + reservation.amount, 0)),
  paid: formatMad(paidTotal),
  pending: formatMad(pendingTotal),
  bars: reservations.map((reservation) => Math.max(44, Math.min(170, Math.round(reservation.amount / 100)))),
};

export const agencySettings = {
  accountEmail: agencyProfile.email,
  language: "Français",
  theme: "Clair",
  notifyRequests: true,
  notifyPayments: true,
};

export const recentActivity = [
  {
    id: "ACT-1",
    title: "Demande consultée",
    detail: clientRequests[0] ? `${clientRequests[0].id} · ${clientRequests[0].destination}` : "Aucune demande",
    time: "Il y a 1 h",
  },
  {
    id: "ACT-2",
    title: "Offre envoyée",
    detail: sentOffers[0] ? `${sentOffers[0].id} · ${formatMad(sentOffers[0].price)}` : "Aucune offre",
    time: "Il y a 3 h",
  },
  {
    id: "ACT-3",
    title: "Paiement suivi",
    detail: payments[0] ? `${payments[0].id} · ${payments[0].status}` : "Aucun paiement",
    time: "Aujourd’hui",
  },
];
