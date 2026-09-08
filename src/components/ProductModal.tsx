import React, { useState, useRef, useEffect } from 'react';
import {
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Edit3,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { useCms } from '../context/CmsContext';
import { AdminProductEditorModal } from './AdminProductEditorModal';

export const ProductModal: React.FC = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    formatPrice,
    addToComparison,
    setIsComparisonOpen,
    setIsB2BModalOpen,
    setB2BTargetProduct,
    setIsSizeGuideOpen,
    isAdminLoggedIn,
    t,
  } = useCommerce();

  const { isCmsInPlaceMode } = useCms();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials'>('details');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;

  const availableColors =
    product.colors && product.colors.length > 0
      ? product.colors
      : [
          { name: 'Light Gold', hex: '#D4AF37' },
          { name: 'Champagne', hex: '#F7E7CE' },
          { name: 'Nero Black', hex: '#1C1917' },
        ];

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '37');
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);

  // Normalize angles array
  const rawAngles =
    product.angles && product.angles.length > 0
      ? product.angles
      : product.images.map((url, i) => ({
          url,
          label: i === 0 ? 'Front View' : i === 1 ? 'Side Profile' : 'Detail Shot',
          tag: i === 0 ? 'Front' : i === 1 ? 'Side' : 'Detail',
          isAiImage: false,
        }));

  const angles = rawAngles.filter((a) => a && a.url);
  const activeAngle = angles[selectedAngleIndex] || angles[0] || { url: product.images[0] };

  const handleNextAngle = () => {
    setSelectedAngleIndex((prev) => (prev + 1) % angles.length);
  };

  const handlePrevAngle = () => {
    setSelectedAngleIndex((prev) => (prev - 1 + angles.length) % angles.length);
  };

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in"
      onClick={() => setSelectedProductModal(null)}
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-3xl bg-white border border-stone-200 shadow-2xl text-stone-900 p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row: Category breadcrumb, Admin CMS Button, and Close */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
          <nav className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <span className="hover:text-stone-900 cursor-pointer" onClick={() => setSelectedProductModal(null)}>
              {t('Home', 'Home')}
            </span>
            <span>/</span>
            <span className="text-stone-900 font-semibold">{t(product.category, product.category)}</span>
            <span>/</span>
            <span className="text-stone-800 truncate max-w-[200px] sm:max-w-[320px] font-medium">
              {t(product.title, product.title)}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && isCmsInPlaceMode && (
              <button
                onClick={() => setIsEditorOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-bold font-mono shadow-xs transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t('Edit Text (CMS)', 'Edit Text (CMS)')}</span>
              </button>
            )}

            <button
              onClick={() => setSelectedProductModal(null)}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Two-Column Layout: Vertical Thumbnails + 1.5x Main Image + Zoom Option */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Vertical Thumbnails + Expansive 1.5x Main Stage */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 items-start">
            {/* Vertical Thumbnail Strip */}
            {angles.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[520px] shrink-0 no-scrollbar py-1 w-full sm:w-20">
                {angles.map((angle, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedAngleIndex(idx);
                      setZoomScale(1);
                    }}
                    className={`w-16 h-20 sm:w-20 sm:h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all p-1 bg-[#faf8f5] flex items-center justify-center cursor-pointer ${
                      selectedAngleIndex === idx
                        ? 'border-stone-900 ring-2 ring-stone-900/20 shadow-sm'
                        : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={angle.url}
                      alt={angle.label}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image: 1.5 Times Larger, with Zoom Option */}
            <div className="flex-1 relative w-full min-h-[420px] sm:min-h-[520px] rounded-2xl overflow-hidden bg-[#faf8f5] border border-stone-200 group shadow-inner flex flex-col">
              {/* Zoom Controls Overlay */}
              <div className="absolute top-3 end-3 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 rounded-xl border border-stone-200 shadow-xs">
                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.max(1, z - 0.5))}
                  disabled={zoomScale <= 1}
                  className="p-1 rounded text-stone-600 hover:text-stone-950 disabled:opacity-30 cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-mono font-bold text-stone-900 min-w-[32px] text-center">
                  {zoomScale.toFixed(1)}x
                </span>

                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.min(2.5, z + 0.5))}
                  disabled={zoomScale >= 2.5}
                  className="p-1 rounded text-stone-600 hover:text-stone-950 disabled:opacity-30 cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Prev / Next Arrows */}
              {angles.length > 1 && (
                <>
                  <button
                    onClick={handlePrevAngle}
                    className="absolute start-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextAngle}
                    className="absolute end-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Image Viewport - Expanded to fill width of box */}
              <div
                ref={containerRef}
                onClick={() => setZoomScale((z) => (z === 1 ? 1.75 : 1))}
                className={`w-full flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden ${
                  zoomScale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
              >
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-200"
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'center center',
                  }}
                >
                  <img
                    src={activeAngle.url}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full max-h-[560px] sm:max-h-[640px] object-contain drop-shadow-md select-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title (NO Subtitle), Text Colors, Add to Cart */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              {/* Category */}
              <div className="flex items-center justify-between text-xs text-stone-600 font-mono mb-1">
                <span className="uppercase font-bold tracking-wider">{t(product.category, product.category)}</span>
              </div>

              {/* Title (Strictly NO Subtitle or Tagline) */}
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-950 font-bold leading-tight">
                {t(product.title, product.title)}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-2.5 pt-2 border-t border-stone-200">
                <span className="text-2xl font-bold font-serif text-stone-950">
                  {formatPrice(product.priceUSD)}
                </span>
              </div>

              {/* Colors Available: Strictly TEXT labels (no round swatches) */}
              <div className="mt-4 pt-3 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono text-stone-700 font-bold uppercase tracking-wider">
                    {t('Colors Available', 'Colors Available')}
                  </span>
                  <span className="font-semibold text-stone-900">{t(selectedColor.name, selectedColor.name)}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {availableColors.map((clr) => {
                    const isSelected = selectedColor.name === clr.name;
                    return (
                      <button
                        key={clr.name}
                        type="button"
                        onClick={() => setSelectedColor(clr)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          isSelected
                            ? 'btn-champagne-size-selected shadow-xs'
                            : 'btn-champagne-size'
                        }`}
                      >
                        {t(clr.name, clr.name)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4 pt-3 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono text-stone-700 font-bold uppercase tracking-wider">
                    {t('Select Size', 'Select Size')}
                  </span>
                  <button
                    id="modal-size-guide-btn"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-stone-800 hover:text-stone-950 font-semibold flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{t('Size Guide', 'Size Guide')}</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-1 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'btn-champagne-size-selected shadow-xs'
                          : 'btn-champagne-size'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Buy Button */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#d6c9b6] rounded-xl overflow-hidden bg-[#faf7f2]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-stone-700 hover:bg-[#ede3d1] text-sm font-bold cursor-pointer transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono text-sm font-bold text-stone-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 text-stone-700 hover:bg-[#ede3d1] text-sm font-bold cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAdd}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                      added
                        ? 'btn-champagne-added ring-2 ring-[#8c7355]'
                        : 'btn-champagne-primary'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-[#8c7355]" />
                        <span>{t('Added to Bag!', 'Added to Bag!')}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#8c7355]" />
                        <span>{t('ADD TO CART •', 'ADD TO CART •')} {formatPrice(product.priceUSD * quantity)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Wholesale & Compare Silhouette */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setB2BTargetProduct(product);
                      setIsB2BModalOpen(true);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-800 text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-stone-600" />
                    <span>{t('Wholesale (MOQ 12)', 'Wholesale (MOQ 12)')}</span>
                  </button>
                  <button
                    onClick={() => {
                      addToComparison(product);
                      setIsComparisonOpen(true);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-800 text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Columns2 className="w-3.5 h-3.5 text-stone-600" />
                    <span>{t('Compare Silhouette', 'Compare Silhouette')}</span>
                  </button>
                </div>
              </div>

              {/* Exact Requested Lines: Handcrafted by Master Artisans & Vegan Leather */}
              <div className="mt-4 pt-3 border-t border-stone-200 grid grid-cols-2 gap-2 text-xs text-stone-700">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span className="font-semibold">{t('Handcrafted by Master Artisans', 'Handcrafted by Master Artisans')}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span className="font-semibold">{t('Vegan Leather', 'Vegan Leather')}</span>
                </div>
              </div>

              {/* Stöffa Product Details Tabs */}
              <div className="mt-4 pt-3 border-t border-stone-200">
                <div className="flex border-b border-stone-200 gap-4">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-stone-950 text-stone-950'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {t('Stöffa Product Details', 'Stöffa Product Details')}
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`pb-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
                      activeTab === 'materials'
                        ? 'border-stone-950 text-stone-950'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {t('Vegan Materials & Sole', 'Vegan Materials & Sole')}
                  </button>
                </div>

                <div className="pt-2 text-xs text-stone-600 font-light leading-relaxed">
                  {activeTab === 'details' && (
                    <p>{t(product.description, product.description)}</p>
                  )}
                  {activeTab === 'materials' && (
                    <div className="space-y-1">
                      <p><span className="font-semibold text-stone-800">{t('Materials:', 'Materials:')}</span> {t(product.materials, product.materials)}</p>
                      <p><span className="font-semibold text-stone-800">{t('Footbed:', 'Footbed:')}</span> {t('Cushioned memory foam footbed with ergonomic arch support.', 'Cushioned memory foam footbed with ergonomic arch support.')}</p>
                      <p><span className="font-semibold text-stone-800">{t('Heel:', 'Heel:')}</span> {t('2.5" calibrated low wedge with lawn-safe stability.', '2.5" calibrated low wedge with lawn-safe stability.')}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Admin Product CMS Modal */}
      <AdminProductEditorModal
        product={product}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </div>
  );
};
