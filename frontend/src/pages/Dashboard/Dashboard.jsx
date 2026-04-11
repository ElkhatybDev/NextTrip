import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck2,
  Package,
  MessageSquare,
  BarChart3,
  Search,
  Bell,
  Plus,
  Filter,
  Download,
  CheckCircle2,
  Archive,
  Send,
  MapPin,
  Clock3,
  DollarSign,
  ChevronRight,
  Star,
  X,
} from "lucide-react";
import "./Dashboard.css";

const navItems = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "bookings", label: "Bookings", icon: CalendarCheck2 },
  { key: "packages", label: "Packages", icon: Package },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

const bookingSeed = [
  {
    id: 1,
    client: "Yassine El Idrissi",
    tier: "Platinum Member",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=240&q=80",
    destination: "Amalfi Coast, Italy",
    interest: "Luxury Villa • Private Boat Tour",
    budget: "$12,000 - $15,000",
    dates: "Sept 12 - Sept 24",
    duration: "12 days",
    status: "pending",
  },
  {
    id: 2,
    client: "Salma Alaoui",
    tier: "New Client",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=80",
    destination: "Kyoto, Japan",
    interest: "Cultural Discovery • Food Tour",
    budget: "$8,500 - $10,000",
    dates: "Oct 05 - Oct 15",
    duration: "10 days",
    status: "pending",
  },
  {
    id: 3,
    client: "Imane Bennis",
    tier: "Repeat Traveler",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80",
    destination: "Reykjavik, Iceland",
    interest: "Adventure • Northern Lights",
    budget: "$5,000 - $7,000",
    dates: "Nov 20 - Nov 28",
    duration: "8 days",
    status: "review",
  },
];

const packageSeed = [
  {
    id: 1,
    title: "Bali Luxury Escape",
    place: "Ubud, Bali",
    price: "$3,200",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Santorini Sunset Romance",
    place: "Santorini, Greece",
    price: "$2,950",
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Swiss Alpine Retreat",
    place: "Zermatt, Switzerland",
    price: "$4,850",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80",
  },
];

const messageSeed = [
  {
    id: 1,
    from: "Yassine El Idrissi",
    subject: "Need 2 premium villa options",
    preview:
      "Please send me options with private transfer and sea view included.",
    unread: true,
  },
  {
    id: 2,
    from: "Salma Alaoui",
    subject: "Can we add more food experiences?",
    preview: "I want a stronger culinary focus in the Kyoto itinerary.",
    unread: true,
  },
  {
    id: 3,
    from: "Imane Bennis",
    subject: "Best dates for Northern Lights",
    preview: "Is late November a good time for visibility and activities?",
    unread: false,
  },
];

function filterBookings(bookings, query, filter) {
  const normalizedQuery = query.trim().toLowerCase();

  return bookings.filter((booking) => {
    const matchesQuery =
      !normalizedQuery ||
      [booking.client, booking.destination, booking.interest, booking.tier].some(
        (value) => value.toLowerCase().includes(normalizedQuery)
      );

    const matchesFilter = filter === "all" ? true : booking.status === filter;

    return matchesQuery && matchesFilter;
  });
}

function StatusBadge({ children, tone = "neutral" }) {
  const map = {
    neutral: "status-neutral",
    orange: "status-orange",
    green: "status-green",
    blue: "status-blue",
  };

  return <span className={`status-badge ${map[tone]}`}>{children}</span>;
}

