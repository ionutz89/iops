# Cloudflare Pages Deployment Setup

## The Problem

Cloudflare Pages was executing `npx wrangler deploy` directly without building the application first, causing this error:
```
✘ [ERROR] The entry-point file at ".open-next/worker.js" was not found.
```

## The Solution

Configure Cloudflare Pages with the correct build settings.

---

## Cloudflare Pages Configuration

### Option 1: Using Cloudflare Dashboard (RECOMMENDED)

1. Go to your Cloudflare Dashboard
2. Navigate to **Workers & Pages** → Your project (`iops-pro`)
3. Click **Settings** → **Builds & deployments**
4. Configure as followss:

```
Build configuration:
┌─────────────────────────────────────────────────────────┐
│ Framework preset:        None                           │
│ Build command:          npm run build                   │
│ Build output directory: .open-next/assets               │
│ Root directory:         /                               │
│ Environment variables:  (if needed)                     │
└─────────────────────────────────────────────────────────┘
```

**Important Settings:**
- **Build command**: `npm run build`
- **Build output directory**: `.open-next/assets`
- **Node version**: `22` (set in Environment Variables if needed)

### Option 2: Using wrangler.toml Configuration

If you prefer to use `wrangler.toml` instead of `wrangler.jsonc`:

```toml
name = "iops-pro"
main = ".open-next/worker.js"
compatibility_date = "2024-12-30"
compatibility_flags = ["nodejs_compat", "global_fetch_strictly_public"]

[assets]
directory = ".open-next/assets"
update
[build]
command = "npm run build"
cwd = "."
watch_dirs = ["app", "components", "lib", "public"]
```

### Option 3: Using Cloudflare Pages CLI

Deploy from command line with explicit build:

```bash
# Install Wrangler globally (if not already)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build and deploy in one command
npm run build && wrangler pages deploy .open-next/assets --project-name=iops-pro
```

---

## Build Process Explained

### What happens when you run `npm run build`:

1. **Next.js Build** (`next build`)
   - Compiles TypeScript to JavaScript
   - Optimizes React components
   - Generates static assets
   - Creates `.next` directory

2. **OpenNext Cloudflare Adapter** (`@opennextjs/cloudflare build`)
   - Converts Next.js build to Cloudflare Worker format
   - Creates `.open-next/worker.js` (the entry point Wrangler needs)
   - Generates `.open-next/assets/` directory with static files
   - Configures routing and middleware

3. **Wrangler Deploy** (happens in Cloudflare Pages or via `npm run deploy`)
   - Uploads `worker.js` as Cloudflare Worker
   - Uploads assets to Cloudflare CDN
   - Configures routes and bindings

---

## Verification Steps

### 1. Test Local Build

```bash
# Clean previous builds
rm -rf .next .open-next

# Run full build
npm run build

# Verify worker.js exists
ls -la .open-next/worker.js
# Should show: -rw-r--r-- ... .open-next/worker.js

# Verify assets directory
ls -la .open-next/assets/
# Should show: _next/, favicon.ico, etc.

# Test locally with Wrangler
npm run preview
# Visit: http://localhost:8787
```

### 2. Check Build Output

After `npm run build`, you should see:

```
✓ Compiled successfully
✓ Generating static pages
✓ Finalizing page optimization

Route (app)
┌ ○ /
└ ○ /_not-found

○  (Static)  prerendered as static content

OpenNext: Build completed
Worker: .open-next/worker.js
Assets: .open-next/assets/
```

### 3. Deploy to Cloudflare

```bash
# Option A: Using npm script (builds first)
npm run deploy

# Option B: Using Cloudflare Pages (push to git)
git push origin main
# Cloudflare Pages will automatically build and deploy
```

---

## Troubleshooting

### Issue: "worker.js not found"
**Solution**: Make sure you run `npm run build` before `wrangler deploy`

```bash
# Wrong (this is what was happening)
wrangler deploy

# Correct
npm run build && wrangler deploy

# Or use npm script
npm run deploy
```

### Issue: Build succeeds locally but fails on Cloudflare Pages
**Solution**: Check Cloudflare Pages build settings

1. Go to Settings → Builds & deployments
2. Verify "Build command" is set to: `npm run build`
3. Verify "Build output directory" is: `.open-next/assets`
4. Add environment variable if needed: `NODE_VERSION=22`

### Issue: "Module not found" errors during build
**Solution**: Clear cache and rebuild

```bash
# Locally
rm -rf node_modules .next .open-next
npm install
npm run build

# On Cloudflare Pages
Settings → Builds & deployments → Clear cache → Retry deployment
```

---

## Package Scripts Reference

Your `package.json` scripts:

```json
{
  "scripts": {
    "build": "next build && npx @opennextjs/cloudflare build --skipBuild",
    "build:next": "next build",
    "build:worker": "npx @opennextjs/cloudflare build --skipBuild",
    "deploy": "npm run build && wrangler deploy",
    "dev": "next dev",
    "preview": "wrangler dev",
    "start": "next start"
  }
}
```

**What each script does:**

- `npm run build` - Full production build (Next.js + Worker)
- `npm run build:next` - Only build Next.js (creates `.next/`)
- `npm run build:worker` - Only generate Worker (requires `.next/` to exist)
- `npm run deploy` - Build and deploy to Cloudflare
- `npm run dev` - Local development server
- `npm run preview` - Preview Cloudflare Worker locally

---

## Recommended Deployment Workflow

### For Automatic Deployments (Git-based):

1. **Configure Cloudflare Pages once** (see Option 1 above)
2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "feat: your changes" --signoff
   git push origin main
   ```
3. **Cloudflare automatically**:
   - Detects push
   - Runs `npm install`
   - Runs `npm run build`
   - Deploys `.open-next/worker.js` and assets

### For Manual Deployments:

```bash
# Full deployment from local machine
npm run deploy
```

---

## Current Status

✅ Build script fixed: `"deploy": "npm run build && wrangler deploy"`
✅ Build process tested locally
✅ Changes committed and pushed to main

🔧 **ACTION REQUIRED**: Update Cloudflare Pages build settings

Go to: https://dash.cloudflare.com → Workers & Pages → iops-pro → Settings

Change:
- **Build command**: From `npx wrangler deploy` → To `npm run build`
- **Build output directory**: `.open-next/assets`

Then trigger a new deployment or push a commit to main branch.

---

## Expected Deployment Logs (After Fix)

```
✓ Installing dependencies
✓ Building application
   Creating an optimized production build
   ✓ Compiled successfully
   ✓ Generating static pages
   ✓ Finalizing page optimization
   OpenNext: Generating Cloudflare Worker
   ✓ Worker created: .open-next/worker.js
   ✓ Assets directory: .open-next/assets
✓ Deploying to Cloudflare
   ✓ Uploaded worker.js
   ✓ Uploaded assets
   ✓ Deployment complete
   🎉 Published to: https://iops-pro.pages.dev
```

---

## Support

If you continue to have issues after updating the Cloudflare Pages settings:

1. Check deployment logs in Cloudflare Dashboard
2. Verify build output locally with `npm run build`
3. Test with `npm run preview` before deploying
4. Clear Cloudflare build cache: Settings → Clear cache

**The fix is to change the Cloudflare Pages build command from `npx wrangler deploy` to `npm run build`.**

