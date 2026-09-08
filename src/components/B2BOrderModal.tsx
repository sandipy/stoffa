import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  Check,
  Download,
  AlertCircle,
  Plus,
  Minus,
  Trash2,
  FileSpreadsheet,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCommerce } from '../context/CommerceContext';
import { Product, B2BOrderItem } from '../types';

export const B2BOrderModal: React.FC = () => {
  const {
    products,
    isB2BModalOpen,
    setIsB2BModalOpen,
    b2bTargetProduct,
    setB2BTargetProduct,
    b2bList,
    addToB2BList,
    removeFromB2BList,
    clearB2BList,
    t,
  } = useCommerce();

  const [activeTab, setActiveTab] = useState<'configure' | 'list'>('configure');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    b2bTargetProduct ? b2bTargetProduct.id : products[0]?.id || ''
  );
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>({});

  // B2B Contact Info
  const [companyName, setCompanyName] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState<string | null>(null);

  // Sync selected product
  useEffect(() => {
    if (b2bTargetProduct) {
      setSelectedProductId(b2bTargetProduct.id);
      setSelectedColor(b2bTargetProduct.colors[0]?.name || 'Standard');
      const initialSizes: Record<string, number> = {};
      b2bTargetProduct.sizes.forEach((s) => (initialSizes[s] = 2)); // 2 per size = ~12-16 units
      setSizeQuantities(initialSizes);
    } else if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
      setSelectedColor(products[0].colors[0]?.name || 'Standard');
      const initialSizes: Record<string, number> = {};
      products[0].sizes.forEach((s) => (initialSizes[s] = 2));
      setSizeQuantities(initialSizes);
    }
  }, [b2bTargetProduct, products]);

  const selectedProduct: Product =
    products.find((p) => p.id === selectedProductId) || products[0] || ({} as Product);

  // When selected product changes
  useEffect(() => {
    if (selectedProduct && selectedProduct.sizes) {
      setSelectedColor(selectedProduct.colors[0]?.name || 'Standard');
      const initialSizes: Record<string, number> = {};
      selectedProduct.sizes.forEach((s) => (initialSizes[s] = 2));
      setSizeQuantities(initialSizes);
    }
  }, [selectedProductId]);

  if (!isB2BModalOpen) return null;

  const totalSelectedUnits = Object.values(sizeQuantities).reduce((a, b) => a + b, 0);
  const MINIMUM_QTY = 12;
  const meetsMinQty = totalSelectedUnits >= MINIMUM_QTY;

  const handleQuantityChange = (size: string, delta: number) => {
    setSizeQuantities((prev) => {
      const current = prev[size] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [size]: next };
    });
  };

  const handleAddStyleToOrderList = () => {
    if (!meetsMinQty) return;

    const item: B2BOrderItem = {
      product: selectedProduct,
      sizeBreakdown: { ...sizeQuantities },
      colorName: selectedColor,
      totalQuantity: totalSelectedUnits,
      unitPriceUSD: 0,
      discountedUnitPriceUSD: 0,
    };

    addToB2BList(item);
    setActiveTab('list');
  };

  const totalListUnits = b2bList.reduce((acc, item) => acc + item.totalQuantity, 0);

  const handleExportWholesaleCSV = () => {
    const listToExport = b2bList.length > 0 ? b2bList : [
      {
        product: selectedProduct,
        sizeBreakdown: sizeQuantities,
        colorName: selectedColor,
        totalQuantity: totalSelectedUnits,
      } as B2BOrderItem
    ];

    const headers = ['Product Style', 'Category', 'Colorway', 'Size Breakdown', 'Total Quantity'];
    const rows = listToExport.map((item) => [
      `"${item.product.title.replace(/"/g, '""')}"`,
      `"${item.product.category}"`,
      `"${item.colorName}"`,
      `"${Object.entries(item.sizeBreakdown)
        .filter(([, q]) => q > 0)
        .map(([s, q]) => `${s}:${q}`)
        .join(' | ')}"`,
      item.totalQuantity,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wholesale_style_order_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveUnits = b2bList.length > 0 ? totalListUnits : totalSelectedUnits;
    if (effectiveUnits < MINIMUM_QTY) return;

    const refId = `B2B-PO-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSubmitted(refId);
    clearB2BList();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div
      id="b2b-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in"
      onClick={() => {
        setIsB2BModalOpen(false);
        setB2BTargetProduct(null);
      }}
    >
      <div
        id="b2b-modal-content"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-stone-200 shadow-2xl p-5 sm:p-8 text-stone-900 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-stone-500 font-bold">
                {t('Wholesale & Private Label Sourcing', 'Wholesale & Private Label Sourcing')}
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {t('B2B Wholesale Style Order', 'B2B Wholesale Style Order')}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {t('Minimum Order Quantity: 12 Units', 'Minimum Order Quantity: 12 Units')}
                </span>
                <span className="text-xs text-stone-500 font-light">
                  {t('No public pricing • Custom boutique production', 'No public pricing • Custom boutique production')}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsB2BModalOpen(false);
              setB2BTargetProduct(null);
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-4 mt-4 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('configure')}
            className={`pb-3 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === 'configure'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {t('1. Select Styles & Quantities', '1. Select Styles & Quantities')}
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-3 text-xs uppercase tracking-wider font-semibold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'list'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>{t('2. Wholesale Order List & Inquiries', '2. Wholesale Order List & Inquiries')}</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 text-[11px] font-mono border border-stone-300 font-bold">
              {b2bList.length}
            </span>
          </button>
        </div>

        {orderSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-emerald-700" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-bold">
              {t('Wholesale PO Request Submitted!', 'Wholesale PO Request Submitted!')}
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              {t('Reference Number:', 'Reference Number:')}{' '}
              <strong className="font-mono text-stone-900 font-bold bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                {orderSubmitted}
              </strong>
              . {t('Our wholesale concierge will review your style selections and contact', 'Our wholesale concierge will review your style selections and contact')}{' '}
              <strong>{companyName || 'your boutique'}</strong> {t('with production lead times.', 'with production lead times.')}
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setOrderSubmitted(null);
                  setActiveTab('configure');
                }}
                className="px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-950 transition-colors cursor-pointer"
              >
                {t('Configure Another Style', 'Configure Another Style')}
              </button>
              <button
                onClick={() => setIsB2BModalOpen(false)}
                className="px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors cursor-pointer"
              >
                {t('Return to Storefront', 'Return to Storefront')}
              </button>
            </div>
          </div>
        ) : activeTab === 'configure' ? (
          <div className="py-5 space-y-6">
            {/* Style Selector Grid & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Product Selection */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <label className="text-xs uppercase font-mono text-stone-700 font-bold block">
                  {t('Select Silhouette / Style', 'Select Silhouette / Style')}
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-white border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img
                      src={selectedProduct.images?.[0] || ''}
                      alt={selectedProduct.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <select
                    value={selectedProduct.id}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full text-xs font-medium bg-white border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-stone-900 focus:outline-none"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {t(p.title, p.title)} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-stone-500 font-light line-clamp-2">
                  {t(selectedProduct.description, selectedProduct.description)}
                </p>
              </div>

              {/* Colorway Selection (Text only, NO round swatches) */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <label className="text-xs uppercase font-mono text-stone-700 font-bold block">
                  {t('Colorway / Finish', 'Colorway / Finish')}
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedProduct.colors?.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                          : 'border border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {t(c.name, c.name)}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-stone-500">
                  {t('Selected Colorway:', 'Selected Colorway:')}{' '}
                  <strong className="text-stone-900">{t(selectedColor, selectedColor)}</strong>
                </div>
              </div>
            </div>

            {/* Size Breakdown Matrix */}
            <div className="p-5 rounded-xl border border-stone-200 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 font-serif">
                    {t('Size Breakdown Matrix', 'Size Breakdown Matrix')}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {t('Distribute pairs across standard EU sizes (EU 35 - 42)', 'Distribute pairs across standard EU sizes (EU 35 - 42)')}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-500 uppercase font-mono block">
                    {t('Total Units Selected', 'Total Units Selected')}
                  </span>
                  <span
                    className={`text-xl font-mono font-bold ${
                      meetsMinQty ? 'text-emerald-700' : 'text-amber-600'
                    }`}
                  >
                    {totalSelectedUnits} / {MINIMUM_QTY} MOQ
                  </span>
                </div>
              </div>

              {/* Minimum 12 Notice */}
              {!meetsMinQty && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>
                    {t(
                      'Minimum 12 units required for wholesale order. Please add',
                      'Minimum 12 units required for wholesale order. Please add'
                    )}{' '}
                    <strong>{MINIMUM_QTY - totalSelectedUnits} {t('more pairs.', 'more pairs.')}</strong>
                  </span>
                </div>
              )}

              {/* Size Inputs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 pt-2">
                {selectedProduct.sizes?.map((size) => {
                  const qty = sizeQuantities[size] || 0;
                  return (
                    <div
                      key={size}
                      className="p-2.5 rounded-lg border border-stone-200 bg-stone-50/70 text-center space-y-1.5"
                    >
                      <span className="text-xs font-mono font-bold text-stone-700 block">
                        EU {size}
                      </span>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(size, -1)}
                          className="w-6 h-6 rounded bg-white border border-stone-300 text-stone-600 hover:bg-stone-100 flex items-center justify-center text-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 font-mono text-sm font-bold text-stone-900">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(size, 1)}
                          className="w-6 h-6 rounded bg-white border border-stone-300 text-stone-600 hover:bg-stone-100 flex items-center justify-center text-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200">
              <div className="text-xs text-stone-500">
                {meetsMinQty ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> {t('Minimum order quantity fulfilled (12+ units)', 'Minimum order quantity fulfilled (12+ units)')}
                  </span>
                ) : (
                  <span className="text-amber-700">
                    * {t('Must reach minimum 12 units to add or submit order', 'Must reach minimum 12 units to add or submit order')}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportWholesaleCSV}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>{t('Export CSV Line Sheet', 'Export CSV Line Sheet')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddStyleToOrderList}
                  disabled={!meetsMinQty}
                  className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    meetsMinQty
                      ? 'bg-stone-900 text-white hover:bg-stone-950 shadow-md'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {t('Add Style to Bulk Order', 'Add Style to Bulk Order')} ({totalSelectedUnits} {t('units', 'units')})
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Wholesale Order List & Inquiry Form */
          <div className="py-5 space-y-6">
            {/* List of Styles in Order */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 font-serif">
                  {t('Selected Wholesale Styles', 'Selected Wholesale Styles')}
                </h3>
                <span className="text-xs font-mono font-bold text-stone-600">
                  {t('Total Units:', 'Total Units:')} {totalListUnits}
                </span>
              </div>

              {b2bList.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-200 text-stone-500 text-xs space-y-2">
                  <p>{t('No styles added yet. Switch to Step 1 to select styles.', 'No styles added yet. Switch to Step 1 to select styles.')}</p>
                  <button
                    onClick={() => setActiveTab('configure')}
                    className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold cursor-pointer"
                  >
                    {t('Select Styles & Quantities', 'Select Styles & Quantities')}
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
                  {b2bList.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-stone-50 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                          <img
                            src={item.product.images?.[0] || ''}
                            alt={item.product.title}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-stone-900">
                            {t(item.product.title, item.product.title)}
                          </h4>
                          <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                            <span>{t('Color:', 'Color:')} <strong className="text-stone-800">{item.colorName}</strong></span>
                            <span>•</span>
                            <span>{t('Category:', 'Category:')} {item.product.category}</span>
                          </div>
                          <div className="text-[10px] font-mono text-stone-400 mt-1">
                            {Object.entries(item.sizeBreakdown)
                              .filter(([, q]) => q > 0)
                              .map(([s, q]) => `EU ${s}: ${q}`)
                              .join(' | ')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-mono font-bold text-stone-900">
                          {item.totalQuantity} {t('units', 'units')}
                        </span>
                        <button
                          onClick={() => removeFromB2BList(idx)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Commercial Inquiry Form */}
            <form onSubmit={handleSubmitInquiry} className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-4">
              <h3 className="text-sm font-bold text-stone-900 font-serif">
                {t('Boutique & Commercial Inquiry Information', 'Boutique & Commercial Inquiry Information')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                    {t('Boutique / Store / Company Name', 'Boutique / Store / Company Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Atelier Moda Beverly Hills"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                    {t('Buyer / Contact Name', 'Buyer / Contact Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                    {t('Business Email Address', 'Business Email Address')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="buyer@boutique.com"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                    {t('Phone / WhatsApp', 'Phone / WhatsApp')}
                  </label>
                  <input
                    type="text"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                    {t('Destination Country', 'Destination Country')} *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-stone-900 focus:outline-none"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other Global Destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 font-bold mb-1">
                    {t('Special Packaging / Notes', 'Special Packaging / Notes')}
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Private label packaging, expedited timeline, etc."
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleExportWholesaleCSV}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-stone-600" />
                  <span>{t('Download Pack List CSV', 'Download Pack List CSV')}</span>
                </button>

                <button
                  type="submit"
                  disabled={totalListUnits < MINIMUM_QTY}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                    totalListUnits >= MINIMUM_QTY
                      ? 'bg-stone-900 text-white hover:bg-stone-950'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>
                    {t('Submit Wholesale Inquiry', 'Submit Wholesale Inquiry')} (
                    {totalListUnits} {t('Units', 'Units')})
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
