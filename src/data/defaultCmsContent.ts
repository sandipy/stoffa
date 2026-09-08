import { StoreCmsData } from '../types/cms';

export const DEFAULT_CMS_DATA: StoreCmsData = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  announcement: {
    enabled: false,
    text: 'Complimentary Express Courier Worldwide on Orders Over $200 USD | Complimentary 30-Day Returns',
    secondaryText: 'VIP Bridal Trunk Show Bookings Now Open',
    linkText: 'Explore Collection',
    linkUrl: '#/collections',
    theme: 'onyx_gold',
  },
  footer: {
    brandName: 'accesoire',
    brandStory:
      "Women's luxury footwear & artisanal bags handcrafted in master workshops. Signature Kolhapuri wedges, architectural block heels, authentic flats, and bridal couture exclusively priced in USD.",
    brandTagline: 'Designed for All-Day Comfort • Dual-Density Memory Foam',
    contactEmail: 'concierge@accesoire.com',
    contactPhone: '+1 (212) 555-8290',
    contactAddress: 'Madison Avenue Atelier, New York, NY 10022',
    contactHours: 'Mon – Sat: 10:00 AM – 7:00 PM EST',
    conciergeNotice: 'Personal styling & bridal fitting consultations available worldwide via WhatsApp or private appointment.',
    valueProps: [
      {
        id: 'prop-1',
        title: 'Exchanges & Returns',
        description: 'Complimentary 30-day pre-paid return shipping worldwide',
        icon: 'RotateCcw',
      },
      {
        id: 'prop-2',
        title: 'Customer Care',
        description: 'Personal styling & sizing concierge available 7 days a week',
        icon: 'Headphones',
      },
      {
        id: 'prop-3',
        title: 'Artisanal Quality',
        description: 'Dual-density memory foam footbed with custom hand embroidery',
        icon: 'Gift',
      },
      {
        id: 'prop-4',
        title: 'Instant Gift Cards',
        description: 'Delivered digitally with personalized messages for bridal & gifts',
        icon: 'CreditCard',
      },
    ],
    socialLinks: {
      instagram: 'https://instagram.com/accesoire',
      facebook: 'https://facebook.com/accesoire',
      pinterest: 'https://pinterest.com/accesoire',
      whatsapp: 'https://wa.me/12125558290',
      twitter: 'https://twitter.com/accesoire',
      youtube: 'https://youtube.com/@accesoire',
    },
    copyrightText: '© 2026 Accesoire Luxury Footwear & Bags. All Rights Reserved.',
  },
  pages: {
    homepage: {
      heroBadgeDefault: 'ROYAL HERITAGE COUTURE',
      heroHeadlineDefault: 'Courtyard Splendor & Handcrafted Wedges',
      heroSubtitleDefault: 'Master-crafted Kolhapuri high wedges paired with antique zardozi clutch bags.',
      newArrivalsTitle: 'Just In',
      newArrivalsSubtitle: 'Handpicked seasonal creations fresh from our artisanal workshops',
      categoryCards: {
        shoes: {
          title: 'Shoes',
          subtitle: 'Architectural Wedges & Hand-Braided Straps',
        },
        bags: {
          title: 'Bags',
          subtitle: 'Hand-Embroidered Antique Zardozi Potlis',
        },
        sale: {
          title: 'Sale',
          subtitle: 'Curated Heritage & Rare Archive Editions',
        },
        ready: {
          title: 'Ready to Ship',
          subtitle: 'Express 48-Hour Dispatch Worldwide',
        },
      },
    },
    aboutSection: {
      title: 'Our Atelier & Heritage',
      story: 'Every pair of Accesoire footwear is individually crafted over 40 meticulous hours by second-generation master artisans using rich vegan leather, metallic gotas, and memory-foam soles.',
      heritageText: 'Crafted without compromise for modern royalty.',
    },
  },
};

const STORAGE_KEY = 'accesoire_store_cms_v2';
const ANNOUNCEMENT_BACKUP_KEY = 'accesoire_announcement_banner_v2';

let inMemoryCmsData: StoreCmsData | null = null;

export function loadCmsContent(): StoreCmsData {
  if (inMemoryCmsData) {
    return inMemoryCmsData;
  }

  try {
    let announcementBackup: any = null;
    try {
      const b = localStorage.getItem(ANNOUNCEMENT_BACKUP_KEY);
      if (b) announcementBackup = JSON.parse(b);
    } catch {}

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = {
        ...DEFAULT_CMS_DATA,
        announcement: announcementBackup
          ? { ...DEFAULT_CMS_DATA.announcement, ...announcementBackup }
          : DEFAULT_CMS_DATA.announcement,
      };
      if (initial.announcement?.text) {
        initial.announcement.text = initial.announcement.text.replace(/✦/g, '').trim();
      }
      if (initial.footer?.brandTagline) {
        initial.footer.brandTagline = initial.footer.brandTagline.replace(/✦/g, '').trim();
      }
      inMemoryCmsData = initial;
      return initial;
    }

    const parsed = JSON.parse(raw);
    const loaded: StoreCmsData = {
      ...DEFAULT_CMS_DATA,
      ...parsed,
      announcement: {
        ...DEFAULT_CMS_DATA.announcement,
        ...parsed.announcement,
        ...(announcementBackup || {}),
      },
      footer: { ...DEFAULT_CMS_DATA.footer, ...parsed.footer },
      pages: {
        ...DEFAULT_CMS_DATA.pages,
        ...parsed.pages,
        homepage: {
          ...DEFAULT_CMS_DATA.pages.homepage,
          ...parsed.pages?.homepage,
          categoryCards: {
            ...DEFAULT_CMS_DATA.pages.homepage.categoryCards,
            ...parsed.pages?.homepage?.categoryCards,
          },
        },
      },
    };
    if (loaded.announcement?.text) {
      loaded.announcement.text = loaded.announcement.text.replace(/✦/g, '').trim();
    }
    if (loaded.footer?.brandTagline) {
      loaded.footer.brandTagline = loaded.footer.brandTagline.replace(/✦/g, '').trim();
    }
    inMemoryCmsData = loaded;
    return loaded;
  } catch (err) {
    console.error('Failed to load CMS content from localStorage', err);
    inMemoryCmsData = DEFAULT_CMS_DATA;
    return DEFAULT_CMS_DATA;
  }
}

export function saveCmsContent(data: StoreCmsData): void {
  try {
    data.lastUpdated = new Date().toISOString();
    inMemoryCmsData = { ...data };
    
    // Save primary object
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Save standalone announcement backup for 100% fail-safe persistence
    if (data.announcement) {
      localStorage.setItem(ANNOUNCEMENT_BACKUP_KEY, JSON.stringify(data.announcement));
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cms_storage_updated', { detail: data }));
    }
  } catch (err) {
    console.error('Failed to save CMS content to localStorage', err);
    // Even if localStorage is blocked in sandboxed iframe, inMemoryCmsData stays alive
    inMemoryCmsData = { ...data };
  }
}

export function resetCmsContent(): StoreCmsData {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ANNOUNCEMENT_BACKUP_KEY);
    inMemoryCmsData = null;
  } catch (err) {
    console.error('Failed to clear CMS localStorage', err);
  }
  return DEFAULT_CMS_DATA;
}
