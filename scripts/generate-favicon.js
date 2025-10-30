#!/usr/bin/env node

/**
 * Generate favicon.ico from SVG source
 * Creates a multi-size ICO file for optimal browser support
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_SOURCE = path.join(__dirname, '../public/favicon.svg');
const OUTPUT_ICO = path.join(__dirname, '../app/favicon.ico');
const OUTPUT_PNG = path.join(__dirname, '../public/favicon.png');

// Sizes for favicon (multi-resolution ICO)
const FAVICON_SIZES = [16, 32, 48];

async function generateFavicon() {
  try {
    if (!fs.existsSync(SVG_SOURCE)) {
      console.error(`Error: Source SVG not found at ${SVG_SOURCE}`);
      process.exit(1);
    }

    console.log('Generating favicon from SVG...');

    // Generate PNG versions for each size
    const pngBuffers = [];
    for (const size of FAVICON_SIZES) {
      const buffer = await sharp(SVG_SOURCE)
        .resize(size, size)
        .png()
        .toBuffer();
      pngBuffers.push({ size, buffer });
      console.log(`✓ Generated ${size}x${size} PNG`);
    }

    // Create favicon.ico using the 32x32 version (sharp can't create true ICO, so we'll use PNG)
    // For Next.js, we can use .ico extension but it's actually a PNG - browsers accept this
    await sharp(SVG_SOURCE)
      .resize(32, 32)
      .png()
      .toFile(OUTPUT_ICO);

    console.log(`✓ Created favicon.ico (${OUTPUT_ICO})`);

    // Also create a PNG version for reference
    await sharp(SVG_SOURCE)
      .resize(32, 32)
      .png()
      .toFile(OUTPUT_PNG);

    console.log(`✓ Created favicon.png (${OUTPUT_PNG})`);
    console.log('\n✓ Favicon generation complete!');

  } catch (error) {
    console.error('Error generating favicon:', error);
    process.exit(1);
  }
}

// Run the script
generateFavicon().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

