import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Building2,
  Check,
  Edit3,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { useCms } from '../context/CmsContext';
import { AdminProductEditorModal } from './AdminProductEditorModal';
import { getShoeColorTheme } from '../utils/shoeColorTheme';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    formatPrice,
    setIsB2BModalOpen,
    setB2BTargetProduct,
    setIsSizeGuideOpen,
    isAdminLoggedIn,
    t,
  } = useCommerce();

  const { isCmsInPlaceMode } = useCms();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;

  // Available Colors - strictly rendered as text (no round color swatches)
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
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'craftsmanship'>('details');

  // Dynamic theme matching the shoe color on the left
  const shoeTheme = getShoeColorTheme(selectedColor?.name, selectedColor?.hex, product.title);

  const rawAngles =
    product.angles && product.angles.length > 0
      ? product.angles
      : product.images.map((url, i) => ({
          url,
          label: i === 0 ? 'Studio Front Angle' : i === 1 ? 'Lateral Profile' : 'Artisanal Detail',
          tag: i === 0 ? 'Front' : i === 1 ? 'Side' : 'Detail',
          isAiImage: false,
        }));

  const angles = rawAngles.filter((a) => a && a.url);
  const currentAngle = angles[selectedAngleIndex] || angles[0] || { url: product.images[0] };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setZoomScale(1);
  }, [product.id]);

  return (
    <div className="w-full bg-[#faf9f6] min-h-screen pb-20">
      {/* Top Return Bar */}
      <div className="border-b border-stone-200/80 bg-white sticky top-0 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => setSelectedProductModal(null)}
            className="flex items-center gap-2 btn-champagne-secondary px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#8c7355]" />
            <span>{t('Back to Storefront', 'Back to Storefront')}</span>
          </button>

          {/* Admin CMS Edit Button */}
          {isAdminLoggedIn && isCmsInPlaceMode && (
            <button
              onClick={() => setIsEditorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-bold font-mono shadow-xs transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t('Edit Product Text (CMS)', 'Edit Product Text (CMS)')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Detail Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: VERTICAL Image Views & 1.5x LARGER Main Stage with Zoom */}
          <div className="lg:col-span-7 flex flex-row gap-3 sm:gap-4 items-start">
            {/* Vertical Thumbnails List (Strictly Vertical, not Horizontal) */}
            {angles.length > 1 && (
              <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[640px] sm:max-h-[720px] shrink-0 scrollbar-none py-1 w-16 sm:w-20 md:w-24">
                {angles.map((ang, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedAngleIndex(idx);
                      setZoomScale(1);
                    }}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#faf8f5] p-1.5 flex items-center justify-center ${
                      selectedAngleIndex === idx
                        ? 'shadow-md'
                        : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-stone-400'
                    }`}
                    style={selectedAngleIndex === idx ? { borderColor: shoeTheme.accentBorder, boxShadow: `0 0 0 2px ${shoeTheme.accentBorder}40` } : undefined}
                    title={ang.label || `View ${idx + 1}`}
                  >
                    <img
                      src={ang.url}
                      alt={ang.label || `Angle ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image: 1.5 Times Larger, with Zoom Option */}
            <div className="relative flex-1 w-full min-h-[560px] sm:min-h-[680px] lg:min-h-[780px] bg-[#fbf9f6] rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm flex flex-col">
              {/* Zoom Controls Overlay */}
              <div className="absolute top-4 end-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-stone-200 shadow-xs">
                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.max(1, z - 0.5))}
                  disabled={zoomScale <= 1}
                  className="p-1 rounded text-stone-600 hover:text-stone-950 disabled:opacity-30 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono font-bold text-stone-900 min-w-[36px] text-center">
                  {zoomScale.toFixed(1)}x
                </span>

                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.min(2.5, z + 0.5))}
                  disabled={zoomScale >= 2.5}
                  className="p-1 rounded text-stone-600 hover:text-stone-950 disabled:opacity-30 cursor-pointer"
                  title="Zoom In (1.5x to 2.5x)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Top Category Badge */}
              <div className="absolute top-4 start-4 z-10">
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-mono font-bold tracking-wider text-stone-900 border border-stone-200 shadow-2xs">
                  {t(product.category, product.category)}
                </span>
              </div>

              {/* Image Viewport - Expanded to fill width of box */}
              <div
                ref={imageContainerRef}
                className={`w-full flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden relative ${
                  zoomScale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setZoomScale((z) => (z === 1 ? 1.75 : 1))}
              >
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'center center',
                  }}
                >
                  <img
                    src={currentAngle.url}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full max-h-[680px] sm:max-h-[760px] lg:max-h-[860px] object-contain drop-shadow-md select-none"
                  />
                </div>
              </div>

              {/* Bottom hint */}
              <div className="px-4 py-2 bg-stone-100/60 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span>{t('Click image or use controls to zoom in (up to 2.5x)', 'Click image or use controls to zoom in (up to 2.5x)')}</span>
                <span>{selectedAngleIndex + 1} / {angles.length}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Specs, Color Text, Add to Cart */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Product Title - Strictly NO Subtitle or Tagline */}
              <div className="space-y-1">
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-950 font-bold leading-tight">
                  {t(product.title, product.title)}
                </h1>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-serif text-stone-950 font-bold">
                  {formatPrice(product.priceUSD)}
                </span>
              </div>

              {/* Colors Available: Strictly TEXT labels (no round swatches) */}
              <div className="pt-4 space-y-2.5 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold uppercase tracking-wider text-stone-700">
                    {t('Colors Available', 'Colors Available')}
                  </span>
                  <span className="text-stone-900 font-semibold">
                    {t(selectedColor.name, selectedColor.name)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {availableColors.map((clr) => {
                    const isSelected = selectedColor.name === clr.name;
                    return (
                      <button
                        key={clr.name}
                        type="button"
                        onClick={() => setSelectedColor(clr)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                          isSelected
                            ? 'shadow-xs font-bold'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                        style={
                          isSelected
                            ? {
                                backgroundColor: shoeTheme.selectedBg,
                                color: shoeTheme.selectedText,
                                borderColor: shoeTheme.selectedBorder,
                              }
                            : undefined
                        }
                      >
                        {t(clr.name, clr.name)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="pt-4 space-y-2.5 border-t border-stone-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
                      {t("Select Size (EU / US Women's)", "Select Size (EU / US Women's)")}
                    </span>
                    <button
                      id="product-detail-size-guide-btn"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="flex items-center gap-1.5 text-xs text-stone-800 hover:text-stone-950 underline underline-offset-4 font-semibold cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{t('Size Guide', 'Size Guide')}</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`py-2 px-1 text-center rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border ${
                            isSelected
                              ? 'shadow-xs font-bold'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300'
                          }`}
                          style={
                            isSelected
                              ? {
                                  backgroundColor: shoeTheme.selectedBg,
                                  color: shoeTheme.selectedText,
                                  borderColor: shoeTheme.selectedBorder,
                                }
                              : undefined
                          }
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Add to Cart */}
              <div className="pt-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 h-11 overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 text-stone-700 hover:text-stone-950 text-base font-bold cursor-pointer hover:bg-stone-200/70 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-semibold text-stone-900 font-mono">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3.5 text-stone-700 hover:text-stone-950 text-base font-bold cursor-pointer hover:bg-stone-200/70 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-11 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer border active:scale-[0.98]"
                    style={
                      added
                        ? {
                            backgroundColor: '#15803d',
                            borderColor: '#166534',
                            color: '#ffffff',
                            boxShadow: '0 0 0 2px rgba(22, 101, 52, 0.3)',
                          }
                        : {
                            backgroundColor: shoeTheme.primaryBg,
                            borderColor: shoeTheme.primaryBorder,
                            color: shoeTheme.primaryText,
                            boxShadow: shoeTheme.primaryShadow,
                          }
                    }
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>{t('ADDED TO SHOPPING BAG', 'ADDED TO SHOPPING BAG')}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" style={{ color: shoeTheme.primaryText }} />
                        <span>{t('ADD TO CART', 'ADD TO CART')} &bull; {formatPrice(product.priceUSD * quantity)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* B2B Wholesale Option (No pricing, minimum 12 qty) */}
                <button
                  onClick={() => {
                    setB2BTargetProduct(product);
                    setIsB2BModalOpen(true);
                  }}
                  className="w-full h-10 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Building2 className="w-3.5 h-3.5 text-stone-600" />
                  <span>{t('Request Wholesale Style Order (MOQ 12 Units)', 'Request Wholesale Style Order (MOQ 12 Units)')}</span>
                </button>
              </div>

              {/* Exact Text Lines as Requested: Handcrafted by Master Artisans & Vegan Leather */}
              <div className="pt-5 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span className="font-semibold">{t('Handcrafted by Master Artisans', 'Handcrafted by Master Artisans')}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span className="font-semibold">{t('Vegan Leather', 'Vegan Leather')}</span>
                </div>
              </div>

              {/* Stöffa Product Details Tabs */}
              <div className="pt-5 border-t border-stone-200">
                <div className="flex border-b border-stone-200 gap-6">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
                      activeTab === 'details'
                        ? ''
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                    style={activeTab === 'details' ? { borderColor: shoeTheme.accentBorder, color: shoeTheme.accentText } : undefined}
                  >
                    {t('Stöffa Product Details', 'Stöffa Product Details')}
                  </button>
                  <button
                    onClick={() => setActiveTab('craftsmanship')}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
                      activeTab === 'craftsmanship'
                        ? ''
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                    style={activeTab === 'craftsmanship' ? { borderColor: shoeTheme.accentBorder, color: shoeTheme.accentText } : undefined}
                  >
                    {t('Fit & Craftsmanship', 'Fit & Craftsmanship')}
                  </button>
                </div>

                <div className="pt-3.5 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {activeTab === 'details' && (
                    <p>
                      {t(
                        product.description ||
                          'Handcrafted Low Wedges (2.5") with cushioned memory footbed. Designed for extended wear, destination weddings, and celebratory events with grass-friendly stability.',
                        product.description ||
                          'Handcrafted Low Wedges (2.5") with cushioned memory footbed. Designed for extended wear, destination weddings, and celebratory events with grass-friendly stability.'
                      )}
                    </p>
                  )}
                  {activeTab === 'craftsmanship' && (
                    <p>
                      {t(
                        'Individually handcrafted by master footwear artisans in Mumbai ateliers over 40 meticulous hours. Built using cruelty-free, durable vegan materials designed for luxurious elegance and effortless movement.',
                        'Individually handcrafted by master footwear artisans in Mumbai ateliers over 40 meticulous hours. Built using cruelty-free, durable vegan materials designed for luxurious elegance and effortless movement.'
                      )}
                    </p>
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
