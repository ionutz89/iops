# Cloudflare Turnstile Setup Guide

This guide explains how to configure Cloudflare Turnstile for the IOPS website deployed on Cloudflare.

## Overview

The website uses Cloudflare Turnstile for:
- **Form Protection**: Protecting contact forms from spam submissions
- **Privacy-Friendly**: Turnstile doesn't require cookies and is GDPR-compliant

Turnstile is Cloudflare's privacy-friendly alternative to reCAPTCHA. It works invisibly in the background without requiring user interaction or cookies.

## Step 1: Get Your Turnstile Site Key

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to your account
3. Go to **Security** → **Turnstile**
4. Click **Add Site**
5. Fill in the form:
   - **Site Name**: IOPS Website (or any name you prefer)
   - **Domain**: Add your domains:
     - `iops.pro`
     - `www.iops.pro`
   - **Widget Mode**: Select **Invisible** (for seamless user experience)
6. Click **Create**
7. Copy your **Site Key** and **Secret Key**

**IMPORTANT**: You'll see both keys displayed. The site key is public (used in frontend), and the secret key is private (used for server-side verification).

## Step 2: Configure Cloudflare Environment Variables

You need to configure **two** environment variables:
1. **Site Key** (public, used in frontend) - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
2. **Secret Key** (private, used for server-side verification) - `TURNSTILE_SECRET_KEY`

### Option A: Using Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → Your project (`iops-pro`)
3. Click **Settings** → **Variables**

4. **Add Site Key** (Public):
   - Click **Add variable** under **Environment Variables**
   - **Variable name**: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - **Value**: Your site key from Turnstile
   - Click **Save**

5. **Add Secret Key** (Private):
   - Go to **Settings** → **Secrets** (not Variables!)
   - Click **Add secret**
   - **Secret name**: `TURNSTILE_SECRET_KEY`
   - **Value**: Your secret key from Turnstile
   - Click **Save**

**Important**: The secret key must be added as a **Secret**, not an environment variable, to keep it secure.

### Option B: Using Wrangler CLI

**For Cloudflare Pages (via Dashboard):**
- Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` as an Environment Variable (not a secret)
- Set `TURNSTILE_SECRET_KEY` as a Secret

**For Cloudflare Workers (via CLI):**
```bash
# Note: For NEXT_PUBLIC_* variables, add them to wrangler.jsonc vars section
# Or set them as environment variables in Cloudflare Dashboard

# Set the private secret key (secure secret)
npx wrangler secret put TURNSTILE_SECRET_KEY
# When prompted, enter your secret key from Turnstile
```

**Important Notes**:
- `NEXT_PUBLIC_*` variables MUST be set as Environment Variables (not secrets) because they need to be exposed to client-side code
- The secret key (`TURNSTILE_SECRET_KEY`) should be set as a Secret since it's only used server-side
- Never expose the secret key to the client - it's only used in the API route

## Step 3: Verify Configuration

After deploying:

1. **Test Contact Form**:
   - Fill out the contact form
   - Submit the form
   - The form should submit successfully with invisible Turnstile verification

## How It Works

### Form Protection
- Contact forms automatically verify users with Turnstile
- Verification happens invisibly when the form is submitted
- No checkboxes or challenges for users
- Bots are blocked automatically
- Privacy-friendly: No cookies required

## Benefits of Turnstile

- ✅ **Privacy-Friendly**: No cookies required, GDPR-compliant
- ✅ **Better Performance**: Faster than reCAPTCHA
- ✅ **Seamless UX**: Invisible verification, no user interaction needed
- ✅ **Cloudflare Integration**: Works seamlessly with Cloudflare Pages/Workers
- ✅ **Free**: Included with Cloudflare account

## Troubleshooting

### Turnstile Not Working

**Check Configuration**:
- Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set in Cloudflare
- Ensure it matches your Turnstile site key exactly
- Check that your domain is added in Turnstile settings

**Debug Steps**:
- Open browser Developer Tools (F12)
- Check Console tab for Turnstile-related errors
- Check Network tab for `challenges.cloudflare.com/turnstile` requests
- Look for errors in the API response

### Server-Side Verification Failing

- Verify `TURNSTILE_SECRET_KEY` is set correctly
- Check Cloudflare logs for errors
- Verify secret key matches the site key (same Turnstile site)
- Ensure the token is being sent correctly from the client

## API Route

The website includes an API route (`/api/verify-turnstile`) that:
1. Receives the Turnstile token from the client
2. Sends it to Cloudflare's verification endpoint with your secret key
3. Returns success/failure status

## Security Notes

- **Never commit** your Turnstile secret key to version control
- **Never expose** the secret key in client-side code or environment variables prefixed with `NEXT_PUBLIC_`
- The site key (public) is safe to expose in client-side code
- The secret key must be stored as a Cloudflare Secret (not a regular environment variable)
- Always verify tokens server-side before processing form submissions

## Additional Resources

- [Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Turnstile Admin Console](https://dash.cloudflare.com/?to=/:account/turnstile)
- [Cloudflare Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/)

