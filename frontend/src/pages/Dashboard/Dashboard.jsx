import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Ban,
  Bell,
  BriefcaseBusiness,
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
  Pencil,
  Plus,
  Save,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";
import nextTripLogo from "../../Assets/images/NextTrip logo.png";
import {
  agencyProfile,
  agencySettings,
  agencyStats,
  clientRequests as requestData,
  clients as clientsData,
  formatMad,
  messages as messageData,
  notifications as notificationData,
  paymentStats,
  payments as paymentData,
  recentActivity,
  reservations as reservationData,
  revenueSummary,
  sentOffers as offerData,
} from "../../data/agencyDashboardData";
import { clearAuthSession } from "../../utils/authSession";
import "./Dashboard.css";

const sidebarItems = [
  { key: "overview", label: "Tableau de bord", icon: LayoutDashboard },
  { key: "requests", label: "Demandes reçues", icon: ClipboardList },
  { key: "offers", label: "Offres envoyées", icon: BriefcaseBusiness },
  { key: "reservations", label: "Réservations", icon: CalendarCheck },
  { key: "clients", label: "Clients", icon: UsersRound },
  { key: "payments", label: "Paiements", icon: CreditCard },
  { key: "messages", label: "Messages", icon: MessageSquareText },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "profile", label: "Profil agence", icon: ShieldCheck },
  { key: "settings", label: "Paramètres", icon: Settings },
];

const pageCopy = {
  overview: {
    eyebrow: "Espace agence",
    title: "Tableau de bord",
    description:
      "Suivez les demandes clients, les offres, les réservations et les paiements de votre agence depuis un espace clair.",
    search: "Rechercher dans le tableau de bord...",
  },
  requests: {
    eyebrow: "Demandes clients",
    title: "Demandes reçues",
    description:
      "Analysez les demandes personnalisées et préparez des offres adaptées aux voyageurs.",
    search: "Rechercher une demande...",
  },
  offers: {
    eyebrow: "Propositions",
    title: "Offres envoyées",
    description:
      "Gérez les offres transmises aux clients et mettez à jour leur statut.",
    search: "Rechercher une offre...",
  },
  reservations: {
    eyebrow: "Suivi opérationnel",
    title: "Réservations",
    description:
      "Confirmez, annulez ou terminez les réservations suivies par votre agence.",
    search: "Rechercher une réservation...",
  },
  clients: {
    eyebrow: "Voyageurs",
    title: "Clients",
    description:
      "Retrouvez les coordonnées, les demandes et les réservations de vos clients.",
    search: "Rechercher un client...",
  },
  payments: {
    eyebrow: "Finance agence",
    title: "Paiements",
    description:
      "Suivez les paiements, les montants en attente et les reçus de réservation.",
    search: "Rechercher un paiement...",
  },
  messages: {
    eyebrow: "Communication",
    title: "Messages",
    description:
      "Consultez les échanges avec les clients et répondez rapidement aux demandes.",
    search: "Rechercher un message...",
  },
  notifications: {
    eyebrow: "Alertes",
    title: "Notifications",
    description:
      "Traitez les alertes liées aux demandes, offres, réservations et paiements.",
    search: "Rechercher une notification...",
  },
  profile: {
    eyebrow: "Identité agence",
    title: "Profil agence",
    description:
      "Mettez à jour les informations visibles et les détails professionnels de votre agence.",
    search: "Rechercher dans le profil...",
  },
  settings: {
    eyebrow: "Préférences",
    title: "Paramètres",
    description:
      "Configurez les informations du compte et les préférences de notification.",
    search: "Rechercher un paramètre...",
  },
};

const statusTone = {
  Nouvelle: "orange",
  "En attente": "orange",
  "En cours": "blue",
  "Offre envoyée": "blue",
  Confirmée: "green",
  Refusée: "red",
  Annulée: "red",
  Terminée: "green",
  Envoyée: "blue",
  Acceptée: "green",
  Expirée: "red",
  Payé: "green",
  "Non payé": "red",
  "En attente de paiement": "orange",
  Échoué: "red",
  Remboursé: "blue",
  Lu: "blue",
  "Non lu": "orange",
  Actif: "green",
  "Suivi en cours": "orange",
  Vérifiée: "green",
};

const sectionFilters = {
  requests: ["Tous", "Nouvelle", "En attente", "Offre envoyée", "Confirmée", "Refusée"],
  offers: ["Tous", "Envoyée", "Acceptée", "Refusée", "Expirée", "Annulée"],
  reservations: ["Tous", "En attente", "Confirmée", "Annulée", "Terminée"],
  clients: ["Tous", "Actif", "Suivi en cours"],
  payments: ["Tous", "Payé", "Non payé", "En attente", "En attente de paiement", "Échoué", "Remboursé"],
  messages: ["Tous", "Lu", "Non lu"],
  notifications: ["Tous", "Lu", "Non lu"],
};

const paymentFilters = ["Tous", "Payé", "Non payé", "En attente", "En attente de paiement", "Échoué", "Remboursé"];

const emptyOfferForm = {
  id: "",
  requestId: "",
  client: "",
  destination: "",
  price: "",
  duration: "",
  hotel: "",
  transport: "",
  services: "",
  message: "",
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
  return <div className="agency-empty-state">{text}</div>;
}

function DashboardTable({ columns, children, empty }) {
  return (
    <div className="agency-table-wrap">
      <table className="agency-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {empty ? <EmptyState /> : null}
    </div>
  );
}

function FilterTabs({ filters = [], value, onChange }) {
  if (!filters.length) {
    return null;
  }

  return (
    <div className="agency-filter-tabs" aria-label="Filtres">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={filter === value ? "agency-filter-tab active" : "agency-filter-tab"}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

function SectionHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="agency-section-header">
      <div>
        <span className="agency-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {actions ? <div className="agency-section-actions">{actions}</div> : null}
    </div>
  );
}

