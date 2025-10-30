# reCAPTCHA Verification Checklist

Use this checklist to verify that reCAPTCHA v3 is working correctly on your site.

## ✅ Environment Variables Check

### Local Development (.env.local)
- [x] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
- [ ] `RECAPTCHA_SECRET_KEY` is set (optional for local dev, required for production)

### Cloudflare Production
- [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set as Environment Variable
- [ ] `RECAPTCHA_SECRET_KEY` is set as Secret

## ✅ Functionality Tests

### 1. Email Reveal in Footer
1. Navigate to the homepage footer
2. Find "Click to reveal email" link
3. Click on it
4. **Expected**:
   - Brief "Verifying..." message appears
   - Email address `contact@iops.pro` is revealed
   - Email becomes a clickable `mailto:` link

### 2. Contact Form (Main Page)
1. Scroll to the contact form section
2. Fill out the form fields
3. Click "Book 15-Minute Demo"
4. **Expected**:
   - Form submits without visible reCAPTCHA challenge
   - Success message appears
   - No errors in browser console

### 3. Contact Page Form
1. Navigate to `/contact` page
2. Fill out the form
3. Click "Book 15-Minute Demo"
4. **Expected**:
   - Form submits successfully
   - No errors in browser console

## ✅ Browser Console Check

Open browser Developer Tools (F12) and check:

1. **No reCAPTCHA errors**: Should not see "reCAPTCHA site key not configured"
2. **Script loaded**: Check Network tab for `recaptcha/api.js` loaded successfully
3. **Token generated**: When clicking email reveal or submitting forms, check for successful API calls

## ✅ Server-Side Verification

Check that server-side verification is working:

1. Submit a form or reveal email
2. Check browser Network tab for `/api/verify-recaptcha` request
3. **Expected**: Response should have `{ success: true, score: 0.7-1.0 }`

## Troubleshooting

### Email Not Revealing
- Check browser console for errors
- Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
- Check Network tab - is `recaptcha/api.js` loading?
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Forms Not Submitting
- Check browser console for errors
- Verify both site key and secret key are configured
- Check Network tab for `/api/verify-recaptcha` response
- Look for error messages in the response

### reCAPTCHA Script Not Loading
- Verify site key is correct (starts with `6L...`)
- Check domain is added in reCAPTCHA admin console
- Ensure script URL includes the site key: `?render=YOUR_SITE_KEY`

### Server-Side Verification Failing
- Verify `RECAPTCHA_SECRET_KEY` is set correctly
- Check Cloudflare logs for errors
- Verify secret key matches the site key (same reCAPTCHA site)

## Test Locally

```bash
# Make sure .env.local exists with:
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdUAPwrAAAAAA5HPE7Hd978Y6mjC0fVzO3eWHmK
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Restart dev server
npm run dev
```

## Test in Production

After deploying to Cloudflare:
1. Verify environment variables are set in Cloudflare Dashboard
2. Test email reveal functionality
3. Test form submissions
4. Check reCAPTCHA admin console for activity/statistics

