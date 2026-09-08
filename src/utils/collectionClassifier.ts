import { Product } from '../types';

export type SectionType = 'shoes' | 'bags' | 'ready-to-ship' | 'sale' | 'all';

export interface SectionMetadata {
  id: SectionType;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  iconName: string;
  defaultCategory: string;
}

export const SECTION_METADATA: Record<SectionType, SectionMetadata> = {
  shoes: {
    id: 'shoes',
    title: 'Shoes & Footwear Atelier',
    shortTitle: 'Shoes',
    badge: 'FOOTWEAR',
    description: 'Artisanal low wedges, high wedges, sculptural block heels, and hand-braided flats.',
    iconName: 'Footprints',
    defaultCategory: 'Shoes',
  },
  bags: {
    id: 'bags',
    title: 'Luxury Bags & Potlis',
    shortTitle: 'Bags',
    badge: 'BAGS & POTLIS',
    description: 'Hand-embroidered antique zardozi potlis, silk minaudières, and structured evening clutches.',
    iconName: 'Briefcase',
    defaultCategory: 'Bags',
  },
  'ready-to-ship': {
    id: 'ready-to-ship',
    title: 'Ready to Ship (24H Dispatch)',
    shortTitle: 'Ready to Ship',
    badge: '24H DISPATCH',
    description: 'In-stock inventory guaranteed for express courier dispatch within 24 hours worldwide.',
    iconName: 'Truck',
    defaultCategory: 'Ready to Ship',
  },
  sale: {
    id: 'sale',
    title: 'Curated Archive & Sale Edit',
    shortTitle: 'Sale',
    badge: 'ARCHIVE SALE',
    description: 'Exclusive archival silhouettes, limited vault releases, and seasonal promotional values.',
    iconName: 'Tag',
    defaultCategory: 'Sale',
  },
  all: {
    id: 'all',
    title: 'Full Product Catalog',
    shortTitle: 'All Catalog',
    badge: 'ALL ITEMS',
    description: 'Complete master catalog encompassing all footwear, bags, and archival inventory.',
    iconName: 'Layers',
    defaultCategory: 'All',
  },
};

export interface CollectionDefinition {
  id: string;
  title: string;
  theme: 'Wedding & Ceremonies' | 'Galas & Celebrations' | 'Resort & Evenings' | 'Heel Silhouettes' | 'Specialty';
  description: string;
  keywords: string[];
  heelHeights?: string[];
  recommendedSections: ('shoes' | 'bags' | 'ready-to-ship' | 'sale')[];
}

