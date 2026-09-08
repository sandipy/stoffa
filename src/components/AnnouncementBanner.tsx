import React from 'react';
import { useCms } from '../context/CmsContext';
import { useCommerce } from '../context/CommerceContext';

export const AnnouncementBanner: React.FC = () => {
  const { cmsData, isCmsInPlaceMode, setIsAnnouncementEditorOpen } = useCms();
  const { isAdminLoggedIn, t } = useCommerce();
  const { announcement } = cmsData;

  // Theme styling mapper
  const getThemeClasses = () => {
    switch (announcement.theme) {
      case 'champagne':
        return 'bg-[#f4efe6] text-stone-900 border-b border-[#e2d8c5]';
      case 'emerald':
        return 'bg-[#0a231c] text-[#e3ceaa] border-b border-[#184638]';
      case 'burgundy':
        return 'bg-[#2b0c14] text-[#ebd4b7] border-b border-[#4d1624]';
      case 'onyx_gold':
      default:
        return 'bg-stone-950 text-[#ebd4b7] border-b border-amber-500/20';
    }
  };

  // If disabled, completely remove from storefront
  if (!announcement.enabled) {
    return null;
  }

  return (
    <div
      id="storefront-announcement-banner"
      className={`relative z-50 text-xs py-2 px-3 sm:px-6 transition-all ${getThemeClasses()} ${
        isCmsInPlaceMode && isAdminLoggedIn
          ? 'outline-2 outline-dashed outline-amber-400/80 cursor-pointer hover:brightness-105'
          : ''
      }`}
      onClick={() => {
        if (isCmsInPlaceMode && isAdminLoggedIn) {
          setIsAnnouncementEditorOpen(true);
        }
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left">
        {/* Main message text */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="font-serif tracking-wider">{t(announcement.text, announcement.text)}</span>
          </div>

          {announcement.secondaryText && (
            <span className="hidden md:inline-block opacity-80 border-l border-current/30 pl-3 text-[11px]">
              {t(announcement.secondaryText, announcement.secondaryText)}
            </span>
          )}

          {announcement.linkText && (
            <a
              href={announcement.linkUrl || '#'}
              onClick={(e) => {
                if (isCmsInPlaceMode && isAdminLoggedIn) {
                  e.preventDefault();
                  setIsAnnouncementEditorOpen(true);
                }
              }}
              className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:opacity-90 transition-opacity ml-1 cursor-pointer"
            >
              <span>{t(announcement.linkText, announcement.linkText)}</span>
            </a>
          )}
        </div>

        {/* Direct Quick-Edit Trigger (Only visible to Admin) */}
        {isAdminLoggedIn && (
          <div className="shrink-0 flex items-center gap-1.5 ml-2">
            <button
              id="admin-edit-announcement-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsAnnouncementEditorOpen(true);
              }}
              className="flex items-center px-2.5 py-0.5 rounded-full bg-amber-400/25 hover:bg-amber-400 hover:text-stone-950 text-amber-300 border border-amber-400/50 text-[10px] font-mono font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer active:scale-95"
              title="Edit Top Announcement Banner text, theme, and links"
            >
              <span>{t('Edit Banner', 'Edit Banner')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
