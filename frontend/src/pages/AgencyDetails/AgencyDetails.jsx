import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Star,
  Trophy,
  UsersRound,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { agencyCatalog, getAgencyById } from "../../data/agencyCatalog";
import { offerCatalog, packageCatalog } from "../../data/packageCatalog";
import { initialExperiencePosts } from "../../data/travelExperienceContent";
import { bookingRecords, tripRequests } from "../../data/userWorkspaceContent";
import "../../styles/portalPages.css";
import "./AgencyDetails.css";

const marketplaceItems = [
  ...packageCatalog.map((item) => ({ ...item, sourceType: "Package" })),
  ...offerCatalog.map((item) => ({ ...item, sourceType: "Offer" })),
];

const numberFormatter = new Intl.NumberFormat("fr-FR");
const moneyFormatter = new Intl.NumberFormat("fr-FR");

const normalize = (value) => String(value || "").toLowerCase().trim();
const formatMad = (value) => `${moneyFormatter.format(Math.round(value || 0))} MAD`;

const profileText = {
  Package: "Forfait",
  Offer: "Offre",
  "Usually replies in 2 hours": "Répond généralement en 2 heures",
  "Usually replies same day": "Répond généralement le jour même",
  "Usually replies through NextTrip": "Répond via NextTrip",
  "Morocco tours": "Circuits au Maroc",
  "Desert trips": "Voyages désert",
  "Private guides": "Guides privés",
  "Family travel": "Voyages en famille",
  "Cultural routes": "Circuits culturels",
  "Temple visits": "Visites de temples",
  "Food planning": "Adresses et repas",
  "Rail guidance": "Conseil transport",
  "Package planning and availability support": "Planification des forfaits et disponibilités",
  "Traveler request follow-up": "Suivi des demandes voyageurs",
  "Booking details coordination": "Coordination des détails de réservation",
  "Destination and add-on guidance": "Conseil destination et options",
};

const bookingStatusLabels = {
  Confirmed: "Confirmée",
  "Agency follow-up": "Suivi agence",
  Draft: "Brouillon",
  Completed: "Terminée",
  Cancelled: "Annulée",
};

function translateText(value) {
  return profileText[value] || value;
}

function translateBookingStatus(value) {
  return bookingStatusLabels[value] || value || "Non renseigné";
}

function parseProfileNumber(value) {
  const text = String(value || "").toLowerCase().replace(/,/g, "");
  const base = Number(text.replace(/[^\d.]/g, ""));

  if (!base) {
    return 0;
  }

  return text.includes("k") ? Math.round(base * 1000) : Math.round(base);
}

function getProfileStat(agency, label) {
  return agency.stats.find((item) => normalize(item.label) === normalize(label))?.value || "";
}

function getAgencyItems(agency) {
  const packageNames = agency.packages.map(normalize);

  return marketplaceItems.filter((item) => {
    const itemTitle = normalize(item.title);
    const sameAgency = normalize(item.agency) === normalize(agency.name);
    const listedPackage = packageNames.some(
      (packageName) => itemTitle.includes(packageName) || packageName.includes(itemTitle)
    );

    return sameAgency || listedPackage;
  });
}

function getAgencyBookings(agencyItems) {
  return bookingRecords.filter((booking) =>
    agencyItems.some(
      (item) => item.id === booking.packageId || normalize(item.title) === normalize(booking.title)
    )
  );
}

function getAgencyRequests(agencyItems) {
  return tripRequests.filter((request) => {
    const requestText = normalize(`${request.title} ${request.destination} ${request.mood} ${request.notes}`);

    return agencyItems.some((item) => {
      const city = normalize(String(item.location).split(",")[0]);
      const category = normalize(item.category);

      return requestText.includes(city) || requestText.includes(category);
    });
  });
}

function getAgencyReviews(agencyItems) {
  return initialExperiencePosts.filter((post) =>
    agencyItems.some(
      (item) =>
        normalize(post.tripTitle).includes(normalize(item.title)) ||
        normalize(item.location).includes(normalize(post.location)) ||
        normalize(post.location).includes(normalize(String(item.location).split(",")[0]))
    )
  );
}

function buildAgencyScore(agency) {
  const agencyItems = getAgencyItems(agency);
  const bookings = getAgencyBookings(agencyItems);
  const requests = getAgencyRequests(agencyItems);
  const reviews = getAgencyReviews(agencyItems);
  const reportedClients = parseProfileNumber(getProfileStat(agency, "Travelers served"));
  const trackedClients = bookings.reduce((sum, booking) => sum + Number(booking.travelers || 0), 0);
  const clientScore = reportedClients || trackedClients;
  const rating = Number(agency.rating || 0);

  return rating * 100 + agencyItems.length * 22 + requests.length * 12 + reviews.length * 8 + clientScore / 60;
}

