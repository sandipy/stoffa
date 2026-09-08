/**
 * Shoe Color Theme Utility
 * Dynamically computes matching button styles, borders, shadows, and contrasting text
 * based on the active shoe color on the product detail page.
 */

export interface ShoeColorStyle {
  name: string;
  hex: string;
  // Primary Action Button (e.g. Add to Cart)
  primaryBg: string;
  primaryHoverBg: string;
  primaryActiveBg: string;
  primaryText: string;
  primaryBorder: string;
  primaryShadow: string;
  
  // Selected Pills (Size, Color)
  selectedBg: string;
  selectedText: string;
  selectedBorder: string;
  
  // Subtle Accents (Active Tabs, Angle Border, Icons)
  accentBorder: string;
  accentText: string;
  accentBgLight: string;
  ringColor: string;
}

// Calibrated luxury palette for catalog colors
const PALETTE_MAP: Record<string, { bg: string; hover: string; active: string; text: string; border: string }> = {
  maroon: {
    bg: '#6E131E', // Rich deep Bordeaux maroon
    hover: '#5B0F18',
    active: '#490C13',
    text: '#FFFFFF',
    border: '#490C13',
  },
  gold: {
    bg: '#C19835', // Lustrous metallic artisan gold
    hover: '#A9832A',
    active: '#8E6E22',
    text: '#FFFFFF',
    border: '#A9832A',
  },
  'antique gold': {
    bg: '#9C7A28',
    hover: '#876921',
    active: '#70561A',
    text: '#FFFFFF',
    border: '#70561A',
  },
  'light gold': {
    bg: '#C5A047',
    hover: '#B28E3B',
    active: '#9B7A30',
    text: '#FFFFFF',
    border: '#B28E3B',
  },
  'metallic gold': {
    bg: '#C19835',
    hover: '#A9832A',
    active: '#8E6E22',
    text: '#FFFFFF',
    border: '#A9832A',
  },
  champagne: {
    bg: '#B89766', // Warm saturated champagne bronze
    hover: '#A58555',
    active: '#8F7246',
    text: '#FFFFFF',
    border: '#8F7246',
  },
  'rose gold': {
    bg: '#B06570', // Rich radiant rose gold
    hover: '#9B545F',
    active: '#84444E',
    text: '#FFFFFF',
    border: '#84444E',
  },
  'rose antique': {
    bg: '#A8616B',
    hover: '#93515B',
    active: '#7D424B',
    text: '#FFFFFF',
    border: '#7D424B',
  },
  navy: {
    bg: '#172554', // Royal midnight navy
    hover: '#1E1B4B',
    active: '#0F172A',
    text: '#FFFFFF',
    border: '#0F172A',
  },
  slate: {
    bg: '#475569', // Sophisticated slate
    hover: '#334155',
    active: '#1E293B',
    text: '#FFFFFF',
    border: '#1E293B',
  },
  olive: {
    bg: '#4D5E29', // Artisan olive
    hover: '#3F4D21',
    active: '#313C1A',
    text: '#FFFFFF',
    border: '#313C1A',
  },
  camel: {
    bg: '#A5733C', // Warm Italian camel
    hover: '#8F6231',
    active: '#785127',
    text: '#FFFFFF',
    border: '#785127',
  },
  taupe: {
    bg: '#54463D', // Deep espresso taupe
    hover: '#443831',
    active: '#352B25',
    text: '#FFFFFF',
    border: '#352B25',
  },
  black: {
    bg: '#18181B', // Deep obsidian black
    hover: '#09090B',
    active: '#000000',
    text: '#FFFFFF',
    border: '#09090B',
  },
  pewter: {
    bg: '#5E6D75', // Metallic slate pewter
    hover: '#4D5B62',
    active: '#3E494F',
    text: '#FFFFFF',
    border: '#3E494F',
  },
  silver: {
    bg: '#71717A', // Metallic silver grey
    hover: '#52525B',
    active: '#3F3F46',
    text: '#FFFFFF',
    border: '#3F3F46',
  },
  white: {
    bg: '#27272A', // For white shoes, use sharp obsidian for primary action with white badge
    hover: '#18181B',
    active: '#09090B',
    text: '#FFFFFF',
    border: '#18181B',
  },
};

