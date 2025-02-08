import { motion, AnimatePresence } from 'framer-motion';
import { WeatherDetails } from './WeatherDetails';
import { WeatherForecast } from './WeatherForecast';
import { useWeather } from '../../hooks/useWeather';
import { LoadingSpinner } from '../common/LoadingSpinner';

function WeatherCard({ city }) {
  const {
    currentWeather,
    forecast,
    showForecast,
    loading,
    error,
    fetchForecast
  } = useWeather(city);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!currentWeather) return null;

  return (
    <motion.div 
      className="weather-card"
      key={city.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2>{city.name}</h2>
      <WeatherDetails weather={currentWeather} />
      
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