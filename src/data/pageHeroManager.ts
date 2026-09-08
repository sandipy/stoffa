// 5 Prom Night Couple Hero Images (16-18 yr old girl with boy, Stoffa footwear & bags)
import promCoupleBallroom from '../assets/images/prom_couple_ballroom_1788812966604.jpg';
import promCoupleTerrace from '../assets/images/prom_couple_terrace_1788812980283.jpg';
import promCoupleArrival from '../assets/images/prom_couple_arrival_1788812994506.jpg';
import promCoupleGarden from '../assets/images/prom_couple_garden_1788813008156.jpg';
import promCoupleRooftop from '../assets/images/prom_couple_rooftop_1788813022394.jpg';

// 5 Date Night Couple Hero Images (woman with man, Stoffa footwear & bags)
import dateCoupleSkyline from '../assets/images/date_couple_skyline_1788813036430.jpg';
import dateCoupleSpeakeasy from '../assets/images/date_couple_speakeasy_1788813049777.jpg';
import dateCoupleCourtyard from '../assets/images/date_couple_courtyard_1788813064902.jpg';
import dateCoupleMarina from '../assets/images/date_couple_marina_1788813078148.jpg';
import dateCoupleFireside from '../assets/images/date_couple_fireside_1788813088632.jpg';

import dateNightHero1 from '../assets/images/date_night_hero_rooftop_1788811718811.jpg';
import dateNightHero2 from '../assets/images/date_night_hero_courtyard_1788811733222.jpg';
import dateNightHero3 from '../assets/images/date_night_hero_lounge_1788811744620.jpg';
import dateNightImg from '../assets/images/date_night_shoes_1788809134071.jpg';

import promNightHero1 from '../assets/images/prom_night_hero_ballroom_1788811758186.jpg';
import promNightHero2 from '../assets/images/prom_night_hero_terrace_1788811776825.jpg';
import promNightHero3 from '../assets/images/prom_night_hero_afterparty_1788811789088.jpg';
import promNightImg from '../assets/images/prom_night_shoes_1788809121283.jpg';

import xmasBrunchImg from '../assets/images/xmas_brunch_shoes_1788809150575.jpg';
import quinceaneraGlamImg from '../assets/images/quinceanera_glam_shoes_1788809164257.jpg';
import brideComfortImg from '../assets/images/bridal_comfort_shoes_1788809179498.jpg';
import motherBrideImg from '../assets/images/mother_bride_shoes_1788809193587.jpg';
import sangeetDanceImg from '../assets/images/sangeet_dance_shoes_1788809206438.jpg';
import girlsNightImg from '../assets/images/girls_night_shoes_1788809220118.jpg';
import yachtCruiseImg from '../assets/images/yacht_cruise_shoes_1788809233863.jpg';
import bridesmaidPartyImg from '../assets/images/bridesmaid_party_shoes_1788809247373.jpg';

import amalfiCocktailImg from '../assets/images/amalfi_cocktail_shoes_1788805105346.jpg';
import blacktieGalaImg from '../assets/images/blacktie_gala_shoes_1788805120787.jpg';
import gardenSoireeImg from '../assets/images/garden_soiree_shoes_1788805133979.jpg';
import winterHolidayImg from '../assets/images/winter_holiday_shoes_1788805148512.jpg';
import royalBridalImg from '../assets/images/royal_bridal_shoes_1788805176731.jpg';

import heroJustInImg from '../assets/images/hero_just_in_stoffa_1788641110283.jpg';
import modelShoesImg from '../assets/images/shoes_hero_model_1788745307294.jpg';
import modelBagsImg from '../assets/images/bags_hero_model_1788745321490.jpg';
import modelSaleImg from '../assets/images/stoffa_sale_model_1788639332319.jpg';
import modelReadyImg from '../assets/images/stoffa_ready_model_1788641087680.jpg';
import heroBridalImg from '../assets/images/hero_bridal_stoffa_1788641121017.jpg';

