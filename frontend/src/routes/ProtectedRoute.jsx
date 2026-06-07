import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { getAuthSession } from "../utils/authSession";

const roleHomePaths = {
  agency: "/agency-dashboard",
  admin: "/nexttrip-dashboard",
  traveler: "/traveler-dashboard",
};

function getRoleHomePath(role) {
  return roleHomePaths[role] || roleHomePaths.traveler;
}

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
    return <Navigate to={getRoleHomePath(session.role)} replace />;
  }

  return children;
}
