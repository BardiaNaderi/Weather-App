import { useState, useEffect } from 'react';
import { weatherApi } from '../api/weatherApi';

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