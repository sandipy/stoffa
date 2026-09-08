import React, { useEffect } from 'react';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { B2BOrderModal } from './components/B2BOrderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CatalogCsvModal } from './components/CatalogCsvModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Hero } from './components/Hero';
import { LanguageModal } from './components/LanguageModal';
import { LanguageWarningModal } from './components/LanguageWarningModal';
import { Navbar } from './components/Navbar';
import { OccasionDiscovery } from './components/OccasionDiscovery';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { QuotaAlertBanner } from './components/QuotaAlertBanner';
import { SizeGuideModal } from './components/SizeGuideModal';
import { MediaGalleryModal } from './components/MediaGalleryModal';
import { ImagePairingCuratorModal } from './components/ImagePairingCuratorModal';
import { HeroCsvModal } from './components/HeroCsvModal';
import { PageHeroManagerModal } from './components/admin/PageHeroManagerModal';
import { FourCategoryLinks } from './components/FourCategoryLinks';
import { EdgeToEdgeNewArrivals } from './components/EdgeToEdgeNewArrivals';
import { FadeInSection } from './components/FadeInSection';
import { CategoryCollectionSection } from './components/CategoryCollectionSection';
import { CollectionsDirectoryView } from './components/CollectionsDirectoryView';
import { Footer } from './components/Footer';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { AnnouncementBannerEditorModal } from './components/cms/AnnouncementBannerEditorModal';
import { FooterEditorModal } from './components/cms/FooterEditorModal';
import { TranslationMdModal } from './components/TranslationMdModal';
import { PageContentCmsModal } from './components/cms/PageContentCmsModal';
import { CommerceProvider, useCommerce } from './context/CommerceContext';
import { CmsProvider } from './context/CmsContext';
import { parseHashRoute, categoryToUrl } from './utils/navigationRouter';

const StorefrontContent: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useCommerce();

  const isCollectionsDirectory =
    selectedCategory === 'Collections' ||
    selectedCategory === 'The Collections' ||
    selectedCategory === 'all-collections';

  const isCategoryFiltered = selectedCategory !== 'All' && Boolean(selectedCategory);

  return (
    <div className="bg-[#faf9f6]">
      {/* If viewing the 15 Collections Directory 1-Page 3-Column View */}
      {isCollectionsDirectory ? (
        <div className="space-y-12 pb-16">
          <CollectionsDirectoryView
            onSelectCollection={(col) => setSelectedCategory(col)}
          />
          <FadeInSection direction="up" threshold={0.1}>
            <EdgeToEdgeNewArrivals />
          </FadeInSection>
        </div>
      ) : isCategoryFiltered ? (
        /* If category is active, show the focused Category Collection View right at top */
        <div className="space-y-12 pb-16">
          <CategoryCollectionSection
            categoryTitle={selectedCategory}
          />
          <FadeInSection direction="up" threshold={0.1}>
            <EdgeToEdgeNewArrivals />
          </FadeInSection>
        </div>
      ) : (
        /* Homepage Layout Matching User's Exact Requested Structure */
        <div className="space-y-0 pb-16">
          {/* 1. Hero with rotation across active images */}
          <Hero />

          {/* 2. 4 Image Links: Shoes, Bags, Sale, Ready to Ship */}
          <FadeInSection direction="up" threshold={0.08} duration={750}>
            <FourCategoryLinks />
          </FadeInSection>

          {/* 3. Just In / New Arrivals (Light Beige Background), scrolling left and right with controls */}
          <FadeInSection direction="up" threshold={0.08} duration={750}>
            <EdgeToEdgeNewArrivals />
          </FadeInSection>
        </div>
      )}
    </div>
  );
};

const MainAppLayout: React.FC = () => {
  const {
    viewMode,
    selectedProductModal,
    selectedCategory,
    setSelectedCategory,
    setSelectedProductModal,
    setViewMode,
    clearFilters,
    isPairingCuratorOpen,
    setIsPairingCuratorOpen,
    products,
  } = useCommerce();

  // Bi-directional URL Hash Routing
  useEffect(() => {
    const handleHashSync = () => {
      const currentHash = window.location.hash;
      const route = parseHashRoute(currentHash);

      setViewMode(route.viewMode);
      setSelectedCategory(route.category);

      if (route.productId) {
        const prod = products.find(
          (p) =>
            p.id.toLowerCase() === route.productId?.toLowerCase() ||
            p.handle?.toLowerCase() === route.productId?.toLowerCase()
        );
        if (prod) {
          setSelectedProductModal(prod);
        }
      } else {
        setSelectedProductModal(null);
      }
    };

    // Initial check on mount
    if (window.location.hash && window.location.hash !== '#/' && window.location.hash !== '#') {
      handleHashSync();
    } else {
      setSelectedCategory('All');
      setSelectedProductModal(null);
      setViewMode('storefront');
      clearFilters();
    }

    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [products]);

  // Sync state changes back to hash URL if triggered via button click inside components
  useEffect(() => {
    if (selectedProductModal) {
      const targetHash = `#/product/${selectedProductModal.handle || selectedProductModal.id}`;
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
    } else if (viewMode === 'admin') {
      if (window.location.hash !== '#/admin') {
        window.location.hash = '#/admin';
      }
    } else {
      const targetUrl = categoryToUrl(selectedCategory);
      if (window.location.hash !== targetUrl && !(window.location.hash === '' && targetUrl === '#/')) {
        window.location.hash = targetUrl;
      }
    }
  }, [selectedCategory, viewMode, selectedProductModal]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedCategory, viewMode, selectedProductModal]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      {/* 0. Top Announcement Banner (with quick-edit for admin) */}
      <AnnouncementBanner />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        {selectedProductModal ? (
          <ProductDetailPage />
        ) : (
          <>
            {viewMode === 'storefront' && <StorefrontContent />}
            {viewMode === 'admin' && <AdminDashboard />}
          </>
        )}
      </main>

      {/* Global Modals & Drawers */}
      {/* Product detail view is now a full page not a popup as requested */}
      <ProductComparisonModal />
      <B2BOrderModal />
      <LanguageModal />
      <TranslationMdModal />
      <CatalogCsvModal />
      <HeroCsvModal />
      <PageHeroManagerModal />
      <AdminLoginModal />
      <LanguageWarningModal />
      <CartDrawer />
      <CheckoutModal />
      <QuotaAlertBanner />
      <SizeGuideModal />
      <MediaGalleryModal />
      <ImagePairingCuratorModal
        isOpen={isPairingCuratorOpen}
        onClose={() => setIsPairingCuratorOpen(false)}
      />

      {/* Admin CMS Modals (Visible only when triggered by authenticated admin) */}
      <AnnouncementBannerEditorModal />
      <FooterEditorModal />
      <PageContentCmsModal />

      {/* Clean Accesoire Brand Footer with 4-Card Value Prop Banner */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CommerceProvider>
      <CmsProvider>
        <MainAppLayout />
      </CmsProvider>
    </CommerceProvider>
  );
}
