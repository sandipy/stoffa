import React, { useState, useEffect } from 'react';
import { ArrowRight, Filter, Camera } from 'lucide-react';
import { CURATED_COLLECTIONS_DATA, CuratedCollectionItem } from '../data/collectionsData';
import { useCommerce } from '../context/CommerceContext';
import { getEffectivePageHero } from '../data/pageHeroManager';

interface CollectionsDirectoryViewProps {
  onSelectCollection: (title: string) => void;
}

export const CollectionsDirectoryView: React.FC<CollectionsDirectoryViewProps> = ({
  onSelectCollection,
}) => {
  const { isAdminLoggedIn, openPageHeroManager, t } = useCommerce();
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  const [, setHeroUpdateVersion] = useState(0);
  useEffect(() => {
    const handleHeroUpdated = () => {
      setHeroUpdateVersion((v) => v + 1);
    };
    window.addEventListener('stoffa_page_heroes_updated', handleHeroUpdated);
    return () => window.removeEventListener('stoffa_page_heroes_updated', handleHeroUpdated);
  }, []);

  const effectiveHero = getEffectivePageHero('collections');

  const themes = [
    { id: 'all', label: t('All Collections', 'All Collections') },
    { id: 'Wedding & Ceremonies', label: t('Wedding & Bridal', 'Wedding & Bridal') },
    { id: 'Galas & Celebrations', label: t('Galas & Celebrations', 'Galas & Celebrations') },
    { id: 'Resort & Evenings', label: t('Resort & Evenings', 'Resort & Evenings') },
  ];

  const filteredCollections = selectedTheme === 'all'
    ? CURATED_COLLECTIONS_DATA
    : CURATED_COLLECTIONS_DATA.filter((c) => c.theme === selectedTheme);

  return (
    <section id="collections-directory" className="w-full bg-[#faf9f6] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dedicated Collections Editorial Hero Banner */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] max-h-[520px] min-h-[360px] sm:min-h-[440px] overflow-hidden rounded-2xl border border-stone-200/90 shadow-lg bg-stone-900 mb-10 sm:mb-14 group">
          <img
            src={effectiveHero.imageUrl}
            alt={effectiveHero.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
          />

          {/* In-place Admin button to change this page's hero image */}
          {isAdminLoggedIn && (
            <button
              type="button"
              onClick={() => openPageHeroManager('collections')}
              className="absolute top-4 right-4 z-30 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-bold border border-amber-400/40 backdrop-blur-md shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer group/btn"
              title="Change Collections Hero Image (Admin)"
            >
              <Camera className="w-3.5 h-3.5 text-amber-300 group-hover/btn:rotate-12 transition-transform" />
              <span>Change Hero Image (Admin)</span>
            </button>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none z-10" />

          {/* Typography overlay */}
          <div className="absolute inset-x-5 sm:inset-x-8 md:inset-x-12 bottom-6 sm:bottom-10 z-20 text-white flex flex-col justify-end max-w-3xl">
            {effectiveHero.badge && (
              <span className="inline-block self-start px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-200 border border-amber-400/30 text-[10px] font-mono font-bold uppercase tracking-wider mb-2 backdrop-blur-xs">
                {t(effectiveHero.badge, effectiveHero.badge)}
              </span>
            )}
            <div className="text-base sm:text-xl md:text-2xl font-light italic text-amber-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mb-1 sm:mb-2 flex items-center gap-2">
              <span>{t(effectiveHero.subtitle, effectiveHero.subtitle)}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
              {t(effectiveHero.title, effectiveHero.title)}
            </h1>
          </div>
        </div>

        {/* Quick Theme Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-6 mb-8 sm:mb-12">
          <div className="text-sm font-bold uppercase tracking-wider text-stone-900">
            <span>{t('Filter by Occasion Theme', 'Filter by Occasion Theme')}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {themes.map((th) => (
              <button
                key={th.id}
                id={`theme-tab-${th.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedTheme(th.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                  selectedTheme === th.id
                    ? 'btn-champagne-pill-active shadow-md'
                    : 'btn-champagne-pill'
                }`}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Columns Grid of All Collections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCollections.map((col: CuratedCollectionItem) => (
            <div
              key={col.id}
              id={`collection-card-${col.id}`}
              onClick={() => {
                onSelectCollection(col.title);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative h-[480px] sm:h-[530px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-stone-800/30 flex flex-col justify-end"
            >
              {/* Image Background with gentle zoom on hover */}
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Ambient lighting vignette for rich photographic depth and text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-black/10 pointer-events-none transition-opacity duration-300 group-hover:opacity-95" />

              {/* Text Overlay Box: Almost fully transparent glass overlay so the image below is clearly visible */}
              <div className="relative z-10 m-3 sm:m-4 bg-black/20 hover:bg-black/30 backdrop-blur-[2px] rounded-xl p-4 sm:p-5 border border-white/20 hover:border-white/35 transition-all duration-300 group-hover:-translate-y-1 shadow-2xl">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    {/* "Higher Wedges..." shoe note - increased font size & gold contrast */}
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.16em] text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {t(col.shoeNote, col.shoeNote)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-300 opacity-80 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                  </div>
                  
                  {/* Collection Title */}
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {t(col.title, col.title)}
                  </h2>

                  {/* "Made for the long day..." tagline - increased font size & crisp light contrast */}
                  <p className="text-sm sm:text-base text-stone-100 font-normal leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {t(col.tagline, col.tagline)}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-xs sm:text-sm font-bold text-white uppercase tracking-[0.14em] group-hover:text-amber-300 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    <span className="underline underline-offset-4 decoration-amber-400/60 group-hover:decoration-amber-300">
                      {t('Explore Edit', 'Explore Edit')}
                    </span>
                    <span className="text-amber-300">&rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
