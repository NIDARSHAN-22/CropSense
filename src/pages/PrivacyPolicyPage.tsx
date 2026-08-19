import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Mail, Lock, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>India DPDP Act 2023 & DPDP Rules 2025 Notice</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 font-sans">
          {isHindi ? 'गोपनीयता नीति एवं सहमति सूचना' : 'Privacy Policy & Consent Notice'}
        </h1>
        <p className="text-xs text-stone-500">
          Last Updated: August 19, 2026 | Version: 2025.1.0 | Applicable Law: Digital Personal Data Protection Act 2023 (India)
        </p>
      </div>

      {/* Main Privacy Notice Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-8 text-stone-700 text-sm leading-relaxed">
        {/* Section 1: Data Fiduciary Identity */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center text-xs font-bold">1</span>
            {isHindi ? '1. डेटा न्यासी (Data Fiduciary) का विवरण' : '1. Identity of the Data Fiduciary'}
          </h2>
          <p>
            {isHindi
              ? 'यह डिजिटल प्लेटफॉर्म CropDoctor (डाटा न्यासी) द्वारा संचालित है। हम भारतीय डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 के तहत आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए पूर्णतः प्रतिबद्ध हैं।'
              : 'This platform is operated by CropDoctor ("Data Fiduciary"). We are committed to protecting the privacy, dignity, and personal data of farmers in full compliance with the Digital Personal Data Protection Act 2023 (DPDP Act) and DPDP Rules 2025.'}
          </p>
        </section>

        {/* Section 2: Itemized Personal Data & Purpose */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center text-xs font-bold">2</span>
            {isHindi ? '2. एकत्र किया जाने वाला व्यक्तिगत डेटा और उद्देश्य' : '2. Itemized Personal Data Collected & Purpose'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-stone-200 rounded-xl overflow-hidden">
              <thead className="bg-stone-100 font-bold text-stone-800">
                <tr>
                  <th className="p-3 border-b">Data Item</th>
                  <th className="p-3 border-b">Purpose for Collection</th>
                  <th className="p-3 border-b">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="p-3 font-semibold">Mobile Phone Number</td>
                  <td className="p-3">Account authentication via OTP and farm scan history recovery</td>
                  <td className="p-3">Explicit Consent</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Uploaded Crop Leaf Images</td>
                  <td className="p-3">Automated AI image classification to diagnose plant diseases and pests</td>
                  <td className="p-3">Service Delivery Consent</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Farming Region / Location Hint</td>
                  <td className="p-3">Localized weather-driven fungal/bacterial risk calculation & KVK directory</td>
                  <td className="p-3">Explicit Consent</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Language Preference</td>
                  <td className="p-3">Serving diagnosis reports & voice audio in farmer's preferred native language</td>
                  <td className="p-3">User Preference</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Third Party Processors & Cross Border Disclosure */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center text-xs font-bold">3</span>
            {isHindi ? '3. तीसरे पक्ष के डेटा प्रोसेसर और सीमा पार हस्तांतरण' : '3. Third-Party Processors & Cross-Border Data Transfer'}
          </h2>
          <p>
            In accordance with DPDP Section 6, we disclose that uploaded crop photos are transmitted via encrypted HTTPS to third-party inference engines (Hugging Face Inference API / Kindwise crop.health) solely for machine learning classification. These processors do not associate the crop image with your identity or phone number.
          </p>
        </section>

        {/* Section 4: Data Principal Rights */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center text-xs font-bold">4</span>
            {isHindi ? '4. डेटा स्वामी (Data Principal) के अधिकार' : '4. Rights of the Data Principal (Farmer)'}
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0 mt-0.5" />
              <span><strong>Right to Access:</strong> View all past crop scans and diagnostic records in your dashboard.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0 mt-0.5" />
              <span><strong>Right to Correction & Erasure:</strong> Delete any scan or request total account data erasure at any time.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0 mt-0.5" />
              <span><strong>Right to Withdraw Consent:</strong> Withdraw cookie or optional processing consent as easily as it was granted.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-agri-600 shrink-0 mt-0.5" />
              <span><strong>Right to Grievance Redressal:</strong> Direct escalation to our designated Grievance Officer with 72-hour turnaround.</span>
            </li>
          </ul>
        </section>

        {/* Section 5: Data Retention & Deletion */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center text-xs font-bold">5</span>
            {isHindi ? '5. डेटा प्रतिधारण और विलोपन' : '5. Data Retention & Deletion Policy'}
          </h2>
          <p>
            Farmer scan records are retained for a maximum of 24 months to enable seasonal comparison across harvest cycles. Inactive guest sessions and cached images are automatically pruned after 90 days. Users may trigger instant deletion via the Data Rights portal.
          </p>
        </section>

        {/* Section 6: 72-Hour Data Breach Notification */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-agri-100 text-agri-800 flex items-center justify-center text-xs font-bold">6</span>
            {isHindi ? '6. डेटा उल्लंघन सूचना प्रतिबद्धता (72 घंटे)' : '6. 72-Hour Breach Notification Standard'}
          </h2>
          <p>
            In the unlikely event of any security breach affecting personal data, CropDoctor will notify the Data Protection Board of India and all affected users within 72 hours of becoming aware of the incident, along with remediation measures.
          </p>
        </section>

        {/* Section 7: Grievance Redressal Officer */}
        <section className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
          <h3 className="text-base font-bold text-stone-900">
            {isHindi ? 'शिकायत निवारण अधिकारी संपर्क' : 'Designated DPDP Grievance Officer'}
          </h3>
          <p className="text-xs text-stone-600">
            For inquiries, consent withdrawals, or privacy grievances, please write to:
          </p>
          <div className="text-xs space-y-1 text-stone-800 font-semibold">
            <p>Name: Agronomist & Data Privacy Officer</p>
            <p>Email: <a href="mailto:grievance@cropdoctor.app" className="text-agri-700 underline">grievance@cropdoctor.app</a></p>
            <p>Response Time: Within 72 hours</p>
          </div>
        </section>
      </div>
    </div>
  );
};
