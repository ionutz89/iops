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

export function EmailReveal({ email, className, variant = "link" }: EmailRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRevealed) return;

    setIsVerifying(true);

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        // Fallback: reveal anyway if not configured (e.g., in development)
        setIsRevealed(true);
        setIsVerifying(false);
        return;
      }

      // Wait for grecaptcha to be available
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

          // Timeout after 5 seconds
          setTimeout(() => {
            clearInterval(checkInterval);
            resolve();
          }, 5000);
        }
      });

      // Execute reCAPTCHA v3
      const token = await window.grecaptcha.execute(siteKey, {
        action: "reveal_email",
      });

      if (token) {
        setIsRevealed(true);
      } else {
        console.error("reCAPTCHA verification failed");
      }
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
        className={cn(
          "text-foreground hover:text-primary transition-colors inline-flex items-center gap-2",
          className
        )}
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

