import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

import Chatbot from "../components/Chatbot/Chatbot";
import ProtectedRoute from "./ProtectedRoute";
import { startSiteLanguageRuntime } from "../i18n/siteLanguage";

const Home = lazy(() => import("../pages/Home/Home"));
const Auth = lazy(() => import("../pages/Auth/Auth"));
const Packages = lazy(() => import("../pages/Packages/Packages"));
const PackageDetails = lazy(() => import("../pages/PackageDetails/PackageDetails"));
const CreateTrip = lazy(() => import("../pages/CreateTrip/CreateTrip"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard/AdminDashboard"));
const Agency = lazy(() => import("../pages/Agency/Agency"));
const AgencyDetails = lazy(() => import("../pages/AgencyDetails/AgencyDetails"));
const TravelExperience = lazy(() => import("../pages/TravelExperience/TravelExperience"));
const ExperienceDetails = lazy(() => import("../pages/ExperienceDetails/ExperienceDetails"));
const About = lazy(() => import("../pages/About/About"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Support = lazy(() => import("../pages/Support/Support"));
const Privacy = lazy(() => import("../pages/Privacy/Privacy"));
const Terms = lazy(() => import("../pages/Terms/Terms"));
const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
const CancellationPolicy = lazy(() => import("../pages/CancellationPolicy/CancellationPolicy"));
const RefundPolicy = lazy(() => import("../pages/RefundPolicy/RefundPolicy"));
const TravelStyle = lazy(() => import("../pages/TravelStyle/TravelStyle"));
const Destinations = lazy(() => import("../pages/Destinations/Destinations"));
const Reviews = lazy(() => import("../pages/Reviews/Reviews"));
const HowItWorks = lazy(() => import("../pages/HowItWorks/HowItWorks"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const MyBookings = lazy(() => import("../pages/MyBookings/MyBookings"));
const TripRequestDetails = lazy(() => import("../pages/TripRequestDetails/TripRequestDetails"));
const TripRequestSent = lazy(() => import("../pages/TripRequestSent/TripRequestSent"));
const TripRequestEdit = lazy(() => import("../pages/TripRequestEdit/TripRequestEdit"));
const TripOffers = lazy(() => import("../pages/TripOffers/TripOffers"));
const TripBooking = lazy(() => import("../pages/TripBooking/TripBooking"));
const AgencyRequestForm = lazy(() => import("../pages/AgencyRequestForm/AgencyRequestForm"));
const Services = lazy(() => import("../pages/Services/Services"));
const ServiceDetails = lazy(() => import("../pages/ServiceDetails/ServiceDetails"));
const WorkspaceEntity = lazy(() => import("../pages/WorkspaceEntity/WorkspaceEntity"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

function protect(element, allowedRoles) {
  return <ProtectedRoute allowedRoles={allowedRoles}>{element}</ProtectedRoute>;
}

const mainRoutes = [
  { path: "/", element: <Home /> },
  { path: "/auth", element: <Auth /> },
  { path: "/dashboard", element: protect(<Dashboard />) },
  { path: "/nexttrip-dashboard", element: protect(<AdminDashboard />) },
];

const packageRoutes = [
  { path: "/packages", element: <Packages /> },
  { path: "/offers", element: <Packages variant="offers" /> },
  { path: "/packages/:id", element: <PackageDetails /> },
  { path: "/create-trip", element: <CreateTrip /> },
  { path: "/trip-requests/:requestId/sent", element: <TripRequestSent /> },
  { path: "/trip-requests/:requestId/edit", element: <TripRequestEdit /> },
  { path: "/trip-requests/:requestId/offers", element: <TripOffers /> },
  { path: "/trip-requests/:requestId/booking", element: <TripBooking /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/checkout/:packageId", element: <Checkout /> },
];

const travelerRoutes = [
  { path: "/profile", element: protect(<Profile />) },
  { path: "/my-bookings", element: protect(<MyBookings />) },
  { path: "/trip-requests/:requestId", element: protect(<TripRequestDetails />) },
];

const workspaceRoutes = [
  { path: "/workspace", element: protect(<WorkspaceEntity forcedSlug="users" />) },
  { path: "/workspace/:workspaceSlug", element: protect(<WorkspaceEntity />) },
];

const discoveryRoutes = [
  { path: "/agency", element: <Agency /> },
  { path: "/agency/requests/:requestId", element: protect(<AgencyRequestForm />, ["agency"]) },
  { path: "/agency/:agencyId", element: <AgencyDetails /> },
  { path: "/agencies/:agencyId", element: <AgencyDetails /> },
  { path: "/experience", element: <TravelExperience /> },
  { path: "/experience/:id", element: <ExperienceDetails /> },
  { path: "/destinations", element: <Destinations /> },
  { path: "/reviews", element: <Reviews /> },
  { path: "/how-it-works", element: <HowItWorks /> },
  { path: "/travel-styles", element: <Navigate to="/travel-styles/individual" replace /> },
  { path: "/travel-styles/:styleSlug", element: <TravelStyle /> },
  { path: "/services", element: <Services /> },
  { path: "/services/:serviceSlug", element: <ServiceDetails /> },
];

const infoRoutes = [
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/support", element: <Support /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/terms", element: <Terms /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/cancellation-policy", element: <CancellationPolicy /> },
  { path: "/refund-policy", element: <RefundPolicy /> },
];

const legacyRedirects = [
  { path: "/about-us", to: "/about" },
  { path: "/help", to: "/support" },
  { path: "/admin", to: "/nexttrip-dashboard" },
  { path: "/admin-dashboard", to: "/nexttrip-dashboard" },
  { path: "/nexttrip-admin", to: "/nexttrip-dashboard" },
  { path: "/experiences", to: "/experience" },
  { path: "/travel-experience", to: "/experience" },
  { path: "/agencies", to: "/agency" },
  { path: "/booking", to: "/packages" },
  { path: "/success", to: "/packages" },
  { path: "/booking-details", to: "/checkout" },
  { path: "/booking-success", to: "/my-bookings" },
  { path: "/trip-builder", to: "/create-trip" },
  { path: "/account", to: "/profile" },
  { path: "/bookings", to: "/my-bookings" },
  { path: "/users", to: "/workspace/users" },
  { path: "/offer-options", to: "/workspace/offer-options" },
  { path: "/inventory", to: "/workspace/availability" },
  { path: "/availability", to: "/workspace/availability" },
  { path: "/trip-drafts", to: "/workspace/trip-drafts" },
  { path: "/admin-bookings", to: "/workspace/bookings" },
  { path: "/booking-items", to: "/workspace/booking-items" },
  { path: "/price-quotes", to: "/workspace/price-quotes" },
  { path: "/notifications", to: "/workspace/notifications" },
  { path: "/audit-logs", to: "/workspace/audit-logs" },
  { path: "/conversations", to: "/workspace/conversations" },
  { path: "/messages", to: "/workspace/conversations" },
  { path: "/chat", to: "/workspace/conversations" },
  { path: "/payment", to: "/checkout" },
];

function renderRoutes(routeList) {
  return routeList.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function LanguageRuntime() {
  useEffect(() => startSiteLanguageRuntime(), []);

  return null;
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const updateVisibility = () => {
      const nextIsVisible = window.scrollY > 420;

      if (isVisibleRef.current !== nextIsVisible) {
        isVisibleRef.current = nextIsVisible;
        setIsVisible(nextIsVisible);
      }
    };

    const handleScroll = () => {
      if (frameRef.current) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        updateVisibility();
      });
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top ${isVisible ? "back-to-top-visible" : ""}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <ArrowUp size={20} />
      <span>Back to top</span>
    </button>
  );
}

function RouteFallback() {
  return (
    <div className="route-loading-shell" aria-hidden="true">
      <span />
    </div>
  );
}

function RouteViews() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="route-page-transition">
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          {renderRoutes(mainRoutes)}
          {renderRoutes(packageRoutes)}
          {renderRoutes(travelerRoutes)}
          {renderRoutes(workspaceRoutes)}
          {renderRoutes(discoveryRoutes)}
          {renderRoutes(infoRoutes)}

          {legacyRedirects.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<Navigate to={route.to} replace />}
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <LanguageRuntime />
      <ScrollToTop />
      <RouteViews />
      <BackToTopButton />
      <Chatbot />
    </BrowserRouter>
  );
}

export default AppRoutes;
