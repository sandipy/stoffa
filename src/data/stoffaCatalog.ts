import { Product } from '../types';
import { STOFFA_STYLE_OFFICIAL_PRODUCTS } from './stoffaStyleProducts';

export const STOFFA_BRAND_STORY =
  "Women's luxury footwear & accessories handcrafted in-house by Stoffa Style (stoffastyle.com), retailed from our flagship boutique in Mumbai, as well as over 50 premier designer stores across India. Renowned for signature Kolhapuri wedges, artisanal braided flats, architectural block heels, and hand-embellished bridal potlis.";

export const STOFFA_STORE_PRODUCTS: Product[] = STOFFA_STYLE_OFFICIAL_PRODUCTS;

export const STOFFA_RAW_PRODUCTS = STOFFA_STYLE_OFFICIAL_PRODUCTS;

export const STOFFA_CATALOG_CSV: string = (() => {
  const headers = ['id', 'title', 'subtitle', 'category', 'priceINR', 'priceUSD', 'originalPriceUSD', 'rating', 'reviewCount', 'materials', 'sizes', 'description'];
  const rows = STOFFA_STORE_PRODUCTS.map((p) => [
    `"${p.id}"`,
    `"${p.title.replace(/"/g, '""')}"`,
    `"${p.subtitle.replace(/"/g, '""')}"`,
    `"${p.category}"`,
    p.priceINR || (p.priceUSD * 50),
    p.priceUSD,
    p.originalPriceUSD || '',
    p.rating,
    p.reviewCount,
    `"${p.materials.replace(/"/g, '""')}"`,
    `"${p.sizes.join(';')}"`,
    `"${p.description.replace(/"/g, '""')}"`,
  ]);
  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
})();
