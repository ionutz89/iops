# Deployment Exclusions Configuration

## Overview
This document explains how documentation and development files are excluded from Cloudflare Workers deployment.

## Files Created

### 1. `.wranglerignore`
Controls what Wrangler (Cloudflare Workers CLI) ignores when deploying.

**Excluded documentation files:**
- `*.md` (all markdown files)
- `DEPLOYMENT.md`
- `README.md`
- `PROJECT_SUMMARY.md`
- `SETUP.md`
- `CLOUDFLARE_WORKERS_MIGRATION.md`
- `IMPROVEMENTS_SUMMARY.md`

**Also excluded:**
- Development files (`.git`, `.github`, `.vscode`, `.idea`)
- Test files (`*.test.ts`, `*.spec.ts`)
- Source build artifacts (`.next`, `.open-next`, `out`)
- Environment files (`.env*`)
- Editor files (`.DS_Store`, `*.swp`, etc.)
- Log files (`*.log`)

### 2. `.cloudflareignore`
Additional layer of protection for Cloudflare deployments.

**Key exclusions:**
- All documentation (`.md` files)
- Development configuration files (`tsconfig.json`, `eslint.config.mjs`, etc.)
- Source code directories (`app/`, `components/`, `lib/`)
- Dependencies (`node_modules/`)
- Package files (`package.json`, `package-lock.json`)

## How It Works

### Wrangler Deployment Process
1. `npm run build` → Creates `.open-next/` directory with optimized assets
2. Wrangler reads `.wranglerignore` → Excludes specified files/directories
3. Only `.open-next/assets/` and `worker.js` are deployed to Cloudflare

### What Gets Deployed
✅ **Deployed:**
- `.open-next/worker.js` (Cloudflare Worker script)
- `.open-next/assets/` (Static assets, compiled JS, CSS)
- Optimized images and fonts

❌ **Not Deployed:**
- Source TypeScript/TSX files
- Documentation markdown files
- Configuration files
- Development dependencies
- Environment variables (use Cloudflare secrets instead)

## Verification

To verify what will be deployed, run:
```bash
# Build the project
npm run build

# Preview what Wrangler will deploy
wrangler deploy --dry-run

# Check the size of deployment
du -sh .open-next/
```

## Security Benefits

1. **No Source Code Exposure**: Original TypeScript/React source is not deployed
2. **No Configuration Leaks**: Config files stay local
3. **No Documentation Bloat**: Docs don't inflate worker size
4. **Optimized Bundle**: Only compiled, minified code is deployed

## Cloudflare Workers Limits

- **Worker Size**: Max 10 MB (compressed)
- **Assets**: Unlimited with R2/KV storage
- By excluding unnecessary files, we stay well under limits

## Maintenance

When adding new documentation files:
1. Add the filename to `.wranglerignore`
2. Add the filename to `.cloudflareignore`
3. Commit both files to git

## Testing Deployment

```bash
# Local preview (includes all files)
npm run dev

# Preview deployment (excludes ignored files)
npm run preview

# Production deployment
npm run deploy
```

## Related Files

- `wrangler.jsonc` - Wrangler configuration
- `next.config.ts` - Next.js configuration
- `.gitignore` - Git exclusions (development only)
- `.wranglerignore` - Wrangler deployment exclusions
- `.cloudflareignore` - Cloudflare deployment exclusions

## Notes

- `.gitignore` controls what's tracked in git (development)
- `.wranglerignore` controls what Wrangler deploys (production)
- `.cloudflareignore` is an additional safety layer
- Both ignore files are committed to git for consistency

## Best Practices

1. ✅ Keep documentation in repository (for developers)
2. ✅ Exclude documentation from deployment (for performance)
3. ✅ Use environment variables via Cloudflare secrets
4. ✅ Review `.wranglerignore` when adding new file types
5. ✅ Test deployment size before pushing to production
