import { motion, AnimatePresence } from 'framer-motion';
import { formatTemperature, formatDate, toProperCase } from '../../utils/formatters';
import { getWeatherIcon } from '../../utils/weatherIconMapper';
import { useState, useMemo } from 'react';
import { ForecastDayExpanded } from './ForecastDayExpanded';
import { groupForecastsByDay } from '../../utils/weatherUtils';

/**
 * Displays a 5-day weather forecast with expandable daily details
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.forecast - Forecast weather data
 * @returns {JSX.Element} Weather forecast component
 */
export function WeatherForecast({ forecast }) {
  const [expandedDay, setExpandedDay] = useState(null);
  const groupedForecast = useMemo(() => 
    groupForecastsByDay(forecast.list),
    [forecast.list]
  );

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
      
      <AnimatePresence mode="wait">
        {expandedDay ? (
          <ForecastDayExpanded 
            day={groupedForecast[expandedDay].dayData}
            hourlyData={groupedForecast[expandedDay].hourlyData}
            onReturn={() => setExpandedDay(null)}
          />
        ) : (
          <motion.div 
            className="forecast-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Object.entries(groupedForecast).map(([date, data], index) => (
              <motion.div 
                key={date}
                className="forecast-item"
                onClick={() => setExpandedDay(date)}
                whileHover={{ scale: 1.02 }}
              >
                <p className="forecast-date">{formatDate(data.dayData.dt)}</p>
                <motion.img 
                  src={getWeatherIcon(data.dayData.weather[0].icon)}
                  alt={data.dayData.weather[0].description}
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
                <div className="forecast-temps">
                  <span className="temp-high">H: {formatTemperature(data.dayData.main.temp_max)}</span>
                  <span className="temp-low">L: {formatTemperature(data.dayData.main.temp_min)}</span>
                </div>
                <p className="forecast-desc">
                  {toProperCase(data.dayData.weather[0].description)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 