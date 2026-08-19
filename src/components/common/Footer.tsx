import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Shield, Mail, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-24 md:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-agri-600 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Crop<span className="text-agri-400">Doctor</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Empowering farmers with free, instant AI crop disease diagnostics, organic pest remedies, and localized agricultural advisory across 7 Indian languages.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <Shield className="w-4 h-4" />
              <span>DPDP Act 2023 Compliant</span>
            </div>
          </div>

          {/* Col 2: Quick Features */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Features & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('scan')} className="hover:text-agri-400 transition-colors">
                  Leaf Disease Scanner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="hover:text-agri-400 transition-colors">
                  Farmer Scan Timeline
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('advisory')} className="hover:text-agri-400 transition-colors">
                  Fungal & Blight Risk Radar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('advisory')} className="hover:text-agri-400 transition-colors">
                  KVK Agri-Helpline Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & DPDP Compliance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Legal & Compliance (India)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-agri-400 transition-colors">
                  {t('legal.privacy')} (DPDP Notice)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-agri-400 transition-colors">
                  {t('legal.terms')} & AI Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cookies')} className="hover:text-agri-400 transition-colors">
                  {t('legal.cookies')} (Granular Consent)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rights')} className="hover:text-agri-400 transition-colors text-agri-300 font-medium">
                  {t('legal.rights')} (Data Portal)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Grievance Officer & Help Desk */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              DPDP Grievance Officer
            </h4>
            <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700 text-xs space-y-1.5">
              <p className="font-semibold text-stone-200">
                Designated Grievance Redressal
              </p>
              <div className="flex items-center gap-1.5 text-stone-300">
                <Mail className="w-3.5 h-3.5 text-agri-400" />
                <a href="mailto:grievance@cropdoctor.app" className="hover:underline">
                  grievance@cropdoctor.app
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <PhoneCall className="w-3.5 h-3.5 text-agri-400" />
                <span>Kisan Call Center: 1800-180-1551</span>
              </div>
              <p className="text-[10px] text-stone-400 pt-1 border-t border-stone-700">
                Data Principal response SLA: Within 72 hours
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 border-t border-stone-800 text-[11px] text-stone-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            {t('legal.disclaimer')}
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} CropDoctor. Built for Indian & Global Farmers.
          </p>
        </div>
      </div>
    </footer>
  );
};
