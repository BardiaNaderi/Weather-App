import { motion } from 'framer-motion';
import { formatTemperature, toProperCase } from '../../utils/formatters';
import { getWeatherIcon } from '../../utils/weatherIconMapper';

export function WeatherDetails({ weather }) {
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
          <span className="temp-feels">
            Feels like: {formatTemperature(weather.main.feels_like)}
          </span>
        </motion.div>
      </div>
      <motion.div 
        className="weather-details"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p>Humidity: {weather.main.humidity}%</p>
        <p>{toProperCase(weather.weather[0].description)}</p>
      </motion.div>
    </motion.div>
  );
} 