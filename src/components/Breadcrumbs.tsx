import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const Breadcrumbs: React.FC = () => {
  const { selectedCategory, setSelectedCategory, viewMode, setViewMode, t } = useCommerce();

  // If on pure homepage, no breadcrumb trail needed
  if (viewMode === 'storefront' && (selectedCategory === 'All' || !selectedCategory)) {
    return null;
  }

  const handleHomeClick = () => {
    setViewMode('storefront');
    setSelectedCategory('All');
  };

  const isCollectionsSub =
    selectedCategory !== 'All' &&
    selectedCategory !== 'Collections' &&
    selectedCategory !== 'The Collections' &&
    selectedCategory !== 'all-collections';

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-[#faf9f6] border-b border-stone-200/60 py-2.5 px-4 sm:px-8 text-xs text-stone-500 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center space-x-2">
        <button
          onClick={handleHomeClick}
          className="flex items-center space-x-1 hover:text-stone-900 transition-colors"
          title={t('Return to Home', 'Return to Home')}
        >
          <Home className="w-3.5 h-3.5" />
          <span>{t('Home', 'Home')}</span>
        </button>

        {viewMode === 'admin' ? (
          <>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="font-semibold text-stone-900">{t('Admin Dashboard', 'Admin Dashboard')}</span>
          </>
        ) : (
          <>
            {isCollectionsSub && (
              <>
                <ChevronRight className="w-3 h-3 text-stone-400" />
                <button
                  onClick={() => setSelectedCategory('Collections')}
                  className="hover:text-stone-900 transition-colors"
                >
                  {t('Collections', 'Collections')}
                </button>
              </>
            )}
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="font-semibold text-stone-900 capitalize">
              {t(selectedCategory, selectedCategory)}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};
