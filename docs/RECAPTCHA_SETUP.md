# Google reCAPTCHA v3 Setup Guide

This guide explains how to configure Google reCAPTCHA v3 for the IOPS website deployed on Cloudflare.

## Overview

The website uses Google reCAPTCHA v3 for:
- **Email Protection**: Hiding email addresses from bots (click-to-reveal with verification)
- **Form Protection**: Protecting contact forms from spam submissions

reCAPTCHA v3 runs invisibly in the background and provides a risk score without interrupting user experience.

## Step 1: Get Your reCAPTCHA Site Key

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **"+"** to create a new site
3. Fill in the form:
   - **Label**: IOPS Website (or any name you prefer)
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domains:
     - `iops.pro`
     - `www.iops.pro`
     - `*.iops.pro` (for subdomains if needed)
   - Accept the terms of service
4. Click **Submit**
5. Copy your **Site Key** (it starts with `6L...`)

**Your Site Key**: `6LdUAPwrAAAAAA5HPE7Hd978Y6mjC0fVzO3eWHmK`
**Your Secret Key**: Copy this from the same page (starts with `6L...` but different from site key)

**IMPORTANT**: The secret key is different from the site key. You'll see both keys displayed after creating your reCAPTCHA site.

## Step 2: Configure Cloudflare Environment Variables

You need to configure **two** environment variables:
1. **Site Key** (public, used in frontend) - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
2. **Secret Key** (private, used for server-side verification) - `RECAPTCHA_SECRET_KEY`

### Option A: Using Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → Your project (`iops-pro`)
3. Click **Settings** → **Variables**

4. **Add Site Key** (Public):
   - Click **Add variable** under **Environment Variables**
   - **Variable name**: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Value**: `6LdUAPwrAAAAAA5HPE7Hd978Y6mjC0fVzO3eWHmK`
   - Click **Save**

5. **Add Secret Key** (Private):
   - Go to **Settings** → **Secrets** (not Variables!)
   - Click **Add secret**
   - **Secret name**: `RECAPTCHA_SECRET_KEY`
   - **Value**: Your secret key from reCAPTCHA admin console
   - Click **Save**

**Important**: The secret key must be added as a **Secret**, not an environment variable, to keep it secure.

### Option B: Using Wrangler CLI

**For Cloudflare Pages (via Dashboard):**
- Set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` as an Environment Variable (not a secret)
- Set `RECAPTCHA_SECRET_KEY` as a Secret

**For Cloudflare Workers (via CLI):**
```bash
# Note: For NEXT_PUBLIC_* variables, add them to wrangler.jsonc vars section
# Or set them as environment variables in Cloudflare Dashboard

# Set the private secret key (secure secret)
npx wrangler secret put RECAPTCHA_SECRET_KEY
# When prompted, enter your secret key from reCAPTCHA admin console
```

**Important Notes**:
- `NEXT_PUBLIC_*` variables MUST be set as Environment Variables (not secrets) because they need to be exposed to client-side code
- The secret key (`RECAPTCHA_SECRET_KEY`) should be set as a Secret since it's only used server-side
- Never expose the secret key to the client - it's only used in the API route

## Step 3: Verify Configuration

After deploying:

1. **Test Email Reveal**:
   - Go to your website footer
   - Click "Click to reveal email"
   - The email should appear after invisible verification

2. **Test Contact Form**:
   - Fill out the contact form
   - Submit the form
   - The form should submit successfully with invisible reCAPTCHA verification

## How It Works

### Email Protection
- Email addresses are hidden from HTML source code
- Users see "Click to reveal email"
- When clicked, reCAPTCHA v3 executes invisibly
- Upon successful verification, the email is revealed

### Form Protection
- Contact forms automatically verify users with reCAPTCHA v3
- Verification happens invisibly when the form is submitted
- No checkboxes or challenges for users
- Bots are blocked automatically

## reCAPTCHA v3 Actions

The website uses the following actions:
- `reveal_email` - For email reveal functionality
- `submit_contact_form` - For contact form submissions

These actions help you analyze bot activity in your reCAPTCHA admin console.

## Troubleshooting

### reCAPTCHA Not Working

1. **Check Environment Variable**:
   - Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set in Cloudflare
   - Ensure it matches your reCAPTCHA site key exactly

2. **Check Domain Configuration**:
   - Verify your domain is added in reCAPTCHA admin console
   - Ensure domain matches exactly (including www/non-www)

3. **Check Browser Console**:
   - Open browser developer tools (F12)
   - Check Console tab for errors
   - Look for reCAPTCHA-related errors

4. **Verify Script Loading**:
   - In browser console, type: `window.grecaptcha`
   - Should return an object (not undefined)

### Email Not Revealing

- Check browser console for errors
- Verify reCAPTCHA site key is configured
- Try in incognito/private mode to rule out extension conflicts

### Forms Not Submitting

- Check browser console for errors
- Verify reCAPTCHA site key is configured
- Ensure form validation passes before reCAPTCHA executes

## How Server-Side Verification Works

The website includes an API route (`/api/verify-recaptcha`) that:
1. Receives the reCAPTCHA token from the client
2. Sends it to Google's verification endpoint with your secret key
3. Checks the response score (0.0 to 1.0)
4. Returns success/failure based on the score threshold (0.5)

This ensures that:
- ✅ Forms are verified server-side (more secure)
- ✅ Bot attempts are blocked even if they bypass client-side checks
- ✅ You can monitor bot activity in reCAPTCHA admin console

## Security Notes

- **Never commit** your reCAPTCHA secret key to version control
- **Never expose** the secret key in client-side code or environment variables prefixed with `NEXT_PUBLIC_`
- The site key (public) is safe to expose in client-side code
- The secret key must be stored as a Cloudflare Secret (not a regular environment variable)
- Always verify tokens server-side before processing form submissions

## Additional Resources

- [reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [Cloudflare Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/)

