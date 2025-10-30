"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  getConsentStatus,
  setConsentStatus,
  loadAnalyticsScripts,
  removeAnalyticsScripts,
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
    } else {
      // If consent was previously given, load analytics scripts
      if (consentStatus === "accepted") {
        loadAnalyticsScripts();
      }
    }
  }, []);

  const handleAcceptAll = () => {
    setConsentStatus("accepted");
    loadAnalyticsScripts();
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    setConsentStatus("rejected");
    removeAnalyticsScripts();
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
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-2xl md:ml-auto"
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col gap-4"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex-1">
              <p className="text-sm md:text-base text-white leading-relaxed">
                We use cookies and collect limited personal data to improve your
                experience. You can accept or reject non-essential cookies. See our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-400 hover:text-blue-300 underline font-medium"
                >
                  Privacy Policy
                </Link>{" "}
                for details.
              </p>
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
                asChild
                className="bg-transparent hover:bg-gray-800 text-white border-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none"
              >
                <Link href="/privacy-policy">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

