"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailRevealProps {
  email: string;
  className?: string;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function EmailReveal({ email, className }: EmailRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRevealed) return;

    // Check if we're on localhost - reveal immediately without reCAPTCHA
    const isLocalhost = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
       window.location.hostname === '127.0.0.1' ||
       window.location.hostname.includes('192.168.'));

    if (isLocalhost) {
      setIsRevealed(true);
      return;
    }

    setIsVerifying(true);

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        // Fallback: reveal anyway if not configured (e.g., in development)
        setIsRevealed(true);
        setIsVerifying(false);
        return;
      }

      // Wait for grecaptcha to be available (shorter timeout)
      await new Promise<void>((resolve) => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => resolve());
        } else {
          // Wait for script to load
          const checkInterval = setInterval(() => {
            if (window.grecaptcha) {
              window.grecaptcha.ready(() => {
                clearInterval(checkInterval);
                resolve();
              });
            }
          }, 100);

          // Timeout after 3 seconds (reduced from 5)
          setTimeout(() => {
            clearInterval(checkInterval);
            resolve();
          }, 3000);
        }
      });

      // Execute reCAPTCHA v3
      const token = await window.grecaptcha.execute(siteKey, {
        action: "reveal_email",
      }).catch(() => null); // Catch any errors and return null

      // Always reveal email (graceful degradation)
      setIsRevealed(true);
    } catch (error) {
      console.error("Error verifying reCAPTCHA:", error);
      // Fallback: reveal email on error (graceful degradation)
      setIsRevealed(true);
    } finally {
      setIsVerifying(false);
    }
  };

  if (isVerifying) {
    return (
      <span className={cn("text-muted-foreground text-sm", className)}>
        Verifying...
      </span>
    );
  }

  if (isRevealed) {
    return (
      <a
        href={`mailto:${email}`}
        onClick={(e) => {
          // Ensure the mailto link works - don't prevent default
          // Just stop propagation to avoid any parent handlers
          e.stopPropagation();
        }}
        className={cn(
          "text-foreground hover:text-primary transition-colors inline-flex items-center gap-2",
          className
        )}
        aria-label={`Send email to ${email}`}
      >
        <Mail className="h-4 w-4" />
        {email}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 cursor-pointer",
        className
      )}
      aria-label="Click to reveal email address"
    >
      <Mail className="h-4 w-4" />
      <span>Click to reveal email</span>
    </button>
  );
}

