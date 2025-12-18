"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "gdpr-consent";

type ConsentValue = "true" | "false" | null;

function getStoredConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "true" || value === "false") return value;
  return null;
}

function setStoredConsent(accepted: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, accepted ? "true" : "false");
  window.dispatchEvent(
    new CustomEvent("gdprConsentChanged", { detail: { accepted } })
  );
}

export function GdprBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (consent === null) {
      // Small delay to prevent layout shift on initial load
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setStoredConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setStoredConsent(false);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 48 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-700/60 bg-zinc-900/95 backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:gap-6 sm:px-6">
            {/* Text */}
            <p className="text-center text-sm leading-relaxed text-zinc-300 sm:text-left">
              We use cookies to enhance your experience and analyze our traffic.
              By visiting this site, you agree to our use of cookies.{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-blue-400 underline underline-offset-2 transition-colors hover:text-blue-300"
              >
                Read Privacy Policy
              </Link>
            </p>

            {/* Buttons */}
            <div className="flex shrink-0 items-center gap-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDecline}
                className="border border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                Essential Only
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="bg-blue-600 text-white hover:bg-blue-500"
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


