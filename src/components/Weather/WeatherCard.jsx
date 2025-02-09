import { motion, AnimatePresence } from 'framer-motion';
import { WeatherDetails } from './WeatherDetails';
import { WeatherForecast } from './WeatherForecast';
import { useWeather } from '../../hooks/useWeather';
import { slideUp } from '../../constants/animations';
import { useMemo } from 'react';

// Possible Improvements: UX & Security Improvements
// - Add loading states
// - Implement proper error boundaries
// - Add input sanitization
// - Add proper TypeScript types
// - Add accessibility attributes
// - Add proper prop validation
// - Implement memoization for expensive calculations

/**
 * Weather card component for displaying weather information
 * @param {Object} props - Component props
 * @param {Object} props.city - City object containing id and name
 * @returns {JSX.Element} Weather card component
 */
function WeatherCard({ city }) {
  const {
    currentWeather,
    forecast,
    showForecast,
    error,
    fetchForecast
  } = useWeather(city);

  const todayHourlyForecast = useMemo(() => {
    if (!forecast) return null;
    const today = new Date().toDateString();
    return forecast.list.filter(item => 
      new Date(item.dt * 1000).toDateString() === today
    );
  }, [forecast]);

  if (error) return <div className="error-message">{error}</div>;
  if (!currentWeather) return null;

  return (
    <motion.div 
      className="weather-card"
      key={city.id}
      {...slideUp}
    >
      <h2>{city.name}</h2>
      <WeatherDetails 
        weather={currentWeather} 
        hourlyForecast={todayHourlyForecast}
      />
      
      <motion.div
        animate={{ height: showForecast ? "auto" : "50px" }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        {!showForecast ? (
          <motion.button
            onClick={fetchForecast}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            See 5-Day Forecast
          </motion.button>
        ) : (
          <WeatherForecast forecast={forecast} />
        )}
      </motion.div>
    </motion.div>
  );
}

export default WeatherCard; 