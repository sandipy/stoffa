import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Camera,
  Upload,
  RotateCcw,
  Check,
  Search,
  ExternalLink,
  ChevronRight,
  Sliders,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FolderOpen,
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import {
  ALL_STORE_PAGES,
  PageHeroDefinition,
  loadCustomPageHeroes,
  saveCustomPageHero,
  resetCustomPageHero,
  resetAllCustomPageHeroes,
  getEffectivePageHero,
  normalizePageKey,
} from '../../data/pageHeroManager';
import { ALL_MEDIA_IMAGES, MEDIA_CATEGORIES, MediaImageItem } from '../../data/allMediaImages';

export const PageHeroManagerModal: React.FC = () => {
  const {
    isPageHeroManagerOpen,
    setIsPageHeroManagerOpen,
    pageHeroActiveTarget,
    setSelectedCategory,
  } = useCommerce();

  // Storage state listener
  const [customHeroes, setCustomHeroes] = useState(() => loadCustomPageHeroes());

  useEffect(() => {
    const handleUpdate = () => {
      setCustomHeroes(loadCustomPageHeroes());
    };
    window.addEventListener('stoffa_page_heroes_updated', handleUpdate);
    return () => window.removeEventListener('stoffa_page_heroes_updated', handleUpdate);
  }, []);

  // Selected Page Key
  const [selectedKey, setSelectedKey] = useState<string>(() => {
    return normalizePageKey(pageHeroActiveTarget || 'home');
  });

  // When opened with a target, switch to that page
  useEffect(() => {
    if (pageHeroActiveTarget) {
      setSelectedKey(normalizePageKey(pageHeroActiveTarget));
    }
  }, [pageHeroActiveTarget, isPageHeroManagerOpen]);

  // Page filters
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Editor form state for the selected page
  const currentEffective = getEffectivePageHero(selectedKey);
  const [activeTab, setActiveTab] = useState<'presets' | 'library' | 'upload' | 'url'>('presets');
  const [selectedImageUrl, setSelectedImageUrl] = useState(currentEffective.imageUrl);
  const [customTitle, setCustomTitle] = useState(currentEffective.title);
  const [customSubtitle, setCustomSubtitle] = useState(currentEffective.subtitle);
  const [customBadge, setCustomBadge] = useState(currentEffective.badge);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Library category filter
  const [libraryFilter, setLibraryFilter] = useState<string>('All Images');
  const [librarySearch, setLibrarySearch] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // When selected page changes, reload form fields
  useEffect(() => {
    const eff = getEffectivePageHero(selectedKey);
    setSelectedImageUrl(eff.imageUrl);
    setCustomTitle(eff.title);
    setCustomSubtitle(eff.subtitle);
    setCustomBadge(eff.badge);
    setSaveSuccess(false);
    setUploadError(null);
    // Always grant immediate access to all media folder images by default
    setActiveTab('library');
  }, [selectedKey, customHeroes]);

  if (!isPageHeroManagerOpen) return null;

  const currentDef = ALL_STORE_PAGES.find((p) => p.key === selectedKey) || currentEffective.pageDefinition;

  // Filter pages list
  const filteredPages = ALL_STORE_PAGES.filter((p) => {
    const matchesGroup = selectedGroup === 'All' || p.group === selectedGroup;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.defaultTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const customizedCount = Object.keys(customHeroes).length;

  const handleSave = () => {
    saveCustomPageHero(selectedKey, {
      imageUrl: selectedImageUrl,
      customTitle: customTitle.trim() || undefined,
      customSubtitle: customSubtitle.trim() || undefined,
      customBadge: customBadge.trim() || undefined,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetCurrent = () => {
    resetCustomPageHero(selectedKey);
    const def = currentDef;
    setSelectedImageUrl(def.defaultImageUrl);
    setCustomTitle(def.defaultTitle);
    setCustomSubtitle(def.defaultSubtitle);
    setCustomBadge(def.defaultBadge);
    setSaveSuccess(false);
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset the hero images on ALL pages back to their default artwork?')) {
      resetAllCustomPageHeroes();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size is over 10MB. Please use an image under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImageUrl(reader.result);
        setUploadError(null);
      }
    };
    reader.onerror = () => setUploadError('Failed to read file.');
    reader.readAsDataURL(file);
  };

  const handleViewLivePage = () => {
    if (currentDef.key === 'home') {
      setSelectedCategory('All');
    } else if (currentDef.key === 'collections') {
      setSelectedCategory('Collections');
    } else {
      setSelectedCategory(currentDef.categoryMatchKeys[0] || currentDef.name);
    }
    setIsPageHeroManagerOpen(false);
  };

  const filteredLibrary = ALL_MEDIA_IMAGES.filter((img) => {
    const matchesCat =
      libraryFilter === 'All' ||
      libraryFilter === 'All Images' ||
      img.category === libraryFilter;
    const matchesSearch =
      !librarySearch.trim() ||
      img.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
      img.description.toLowerCase().includes(librarySearch.toLowerCase()) ||
      img.filename.toLowerCase().includes(librarySearch.toLowerCase()) ||
      (img.tags && img.tags.some((t) => t.toLowerCase().includes(librarySearch.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fcfbf9] w-full max-w-7xl max-h-[94vh] rounded-2xl shadow-2xl border border-stone-300 flex flex-col overflow-hidden text-stone-900">
        
        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shrink-0 shadow-2xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
                  Page Hero Images Manager
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-900 border border-amber-400/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Admin CMS
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Customize the high-fashion hero banner on each storefront page, department, and curated occasion.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-center">
            {customizedCount > 0 && (
              <button
                type="button"
                onClick={handleResetAll}
                className="px-3 py-1.5 rounded-lg text-xs text-red-700 hover:text-red-900 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
                title="Revert all customized hero images to factory defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All ({customizedCount})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsPageHeroManagerOpen(false)}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Close Hero Manager"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two-Column Workspace */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
          
          {/* LEFT SIDEBAR: Page Navigator */}
          <div className="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-stone-200 bg-stone-50/70 flex flex-col shrink-0 max-h-72 lg:max-h-none overflow-hidden">
            
            {/* Search & Group Filter */}
            <div className="p-3 sm:p-4 border-b border-stone-200 bg-white space-y-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages (e.g. Prom, Date Night, Shoes)..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white transition-all font-sans"
                />
              </div>

              {/* Group filter pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                {['All', 'Occasions & Events', 'Departments', 'Heel Heights', 'General'].map((grp) => (
                  <button
                    key={grp}
                    type="button"
                    onClick={() => setSelectedGroup(grp)}
                    className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors cursor-pointer ${
                      selectedGroup === grp
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {grp}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Page List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {filteredPages.map((page) => {
                const eff = getEffectivePageHero(page.key);
                const isSelected = selectedKey === page.key;
                const hasCustom = Boolean(customHeroes[page.key]);

                return (
                  <button
                    key={page.key}
                    type="button"
                    onClick={() => setSelectedKey(page.key)}
                    className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-all cursor-pointer group border ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-400/80 shadow-xs'
                        : 'bg-white hover:bg-stone-100/80 border-stone-200/70'
                    }`}
                  >
                    {/* Thumbnail preview */}
                    <div className="w-14 h-10 rounded-md overflow-hidden bg-stone-900 shrink-0 relative border border-stone-200">
                      <img
                        src={eff.imageUrl}
                        alt={page.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {hasCustom && (
                        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-500 ring-1 ring-white" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-amber-950' : 'text-stone-900'}`}>
                          {page.name}
                        </span>
                        {hasCustom && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded border border-amber-300 shrink-0 font-semibold">
                            Custom
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 block truncate">
                        {page.group}
                      </span>
                    </div>

                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-600' : 'text-stone-300'}`} />
                  </button>
                );
              })}

              {filteredPages.length === 0 && (
                <div className="p-6 text-center text-xs text-stone-500">
                  No pages matching &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>
          </div>

          {/* RIGHT WORKSPACE: Active Page Hero Studio */}
          <div className="flex-1 min-h-0 flex flex-col overflow-y-auto bg-[#faf9f6] p-4 sm:p-6 lg:p-8 space-y-6">
            
            {/* Top Toolbar for Active Page */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                    {currentDef.group}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs font-mono text-stone-500 font-medium">
                    key: <code>{currentDef.key}</code>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 tracking-tight">
                  {currentDef.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleViewLivePage}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 border border-stone-300 transition-colors cursor-pointer"
                  title="View this page on the storefront"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Live Page</span>
                </button>

                {customHeroes[selectedKey] && (
                  <button
                    type="button"
                    onClick={handleResetCurrent}
                    className="px-3 py-1.5 rounded-lg text-xs text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Reset this page hero to default"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                    <span>Reset Page</span>
                  </button>
                )}
              </div>
            </div>

            {/* LIVE HERO BANNER PREVIEW */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
                <span>Real-Time Banner Preview</span>
                <span className="text-stone-400">16:9 / Aspect Ratio Responsive</span>
              </div>

              <div className="relative w-full aspect-[16/9] max-h-[360px] rounded-xl overflow-hidden shadow-lg border border-stone-300 bg-stone-950 group">
                <img
                  src={selectedImageUrl}
                  alt={customTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {/* Gradient overlay matching storefront styling */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* Banner typography overlay */}
                <div className="absolute inset-x-5 sm:inset-x-8 bottom-4 sm:bottom-6 z-10 text-white flex flex-col justify-end">
                  {customBadge && (
                    <span className="inline-block self-start px-2 py-0.5 rounded-md bg-amber-400/30 text-amber-200 border border-amber-400/40 text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5 backdrop-blur-xs">
                      {customBadge}
                    </span>
                  )}
                  <div className="text-xs sm:text-sm font-light italic text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mb-0.5 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                    <span>{customSubtitle}</span>
                  </div>
                  <h4 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {customTitle}
                  </h4>
                </div>
              </div>
            </div>

            {/* IMAGE SOURCE PICKER */}
            <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
                    Select Hero Artwork
                  </span>
                </div>

                {/* Source Tabs */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab('library')}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'library'
                        ? 'bg-white text-stone-950 shadow-2xs font-bold'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>All Media Images ({ALL_MEDIA_IMAGES.length})</span>
                  </button>

                  {currentDef.presets && currentDef.presets.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('presets')}
                      className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'presets'
                          ? 'bg-white text-stone-950 shadow-2xs font-bold'
                          : 'text-stone-600 hover:text-stone-950'
                      }`}
                    >
                      <span>Page Presets ({currentDef.presets.length})</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveTab('upload')}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      activeTab === 'upload'
                        ? 'bg-white text-stone-950 shadow-2xs font-bold'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <span>Upload Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('url')}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      activeTab === 'url'
                        ? 'bg-white text-stone-950 shadow-2xs font-bold'
                        : 'text-stone-600 hover:text-stone-950'
                    }`}
                  >
                    <span>Custom URL</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: PRESETS with Callout to All Media Images */}
              {activeTab === 'presets' && currentDef.presets && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="text-xs text-amber-950 leading-relaxed">
                      Handpicked photoshoot hero banners for <strong>{currentDef.name}</strong>. Not limited to these — you can also choose any photo from the entire media folder!
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('library')}
                      className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 shadow-2xs flex items-center gap-1.5"
                    >
                      <span>Browse All {ALL_MEDIA_IMAGES.length} Media Photos &rarr;</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentDef.presets.map((preset) => {
                      const isChosen = selectedImageUrl === preset.imageUrl;
                      return (
                        <div
                          key={preset.id}
                          onClick={() => setSelectedImageUrl(preset.imageUrl)}
                          className={`rounded-xl border transition-all cursor-pointer flex flex-col overflow-hidden bg-white ${
                            isChosen
                              ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-400/60 shadow-md scale-[1.01]'
                              : 'hover:bg-stone-50 border-stone-200 hover:border-stone-400 hover:scale-[1.005]'
                          }`}
                        >
                          <div className="w-full aspect-[16/9] min-h-[190px] overflow-hidden bg-stone-950 relative">
                            <img
                              src={preset.imageUrl}
                              alt={preset.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            {isChosen && (
                              <div className="absolute top-2.5 right-2.5 bg-amber-500 text-stone-950 px-2.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>Currently Selected</span>
                              </div>
                            )}
                          </div>

                          <div className="p-4 space-y-2 flex flex-col justify-between flex-1">
                            <div>
                              <h5 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                                {preset.name}
                              </h5>
                              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                                {preset.description}
                              </p>
                            </div>

                            <button
                              type="button"
                              className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2 ${
                                isChosen
                                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                                  : 'bg-stone-900 hover:bg-stone-800 text-white shadow-2xs'
                              }`}
                            >
                              {isChosen ? (
                                <>
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  <span>Active Hero Image</span>
                                </>
                              ) : (
                                <span>Select This Image</span>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: ALL MEDIA FOLDER IMAGES (Large Previews & Clear Typography) */}
              {activeTab === 'library' && (
                <div className="space-y-4">
                  {/* Category filters & search */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-1 border-b border-stone-100">
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-thin">
                      {MEDIA_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setLibraryFilter(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                            libraryFilter === cat
                              ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        value={librarySearch}
                        onChange={(e) => setLibrarySearch(e.target.value)}
                        placeholder="Search all 135+ photos..."
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Large Image Grid with Clear Titles & Easy Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[560px] overflow-y-auto p-1 scrollbar-thin">
                    {filteredLibrary.map((img) => {
                      const isChosen = selectedImageUrl === img.url;
                      return (
                        <div
                          key={img.id}
                          onClick={() => setSelectedImageUrl(img.url)}
                          className={`rounded-xl border transition-all cursor-pointer group flex flex-col bg-white overflow-hidden ${
                            isChosen
                              ? 'border-amber-500 ring-2 ring-amber-400 bg-amber-50/80 shadow-md scale-[1.01]'
                              : 'border-stone-200 hover:border-stone-400 hover:shadow-xs hover:scale-[1.005]'
                          }`}
                        >
                          {/* Large Image Container */}
                          <div className="aspect-[16/10] min-h-[175px] w-full bg-stone-950 relative overflow-hidden">
                            <img
                              src={img.url}
                              alt={img.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {isChosen && (
                              <div className="absolute top-2.5 right-2.5 bg-amber-500 text-stone-950 px-2.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>Chosen Hero</span>
                              </div>
                            )}
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono backdrop-blur-xs">
                              {img.aspectRatio}
                            </div>
                          </div>

                          {/* Info Area with Increased Font Size and Padding */}
                          <div className="p-4 space-y-2 flex flex-col justify-between flex-1">
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                                  {img.category}
                                </span>
                              </div>
                              <h5 className="text-sm sm:text-base font-bold text-stone-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
                                {img.title}
                              </h5>
                              <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                                {img.description}
                              </p>
                            </div>

                            <button
                              type="button"
                              className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1 ${
                                isChosen
                                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                                  : 'bg-stone-900 hover:bg-stone-800 text-white shadow-2xs'
                              }`}
                            >
                              {isChosen ? (
                                <>
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  <span>Active Hero Image</span>
                                </>
                              ) : (
                                <span>Select This Image</span>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {filteredLibrary.length === 0 && (
                    <div className="p-10 text-center text-stone-500 text-xs">
                      No photos matched your search. Try clearing filters or searching for terms like "prom", "date", "wedges", or "bags".
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: UPLOAD */}
              {activeTab === 'upload' && (
                <div className="p-6 border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-stone-900">Upload High-Resolution Hero Photo</h5>
                    <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                      Select any custom photoshoot image from your device. Recommended: 16:9 landscape aspect ratio (e.g. 1920x1080) for best visual quality.
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  >
                    Browse Files from Device
                  </button>

                  {uploadError && (
                    <div className="text-xs text-red-600 font-medium flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{uploadError}</span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: DIRECT URL */}
              {activeTab === 'url' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-stone-800">
                    Direct Image Web URL (HTTPS)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={selectedImageUrl.startsWith('data:') ? '' : selectedImageUrl}
                      onChange={(e) => setSelectedImageUrl(e.target.value)}
                      placeholder="https://example.com/editorial-hero.jpg"
                      className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Paste any publicly accessible image link. The preview above will update immediately.
                  </p>
                </div>
              )}
            </div>

            {/* TEXT & TAGLINE CUSTOMIZATION */}
            <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
                    Page Hero Typography &amp; Badges (Optional)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCustomTitle(currentDef.defaultTitle);
                    setCustomSubtitle(currentDef.defaultSubtitle);
                    setCustomBadge(currentDef.defaultBadge);
                  }}
                  className="text-[11px] text-stone-500 hover:text-stone-900 font-medium cursor-pointer"
                >
                  Reset Text to Default
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase font-mono mb-1">
                    Badge
                  </label>
                  <input
                    type="text"
                    value={customBadge}
                    onChange={(e) => setCustomBadge(e.target.value)}
                    placeholder="e.g. PROM & FORMAL GALA"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase font-mono mb-1">
                    Headline Title
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. Prom Night"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase font-mono mb-1">
                    Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={customSubtitle}
                    onChange={(e) => setCustomSubtitle(e.target.value)}
                    placeholder="e.g. The shoes that make the entrance..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM ACTION BAR */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200">
              <div className="text-xs text-stone-500 flex items-center gap-2">
                {saveSuccess ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Hero updated and saved for {currentDef.name}!
                  </span>
                ) : (
                  <span>Changes persist in browser storage and apply to all storefront visitors.</span>
                )}
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Save Hero for {currentDef.name}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
