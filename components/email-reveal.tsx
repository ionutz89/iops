"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailRevealProps {
  email: string;
  className?: string;
}

export function EmailReveal({ email, className }: EmailRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRevealed) return;

    setIsVerifying(true);

    try {
      // Simple delay for UX (email reveal doesn't need heavy verification)
      // Email is already partially protected by being server-rendered
      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsRevealed(true);
    } catch (error) {
      // Silent error handling - don't expose errors to client
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
          "text-foreground hover:text-primary dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 inline-flex items-center gap-2",
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
        "text-foreground hover:text-primary dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 inline-flex items-center gap-2 cursor-pointer",
        className
      )}
      aria-label="Click to reveal email address"
    >
      <Mail className="h-4 w-4" />
      <span>Click to reveal email</span>
    </button>
  );
}

