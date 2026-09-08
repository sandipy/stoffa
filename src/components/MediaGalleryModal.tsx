import React, { useState } from 'react';
import { X, Download, Copy, Check, Search, Eye, Sparkles, Folder } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { downloadAllHeroImagesZip, downloadCustomImagesZip } from '../utils/zipDownloader';

// 10 Newly generated seated & lounging hero images
import stoffaMatureEditorialImg from '../assets/images/stoffa_seated_mature_palace_1788787848514.jpg';
import stoffaBlackModelImg from '../assets/images/stoffa_seated_black_terrace_1788787865296.jpg';
import stoffaAsianGalaImg from '../assets/images/stoffa_seated_asian_steps_1788787882526.jpg';
import stoffaLatinaResortImg from '../assets/images/stoffa_seated_latina_chaise_1788787897598.jpg';
import stoffaMatureChicImg from '../assets/images/stoffa_seated_mature_bench_1788787912992.jpg';
import stoffaFestiveSangeetImg from '../assets/images/stoffa_seated_festive_swing_1788787930351.jpg';
import stoffaRoyaleKaftanImg from '../assets/images/stoffa_seated_desert_kaftan_1788787963883.jpg';
import stoffaMotherDaughterImg from '../assets/images/stoffa_seated_mother_daughter_1788787982346.jpg';
import stoffaYachtCruiseImg from '../assets/images/stoffa_seated_yacht_deck_1788787996415.jpg';
import stoffaAsianResortImg from '../assets/images/stoffa_seated_asian_garden_1788788011021.jpg';

// 10 Newly generated Occasions & Collections Photoshoots with Stoffa Shoes
import promNightImg from '../assets/images/prom_night_shoes_1788809121283.jpg';
import dateNightImg from '../assets/images/date_night_shoes_1788809134071.jpg';
import xmasBrunchImg from '../assets/images/xmas_brunch_shoes_1788809150575.jpg';
import quinceaneraGlamImg from '../assets/images/quinceanera_glam_shoes_1788809164257.jpg';
import brideComfortImg from '../assets/images/bridal_comfort_shoes_1788809179498.jpg';
import motherBrideImg from '../assets/images/mother_bride_shoes_1788809193587.jpg';
import sangeetDanceImg from '../assets/images/sangeet_dance_shoes_1788809206438.jpg';
import girlsNightImg from '../assets/images/girls_night_shoes_1788809220118.jpg';
import yachtCruiseImg from '../assets/images/yacht_cruise_shoes_1788809233863.jpg';
import bridesmaidPartyImg from '../assets/images/bridesmaid_party_shoes_1788809247373.jpg';

// Core flagship hero banners
import heroJustInImg from '../assets/images/hero_just_in_stoffa_1788641110283.jpg';
import heroBridalImg from '../assets/images/hero_bridal_stoffa_1788641121017.jpg';
import heroCruiseImg from '../assets/images/hero_cruise_stoffa_1788641132038.jpg';
import modelShoesImg from '../assets/images/shoes_hero_model_1788745307294.jpg';
import modelBagsImg from '../assets/images/bags_hero_model_1788745321490.jpg';
import stoffaModelShoesDetail from '../assets/images/stoffa_model_shoes_1788641063110.jpg';
import stoffaPotliBagDetail from '../assets/images/stoffa_potli_bag_1788639278135.jpg';

interface MediaAsset {
  id: string;
  title: string;
  category: 'new_seated' | 'occasions' | 'hero' | 'catalog_shoes' | 'catalog_bags';
  aspectRatio: string;
  url: string;
  filename: string;
  description: string;
}

