import { getAgencyByName } from "./agencyCatalog";
import { getPackageById } from "./packageCatalog";
import { initialExperiencePosts } from "./travelExperienceContent";
import {
  bookingRecords,
  getAllTripRequests,
  getRequestOffers,
  profileOverview,
} from "./userWorkspaceContent";

const numberFormatter = new Intl.NumberFormat("fr-FR");
const moneyFormatter = new Intl.NumberFormat("fr-FR");
const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const locationLabels = {
  "Santorini, Greece": "Santorin, Grèce",
  "Kyoto, Japan": "Kyoto, Japon",
  "Zermatt, Switzerland": "Zermatt, Suisse",
  "Dubai, UAE": "Dubaï, Émirats arabes unis",
  "Ubud, Bali": "Ubud, Bali",
  "Amalfi, Italy": "Amalfi, Italie",
  "Marrakech, Morocco": "Marrakech, Maroc",
  "High Atlas, Morocco": "Haut Atlas, Maroc",
  "Makkah, Saudi Arabia": "La Mecque, Arabie saoudite",
  "Chefchaouen, Morocco": "Chefchaouen, Maroc",
  "Paris, France": "Paris, France",
  "Lisbon, Portugal": "Lisbonne, Portugal",
};

const requestStatusLabels = {
  "Agency reviewing": "En attente",
  "Offer ready": "Offre reçue",
  "Offers received": "Offre reçue",
  "Offer selected": "Confirmée",
  "Booking pending": "Confirmée",
  Confirmed: "Confirmée",
  Cancelled: "Annulée",
  Draft: "Nouvelle",
};

const bookingStatusLabels = {
  Confirmed: "Confirmée",
  "Agency follow-up": "En attente",
  Draft: "En attente",
  Completed: "Terminée",
  Cancelled: "Annulée",
};

const paymentStatusLabels = {
  Paid: "Payé",
  "Deposit pending": "En attente",
  "Not paid": "Non payé",
  Failed: "Échoué",
  Refunded: "Remboursé",
};

const offerStatusLabels = {
  Active: "Nouvelle",
  Selected: "Acceptée",
  "Needs update": "Expirée",
  Cancelled: "Refusée",
  Refused: "Refusée",
  Accepted: "Acceptée",
};

function parseMad(value) {
  return Number(String(value || "").replace(/[^\d]/g, "")) || 0;
}

function asArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  return String(value)
    .split(/[,|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(value, fallback = "Dates flexibles") {
  if (!value) {
    return fallback;
  }

  const firstDate = String(value).split(/\s+to\s+| au | - /i)[0];
  const parsed = new Date(firstDate);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return dateFormatter.format(parsed);
}

function formatDateTime(value, fallback = "Aujourd'hui") {
  if (!value) {
    return fallback;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return dateFormatter.format(parsed);
}

function translateLocation(value) {
  return locationLabels[value] || value || "Destination à confirmer";
}

function requestStatus(value) {
  return requestStatusLabels[value] || "Nouvelle";
}

function bookingStatus(value) {
  return bookingStatusLabels[value] || "En attente";
}

function paymentStatus(value) {
  return paymentStatusLabels[value] || "En attente";
}

function offerStatus(value) {
  return offerStatusLabels[value] || "Nouvelle";
}

export function formatMad(value) {
  return `${moneyFormatter.format(Math.round(Number(value) || 0))} MAD`;
}

const requestsSource = getAllTripRequests();

export const travelerProfile = {
  name: profileOverview.name,
  email: profileOverview.email,
  phone: profileOverview.phone,
  city: "Casablanca",
  country: "Maroc",
  memberSince: "Mai 2026",
  status: "Voyageur vérifié",
  avatar:
    "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=240&q=80",
  preferences: [
    { label: "Style de voyage", value: "Confort et culture" },
    { label: "Budget préféré", value: "10 000 - 18 000 MAD" },
    { label: "Régions favorites", value: "Europe, Asie, Afrique" },
    { label: "Langues de support", value: "Français, arabe, anglais" },
  ],
};

export const reservations = bookingRecords.map((booking, index) => {
  const packageItem = getPackageById(booking.packageId);
  const agencyProfile = getAgencyByName(packageItem?.agency);
  const amount = Number(booking.total || packageItem?.price || 0);

  return {
    id: booking.id,
    destination: translateLocation(booking.location || packageItem?.location),
    packageTitle: booking.title || packageItem?.title || "Forfait NextTrip",
    agency: packageItem?.agency || "Agence NextTrip",
    departureDate: formatDate(booking.travelDate),
    travelers: `${booking.travelers || 1} ${Number(booking.travelers || 1) > 1 ? "voyageurs" : "voyageur"}`,
    amount,
    status: bookingStatus(booking.status),
    paymentStatus: paymentStatus(booking.paymentStatus),
    receiptId: `REC-${String(index + 1042).padStart(4, "0")}`,
    checkoutRoute: packageItem ? `/checkout/${packageItem.id}` : "/checkout",
    agencyRoute: agencyProfile ? `/agency/${agencyProfile.id}` : "/agency",
    nextAction:
      booking.paymentStatus === "Paid"
        ? "Télécharger le reçu et vérifier les documents du voyage."
        : "Finaliser le paiement ou confirmer les détails avec l’agence.",
    image: packageItem?.image,
    route: packageItem ? `/packages/${packageItem.id}` : "/packages",
  };
});

export const customRequests = requestsSource.map((request, index) => ({
  id: request.id,
  title: request.title || `Demande personnalisée ${index + 1}`,
  destination: translateLocation(request.destination),
  departureDate: request.dates || "Dates flexibles",
  travelers: request.travelers || "1 voyageur",
  budget: request.budget || "Budget à confirmer",
  services: asArray(request.services),
  notes: request.notes || "Aucune note ajoutée pour cette demande.",
  status: requestStatus(request.status),
  createdAt: request.timeline?.[0]?.value || "Cette semaine",
  route: `/trip-requests/${request.id}`,
}));

const requestLookup = new Map(customRequests.map((request) => [request.id, request]));

export const receivedOffers = requestsSource
  .flatMap((request) =>
    getRequestOffers(request.id).map((offer) => {
      const relatedRequest = requestLookup.get(request.id);
      const relatedAgency = getAgencyByName(offer.agencyName);
      const price = parseMad(offer.totalPrice);

      return {
        id: offer.id,
        requestId: request.id,
        agency: offer.agencyName || "Agence NextTrip",
        agencyRoute: relatedAgency ? `/agency/${relatedAgency.id}` : "/agency",
        destination: relatedRequest?.destination || translateLocation(request.destination),
        price,
        duration: request.priceQuote?.days
          ? `${request.priceQuote.days} jours`
          : request.dates || "Durée flexible",
        services: asArray(offer.includedServices),
        hotel: offer.hotelPlan || "Hébergement proposé par l’agence",
        transport: offer.transportPlan || "Transport à confirmer avec l’agence",
        message: offer.message || "L’agence a préparé une proposition adaptée à votre demande.",
        sentAt: formatDateTime(offer.submittedAt, "Cette semaine"),
        validUntil: formatDate(offer.validUntil, "Validité à confirmer"),
        status: offerStatus(offer.status),
        totalLabel: offer.totalPrice || formatMad(price),
      };
    })
  );

export const payments = reservations.map((reservation, index) => ({
  id: `PAY-${reservation.id.replace("BK-", "")}`,
  reservationId: reservation.id,
  destination: reservation.destination,
  amount: reservation.amount,
  method: index === 1 ? "Virement" : "Carte",
  status: reservation.paymentStatus,
  date: reservation.status === "Confirmée" ? reservation.departureDate : "À programmer",
  receiptId: reservation.receiptId,
  checkoutRoute: reservation.checkoutRoute,
}));

export const receipts = payments
  .filter((payment) => payment.status === "Payé" || payment.status === "En attente")
  .map((payment) => ({
    id: payment.receiptId,
    reservationId: payment.reservationId,
    destination: payment.destination,
    date: payment.date,
    amount: payment.amount,
    status: payment.status === "Payé" ? "Disponible" : "En attente",
    email: travelerProfile.email,
  }));

const experienceTitleLabels = {
  "Santorini Sunset Dream": "Rêve au coucher du soleil à Santorin",
  "Kyoto Heritage Journey": "Voyage culturel à Kyoto",
  "Swiss Alpine Escape": "Évasion alpine en Suisse",
};

export const experiences = initialExperiencePosts
  .filter((post) => post.user === "Salma El Alaoui" || post.user === travelerProfile.name || post.verified)
  .slice(0, 4)
  .map((post, index) => ({
    id: `EXP-${String(post.id).padStart(3, "0")}`,
    postId: post.id,
    destination: translateLocation(post.location),
    image: post.image,
    title: experienceTitleLabels[post.tripTitle] || post.tripTitle,
    preview: post.text,
    likes: post.likes,
    comments: post.comments?.length || 0,
    status: index === 2 ? "En attente" : "Publiée",
    date: index === 0 ? "Aujourd'hui" : "Cette semaine",
    route: `/experience/${post.id}`,
  }));

export const notifications = [
  {
    id: "NOT-TR-001",
    title: "Réservation confirmée",
    type: "Réservation",
    message: `${reservations[0]?.packageTitle || "Votre voyage"} est confirmé. Vérifiez vos documents avant le départ.`,
    date: "Aujourd'hui",
    status: "Non lu",
  },
  {
    id: "NOT-TR-002",
    title: "Nouvelle offre reçue",
    type: "Offre",
    message:
      receivedOffers[0]
        ? `${receivedOffers[0].agency} a envoyé une offre pour ${receivedOffers[0].destination}.`
        : "Une agence peut bientôt répondre à votre demande personnalisée.",
    date: "Hier",
    status: "Non lu",
  },
  {
    id: "NOT-TR-003",
    title: "Paiement à suivre",
    type: "Paiement",
    message: "Un paiement est encore en attente. Vous pouvez le suivre depuis la section Paiements.",
    date: "Cette semaine",
    status: "Lu",
  },
  {
    id: "NOT-TR-004",
    title: "Support NextTrip",
    type: "Support",
    message: "Notre équipe reste disponible si vous avez besoin d’aide avant votre prochain voyage.",
    date: "Cette semaine",
    status: "Lu",
  },
];

export const travelerStats = [
  {
    label: "Réservations actives",
    value: String(reservations.filter((item) => item.status !== "Annulée").length),
    note: "Réservations en cours ou confirmées",
  },
  {
    label: "Demandes personnalisées",
    value: String(customRequests.length),
    note: "Demandes envoyées aux agences",
  },
  {
    label: "Offres reçues",
    value: String(receivedOffers.length),
    note: "Propositions prêtes à comparer",
  },
  {
    label: "Paiements effectués",
    value: formatMad(payments.filter((item) => item.status === "Payé").reduce((sum, item) => sum + item.amount, 0)),
    note: "Montant réglé via NextTrip",
  },
  {
    label: "Voyages terminés",
    value: String(reservations.filter((item) => item.status === "Terminée").length),
    note: "Historique des voyages",
  },
  {
    label: "Notifications non lues",
    value: String(notifications.filter((item) => item.status === "Non lu").length),
    note: "Alertes à consulter",
  },
];

export const paymentSummary = [
  {
    label: "Total payé",
    value: formatMad(payments.filter((item) => item.status === "Payé").reduce((sum, item) => sum + item.amount, 0)),
  },
  {
    label: "Paiements en attente",
    value: formatMad(payments.filter((item) => item.status === "En attente").reduce((sum, item) => sum + item.amount, 0)),
  },
  {
    label: "Paiements échoués",
    value: String(payments.filter((item) => item.status === "Échoué").length),
  },
];

export const recentActivity = [
  {
    id: "ACT-001",
    title: "Réservation mise à jour",
    detail: reservations[0]
      ? `${reservations[0].destination} est maintenant ${reservations[0].status.toLowerCase()}.`
      : "Votre prochaine réservation est prête.",
    time: "Aujourd'hui",
  },
  {
    id: "ACT-002",
    title: "Offre à comparer",
    detail: receivedOffers[0]
      ? `${receivedOffers[0].agency} propose ${formatMad(receivedOffers[0].price)}.`
      : "Aucune nouvelle offre pour le moment.",
    time: "Hier",
  },
  {
    id: "ACT-003",
    title: "Profil voyageur",
    detail: "Vos préférences de voyage sont prêtes pour les prochaines demandes.",
    time: "Cette semaine",
  },
];

export const travelerSettings = {
  language: "Français",
  theme: "Clair",
  emailNotifications: true,
  smsNotifications: true,
  bookingAlerts: true,
  offerAlerts: true,
  securityLevel: "Connexion protégée",
  supportEmail: "support@nexttrip.ma",
};

export const travelerCounters = {
  reservations: reservations.length,
  requests: customRequests.length,
  offers: receivedOffers.length,
  payments: payments.length,
  receipts: receipts.length,
  experiences: experiences.length,
  notifications: notifications.length,
  unreadNotifications: notifications.filter((item) => item.status === "Non lu").length,
  totalPaid: numberFormatter.format(
    payments.filter((item) => item.status === "Payé").reduce((sum, item) => sum + item.amount, 0)
  ),
};
