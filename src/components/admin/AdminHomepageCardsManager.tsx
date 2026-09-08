import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Save,
  RotateCcw,
  Check,
  ExternalLink,
  Info,
  Eye,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { useCommerce } from '../../context/CommerceContext';
import { CategoryCardImagePicker } from '../cms/CategoryCardImagePicker';
import { CURATED_IMAGE_LIBRARY } from '../../data/curatedImageLibrary';

export const AdminHomepageCardsManager: React.FC = () => {
  const { cmsData, updateCategoryCard, resetToDefaults } = useCms();
  const { setViewMode } = useCommerce();
  const [successKey, setSuccessKey] = useState<string | null>(null);

  const categoryCards = cmsData.pages.homepage.categoryCards;

  const cardDefinitions: Array<{
    key: 'shoes' | 'bags' | 'sale' | 'ready';
    defaultTitle: string;
    defaultSubtitle: string;
    defaultDestination: string;
    description: string;
  }> = [
    {
      key: 'shoes',
      defaultTitle: 'Shoes',
      defaultSubtitle: 'Architectural Wedges & Hand-Braided Straps',
      defaultDestination: 'Shoes',
      description: 'First card on the homepage 2x2 grid. Commonly showcases signature wedges, prom/date night heels, or bridal couture.',
    },
    {
      key: 'bags',
      defaultTitle: 'Bags',
      defaultSubtitle: 'Hand-Embroidered Antique Zardozi Potlis',
      defaultDestination: 'Bags',
      description: 'Second card highlighting handcrafted evening bags, potlis, and heirloom bridal clutches.',
    },
    {
      key: 'sale',
      defaultTitle: 'Sale',
      defaultSubtitle: 'Curated Heritage & Rare Archive Editions',
      defaultDestination: 'Sale',
      description: 'Third card dedicated to curated archives, seasonal edits (Date Night, Christmas Brunch), or special promotional offers.',
    },
    {
      key: 'ready',
      defaultTitle: 'Ready to Ship',
      defaultSubtitle: 'Dispatched Within 24 Hours Worldwide',
      defaultDestination: 'Ready to Ship',
      description: 'Fourth card dedicated to express dispatch atelier creations ready for immediate delivery.',
    },
  ];

  const handleUpdate = (
    key: 'shoes' | 'bags' | 'sale' | 'ready',
    field: string,
    value: string
  ) => {
    updateCategoryCard(key, { [field]: value });
    setSuccessKey(key);
    setTimeout(() => setSuccessKey(null), 1800);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Overview & Quick Actions Banner */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-semibold mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>HOMEPAGE ARCHITECTURE CMS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900 font-medium">
              Homepage 4 Category Cards &amp; Editorial Images
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-3xl">
              Manage the 4 primary visual doorways on the homepage (Shoes, Bags, Sale, Ready to Ship). Customize titles, subtitles, click targets, and assign curated photoshoot images (including the 10 new occasion images: Prom Night, Date Night, Christmas Brunch, Sangeet Gala, and more) or upload custom assets.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setViewMode('storefront');
                setTimeout(() => {
                  const el = document.getElementById('category-links-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Preview On Storefront</span>
            </button>
          </div>
        </div>

        {/* Feature highlight badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-amber-900">135+ Media Photos Available</div>
              <div className="text-[11px] text-amber-700/90 leading-tight mt-0.5">
                Browse all photos in the media folder across Prom Night, Date Night, Wedges, Potlis, Occasions &amp; Editorial shoots.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-stone-900">Dynamic Fallback Mode</div>
              <div className="text-[11px] text-stone-500 leading-tight mt-0.5">
                Leave custom image unassigned to enable the automated rotating pool on every page load.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
            <Save className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-stone-900">Live Auto-Persistence</div>
              <div className="text-[11px] text-stone-500 leading-tight mt-0.5">
                All changes sync automatically to persistent local storage and reflect across all views instantly.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Cards Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cardDefinitions.map((def) => {
          const cardData = categoryCards[def.key] || {
            title: def.defaultTitle,
            subtitle: def.defaultSubtitle,
            categoryTarget: def.defaultDestination,
            imageUrl: '',
          };

          const isSaved = successKey === def.key;

          return (
            <div
              key={def.key}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-stone-900 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                      {def.key === 'shoes' ? '01' : def.key === 'bags' ? '02' : def.key === 'sale' ? '03' : '04'}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-stone-900 uppercase font-mono tracking-wider">
                        {def.key.toUpperCase()} CARD
                      </h3>
                      <p className="text-[11px] text-stone-400 font-sans">{def.description}</p>
                    </div>
                  </div>

                  {isSaved && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium flex items-center gap-1 animate-in fade-in">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Updated</span>
                    </span>
                  )}
                </div>

                {/* Form Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Display Title
                    </label>
                    <input
                      type="text"
                      value={cardData.title}
                      onChange={(e) => handleUpdate(def.key, 'title', e.target.value)}
                      placeholder={def.defaultTitle}
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Click Destination
                    </label>
                    <select
                      value={cardData.categoryTarget || def.defaultDestination}
                      onChange={(e) => handleUpdate(def.key, 'categoryTarget', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-stone-900 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all"
                    >
                      <option value="Shoes">Shoes Collection</option>
                      <option value="Bags">Bags &amp; Potlis</option>
                      <option value="Sale">Sale Archive</option>
                      <option value="Ready to Ship">Ready to Ship</option>
                      <option value="Wedges">Architectural Wedges</option>
                      <option value="Bridal">Bridal Couture</option>
                      <option value="Flats">Artisanal Flats</option>
                      <option value="Block Heels">Block Heels</option>
                      <option value="Collections">The Collections</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-600 font-semibold mb-1">
                    Subtitle &amp; Craft Description
                  </label>
                  <textarea
                    rows={2}
                    value={cardData.subtitle}
                    onChange={(e) => handleUpdate(def.key, 'subtitle', e.target.value)}
                    placeholder={def.defaultSubtitle}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all leading-snug"
                  />
                </div>

                {/* Visual Image Selector with Gallery & Upload */}
                <div className="p-3.5 rounded-xl bg-stone-950 text-white">
                  <CategoryCardImagePicker
                    cardKey={def.key}
                    currentImageUrl={cardData.imageUrl}
                    defaultFallbackLabel={`Dynamic ${def.key.toUpperCase()} Pool`}
                    onSelectImage={(newUrl) => handleUpdate(def.key, 'imageUrl', newUrl)}
                  />
                </div>
              </div>

              {/* Mini Card Live Preview */}
              <div className="pt-3 border-t border-stone-100">
                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Storefront Live Rendering</span>
                  <span className="text-stone-500">Destination: {cardData.categoryTarget || def.defaultDestination}</span>
                </div>
                <div className="relative aspect-[16/9] w-full rounded-[4px] overflow-hidden bg-stone-100 border border-stone-200 shadow-2xs">
                  <img
                    src={cardData.imageUrl || CURATED_IMAGE_LIBRARY[0].imageUrl}
                    alt={cardData.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-3 bottom-3 text-white flex flex-col items-center justify-end text-center">
                    <div className="text-base font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {cardData.title || def.defaultTitle}
                    </div>
                    <div className="text-[10px] text-stone-200 italic mt-0.5 line-clamp-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      {cardData.subtitle || def.defaultSubtitle}
                    </div>
                    <span className="mt-1.5 px-3 py-0.5 bg-white/20 text-white text-[9px] tracking-[0.15em] uppercase font-bold border border-white/75 rounded-[3px]">
                      &ndash; Shop Collection &ndash;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
