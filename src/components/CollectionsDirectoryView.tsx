import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Camera,
  Edit3,
  Save,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Sparkles,
  Lock,
  Unlock,
} from 'lucide-react';
import {
  CuratedCollectionItem,
  loadCuratedCollections,
  saveCuratedCollections,
  resetCuratedCollections,
  CURATED_COLLECTIONS_DATA,
} from '../data/collectionsData';
import { useCommerce } from '../context/CommerceContext';
import { useCms } from '../context/CmsContext';
import {
  getEffectivePageHero,
  saveCustomPageHero,
  resetCustomPageHero,
} from '../data/pageHeroManager';
import { CollectionImagePickerModal } from './admin/CollectionImagePickerModal';

interface CollectionsDirectoryViewProps {
  onSelectCollection: (title: string) => void;
}

export const CollectionsDirectoryView: React.FC<CollectionsDirectoryViewProps> = ({
  onSelectCollection,
}) => {
  const { isAdminLoggedIn, openPageHeroManager, t, setIsAdminLoginModalOpen } = useCommerce();
  const { isCmsInPlaceMode, setIsCmsInPlaceMode } = useCms();

  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [collections, setCollections] = useState<CuratedCollectionItem[]>(() =>
    loadCuratedCollections()
  );
  const [isCmsEditActive, setIsCmsEditActive] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<{ message: string; type: 'success' | 'info' } | null>(
    null
  );

  // Per-card dirty tracking
  const [dirtyCardIds, setDirtyCardIds] = useState<Set<string>>(new Set());

  // Image Picker Modal State
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [imagePickerTarget, setImagePickerTarget] = useState<
    { type: 'card'; id: string; title: string; currentUrl: string } | { type: 'hero'; currentUrl: string } | null
  >(null);

  // Hero custom text editing state
  const effectiveHero = getEffectivePageHero('collections');
  const [heroBadge, setHeroBadge] = useState(effectiveHero.badge || 'CURATED OCCASION EDITS');
  const [heroSubtitle, setHeroSubtitle] = useState(
    effectiveHero.subtitle || 'Curated by Occasion & Venue'
  );
  const [heroTitle, setHeroTitle] = useState(effectiveHero.title || 'Find Your Pair');
  const [isHeroDirty, setIsHeroDirty] = useState(false);

  // Sync CMS mode with global state
  useEffect(() => {
    if (isAdminLoggedIn && isCmsInPlaceMode) {
      setIsCmsEditActive(true);
    }
  }, [isAdminLoggedIn, isCmsInPlaceMode]);

  // Listen for storage events across tabs or components
  useEffect(() => {
    const handleCollectionsUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<CuratedCollectionItem[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setCollections(customEvent.detail);
        setIsDirty(false);
        setDirtyCardIds(new Set());
      } else {
        setCollections(loadCuratedCollections());
      }
    };

    const handleHeroUpdated = () => {
      const freshHero = getEffectivePageHero('collections');
      setHeroBadge(freshHero.badge || 'CURATED OCCASION EDITS');
      setHeroSubtitle(freshHero.subtitle || 'Curated by Occasion & Venue');
      setHeroTitle(freshHero.title || 'Find Your Pair');
      setIsHeroDirty(false);
    };

    window.addEventListener('stoffa_curated_collections_updated', handleCollectionsUpdated);
    window.addEventListener('stoffa_page_heroes_updated', handleHeroUpdated);

    return () => {
      window.removeEventListener('stoffa_curated_collections_updated', handleCollectionsUpdated);
      window.removeEventListener('stoffa_page_heroes_updated', handleHeroUpdated);
    };
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setSaveToast({ message: msg, type });
    setTimeout(() => {
      setSaveToast(null);
    }, 3200);
  };

  // =========================================================================
  // CARD EDITING HANDLERS
  // =========================================================================

  const handleUpdateCardField = (
    id: string,
    field: keyof CuratedCollectionItem,
    value: string
  ) => {
    setCollections((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    setIsDirty(true);
    setDirtyCardIds((prev) => new Set(prev).add(id));
  };

  const handleOpenImagePickerForCard = (col: CuratedCollectionItem) => {
    setImagePickerTarget({
      type: 'card',
      id: col.id,
      title: col.title,
      currentUrl: col.image,
    });
    setImagePickerOpen(true);
  };

  const handleOpenImagePickerForHero = () => {
    setImagePickerTarget({
      type: 'hero',
      currentUrl: effectiveHero.imageUrl,
    });
    setImagePickerOpen(true);
  };

  const handleImagePickerSelect = (newUrl: string) => {
    if (!imagePickerTarget) return;

    if (imagePickerTarget.type === 'card') {
      const cardId = imagePickerTarget.id;
      setCollections((prev) =>
        prev.map((item) => (item.id === cardId ? { ...item, image: newUrl } : item))
      );
      setIsDirty(true);
      setDirtyCardIds((prev) => new Set(prev).add(cardId));
      triggerToast(`Image updated for "${imagePickerTarget.title}". Click "Save Card" or "Save All" to persist.`);
    } else if (imagePickerTarget.type === 'hero') {
      saveCustomPageHero('collections', { imageUrl: newUrl });
      triggerToast('Collections hero banner image updated successfully!');
    }

    setImagePickerOpen(false);
    setImagePickerTarget(null);
  };

  const handleSaveSingleCard = (col: CuratedCollectionItem) => {
    // Save current state of all collections to storage
    saveCuratedCollections(collections);
    setDirtyCardIds((prev) => {
      const next = new Set(prev);
      next.delete(col.id);
      return next;
    });
    if (dirtyCardIds.size <= 1) {
      setIsDirty(false);
    }
    triggerToast(`Collection "${col.title}" saved successfully!`);
  };

  const handleMoveCard = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= collections.length) return;

    const next = [...collections];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;

    setCollections(next);
    setIsDirty(true);
    triggerToast(`Reordered "${temp.title}". Remember to Save All.`);
  };

  const handleDeleteCard = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove the collection "${title}"?`)) {
      const next = collections.filter((c) => c.id !== id);
      setCollections(next);
      saveCuratedCollections(next);
      triggerToast(`Removed collection "${title}".`);
    }
  };

  const handleAddNewCollection = () => {
    const newId = `custom-collection-${Date.now()}`;
    const newTheme: CuratedCollectionItem['theme'] =
      selectedTheme !== 'all' ? (selectedTheme as any) : 'Wedding & Ceremonies';

    const newItem: CuratedCollectionItem = {
      id: newId,
      title: 'New Curated Edit',
      tagline: 'Handcrafted luxury footwear and styling designed for unforgettable moments.',
      theme: newTheme,
      shoeNote: 'Higher Wedges (3.5" - 4.25") & Crystals',
      image: '/hero_images/24_Higher_Wedge_Couture.jpg',
    };

    const next = [newItem, ...collections];
    setCollections(next);
    setIsDirty(true);
    setDirtyCardIds((prev) => new Set(prev).add(newId));
    triggerToast('Added new collection card. Edit text and image below, then save.');
  };

  const handleSaveAll = () => {
    saveCuratedCollections(collections);
    setIsDirty(false);
    setDirtyCardIds(new Set());
    triggerToast('All curated collections saved successfully!');
  };

  const handleDiscardAll = () => {
    setCollections(loadCuratedCollections());
    setIsDirty(false);
    setDirtyCardIds(new Set());
    triggerToast('Discarded unsaved modifications.', 'info');
  };

  const handleResetToDefaults = () => {
    if (
      window.confirm(
        'Reset all curated collections back to factory defaults? This will overwrite your custom changes.'
      )
    ) {
      const defaults = resetCuratedCollections();
      setCollections(defaults);
      setIsDirty(false);
      setDirtyCardIds(new Set());
      triggerToast('Reset all collections to factory defaults.');
    }
  };

  // Hero save handler
  const handleSaveHeroBanner = () => {
    saveCustomPageHero('collections', {
      customBadge: heroBadge.trim(),
      customSubtitle: heroSubtitle.trim(),
      customTitle: heroTitle.trim(),
    });
    setIsHeroDirty(false);
    triggerToast('Collections hero banner typography saved successfully!');
  };

  const handleResetHeroBanner = () => {
    if (window.confirm('Reset hero banner artwork and typography back to default?')) {
      resetCustomPageHero('collections');
      const freshHero = getEffectivePageHero('collections');
      setHeroBadge(freshHero.badge || 'CURATED OCCASION EDITS');
      setHeroSubtitle(freshHero.subtitle || 'Curated by Occasion & Venue');
      setHeroTitle(freshHero.title || 'Find Your Pair');
      setIsHeroDirty(false);
      triggerToast('Hero banner reset to default.');
    }
  };

  // Themes list
  const themes = [
    { id: 'all', label: t('All Collections', 'All Collections') },
    { id: 'Wedding & Ceremonies', label: t('Wedding & Bridal', 'Wedding & Bridal') },
    { id: 'Galas & Celebrations', label: t('Galas & Celebrations', 'Galas & Celebrations') },
    { id: 'Resort & Evenings', label: t('Resort & Evenings', 'Resort & Evenings') },
  ];

  const filteredCollections =
    selectedTheme === 'all'
      ? collections
      : collections.filter((c) => c.theme === selectedTheme);

  return (
    <section id="collections-directory" className="w-full bg-[#faf9f6] py-6 sm:py-10">
      {/* Toast Notification */}
      {saveToast && (
        <div
          id="collections-cms-toast"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-900/95 text-white border border-amber-400/40 shadow-2xl backdrop-blur-md animate-bounce text-xs font-semibold"
        >
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{saveToast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* MASTER CMS TOOLBAR FOR COLLECTIONS DIRECTORY                     */}
        {/* ================================================================= */}
        <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-stone-900 border border-stone-800 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  Collections Directory CMS
                </span>
                <span className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 text-[10px] font-mono">
                  {collections.length} Curated Cards
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Directly edit images, headlines, shoe notes, and taglines for every curated collection.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            {!isAdminLoggedIn ? (
              <button
                type="button"
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login to Edit</span>
              </button>
            ) : (
              <>
                {/* CMS Edit Mode Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !isCmsEditActive;
                    setIsCmsEditActive(next);
                    setIsCmsInPlaceMode(next);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isCmsEditActive
                      ? 'bg-amber-400 text-stone-950 border-amber-500 shadow-md scale-105'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700'
                  }`}
                >
                  {isCmsEditActive ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>{isCmsEditActive ? 'In-Place CMS: ACTIVE' : 'Enable In-Place CMS'}</span>
                </button>

                {/* Status Indicator */}
                {isDirty ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-bold">
                    {dirtyCardIds.size} Draft Edits Pending
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-semibold">
                    <Check className="w-3 h-3 text-emerald-400" />
                    All Saved
                  </span>
                )}

                {/* Add Collection Card */}
                {isCmsEditActive && (
                  <button
                    type="button"
                    onClick={handleAddNewCollection}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold border border-stone-700 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add Collection</span>
                  </button>
                )}

                {/* Discard Changes */}
                {isDirty && (
                  <button
                    type="button"
                    onClick={handleDiscardAll}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer border border-stone-700"
                    title="Discard pending changes"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Discard</span>
                  </button>
                )}

                {/* Master Save Button */}
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                    isDirty
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>SAVE ALL COLLECTIONS</span>
                </button>

                {/* Reset to Defaults */}
                {isCmsEditActive && (
                  <button
                    type="button"
                    onClick={handleResetToDefaults}
                    className="px-2.5 py-1.5 rounded-xl text-[11px] text-stone-400 hover:text-rose-400 hover:bg-stone-800/80 transition-all cursor-pointer"
                    title="Reset all collections back to factory defaults"
                  >
                    Reset Defaults
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* DEDICATED COLLECTIONS EDITORIAL HERO BANNER                       */}
        {/* ================================================================= */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] max-h-[520px] min-h-[360px] sm:min-h-[440px] overflow-hidden rounded-2xl border border-stone-200/90 shadow-lg bg-stone-900 mb-10 sm:mb-14 group">
          <img
            src={effectiveHero.imageUrl}
            alt={effectiveHero.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
          />

          {/* Hero Admin Controls */}
          {isAdminLoggedIn && (
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenImagePickerForHero}
                className="px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-bold border border-amber-400/40 backdrop-blur-md shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer group/btn"
                title="Change Collections Hero Image"
              >
                <Camera className="w-3.5 h-3.5 text-amber-300 group-hover/btn:rotate-12 transition-transform" />
                <span>Change Hero Image</span>
              </button>

              {isHeroDirty && (
                <button
                  type="button"
                  onClick={handleSaveHeroBanner}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold border border-emerald-400 backdrop-blur-md shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Hero Text</span>
                </button>
              )}
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

          {/* Typography Overlay: Normal View or In-Place CMS Edit */}
          <div className="absolute inset-x-5 sm:inset-x-8 md:inset-x-12 bottom-6 sm:bottom-10 z-20 text-white flex flex-col justify-end max-w-3xl">
            {isCmsEditActive ? (
              <div className="space-y-2 p-3 sm:p-4 rounded-xl bg-black/60 backdrop-blur-md border border-amber-400/40 shadow-2xl">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-amber-300 font-bold uppercase">
                    In-Page Hero Text Editor
                  </span>
                  <div className="flex items-center gap-2">
                    {isHeroDirty && (
                      <button
                        type="button"
                        onClick={handleSaveHeroBanner}
                        className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save Hero</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleResetHeroBanner}
                      className="text-[10px] text-stone-400 hover:text-stone-200 underline cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Badge input */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-amber-200/80 mb-0.5">
                    Hero Badge
                  </label>
                  <input
                    type="text"
                    value={heroBadge}
                    onChange={(e) => {
                      setHeroBadge(e.target.value);
                      setIsHeroDirty(true);
                    }}
                    className="w-full bg-stone-900/90 border border-stone-700 focus:border-amber-400 rounded-lg px-2.5 py-1 text-xs text-amber-200 font-mono focus:outline-hidden"
                  />
                </div>

                {/* Subtitle input */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-amber-200/80 mb-0.5">
                    Hero Subtitle
                  </label>
                  <input
                    type="text"
                    value={heroSubtitle}
                    onChange={(e) => {
                      setHeroSubtitle(e.target.value);
                      setIsHeroDirty(true);
                    }}
                    className="w-full bg-stone-900/90 border border-stone-700 focus:border-amber-400 rounded-lg px-2.5 py-1 text-sm text-amber-100 italic focus:outline-hidden"
                  />
                </div>

                {/* Title input */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-amber-200/80 mb-0.5">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => {
                      setHeroTitle(e.target.value);
                      setIsHeroDirty(true);
                    }}
                    className="w-full bg-stone-900/90 border border-stone-700 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-lg font-bold text-white focus:outline-hidden"
                  />
                </div>
              </div>
            ) : (
              <>
                {effectiveHero.badge && (
                  <span className="inline-block self-start px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-200 border border-amber-400/30 text-[10px] font-mono font-bold uppercase tracking-wider mb-2 backdrop-blur-xs">
                    {t(heroBadge, heroBadge)}
                  </span>
                )}
                <div className="text-base sm:text-xl md:text-2xl font-light italic text-amber-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mb-1 sm:mb-2 flex items-center gap-2">
                  <span>{t(heroSubtitle, heroSubtitle)}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                  {t(heroTitle, heroTitle)}
                </h1>
              </>
            )}
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

        {/* ================================================================= */}
        {/* 3 COLUMNS GRID OF ALL COLLECTIONS (WITH IN-PLACE CMS EDITING)    */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCollections.map((col: CuratedCollectionItem, index: number) => {
            const isCardDirty = dirtyCardIds.has(col.id);

            return (
              <div
                key={col.id}
                id={`collection-card-${col.id}`}
                onClick={(e) => {
                  // If in CMS mode and user clicked an input/button, don't navigate
                  if (isCmsEditActive) return;
                  onSelectCollection(col.title);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`group relative h-[520px] sm:h-[570px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border flex flex-col justify-between ${
                  isCmsEditActive
                    ? isCardDirty
                      ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)] ring-2 ring-amber-400/50'
                      : 'border-stone-700/80 hover:border-amber-400/60'
                    : 'border-stone-800/30 cursor-pointer'
                }`}
              >
                {/* Background Image with gentle zoom on hover */}
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Ambient lighting vignette for rich photographic depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-black/20 pointer-events-none transition-opacity duration-300 group-hover:opacity-95" />

                {/* ========================================================= */}
                {/* TOP CMS ACTION BAR FOR THIS SPECIFIC CARD                 */}
                {/* ========================================================= */}
                {isCmsEditActive ? (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-20 m-3 p-2 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-700/90 shadow-xl flex items-center justify-between gap-1.5"
                  >
                    {/* Left: Change Image & Reorder */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenImagePickerForCard(col)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-[11px] font-bold shadow-xs transition-all cursor-pointer"
                        title="Change collection photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Change Image</span>
                      </button>

                      {/* Move Left / Right in grid */}
                      <button
                        type="button"
                        onClick={() => handleMoveCard(index, 'left')}
                        disabled={index === 0}
                        className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        title="Move Up/Left"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveCard(index, 'right')}
                        disabled={index === collections.length - 1}
                        className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        title="Move Down/Right"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Right: Save Card & Delete Card */}
                    <div className="flex items-center gap-1.5">
                      {isCardDirty ? (
                        <button
                          type="button"
                          onClick={() => handleSaveSingleCard(col)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-all cursor-pointer animate-pulse"
                          title="Save this card changes"
                        >
                          <Save className="w-3 h-3" />
                          <span>Save Card</span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                          <Check className="w-2.5 h-2.5" />
                          Saved
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteCard(col.id, col.title)}
                        className="p-1 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Remove collection card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                {/* ========================================================= */}
                {/* BOTTOM TEXT OVERLAY: IN-PLACE EDITABLE OR LUXURY DISPLAY */}
                {/* ========================================================= */}
                <div
                  onClick={(e) => {
                    if (isCmsEditActive) e.stopPropagation();
                  }}
                  className={`relative z-10 m-3 sm:m-4 rounded-xl p-4 sm:p-5 border transition-all duration-300 shadow-2xl ${
                    isCmsEditActive
                      ? 'bg-stone-950/90 backdrop-blur-md border-amber-400/40 space-y-3'
                      : 'bg-black/25 hover:bg-black/35 backdrop-blur-[2px] border-white/20 hover:border-white/35 group-hover:-translate-y-1 space-y-2.5'
                  }`}
                >
                  {isCmsEditActive ? (
                    /* IN-PLACE EDITABLE INPUTS */
                    <div className="space-y-2.5 text-left">
                      {/* Theme Selector & Shoe Note */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <label className="text-[10px] font-mono uppercase text-stone-400">
                            Occasion Theme
                          </label>
                          <select
                            value={col.theme}
                            onChange={(e) =>
                              handleUpdateCardField(
                                col.id,
                                'theme',
                                e.target.value as CuratedCollectionItem['theme']
                              )
                            }
                            className="bg-stone-900 border border-stone-700 rounded-lg px-2 py-0.5 text-[11px] font-mono text-amber-300 focus:outline-hidden focus:border-amber-400"
                          >
                            <option value="Wedding & Ceremonies">Wedding & Ceremonies</option>
                            <option value="Galas & Celebrations">Galas & Celebrations</option>
                            <option value="Resort & Evenings">Resort & Evenings</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono uppercase text-amber-400/90 block mb-0.5">
                            Shoe Note / Style Tag
                          </label>
                          <input
                            type="text"
                            value={col.shoeNote}
                            onChange={(e) =>
                              handleUpdateCardField(col.id, 'shoeNote', e.target.value)
                            }
                            placeholder='e.g. Higher Wedges (3.5" - 4.25") & Bridal Crystals'
                            className="w-full bg-stone-900/90 border border-stone-700 focus:border-amber-400 rounded-lg px-2.5 py-1 text-xs font-bold text-amber-300 focus:outline-hidden"
                          />
                        </div>
                      </div>

                      {/* Collection Title */}
                      <div>
                        <label className="text-[10px] font-mono uppercase text-stone-300 block mb-0.5">
                          Collection Title
                        </label>
                        <input
                          type="text"
                          value={col.title}
                          onChange={(e) => handleUpdateCardField(col.id, 'title', e.target.value)}
                          placeholder="e.g. Bride on Her Feet"
                          className="w-full bg-stone-900/90 border border-stone-700 focus:border-amber-400 rounded-lg px-2.5 py-1.5 font-serif text-lg font-bold text-white focus:outline-hidden"
                        />
                      </div>

                      {/* Tagline / Description */}
                      <div>
                        <label className="text-[10px] font-mono uppercase text-stone-400 block mb-0.5">
                          Tagline & Story
                        </label>
                        <textarea
                          rows={2}
                          value={col.tagline}
                          onChange={(e) => handleUpdateCardField(col.id, 'tagline', e.target.value)}
                          placeholder="Short description of occasion and styling..."
                          className="w-full bg-stone-900/90 border border-stone-700 focus:border-amber-400 rounded-lg px-2.5 py-1 text-xs text-stone-200 focus:outline-hidden resize-none"
                        />
                      </div>

                      {/* Card Save & Navigate Test */}
                      <div className="pt-1 flex items-center justify-between gap-2 border-t border-stone-800">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectCollection(col.title);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-[11px] text-stone-400 hover:text-white underline cursor-pointer"
                        >
                          Preview Collection Page &rarr;
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSaveSingleCard(col)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isCardDirty
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                              : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                          }`}
                        >
                          <Save className="w-3 h-3" />
                          <span>{isCardDirty ? 'Save Card' : 'Saved'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* NORMAL LUXURY DISPLAY VIEW */
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.16em] text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                          {t(col.shoeNote, col.shoeNote)}
                        </span>
                        <ArrowRight className="w-4 h-4 text-amber-300 opacity-80 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                      </div>

                      {/* Collection Title */}
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {t(col.title, col.title)}
                      </h2>

                      {/* Tagline */}
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
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* IMAGE PICKER MODAL (Browse Assets, Upload Local File, Paste URL)    */}
      {/* =================================================================== */}
      {imagePickerOpen && imagePickerTarget && (
        <CollectionImagePickerModal
          isOpen={imagePickerOpen}
          onClose={() => {
            setImagePickerOpen(false);
            setImagePickerTarget(null);
          }}
          currentImageUrl={imagePickerTarget.currentUrl}
          collectionTitle={
            imagePickerTarget.type === 'card'
              ? imagePickerTarget.title
              : 'Collections Hero Banner'
          }
          onSelectImage={handleImagePickerSelect}
        />
      )}
    </section>
  );
};