export const CURATED_COLLECTION_DEFINITIONS: CollectionDefinition[] = [
  // Heel Silhouettes
  {
    id: 'low-wedges-2-5-inch',
    title: 'Low Wedges - 2.5 inch',
    theme: 'Heel Silhouettes',
    description: 'Ergonomic 2.25" to 2.5" everyday and celebration low wedges for all-day effortless poise.',
    keywords: ['low wedge', '2.5', '2.25', 'low', 'kolhapuri low', 'wedge 2.5'],
    heelHeights: ['2.25"', '2.5"'],
    recommendedSections: ['shoes', 'ready-to-ship', 'sale'],
  },
  {
    id: 'high-wedges-3-5-inch',
    title: 'High Wedges - 3.5 inch',
    theme: 'Heel Silhouettes',
    description: 'Our signature 3.5" Kolhapuri high wedges combining elevated statuesque lift with supreme comfort.',
    keywords: ['high wedge', '3.5', 'high k', 'classic high', 'high kolhapuri'],
    heelHeights: ['3.5"'],
    recommendedSections: ['shoes', 'ready-to-ship'],
  },
  {
    id: 'higher-wedge-4-25-inch',
    title: 'Higher Wedge - 4.25 inch',
    theme: 'Heel Silhouettes',
    description: 'Dramatic 4.25" and 4.5" couture platforms designed for grand entrances and formal gowns.',
    keywords: ['higher wedge', '4.25', '4.5', 'higher k', 'couture wedge'],
    heelHeights: ['4.25"', '4.5"'],
    recommendedSections: ['shoes'],
  },
  {
    id: 'block-heels',
    title: 'Block Heels',
    theme: 'Heel Silhouettes',
    description: 'Architectural block heels with lawn-stable stability and hand-pleated metallic straps.',
    keywords: ['block', 'block heel', 'sculpted heel', 'cylinder heel'],
    heelHeights: ['2.5"', '3"'],
    recommendedSections: ['shoes', 'sale'],
  },
  {
    id: 'flats',
    title: 'Flats & Loafers',
    theme: 'Heel Silhouettes',
    description: 'Featherlight Kolhapuri flats, braided slide sandals, and cushioned memory foam loafers.',
    keywords: ['flat', 'flats', 'loafer', 'kolhapuri flat', 'slide'],
    heelHeights: ['0.5"'],
    recommendedSections: ['shoes', 'ready-to-ship', 'sale'],
  },

  // Wedding & Ceremonies
  {
    id: 'bride-on-her-feet',
    title: 'Bride on Her Feet',
    theme: 'Wedding & Ceremonies',
    description: 'Bridal footwear engineered for the ceremony, reception, and dance floor without aching feet.',
    keywords: ['bridal', 'bride', 'crystal', 'white', 'champagne', 'gold', 'light gold', 'wedding'],
    recommendedSections: ['shoes', 'ready-to-ship'],
  },
  {
    id: 'mother-of-the-bride',
    title: 'Mother of the Bride',
    theme: 'Wedding & Ceremonies',
    description: 'Regal low wedges and block heels paired with elegant metallic border clutches.',
    keywords: ['mother of the bride', 'low wedge', 'border clutch', 'classic', 'pewter', 'antique gold'],
    recommendedSections: ['shoes', 'bags'],
  },
  {
    id: 'the-bridesmaid-edit',
    title: 'The Bridesmaid Edit',
    theme: 'Wedding & Ceremonies',
    description: 'Festive metallic flats, mid block heels, and shimmering potlis for lively wedding entourages.',
    keywords: ['bridesmaid', 'rose gold', 'potli', 'baguette', 'pink', 'festive'],
    recommendedSections: ['shoes', 'bags', 'ready-to-ship'],
  },
  {
    id: 'the-destination-bride',
    title: 'The Destination Bride',
    theme: 'Wedding & Ceremonies',
    description: 'Lawn and sand-friendly braided wedges engineered for palace courtyards and coastal resorts.',
    keywords: ['destination', 'resort wedding', 'braided', 'tassel', 'tan', 'camel'],
    recommendedSections: ['shoes'],
  },
  {
    id: 'the-sangeet-ceremony',
    title: 'The Sangeet Ceremony',
    theme: 'Wedding & Ceremonies',
    description: 'Dance-ready low wedges, glitter flats, and lightweight crystal potlis built for celebration.',
    keywords: ['sangeet', 'dance', 'festive', 'sparkle', 'crystals', 'potli', 'gold'],
    recommendedSections: ['shoes', 'bags', 'ready-to-ship'],
  },
  {
    id: 'something-blue',
    title: 'Something Blue',
    theme: 'Wedding & Ceremonies',
    description: 'Subtle cobalt, royal navy, and icy silver crystal accents for the modern bridal tradition.',
    keywords: ['blue', 'navy', 'ink', 'something blue', 'silver'],
    recommendedSections: ['shoes', 'bags'],
  },

  // Galas & Celebrations
  {
    id: 'red-carpet-ready',
    title: 'Red Carpet Ready',
    theme: 'Galas & Celebrations',
    description: 'Celebrity-worn sculptural couture wedges with baguette and emerald cut crystal detailing.',
    keywords: ['red carpet', 'celebrity', 'gala', 'crystal', 'higher wedge', 'blacktie'],
    recommendedSections: ['shoes'],
  },
  {
    id: 'prom-night',
    title: 'Prom Night',
    theme: 'Galas & Celebrations',
    description: 'Showstopping high wedges and crystal baguette sandals designed to dance until dawn.',
    keywords: ['prom', 'crystal', 'rose gold', 'high wedge', 'silver'],
    recommendedSections: ['shoes', 'sale'],
  },
  {
    id: 'quinceanera-glam',
    title: 'Quinceañera Glam',
    theme: 'Galas & Celebrations',
    description: 'Princess-worthy rose gold crystals, high wedges, and artisanal evening clutches.',
    keywords: ['quinceanera', 'quinceañera', 'princess', 'rose gold', 'crystal', 'potli'],
    recommendedSections: ['shoes', 'bags'],
  },
  {
    id: 'garden-party',
    title: 'Garden Party',
    theme: 'Galas & Celebrations',
    description: 'Grass-stable block heels and low wedges that never sink into soft turf or lawns.',
    keywords: ['garden', 'lawn', 'block heel', 'low wedge', 'woven', 'neutral'],
    recommendedSections: ['shoes'],
  },
  {
    id: 'christmas-brunch',
    title: 'Christmas Brunch',
    theme: 'Galas & Celebrations',
    description: 'Warm festive metallics, champagne flats, and structured holiday border clutches.',
    keywords: ['christmas', 'holiday', 'champagne', 'border bag', 'brunch'],
    recommendedSections: ['shoes', 'bags', 'ready-to-ship'],
  },

  // Resort & Evenings
  {
    id: 'cruise-ready',
    title: 'Cruise Ready',
    theme: 'Resort & Evenings',
    description: 'Effortless deck-to-dinner low wedges, slide flats, and versatile vacation metallics.',
    keywords: ['cruise', 'yacht', 'resort', 'low wedge', 'camel', 'tan', 'slide'],
    recommendedSections: ['shoes', 'ready-to-ship'],
  },
  {
    id: 'the-holiday-edit',
    title: 'The Holiday Edit',
    theme: 'Resort & Evenings',
    description: 'Lightweight packable flats, midnight onyx wedges, and velvet zardozi potlis.',
    keywords: ['holiday', 'vacation', 'onyx', 'black', 'pewter', 'potli'],
    recommendedSections: ['shoes', 'bags'],
  },
  {
    id: "girls-night-out",
    title: "Girls' Night Out",
    theme: 'Resort & Evenings',
    description: 'Chic block heels, metallic flats, and compact party clutches designed for late-night cocktails.',
    keywords: ['girls night', 'party', 'cocktail', 'block heel', 'clutch', 'baguette'],
    recommendedSections: ['shoes', 'bags'],
  },
  {
    id: 'date-night',
    title: 'Date Night',
    theme: 'Resort & Evenings',
    description: 'Sleek 2.5" low wedges, strappy block heels, and romantic rose gold accents.',
    keywords: ['date night', 'romantic', '2.5', 'low wedge', 'block heel', 'clutch'],
    recommendedSections: ['shoes', 'bags'],
  },
];

