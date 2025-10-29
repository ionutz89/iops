# Migration to Cloudflare Workers with OpenNext

This document summarizes the migration from static export (Cloudflare Pages) to Cloudflare Workers deployment using the OpenNext adapter.

## What Changed

### 1. Dependencies Added
- `@opennextjs/cloudflare@^1.2.0` - Adapter for deploying Next.js to Cloudflare Workers
- `wrangler@^3.100.0` - Cloudflare Workers CLI tool

### 2. Configuration Files

#### `package.json` Scripts Updated
```json
{
  "build": "npx @opennextjs/cloudflare",    // Changed from "next build"
  "preview": "wrangler dev",                // New: Local testing with Wrangler
  "deploy": "wrangler deploy"               // New: Deploy to Cloudflare
}
```

#### `wrangler.jsonc` Created
New configuration file for Cloudflare Workers deployment:
- Worker name: `iops-pro`
- Main entry: `.open-next/worker.js`
- Assets directory: `.open-next/assets`
- Compatibility flags for Node.js APIs

#### `next.config.ts` Simplified
Removed:
- `output: 'export'` - No longer using static export
- `images: { unoptimized: true }` - Workers support dynamic images

Kept:
- `trailingSlash: true` - For consistent URL behavior

#### `.gitignore` Updated
Added:
- `/.open-next/` - OpenNext build output
- `/.wrangler/` - Wrangler cache and local dev files

## Migration Steps

### Step 1: Install Dependencies
```bash
cd iops-website
npm install
```

This will install the new devDependencies:
- `@opennextjs/cloudflare`
- `wrangler`

### Step 2: Test Build Locally
```bash
# Build with OpenNext
npm run build

# Preview locally with Wrangler
npm run preview
```

Open http://localhost:8787 to test the site locally.

### Step 3: Deploy to Cloudflare
```bash
# Login to Cloudflare (first time only)
npx wrangler login

# Deploy
npm run deploy
```

## Key Differences

### Before (Static Export)
- **Build Output**: `out/` directory with static HTML/CSS/JS
- **Deployment**: Cloudflare Pages
- **Build Command**: `next build`
- **Hosting**: Static files served from CDN
- **Images**: Unoptimized (static)
- **API Routes**: Not supported

### After (Cloudflare Workers)
- **Build Output**: `.open-next/` directory with worker code
- **Deployment**: Cloudflare Workers
- **Build Command**: `npx @opennextjs/cloudflare`
- **Hosting**: Edge runtime with serverless functions
- **Images**: Can be optimized (Next.js Image Optimization)
- **API Routes**: Fully supported
- **Server Components**: Fully supported
- **Middleware**: Fully supported

## Benefits of Migration

1. **Full Next.js Features**: Access to all Next.js capabilities (API routes, middleware, server components)
2. **Dynamic Rendering**: Support for SSR and ISR strategies
3. **Image Optimization**: Use Next.js built-in image optimization
4. **Better Performance**: Edge runtime for faster response times
5. **More Flexibility**: Can add backend functionality without separate services

## Testing Checklist

- [ ] Install dependencies: `npm install`
- [ ] Build succeeds: `npm run build`
- [ ] Local preview works: `npm run preview`
- [ ] All pages load correctly at http://localhost:8787
- [ ] Contact form submits successfully
- [ ] ROI calculator functions properly
- [ ] Dark/light theme toggle works
- [ ] Mobile responsive design intact
- [ ] Wrangler login: `npx wrangler login`
- [ ] Deploy succeeds: `npm run deploy`
- [ ] Production site loads correctly
- [ ] All functionality works in production

## Troubleshooting

### Build Fails
```bash
# Clear caches and reinstall
rm -rf .next .open-next node_modules
npm install
npm run build
```

### Wrangler Issues
```bash
# Check authentication
npx wrangler whoami

# Re-login if needed
npx wrangler login

# View logs
npx wrangler tail
```

### Environment Variables
If you have environment variables, set them with Wrangler:
```bash
npx wrangler secret put VARIABLE_NAME
```

Or add to `wrangler.jsonc`:
```json
{
  "vars": {
    "VARIABLE_NAME": "value"
  }
}
```

## Rollback Plan

If issues arise, you can rollback to static export:

1. Revert `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
```

2. Revert `package.json` scripts:
```json
{
  "build": "next build"
}
```

3. Build and deploy to Cloudflare Pages:
```bash
npm run build
npx wrangler pages deploy out --project-name=iops-pro
```

## Next Steps

1. Test the deployment thoroughly
2. Update DNS/domain settings if needed
3. Set up CI/CD with GitHub Actions (see DEPLOYMENT.md)
4. Monitor performance in Cloudflare dashboard
5. Consider adding API routes or server-side features

## Resources

- [OpenNext Documentation](https://opennext.js.org)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs)

