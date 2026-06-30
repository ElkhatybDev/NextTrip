import { apiRequest, authHeaders } from "./apiClient";
import { getAuthSession } from "../utils/authSession";

export function login(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function signup(payload) {
  return apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function socialAuth(payload) {
  return apiRequest("/auth/social", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchCurrentUser(token = getAuthSession()?.token) {
  return apiRequest("/auth/me", {
    headers: authHeaders(token),
  });
}

export function logout(token = getAuthSession()?.token) {
  return apiRequest("/auth/logout", {
    method: "POST",
    headers: authHeaders(token),
  });
}
