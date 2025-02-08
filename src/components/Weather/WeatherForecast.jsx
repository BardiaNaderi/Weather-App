import { motion } from 'framer-motion';
import { formatTemperature, formatDate, toProperCase } from '../../utils/formatters';
import { getWeatherIcon } from '../../utils/weatherIconMapper';

export function WeatherForecast({ forecast }) {
  if (!forecast) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="forecast"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        5-Day Forecast
      </motion.h3>
      <motion.div 
        className="forecast-list"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {forecast.list
          .filter((item, index) => index % 8 === 0)
          .map((item, index) => (
            <motion.div 
              key={index} 
              className="forecast-item"
              variants={item}
              transition={{ duration: 0.5 }}
            >
              <p className="forecast-date">{formatDate(item.dt)}</p>
              <motion.img 
                src={getWeatherIcon(item.weather[0].icon)}
                alt={item.weather[0].description}
                className="weather-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2 
                }}
              />
              <p className="forecast-temp">{formatTemperature(item.main.temp)}</p>
              <p className="forecast-desc">
                {toProperCase(item.weather[0].description)}
              </p>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
} 