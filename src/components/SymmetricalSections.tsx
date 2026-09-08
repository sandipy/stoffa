import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { STOFFA_BRAND_ASSETS } from '../data/stoffaMediaAssets';
import galaModelImg from '../assets/images/shoes_hero_model_1788745307294.jpg';
import bridalModelImg from '../assets/images/hero_bridal_stoffa_1788641121017.jpg';
import resortHolidayModelImg from '../assets/images/resort_chic_hero_1788745334192.jpg';
import festiveBrunchModelImg from '../assets/images/bags_hero_model_1788745321490.jpg';

interface SymmetricalSectionsProps {
  onSelectCollection?: (collectionName: string) => void;
}

export const SymmetricalSections: React.FC<SymmetricalSectionsProps> = ({ onSelectCollection }) => {
  const { setSelectedCategory, clearFilters, t } = useCommerce();

  const handleTileClick = (filterCategory: string, collectionTitle: string) => {
    if (onSelectCollection) {
      onSelectCollection(collectionTitle);
    } else {
      clearFilters();
      setSelectedCategory(filterCategory);
      const grid = document.getElementById('category-products-section') || document.getElementById('collection-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const tiles = [
    {
      id: 'high-wedges',
      title: 'ICONIC KOLHAPURI WEDGES',
      subtitle: 'Signature 3.5" & 4.25" wedges with dual-density memory foam footbed',
      ctaText: 'SHOP HIGH WEDGES',
      filterTarget: 'Shoes',
      collectionName: 'High Wedges (3.5")',
      imageUrl: galaModelImg,
      badge: 'Stoffa Style Best Seller',
    },
    {
      id: 'bridal-collection',
      title: 'BRIDAL & FESTIVE EDITIONS',
      subtitle: 'Exquisite hand-embellished crystal wedges, gold cords & champagne bridal silhouettes',
      ctaText: 'EXPLORE BRIDAL EDIT',
      filterTarget: 'Bridal Wedges',
      collectionName: 'Bridal Wedges',
      imageUrl: bridalModelImg,
      badge: 'Bridal Couture',
    },
    {
      id: 'artisanal-flats',
      title: 'ARTISANAL KOLHAPURI FLATS',
      subtitle: 'Tribal braids, crystal baguettes & versatile metallic flats for day & night',
      ctaText: 'DISCOVER FLATS',
      filterTarget: 'Flats & Loafers',
      collectionName: 'Kolhapuri Flats',
      imageUrl: resortHolidayModelImg,
      badge: 'Handcrafted Braids',
    },
    {
      id: 'bridal-potlis',
      title: 'BRIDAL WEDGES & POTLIS',
      subtitle: 'Exquisite heirloom zardozi borders & hand-embellished silk potli drawstrings',
      ctaText: 'EXPLORE BRIDAL & BAGS',
      filterTarget: 'Bags',
      collectionName: 'Bags & Potlis',
      imageUrl: festiveBrunchModelImg,
      badge: 'Heirloom Handcraft',
    },
  ];

  return (
    <section id="symmetrical-edits" className="w-full bg-[#faf9f6] py-12 sm:py-16 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-semibold tracking-widest uppercase mb-2">
            <span>{t('Curated Collections', 'Curated Collections')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-medium tracking-tight">
            {t('The World of Stoffa Style', 'The World of Stoffa Style')}
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2 font-light">
            {t('Explore authentic handcrafted edits, from red-carpet Kolhapuri wedges to heirloom bridal potlis.', 'Explore authentic handcrafted edits, from red-carpet Kolhapuri wedges to heirloom bridal potlis.')}
          </p>
        </div>

        {/* Symmetrical 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              id={`tile-${tile.id}`}
              onClick={() => handleTileClick(tile.filterTarget, tile.collectionName)}
              className="group relative aspect-[4/3] sm:aspect-[16/10] rounded-[4px] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-amber-100 bg-slate-950"
            >
              {/* Background Image with zoom on hover */}
              <img
                src={tile.imageUrl}
                alt={tile.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top origin-top group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
              />

              {/* Refined gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

              {/* Top badge with 4px corners */}
              <div className="absolute top-4 start-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-mono font-bold tracking-widest uppercase shadow-xs">
                  {t(tile.badge, tile.badge)}
                </span>
              </div>

              {/* Text & CTA Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end text-left text-white">
                <h3 className="text-xl sm:text-2xl font-serif font-medium tracking-wider mb-1.5 drop-shadow-xs">
                  {t(tile.title, tile.title)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-light mb-4 line-clamp-2 max-w-md drop-shadow-xs">
                  {t(tile.subtitle, tile.subtitle)}
                </p>

                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-amber-200 group-hover:text-white transition-colors">
                    <span>{t(tile.ctaText, tile.ctaText)}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
