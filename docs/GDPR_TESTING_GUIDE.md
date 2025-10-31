# GDPR Compliance Testing Guide

This guide provides step-by-step instructions for testing the GDPR compliance implementation on the IOPS website.

---

## Prerequisites

- Browser with DevTools (Chrome, Firefox, Safari, or Edge)
- Incognito/Private browsing mode (for fresh testing)
- Access to the IOPS website (local or production)

---

## Test 1: Initial Cookie Consent Banner

### Steps
1. Open the website in **incognito/private mode**
2. Wait for the page to load completely

### Expected Results
- ✅ Cookie consent modal appears after ~500ms
- ✅ Modal shows simple banner with three buttons:
  - "Accept All" (green)
  - "Reject Non-Essential" (gray)
  - "Manage Preferences" (outline)
- ✅ Link to Privacy Policy is visible
- ✅ Message mentions essential vs. optional cookies

### DevTools Checks
```javascript
// Open Console and check:
localStorage.getItem('gdprConsent')        // Should be null
localStorage.getItem('cookiePreferences')  // Should be null
```

---

## Test 2: Accept All Cookies

### Steps
1. Open website in incognito mode
2. Click "Accept All" button

### Expected Results
- ✅ Modal closes immediately
- ✅ Google Analytics scripts load
- ✅ Calendly scripts load

### DevTools Checks

**Console:**
```javascript
localStorage.getItem('gdprConsent')        // Should be "accepted"
localStorage.getItem('cookiePreferences')  // Should contain preferences object
```

**Network Tab:**
- ✅ Request to `googletagmanager.com/gtag/js`
- ✅ Request to `assets.calendly.com/assets/external/widget.js`

**Application > Local Storage:**
```json
{
  "gdprConsent": "accepted",
  "cookiePreferences": "{\"essential\":true,\"functional\":true,\"analytics\":true,\"marketing\":false}"
}
```

**Elements Tab:**
- ✅ Script tag with id `google-analytics-loader`
- ✅ Script tag with id `google-analytics`
- ✅ Script tag with id `calendly-widget-script`
- ✅ Link tag with id `calendly-widget-css`

---

## Test 3: Reject Non-Essential Cookies

### Steps
1. Open website in incognito mode
2. Click "Reject Non-Essential" button

### Expected Results
- ✅ Modal closes immediately
- ✅ No analytics scripts load
- ✅ No Calendly scripts load
- ✅ Only essential cookies present

### DevTools Checks

**Console:**
```javascript
localStorage.getItem('gdprConsent')        // Should be "rejected"
localStorage.getItem('cookiePreferences')  // Should show all false except essential
```

**Network Tab:**
- ❌ NO request to `googletagmanager.com`
- ❌ NO request to `assets.calendly.com`

**Application > Local Storage:**
```json
{
  "gdprConsent": "rejected",
  "cookiePreferences": "{\"essential\":true,\"functional\":false,\"analytics\":false,\"marketing\":false}"
}
```

---

## Test 4: Manage Preferences - Custom Selection

### Steps
1. Open website in incognito mode
2. Click "Manage Preferences" button
3. Verify detailed modal opens
4. Toggle "Functional Cookies" ON (for Calendly)
5. Leave "Analytics Cookies" OFF
6. Click "Save Preferences"

### Expected Results
- ✅ Detailed preferences modal opens
- ✅ Four cookie categories displayed:
  - Essential (always active badge)
  - Functional (toggle switch)
  - Analytics (toggle switch)
  - Marketing (not used badge)
- ✅ Toggle switches work smoothly
- ✅ Modal closes after saving
- ✅ Only Calendly scripts load (not analytics)

### DevTools Checks

**Console:**
```javascript
localStorage.getItem('gdprConsent')        // Should be "accepted"
const prefs = JSON.parse(localStorage.getItem('cookiePreferences'))
console.log(prefs)
// Should show: {essential: true, functional: true, analytics: false, marketing: false}
```

**Network Tab:**
- ❌ NO request to `googletagmanager.com`
- ✅ Request to `assets.calendly.com/assets/external/widget.js`

---

## Test 5: Reopen Preferences from Footer

### Steps
1. After accepting/rejecting cookies (any choice)
2. Scroll to footer
3. Click "Manage Cookies" link

