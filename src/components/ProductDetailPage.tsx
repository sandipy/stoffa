import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit3,
  Folder,
  Image as ImageIcon,
  Plus,
  RotateCcw,
  Ruler,
  Save,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  ZoomIn,
  ZoomOut,
  X,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { useCms } from '../context/CmsContext';
import { AdminProductEditorModal } from './AdminProductEditorModal';
import { ProductImageAdderModal } from './admin/ProductImageAdderModal';
import { getShoeColorTheme } from '../utils/shoeColorTheme';
import { Product, ProductAngle } from '../types';
import { findMatchingImagesForProduct } from '../services/productImageMatcher';

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
    updateProductDetails,
    t,
  } = useCommerce();

  const { isCmsInPlaceMode, setIsCmsInPlaceMode } = useCms();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAdderModalOpen, setIsAdderModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // In-Place CMS Edit Mode
  const [isCmsEditActive, setIsCmsEditActive] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  if (!selectedProductModal) return null;
  const product = selectedProductModal;

  // Available Colors
  const availableColors =
    product.colors && product.colors.length > 0
      ? product.colors
      : [
          { name: 'Light Gold', hex: '#D4AF37' },
          { name: 'Champagne', hex: '#F7E7CE' },
          { name: 'Nero Black', hex: '#1C1917' },
        ];

  // Editable states for in-place admin edits
  const [editedTitle, setEditedTitle] = useState(product.title);
  const [editedPriceUSD, setEditedPriceUSD] = useState(product.priceUSD);
  const [editedCategory, setEditedCategory] = useState(product.category);
  const [editedDescription, setEditedDescription] = useState(
    product.description ||
      'Handcrafted Low Wedges (2.5") with cushioned memory footbed. Designed for extended wear, destination weddings, and celebratory events with grass-friendly stability.'
  );
  const [editedCraftsmanship, setEditedCraftsmanship] = useState(
    'Individually handcrafted by master footwear artisans in Mumbai ateliers over 40 meticulous hours. Built using cruelty-free, durable vegan materials designed for luxurious elegance and effortless movement.'
  );
  const [editedMaterials, setEditedMaterials] = useState(product.materials || 'Vegan Leather & Memory Footbed');
  const [editedColors, setEditedColors] = useState<{ name: string; hex: string }[]>(availableColors);
  const [editedSizes, setEditedSizes] = useState<string[]>(product.sizes || ['36', '37', '38', '39', '40', '41']);
  
  // New color inline inputs
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#D4AF37');
  const [showAddColorForm, setShowAddColorForm] = useState(false);

  // Angles setup
  const rawInitialAngles: ProductAngle[] =
    product.angles && product.angles.length > 0
      ? product.angles
      : product.images.map((url, i) => ({
          url,
          label: i === 0 ? 'Studio Front Angle' : i === 1 ? 'Lateral Profile' : 'Artisanal Detail',
          tag: i === 0 ? 'Front' : i === 1 ? 'Side' : 'Detail',
          isAiImage: false,
        }));

  const [editedAngles, setEditedAngles] = useState<ProductAngle[]>(
    rawInitialAngles.filter((a) => a && a.url)
  );

  // Section-specific dirty flags
  const [isGalleryDirty, setIsGalleryDirty] = useState(false);
  const [isTitleDirty, setIsTitleDirty] = useState(false);
  const [isColorsSizesDirty, setIsColorsSizesDirty] = useState(false);
  const [isDetailsDirty, setIsDetailsDirty] = useState(false);

  const anyDirty = isGalleryDirty || isTitleDirty || isColorsSizesDirty || isDetailsDirty;

  // Selected state for storefront customer view
  const [selectedSize, setSelectedSize] = useState<string>(editedSizes[0] || '37');
  const [selectedColor, setSelectedColor] = useState(editedColors[0] || availableColors[0]);
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'craftsmanship'>('details');

  // Shoe theme based on selected color
  const shoeTheme = getShoeColorTheme(selectedColor?.name, selectedColor?.hex, product.title);

  // Ensure selectedAngleIndex remains in bounds
  const currentAngle: ProductAngle =
    editedAngles[selectedAngleIndex] ||
    editedAngles[0] || {
      url: product.images[0] || '',
      label: 'Main View',
      tag: 'Main',
      isAiImage: false,
    };

  // Check matching files in folder
  const matchingAssets = findMatchingImagesForProduct(product);

  // Synchronize state when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setZoomScale(1);
    setEditedTitle(product.title);
    setEditedPriceUSD(product.priceUSD);
    setEditedCategory(product.category);
    setEditedDescription(
      product.description ||
        'Handcrafted Low Wedges (2.5") with cushioned memory footbed. Designed for extended wear, destination weddings, and celebratory events with grass-friendly stability.'
    );
    setEditedMaterials(product.materials || 'Vegan Leather & Memory Footbed');
    const cols = product.colors && product.colors.length > 0 ? product.colors : availableColors;
    setEditedColors(cols);
    setSelectedColor(cols[0]);
    const szs = product.sizes && product.sizes.length > 0 ? product.sizes : ['36', '37', '38', '39', '40', '41'];
    setEditedSizes(szs);
    setSelectedSize(szs[0] || '37');

    const freshAngles: ProductAngle[] =
      product.angles && product.angles.length > 0
        ? product.angles
        : product.images.map((url, i) => ({
            url,
            label: i === 0 ? 'Studio Front Angle' : i === 1 ? 'Lateral Profile' : 'Artisanal Detail',
            tag: i === 0 ? 'Front' : i === 1 ? 'Side' : 'Detail',
            isAiImage: false,
          }));
    setEditedAngles(freshAngles.filter((a) => a && a.url));
    setSelectedAngleIndex(0);

    setIsGalleryDirty(false);
    setIsTitleDirty(false);
    setIsColorsSizesDirty(false);
    setIsDetailsDirty(false);
  }, [product.id]);

  // Synchronize global CMS mode
  useEffect(() => {
    if (isAdminLoggedIn && isCmsInPlaceMode) {
      setIsCmsEditActive(true);
    }
  }, [isAdminLoggedIn, isCmsInPlaceMode]);

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => {
      setSaveToast(null);
    }, 2800);
  };

  // =========================================================================
  // SAVE HANDLERS (Section-Level & Master)
  // =========================================================================

  const buildUpdatedProduct = (overrides?: Partial<Product>): Product => {
    const imagesList = editedAngles.map((a) => a.url);
    return {
      ...product,
      title: editedTitle.trim() || product.title,
      subtitle: '',
      priceUSD: Number(editedPriceUSD) > 0 ? Number(editedPriceUSD) : product.priceUSD,
      category: editedCategory.trim() || product.category,
      description: editedDescription.trim(),
      materials: editedMaterials.trim(),
      colors: editedColors.length > 0 ? editedColors : product.colors,
      sizes: editedSizes.length > 0 ? editedSizes : product.sizes,
      images: imagesList.length > 0 ? imagesList : product.images,
      angles: editedAngles,
      ...overrides,
    };
  };

  const handleSaveGallery = () => {
    const updated = buildUpdatedProduct({
      images: editedAngles.map((a) => a.url),
      angles: editedAngles,
    });
    updateProductDetails(updated);
    setIsGalleryDirty(false);
    triggerToast('Gallery images and vertical views saved successfully!');
  };

  const handleSaveTitlePricing = () => {
    const updated = buildUpdatedProduct({
      title: editedTitle.trim(),
      priceUSD: Number(editedPriceUSD),
      category: editedCategory.trim(),
    });
    updateProductDetails(updated);
    setIsTitleDirty(false);
    triggerToast('Title, price, and category saved successfully!');
  };

  const handleSaveColorsSizes = () => {
    const updated = buildUpdatedProduct({
      colors: editedColors,
      sizes: editedSizes,
    });
    updateProductDetails(updated);
    setIsColorsSizesDirty(false);
    triggerToast('Colors and sizes saved successfully!');
  };

  const handleSaveDetails = () => {
    const updated = buildUpdatedProduct({
      description: editedDescription.trim(),
      materials: editedMaterials.trim(),
    });
    updateProductDetails(updated);
    setIsDetailsDirty(false);
    triggerToast('Product details & craftsmanship saved successfully!');
  };

  const handleSaveAll = () => {
    const updated = buildUpdatedProduct();
    updateProductDetails(updated);
    setIsGalleryDirty(false);
    setIsTitleDirty(false);
    setIsColorsSizesDirty(false);
    setIsDetailsDirty(false);
    triggerToast('All product changes saved to catalog successfully!');
  };

  const handleDiscardAll = () => {
    setEditedTitle(product.title);
    setEditedPriceUSD(product.priceUSD);
    setEditedCategory(product.category);
    setEditedDescription(product.description || '');
    setEditedMaterials(product.materials || '');
    setEditedColors(product.colors || availableColors);
    setEditedSizes(product.sizes || ['36', '37', '38', '39', '40', '41']);

    const freshAngles: ProductAngle[] =
      product.angles && product.angles.length > 0
        ? product.angles
        : product.images.map((url, i) => ({
            url,
            label: i === 0 ? 'Studio Front Angle' : i === 1 ? 'Lateral Profile' : 'Artisanal Detail',
            tag: i === 0 ? 'Front' : i === 1 ? 'Side' : 'Detail',
            isAiImage: false,
          }));
    setEditedAngles(freshAngles.filter((a) => a && a.url));
    setSelectedAngleIndex(0);

    setIsGalleryDirty(false);
    setIsTitleDirty(false);
    setIsColorsSizesDirty(false);
    setIsDetailsDirty(false);
    triggerToast('Discarded all unsaved draft modifications.');
  };

  // =========================================================================
  // GALLERY IMAGE MANIPULATION (Add, Remove, Reorder, Hero)
  // =========================================================================

  const handleAddAnglesFromModal = (newAngles: ProductAngle[]) => {
    setEditedAngles((prev) => {
      const combined = [...prev, ...newAngles];
      // Select the newly added image so it displays immediately in the main window
      setSelectedAngleIndex(combined.length - 1);
      return combined;
    });
    setIsGalleryDirty(true);
    setZoomScale(1);
  };

  const handleRemoveAngle = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (editedAngles.length <= 1) {
      alert('A product must have at least 1 image.');
      return;
    }
    const updated = editedAngles.filter((_, i) => i !== idx);
    setEditedAngles(updated);
    setIsGalleryDirty(true);
    if (selectedAngleIndex >= updated.length) {
      setSelectedAngleIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleMakeHeroAngle = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (idx === 0) return;
    const item = editedAngles[idx];
    const remaining = editedAngles.filter((_, i) => i !== idx);
    const updated = [item, ...remaining];
    setEditedAngles(updated);
    setSelectedAngleIndex(0);
    setIsGalleryDirty(true);
  };

  const handleMoveAngle = (idx: number, direction: 'up' | 'down', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === editedAngles.length - 1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const copy = [...editedAngles];
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;

    setEditedAngles(copy);
    setSelectedAngleIndex(targetIdx);
    setIsGalleryDirty(true);
  };

  // Add new color option
  const handleAddNewColor = () => {
    if (!newColorName.trim()) return;
    const newEntry = { name: newColorName.trim(), hex: newColorHex };
    setEditedColors((prev) => [...prev, newEntry]);
    setNewColorName('');
    setShowAddColorForm(false);
    setIsColorsSizesDirty(true);
  };

  const handleRemoveColor = (idx: number) => {
    if (editedColors.length <= 1) return;
    setEditedColors((prev) => prev.filter((_, i) => i !== idx));
    setIsColorsSizesDirty(true);
  };

  const handleToggleSize = (sz: string) => {
    setEditedSizes((prev) => {
      const exists = prev.includes(sz);
      const next = exists ? prev.filter((s) => s !== sz) : [...prev, sz].sort();
      return next;
    });
    setIsColorsSizesDirty(true);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="w-full bg-[#faf9f6] min-h-screen pb-20">
      
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-amber-500/40 flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Navigation & Admin Master Action Bar */}
      <div className="border-b border-stone-200/80 bg-white sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          
          <button
            onClick={() => setSelectedProductModal(null)}
            className="flex items-center gap-2 btn-champagne-secondary px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#8c7355]" />
            <span>{t('Back to Storefront', 'Back to Storefront')}</span>
          </button>

          {/* Admin Controls & Master Save Buttons */}
          {isAdminLoggedIn && (
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Toggle In-Place CMS Edit Mode */}
              <button
                type="button"
                onClick={() => {
                  const next = !isCmsEditActive;
                  setIsCmsEditActive(next);
                  setIsCmsInPlaceMode(next);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isCmsEditActive
                    ? 'bg-amber-400 text-stone-950 border-amber-500 shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-300'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isCmsEditActive ? 'In-Place CMS: ACTIVE' : 'Enable In-Place CMS'}</span>
              </button>

              {/* Status Pill */}
              {anyDirty ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-mono font-bold">
                  Draft Modifications Pending
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-semibold">
                  <Check className="w-3 h-3 text-emerald-600" />
                  All Saved
                </span>
              )}

              {/* Discard Changes Button */}
              {anyDirty && (
                <button
                  type="button"
                  onClick={handleDiscardAll}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer border border-stone-300"
                  title="Discard all pending modifications"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Discard</span>
                </button>
              )}

              {/* Master Save Button */}
              <button
                type="button"
                onClick={handleSaveAll}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  anyDirty
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white animate-pulse'
                    : 'bg-stone-900 hover:bg-black text-white'
                }`}
              >
                <Save className="w-3.5 h-3.5" />
                <span>SAVE ALL PRODUCT CHANGES</span>
              </button>

              {/* Edit in Full Modal Option */}
              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                title="Open Form Editor Modal"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Main Detail Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: VERTICAL IMAGE VIEWS & 1.5x LARGER MAIN STAGE */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-3 sm:gap-4 items-start">
            
            {/* Vertical Thumbnails List & Admin Image Management */}
            <div className="flex flex-col gap-2 w-full md:w-28 shrink-0">
              
              {/* Admin Add Image & Match Buttons */}
              {isAdminLoggedIn && isCmsEditActive && (
                <div className="space-y-1.5 mb-1">
                  <button
                    type="button"
                    onClick={() => setIsAdderModalOpen(true)}
                    className="w-full py-1.5 px-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs cursor-pointer transition-colors"
                    title="Add image to left vertical gallery"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAdderModalOpen(true)}
                    className="w-full py-1.5 px-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 text-[10px] font-bold flex items-center justify-center gap-1 shadow-2xs cursor-pointer transition-colors"
                    title="Match filenames from folder and add"
                  >
                    <Sparkles className="w-3 h-3 text-amber-700" />
                    <span>Match Folder ({matchingAssets.length})</span>
                  </button>
                </div>
              )}

              {/* Vertical Scroll List */}
              <div className="flex flex-row md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[640px] sm:max-h-[720px] scrollbar-none py-1 w-full">
                {editedAngles.map((ang, idx) => {
                  const isSelected = selectedAngleIndex === idx;
                  return (
                    <div key={idx} className="relative group/thumb shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAngleIndex(idx);
                          setZoomScale(1);
                        }}
                        className={`relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#faf8f5] p-1.5 flex items-center justify-center ${
                          isSelected
                            ? 'shadow-md ring-2 ring-amber-600/50'
                            : 'border-stone-200 opacity-75 hover:opacity-100 hover:border-stone-400'
                        }`}
                        style={isSelected ? { borderColor: shoeTheme.accentBorder } : undefined}
                        title={ang.label || `View ${idx + 1}`}
                      >
                        <img
                          src={ang.url}
                          alt={ang.label || `Angle ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                        />

                        {/* Primary Hero Star Badge */}
                        {idx === 0 && (
                          <span className="absolute bottom-1 left-1 p-0.5 rounded bg-amber-500 text-white shadow-2xs" title="Primary Catalog Hero">
                            <Star className="w-2.5 h-2.5 fill-current" />
                          </span>
                        )}
                      </button>

                      {/* Admin Image Manipulation Overlay on Thumbnails */}
                      {isAdminLoggedIn && isCmsEditActive && (
                        <div className="absolute top-1 right-1 hidden group-hover/thumb:flex flex-col gap-1 z-20 bg-black/80 backdrop-blur-xs p-1 rounded-lg shadow-md">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={(e) => handleMakeHeroAngle(idx, e)}
                              className="p-1 rounded text-amber-300 hover:text-amber-100 hover:bg-white/20"
                              title="Make Studio Hero (Position 1)"
                            >
                              <Star className="w-3 h-3" />
                            </button>
                          )}
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={(e) => handleMoveAngle(idx, 'up', e)}
                              className="p-1 rounded text-white hover:bg-white/20"
                              title="Move Up"
                            >
                              <ChevronUp className="w-3 h-3" />
                            </button>
                          )}
                          {idx < editedAngles.length - 1 && (
                            <button
                              type="button"
                              onClick={(e) => handleMoveAngle(idx, 'down', e)}
                              className="p-1 rounded text-white hover:bg-white/20"
                              title="Move Down"
                            >
                              <ChevronDown className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => handleRemoveAngle(idx, e)}
                            className="p-1 rounded text-red-400 hover:text-red-200 hover:bg-white/20"
                            title="Remove Image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Section-Specific Save Button: Save Gallery Images */}
              {isAdminLoggedIn && isCmsEditActive && isGalleryDirty && (
                <button
                  type="button"
                  onClick={handleSaveGallery}
                  className="mt-2 w-full py-1.5 px-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs cursor-pointer transition-colors"
                >
                  <Save className="w-3 h-3" />
                  <span>Save Gallery</span>
                </button>
              )}
            </div>

            {/* Main Stage Image: 1.5 Times Larger, Clean (NO TOP PILL BUTTON) */}
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
                    alt={editedTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full max-h-[680px] sm:max-h-[760px] lg:max-h-[860px] object-contain drop-shadow-md select-none"
                  />
                </div>
              </div>

              {/* Bottom hint & view index */}
              <div className="px-4 py-2 bg-stone-100/60 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span>{currentAngle.label || t('Click image or use controls to zoom in (up to 2.5x)', 'Click image or use controls to zoom in (up to 2.5x)')}</span>
                <span>{selectedAngleIndex + 1} / {editedAngles.length}</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: SPECS, IN-PLACE EDITING & SECTION SAVE BUTTONS */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* SECTION 1: TITLE, CATEGORY & PRICE */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                    Product Identification & Pricing
                  </span>
                  {isAdminLoggedIn && isCmsEditActive && isTitleDirty && (
                    <button
                      type="button"
                      onClick={handleSaveTitlePricing}
                      className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save Title & Pricing</span>
                    </button>
                  )}
                </div>

                {isAdminLoggedIn && isCmsEditActive ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => {
                          setEditedTitle(e.target.value);
                          setIsTitleDirty(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 font-serif text-lg sm:text-xl text-stone-950 font-bold focus:outline-hidden focus:ring-2 focus:ring-amber-600 bg-amber-50/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-stone-600 block mb-1">
                          Price (USD)
                        </label>
                        <input
                          type="number"
                          step="1"
                          value={editedPriceUSD}
                          onChange={(e) => {
                            setEditedPriceUSD(Number(e.target.value));
                            setIsTitleDirty(true);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-stone-300 font-mono text-sm font-bold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600 bg-amber-50/20"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-stone-600 block mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          value={editedCategory}
                          onChange={(e) => {
                            setEditedCategory(e.target.value);
                            setIsTitleDirty(true);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600 bg-amber-50/20"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="inline-block text-xs font-mono font-semibold uppercase tracking-wider text-stone-500">
                      {t(editedCategory, editedCategory)}
                    </span>
                    <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-950 font-bold leading-tight">
                      {t(editedTitle, editedTitle)}
                    </h1>
                    <div className="pt-1">
                      <span className="text-2xl sm:text-3xl font-serif text-stone-950 font-bold">
                        {formatPrice(editedPriceUSD)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: COLORS AVAILABLE */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700">
                      {t('Colors Available', 'Colors Available')}
                    </span>
                    {!isCmsEditActive && (
                      <span className="text-stone-900 font-semibold text-xs">
                        &bull; {t(selectedColor.name, selectedColor.name)}
                      </span>
                    )}
                  </div>

                  {isAdminLoggedIn && isCmsEditActive && isColorsSizesDirty && (
                    <button
                      type="button"
                      onClick={handleSaveColorsSizes}
                      className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save Colors & Sizes</span>
                    </button>
                  )}
                </div>

                {/* Color Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {editedColors.map((clr, cIdx) => {
                    const isSelected = selectedColor.name === clr.name;
                    return (
                      <div key={cIdx} className="relative group/color">
                        <button
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

                        {/* Admin delete color */}
                        {isAdminLoggedIn && isCmsEditActive && editedColors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(cIdx)}
                            className="absolute -top-1.5 -right-1.5 hidden group-hover/color:flex p-1 rounded-full bg-red-600 text-white shadow-xs cursor-pointer"
                            title="Delete Color"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {/* Admin Add Color Button */}
                  {isAdminLoggedIn && isCmsEditActive && (
                    <button
                      type="button"
                      onClick={() => setShowAddColorForm(!showAddColorForm)}
                      className="px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-amber-600 text-amber-800 hover:bg-amber-50 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Color</span>
                    </button>
                  )}
                </div>

                {/* Inline Add Color Form */}
                {isAdminLoggedIn && isCmsEditActive && showAddColorForm && (
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Color Name (e.g. Bronze Metallic)"
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                      className="px-2.5 py-1 rounded-lg border border-stone-300 text-xs flex-1 bg-white"
                    />
                    <input
                      type="color"
                      value={newColorHex}
                      onChange={(e) => setNewColorHex(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-stone-300 cursor-pointer p-0.5"
                      title="Select Hex Color"
                    />
                    <button
                      type="button"
                      onClick={handleAddNewColor}
                      className="px-2.5 py-1 rounded-lg bg-amber-800 text-white text-xs font-bold cursor-pointer hover:bg-amber-900"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/* SECTION 3: SIZE SELECTOR */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
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
                  {editedSizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
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

                {/* Admin Quick Size Toggles */}
                {isAdminLoggedIn && isCmsEditActive && (
                  <div className="pt-2 border-t border-stone-100 space-y-1">
                    <span className="text-[10px] text-stone-500 font-bold block">
                      Toggle active catalog sizes:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {['35', '36', '37', '38', '39', '40', '41', '42'].map((sz) => {
                        const isActive = editedSizes.includes(sz);
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => handleToggleSize(sz)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                              isActive
                                ? 'bg-amber-800 text-white'
                                : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                            }`}
                          >
                            {sz} {isActive ? '✓' : '+'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="pt-2 space-y-3">
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
                        <span>{t('ADD TO CART', 'ADD TO CART')} &bull; {formatPrice(editedPriceUSD * quantity)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* B2B Wholesale Option */}
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

              {/* Handcrafted Artisan Quality Badges */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span className="font-semibold">{t('Handcrafted by Master Artisans', 'Handcrafted by Master Artisans')}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
                  <span className="font-semibold">{t('Vegan Leather', 'Vegan Leather')}</span>
                </div>
              </div>

              {/* SECTION 4: PRODUCT DETAILS & CRAFTSMANSHIP TABS */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200">
                  <div className="flex gap-6">
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

                  {isAdminLoggedIn && isCmsEditActive && isDetailsDirty && (
                    <button
                      type="button"
                      onClick={handleSaveDetails}
                      className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer mb-2"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save Details</span>
                    </button>
                  )}
                </div>

                {/* Tab Contents */}
                <div className="pt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {isAdminLoggedIn && isCmsEditActive ? (
                    <div className="space-y-3">
                      {activeTab === 'details' ? (
                        <div>
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Description & Details
                          </label>
                          <textarea
                            rows={4}
                            value={editedDescription}
                            onChange={(e) => {
                              setEditedDescription(e.target.value);
                              setIsDetailsDirty(true);
                            }}
                            className="w-full p-2.5 rounded-xl border border-stone-300 text-xs bg-amber-50/20 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Fit & Craftsmanship
                          </label>
                          <textarea
                            rows={4}
                            value={editedCraftsmanship}
                            onChange={(e) => {
                              setEditedCraftsmanship(e.target.value);
                              setIsDetailsDirty(true);
                            }}
                            className="w-full p-2.5 rounded-xl border border-stone-300 text-xs bg-amber-50/20 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                          />
                        </div>
                      )}

                      <div>
                        <label className="text-[11px] font-bold text-stone-600 block mb-1">
                          Materials
                        </label>
                        <input
                          type="text"
                          value={editedMaterials}
                          onChange={(e) => {
                            setEditedMaterials(e.target.value);
                            setIsDetailsDirty(true);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl border border-stone-300 text-xs bg-amber-50/20 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      {activeTab === 'details' && (
                        <p>{t(editedDescription, editedDescription)}</p>
                      )}
                      {activeTab === 'craftsmanship' && (
                        <p>{t(editedCraftsmanship, editedCraftsmanship)}</p>
                      )}
                      <p className="mt-2 text-[11px] text-stone-500 font-medium">
                        <strong>{t('Materials', 'Materials')}:</strong> {editedMaterials}
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Admin Full Form CMS Modal */}
      <AdminProductEditorModal
        product={product}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />

      {/* Admin Product Image Adder Modal (Auto-Match Names, Browse Folder, Upload) */}
      <ProductImageAdderModal
        product={product}
        isOpen={isAdderModalOpen}
        onClose={() => setIsAdderModalOpen(false)}
        onAddAngles={handleAddAnglesFromModal}
      />

    </div>
  );
};
