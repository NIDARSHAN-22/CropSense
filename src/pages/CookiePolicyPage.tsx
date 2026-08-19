import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie, ShieldCheck, Check, Settings } from 'lucide-react';
import { consentService } from '../services/consentService';

export const CookiePolicyPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentPrefs = consentService.getCookiePreferences();

  const [functional, setFunctional] = useState(currentPrefs.functional);
  const [analytics, setAnalytics] = useState(currentPrefs.analytics);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await consentService.savePreferences(
      { necessary: true, functional, analytics },
      undefined,
      i18n.language
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const cookieList = [
    { name: 'i18nextLng', provider: 'CropDoctor (First Party)', purpose: 'Remembers farmer selected language (Hindi, Tamil, English, etc.)', duration: '1 Year', type: 'Strictly Necessary' },
    { name: 'cropdoctor_cookie_prefs_v1', provider: 'CropDoctor (First Party)', purpose: 'Stores granular DPDP consent & cookie preferences', duration: '1 Year', type: 'Strictly Necessary' },
    { name: 'cropdoctor_scans_v1', provider: 'CropDoctor (Local Cache)', purpose: 'Caches recent crop diagnostic reports on device for instant offline review', duration: 'Session / 90 Days', type: 'Functional' },
    { name: 'sb-auth-token', provider: 'Supabase Auth', purpose: 'Maintains authenticated farmer login session over secure HTTPS', duration: 'Session', type: 'Strictly Necessary' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-agri-100 text-agri-800 text-xs font-bold">
          <Cookie className="w-4 h-4 text-agri-600" />
          <span>Transparent Cookie Disclosure</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 font-sans">
          Cookie Policy & Preferences Manager
        </h1>
        <p className="text-xs text-stone-500">
          Compliant with the Digital Personal Data Protection Act 2023. No non-essential cookies are placed without your consent.
        </p>
      </div>

      {/* Interactive Preferences Controller */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-6">
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-agri-600" />
          <span>Your Granular Consent Controls</span>
        </h2>

        <div className="space-y-4 text-sm">
          {/* Necessary */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <span>Strictly Necessary Cookies</span>
                <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-bold">
                  Always Active
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Required for language selection persistence, login sessions, and basic web security.
              </p>
            </div>
            <input type="checkbox" checked disabled className="rounded text-agri-600 mt-1" />
          </div>

          {/* Functional */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-stone-900">Functional & Cache Storage</div>
              <p className="text-xs text-stone-500 mt-1">
                Caches recent crop diagnoses and image compression artifacts locally to speed up repeat scans.
              </p>
            </div>
            <input
              type="checkbox"
              checked={functional}
              onChange={(e) => setFunctional(e.target.checked)}
              className="rounded text-agri-600 mt-1 cursor-pointer"
            />
          </div>

          {/* Analytics */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-stone-900">Anonymous Performance Analytics</div>
              <p className="text-xs text-stone-500 mt-1">
                Helps us measure diagnosis pipeline latency to optimize server response times in rural areas.
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="rounded text-agri-600 mt-1 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-agri-600 hover:bg-agri-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
          {saved && (
            <span className="text-xs font-bold text-emerald-700 animate-in fade-in">
              ✓ Preferences updated and logged!
            </span>
          )}
        </div>
      </div>

      {/* Itemized Cookies Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-4">
        <h2 className="text-lg font-bold text-stone-900">Itemized Cookies Active in CropDoctor</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-stone-200 rounded-xl overflow-hidden">
            <thead className="bg-stone-100 font-bold text-stone-800">
              <tr>
                <th className="p-3 border-b">Cookie Name</th>
                <th className="p-3 border-b">Provider</th>
                <th className="p-3 border-b">Purpose</th>
                <th className="p-3 border-b">Duration</th>
                <th className="p-3 border-b">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {cookieList.map((c, i) => (
                <tr key={i}>
                  <td className="p-3 font-mono font-bold text-stone-900">{c.name}</td>
                  <td className="p-3 text-stone-600">{c.provider}</td>
                  <td className="p-3 text-stone-600">{c.purpose}</td>
                  <td className="p-3 text-stone-600">{c.duration}</td>
                  <td className="p-3 font-semibold text-agri-800">{c.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
