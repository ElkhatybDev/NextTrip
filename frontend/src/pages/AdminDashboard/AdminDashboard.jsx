import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Ban,
  Bell,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Download,
  Eye,
  LayoutDashboard,
  LogOut,
  MapPin,
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
import { clearAuthSession } from "../../utils/authSession";
import {
  adminProfile,
  agenciesData,
  bookingsData,
  customRequestsData,
  destinationsData,
  experiencesData,
  formatMad,
  initialPlatformSettings,
  notificationsData,
  overviewStats,
  packagesData,
  paymentStats,
  paymentsData,
  recentAgencyActivity,
  revenueSummary,
  usersData,
} from "../../data/adminDashboardData";
import "./AdminDashboard.css";

const sidebarItems = [
  { key: "overview", label: "Tableau de bord", icon: LayoutDashboard },
  { key: "users", label: "Utilisateurs", icon: UsersRound },
  { key: "agencies", label: "Agences", icon: Building2 },
  { key: "packages", label: "Forfaits", icon: PackageCheck },
  { key: "destinations", label: "Destinations", icon: MapPin },
  { key: "bookings", label: "Réservations", icon: CalendarCheck },
  { key: "payments", label: "Paiements", icon: CreditCard },
  { key: "requests", label: "Demandes personnalisées", icon: ClipboardList },
  { key: "experiences", label: "Expériences", icon: MessageSquareText },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "settings", label: "Paramètres", icon: Settings },
];

const pageCopy = {
  overview: {
    eyebrow: "Administration NextTrip",
    title: "Vue d’ensemble de la plateforme",
    description:
      "Suivez les utilisateurs, agences, réservations, paiements et demandes personnalisées depuis un espace clair.",
    search: "Rechercher dans le tableau de bord...",
  },
  users: {
    eyebrow: "Gestion des comptes",
    title: "Utilisateurs",
    description: "Consultez les comptes clients, agences et administrateurs.",
    search: "Rechercher un utilisateur...",
  },
  agencies: {
    eyebrow: "Partenaires",
    title: "Agences",
    description: "Validez les agences, surveillez leur état et leurs offres.",
    search: "Rechercher une agence...",
  },
  packages: {
    eyebrow: "Catalogue",
    title: "Forfaits",
    description: "Gérez les forfaits et les offres visibles sur NextTrip.",
    search: "Rechercher un forfait...",
  },
  destinations: {
    eyebrow: "Catalogue voyage",
    title: "Destinations",
    description: "Organisez les villes, pays et destinations disponibles.",
    search: "Rechercher une destination...",
  },
  bookings: {
    eyebrow: "Opérations",
    title: "Réservations",
    description: "Suivez les réservations, les statuts et les paiements associés.",
    search: "Rechercher une réservation...",
  },
  payments: {
    eyebrow: "Finance",
    title: "Paiements",
    description: "Contrôlez les paiements, reçus, remboursements et montants en attente.",
    search: "Rechercher un paiement...",
  },
  requests: {
    eyebrow: "Voyages sur mesure",
    title: "Demandes personnalisées",
    description: "Affectez les demandes aux agences et suivez les offres reçues.",
    search: "Rechercher une demande...",
  },
  experiences: {
    eyebrow: "Communauté",
    title: "Expériences",
    description: "Modérez les avis et récits publiés par les voyageurs.",
    search: "Rechercher une expérience...",
  },
  notifications: {
    eyebrow: "Centre d’alertes",
    title: "Notifications",
    description: "Consultez et traitez les alertes importantes de la plateforme.",
    search: "Rechercher une notification...",
  },
  settings: {
    eyebrow: "Configuration",
    title: "Paramètres",
    description: "Mettez à jour le profil admin et les préférences générales.",
    search: "Rechercher un paramètre...",
  },
};

const statusTone = {
  Actif: "green",
  Bloqué: "red",
  "En attente": "orange",
  Approuvé: "green",
  Suspendu: "red",
  Confirmé: "green",
  Annulé: "red",
  Terminé: "blue",
  Payé: "green",
  Échoué: "red",
  Remboursé: "blue",
  Publié: "green",
  Masqué: "orange",
  Signalé: "red",
  Lu: "blue",
  "Non lu": "orange",
  Nouveau: "orange",
  Envoyé: "blue",
  "Offre reçue": "green",
};

const statusFilters = {
  users: ["Tous", "Actif", "Bloqué"],
  agencies: ["Tous", "En attente", "Approuvé", "Suspendu"],
  packages: ["Tous", "Publié", "En attente", "Masqué"],
  destinations: ["Tous", "Actif", "En attente", "Masqué"],
  bookings: ["Tous", "En attente", "Confirmé", "Annulé", "Terminé"],
  payments: ["Tous", "Payé", "En attente", "Échoué", "Remboursé"],
  requests: ["Tous", "Nouveau", "Envoyé", "Offre reçue", "Confirmé", "Annulé"],
  experiences: ["Tous", "Publié", "Masqué", "Signalé"],
  notifications: ["Tous", "Lu", "Non lu"],
};

const bookingPaymentFilters = ["Tous", "Payé", "En attente", "Échoué", "Remboursé"];

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

function filterByStatus(items, status, key = "status") {
  if (!status || status === "Tous") {
    return items;
  }

  return items.filter((item) => item[key] === status);
}

function StatusBadge({ value }) {
  const tone = statusTone[value] || "neutral";

  return <span className={`status-badge status-badge-${tone}`}>{value}</span>;
}

function EmptyState({ text = "Aucun résultat trouvé." }) {
  return <div className="dashboard-empty-state">{text}</div>;
}

function ActionButton({ children, icon: Icon, tone = "secondary", ...props }) {
  return (
    <button type="button" className={`action-btn action-btn-${tone}`} {...props}>
      {Icon ? <Icon size={15} /> : null}
      <span>{children}</span>
    </button>
  );
}

