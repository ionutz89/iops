# GDPR Cookie Consent - Troubleshooting Guide

## 🚨 Cookie Popup Not Appearing?

If you don't see the cookie consent popup, follow these steps:

---

## Step 1: Check if You Already Accepted/Rejected

The popup **only appears once**. If you've already made a choice, it won't show again.

### Quick Fix:
1. Open browser DevTools (Press **F12** or Right-click → **Inspect**)
2. Go to the **Console** tab
3. Run this command:
   ```javascript
   localStorage.clear()
   location.reload()
   ```
4. The popup should now appear!

---

## Step 2: Use the Test Page

I've created a dedicated test page for you:

### 🔗 Visit: `http://localhost:3000/test-gdpr`

This page lets you:
- ✅ See your current consent status
- ✅ Clear consent with one click
- ✅ Manually open the cookie preferences modal
- ✅ Test all functionality

---

## Step 3: Check Browser Console for Errors

1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for any red error messages
4. Common errors and solutions:

### Error: "localStorage is not defined"
**Solution:** Make sure you're testing in a browser (not server-side rendering)

### Error: "Cannot read property 'addEventListener' of undefined"
**Solution:** The component needs to be client-side. Check if `"use client"` is at the top of the file.

### Error: Import errors for `@/lib/gdpr-consent`
**Solution:** Run `npm install` to ensure all dependencies are installed

---

## Step 4: Manually Trigger the Popup

You can force the popup to appear without clearing localStorage:

### Method 1: Use Footer Link
1. Go to the homepage
2. Scroll to the bottom
3. Click **"Manage Cookies"** in the footer

### Method 2: Use Console Command
1. Open DevTools Console (F12)
2. Run:
   ```javascript
   window.dispatchEvent(new Event("openCookiePreferences"))
   ```

### Method 3: Use Test Page Button
1. Visit `http://localhost:3000/test-gdpr`
2. Click **"Open Cookie Preferences Modal"**

---

## Step 5: Verify Dev Server is Running

Make sure the Next.js dev server is running:

```bash
cd /Users/ionut/iops
npm run dev
```

You should see:
```
✓ Ready in 2.1s
- Local:        http://localhost:3000
```

Then visit: **http://localhost:3000**

---

## Step 6: Check if Component is Loaded

In the browser console, run:

```javascript
// Check if the component is in the DOM
document.querySelector('[class*="fixed inset-0 z-50"]')

// Check consent status
console.log('Consent:', localStorage.getItem('gdprConsent'))
console.log('Preferences:', localStorage.getItem('cookiePreferences'))
```

---

## Common Issues & Solutions

### Issue 1: "I cleared localStorage but popup still doesn't appear"

**Possible causes:**
1. **Browser cache** - Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Incognito mode** - Open in incognito/private window for fresh test
3. **Different browser** - Try Chrome, Firefox, or Safari

**Solution:**
```bash
# Stop dev server
# Press Ctrl+C in terminal

# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

---

### Issue 2: "Popup appears but is invisible/behind other elements"

**Check z-index:**
```javascript
// In console, check if element exists but is hidden
const modal = document.querySelector('[class*="fixed inset-0 z-50"]')
if (modal) {
  console.log('Modal found!', modal)
  console.log('Computed styles:', window.getComputedStyle(modal))
}
```

**Solution:** The modal has `z-50` which should be high enough. Check if any custom CSS is overriding it.

---

### Issue 3: "Getting 404 error"

**This means the page doesn't exist or dev server isn't running properly.**

**Solution:**
1. Make sure dev server is running: `npm run dev`
2. Visit the correct URL: `http://localhost:3000`
3. Check if `app/page.tsx` exists: `ls -la app/page.tsx`
4. If you see 404, try:
   ```bash
   # Kill all Next.js processes
   pkill -f "next dev"
   
   # Clear cache
   rm -rf .next
   
   # Reinstall dependencies (if needed)
   npm install
   
   # Start fresh
   npm run dev
   ```

---

### Issue 4: "Modal appears but buttons don't work"

**Check console for JavaScript errors:**
1. Open DevTools Console (F12)
2. Click buttons and watch for errors
3. Common fix: Make sure all imports are correct

**Verify functions exist:**
```javascript
// In console
console.log(typeof localStorage.setItem) // Should be "function"
console.log(typeof window.dispatchEvent) // Should be "function"
```

