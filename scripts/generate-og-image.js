#!/usr/bin/env node

/**
 * Generate OG image (OpenGraph/Twitter card image) from SVG
 * Creates a 1200x630 PNG image for social media sharing
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_PATH = path.join(__dirname, '../public/og-image.svg');
const OUTPUT_PNG = path.join(__dirname, '../public/og-image.png');
const OUTPUT_JPG = path.join(__dirname, '../public/og-image.jpg');

async function generateOGImage() {
  try {
    // Read SVG
    const svgBuffer = fs.readFileSync(SVG_PATH);

    // Generate PNG (preferred format for social media)
    await sharp(svgBuffer)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 10, g: 102, b: 194, alpha: 1 }
      })
      .png()
      .toFile(OUTPUT_PNG);

    console.log(`✓ Generated ${OUTPUT_PNG} (1200x630 PNG)`);

    // Also generate JPG as fallback (smaller file size)
    await sharp(svgBuffer)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 10, g: 102, b: 194, alpha: 1 }
      })
      .jpeg({ quality: 90 })
      .toFile(OUTPUT_JPG);

    console.log(`✓ Generated ${OUTPUT_JPG} (1200x630 JPG)`);
    console.log('\n✓ OG image generation complete!');
    console.log('Both PNG and JPG formats are available for maximum compatibility.');

  } catch (error) {
    console.error('Error generating OG image:', error.message);
    process.exit(1);
  }
}

generateOGImage();

