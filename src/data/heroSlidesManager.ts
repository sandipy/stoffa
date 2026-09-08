import { DEFAULT_HERO_PAIRINGS, HeroImagePairingItem } from './heroPairingsData';

export interface HeroSlideConfig {
  id: string;
  order: number;
  category: string;
  cleanFilename: string;
  rawFilename: string;
  badge: string;
  title: string;
  subtitle: string;
  button1Text: string;
  button1Target: string;
  button2Text: string;
  button2Target: string;
  pairedShoes: string;
  pairedShoesUrl: string;
  pairedBag: string;
  pairedBagUrl: string;
  description: string;
  altText: string;
  imageUrl: string;
  isCustomImage?: boolean;
  customImageName?: string;
  isUnavailable?: boolean;
  isDeleted?: boolean;
}

const DEFAULT_BADGES = [
  'REGAL HERITAGE',
  'RESORT EDIT 2026',
  'COUTURE GALA',
  'COASTAL RESORT',
  'ARCHITECTURAL ATELIER',
  'FESTIVE CELEBRATION',
  'DESERT ROYALE',
  'GENERATIONS OF GRACE',
  'RIVIERA YACHT EDIT',
  'BOTANICAL SANCTUARY',
  'FLAGSHIP ARRIVALS',
  'BRIDAL COUTURE',
  'CRUISE READY',
  'FOOTWEAR ARCHIVE',
  'ARTISANAL BAGS',
  'RESORT CHIC',
  'FESTIVE BRUNCH',
  'COCKTAIL SOIRÉE',
  'CASUAL DENIM',
  'SIDEWALK CAFÉ',
  'WHITE RESORT CASUAL',
  'PALM GARDEN',
  'HIGH WEDGE ARCHES',
  'HIGHER WEDGE COUTURE',
  'LOW WEDGE GARDEN',
  'CELEBRATION NIGHTS',
  'KOLHAPURI FLATS',
  'ARCHITECTURAL BLOCK HEELS',
  'PROM BALLROOM COUTURE',
  'PROM TWILIGHT TERRACE',
  'PROM RED CARPET VIP',
  'PROM BOTANICAL GALA',
  'PROM ROOFTOP CELEBRATION',
  'DATE NIGHT SKYLINE',
  'DATE NIGHT SPEAKEASY',
  'DATE NIGHT BISTRO',
  'DATE NIGHT MARINA',
  'DATE NIGHT FIRESIDE',
];

const DEFAULT_TARGETS = [
  'Mother of the Bride',
  'High wedges - 3.5 inch',
  'Higher wedge - 4.25 inch',
  'Low wedges - 2.5 inch',
  'Classic High Wedges',
  'Celebration & Festive',
  'Red Carpet Glamour',
  'All',
  'Cruise Ready',
  'Low wedges - 2.5 inch',
  'Just In',
  'Bridal',
  'Cruise Ready',
  'Shoes',
  'Bags',
  'Resort Chic',
  'Festive Brunch',
  'Cocktail Soirée',
  'Denim Casual',
  'Café Chic',
  'White Linen',
  'Garden Elegance',
  'High wedges - 3.5 inch',
  'Higher wedge - 4.25 inch',
  'Low wedges - 2.5 inch',
  'Celebration & Festive',
  'Flats',
  'Block heels',
  'Prom Night',
  'Prom Night',
  'Prom Night',
  'Prom Night',
  'Prom Night',
  'Date Night',
  'Date Night',
  'Date Night',
  'Date Night',
  'Date Night',
];

export const DEFAULT_HERO_SLIDE_CONFIGS: HeroSlideConfig[] = DEFAULT_HERO_PAIRINGS.map(
  (pairing: HeroImagePairingItem, idx: number): HeroSlideConfig => {
    const cleanTitle = pairing.title.split(' — ')[0] || pairing.title;
    const badge = DEFAULT_BADGES[idx] || 'EXCLUSIVE EDIT';
    const target = DEFAULT_TARGETS[idx] || 'All';
    return {
      id: `slide-${String(pairing.number).padStart(2, '0')}`,
      order: pairing.number,
      category: pairing.category,
      cleanFilename: pairing.cleanFilename,
      rawFilename: pairing.rawFilename,
      badge,
      title: cleanTitle,
      subtitle: pairing.subtitle,
      button1Text: `Explore ${cleanTitle}`,
      button1Target: target,
      button2Text: 'View Catalog',
      button2Target: 'All',
      pairedShoes: pairing.suggestedShoes || '',
      pairedShoesUrl: pairing.shoesUrl || '',
      pairedBag: pairing.suggestedBag || '',
      pairedBagUrl: pairing.bagUrl || '',
      description: pairing.description || '',
      altText: `Accesoire & Stoffa Style - ${pairing.cleanFilename} featuring ${cleanTitle}`,
      imageUrl: pairing.imageSrc,
      isCustomImage: false,
    };
  }
);

