import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Link as LinkIcon,
  Check,
  Search,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import { AVAILABLE_LOCAL_ASSETS, LocalImageAsset } from '../../services/productImageMatcher';

interface CollectionImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageUrl: string;
  collectionTitle: string;
  onSelectImage: (imageUrl: string) => void;
}

export const CollectionImagePickerModal: React.FC<CollectionImagePickerModalProps> = ({
  isOpen,
  onClose,
  currentImageUrl,
  collectionTitle,
  onSelectImage,
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'upload' | 'url'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAssetUrl, setSelectedAssetUrl] = useState<string>(currentImageUrl);

  // Custom URL State
  const [customUrl, setCustomUrl] = useState('');
  const [urlPreviewValid, setUrlPreviewValid] = useState<boolean | null>(null);

  // File Upload State
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Categories from available assets
  const categories = [
    'All',
    'Higher Wedges',
    'Weddings & Celebrations',
    'Black-Tie Gala',
    'Resort & Cocktail',
    'Shoes & Wedges',
    'Bags & Potlis',
  ];

  const filteredAssets = AVAILABLE_LOCAL_ASSETS.filter((asset: LocalImageAsset) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      asset.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Higher Wedges' &&
        (asset.tag === 'Couture' || asset.label.toLowerCase().includes('wedge')));

    const matchesSearch =
      !searchQuery.trim() ||
      asset.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tag.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Handle local file upload
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WebP).');
      return;
    }
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setUploadedImageUrl(result);
        setSelectedAssetUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    if (activeTab === 'url' && customUrl.trim()) {
      onSelectImage(customUrl.trim());
    } else if (activeTab === 'upload' && uploadedImageUrl) {
      onSelectImage(uploadedImageUrl);
    } else if (selectedAssetUrl) {
      onSelectImage(selectedAssetUrl);
    }
    onClose();
  };

  return (
    <div
      id="collection-image-picker-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="collection-image-picker-dialog"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-stone-100"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                Change Collection Image
              </h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Editing visual asset for:{' '}
              <span className="text-amber-300 font-semibold">{collectionTitle || 'Collection'}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-stone-800 px-5 pt-3 bg-stone-950/40 gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('browse')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'browse'
                ? 'border-amber-400 text-amber-300 bg-stone-800/40 rounded-t-lg'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Browse Photography Assets ({AVAILABLE_LOCAL_ASSETS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'border-amber-400 text-amber-300 bg-stone-800/40 rounded-t-lg'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload from Computer / Folder</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'border-amber-400 text-amber-300 bg-stone-800/40 rounded-t-lg'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Custom Image URL</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: BROWSE LOCAL ASSETS */}
          {activeTab === 'browse' && (
            <div className="space-y-4">
              {/* Search & Categories */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by occasion, style, wedge, filename..."
                    className="w-full bg-stone-800/90 border border-stone-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredAssets.map((asset) => {
                  const isSelected = selectedAssetUrl === asset.url;
                  return (
                    <div
                      key={asset.url}
                      onClick={() => setSelectedAssetUrl(asset.url)}
                      className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-[4/5] bg-stone-800 flex flex-col justify-end ${
                        isSelected
                          ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.35)] scale-[1.02]'
                          : 'border-stone-700/80 hover:border-stone-500'
                      }`}
                    >
                      <img
                        src={asset.url}
                        alt={asset.label}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent pointer-events-none" />

                      {/* Selection Checkmark */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Tag Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="px-1.5 py-0.5 rounded-sm bg-black/70 backdrop-blur-xs text-[10px] font-mono text-amber-300 border border-amber-400/30">
                          {asset.tag}
                        </span>
                      </div>

                      {/* Asset Details */}
                      <div className="relative z-10 p-2.5">
                        <p className="text-xs font-semibold text-white truncate drop-shadow-sm">
                          {asset.label}
                        </p>
                        <p className="text-[10px] text-stone-300 truncate font-mono mt-0.5">
                          {asset.filename}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredAssets.length === 0 && (
                <div className="py-12 text-center text-stone-400">
                  <p>No photography assets match "{searchQuery}".</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-2 text-xs text-amber-400 underline"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: UPLOAD FROM COMPUTER */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileChange(file);
                }}
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileChange(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-stone-700 hover:border-amber-400/70 bg-stone-800/40 hover:bg-stone-800/80'
                }`}
              >
                <Upload className="w-10 h-10 text-amber-400 mb-3" />
                <p className="text-sm font-bold text-white">
                  Drag & Drop collection photography here, or{' '}
                  <span className="text-amber-400 underline">browse files</span>
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Supports high-resolution JPEG, PNG, WebP (stored directly in app storage)
                </p>
              </div>

              {uploadedImageUrl && (
                <div className="p-4 bg-stone-800/90 border border-stone-700 rounded-xl flex items-center gap-4">
                  <div className="w-24 h-28 rounded-lg overflow-hidden border border-amber-400/60 shrink-0">
                    <img
                      src={uploadedImageUrl}
                      alt="Uploaded Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded-sm bg-emerald-900/60 text-emerald-300 text-[10px] font-mono font-bold mb-1">
                      Ready to apply
                    </span>
                    <p className="text-sm font-semibold text-white truncate">{uploadedFileName}</p>
                    <p className="text-xs text-stone-400 mt-1">
                      High resolution base64 image data loaded. Click "Apply Selected Image" below to save to this card.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM URL */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Direct Image Web URL (HTTPS)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      setUrlPreviewValid(null);
                    }}
                    placeholder="https://images.unsplash.com/... or CDN link"
                    className="flex-1 bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customUrl.trim()) {
                        setSelectedAssetUrl(customUrl.trim());
                      }
                    }}
                    className="px-4 py-2.5 bg-stone-700 hover:bg-stone-600 rounded-xl text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    Test Preview
                  </button>
                </div>
              </div>

              {customUrl && (
                <div className="p-4 bg-stone-800/90 border border-stone-700 rounded-xl flex items-center gap-4">
                  <div className="w-24 h-28 rounded-lg overflow-hidden border border-stone-600 shrink-0 bg-stone-950 flex items-center justify-center">
                    <img
                      src={customUrl}
                      alt="URL Preview"
                      onError={() => setUrlPreviewValid(false)}
                      onLoad={() => {
                        setUrlPreviewValid(true);
                        setSelectedAssetUrl(customUrl);
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    {urlPreviewValid === true && (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Valid image URL loaded
                      </span>
                    )}
                    {urlPreviewValid === false && (
                      <span className="text-xs font-semibold text-rose-400">
                        Unable to load image from this URL. Check format or CORS restrictions.
                      </span>
                    )}
                    <p className="text-xs text-stone-400 mt-1 break-all">{customUrl}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with Preview & Apply Button */}
        <div className="px-5 py-3.5 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-12 rounded-md overflow-hidden border border-stone-700 shrink-0">
              <img
                src={selectedAssetUrl || currentImageUrl}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block text-xs">
              <span className="text-stone-400">Selected: </span>
              <span className="text-white font-mono truncate max-w-[220px] inline-block align-bottom">
                {selectedAssetUrl ? 'New image selected' : 'Current image'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-white hover:bg-stone-800 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Apply Selected Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
