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

const marketplaceItems = [
  ...packageCatalog.map((item) => ({ ...item, sourceType: "Package" })),
  ...offerCatalog.map((item) => ({ ...item, sourceType: "Offer" })),
];

const numberFormatter = new Intl.NumberFormat("en-US");
const moneyFormatter = new Intl.NumberFormat("en-US");

const normalize = (value) => String(value || "").toLowerCase().trim();
const formatMad = (value) => `${moneyFormatter.format(Math.round(value || 0))} MAD`;

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

  return {
    agencyItems,
    bookings,
    requests,
    reviews,
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
            <h1>Agency not found</h1>
            <p>This agency profile is not available.</p>
            <Link to="/agency" className="portal-btn portal-btn-secondary">
              Back to agency page
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
              {agency.verified ? "Verified agency" : "Agency profile"}
            </p>
            <h1>{agency.name}</h1>
            <p>{agency.tagline}</p>
            <div className="agency-detail-hero-meta">
              <span>
                <Trophy size={16} /> #{rankPosition} marketplace ranking
              </span>
              <span>
                <Star size={16} /> {agency.rating} average rating
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
            label="Marketplace rank"
            value={`#${rankPosition}`}
            note={`Ranked across ${agencyCatalog.length} agency profiles in the site data.`}
          />
          <MetricCard
            icon={UsersRound}
            label="Clients served"
            value={details.clientsServed ? numberFormatter.format(details.clientsServed) : "0 tracked"}
            note="Based on agency profile stats and current booking records."
          />
          <MetricCard
            icon={PackageCheck}
            label="Packages and offers"
            value={numberFormatter.format(details.agencyItems.length)}
            note="Live marketplace items connected to this agency."
          />
          <MetricCard
            icon={MessageCircle}
            label="Matched requests"
            value={numberFormatter.format(details.requests.length)}
            note="Traveler requests that fit this agency's destinations or categories."
          />
        </section>

        <section className="agency-detail-layout">
          <article className="portal-card agency-detail-profile-card">
            <div className="agency-detail-section-head">
              <span>Agency overview</span>
              <h2>Profile, strengths, and marketplace focus.</h2>
            </div>
            <p>{agency.location}</p>
            <div className="portal-pill-row">
              {agency.specialties.map((item) => (
                <span className="portal-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <div className="agency-detail-contact-grid">
              <div>
                <Clock3 size={18} />
                <span>Response time</span>
                <strong>{agency.responseTime}</strong>
              </div>
              <div>
                <BadgeCheck size={18} />
                <span>Status</span>
                <strong>{agency.verified ? "Verified partner" : "Marketplace profile"}</strong>
              </div>
              <div>
                <Star size={18} />
                <span>Top package</span>
                <strong>{topItem?.title || agency.packages[0] || "No package yet"}</strong>
              </div>
              <div>
                <PackageCheck size={18} />
                <span>Average price</span>
                <strong>
                  {details.agencyItems.length ? formatMad(details.averagePackagePrice) : "Not tracked"}
                </strong>
              </div>
            </div>
            <div className="portal-inline-actions agency-detail-actions">
              <Link to="/contact" className="portal-btn portal-btn-primary">
                Contact agency
              </Link>
              <Link to="/packages" className="portal-btn portal-btn-secondary">
                Browse packages
              </Link>
            </div>
          </article>

          <article className="portal-card agency-detail-ranking-card">
            <div className="agency-detail-section-head">
              <span>Performance</span>
              <h2>Ranking signals from current site data.</h2>
            </div>
            <ProgressRow
              label="Rating quality"
              value={details.ratingQuality}
              note="Calculated from the agency rating."
            />
            <ProgressRow
              label="Package coverage"
              value={details.packageCoverage}
              note="How many packages and offers the agency owns."
            />
            <ProgressRow
              label="Request fit"
              value={details.requestFit}
              note="How often current trip requests match the agency catalog."
            />
            <ProgressRow
              label="Client trust"
              value={details.clientTrust}
              note="Profile clients and booking records visible in the site data."
            />
          </article>
        </section>

        <section className="portal-card agency-detail-packages-card">
          <div className="agency-detail-section-head">
            <span>Top agency items</span>
            <h2>Best packages and offers connected to this agency.</h2>
          </div>
          {details.topItems.length ? (
            <div className="agency-detail-package-grid">
              {details.topItems.slice(0, 4).map((item) => (
                <article key={`${item.sourceType}-${item.id}`} className="agency-detail-package-card">
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                  <div>
                    <span>{item.sourceType}</span>
                    <h3>{item.title}</h3>
                    <p>{item.location}</p>
                    <strong>{formatMad(item.price)}</strong>
                    <small>
                      <Star size={13} /> {item.rating} | {item.duration}
                    </small>
                    <Link to={`/packages/${item.id}`} className="portal-btn portal-btn-secondary">
                      View details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>No live package is connected to this agency yet.</p>
          )}
        </section>

        <section className="agency-detail-layout">
          <article className="portal-card">
            <div className="agency-detail-section-head">
              <span>Client activity</span>
              <h2>Bookings, value, and traveler stories.</h2>
            </div>
            <div className="agency-detail-activity-grid">
              <div>
                <span>Tracked bookings</span>
                <strong>{numberFormatter.format(details.bookings.length)}</strong>
              </div>
              <div>
                <span>Tracked value</span>
                <strong>{formatMad(details.bookingValue)}</strong>
              </div>
              <div>
                <span>Traveler stories</span>
                <strong>{numberFormatter.format(details.reviews.length)}</strong>
              </div>
            </div>
            <div className="portal-list">
              {details.bookings.length ? (
                details.bookings.map((booking) => (
                  <div className="portal-list-item" key={booking.id}>
                    <h3>{booking.title}</h3>
                    <p>
                      {booking.travelers} travelers | {booking.status} | {formatMad(booking.total)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="portal-list-item">
                  <h3>No tracked booking yet</h3>
                  <p>This agency has no booking record in the current traveler workspace data.</p>
                </div>
              )}
            </div>
          </article>

          <article className="portal-card">
            <div className="agency-detail-section-head">
              <span>Services</span>
              <h2>What this agency can handle.</h2>
            </div>
            <div className="portal-list">
              {agency.services.map((service) => (
                <div className="portal-list-item" key={service}>
                  <h3>{service}</h3>
                  <p>Available through this agency profile.</p>
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
