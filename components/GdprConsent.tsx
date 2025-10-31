"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  getConsentStatus,
  setConsentStatus,
} from "@/lib/gdpr-consent";

export function GdprConsent() {
  const [isVisible, setIsVisible] = useState(false);

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
    };

    window.addEventListener("openCookiePreferences", handleOpenPreferences);

    return () => {
      window.removeEventListener("openCookiePreferences", handleOpenPreferences);
    };
  }, []);

  const handleAccept = () => {
    setConsentStatus("accepted");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl p-4 md:p-5"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-300 leading-relaxed">
                  🍪 We use essential cookies to run the site securely.{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Learn more
                  </Link>
                </p>
              </div>
              <Button
                size="sm"
                onClick={handleAccept}
                className="bg-green-600 hover:bg-green-700 text-white w-full"
              >
                Got it
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
