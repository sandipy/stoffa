// Complete dataset of all 28 hero & editorial images with editable text, suggested shoes, and suggested bags
// Supports local persistence, individual image downloads, and export to chat

import img01 from '../assets/images/stoffa_seated_mature_palace_1788787848514.jpg';
import img02 from '../assets/images/stoffa_seated_black_terrace_1788787865296.jpg';
import img03 from '../assets/images/stoffa_seated_asian_steps_1788787882526.jpg';
import img04 from '../assets/images/stoffa_seated_latina_chaise_1788787897598.jpg';
import img05 from '../assets/images/stoffa_seated_mature_bench_1788787912992.jpg';
import img06 from '../assets/images/stoffa_seated_festive_swing_1788787930351.jpg';
import img07 from '../assets/images/stoffa_seated_desert_kaftan_1788787963883.jpg';
import img08 from '../assets/images/stoffa_seated_mother_daughter_1788787982346.jpg';
import img09 from '../assets/images/stoffa_seated_yacht_deck_1788787996415.jpg';
import img10 from '../assets/images/stoffa_seated_asian_garden_1788788011021.jpg';
import img11 from '../assets/images/hero_just_in_stoffa_1788641110283.jpg';
import img12 from '../assets/images/hero_bridal_stoffa_1788641121017.jpg';
import img13 from '../assets/images/hero_cruise_stoffa_1788641132038.jpg';
import img14 from '../assets/images/shoes_hero_model_1788745307294.jpg';
import img15 from '../assets/images/bags_hero_model_1788745321490.jpg';
import img16 from '../assets/images/resort_chic_hero_1788745334192.jpg';
import img17 from '../assets/images/festive_brunch_hero_1788745376178.jpg';
import img18 from '../assets/images/cocktail_soiree_hero_1788745390554.jpg';
import img19 from '../assets/images/model_jeans_sunny_boardwalk_1788743314430.jpg';
import img20 from '../assets/images/model_jeans_sunny_cafe_1788743326809.jpg';
import img21 from '../assets/images/model_white_jeans_sunny_terrace_1788743339895.jpg';
import img22 from '../assets/images/model_jeans_sunny_palm_garden_1788743352587.jpg';
import img23 from '../assets/images/high_wedge_editorial_1788644931264.jpg';
import img24 from '../assets/images/higher_wedge_couture_1788644942844.jpg';
import img25 from '../assets/images/low_wedge_garden_1788644921598.jpg';
import img26 from '../assets/images/celebration_festive_1788644994416.jpg';
import img27 from '../assets/images/flats_resort_model_1788644983578.jpg';
import img28 from '../assets/images/block_heels_fashion_1788644965270.jpg';

// 5 Prom Night Couple Hero Images (16-18 yr old girl with boy, Stoffa footwear & bags)
import img29 from '../assets/images/prom_couple_ballroom_1788812966604.jpg';
import img30 from '../assets/images/prom_couple_terrace_1788812980283.jpg';
import img31 from '../assets/images/prom_couple_arrival_1788812994506.jpg';
import img32 from '../assets/images/prom_couple_garden_1788813008156.jpg';
import img33 from '../assets/images/prom_couple_rooftop_1788813022394.jpg';

// 5 Date Night Couple Hero Images (woman with man, Stoffa footwear & bags)
import img34 from '../assets/images/date_couple_skyline_1788813036430.jpg';
import img35 from '../assets/images/date_couple_speakeasy_1788813049777.jpg';
import img36 from '../assets/images/date_couple_courtyard_1788813064902.jpg';
import img37 from '../assets/images/date_couple_marina_1788813078148.jpg';
import img38 from '../assets/images/date_couple_fireside_1788813088632.jpg';

export interface HeroImagePairingItem {
  id: string;
  number: number;
  cleanFilename: string;
  rawFilename: string;
  imageSrc: string;
  category: 'Seated Hero' | 'Flagship Hero' | 'Denim & Casual' | 'Catalog & Editorial' | 'Prom & Date Night';
  title: string;
  subtitle: string;
  description: string;
  suggestedShoes: string;
  suggestedBag: string;
  shoesUrl?: string;
  bagUrl?: string;
  visualNotes: string;
  aspectRatio: string;
}

