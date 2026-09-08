import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Percent,
  X,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const CampaignBanner: React.FC = () => {
  const {
    activeCampaign,
    clearActiveCampaign,
    activateCampaignBySlug,
    activeCurrency,
    activeLanguage,
  } = useCommerce();

  const [customInputSlug, setCustomInputSlug] = useState('');
  const [copied, setCopied] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputSlug.trim()) return;
    const cleanSlug = customInputSlug.replace(/^\/c\//, '').trim();
    const success = activateCampaignBySlug(cleanSlug);
    if (!success) {
      setInputError(true);
      setTimeout(() => setInputError(false), 2500);
    } else {
      setCustomInputSlug('');
    }
  };

  const copyShareableLink = () => {
    if (!activeCampaign) return;
    const fullUrl = `https://etoile.store/c/${activeCampaign.slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`border-b px-4 py-2 text-xs transition-colors ${
        activeCampaign
          ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
          : 'bg-stone-100/90 border-stone-200 text-stone-800'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Campaign Info */}
        {activeCampaign ? (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-bold text-[11px] shadow-xs uppercase tracking-wide">
              {activeCampaign.platform} Partner
            </span>
            <span className="font-semibold text-emerald-950">
              {activeCampaign.name}
            </span>
            <span className="text-emerald-400 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
              <Percent className="w-3 h-3" />
              {activeCampaign.discountPercent}% VIP Discount Auto-Applied
            </span>
            <span className="text-stone-600 text-[11px] hidden lg:inline font-mono">
              (Preset: <strong className="text-stone-900">{activeCurrency.code}</strong> &bull;{' '}
              <strong className="text-stone-900">{activeLanguage.name}</strong>)
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-stone-700">
            <span className="inline-block w-2 h-2 rounded-full bg-stone-400"></span>
            <span className="text-stone-600">Standard Direct Storefront</span>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <span className="text-[11px] text-stone-500 hidden sm:inline">
              Test social media custom URL attribution below:
            </span>
          </div>
        )}

        {/* Live URL Simulator Input & Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <form onSubmit={handleTestSubmit} className="flex items-center gap-1.5 flex-1 sm:flex-none">
            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-stone-400 font-mono text-[11px]">/c/</span>
              <input
                type="text"
                value={customInputSlug}
                onChange={(e) => setCustomInputSlug(e.target.value)}
                placeholder="montreux-editorial or sofia-capsule"
                className={`bg-white border ${
                  inputError ? 'border-rose-500' : 'border-stone-300 focus:border-stone-700'
                } text-stone-900 pl-7 pr-3 py-1 rounded-md text-xs w-44 sm:w-56 focus:outline-none transition-colors font-mono shadow-2xs`}
              />
            </div>
            <button
              type="submit"
              className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1 shadow-2xs"
              title="Simulate visiting this custom tracking URL"
            >
              <span>Go</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </form>

          {activeCampaign && (
            <>
              <button
                onClick={copyShareableLink}
                className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-emerald-300 text-emerald-900 rounded-md text-xs flex items-center gap-1 transition-colors font-medium shadow-2xs"
                title="Copy full custom campaign URL"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Share URL'}</span>
              </button>
              <button
                onClick={clearActiveCampaign}
                className="p-1 hover:bg-emerald-100 text-stone-500 hover:text-stone-800 rounded transition-colors"
                title="Reset to default storefront"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
      {inputError && (
        <div className="text-[11px] text-rose-600 text-right pr-4 pt-1 font-mono">
          Campaign URL not found. Try <strong>montreux-editorial</strong> or <strong>sofia-capsule</strong>
        </div>
      )}
    </div>
  );
};
