import React, { useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  CreditCard,
  Headphones,
  LayoutDashboard,
  PackageCheck,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TicketCheck,
} from "lucide-react";
import nextTripLogo from "../../Assets/images/NextTrip logo.png";
import {
  adminAlerts,
  adminNavItems,
  adminSummary,
  agencyHealthCards,
  agencyRows,
  demandCategories,
  offerQualityCards,
  offerRows,
  pageHeaders,
  pageStats,
  paymentRows,
  refundRows,
  requestPipeline,
  requestRows,
  revenueSummary,
  revenueBars,
  supportChannels,
  supportTickets,
  verificationQueue,
} from "../../data/adminDashboardContent";
import "./AdminDashboard.css";

const navIcons = {
  overview: LayoutDashboard,
  agencies: Building2,
  requests: TicketCheck,
  offers: PackageCheck,
  payments: CreditCard,
  support: Headphones,
};

const statusTone = {
  Verified: "green",
  Matched: "green",
  Featured: "green",
  Live: "blue",
  Completed: "green",
  Resolved: "green",
  Listed: "blue",
  Package: "blue",
  Offer: "orange",
  Pending: "orange",
  "Agency reviewing": "orange",
  "Offer ready": "green",
  "Paid deposit": "green",
  "Deposit pending": "orange",
  "Not paid": "orange",
  Review: "orange",
  "Needs offers": "orange",
  "High priority": "orange",
  "Action needed": "orange",
  "Manual review": "orange",
  Failed: "orange",
  Escalated: "orange",
  "In review": "blue",
  Finance: "blue",
  Medium: "blue",
  Open: "blue",
  Answering: "blue",
  "Waiting agency": "blue",
  "Waiting traveler": "blue",
  Low: "green",
  High: "orange",
};

function StatusPill({ children }) {
  const tone = statusTone[children] || "neutral";

  return <span className={`admin-status admin-status-${tone}`}>{children}</span>;
}