const MEDIA_ASSETS: MediaAsset[] = [
  // 10 Seated Hero Slides
  {
    id: 'seated-1',
    title: 'Palace Matriarch (Mature Indian Model on Marble Stairs)',
    category: 'new_seated',
    aspectRatio: '16:9 Landscape',
    url: stoffaMatureEditorialImg,
    filename: 'stoffa_seated_mature_palace.jpg',
    description: 'Mature Indian model seated on palace stairs, showcasing champagne architectural Kolhapuri wedges & antique gold zardozi potli.',
  },
  {
    id: 'seated-2',
    title: 'Amalfi Terrace (Black Model on Stone Bench)',
    category: 'new_seated',
    aspectRatio: '16:9 Landscape',
    url: stoffaBlackModelImg,
    filename: 'stoffa_seated_black_terrace.jpg',
    description: 'Black model seated on sunlit cliffside terrace with feet forward, wearing metallic gold wedges & carrying embroidered silk potli.',
  },
  {
    id: 'seated-3',
    title: 'Emerald Gala (East Asian Model on Limestone Steps)',
    category: 'new_seated',
    aspectRatio: '16:9 Landscape',
    url: stoffaAsianGalaImg,
    filename: 'stoffa_seated_asian_steps.jpg',
    description: 'East Asian model seated on wide steps showing platinum pewter crystal wedge sandals & metallic evening potli.',
  },
  {
    id: 'seated-4',
    title: 'Coastal Promenade (Latina Model on Teak Daybed)',
    category: 'new_seated',
    aspectRatio: '16:9 Landscape',
    url: stoffaLatinaResortImg,
    filename: 'stoffa_seated_latina_chaise.jpg',
    description: 'Latina resort model lounging on daybed with legs extended forward, showing 2.5-inch rose gold low wedges & potli.',
  },
  {
    id: 'seated-5',
    title: 'Sculptural Atelier (Mature Woman on Olive Garden Bench)',
    category: 'new_seated',
    aspectRatio: '16:9 Landscape',
    url: stoffaMatureChicImg,
    filename: 'stoffa_seated_mature_bench.jpg',
    description: 'Distinguished mature woman in ivory tailoring seated on bench with ankles crossed, showing bronze block heels & raw silk potli.',
  },
  {
    id: 'seated-6',
    title: 'Courtyard Sangeet (Young Indian Model on Carved Step)',
    category: 'new_seated',
    aspectRatio: '16:9 Landscape',
    url: stoffaFestiveSangeetImg,
    filename: 'stoffa_seated_festive_swing.jpg',
    description: 'Joyful Indian model seated on carved courtyard step showing rose-gold metallic architectural wedges & swinging pearl-tassel potli.',
  },
  {
    id: 'seated-7',
    title: 'Royal Desert Palace (Middle Eastern Model on Cushions)',
    category: 'new_seated',
    aspectRatio: '16:9 Landscape',
    url: stoffaRoyaleKaftanImg,
    filename: 'stoffa_seated_desert_kaftan.jpg',
    description: 'Middle Eastern model in emerald silk kaftan seated on cushions with legs forward, showing champagne Kolhapuri wedges & antique gold potli.',
  },
  {
    id: 'seated-8',
    title: 'Generations of Grace (Mother & Daughter on Villa Lawn Steps)',
    category: 'new_seated',
    aspectRatio: '16:9 Landscape',
    url: stoffaMotherDaughterImg,
    filename: 'stoffa_seated_mother_daughter.jpg',
    description: 'Mother and daughter seated side-by-side on garden steps with both pairs of handcrafted wedges and matching potlis resting on lower step.',
  },
  {
    id: 'seated-9',
    title: 'Riviera Yacht Deck (Black Model on Sun Lounger)',
    category: 'new_seated',
    aspectRatio: '16:9 Landscape',
    url: stoffaYachtCruiseImg,
    filename: 'stoffa_seated_yacht_deck.jpg',
    description: 'Black model seated on yacht teak lounger with feet extended forward, displaying mirror-finish gold metallic wedges & evening potli.',
  },
  {
    id: 'seated-10',
    title: 'Botanical Sanctuary (East Asian Model on Garden Wall)',
    category: 'new_seated',
    aspectRatio: '16:9 Landscape',
    url: stoffaAsianResortImg,
    filename: 'stoffa_seated_asian_garden.jpg',
    description: 'East Asian model seated on limestone terrace wall with legs crossed forward, showing champagne braided wedge sandals & metallic potli.',
  },

  // 10 Occasions & Collections Photoshoots with Stoffa Footwear
  {
    id: 'occasion-1',
    title: 'Prom Night — Grand Ballroom Wedges',
    category: 'occasions',
    aspectRatio: '4:3 Curated',
    url: promNightImg,
    filename: 'prom_night_shoes_1788809121283.jpg',
    description: 'Glamorous prom ballroom staircase showing satin gown with handcrafted metallic gold architectural wedges embellished with baguette crystals.',
  },
  {
    id: 'occasion-2',
    title: 'Date Night — Candlelit Terrace Dining',
    category: 'occasions',
    aspectRatio: '4:3 Curated',
    url: dateNightImg,
    filename: 'date_night_shoes_1788809134071.jpg',
    description: 'Romantic candlelit rooftop dining terrace showcasing handcrafted rose-gold strappy low-wedge shoes with memory foam footbeds.',
  },
  {
    id: 'occasion-3',
    title: 'Christmas Brunch — Holiday Conservatory',
    category: 'occasions',
    aspectRatio: '4:3 Curated',
    url: xmasBrunchImg,
    filename: 'xmas_brunch_shoes_1788809150575.jpg',
    description: 'Festive glass conservatory brunch with cashmere knit dress and antique gold embroidered holiday wedge mules.',
  },
  {
    id: 'occasion-4',
    title: 'Quinceañera Glam — Princess Ballroom',
    category: 'occasions',
    aspectRatio: '4:3 Curated',
    url: quinceaneraGlamImg,
    filename: 'quinceanera_glam_shoes_1788809164257.jpg',
    description: 'Opulent palace ballroom celebration showing blush gown with dancing rose-gold and silver crystal-embellished high wedges.',
  },
  {
    id: 'occasion-5',
    title: 'Bride on Her Feet — Bridal Suite Comfort',
    category: 'occasions',
    aspectRatio: '4:3 Curated',
    url: brideComfortImg,
    filename: 'bridal_comfort_shoes_1788809179498.jpg',
    description: 'Modern royal bride lounging gracefully on velvet chaise showing pearl & crystal encrusted all-day dancing bridal wedges.',
  },
  {
    id: 'occasion-6',
    title: 'Mother of the Bride — Villa Balustrade',
    category: 'occasions',
    aspectRatio: '4:3 Curated',
    url: motherBrideImg,
    filename: 'mother_bride_shoes_1788809193587.jpg',
    description: 'Sophisticated mother of the bride in silk jacquard on stone balustrade wearing ergonomic champagne low wedges.',
  },
  {
    id: 'occasion-7',
    title: 'The Sangeet Ceremony — Palace Courtyard Dance',
    category: 'occasions',
    aspectRatio: '4:3 Curated',
    url: sangeetDanceImg,
    filename: 'sangeet_dance_shoes_1788809206438.jpg',
    description: 'Vibrant twirling lehenga celebration in palace courtyard showing gold dance-stable Kolhapuri architectural wedges.',
  },
  {
    id: 'occasion-8',
    title: "Girls' Night Out — Skyline Lounge",
    category: 'occasions',
    aspectRatio: '4:3 Curated',
    url: girlsNightImg,
    filename: 'girls_night_shoes_1788809220118.jpg',
    description: 'Manhattan velvet cocktail lounge with best friends showing strappy architectural block heels and luxury evening clutches.',
  },
  {
    id: 'occasion-9',
    title: 'Cruise Ready — Riviera Mega-Yacht Deck',
    category: 'occasions',
    aspectRatio: '4:3 Curated',
    url: yachtCruiseImg,
    filename: 'yacht_cruise_shoes_1788809233863.jpg',
    description: 'French Riviera private mega-yacht sailing teak deck showing linen trousers with woven bronze-gold low-wedge sandals.',
  },
  {
    id: 'occasion-10',
    title: 'The Bridesmaid Edit — Country Manor Toast',
    category: 'occasions',
    aspectRatio: '4:3 Curated',
    url: bridesmaidPartyImg,
    filename: 'bridesmaid_party_shoes_1788809247373.jpg',
    description: 'Pastel silk dresses and lawn champagne toast showing matching lawn-stable metallic block heels and dancing wedges.',
  },

  // Flagship Hero Banners
  {
    id: 'hero-1',
    title: 'Just In — Signature Kolhapuri Wedges & Potli',
    category: 'hero',
    aspectRatio: '16:9 Landscape',
    url: heroJustInImg,
    filename: 'hero_just_in_stoffa.jpg',
    description: 'Flagship arrival slide featuring champagne gold architectural Kolhapuri wedges and pearl zardozi potli.',
  },
  {
    id: 'hero-2',
    title: 'Bridal Couture — Golden Elegance',
    category: 'hero',
    aspectRatio: '16:9 Landscape',
    url: heroBridalImg,
    filename: 'hero_bridal_stoffa.jpg',
    description: 'Bridal collection hero featuring gold crystal embellished architectural bridal wedges and silk drawstring potli.',
  },
  {
    id: 'hero-3',
    title: 'Cruise Ready — Resort Glamour',
    category: 'hero',
    aspectRatio: '16:9 Landscape',
    url: heroCruiseImg,
    filename: 'hero_cruise_stoffa.jpg',
    description: 'Resort and cruise collection hero showing metallic wedge sandals on sunlit terrace.',
  },
  {
    id: 'hero-4',
    title: 'Footwear Collection Model Edit',
    category: 'catalog_shoes',
    aspectRatio: '16:9 Landscape',
    url: modelShoesImg,
    filename: 'shoes_hero_model.jpg',
    description: 'Editorial showcase of Stöffa handcrafted footwear in natural lighting.',
  },
  {
    id: 'hero-5',
    title: 'Artisanal Handbags & Potlis Model Edit',
    category: 'catalog_bags',
    aspectRatio: '16:9 Landscape',
    url: modelBagsImg,
    filename: 'bags_hero_model.jpg',
    description: 'Editorial showcase of Stöffa handcrafted zardozi bags with pearl tassels.',
  },
  {
    id: 'detail-1',
    title: 'Stöffa Architectural Wedge Macro Detail',
    category: 'catalog_shoes',
    aspectRatio: 'Square 1:1',
    url: stoffaModelShoesDetail,
    filename: 'stoffa_model_shoes.jpg',
    description: 'Close-up studio detail of champagne gold Kolhapuri architectural wedge with memory cushion.',
  },
  {
    id: 'detail-2',
    title: 'Stöffa Hand-Embroidered Zardozi Potli Detail',
    category: 'catalog_bags',
    aspectRatio: 'Square 1:1',
    url: stoffaPotliBagDetail,
    filename: 'stoffa_potli_bag.jpg',
    description: 'Close-up detail of handcrafted antique gold bullion embroidery and pearl bead tassels.',
  },
];

