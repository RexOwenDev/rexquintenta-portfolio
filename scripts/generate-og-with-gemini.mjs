#!/usr/bin/env node
/**
 * generate-og-with-gemini.mjs
 *
 * Uses Google Gemini Imagen 4 API to generate the OG image for rexquintenta.dev.
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

// Final working prompt — pure visual language, no CSS/code syntax
const IMAGE_PROMPT = `A professional developer portfolio banner. Dark navy blue background with a subtle faint grid pattern. Small L-shaped bracket marks in all four corners in glowing cyan. Centered layout top to bottom: small cyan uppercase text "AI AUTOMATION SPECIALIST", then large bold white text "Rex Quintenta", then smaller gray text "I build AI systems and automations that actually ship.", then small cyan text "3500+ Upwork Hours · 100% Job Success · 13 Live Workflows". Bottom right corner small gray text: rexquintenta.dev. Clean, minimal, dark tech aesthetic, like a modern software product card.`;

async function generateOGImage() {
  console.log('Generating OG image with Gemini Imagen 4...');
  console.log('Prompt length:', IMAGE_PROMPT.length, 'characters');

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;

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
