export interface AnnouncementBannerConfig {
  enabled: boolean;
  text: string;
  secondaryText?: string;
  linkText?: string;
  linkUrl?: string;
  theme: 'onyx_gold' | 'champagne' | 'emerald' | 'burgundy';
}

export interface ValuePropCard {
  id: string;
  title: string;
  description: string;
  icon: 'RotateCcw' | 'Headphones' | 'Gift' | 'CreditCard' | 'Truck' | 'Shield' | 'Sparkles' | 'Clock';
}

export interface FooterContentConfig {
  brandName: string;
  brandStory: string;
  brandTagline: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  contactHours: string;
  conciergeNotice: string;
  valueProps: ValuePropCard[];
  socialLinks: {
    instagram: string;
    facebook: string;
    pinterest: string;
    whatsapp: string;
    twitter: string;
    youtube: string;
  };
  copyrightText: string;
}

export interface PageCategoryCard {
  title: string;
  subtitle: string;
  imageUrl?: string;
  categoryTarget?: string;
}

export interface PageContentConfig {
  homepage: {
    heroBadgeDefault: string;
    heroHeadlineDefault: string;
    heroSubtitleDefault: string;
    newArrivalsTitle: string;
    newArrivalsSubtitle: string;
    categoryCards: {
      shoes: PageCategoryCard;
      bags: PageCategoryCard;
      sale: PageCategoryCard;
      ready: PageCategoryCard;
    };
  };
  aboutSection: {
    title: string;
    story: string;
    heritageText: string;
  };
}

export interface StoreCmsData {
  version: number;
  lastUpdated: string;
  announcement: AnnouncementBannerConfig;
  footer: FooterContentConfig;
  pages: PageContentConfig;
}

export type CmsEditorTarget =
  | { type: 'announcement' }
  | { type: 'footer_contact' }
  | { type: 'footer_story' }
  | { type: 'footer_value_props' }
  | { type: 'footer_social' }
  | { type: 'hero_text' }
  | { type: 'category_cards' }
  | { type: 'new_arrivals' }
  | { type: 'page_overview' };
