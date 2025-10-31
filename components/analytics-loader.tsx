"use client";

import { useEffect } from "react";
import {
  getConsentStatus,
  getCookiePreferences,
  loadCalendlyScripts,
} from "@/lib/gdpr-consent";

/**
 * Client component that conditionally loads functional scripts (Calendly)
 * based on user consent status and preferences
 */
export function AnalyticsLoader() {
  useEffect(() => {
    // Check consent status and preferences
    const consentStatus = getConsentStatus();
    const preferences = getCookiePreferences();

    if (consentStatus === "accepted" && preferences) {
      // Load Calendly if functional cookies are enabled
      if (preferences.functional) {
        loadCalendlyScripts();
      }
    }

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent) => {
      if (event.detail?.status === "accepted") {
        const prefs = getCookiePreferences();
        if (prefs?.functional) {
          loadCalendlyScripts();
        }
      }
    };

    // Listen for preference changes
    const handlePreferenceChange = (event: CustomEvent) => {
      const prefs = event.detail?.preferences;
      if (prefs?.functional) {
        loadCalendlyScripts();
      }
    };

    window.addEventListener("gdprConsentChanged", handleConsentChange as EventListener);
    window.addEventListener("cookiePreferencesChanged", handlePreferenceChange as EventListener);

    return () => {
      window.removeEventListener("gdprConsentChanged", handleConsentChange as EventListener);
      window.removeEventListener("cookiePreferencesChanged", handlePreferenceChange as EventListener);
    };
  }, []);

  return null;
}