function AdminSection({ eyebrow, title, action, children, className = "" }) {
  return (
    <section className={`admin-section ${className}`}>
      <div className="admin-section-head">
        <div>
          <p>{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function EmptyResult({ label }) {
  return <div className="admin-empty-box">No {label} found for this search.</div>;
}

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("overview");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [agencyOverrides, setAgencyOverrides] = useState({});
  const [requestOverrides, setRequestOverrides] = useState({});
  const [offerOverrides, setOfferOverrides] = useState({});
  const [paymentOverrides, setPaymentOverrides] = useState({});
  const [refundOverrides, setRefundOverrides] = useState({});
  const [ticketOverrides, setTicketOverrides] = useState({});

  const normalizedQuery = query.trim().toLowerCase();
  const header = pageHeaders[activePage] || pageHeaders.overview;
  const currentStats = pageStats[activePage] || pageStats.overview;

  const agencies = useMemo(
    () => agencyRows.map((agency) => ({ ...agency, ...(agencyOverrides[agency.name] || {}) })),
    [agencyOverrides]
  );

  const requests = useMemo(
    () => requestRows.map((request) => ({ ...request, ...(requestOverrides[request.id] || {}) })),
    [requestOverrides]
  );

  const offers = useMemo(
    () => offerRows.map((offer) => ({ ...offer, ...(offerOverrides[offer.id] || {}) })),
    [offerOverrides]
  );

  const payments = useMemo(
    () => paymentRows.map((payment) => ({ ...payment, ...(paymentOverrides[payment.id] || {}) })),
    [paymentOverrides]
  );

  const refunds = useMemo(
    () => refundRows.map((refund) => ({ ...refund, ...(refundOverrides[refund.id] || {}) })),
    [refundOverrides]
  );

  const tickets = useMemo(
    () => supportTickets.map((ticket) => ({ ...ticket, ...(ticketOverrides[ticket.code] || {}) })),
    [ticketOverrides]
  );

  const ownerCounts = useMemo(
    () =>
      tickets.reduce((counts, ticket) => {
        counts[ticket.owner] = (counts[ticket.owner] || 0) + 1;
        return counts;
      }, {}),
    [tickets]
  );

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => {
      setToast((currentMessage) => (currentMessage === message ? "" : currentMessage));
    }, 2400);
  };

  const openPage = (pageKey, nextQuery = "") => {
    setActivePage(pageKey);
    setQuery(nextQuery);
    setShowNotifications(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAlertTarget = (alert) => {
    openPage(alert.target || "overview");
    notify(`${alert.title} opened.`);
  };

  const handleAgencyAction = (agency) => {
    if (agency.status !== "Verified") {
      setAgencyOverrides((current) => ({
        ...current,
        [agency.name]: { status: "Verified" },
      }));
      notify(`${agency.name} marked as verified.`);
      return;
    }

    setQuery(agency.name);
    notify(`${agency.name} profile focused.`);
  };

  const handleRequestAction = (request) => {
    if (request.status !== "Matched" && request.status !== "Offer ready") {
      setRequestOverrides((current) => ({
        ...current,
        [request.id]: { status: "Matched" },
      }));
      notify(`${request.id} matched with ${request.matchedAgency}.`);
      return;
    }

    openPage("offers", request.destination.split(",")[0]);
    notify(`Offers opened for ${request.destination}.`);
  };

  const handleOfferAction = (offer) => {
    const nextVisibility = offer.visibility === "Featured" ? offer.catalogType || "Offer" : "Featured";
    setOfferOverrides((current) => ({
      ...current,
      [offer.id]: { visibility: nextVisibility },
    }));
    notify(`${offer.packageName} is now ${nextVisibility.toLowerCase()}.`);
  };

  const handlePaymentAction = (payment) => {
    if (payment.status !== "Completed") {
      setPaymentOverrides((current) => ({
        ...current,
        [payment.id]: { status: "Completed" },
      }));
      notify(`${payment.id} marked as completed.`);
      return;
    }

    notify(`${payment.id} already completed.`);
  };

  const handleRefundAction = (refund) => {
    if (refund.status !== "Completed") {
      setRefundOverrides((current) => ({
        ...current,
        [refund.id]: { status: "Completed" },
      }));
      notify(`${refund.id} review completed.`);
      return;
    }

    notify(`${refund.id} already reviewed.`);
  };

  const handleTicketAction = (ticket) => {
    if (ticket.status !== "Resolved") {
      setTicketOverrides((current) => ({
        ...current,
        [ticket.code]: { status: "Resolved" },
      }));
      notify(`${ticket.code} resolved.`);
      return;
    }

    notify(`${ticket.code} already resolved.`);
  };

  const filteredAgencies = useMemo(() => {
    if (!normalizedQuery) {
      return agencies;
    }

    return agencies.filter((agency) =>
      [agency.name, agency.location, agency.status].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [agencies, normalizedQuery]);

  const filteredRequests = useMemo(() => {
    if (!normalizedQuery) {
      return requests;
    }

    return requests.filter((request) =>
      [
        request.id,
        request.traveler,
        request.destination,
        request.type,
        request.status,
        request.matchedAgency,
      ].some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  }, [normalizedQuery, requests]);

  const filteredOffers = useMemo(() => {
    if (!normalizedQuery) {
      return offers;
    }

    return offers.filter((offer) =>
      [offer.packageName, offer.agency, offer.price, offer.visibility, offer.location].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [normalizedQuery, offers]);

  const filteredPayments = useMemo(() => {
    if (!normalizedQuery) {
      return payments;
    }

    return payments.filter((payment) =>
      [
        payment.id,
        payment.traveler,
        payment.agency,
        payment.amount,
        payment.method,
        payment.status,
      ].some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  }, [normalizedQuery, payments]);

  const filteredTickets = useMemo(() => {
    if (!normalizedQuery) {
      return tickets;
    }

    return tickets.filter((ticket) =>
      [ticket.code, ticket.subject, ticket.owner, ticket.priority, ticket.status].some(
        (value) => value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [normalizedQuery, tickets]);

  const renderStats = () => (
    <section className="admin-stats-grid">
      {currentStats.map((item) => (
        <article key={item.label} className={`admin-stat-card admin-stat-${item.tone}`}>
          <p>{item.label}</p>
          <div>
            <strong>{item.value}</strong>
            <BarChart3 size={28} />
          </div>
          <small>{item.note}</small>
        </article>
      ))}
    </section>
  );

  const renderAgencyTable = (title = "Agency partners") => (
    <AdminSection eyebrow="Agency operations" title={title}>
      <div className="admin-table-card">
        {filteredAgencies.length ? (
          filteredAgencies.map((agency) => (
            <article key={agency.name} className="admin-table-row admin-agency-row">
              <div>
                <strong>{agency.name}</strong>
                <span>{agency.location}</span>
              </div>
              <span>{agency.packages} packages</span>
              <span>{agency.requests} requests</span>
              <span>{agency.rating} rating</span>
              <StatusPill>{agency.status}</StatusPill>
              <button
                type="button"
                className="admin-row-action"
                onClick={() => handleAgencyAction(agency)}
              >
                {agency.status === "Verified" ? "Focus" : "Verify"}
              </button>
            </article>
          ))
        ) : (
          <EmptyResult label="agencies" />
        )}
      </div>
    </AdminSection>
  );

  const renderRequestTable = (title = "Trip requests") => (
    <AdminSection eyebrow="Traveler demand" title={title}>
      <div className="admin-table-card">
        {filteredRequests.length ? (
          filteredRequests.map((request) => (
            <article key={request.id} className="admin-table-row admin-request-row">
              <div>
                <strong>{request.traveler}</strong>
                <span>
                  {request.id} | {request.destination}
                </span>
              </div>
              <span>{request.type}</span>
              <span>{request.budget}</span>
              <StatusPill>{request.status}</StatusPill>
              <button
                type="button"
                className="admin-row-action"
                onClick={() => handleRequestAction(request)}
              >
                {request.status === "Matched" || request.status === "Offer ready" ? "Offers" : "Match"}
              </button>
            </article>
          ))
        ) : (
          <EmptyResult label="requests" />
        )}
      </div>
    </AdminSection>
  );

  const renderOffersGrid = (title = "Package and offer control") => (
    <AdminSection eyebrow="Marketplace" title={title}>
      <div className="admin-offer-grid">
        {filteredOffers.length ? (
          filteredOffers.map((offer) => (
            <article key={offer.packageName} className="admin-offer-card">
              <div>
                <PackageCheck size={20} />
                <StatusPill>{offer.visibility}</StatusPill>
              </div>
              <h3>{offer.packageName}</h3>
              <p>{offer.agency}</p>
              <strong>{offer.price}</strong>
              <span>{offer.bookings} bookings</span>
              <button
                type="button"
                className="admin-card-action"
                onClick={() => handleOfferAction(offer)}
              >
                {offer.visibility === "Featured" ? "Unfeature" : "Feature"}
              </button>
            </article>
          ))
        ) : (
          <EmptyResult label="offers" />
        )}
      </div>
    </AdminSection>
  );

  const renderSupportTickets = (title = "Open support tickets") => (
    <AdminSection eyebrow="Support desk" title={title}>
      <div className="admin-ticket-list">
        {filteredTickets.length ? (
          filteredTickets.map((ticket) => (
            <article key={ticket.code} className="admin-ticket-card">
              <div>
                <strong>{ticket.code}</strong>
                <StatusPill>{ticket.priority}</StatusPill>
              </div>
              <p>{ticket.subject}</p>
              <span>
                {ticket.owner} | {ticket.status}
              </span>
              <button
                type="button"
                className="admin-card-action"
                onClick={() => handleTicketAction(ticket)}
              >
                {ticket.status === "Resolved" ? "Done" : "Resolve"}
              </button>
            </article>
          ))
        ) : (
          <EmptyResult label="tickets" />
        )}
      </div>
    </AdminSection>
  );

  const renderRevenue = () => (
    <AdminSection eyebrow="Revenue" title="Monthly platform flow">
      <div className="admin-revenue-card">
        <div>
          <strong>{revenueSummary.total}</strong>
          <span>{revenueSummary.subtitle}</span>
        </div>
        <div className="admin-chart">
          {revenueBars.map((height, index) => (
            <span key={index} style={{ height: `${height}px` }} />
          ))}
        </div>
      </div>
    </AdminSection>
  );

  const renderOverview = () => (
    <>
      <section className="admin-main-grid">
        <AdminSection
          eyebrow="Platform priorities"
          title="What needs attention"
          action={
            <button
              type="button"
              className="admin-secondary-button"
              onClick={() => {
                openPage("agencies", "Review");
                notify("Agency review rules focused.");
              }}
            >
              <SlidersHorizontal size={16} />
              Manage rules
            </button>
          }
        >
          <div className="admin-alert-list">
            {adminAlerts.map((alert) => (
              <article key={alert.title} className="admin-alert-card">
                <div>
                  <CheckCircle2 size={20} />
                  <StatusPill>{alert.status}</StatusPill>
                </div>
                <h3>{alert.title}</h3>
                <p>{alert.detail}</p>
                <button
                  type="button"
                  className="admin-card-action"
                  onClick={() => openAlertTarget(alert)}
                >
                  Open queue
                </button>
              </article>
            ))}
          </div>
        </AdminSection>

        {renderRevenue()}
      </section>

      <section className="admin-tables-grid">
        {renderAgencyTable("Top agency partners")}
        {renderRequestTable("Latest trip requests")}
      </section>

      <section className="admin-tables-grid admin-bottom-grid">
        {renderOffersGrid("Marketplace packages and offers")}
        {renderSupportTickets("Open support tickets")}
      </section>
    </>
  );

  const renderAgencies = () => (
    <>
      <section className="admin-tables-grid admin-wide-left">
        {renderAgencyTable("All agency partners")}

        <AdminSection eyebrow="Verification" title="Agency verification queue">
          <div className="admin-queue-list">
            {verificationQueue.map((item) => (
              <article key={`${item.agency}-${item.item}`} className="admin-queue-card">
                <div>
                  <strong>{item.agency}</strong>
                  <StatusPill>{item.risk}</StatusPill>
                </div>
                <p>{item.item}</p>
                <span>{item.submitted}</span>
              </article>
            ))}
          </div>
        </AdminSection>
      </section>

      <AdminSection eyebrow="Agency health" title="Partner quality insights">
        <div className="admin-insight-grid">
          {agencyHealthCards.map((item) => (
            <article key={item.title} className="admin-insight-card">
              <p>{item.title}</p>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </div>
      </AdminSection>
    </>
  );

  const renderRequests = () => (
    <>
      <AdminSection eyebrow="Request pipeline" title="Trip request stages">
        <div className="admin-pipeline-grid">
          {requestPipeline.map((item) => (
            <article key={item.stage} className="admin-pipeline-card">
              <span>{item.stage}</span>
              <strong>{item.count}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </AdminSection>

      <section className="admin-tables-grid">
        {renderRequestTable("All traveler trip requests")}

        <AdminSection eyebrow="Demand mix" title="Most requested trip types">
          <div className="admin-insight-grid admin-demand-grid">
            {demandCategories.map((item) => (
              <article key={item.label} className="admin-insight-card">
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.note}</span>
              </article>
            ))}
          </div>
        </AdminSection>
      </section>
    </>
  );

  const renderOffers = () => (
    <>
      {renderOffersGrid("All packages and offers")}

      <AdminSection eyebrow="Offer quality" title="Marketplace quality controls">
        <div className="admin-insight-grid">
          {offerQualityCards.map((item) => (
            <article key={item.title} className="admin-insight-card">
              <p>{item.title}</p>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </div>
      </AdminSection>
    </>
  );

  const renderPayments = () => (
    <>
      <section className="admin-main-grid">
        {renderRevenue()}

        <AdminSection eyebrow="Reviews" title="Payment review queue">
          <div className="admin-ticket-list">
            {refunds.length ? (
              refunds.map((refund) => (
                <article key={refund.id} className="admin-ticket-card">
                  <div>
                    <strong>{refund.id}</strong>
                    <StatusPill>{refund.status}</StatusPill>
                  </div>
                  <p>{refund.traveler}</p>
                  <span>
                    {refund.amount} | {refund.reason}
                  </span>
                  <button
                    type="button"
                    className="admin-card-action"
                    onClick={() => handleRefundAction(refund)}
                  >
                    {refund.status === "Completed" ? "Done" : "Complete review"}
                  </button>
                </article>
              ))
            ) : (
              <EmptyResult label="payment reviews" />
            )}
          </div>
        </AdminSection>
      </section>

      <AdminSection eyebrow="Payments" title="Recent platform payments">
        <div className="admin-table-card">
          {filteredPayments.length ? (
            filteredPayments.map((payment) => (
              <article key={payment.id} className="admin-table-row admin-payment-row">
                <div>
                  <strong>{payment.id}</strong>
                  <span>{payment.traveler}</span>
                </div>
                <span>{payment.agency}</span>
                <span>{payment.amount}</span>
                <span>{payment.method}</span>
                <StatusPill>{payment.status}</StatusPill>
                <button
                  type="button"
                  className="admin-row-action"
                  onClick={() => handlePaymentAction(payment)}
                >
                  {payment.status === "Completed" ? "Receipt" : "Complete"}
                </button>
              </article>
            ))
          ) : (
            <EmptyResult label="payments" />
          )}
        </div>
      </AdminSection>
    </>
  );

  const renderSupport = () => (
    <>
      <section className="admin-tables-grid">
        {renderSupportTickets("Support queue")}

        <AdminSection eyebrow="Channels" title="Support channel health">
          <div className="admin-channel-grid">
            {supportChannels.map((channel) => (
              <article key={channel.name} className="admin-channel-card">
                <Headphones size={20} />
                <p>{channel.name}</p>
                <strong>{channel.volume}</strong>
                <span>{channel.sla}</span>
              </article>
            ))}
          </div>
        </AdminSection>
      </section>

      <AdminSection eyebrow="Escalation flow" title="Support ownership board">
        <div className="admin-pipeline-grid">
          {["Traveler care", "Verification", "Payments", "Agency success"].map((owner) => (
            <article key={owner} className="admin-pipeline-card">
              <span>{owner}</span>
              <strong>{ownerCounts[owner] || 0}</strong>
              <p>Open items assigned from current support data.</p>
            </article>
          ))}
        </div>
      </AdminSection>
    </>
  );

  const renderActivePage = () => {
    if (activePage === "agencies") {
      return renderAgencies();
    }

    if (activePage === "requests") {
      return renderRequests();
    }

    if (activePage === "offers") {
      return renderOffers();
    }

    if (activePage === "payments") {
      return renderPayments();
    }

    if (activePage === "support") {
      return renderSupport();
    }

    return renderOverview();
  };

  return (
    <div className="admin-dashboard-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src={nextTripLogo} alt="NextTrip" decoding="async" />
          <div>
            <h1>NextTrip</h1>
            <p>Admin dashboard</p>
          </div>
        </div>

        <div className="admin-profile-card">
          <span className="admin-profile-icon">
            <ShieldCheck size={22} />
          </span>
          <h2>{adminSummary.name}</h2>
          <p>{adminSummary.role}</p>
          <div>
            <span>{adminSummary.email}</span>
            <span>{adminSummary.region}</span>
          </div>
        </div>

        <nav className="admin-nav">
          {adminNavItems.map((item) => {
            const Icon = navIcons[item.key] || LayoutDashboard;
            const isActive = activePage === item.key;

            return (
              <button
                type="button"
                key={item.key}
                className={`admin-nav-link ${isActive ? "admin-nav-link-active" : ""}`}
                onClick={() => {
                  openPage(item.key);
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">{header.eyebrow}</p>
            <h1>{header.title}</h1>
            <p>{header.description}</p>
          </div>

          <div className="admin-topbar-actions">
            <label className="admin-search">
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={header.search}
              />
            </label>
            <div className="admin-notification-box">
              <button
                type="button"
                className={`admin-icon-button ${
                  showNotifications ? "admin-icon-button-active" : ""
                }`}
                aria-label="Notifications"
                onClick={() => setShowNotifications((current) => !current)}
              >
                <Bell size={20} />
                <span />
              </button>

              {showNotifications && (
                <div className="admin-notification-panel">
                  <strong>Admin alerts</strong>
                  {adminAlerts.map((alert) => (
                    <button
                      type="button"
                      key={alert.title}
                      onClick={() => openAlertTarget(alert)}
                    >
                      <span>{alert.status}</span>
                      {alert.title}
                    </button>
                  ))}
                  {tickets.slice(0, 3).map((ticket) => (
                    <button
                      type="button"
                      key={ticket.code}
                      onClick={() => {
                        openPage("support", ticket.code);
                        notify(`${ticket.code} focused.`);
                      }}
                    >
                      <span>{ticket.priority}</span>
                      {ticket.subject}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {renderStats()}

        <div className="admin-page-content">{renderActivePage()}</div>
      </main>

      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}