---

### Issue 5: "Popup appears on every page load"

**This means consent isn't being saved.**

**Check localStorage:**
```javascript
// Try to set a test value
localStorage.setItem('test', 'value')
console.log(localStorage.getItem('test')) // Should return "value"
```

**If localStorage doesn't work:**
- Check browser settings (localStorage might be disabled)
- Try a different browser
- Check if you're in private/incognito mode (some browsers restrict localStorage)

---

## Testing Checklist

Use this checklist to verify everything works:

- [ ] Dev server is running (`npm run dev`)
- [ ] Visit `http://localhost:3000` (homepage loads)
- [ ] Clear localStorage: `localStorage.clear(); location.reload()`
- [ ] Cookie consent popup appears after ~500ms
- [ ] Can see three buttons: "Accept All", "Reject Non-Essential", "Manage Preferences"
- [ ] Click "Accept All" → Modal closes
- [ ] Check localStorage: `localStorage.getItem('gdprConsent')` returns `"accepted"`
- [ ] Reload page → Modal does NOT appear (consent remembered)
- [ ] Click "Manage Cookies" in footer → Modal reopens
- [ ] Can toggle preferences on/off
- [ ] Click "Save Preferences" → Modal closes

---

## Still Not Working?

### Debug Mode

Add this to your browser console to enable debug logging:

```javascript
// Enable detailed logging
localStorage.setItem('debug', 'gdpr:*')

// Clear consent and reload
localStorage.removeItem('gdprConsent')
localStorage.removeItem('cookiePreferences')
location.reload()

// Watch console for debug messages
```

### Check Component is Rendering

```javascript
// Check if GdprConsent component is in React tree
// Look for the component in React DevTools
// Or check DOM:
console.log('Modal elements:', document.querySelectorAll('[class*="fixed inset-0"]').length)
```

### Verify Imports

Check that all imports are working:

```javascript
// In browser console, after page loads
console.log('Window events:', window._events) // Should show event listeners
```

---

## Quick Test Script

Run this in the browser console for a complete test:

```javascript
// GDPR Cookie Consent Test Script
console.log('=== GDPR TEST START ===');

// 1. Check current status
console.log('1. Current consent:', localStorage.getItem('gdprConsent'));
console.log('2. Current preferences:', localStorage.getItem('cookiePreferences'));

// 2. Check if component exists
const modal = document.querySelector('[class*="fixed inset-0 z-50"]');
console.log('3. Modal in DOM:', modal ? 'YES' : 'NO');

// 3. Check if scripts are loaded
console.log('4. Google Analytics:', document.getElementById('google-analytics') ? 'LOADED' : 'NOT LOADED');
console.log('5. Calendly:', document.getElementById('calendly-widget-script') ? 'LOADED' : 'NOT LOADED');

// 4. Test localStorage
try {
  localStorage.setItem('test', 'value');
  localStorage.removeItem('test');
  console.log('6. localStorage: WORKING');
} catch (e) {
  console.error('6. localStorage: FAILED', e);
}

// 5. Test event dispatch
try {
  window.dispatchEvent(new Event("openCookiePreferences"));
  console.log('7. Event dispatch: SUCCESS (check if modal opened)');
} catch (e) {
  console.error('7. Event dispatch: FAILED', e);
}

console.log('=== GDPR TEST END ===');
console.log('If modal appeared, everything is working!');
console.log('If not, check errors above.');
```

---

## Contact Support

If you've tried everything and it still doesn't work:

1. **Check the test page:** `http://localhost:3000/test-gdpr`
2. **Review documentation:** `/docs/GDPR_COMPLIANCE_IMPLEMENTATION.md`
3. **Email:** privacy@iops.pro

---

## Quick Reference

### Clear Consent
```javascript
localStorage.clear(); location.reload()
```

### Open Modal
```javascript
window.dispatchEvent(new Event("openCookiePreferences"))
```

### Check Status
```javascript
console.log(localStorage.getItem('gdprConsent'))
console.log(localStorage.getItem('cookiePreferences'))
```

### Test Page
```
http://localhost:3000/test-gdpr
```

---

**Remember:** The popup only appears ONCE per browser. If you've already accepted/rejected, you need to clear localStorage to see it again!

