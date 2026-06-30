const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiError(
      "Backend unavailable. Start the Laravel API server on http://127.0.0.1:8000.",
      {
        status: 0,
        data: {
          message: "Backend unavailable. Start the Laravel API server on http://127.0.0.1:8000.",
        },
      }
    );
  }
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(data?.message || "Request failed", {
      status: response.status,
      data,
    });
  }

  return data;
}

export function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
