#!/usr/bin/env node
/**
 * generate-og-with-gemini.mjs
 *
 * Uses Google Gemini Imagen 3 API to generate the OG image for rexquintenta.dev.
 * Requires: GEMINI_API_KEY environment variable
 *
 * Run: GEMINI_API_KEY=your_key node scripts/generate-og-with-gemini.mjs
 * Output: public/og-image.png (1200×630px)
 *
 * This replaces the programmatic next/og image if you prefer an AI-generated design.
 * After generating, delete src/app/opengraph-image.tsx to use the static PNG instead.
 */

import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is required.');
  console.error('Get your key at: https://aistudio.google.com/app/apikey');
  console.error('Then run: GEMINI_API_KEY=your_key node scripts/generate-og-with-gemini.mjs');
  process.exit(1);
}

// Maximally detailed Gemini Imagen 3 prompt for the Blueprint Systems OG image
const IMAGE_PROMPT = `
Create a professional Open Graph social preview image (1200x630 pixels, landscape) for a personal portfolio website.

DESIGN SYSTEM: "Blueprint Systems" — a dark technical aesthetic inspired by engineering blueprints and systems architecture.

BACKGROUND:
- Deep navy/near-black background color: #070d1a
- Subtle blueprint engineering grid overlay: very faint cyan lines (rgba(0,212,255,0.04)) forming a 24px repeating grid across the entire background
- The grid should be barely visible, like actual blueprint graph paper

CORNER MARKS:
- Place small L-shaped bracket corner marks at all 4 corners of the image
- Each corner mark is approximately 24x24 pixels, formed by two perpendicular lines (2px thick)
- Color: rgba(0,212,255,0.35) — semi-transparent electric cyan
- These should look like technical drawing registration marks or engineering viewport corners

CONTENT (centered vertically and horizontally, slight upper-center bias):

1. TOP LABEL (above the name):
   Text: "// AI AUTOMATION SPECIALIST"
   Font: monospace (engineering/code aesthetic)
   Size: 18px equivalent
   Color: #00d4ff (electric cyan)
   Letter spacing: very wide (like a technical label)
   Style: all uppercase

2. MAIN NAME (largest element, hero text):
   Text: "Rex Quintenta"
   Font: bold, clean sans-serif (similar to Geist or Inter)
   Size: 72-80px equivalent
   Color: #e2e8f0 (near-white, slightly cool)
   Font weight: 800 (extra bold)

3. SUBTITLE:
   Text: "I build AI systems and automations that actually ship."
   Font: regular weight sans-serif
   Size: 22px equivalent
   Color: #94a3b8 (muted blue-gray)

4. STATS ROW:
   Text: "3,500+ HRS  ·  100% JSS  ·  13+ WORKFLOWS"
   Font: monospace
   Size: 16px
   Color: #00d4ff (electric cyan)
   Style: dot-separated, technical display

5. DOMAIN (bottom-right corner):
   Text: "rexquintenta.dev"
   Font: monospace
   Size: 16px
   Color: #64748b (muted gray)
   Position: bottom-right, with padding

OVERALL AESTHETIC:
- Dark, technical, professional
- Engineering blueprint meets modern AI portfolio
- Clean and scannable at social media thumbnail sizes
- High contrast between the dark background and cyan/white text
- The image should feel like a sophisticated technical dashboard or architecture diagram header

DO NOT include:
- Generic stock photo elements
- Gradients (except very subtle vignette if needed)
- Decorative illustrations
- Profile photos
- Logos other than text

The final image should look like a professional product screenshot or engineering system overview card.
`;

async function generateOGImage() {
  console.log('Generating OG image with Gemini Imagen 3...');
  console.log('Prompt length:', IMAGE_PROMPT.length, 'characters');

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${API_KEY}`;

  const requestBody = {
    instances: [
      {
        prompt: IMAGE_PROMPT.trim(),
      }
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: '16:9',  // closest to 1200:630 ratio
      safetyFilterLevel: 'BLOCK_ONLY_HIGH',
      personGeneration: 'DONT_ALLOW',
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Imagen API error ${response.status}: ${error}`);
  }

  const result = await response.json();

  if (!result.predictions?.[0]?.bytesBase64Encoded) {
    throw new Error('No image data in response: ' + JSON.stringify(result));
  }

  const imageBase64 = result.predictions[0].bytesBase64Encoded;
  const imageBuffer = Buffer.from(imageBase64, 'base64');

  // Ensure public/ directory exists
  await mkdir(join(process.cwd(), 'public'), { recursive: true });

  const outputPath = join(process.cwd(), 'public', 'og-image.png');
  await writeFile(outputPath, imageBuffer);

  console.log(`OG image saved to: public/og-image.png`);
  console.log(`File size: ${(imageBuffer.length / 1024).toFixed(1)} KB`);
  console.log(`\nNext steps:`);
  console.log(`  1. Review the generated image`);
  console.log(`  2. If happy with it, delete src/app/opengraph-image.tsx`);
  console.log(`     (Next.js will then use public/og-image.png instead)`);
  console.log(`  3. Re-run: npm run build`);
}

generateOGImage().catch(err => {
  console.error('Generation failed:', err.message);
  process.exit(1);
});
