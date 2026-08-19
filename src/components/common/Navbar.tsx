import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sprout, 
  Camera, 
  History, 
  CloudSun, 
  Globe, 
  User, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  Lock,
  Settings
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../i18n';
import { UserProfile } from '../../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Sprout },
    { id: 'scan', label: t('nav.scan'), icon: Camera, highlight: true },
    { id: 'history', label: t('nav.history'), icon: History },
    { id: 'advisory', label: t('nav.advisory'), icon: CloudSun },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-gradient-to-br from-agri-600 to-agri-900 flex items-center justify-center shadow-lg shadow-agri-900/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-agri-950 font-sans">
                  Crop<span className="text-agri-600">Doctor</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block font-medium leading-none">
                Real-Time Plant Health Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-stone-100/70 p-1.5 rounded-2xl border border-stone-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    item.highlight
                      ? 'bg-agri-600 hover:bg-agri-700 text-white shadow-md shadow-agri-600/30'
                      : isActive
                      ? 'bg-white text-agri-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-white' : isActive ? 'text-agri-600' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl border border-stone-200 hover:border-agri-500 bg-stone-50 hover:bg-white text-xs sm:text-sm font-bold text-stone-800 transition-colors shadow-sm"
                title={t('nav.language')}
              >
                <Globe className="w-4 h-4 text-agri-600" />
                <span className="font-extrabold text-agri-950">{currentLang.native}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-stone-400 border-b border-stone-100">
                    Select Your Language
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between hover:bg-agri-50 transition-colors ${
                        i18n.language === lang.code ? 'bg-agri-50 text-agri-800 font-extrabold' : 'text-stone-700'
                      }`}
                    >
                      <span className="text-base">{lang.native}</span>
                      <span className="text-xs text-stone-400">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile / Login */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div 
                  onClick={() => onNavigate('history')}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl cursor-pointer hover:bg-emerald-100 transition-colors shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-xs font-black text-emerald-950 max-w-[130px] truncate">
                    {currentUser.displayName || currentUser.phone || 'Farmer'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title={t('nav.logout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
              >
                <User className="w-4 h-4" />
                <span>{t('nav.login')}</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold ${
                  item.highlight
                    ? 'bg-agri-600 text-white font-extrabold shadow-md shadow-agri-600/30'
                    : isActive
                    ? 'bg-agri-50 text-agri-900 font-extrabold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                onNavigate('rights');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold text-stone-600 hover:bg-stone-50"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t('nav.rights')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
