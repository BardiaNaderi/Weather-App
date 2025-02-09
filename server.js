const express = require('express');
const { createServer: createViteServer } = require('vite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

async function createServer() {
  const app = express();

  const fetchWeatherData = async (endpoint, cityId) => {
    const url = new URL(`${process.env.OPENWEATHER_BASE_URL}/${endpoint}`);
    url.searchParams.append('id', cityId);
    url.searchParams.append('appid', process.env.OPENWEATHER_API_KEY);
    url.searchParams.append('units', process.env.OPENWEATHER_UNITS);

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch ${endpoint} data`);
    }
    return response.json();
  };

  app.get('/api/cities/:cityId/weather', async (req, res) => {
    try {
      const data = await fetchWeatherData('weather', req.params.cityId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/cities/:cityId/forecast', async (req, res) => {
    try {
      const data = await fetchWeatherData('forecast', req.params.cityId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});

// Possible Improvements: Security Improvements
// - Add rate limiting to prevent API abuse
// - Implement request validation middleware
// - Add API key rotation mechanism
// - Add proper error handling middleware
// - Implement request logging
// - Add helmet.js for security headers
// - Sanitize API responses before sending to client

// Possible Improvements: Performance Improvements
// - Add API response caching
// - Implement compression middleware
// - Add API request batching 