export interface PageHeroPreset {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface PageHeroDefinition {
  key: string;
  name: string;
  group: 'General' | 'Departments' | 'Heel Heights' | 'Occasions & Events';
  categoryMatchKeys: string[];
  defaultTitle: string;
  defaultSubtitle: string;
  defaultBadge: string;
  defaultImageUrl: string;
  presets?: PageHeroPreset[];
}

export interface CustomPageHero {
  imageUrl: string;
  customTitle?: string;
  customSubtitle?: string;
  customBadge?: string;
  updatedAt: string;
}

export const ALL_STORE_PAGES: PageHeroDefinition[] = [
  // 1. General & Core Pages
  {
    key: 'home',
    name: 'Homepage (Carousel / Pinned Banner)',
    group: 'General',
    categoryMatchKeys: ['home', 'all'],
    defaultTitle: 'Stöffa Atelier',
    defaultSubtitle: 'Handcrafted Architectural Wedges & Artisanal Bags',
    defaultBadge: 'FLAGSHIP ATELIER',
    defaultImageUrl: heroJustInImg,
  },
  {
    key: 'collections',
    name: 'The Collections Directory',
    group: 'General',
    categoryMatchKeys: ['collections', 'the collections', 'all-collections'],
    defaultTitle: 'The Curated Collections',
    defaultSubtitle: 'From the aisle to the after-party, discover luxury footwear for every moment',
    defaultBadge: 'CURATED LIFESTYLE',
    defaultImageUrl: amalfiCocktailImg,
  },

  // 2. Core Departments
  {
    key: 'just-in',
    name: 'Just In / New Arrivals',
    group: 'Departments',
    categoryMatchKeys: ['just in', 'new arrivals', 'latest'],
    defaultTitle: 'Just In',
    defaultSubtitle: 'The Spring-Summer Edit',
    defaultBadge: 'NEW ARRIVALS',
    defaultImageUrl: heroJustInImg,
  },
  {
    key: 'shoes',
    name: 'Shoes (All Footwear)',
    group: 'Departments',
    categoryMatchKeys: ['shoes', 'all shoes', 'footwear'],
    defaultTitle: 'Handcrafted Footwear',
    defaultSubtitle: 'Handcrafted Wedges & Flats with Dual-Density Memory Foam',
    defaultBadge: 'SIGNATURE FOOTWEAR',
    defaultImageUrl: modelShoesImg,
  },
  {
    key: 'bags',
    name: 'Bags & Potlis',
    group: 'Departments',
    categoryMatchKeys: ['bags', 'handbags', 'potlis', 'clutches'],
    defaultTitle: 'Handcrafted Bags & Potlis',
    defaultSubtitle: 'Intricate Zardozi & Hand-Embroidered Evening Pouches',
    defaultBadge: 'ARTISANAL BAGS',
    defaultImageUrl: modelBagsImg,
  },
  {
    key: 'sale',
    name: 'Archive & Sale',
    group: 'Departments',
    categoryMatchKeys: ['sale', 'archive', 'discount'],
    defaultTitle: 'Archive & Private Sale',
    defaultSubtitle: 'Limited-Production Handcrafted Icons at Exclusive Value',
    defaultBadge: 'EXCLUSIVE ARCHIVE',
    defaultImageUrl: modelSaleImg,
  },
  {
    key: 'ready-to-ship',
    name: 'Ready to Ship',
    group: 'Departments',
    categoryMatchKeys: ['ready to ship', 'express', 'ready'],
    defaultTitle: 'Ready to Ship',
    defaultSubtitle: 'Express Dispatch Directly from Mumbai Workshop',
    defaultBadge: 'EXPRESS DISPATCH',
    defaultImageUrl: modelReadyImg,
  },

  // 3. Heel Heights & Footwear Types
  {
    key: 'low-wedges',
    name: 'Low Wedges - 2.5"',
    group: 'Heel Heights',
    categoryMatchKeys: ['low wedges', 'low wedges - 2.5"', 'low wedge', '2.5'],
    defaultTitle: 'Low Wedges - 2.5"',
    defaultSubtitle: 'Effortless All-Day Elevation & Garden Stability',
    defaultBadge: 'COMFORT ELEVATION',
    defaultImageUrl: gardenSoireeImg,
  },
  {
    key: 'high-wedges',
    name: 'High Wedges - 3.5"',
    group: 'Heel Heights',
    categoryMatchKeys: ['high wedges', 'high wedges - 3.5"', 'high wedge', '3.5'],
    defaultTitle: 'High Wedges - 3.5"',
    defaultSubtitle: 'Architectural Stature & Drama with Zero Foot Fatigue',
    defaultBadge: 'ARCHITECTURAL HEIGHT',
    defaultImageUrl: amalfiCocktailImg,
  },
  {
    key: 'higher-wedges',
    name: 'Higher Wedge - 4.25"',
    group: 'Heel Heights',
    categoryMatchKeys: ['higher wedge', 'higher wedge - 4.25"', 'higher wedges', '4.25', '4.5'],
    defaultTitle: 'Higher Wedge - 4.25"',
    defaultSubtitle: 'Supreme Gala Elevation & Red Carpet Poise',
    defaultBadge: 'GALA ELEVATION',
    defaultImageUrl: blacktieGalaImg,
  },
  {
    key: 'block-heels',
    name: 'Block Heels',
    group: 'Heel Heights',
    categoryMatchKeys: ['block heels', 'block heel', 'block'],
    defaultTitle: 'Block Heels',
    defaultSubtitle: 'Structured Luxury, Lawn Stability & All-Day Balance',
    defaultBadge: 'STRUCTURED COMFORT',
    defaultImageUrl: dateNightHero2,
  },
  {
    key: 'flats',
    name: 'Flats & Loafers',
    group: 'Heel Heights',
    categoryMatchKeys: ['flats & loafers', 'flats', 'loafers', 'kolhapuri flats'],
    defaultTitle: 'Flats & Loafers',
    defaultSubtitle: 'Handcrafted Heritage Kolhapuris & Cushioned Slides',
    defaultBadge: 'ARTISANAL FLATS',
    defaultImageUrl: winterHolidayImg,
  },

  // 4. Curated Occasions & Collections (Featuring 5 Prom Night couple options & 5 Date Night couple options)
  {
    key: 'date-night',
    name: 'Date Night',
    group: 'Occasions & Events',
    categoryMatchKeys: ['date night', 'date-night', 'romantic dinner'],
    defaultTitle: 'Date Night',
    defaultSubtitle: 'A little extra glamour, wherever the night takes you — handcrafted for couples in effortless luxury.',
    defaultBadge: 'ROMANTIC EVENING',
    defaultImageUrl: dateCoupleSkyline,
    presets: [
      {
        id: 'date-couple-1',
        name: 'Option 1: Penthouse Rooftop Lounge (16:9 Hero)',
        imageUrl: dateCoupleSkyline,
        description: 'Couple toasting at candlelit skyline terrace; woman in black slip dress with champagne wedges & clutch; man in navy blazer with Stoffa suede loafers.',
      },
      {
        id: 'date-couple-2',
        name: 'Option 2: Intimate Velvet Speakeasy (16:9 Hero)',
        imageUrl: dateCoupleSpeakeasy,
        description: 'Couple in amber velvet speakeasy booth; woman with sculptural wedge mules & embroidered potli bag; man in bespoke blazer with Stoffa calfskin loafers.',
      },
      {
        id: 'date-couple-3',
        name: 'Option 3: Lantern-Lit Bistro Courtyard (16:9 Hero)',
        imageUrl: dateCoupleCourtyard,
        description: 'Romantic cobblestone courtyard; woman in terracotta dress with bronze block heel wedges & woven clutch; man in linen jacket with Stoffa suede loafers.',
      },
      {
        id: 'date-couple-4',
        name: 'Option 4: Sunset Yacht Harbor Pier (16:9 Hero)',
        imageUrl: dateCoupleMarina,
        description: 'Strolling hand-in-hand along yacht marina; woman in champagne gown with gold braided wedges; man in linen blazer with Stoffa nubuck loafers.',
      },
      {
        id: 'date-couple-5',
        name: 'Option 5: Cozy Fireside Villa Lounge (16:9 Hero)',
        imageUrl: dateCoupleFireside,
        description: 'Fireside wine toast; woman in cashmere dress with metallic slip-on wedges & clutch; man in merino knit with Stoffa espresso loafers.',
      },
    ],
  },
  {
    key: 'prom-night',
    name: 'Prom Night',
    group: 'Occasions & Events',
    categoryMatchKeys: ['prom night', 'prom-night', 'prom'],
    defaultTitle: 'Prom Night',
    defaultSubtitle: 'The shoes that make the entrance and keep you dancing all night — paired with matching handcrafted bags.',
    defaultBadge: 'PROM & FORMAL GALA',
    defaultImageUrl: promCoupleBallroom,
    presets: [
      {
        id: 'prom-couple-1',
        name: 'Option 1: Grand Ballroom Chandelier (16:9 Hero)',
        imageUrl: promCoupleBallroom,
        description: '17-year-old girl in emerald satin gown showing Stoffa champagne gold crystal wedges & metallic clutch; prom date boy in black tuxedo & Stoffa suede loafers.',
      },
      {
        id: 'prom-couple-2',
        name: 'Option 2: Golden Hour Estate Terrace (16:9 Hero)',
        imageUrl: promCoupleTerrace,
        description: '18-year-old girl in blush tiered tulle gown with rose-gold Stoffa architectural wedges; prom date boy in navy tuxedo with Stoffa suede loafers.',
      },
      {
        id: 'prom-couple-3',
        name: 'Option 3: Red Carpet Gala Entrance (16:9 Hero)',
        imageUrl: promCoupleArrival,
        description: '17-year-old girl in sapphire sequined gown with pewter crystal wedges & embroidered clutch; prom date boy in ivory dinner jacket with Stoffa leather loafers.',
      },
      {
        id: 'prom-couple-4',
        name: 'Option 4: Fairy-Lit Conservatory (16:9 Hero)',
        imageUrl: promCoupleGarden,
        description: '18-year-old girl in lilac chiffon dress with champagne floral-embroidered wedges & pearl potli; prom date boy in charcoal tuxedo with Stoffa suede loafers.',
      },
      {
        id: 'prom-couple-5',
        name: 'Option 5: Starlit City Skyline (16:9 Hero)',
        imageUrl: promCoupleRooftop,
        description: '17-year-old girl in ruby red satin gown with antique gold wedges & envelope clutch; prom date boy in midnight velvet dinner jacket with Stoffa leather loafers.',
      },
    ],
  },
  {
    key: 'christmas-brunch',
    name: 'Christmas Brunch',
    group: 'Occasions & Events',
    categoryMatchKeys: ['christmas brunch', 'christmas-brunch', 'holiday brunch'],
    defaultTitle: 'Christmas Brunch',
    defaultSubtitle: 'Sparkle in comfort indoors, as hostess or guest.',
    defaultBadge: 'HOLIDAY GALA',
    defaultImageUrl: xmasBrunchImg,
  },
  {
    key: 'quinceanera-glam',
    name: 'Quinceañera Glam',
    group: 'Occasions & Events',
    categoryMatchKeys: ['quinceañera glam', 'quinceanera glam', 'quinceanera'],
    defaultTitle: 'Quinceañera Glam',
    defaultSubtitle: 'For her big moment, with the glamour to match every dance.',
    defaultBadge: 'ROYAL CELEBRATION',
    defaultImageUrl: quinceaneraGlamImg,
  },
  {
    key: 'bride-on-her-feet',
    name: 'Bride on Her Feet',
    group: 'Occasions & Events',
    categoryMatchKeys: ['bride on her feet', 'bride-on-her-feet', 'bridal comfort'],
    defaultTitle: 'Bride on Her Feet',
    defaultSubtitle: 'Made for the long day, the dance floor and everything after — from aisle to after party.',
    defaultBadge: 'BRIDAL COMFORT',
    defaultImageUrl: brideComfortImg,
  },
  {
    key: 'mother-of-the-bride',
    name: 'Mother of the Bride',
    group: 'Occasions & Events',
    categoryMatchKeys: ['mother of the bride', 'mother-of-the-bride'],
    defaultTitle: 'Mother of the Bride',
    defaultSubtitle: 'All the glam, with comfort for the long hours.',
    defaultBadge: 'POISE & COMFORT',
    defaultImageUrl: motherBrideImg,
  },
  {
    key: 'the-bridesmaid-edit',
    name: 'The Bridesmaid Edit',
    group: 'Occasions & Events',
    categoryMatchKeys: ['the bridesmaid edit', 'bridesmaid', 'bridesmaids'],
    defaultTitle: 'The Bridesmaid Edit',
    defaultSubtitle: 'Made to complement the bride, without holding you back from the dance floor.',
    defaultBadge: 'BRIDAL PARTY',
    defaultImageUrl: bridesmaidPartyImg,
  },
  {
    key: 'the-destination-bride',
    name: 'The Destination Bride',
    group: 'Occasions & Events',
    categoryMatchKeys: ['the destination bride', 'destination bride'],
    defaultTitle: 'The Destination Bride',
    defaultSubtitle: 'Glamour that travels — from the ceremony to cocktails by the sea.',
    defaultBadge: 'DESTINATION BRIDAL',
    defaultImageUrl: royalBridalImg,
  },
  {
    key: 'the-sangeet-ceremony',
    name: 'The Sangeet Ceremony',
    group: 'Occasions & Events',
    categoryMatchKeys: ['the sangeet ceremony', 'sangeet', 'sangeet ceremony'],
    defaultTitle: 'The Sangeet Ceremony',
    defaultSubtitle: 'Color and dance a match made in heaven.',
    defaultBadge: 'CELEBRATION DANCE',
    defaultImageUrl: sangeetDanceImg,
  },
  {
    key: 'something-blue',
    name: 'Something Blue',
    group: 'Occasions & Events',
    categoryMatchKeys: ['something blue', 'something-blue'],
    defaultTitle: 'Something Blue',
    defaultSubtitle: 'A little blue, a lot of personality — your something blue, with a twist.',
    defaultBadge: 'BRIDAL TRADITION',
    defaultImageUrl: heroBridalImg,
  },
  {
    key: 'cruise-ready',
    name: 'Cruise Ready',
    group: 'Occasions & Events',
    categoryMatchKeys: ['cruise ready', 'cruise-ready', 'resort cruise'],
    defaultTitle: 'Cruise Ready',
    defaultSubtitle: 'From daytime exploring to sunset cocktails — one wardrobe, every occasion.',
    defaultBadge: 'RIVIERA CRUISE',
    defaultImageUrl: yachtCruiseImg,
  },
  {
    key: 'the-holiday-edit',
    name: 'The Holiday Edit',
    group: 'Occasions & Events',
    categoryMatchKeys: ['the holiday edit', 'holiday edit'],
    defaultTitle: 'The Holiday Edit',
    defaultSubtitle: 'Lightweight in your baggage and versatile glam on your feet.',
    defaultBadge: 'HOLIDAY RESORT',
    defaultImageUrl: winterHolidayImg,
  },
  {
    key: 'garden-party',
    name: 'Garden Party',
    group: 'Occasions & Events',
    categoryMatchKeys: ['garden party', 'garden-party'],
    defaultTitle: 'Garden Party',
    defaultSubtitle: 'Glam on the lawns, height without the stumble.',
    defaultBadge: 'LAWN STABILITY',
    defaultImageUrl: gardenSoireeImg,
  },
  {
    key: 'red-carpet-ready',
    name: 'Red Carpet Ready',
    group: 'Occasions & Events',
    categoryMatchKeys: ['red carpet ready', 'red carpet', 'red-carpet-ready'],
    defaultTitle: 'Red Carpet Ready',
    defaultSubtitle: 'Make the entrance. Own the moment. Stay out late.',
    defaultBadge: 'RED CARPET DRAMA',
    defaultImageUrl: blacktieGalaImg,
  },
  {
    key: 'girls-night-out',
    name: "Girls' Night Out",
    group: 'Occasions & Events',
    categoryMatchKeys: ["girls' night out", "girls night out", "girls-night-out", "girls"],
    defaultTitle: "Girls' Night Out",
    defaultSubtitle: 'Made for the plans that start with “just one drink” and end much later.',
    defaultBadge: 'EVENING COCKTAIL',
    defaultImageUrl: girlsNightImg,
  },
];

const STORAGE_KEY = 'stoffa_custom_page_heroes';

/**
 * Normalizes a category or page identifier to match our standard PageHeroDefinition.
 */
export function normalizePageKey(input: string): string {
  const norm = (input || '').toLowerCase().trim();
  if (!norm || norm === 'home' || norm === 'all') return 'home';
  if (norm === 'collections' || norm === 'the collections' || norm === 'all-collections') return 'collections';

  const found = ALL_STORE_PAGES.find((p) => {
    if (p.key === norm) return true;
    return p.categoryMatchKeys.some((k) => k === norm || norm.includes(k) || k.includes(norm));
  });

  return found ? found.key : norm.replace(/[^a-z0-9]/g, '-');
}

/**
 * Loads all custom page hero configurations saved in browser storage.
 */
export function loadCustomPageHeroes(): Record<string, CustomPageHero> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/**
 * Saves or updates a custom hero configuration for a specific page.
 */
export function saveCustomPageHero(pageKeyOrTitle: string, config: Partial<CustomPageHero>): void {
  const key = normalizePageKey(pageKeyOrTitle);
  try {
    const current = loadCustomPageHeroes();
    const updated: CustomPageHero = {
      imageUrl: config.imageUrl || current[key]?.imageUrl || '',
      customTitle: config.customTitle !== undefined ? config.customTitle : current[key]?.customTitle,
      customSubtitle: config.customSubtitle !== undefined ? config.customSubtitle : current[key]?.customSubtitle,
      customBadge: config.customBadge !== undefined ? config.customBadge : current[key]?.customBadge,
      updatedAt: new Date().toISOString(),
    };

    const nextStore = { ...current, [key]: updated };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStore));

