import JSZip from 'jszip';
import { DEFAULT_HERO_PAIRINGS } from '../data/heroPairingsData';

export interface ZipItem {
  filename: string;
  url: string;
}

/**
 * Triggers a file download in browser using an Object URL
 */
export function triggerBlobDownload(blob: Blob, filename: string): void {
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => window.URL.revokeObjectURL(blobUrl), 60000);
}

/**
 * Client-side ZIP generator: downloads individual images in small batches
 * and compiles them into a ZIP entirely within browser memory.
 * This completely avoids Cloud Run / proxy response payload limits (32MB limit).
 */
export async function downloadCustomImagesZip(
  items: ZipItem[],
  zipFilename: string = 'stoffa_hero_images.zip',
  onProgress?: (current: number, total: number, message: string) => void
): Promise<void> {
  if (!items || items.length === 0) {
    throw new Error('No images selected to download');
  }

  const zip = new JSZip();
  const total = items.length;
  const folder = zip.folder('stoffa_hero_images') || zip;

  onProgress?.(0, total, `Starting download of ${total} images...`);

  // Download images in concurrent batches of 3 for speed and network stability
  const CONCURRENCY = 3;
  let completed = 0;

  for (let i = 0; i < items.length; i += CONCURRENCY) {
    const batch = items.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (item) => {
        try {
          const resp = await fetch(item.url);
          if (!resp.ok) {
            console.warn(`Failed to fetch ${item.filename} (HTTP ${resp.status})`);
            return;
          }
          const blob = await resp.blob();
          const cleanName = item.filename.replace(/[/\\?%*:|"<>]/g, '_');
          folder.file(cleanName, blob);
        } catch (err) {
          console.error(`Error loading ${item.filename}:`, err);
        } finally {
          completed++;
          onProgress?.(
            completed,
            total,
            `Downloading images (${completed}/${total})...`
          );
        }
      })
    );
  }

  onProgress?.(total, total, 'Compressing images into .ZIP archive...');

  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'STORE', // Images (JPG) are already compressed; STORE is much faster and uses negligible CPU/RAM
    },
    (metadata) => {
      onProgress?.(
        total,
        total,
        `Building ZIP: ${Math.round(metadata.percent)}%`
      );
    }
  );

  onProgress?.(total, total, 'Saving ZIP to your Downloads...');
  triggerBlobDownload(zipBlob, zipFilename);
  onProgress?.(total, total, '✓ Download complete!');
}

/**
 * Downloads all official Stoffa hero images (all 38 active slides)
 * safely and cleanly via client-side ZIP packaging.
 */
export async function downloadAllHeroImagesZip(
  onProgress?: (current: number, total: number, message: string) => void
): Promise<void> {
  const allItems: ZipItem[] = DEFAULT_HERO_PAIRINGS.map((p) => ({
    filename: p.cleanFilename,
    url: p.imageSrc,
  }));

  await downloadCustomImagesZip(
    allItems,
    'stoffa_hero_images_all_38.zip',
    onProgress
  );
}
