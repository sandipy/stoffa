export type CurrencyCode = 'USD' | 'CAD' | 'EUR' | 'GBP' | 'AUD' | 'JPY';

export interface Currency {
  code: CurrencyCode | string;
  symbol: string;
  name: string;
  rate: number; // relative to USD (USD = 1.0)
  flag: string;
  isEnabled: boolean;
  isDefault?: boolean;
}

export type LanguageCode =
  | 'en'
  | 'fr'
  | 'es'
  | 'de'
  | 'it'
  | 'pt'
  | 'tr'
  | 'hi'
  | 'ta'
  | 'te'
  | 'kn'
  | 'ml'
  | 'ja'
  | 'fa'
  | 'ar'
  | string;

export type ContinentGroup =
  | 'European'
  | 'Canada & Americas'
  | 'Middle East & Asia'
  | 'Indian Subcontinent';

export interface Language {
  code: LanguageCode | string;
  name: string;
  nativeName: string;
  flag: string;
  isEnabled: boolean;
  isDefault?: boolean;
  dir?: 'ltr' | 'rtl';
  continent: ContinentGroup | string;
  continentOrder?: number;
}

export interface Occasion {
  id: string;
  name: string;
  nameKey: string;
  tagline: string;
  description: string;
}

export interface ProductAngle {
  url: string;
  label: string;
  tag: string;
  isAiImage?: boolean;
  aiDescription?: string;
  shotType?: 'hero' | 'side' | 'detail' | 'ai_cu' | 'ai_mid' | 'ai_full';
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  brand?: string;
  handle?: string;
  category:
    | 'Shoes'
    | 'Bags'
    | 'Heels'
    | 'Boots'
    | 'Flats & Loafers'
    | 'Totes'
    | 'Shoulder Bags'
    | 'Sandals & Mules'
    | 'Dresses'
    | 'Resort'
    | 'Mommy & Me'
    | 'Separates'
    | 'Accessories'
    | string;
  collection?: string;
  occasions: string[];
  occasionNote?: string;
  priceUSD: number;
  priceINR?: number;
  originalPriceUSD?: number;
  salePriceUSD?: number;
  badge?: string;
  images: string[];
  angles?: ProductAngle[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  inventory: Record<string, number>; // size -> quantity
  description: string;
  materials: string;
  rating: number;
  reviewCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export interface Campaign {
  id: string;
  slug: string;
  name: string;
  platform: 'Instagram' | 'YouTube' | 'Pinterest' | 'Editorial' | 'Other';
  creatorName: string;
  affiliateId?: string;
  targetCollection?: string;
  defaultCurrency?: string;
  defaultLanguage?: string;
  discountPercent: number;
  clicks: number;
  conversions: number;
  revenueUSD: number;
  createdAt: string;
  isActive: boolean;
}

export interface Affiliate {
  id: string;
  name: string;
  handle: string;
  platform: string;
  email: string;
  commissionRate: number; // e.g. 0.12 for 12%
  customSlug: string;
  totalClicks: number;
  totalSales: number;
  totalRevenueUSD: number;
  pendingCommissionUSD: number;
  clearedCommissionUSD: number;
  paidCommissionUSD: number;
  stripeConnected: boolean;
  stripeAccountId: string;
  status: 'active' | 'review' | 'paused';
}

export interface Payout {
  id: string;
  affiliateId: string;
  affiliateName: string;
  amountUSD: number;
  currency: string;
  paymentMethod: 'Stripe Connect' | 'Direct ACH' | 'Wire';
  status: 'cleared' | 'processing' | 'paid';
  transactionHash: string;
  initiatedAt: string;
  completedAt?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotalUSD: number;
  discountUSD: number;
  totalUSD: number;
  currency: string;
  currencyTotal: number;
  customerEmail: string;
  customerName: string;
  shippingAddress: string;
  campaignSlug?: string;
  affiliateId?: string;
  status: 'confirmed' | 'processing' | 'shipped';
  createdAt: string;
  trackingNumber?: string;
}

export interface B2BOrderItem {
  product: Product;
  sizeBreakdown: Record<string, number>;
  colorName: string;
  totalQuantity: number;
  unitPriceUSD: number;
  discountedUnitPriceUSD: number;
}

export interface ShipmentMilestone {
  stage: 'ordered' | 'verified' | 'dispatched' | 'in_transit' | 'out_for_delivery' | 'delivered';
  title: string;
  location: string;
  date: string;
  completed: boolean;
  current: boolean;
  notes?: string;
}

export interface TrackingDetails {
  trackingNumber: string;
  carrier: string;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Order Confirmed' | 'Processing';
  estimatedDelivery: string;
  origin: string;
  destination: string;
  weight: string;
  milestones: ShipmentMilestone[];
  itemsSummary: string;
}

export type SortOption = 'featured' | 'price-low-to-high' | 'price-high-to-low' | 'newest';
