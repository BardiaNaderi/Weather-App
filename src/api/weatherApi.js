/**
 * Weather API interface for making requests to the server
 * @namespace weatherApi
 */
export const weatherApi = {
    /**
     * Fetches current weather data for a specific city
     * @async
     * @param {number} cityId - The ID of the city to fetch weather for
     * @returns {Promise<Object>} The current weather data
     * @throws {Error} If the API request fails
     */
    async getCurrentWeather(cityId) {
      try {
        const response = await fetch(`/api/cities/${cityId}/weather`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch weather data');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching current weather:', error);
        throw new Error(`Weather data fetch failed: ${error.message}`);
      }
    },
  
    /**
     * Fetches forecast data for a specific city
     * @async
     * @param {number} cityId - The ID of the city to fetch forecast for
     * @returns {Promise<Object>} The forecast weather data
     * @throws {Error} If the API request fails
     */
    async getForecast(cityId) {
      try {
        const response = await fetch(`/api/cities/${cityId}/forecast`);
        if (!response.ok) throw new Error('Forecast data fetch failed');
        return await response.json();
      } catch (error) {
        console.error('Error fetching forecast:', error);
        throw new Error(`Forecast data fetch failed: ${error.message}`);
      }
    }
  };