import React, { useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  Lock,
  Package,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    activeCurrency,
    formatPrice,
    placeOrder,
    t,
  } = useCommerce();

  const [name, setName] = useState('Eleanor Vance');
  const [email, setEmail] = useState('eleanor.vance@vogue-paris.com');
  const [address, setAddress] = useState('742 Rue Sherbrooke Ouest, Montréal, QC H3A 1G1, Canada');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const totalUSD = subtotalUSD;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        name,
        email,
        address,
      });
      setIsProcessing(false);
      setCompletedOrder(order);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-stone-200 shadow-2xl text-stone-900 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-stone-900" />
            <span className="font-serif text-lg font-medium text-stone-900">
              {completedOrder ? t('Order Confirmation', 'Order Confirmation') : t('Stripe Direct Encrypted Checkout', 'Stripe Direct Encrypted Checkout')}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Order Confirmed View */
          <div className="py-8 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500 font-semibold">
                {t('Receipt #', 'Receipt #')}{completedOrder.id}
              </span>
              <h3 className="text-2xl font-serif text-stone-900 font-medium">{t('thank_you', 'Thank you for your order!')}</h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto font-light">
                {t('order_tracking', 'Your order is being processed.')} {t('A detailed receipt in', 'A detailed receipt in')}{' '}
                <strong className="text-stone-900 font-medium">{completedOrder.currency}</strong> {t('has been dispatched to', 'has been dispatched to')}{' '}
                <strong className="text-stone-900 font-medium">{completedOrder.customerEmail}</strong>.
              </p>
            </div>

            {/* Attribution Receipt Box */}
            {completedOrder.campaignSlug && (
              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-left text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('Attribution Successfully Recorded', 'Attribution Successfully Recorded')}</span>
                </div>
                <div className="text-emerald-950 font-medium">
                  {t('Campaign:', 'Campaign:')} <span className="font-mono text-emerald-900 font-bold">/c/{completedOrder.campaignSlug}</span>
                </div>
                <div className="text-stone-600 text-[11px]">
                  {t('Affiliate commission automatically calculated and routed to clearance ledger.', 'Affiliate commission automatically calculated and routed to clearance ledger.')}
                </div>
              </div>
            )}

            {/* Order Items Summary */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-stone-50 border border-stone-200 text-left space-y-2 text-xs">
              <div className="flex justify-between font-medium text-stone-700 pb-2 border-b border-stone-200">
                <span>{t('Total Charged', 'Total Charged')} ({completedOrder.currency})</span>
                <span className="font-mono text-sm font-bold text-stone-900">
                  {formatPrice(completedOrder.totalUSD)}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>{t('Physical Destination', 'Physical Destination')}</span>
                <span className="truncate max-w-[240px] text-stone-900 font-medium">
                  {completedOrder.shippingAddress}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-xl btn-champagne-primary text-xs font-bold uppercase tracking-widest transition-colors shadow-md cursor-pointer"
            >
              {t('Continue Exploring Collection', 'Continue Exploring Collection')}
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="mt-6 space-y-6">
            {/* Customer & Delivery Information */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-mono tracking-widest text-stone-500 font-semibold">
                {t('Customer & Shipping Destination', 'Customer & Shipping Destination')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1">{t('name', 'Full Name')}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">{t('email', 'Email Address')}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>
              <div>
                <label className="block text-stone-600 mb-1 text-xs">
                  {t('shipping_address', 'Shipping Address')} ({t('Physical Delivery', 'Physical Delivery')})
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>

            {/* Payment Details (Stripe Elements simulation) */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase font-mono tracking-widest text-stone-500 font-semibold">
                  {t('Payment Method (Stripe Direct)', 'Payment Method (Stripe Direct)')}
                </h4>
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Visa, Mastercard, Amex, Apple Pay</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 text-[11px] mb-1">{t('Card Information', 'Card Information')}</label>
                  <div className="flex items-center justify-between px-3 py-2 rounded bg-white border border-stone-300 font-mono text-stone-900">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-stone-800" />
                      <span>{cardNumber}</span>
                    </div>
                    <span className="text-stone-400">12 / 28 • 883</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1">
                  <span>{t('Billing Country & Currency:', 'Billing Country & Currency:')}</span>
                  <span className="font-mono text-stone-900 font-semibold">
                    {activeCurrency.name} ({activeCurrency.code})
                  </span>
                </div>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="pt-2 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-stone-600">{t('Total Charged', 'Total Charged')}</span>
                <span className="font-mono text-lg text-stone-900 font-bold">{formatPrice(totalUSD)}</span>
              </div>

              <button
                type="submit"
                id="submit-order-btn"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl btn-champagne-primary disabled:opacity-50 font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#3d3227] border-t-transparent rounded-full animate-spin"></span>
                    {t('Processing Secure Stripe Payment...', 'Processing Secure Stripe Payment...')}
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#8c7355]" />
                    <span>{t('Pay', 'Pay')} {formatPrice(totalUSD)} {t('with Stripe', 'with Stripe')}</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-stone-500">
                {t('Instant attribution tracking • Automated merchant & affiliate ledger sync', 'Instant attribution tracking • Automated merchant & affiliate ledger sync')}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
