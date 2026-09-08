import { Product } from '../types';

/**
 * Normalizes text for accent-insensitive, case-insensitive, and punctuation-agnostic search.
 * Converts "Stöffa" -> "stoffa", "Slip-On" -> "slip on", "Étoile" -> "etoile"
 */
export function normalizeSearch(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics (ö -> o, é -> e, etc.)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ') // replace punctuation with spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks whether a product matches a search query.
 * Splits multi-word queries into tokens; every token must match somewhere in the product's corpus.
 */
export function matchProductSearch(product: Product, query: string): boolean {
  const normQuery = normalizeSearch(query);
  if (!normQuery) return true;

  const queryTokens = normQuery.split(' ').filter(Boolean);
  if (queryTokens.length === 0) return true;

  // Build searchable corpus for this product
  const corpusParts = [
    product.title,
    product.subtitle,
    product.category,
    product.brand || 'Stöffa',
    'stoffa stoffastyle stöffa atelier etoile',
    product.description,
    product.materials,
    product.occasionNote || '',
    (product.occasions || []).join(' '),
    (product.colors || []).map((c) => c.name).join(' '),
    (product.sizes || []).join(' '),
  ];

  const normalizedCorpus = normalizeSearch(corpusParts.join(' '));

  // All query tokens must be present in the normalized corpus
  return queryTokens.every((token) => normalizedCorpus.includes(token));
}
