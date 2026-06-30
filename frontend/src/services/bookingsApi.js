import { apiRequest, authHeaders } from "./apiClient";
import { getAuthSession } from "../utils/authSession";

export function createBooking(payload, token = getAuthSession()?.token) {
  return apiRequest("/bookings", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function fetchBookings(token = getAuthSession()?.token) {
  return apiRequest("/bookings", {
    headers: authHeaders(token),
  });
}
