"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Settings } from "lucide-react";
import {
  getConsentStatus,
  setConsentStatus,
  getCookiePreferences,
  setCookiePreferences,
  loadAnalyticsScripts,
  removeAnalyticsScripts,
  loadCalendlyScripts,
  removeCalendlyScripts,
  type CookiePreferences,
} from "@/lib/gdpr-consent";

export function GdprConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = getConsentStatus();
    const savedPreferences = getCookiePreferences();

    // Debug: Log consent status (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log("GDPR Consent Status:", consentStatus || "no consent stored");
      console.log("Cookie Preferences:", savedPreferences);
    }

    if (!consentStatus) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      // If consent was previously given, load scripts based on preferences
      if (savedPreferences) {
        setPreferences(savedPreferences);
        if (savedPreferences.analytics) {
          loadAnalyticsScripts();
        }
        if (savedPreferences.functional) {
          loadCalendlyScripts();
        }
      } else if (consentStatus === "accepted") {
        // Legacy: if no preferences but consent was accepted, enable all
        const allAccepted: CookiePreferences = {
          essential: true,
          functional: true,
          analytics: true,
          marketing: false,
        };
        setPreferences(allAccepted);
        loadAnalyticsScripts();
        loadCalendlyScripts();
      }
    }

    // Listen for external requests to open preferences
    const handleOpenPreferences = () => {
      setIsVisible(true);
      setShowPreferences(true);
    };

    window.addEventListener("openCookiePreferences", handleOpenPreferences);

    return () => {
      window.removeEventListener("openCookiePreferences", handleOpenPreferences);
    };
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: false,
    };
    setCookiePreferences(allAccepted);
    setPreferences(allAccepted);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setCookiePreferences(essentialOnly);
    setPreferences(essentialOnly);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    setCookiePreferences(preferences);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Essential cookies cannot be disabled
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {!showPreferences ? (
              // Simple consent banner
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-2">
                      Cookie Consent
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      We use essential cookies to run the site. Analytics and
                      scheduling cookies (Calendly) require your consent. You can
                      manage your preferences or accept/reject all.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none"
                  >
                    Accept All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectNonEssential}
                    className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none"
                  >
                    Reject Non-Essential
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreferences(true)}
                    className="bg-transparent hover:bg-gray-800 text-white border-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Preferences
                  </Button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  See our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for details.
                </p>
              </div>
            ) : (
              // Detailed preferences modal
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Cookie Preferences
                  </h2>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Close preferences"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-sm text-gray-300">
                  We use different types of cookies to optimize your experience.
                  You can choose which categories you want to allow.
                </p>

                <div className="space-y-4">
                  {/* Essential Cookies */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">
                          Essential Cookies
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Required for the website to function. Includes security
                          (Cloudflare Turnstile) and session management.
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                          Always Active
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">
                          Functional Cookies
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Enable features like Calendly for scheduling
                          consultations. These cookies are necessary for booking
                          functionality.
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => handleTogglePreference("functional")}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences.functional
                              ? "bg-green-600"
                              : "bg-gray-600"
                          }`}
                          aria-label="Toggle functional cookies"
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.functional
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">
                          Analytics Cookies
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Help us understand how visitors interact with our
                          website (e.g., Google Analytics). Anonymous data only.
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => handleTogglePreference("analytics")}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences.analytics ? "bg-green-600" : "bg-gray-600"
                          }`}
                          aria-label="Toggle analytics cookies"
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.analytics
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 opacity-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">
                          Marketing Cookies
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Currently not used on this website.
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
                          Not Used
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
                  <Button
                    onClick={handleSavePreferences}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex-1"
                  >
                    Save Preferences
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAcceptAll}
                    className="bg-transparent hover:bg-gray-800 text-white border-gray-600 px-6 py-2 rounded-lg font-medium transition-colors flex-1"
                  >
                    Accept All
                  </Button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  Learn more in our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
