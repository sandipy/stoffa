import React from 'react';
import { AlertCircle, RefreshCw, X } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const QuotaAlertBanner: React.FC = () => {
  const { quotaAlert, dismissQuotaAlert } = useCommerce();

  if (!quotaAlert) return null;

  return (
    <aside aria-label="System Notice" className="fixed bottom-4 end-4 z-50 max-w-md bg-stone-950 text-white rounded-[4px] p-4 shadow-xl border border-stone-800 animate-in slide-in-from-bottom-3 duration-300">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
            System Notice
          </p>
          <p className="text-xs text-stone-300 leading-relaxed">
            {quotaAlert.message}
          </p>
          {quotaAlert.retryAction && (
            <button
              onClick={quotaAlert.retryAction}
              className="mt-2 text-xs font-semibold text-white hover:text-amber-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry Generation</span>
            </button>
          )}
        </div>
        <button
          onClick={dismissQuotaAlert}
          className="text-stone-400 hover:text-white p-1 rounded-[4px] cursor-pointer"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