const STORAGE_KEY_SLIDES = 'accesoire_hero_slides_configs_v2';
const STORAGE_KEY_IMAGES = 'accesoire_hero_custom_images_v2';

// In-memory cache for custom images
let inMemoryCustomImages: Record<string, { dataUrl: string; filename: string }> = {};

function loadSavedImagesMap(): Record<string, { dataUrl: string; filename: string }> {
  if (typeof window === 'undefined') return {};
  if (Object.keys(inMemoryCustomImages).length > 0) {
    return inMemoryCustomImages;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_IMAGES);
    if (raw) {
      inMemoryCustomImages = JSON.parse(raw);
      return inMemoryCustomImages;
    }
  } catch (e) {
    console.warn('Could not read custom images from localStorage:', e);
  }
  return {};
}

function persistImagesMap(map: Record<string, { dataUrl: string; filename: string }>) {
  inMemoryCustomImages = map;
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(map));
  } catch (e) {
    console.warn('LocalStorage quota limit exceeded for images; images will remain active in current session:', e);
  }
}

export function loadHeroSlides(): HeroSlideConfig[] {
  if (typeof window === 'undefined') return DEFAULT_HERO_SLIDE_CONFIGS;

  const imagesMap = loadSavedImagesMap();

  try {
    const raw = localStorage.getItem(STORAGE_KEY_SLIDES);
    if (raw) {
      const savedList: Partial<HeroSlideConfig>[] = JSON.parse(raw);
      
      // 1. Process all default slides with any saved overrides
      const defaultProcessed = DEFAULT_HERO_SLIDE_CONFIGS.map((def) => {
        const match = savedList.find(
          (s) => s.id === def.id || s.order === def.order || s.cleanFilename === def.cleanFilename
        );

        // Check if custom image uploaded for this slide
        const customImg = imagesMap[def.id] || imagesMap[String(def.order)];

        const merged: HeroSlideConfig = {
          ...def,
          ...(match || {}),
          imageUrl: customImg ? customImg.dataUrl : (match?.imageUrl || def.imageUrl),
          isCustomImage: Boolean(customImg),
          customImageName: customImg ? customImg.filename : undefined,
        };
        return merged;
      });

      // 2. Identify any custom newly added slides that don't match any default ID
      const defaultIds = new Set(DEFAULT_HERO_SLIDE_CONFIGS.map((d) => d.id));
      const newlyAddedSlides: HeroSlideConfig[] = savedList
        .filter((s) => s.id && !defaultIds.has(s.id))
        .map((s, idx) => {
          const customImg = s.id ? imagesMap[s.id] : undefined;
          return {
            id: s.id || `custom-hero-${Date.now()}-${idx}`,
            order: s.order ?? (DEFAULT_HERO_SLIDE_CONFIGS.length + idx + 1),
            category: s.category || 'Shoes',
            cleanFilename: s.cleanFilename || `custom_hero_${idx + 1}.jpg`,
            rawFilename: s.rawFilename || `custom_hero_${idx + 1}.jpg`,
            title: s.title || 'New Hero Editorial',
            subtitle: s.subtitle || 'Handcrafted Luxury Footwear',
            badge: s.badge || 'NEW ARRIVAL',
            pairedShoes: s.pairedShoes || 'Classic High K Wedge Champagne',
            pairedShoesUrl: s.pairedShoesUrl || '',
            pairedBag: s.pairedBag || '',
            pairedBagUrl: s.pairedBagUrl || '',
            button1Text: s.button1Text || 'Shoes',
            button1Target: s.button1Target || 'Shoes',
            button2Text: s.button2Text || '',
            button2Target: s.button2Target || '',
            description: s.description || '',
            altText: s.altText || s.title || 'Accesoire Hero Slide',
            isUnavailable: Boolean(s.isUnavailable),
            isDeleted: Boolean(s.isDeleted),
            imageUrl: customImg ? customImg.dataUrl : (s.imageUrl || DEFAULT_HERO_SLIDE_CONFIGS[0]?.imageUrl || ''),
            isCustomImage: Boolean(customImg || s.imageUrl),
            customImageName: customImg ? customImg.filename : undefined,
          };
        });

      return [...defaultProcessed, ...newlyAddedSlides];
    }
  } catch (e) {
    console.error('Error reading hero slides from storage:', e);
  }

  // If no saved text, check custom images on defaults
  return DEFAULT_HERO_SLIDE_CONFIGS.map((def) => {
    const customImg = imagesMap[def.id] || imagesMap[String(def.order)];
    if (customImg) {
      return {
        ...def,
        imageUrl: customImg.dataUrl,
        isCustomImage: true,
        customImageName: customImg.filename,
      };
    }
    return def;
  });
}

