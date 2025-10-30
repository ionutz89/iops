#!/usr/bin/env node

/**
 * Generate PWA icons from favicon or create branded icons
 * Creates 192x192 and 512x512 PNG icons for PWA manifest
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/icons');
const SIZES = [192, 512];

// Create a simple branded icon SVG with IOPS branding
const createBrandedIconSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#007AFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6366F1;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.2}"/>
  <text
    x="50%"
    y="50%"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="${size * 0.4}"
    font-weight="bold"
    fill="white"
    text-anchor="middle"
    dominant-baseline="central"
  >IOPS</text>
</svg>
`;

async function generateIcons() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }

  const faviconPath = path.join(__dirname, '../app/favicon.ico');
  const ogImagePath = path.join(__dirname, '../public/og-image.svg');

  let sourceImage = null;
  let sourceType = null;

  // Try to use favicon first
  if (fs.existsSync(faviconPath)) {
    try {
      sourceImage = faviconPath;
      sourceType = 'favicon';
      console.log('Using favicon.ico as source');
    } catch (error) {
      console.warn('Could not read favicon, trying alternatives...');
    }
  }

  // Try og-image.svg as fallback
  if (!sourceImage && fs.existsSync(ogImagePath)) {
    sourceImage = ogImagePath;
    sourceType = 'svg';
    console.log('Using og-image.svg as source');
  }

  // Generate icons for each size
  for (const size of SIZES) {
    const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);

    try {
      if (sourceImage && sourceType === 'favicon') {
        // Resize favicon
        await sharp(sourceImage)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 122, b: 255, alpha: 1 }
          })
          .png()
          .toFile(outputPath);
      } else if (sourceImage && sourceType === 'svg') {
        // Convert SVG to PNG
        await sharp(sourceImage)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 122, b: 255, alpha: 1 }
          })
          .png()
          .toFile(outputPath);
      } else {
        // Generate branded icon from SVG string
        const svgBuffer = Buffer.from(createBrandedIconSVG(size));
        await sharp(svgBuffer)
          .png()
          .toFile(outputPath);
      }

      console.log(`✓ Generated ${outputPath} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${size}x${size} icon:`, error.message);

      // Fallback to branded SVG if source fails
      try {
        const svgBuffer = Buffer.from(createBrandedIconSVG(size));
        await sharp(svgBuffer)
          .png()
          .toFile(outputPath);
        console.log(`✓ Generated ${outputPath} (${size}x${size}) using fallback`);
      } catch (fallbackError) {
        console.error(`✗ Fallback also failed:`, fallbackError.message);
      }
    }
  }

  console.log('\n✓ PWA icon generation complete!');
  console.log(`Icons are available at: ${OUTPUT_DIR}`);
}

// Run the script
generateIcons().catch((error) => {
  console.error('Error generating icons:', error);
  process.exit(1);
});

