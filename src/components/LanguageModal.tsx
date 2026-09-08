import React from 'react';
import { AlertCircle, Check, Globe, X } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const LanguageModal: React.FC = () => {
  const {
    languages,
    activeLanguage,
    setLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    t,
  } = useCommerce();

  if (!isLanguageModalOpen) return null;

  // Filter to the 6 requested languages
  const targetCodes = ['en', 'fr', 'es', 'de', 'it', 'pt'];
  const availableLanguages = languages.filter((l) => targetCodes.includes(l.code));

  const handleSelectLanguage = (code: string) => {
    setLanguage(code);
    setIsLanguageModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={() => setIsLanguageModalOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white border border-stone-200 shadow-2xl p-6 text-stone-900 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setIsLanguageModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close language modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center border border-teal-200">
            <Globe className="w-5 h-5 text-teal-800" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              {t('Select Language', 'Select Language')}
            </h3>
            <p className="text-xs text-stone-500 font-light">
              {t('Choose your preferred language for the storefront.', 'Choose your preferred language for the storefront.')}
            </p>
          </div>
        </div>

        {/* Machine Translation Disclaimer Note */}
        <div className="mb-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-950">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            <strong>{t('Disclaimer', 'Disclaimer')}:</strong> {t('Translations are machine-generated and may not be accurate and may have unintended errors.', 'Translations are machine-generated and may not be accurate and may have unintended errors.')}
          </p>
        </div>

        {/* Languages List: displayed as native language words (English, Français, Español, Deutsch, Italiano, Português) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
          {availableLanguages.map((lang) => {
            const isSelected = activeLanguage.code === lang.code;
            return (
              <button
                key={lang.code}
                id={`lang-option-${lang.code}`}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#0d3b46] bg-teal-50/80 text-teal-950 font-bold shadow-xs'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/80 text-stone-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{lang.flag}</span>
                  <div>
                    {/* Displayed as native language words: English, Français, Español, Deutsch, Italiano, Português */}
                    <div className="text-sm font-semibold text-stone-900">
                      {lang.nativeName || lang.name}
                    </div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">
                      {lang.code.toUpperCase()}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#0d3b46] text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>{t('Active', 'Active')}: <strong>{activeLanguage.nativeName || activeLanguage.name}</strong></span>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors font-medium cursor-pointer"
          >
            {t('Close', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
