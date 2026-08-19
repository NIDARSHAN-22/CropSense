import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Camera, History, CloudSun, Settings } from 'lucide-react';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPage, onNavigate }) => {
  const { t } = useTranslation();

  const items = [
    { id: 'home', label: t('nav.home'), icon: Sprout },
    { id: 'scan', label: t('nav.scan'), icon: Camera, primary: true },
    { id: 'history', label: t('nav.history'), icon: History },
    { id: 'advisory', label: t('nav.advisory'), icon: CloudSun },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          if (item.primary) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center -mt-5 group"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-agri-600 to-agri-700 text-white p-3.5 shadow-lg shadow-agri-700/40 group-active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-agri-800 mt-1">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? 'text-agri-700 font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-agri-600' : 'text-stone-400'}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
