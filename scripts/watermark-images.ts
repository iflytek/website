/**
 * Prebuild script: generate watermarked copies of blog images into
 * public/images/watermarked/.  The originals in src/assets/images/ are never
 * modified.
 *
 * How it works:
 *   1. Reads every supported image from src/assets/images/.
 *   2. Composites an SVG watermark overlay via sharp.
 *   3. Writes the result to public/images/watermarked/<filename>.
 *
 * The watermarked images are served as static assets from public/.
 * The <Image watermark /> component references them via /images/watermarked/…
 */
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = join(process.cwd(), 'src', 'assets', 'images');
const OUTPUT_DIR = join(process.cwd(), 'public', 'images', 'watermarked');

const SUPPORTED_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.tiff']);

// Watermark configuration
const WATERMARK_TEXT = '@iFLYTEK OpenSource';
const FONT_SIZE = 28;
const MARGIN = 16;

function isSupported(filename: string): boolean {
  return SUPPORTED_EXTS.has(extname(filename).toLowerCase());
}

/**
 * Build an SVG overlay with the watermark text positioned at the bottom-right.
 */
function watermarkSvg(imageWidth: number, imageHeight: number): string {
  const scale = Math.max(0.5, Math.min(imageWidth / 900, 2));
  const fontSize = Math.round(FONT_SIZE * scale);

  const boxWidth = fontSize * 20;
  const boxHeight = fontSize * 1.6;
  const margin = Math.round(MARGIN * scale);
  const paddingX = Math.round(14 * scale);

  const boxX = imageWidth - boxWidth - margin;
  const boxY = imageHeight - boxHeight - margin;
  const textX = boxX + boxWidth - paddingX;
  const textY = boxY + boxHeight * 0.82;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${imageWidth} ${imageHeight}" width="${imageWidth}" height="${imageHeight}">
  <rect x="${boxX}" y="${boxY}" width="${boxWidth}" height="${boxHeight}" rx="8" fill="rgba(0,0,0,0.3)"/>
  <text x="${textX}" y="${textY}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="400" fill="rgba(255,255,255,0.7)" text-anchor="end" dominant-baseline="auto">${WATERMARK_TEXT}</text>
</svg>`;
}

async function processImage(filename: string): Promise<void> {
  const srcPath = join(IMAGES_DIR, filename);
  const destPath = join(OUTPUT_DIR, filename);

  const image = sharp(srcPath);
  const metadata = await image.metadata();
  const width = metadata.width ?? 900;
  const height = metadata.height ?? 506;

  const svgOverlay = watermarkSvg(width, height);
  const svgBuffer = Buffer.from(svgOverlay);

  await sharp(srcPath)
    .composite([{ input: svgBuffer, top: 0, left: 0 }])
    .toFile(destPath + '.tmp');

  // Atomic replace
  const { renameSync } = await import('node:fs');
  renameSync(destPath + '.tmp', destPath);

  console.log(`  ✓ ${filename} (${width}×${height})`);
}

async function main(): Promise<void> {
  console.log('watermark-images: scanning', IMAGES_DIR);

  // Ensure output dir exists
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Collect image files (skip GIF — sharp composite doesn't support animated GIFs)
  const allFiles = readdirSync(IMAGES_DIR).filter((f) => {
    const full = join(IMAGES_DIR, f);
    return statSync(full).isFile() && isSupported(f);
  });

  if (allFiles.length === 0) {
    console.log('watermark-images: no images found, skipping.');
    return;
  }

  for (const filename of allFiles) {
    await processImage(filename);
  }

  console.log(`watermark-images: done (${allFiles.length} images → ${OUTPUT_DIR})`);
}

main().catch((err) => {
  console.error('watermark-images: FAILED', err);
  process.exit(1);
});
