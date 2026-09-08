import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Search,
  Maximize2,
  Sparkles,
  RotateCcw,
  FileText,
  Save,
  ChevronDown,
  ShoppingBag,
  Footprints,
  ExternalLink,
  Tag,
  Eye,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import {
  HeroImagePairingItem,
  DEFAULT_HERO_PAIRINGS,
  loadSavedHeroPairings,
  saveHeroPairings,
  resetHeroPairings,
  POPULAR_STOFFA_SHOES,
  POPULAR_STOFFA_BAGS,
} from '../data/heroPairingsData';
import { useCommerce } from '../context/CommerceContext';
import { STOFFA_STYLE_OFFICIAL_PRODUCTS } from '../data/stoffaStyleProducts';
import {
  parsePairingTestString,
  applyParsedPairingsToItems,
  resolveStoffaProduct,
  ParsedTestPairing,
} from '../utils/pairingMatcher';
import { downloadAllHeroImagesZip, downloadCustomImagesZip } from '../utils/zipDownloader';

interface ImagePairingCuratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImagePairingCuratorModal: React.FC<ImagePairingCuratorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { setSelectedProductModal } = useCommerce();
  const [items, setItems] = useState<HeroImagePairingItem[]>(() => loadSavedHeroPairings());
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<HeroImagePairingItem | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState<boolean>(false);
  const [downloadZipStatus, setDownloadZipStatus] = useState<string | null>(null);

  // Quick Test / Paste input state
  const [isTestPanelOpen, setIsTestPanelOpen] = useState<boolean>(true);
  const [testInputText, setTestInputText] = useState<string>(
    '01_Palace_Matriarch_Indian_Model.jpg: [Shoes: https://stoffastyle.com/products/embellished-3-5-inch-high-wedge-champagne ] [Bag: __none___]'
  );
  const [testFeedback, setTestFeedback] = useState<{
    message: string;
    type: 'success' | 'error';
    parsed?: ParsedTestPairing[];
  } | null>(null);

  // Sync state on modal open
  useEffect(() => {
    if (isOpen) {
      setItems(loadSavedHeroPairings());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle updates to individual item fields
  const handleUpdateItem = (id: string, field: keyof HeroImagePairingItem, value: string) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(updated);
    saveHeroPairings(updated);
  };

  // Direct client-side image download handler
  const handleDownloadSingleImage = async (item: HeroImagePairingItem) => {
    setDownloadingId(item.id);
    try {
      const response = await fetch(item.imageSrc);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = item.cleanFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
    } catch {
      // Fallback
      const link = document.createElement('a');
      link.href = item.imageSrc;
      link.download = item.cleanFilename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setDownloadingId(null), 800);
    }
  };

  // Download all visible images as a single clean .ZIP archive via client-side JSZip
  const handleDownloadAllImages = async () => {
    if (filteredItems.length === 0) return;
    setDownloadingAll(true);
    setDownloadZipStatus('Preparing ZIP...');
    try {
      const zipCategorySlug = activeCategory.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const zipFilename = `stoffa_hero_images_${zipCategorySlug}_${filteredItems.length}.zip`;
      await downloadCustomImagesZip(
        filteredItems.map((item) => ({
          filename: item.cleanFilename,
          url: item.imageSrc,
        })),
        zipFilename,
        (curr, tot, msg) => {
          setDownloadZipStatus(msg);
        }
      );
      setDownloadZipStatus('✓ ZIP Downloaded!');
      setTimeout(() => setDownloadZipStatus(null), 3000);
    } catch (err) {
      console.error('Failed to create ZIP:', err);
      setDownloadZipStatus('Download failed. Try again.');
      setTimeout(() => setDownloadZipStatus(null), 3000);
    } finally {
      setTimeout(() => setDownloadingAll(false), 500);
    }
  };

  // Format full pairings guide for copying to chat
  const handleCopyAllPairings = () => {
    const text = items
      .map(
        (item) =>
          `[Slide ${String(item.number).padStart(2, '0')}] ${item.title}\n` +
          `  Filename: ${item.cleanFilename}\n` +
          `  Subtitle: ${item.subtitle}\n` +
          `  Shoes:    ${item.suggestedShoes || '(Not yet chosen)'}\n` +
          `  Bag:      ${item.suggestedBag || '(Not yet chosen)'}\n` +
          `  Notes:    ${item.description}\n`
      )
      .join('\n----------------------------------------\n\n');

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  // Copy single pairing to clipboard
  const handleCopySinglePairing = (item: HeroImagePairingItem) => {
    const text =
      `Slide ${String(item.number).padStart(2, '0')}: ${item.title}\n` +
      `Shoes: ${item.suggestedShoes || 'None'}\n` +
      `Bag: ${item.suggestedBag || 'None'}\n` +
      `Subtitle: ${item.subtitle}`;

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export pairings as a downloaded text file
  const handleExportTextFile = () => {
    const text =
      `STOFFA STYLE / ACCESOIRE — HERO IMAGES & PAIRINGS GUIDE\n` +
      `Exported: ${new Date().toLocaleDateString()}\n` +
      `========================================================\n\n` +
      items
        .map(
          (item) =>
            `Slide #${String(item.number).padStart(2, '0')} — ${item.title}\n` +
            `Category:        ${item.category}\n` +
            `Filename:        ${item.cleanFilename}\n` +
            `Subtitle:        ${item.subtitle}\n` +
            `Suggested Shoes: ${item.suggestedShoes || '—'}\n` +
            `Suggested Bag:   ${item.suggestedBag || '—'}\n` +
            `Visual Notes:    ${item.visualNotes}\n` +
            `Description:     ${item.description}\n`
        )
        .join('\n--------------------------------------------------------\n\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stoffa_hero_pairings_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset to original default data
  const handleResetToDefaults = () => {
    if (window.confirm('Reset all 28 titles, subtitles, shoes, and bags back to initial defaults?')) {
      const defs = resetHeroPairings();
      setItems(defs);
      setTestFeedback({
        message: 'All 28 hero image pairings reset to defaults.',
        type: 'success',
      });
    }
  };

  // Test & Apply parsed input handler
  const handleApplyTestInput = () => {
    const parsed = parsePairingTestString(testInputText);
    if (parsed.length === 0) {
      setTestFeedback({
        message: 'No matching pairing format detected. Expected: filename.jpg: [Shoes: URL/Name] [Bag: URL/Name]',
        type: 'error',
      });
      return;
    }

    const { updatedItems, countMatched } = applyParsedPairingsToItems(items, parsed);
    setItems(updatedItems);
    saveHeroPairings(updatedItems);

    setTestFeedback({
      message: `✓ Successfully verified and updated ${countMatched} hero pairing item(s)!`,
      type: 'success',
      parsed,
    });
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !searchQuery ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.suggestedShoes.toLowerCase().includes(q) ||
      item.suggestedBag.toLowerCase().includes(q) ||
      item.cleanFilename.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  const categories = ['All', 'Prom & Date Night', 'Seated Hero', 'Flagship Hero', 'Denim & Casual', 'Catalog & Editorial'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-stone-900 text-stone-100 w-full max-w-7xl max-h-[94vh] flex flex-col rounded-2xl border border-stone-700/80 shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-stone-800 bg-stone-950 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white">
                  Hero Image &amp; Pairing Curator
                </h2>
                <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  28 Images
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400">
                View all editorial photography, download high-res files, edit titles &amp; subtitles, and match shoes &amp; bags
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Test / Paste Drawer Toggle Button */}
            <button
              onClick={() => setIsTestPanelOpen(!isTestPanelOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer ${
                isTestPanelOpen
                  ? 'bg-amber-400 text-stone-950 font-bold ring-2 ring-amber-300'
                  : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/40'
              }`}
              title="Test or paste a pairing line like '01_Palace... [Shoes: URL] [Bag: __none___]'"
            >
              <Terminal className="w-4 h-4" />
              <span>{isTestPanelOpen ? 'Hide Test Bar' : 'Test / Quick Paste'}</span>
            </button>

            {/* Copy All to Chat Button */}
            <button
              onClick={handleCopyAllPairings}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              title="Copy formatted list to paste directly into chat"
            >
              {copiedAll ? <Check className="w-4 h-4 text-stone-950" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAll ? '✓ Copied to Clipboard!' : 'Copy All to Chat'}</span>
            </button>

            {/* Download ZIP Button */}
            <button
              onClick={handleDownloadAllImages}
              disabled={downloadingAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 font-medium text-xs sm:text-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              title="Download all displayed hero images in a single .ZIP archive"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>
                {downloadingAll
                  ? (downloadZipStatus || 'Preparing ZIP...')
                  : (activeCategory === 'All' && !searchQuery.trim()
                      ? `Download All in ZIP (${filteredItems.length})`
                      : `Download ZIP (${filteredItems.length})`)}
              </span>
            </button>

            {/* Export as Text Button */}
            <button
              onClick={handleExportTextFile}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
              title="Export pairing summary as a .txt file"
            >
              <FileText className="w-4 h-4" />
              <span>Export .txt</span>
            </button>

            {/* Reset to Defaults */}
            <button
              onClick={handleResetToDefaults}
              className="p-2 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              title="Reset all pairings to defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Collapsible Test & Quick Paste Panel */}
        {isTestPanelOpen && (
          <div className="px-5 py-3.5 bg-stone-950 border-b border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-stone-900 to-stone-950">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Test &amp; Quick Import Format
                </span>
                <span className="text-[11px] text-stone-400 hidden md:inline">
                  Paste lines from chat like: <code className="text-amber-200 bg-stone-800 px-1 py-0.5 rounded">filename.jpg: [Shoes: URL/Title] [Bag: __none___]</code>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setTestInputText(
                      '01_Palace_Matriarch_Indian_Model.jpg: [Shoes: https://stoffastyle.com/products/embellished-3-5-inch-high-wedge-champagne ] [Bag: __none___]'
                    )
                  }
                  className="text-[11px] text-stone-400 hover:text-amber-300 underline cursor-pointer"
                >
                  Load Slide 01 Test String
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-9">
                <input
                  type="text"
                  value={testInputText}
                  onChange={(e) => setTestInputText(e.target.value)}
                  placeholder="e.g. 01_Palace_Matriarch_Indian_Model.jpg: [Shoes: https://stoffastyle.com/... ] [Bag: __none___]"
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div className="md:col-span-3 flex items-center gap-2">
                <button
                  onClick={handleApplyTestInput}
                  className="w-full px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Test &amp; Apply Pairing</span>
                </button>
              </div>
            </div>

            {/* Test Status Banner / Feedback */}
            {testFeedback && (
              <div
                className={`mt-2.5 p-2.5 rounded-lg text-xs flex flex-wrap items-center justify-between gap-2 ${
                  testFeedback.type === 'success'
                    ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{testFeedback.message}</span>
                </div>
                {testFeedback.parsed && testFeedback.parsed[0] && (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-200">
                    <span>Matched Shoe: <strong>{testFeedback.parsed[0].shoesResolved}</strong></span>
                    <span>•</span>
                    <span>Bag: <strong>{testFeedback.parsed[0].bagIsNone ? 'None (__none___)' : testFeedback.parsed[0].bagResolved}</strong></span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="px-5 py-3 bg-stone-900/90 border-b border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? items.length
                  : items.filter((item) => item.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-stone-800/60 text-stone-400 hover:text-stone-200 border border-transparent hover:border-stone-700'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              placeholder="Search by name, shoe, bag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-stone-950 border border-stone-700 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Informative Guidance Banner */}
        <div className="px-5 py-2.5 bg-amber-950/30 border-b border-amber-900/40 text-amber-200/90 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>
              <strong>Curator Instructions:</strong> Review each photo below. You can download individual .JPG files, edit the slide title &amp; occasion, and type or choose matching shoes and bags. All changes save automatically.
            </span>
          </div>
          <span className="font-mono text-[11px] text-amber-400/80">
            Showing {filteredItems.length} of {items.length} images
          </span>
        </div>

        {/* Main Scrollable Image & Pairing List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-stone-950/60">
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center text-stone-500 space-y-3">
              <Search className="w-8 h-8 mx-auto text-stone-600" />
              <p className="text-sm">No images match your search filter.</p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs text-amber-400 underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 sm:p-5 hover:border-stone-700 transition-all shadow-md flex flex-col lg:flex-row gap-5"
              >
                {/* Left: Image Container & Quick Actions */}
                <div className="lg:w-80 shrink-0 flex flex-col gap-2.5">
                  <div className="relative group rounded-lg overflow-hidden bg-stone-950 aspect-[16/9] border border-stone-800">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => setLightboxImage(item)}
                    />

                    {/* Number Badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[11px] font-mono font-bold text-amber-400 border border-white/10">
                      #{String(item.number).padStart(2, '0')}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-[10px] uppercase tracking-wider font-semibold text-stone-300 border border-white/10">
                      {item.category}
                    </div>

                    {/* Hover Expand Overlay */}
                    <button
                      onClick={() => setLightboxImage(item)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 cursor-pointer"
                      title="Click to view fullscreen"
                    >
                      <Maximize2 className="w-5 h-5 text-amber-300" />
                      <span className="text-xs font-medium tracking-wide">View Fullscreen</span>
                    </button>
                  </div>

                  {/* Clean Filename & Download Button */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="text-[11px] font-mono text-stone-400 truncate max-w-[180px]" title={item.cleanFilename}>
                      {item.cleanFilename}
                    </span>

                    <button
                      onClick={() => handleDownloadSingleImage(item)}
                      disabled={downloadingId === item.id}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all active:scale-95 cursor-pointer shrink-0 disabled:opacity-50"
                      title={`Download ${item.cleanFilename}`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloadingId === item.id ? 'Saving...' : 'Download .JPG'}</span>
                    </button>
                  </div>

                  {/* Visual Notes / Model Pose hint */}
                  <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800/80 text-[11px] text-stone-400 leading-relaxed">
                    <span className="text-amber-400/90 font-semibold block mb-0.5">Visual Scene Details:</span>
                    {item.visualNotes}
                  </div>
                </div>

                {/* Right: Editable Text & Pairing Controls */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3.5">
                    {/* Verified User Test Banner for Slide 01 */}
                    {item.cleanFilename.includes('01_Palace') && (
                      <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-200">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          <span className="font-semibold text-amber-300">
                            Active Test Pairing:
                          </span>
                          <span>Shoes: <strong className="text-white">Crystal High K Wedge Champagne</strong> • Bag: <strong className="text-white">None</strong></span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono text-[10px] font-bold">
                          ✓ TEST MAPPING ACTIVE
                        </span>
                      </div>
                    )}

                    {/* Title & Subtitle Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-7">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1">
                          Slide Title (Collection Name)
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 text-sm font-serif font-bold rounded-lg bg-stone-950 border border-stone-700 text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-5">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1">
                          Subtitle / Occasion Tag
                        </label>
                        <input
                          type="text"
                          value={item.subtitle}
                          onChange={(e) => handleUpdateItem(item.id, 'subtitle', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg bg-stone-950 border border-stone-700 text-amber-300/90 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    {/* Editorial Story / Description */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1">
                        Editorial Narrative / Photo Description
                      </label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 text-xs leading-relaxed rounded-lg bg-stone-950 border border-stone-700 text-stone-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-y"
                      />
                    </div>

                    {/* Shoe & Bag Suggestion Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                      {/* Suggested Shoe */}
                      {(() => {
                        const matchedShoeProd = STOFFA_STYLE_OFFICIAL_PRODUCTS.find(
                          (p) => p.title.toLowerCase() === item.suggestedShoes.toLowerCase()
                        );
                        return (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-200">
                                <Footprints className="w-3.5 h-3.5 text-amber-400" />
                                <span>Suggested Shoes</span>
                              </label>
                              {item.shoesUrl ? (
                                <a
                                  href={item.shoesUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5"
                                  title="Open original Stoffa product page"
                                >
                                  <span>stoffastyle.com</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              ) : (
                                <span className="text-[10px] text-stone-500 font-mono">Editable</span>
                              )}
                            </div>
                            <input
                              type="text"
                              list={`shoes-list-${item.id}`}
                              value={item.suggestedShoes}
                              onChange={(e) => handleUpdateItem(item.id, 'suggestedShoes', e.target.value)}
                              placeholder="e.g. Crystal High K Wedge Champagne"
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                            />
                            <datalist id={`shoes-list-${item.id}`}>
                              {POPULAR_STOFFA_SHOES.map((shoe) => (
                                <option key={shoe} value={shoe} />
                              ))}
                            </datalist>

                            {/* Matched Shoe Product Preview Card */}
                            {matchedShoeProd && (
                              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-stone-900 border border-amber-500/20">
                                <img
                                  src={matchedShoeProd.images[0]}
                                  alt={matchedShoeProd.title}
                                  className="w-8 h-8 rounded object-cover border border-stone-700 shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="text-[11px] font-semibold text-stone-200 truncate">
                                    {matchedShoeProd.title}
                                  </p>
                                  <p className="text-[10px] text-amber-400 font-mono">
                                    ${matchedShoeProd.priceUSD} • 3.5" Wedge
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setSelectedProductModal(matchedShoeProd)}
                                  className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-medium transition-colors cursor-pointer shrink-0"
                                >
                                  View
                                </button>
                              </div>
                            )}

                            {/* Quick Shoe Picker Chips */}
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {['Crystal High K Wedge Champagne', 'Classic High K Wedge Gold', 'Bridal Border Rose Gold'].map((s) => (
                                <button
                                  key={s}
                                  onClick={() => handleUpdateItem(item.id, 'suggestedShoes', s)}
                                  className={`text-[10px] px-2 py-0.5 rounded transition-colors cursor-pointer ${
                                    item.suggestedShoes === s
                                      ? 'bg-amber-500/30 text-amber-200 border border-amber-500/40'
                                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                                  }`}
                                >
                                  + {s.split(' ')[0]} {s.split(' ')[s.split(' ').length - 1]}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Suggested Bag */}
                      {(() => {
                        const isBagNone =
                          item.suggestedBag === '__none___' ||
                          item.suggestedBag === 'None' ||
                          item.suggestedBag === '__none__' ||
                          item.suggestedBag === '';
                        const matchedBagProd = !isBagNone
                          ? STOFFA_STYLE_OFFICIAL_PRODUCTS.find(
                              (p) => p.title.toLowerCase() === item.suggestedBag.toLowerCase()
                            )
                          : null;

                        return (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-200">
                                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                                <span>Suggested Bag / Potli</span>
                              </label>
                              {isBagNone ? (
                                <span className="text-[10px] text-amber-300/80 font-mono">No Bag</span>
                              ) : (
                                <span className="text-[10px] text-stone-500 font-mono">Editable</span>
                              )}
                            </div>
                            <input
                              type="text"
                              list={`bags-list-${item.id}`}
                              value={item.suggestedBag}
                              onChange={(e) => handleUpdateItem(item.id, 'suggestedBag', e.target.value)}
                              placeholder="e.g. __none___ or Embellished Potli Bag Antique"
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                            />
                            <datalist id={`bags-list-${item.id}`}>
                              {POPULAR_STOFFA_BAGS.map((bag) => (
                                <option key={bag} value={bag} />
                              ))}
                            </datalist>

                            {/* Bag Status Badge or Matched Product Card */}
                            {isBagNone ? (
                              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-stone-900/90 border border-stone-800 text-[11px] text-stone-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
                                <span>No bag paired — pure spotlight on footwear</span>
                              </div>
                            ) : matchedBagProd ? (
                              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-stone-900 border border-amber-500/20">
                                <img
                                  src={matchedBagProd.images[0]}
                                  alt={matchedBagProd.title}
                                  className="w-8 h-8 rounded object-cover border border-stone-700 shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="text-[11px] font-semibold text-stone-200 truncate">
                                    {matchedBagProd.title}
                                  </p>
                                  <p className="text-[10px] text-amber-400 font-mono">
                                    ${matchedBagProd.priceUSD} • Handcrafted
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setSelectedProductModal(matchedBagProd)}
                                  className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-medium transition-colors cursor-pointer shrink-0"
                                >
                                  View
                                </button>
                              </div>
                            ) : null}

                            {/* Quick Bag Picker Chips */}
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {['__none___', 'Embellished Potli Bag Antique', 'Border Clutch Bag Gold'].map((b) => (
                                <button
                                  key={b}
                                  onClick={() => handleUpdateItem(item.id, 'suggestedBag', b)}
                                  className={`text-[10px] px-2 py-0.5 rounded transition-colors cursor-pointer ${
                                    item.suggestedBag === b
                                      ? 'bg-amber-500/30 text-amber-200 border border-amber-500/40'
                                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                                  }`}
                                >
                                  {b === '__none___' ? 'No Bag (__none___)' : `+ ${b.split(' ')[0]} ${b.split(' ')[b.split(' ').length - 1]}`}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Card Bottom Toolbar */}
                  <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                        <Check className="w-3 h-3" /> Auto-saved to browser
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Copy Single Pairing */}
                      <button
                        onClick={() => handleCopySinglePairing(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === item.id ? 'Copied' : 'Copy Pairing'}</span>
                      </button>

                      {/* Download Single Image */}
                      <button
                        onClick={() => handleDownloadSingleImage(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="px-5 py-3.5 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-stone-400">
            <span>Tip: When you have finished setting your shoe and bag suggestions, click </span>
            <strong className="text-amber-400">"Copy All to Chat"</strong>
            <span> and paste your choices into our chat message.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAllPairings}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {copiedAll ? <Check className="w-4 h-4 text-stone-950" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAll ? '✓ Copied All 28 Pairings!' : 'Copy All to Chat'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Fullscreen Image Inspection */}
      {lightboxImage && (
        <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-lg flex flex-col p-4 sm:p-6 animate-fadeIn">
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-stone-200">
            <div className="flex items-center gap-3">
              <span className="font-mono text-amber-400 font-bold text-sm">
                #{String(lightboxImage.number).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">{lightboxImage.title}</h3>
                <p className="text-xs text-stone-400">{lightboxImage.cleanFilename}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownloadSingleImage(lightboxImage)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download High-Res</span>
              </button>

              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Preview Area */}
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
            <img
              src={lightboxImage.imageSrc}
              alt={lightboxImage.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-stone-800"
            />
          </div>

          {/* Lightbox Details Bottom Bar */}
          <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
            <div className="max-w-2xl">
              <span className="text-amber-400 font-semibold">Visual Detail: </span>
              {lightboxImage.visualNotes}
            </div>
            <div className="flex items-center gap-4 text-stone-300">
              <span>
                <strong>Shoes:</strong> {lightboxImage.suggestedShoes || 'None'}
              </span>
              <span>
                <strong>Bag:</strong> {lightboxImage.suggestedBag || 'None'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
