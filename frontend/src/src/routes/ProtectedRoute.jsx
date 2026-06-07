import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { getAuthSession } from "../utils/authSession";

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const session = getAuthSession();
  const requestedPath = `${location.pathname}${location.search}`;

  if (!session?.email) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: requestedPath, role: allowedRoles?.[0] || "traveler" }}
      />
    );
  }

  if (allowedRoles?.length && !allowedRoles.includes(session.role)) {
    return <Navigate to={session.role === "agency" ? "/dashboard" : "/profile"} replace />;
  }

  return children;
}