// ==========================================
// 1. GENERAL LOGIC SECTION CLASSIFIER
// ==========================================

export function isBagProduct(p: Product): boolean {
  const cat = (p.category || '').toLowerCase();
  const col = (p.collection || '').toLowerCase();
  const title = (p.title || '').toLowerCase();

  if (cat === 'bags' || col.includes('bags & potlis') || col.includes('bag')) return true;
  if (/\b(bag|bags|potli|potlis|clutch|clutches|tote|totes|handbag|handbags|minaudiere)\b/i.test(title)) {
    if (!title.includes('baguette flats') && !title.includes('baguette low') && !title.includes('baguette high')) {
      return true;
    }
  }
  return false;
}

export function isShoeProduct(p: Product): boolean {
  return !isBagProduct(p);
}

export function isReadyToShipProduct(p: Product): boolean {
  // Check explicit flag or badge
  const badge = (p.badge || '').toLowerCase();
  if (badge.includes('ready') || badge.includes('24h') || badge.includes('in stock') || badge.includes('express')) {
    return true;
  }
  // Check inventory availability
  if (p.inventory) {
    const quantities = Object.values(p.inventory).map(Number);
    const totalUnits = quantities.reduce((sum, q) => sum + (isNaN(q) ? 0 : q), 0);
    if (totalUnits >= 4) return true;
  }
  return false;
}

export function isSaleProduct(p: Product): boolean {
  const badge = (p.badge || '').toLowerCase();
  if (badge.includes('sale') || badge.includes('archive') || badge.includes('markdown') || badge.includes('exclusive value')) {
    return true;
  }
  if (p.originalPriceUSD && p.originalPriceUSD > p.priceUSD) {
    return true;
  }
  // Standard Stöffa archive threshold
  if (p.priceUSD <= 80 && (badge.includes('ARCHIVE') || p.priceUSD < 75)) {
    return true;
  }
  return false;
}

/**
 * Classifies a product across the 4 core sections using general rule logic
 */
export function classifyProductSections(p: Product): {
  isShoe: boolean;
  isBag: boolean;
  isReadyToShip: boolean;
  isSale: boolean;
  primarySection: 'Shoes' | 'Bags' | 'Ready to Ship' | 'Sale';
  matchingSections: ('shoes' | 'bags' | 'ready-to-ship' | 'sale')[];
} {
  const isBag = isBagProduct(p);
  const isShoe = !isBag;
  const isReady = isReadyToShipProduct(p);
  const isSale = isSaleProduct(p);

  const matchingSections: ('shoes' | 'bags' | 'ready-to-ship' | 'sale')[] = [];
  if (isShoe) matchingSections.push('shoes');
  if (isBag) matchingSections.push('bags');
  if (isReady) matchingSections.push('ready-to-ship');
  if (isSale) matchingSections.push('sale');

  // Primary section determination
  let primarySection: 'Shoes' | 'Bags' | 'Ready to Ship' | 'Sale' = isBag ? 'Bags' : 'Shoes';
  if (isSale && p.priceUSD <= 75) {
    primarySection = 'Sale';
  } else if (isReady && p.isNewArrival) {
    primarySection = 'Ready to Ship';
  }

  return {
    isShoe,
    isBag,
    isReadyToShip: isReady,
    isSale,
    primarySection,
    matchingSections,
  };
}

// ==========================================
// 2. GENERAL LOGIC & AI COLLECTION DETERMINATION
// ==========================================

export interface ProductCollectionMatch {
  product: Product;
  suggestedCollection: string;
  matchedCollections: string[];
  suggestedBadge?: string;
  suggestedOccasions: string[];
  reasoning: string;
  confidence: number; // 0 to 1
}

