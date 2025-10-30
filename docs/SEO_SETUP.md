# SEO Setup Documentation

This document describes the complete SEO implementation for the IOPS website.

## Files Created

### Public Files (Auto-served by Next.js)

1. **`/public/llms.txt`** - AI crawler discovery file for LLMs
   - Provides contextual information for AI models
   - Accessible at: `https://iops.pro/llms.txt`

2. **`/public/robots.txt`** - Search engine crawler instructions
   - Allows all crawlers
   - References sitemap
   - Accessible at: `https://iops.pro/robots.txt`

3. **`/public/sitemap.xml`** - XML sitemap for search engines
   - Lists all pages with priorities and change frequencies
   - Accessible at: `https://iops.pro/sitemap.xml`

4. **`/public/manifest.json`** - Web App Manifest
   - PWA configuration
   - Defines app name, icons, theme colors
   - Accessible at: `https://iops.pro/manifest.json`

### Code Integration

1. **`/app/layout.tsx`** - Enhanced with:
   - Complete metadata (title, description, keywords, robots)
   - OpenGraph tags (Facebook, LinkedIn)
   - Twitter Card tags
   - JSON-LD structured data (Organization & WebSite schemas)
   - Google Analytics integration
   - Manifest link

2. **`/components/analytics-provider.tsx`** - Client component for:
   - Automatic page view tracking on route changes
   - Works with Next.js App Router

3. **`/lib/analytics.ts`** - Enhanced with:
   - `trackPageView()` function for GA4 integration

## Configuration

### Environment Variables

Add to your `.env.local` or deployment environment:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Your Google Analytics 4 Measurement ID
```

### Favicon Setup

The favicon is already configured at `/app/favicon.ico` and referenced in:
- `metadata.icons` in layout.tsx
- `manifest.json` for PWA support

### PWA Icons

PWA icons have been generated and are available in `/public/icons/`:
- `icon-192x192.png` (192x192 pixels) ✓ Created
- `icon-512x512.png` (512x512 pixels) ✓ Created

**To regenerate icons**, run:
```bash
npm run generate:icons
```

The script automatically:
- Uses your favicon.ico or og-image.svg as a source (if available)
- Falls back to a branded "IOPS" gradient icon if sources aren't compatible
- Generates both required sizes for PWA support

## Verification Checklist

- [ ] Verify `llms.txt` is accessible at `https://iops.pro/llms.txt`
- [ ] Verify `robots.txt` is accessible at `https://iops.pro/robots.txt`
- [ ] Verify `sitemap.xml` is accessible at `https://iops.pro/sitemap.xml`
- [ ] Verify `manifest.json` is accessible at `https://iops.pro/manifest.json`
- [ ] Add `NEXT_PUBLIC_GA_ID` environment variable with your GA4 ID
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test JSON-LD structured data using [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verify OpenGraph tags using [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Verify Twitter Cards using [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Test analytics tracking in development (check console logs)
- [ ] Verify analytics in production GA4 dashboard

## Search Engine Submission

### Google Search Console
1. Add property: `https://iops.pro`
2. Verify ownership (add verification code to `metadata.verification.google`)
3. Submit sitemap: `https://iops.pro/sitemap.xml`

### Bing Webmaster Tools
1. Add site: `https://iops.pro`
2. Verify ownership (add verification code to `metadata.verification.bing`)
3. Submit sitemap: `https://iops.pro/sitemap.xml`

### AI Crawlers (Optional)
- Perplexity AI
- OpenAI (for ChatGPT browsing)
- Other LLM providers may crawl automatically via `llms.txt`

## Metadata Structure

### Base Metadata (in layout.tsx)
- Title: "IOPS | Intelligent Operations with AI"
- Description: Comprehensive description of services
- Keywords: Relevant SEO keywords
- Robots: index, follow with optimized GoogleBot settings
- Canonical URLs: Configured via `metadataBase` and `alternates.canonical`

### OpenGraph Tags
- Title, description, image, URL, type
- Optimized for social media sharing

### Twitter Cards
- Large image card format
- Title, description, image

### JSON-LD Structured Data
1. **Organization Schema**: Company information, contact details
2. **WebSite Schema**: Site information with search action

## Analytics

Google Analytics 4 is integrated with:
- Automatic page view tracking on route changes
- Event tracking utilities in `/lib/analytics.ts`
- Development logging for debugging

To track custom events, use:
```typescript
import { track, trackCTAClick, trackFormSubmit } from '@/lib/analytics';

// Generic event
track('button_click', { button: 'contact' });

// CTA click
trackCTAClick('Get Started', 'hero');

// Form submission
trackFormSubmit('contact_form', true);
```

## Next Steps

1. ✓ PWA icons generated and ready
2. Create an OG image (`/public/og-image.jpg` or `.png`) at 1200x630 pixels (currently using `.svg`)
3. Add verification codes to `metadata.verification` when available
4. Monitor analytics after deployment
5. Submit for indexing in search engines

## Troubleshooting

### Analytics not working?
- Check `NEXT_PUBLIC_GA_ID` is set correctly
- Verify GA4 property exists and is active
- Check browser console for errors
- Ensure ad blockers aren't blocking GA

### Structured data errors?
- Use Google Rich Results Test to validate
- Check JSON-LD syntax in browser dev tools
- Ensure all required fields are present

### Sitemap not found?
- Verify file exists at `/public/sitemap.xml`
- Check robots.txt references correct sitemap URL
- Ensure Cloudflare Pages serves static files correctly

