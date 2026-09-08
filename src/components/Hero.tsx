import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCommerce } from '../context/CommerceContext';
import { STOFFA_STYLE_OFFICIAL_PRODUCTS } from '../data/stoffaStyleProducts';
import { HeroSlideConfig, loadHeroSlides } from '../data/heroSlidesManager';
import { getEffectivePageHero } from '../data/pageHeroManager';

export const Hero: React.FC = () => {
  const {
    setSelectedCategory,
    clearFilters,
    setSelectedProductModal,
    heroSlides,
    isAdminLoggedIn,
    openPageHeroManager,
    t,
    formatPrice,
  } = useCommerce();

  // Listen for real-time page hero customizations
  const [, setHeroUpdateVersion] = useState(0);
  useEffect(() => {
    const handleUpdate = () => setHeroUpdateVersion((v) => v + 1);
    window.addEventListener('stoffa_page_heroes_updated', handleUpdate);
    return () => window.removeEventListener('stoffa_page_heroes_updated', handleUpdate);
  }, []);

  const effectiveHomeHero = getEffectivePageHero('home');
  const isCustomHomeHero = effectiveHomeHero.isCustom;

  // Filter active slides excluding unavailable ("not using right now") and deleted slides
  const allSlides: HeroSlideConfig[] =
    heroSlides && heroSlides.length > 0 ? heroSlides : loadHeroSlides();
  const availableSlides = allSlides.filter((s) => !s.isUnavailable && !s.isDeleted);
  // Fallback if all slides are marked unavailable or deleted so the storefront never breaks
  const activeSlides: HeroSlideConfig[] =
    availableSlides.length > 0
      ? availableSlides
      : allSlides.filter((s) => !s.isDeleted).length > 0
      ? allSlides.filter((s) => !s.isDeleted)
      : allSlides;

  // Start on a random image among all hero images on initial mount
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(() => {
    return Math.floor(Math.random() * (allSlides.length || 38));
  });

  const [isPaused, setIsPaused] = useState(false);
  const [isRandomMode] = useState(true);
  const [, setSlideHistory] = useState<number[]>([]);

  // Shuffled queue of slide indices ensuring every image of the slides is shown before repeating
  const shuffleQueueRef = useRef<number[]>([]);

  const getNextRandomSlideIndex = useCallback((): number => {
    if (activeSlides.length <= 1) return 0;

    // If queue is empty, refill with a freshly shuffled permutation of all indices
    if (!shuffleQueueRef.current || shuffleQueueRef.current.length === 0) {
      const pool = Array.from({ length: activeSlides.length }, (_, i) => i);
      // Fisher-Yates shuffle
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      // Avoid immediately showing the same slide that is currently visible
      if (pool[0] === currentSlideIndex && pool.length > 1) {
        [pool[0], pool[1]] = [pool[1], pool[0]];
      }
      shuffleQueueRef.current = pool;
    }

    return shuffleQueueRef.current.shift() ?? 0;
  }, [activeSlides.length, currentSlideIndex]);

  const currentSlide: HeroSlideConfig = activeSlides[currentSlideIndex] || activeSlides[0];

  // Resolve matching hero pairing & product with multiple robust strategies
  const resolvePairedShoe = (): { product: (typeof STOFFA_STYLE_OFFICIAL_PRODUCTS)[0] | null; title: string } | null => {
    const rawShoe = currentSlide?.pairedShoes || (currentSlide as any)?.suggestedShoes;
    if (!rawShoe || rawShoe === '__none___') return null;

    const query = rawShoe.trim();
    const queryLower = query.toLowerCase();

    // 1. Direct title match
    let match = STOFFA_STYLE_OFFICIAL_PRODUCTS.find(
      (p) => p.title.toLowerCase() === queryLower
    );
    if (match) return { product: match, title: match.title };

    // 2. URL handle match
    if (currentSlide.pairedShoesUrl) {
      const handle = currentSlide.pairedShoesUrl.split('/products/')[1]?.split(/[?#]/)[0];
      if (handle) {
        match = STOFFA_STYLE_OFFICIAL_PRODUCTS.find(
          (p) => p.handle?.toLowerCase() === handle.toLowerCase()
        );
        if (match) return { product: match, title: match.title };
      }
    }

    // 3. Substring match
    match = STOFFA_STYLE_OFFICIAL_PRODUCTS.find((p) => {
      const pTitle = p.title.toLowerCase();
      return pTitle.includes(queryLower) || queryLower.includes(pTitle);
    });
    if (match) return { product: match, title: match.title };

    // 4. Word overlap match
    const words = queryLower.split(/\s+/).filter((w) => w.length > 3);
    if (words.length > 0) {
      let maxScore = 0;
      let bestMatch: (typeof STOFFA_STYLE_OFFICIAL_PRODUCTS)[0] | null = null;
      for (const p of STOFFA_STYLE_OFFICIAL_PRODUCTS) {
        const pTitle = p.title.toLowerCase();
        let score = 0;
        for (const w of words) {
          if (pTitle.includes(w)) score++;
        }
        if (score > maxScore && score >= 2) {
          maxScore = score;
          bestMatch = p;
        }
      }
      if (bestMatch) return { product: bestMatch, title: bestMatch.title };
    }

    return { product: null, title: query };
  };

  const pairedInfo = resolvePairedShoe();

  const handleOpenPairedShoe = (pairing: { product: any; title: string }) => {
    if (pairing.product) {
      setSelectedProductModal(pairing.product);
      window.location.hash = `#/product/${pairing.product.handle || pairing.product.id}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setSelectedProductModal(null);
      clearFilters();
      setSelectedCategory('Shoes');
      window.location.hash = `#/shoes`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextSlide = useCallback(() => {
    if (isRandomMode) {
      const nextIdx = getNextRandomSlideIndex();
      setSlideHistory((prev) => [...prev.slice(-27), currentSlideIndex]);
      setCurrentSlideIndex(nextIdx);
    } else {
      setSlideHistory((prev) => [...prev.slice(-27), currentSlideIndex]);
      setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }
  }, [isRandomMode, getNextRandomSlideIndex, currentSlideIndex, activeSlides.length]);

  // Auto-rotate hero slide every 5 seconds (random or sequential rotation) if not hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const slideTimer = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [isPaused, handleNextSlide]);

  return (
    <section
      id="hero-15-collections-showcase"
      className="w-full bg-[#faf9f6] pt-1 sm:pt-2 pb-2 sm:pb-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Full-Width Wide Editorial Hero Container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/9] max-h-[calc(100vh-120px)] min-h-[380px] sm:min-h-[440px] md:min-h-[500px] overflow-hidden rounded-2xl border border-stone-200/90 shadow-xl group bg-stone-900">
          
          {/* High-Fashion Editorial Image */}
          <img
            key={isCustomHomeHero ? effectiveHomeHero.imageUrl : currentSlide.imageUrl}
            src={isCustomHomeHero ? effectiveHomeHero.imageUrl : currentSlide.imageUrl}
            alt={currentSlide.altText || (isCustomHomeHero ? effectiveHomeHero.title : 'Stoffa Hero')}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_60%] transition-all duration-700 ease-out"
          />

          {/* In-place Admin button to change Homepage hero */}
          {isAdminLoggedIn && (
            <button
              type="button"
              onClick={() => openPageHeroManager('home')}
              className="absolute top-4 right-4 z-30 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-bold border border-amber-400/40 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Change Homepage Hero Image (Admin)"
            >
              <span>Change Hero Image (Admin)</span>
            </button>
          )}

          {/* Soft ambient bottom gradient for crystal clear typography without covering footwear */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none z-10" />

          {/* 
            WIDE HERO EDITORIAL TEXT:
            - Positioned at lower-left with max-w-2xl so feet & shoes remain unobstructed
            - Elegant subtitle without sparkles
            - Bold statement title
            - Paired with shoe interactive action
          */}
          <div className="absolute left-4 sm:left-8 md:left-12 right-4 bottom-5 sm:bottom-7 md:bottom-9 lg:bottom-10 z-20 text-white flex flex-col justify-end transition-all max-w-2xl">
            
            {/* Prominent Subtitle (italic serif elegance) */}
            <div
              style={{ color: '#ffffff' }}
              className="text-base sm:text-xl md:text-2xl font-light italic !text-white text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mb-1.5 sm:mb-2 flex items-center gap-2 tracking-wide"
            >
              <span>{t(isCustomHomeHero ? effectiveHomeHero.subtitle : currentSlide.subtitle, isCustomHomeHero ? effectiveHomeHero.subtitle : currentSlide.subtitle)}</span>
            </div>

            {/* Collection Title: Bold Type Line */}
            <h2
              style={{ color: '#ffffff' }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold !text-white text-white tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]"
            >
              {t(isCustomHomeHero ? effectiveHomeHero.title : currentSlide.title, isCustomHomeHero ? effectiveHomeHero.title : currentSlide.title)}
            </h2>

            {/* Action Area: Paired Footwear Interactive Chip (View Catalog button removed per user request) */}
            <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-3">
              {pairedInfo && (
                <button
                  id="hero-paired-shoe-btn"
                  onClick={() => handleOpenPairedShoe(pairedInfo)}
                  style={{ color: '#ffffff' }}
                  className="px-4 py-2.5 sm:py-3 rounded-lg bg-black/75 hover:bg-black !text-white text-white text-xs sm:text-sm font-semibold flex items-center gap-2 border border-amber-400/80 backdrop-blur-md transition-all shadow-xl hover:scale-[1.03] cursor-pointer group"
                  title={`View paired footwear: ${pairedInfo.title}`}
                >
                  <span className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">{t('Paired with Shoe:', 'Paired with Shoe:')}</span>
                  <span className="group-hover:underline text-stone-100 font-medium">{t(pairedInfo.title, pairedInfo.title)}</span>
                  {pairedInfo.product && (
                    <span className="text-amber-300 font-mono text-xs font-bold">{formatPrice(pairedInfo.product.priceUSD)}</span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Slide Indicator Dots & Counter (Bottom-Right) */}
          <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-xs border border-white/20 shadow-lg">
            {/* Counter */}
            <span className="text-[11px] font-mono text-white/90 font-semibold tracking-wider">
              {String(currentSlideIndex + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(activeSlides.length).padStart(2, '0')}
            </span>

            {/* Interactive Dot Strip */}
            <div className="hidden sm:flex items-center gap-1 ml-1 max-w-[280px] overflow-x-auto py-0.5 scrollbar-none">
              {activeSlides.map((slide, idx) => (
                <button
                  key={slide.id || idx}
                  onClick={() => {
                    setSlideHistory((prev) => [...prev.slice(-27), currentSlideIndex]);
                    setCurrentSlideIndex(idx);
                  }}
                  title={`Slide ${idx + 1}: ${slide.title} (${slide.cleanFilename})`}
                  className={`transition-all rounded-full cursor-pointer shrink-0 ${
                    currentSlideIndex === idx
                      ? 'w-4 h-1.5 bg-amber-400 shadow-xs'
                      : 'w-1 h-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
