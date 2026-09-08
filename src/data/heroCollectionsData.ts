// 15 Collection Hero Definitions matching all Stoffa Style menu items and collections
// Each item pairs with an authentic Stoffa image, editorial description, and target category.

import heroJustInImg from '../assets/images/hero_just_in_stoffa_1788641110283.jpg';
import heroBridalImg from '../assets/images/hero_bridal_stoffa_1788641121017.jpg';
import heroCruiseImg from '../assets/images/hero_cruise_stoffa_1788641132038.jpg';
import modelShoesImg from '../assets/images/shoes_hero_model_1788745307294.jpg';
import modelBagsImg from '../assets/images/bags_hero_model_1788745321490.jpg';
import modelSaleImg from '../assets/images/stoffa_sale_model_1788639332319.jpg';
import modelReadyImg from '../assets/images/stoffa_ready_model_1788641087680.jpg';

// Newly generated high-fashion on-model images for all collections
import motherOfBrideImg from '../assets/images/mother_of_bride_1788644897489.jpg';
import redCarpetEntryImg from '../assets/images/red_carpet_entry_1788644908907.jpg';
import lowWedgeGardenImg from '../assets/images/low_wedge_garden_1788644921598.jpg';
import higherWedgeCoutureImg from '../assets/images/higher_wedge_couture_1788644942844.jpg';
import blockHeelsFashionImg from '../assets/images/block_heels_fashion_1788644965270.jpg';
import flatsResortModelImg from '../assets/images/flats_resort_model_1788644983578.jpg';
import celebrationFestiveImg from '../assets/images/celebration_festive_1788644994416.jpg';

// 10 New Hero Slides: Casualwear, jeans, and bright sunny locales
import jeansSunnyBoardwalkImg from '../assets/images/model_jeans_sunny_boardwalk_1788743314430.jpg';
import jeansSunnyCafeImg from '../assets/images/model_jeans_sunny_cafe_1788743326809.jpg';
import whiteJeansTerraceImg from '../assets/images/model_white_jeans_sunny_terrace_1788743339895.jpg';
import jeansSunnyGardenImg from '../assets/images/model_jeans_sunny_palm_garden_1788743352587.jpg';
import resortChicImg from '../assets/images/resort_chic_hero_1788745334192.jpg';
import festiveBrunchImg from '../assets/images/festive_brunch_hero_1788745376178.jpg';
import blackModelHero from '../assets/images/black_model_hero_1788747095466.jpg';
import asianModelHero from '../assets/images/asian_model_hero_1788747108983.jpg';
import indianModelHero from '../assets/images/indian_model_hero_1788747121553.jpg';
import { CURATED_COLLECTIONS_DATA } from './collectionsData';
import resortHolidayImg from '../assets/images/resort_holiday_model_1788635741638.jpg';
import editorialCocktailImg from '../assets/images/cocktail_soiree_hero_1788745390554.jpg';

// 10 Newly generated high-fashion editorial hero slides with seated/lounging poses clearly displaying Stoffa shoes and bags
import stoffaMatureEditorialImg from '../assets/images/stoffa_seated_mature_palace_1788787848514.jpg';
import stoffaBlackModelImg from '../assets/images/stoffa_seated_black_terrace_1788787865296.jpg';
import stoffaAsianGalaImg from '../assets/images/stoffa_seated_asian_steps_1788787882526.jpg';
import stoffaLatinaResortImg from '../assets/images/stoffa_seated_latina_chaise_1788787897598.jpg';
import stoffaMatureChicImg from '../assets/images/stoffa_seated_mature_bench_1788787912992.jpg';
import stoffaFestiveSangeetImg from '../assets/images/stoffa_seated_festive_swing_1788787930351.jpg';
import stoffaRoyaleKaftanImg from '../assets/images/stoffa_seated_desert_kaftan_1788787963883.jpg';
import stoffaMotherDaughterImg from '../assets/images/stoffa_seated_mother_daughter_1788787982346.jpg';
import stoffaYachtCruiseImg from '../assets/images/stoffa_seated_yacht_deck_1788787996415.jpg';
import stoffaAsianResortImg from '../assets/images/stoffa_seated_asian_garden_1788788011021.jpg';

export interface HeroCollectionSlide {
  id: string;
  categoryTarget: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  taglines: string[];
  imageUrl: string;
  altText: string;
  category?: string;
  button1Text?: string;
  button1Target?: string;
  button2Text?: string;
  button2Target?: string;
}

