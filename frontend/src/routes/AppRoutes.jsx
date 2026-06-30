import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

import Chatbot from "../components/Chatbot/Chatbot";
import ProtectedRoute from "./ProtectedRoute";
import {
  getSavedLanguageCode,
  LANGUAGE_CHANGE_EVENT,
  startSiteLanguageRuntime,
} from "../i18n/siteLanguage";

const Home = lazy(() => import("../pages/Home/Home"));
const Auth = lazy(() => import("../pages/Auth/Auth"));
const Packages = lazy(() => import("../pages/Packages/Packages"));
const PackageDetails = lazy(() => import("../pages/PackageDetails/PackageDetails"));
const CreateTrip = lazy(() => import("../pages/CreateTrip/CreateTrip"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const BookingSuccess = lazy(() => import("../pages/BookingSuccess/BookingSuccess"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard/AdminDashboard"));
const TravelerDashboard = lazy(() => import("../pages/TravelerDashboard/TravelerDashboard"));
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
const TripRequestDetails = lazy(() => import("../pages/TripRequestDetails/TripRequestDetails"));
const TripRequestSent = lazy(() => import("../pages/TripRequestSent/TripRequestSent"));
const TripRequestEdit = lazy(() => import("../pages/TripRequestEdit/TripRequestEdit"));
const TripOffers = lazy(() => import("../pages/TripOffers/TripOffers"));
const TripBooking = lazy(() => import("../pages/TripBooking/TripBooking"));
const AgencyRequestForm = lazy(() => import("../pages/AgencyRequestForm/AgencyRequestForm"));
const Services = lazy(() => import("../pages/Services/Services"));
const ServiceDetails = lazy(() => import("../pages/ServiceDetails/ServiceDetails"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

function protect(element, allowedRoles) {
  return <ProtectedRoute allowedRoles={allowedRoles}>{element}</ProtectedRoute>;
}

const mainRoutes = [
  { path: "/", element: <Home /> },
  { path: "/auth", element: <Auth /> },
  { path: "/agency-dashboard", element: protect(<Dashboard />, ["agency"]) },
  { path: "/nexttrip-dashboard", element: protect(<AdminDashboard />) },
];

const packageRoutes = [
  { path: "/packages", element: <Packages /> },
  { path: "/offers", element: <Packages variant="offers" /> },
  { path: "/packages/:id", element: <PackageDetails /> },
  { path: "/create-trip", element: protect(<CreateTrip />, ["traveler"]) },
  { path: "/trip-requests/:requestId/sent", element: <TripRequestSent /> },
  { path: "/trip-requests/:requestId/edit", element: <TripRequestEdit /> },
  { path: "/trip-requests/:requestId/offers", element: <TripOffers /> },
  { path: "/trip-requests/:requestId/booking", element: <TripBooking /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/checkout/:packageId", element: <Checkout /> },
  { path: "/booking-success", element: <BookingSuccess /> },
  { path: "/booking-success/:packageId", element: <BookingSuccess /> },
];

const travelerRoutes = [
  { path: "/traveler-dashboard", element: protect(<TravelerDashboard />, ["traveler"]) },
  { path: "/profile", element: protect(<TravelerDashboard initialSection="profile" />, ["traveler"]) },
  { path: "/my-bookings", element: protect(<TravelerDashboard initialSection="reservations" />, ["traveler"]) },
  { path: "/trip-requests/:requestId", element: protect(<TripRequestDetails />) },
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
  { path: "/experiences", to: "/experience" },
  { path: "/travel-experience", to: "/experience" },
  { path: "/agencies", to: "/agency" },
  { path: "/dashboard", to: "/agency-dashboard" },
  { path: "/booking", to: "/packages" },
  { path: "/success", to: "/booking-success" },
  { path: "/booking-details", to: "/checkout" },
  { path: "/trip-builder", to: "/create-trip" },
  { path: "/account", to: "/profile" },
  { path: "/bookings", to: "/my-bookings" },
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

const backToTopLabels = {
  fra: "Retour en haut",
  eng: "Back to top",
  ara: "العودة للأعلى",
};

function getBackToTopLabel(languageCode) {
  return backToTopLabels[languageCode] || backToTopLabels.fra;
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [languageCode, setLanguageCode] = useState(() => getSavedLanguageCode());
  const isVisibleRef = useRef(false);
  const frameRef = useRef(0);
  const label = getBackToTopLabel(languageCode);

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

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguageCode(event.detail?.code || getSavedLanguageCode());
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);

    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top ${isVisible ? "back-to-top-visible" : ""}`}
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <ArrowUp size={20} />
      <span>{label}</span>
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
