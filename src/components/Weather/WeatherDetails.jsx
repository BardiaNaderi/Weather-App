import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { formatTemperature, toProperCase, formatHour } from '../../utils/formatters';
import { getWeatherIcon } from '../../utils/weatherIconMapper';
import { fadeIn, slideUp, scaleIn } from '../../constants/animations';

/**
 * Displays current weather information with expandable details and hourly forecast
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.weather - Current weather data
 * @param {Array<Object>} [props.hourlyForecast] - Optional hourly forecast data
 * @returns {JSX.Element} Weather details component
 */
export function WeatherDetails({ weather, hourlyForecast }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showHourly, setShowHourly] = useState(false);

  return (
    <motion.div className="current-weather" {...fadeIn}>
      <motion.h3 {...slideUp}>Current Weather</motion.h3>
      <motion.p className="weather-description" {...fadeIn}>
        {toProperCase(weather.weather[0].description)}
      </motion.p>
      <div className="weather-main">
        <motion.img 
          src={getWeatherIcon(weather.weather[0].icon)}
          alt={weather.weather[0].description}
          className="weather-icon current"
          {...scaleIn}
        />
        <motion.div className="temperature" {...fadeIn}>
          <span className="temp-main">
            {formatTemperature(weather.main.temp)}
          </span>
          <div className="temp-range">
            <span>H: {formatTemperature(weather.main.temp_max)}</span>
            <span>L: {formatTemperature(weather.main.temp_min)}</span>
          </div>
          <span className="temp-feels">
            Feels like: {formatTemperature(weather.main.feels_like)}
          </span>
        </motion.div>
      </div>

      <div className="button-group">
        <motion.button
          className="details-toggle"
          onClick={() => setShowDetails(!showDetails)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {showDetails ? 'Hide Details' : 'See More Details'}
        </motion.button>
        
        {hourlyForecast && (
          <motion.button
            className="hourly-toggle"
            onClick={() => setShowHourly(!showHourly)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {showHourly ? 'Hide Hourly Forecast' : 'See Today\'s Hourly Forecast'}
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showHourly && hourlyForecast && (
          <motion.div 
            className="hourly-forecast-grid"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="hourly-forecast-item">
                <span className="hour">{formatHour(hour.dt)}</span>
                <img 
                  src={getWeatherIcon(hour.weather[0].icon)}
                  alt={hour.weather[0].description}
                  className="weather-icon small"
                />
                <span className="temp">{formatTemperature(hour.main.temp)}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDetails && (
          <motion.div 
            className="weather-details-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            {weather.rain && <p>Precipitation: {weather.rain['1h']}mm</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 