import { useState, useEffect } from 'react';
import { weatherApi } from '../api/weatherApi';

// Possible Improvements: Security & Performance Improvements
// - Add input validation for city IDs
// - Implement retry mechanism for failed requests
// - Add data caching layer
// - Sanitize weather data before setting state
// - Add error boundary wrapper
// - Implement proper TypeScript types

/**
 * Custom hook to manage weather data fetching and state
 * @param {Object} city - City object containing id and name
 * @returns {Object} Weather state and control functions
 * @property {Object} currentWeather - Current weather data
 * @property {Object} forecast - Weather forecast data
 * @property {boolean} showForecast - Whether forecast is visible
 * @property {boolean} loading - Loading state for current weather
 * @property {boolean} forecastLoading - Loading state for forecast
 * @property {string|null} error - Error message if any
 * @property {Function} fetchForecast - Function to fetch forecast data
 */

export const useWeather = (city) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    setForecast(null);
    setShowForecast(false);

    const fetchCurrentWeather = async () => {
      setLoading(true);
      try {
        const data = await weatherApi.getCurrentWeather(city.id);
        setCurrentWeather(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentWeather();
  }, [city]);

  const fetchForecast = async () => {
    setForecastLoading(true);
    try {
      const data = await weatherApi.getForecast(city.id);
      setForecast(data);
      setShowForecast(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setForecastLoading(false);
    }
  };

  return {
    currentWeather,
    forecast,
    showForecast,
    loading,
    forecastLoading,
    error,
    fetchForecast
  };
}; 