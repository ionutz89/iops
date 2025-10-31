"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function TestGDPR() {
  useEffect(() => {
    // Clear consent on page load for testing
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("gdprConsent");
      const prefs = localStorage.getItem("cookiePreferences");

      console.log("=== GDPR TEST PAGE ===");
      console.log("Current consent:", consent);
      console.log("Current preferences:", prefs);
    }
  }, []);

  const clearConsent = () => {
    localStorage.clear();
    alert("Consent cleared! Reload the page to see the popup.");
    window.location.reload();
  };

  const openModal = () => {
    window.dispatchEvent(new Event("openCookiePreferences"));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">GDPR Cookie Consent Test</h1>
          <p className="text-muted-foreground mb-8">
            Use this page to test the cookie consent functionality
          </p>
        </div>

        <div className="bg-muted rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Current Status</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <strong>Consent Status:</strong>{" "}
              <span id="consent-status">Loading...</span>
            </div>
            <div>
              <strong>Cookie Preferences:</strong>{" "}
              <span id="preferences-status">Loading...</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={clearConsent}
            className="w-full"
            variant="destructive"
          >
            Clear Consent & Reload
          </Button>

          <Button
            onClick={openModal}
            className="w-full"
            variant="default"
          >
            Open Cookie Preferences Modal
          </Button>

          <Button
            onClick={() => window.location.href = "/"}
            className="w-full"
            variant="outline"
          >
            Go to Homepage
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-6 space-y-2">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">
            💡 Testing Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>Click "Clear Consent & Reload" to reset everything</li>
            <li>After reload, the cookie consent modal should appear</li>
            <li>If it doesn't appear, check the browser console for errors</li>
            <li>You can also click "Open Cookie Preferences Modal" to manually trigger it</li>
          </ol>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-6 space-y-2">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">
            🔍 Console Commands
          </h3>
          <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <p>Open browser console (F12) and try these commands:</p>
            <pre className="bg-black/10 p-2 rounded overflow-x-auto">
              <code>{`// Check consent status
localStorage.getItem('gdprConsent')

// Check preferences
localStorage.getItem('cookiePreferences')

// Clear and reload
localStorage.clear(); location.reload()

// Open modal manually
window.dispatchEvent(new Event("openCookiePreferences"))`}</code>
            </pre>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(() => {
              const consent = localStorage.getItem('gdprConsent');
              const prefs = localStorage.getItem('cookiePreferences');
              document.getElementById('consent-status').textContent = consent || 'null (no consent stored)';
              document.getElementById('preferences-status').textContent = prefs || 'null (no preferences stored)';
            }, 100);
          `,
        }}
      />
    </div>
  );
}

