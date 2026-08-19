import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CloudSun, 
  Droplets, 
  Thermometer, 
  Wind, 
  PhoneCall, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { weatherService } from '../services/weatherService';
import { WeatherRisk } from '../types';

export const AdvisoryPage: React.FC = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherRisk | null>(null);
  const [cityInput, setCityInput] = useState('Pune, IN');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeather(cityInput);
  }, []);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    const data = await weatherService.getRegionalWeatherRisk(city);
    setWeather(data);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      fetchWeather(cityInput.trim());
    }
  };

  const kvkCenters = [
    { name: 'Kisan Call Center (All India Toll-Free)', phone: '1800-180-1551', timing: '6:00 AM - 10:00 PM' },
    { name: 'Central Potato Research Institute (CPRI)', phone: '0177-2625070', focus: 'Blight & Tuber Health' },
    { name: 'Indian Agricultural Research Institute (IARI / Pusa)', phone: '011-25841471', focus: 'Agronomy & Pest Warning' },
    { name: 'Tamil Nadu Agricultural University (TNAU) Agritech', phone: '0422-6611200', focus: 'Paddy & Cotton Health' },
    { name: 'Punjab Agricultural University (PAU) Help Line', phone: '0161-2401960', focus: 'Wheat, Rice & Maize Advisory' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="space-y-1 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <CloudSun className="w-4 h-4 text-blue-600" />
          <span>Fungal & Agro-Climate Radar</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-sans">
          {t('advisory.title')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">{t('advisory.subtitle')}</p>
      </div>

      {/* Weather Search & Live Metrics Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Enter your farming district / city (e.g. Nashik, Coimbatore, Ludhiana)"
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-stone-300 focus:border-agri-600 outline-none bg-stone-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shrink-0 shadow-md"
          >
            {loading ? 'Checking...' : 'Check Fungal Risk'}
          </button>
        </form>

        {weather && (
          <div className="space-y-6 pt-4 border-t border-stone-100">
            {/* Main Risk Status */}
            <div
              className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                weather.riskLevel === 'high'
                  ? 'bg-red-50/90 border-red-200 text-red-950'
                  : weather.riskLevel === 'moderate'
                  ? 'bg-amber-50/90 border-amber-200 text-amber-950'
                  : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white ${
                    weather.riskLevel === 'high'
                      ? 'bg-red-600 animate-pulse'
                      : weather.riskLevel === 'moderate'
                      ? 'bg-amber-600'
                      : 'bg-emerald-600'
                  }`}
                >
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-80">
                    Spore Germination Warning
                  </span>
                  <h3 className="text-base sm:text-xl font-bold mt-0.5">{weather.riskMessage}</h3>
                </div>
              </div>

              {/* Climate Numbers */}
              <div className="flex items-center gap-4 bg-white/80 p-3 rounded-xl backdrop-blur-sm self-stretch md:self-auto justify-around">
                <div className="text-center">
                  <div className="text-stone-400 text-[10px] uppercase font-bold">Temp</div>
                  <div className="text-base font-extrabold text-stone-800">
                    {weather.temperature}°C
                  </div>
                </div>
                <div className="w-px h-8 bg-stone-200" />
                <div className="text-center">
                  <div className="text-stone-400 text-[10px] uppercase font-bold">Humidity</div>
                  <div className="text-base font-extrabold text-blue-700">{weather.humidity}%</div>
                </div>
              </div>
            </div>

            {/* Practical Action Recommendations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Recommended Agronomic Actions for this Week
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {weather.advisories.map((adv: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-agri-600 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Krishi Vigyan Kendra (KVK) Directory */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
        <div>
          <div className="flex items-center gap-2 text-agri-700 text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-4 h-4" />
            <span>Official Government Help Desks</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 mt-1">{t('advisory.kvkTitle')}</h3>
          <p className="text-xs text-stone-500">{t('advisory.kvkSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kvkCenters.map((center, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-agri-400 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <h4 className="font-bold text-sm text-stone-900">{center.name}</h4>
                {center.focus && (
                  <span className="text-[11px] text-agri-700 font-medium">{center.focus}</span>
                )}
                {center.timing && (
                  <p className="text-[10px] text-stone-400 mt-0.5">{center.timing}</p>
                )}
              </div>

              <a
                href={`tel:${center.phone.replace(/[^0-9]/g, '')}`}
                className="py-2.5 px-4 bg-agri-700 hover:bg-agri-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {center.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
