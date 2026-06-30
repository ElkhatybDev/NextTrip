import { apiRequest, authHeaders } from "./apiClient";
import { getAuthSession } from "../utils/authSession";

export function createTripRequest(payload, token = getAuthSession()?.token) {
  return apiRequest("/trip-requests", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function fetchTripRequests(token = getAuthSession()?.token) {
  return apiRequest("/trip-requests", {
    headers: authHeaders(token),
  });
}

export function fetchTripRequest(id, token = getAuthSession()?.token) {
  return apiRequest(`/trip-requests/${id}`, {
    headers: authHeaders(token),
  });
}

export function createTripOffer(id, payload, token = getAuthSession()?.token) {
  return apiRequest(`/trip-requests/${id}/offers`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}
