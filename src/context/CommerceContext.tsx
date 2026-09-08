import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  AVAILABLE_CURRENCY_PRESETS,
  AVAILABLE_LANGUAGE_PRESETS,
  INITIAL_AFFILIATES,
  INITIAL_CAMPAIGNS,
  INITIAL_CURRENCIES,
  INITIAL_LANGUAGES,
  INITIAL_PAYOUTS,
  INITIAL_PRODUCTS,
  TRANSLATIONS,
} from '../data/mockData';
import { translateWebsiteText } from '../data/translationsData';
import { translationMdService, WebsiteCoverageReport } from '../services/translationMdService';
import { STOFFA_BRAND_STORY, STOFFA_STORE_PRODUCTS } from '../data/stoffaCatalog';
import {
  Affiliate,
  B2BOrderItem,
  Campaign,
  CartItem,
  Currency,
  Language,
  Order,
  Payout,
  Product,
  ShipmentMilestone,
  SortOption,
  TrackingDetails,
} from '../types';
import { getProductAngles } from '../data/productMedia';
import { HeroSlideConfig, loadHeroSlides } from '../data/heroSlidesManager';
import {
  exportSectionCSV,
  parseSectionCSV,
  runInitialCollectionDetermination,
  SectionType,
} from '../utils/collectionClassifier';

interface CommerceContextType {
  // Storefront & Products
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occ: string) => void;
  clearFilters: () => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (prod: Product | null) => void;

  // Search, Sorting & Size Filters
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  selectedSizeFilter: string;
  setSelectedSizeFilter: (size: string) => void;

  // Product Comparison
  comparisonList: Product[];
  addToComparison: (p: Product) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;

  // Storytelling seasonal description
  storytellingText: string;
  setStorytellingText: (text: string) => void;
  resetStorytellingText: () => void;

  // B2B Wholesale & Bulk ordering
  b2bList: B2BOrderItem[];
  addToB2BList: (item: B2BOrderItem) => void;
  removeFromB2BList: (index: number) => void;
  clearB2BList: () => void;
  isB2BModalOpen: boolean;
  setIsB2BModalOpen: (open: boolean) => void;
  b2bTargetProduct: Product | null;
  setB2BTargetProduct: (p: Product | null) => void;

  // Order Tracking
  lookupTracking: (trackingNum: string) => TrackingDetails | null;
  activeTrackingDetails: TrackingDetails | null;
  setActiveTrackingDetails: (t: TrackingDetails | null) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;

  // CSV Catalog Management
  exportCatalogCSV: () => string;
  importProductsFromCSV: (csvString: string) => { success: boolean; count: number; error?: string };
  importStoffaCatalog: () => { success: boolean; count: number };
  updateProductPrice: (productId: string, newPriceUSD: number) => { success: boolean; error?: string };
  updateProductDetails: (updatedProduct: Product) => { success: boolean; message: string };
  isCatalogManagerOpen: boolean;
  setIsCatalogManagerOpen: (open: boolean) => void;

  // Dedicated Section CSV & AI Collection Management (Ready to Ship, Sale, Shoes, Bags)
  exportSectionCSV: (section: SectionType) => string;
  importSectionCSV: (csvString: string, section: SectionType) => { success: boolean; count: number; error?: string };
  runAiCollectionCategorizer: () => { updatedCount: number; message: string };

  // Media Gallery & Image Downloader
  isMediaGalleryOpen: boolean;
  setIsMediaGalleryOpen: (open: boolean) => void;

  // Hero Image & Pairing Curator
  isPairingCuratorOpen: boolean;
  setIsPairingCuratorOpen: (open: boolean) => void;

  // Hero CSV & Image Manager
  isHeroCsvModalOpen: boolean;
  setIsHeroCsvModalOpen: (open: boolean) => void;
  heroSlides: HeroSlideConfig[];
  refreshHeroSlides: () => void;

  // Page Hero Images Manager (Allows admin to change hero image on each page)
  isPageHeroManagerOpen: boolean;
  setIsPageHeroManagerOpen: (open: boolean) => void;
  pageHeroActiveTarget: string | null;
  openPageHeroManager: (pageKeyOrTitle?: string) => void;

  // Language Change Confirmation
  pendingLanguage: Language | null;
  requestLanguageChange: (code: string) => void;
  confirmLanguageChange: () => void;
  cancelLanguageChange: () => void;

  // Language & Currency Dialog Modals
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  isCurrencyModalOpen: boolean;
  setIsCurrencyModalOpen: (open: boolean) => void;
  isTranslationMdModalOpen: boolean;
  setIsTranslationMdModalOpen: (open: boolean) => void;
  updateTranslationText: (langCode: string, key: string, newValue: string) => void;
  downloadTranslationsMdFile: () => void;
  reloadTranslationsFromMd: () => Promise<boolean>;
  getRawTranslationsMd: () => string;
  applyNewTranslationsMd: (md: string) => { success: boolean; count: number; error?: string };
  scanWebsiteCoverage: (additionalStrings?: string[]) => WebsiteCoverageReport;
  addMissingStringsToMd: (strings: string[]) => { addedCount: number };

  // Size Guide Modal
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Quota limits handling
  quotaAlert: { message: string; retryAction?: () => void } | null;
  triggerQuotaAlert: (msg?: string, retryAction?: () => void) => void;
  dismissQuotaAlert: () => void;

  // Social Share
  shareProduct: (product: Product, platform?: string) => Promise<{ success: boolean; message: string }>;

  // Currencies & 1-Click Toggle
  currencies: Currency[];
  activeCurrency: Currency;
  setCurrency: (code: string) => void;
  toggleCurrency: (code: string) => void;
  updateCurrencyRate: (code: string, newRate: number) => void;
  addCurrencyPreset: (presetCode: string) => void;
  formatPrice: (amountUSD: number) => string;

  // Languages & 1-Click Localization
  languages: Language[];
  activeLanguage: Language;
  setLanguage: (code: string) => void;
  toggleLanguage: (code: string) => void;
  addLanguagePreset: (presetCode: string) => void;
  t: (key: string, fallback?: string) => string;

  // Custom Campaign URL Tracking
  campaigns: Campaign[];
  activeCampaign: Campaign | null;
  activateCampaignBySlug: (slug: string) => boolean;
  clearActiveCampaign: () => void;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'clicks' | 'conversions' | 'revenueUSD' | 'createdAt' | 'isActive'>) => void;
  toggleCampaignStatus: (id: string) => void;

  // Affiliates & Automated Payouts
  affiliates: Affiliate[];
  payouts: Payout[];
  activeAffiliateId: string;
  setActiveAffiliateId: (id: string) => void;
  executeStripePayout: (affiliateId: string) => void;
  executeBatchStripePayouts: () => number;

  // Cart & Orders
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: { name: string; hex: string }, qty?: number) => void;
  updateCartQuantity: (index: number, delta: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (customer: { name: string; email: string; address: string }) => Order;

  // App Views
  viewMode: 'storefront' | 'admin' | 'affiliate_portal';
  setViewMode: (mode: 'storefront' | 'admin' | 'affiliate_portal') => void;
  adminTab: 'campaigns' | 'affiliates' | 'payouts' | 'i18n_currencies' | 'analytics' | 'catalog_cms' | 'homepage_cards';
  setAdminTab: (tab: 'campaigns' | 'affiliates' | 'payouts' | 'i18n_currencies' | 'analytics' | 'catalog_cms' | 'homepage_cards') => void;

  // Admin Auth (Fixed for sulaniyashpal@gmail.com)
  adminUser: string | null;
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
}

