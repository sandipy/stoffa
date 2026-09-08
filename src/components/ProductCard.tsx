import React, { useState } from 'react';
import {
  AlertCircle,
  Building2,
  Check,
  Columns2,
  Edit3,
  Eye,
  ShoppingBag,
  X,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { useCms } from '../context/CmsContext';
import { AdminProductEditorModal } from './AdminProductEditorModal';
import { Product, ProductAngle } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    activeCurrency,
    activeCampaign,
    addToCart,
    setSelectedProductModal,
    selectedOccasion,
    setSelectedOccasion,
    comparisonList,
    addToComparison,
    removeFromComparison,
    setIsComparisonOpen,
    setIsB2BModalOpen,
    setB2BTargetProduct,
    isAdminLoggedIn,
    t,
  } = useCommerce();

  const { isCmsInPlaceMode } = useCms();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isQuickBuying, setIsQuickBuying] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [showQuickPreview, setShowQuickPreview] = useState(false);

  // Collect angles: prefer product.angles if defined, fallback to product.images
  const angles: ProductAngle[] = product.angles && product.angles.length > 0
    ? product.angles
    : product.images.map((url, i) => ({
        url,
        label: i === 0 ? 'Studio Hero' : i === 1 ? 'Profile Angle' : 'Detail View',
        tag: i === 0 ? 'Front' : i === 1 ? 'Side' : 'Detail',
        isAiImage: i >= 3,
      }));

  const activeAngle = angles[activeAngleIndex] || angles[0];
  const isShoes = !product.category.toLowerCase().includes('bag') && !product.category.toLowerCase().includes('tote');

  const isCompared = comparisonList.some((p) => p.id === product.id);

  // Inventory & Low Stock Calculation
  const currentSizeInventory = product.inventory[selectedSize] ?? 4;
  const isLowStock = currentSizeInventory < 3;

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickBuying(true);

    // Add directly to cart without leaving the collection page
    addToCart(product, selectedSize, selectedColor, 1);

    setJustAdded(true);
    setTimeout(() => {
      setIsQuickBuying(false);
      setJustAdded(false);
    }, 1800);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  const handleOpenB2B = (e: React.MouseEvent) => {
    e.stopPropagation();
    setB2BTargetProduct(product);
    setIsB2BModalOpen(true);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => setSelectedProductModal(product)}
      onMouseLeave={() => setShowQuickPreview(false)}
      className="group relative rounded-[4px] bg-white border border-stone-200/90 hover:border-stone-400 hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 cursor-pointer"
    >
      {/* 1 Big Product Image Container with generous padding so low wedges and shoes are never cropped */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#faf8f5] rounded-t-[4px] p-5 sm:p-6 flex items-center justify-center">
        <img
          src={activeAngle.url}
          alt={`${product.title} - ${activeAngle.label}`}
          referrerPolicy="no-referrer"
          className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-xs"
        />

        {/* Top Badges - 4px corners */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-[4px] text-[10px] uppercase font-bold tracking-wider bg-amber-700 text-white shadow-sm">
              {t('Best Seller', 'Best Seller')}
            </span>
          )}
          {isLowStock && (
            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-bold tracking-wider bg-amber-800 text-amber-50 shadow-sm flex items-center gap-1 border border-amber-600/50">
              <AlertCircle className="w-2.5 h-2.5" />
              <span>{t('Low Stock', 'Low Stock')} ({currentSizeInventory} {t('left', 'left')})</span>
            </span>
          )}
        </div>

        {/* Top Right: Active Angle & Quick View trigger - 4px corners */}
        <div className="absolute top-3 end-3 z-10 flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-[4px] text-[10px] font-medium tracking-wide backdrop-blur-xs shadow-xs flex items-center gap-1 ${
              activeAngle.isAiImage
                ? 'bg-black/30 text-amber-200 border border-white/20'
                : 'bg-black/25 text-white border border-white/20'
            }`}
          >
            <span>{activeAngle.tag || activeAngle.label}</span>
          </span>

          {/* Quick View Button on each card - 4px corners */}
          <button
            id={`quick-view-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickPreview(!showQuickPreview);
            }}
            onMouseEnter={() => setShowQuickPreview(true)}
            className={`p-1.5 rounded-[4px] backdrop-blur-md border shadow-sm transition-all ${
              showQuickPreview
                ? 'bg-stone-900 text-white border-stone-800'
                : 'bg-white/90 text-stone-700 border-stone-300 hover:bg-white hover:text-stone-950'
            }`}
            title="Quick View preview overlay"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* On-Body AI Badge at bottom of image - 4px corners */}
        {activeAngle.isAiImage && !showQuickPreview && (
          <div className="absolute bottom-2.5 start-2.5 end-2.5 z-10 pointer-events-none">
            <div className="bg-black/30 backdrop-blur-xs text-white px-2.5 py-1 rounded-[4px] text-[10px] border border-white/25 shadow-md flex items-center justify-between">
              <span className="truncate font-medium flex items-center gap-1.5">
                <span>
                  {activeAngle.aiDescription
                    ? activeAngle.aiDescription
                    : isShoes
                    ? `Wearing ${product.title.replace('The Stöffa ', '')}`
                    : `Styling ${product.title.replace('The Stöffa ', '')}`}
                </span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-amber-300 font-bold shrink-0 ml-1">
                {activeAngle.shotType === 'ai_cu' ? 'CU & Mid' : 'Full Length'}
              </span>
            </div>
          </div>
        )}

        {/* Hover-based Quick View Preview Overlay */}
        {showQuickPreview && (
          <div
            className="absolute inset-0 bg-stone-950/40 backdrop-blur-md p-4 text-white z-20 flex flex-col justify-between animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-stone-700/80 pb-2">
              <div>
                <span className="text-[9px] uppercase font-mono tracking-wider text-amber-300 font-bold">
                  {t('Quick View Spec Sheet', 'Quick View Spec Sheet')}
                </span>
                <h4 className="font-serif text-sm font-medium line-clamp-2 leading-snug break-words">{t(product.title, product.title)}</h4>
              </div>
              <button
                onClick={() => setShowQuickPreview(false)}
                className="text-stone-400 hover:text-white p-1"
                aria-label="Dismiss Quick View"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Specs */}
            <div className="space-y-2 text-xs font-light text-stone-200 my-auto">
              <p className="line-clamp-2 text-[11px] leading-relaxed text-stone-300">
                {t(product.description, product.description)}
              </p>

              <div className="text-[11px] border-t border-stone-800 pt-1.5">
                <span className="text-stone-400 font-mono text-[10px] uppercase block">{t('Materials & Provenance:', 'Materials & Provenance:')}</span>
                <span className="text-stone-200 font-light">{t(product.materials, product.materials)}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] border-t border-stone-800 pt-1.5">
                <span className="text-stone-400 font-mono text-[10px] uppercase">{t('Selected Size Stock:', 'Selected Size Stock:')}</span>
                <span className={`font-mono font-bold ${isLowStock ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {currentSizeInventory} {t('available', 'available')} ({selectedSize})
                </span>
              </div>
            </div>

            {/* Quick Action Buttons inside Preview Overlay */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleToggleCompare}
                  className={`flex-1 py-1.5 px-2 rounded text-[10px] uppercase tracking-wider font-semibold border flex items-center justify-center gap-1 transition-colors ${
                    isCompared
                      ? 'bg-amber-500 border-amber-400 text-stone-950 font-bold'
                      : 'border-stone-700 bg-stone-900/90 text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <Columns2 className="w-3 h-3" />
                  <span>{isCompared ? t('In Compare', 'In Compare') : t('Compare', 'Compare')}</span>
                </button>
                <button
                  onClick={handleOpenB2B}
                  className="flex-1 py-1.5 px-2 rounded text-[10px] uppercase tracking-wider font-semibold border border-stone-700 bg-stone-900/90 hover:bg-stone-800 text-stone-200 flex items-center justify-center gap-1 transition-colors"
                >
                  <Building2 className="w-3 h-3 text-amber-300" />
                  <span>{t('Wholesale', 'Wholesale')}</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedProductModal(product)}
                className="w-full py-2 rounded bg-white text-stone-950 hover:bg-stone-100 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{t('Full Architectural Dossier', 'Full Architectural Dossier')}</span>
                <Eye className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3 or 4 More Angles Thumbnail Strip */}
      <div
        className="px-3 pt-2.5 pb-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-stone-100 bg-stone-50/70"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[9px] uppercase font-bold text-stone-400 shrink-0 tracking-wider">
          {t('Angles:', 'Angles:')}
        </span>
        {angles.map((angle, idx) => {
          const isSelected = activeAngleIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onMouseEnter={() => setActiveAngleIndex(idx)}
              onClick={() => setActiveAngleIndex(idx)}
              title={`${angle.label}${angle.aiDescription ? ` — ${angle.aiDescription}` : ''}`}
              className={`relative shrink-0 w-8 h-10 rounded-[4px] overflow-hidden border transition-all ${
                isSelected
                  ? 'border-stone-900 ring-2 ring-stone-900/30 scale-105 shadow-2xs'
                  : 'border-stone-200 opacity-65 hover:opacity-100 hover:border-stone-400'
              }`}
            >
              <img
                src={angle.url}
                alt={angle.label}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-0.5"
              />
              {angle.isAiImage && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-bl-sm flex items-center justify-center">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                </span>
              )}
            </button>
          );
        })}
        <span className="text-[10px] text-stone-400 shrink-0 ml-auto font-mono">
          {activeAngleIndex + 1}/{angles.length}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
            <span className="uppercase tracking-wider font-mono font-medium">{t(product.category, product.category)}</span>
          </div>

          {/* Title and CMS Edit trigger */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium group-hover:text-stone-700 transition-colors line-clamp-2 leading-snug break-words">
              {t(product.title, product.title)}
            </h3>

            {isAdminLoggedIn && isCmsInPlaceMode && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditorOpen(true);
                }}
                className="p-1 rounded bg-amber-300 hover:bg-amber-400 text-stone-950 text-[10px] font-mono font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                title="Edit Product Text (CMS)"
              >
                <Edit3 className="w-3 h-3" />
                <span>CMS</span>
              </button>
            )}
          </div>

          {/* Architectural Occasion Tagging */}
          {product.occasions && product.occasions.length > 0 && (
            <div
              className="mt-2.5 flex items-center gap-1.5 flex-wrap"
              onClick={(e) => e.stopPropagation()}
            >
              {product.occasions.slice(0, 3).map((occId) => {
                const isActive = selectedOccasion === occId;
                return (
                  <button
                    key={occId}
                    onClick={() => setSelectedOccasion(occId)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider transition-colors uppercase ${
                      isActive
                        ? 'btn-champagne-pill-active shadow-2xs'
                        : 'btn-champagne-pill'
                    }`}
                    title={`Filter by occasion: ${t(`occ_${occId}`) || occId}`}
                  >
                    {t(`occ_${occId}`) || occId}
                  </button>
                );
              })}
              {product.occasions.length > 3 && (
                <span className="text-[10px] font-mono text-stone-400">
                  +{product.occasions.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Occasion Styling Note */}
          {product.occasionNote && (
            <p className="text-[11px] text-stone-500 italic mt-1.5 line-clamp-1 font-light border-l-2 border-[#d6c9b6] pl-2">
              {t(product.occasionNote, product.occasionNote)}
            </p>
          )}
        </div>

        {/* Color Options: Strictly TEXT labels (no round swatches) */}
        <div className="space-y-1.5 pt-0.5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-stone-500 font-medium">{t('Colors Available:', 'Colors Available:')}</span>
            <span className="text-stone-900 font-semibold">{t(selectedColor.name, selectedColor.name)}</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-0.5">
            {product.colors.map((c, cIdx) => {
              const isSelected = selectedColor.name === c.name;
              const swatchImg = product.images[cIdx % product.images.length] || product.images[0];
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(c);
                    const matchedAngle = angles.findIndex((a) => a.url === swatchImg);
                    if (matchedAngle !== -1) {
                      setActiveAngleIndex(matchedAngle);
                    }
                  }}
                  title={`${t(c.name, c.name)} — Click to select shade`}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium tracking-wide transition-all cursor-pointer ${
                    isSelected
                      ? 'btn-champagne-size-selected shadow-2xs'
                      : 'btn-champagne-size'
                  }`}
                >
                  {t(c.name, c.name)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selection Pills with inventory indication */}
        <div
          className="flex items-center gap-1.5 flex-wrap pt-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[10px] uppercase font-mono text-stone-400 mr-0.5">{t('Size:', 'Size:')}</span>
          {product.sizes.map((sz) => {
            const stock = product.inventory[sz] ?? 4;
            return (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors relative cursor-pointer ${
                  selectedSize === sz
                    ? 'btn-champagne-size-selected shadow-xs'
                    : 'btn-champagne-size'
                }`}
                title={`${sz}: ${stock < 3 ? `${t('Low Stock', 'Low Stock')} (${stock} ${t('left', 'left')})` : t('In Stock', 'In Stock')}`}
              >
                <span>{sz}</span>
                {stock < 3 && (
                  <span className="inline-block w-1 h-1 rounded-full bg-amber-600 ml-1 mb-1"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Price & Quick Buy Button */}
        <div className="pt-3 border-t border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-mono text-base font-semibold text-stone-900">
              {formatPrice(product.priceUSD)}
            </span>
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">
              {activeCurrency.code} ({activeCurrency.symbol})
            </span>
          </div>

          {/* Quick Buy Action Button - Champagne Ivory */}
          <button
            id={`quick-buy-${product.id}`}
            onClick={handleQuickBuy}
            disabled={isQuickBuying}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
              justAdded
                ? 'btn-champagne-added ring-2 ring-[#8c7355]'
                : 'btn-champagne-primary'
            }`}
            title="Instantly add item to bag without leaving the collection page"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#8c7355] animate-in zoom-in" />
                <span>{t('added_to_bag')}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#8c7355]" />
                <span>{t('quick_buy')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Admin Product Editor Modal */}
      <AdminProductEditorModal
        product={product}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </div>
  );
};
