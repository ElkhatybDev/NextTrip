import { apiRequest, authHeaders } from "./apiClient";
import { getAuthSession } from "../utils/authSession";

function authOptions(options = {}) {
  return {
    ...options,
    headers: {
      ...authHeaders(getAuthSession()?.token),
      ...(options.headers || {}),
    },
  };
}

export function updateProfile(payload) {
  return apiRequest("/profile", authOptions({
    method: "PATCH",
    body: JSON.stringify(payload),
  }));
}

export function updateAgencyProfile(payload) {
  return apiRequest("/agency/profile", authOptions({
    method: "PATCH",
    body: JSON.stringify(payload),
  }));
}

export function createAgencyPackage(payload) {
  return apiRequest("/agency/packages", authOptions({
    method: "POST",
    body: JSON.stringify(payload),
  }));
}

export function updatePackageStatus(id, status) {
  return apiRequest(`/packages/${id}`, authOptions({
    method: "PATCH",
    body: JSON.stringify({ status }),
  }));
}

export function deletePackage(id) {
  return apiRequest(`/packages/${id}`, authOptions({ method: "DELETE" }));
}

export function updateBookingStatus(id, status) {
  return apiRequest(`/bookings/${id}/status`, authOptions({
    method: "PATCH",
    body: JSON.stringify({ status }),
  }));
}

export function updateTripRequestStatus(id, status) {
  return apiRequest(`/trip-requests/${id}/status`, authOptions({
    method: "PATCH",
    body: JSON.stringify({ status }),
  }));
}

export function updateTripOfferStatus(id, status) {
  return apiRequest(`/trip-offers/${id}/status`, authOptions({
    method: "PATCH",
    body: JSON.stringify({ status }),
  }));
}

export function updateUserStatus(id, status) {
  return apiRequest(`/admin/users/${id}/status`, authOptions({
    method: "PATCH",
    body: JSON.stringify({ status }),
  }));
}

export function updateAgencyStatus(id, status) {
  return apiRequest(`/admin/agencies/${id}/status`, authOptions({
    method: "PATCH",
    body: JSON.stringify({ status }),
  }));
}

export function fetchReceiptDownload(id) {
  return apiRequest(`/receipts/${id}/download`, authOptions());
}