/**
 * Analyzes a product using general logic heuristics + AI attribute mapping
 * to determine the optimal collection assignment initially for all sections.
 */
export function determineCollectionsForProduct(p: Product): ProductCollectionMatch {
  const title = (p.title || '').toLowerCase();
  const desc = (p.description || '').toLowerCase();
  const materials = (p.materials || '').toLowerCase();
  const col = (p.collection || '').toLowerCase();
  const subtitle = (p.subtitle || '').toLowerCase();
  const colors = (p.colors || []).map((c) => c.name.toLowerCase());
  const price = p.priceUSD;
  const badge = (p.badge || '').toLowerCase();

  const matchedCollections: string[] = [];
  const reasons: string[] = [];
  let confidence = 0.85;

  const isBag = isBagProduct(p);

  // 1. Heel Silhouette rule checks
  if (!isBag) {
    if (title.includes('2.5') || title.includes('2.25') || title.includes('low wedge') || col.includes('low wedge')) {
      matchedCollections.push('Low Wedges - 2.5 inch');
      reasons.push('Features ergonomic 2.25"-2.5" low wedge profile');
    }
    if (title.includes('4.25') || title.includes('4.5') || title.includes('higher') || col.includes('higher wedge')) {
      matchedCollections.push('Higher Wedge - 4.25 inch');
      reasons.push('Elevated 4.25" couture platform wedge');
    }
    if ((title.includes('3.5') || title.includes('high wedge') || title.includes('high k') || col.includes('high wedge')) && !title.includes('higher')) {
      matchedCollections.push('High Wedges - 3.5 inch');
      reasons.push('Signature 3.5" Kolhapuri high wedge');
    }
    if (title.includes('block') || col.includes('block') || desc.includes('block heel')) {
      matchedCollections.push('Block Heels');
      reasons.push('Architectural block heel structure');
    }
    if (title.includes('flat') || col.includes('flat') || desc.includes('flats') || title.includes('kolhapuri flat')) {
      matchedCollections.push('Flats & Loafers');
      reasons.push('Cushioned memory foam flat or slide');
    }
  }

  // 2. Curated Occasion Collections
  // Bride on Her Feet
  if (!isBag && (title.includes('bridal') || desc.includes('bridal') || badge.includes('bridal') || (title.includes('crystal') && colors.some((c) => ['gold', 'champagne', 'silver', 'white', 'rose gold'].includes(c))))) {
    matchedCollections.push('Bride on Her Feet');
    reasons.push('Bridal crystal embellishments suited for wedding days');
  }

  // Mother of the Bride
  if (
    (matchedCollections.includes('Low Wedges - 2.5 inch') || matchedCollections.includes('Block Heels') || title.includes('border')) &&
    colors.some((c) => ['champagne', 'pewter', 'antique gold', 'silver', 'gold'].includes(c))
  ) {
    matchedCollections.push('Mother of the Bride');
    reasons.push('Refined low-impact height & dignified metallic tones');
  }

  // The Sangeet Ceremony
  if (
    (title.includes('crystal') || title.includes('festive') || title.includes('zardozi') || title.includes('baguette') || isBag) &&
    colors.some((c) => ['gold', 'rose gold', 'champagne', 'light gold', 'silver', 'antique'].includes(c))
  ) {
    matchedCollections.push('The Sangeet Ceremony');
    reasons.push('Dance-ready comfort and celebratory shimmer');
  }

  // Something Blue
  if (colors.some((c) => c.includes('navy') || c.includes('blue') || c.includes('ink')) || title.includes('navy') || title.includes('ink') || title.includes('blue')) {
    matchedCollections.push('Something Blue');
    reasons.push('Rich navy/ink tone matching the modern bridal tradition');
  }

  // Cruise Ready
  if (
    (matchedCollections.includes('Low Wedges - 2.5 inch') || matchedCollections.includes('Flats & Loafers')) &&
    (colors.some((c) => ['camel', 'tan', 'gold', 'light gold', 'taupe'].includes(c)) || title.includes('braided') || title.includes('tassel'))
  ) {
    matchedCollections.push('Cruise Ready');
    reasons.push('Packable resort silhouette for deck-to-dinner versatility');
  }

  // Red Carpet Ready
  if (title.includes('crystal') || badge.includes('worn by') || subtitle.includes('celebrity') || matchedCollections.includes('Higher Wedge - 4.25 inch')) {
    matchedCollections.push('Red Carpet Ready');
    reasons.push('High-octane crystal sparkle and statuesque silhouette');
  }

  // Bags & Potlis
  if (isBag) {
    matchedCollections.push('Bags & Potlis');
    reasons.push('Artisanal handcrafted bag, potli, or clutch');
  }

  // Default fallback if no specific match
  if (matchedCollections.length === 0) {
    if (isBag) {
      matchedCollections.push('Bags & Potlis');
      reasons.push('Heuristic categorization for luxury accessory');
    } else {
      matchedCollections.push('Signature Wedges');
      reasons.push('General footwear styling');
    }
    confidence = 0.7;
  }

  // Determine Primary Collection
  const primaryCollection = matchedCollections[0] || (isBag ? 'Bags & Potlis' : 'Signature Wedges');

  // Determine Occasions
  const occasions = [...(p.occasions || [])];
  if (matchedCollections.includes('Bride on Her Feet') || matchedCollections.includes('Mother of the Bride')) {
    if (!occasions.includes('wedding')) occasions.push('wedding');
  }
  if (matchedCollections.includes('The Sangeet Ceremony')) {
    if (!occasions.includes('festive')) occasions.push('festive');
  }
  if (matchedCollections.includes('Red Carpet Ready') || matchedCollections.includes('Prom Night')) {
    if (!occasions.includes('gala')) occasions.push('gala');
  }
  if (matchedCollections.includes('Cruise Ready')) {
    if (!occasions.includes('resort')) occasions.push('resort');
  }

  // Determine appropriate Badge
  let suggestedBadge = p.badge;
  if (!suggestedBadge) {
    if (isSaleProduct(p)) {
      suggestedBadge = 'ARCHIVE SALE';
    } else if (isReadyToShipProduct(p)) {
      suggestedBadge = 'READY TO SHIP (24H)';
    } else if (matchedCollections.includes('Bride on Her Feet')) {
      suggestedBadge = 'BRIDAL COUTURE';
    } else if (p.isBestSeller) {
      suggestedBadge = 'BEST SELLER';
    } else if (p.isNewArrival) {
      suggestedBadge = 'JUST IN';
    }
  }

  return {
    product: p,
    suggestedCollection: primaryCollection,
    matchedCollections,
    suggestedBadge,
    suggestedOccasions: Array.from(new Set(occasions)),
    reasoning: reasons.join('; '),
    confidence,
  };
}

