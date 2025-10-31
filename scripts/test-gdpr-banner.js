#!/usr/bin/env node

/**
 * GDPR Banner Diagnostic Script
 *
 * This script helps diagnose why the GDPR cookie consent banner
 * might not be appearing on the production site.
 *
 * Run this in the browser console on iops.pro to diagnose issues.
 */

console.log("=== GDPR BANNER DIAGNOSTIC ===\n");

// 1. Check localStorage
console.log("1. LOCALSTORAGE CHECK:");
try {
  const consent = localStorage.getItem("gdprConsent");
  const preferences = localStorage.getItem("cookiePreferences");

  console.log("   - gdprConsent:", consent || "NOT SET");
  console.log("   - cookiePreferences:", preferences || "NOT SET");

  if (consent) {
    console.log("   ⚠️  ISSUE: Consent already stored. Banner will not show.");
    console.log("   💡 FIX: Run: localStorage.clear(); location.reload()");
  } else {
    console.log("   ✅ No consent stored. Banner should appear.");
  }
} catch (e) {
  console.error("   ❌ localStorage error:", e.message);
}

console.log("\n2. DOM CHECK:");
// 2. Check if component is in DOM
const modal = document.querySelector('[class*="fixed inset-0 z-50"]');
const backdrop = document.querySelector('[class*="bg-black/50 backdrop-blur"]');
const consentModal = document.querySelector(
  '[class*="bg-gray-900/95 backdrop-blur-md"]'
);

console.log("   - Modal container:", modal ? "✅ FOUND" : "❌ NOT FOUND");
console.log("   - Backdrop:", backdrop ? "✅ FOUND" : "❌ NOT FOUND");
console.log("   - Consent modal:", consentModal ? "✅ FOUND" : "❌ NOT FOUND");

if (modal) {
  const styles = window.getComputedStyle(modal);
  console.log("   - Display:", styles.display);
  console.log("   - Opacity:", styles.opacity);
  console.log("   - Z-index:", styles.zIndex);
  console.log("   - Visibility:", styles.visibility);
}

console.log("\n3. COMPONENT CHECK:");
// 3. Check if GdprConsent component is loaded
const scripts = Array.from(document.scripts).map((s) => s.src);
const hasReact = scripts.some((s) => s.includes("react"));
const hasNextJs = scripts.some((s) => s.includes("_next"));

console.log("   - React loaded:", hasReact ? "✅ YES" : "❌ NO");
console.log("   - Next.js loaded:", hasNextJs ? "✅ YES" : "❌ NO");

console.log("\n4. SCRIPT CHECK:");
// 4. Check if analytics scripts are loaded
const gaLoader = document.getElementById("google-analytics-loader");
const gaScript = document.getElementById("google-analytics");
const calendlyScript = document.getElementById("calendly-widget-script");

console.log(
  "   - Google Analytics Loader:",
  gaLoader ? "✅ LOADED" : "❌ NOT LOADED"
);
console.log(
  "   - Google Analytics Script:",
  gaScript ? "✅ LOADED" : "❌ NOT LOADED"
);
console.log(
  "   - Calendly Script:",
  calendlyScript ? "✅ LOADED" : "❌ NOT LOADED"
);

console.log("\n5. ENVIRONMENT CHECK:");
// 5. Check if running in production
console.log("   - Location:", window.location.href);
console.log("   - Protocol:", window.location.protocol);
console.log("   - Host:", window.location.host);

console.log("\n6. HYDRATION CHECK:");
// 6. Check for hydration errors
const hydrationErrors = Array.from(
  document.querySelectorAll("[data-reactroot]")
);
console.log("   - React roots:", hydrationErrors.length);

console.log("\n7. CONSOLE ERRORS:");
console.log("   - Check browser console for any red errors");
console.log('   - Look for "Hydration failed" or "Text content mismatch"');

console.log("\n=== DIAGNOSTIC COMPLETE ===\n");

// Provide actionable recommendations
console.log("📋 RECOMMENDATIONS:");

const consent = localStorage.getItem("gdprConsent");
if (consent) {
  console.log("1. ⚠️  Consent already given. Clear it with:");
  console.log("   localStorage.clear(); location.reload()");
} else if (!modal) {
  console.log("1. ❌ Banner component not in DOM. Possible causes:");
  console.log("   - Component not rendered (check layout.tsx)");
  console.log("   - JavaScript not loaded (check Network tab)");
  console.log("   - Hydration error (check Console for errors)");
} else if (modal && window.getComputedStyle(modal).display === "none") {
  console.log("1. ⚠️  Banner exists but is hidden. Check CSS.");
} else {
  console.log("1. ✅ Everything looks good. Banner should be visible.");
}

console.log("\n💡 QUICK FIXES:");
console.log("- Clear consent: localStorage.clear(); location.reload()");
console.log(
  '- Force open: window.dispatchEvent(new Event("openCookiePreferences"))'
);
console.log("- Test page: /test-gdpr");

console.log("\n");