function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="section-title">
      <div>
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default function Dashboard() {
  const [page, setPage] = useState("overview");
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState(bookingSeed);
  const [packages, setPackages] = useState(packageSeed);
  const [messages, setMessages] = useState(messageSeed);
  const [toast, setToast] = useState("");
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [bookingFilter, setBookingFilter] = useState("all");
  const [packageForm, setPackageForm] = useState({
    title: "",
    place: "",
    price: "",
  });
  const [packageFile, setPackageFile] = useState(null);
  const [messageForm, setMessageForm] = useState({
    subject: "",
    body: "",
  });

  const toastTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const notify = (text) => {
    setToast(text);

    if (toastTimerRef.current !== null) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => setToast(""), 2200);
  };

  const unreadCount = messages.filter((message) => message.unread).length;
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;
  const activePackages = packages.filter(
    (travelPackage) => travelPackage.status === "Active"
  ).length;

  const bookingStats = {
    all: bookings.length,
    pending: bookings.filter((booking) => booking.status === "pending").length,
    review: bookings.filter((booking) => booking.status === "review").length,
  };

  const filteredBookings = useMemo(
    () => filterBookings(bookings, search, bookingFilter),
    [bookings, search, bookingFilter]
  );

  const filteredPackages = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();

    return packages.filter(
      (travelPackage) =>
        !normalizedQuery ||
        [travelPackage.title, travelPackage.place, travelPackage.status].some(
          (value) => value.toLowerCase().includes(normalizedQuery)
        )
    );
  }, [packages, search]);

  const filteredMessages = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();

    return messages.filter(
      (message) =>
        !normalizedQuery ||
        [message.from, message.subject, message.preview].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
    );
  }, [messages, search]);

  const submitOffer = (id) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === id ? { ...booking, status: "review" } : booking
      )
    );
    setPage("bookings");
    setBookingFilter("review");
    notify("Offer submitted successfully.");
  };

  const markRead = (id) => {
    setMessages((previous) =>
      previous.map((message) =>
        message.id === id ? { ...message, unread: false } : message
      )
    );
    notify("Message marked as read.");
  };

  const archiveMessage = (id) => {
    setMessages((previous) =>
      previous.filter((message) => message.id !== id)
    );
    notify("Message archived.");
  };

  const createPackage = () => {
    if (!packageForm.title || !packageForm.place || !packageForm.price) {
      notify("Fill package title, place and price.");
      return;
    }

    const uploadedImage = packageFile ? URL.createObjectURL(packageFile) : "";

    setPackages((previous) => [
      {
        id: Date.now(),
        title: packageForm.title,
        place: packageForm.place,
        price: packageForm.price,
        status: "Draft",
        image:
          uploadedImage ||
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
      },
      ...previous,
    ]);

    setPackageForm({ title: "", place: "", price: "" });
    setPackageFile(null);
    setShowPackageModal(false);
    setPage("packages");
    notify("Package created.");
  };

  const sendMessage = () => {
    if (!messageForm.subject || !messageForm.body) {
      notify("Write a subject and message.");
      return;
    }

    setMessages((previous) => [
      {
        id: Date.now(),
        from: "You",
        subject: messageForm.subject,
        preview: messageForm.body,
        unread: false,
      },
      ...previous,
    ]);

    setMessageForm({ subject: "", body: "" });
    setShowMessageModal(false);
    setPage("messages");
    notify("Message sent.");
  };

  const renderBookingsSection = () => (
    <section className="dashboard-section">
      <SectionTitle
        title="Recent booking requests"
        subtitle="Your latest client inquiries ready for action"
        action={
          <div className="booking-actions">
            <button
              type="button"
              onClick={() => setBookingFilter("all")}
              className={`filter-pill ${
                bookingFilter === "all" ? "filter-pill-active-blue" : ""
              }`}
            >
              All ({bookingStats.all})
            </button>
            <button
              type="button"
              onClick={() => setBookingFilter("pending")}
              className={`filter-pill ${
                bookingFilter === "pending" ? "filter-pill-active-orange" : ""
              }`}
            >
              Pending ({bookingStats.pending})
            </button>
            <button
              type="button"
              onClick={() => setBookingFilter("review")}
              className={`filter-pill ${
                bookingFilter === "review" ? "filter-pill-active-review" : ""
              }`}
            >
              Review ({bookingStats.review})
            </button>
            <button
              type="button"
              onClick={() => notify("Bookings exported.")}
              className="secondary-btn"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        }
      />

      <div className="booking-list">
        {filteredBookings.length === 0 ? (
          <div className="empty-box">No bookings found for this filter.</div>
        ) : (
          filteredBookings.map((item) => (
            <div key={item.id} className="booking-card">
              <div className="booking-card-inner">
                <div className="booking-client">
                  <img src={item.avatar} alt={item.client} />
                  <div>
                    <h4>{item.client}</h4>
                    <p>{item.tier}</p>
                  </div>
                </div>

                <div className="booking-grid">
                  <div>
                    <span>Destination</span>
                    <p className="booking-main-text">
                      <MapPin size={16} className="icon-orange" />
                      {item.destination}
                    </p>
                    <small>{item.interest}</small>
                  </div>

                  <div>
                    <span>Budget</span>
                    <p className="booking-main-text">
                      <DollarSign size={16} className="icon-green" />
                      {item.budget}
                    </p>
                  </div>

                  <div>
                    <span>Dates</span>
                    <p className="booking-main-text no-icon">{item.dates}</p>
                  </div>

                  <div>
                    <span>Duration</span>
                    <p className="booking-main-text">
                      <Clock3 size={16} className="icon-blue" />
                      {item.duration}
                    </p>
                  </div>
                </div>

                <div className="booking-right">
                  <StatusBadge
                    tone={item.status === "pending" ? "orange" : "blue"}
                  >
                    {item.status}
                  </StatusBadge>

                  <button
                    type="button"
                    onClick={() => submitOffer(item.id)}
                    className="primary-btn"
                  >
                    Submit offer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );

  const renderPackagesSection = () => (
    <section className="dashboard-section">
      <SectionTitle
        title="Featured packages"
        subtitle="Curated travel products ready to sell"
        action={
          <button
            type="button"
            onClick={() => setShowPackageModal(true)}
            className="primary-btn"
          >
            <Plus size={16} />
            Add package
          </button>
        }
      />

      <div className="packages-grid">
        {filteredPackages.map((item) => (
          <div key={item.id} className="package-card">
            <img src={item.image} alt={item.title} className="package-image" />

            <div className="package-content">
              <div className="package-top">
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.place}</p>
                </div>
                <StatusBadge tone={item.status === "Active" ? "green" : "blue"}>
                  {item.status}
                </StatusBadge>
              </div>

              <div className="package-bottom">
                <strong>{item.price}</strong>
                <button
                  type="button"
                  onClick={() => notify(`${item.title} opened.`)}
                  className="secondary-btn"
                >
                  View details
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderMessagesSection = () => (
    <section className="dashboard-section">
      <SectionTitle
        title="Latest messages"
        subtitle="Stay close to your travelers and answer faster"
        action={
          <button
            type="button"
            onClick={() => setShowMessageModal(true)}
            className="primary-btn"
          >
            <Send size={16} />
            New message
          </button>
        }
      />

      <div className="messages-list">
        {filteredMessages.map((item) => (
          <div key={item.id} className="message-card">
            <div className="message-left">
              <div className="message-head">
                <h4>{item.from}</h4>
                {item.unread ? (
                  <StatusBadge tone="blue">Unread</StatusBadge>
                ) : (
                  <StatusBadge tone="green">Read</StatusBadge>
                )}
              </div>
              <p className="message-subject">{item.subject}</p>
              <p className="message-preview">{item.preview}</p>
            </div>

            <div className="message-actions">
              <button
                type="button"
                onClick={() => markRead(item.id)}
                className="secondary-btn"
              >
                <CheckCircle2 size={16} />
                Mark read
              </button>
              <button
                type="button"
                onClick={() => archiveMessage(item.id)}
                className="secondary-btn"
              >
                <Archive size={16} />
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <h1>Next <span className="spantrip">Trip</span> Agency</h1>
            <p>Professional travel workspace</p>
          </div>

          <div className="agency-box">
            <div className="agency-top">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=220&q=80"
                alt="Agency"
              />
              <div>
                <h3>Atlas Voyages</h3>
                <p>Verified Partner</p>
              </div>
            </div>

            <div className="agency-rating">
              <Star size={16} fill="white" />
              4.9 rating • 128 luxury trips
            </div>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = page === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setPage(item.key)}
                  className={`sidebar-link ${active ? "sidebar-link-active" : ""}`}
                >
                  <span className="sidebar-link-left">
                    <Icon size={20} />
                    {item.label}
                  </span>

                  {item.key === "messages" && unreadCount > 0 ? (
                    <span className="sidebar-badge">{unreadCount}</span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <button
              type="button"
              onClick={() => setShowPackageModal(true)}
              className="primary-btn full-btn"
            >
              <Plus size={16} />
              Create package
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-topbar">
            <div>
              <h2>
                {page === "overview" && "Dashboard Overview"}
                {page === "bookings" && "Bookings Management"}
                {page === "packages" && "Packages Library"}
                {page === "messages" && "Client Messages"}
                {page === "analytics" && "Performance Analytics"}
              </h2>
              <p>
                Monitor requests, manage offers, and keep your agency workflow
                organized.
              </p>
            </div>

            <div className="topbar-actions">
              <div className="search-box">
                <Search size={16} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search anything..."
                />
              </div>

              <div className="relative-box">
                <button
                  type="button"
                  onClick={() => {
                    setPage("bookings");
                    setShowFilterMenu((previous) => !previous);
                  }}
                  className="secondary-btn topbar-btn"
                >
                  <Filter size={16} />
                  Filter
                </button>

                {showFilterMenu ? (
                  <div className="dropdown-menu filter-menu">
                    <button
                      type="button"
                      onClick={() => {
                        setBookingFilter("all");
                        setShowFilterMenu(false);
                        notify("All bookings selected.");
                      }}
                      className={`dropdown-item ${
                        bookingFilter === "all" ? "dropdown-item-active-blue" : ""
                      }`}
                    >
                      All bookings
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingFilter("pending");
                        setShowFilterMenu(false);
                        notify("Pending bookings selected.");
                      }}
                      className={`dropdown-item ${
                        bookingFilter === "pending"
                          ? "dropdown-item-active-orange"
                          : ""
                      }`}
                    >
                      Pending bookings
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingFilter("review");
                        setShowFilterMenu(false);
                        notify("Review bookings selected.");
                      }}
                      className={`dropdown-item ${
                        bookingFilter === "review"
                          ? "dropdown-item-active-review"
                          : ""
                      }`}
                    >
                      Review bookings
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="relative-box">
                <button
                  type="button"
                  onClick={() => setShowNotifications((previous) => !previous)}
                  className="icon-btn"
                >
                  <Bell size={20} />
                  {unreadCount > 0 ? <span className="notification-dot" /> : null}
                </button>

                {showNotifications ? (
                  <div className="dropdown-menu notifications-menu">
                    <div className="dropdown-header">
                      <h4>Notifications</h4>
                      <p>Recent activity in your workspace</p>
                    </div>

                    <div className="dropdown-body">
                      <button
                        type="button"
                        onClick={() => {
                          setPage("messages");
                          setShowNotifications(false);
                        }}
                        className="notification-item"
                      >
                        <p>You have {unreadCount} unread message(s)</p>
                        <small>Open inbox and reply faster</small>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPage("bookings");
                          setBookingFilter("pending");
                          setShowNotifications(false);
                        }}
                        className="notification-item"
                      >
                        <p>{pendingBookings} pending booking request(s)</p>
                        <small>Review and send offers</small>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPage("packages");
                          setShowNotifications(false);
                        }}
                        className="notification-item"
                      >
                        <p>{activePackages} active package(s)</p>
                        <small>Check your package library</small>
                      </button>
                    </div>

                    <div className="dropdown-footer">
                      <button
                        type="button"
                        onClick={() => setShowNotifications(false)}
                        className="primary-btn full-btn"
                      >
                        Close notifications
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <section className="stats-grid">
              <button
                type="button"
                onClick={() => setPage("bookings")}
                className="stat-card"
              >
                <p>Pending bookings</p>
                <div className="stat-card-row">
                  <h3>{pendingBookings}</h3>
                  <CalendarCheck2 size={32} />
                </div>
                <small>Active agency opportunities</small>
              </button>

              <button
                type="button"
                onClick={() => setPage("packages")}
                className="stat-card stat-card-orange"
              >
                <p>Active packages</p>
                <div className="stat-card-row">
                  <h3>{activePackages}</h3>
                  <Package size={32} />
                </div>
                <small>Keep your offers fresh</small>
              </button>

              <button
                type="button"
                onClick={() => setPage("messages")}
                className="stat-card"
              >
                <p>Unread messages</p>
                <div className="stat-card-row">
                  <h3>{unreadCount}</h3>
                  <MessageSquare size={32} />
                </div>
                <small>Fast replies improve conversions</small>
              </button>
            </section>

            {(page === "overview" || page === "bookings") &&
              renderBookingsSection()}
            {(page === "overview" || page === "packages") &&
              renderPackagesSection()}
            {(page === "overview" || page === "messages") &&
              renderMessagesSection()}

            {page === "analytics" ? (
              <section className="analytics-grid">
                <div className="analytics-card">
                  <p>Conversion rate</p>
                  <h3>24.8%</h3>
                  <small>+4.1% this month</small>
                </div>

                <div className="analytics-card">
                  <p>Average package value</p>
                  <h3>$3,940</h3>
                  <small>Premium travel segment</small>
                </div>

                <div className="analytics-card">
                  <p>Response time</p>
                  <h3>42m</h3>
                  <small>Faster than last week</small>
                </div>

                <div className="analytics-chart-card">
                  <SectionTitle
                    title="Monthly performance"
                    subtitle="A simple visual overview of your agency activity"
                  />
                  <div className="analytics-chart">
                    {[70, 100, 85, 130, 115, 160, 145, 180, 155, 210, 175, 230].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="chart-bar"
                          style={{ height: `${height}px` }}
                        />
                      )
                    )}
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </main>
      </div>

      {showPackageModal ? (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Create new package</h3>
              <button
                type="button"
                onClick={() => setShowPackageModal(false)}
                className="close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <input
                value={packageForm.title}
                onChange={(event) =>
                  setPackageForm({ ...packageForm, title: event.target.value })
                }
                placeholder="Package title"
                className="modal-input"
              />
              <input
                value={packageForm.place}
                onChange={(event) =>
                  setPackageForm({ ...packageForm, place: event.target.value })
                }
                placeholder="Destination"
                className="modal-input"
              />
              <input
                value={packageForm.price}
                onChange={(event) =>
                  setPackageForm({ ...packageForm, price: event.target.value })
                }
                placeholder="Price"
                className="modal-input"
              />

              <div className="upload-box">
                <label>Upload image from your device</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    setPackageFile(file);
                  }}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setShowPackageModal(false)}
                className="secondary-btn"
              >
                Cancel
              </button>
              <button type="button" onClick={createPackage} className="primary-btn">
                Save package
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showMessageModal ? (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>New message</h3>
              <button
                type="button"
                onClick={() => setShowMessageModal(false)}
                className="close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <input
                value={messageForm.subject}
                onChange={(event) =>
                  setMessageForm({ ...messageForm, subject: event.target.value })
                }
                placeholder="Subject"
                className="modal-input"
              />
              <textarea
                value={messageForm.body}
                onChange={(event) =>
                  setMessageForm({ ...messageForm, body: event.target.value })
                }
                placeholder="Write your message..."
                rows={6}
                className="modal-input modal-textarea"
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setShowMessageModal(false)}
                className="secondary-btn"
              >
                Cancel
              </button>
              <button type="button" onClick={sendMessage} className="primary-btn">
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? <div className="toast-box">{toast}</div> : null}
    </div>
  );
}