import React from 'react';
import { Columns2, Trash2, X, ShoppingBag, Check } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const ProductComparisonModal: React.FC = () => {
  const {
    comparisonList,
    removeFromComparison,
    clearComparison,
    isComparisonOpen,
    setIsComparisonOpen,
    formatPrice,
    addToCart,
    setSelectedProductModal,
    t,
  } = useCommerce();

  if (!isComparisonOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={() => setIsComparisonOpen(false)}
    >
      <div
        className="bg-white rounded-[4px] border border-stone-200 shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <Columns2 className="w-5 h-5 text-stone-900" />
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-950">
                {t('Atelier Product Comparison', 'Atelier Product Comparison')}
              </h3>
              <p className="text-xs text-stone-500 font-normal">
                {t('Comparing', 'Comparing')} {comparisonList.length} {t('handcrafted style', 'handcrafted style')}{comparisonList.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {comparisonList.length > 0 && (
              <button
                onClick={clearComparison}
                className="text-xs text-stone-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t('Clear All', 'Clear All')}</span>
              </button>
            )}
            <button
              onClick={() => setIsComparisonOpen(false)}
              className="p-1.5 rounded-[4px] text-stone-400 hover:text-stone-800 hover:bg-stone-200/50 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {comparisonList.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Columns2 className="w-12 h-12 text-stone-300 mx-auto" />
              <h4 className="font-serif text-base text-stone-700 font-semibold">
                {t('No styles currently selected for comparison', 'No styles currently selected for comparison')}
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {t('Click the compare icon on any product card or detail page to evaluate silouhettes, heel heights, and materials side-by-side.', 'Click the compare icon on any product card or detail page to evaluate silouhettes, heel heights, and materials side-by-side.')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {comparisonList.map((product) => (
                <div
                  key={product.id}
                  className="border border-stone-200 rounded-[4px] p-4 flex flex-col justify-between space-y-4 bg-stone-50/40"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[4/5] bg-stone-100 rounded-[4px] overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromComparison(product.id)}
                        className="absolute top-2 end-2 p-1.5 rounded-[4px] bg-white/90 text-stone-600 hover:text-rose-600 shadow-2xs cursor-pointer"
                        title={t('Remove', 'Remove')}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                        {t(product.category, product.category)}
                      </span>
                      <h4 className="font-serif text-base font-bold text-stone-900 leading-snug">
                        {t(product.title, product.title)}
                      </h4>
                      <p className="text-sm font-semibold text-stone-950 mt-1">
                        {formatPrice(product.priceUSD)}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs border-t border-stone-200 pt-3 text-stone-600">
                      <div className="flex justify-between">
                        <span className="text-stone-400">{t('Sole / Footbed:', 'Sole / Footbed:')}</span>
                        <span className="font-medium text-stone-800">{t('Dual Memory Foam', 'Dual Memory Foam')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">{t('Lawn-Friendly:', 'Lawn-Friendly:')}</span>
                        <span className="font-medium text-emerald-700">{t('Yes (No Sink)', 'Yes (No Sink)')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">{t('Available Sizes:', 'Available Sizes:')}</span>
                        <span className="font-medium text-stone-800">
                          {product.sizes.slice(0, 4).map(s => t(s, s)).join(', ')}...
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProductModal(product);
                        setIsComparisonOpen(false);
                      }}
                      className="flex-1 py-2 text-xs font-semibold rounded-[4px] border border-stone-900 text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      {t('View Details', 'View Details')}
                    </button>
                    <button
                      onClick={() =>
                        addToCart(
                          product,
                          product.sizes[0] || 'Standard',
                          product.colors[0] || { name: 'Gold', hex: '#D4AF37' },
                          1
                        )
                      }
                      className="px-3 py-2 text-xs font-semibold rounded-[4px] bg-stone-900 text-white hover:bg-black transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t('Add', 'Add')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
