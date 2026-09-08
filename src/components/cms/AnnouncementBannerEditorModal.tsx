import React, { useState, useEffect } from 'react';
import { X, Check, RotateCcw, Megaphone } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { AnnouncementBannerConfig } from '../../types/cms';

export const AnnouncementBannerEditorModal: React.FC = () => {
  const {
    isAnnouncementEditorOpen,
    setIsAnnouncementEditorOpen,
    cmsData,
    updateAnnouncement,
  } = useCms();

  const [formData, setFormData] = useState<AnnouncementBannerConfig>(cmsData.announcement);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isAnnouncementEditorOpen) {
      setFormData(cmsData.announcement);
      setSavedSuccess(false);
    }
  }, [isAnnouncementEditorOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAnnouncementEditorOpen) {
        setIsAnnouncementEditorOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnnouncementEditorOpen, setIsAnnouncementEditorOpen]);

  if (!isAnnouncementEditorOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Update context state and save to storage immediately
    updateAnnouncement(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsAnnouncementEditorOpen(false);
    }, 900);
  };

  const handleResetToBrandDefault = () => {
    const defaultBanner: AnnouncementBannerConfig = {
      enabled: true,
      text: 'Complimentary Express Courier Worldwide on Orders Over $200 USD | Complimentary 30-Day Returns',
      secondaryText: 'VIP Bridal Trunk Show Bookings Now Open',
      linkText: 'Explore Collection',
      linkUrl: '#/collections',
      theme: 'onyx_gold',
    };
    setFormData(defaultBanner);
  };

  return (
    <div
      id="announcement-banner-editor-modal"
      onClick={() => setIsAnnouncementEditorOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="bg-stone-900 border border-stone-800 text-stone-100 rounded-xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Announcement Banner Manager
              </h3>
              <p className="text-xs text-stone-400 font-mono">
                Storefront Top Header Announcement &bull; Admin CMS
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAnnouncementEditorOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Active Status Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-stone-950 border border-stone-800">
            <div>
              <span className="text-sm font-semibold text-white block">Banner Visibility</span>
              <span className="text-xs text-stone-400">
                Turn the storefront announcement bar on or off
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Primary Announcement Text */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
              Primary Announcement Message *
            </label>
            <input
              type="text"
              required
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="e.g. Complimentary Express Courier Worldwide on Orders Over $200 USD | Complimentary 30-Day Returns"
              className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
            />
          </div>

          {/* Secondary Subtitle / Secondary Announcement */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
              Secondary Tagline (Optional)
            </label>
            <input
              type="text"
              value={formData.secondaryText || ''}
              onChange={(e) => setFormData({ ...formData, secondaryText: e.target.value })}
              placeholder="e.g. VIP Bridal Trunk Show Bookings Now Open"
              className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
            />
          </div>

          {/* Link label and URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                Link Label (Optional)
              </label>
              <input
                type="text"
                value={formData.linkText || ''}
                onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                placeholder="e.g. Explore Collection"
                className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                Link URL / Anchor
              </label>
              <input
                type="text"
                value={formData.linkUrl || ''}
                onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                placeholder="e.g. #collections or #shoes"
                className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
              />
            </div>
          </div>

          {/* Luxury Color Theme Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-2">
              Banner Color Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'onyx_gold', label: 'Onyx & Gold', bg: 'bg-stone-950 text-amber-300 border-amber-500/40' },
                { id: 'champagne', label: 'Champagne Ivory', bg: 'bg-[#f4efe6] text-stone-900 border-[#d3c5ad]' },
                { id: 'emerald', label: 'Royal Emerald', bg: 'bg-[#0a231c] text-[#e3ceaa] border-[#184638]' },
                { id: 'burgundy', label: 'Regal Burgundy', bg: 'bg-[#2b0c14] text-[#ebd4b7] border-[#4d1624]' },
              ].map((theme) => (
                <button
                  type="button"
                  key={theme.id}
                  onClick={() => setFormData({ ...formData, theme: theme.id as any })}
                  className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${theme.bg} ${
                    formData.theme === theme.id
                      ? 'ring-2 ring-amber-400 scale-[1.02]'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <span>{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Box */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5">
              Live Preview
            </span>
            <div
              className={`p-3 rounded-lg border text-xs text-center font-serif flex items-center justify-center gap-2 ${
                formData.theme === 'champagne'
                  ? 'bg-[#f4efe6] text-stone-900 border-[#e2d8c5]'
                  : formData.theme === 'emerald'
                  ? 'bg-[#0a231c] text-[#e3ceaa] border-[#184638]'
                  : formData.theme === 'burgundy'
                  ? 'bg-[#2b0c14] text-[#ebd4b7] border-[#4d1624]'
                  : 'bg-stone-950 text-[#ebd4b7] border-amber-500/30'
              }`}
            >
              <span>{formData.text || 'Preview text...'}</span>
              {formData.linkText && (
                <span className="underline font-sans font-semibold text-[11px] ml-1">
                  {formData.linkText} &rarr;
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-800">
            <button
              type="button"
              onClick={handleResetToBrandDefault}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAnnouncementEditorOpen(false)}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Save &amp; Publish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
