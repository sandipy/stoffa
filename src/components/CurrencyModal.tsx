import React from 'react';
import { Check, DollarSign, Globe, X } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const CurrencyModal: React.FC = () => {
  const {
    currencies,
    activeCurrency,
    setCurrency,
    isCurrencyModalOpen,
    setIsCurrencyModalOpen,
    t,
  } = useCommerce();

  if (!isCurrencyModalOpen) return null;

  // Filter to enabled currencies (USD, CAD)
  const availableCurrencies = currencies.filter((c) => c.isEnabled || c.code === 'USD' || c.code === 'CAD');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={() => setIsCurrencyModalOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white border border-stone-200 shadow-2xl p-6 text-stone-900 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setIsCurrencyModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label={t('Close currency modal', 'Close currency modal')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-200">
            <DollarSign className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              {t('Select Currency', 'Select Currency')}
            </h3>
            <p className="text-xs text-stone-500 font-light">
              {t('Prices will be converted in real time.', 'Prices will be converted in real time.')}
            </p>
          </div>
        </div>

        {/* Currency Options: USD and CAD */}
        <div className="space-y-2.5 my-4">
          {availableCurrencies.map((curr) => {
            const isSelected = activeCurrency.code === curr.code;
            return (
              <button
                key={curr.code}
                id={`currency-option-${curr.code.toLowerCase()}`}
                onClick={() => {
                  setCurrency(curr.code);
                  setIsCurrencyModalOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-700 bg-amber-50/70 text-amber-950 font-semibold shadow-xs'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/70 text-stone-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">{curr.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">{curr.code}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-stone-200/70 text-stone-700 font-mono">
                        {curr.symbol}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {curr.code === 'USD' ? t('United States Dollar', 'United States Dollar') : curr.code === 'CAD' ? t('Canadian Dollar', 'Canadian Dollar') : t(curr.name, curr.name)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-stone-500">
                    {t('Rate:', 'Rate:')} {curr.rate}
                  </span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-amber-800 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>{t('Active Currency:', 'Active Currency:')} <strong>{activeCurrency.code} ({activeCurrency.symbol})</strong></span>
          <button
            onClick={() => setIsCurrencyModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors font-medium cursor-pointer"
          >
            {t('Done', 'Done')}
          </button>
        </div>
      </div>
    </div>
  );
};