export const DEFAULT_HERO_PAIRINGS: HeroImagePairingItem[] = [
  {
    id: 'pairing-01',
    number: 1,
    cleanFilename: '01_Palace_Matriarch_Indian_Model.jpg',
    rawFilename: 'stoffa_seated_mature_palace_1788787848514.jpg',
    imageSrc: img01,
    category: 'Seated Hero',
    title: 'Palace Matriarch — Imperial Courtyard',
    subtitle: 'Royal Wedding & Courtyard Elegance',
    description: 'Mature Indian model seated on carved palace courtyard stairs with feet forward, showcasing handcrafted crystal-embellished champagne Kolhapuri wedges (no bag paired).',
    suggestedShoes: 'Crystal High K Wedge Champagne',
    suggestedBag: '__none___',
    shoesUrl: 'https://stoffastyle.com/products/embellished-3-5-inch-high-wedge-champagne',
    bagUrl: '',
    visualNotes: 'Seated pose, feet clearly visible on steps, ivory raw silk attire with champagne accents.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-02',
    number: 2,
    cleanFilename: '02_Amalfi_Terrace_Black_Model.jpg',
    rawFilename: 'stoffa_seated_black_terrace_1788787865296.jpg',
    imageSrc: img02,
    category: 'Seated Hero',
    title: 'Amalfi Terrace — Cliffside Lounge',
    subtitle: 'Mediterranean Sunset & Gold Allure',
    description: 'Black model seated on sunlit stone terrace with feet extended forward, metallic gold wedges and embroidered silk potli resting beside.',
    suggestedShoes: 'Classic High K Wedge Gold',
    suggestedBag: 'Border Clutch Bag Gold',
    visualNotes: 'Golden hour coastal light, bronze resort couture, legs extended with clear view of slip-on wedge.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-03',
    number: 3,
    cleanFilename: '03_Emerald_Gala_East_Asian_Model.jpg',
    rawFilename: 'stoffa_seated_asian_steps_1788787882526.jpg',
    imageSrc: img03,
    category: 'Seated Hero',
    title: 'Emerald Gala — Grand Limestone Steps',
    subtitle: 'Haute Evening & Platinum Contrast',
    description: 'East Asian model in emerald couture seated on wide limestone steps with shoes clearly visible and metallic evening potli.',
    suggestedShoes: 'Classic High K Wedge Slate',
    suggestedBag: 'Embellished Potli Bag Pewter',
    visualNotes: 'Deep emerald silk gown, platinum pewter crystal wedge sandals resting on lower stair tread.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-04',
    number: 4,
    cleanFilename: '04_Coastal_Promenade_Latina_Model.jpg',
    rawFilename: 'stoffa_seated_latina_chaise_1788787897598.jpg',
    imageSrc: img04,
    category: 'Seated Hero',
    title: 'Coastal Promenade — Teak Daybed',
    subtitle: 'Resort Lounging & Rose Gold Shimmer',
    description: 'Latina resort model lounging on teak outdoor daybed with bougainvillea, showing 2.5-inch rose gold low wedges & champagne drawstring potli.',
    suggestedShoes: 'Bridal Border High Wedge - Rose Gold',
    suggestedBag: 'Embellished Potli Bag Rose Gold',
    visualNotes: 'Relaxed resort lounging, bare ankles, bougainvillea background, matching drawstring bag.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-05',
    number: 5,
    cleanFilename: '05_Sculptural_Atelier_Mature_Woman.jpg',
    rawFilename: 'stoffa_seated_mature_bench_1788787912992.jpg',
    imageSrc: img05,
    category: 'Seated Hero',
    title: 'Sculptural Atelier — Olive Garden Bench',
    subtitle: 'Architectural Tailoring & Timeless Poise',
    description: 'Distinguished mature woman in ivory tailoring seated on bench with ankles crossed, showing bronze block heels & raw silk potli.',
    suggestedShoes: 'Classic High K Wedge Champagne',
    suggestedBag: 'Border Flat Bag Gold',
    visualNotes: 'Tailored ivory pantsuit, crossed ankles showing architectural heel support, raw silk bag.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-06',
    number: 6,
    cleanFilename: '06_Courtyard_Sangeet_Festive_Model.jpg',
    rawFilename: 'stoffa_seated_festive_swing_1788787930351.jpg',
    imageSrc: img06,
    category: 'Seated Hero',
    title: 'Courtyard Sangeet — Celebratory Step',
    subtitle: 'Festive Vibrance & Pearl Accents',
    description: 'Joyful Indian model seated on carved courtyard step showing rose-gold metallic architectural wedges & swinging pearl-tassel potli.',
    suggestedShoes: 'Classic High K Wedge Rose Gold',
    suggestedBag: 'Embellished Potli Bag Rose Gold',
    visualNotes: 'Festive sangeet scene, marigold accents, feet forward displaying metallic braided strap.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-07',
    number: 7,
    cleanFilename: '07_Royal_Desert_Palace_Kaftan.jpg',
    rawFilename: 'stoffa_seated_desert_kaftan_1788787963883.jpg',
    imageSrc: img07,
    category: 'Seated Hero',
    title: 'Royal Desert Palace — Floor Cushions',
    subtitle: 'Regal Opulence & Emerald Drapes',
    description: 'Middle Eastern model in emerald silk kaftan seated on velvet palace floor cushions with legs forward, showing champagne Kolhapuri wedges & antique gold potli.',
    suggestedShoes: 'Classic High K Wedge Antique gold',
    suggestedBag: 'Embellished Potli Bag Antique',
    visualNotes: 'Lounge floor cushions, silk kaftan hem draped to showcase champagne wedge sandal & antique potli.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-08',
    number: 8,
    cleanFilename: '08_Generations_Of_Grace_Mother_Daughter.jpg',
    rawFilename: 'stoffa_seated_mother_daughter_1788787982346.jpg',
    imageSrc: img08,
    category: 'Seated Hero',
    title: 'Generations of Grace — Villa Lawn Steps',
    subtitle: 'Heirloom Craftsmanship across Generations',
    description: 'Mother and daughter seated side-by-side on garden steps with both pairs of handcrafted wedges and matching potlis resting on lower step.',
    suggestedShoes: 'Classic High K Wedge Champagne & Slate',
    suggestedBag: 'Embellished Potli Bag Antique & Rose Gold',
    visualNotes: 'Dual models seated together: mother in ergonomic low wedge, daughter in high bridal wedge.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-09',
    number: 9,
    cleanFilename: '09_Riviera_Yacht_Deck_Black_Model.jpg',
    rawFilename: 'stoffa_seated_yacht_deck_1788787996415.jpg',
    imageSrc: img09,
    category: 'Seated Hero',
    title: 'Riviera Yacht Deck — Sun Lounger',
    subtitle: 'High Seas Glamour & Mirror Metallics',
    description: 'Black model seated on yacht teak lounger with feet extended forward, displaying mirror-finish gold metallic wedges & evening potli.',
    suggestedShoes: 'Classic High K Wedge Gold',
    suggestedBag: 'Border Clutch Bag Gold',
    visualNotes: 'Teak yacht deck, white backless gown, sun lounger pose showing mirror gold footbed.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-10',
    number: 10,
    cleanFilename: '10_Botanical_Sanctuary_East_Asian.jpg',
    rawFilename: 'stoffa_seated_asian_garden_1788788011021.jpg',
    imageSrc: img10,
    category: 'Seated Hero',
    title: 'Botanical Sanctuary — Terrace Wall',
    subtitle: 'Minimalist Sanctuary & Braided Comfort',
    description: 'East Asian model seated on limestone terrace wall with legs crossed forward, showing champagne braided wedge sandals & metallic potli.',
    suggestedShoes: 'Classic High K Wedge Champagne',
    suggestedBag: 'Border Flat Bag Gold',
    visualNotes: 'Tropical foliage, minimalist linen set, seated wall pose with clear focus on cushioned footwear.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-11',
    number: 11,
    cleanFilename: '11_Flagship_Just_In_Arrivals.jpg',
    rawFilename: 'hero_just_in_stoffa_1788641110283.jpg',
    imageSrc: img11,
    category: 'Flagship Hero',
    title: 'Flagship Just In — Signature Kolhapuris',
    subtitle: 'Just In Showcase',
    description: 'Flagship arrival slide featuring champagne gold architectural Kolhapuri wedges and pearl zardozi potli.',
    suggestedShoes: 'Classic High K Wedge Gold',
    suggestedBag: 'Embellished Potli Bag Rose Gold',
    visualNotes: 'Wide flagship banner framing new collection highlights.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-12',
    number: 12,
    cleanFilename: '12_Flagship_Bridal_Couture.jpg',
    rawFilename: 'hero_bridal_stoffa_1788641121017.jpg',
    imageSrc: img12,
    category: 'Flagship Hero',
    title: 'Bridal Couture — Golden Elegance',
    subtitle: 'Couture Wedding Edit',
    description: 'Bridal collection hero featuring gold crystal embellished architectural bridal wedges and silk drawstring potli.',
    suggestedShoes: 'Bridal Border High Wedge - Rose Gold',
    suggestedBag: 'Border Clutch Bag Gold',
    visualNotes: 'Warm golden wedding atelier atmosphere with bridal gown details.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-13',
    number: 13,
    cleanFilename: '13_Flagship_Cruise_Resort.jpg',
    rawFilename: 'hero_cruise_stoffa_1788641132038.jpg',
    imageSrc: img13,
    category: 'Flagship Hero',
    title: 'Cruise Ready — Resort Glamour',
    subtitle: 'Destination Luxury',
    description: 'Resort and cruise collection hero showing metallic wedge sandals on sunlit terrace.',
    suggestedShoes: 'Classic High K Wedge Champagne',
    suggestedBag: 'Border Flat Bag Gold',
    visualNotes: 'Sun-drenched outdoor resort terrace with vacation styling.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-14',
    number: 14,
    cleanFilename: '14_Shoes_Catalog_Hero_Model.jpg',
    rawFilename: 'shoes_hero_model_1788745307294.jpg',
    imageSrc: img14,
    category: 'Catalog & Editorial',
    title: 'Footwear Collection Model Edit',
    subtitle: 'Handcrafted Footwear Archive',
    description: 'Editorial showcase of Stöffa handcrafted footwear in natural sunlight.',
    suggestedShoes: 'Classic High K Wedge Antique gold',
    suggestedBag: 'Border Clutch Bag Gold',
    visualNotes: 'Catalog hero framing full footwear silhouettes and artisanal braiding.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-15',
    number: 15,
    cleanFilename: '15_Bags_Catalog_Hero_Model.jpg',
    rawFilename: 'bags_hero_model_1788745321490.jpg',
    imageSrc: img15,
    category: 'Catalog & Editorial',
    title: 'Artisanal Handbags & Potlis',
    subtitle: 'Hand-Embellished Evening Bags',
    description: 'Editorial showcase of Stöffa handcrafted zardozi bags with pearl tassels.',
    suggestedShoes: 'Bridal Border High Wedge - Rose Gold',
    suggestedBag: 'Embellished Potli Bag Pewter',
    visualNotes: 'Close detail of metallic embroidery, drawstring tassels, and clutch structure.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-16',
    number: 16,
    cleanFilename: '16_Resort_Chic_Hero_Model.jpg',
    rawFilename: 'resort_chic_hero_1788745334192.jpg',
    imageSrc: img16,
    category: 'Catalog & Editorial',
    title: 'Resort Chic & Golden Hour',
    subtitle: 'Effortless Summer Sophistication',
    description: 'Sun-drenched model edit pairing resort slip-on sandals with evening clutches.',
    suggestedShoes: 'Classic High K Wedge Slate',
    suggestedBag: 'Border Flat Bag Gold',
    visualNotes: 'Airy linen dresses paired with metallic footwear for vacation getaways.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-17',
    number: 17,
    cleanFilename: '17_Festive_Brunch_Hero_Model.jpg',
    rawFilename: 'festive_brunch_hero_1788745376178.jpg',
    imageSrc: img17,
    category: 'Catalog & Editorial',
    title: 'Festive Brunch & Day Occasions',
    subtitle: 'Daytime Celebration Edit',
    description: 'Golden morning light editorial showcasing lightweight low wedges and daytime potli bags.',
    suggestedShoes: 'Classic High K Wedge Champagne',
    suggestedBag: 'Embellished Potli Bag Rose Gold',
    visualNotes: 'Bright morning natural lighting, garden brunch setting.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-18',
    number: 18,
    cleanFilename: '18_Cocktail_Soiree_Hero_Model.jpg',
    rawFilename: 'cocktail_soiree_hero_1788745390554.jpg',
    imageSrc: img18,
    category: 'Catalog & Editorial',
    title: 'Cocktail Soirée & Evening Glamour',
    subtitle: 'Black Tie & Rooftop Aperitivos',
    description: 'Midnight glamorous editorial highlighting high-wedge arches and crystal clutches.',
    suggestedShoes: 'Classic High K Wedge Gold',
    suggestedBag: 'Border Clutch Bag Gold',
    visualNotes: 'Nocturnal rooftop party lighting, high-contrast metallic shine.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-19',
    number: 19,
    cleanFilename: '19_Sunny_Boardwalk_Denim_Hero.jpg',
    rawFilename: 'model_jeans_sunny_boardwalk_1788743314430.jpg',
    imageSrc: img19,
    category: 'Denim & Casual',
    title: 'Sunny Boardwalk — Casual Denim Edit',
    subtitle: 'Everyday Luxury & Casual Ease',
    description: 'Model in relaxed denim and white blouse walking on boardwalk wearing comfortable Kolhapuri flats.',
    suggestedShoes: 'Classic High K Wedge Slate',
    suggestedBag: 'Border Flat Bag Gold',
    visualNotes: 'Light blue jeans, sunny ocean promenade, casual street styling.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-20',
    number: 20,
    cleanFilename: '20_Sunny_Cafe_Denim_Hero.jpg',
    rawFilename: 'model_jeans_sunny_cafe_1788743326809.jpg',
    imageSrc: img20,
    category: 'Denim & Casual',
    title: 'Sunny Sidewalk Café — Denim & Wedges',
    subtitle: 'Al Fresco Lunches & Weekend Chic',
    description: 'Model in blue jeans seated at outdoor European café with metallic slip-on wedges visible.',
    suggestedShoes: 'Classic High K Wedge Champagne',
    suggestedBag: 'Border Clutch Bag Gold',
    visualNotes: 'Outdoor café bistro table, iced drink, relaxed jeans with metallic shoes.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-21',
    number: 21,
    cleanFilename: '21_White_Jeans_Terrace_Hero.jpg',
    rawFilename: 'model_white_jeans_sunny_terrace_1788743339895.jpg',
    imageSrc: img21,
    category: 'Denim & Casual',
    title: 'White Denim Sun Terrace',
    subtitle: 'Monochrome Resort Casual',
    description: 'Model in white denim and linen on sunny terrace showcasing metallic wedge sandals.',
    suggestedShoes: 'Classic High K Wedge Rose Gold',
    suggestedBag: 'Embellished Potli Bag Antique',
    visualNotes: 'Crisp white denim trousers, gold metallic accents, sunny Mediterranean patio.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-22',
    number: 22,
    cleanFilename: '22_Palm_Garden_Denim_Hero.jpg',
    rawFilename: 'model_jeans_sunny_palm_garden_1788743352587.jpg',
    imageSrc: img22,
    category: 'Denim & Casual',
    title: 'Palm Garden — Casual Luxe',
    subtitle: 'Subtropical Oasis & Metallic Accents',
    description: 'Sunlit garden setting featuring relaxed denim and golden Kolhapuri wedges.',
    suggestedShoes: 'Classic High K Wedge Gold',
    suggestedBag: 'Border Flat Bag Gold',
    visualNotes: 'Lush green palms, casual denim, vibrant outdoor warmth.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-23',
    number: 23,
    cleanFilename: '23_High_Wedge_Editorial.jpg',
    rawFilename: 'high_wedge_editorial_1788644931264.jpg',
    imageSrc: img23,
    category: 'Catalog & Editorial',
    title: 'High Wedge Architectural Arches',
    subtitle: 'Statement Silhouette Edit',
    description: 'Editorial spotlight on 3.5-inch cushioned architectural wedges.',
    suggestedShoes: 'Bridal Border High Wedge - Rose Gold',
    suggestedBag: 'Border Clutch Bag Gold',
    visualNotes: 'Close elevation shot of 3.5-inch wedge profile with memory foam bed.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-24',
    number: 24,
    cleanFilename: '24_Higher_Wedge_Couture.jpg',
    rawFilename: 'higher_wedge_couture_1788644942844.jpg',
    imageSrc: img24,
    category: 'Catalog & Editorial',
    title: 'Higher Wedge Red Carpet Couture',
    subtitle: 'Maximum Height with Dual-Density Foam',
    description: 'High-elevation bridal and gala wedge silhouette.',
    suggestedShoes: 'Classic High K Wedge Gold',
    suggestedBag: 'Embellished Potli Bag Pewter',
    visualNotes: 'Statuesque elevation, red carpet dress draping, gold footbed support.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-25',
    number: 25,
    cleanFilename: '25_Low_Wedge_Garden.jpg',
    rawFilename: 'low_wedge_garden_1788644921598.jpg',
    imageSrc: img25,
    category: 'Catalog & Editorial',
    title: 'Low Wedge Garden & All-Day Comfort',
    subtitle: '2-Inch Dual-Density Comfort',
    description: 'Everyday 2-inch low wedge in champagne metallic leather.',
    suggestedShoes: 'Classic High K Wedge Champagne',
    suggestedBag: 'Border Flat Bag Gold',
    visualNotes: 'Gentle 2-inch elevation suited for garden walks, cobbles, and day events.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-26',
    number: 26,
    cleanFilename: '26_Celebration_Festive.jpg',
    rawFilename: 'celebration_festive_1788644994416.jpg',
    imageSrc: img26,
    category: 'Catalog & Editorial',
    title: 'Celebration & Sangeet Nights',
    subtitle: 'Festive Sparkle & Dance Comfort',
    description: 'Festive dance-floor ready footwear with non-slip grip.',
    suggestedShoes: 'Gota Border High K Wedge Silver',
    suggestedBag: 'Embellished Potli Bag Rose Gold',
    visualNotes: 'Sparkling festive attire, energetic celebration ambiance.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-27',
    number: 27,
    cleanFilename: '27_Flats_Resort_Model.jpg',
    rawFilename: 'flats_resort_model_1788644983578.jpg',
    imageSrc: img27,
    category: 'Catalog & Editorial',
    title: 'Artisanal Kolhapuri Flats',
    subtitle: 'Zero-Heel Handcrafted Heritage',
    description: 'Traditional hand-braided Kolhapuri flats with memory foam footbeds.',
    suggestedShoes: 'Classic High K Wedge Slate',
    suggestedBag: 'Border Flat Bag Gold',
    visualNotes: 'Flat profile, intricate toe ring loop and hand-stitched strap.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-28',
    number: 28,
    cleanFilename: '28_Block_Heels_Fashion.jpg',
    rawFilename: 'block_heels_fashion_1788644965270.jpg',
    imageSrc: img28,
    category: 'Catalog & Editorial',
    title: 'Architectural Block Heel Edit',
    subtitle: 'Contemporary Stable Elevation',
    description: 'Modern geometric block heels for corporate and evening versatile wear.',
    suggestedShoes: 'Classic High K Wedge Champagne',
    suggestedBag: 'Border Clutch Bag Gold',
    visualNotes: 'Geometric block heel, structured lines, versatile transitional style.',
    aspectRatio: '16:9 Landscape',
  },
  // 29-33: Prom Night Couple Options (16-18 yr old girl with boy, Stoffa footwear & bags)
  {
    id: 'pairing-29',
    number: 29,
    cleanFilename: '29_Prom_Couple_Grand_Ballroom.jpg',
    rawFilename: 'prom_couple_ballroom_1788812966604.jpg',
    imageSrc: img29,
    category: 'Prom & Date Night',
    title: 'Prom Night Couple — Grand Ballroom Chandelier',
    subtitle: 'High School Prom Glamour & Formal Tuxedo Poise',
    description: '17-year-old girl in emerald satin gown showing Stoffa champagne gold crystal wedges and holding an embroidered metallic clutch, posing with her prom date boy in black tuxedo and handcrafted Stoffa suede loafers.',
    suggestedShoes: 'Crystal High K Wedge Champagne',
    suggestedBag: 'Border Clutch Bag Gold',
    shoesUrl: 'https://stoffastyle.com/products/embellished-3-5-inch-high-wedge-champagne',
    bagUrl: 'https://stoffastyle.com/products/border-clutch-bag-gold',
    visualNotes: 'Opulent ballroom, marble pillars, emerald gown with high slit showing crystal wedge, black tuxedo date.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-30',
    number: 30,
    cleanFilename: '30_Prom_Couple_Estate_Terrace.jpg',
    rawFilename: 'prom_couple_terrace_1788812980283.jpg',
    imageSrc: img30,
    category: 'Prom & Date Night',
    title: 'Prom Night Couple — Golden Hour Estate Terrace',
    subtitle: 'Sunset Twilight & Tulle Romance',
    description: '18-year-old girl in blush pink tiered tulle prom dress with rose-gold metallic Stoffa architectural wedges and beaded wristlet bag, standing with her prom date in navy tuxedo and Stoffa suede loafers.',
    suggestedShoes: 'Classic High K Wedge Rose Gold',
    suggestedBag: 'Embellished Potli Bag Rose Gold',
    shoesUrl: 'https://stoffastyle.com/products/classic-high-k-wedge-rose-gold',
    bagUrl: 'https://stoffastyle.com/products/embellished-potli-bag-rose-gold',
    visualNotes: 'Estate balustrade at golden hour, fairy lights, blush tulle dress, navy tuxedo, soft twilight.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-31',
    number: 31,
    cleanFilename: '31_Prom_Couple_Red_Carpet_Arrival.jpg',
    rawFilename: 'prom_couple_arrival_1788812994506.jpg',
    imageSrc: img31,
    category: 'Prom & Date Night',
    title: 'Prom Night Couple — Red Carpet Gala Entrance',
    subtitle: 'VIP Arrival & Flashbulb Allure',
    description: '17-year-old girl in sapphire sequin prom gown showing pewter crystal wedges and holding a zardozi clutch, with prom date boy in ivory dinner jacket and Stoffa leather loafers.',
    suggestedShoes: 'Crystal High K Wedge Silver',
    suggestedBag: 'Embellished Potli Bag Pewter',
    shoesUrl: 'https://stoffastyle.com/products/crystal-high-k-wedge-silver',
    bagUrl: 'https://stoffastyle.com/products/embellished-potli-bag-pewter',
    visualNotes: 'Red carpet arrival, flashbulbs, sequin gown, ivory dinner jacket, handcrafted luxury shoes.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-32',
    number: 32,
    cleanFilename: '32_Prom_Couple_Botanical_Garden.jpg',
    rawFilename: 'prom_couple_garden_1788813008156.jpg',
    imageSrc: img32,
    category: 'Prom & Date Night',
    title: 'Prom Night Couple — Fairy-Lit Conservatory',
    subtitle: 'Glasshouse Glow & Chiffon Grace',
    description: '18-year-old girl in lilac chiffon dress wearing champagne floral-embroidered wedges and carrying a pearl-tassel potli, with prom date boy in charcoal tuxedo and Stoffa loafers.',
    suggestedShoes: 'Classic Low K Wedge Champagne (2.5 Inch)',
    suggestedBag: 'Pearl Tassel Evening Potli Champagne',
    shoesUrl: 'https://stoffastyle.com/products/classic-low-k-wedge-champagne-2-5-inch',
    bagUrl: 'https://stoffastyle.com/products/pearl-tassel-evening-potli-champagne',
    visualNotes: 'Botanical greenhouse, string lights, lilac chiffon gown, charcoal tuxedo with boutonnière.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-33',
    number: 33,
    cleanFilename: '33_Prom_Couple_Rooftop_Skyline.jpg',
    rawFilename: 'prom_couple_rooftop_1788813022394.jpg',
    imageSrc: img33,
    category: 'Prom & Date Night',
    title: 'Prom Night Couple — Starlit City Skyline',
    subtitle: 'Midnight Celebration & High-Rise Views',
    description: '17-year-old girl in ruby red satin dress showing sculptural antique gold wedges with metallic envelope clutch, with prom date boy in velvet dinner jacket and Stoffa leather loafers.',
    suggestedShoes: 'Classic High K Wedge Antique gold',
    suggestedBag: 'Border Flat Bag Gold',
    shoesUrl: 'https://stoffastyle.com/products/classic-high-k-wedge-antique-gold',
    bagUrl: 'https://stoffastyle.com/products/border-flat-bag-gold',
    visualNotes: 'Glittering city skyline rooftop, ruby red satin gown, velvet tuxedo jacket, festive confetti.',
    aspectRatio: '16:9 Landscape',
  },
  // 34-38: Date Night Couple Options (woman with man, Stoffa footwear & bags)
  {
    id: 'pairing-34',
    number: 34,
    cleanFilename: '34_Date_Couple_Skyline_Penthouse.jpg',
    rawFilename: 'date_couple_skyline_1788813036430.jpg',
    imageSrc: img34,
    category: 'Prom & Date Night',
    title: 'Date Night Couple — Penthouse Rooftop Lounge',
    subtitle: 'City Skyline Toast & Strappy Wedges',
    description: 'Couple toasting at candlelit penthouse terrace; woman in black slip dress with champagne wedges and metallic clutch; man in navy blazer with Stoffa suede Belgian loafers.',
    suggestedShoes: 'Classic High K Wedge Champagne',
    suggestedBag: 'Border Clutch Bag Gold',
    shoesUrl: 'https://stoffastyle.com/products/classic-high-k-wedge-champagne',
    bagUrl: 'https://stoffastyle.com/products/border-clutch-bag-gold',
    visualNotes: 'Candlelit rooftop, panoramic skyline bokeh, wine glasses, black silk slip dress, navy blazer.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-35',
    number: 35,
    cleanFilename: '35_Date_Couple_Velvet_Speakeasy.jpg',
    rawFilename: 'date_couple_speakeasy_1788813049777.jpg',
    imageSrc: img35,
    category: 'Prom & Date Night',
    title: 'Date Night Couple — Intimate Velvet Speakeasy',
    subtitle: 'Cocktail Conversations & Mules',
    description: 'Couple in moody amber velvet speakeasy booth; woman in emerald velvet cocktail dress with sculptural wedge mules & embroidered potli bag; man in bespoke blazer with Stoffa calfskin loafers.',
    suggestedShoes: 'Classic High K Wedge Slate',
    suggestedBag: 'Embellished Potli Bag Black',
    shoesUrl: 'https://stoffastyle.com/products/classic-high-k-wedge-slate',
    bagUrl: 'https://stoffastyle.com/products/embellished-potli-bag-black',
    visualNotes: 'Amber velvet booth, brass lighting, craft cocktails, sculptural metallic mules, bespoke blazer.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-36',
    number: 36,
    cleanFilename: '36_Date_Couple_Courtyard_Bistro.jpg',
    rawFilename: 'date_couple_courtyard_1788813064902.jpg',
    imageSrc: img36,
    category: 'Prom & Date Night',
    title: 'Date Night Couple — Lantern-Lit Bistro Courtyard',
    subtitle: 'Cobblestone Romance & Block Heels',
    description: 'Romantic European cobblestone courtyard; woman in terracotta silk dress with bronze block heel wedges & woven clutch; man in linen jacket with Stoffa suede loafers.',
    suggestedShoes: 'Architectural Block Heel Gold (3.0 Inch)',
    suggestedBag: 'Border Flat Bag Gold',
    shoesUrl: 'https://stoffastyle.com/products/architectural-block-heel-gold-3-inch',
    bagUrl: 'https://stoffastyle.com/products/border-flat-bag-gold',
    visualNotes: 'Cobblestone courtyard, hanging bistro lights, terracotta silk dress, beige linen jacket.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-37',
    number: 37,
    cleanFilename: '37_Date_Couple_Sunset_Marina.jpg',
    rawFilename: 'date_couple_marina_1788813078148.jpg',
    imageSrc: img37,
    category: 'Prom & Date Night',
    title: 'Date Night Couple — Sunset Yacht Harbor Pier',
    subtitle: 'Golden Hour Promenade & Braided Wedges',
    description: 'Strolling hand-in-hand along luxury yacht marina promenade; woman in champagne silk gown with gold braided wedges; man in navy linen blazer with Stoffa nubuck loafers.',
    suggestedShoes: 'Classic Low K Wedge Gold (2.5 Inch)',
    suggestedBag: 'Zardozi Heritage Bag Gold',
    shoesUrl: 'https://stoffastyle.com/products/classic-low-k-wedge-gold-2-5-inch',
    bagUrl: 'https://stoffastyle.com/products/zardozi-heritage-bag-gold',
    visualNotes: 'Marina pier, golden hour water reflections, champagne gown, navy linen blazer, handcrafted loafers.',
    aspectRatio: '16:9 Landscape',
  },
  {
    id: 'pairing-38',
    number: 38,
    cleanFilename: '38_Date_Couple_Fireside_Lounge.jpg',
    rawFilename: 'date_couple_fireside_1788813088632.jpg',
    imageSrc: img38,
    category: 'Prom & Date Night',
    title: 'Date Night Couple — Cozy Fireside Villa Lounge',
    subtitle: 'Warm Hearth & Slip-On Wedges',
    description: 'Fireside red wine toast; woman in cream cashmere dress with metallic slip-on wedges & clutch; man in charcoal merino knit with Stoffa espresso loafers.',
    suggestedShoes: 'Crystal Slip on Low Wedges Light Gold',
    suggestedBag: 'Silk Drawstring Bridal Potli Ivory',
    shoesUrl: 'https://stoffastyle.com/products/crystal-slip-on-low-wedges-light-gold',
    bagUrl: 'https://stoffastyle.com/products/silk-drawstring-bridal-potli-ivory',
    visualNotes: 'Roaring stone fireplace, cream cashmere knit, red wine glasses, dark espresso loafers, warm glow.',
    aspectRatio: '16:9 Landscape',
  },
];

