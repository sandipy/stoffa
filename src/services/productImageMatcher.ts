import { Product, ProductAngle } from '../types';

export interface LocalImageAsset {
  url: string;
  filename: string;
  label: string;
  category: string;
  tag: string;
}

export interface MatchedImageResult {
  asset: LocalImageAsset;
  matchScore: number;
  matchReason: string;
}

// Full directory index of verified local project assets in public/ and curated collections
export const AVAILABLE_LOCAL_ASSETS: LocalImageAsset[] = [
  // Direct Product Shoots in public/
  {
    url: '/STB191SILVER_1.jpg',
    filename: 'STB191SILVER_1.jpg',
    label: 'STB191 Silver Wedge - Studio Profile',
    category: 'Wedges & Shoes',
    tag: 'Profile',
  },
  {
    url: '/STB191SILVER_5.jpg',
    filename: 'STB191SILVER_5.jpg',
    label: 'STB191 Silver Wedge - Studio Front & Sole',
    category: 'Wedges & Shoes',
    tag: 'Detail',
  },

  // Hero & Curated Shoots in public/hero_images/
  {
    url: '/hero_images/24_Higher_Wedge_Couture.jpg',
    filename: '24_Higher_Wedge_Couture.jpg',
    label: 'Higher Wedge Couture - Studio Showcase',
    category: 'Higher Wedges',
    tag: 'Couture',
  },
  {
    url: '/hero_images/23_High_Wedge_Editorial.jpg',
    filename: '23_High_Wedge_Editorial.jpg',
    label: 'High Wedge Editorial - Luxury Showcase',
    category: 'High Wedges',
    tag: 'Editorial',
  },
  {
    url: '/hero_images/14_Shoes_Catalog_Hero_Model.jpg',
    filename: '14_Shoes_Catalog_Hero_Model.jpg',
    label: 'Shoes Catalog Hero - Model On-Foot',
    category: 'Shoes & Wedges',
    tag: 'On-Model',
  },
  {
    url: '/hero_images/15_Bags_Catalog_Hero_Model.jpg',
    filename: '15_Bags_Catalog_Hero_Model.jpg',
    label: 'Bags & Potlis Catalog Hero - Editorial Showcase',
    category: 'Bags & Potlis',
    tag: 'Accessories',
  },
  {
    url: '/hero_images/01_Palace_Matriarch_Indian_Model.jpg',
    filename: '01_Palace_Matriarch_Indian_Model.jpg',
    label: 'Palace Matriarch - Kolhapuri Wedge Showcase',
    category: 'Weddings & Celebrations',
    tag: 'Editorial',
  },
  {
    url: '/hero_images/02_Amalfi_Terrace_Black_Model.jpg',
    filename: '02_Amalfi_Terrace_Black_Model.jpg',
    label: 'Amalfi Coast Cocktail - Metallic Wedge & Potli',
    category: 'Resort & Cocktail',
    tag: 'Resort',
  },
  {
    url: '/hero_images/03_Emerald_Gala_East_Asian_Model.jpg',
    filename: '03_Emerald_Gala_East_Asian_Model.jpg',
    label: 'Emerald Black-Tie Gala - Crystal Stöffa Wedge',
    category: 'Black-Tie Gala',
    tag: 'Gala',
  },
  {
    url: '/hero_images/04_Coastal_Promenade_Latina_Model.jpg',
    filename: '04_Coastal_Promenade_Latina_Model.jpg',
    label: 'Riviera Promenade - Champagne Low Wedge',
    category: 'Resort & Cruise',
    tag: 'Resort',
  },
  {
    url: '/hero_images/05_Sculptural_Atelier_Mature_Woman.jpg',
    filename: '05_Sculptural_Atelier_Mature_Woman.jpg',
    label: 'Sculptural Atelier - Handcrafted Luxury Wedge',
    category: 'Atelier & Craft',
    tag: 'Detail',
  },
  {
    url: '/hero_images/06_Courtyard_Sangeet_Festive_Model.jpg',
    filename: '06_Courtyard_Sangeet_Festive_Model.jpg',
    label: 'Festive Sangeet - Gold Embroidered Wedge & Potli',
    category: 'Festive & Sangeet',
    tag: 'Festive',
  },
  {
    url: '/hero_images/07_Royal_Desert_Palace_Kaftan.jpg',
    filename: '07_Royal_Desert_Palace_Kaftan.jpg',
    label: 'Royal Desert Palace - Jewel-Tone Slipper & Bag',
    category: 'Editorial Couture',
    tag: 'Editorial',
  },
  {
    url: '/hero_images/08_Generations_Of_Grace_Mother_Daughter.jpg',
    filename: '08_Generations_Of_Grace_Mother_Daughter.jpg',
    label: 'Mother & Daughter Duo - Stöffa Wedding Wedges',
    category: 'Mother of the Bride',
    tag: 'Bridal',
  },
  {
    url: '/hero_images/09_Riviera_Yacht_Deck_Black_Model.jpg',
    filename: '09_Riviera_Yacht_Deck_Black_Model.jpg',
    label: 'Riviera Yacht Deck - Gold Strap Stöffa Wedges',
    category: 'Yacht & Resort',
    tag: 'Yacht',
  },
  {
    url: '/hero_images/10_Botanical_Sanctuary_East_Asian.jpg',
    filename: '10_Botanical_Sanctuary_East_Asian.jpg',
    label: 'Botanical Garden Sanctuary - Sage & Gold Wedges',
    category: 'Garden Soiree',
    tag: 'Garden',
  },
  {
    url: '/hero_images/11_Flagship_Just_In_Arrivals.jpg',
    filename: '11_Flagship_Just_In_Arrivals.jpg',
    label: 'Flagship Just-In - New Season Footwear',
    category: 'Just In',
    tag: 'Showcase',
  },
  {
    url: '/hero_images/12_Flagship_Bridal_Couture.jpg',
    filename: '12_Flagship_Bridal_Couture.jpg',
    label: 'Bridal Couture Collection - Memory Footbed Wedges',
    category: 'Bridal Couture',
    tag: 'Bridal',
  },
  {
    url: '/hero_images/13_Flagship_Cruise_Resort.jpg',
    filename: '13_Flagship_Cruise_Resort.jpg',
    label: 'Cruise & Resort Edit - Grass-Friendly Wedges',
    category: 'Cruise & Resort',
    tag: 'Resort',
  },
  {
    url: '/hero_images/16_Resort_Chic_Hero_Model.jpg',
    filename: '16_Resort_Chic_Hero_Model.jpg',
    label: 'Resort Chic Styling - Linen & Metallic Wedge',
    category: 'Resort & Day',
    tag: 'Resort',
  },
  {
    url: '/hero_images/17_Festive_Brunch_Hero_Model.jpg',
    filename: '17_Festive_Brunch_Hero_Model.jpg',
    label: 'Festive Brunch Model - Gold Strappy Wedge',
    category: 'Festive Brunch',
    tag: 'Brunch',
  },
  {
    url: '/hero_images/18_Cocktail_Soiree_Hero_Model.jpg',
    filename: '18_Cocktail_Soiree_Hero_Model.jpg',
    label: 'Cocktail Soiree - Architectural Wedge Elegance',
    category: 'Cocktail',
    tag: 'Evening',
  },
  {
    url: '/hero_images/19_Sunny_Boardwalk_Denim_Hero.jpg',
    filename: '19_Sunny_Boardwalk_Denim_Hero.jpg',
    label: 'Sunny Boardwalk - Casual Luxury Wedges with Denim',
    category: 'Casual Luxury',
    tag: 'Casual',
  },
  {
    url: '/hero_images/20_Sunny_Cafe_Denim_Hero.jpg',
    filename: '20_Sunny_Cafe_Denim_Hero.jpg',
    label: 'Cafe Terrace - Stöffa Low Wedge with Jeans',
    category: 'Casual Luxury',
    tag: 'Terrace',
  },
  {
    url: '/hero_images/21_White_Jeans_Terrace_Hero.jpg',
    filename: '21_White_Jeans_Terrace_Hero.jpg',
    label: 'White Trousers & Metallic Stöffa Wedge',
    category: 'Casual Luxury',
    tag: 'Styling',
  },
  {
    url: '/hero_images/22_Palm_Garden_Denim_Hero.jpg',
    filename: '22_Palm_Garden_Denim_Hero.jpg',
    label: 'Palm Garden Estate - Destination Wedding Wedges',
    category: 'Weddings & Celebrations',
    tag: 'Garden',
  },
  {
    url: '/hero_images/26_Celebration_Festive.jpg',
    filename: '26_Celebration_Festive.jpg',
    label: 'Celebration Festive - Handcrafted Embroidery',
    category: 'Weddings & Celebrations',
    tag: 'Festive',
  },
];

