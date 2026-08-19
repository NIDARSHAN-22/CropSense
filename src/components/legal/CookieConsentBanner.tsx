import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Settings, Check, X } from 'lucide-react';
import { consentService } from '../../services/consentService';

export const CookieConsentBanner: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!consentService.hasConsentRecorded()) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = async () => {
    await consentService.savePreferences(
      { necessary: true, functional: true, analytics: true },
      undefined,
      i18n.language
    );
    setVisible(false);
  };

  const handleAcceptNecessary = async () => {
    await consentService.savePreferences(
      { necessary: true, functional: false, analytics: false },
      undefined,
      i18n.language
    );
    setVisible(false);
  };

  const handleSaveCustom = async () => {
    await consentService.savePreferences(
      { necessary: true, functional, analytics },
      undefined,
      i18n.language
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-stone-950/95 text-white border-t border-stone-800 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Banner Content */}
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2 text-agri-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{t('cookie.title')} (DPDP Act 2023)</span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            {t('cookie.text')}
          </p>

          {showCustom && (
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-stone-800 text-xs mt-2">
              <label className="flex items-center gap-2 text-stone-300">
                <input type="checkbox" checked disabled className="rounded text-agri-500" />
                <span>{t('cookie.necessary')} (Always Active)</span>
              </label>
              <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={functional}
                  onChange={(e) => setFunctional(e.target.checked)}
                  className="rounded text-agri-500"
                />
                <span>{t('cookie.functional')}</span>
              </label>
              <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="rounded text-agri-500"
                />
                <span>{t('cookie.analytics')}</span>
              </label>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0">
          {showCustom ? (
            <button
              onClick={handleSaveCustom}
              className="px-4 py-2 bg-agri-600 hover:bg-agri-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>{t('cookie.save')}</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-agri-600 hover:bg-agri-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                {t('cookie.acceptAll')}
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl text-xs transition-colors border border-stone-700"
              >
                {t('cookie.acceptNecessary')}
              </button>
              <button
                onClick={() => setShowCustom(true)}
                className="px-3 py-2 text-stone-400 hover:text-white font-semibold text-xs flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{t('cookie.customize')}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
