import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { isAuthenticated } from "../utils/authSession";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
}
