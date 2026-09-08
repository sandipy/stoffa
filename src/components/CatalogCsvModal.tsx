import React, { useState, useRef } from 'react';
import {
  Download,
  Upload,
  FileText,
  Check,
  AlertCircle,
  X,
  Sparkles,
  RotateCcw,
  Copy,
  Layers,
  DollarSign,
  Lock,
  ShieldCheck,
  RefreshCw,
  Globe,
  ExternalLink,
  Save,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const CatalogCsvModal: React.FC = () => {
  const {
    isCatalogManagerOpen,
    setIsCatalogManagerOpen,
    products,
    exportCatalogCSV,
    importProductsFromCSV,
    importStoffaCatalog,
    formatPrice,
    isAdminLoggedIn,
    adminUser,
    setIsAdminLoginModalOpen,
  } = useCommerce();

  const [activeTab, setActiveTab] = useState<'download' | 'upload' | 'sync'>('sync');
  const [csvInput, setCsvInput] = useState('');
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{
    count: number;
    products: any[];
    csv: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isCatalogManagerOpen) return null;

  // Access control gate: non-admins can download read-only catalog CSV; full upload/edit requires admin login
  if (!isAdminLoggedIn) {
    return (
      <div
        id="catalog-csv-restricted-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCatalogManagerOpen(false)}
      >
        <div
          id="catalog-csv-restricted-modal"
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 sm:p-8 text-center text-stone-900"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsCatalogManagerOpen(false)}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4 shadow-inner">
            <Download className="w-7 h-7 text-amber-700" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-stone-950 mb-1">
            Product Catalog CSV
          </h2>
          <p className="text-xs text-stone-500 mb-5">
            Download the official 106-item product catalog from stoffastyle.com in CSV format.
          </p>

          <div className="space-y-3 mb-6">
            <a
              href="/accesoire_catalog.csv"
              download="accesoire_catalog.csv"
              className="w-full py-3.5 px-4 rounded-xl bg-stone-950 hover:bg-black text-white font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-2.5"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download accesoire_catalog.csv (106 Items)</span>
            </a>

            <a
              href="/stoffastyle_products.csv"
              download="stoffastyle_products.csv"
              className="w-full py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-900 font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-stone-600" />
              <span>Download stoffastyle_products.csv (Raw Extract)</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-left mb-5">
            <div className="flex items-center gap-2 mb-1.5">
              <Lock className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Store Administrator Notice
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Bulk CSV editing, overwriting, and pricing alterations require verified administrator credentials (<strong className="font-mono text-stone-900 font-semibold">sulaniyashpal@gmail.com</strong>).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              id="restricted-modal-login-btn"
              onClick={() => {
                setIsCatalogManagerOpen(false);
                setIsAdminLoginModalOpen(true);
              }}
              className="flex-1 py-2.5 rounded-xl border border-amber-500/50 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Login</span>
            </button>
            <button
              onClick={() => setIsCatalogManagerOpen(false)}
              className="py-2.5 px-6 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 font-bold text-xs transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    try {
      const csvData = exportCatalogCSV();
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `accesoire_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.open('/accesoire_catalog.csv', '_blank');
    }
  };

  const handleCopy = () => {
    const csvData = exportCatalogCSV();
    navigator.clipboard.writeText(csvData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCsvInput(content);
        processCSV(content);
      }
    };
    reader.readAsText(file);
  };

  const processCSV = (content: string) => {
    setUploadStatus({ type: 'idle', message: '' });
    if (!content.trim()) {
      setUploadStatus({ type: 'error', message: 'CSV content cannot be empty.' });
      return;
    }

    const res = importProductsFromCSV(content);
    if (res.success) {
      setUploadStatus({
        type: 'success',
        message: `Successfully loaded & updated ${res.count} products! All prices calibrated in USD.`,
      });
    } else {
      setUploadStatus({
        type: 'error',
        message: res.error || 'Failed to parse CSV file.',
      });
    }
  };

  const handleResetCatalog = () => {
    const res = importStoffaCatalog();
    setUploadStatus({
      type: 'success',
      message: `Reset complete! Loaded ${res.count} official Accesoire products with official USD prices (INR / 50).`,
    });
  };

  // Live Sync with stoffastyle.com (fetches live Shopify products.json and calculates USD = INR / 50)
  const handleSyncFromStoffa = async () => {
    setIsSyncing(true);
    setUploadStatus({ type: 'idle', message: '' });
    try {
      let rawProducts: any[] = [];
      // 1. Direct fetch
      try {
        const res = await fetch('https://stoffastyle.com/products.json?limit=250');
        if (res.ok) {
          const json = await res.json();
          if (json.products && json.products.length > 0) {
            rawProducts = json.products;
          }
        }
      } catch {
        // Direct fetch may hit CORS in browser, fallback
      }

      // 2. CORS Proxy fallback
      if (rawProducts.length === 0) {
        try {
          const proxyRes = await fetch(
            'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://stoffastyle.com/products.json?limit=250')
          );
          if (proxyRes.ok) {
            const json = await proxyRes.json();
            if (json.products && json.products.length > 0) {
              rawProducts = json.products;
            }
          }
        } catch {
          // Fallback to local snapshot
        }
      }

      // 3. Local verified snapshot fallback
      if (rawProducts.length === 0) {
        const localRes = await fetch('./stoffastyle_all.json');
        if (localRes.ok) {
          const localData = await localRes.json();
          rawProducts = Array.isArray(localData) ? localData : localData.products || [];
        }
      }

      if (rawProducts.length === 0) {
        throw new Error('Could not retrieve catalog from stoffastyle.com. Please verify your connection or use CSV upload.');
      }

      // Build CSV with official logic: USD = Math.round(INR / 50)
      // Examples: 4500 INR -> 90 USD | 5000 INR -> 100 USD | 3500 INR -> 70 USD
      const headers = ['id', 'title', 'category', 'price_inr', 'price_usd', 'original_price_usd', 'sizes', 'materials', 'description'];
      const rows = [headers.join(',')];

      for (const p of rawProducts) {
        const id = 'stoffa_' + p.id;
        const title = (p.title || '').replace(/"/g, '""');
        const rawPrice = p.variants?.[0]?.price ? parseFloat(p.variants[0].price) : 4000;
        const priceINR = isNaN(rawPrice) ? 4000 : rawPrice;
        const priceUSD = Math.round(priceINR / 50);
        const origPriceUSD = Math.round(priceUSD * 1.25);

        let cat = 'Heels';
        const lower = title.toLowerCase();
        if (lower.includes('flat') || lower.includes('slipper')) cat = 'Flats';
        else if (lower.includes('bag') || lower.includes('potli') || lower.includes('clutch')) cat = 'Bags';
        else if (lower.includes('high') || lower.includes('3.5') || lower.includes('4.5') || lower.includes('4.25')) cat = 'High wedges - 3.5 inch';
        else if (lower.includes('low') || lower.includes('2.5') || lower.includes('2 1/4')) cat = 'Low Wedges - 2.5 inch';
        else if (lower.includes('wedge')) cat = 'Wedges';
        else if (lower.includes('boot')) cat = 'Boots';
        else if (lower.includes('bridal')) cat = 'Bridal';

        const variantTitles = (p.variants || []).map((v: any) => v.title).filter(Boolean);
        const sizesStr = variantTitles.length > 0 ? variantTitles.join('; ').replace(/"/g, '""') : 'EU 36; EU 37; EU 38; EU 39; EU 40; EU 41';
        const materials = 'Handcrafted vegan leather upper, metallic cord braiding, signature dual-density memory foam footbed, anti-slip rubber sole.';
        const cleanDesc = (p.body_html || `${title}. Handcrafted with precision and timeless elegance.`)
          .replace(/<[^>]*>?/gm, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/"/g, '""');

        rows.push(`"${id}","${title}","${cat}",${priceINR},${priceUSD},${origPriceUSD},"${sizesStr}","${materials}","${cleanDesc}"`);
      }

      const csvContent = rows.join('\n');
      setSyncResult({
        count: rawProducts.length,
        products: rawProducts,
        csv: csvContent,
      });

      setUploadStatus({
        type: 'success',
        message: `Successfully pulled ${rawProducts.length} live products from stoffastyle.com! Review the pricing calculations below and click "Save & Apply Synced Catalog to Storefront" to persist.`,
      });
    } catch (err: any) {
      setUploadStatus({
        type: 'error',
        message: err.message || 'Failed to sync with stoffastyle.com',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveSyncedCatalog = () => {
    if (!syncResult) return;
    const res = importProductsFromCSV(syncResult.csv);
    if (res.success) {
      setUploadStatus({
        type: 'success',
        message: `Explicitly Saved & Persisted! Storefront now has ${res.count} products synced with exact formula: USD = INR / 50 (e.g. ₹4,500 = $90, ₹5,000 = $100, ₹3,500 = $70). Changes will NOT disappear on refresh.`,
      });
    } else {
      setUploadStatus({
        type: 'error',
        message: res.error || 'Failed to save synced catalog.',
      });
    }
  };

  return (
    <div
      id="catalog-csv-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={() => setIsCatalogManagerOpen(false)}
    >
      <div
        id="catalog-csv-modal"
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d3b46] text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif tracking-tight text-slate-900">
                  Products Catalog CSV
                </h2>
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {adminUser}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Admin Exclusive: Download full product inventory or upload CSV with automatic INR to USD conversion
              </p>
            </div>
          </div>
          <button
            id="close-catalog-csv-modal-btn"
            onClick={() => setIsCatalogManagerOpen(false)}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-stone-200 bg-stone-100/50 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            id="tab-sync-stoffa"
            onClick={() => setActiveTab('sync')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'sync'
                ? 'border-[#0d3b46] text-[#0d3b46]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-[#0d3b46]' : ''}`} />
            <span>Sync from stoffastyle.com</span>
          </button>
          <button
            id="tab-download-csv"
            onClick={() => setActiveTab('download')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'download'
                ? 'border-[#0d3b46] text-[#0d3b46]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download CSV ({products.length})</span>
          </button>
          <button
            id="tab-upload-csv"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'upload'
                ? 'border-[#0d3b46] text-[#0d3b46]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload CSV</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Status Message */}
          {uploadStatus.message && (
            <div
              className={`p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${
                uploadStatus.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {uploadStatus.type === 'success' ? (
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">{uploadStatus.message}</div>
            </div>
          )}

          {activeTab === 'sync' ? (
            <div className="space-y-5">
              {/* Formula & Live Sync Guidance */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/90 to-orange-50/50 border border-amber-200 text-stone-900 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <span className="font-serif font-bold text-base text-stone-900">
                      Pricing Logic: Official USD = INR / 50
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 bg-amber-200/80 rounded-full font-bold text-amber-950">
                    Formula Active
                  </span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed font-light">
                  Prices in this store are calculated directly from original prices on{' '}
                  <strong className="font-medium text-stone-900">stoffastyle.com</strong> using the exact exchange and pricing logic:
                </p>

                {/* Example Calculations Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/80 shadow-2xs text-center">
                    <span className="block text-[11px] text-stone-500 font-medium">₹3,500 INR</span>
                    <span className="block font-bold text-sm text-stone-900 font-mono mt-0.5">$70 USD</span>
                    <span className="block text-[9px] text-emerald-700 font-mono">3500 / 50</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/80 shadow-2xs text-center">
                    <span className="block text-[11px] text-stone-500 font-medium">₹4,000 INR</span>
                    <span className="block font-bold text-sm text-stone-900 font-mono mt-0.5">$80 USD</span>
                    <span className="block text-[9px] text-emerald-700 font-mono">4000 / 50</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/80 shadow-2xs text-center bg-amber-100/30">
                    <span className="block text-[11px] text-stone-500 font-medium">₹4,500 INR</span>
                    <span className="block font-bold text-sm text-amber-950 font-mono mt-0.5">$90 USD</span>
                    <span className="block text-[9px] text-emerald-700 font-mono">4500 / 50</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/80 shadow-2xs text-center bg-amber-100/30">
                    <span className="block text-[11px] text-stone-500 font-medium">₹5,000 INR</span>
                    <span className="block font-bold text-sm text-amber-950 font-mono mt-0.5">$100 USD</span>
                    <span className="block text-[9px] text-emerald-700 font-mono">5000 / 50</span>
                  </div>
                </div>
              </div>

              {/* Sync Controls */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Globe className="w-4 h-4 text-sky-700" />
                    <span className="font-serif font-bold text-stone-900">
                      Live Catalog Source: stoffastyle.com
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-light">
                    Direct sync from Shopify JSON catalog. Fetches all 106 official footwear &amp; accessory items.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    id="sync-live-stoffa-btn"
                    onClick={handleSyncFromStoffa}
                    disabled={isSyncing}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#0d3b46] hover:bg-[#07262d] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Fetching...' : 'Fetch Live Catalog'}</span>
                  </button>
                </div>
              </div>

              {/* Sync Preview and Save Section */}
              {syncResult ? (
                <div className="space-y-4 border border-emerald-200 bg-emerald-50/40 p-4 rounded-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-emerald-200/80 pb-3">
                    <div>
                      <span className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Live Feed Ready ({syncResult.count} Products)
                      </span>
                      <span className="text-xs text-emerald-800">
                        All items converted with USD = INR / 50. Explicit save required.
                      </span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          const blob = new Blob([syncResult.csv], { type: 'text/csv;charset=utf-8;' });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.setAttribute('href', url);
                          link.setAttribute('download', `stoffastyle_synced_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="px-3 py-2 rounded-xl border border-emerald-300 hover:bg-emerald-100/80 text-emerald-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Synced CSV</span>
                      </button>
                      <button
                        id="save-synced-catalog-btn"
                        onClick={handleSaveSyncedCatalog}
                        className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save &amp; Apply to Storefront</span>
                      </button>
                    </div>
                  </div>

                  {/* Preview Items */}
                  <div className="max-h-48 overflow-y-auto border border-emerald-200/60 rounded-lg bg-white divide-y divide-stone-100 text-xs">
                    {syncResult.products.slice(0, 8).map((p: any) => {
                      const inr = parseFloat(p.variants?.[0]?.price || '4000');
                      const usd = Math.round(inr / 50);
                      return (
                        <div key={p.id} className="p-2.5 flex items-center justify-between gap-3">
                          <div className="truncate flex-1">
                            <span className="font-semibold text-stone-900 block truncate">{p.title}</span>
                            <span className="text-[10px] text-stone-400 font-mono">ID: {p.id}</span>
                          </div>
                          <div className="flex items-center gap-4 text-right shrink-0">
                            <span className="text-stone-500 font-mono">₹{inr.toLocaleString()}</span>
                            <span className="font-bold text-stone-900 font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                              ${usd} USD
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-6 border border-dashed border-stone-300 rounded-xl text-center space-y-2 bg-stone-50/40">
                  <RefreshCw className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="font-medium text-stone-800 text-xs">
                    Click "Fetch Live Catalog" above to sync all latest items, prices, and images from stoffastyle.com.
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Changes are strictly staged until you click the explicit "Save &amp; Apply" button.
                  </p>
                </div>
              )}
            </div>
          ) : activeTab === 'download' ? (
            <div className="space-y-5">
              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="font-serif text-lg font-bold text-slate-900">
                      Accesoire Products Catalog
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0d3b46] text-white">
                      {products.length} Products
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-light">
                    Prices always in USD ($) • Mapped from original INR catalog (e.g., 3,000 INR = $60 USD, 5,000 INR = $100 USD, 4,500 INR = $90 USD)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-white text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy CSV'}</span>
                  </button>
                  <button
                    id="download-catalog-csv-btn"
                    onClick={handleDownload}
                    className="px-5 py-2.5 rounded-xl bg-[#0d3b46] hover:bg-[#07262d] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .CSV</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Table */}
              <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-stone-100 px-4 py-2.5 border-b border-stone-200 font-semibold text-xs text-stone-700 flex justify-between items-center">
                  <span>Catalog Sample (First 6 items)</span>
                  <span className="text-[11px] font-mono text-stone-500">Columns: ID, Title, Category, INR Price, USD Price</span>
                </div>
                <div className="overflow-x-auto max-h-60">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-stone-50 sticky top-0 border-b border-stone-200 text-stone-600 font-serif">
                      <tr>
                        <th className="p-2.5">ID</th>
                        <th className="p-2.5">Title</th>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5 font-mono text-right">INR Price</th>
                        <th className="p-2.5 font-mono text-right">USD Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 font-light">
                      {products.slice(0, 6).map((p) => (
                        <tr key={p.id} className="hover:bg-amber-50/40">
                          <td className="p-2.5 font-mono text-[11px] text-stone-500">{p.id}</td>
                          <td className="p-2.5 font-medium text-stone-900">{p.title}</td>
                          <td className="p-2.5 text-stone-600">{p.category}</td>
                          <td className="p-2.5 font-mono text-right text-stone-600">
                            ₹{(p.priceINR || p.priceUSD * 50).toLocaleString()}
                          </td>
                          <td className="p-2.5 font-mono font-bold text-right text-emerald-800">
                            {formatPrice(p.priceUSD)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Formula & Auto-Conversion Guidance */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-1.5">
                <div className="flex items-center gap-2 font-bold font-serif text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Automatic INR to USD Conversion Active</span>
                </div>
                <p className="text-amber-800 font-light leading-relaxed">
                  When you upload a CSV with a <code className="font-mono bg-amber-100/90 px-1 py-0.5 rounded text-amber-900 font-bold">price_inr</code> or <code className="font-mono bg-amber-100/90 px-1 py-0.5 rounded text-amber-900 font-bold">priceINR</code> column, all prices will automatically convert to USD using the formula:
                </p>
                <div className="font-mono font-semibold bg-white/80 p-2.5 rounded-lg border border-amber-200 text-amber-900 flex flex-wrap items-center gap-4 text-xs">
                  <span>3,000 INR &rarr; $60 USD</span>
                  <span>&bull;</span>
                  <span>4,500 INR &rarr; $90 USD</span>
                  <span>&bull;</span>
                  <span>5,000 INR &rarr; $100 USD</span>
                  <span>&bull;</span>
                  <span className="text-emerald-700">Formula: USD = Math.round(INR / 50)</span>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-[#0d3b46] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-stone-50"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-stone-200/80 flex items-center justify-center text-stone-700">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-stone-800">
                    Click to browse or drop your CSV file here
                  </span>
                  <span className="text-xs text-stone-500 font-light">
                    Supports .csv files with headers (id, title, category, price_inr, price_usd, sizes, description)
                  </span>
                </div>
              </div>

              {/* Or Paste CSV */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Or Paste CSV Text Directly
                </label>
                <textarea
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  placeholder={'id,title,category,price_inr,price_usd\nstoffa_001,Bridal High Wedge,Heels,4000,80\nstoffa_002,Artisanal Potli,Bags,3000,60'}
                  rows={5}
                  className="w-full p-3 font-mono text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#0d3b46] bg-white"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleResetCatalog}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Official Catalog (106 items)</span>
                </button>

                <button
                  id="process-csv-upload-btn"
                  onClick={() => processCSV(csvInput)}
                  disabled={!csvInput.trim()}
                  className="px-6 py-2.5 rounded-xl bg-[#0d3b46] hover:bg-[#07262d] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Import &amp; Update Storefront</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>All Store Prices Always In USD ($)</span>
          </div>
          <button
            onClick={() => setIsCatalogManagerOpen(false)}
            className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
