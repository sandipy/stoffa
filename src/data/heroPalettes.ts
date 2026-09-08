export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface HeroSlidePalette {
  name: string;
  primary: string; // Main heading accent, primary button
  subtitle: string; // Subtitle italic text
  badgeBg: string; // Subtle tint for badge
  badgeText: string; // Badge label color
  accentBorder: string; // Delicate divider/accent border
  bgTint: string; // Soft crisp white / ivory panel tint
  swatches: ColorSwatch[];
}

export const HERO_SLIDE_PALETTES: Record<string, HeroSlidePalette> = {
  'just-in': {
    name: 'Champagne Lustre & Raw Silk',
    primary: '#92400e',
    subtitle: '#b45309',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    accentBorder: '#fde68a',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Warm Amber', hex: '#B45309' },
      { name: 'Raw Ivory', hex: '#FDFBF7' },
      { name: 'Atelier Bronze', hex: '#451A03' },
    ],
  },
  'shoes': {
    name: 'Architectural Bronze & Antique Gold',
    primary: '#854d0e',
    subtitle: '#a16207',
    badgeBg: '#fef9c3',
    badgeText: '#854d0e',
    accentBorder: '#fef08a',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Antique Gold', hex: '#C59B27' },
      { name: 'Burnished Brass', hex: '#92400E' },
      { name: 'Warm Alabaster', hex: '#FAF7F2' },
      { name: 'Espresso Sole', hex: '#292524' },
    ],
  },
  'low-wedges': {
    name: 'Olive Garden & Brushed Bronze',
    primary: '#3f6212',
    subtitle: '#854d0e',
    badgeBg: '#f7fee7',
    badgeText: '#3f6212',
    accentBorder: '#d9f99d',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Olive Bronze', hex: '#5D6F3D' },
      { name: 'Brushed Brass', hex: '#A16207' },
      { name: 'Pebble Stone', hex: '#E7E5E4' },
      { name: 'Garden Noir', hex: '#1C1917' },
    ],
  },
  'high-wedges': {
    name: 'Platinum Pewter & Obsidian',
    primary: '#334155',
    subtitle: '#ca8a04',
    badgeBg: '#f1f5f9',
    badgeText: '#334155',
    accentBorder: '#e2e8f0',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Platinum Pewter', hex: '#64748B' },
      { name: 'Gilded Ochre', hex: '#CA8A04' },
      { name: 'Limestone', hex: '#F8FAFC' },
      { name: 'Midnight Obsidian', hex: '#0F172A' },
    ],
  },
  'bags': {
    name: 'Zardozi Bullion & Pearl Fringe',
    primary: '#831843',
    subtitle: '#b45309',
    badgeBg: '#fdf2f8',
    badgeText: '#831843',
    accentBorder: '#fbcfe8',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Bullion Gold', hex: '#B45309' },
      { name: 'Berry Silk', hex: '#831843' },
      { name: 'Seed Pearl', hex: '#FEFCE8' },
      { name: 'Royal Plum', hex: '#3B0764' },
    ],
  },
  'bridal-bride': {
    name: 'Rose Gold & Imperial Ruby',
    primary: '#9d174d',
    subtitle: '#be185d',
    badgeBg: '#fce7f3',
    badgeText: '#9d174d',
    accentBorder: '#fbcfe8',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Metallic Rose Gold', hex: '#B76E79' },
      { name: 'Zardozi Ruby', hex: '#BE185D' },
      { name: 'Blush Satin', hex: '#FFF1F2' },
      { name: 'Wine Velvet', hex: '#500724' },
    ],
  },
  'cruise': {
    name: 'Amalfi Azure & Limoncello Gold',
    primary: '#0369a1',
    subtitle: '#0284c7',
    badgeBg: '#e0f2fe',
    badgeText: '#0369a1',
    accentBorder: '#bae6fd',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Mediterranean Azure', hex: '#0284C7' },
      { name: 'Limoncello Gold', hex: '#EAB308' },
      { name: 'Sea Salt White', hex: '#F0F9FF' },
      { name: 'Deep Marine', hex: '#0C4A6E' },
    ],
  },
  'celebration': {
    name: 'Marigold & Royal Magenta',
    primary: '#9d174d',
    subtitle: '#d97706',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    accentBorder: '#fde68a',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Marigold Ochre', hex: '#D97706' },
      { name: 'Sangeet Magenta', hex: '#9D174D' },
      { name: 'Raw Champagne', hex: '#FFFBEB' },
      { name: 'Temple Bronze', hex: '#451A03' },
    ],
  },
  'denim-sunny-boardwalk': {
    name: 'Cobalt Denim & Sunlit Sand',
    primary: '#1d4ed8',
    subtitle: '#b45309',
    badgeBg: '#eff6ff',
    badgeText: '#1d4ed8',
    accentBorder: '#bfdbfe',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Indigo Denim', hex: '#1D4ED8' },
      { name: 'Sunlit Sand', hex: '#D4AF37' },
      { name: 'Crisp Cotton', hex: '#FFFFFF' },
      { name: 'Boardwalk Teak', hex: '#3B2219' },
    ],
  },
  'resort-chic-hero': {
    name: 'Palma Veranda & Terracotta',
    primary: '#c2410c',
    subtitle: '#a16207',
    badgeBg: '#fff7ed',
    badgeText: '#c2410c',
    accentBorder: '#fed7aa',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Terracotta Clay', hex: '#C2410C' },
      { name: 'Golden Sol', hex: '#CA8A04' },
      { name: 'Ivory Linen', hex: '#FAF5EF' },
      { name: 'Palm Silhouette', hex: '#1C1917' },
    ],
  },
};

export function getSlidePalette(slideId: string): HeroSlidePalette {
  if (HERO_SLIDE_PALETTES[slideId]) {
    return HERO_SLIDE_PALETTES[slideId];
  }

  // Fallback palette with warm artisanal gold & bronze
  return {
    name: 'Stöffa Atelier Gold & Silk',
    primary: '#92400e',
    subtitle: '#b45309',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    accentBorder: '#fde68a',
    bgTint: '#ffffff',
    swatches: [
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Burnished Bronze', hex: '#B45309' },
      { name: 'Raw Ivory', hex: '#FDFBF7' },
      { name: 'Atelier Espresso', hex: '#292524' },
    ],
  };
}
