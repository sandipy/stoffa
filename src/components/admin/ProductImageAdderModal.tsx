import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Folder,
  Upload,
  Link2,
  Check,
  Plus,
  Search,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';
import { Product, ProductAngle } from '../../types';
import {
  findMatchingImagesForProduct,
  MatchedImageResult,
  AVAILABLE_LOCAL_ASSETS,
  LocalImageAsset,
  processUploadedImageFiles,
} from '../../services/productImageMatcher';

interface ProductImageAdderModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddAngles: (newAngles: ProductAngle[]) => void;
}

export const ProductImageAdderModal: React.FC<ProductImageAdderModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddAngles,
}) => {
  const [activeTab, setActiveTab] = useState<'match' | 'browse' | 'upload' | 'url'>('match');
  const [matchedImages, setMatchedImages] = useState<MatchedImageResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [urlInput, setUrlInput] = useState('');
  const [urlLabel, setUrlLabel] = useState('');
  const [urlPreviewError, setUrlPreviewError] = useState(false);
  const [addedUrls, setAddedUrls] = useState<Set<string>>(new Set());
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedAngles, setUploadedAngles] = useState<ProductAngle[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && product) {
      const matches = findMatchingImagesForProduct(product);
      setMatchedImages(matches);
      setAddedUrls(new Set());
      setUploadedAngles([]);
      setUrlInput('');
      setUrlLabel('');
      setUrlPreviewError(false);
      // If matches exist, default to match tab, otherwise browse
      if (matches.length > 0) {
        setActiveTab('match');
      } else {
        setActiveTab('browse');
      }
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleAddSingleAngle = (angle: ProductAngle) => {
    onAddAngles([angle]);
    setAddedUrls((prev) => new Set(prev).add(angle.url));
  };

  const handleAddAllMatches = () => {
    const newAngles: ProductAngle[] = matchedImages
      .filter((m) => !addedUrls.has(m.asset.url))
      .map((m) => ({
        url: m.asset.url,
        label: m.asset.label,
        tag: 'Auto-Matched',
        isAiImage: false,
      }));

    if (newAngles.length > 0) {
      onAddAngles(newAngles);
      const newSet = new Set(addedUrls);
      newAngles.forEach((a) => newSet.add(a.url));
      setAddedUrls(newSet);
    }
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const angle: ProductAngle = {
      url: urlInput.trim(),
      label: urlLabel.trim() || 'Custom Angle',
      tag: 'Custom',
      isAiImage: false,
    };

    onAddAngles([angle]);
    setAddedUrls((prev) => new Set(prev).add(angle.url));
    setUrlInput('');
    setUrlLabel('');
  };

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const angles = await processUploadedImageFiles(files, product);
      setUploadedAngles((prev) => [...prev, ...angles]);
    } catch (err) {
      console.error('Error reading files:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddAllUploaded = () => {
    if (uploadedAngles.length === 0) return;
    onAddAngles(uploadedAngles);
    const newSet = new Set(addedUrls);
    uploadedAngles.forEach((a) => newSet.add(a.url));
    setAddedUrls(newSet);
    setUploadedAngles([]);
  };

  // Filter local assets for "Browse Folder" tab
  const categories = ['All', 'Wedges & Shoes', 'Bags & Potlis', 'Couture & Editorial', 'Casual Luxury'];
  const filteredAssets = AVAILABLE_LOCAL_ASSETS.filter((a) => {
    const matchesCat =
      selectedCategory === 'All' ||
      a.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Couture & Editorial' && (a.category.includes('Editorial') || a.category.includes('Gala') || a.category.includes('Bridal')));
    const matchesSearch =
      !searchQuery.trim() ||
      a.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fcfaf7] border border-[#e2d8c3] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#f7f2ea] to-[#efe6d5] border-b border-[#e2d8c3] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-800 text-amber-50">
                <ImageIcon className="w-4 h-4" />
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Add Images to Vertical Gallery
              </h3>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Adding views for: <span className="font-semibold text-stone-900">{product.title}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-white/80 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 py-2.5 bg-white border-b border-stone-200 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('match')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'match'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-Match Names ({matchedImages.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('browse')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'browse'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>Browse Assets Folder</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload from Folder / PC</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'url'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Paste URL</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5">
          
          {/* TAB 1: AUTO-MATCH NAMES & ADD FROM FOLDER */}
          {activeTab === 'match' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start justify-between gap-4">
                <div className="text-xs text-amber-950 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    Automated Name & SKU Matcher
                  </p>
                  <p className="text-stone-600">
                    Scans public project folders for filenames matching SKU codes, colors, and keywords for this product.
                  </p>
                </div>

                {matchedImages.length > 0 && (
                  <button
                    onClick={handleAddAllMatches}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add All Matched</span>
                  </button>
                )}
              </div>

              {matchedImages.length === 0 ? (
                <div className="py-12 text-center text-stone-500 space-y-2">
                  <Folder className="w-10 h-10 mx-auto text-stone-400" />
                  <p className="text-sm font-semibold">No direct name matches found in project folder.</p>
                  <p className="text-xs text-stone-400">
                    Switch to &ldquo;Browse Assets Folder&rdquo; or &ldquo;Upload from Folder / PC&rdquo; to add custom views.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {matchedImages.map((m, idx) => {
                    const isAdded = addedUrls.has(m.asset.url);
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                          isAdded
                            ? 'bg-emerald-50/80 border-emerald-300'
                            : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-sm'
                        }`}
                      >
                        <div className="w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center p-1">
                          <img
                            src={m.asset.url}
                            alt={m.asset.label}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            {m.matchReason}
                          </span>
                          <p className="text-xs font-bold text-stone-900 truncate font-mono">
                            {m.asset.filename}
                          </p>
                          <p className="text-[11px] text-stone-600 line-clamp-1">
                            {m.asset.label}
                          </p>

                          <button
                            onClick={() =>
                              handleAddSingleAngle({
                                url: m.asset.url,
                                label: m.asset.label,
                                tag: 'Matched',
                                isAiImage: false,
                              })
                            }
                            disabled={isAdded}
                            className={`mt-1 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-600 text-white cursor-default'
                                : 'bg-stone-900 hover:bg-black text-white'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Add to Gallery</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BROWSE LOCAL PROJECT ASSETS */}
          {activeTab === 'browse' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search folder images..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        selectedCategory === cat
                          ? 'bg-amber-800 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredAssets.map((asset, idx) => {
                  const isAdded = addedUrls.has(asset.url);
                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded-xl border flex flex-col justify-between transition-all ${
                        isAdded
                          ? 'bg-emerald-50/60 border-emerald-300'
                          : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center p-1 relative mb-2">
                        <img
                          src={asset.url}
                          alt={asset.label}
                          className="max-w-full max-h-full object-contain"
                        />
                        {isAdded && (
                          <span className="absolute top-1.5 right-1.5 p-1 rounded-full bg-emerald-600 text-white shadow-xs">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <p className="text-[11px] font-bold text-stone-900 truncate font-mono" title={asset.filename}>
                          {asset.filename}
                        </p>
                        <p className="text-[10px] text-stone-500 line-clamp-1">
                          {asset.label}
                        </p>
                        <button
                          onClick={() =>
                            handleAddSingleAngle({
                              url: asset.url,
                              label: asset.label,
                              tag: asset.tag || 'Gallery',
                              isAiImage: false,
                            })
                          }
                          disabled={isAdded}
                          className={`w-full py-1 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-100 text-emerald-800 cursor-default'
                              : 'bg-stone-900 hover:bg-black text-white'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Add View</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: UPLOAD FROM COMPUTER / FOLDER */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-2xl bg-white hover:bg-stone-50/50 flex flex-col items-center justify-center text-center cursor-pointer transition-all"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFilesSelected}
                />
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">
                  Choose Images or Select from Folder
                </h4>
                <p className="text-xs text-stone-500 max-w-sm">
                  Drag and drop local photo files or click to browse. Files matching the product SKU/name will be auto-tagged.
                </p>
                {isUploading && (
                  <p className="text-xs text-amber-700 font-semibold mt-3 animate-pulse">
                    Processing image files...
                  </p>
                )}
              </div>

              {/* Preview of Uploaded Angles */}
              {uploadedAngles.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 font-mono">
                      {uploadedAngles.length} file(s) ready to add
                    </span>
                    <button
                      onClick={handleAddAllUploaded}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Add All Uploaded to Gallery</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {uploadedAngles.map((ang, i) => (
                      <div key={i} className="p-2 rounded-xl bg-white border border-stone-200 space-y-1">
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-stone-100 flex items-center justify-center p-1">
                          <img src={ang.url} alt={ang.label} className="max-w-full max-h-full object-contain" />
                        </div>
                        <p className="text-[11px] font-mono font-bold truncate text-stone-900">{ang.label}</p>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-900 font-bold">
                          {ang.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PASTE IMAGE URL */}
          {activeTab === 'url' && (
            <form onSubmit={handleAddUrl} className="space-y-4 max-w-lg mx-auto py-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setUrlPreviewError(false);
                  }}
                  placeholder="https://cdn.shopify.com/... or /STB191SILVER_1.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Angle Label (Optional)
                </label>
                <input
                  type="text"
                  value={urlLabel}
                  onChange={(e) => setUrlLabel(e.target.value)}
                  placeholder="e.g. Lateral Profile / In-Sole Detail"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                />
              </div>

              {urlInput.trim() && (
                <div className="p-3 rounded-xl bg-white border border-stone-200 flex items-center gap-3">
                  <div className="w-16 h-20 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center p-1 shrink-0">
                    {!urlPreviewError ? (
                      <img
                        src={urlInput}
                        alt="Preview"
                        onError={() => setUrlPreviewError(true)}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] text-red-500 text-center">Invalid Image</span>
                    )}
                  </div>
                  <div className="text-xs text-stone-600">
                    <p className="font-bold text-stone-900">Live URL Preview</p>
                    <p className="text-[11px] truncate max-w-xs">{urlInput}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!urlInput.trim() || urlPreviewError}
                className="w-full py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Image to Product Gallery</span>
              </button>
            </form>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-stone-100/80 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-600">
            {addedUrls.size > 0 ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {addedUrls.size} new image(s) added to vertical gallery!
              </span>
            ) : (
              'Images will appear immediately in the left vertical column.'
            )}
          </span>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
