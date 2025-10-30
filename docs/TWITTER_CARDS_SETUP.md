# Twitter Cards Setup Guide

This guide explains how Twitter card previews work for your IOPS website and how to verify/test them.

## What Are Twitter Cards?

When someone shares a link to your website on Twitter, Twitter Cards display a rich preview with:
- **Large image** (1200x630px)
- **Title**
- **Description**
- **Site name**

This makes your links more attractive and increases click-through rates.

## Current Setup

Your Twitter Cards are configured in `/app/layout.tsx` with:

- **Card Type**: `summary_large_image` (displays large preview image)
- **Title**: "IOPS | Intelligent Operations with AI"
- **Description**: "We build intelligent AI systems that automate, monitor, and scale business operations."
- **Image**: `https://iops.pro/og-image.png` (1200x630 PNG)
- **Absolute URLs**: Required by Twitter (already configured)

## Image Files Generated

Two formats are available for maximum compatibility:
- `/public/og-image.png` - PNG format (primary, better quality)
- `/public/og-image.jpg` - JPG format (fallback, smaller file size)

Both are 1200x630 pixels, the recommended size for Twitter Cards.

## Verification Steps

### 1. Test with Twitter Card Validator

**Before sharing on Twitter**, test your cards:

1. Go to: https://cards-dev.twitter.com/validator
2. Enter your URL: `https://iops.pro`
3. Click "Preview card"
4. Check that the preview shows:
   - ✓ Large image (your OG image)
   - ✓ Correct title
   - ✓ Correct description
   - ✓ Site name

### 2. Test with Facebook Sharing Debugger

Facebook uses OpenGraph (similar to Twitter Cards):

1. Go to: https://developers.facebook.com/tools/debug/
2. Enter: `https://iops.pro`
3. Click "Debug"
4. Check the preview

**Important**: After making changes, click "Scrape Again" to refresh Facebook's cache.

### 3. Test Actual Sharing

After verifying:
1. Post a link to `https://iops.pro` on Twitter
2. Check that the card preview appears correctly
3. Test on different devices (mobile/desktop)

## Troubleshooting

### Card Not Showing?

1. **Check image URL is absolute**
   - ✅ `https://iops.pro/og-image.png`
   - ❌ `/og-image.png`

2. **Verify image is accessible**
   - Visit `https://iops.pro/og-image.png` directly
   - Should load without errors

3. **Check image size**
   - Must be at least 300x157px
   - Recommended: 1200x630px
   - Maximum: 4096x4096px

4. **Clear Twitter's cache**
   - Use Twitter Card Validator (forces refresh)
   - Cards are cached, changes may take time

5. **Verify meta tags**
   - Check page source for `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

### Image Too Small/Large?

Regenerate the OG image:
```bash
npm run generate:og-image
```

This creates fresh PNG and JPG files from your SVG source.

### Wrong Title/Description?

Update in `/app/layout.tsx`:
- `metadata.twitter.title`
- `metadata.twitter.description`

Then redeploy and clear Twitter's cache using the validator.

## Twitter Handle Setup

Currently placeholder values are used:
- `creator: "@iopspro"`
- `site: "@iopspro"`

**To update with your actual Twitter handle:**

1. Update `/app/layout.tsx`:
   ```typescript
   twitter: {
     creator: "@your_actual_handle",
     site: "@your_actual_handle",
   }
   ```

2. Also update `organizationSchema.sameAs` array with your Twitter URL

## Best Practices

1. **Use absolute URLs** for images (already done ✅)
2. **Use PNG or JPG** (avoid SVG for social cards)
3. **Image dimensions**: 1200x630px (1.91:1 ratio)
4. **File size**: Keep under 1MB (better for loading)
5. **Test before sharing**: Always use validators first
6. **Update descriptions**: Keep them compelling and concise (under 200 chars)

## Quick Commands

```bash
# Regenerate OG image (PNG + JPG)
npm run generate:og-image

# Regenerate PWA icons
npm run generate:icons
```

## Next Steps

1. ✅ OG images generated (PNG + JPG)
2. ✅ Twitter Cards configured
3. ✅ Absolute URLs set
4. [ ] Update Twitter handle (if you have one)
5. [ ] Test with Twitter Card Validator
6. [ ] Test actual sharing on Twitter
7. [ ] Monitor engagement on shared links

