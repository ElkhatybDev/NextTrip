import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  MessageSquare,
  PackageCheck,
  PackagePlus,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  WalletCards,
} from "lucide-react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { getWorkspacePage, workspaceNavItems } from "../../data/workspacePages";
import "./WorkspaceEntity.css";

const iconMap = {
  users: UserRound,
  offers: PackagePlus,
  options: SlidersHorizontal,
  availability: CalendarCheck,
  drafts: SlidersHorizontal,
  bookings: CheckCircle2,
  items: PackageCheck,
  quotes: WalletCards,
  notifications: Bell,
  audit: ShieldCheck,
  messages: MessageSquare,
};

function WorkspaceNotFound() {
  return (
    <div className="workspace-page">
      <Navbar />
      <main className="site-shell workspace-main">
        <section className="workspace-empty-card">
          <p className="workspace-eyebrow">Workspace</p>
          <h1>Page not found</h1>
          <p>This workspace page does not exist yet.</p>
          <Link to="/workspace/users" className="workspace-primary-link">
            Open users workspace
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function WorkspaceEntity({ forcedSlug }) {
  const { workspaceSlug } = useParams();
  const activeSlug = forcedSlug || workspaceSlug || "users";
  const page = getWorkspacePage(activeSlug);

  if (!page) {
    return <WorkspaceNotFound />;
  }

  const Icon = iconMap[page.icon] || ShieldCheck;

  return (
    <div className="workspace-page">
      <Navbar />

      <main className="site-shell workspace-main">
        <section className="workspace-hero">
          <div>
            <p className="workspace-eyebrow">
              <Icon size={15} />
              {page.eyebrow}
            </p>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            <div className="workspace-hero-actions">
              <Link to="/dashboard" className="workspace-primary-link">
                Open dashboard
              </Link>
              <Link to="/create-trip" className="workspace-secondary-link">
                Test trip flow
              </Link>
            </div>
          </div>

          <aside className="workspace-hero-card">
            <Icon size={30} />
            <span>{page.status}</span>
            <strong>{page.heroMetric}</strong>
            <p>{page.heroLabel}</p>
          </aside>
        </section>

        <section className="workspace-layout">
          <aside className="workspace-nav-card">
            <span>Model pages</span>
            <div>
              {workspaceNavItems.map((item) => (
                <Link
                  key={item.slug}
                  to={item.to}
                  className={
                    item.slug === page.slug
                      ? "workspace-nav-link active"
                      : "workspace-nav-link"
                  }
                >
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </Link>
              ))}
            </div>
          </aside>

          <div className="workspace-content">
            <div className="workspace-stats-grid">
              {page.stats.map((item) => (
                <article className="workspace-stat-card" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>

            <section className="workspace-records-card">
              <div className="workspace-section-head">
                <div>
                  <p className="workspace-eyebrow">Live records</p>
                  <h2>Examples ready for backend connection</h2>
                </div>
                <CreditCard size={24} />
              </div>

              <div className="workspace-records-grid">
                {page.records.map((record) => (
                  <article className="workspace-record-card" key={record.title}>
                    <div>
                      <span>{record.status}</span>
                      <h3>{record.title}</h3>
                      <small>{record.meta}</small>
                    </div>
                    <p>{record.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="workspace-details-grid">
              <article className="workspace-flow-card">
                <div className="workspace-section-head">
                  <div>
                    <p className="workspace-eyebrow">Flow</p>
                    <h2>How this entity moves</h2>
                  </div>
                  <SlidersHorizontal size={24} />
                </div>
                <div className="workspace-flow-list">
                  {page.workflow.map((step, index) => (
                    <div key={step}>
                      <span>{index + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="workspace-schema-card">
                <div className="workspace-section-head">
                  <div>
                    <p className="workspace-eyebrow">Schema</p>
                    <h2>Backend fields</h2>
                  </div>
                  <ShieldCheck size={24} />
                </div>
                <div className="workspace-field-list">
                  {page.fields.map((field) => (
                    <span key={field}>{field}</span>
                  ))}
                </div>
                <p>
                  These fields are UI placeholders now. Later, the same structure can
                  receive real API data without changing the page layout.
                </p>
              </article>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
