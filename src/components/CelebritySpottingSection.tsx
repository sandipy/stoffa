import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ExternalLink } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { STOFFA_CELEBRITIES, CelebritySpotting } from '../data/stoffaMediaAssets';

export const CelebritySpottingSection: React.FC = () => {
  const { products, setSelectedProductModal, t } = useCommerce();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleViewProduct = (celeb: CelebritySpotting) => {
    // Find matching product
    const prod = products.find(
      (p) =>
        p.title.toLowerCase().includes(celeb.styleName.toLowerCase()) ||
        p.subtitle?.toLowerCase().includes(celeb.celebrityName.toLowerCase()) ||
        (celeb.styleHandle && p.id.includes(celeb.styleHandle))
    );
    if (prod) {
      setSelectedProductModal(prod);
    } else {
      // Fallback to first matching wedge
      const fallback = products.find((p) => p.title.toLowerCase().includes('champagne') || p.title.toLowerCase().includes('wedge'));
      if (fallback) setSelectedProductModal(fallback);
    }
  };

  return (
    <section id="celebrity-spotting-rail" className="w-full bg-[#fdfbf7] py-14 border-b border-amber-100 overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold mb-1.5">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>{t('Editorial Muses • High Fashion Styling', 'Editorial Muses • High Fashion Styling')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 font-medium tracking-tight">
            {t('Style Spotting', 'Style Spotting')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light mt-1">
            {t('Discover iconic handcrafted Kolhapuri wedges & metallic flats styled with contemporary haute couture.', 'Discover iconic handcrafted Kolhapuri wedges & metallic flats styled with contemporary haute couture.')}
          </p>
        </div>

        {/* Carousel Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            id="celeb-scroll-left"
            onClick={() => handleScroll('left')}
            className="w-10 h-10 rounded-[4px] border border-amber-200 bg-white hover:bg-amber-50 text-slate-800 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            id="celeb-scroll-right"
            onClick={() => handleScroll('right')}
            className="w-10 h-10 rounded-[4px] border border-amber-200 bg-white hover:bg-amber-50 text-slate-800 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-none px-4 sm:px-8 lg:px-12 pb-4 scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {STOFFA_CELEBRITIES.map((celeb) => (
          <div
            key={celeb.id}
            id={`celeb-card-${celeb.id}`}
            onClick={() => handleViewProduct(celeb)}
            className="flex-none w-[280px] sm:w-[320px] bg-white rounded-[4px] border border-amber-100/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Image Container with authentic photo from stoffastyle.com */}
            <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden rounded-t-[4px]">
              <img
                src={celeb.imageUrl}
                alt={`${celeb.celebrityName} in Stoffa Style`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Badge with 4px corner */}
              <div className="absolute top-3 start-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
                  <span>{t(celeb.styleCategory, celeb.styleCategory)}</span>
                </span>
              </div>

              {/* Celebrity Name Overlay */}
              <div className="absolute bottom-3 inset-x-3 text-white">
                <p className="text-xs font-mono uppercase tracking-widest text-amber-200 font-semibold">
                  {t('Spotted In Stoffa', 'Spotted In Stoffa')}
                </p>
                <h3 className="text-xl font-serif font-medium leading-tight">
                  {celeb.celebrityName}
                </h3>
              </div>
            </div>

            {/* Bottom Card Content */}
            <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
              <div>
                <p className="text-xs font-medium text-slate-800 line-clamp-1">
                  {t(celeb.styleName, celeb.styleName)}
                </p>
                {celeb.quote && (
                  <p className="text-[11px] text-slate-500 font-light mt-1 line-clamp-2 italic">
                    &ldquo;{t(celeb.quote, celeb.quote)}&rdquo;
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-amber-50 flex items-center justify-between text-xs font-semibold text-amber-900 group-hover:text-amber-700">
                <span className="uppercase tracking-wider text-[10px] font-mono">{t('View Exact Style', 'View Exact Style')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
