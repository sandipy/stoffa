import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Check, Compass } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { FadeInSection } from './FadeInSection';
import { Product } from '../types';

export const VacationAccessoriesScroll: React.FC = () => {
  const { products, formatPrice, addToCart, setSelectedProductModal, t } = useCommerce();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [justAddedId, setJustAddedId] = React.useState<string | null>(null);

  // Filter bags, potlis, clutches, and artisanal flats
  const vacationItems = products.filter(
    (p) =>
      p.category === 'Bags' ||
      p.category === 'Flats & Loafers' ||
      p.collection === 'Bags & Potlis' ||
      p.collection === 'Kolhapuri Flats' ||
      p.title.toLowerCase().includes('bag') ||
      p.title.toLowerCase().includes('potli') ||
      p.title.toLowerCase().includes('clutch') ||
      p.title.toLowerCase().includes('flat')
  );

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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

  return (
    <section id="vacation-accessories-rail" className="w-full bg-[#fbf9f5] py-12 border-b border-amber-100 overflow-hidden">
      {/* Edge-to-Edge Container Header */}
      <FadeInSection direction="up" duration={700}>
        <div className="w-full px-4 sm:px-8 lg:px-12 flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold mb-1">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('Handcrafted Edits', 'Handcrafted Edits')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 font-medium tracking-tight">
              {t('Embellished Potlis & Artisanal Flats', 'Embellished Potlis & Artisanal Flats')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light mt-0.5">
              {t('Heirloom zardozi potlis, pearl-drop drawstrings, and metallic braided Kolhapuri flats.', 'Heirloom zardozi potlis, pearl-drop drawstrings, and metallic braided Kolhapuri flats.')}
            </p>
          </div>

          {/* Carousel Arrow Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              id="vacation-accessories-scroll-left"
              onClick={() => handleScroll('left')}
              className="w-10 h-10 rounded-[4px] border border-amber-200 bg-white hover:bg-amber-50 text-slate-800 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="vacation-accessories-scroll-right"
              onClick={() => handleScroll('right')}
              className="w-10 h-10 rounded-[4px] border border-amber-200 bg-white hover:bg-amber-50 text-slate-800 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </FadeInSection>

      {/* Full-bleed Edge-to-Edge Horizontal Scroll Rail */}
      <FadeInSection direction="up" delay={120} duration={800}>
        <div
          ref={scrollRef}
          className="w-full flex items-stretch gap-5 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 lg:px-12 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {vacationItems.map((product) => {
            const isAdded = justAddedId === product.id;
            const displayImage = product.images[0];

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductModal(product)}
                className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-[4px] border border-sky-100/90 hover:border-sky-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Product Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-sky-50">
                  <img
                    src={displayImage}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 start-3">
                    <span className="px-2.5 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider bg-sky-950 text-white shadow-xs">
                      {t(product.badge || 'VACATION EDIT', product.badge || 'VACATION EDIT')}
                    </span>
                  </div>

                  {/* Quick Add Overlay on Hover */}
                  <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-full py-2.5 rounded-[4px] font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-sky-900 hover:bg-sky-800 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{t('Added to Cart', 'Added to Cart')}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{t('Quick Add', 'Quick Add')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-sky-800 font-semibold block mb-0.5">
                      {t(product.category, product.category)}
                    </span>
                    <h3 className="font-serif text-base text-slate-900 font-medium group-hover:text-sky-800 transition-colors line-clamp-1">
                      {t(product.title, product.title)}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 font-light mt-0.5">
                      {t(product.subtitle, product.subtitle)}
                    </p>
                  </div>

                  {/* Colors and Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-sky-50">
                    <div className="flex items-center gap-1.5">
                      {product.colors.slice(0, 3).map((c) => (
                        <span
                          key={c.name}
                          title={c.name}
                          className="w-3 h-3 rounded-[4px] border border-slate-300 shadow-2xs"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-sm font-semibold text-slate-900">
                        {formatPrice(product.priceUSD)}
                      </span>
                    </div>
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
