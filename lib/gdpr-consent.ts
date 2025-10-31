/**
 * GDPR Consent Management Utility
 * Handles user consent for cookies and tracking scripts
 */

export type ConsentStatus = "accepted" | "rejected" | null;

export interface CookiePreferences {
  essential: boolean; // Always true, required for site functionality (Cloudflare Turnstile, session)
  functional: boolean; // Calendly scheduling service
  preference: boolean; // Theme selection, cookie consent choices
}

const STORAGE_KEY = "gdprConsent";
const PREFERENCES_KEY = "cookiePreferences";

/**
 * Get the current consent status from localStorage
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "accepted" || stored === "rejected") {
    return stored;
  }
  return null;
}

/**
 * Set the consent status in localStorage
 */
export function setConsentStatus(status: ConsentStatus): void {
  if (typeof window === "undefined") return;

  if (status === null) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, status);
  }

  // Dispatch custom event to notify other parts of the app
  window.dispatchEvent(new CustomEvent("gdprConsentChanged", { detail: { status } }));
}

/**
 * Check if user has accepted all cookies (analytics enabled)
 */
export function hasAcceptedCookies(): boolean {
  return getConsentStatus() === "accepted";
}

/**
 * Check if user has explicitly rejected non-essential cookies
 */
export function hasRejectedNonEssential(): boolean {
  return getConsentStatus() === "rejected";
}

/**
 * Clear/reset consent status (useful for testing or if user wants to change their choice)
 */
export function clearConsentStatus(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(PREFERENCES_KEY);
  removeCalendlyScripts();
  // Dispatch event to notify other parts of the app
  window.dispatchEvent(new CustomEvent("gdprConsentChanged", { detail: { status: null } }));
}

/**
 * Get granular cookie preferences
 */
export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(PREFERENCES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as CookiePreferences;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Set granular cookie preferences
 */
export function setCookiePreferences(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));

  // Set overall consent status based on preferences
  const hasNonEssential = preferences.functional || preferences.preference;
  setConsentStatus(hasNonEssential ? "accepted" : "rejected");

  // Load or remove scripts based on preferences
  if (preferences.functional) {
    loadCalendlyScripts();
  } else {
    removeCalendlyScripts();
  }

  // Dispatch custom event
  window.dispatchEvent(
    new CustomEvent("cookiePreferencesChanged", { detail: { preferences } })
  );
}

/**
 * Load Calendly scripts if functional consent is given
 */
export function loadCalendlyScripts(): void {
  if (typeof window === "undefined") return;

  // Check if Calendly is already loaded
  if (document.getElementById("calendly-widget-script")) return;

  // Load Calendly widget script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.id = "calendly-widget-script";
  document.head.appendChild(script);

  // Load Calendly CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://assets.calendly.com/assets/external/widget.css";
  link.id = "calendly-widget-css";
  document.head.appendChild(link);
}

/**
 * Remove Calendly scripts if consent is revoked
 */
export function removeCalendlyScripts(): void {
  if (typeof window === "undefined") return;

  // Remove Calendly scripts and styles
  const calendlyScript = document.getElementById("calendly-widget-script");
  const calendlyCSS = document.getElementById("calendly-widget-css");

  if (calendlyScript) calendlyScript.remove();
  if (calendlyCSS) calendlyCSS.remove();

  // Clear Calendly global object if it exists
  if ((window as any).Calendly) {
    delete (window as any).Calendly;
  }
}

