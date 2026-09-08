import heroBridalImg from '../assets/images/hero_bridal_stoffa_1788641121017.jpg';
import heroCruiseImg from '../assets/images/hero_cruise_stoffa_1788641132038.jpg';
import motherOfBrideImg from '../assets/images/mother_of_bride_1788644897489.jpg';
import redCarpetEntryImg from '../assets/images/red_carpet_entry_1788644908907.jpg';
import lowWedgeGardenImg from '../assets/images/low_wedge_garden_1788644921598.jpg';
import higherWedgeCoutureImg from '../assets/images/higher_wedge_couture_1788644942844.jpg';
import flatsResortModelImg from '../assets/images/flats_resort_model_1788644983578.jpg';
import celebrationFestiveImg from '../assets/images/celebration_festive_1788644994416.jpg';
import eveningGlamImg from '../assets/images/resort_chic_hero_1788745334192.jpg';
import cocktailModelImg from '../assets/images/cocktail_soiree_hero_1788745390554.jpg';
import festiveBrunchImg from '../assets/images/festive_brunch_hero_1788745376178.jpg';

import promNightImg from '../assets/images/prom_night_shoes_1788809121283.jpg';
import dateNightImg from '../assets/images/date_night_shoes_1788809134071.jpg';
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

export interface CuratedCollectionItem {
  id: string;
  title: string;
  tagline: string;
  theme: 'Wedding & Ceremonies' | 'Galas & Celebrations' | 'Resort & Evenings';
  shoeNote: string;
  image: string;
}

export const CURATED_COLLECTIONS_DATA: CuratedCollectionItem[] = [
  // Theme 1: Wedding & Ceremonies
  {
    id: 'bride-on-her-feet',
    title: 'Bride on Her Feet',
    tagline: 'Made for the long day, the dance floor and everything after — from the aisle to the after party.',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Higher Wedges (3.5" - 4.25") & Bridal Crystals',
    image: brideComfortImg,
  },
  {
    id: 'mother-of-the-bride',
    title: 'Mother of the Bride',
    tagline: 'All the glam, with comfort for the long hours',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Low Wedges (2.5") & Block Heels',
    image: motherBrideImg,
  },
  {
    id: 'the-bridesmaid-edit',
    title: 'The Bridesmaid Edit',
    tagline: 'Made to complement the bride, without holding you back from the dance floor.',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Festive Flats, Block Heels & Potlis',
    image: bridesmaidPartyImg,
  },
  {
    id: 'the-destination-bride',
    title: 'The Destination Bride',
    tagline: 'Glamour that travels — from the ceremony to cocktails by the sea.',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Lawn & Sand-Friendly Wedges',
    image: royalBridalImg,
  },
  {
    id: 'the-sangeet-ceremony',
    title: 'The Sangeet Ceremony',
    tagline: 'Color and dance a match made in heaven.',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Dance-Ready Low Wedges & Metallic Flats',
    image: sangeetDanceImg,
  },
  {
    id: 'something-blue',
    title: 'Something Blue',
    tagline: 'A little blue, a lot of personality — your something blue, with a twist',
    theme: 'Wedding & Ceremonies',
    shoeNote: 'Navy Flats, Ink Wedges & Silver Crystals',
    image: higherWedgeCoutureImg,
  },

  // Theme 2: Galas & Celebrations
  {
    id: 'red-carpet-ready',
    title: 'Red Carpet Ready',
    tagline: 'Make the entrance. Own the moment. Stay out late.',
    theme: 'Galas & Celebrations',
    shoeNote: 'Sculptural High Wedges & Celebrity Crystals',
    image: blacktieGalaImg,
  },
  {
    id: 'prom-night',
    title: 'Prom Night',
    tagline: 'The shoes that make the entrance — and keep you dancing all night',
    theme: 'Galas & Celebrations',
    shoeNote: 'High Wedges & Baguette Crystals',
    image: promNightImg,
  },
  {
    id: 'quinceanera-glam',
    title: 'Quinceañera Glam',
    tagline: 'For her big moment, with the glamour to match every dance.',
    theme: 'Galas & Celebrations',
    shoeNote: 'Princess Crystals, Rose Gold & High Wedges',
    image: quinceaneraGlamImg,
  },
  {
    id: 'garden-party',
    title: 'Garden Party',
    tagline: 'Glam on the lawns , Height without the stumble.',
    theme: 'Galas & Celebrations',
    shoeNote: 'Lawn-Stable Block Heels & Low Wedges',
    image: gardenSoireeImg,
  },
  {
    id: 'christmas-brunch',
    title: 'Christmas Brunch',
    tagline: 'Sparkle in comfort indoors,  as hostess or guest.',
    theme: 'Galas & Celebrations',
    shoeNote: 'Indoor Sparkle Flats & Festive Bags',
    image: xmasBrunchImg,
  },

  // Theme 3: Resort & Evenings
  {
    id: 'cruise-ready',
    title: 'Cruise Ready',
    tagline: 'From daytime exploring to sunset cocktails — one wardrobe, every occasion',
    theme: 'Resort & Evenings',
    shoeNote: 'Artisanal Flats & 2.5" Low Wedges',
    image: yachtCruiseImg,
  },
  {
    id: 'the-holiday-edit',
    title: 'The Holiday Edit',
    tagline: 'Lightweight in your baggage and versatile glam on your feet',
    theme: 'Resort & Evenings',
    shoeNote: 'Packable Flats & Versatile Metallics',
    image: winterHolidayImg,
  },
  {
    id: 'girls-night-out',
    title: "Girls' Night Out",
    tagline: 'Made for the plans that start with “just one drink” and end much later',
    theme: 'Resort & Evenings',
    shoeNote: 'Dance-Floor Flats, Block Heels & Clutches',
    image: girlsNightImg,
  },
  {
    id: 'date-night',
    title: 'Date Night',
    tagline: 'A little extra glamour, wherever the night takes you.',
    theme: 'Resort & Evenings',
    shoeNote: 'Sleek 2.5" Wedges & Strappy Block Heels',
    image: dateNightImg,
  },
];

export const STORAGE_KEY_COLLECTIONS = 'stoffa_curated_collections_v1';

/**
 * Loads curated collections from localStorage or falls back to factory defaults.
 */
export function loadCuratedCollections(): CuratedCollectionItem[] {
  try {
    if (typeof window === 'undefined') return CURATED_COLLECTIONS_DATA;
    const raw = localStorage.getItem(STORAGE_KEY_COLLECTIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load curated collections from storage:', err);
  }
  return CURATED_COLLECTIONS_DATA;
}

/**
 * Saves updated curated collections to localStorage and notifies listeners.
 */
export function saveCuratedCollections(collections: CuratedCollectionItem[]): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_COLLECTIONS, JSON.stringify(collections));
    window.dispatchEvent(
      new CustomEvent('stoffa_curated_collections_updated', { detail: collections })
    );
  } catch (err) {
    console.error('Failed to save curated collections:', err);
  }
}

/**
 * Resets curated collections back to factory defaults and notifies listeners.
 */
export function resetCuratedCollections(): CuratedCollectionItem[] {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_COLLECTIONS);
      window.dispatchEvent(
        new CustomEvent('stoffa_curated_collections_updated', { detail: CURATED_COLLECTIONS_DATA })
      );
    }
  } catch (err) {
    console.error('Failed to reset curated collections:', err);
  }
  return CURATED_COLLECTIONS_DATA;
}
