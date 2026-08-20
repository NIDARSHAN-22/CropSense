import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ScanRecord, FeedbackRecord, ConsentLog, UserProfile } from '../types';
import { MOCK_SCANS } from '../data/mockScans';
import { securityService } from './securityService';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes('your-project-ref') &&
  !SUPABASE_URL.includes('your_supabase') &&
  isValidHttpUrl(SUPABASE_URL)
);

// Never let a bad/placeholder env var crash the whole app on load —
// fall back to null (local-storage mode) instead of throwing at module scope.
export const supabase: SupabaseClient | null = (() => {
  if (!isSupabaseConfigured) return null;
  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn('[CropDoctor]: Supabase client failed to initialize, falling back to local storage:', err);
    return null;
  }
})();

const LOCAL_SCANS_KEY = 'cropdoctor_scans_v1';
const LOCAL_USER_KEY = 'cropdoctor_user_profile_v1';
const LOCAL_CONSENT_KEY = 'cropdoctor_consent_logs_v1';
const LOCAL_USER_SIG_KEY = 'cropdoctor_user_sig_v1';

export function getLocalScans(userId?: string): ScanRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_SCANS_KEY);
    let allScans: ScanRecord[] = [];
    if (!raw) {
      localStorage.setItem(LOCAL_SCANS_KEY, JSON.stringify(MOCK_SCANS));
      allScans = MOCK_SCANS;
    } else {
      allScans = JSON.parse(raw);
    }

    // Strict Data Isolation: Only return scans belonging to current userId
    if (userId && !userId.startsWith('guest-') && !userId.startsWith('demo-')) {
      return allScans.filter((s) => s.userId === userId);
    }
    return allScans;
  } catch {
    return MOCK_SCANS;
  }
}

export function saveLocalScan(scan: ScanRecord): void {
  try {
    const raw = localStorage.getItem(LOCAL_SCANS_KEY);
    const existing: ScanRecord[] = raw ? JSON.parse(raw) : MOCK_SCANS;
    const updated = [scan, ...existing.filter((s) => s.id !== scan.id)];
    localStorage.setItem(LOCAL_SCANS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to persist scan locally:', err);
  }
}

export function updateLocalScanStatus(scanId: string, status: 'active' | 'treated' | 'resolved'): void {
  try {
    const raw = localStorage.getItem(LOCAL_SCANS_KEY);
    if (!raw) return;
    const scans: ScanRecord[] = JSON.parse(raw);
    const updated = scans.map((s) => (s.id === scanId ? { ...s, status } : s));
    localStorage.setItem(LOCAL_SCANS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to update scan status:', err);
  }
}

// User Profile with Cryptographic Anti-Tampering Signature
export async function getStoredUserProfile(): Promise<UserProfile | null> {
  try {
    const raw = localStorage.getItem(LOCAL_USER_KEY);
    const sig = localStorage.getItem(LOCAL_USER_SIG_KEY);
    if (!raw || !sig) return null;

    // Verify signature against DevTools manipulation
    const isValid = await securityService.verifyDataIntegrity(raw, sig);
    if (!isValid) {
      console.warn('[Security Guard]: Tampering detected in profile storage. Invalidating session.');
      clearStoredUserProfile();
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function saveStoredUserProfile(profile: UserProfile): Promise<void> {
  try {
    const raw = JSON.stringify(profile);
    const sig = await securityService.signData(raw);
    localStorage.setItem(LOCAL_USER_KEY, raw);
    localStorage.setItem(LOCAL_USER_SIG_KEY, sig);
  } catch (err) {
    console.warn('Failed to store profile securely:', err);
  }
}

export function clearStoredUserProfile(): void {
  localStorage.removeItem(LOCAL_USER_KEY);
  localStorage.removeItem(LOCAL_USER_SIG_KEY);
}

// Unified Isolated Database Service
export const dbService = {
  async fetchUserScans(userId: string): Promise<ScanRecord[]> {
    if (isSupabaseConfigured && supabase && !userId.startsWith('guest-') && !userId.startsWith('demo-')) {
      try {
        const { data, error } = await supabase
          .from('scans')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
      } catch (err) {
        return getLocalScans(userId);
      }
    }
    return getLocalScans(userId);
  },

  async insertScan(scan: ScanRecord): Promise<void> {
    saveLocalScan(scan);
    if (isSupabaseConfigured && supabase && !scan.userId.startsWith('guest-') && !scan.userId.startsWith('demo-')) {
      try {
        await supabase.from('scans').insert({
          id: scan.id,
          user_id: scan.userId,
          image_url: scan.imageUrl,
          crop_guess: scan.cropGuess,
          diagnosis: scan.diagnosis,
          confidence: scan.confidence,
          severity: scan.severity,
          treatment_text: scan.treatmentText,
          provider_used: scan.providerUsed,
          status: scan.status,
          created_at: scan.createdAt,
        });
      } catch (err) {
        // Handled silently
      }
    }
  },

  async recordFeedback(feedback: FeedbackRecord): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('feedback').insert({
          scan_id: feedback.scanId,
          user_id: feedback.userId || null,
          was_helpful: feedback.wasHelpful,
          comment: feedback.comment ? securityService.sanitizeInput(feedback.comment) : null,
          created_at: feedback.createdAt,
        });
      } catch (err) {
        // Handled silently
      }
    }
  },

  async recordConsent(consent: ConsentLog): Promise<void> {
    try {
      const logs = JSON.parse(localStorage.getItem(LOCAL_CONSENT_KEY) || '[]');
      logs.push(consent);
      localStorage.setItem(LOCAL_CONSENT_KEY, JSON.stringify(logs));
    } catch {
      // Handled silently
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('consent_log').insert({
          user_id: consent.userId || null,
          consent_type: consent.consentType,
          version: consent.version,
          language_shown: consent.languageShown,
          given_at: consent.givenAt,
        });
      } catch (err) {
        // Handled silently
      }
    }
  },
};
