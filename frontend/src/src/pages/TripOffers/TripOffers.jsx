import React from "react";
import { Navigate, useParams } from "react-router-dom";

export default function TripOffers() {
  const { requestId } = useParams();

  return <Navigate to={`/trip-requests/${requestId}/sent`} replace />;
}
