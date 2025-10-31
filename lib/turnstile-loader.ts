/**
 * Cloudflare Turnstile Loader Utility
 * Privacy-friendly anti-spam solution that doesn't require cookies
 */

const TURNSTILE_SCRIPT_ID = "turnstile-script";
const TURNSTILE_LOAD_TIMEOUT = 5000;

/**
 * Check if Turnstile script is already loaded
 */
export function isTurnstileLoaded(): boolean {
  if (typeof window === "undefined") return false;
  return !!(document.getElementById(TURNSTILE_SCRIPT_ID) && (window as any).turnstile);
}

/**
 * Load Turnstile script dynamically
 * Returns a promise that resolves when the script is loaded and ready
 */
export function loadTurnstileScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is not available"));
      return;
    }

    // If already loaded, resolve immediately
    if (isTurnstileLoaded()) {
      resolve();
      return;
    }

    // Check if script tag already exists
    let script = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement;

    if (!script) {
      // Create and inject script tag
      script = document.createElement("script");
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // Wait for turnstile to be available
    const checkInterval = setInterval(() => {
      if ((window as any).turnstile) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);

    // Timeout after specified time
    setTimeout(() => {
      clearInterval(checkInterval);
      if ((window as any).turnstile) {
        resolve();
      } else {
        reject(new Error("Turnstile script failed to load within timeout"));
      }
    }, TURNSTILE_LOAD_TIMEOUT);

    // Handle script load errors
    script.onerror = () => {
      clearInterval(checkInterval);
      reject(new Error("Failed to load Turnstile script"));
    };
  });
}

/**
 * Render Turnstile widget
 * Returns the widget ID for later manipulation
 */
export async function renderTurnstile(
  containerId: string,
  onSuccess: (token: string) => void,
  onError?: (error: string) => void
): Promise<string | null> {
  try {
    // Load script if not already loaded
    if (!isTurnstileLoaded()) {
      await loadTurnstileScript();
    }

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      console.error("Turnstile site key not configured");
      onError?.("Turnstile site key not configured");
      return null;
    }

    if (!(window as any).turnstile) {
      console.error("Turnstile not available");
      onError?.("Turnstile not available");
      return null;
    }

    const widgetId = (window as any).turnstile.render(`#${containerId}`, {
      sitekey: siteKey,
      callback: (token: string) => {
        onSuccess(token);
      },
      "error-callback": (error: string) => {
        console.error("Turnstile error:", error);
        onError?.(error);
      },
      theme: "auto", // Auto theme (light/dark)
      size: "normal", // Can be "normal" or "compact"
    });

    return widgetId.toString();
  } catch (error) {
    console.error("Error rendering Turnstile:", error);
    onError?.(String(error));
    return null;
  }
}

/**
 * Execute Turnstile (invisible mode)
 * Returns a promise that resolves with the token
 */
export async function executeTurnstile(): Promise<string | null> {
  return new Promise(async (resolve, reject) => {
    try {
      // Load script if not already loaded
      if (!isTurnstileLoaded()) {
        await loadTurnstileScript();
      }

      const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      if (!siteKey) {
        console.error("Turnstile site key not configured");
        reject(new Error("Turnstile site key not configured"));
        return;
      }

      if (!(window as any).turnstile) {
        console.error("Turnstile not available");
        reject(new Error("Turnstile not available"));
        return;
      }

      // For invisible mode, we need to render a widget first
      // Create a temporary container
      const tempContainer = document.createElement("div");
      tempContainer.id = `turnstile-temp-${Date.now()}`;
      tempContainer.style.display = "none";
      document.body.appendChild(tempContainer);

      const widgetId = (window as any).turnstile.render(`#${tempContainer.id}`, {
        sitekey: siteKey,
        callback: (token: string) => {
          // Clean up temporary container
          document.body.removeChild(tempContainer);
          resolve(token);
        },
        "error-callback": (error: string) => {
          console.error("Turnstile error:", error);
          document.body.removeChild(tempContainer);
          reject(new Error(error));
        },
        theme: "auto",
        size: "invisible", // Invisible mode
      });

      // Execute immediately (invisible mode)
      (window as any).turnstile.execute(`#${tempContainer.id}`);
    } catch (error) {
      console.error("Error executing Turnstile:", error);
      reject(error);
    }
  });
}

/**
 * Reset Turnstile widget
 */
export function resetTurnstile(containerId: string): void {
  if (typeof window === "undefined") return;
  if (!(window as any).turnstile) return;

  try {
    (window as any).turnstile.reset(`#${containerId}`);
  } catch (error) {
    console.error("Error resetting Turnstile:", error);
  }
}

/**
 * Remove Turnstile widget
 */
export function removeTurnstile(containerId: string): void {
  if (typeof window === "undefined") return;
  if (!(window as any).turnstile) return;

  try {
    (window as any).turnstile.remove(`#${containerId}`);
  } catch (error) {
    console.error("Error removing Turnstile:", error);
  }
}