    // Dispatch notification event so active pages refresh in real-time
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('stoffa_page_heroes_updated', {
          detail: { pageKey: key, config: updated, all: nextStore },
        })
      );
    }
  } catch (err) {
    console.error('Failed to save page hero:', err);
  }
}

/**
 * Resets a specific page's hero back to its default artwork and copy.
 */
export function resetCustomPageHero(pageKeyOrTitle: string): void {
  const key = normalizePageKey(pageKeyOrTitle);
  try {
    const current = loadCustomPageHeroes();
    delete current[key];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('stoffa_page_heroes_updated', {
          detail: { pageKey: key, config: null, all: current },
        })
      );
    }
  } catch (err) {
    console.error('Failed to reset page hero:', err);
  }
}

/**
 * Resets all page hero customizations back to factory defaults.
 */
export function resetAllCustomPageHeroes(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('stoffa_page_heroes_updated', {
          detail: { pageKey: 'all', config: null, all: {} },
        })
      );
    }
  } catch (err) {
    console.error('Failed to reset all page heroes:', err);
  }
}

/**
 * Resolves the effective hero details (combining defaults + any admin custom override).
 */
export function getEffectivePageHero(pageKeyOrTitle: string): {
  pageDefinition: PageHeroDefinition;
  imageUrl: string;
  title: string;
  subtitle: string;
  badge: string;
  isCustom: boolean;
} {
  const key = normalizePageKey(pageKeyOrTitle);
  const def = ALL_STORE_PAGES.find((p) => p.key === key) || {
    key,
    name: pageKeyOrTitle,
    group: 'Occasions & Events' as const,
    categoryMatchKeys: [key],
    defaultTitle: pageKeyOrTitle,
    defaultSubtitle: 'Handcrafted luxury footwear & accessories • Dual-density memory foam',
    defaultBadge: 'CURATED EDITION',
    defaultImageUrl: dateNightHero1,
  };

  const customStore = loadCustomPageHeroes();
  const custom = customStore[key];

  if (custom && custom.imageUrl) {
    return {
      pageDefinition: def,
      imageUrl: custom.imageUrl,
      title: custom.customTitle || def.defaultTitle,
      subtitle: custom.customSubtitle || def.defaultSubtitle,
      badge: custom.customBadge || def.defaultBadge,
      isCustom: true,
    };
  }

  return {
    pageDefinition: def,
    imageUrl: def.defaultImageUrl,
    title: def.defaultTitle,
    subtitle: def.defaultSubtitle,
    badge: def.defaultBadge,
    isCustom: false,
  };
}