const STORAGE_KEY = 'stoffa_hero_pairings_v2';

export function loadSavedHeroPairings(): HeroImagePairingItem[] {
  if (typeof window === 'undefined') return DEFAULT_HERO_PAIRINGS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // If v1 exists, clean it or migrate
      return DEFAULT_HERO_PAIRINGS;
    }
    const parsed: HeroImagePairingItem[] = JSON.parse(saved);
    // Merge with defaults to ensure all imageSrc references remain intact
    return DEFAULT_HERO_PAIRINGS.map((def) => {
      const match = parsed.find((p) => p.id === def.id || p.cleanFilename === def.cleanFilename);
      return match ? { ...def, ...match, imageSrc: def.imageSrc } : def;
    });
  } catch {
    return DEFAULT_HERO_PAIRINGS;
  }
}

export function saveHeroPairings(items: HeroImagePairingItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save pairings to localStorage:', e);
  }
}

export function resetHeroPairings(): HeroImagePairingItem[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('stoffa_hero_pairings_v1');
  }
  return DEFAULT_HERO_PAIRINGS;
}

// Popular Stoffa Shoes for quick suggestions dropdown
export const POPULAR_STOFFA_SHOES = [
  'Crystal High K Wedge Champagne',
  'Classic High K Wedge Champagne',
  'Classic High K Wedge Gold',
  'Classic High K Wedge Slate',
  'Classic High K Wedge Rose Gold',
  'Classic High K Wedge Antique gold',
  'Bridal Border High Wedge - Rose Gold',
  'Crystal High K Wedge Silver',
  'Crystal High K Wedge Light Gold',
  'Crystal Slip on High Wedges Light Gold',
  'Crystal Slip on High Wedges Rose Gold',
  'Crystal Slip on Low Wedges Light Gold',
  'Crystal Slip on Low Wedges Rose Gold',
  'Classic Low K Wedge Gold (2.5 Inch)',
  'Classic Low K Wedge Champagne (2.5 Inch)',
  'Artisanal Braided Kolhapuri Flat Gold',
  'Artisanal Braided Kolhapuri Flat Slate',
  'Architectural Block Heel Gold (3.0 Inch)',
  'Architectural Block Heel Champagne',
  '__none___',
];

// Popular Stoffa Bags for quick suggestions dropdown
export const POPULAR_STOFFA_BAGS = [
  '__none___',
  'Embellished Potli Bag Antique',
  'Embellished Potli Bag Rose Gold',
  'Embellished Potli Bag Black',
  'Embellished Potli Bag Pewter',
  'Border Clutch Bag Gold',
  'Border Flat Bag Gold',
  'Silk Drawstring Bridal Potli Ivory',
  'Pearl Tassel Evening Potli Champagne',
  'Zardozi Heritage Bag Gold',
];
