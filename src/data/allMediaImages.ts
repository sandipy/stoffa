// Comprehensive catalog of all media images located in /src/assets/images
// Automatically imports every asset via Vite glob and maps rich metadata.

export interface MediaImageItem {
  id: string;
  filename: string;
  url: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  aspectRatio: string;
  recommendedFor?: Array<'shoes' | 'bags' | 'sale' | 'ready'>;
  tags?: string[];
}

// Eagerly import all image assets in /src/assets/images
const rawGlob = import.meta.glob<{ default: string }>(
  '../assets/images/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

// Map of known handcrafted metadata for key images
const KNOWN_METADATA: Record<string, Partial<MediaImageItem>> = {
  'stoffa_seated_mature_palace_1788787848514.jpg': {
    title: 'Palace Matriarch (Mature Indian Model on Marble Stairs)',
    category: 'Seated & Lounging Heros',
    aspectRatio: '16:9 Landscape',
    description: 'Mature Indian model seated on palace stairs, champagne architectural Kolhapuri wedges & antique gold zardozi potli.',
    recommendedFor: ['shoes', 'sale'],
    tags: ['seated', 'palace', 'mature', 'kolhapuri', 'gold', 'champagne', 'wedding'],
  },
  'stoffa_seated_black_terrace_1788787865296.jpg': {
    title: 'Amalfi Terrace (Black Model on Stone Bench)',
    category: 'Seated & Lounging Heros',
    aspectRatio: '16:9 Landscape',
    description: 'Black model seated on sunlit cliffside terrace with feet forward, metallic gold wedges & embroidered silk potli.',
    recommendedFor: ['shoes', 'bags'],
    tags: ['seated', 'terrace', 'amalfi', 'black model', 'gold wedges', 'potli'],
  },
  'stoffa_seated_asian_steps_1788787882526.jpg': {
    title: 'Emerald Gala (East Asian Model on Limestone Steps)',
    category: 'Seated & Lounging Heros',
    aspectRatio: '16:9 Landscape',
    description: 'East Asian model seated on wide steps showing platinum pewter crystal wedge sandals & metallic evening potli.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['seated', 'gala', 'asian model', 'crystal', 'pewter', 'steps'],
  },
  'stoffa_seated_latina_chaise_1788787897598.jpg': {
    title: 'Coastal Promenade (Latina Model on Teak Daybed)',
    category: 'Seated & Lounging Heros',
    aspectRatio: '16:9 Landscape',
    description: 'Latina resort model lounging on daybed with legs extended forward, showing 2.5-inch rose gold low wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['seated', 'resort', 'latina model', 'daybed', 'rose gold', 'low wedge'],
  },
  'stoffa_seated_mature_bench_1788787912992.jpg': {
    title: 'Sculptural Atelier (Mature Woman on Garden Bench)',
    category: 'Seated & Lounging Heros',
    aspectRatio: '16:9 Landscape',
    description: 'Distinguished mature woman in ivory tailoring seated on bench with ankles crossed, showing bronze block heels.',
    recommendedFor: ['shoes', 'sale'],
    tags: ['seated', 'garden', 'mature', 'block heel', 'bronze', 'tailoring'],
  },
  'stoffa_seated_festive_swing_1788787930351.jpg': {
    title: 'Courtyard Sangeet (Young Indian Model on Carved Step)',
    category: 'Seated & Lounging Heros',
    aspectRatio: '16:9 Landscape',
    description: 'Young model in crimson and gold lehenga seated on carved sandstone swing, displaying hand-braided metallic wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['seated', 'sangeet', 'swing', 'festive', 'indian model', 'lehenga'],
  },
  'stoffa_seated_desert_kaftan_1788787963883.jpg': {
    title: 'Desert Palace Mirage (Regal Kaftan & Low Wedges)',
    category: 'Seated & Lounging Heros',
    aspectRatio: '16:9 Landscape',
    description: 'Regal model lounging on embroidered floor cushions in sandstone pavilion wearing copper-gold ergonomic wedges.',
    recommendedFor: ['shoes', 'sale'],
    tags: ['seated', 'desert', 'kaftan', 'copper gold', 'pavilion'],
  },
  'stoffa_seated_mother_daughter_1788787982346.jpg': {
    title: 'Generations of Elegance (Mother & Daughter on Settee)',
    category: 'Seated & Lounging Heros',
    aspectRatio: '16:9 Landscape',
    description: 'Mother and daughter seated side-by-side on French antique settee, showcasing dual generations of Stöffa wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['seated', 'mother daughter', 'settee', 'generations', 'bridal'],
  },
  'stoffa_seated_yacht_deck_1788787996415.jpg': {
    title: 'Riviera Yacht Lounge (Sunlit Teak Deck Lounger)',
    category: 'Seated & Lounging Heros',
    aspectRatio: '16:9 Landscape',
    description: 'Model in breezy white linen lounging on yacht aft deck with sun on feet, showing nautical-chic champagne wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['seated', 'yacht', 'deck', 'linen', 'riviera', 'resort'],
  },
  'stoffa_seated_asian_garden_1788788011021.jpg': {
    title: 'Botanical Sanctuary (Asian Model by Lily Pavilion)',
    category: 'Seated & Lounging Heros',
    aspectRatio: '16:9 Landscape',
    description: 'Model seated on granite edge of water lily pond, displaying water-resistant champagne metallic Kolhapuri flats.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['seated', 'botanical', 'garden', 'asian model', 'flats'],
  },

  // Flagship Heros
  'hero_just_in_stoffa_1788641110283.jpg': {
    title: 'Stöffa Flagship Just In Arrivals',
    category: 'Heros & Banners',
    aspectRatio: '16:9 Landscape',
    description: 'Official flagship new arrivals hero banner featuring architectural metallic wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['flagship', 'hero', 'just in', 'wedges', 'arrivals'],
  },
  'hero_bridal_stoffa_1788641121017.jpg': {
    title: 'Stöffa Heirloom Bridal Couture Hero',
    category: 'Heros & Banners',
    aspectRatio: '16:9 Landscape',
    description: 'Flagship bridal hero banner showing handcrafted crystal pearl wedges and antique potlis.',
    recommendedFor: ['shoes', 'bags'],
    tags: ['bridal', 'hero', 'couture', 'wedding', 'pearls'],
  },
  'hero_cruise_stoffa_1788641132038.jpg': {
    title: 'Stöffa Riviera Cruise & Resort Hero',
    category: 'Heros & Banners',
    aspectRatio: '16:9 Landscape',
    description: 'Flagship resort cruise collection with metallic braided straps and teak deck backdrops.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['cruise', 'resort', 'hero', 'yacht', 'braided'],
  },

  // Occasions & Prom & Date Night Couple Heros
  'prom_couple_ballroom_1788812966604.jpg': {
    title: 'Prom Couple: Grand Ballroom Chandelier Entrance',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: '16:9 Hero: High school prom couple under crystal chandeliers. Girl in emerald silk gown with champagne crystal wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['prom', 'couple', 'ballroom', 'emerald gown', 'wedges', 'tuxedo'],
  },
  'prom_couple_terrace_1788812980283.jpg': {
    title: 'Prom Couple: Manor Estate Balustrade Twilight',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: '16:9 Hero: Girl in midnight blue sparkling tulle prom gown with silver-gold architectural wedges and envelope clutch.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['prom', 'couple', 'terrace', 'twilight', 'blue dress'],
  },
  'prom_couple_arrival_1788812994506.jpg': {
    title: 'Prom Couple: Red Carpet Limousine Arrival',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: '16:9 Hero: Prom couple arriving on red carpet with paparazzi flashbulbs. Rose-gold sculptural wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['prom', 'couple', 'red carpet', 'arrival', 'limo'],
  },
  'prom_couple_garden_1788813008156.jpg': {
    title: 'Prom Couple: Botanical Conservatory Fairy Lights',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: '16:9 Hero: Romantic conservatory gazebo lit by fairy lights. Champagne strappy wedges and beaded potli.',
    recommendedFor: ['shoes', 'bags'],
    tags: ['prom', 'couple', 'garden', 'conservatory', 'lights'],
  },
  'prom_couple_rooftop_1788813022394.jpg': {
    title: 'Prom Couple: Skyline Rooftop After-Party',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: '16:9 Hero: Rooftop prom celebration overlooking glowing city skyline. Ruby satin gown with antique gold wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['prom', 'couple', 'rooftop', 'after party', 'ruby satin'],
  },
  'date_couple_skyline_1788813036430.jpg': {
    title: 'Date Night Couple: Penthouse Rooftop Lounge',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: '16:9 Hero: Woman in black slip dress with champagne gold strappy wedges and metallic clutch toasting with man.',
    recommendedFor: ['shoes', 'sale'],
    tags: ['date night', 'couple', 'skyline', 'rooftop', 'cocktails'],
  },
  'date_couple_speakeasy_1788813049777.jpg': {
    title: 'Date Night Couple: Intimate Velvet Speakeasy',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: '16:9 Hero: Woman in emerald velvet dress with sculptural wedge mules and embroidered potli bag conversing with man.',
    recommendedFor: ['shoes', 'bags'],
    tags: ['date night', 'couple', 'speakeasy', 'velvet', 'intimate'],
  },
  'date_couple_courtyard_1788813064902.jpg': {
    title: 'Date Night Couple: Lantern-Lit Bistro Courtyard',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: '16:9 Hero: Woman in terracotta silk dress with bronze block heel wedges and woven clutch with man in linen jacket.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['date night', 'couple', 'courtyard', 'bistro', 'lanterns'],
  },
  'date_couple_marina_1788813078148.jpg': {
    title: 'Date Night Couple: Sunset Yacht Harbor Pier',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: '16:9 Hero: Woman in champagne silk wrap gown with gold braided wedges walking hand-in-hand with partner.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['date night', 'couple', 'marina', 'harbor', 'sunset'],
  },
  'date_couple_fireside_1788813088632.jpg': {
    title: 'Date Night Couple: Cozy Fireside Villa Lounge',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: '16:9 Hero: Woman in cream cashmere dress with metallic slip-on wedges sharing wine in front of a stone hearth.',
    recommendedFor: ['shoes', 'sale'],
    tags: ['date night', 'couple', 'fireside', 'villa', 'wine'],
  },

  // Solo Occasions Shoots
  'prom_night_shoes_1788809121283.jpg': {
    title: 'Prom Night Ballroom Wedges',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: 'Glamorous prom ballroom staircase showing handcrafted metallic gold architectural wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['prom', 'ballroom', 'gold wedges'],
  },
  'date_night_shoes_1788809134071.jpg': {
    title: 'Date Night Candlelit Terrace',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: 'Chic candlelit restaurant terrace featuring champagne rose gold block heel wedges.',
    recommendedFor: ['shoes', 'sale'],
    tags: ['date night', 'terrace', 'candlelit'],
  },
  'xmas_brunch_shoes_1788809150575.jpg': {
    title: 'Christmas Brunch Holiday Gala',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: 'Festive sunlit conservatory brunch with antique gold embroidered wedge sandals.',
    recommendedFor: ['shoes', 'bags', 'sale'],
    tags: ['brunch', 'christmas', 'festive', 'conservatory'],
  },
  'quinceanera_glam_shoes_1788809164257.jpg': {
    title: 'Quinceañera Glamour Ballroom',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: 'Opulent palace ballroom celebration featuring princess crystals and dancing wedge heels.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['quinceanera', 'glamour', 'ballroom', 'princess crystals'],
  },
  'bridal_comfort_shoes_1788809179498.jpg': {
    title: 'Bride on Her Feet (Bridal Suite)',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: 'Modern royal bride on velvet chaise showing pearl-encrusted all-day bridal comfort wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['bride', 'wedding', 'comfort', 'pearls', 'chaise'],
  },
  'mother_bride_shoes_1788809193587.jpg': {
    title: 'Mother of the Bride Villa Balustrade',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: 'Sophisticated mother of the bride in silk jacquard with ergonomic low wedges.',
    recommendedFor: ['shoes', 'sale'],
    tags: ['mother of bride', 'villa', 'ergonomic', 'low wedge'],
  },
  'sangeet_dance_shoes_1788809206438.jpg': {
    title: 'Royal Sangeet Courtyard Dance',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: 'Joyful twirling celebration in royal courtyard with gold dance-stable Kolhapuri architectural wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['sangeet', 'dance', 'courtyard', 'kolhapuri'],
  },
  'girls_night_shoes_1788809220118.jpg': {
    title: "Girls' Night Out Skyline Lounge",
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: 'Manhattan velvet cocktail lounge with strappy architectural block heels and luxury clutches.',
    recommendedFor: ['shoes', 'bags'],
    tags: ['girls night', 'skyline', 'block heels', 'clutch'],
  },
  'yacht_cruise_shoes_1788809233863.jpg': {
    title: 'Riviera Yacht Deck Cruise Wedges',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: 'French Riviera private mega-yacht deck with woven metallic bronze low wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['yacht', 'cruise', 'riviera', 'bronze wedge'],
  },
  'bridesmaid_party_shoes_1788809247373.jpg': {
    title: 'The Bridesmaid Edit Champagne Toast',
    category: 'Occasions & Events',
    aspectRatio: '16:9 Landscape',
    description: 'Manor lawn champagne toast showing pastel gowns and lawn-stable dancing wedges.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['bridesmaid', 'champagne', 'party', 'dancing wedges'],
  },

  // Footwear, Models & Bags
  'shoes_hero_model_1788745307294.jpg': {
    title: 'Classic High K Wedges Model',
    category: 'Shoes & Signature Wedges',
    aspectRatio: '4:3 Card',
    description: 'Signature architectural wedges on model against warm neutral canvas.',
    recommendedFor: ['shoes'],
    tags: ['shoes', 'model', 'wedges', 'signature'],
  },
  'black_model_hero_1788747095466.jpg': {
    title: 'Sculptural Gold Wedges (Black Model)',
    category: 'Shoes & Signature Wedges',
    aspectRatio: '4:3 Card',
    description: 'Burnished metallic gold high wedges with broad lawn-safe sole.',
    recommendedFor: ['shoes', 'sale'],
    tags: ['shoes', 'black model', 'gold wedge'],
  },
  'asian_model_hero_1788747108983.jpg': {
    title: 'Champagne Metallic Wedges (Asian Model)',
    category: 'Shoes & Signature Wedges',
    aspectRatio: '4:3 Card',
    description: 'Handcrafted metallic braided straps with dual-density memory foam cushioning.',
    recommendedFor: ['shoes'],
    tags: ['shoes', 'asian model', 'champagne', 'braided'],
  },
  'indian_model_hero_1788747121553.jpg': {
    title: 'Antique Gold Kolhapuri (Indian Model)',
    category: 'Shoes & Signature Wedges',
    aspectRatio: '4:3 Card',
    description: 'Artisanal toe-loop and metallic cord hand braiding.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['shoes', 'indian model', 'kolhapuri', 'gold'],
  },
  'higher_wedge_couture_1788644942844.jpg': {
    title: '4.25" Couture Architectural Wedge',
    category: 'Shoes & Signature Wedges',
    aspectRatio: '4:3 Card',
    description: 'Sculptural high wedge sole engineered for maximum stability and red-carpet height.',
    recommendedFor: ['shoes', 'sale'],
    tags: ['shoes', '4.25 inch', 'couture', 'high wedge'],
  },
  'bags_hero_model_1788745321490.jpg': {
    title: 'Antique Zardozi Potli Bag Model',
    category: 'Bags & Heirloom Potlis',
    aspectRatio: '4:3 Card',
    description: 'Hand-embroidered silk potli bag with pearl and bullion wire tassels.',
    recommendedFor: ['bags'],
    tags: ['bags', 'potli', 'zardozi', 'pearls', 'embroidery'],
  },
  'stoffa_potli_bag_1788639278135.jpg': {
    title: 'Heirloom Hand-Embroidered Potli Detail',
    category: 'Bags & Heirloom Potlis',
    aspectRatio: '4:3 Card',
    description: 'Close-up studio detail of fine bullion metallic zari wirework and pearls.',
    recommendedFor: ['bags'],
    tags: ['bags', 'potli', 'embroidery', 'studio'],
  },
  'resort_chic_hero_1788745334192.jpg': {
    title: 'Resort Chic Daytime Linen Editorial',
    category: 'Resort & Denim Casual',
    aspectRatio: '16:9 Landscape',
    description: 'Sunlit resort villa with metallic low wedges and lightweight canvas bag.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['resort', 'linen', 'editorial'],
  },
  'festive_brunch_hero_1788745376178.jpg': {
    title: 'Festive Brunch Embroidered Potli & Wedges',
    category: 'Bags & Heirloom Potlis',
    aspectRatio: '16:9 Landscape',
    description: 'Champagne raw silk bag with delicate gold zari embroidery at festive table.',
    recommendedFor: ['bags'],
    tags: ['festive', 'brunch', 'potli', 'wedges'],
  },
  'cocktail_soiree_hero_1788745390554.jpg': {
    title: 'Cocktail Soirée Evening Bag & Heels',
    category: 'Bags & Heirloom Potlis',
    aspectRatio: '16:9 Landscape',
    description: 'Structured evening clutch paired with handcrafted metallic heels.',
    recommendedFor: ['bags'],
    tags: ['cocktail', 'clutch', 'evening'],
  },
  'model_jeans_sunny_boardwalk_1788743314430.jpg': {
    title: 'Sunny Boardwalk Denim & Wedges',
    category: 'Resort & Denim Casual',
    aspectRatio: '16:9 Landscape',
    description: 'Model in blue jeans and white blouse wearing metallic gold wedges on sunny boardwalk.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['denim', 'jeans', 'boardwalk', 'casual', 'wedges'],
  },
  'model_jeans_sunny_cafe_1788743326809.jpg': {
    title: 'Sidewalk Café Denim Chic',
    category: 'Resort & Denim Casual',
    aspectRatio: '16:9 Landscape',
    description: 'Relaxed outdoor bistro setting pairing cropped denim with sculptural low wedges.',
    recommendedFor: ['shoes', 'sale'],
    tags: ['denim', 'cafe', 'casual', 'wedges'],
  },
  'model_white_jeans_sunny_terrace_1788743339895.jpg': {
    title: 'White Denim Summer Terrace',
    category: 'Resort & Denim Casual',
    aspectRatio: '16:9 Landscape',
    description: 'Model in crisp white denim trousers and metallic slides on Mediterranean terrace.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['white denim', 'terrace', 'summer', 'slides'],
  },
  'model_jeans_sunny_palm_garden_1788743352587.jpg': {
    title: 'Palm Garden Denim & Flats',
    category: 'Resort & Denim Casual',
    aspectRatio: '16:9 Landscape',
    description: 'Sunny tropical garden pathway with denim and handcrafted Kolhapuri flats.',
    recommendedFor: ['shoes', 'ready'],
    tags: ['denim', 'palm garden', 'flats', 'kolhapuri'],
  },
};

// Clean human-friendly title generator for any image file
function formatFallbackTitle(filename: string): string {
  // Strip trailing hash/timestamp and extension
  const base = filename
    .replace(/\.[a-zA-Z0-9]+$/, '')
    .replace(/_\d{10,}$/, '')
    .replace(/[_-]/g, ' ');

  // Capitalize words
  return base
    .split(' ')
    .filter(Boolean)
    .map((w) => {
      if (w.toLowerCase() === 'stoffa') return 'Stöffa';
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(' ');
}

// Categorize any asset based on its filename keywords
function guessCategory(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes('seated') || lower.includes('loung')) return 'Seated & Lounging Heros';
  if (lower.includes('prom') || lower.includes('date_') || lower.includes('couple') || lower.includes('quinceanera') || lower.includes('gala') || lower.includes('sangeet') || lower.includes('brunch') || lower.includes('holiday')) return 'Occasions & Events';
  if (lower.includes('potli') || lower.includes('bag') || lower.includes('tote') || lower.includes('clutch')) return 'Bags & Heirloom Potlis';
  if (lower.includes('jeans') || lower.includes('denim') || lower.includes('resort') || lower.includes('boardwalk') || lower.includes('yacht') || lower.includes('cruise')) return 'Resort & Denim Casual';
  if (lower.includes('wedge') || lower.includes('shoe') || lower.includes('flat') || lower.includes('heel') || lower.includes('loafer') || lower.includes('slipper') || lower.includes('boot')) return 'Shoes & Signature Wedges';
  if (lower.includes('hero') || lower.includes('banner')) return 'Heros & Banners';
  return 'Atelier & Editorial Assets';
}

// Build the complete list of all 135+ images
export const ALL_MEDIA_IMAGES: MediaImageItem[] = Object.entries(rawGlob).map(([filePath, moduleExports]) => {
  const url = typeof moduleExports === 'string' ? moduleExports : (moduleExports as { default: string }).default;
  const filename = filePath.split('/').pop() || filePath;
  const known = KNOWN_METADATA[filename] || {};

  const title = known.title || formatFallbackTitle(filename);
  const category = known.category || guessCategory(filename);
  const aspectRatio = known.aspectRatio || (category.includes('Heros') || category.includes('Occasions') ? '16:9 Landscape' : '4:3 Card');
  const description = known.description || `Handcrafted Stöffa editorial image: ${title}. High-resolution media asset for page hero banners and storefront cards.`;

  return {
    id: filename.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
    filename,
    url,
    title,
    subtitle: known.subtitle || `${category} • ${aspectRatio}`,
    description,
    category,
    aspectRatio,
    recommendedFor: known.recommendedFor || (category.includes('Bags') ? ['bags'] : ['shoes']),
    tags: known.tags || [category.toLowerCase(), title.toLowerCase()],
  };
});

// Sorted categories for easy tabs
export const MEDIA_CATEGORIES = [
  'All Images',
  'Occasions & Events',
  'Seated & Lounging Heros',
  'Heros & Banners',
  'Shoes & Signature Wedges',
  'Bags & Heirloom Potlis',
  'Resort & Denim Casual',
  'Atelier & Editorial Assets',
] as const;
