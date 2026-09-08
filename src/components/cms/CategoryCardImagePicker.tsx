import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Check,
  RotateCcw,
  Link,
  Sparkles,
  ChevronDown,
  Search,
  Eye,
} from 'lucide-react';
import { ALL_MEDIA_IMAGES, MEDIA_CATEGORIES, MediaImageItem } from '../../data/allMediaImages';

interface CategoryCardImagePickerProps {
  cardKey: 'shoes' | 'bags' | 'sale' | 'ready';
  currentImageUrl?: string;
  onSelectImage: (url: string) => void;
  defaultFallbackLabel?: string;
}

export const CategoryCardImagePicker: React.FC<CategoryCardImagePickerProps> = ({
  cardKey,
  currentImageUrl,
  onSelectImage,
  defaultFallbackLabel = 'Dynamic Curated Pool',
}) => {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Images');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customUrlInput, setCustomUrlInput] = useState(currentImageUrl || '');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter all 135+ images by category & search query
  const filteredImages = ALL_MEDIA_IMAGES.filter((img) => {
    const matchesCategory =
      selectedCategory === 'All Images' || img.category === selectedCategory;

    const matchesSearch =
      !searchQuery.trim() ||
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (img.tags && img.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size should be under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onSelectImage(reader.result);
        setCustomUrlInput(reader.result);
        setUploadError(null);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (customUrlInput.trim()) {
      onSelectImage(customUrlInput.trim());
    }
  };

  const handleResetToDefault = () => {
    onSelectImage('');
    setCustomUrlInput('');
  };

  return (
    <div className="space-y-3 pt-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 font-semibold flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>Card Background Image</span>
        </label>
        {currentImageUrl ? (
          <button
            type="button"
            onClick={handleResetToDefault}
            className="text-xs text-stone-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Random Pool</span>
          </button>
        ) : (
          <span className="text-xs text-amber-400/90 font-mono italic">
            Using: {defaultFallbackLabel}
          </span>
        )}
      </div>

      {/* Current Preview Thumbnail & Actions with Increased Size */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-stone-900/90 rounded-xl border border-stone-800">
        <div className="w-full sm:w-28 h-24 rounded-lg bg-stone-950 border border-stone-700 overflow-hidden shrink-0 relative flex items-center justify-center">
          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt="Card Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-2">
              <Sparkles className="w-5 h-5 text-amber-400 mx-auto opacity-70 mb-1" />
              <span className="text-[10px] text-stone-400 block font-mono">Automated Pool</span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowGallery(!showGallery)}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showGallery ? 'Close Media Library' : `Choose from Media Library (${ALL_MEDIA_IMAGES.length} Photos)`}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showGallery ? 'rotate-180' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-stone-400" />
              <span>Upload Custom</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Or paste external image URL..."
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                className="w-full pl-7 pr-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-200 focus:outline-hidden focus:border-amber-400 font-mono"
              />
              <Link className="w-3 h-3 text-stone-500 absolute left-2.5 top-2.5" />
            </div>
            {customUrlInput !== currentImageUrl && customUrlInput.trim() && (
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-1.5 rounded-lg bg-amber-400 text-stone-950 text-xs font-bold hover:bg-amber-300 transition-colors cursor-pointer shrink-0"
              >
                Apply URL
              </button>
            )}
          </div>
        </div>
      </div>

      {uploadError && (
        <div className="text-xs text-rose-400 font-mono">{uploadError}</div>
      )}

      {/* Visual Image Picker Gallery Drawer with Large Previews and Readable Text */}
      {showGallery && (
        <div className="p-4 bg-stone-950 border-2 border-amber-400/40 rounded-xl space-y-4 max-h-[500px] overflow-y-auto shadow-2xl animate-in fade-in">
          {/* Header info & search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-800">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Media Folder Photo Library</span>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {filteredImages.length} of {ALL_MEDIA_IMAGES.length} Photos
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Browse all authentic photoshoot assets across all categories and collections.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all photos..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
            {MEDIA_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Large Image Grid with Clear Titles & Easy Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredImages.map((item: MediaImageItem) => {
              const isSelected = currentImageUrl === item.url;
              const isRecommended = item.recommendedFor?.includes(cardKey);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectImage(item.url);
                    setCustomUrlInput(item.url);
                  }}
                  className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer flex flex-col bg-stone-900 ${
                    isSelected
                      ? 'border-amber-400 ring-2 ring-amber-400/70 shadow-lg scale-[1.01]'
                      : 'border-stone-800 hover:border-stone-600 hover:bg-stone-850 hover:scale-[1.01]'
                  }`}
                >
                  {/* Large Image Container */}
                  <div className="aspect-[16/10] w-full bg-stone-950 relative overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {isRecommended && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 font-mono text-[10px] font-bold shadow-sm">
                        Recommended for {cardKey.toUpperCase()}
                      </span>
                    )}

                    {isSelected && (
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-amber-400 text-stone-950 flex items-center gap-1 font-bold text-xs shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Chosen</span>
                      </div>
                    )}
                  </div>

                  {/* Card Info: Larger, Readable Text */}
                  <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] font-mono text-amber-400 font-semibold truncate">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono shrink-0">
                          {item.aspectRatio}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-stone-400 line-clamp-2 mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    {/* Prominent Selection Button */}
                    <button
                      type="button"
                      className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400 text-stone-950 shadow-xs'
                          : 'bg-stone-800 hover:bg-stone-700 text-white border border-stone-700'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Active Card Image</span>
                        </>
                      ) : (
                        <span>Select This Image</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredImages.length === 0 && (
            <div className="p-8 text-center text-stone-400 text-xs">
              No images matched your filter or search. Try selecting "All Images".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
