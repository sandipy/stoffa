import React from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, t } = useCommerce();
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);

  if (!isSizeGuideOpen) return null;

  return (
    <div
      id="size-guide-modal-overlay"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsSizeGuideOpen(false)}
    >
      <div
        id="size-guide-card"
        className="relative bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-xl w-full my-auto overflow-hidden text-stone-900 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Close Button */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-serif font-bold tracking-wide text-stone-900">
              {t('Size Guide', 'Size Guide')}
            </h2>
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              {t('Official Sizing', 'Official Sizing')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Zoom In/Out */}
            <button
              onClick={() => setZoomLevel((z) => (z === 1 ? 1.35 : 1))}
              className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-950 hover:bg-stone-50 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
              title={zoomLevel === 1 ? 'Zoom in' : 'Reset zoom'}
            >
              {zoomLevel === 1 ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{zoomLevel === 1 ? 'Zoom' : 'Reset'}</span>
            </button>

            {/* Close Button */}
            <button
              id="size-guide-close-btn"
              onClick={() => setIsSizeGuideOpen(false)}
              aria-label="Close size guide"
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Only the attached size chart image */}
        <div className="p-3 sm:p-5 overflow-y-auto max-h-[calc(92vh-60px)] flex items-center justify-center bg-white">
          <div
            className="w-full flex justify-center transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
          >
            <img
              src="/stoffasizechart.svg"
              alt="Official Footwear Size Guide Chart"
              className="w-full max-w-lg h-auto object-contain select-none shadow-xs rounded-lg border border-stone-100"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
