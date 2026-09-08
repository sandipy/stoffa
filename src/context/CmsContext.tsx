import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StoreCmsData,
  AnnouncementBannerConfig,
  FooterContentConfig,
  PageContentConfig,
  PageCategoryCard,
  CmsEditorTarget,
} from '../types/cms';
import {
  DEFAULT_CMS_DATA,
  loadCmsContent,
  saveCmsContent,
  resetCmsContent,
} from '../data/defaultCmsContent';
import { useCommerce } from './CommerceContext';

interface CmsContextType {
  cmsData: StoreCmsData;
  isCmsInPlaceMode: boolean;
  setIsCmsInPlaceMode: (enabled: boolean) => void;
  toggleCmsInPlaceMode: () => void;

  // Modals & Active Targets
  isFooterEditorOpen: boolean;
  setIsFooterEditorOpen: (open: boolean) => void;
  isAnnouncementEditorOpen: boolean;
  setIsAnnouncementEditorOpen: (open: boolean) => void;
  isPageCmsModalOpen: boolean;
  setIsPageCmsModalOpen: (open: boolean) => void;

  activeEditorTarget: CmsEditorTarget | null;
  openCmsEditor: (target: CmsEditorTarget) => void;
  closeCmsEditor: () => void;

  // Updates
  updateAnnouncement: (config: Partial<AnnouncementBannerConfig>) => void;
  updateFooter: (config: Partial<FooterContentConfig>) => void;
  updateHomepageContent: (config: Partial<PageContentConfig['homepage']>) => void;
  updateCategoryCard: (
    key: 'shoes' | 'bags' | 'sale' | 'ready',
    data: Partial<PageCategoryCard>
  ) => void;

  // Utilities
  resetToDefaults: () => void;
  exportCmsJson: () => string;
  importCmsJson: (jsonString: string) => { success: boolean; error?: string };
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminLoggedIn } = useCommerce();
  const [cmsData, setCmsData] = useState<StoreCmsData>(() => loadCmsContent());
  const [isCmsInPlaceMode, setIsCmsInPlaceMode] = useState<boolean>(false);

  const [isFooterEditorOpen, setIsFooterEditorOpen] = useState<boolean>(false);
  const [isAnnouncementEditorOpen, setIsAnnouncementEditorOpen] = useState<boolean>(false);
  const [isPageCmsModalOpen, setIsPageCmsModalOpen] = useState<boolean>(false);
  const [activeEditorTarget, setActiveEditorTarget] = useState<CmsEditorTarget | null>(null);

  // Listen for storage events across tabs or components
  useEffect(() => {
    const handleStorageUpdate = (e: any) => {
      if (e?.detail) {
        setCmsData(e.detail);
      }
    };
    window.addEventListener('cms_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('cms_storage_updated', handleStorageUpdate);
  }, []);

  // Persist whenever cmsData changes
  const applyDataUpdate = (updater: (prev: StoreCmsData) => StoreCmsData) => {
    setCmsData((prev) => {
      const next = updater(prev);
      saveCmsContent(next);
      return next;
    });
  };

  const updateAnnouncement = (config: Partial<AnnouncementBannerConfig>) => {
    applyDataUpdate((prev) => ({
      ...prev,
      announcement: {
        ...prev.announcement,
        ...config,
      },
    }));
  };

  const updateFooter = (config: Partial<FooterContentConfig>) => {
    applyDataUpdate((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        ...config,
      },
    }));
  };

  const updateHomepageContent = (config: Partial<PageContentConfig['homepage']>) => {
    applyDataUpdate((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        homepage: {
          ...prev.pages.homepage,
          ...config,
        },
      },
    }));
  };

  const updateCategoryCard = (
    key: 'shoes' | 'bags' | 'sale' | 'ready',
    data: Partial<PageCategoryCard>
  ) => {
    applyDataUpdate((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        homepage: {
          ...prev.pages.homepage,
          categoryCards: {
            ...prev.pages.homepage.categoryCards,
            [key]: {
              ...prev.pages.homepage.categoryCards[key],
              ...data,
            },
          },
        },
      },
    }));
  };

  const resetToDefaults = () => {
    const defaults = resetCmsContent();
    setCmsData(defaults);
  };

  const exportCmsJson = () => {
    return JSON.stringify(cmsData, null, 2);
  };

  const importCmsJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Invalid JSON format' };
      }
      const merged: StoreCmsData = {
        ...DEFAULT_CMS_DATA,
        ...parsed,
        announcement: { ...DEFAULT_CMS_DATA.announcement, ...parsed.announcement },
        footer: { ...DEFAULT_CMS_DATA.footer, ...parsed.footer },
        pages: {
          ...DEFAULT_CMS_DATA.pages,
          ...parsed.pages,
          homepage: {
            ...DEFAULT_CMS_DATA.pages.homepage,
            ...parsed.pages?.homepage,
            categoryCards: {
              ...DEFAULT_CMS_DATA.pages.homepage.categoryCards,
              ...parsed.pages?.homepage?.categoryCards,
            },
          },
        },
      };
      saveCmsContent(merged);
      setCmsData(merged);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to parse JSON' };
    }
  };

  const toggleCmsInPlaceMode = () => {
    if (!isAdminLoggedIn) return;
    setIsCmsInPlaceMode((prev) => !prev);
  };

  const openCmsEditor = (target: CmsEditorTarget) => {
    setActiveEditorTarget(target);
    if (target.type === 'announcement') {
      setIsAnnouncementEditorOpen(true);
    } else if (
      target.type === 'footer_contact' ||
      target.type === 'footer_story' ||
      target.type === 'footer_value_props' ||
      target.type === 'footer_social'
    ) {
      setIsFooterEditorOpen(true);
    } else {
      setIsPageCmsModalOpen(true);
    }
  };

  const closeCmsEditor = () => {
    setActiveEditorTarget(null);
    setIsAnnouncementEditorOpen(false);
    setIsFooterEditorOpen(false);
    setIsPageCmsModalOpen(false);
  };

  return (
    <CmsContext.Provider
      value={{
        cmsData,
        isCmsInPlaceMode,
        setIsCmsInPlaceMode,
        toggleCmsInPlaceMode,
        isFooterEditorOpen,
        setIsFooterEditorOpen,
        isAnnouncementEditorOpen,
        setIsAnnouncementEditorOpen,
        isPageCmsModalOpen,
        setIsPageCmsModalOpen,
        activeEditorTarget,
        openCmsEditor,
        closeCmsEditor,
        updateAnnouncement,
        updateFooter,
        updateHomepageContent,
        updateCategoryCard,
        resetToDefaults,
        exportCmsJson,
        importCmsJson,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
