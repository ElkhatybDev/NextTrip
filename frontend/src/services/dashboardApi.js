import { apiRequest, authHeaders } from "./apiClient";
import { getAuthSession } from "../utils/authSession";

export function fetchTravelerDashboard(token = getAuthSession()?.token) {
  return apiRequest("/dashboards/traveler", {
    headers: authHeaders(token),
  });
}

export function fetchAgencyDashboard(token = getAuthSession()?.token) {
  return apiRequest("/dashboards/agency", {
    headers: authHeaders(token),
  });
}

export function fetchAdminDashboard(token = getAuthSession()?.token) {
  return apiRequest("/dashboards/admin", {
    headers: authHeaders(token),
  });
}