/**
 * Runs general logic + AI determination initially across all products,
 * populating appropriate collections, categories, and tags.
 */
export function runInitialCollectionDetermination(products: Product[]): Product[] {
  return products.map((p) => {
    const analysis = determineCollectionsForProduct(p);
    const sections = classifyProductSections(p);

    return {
      ...p,
      collection: p.collection && p.collection !== 'All' ? p.collection : analysis.suggestedCollection,
      category: p.category ? p.category : sections.primarySection,
      occasions: analysis.suggestedOccasions.length > 0 ? analysis.suggestedOccasions : p.occasions,
      badge: p.badge || analysis.suggestedBadge,
    };
  });
}

// ==========================================
// 3. SEPARATE CSV EXPORT & TEMPLATES FOR SECTIONS
// ==========================================

const CSV_HEADERS = [
  'id',
  'title',
  'subtitle',
  'category',
  'collection',
  'priceUSD',
  'originalPriceUSD',
  'badge',
  'sizes',
  'colors',
  'inventory',
  'materials',
  'description',
  'images',
];

export function exportSectionCSV(products: Product[], section: SectionType): string {
  let filtered = products;

  if (section === 'shoes') {
    filtered = products.filter(isShoeProduct);
  } else if (section === 'bags') {
    filtered = products.filter(isBagProduct);
  } else if (section === 'ready-to-ship') {
    filtered = products.filter(isReadyToShipProduct);
  } else if (section === 'sale') {
    filtered = products.filter(isSaleProduct);
  }

  const rows = filtered.map((p) => {
    const colorStr = (p.colors || []).map((c) => `${c.name}:${c.hex}`).join(';');
    const invStr = p.inventory
      ? Object.entries(p.inventory)
          .map(([sz, qty]) => `${sz}:${qty}`)
          .join(';')
      : '';
    const imgStr = (p.images || []).join(';');

    return [
      `"${p.id}"`,
      `"${(p.title || '').replace(/"/g, '""')}"`,
      `"${(p.subtitle || '').replace(/"/g, '""')}"`,
      `"${p.category || ''}"`,
      `"${p.collection || ''}"`,
      p.priceUSD,
      p.originalPriceUSD || '',
      `"${p.badge || ''}"`,
      `"${(p.sizes || []).join(';')}"`,
      `"${colorStr}"`,
      `"${invStr}"`,
      `"${(p.materials || '').replace(/"/g, '""')}"`,
      `"${(p.description || '').replace(/"/g, '""')}"`,
      `"${imgStr}"`,
    ];
  });

  return [CSV_HEADERS.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

/**
 * Generates an exemplary starter CSV template specifically structured
 * for each section with realistic prefilled rows.
 */
export function getSectionCSVTemplate(section: SectionType): string {
  if (section === 'shoes') {
    return [
      CSV_HEADERS.join(','),
      '"stoffa_sample_shoe_1","Embellished Low Wedge - Champagne Gold","Handcrafted 2.25 inch architectural wedge with memory foam","Shoes","Low Wedges - 2.5 inch",80,"","BEST SELLER","36 (US 5);37 (US 6);38 (US 7);39 (US 8);40 (US 9);41 (US 10)","Champagne Gold:#F7E7CE;Rose Gold:#B76E79","36 (US 5):4;37 (US 6):6;38 (US 7):8;39 (US 8):5","Handcrafted vegan metallic nappa, dual-density memory foam footbed","Our signature 2.25 inch low wedge. Featherlight and dance-floor stable.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STB_141_C_110_A.jpg"',
      '"stoffa_sample_shoe_2","Classic High K Wedge - Pure Gold","Timeless 3.5 inch Kolhapuri inspired wedge","Shoes","High Wedges - 3.5 inch",95,"","BRIDAL EDIT","36 (US 5);37 (US 6);38 (US 7);39 (US 8);40 (US 9);41 (US 10)","Gold:#D4AF37;Silver:#E5E7EB","36 (US 5):3;37 (US 6):8;38 (US 7):10;39 (US 8):6","Vegetable-tanned metallic leather, hand-braided cord, anti-slip sole","Our iconic statuesque high wedge for formal celebrations and weddings.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO115AGOLD_2_28164ce5-f686-425c-b30b-e6bf5b781f39.jpg"',
      '"stoffa_sample_shoe_3","Baguette Crystal Slide Flat - Silver","Ergonomic cushioned slip-on flat with baguette stones","Shoes","Flats & Loafers",75,"","JUST IN","36 (US 5);37 (US 6);38 (US 7);39 (US 8);40 (US 9);41 (US 10)","Silver:#E5E7EB;Onyx Black:#1C1917","36 (US 5):5;37 (US 6):7;38 (US 7):12;39 (US 8):8","Hand-cut crystal baguette stones, cushioned memory foam insole","Effortless luxury flat for resort evenings and bridal after-parties.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STB_191_110_A.jpg"',
    ].join('\n');
  }

  if (section === 'bags') {
    return [
      CSV_HEADERS.join(','),
      '"stoffa_sample_bag_1","Antique Zardozi Heirloom Potli - Gold","Hand-embroidered metallic wire potli with baroque pearl tassels","Bags","Bags & Potlis",90,"","SIGNATURE POTLI","One Size","Antique Gold:#D4AF37;Champagne:#F7E7CE","One Size:15","Hand-loomed silk dupion, gold zari wire embroidery, genuine pearl tassels","A masterpiece of Indian bridal craftsmanship, perfectly sized for modern phones and essentials.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO_BAG_01_A.jpg"',
      '"stoffa_sample_bag_2","Structured Silk Border Clutch - Pewter","Minimalist architectural envelope clutch with magnetic lock","Bags","Bags & Potlis",70,"","LIMITED EDITION","One Size","Pewter Grey:#8E8E93;Rose Gold:#B76E79","One Size:12","Raw silk weave, gold brushed brass frame, detachable chain strap","Sleek and statuesque clutch crafted for cocktail soirées and black-tie galas.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO_BAG_02_A.jpg"',
    ].join('\n');
  }

  if (section === 'ready-to-ship') {
    return [
      CSV_HEADERS.join(','),
      '"stoffa_sample_ready_1","Ready-to-Ship Classic Low Wedge - Rose Gold","Dispatches within 24 hours via express worldwide courier","Shoes","Low Wedges - 2.5 inch",80,"","READY TO SHIP (24H)","37 (US 6);38 (US 7);39 (US 8)","Rose Gold:#B76E79;Champagne:#F7E7CE","37 (US 6):10;38 (US 7):14;39 (US 8):9","Handcrafted metallic nappa, memory foam footbed","Guaranteed in-stock in our Mumbai atelier for immediate 24-hour dispatch.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STB_141_C_110_A.jpg"',
      '"stoffa_sample_ready_2","Ready-to-Ship Zardozi Potli Bag - Ivory","In-stock bridal accessory for urgent wedding deliveries","Bags","Bags & Potlis",90,"","READY TO SHIP (24H)","One Size","Ivory Gold:#F7E7CE","One Size:8","Handcrafted silk, antique gold embroidery","Carefully boxed with dust bag and dispatched express within 24 hours.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO_BAG_01_A.jpg"',
    ].join('\n');
  }

  if (section === 'sale') {
    return [
      CSV_HEADERS.join(','),
      '"stoffa_sample_sale_1","Archival Kolhapuri Low Wedge - Metallic Silver","Limited seasonal vault piece at exclusive price","Shoes","Low Wedges - 2.5 inch",60,90,"ARCHIVE SALE (33% OFF)","36 (US 5);37 (US 6);38 (US 7)","Silver:#E5E7EB","36 (US 5):2;37 (US 6):3;38 (US 7):1","Artisanal silver foil leather, memory foam cushioned sole","Final archive quantities of our celebrated silver metallic low wedge.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STB_141_A_110_A_240785e9-baac-4f26-94c7-a2f930af7c82.jpg"',
      '"stoffa_sample_sale_2","Past Season Silk Border Clutch - Midnight Blue","Archival runway clutch offered at special collector pricing","Bags","Bags & Potlis",55,80,"ARCHIVE SALE (31% OFF)","One Size","Midnight Blue:#1E293B","One Size:4","Raw silk, metallic cord border, brass chain","Rare colorway from the runway archives. Final sale.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO_BAG_02_A.jpg"',
    ].join('\n');
  }

  return [
    CSV_HEADERS.join(','),
    '"stoffa_sample_shoe_1","Embellished Low Wedge - Champagne Gold","Handcrafted 2.25 inch architectural wedge with memory foam","Shoes","Low Wedges - 2.5 inch",80,"","BEST SELLER","36 (US 5);37 (US 6);38 (US 7);39 (US 8);40 (US 9);41 (US 10)","Champagne Gold:#F7E7CE;Rose Gold:#B76E79","36 (US 5):4;37 (US 6):6;38 (US 7):8;39 (US 8):5","Handcrafted vegan metallic nappa, dual-density memory foam footbed","Our signature 2.25 inch low wedge. Featherlight and dance-floor stable.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STB_141_C_110_A.jpg"',
    '"stoffa_sample_bag_1","Antique Zardozi Heirloom Potli - Gold","Hand-embroidered metallic wire potli with baroque pearl tassels","Bags","Bags & Potlis",90,"","SIGNATURE POTLI","One Size","Antique Gold:#D4AF37;Champagne:#F7E7CE","One Size:15","Hand-loomed silk dupion, gold zari wire embroidery, genuine pearl tassels","A masterpiece of Indian bridal craftsmanship, perfectly sized for modern phones and essentials.","https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STO_BAG_01_A.jpg"',
  ].join('\n');
}

/**
 * Parses CSV text and normalizes products for the targeted section.
 */
export function parseSectionCSV(
  csvString: string,
  targetSection: SectionType
): { products: Product[]; count: number; error?: string } {
  try {
    const lines = csvString.trim().split(/\r?\n/);
    if (lines.length < 2) {
      return { products: [], count: 0, error: 'CSV must contain a header row and at least one data row.' };
    }

    const parseLine = (text: string) => {
      const result: string[] = [];
      let cur = '';
      let inQuotes = false;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '"') {
          if (inQuotes && text[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(cur.trim());
          cur = '';
        } else {
          cur += char;
        }
      }
      result.push(cur.trim());
      return result;
    };

    const headers = parseLine(lines[0]).map((h) => h.toLowerCase().replace(/[\s_-]/g, ''));
    const idIdx = headers.findIndex((h) => h === 'id' || h === 'productid' || h === 'sku');
    const titleIdx = headers.findIndex((h) => h === 'title' || h === 'name' || h === 'productname');
    const subtitleIdx = headers.findIndex((h) => h === 'subtitle');
    const catIdx = headers.findIndex((h) => h === 'category' || h === 'type');
    const colIdx = headers.findIndex((h) => h === 'collection');
    const usdIdx = headers.findIndex((h) => h === 'priceusd' || h === 'price' || h === 'usd');
    const inrIdx = headers.findIndex((h) => h === 'priceinr' || h === 'inr');
    const origPriceIdx = headers.findIndex((h) => h === 'originalpriceusd' || h === 'originalprice' || h === 'compareprice');
    const badgeIdx = headers.findIndex((h) => h === 'badge');
    const sizesIdx = headers.findIndex((h) => h === 'sizes');
    const colorsIdx = headers.findIndex((h) => h === 'colors');
    const invIdx = headers.findIndex((h) => h === 'inventory');
    const matIdx = headers.findIndex((h) => h === 'materials');
    const descIdx = headers.findIndex((h) => h === 'description');
    const imgIdx = headers.findIndex((h) => h === 'images' || h === 'image' || h === 'imageurl');

    if (titleIdx === -1 && idIdx === -1) {
      return { products: [], count: 0, error: 'CSV must contain at least an "id" or "title" column.' };
    }

    const parsedProducts: Product[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const cols = parseLine(lines[i]);
      const rowId = idIdx !== -1 ? cols[idIdx] : '';
      const rowTitle = titleIdx !== -1 ? cols[titleIdx] : '';
      if (!rowId && !rowTitle) continue;

      let priceUSD = 80;
      if (usdIdx !== -1 && cols[usdIdx]) {
        const val = parseFloat(cols[usdIdx].replace(/[^0-9.]/g, ''));
        if (!isNaN(val) && val > 0) priceUSD = Math.round(val);
      } else if (inrIdx !== -1 && cols[inrIdx]) {
        const inr = parseFloat(cols[inrIdx].replace(/[^0-9.]/g, ''));
        if (!isNaN(inr) && inr > 0) priceUSD = Math.round(inr / 50);
      }

      let originalPriceUSD: number | undefined = undefined;
      if (origPriceIdx !== -1 && cols[origPriceIdx]) {
        const val = parseFloat(cols[origPriceIdx].replace(/[^0-9.]/g, ''));
        if (!isNaN(val) && val > 0) originalPriceUSD = Math.round(val);
      }

      // Default category suited to section
      let category = catIdx !== -1 && cols[catIdx] ? cols[catIdx] : SECTION_METADATA[targetSection]?.defaultCategory || 'Shoes';
      if (targetSection === 'bags') category = 'Bags';
      if (targetSection === 'shoes' && category.toLowerCase() === 'bags') category = 'Shoes';

      // Default collection
      let collection = colIdx !== -1 && cols[colIdx] ? cols[colIdx] : '';

      // Default badge
      let badge = badgeIdx !== -1 && cols[badgeIdx] ? cols[badgeIdx] : undefined;
      if (targetSection === 'ready-to-ship' && !badge) badge = 'READY TO SHIP (24H)';
      if (targetSection === 'sale' && !badge) badge = 'ARCHIVE SALE';

      // Parse sizes
      const sizes = sizesIdx !== -1 && cols[sizesIdx]
        ? cols[sizesIdx].split(';').map((s) => s.trim()).filter(Boolean)
        : category === 'Bags'
        ? ['One Size']
        : ['36 (US 5)', '37 (US 6)', '38 (US 7)', '39 (US 8)', '40 (US 9)', '41 (US 10)'];

      // Parse colors
      let colors: { name: string; hex: string }[] = [];
      if (colorsIdx !== -1 && cols[colorsIdx]) {
        const parts = cols[colorsIdx].split(';').map((s) => s.trim()).filter(Boolean);
        colors = parts.map((part) => {
          if (part.includes(':')) {
            const [cName, cHex] = part.split(':');
            return { name: cName.trim(), hex: cHex.trim() || '#D4AF37' };
          }
          return { name: part, hex: '#D4AF37' };
        });
      }
      if (colors.length === 0) {
        colors = [
          { name: 'Champagne Gold', hex: '#F7E7CE' },
          { name: 'Rose Gold', hex: '#B76E79' },
        ];
      }

      // Parse inventory
      const inventory: Record<string, number> = {};
      if (invIdx !== -1 && cols[invIdx]) {
        const pairs = cols[invIdx].split(';').map((s) => s.trim()).filter(Boolean);
        pairs.forEach((p) => {
          const [sz, qty] = p.split(':');
          if (sz && qty) {
            inventory[sz.trim()] = parseInt(qty.trim(), 10) || 5;
          }
        });
      }
      if (Object.keys(inventory).length === 0) {
        sizes.forEach((sz) => {
          inventory[sz] = targetSection === 'ready-to-ship' ? 8 : 4;
        });
      }

      // Parse images
      let images: string[] = [];
      if (imgIdx !== -1 && cols[imgIdx]) {
        images = cols[imgIdx].split(';').map((s) => s.trim()).filter(Boolean);
      }
      if (images.length === 0) {
        images = ['https://cdn.shopify.com/s/files/1/0438/2221/9423/products/STB_141_C_110_A.jpg'];
      }

      const finalId = rowId || `stoffa_${targetSection}_${Date.now()}_${i}`;
      const finalTitle = rowTitle || `Accesoire Handcrafted Style ${i}`;

      const newProduct: Product = {
        id: finalId,
        title: finalTitle,
        subtitle: subtitleIdx !== -1 && cols[subtitleIdx] ? cols[subtitleIdx] : `${category} handcrafted in artisanal ateliers`,
        category,
        collection,
        priceUSD,
        priceINR: priceUSD * 50,
        originalPriceUSD,
        badge,
        sizes,
        colors,
        inventory,
        materials: matIdx !== -1 && cols[matIdx] ? cols[matIdx] : 'Artisanal vegan leather, cushioned memory footbed, anti-slip sole',
        description: descIdx !== -1 && cols[descIdx] ? cols[descIdx] : 'Handcrafted luxury piece designed for effortless comfort and celebration.',
        images,
        occasions: ['wedding', 'festive', 'cocktail'],
        rating: 4.9,
        reviewCount: 24,
      };

      // Run AI/general logic to determine collection if empty
      if (!newProduct.collection) {
        const analysis = determineCollectionsForProduct(newProduct);
        newProduct.collection = analysis.suggestedCollection;
      }

      parsedProducts.push(newProduct);
    }

    return {
      products: parsedProducts,
      count: parsedProducts.length,
    };
  } catch (err: any) {
    return {
      products: [],
      count: 0,
      error: err.message || 'Failed to parse CSV.',
    };
  }
}
