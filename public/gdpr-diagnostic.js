/**
 * GDPR Cookie Banner Diagnostic Tool
 *
 * Copy and paste this entire script into the browser console on iops.pro
 * to diagnose why the cookie consent banner is not appearing.
 *
 * Usage:
 * 1. Open iops.pro in your browser
 * 2. Press F12 to open DevTools
 * 3. Go to Console tab
 * 4. Copy and paste this entire file
 * 5. Press Enter
 * 6. Follow the recommendations
 */

(function () {
  console.clear();
  console.log(
    "%c=== GDPR COOKIE BANNER DIAGNOSTIC ===",
    "color: #00ff00; font-size: 16px; font-weight: bold"
  );
  console.log("Running diagnostic checks...\n");

  const results = {
    errors: [],
    warnings: [],
    info: [],
    success: [],
  };

  // 1. Check localStorage
  console.log("%c1. LOCALSTORAGE CHECK", "color: #00aaff; font-weight: bold");
  try {
    const consent = localStorage.getItem("gdprConsent");
    const preferences = localStorage.getItem("cookiePreferences");

    console.log("   gdprConsent:", consent || "null");
    console.log("   cookiePreferences:", preferences || "null");

    if (consent) {
      results.warnings.push("Consent already stored. Banner will not show.");
      console.log(
        "%c   ⚠️  Consent already stored: " + consent,
        "color: #ffaa00"
      );
      console.log(
        "%c   💡 To see banner: localStorage.clear(); location.reload()",
        "color: #00aaff"
      );
    } else {
      results.success.push("No consent stored. Banner should appear.");
      console.log(
        "%c   ✅ No consent stored. Banner should appear.",
        "color: #00ff00"
      );
    }

    if (preferences) {
      try {
        const prefs = JSON.parse(preferences);
        console.log("   Parsed preferences:", prefs);
      } catch (e) {
        results.errors.push("Invalid preferences JSON");
        console.log("%c   ❌ Invalid preferences JSON", "color: #ff0000");
      }
    }
  } catch (e) {
    results.errors.push("localStorage error: " + e.message);
    console.log("%c   ❌ localStorage error: " + e.message, "color: #ff0000");
  }

  // 2. Check DOM
  console.log("\n%c2. DOM CHECK", "color: #00aaff; font-weight: bold");
  const modal = document.querySelector('[class*="fixed inset-0 z-50"]');
  const backdrop = document.querySelector(
    '[class*="bg-black/50 backdrop-blur"]'
  );
  const consentModal = document.querySelector(
    '[class*="bg-gray-900/95 backdrop-blur-md"]'
  );

  console.log("   Modal container:", modal ? "✅ FOUND" : "❌ NOT FOUND");
  console.log("   Backdrop:", backdrop ? "✅ FOUND" : "❌ NOT FOUND");
  console.log("   Consent modal:", consentModal ? "✅ FOUND" : "❌ NOT FOUND");

  if (modal) {
    results.success.push("Modal component found in DOM");
    const styles = window.getComputedStyle(modal);
    console.log("   Display:", styles.display);
    console.log("   Opacity:", styles.opacity);
    console.log("   Z-index:", styles.zIndex);
    console.log("   Visibility:", styles.visibility);

    if (styles.display === "none") {
      results.warnings.push("Modal exists but is hidden (display: none)");
      console.log("%c   ⚠️  Modal is hidden (display: none)", "color: #ffaa00");
    } else if (styles.opacity === "0") {
      results.warnings.push("Modal exists but is transparent (opacity: 0)");
      console.log(
        "%c   ⚠️  Modal is transparent (opacity: 0)",
        "color: #ffaa00"
      );
    } else {
      results.success.push("Modal is visible");
      console.log("%c   ✅ Modal should be visible", "color: #00ff00");
    }
  } else {
    results.info.push("Modal not in DOM (expected if consent already given)");
    console.log(
      "%c   ℹ️  Modal not in DOM (expected if consent already given)",
      "color: #aaaaaa"
    );
  }

  // 3. Check Scripts
  console.log("\n%c3. SCRIPT CHECK", "color: #00aaff; font-weight: bold");
  const gaLoader = document.getElementById("google-analytics-loader");
  const gaScript = document.getElementById("google-analytics");
  const calendlyScript = document.getElementById("calendly-widget-script");
  const calendlyCSS = document.getElementById("calendly-widget-css");

  console.log(
    "   Google Analytics Loader:",
    gaLoader ? "✅ LOADED" : "❌ NOT LOADED"
  );
  console.log(
    "   Google Analytics Script:",
    gaScript ? "✅ LOADED" : "❌ NOT LOADED"
  );
  console.log(
    "   Calendly Script:",
    calendlyScript ? "✅ LOADED" : "❌ NOT LOADED"
  );
  console.log("   Calendly CSS:", calendlyCSS ? "✅ LOADED" : "❌ NOT LOADED");

  const consent = localStorage.getItem("gdprConsent");
  if (consent === "accepted") {
    if (gaScript || gaLoader) {
      results.success.push("Analytics scripts loaded (consent accepted)");
    } else {
      results.warnings.push("Consent accepted but analytics not loaded");
      console.log(
        "%c   ⚠️  Consent accepted but analytics not loaded",
        "color: #ffaa00"
      );
    }
  } else if (consent === "rejected") {
    if (!gaScript && !gaLoader) {
      results.success.push("Analytics scripts not loaded (consent rejected)");
    } else {
      results.errors.push("Consent rejected but analytics still loaded!");
      console.log(
        "%c   ❌ Consent rejected but analytics still loaded!",
        "color: #ff0000"
      );
    }
  }

  // 4. Check React/Next.js
  console.log("\n%c4. FRAMEWORK CHECK", "color: #00aaff; font-weight: bold");
  const scripts = Array.from(document.scripts).map((s) => s.src);
  const hasReact = scripts.some((s) => s.includes("react"));
  const hasNextJs = scripts.some((s) => s.includes("_next"));

  console.log("   React loaded:", hasReact ? "✅ YES" : "❌ NO");
  console.log("   Next.js loaded:", hasNextJs ? "✅ YES" : "❌ NO");

  if (!hasReact || !hasNextJs) {
    results.errors.push("React/Next.js not loaded properly");
  } else {
    results.success.push("React/Next.js loaded correctly");
  }

  // 5. Check Environment
  console.log("\n%c5. ENVIRONMENT CHECK", "color: #00aaff; font-weight: bold");
  console.log("   Location:", window.location.href);
  console.log("   Protocol:", window.location.protocol);
  console.log("   Host:", window.location.host);
  console.log("   User Agent:", navigator.userAgent.substring(0, 80) + "...");

  // 6. Test localStorage functionality
  console.log(
    "\n%c6. LOCALSTORAGE FUNCTIONALITY TEST",
    "color: #00aaff; font-weight: bold"
  );
  try {
    localStorage.setItem("gdpr-test", "test-value");
    const testValue = localStorage.getItem("gdpr-test");
    localStorage.removeItem("gdpr-test");

    if (testValue === "test-value") {
      console.log("%c   ✅ localStorage is working", "color: #00ff00");
      results.success.push("localStorage is functional");
    } else {
      console.log("%c   ❌ localStorage read/write failed", "color: #ff0000");
      results.errors.push("localStorage read/write failed");
    }
  } catch (e) {
    console.log(
      "%c   ❌ localStorage test failed: " + e.message,
      "color: #ff0000"
    );
    results.errors.push("localStorage test failed: " + e.message);
  }

  // 7. Check for console errors
  console.log("\n%c7. CONSOLE ERRORS", "color: #00aaff; font-weight: bold");
  console.log("   Check above for any red error messages");
  console.log(
    '   Common issues: "Hydration failed", "Text content mismatch", "Cannot read property"'
  );

  // Summary
  console.log(
    "\n%c=== DIAGNOSTIC SUMMARY ===",
    "color: #00ff00; font-size: 16px; font-weight: bold"
  );

  if (results.errors.length > 0) {
    console.log("\n%c❌ ERRORS FOUND:", "color: #ff0000; font-weight: bold");
    results.errors.forEach((err) => console.log("   - " + err));
  }

  if (results.warnings.length > 0) {
    console.log("\n%c⚠️  WARNINGS:", "color: #ffaa00; font-weight: bold");
    results.warnings.forEach((warn) => console.log("   - " + warn));
  }

  if (results.info.length > 0) {
    console.log("\n%cℹ️  INFORMATION:", "color: #aaaaaa; font-weight: bold");
    results.info.forEach((info) => console.log("   - " + info));
  }

  if (results.success.length > 0) {
    console.log("\n%c✅ SUCCESS:", "color: #00ff00; font-weight: bold");
    results.success.forEach((success) => console.log("   - " + success));
  }

  // Recommendations
  console.log(
    "\n%c=== RECOMMENDATIONS ===",
    "color: #00aaff; font-size: 16px; font-weight: bold"
  );

  const consent = localStorage.getItem("gdprConsent");

  if (consent) {
    console.log(
      "\n%c🎯 PRIMARY ISSUE: Consent already stored",
      "color: #ffaa00; font-weight: bold"
    );
    console.log(
      "\n   The cookie banner only appears when no consent is stored."
    );
    console.log(
      "   You previously accepted or rejected cookies, so the banner won't show again."
    );
    console.log("\n%c💡 SOLUTIONS:", "color: #00aaff; font-weight: bold");
    console.log("\n   Option 1 - Clear consent and reload:");
    console.log(
      "%c   localStorage.clear(); location.reload();",
      "background: #000; color: #0f0; padding: 5px; font-family: monospace"
    );
    console.log("\n   Option 2 - Manually open preferences:");
    console.log(
      '%c   window.dispatchEvent(new Event("openCookiePreferences"));',
      "background: #000; color: #0f0; padding: 5px; font-family: monospace"
    );
    console.log("\n   Option 3 - Visit test page:");
    console.log(
      '%c   window.location.href = "/test-gdpr";',
      "background: #000; color: #0f0; padding: 5px; font-family: monospace"
    );
    console.log("\n   Option 4 - Use incognito/private mode:");
    console.log("   Open a new incognito/private window and visit the site.");
  } else if (!modal) {
    console.log(
      "\n%c🎯 PRIMARY ISSUE: Modal not in DOM",
      "color: #ff0000; font-weight: bold"
    );
    console.log("\n   The banner component is not rendering. Possible causes:");
    console.log("   - JavaScript not loaded properly");
    console.log("   - React hydration error");
    console.log("   - Component not mounted in layout");
    console.log("\n%c💡 SOLUTIONS:", "color: #00aaff; font-weight: bold");
    console.log("\n   1. Hard refresh the page:");
    console.log("      Windows/Linux: Ctrl + Shift + R");
    console.log("      Mac: Cmd + Shift + R");
    console.log("\n   2. Clear browser cache and reload");
    console.log(
      "\n   3. Check for JavaScript errors in console (red messages above)"
    );
    console.log("\n   4. Try a different browser");
  } else {
    console.log(
      "\n%c✅ Everything looks good!",
      "color: #00ff00; font-weight: bold"
    );
    console.log("\n   The banner should be visible on your screen.");
    console.log(
      "   If you don't see it, check if it's hidden behind other elements."
    );
  }

  // Quick actions
  console.log(
    "\n%c=== QUICK ACTIONS ===",
    "color: #00aaff; font-size: 16px; font-weight: bold"
  );
  console.log("\nCopy and run these commands:\n");

  console.log("%c// Clear consent and reload", "color: #888");
  console.log(
    "%clocalStorage.clear(); location.reload();",
    "background: #000; color: #0f0; padding: 5px; font-family: monospace"
  );

  console.log("\n%c// Open preferences modal", "color: #888");
  console.log(
    '%cwindow.dispatchEvent(new Event("openCookiePreferences"));',
    "background: #000; color: #0f0; padding: 5px; font-family: monospace"
  );

  console.log("\n%c// Check current status", "color: #888");
  console.log(
    '%cconsole.log("Consent:", localStorage.getItem("gdprConsent"));',
    "background: #000; color: #0f0; padding: 5px; font-family: monospace"
  );

  console.log("\n%c// Go to test page", "color: #888");
  console.log(
    '%cwindow.location.href = "/test-gdpr";',
    "background: #000; color: #0f0; padding: 5px; font-family: monospace"
  );

  console.log(
    "\n%c=== DIAGNOSTIC COMPLETE ===",
    "color: #00ff00; font-size: 16px; font-weight: bold"
  );
  console.log("\nFor more help, visit: /test-gdpr\n");

  // Return results object for programmatic access
  return {
    consent: localStorage.getItem("gdprConsent"),
    preferences: localStorage.getItem("cookiePreferences"),
    modalInDOM: !!modal,
    scriptsLoaded: {
      googleAnalytics: !!(gaLoader || gaScript),
      calendly: !!calendlyScript,
    },
    results: results,
  };
})();
