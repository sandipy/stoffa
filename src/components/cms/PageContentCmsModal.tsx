import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  RotateCcw,
  Sparkles,
  Download,
  Upload,
  Layout,
  Layers,
  Copy,
  AlertCircle,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { PageContentConfig } from '../../types/cms';
import { CategoryCardImagePicker } from './CategoryCardImagePicker';

export const PageContentCmsModal: React.FC = () => {
  const {
    isPageCmsModalOpen,
    setIsPageCmsModalOpen,
    cmsData,
    updateHomepageContent,
    updateCategoryCard,
    resetToDefaults,
    exportCmsJson,
    importCmsJson,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'categories' | 'new_arrivals' | 'about' | 'backup'>('categories');
  const [formData, setFormData] = useState<PageContentConfig>(cmsData.pages);
  const [jsonInput, setJsonInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setFormData(cmsData.pages);
  }, [cmsData.pages, isPageCmsModalOpen]);

  if (!isPageCmsModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageContent(formData.homepage);
    setStatusMessage({ type: 'success', text: 'Page content updated and saved successfully!' });
    setTimeout(() => {
      setStatusMessage(null);
      setIsPageCmsModalOpen(false);
    }, 1200);
  };

  const handleExport = () => {
    const jsonStr = exportCmsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accesoire_cms_content_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMessage({ type: 'success', text: 'CMS content JSON exported to your downloads!' });
  };

  const handleImport = () => {
    if (!jsonInput.trim()) {
      setStatusMessage({ type: 'error', text: 'Please paste valid JSON content.' });
      return;
    }
    const res = importCmsJson(jsonInput);
    if (res.success) {
      setStatusMessage({ type: 'success', text: 'CMS content JSON imported and applied live!' });
      setTimeout(() => setStatusMessage(null), 2500);
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Failed to import JSON.' });
    }
  };

  return (
    <div
      id="page-content-cms-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="bg-stone-900 border border-stone-800 text-stone-100 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Page-by-Page Content CMS
              </h3>
              <p className="text-xs text-stone-400 font-mono">
                Homepage Sections &bull; 4 Category Cards &bull; Just In &bull; JSON Backup
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPageCmsModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-800 bg-stone-950/60 px-6 gap-2 pt-2">
          {[
            { id: 'categories', label: '4 Category Cards', icon: Layers },
            { id: 'new_arrivals', label: 'Just In Section', icon: Sparkles },
            { id: 'about', label: 'Atelier & Heritage', icon: Layout },
            { id: 'backup', label: 'Backup & JSON', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`px-6 py-2.5 text-xs font-semibold flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950 text-emerald-300 border-b border-emerald-800'
                : 'bg-rose-950 text-rose-300 border-b border-rose-800'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* TAB 1: 4 Category Cards */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs text-stone-300 block">
                  Customize titles, subtitles, category targets, and choose or upload custom background images:
                </span>
                <span className="text-[11px] font-mono text-amber-400 font-semibold">
                  10 New Images available in Gallery
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(['shoes', 'bags', 'sale', 'ready'] as const).map((key) => {
                  const card = formData.homepage.categoryCards[key];
                  const fallbackTargets: Record<typeof key, string> = {
                    shoes: 'Shoes',
                    bags: 'Bags',
                    sale: 'Sale',
                    ready: 'Ready to Ship',
                  };

                  return (
                    <div
                      key={key}
                      className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                        <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          <span>{key.toUpperCase()} CARD</span>
                        </span>
                        {card.imageUrl && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            Custom Image Set
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                            Display Title
                          </label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                homepage: {
                                  ...formData.homepage,
                                  categoryCards: {
                                    ...formData.homepage.categoryCards,
                                    [key]: { ...card, title: e.target.value },
                                  },
                                },
                              })
                            }
                            className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-700 text-xs text-white focus:outline-hidden focus:border-amber-400 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                            Click Destination
                          </label>
                          <select
                            value={card.categoryTarget || fallbackTargets[key]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                homepage: {
                                  ...formData.homepage,
                                  categoryCards: {
                                    ...formData.homepage.categoryCards,
                                    [key]: { ...card, categoryTarget: e.target.value },
                                  },
                                },
                              })
                            }
                            className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-700 text-xs text-white focus:outline-hidden focus:border-amber-400 font-mono"
                          >
                            <option value="Shoes">Shoes Collection</option>
                            <option value="Bags">Bags &amp; Potlis</option>
                            <option value="Sale">Sale Archive</option>
                            <option value="Ready to Ship">Ready to Ship</option>
                            <option value="Wedges">Architectural Wedges</option>
                            <option value="Bridal">Bridal Couture</option>
                            <option value="Flats">Artisanal Flats</option>
                            <option value="Block Heels">Block Heels</option>
                            <option value="Collections">The Collections</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                          Subtitle &amp; Craft Description
                        </label>
                        <textarea
                          rows={2}
                          value={card.subtitle}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              homepage: {
                                ...formData.homepage,
                                categoryCards: {
                                  ...formData.homepage.categoryCards,
                                  [key]: { ...card, subtitle: e.target.value },
                                },
                              },
                            })
                          }
                          className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-700 text-xs text-white focus:outline-hidden focus:border-amber-400 leading-snug"
                        />
                      </div>

                      {/* Image Picker for this card */}
                      <CategoryCardImagePicker
                        cardKey={key}
                        currentImageUrl={card.imageUrl}
                        defaultFallbackLabel={`Dynamic ${key.toUpperCase()} Pool`}
                        onSelectImage={(newUrl) =>
                          setFormData({
                            ...formData,
                            homepage: {
                              ...formData.homepage,
                              categoryCards: {
                                ...formData.homepage.categoryCards,
                                [key]: { ...card, imageUrl: newUrl },
                              },
                            },
                          })
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Just In Section */}
          {activeTab === 'new_arrivals' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  Section Headline Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.homepage.newArrivalsTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homepage: { ...formData.homepage, newArrivalsTitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white focus:outline-hidden focus:border-amber-400 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  Section Subheading / Tagline
                </label>
                <input
                  type="text"
                  value={formData.homepage.newArrivalsSubtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homepage: { ...formData.homepage, newArrivalsSubtitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="p-4 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-xs font-semibold text-amber-300 block mb-1">
                  💡 Dynamic Product Catalog Sync
                </span>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Items shown in the Just In carousel automatically pull from your product catalog CSV tagged as new or featured. You can adjust prices and inventory directly in the Product Catalog CSV manager.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: About / Atelier Story */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  Atelier Title
                </label>
                <input
                  type="text"
                  value={formData.aboutSection.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      aboutSection: { ...formData.aboutSection, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white focus:outline-hidden focus:border-amber-400 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  Heritage Story Narrative
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutSection.story}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      aboutSection: { ...formData.aboutSection, story: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white focus:outline-hidden focus:border-amber-400 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  Heritage Quote / Motto
                </label>
                <input
                  type="text"
                  value={formData.aboutSection.heritageText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      aboutSection: { ...formData.aboutSection, heritageText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* TAB 4: Backup & JSON Export/Import */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-stone-950 border border-stone-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Export Entire CMS Configuration
                    </h4>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Download all announcement, footer, contact info, and page texts into a `.json` backup file.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 text-xs font-semibold cursor-pointer shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Import or Restore from JSON
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Paste raw CMS JSON text to update all storefront texts in one click.
                  </p>
                </div>
                <textarea
                  rows={4}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder={`Paste CMS JSON here, e.g. {"announcement": {...}, "footer": {...}}`}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-xs font-mono text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleImport}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Apply Pasted JSON</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-3 flex items-center justify-between gap-3 border-t border-stone-800">
            <button
              type="button"
              onClick={() => resetToDefaults()}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPageCmsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Save All Page Content</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