/**
 * Calculate relative luminance from a hex color string
 */
function getLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return 0.5;
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

/**
 * Adjust hex color brightness
 */
function adjustBrightness(hex: string, percent: number): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;
  const num = parseInt(clean, 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

/**
 * Resolves comprehensive button styles matching the shoe color.
 */
export function getShoeColorTheme(
  colorName?: string,
  colorHex?: string,
  productTitle?: string
): ShoeColorStyle {
  const normalizedName = (colorName || '').trim().toLowerCase();
  const rawHex = (colorHex || '').trim();

  // 1. Try predefined luxury calibrated palette
  if (normalizedName && PALETTE_MAP[normalizedName]) {
    const pal = PALETTE_MAP[normalizedName];
    return {
      name: colorName || 'Classic',
      hex: rawHex || pal.bg,
      primaryBg: pal.bg,
      primaryHoverBg: pal.hover,
      primaryActiveBg: pal.active,
      primaryText: pal.text,
      primaryBorder: pal.border,
      primaryShadow: `0 4px 14px -2px ${pal.bg}4D`,
      selectedBg: pal.bg,
      selectedText: pal.text,
      selectedBorder: pal.border,
      accentBorder: pal.bg,
      accentText: pal.bg,
      accentBgLight: `${pal.bg}14`,
      ringColor: `${pal.bg}66`,
    };
  }

  // 2. Check product title keywords if colorName didn't match directly
  const titleLower = (productTitle || '').toLowerCase();
  for (const [key, pal] of Object.entries(PALETTE_MAP)) {
    if (titleLower.includes(key)) {
      return {
        name: key.toUpperCase(),
        hex: pal.bg,
        primaryBg: pal.bg,
        primaryHoverBg: pal.hover,
        primaryActiveBg: pal.active,
        primaryText: pal.text,
        primaryBorder: pal.border,
        primaryShadow: `0 4px 14px -2px ${pal.bg}4D`,
        selectedBg: pal.bg,
        selectedText: pal.text,
        selectedBorder: pal.border,
        accentBorder: pal.bg,
        accentText: pal.bg,
        accentBgLight: `${pal.bg}14`,
        ringColor: `${pal.bg}66`,
      };
    }
  }

  // 3. Fallback using hex value if provided
  if (rawHex && rawHex.startsWith('#') && rawHex.length === 7) {
    const lum = getLuminance(rawHex);
    // If color is very light (like ivory/white), darken base for solid button readability
    const bg = lum > 0.65 ? adjustBrightness(rawHex, -40) : rawHex;
    const hover = adjustBrightness(bg, -15);
    const active = adjustBrightness(bg, -25);
    const text = lum > 0.65 ? '#FFFFFF' : '#FFFFFF';

    return {
      name: colorName || 'Classic',
      hex: rawHex,
      primaryBg: bg,
      primaryHoverBg: hover,
      primaryActiveBg: active,
      primaryText: text,
      primaryBorder: hover,
      primaryShadow: `0 4px 14px -2px ${bg}4D`,
      selectedBg: bg,
      selectedText: text,
      selectedBorder: hover,
      accentBorder: bg,
      accentText: bg,
      accentBgLight: `${bg}14`,
      ringColor: `${bg}66`,
    };
  }

  // 4. Default luxury fallback (Warm Bronze Maroon)
  const defaultPal = PALETTE_MAP['maroon'];
  return {
    name: colorName || 'Maroon',
    hex: defaultPal.bg,
    primaryBg: defaultPal.bg,
    primaryHoverBg: defaultPal.hover,
    primaryActiveBg: defaultPal.active,
    primaryText: defaultPal.text,
    primaryBorder: defaultPal.border,
    primaryShadow: `0 4px 14px -2px ${defaultPal.bg}4D`,
    selectedBg: defaultPal.bg,
    selectedText: defaultPal.text,
    selectedBorder: defaultPal.border,
    accentBorder: defaultPal.bg,
    accentText: defaultPal.bg,
    accentBgLight: `${defaultPal.bg}14`,
    ringColor: `${defaultPal.bg}66`,
  };
}
