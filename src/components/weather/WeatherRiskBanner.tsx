import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloudRain, AlertTriangle, ShieldCheck, Thermometer, Droplets, ArrowRight } from 'lucide-react';
import { weatherService } from '../../services/weatherService';
import { WeatherRisk } from '../../types';

interface WeatherRiskBannerProps {
  onOpenAdvisory?: () => void;
}

export const WeatherRiskBanner: React.FC<WeatherRiskBannerProps> = ({ onOpenAdvisory }) => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherRisk | null>(null);

  useEffect(() => {
    weatherService.getRegionalWeatherRisk().then(setWeather);
  }, []);

  if (!weather) return null;

  const isHighRisk = weather.riskLevel === 'high';
  const isModRisk = weather.riskLevel === 'moderate';

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all shadow-sm ${
        isHighRisk
          ? 'bg-red-50/90 border-red-200 text-red-950'
          : isModRisk
          ? 'bg-amber-50/90 border-amber-200 text-amber-950'
          : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Indicator */}
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isHighRisk
                ? 'bg-red-500 text-white'
                : isModRisk
                ? 'bg-amber-500 text-white'
                : 'bg-emerald-500 text-white'
            }`}
          >
            {isHighRisk ? (
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            ) : isModRisk ? (
              <CloudRain className="w-5 h-5" />
            ) : (
              <ShieldCheck className="w-5 h-5" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-75">
                {t('advisory.riskLevel')}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/60">
                {weather.location}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold mt-0.5 leading-snug">
              {weather.riskMessage}
            </p>
          </div>
        </div>

        {/* Right Metrics */}
        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
          <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/70">
            <Thermometer className="w-3.5 h-3.5 text-stone-500" />
            <span>{weather.temperature}°C</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/70">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            <span>{weather.humidity}% Humidity</span>
          </div>

          {onOpenAdvisory && (
            <button
              onClick={onOpenAdvisory}
              className="p-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 transition-colors"
              title="View full advisory"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
