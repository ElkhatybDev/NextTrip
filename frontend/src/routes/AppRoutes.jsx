import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// pages
import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import Packages from "../pages/Packages/Packages";
import PackageDetails from "../pages/PackageDetails/PackageDetails";
import CreateTrip from "../pages/CreateTrip/CreateTrip";
import BookingDetails from "../pages/BookingDetails/BookingDetails";
import BookingSuccess from "../pages/BookingSuccess/BookingSuccess";
import Dashboard from "../pages/Dashboard/Dashboard";
import Agency from "../pages/Agency/Agency";
import TravelExperience from "../pages/TravelExperience/TravelExperience";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
return (
    <BrowserRouter>
    <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/auth" element={<Auth />} />

        {/* Packages */}
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} />

        {/* Trip */}
        <Route path="/create-trip" element={<CreateTrip />} />

        {/* Booking */}
        <Route path="/booking" element={<BookingDetails />} />
        <Route path="/success" element={<BookingSuccess />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Agency */}
        <Route path="/agency" element={<Agency />} />

        {/* Experience */}
        <Route path="/experience" element={<TravelExperience />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

    </Routes>
    </BrowserRouter>
);
}

export default AppRoutes;