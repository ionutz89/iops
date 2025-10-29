# Deployment Guide for IOPS Pro Website

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Formspree Account**: Sign up at [formspree.io](https://formspree.io)
3. **Node.js**: Version 18 or higher
4. **Wrangler CLI**: Installed as devDependency (already in package.json)

## Step 1: Configure Formspree

1. Go to [formspree.io](https://formspree.io) and create an account (free tier available)
2. Click "New Form" and create a form named "IOPS Contact"
3. Copy the form ID (e.g., `xwpejxyz`)
4. Configure email notifications:
   - Add your email to receive submissions
   - Optional: Set up auto-response emails
   - Optional: Add custom subject lines
5. Save your form ID for the next step

## Step 2: Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
# Formspree Configuration
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id_here
```

Replace `your_formspree_form_id_here` with your actual Formspree form ID.

## Step 3: Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
# Test all sections and the contact form
```

Verify:
- All sections load correctly
- Animations work smoothly
- ROI calculator calculates properly
- Contact form submits successfully
- Dark/light mode toggle works
- Mobile responsive design

## Step 4: Build and Test with OpenNext

```bash
# Install dependencies (first time only)
npm install

# Build for Cloudflare Workers using OpenNext adapter
npm run build

# Verify the .open-next/ directory contains:
# - worker.js (main worker file)
# - assets/ directory
# - other OpenNext build artifacts

# Test locally with Wrangler
npm run preview

# Open http://localhost:8787 (default Wrangler port)
# Test all sections and the contact form
```

## Step 5: Deploy to Cloudflare Workers

### Method A: Wrangler CLI (Recommended)

1. **Login to Cloudflare**:
   ```bash
   npx wrangler login
   ```
   This will open your browser to authenticate with Cloudflare.

2. **Build the project**:
   ```bash
   npm run build
   ```
   This uses the OpenNext adapter to create a Cloudflare Workers-compatible build.

3. **Deploy to Cloudflare**:
   ```bash
   npm run deploy
   ```
   This deploys your Worker to Cloudflare using the configuration in `wrangler.jsonc`.

4. **Set Environment Variables** (if needed):
   ```bash
   npx wrangler secret put NEXT_PUBLIC_FORMSPREE_ID
   # Enter your Formspree form ID when prompted
   ```

### Configuration Details

The `wrangler.jsonc` file contains your deployment configuration:
```json
{
  "name": "iops-pro",
  "main": ".open-next/worker.js",
  "compatibility_date": "2024-12-30",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "dir": ".open-next/assets"
  }
}
```

You can customize:
- `name`: Your worker name (will be part of your URL)
- `compatibility_date`: Cloudflare Workers API version
- Add custom routes, environment variables, etc.

## Step 6: Configure Custom Domain (Optional)

1. **Add custom route in wrangler.jsonc**:
   ```json
   {
     "name": "iops-pro",
     "routes": [
       { "pattern": "iops.pro", "custom_domain": true },
       { "pattern": "www.iops.pro", "custom_domain": true }
     ]
   }
   ```

2. **Or add domain via Cloudflare Dashboard**:
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to "Workers & Pages"
   - Select your worker (`iops-pro`)
   - Click "Settings" > "Triggers"
   - Add custom domain under "Custom Domains"
   - Enter `iops.pro` or `www.iops.pro`

3. **Update DNS**:
   - If your domain is already on Cloudflare:
     - DNS records will be added automatically
   - If your domain is elsewhere:
     - Add CNAME record pointing to your Worker URL

4. **Enable HTTPS**:
   - Cloudflare automatically provisions SSL certificates
   - Wait 5-10 minutes for SSL to activate

## Step 7: Post-Deployment Checklist

- [ ] Visit your deployed site
- [ ] Test all sections scroll smoothly
- [ ] Verify ROI calculator works
- [ ] Submit a test contact form
- [ ] Check Formspree for test submission
- [ ] Test on mobile devices
- [ ] Test dark/light mode toggle
- [ ] Run Lighthouse audit (target 95+ score)
- [ ] Verify security headers in browser dev tools

## Security Headers Verification

Your `_headers` file includes these security headers:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: geolocation=(), microphone=(), camera=()

To verify they're working:
1. Open browser dev tools
2. Go to Network tab
3. Refresh the page
4. Click on the main document request
5. Check the Response Headers

## Continuous Deployment

### Option 1: Manual Deployment via Wrangler

Deploy a new version manually:
```bash
# Build and deploy in one go
npm run build && npm run deploy
```

### Option 2: GitHub Actions (Recommended for CI/CD)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

Set up the secret:
1. Generate Cloudflare API token at [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Use "Edit Cloudflare Workers" template
3. Add as `CLOUDFLARE_API_TOKEN` secret in GitHub repository settings

## Troubleshooting

### Build Fails
- Check that Node.js version is 18 or higher: `node --version`
- Clear build cache: `rm -rf .next .open-next node_modules && npm install`
- Verify all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run lint`

### Deployment Fails
- Verify Wrangler authentication: `npx wrangler whoami`
- Re-login if needed: `npx wrangler login`
- Check wrangler.jsonc syntax is valid JSON
- Ensure compatibility_date is not in the future

### Contact Form Not Working
- Verify `NEXT_PUBLIC_FORMSPREE_ID` is set correctly
- Check Formspree dashboard for submissions
- Look for CORS errors in browser console
- Test form locally first: `npm run preview`

### Worker Not Running
- Check worker logs: `npx wrangler tail`
- Verify compatibility flags in wrangler.jsonc
- Ensure .open-next/worker.js exists after build
- Check for runtime errors in Cloudflare dashboard

### Assets Not Loading
- Verify .open-next/assets directory exists
- Check assets path in wrangler.jsonc
- Clear Cloudflare cache in dashboard
- Rebuild and redeploy: `npm run build && npm run deploy`

## Monitoring

### Formspree Dashboard
- Monitor form submissions
- Check spam filtering
- Review submission analytics

### Cloudflare Workers Analytics
- Request count and duration
- CPU usage metrics
- Error rates
- Geographic distribution

View metrics:
```bash
# View real-time logs
npx wrangler tail

# Or check dashboard
# Go to Workers & Pages > iops-pro > Metrics
```

### Cloudflare Web Analytics (Optional)
Add to your site for privacy-friendly analytics:
1. Enable in Cloudflare dashboard
2. Add tracking script to layout.tsx

## Support Resources

- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Cloudflare Workers**: [developers.cloudflare.com/workers](https://developers.cloudflare.com/workers)
- **OpenNext**: [opennext.js.org](https://opennext.js.org)
- **Wrangler**: [developers.cloudflare.com/workers/wrangler](https://developers.cloudflare.com/workers/wrangler)
- **Formspree**: [help.formspree.io](https://help.formspree.io)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)

## Backup and Recovery

Regular backups are automatic with Git:
- Code is in your Git repository
- Form submissions are in Formspree dashboard
- Worker code is versioned in Cloudflare

To rollback a deployment:
1. Go to Cloudflare Dashboard > Workers & Pages
2. Select your worker (`iops-pro`)
3. Click "Deployments" or "Versions" tab
4. Find previous successful deployment
5. Click "Rollback to this version"

Or redeploy from a previous Git commit:
```bash
git checkout <previous-commit-hash>
npm run build && npm run deploy
git checkout main
```

## Quick Reference Commands

```bash
# Development
npm run dev              # Start Next.js dev server (localhost:3000)

# Build
npm run build            # Build with OpenNext for Cloudflare Workers

# Preview
npm run preview          # Test locally with Wrangler (localhost:8787)

# Deploy
npm run deploy           # Deploy to Cloudflare Workers

# Monitoring
npx wrangler tail        # View real-time worker logs
npx wrangler whoami      # Check authentication status
```

---

**Need Help?**
- Check Cloudflare Workers logs: `npx wrangler tail`
- Review Formspree submission history
- Test locally first: `npm run build && npm run preview`
- Check Cloudflare dashboard for deployment status

