# Website Migration to Root

**Date**: October 29, 2025

## What Changed

The website files have been moved from `iops-website/` subdirectory to the root directory for easier deployment.

### Before:
```
/Users/ionut/iops/
├── iops-website/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── ...
```

### After:
```
/Users/ionut/iops/
├── app/
├── components/
├── lib/
├── public/
├── docs/          # Documentation moved here
└── ...
```

## Deployment Commands

Now you can deploy directly from the root:

```bash
# Install dependencies
npm install

# Build for Cloudflare
npm run build

# Deploy
npm run deploy
```

## Cloudflare Pages Configuration

Update your Cloudflare Pages settings to:

```
Build command: npm install && npm run build
Build output directory: .open-next/assets
Root directory: (leave blank or set to /)
```

## What to Delete

The old `iops-website/` directory can now be safely deleted:

```bash
rm -rf iops-website/
```

## Benefits

✅ Simpler project structure
✅ No subdirectory confusion in deployment
✅ Cleaner paths in wrangler.jsonc
✅ Standard Next.js project layout

