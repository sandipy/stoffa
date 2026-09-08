import React, { useRef } from 'react';
import {
  Briefcase,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Compass,
  Flower2,
  GraduationCap,
  Heart,
  Moon,
  PartyPopper,
  Plane,
  RotateCcw,
  Sun,
  Wine,
  Zap,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { OCCASIONS_LIST } from '../data/mockData';

export const OccasionDiscovery: React.FC = () => {
  const {
    products,
    selectedOccasion,
    setSelectedOccasion,
    selectedCategory,
    clearFilters,
    t,
  } = useCommerce();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Map icons to occasion ids
  const getOccasionIcon = (id: string) => {
    switch (id) {
      case 'all':
        return <Compass className="w-4 h-4" />;
      case 'prom':
        return <PartyPopper className="w-4 h-4" />;
      case 'wedding':
        return <Heart className="w-4 h-4" />;
      case 'beach':
        return <Sun className="w-4 h-4" />;
      case 'cocktail':
        return <Wine className="w-4 h-4" />;
      case 'date_night':
        return <Moon className="w-4 h-4" />;
      case 'graduation':
        return <GraduationCap className="w-4 h-4" />;
      case 'brunch':
        return <Coffee className="w-4 h-4" />;
      case 'boardroom':
        return <Briefcase className="w-4 h-4" />;
      case 'garden_party':
        return <Flower2 className="w-4 h-4" />;
      case 'bachelorette':
        return <PartyPopper className="w-4 h-4" />;
      case 'runway':
        return <Zap className="w-4 h-4" />;
      case 'vacation':
        return <Plane className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  // Compute product count per occasion
  const getOccasionCount = (occId: string) => {
    if (occId === 'all') return products.length;
    return products.filter((p) => p.occasions && p.occasions.includes(occId)).length;
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const currentOccasionObj = OCCASIONS_LIST.find((o) => o.id === selectedOccasion) || OCCASIONS_LIST[0];

  return (
    <section
      id="occasions-section"
      className="relative bg-white border-y border-stone-200/80 py-12 lg:py-16 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Antler & Juun.J Architectural DNA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-200">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2.5 h-0.5 bg-stone-900"></span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-stone-500 uppercase font-semibold">
                {t('antler_junn_badge')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-stone-900 font-normal">
              {t('curated_events_heading')}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              {t('curated_events_sub')}
            </p>
          </div>

          {/* Navigation Controls & Status */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-stone-500 uppercase tracking-wider mr-2">
              <span>{OCCASIONS_LIST.length} {t('Curations', 'Curations')}</span>
            </div>

            <button
              onClick={() => handleScroll('left')}
              className="p-2.5 rounded-lg border border-stone-200 hover:border-stone-900 bg-white hover:bg-stone-50 text-stone-700 transition-colors shadow-2xs"
              aria-label="Scroll occasions left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2.5 rounded-lg border border-stone-200 hover:border-stone-900 bg-white hover:bg-stone-50 text-stone-700 transition-colors shadow-2xs"
              aria-label="Scroll occasions right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Architectural Occasion Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 overflow-x-auto pt-6 pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {OCCASIONS_LIST.map((occ, idx) => {
            const isSelected = selectedOccasion === occ.id;
            const count = getOccasionCount(occ.id);
            const indexFormatted = String(idx).padStart(2, '0');

            return (
              <button
                key={occ.id}
                id={`occasion-pill-${occ.id}`}
                onClick={() => {
                  setSelectedOccasion(occ.id);
                  // Smoothly bring the product grid into view
                  const el = document.getElementById('collection-grid');
                  if (el && window.innerWidth < 768) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`snap-start shrink-0 text-start w-64 sm:w-72 p-5 rounded-[4px] border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-1 ring-stone-900'
                    : 'bg-[#faf9f6] text-stone-900 border-stone-200/90 hover:border-stone-400 hover:bg-white shadow-2xs'
                }`}
              >
                <div>
                  {/* Top Metadata Line */}
                  <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                    <span
                      className={`tracking-widest ${
                        isSelected ? 'text-stone-400' : 'text-stone-500 font-medium'
                      }`}
                    >
                      {t('MOMENT', 'MOMENT')} // {indexFormatted}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono tracking-wider ${
                        isSelected
                          ? 'bg-stone-800 text-stone-300'
                          : 'bg-stone-200/80 text-stone-700'
                      }`}
                    >
                      {count} {t('items', 'items')}
                    </span>
                  </div>

                  {/* Icon & Name */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <span
                      className={`p-2 rounded-[4px] transition-colors ${
                        isSelected
                          ? 'bg-stone-800 text-stone-100'
                          : 'bg-white text-stone-800 border border-stone-200 group-hover:border-stone-400'
                      }`}
                    >
                      {getOccasionIcon(occ.id)}
                    </span>
                    <h3 className="font-serif text-base font-medium tracking-tight">
                      {t(`occ_${occ.id}`) || occ.name}
                    </h3>
                  </div>

                  {/* Tagline */}
                  <p
                    className={`text-xs font-light leading-relaxed mt-1 line-clamp-2 ${
                      isSelected ? 'text-stone-300' : 'text-stone-600'
                    }`}
                  >
                    {t(occ.description, occ.description)}
                  </p>
                </div>

                {/* Bottom Architectural Accent Line */}
                <div className="pt-4 mt-3 border-t border-dashed flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span className={isSelected ? 'text-stone-400' : 'text-stone-500'}>
                    {t(occ.tagline, occ.tagline)}
                  </span>
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Check className="w-3 h-3" />
                      {t('Active', 'Active')}
                    </span>
                  ) : (
                    <span className="text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      {t('Explore →', 'Explore →')}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Filter State Summary & Reset Banner */}
        {(selectedOccasion !== 'all' || selectedCategory !== 'All') && (
          <div className="mt-6 p-4 rounded-[4px] bg-stone-100/90 border border-stone-300/80 flex flex-wrap items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-2.5 flex-wrap text-xs text-stone-800">
              <span className="font-mono text-stone-500 uppercase tracking-wider text-[11px]">
                {t('Active Filter Archive:', 'Active Filter Archive:')}
              </span>

              {selectedOccasion !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-stone-900 text-white font-medium text-xs shadow-xs">
                  <span>{t('Occasion:', 'Occasion:')}</span>
                  <strong>{t(`occ_${selectedOccasion}`) || currentOccasionObj.name}</strong>
                  <button
                    onClick={() => setSelectedOccasion('all')}
                    className="ml-1 hover:text-stone-300"
                    title="Clear occasion filter"
                  >
                    &times;
                  </button>
                </span>
              )}

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-stone-900 text-white font-medium text-xs shadow-xs">
                  <span>{t('Silhouette:', 'Silhouette:')}</span>
                  <strong>{t(selectedCategory, selectedCategory)}</strong>
                  <button
                    onClick={() => {
                      // Handled by context
                      const btn = document.getElementById('filter-cat-all');
                      if (btn) btn.click();
                    }}
                    className="ml-1 hover:text-stone-300"
                    title="Clear silhouette filter"
                  >
                    &times;
                  </button>
                </span>
              )}

              <span className="text-stone-500 font-mono text-[11px]">
                &bull; {t('Showing tailored architectural pieces', 'Showing tailored architectural pieces')}
              </span>
            </div>

            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 hover:text-stone-900 text-xs font-mono uppercase tracking-wider transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>{t('clear_filters')}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
