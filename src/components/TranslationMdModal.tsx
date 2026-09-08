import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  RotateCcw,
  Save,
  Search,
  Check,
  Globe,
  X,
  Code,
  Table,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { translationMdService } from '../services/translationMdService';
import { useCommerce } from '../context/CommerceContext';

export const TranslationMdModal: React.FC = () => {
  const {
    isTranslationMdModalOpen,
    setIsTranslationMdModalOpen,
    languages,
    activeLanguage,
    setLanguage,
    t,
  } = useCommerce();

  const [activeTab, setActiveTab] = useState<'table' | 'raw'>('table');
  const [selectedLang, setSelectedLang] = useState<string>(activeLanguage.code || 'en');
  const [searchQuery, setSearchQuery] = useState('');
  const [rawMarkdown, setRawMarkdown] = useState('');
  const [tableData, setTableData] = useState<Record<string, Record<string, string>>>({});
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [modifiedCount, setModifiedCount] = useState(0);

  // Sync state when modal opens
  useEffect(() => {
    if (isTranslationMdModalOpen) {
      const dict = translationMdService.getTranslationsDictionary();
      setTableData({ ...dict });
      setRawMarkdown(translationMdService.getRawMarkdown());
      setSelectedLang(activeLanguage.code || 'en');
      setStatusMessage(null);
      setModifiedCount(0);
    }
  }, [isTranslationMdModalOpen, activeLanguage.code]);

  if (!isTranslationMdModalOpen) return null;

  const currentLangDict = tableData[selectedLang] || {};
  const englishDict = tableData['en'] || {};

  // Combine keys from english and current language
  const allKeys = Array.from(new Set([...Object.keys(englishDict), ...Object.keys(currentLangDict)])).sort();

  const filteredKeys = allKeys.filter((k) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const keyMatch = k.toLowerCase().includes(q);
    const valMatch = (currentLangDict[k] || '').toLowerCase().includes(q);
    const enValMatch = (englishDict[k] || '').toLowerCase().includes(q);
    return keyMatch || valMatch || enValMatch;
  });

  const handleCellChange = (key: string, newVal: string) => {
    setTableData((prev) => ({
      ...prev,
      [selectedLang]: {
        ...(prev[selectedLang] || {}),
        [key]: newVal,
      },
    }));
    setModifiedCount((c) => c + 1);
  };

  const handleSaveTableChanges = () => {
    try {
      // Update the translationMdService
      for (const [lang, dict] of Object.entries(tableData)) {
        for (const [k, v] of Object.entries(dict)) {
          translationMdService.updateTranslation(lang, k, v);
        }
      }
      setRawMarkdown(translationMdService.getRawMarkdown());
      setModifiedCount(0);
      setStatusMessage({
        type: 'success',
        text: 'Successfully updated translations.md! All website buttons and text are refreshed and persisted locally.',
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to save translations.',
      });
    }
  };

  const handleApplyRawMarkdown = () => {
    const res = translationMdService.applyNewMarkdown(rawMarkdown);
    if (res.success) {
      const updatedDict = translationMdService.getTranslationsDictionary();
      setTableData({ ...updatedDict });
      setModifiedCount(0);
      setStatusMessage({
        type: 'success',
        text: `Successfully parsed and updated translations.md for ${res.count} languages!`,
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: res.error || 'Failed to parse raw markdown.',
      });
    }
  };

  const handleDownload = () => {
    translationMdService.downloadMarkdownFile();
    setStatusMessage({
      type: 'info',
      text: 'Downloaded updated translations.md to your computer.',
    });
  };

  const handleReloadFromDisk = async () => {
    const ok = await translationMdService.reloadFromDisk();
    if (ok) {
      const dict = translationMdService.getTranslationsDictionary();
      setTableData({ ...dict });
      setRawMarkdown(translationMdService.getRawMarkdown());
      setModifiedCount(0);
      setStatusMessage({
        type: 'success',
        text: 'Reloaded fresh translations directly from public/translations.md!',
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: 'Could not reload translations.md from disk.',
      });
    }
  };

  return (
    <div
      id="translation-md-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsTranslationMdModalOpen(false);
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#fcfaf7] border border-[#d6c9b6] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#e2d7c9] bg-gradient-to-r from-[#fbf8f2] via-[#f7f1e7] to-[#ede2d2] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ebe0ce] to-[#dfceba] border border-[#c8b7a0] flex items-center justify-center text-[#2b221a] shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#241c15]">
                  Website Translations (Offline MD Engine)
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#ede3d1] text-[#4a3d2f] border border-[#cbbca8]">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  translations.md
                </span>
              </div>
              <p className="text-xs text-[#5c4f42] mt-0.5">
                All button labels, sizes, and content are read directly from <code className="font-mono font-bold text-[#241c15]">translations.md</code> without requiring an internet connection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTranslationMdModalOpen(false)}
              className="p-2 rounded-lg text-[#5c4f42] hover:text-[#1f1812] hover:bg-[#ebd9c5]/60 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Bar Notification */}
        {statusMessage && (
          <div
            className={`px-5 py-2.5 text-xs flex items-center gap-2 border-b ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : statusMessage.type === 'error'
                ? 'bg-rose-50 text-rose-900 border-rose-200'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {/* Controls Toolbar: Tabs, Language Selector & Search */}
        <div className="p-3 sm:p-4 bg-[#f9f5ee] border-b border-[#e5dbc9] flex flex-wrap items-center justify-between gap-3">
          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#ede4d4] rounded-xl border border-[#d6c9b6]">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'table'
                  ? 'btn-champagne-pill-active shadow-xs'
                  : 'text-[#5c5043] hover:text-[#1f1914]'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Language Table Editor</span>
            </button>
            <button
              onClick={() => {
                setRawMarkdown(translationMdService.serializeToMarkdown());
                setActiveTab('raw');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'raw'
                  ? 'btn-champagne-pill-active shadow-xs'
                  : 'text-[#5c5043] hover:text-[#1f1914]'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Raw translations.md</span>
            </button>
          </div>

          {/* If Table View: Language Picker & Search */}
          {activeTab === 'table' && (
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-[#fdfbf7] border border-[#d6c9b6] rounded-xl px-2.5 py-1">
                <Globe className="w-3.5 h-3.5 text-[#6b5d4e]" />
                <span className="text-xs font-semibold text-[#5c5043]">Language:</span>
                <select
                  value={selectedLang}
                  onChange={(e) => {
                    setSelectedLang(e.target.value);
                    setLanguage(e.target.value);
                  }}
                  className="bg-transparent text-xs font-bold text-[#2b221a] focus:outline-none cursor-pointer"
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.nativeName || l.name} ({l.code.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#7a6b5c] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search keys or text..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs bg-[#fdfbf7] border border-[#d6c9b6] rounded-xl text-[#2b221a] placeholder-[#8c7e70] focus:outline-none focus:border-[#8c7355] w-48 sm:w-60"
                />
              </div>
            </div>
          )}

          {/* Action Buttons in Champagne Ivory */}
          <div className="flex items-center gap-2 ml-auto">
            {activeTab === 'table' ? (
              <button
                onClick={handleSaveTableChanges}
                className="btn-champagne-primary px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Save table edits into translations.md and refresh storefront"
              >
                <Save className="w-3.5 h-3.5 text-[#8c7355]" />
                <span>Save to translations.md {modifiedCount > 0 && `(${modifiedCount})`}</span>
              </button>
            ) : (
              <button
                onClick={handleApplyRawMarkdown}
                className="btn-champagne-primary px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Parse and apply Markdown text across all storefront languages"
              >
                <Check className="w-3.5 h-3.5 text-[#8c7355]" />
                <span>Apply Markdown Changes</span>
              </button>
            )}

            <button
              onClick={handleDownload}
              className="btn-champagne-secondary px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              title="Download updated translations.md file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download .md</span>
            </button>

            <button
              onClick={handleReloadFromDisk}
              className="btn-champagne-secondary px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              title="Reload initial translations.md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reload</span>
            </button>
          </div>
        </div>

        {/* Modal Main Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {activeTab === 'table' ? (
            <div className="border border-[#ded4c4] rounded-xl overflow-hidden shadow-2xs bg-white">
              <div className="overflow-x-auto max-h-[55vh]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#f5eee2] text-[#3d3227] font-mono sticky top-0 z-10 border-b border-[#ded4c4]">
                    <tr>
                      <th className="p-2.5 font-bold uppercase tracking-wider w-1/4">Key / Identifier</th>
                      <th className="p-2.5 font-bold uppercase tracking-wider w-1/3">English (Reference)</th>
                      <th className="p-2.5 font-bold uppercase tracking-wider">
                        Translation ({selectedLang.toUpperCase()})
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ece2d4]">
                    {filteredKeys.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-6 text-center text-[#7c6f62] italic">
                          No matching translation keys found for "{searchQuery}".
                        </td>
                      </tr>
                    ) : (
                      filteredKeys.map((key) => {
                        const enVal = englishDict[key] || '';
                        const currentVal = currentLangDict[key] || '';
                        return (
                          <tr key={key} className="hover:bg-[#fbf9f4] transition-colors">
                            <td className="p-2.5 font-mono text-[#524436] font-semibold select-all break-all align-top">
                              {key}
                            </td>
                            <td className="p-2.5 text-[#635547] align-top">
                              {enVal}
                            </td>
                            <td className="p-2 align-top">
                              <input
                                type="text"
                                value={currentVal}
                                onChange={(e) => handleCellChange(key, e.target.value)}
                                placeholder={enVal || key}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-[#d6c9b6] bg-[#faf8f5] focus:bg-white text-[#241c15] focus:outline-none focus:border-[#8c7355] transition-all font-sans"
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-2.5 bg-[#faf6ef] border-t border-[#ded4c4] flex items-center justify-between text-[11px] text-[#6b5c4d] font-mono">
                <span>Showing {filteredKeys.length} of {allKeys.length} translation strings in [{selectedLang.toUpperCase()}]</span>
                <span>Source: public/translations.md</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#5c5043] font-mono">
                <span>Raw Markdown (Editable • sections formatted as <code>## Language: [code] Name</code>):</span>
                <span>{rawMarkdown.length.toLocaleString()} characters</span>
              </div>
              <textarea
                value={rawMarkdown}
                onChange={(e) => setRawMarkdown(e.target.value)}
                rows={20}
                className="w-full p-4 font-mono text-xs bg-[#fdfbf7] text-[#241c15] border border-[#d6c9b6] rounded-xl focus:outline-none focus:border-[#8c7355] leading-relaxed resize-y"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-[#f8f3eb] border-t border-[#e2d7c9] flex items-center justify-between gap-3 text-xs text-[#5c4f42]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Offline MD Translation Engine Active</span>
          </div>

          <button
            onClick={() => setIsTranslationMdModalOpen(false)}
            className="btn-champagne-secondary px-4 py-1.5 rounded-xl font-semibold cursor-pointer"
          >
            {t('Close', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
