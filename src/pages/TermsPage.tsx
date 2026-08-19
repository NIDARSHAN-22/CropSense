import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, AlertTriangle, Scale, ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
          <FileText className="w-4 h-4 text-stone-600" />
          <span>Terms of Service & Advisory Conditions</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 font-sans">
          Terms & Conditions of Use
        </h1>
        <p className="text-xs text-stone-500">
          Last Updated: August 19, 2026 | Governing Jurisdiction: India
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-8 text-stone-700 text-sm leading-relaxed">
        {/* Crucial AI Disclaimer */}
        <section className="p-6 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>1. Artificial Intelligence Diagnostic Disclaimer (Crucial)</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            CropDoctor generates automated crop health assessments using computer vision neural models. 
            All diagnoses, disease identifications, chemical dosages, and organic remedies are strictly <strong>advisory recommendations</strong>. 
            They do not constitute guaranteed agricultural outcomes. CropDoctor and its developers shall not be held liable for any crop yield losses, chemical phytotoxicity, or economic damages resulting from the use or misinterpretation of automated diagnoses. Always verify high-risk chemical treatments with local Krishi Vigyan Kendra (KVK) officers or licensed agronomists.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">2. User Responsibilities & Lawful Use</h2>
          <p>
            Users agree to upload genuine photographs of plant leaves or crop sections for legitimate agricultural health assessment. Users shall not upload abusive, non-agricultural, copyrighted, or malicious imagery.
          </p>
        </section>

        {/* Free-Tier Service & Availability */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">3. Service Availability & Free Tier Limits</h2>
          <p>
            CropDoctor operates on open-source and free-tier infrastructure. While we strive for 99.9% uptime, access to external diagnosis APIs or SMS delivery is subject to third-party quotas. The service is provided on an "as-is" and "as-available" basis without warranties of uninterrupted service.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">4. Limitation of Liability & Dispute Resolution</h2>
          <p>
            To the maximum extent permitted under Indian law, the total liability of CropDoctor for any claim arising from the application shall not exceed ₹100 INR. Any legal disputes shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
        </section>
      </div>
    </div>
  );
};
