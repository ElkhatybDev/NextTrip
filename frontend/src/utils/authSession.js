const AUTH_SESSION_KEY = "nexttrip_auth_session";

function notifyAuthSessionChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event("nexttrip:auth-session-changed"));
}

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
  return Boolean(getAuthSession()?.token);
}

export function saveAuthSession(session) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      AUTH_SESSION_KEY,
      JSON.stringify({
        token: session.token,
        tokenType: session.tokenType || session.token_type || "Bearer",
        user: session.user || null,
        email: session.user?.email || session.email,
        role: session.user?.role || session.role || "traveler",
        signedInAt: new Date().toISOString(),
      })
    );
    notifyAuthSessionChanged();
  } catch {
    // Browsers can block storage in private or restricted sessions.
  }
}

export function getAuthToken() {
  return getAuthSession()?.token || null;
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(AUTH_SESSION_KEY);
    notifyAuthSessionChanged();
  } catch {
    // Keep sign-out from crashing if storage is unavailable.
  }
}
