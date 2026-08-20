import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Laptop, 
  User, 
  Phone, 
  Mail, 
  Download, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  Save, 
  AlertTriangle,
  Lock
} from 'lucide-react';
import { UserProfile } from '../types';
import { 
  saveStoredUserProfile, 
  saveUserCredentialsToSupabase,
  clearStoredUserProfile, 
  getLocalScans, 
  isSupabaseConfigured, 
  supabase 
} from '../services/supabase';
import { securityService } from '../services/securityService';

interface SettingsPageProps {
  currentUser: UserProfile | null;
  onUpdateUser: (user: UserProfile | null) => void;
  onNavigate: (page: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  currentUser,
  onUpdateUser,
  onNavigate,
}) => {
  const { t, i18n } = useTranslation();

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    return (localStorage.getItem('cropdoctor_theme') as any) || 'system';
  });

  // Profile Form state
  const [name, setName] = useState(currentUser?.displayName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Deletion modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || '');
      setPhone(currentUser.phone || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  // Apply Theme
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('cropdoctor_theme', newTheme);

    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // System
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  // Save Profile Changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: UserProfile = {
      id: currentUser?.id || `user-${Date.now()}`,
      displayName: securityService.sanitizeInput(name),
      phone: securityService.sanitizeInput(phone),
      email: securityService.sanitizeInput(email),
      preferredLanguage: i18n.language,
      createdAt: currentUser?.createdAt || new Date().toISOString(),
      isGuest: false,
    };

    await saveStoredUserProfile(updatedUser);
    await saveUserCredentialsToSupabase({
      id: updatedUser.id,
      username: updatedUser.displayName,
      phone: updatedUser.phone,
      email: updatedUser.email,
      loginMethod: 'pin_pass',
      createdAt: updatedUser.createdAt,
    });

    onUpdateUser(updatedUser);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Export User Data
  const handleExportData = () => {
    const userId = currentUser?.id || 'guest-farmer';
    const scans = getLocalScans(userId);
    const consentLogs = JSON.parse(localStorage.getItem('cropdoctor_consent_logs_v1') || '[]');

    const fullExport = {
      exportTimestamp: new Date().toISOString(),
      userProfile: currentUser || { id: 'guest-farmer', displayName: 'Guest' },
      scansCount: scans.length,
      scans,
      consentRecords: consentLogs,
      complianceNote: 'Exported under DPDP Act 2023 / DPDP Rules 2025 Right to Data Portability.',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cropdoctor_data_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Delete Account & Purge Data
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      if (isSupabaseConfigured && supabase && currentUser?.id && !currentUser.isGuest) {
        await supabase.from('scans').delete().eq('user_id', currentUser.id);
        await supabase.from('profiles').delete().eq('id', currentUser.id);
      }
    } catch (err) {
      console.warn('Backend purge note:', err);
    }

    // Purge local storage
    clearStoredUserProfile();
    localStorage.removeItem('cropdoctor_scans_v1');
    localStorage.removeItem('cropdoctor_consent_logs_v1');
    localStorage.removeItem('cropdoctor_cookie_consent_v1');

    onUpdateUser(null);
    setIsDeleting(false);
    setShowDeleteModal(false);
    onNavigate('home');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-agri-700 text-xs font-bold uppercase tracking-wider">
          <SettingsIcon className="w-4 h-4 text-agri-600" />
          <span>User Control Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-sans">
          {t('settings.title')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          {t('settings.subtitle')}
        </p>
      </div>

      {/* SECTION 1: Theme & Appearance */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <h2 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500" />
          <span>{t('settings.themeTitle')}</span>
        </h2>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleThemeChange('light')}
            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 font-bold text-xs transition-all ${
              theme === 'light'
                ? 'border-agri-600 bg-agri-50 dark:bg-agri-950/40 text-agri-900 dark:text-agri-300 shadow-sm'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
            }`}
          >
            <Sun className="w-6 h-6 text-amber-500" />
            <span>{t('settings.themeLight')}</span>
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 font-bold text-xs transition-all ${
              theme === 'dark'
                ? 'border-agri-600 bg-agri-50 dark:bg-agri-950/40 text-agri-900 dark:text-agri-300 shadow-sm'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
            }`}
          >
            <Moon className="w-6 h-6 text-indigo-500" />
            <span>{t('settings.themeDark')}</span>
          </button>

          <button
            onClick={() => handleThemeChange('system')}
            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 font-bold text-xs transition-all ${
              theme === 'system'
                ? 'border-agri-600 bg-agri-50 dark:bg-agri-950/40 text-agri-900 dark:text-agri-300 shadow-sm'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
            }`}
          >
            <Laptop className="w-6 h-6 text-stone-500" />
            <span>{t('settings.themeSystem')}</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: Profile Management */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            <span>{t('settings.profileTitle')}</span>
          </h2>
          <span className="text-[11px] font-bold text-stone-400 flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" />
            PBKDF2 Secured
          </span>
        </div>

        {saveSuccess && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-xs font-bold text-emerald-800 dark:text-emerald-300 rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t('settings.profileSaved')}</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              {t('settings.nameLabel')}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 dark:bg-stone-800 text-xs sm:text-sm font-semibold text-stone-900 dark:text-white outline-none focus:border-agri-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {t('settings.phoneLabel')}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 dark:bg-stone-800 text-xs sm:text-sm font-semibold text-stone-900 dark:text-white outline-none focus:border-agri-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {t('settings.emailLabel')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. farmer@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 dark:bg-stone-800 text-xs sm:text-sm font-semibold text-stone-900 dark:text-white outline-none focus:border-agri-600"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="py-3 px-6 bg-agri-600 hover:bg-agri-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-agri-600/30 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{t('settings.saveProfile')}</span>
          </button>
        </form>
      </div>

      {/* SECTION 3: Data Export */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            <span>{t('settings.dataExportTitle')}</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xl">
            {t('settings.dataExportDesc')}
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="px-5 py-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>{t('settings.exportBtn')}</span>
        </button>
      </div>

      {/* SECTION 4: Account Deletion (DPDP Act Right to Erasure) */}
      <div className="bg-red-50/70 dark:bg-red-950/30 rounded-3xl p-6 sm:p-7 border border-red-200 dark:border-red-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base font-extrabold text-red-900 dark:text-red-300 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            <span>{t('settings.deleteAccountTitle')}</span>
          </h2>
          <p className="text-xs text-red-700 dark:text-red-400 max-w-xl">
            {t('settings.deleteAccountDesc')}
          </p>
        </div>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition-colors shrink-0"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t('settings.deleteBtn')}</span>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full border border-stone-200 dark:border-stone-800 space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                Confirm Permanent Account Deletion
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t('settings.deleteConfirm')}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-white rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/30"
              >
                {isDeleting ? 'Erasing Data...' : 'Yes, Delete Everything'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
