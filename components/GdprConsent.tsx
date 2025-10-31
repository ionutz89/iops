"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  getConsentStatus,
  setCookiePreferences,
  type CookiePreferences,
} from "@/lib/gdpr-consent";

export function GdprConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: false,
    preference: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = getConsentStatus();

    if (!consentStatus) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    // Listen for external requests to open banner
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
      preference: true,
    };
    setCookiePreferences(allAccepted);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      functional: false,
      preference: false,
    };
    setCookiePreferences(essentialOnly);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    setCookiePreferences(preferences);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Essential cannot be toggled
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
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-lg"
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl p-5 md:p-6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {!showPreferences ? (
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We use essential cookies for security. Other cookies (like Calendly or preferences) load only with your consent.{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Learn more
                    </Link>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                  >
                    Accept all
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleRejectNonEssential}
                    variant="outline"
                    className="w-full border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-500"
                  >
                    Reject non-essential
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowPreferences(true)}
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                  >
                    Manage preferences
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Cookie Preferences
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Essential</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Security and session management (always enabled)
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled
                          className="w-4 h-4 rounded border-gray-600 bg-gray-700 cursor-not-allowed opacity-50"
                        />
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Functional</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Calendly scheduling
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={() => handleTogglePreference("functional")}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-700 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Preference</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Theme and cookie choices
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.preference}
                          onChange={() => handleTogglePreference("preference")}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-700 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    onClick={handleSavePreferences}
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                  >
                    Save preferences
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowPreferences(false)}
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                  >
                    Back
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
