import { API_KEY, BASE_URL, UNITS } from '../constants/config';

export const weatherApi = {
  async getCurrentWeather(cityId) {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?id=${cityId}&appid=${API_KEY}&units=${UNITS}`
      );
      if (!response.ok) throw new Error('Weather data fetch failed');
      return await response.json();
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  async getForecast(cityId) {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?id=${cityId}&appid=${API_KEY}&units=${UNITS}`
      );
      if (!response.ok) throw new Error('Forecast data fetch failed');
      return await response.json();
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }
}; 