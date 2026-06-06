import { agencyCatalog, getAgencySlug } from "./agencyCatalog";
import { destinationCities } from "./destinationsContent";
import { offerCatalog, packageCatalog } from "./packageCatalog";
import { initialExperiencePosts } from "./travelExperienceContent";
import {
  bookingRecords,
  getAgencyMatchesForRequest,
  getAllTripRequests,
  getRequestOffers,
  profileOverview,
  tripRequests,
} from "./userWorkspaceContent";

const numberFormatter = new Intl.NumberFormat("fr-FR");
const moneyFormatter = new Intl.NumberFormat("fr-FR");

const allMarketplaceItems = [
  ...packageCatalog.map((item) => ({ ...item, source: "Forfait" })),
  ...offerCatalog.map((item) => ({ ...item, source: "Offre" })),
];

function formatMad(value) {
  return `${moneyFormatter.format(Math.round(Number(value) || 0))} MAD`;
}

function slugEmail(value, domain = "nexttrip.ma") {
  return `${String(value || "contact")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")}@${domain}`;
}

function agencyOfferCount(name) {
  return allMarketplaceItems.filter((item) => item.agency === name).length;
}

function getLiveTripRequests() {
  try {
    const requests = getAllTripRequests();

    return requests.length ? requests : tripRequests;
  } catch {
    return tripRequests;
  }
}

function agencyStatus(agency, index) {
  if (agency.verified) {
    return "Approuvé";
  }

  return index % 3 === 0 ? "Suspendu" : "En attente";
}

function bookingStatus(status) {
  const map = {
    Confirmed: "Confirmé",
    "Agency follow-up": "En attente",
    Draft: "En attente",
    Completed: "Terminé",
    Cancelled: "Annulé",
  };

  return map[status] || "En attente";
}

function paymentStatus(status) {
  const map = {
    Paid: "Payé",
    "Deposit pending": "En attente",
    "Not paid": "En attente",
    Failed: "Échoué",
    Refunded: "Remboursé",
  };

  return map[status] || "En attente";
}

function requestStatus(status) {
  const map = {
    "Agency reviewing": "Envoyé",
    "Offer ready": "Offre reçue",
    "Offers received": "Offre reçue",
    "Offer selected": "Confirmé",
    "Booking pending": "Confirmé",
    Confirmed: "Confirmé",
    Cancelled: "Annulé",
  };

  return map[status] || "Nouveau";
}

export const adminProfile = {
  name: "Administrateur NextTrip",
  email: "admin@nexttrip.ma",
  role: "Gestion de la plateforme",
  region: "Maroc",
};

export const usersData = [
  {
    id: "USR-1001",
    name: profileOverview.name,
    email: profileOverview.email,
    role: "Client",
    status: "Actif",
    joinDate: "12 mai 2026",
    source: "Profil voyageur",
  },
  {
    id: "USR-1002",
    name: "Salma El Alaoui",
    email: "salma.alaoui@example.com",
    role: "Client",
    status: "Actif",
    joinDate: "18 avril 2026",
    source: "Avis voyageurs",
  },
  {
    id: "USR-1003",
    name: "Yassine Idrissi",
    email: "yassine.idrissi@example.com",
    role: "Client",
    status: "Actif",
    joinDate: "03 avril 2026",
    source: "Avis voyageurs",
  },
  {
    id: "USR-1004",
    name: "Nora Bennis",
    email: "nora.bennis@example.com",
    role: "Client",
    status: "Bloqué",
    joinDate: "27 mars 2026",
    source: "Communauté",
  },
  {
    id: "USR-1005",
    name: "Atlas Voyages",
    email: "contact@atlasvoyages.ma",
    role: "Agence",
    status: "Actif",
    joinDate: "14 mars 2026",
    source: "Catalogue agences",
    route: "/agency/atlas-voyages",
  },
  {
    id: "USR-1006",
    name: "Administrateur NextTrip",
    email: adminProfile.email,
    role: "Administrateur",
    status: "Actif",
    joinDate: "01 mars 2026",
    source: "Administration",
    route: "/nexttrip-dashboard",
  },
];