### Expected Results
- ✅ Cookie consent modal reopens
- ✅ Modal shows preferences view (not simple banner)
- ✅ Current preferences are reflected in toggle states
- ✅ Can change preferences and save

### DevTools Checks
```javascript
// Verify event is dispatched
window.dispatchEvent(new Event("openCookiePreferences"))
// Modal should open
```

---

## Test 6: Reopen Preferences from Privacy Policy

### Steps
1. Navigate to `/privacy-policy`
2. Scroll to bottom of page
3. Click "Manage Cookie Preferences" button

### Expected Results
- ✅ Cookie consent modal reopens
- ✅ Same behavior as footer link

---

## Test 7: Change Preferences (Enable Analytics)

### Steps
1. Start with "Reject Non-Essential" (from Test 3)
2. Click "Manage Cookies" in footer
3. Toggle "Analytics Cookies" ON
4. Click "Save Preferences"

### Expected Results
- ✅ Modal closes
- ✅ Google Analytics scripts load immediately
- ✅ No page reload required

### DevTools Checks

**Network Tab (after saving):**
- ✅ NEW request to `googletagmanager.com/gtag/js`

**Console:**
```javascript
// Check if gtag is defined
typeof gtag  // Should be "function"
```

---

## Test 8: Change Preferences (Disable All)

### Steps
1. Start with "Accept All" (from Test 2)
2. Click "Manage Cookies" in footer
3. Toggle "Functional Cookies" OFF
4. Toggle "Analytics Cookies" OFF
5. Click "Save Preferences"

### Expected Results
- ✅ Modal closes
- ✅ Analytics scripts removed
- ✅ Calendly scripts removed
- ✅ Only essential cookies remain

### DevTools Checks

**Elements Tab:**
- ❌ NO script tag with id `google-analytics-loader`
- ❌ NO script tag with id `google-analytics`
- ❌ NO script tag with id `calendly-widget-script`
- ❌ NO link tag with id `calendly-widget-css`

**Console:**
```javascript
typeof gtag           // Should be "undefined"
typeof window.Calendly  // Should be "undefined"
```

---

## Test 9: Persistence Across Page Reloads

### Steps
1. Accept all cookies
2. Reload the page
3. Navigate to different pages (`/about`, `/contact`, `/faq`)

### Expected Results
- ✅ Cookie consent modal does NOT appear again
- ✅ Analytics scripts load automatically on all pages
- ✅ Calendly scripts load automatically on all pages
- ✅ Preferences persist across navigation

### DevTools Checks
```javascript
// On any page after reload:
localStorage.getItem('gdprConsent')        // Should still be "accepted"
localStorage.getItem('cookiePreferences')  // Should still contain preferences
```

---

## Test 10: Mobile Responsiveness

### Steps
1. Open website on mobile device or use DevTools device emulation
2. Test all consent flows (Accept, Reject, Manage)

### Expected Results
- ✅ Modal is fully responsive
- ✅ Buttons stack vertically on small screens
- ✅ Text is readable
- ✅ Toggle switches are easy to tap
- ✅ Modal scrolls if content is too tall

---

## Test 11: Privacy Policy Content

### Steps
1. Navigate to `/privacy-policy`
2. Scroll through the entire page

### Expected Results
- ✅ Section 7 includes Calendly as third-party processor
- ✅ Calendly entry mentions:
  - Data processing (name, email, booking details)
  - Data transfer to US under SCCs
  - Link to Calendly privacy policy
- ✅ Section 8 describes all cookie categories:
  - Essential (always enabled)
  - Functional (Calendly, requires consent)
  - Analytics (Google Analytics, requires consent)
  - Preference (theme, optional)
- ✅ Section 8 mentions "Manage Cookies" link in footer

---

## Test 12: Essential Cookies (No Consent Required)

### Steps
1. Open website in incognito mode
2. Before accepting cookies, try to submit contact form

### Expected Results
- ✅ Cloudflare Turnstile loads without consent
- ✅ Form can be submitted (security check works)
- ✅ No analytics or Calendly scripts load

### DevTools Checks

**Network Tab:**
- ✅ Requests to `challenges.cloudflare.com` (Turnstile)
- ❌ NO requests to `googletagmanager.com`
- ❌ NO requests to `assets.calendly.com`

