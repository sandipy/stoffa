import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';
import { FadeInSection } from './FadeInSection';
import { Product } from '../types';

export const EdgeToEdgeNewArrivals: React.FC = () => {
  const { products, formatPrice, addToCart, setSelectedProductModal, setSelectedCategory, t } = useCommerce();
  const { cmsData } = useCms();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [justAddedId, setJustAddedId] = React.useState<string | null>(null);

  const rawTitle = cmsData.pages.homepage.newArrivalsTitle;
  const title = (!rawTitle || rawTitle === 'New Arrivals') ? 'Just In' : rawTitle;
  const subtitle = cmsData.pages.homepage.newArrivalsSubtitle || 'Handcrafted Italian & Indian Silk Wedges, Mules & Minaudières';

  // Filter just in items and randomize display order on load
  const rawArrivals = products.filter((p) => p.isNewArrival || p.badge?.includes('NEW') || p.badge?.includes('JUST IN') || p.id.startsWith('ww_'));
  const newArrivals = React.useMemo(() => {
    return [...rawArrivals].sort(() => 0.5 - Math.random());
  }, [products]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Standard';
    const defaultColor = product.colors[0] || { name: 'Natural', hex: '#E5E7EB' };
    addToCart(product, defaultSize, defaultColor, 1);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1600);
  };

  const handleViewAll = () => {
    setSelectedCategory('Just In');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#f6f3eb] py-14 sm:py-18 border-y border-stone-200 overflow-hidden">
      {/* Container Header Matching the Handwritten Sketch */}
      <FadeInSection direction="up" duration={700}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <EditableText target={{ type: 'new_arrivals' }} label="Edit Just In Title">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#3e332a] font-medium tracking-tight uppercase">
                {t(title, title)}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                {t(subtitle, subtitle)}
              </p>
            </EditableText>
            <button
              onClick={handleViewAll}
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-950 text-sm sm:text-base font-serif italic mt-1.5 transition-colors cursor-pointer group"
            >
              <span>{t('View all', 'View all')}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-stone-900" />
            </button>
          </div>

          {/* Carousel Arrow Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              id="new-arrivals-scroll-left"
              onClick={() => handleScroll('left')}
              className="w-11 h-11 rounded-full btn-champagne-secondary text-[#3d3227] flex items-center justify-center transition-all shadow-xs cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-[#8c7355]" />
            </button>
            <button
              id="new-arrivals-scroll-right"
              onClick={() => handleScroll('right')}
              className="w-11 h-11 rounded-full btn-champagne-secondary text-[#3d3227] flex items-center justify-center transition-all shadow-xs cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-[#8c7355]" />
            </button>
          </div>
        </div>
      </FadeInSection>

      {/* Horizontal Scroll Rail with Light Beige Theme & Overlay-Free Product Photos */}
      <FadeInSection direction="up" delay={120} duration={800}>
        <div
          ref={scrollContainerRef}
          className="w-full flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 lg:px-12 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {newArrivals.map((product) => {
            const isAdded = justAddedId === product.id;
            const displayImage = product.images[0];

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductModal(product)}
                className="w-[196px] sm:w-[224px] shrink-0 bg-white rounded-xl border border-stone-200/90 hover:border-stone-400 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Product Image Container: 100% overlay-free without black text labels */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                  <img
                    src={displayImage}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                  />
                </div>

                {/* Product Details (Proportionately compact for 30% reduced tile) */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2 bg-white">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 font-semibold block mb-0.5">
                      {t(product.category, product.category)}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base text-stone-900 font-medium group-hover:text-stone-700 transition-colors line-clamp-1">
                      {t(product.title, product.title)}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-1 font-light mt-0.5">
                      {t(product.subtitle, product.subtitle)}
                    </p>
                  </div>

                  {/* Price & Quick Add */}
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <span className="font-mono text-base sm:text-lg font-bold text-stone-900">
                      {formatPrice(product.priceUSD)}
                    </span>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                        isAdded
                          ? 'btn-champagne-added ring-2 ring-[#8c7355]'
                          : 'btn-champagne-primary'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#8c7355]" />
                          <span>{t('Added', 'Added')}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#8c7355]" />
                          <span>{t('Add', 'Add')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </FadeInSection>
    </section>
  );
};