export const agenciesData = agencyCatalog.map((agency, index) => ({
  id: agency.id || `AG-${index + 1}`,
  name: agency.name,
  email: slugEmail(agency.name, "agency.nexttrip.ma"),
  phone: `+212 6 ${String(20 + index).padStart(2, "0")} ${String(34 + index).padStart(2, "0")} ${String(56 + index).padStart(2, "0")} ${String(70 + index).padStart(2, "0")}`,
  status: agencyStatus(agency, index),
  offers: agencyOfferCount(agency.name),
  location: agency.location || "Marketplace NextTrip",
  rating: agency.rating || 4.6,
  route: `/agency/${agency.id || getAgencySlug(agency.name)}`,
  specialties: agency.specialties || [],
  services: agency.services || [],
}));

export const packagesData = allMarketplaceItems.map((item, index) => ({
  id: `${item.source === "Offre" ? "OFF" : "PKG"}-${item.id}`,
  catalogId: item.id,
  title: item.title,
  destination: item.location,
  price: Number(item.price) || 0,
  duration: item.duration,
  status: index % 5 === 0 ? "En attente" : "Publié",
  agency: item.agency,
  type: item.source,
  category: item.category,
  rating: item.rating,
  route: `/packages/${item.id}`,
}));

export const destinationsData = destinationCities.map((destination, index) => {
  const packageCount = allMarketplaceItems.filter((item) => {
    const text = `${item.location} ${item.title} ${item.description}`.toLowerCase();
    return text.includes(destination.name.toLowerCase()) || text.includes(destination.country.toLowerCase());
  }).length;

  return {
    id: `DST-${index + 1}`,
    name: destination.name,
    country: destination.country,
    city: destination.name,
    packages: packageCount,
    status: index % 6 === 0 ? "En attente" : "Actif",
    route: "/destinations",
  };
});

export const bookingsData = bookingRecords.map((booking) => {
  const packageItem = allMarketplaceItems.find(
    (item) => item.id === booking.packageId || item.title === booking.title
  );

  return {
    id: booking.id,
    client: profileOverview.name,
    packageId: packageItem?.id || booking.packageId,
    packageName: booking.title,
    destination: booking.location,
    agency: packageItem?.agency || "Agence NextTrip",
    date: booking.travelDate,
    travelers: booking.travelers,
    amount: booking.total,
    paymentStatus: paymentStatus(booking.paymentStatus),
    bookingStatus: bookingStatus(booking.status),
    nextAction: booking.nextAction,
    route: packageItem?.id ? `/checkout/${packageItem.id}` : "/packages",
  };
});

export const paymentsData = bookingRecords.map((booking, index) => ({
  id: `PAY-${booking.id.replace("BK-", "")}`,
  client: profileOverview.name,
  booking: booking.id,
  packageId: booking.packageId,
  amount: booking.total,
  method: booking.paymentStatus === "Paid" ? "Carte" : index % 2 === 0 ? "Virement" : "Espèces",
  status: paymentStatus(booking.paymentStatus),
  date: booking.travelDate,
  route: `/checkout/${booking.packageId}`,
}));

export const customRequestsData = getLiveTripRequests().map((request, index) => {
  const matchedAgencies = getAgencyMatchesForRequest(request);
  const offers = getRequestOffers(request.id);

  return {
    id: request.id,
    title: request.title,
    client: request.traveler?.name || profileOverview.name,
    destination: request.destination,
    travelers: request.travelers,
    dates: request.dates,
    budget: request.budget,
    services: request.services || [],
    agencies: (matchedAgencies.length ? matchedAgencies : agenciesData.slice(index, index + 3)).map(
      (agency) => agency.name
    ),
    offers: offers.length,
    status: requestStatus(request.status),
    route: `/trip-requests/${request.id}`,
    offersRoute: `/trip-requests/${request.id}/offers`,
  };
});