export const MediaGalleryModal: React.FC = () => {
  const { isMediaGalleryOpen, setIsMediaGalleryOpen, setIsPairingCuratorOpen } = useCommerce();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [activePreviewUrl, setActivePreviewUrl] = useState<string | null>(null);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [zipStatusText, setZipStatusText] = useState<string | null>(null);

  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      setZipStatusText('Preparing ZIP...');

      if (filterCategory === 'all' && !searchQuery.trim()) {
        await downloadAllHeroImagesZip((curr, tot, msg) => {
          setZipStatusText(msg);
        });
      } else {
        const items = filteredAssets.map((asset) => ({
          filename: asset.filename,
          url: asset.url,
        }));
        await downloadCustomImagesZip(
          items,
          `stoffa_hero_images_${filterCategory}.zip`,
          (curr, tot, msg) => setZipStatusText(msg)
        );
      }
      setZipStatusText('✓ Downloaded successfully!');
      setTimeout(() => setZipStatusText(null), 3500);
    } catch (err) {
      console.error('ZIP generation failed:', err);
      setZipStatusText('Download failed. Please try again.');
      setTimeout(() => setZipStatusText(null), 3000);
    } finally {
      setTimeout(() => setIsDownloadingZip(false), 800);
    }
  };

  if (!isMediaGalleryOpen) return null;

  const filteredAssets = MEDIA_ASSETS.filter((asset) => {
    const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.filename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = async (url: string, filename: string, id: string) => {
    try {
      setDownloadingId(id);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Direct link fallback
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setDownloadingId(null), 800);
    }
  };

  const handleCopyPath = (filename: string, id: string) => {
    const fullPath = `/src/assets/images/${filename}`;
    navigator.clipboard.writeText(fullPath);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#faf9f6] w-full max-w-6xl max-h-[92vh] rounded-2xl shadow-2xl border border-stone-300 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
                <Folder className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                Stöffa Atelier — Media Asset Library
              </h2>
            </div>
            <p className="text-xs text-stone-600 mt-1 flex items-center gap-1.5 font-mono">
              <span>Local directory:</span>
              <code className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded-md border border-stone-200 font-semibold">
                /src/assets/images/
              </code>
              <span className="text-stone-400">• Click any card to preview or download</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsMediaGalleryOpen(false);
                setIsPairingCuratorOpen(true);
              }}
              className="px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="Open Curator to edit slide text, titles, subtitles & suggest shoes and bags"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Edit Text &amp; Match Shoes/Bags</span>
            </button>

            <button
              onClick={handleDownloadZip}
              disabled={isDownloadingZip}
              className="px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-900 disabled:bg-amber-950 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-200" />
              <span>
                {isDownloadingZip
                  ? (zipStatusText || 'Downloading ZIP...')
                  : (filterCategory === 'all' && !searchQuery.trim()
                      ? 'Download All Images (.ZIP)'
                      : `Download ZIP (${filteredAssets.length} Images)`)}
              </span>
            </button>

            <button
              onClick={() => setIsMediaGalleryOpen(false)}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="px-6 py-3.5 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              All Assets ({MEDIA_ASSETS.length})
            </button>
            <button
              onClick={() => setFilterCategory('new_seated')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                filterCategory === 'new_seated'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>10 Seated Hero Slides</span>
            </button>
            <button
              onClick={() => setFilterCategory('occasions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                filterCategory === 'occasions'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>10 Occasions &amp; Collections (Prom, Date Night, Xmas...)</span>
            </button>
            <button
              onClick={() => setFilterCategory('hero')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === 'hero'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              Flagship Banners
            </button>
            <button
              onClick={() => setFilterCategory('catalog_shoes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === 'catalog_shoes'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              Footwear &amp; Wedges
            </button>
            <button
              onClick={() => setFilterCategory('catalog_bags')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === 'catalog_bags'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              Potli Handbags
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images, models, shoes..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-500"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
            >
              {/* Image Container with Hover Overlay */}
              <div className="relative aspect-video bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setActivePreviewUrl(asset.url)}>
                <img
                  src={asset.url}
                  alt={asset.title}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white/90 text-stone-900 text-xs font-semibold flex items-center gap-1 shadow-md">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Zoom Preview</span>
                  </span>
                </div>
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/70 text-white font-mono text-[10px] font-semibold tracking-wide backdrop-blur-xs">
                    {asset.aspectRatio}
                  </span>
                </div>
                {asset.category === 'new_seated' && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Seated Pose</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Info & Download Action */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-sm leading-snug line-clamp-2">
                    {asset.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {asset.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyPath(asset.filename, asset.id)}
                    className="text-[11px] font-mono text-stone-500 hover:text-stone-800 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
                    title="Copy local filepath"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Path</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDownload(asset.url, asset.filename, asset.id)}
                    disabled={downloadingId === asset.id}
                    className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadingId === asset.id ? 'Downloading...' : 'Download JPG'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer with instructions */}
        <div className="p-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <span>
            Showing {filteredAssets.length} of {MEDIA_ASSETS.length} images stored in project directory.
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadZip}
              disabled={isDownloadingZip}
              className="text-amber-800 hover:text-amber-900 disabled:text-stone-400 font-semibold underline flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                {isDownloadingZip ? (zipStatusText || 'Downloading ZIP...') : 'Download ZIP Archive (All High-Res Images)'}
              </span>
            </button>
            <span className="font-mono text-[11px] text-stone-400">
              Path: <code className="text-stone-700">src/assets/images/*.jpg</code>
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Lightbox */}
      {activePreviewUrl && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setActivePreviewUrl(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={activePreviewUrl}
              alt="High resolution preview"
              className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain"
            />
            <button
              onClick={() => setActivePreviewUrl(null)}
              className="mt-3 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Close Lightbox</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
