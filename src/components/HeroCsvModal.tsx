import React, { useState, useRef } from 'react';
import {
  X,
  Download,
  Upload,
  FileText,
  Image as ImageIcon,
  RefreshCw,
  Check,
  AlertCircle,
  ExternalLink,
  Folder,
  ArrowRight,
  Trash2,
  Layers,
  Eye,
  EyeOff,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import {
  HeroSlideConfig,
  exportHeroSlidesCSV,
  importHeroSlidesFromCSV,
  setCustomImageForSlide,
  removeCustomImageForSlide,
  batchApplyImages,
  saveHeroSlides,
  resetHeroSlides,
  addNewHeroSlide,
  toggleHeroSlideVisibility,
  deleteHeroSlide,
} from '../data/heroSlidesManager';
import { downloadAllHeroImagesZip } from '../utils/zipDownloader';

export const HeroCsvModal: React.FC = () => {
  const {
    isHeroCsvModalOpen,
    setIsHeroCsvModalOpen,
    heroSlides,
    refreshHeroSlides,
    products,
  } = useCommerce();

  const [activeTab, setActiveTab] = useState<'csv' | 'images' | 'products' | 'guide'>('csv');
  const [csvInput, setCsvInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Batch images state
  const [batchFiles, setBatchFiles] = useState<{ name: string; dataUrl: string; matchedId?: string }[]>([]);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  // In-table editing
  const [editableSlides, setEditableSlides] = useState<HeroSlideConfig[]>([]);
  const [hasUnsavedTableEdits, setHasUnsavedTableEdits] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  // Large preview image modal state for inspecting hero slides
  const [previewModalImage, setPreviewModalImage] = useState<{ url: string; title: string; filename: string } | null>(null);

  // Single file input ref
  const singleFileInputRef = useRef<HTMLInputElement>(null);
  const [targetSlideForSingleUpload, setTargetSlideForSingleUpload] = useState<string | null>(null);

  // Multi file input ref
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const csvFileInputRef = useRef<HTMLInputElement>(null);
  const newSlideFileInputRef = useRef<HTMLInputElement>(null);

  // Slide visibility filter ('all' | 'visible' | 'hidden')
  const [visibilityFilter, setVisibilityFilter] = useState<'all' | 'visible' | 'hidden'>('all');

  // Add new slide modal/drawer state
  const [isAddSlideOpen, setIsAddSlideOpen] = useState(false);
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');
  const [newSlideBadge, setNewSlideBadge] = useState('NEW ARRIVAL');
  const [newSlideCategory, setNewSlideCategory] = useState('Shoes');
  const [newSlideButton1Text, setNewSlideButton1Text] = useState('Shop Shoes');
  const [newSlideButton1Target, setNewSlideButton1Target] = useState('Shoes');
  const [newSlideButton2Text, setNewSlideButton2Text] = useState('');
  const [newSlideButton2Target, setNewSlideButton2Target] = useState('');
  const [newSlidePairedShoes, setNewSlidePairedShoes] = useState('');
  const [newSlideImageUrl, setNewSlideImageUrl] = useState('');
  const [newSlideIsVisible, setNewSlideIsVisible] = useState(true);

  React.useEffect(() => {
    if (isHeroCsvModalOpen) {
      setEditableSlides(heroSlides);
      setHasUnsavedTableEdits(false);
      setFeedback(null);
    }
  }, [isHeroCsvModalOpen, heroSlides]);

  if (!isHeroCsvModalOpen) return null;

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback((prev) => (prev?.message === message ? null : prev));
    }, 6000);
  };

  // 1. Download Hero CSV
  const handleDownloadHeroCsv = () => {
    try {
      const csvContent = exportHeroSlidesCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'hero_images_catalog.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showFeedback('success', 'Hero Images CSV downloaded successfully!');
    } catch (err: any) {
      showFeedback('error', 'Failed to download CSV: ' + err.message);
    }
  };

  // 2. Upload CSV File
  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (text) {
        setCsvInput(text);
        processCsvString(text);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const processCsvString = (textToProcess: string) => {
    if (!textToProcess.trim()) {
      showFeedback('error', 'Please provide CSV content to import.');
      return;
    }
    const result = importHeroSlidesFromCSV(textToProcess);
    if (result.success) {
      refreshHeroSlides();
      showFeedback(
        'success',
        `Successfully updated ${result.count} hero slides with your custom texts and buttons!`
      );
      setCsvInput('');
    } else {
      showFeedback('error', result.error || 'Failed to parse CSV.');
    }
  };

  // 3. Batch Image Upload Handling
  const handleMultiImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessingBatch(true);
    const readFiles: { name: string; dataUrl: string; matchedId?: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (evt) => resolve(evt.target?.result as string);
        reader.readAsDataURL(file);
      });

      // Find matching slide by number prefix or filename
      const fname = file.name.toLowerCase();
      let matchedSlide = heroSlides.find(
        (s) =>
          s.cleanFilename.toLowerCase() === fname ||
          s.rawFilename.toLowerCase() === fname ||
          fname.includes(s.cleanFilename.toLowerCase().replace(/\.[^.]+$/, ''))
      );

      if (!matchedSlide) {
        const numMatch = fname.match(/^(?:slide[-_]?)?(\d+)/i);
        if (numMatch) {
          const num = parseInt(numMatch[1], 10);
          matchedSlide = heroSlides.find((s) => s.order === num);
        }
      }

      readFiles.push({
        name: file.name,
        dataUrl,
        matchedId: matchedSlide ? matchedSlide.id : undefined,
      });
    }

    setBatchFiles(readFiles);
    setIsProcessingBatch(false);
    e.target.value = '';
  };

  const handleApplyBatchImages = () => {
    if (batchFiles.length === 0) return;

    let appliedCount = 0;
    for (const item of batchFiles) {
      if (item.matchedId) {
        setCustomImageForSlide(item.matchedId, item.dataUrl, item.name);
        appliedCount++;
      }
    }

    refreshHeroSlides();
    showFeedback('success', `Successfully applied ${appliedCount} custom hero images!`);
    setBatchFiles([]);
  };

  // 4. Single Image Upload Handling
  const handleSingleImageTrigger = (slideId: string) => {
    setTargetSlideForSingleUpload(slideId);
    if (singleFileInputRef.current) {
      singleFileInputRef.current.click();
    }
  };

  const handleSingleImageUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetSlideForSingleUpload) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      setCustomImageForSlide(targetSlideForSingleUpload, dataUrl, file.name);
      refreshHeroSlides();
      showFeedback('success', `Updated image for slide ${targetSlideForSingleUpload}!`);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
    setTargetSlideForSingleUpload(null);
  };

  const handleRemoveCustomImage = (slideId: string) => {
    removeCustomImageForSlide(slideId);
    refreshHeroSlides();
    showFeedback('success', `Reverted slide ${slideId} to default image.`);
  };

  // 5. In-table edit handlers
  const handleTableChange = (index: number, field: keyof HeroSlideConfig, val: string) => {
    setEditableSlides((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
    setHasUnsavedTableEdits(true);
  };

  const handleSaveTableEdits = () => {
    saveHeroSlides(editableSlides);
    refreshHeroSlides();
    setHasUnsavedTableEdits(false);
    showFeedback('success', 'Changes saved to live hero carousel!');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all hero texts, buttons, and custom images to default?')) {
      resetHeroSlides();
      refreshHeroSlides();
      showFeedback('success', 'Reset all hero slides to default!');
    }
  };

  // 6. Add New Hero Slide Handlers
  const handleNewSlideImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      if (dataUrl) {
        setNewSlideImageUrl(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewSlideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideImageUrl) {
      showFeedback('error', 'Please select or upload an image for the new hero slide.');
      return;
    }
    if (!newSlideTitle.trim()) {
      showFeedback('error', 'Please provide a title for the hero slide.');
      return;
    }

    try {
      const addedSlide = addNewHeroSlide({
        title: newSlideTitle.trim(),
        subtitle: newSlideSubtitle.trim() || 'Handcrafted Luxury Collection',
        badge: newSlideBadge.trim() || 'NEW ARRIVAL',
        categoryTarget: newSlideCategory,
        button1Text: newSlideButton1Text.trim() || 'Shop Shoes',
        button1Target: newSlideButton1Target.trim() || 'Shoes',
        button2Text: newSlideButton2Text.trim(),
        button2Target: newSlideButton2Target.trim(),
        pairedShoes: newSlidePairedShoes.trim(),
        imageUrl: newSlideImageUrl,
        isUnavailable: !newSlideIsVisible,
      });

      refreshHeroSlides();
      setEditableSlides((prev) => [...prev, addedSlide]);
      showFeedback('success', `Added new hero slide "${addedSlide.title}" successfully!`);

      // Reset form
      setNewSlideTitle('');
      setNewSlideSubtitle('');
      setNewSlideBadge('NEW ARRIVAL');
      setNewSlidePairedShoes('');
      setNewSlideButton2Text('');
      setNewSlideButton2Target('');
      setNewSlideImageUrl('');
      setIsAddSlideOpen(false);
    } catch (err: any) {
      showFeedback('error', 'Failed to add hero slide: ' + err.message);
    }
  };

  // 7. Toggle Slide Visibility (Hide or Show in Hero section)
  const handleToggleSlideVisibility = (slideId: string, currentIsVisible: boolean) => {
    const targetIsVisible = !currentIsVisible;
    toggleHeroSlideVisibility(slideId, targetIsVisible);

    // Update editable slides immediately in local state
    setEditableSlides((prev) =>
      prev.map((s) => (s.id === slideId ? { ...s, isUnavailable: !targetIsVisible } : s))
    );

    refreshHeroSlides();
    showFeedback(
      'success',
      targetIsVisible
        ? 'Slide is now visible in the hero carousel!'
        : 'Slide is now hidden from the hero carousel (you can make it visible anytime with the checkbox).'
    );
  };

  // 8. Delete Custom Slide
  const handleDeleteSlide = (slideId: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title || 'this slide'}"?`)) {
      deleteHeroSlide(slideId);
      setEditableSlides((prev) => prev.filter((s) => s.id !== slideId));
      refreshHeroSlides();
      showFeedback('success', 'Slide removed from hero carousel.');
    }
  };

  // Download official products CSV
  const handleDownloadProductsCsv = (filename: 'stoffastyle_products.csv' | 'accesoire_catalog.csv') => {
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const customImagesCount = heroSlides.filter((s) => s.isCustomImage).length;

  return (
    <div
      id="hero-csv-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={singleFileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleSingleImageUploaded}
      />
      <input
        type="file"
        ref={multiFileInputRef}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleMultiImageSelect}
      />
      <input
        type="file"
        ref={csvFileInputRef}
        accept=".csv"
        className="hidden"
        onChange={handleCsvFileUpload}
      />
      <input
        type="file"
        ref={newSlideFileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleNewSlideImageSelected}
      />

      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-300">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Hero Content & Image Manager
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  CSV + Batch Upload
                </span>
              </h2>
              <p className="text-xs text-stone-300 mt-0.5">
                Edit slide headlines, badges, buttons, links, and replace imagery for all 28 hero slides
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-400 bg-stone-800 px-2.5 py-1 rounded-full font-mono">
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              {customImagesCount} custom images active
            </span>
            <button
              onClick={() => setIsHeroCsvModalOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`px-6 py-2.5 text-xs font-semibold flex items-center justify-between transition-all ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-b border-emerald-200'
                : 'bg-rose-50 text-rose-900 border-b border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 bg-stone-50 border-b border-stone-200 overflow-x-auto text-sm font-medium">
          <button
            onClick={() => setActiveTab('csv')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'csv'
                ? 'border-stone-900 text-stone-950 font-bold bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Edit Text & CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'images'
                ? 'border-stone-900 text-stone-950 font-bold bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-600" />
            <span>Replace Images (Batch / Separate)</span>
            {customImagesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-mono flex items-center justify-center">
                {customImagesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-stone-900 text-stone-950 font-bold bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Stoffa Products CSV (106 Items)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-stone-900 text-stone-950 font-bold bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Folder className="w-4 h-4 text-stone-600" />
            <span>Folder & URL Guide</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: CSV EDIT & UPLOAD */}
          {activeTab === 'csv' && (
            <div className="space-y-6">
              {/* Quick Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
                <div>
                  <h3 className="text-sm font-bold text-amber-950">
                    Hero Slide Texts & Buttons CSV
                  </h3>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Download all 28 slides as CSV, edit headlines & buttons in Excel or Sheets, and upload to replace.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setIsAddSlideOpen((v) => !v)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 text-white hover:bg-amber-700 text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isAddSlideOpen ? 'Close Add Form' : 'Add New Hero Slide'}</span>
                  </button>

                  <button
                    onClick={handleDownloadHeroCsv}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Hero CSV</span>
                  </button>

                  <button
                    onClick={() => csvFileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-stone-900 hover:bg-stone-100 border border-stone-300 text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-stone-600" />
                    <span>Upload Edited CSV</span>
                  </button>

                  <button
                    onClick={handleResetDefaults}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-stone-600 hover:text-rose-700 text-xs font-medium transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* Collapsible Add New Hero Slide & Image Form */}
              {isAddSlideOpen && (
                <form
                  onSubmit={handleAddNewSlideSubmit}
                  className="p-5 bg-amber-50/70 border-2 border-amber-300 rounded-xl space-y-4 shadow-sm animate-in fade-in duration-150"
                >
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">Add New Hero Image & Slide</h4>
                        <p className="text-xs text-stone-600">
                          Upload a photo and set titles, category buttons, and visibility for the live carousel.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddSlideOpen(false)}
                      className="p-1 rounded text-stone-500 hover:text-stone-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Image selector & preview */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-stone-700">
                        Hero Photo <span className="text-rose-600">*</span>
                      </label>
                      <div
                        onClick={() => newSlideFileInputRef.current?.click()}
                        className="relative aspect-16/10 rounded-lg border-2 border-dashed border-amber-300 bg-white hover:bg-amber-50/50 transition-colors flex flex-col items-center justify-center p-3 text-center cursor-pointer group overflow-hidden"
                      >
                        {newSlideImageUrl ? (
                          <>
                            <img
                              src={newSlideImageUrl}
                              alt="New Slide Preview"
                              className="w-full h-full object-cover rounded"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold transition-opacity">
                              Click to Change Image
                            </div>
                          </>
                        ) : (
                          <div className="space-y-1">
                            <Upload className="w-6 h-6 mx-auto text-amber-600" />
                            <p className="text-xs font-bold text-stone-800">Browse Image File</p>
                            <p className="text-[10px] text-stone-500">JPG, PNG, or WebP</p>
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Or paste image URL..."
                          value={newSlideImageUrl.startsWith('data:') ? '' : newSlideImageUrl}
                          onChange={(e) => setNewSlideImageUrl(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    {/* Slide Text Inputs */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Badge Tag
                        </label>
                        <input
                          type="text"
                          value={newSlideBadge}
                          onChange={(e) => setNewSlideBadge(e.target.value)}
                          placeholder="e.g. RESORT 2026, NEW ARRIVAL"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Category Target
                        </label>
                        <select
                          value={newSlideCategory}
                          onChange={(e) => {
                            setNewSlideCategory(e.target.value);
                            setNewSlideButton1Target(e.target.value);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="Shoes">Shoes</option>
                          <option value="Bags">Bags</option>
                          <option value="High wedges - 3.5 inch">High wedges - 3.5 inch</option>
                          <option value="Higher wedge - 4.25 inch">Higher wedge - 4.25 inch</option>
                          <option value="Low wedges - 2.5 inch">Low wedges - 2.5 inch</option>
                          <option value="Mother of the Bride">Mother of the Bride</option>
                          <option value="Red Carpet Glamour">Red Carpet Glamour</option>
                          <option value="Cruise Ready">Cruise Ready</option>
                          <option value="Just In">Just In</option>
                          <option value="Sale">Sale</option>
                          <option value="All">All Collections</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Headline / Title <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newSlideTitle}
                          onChange={(e) => setNewSlideTitle(e.target.value)}
                          placeholder="e.g. Sunset Promenade"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-800 font-semibold focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Subtitle / Tagline
                        </label>
                        <input
                          type="text"
                          value={newSlideSubtitle}
                          onChange={(e) => setNewSlideSubtitle(e.target.value)}
                          placeholder="e.g. Handcrafted Mediterranean espadrilles and luxury wedges"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Button 1 Text
                        </label>
                        <input
                          type="text"
                          value={newSlideButton1Text}
                          onChange={(e) => setNewSlideButton1Text(e.target.value)}
                          placeholder="e.g. Shop Shoes"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Button 1 Target
                        </label>
                        <input
                          type="text"
                          value={newSlideButton1Target}
                          onChange={(e) => setNewSlideButton1Target(e.target.value)}
                          placeholder="e.g. Shoes"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Paired Shoe Name
                        </label>
                        <input
                          type="text"
                          value={newSlidePairedShoes}
                          onChange={(e) => setNewSlidePairedShoes(e.target.value)}
                          placeholder="e.g. Classic High K Wedge Champagne"
                          className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={newSlideIsVisible}
                            onChange={(e) => setNewSlideIsVisible(e.target.checked)}
                            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-stone-800">
                            Visible in Hero Carousel
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200">
                    <button
                      type="button"
                      onClick={() => setIsAddSlideOpen(false)}
                      className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg shadow cursor-pointer transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Add Slide to Carousel</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Paste or upload text zone */}
              <div className="border border-stone-200 rounded-xl p-4 bg-white shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Paste CSV Content Directly
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Columns: slide_id, order, badge_text, title_text, subtitle_text, button_1_text, button_1_target, button_2_text, etc.
                  </span>
                </div>

                <textarea
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  placeholder={`Paste CSV here, e.g.:\nslide_id,order,badge_text,title_text,subtitle_text,button_1_text,button_1_target\n"slide-01",1,"REGAL HERITAGE","Palace Matriarch","Royal Wedding & Courtyard Elegance","Explore Palace Matriarch","Mother of the Bride"`}
                  rows={4}
                  className="w-full text-xs font-mono p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                />

                <div className="flex items-center justify-end gap-2">
                  {csvInput && (
                    <button
                      onClick={() => setCsvInput('')}
                      className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-800"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => processCsvString(csvInput)}
                    disabled={!csvInput.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-200 disabled:text-stone-400 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Apply Pasted CSV</span>
                  </button>
                </div>
              </div>

              {/* Live In-Table Editor */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      Live In-Browser Slide Editor ({editableSlides.filter((s) => !s.isDeleted).length} slides)
                    </h4>
                    <p className="text-xs text-stone-500">
                      Check or uncheck the "Visible in Hero" checkbox to hide or show any slide in the carousel. You can make it visible later anytime.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Visibility filter tabs */}
                    <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-0.5 text-xs">
                      <button
                        type="button"
                        onClick={() => setVisibilityFilter('all')}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          visibilityFilter === 'all'
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        All ({editableSlides.filter((s) => !s.isDeleted).length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisibilityFilter('visible')}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          visibilityFilter === 'visible'
                            ? 'bg-white text-emerald-800 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        Visible ({editableSlides.filter((s) => !s.isUnavailable && !s.isDeleted).length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisibilityFilter('hidden')}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          visibilityFilter === 'hidden'
                            ? 'bg-white text-amber-800 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        Hidden ({editableSlides.filter((s) => s.isUnavailable && !s.isDeleted).length})
                      </button>
                    </div>

                    <button
                      onClick={() => setIsAddSlideOpen((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Hero Image</span>
                    </button>

                    {hasUnsavedTableEdits && (
                      <button
                        onClick={handleSaveTableEdits}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow transition-all cursor-pointer animate-pulse"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="overflow-x-auto max-h-[440px]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-stone-100 text-stone-700 font-bold sticky top-0 z-10 border-b border-stone-200">
                        <tr>
                          <th className="p-2.5 w-12 text-center">#</th>
                          <th className="p-2.5 w-28 text-center">Visible in Hero</th>
                          <th className="p-2.5 min-w-[130px]">Preview (Hover to Enlarge)</th>
                          <th className="p-2.5 min-w-[130px]">Badge</th>
                          <th className="p-2.5 min-w-[160px]">Title</th>
                          <th className="p-2.5 min-w-[180px]">Subtitle</th>
                          <th className="p-2.5 min-w-[150px]">Button 1 Text</th>
                          <th className="p-2.5 min-w-[130px]">Button 1 Target</th>
                          <th className="p-2.5 min-w-[140px]">Button 2 Text</th>
                          <th className="p-2.5 min-w-[160px]">Paired Shoe</th>
                          <th className="p-2.5 w-16 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {editableSlides
                          .map((slide, origIdx) => ({ slide, origIdx }))
                          .filter(({ slide }) => {
                            if (slide.isDeleted) return false;
                            if (visibilityFilter === 'visible') return !slide.isUnavailable;
                            if (visibilityFilter === 'hidden') return Boolean(slide.isUnavailable);
                            return true;
                          })
                          .map(({ slide, origIdx }) => (
                          <tr
                            key={slide.id}
                            className={`transition-colors ${
                              slide.isUnavailable
                                ? 'bg-stone-50/70 hover:bg-stone-100 opacity-70'
                                : 'hover:bg-stone-50/80'
                            }`}
                          >
                            <td className="p-2.5 text-center font-mono text-stone-500 font-semibold">
                              {slide.order}
                            </td>
                            {/* Visible in Hero checkbox */}
                            <td className="p-2.5 text-center">
                              <label className="inline-flex flex-col items-center justify-center gap-1 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={!slide.isUnavailable}
                                  onChange={() => handleToggleSlideVisibility(slide.id, !slide.isUnavailable)}
                                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 cursor-pointer"
                                  title={!slide.isUnavailable ? 'Click to hide from hero carousel' : 'Click to show in hero carousel'}
                                />
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase ${
                                    !slide.isUnavailable
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-stone-200 text-stone-600'
                                  }`}
                                >
                                  {!slide.isUnavailable ? 'Visible' : 'Hidden'}
                                </span>
                              </label>
                            </td>
                            <td className="p-2.5">
                              <div className="relative group/thumb flex items-center">
                                {/* Base thumbnail */}
                                <div
                                  onClick={() =>
                                    setPreviewModalImage({
                                      url: slide.imageUrl,
                                      title: slide.title || `Hero Slide #${slide.order}`,
                                      filename: slide.cleanFilename,
                                    })
                                  }
                                  className="relative w-28 h-18 sm:w-32 sm:h-20 rounded-lg bg-stone-100 overflow-hidden border border-stone-300 shrink-0 shadow-xs cursor-zoom-in transition-all duration-300 group-hover/thumb:border-amber-500 group-hover/thumb:shadow-md group-hover/thumb:scale-105"
                                  title="Click to view full photo, or hover to enlarge"
                                >
                                  <img
                                    src={slide.imageUrl}
                                    alt={slide.cleanFilename}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                  {slide.isCustomImage && (
                                    <span
                                      className="absolute bottom-0 right-0 px-1.5 py-0.5 bg-amber-600 text-white text-[9px] font-bold rounded-tl"
                                      title="Custom uploaded image"
                                    >
                                      Custom
                                    </span>
                                  )}
                                  {slide.isUnavailable && (
                                    <span className="absolute top-0 left-0 right-0 py-0.5 bg-stone-900/80 text-amber-300 text-[9px] font-bold text-center">
                                      Hidden
                                    </span>
                                  )}
                                  <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/25 transition-colors flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-white opacity-0 group-hover/thumb:opacity-100 drop-shadow-md transition-opacity" />
                                  </div>
                                </div>

                                {/* Floating Hover Zoom Card */}
                                <div className="hidden group-hover/thumb:flex fixed bottom-10 right-10 z-[9999] pointer-events-none p-3 bg-stone-950/95 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-700/80 flex-col gap-2 w-80 sm:w-96 animate-in fade-in zoom-in-95 duration-150">
                                  <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
                                    <img
                                      src={slide.imageUrl}
                                      alt={slide.cleanFilename}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 text-white text-[11px] font-mono font-bold backdrop-blur-xs">
                                      Slide #{slide.order}
                                    </div>
                                  </div>
                                  <div className="px-1 space-y-0.5">
                                    <div className="text-white text-xs font-bold truncate">
                                      {slide.title || 'Hero Slide'}
                                    </div>
                                    <div className="text-amber-300 text-[10px] font-mono truncate">
                                      {slide.cleanFilename}
                                    </div>
                                    <div className="text-stone-400 text-[10px] italic">
                                      Click thumbnail to inspect full high-resolution image
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={slide.badge}
                                onChange={(e) => handleTableChange(origIdx, 'badge', e.target.value)}
                                className="w-full px-2 py-1 bg-stone-50 border border-stone-200 rounded text-stone-800 font-semibold text-[11px] focus:bg-white focus:ring-1 focus:ring-stone-800"
                              />
                            </td>
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={slide.title}
                                onChange={(e) => handleTableChange(origIdx, 'title', e.target.value)}
                                className="w-full px-2 py-1 bg-stone-50 border border-stone-200 rounded text-stone-900 font-medium text-xs focus:bg-white focus:ring-1 focus:ring-stone-800"
                              />
                            </td>
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={slide.subtitle}
                                onChange={(e) => handleTableChange(origIdx, 'subtitle', e.target.value)}
                                className="w-full px-2 py-1 bg-stone-50 border border-stone-200 rounded text-stone-700 text-xs focus:bg-white focus:ring-1 focus:ring-stone-800"
                              />
                            </td>
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={slide.button1Text}
                                onChange={(e) => handleTableChange(origIdx, 'button1Text', e.target.value)}
                                className="w-full px-2 py-1 bg-stone-50 border border-stone-200 rounded text-stone-800 text-xs focus:bg-white focus:ring-1 focus:ring-stone-800"
                              />
                            </td>
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={slide.button1Target}
                                onChange={(e) => handleTableChange(origIdx, 'button1Target', e.target.value)}
                                className="w-full px-2 py-1 bg-stone-50 border border-stone-200 rounded text-stone-800 text-xs focus:bg-white focus:ring-1 focus:ring-stone-800"
                              />
                            </td>
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={slide.button2Text}
                                onChange={(e) => handleTableChange(origIdx, 'button2Text', e.target.value)}
                                className="w-full px-2 py-1 bg-stone-50 border border-stone-200 rounded text-stone-800 text-xs focus:bg-white focus:ring-1 focus:ring-stone-800"
                              />
                            </td>
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={slide.pairedShoes}
                                onChange={(e) => handleTableChange(origIdx, 'pairedShoes', e.target.value)}
                                className="w-full px-2 py-1 bg-stone-50 border border-stone-200 rounded text-stone-800 text-xs focus:bg-white focus:ring-1 focus:ring-stone-800"
                              />
                            </td>
                            <td className="p-2.5 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleToggleSlideVisibility(slide.id, !slide.isUnavailable)}
                                  className={`p-1.5 rounded transition-colors ${
                                    !slide.isUnavailable
                                      ? 'text-emerald-700 hover:bg-emerald-50'
                                      : 'text-stone-400 hover:bg-stone-100'
                                  }`}
                                  title={!slide.isUnavailable ? 'Hide from hero carousel' : 'Show in hero carousel'}
                                >
                                  {!slide.isUnavailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                                {slide.isCustomImage && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSlide(slide.id, slide.title)}
                                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                                    title="Delete custom slide"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {hasUnsavedTableEdits && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSaveTableEdits}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save Table Changes to Live Carousel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: REPLACE IMAGES (BATCH / SEPARATELY) */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              {/* Top Batch Uploader ("All Images at Once") */}
              <div className="p-6 border-2 border-dashed border-stone-300 rounded-xl bg-stone-50/70 hover:bg-stone-50 transition-colors text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Upload All Hero Images at Once
                  </h3>
                  <p className="text-xs text-stone-600 max-w-lg mx-auto mt-1">
                    Select multiple image files or drag and drop your image folder here. Files are automatically matched to slides by number prefix (e.g. <span className="font-mono font-bold">01_...</span>, <span className="font-mono font-bold">02_...</span>) or filename!
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => multiFileInputRef.current?.click()}
                    disabled={isProcessingBatch}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>{isProcessingBatch ? 'Reading Files...' : 'Browse & Select Multiple Images'}</span>
                  </button>

                  <button
                    onClick={async () => {
                      setIsDownloadingZip(true);
                      await downloadAllHeroImagesZip();
                      setIsDownloadingZip(false);
                    }}
                    disabled={isDownloadingZip}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    title="Download all original hero images in a zip archive"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isDownloadingZip ? 'Downloading ZIP...' : 'Download All Images (.ZIP)'}</span>
                  </button>
                </div>
              </div>

              {/* Batch Files Preview Bar */}
              {batchFiles.length > 0 && (
                <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-amber-600" />
                      {batchFiles.length} Images Selected for Batch Replacement
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBatchFiles([])}
                        className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleApplyBatchImages}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow transition-colors cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Apply {batchFiles.filter((f) => f.matchedId).length} Matched Images</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-56 overflow-y-auto p-1">
                    {batchFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-white rounded-lg border border-amber-200 shadow-xs flex flex-col space-y-1.5"
                      >
                        <div className="relative aspect-video rounded overflow-hidden bg-stone-100">
                          <img src={file.dataUrl} alt={file.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] font-mono truncate text-stone-700" title={file.name}>
                          {file.name}
                        </span>
                        <select
                          value={file.matchedId || ''}
                          onChange={(e) => {
                            const newMatchedId = e.target.value || undefined;
                            setBatchFiles((prev) => {
                              const copy = [...prev];
                              copy[idx].matchedId = newMatchedId;
                              return copy;
                            });
                          }}
                          className="text-[10px] bg-stone-50 border border-stone-200 rounded p-1"
                        >
                          <option value="">-- Assign Slide --</option>
                          {heroSlides.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.order}. {s.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Individual Image Replacement Grid ("Separately") */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      Replace Images Separately (Slide by Slide)
                    </h4>
                    <p className="text-xs text-stone-500">
                      Click "Replace Image" to upload a new photo, or use the checkbox to show/hide any slide in the hero section.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('csv');
                      setIsAddSlideOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Hero Image</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {heroSlides.filter((s) => !s.isDeleted).map((slide) => (
                    <div
                      key={slide.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                        slide.isUnavailable
                          ? 'border-stone-200 bg-stone-50/70 opacity-75'
                          : slide.isCustomImage
                          ? 'border-amber-400 bg-amber-50/20 shadow-sm'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="space-y-2">
                        <div
                          onClick={() =>
                            setPreviewModalImage({
                              url: slide.imageUrl,
                              title: slide.title || `Slide #${slide.order}`,
                              filename: slide.isCustomImage ? `File: ${slide.customImageName}` : slide.cleanFilename,
                            })
                          }
                          className="relative aspect-16/10 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 group cursor-zoom-in transition-all"
                          title="Click to view full photo or hover to enlarge"
                        >
                          <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                            Slide {slide.order}
                          </div>
                          {slide.isCustomImage && (
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold shadow-xs">
                              Custom Image
                            </div>
                          )}
                          {slide.isUnavailable && (
                            <div className="absolute top-2 left-20 px-2 py-0.5 rounded-full bg-stone-900/90 text-amber-300 text-[10px] font-bold shadow-xs">
                              Hidden from Hero
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 drop-shadow-md transition-opacity" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                              {slide.badge}
                            </span>
                          </div>
                          <h5 className="text-xs font-bold text-stone-900 truncate">
                            {slide.title}
                          </h5>
                          <p className="text-[11px] text-stone-500 line-clamp-1">
                            {slide.subtitle}
                          </p>
                          <span className="text-[10px] font-mono text-stone-400 block mt-1 truncate" title={slide.cleanFilename}>
                            {slide.isCustomImage ? `File: ${slide.customImageName}` : slide.cleanFilename}
                          </span>
                        </div>

                        {/* Visibility Checkbox & Status */}
                        <div className="flex items-center justify-between py-1.5 px-2 bg-stone-50 rounded-lg border border-stone-200/80">
                          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={!slide.isUnavailable}
                              onChange={() => handleToggleSlideVisibility(slide.id, !slide.isUnavailable)}
                              className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500 border-stone-300 cursor-pointer"
                            />
                            <span className="text-[11px] font-medium text-stone-700">
                              {!slide.isUnavailable ? 'Visible in Hero' : 'Hidden in Hero'}
                            </span>
                          </label>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                              !slide.isUnavailable
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {!slide.isUnavailable ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleSingleImageTrigger(slide.id)}
                          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Replace Image</span>
                        </button>

                        {slide.isCustomImage ? (
                          <button
                            onClick={() => handleRemoveCustomImage(slide.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Revert to original default image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <a
                            href={slide.imageUrl}
                            download={slide.cleanFilename}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                            title="Download original image template"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS CSV (STOFFA.COM) */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                    <span>Stoffa Style Products Sync</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-200/60 text-blue-800 text-[11px] font-mono">
                      106 Products Pulled
                    </span>
                  </h3>
                  <p className="text-xs text-blue-800 mt-0.5">
                    Live products extracted from stoffastyle.com with handles, INR prices, USD calculated prices, variants, and product images.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => handleDownloadProductsCsv('stoffastyle_products.csv')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download stoffastyle_products.csv</span>
                  </button>

                  <button
                    onClick={() => handleDownloadProductsCsv('accesoire_catalog.csv')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-stone-600" />
                    <span>Download accesoire_catalog.csv</span>
                  </button>
                </div>
              </div>

              {/* Products Table Preview */}
              <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">
                    Product Catalog Preview ({products.length} Products Loaded in App)
                  </span>
                  <a
                    href="https://stoffastyle.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-700 hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>Visit stoffastyle.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="overflow-x-auto max-h-[440px]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-stone-100 text-stone-700 font-bold sticky top-0 z-10 border-b border-stone-200">
                      <tr>
                        <th className="p-2.5 w-12 text-center">#</th>
                        <th className="p-2.5 w-16">Image</th>
                        <th className="p-2.5 min-w-[200px]">Title</th>
                        <th className="p-2.5 min-w-[120px]">Category</th>
                        <th className="p-2.5 min-w-[90px]">Price (USD)</th>
                        <th className="p-2.5 min-w-[160px]">Handle</th>
                        <th className="p-2.5 w-20 text-center">Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {products.map((prod, idx) => (
                        <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                          <td className="p-2.5 text-center font-mono text-stone-400">
                            {idx + 1}
                          </td>
                          <td className="p-2.5">
                            <div
                              onClick={() =>
                                setPreviewModalImage({
                                  url: prod.images?.[0] || '',
                                  title: prod.title,
                                  filename: `Product ID: ${prod.id}`,
                                })
                              }
                              className="w-14 h-14 rounded-lg bg-stone-100 overflow-hidden border border-stone-300 shrink-0 cursor-zoom-in group/prod transition-all shadow-2xs hover:border-amber-500"
                              title="Click to view product image"
                            >
                              <img
                                src={prod.images?.[0] || ''}
                                alt={prod.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover/prod:scale-110"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                          </td>
                          <td className="p-2.5 font-medium text-stone-900">
                            {prod.title}
                          </td>
                          <td className="p-2.5 text-stone-600">
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 text-[11px]">
                              {prod.category}
                            </span>
                          </td>
                          <td className="p-2.5 font-bold font-mono text-stone-950">
                            ${Math.round(prod.priceUSD || 0)}
                          </td>
                          <td className="p-2.5 font-mono text-[11px] text-stone-500 truncate max-w-[180px]">
                            {prod.id}
                          </td>
                          <td className="p-2.5 text-center">
                            <a
                              href={`https://stoffastyle.com/products/${prod.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-stone-400 hover:text-stone-900 inline-flex p-1"
                              title="Open product on stoffastyle.com"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FOLDER & URL GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-6 text-sm">
              <div className="p-4 bg-stone-100 rounded-xl border border-stone-300 space-y-2">
                <h3 className="font-bold text-stone-950 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-stone-700" />
                  <span>How to Edit Content & Replace Files for this AI Studio URL</span>
                </h3>
                <p className="text-xs text-stone-700">
                  You asked: <span className="font-mono bg-stone-200 px-1 py-0.5 rounded">https://aistudio.google.com/u/0/apps/5d23fe5d-2fcc-4621-bfbd-f5c29ec6e21f... to edit content of this url?</span>
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Yes! This exact environment is connected directly to that AI Studio workspace. All changes you make through the CSV tools, the in-app image uploader, or direct file replacement are compiled into the application preview in real-time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-stone-900 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <span>Method 1: In-App CSV & Image Uploader</span>
                  </h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                    <li>
                      <strong>Download Hero CSV:</strong> Click "Download Hero CSV" on Tab 1 to get <span className="font-mono">hero_images_catalog.csv</span>.
                    </li>
                    <li>
                      <strong>Edit in Excel / Sheets:</strong> Change headlines, subtitles, badges, button texts, button targets, or suggested shoes/bags.
                    </li>
                    <li>
                      <strong>Upload Edited CSV:</strong> Click "Upload Edited CSV" or paste into the box. All slides update instantly!
                    </li>
                    <li>
                      <strong>Upload Images (Batch or Separately):</strong> On Tab 2, drag all your replacement images at once, or replace individual slides one by one.
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-stone-900 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <span>Method 2: Direct In-Folder Replacement</span>
                  </h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                    <li>
                      <strong>Images folder:</strong> Replace images in <span className="font-mono font-bold">src/assets/images/</span> or <span className="font-mono font-bold">public/hero_images/</span>.
                    </li>
                    <li>
                      <strong>Naming convention:</strong> Keep filenames matching the <span className="font-mono">clean_filename</span> column (e.g. <span className="font-mono">01_Palace_Matriarch_Indian_Model.jpg</span>) or <span className="font-mono">raw_filename</span>.
                    </li>
                    <li>
                      <strong>Products CSV:</strong> Located at <span className="font-mono">public/stoffastyle_products.csv</span> and <span className="font-mono">public/accesoire_catalog.csv</span>.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Filename Mapping Reference Table */}
              <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm space-y-2">
                <div className="px-4 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">
                    28 Hero Slide Filename Reference Table
                  </span>
                  <span className="text-[11px] text-stone-500 font-mono">
                    Matches CSV clean_filename & raw_filename
                  </span>
                </div>
                <div className="overflow-x-auto max-h-[300px]">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead className="bg-stone-100 text-stone-700 font-bold sticky top-0 border-b border-stone-200">
                      <tr>
                        <th className="p-2 w-10 text-center">#</th>
                        <th className="p-2">Title</th>
                        <th className="p-2">Clean Filename</th>
                        <th className="p-2">Raw Filename in src/assets/images/</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {heroSlides.map((s) => (
                        <tr key={s.id} className="hover:bg-stone-50">
                          <td className="p-2 text-center font-mono font-semibold">{s.order}</td>
                          <td className="p-2 font-medium text-stone-900">{s.title}</td>
                          <td className="p-2 font-mono text-amber-900">{s.cleanFilename}</td>
                          <td className="p-2 font-mono text-stone-500">{s.rawFilename}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <span className="font-semibold">{heroSlides.length} slides loaded</span>
            <span>&bull;</span>
            <span>All edits persist in local browser storage</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadHeroCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Download CSV</span>
            </button>
            <button
              onClick={() => setIsHeroCsvModalOpen(false)}
              className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {/* High-Resolution Full Photo Lightbox Inspector */}
      {previewModalImage && (
        <div
          className="fixed inset-0 z-[10000] bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setPreviewModalImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700/80 p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between text-white border-b border-stone-800 pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                  {previewModalImage.title}
                </h3>
                <p className="text-xs text-amber-300 font-mono mt-0.5">
                  {previewModalImage.filename}
                </p>
              </div>
              <button
                onClick={() => setPreviewModalImage(null)}
                className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="Close image inspector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[68vh] flex items-center justify-center overflow-hidden rounded-xl bg-black/50 border border-stone-800">
              <img
                src={previewModalImage.url}
                alt={previewModalImage.title}
                className="max-h-[68vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-stone-400">
                Official editorial campaign photograph • High-resolution preview
              </span>
              <button
                onClick={() => setPreviewModalImage(null)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