export function deduplicateProducts(prods: Product[]): Product[] {
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();
  const result: Product[] = [];

  for (const p of prods) {
    if (!p) continue;
    const normId = (p.id || '').trim();
    const normTitle = (p.title || '').trim().toLowerCase().replace(/\s+/g, ' ');

    if (normId && seenIds.has(normId)) continue;
    if (normTitle && seenTitles.has(normTitle)) continue;

    if (normId) seenIds.add(normId);
    if (normTitle) seenTitles.add(normTitle);
    result.push(p);
  }
  return result;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- Persistent or Initialized State ---
  const [products, setProducts] = useState<Product[]>(() => {
    const CURRENT_CATALOG_VERSION = 'accesoire_pure_luxury_catalog_v12_deduped';
    const saved = localStorage.getItem('accesoire_products_usd');
    const catalogSource = localStorage.getItem('accesoire_catalog_source');

    const cleanBaseProducts = deduplicateProducts(
      STOFFA_STORE_PRODUCTS.map((p) => {
        const cleanImgs = p.images.filter(
          (img) =>
            !img.includes('Madhuri') &&
            !img.includes('Karina') &&
            !img.includes('Kareena') &&
            !img.includes('Alia') &&
            !img.includes('RASHMIKA') &&
            !img.includes('SHREYA') &&
            !img.includes('SONALI') &&
            !img.includes('KARISHMA') &&
            !img.includes('Genelia') &&
            !img.includes('BHAVANA')
        );
        return {
          ...p,
          originalPriceUSD: undefined,
          images: cleanImgs.length > 0 ? cleanImgs : p.images,
        };
      })
    );

    // Automatically run general logic & AI collection determination initially across all sections
    const initialEnriched = deduplicateProducts(runInitialCollectionDetermination(cleanBaseProducts));

    if (!saved || catalogSource !== CURRENT_CATALOG_VERSION) {
      localStorage.setItem('accesoire_catalog_source', CURRENT_CATALOG_VERSION);
      localStorage.setItem('accesoire_products_usd', JSON.stringify(initialEnriched));
      return initialEnriched;
    }

    try {
      const parsed: Product[] = JSON.parse(saved);
      const sanitized = deduplicateProducts(
        parsed.map((p) => {
          const matchingBase = cleanBaseProducts.find((bp) => bp.id === p.id);
          const cleanImgs = (p.images || []).filter(
            (img) =>
              !img.includes('Madhuri') &&
              !img.includes('Karina') &&
              !img.includes('Kareena') &&
              !img.includes('Alia') &&
              !img.includes('RASHMIKA') &&
              !img.includes('SHREYA') &&
              !img.includes('SONALI') &&
              !img.includes('KARISHMA') &&
              !img.includes('Genelia') &&
              !img.includes('BHAVANA')
          );
          return {
            ...p,
            originalPriceUSD: undefined,
            images: cleanImgs.length > 0 ? cleanImgs : matchingBase ? matchingBase.images : p.images,
          };
        })
      );
      const enriched = deduplicateProducts(
        runInitialCollectionDetermination(sanitized.length > 0 ? sanitized : initialEnriched)
      );
      return enriched;
    } catch {
      return initialEnriched;
    }
  });

  const saveProducts = (newProds: Product[]) => {
    const deduped = deduplicateProducts(newProds);
    setProducts(deduped);
    localStorage.setItem('accesoire_products_usd', JSON.stringify(deduped));
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  // Search, Sorting & Size Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  // Product Comparison State
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);

  const addToComparison = (p: Product) => {
    setComparisonList((prev) => {
      if (prev.some((item) => item.id === p.id)) return prev;
      if (prev.length >= 2) {
        return [prev[1], p];
      }
      return [...prev, p];
    });
    setIsComparisonOpen(true);
  };

  const removeFromComparison = (id: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== id));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  // Storytelling Seasonal Description
  const DEFAULT_STORYTELLING =
    'Curated in collaboration with European master tanners in Florence and Porto. The Autumn / Winter 2026 collection celebrates sculptural geometry, ergonomic hand-sculpted lasts, and sustainable Tuscan nappa leather. Designed for modern living with seamless occasion versatility and effortless luxury.';

  const [storytellingText, setStorytellingTextState] = useState<string>(() => {
    return localStorage.getItem('etoile_storytelling_text') || DEFAULT_STORYTELLING;
  });

  const setStorytellingText = (text: string) => {
    setStorytellingTextState(text);
    localStorage.setItem('etoile_storytelling_text', text);
  };

  const resetStorytellingText = () => {
    setStorytellingText(DEFAULT_STORYTELLING);
  };

  // B2B Wholesale Ordering
  const [b2bList, setB2BList] = useState<B2BOrderItem[]>(() => {
    const saved = localStorage.getItem('etoile_b2b_list');
    return saved ? JSON.parse(saved) : [];
  });
  const [isB2BModalOpen, setIsB2BModalOpen] = useState(false);
  const [b2bTargetProduct, setB2BTargetProduct] = useState<Product | null>(null);

  const addToB2BList = (item: B2BOrderItem) => {
    setB2BList((prev) => {
      const updated = [...prev, item];
      localStorage.setItem('etoile_b2b_list', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromB2BList = (index: number) => {
    setB2BList((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('etoile_b2b_list', JSON.stringify(updated));
      return updated;
    });
  };

  const clearB2BList = () => {
    setB2BList([]);
    localStorage.removeItem('etoile_b2b_list');
  };

  // Tracking & Shipments
  const [activeTrackingDetails, setActiveTrackingDetails] = useState<TrackingDetails | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  // CSV Catalog Management
  const [isCatalogManagerOpen, setIsCatalogManagerOpen] = useState(false);

  // Media Gallery Modal
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false);
  const [isPairingCuratorOpen, setIsPairingCuratorOpen] = useState(false);
  const [isHeroCsvModalOpen, setIsHeroCsvModalOpen] = useState(false);
  const [isTranslationMdModalOpen, setIsTranslationMdModalOpen] = useState(false);
  const [, setTranslationsTick] = useState(0);

  // Initialize and subscribe to offline Markdown translations
  useEffect(() => {
    translationMdService.initialize().then(() => {
      setTranslationsTick((t) => t + 1);
    });
    const unsubscribe = translationMdService.subscribe(() => {
      setTranslationsTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const updateTranslationText = (langCode: string, key: string, newValue: string) => {
    translationMdService.updateTranslation(langCode, key, newValue);
  };

  const downloadTranslationsMdFile = () => {
    translationMdService.downloadMarkdownFile();
  };

  const reloadTranslationsFromMd = async () => {
    return await translationMdService.reloadFromDisk();
  };

  const getRawTranslationsMd = () => {
    return translationMdService.getRawMarkdown();
  };

  const applyNewTranslationsMd = (md: string) => {
    return translationMdService.applyNewMarkdown(md);
  };

  const scanWebsiteCoverage = (additionalStrings?: string[]): WebsiteCoverageReport => {
    const dynamicCandidates = additionalStrings ? [...additionalStrings] : [];
    products.forEach((p) => {
      if (p.title) dynamicCandidates.push(p.title);
      if (p.subtitle) dynamicCandidates.push(p.subtitle);
      if (p.category) dynamicCandidates.push(p.category);
      if (p.badge) dynamicCandidates.push(p.badge);
      if (p.materials) dynamicCandidates.push(p.materials);
    });
    if (storytellingText) dynamicCandidates.push(storytellingText);
    return translationMdService.scanWebsiteCoverage(dynamicCandidates);
  };

  const addMissingStringsToMd = (strings: string[]) => {
    return translationMdService.addMissingStringsToMd(strings);
  };
  const [heroSlides, setHeroSlides] = useState<HeroSlideConfig[]>(() => loadHeroSlides());

  // Page Hero Images Manager (Change Hero Image on each page)
  const [isPageHeroManagerOpen, setIsPageHeroManagerOpen] = useState(false);
  const [pageHeroActiveTarget, setPageHeroActiveTarget] = useState<string | null>(null);

  const openPageHeroManager = (pageKeyOrTitle?: string) => {
    setPageHeroActiveTarget(pageKeyOrTitle || null);
    setIsPageHeroManagerOpen(true);
  };

  const refreshHeroSlides = () => {
    setHeroSlides(loadHeroSlides());
  };

  useEffect(() => {
    const handleHeroUpdated = () => {
      setHeroSlides(loadHeroSlides());
    };
    window.addEventListener('hero-slides-updated', handleHeroUpdated);
    return () => window.removeEventListener('hero-slides-updated', handleHeroUpdated);
  }, []);

  // Language Change Warning Modal
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);

  // Quota Limits & Fallback
  const [quotaAlert, setQuotaAlert] = useState<{ message: string; retryAction?: () => void } | null>(null);

  const triggerQuotaAlert = (msg?: string, retryAction?: () => void) => {
    setQuotaAlert({
      message:
        msg ||
        'Gemini 3.8 Flash quota limit or model provider threshold reached. Atelier AI fallback engine activated with offline cached styling parameters.',
      retryAction,
    });
  };

  const dismissQuotaAlert = () => {
    setQuotaAlert(null);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('all');
    setSearchTerm('');
    setSelectedSizeFilter('all');
    setSortBy('featured');
  };

  // Language & Currency Dialog Modals
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);

  // Currencies state
  const [currencies, setCurrencies] = useState<Currency[]>(() => {
    const saved = localStorage.getItem('etoile_currencies_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return INITIAL_CURRENCIES;
  });
  const [activeCurrencyCode, setActiveCurrencyCode] = useState<string>(() => {
    return localStorage.getItem('etoile_active_currency') || 'USD';
  });

  // Languages state
  const [languages, setLanguages] = useState<Language[]>(() => {
    const saved = localStorage.getItem('etoile_languages_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return INITIAL_LANGUAGES;
  });
  const [activeLanguageCode, setActiveLanguageCode] = useState<string>(() => {
    return localStorage.getItem('etoile_active_language') || 'en';
  });

  // Campaigns & Affiliates state
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('etoile_campaigns');
    if (!saved) return INITIAL_CAMPAIGNS;
    try {
      const parsed: Campaign[] = JSON.parse(saved);
      const missing = INITIAL_CAMPAIGNS.filter((initC) => !parsed.some((p) => p.id === initC.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);

  const [affiliates, setAffiliates] = useState<Affiliate[]>(() => {
    const saved = localStorage.getItem('etoile_affiliates');
    return saved ? JSON.parse(saved) : INITIAL_AFFILIATES;
  });
  const [activeAffiliateId, setActiveAffiliateId] = useState<string>('aff_01');

  const [payouts, setPayouts] = useState<Payout[]>(() => {
    const saved = localStorage.getItem('etoile_payouts');
    return saved ? JSON.parse(saved) : INITIAL_PAYOUTS;
  });

  // Cart & Orders
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('etoile_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('etoile_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Views & Admin Auth
  const FIXED_ADMIN_EMAIL = 'sulaniyashpal@gmail.com';
  const [adminUser, setAdminUser] = useState<string | null>(() => {
    return localStorage.getItem('accesoire_admin_user');
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  const isAdminLoggedIn = adminUser?.trim().toLowerCase() === FIXED_ADMIN_EMAIL.toLowerCase();

  const loginAdmin = (email: string) => {
    const cleaned = email.trim().toLowerCase();
    if (cleaned === FIXED_ADMIN_EMAIL.toLowerCase()) {
      setAdminUser(FIXED_ADMIN_EMAIL);
      localStorage.setItem('accesoire_admin_user', FIXED_ADMIN_EMAIL);
      return { success: true };
    }
    return {
      success: false,
      error: 'Access denied. The catalog and admin controls are strictly reserved for sulaniyashpal@gmail.com.',
    };
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem('accesoire_admin_user');
    setViewMode('storefront');
  };

  const [viewMode, setViewMode] = useState<'storefront' | 'admin' | 'affiliate_portal'>('storefront');
  const [adminTab, setAdminTab] = useState<'campaigns' | 'affiliates' | 'payouts' | 'i18n_currencies' | 'analytics' | 'catalog_cms' | 'homepage_cards'>('campaigns');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('etoile_currencies_v3', JSON.stringify(currencies));
  }, [currencies]);

  useEffect(() => {
    localStorage.setItem('etoile_languages_v3', JSON.stringify(languages));
  }, [languages]);

  useEffect(() => {
    localStorage.setItem('etoile_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('etoile_affiliates', JSON.stringify(affiliates));
  }, [affiliates]);

  useEffect(() => {
    localStorage.setItem('etoile_payouts', JSON.stringify(payouts));
  }, [payouts]);

  useEffect(() => {
    localStorage.setItem('etoile_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('etoile_orders', JSON.stringify(orders));
  }, [orders]);

  // Active currency object
  const activeCurrency = currencies.find((c) => c.code === activeCurrencyCode && c.isEnabled) ||
    currencies.find((c) => c.isEnabled) ||
    currencies[0];

  const setCurrency = (code: string) => {
    setActiveCurrencyCode(code);
    localStorage.setItem('etoile_active_currency', code);
  };

  // 1-Click Toggle Currency
  const toggleCurrency = (code: string) => {
    setCurrencies((prev) => {
      const target = prev.find((c) => c.code === code);
      if (!target) return prev;
      // Do not disable if it's the last remaining enabled currency
      const enabledCount = prev.filter((c) => c.isEnabled).length;
      if (target.isEnabled && enabledCount <= 1) return prev;

      return prev.map((c) => (c.code === code ? { ...c, isEnabled: !c.isEnabled } : c));
    });
  };

  const updateCurrencyRate = (code: string, newRate: number) => {
    if (newRate <= 0) return;
    setCurrencies((prev) => prev.map((c) => (c.code === code ? { ...c, rate: newRate } : c)));
  };

  const addCurrencyPreset = (presetCode: string) => {
    const found = AVAILABLE_CURRENCY_PRESETS.find((p) => p.code === presetCode);
    if (!found) return;
    if (currencies.some((c) => c.code === presetCode)) {
      toggleCurrency(presetCode);
      return;
    }
    setCurrencies((prev) => [...prev, { ...found, isEnabled: true }]);
  };

  // Price formatting - Always strictly in USD ($)
  const formatPrice = (amountUSD: number) => {
    if (isNaN(amountUSD) || amountUSD === null || amountUSD === undefined) return '$0';
    return `$${Math.round(amountUSD).toLocaleString()}`;
  };

  // Active language object
  const activeLanguage = languages.find((l) => l.code === activeLanguageCode && l.isEnabled) ||
    languages.find((l) => l.isEnabled) ||
    languages[0];

  useEffect(() => {
    const isRtl = activeLanguage.dir === 'rtl' || activeLanguage.code === 'fa' || activeLanguage.code === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = activeLanguage.code;
  }, [activeLanguage]);

  const setLanguage = (code: string) => {
    setActiveLanguageCode(code);
    localStorage.setItem('etoile_active_language', code);
  };

  // 1-Click Toggle Language
  const toggleLanguage = (code: string) => {
    setLanguages((prev) => {
      const target = prev.find((l) => l.code === code);
      if (!target) return prev;
      const enabledCount = prev.filter((l) => l.isEnabled).length;
      if (target.isEnabled && enabledCount <= 1) return prev;
      return prev.map((l) => (l.code === code ? { ...l, isEnabled: !l.isEnabled } : l));
    });
  };

  const addLanguagePreset = (presetCode: string) => {
    const found = AVAILABLE_LANGUAGE_PRESETS.find((p) => p.code === presetCode);
    if (!found) return;
    if (languages.some((l) => l.code === presetCode)) {
      toggleLanguage(presetCode);
      return;
    }
    setLanguages((prev) => [...prev, { ...found, isEnabled: true }]);
  };

  // Translation helper
  const t = (key: string, fallback?: string): string => {
    return translateWebsiteText(key, activeLanguage.code, fallback);
  };

  // Campaign Activation by Custom URL slug
  const activateCampaignBySlug = (slug: string): boolean => {
    const campaign = campaigns.find((c) => c.slug.toLowerCase() === slug.toLowerCase() && c.isActive);
    if (!campaign) return false;

    setActiveCampaign(campaign);
    // Auto preset currency if specified in campaign
    if (campaign.defaultCurrency) {
      const targetCurr = currencies.find((c) => c.code === campaign.defaultCurrency);
      if (targetCurr && targetCurr.isEnabled) {
        setCurrency(campaign.defaultCurrency);
      }
    }
    // Auto preset language if specified in campaign
    if (campaign.defaultLanguage) {
      const targetLang = languages.find((l) => l.code === campaign.defaultLanguage);
      if (targetLang) {
        if (!targetLang.isEnabled) {
          setLanguages((prev) => prev.map((l) => (l.code === campaign.defaultLanguage ? { ...l, isEnabled: true } : l)));
        }
        setLanguage(campaign.defaultLanguage);
      }
    }

    // Increment campaign clicks
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaign.id ? { ...c, clicks: c.clicks + 1 } : c))
    );

    // If tied to an affiliate, increment affiliate clicks
    if (campaign.affiliateId) {
      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === campaign.affiliateId ? { ...a, totalClicks: a.totalClicks + 1 } : a
        )
      );
    }

    return true;
  };

  const clearActiveCampaign = () => {
    setActiveCampaign(null);
  };

  const createCampaign = (
    newCamp: Omit<Campaign, 'id' | 'clicks' | 'conversions' | 'revenueUSD' | 'createdAt' | 'isActive'>
  ) => {
    const campaignItem: Campaign = {
      ...newCamp,
      id: `camp_${Date.now()}`,
      clicks: 0,
      conversions: 0,
      revenueUSD: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
    };
    setCampaigns((prev) => [campaignItem, ...prev]);
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Automated Payouts via Stripe Connect
  const executeStripePayout = (affiliateId: string) => {
    const affiliate = affiliates.find((a) => a.id === affiliateId);
    if (!affiliate || affiliate.clearedCommissionUSD <= 0) return;

    const payoutAmount = affiliate.clearedCommissionUSD;
    const newPayout: Payout = {
      id: `pay_${Date.now()}`,
      affiliateId: affiliate.id,
      affiliateName: affiliate.name,
      amountUSD: payoutAmount,
      currency: 'USD',
      paymentMethod: 'Stripe Connect',
      status: 'paid',
      transactionHash: `tr_strp_${Math.random().toString(36).substring(2, 12)}`,
      initiatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      completedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
    };

    setPayouts((prev) => [newPayout, ...prev]);

    setAffiliates((prev) =>
      prev.map((a) => {
        if (a.id === affiliateId) {
          return {
            ...a,
            clearedCommissionUSD: 0,
            paidCommissionUSD: a.paidCommissionUSD + payoutAmount,
          };
        }
        return a;
      })
    );

    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const executeBatchStripePayouts = (): number => {
    const eligibleAffiliates = affiliates.filter((a) => a.clearedCommissionUSD > 0 && a.stripeConnected);
    if (eligibleAffiliates.length === 0) return 0;

    let totalDisbursed = 0;
    const newPayoutsList: Payout[] = [];

    eligibleAffiliates.forEach((aff) => {
      totalDisbursed += aff.clearedCommissionUSD;
      newPayoutsList.push({
        id: `pay_${Date.now()}_${aff.id}`,
        affiliateId: aff.id,
        affiliateName: aff.name,
        amountUSD: aff.clearedCommissionUSD,
        currency: 'USD',
        paymentMethod: 'Stripe Connect',
        status: 'paid',
        transactionHash: `tr_batch_${Math.random().toString(36).substring(2, 12)}`,
        initiatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        completedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      });
    });

    setPayouts((prev) => [...newPayoutsList, ...prev]);

    setAffiliates((prev) =>
      prev.map((a) => {
        const matching = eligibleAffiliates.find((ea) => ea.id === a.id);
        if (matching) {
          return {
            ...a,
            clearedCommissionUSD: 0,
            paidCommissionUSD: a.paidCommissionUSD + matching.clearedCommissionUSD,
          };
        }
        return a;
      })
    );

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });

    return totalDisbursed;
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: { name: string; hex: string }, qty: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Place Order with Attribution
  const placeOrder = (customer: { name: string; email: string; address: string }): Order => {
    const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
    const discountUSD = 0;
    const totalUSD = subtotalUSD;
    const currencyTotal = totalUSD * activeCurrency.rate;

    const generatedTracking = `ETL-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: `ord_${Date.now().toString().slice(-6)}`,
      items: [...cart],
      subtotalUSD,
      discountUSD,
      totalUSD,
      currency: activeCurrency.code,
      currencyTotal,
      customerEmail: customer.email,
      customerName: customer.name,
      shippingAddress: customer.address,
      campaignSlug: activeCampaign?.slug,
      affiliateId: activeCampaign?.affiliateId,
      status: 'confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      trackingNumber: generatedTracking,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Attribution update for campaign
    if (activeCampaign) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === activeCampaign.id
            ? {
                ...c,
                conversions: c.conversions + 1,
                revenueUSD: c.revenueUSD + totalUSD,
              }
            : c
        )
      );

      // Attribution update for affiliate
      if (activeCampaign.affiliateId) {
        const affiliate = affiliates.find((a) => a.id === activeCampaign.affiliateId);
        if (affiliate) {
          const commissionEarned = totalUSD * affiliate.commissionRate;
          setAffiliates((prev) =>
            prev.map((a) =>
              a.id === affiliate.id
                ? {
                    ...a,
                    totalSales: a.totalSales + 1,
                    totalRevenueUSD: a.totalRevenueUSD + totalUSD,
                    // By default, new order commission enters 14-day clearance hold
                    pendingCommissionUSD: a.pendingCommissionUSD + commissionEarned,
                  }
                : a
            )
          );
        }
      }
    }

    clearCart();

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
    });

    return newOrder;
  };

  // Simulated Order Tracking Lookup
  const lookupTracking = (rawNum: string): TrackingDetails | null => {
    const trackingNum = rawNum.trim().toUpperCase();
    if (!trackingNum) return null;

    const matchedOrder = orders.find(
      (o) =>
        o.id.toUpperCase() === trackingNum ||
        (o.trackingNumber && o.trackingNumber.toUpperCase() === trackingNum)
    );

    const targetNum = matchedOrder?.trackingNumber || trackingNum;
    const itemsLabel = matchedOrder
      ? matchedOrder.items.map((i) => `${i.quantity}x ${i.product.title} (${i.selectedSize})`).join(', ')
      : '1x The Architectural Sculpted Slingback Pump (EU 38), 1x The Monolithic Box Calfskin Tote';
    const destLabel = matchedOrder?.shippingAddress || 'Montreal, QC, Canada';

    const milestones: ShipmentMilestone[] = [
      {
        stage: 'ordered',
        title: 'Order Confirmed & Allocation Reserved',
        location: 'Atelier Étoile HQ • Florence, Italy',
        date: 'Sept 01, 2026 — 09:15 CET',
        completed: true,
        current: false,
        notes: 'Encrypted Stripe Connect authorization completed. Inventory reserved.',
      },
      {
        stage: 'verified',
        title: 'Artisanal Inspection & Signature Packaging',
        location: 'Atelier Facility • Mumbai, India',
        date: 'Sept 02, 2026 — 14:30 IST',
        completed: true,
        current: false,
        notes: 'Handcrafted vegan finish inspected, dustbags assigned, authenticity verified.',
      },
      {
        stage: 'dispatched',
        title: 'Handed to Carrier • Air Express Flight Departed',
        location: 'Mumbai International Cargo Hub (BOM)',
        date: 'Sept 03, 2026 — 21:40 IST',
        completed: true,
        current: false,
        notes: 'Flight Departed for Transatlantic International Gateway.',
      },
      {
        stage: 'in_transit',
        title: 'Customs Clearance Completed & Transit Hub',
        location: 'North American Sort Facility • JFK',
        date: 'Sept 04, 2026 — 06:12 EDT',
        completed: true,
        current: true,
        notes: 'Import duties prepaid & cleared. Processed through international hub.',
      },
      {
        stage: 'out_for_delivery',
        title: 'Out for Delivery via Express Courier Van',
        location: 'Local Metropolitan Distribution Hub',
        date: 'Expected Today by 17:30',
        completed: false,
        current: false,
        notes: 'Courier with signature delivery protocol.',
      },
      {
        stage: 'delivered',
        title: 'Doorstep Delivery',
        location: destLabel,
        date: 'Estimated Sept 05, 2026',
        completed: false,
        current: false,
        notes: 'Signature required upon receipt.',
      },
    ];

    const details: TrackingDetails = {
      trackingNumber: targetNum,
      carrier: 'DHL Express Worldwide & Priority Air',
      status: 'In Transit',
      estimatedDelivery: 'Sept 05, 2026 (Before 17:30)',
      origin: 'Florence / Scandicci (Italy)',
      destination: destLabel,
      weight: '2.40 kg / 5.3 lbs',
      milestones,
      itemsSummary: itemsLabel,
    };

    setActiveTrackingDetails(details);
    setIsTrackingModalOpen(true);
    return details;
  };

  // CSV Catalog Management
  const exportCatalogCSV = (): string => {
    const headers = ['id', 'title', 'category', 'price_inr', 'price_usd', 'original_price_usd', 'sizes', 'materials', 'description'];
    const rows = products.map((p) => [
      `"${p.id}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.priceINR || p.priceUSD * 50,
      p.priceUSD,
      p.originalPriceUSD || '',
      `"${p.sizes ? p.sizes.join(';') : ''}"`,
      `"${p.materials ? p.materials.replace(/"/g, '""') : ''}"`,
      `"${p.description ? p.description.replace(/"/g, '""') : ''}"`,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  };

  const importProductsFromCSV = (csvString: string): { success: boolean; count: number; error?: string } => {
    try {
      const lines = csvString.trim().split(/\r?\n/);
      if (lines.length < 2) {
        return { success: false, count: 0, error: 'CSV must contain a header row and at least one product row.' };
      }

      const parseCSVLine = (text: string) => {
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

      const cleanHeaders = parseCSVLine(lines[0]).map((h) => h.toLowerCase().replace(/[\s_-]/g, ''));
      const idIdx = cleanHeaders.findIndex((h) => h === 'id' || h === 'productid' || h === 'sku');
      const titleIdx = cleanHeaders.findIndex((h) => h === 'title' || h === 'name' || h === 'productname');
      const inrIdx = cleanHeaders.findIndex((h) => h === 'priceinr' || h === 'inr' || h === 'inrprice');
      const usdIdx = cleanHeaders.findIndex((h) => h === 'priceusd' || h === 'usd' || h === 'price' || h === 'usdprice');
      const catIdx = cleanHeaders.findIndex((h) => h === 'category' || h === 'type');
      const origPriceIdx = cleanHeaders.findIndex((h) => h === 'originalpriceusd' || h === 'originalprice' || h === 'compareatprice' || h === 'compareprice');
      const subtitleIdx = cleanHeaders.findIndex((h) => h === 'subtitle');
      const materialsIdx = cleanHeaders.findIndex((h) => h === 'materials');
      const sizesIdx = cleanHeaders.findIndex((h) => h === 'sizes');
      const descIdx = cleanHeaders.findIndex((h) => h === 'description');

      if (titleIdx === -1 && idIdx === -1) {
        return { success: false, count: 0, error: 'CSV must contain at least an "id" or "title" column.' };
      }
      if (inrIdx === -1 && usdIdx === -1) {
        return { success: false, count: 0, error: 'CSV must contain "price_inr" or "price_usd" (or "price") column.' };
      }

      const updatedCatalog = [...products];
      let importedCount = 0;

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const cols = parseCSVLine(lines[i]);
        const rowId = idIdx !== -1 ? cols[idIdx] : '';
        const rowTitle = titleIdx !== -1 ? cols[titleIdx] : '';

        if (!rowId && !rowTitle) continue;

        let priceUSD = 80;
        let priceINR = 4000;

        if (inrIdx !== -1 && cols[inrIdx]) {
          const parsedINR = parseFloat(cols[inrIdx].replace(/[^0-9.]/g, ''));
          if (!isNaN(parsedINR) && parsedINR > 0) {
            priceINR = parsedINR;
            // Formula from user: 3000 INR = 60 USD, 5000 INR = 100 USD, 4500 INR = 90 USD (INR / 50)
            priceUSD = Math.round(parsedINR / 50);
          }
        } else if (usdIdx !== -1 && cols[usdIdx]) {
          const parsedUSD = parseFloat(cols[usdIdx].replace(/[^0-9.]/g, ''));
          if (!isNaN(parsedUSD) && parsedUSD > 0) {
            priceUSD = Math.round(parsedUSD);
            priceINR = Math.round(priceUSD * 50);
          }
        }

        let originalPriceUSD: number | undefined = undefined;
        if (origPriceIdx !== -1 && cols[origPriceIdx]) {
          const orig = parseFloat(cols[origPriceIdx].replace(/[^0-9.]/g, ''));
          if (!isNaN(orig) && orig > 0) {
            originalPriceUSD = orig > 1000 ? Math.round(orig / 50) : Math.round(orig);
          }
        }

        const category = catIdx !== -1 && cols[catIdx] ? cols[catIdx] : 'Heels';
        const finalId = rowId || `stoffa_custom_${Date.now()}_${i}`;
        const finalTitle = rowTitle || `Accesoire Luxury Footwear ${i}`;
        const subtitle = subtitleIdx !== -1 && cols[subtitleIdx] ? cols[subtitleIdx] : `${category} handcrafted in artisanal ateliers`;
        const materials = materialsIdx !== -1 && cols[materialsIdx] ? cols[materialsIdx] : 'Artisanal leather & cushioned memory footbed';
        const sizes = sizesIdx !== -1 && cols[sizesIdx]
          ? cols[sizesIdx].split(';').map((s) => s.trim()).filter(Boolean)
          : ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'];
        const description = descIdx !== -1 && cols[descIdx] ? cols[descIdx] : `${finalTitle}. Handcrafted with precision and timeless elegance.`;

        // Check if existing product by ID or title
        const existingIdx = updatedCatalog.findIndex(
          (p) => (rowId && p.id === rowId) || (rowTitle && p.title.toLowerCase() === rowTitle.toLowerCase())
        );

        if (existingIdx !== -1) {
          updatedCatalog[existingIdx] = {
            ...updatedCatalog[existingIdx],
            title: finalTitle,
            priceUSD,
            priceINR,
            ...(originalPriceUSD ? { originalPriceUSD } : {}),
            ...(cols[catIdx] ? { category } : {}),
            ...(cols[materialsIdx] ? { materials } : {}),
            ...(cols[descIdx] ? { description } : {}),
            ...(cols[sizesIdx] ? { sizes } : {}),
          };
          importedCount++;
        } else {
          const angles = getProductAngles(finalId, category, []);
          const newProd: Product = {
            id: finalId,
            title: finalTitle,
            subtitle,
            category,
            occasions: ['all', 'cocktail', 'date_night'],
            occasionNote: 'Versatile day-to-evening styling',
            priceUSD,
            priceINR,
            originalPriceUSD,
            images: angles.map((a) => a.url),
            angles,
            sizes,
            colors: [
              { name: 'Nero Black', hex: '#1C1B1B' },
              { name: 'Gold Specchio', hex: '#D4AF37' },
            ],
            inventory: { 'EU 36': 4, 'EU 37': 5, 'EU 38': 6, 'EU 39': 3, 'EU 40': 2, 'EU 41': 1 },
            description,
            materials,
            rating: 4.9,
            reviewCount: 18,
            isNewArrival: true,
          };
          updatedCatalog.push(newProd);
          importedCount++;
        }
      }

      if (importedCount === 0) {
        return { success: false, count: 0, error: 'No valid products could be parsed from the CSV.' };
      }

      saveProducts(updatedCatalog);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      return { success: true, count: importedCount };
    } catch (err: any) {
      return { success: false, count: 0, error: err?.message || 'Error parsing CSV file.' };
    }
  };

  const exportSectionCSVHandler = (section: SectionType): string => {
    return exportSectionCSV(products, section);
  };

  const importSectionCSVHandler = (csvString: string, section: SectionType): { success: boolean; count: number; error?: string } => {
    try {
      const parsed = parseSectionCSV(csvString, section);
      if (parsed.error || parsed.products.length === 0) {
        return { success: false, count: 0, error: parsed.error || 'No valid products could be parsed for this section.' };
      }

      const updatedCatalog = [...products];
      let importedCount = 0;

      parsed.products.forEach((importedProduct) => {
        const existingIdx = updatedCatalog.findIndex(
          (p) => p.id === importedProduct.id || p.title.toLowerCase() === importedProduct.title.toLowerCase()
        );
        if (existingIdx !== -1) {
          updatedCatalog[existingIdx] = {
            ...updatedCatalog[existingIdx],
            ...importedProduct,
          };
        } else {
          updatedCatalog.unshift(importedProduct);
        }
        importedCount++;
      });

      saveProducts(updatedCatalog);
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
      });
      return { success: true, count: importedCount };
    } catch (err: any) {
      return { success: false, count: 0, error: err.message || 'Error processing section CSV.' };
    }
  };

  const runAiCollectionCategorizer = (): { updatedCount: number; message: string } => {
    const updated = runInitialCollectionDetermination(products);
    saveProducts(updated);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 },
    });
    return {
      updatedCount: updated.length,
      message: `General Logic & AI Determinator successfully classified all ${updated.length} products across Shoes, Bags, Ready to Ship, and Sale sections!`,
    };
  };

  const importStoffaCatalog = (): { success: boolean; count: number } => {
    saveProducts(STOFFA_STORE_PRODUCTS);
    localStorage.setItem('etoile_catalog_source', 'stoffa_v3');
    setStorytellingText(STOFFA_BRAND_STORY);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
    return { success: true, count: STOFFA_STORE_PRODUCTS.length };
  };

  const updateProductPrice = (productId: string, newPriceUSD: number): { success: boolean; error?: string } => {
    if (isNaN(newPriceUSD) || newPriceUSD <= 0) {
      return { success: false, error: 'Price must be a valid positive number.' };
    }
    const updated = products.map((p) => (p.id === productId ? { ...p, priceUSD: Math.round(newPriceUSD * 100) / 100 } : p));
    saveProducts(updated);
    return { success: true };
  };

  const updateProductDetails = (updatedProduct: Product): { success: boolean; message: string } => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    saveProducts(updated);
    if (selectedProductModal?.id === updatedProduct.id) {
      setSelectedProductModal(updatedProduct);
    }
    return { success: true, message: `Product "${updatedProduct.title}" updated successfully and saved.` };
  };

  // Language Change
  const requestLanguageChange = (code: string) => {
    setLanguage(code);
  };

  const confirmLanguageChange = () => {
    if (pendingLanguage) {
      if (!pendingLanguage.isEnabled) {
        setLanguages((prev) => prev.map((l) => (l.code === pendingLanguage.code ? { ...l, isEnabled: true } : l)));
      }
      setLanguage(pendingLanguage.code);
      setPendingLanguage(null);
    }
  };

  const cancelLanguageChange = () => {
    setPendingLanguage(null);
  };

  // Social Share
  const shareProduct = async (product: Product, platform?: string): Promise<{ success: boolean; message: string }> => {
    const shareUrl = `${window.location.origin}/?product=${product.id}`;
    const shareText = `Explore ${product.title} at Atelier Étoile: ${product.subtitle}`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
      return { success: true, message: 'Opening X / Twitter...' };
    } else if (platform === 'pinterest') {
      window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(product.images[0])}&description=${encodeURIComponent(shareText)}`, '_blank');
      return { success: true, message: 'Opening Pinterest...' };
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
      return { success: true, message: 'Opening WhatsApp...' };
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        return { success: true, message: 'Shareable product link copied to clipboard!' };
      }
    } catch {
      // ignore
    }
    return { success: true, message: `Share link: ${shareUrl}` };
  };

  return (
    <CommerceContext.Provider
      value={{
        products,
        selectedCategory,
        setSelectedCategory,
        selectedOccasion,
        setSelectedOccasion,
        clearFilters,
        selectedProductModal,
        setSelectedProductModal,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        selectedSizeFilter,
        setSelectedSizeFilter,
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isComparisonOpen,
        setIsComparisonOpen,
        storytellingText,
        setStorytellingText,
        resetStorytellingText,
        b2bList,
        addToB2BList,
        removeFromB2BList,
        clearB2BList,
        isB2BModalOpen,
        setIsB2BModalOpen,
        b2bTargetProduct,
        setB2BTargetProduct,
        lookupTracking,
        activeTrackingDetails,
        setActiveTrackingDetails,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        exportCatalogCSV,
        importProductsFromCSV,
        exportSectionCSV: exportSectionCSVHandler,
        importSectionCSV: importSectionCSVHandler,
        runAiCollectionCategorizer,
        importStoffaCatalog,
        updateProductPrice,
        updateProductDetails,
        isCatalogManagerOpen,
        setIsCatalogManagerOpen,
        isMediaGalleryOpen,
        setIsMediaGalleryOpen,
        isPairingCuratorOpen,
        setIsPairingCuratorOpen,
        isHeroCsvModalOpen,
        setIsHeroCsvModalOpen,
        heroSlides,
        refreshHeroSlides,
        isPageHeroManagerOpen,
        setIsPageHeroManagerOpen,
        pageHeroActiveTarget,
        openPageHeroManager,
        pendingLanguage,
        requestLanguageChange,
        confirmLanguageChange,
        cancelLanguageChange,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isCurrencyModalOpen,
        setIsCurrencyModalOpen,
        isTranslationMdModalOpen,
        setIsTranslationMdModalOpen,
        updateTranslationText,
        downloadTranslationsMdFile,
        reloadTranslationsFromMd,
        getRawTranslationsMd,
        applyNewTranslationsMd,
        scanWebsiteCoverage,
        addMissingStringsToMd,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        quotaAlert,
        triggerQuotaAlert,
        dismissQuotaAlert,
        shareProduct,
        currencies,
        activeCurrency,
        setCurrency,
        toggleCurrency,
        updateCurrencyRate,
        addCurrencyPreset,
        formatPrice,
        languages,
        activeLanguage,
        setLanguage,
        toggleLanguage,
        addLanguagePreset,
        t,
        campaigns,
        activeCampaign,
        activateCampaignBySlug,
        clearActiveCampaign,
        createCampaign,
        toggleCampaignStatus,
        affiliates,
        payouts,
        activeAffiliateId,
        setActiveAffiliateId,
        executeStripePayout,
        executeBatchStripePayouts,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        placeOrder,
        viewMode,
        setViewMode,
        adminTab,
        setAdminTab,
        adminUser,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
