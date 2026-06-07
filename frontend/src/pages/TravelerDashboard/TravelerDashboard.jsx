import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Download,
  Eye,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquareText,
  PackageCheck,
  Pencil,
  Plus,
  Save,
  Search,
  Settings,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";
import nextTripLogo from "../../Assets/images/NextTrip logo.png";
import {
  customRequests as customRequestData,
  experiences as experienceData,
  formatMad,
  notifications as notificationData,
  payments as paymentData,
  receipts as receiptData,
  receivedOffers as offerData,
  recentActivity,
  reservations as reservationData,
  travelerProfile as travelerProfileData,
  travelerSettings,
} from "../../data/travelerDashboardData";
import { clearAuthSession } from "../../utils/authSession";
import "./TravelerDashboard.css";

const sidebarItems = [
  { key: "overview", label: "Tableau de bord", icon: LayoutDashboard },
  { key: "reservations", label: "Mes réservations", icon: CalendarCheck },
  { key: "requests", label: "Mes demandes", icon: ClipboardList },
  { key: "offers", label: "Offres reçues", icon: PackageCheck },
  { key: "payments", label: "Paiements", icon: CreditCard },
  { key: "receipts", label: "Reçus", icon: Download },
  { key: "experiences", label: "Mes expériences", icon: MessageSquareText },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "profile", label: "Profil", icon: UsersRound },
  { key: "settings", label: "Paramètres", icon: Settings },
];

const sidebarSectionKeys = new Set(sidebarItems.map((item) => item.key));

function getInitialSection(section) {
  return sidebarSectionKeys.has(section) ? section : "overview";
}

const pageCopy = {
  overview: {
    eyebrow: "Espace voyageur",
    title: "Tableau de bord",
    description:
      "Suivez vos réservations, demandes personnalisées, offres reçues et paiements depuis un espace clair.",
    search: "Rechercher dans mon espace...",
  },
  reservations: {
    eyebrow: "Suivi de voyage",
    title: "Mes réservations",
    description: "Consultez vos voyages confirmés, les paiements et les reçus associés.",
    search: "Rechercher une réservation...",
  },
  requests: {
    eyebrow: "Voyages sur mesure",
    title: "Mes demandes",
    description: "Suivez les demandes envoyées aux agences et comparez les réponses reçues.",
    search: "Rechercher une demande...",
  },
  offers: {
    eyebrow: "Propositions des agences",
    title: "Offres reçues",
    description: "Comparez les prix, services inclus, messages et conditions proposés par les agences.",
    search: "Rechercher une offre...",
  },
  payments: {
    eyebrow: "Paiement sécurisé",
    title: "Paiements",
    description: "Suivez les paiements réglés, en attente ou à vérifier.",
    search: "Rechercher un paiement...",
  },
  receipts: {
    eyebrow: "Documents",
    title: "Reçus",
    description: "Téléchargez, consultez ou préparez l’envoi de vos reçus de réservation.",
    search: "Rechercher un reçu...",
  },
  experiences: {
    eyebrow: "Communauté NextTrip",
    title: "Mes expériences",
    description: "Retrouvez vos récits de voyage, avis, likes et commentaires.",
    search: "Rechercher une expérience...",
  },
  notifications: {
    eyebrow: "Alertes",
    title: "Notifications",
    description: "Consultez les alertes liées à vos réservations, offres, paiements et demandes.",
    search: "Rechercher une notification...",
  },
  profile: {
    eyebrow: "Informations personnelles",
    title: "Profil",
    description: "Mettez à jour vos coordonnées et vos préférences de voyage.",
    search: "Rechercher dans le profil...",
  },
  settings: {
    eyebrow: "Préférences",
    title: "Paramètres",
    description: "Configurez les notifications, la langue et la sécurité de votre compte.",
    search: "Rechercher un paramètre...",
  },
};

const statusTone = {
  Nouvelle: "orange",
  Nouveau: "orange",
  "En attente": "orange",
  Confirmée: "green",
  Annulée: "red",
  Terminée: "blue",
  Payé: "green",
  "Non payé": "red",
  Échoué: "red",
  Remboursé: "blue",
  "Offre reçue": "green",
  Acceptée: "green",
  Refusée: "red",
  Expirée: "red",
  Publiée: "green",
  Masquée: "red",
  Lu: "blue",
  "Non lu": "orange",
  Disponible: "green",
};

const filters = {
  reservations: ["Tous", "En attente", "Confirmée", "Annulée", "Terminée"],
  reservationPayments: ["Tous", "Payé", "Non payé", "En attente", "Échoué", "Remboursé"],
  requests: ["Tous", "Nouvelle", "En attente", "Offre reçue", "Confirmée", "Annulée"],
  offers: ["Tous", "Nouvelle", "Acceptée", "Refusée", "Expirée"],
  payments: ["Tous", "Payé", "Non payé", "En attente", "Échoué", "Remboursé"],
  receipts: ["Tous", "Disponible", "En attente"],
  experiences: ["Tous", "Publiée", "En attente", "Masquée"],
  notifications: ["Tous", "Lu", "Non lu"],
};

const initialFilterState = {
  reservations: "Tous",
  reservationPayments: "Tous",
  requests: "Tous",
  offers: "Tous",
  payments: "Tous",
  receipts: "Tous",
  experiences: "Tous",
  notifications: "Tous",
};

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesSearch(item, fields, query) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return true;
  }

  return fields.some((field) => normalize(item[field]).includes(normalizedQuery));
}

function applyStatusFilter(items, status, key = "status") {
  if (!status || status === "Tous") {
    return items;
  }

  return items.filter((item) => item[key] === status);
}

function StatusBadge({ value }) {
  const tone = statusTone[value] || "neutral";

  return <span className={`status-badge status-badge-${tone}`}>{value}</span>;
}

function ActionButton({ children, icon: Icon, tone = "secondary", ...props }) {
  return (
    <button type="button" className={`action-btn action-btn-${tone}`} {...props}>
      {Icon ? <Icon size={15} /> : null}
      <span>{children}</span>
    </button>
  );
}

