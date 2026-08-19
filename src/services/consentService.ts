import { CookiePreferences, ConsentLog } from '../types';
import { dbService } from './supabase';

const COOKIE_PREFS_KEY = 'cropdoctor_cookie_prefs_v1';
const DPDP_VERSION = '2025.1.0';

export const consentService = {
  getCookiePreferences(): CookiePreferences {
    try {
      const raw = localStorage.getItem(COOKIE_PREFS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // Fallback below
    }
    return {
      necessary: true,
      functional: false,
      analytics: false,
      updatedAt: '',
    };
  },

  hasConsentRecorded(): boolean {
    const prefs = this.getCookiePreferences();
    return Boolean(prefs.updatedAt);
  },

  async savePreferences(
    prefs: { necessary: boolean; functional: boolean; analytics: boolean },
    userId?: string,
    currentLanguage = 'en'
  ): Promise<CookiePreferences> {
    const updated: CookiePreferences = {
      ...prefs,
      necessary: true, // Always required for app operation
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(updated));

    // Log consent action to DPDP audit record
    const log: ConsentLog = {
      userId,
      consentType: 'cookies',
      version: DPDP_VERSION,
      languageShown: currentLanguage,
      givenAt: new Date().toISOString(),
    };
    await dbService.recordConsent(log);

    return updated;
  },

  async logTermsAndPrivacyConsent(userId?: string, currentLanguage = 'en'): Promise<void> {
    const logTerms: ConsentLog = {
      userId,
      consentType: 'terms',
      version: DPDP_VERSION,
      languageShown: currentLanguage,
      givenAt: new Date().toISOString(),
    };

    const logPrivacy: ConsentLog = {
      userId,
      consentType: 'privacy',
      version: DPDP_VERSION,
      languageShown: currentLanguage,
      givenAt: new Date().toISOString(),
    };

    await Promise.all([
      dbService.recordConsent(logTerms),
      dbService.recordConsent(logPrivacy),
    ]);
  },
};