function buildAgencyDetails(agency) {
  const agencyItems = getAgencyItems(agency);
  const bookings = getAgencyBookings(agencyItems);
  const requests = getAgencyRequests(agencyItems);
  const reviews = getAgencyReviews(agencyItems);
  const reportedClients = parseProfileNumber(getProfileStat(agency, "Travelers served"));
  const trackedClients = bookings.reduce((sum, booking) => sum + Number(booking.travelers || 0), 0);
  const clientsServed = reportedClients || trackedClients;
  const bookingValue = bookings.reduce((sum, booking) => sum + Number(booking.total || 0), 0);
  const topItems = [...agencyItems].sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
  const averagePackagePrice =
    agencyItems.reduce((sum, item) => sum + Number(item.price || 0), 0) / Math.max(agencyItems.length, 1);
  const focusLocations = Array.from(new Set(agencyItems.map((item) => item.location).filter(Boolean)));
  const focusCategories = Array.from(new Set(agencyItems.map((item) => item.category).filter(Boolean)));

  return {
    agencyItems,
    bookings,
    requests,
    reviews,
    focusLocations,
    focusCategories,
    clientsServed,
    bookingValue,
    topItems,
    averagePackagePrice,
    ratingQuality: Math.min(100, Math.round((Number(agency.rating || 0) / 5) * 100)),
    packageCoverage: Math.min(100, Math.round((agencyItems.length / 4) * 100)),
    requestFit: Math.min(100, Math.round((requests.length / Math.max(tripRequests.length, 1)) * 100)),
    clientTrust: Math.min(100, Math.round((clientsServed / Math.max(clientsServed, 120)) * 100)),
  };
}

function buildAgencyIntro(agency, details) {
  const locations = details.focusLocations.length
    ? details.focusLocations.slice(0, 3).join(", ")
    : agency.location;
  const categories = details.focusCategories.length
    ? details.focusCategories.slice(0, 3).map(translateText).join(", ")
    : agency.specialties.slice(0, 3).map(translateText).join(", ");

  if (details.agencyItems.length) {
    return `${agency.name} accompagne les voyageurs sur ${locations} avec des offres ${categories || "voyage"} reliées au catalogue NextTrip.`;
  }

  return `${agency.name} est un profil agence référencé dans NextTrip, prêt à recevoir des demandes voyageurs et à compléter son catalogue.`;
}