export const HERO_15_COLLECTIONS: HeroCollectionSlide[] = [


  // 27. Palace Matriarch (Mature Indian Model - Royal Palace Courtyard)
  {
    id: 'palace-matriarch',
    categoryTarget: 'Mother of the Bride',
    badge: 'REGAL HERITAGE',
    title: 'Palace Matriarch',
    subtitle: 'Timeless Heritage & Poise',
    description: 'Distinguished mature elegance in ivory raw silk, wearing handcrafted champagne gold architectural wedges with an authentic Stoffa zardozi potli.',
    taglines: [
      'Handcrafted champagne-gold architectural Kolhapuri wedges with cushioned memory sole',
      'Authentic antique gold zardozi potli bag with delicate pearl bead tassels',
      'Refined comfort and composure engineered for grand wedding celebrations and hosting',
    ],
    imageUrl: stoffaMatureEditorialImg,
    altText: 'Stoffa Style - Elegant mature Indian model wearing handcrafted champagne gold architectural wedges and embroidered zardozi potli bag',
  },



  // 28. Amalfi Terrace (Black Model - Mediterranean Sunset)
  {
    id: 'amalfi-terrace',
    categoryTarget: 'High wedges - 3.5 inch',
    badge: 'RESORT EDIT 2026',
    title: 'Amalfi Terrace',
    subtitle: 'Sun-Drenched Coastal Glamour',
    description: 'Radiant bronze resort couture paired with handcrafted metallic gold Kolhapuri architectural wedges and a pure silk Stoffa potli bag.',
    taglines: [
      'Sculpted 3.5-inch architectural wedge incline with braided metallic toe loops',
      'Handcrafted pure silk potli bag adorned with gold bullion embroidery and pearl fringe',
      'Engineered for cliffside cocktail soirees and Mediterranean sunset galas',
    ],
    imageUrl: stoffaBlackModelImg,
    altText: 'Stoffa Style - Stunning Black model wearing handcrafted metallic gold architectural wedges and embroidered silk potli bag on sunlit coastal terrace',
  },



  // 29. Emerald Gala (East Asian Model - Gala Pavilion)
  {
    id: 'emerald-gala',
    categoryTarget: 'Higher wedge - 4.25 inch',
    badge: 'COUTURE GALA',
    title: 'Emerald Gala',
    subtitle: 'Architectural Stature & Drama',
    description: 'Couture emerald green silk styled with platinum pewter sculpted wedge heels with crystal baguettes, paired with a handcrafted Stoffa evening potli.',
    taglines: [
      'Platinum pewter metallic architectural wedges adorned with crystal baguettes',
      'Handcrafted metallic evening potli bag with zardozi embroidery and silk drawstring',
      'Red carpet presence designed for royal galas, galas, and ballroom celebrations',
    ],
    imageUrl: stoffaAsianGalaImg,
    altText: 'Stoffa Style - East Asian model in emerald silk gown wearing platinum pewter crystal architectural wedges and handcrafted evening potli',
  },



  // 30. Coastal Promenade (Latina Model - Mediterranean Villa)
  {
    id: 'coastal-bougainvillea',
    categoryTarget: 'Low wedges - 2.5 inch',
    badge: 'COASTAL RESORT',
    title: 'Coastal Promenade',
    subtitle: 'Effortless All-Day Elevation',
    description: 'Breezy cream linen resort tailoring paired with 2.5-inch rose gold low wedges and an authentic Stoffa handcrafted drawstring potli bag.',
    taglines: [
      'Artisanal rose-gold metallic 2.5-inch low wedges with braided leather toe loop',
      'Hand-embroidered champagne drawstring potli with delicate pearl bead tassels',
      'Featherlight dual-density footbed engineered for seaside promenades and destination luncheons',
    ],
    imageUrl: stoffaLatinaResortImg,
    altText: 'Stoffa Style - Latina model wearing handcrafted rose gold low wedges and zardozi potli bag on sunny coastal villa terrace',
  },



  // 31. Sculptural Atelier (Mature Woman - Gallery Terrace)
  {
    id: 'sculptural-atelier',
    categoryTarget: 'Block Heels',
    badge: 'CONTEMPORARY CLASSIC',
    title: 'Sculptural Atelier',
    subtitle: 'Distinguished Poise & Comfort',
    description: 'Bespoke ivory summer tailoring worn by an elegant mature woman, paired with Stoffa bronze metallic block heels and a handcrafted raw silk potli bag.',
    taglines: [
      'Architectural block heels with hand-braided metallic leather straps and wide stability',
      'Hand-embroidered raw silk potli bag with gold metallic bullion work and tassel tie',
      'Timeless high-society sophistication for gallery openings, luncheons, and receptions',
    ],
    imageUrl: stoffaMatureChicImg,
    altText: 'Stoffa Style - Sophisticated mature woman wearing bronze metallic block heels and handcrafted silk potli bag',
  },



  // 32. Courtyard Sangeet (Young Indian Model - Festive Celebration)
  {
    id: 'courtyard-sangeet',
    categoryTarget: 'Celebrations & Festive',
    badge: 'CELEBRATIONS & FESTIVE',
    title: 'Courtyard Sangeet',
    subtitle: 'Spirited Celebration & Dance',
    description: 'Vibrant celebratory couture paired with rose-gold metallic architectural wedges and an authentic Stoffa zardozi potli bag made to dance all night.',
    taglines: [
      'Engineered multi-layer memory comfort footbeds built for spins and high-energy dancing',
      'Luminous rose-gold and champagne metallic leathers with braided strap reinforcement',
      'Handcrafted zardozi potli bag swinging with delicate pearl tassels through every celebration',
    ],
    imageUrl: stoffaFestiveSangeetImg,
    altText: 'Stoffa Style - Joyful Indian model dancing at festive courtyard sangeet wearing rose gold wedges and embroidered potli',
  },


  {
    id: 'desert-palace-kaftan',
    categoryTarget: 'Red Carpet Ready',
    badge: 'GALA RADIANCE',
    title: 'Royal Desert Palace',
    subtitle: 'Lustrous Gold & Architecture',
    description: 'Opulent emerald and gold silk kaftan paired with sculpted champagne gold Kolhapuri wedges and an authentic Stoffa antique gold zardozi potli bag.',
    taglines: [
      'Sculpted champagne gold architectural Kolhapuri wedges with signature braided toe loop',
      'Authentic handcrafted antique gold zardozi potli bag with crystal embellishment',
      'Engineered to glide gracefully across marble palace courtyards and sunset terraces',
    ],
    imageUrl: stoffaRoyaleKaftanImg,
    altText: 'Stoffa Style - Middle Eastern model wearing champagne gold architectural wedges and antique gold potli bag in palace courtyard',
  },



  // 34. Generations of Grace (Mother & Daughter Duo - Villa Garden Wedding)
  {
    id: 'generation-duo',
    categoryTarget: 'Bride on Her Feet',
    badge: 'BRIDAL HERITAGE',
    title: 'Generations of Grace',
    subtitle: 'Mother & Daughter Bridal Edit',
    description: 'A timeless destination wedding portrait of mother and daughter, both wearing authentic Stoffa handcrafted footwear and carrying Stoffa artisanal potli bags.',
    taglines: [
      'Mother wearing cushioned ergonomic low wedges and daughter in architectural high wedges',
      'Both carrying matching handcrafted pure silk zardozi embroidered Stoffa potli bags',
      'Beloved bridal comfort engineered to dance from sacred vows to sunrise afterparties',
    ],
    imageUrl: stoffaMotherDaughterImg,
    altText: 'Stoffa Style - Mother and daughter wearing handcrafted Stoffa wedges and carrying authentic embroidered potlis on sunny villa lawn',
  },



  // 35. Riviera Yacht Deck (Black Model - Golden Hour Cruise)
  {
    id: 'riviera-yacht',
    categoryTarget: 'Cruise Ready',
    badge: 'YACHT & RESORT',
    title: 'Riviera Yacht Deck',
    subtitle: 'Sunset Cruise Edition',
    description: 'Glamorous ivory silk backless gown paired with mirror-finish gold metallic architectural wedges and a delicate Stoffa gold embroidered evening bag.',
    taglines: [
      'Mirror-finish gold metallic architectural wedges with non-slip base engineered for yacht decks',
      'Hand-embroidered metallic gold potli bag with zardozi needlework and pearl trim',
      'Effortless sunset luxury designed for teak decks, coastal cruises, and breezy evening galas',
    ],
    imageUrl: stoffaYachtCruiseImg,
    altText: 'Stoffa Style - Black model walking on teak yacht deck at sunset wearing gold metallic wedges and embroidered potli bag',
  },



  // 36. Botanical Sanctuary (East Asian Model - Modernist Villa)
  {
    id: 'botanical-villa',
    categoryTarget: 'Flats',
    badge: 'BOTANICAL RETREAT',
    title: 'Botanical Sanctuary',
    subtitle: 'Minimalist Resort Luxury',
    description: 'Clean modern resort tailoring styled with handcrafted champagne-gold braided wedge sandals and a handcrafted Stoffa metallic potli bag.',
    taglines: [
      'Handcrafted champagne-gold braided metallic wedge sandals with cushioned footbed',
      'Authentic Stoffa hand-embroidered metallic potli bag with bullion needlework and beaded fringe',
      'Serene minimalist luxury for sunlit botanical courtyards and tropical afternoons',
    ],
    imageUrl: stoffaAsianResortImg,
    altText: 'Stoffa Style - East Asian model in botanical villa courtyard wearing champagne wedge sandals and handcrafted potli bag',
  },




  // 1. Just In
  {
    id: 'just-in',
    categoryTarget: 'Just In',
    badge: 'JUST IN 2026',
    title: 'Just In',
    subtitle: 'The Spring-Summer Edit',
    description: 'Fresh architectural silhouettes hand-sculpted in luminous metallic leathers and braided straps.',
    taglines: [
      'Handcrafted silhouettes in buttery soft artisan metallic leathers',
      'Modern architectural high wedges with signature braided toe loop',
      'Engineered multi-layer memory comfort footbeds for 12+ hour wear',
    ],
    imageUrl: heroJustInImg,
    altText: 'Stoffa Style Just In - Model Wearing Handcrafted Metallic Kolhapuri Wedges in Villa Garden',
  },



  // 2. Shoes (All Handcrafted Footwear)
  {
    id: 'shoes',
    categoryTarget: 'Shoes',
    badge: 'SIGNATURE FOOTWEAR',
    title: 'Shoes',
    subtitle: 'Handcrafted Wedges & Flats',
    description: 'Iconic Kolhapuri silhouettes reimagined with ergonomic architectural wedges and hand-woven straps.',
    taglines: [
      'Authentic handcrafted Kolhapuri architectural wedges',
      'Master artisan braided metallic straps and sculpted heels',
      'Engineered for all-day weddings, galas, and resort living',
    ],
    imageUrl: modelShoesImg,
    altText: 'Stoffa Style Handcrafted Footwear - Model Wearing Champagne Gold Kolhapuri Wedges',
  },



  // 3. Low Wedges - 2.5 inch
  {
    id: 'low-wedges',
    categoryTarget: 'Low wedges - 2.5 inch',
    badge: '2.5 INCH SILHOUETTE',
    title: 'Low Wedges - 2.5"',
    subtitle: 'Effortless All-Day Elevation',
    description: 'The sweet spot of refined posture and 14-hour comfort, ideal for garden parties and dance floors.',
    taglines: [
      'Dual-density cushioned footbeds with 2.5-inch balanced incline',
      'Ideal for lawn weddings, pebble courtyards, and standing receptions',
      'Available in antique gold, rich bronze, champagne, and platinum pewter',
    ],
    imageUrl: lowWedgeGardenImg,
    altText: 'Stoffa Style Low Wedges 2.5 Inch - Model in Villa Garden Wearing Handcrafted Metallic Low Wedges',
  },



  // 4. High Wedges - 3.5 inch
  {
    id: 'high-wedges',
    categoryTarget: 'High wedges - 3.5 inch',
    badge: '3.5 INCH STATEMENT',
    title: 'High Wedges - 3.5"',
    subtitle: 'Architectural Stature & Drama',
    description: 'Sculpted pitch designed to lengthen your silhouette while distributing weight uniformly across the foot.',
    taglines: [
      'Sculpted 3.5-inch architectural incline with braided metallic toe loops',
      'Zero sinking into grass, gravel, or decking at destination events',
      'Signature hand-rubbed champagne, copper, and silver metallics',
    ],
    imageUrl: higherWedgeCoutureImg,
    altText: 'Stoffa Style High Wedges 3.5 Inch - Model in Champagne Gown Walking Down Steps in Architectural Wedges',
  },



  // 5. Higher Wedge - 4.25 inch
  {
    id: 'higher-wedge',
    categoryTarget: 'Higher wedge - 4.25 inch',
    badge: '4.25 INCH COUTURE',
    title: 'Higher Wedge - 4.25"',
    subtitle: 'Supreme Gala Elevation',
    description: 'Maximalist height met with cushioned forefoot platforms for runway posture and stability.',
    taglines: [
      '4.25-inch high-fashion stature with supportive platform incline',
      'Couture crystal baguettes and hand-set micro-zircon embellishments',
      'Red carpet presence designed to dance from aisle to late-night afterparty',
    ],
    imageUrl: higherWedgeCoutureImg,
    altText: 'Stoffa Style Higher Wedge 4.25 Inch - High Fashion Model in Crystal Couture Gown and Platform Wedges',
  },



  // 6. Block Heels
  {
    id: 'block-heels',
    categoryTarget: 'Block Heels',
    badge: 'ARTISANAL BLOCK HEELS',
    title: 'Block Heels',
    subtitle: 'Structured Luxury & Stability',
    description: 'Geometric sculpted block heels wrapped in braided metallic leathers and contrast accents.',
    taglines: [
      'Wide-base architectural stability for lawn receptions and cobblestones',
      'Supple metallic calf leathers with cushioned heel cradles',
      'Contemporary silhouettes celebrating classic artisan Kolhapuri craftsmanship',
    ],
    imageUrl: blockHeelsFashionImg,
    altText: 'Stoffa Style Block Heels - Model on Art Gallery Terrace in Metallic Kolhapuri Block Heels',
  },



  // 7. Flats & Loafers
  {
    id: 'flats',
    categoryTarget: 'Flats',
    badge: 'ARTISANAL FLATS',
    title: 'Flats & Loafers',
    subtitle: 'Featherlight Ease & Grace',
    description: 'Ground-skimming Kolhapuri flats and slides crafted with hand-stitched leather soles and woven details.',
    taglines: [
      'Ultra-flexible hand-stitched leather outsoles that contour to your step',
      'Delicate hand-braided thongs and crystal baguette accents',
      'Effortless luxury for tropical resorts, poolside lunches, and travel days',
    ],
    imageUrl: flatsResortModelImg,
    altText: 'Stoffa Style Flats - Model Relaxing at Luxury Coastal Resort in Metallic Flat Slides',
  },



  // 8. Bags & Potlis
  {
    id: 'bags',
    categoryTarget: 'Bags',
    badge: 'HAUTE COUTURE BAGS',
    title: 'Bags & Potlis',
    subtitle: 'Hand-Embroidered Zardozi Treasures',
    description: 'Opulent silk drawstrings adorned with centuries-old zardozi needlework, pearl drops, and crystal fringing.',
    taglines: [
      'Hand-embroidered pure silk drawstring potlis and structured clutches',
      'Artisanal antique bullion wire, micro-pearls, and semi-precious beads',
      'Matching colorways curated specifically for Stoffa metallic footwear',
    ],
    imageUrl: modelBagsImg,
    altText: 'Stoffa Style Luxury Handcrafted Bags - Model Holding Embellished Antique Zardozi Potli Bag',
  },



  // 9. Bride on Her Feet (Bridal Couture)
  {
    id: 'bride-on-her-feet',
    categoryTarget: 'Bride on Her Feet',
    badge: 'BRIDAL COUTURE',
    title: 'Bride on Her Feet',
    subtitle: 'Aisle to the After-Party',
    description: 'Engineered specifically for brides to stand radiant, poised, and ache-free through every sacred ritual.',
    taglines: [
      'Engineered for 14-hour wedding rituals, vows, and high-energy dance floors',
      'Crystal baguette crowns and champagne satin-wrapped wedge heels',
      'Beloved by over 10,000 brides across the globe since 2018',
    ],
    imageUrl: heroBridalImg,
    altText: 'Stoffa Style Bridal Couture - Bride Wearing Handcrafted Crystal Wedges',
  },



  // 10. Mother of the Bride
  {
    id: 'mother-of-the-bride',
    categoryTarget: 'Mother of the Bride',
    badge: 'CEREMONIAL LUXURY',
    title: 'Mother of the Bride',
    subtitle: 'Grace, Composure & All-Day Comfort',
    description: 'Impeccable low wedges and cushioned block heels designed for continuous hosting from morning till night.',
    taglines: [
      'Gentle ergonomic inclines and wide forefoot support for continuous hosting',
      'Rich antique gold, muted bronze, and rose champagne palettes',
      'Harmonizes flawlessly with silks, lehengas, and couture evening gowns',
    ],
    imageUrl: motherOfBrideImg,
    altText: 'Mother of the Bride - Mother in Silk Embroidered Gown Kissing Daughter in Bride Gown',
  },



  // 11. Red Carpet Ready
  {
    id: 'red-carpet-ready',
    categoryTarget: 'Red Carpet Ready',
    badge: 'GALA & CELEBRITY',
    title: 'Red Carpet Ready',
    subtitle: 'Flashbulb Radiance & Sculpted Posture',
    description: 'High-impact metallic lusters in pewter, liquid gold, and platinum engineered to catch every beam of light.',
    taglines: [
      'As worn by celebrity stylists and leading tastemakers at international galas',
      'Mirror-polished metallic finishes and architectural crystal heels',
      'Dramatic height with zero wobbling on marble or carpeted runways',
    ],
    imageUrl: redCarpetEntryImg,
    altText: 'Red Carpet Ready - Model Arriving in Liquid Gold Gown with Black Tie Entry and Flashbulbs',
  },



  // 12. Cruise Ready
  {
    id: 'cruise-ready',
    categoryTarget: 'Cruise Ready',
    badge: 'RESORT & TRAVEL',
    title: 'Cruise Ready',
    subtitle: 'Mediterranean Coast to Deck',
    description: 'Sun-drenched metallic sandals and light potlis crafted for seaside terraces, yacht decks, and breezy nights.',
    taglines: [
      'Artisanal braided leather sandals and resort-ready footwear',
      'Effortless luxury crafted for teak yacht decks & seaside promenades',
      'Non-slip rubber base soles designed for smooth marble and coastal terraces',
    ],
    imageUrl: heroCruiseImg,
    altText: 'Stoffa Style Cruise Ready - Model Wearing Handcrafted Metallic Resort Wedges',
  },



  // 13. Celebrations & Festive
  {
    id: 'celebrations',
    categoryTarget: 'The Sangeet Ceremony',
    badge: 'FESTIVE EDIT',
    title: 'Celebrations & Festive',
    subtitle: 'Sangeet, Cocktails & Soirees',
    description: 'High-energy footwear and radiant potlis created to spin, dance, and celebrate all night without fatigue.',
    taglines: [
      'Engineered for spins, jumps, and spirited celebration on the dance floor',
      'Sparkling zardozi tassels and hand-braided metallic strap reinforcement',
      'Vibrant celebratory tones designed for sangeets, cocktail soirees, and balls',
    ],
    imageUrl: celebrationFestiveImg,
    altText: 'Stoffa Style Celebrations - Model Laughing and Dancing at Festive Evening Sangeet Soiree',
  },



  // 14. Sale / Archive
  {
    id: 'sale',
    categoryTarget: 'Sale',
    badge: 'CURATED ARCHIVE',
    title: 'Sale',
    subtitle: 'Limited Archive Opportunities',
    description: 'Rare opportunity to acquire iconic handcrafted Stoffa silhouettes and metallic staples at privileged pricing.',
    taglines: [
      'Past-season collector silhouettes in coveted metallic leathers',
      'Strictly genuine handcrafted Stoffa artisan heritage',
      'Limited size runs available for immediate express dispatch',
    ],
    imageUrl: modelSaleImg,
    altText: 'Stoffa Style Sale - Model Seated Wearing Handcrafted Metallic Wedges in Stone Courtyard',
  },



  // 15. Ready to Ship
  {
    id: 'ready-to-ship',
    categoryTarget: 'Ready to Ship',
    badge: 'EXPRESS DISPATCH',
    title: 'Ready to Ship',
    subtitle: 'Dispatched Within 24-48 Hours',
    description: 'Pre-crafted bestsellers ready for your immediate celebration, emergency destination wedding, or upcoming holiday.',
    taglines: [
      'Fully finished, hand-inspected pieces ready for instant shipping',
      'Bestselling champagne, rose gold, and antique gold wedge sizes in stock',
      'Complimentary priority express packaging with Stoffa dustbags',
    ],
    imageUrl: modelReadyImg,
    altText: 'Stoffa Style Ready to Ship - Model in Courtyard with Handcrafted Clutch and Metallic Wedges',
  },



  // 16. Denim & Wedges (Casualwear in Sunny Boardwalk)
  {
    id: 'denim-wedges',
    categoryTarget: 'Shoes',
    badge: 'CASUAL LUXURY',
    title: 'Denim & Wedges',
    subtitle: 'The Spring-Summer Edit',
    description: 'Effortless casualwear pairing relaxed denim jeans with artisanal metallic Kolhapuri wedges in sun-drenched coastal daylight.',
    taglines: [
      'Signature handcrafted wedges effortlessly styled with denim jeans',
      'Engineered all-day cushioned pitch for sunny boardwalk strolls and weekend escapes',
      'Lustrous gold and champagne metallics meet laidback casual elegance',
    ],
    imageUrl: jeansSunnyBoardwalkImg,
    altText: 'Stoffa Style - Model in relaxed denim jeans and handcrafted gold Kolhapuri wedges on a bright sunny boardwalk',
  },



  // 17. Sunlit Terrace (White Denim in Mediterranean Sunshine)
  {
    id: 'sunlit-terrace',
    categoryTarget: 'Low wedges - 2.5 inch',
    badge: 'SUNNY ESCAPE',
    title: 'Sunlit Terrace',
    subtitle: 'The Mediterranean Edit',
    description: 'Crisp white cropped denim jeans paired with sculptural rose gold wedges on a bright sunny cliffside terrace overlooking the sea.',
    taglines: [
      'Lightweight dual-density footbed for effortless seaside strolls',
      'Rose gold and soft copper metallics tailored for sunny afternoons',
      'Subtle architectural elevation with serene comfort and generous stability',
    ],
    imageUrl: whiteJeansTerraceImg,
    altText: 'Stoffa Style - Model in white cropped denim jeans and rose gold wedge sandals on a sunny cliffside terrace',
  },



  // 18. Al Fresco Living (Denim Jeans at Sunny Outdoor Cafe)
  {
    id: 'sunny-cafe',
    categoryTarget: 'Flats',
    badge: 'AL FRESCO CHIC',
    title: 'Al Fresco Living',
    subtitle: 'Sun-Drenched Mornings',
    description: 'Relaxed blue denim jeans and handcrafted champagne Kolhapuri wedges for bright sunny cafe patios and leisurely al fresco dining.',
    taglines: [
      'Buttery soft artisanal leathers with flexible hand-stitched sole',
      'Effortless daytime style for sunlit outdoor dining and relaxed weekend catch-ups',
      'Understated luxury with delicate braided detailing and memory-foam ease',
    ],
    imageUrl: jeansSunnyCafeImg,
    altText: 'Stoffa Style - Model in jeans and champagne wedges seated at sun-drenched outdoor cafe patio',
  },



  // 19. Palm Grove Promenade (Flare Denim in Sunny Palm Garden)
  {
    id: 'palm-promenade',
    categoryTarget: 'Block Heels',
    badge: 'DAYTIME SOPHISTICATION',
    title: 'Palm Grove Promenade',
    subtitle: 'Sunny Garden Strolls',
    description: 'Casual flare denim jeans matched with structured bronze block heels along golden sunlit garden walkways.',
    taglines: [
      'Stable wide-base block heels designed for sunny garden walks, paths, and lawns',
      'Rich metallic tones catching natural golden sunshine and bright summer rays',
      'A modern contemporary twist on timeless Indian artisanal craftsmanship',
    ],
    imageUrl: jeansSunnyGardenImg,
    altText: 'Stoffa Style - Model in flare denim and bronze metallic heels walking along sunlit palm tree path',
  },



  // 20. Sunny Resort Chic (Sunny Coastline)
  {
    id: 'resort-chic',
    categoryTarget: 'Cruise Ready',
    badge: 'COASTAL LUXURY',
    title: 'Sunny Resort Chic',
    subtitle: 'Golden Hour Coastline',
    description: 'Breezy linen and handcrafted metallic slides for bright sunny oceanfront promenades and luxury resort living.',
    taglines: [
      'Breathable handcrafted materials built for coastal warmth and sunshine',
      'Non-skid rubber grip engineered for decks, boats, and sunny marble plazas',
      'Effortless sun-soaked style that flows from afternoon pool to sunset dinner',
    ],
    imageUrl: resortChicImg,
    altText: 'Stoffa Style - Model in breezy resort outfit and metallic flats in bright sunny coastal setting',
  },



  // 21. Festive Brunch (Sunlit Courtyard)
  {
    id: 'festive-brunch',
    categoryTarget: 'Low wedges - 2.5 inch',
    badge: 'COURTYARD BRUNCH',
    title: 'Festive Brunch',
    subtitle: 'Sunlit Courtyard Gatherings',
    description: 'Sun-kissed courtyard celebrations with lightweight metallic low wedges that balance glam with pure comfort.',
    taglines: [
      'Designed for hours of standing, mingling, and celebrating under the open sun',
      'Subtle metallic luster that glows in natural daylight and sunny receptions',
      'Memory foam comfort cradles your feet through long daytime festivities',
    ],
    imageUrl: festiveBrunchImg,
    altText: 'Stoffa Style - Model in chic summer attire wearing metallic wedges in sunlit courtyard',
  },



  // 22. Riviera Elegance (Black Model - Mediterranean Summer)
  {
    id: 'mediterranean-riviera',
    categoryTarget: 'High wedges - 3.5 inch',
    badge: 'RESORT COUTURE 2026',
    title: 'Riviera Elegance',
    subtitle: 'Mediterranean Summer Edit',
    description: 'Breezy cream resort linens paired with handcrafted gold metallic Kolhapuri wedges on sun-drenched coastal terraces.',
    taglines: [
      'Handcrafted architectural wedges in glowing champagne gold metallic leather',
      'Engineered memory foam footbeds ensuring effortless day-to-night coastal comfort',
      'Artisanal braided straps styled for sunlit seaside villas and sunset soirées',
    ],
    imageUrl: blackModelHero,
    altText: 'Stoffa Style - Black model wearing handcrafted gold metallic Kolhapuri wedges on sunny Mediterranean terrace',
  },



  // 23. Island Escape (Tropical Sunny Retreat)
  {
    id: 'resort-holiday',
    categoryTarget: 'Flats',
    badge: 'TROPICAL RETREAT',
    title: 'Island Escape',
    subtitle: 'Sun-Soaked Lounging',
    description: 'Featherlight flats and relaxed sandals made for sunny pool decks, palm terraces, and beachside villas.',
    taglines: [
      'Hand-stitched flexible soles for warm-weather ease and coastal relaxation',
      'Delicate metallic loops and cushioned insoles that pamper every step',
      'Packable lightweight luxury for your sunny holiday luggage and resort days',
    ],
    imageUrl: resortHolidayImg,
    altText: 'Stoffa Style - Model relaxing on sunny resort terrace wearing metallic handcrafted flats',
  },



  // 24. Modernist Pavilion (Asian Model - Sculptural Chic)
  {
    id: 'modernist-pavilion',
    categoryTarget: 'Shoes',
    badge: 'ARCHITECTURAL CHIC',
    title: 'Modernist Pavilion',
    subtitle: 'Sculptural Minimalist Edit',
    description: 'Sculptural champagne metallic Kolhapuri wedge sandals paired with an artisanal clutch in a sunlit architectural courtyard.',
    taglines: [
      'Architectural height with distributed weight balance for steady comfort',
      'Shimmering champagne and gold finishes glowing warmly in natural sunlight',
      'Seamlessly pairs with everything from minimalist silk to breezy resort tailoring',
    ],
    imageUrl: asianModelHero,
    altText: 'Stoffa Style - Asian model wearing champagne metallic Kolhapuri wedges with artisanal clutch in sunny courtyard',
  },



  // 25. Golden Hour Soirée (Sunlit Rooftop)
  {
    id: 'golden-hour-soiree',
    categoryTarget: 'Red Carpet Ready',
    badge: 'ROOFTOP GLAMOUR',
    title: 'Golden Hour Soirée',
    subtitle: 'Sun-Drenched Evenings',
    description: 'Catch the late-afternoon sun on open-air terraces in luminous metallic wedges and beaded clutches.',
    taglines: [
      'Radiant mirror-finish metallic leathers that catch the golden setting sun',
      'Cushioned multi-layer comfort through evening cocktails and lawn receptions',
      'Haute craftsmanship designed for memorable moments and glowing sunsets',
    ],
    imageUrl: editorialCocktailImg,
    altText: 'Stoffa Style - Model in chic cocktail attire on sunlit rooftop terrace overlooking the golden skyline',
  },



  // 26. Heritage Royale (Indian Model - Courtyard Celebration)
  {
    id: 'heritage-royale',
    categoryTarget: 'Bags',
    badge: 'HERITAGE COUTURE',
    title: 'Heritage Royale',
    subtitle: 'Courtyard Celebration Edit',
    description: 'Intricate antique gold handcrafted wedges paired with an artisanal hand-embroidered zardozi potli bag in glowing palace gardens.',
    taglines: [
      'Luminous antique gold craftsmanship meeting contemporary ergonomic wedge lasts',
      'Signature hand-embroidered zardozi potli bags crafted by master artisans',
      'Designed for celebratory Indian weddings, festive sangeets, and royal galas',
    ],
    imageUrl: indianModelHero,
    altText: 'Stoffa Style - Indian model wearing antique gold handcrafted wedges and embellished zardozi potli bag',
  },
];

