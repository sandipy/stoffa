import React, { useState, useRef, useEffect } from 'react';
import {
  Check,
  ChevronDown,
  Globe,
  Menu,
  X,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { BasketCartIcon } from './BasketCartIcon';
import { categoryToUrl } from '../utils/navigationRouter';

interface ShoeSubItem {
  id: string;
  label: string;
  filterValue: string;
}

export const Navbar: React.FC = () => {
  const {
    activeLanguage,
    setIsLanguageModalOpen,
    languages,
    setLanguage,
    cart,
    setIsCartOpen,
    setViewMode,
    selectedCategory,
    setSelectedCategory,
    setSelectedProductModal,
    clearFilters,
    t,
    setIsTranslationMdModalOpen,
  } = useCommerce();

  const [shoesDropdownOpen, setShoesDropdownOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShoesExpanded, setMobileShoesExpanded] = useState(true);
  const [mobileCollectionsExpanded, setMobileCollectionsExpanded] = useState(false);

  const shoesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const collectionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const languageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Supported languages for quick hover selection
  const targetLanguageCodes = ['en', 'fr', 'es', 'de', 'it', 'pt'];
  const quickLanguages = languages.filter((l) => targetLanguageCodes.includes(l.code));

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 5 Shoe subcategories as per handwritten image (clean, unnumbered, without style counts)
  const shoeSubItems: ShoeSubItem[] = [
    {
      id: 'low-wedges',
      label: 'Low wedges - 2.5 inch',
      filterValue: 'Low wedges - 2.5 inch',
    },
    {
      id: 'high-wedges',
      label: 'High wedges - 3.5 inch',
      filterValue: 'High wedges - 3.5 inch',
    },
    {
      id: 'higher-wedge',
      label: 'Higher wedge - 4.25 inch',
      filterValue: 'Higher wedge - 4.25 inch',
    },
    {
      id: 'block-heels',
      label: 'Block Heels',
      filterValue: 'Block Heels',
    },
    {
      id: 'flats',
      label: 'Flats',
      filterValue: 'Flats',
    },
  ];

  const collectionSubItems = [
    { label: 'Bride on Her Feet', filterValue: 'Bride on Her Feet' },
    { label: 'Mother of the Bride', filterValue: 'Mother of the Bride' },
    { label: 'The Bridesmaid Edit', filterValue: 'The Bridesmaid Edit' },
    { label: 'The Destination Bride', filterValue: 'The Destination Bride' },
    { label: 'The Sangeet Ceremony', filterValue: 'The Sangeet Ceremony' },
    { label: 'Something Blue', filterValue: 'Something Blue' },
    { label: 'Prom Night', filterValue: 'Prom Night' },
    { label: 'Quinceañera Glam', filterValue: 'Quinceañera Glam' },
    { label: 'Cruise Ready', filterValue: 'Cruise Ready' },
    { label: 'The Holiday Edit', filterValue: 'The Holiday Edit' },
    { label: 'Garden Party', filterValue: 'Garden Party' },
    { label: 'Red Carpet Ready', filterValue: 'Red Carpet Ready' },
    { label: 'Christmas Brunch', filterValue: 'Christmas Brunch' },
    { label: "Girls' Night Out", filterValue: "Girls' Night Out" },
    { label: 'Date Night', filterValue: 'Date Night' },
  ];

  const collectionThemedGroups = [
    {
      theme: 'Wedding & Ceremonies',
      items: [
        { label: 'Bride on Her Feet', filterValue: 'Bride on Her Feet' },
        { label: 'Mother of the Bride', filterValue: 'Mother of the Bride' },
        { label: 'The Bridesmaid Edit', filterValue: 'The Bridesmaid Edit' },
        { label: 'The Destination Bride', filterValue: 'The Destination Bride' },
        { label: 'The Sangeet Ceremony', filterValue: 'The Sangeet Ceremony' },
        { label: 'Something Blue', filterValue: 'Something Blue' },
      ],
    },
    {
      theme: 'Galas & Celebrations',
      items: [
        { label: 'Red Carpet Ready', filterValue: 'Red Carpet Ready' },
        { label: 'Prom Night', filterValue: 'Prom Night' },
        { label: 'Quinceañera Glam', filterValue: 'Quinceañera Glam' },
        { label: 'Garden Party', filterValue: 'Garden Party' },
        { label: 'Christmas Brunch', filterValue: 'Christmas Brunch' },
      ],
    },
    {
      theme: 'Resort & Evenings',
      items: [
        { label: 'Cruise Ready', filterValue: 'Cruise Ready' },
        { label: 'The Holiday Edit', filterValue: 'The Holiday Edit' },
        { label: "Girls' Night Out", filterValue: "Girls' Night Out" },
        { label: 'Date Night', filterValue: 'Date Night' },
      ],
    },
  ];

  const handleSelectNav = (filterValue: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setViewMode('storefront');
    setSelectedProductModal(null);
    clearFilters();
    setShoesDropdownOpen(false);
    setCollectionsDropdownOpen(false);
    setMobileMenuOpen(false);

    const targetCategory = filterValue === 'Home' ? 'All' : filterValue;
    setSelectedCategory(targetCategory);
    const targetUrl = categoryToUrl(targetCategory);
    if (window.location.hash !== targetUrl) {
      window.location.hash = targetUrl;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLogoClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setViewMode('storefront');
    setSelectedProductModal(null);
    clearFilters();
    setSelectedCategory('All');
    setMobileMenuOpen(false);
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleShoesMouseEnter = () => {
    if (shoesTimeoutRef.current) clearTimeout(shoesTimeoutRef.current);
    setShoesDropdownOpen(true);
  };

  const handleShoesMouseLeave = () => {
    shoesTimeoutRef.current = setTimeout(() => {
      setShoesDropdownOpen(false);
    }, 150);
  };

  const handleCollectionsMouseEnter = () => {
    if (collectionsTimeoutRef.current) clearTimeout(collectionsTimeoutRef.current);
    setCollectionsDropdownOpen(true);
  };

  const handleCollectionsMouseLeave = () => {
    collectionsTimeoutRef.current = setTimeout(() => {
      setCollectionsDropdownOpen(false);
    }, 150);
  };

  const handleLanguageMouseEnter = () => {
    if (languageTimeoutRef.current) clearTimeout(languageTimeoutRef.current);
    setLanguageDropdownOpen(true);
  };

  const handleLanguageMouseLeave = () => {
    languageTimeoutRef.current = setTimeout(() => {
      setLanguageDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (shoesTimeoutRef.current) clearTimeout(shoesTimeoutRef.current);
      if (collectionsTimeoutRef.current) clearTimeout(collectionsTimeoutRef.current);
      if (languageTimeoutRef.current) clearTimeout(languageTimeoutRef.current);
    };
  }, []);

  // Check if current category matches Shoes or one of its 5 children
  const isShoesActive =
    selectedCategory === 'Shoes' ||
    shoeSubItems.some((item) => item.filterValue === selectedCategory);

  const isCollectionsActive =
    selectedCategory === 'Collections' ||
    collectionSubItems.some((item) => item.filterValue === selectedCategory);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 transition-colors shadow-xs">
      {/* Main Brand Header Row (Crisp White with centered luxury typography) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 flex items-center justify-between">
        {/* Left: Mobile Menu Toggle or Desktop Spacer (Fixed symmetric width prevents logo shifting) */}
        <div className="flex items-center shrink-0 w-12 sm:w-16 md:w-48 lg:w-64">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 -ml-2 rounded-lg text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Center: Brand Identity - Only Text Logo, Centered without interference */}
        <div className="flex-1 flex justify-center text-center px-1 sm:px-4 min-w-0">
          <a
            href="#/"
            id="brand-logo-btn"
            onClick={handleLogoClick}
            className="inline-flex flex-col items-center group cursor-pointer py-1 max-w-full"
          >
            <span className="font-serif text-[1.35rem] xs:text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.18em] text-stone-900 font-medium lowercase transition-colors group-hover:text-stone-950 leading-none whitespace-nowrap">
              accesoire
            </span>
          </a>
        </div>

        {/* Right: Language Selector (on desktop) and Cart (matches Left width for perfect symmetry) */}
        <div className="flex items-center justify-end shrink-0 w-12 sm:w-16 md:w-48 lg:w-64 gap-2 sm:gap-4">
          {/* Language Selector with visual indicator & choose/select on hover (Desktop only to prevent mobile overlap) */}
          <div
            className="relative hidden md:block"
            onMouseEnter={handleLanguageMouseEnter}
            onMouseLeave={handleLanguageMouseLeave}
          >
            <button
              id="navbar-language-btn"
              onClick={() => setLanguageDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer group ${
                languageDropdownOpen
                  ? 'border-stone-300 bg-stone-100 text-stone-950'
                  : 'border-transparent hover:border-stone-200 hover:bg-stone-50 text-[#243c68] hover:text-stone-950'
              }`}
              title="Select storefront language"
              aria-label="Select storefront language"
              aria-haspopup="true"
              aria-expanded={languageDropdownOpen}
            >
              <Globe className="w-4 h-4 text-[#243c68] group-hover:text-stone-950 transition-colors shrink-0" />
              <span className="text-[14px] sm:text-base font-medium tracking-normal">
                {activeLanguage.nativeName || activeLanguage.name}
              </span>
              {/* Visual indicator to select/dropdown language */}
              <ChevronDown
                className={`w-3.5 h-3.5 text-stone-500 group-hover:text-stone-900 transition-transform duration-200 shrink-0 ${
                  languageDropdownOpen ? 'rotate-180 text-stone-950' : ''
                }`}
              />
            </button>

            {/* Hover dropdown to choose or select language */}
            {languageDropdownOpen && (
              <div
                className="absolute right-0 top-full pt-1.5 z-50 w-56 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={handleLanguageMouseEnter}
                onMouseLeave={handleLanguageMouseLeave}
              >
                <div className="bg-white rounded-[4px] shadow-xl border border-stone-200 p-2 text-stone-900 ring-1 ring-black/5">
                  <div className="px-2.5 py-1.5 mb-1 border-b border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      {t('Select Language', 'Select Language')}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono font-semibold">
                      {activeLanguage.code.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-0.5 max-h-64 overflow-y-auto">
                    {quickLanguages.map((lang) => {
                      const isSelected = activeLanguage.code === lang.code;
                      return (
                        <button
                          key={lang.code}
                          id={`quick-lang-select-${lang.code}`}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLanguageDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-[4px] text-left text-sm transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-50 text-teal-950 font-bold'
                              : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base leading-none">{lang.flag}</span>
                            <span className="text-[13px]">{lang.nativeName || lang.name}</span>
                          </div>
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5 text-teal-800 shrink-0" />
                          ) : (
                            <span className="text-[10px] text-stone-400 font-mono uppercase">
                              {lang.code}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Offline translations.md Manager Trigger */}
                  <div className="mt-2 pt-2 border-t border-stone-100">
                    <button
                      id="navbar-translations-md-btn"
                      onClick={() => {
                        setIsTranslationMdModalOpen(true);
                        setLanguageDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg btn-champagne-secondary text-xs font-semibold tracking-wide cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#8c7355]" />
                      <span>{t('translations_md_btn', 'translations.md Dictionary')}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            id="cart-toggle-btn"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2.5 text-[#243c68] hover:text-stone-950 transition-colors cursor-pointer group py-1.5 px-1 shrink-0"
            aria-label="View Shopping Cart"
          >
            <span className="hidden sm:inline text-[15px] sm:text-base font-medium tracking-normal">
              {t('cart') || 'Cart'}
            </span>
            <div className="relative flex items-center justify-center">
              <BasketCartIcon className="w-5 h-5 stroke-[1.8] group-hover:scale-105 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full btn-champagne-primary text-[10px] font-bold flex items-center justify-center font-mono shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* 3. Navigation Links Row: Walker & Wade Clean White Aesthetic with Underline Movement */}
      <nav className="hidden md:block bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 lg:gap-10">
            {/* JUST IN */}
            <div className="relative group">
              <a
                href="#/just-in"
                id="nav-just-in-btn"
                onClick={(e) => handleSelectNav('Just In', e)}
                className={`relative py-2.5 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer block ${
                  selectedCategory === 'Just In'
                    ? 'text-stone-950'
                    : 'text-stone-900 hover:text-stone-950'
                }`}
              >
                <span>{t('nav_just_in')}</span>
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-stone-950 transition-all duration-300 ease-out ${
                    selectedCategory === 'Just In'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </div>

            {/* SHOES (With Dropdown per attached handwritten image, no numbers, no descriptions) */}
            <div
              className="relative group"
              onMouseEnter={handleShoesMouseEnter}
              onMouseLeave={handleShoesMouseLeave}
            >
              <a
                href="#/shoes"
                id="nav-shoes-btn"
                onClick={(e) => handleSelectNav('Shoes', e)}
                className={`relative py-2.5 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isShoesActive
                    ? 'text-stone-950'
                    : 'text-stone-900 hover:text-stone-950'
                }`}
              >
                <span>{t('nav_shoes')}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    shoesDropdownOpen ? 'rotate-180 text-stone-950' : 'text-stone-600'
                  }`}
                />
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-stone-950 transition-all duration-300 ease-out ${
                    isShoesActive
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>

              {/* Walker & Wade Clean Style Dropdown Menu for SHOES */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50 transition-all duration-200 ease-out ${
                  shoesDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 translate-y-2 pointer-events-none invisible'
                }`}
              >
                <div className="w-[280px] bg-white rounded-[4px] shadow-2xl border border-stone-200/90 overflow-hidden py-2">
                  {shoeSubItems.map((item) => {
                    const isItemActive = selectedCategory === item.filterValue;
                    return (
                      <a
                        key={item.id}
                        href={categoryToUrl(item.filterValue)}
                        id={`nav-shoe-sub-${item.id}`}
                        onClick={(e) => handleSelectNav(item.filterValue, e)}
                        className={`w-full px-5 py-3 text-left flex items-center justify-between group/sub transition-all cursor-pointer ${
                          isItemActive
                            ? 'bg-amber-50 text-stone-950 font-bold border-l-4 border-stone-950'
                            : 'text-stone-900 hover:bg-stone-50 hover:text-stone-950'
                        }`}
                      >
                        <span className="text-sm font-semibold tracking-wide text-stone-900 group-hover/sub:text-stone-950 group-hover/sub:translate-x-0.5 transition-transform">
                          {t(item.label)}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/sub:opacity-100 text-stone-600 transition-opacity" />
                      </a>
                    );
                  })}
                  <div className="pt-2 px-5 border-t border-stone-100 mt-1">
                    <a
                      href="#/shoes"
                      onClick={(e) => handleSelectNav('Shoes', e)}
                      className="w-full py-2 text-left text-xs font-bold uppercase tracking-[0.14em] text-stone-900 hover:text-amber-900 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{t('View All Shoes', 'View All Shoes')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* BAGS */}
            <div className="relative group">
              <a
                href="#/bags"
                id="nav-bags-btn"
                onClick={(e) => handleSelectNav('Bags', e)}
                className={`relative py-2.5 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer block ${
                  selectedCategory === 'Bags'
                    ? 'text-stone-950'
                    : 'text-stone-900 hover:text-stone-950'
                }`}
              >
                <span>{t('nav_bags')}</span>
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-stone-950 transition-all duration-300 ease-out ${
                    selectedCategory === 'Bags'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </div>

            {/* COLLECTIONS (With Dropdown) */}
            <div
              className="relative group"
              onMouseEnter={handleCollectionsMouseEnter}
              onMouseLeave={handleCollectionsMouseLeave}
            >
              <a
                href="#/collections"
                id="nav-collections-btn"
                onClick={(e) => handleSelectNav('Collections', e)}
                className={`relative py-2.5 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isCollectionsActive
                    ? 'text-stone-950'
                    : 'text-stone-900 hover:text-stone-950'
                }`}
              >
                <span>{t('nav_collections')}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    collectionsDropdownOpen ? 'rotate-180 text-stone-950' : 'text-stone-600'
                  }`}
                />
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-stone-950 transition-all duration-300 ease-out ${
                    isCollectionsActive
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>

              {/* Collections Dropdown */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50 transition-all duration-200 ease-out ${
                  collectionsDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 translate-y-2 pointer-events-none invisible'
                }`}
              >
                <div className="w-[680px] bg-white rounded-[4px] shadow-2xl border border-stone-200/90 overflow-hidden py-3">
                  {/* 3 Themed Columns as requested */}
                  <div className="p-4 grid grid-cols-3 gap-4">
                    {collectionThemedGroups.map((group) => (
                      <div key={group.theme} className="space-y-1.5">
                        <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-900 border-b border-stone-200 pb-1.5 mb-2">
                          {t(group.theme, group.theme)}
                        </div>
                        <div className="space-y-0.5">
                          {group.items.map((c) => (
                            <a
                              key={c.label}
                              href={categoryToUrl(c.filterValue)}
                              onClick={(e) => handleSelectNav(c.filterValue, e)}
                              className={`w-full px-2 py-1.5 text-left text-xs sm:text-[13px] font-semibold tracking-wide rounded-[4px] transition-colors cursor-pointer flex items-center justify-between ${
                                selectedCategory === c.filterValue
                                  ? 'bg-amber-50 text-stone-950 border-l-2 border-stone-950 font-bold'
                                  : 'text-stone-800 hover:bg-stone-50 hover:text-stone-950'
                              }`}
                            >
                              <span className="truncate">{t(c.label, c.label)}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SALE */}
            <div className="relative group">
              <a
                href="#/sale"
                id="nav-sale-btn"
                onClick={(e) => handleSelectNav('Sale', e)}
                className={`relative py-2.5 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer block ${
                  selectedCategory === 'Sale'
                    ? 'text-stone-950'
                    : 'text-rose-700 hover:text-rose-900'
                }`}
              >
                <span className="text-rose-700">{t('nav_sale')}</span>
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-rose-700 transition-all duration-300 ease-out ${
                    selectedCategory === 'Sale'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </div>

            {/* READY TO SHIP */}
            <div className="relative group">
              <a
                href="#/ready-to-ship"
                id="nav-ready-to-ship-btn"
                onClick={(e) => handleSelectNav('Ready to Ship', e)}
                className={`relative py-2.5 px-2 text-sm lg:text-base font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer block ${
                  selectedCategory === 'Ready to Ship'
                    ? 'text-stone-950'
                    : 'text-stone-900 hover:text-stone-950'
                }`}
              >
                <span>{t('nav_ready_to_ship')}</span>
                {/* Walker & Wade Underline Movement */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-stone-950 transition-all duration-300 ease-out ${
                    selectedCategory === 'Ready to Ship'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer (Clean White Aesthetic) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-black/60 backdrop-blur-xs">
          <div className="w-4/5 max-w-sm h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <span className="font-serif text-2xl font-bold lowercase tracking-widest text-stone-950">
                accesoire
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Language Switcher on Mobile Drawer */}
            <div className="px-5 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                {t('Language', 'Language')}
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLanguageModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-[4px] border border-stone-300 bg-white text-stone-900 text-xs font-semibold hover:bg-stone-50 cursor-pointer shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-[#243c68]" />
                <span>{activeLanguage.nativeName || activeLanguage.name}</span>
                <ChevronDown className="w-3 h-3 text-stone-500" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* JUST IN */}
              <a
                href="#/just-in"
                onClick={(e) => handleSelectNav('Just In', e)}
                className="w-full text-left py-2 text-lg font-bold uppercase tracking-[0.14em] text-stone-900 border-b border-stone-100 block"
              >
                {t('nav_just_in')}
              </a>

              {/* SHOES ACCORDION */}
              <div>
                <button
                  onClick={() => setMobileShoesExpanded(!mobileShoesExpanded)}
                  className="w-full py-2 text-lg font-bold uppercase tracking-[0.14em] text-stone-900 flex items-center justify-between border-b border-stone-100"
                >
                  <span>{t('nav_shoes')}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      mobileShoesExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileShoesExpanded && (
                  <div className="pl-3 py-2 space-y-2 border-l-2 border-stone-200 ml-2 mt-2">
                    {shoeSubItems.map((item) => (
                      <a
                        key={item.id}
                        href={categoryToUrl(item.filterValue)}
                        onClick={(e) => handleSelectNav(item.filterValue, e)}
                        className="w-full text-left py-1.5 text-base font-semibold text-stone-800 hover:text-stone-950 flex items-center justify-between block"
                      >
                        <span>{t(item.label)}</span>
                      </a>
                    ))}
                    <a
                      href="#/shoes"
                      onClick={(e) => handleSelectNav('Shoes', e)}
                      className="w-full text-left py-1.5 text-xs uppercase font-bold text-stone-800 tracking-wider pt-2 block"
                    >
                      {t('View All Shoes', 'View All Shoes')} &rarr;
                    </a>
                  </div>
                )}
              </div>

              {/* BAGS */}
              <a
                href="#/bags"
                onClick={(e) => handleSelectNav('Bags', e)}
                className="w-full text-left py-2 text-lg font-bold uppercase tracking-[0.14em] text-stone-900 border-b border-stone-100 block"
              >
                {t('nav_bags')}
              </a>

              {/* COLLECTIONS ACCORDION */}
              <div>
                <button
                  onClick={() => setMobileCollectionsExpanded(!mobileCollectionsExpanded)}
                  className="w-full py-2 text-lg font-bold uppercase tracking-[0.14em] text-stone-900 flex items-center justify-between border-b border-stone-100"
                >
                  <span>{t('nav_collections')}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      mobileCollectionsExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileCollectionsExpanded && (
                  <div className="pl-3 py-2 space-y-3 border-l-2 border-stone-200 ml-2 mt-2">
                    {collectionThemedGroups.map((group) => (
                      <div key={group.theme} className="space-y-1">
                        <div className="text-[10px] uppercase font-bold tracking-[0.16em] text-amber-900 pt-1 pb-0.5">
                          {t(group.theme, group.theme)}
                        </div>
                        <div className="space-y-0.5 pl-1.5 border-l border-stone-200">
                          {group.items.map((c) => (
                            <a
                              key={c.label}
                              href={categoryToUrl(c.filterValue)}
                              onClick={(e) => handleSelectNav(c.filterValue, e)}
                              className={`w-full text-left py-1.5 px-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between block ${
                                selectedCategory === c.filterValue
                                  ? 'bg-amber-100 text-stone-950 font-bold'
                                  : 'text-stone-800 hover:text-stone-950 hover:bg-stone-50'
                              }`}
                            >
                              <span>{t(c.label, c.label)}</span>
                              {selectedCategory === c.filterValue && (
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SALE */}
              <a
                href="#/sale"
                onClick={(e) => handleSelectNav('Sale', e)}
                className="w-full text-left py-2 text-lg font-bold uppercase tracking-[0.14em] text-rose-700 border-b border-stone-100 block"
              >
                {t('nav_sale')}
              </a>

              {/* READY TO SHIP */}
              <a
                href="#/ready-to-ship"
                onClick={(e) => handleSelectNav('Ready to Ship', e)}
                className="w-full text-left py-2 text-lg font-bold uppercase tracking-[0.14em] text-stone-900 border-b border-stone-100 block"
              >
                {t('nav_ready_to_ship')}
              </a>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-stone-200 space-y-2.5 bg-[#faf7f2]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLanguageModalOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl btn-champagne-primary font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Globe className="w-4 h-4 text-[#8c7355]" />
                <span>{activeLanguage.name}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTranslationMdModalOpen(true);
                }}
                className="w-full py-2 px-4 rounded-xl btn-champagne-secondary font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-[#8c7355]" />
                <span>{t('translations_md_btn', 'translations.md Dictionary')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