function MetricCard({ icon: Icon, label, value, note }) {
  return (
    <article className="agency-detail-metric">
      <Icon size={22} />
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

function ProgressRow({ label, value, note }) {
  return (
    <div className="agency-detail-progress-row">
      <div>
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="agency-detail-progress-track">
        <span style={{ width: `${value}%` }} />
      </div>
      <p>{note}</p>
    </div>
  );
}

export default function AgencyDetails() {
  const { agencyId } = useParams();
  const agency = getAgencyById(agencyId);

  const ranking = useMemo(
    () =>
      agencyCatalog
        .map((profile) => ({ id: profile.id, score: buildAgencyScore(profile) }))
        .sort((a, b) => b.score - a.score),
    []
  );

  if (!agency) {
    return (
      <div className="portal-page agency-detail-page">
        <Navbar />
        <main className="site-shell portal-main">
          <section className="portal-card">
            <h1>Agence introuvable</h1>
            <p>Ce profil agence n’est pas disponible pour le moment.</p>
            <Link to="/agency" className="portal-btn portal-btn-secondary">
              Retour aux agences
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const details = buildAgencyDetails(agency);
  const rankPosition = ranking.findIndex((item) => item.id === agency.id) + 1 || agencyCatalog.length;
  const topItem = details.topItems[0];
  const agencyIntro = buildAgencyIntro(agency, details);

  return (
    <div className="portal-page agency-detail-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section
          className="agency-detail-cover agency-detail-cover-modern"
          style={{ backgroundImage: `url(${agency.cover})` }}
        >
          <div className="agency-detail-cover-inner">
            <p className="portal-eyebrow">
              {agency.verified ? <ShieldCheck size={15} /> : <BriefcaseBusiness size={15} />}
              {agency.verified ? "Agence vérifiée" : "Profil agence"}
            </p>
            <h1>{agency.name}</h1>
            <p>{agencyIntro}</p>
            <div className="agency-detail-hero-meta">
              <span>
                <Trophy size={16} /> #{rankPosition} classement marketplace
              </span>
              <span>
                <Star size={16} /> {agency.rating} note moyenne
              </span>
              <span>
                <MapPin size={16} /> {agency.location}
              </span>
            </div>
          </div>
        </section>

        <section className="agency-detail-metrics-grid">
          <MetricCard
            icon={Trophy}
            label="Classement marketplace"
            value={`#${rankPosition}`}
            note={`Comparée à ${agencyCatalog.length} profils agence présents dans NextTrip.`}
          />
          <MetricCard
            icon={UsersRound}
            label="Clients accompagnés"
            value={details.clientsServed ? numberFormatter.format(details.clientsServed) : "0 suivi"}
            note="Calculé avec le profil agence et les réservations disponibles."
          />
          <MetricCard
            icon={PackageCheck}
            label="Forfaits et offres"
            value={numberFormatter.format(details.agencyItems.length)}
            note="Éléments du marketplace liés à cette agence."
          />
          <MetricCard
            icon={MessageCircle}
            label="Demandes compatibles"
            value={numberFormatter.format(details.requests.length)}
            note="Demandes voyageurs proches de ses destinations ou catégories."
          />
        </section>

        <section className="agency-detail-layout">
          <article className="portal-card agency-detail-profile-card">
            <div className="agency-detail-section-head">
              <span>Profil agence</span>
              <h2>Positionnement, forces et spécialités.</h2>
            </div>
            <p>{agencyIntro}</p>
            <div className="portal-pill-row">
              {agency.specialties.map((item) => (
                <span className="portal-pill" key={item}>
                  {translateText(item)}
                </span>
              ))}
            </div>
            <div className="agency-detail-contact-grid">
              <div>
                <Clock3 size={18} />
                <span>Délai de réponse</span>
                <strong>{translateText(agency.responseTime)}</strong>
              </div>
              <div>
                <BadgeCheck size={18} />
                <span>Statut</span>
                <strong>{agency.verified ? "Partenaire vérifié" : "Profil marketplace"}</strong>
              </div>
              <div>
                <Star size={18} />
                <span>Meilleure offre</span>
                <strong>{topItem?.title || agency.packages[0] || "Aucun forfait pour le moment"}</strong>
              </div>
              <div>
                <PackageCheck size={18} />
                <span>Prix moyen</span>
                <strong>
                  {details.agencyItems.length ? formatMad(details.averagePackagePrice) : "Non suivi"}
                </strong>
              </div>
            </div>
            <div className="portal-inline-actions agency-detail-actions">
              <Link to="/contact" className="portal-btn portal-btn-primary">
                Contacter l’agence
              </Link>
              <Link to="/packages" className="portal-btn portal-btn-secondary">
                Voir les forfaits
              </Link>
            </div>
          </article>

          <article className="portal-card agency-detail-ranking-card">
            <div className="agency-detail-section-head">
              <span>Performance</span>
              <h2>Indicateurs calculés depuis les données du site.</h2>
            </div>
            <ProgressRow
              label="Qualité de la note"
              value={details.ratingQuality}
              note="Basée sur la note moyenne de l’agence."
            />
            <ProgressRow
              label="Couverture catalogue"
              value={details.packageCoverage}
              note="Nombre de forfaits et offres liés à l’agence."
            />
            <ProgressRow
              label="Compatibilité demandes"
              value={details.requestFit}
              note="Correspondance avec les demandes personnalisées existantes."
            />
            <ProgressRow
              label="Confiance clients"
              value={details.clientTrust}
              note="Clients du profil et réservations visibles dans NextTrip."
            />
          </article>
        </section>

        <section className="portal-card agency-detail-packages-card">
          <div className="agency-detail-section-head">
            <span>Offres de l’agence</span>
            <h2>Forfaits et offres liés à ce profil.</h2>
          </div>
          {details.topItems.length ? (
            <div className="agency-detail-package-grid">
              {details.topItems.slice(0, 4).map((item) => (
                <article key={`${item.sourceType}-${item.id}`} className="agency-detail-package-card">
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                  <div>
                    <span>{translateText(item.sourceType)}</span>
                    <h3>{item.title}</h3>
                    <p>{item.location}</p>
                    <strong>{formatMad(item.price)}</strong>
                    <small>
                      <Star size={13} /> {item.rating} | {item.duration}
                    </small>
                    <Link to={`/packages/${item.id}`} className="portal-btn portal-btn-secondary">
                      Voir les détails
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>Aucun forfait actif n’est encore lié à cette agence.</p>
          )}
        </section>

        <section className="agency-detail-layout">
          <article className="portal-card">
            <div className="agency-detail-section-head">
              <span>Activité clients</span>
              <h2>Réservations, valeur suivie et retours voyageurs.</h2>
            </div>
            <div className="agency-detail-activity-grid">
              <div>
                <span>Réservations suivies</span>
                <strong>{numberFormatter.format(details.bookings.length)}</strong>
              </div>
              <div>
                <span>Valeur suivie</span>
                <strong>{formatMad(details.bookingValue)}</strong>
              </div>
              <div>
                <span>Expériences voyageurs</span>
                <strong>{numberFormatter.format(details.reviews.length)}</strong>
              </div>
            </div>
            <div className="portal-list">
              {details.bookings.length ? (
                details.bookings.map((booking) => (
                  <div className="portal-list-item" key={booking.id}>
                    <h3>{booking.title}</h3>
                    <p>
                      {booking.travelers} voyageur(s) | {translateBookingStatus(booking.status)} | {formatMad(booking.total)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="portal-list-item">
                  <h3>Aucune réservation suivie</h3>
                  <p>Cette agence n’a pas encore de réservation liée aux données voyageurs actuelles.</p>
                </div>
              )}
            </div>
          </article>

          <article className="portal-card">
            <div className="agency-detail-section-head">
              <span>Services</span>
              <h2>Ce que cette agence peut gérer.</h2>
            </div>
            <div className="portal-list">
              {agency.services.map((service) => (
                <div className="portal-list-item" key={service}>
                  <h3>{translateText(service)}</h3>
                  <p>Service disponible à travers ce profil agence.</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