/**
 * Normalizes string tokens for robust fuzzy matching
 */
function cleanTokens(str: string): string[] {
  return str
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !['THE', 'AND', 'FOR', 'WITH', 'INCH', 'STOFFA', 'STYLE'].includes(t));
}

/**
 * Extracts SKU or product codes like "STB191", "STB-191", "191", etc.
 */
export function extractProductCodes(product: Product): string[] {
  const codes = new Set<string>();
  const text = `${product.id} ${product.title} ${product.handle || ''} ${(product.images || []).join(' ')}`;

  // Find patterns like STB191, STB-191, ST191, etc.
  const stbMatches = text.match(/STB-?\d+/gi);
  if (stbMatches) {
    stbMatches.forEach((m) => {
      codes.add(m.toUpperCase().replace('-', ''));
    });
  }

  // Find standalone 3+ digit numbers
  const numMatches = text.match(/\b\d{3,4}\b/g);
  if (numMatches) {
    numMatches.forEach((n) => codes.add(n));
  }

  // Also check product colors
  if (product.colors) {
    product.colors.forEach((c) => {
      if (c.name) codes.add(c.name.toUpperCase().trim());
    });
  }

  return Array.from(codes);
}

/**
 * Scans available assets to find images that match this product's name, SKU, and color
 */
