import { apiRequest } from "./apiClient";

export function subscribeNewsletter(payload) {
  return apiRequest("/newsletter", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
