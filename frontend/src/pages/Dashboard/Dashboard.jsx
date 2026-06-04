import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  bookingSeed,
  defaultPackageImage,
  messageSeed,
  packageSeed,
} from "../../data/dashboardContent";
import AnalyticsSection from "./components/AnalyticsSection";
import BookingsSection from "./components/BookingsSection";
import CreatePackageModal from "./components/CreatePackageModal";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardTopbar from "./components/DashboardTopbar";
import MessagesSection from "./components/MessagesSection";
import NewMessageModal from "./components/NewMessageModal";
import PackagesSection from "./components/PackagesSection";
import StatsGrid from "./components/StatsGrid";
import {
  filterBookings,
  filterMessages,
  filterPackages,
  getBookingStats,
} from "./dashboardUtils";
import "./Dashboard.css";

const emptyPackageForm = {
  title: "",
  place: "",
  price: "",
};

const emptyMessageForm = {
  subject: "",
  body: "",
};

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
  const [packageForm, setPackageForm] = useState(emptyPackageForm);
  const [packageFile, setPackageFile] = useState(null);
  const [messageForm, setMessageForm] = useState(emptyMessageForm);

  const toastTimerRef = useRef(null);
  const uploadedPackageUrlsRef = useRef(new Set());

  useEffect(() => {
    const uploadedPackageUrls = uploadedPackageUrlsRef.current;

    return () => {
      if (toastTimerRef.current !== null) {
        clearTimeout(toastTimerRef.current);
      }

      uploadedPackageUrls.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));
      uploadedPackageUrls.clear();
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
  const pendingBookings = bookings.filter((booking) => booking.status === "pending").length;
  const activePackages = packages.filter(
    (travelPackage) => travelPackage.status === "Active"
  ).length;

  const bookingStats = useMemo(() => getBookingStats(bookings), [bookings]);
  const filteredBookings = useMemo(
    () => filterBookings(bookings, search, bookingFilter),
    [bookings, search, bookingFilter]
  );
  const filteredPackages = useMemo(
    () => filterPackages(packages, search),
    [packages, search]
  );
  const filteredMessages = useMemo(
    () => filterMessages(messages, search),
    [messages, search]
  );

  const submitOffer = (id) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === id ? { ...booking, status: "review" } : booking
      )
    );
    setPage("bookings");
    setBookingFilter("review");
    notify("Agency offer sent to traveler.");
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
    setMessages((previous) => previous.filter((message) => message.id !== id));
    notify("Message archived.");
  };

  const updatePackageForm = (field, value) => {
    setPackageForm((previous) => ({ ...previous, [field]: value }));
  };

  const updateMessageForm = (field, value) => {
    setMessageForm((previous) => ({ ...previous, [field]: value }));
  };

  const createPackage = () => {
    if (!packageForm.title || !packageForm.place || !packageForm.price) {
      notify("Fill package title, place, and price.");
      return;
    }

    const uploadedImage = packageFile ? URL.createObjectURL(packageFile) : "";

    if (uploadedImage) {
      uploadedPackageUrlsRef.current.add(uploadedImage);
    }

    setPackages((previous) => [
      {
        id: Date.now(),
        title: packageForm.title,
        place: packageForm.place,
        price: packageForm.price,
        status: "Draft",
        image: uploadedImage || defaultPackageImage,
      },
      ...previous,
    ]);

    setPackageForm(emptyPackageForm);
    setPackageFile(null);
    setShowPackageModal(false);
    setPage("packages");
    notify("Agency package created.");
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

    setMessageForm(emptyMessageForm);
    setShowMessageModal(false);
    setPage("messages");
    notify("Traveler message sent.");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <DashboardSidebar
          activePage={page}
          unreadCount={unreadCount}
          onPageChange={setPage}
          onCreatePackage={() => setShowPackageModal(true)}
        />

        <main className="dashboard-main">
          <DashboardTopbar
            page={page}
            search={search}
            bookingFilter={bookingFilter}
            unreadCount={unreadCount}
            pendingBookings={pendingBookings}
            activePackages={activePackages}
            showFilterMenu={showFilterMenu}
            showNotifications={showNotifications}
            onSearchChange={setSearch}
            onPageChange={setPage}
            onBookingFilterChange={setBookingFilter}
            onToggleFilter={(forcedValue) =>
              setShowFilterMenu((previous) =>
                typeof forcedValue === "boolean" ? forcedValue : !previous
              )
            }
            onToggleNotifications={() =>
              setShowNotifications((previous) => !previous)
            }
            onCloseNotifications={() => setShowNotifications(false)}
            notify={notify}
          />

          <div className="dashboard-content">
            <StatsGrid
              pendingBookings={pendingBookings}
              activePackages={activePackages}
              unreadCount={unreadCount}
              onPageChange={setPage}
            />

            {(page === "overview" || page === "bookings") && (
              <BookingsSection
                bookings={filteredBookings}
                bookingFilter={bookingFilter}
                bookingStats={bookingStats}
                onBookingFilterChange={setBookingFilter}
                onSubmitOffer={submitOffer}
                onExport={() => notify("Traveler requests exported.")}
              />
            )}

            {(page === "overview" || page === "packages") && (
              <PackagesSection
                packages={filteredPackages}
                onCreatePackage={() => setShowPackageModal(true)}
                onViewDetails={(item) => notify(`${item.title} ready for agency edits.`)}
              />
            )}

            {(page === "overview" || page === "messages") && (
              <MessagesSection
                messages={filteredMessages}
                onCreateMessage={() => setShowMessageModal(true)}
                onMarkRead={markRead}
                onArchive={archiveMessage}
              />
            )}

            {page === "analytics" ? <AnalyticsSection /> : null}
          </div>
        </main>
      </div>

      {showPackageModal ? (
        <CreatePackageModal
          form={packageForm}
          onFormChange={updatePackageForm}
          onFileChange={setPackageFile}
          onClose={() => setShowPackageModal(false)}
          onSubmit={createPackage}
        />
      ) : null}

      {showMessageModal ? (
        <NewMessageModal
          form={messageForm}
          onFormChange={updateMessageForm}
          onClose={() => setShowMessageModal(false)}
          onSubmit={sendMessage}
        />
      ) : null}

      {toast ? <div className="toast-box">{toast}</div> : null}
    </div>
  );
}
