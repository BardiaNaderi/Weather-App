import { WEATHER_CODES, WEATHER_CONDITIONS } from '../constants/weatherCodes';
import clearDay from '../assets/icons/clear-day.svg';
import clearNight from '../assets/icons/clear-night.svg';
import cloudy1Day from '../assets/icons/cloudy-1-day.svg';
import cloudy1Night from '../assets/icons/cloudy-1-night.svg';
import cloudy from '../assets/icons/cloudy.svg';
import dust from '../assets/icons/dust.svg';
import fogDay from '../assets/icons/fog-day.svg';
import fogNight from '../assets/icons/fog-night.svg';
import frost from '../assets/icons/frost.svg';
import hail from '../assets/icons/hail.svg';
import hazeDay from '../assets/icons/haze-day.svg';
import hazeNight from '../assets/icons/haze-night.svg';
import hurricane from '../assets/icons/hurricane.svg';
import isolatedThunderstormsDay from '../assets/icons/isolated-thunderstorms-day.svg';
import isolatedThunderstormsNight from '../assets/icons/isolated-thunderstorms-night.svg';
import rainAndSleetMix from '../assets/icons/rain-and-sleet-mix.svg';
import rainAndSnowMix from '../assets/icons/rain-and-snow-mix.svg';
import rainy1Day from '../assets/icons/rainy-1-day.svg';
import rainy1Night from '../assets/icons/rainy-1-night.svg';
import rainy1 from '../assets/icons/rainy-1.svg';
import severeThunderstorms from '../assets/icons/severe-thunderstorm.svg';
import scatteredThunderstormsDay from '../assets/icons/scattered-thunderstorms-day.svg';
import scatteredThunderstormsNight from '../assets/icons/scattered-thunderstorms-night.svg';
import snowAndSleetMix from '../assets/icons/snow-and-sleet-mix.svg';
import snowy1Day from '../assets/icons/snowy-1-day.svg';
import snowy1Night from '../assets/icons/snowy-1-night.svg';
import thunderstorms from '../assets/icons/thunderstorms.svg';
import tornado from '../assets/icons/tornado.svg';
import tropicalStorm from '../assets/icons/tropical-storm.svg';
import wind from '../assets/icons/wind.svg';

const ICON_MAPPINGS = {
  special: {
    [WEATHER_CONDITIONS.TORNADO]: tornado,
    [WEATHER_CONDITIONS.HURRICANE]: hurricane,
    [WEATHER_CONDITIONS.TROPICAL_STORM]: tropicalStorm,
    [WEATHER_CONDITIONS.DUST]: dust,
    [WEATHER_CONDITIONS.FROST]: frost,
    [WEATHER_CONDITIONS.HAIL]: hail,
    'rain sleet': rainAndSleetMix,
    'snow sleet': snowAndSleetMix,
    'rain snow': rainAndSnowMix,
    'wind': wind
  },
  codes: {
    [WEATHER_CODES.CLEAR_SKY]: {
      day: clearDay,
      night: clearNight
    },
    [WEATHER_CODES.FEW_CLOUDS]: {
      day: cloudy1Day,
      night: cloudy1Night
    },
    [WEATHER_CODES.SCATTERED_CLOUDS]: {
      day: cloudy,
      night: cloudy
    },
    [WEATHER_CODES.BROKEN_CLOUDS]: {
      day: cloudy,
      night: cloudy
    },
    [WEATHER_CODES.SHOWER_RAIN]: {
      day: rainy1Day,
      night: rainy1Night
    },
    [WEATHER_CODES.RAIN]: {
      day: rainy1,
      night: rainy1Night
    },
    [WEATHER_CODES.THUNDERSTORM]: {
      day: thunderstorms,
      night: thunderstorms,
      severe: severeThunderstorms,
      scattered: {
        day: scatteredThunderstormsDay,
        night: scatteredThunderstormsNight
      },
      isolated: {
        day: isolatedThunderstormsDay,
        night: isolatedThunderstormsNight
      }
    },
    [WEATHER_CODES.SNOW]: {
      day: snowy1Day,
      night: snowy1Night
    },
    [WEATHER_CODES.MIST]: {
      day: hazeDay,
      night: hazeNight,
      fog: {
        day: fogDay,
        night: fogNight
      },
      haze: {
        day: hazeDay,
        night: hazeNight
      }
    }
  }
};

/**
 * Maps weather codes and descriptions to corresponding weather icons
 * @param {string} code - Weather condition code from API
 * @param {string} description - Weather condition description
 * @returns {string} Path to the corresponding weather icon
 */
export const getWeatherIcon = (code, description = '') => {
  const lowerDescription = description.toLowerCase();
  const weatherCode = code.slice(0, 2);
  const isDay = code.endsWith('d');
  
  for (const [condition, icon] of Object.entries(ICON_MAPPINGS.special)) {
    if (lowerDescription.includes(condition)) return icon;
  }
  
  const codeMapping = ICON_MAPPINGS.codes[weatherCode];
  if (!codeMapping) return isDay ? clearDay : clearNight;
  
  if (weatherCode === WEATHER_CODES.THUNDERSTORM) {
    if (lowerDescription.includes('severe')) return codeMapping.severe;
    if (lowerDescription.includes('scattered')) {
      return isDay ? codeMapping.scattered.day : codeMapping.scattered.night;
    }
    if (lowerDescription.includes('isolated')) {
      return isDay ? codeMapping.isolated.day : codeMapping.isolated.night;
    }
  }
  
  if (weatherCode === WEATHER_CODES.MIST) {
    if (lowerDescription.includes(WEATHER_CONDITIONS.FOG)) {
      return isDay ? codeMapping.fog.day : codeMapping.fog.night;
    }
    if (lowerDescription.includes(WEATHER_CONDITIONS.HAZE)) {
      return isDay ? codeMapping.haze.day : codeMapping.haze.night;
    }
  }
  
  return isDay ? codeMapping.day : codeMapping.night;
}; 