function DashboardTable({ columns, children, empty }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
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

function GlobalSearchResults({ query, results, onOpenSection }) {
  if (!query.trim()) {
    return null;
  }

  const visibleGroups = results.filter((group) => group.items.length);
  const totalResults = visibleGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section className="dashboard-card dashboard-search-results">
      <SectionHeader
        title="Résultats de recherche"
        description={
          totalResults
            ? `${totalResults} résultat${totalResults > 1 ? "s" : ""} trouvé${totalResults > 1 ? "s" : ""} pour “${query}”.`
            : `Aucun résultat trouvé pour “${query}”.`
        }
      />

      {totalResults ? (
        <div className="dashboard-search-results-grid">
          {visibleGroups.map((group) => (
            <article key={group.section}>
              <div className="dashboard-search-results-head">
                <span>{group.label}</span>
                <strong>{group.items.length}</strong>
              </div>
              <div className="dashboard-search-result-list">
                {group.items.slice(0, 4).map((item) => (
                  <button
                    type="button"
                    key={`${group.section}-${item.id}`}
                    onClick={() => onOpenSection(group.section)}
                  >
                    <strong>{item.title}</strong>
                    <span>{item.meta}</span>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState text="Essayez un nom, une ville, une agence, une réservation, un paiement ou un statut." />
      )}
    </section>
  );
}

function SectionHeader({ title, description, action }) {
  return (
    <div className="dashboard-section-header">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

function Toolbar({ query, onQueryChange, placeholder, filters = [] }) {
  return (
    <div className="dashboard-toolbar">
      <label className="dashboard-search">
        <Search size={17} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
        />
      </label>
      {filters.map((filter) => (
        <label key={filter.label} className="dashboard-filter">
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
  );
}

function PackageDestinationModal({ modal, draft, onChange, onClose, onSubmit }) {
  if (!modal) {
    return null;
  }

  const isPackage = modal.type === "package";

  return (
    <div className="dashboard-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="dashboard-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dashboard-modal-header">
          <div>
            <p>{isPackage ? "Gestion du forfait" : "Gestion de la destination"}</p>
            <h2 id="dashboard-modal-title">
              {modal.mode === "edit" ? "Modifier" : "Ajouter"}{" "}
              {isPackage ? "un forfait" : "une destination"}
            </h2>
          </div>
          <button type="button" aria-label="Fermer la fenêtre" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="dashboard-modal-form" onSubmit={onSubmit}>
          {isPackage ? (
            <>
              <label>
                <span>Titre du forfait</span>
                <input
                  value={draft.title || ""}
                  onChange={(event) => onChange("title", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Destination</span>
                <input
                  value={draft.destination || ""}
                  onChange={(event) => onChange("destination", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Prix en MAD</span>
                <input
                  type="number"
                  min="0"
                  value={draft.price || ""}
                  onChange={(event) => onChange("price", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Durée</span>
                <input
                  value={draft.duration || ""}
                  onChange={(event) => onChange("duration", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Agence</span>
                <input
                  value={draft.agency || ""}
                  onChange={(event) => onChange("agency", event.target.value)}
                />
              </label>
            </>
          ) : (
            <>
              <label>
                <span>Nom de la destination</span>
                <input
                  value={draft.name || ""}
                  onChange={(event) => onChange("name", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Pays</span>
                <input
                  value={draft.country || ""}
                  onChange={(event) => onChange("country", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Ville</span>
                <input
                  value={draft.city || ""}
                  onChange={(event) => onChange("city", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Nombre de forfaits</span>
                <input
                  type="number"
                  min="0"
                  value={draft.packages || ""}
                  onChange={(event) => onChange("packages", event.target.value)}
                  required
                />
              </label>
            </>
          )}

          <label>
            <span>Statut</span>
            <select value={draft.status || "En attente"} onChange={(event) => onChange("status", event.target.value)}>
              {(isPackage ? statusFilters.packages : statusFilters.destinations).filter((item) => item !== "Tous").map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className="dashboard-modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="primary-btn">
              <Save size={16} />
              Enregistrer
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function formatDetailValue(value) {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "Non renseigné";
  }

  if (value === null || value === undefined || value === "") {
    return "Non renseigné";
  }

  return String(value);
}

function DetailModal({ detail, onClose, onNavigate }) {
  if (!detail) {
    return null;
  }

  return (
    <div className="dashboard-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="dashboard-modal dashboard-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dashboard-modal-header">
          <div>
            <p>{detail.eyebrow || "Détails NextTrip"}</p>
            <h2 id="dashboard-detail-title">{detail.title}</h2>
          </div>
          <button type="button" aria-label="Fermer la fenêtre" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="dashboard-detail-grid">
          {detail.fields.map((field) => (
            <article key={field.label}>
              <span>{field.label}</span>
              <strong>{formatDetailValue(field.value)}</strong>
            </article>
          ))}
        </div>

        <div className="dashboard-modal-actions">
          {detail.route ? (
            <button type="button" className="primary-btn" onClick={() => onNavigate(detail.route)}>
              <Eye size={16} />
              Ouvrir la page liée
            </button>
          ) : null}
          <button type="button" className="secondary-btn" onClick={onClose}>
            Fermer
          </button>
        </div>
      </section>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [filters, setFilters] = useState({
    users: "Tous",
    agencies: "Tous",
    packages: "Tous",
    destinations: "Tous",
    bookings: "Tous",
    bookingPayment: "Tous",
    payments: "Tous",
    requests: "Tous",
    experiences: "Tous",
    notifications: "Tous",
  });
  const [users, setUsers] = useState(usersData);
  const [agencies, setAgencies] = useState(agenciesData);
  const [packages, setPackages] = useState(packagesData);
  const [destinations, setDestinations] = useState(destinationsData);
  const [bookings, setBookings] = useState(bookingsData);
  const payments = paymentsData;
  const [customRequests, setCustomRequests] = useState(customRequestsData);
  const [experiences, setExperiences] = useState(experiencesData);
  const [notifications, setNotifications] = useState(notificationsData);
  const [settingsDraft, setSettingsDraft] = useState(() => {
    try {
      const savedSettings = window.localStorage.getItem("nexttrip_admin_settings");

      return savedSettings ? { ...initialPlatformSettings, ...JSON.parse(savedSettings) } : initialPlatformSettings;
    } catch {
      return initialPlatformSettings;
    }
  });
  const [modal, setModal] = useState(null);
  const [formDraft, setFormDraft] = useState({});
  const [detailModal, setDetailModal] = useState(null);

  const page = pageCopy[activeSection] || pageCopy.overview;
  const unreadNotifications = notifications.filter((item) => item.status === "Non lu").length;

  useEffect(() => {
    if (!showNotifications) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNotifications]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => {
      setToast((current) => (current === message ? "" : current));
    }, 2400);
  };

  const navigateToRoute = (route) => {
    if (!route) {
      return;
    }

    setDetailModal(null);
    navigate(route);
  };

  const openDetails = (title, fields, route = "") => {
    setDetailModal({
      title,
      route,
      fields: fields.filter((field) => field.value !== undefined),
    });
  };

  const openSection = (section, nextQuery = "") => {
    setActiveSection(section);
    setQuery(nextQuery);
    setShowNotifications(false);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const confirmDelete = (setItems, id, label) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer ${label} ?`)) {
      return;
    }

    setItems((items) => items.filter((item) => item.id !== id));
    notify("Élément supprimé.");
  };

  const updateItem = (setItems, id, patch) => {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const updateItemWithToast = (setItems, id, patch, message) => {
    updateItem(setItems, id, patch);
    notify(message);
  };

  const assignAgencyToRequest = (request) => {
    const assignedNames = new Set(request.agencies || []);
    const nextAgency =
      agencies.find((agency) => !assignedNames.has(agency.name) && agency.status !== "Suspendu") ||
      agencies.find((agency) => agency.status !== "Suspendu") ||
      agencies[0];

    if (!nextAgency) {
      notify("Aucune agence disponible pour cette demande.");
      return;
    }

    setCustomRequests((items) =>
      items.map((item) =>
        item.id === request.id
          ? {
              ...item,
              agencies: Array.from(new Set([...(item.agencies || []), nextAgency.name])),
              status: item.status === "Nouveau" ? "Envoyé" : item.status,
            }
          : item
      )
    );
    notify(`${nextAgency.name} a été assignée à ${request.id}.`);
  };

  const downloadReceipt = (payment) => {
    const relatedBooking = bookings.find((booking) => booking.id === payment.booking);
    const lines = [
      "NextTrip - Reçu de paiement",
      `Paiement: ${payment.id}`,
      `Réservation: ${payment.booking}`,
      `Client: ${payment.client}`,
      relatedBooking ? `Voyage: ${relatedBooking.packageName}` : null,
      relatedBooking ? `Destination: ${relatedBooking.destination}` : null,
      `Montant: ${formatMad(payment.amount)}`,
      `Méthode: ${payment.method}`,
      `Statut: ${payment.status}`,
      `Date: ${payment.date}`,
    ].filter(Boolean);
    const receiptBlob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const receiptUrl = URL.createObjectURL(receiptBlob);
    const receiptLink = document.createElement("a");

    receiptLink.href = receiptUrl;
    receiptLink.download = `${payment.id}-nexttrip-recu.txt`;
    document.body.appendChild(receiptLink);
    receiptLink.click();
    receiptLink.remove();
    URL.revokeObjectURL(receiptUrl);
    notify(`Reçu téléchargé pour ${payment.id}.`);
  };

  const saveSettings = () => {
    try {
      window.localStorage.setItem("nexttrip_admin_settings", JSON.stringify(settingsDraft));
      notify("Paramètres enregistrés localement.");
    } catch {
      notify("Les paramètres sont enregistrés pour cette session.");
    }
  };

  const openModal = (type, mode, item = null) => {
    setModal({ type, mode });
    setFormDraft(
      item || {
        id: "",
        title: "",
        destination: "",
        price: "",
        duration: "",
        agency: "",
        name: "",
        country: "",
        city: "",
        packages: "",
        status: "En attente",
      }
    );
  };

  const submitModal = (event) => {
    event.preventDefault();

    if (modal.type === "package") {
      const nextPackage = {
        id: formDraft.id || `PKG-${Date.now()}`,
        catalogId: formDraft.catalogId,
        title: formDraft.title,
        destination: formDraft.destination,
        price: Number(formDraft.price) || 0,
        duration: formDraft.duration,
        status: formDraft.status || "En attente",
        agency: formDraft.agency || "Agence NextTrip",
        type: formDraft.type || "Forfait",
        category: formDraft.category || "Forfait",
        rating: formDraft.rating,
        route: formDraft.route,
      };

      setPackages((items) =>
        modal.mode === "edit"
          ? items.map((item) => (item.id === nextPackage.id ? nextPackage : item))
          : [nextPackage, ...items]
      );
    }

    if (modal.type === "destination") {
      const nextDestination = {
        id: formDraft.id || `DST-${Date.now()}`,
        name: formDraft.name,
        country: formDraft.country,
        city: formDraft.city,
        packages: Number(formDraft.packages) || 0,
        status: formDraft.status || "En attente",
        route: formDraft.route || "/destinations",
      };

      setDestinations((items) =>
        modal.mode === "edit"
          ? items.map((item) => (item.id === nextDestination.id ? nextDestination : item))
          : [nextDestination, ...items]
      );
    }

    setModal(null);
    setFormDraft({});
    notify("Modifications enregistrées.");
  };

  const filteredUsers = useMemo(
    () =>
      filterByStatus(
        users.filter((item) => matchesSearch(item, ["name", "email", "role", "status"], query)),
        filters.users
      ),
    [filters.users, query, users]
  );

  const filteredAgencies = useMemo(
    () =>
      filterByStatus(
        agencies.filter((item) => matchesSearch(item, ["name", "email", "phone", "status", "location"], query)),
        filters.agencies
      ),
    [agencies, filters.agencies, query]
  );

  const filteredPackages = useMemo(
    () =>
      filterByStatus(
        packages.filter((item) => matchesSearch(item, ["title", "destination", "duration", "status", "agency"], query)),
        filters.packages
      ),
    [filters.packages, packages, query]
  );

  const filteredDestinations = useMemo(
    () =>
      filterByStatus(
        destinations.filter((item) => matchesSearch(item, ["name", "country", "city", "status"], query)),
        filters.destinations
      ),
    [destinations, filters.destinations, query]
  );

  const filteredBookings = useMemo(() => {
    const searched = bookings.filter((item) =>
      matchesSearch(item, ["id", "client", "packageName", "destination", "agency", "bookingStatus", "paymentStatus"], query)
    );
    const byStatus = filterByStatus(searched, filters.bookings, "bookingStatus");

    return filterByStatus(byStatus, filters.bookingPayment, "paymentStatus");
  }, [bookings, filters.bookingPayment, filters.bookings, query]);

  const filteredPayments = useMemo(
    () =>
      filterByStatus(
        payments.filter((item) => matchesSearch(item, ["id", "client", "booking", "method", "status"], query)),
        filters.payments
      ),
    [filters.payments, payments, query]
  );

  const filteredRequests = useMemo(
    () =>
      filterByStatus(
        customRequests.filter((item) =>
          matchesSearch(item, ["id", "client", "destination", "travelers", "budget", "status"], query)
        ),
        filters.requests
      ),
    [customRequests, filters.requests, query]
  );

  const filteredExperiences = useMemo(
    () =>
      filterByStatus(
        experiences.filter((item) => matchesSearch(item, ["author", "destination", "preview", "status"], query)),
        filters.experiences
      ),
    [experiences, filters.experiences, query]
  );

  const filteredNotifications = useMemo(
    () =>
      filterByStatus(
        notifications.filter((item) => matchesSearch(item, ["title", "type", "message", "status"], query)),
        filters.notifications
      ),
    [filters.notifications, notifications, query]
  );

  const dashboardSearchResults = useMemo(() => {
    const searchGroups = [
      {
        section: "users",
        label: "Utilisateurs",
        fields: ["name", "email", "role", "status", "source"],
        source: users,
        mapItem: (item) => ({
          id: item.id,
          title: item.name,
          meta: `${item.email} · ${item.role} · ${item.status}`,
        }),
      },
      {
        section: "agencies",
        label: "Agences",
        fields: ["name", "email", "phone", "status", "location", "specialties"],
        source: agencies,
        mapItem: (item) => ({
          id: item.id,
          title: item.name,
          meta: `${item.location} · ${item.offers} offre${item.offers > 1 ? "s" : ""} · ${item.status}`,
        }),
      },
      {
        section: "packages",
        label: "Forfaits",
        fields: ["title", "destination", "duration", "status", "agency", "category", "type"],
        source: packages,
        mapItem: (item) => ({
          id: item.id,
          title: item.title,
          meta: `${item.destination} · ${item.agency} · ${formatMad(item.price)}`,
        }),
      },
      {
        section: "destinations",
        label: "Destinations",
        fields: ["name", "country", "city", "status"],
        source: destinations,
        mapItem: (item) => ({
          id: item.id,
          title: item.name,
          meta: `${item.city}, ${item.country} · ${item.packages} forfaits`,
        }),
      },
      {
        section: "bookings",
        label: "Réservations",
        fields: ["id", "client", "packageName", "destination", "agency", "bookingStatus", "paymentStatus"],
        source: bookings,
        mapItem: (item) => ({
          id: item.id,
          title: item.id,
          meta: `${item.client} · ${item.packageName} · ${item.bookingStatus}`,
        }),
      },
      {
        section: "payments",
        label: "Paiements",
        fields: ["id", "client", "booking", "method", "status"],
        source: payments,
        mapItem: (item) => ({
          id: item.id,
          title: item.id,
          meta: `${item.client} · ${formatMad(item.amount)} · ${item.status}`,
        }),
      },
      {
        section: "requests",
        label: "Demandes personnalisées",
        fields: ["id", "title", "client", "destination", "travelers", "budget", "status"],
        source: customRequests,
        mapItem: (item) => ({
          id: item.id,
          title: item.id,
          meta: `${item.destination} · ${item.client} · ${item.status}`,
        }),
      },
      {
        section: "experiences",
        label: "Expériences",
        fields: ["id", "author", "destination", "preview", "status"],
        source: experiences,
        mapItem: (item) => ({
          id: item.id,
          title: item.destination,
          meta: `${item.author} · ${item.status}`,
        }),
      },
      {
        section: "notifications",
        label: "Notifications",
        fields: ["title", "type", "message", "status"],
        source: notifications,
        mapItem: (item) => ({
          id: item.id,
          title: item.title,
          meta: `${item.type} · ${item.status}`,
        }),
      },
    ];

    return searchGroups.map((group) => ({
      ...group,
      items: group.source
        .filter((item) => matchesSearch(item, group.fields, query))
        .map(group.mapItem),
    }));
  }, [agencies, bookings, customRequests, destinations, experiences, notifications, packages, payments, query, users]);

  const revenueCards = useMemo(
    () => [
      { label: "Total payé", value: paymentStats.totalPaid, note: "Paiements confirmés", tone: "green" },
      { label: "Montant en attente", value: paymentStats.pendingAmount, note: "À vérifier", tone: "orange" },
      { label: "Paiements échoués", value: paymentStats.failedCount, note: "À relancer", tone: "red" },
    ],
    []
  );

  const renderOverview = () => (
    <div className="dashboard-content-grid">
      <section className="stats-grid stats-grid-overview">
        {overviewStats.map((stat) => (
          <article key={stat.label} className={`stat-card stat-card-${stat.tone}`}>
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
            <span>{stat.note}</span>
          </article>
        ))}
      </section>

      <section className="dashboard-card revenue-card">
        <SectionHeader
          title="Résumé des revenus"
          description="Vue rapide des réservations et des montants suivis."
        />
        <div className="revenue-main">
          <div>
            <span>Revenu total</span>
            <strong>{revenueSummary.total}</strong>
            <p>
              Payé : {revenueSummary.paid} · En attente : {revenueSummary.pending}
            </p>
          </div>
          <div className="revenue-bars" aria-label="Résumé visuel des revenus">
            {revenueSummary.bars.map((height, index) => (
              <span key={index} style={{ height: `${height}px` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-card">
        <SectionHeader title="Réservations récentes" />
        <DashboardTable
          columns={["Réservation", "Client", "Destination", "Montant", "Statut"]}
          empty={!bookings.length ? "Aucune réservation disponible." : ""}
        >
          {bookings.slice(0, 5).map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.client}</td>
              <td>{booking.destination}</td>
              <td>{formatMad(booking.amount)}</td>
              <td><StatusBadge value={booking.bookingStatus} /></td>
            </tr>
          ))}
        </DashboardTable>
      </section>

      <section className="dashboard-card">
        <SectionHeader title="Dernières demandes personnalisées" />
        <div className="request-list">
          {customRequests.slice(0, 4).map((request) => (
            <article key={request.id}>
              <div>
                <strong>{request.destination}</strong>
                <span>{request.id} · {request.travelers}</span>
              </div>
              <StatusBadge value={request.status} />
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-card dashboard-wide-card">
        <SectionHeader title="Activité récente des agences" />
        <div className="activity-list">
          {recentAgencyActivity.map((activity) => (
            <article key={activity.id}>
              <Building2 size={18} />
              <div>
                <strong>{activity.agency}</strong>
                <p>{activity.activity}</p>
              </div>
              <span>{activity.date}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );

  const renderUsers = () => (
    <section className="dashboard-card">
      <SectionHeader title="Gestion des utilisateurs" />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        placeholder={page.search}
        filters={[{ label: "Statut", value: filters.users, onChange: (value) => setFilter("users", value), options: statusFilters.users }]}
      />
      <DashboardTable
        columns={["Nom", "Email", "Rôle", "Statut", "Date d’inscription", "Actions"]}
        empty={!filteredUsers.length ? "Aucun utilisateur trouvé." : ""}
      >
        {filteredUsers.map((user) => (
          <tr key={user.id}>
            <td><strong>{user.name}</strong></td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td><StatusBadge value={user.status} /></td>
            <td>{user.joinDate}</td>
            <td>
              <div className="table-actions">
                <ActionButton
                  icon={Eye}
                  onClick={() =>
                    user.route
                      ? navigateToRoute(user.route)
                      : openDetails(user.name, [
                          { label: "Identifiant", value: user.id },
                          { label: "Email", value: user.email },
                          { label: "Rôle", value: user.role },
                          { label: "Statut", value: user.status },
                          { label: "Date d’inscription", value: user.joinDate },
                          { label: "Source", value: user.source },
                        ])
                  }
                >
                  Voir
                </ActionButton>
                <ActionButton
                  icon={Ban}
                  tone={user.status === "Bloqué" ? "primary" : "warning"}
                  onClick={() =>
                    updateItemWithToast(
                      setUsers,
                      user.id,
                      { status: user.status === "Bloqué" ? "Actif" : "Bloqué" },
                      user.status === "Bloqué" ? `${user.name} est actif.` : `${user.name} est bloqué.`
                    )
                  }
                >
                  {user.status === "Bloqué" ? "Activer" : "Bloquer"}
                </ActionButton>
                <ActionButton icon={Trash2} tone="danger" onClick={() => confirmDelete(setUsers, user.id, user.name)}>
                  Supprimer
                </ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderAgencies = () => (
    <section className="dashboard-card">
      <SectionHeader title="Gestion des agences" />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        placeholder={page.search}
        filters={[{ label: "Statut", value: filters.agencies, onChange: (value) => setFilter("agencies", value), options: statusFilters.agencies }]}
      />
      <DashboardTable
        columns={["Agence", "Email", "Téléphone", "Statut", "Offres", "Actions"]}
        empty={!filteredAgencies.length ? "Aucune agence trouvée." : ""}
      >
        {filteredAgencies.map((agency) => (
          <tr key={agency.id}>
            <td>
              <strong>{agency.name}</strong>
              <small>{agency.location}</small>
            </td>
            <td>{agency.email}</td>
            <td>{agency.phone}</td>
            <td><StatusBadge value={agency.status} /></td>
            <td>{agency.offers}</td>
            <td>
              <div className="table-actions">
                <ActionButton
                  icon={CheckCircle2}
                  tone="primary"
                  onClick={() =>
                    updateItemWithToast(setAgencies, agency.id, { status: "Approuvé" }, `${agency.name} est approuvée.`)
                  }
                >
                  Approuver
                </ActionButton>
                <ActionButton
                  icon={Ban}
                  tone="warning"
                  onClick={() =>
                    updateItemWithToast(setAgencies, agency.id, { status: "Suspendu" }, `${agency.name} est suspendue.`)
                  }
                >
                  Suspendre
                </ActionButton>
                <ActionButton icon={Eye} onClick={() => navigateToRoute(agency.route)}>Voir</ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderPackages = () => (
    <section className="dashboard-card">
      <SectionHeader
        title="Gestion des forfaits"
        action={<ActionButton icon={Plus} tone="primary" onClick={() => openModal("package", "add")}>Ajouter un forfait</ActionButton>}
      />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        placeholder={page.search}
        filters={[{ label: "Statut", value: filters.packages, onChange: (value) => setFilter("packages", value), options: statusFilters.packages }]}
      />
      <DashboardTable
        columns={["Forfait", "Destination", "Prix", "Durée", "Statut", "Actions"]}
        empty={!filteredPackages.length ? "Aucun forfait trouvé." : ""}
      >
        {filteredPackages.map((item) => (
          <tr key={item.id}>
            <td>
              <strong>{item.title}</strong>
              <small>{item.agency}</small>
            </td>
            <td>{item.destination}</td>
            <td>{formatMad(item.price)}</td>
            <td>{item.duration}</td>
            <td><StatusBadge value={item.status} /></td>
            <td>
              <div className="table-actions">
                <ActionButton
                  icon={Eye}
                  onClick={() =>
                    item.route
                      ? navigateToRoute(item.route)
                      : openDetails(item.title, [
                          { label: "Destination", value: item.destination },
                          { label: "Prix", value: formatMad(item.price) },
                          { label: "Durée", value: item.duration },
                          { label: "Agence", value: item.agency },
                          { label: "Type", value: item.type },
                          { label: "Statut", value: item.status },
                        ])
                  }
                >
                  Voir
                </ActionButton>
                <ActionButton icon={Pencil} tone="primary" onClick={() => openModal("package", "edit", item)}>Modifier</ActionButton>
                <ActionButton icon={Trash2} tone="danger" onClick={() => confirmDelete(setPackages, item.id, item.title)}>Supprimer</ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderDestinations = () => (
    <section className="dashboard-card">
      <SectionHeader
        title="Gestion des destinations"
        action={<ActionButton icon={Plus} tone="primary" onClick={() => openModal("destination", "add")}>Ajouter une destination</ActionButton>}
      />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        placeholder={page.search}
        filters={[{ label: "Statut", value: filters.destinations, onChange: (value) => setFilter("destinations", value), options: statusFilters.destinations }]}
      />
      <div className="destination-admin-grid">
        {filteredDestinations.map((destination) => (
          <article key={destination.id} className="destination-admin-card">
            <div>
              <MapPin size={20} />
              <StatusBadge value={destination.status} />
            </div>
            <h3>{destination.name}</h3>
            <p>{destination.city}, {destination.country}</p>
            <strong>{destination.packages} forfaits</strong>
            <div className="card-actions">
              <ActionButton icon={Eye} onClick={() => navigateToRoute(destination.route)}>Voir</ActionButton>
              <ActionButton icon={Pencil} tone="primary" onClick={() => openModal("destination", "edit", destination)}>Modifier</ActionButton>
              <ActionButton icon={Trash2} tone="danger" onClick={() => confirmDelete(setDestinations, destination.id, destination.name)}>Supprimer</ActionButton>
            </div>
          </article>
        ))}
      </div>
      {!filteredDestinations.length ? <EmptyState text="Aucune destination trouvée." /> : null}
    </section>
  );

  const renderBookings = () => (
    <section className="dashboard-card">
      <SectionHeader title="Gestion des réservations" />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        placeholder={page.search}
        filters={[
          { label: "Réservation", value: filters.bookings, onChange: (value) => setFilter("bookings", value), options: statusFilters.bookings },
          { label: "Paiement", value: filters.bookingPayment, onChange: (value) => setFilter("bookingPayment", value), options: bookingPaymentFilters },
        ]}
      />
      <DashboardTable
        columns={["ID", "Client", "Voyage", "Agence", "Date", "Montant", "Paiement", "Statut", "Actions"]}
        empty={!filteredBookings.length ? "Aucune réservation trouvée." : ""}
      >
        {filteredBookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>{booking.client}</td>
            <td>
              <strong>{booking.packageName}</strong>
              <small>{booking.destination}</small>
            </td>
            <td>{booking.agency}</td>
            <td>{booking.date}</td>
            <td>{formatMad(booking.amount)}</td>
            <td><StatusBadge value={booking.paymentStatus} /></td>
            <td><StatusBadge value={booking.bookingStatus} /></td>
            <td>
              <div className="table-actions">
                <ActionButton
                  icon={Eye}
                  onClick={() =>
                    openDetails(
                      booking.id,
                      [
                        { label: "Client", value: booking.client },
                        { label: "Voyage", value: booking.packageName },
                        { label: "Destination", value: booking.destination },
                        { label: "Agence", value: booking.agency },
                        { label: "Date", value: booking.date },
                        { label: "Voyageurs", value: booking.travelers },
                        { label: "Montant", value: formatMad(booking.amount) },
                        { label: "Paiement", value: booking.paymentStatus },
                        { label: "Statut", value: booking.bookingStatus },
                        { label: "Prochaine action", value: booking.nextAction },
                      ],
                      booking.route
                    )
                  }
                >
                  Voir
                </ActionButton>
                <ActionButton icon={CreditCard} onClick={() => navigateToRoute(booking.route)}>Paiement</ActionButton>
                <ActionButton
                  icon={CheckCircle2}
                  tone="primary"
                  onClick={() =>
                    updateItemWithToast(setBookings, booking.id, { bookingStatus: "Confirmé" }, `${booking.id} est confirmée.`)
                  }
                >
                  Confirmer
                </ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderPayments = () => (
    <div className="dashboard-content-grid">
      <section className="stats-grid">
        {revenueCards.map((stat) => (
          <article key={stat.label} className={`stat-card stat-card-${stat.tone}`}>
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
            <span>{stat.note}</span>
          </article>
        ))}
      </section>

      <section className="dashboard-card dashboard-wide-card">
        <SectionHeader title="Gestion des paiements" />
        <Toolbar
          query={query}
          onQueryChange={setQuery}
          placeholder={page.search}
          filters={[{ label: "Statut", value: filters.payments, onChange: (value) => setFilter("payments", value), options: statusFilters.payments }]}
        />
        <DashboardTable
          columns={["Paiement", "Client", "Réservation", "Montant", "Méthode", "Statut", "Date", "Actions"]}
          empty={!filteredPayments.length ? "Aucun paiement trouvé." : ""}
        >
          {filteredPayments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.client}</td>
              <td>{payment.booking}</td>
              <td>{formatMad(payment.amount)}</td>
              <td>{payment.method}</td>
              <td><StatusBadge value={payment.status} /></td>
              <td>{payment.date}</td>
              <td>
                <div className="table-actions">
                  <ActionButton icon={Eye} onClick={() => navigateToRoute(payment.route)}>Voir</ActionButton>
                  <ActionButton icon={Download} tone="primary" onClick={() => downloadReceipt(payment)}>
                    Reçu
                  </ActionButton>
                </div>
              </td>
            </tr>
          ))}
        </DashboardTable>
      </section>
    </div>
  );

  const renderRequests = () => (
    <section className="dashboard-card">
      <SectionHeader title="Demandes personnalisées" />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        placeholder={page.search}
        filters={[{ label: "Statut", value: filters.requests, onChange: (value) => setFilter("requests", value), options: statusFilters.requests }]}
      />
      <DashboardTable
        columns={["Demande", "Client", "Destination", "Voyageurs", "Budget", "Services", "Agences", "Statut", "Actions"]}
        empty={!filteredRequests.length ? "Aucune demande trouvée." : ""}
      >
        {filteredRequests.map((request) => (
          <tr key={request.id}>
            <td>{request.id}</td>
            <td>{request.client}</td>
            <td>{request.destination}</td>
            <td>{request.travelers}</td>
            <td>{request.budget}</td>
            <td>{request.services.join(", ")}</td>
            <td>{request.agencies.join(", ")}</td>
            <td><StatusBadge value={request.status} /></td>
            <td>
              <div className="table-actions">
                <ActionButton icon={Eye} onClick={() => navigateToRoute(request.route)}>Détails</ActionButton>
                <ActionButton icon={Building2} tone="primary" onClick={() => assignAgencyToRequest(request)}>Assigner</ActionButton>
                <ActionButton icon={PackageCheck} onClick={() => navigateToRoute(request.offersRoute)}>Offres</ActionButton>
                <ActionButton
                  icon={CheckCircle2}
                  tone="warning"
                  onClick={() =>
                    updateItemWithToast(
                      setCustomRequests,
                      request.id,
                      { status: "Offre reçue", offers: Math.max(Number(request.offers || 0), 1) },
                      `${request.id} est marqué comme offre reçue.`
                    )
                  }
                >
                  Mettre à jour
                </ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderExperiences = () => (
    <section className="dashboard-card">
      <SectionHeader title="Modération des expériences" />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        placeholder={page.search}
        filters={[{ label: "Statut", value: filters.experiences, onChange: (value) => setFilter("experiences", value), options: statusFilters.experiences }]}
      />
      <DashboardTable
        columns={["Auteur", "Destination", "Aperçu", "J’aime", "Commentaires", "Statut", "Actions"]}
        empty={!filteredExperiences.length ? "Aucune expérience trouvée." : ""}
      >
        {filteredExperiences.map((experience) => (
          <tr key={experience.id}>
            <td>{experience.author}</td>
            <td>{experience.destination}</td>
            <td className="admin-preview-cell">{experience.preview}</td>
            <td>{experience.likes}</td>
            <td>{experience.comments}</td>
            <td><StatusBadge value={experience.status} /></td>
            <td>
              <div className="table-actions">
                <ActionButton icon={Eye} onClick={() => navigateToRoute(experience.route)}>Voir</ActionButton>
                <ActionButton
                  icon={Ban}
                  tone="warning"
                  onClick={() =>
                    updateItemWithToast(
                      setExperiences,
                      experience.id,
                      { status: experience.status === "Masqué" ? "Publié" : "Masqué" },
                      experience.status === "Masqué"
                        ? `${experience.id} est publiée.`
                        : `${experience.id} est masquée.`
                    )
                  }
                >
                  {experience.status === "Masqué" ? "Publier" : "Masquer"}
                </ActionButton>
                <ActionButton icon={Trash2} tone="danger" onClick={() => confirmDelete(setExperiences, experience.id, experience.id)}>Supprimer</ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderNotifications = () => (
    <section className="dashboard-card">
      <SectionHeader title="Notifications" />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        placeholder={page.search}
        filters={[{ label: "Statut", value: filters.notifications, onChange: (value) => setFilter("notifications", value), options: statusFilters.notifications }]}
      />
      <DashboardTable
        columns={["Titre", "Type", "Message", "Date", "Statut", "Actions"]}
        empty={!filteredNotifications.length ? "Aucune notification trouvée." : ""}
      >
        {filteredNotifications.map((notification) => (
          <tr key={notification.id}>
            <td><strong>{notification.title}</strong></td>
            <td>{notification.type}</td>
            <td>{notification.message}</td>
            <td>{notification.date}</td>
            <td><StatusBadge value={notification.status} /></td>
            <td>
              <div className="table-actions">
                <ActionButton
                  icon={Eye}
                  onClick={() =>
                    openDetails(notification.title, [
                      { label: "Type", value: notification.type },
                      { label: "Message", value: notification.message },
                      { label: "Date", value: notification.date },
                      { label: "Statut", value: notification.status },
                    ])
                  }
                >
                  Voir
                </ActionButton>
                <ActionButton
                  icon={CheckCircle2}
                  tone="primary"
                  onClick={() =>
                    updateItemWithToast(setNotifications, notification.id, { status: "Lu" }, `${notification.title} est marquée comme lue.`)
                  }
                >
                  Marquer comme lu
                </ActionButton>
                <ActionButton icon={Trash2} tone="danger" onClick={() => confirmDelete(setNotifications, notification.id, notification.title)}>Supprimer</ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </section>
  );

  const renderSettings = () => (
    <section className="dashboard-card settings-panel">
      <SectionHeader
        title="Paramètres de la plateforme"
        description="Ces paramètres sont prêts à être reliés à une API backend."
      />
      <form
        className="settings-form"
        onSubmit={(event) => {
          event.preventDefault();
          saveSettings();
        }}
      >
        <label>
          <span>Nom de la plateforme</span>
          <input value={settingsDraft.platformName} onChange={(event) => setSettingsDraft((current) => ({ ...current, platformName: event.target.value }))} />
        </label>
        <label>
          <span>Email support</span>
          <input type="email" value={settingsDraft.supportEmail} onChange={(event) => setSettingsDraft((current) => ({ ...current, supportEmail: event.target.value }))} />
        </label>
        <label>
          <span>Langue par défaut</span>
          <select value={settingsDraft.defaultLanguage} onChange={(event) => setSettingsDraft((current) => ({ ...current, defaultLanguage: event.target.value }))}>
            <option>Français</option>
            <option>Anglais</option>
            <option>Arabe</option>
          </select>
        </label>
        <label>
          <span>Thème</span>
          <select value={settingsDraft.theme} onChange={(event) => setSettingsDraft((current) => ({ ...current, theme: event.target.value }))}>
            <option>Clair</option>
            <option>Sombre</option>
          </select>
        </label>
        <label>
          <span>Commission plateforme (%)</span>
          <input value={settingsDraft.commission} onChange={(event) => setSettingsDraft((current) => ({ ...current, commission: event.target.value }))} />
        </label>
        <div className="settings-profile">
          <h3>Profil administrateur</h3>
          <p>{adminProfile.name}</p>
          <span>{adminProfile.email}</span>
        </div>
        <button type="submit" className="primary-btn">
          <Save size={16} />
          Enregistrer les paramètres
        </button>
      </form>
    </section>
  );

  const renderActiveSection = () => {
    const sections = {
      overview: renderOverview,
      users: renderUsers,
      agencies: renderAgencies,
      packages: renderPackages,
      destinations: renderDestinations,
      bookings: renderBookings,
      payments: renderPayments,
      requests: renderRequests,
      experiences: renderExperiences,
      notifications: renderNotifications,
      settings: renderSettings,
    };

    return (sections[activeSection] || renderOverview)();
  };

  const handleLogout = () => {
    clearAuthSession();
    notify("Déconnexion effectuée.");
    window.setTimeout(() => navigate("/auth", { replace: true }), 450);
  };

  return (
    <div className="admin-dashboard-page dashboard-layout">
      <aside className={`dashboard-sidebar ${isSidebarOpen ? "dashboard-sidebar-open" : ""}`}>
        <div className="dashboard-brand">
          <img src={nextTripLogo} alt="NextTrip" decoding="async" />
          <div>
            <strong>NextTrip</strong>
            <span>Administration</span>
          </div>
        </div>

        <div className="dashboard-admin-card">
          <span>NT</span>
          <div>
            <strong>{adminProfile.name}</strong>
            <small>{adminProfile.role}</small>
          </div>
        </div>

        <nav className="dashboard-nav" aria-label="Navigation admin">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.key;

            return (
              <button
                type="button"
                key={item.key}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => openSection(item.key)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button type="button" className="sidebar-link sidebar-link-logout" onClick={handleLogout}>
            <LogOut size={19} />
            <span>Déconnexion</span>
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <button
            type="button"
            className="dashboard-menu-btn"
            aria-label="Ouvrir le menu admin"
            onClick={() => setIsSidebarOpen((current) => !current)}
          >
            <Menu size={22} />
          </button>

          <div className="dashboard-header-copy">
            <p>{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <span>{page.description}</span>
          </div>

          <div className="dashboard-header-actions">
            <label className="dashboard-global-search">
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={page.search}
              />
            </label>
            <div className="notification-menu" ref={notificationRef}>
              <button
                type="button"
                className="notification-btn"
                aria-label="Afficher les notifications"
                onClick={() => setShowNotifications((current) => !current)}
              >
                <Bell size={20} />
                {unreadNotifications ? <span>{unreadNotifications}</span> : null}
              </button>
              {showNotifications ? (
                <div className="notification-panel">
                  <strong>Notifications récentes</strong>
                  {notifications.slice(0, 4).map((notification) => (
                    <button
                      type="button"
                      key={notification.id}
                      onClick={() => {
                        openSection("notifications");
                        setQuery(notification.title);
                      }}
                    >
                      <span>{notification.type}</span>
                      {notification.title}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="dashboard-profile-pill">
              <span>NT</span>
              <div>
                <strong>{adminProfile.name}</strong>
                <small>{adminProfile.email}</small>
              </div>
            </div>
          </div>
        </header>

        <GlobalSearchResults
          query={query}
          results={dashboardSearchResults}
          onOpenSection={(section) => openSection(section, query)}
        />

        <div className="dashboard-section">{renderActiveSection()}</div>
      </main>

      <PackageDestinationModal
        modal={modal}
        draft={formDraft}
        onChange={(field, value) => setFormDraft((current) => ({ ...current, [field]: value }))}
        onClose={() => {
          setModal(null);
          setFormDraft({});
        }}
        onSubmit={submitModal}
      />

      <DetailModal
        detail={detailModal}
        onClose={() => setDetailModal(null)}
        onNavigate={navigateToRoute}
      />

      {toast ? <div className="dashboard-toast">{toast}</div> : null}
    </div>
  );
}
