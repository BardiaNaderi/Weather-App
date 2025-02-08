import { WEATHER_CODES, WEATHER_CONDITIONS } from '../constants/weatherCodes';
// Import all SVG icons
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
import haze from '../assets/icons/haze.svg';
import hurricane from '../assets/icons/hurricane.svg';
import isolatedThunderstormsDay from '../assets/icons/isolated-thunderstorms-day.svg';
import isolatedThunderstormsNight from '../assets/icons/isolated-thunderstorms-night.svg';
import rainAndSleetMix from '../assets/icons/rain-and-sleet-mix.svg';
import rainAndSnowMix from '../assets/icons/rain-and-snow-mix.svg';
import rainy1Day from '../assets/icons/rainy-1-day.svg';
import rainy1Night from '../assets/icons/rainy-1-night.svg';
import rainy1 from '../assets/icons/rainy-1.svg';
import scatteredThunderstormsDay from '../assets/icons/scattered-thunderstorms-day.svg';
import scatteredThunderstormsNight from '../assets/icons/scattered-thunderstorms-night.svg';
import snowAndSleetMix from '../assets/icons/snow-and-sleet-mix.svg';
import snowy1Day from '../assets/icons/snowy-1-day.svg';
import snowy1Night from '../assets/icons/snowy-1-night.svg';
import thunderstorms from '../assets/icons/thunderstorms.svg';
import tornado from '../assets/icons/tornado.svg';
import tropicalStorm from '../assets/icons/tropical-storm.svg';
import wind from '../assets/icons/wind.svg';

export const getWeatherIcon = (code, description = '') => {
  const lowerDescription = description.toLowerCase();
  
  // Special conditions
  if (lowerDescription.includes(WEATHER_CONDITIONS.TORNADO)) return tornado;
  if (lowerDescription.includes(WEATHER_CONDITIONS.HURRICANE)) return hurricane;
  if (lowerDescription.includes(WEATHER_CONDITIONS.TROPICAL_STORM)) return tropicalStorm;
  if (lowerDescription.includes(WEATHER_CONDITIONS.DUST)) return dust;
  if (lowerDescription.includes(WEATHER_CONDITIONS.FROST)) return frost;
  if (lowerDescription.includes(WEATHER_CONDITIONS.HAIL)) return hail;
  if (lowerDescription.includes('sleet') && lowerDescription.includes('rain')) return rainAndSleetMix;
  if (lowerDescription.includes('sleet') && lowerDescription.includes('snow')) return snowAndSleetMix;
  if (lowerDescription.includes('rain') && lowerDescription.includes('snow')) return rainAndSnowMix;
  if (lowerDescription.includes('wind')) return wind;

  const weatherCode = code.slice(0, 2);
  const isDay = code.endsWith('d');

  switch (weatherCode) {
    case WEATHER_CODES.CLEAR_SKY:
      return isDay ? clearDay : clearNight;
    
    case WEATHER_CODES.FEW_CLOUDS:
      return isDay ? cloudy1Day : cloudy1Night;
    
    case WEATHER_CODES.SCATTERED_CLOUDS:
    case WEATHER_CODES.BROKEN_CLOUDS:
      return cloudy;
    
    case WEATHER_CODES.SHOWER_RAIN:
      return isDay ? rainy1Day : rainy1Night;
    
    case WEATHER_CODES.RAIN:
      return isDay ? rainy1 : rainy1Night;
    
    case WEATHER_CODES.THUNDERSTORM:
      if (lowerDescription.includes('severe')) return severeThunderstorms;
      if (lowerDescription.includes('scattered')) {
        return isDay ? scatteredThunderstormsDay : scatteredThunderstormsNight;
      }
      if (lowerDescription.includes('isolated')) {
        return isDay ? isolatedThunderstormsDay : isolatedThunderstormsNight;
      }
      return thunderstorms;
    
    case WEATHER_CODES.SNOW:
      return isDay ? snowy1Day : snowy1Night;
    
    case WEATHER_CODES.MIST:
      if (lowerDescription.includes(WEATHER_CONDITIONS.FOG)) {
        return isDay ? fogDay : fogNight;
      }
      if (lowerDescription.includes(WEATHER_CONDITIONS.HAZE)) {
        return isDay ? hazeDay : hazeNight;
      }
      return haze;
    
    default:
      return isDay ? clearDay : clearNight;
  }
}; 