/**
 * Finds the best matching Hero Collection item for any category title or slug.
 * Prioritizes the 15 Curated Collections from the sub menu with their dedicated 1 image.
 */
export function getHeroSlideForCategory(categoryTitle: string): HeroCollectionSlide {
  const norm = (categoryTitle || '').toLowerCase().trim();

  // 1. Check if matching any of the 15 Curated Collections sub-menu items directly
  const curatedMatch = CURATED_COLLECTIONS_DATA.find((c) => {
    const cTitle = c.title.toLowerCase().trim();
    return cTitle === norm || norm.includes(cTitle) || cTitle.includes(norm);
  });

  if (curatedMatch) {
    return {
      id: curatedMatch.id,
      categoryTarget: curatedMatch.title,
      title: curatedMatch.title,
      subtitle: curatedMatch.tagline,
      description: `${curatedMatch.tagline} Engineered with Stoffa's signature dual-density memory sole.`,
      taglines: [
        curatedMatch.shoeNote,
        `Artisanal Handcrafting • ${curatedMatch.theme.toUpperCase()}`,
        'Ergonomic memory comfort engineered for all-day celebrations',
      ],
      badge: curatedMatch.theme.toUpperCase(),
      imageUrl: curatedMatch.image,
      altText: `${curatedMatch.title} - ${curatedMatch.shoeNote}`,
      category: curatedMatch.title,
      button1Text: `Explore ${curatedMatch.title}`,
      button1Target: curatedMatch.title,
      button2Text: 'View Collections',
      button2Target: 'Collections',
    };
  }

  // 2. Direct matches for core department categories
  if (norm === 'just in' || norm === 'new arrivals' || norm === 'latest') {
    return HERO_15_COLLECTIONS[0];
  }
  if (norm === 'shoes' || norm === 'all shoes' || norm === 'footwear') {
    return HERO_15_COLLECTIONS[1];
  }
  if (norm.includes('2.5') || norm.includes('low wedge')) {
    return HERO_15_COLLECTIONS[2];
  }
  if (norm.includes('3.5') || norm.includes('high wedge')) {
    return HERO_15_COLLECTIONS[3];
  }
  if (norm.includes('4.25') || norm.includes('higher wedge')) {
    return HERO_15_COLLECTIONS[4];
  }
  if (norm.includes('block heel') || norm.includes('block')) {
    return HERO_15_COLLECTIONS[5];
  }
  if (norm.includes('flat') || norm.includes('loafer') || norm.includes('kolhapuri')) {
    return HERO_15_COLLECTIONS[6];
  }
  if (norm === 'bags' || norm.includes('bag') || norm.includes('potli') || norm.includes('clutch')) {
    return HERO_15_COLLECTIONS[7];
  }
  if (norm === 'sale' || norm.includes('archive') || norm.includes('discount')) {
    return HERO_15_COLLECTIONS[13];
  }
  if (norm.includes('ready to ship') || norm.includes('express') || norm.includes('ship')) {
    return HERO_15_COLLECTIONS[14];
  }
  if (norm.includes('denim') || norm.includes('jeans') || norm.includes('casual')) {
    return HERO_15_COLLECTIONS[15];
  }
  if (norm.includes('terrace') || norm.includes('sunlit')) {
    return HERO_15_COLLECTIONS[16];
  }
  if (norm.includes('cafe') || norm.includes('al fresco') || norm.includes('brunch')) {
    return HERO_15_COLLECTIONS[17];
  }

  // 3. Fallback: If no page exists, use sub menu in collections to create using 1 image
  const defaultCurated = CURATED_COLLECTIONS_DATA[0];
  return {
    id: defaultCurated.id,
    categoryTarget: categoryTitle || defaultCurated.title,
    title: categoryTitle || defaultCurated.title,
    subtitle: defaultCurated.tagline,
    description: `${defaultCurated.tagline} Handcrafted with ergonomic memory foam footbeds.`,
    taglines: [
      defaultCurated.shoeNote,
      'Artisanal Handcrafting • Mumbai Workshop',
      'Ergonomic memory comfort engineered for all-day celebrations',
    ],
    badge: 'CURATED COLLECTION',
    imageUrl: defaultCurated.image,
    altText: categoryTitle,
    category: categoryTitle,
    button1Text: `Explore ${categoryTitle}`,
    button1Target: categoryTitle,
    button2Text: 'View Collections',
    button2Target: 'Collections',
  };
}
