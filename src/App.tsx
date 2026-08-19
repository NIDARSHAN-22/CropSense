import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { CookieConsentBanner } from './components/legal/CookieConsentBanner';
import { ErrorBoundary } from './components/common/ErrorBoundary';

import { HomePage } from './pages/HomePage';
import { ScanPage } from './pages/ScanPage';
import { HistoryPage } from './pages/HistoryPage';
import { AdvisoryPage } from './pages/AdvisoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { DataRightsPage } from './pages/DataRightsPage';

import { UserProfile } from './types';
import { getStoredUserProfile, clearStoredUserProfile } from './services/supabase';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [sampleScanSelection, setSampleScanSelection] = useState<any>(null);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('cropdoctor_theme') || 'system';
    const root = document.documentElement;
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else if (savedTheme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    getStoredUserProfile().then((profile) => {
      if (profile) setCurrentUser(profile);
    });
  }, []);

  const handleLogout = () => {
    clearStoredUserProfile();
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleSelectSample = (sample: any) => {
    setSampleScanSelection(sample);
    setCurrentPage('scan');
  };

  const handleNavigate = (page: string) => {
    if (page !== 'scan') {
      setSampleScanSelection(null);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
        {/* Top Navigation */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-6">
          {currentPage === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onSelectSampleScan={handleSelectSample}
            />
          )}

          {currentPage === 'scan' && (
            <ScanPage
              currentUser={currentUser}
              onNavigate={handleNavigate}
              preselectedSample={sampleScanSelection}
            />
          )}

          {currentPage === 'history' && (
            <HistoryPage
              currentUser={currentUser}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'advisory' && <AdvisoryPage />}

          {currentPage === 'settings' && (
            <SettingsPage
              currentUser={currentUser}
              onUpdateUser={(updated) => setCurrentUser(updated)}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'privacy' && <PrivacyPolicyPage />}

          {currentPage === 'terms' && <TermsPage />}

          {currentPage === 'cookies' && <CookiePolicyPage />}

          {currentPage === 'rights' && <DataRightsPage />}
        </main>

        {/* DPDP Act 2023 Granular Cookie Banner */}
        <CookieConsentBanner />

        {/* Auth Modal (Phone OTP / PBKDF2 Password / Email Magic / Demo) */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />

        {/* Bottom Mobile Navigation */}
        <MobileNav currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
