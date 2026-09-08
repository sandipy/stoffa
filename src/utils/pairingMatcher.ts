import { STOFFA_STYLE_OFFICIAL_PRODUCTS } from '../data/stoffaStyleProducts';
import { HeroImagePairingItem } from '../data/heroPairingsData';

// Known slug mappings from stoffastyle.com to product titles
export const STOFFA_SLUG_MAP: Record<string, string> = {
  'embellished-3-5-inch-high-wedge-champagne': 'Crystal High K Wedge Champagne',
  'crystal-high-k-wedge-champagne': 'Crystal High K Wedge Champagne',
  'crystal-high-k-wedge-silver': 'Crystal High K Wedge Silver',
  'crystal-high-k-wedge-light-gold': 'Crystal High K Wedge Light Gold',
  'classic-high-k-wedge-gold': 'Classic High K Wedge Gold',
  'classic-high-k-wedge-champagne': 'Classic High K Wedge Champagne',
  'classic-high-k-wedge-slate': 'Classic High K Wedge Slate',
  'classic-high-k-wedge-rose-gold': 'Classic High K Wedge Rose Gold',
  'classic-high-k-wedge-antique-gold': 'Classic High K Wedge Antique gold',
  'classic-high-k-wedge-pewter': 'Classic High K Wedge Pewter',
  'classic-high-k-wedge-camel': 'Classic High K Wedge Camel',
  'bridal-border-high-wedge-rose-gold': 'Bridal Border High Wedge - Rose Gold',
  'embellished-potli-bag-antique': 'Embellished Potli Bag Antique',
  'embellished-potli-bag-rose-gold': 'Embellished Potli Bag Rose Gold',
  'embellished-potli-bag-black': 'Embellished Potli Bag Black',
  'embellished-potli-bag-pewter': 'Embellished Potli Bag Pewter',
  'border-clutch-bag-gold': 'Border Clutch Bag Gold',
  'border-flat-bag-gold': 'Border Flat Bag Gold',
};

/**
 * Resolve a product title from a Stoffa Style URL or raw text string
 */
export function resolveStoffaProduct(rawInput: string): { title: string; url?: string; isNone: boolean } {
  const trimmed = rawInput.trim();

  // Check for none markers
  if (
    trimmed === '__none___' ||
    trimmed === '__none__' ||
    trimmed === 'none' ||
    trimmed.toLowerCase() === '__none___' ||
    trimmed.toLowerCase() === 'none' ||
    trimmed.toLowerCase() === '(none)' ||
    trimmed === ''
  ) {
    return { title: '__none___', isNone: true };
  }

  let url: string | undefined = undefined;
  let slug = '';

  if (trimmed.includes('stoffastyle.com/products/')) {
    url = trimmed;
    try {
      const match = trimmed.match(/\/products\/([a-zA-Z0-9\-_]+)/);
      if (match && match[1]) {
        slug = match[1].toLowerCase();
      }
    } catch {
      // fallback
    }
  } else if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    url = trimmed;
    const parts = trimmed.split('/');
    slug = (parts[parts.length - 1] || parts[parts.length - 2] || '').split('?')[0].toLowerCase();
  }

  // 1. Direct slug dictionary lookup
  if (slug && STOFFA_SLUG_MAP[slug]) {
    return { title: STOFFA_SLUG_MAP[slug], url, isNone: false };
  }

  // 2. Fuzzy match slug with catalog product handles / titles
  if (slug) {
    const slugWords = slug.split(/[-_]+/).filter((w) => w.length > 2 && w !== 'inch' && w !== 'high');
    let bestProduct = '';
    let bestScore = 0;

    for (const prod of STOFFA_STYLE_OFFICIAL_PRODUCTS) {
      const lower = prod.title.toLowerCase();
      let matches = 0;
      for (const word of slugWords) {
        if (lower.includes(word)) matches++;
      }
      if (matches > bestScore) {
        bestScore = matches;
        bestProduct = prod.title;
      }
    }

    if (bestScore >= 2 && bestProduct) {
      return { title: bestProduct, url, isNone: false };
    }
  }

  // 3. Match against exact catalog titles or case-insensitive titles
  const directMatch = STOFFA_STYLE_OFFICIAL_PRODUCTS.find(
    (p) => p.title.toLowerCase() === trimmed.toLowerCase()
  );
  if (directMatch) {
    return { title: directMatch.title, url, isNone: false };
  }

  // 4. Return trimmed input
  return { title: trimmed, url, isNone: false };
}

