import React, { useState } from 'react';
import {
  RotateCcw,
  Headphones,
  Gift,
  CreditCard,
  MessageCircle,
  Mail,
  Send,
  Check,
  ShieldCheck,
  Lock,
  FileSpreadsheet,
  Folder,
  Sparkles,
  SlidersHorizontal,
  Camera,
  LogOut,
  LayoutDashboard,
  Truck,
  Shield,
  Clock,
  Phone,
  MapPin,
  Megaphone,
  Layout,
  Edit3,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { useCms } from '../context/CmsContext';
import { EditableText } from './cms/EditableText';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

export const Footer: React.FC = () => {
  const {
    setIsB2BModalOpen,
    setIsCatalogManagerOpen,
    isAdminLoggedIn,
    adminUser,
    logoutAdmin,
    setViewMode,
    setIsAdminLoginModalOpen,
    setIsSizeGuideOpen,
    setIsMediaGalleryOpen,
    setIsPairingCuratorOpen,
    setIsHeroCsvModalOpen,
    openPageHeroManager,
    activeCurrency,
    t,
  } = useCommerce();

  const {
    cmsData,
    isCmsInPlaceMode,
    toggleCmsInPlaceMode,
    setIsFooterEditorOpen,
    setIsAnnouncementEditorOpen,
    setIsPageCmsModalOpen,
  } = useCms();

  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmailInput('');
      }, 3500);
    }
  };

  const getPropIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-stone-900" />;
      case 'Gift':
        return <Gift className="w-6 h-6 text-stone-900" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-stone-900" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-stone-900" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-stone-900" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-stone-900" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-stone-900" />;
      case 'RotateCcw':
      default:
        return <RotateCcw className="w-6 h-6 text-stone-900" />;
    }
  };

  return (
    <footer className="w-full bg-white text-stone-900 border-t border-stone-200">
      {/* 4 Value-Props Banner on Clean White */}
      <div className="border-b border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <EditableText target={{ type: 'footer_value_props' }} label="Edit 4 Value Cards">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {cmsData.footer.valueProps.map((prop) => (
                <div key={prop.id} className="flex flex-col items-center space-y-2 group cursor-default">
                  <div className="w-14 h-14 rounded-[4px] bg-stone-50 text-stone-900 flex items-center justify-center transition-transform group-hover:scale-105 border border-stone-200 shadow-2xs">
                    {getPropIcon(prop.icon)}
                  </div>
                  <span className="text-sm sm:text-base font-bold text-stone-900 uppercase tracking-wider font-serif">
                    {t(prop.title, prop.title)}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-[200px]">
                    {t(prop.description, prop.description)}
                  </p>
                </div>
              ))}
            </div>
          </EditableText>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Logo & Brand Story */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl tracking-[0.2em] text-stone-950 lowercase font-bold">
                {cmsData.footer.brandName || 'accesoire'}
              </span>
            </div>

            <EditableText target={{ type: 'footer_story' }} label="Edit Brand Story">
              <p className="text-sm text-stone-600 font-normal leading-relaxed max-w-sm">
                {t(cmsData.footer.brandStory, cmsData.footer.brandStory)}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                  {t(cmsData.footer.brandTagline, cmsData.footer.brandTagline)}
                </span>
              </div>
            </EditableText>
          </div>

          {/* Column 2: About Us */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold tracking-wider text-stone-950 uppercase">
              {t('About Us', 'About Us')}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-700">
              <li>
                <a href="#about" className="hover:text-black transition-colors">
                  {t('Our Atelier', 'Our Atelier')}
                </a>
              </li>
              <li>
                <a href="#artisanship" className="hover:text-black transition-colors">
                  {t('Artisanship', 'Artisanship')}
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-black transition-colors">
                  {t('Press & Editorial', 'Press & Editorial')}
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsB2BModalOpen(true)}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  {t('Wholesale & B2B', 'Wholesale & B2B')}
                </button>
              </li>
              <li>
                <a href="#bespoke" className="hover:text-black transition-colors">
                  {t('Bespoke Bridal Inquiry', 'Bespoke Bridal Inquiry')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Atelier Concierge Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold tracking-wider text-stone-950 uppercase">
              {t('Customer Care & Concierge', 'Customer Care & Concierge')}
            </h4>

            {/* Direct Contact Details Block */}
            <EditableText target={{ type: 'footer_contact' }} label="Edit Contact Details">
              <div className="space-y-2 text-xs text-stone-700 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <a
                    href={`mailto:${cmsData.footer.contactEmail}`}
                    className="hover:text-black font-medium transition-colors break-all"
                  >
                    {cmsData.footer.contactEmail}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <a
                    href={`tel:${cmsData.footer.contactPhone}`}
                    className="hover:text-black font-medium transition-colors"
                  >
                    {cmsData.footer.contactPhone}
                  </a>
                </div>

                <div className="flex items-start gap-2 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span className="text-stone-600 leading-tight">
                    {cmsData.footer.contactAddress}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span className="text-stone-500 text-[11px]">
                    {cmsData.footer.contactHours}
                  </span>
                </div>
              </div>
            </EditableText>

            <ul className="space-y-2 text-sm text-stone-700 pt-1">
              <li>
                <a href="#shipping" className="hover:text-black transition-colors">
                  {t('Shipping & Delivery', 'Shipping & Delivery')}
                </a>
              </li>
              <li>
                <button
                  id="footer-size-guide-btn"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  {t('Shoe Size Guide', 'Shoe Size Guide')}
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-black transition-colors">
                  {t('Client Inquiries & FAQ', 'Client Inquiries & FAQ')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & All Social Media Icons */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base font-bold tracking-wider text-stone-950 uppercase">
              {t('Join Our VIP Circle', 'Join Our VIP Circle')}
            </h4>
            <p className="text-sm text-stone-600 font-normal leading-relaxed">
              {t('Subscribe for private trunk show announcements, early drops, and 15% off your first order.', 'Subscribe for private trunk show announcements, early drops, and 15% off your first order.')}
            </p>

            {/* Email Subscription Form */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={t('Enter your email', 'Enter your email')}
                  className="w-full pl-9 pr-3 py-2 rounded-[4px] border border-stone-300 bg-white text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-900 shadow-2xs"
                />
                <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-[4px] bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs cursor-pointer flex items-center gap-1 shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{t('JOINED', 'JOINED')}</span>
                  </>
                ) : (
                  <span>{t('JOIN', 'JOIN')}</span>
                )}
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-800 font-semibold">
                {t('Welcome to Accesoire! Check your inbox for your welcome voucher.', 'Welcome to Accesoire! Check your inbox for your welcome voucher.')}
              </p>
            )}

            {/* ALL Social Media Icons */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2">
                {t('Follow @Accesoire', 'Follow @Accesoire')}
              </span>
              <div className="flex items-center gap-2 text-stone-700">
                <a
                  href={cmsData.footer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[4px] border border-stone-200 bg-stone-50 hover:bg-white flex items-center justify-center hover:text-stone-950 hover:border-stone-400 transition-colors shadow-2xs"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={cmsData.footer.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[4px] border border-stone-200 bg-stone-50 hover:bg-white flex items-center justify-center hover:text-stone-950 hover:border-stone-400 transition-colors shadow-2xs"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={cmsData.footer.socialLinks.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[4px] border border-stone-200 bg-stone-50 hover:bg-white flex items-center justify-center hover:text-stone-950 hover:border-stone-400 transition-colors shadow-2xs"
                  aria-label="Pinterest"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
                <a
                  href={cmsData.footer.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[4px] border border-stone-200 bg-stone-50 hover:bg-white flex items-center justify-center hover:text-stone-950 hover:border-stone-400 transition-colors shadow-2xs"
                  aria-label="Twitter / X"
                >
                  <TwitterIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={cmsData.footer.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[4px] border border-stone-200 bg-stone-50 hover:bg-white flex items-center justify-center hover:text-stone-950 hover:border-stone-400 transition-colors shadow-2xs"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={cmsData.footer.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[4px] border border-stone-200 bg-stone-50 hover:bg-white flex items-center justify-center hover:text-emerald-700 hover:border-stone-400 transition-colors shadow-2xs"
                  aria-label="WhatsApp Concierge"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Staff Access / Status, Payment Badges & Currency */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-stone-500">
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
            <span>{t(cmsData.footer.copyrightText, cmsData.footer.copyrightText)}</span>
            {!isAdminLoggedIn ? (
              <button
                id="footer-staff-login-btn"
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-700 transition-colors text-[11px] cursor-pointer"
                title="Authorized Merchant Admin Login"
              >
                <Lock className="w-3 h-3" />
                <span>{t('Staff Access', 'Staff Access')}</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('Admin Authenticated', 'Admin Authenticated')}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="flex items-center gap-1.5 text-stone-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {t('Stripe 256-Bit SSL Encrypted', 'Stripe 256-Bit SSL Encrypted')}
            </span>
            <span>&bull;</span>
            <span className="text-stone-900 font-bold">
              {t('Currency', 'Currency')}: {activeCurrency.code} ({activeCurrency.symbol})
            </span>
          </div>
        </div>

        {/* ADMIN & CMS MANAGEMENT CONSOLE (Visible ONLY when logged in as authorized admin) */}
        {isAdminLoggedIn && (
          <div
            id="footer-admin-console"
            className="mt-8 pt-6 border-t-2 border-amber-500/40 bg-stone-950 text-stone-100 rounded-xl p-5 sm:p-6 shadow-xl"
          >
            {/* Console Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold tracking-wide text-white">Merchant Admin Console</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-400 text-stone-950">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 font-mono mt-0.5">
                    Authorized Administrator: <span className="text-amber-300 font-semibold">{adminUser || 'sulaniyashpal@gmail.com'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  id="footer-admin-dashboard-btn"
                  onClick={() => setViewMode('admin')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Open Full Store Operations Dashboard"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Dashboard</span>
                </button>
                <button
                  id="footer-admin-logout-btn"
                  onClick={logoutAdmin}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-rose-900/40 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Sign out of administrator session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* SECTION A: In-Place Content Management & Storefront CMS (NEW) */}
            <div className="mt-4 pb-4 border-b border-stone-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                    Storefront CMS &amp; In-Place Editor
                  </span>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Live editing for top announcement bar, contact info, footer columns, and homepage sections.
                  </p>
                </div>

                {/* In-Place CMS Mode Toggle Switch */}
                <button
                  id="footer-toggle-inplace-cms-btn"
                  onClick={toggleCmsInPlaceMode}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                    isCmsInPlaceMode
                      ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md ring-2 ring-amber-400/40'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700'
                  }`}
                  title="Toggle In-Place On-Page Visual Text Editing"
                >
                  <Edit3 className={`w-3.5 h-3.5 ${isCmsInPlaceMode ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span>In-Place CMS: {isCmsInPlaceMode ? 'ON' : 'OFF'}</span>
                  {isCmsInPlaceMode && (
                    <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse"></span>
                  )}
                </button>
              </div>

              {/* 3 Core CMS Modals Trigger Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Footer & Contact Info Editor */}
                <button
                  id="footer-open-footer-editor-btn"
                  onClick={() => setIsFooterEditorOpen(true)}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-400/50 transition-all text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-stone-950 text-amber-400 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span>Footer &amp; Contact Editor</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-snug mt-0.5">
                      Email, WhatsApp, Atelier address, hours, 4 value cards &amp; story.
                    </p>
                  </div>
                </button>

                {/* 2. Announcement Banner Manager */}
                <button
                  id="footer-open-announcement-editor-btn"
                  onClick={() => setIsAnnouncementEditorOpen(true)}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-400/50 transition-all text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-stone-950 text-amber-400 transition-colors">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span>Announcement Manager</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-snug mt-0.5">
                      Top header banner toggle, text, discount message &amp; themes.
                    </p>
                  </div>
                </button>

                {/* 3. Page-by-Page CMS */}
                <button
                  id="footer-open-page-cms-btn"
                  onClick={() => setIsPageCmsModalOpen(true)}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-400/50 transition-all text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-stone-950 text-amber-400 transition-colors">
                    <Layout className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span>Page-by-Page Content</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-snug mt-0.5">
                      Homepage 4 categories, Just In titles &amp; JSON backups.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* SECTION B: Product Catalog & Media Asset Management */}
            <div className="mt-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 block mb-3">
                Product Catalog &amp; Media Tools
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. Catalog CSV */}
                <button
                  id="footer-catalog-csv-btn"
                  onClick={() => setIsCatalogManagerOpen(true)}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-400/50 transition-all text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-stone-950 text-amber-400 transition-colors">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span>Product Catalog CSV</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-snug mt-0.5">
                      106 items from Stöffa. Download, upload &amp; live CSV edits.
                    </p>
                  </div>
                </button>

                {/* 2. Hero CSV & Images */}
                <button
                  id="footer-hero-csv-btn"
                  onClick={() => setIsHeroCsvModalOpen(true)}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-400/50 transition-all text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-stone-950 text-amber-400 transition-colors">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span>Hero CSV &amp; Images</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-snug mt-0.5">
                      28 Slides CSV, batch uploader &amp; banner configuration.
                    </p>
                  </div>
                </button>

                {/* 2b. Page Hero Images Manager (Each Page) */}
                <button
                  id="footer-page-hero-manager-btn"
                  onClick={() => openPageHeroManager()}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-400/50 transition-all text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-stone-950 text-amber-400 transition-colors">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span>Page Hero Manager</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 bg-amber-400/20 text-amber-300 rounded font-semibold">New</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-snug mt-0.5">
                      Change hero banner on each page: Prom Night, Date Night, Shoes, Wedges &amp; more.
                    </p>
                  </div>
                </button>

                {/* 3. Image & Shoe/Bag Matcher */}
                <button
                  id="footer-pairing-curator-btn"
                  onClick={() => setIsPairingCuratorOpen(true)}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-400/50 transition-all text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-stone-950 text-amber-400 transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span>Shoe &amp; Bag Matcher</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-snug mt-0.5">
                      Pair luxury footwear &amp; clutches with editorial models.
                    </p>
                  </div>
                </button>

                {/* 4. Media Assets & Downloads */}
                <button
                  id="footer-media-gallery-btn"
                  onClick={() => setIsMediaGalleryOpen(true)}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-400/50 transition-all text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-stone-950 text-amber-400 transition-colors">
                    <Folder className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span>Media Assets &amp; Files</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-snug mt-0.5">
                      Download original high-res editorial imagery &amp; catalogues.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

