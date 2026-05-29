import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import Packages from "../pages/Packages/Packages";
import PackageDetails from "../pages/PackageDetails/PackageDetails";
import CreateTrip from "../pages/CreateTrip/CreateTrip";
import Checkout from "../pages/Checkout/Checkout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Agency from "../pages/Agency/Agency";
import AgencyDetails from "../pages/AgencyDetails/AgencyDetails";
import TravelExperience from "../pages/TravelExperience/TravelExperience";
import ExperienceDetails from "../pages/ExperienceDetails/ExperienceDetails";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Support from "../pages/Support/Support";
import Privacy from "../pages/Privacy/Privacy";
import Terms from "../pages/Terms/Terms";
import FAQ from "../pages/FAQ/FAQ";
import CancellationPolicy from "../pages/CancellationPolicy/CancellationPolicy";
import RefundPolicy from "../pages/RefundPolicy/RefundPolicy";
import TravelStyle from "../pages/TravelStyle/TravelStyle";
import Destinations from "../pages/Destinations/Destinations";
import Reviews from "../pages/Reviews/Reviews";
import HowItWorks from "../pages/HowItWorks/HowItWorks";
import Profile from "../pages/Profile/Profile";
import MyBookings from "../pages/MyBookings/MyBookings";
import TripRequestDetails from "../pages/TripRequestDetails/TripRequestDetails";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import WorkspaceEntity from "../pages/WorkspaceEntity/WorkspaceEntity";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";

function protect(element) {
  return <ProtectedRoute>{element}</ProtectedRoute>;
}

const mainRoutes = [
  { path: "/", element: <Home /> },
  { path: "/auth", element: <Auth /> },
  { path: "/dashboard", element: protect(<Dashboard />) },
];

const packageRoutes = [
  { path: "/packages", element: <Packages /> },
  { path: "/packages/:id", element: <PackageDetails /> },
  { path: "/create-trip", element: <CreateTrip /> },
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
  { path: "/booking", to: "/packages" },
  { path: "/success", to: "/packages" },
  { path: "/booking-details", to: "/packages" },
  { path: "/booking-success", to: "/packages" },
  { path: "/trip-builder", to: "/create-trip" },
  { path: "/account", to: "/profile" },
  { path: "/bookings", to: "/my-bookings" },
  { path: "/users", to: "/workspace/users" },
  { path: "/offers", to: "/workspace/offers" },
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

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
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
    </BrowserRouter>
  );
}

export default AppRoutes;