export interface ParsedTestPairing {
  rawLine: string;
  filename: string;
  matchedId?: string;
  shoesRaw: string;
  shoesResolved: string;
  shoesUrl?: string;
  shoesIsNone: boolean;
  bagRaw: string;
  bagResolved: string;
  bagUrl?: string;
  bagIsNone: boolean;
}

/**
 * Parses user input in the format:
 * `01_Palace_Matriarch_Indian_Model.jpg: [Shoes: https://stoffastyle.com/products/embellished-3-5-inch-high-wedge-champagne ] [Bag: __none___]`
 */
export function parsePairingTestString(inputText: string): ParsedTestPairing[] {
  const lines = inputText.split('\n').map((l) => l.trim()).filter(Boolean);
  const results: ParsedTestPairing[] = [];

  for (const line of lines) {
    // Regex matching: filename: [Shoes: ...] [Bag: ...]
    // Also tolerant of without .jpg, with different brackets or spacing
    const lineRegex = /^([^:\[]+):\s*\[Shoes:\s*([^\]]*)\]\s*\[Bag:\s*([^\]]*)\]/i;
    const match = line.match(lineRegex);

    if (match) {
      const filename = match[1].trim();
      const shoesRaw = match[2].trim();
      const bagRaw = match[3].trim();

      const shoesInfo = resolveStoffaProduct(shoesRaw);
      const bagInfo = resolveStoffaProduct(bagRaw);

      results.push({
        rawLine: line,
        filename,
        shoesRaw,
        shoesResolved: shoesInfo.title,
        shoesUrl: shoesInfo.url,
        shoesIsNone: shoesInfo.isNone,
        bagRaw,
        bagResolved: bagInfo.title,
        bagUrl: bagInfo.url,
        bagIsNone: bagInfo.isNone,
      });
      continue;
    }

    // Flexible fallback: Look for [Shoes: ...] and [Bag: ...] anywhere in the line
    const shoesMatch = line.match(/\[Shoes:\s*([^\]]*)\]/i);
    const bagMatch = line.match(/\[Bag:\s*([^\]]*)\]/i);
    const filePart = line.split(':')[0].trim();

    if ((shoesMatch || bagMatch) && filePart) {
      const shoesRaw = shoesMatch ? shoesMatch[1].trim() : '';
      const bagRaw = bagMatch ? bagMatch[1].trim() : '';

      const shoesInfo = resolveStoffaProduct(shoesRaw);
      const bagInfo = resolveStoffaProduct(bagRaw);

      results.push({
        rawLine: line,
        filename: filePart,
        shoesRaw,
        shoesResolved: shoesInfo.title,
        shoesUrl: shoesInfo.url,
        shoesIsNone: shoesInfo.isNone,
        bagRaw,
        bagResolved: bagInfo.title,
        bagUrl: bagInfo.url,
        bagIsNone: bagInfo.isNone,
      });
    }
  }

  return results;
}

/**
 * Apply parsed pairings to a list of HeroImagePairingItems
 */
export function applyParsedPairingsToItems(
  items: HeroImagePairingItem[],
  parsed: ParsedTestPairing[]
): { updatedItems: HeroImagePairingItem[]; countMatched: number } {
  let countMatched = 0;

  const updatedItems = items.map((item) => {
    // Try to match by cleanFilename, number, or rawFilename
    const found = parsed.find((p) => {
      const fn = p.filename.toLowerCase();
      const clean = item.cleanFilename.toLowerCase();
      const raw = item.rawFilename.toLowerCase();
      const numStr = String(item.number).padStart(2, '0');

      return (
        clean === fn ||
        raw === fn ||
        clean.includes(fn) ||
        fn.includes(clean) ||
        fn.startsWith(numStr) ||
        clean.startsWith(fn)
      );
    });

    if (found) {
      countMatched++;
      return {
        ...item,
        suggestedShoes: found.shoesResolved,
        suggestedBag: found.bagResolved,
        shoesUrl: found.shoesUrl || item.shoesUrl,
        bagUrl: found.bagUrl || item.bagUrl,
      };
    }

    return item;
  });

  return { updatedItems, countMatched };
}
