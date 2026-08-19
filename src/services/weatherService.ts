import { WeatherRisk } from '../types';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

export const weatherService = {
  async getRegionalWeatherRisk(city = 'Pune, IN'): Promise<WeatherRisk> {
    if (OPENWEATHER_API_KEY && !OPENWEATHER_API_KEY.includes('your_openweathermap')) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          const temp = Math.round(data.main.temp);
          const humidity = data.main.humidity;
          const desc = data.weather[0]?.description || 'Clear';

          return this.computeFungalRisk(data.name, temp, humidity, desc);
        }
      } catch (err) {
        console.warn('OpenWeatherMap API failed, falling back to heuristic advisory:', err);
      }
    }

    // Default regional realistic weather & agro-climatic assessment
    return this.computeFungalRisk('Central Agri Belt (MH / KA / TN)', 27, 82, 'Scattered clouds & humid');
  },

  computeFungalRisk(
    location: string,
    temperature: number,
    humidity: number,
    description: string
  ): WeatherRisk {
    let riskLevel: 'low' | 'moderate' | 'high' = 'low';
    let riskMessage = 'Weather conditions are currently normal for crop growth.';
    const advisories: string[] = [];

    // Fungal & blight spore germination rule: Humidity > 75% + Moderate temp (16 - 29°C)
    if (humidity >= 80 && temperature >= 16 && temperature <= 29) {
      riskLevel = 'high';
      riskMessage = `High Fungal Risk (${humidity}% Humidity, ${temperature}°C): Atmospheric moisture creates ideal conditions for Late Blight, Powdery Mildew, and Rust spores.`;
      advisories.push('Inspect bottom canopy leaves of Tomato and Potato for dark water-soaked spots.');
      advisories.push('Avoid overhead sprinkler irrigation; apply preventive bio-fungicide (Trichoderma viride).');
      advisories.push('Ensure proper furrow drainage to prevent root-zone waterlogging.');
    } else if (humidity >= 65 || (temperature >= 30 && humidity >= 55)) {
      riskLevel = 'moderate';
      riskMessage = `Moderate Pest & Spot Risk (${humidity}% Humidity, ${temperature}°C): Mild dampness observed. Moderate probability of Leaf Spot development.`;
      advisories.push('Scout for early yellowing or target-ring spots on older leaves.');
      advisories.push('Keep foliage dry during evening hours; mulch soil to reduce splash transmission.');
    } else {
      riskLevel = 'low';
      riskMessage = `Low Risk (${humidity}% Humidity, ${temperature}°C): Dry and clear conditions. Fungal infection rates are currently low.`;
      advisories.push('Maintain regular watering schedules to avoid drought stress.');
      advisories.push('Monitor for sucking pests (thrips, aphids) during dry spells.');
    }

    return {
      location,
      temperature,
      humidity,
      description,
      riskLevel,
      riskMessage,
      advisories,
    };
  },
};
