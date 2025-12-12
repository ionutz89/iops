import { Mail, Phone, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactInfoProps {
  email: string;
  phone?: string;
  className?: string;
  variant?: "inline" | "stacked";
}

/**
 * ContactInfo - Displays email and phone transparently for B2B trust
 * No click-to-reveal friction - direct visibility builds credibility
 */
export function EmailReveal({
  email,
  phone,
  className,
  variant = "inline",
}: ContactInfoProps) {
  return (
    <span
      className={cn(
        "inline-flex gap-4",
        variant === "stacked" ? "flex-col" : "flex-row flex-wrap items-center",
        className
      )}
    >
      {/* Email Link - Always Visible */}
      <a
        href={`mailto:${email}`}
        className={cn(
          "inline-flex items-center gap-2 text-foreground hover:text-primary",
          "dark:text-blue-400 dark:hover:text-blue-300",
          "transition-colors duration-200 group"
        )}
        aria-label={`Send email to ${email}`}
      >
        <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="font-medium">{email}</span>
      </a>

      {/* Phone Link - Always Visible (if provided) */}
      {phone && (
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className={cn(
            "inline-flex items-center gap-2 text-foreground hover:text-primary",
            "dark:text-blue-400 dark:hover:text-blue-300",
            "transition-colors duration-200 group"
          )}
          aria-label={`Call ${phone}`}
        >
          <Phone className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="font-medium">{phone}</span>
        </a>
      )}
    </span>
  );
}

/**
 * ContactCard - Enhanced version for prominent display (e.g., contact page)
 * Includes copy-to-clipboard functionality for better UX
 */
export function ContactCard({
  email,
  phone,
  className,
}: ContactInfoProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-card p-6 space-y-4",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-foreground">Direct Contact</h3>

      {/* Email with copy button */}
      <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50">
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors"
        >
          <Mail className="h-5 w-5 text-primary" />
          <span className="font-medium">{email}</span>
        </a>
        <CopyButton text={email} label="Copy email" />
      </div>

      {/* Phone with copy button */}
      {phone && (
        <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-5 w-5 text-primary" />
            <span className="font-medium">{phone}</span>
          </a>
          <CopyButton text={phone} label="Copy phone" />
        </div>
      )}
    </div>
  );
}

/**
 * CopyButton - Copies text to clipboard with visual feedback
 */
function CopyButton({ text, label }: { text: string; label: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // Visual feedback is handled by CSS :active state
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "p-2 rounded-md text-muted-foreground hover:text-foreground",
        "hover:bg-muted transition-colors duration-200",
        "active:scale-95 active:text-primary"
      )}
      aria-label={label}
      title={label}
    >
      <Copy className="h-4 w-4" />
    </button>
  );
}
