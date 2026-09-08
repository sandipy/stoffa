import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  DollarSign,
  ExternalLink,
  QrCode,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const AffiliatePortal: React.FC = () => {
  const {
    affiliates,
    activeAffiliateId,
    setActiveAffiliateId,
    payouts,
    executeStripePayout,
    formatPrice,
    activateCampaignBySlug,
    setViewMode,
  } = useCommerce();

  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const currentAffiliate =
    affiliates.find((a) => a.id === activeAffiliateId) || affiliates[0];

  const affiliateShareUrl = `https://etoile.store/c/${currentAffiliate.customSlug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const affiliatePayouts = payouts.filter(
    (p) => p.affiliateId === currentAffiliate.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in text-stone-900">
      {/* Top Header & Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>CREATOR & AFFILIATE PARTNER PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium">
            Welcome back, {currentAffiliate.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Track your social campaign conversions, manage your custom vanity link, and receive automated Stripe Connect payouts.
          </p>
        </div>

        {/* Affiliate Switcher for Demonstration */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-xl p-1.5 text-xs shadow-2xs">
            <span className="text-stone-500 pl-2">Switch Creator:</span>
            <select
              value={activeAffiliateId}
              onChange={(e) => setActiveAffiliateId(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-800 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-stone-900 font-mono"
            >
              {affiliates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.handle})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setViewMode('storefront')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs font-medium border border-stone-300 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>Visit Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </button>
        </div>
      </div>

      {/* Primary Link & Share Banner */}
      <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider shadow-2xs">
              {currentAffiliate.platform} Partnership Active
            </span>
            <h3 className="text-xl font-serif text-stone-900 font-medium mt-1.5">
              Your Exclusive Custom Campaign Link
            </h3>
            <p className="text-xs text-stone-600 font-light">
              Followers landing via this URL automatically receive VIP pricing and convert with {(currentAffiliate.commissionRate * 100)}% commission credited to your balance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQrModal(true)}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium border border-stone-300 transition-colors flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4 text-emerald-700" />
              <span>QR Code</span>
            </button>

            <button
              onClick={copyLink}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Vanity URL'}</span>
            </button>
          </div>
        </div>

        {/* Live URL Pill */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200 font-mono text-xs">
          <span className="text-emerald-800 font-medium truncate pr-4">{affiliateShareUrl}</span>
          <button
            onClick={() => {
              activateCampaignBySlug(currentAffiliate.customSlug);
              setViewMode('storefront');
            }}
            className="text-stone-900 font-bold hover:underline shrink-0 flex items-center gap-1 text-[11px]"
          >
            <span>Test in Storefront</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] font-mono text-stone-500 uppercase font-semibold">Available for Payout</div>
          <div className="text-3xl font-serif font-bold text-emerald-800 mt-1">
            {formatPrice(currentAffiliate.clearedCommissionUSD)}
          </div>
          <div className="text-[11px] text-stone-500 mt-2 font-light">
            Cleared past 14-day clearance hold
          </div>
          <button
            id="request-payout-btn"
            onClick={() => executeStripePayout(currentAffiliate.id)}
            disabled={currentAffiliate.clearedCommissionUSD <= 0}
            className="w-full mt-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 disabled:bg-stone-200 text-white disabled:text-stone-400 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Instant Stripe Payout</span>
          </button>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] font-mono text-stone-500 uppercase font-semibold">14-Day Hold (Pending)</div>
          <div className="text-3xl font-serif font-bold text-amber-700 mt-1">
            {formatPrice(currentAffiliate.pendingCommissionUSD)}
          </div>
          <div className="text-[11px] text-stone-500 mt-2 font-light">
            Held during return window, clears automatically
          </div>
          <div className="mt-4 text-[11px] text-stone-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
            <span>Anti-chargeback protection</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] font-mono text-stone-500 uppercase font-semibold">Total Attributed Sales</div>
          <div className="text-3xl font-serif font-bold text-stone-900 mt-1">
            {formatPrice(currentAffiliate.totalRevenueUSD)}
          </div>
          <div className="text-[11px] text-stone-500 mt-2 font-light">
            {currentAffiliate.totalSales} items purchased
          </div>
          <div className="mt-4 text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>{(currentAffiliate.commissionRate * 100)}% active rev-share tier</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] font-mono text-stone-500 uppercase font-semibold">Stripe Connect Status</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-base font-semibold text-stone-900">Verified & Active</span>
          </div>
          <div className="text-[11px] text-stone-500 font-mono mt-1">
            ID: {currentAffiliate.stripeAccountId}
          </div>
          <div className="mt-4 text-[11px] text-stone-500 font-light">
            Direct deposit to connected bank account
          </div>
        </div>
      </div>

      {/* Payout History Ledger for Creator */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-serif text-stone-900 font-medium">Your Disbursed Payouts</h3>
          <span className="text-xs text-stone-500 font-mono">
            Total Paid: <strong className="text-stone-900">{formatPrice(currentAffiliate.paidCommissionUSD)}</strong>
          </span>
        </div>

        {affiliatePayouts.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-500">
            No payouts processed yet. Click &quot;Instant Stripe Payout&quot; once you have a cleared balance!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-mono uppercase text-[10px]">
                  <th className="py-3 px-3">Transaction Reference</th>
                  <th className="py-3 px-3">Payout Method</th>
                  <th className="py-3 px-3 text-right">Amount Received</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Date Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono text-xs">
                {affiliatePayouts.map((pay) => (
                  <tr key={pay.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-3 text-stone-900 font-semibold">{pay.transactionHash}</td>
                    <td className="py-3 px-3 text-stone-600 font-sans">
                      <span className="inline-flex items-center gap-1.5 text-stone-900 font-medium">
                        <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                        {pay.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-emerald-800 font-bold">
                      {formatPrice(pay.amountUSD)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase border border-emerald-200">
                        {pay.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-stone-500 text-[11px]">
                      {pay.completedAt || pay.initiatedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-white border border-stone-200 text-stone-900 text-center space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <span className="text-xs font-mono text-stone-700 uppercase font-semibold">Creator Social QR Code</span>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-stone-400 hover:text-stone-800"
              >
                ✕
              </button>
            </div>

            <h4 className="font-serif text-lg font-medium text-stone-900">{currentAffiliate.name}</h4>
            <p className="text-xs text-stone-500">
              Scan to open custom campaign with automatically applied VIP discount:
            </p>

            {/* Generated QR Code Graphic Representation */}
            <div className="p-6 bg-stone-50 rounded-xl mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-inner border border-stone-200">
              <div className="grid grid-cols-5 gap-1 w-32 h-32 p-2 border-4 border-stone-900 bg-white">
                <div className="bg-stone-900 col-span-2 row-span-2"></div>
                <div className="bg-white"></div>
                <div className="bg-stone-900 col-span-2 row-span-2"></div>
                <div className="bg-stone-900"></div>
                <div className="bg-stone-900"></div>
                <div className="bg-stone-900"></div>
                <div className="bg-stone-900 col-span-2 row-span-2"></div>
                <div className="bg-white"></div>
                <div className="bg-stone-900"></div>
                <div className="bg-stone-900"></div>
              </div>
              <span className="text-[9px] font-mono text-stone-900 mt-2 font-bold">
                /c/{currentAffiliate.customSlug}
              </span>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
