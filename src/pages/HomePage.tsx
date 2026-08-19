import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Camera, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Leaf,
  Activity,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  Award
} from 'lucide-react';
import { WeatherRiskBanner } from '../components/weather/WeatherRiskBanner';
import { DEMO_SAMPLE_IMAGES } from '../data/mockScans';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectSampleScan: (sample: typeof DEMO_SAMPLE_IMAGES[0]) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectSampleScan }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-10 sm:space-y-16 py-6 sm:py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-agri-950 via-agri-900 to-stone-900 text-white rounded-3xl p-6 sm:p-12 lg:p-16 shadow-2xl border border-agri-800/40">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-agri-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-agri-300 shadow-sm animate-float">
            <Sparkles className="w-4 h-4 text-sun" />
            <span>{t('hero.badge')}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto font-sans">
            {t('hero.title')}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => onNavigate('scan')}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-agri-950 font-black rounded-2xl text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] group"
            >
              <Camera className="w-5 h-5 text-agri-950" />
              <span>{t('hero.scanBtn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('advisory')}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-sm border border-white/15 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4 text-agri-300" />
              <span>{t('nav.advisory')}</span>
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-white/10 text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans">38+</div>
              <div className="text-xs text-stone-300 font-medium mt-0.5">{t('hero.statAccuracy')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-sans">7</div>
              <div className="text-xs text-stone-300 font-medium mt-0.5">{t('hero.statLanguages')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-teal-300 font-sans">&lt; 10s</div>
              <div className="text-xs text-stone-300 font-medium mt-0.5">{t('hero.statSpeed')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-white font-sans">100%</div>
              <div className="text-xs text-stone-300 font-medium mt-0.5">{t('hero.statCost')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Weather & Blight Spore Alert */}
      <section className="max-w-5xl mx-auto">
        <WeatherRiskBanner onOpenAdvisory={() => onNavigate('advisory')} />
      </section>

      {/* 3-Step Process Cards */}
      <section className="max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-agri-700 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-agri-600" />
            <span>Intuitive Field Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-sans">
            {t('steps.title')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
            {t('steps.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-lg transition-all hover:border-agri-400 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-stone-900">{t('steps.step1Title')}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t('steps.step1Desc')}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-lg transition-all hover:border-agri-400 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-agri-100 text-agri-800 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-stone-900">{t('steps.step2Title')}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t('steps.step2Desc')}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-lg transition-all hover:border-agri-400 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-stone-900">{t('steps.step3Title')}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{t('steps.step3Desc')}</p>
          </div>
        </div>
      </section>

      {/* Interactive Sample Demo Section */}
      <section className="max-w-5xl mx-auto bg-stone-100/80 rounded-3xl p-6 sm:p-8 border border-stone-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-agri-700 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-sun" />
              <span>Instant 1-Click Interactive Evaluation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1 font-sans">
              Test Pre-Diagnosed Disease Samples
            </h3>
          </div>
          <button
            onClick={() => onNavigate('scan')}
            className="text-xs font-bold text-agri-700 hover:text-agri-900 flex items-center gap-1 self-start sm:self-center"
          >
            <span>Scan custom leaf photo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {DEMO_SAMPLE_IMAGES.map((sample, idx) => (
            <div
              key={idx}
              onClick={() => onSelectSampleScan(sample)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md hover:border-agri-500 cursor-pointer group transition-all"
            >
              <div className="h-28 overflow-hidden relative bg-stone-950">
                <img
                  src={sample.url}
                  alt={sample.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                  {sample.cropKey.toUpperCase()}
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-stone-900 group-hover:text-agri-700 truncate">
                  {sample.name}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-agri-600 font-semibold mt-1">
                  <span>Diagnose</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security & DPDP Compliance Banner */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-stone-900">
                Guaranteed Data Isolation & DPDP Act 2023 Compliance
              </h4>
              <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
                CropDoctor strictly isolates all farm records. Stored sessions are cryptographically signed against DevTools tampering, passwords use PBKDF2 salt hashing, and personal data is never shared.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('privacy')}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shrink-0 transition-colors shadow-sm"
          >
            Read DPDP Notice
          </button>
        </div>
      </section>
    </div>
  );
};