function SearchResultsPanel({ query, results, onOpen, onClear }) {
  if (!query.trim()) {
    return null;
  }

  return (
    <section className="agency-search-results-card">
      <div className="agency-search-results-head">
        <div>
          <span className="agency-eyebrow">Recherche globale</span>
          <h2>Résultats pour “{query}”</h2>
          <p>
            La recherche vérifie les demandes, offres, réservations, clients,
            paiements, messages, notifications et informations de l’agence.
          </p>
        </div>
        <ActionButton icon={X} onClick={onClear}>
          Effacer
        </ActionButton>
      </div>

      {results.length ? (
        <div className="agency-search-results-grid">
          {results.map((result) => (
            <button
              key={`${result.section}-${result.id}-${result.title}`}
              type="button"
              className="agency-search-result"
              onClick={() => onOpen(result)}
            >
              <span>{result.type}</span>
              <strong>{result.title}</strong>
              <small>{result.subtitle}</small>
              <b>{result.meta}</b>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState text="Aucun résultat ne correspond à cette recherche." />
      )}
    </section>
  );
}

function DetailModal({ data, onClose, onPrimaryAction }) {
  if (!data) {
    return null;
  }

  return (
    <div className="agency-modal-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="agency-modal-box"
        role="dialog"
        aria-modal="true"
        aria-label={data.title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="agency-modal-header">
          <div>
            <span className="agency-eyebrow">{data.eyebrow || "Détails"}</span>
            <h3>{data.title}</h3>
          </div>
          <button type="button" className="agency-icon-btn" aria-label="Fermer" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {data.description ? <p className="agency-modal-description">{data.description}</p> : null}

        <div className="agency-detail-grid">
          {(data.fields || []).map((field) => (
            <div key={`${field.label}-${field.value}`} className="agency-detail-item">
              <span>{field.label}</span>
              <strong>{field.value || "Non renseigné"}</strong>
            </div>
          ))}
        </div>

        {data.list?.length ? (
          <div className="agency-detail-list">
            <span>{data.listTitle || "Éléments"}</span>
            <div>
              {data.list.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </div>
        ) : null}

        <div className="agency-modal-footer">
          {onPrimaryAction && data.primaryLabel ? (
            <ActionButton icon={data.primaryIcon || CheckCircle2} tone="primary" onClick={() => onPrimaryAction(data)}>
              {data.primaryLabel || "Valider"}
            </ActionButton>
          ) : null}
          <ActionButton icon={X} onClick={onClose}>
            Fermer
          </ActionButton>
        </div>
      </section>
    </div>
  );
}

function OfferModal({ mode, form, onChange, onClose, onSubmit }) {
  if (!mode) {
    return null;
  }

  const title = mode === "edit" ? "Modifier l’offre" : "Créer une offre";

  return (
    <div className="agency-modal-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="agency-modal-box agency-offer-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="agency-modal-header">
          <div>
            <span className="agency-eyebrow">Offre client</span>
            <h3>{title}</h3>
          </div>
          <button type="button" className="agency-icon-btn" aria-label="Fermer" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="agency-form-grid">
          <label>
            Client
            <input value={form.client} onChange={(event) => onChange("client", event.target.value)} />
          </label>
          <label>
            Destination
            <input value={form.destination} onChange={(event) => onChange("destination", event.target.value)} />
          </label>
          <label>
            Prix proposé en MAD
            <input
              inputMode="numeric"
              value={form.price}
              onChange={(event) => onChange("price", event.target.value)}
            />
          </label>
          <label>
            Durée
            <input value={form.duration} onChange={(event) => onChange("duration", event.target.value)} />
          </label>
          <label>
            Hôtel
            <input value={form.hotel} onChange={(event) => onChange("hotel", event.target.value)} />
          </label>
          <label>
            Transport
            <input value={form.transport} onChange={(event) => onChange("transport", event.target.value)} />
          </label>
          <label className="agency-form-wide">
            Services inclus
            <input value={form.services} onChange={(event) => onChange("services", event.target.value)} />
          </label>
          <label className="agency-form-wide">
            Message au client
            <textarea rows="4" value={form.message} onChange={(event) => onChange("message", event.target.value)} />
          </label>
        </div>

        <div className="agency-modal-footer">
          <ActionButton icon={Send} tone="primary" onClick={onSubmit}>
            {mode === "edit" ? "Enregistrer l’offre" : "Envoyer l’offre"}
          </ActionButton>
          <ActionButton icon={X} onClick={onClose}>
            Annuler
          </ActionButton>
        </div>
      </section>
    </div>
  );
}

function ReplyModal({ form, onChange, onClose, onSubmit }) {
  if (!form) {
    return null;
  }

  return (
    <div className="agency-modal-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="agency-modal-box"
        role="dialog"
        aria-modal="true"
        aria-label="Répondre au client"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="agency-modal-header">
          <div>
            <span className="agency-eyebrow">Message client</span>
            <h3>Répondre au client</h3>
          </div>
          <button type="button" className="agency-icon-btn" aria-label="Fermer" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="agency-form-grid">
          <label>
            Client
            <input value={form.client} onChange={(event) => onChange("client", event.target.value)} />
          </label>
          <label>
            Sujet
            <input value={form.subject} onChange={(event) => onChange("subject", event.target.value)} />
          </label>
          <label className="agency-form-wide">
            Message
            <textarea rows="5" value={form.body} onChange={(event) => onChange("body", event.target.value)} />
          </label>
        </div>

        <div className="agency-modal-footer">
          <ActionButton icon={Send} tone="primary" onClick={onSubmit}>
            Envoyer le message
          </ActionButton>
          <ActionButton icon={X} onClick={onClose}>
            Annuler
          </ActionButton>
        </div>
      </section>
    </div>
  );
}

function OverviewSection({
  requests,
  offers,
  reservations,
  onSectionChange,
  onOpenDetails,
  onCreateOffer,
}) {
  return (
    <>
      <div className="agency-stats-grid">
        {agencyStats.map((stat) => (
          <button
            type="button"
            key={stat.label}
            className={`agency-stat-card agency-stat-card-${stat.tone}`}
            onClick={() => {
              const label = stat.label.toLowerCase();

              if (label.includes("demandes")) {
                onSectionChange("requests");
              } else if (label.includes("offres")) {
                onSectionChange("offers");
              } else if (label.includes("réservations") || label.includes("voyages")) {
                onSectionChange("reservations");
              } else {
                onSectionChange("payments");
              }
            }}
          >
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.note}</small>
          </button>
        ))}
      </div>

      <div className="agency-overview-grid">
        <section className="agency-card agency-card-large">
          <SectionHeader
            eyebrow="Demandes récentes"
            title="Demandes à traiter"
            description="Les demandes les plus importantes pour préparer une réponse rapide."
            actions={
              <ActionButton icon={ClipboardList} onClick={() => onSectionChange("requests")}>
                Tout voir
              </ActionButton>
            }
          />
          <div className="agency-compact-list">
            {requests.slice(0, 3).map((request) => (
              <article key={request.id} className="agency-compact-item">
                <div>
                  <span>{request.id}</span>
                  <strong>{request.destination}</strong>
                  <small>{request.client} · {request.travelers}</small>
                </div>
                <div className="agency-compact-actions">
                  <StatusBadge value={request.status} />
                  <ActionButton icon={Plus} tone="primary" onClick={() => onCreateOffer(request)}>
                    Offre
                  </ActionButton>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="agency-card">
          <SectionHeader
            eyebrow="Résumé"
            title="Revenus"
            description="Vue rapide des montants suivis par l’agence."
          />
          <div className="agency-revenue-box">
            <strong>{revenueSummary.total}</strong>
            <span>Total des réservations suivies</span>
            <div className="agency-revenue-bars">
              {revenueSummary.bars.map((height, index) => (
                <i key={`${height}-${index}`} style={{ height }} />
              ))}
            </div>
            <div className="agency-revenue-split">
              <p><span>Payé</span><b>{revenueSummary.paid}</b></p>
              <p><span>En attente</span><b>{revenueSummary.pending}</b></p>
            </div>
          </div>
        </section>

        <section className="agency-card">
          <SectionHeader
            eyebrow="Réservations récentes"
            title="Suivi voyages"
            description="Réservations à contrôler ou à clôturer."
            actions={
              <ActionButton icon={CalendarCheck} onClick={() => onSectionChange("reservations")}>
                Ouvrir
              </ActionButton>
            }
          />
          <div className="agency-mini-list">
            {reservations.slice(0, 4).map((reservation) => (
              <button
                type="button"
                key={reservation.id}
                className="agency-mini-row"
                onClick={() =>
                  onOpenDetails("Réservation", reservation.id, [
                    ["Client", reservation.client],
                    ["Destination", reservation.destination],
                    ["Date", reservation.date],
                    ["Montant", formatMad(reservation.amount)],
                    ["Statut réservation", reservation.reservationStatus],
                    ["Statut paiement", reservation.paymentStatus],
                  ])
                }
              >
                <span>{reservation.id}</span>
                <strong>{reservation.destination}</strong>
                <StatusBadge value={reservation.reservationStatus} />
              </button>
            ))}
          </div>
        </section>

        <section className="agency-card">
          <SectionHeader
            eyebrow="Offres envoyées"
            title="Dernières propositions"
            description="Offres actives envoyées aux voyageurs."
            actions={
              <ActionButton icon={BriefcaseBusiness} onClick={() => onSectionChange("offers")}>
                Gérer
              </ActionButton>
            }
          />
          <div className="agency-mini-list">
            {offers.slice(0, 4).map((offer) => (
              <button
                type="button"
                key={offer.id}
                className="agency-mini-row"
                onClick={() =>
                  onOpenDetails("Offre", offer.id, [
                    ["Client", offer.client],
                    ["Destination", offer.destination],
                    ["Prix", formatMad(offer.price)],
                    ["Durée", offer.duration],
                    ["Statut", offer.status],
                  ])
                }
              >
                <span>{offer.id}</span>
                <strong>{offer.destination}</strong>
                <StatusBadge value={offer.status} />
              </button>
            ))}
          </div>
        </section>

        <section className="agency-card agency-card-large">
          <SectionHeader
            eyebrow="Activité récente de l’agence"
            title="Dernières actions"
            description="Historique local prêt pour une future connexion serveur."
          />
          <div className="agency-activity-list">
            {recentActivity.map((activity) => (
              <article key={activity.id}>
                <span>{activity.time}</span>
                <strong>{activity.title}</strong>
                <p>{activity.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [query, setQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState("");
  const [filters, setFilters] = useState({
    requests: "Tous",
    offers: "Tous",
    reservations: "Tous",
    reservationPayments: "Tous",
    clients: "Tous",
    payments: "Tous",
    messages: "Tous",
    notifications: "Tous",
  });
  const [requests, setRequests] = useState(requestData);
  const [offers, setOffers] = useState(offerData);
  const [reservations, setReservations] = useState(reservationData);
  const [clients] = useState(clientsData);
  const [payments] = useState(paymentData);
  const [messages, setMessages] = useState(messageData);
  const [notifications, setNotifications] = useState(notificationData);
  const [profileDraft, setProfileDraft] = useState(agencyProfile);
  const [settingsDraft, setSettingsDraft] = useState(agencySettings);
  const [detailModal, setDetailModal] = useState(null);
  const [offerModal, setOfferModal] = useState({ mode: "", form: emptyOfferForm });
  const [replyModal, setReplyModal] = useState(null);

  const toastTimerRef = useRef(null);
  const notificationRef = useRef(null);
  const currentCopy = pageCopy[activeSection] || pageCopy.overview;
  const unreadNotifications = notifications.filter((item) => item.status === "Non lu").length;
  const unreadMessages = messages.filter((item) => item.status === "Non lu").length;

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const notify = (message) => {
    setToast(message);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => setToast(""), 2400);
  };

  const changeSection = (section, nextQuery = "") => {
    setActiveSection(section);
    setQuery(nextQuery);
    setIsSidebarOpen(false);
  };

  const updateFilter = (key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
  };

  const openDetails = (eyebrow, title, fields, description = "", list = []) => {
    setDetailModal({
      eyebrow,
      title,
      description,
      fields: fields.map(([label, value]) => ({ label, value })),
      list,
      listTitle: list.length ? "Services inclus" : "",
    });
  };

  const openRequestDetails = (request) => {
    setDetailModal({
      eyebrow: "Demande reçue",
      title: request.id,
      description: request.notes,
      fields: [
        { label: "Client", value: request.client },
        { label: "Destination souhaitée", value: request.destination },
        { label: "Date de départ", value: request.departureDate },
        { label: "Nombre de voyageurs", value: request.travelers },
        { label: "Budget", value: request.budget },
        { label: "Statut", value: request.status },
      ],
      listTitle: "Services demandés",
      list: request.services,
      primaryLabel: "Créer une offre",
      primaryIcon: Plus,
      sourceRequest: request,
    });
  };

  const openOfferModal = (requestOrOffer, mode = "create") => {
    const isEdit = mode === "edit";
    const form = isEdit
      ? {
          id: requestOrOffer.id,
          requestId: requestOrOffer.requestId || "",
          client: requestOrOffer.client,
          destination: requestOrOffer.destination,
          price: String(requestOrOffer.price || ""),
          duration: requestOrOffer.duration,
          hotel: requestOrOffer.hotel,
          transport: requestOrOffer.transport,
          services: (requestOrOffer.services || []).join(", "),
          message: requestOrOffer.message,
        }
      : {
          ...emptyOfferForm,
          requestId: requestOrOffer.id || "",
          client: requestOrOffer.client || "",
          destination: requestOrOffer.destination || "",
          price: String(Number(String(requestOrOffer.budget || "").replace(/[^\d]/g, "")) || ""),
          duration: requestOrOffer.departureDate || "",
          hotel: "Hôtel ou riad selon le budget du client",
          transport: "Transport privé coordonné par l’agence",
          services: (requestOrOffer.services || []).join(", "),
          message: "Bonjour, voici une proposition préparée selon votre demande NextTrip.",
        };

    setDetailModal(null);
    setOfferModal({ mode, form });
  };

  const updateOfferForm = (field, value) => {
    setOfferModal((previous) => ({
      ...previous,
      form: { ...previous.form, [field]: value },
    }));
  };

  const submitOffer = () => {
    const { mode, form } = offerModal;
    const price = Number(String(form.price).replace(/[^\d]/g, ""));

    if (!form.client || !form.destination || !price) {
      notify("Veuillez renseigner le client, la destination et le prix.");
      return;
    }

    const services = form.services
      .split(",")
      .map((service) => service.trim())
      .filter(Boolean);

    if (mode === "edit") {
      setOffers((previous) =>
        previous.map((offer) =>
          offer.id === form.id
            ? {
                ...offer,
                client: form.client,
                destination: form.destination,
                price,
                duration: form.duration,
                hotel: form.hotel,
                transport: form.transport,
                services,
                message: form.message,
                status: "Envoyée",
              }
            : offer
        )
      );
      notify("Offre mise à jour.");
    } else {
      const newOffer = {
        id: `OFF-AG-${Date.now().toString().slice(-5)}`,
        requestId: form.requestId,
        client: form.client,
        destination: form.destination,
        price,
        duration: form.duration || "Durée à confirmer",
        hotel: form.hotel,
        transport: form.transport,
        services,
        message: form.message,
        status: "Envoyée",
        sentAt: new Date().toLocaleDateString("fr-FR"),
      };

      setOffers((previous) => [newOffer, ...previous]);
      setRequests((previous) =>
        previous.map((request) =>
          request.id === form.requestId ? { ...request, status: "Offre envoyée" } : request
        )
      );
      notify("Offre envoyée au client.");
    }

    setOfferModal({ mode: "", form: emptyOfferForm });
    changeSection("offers");
  };

  const refuseRequest = (id) => {
    if (!window.confirm("Refuser cette demande ?")) {
      return;
    }

    setRequests((previous) =>
      previous.map((request) => (request.id === id ? { ...request, status: "Refusée" } : request))
    );
    notify("Demande refusée.");
  };

  const cancelOffer = (id) => {
    if (!window.confirm("Annuler cette offre ?")) {
      return;
    }

    setOffers((previous) =>
      previous.map((offer) => (offer.id === id ? { ...offer, status: "Annulée" } : offer))
    );
    notify("Offre annulée.");
  };

  const updateReservationStatus = (id, status) => {
    if (["Annulée", "Terminée"].includes(status) && !window.confirm(`Marquer cette réservation comme ${status.toLowerCase()} ?`)) {
      return;
    }

    setReservations((previous) =>
      previous.map((reservation) =>
        reservation.id === id ? { ...reservation, reservationStatus: status } : reservation
      )
    );
    notify(`Réservation ${status.toLowerCase()}.`);
  };

  const markMessageRead = (id) => {
    setMessages((previous) =>
      previous.map((message) => (message.id === id ? { ...message, status: "Lu" } : message))
    );
  };

  const openReplyModal = (target) => {
    setReplyModal({
      client: target.client || target.name || "",
      subject: target.subject ? `Réponse : ${target.subject}` : "Suivi de votre demande NextTrip",
      body: "",
    });
  };

  const updateReplyForm = (field, value) => {
    setReplyModal((previous) => ({ ...previous, [field]: value }));
  };

  const sendReply = () => {
    if (!replyModal.client || !replyModal.subject || !replyModal.body.trim()) {
      notify("Veuillez écrire un sujet et un message.");
      return;
    }

    setMessages((previous) => [
      {
        id: `MSG-${Date.now().toString().slice(-5)}`,
        client: replyModal.client,
        subject: replyModal.subject,
        preview: replyModal.body,
        date: "Maintenant",
        status: "Lu",
      },
      ...previous,
    ]);
    setReplyModal(null);
    changeSection("messages");
    notify("Message envoyé au client.");
  };

  const markNotificationRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id ? { ...notification, status: "Lu" } : notification
      )
    );
    notify("Notification marquée comme lue.");
  };

  const deleteNotification = (id) => {
    if (!window.confirm("Supprimer cette notification ?")) {
      return;
    }

    setNotifications((previous) => previous.filter((notification) => notification.id !== id));
    notify("Notification supprimée.");
  };

  const downloadReceipt = (payment) => {
    const receipt = [
      "Reçu de paiement NextTrip",
      `Paiement : ${payment.id}`,
      `Client : ${payment.client}`,
      `Réservation : ${payment.reservationId}`,
      `Montant : ${formatMad(payment.amount)}`,
      `Méthode : ${payment.method}`,
      `Statut : ${payment.status}`,
      `Date : ${payment.date}`,
    ].join("\n");
    const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${payment.id}-recu-nexttrip.txt`;
    link.click();
    URL.revokeObjectURL(url);
    notify("Reçu téléchargé.");
  };

  const saveProfile = () => {
    notify("Profil agence enregistré localement.");
  };

  const saveSettings = () => {
    localStorage.setItem("nexttrip-agency-settings", JSON.stringify(settingsDraft));
    notify("Paramètres enregistrés.");
  };

  const logout = () => {
    clearAuthSession();
    navigate("/auth", { replace: true });
  };

  const filteredRequests = useMemo(() => {
    const searched = requests.filter((request) =>
      matchesSearch(request, ["id", "client", "destination", "budget", "status"], query)
    );

    return applyStatusFilter(searched, filters.requests);
  }, [requests, query, filters.requests]);

  const filteredOffers = useMemo(() => {
    const searched = offers.filter((offer) =>
      matchesSearch(offer, ["id", "client", "destination", "duration", "status"], query)
    );

    return applyStatusFilter(searched, filters.offers);
  }, [offers, query, filters.offers]);

  const filteredReservations = useMemo(() => {
    const searched = reservations.filter((reservation) =>
      matchesSearch(
        reservation,
        ["id", "client", "destination", "date", "reservationStatus", "paymentStatus"],
        query
      )
    );
    const reservationFiltered = applyStatusFilter(searched, filters.reservations, "reservationStatus");

    return applyStatusFilter(reservationFiltered, filters.reservationPayments, "paymentStatus");
  }, [reservations, query, filters.reservations, filters.reservationPayments]);

  const filteredClients = useMemo(() => {
    const searched = clients.filter((client) =>
      matchesSearch(client, ["name", "email", "phone", "lastRequest", "status"], query)
    );

    return applyStatusFilter(searched, filters.clients);
  }, [clients, query, filters.clients]);

  const filteredPayments = useMemo(() => {
    const searched = payments.filter((payment) =>
      matchesSearch(payment, ["id", "client", "reservationId", "method", "status"], query)
    );

    return applyStatusFilter(searched, filters.payments);
  }, [payments, query, filters.payments]);

  const filteredMessages = useMemo(() => {
    const searched = messages.filter((message) =>
      matchesSearch(message, ["client", "subject", "preview", "status"], query)
    );

    return applyStatusFilter(searched, filters.messages);
  }, [messages, query, filters.messages]);

  const filteredNotifications = useMemo(() => {
    const searched = notifications.filter((notification) =>
      matchesSearch(notification, ["title", "type", "message", "status"], query)
    );

    return applyStatusFilter(searched, filters.notifications);
  }, [notifications, query, filters.notifications]);

  const globalSearchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const results = [];
    const addResult = (condition, result) => {
      if (condition) {
        results.push(result);
      }
    };

    requests.forEach((request) => {
      addResult(
        matchesSearch(request, ["id", "client", "email", "phone", "destination", "budget", "notes", "status"], query) ||
          normalize(request.services).includes(normalize(query)),
        {
          id: request.id,
          type: "Demande reçue",
          section: "requests",
          sectionQuery: request.id,
          title: `${request.id} · ${request.destination}`,
          subtitle: request.client,
          meta: request.status,
        }
      );
    });

    offers.forEach((offer) => {
      addResult(
        matchesSearch(offer, ["id", "requestId", "client", "destination", "duration", "hotel", "transport", "message", "status"], query) ||
          normalize(offer.services).includes(normalize(query)),
        {
          id: offer.id,
          type: "Offre envoyée",
          section: "offers",
          sectionQuery: offer.id,
          title: `${offer.id} · ${offer.destination}`,
          subtitle: offer.client,
          meta: `${formatMad(offer.price)} · ${offer.status}`,
        }
      );
    });

    reservations.forEach((reservation) => {
      addResult(
        matchesSearch(
          reservation,
          ["id", "client", "destination", "date", "reservationStatus", "paymentStatus"],
          query
        ),
        {
          id: reservation.id,
          type: "Réservation",
          section: "reservations",
          sectionQuery: reservation.id,
          title: `${reservation.id} · ${reservation.destination}`,
          subtitle: reservation.client,
          meta: reservation.reservationStatus,
        }
      );
    });

    clients.forEach((client) => {
      addResult(
        matchesSearch(client, ["id", "name", "email", "phone", "lastRequest", "status"], query),
        {
          id: client.id,
          type: "Client",
          section: "clients",
          sectionQuery: client.name,
          title: client.name,
          subtitle: client.email,
          meta: client.status,
        }
      );
    });

    payments.forEach((payment) => {
      addResult(
        matchesSearch(payment, ["id", "client", "reservationId", "method", "status", "date"], query),
        {
          id: payment.id,
          type: "Paiement",
          section: "payments",
          sectionQuery: payment.id,
          title: `${payment.id} · ${formatMad(payment.amount)}`,
          subtitle: payment.client,
          meta: payment.status,
        }
      );
    });

    messages.forEach((message) => {
      addResult(
        matchesSearch(message, ["id", "client", "subject", "preview", "date", "status"], query),
        {
          id: message.id,
          type: "Message",
          section: "messages",
          sectionQuery: message.client,
          title: message.subject,
          subtitle: message.client,
          meta: message.status,
        }
      );
    });

    notifications.forEach((notification) => {
      addResult(
        matchesSearch(notification, ["id", "title", "type", "message", "date", "status"], query),
        {
          id: notification.id,
          type: "Notification",
          section: "notifications",
          sectionQuery: notification.title,
          title: notification.title,
          subtitle: notification.message,
          meta: notification.status,
        }
      );
    });

    addResult(
      matchesSearch(profileDraft, ["name", "email", "phone", "address", "city", "description", "manager", "license"], query) ||
        normalize(profileDraft.specialties).includes(normalize(query)) ||
        normalize(profileDraft.services).includes(normalize(query)),
      {
        id: profileDraft.id,
        type: "Profil agence",
        section: "profile",
        sectionQuery: "",
        title: profileDraft.name,
        subtitle: profileDraft.description,
        meta: profileDraft.verificationStatus,
      }
    );

    addResult(
      matchesSearch(settingsDraft, ["accountEmail", "language", "theme"], query),
      {
        id: "settings",
        type: "Paramètres",
        section: "settings",
        sectionQuery: "",
        title: "Préférences du compte",
        subtitle: settingsDraft.accountEmail,
        meta: settingsDraft.language,
      }
    );

    return results.slice(0, 12);
  }, [
    query,
    requests,
    offers,
    reservations,
    clients,
    payments,
    messages,
    notifications,
    profileDraft,
    settingsDraft,
  ]);

  const openSearchResult = (result) => {
    changeSection(result.section, result.sectionQuery || "");
    setShowNotifications(false);
    notify(`Résultat ouvert : ${result.type}.`);
  };

  const headerProfile = (
    <div className="agency-header-profile">
      <img src={profileDraft.logo || nextTripLogo} alt={profileDraft.name} />
      <div>
        <strong>{profileDraft.name}</strong>
        <span>{profileDraft.verificationStatus}</span>
      </div>
    </div>
  );

  const renderSection = () => {
    if (activeSection === "overview") {
      return (
        <OverviewSection
          requests={requests}
          offers={offers}
          reservations={reservations}
          onSectionChange={changeSection}
          onOpenDetails={openDetails}
          onCreateOffer={openOfferModal}
        />
      );
    }

    if (activeSection === "requests") {
      return (
        <section className="agency-card">
          <SectionHeader
            eyebrow="Demandes reçues"
            title="Demandes personnalisées"
            description="Chaque demande peut être consultée, refusée ou transformée en offre."
            actions={
              <FilterTabs
                filters={sectionFilters.requests}
                value={filters.requests}
                onChange={(value) => updateFilter("requests", value)}
              />
            }
          />
          <DashboardTable
            columns={[
              "ID demande",
              "Client",
              "Destination souhaitée",
              "Départ",
              "Voyageurs",
              "Budget",
              "Services",
              "Statut",
              "Actions",
            ]}
            empty={!filteredRequests.length}
          >
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td><strong>{request.id}</strong><small>{request.createdAt}</small></td>
                <td>{request.client}<small>{request.email}</small></td>
                <td>{request.destination}</td>
                <td>{request.departureDate}</td>
                <td>{request.travelers}</td>
                <td>{request.budget}</td>
                <td>{request.services.slice(0, 2).join(", ") || "À préciser"}</td>
                <td><StatusBadge value={request.status} /></td>
                <td>
                  <div className="agency-row-actions">
                    <ActionButton icon={Eye} onClick={() => openRequestDetails(request)}>Voir</ActionButton>
                    <ActionButton icon={Plus} tone="primary" onClick={() => openOfferModal(request)}>Créer une offre</ActionButton>
                    <ActionButton icon={Ban} tone="danger" onClick={() => refuseRequest(request.id)}>Refuser</ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </DashboardTable>
        </section>
      );
    }

    if (activeSection === "offers") {
      return (
        <section className="agency-card">
          <SectionHeader
            eyebrow="Offres envoyées"
            title="Gestion des offres"
            description="Créez, modifiez ou annulez les offres envoyées aux voyageurs."
            actions={
              <>
                <FilterTabs
                  filters={sectionFilters.offers}
                  value={filters.offers}
                  onChange={(value) => updateFilter("offers", value)}
                />
                <ActionButton icon={Plus} tone="primary" onClick={() => openOfferModal(emptyOfferForm)}>
                  Créer une offre
                </ActionButton>
              </>
            }
          />
          <DashboardTable
            columns={["ID offre", "Client", "Destination", "Prix", "Durée", "Services inclus", "Statut", "Date d’envoi", "Actions"]}
            empty={!filteredOffers.length}
          >
            {filteredOffers.map((offer) => (
              <tr key={offer.id}>
                <td><strong>{offer.id}</strong><small>{offer.requestId || "Demande directe"}</small></td>
                <td>{offer.client}</td>
                <td>{offer.destination}</td>
                <td>{formatMad(offer.price)}</td>
                <td>{offer.duration}</td>
                <td>{offer.services.slice(0, 2).join(", ") || "À préciser"}</td>
                <td><StatusBadge value={offer.status} /></td>
                <td>{offer.sentAt}</td>
                <td>
                  <div className="agency-row-actions">
                    <ActionButton
                      icon={Eye}
                      onClick={() =>
                        openDetails(
                          "Offre envoyée",
                          offer.id,
                          [
                            ["Client", offer.client],
                            ["Destination", offer.destination],
                            ["Prix", formatMad(offer.price)],
                            ["Durée", offer.duration],
                            ["Hôtel", offer.hotel],
                            ["Transport", offer.transport],
                            ["Statut", offer.status],
                          ],
                          offer.message,
                          offer.services
                        )
                      }
                    >
                      Voir
                    </ActionButton>
                    <ActionButton icon={Pencil} tone="primary" onClick={() => openOfferModal(offer, "edit")}>Modifier</ActionButton>
                    <ActionButton icon={Ban} tone="danger" onClick={() => cancelOffer(offer.id)}>Annuler</ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </DashboardTable>
        </section>
      );
    }

    if (activeSection === "reservations") {
      return (
        <section className="agency-card">
          <SectionHeader
            eyebrow="Réservations"
            title="Gestion des réservations"
            description="Suivez les statuts de réservation et de paiement."
            actions={
              <>
                <FilterTabs
                  filters={sectionFilters.reservations}
                  value={filters.reservations}
                  onChange={(value) => updateFilter("reservations", value)}
                />
                <FilterTabs
                  filters={paymentFilters}
                  value={filters.reservationPayments}
                  onChange={(value) => updateFilter("reservationPayments", value)}
                />
              </>
            }
          />
          <DashboardTable
            columns={["ID réservation", "Client", "Destination", "Date", "Montant", "Statut réservation", "Statut paiement", "Actions"]}
            empty={!filteredReservations.length}
          >
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id}>
                <td><strong>{reservation.id}</strong></td>
                <td>{reservation.client}</td>
                <td>{reservation.destination}</td>
                <td>{reservation.date}</td>
                <td>{formatMad(reservation.amount)}</td>
                <td><StatusBadge value={reservation.reservationStatus} /></td>
                <td><StatusBadge value={reservation.paymentStatus} /></td>
                <td>
                  <div className="agency-row-actions">
                    <ActionButton
                      icon={Eye}
                      onClick={() =>
                        openDetails("Réservation", reservation.id, [
                          ["Client", reservation.client],
                          ["Destination", reservation.destination],
                          ["Date", reservation.date],
                          ["Montant", formatMad(reservation.amount)],
                          ["Statut réservation", reservation.reservationStatus],
                          ["Statut paiement", reservation.paymentStatus],
                        ])
                      }
                    >
                      Voir
                    </ActionButton>
                    <ActionButton icon={CheckCircle2} tone="primary" onClick={() => updateReservationStatus(reservation.id, "Confirmée")}>Confirmer</ActionButton>
                    <ActionButton icon={Ban} tone="danger" onClick={() => updateReservationStatus(reservation.id, "Annulée")}>Annuler</ActionButton>
                    <ActionButton icon={CheckCircle2} onClick={() => updateReservationStatus(reservation.id, "Terminée")}>Terminer</ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </DashboardTable>
        </section>
      );
    }

    if (activeSection === "clients") {
      return (
        <section className="agency-card">
          <SectionHeader
            eyebrow="Clients"
            title="Portefeuille clients"
            description="Consultez les profils voyageurs et lancez un suivi rapide."
            actions={
              <FilterTabs
                filters={sectionFilters.clients}
                value={filters.clients}
                onChange={(value) => updateFilter("clients", value)}
              />
            }
          />
          <DashboardTable
            columns={["Client", "Email", "Téléphone", "Réservations", "Dernière demande", "Statut", "Actions"]}
            empty={!filteredClients.length}
          >
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td><strong>{client.name}</strong><small>{client.id}</small></td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.bookings}</td>
                <td>{client.lastRequest}</td>
                <td><StatusBadge value={client.status} /></td>
                <td>
                  <div className="agency-row-actions">
                    <ActionButton
                      icon={Eye}
                      onClick={() =>
                        openDetails("Profil client", client.name, [
                          ["Email", client.email],
                          ["Téléphone", client.phone],
                          ["Réservations", client.bookings],
                          ["Dernière demande", client.lastRequest],
                          ["Statut", client.status],
                        ])
                      }
                    >
                      Voir profil
                    </ActionButton>
                    <ActionButton
                      icon={CalendarCheck}
                      onClick={() => changeSection("reservations", client.name)}
                    >
                      Voir réservations
                    </ActionButton>
                    <ActionButton icon={Mail} tone="primary" onClick={() => openReplyModal(client)}>Envoyer message</ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </DashboardTable>
        </section>
      );
    }

    if (activeSection === "payments") {
      return (
        <section className="agency-card">
          <SectionHeader
            eyebrow="Paiements"
            title="Suivi financier"
            description="Contrôlez les paiements liés aux réservations de l’agence."
            actions={
              <FilterTabs
                filters={sectionFilters.payments}
                value={filters.payments}
                onChange={(value) => updateFilter("payments", value)}
              />
            }
          />
          <div className="agency-payment-stats">
            <article><span>Total payé</span><strong>{paymentStats.paidTotal}</strong></article>
            <article><span>Montant en attente</span><strong>{paymentStats.pendingTotal}</strong></article>
            <article><span>Paiements échoués</span><strong>{paymentStats.failedCount}</strong></article>
          </div>
          <DashboardTable
            columns={["ID paiement", "Client", "Réservation", "Montant", "Méthode", "Statut", "Date", "Action"]}
            empty={!filteredPayments.length}
          >
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td><strong>{payment.id}</strong></td>
                <td>{payment.client}</td>
                <td>{payment.reservationId}</td>
                <td>{formatMad(payment.amount)}</td>
                <td>{payment.method}</td>
                <td><StatusBadge value={payment.status} /></td>
                <td>{payment.date}</td>
                <td>
                  <ActionButton icon={Download} tone="primary" onClick={() => downloadReceipt(payment)}>
                    Voir reçu
                  </ActionButton>
                </td>
              </tr>
            ))}
          </DashboardTable>
        </section>
      );
    }

    if (activeSection === "messages") {
      return (
        <section className="agency-card">
          <SectionHeader
            eyebrow="Messages"
            title="Boîte de réception"
            description="Ouvrez les messages clients et répondez sans quitter le tableau de bord."
            actions={
              <FilterTabs
                filters={sectionFilters.messages}
                value={filters.messages}
                onChange={(value) => updateFilter("messages", value)}
              />
            }
          />
          <DashboardTable
            columns={["Client", "Sujet", "Dernier message", "Date", "Statut", "Actions"]}
            empty={!filteredMessages.length}
          >
            {filteredMessages.map((message) => (
              <tr key={message.id}>
                <td><strong>{message.client}</strong></td>
                <td>{message.subject}</td>
                <td>{message.preview}</td>
                <td>{message.date}</td>
                <td><StatusBadge value={message.status} /></td>
                <td>
                  <div className="agency-row-actions">
                    <ActionButton
                      icon={Eye}
                      onClick={() => {
                        markMessageRead(message.id);
                        openDetails("Message", message.subject, [
                          ["Client", message.client],
                          ["Date", message.date],
                          ["Statut", "Lu"],
                        ], message.preview);
                      }}
                    >
                      Ouvrir
                    </ActionButton>
                    <ActionButton icon={Send} tone="primary" onClick={() => openReplyModal(message)}>Répondre</ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </DashboardTable>
        </section>
      );
    }

    if (activeSection === "notifications") {
      return (
        <section className="agency-card">
          <SectionHeader
            eyebrow="Notifications"
            title="Centre d’alertes"
            description="Gardez les alertes importantes sous contrôle."
            actions={
              <FilterTabs
                filters={sectionFilters.notifications}
                value={filters.notifications}
                onChange={(value) => updateFilter("notifications", value)}
              />
            }
          />
          <DashboardTable
            columns={["Titre", "Type", "Message", "Date", "Statut", "Actions"]}
            empty={!filteredNotifications.length}
          >
            {filteredNotifications.map((notification) => (
              <tr key={notification.id}>
                <td><strong>{notification.title}</strong></td>
                <td>{notification.type}</td>
                <td>{notification.message}</td>
                <td>{notification.date}</td>
                <td><StatusBadge value={notification.status} /></td>
                <td>
                  <div className="agency-row-actions">
                    <ActionButton icon={CheckCircle2} tone="primary" onClick={() => markNotificationRead(notification.id)}>
                      Marquer comme lu
                    </ActionButton>
                    <ActionButton icon={Trash2} tone="danger" onClick={() => deleteNotification(notification.id)}>
                      Supprimer
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </DashboardTable>
        </section>
      );
    }

    if (activeSection === "profile") {
      return (
        <section className="agency-card">
          <SectionHeader
            eyebrow="Profil agence"
            title="Informations de l’agence"
            description="Ces informations structurent la fiche agence et les futurs écrans serveur."
            actions={
              <ActionButton icon={Save} tone="primary" onClick={saveProfile}>
                Modifier le profil
              </ActionButton>
            }
          />
          <div className="agency-profile-panel">
            <div className="agency-profile-cover">
              <img src={profileDraft.logo || nextTripLogo} alt={profileDraft.name} />
              <div>
                <span><ShieldCheck size={16} /> {profileDraft.verificationStatus}</span>
                <h3>{profileDraft.name}</h3>
                <p>{profileDraft.description}</p>
              </div>
            </div>
            <div className="agency-form-grid">
              {[
                ["name", "Nom de l’agence"],
                ["email", "Email"],
                ["phone", "Téléphone"],
                ["address", "Adresse"],
                ["city", "Ville"],
                ["manager", "Responsable"],
                ["license", "Licence agence"],
              ].map(([field, label]) => (
                <label key={field}>
                  {label}
                  <input
                    value={profileDraft[field] || ""}
                    onChange={(event) =>
                      setProfileDraft((previous) => ({ ...previous, [field]: event.target.value }))
                    }
                  />
                </label>
              ))}
              <label className="agency-form-wide">
                Description
                <textarea
                  rows="4"
                  value={profileDraft.description}
                  onChange={(event) =>
                    setProfileDraft((previous) => ({ ...previous, description: event.target.value }))
                  }
                />
              </label>
            </div>
            <div className="agency-chip-panel">
              <span>Spécialités</span>
              <div>
                {profileDraft.specialties.map((item) => <small key={item}>{item}</small>)}
              </div>
            </div>
            <div className="agency-chip-panel">
              <span>Services</span>
              <div>
                {profileDraft.services.map((item) => <small key={item}>{item}</small>)}
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="agency-card">
        <SectionHeader
          eyebrow="Paramètres"
          title="Préférences du compte"
          description="Les paramètres sont enregistrés localement en attendant l’intégration serveur."
          actions={
            <ActionButton icon={Save} tone="primary" onClick={saveSettings}>
              Enregistrer
            </ActionButton>
          }
        />
        <div className="agency-settings-grid">
          <div className="agency-form-grid">
            <label>
              Email du compte
              <input
                value={settingsDraft.accountEmail}
                onChange={(event) =>
                  setSettingsDraft((previous) => ({ ...previous, accountEmail: event.target.value }))
                }
              />
            </label>
            <label>
              Langue
              <select
                value={settingsDraft.language}
                onChange={(event) =>
                  setSettingsDraft((previous) => ({ ...previous, language: event.target.value }))
                }
              >
                <option>Français</option>
                <option>Anglais</option>
                <option>Arabe</option>
              </select>
            </label>
            <label>
              Thème
              <select
                value={settingsDraft.theme}
                onChange={(event) =>
                  setSettingsDraft((previous) => ({ ...previous, theme: event.target.value }))
                }
              >
                <option>Clair</option>
                <option>Sombre</option>
              </select>
            </label>
          </div>
          <div className="agency-preferences">
            <label>
              <input
                type="checkbox"
                checked={settingsDraft.notifyRequests}
                onChange={(event) =>
                  setSettingsDraft((previous) => ({ ...previous, notifyRequests: event.target.checked }))
                }
              />
              Recevoir les alertes de nouvelles demandes
            </label>
            <label>
              <input
                type="checkbox"
                checked={settingsDraft.notifyPayments}
                onChange={(event) =>
                  setSettingsDraft((previous) => ({ ...previous, notifyPayments: event.target.checked }))
                }
              />
              Recevoir les alertes de paiement
            </label>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="agency-dashboard-page">
      <div className="agency-dashboard-layout">
        {isSidebarOpen ? (
          <button
            type="button"
            aria-label="Fermer le menu"
            className="agency-sidebar-backdrop"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}

        <aside className={isSidebarOpen ? "agency-sidebar open" : "agency-sidebar"}>
          <div className="agency-sidebar-brand">
            <img src={nextTripLogo} alt="NextTrip" />
            <div>
              <strong>NextTrip</strong>
              <span>Espace agence</span>
            </div>
          </div>

          <div className="agency-sidebar-profile">
            <img src={profileDraft.logo || nextTripLogo} alt={profileDraft.name} />
            <div>
              <strong>{profileDraft.name}</strong>
              <span>{profileDraft.city}, {profileDraft.country}</span>
            </div>
          </div>

          <nav className="agency-sidebar-nav" aria-label="Navigation du tableau de bord agence">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
                  type="button"
                  className={
                    activeSection === item.key
                      ? "agency-sidebar-link active"
                      : "agency-sidebar-link"
                  }
                  onClick={() => changeSection(item.key)}
                >
                  <span>
                    <Icon size={18} />
                    {item.label}
                  </span>
                  {item.key === "messages" && unreadMessages ? <b>{unreadMessages}</b> : null}
                  {item.key === "notifications" && unreadNotifications ? <b>{unreadNotifications}</b> : null}
                </button>
              );
            })}
          </nav>

          <div className="agency-sidebar-footer">
            <button type="button" className="agency-logout-btn" onClick={logout}>
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>
        </aside>

        <main className="agency-main">
          <header className="agency-header">
            <button
              type="button"
              className="agency-mobile-menu"
              aria-label="Ouvrir le menu"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div className="agency-header-copy">
              <span className="agency-eyebrow">{currentCopy.eyebrow}</span>
              <h1>{currentCopy.title}</h1>
              <p>{currentCopy.description}</p>
            </div>

            <div className="agency-header-actions">
              <label className="agency-search-box">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={currentCopy.search}
                />
              </label>

              <div className="agency-notification-wrap" ref={notificationRef}>
                <button
                  type="button"
                  className="agency-icon-btn"
                  aria-label="Notifications"
                  onClick={() => setShowNotifications((previous) => !previous)}
                >
                  <Bell size={19} />
                  {unreadNotifications ? <span>{unreadNotifications}</span> : null}
                </button>

                {showNotifications ? (
                  <div className="agency-notification-menu">
                    <strong>Notifications récentes</strong>
                    {notifications.slice(0, 4).map((notification) => (
                      <button
                        type="button"
                        key={notification.id}
                        onClick={() => {
                          markNotificationRead(notification.id);
                          setShowNotifications(false);
                        }}
                      >
                        <span>{notification.type}</span>
                        <b>{notification.title}</b>
                        <small>{notification.date}</small>
                      </button>
                    ))}
                    <ActionButton
                      icon={Bell}
                      onClick={() => {
                        changeSection("notifications");
                        setShowNotifications(false);
                      }}
                    >
                      Voir toutes les notifications
                    </ActionButton>
                  </div>
                ) : null}
              </div>

              {headerProfile}
            </div>
          </header>

          <div className="agency-content">
            <SearchResultsPanel
              query={query}
              results={globalSearchResults}
              onOpen={openSearchResult}
              onClear={() => setQuery("")}
            />
            {renderSection()}
          </div>
        </main>
      </div>

      <DetailModal
        data={detailModal}
        onClose={() => setDetailModal(null)}
        onPrimaryAction={(data) => {
          if (data.sourceRequest) {
            openOfferModal(data.sourceRequest);
          }
        }}
      />
      <OfferModal
        mode={offerModal.mode}
        form={offerModal.form}
        onChange={updateOfferForm}
        onClose={() => setOfferModal({ mode: "", form: emptyOfferForm })}
        onSubmit={submitOffer}
      />
      <ReplyModal
        form={replyModal}
        onChange={updateReplyForm}
        onClose={() => setReplyModal(null)}
        onSubmit={sendReply}
      />
      {toast ? <div className="agency-toast">{toast}</div> : null}
    </div>
  );
}
