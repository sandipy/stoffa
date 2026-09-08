import craftsmanshipImg from '../assets/images/handcrafted_luxury_shoes_1788639009378.jpg';
import redCarpetImg from '../assets/images/red_carpet_entry_1788644908907.jpg';
import highWedgeImg from '../assets/images/higher_wedge_couture_1788644942844.jpg';
import motherBrideImg from '../assets/images/mother_of_bride_1788644897489.jpg';
import cruiseImg from '../assets/images/hero_cruise_stoffa_1788641132038.jpg';
import bridalImg from '../assets/images/hero_bridal_stoffa_1788641121017.jpg';

export interface CelebritySpotting {
  id: string;
  celebrityName: string;
  event: string;
  styleCategory: string;
  styleName: string;
  styleHandle?: string;
  quote?: string;
  imageUrl: string;
}

export const STOFFA_BRAND_ASSETS = {
  craftsmanshipEditorial1: craftsmanshipImg,
  workshopBanner: craftsmanshipImg,
};

export const STOFFA_CELEBRITIES: CelebritySpotting[] = [
  {
    id: 'celeb-1',
    celebrityName: 'Kareena K.',
    event: 'International Gala Premiere',
    styleCategory: 'Red Carpet Wedges',
    styleName: 'The Stöffa 4.25" Architectural Gold Wedge',
    styleHandle: 'wedge',
    quote: 'Dancing until dawn with zero pain. The dual-density foam is pure magic.',
    imageUrl: redCarpetImg,
  },
  {
    id: 'celeb-2',
    celebrityName: 'Mira R.',
    event: 'Udaipur Palace Royal Wedding',
    styleCategory: 'Bridal Couture',
    styleName: 'The Stöffa Champagne Metallic Wedge',
    styleHandle: 'champagne',
    quote: 'Never sank into the palace lawn once. Exquisite craftsmanship and grace.',
    imageUrl: bridalImg,
  },
  {
    id: 'celeb-3',
    celebrityName: 'Sonam K.',
    event: 'Vogue Forces of Fashion',
    styleCategory: 'Editorial Muses',
    styleName: 'The Stöffa Sculptural Pewter High Wedge',
    styleHandle: 'pewter',
    quote: 'Redefining heritage Kolhapuri artistry for contemporary global couture.',
    imageUrl: highWedgeImg,
  },
  {
    id: 'celeb-4',
    celebrityName: 'Natasha P.',
    event: 'Capri Yacht Soirée',
    styleCategory: 'Resort Glam',
    styleName: 'The Stöffa Metallic Slide & Artisanal Potli',
    styleHandle: 'cruise',
    quote: 'From morning boat deck to midnight dinner without changing shoes.',
    imageUrl: cruiseImg,
  },
  {
    id: 'celeb-5',
    celebrityName: 'Shloka M.',
    event: 'Sangeet Celebrations',
    styleCategory: 'Mother of the Bride Edit',
    styleName: 'The Stöffa Antique Gold Low Wedge (2.5")',
    styleHandle: 'low-wedge',
    quote: 'Effortless standing comfort through four hours of rituals and dancing.',
    imageUrl: motherBrideImg,
  },
];
