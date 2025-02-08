export async function fetchWeatherData(endpoint, id) {
  const baseURL = process.env.VITE_WEATHER_BASE_URL;
  const apiKey = process.env.VITE_WEATHER_API_KEY;
  const units = process.env.VITE_WEATHER_UNITS;

  try {
    const response = await fetch(
      `${baseURL}/${endpoint}?id=${id}&appid=${apiKey}&units=${units}`
    );
    if (!response.ok) throw new Error(`${endpoint} data fetch failed`);
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
} 