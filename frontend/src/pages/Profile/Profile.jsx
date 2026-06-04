import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  CalendarCheck,
  Heart,
  MapPinned,
  PlaneTakeoff,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  bookingRecords,
  getAllTripRequests,
  profileOverview,
} from "../../data/userWorkspaceContent";
import "../../styles/portalPages.css";

export default function Profile() {
  const nextBooking = bookingRecords[0];
  const activeRequest = getAllTripRequests()[0];

  return (
    <div className="portal-page profile-page">
      <Navbar />
      <main className="site-shell portal-main">
        <section className="portal-hero plan-hero profile-hero">
          <div>
            <p className="portal-eyebrow">
              <UserRound size={14} />
              Traveler account
            </p>
            <h1>{profileOverview.name}</h1>
            <p>
              Manage your profile, preferences, booking history, and trip requests from
              one clean traveler workspace.
            </p>
          </div>
          <div className="plan-hero-card">
            <ShieldCheck size={26} />
            <span>{profileOverview.status}</span>
            <strong>Member since {profileOverview.memberSince}</strong>
          </div>
          <div className="portal-actions plan-hero-actions">
            <Link to="/my-bookings" className="portal-btn portal-btn-primary">
              My bookings
            </Link>
            <Link to="/create-trip" className="portal-btn portal-btn-ghost">
              Create trip
            </Link>
          </div>
        </section>

        <section className="profile-command-center">
          <article className="profile-identity-card">
            <div className="profile-avatar">AT</div>
            <span>{profileOverview.status}</span>
            <h2>{profileOverview.name}</h2>
            <p>{profileOverview.email}</p>
            <div className="profile-mini-grid">
              <div>
                <strong>{profileOverview.stats[0].value}</strong>
                <span>{profileOverview.stats[0].label}</span>
              </div>
              <div>
                <strong>{profileOverview.stats[1].value}</strong>
                <span>{profileOverview.stats[1].label}</span>
              </div>
              <div>
                <strong>{profileOverview.stats[2].value}</strong>
                <span>{profileOverview.stats[2].label}</span>
              </div>
            </div>
          </article>

          <article className="profile-detail-card">
            <div className="profile-card-head">
              <div>
                <span className="portal-status">Account details</span>
                <h2>Ready for better offers</h2>
              </div>
              <ShieldCheck size={28} />
            </div>
            <div className="profile-detail-grid">
              {[
                ["Email", profileOverview.email],
                ["Phone", profileOverview.phone],
                ["Home city", profileOverview.homeCity],
                ["Support", "Arabic, French, English"],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="profile-workspace-grid">
          <article className="profile-preferences-card">
            <div className="profile-card-head">
              <div>
                <span className="portal-status">Preferences</span>
                <h2>What agencies should know</h2>
              </div>
              <Heart size={26} />
            </div>
            <div className="profile-preference-grid">
              {profileOverview.preferences.map((item) => (
                <div className="profile-preference-item" key={item.label}>
                  <MapPinned size={16} />
                  <h3>{item.label}</h3>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="profile-timeline-card">
            <div className="profile-card-head">
              <div>
                <span className="portal-status">Activity timeline</span>
                <h2>Next actions</h2>
              </div>
              <Bell size={26} />
            </div>
            <div className="profile-timeline">
              <div>
                <CalendarCheck size={16} />
                <div>
                  <h3>{nextBooking.title}</h3>
                  <p>{nextBooking.nextAction}</p>
                  <Link to="/my-bookings">View booking</Link>
                </div>
              </div>
              <div>
                <PlaneTakeoff size={16} />
                <div>
                  <h3>{activeRequest.title}</h3>
                  <p>{activeRequest.status}</p>
                  <Link
                    to={`/trip-requests/${activeRequest.id}`}
                  >
                    View request
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
