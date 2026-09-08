import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  FileText,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { FooterContentConfig } from '../../types/cms';

export const FooterEditorModal: React.FC = () => {
  const { isFooterEditorOpen, setIsFooterEditorOpen, cmsData, updateFooter } = useCms();
  const [activeTab, setActiveTab] = useState<'contact' | 'story' | 'value_props' | 'social'>('contact');
  const [formData, setFormData] = useState<FooterContentConfig>(cmsData.footer);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(cmsData.footer);
  }, [cmsData.footer, isFooterEditorOpen]);

  if (!isFooterEditorOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFooter(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsFooterEditorOpen(false);
    }, 1000);
  };

  const updateValueProp = (index: number, field: 'title' | 'description', value: string) => {
    const nextProps = [...formData.valueProps];
    nextProps[index] = { ...nextProps[index], [field]: value };
    setFormData({ ...formData, valueProps: nextProps });
  };

  const handleResetDefaults = () => {
    setFormData(cmsData.footer);
  };

  return (
    <div
      id="footer-editor-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="bg-stone-900 border border-stone-800 text-stone-100 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Footer &amp; Contact Info CMS Editor
              </h3>
              <p className="text-xs text-stone-400 font-mono">
                Storefront Contact &bull; Atelier Story &bull; Value Cards &bull; Socials
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFooterEditorOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-800 bg-stone-950/60 px-6 gap-2 pt-2">
          {[
            { id: 'contact', label: 'Contact & Concierge', icon: Phone },
            { id: 'story', label: 'Brand Story & Bio', icon: ShieldCheck },
            { id: 'value_props', label: '4 Value Cards', icon: Sparkles },
            { id: 'social', label: 'Social & Legal', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* TAB 1: Contact Details */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Concierge &amp; Client Inquiries Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="concierge@accesoire.com"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phone / WhatsApp Concierge Line</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+1 (212) 555-8290"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Atelier &amp; Showroom Address</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactAddress}
                  onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
                  placeholder="Madison Avenue Atelier, New York, NY 10022"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Concierge Hours of Operation</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactHours}
                  onChange={(e) => setFormData({ ...formData, contactHours: e.target.value })}
                  placeholder="Mon – Sat: 10:00 AM – 7:00 PM EST"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Private Consultation &amp; Styling Notice</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.conciergeNotice}
                  onChange={(e) => setFormData({ ...formData, conciergeNotice: e.target.value })}
                  placeholder="Personal styling & bridal fitting consultations available worldwide via WhatsApp or private appointment."
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Brand Story */}
          {activeTab === 'story' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  Brand Name Display
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  Brand Story &amp; Workshop Mission
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.brandStory}
                  onChange={(e) => setFormData({ ...formData, brandStory: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  Craftsmanship Tagline / Footbed Badge
                </label>
                <input
                  type="text"
                  value={formData.brandTagline}
                  onChange={(e) => setFormData({ ...formData, brandTagline: e.target.value })}
                  placeholder="Designed for All-Day Comfort • Dual-Density Memory Foam"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder:text-stone-600 focus:outline-hidden focus:border-amber-400 font-sans"
                />
              </div>
            </div>
          )}

          {/* TAB 3: 4 Value Proposition Cards */}
          {activeTab === 'value_props' && (
            <div className="space-y-4">
              <span className="text-xs text-stone-400 block">
                Edit the 4 signature guarantee cards displayed across the top of the footer banner:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {formData.valueProps.map((prop, idx) => (
                  <div
                    key={prop.id}
                    className="p-3.5 rounded-lg bg-stone-950 border border-stone-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        Card {idx + 1}
                      </span>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={prop.title}
                        onChange={(e) => updateValueProp(idx, 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-700 text-xs text-white focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={prop.description}
                        onChange={(e) => updateValueProp(idx, 'description', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-700 text-xs text-white focus:outline-hidden focus:border-amber-400 leading-snug"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Social Links & Copyright */}
          {activeTab === 'social' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    value={formData.socialLinks.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                    WhatsApp Chat URL
                  </label>
                  <input
                    type="text"
                    value={formData.socialLinks.whatsapp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, whatsapp: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                    Facebook URL
                  </label>
                  <input
                    type="text"
                    value={formData.socialLinks.facebook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                    Pinterest URL
                  </label>
                  <input
                    type="text"
                    value={formData.socialLinks.pinterest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, pinterest: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 mb-1">
                  Footer Copyright Notice
                </label>
                <input
                  type="text"
                  value={formData.copyrightText}
                  onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white"
                />
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-3 flex items-center justify-between gap-3 border-t border-stone-800">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Fields</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFooterEditorOpen(false)}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Save &amp; Apply Footer</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
