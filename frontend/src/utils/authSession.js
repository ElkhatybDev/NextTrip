const AUTH_SESSION_KEY = "nexttrip_auth_session";

export function getAuthSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedSession = window.localStorage.getItem(AUTH_SESSION_KEY);
    return storedSession ? JSON.parse(storedSession) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAuthSession()?.email);
}

export function saveAuthSession(session) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      AUTH_SESSION_KEY,
      JSON.stringify({
        email: session.email,
        role: session.role || "traveler",
        signedInAt: new Date().toISOString(),
      })
    );
  } catch {
    // Browsers can block storage in private or restricted sessions.
  }
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(AUTH_SESSION_KEY);
  } catch {
    // Keep sign-out from crashing if storage is unavailable.
  }
}
