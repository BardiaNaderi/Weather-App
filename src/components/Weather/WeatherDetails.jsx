import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { formatTemperature, toProperCase } from '../../utils/formatters';
import { getWeatherIcon } from '../../utils/weatherIconMapper';

export function WeatherDetails({ weather }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div 
      className="current-weather"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Current Weather
      </motion.h3>
      
      <motion.p 
        className="weather-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {toProperCase(weather.weather[0].description)}
      </motion.p>

      <div className="weather-main">
        <motion.img 
          src={getWeatherIcon(weather.weather[0].icon)}
          alt={weather.weather[0].description}
          className="weather-icon current"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
        />
        <motion.div 
          className="temperature"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
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

      <motion.button
        className="details-toggle"
        onClick={() => setShowDetails(!showDetails)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {showDetails ? 'Hide Details' : 'See More Details'}
      </motion.button>

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