function EmptyState({ text = "Aucun résultat trouvé." }) {
  return <div className="traveler-empty-state">{text}</div>;
}

function DashboardTable({ columns, children, empty }) {
  return (
    <div className="traveler-table-wrap">
      <table className="traveler-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {empty ? <EmptyState text={empty} /> : null}
    </div>
  );
}

function SectionToolbar({ filters: toolbarFilters = [], children }) {
  return (
    <div className="traveler-section-toolbar">
      <div className="traveler-filter-row">
        {toolbarFilters.map((filter) => (
          <label key={filter.label}>
            <span>{filter.label}</span>
            <select value={filter.value} onChange={(event) => filter.onChange(event.target.value)}>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      {children ? <div className="traveler-toolbar-actions">{children}</div> : null}
    </div>
  );
}

function Modal({ title, children, onClose, footer }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="traveler-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="traveler-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="traveler-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="traveler-modal-header">
          <h2 id="traveler-modal-title">{title}</h2>
          <button ref={closeRef} type="button" className="traveler-icon-btn" aria-label="Fermer" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="traveler-modal-body">{children}</div>
        {footer ? <div className="traveler-modal-footer">{footer}</div> : null}
      </div>
    </div>
  );
}

function FieldGrid({ rows }) {
  return (
    <div className="traveler-detail-grid">
      {rows.map((row) => (
        <div key={`${row.label}-${row.value}`} className="traveler-detail-item">
          <span>{row.label}</span>
          <strong>{row.value || "Non renseigné"}</strong>
        </div>
      ))}
    </div>
  );
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function makeReceiptText(receipt, profile) {
  return [
    "NextTrip - Reçu de réservation",
    `Reçu: ${receipt.id}`,
    `Réservation: ${receipt.reservationId}`,
    `Client: ${profile.name}`,
    `Destination: ${receipt.destination}`,
    `Montant: ${formatMad(receipt.amount)}`,
    `Statut: ${receipt.status}`,
    `Date: ${receipt.date}`,
  ].join("\n");
}

export default function TravelerDashboard({ initialSection = "overview" }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(() => getInitialSection(initialSection));
  const [query, setQuery] = useState("");
  const [filterState, setFilterState] = useState(initialFilterState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);
  const [reservations, setReservations] = useState(reservationData);
  const [customRequests, setCustomRequests] = useState(customRequestData);
  const [receivedOffers, setReceivedOffers] = useState(offerData);
  const [payments] = useState(paymentData);
  const [receipts] = useState(receiptData);
  const [experiences, setExperiences] = useState(experienceData);
  const [notifications, setNotifications] = useState(notificationData);
  const [profile, setProfile] = useState(travelerProfileData);
  const [settings, setSettings] = useState(travelerSettings);

  useEffect(() => {
    setActiveSection(getInitialSection(initialSection));
    setQuery("");
  }, [initialSection]);

  const currentCopy = pageCopy[activeSection] || pageCopy.overview;
  const unreadCount = notifications.filter((item) => item.status === "Non lu").length;
  const computedStats = useMemo(
    () => [
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
        value: String(unreadCount),
        note: "Alertes à consulter",
      },
    ],
    [customRequests.length, payments, receivedOffers.length, reservations, unreadCount]
  );
  const computedPaymentSummary = useMemo(
    () => [
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
    ],
    [payments]
  );

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsNotificationsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeSection]);

  const setFilter = (key, value) => {
    setFilterState((current) => ({ ...current, [key]: value }));
  };

  const notify = (message) => setToast(message);

  const goToRoute = (route) => {
    navigate(route);
  };

  const changeSection = (sectionKey, options = {}) => {
    const { keepSearch = false } = options;

    if (!keepSearch) {
      setQuery("");
    }

    setActiveSection(sectionKey);
  };

  const handleLogout = () => {
    clearAuthSession();
    navigate("/auth", { replace: true });
  };

  const cancelReservation = (reservation) => {
    if (!window.confirm(`Annuler la réservation ${reservation.id} ?`)) {
      return;
    }

    setReservations((items) =>
      items.map((item) => (item.id === reservation.id ? { ...item, status: "Annulée" } : item))
    );
    notify(`${reservation.id} est maintenant annulée.`);
  };

  const cancelRequest = (request) => {
    if (!window.confirm(`Annuler la demande ${request.id} ?`)) {
      return;
    }

    setCustomRequests((items) =>
      items.map((item) => (item.id === request.id ? { ...item, status: "Annulée" } : item))
    );
    notify(`${request.id} est maintenant annulée.`);
  };

  const updateOfferStatus = (offer, status) => {
    const label = status === "Acceptée" ? "acceptée" : "refusée";

    if (!window.confirm(`Confirmer l’offre ${offer.id} comme ${label} ?`)) {
      return;
    }

    setReceivedOffers((items) =>
      items.map((item) => (item.id === offer.id ? { ...item, status } : item))
    );
    if (status === "Acceptée") {
      setCustomRequests((items) =>
        items.map((item) =>
          item.id === offer.requestId ? { ...item, status: "Confirmée" } : item
        )
      );
    }
    notify(`L’offre ${offer.id} est ${label}.`);
  };

  const markNotificationAsRead = (notification) => {
    setNotifications((items) =>
      items.map((item) => (item.id === notification.id ? { ...item, status: "Lu" } : item))
    );
    notify(`${notification.id} est marquée comme lue.`);
  };

  const deleteNotification = (notification) => {
    if (!window.confirm(`Supprimer la notification ${notification.id} ?`)) {
      return;
    }

    setNotifications((items) => items.filter((item) => item.id !== notification.id));
    notify(`${notification.id} a été supprimée.`);
  };

  const deleteExperience = (experience) => {
    if (!window.confirm(`Supprimer l’expérience ${experience.id} ?`)) {
      return;
    }

    setExperiences((items) => items.filter((item) => item.id !== experience.id));
    notify(`${experience.id} a été supprimée.`);
  };

  const downloadReceipt = (receipt) => {
    downloadTextFile(`${receipt.id}.txt`, makeReceiptText(receipt, profile));
    notify(`Téléchargement du reçu ${receipt.id} lancé.`);
  };

  const getReservationReceipt = (reservation) =>
    receipts.find((receipt) => receipt.reservationId === reservation.id) || {
      id: reservation.receiptId,
      reservationId: reservation.id,
      destination: reservation.destination,
      date: reservation.departureDate,
      amount: reservation.amount,
      status: reservation.paymentStatus === "Payé" ? "Disponible" : "En attente",
    };

  const filteredReservations = useMemo(() => {
    const searched = reservations.filter((item) =>
      matchesSearch(
        item,
        ["id", "destination", "packageTitle", "agency", "status", "paymentStatus"],
        query
      )
    );
    const byStatus = applyStatusFilter(searched, filterState.reservations);
    return applyStatusFilter(byStatus, filterState.reservationPayments, "paymentStatus");
  }, [filterState.reservationPayments, filterState.reservations, query, reservations]);

  const filteredRequests = useMemo(
    () =>
      applyStatusFilter(
        customRequests.filter((item) =>
          matchesSearch(item, ["id", "title", "destination", "budget", "status"], query)
        ),
        filterState.requests
      ),
    [customRequests, filterState.requests, query]
  );

  const filteredOffers = useMemo(
    () =>
      applyStatusFilter(
        receivedOffers.filter((item) =>
          matchesSearch(item, ["id", "requestId", "agency", "destination", "duration", "status"], query)
        ),
        filterState.offers
      ),
    [filterState.offers, query, receivedOffers]
  );

  const filteredPayments = useMemo(
    () =>
      applyStatusFilter(
        payments.filter((item) =>
          matchesSearch(item, ["id", "reservationId", "destination", "method", "status"], query)
        ),
        filterState.payments
      ),
    [filterState.payments, payments, query]
  );

  const filteredReceipts = useMemo(
    () =>
      applyStatusFilter(
        receipts.filter((item) =>
          matchesSearch(item, ["id", "reservationId", "destination", "status"], query)
        ),
        filterState.receipts
      ),
    [filterState.receipts, query, receipts]
  );

  const filteredExperiences = useMemo(
    () =>
      applyStatusFilter(
        experiences.filter((item) =>
          matchesSearch(item, ["id", "destination", "title", "preview", "status"], query)
        ),
        filterState.experiences
      ),
    [experiences, filterState.experiences, query]
  );

  const filteredNotifications = useMemo(
    () =>
      applyStatusFilter(
        notifications.filter((item) =>
          matchesSearch(item, ["id", "title", "type", "message", "status"], query)
        ),
        filterState.notifications
      ),
    [filterState.notifications, notifications, query]
  );

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const groups = [
      {
        section: "reservations",
        label: "Réservations",
        source: reservations,
        fields: ["id", "destination", "packageTitle", "agency", "status"],
        title: (item) => `${item.id} - ${item.destination}`,
        detail: (item) => `${item.packageTitle} avec ${item.agency}`,
      },
      {
        section: "requests",
        label: "Demandes",
        source: customRequests,
        fields: ["id", "title", "destination", "budget", "status"],
        title: (item) => `${item.id} - ${item.destination}`,
        detail: (item) => `${item.budget} • ${item.status}`,
      },
      {
        section: "offers",
        label: "Offres",
        source: receivedOffers,
        fields: ["id", "agency", "destination", "status"],
        title: (item) => `${item.agency} - ${item.destination}`,
        detail: (item) => `${formatMad(item.price)} • ${item.status}`,
      },
      {
        section: "payments",
        label: "Paiements",
        source: payments,
        fields: ["id", "reservationId", "destination", "status"],
        title: (item) => `${item.id} - ${item.destination}`,
        detail: (item) => `${formatMad(item.amount)} • ${item.status}`,
      },
      {
        section: "experiences",
        label: "Expériences",
        source: experiences,
        fields: ["id", "title", "destination", "status"],
        title: (item) => item.title,
        detail: (item) => `${item.destination} • ${item.status}`,
      },
      {
        section: "receipts",
        label: "Reçus",
        source: receipts,
        fields: ["id", "reservationId", "destination", "status"],
        title: (item) => `${item.id} - ${item.destination}`,
        detail: (item) => `${formatMad(item.amount)} • ${item.status}`,
      },
      {
        section: "notifications",
        label: "Notifications",
        source: notifications,
        fields: ["id", "title", "type", "message", "status"],
        title: (item) => item.title,
        detail: (item) => `${item.type} • ${item.status}`,
      },
      {
        section: "profile",
        label: "Profil",
        source: [
          {
            id: "profile-main",
            title: profile.name,
            detail: `${profile.email} • ${profile.phone}`,
            search: `${profile.name} ${profile.email} ${profile.phone} ${profile.city} ${profile.country}`,
          },
        ],
        fields: ["title", "detail", "search"],
        title: (item) => item.title,
        detail: (item) => item.detail,
      },
      {
        section: "settings",
        label: "Paramètres",
        source: [
          {
            id: "settings-main",
            title: "Préférences du compte",
            detail: `${settings.language} • ${settings.theme} • ${settings.supportEmail}`,
            search: `${settings.language} ${settings.theme} ${settings.supportEmail} notification sécurité compte`,
          },
        ],
        fields: ["title", "detail", "search"],
        title: (item) => item.title,
        detail: (item) => item.detail,
      },
    ];

    return groups
      .flatMap((group) =>
        group.source
          .filter((item) => matchesSearch(item, group.fields, query))
          .slice(0, 4)
          .map((item) => ({
            section: group.section,
            label: group.label,
            title: group.title(item),
            detail: group.detail(item),
          }))
      )
      .slice(0, 10);
  }, [customRequests, experiences, notifications, payments, profile, query, receipts, receivedOffers, reservations, settings]);

  const openReservationDetails = (reservation) => {
    setModal({
      title: `Réservation ${reservation.id}`,
      content: (
        <>
          <FieldGrid
            rows={[
              { label: "Destination", value: reservation.destination },
              { label: "Forfait", value: reservation.packageTitle },
              { label: "Agence", value: reservation.agency },
              { label: "Départ", value: reservation.departureDate },
              { label: "Voyageurs", value: reservation.travelers },
              { label: "Montant", value: formatMad(reservation.amount) },
              { label: "Statut réservation", value: reservation.status },
              { label: "Statut paiement", value: reservation.paymentStatus },
            ]}
          />
          <p className="traveler-modal-note">{reservation.nextAction}</p>
        </>
      ),
      footer: (
        <>
          <ActionButton icon={Eye} onClick={() => goToRoute(reservation.route)}>
            Ouvrir le forfait
          </ActionButton>
          <ActionButton icon={UsersRound} onClick={() => goToRoute(reservation.agencyRoute)}>
            Ouvrir agence
          </ActionButton>
          {reservation.paymentStatus === "Payé" ? (
            <ActionButton icon={Download} tone="primary" onClick={() => downloadReceipt(getReservationReceipt(reservation))}>
              Télécharger le reçu
            </ActionButton>
          ) : (
            <ActionButton icon={CreditCard} tone="primary" onClick={() => goToRoute(reservation.checkoutRoute)}>
              Finaliser le paiement
            </ActionButton>
          )}
        </>
      ),
    });
  };

  const openRequestDetails = (request) => {
    setModal({
      title: `Demande ${request.id}`,
      content: (
        <>
          <FieldGrid
            rows={[
              { label: "Destination souhaitée", value: request.destination },
              { label: "Date de départ", value: request.departureDate },
              { label: "Voyageurs", value: request.travelers },
              { label: "Budget", value: request.budget },
              { label: "Statut", value: request.status },
              { label: "Créée le", value: request.createdAt },
            ]}
          />
          <div className="traveler-chip-row">
            {request.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
          <p className="traveler-modal-note">{request.notes}</p>
        </>
      ),
      footer: (
        <>
          <ActionButton icon={PackageCheck} onClick={() => {
            changeSection("offers", { keepSearch: true });
            setQuery(request.id);
            setModal(null);
          }}>
            Voir les offres
          </ActionButton>
          <ActionButton icon={Eye} tone="primary" onClick={() => goToRoute(request.route)}>
            Ouvrir la demande
          </ActionButton>
        </>
      ),
    });
  };

  const openOfferDetails = (offer) => {
    setModal({
      title: `Offre ${offer.id}`,
      content: (
        <>
          <FieldGrid
            rows={[
              { label: "Agence", value: offer.agency },
              { label: "Destination", value: offer.destination },
              { label: "Prix total", value: offer.totalLabel || formatMad(offer.price) },
              { label: "Durée", value: offer.duration },
              { label: "Hôtel", value: offer.hotel },
              { label: "Transport", value: offer.transport },
              { label: "Envoyée le", value: offer.sentAt },
              { label: "Valable jusqu’au", value: offer.validUntil },
              { label: "Statut", value: offer.status },
            ]}
          />
          <div className="traveler-chip-row">
            {offer.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
          <p className="traveler-modal-note">{offer.message}</p>
        </>
      ),
      footer:
        offer.status === "Nouvelle" ? (
          <>
            <ActionButton icon={UsersRound} onClick={() => goToRoute(offer.agencyRoute)}>
              Ouvrir agence
            </ActionButton>
            <ActionButton icon={X} tone="danger" onClick={() => {
              updateOfferStatus(offer, "Refusée");
              setModal(null);
            }}>
              Refuser
            </ActionButton>
            <ActionButton icon={CheckCircle2} tone="primary" onClick={() => {
              updateOfferStatus(offer, "Acceptée");
              setModal(null);
            }}>
              Accepter
            </ActionButton>
          </>
        ) : (
          <>
            <ActionButton icon={UsersRound} onClick={() => goToRoute(offer.agencyRoute)}>
              Ouvrir agence
            </ActionButton>
            <ActionButton icon={CheckCircle2} onClick={() => setModal(null)}>
              Compris
            </ActionButton>
          </>
        ),
    });
  };

  const openReceiptDetails = (receipt) => {
    setModal({
      title: `Reçu ${receipt.id}`,
      content: (
        <FieldGrid
          rows={[
            { label: "Réservation", value: receipt.reservationId },
            { label: "Destination", value: receipt.destination },
            { label: "Date", value: receipt.date },
            { label: "Montant", value: formatMad(receipt.amount) },
            { label: "Statut", value: receipt.status },
            { label: "Adresse e-mail", value: receipt.email || profile.email },
          ]}
        />
      ),
      footer: (
        <>
          <ActionButton icon={Mail} onClick={() => notify(`Envoi du reçu ${receipt.id} préparé pour ${receipt.email || profile.email}.`)}>
            Envoyer par e-mail
          </ActionButton>
          <ActionButton icon={Download} tone="primary" onClick={() => downloadReceipt(receipt)}>
            Télécharger
          </ActionButton>
        </>
      ),
    });
  };

  const openExperienceForm = (experience) => {
    const editing = Boolean(experience);
    const formState = {
      title: experience?.title || "",
      destination: experience?.destination || "",
      preview: experience?.preview || "",
      image: experience?.image || "",
    };

    setModal({
      title: editing ? `Modifier ${experience.id}` : "Partager une expérience",
      content: (
        <ExperienceForm
          initialValues={formState}
          submitLabel={editing ? "Enregistrer les modifications" : "Publier l’expérience"}
          onSave={(values) => {
            if (editing) {
              setExperiences((items) =>
                items.map((item) =>
                  item.id === experience.id
                    ? {
                        ...item,
                        title: values.title,
                        destination: values.destination,
                        preview: values.preview,
                        image: values.image,
                      }
                    : item
                )
              );
              notify(`${experience.id} a été mise à jour.`);
            } else {
              const createdAt = Date.now();
              setExperiences((items) => [
                {
                  id: `EXP-${String(createdAt).slice(-5)}`,
                  postId: createdAt,
                  destination: values.destination,
                  image: values.image,
                  title: values.title,
                  preview: values.preview,
                  likes: 0,
                  comments: 0,
                  status: "En attente",
                  date: "Aujourd’hui",
                  route: "/experience",
                },
                ...items,
              ]);
              notify("Nouvelle expérience ajoutée dans l’interface.");
            }

            setModal(null);
          }}
        />
      ),
    });
  };

  const saveProfile = (event) => {
    event.preventDefault();
    notify("Profil voyageur mis à jour dans l’interface.");
  };

  const saveSettings = (event) => {
    event.preventDefault();
    notify("Paramètres enregistrés dans l’interface.");
  };

  const renderSearchResultsPanel = () => {
    if (!query.trim()) {
      return null;
    }

    return (
      <section className="traveler-card traveler-search-results">
        <div className="traveler-card-head">
          <div>
            <span>Recherche globale</span>
            <h2>Résultats rapides</h2>
          </div>
          <ActionButton icon={X} onClick={() => setQuery("")}>
            Effacer
          </ActionButton>
        </div>
        {searchResults.length ? (
          <div className="traveler-result-grid">
            {searchResults.map((result) => (
              <button
                type="button"
                key={`${result.section}-${result.title}`}
                onClick={() => changeSection(result.section, { keepSearch: true })}
              >
                <span>{result.label}</span>
                <strong>{result.title}</strong>
                <small>{result.detail}</small>
              </button>
            ))}
          </div>
        ) : (
          <EmptyState text={`Aucun résultat trouvé pour "${query}".`} />
        )}
      </section>
    );
  };

  const renderOverview = () => (
    <>
      <div className="traveler-stats-grid">
        {computedStats.map((stat) => (
          <article key={stat.label} className="traveler-stat-card">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.note}</small>
          </article>
        ))}
      </div>

      {renderSearchResultsPanel()}

      <section className="traveler-overview-grid">
        <article className="traveler-card traveler-next-card">
          <div className="traveler-card-head">
            <div>
              <span>Prochaine réservation</span>
              <h2>{reservations[0]?.destination || "Aucune réservation"}</h2>
            </div>
            <StatusBadge value={reservations[0]?.status || "En attente"} />
          </div>
          {reservations[0] ? (
            <>
              <div className="traveler-next-body">
                {reservations[0].image ? <img src={reservations[0].image} alt={reservations[0].destination} /> : null}
                <div>
                  <p>{reservations[0].packageTitle}</p>
                  <strong>{reservations[0].departureDate}</strong>
                  <span>{reservations[0].agency}</span>
                </div>
              </div>
              <div className="traveler-card-actions">
                <ActionButton icon={Eye} onClick={() => openReservationDetails(reservations[0])}>
                  Voir détails
                </ActionButton>
                <ActionButton icon={Download} tone="primary" onClick={() => downloadReceipt(getReservationReceipt(reservations[0]))}>
                  Télécharger le reçu
                </ActionButton>
              </div>
            </>
          ) : (
            <EmptyState text="Aucune réservation active pour le moment." />
          )}
        </article>

        <article className="traveler-card traveler-actions-card">
          <div className="traveler-card-head">
            <div>
              <span>Actions rapides</span>
              <h2>Continuer mon voyage</h2>
            </div>
          </div>
          <div className="traveler-quick-actions">
            <button type="button" onClick={() => goToRoute("/packages")}>
              <PackageCheck size={18} />
              Voir les forfaits
            </button>
            <button type="button" onClick={() => goToRoute("/create-trip")}>
              <Plus size={18} />
              Créer un voyage personnalisé
            </button>
            <button type="button" onClick={() => changeSection("reservations")}>
              <CalendarCheck size={18} />
              Suivre mes réservations
            </button>
            <button type="button" onClick={() => changeSection("offers")}>
              <ClipboardList size={18} />
              Voir mes offres
            </button>
          </div>
        </article>
      </section>

      <section className="traveler-overview-grid traveler-overview-grid-three">
        <article className="traveler-card">
          <div className="traveler-card-head">
            <div>
              <span>Offres reçues</span>
              <h2>Dernières propositions</h2>
            </div>
          </div>
          <div className="traveler-list">
            {receivedOffers.slice(0, 3).map((offer) => (
              <button type="button" key={offer.id} onClick={() => openOfferDetails(offer)}>
                <span>{offer.agency}</span>
                <strong>{offer.destination}</strong>
                <small>{formatMad(offer.price)} • {offer.status}</small>
              </button>
            ))}
          </div>
        </article>
        <article className="traveler-card">
          <div className="traveler-card-head">
            <div>
              <span>Demandes personnalisées</span>
              <h2>Dernières demandes</h2>
            </div>
          </div>
          <div className="traveler-list">
            {customRequests.slice(0, 3).map((request) => (
              <button type="button" key={request.id} onClick={() => openRequestDetails(request)}>
                <span>{request.id}</span>
                <strong>{request.destination}</strong>
                <small>{request.status} • {request.budget}</small>
              </button>
            ))}
          </div>
        </article>
        <article className="traveler-card">
          <div className="traveler-card-head">
            <div>
              <span>Activité récente</span>
              <h2>Suivi du compte</h2>
            </div>
          </div>
          <div className="traveler-timeline">
            {recentActivity.map((activity) => (
              <div key={activity.id}>
                <span />
                <div>
                  <strong>{activity.title}</strong>
                  <p>{activity.detail}</p>
                  <small>{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );

  const renderReservations = () => (
    <section className="traveler-card">
      <SectionToolbar
        filters={[
          { label: "Statut réservation", value: filterState.reservations, onChange: (value) => setFilter("reservations", value), options: filters.reservations },
          { label: "Statut paiement", value: filterState.reservationPayments, onChange: (value) => setFilter("reservationPayments", value), options: filters.reservationPayments },
        ]}
      />
      <DashboardTable
        columns={["ID réservation", "Destination", "Forfait", "Agence", "Départ", "Voyageurs", "Montant", "Réservation", "Paiement", "Actions"]}
        empty={!filteredReservations.length ? "Aucune réservation trouvée." : ""}
      >
        {filteredReservations.map((reservation) => (
          <tr key={reservation.id}>
            <td>{reservation.id}</td>
            <td>{reservation.destination}</td>
            <td>{reservation.packageTitle}</td>
            <td>{reservation.agency}</td>
            <td>{reservation.departureDate}</td>
            <td>{reservation.travelers}</td>
            <td>{formatMad(reservation.amount)}</td>
            <td><StatusBadge value={reservation.status} /></td>
            <td><StatusBadge value={reservation.paymentStatus} /></td>
            <td>
              <div className="traveler-table-actions">
                <ActionButton icon={Eye} onClick={() => openReservationDetails(reservation)}>Voir détails</ActionButton>
                <ActionButton icon={UsersRound} onClick={() => goToRoute(reservation.agencyRoute)}>Agence</ActionButton>
                {reservation.paymentStatus === "Payé" ? (
                  <ActionButton icon={Download} onClick={() => downloadReceipt(getReservationReceipt(reservation))}>Télécharger reçu</ActionButton>
                ) : (
                  <ActionButton icon={CreditCard} tone="primary" onClick={() => goToRoute(reservation.checkoutRoute)}>Payer</ActionButton>
                )}
                {reservation.status !== "Annulée" ? (
                  <ActionButton icon={X} tone="danger" onClick={() => cancelReservation(reservation)}>Annuler</ActionButton>
                ) : null}
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderRequests = () => (
    <section className="traveler-card">
      <SectionToolbar
        filters={[
          { label: "Statut", value: filterState.requests, onChange: (value) => setFilter("requests", value), options: filters.requests },
        ]}
      >
        <ActionButton icon={Plus} tone="primary" onClick={() => goToRoute("/create-trip")}>
          Créer une nouvelle demande
        </ActionButton>
      </SectionToolbar>
      <DashboardTable
        columns={["ID demande", "Destination souhaitée", "Date de départ", "Voyageurs", "Budget", "Services demandés", "Statut", "Actions"]}
        empty={!filteredRequests.length ? "Aucune demande trouvée." : ""}
      >
        {filteredRequests.map((request) => (
          <tr key={request.id}>
            <td>{request.id}</td>
            <td>{request.destination}</td>
            <td>{request.departureDate}</td>
            <td>{request.travelers}</td>
            <td>{request.budget}</td>
            <td>{request.services.join(", ") || "Aucun service"}</td>
            <td><StatusBadge value={request.status} /></td>
            <td>
              <div className="traveler-table-actions">
                <ActionButton icon={Eye} onClick={() => openRequestDetails(request)}>Voir détails</ActionButton>
                <ActionButton icon={PackageCheck} onClick={() => {
                  changeSection("offers", { keepSearch: true });
                  setQuery(request.id);
                }}>Voir offres</ActionButton>
                {request.status !== "Annulée" ? (
                  <ActionButton icon={X} tone="danger" onClick={() => cancelRequest(request)}>Annuler</ActionButton>
                ) : null}
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderOffers = () => (
    <section className="traveler-card">
      <SectionToolbar
        filters={[
          { label: "Statut", value: filterState.offers, onChange: (value) => setFilter("offers", value), options: filters.offers },
        ]}
      />
      <DashboardTable
        columns={["ID offre", "Agence", "Destination", "Prix proposé", "Durée", "Services inclus", "Date d’envoi", "Statut", "Actions"]}
        empty={!filteredOffers.length ? "Aucune offre trouvée." : ""}
      >
        {filteredOffers.map((offer) => (
          <tr key={offer.id}>
            <td>{offer.id}</td>
            <td>{offer.agency}</td>
            <td>{offer.destination}</td>
            <td>{formatMad(offer.price)}</td>
            <td>{offer.duration}</td>
            <td>{offer.services.join(", ") || "Services à confirmer"}</td>
            <td>{offer.sentAt}</td>
            <td><StatusBadge value={offer.status} /></td>
            <td>
              <div className="traveler-table-actions">
                <ActionButton icon={Eye} onClick={() => openOfferDetails(offer)}>Voir détails</ActionButton>
                <ActionButton icon={UsersRound} onClick={() => goToRoute(offer.agencyRoute)}>Agence</ActionButton>
                {offer.status === "Nouvelle" ? (
                  <>
                    <ActionButton icon={CheckCircle2} tone="primary" onClick={() => updateOfferStatus(offer, "Acceptée")}>Accepter</ActionButton>
                    <ActionButton icon={X} tone="danger" onClick={() => updateOfferStatus(offer, "Refusée")}>Refuser</ActionButton>
                  </>
                ) : null}
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderPayments = () => (
    <>
      <div className="traveler-summary-grid">
        {computedPaymentSummary.map((item) => (
          <article key={item.label} className="traveler-summary-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
      <section className="traveler-card">
        <SectionToolbar
          filters={[
            { label: "Statut", value: filterState.payments, onChange: (value) => setFilter("payments", value), options: filters.payments },
          ]}
        />
        <DashboardTable
          columns={["ID paiement", "Réservation", "Destination", "Montant", "Méthode", "Statut", "Date", "Action"]}
          empty={!filteredPayments.length ? "Aucun paiement trouvé." : ""}
        >
          {filteredPayments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.reservationId}</td>
              <td>{payment.destination}</td>
              <td>{formatMad(payment.amount)}</td>
              <td>{payment.method}</td>
              <td><StatusBadge value={payment.status} /></td>
              <td>{payment.date}</td>
              <td>
                <div className="traveler-table-actions">
                  <ActionButton icon={Eye} onClick={() => openReceiptDetails(receipts.find((receipt) => receipt.id === payment.receiptId) || getReservationReceipt({ ...payment, id: payment.reservationId, receiptId: payment.receiptId, paymentStatus: payment.status, departureDate: payment.date }))}>
                    Voir reçu
                  </ActionButton>
                  {payment.status !== "Payé" ? (
                    <ActionButton icon={CreditCard} tone="primary" onClick={() => goToRoute(payment.checkoutRoute)}>
                      Payer
                    </ActionButton>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </DashboardTable>
      </section>
    </>
  );

  const renderReceipts = () => (
    <section className="traveler-card">
      <SectionToolbar
        filters={[
          { label: "Statut", value: filterState.receipts, onChange: (value) => setFilter("receipts", value), options: filters.receipts },
        ]}
      />
      <DashboardTable
        columns={["ID reçu", "Réservation", "Destination", "Date", "Montant", "Statut", "Actions"]}
        empty={!filteredReceipts.length ? "Aucun reçu trouvé." : ""}
      >
        {filteredReceipts.map((receipt) => (
          <tr key={receipt.id}>
            <td>{receipt.id}</td>
            <td>{receipt.reservationId}</td>
            <td>{receipt.destination}</td>
            <td>{receipt.date}</td>
            <td>{formatMad(receipt.amount)}</td>
            <td><StatusBadge value={receipt.status} /></td>
            <td>
              <div className="traveler-table-actions">
                <ActionButton icon={Download} tone="primary" onClick={() => downloadReceipt(receipt)}>Télécharger</ActionButton>
                <ActionButton icon={Mail} onClick={() => notify(`Envoi du reçu ${receipt.id} préparé pour ${receipt.email}.`)}>Envoyer par e-mail</ActionButton>
                <ActionButton icon={Eye} onClick={() => openReceiptDetails(receipt)}>Voir</ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderExperiences = () => (
    <section className="traveler-card">
      <SectionToolbar
        filters={[
          { label: "Statut", value: filterState.experiences, onChange: (value) => setFilter("experiences", value), options: filters.experiences },
        ]}
      >
        <ActionButton icon={Plus} tone="primary" onClick={() => openExperienceForm(null)}>
          Partager une expérience
        </ActionButton>
      </SectionToolbar>
      <div className="traveler-experience-grid">
        {filteredExperiences.map((experience) => (
          <article key={experience.id} className="traveler-experience-card">
            {experience.image ? <img src={experience.image} alt={experience.title} /> : null}
            <div>
              <div className="traveler-experience-head">
                <span>{experience.destination}</span>
                <StatusBadge value={experience.status} />
              </div>
              <h3>{experience.title}</h3>
              <p>{experience.preview}</p>
              <div className="traveler-experience-meta">
                <span>{experience.likes} likes</span>
                <span>{experience.comments} commentaires</span>
                <span>{experience.date}</span>
              </div>
              <div className="traveler-table-actions">
                <ActionButton icon={Eye} onClick={() => goToRoute(experience.route)}>Voir</ActionButton>
                <ActionButton icon={Pencil} onClick={() => openExperienceForm(experience)}>Modifier</ActionButton>
                <ActionButton icon={Trash2} tone="danger" onClick={() => deleteExperience(experience)}>Supprimer</ActionButton>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!filteredExperiences.length ? <EmptyState text="Aucune expérience trouvée." /> : null}
    </section>
  );

  const renderNotifications = () => (
    <section className="traveler-card">
      <SectionToolbar
        filters={[
          { label: "Statut", value: filterState.notifications, onChange: (value) => setFilter("notifications", value), options: filters.notifications },
        ]}
      />
      <DashboardTable
        columns={["Titre", "Type", "Message", "Date", "Statut", "Actions"]}
        empty={!filteredNotifications.length ? "Aucune notification trouvée." : ""}
      >
        {filteredNotifications.map((notification) => (
          <tr key={notification.id}>
            <td>{notification.title}</td>
            <td>{notification.type}</td>
            <td className="traveler-preview-cell">{notification.message}</td>
            <td>{notification.date}</td>
            <td><StatusBadge value={notification.status} /></td>
            <td>
              <div className="traveler-table-actions">
                <ActionButton icon={CheckCircle2} onClick={() => markNotificationAsRead(notification)}>Marquer comme lu</ActionButton>
                <ActionButton icon={Trash2} tone="danger" onClick={() => deleteNotification(notification)}>Supprimer</ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderProfile = () => (
    <form className="traveler-card traveler-form-card" onSubmit={saveProfile}>
      <div className="traveler-profile-panel">
        <img src={profile.avatar} alt={profile.name} />
        <div>
          <span>Voyageur NextTrip</span>
          <h2>{profile.name}</h2>
          <p>{profile.status}</p>
        </div>
      </div>
      <div className="traveler-form-grid">
        <label>
          <span>Nom complet</span>
          <input value={profile.name} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} />
        </label>
        <label>
          <span>E-mail</span>
          <input type="email" value={profile.email} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} />
        </label>
        <label>
          <span>Téléphone</span>
          <input value={profile.phone} onChange={(event) => setProfile((current) => ({ ...current, phone: event.target.value }))} />
        </label>
        <label>
          <span>Ville</span>
          <input value={profile.city} onChange={(event) => setProfile((current) => ({ ...current, city: event.target.value }))} />
        </label>
        <label>
          <span>Pays</span>
          <input value={profile.country} onChange={(event) => setProfile((current) => ({ ...current, country: event.target.value }))} />
        </label>
        <label>
          <span>Date d’inscription</span>
          <input value={profile.memberSince} onChange={(event) => setProfile((current) => ({ ...current, memberSince: event.target.value }))} />
        </label>
      </div>
      <div className="traveler-preferences-grid">
        {profile.preferences.map((preference) => (
          <div key={preference.label}>
            <span>{preference.label}</span>
            <strong>{preference.value}</strong>
          </div>
        ))}
      </div>
      <button type="submit" className="primary-btn">
        <Save size={16} />
        Modifier le profil
      </button>
    </form>
  );

  const renderSettings = () => (
    <form className="traveler-card traveler-form-card" onSubmit={saveSettings}>
      <div className="traveler-form-grid">
        <label>
          <span>Langue</span>
          <select value={settings.language} onChange={(event) => setSettings((current) => ({ ...current, language: event.target.value }))}>
            <option>Français</option>
            <option>Anglais</option>
            <option>Arabe</option>
          </select>
        </label>
        <label>
          <span>Thème</span>
          <select value={settings.theme} onChange={(event) => setSettings((current) => ({ ...current, theme: event.target.value }))}>
            <option>Clair</option>
            <option>Sombre</option>
          </select>
        </label>
        <label>
          <span>Niveau de sécurité</span>
          <input value={settings.securityLevel} onChange={(event) => setSettings((current) => ({ ...current, securityLevel: event.target.value }))} />
        </label>
        <label>
          <span>Support</span>
          <input value={settings.supportEmail} onChange={(event) => setSettings((current) => ({ ...current, supportEmail: event.target.value }))} />
        </label>
      </div>
      <div className="traveler-settings-list">
        {[
          ["emailNotifications", "Recevoir les notifications par e-mail"],
          ["smsNotifications", "Recevoir les alertes par SMS"],
          ["bookingAlerts", "Alertes de réservation"],
          ["offerAlerts", "Alertes d’offres d’agence"],
        ].map(([key, label]) => (
          <label key={key} className="traveler-toggle-row">
            <span>{label}</span>
            <input
              type="checkbox"
              checked={Boolean(settings[key])}
              onChange={(event) => setSettings((current) => ({ ...current, [key]: event.target.checked }))}
            />
          </label>
        ))}
      </div>
      <button type="submit" className="primary-btn">
        <Save size={16} />
        Enregistrer les paramètres
      </button>
    </form>
  );

  const renderSection = () => {
    const sections = {
      overview: renderOverview,
      reservations: renderReservations,
      requests: renderRequests,
      offers: renderOffers,
      payments: renderPayments,
      receipts: renderReceipts,
      experiences: renderExperiences,
      notifications: renderNotifications,
      profile: renderProfile,
      settings: renderSettings,
    };

    return (sections[activeSection] || renderOverview)();
  };

  return (
    <div className="traveler-dashboard-page">
      <div className="traveler-dashboard-layout">
        <aside className={`traveler-sidebar ${isSidebarOpen ? "traveler-sidebar-open" : ""}`}>
          <div className="traveler-sidebar-brand">
            <img src={nextTripLogo} alt="NextTrip" />
            <div>
              <strong>NextTrip</strong>
              <span>Espace voyageur</span>
            </div>
          </div>
          <nav aria-label="Navigation espace voyageur">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`traveler-sidebar-link ${activeSection === item.key ? "active" : ""}`}
                  onClick={() => changeSection(item.key)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button type="button" className="traveler-sidebar-link traveler-sidebar-logout" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
          </nav>
        </aside>

        <main className="traveler-main">
          <header className="traveler-header">
            <div className="traveler-header-copy">
              <span>{currentCopy.eyebrow}</span>
              <h1>{currentCopy.title}</h1>
              <p>{currentCopy.description}</p>
            </div>
            <div className="traveler-header-actions">
              <button type="button" className="traveler-menu-btn" aria-label="Ouvrir le menu" onClick={() => setIsSidebarOpen(true)}>
                <Menu size={20} />
              </button>
              <label className="traveler-search">
                <Search size={18} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={currentCopy.search} />
              </label>
              <div className="traveler-notification-wrap">
                <button
                  type="button"
                  className="traveler-icon-btn traveler-notification-btn"
                  aria-label="Notifications"
                  onClick={() => setIsNotificationsOpen((current) => !current)}
                >
                  <Bell size={18} />
                  {unreadCount ? <span>{unreadCount}</span> : null}
                </button>
                {isNotificationsOpen ? (
                  <div className="traveler-notification-panel">
                    <strong>Notifications récentes</strong>
                    {notifications.slice(0, 4).map((notification) => (
                      <button key={notification.id} type="button" onClick={() => {
                        changeSection("notifications");
                        setIsNotificationsOpen(false);
                      }}>
                        <span>{notification.type}</span>
                        <p>{notification.title}</p>
                        <small>{notification.date}</small>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <button type="button" className="traveler-profile-pill" onClick={() => changeSection("profile")}>
                <img src={profile.avatar} alt={profile.name} />
                <span>{profile.name}</span>
              </button>
            </div>
          </header>

          <section className="traveler-content">
            {["profile", "settings"].includes(activeSection) ? renderSearchResultsPanel() : null}
            {renderSection()}
          </section>
        </main>
      </div>

      {isSidebarOpen ? <button type="button" className="traveler-sidebar-backdrop" aria-label="Fermer le menu" onClick={() => setIsSidebarOpen(false)} /> : null}
      {modal ? (
        <Modal title={modal.title} onClose={() => setModal(null)} footer={modal.footer}>
          {modal.content}
        </Modal>
      ) : null}
      {toast ? <div className="traveler-toast">{toast}</div> : null}
    </div>
  );
}

function ExperienceForm({ initialValues, onSave, submitLabel }) {
  const [form, setForm] = useState(initialValues);
  const canSubmit = form.title.trim() && form.destination.trim() && form.preview.trim();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    onSave({
      ...form,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    });
  };

  return (
    <form className="traveler-form-grid traveler-modal-form" onSubmit={handleSubmit}>
      <label>
        <span>Titre</span>
        <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
      </label>
      <label>
        <span>Destination</span>
        <input value={form.destination} onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))} />
      </label>
      <label className="traveler-full-field">
        <span>Lien de l’image</span>
        <input value={form.image} onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))} />
      </label>
      <label className="traveler-full-field">
        <span>Récit</span>
        <textarea rows="4" value={form.preview} onChange={(event) => setForm((current) => ({ ...current, preview: event.target.value }))} />
      </label>
      <button type="submit" className="primary-btn" disabled={!canSubmit}>
        <Save size={16} />
        {submitLabel}
      </button>
    </form>
  );
}
