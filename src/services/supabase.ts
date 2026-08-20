import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ScanRecord, FeedbackRecord, ConsentLog, UserProfile } from '../types';
import { MOCK_SCANS } from '../data/mockScans';
import { securityService } from './securityService';

function cleanEnvVar(val: string | undefined): string {
  if (!val) return '';
  return val.trim().replace(/^["']|["']$/g, '');
}

function normalizeSupabaseUrl(raw: string): string {
  const cleaned = cleanEnvVar(raw);
  if (!cleaned) return 'https://rijoxcghdbesfdiuiqpr.supabase.co';
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    return cleaned;
  }
  if (cleaned.includes('.supabase.co')) {
    return `https://${cleaned}`;
  }
  return `https://${cleaned}.supabase.co`;
}

const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpam94Y2doZGJlc2ZkaXVpcXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMTk4MDMsImV4cCI6MjEwMjY5NTgwM30.UHBkudPBcZbiPDo9RP5VGAatV3oFNlv3Zrx9y7U4E0k';

const SUPABASE_URL = normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL || '');
const SUPABASE_ANON_KEY = cleanEnvVar(import.meta.env.VITE_SUPABASE_ANON_KEY) || DEFAULT_SUPABASE_KEY;

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

export interface UserAuthPayload {
  id: string;
  username?: string;
  phone?: string;
  email?: string;
  passwordHash?: string;
  pinHash?: string;
  loginMethod: 'phone_otp' | 'pin_pass' | 'email_pass' | 'email_magic' | 'guest';
  createdAt: string;
}

export async function saveUserCredentialsToSupabase(payload: UserAuthPayload): Promise<void> {
  try {
    const raw = localStorage.getItem('cropdoctor_user_credentials') || '[]';
    const existing: UserAuthPayload[] = JSON.parse(raw);
    const updated = [payload, ...existing.filter((u) => u.id !== payload.id)];
    localStorage.setItem('cropdoctor_user_credentials', JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to store local user credentials:', err);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('user_profiles').upsert({
        id: payload.id,
        username: payload.username || null,
        phone: payload.phone || null,
        email: payload.email || null,
        password_hash: payload.passwordHash || payload.pinHash || null,
        login_method: payload.loginMethod,
        created_at: payload.createdAt,
      });
    } catch (err) {
      console.warn('Supabase user storage error:', err);
    }
  }
}
