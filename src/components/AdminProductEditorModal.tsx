import React, { useState, useEffect } from 'react';
import { X, Check, Save, AlertCircle, Sparkles } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { Product } from '../types';

interface AdminProductEditorModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminProductEditorModal: React.FC<AdminProductEditorModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { updateProductDetails, t } = useCommerce();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priceUSD, setPriceUSD] = useState(0);
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('');
  const [colorsText, setColorsText] = useState('');
  const [sizesText, setSizesText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.title || '');
      setCategory(product.category || '');
      setPriceUSD(product.priceUSD || 0);
      setDescription(product.description || '');
      setMaterials(product.materials || '');
      setColorsText(product.colors?.map((c) => c.name).join(', ') || '');
      setSizesText(product.sizes?.join(', ') || '');
      setIsSaved(false);
      setErrorMessage('');
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Product title cannot be empty.');
      return;
    }

    if (isNaN(priceUSD) || priceUSD <= 0) {
      setErrorMessage('Please enter a valid positive price.');
      return;
    }

    // Parse colors
    const colorNames = colorsText
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    const updatedColors = colorNames.map((name) => {
      const existing = product.colors?.find((c) => c.name.toLowerCase() === name.toLowerCase());
      return existing || { name, hex: '#E5E7EB' };
    });

    // Parse sizes
    const updatedSizes = sizesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedProduct: Product = {
      ...product,
      title: title.trim(),
      subtitle: '', // Strictly no subtitle or tagline as requested
      category: category.trim() || product.category,
      priceUSD: Number(priceUSD),
      description: description.trim(),
      materials: materials.trim(),
      colors: updatedColors.length > 0 ? updatedColors : product.colors,
      sizes: updatedSizes.length > 0 ? updatedSizes : product.sizes,
    };

    // Save only when this button is clicked - no auto-save anywhere
    const res = updateProductDetails(updatedProduct);
    if (res.success) {
      setIsSaved(true);
      setErrorMessage('');
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 1200);
    } else {
      setErrorMessage('Failed to save changes. Please try again.');
    }
  };

  return (
    <div
      id="admin-product-editor-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-stone-200 shadow-2xl p-5 sm:p-7 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 font-mono text-[11px] font-bold uppercase tracking-wider">
                Admin CMS Product Editor
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 mt-1">
              {t('Edit Product Details', 'Edit Product Details')}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {t('Changes are stored permanently on clicking Save. No auto-saving.', 'Changes are stored permanently on clicking Save. No auto-saving.')}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Banner */}
        {isSaved && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="font-semibold">
              {t('Saved successfully! Refreshing will retain all edits permanently.', 'Saved successfully! Refreshing will retain all edits permanently.')}
            </span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSave} className="mt-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-1">
              {t('Product Title (No Subtitle/Tagline)', 'Product Title (No Subtitle/Tagline)')}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none"
              placeholder="e.g. Handcrafted Low Wedges (2.5&quot;) in Light Gold with cushioned footbed"
              required
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-1">
                {t('Category', 'Category')}
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none"
                placeholder="e.g. Wedges, Heels, Shoes"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-1">
                {t('Price (USD $)', 'Price (USD $)')}
              </label>
              <input
                type="number"
                step="0.01"
                value={priceUSD}
                onChange={(e) => setPriceUSD(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          {/* Colorways (Text names only, no round swatches) */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-1">
              {t('Colorways (Comma separated names, e.g. Light Gold, Champagne, Nero Black)', 'Colorways (Comma separated names, e.g. Light Gold, Champagne, Nero Black)')}
            </label>
            <input
              type="text"
              value={colorsText}
              onChange={(e) => setColorsText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none"
              placeholder="Light Gold, Champagne, Antique Bronze"
            />
            <span className="text-[11px] text-stone-500 mt-1 block">
              {t('Colors will display strictly as clean text labels with no round color swatches.', 'Colors will display strictly as clean text labels with no round color swatches.')}
            </span>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-1">
              {t('Available Sizes (Comma separated, e.g. 35, 36, 37, 38, 39, 40, 41, 42)', 'Available Sizes (Comma separated, e.g. 35, 36, 37, 38, 39, 40, 41, 42)')}
            </label>
            <input
              type="text"
              value={sizesText}
              onChange={(e) => setSizesText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none font-mono"
              placeholder="35, 36, 37, 38, 39, 40, 41, 42"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-1">
              {t('Product Description & Stöffa Details', 'Product Description & Stöffa Details')}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none"
              placeholder="Detailed description of footwear craftsmanship, fit and styling..."
            />
          </div>

          {/* Materials & Care */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-1">
              {t('Materials & Craftsmanship (Vegan Leather, etc.)', 'Materials & Craftsmanship (Vegan Leather, etc.)')}
            </label>
            <textarea
              rows={2}
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:outline-none"
              placeholder="Handcrafted vegan leather upper, cushioned memory footbed, non-slip resin sole."
            />
          </div>

          {/* Explicit Save Button */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <span className="text-xs text-stone-500 italic">
              {t('* Click Save to permanently store edits in persistent memory.', '* Click Save to permanently store edits in persistent memory.')}
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {t('Cancel', 'Cancel')}
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-stone-900 hover:bg-stone-950 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>{t('Save Product Changes', 'Save Product Changes')}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