export function findMatchingImagesForProduct(product: Product): MatchedImageResult[] {
  const codes = extractProductCodes(product);
  const titleTokens = cleanTokens(product.title);
  const categoryTokens = cleanTokens(product.category);
  const colorNames = (product.colors || []).map((c) => c.name.toUpperCase());

  // Existing image URLs already on product to avoid offering duplicate additions
  const existingUrls = new Set(
    [
      ...(product.images || []),
      ...(product.angles || []).map((a) => a.url),
    ].map((u) => u.toLowerCase().trim())
  );

  const results: MatchedImageResult[] = [];

  AVAILABLE_LOCAL_ASSETS.forEach((asset) => {
    // Skip if already in product gallery
    if (existingUrls.has(asset.url.toLowerCase().trim())) {
      return;
    }

    const fname = asset.filename.toUpperCase();
    const flabel = asset.label.toUpperCase();
    let score = 0;
    const reasons: string[] = [];

    // 1. Exact SKU/Code Match (Highest Priority)
    for (const code of codes) {
      if (fname.includes(code)) {
        score += 70;
        reasons.push(`Filename matches code "${code}"`);
      } else if (flabel.includes(code)) {
        score += 40;
        reasons.push(`Asset title matches code "${code}"`);
      }
    }

    // 2. Color Matching
    for (const clr of colorNames) {
      if (fname.includes(clr) || flabel.includes(clr)) {
        score += 30;
        reasons.push(`Matches color "${clr}"`);
      }
    }

    // 3. Silhouette / Category Tokens Matching
    const silhouetteTerms = ['WEDGE', 'LOW', 'HIGH', 'HIGHER', 'HEEL', 'FLAT', 'POTLI', 'BAG', 'SLIPPER'];
    for (const term of silhouetteTerms) {
      if (titleTokens.includes(term) || categoryTokens.includes(term)) {
        if (fname.includes(term) || flabel.includes(term)) {
          score += 15;
          reasons.push(`Matches silhouette "${term}"`);
        }
      }
    }

    if (score > 0) {
      results.push({
        asset,
        matchScore: score,
        matchReason: reasons.slice(0, 2).join(' & '),
      });
    }
  });

  // Sort descending by match score
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Processes files dropped or selected by admin from their computer folder
 * and creates ready-to-add ProductAngle objects with name-matching tags.
 */
export async function processUploadedImageFiles(
  files: FileList | File[],
  product: Product
): Promise<ProductAngle[]> {
  const fileArray = Array.from(files);
  const codes = extractProductCodes(product);
  const colorNames = (product.colors || []).map((c) => c.name.toUpperCase());

  const processedAngles: ProductAngle[] = [];

  for (const file of fileArray) {
    if (!file.type.startsWith('image/')) continue;

    const dataUrl = await readFileAsDataUrl(file);
    const fname = file.name.toUpperCase();

    // Check if filename matches product
    let isMatched = false;
    let label = file.name.replace(/\.[^/.]+$/, ''); // Remove extension

    for (const code of codes) {
      if (fname.includes(code)) {
        isMatched = true;
        label = `${code} - ${label}`;
        break;
      }
    }

    for (const clr of colorNames) {
      if (fname.includes(clr)) {
        isMatched = true;
        break;
      }
    }

    processedAngles.push({
      url: dataUrl,
      label: label,
      tag: isMatched ? 'Auto-Matched' : 'Gallery',
      isAiImage: false,
    });
  }

  return processedAngles;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
