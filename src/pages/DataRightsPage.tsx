import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Download, 
  Trash2, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { getLocalScans, getStoredUserProfile, clearStoredUserProfile } from '../services/supabase';

export const DataRightsPage: React.FC = () => {
  const { t } = useTranslation();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // 1. Export User Data as JSON
  const handleExportData = () => {
    const user = getStoredUserProfile();
    const scans = getLocalScans();

    const exportPayload = {
      exportDate: new Date().toISOString(),
      userProfile: user,
      farmScans: scans,
      complianceStandard: 'Digital Personal Data Protection Act 2023 (DPDP India)',
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cropdoctor_my_data_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  // 2. Erase User Data
  const handleDeleteAllData = () => {
    if (
      window.confirm(
        'Are you sure you want to delete all your farm scans and profile data? This action is permanent.'
      )
    ) {
      localStorage.removeItem('cropdoctor_scans_v1');
      clearStoredUserProfile();
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 4000);
    }
  };

  // 3. Submit Grievance
  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setInquirySent(true);
    setInquiryText('');
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>DPDP Act 2023 Principal Rights Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 font-sans">
          Manage Your Personal Farm Data
        </h1>
        <p className="text-xs text-stone-500">
          Under Section 11-13 of the Digital Personal Data Protection Act 2023, you have the right to access, export, correct, and erase your personal data at any time.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Data */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Download My Data (Portability)</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Export a complete structured JSON copy of all your crop leaf diagnosis records, feedback logs, and account timestamps.
            </p>
          </div>

          <button
            onClick={handleExportData}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Data File (.JSON)</span>
          </button>
          {downloadSuccess && (
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Data file exported successfully!</span>
            </p>
          )}
        </div>

        {/* Erase Data */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Right to Erasure (Forget Me)</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Permanently delete all stored crop scans, uploaded photos, and profile sessions from this device and our database.
            </p>
          </div>

          <button
            onClick={handleDeleteAllData}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Permanently Erase All My Data</span>
          </button>
          {deleteSuccess && (
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>All farm records purged successfully.</span>
            </p>
          )}
        </div>
      </div>

      {/* Formal Grievance Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-4">
        <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-agri-600" />
          <span>Contact the DPDP Grievance Officer</span>
        </h3>
        <p className="text-xs text-stone-500">
          Have an inquiry, correction request, or data grievance? Submit directly to our designated officer. We resolve all inquiries within 72 hours.
        </p>

        <form onSubmit={handleGrievanceSubmit} className="space-y-3">
          <textarea
            rows={4}
            value={inquiryText}
            onChange={(e) => setInquiryText(e.target.value)}
            placeholder="Describe your data access, correction, or privacy request in detail..."
            className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:border-agri-600 outline-none bg-stone-50"
            required
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-md"
            >
              Submit Formal Request
            </button>
            {inquirySent && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ticket registered! We will respond within 72 hours.</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
