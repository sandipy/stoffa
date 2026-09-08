// Centralized Navigation Router for unique URLs and seamless page-to-page navigation
export interface ParsedRoute {
  viewMode: 'storefront' | 'admin';
  category: string;
  productId: string | null;
}

export const CATEGORY_URL_MAP: Record<string, string> = {
  'All': '#/',
  'Home': '#/',
  'Just In': '#/just-in',
  'Shoes': '#/shoes',
  'Low wedges - 2.5 inch': '#/shoes/low-wedges',
  'High wedges - 3.5 inch': '#/shoes/high-wedges',
  'Higher wedge - 4.25 inch': '#/shoes/higher-wedges',
  'Block Heels': '#/shoes/block-heels',
  'Flats': '#/shoes/flats',
  'Bags': '#/bags',
  'Belts': '#/belts',
  'Jewellery': '#/jewellery',
  'Collections': '#/collections',
  'The Collections': '#/collections',
  'Bride on Her Feet': '#/collections/bride-on-her-feet',
  'Mother of the Bride': '#/collections/mother-of-the-bride',
  'The Bridesmaid Edit': '#/collections/the-bridesmaid-edit',
  'The Destination Bride': '#/collections/the-destination-bride',
  'The Sangeet Ceremony': '#/collections/the-sangeet-ceremony',
  'Something Blue': '#/collections/something-blue',
  'Red Carpet Ready': '#/collections/red-carpet-ready',
  'Prom Night': '#/collections/prom-night',
  'Quinceañera Glam': '#/collections/quinceanera-glam',
  'Garden Party': '#/collections/garden-party',
  'Christmas Brunch': '#/collections/christmas-brunch',
  'Cruise Ready': '#/collections/cruise-ready',
  'The Holiday Edit': '#/collections/the-holiday-edit',
  "Girls' Night Out": '#/collections/girls-night-out',
  'Date Night': '#/collections/date-night',
  'Sale': '#/sale',
  'Ready to Ship': '#/ready-to-ship',
};

export function categoryToUrl(category: string): string {
  if (CATEGORY_URL_MAP[category]) {
    return CATEGORY_URL_MAP[category];
  }
  const clean = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `#/category/${clean}`;
}

export function parseHashRoute(hash: string): ParsedRoute {
  // Normalize hash, remove leading # or #/
  const raw = (hash || '').trim();
  const clean = raw.replace(/^#\/?/, '').toLowerCase().trim();

  if (!clean || clean === 'home') {
    return { viewMode: 'storefront', category: 'All', productId: null };
  }

  if (clean === 'admin') {
    return { viewMode: 'admin', category: 'All', productId: null };
  }

  if (clean.startsWith('product/')) {
    const pId = clean.replace('product/', '').trim();
    return { viewMode: 'storefront', category: 'All', productId: pId };
  }

  // Reverse match category URL map
  for (const [catName, url] of Object.entries(CATEGORY_URL_MAP)) {
    const target = url.replace(/^#\/?/, '').toLowerCase();
    if (clean === target) {
      return { viewMode: 'storefront', category: catName === 'Home' ? 'All' : catName, productId: null };
    }
  }

  // Fallback for custom collections or category subroutes
  if (clean.startsWith('collections/')) {
    const sub = clean.replace('collections/', '');
    for (const [catName, url] of Object.entries(CATEGORY_URL_MAP)) {
      if (url.toLowerCase().includes(sub)) {
        return { viewMode: 'storefront', category: catName, productId: null };
      }
    }
  }

  if (clean.startsWith('category/')) {
    const cat = decodeURIComponent(clean.replace('category/', '')).replace(/-/g, ' ');
    return { viewMode: 'storefront', category: cat, productId: null };
  }

  return { viewMode: 'storefront', category: 'All', productId: null };
}

export function navigateTo(url: string): void {
  window.location.hash = url.startsWith('#') ? url : `#${url}`;
  window.scrollTo({ top: 0, behavior: 'instant' });
}
