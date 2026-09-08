/**
 * Offline Markdown Translation Engine for Accesoire Storefront
 *
 * Reads translations directly from `public/translations.md`.
 * Parses Markdown tables & key-value sections into an in-memory dictionary.
 * When text is modified, updates the Markdown data and persists it to local cache,
 * ensuring no external internet or translation API is required.
 */

export interface ParsedTranslations {
  [langCode: string]: Record<string, string>;
}

const STORAGE_KEY_MD = 'accessoire_translations_md_content';
const STORAGE_KEY_LAST_MODIFIED = 'accessoire_translations_last_modified';

class TranslationMdService {
  private translations: ParsedTranslations = {};
  private rawMarkdown: string = '';
  private listeners: Set<() => void> = new Set();
  private isInitialized: boolean = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    // Attempt fast synchronous load from localStorage if available
    this.loadFromCache();
  }

  private loadFromCache(): boolean {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const cachedMd = window.localStorage.getItem(STORAGE_KEY_MD);
        if (cachedMd && cachedMd.length > 500) {
          this.rawMarkdown = cachedMd;
          this.translations = this.parseMarkdown(cachedMd);
          this.isInitialized = true;
          return true;
        }
      }
    } catch (e) {
      console.warn('Could not read cached translations from localStorage:', e);
    }
    return false;
  }

  public async initialize(): Promise<void> {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      // If already loaded from cache, we can background-fetch or verify
      const hadCache = this.loadFromCache();

      try {
        // Fetch public/translations.md
        // Try relative path first (for GitHub Pages compatibility)
        const paths = ['./translations.md', 'translations.md', '/translations.md'];
        let text = '';
        for (const p of paths) {
          try {
            const res = await fetch(p);
            if (res.ok) {
              text = await res.text();
              if (text && text.includes('Language:')) {
                break;
              }
            }
          } catch {
            // continue next path
          }
        }

        if (text && (!hadCache || text.length > this.rawMarkdown.length)) {
          this.rawMarkdown = text;
          this.translations = this.parseMarkdown(text);
          try {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem(STORAGE_KEY_MD, text);
              window.localStorage.setItem(STORAGE_KEY_LAST_MODIFIED, new Date().toISOString());
            }
          } catch {
            // Storage quota warning
          }
        }
      } catch (err) {
        console.warn('Failed to load translations.md from network, using in-memory fallback', err);
      }

      this.isInitialized = true;
      this.notifyListeners();
    })();

    return this.initPromise;
  }

  /**
   * Parse Markdown containing sections like:
   * ## Language: [en] English
   * | Key | Translation |
   * | --- | --- |
   * | nav_shoes | Shoes |
   */
  public parseMarkdown(md: string): ParsedTranslations {
    const result: ParsedTranslations = {};
    if (!md) return result;

    const lines = md.split(/\r?\n/);
    let currentLang: string | null = null;
    let isInsideTable = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Check for Section Header: e.g. "## Language: [en] English" or "## [en]" or "## Language: en"
      const langHeaderMatch = line.match(/^##\s+(?:Language:\s*)?(?:\[([a-z]{2,5})\]|([a-z]{2,5}))/i);
      if (langHeaderMatch) {
        const langCode = (langHeaderMatch[1] || langHeaderMatch[2]).toLowerCase();
        currentLang = langCode;
        if (!result[currentLang]) {
          result[currentLang] = {};
        }
        isInsideTable = false;
        continue;
      }

      if (!currentLang) continue;

      // Check for table header line: | Key | Translation |
      if (line.startsWith('|') && /key/i.test(line) && /translation/i.test(line)) {
        isInsideTable = true;
        continue;
      }

      // Check for divider line: | :--- | :--- |
      if (line.startsWith('|') && line.includes('---')) {
        continue;
      }

      // Check for table row: | key | translation |
      if (line.startsWith('|') && line.endsWith('|')) {
        const parts = line.split('|').map((p) => p.trim());
        // parts[0] is empty, parts[1] is key, parts[2] is translation, parts[3] is empty
        if (parts.length >= 3) {
          const key = parts[1].replace(/\\\|/g, '|').trim();
          const val = parts[2].replace(/\\\|/g, '|').trim();
          if (key && val) {
            result[currentLang][key] = val;
          }
        }
        continue;
      }

      // Check for bullet key-value: - **key**: value or key: value
      const bulletMatch = line.match(/^[-*]?\s*\*\*([^*]+)\*\*:\s*(.+)$/);
      if (bulletMatch) {
        const key = bulletMatch[1].trim();
        const val = bulletMatch[2].trim();
        if (key && val) {
          result[currentLang][key] = val;
        }
        continue;
      }

      const simpleKvMatch = line.match(/^([a-zA-Z0-9_\-.]+):\s*(.+)$/);
      if (simpleKvMatch && !line.startsWith('#')) {
        const key = simpleKvMatch[1].trim();
        const val = simpleKvMatch[2].trim();
        if (key && val) {
          result[currentLang][key] = val;
        }
      }
    }

    return result;
  }

  /**
   * Fast translate function queried by components and buttons
   */
  public t(keyOrText: string, langCode: string, fallback?: string): string {
    if (!keyOrText) return fallback || '';

    const langDict = this.translations[langCode];
    const enDict = this.translations['en'] || {};

    // 1. Direct key match in chosen language
    if (langDict && langDict[keyOrText]) {
      return langDict[keyOrText];
    }

    // 2. Direct key match in English
    if (langCode === 'en' && enDict[keyOrText]) {
      return enDict[keyOrText];
    }

    // 3. Search key where English value matches keyOrText
    const trimmed = keyOrText.trim().toLowerCase();
    for (const [k, val] of Object.entries(enDict)) {
      if (val.trim().toLowerCase() === trimmed) {
        if (langDict && langDict[k]) {
          return langDict[k];
        }
        return val;
      }
    }

    // 4. Return fallback or original key
    return fallback || enDict[keyOrText] || keyOrText;
  }

  /**
   * Update a translation key and update the Markdown file and cache
   */
  public updateTranslation(langCode: string, key: string, newText: string): void {
    const code = langCode.toLowerCase();
    if (!this.translations[code]) {
      this.translations[code] = {};
    }

    this.translations[code][key] = newText;
    this.rawMarkdown = this.serializeToMarkdown();

    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY_MD, this.rawMarkdown);
        window.localStorage.setItem(STORAGE_KEY_LAST_MODIFIED, new Date().toISOString());
      }
    } catch (e) {
      console.warn('Failed to save updated markdown to localStorage:', e);
    }

    this.notifyListeners();
  }

  /**
   * Batch update translations and persist
   */
  public updateBatch(items: Array<{ langCode: string; key: string; value: string }>): void {
    for (const item of items) {
      const code = item.langCode.toLowerCase();
      if (!this.translations[code]) {
        this.translations[code] = {};
      }
      this.translations[code][item.key] = item.value;
    }

    this.rawMarkdown = this.serializeToMarkdown();
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY_MD, this.rawMarkdown);
        window.localStorage.setItem(STORAGE_KEY_LAST_MODIFIED, new Date().toISOString());
      }
    } catch (e) {
      console.warn('Failed to save updated markdown:', e);
    }

    this.notifyListeners();
  }

  /**
   * Rebuild Markdown content from current in-memory dictionary
   */
  public serializeToMarkdown(): string {
    let md = `# Accesoire Storefront Translation Database (Offline Markdown Engine)\n`;
    md += `> **Notice**: All translations on this website are loaded and read directly from this Markdown file.\n`;
    md += `> When text is modified, this Markdown file is updated and persisted.\n`;
    md += `> No external internet translation API or connection is required.\n\n`;

    const langNames: Record<string, string> = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
      de: 'Deutsch',
      it: 'Italiano',
      pt: 'Português',
      ar: 'العربية',
      hi: 'हिन्दी',
      ja: '日本語',
      nl: 'Nederlands',
      zh: '中文',
      ko: '한국어',
    };

    for (const [langCode, dict] of Object.entries(this.translations)) {
      const name = langNames[langCode] || langCode.toUpperCase();
      md += `## Language: [${langCode}] ${name}\n\n`;
      md += `| Key | Translation |\n`;
      md += `| :--- | :--- |\n`;
      for (const [key, val] of Object.entries(dict)) {
        const cleanKey = key.replace(/\|/g, '\\|');
        const cleanVal = (val || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
        md += `| ${cleanKey} | ${cleanVal} |\n`;
      }
      md += `\n`;
    }

    return md;
  }

  /**
   * Replace complete translations with new Markdown text
   */
  public applyNewMarkdown(mdContent: string): { success: boolean; count: number; error?: string } {
    try {
      const parsed = this.parseMarkdown(mdContent);
      const langCount = Object.keys(parsed).length;
      if (langCount === 0) {
        return { success: false, count: 0, error: 'No valid language sections found in Markdown.' };
      }

      this.translations = parsed;
      this.rawMarkdown = mdContent;

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY_MD, mdContent);
        window.localStorage.setItem(STORAGE_KEY_LAST_MODIFIED, new Date().toISOString());
      }

      this.notifyListeners();
      return { success: true, count: langCount };
    } catch (err: any) {
      return { success: false, count: 0, error: err?.message || 'Failed to parse Markdown.' };
    }
  }

  /**
   * Reset to initial public/translations.md from disk
   */
  public async reloadFromDisk(): Promise<boolean> {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY_MD);
      }
      this.rawMarkdown = '';
      this.translations = {};
      this.initPromise = null;
      await this.initialize();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Trigger browser file download of the latest translations.md
   */
  public downloadMarkdownFile(): void {
    if (typeof window === 'undefined') return;
    const content = this.rawMarkdown || this.serializeToMarkdown();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translations.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public getRawMarkdown(): string {
    return this.rawMarkdown || this.serializeToMarkdown();
  }

  public getTranslationsDictionary(): ParsedTranslations {
    return this.translations;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      try {
        listener();
      } catch (e) {
        console.error('Translation listener error:', e);
      }
    }
  }
}

export const translationMdService = new TranslationMdService();