export const experiencesData = initialExperiencePosts.map((post, index) => ({
  id: `EXP-${post.id}`,
  sourceId: post.id,
  author: post.user,
  destination: post.location,
  preview: post.text,
  likes: post.likes,
  comments: post.comments?.length || 0,
  status: index === 1 ? "Signalé" : "Publié",
  route: `/experience/${post.id}`,
}));

export const notificationsData = [
  {
    id: "NOT-1001",
    title: "Nouvelle demande personnalisée",
    type: "Réservation",
    message: "Un client a envoyé une demande de voyage personnalisée vers Kyoto.",
    date: "06 juin 2026",
    status: "Non lu",
  },
  {
    id: "NOT-1002",
    title: "Paiement en attente",
    type: "Paiement",
    message: "Une réservation nécessite une vérification du dépôt.",
    date: "05 juin 2026",
    status: "Non lu",
  },
  {
    id: "NOT-1003",
    title: "Agence à vérifier",
    type: "Agence",
    message: "Une agence marketplace doit compléter son profil.",
    date: "04 juin 2026",
    status: "Lu",
  },
  {
    id: "NOT-1004",
    title: "Avis signalé",
    type: "Assistance",
    message: "Une expérience voyageur attend une modération.",
    date: "03 juin 2026",
    status: "Lu",
  },
];

const totalRevenue = bookingsData.reduce((sum, booking) => sum + booking.amount, 0);
const totalPaid = paymentsData
  .filter((payment) => payment.status === "Payé")
  .reduce((sum, payment) => sum + payment.amount, 0);
const pendingAmount = paymentsData
  .filter((payment) => payment.status === "En attente")
  .reduce((sum, payment) => sum + payment.amount, 0);
const failedPayments = paymentsData.filter((payment) => payment.status === "Échoué");
const pendingRequests = customRequestsData.filter((request) =>
  ["Nouveau", "Envoyé"].includes(request.status)
);
const completedTrips = bookingsData.filter((booking) => booking.bookingStatus === "Terminé");

export const overviewStats = [
  { label: "Total utilisateurs", value: numberFormatter.format(usersData.length), note: "Comptes clients, agences et admin", tone: "blue" },
  { label: "Total agences", value: numberFormatter.format(agenciesData.length), note: "Agences suivies par NextTrip", tone: "orange" },
  { label: "Total réservations", value: numberFormatter.format(bookingsData.length), note: "Réservations enregistrées", tone: "green" },
  { label: "Revenu total", value: formatMad(totalRevenue), note: "Valeur brute des réservations", tone: "blue" },
  { label: "Demandes en attente", value: numberFormatter.format(pendingRequests.length), note: "Demandes à traiter", tone: "orange" },
  { label: "Voyages terminés", value: numberFormatter.format(completedTrips.length), note: "Historique confirmé", tone: "green" },
];

export const paymentStats = {
  totalPaid: formatMad(totalPaid),
  pendingAmount: formatMad(pendingAmount),
  failedCount: numberFormatter.format(failedPayments.length),
};

export const revenueSummary = {
  total: formatMad(totalRevenue),
  paid: formatMad(totalPaid),
  pending: formatMad(pendingAmount),
  bars: bookingsData.map((booking) => Math.max(42, Math.min(170, Math.round(booking.amount / 120)))),
};

export const recentAgencyActivity = agenciesData.slice(0, 5).map((agency, index) => ({
  id: `ACT-${index + 1}`,
  agency: agency.name,
  activity:
    index % 2 === 0
      ? "a mis à jour une offre active."
      : "a répondu à une demande personnalisée.",
  date: `${index + 1} h`,
  status: agency.status,
}));

export const initialPlatformSettings = {
  platformName: "NextTrip",
  supportEmail: "support@nexttrip.ma",
  defaultLanguage: "Français",
  theme: "Clair",
  commission: "12",
};

export { formatMad };
