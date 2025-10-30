"use client";

import { useEffect } from "react";
import { getConsentStatus, loadAnalyticsScripts } from "@/lib/gdpr-consent";

/**
 * Client component that conditionally loads analytics scripts
 * based on user consent status
 */
export function AnalyticsLoader() {
  useEffect(() => {
    // Check consent status and load analytics if accepted
    const consentStatus = getConsentStatus();
    if (consentStatus === "accepted") {
      loadAnalyticsScripts();
    }

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent) => {
      if (event.detail?.status === "accepted") {
        loadAnalyticsScripts();
      }
    };

    window.addEventListener("gdprConsentChanged", handleConsentChange as EventListener);

    return () => {
      window.removeEventListener("gdprConsentChanged", handleConsentChange as EventListener);
    };
  }, []);

  return null;
}

