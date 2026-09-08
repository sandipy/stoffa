import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  X,
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminLoginModalOpen,
    setIsAdminLoginModalOpen,
    adminUser,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    setIsCatalogManagerOpen,
    setViewMode,
    t,
  } = useCommerce();

  const [emailInput, setEmailInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAdminLoginModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = loginAdmin(emailInput);
    if (res.success) {
      setSuccessMsg(t('Successfully authenticated as authorized administrator!', 'Successfully authenticated as authorized administrator!'));
      setTimeout(() => {
        setIsAdminLoginModalOpen(false);
      }, 1200);
    } else {
      setErrorMsg(res.error || t('Unauthorized email. Only fixed admin is permitted.', 'Unauthorized email. Only fixed admin is permitted.'));
    }
  };

  const handleQuickFill = () => {
    setEmailInput('sulaniyashpal@gmail.com');
    setErrorMsg('');
  };

  return (
    <div
      id="admin-login-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={() => setIsAdminLoginModalOpen(false)}
    >
      <div
        id="admin-login-modal"
        className="relative w-full max-w-lg bg-white rounded-[4px] shadow-2xl border border-stone-200 overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[4px] bg-stone-950 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif tracking-tight text-stone-950">
                {t('Merchant Admin Portal', 'Merchant Admin Portal')}
              </h2>
              <p className="text-xs text-stone-600 font-medium">
                {t('Restricted access for authorized store administrator', 'Restricted access for authorized store administrator')}
              </p>
            </div>
          </div>
          <button
            id="close-admin-login-modal-btn"
            onClick={() => setIsAdminLoginModalOpen(false)}
            className="p-2 rounded-[4px] hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label={t('Close modal', 'Close modal')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {isAdminLoggedIn ? (
            /* Logged in state */
            <div className="space-y-6">
              <div className="p-4 rounded-[4px] bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-emerald-950">
                    {t('Administrator Authenticated', 'Administrator Authenticated')}
                  </div>
                  <div className="text-xs font-mono text-emerald-800 font-semibold mt-0.5">
                    {adminUser}
                  </div>
                  <div className="text-xs text-emerald-700 mt-1 font-medium">
                    {t('You have full permission to manage and download/upload the product catalog CSV and access merchant settings.', 'You have full permission to manage and download/upload the product catalog CSV and access merchant settings.')}
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="space-y-3">
                <button
                  id="admin-open-catalog-csv-btn"
                  onClick={() => {
                    setIsAdminLoginModalOpen(false);
                    setIsCatalogManagerOpen(true);
                  }}
                  className="w-full p-4 rounded-[4px] bg-stone-950 hover:bg-black text-white font-bold text-sm tracking-wider uppercase flex items-center justify-between transition-all shadow-md cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                    <span>{t('Catalog CSV (Download & Upload)', 'Catalog CSV (Download & Upload)')}</span>
                  </div>
                  <span className="text-xs bg-amber-400 text-stone-950 px-2 py-0.5 rounded-[4px] font-mono font-bold">
                    {t('Admin Only', 'Admin Only')}
                  </span>
                </button>

                <button
                  id="admin-open-dashboard-btn"
                  onClick={() => {
                    setIsAdminLoginModalOpen(false);
                    setViewMode('admin');
                  }}
                  className="w-full p-4 rounded-[4px] border-2 border-stone-900 hover:bg-stone-100 text-stone-950 font-bold text-sm tracking-wider uppercase flex items-center justify-between transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-5 h-5 text-stone-900" />
                    <span>{t('Open Merchant Dashboard', 'Open Merchant Dashboard')}</span>
                  </div>
                </button>

                <button
                  id="admin-logout-btn"
                  onClick={() => {
                    logoutAdmin();
                    setSuccessMsg(t('Logged out successfully.', 'Logged out successfully.'));
                  }}
                  className="w-full py-3 rounded-[4px] border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('Log Out of Admin', 'Log Out of Admin')}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="p-4 rounded-[4px] bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs sm:text-sm space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <Lock className="w-4 h-4 text-amber-700" />
                  <span>{t('Single-Admin Access Control', 'Single-Admin Access Control')}</span>
                </div>
                <p className="text-amber-900 font-medium leading-relaxed">
                  {t('Catalog CSV management is restricted. Only the designated administrator email', 'Catalog CSV management is restricted. Only the designated administrator email')} <strong className="font-mono text-stone-950 bg-amber-200/60 px-1 py-0.5 rounded-[4px]">sulaniyashpal@gmail.com</strong> {t('is authorized to sign in.', 'is authorized to sign in.')}
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-[4px] bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 rounded-[4px] bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                  {t('Administrator Email', 'Administrator Email')}
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="admin-email-input"
                    type="email"
                    required
                    placeholder="sulaniyashpal@gmail.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border-2 border-stone-300 focus:border-stone-950 rounded-[4px] text-sm font-semibold text-stone-950 placeholder:text-stone-400 outline-hidden transition-colors"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleQuickFill}
                    className="text-xs text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer flex items-center gap-1 mt-1"
                  >
                    <span>{t('Auto-fill sulaniyashpal@gmail.com', 'Auto-fill sulaniyashpal@gmail.com')}</span>
                  </button>
                </div>
              </div>

              <button
                id="submit-admin-login-btn"
                type="submit"
                className="w-full py-3.5 rounded-[4px] bg-stone-950 hover:bg-black text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{t('Verify & Enter Admin Portal', 'Verify & Enter Admin Portal')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-600">
          <span className="font-semibold">{t('Accesoire Luxury Footwear Management', 'Accesoire Luxury Footwear Management')}</span>
          <button
            onClick={() => setIsAdminLoginModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-900 font-bold transition-colors cursor-pointer"
          >
            {t('Close', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