---

## Test 13: Calendly Link Behavior

### Steps
1. Accept only Functional cookies (Calendly)
2. Click "Book 30-Minute Call" button on homepage

### Expected Results
- ✅ Calendly link opens (external site)
- ✅ Calendly scripts were loaded beforehand (due to consent)

### Alternative Test (No Consent)
1. Reject all non-essential cookies
2. Click "Book 30-Minute Call" button

### Expected Results
- ✅ Link still works (opens Calendly website)
- ✅ No Calendly scripts loaded on IOPS site

---

## Test 14: Browser Console Errors

### Steps
1. Test all consent flows
2. Monitor browser console throughout

### Expected Results
- ✅ No JavaScript errors
- ✅ No console warnings (except development mode logs)
- ✅ Development logs show consent status changes

---

## Test 15: Clear Consent and Re-test

### Steps
1. After accepting cookies, open DevTools Console
2. Run: `localStorage.clear()`
3. Reload the page

### Expected Results
- ✅ Cookie consent modal appears again
- ✅ All scripts removed
- ✅ Fresh consent flow works

---

## Automated Testing Checklist

### Before Consent
```javascript
// Run in console before accepting cookies
console.assert(localStorage.getItem('gdprConsent') === null, 'Consent should be null')
console.assert(document.getElementById('google-analytics') === null, 'Analytics should not load')
console.assert(document.getElementById('calendly-widget-script') === null, 'Calendly should not load')
console.log('✅ Before consent: All checks passed')
```

### After Accept All
```javascript
// Run in console after accepting all cookies
console.assert(localStorage.getItem('gdprConsent') === 'accepted', 'Consent should be accepted')
const prefs = JSON.parse(localStorage.getItem('cookiePreferences'))
console.assert(prefs.functional === true, 'Functional should be enabled')
console.assert(prefs.analytics === true, 'Analytics should be enabled')
console.log('✅ After accept all: All checks passed')
```

### After Reject Non-Essential
```javascript
// Run in console after rejecting non-essential cookies
console.assert(localStorage.getItem('gdprConsent') === 'rejected', 'Consent should be rejected')
const prefs = JSON.parse(localStorage.getItem('cookiePreferences'))
console.assert(prefs.functional === false, 'Functional should be disabled')
console.assert(prefs.analytics === false, 'Analytics should be disabled')
console.assert(prefs.essential === true, 'Essential should always be enabled')
console.log('✅ After reject: All checks passed')
```

---

## Common Issues and Solutions

### Issue: Modal doesn't appear
**Solution:** Check if consent is already stored. Clear localStorage and reload.

### Issue: Scripts don't load after consent
**Solution:** Check Network tab for errors. Verify environment variables (NEXT_PUBLIC_GA_ID).

### Issue: Scripts don't remove after revoking consent
**Solution:** Check console for errors. Verify event listeners are working.

### Issue: Preferences don't persist
**Solution:** Check localStorage is enabled in browser. Verify no errors in console.

---

## Production Deployment Checklist

Before deploying to production:

- [ ] All tests pass in development environment
- [ ] All tests pass in staging environment
- [ ] Privacy policy is up-to-date
- [ ] Google Analytics ID is set (NEXT_PUBLIC_GA_ID)
- [ ] Calendly link is correct
- [ ] No console errors in production build
- [ ] Mobile testing completed
- [ ] Cross-browser testing completed
- [ ] GDPR compliance verified by legal team (if applicable)

---

## Compliance Verification

### GDPR Requirements
- [x] Explicit consent required before non-essential cookies
- [x] Essential cookies clearly identified
- [x] Granular control over cookie categories
- [x] Easy withdrawal of consent
- [x] Privacy policy includes all data processors
- [x] Data transfer details provided (SCCs)

### ePrivacy Directive
- [x] Cookie consent obtained before setting cookies
- [x] Clear information about cookie purposes
- [x] User can manage preferences at any time

---

## Support

For questions or issues with GDPR compliance testing:
- **Documentation:** `/docs/GDPR_COMPLIANCE_IMPLEMENTATION.md`
- **Email:** privacy@iops.pro

---

**Last Updated:** October 31, 2025

