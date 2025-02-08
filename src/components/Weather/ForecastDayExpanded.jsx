import { motion } from 'framer-motion';
import { formatHour, formatTemperature, formatDate } from '../../utils/formatters';
import { getWeatherIcon } from '../../utils/weatherIconMapper';

export function ForecastDayExpanded({ day, hourlyData, onReturn }) {
  return (
    <motion.div 
      className="forecast-day-expanded"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="expanded-header">
        <h4>{formatDate(day.dt)}</h4>
        <button onClick={onReturn}>Return to Forecast</button>
      </div>
      
      <div className="hourly-forecast-grid">
        {hourlyData.map((hour, index) => (
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
      </div>
    </motion.div>
  );
}