export function saveHeroSlides(slides: HeroSlideConfig[]): void {
  if (typeof window === 'undefined') return;
  try {
    const imagesMap = loadSavedImagesMap();
    // For any slide with dataUrl imageUrl, store in imagesMap
    slides.forEach((s) => {
      if (s.imageUrl && s.imageUrl.startsWith('data:')) {
        imagesMap[s.id] = {
          dataUrl: s.imageUrl,
          filename: s.customImageName || `hero_${s.id}.jpg`,
        };
      }
    });
    persistImagesMap(imagesMap);

    // Save slides to storage, keeping non-dataUrl image strings clean
    const toSave = slides.map((s) => ({
      ...s,
      imageUrl: s.imageUrl?.startsWith('data:') ? '' : s.imageUrl,
    }));
    localStorage.setItem(STORAGE_KEY_SLIDES, JSON.stringify(toSave));
    window.dispatchEvent(new CustomEvent('hero-slides-updated'));
  } catch (e) {
    console.error('Failed to save hero slides:', e);
  }
}

export function addNewHeroSlide(newSlideData: {
  title: string;
  subtitle: string;
  badge?: string;
  categoryTarget?: string;
  pairedShoes?: string;
  pairedShoesUrl?: string;
  button1Text?: string;
  button1Target?: string;
  button2Text?: string;
  button2Target?: string;
  imageUrl: string;
  isUnavailable?: boolean;
}): HeroSlideConfig {
  const currentSlides = loadHeroSlides();
  const newId = `hero-slide-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const order = currentSlides.length + 1;

  const newSlide: HeroSlideConfig = {
    id: newId,
    order,
    category: newSlideData.categoryTarget || 'Shoes',
    cleanFilename: `hero_custom_${order}.jpg`,
    rawFilename: `hero_custom_${order}.jpg`,
    title: newSlideData.title || 'New Collection Showcase',
    subtitle: newSlideData.subtitle || 'Handcrafted Artisanal Luxury',
    badge: newSlideData.badge || 'NEW ARRIVAL',
    pairedShoes: newSlideData.pairedShoes || 'Classic High K Wedge Champagne',
    pairedShoesUrl: newSlideData.pairedShoesUrl || '',
    pairedBag: '',
    pairedBagUrl: '',
    description: newSlideData.subtitle || '',
    button1Text: newSlideData.button1Text || 'Shoes',
    button1Target: newSlideData.button1Target || 'Shoes',
    button2Text: newSlideData.button2Text || '',
    button2Target: newSlideData.button2Target || '',
    altText: newSlideData.title,
    isUnavailable: Boolean(newSlideData.isUnavailable),
    isDeleted: false,
    imageUrl: newSlideData.imageUrl,
    isCustomImage: true,
  };

  const updated = [...currentSlides, newSlide];
  saveHeroSlides(updated);
  return newSlide;
}

export function toggleHeroSlideVisibility(slideId: string, isVisible: boolean): void {
  const currentSlides = loadHeroSlides();
  const updated = currentSlides.map((s) =>
    s.id === slideId ? { ...s, isUnavailable: !isVisible } : s
  );
  saveHeroSlides(updated);
}

export function deleteHeroSlide(slideId: string): void {
  const currentSlides = loadHeroSlides();
  const updated = currentSlides.map((s) =>
    s.id === slideId ? { ...s, isDeleted: true } : s
  );
  saveHeroSlides(updated);
}

export function resetHeroSlides(): HeroSlideConfig[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_SLIDES);
    localStorage.removeItem(STORAGE_KEY_IMAGES);
    inMemoryCustomImages = {};
    window.dispatchEvent(new CustomEvent('hero-slides-updated'));
  }
  return DEFAULT_HERO_SLIDE_CONFIGS;
}

export function setCustomImageForSlide(
  slideIdentifier: string | number,
  dataUrl: string,
  filename: string
): void {
  const imagesMap = { ...loadSavedImagesMap() };
  const key = String(slideIdentifier).startsWith('slide-')
    ? String(slideIdentifier)
    : `slide-${String(slideIdentifier).padStart(2, '0')}`;

  imagesMap[key] = { dataUrl, filename };
  persistImagesMap(imagesMap);
  window.dispatchEvent(new CustomEvent('hero-slides-updated'));
}

export function removeCustomImageForSlide(slideIdentifier: string | number): void {
  const imagesMap = { ...loadSavedImagesMap() };
  const key = String(slideIdentifier).startsWith('slide-')
    ? String(slideIdentifier)
    : `slide-${String(slideIdentifier).padStart(2, '0')}`;

  delete imagesMap[key];
  delete imagesMap[String(slideIdentifier)];
  persistImagesMap(imagesMap);
  window.dispatchEvent(new CustomEvent('hero-slides-updated'));
}

export function batchApplyImages(
  files: { name: string; dataUrl: string }[]
): { matched: number; unmatched: string[] } {
  const imagesMap = { ...loadSavedImagesMap() };
  let matchedCount = 0;
  const unmatchedList: string[] = [];

  for (const file of files) {
    const fname = file.name.toLowerCase();
    // Try matching by number prefix: e.g. "01_...", "1_...", "slide-01", "1.jpg"
    let matchedSlide: HeroSlideConfig | undefined;

    const numMatch = fname.match(/^(?:slide[-_]?)?(\d+)/i);
    if (numMatch) {
      const num = parseInt(numMatch[1], 10);
      matchedSlide = DEFAULT_HERO_SLIDE_CONFIGS.find((s) => s.order === num);
    }

    if (!matchedSlide) {
      // Try exact clean filename match or raw filename match
      matchedSlide = DEFAULT_HERO_SLIDE_CONFIGS.find(
        (s) =>
          s.cleanFilename.toLowerCase() === fname ||
          s.rawFilename.toLowerCase() === fname ||
          fname.includes(s.cleanFilename.toLowerCase().replace(/\.[^.]+$/, ''))
      );
    }

    if (!matchedSlide) {
      // Try keyword match in title
      matchedSlide = DEFAULT_HERO_SLIDE_CONFIGS.find((s) => {
        const titleWords = s.title.toLowerCase().split(/\s+/);
        return titleWords.some((w) => w.length > 4 && fname.includes(w));
      });
    }

    if (matchedSlide) {
      imagesMap[matchedSlide.id] = { dataUrl: file.dataUrl, filename: file.name };
      matchedCount++;
    } else {
      unmatchedList.push(file.name);
    }
  }

  persistImagesMap(imagesMap);
  window.dispatchEvent(new CustomEvent('hero-slides-updated'));
  return { matched: matchedCount, unmatched: unmatchedList };
}

// RFC 4180 CSV Exporter
export function exportHeroSlidesCSV(): string {
  const slides = loadHeroSlides();
  const headers = [
    'slide_id',
    'order',
    'category',
    'clean_filename',
    'raw_filename',
    'badge_text',
    'title_text',
    'subtitle_text',
    'button_1_text',
    'button_1_target',
    'button_2_text',
    'button_2_target',
    'paired_shoes',
    'paired_shoes_url',
    'paired_bag',
    'paired_bag_url',
    'description_text',
    'alt_text',
  ];

  function escapeCsv(val: string | number | undefined | null): string {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  }

  const rows = [headers.join(',')];
  for (const s of slides) {
    rows.push(
      [
        escapeCsv(s.id),
        s.order,
        escapeCsv(s.category),
        escapeCsv(s.cleanFilename),
        escapeCsv(s.rawFilename),
        escapeCsv(s.badge),
        escapeCsv(s.title),
        escapeCsv(s.subtitle),
        escapeCsv(s.button1Text),
        escapeCsv(s.button1Target),
        escapeCsv(s.button2Text),
        escapeCsv(s.button2Target),
        escapeCsv(s.pairedShoes),
        escapeCsv(s.pairedShoesUrl),
        escapeCsv(s.pairedBag),
        escapeCsv(s.pairedBagUrl),
        escapeCsv(s.description),
        escapeCsv(s.altText),
      ].join(',')
    );
  }

  return rows.join('\n');
}

// RFC 4180 CSV Parser
export function parseCSVLines(csvText: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentVal = '';

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentVal.trim());
      if (row.some((col) => col.length > 0)) {
        lines.push(row);
      }
      row = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }

  if (currentVal.length > 0 || row.length > 0) {
    row.push(currentVal.trim());
    if (row.some((col) => col.length > 0)) {
      lines.push(row);
    }
  }

  return lines;
}

export function importHeroSlidesFromCSV(
  csvText: string
): { success: boolean; count: number; error?: string } {
  try {
    const rows = parseCSVLines(csvText.trim());
    if (rows.length < 2) {
      return { success: false, count: 0, error: 'CSV file must have a header row and at least one data row.' };
    }

    const header = rows[0].map((h) => h.toLowerCase().trim().replace(/['"]/g, ''));
    const colIndex = (names: string[]) => {
      for (const name of names) {
        const idx = header.indexOf(name.toLowerCase());
        if (idx !== -1) return idx;
      }
      return -1;
    };

    const idIdx = colIndex(['slide_id', 'id']);
    const orderIdx = colIndex(['order', 'number', 'slide_number', '#']);
    const titleIdx = colIndex(['title_text', 'title', 'headline']);
    const subtitleIdx = colIndex(['subtitle_text', 'subtitle', 'tagline']);
    const badgeIdx = colIndex(['badge_text', 'badge', 'tag']);
    const btn1TextIdx = colIndex(['button_1_text', 'button1_text', 'btn1_text', 'button_text']);
    const btn1TargetIdx = colIndex(['button_1_target', 'button1_target', 'btn1_target', 'button_target', 'category_target']);
    const btn2TextIdx = colIndex(['button_2_text', 'button2_text', 'btn2_text']);
    const btn2TargetIdx = colIndex(['button_2_target', 'button2_target', 'btn2_target']);
    const shoesIdx = colIndex(['paired_shoes', 'shoes', 'suggested_shoes']);
    const shoesUrlIdx = colIndex(['paired_shoes_url', 'shoes_url']);
    const bagIdx = colIndex(['paired_bag', 'bag', 'suggested_bag']);
    const bagUrlIdx = colIndex(['paired_bag_url', 'bag_url']);
    const descIdx = colIndex(['description_text', 'description', 'notes']);
    const altIdx = colIndex(['alt_text', 'alt']);
    const cleanFileIdx = colIndex(['clean_filename', 'filename', 'image_name', 'file']);

    const currentSlides = loadHeroSlides();
    let updatedCount = 0;

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const slideId = idIdx !== -1 ? row[idIdx] : '';
      const orderVal = orderIdx !== -1 ? parseInt(row[orderIdx], 10) : undefined;
      const cleanFile = cleanFileIdx !== -1 ? row[cleanFileIdx] : '';

      const targetSlide = currentSlides.find(
        (s) =>
          (slideId && s.id.toLowerCase() === slideId.toLowerCase()) ||
          (orderVal && s.order === orderVal) ||
          (cleanFile && s.cleanFilename.toLowerCase() === cleanFile.toLowerCase())
      );

      if (targetSlide) {
        if (titleIdx !== -1 && row[titleIdx]) targetSlide.title = row[titleIdx];
        if (subtitleIdx !== -1 && row[subtitleIdx]) targetSlide.subtitle = row[subtitleIdx];
        if (badgeIdx !== -1 && row[badgeIdx]) targetSlide.badge = row[badgeIdx];
        if (btn1TextIdx !== -1 && row[btn1TextIdx]) targetSlide.button1Text = row[btn1TextIdx];
        if (btn1TargetIdx !== -1 && row[btn1TargetIdx]) targetSlide.button1Target = row[btn1TargetIdx];
        if (btn2TextIdx !== -1 && row[btn2TextIdx]) targetSlide.button2Text = row[btn2TextIdx];
        if (btn2TargetIdx !== -1 && row[btn2TargetIdx]) targetSlide.button2Target = row[btn2TargetIdx];
        if (shoesIdx !== -1 && row[shoesIdx] !== undefined) targetSlide.pairedShoes = row[shoesIdx];
        if (shoesUrlIdx !== -1 && row[shoesUrlIdx] !== undefined) targetSlide.pairedShoesUrl = row[shoesUrlIdx];
        if (bagIdx !== -1 && row[bagIdx] !== undefined) targetSlide.pairedBag = row[bagIdx];
        if (bagUrlIdx !== -1 && row[bagUrlIdx] !== undefined) targetSlide.pairedBagUrl = row[bagUrlIdx];
        if (descIdx !== -1 && row[descIdx]) targetSlide.description = row[descIdx];
        if (altIdx !== -1 && row[altIdx]) targetSlide.altText = row[altIdx];
        updatedCount++;
      }
    }

    if (updatedCount > 0) {
      saveHeroSlides(currentSlides);
      return { success: true, count: updatedCount };
    } else {
      return {
        success: false,
        count: 0,
        error: 'No matching slide IDs or orders found in CSV. Please verify column headers: slide_id or order.',
      };
    }
  } catch (err: any) {
    return { success: false, count: 0, error: err?.message || 'Failed to parse CSV.' };
  }
}
